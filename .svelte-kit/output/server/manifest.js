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
		client: {"start":"_app/immutable/entry/start.DshilFkj.js","app":"_app/immutable/entry/app.DkVgpXiX.js","imports":["_app/immutable/entry/start.DshilFkj.js","_app/immutable/chunks/entry.CduNTJ4M.js","_app/immutable/chunks/scheduler.dLFNV8Df.js","_app/immutable/chunks/index.CPPoq43l.js","_app/immutable/entry/app.DkVgpXiX.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.dLFNV8Df.js","_app/immutable/chunks/index.BA_2R03l.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
