import type { AddRecord, Purchase, Record } from './models/PurchaseRecord';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { sqliteService } from './SQLiteService';
import { dbVersionService } from './DbVersionService';
import { BehaviorSubject } from 'rxjs';
import { PurchasesUpgradeStatements } from './upgrades/purchases.migration';
import { invoke } from '@tauri-apps/api';

export interface IPurchaseRecordService {
    initializeDatabase(): Promise<void>
    getPurchaseRecords(): Promise<Record[]>
    addPurchaseRecord(PurchaseRecord: AddRecord): Promise<void>
    updatePurchaseRecordById(id: number, active: number): Promise<void>
    deletePurchaseRecordById(id: number): Promise<void>
    getDatabaseName(): string
    getDatabaseVersion(): number
}

class PurchaseRecordService implements IPurchaseRecordService {
    versionUpgrades = PurchasesUpgradeStatements;
    loadToVersion = PurchasesUpgradeStatements[PurchasesUpgradeStatements.length - 1].toVersion;
    db!: SQLiteDBConnection;
    database: string = 'purchases';
    platform = sqliteService.getPlatform();
    isInitCompleted = new BehaviorSubject(false);

    async initializeDatabase(): Promise<void> {
        // create upgrade statements
        try {
            await sqliteService.addUpgradeStatement({
                database: this.database,
                upgrade: this.versionUpgrades
            });
            this.db = await sqliteService.openDatabase(this.database, this.loadToVersion, false);
            dbVersionService.setDbVersion(this.database, this.loadToVersion);
            if (this.platform === 'web') {
                await sqliteService.saveToStore(this.database);
            }
            this.isInitCompleted.next(true);
            this.isInitCompleted.complete();
        } catch (err) {
            const msg = (err as Error).message ? (err as Error).message : err;
            throw new Error(`PurchaseRecordService.initializeDatabase: ${msg}`);
        }
    }

    async getPurchaseRecords(): Promise<Record[]> {
        type DBResult = {
            "0": { id: number, time: string },
            "1": Purchase[],
        }
        const json = await invoke("get_records") as string;
        const result = JSON.parse(json) as DBResult[];

        const purchases = result.map((r: DBResult) => {
            let x: Record = {
                ...r[0],
                purchases: r[1]
            }
            return x;
        });


        return purchases;
    }

    async getPurchaseRecordsPaginated(offset: number, limit: number): Promise<Record[]> {
        type DBResult = {
            "0": { id: number, time: string },
            "1": Purchase[],
        }
        const json = await invoke("get_paginated_records", { offset, limit }) as string;
        const result = JSON.parse(json) as DBResult[];

        const purchases = result.map((r: DBResult) => {
            let x: Record = {
                ...r[0],
                purchases: r[1]
            }
            return x;
        });


        return purchases;
    }



    async addPurchaseRecord(record: AddRecord): Promise<void> {
        await invoke("insert_record", { record });
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