import type { PurchaseRecord } from "$lib/database/models/PurchaseRecord";
import { writable } from "svelte/store";

const {subscribe, set, update} = writable<PurchaseRecord[]>([]);



export default {
    subscribe
}