import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import { Capacitor } from "@capacitor/core";
import { BehaviorSubject } from "rxjs";
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
const PurchasesUpgradeStatements = [
  {
    toVersion: 1,
    statements: [
      `CREATE TABLE IF NOT EXISTS purchase_record (
            purchase_id INTEGER PRIMARY KEY AUTOINCREMENT,
            time TEXT NOT NULL
        );`,
      `CREATE TABLE IF NOT EXISTS purchases (
            purchase_id INTEGER,
            product_id INTEGER,
            amount INTEGER NOT NULL,
            NAME TEXT NOT NULL,
            description TEXT,
            category TEXT NOT NULL,
            price NUMERIC NOT NULL,
            PRIMARY KEY(purchase_id,product_id)
        );`
    ]
  }
];
class PurchaseRecordService {
  versionUpgrades = PurchasesUpgradeStatements;
  loadToVersion = PurchasesUpgradeStatements[PurchasesUpgradeStatements.length - 1].toVersion;
  db;
  database = "purchases";
  platform = sqliteService.getPlatform();
  isInitCompleted = new BehaviorSubject(false);
  async initializeDatabase() {
    try {
      await sqliteService.addUpgradeStatement({
        database: this.database,
        upgrade: this.versionUpgrades
      });
      this.db = await sqliteService.openDatabase(this.database, this.loadToVersion, false);
      dbVersionService.setDbVersion(this.database, this.loadToVersion);
      if (this.platform === "web") {
        await sqliteService.saveToStore(this.database);
      }
      this.isInitCompleted.next(true);
      this.isInitCompleted.complete();
    } catch (err) {
      const msg = err.message ? err.message : err;
      throw new Error(`PurchaseRecordService.initializeDatabase: ${msg}`);
    }
  }
  async getPurchaseRecords() {
    let [records, purchases] = await Promise.all([
      this.db.query(`SELECT purchase_id AS id, time FROM purchase_record`).then((r) => r.values),
      this.db.query(`SELECT * FROM purchases`).then((r) => r.values)
    ]);
    let records_with_products = records.map((record) => {
      let filtered = purchases.filter((v) => v.purchase_id === record.id).map((s) => {
        const { purchase_id, ...ret } = s;
        return ret;
      });
      return {
        purchases: filtered,
        ...record
      };
    });
    return records_with_products;
  }
  async addPurchaseRecord(record) {
    const sql = `INSERT INTO purchase_record (time) VALUES (?);`;
    const res = await this.db.run(sql, [record.time]);
    if (res.changes !== void 0 && res.changes.lastId !== void 0 && res.changes.lastId > 0)
      ;
    else {
      throw new Error(`storageService.addPurchaseRecord: lastId not returned`);
    }
    const purchase_id_u8 = (await this.db.query("SELECT purchase_id FROM purchase_record;")).values;
    const purchase_id = this.convertu8(purchase_id_u8);
    for (const product of record.purchases) {
      const sql2 = `INSERT INTO purchases (purchase_id, product_id, amount, price, name, description, category) VALUES (?, ?, ?, ?, ? , ?, ?);`;
      const res2 = await this.db.run(sql2, [
        purchase_id,
        product.product_id,
        product.amount,
        product.price,
        product.name,
        product.description,
        product.category
      ]);
      if (res2.changes !== void 0 && res2.changes.lastId !== void 0 && res2.changes.lastId > 0)
        ;
      else {
        throw new Error(`storageService.addPurchaseRecord: lastId not returned`);
      }
    }
  }
  async updatePurchaseRecordById(id) {
    const sql = `UPDATE purchase_record SET WHERE id=${id}`;
    await this.db.run(sql);
  }
  async deletePurchaseRecordById(id) {
    const sql = `DELETE FROM purchase_record WHERE id=${id}`;
    await this.db.run(sql);
  }
  getDatabaseName() {
    return this.database;
  }
  getDatabaseVersion() {
    return this.loadToVersion;
  }
  convertu8(arr) {
    return arr.length;
  }
}
const purchaseRecordService = new PurchaseRecordService();
export {
  dbVersionService as d,
  purchaseRecordService as p,
  sqliteService as s
};
