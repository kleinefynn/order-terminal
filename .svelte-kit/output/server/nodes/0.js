import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.DOyng9OY.js","_app/immutable/chunks/scheduler.dLFNV8Df.js","_app/immutable/chunks/index.BA_2R03l.js","_app/immutable/chunks/ProductService.CLMIA0_R.js","_app/immutable/chunks/PurchaseRecordsService.BX4yT4NV.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/index.DPjoHR5P.js","_app/immutable/chunks/index.CPPoq43l.js","_app/immutable/chunks/stores.BctgzQfP.js","_app/immutable/chunks/entry.CduNTJ4M.js"];
export const stylesheets = ["_app/immutable/assets/0.CCqF5ecb.css"];
export const fonts = [];
