

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.B19c8BB6.js","_app/immutable/chunks/scheduler.BEUQHxPi.js","_app/immutable/chunks/index.BfKu3xeS.js","_app/immutable/chunks/entry.CkqRwvN8.js","_app/immutable/chunks/index.B7dWTU1O.js"];
export const stylesheets = [];
export const fonts = [];
