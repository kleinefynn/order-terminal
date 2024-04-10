import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import "@capacitor-community/sqlite";
import { s as sqliteService, d as dbVersionService } from "./PurchaseRecordsService.js";
import { BehaviorSubject } from "rxjs";
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const flyAndScale = (node, params = { y: -8, x: 0, start: 0.95, duration: 150 }) => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;
  const scaleConversion = (valueA, scaleA, scaleB) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;
    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;
    return valueB;
  };
  const styleToString = (style2) => {
    return Object.keys(style2).reduce((str, key) => {
      if (style2[key] === void 0)
        return str;
      return str + `${key}:${style2[key]};`;
    }, "");
  };
  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);
      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t
      });
    },
    easing: cubicOut
  };
};
const ProductUpgradeStatements = [
  {
    toVersion: 1,
    statements: [
      `CREATE TABLE IF NOT EXISTS products (
            product_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price NUMERIC NOT NULL,
            category TEXT NOT NULL
            );`
    ]
  }
  /* add new statements below for next database version when required*/
  /*
  {
  toVersion: 2,
  statements: [
      `ALTER TABLE users ADD COLUMN email TEXT;`,
  ]
  },
  */
];
class ProductService {
  versionUpgrades = ProductUpgradeStatements;
  loadToVersion = ProductUpgradeStatements[ProductUpgradeStatements.length - 1].toVersion;
  db;
  database = "products";
  platform = sqliteService.getPlatform();
  isInitCompleted = new BehaviorSubject(false);
  async initializeDatabase() {
    try {
      await sqliteService.addUpgradeStatement({
        database: this.database,
        upgrade: this.versionUpgrades
      });
      this.db = await sqliteService.openDatabase(this.database, this.loadToVersion, false);
      const isData = await this.db.query("select * from sqlite_sequence");
      if (isData.values.length === 0) {
      }
      dbVersionService.setDbVersion(this.database, this.loadToVersion);
      if (this.platform === "web") {
        await sqliteService.saveToStore(this.database);
      }
      this.isInitCompleted.next(true);
      this.isInitCompleted.complete();
    } catch (err) {
      const msg = err.message ? err.message : err;
      throw new Error(`ProductService.initializeDatabase: ${msg}`);
    }
  }
  async getProducts() {
    return (await this.db.query("SELECT product_id as id, name, description, price, category FROM products;")).values;
  }
  async getProductsWithPurchases() {
    return (await this.db.query("SELECT product_id as id, name, description, price, category FROM products NATURAL JOIN purchases;")).values;
  }
  async addProduct(Product) {
    const sql = `INSERT INTO products (name, description, price, category) VALUES (?,?,?,?);`;
    const res = await this.db.run(sql, [Product.name, Product.description, Product.price, Product.category]);
    if (res.changes !== void 0 && res.changes.lastId !== void 0 && res.changes.lastId > 0) {
      return res.changes.lastId;
    } else {
      throw new Error(`storageService.addProduct: lastId not returned`);
    }
  }
  async updateProductById(id) {
    const sql = `UPDATE products SET WHERE product_id=${id}`;
    await this.db.run(sql);
  }
  async deleteProductById(id) {
    const sql = `DELETE FROM products WHERE product_id=${id}`;
    await this.db.run(sql);
  }
  getDatabaseName() {
    return this.database;
  }
  getDatabaseVersion() {
    return this.loadToVersion;
  }
}
const productService = new ProductService();
export {
  cubicOut as a,
  cn as c,
  flyAndScale as f,
  is_void as i,
  productService as p
};
