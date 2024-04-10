import { purchaseRecordService } from "$lib/database/PurchaseRecordsService";
import type { PurchaseRecord } from "$lib/database/models/PurchaseRecord";
import { writable } from "svelte/store";
import { Share } from '@capacitor/share';
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";

const { subscribe, set, update } = writable<PurchaseRecord[]>([]);

purchaseRecordService.isInitCompleted.subscribe({
    complete: async () => {
        await refresh();
    }
})


const add = (...records: PurchaseRecord[]) => {
    update((store: PurchaseRecord[]) => {
        store.push(...records);
        return store;
    });
}

const refresh = async () => {
    const data = await purchaseRecordService.getPurchaseRecords();
    set(data);
}

const exportPurchases = async () => {
    const records: PurchaseRecord[] = await purchaseRecordService.getPurchaseRecords();

    let csv = records.map((record) => {
        let purchasesMerged = record.purchases.map((purchase) => {
            let values = [
                purchase.name.toString(),
                purchase.description?.toString(),
                purchase.category.toString(),
                purchase.price.toFixed(2).toString(),
                purchase.amount.toFixed(0).toString()
            ]
            return values.join(",");
        }).join(',')
        let d = [record.time, purchasesMerged];
        return Object.values(d).join(",");
    }).join("\n");

    const fileResult = await Filesystem.writeFile({
        path: "export_purchases.csv",
        data: csv,
        directory: Directory.Cache,
        encoding: Encoding.UTF8
    });

    await Share.share({
        title: "Exportiere Daten",
        url: fileResult.uri,
    })
}



export default {
    subscribe,
    add,
    refresh,
    exportPurchases
}