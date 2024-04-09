export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["assets/sql-wasm.wasm","favicon.png"]),
	mimeTypes: {".wasm":"application/wasm",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.CYkp4OOX.js","app":"_app/immutable/entry/app.Bv9BZzwA.js","imports":["_app/immutable/entry/start.CYkp4OOX.js","_app/immutable/chunks/entry.CkqRwvN8.js","_app/immutable/chunks/scheduler.BEUQHxPi.js","_app/immutable/chunks/index.B7dWTU1O.js","_app/immutable/entry/app.Bv9BZzwA.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.BEUQHxPi.js","_app/immutable/chunks/index.BfKu3xeS.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
