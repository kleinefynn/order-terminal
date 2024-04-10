import { p as purchaseRecordService } from "./PurchaseRecordsService.js";
import { w as writable } from "./index.js";
const { subscribe, set, update } = writable([]);
purchaseRecordService.isInitCompleted.subscribe({
  complete: async () => {
    await refresh();
  }
});
const add = (...records) => {
  update((store) => {
    store.push(...records);
    return store;
  });
};
const refresh = async () => {
  const data = await purchaseRecordService.getPurchaseRecords();
  set(data);
};
const purchases = {
  subscribe,
  add,
  refresh
};
export {
  purchases as p
};
