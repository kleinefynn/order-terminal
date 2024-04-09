import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.B6-gbrZH.js","_app/immutable/chunks/scheduler.BEUQHxPi.js","_app/immutable/chunks/index.BfKu3xeS.js","_app/immutable/chunks/ProductService.kyZpH7-y.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/index.C38Ci1Ry.js","_app/immutable/chunks/index.B7dWTU1O.js"];
export const stylesheets = ["_app/immutable/assets/0.DcUUS0kD.css"];
export const fonts = [];
