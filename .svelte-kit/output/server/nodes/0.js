import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.CBlfSpvY.js","_app/immutable/chunks/scheduler.BjA4TFnn.js","_app/immutable/chunks/index.C0Qvp063.js","_app/immutable/chunks/ProductService.WXLRHO_8.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/index.D0_wMLE0.js","_app/immutable/chunks/index.Bl2S_yjH.js","_app/immutable/chunks/stores.Dxxz--HR.js","_app/immutable/chunks/entry.BERKCXnn.js"];
export const stylesheets = ["_app/immutable/assets/0.CXgFg_vY.css"];
export const fonts = [];
