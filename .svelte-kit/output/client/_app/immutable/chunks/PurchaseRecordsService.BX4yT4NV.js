var Te=Object.defineProperty;var Le=(s,e,t)=>e in s?Te(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var g=(s,e,t)=>(Le(s,typeof e!="symbol"?e+"":e,t),t);import{t as De,a as Oe}from"./index.BA_2R03l.js";import{r as xe}from"./scheduler.dLFNV8Df.js";import{_ as Re}from"./preload-helper.D6kgxu3v.js";function ht(s){return(s==null?void 0:s.length)!==void 0?s:Array.from(s)}function ft(s,e){De(s,1,1,()=>{e.delete(s.key)})}function mt(s,e,t,r,n,i,o,a,c,u,P,S){let h=s.length,p=i.length,b=h;const f={};for(;b--;)f[s[b].key]=b;const L=[],D=new Map,N=new Map,$=[];for(b=p;b--;){const l=S(n,i,b),d=t(l);let m=o.get(d);m?r&&$.push(()=>m.p(l,e)):(m=u(d,l),m.c()),D.set(d,L[b]=m),d in f&&N.set(d,Math.abs(b-f[d]))}const O=new Set,I=new Set;function A(l){Oe(l,1),l.m(a,P),o.set(l.key,l),P=l.first,p--}for(;h&&p;){const l=L[p-1],d=s[h-1],m=l.key,w=d.key;l===d?(P=l.first,h--,p--):D.has(w)?!o.has(m)||O.has(m)?A(l):I.has(w)?h--:N.get(m)>N.get(w)?(I.add(m),A(l)):(O.add(w),h--):(c(d,o),h--)}for(;h--;){const l=s[h];D.has(l.key)||c(l,o)}for(;p;)A(L[p-1]);return xe($),L}/*! Capacitor: https://capacitorjs.com/ - MIT License */const Ne=s=>{const e=new Map;e.set("web",{name:"web"});const t=s.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:e},r=(i,o)=>{t.platforms.set(i,o)},n=i=>{t.platforms.has(i)&&(t.currentPlatform=t.platforms.get(i))};return t.addPlatform=r,t.setPlatform=n,t},Ae=s=>s.CapacitorPlatforms=Ne(s),pe=Ae(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});pe.addPlatform;pe.setPlatform;var R;(function(s){s.Unimplemented="UNIMPLEMENTED",s.Unavailable="UNAVAILABLE"})(R||(R={}));class J extends Error{constructor(e,t,r){super(e),this.message=e,this.code=t,this.data=r}}const ke=s=>{var e,t;return s!=null&&s.androidBridge?"android":!((t=(e=s==null?void 0:s.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},Ue=s=>{var e,t,r,n,i;const o=s.CapacitorCustomPlatform||null,a=s.Capacitor||{},c=a.Plugins=a.Plugins||{},u=s.CapacitorPlatforms,P=()=>o!==null?o.name:ke(s),S=((e=u==null?void 0:u.currentPlatform)===null||e===void 0?void 0:e.getPlatform)||P,h=()=>S()!=="web",p=((t=u==null?void 0:u.currentPlatform)===null||t===void 0?void 0:t.isNativePlatform)||h,b=l=>{const d=O.get(l);return!!(d!=null&&d.platforms.has(S())||D(l))},f=((r=u==null?void 0:u.currentPlatform)===null||r===void 0?void 0:r.isPluginAvailable)||b,L=l=>{var d;return(d=a.PluginHeaders)===null||d===void 0?void 0:d.find(m=>m.name===l)},D=((n=u==null?void 0:u.currentPlatform)===null||n===void 0?void 0:n.getPluginHeader)||L,N=l=>s.console.error(l),$=(l,d,m)=>Promise.reject(`${m} does not have an implementation of "${d}".`),O=new Map,I=(l,d={})=>{const m=O.get(l);if(m)return console.warn(`Capacitor plugin "${l}" already registered. Cannot register plugins twice.`),m.proxy;const w=S(),x=D(l);let _;const _e=async()=>(!_&&w in d?_=typeof d[w]=="function"?_=await d[w]():_=d[w]:o!==null&&!_&&"web"in d&&(_=typeof d.web=="function"?_=await d.web():_=d.web),_),je=(y,v)=>{var C,q;if(x){const T=x==null?void 0:x.methods.find(E=>v===E.name);if(T)return T.rtype==="promise"?E=>a.nativePromise(l,v.toString(),E):(E,M)=>a.nativeCallback(l,v.toString(),E,M);if(y)return(C=y[v])===null||C===void 0?void 0:C.bind(y)}else{if(y)return(q=y[v])===null||q===void 0?void 0:q.bind(y);throw new J(`"${l}" plugin is not implemented on ${w}`,R.Unimplemented)}},Q=y=>{let v;const C=(...q)=>{const T=_e().then(E=>{const M=je(E,y);if(M){const W=M(...q);return v=W==null?void 0:W.remove,W}else throw new J(`"${l}.${y}()" is not implemented on ${w}`,R.Unimplemented)});return y==="addListener"&&(T.remove=async()=>v()),T};return C.toString=()=>`${y.toString()}() { [capacitor code] }`,Object.defineProperty(C,"name",{value:y,writable:!1,configurable:!1}),C},ie=Q("addListener"),oe=Q("removeListener"),qe=(y,v)=>{const C=ie({eventName:y},v),q=async()=>{const E=await C;oe({eventName:y,callbackId:E},v)},T=new Promise(E=>C.then(()=>E({remove:q})));return T.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await q()},T},G=new Proxy({},{get(y,v){switch(v){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return x?qe:ie;case"removeListener":return oe;default:return Q(v)}}});return c[l]=G,O.set(l,{name:l,proxy:G,platforms:new Set([...Object.keys(d),...x?[w]:[]])}),G},A=((i=u==null?void 0:u.currentPlatform)===null||i===void 0?void 0:i.registerPlugin)||I;return a.convertFileSrc||(a.convertFileSrc=l=>l),a.getPlatform=S,a.handleError=N,a.isNativePlatform=p,a.isPluginAvailable=f,a.pluginMethodNoop=$,a.registerPlugin=A,a.Exception=J,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a.platform=a.getPlatform(),a.isNative=a.isNativePlatform(),a},$e=s=>s.Capacitor=Ue(s),k=$e(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),ne=k.registerPlugin;k.Plugins;class ve{constructor(e){this.listeners={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t);const n=this.windowListeners[e];n&&!n.registered&&this.addWindowListener(n);const i=async()=>this.removeListener(e,t),o=Promise.resolve({remove:i});return Object.defineProperty(o,"remove",{value:async()=>{console.warn("Using addListener() without 'await' is deprecated."),await i()}}),o}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t){const r=this.listeners[e];r&&r.forEach(n=>n(t))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:r=>{this.notifyListeners(t,r)}}}unimplemented(e="not implemented"){return new k.Exception(e,R.Unimplemented)}unavailable(e="not available"){return new k.Exception(e,R.Unavailable)}async removeListener(e,t){const r=this.listeners[e];if(!r)return;const n=r.indexOf(t);this.listeners[e].splice(n,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}}const ae=s=>encodeURIComponent(s).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),ce=s=>s.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Ie extends ve{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(r=>{if(r.length<=0)return;let[n,i]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");n=ce(n).trim(),i=ce(i).trim(),t[n]=i}),t}async setCookie(e){try{const t=ae(e.key),r=ae(e.value),n=`; expires=${(e.expires||"").replace("expires=","")}`,i=(e.path||"/").replace("path=",""),o=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${r||""}${n}; path=${i}; ${o};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}ne("CapacitorCookies",{web:()=>new Ie});const Me=async s=>new Promise((e,t)=>{const r=new FileReader;r.onload=()=>{const n=r.result;e(n.indexOf(",")>=0?n.split(",")[1]:n)},r.onerror=n=>t(n),r.readAsDataURL(s)}),We=(s={})=>{const e=Object.keys(s);return Object.keys(s).map(n=>n.toLocaleLowerCase()).reduce((n,i,o)=>(n[i]=s[e[o]],n),{})},Ve=(s,e=!0)=>s?Object.entries(s).reduce((r,n)=>{const[i,o]=n;let a,c;return Array.isArray(o)?(c="",o.forEach(u=>{a=e?encodeURIComponent(u):u,c+=`${i}=${a}&`}),c.slice(0,-1)):(a=e?encodeURIComponent(o):o,c=`${i}=${a}`),`${r}&${c}`},"").substr(1):null,Fe=(s,e={})=>{const t=Object.assign({method:s.method||"GET",headers:s.headers},e),n=We(s.headers)["content-type"]||"";if(typeof s.data=="string")t.body=s.data;else if(n.includes("application/x-www-form-urlencoded")){const i=new URLSearchParams;for(const[o,a]of Object.entries(s.data||{}))i.set(o,a);t.body=i.toString()}else if(n.includes("multipart/form-data")||s.data instanceof FormData){const i=new FormData;if(s.data instanceof FormData)s.data.forEach((a,c)=>{i.append(c,a)});else for(const a of Object.keys(s.data))i.append(a,s.data[a]);t.body=i;const o=new Headers(t.headers);o.delete("content-type"),t.headers=o}else(n.includes("application/json")||typeof s.data=="object")&&(t.body=JSON.stringify(s.data));return t};class Be extends ve{async request(e){const t=Fe(e,e.webFetchExtra),r=Ve(e.params,e.shouldEncodeUrlParams),n=r?`${e.url}?${r}`:e.url,i=await fetch(n,t),o=i.headers.get("content-type")||"";let{responseType:a="text"}=i.ok?e:{};o.includes("application/json")&&(a="json");let c,u;switch(a){case"arraybuffer":case"blob":u=await i.blob(),c=await Me(u);break;case"json":c=await i.json();break;case"document":case"text":default:c=await i.text()}const P={};return i.headers.forEach((S,h)=>{P[h]=S}),{data:c,headers:P,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}ne("CapacitorHttp",{web:()=>new Be});var z=function(s,e){return z=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])},z(s,e)};function U(s,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");z(s,e);function t(){this.constructor=s}s.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}function Z(s){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&s[e],r=0;if(t)return t.call(s);if(s&&typeof s.length=="number")return{next:function(){return s&&r>=s.length&&(s=void 0),{value:s&&s[r++],done:!s}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function ee(s,e){var t=typeof Symbol=="function"&&s[Symbol.iterator];if(!t)return s;var r=t.call(s),n,i=[],o;try{for(;(e===void 0||e-- >0)&&!(n=r.next()).done;)i.push(n.value)}catch(a){o={error:a}}finally{try{n&&!n.done&&(t=r.return)&&t.call(r)}finally{if(o)throw o.error}}return i}function te(s,e,t){if(t||arguments.length===2)for(var r=0,n=e.length,i;r<n;r++)(i||!(r in e))&&(i||(i=Array.prototype.slice.call(e,0,r)),i[r]=e[r]);return s.concat(i||Array.prototype.slice.call(e))}function j(s){return typeof s=="function"}function be(s){var e=function(r){Error.call(r),r.stack=new Error().stack},t=s(e);return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var K=be(function(s){return function(t){s(this),this.message=t?t.length+` errors occurred during unsubscription:
`+t.map(function(r,n){return n+1+") "+r.toString()}).join(`
  `):"",this.name="UnsubscriptionError",this.errors=t}});function re(s,e){if(s){var t=s.indexOf(e);0<=t&&s.splice(t,1)}}var H=function(){function s(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}return s.prototype.unsubscribe=function(){var e,t,r,n,i;if(!this.closed){this.closed=!0;var o=this._parentage;if(o)if(this._parentage=null,Array.isArray(o))try{for(var a=Z(o),c=a.next();!c.done;c=a.next()){var u=c.value;u.remove(this)}}catch(f){e={error:f}}finally{try{c&&!c.done&&(t=a.return)&&t.call(a)}finally{if(e)throw e.error}}else o.remove(this);var P=this.initialTeardown;if(j(P))try{P()}catch(f){i=f instanceof K?f.errors:[f]}var S=this._finalizers;if(S){this._finalizers=null;try{for(var h=Z(S),p=h.next();!p.done;p=h.next()){var b=p.value;try{le(b)}catch(f){i=i??[],f instanceof K?i=te(te([],ee(i)),ee(f.errors)):i.push(f)}}}catch(f){r={error:f}}finally{try{p&&!p.done&&(n=h.return)&&n.call(h)}finally{if(r)throw r.error}}}if(i)throw new K(i)}},s.prototype.add=function(e){var t;if(e&&e!==this)if(this.closed)le(e);else{if(e instanceof s){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}},s.prototype._hasParent=function(e){var t=this._parentage;return t===e||Array.isArray(t)&&t.includes(e)},s.prototype._addParent=function(e){var t=this._parentage;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e},s.prototype._removeParent=function(e){var t=this._parentage;t===e?this._parentage=null:Array.isArray(t)&&re(t,e)},s.prototype.remove=function(e){var t=this._finalizers;t&&re(t,e),e instanceof s&&e._removeParent(this)},s.EMPTY=function(){var e=new s;return e.closed=!0,e}(),s}(),we=H.EMPTY;function ge(s){return s instanceof H||s&&"closed"in s&&j(s.remove)&&j(s.add)&&j(s.unsubscribe)}function le(s){j(s)?s():s.unsubscribe()}var Pe={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},Se={setTimeout:function(s,e){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];return setTimeout.apply(void 0,te([s,e],ee(t)))},clearTimeout:function(s){var e=Se.delegate;return((e==null?void 0:e.clearTimeout)||clearTimeout)(s)},delegate:void 0};function He(s){Se.setTimeout(function(){throw s})}function ue(){}function B(s){s()}var Ee=function(s){U(e,s);function e(t){var r=s.call(this)||this;return r.isStopped=!1,t?(r.destination=t,ge(t)&&t.add(r)):r.destination=Ke,r}return e.create=function(t,r,n){return new se(t,r,n)},e.prototype.next=function(t){this.isStopped||this._next(t)},e.prototype.error=function(t){this.isStopped||(this.isStopped=!0,this._error(t))},e.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,s.prototype.unsubscribe.call(this),this.destination=null)},e.prototype._next=function(t){this.destination.next(t)},e.prototype._error=function(t){try{this.destination.error(t)}finally{this.unsubscribe()}},e.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},e}(H),Qe=Function.prototype.bind;function Y(s,e){return Qe.call(s,e)}var Ge=function(){function s(e){this.partialObserver=e}return s.prototype.next=function(e){var t=this.partialObserver;if(t.next)try{t.next(e)}catch(r){V(r)}},s.prototype.error=function(e){var t=this.partialObserver;if(t.error)try{t.error(e)}catch(r){V(r)}else V(e)},s.prototype.complete=function(){var e=this.partialObserver;if(e.complete)try{e.complete()}catch(t){V(t)}},s}(),se=function(s){U(e,s);function e(t,r,n){var i=s.call(this)||this,o;if(j(t)||!t)o={next:t??void 0,error:r??void 0,complete:n??void 0};else{var a;i&&Pe.useDeprecatedNextContext?(a=Object.create(t),a.unsubscribe=function(){return i.unsubscribe()},o={next:t.next&&Y(t.next,a),error:t.error&&Y(t.error,a),complete:t.complete&&Y(t.complete,a)}):o=t}return i.destination=new Ge(o),i}return e}(Ee);function V(s){He(s)}function Je(s){throw s}var Ke={closed:!0,next:ue,error:Je,complete:ue},Ye=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}();function Xe(s){return s}function ze(s){return s.length===0?Xe:s.length===1?s[0]:function(t){return s.reduce(function(r,n){return n(r)},t)}}var de=function(){function s(e){e&&(this._subscribe=e)}return s.prototype.lift=function(e){var t=new s;return t.source=this,t.operator=e,t},s.prototype.subscribe=function(e,t,r){var n=this,i=et(e)?e:new se(e,t,r);return B(function(){var o=n,a=o.operator,c=o.source;i.add(a?a.call(i,c):c?n._subscribe(i):n._trySubscribe(i))}),i},s.prototype._trySubscribe=function(e){try{return this._subscribe(e)}catch(t){e.error(t)}},s.prototype.forEach=function(e,t){var r=this;return t=he(t),new t(function(n,i){var o=new se({next:function(a){try{e(a)}catch(c){i(c),o.unsubscribe()}},error:i,complete:n});r.subscribe(o)})},s.prototype._subscribe=function(e){var t;return(t=this.source)===null||t===void 0?void 0:t.subscribe(e)},s.prototype[Ye]=function(){return this},s.prototype.pipe=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return ze(e)(this)},s.prototype.toPromise=function(e){var t=this;return e=he(e),new e(function(r,n){var i;t.subscribe(function(o){return i=o},function(o){return n(o)},function(){return r(i)})})},s.create=function(e){return new s(e)},s}();function he(s){var e;return(e=s??Pe.Promise)!==null&&e!==void 0?e:Promise}function Ze(s){return s&&j(s.next)&&j(s.error)&&j(s.complete)}function et(s){return s&&s instanceof Ee||Ze(s)&&ge(s)}var tt=be(function(s){return function(){s(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}}),Ce=function(s){U(e,s);function e(){var t=s.call(this)||this;return t.closed=!1,t.currentObservers=null,t.observers=[],t.isStopped=!1,t.hasError=!1,t.thrownError=null,t}return e.prototype.lift=function(t){var r=new fe(this,this);return r.operator=t,r},e.prototype._throwIfClosed=function(){if(this.closed)throw new tt},e.prototype.next=function(t){var r=this;B(function(){var n,i;if(r._throwIfClosed(),!r.isStopped){r.currentObservers||(r.currentObservers=Array.from(r.observers));try{for(var o=Z(r.currentObservers),a=o.next();!a.done;a=o.next()){var c=a.value;c.next(t)}}catch(u){n={error:u}}finally{try{a&&!a.done&&(i=o.return)&&i.call(o)}finally{if(n)throw n.error}}}})},e.prototype.error=function(t){var r=this;B(function(){if(r._throwIfClosed(),!r.isStopped){r.hasError=r.isStopped=!0,r.thrownError=t;for(var n=r.observers;n.length;)n.shift().error(t)}})},e.prototype.complete=function(){var t=this;B(function(){if(t._throwIfClosed(),!t.isStopped){t.isStopped=!0;for(var r=t.observers;r.length;)r.shift().complete()}})},e.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(e.prototype,"observed",{get:function(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0},enumerable:!1,configurable:!0}),e.prototype._trySubscribe=function(t){return this._throwIfClosed(),s.prototype._trySubscribe.call(this,t)},e.prototype._subscribe=function(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)},e.prototype._innerSubscribe=function(t){var r=this,n=this,i=n.hasError,o=n.isStopped,a=n.observers;return i||o?we:(this.currentObservers=null,a.push(t),new H(function(){r.currentObservers=null,re(a,t)}))},e.prototype._checkFinalizedStatuses=function(t){var r=this,n=r.hasError,i=r.thrownError,o=r.isStopped;n?t.error(i):o&&t.complete()},e.prototype.asObservable=function(){var t=new de;return t.source=this,t},e.create=function(t,r){return new fe(t,r)},e}(de),fe=function(s){U(e,s);function e(t,r){var n=s.call(this)||this;return n.destination=t,n.source=r,n}return e.prototype.next=function(t){var r,n;(n=(r=this.destination)===null||r===void 0?void 0:r.next)===null||n===void 0||n.call(r,t)},e.prototype.error=function(t){var r,n;(n=(r=this.destination)===null||r===void 0?void 0:r.error)===null||n===void 0||n.call(r,t)},e.prototype.complete=function(){var t,r;(r=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||r===void 0||r.call(t)},e.prototype._subscribe=function(t){var r,n;return(n=(r=this.source)===null||r===void 0?void 0:r.subscribe(t))!==null&&n!==void 0?n:we},e}(Ce),rt=function(s){U(e,s);function e(t){var r=s.call(this)||this;return r._value=t,r}return Object.defineProperty(e.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),e.prototype._subscribe=function(t){var r=s.prototype._subscribe.call(this,t);return!r.closed&&t.next(this._value),r},e.prototype.getValue=function(){var t=this,r=t.hasError,n=t.thrownError,i=t._value;if(r)throw n;return this._throwIfClosed(),i},e.prototype.next=function(t){s.prototype.next.call(this,this._value=t)},e}(Ce);class st{constructor(e){this.sqlite=e,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(e){return Promise.reject(e)}}async saveToStore(e){try{return await this.sqlite.saveToStore({database:e}),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToLocalDisk(e){try{return await this.sqlite.saveToLocalDisk({database:e}),Promise.resolve()}catch(t){return Promise.reject(t)}}async getFromLocalDiskToStore(e){const t=e??!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:t}),Promise.resolve()}catch(r){return Promise.reject(r)}}async echo(e){try{const t=await this.sqlite.echo({value:e});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isSecretStored(){try{const e=await this.sqlite.isSecretStored();return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async setEncryptionSecret(e){try{return await this.sqlite.setEncryptionSecret({passphrase:e}),Promise.resolve()}catch(t){return Promise.reject(t)}}async changeEncryptionSecret(e,t){try{return await this.sqlite.changeEncryptionSecret({passphrase:e,oldpassphrase:t}),Promise.resolve()}catch(r){return Promise.reject(r)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(e){return Promise.reject(e)}}async checkEncryptionSecret(e){try{const t=await this.sqlite.checkEncryptionSecret({passphrase:e});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async addUpgradeStatement(e,t){try{return e.endsWith(".db")&&(e=e.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:e,upgrade:t}),Promise.resolve()}catch(r){return Promise.reject(r)}}async createConnection(e,t,r,n,i){try{e.endsWith(".db")&&(e=e.slice(0,-3)),await this.sqlite.createConnection({database:e,encrypted:t,mode:r,version:n,readonly:i});const o=new me(e,i,this.sqlite),a=i?`RO_${e}`:`RW_${e}`;return this._connectionDict.set(a,o),Promise.resolve(o)}catch(o){return Promise.reject(o)}}async closeConnection(e,t){try{e.endsWith(".db")&&(e=e.slice(0,-3)),await this.sqlite.closeConnection({database:e,readonly:t});const r=t?`RO_${e}`:`RW_${e}`;return this._connectionDict.delete(r),Promise.resolve()}catch(r){return Promise.reject(r)}}async isConnection(e,t){const r={};e.endsWith(".db")&&(e=e.slice(0,-3));const n=t?`RO_${e}`:`RW_${e}`;return r.result=this._connectionDict.has(n),Promise.resolve(r)}async retrieveConnection(e,t){e.endsWith(".db")&&(e=e.slice(0,-3));const r=t?`RO_${e}`:`RW_${e}`;if(this._connectionDict.has(r)){const n=this._connectionDict.get(r);return typeof n<"u"?Promise.resolve(n):Promise.reject(`Connection ${e} is undefined`)}else return Promise.reject(`Connection ${e} does not exist`)}async getNCDatabasePath(e,t){try{const r=await this.sqlite.getNCDatabasePath({path:e,database:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async createNCConnection(e,t){try{await this.sqlite.createNCConnection({databasePath:e,version:t});const r=new me(e,!0,this.sqlite),n=`RO_${e})`;return this._connectionDict.set(n,r),Promise.resolve(r)}catch(r){return Promise.reject(r)}}async closeNCConnection(e){try{await this.sqlite.closeNCConnection({databasePath:e});const t=`RO_${e})`;return this._connectionDict.delete(t),Promise.resolve()}catch(t){return Promise.reject(t)}}async isNCConnection(e){const t={},r=`RO_${e})`;return t.result=this._connectionDict.has(r),Promise.resolve(t)}async retrieveNCConnection(e){if(this._connectionDict.has(e)){const t=`RO_${e})`,r=this._connectionDict.get(t);return typeof r<"u"?Promise.resolve(r):Promise.reject(`Connection ${e} is undefined`)}else return Promise.reject(`Connection ${e} does not exist`)}async isNCDatabase(e){try{const t=await this.sqlite.isNCDatabase({databasePath:e});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){const e=new Map;try{for(const t of this._connectionDict.keys()){const r=t.substring(3),n=t.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:r,readonly:n}),e.set(t,null)}for(const t of e.keys())this._connectionDict.delete(t);return Promise.resolve()}catch(t){return Promise.reject(t)}}async checkConnectionsConsistency(){try{const e=[...this._connectionDict.keys()],t=[],r=[];for(const i of e)t.push(i.substring(0,2)),r.push(i.substring(3));const n=await this.sqlite.checkConnectionsConsistency({dbNames:r,openModes:t});return n.result||(this._connectionDict=new Map),Promise.resolve(n)}catch(e){return this._connectionDict=new Map,Promise.reject(e)}}async importFromJson(e){try{const t=await this.sqlite.importFromJson({jsonstring:e});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isJsonValid(e){try{const t=await this.sqlite.isJsonValid({jsonstring:e});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async copyFromAssets(e){const t=e??!0;try{return await this.sqlite.copyFromAssets({overwrite:t}),Promise.resolve()}catch(r){return Promise.reject(r)}}async getFromHTTPRequest(e,t){const r=t??!0;try{return await this.sqlite.getFromHTTPRequest({url:e,overwrite:r}),Promise.resolve()}catch(n){return Promise.reject(n)}}async isDatabaseEncrypted(e){e.endsWith(".db")&&(e=e.slice(0,-3));try{const t=await this.sqlite.isDatabaseEncrypted({database:e});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigEncryption(){try{const e=await this.sqlite.isInConfigEncryption();return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async isInConfigBiometricAuth(){try{const e=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async isDatabase(e){e.endsWith(".db")&&(e=e.slice(0,-3));try{const t=await this.sqlite.isDatabase({database:e});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getDatabaseList(){try{const t=(await this.sqlite.getDatabaseList()).values;t.sort();const r={values:t};return Promise.resolve(r)}catch(e){return Promise.reject(e)}}async getMigratableDbList(e){const t=e||"default";try{const r=await this.sqlite.getMigratableDbList({folderPath:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async addSQLiteSuffix(e,t){const r=e||"default",n=t||[];try{const i=await this.sqlite.addSQLiteSuffix({folderPath:r,dbNameList:n});return Promise.resolve(i)}catch(i){return Promise.reject(i)}}async deleteOldDatabases(e,t){const r=e||"default",n=t||[];try{const i=await this.sqlite.deleteOldDatabases({folderPath:r,dbNameList:n});return Promise.resolve(i)}catch(i){return Promise.reject(i)}}async moveDatabasesAndAddSuffix(e,t){const r=e||"default",n=t||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:r,dbNameList:n})}}class me{constructor(e,t,r){this.dbName=e,this.readonly=t,this.sqlite=r}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(e){return Promise.reject(e)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(e){return Promise.reject(e)}}async beginTransaction(){try{const e=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async commitTransaction(){try{const e=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async rollbackTransaction(){try{const e=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async isTransactionActive(){try{const e=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async loadExtension(e){try{return await this.sqlite.loadExtension({database:this.dbName,path:e,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async enableLoadExtension(e){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:e,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async getUrl(){try{const e=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async getVersion(){try{const e=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async getTableList(){try{const e=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async execute(e,t=!0,r=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const n=await this.sqlite.execute({database:this.dbName,statements:e,transaction:t,readonly:!1,isSQL92:r});return Promise.resolve(n)}}catch(n){return Promise.reject(n)}}async query(e,t,r=!0){let n;try{return t&&t.length>0?n=await this.sqlite.query({database:this.dbName,statement:e,values:t,readonly:this.readonly,isSQL92:!0}):n=await this.sqlite.query({database:this.dbName,statement:e,values:[],readonly:this.readonly,isSQL92:r}),n=await this.reorderRows(n),Promise.resolve(n)}catch(i){return Promise.reject(i)}}async run(e,t,r=!0,n="no",i=!0){let o;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(t&&t.length>0?o=await this.sqlite.run({database:this.dbName,statement:e,values:t,transaction:r,readonly:!1,returnMode:n,isSQL92:!0}):o=await this.sqlite.run({database:this.dbName,statement:e,values:[],transaction:r,readonly:!1,returnMode:n,isSQL92:i}),o.changes=await this.reorderRows(o.changes),Promise.resolve(o))}catch(a){return Promise.reject(a)}}async executeSet(e,t=!0,r="no",n=!0){let i;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(i=await this.sqlite.executeSet({database:this.dbName,set:e,transaction:t,readonly:!1,returnMode:r,isSQL92:n}),i.changes=await this.reorderRows(i.changes),Promise.resolve(i))}catch(o){return Promise.reject(o)}}async isExists(){try{const e=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async isTable(e){try{const t=await this.sqlite.isTableExists({database:this.dbName,table:e,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDBOpen(){try{const e=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(e){return Promise.reject(e)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{const e=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(e)}}catch(e){return Promise.reject(e)}}async setSyncDate(e){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:e,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async getSyncDate(){try{const e=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly});let t="";return e.syncDate>0&&(t=new Date(e.syncDate*1e3).toISOString()),Promise.resolve(t)}catch(e){return Promise.reject(e)}}async exportToJson(e,t=!1){try{const r=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:e,readonly:this.readonly,encrypted:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(e){return Promise.reject(e)}}async executeTransaction(e,t=!0){let r=0,n=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),n=await this.sqlite.isTransactionActive({database:this.dbName}),!n)return Promise.reject("After Begin Transaction, no transaction active");try{for(const a of e){if(typeof a!="object"||!("statement"in a))throw new Error("Error a task.statement must be provided");if("values"in a&&a.values&&a.values.length>0){const c=a.statement.toUpperCase().includes("RETURNING")?"all":"no",u=await this.sqlite.run({database:this.dbName,statement:a.statement,values:a.values,transaction:!1,readonly:!1,returnMode:c,isSQL92:t});if(u.changes.changes<=0)throw new Error("Error in transaction method run ");r+=u.changes.changes}else{const c=await this.sqlite.execute({database:this.dbName,statements:a.statement,transaction:!1,readonly:!1});if(c.changes.changes<0)throw new Error("Error in transaction method execute ");r+=c.changes.changes}}const i=await this.sqlite.commitTransaction({database:this.dbName});r+=i.changes.changes;const o={changes:{changes:r}};return Promise.resolve(o)}catch(i){const o=i.message?i.message:i;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(o)}}async reorderRows(e){const t=e;if(e!=null&&e.values&&typeof e.values[0]=="object"&&Object.keys(e.values[0]).includes("ios_columns")){const r=e.values[0].ios_columns,n=[];for(let i=1;i<e.values.length;i++){const o=e.values[i],a={};for(const c of r)a[c]=o[c];n.push(a)}t.values=n}return Promise.resolve(t)}}const ye=ne("CapacitorSQLite",{web:()=>Re(()=>import("./web.DitRvEc7.js"),[],import.meta.url).then(s=>new s.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite});class nt{constructor(){g(this,"platform",k.getPlatform());g(this,"sqlitePlugin",ye);g(this,"sqliteConnection",new st(ye));g(this,"dbNameVersionDict",new Map)}getPlatform(){return this.platform}async initWebStore(){try{await this.sqliteConnection.initWebStore()}catch(e){const t=e.message?e.message:e;throw new Error(`sqliteService.initWebStore: ${t}`)}}async addUpgradeStatement(e){try{await this.sqlitePlugin.addUpgradeStatement(e)}catch(t){const r=t.message?t.message:t;throw new Error(`sqliteService.addUpgradeStatement: ${r}`)}}async openDatabase(e,t,r){this.dbNameVersionDict.set(e,t);const n=!1,i="no-encryption";try{let o;const a=(await this.sqliteConnection.checkConnectionsConsistency()).result,c=(await this.sqliteConnection.isConnection(e,r)).result;if(a&&c?o=await this.sqliteConnection.retrieveConnection(e,r):o=await this.sqliteConnection.createConnection(e,n,i,t,r),await o.open(),!(await o.isDBOpen()).result)throw new Error("sqliteService.openDatabase: ddb not opened");return o}catch(o){const a=o.message?o.message:o;throw new Error(`sqliteService.openDatabase: ${a}`)}}async isConnection(e,t){try{const r=(await this.sqliteConnection.isConnection(e,t)).result;if(r!=null)return r;throw new Error("sqliteService.isConnection undefined")}catch(r){const n=r.message?r.message:r;throw new Error(`sqliteService.isConnection: ${n}`)}}async closeDatabase(e,t){try{(await this.sqliteConnection.isConnection(e,t)).result&&await this.sqliteConnection.closeConnection(e,t);return}catch(r){const n=r.message?r.message:r;throw new Error(`sqliteService.closeDatabase: ${n}`)}}async saveToStore(e){try{await this.sqliteConnection.saveToStore(e);return}catch(t){const r=t.message?t.message:t;throw new Error(`sqliteService.saveToStore: ${r}`)}}async saveToLocalDisk(e){try{await this.sqliteConnection.saveToLocalDisk(e);return}catch(t){const r=t.message?t.message:t;throw new Error(`sqliteService.saveToLocalDisk: ${r}`)}}}const F=new nt;class it{constructor(){g(this,"dbNameVersionDict",new Map)}setDbVersion(e,t){this.dbNameVersionDict.set(e,t)}getDbVersion(e){return this.dbNameVersionDict.get(e)}}const ot=new it,X=[{toVersion:1,statements:[`CREATE TABLE IF NOT EXISTS purchase_record (
            purchase_id INTEGER PRIMARY KEY AUTOINCREMENT,
            time TEXT NOT NULL
        );`,`CREATE TABLE IF NOT EXISTS purchases (
            purchase_id INTEGER,
            product_id INTEGER,
            amount INTEGER NOT NULL,
            NAME TEXT NOT NULL,
            description TEXT,
            category TEXT NOT NULL,
            price NUMERIC NOT NULL,
            PRIMARY KEY(purchase_id,product_id)
        );`]}];class at{constructor(){g(this,"versionUpgrades",X);g(this,"loadToVersion",X[X.length-1].toVersion);g(this,"db");g(this,"database","purchases");g(this,"platform",F.getPlatform());g(this,"isInitCompleted",new rt(!1))}async initializeDatabase(){try{await F.addUpgradeStatement({database:this.database,upgrade:this.versionUpgrades}),this.db=await F.openDatabase(this.database,this.loadToVersion,!1),ot.setDbVersion(this.database,this.loadToVersion),this.platform==="web"&&await F.saveToStore(this.database),this.isInitCompleted.next(!0),this.isInitCompleted.complete()}catch(e){const t=e.message?e.message:e;throw new Error(`PurchaseRecordService.initializeDatabase: ${t}`)}}async getPurchaseRecords(){let[e,t]=await Promise.all([this.db.query("SELECT purchase_id AS id, time FROM purchase_record").then(n=>n.values),this.db.query("SELECT * FROM purchases").then(n=>n.values)]);return e.map(n=>({purchases:t.filter(o=>o.purchase_id===n.id).map(o=>{const{purchase_id:a,...c}=o;return c}),...n}))}async addPurchaseRecord(e){const r=await this.db.run("INSERT INTO purchase_record (time) VALUES (?);",[e.time]);if(!(r.changes!==void 0&&r.changes.lastId!==void 0&&r.changes.lastId>0))throw new Error("storageService.addPurchaseRecord: lastId not returned");const n=(await this.db.query("SELECT purchase_id FROM purchase_record;")).values,i=this.convertu8(n);for(const o of e.purchases){const c=await this.db.run("INSERT INTO purchases (purchase_id, product_id, amount, price, name, description, category) VALUES (?, ?, ?, ?, ? , ?, ?);",[i,o.product_id,o.amount,o.price,o.name,o.description,o.category]);if(!(c.changes!==void 0&&c.changes.lastId!==void 0&&c.changes.lastId>0))throw new Error("storageService.addPurchaseRecord: lastId not returned")}}async updatePurchaseRecordById(e){const t=`UPDATE purchase_record SET WHERE id=${e}`;await this.db.run(t)}async deletePurchaseRecordById(e){const t=`DELETE FROM purchase_record WHERE id=${e}`;await this.db.run(t)}getDatabaseName(){return this.database}getDatabaseVersion(){return this.loadToVersion}convertu8(e){return e.length}}const yt=new at;export{rt as B,k as C,ve as W,ot as d,ht as e,ft as o,yt as p,F as s,mt as u};
