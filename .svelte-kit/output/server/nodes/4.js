

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auswertung/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.CqeM8ciu.js","_app/immutable/chunks/scheduler.BEUQHxPi.js","_app/immutable/chunks/index.BfKu3xeS.js"];
export const stylesheets = [];
export const fonts = [];
