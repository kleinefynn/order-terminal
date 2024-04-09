import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.DbN01cTj.js","_app/immutable/chunks/scheduler.BjA4TFnn.js","_app/immutable/chunks/index.C0Qvp063.js","_app/immutable/chunks/PurchaseRecordsService.Dm-puWxV.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/index.By-SuiOu.js","_app/immutable/chunks/index.Bl2S_yjH.js","_app/immutable/chunks/stores.COJgzCdI.js","_app/immutable/chunks/entry.DLX5nxYs.js"];
export const stylesheets = ["_app/immutable/assets/0.CCqF5ecb.css"];
export const fonts = [];
