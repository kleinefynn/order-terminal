export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.kvzfxFmi.js","app":"_app/immutable/entry/app.Bp8SONuw.js","imports":["_app/immutable/entry/start.kvzfxFmi.js","_app/immutable/chunks/entry.Ci6-00AD.js","_app/immutable/chunks/scheduler.BEUQHxPi.js","_app/immutable/chunks/index.B7dWTU1O.js","_app/immutable/entry/app.Bp8SONuw.js","_app/immutable/chunks/scheduler.BEUQHxPi.js","_app/immutable/chunks/index.BfKu3xeS.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
