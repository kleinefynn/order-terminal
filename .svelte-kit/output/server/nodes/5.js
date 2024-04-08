

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/einstellungen/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.CqeM8ciu.js","_app/immutable/chunks/scheduler.BEUQHxPi.js","_app/immutable/chunks/index.BfKu3xeS.js"];
export const stylesheets = [];
export const fonts = [];
