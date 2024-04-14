import { purchaseRecordService } from "$lib/database/PurchaseRecordsService";
import type { Purchase, PurchaseRecord, Purchases } from "$lib/database/models/PurchaseRecord";
import { writable } from "svelte/store";
import { Share } from '@capacitor/share';
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { FilePicker, type PickedFile } from '@capawesome/capacitor-file-picker';
import { Capacitor } from "@capacitor/core";
import { save } from "@tauri-apps/api/dialog";
import { writeBinaryFile } from "@tauri-apps/api/fs";


const { subscribe, set, update } = writable<Purchases[]>([]);

const refresh = async () => {
    const data = await purchaseRecordService.getPurchaseRecords();
    set(data);
}

purchaseRecordService.isInitCompleted.subscribe({
    complete: async () => {
        await refresh();
    }
})

const add = (...records: Purchases[]) => {
    update((store: Purchases[]) => {
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
    const records: Purchases[] = await purchaseRecordService.getPurchaseRecords();

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

    const platform = Capacitor.getPlatform();
    const suggestedFilename = "export_daten.csv";

    switch (platform) {
        case "android":
            const fileUri = (await Filesystem.writeFile({
                path: suggestedFilename,
                data: csv,
                directory: Directory.Cache,
                encoding: Encoding.UTF8
            })).uri;

            await Share.share({
                title: "Exportiere Daten",
                url: "file://" + fileUri,
            });
            break;

        case "web": {
            //@ts-ignore
            if (window.__TAURI__ !== undefined) {
                const encoder = new TextEncoder();

                // Save into the default downloads directory, like in the browser
                const filePath = await save({
                    defaultPath: suggestedFilename,
                });

                if (filePath == null) {
                    throw Error("Exportieren abgebrochen")
                }

                await writeBinaryFile(filePath, encoder.encode(csv));
                break;
            }
        }
        default:
            throw Error(`Platform nicht unterstützt! (${platform})`);
    }
}

const importPurchases = async () => {
    const CHUNK_SIZE = 5;

    const result: PickedFile = (await FilePicker.pickFiles({
        types: ['text/csv'],
        multiple: false,
        readData: true,
    })).files[0];

    const csv_base64 = result.data;

    if (csv_base64 === undefined) {
        throw Error("file empty!");
    }

    const csv = fromBinary(csv_base64);

    const records = csv
        .trim()
        // split record rows
        .split("\n")
        // parse line
        .map((line) => {
            let values: string[] = line.trim().split(",");
            let time = values.shift() as string;
            const purchases: Omit<Purchase, 'purchase_id'>[] = [];
            for (let i = 0; i < values.length; i += CHUNK_SIZE) {
                const chunk = values.slice(i, i + CHUNK_SIZE);

                const purchase: Omit<Purchase, 'purchase_id'> = {
                    name: chunk[0],
                    description: chunk[1],
                    category: chunk[2],
                    price: Number(chunk[3]),
                    amount: Number(chunk[4])
                };

                purchases.push(purchase);
            }

            return {
                time,
                purchases
            }
        });

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