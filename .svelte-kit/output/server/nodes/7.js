

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/produkte/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.De77dMC1.js","_app/immutable/chunks/scheduler.BjA4TFnn.js","_app/immutable/chunks/index.C0Qvp063.js"];
export const stylesheets = [];
export const fonts = [];
