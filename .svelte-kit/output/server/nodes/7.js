

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/produkte/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.D1JGNd_M.js","_app/immutable/chunks/scheduler.dLFNV8Df.js","_app/immutable/chunks/index.BA_2R03l.js"];
export const stylesheets = [];
export const fonts = [];
