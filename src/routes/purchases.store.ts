import { purchaseRecordService } from "$lib/database/PurchaseRecordsService";
import type { AddPurchase, AddRecord, Record } from "$lib/database/models/PurchaseRecord";
import { writable } from "svelte/store";
import { invoke } from "@tauri-apps/api";
import { open, save } from "@tauri-apps/api/dialog";


const { subscribe, set, update } = writable<Record[]>([]);

const refresh = async () => {
    const data = await purchaseRecordService.getPurchaseRecords();
    set(data);
}

purchaseRecordService.isInitCompleted.subscribe({
    complete: async () => {
        await refresh();
    }
})

const add = (...records: Record[]) => {
    update((store: Record[]) => {
        store.push(...records);
        return store;
    });
}

const fromBinary = (str: string) => {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}

const exportPurchases = async () => {
    const records: Record[] = await purchaseRecordService.getPurchaseRecords();
    const suggestedFilename = "export_daten.csv";


    const encoder = new TextEncoder();

    // Save into the default downloads directory, like in the browser
    const filePath = await save({
        defaultPath: suggestedFilename,
        filters: [{
            name: 'Text',
            extensions: ['csv']
        }]
    });

    if (filePath == null) {
        throw Error("Exportieren abgebrochen")
    }

    await invoke("export_purchases", {
        path: filePath,
        records
    })
}

const importPurchases = async () => {
    let path = await open({
        multiple: false,
        filters: [{
            name: 'Text',
            extensions: ['csv']
        }]
    }) as string;

    const records: AddRecord[] = await invoke("import_purchases", { path });

    for (const record of records) {
        await purchaseRecordService.addPurchaseRecord(record);
    }

    refresh();

}



export default {
    subscribe,
    add,
    refresh,
    exportPurchases,
    importPurchases
}