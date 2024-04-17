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

const add = (...records: Record[]) => {
    update((store: Record[]) => {
        store.push(...records);
        return store;
    });
}

const deleteRecord = async (id: number) => {
    await invoke("delete_record", { id });
    await refresh();
}

const exportPurchases = async () => {
    const records: Record[] = await purchaseRecordService.getPurchaseRecords();
    const suggestedFilename = "export_daten.csv";

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

    await refresh();

}

await refresh();

export default {
    subscribe,
    add,
    refresh,
    deleteRecord,
    exportPurchases,
    importPurchases
}