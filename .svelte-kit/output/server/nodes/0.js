import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.Bs21KYfp.js","_app/immutable/chunks/scheduler.BEUQHxPi.js","_app/immutable/chunks/index.BfKu3xeS.js","_app/immutable/chunks/utils.BJICskwK.js","_app/immutable/chunks/index.BmOx3uD3.js","_app/immutable/chunks/index.B7dWTU1O.js"];
export const stylesheets = ["_app/immutable/assets/0.Be3pULeX.css"];
export const fonts = [];
