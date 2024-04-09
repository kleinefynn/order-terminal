import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import { Capacitor } from "@capacitor/core";
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
class SQLiteService {
  // Your service implementation goes here
  platform = Capacitor.getPlatform();
  sqlitePlugin = CapacitorSQLite;
  sqliteConnection = new SQLiteConnection(CapacitorSQLite);
  dbNameVersionDict = /* @__PURE__ */ new Map();
  getPlatform() {
    return this.platform;
  }
  async initWebStore() {
    try {
      await this.sqliteConnection.initWebStore();
    } catch (err) {
      const msg = err.message ? err.message : err;
      throw new Error(`sqliteService.initWebStore: ${msg}`);
    }
    return;
  }
  async addUpgradeStatement(options) {
    try {
      await this.sqlitePlugin.addUpgradeStatement(options);
    } catch (err) {
      const msg = err.message ? err.message : err;
      throw new Error(`sqliteService.addUpgradeStatement: ${msg}`);
    }
    return;
  }
  async openDatabase(dbName, loadToVersion, readOnly) {
    this.dbNameVersionDict.set(dbName, loadToVersion);
    const encrypted = false;
    const mode = "no-encryption";
    try {
      let db;
      const retCC = (await this.sqliteConnection.checkConnectionsConsistency()).result;
      const isConn = (await this.sqliteConnection.isConnection(dbName, readOnly)).result;
      if (retCC && isConn) {
        db = await this.sqliteConnection.retrieveConnection(dbName, readOnly);
      } else {
        db = await this.sqliteConnection.createConnection(dbName, encrypted, mode, loadToVersion, readOnly);
      }
      await db.open();
      const res = (await db.isDBOpen()).result;
      if (!res) {
        throw new Error("sqliteService.openDatabase: ddb not opened");
      }
      return db;
    } catch (err) {
      const msg = err.message ? err.message : err;
      throw new Error(`sqliteService.openDatabase: ${msg}`);
    }
  }
  async isConnection(dbName, readOnly) {
    try {
      const isConn = (await this.sqliteConnection.isConnection(dbName, readOnly)).result;
      if (isConn != void 0) {
        return isConn;
      } else {
        throw new Error(`sqliteService.isConnection undefined`);
      }
    } catch (err) {
      const msg = err.message ? err.message : err;
      throw new Error(`sqliteService.isConnection: ${msg}`);
    }
  }
  async closeDatabase(dbName, readOnly) {
    try {
      const isConn = (await this.sqliteConnection.isConnection(dbName, readOnly)).result;
      if (isConn) {
        await this.sqliteConnection.closeConnection(dbName, readOnly);
      }
      return;
    } catch (err) {
      const msg = err.message ? err.message : err;
      throw new Error(`sqliteService.closeDatabase: ${msg}`);
    }
  }
  async saveToStore(dbName) {
    try {
      await this.sqliteConnection.saveToStore(dbName);
      return;
    } catch (err) {
      const msg = err.message ? err.message : err;
      throw new Error(`sqliteService.saveToStore: ${msg}`);
    }
  }
  async saveToLocalDisk(dbName) {
    try {
      await this.sqliteConnection.saveToLocalDisk(dbName);
      return;
    } catch (err) {
      const msg = err.message ? err.message : err;
      throw new Error(`sqliteService.saveToLocalDisk: ${msg}`);
    }
  }
}
const sqliteService = new SQLiteService();
class DbVersionService {
  dbNameVersionDict = /* @__PURE__ */ new Map();
  setDbVersion(dbName, version) {
    this.dbNameVersionDict.set(dbName, version);
  }
  getDbVersion(dbName) {
    const version = this.dbNameVersionDict.get(dbName);
    return version;
  }
}
const dbVersionService = new DbVersionService();
const ProductUpgradeStatements = [
  {
    toVersion: 1,
    statements: [
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price NUMERIC
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
  database = "myproductdb";
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
    return (await this.db.query("SELECT * FROM products;")).values;
  }
  async addProduct(Product) {
    const sql = `INSERT INTO products (name, description, price) VALUES (?,?,?);`;
    const res = await this.db.run(sql, [Product.name, Product.description, Product.price]);
    if (res.changes !== void 0 && res.changes.lastId !== void 0 && res.changes.lastId > 0) {
      return res.changes.lastId;
    } else {
      throw new Error(`storageService.addProduct: lastId not returned`);
    }
  }
  async updateProductById(id) {
    const sql = `UPDATE products SET WHERE id=${id}`;
    await this.db.run(sql);
  }
  async deleteProductById(id) {
    const sql = `DELETE FROM products WHERE id=${id}`;
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
  productService as p,
  sqliteService as s
};
