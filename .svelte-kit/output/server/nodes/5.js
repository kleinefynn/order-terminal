

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/einstellungen/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.D1JGNd_M.js","_app/immutable/chunks/scheduler.dLFNV8Df.js","_app/immutable/chunks/index.BA_2R03l.js"];
export const stylesheets = [];
export const fonts = [];
