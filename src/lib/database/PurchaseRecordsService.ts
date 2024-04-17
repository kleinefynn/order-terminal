import type { AddRecord, Purchase, Record } from './models/PurchaseRecord';
import { invoke } from '@tauri-apps/api';

export interface IPurchaseRecordService {
    getPurchaseRecords(): Promise<Record[]>
    addPurchaseRecord(PurchaseRecord: AddRecord): Promise<void>
}

class PurchaseRecordService implements IPurchaseRecordService {
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
}
// Singleton instance of the service
export const purchaseRecordService = new PurchaseRecordService();