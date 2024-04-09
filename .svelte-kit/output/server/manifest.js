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
		client: {"start":"_app/immutable/entry/start.BTcm3IRG.js","app":"_app/immutable/entry/app.Bbtf-wBP.js","imports":["_app/immutable/entry/start.BTcm3IRG.js","_app/immutable/chunks/entry.BERKCXnn.js","_app/immutable/chunks/scheduler.BjA4TFnn.js","_app/immutable/chunks/index.Bl2S_yjH.js","_app/immutable/entry/app.Bbtf-wBP.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.BjA4TFnn.js","_app/immutable/chunks/index.C0Qvp063.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
