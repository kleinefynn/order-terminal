import { purchaseRecordService } from "$lib/database/PurchaseRecordsService";
import type { PurchaseRecord } from "$lib/database/models/PurchaseRecord";
import { writable } from "svelte/store";

const {subscribe, set, update} = writable<PurchaseRecord[]>([]);

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



export default {
    subscribe,
    add,
    refresh
}