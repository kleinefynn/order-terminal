import type { Purchase, PurchaseRecord } from './models/PurchaseRecord';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { sqliteService } from './SQLiteService';
import { dbVersionService } from './DbVersionService';
import { BehaviorSubject } from 'rxjs';
import { PurchasesUpgradeStatements } from './upgrades/purchases.migration';
import type { ShoppingCartItem } from '../../routes/kasse/Item';

export interface IPurchaseRecordService {
    initializeDatabase(): Promise<void>
    getPurchaseRecords(): Promise<PurchaseRecord[]>
    addPurchaseRecord(PurchaseRecord: PurchaseRecord): Promise<void>
    updatePurchaseRecordById(id: number, active: number): Promise<void> 
    deletePurchaseRecordById(id: number): Promise<void>
    getDatabaseName(): string
    getDatabaseVersion(): number
}
class PurchaseRecordService implements IPurchaseRecordService {
    versionUpgrades = PurchasesUpgradeStatements;
    loadToVersion = PurchasesUpgradeStatements[PurchasesUpgradeStatements.length-1].toVersion;
    db!: SQLiteDBConnection;
    database: string = 'mydb2';
    platform = sqliteService.getPlatform();
    isInitCompleted = new BehaviorSubject(false);

    async initializeDatabase(): Promise<void> {
        // create upgrade statements
        try {
            await sqliteService.addUpgradeStatement({database: this.database,
                                                  upgrade: this.versionUpgrades});
            this.db = await sqliteService.openDatabase(this.database, this.loadToVersion, false);
            dbVersionService.setDbVersion(this.database,this.loadToVersion);
            if( this.platform === 'web') {
              await sqliteService.saveToStore(this.database);
            }
            this.isInitCompleted.next(true);
            this.isInitCompleted.complete();
        } catch(err) {
            const msg = (err as Error).message ? (err as Error).message : err;
            throw new Error(`PurchaseRecordService.initializeDatabase: ${msg}`);
        }
    }
    async getPurchaseRecords(): Promise<PurchaseRecord[]> {

        console.group('getPurchaseRecords');
        let [records, products] = await Promise.all([
            this.db.query(`SELECT purchase_id AS id, amount, price, time FROM purchase_record`).then((r) => r.values as Omit<PurchaseRecord, 'products'>[]),
            this.db.query(`SELECT * FROM purchases`).then((r) => r.values as Purchase[]),
        ]);
        let shoppings = products.map((product) => (
            {
                purchase_id: product.purchase_id,
                amount: product.amount,
                product: {
                    id: product.product_id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    category: product.category
                }
            }));

        let records_with_products = records.map((record) => {
            let filtered: ShoppingCartItem[] = shoppings.filter((v) => v.purchase_id === record.id).map((s) => {
                const { purchase_id, ...ret } = s;
                return ret as ShoppingCartItem; 
            });

            return {
                products: filtered,
                ...record
            } as PurchaseRecord
        })

        console.table(records_with_products);
        console.groupEnd();

        return records_with_products;
        
    }
    async addPurchaseRecord(record: Omit<PurchaseRecord, 'id'>): Promise<void> {
        const sql = `INSERT INTO purchase_record (time) VALUES (?);`;
        const res = await this.db.run(sql,[record.time]);
        if (res.changes !== undefined
            && res.changes.lastId !== undefined && res.changes.lastId > 0) {
        } else {
            throw new Error(`storageService.addPurchaseRecord: lastId not returned`);
        }

        const purchase_id_u8 = (await this.db.query('SELECT purchase_id FROM purchase_record;')).values as unknown as Uint8Array;
        const purchase_id = this.convertu8(purchase_id_u8);

        for (const product of record.products) {
            const sql = `INSERT INTO purchases (purchase_id, product_id, amount, price) VALUES (?, ?, ?, ?);`;
            const res = await this.db.run(sql,[purchase_id, product.product.id, product.amount, product.product.price]);
            if (res.changes !== undefined
                && res.changes.lastId !== undefined && res.changes.lastId > 0) {
            } else {
                throw new Error(`storageService.addPurchaseRecord: lastId not returned`);
            }
        }
    }
    async updatePurchaseRecordById(id: number): Promise<void> {
        const sql = `UPDATE purchase_record SET WHERE id=${id}`;
        await this.db.run(sql);
    }
    async deletePurchaseRecordById(id: number): Promise<void> {
        const sql = `DELETE FROM purchase_record WHERE id=${id}`;
        await this.db.run(sql);
    }
    getDatabaseName(): string {
        return this.database;
    }
    getDatabaseVersion(): number {
        return this.loadToVersion;
    }
    private convertu8(arr: Uint8Array) {
        return arr.length;
    }
}
// Singleton instance of the service
export const purchaseRecordService = new PurchaseRecordService();