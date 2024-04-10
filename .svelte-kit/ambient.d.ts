
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const DEBUGINFOD_URLS: string;
	export const GIO_LAUNCHED_DESKTOP_FILE: string;
	export const XAUTHORITY: string;
	export const XMODIFIERS: string;
	export const GJS_DEBUG_TOPICS: string;
	export const WAYLAND_DISPLAY: string;
	export const PATH: string;
	export const SSH_AUTH_SOCK: string;
	export const HISTSIZE: string;
	export const GDM_LANG: string;
	export const LANG: string;
	export const TERM_PROGRAM_VERSION: string;
	export const SESSION_MANAGER: string;
	export const BUN_INSTALL: string;
	export const GIT_ASKPASS: string;
	export const SHELL: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const MANAGERPID: string;
	export const JOURNAL_STREAM: string;
	export const TERM_PROGRAM: string;
	export const LOGNAME: string;
	export const npm_execpath: string;
	export const npm_package_json: string;
	export const MAIL: string;
	export const npm_package_name: string;
	export const DESKTOP_SESSION: string;
	export const XDG_SESSION_TYPE: string;
	export const SYSTEMD_EXEC_PID: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const LIBCLANG_PATH: string;
	export const XDG_MENU_PREFIX: string;
	export const LS_COLORS: string;
	export const npm_node_execpath: string;
	export const DEVKITARM: string;
	export const TERM: string;
	export const npm_config_local_prefix: string;
	export const XDG_DATA_DIRS: string;
	export const GJS_DEBUG_OUTPUT: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const DEVKITPRO: string;
	export const PWD: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const HOSTNAME: string;
	export const INVOCATION_ID: string;
	export const QT_IM_MODULE: string;
	export const NO_AT_BRIDGE: string;
	export const XDG_SESSION_CLASS: string;
	export const GIO_LAUNCHED_DESKTOP_FILE_PID: string;
	export const npm_lifecycle_event: string;
	export const HOME: string;
	export const USER: string;
	export const _: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const npm_config_user_agent: string;
	export const USERNAME: string;
	export const EDITOR: string;
	export const SHLVL: string;
	export const XDG_SESSION_DESKTOP: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const GNOME_SETUP_DISPLAY: string;
	export const DEVKITPPC: string;
	export const GDK_BACKEND: string;
	export const GDMSESSION: string;
	export const COLORTERM: string;
	export const ELECTRON_OZONE_PLATFORM_HINT: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const XDG_RUNTIME_DIR: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const CHROME_DESKTOP: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const LESSOPEN: string;
	export const CFLAGS_armv6k_nintendo_3ds: string;
	export const npm_package_version: string;
	export const DISPLAY: string;
	export const HISTCONTROL: string;
	export const NODE: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		DEBUGINFOD_URLS: string;
		GIO_LAUNCHED_DESKTOP_FILE: string;
		XAUTHORITY: string;
		XMODIFIERS: string;
		GJS_DEBUG_TOPICS: string;
		WAYLAND_DISPLAY: string;
		PATH: string;
		SSH_AUTH_SOCK: string;
		HISTSIZE: string;
		GDM_LANG: string;
		LANG: string;
		TERM_PROGRAM_VERSION: string;
		SESSION_MANAGER: string;
		BUN_INSTALL: string;
		GIT_ASKPASS: string;
		SHELL: string;
		MEMORY_PRESSURE_WRITE: string;
		MANAGERPID: string;
		JOURNAL_STREAM: string;
		TERM_PROGRAM: string;
		LOGNAME: string;
		npm_execpath: string;
		npm_package_json: string;
		MAIL: string;
		npm_package_name: string;
		DESKTOP_SESSION: string;
		XDG_SESSION_TYPE: string;
		SYSTEMD_EXEC_PID: string;
		XDG_CURRENT_DESKTOP: string;
		LIBCLANG_PATH: string;
		XDG_MENU_PREFIX: string;
		LS_COLORS: string;
		npm_node_execpath: string;
		DEVKITARM: string;
		TERM: string;
		npm_config_local_prefix: string;
		XDG_DATA_DIRS: string;
		GJS_DEBUG_OUTPUT: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		DEVKITPRO: string;
		PWD: string;
		VSCODE_GIT_IPC_HANDLE: string;
		HOSTNAME: string;
		INVOCATION_ID: string;
		QT_IM_MODULE: string;
		NO_AT_BRIDGE: string;
		XDG_SESSION_CLASS: string;
		GIO_LAUNCHED_DESKTOP_FILE_PID: string;
		npm_lifecycle_event: string;
		HOME: string;
		USER: string;
		_: string;
		MEMORY_PRESSURE_WATCH: string;
		npm_config_user_agent: string;
		USERNAME: string;
		EDITOR: string;
		SHLVL: string;
		XDG_SESSION_DESKTOP: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		GNOME_SETUP_DISPLAY: string;
		DEVKITPPC: string;
		GDK_BACKEND: string;
		GDMSESSION: string;
		COLORTERM: string;
		ELECTRON_OZONE_PLATFORM_HINT: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		XDG_RUNTIME_DIR: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		CHROME_DESKTOP: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		LESSOPEN: string;
		CFLAGS_armv6k_nintendo_3ds: string;
		npm_package_version: string;
		DISPLAY: string;
		HISTCONTROL: string;
		NODE: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
