var bM=Object.defineProperty;var EM=(r,e,n)=>e in r?bM(r,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[e]=n;var ie=(r,e,n)=>EM(r,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();var Kd={exports:{}},pc={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v_;function TM(){if(v_)return pc;v_=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function n(a,o,c){var u=null;if(c!==void 0&&(u=""+c),o.key!==void 0&&(u=""+o.key),"key"in o){c={};for(var p in o)p!=="key"&&(c[p]=o[p])}else c=o;return o=c.ref,{$$typeof:r,type:a,key:u,ref:o!==void 0?o:null,props:c}}return pc.Fragment=e,pc.jsx=n,pc.jsxs=n,pc}var __;function AM(){return __||(__=1,Kd.exports=TM()),Kd.exports}var D=AM(),Qd={exports:{}},mc={},Jd={exports:{}},$d={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x_;function wM(){return x_||(x_=1,(function(r){function e(H,k){var te=H.length;H.push(k);e:for(;0<te;){var _e=te-1>>>1,Ae=H[_e];if(0<o(Ae,k))H[_e]=k,H[te]=Ae,te=_e;else break e}}function n(H){return H.length===0?null:H[0]}function a(H){if(H.length===0)return null;var k=H[0],te=H.pop();if(te!==k){H[0]=te;e:for(var _e=0,Ae=H.length,P=Ae>>>1;_e<P;){var Q=2*(_e+1)-1,Ce=H[Q],Ie=Q+1,je=H[Ie];if(0>o(Ce,te))Ie<Ae&&0>o(je,Ce)?(H[_e]=je,H[Ie]=te,_e=Ie):(H[_e]=Ce,H[Q]=te,_e=Q);else if(Ie<Ae&&0>o(je,te))H[_e]=je,H[Ie]=te,_e=Ie;else break e}}return k}function o(H,k){var te=H.sortIndex-k.sortIndex;return te!==0?te:H.id-k.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var u=Date,p=u.now();r.unstable_now=function(){return u.now()-p}}var m=[],d=[],v=1,_=null,g=3,M=!1,E=!1,C=!1,y=!1,x=typeof setTimeout=="function"?setTimeout:null,O=typeof clearTimeout=="function"?clearTimeout:null,N=typeof setImmediate<"u"?setImmediate:null;function R(H){for(var k=n(d);k!==null;){if(k.callback===null)a(d);else if(k.startTime<=H)a(d),k.sortIndex=k.expirationTime,e(m,k);else break;k=n(d)}}function I(H){if(C=!1,R(H),!E)if(n(m)!==null)E=!0,L||(L=!0,Y());else{var k=n(d);k!==null&&ae(I,k.startTime-H)}}var L=!1,z=-1,T=5,B=-1;function Z(){return y?!0:!(r.unstable_now()-B<T)}function G(){if(y=!1,L){var H=r.unstable_now();B=H;var k=!0;try{e:{E=!1,C&&(C=!1,O(z),z=-1),M=!0;var te=g;try{t:{for(R(H),_=n(m);_!==null&&!(_.expirationTime>H&&Z());){var _e=_.callback;if(typeof _e=="function"){_.callback=null,g=_.priorityLevel;var Ae=_e(_.expirationTime<=H);if(H=r.unstable_now(),typeof Ae=="function"){_.callback=Ae,R(H),k=!0;break t}_===n(m)&&a(m),R(H)}else a(m);_=n(m)}if(_!==null)k=!0;else{var P=n(d);P!==null&&ae(I,P.startTime-H),k=!1}}break e}finally{_=null,g=te,M=!1}k=void 0}}finally{k?Y():L=!1}}}var Y;if(typeof N=="function")Y=function(){N(G)};else if(typeof MessageChannel<"u"){var de=new MessageChannel,xe=de.port2;de.port1.onmessage=G,Y=function(){xe.postMessage(null)}}else Y=function(){x(G,0)};function ae(H,k){z=x(function(){H(r.unstable_now())},k)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(H){H.callback=null},r.unstable_forceFrameRate=function(H){0>H||125<H?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<H?Math.floor(1e3/H):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(H){switch(g){case 1:case 2:case 3:var k=3;break;default:k=g}var te=g;g=k;try{return H()}finally{g=te}},r.unstable_requestPaint=function(){y=!0},r.unstable_runWithPriority=function(H,k){switch(H){case 1:case 2:case 3:case 4:case 5:break;default:H=3}var te=g;g=H;try{return k()}finally{g=te}},r.unstable_scheduleCallback=function(H,k,te){var _e=r.unstable_now();switch(typeof te=="object"&&te!==null?(te=te.delay,te=typeof te=="number"&&0<te?_e+te:_e):te=_e,H){case 1:var Ae=-1;break;case 2:Ae=250;break;case 5:Ae=1073741823;break;case 4:Ae=1e4;break;default:Ae=5e3}return Ae=te+Ae,H={id:v++,callback:k,priorityLevel:H,startTime:te,expirationTime:Ae,sortIndex:-1},te>_e?(H.sortIndex=te,e(d,H),n(m)===null&&H===n(d)&&(C?(O(z),z=-1):C=!0,ae(I,te-_e))):(H.sortIndex=Ae,e(m,H),E||M||(E=!0,L||(L=!0,Y()))),H},r.unstable_shouldYield=Z,r.unstable_wrapCallback=function(H){var k=g;return function(){var te=g;g=k;try{return H.apply(this,arguments)}finally{g=te}}}})($d)),$d}var y_;function RM(){return y_||(y_=1,Jd.exports=wM()),Jd.exports}var ep={exports:{}},Rt={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var S_;function CM(){if(S_)return Rt;S_=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),u=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),g=Symbol.iterator;function M(P){return P===null||typeof P!="object"?null:(P=g&&P[g]||P["@@iterator"],typeof P=="function"?P:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,y={};function x(P,Q,Ce){this.props=P,this.context=Q,this.refs=y,this.updater=Ce||E}x.prototype.isReactComponent={},x.prototype.setState=function(P,Q){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,Q,"setState")},x.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function O(){}O.prototype=x.prototype;function N(P,Q,Ce){this.props=P,this.context=Q,this.refs=y,this.updater=Ce||E}var R=N.prototype=new O;R.constructor=N,C(R,x.prototype),R.isPureReactComponent=!0;var I=Array.isArray;function L(){}var z={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function B(P,Q,Ce){var Ie=Ce.ref;return{$$typeof:r,type:P,key:Q,ref:Ie!==void 0?Ie:null,props:Ce}}function Z(P,Q){return B(P.type,Q,P.props)}function G(P){return typeof P=="object"&&P!==null&&P.$$typeof===r}function Y(P){var Q={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(Ce){return Q[Ce]})}var de=/\/+/g;function xe(P,Q){return typeof P=="object"&&P!==null&&P.key!=null?Y(""+P.key):Q.toString(36)}function ae(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(L,L):(P.status="pending",P.then(function(Q){P.status==="pending"&&(P.status="fulfilled",P.value=Q)},function(Q){P.status==="pending"&&(P.status="rejected",P.reason=Q)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function H(P,Q,Ce,Ie,je){var re=typeof P;(re==="undefined"||re==="boolean")&&(P=null);var Se=!1;if(P===null)Se=!0;else switch(re){case"bigint":case"string":case"number":Se=!0;break;case"object":switch(P.$$typeof){case r:case e:Se=!0;break;case v:return Se=P._init,H(Se(P._payload),Q,Ce,Ie,je)}}if(Se)return je=je(P),Se=Ie===""?"."+xe(P,0):Ie,I(je)?(Ce="",Se!=null&&(Ce=Se.replace(de,"$&/")+"/"),H(je,Q,Ce,"",function(vt){return vt})):je!=null&&(G(je)&&(je=Z(je,Ce+(je.key==null||P&&P.key===je.key?"":(""+je.key).replace(de,"$&/")+"/")+Se)),Q.push(je)),1;Se=0;var Re=Ie===""?".":Ie+":";if(I(P))for(var nt=0;nt<P.length;nt++)Ie=P[nt],re=Re+xe(Ie,nt),Se+=H(Ie,Q,Ce,re,je);else if(nt=M(P),typeof nt=="function")for(P=nt.call(P),nt=0;!(Ie=P.next()).done;)Ie=Ie.value,re=Re+xe(Ie,nt++),Se+=H(Ie,Q,Ce,re,je);else if(re==="object"){if(typeof P.then=="function")return H(ae(P),Q,Ce,Ie,je);throw Q=String(P),Error("Objects are not valid as a React child (found: "+(Q==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":Q)+"). If you meant to render a collection of children, use an array instead.")}return Se}function k(P,Q,Ce){if(P==null)return P;var Ie=[],je=0;return H(P,Ie,"","",function(re){return Q.call(Ce,re,je++)}),Ie}function te(P){if(P._status===-1){var Q=P._result;Q=Q(),Q.then(function(Ce){(P._status===0||P._status===-1)&&(P._status=1,P._result=Ce)},function(Ce){(P._status===0||P._status===-1)&&(P._status=2,P._result=Ce)}),P._status===-1&&(P._status=0,P._result=Q)}if(P._status===1)return P._result.default;throw P._result}var _e=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Q=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(Q))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},Ae={map:k,forEach:function(P,Q,Ce){k(P,function(){Q.apply(this,arguments)},Ce)},count:function(P){var Q=0;return k(P,function(){Q++}),Q},toArray:function(P){return k(P,function(Q){return Q})||[]},only:function(P){if(!G(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return Rt.Activity=_,Rt.Children=Ae,Rt.Component=x,Rt.Fragment=n,Rt.Profiler=o,Rt.PureComponent=N,Rt.StrictMode=a,Rt.Suspense=m,Rt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=z,Rt.__COMPILER_RUNTIME={__proto__:null,c:function(P){return z.H.useMemoCache(P)}},Rt.cache=function(P){return function(){return P.apply(null,arguments)}},Rt.cacheSignal=function(){return null},Rt.cloneElement=function(P,Q,Ce){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var Ie=C({},P.props),je=P.key;if(Q!=null)for(re in Q.key!==void 0&&(je=""+Q.key),Q)!T.call(Q,re)||re==="key"||re==="__self"||re==="__source"||re==="ref"&&Q.ref===void 0||(Ie[re]=Q[re]);var re=arguments.length-2;if(re===1)Ie.children=Ce;else if(1<re){for(var Se=Array(re),Re=0;Re<re;Re++)Se[Re]=arguments[Re+2];Ie.children=Se}return B(P.type,je,Ie)},Rt.createContext=function(P){return P={$$typeof:u,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:c,_context:P},P},Rt.createElement=function(P,Q,Ce){var Ie,je={},re=null;if(Q!=null)for(Ie in Q.key!==void 0&&(re=""+Q.key),Q)T.call(Q,Ie)&&Ie!=="key"&&Ie!=="__self"&&Ie!=="__source"&&(je[Ie]=Q[Ie]);var Se=arguments.length-2;if(Se===1)je.children=Ce;else if(1<Se){for(var Re=Array(Se),nt=0;nt<Se;nt++)Re[nt]=arguments[nt+2];je.children=Re}if(P&&P.defaultProps)for(Ie in Se=P.defaultProps,Se)je[Ie]===void 0&&(je[Ie]=Se[Ie]);return B(P,re,je)},Rt.createRef=function(){return{current:null}},Rt.forwardRef=function(P){return{$$typeof:p,render:P}},Rt.isValidElement=G,Rt.lazy=function(P){return{$$typeof:v,_payload:{_status:-1,_result:P},_init:te}},Rt.memo=function(P,Q){return{$$typeof:d,type:P,compare:Q===void 0?null:Q}},Rt.startTransition=function(P){var Q=z.T,Ce={};z.T=Ce;try{var Ie=P(),je=z.S;je!==null&&je(Ce,Ie),typeof Ie=="object"&&Ie!==null&&typeof Ie.then=="function"&&Ie.then(L,_e)}catch(re){_e(re)}finally{Q!==null&&Ce.types!==null&&(Q.types=Ce.types),z.T=Q}},Rt.unstable_useCacheRefresh=function(){return z.H.useCacheRefresh()},Rt.use=function(P){return z.H.use(P)},Rt.useActionState=function(P,Q,Ce){return z.H.useActionState(P,Q,Ce)},Rt.useCallback=function(P,Q){return z.H.useCallback(P,Q)},Rt.useContext=function(P){return z.H.useContext(P)},Rt.useDebugValue=function(){},Rt.useDeferredValue=function(P,Q){return z.H.useDeferredValue(P,Q)},Rt.useEffect=function(P,Q){return z.H.useEffect(P,Q)},Rt.useEffectEvent=function(P){return z.H.useEffectEvent(P)},Rt.useId=function(){return z.H.useId()},Rt.useImperativeHandle=function(P,Q,Ce){return z.H.useImperativeHandle(P,Q,Ce)},Rt.useInsertionEffect=function(P,Q){return z.H.useInsertionEffect(P,Q)},Rt.useLayoutEffect=function(P,Q){return z.H.useLayoutEffect(P,Q)},Rt.useMemo=function(P,Q){return z.H.useMemo(P,Q)},Rt.useOptimistic=function(P,Q){return z.H.useOptimistic(P,Q)},Rt.useReducer=function(P,Q,Ce){return z.H.useReducer(P,Q,Ce)},Rt.useRef=function(P){return z.H.useRef(P)},Rt.useState=function(P){return z.H.useState(P)},Rt.useSyncExternalStore=function(P,Q,Ce){return z.H.useSyncExternalStore(P,Q,Ce)},Rt.useTransition=function(){return z.H.useTransition()},Rt.version="19.2.8",Rt}var M_;function km(){return M_||(M_=1,ep.exports=CM()),ep.exports}var tp={exports:{}},Ai={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var b_;function DM(){if(b_)return Ai;b_=1;var r=km();function e(m){var d="https://react.dev/errors/"+m;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)d+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+m+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var a={d:{f:n,r:function(){throw Error(e(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},o=Symbol.for("react.portal");function c(m,d,v){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:_==null?null:""+_,children:m,containerInfo:d,implementation:v}}var u=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(m,d){if(m==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return Ai.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,Ai.createPortal=function(m,d){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(e(299));return c(m,d,null,v)},Ai.flushSync=function(m){var d=u.T,v=a.p;try{if(u.T=null,a.p=2,m)return m()}finally{u.T=d,a.p=v,a.d.f()}},Ai.preconnect=function(m,d){typeof m=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,a.d.C(m,d))},Ai.prefetchDNS=function(m){typeof m=="string"&&a.d.D(m)},Ai.preinit=function(m,d){if(typeof m=="string"&&d&&typeof d.as=="string"){var v=d.as,_=p(v,d.crossOrigin),g=typeof d.integrity=="string"?d.integrity:void 0,M=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;v==="style"?a.d.S(m,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:_,integrity:g,fetchPriority:M}):v==="script"&&a.d.X(m,{crossOrigin:_,integrity:g,fetchPriority:M,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},Ai.preinitModule=function(m,d){if(typeof m=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var v=p(d.as,d.crossOrigin);a.d.M(m,{crossOrigin:v,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&a.d.M(m)},Ai.preload=function(m,d){if(typeof m=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var v=d.as,_=p(v,d.crossOrigin);a.d.L(m,v,{crossOrigin:_,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},Ai.preloadModule=function(m,d){if(typeof m=="string")if(d){var v=p(d.as,d.crossOrigin);a.d.m(m,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:v,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else a.d.m(m)},Ai.requestFormReset=function(m){a.d.r(m)},Ai.unstable_batchedUpdates=function(m,d){return m(d)},Ai.useFormState=function(m,d,v){return u.H.useFormState(m,d,v)},Ai.useFormStatus=function(){return u.H.useHostTransitionStatus()},Ai.version="19.2.8",Ai}var E_;function NM(){if(E_)return tp.exports;E_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),tp.exports=DM(),tp.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var T_;function LM(){if(T_)return mc;T_=1;var r=RM(),e=km(),n=NM();function a(t){var i="https://react.dev/errors/"+t;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+t+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var i=t,s=t;if(t.alternate)for(;i.return;)i=i.return;else{t=i;do i=t,(i.flags&4098)!==0&&(s=i.return),t=i.return;while(t)}return i.tag===3?s:null}function u(t){if(t.tag===13){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function p(t){if(t.tag===31){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(a(188))}function d(t){var i=t.alternate;if(!i){if(i=c(t),i===null)throw Error(a(188));return i!==t?null:t}for(var s=t,l=i;;){var f=s.return;if(f===null)break;var h=f.alternate;if(h===null){if(l=f.return,l!==null){s=l;continue}break}if(f.child===h.child){for(h=f.child;h;){if(h===s)return m(f),t;if(h===l)return m(f),i;h=h.sibling}throw Error(a(188))}if(s.return!==l.return)s=f,l=h;else{for(var S=!1,w=f.child;w;){if(w===s){S=!0,s=f,l=h;break}if(w===l){S=!0,l=f,s=h;break}w=w.sibling}if(!S){for(w=h.child;w;){if(w===s){S=!0,s=h,l=f;break}if(w===l){S=!0,l=h,s=f;break}w=w.sibling}if(!S)throw Error(a(189))}}if(s.alternate!==l)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?t:i}function v(t){var i=t.tag;if(i===5||i===26||i===27||i===6)return t;for(t=t.child;t!==null;){if(i=v(t),i!==null)return i;t=t.sibling}return null}var _=Object.assign,g=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),C=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),x=Symbol.for("react.profiler"),O=Symbol.for("react.consumer"),N=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),I=Symbol.for("react.suspense"),L=Symbol.for("react.suspense_list"),z=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),B=Symbol.for("react.activity"),Z=Symbol.for("react.memo_cache_sentinel"),G=Symbol.iterator;function Y(t){return t===null||typeof t!="object"?null:(t=G&&t[G]||t["@@iterator"],typeof t=="function"?t:null)}var de=Symbol.for("react.client.reference");function xe(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===de?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case C:return"Fragment";case x:return"Profiler";case y:return"StrictMode";case I:return"Suspense";case L:return"SuspenseList";case B:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case E:return"Portal";case N:return t.displayName||"Context";case O:return(t._context.displayName||"Context")+".Consumer";case R:var i=t.render;return t=t.displayName,t||(t=i.displayName||i.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case z:return i=t.displayName||null,i!==null?i:xe(t.type)||"Memo";case T:i=t._payload,t=t._init;try{return xe(t(i))}catch{}}return null}var ae=Array.isArray,H=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,te={pending:!1,data:null,method:null,action:null},_e=[],Ae=-1;function P(t){return{current:t}}function Q(t){0>Ae||(t.current=_e[Ae],_e[Ae]=null,Ae--)}function Ce(t,i){Ae++,_e[Ae]=t.current,t.current=i}var Ie=P(null),je=P(null),re=P(null),Se=P(null);function Re(t,i){switch(Ce(re,i),Ce(je,t),Ce(Ie,null),i.nodeType){case 9:case 11:t=(t=i.documentElement)&&(t=t.namespaceURI)?Hv(t):0;break;default:if(t=i.tagName,i=i.namespaceURI)i=Hv(i),t=Gv(i,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Q(Ie),Ce(Ie,t)}function nt(){Q(Ie),Q(je),Q(re)}function vt(t){t.memoizedState!==null&&Ce(Se,t);var i=Ie.current,s=Gv(i,t.type);i!==s&&(Ce(je,t),Ce(Ie,s))}function Ze(t){je.current===t&&(Q(Ie),Q(je)),Se.current===t&&(Q(Se),uc._currentValue=te)}var yn,Ot;function Vt(t){if(yn===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);yn=i&&i[1]||"",Ot=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+yn+t+Ot}var Xt=!1;function It(t,i){if(!t||Xt)return"";Xt=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(i){var Te=function(){throw Error()};if(Object.defineProperty(Te.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Te,[])}catch(ge){var pe=ge}Reflect.construct(t,[],Te)}else{try{Te.call()}catch(ge){pe=ge}t.call(Te.prototype)}}else{try{throw Error()}catch(ge){pe=ge}(Te=t())&&typeof Te.catch=="function"&&Te.catch(function(){})}}catch(ge){if(ge&&pe&&typeof ge.stack=="string")return[ge.stack,pe.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var f=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");f&&f.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=l.DetermineComponentFrameRoot(),S=h[0],w=h[1];if(S&&w){var V=S.split(`
`),fe=w.split(`
`);for(f=l=0;l<V.length&&!V[l].includes("DetermineComponentFrameRoot");)l++;for(;f<fe.length&&!fe[f].includes("DetermineComponentFrameRoot");)f++;if(l===V.length||f===fe.length)for(l=V.length-1,f=fe.length-1;1<=l&&0<=f&&V[l]!==fe[f];)f--;for(;1<=l&&0<=f;l--,f--)if(V[l]!==fe[f]){if(l!==1||f!==1)do if(l--,f--,0>f||V[l]!==fe[f]){var be=`
`+V[l].replace(" at new "," at ");return t.displayName&&be.includes("<anonymous>")&&(be=be.replace("<anonymous>",t.displayName)),be}while(1<=l&&0<=f);break}}}finally{Xt=!1,Error.prepareStackTrace=s}return(s=t?t.displayName||t.name:"")?Vt(s):""}function Dn(t,i){switch(t.tag){case 26:case 27:case 5:return Vt(t.type);case 16:return Vt("Lazy");case 13:return t.child!==i&&i!==null?Vt("Suspense Fallback"):Vt("Suspense");case 19:return Vt("SuspenseList");case 0:case 15:return It(t.type,!1);case 11:return It(t.type.render,!1);case 1:return It(t.type,!0);case 31:return Vt("Activity");default:return""}}function Nn(t){try{var i="",s=null;do i+=Dn(t,s),s=t,t=t.return;while(t);return i}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var Ln=Object.prototype.hasOwnProperty,Hn=r.unstable_scheduleCallback,dn=r.unstable_cancelCallback,Un=r.unstable_shouldYield,j=r.unstable_requestPaint,nn=r.unstable_now,an=r.unstable_getCurrentPriorityLevel,U=r.unstable_ImmediatePriority,b=r.unstable_UserBlockingPriority,$=r.unstable_NormalPriority,he=r.unstable_LowPriority,ve=r.unstable_IdlePriority,Oe=r.log,Ge=r.unstable_setDisableYieldValue,me=null,ye=null;function He(t){if(typeof Oe=="function"&&Ge(t),ye&&typeof ye.setStrictMode=="function")try{ye.setStrictMode(me,t)}catch{}}var $e=Math.clz32?Math.clz32:ht,qe=Math.log,ke=Math.LN2;function ht(t){return t>>>=0,t===0?32:31-(qe(t)/ke|0)|0}var pt=256,_t=262144,q=4194304;function ze(t){var i=t&42;if(i!==0)return i;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Me(t,i,s){var l=t.pendingLanes;if(l===0)return 0;var f=0,h=t.suspendedLanes,S=t.pingedLanes;t=t.warmLanes;var w=l&134217727;return w!==0?(l=w&~h,l!==0?f=ze(l):(S&=w,S!==0?f=ze(S):s||(s=w&~t,s!==0&&(f=ze(s))))):(w=l&~h,w!==0?f=ze(w):S!==0?f=ze(S):s||(s=l&~t,s!==0&&(f=ze(s)))),f===0?0:i!==0&&i!==f&&(i&h)===0&&(h=f&-f,s=i&-i,h>=s||h===32&&(s&4194048)!==0)?i:f}function Fe(t,i){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&i)===0}function We(t,i){switch(t){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function we(){var t=q;return q<<=1,(q&62914560)===0&&(q=4194304),t}function De(t){for(var i=[],s=0;31>s;s++)i.push(t);return i}function Qe(t,i){t.pendingLanes|=i,i!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Sn(t,i,s,l,f,h){var S=t.pendingLanes;t.pendingLanes=s,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=s,t.entangledLanes&=s,t.errorRecoveryDisabledLanes&=s,t.shellSuspendCounter=0;var w=t.entanglements,V=t.expirationTimes,fe=t.hiddenUpdates;for(s=S&~s;0<s;){var be=31-$e(s),Te=1<<be;w[be]=0,V[be]=-1;var pe=fe[be];if(pe!==null)for(fe[be]=null,be=0;be<pe.length;be++){var ge=pe[be];ge!==null&&(ge.lane&=-536870913)}s&=~Te}l!==0&&on(t,l,0),h!==0&&f===0&&t.tag!==0&&(t.suspendedLanes|=h&~(S&~i))}function on(t,i,s){t.pendingLanes|=i,t.suspendedLanes&=~i;var l=31-$e(i);t.entangledLanes|=i,t.entanglements[l]=t.entanglements[l]|1073741824|s&261930}function xi(t,i){var s=t.entangledLanes|=i;for(t=t.entanglements;s;){var l=31-$e(s),f=1<<l;f&i|t[l]&i&&(t[l]|=i),s&=~f}}function yi(t,i){var s=i&-i;return s=(s&42)!==0?1:Ds(s),(s&(t.suspendedLanes|i))!==0?0:s}function Ds(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Yi(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function br(){var t=k.p;return t!==0?t:(t=window.event,t===void 0?32:u_(t.type))}function Ta(t,i){var s=k.p;try{return k.p=t,i()}finally{k.p=s}}var oa=Math.random().toString(36).slice(2),Vn="__reactFiber$"+oa,ni="__reactProps$"+oa,Si="__reactContainer$"+oa,Aa="__reactEvents$"+oa,Ja="__reactListeners$"+oa,$a="__reactHandles$"+oa,la="__reactResources$"+oa,ji="__reactMarker$"+oa;function ca(t){delete t[Vn],delete t[ni],delete t[Aa],delete t[Ja],delete t[$a]}function An(t){var i=t[Vn];if(i)return i;for(var s=t.parentNode;s;){if(i=s[Si]||s[Vn]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(t=jv(t);t!==null;){if(s=t[Vn])return s;t=jv(t)}return i}t=s,s=t.parentNode}return null}function Bn(t){if(t=t[Vn]||t[Si]){var i=t.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return t}return null}function za(t){var i=t.tag;if(i===5||i===26||i===27||i===6)return t.stateNode;throw Error(a(33))}function Ht(t){var i=t[la];return i||(i=t[la]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function Tt(t){t[ji]=!0}var ii=new Set,A={};function W(t,i){ce(t,i),ce(t+"Capture",i)}function ce(t,i){for(A[t]=i,t=0;t<i.length;t++)ii.add(i[t])}var oe=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),le={},Ye={};function at(t){return Ln.call(Ye,t)?!0:Ln.call(le,t)?!1:oe.test(t)?Ye[t]=!0:(le[t]=!0,!1)}function Ve(t,i,s){if(at(i))if(s===null)t.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":t.removeAttribute(i);return;case"boolean":var l=i.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){t.removeAttribute(i);return}}t.setAttribute(i,""+s)}}function st(t,i,s){if(s===null)t.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(i);return}t.setAttribute(i,""+s)}}function rt(t,i,s,l){if(l===null)t.removeAttribute(s);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(s);return}t.setAttributeNS(i,s,""+l)}}function mt(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function At(t){var i=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function ut(t,i,s){var l=Object.getOwnPropertyDescriptor(t.constructor.prototype,i);if(!t.hasOwnProperty(i)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var f=l.get,h=l.set;return Object.defineProperty(t,i,{configurable:!0,get:function(){return f.call(this)},set:function(S){s=""+S,h.call(this,S)}}),Object.defineProperty(t,i,{enumerable:l.enumerable}),{getValue:function(){return s},setValue:function(S){s=""+S},stopTracking:function(){t._valueTracker=null,delete t[i]}}}}function $t(t){if(!t._valueTracker){var i=At(t)?"checked":"value";t._valueTracker=ut(t,i,""+t[i])}}function wn(t){if(!t)return!1;var i=t._valueTracker;if(!i)return!0;var s=i.getValue(),l="";return t&&(l=At(t)?t.checked?"true":"false":t.value),t=l,t!==s?(i.setValue(t),!0):!1}function F(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var ne=/[\n"\\]/g;function Ne(t){return t.replace(ne,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function K(t,i,s,l,f,h,S,w){t.name="",S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"?t.type=S:t.removeAttribute("type"),i!=null?S==="number"?(i===0&&t.value===""||t.value!=i)&&(t.value=""+mt(i)):t.value!==""+mt(i)&&(t.value=""+mt(i)):S!=="submit"&&S!=="reset"||t.removeAttribute("value"),i!=null?et(t,S,mt(i)):s!=null?et(t,S,mt(s)):l!=null&&t.removeAttribute("value"),f==null&&h!=null&&(t.defaultChecked=!!h),f!=null&&(t.checked=f&&typeof f!="function"&&typeof f!="symbol"),w!=null&&typeof w!="function"&&typeof w!="symbol"&&typeof w!="boolean"?t.name=""+mt(w):t.removeAttribute("name")}function dt(t,i,s,l,f,h,S,w){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(t.type=h),i!=null||s!=null){if(!(h!=="submit"&&h!=="reset"||i!=null)){$t(t);return}s=s!=null?""+mt(s):"",i=i!=null?""+mt(i):s,w||i===t.value||(t.value=i),t.defaultValue=i}l=l??f,l=typeof l!="function"&&typeof l!="symbol"&&!!l,t.checked=w?t.checked:!!l,t.defaultChecked=!!l,S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"&&(t.name=S),$t(t)}function et(t,i,s){i==="number"&&F(t.ownerDocument)===t||t.defaultValue===""+s||(t.defaultValue=""+s)}function Je(t,i,s,l){if(t=t.options,i){i={};for(var f=0;f<s.length;f++)i["$"+s[f]]=!0;for(s=0;s<t.length;s++)f=i.hasOwnProperty("$"+t[s].value),t[s].selected!==f&&(t[s].selected=f),f&&l&&(t[s].defaultSelected=!0)}else{for(s=""+mt(s),i=null,f=0;f<t.length;f++){if(t[f].value===s){t[f].selected=!0,l&&(t[f].defaultSelected=!0);return}i!==null||t[f].disabled||(i=t[f])}i!==null&&(i.selected=!0)}}function un(t,i,s){if(i!=null&&(i=""+mt(i),i!==t.value&&(t.value=i),s==null)){t.defaultValue!==i&&(t.defaultValue=i);return}t.defaultValue=s!=null?""+mt(s):""}function Gt(t,i,s,l){if(i==null){if(l!=null){if(s!=null)throw Error(a(92));if(ae(l)){if(1<l.length)throw Error(a(93));l=l[0]}s=l}s==null&&(s=""),i=s}s=mt(i),t.defaultValue=s,l=t.textContent,l===s&&l!==""&&l!==null&&(t.value=l),$t(t)}function bt(t,i){if(i){var s=t.firstChild;if(s&&s===t.lastChild&&s.nodeType===3){s.nodeValue=i;return}}t.textContent=i}var Lt=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ft(t,i,s){var l=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?l?t.setProperty(i,""):i==="float"?t.cssFloat="":t[i]="":l?t.setProperty(i,s):typeof s!="number"||s===0||Lt.has(i)?i==="float"?t.cssFloat=s:t[i]=(""+s).trim():t[i]=s+"px"}function Mn(t,i,s){if(i!=null&&typeof i!="object")throw Error(a(62));if(t=t.style,s!=null){for(var l in s)!s.hasOwnProperty(l)||i!=null&&i.hasOwnProperty(l)||(l.indexOf("--")===0?t.setProperty(l,""):l==="float"?t.cssFloat="":t[l]="");for(var f in i)l=i[f],i.hasOwnProperty(f)&&s[f]!==l&&Ft(t,f,l)}else for(var h in i)i.hasOwnProperty(h)&&Ft(t,h,i[h])}function it(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Gn=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),kt=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function bn(t){return kt.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Kn(){}var Ns=null;function ci(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ai=null,Ni=null;function Sl(t){var i=Bn(t);if(i&&(t=i.stateNode)){var s=t[ni]||null;e:switch(t=i.stateNode,i.type){case"input":if(K(t,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=t;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+Ne(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var l=s[i];if(l!==t&&l.form===t.form){var f=l[ni]||null;if(!f)throw Error(a(90));K(l,f.value,f.defaultValue,f.defaultValue,f.checked,f.defaultChecked,f.type,f.name)}}for(i=0;i<s.length;i++)l=s[i],l.form===t.form&&wn(l)}break e;case"textarea":un(t,s.value,s.defaultValue);break e;case"select":i=s.value,i!=null&&Je(t,!!s.multiple,i,!1)}}}var ao=!1;function ua(t,i,s){if(ao)return t(i,s);ao=!0;try{var l=t(i);return l}finally{if(ao=!1,(ai!==null||Ni!==null)&&(wu(),ai&&(i=ai,t=Ni,Ni=ai=null,Sl(i),t)))for(i=0;i<t.length;i++)Sl(t[i])}}function es(t,i){var s=t.stateNode;if(s===null)return null;var l=s[ni]||null;if(l===null)return null;s=l[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break e;default:t=!1}if(t)return null;if(s&&typeof s!="function")throw Error(a(231,i,typeof s));return s}var fa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Et=!1;if(fa)try{var Ia={};Object.defineProperty(Ia,"passive",{get:function(){Et=!0}}),window.addEventListener("test",Ia,Ia),window.removeEventListener("test",Ia,Ia)}catch{Et=!1}var ha=null,zc=null,Er=null;function Ic(){if(Er)return Er;var t,i=zc,s=i.length,l,f="value"in ha?ha.value:ha.textContent,h=f.length;for(t=0;t<s&&i[t]===f[t];t++);var S=s-t;for(l=1;l<=S&&i[s-l]===f[h-l];l++);return Er=f.slice(t,1<l?1-l:void 0)}function so(t){var i=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&i===13&&(t=13)):t=i,t===10&&(t=13),32<=t||t===13?t:0}function Tr(){return!0}function Ml(){return!1}function hi(t){function i(s,l,f,h,S){this._reactName=s,this._targetInst=f,this.type=l,this.nativeEvent=h,this.target=S,this.currentTarget=null;for(var w in t)t.hasOwnProperty(w)&&(s=t[w],this[w]=s?s(h):h[w]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?Tr:Ml,this.isPropagationStopped=Ml,this}return _(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=Tr)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=Tr)},persist:function(){},isPersistent:Tr}),i}var ts={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bt=hi(ts),Ls=_({},ts,{view:0,detail:0}),ro=hi(Ls),Us,oo,Ha,Ar=_({},Ls,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Rr,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ha&&(Ha&&t.type==="mousemove"?(Us=t.screenX-Ha.screenX,oo=t.screenY-Ha.screenY):oo=Us=0,Ha=t),Us)},movementY:function(t){return"movementY"in t?t.movementY:oo}}),bl=hi(Ar),wt=_({},Ar,{dataTransfer:0}),zi=hi(wt),Mi=_({},Ls,{relatedTarget:0}),ns=hi(Mi),Hc=_({},ts,{animationName:0,elapsedTime:0,pseudoElement:0}),lo=hi(Hc),El=_({},ts,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),co=hi(El),Tl=_({},ts,{data:0}),Al=hi(Tl),wl={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},uo={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},wr={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function fo(t){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(t):(t=wr[t])?!!i[t]:!1}function Rr(){return fo}var Os=_({},Ls,{key:function(t){if(t.key){var i=wl[t.key]||t.key;if(i!=="Unidentified")return i}return t.type==="keypress"?(t=so(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?uo[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Rr,charCode:function(t){return t.type==="keypress"?so(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?so(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Rl=hi(Os),Gc=_({},Ar,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Cl=hi(Gc),ho=_({},Ls,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Rr}),Dl=hi(ho),kc=_({},ts,{propertyName:0,elapsedTime:0,pseudoElement:0}),Nl=hi(kc),po=_({},Ar,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Vc=hi(po),Xc=_({},ts,{newState:0,oldState:0}),qc=hi(Xc),Wc=[9,13,27,32],mo=fa&&"CompositionEvent"in window,Ps=null;fa&&"documentMode"in document&&(Ps=document.documentMode);var Li=fa&&"TextEvent"in window&&!Ps,Fs=fa&&(!mo||Ps&&8<Ps&&11>=Ps),Ll=" ",Ul=!1;function Cr(t,i){switch(t){case"keyup":return Wc.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function se(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Be=!1;function Ue(t,i){switch(t){case"compositionend":return se(i);case"keypress":return i.which!==32?null:(Ul=!0,Ll);case"textInput":return t=i.data,t===Ll&&Ul?null:t;default:return null}}function Le(t,i){if(Be)return t==="compositionend"||!mo&&Cr(t,i)?(t=Ic(),Er=zc=ha=null,Be=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Fs&&i.locale!=="ko"?null:i.data;default:return null}}var Xe={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function tt(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i==="input"?!!Xe[t.type]:i==="textarea"}function Nt(t,i,s,l){ai?Ni?Ni.push(l):Ni=[l]:ai=l,i=Ou(i,"onChange"),0<i.length&&(s=new Bt("onChange","change",null,s,l),t.push({event:s,listeners:i}))}var ft=null,fn=null;function Rn(t){Ov(t,0)}function bi(t){var i=za(t);if(wn(i))return t}function Zi(t,i){if(t==="change")return i}var zn=!1;if(fa){var Xn;if(fa){var Ki="oninput"in document;if(!Ki){var is=document.createElement("div");is.setAttribute("oninput","return;"),Ki=typeof is.oninput=="function"}Xn=Ki}else Xn=!1;zn=Xn&&(!document.documentMode||9<document.documentMode)}function Bs(){ft&&(ft.detachEvent("onpropertychange",zs),fn=ft=null)}function zs(t){if(t.propertyName==="value"&&bi(fn)){var i=[];Nt(i,fn,t,ci(t)),ua(Rn,i)}}function Ei(t,i,s){t==="focusin"?(Bs(),ft=i,fn=s,ft.attachEvent("onpropertychange",zs)):t==="focusout"&&Bs()}function wa(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return bi(fn)}function as(t,i){if(t==="click")return bi(i)}function Ol(t,i){if(t==="input"||t==="change")return bi(i)}function go(t,i){return t===i&&(t!==0||1/t===1/i)||t!==t&&i!==i}var Ti=typeof Object.is=="function"?Object.is:go;function Is(t,i){if(Ti(t,i))return!0;if(typeof t!="object"||t===null||typeof i!="object"||i===null)return!1;var s=Object.keys(t),l=Object.keys(i);if(s.length!==l.length)return!1;for(l=0;l<s.length;l++){var f=s[l];if(!Ln.call(i,f)||!Ti(t[f],i[f]))return!1}return!0}function Pl(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function sn(t,i){var s=Pl(t);t=0;for(var l;s;){if(s.nodeType===3){if(l=t+s.textContent.length,t<=i&&l>=i)return{node:s,offset:i-t};t=l}e:{for(;s;){if(s.nextSibling){s=s.nextSibling;break e}s=s.parentNode}s=void 0}s=Pl(s)}}function yt(t,i){return t&&i?t===i?!0:t&&t.nodeType===3?!1:i&&i.nodeType===3?yt(t,i.parentNode):"contains"in t?t.contains(i):t.compareDocumentPosition?!!(t.compareDocumentPosition(i)&16):!1:!1}function ot(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var i=F(t.document);i instanceof t.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)t=i.contentWindow;else break;i=F(t.document)}return i}function St(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i&&(i==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||i==="textarea"||t.contentEditable==="true")}var rn=fa&&"documentMode"in document&&11>=document.documentMode,En=null,Hs=null,di=null,Ga=!1;function lg(t,i,s){var l=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;Ga||En==null||En!==F(l)||(l=En,"selectionStart"in l&&St(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),di&&Is(di,l)||(di=l,l=Ou(Hs,"onSelect"),0<l.length&&(i=new Bt("onSelect","select",null,i,s),t.push({event:i,listeners:l}),i.target=En)))}function Dr(t,i){var s={};return s[t.toLowerCase()]=i.toLowerCase(),s["Webkit"+t]="webkit"+i,s["Moz"+t]="moz"+i,s}var vo={animationend:Dr("Animation","AnimationEnd"),animationiteration:Dr("Animation","AnimationIteration"),animationstart:Dr("Animation","AnimationStart"),transitionrun:Dr("Transition","TransitionRun"),transitionstart:Dr("Transition","TransitionStart"),transitioncancel:Dr("Transition","TransitionCancel"),transitionend:Dr("Transition","TransitionEnd")},lh={},cg={};fa&&(cg=document.createElement("div").style,"AnimationEvent"in window||(delete vo.animationend.animation,delete vo.animationiteration.animation,delete vo.animationstart.animation),"TransitionEvent"in window||delete vo.transitionend.transition);function Nr(t){if(lh[t])return lh[t];if(!vo[t])return t;var i=vo[t],s;for(s in i)if(i.hasOwnProperty(s)&&s in cg)return lh[t]=i[s];return t}var ug=Nr("animationend"),fg=Nr("animationiteration"),hg=Nr("animationstart"),iS=Nr("transitionrun"),aS=Nr("transitionstart"),sS=Nr("transitioncancel"),dg=Nr("transitionend"),pg=new Map,ch="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");ch.push("scrollEnd");function Ra(t,i){pg.set(t,i),W(i,[t])}var Yc=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},da=[],_o=0,uh=0;function jc(){for(var t=_o,i=uh=_o=0;i<t;){var s=da[i];da[i++]=null;var l=da[i];da[i++]=null;var f=da[i];da[i++]=null;var h=da[i];if(da[i++]=null,l!==null&&f!==null){var S=l.pending;S===null?f.next=f:(f.next=S.next,S.next=f),l.pending=f}h!==0&&mg(s,f,h)}}function Zc(t,i,s,l){da[_o++]=t,da[_o++]=i,da[_o++]=s,da[_o++]=l,uh|=l,t.lanes|=l,t=t.alternate,t!==null&&(t.lanes|=l)}function fh(t,i,s,l){return Zc(t,i,s,l),Kc(t)}function Lr(t,i){return Zc(t,null,null,i),Kc(t)}function mg(t,i,s){t.lanes|=s;var l=t.alternate;l!==null&&(l.lanes|=s);for(var f=!1,h=t.return;h!==null;)h.childLanes|=s,l=h.alternate,l!==null&&(l.childLanes|=s),h.tag===22&&(t=h.stateNode,t===null||t._visibility&1||(f=!0)),t=h,h=h.return;return t.tag===3?(h=t.stateNode,f&&i!==null&&(f=31-$e(s),t=h.hiddenUpdates,l=t[f],l===null?t[f]=[i]:l.push(i),i.lane=s|536870912),h):null}function Kc(t){if(50<ic)throw ic=0,yd=null,Error(a(185));for(var i=t.return;i!==null;)t=i,i=t.return;return t.tag===3?t.stateNode:null}var xo={};function rS(t,i,s,l){this.tag=t,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Qi(t,i,s,l){return new rS(t,i,s,l)}function hh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ss(t,i){var s=t.alternate;return s===null?(s=Qi(t.tag,i,t.key,t.mode),s.elementType=t.elementType,s.type=t.type,s.stateNode=t.stateNode,s.alternate=t,t.alternate=s):(s.pendingProps=i,s.type=t.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=t.flags&65011712,s.childLanes=t.childLanes,s.lanes=t.lanes,s.child=t.child,s.memoizedProps=t.memoizedProps,s.memoizedState=t.memoizedState,s.updateQueue=t.updateQueue,i=t.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=t.sibling,s.index=t.index,s.ref=t.ref,s.refCleanup=t.refCleanup,s}function gg(t,i){t.flags&=65011714;var s=t.alternate;return s===null?(t.childLanes=0,t.lanes=i,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=s.childLanes,t.lanes=s.lanes,t.child=s.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=s.memoizedProps,t.memoizedState=s.memoizedState,t.updateQueue=s.updateQueue,t.type=s.type,i=s.dependencies,t.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),t}function Qc(t,i,s,l,f,h){var S=0;if(l=t,typeof t=="function")hh(t)&&(S=1);else if(typeof t=="string")S=fM(t,s,Ie.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case B:return t=Qi(31,s,i,f),t.elementType=B,t.lanes=h,t;case C:return Ur(s.children,f,h,i);case y:S=8,f|=24;break;case x:return t=Qi(12,s,i,f|2),t.elementType=x,t.lanes=h,t;case I:return t=Qi(13,s,i,f),t.elementType=I,t.lanes=h,t;case L:return t=Qi(19,s,i,f),t.elementType=L,t.lanes=h,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case N:S=10;break e;case O:S=9;break e;case R:S=11;break e;case z:S=14;break e;case T:S=16,l=null;break e}S=29,s=Error(a(130,t===null?"null":typeof t,"")),l=null}return i=Qi(S,s,i,f),i.elementType=t,i.type=l,i.lanes=h,i}function Ur(t,i,s,l){return t=Qi(7,t,l,i),t.lanes=s,t}function dh(t,i,s){return t=Qi(6,t,null,i),t.lanes=s,t}function vg(t){var i=Qi(18,null,null,0);return i.stateNode=t,i}function ph(t,i,s){return i=Qi(4,t.children!==null?t.children:[],t.key,i),i.lanes=s,i.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},i}var _g=new WeakMap;function pa(t,i){if(typeof t=="object"&&t!==null){var s=_g.get(t);return s!==void 0?s:(i={value:t,source:i,stack:Nn(i)},_g.set(t,i),i)}return{value:t,source:i,stack:Nn(i)}}var yo=[],So=0,Jc=null,Fl=0,ma=[],ga=0,Gs=null,ka=1,Va="";function rs(t,i){yo[So++]=Fl,yo[So++]=Jc,Jc=t,Fl=i}function xg(t,i,s){ma[ga++]=ka,ma[ga++]=Va,ma[ga++]=Gs,Gs=t;var l=ka;t=Va;var f=32-$e(l)-1;l&=~(1<<f),s+=1;var h=32-$e(i)+f;if(30<h){var S=f-f%5;h=(l&(1<<S)-1).toString(32),l>>=S,f-=S,ka=1<<32-$e(i)+f|s<<f|l,Va=h+t}else ka=1<<h|s<<f|l,Va=t}function mh(t){t.return!==null&&(rs(t,1),xg(t,1,0))}function gh(t){for(;t===Jc;)Jc=yo[--So],yo[So]=null,Fl=yo[--So],yo[So]=null;for(;t===Gs;)Gs=ma[--ga],ma[ga]=null,Va=ma[--ga],ma[ga]=null,ka=ma[--ga],ma[ga]=null}function yg(t,i){ma[ga++]=ka,ma[ga++]=Va,ma[ga++]=Gs,ka=i.id,Va=i.overflow,Gs=t}var pi=null,On=null,Qt=!1,ks=null,va=!1,vh=Error(a(519));function Vs(t){var i=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Bl(pa(i,t)),vh}function Sg(t){var i=t.stateNode,s=t.type,l=t.memoizedProps;switch(i[Vn]=t,i[ni]=l,s){case"dialog":Wt("cancel",i),Wt("close",i);break;case"iframe":case"object":case"embed":Wt("load",i);break;case"video":case"audio":for(s=0;s<sc.length;s++)Wt(sc[s],i);break;case"source":Wt("error",i);break;case"img":case"image":case"link":Wt("error",i),Wt("load",i);break;case"details":Wt("toggle",i);break;case"input":Wt("invalid",i),dt(i,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":Wt("invalid",i);break;case"textarea":Wt("invalid",i),Gt(i,l.value,l.defaultValue,l.children)}s=l.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||l.suppressHydrationWarning===!0||zv(i.textContent,s)?(l.popover!=null&&(Wt("beforetoggle",i),Wt("toggle",i)),l.onScroll!=null&&Wt("scroll",i),l.onScrollEnd!=null&&Wt("scrollend",i),l.onClick!=null&&(i.onclick=Kn),i=!0):i=!1,i||Vs(t,!0)}function Mg(t){for(pi=t.return;pi;)switch(pi.tag){case 5:case 31:case 13:va=!1;return;case 27:case 3:va=!0;return;default:pi=pi.return}}function Mo(t){if(t!==pi)return!1;if(!Qt)return Mg(t),Qt=!0,!1;var i=t.tag,s;if((s=i!==3&&i!==27)&&((s=i===5)&&(s=t.type,s=!(s!=="form"&&s!=="button")||Pd(t.type,t.memoizedProps)),s=!s),s&&On&&Vs(t),Mg(t),i===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(a(317));On=Yv(t)}else if(i===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(a(317));On=Yv(t)}else i===27?(i=On,ir(t.type)?(t=Hd,Hd=null,On=t):On=i):On=pi?xa(t.stateNode.nextSibling):null;return!0}function Or(){On=pi=null,Qt=!1}function _h(){var t=ks;return t!==null&&(ki===null?ki=t:ki.push.apply(ki,t),ks=null),t}function Bl(t){ks===null?ks=[t]:ks.push(t)}var xh=P(null),Pr=null,os=null;function Xs(t,i,s){Ce(xh,i._currentValue),i._currentValue=s}function ls(t){t._currentValue=xh.current,Q(xh)}function yh(t,i,s){for(;t!==null;){var l=t.alternate;if((t.childLanes&i)!==i?(t.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),t===s)break;t=t.return}}function Sh(t,i,s,l){var f=t.child;for(f!==null&&(f.return=t);f!==null;){var h=f.dependencies;if(h!==null){var S=f.child;h=h.firstContext;e:for(;h!==null;){var w=h;h=f;for(var V=0;V<i.length;V++)if(w.context===i[V]){h.lanes|=s,w=h.alternate,w!==null&&(w.lanes|=s),yh(h.return,s,t),l||(S=null);break e}h=w.next}}else if(f.tag===18){if(S=f.return,S===null)throw Error(a(341));S.lanes|=s,h=S.alternate,h!==null&&(h.lanes|=s),yh(S,s,t),S=null}else S=f.child;if(S!==null)S.return=f;else for(S=f;S!==null;){if(S===t){S=null;break}if(f=S.sibling,f!==null){f.return=S.return,S=f;break}S=S.return}f=S}}function bo(t,i,s,l){t=null;for(var f=i,h=!1;f!==null;){if(!h){if((f.flags&524288)!==0)h=!0;else if((f.flags&262144)!==0)break}if(f.tag===10){var S=f.alternate;if(S===null)throw Error(a(387));if(S=S.memoizedProps,S!==null){var w=f.type;Ti(f.pendingProps.value,S.value)||(t!==null?t.push(w):t=[w])}}else if(f===Se.current){if(S=f.alternate,S===null)throw Error(a(387));S.memoizedState.memoizedState!==f.memoizedState.memoizedState&&(t!==null?t.push(uc):t=[uc])}f=f.return}t!==null&&Sh(i,t,s,l),i.flags|=262144}function $c(t){for(t=t.firstContext;t!==null;){if(!Ti(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Fr(t){Pr=t,os=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function mi(t){return bg(Pr,t)}function eu(t,i){return Pr===null&&Fr(t),bg(t,i)}function bg(t,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},os===null){if(t===null)throw Error(a(308));os=i,t.dependencies={lanes:0,firstContext:i},t.flags|=524288}else os=os.next=i;return s}var oS=typeof AbortController<"u"?AbortController:function(){var t=[],i=this.signal={aborted:!1,addEventListener:function(s,l){t.push(l)}};this.abort=function(){i.aborted=!0,t.forEach(function(s){return s()})}},lS=r.unstable_scheduleCallback,cS=r.unstable_NormalPriority,Qn={$$typeof:N,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Mh(){return{controller:new oS,data:new Map,refCount:0}}function zl(t){t.refCount--,t.refCount===0&&lS(cS,function(){t.controller.abort()})}var Il=null,bh=0,Eo=0,To=null;function uS(t,i){if(Il===null){var s=Il=[];bh=0,Eo=Ad(),To={status:"pending",value:void 0,then:function(l){s.push(l)}}}return bh++,i.then(Eg,Eg),i}function Eg(){if(--bh===0&&Il!==null){To!==null&&(To.status="fulfilled");var t=Il;Il=null,Eo=0,To=null;for(var i=0;i<t.length;i++)(0,t[i])()}}function fS(t,i){var s=[],l={status:"pending",value:null,reason:null,then:function(f){s.push(f)}};return t.then(function(){l.status="fulfilled",l.value=i;for(var f=0;f<s.length;f++)(0,s[f])(i)},function(f){for(l.status="rejected",l.reason=f,f=0;f<s.length;f++)(0,s[f])(void 0)}),l}var Tg=H.S;H.S=function(t,i){lv=nn(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&uS(t,i),Tg!==null&&Tg(t,i)};var Br=P(null);function Eh(){var t=Br.current;return t!==null?t:Tn.pooledCache}function tu(t,i){i===null?Ce(Br,Br.current):Ce(Br,i.pool)}function Ag(){var t=Eh();return t===null?null:{parent:Qn._currentValue,pool:t}}var Ao=Error(a(460)),Th=Error(a(474)),nu=Error(a(542)),iu={then:function(){}};function wg(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Rg(t,i,s){switch(s=t[s],s===void 0?t.push(i):s!==i&&(i.then(Kn,Kn),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw t=i.reason,Dg(t),t;default:if(typeof i.status=="string")i.then(Kn,Kn);else{if(t=Tn,t!==null&&100<t.shellSuspendCounter)throw Error(a(482));t=i,t.status="pending",t.then(function(l){if(i.status==="pending"){var f=i;f.status="fulfilled",f.value=l}},function(l){if(i.status==="pending"){var f=i;f.status="rejected",f.reason=l}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw t=i.reason,Dg(t),t}throw Ir=i,Ao}}function zr(t){try{var i=t._init;return i(t._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(Ir=s,Ao):s}}var Ir=null;function Cg(){if(Ir===null)throw Error(a(459));var t=Ir;return Ir=null,t}function Dg(t){if(t===Ao||t===nu)throw Error(a(483))}var wo=null,Hl=0;function au(t){var i=Hl;return Hl+=1,wo===null&&(wo=[]),Rg(wo,t,i)}function Gl(t,i){i=i.props.ref,t.ref=i!==void 0?i:null}function su(t,i){throw i.$$typeof===g?Error(a(525)):(t=Object.prototype.toString.call(i),Error(a(31,t==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":t)))}function Ng(t){function i(J,X){if(t){var ue=J.deletions;ue===null?(J.deletions=[X],J.flags|=16):ue.push(X)}}function s(J,X){if(!t)return null;for(;X!==null;)i(J,X),X=X.sibling;return null}function l(J){for(var X=new Map;J!==null;)J.key!==null?X.set(J.key,J):X.set(J.index,J),J=J.sibling;return X}function f(J,X){return J=ss(J,X),J.index=0,J.sibling=null,J}function h(J,X,ue){return J.index=ue,t?(ue=J.alternate,ue!==null?(ue=ue.index,ue<X?(J.flags|=67108866,X):ue):(J.flags|=67108866,X)):(J.flags|=1048576,X)}function S(J){return t&&J.alternate===null&&(J.flags|=67108866),J}function w(J,X,ue,Ee){return X===null||X.tag!==6?(X=dh(ue,J.mode,Ee),X.return=J,X):(X=f(X,ue),X.return=J,X)}function V(J,X,ue,Ee){var gt=ue.type;return gt===C?be(J,X,ue.props.children,Ee,ue.key):X!==null&&(X.elementType===gt||typeof gt=="object"&&gt!==null&&gt.$$typeof===T&&zr(gt)===X.type)?(X=f(X,ue.props),Gl(X,ue),X.return=J,X):(X=Qc(ue.type,ue.key,ue.props,null,J.mode,Ee),Gl(X,ue),X.return=J,X)}function fe(J,X,ue,Ee){return X===null||X.tag!==4||X.stateNode.containerInfo!==ue.containerInfo||X.stateNode.implementation!==ue.implementation?(X=ph(ue,J.mode,Ee),X.return=J,X):(X=f(X,ue.children||[]),X.return=J,X)}function be(J,X,ue,Ee,gt){return X===null||X.tag!==7?(X=Ur(ue,J.mode,Ee,gt),X.return=J,X):(X=f(X,ue),X.return=J,X)}function Te(J,X,ue){if(typeof X=="string"&&X!==""||typeof X=="number"||typeof X=="bigint")return X=dh(""+X,J.mode,ue),X.return=J,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case M:return ue=Qc(X.type,X.key,X.props,null,J.mode,ue),Gl(ue,X),ue.return=J,ue;case E:return X=ph(X,J.mode,ue),X.return=J,X;case T:return X=zr(X),Te(J,X,ue)}if(ae(X)||Y(X))return X=Ur(X,J.mode,ue,null),X.return=J,X;if(typeof X.then=="function")return Te(J,au(X),ue);if(X.$$typeof===N)return Te(J,eu(J,X),ue);su(J,X)}return null}function pe(J,X,ue,Ee){var gt=X!==null?X.key:null;if(typeof ue=="string"&&ue!==""||typeof ue=="number"||typeof ue=="bigint")return gt!==null?null:w(J,X,""+ue,Ee);if(typeof ue=="object"&&ue!==null){switch(ue.$$typeof){case M:return ue.key===gt?V(J,X,ue,Ee):null;case E:return ue.key===gt?fe(J,X,ue,Ee):null;case T:return ue=zr(ue),pe(J,X,ue,Ee)}if(ae(ue)||Y(ue))return gt!==null?null:be(J,X,ue,Ee,null);if(typeof ue.then=="function")return pe(J,X,au(ue),Ee);if(ue.$$typeof===N)return pe(J,X,eu(J,ue),Ee);su(J,ue)}return null}function ge(J,X,ue,Ee,gt){if(typeof Ee=="string"&&Ee!==""||typeof Ee=="number"||typeof Ee=="bigint")return J=J.get(ue)||null,w(X,J,""+Ee,gt);if(typeof Ee=="object"&&Ee!==null){switch(Ee.$$typeof){case M:return J=J.get(Ee.key===null?ue:Ee.key)||null,V(X,J,Ee,gt);case E:return J=J.get(Ee.key===null?ue:Ee.key)||null,fe(X,J,Ee,gt);case T:return Ee=zr(Ee),ge(J,X,ue,Ee,gt)}if(ae(Ee)||Y(Ee))return J=J.get(ue)||null,be(X,J,Ee,gt,null);if(typeof Ee.then=="function")return ge(J,X,ue,au(Ee),gt);if(Ee.$$typeof===N)return ge(J,X,ue,eu(X,Ee),gt);su(X,Ee)}return null}function lt(J,X,ue,Ee){for(var gt=null,ln=null,ct=X,Pt=X=0,Zt=null;ct!==null&&Pt<ue.length;Pt++){ct.index>Pt?(Zt=ct,ct=null):Zt=ct.sibling;var cn=pe(J,ct,ue[Pt],Ee);if(cn===null){ct===null&&(ct=Zt);break}t&&ct&&cn.alternate===null&&i(J,ct),X=h(cn,X,Pt),ln===null?gt=cn:ln.sibling=cn,ln=cn,ct=Zt}if(Pt===ue.length)return s(J,ct),Qt&&rs(J,Pt),gt;if(ct===null){for(;Pt<ue.length;Pt++)ct=Te(J,ue[Pt],Ee),ct!==null&&(X=h(ct,X,Pt),ln===null?gt=ct:ln.sibling=ct,ln=ct);return Qt&&rs(J,Pt),gt}for(ct=l(ct);Pt<ue.length;Pt++)Zt=ge(ct,J,Pt,ue[Pt],Ee),Zt!==null&&(t&&Zt.alternate!==null&&ct.delete(Zt.key===null?Pt:Zt.key),X=h(Zt,X,Pt),ln===null?gt=Zt:ln.sibling=Zt,ln=Zt);return t&&ct.forEach(function(lr){return i(J,lr)}),Qt&&rs(J,Pt),gt}function xt(J,X,ue,Ee){if(ue==null)throw Error(a(151));for(var gt=null,ln=null,ct=X,Pt=X=0,Zt=null,cn=ue.next();ct!==null&&!cn.done;Pt++,cn=ue.next()){ct.index>Pt?(Zt=ct,ct=null):Zt=ct.sibling;var lr=pe(J,ct,cn.value,Ee);if(lr===null){ct===null&&(ct=Zt);break}t&&ct&&lr.alternate===null&&i(J,ct),X=h(lr,X,Pt),ln===null?gt=lr:ln.sibling=lr,ln=lr,ct=Zt}if(cn.done)return s(J,ct),Qt&&rs(J,Pt),gt;if(ct===null){for(;!cn.done;Pt++,cn=ue.next())cn=Te(J,cn.value,Ee),cn!==null&&(X=h(cn,X,Pt),ln===null?gt=cn:ln.sibling=cn,ln=cn);return Qt&&rs(J,Pt),gt}for(ct=l(ct);!cn.done;Pt++,cn=ue.next())cn=ge(ct,J,Pt,cn.value,Ee),cn!==null&&(t&&cn.alternate!==null&&ct.delete(cn.key===null?Pt:cn.key),X=h(cn,X,Pt),ln===null?gt=cn:ln.sibling=cn,ln=cn);return t&&ct.forEach(function(MM){return i(J,MM)}),Qt&&rs(J,Pt),gt}function xn(J,X,ue,Ee){if(typeof ue=="object"&&ue!==null&&ue.type===C&&ue.key===null&&(ue=ue.props.children),typeof ue=="object"&&ue!==null){switch(ue.$$typeof){case M:e:{for(var gt=ue.key;X!==null;){if(X.key===gt){if(gt=ue.type,gt===C){if(X.tag===7){s(J,X.sibling),Ee=f(X,ue.props.children),Ee.return=J,J=Ee;break e}}else if(X.elementType===gt||typeof gt=="object"&&gt!==null&&gt.$$typeof===T&&zr(gt)===X.type){s(J,X.sibling),Ee=f(X,ue.props),Gl(Ee,ue),Ee.return=J,J=Ee;break e}s(J,X);break}else i(J,X);X=X.sibling}ue.type===C?(Ee=Ur(ue.props.children,J.mode,Ee,ue.key),Ee.return=J,J=Ee):(Ee=Qc(ue.type,ue.key,ue.props,null,J.mode,Ee),Gl(Ee,ue),Ee.return=J,J=Ee)}return S(J);case E:e:{for(gt=ue.key;X!==null;){if(X.key===gt)if(X.tag===4&&X.stateNode.containerInfo===ue.containerInfo&&X.stateNode.implementation===ue.implementation){s(J,X.sibling),Ee=f(X,ue.children||[]),Ee.return=J,J=Ee;break e}else{s(J,X);break}else i(J,X);X=X.sibling}Ee=ph(ue,J.mode,Ee),Ee.return=J,J=Ee}return S(J);case T:return ue=zr(ue),xn(J,X,ue,Ee)}if(ae(ue))return lt(J,X,ue,Ee);if(Y(ue)){if(gt=Y(ue),typeof gt!="function")throw Error(a(150));return ue=gt.call(ue),xt(J,X,ue,Ee)}if(typeof ue.then=="function")return xn(J,X,au(ue),Ee);if(ue.$$typeof===N)return xn(J,X,eu(J,ue),Ee);su(J,ue)}return typeof ue=="string"&&ue!==""||typeof ue=="number"||typeof ue=="bigint"?(ue=""+ue,X!==null&&X.tag===6?(s(J,X.sibling),Ee=f(X,ue),Ee.return=J,J=Ee):(s(J,X),Ee=dh(ue,J.mode,Ee),Ee.return=J,J=Ee),S(J)):s(J,X)}return function(J,X,ue,Ee){try{Hl=0;var gt=xn(J,X,ue,Ee);return wo=null,gt}catch(ct){if(ct===Ao||ct===nu)throw ct;var ln=Qi(29,ct,null,J.mode);return ln.lanes=Ee,ln.return=J,ln}finally{}}}var Hr=Ng(!0),Lg=Ng(!1),qs=!1;function Ah(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function wh(t,i){t=t.updateQueue,i.updateQueue===t&&(i.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Ws(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Ys(t,i,s){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(hn&2)!==0){var f=l.pending;return f===null?i.next=i:(i.next=f.next,f.next=i),l.pending=i,i=Kc(t),mg(t,null,s),i}return Zc(t,l,i,s),Kc(t)}function kl(t,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194048)!==0)){var l=i.lanes;l&=t.pendingLanes,s|=l,i.lanes=s,xi(t,s)}}function Rh(t,i){var s=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,s===l)){var f=null,h=null;if(s=s.firstBaseUpdate,s!==null){do{var S={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};h===null?f=h=S:h=h.next=S,s=s.next}while(s!==null);h===null?f=h=i:h=h.next=i}else f=h=i;s={baseState:l.baseState,firstBaseUpdate:f,lastBaseUpdate:h,shared:l.shared,callbacks:l.callbacks},t.updateQueue=s;return}t=s.lastBaseUpdate,t===null?s.firstBaseUpdate=i:t.next=i,s.lastBaseUpdate=i}var Ch=!1;function Vl(){if(Ch){var t=To;if(t!==null)throw t}}function Xl(t,i,s,l){Ch=!1;var f=t.updateQueue;qs=!1;var h=f.firstBaseUpdate,S=f.lastBaseUpdate,w=f.shared.pending;if(w!==null){f.shared.pending=null;var V=w,fe=V.next;V.next=null,S===null?h=fe:S.next=fe,S=V;var be=t.alternate;be!==null&&(be=be.updateQueue,w=be.lastBaseUpdate,w!==S&&(w===null?be.firstBaseUpdate=fe:w.next=fe,be.lastBaseUpdate=V))}if(h!==null){var Te=f.baseState;S=0,be=fe=V=null,w=h;do{var pe=w.lane&-536870913,ge=pe!==w.lane;if(ge?(jt&pe)===pe:(l&pe)===pe){pe!==0&&pe===Eo&&(Ch=!0),be!==null&&(be=be.next={lane:0,tag:w.tag,payload:w.payload,callback:null,next:null});e:{var lt=t,xt=w;pe=i;var xn=s;switch(xt.tag){case 1:if(lt=xt.payload,typeof lt=="function"){Te=lt.call(xn,Te,pe);break e}Te=lt;break e;case 3:lt.flags=lt.flags&-65537|128;case 0:if(lt=xt.payload,pe=typeof lt=="function"?lt.call(xn,Te,pe):lt,pe==null)break e;Te=_({},Te,pe);break e;case 2:qs=!0}}pe=w.callback,pe!==null&&(t.flags|=64,ge&&(t.flags|=8192),ge=f.callbacks,ge===null?f.callbacks=[pe]:ge.push(pe))}else ge={lane:pe,tag:w.tag,payload:w.payload,callback:w.callback,next:null},be===null?(fe=be=ge,V=Te):be=be.next=ge,S|=pe;if(w=w.next,w===null){if(w=f.shared.pending,w===null)break;ge=w,w=ge.next,ge.next=null,f.lastBaseUpdate=ge,f.shared.pending=null}}while(!0);be===null&&(V=Te),f.baseState=V,f.firstBaseUpdate=fe,f.lastBaseUpdate=be,h===null&&(f.shared.lanes=0),Js|=S,t.lanes=S,t.memoizedState=Te}}function Ug(t,i){if(typeof t!="function")throw Error(a(191,t));t.call(i)}function Og(t,i){var s=t.callbacks;if(s!==null)for(t.callbacks=null,t=0;t<s.length;t++)Ug(s[t],i)}var Ro=P(null),ru=P(0);function Pg(t,i){t=vs,Ce(ru,t),Ce(Ro,i),vs=t|i.baseLanes}function Dh(){Ce(ru,vs),Ce(Ro,Ro.current)}function Nh(){vs=ru.current,Q(Ro),Q(ru)}var Ji=P(null),_a=null;function js(t){var i=t.alternate;Ce(jn,jn.current&1),Ce(Ji,t),_a===null&&(i===null||Ro.current!==null||i.memoizedState!==null)&&(_a=t)}function Lh(t){Ce(jn,jn.current),Ce(Ji,t),_a===null&&(_a=t)}function Fg(t){t.tag===22?(Ce(jn,jn.current),Ce(Ji,t),_a===null&&(_a=t)):Zs()}function Zs(){Ce(jn,jn.current),Ce(Ji,Ji.current)}function $i(t){Q(Ji),_a===t&&(_a=null),Q(jn)}var jn=P(0);function ou(t){for(var i=t;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||zd(s)||Id(s)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var cs=0,Ut=null,vn=null,Jn=null,lu=!1,Co=!1,Gr=!1,cu=0,ql=0,Do=null,hS=0;function qn(){throw Error(a(321))}function Uh(t,i){if(i===null)return!1;for(var s=0;s<i.length&&s<t.length;s++)if(!Ti(t[s],i[s]))return!1;return!0}function Oh(t,i,s,l,f,h){return cs=h,Ut=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,H.H=t===null||t.memoizedState===null?x0:Zh,Gr=!1,h=s(l,f),Gr=!1,Co&&(h=zg(i,s,l,f)),Bg(t),h}function Bg(t){H.H=jl;var i=vn!==null&&vn.next!==null;if(cs=0,Jn=vn=Ut=null,lu=!1,ql=0,Do=null,i)throw Error(a(300));t===null||$n||(t=t.dependencies,t!==null&&$c(t)&&($n=!0))}function zg(t,i,s,l){Ut=t;var f=0;do{if(Co&&(Do=null),ql=0,Co=!1,25<=f)throw Error(a(301));if(f+=1,Jn=vn=null,t.updateQueue!=null){var h=t.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}H.H=y0,h=i(s,l)}while(Co);return h}function dS(){var t=H.H,i=t.useState()[0];return i=typeof i.then=="function"?Wl(i):i,t=t.useState()[0],(vn!==null?vn.memoizedState:null)!==t&&(Ut.flags|=1024),i}function Ph(){var t=cu!==0;return cu=0,t}function Fh(t,i,s){i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~s}function Bh(t){if(lu){for(t=t.memoizedState;t!==null;){var i=t.queue;i!==null&&(i.pending=null),t=t.next}lu=!1}cs=0,Jn=vn=Ut=null,Co=!1,ql=cu=0,Do=null}function Ui(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Jn===null?Ut.memoizedState=Jn=t:Jn=Jn.next=t,Jn}function Zn(){if(vn===null){var t=Ut.alternate;t=t!==null?t.memoizedState:null}else t=vn.next;var i=Jn===null?Ut.memoizedState:Jn.next;if(i!==null)Jn=i,vn=t;else{if(t===null)throw Ut.alternate===null?Error(a(467)):Error(a(310));vn=t,t={memoizedState:vn.memoizedState,baseState:vn.baseState,baseQueue:vn.baseQueue,queue:vn.queue,next:null},Jn===null?Ut.memoizedState=Jn=t:Jn=Jn.next=t}return Jn}function uu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Wl(t){var i=ql;return ql+=1,Do===null&&(Do=[]),t=Rg(Do,t,i),i=Ut,(Jn===null?i.memoizedState:Jn.next)===null&&(i=i.alternate,H.H=i===null||i.memoizedState===null?x0:Zh),t}function fu(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Wl(t);if(t.$$typeof===N)return mi(t)}throw Error(a(438,String(t)))}function zh(t){var i=null,s=Ut.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var l=Ut.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(i={data:l.data.map(function(f){return f.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=uu(),Ut.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(t),l=0;l<t;l++)s[l]=Z;return i.index++,s}function us(t,i){return typeof i=="function"?i(t):i}function hu(t){var i=Zn();return Ih(i,vn,t)}function Ih(t,i,s){var l=t.queue;if(l===null)throw Error(a(311));l.lastRenderedReducer=s;var f=t.baseQueue,h=l.pending;if(h!==null){if(f!==null){var S=f.next;f.next=h.next,h.next=S}i.baseQueue=f=h,l.pending=null}if(h=t.baseState,f===null)t.memoizedState=h;else{i=f.next;var w=S=null,V=null,fe=i,be=!1;do{var Te=fe.lane&-536870913;if(Te!==fe.lane?(jt&Te)===Te:(cs&Te)===Te){var pe=fe.revertLane;if(pe===0)V!==null&&(V=V.next={lane:0,revertLane:0,gesture:null,action:fe.action,hasEagerState:fe.hasEagerState,eagerState:fe.eagerState,next:null}),Te===Eo&&(be=!0);else if((cs&pe)===pe){fe=fe.next,pe===Eo&&(be=!0);continue}else Te={lane:0,revertLane:fe.revertLane,gesture:null,action:fe.action,hasEagerState:fe.hasEagerState,eagerState:fe.eagerState,next:null},V===null?(w=V=Te,S=h):V=V.next=Te,Ut.lanes|=pe,Js|=pe;Te=fe.action,Gr&&s(h,Te),h=fe.hasEagerState?fe.eagerState:s(h,Te)}else pe={lane:Te,revertLane:fe.revertLane,gesture:fe.gesture,action:fe.action,hasEagerState:fe.hasEagerState,eagerState:fe.eagerState,next:null},V===null?(w=V=pe,S=h):V=V.next=pe,Ut.lanes|=Te,Js|=Te;fe=fe.next}while(fe!==null&&fe!==i);if(V===null?S=h:V.next=w,!Ti(h,t.memoizedState)&&($n=!0,be&&(s=To,s!==null)))throw s;t.memoizedState=h,t.baseState=S,t.baseQueue=V,l.lastRenderedState=h}return f===null&&(l.lanes=0),[t.memoizedState,l.dispatch]}function Hh(t){var i=Zn(),s=i.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=t;var l=s.dispatch,f=s.pending,h=i.memoizedState;if(f!==null){s.pending=null;var S=f=f.next;do h=t(h,S.action),S=S.next;while(S!==f);Ti(h,i.memoizedState)||($n=!0),i.memoizedState=h,i.baseQueue===null&&(i.baseState=h),s.lastRenderedState=h}return[h,l]}function Ig(t,i,s){var l=Ut,f=Zn(),h=Qt;if(h){if(s===void 0)throw Error(a(407));s=s()}else s=i();var S=!Ti((vn||f).memoizedState,s);if(S&&(f.memoizedState=s,$n=!0),f=f.queue,Vh(kg.bind(null,l,f,t),[t]),f.getSnapshot!==i||S||Jn!==null&&Jn.memoizedState.tag&1){if(l.flags|=2048,No(9,{destroy:void 0},Gg.bind(null,l,f,s,i),null),Tn===null)throw Error(a(349));h||(cs&127)!==0||Hg(l,i,s)}return s}function Hg(t,i,s){t.flags|=16384,t={getSnapshot:i,value:s},i=Ut.updateQueue,i===null?(i=uu(),Ut.updateQueue=i,i.stores=[t]):(s=i.stores,s===null?i.stores=[t]:s.push(t))}function Gg(t,i,s,l){i.value=s,i.getSnapshot=l,Vg(i)&&Xg(t)}function kg(t,i,s){return s(function(){Vg(i)&&Xg(t)})}function Vg(t){var i=t.getSnapshot;t=t.value;try{var s=i();return!Ti(t,s)}catch{return!0}}function Xg(t){var i=Lr(t,2);i!==null&&Vi(i,t,2)}function Gh(t){var i=Ui();if(typeof t=="function"){var s=t;if(t=s(),Gr){He(!0);try{s()}finally{He(!1)}}}return i.memoizedState=i.baseState=t,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:us,lastRenderedState:t},i}function qg(t,i,s,l){return t.baseState=s,Ih(t,vn,typeof l=="function"?l:us)}function pS(t,i,s,l,f){if(mu(t))throw Error(a(485));if(t=i.action,t!==null){var h={payload:f,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(S){h.listeners.push(S)}};H.T!==null?s(!0):h.isTransition=!1,l(h),s=i.pending,s===null?(h.next=i.pending=h,Wg(i,h)):(h.next=s.next,i.pending=s.next=h)}}function Wg(t,i){var s=i.action,l=i.payload,f=t.state;if(i.isTransition){var h=H.T,S={};H.T=S;try{var w=s(f,l),V=H.S;V!==null&&V(S,w),Yg(t,i,w)}catch(fe){kh(t,i,fe)}finally{h!==null&&S.types!==null&&(h.types=S.types),H.T=h}}else try{h=s(f,l),Yg(t,i,h)}catch(fe){kh(t,i,fe)}}function Yg(t,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(l){jg(t,i,l)},function(l){return kh(t,i,l)}):jg(t,i,s)}function jg(t,i,s){i.status="fulfilled",i.value=s,Zg(i),t.state=s,i=t.pending,i!==null&&(s=i.next,s===i?t.pending=null:(s=s.next,i.next=s,Wg(t,s)))}function kh(t,i,s){var l=t.pending;if(t.pending=null,l!==null){l=l.next;do i.status="rejected",i.reason=s,Zg(i),i=i.next;while(i!==l)}t.action=null}function Zg(t){t=t.listeners;for(var i=0;i<t.length;i++)(0,t[i])()}function Kg(t,i){return i}function Qg(t,i){if(Qt){var s=Tn.formState;if(s!==null){e:{var l=Ut;if(Qt){if(On){t:{for(var f=On,h=va;f.nodeType!==8;){if(!h){f=null;break t}if(f=xa(f.nextSibling),f===null){f=null;break t}}h=f.data,f=h==="F!"||h==="F"?f:null}if(f){On=xa(f.nextSibling),l=f.data==="F!";break e}}Vs(l)}l=!1}l&&(i=s[0])}}return s=Ui(),s.memoizedState=s.baseState=i,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Kg,lastRenderedState:i},s.queue=l,s=g0.bind(null,Ut,l),l.dispatch=s,l=Gh(!1),h=jh.bind(null,Ut,!1,l.queue),l=Ui(),f={state:i,dispatch:null,action:t,pending:null},l.queue=f,s=pS.bind(null,Ut,f,h,s),f.dispatch=s,l.memoizedState=t,[i,s,!1]}function Jg(t){var i=Zn();return $g(i,vn,t)}function $g(t,i,s){if(i=Ih(t,i,Kg)[0],t=hu(us)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var l=Wl(i)}catch(S){throw S===Ao?nu:S}else l=i;i=Zn();var f=i.queue,h=f.dispatch;return s!==i.memoizedState&&(Ut.flags|=2048,No(9,{destroy:void 0},mS.bind(null,f,s),null)),[l,h,t]}function mS(t,i){t.action=i}function e0(t){var i=Zn(),s=vn;if(s!==null)return $g(i,s,t);Zn(),i=i.memoizedState,s=Zn();var l=s.queue.dispatch;return s.memoizedState=t,[i,l,!1]}function No(t,i,s,l){return t={tag:t,create:s,deps:l,inst:i,next:null},i=Ut.updateQueue,i===null&&(i=uu(),Ut.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=t.next=t:(l=s.next,s.next=t,t.next=l,i.lastEffect=t),t}function t0(){return Zn().memoizedState}function du(t,i,s,l){var f=Ui();Ut.flags|=t,f.memoizedState=No(1|i,{destroy:void 0},s,l===void 0?null:l)}function pu(t,i,s,l){var f=Zn();l=l===void 0?null:l;var h=f.memoizedState.inst;vn!==null&&l!==null&&Uh(l,vn.memoizedState.deps)?f.memoizedState=No(i,h,s,l):(Ut.flags|=t,f.memoizedState=No(1|i,h,s,l))}function n0(t,i){du(8390656,8,t,i)}function Vh(t,i){pu(2048,8,t,i)}function gS(t){Ut.flags|=4;var i=Ut.updateQueue;if(i===null)i=uu(),Ut.updateQueue=i,i.events=[t];else{var s=i.events;s===null?i.events=[t]:s.push(t)}}function i0(t){var i=Zn().memoizedState;return gS({ref:i,nextImpl:t}),function(){if((hn&2)!==0)throw Error(a(440));return i.impl.apply(void 0,arguments)}}function a0(t,i){return pu(4,2,t,i)}function s0(t,i){return pu(4,4,t,i)}function r0(t,i){if(typeof i=="function"){t=t();var s=i(t);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return t=t(),i.current=t,function(){i.current=null}}function o0(t,i,s){s=s!=null?s.concat([t]):null,pu(4,4,r0.bind(null,i,t),s)}function Xh(){}function l0(t,i){var s=Zn();i=i===void 0?null:i;var l=s.memoizedState;return i!==null&&Uh(i,l[1])?l[0]:(s.memoizedState=[t,i],t)}function c0(t,i){var s=Zn();i=i===void 0?null:i;var l=s.memoizedState;if(i!==null&&Uh(i,l[1]))return l[0];if(l=t(),Gr){He(!0);try{t()}finally{He(!1)}}return s.memoizedState=[l,i],l}function qh(t,i,s){return s===void 0||(cs&1073741824)!==0&&(jt&261930)===0?t.memoizedState=i:(t.memoizedState=s,t=uv(),Ut.lanes|=t,Js|=t,s)}function u0(t,i,s,l){return Ti(s,i)?s:Ro.current!==null?(t=qh(t,s,l),Ti(t,i)||($n=!0),t):(cs&42)===0||(cs&1073741824)!==0&&(jt&261930)===0?($n=!0,t.memoizedState=s):(t=uv(),Ut.lanes|=t,Js|=t,i)}function f0(t,i,s,l,f){var h=k.p;k.p=h!==0&&8>h?h:8;var S=H.T,w={};H.T=w,jh(t,!1,i,s);try{var V=f(),fe=H.S;if(fe!==null&&fe(w,V),V!==null&&typeof V=="object"&&typeof V.then=="function"){var be=fS(V,l);Yl(t,i,be,na(t))}else Yl(t,i,l,na(t))}catch(Te){Yl(t,i,{then:function(){},status:"rejected",reason:Te},na())}finally{k.p=h,S!==null&&w.types!==null&&(S.types=w.types),H.T=S}}function vS(){}function Wh(t,i,s,l){if(t.tag!==5)throw Error(a(476));var f=h0(t).queue;f0(t,f,i,te,s===null?vS:function(){return d0(t),s(l)})}function h0(t){var i=t.memoizedState;if(i!==null)return i;i={memoizedState:te,baseState:te,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:us,lastRenderedState:te},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:us,lastRenderedState:s},next:null},t.memoizedState=i,t=t.alternate,t!==null&&(t.memoizedState=i),i}function d0(t){var i=h0(t);i.next===null&&(i=t.alternate.memoizedState),Yl(t,i.next.queue,{},na())}function Yh(){return mi(uc)}function p0(){return Zn().memoizedState}function m0(){return Zn().memoizedState}function _S(t){for(var i=t.return;i!==null;){switch(i.tag){case 24:case 3:var s=na();t=Ws(s);var l=Ys(i,t,s);l!==null&&(Vi(l,i,s),kl(l,i,s)),i={cache:Mh()},t.payload=i;return}i=i.return}}function xS(t,i,s){var l=na();s={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},mu(t)?v0(i,s):(s=fh(t,i,s,l),s!==null&&(Vi(s,t,l),_0(s,i,l)))}function g0(t,i,s){var l=na();Yl(t,i,s,l)}function Yl(t,i,s,l){var f={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(mu(t))v0(i,f);else{var h=t.alternate;if(t.lanes===0&&(h===null||h.lanes===0)&&(h=i.lastRenderedReducer,h!==null))try{var S=i.lastRenderedState,w=h(S,s);if(f.hasEagerState=!0,f.eagerState=w,Ti(w,S))return Zc(t,i,f,0),Tn===null&&jc(),!1}catch{}finally{}if(s=fh(t,i,f,l),s!==null)return Vi(s,t,l),_0(s,i,l),!0}return!1}function jh(t,i,s,l){if(l={lane:2,revertLane:Ad(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},mu(t)){if(i)throw Error(a(479))}else i=fh(t,s,l,2),i!==null&&Vi(i,t,2)}function mu(t){var i=t.alternate;return t===Ut||i!==null&&i===Ut}function v0(t,i){Co=lu=!0;var s=t.pending;s===null?i.next=i:(i.next=s.next,s.next=i),t.pending=i}function _0(t,i,s){if((s&4194048)!==0){var l=i.lanes;l&=t.pendingLanes,s|=l,i.lanes=s,xi(t,s)}}var jl={readContext:mi,use:fu,useCallback:qn,useContext:qn,useEffect:qn,useImperativeHandle:qn,useLayoutEffect:qn,useInsertionEffect:qn,useMemo:qn,useReducer:qn,useRef:qn,useState:qn,useDebugValue:qn,useDeferredValue:qn,useTransition:qn,useSyncExternalStore:qn,useId:qn,useHostTransitionStatus:qn,useFormState:qn,useActionState:qn,useOptimistic:qn,useMemoCache:qn,useCacheRefresh:qn};jl.useEffectEvent=qn;var x0={readContext:mi,use:fu,useCallback:function(t,i){return Ui().memoizedState=[t,i===void 0?null:i],t},useContext:mi,useEffect:n0,useImperativeHandle:function(t,i,s){s=s!=null?s.concat([t]):null,du(4194308,4,r0.bind(null,i,t),s)},useLayoutEffect:function(t,i){return du(4194308,4,t,i)},useInsertionEffect:function(t,i){du(4,2,t,i)},useMemo:function(t,i){var s=Ui();i=i===void 0?null:i;var l=t();if(Gr){He(!0);try{t()}finally{He(!1)}}return s.memoizedState=[l,i],l},useReducer:function(t,i,s){var l=Ui();if(s!==void 0){var f=s(i);if(Gr){He(!0);try{s(i)}finally{He(!1)}}}else f=i;return l.memoizedState=l.baseState=f,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:f},l.queue=t,t=t.dispatch=xS.bind(null,Ut,t),[l.memoizedState,t]},useRef:function(t){var i=Ui();return t={current:t},i.memoizedState=t},useState:function(t){t=Gh(t);var i=t.queue,s=g0.bind(null,Ut,i);return i.dispatch=s,[t.memoizedState,s]},useDebugValue:Xh,useDeferredValue:function(t,i){var s=Ui();return qh(s,t,i)},useTransition:function(){var t=Gh(!1);return t=f0.bind(null,Ut,t.queue,!0,!1),Ui().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,i,s){var l=Ut,f=Ui();if(Qt){if(s===void 0)throw Error(a(407));s=s()}else{if(s=i(),Tn===null)throw Error(a(349));(jt&127)!==0||Hg(l,i,s)}f.memoizedState=s;var h={value:s,getSnapshot:i};return f.queue=h,n0(kg.bind(null,l,h,t),[t]),l.flags|=2048,No(9,{destroy:void 0},Gg.bind(null,l,h,s,i),null),s},useId:function(){var t=Ui(),i=Tn.identifierPrefix;if(Qt){var s=Va,l=ka;s=(l&~(1<<32-$e(l)-1)).toString(32)+s,i="_"+i+"R_"+s,s=cu++,0<s&&(i+="H"+s.toString(32)),i+="_"}else s=hS++,i="_"+i+"r_"+s.toString(32)+"_";return t.memoizedState=i},useHostTransitionStatus:Yh,useFormState:Qg,useActionState:Qg,useOptimistic:function(t){var i=Ui();i.memoizedState=i.baseState=t;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=jh.bind(null,Ut,!0,s),s.dispatch=i,[t,i]},useMemoCache:zh,useCacheRefresh:function(){return Ui().memoizedState=_S.bind(null,Ut)},useEffectEvent:function(t){var i=Ui(),s={impl:t};return i.memoizedState=s,function(){if((hn&2)!==0)throw Error(a(440));return s.impl.apply(void 0,arguments)}}},Zh={readContext:mi,use:fu,useCallback:l0,useContext:mi,useEffect:Vh,useImperativeHandle:o0,useInsertionEffect:a0,useLayoutEffect:s0,useMemo:c0,useReducer:hu,useRef:t0,useState:function(){return hu(us)},useDebugValue:Xh,useDeferredValue:function(t,i){var s=Zn();return u0(s,vn.memoizedState,t,i)},useTransition:function(){var t=hu(us)[0],i=Zn().memoizedState;return[typeof t=="boolean"?t:Wl(t),i]},useSyncExternalStore:Ig,useId:p0,useHostTransitionStatus:Yh,useFormState:Jg,useActionState:Jg,useOptimistic:function(t,i){var s=Zn();return qg(s,vn,t,i)},useMemoCache:zh,useCacheRefresh:m0};Zh.useEffectEvent=i0;var y0={readContext:mi,use:fu,useCallback:l0,useContext:mi,useEffect:Vh,useImperativeHandle:o0,useInsertionEffect:a0,useLayoutEffect:s0,useMemo:c0,useReducer:Hh,useRef:t0,useState:function(){return Hh(us)},useDebugValue:Xh,useDeferredValue:function(t,i){var s=Zn();return vn===null?qh(s,t,i):u0(s,vn.memoizedState,t,i)},useTransition:function(){var t=Hh(us)[0],i=Zn().memoizedState;return[typeof t=="boolean"?t:Wl(t),i]},useSyncExternalStore:Ig,useId:p0,useHostTransitionStatus:Yh,useFormState:e0,useActionState:e0,useOptimistic:function(t,i){var s=Zn();return vn!==null?qg(s,vn,t,i):(s.baseState=t,[t,s.queue.dispatch])},useMemoCache:zh,useCacheRefresh:m0};y0.useEffectEvent=i0;function Kh(t,i,s,l){i=t.memoizedState,s=s(l,i),s=s==null?i:_({},i,s),t.memoizedState=s,t.lanes===0&&(t.updateQueue.baseState=s)}var Qh={enqueueSetState:function(t,i,s){t=t._reactInternals;var l=na(),f=Ws(l);f.payload=i,s!=null&&(f.callback=s),i=Ys(t,f,l),i!==null&&(Vi(i,t,l),kl(i,t,l))},enqueueReplaceState:function(t,i,s){t=t._reactInternals;var l=na(),f=Ws(l);f.tag=1,f.payload=i,s!=null&&(f.callback=s),i=Ys(t,f,l),i!==null&&(Vi(i,t,l),kl(i,t,l))},enqueueForceUpdate:function(t,i){t=t._reactInternals;var s=na(),l=Ws(s);l.tag=2,i!=null&&(l.callback=i),i=Ys(t,l,s),i!==null&&(Vi(i,t,s),kl(i,t,s))}};function S0(t,i,s,l,f,h,S){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,h,S):i.prototype&&i.prototype.isPureReactComponent?!Is(s,l)||!Is(f,h):!0}function M0(t,i,s,l){t=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,l),i.state!==t&&Qh.enqueueReplaceState(i,i.state,null)}function kr(t,i){var s=i;if("ref"in i){s={};for(var l in i)l!=="ref"&&(s[l]=i[l])}if(t=t.defaultProps){s===i&&(s=_({},s));for(var f in t)s[f]===void 0&&(s[f]=t[f])}return s}function b0(t){Yc(t)}function E0(t){console.error(t)}function T0(t){Yc(t)}function gu(t,i){try{var s=t.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(l){setTimeout(function(){throw l})}}function A0(t,i,s){try{var l=t.onCaughtError;l(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(f){setTimeout(function(){throw f})}}function Jh(t,i,s){return s=Ws(s),s.tag=3,s.payload={element:null},s.callback=function(){gu(t,i)},s}function w0(t){return t=Ws(t),t.tag=3,t}function R0(t,i,s,l){var f=s.type.getDerivedStateFromError;if(typeof f=="function"){var h=l.value;t.payload=function(){return f(h)},t.callback=function(){A0(i,s,l)}}var S=s.stateNode;S!==null&&typeof S.componentDidCatch=="function"&&(t.callback=function(){A0(i,s,l),typeof f!="function"&&($s===null?$s=new Set([this]):$s.add(this));var w=l.stack;this.componentDidCatch(l.value,{componentStack:w!==null?w:""})})}function yS(t,i,s,l,f){if(s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(i=s.alternate,i!==null&&bo(i,s,f,!0),s=Ji.current,s!==null){switch(s.tag){case 31:case 13:return _a===null?Ru():s.alternate===null&&Wn===0&&(Wn=3),s.flags&=-257,s.flags|=65536,s.lanes=f,l===iu?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([l]):i.add(l),bd(t,l,f)),!1;case 22:return s.flags|=65536,l===iu?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([l])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([l]):s.add(l)),bd(t,l,f)),!1}throw Error(a(435,s.tag))}return bd(t,l,f),Ru(),!1}if(Qt)return i=Ji.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=f,l!==vh&&(t=Error(a(422),{cause:l}),Bl(pa(t,s)))):(l!==vh&&(i=Error(a(423),{cause:l}),Bl(pa(i,s))),t=t.current.alternate,t.flags|=65536,f&=-f,t.lanes|=f,l=pa(l,s),f=Jh(t.stateNode,l,f),Rh(t,f),Wn!==4&&(Wn=2)),!1;var h=Error(a(520),{cause:l});if(h=pa(h,s),nc===null?nc=[h]:nc.push(h),Wn!==4&&(Wn=2),i===null)return!0;l=pa(l,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,t=f&-f,s.lanes|=t,t=Jh(s.stateNode,l,t),Rh(s,t),!1;case 1:if(i=s.type,h=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&($s===null||!$s.has(h))))return s.flags|=65536,f&=-f,s.lanes|=f,f=w0(f),R0(f,t,s,l),Rh(s,f),!1}s=s.return}while(s!==null);return!1}var $h=Error(a(461)),$n=!1;function gi(t,i,s,l){i.child=t===null?Lg(i,null,s,l):Hr(i,t.child,s,l)}function C0(t,i,s,l,f){s=s.render;var h=i.ref;if("ref"in l){var S={};for(var w in l)w!=="ref"&&(S[w]=l[w])}else S=l;return Fr(i),l=Oh(t,i,s,S,h,f),w=Ph(),t!==null&&!$n?(Fh(t,i,f),fs(t,i,f)):(Qt&&w&&mh(i),i.flags|=1,gi(t,i,l,f),i.child)}function D0(t,i,s,l,f){if(t===null){var h=s.type;return typeof h=="function"&&!hh(h)&&h.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=h,N0(t,i,h,l,f)):(t=Qc(s.type,null,l,i,i.mode,f),t.ref=i.ref,t.return=i,i.child=t)}if(h=t.child,!od(t,f)){var S=h.memoizedProps;if(s=s.compare,s=s!==null?s:Is,s(S,l)&&t.ref===i.ref)return fs(t,i,f)}return i.flags|=1,t=ss(h,l),t.ref=i.ref,t.return=i,i.child=t}function N0(t,i,s,l,f){if(t!==null){var h=t.memoizedProps;if(Is(h,l)&&t.ref===i.ref)if($n=!1,i.pendingProps=l=h,od(t,f))(t.flags&131072)!==0&&($n=!0);else return i.lanes=t.lanes,fs(t,i,f)}return ed(t,i,s,l,f)}function L0(t,i,s,l){var f=l.children,h=t!==null?t.memoizedState:null;if(t===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((i.flags&128)!==0){if(h=h!==null?h.baseLanes|s:s,t!==null){for(l=i.child=t.child,f=0;l!==null;)f=f|l.lanes|l.childLanes,l=l.sibling;l=f&~h}else l=0,i.child=null;return U0(t,i,h,s,l)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},t!==null&&tu(i,h!==null?h.cachePool:null),h!==null?Pg(i,h):Dh(),Fg(i);else return l=i.lanes=536870912,U0(t,i,h!==null?h.baseLanes|s:s,s,l)}else h!==null?(tu(i,h.cachePool),Pg(i,h),Zs(),i.memoizedState=null):(t!==null&&tu(i,null),Dh(),Zs());return gi(t,i,f,s),i.child}function Zl(t,i){return t!==null&&t.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function U0(t,i,s,l,f){var h=Eh();return h=h===null?null:{parent:Qn._currentValue,pool:h},i.memoizedState={baseLanes:s,cachePool:h},t!==null&&tu(i,null),Dh(),Fg(i),t!==null&&bo(t,i,l,!0),i.childLanes=f,null}function vu(t,i){return i=xu({mode:i.mode,children:i.children},t.mode),i.ref=t.ref,t.child=i,i.return=t,i}function O0(t,i,s){return Hr(i,t.child,null,s),t=vu(i,i.pendingProps),t.flags|=2,$i(i),i.memoizedState=null,t}function SS(t,i,s){var l=i.pendingProps,f=(i.flags&128)!==0;if(i.flags&=-129,t===null){if(Qt){if(l.mode==="hidden")return t=vu(i,l),i.lanes=536870912,Zl(null,t);if(Lh(i),(t=On)?(t=Wv(t,va),t=t!==null&&t.data==="&"?t:null,t!==null&&(i.memoizedState={dehydrated:t,treeContext:Gs!==null?{id:ka,overflow:Va}:null,retryLane:536870912,hydrationErrors:null},s=vg(t),s.return=i,i.child=s,pi=i,On=null)):t=null,t===null)throw Vs(i);return i.lanes=536870912,null}return vu(i,l)}var h=t.memoizedState;if(h!==null){var S=h.dehydrated;if(Lh(i),f)if(i.flags&256)i.flags&=-257,i=O0(t,i,s);else if(i.memoizedState!==null)i.child=t.child,i.flags|=128,i=null;else throw Error(a(558));else if($n||bo(t,i,s,!1),f=(s&t.childLanes)!==0,$n||f){if(l=Tn,l!==null&&(S=yi(l,s),S!==0&&S!==h.retryLane))throw h.retryLane=S,Lr(t,S),Vi(l,t,S),$h;Ru(),i=O0(t,i,s)}else t=h.treeContext,On=xa(S.nextSibling),pi=i,Qt=!0,ks=null,va=!1,t!==null&&yg(i,t),i=vu(i,l),i.flags|=4096;return i}return t=ss(t.child,{mode:l.mode,children:l.children}),t.ref=i.ref,i.child=t,t.return=i,t}function _u(t,i){var s=i.ref;if(s===null)t!==null&&t.ref!==null&&(i.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(t===null||t.ref!==s)&&(i.flags|=4194816)}}function ed(t,i,s,l,f){return Fr(i),s=Oh(t,i,s,l,void 0,f),l=Ph(),t!==null&&!$n?(Fh(t,i,f),fs(t,i,f)):(Qt&&l&&mh(i),i.flags|=1,gi(t,i,s,f),i.child)}function P0(t,i,s,l,f,h){return Fr(i),i.updateQueue=null,s=zg(i,l,s,f),Bg(t),l=Ph(),t!==null&&!$n?(Fh(t,i,h),fs(t,i,h)):(Qt&&l&&mh(i),i.flags|=1,gi(t,i,s,h),i.child)}function F0(t,i,s,l,f){if(Fr(i),i.stateNode===null){var h=xo,S=s.contextType;typeof S=="object"&&S!==null&&(h=mi(S)),h=new s(l,h),i.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=Qh,i.stateNode=h,h._reactInternals=i,h=i.stateNode,h.props=l,h.state=i.memoizedState,h.refs={},Ah(i),S=s.contextType,h.context=typeof S=="object"&&S!==null?mi(S):xo,h.state=i.memoizedState,S=s.getDerivedStateFromProps,typeof S=="function"&&(Kh(i,s,S,l),h.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(S=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),S!==h.state&&Qh.enqueueReplaceState(h,h.state,null),Xl(i,l,h,f),Vl(),h.state=i.memoizedState),typeof h.componentDidMount=="function"&&(i.flags|=4194308),l=!0}else if(t===null){h=i.stateNode;var w=i.memoizedProps,V=kr(s,w);h.props=V;var fe=h.context,be=s.contextType;S=xo,typeof be=="object"&&be!==null&&(S=mi(be));var Te=s.getDerivedStateFromProps;be=typeof Te=="function"||typeof h.getSnapshotBeforeUpdate=="function",w=i.pendingProps!==w,be||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(w||fe!==S)&&M0(i,h,l,S),qs=!1;var pe=i.memoizedState;h.state=pe,Xl(i,l,h,f),Vl(),fe=i.memoizedState,w||pe!==fe||qs?(typeof Te=="function"&&(Kh(i,s,Te,l),fe=i.memoizedState),(V=qs||S0(i,s,V,l,pe,fe,S))?(be||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(i.flags|=4194308)):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=fe),h.props=l,h.state=fe,h.context=S,l=V):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{h=i.stateNode,wh(t,i),S=i.memoizedProps,be=kr(s,S),h.props=be,Te=i.pendingProps,pe=h.context,fe=s.contextType,V=xo,typeof fe=="object"&&fe!==null&&(V=mi(fe)),w=s.getDerivedStateFromProps,(fe=typeof w=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(S!==Te||pe!==V)&&M0(i,h,l,V),qs=!1,pe=i.memoizedState,h.state=pe,Xl(i,l,h,f),Vl();var ge=i.memoizedState;S!==Te||pe!==ge||qs||t!==null&&t.dependencies!==null&&$c(t.dependencies)?(typeof w=="function"&&(Kh(i,s,w,l),ge=i.memoizedState),(be=qs||S0(i,s,be,l,pe,ge,V)||t!==null&&t.dependencies!==null&&$c(t.dependencies))?(fe||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(l,ge,V),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(l,ge,V)),typeof h.componentDidUpdate=="function"&&(i.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof h.componentDidUpdate!="function"||S===t.memoizedProps&&pe===t.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||S===t.memoizedProps&&pe===t.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=ge),h.props=l,h.state=ge,h.context=V,l=be):(typeof h.componentDidUpdate!="function"||S===t.memoizedProps&&pe===t.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||S===t.memoizedProps&&pe===t.memoizedState||(i.flags|=1024),l=!1)}return h=l,_u(t,i),l=(i.flags&128)!==0,h||l?(h=i.stateNode,s=l&&typeof s.getDerivedStateFromError!="function"?null:h.render(),i.flags|=1,t!==null&&l?(i.child=Hr(i,t.child,null,f),i.child=Hr(i,null,s,f)):gi(t,i,s,f),i.memoizedState=h.state,t=i.child):t=fs(t,i,f),t}function B0(t,i,s,l){return Or(),i.flags|=256,gi(t,i,s,l),i.child}var td={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function nd(t){return{baseLanes:t,cachePool:Ag()}}function id(t,i,s){return t=t!==null?t.childLanes&~s:0,i&&(t|=ta),t}function z0(t,i,s){var l=i.pendingProps,f=!1,h=(i.flags&128)!==0,S;if((S=h)||(S=t!==null&&t.memoizedState===null?!1:(jn.current&2)!==0),S&&(f=!0,i.flags&=-129),S=(i.flags&32)!==0,i.flags&=-33,t===null){if(Qt){if(f?js(i):Zs(),(t=On)?(t=Wv(t,va),t=t!==null&&t.data!=="&"?t:null,t!==null&&(i.memoizedState={dehydrated:t,treeContext:Gs!==null?{id:ka,overflow:Va}:null,retryLane:536870912,hydrationErrors:null},s=vg(t),s.return=i,i.child=s,pi=i,On=null)):t=null,t===null)throw Vs(i);return Id(t)?i.lanes=32:i.lanes=536870912,null}var w=l.children;return l=l.fallback,f?(Zs(),f=i.mode,w=xu({mode:"hidden",children:w},f),l=Ur(l,f,s,null),w.return=i,l.return=i,w.sibling=l,i.child=w,l=i.child,l.memoizedState=nd(s),l.childLanes=id(t,S,s),i.memoizedState=td,Zl(null,l)):(js(i),ad(i,w))}var V=t.memoizedState;if(V!==null&&(w=V.dehydrated,w!==null)){if(h)i.flags&256?(js(i),i.flags&=-257,i=sd(t,i,s)):i.memoizedState!==null?(Zs(),i.child=t.child,i.flags|=128,i=null):(Zs(),w=l.fallback,f=i.mode,l=xu({mode:"visible",children:l.children},f),w=Ur(w,f,s,null),w.flags|=2,l.return=i,w.return=i,l.sibling=w,i.child=l,Hr(i,t.child,null,s),l=i.child,l.memoizedState=nd(s),l.childLanes=id(t,S,s),i.memoizedState=td,i=Zl(null,l));else if(js(i),Id(w)){if(S=w.nextSibling&&w.nextSibling.dataset,S)var fe=S.dgst;S=fe,l=Error(a(419)),l.stack="",l.digest=S,Bl({value:l,source:null,stack:null}),i=sd(t,i,s)}else if($n||bo(t,i,s,!1),S=(s&t.childLanes)!==0,$n||S){if(S=Tn,S!==null&&(l=yi(S,s),l!==0&&l!==V.retryLane))throw V.retryLane=l,Lr(t,l),Vi(S,t,l),$h;zd(w)||Ru(),i=sd(t,i,s)}else zd(w)?(i.flags|=192,i.child=t.child,i=null):(t=V.treeContext,On=xa(w.nextSibling),pi=i,Qt=!0,ks=null,va=!1,t!==null&&yg(i,t),i=ad(i,l.children),i.flags|=4096);return i}return f?(Zs(),w=l.fallback,f=i.mode,V=t.child,fe=V.sibling,l=ss(V,{mode:"hidden",children:l.children}),l.subtreeFlags=V.subtreeFlags&65011712,fe!==null?w=ss(fe,w):(w=Ur(w,f,s,null),w.flags|=2),w.return=i,l.return=i,l.sibling=w,i.child=l,Zl(null,l),l=i.child,w=t.child.memoizedState,w===null?w=nd(s):(f=w.cachePool,f!==null?(V=Qn._currentValue,f=f.parent!==V?{parent:V,pool:V}:f):f=Ag(),w={baseLanes:w.baseLanes|s,cachePool:f}),l.memoizedState=w,l.childLanes=id(t,S,s),i.memoizedState=td,Zl(t.child,l)):(js(i),s=t.child,t=s.sibling,s=ss(s,{mode:"visible",children:l.children}),s.return=i,s.sibling=null,t!==null&&(S=i.deletions,S===null?(i.deletions=[t],i.flags|=16):S.push(t)),i.child=s,i.memoizedState=null,s)}function ad(t,i){return i=xu({mode:"visible",children:i},t.mode),i.return=t,t.child=i}function xu(t,i){return t=Qi(22,t,null,i),t.lanes=0,t}function sd(t,i,s){return Hr(i,t.child,null,s),t=ad(i,i.pendingProps.children),t.flags|=2,i.memoizedState=null,t}function I0(t,i,s){t.lanes|=i;var l=t.alternate;l!==null&&(l.lanes|=i),yh(t.return,i,s)}function rd(t,i,s,l,f,h){var S=t.memoizedState;S===null?t.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:s,tailMode:f,treeForkCount:h}:(S.isBackwards=i,S.rendering=null,S.renderingStartTime=0,S.last=l,S.tail=s,S.tailMode=f,S.treeForkCount=h)}function H0(t,i,s){var l=i.pendingProps,f=l.revealOrder,h=l.tail;l=l.children;var S=jn.current,w=(S&2)!==0;if(w?(S=S&1|2,i.flags|=128):S&=1,Ce(jn,S),gi(t,i,l,s),l=Qt?Fl:0,!w&&t!==null&&(t.flags&128)!==0)e:for(t=i.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&I0(t,s,i);else if(t.tag===19)I0(t,s,i);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===i)break e;for(;t.sibling===null;){if(t.return===null||t.return===i)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(f){case"forwards":for(s=i.child,f=null;s!==null;)t=s.alternate,t!==null&&ou(t)===null&&(f=s),s=s.sibling;s=f,s===null?(f=i.child,i.child=null):(f=s.sibling,s.sibling=null),rd(i,!1,f,s,h,l);break;case"backwards":case"unstable_legacy-backwards":for(s=null,f=i.child,i.child=null;f!==null;){if(t=f.alternate,t!==null&&ou(t)===null){i.child=f;break}t=f.sibling,f.sibling=s,s=f,f=t}rd(i,!0,s,null,h,l);break;case"together":rd(i,!1,null,null,void 0,l);break;default:i.memoizedState=null}return i.child}function fs(t,i,s){if(t!==null&&(i.dependencies=t.dependencies),Js|=i.lanes,(s&i.childLanes)===0)if(t!==null){if(bo(t,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(t!==null&&i.child!==t.child)throw Error(a(153));if(i.child!==null){for(t=i.child,s=ss(t,t.pendingProps),i.child=s,s.return=i;t.sibling!==null;)t=t.sibling,s=s.sibling=ss(t,t.pendingProps),s.return=i;s.sibling=null}return i.child}function od(t,i){return(t.lanes&i)!==0?!0:(t=t.dependencies,!!(t!==null&&$c(t)))}function MS(t,i,s){switch(i.tag){case 3:Re(i,i.stateNode.containerInfo),Xs(i,Qn,t.memoizedState.cache),Or();break;case 27:case 5:vt(i);break;case 4:Re(i,i.stateNode.containerInfo);break;case 10:Xs(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,Lh(i),null;break;case 13:var l=i.memoizedState;if(l!==null)return l.dehydrated!==null?(js(i),i.flags|=128,null):(s&i.child.childLanes)!==0?z0(t,i,s):(js(i),t=fs(t,i,s),t!==null?t.sibling:null);js(i);break;case 19:var f=(t.flags&128)!==0;if(l=(s&i.childLanes)!==0,l||(bo(t,i,s,!1),l=(s&i.childLanes)!==0),f){if(l)return H0(t,i,s);i.flags|=128}if(f=i.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),Ce(jn,jn.current),l)break;return null;case 22:return i.lanes=0,L0(t,i,s,i.pendingProps);case 24:Xs(i,Qn,t.memoizedState.cache)}return fs(t,i,s)}function G0(t,i,s){if(t!==null)if(t.memoizedProps!==i.pendingProps)$n=!0;else{if(!od(t,s)&&(i.flags&128)===0)return $n=!1,MS(t,i,s);$n=(t.flags&131072)!==0}else $n=!1,Qt&&(i.flags&1048576)!==0&&xg(i,Fl,i.index);switch(i.lanes=0,i.tag){case 16:e:{var l=i.pendingProps;if(t=zr(i.elementType),i.type=t,typeof t=="function")hh(t)?(l=kr(t,l),i.tag=1,i=F0(null,i,t,l,s)):(i.tag=0,i=ed(null,i,t,l,s));else{if(t!=null){var f=t.$$typeof;if(f===R){i.tag=11,i=C0(null,i,t,l,s);break e}else if(f===z){i.tag=14,i=D0(null,i,t,l,s);break e}}throw i=xe(t)||t,Error(a(306,i,""))}}return i;case 0:return ed(t,i,i.type,i.pendingProps,s);case 1:return l=i.type,f=kr(l,i.pendingProps),F0(t,i,l,f,s);case 3:e:{if(Re(i,i.stateNode.containerInfo),t===null)throw Error(a(387));l=i.pendingProps;var h=i.memoizedState;f=h.element,wh(t,i),Xl(i,l,null,s);var S=i.memoizedState;if(l=S.cache,Xs(i,Qn,l),l!==h.cache&&Sh(i,[Qn],s,!0),Vl(),l=S.element,h.isDehydrated)if(h={element:l,isDehydrated:!1,cache:S.cache},i.updateQueue.baseState=h,i.memoizedState=h,i.flags&256){i=B0(t,i,l,s);break e}else if(l!==f){f=pa(Error(a(424)),i),Bl(f),i=B0(t,i,l,s);break e}else{switch(t=i.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(On=xa(t.firstChild),pi=i,Qt=!0,ks=null,va=!0,s=Lg(i,null,l,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(Or(),l===f){i=fs(t,i,s);break e}gi(t,i,l,s)}i=i.child}return i;case 26:return _u(t,i),t===null?(s=Jv(i.type,null,i.pendingProps,null))?i.memoizedState=s:Qt||(s=i.type,t=i.pendingProps,l=Pu(re.current).createElement(s),l[Vn]=i,l[ni]=t,vi(l,s,t),Tt(l),i.stateNode=l):i.memoizedState=Jv(i.type,t.memoizedProps,i.pendingProps,t.memoizedState),null;case 27:return vt(i),t===null&&Qt&&(l=i.stateNode=Zv(i.type,i.pendingProps,re.current),pi=i,va=!0,f=On,ir(i.type)?(Hd=f,On=xa(l.firstChild)):On=f),gi(t,i,i.pendingProps.children,s),_u(t,i),t===null&&(i.flags|=4194304),i.child;case 5:return t===null&&Qt&&((f=l=On)&&(l=JS(l,i.type,i.pendingProps,va),l!==null?(i.stateNode=l,pi=i,On=xa(l.firstChild),va=!1,f=!0):f=!1),f||Vs(i)),vt(i),f=i.type,h=i.pendingProps,S=t!==null?t.memoizedProps:null,l=h.children,Pd(f,h)?l=null:S!==null&&Pd(f,S)&&(i.flags|=32),i.memoizedState!==null&&(f=Oh(t,i,dS,null,null,s),uc._currentValue=f),_u(t,i),gi(t,i,l,s),i.child;case 6:return t===null&&Qt&&((t=s=On)&&(s=$S(s,i.pendingProps,va),s!==null?(i.stateNode=s,pi=i,On=null,t=!0):t=!1),t||Vs(i)),null;case 13:return z0(t,i,s);case 4:return Re(i,i.stateNode.containerInfo),l=i.pendingProps,t===null?i.child=Hr(i,null,l,s):gi(t,i,l,s),i.child;case 11:return C0(t,i,i.type,i.pendingProps,s);case 7:return gi(t,i,i.pendingProps,s),i.child;case 8:return gi(t,i,i.pendingProps.children,s),i.child;case 12:return gi(t,i,i.pendingProps.children,s),i.child;case 10:return l=i.pendingProps,Xs(i,i.type,l.value),gi(t,i,l.children,s),i.child;case 9:return f=i.type._context,l=i.pendingProps.children,Fr(i),f=mi(f),l=l(f),i.flags|=1,gi(t,i,l,s),i.child;case 14:return D0(t,i,i.type,i.pendingProps,s);case 15:return N0(t,i,i.type,i.pendingProps,s);case 19:return H0(t,i,s);case 31:return SS(t,i,s);case 22:return L0(t,i,s,i.pendingProps);case 24:return Fr(i),l=mi(Qn),t===null?(f=Eh(),f===null&&(f=Tn,h=Mh(),f.pooledCache=h,h.refCount++,h!==null&&(f.pooledCacheLanes|=s),f=h),i.memoizedState={parent:l,cache:f},Ah(i),Xs(i,Qn,f)):((t.lanes&s)!==0&&(wh(t,i),Xl(i,null,null,s),Vl()),f=t.memoizedState,h=i.memoizedState,f.parent!==l?(f={parent:l,cache:l},i.memoizedState=f,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=f),Xs(i,Qn,l)):(l=h.cache,Xs(i,Qn,l),l!==f.cache&&Sh(i,[Qn],s,!0))),gi(t,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(a(156,i.tag))}function hs(t){t.flags|=4}function ld(t,i,s,l,f){if((i=(t.mode&32)!==0)&&(i=!1),i){if(t.flags|=16777216,(f&335544128)===f)if(t.stateNode.complete)t.flags|=8192;else if(pv())t.flags|=8192;else throw Ir=iu,Th}else t.flags&=-16777217}function k0(t,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!i_(i))if(pv())t.flags|=8192;else throw Ir=iu,Th}function yu(t,i){i!==null&&(t.flags|=4),t.flags&16384&&(i=t.tag!==22?we():536870912,t.lanes|=i,Po|=i)}function Kl(t,i){if(!Qt)switch(t.tailMode){case"hidden":i=t.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?t.tail=null:s.sibling=null;break;case"collapsed":s=t.tail;for(var l=null;s!==null;)s.alternate!==null&&(l=s),s=s.sibling;l===null?i||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null}}function Pn(t){var i=t.alternate!==null&&t.alternate.child===t.child,s=0,l=0;if(i)for(var f=t.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags&65011712,l|=f.flags&65011712,f.return=t,f=f.sibling;else for(f=t.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags,l|=f.flags,f.return=t,f=f.sibling;return t.subtreeFlags|=l,t.childLanes=s,i}function bS(t,i,s){var l=i.pendingProps;switch(gh(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Pn(i),null;case 1:return Pn(i),null;case 3:return s=i.stateNode,l=null,t!==null&&(l=t.memoizedState.cache),i.memoizedState.cache!==l&&(i.flags|=2048),ls(Qn),nt(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(t===null||t.child===null)&&(Mo(i)?hs(i):t===null||t.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,_h())),Pn(i),null;case 26:var f=i.type,h=i.memoizedState;return t===null?(hs(i),h!==null?(Pn(i),k0(i,h)):(Pn(i),ld(i,f,null,l,s))):h?h!==t.memoizedState?(hs(i),Pn(i),k0(i,h)):(Pn(i),i.flags&=-16777217):(t=t.memoizedProps,t!==l&&hs(i),Pn(i),ld(i,f,t,l,s)),null;case 27:if(Ze(i),s=re.current,f=i.type,t!==null&&i.stateNode!=null)t.memoizedProps!==l&&hs(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return Pn(i),null}t=Ie.current,Mo(i)?Sg(i):(t=Zv(f,l,s),i.stateNode=t,hs(i))}return Pn(i),null;case 5:if(Ze(i),f=i.type,t!==null&&i.stateNode!=null)t.memoizedProps!==l&&hs(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return Pn(i),null}if(h=Ie.current,Mo(i))Sg(i);else{var S=Pu(re.current);switch(h){case 1:h=S.createElementNS("http://www.w3.org/2000/svg",f);break;case 2:h=S.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;default:switch(f){case"svg":h=S.createElementNS("http://www.w3.org/2000/svg",f);break;case"math":h=S.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;case"script":h=S.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof l.is=="string"?S.createElement("select",{is:l.is}):S.createElement("select"),l.multiple?h.multiple=!0:l.size&&(h.size=l.size);break;default:h=typeof l.is=="string"?S.createElement(f,{is:l.is}):S.createElement(f)}}h[Vn]=i,h[ni]=l;e:for(S=i.child;S!==null;){if(S.tag===5||S.tag===6)h.appendChild(S.stateNode);else if(S.tag!==4&&S.tag!==27&&S.child!==null){S.child.return=S,S=S.child;continue}if(S===i)break e;for(;S.sibling===null;){if(S.return===null||S.return===i)break e;S=S.return}S.sibling.return=S.return,S=S.sibling}i.stateNode=h;e:switch(vi(h,f,l),f){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break e;case"img":l=!0;break e;default:l=!1}l&&hs(i)}}return Pn(i),ld(i,i.type,t===null?null:t.memoizedProps,i.pendingProps,s),null;case 6:if(t&&i.stateNode!=null)t.memoizedProps!==l&&hs(i);else{if(typeof l!="string"&&i.stateNode===null)throw Error(a(166));if(t=re.current,Mo(i)){if(t=i.stateNode,s=i.memoizedProps,l=null,f=pi,f!==null)switch(f.tag){case 27:case 5:l=f.memoizedProps}t[Vn]=i,t=!!(t.nodeValue===s||l!==null&&l.suppressHydrationWarning===!0||zv(t.nodeValue,s)),t||Vs(i,!0)}else t=Pu(t).createTextNode(l),t[Vn]=i,i.stateNode=t}return Pn(i),null;case 31:if(s=i.memoizedState,t===null||t.memoizedState!==null){if(l=Mo(i),s!==null){if(t===null){if(!l)throw Error(a(318));if(t=i.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(a(557));t[Vn]=i}else Or(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Pn(i),t=!1}else s=_h(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=s),t=!0;if(!t)return i.flags&256?($i(i),i):($i(i),null);if((i.flags&128)!==0)throw Error(a(558))}return Pn(i),null;case 13:if(l=i.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(f=Mo(i),l!==null&&l.dehydrated!==null){if(t===null){if(!f)throw Error(a(318));if(f=i.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(a(317));f[Vn]=i}else Or(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Pn(i),f=!1}else f=_h(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=f),f=!0;if(!f)return i.flags&256?($i(i),i):($i(i),null)}return $i(i),(i.flags&128)!==0?(i.lanes=s,i):(s=l!==null,t=t!==null&&t.memoizedState!==null,s&&(l=i.child,f=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(f=l.alternate.memoizedState.cachePool.pool),h=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(h=l.memoizedState.cachePool.pool),h!==f&&(l.flags|=2048)),s!==t&&s&&(i.child.flags|=8192),yu(i,i.updateQueue),Pn(i),null);case 4:return nt(),t===null&&Dd(i.stateNode.containerInfo),Pn(i),null;case 10:return ls(i.type),Pn(i),null;case 19:if(Q(jn),l=i.memoizedState,l===null)return Pn(i),null;if(f=(i.flags&128)!==0,h=l.rendering,h===null)if(f)Kl(l,!1);else{if(Wn!==0||t!==null&&(t.flags&128)!==0)for(t=i.child;t!==null;){if(h=ou(t),h!==null){for(i.flags|=128,Kl(l,!1),t=h.updateQueue,i.updateQueue=t,yu(i,t),i.subtreeFlags=0,t=s,s=i.child;s!==null;)gg(s,t),s=s.sibling;return Ce(jn,jn.current&1|2),Qt&&rs(i,l.treeForkCount),i.child}t=t.sibling}l.tail!==null&&nn()>Tu&&(i.flags|=128,f=!0,Kl(l,!1),i.lanes=4194304)}else{if(!f)if(t=ou(h),t!==null){if(i.flags|=128,f=!0,t=t.updateQueue,i.updateQueue=t,yu(i,t),Kl(l,!0),l.tail===null&&l.tailMode==="hidden"&&!h.alternate&&!Qt)return Pn(i),null}else 2*nn()-l.renderingStartTime>Tu&&s!==536870912&&(i.flags|=128,f=!0,Kl(l,!1),i.lanes=4194304);l.isBackwards?(h.sibling=i.child,i.child=h):(t=l.last,t!==null?t.sibling=h:i.child=h,l.last=h)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=nn(),t.sibling=null,s=jn.current,Ce(jn,f?s&1|2:s&1),Qt&&rs(i,l.treeForkCount),t):(Pn(i),null);case 22:case 23:return $i(i),Nh(),l=i.memoizedState!==null,t!==null?t.memoizedState!==null!==l&&(i.flags|=8192):l&&(i.flags|=8192),l?(s&536870912)!==0&&(i.flags&128)===0&&(Pn(i),i.subtreeFlags&6&&(i.flags|=8192)):Pn(i),s=i.updateQueue,s!==null&&yu(i,s.retryQueue),s=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(s=t.memoizedState.cachePool.pool),l=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(l=i.memoizedState.cachePool.pool),l!==s&&(i.flags|=2048),t!==null&&Q(Br),null;case 24:return s=null,t!==null&&(s=t.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),ls(Qn),Pn(i),null;case 25:return null;case 30:return null}throw Error(a(156,i.tag))}function ES(t,i){switch(gh(i),i.tag){case 1:return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 3:return ls(Qn),nt(),t=i.flags,(t&65536)!==0&&(t&128)===0?(i.flags=t&-65537|128,i):null;case 26:case 27:case 5:return Ze(i),null;case 31:if(i.memoizedState!==null){if($i(i),i.alternate===null)throw Error(a(340));Or()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 13:if($i(i),t=i.memoizedState,t!==null&&t.dehydrated!==null){if(i.alternate===null)throw Error(a(340));Or()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 19:return Q(jn),null;case 4:return nt(),null;case 10:return ls(i.type),null;case 22:case 23:return $i(i),Nh(),t!==null&&Q(Br),t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 24:return ls(Qn),null;case 25:return null;default:return null}}function V0(t,i){switch(gh(i),i.tag){case 3:ls(Qn),nt();break;case 26:case 27:case 5:Ze(i);break;case 4:nt();break;case 31:i.memoizedState!==null&&$i(i);break;case 13:$i(i);break;case 19:Q(jn);break;case 10:ls(i.type);break;case 22:case 23:$i(i),Nh(),t!==null&&Q(Br);break;case 24:ls(Qn)}}function Ql(t,i){try{var s=i.updateQueue,l=s!==null?s.lastEffect:null;if(l!==null){var f=l.next;s=f;do{if((s.tag&t)===t){l=void 0;var h=s.create,S=s.inst;l=h(),S.destroy=l}s=s.next}while(s!==f)}}catch(w){mn(i,i.return,w)}}function Ks(t,i,s){try{var l=i.updateQueue,f=l!==null?l.lastEffect:null;if(f!==null){var h=f.next;l=h;do{if((l.tag&t)===t){var S=l.inst,w=S.destroy;if(w!==void 0){S.destroy=void 0,f=i;var V=s,fe=w;try{fe()}catch(be){mn(f,V,be)}}}l=l.next}while(l!==h)}}catch(be){mn(i,i.return,be)}}function X0(t){var i=t.updateQueue;if(i!==null){var s=t.stateNode;try{Og(i,s)}catch(l){mn(t,t.return,l)}}}function q0(t,i,s){s.props=kr(t.type,t.memoizedProps),s.state=t.memoizedState;try{s.componentWillUnmount()}catch(l){mn(t,i,l)}}function Jl(t,i){try{var s=t.ref;if(s!==null){switch(t.tag){case 26:case 27:case 5:var l=t.stateNode;break;case 30:l=t.stateNode;break;default:l=t.stateNode}typeof s=="function"?t.refCleanup=s(l):s.current=l}}catch(f){mn(t,i,f)}}function Xa(t,i){var s=t.ref,l=t.refCleanup;if(s!==null)if(typeof l=="function")try{l()}catch(f){mn(t,i,f)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(f){mn(t,i,f)}else s.current=null}function W0(t){var i=t.type,s=t.memoizedProps,l=t.stateNode;try{e:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&l.focus();break e;case"img":s.src?l.src=s.src:s.srcSet&&(l.srcset=s.srcSet)}}catch(f){mn(t,t.return,f)}}function cd(t,i,s){try{var l=t.stateNode;WS(l,t.type,s,i),l[ni]=i}catch(f){mn(t,t.return,f)}}function Y0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&ir(t.type)||t.tag===4}function ud(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Y0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&ir(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function fd(t,i,s){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(t,i):(i=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,i.appendChild(t),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=Kn));else if(l!==4&&(l===27&&ir(t.type)&&(s=t.stateNode,i=null),t=t.child,t!==null))for(fd(t,i,s),t=t.sibling;t!==null;)fd(t,i,s),t=t.sibling}function Su(t,i,s){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?s.insertBefore(t,i):s.appendChild(t);else if(l!==4&&(l===27&&ir(t.type)&&(s=t.stateNode),t=t.child,t!==null))for(Su(t,i,s),t=t.sibling;t!==null;)Su(t,i,s),t=t.sibling}function j0(t){var i=t.stateNode,s=t.memoizedProps;try{for(var l=t.type,f=i.attributes;f.length;)i.removeAttributeNode(f[0]);vi(i,l,s),i[Vn]=t,i[ni]=s}catch(h){mn(t,t.return,h)}}var ds=!1,ei=!1,hd=!1,Z0=typeof WeakSet=="function"?WeakSet:Set,ui=null;function TS(t,i){if(t=t.containerInfo,Ud=ku,t=ot(t),St(t)){if("selectionStart"in t)var s={start:t.selectionStart,end:t.selectionEnd};else e:{s=(s=t.ownerDocument)&&s.defaultView||window;var l=s.getSelection&&s.getSelection();if(l&&l.rangeCount!==0){s=l.anchorNode;var f=l.anchorOffset,h=l.focusNode;l=l.focusOffset;try{s.nodeType,h.nodeType}catch{s=null;break e}var S=0,w=-1,V=-1,fe=0,be=0,Te=t,pe=null;t:for(;;){for(var ge;Te!==s||f!==0&&Te.nodeType!==3||(w=S+f),Te!==h||l!==0&&Te.nodeType!==3||(V=S+l),Te.nodeType===3&&(S+=Te.nodeValue.length),(ge=Te.firstChild)!==null;)pe=Te,Te=ge;for(;;){if(Te===t)break t;if(pe===s&&++fe===f&&(w=S),pe===h&&++be===l&&(V=S),(ge=Te.nextSibling)!==null)break;Te=pe,pe=Te.parentNode}Te=ge}s=w===-1||V===-1?null:{start:w,end:V}}else s=null}s=s||{start:0,end:0}}else s=null;for(Od={focusedElem:t,selectionRange:s},ku=!1,ui=i;ui!==null;)if(i=ui,t=i.child,(i.subtreeFlags&1028)!==0&&t!==null)t.return=i,ui=t;else for(;ui!==null;){switch(i=ui,h=i.alternate,t=i.flags,i.tag){case 0:if((t&4)!==0&&(t=i.updateQueue,t=t!==null?t.events:null,t!==null))for(s=0;s<t.length;s++)f=t[s],f.ref.impl=f.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&h!==null){t=void 0,s=i,f=h.memoizedProps,h=h.memoizedState,l=s.stateNode;try{var lt=kr(s.type,f);t=l.getSnapshotBeforeUpdate(lt,h),l.__reactInternalSnapshotBeforeUpdate=t}catch(xt){mn(s,s.return,xt)}}break;case 3:if((t&1024)!==0){if(t=i.stateNode.containerInfo,s=t.nodeType,s===9)Bd(t);else if(s===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Bd(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(a(163))}if(t=i.sibling,t!==null){t.return=i.return,ui=t;break}ui=i.return}}function K0(t,i,s){var l=s.flags;switch(s.tag){case 0:case 11:case 15:ms(t,s),l&4&&Ql(5,s);break;case 1:if(ms(t,s),l&4)if(t=s.stateNode,i===null)try{t.componentDidMount()}catch(S){mn(s,s.return,S)}else{var f=kr(s.type,i.memoizedProps);i=i.memoizedState;try{t.componentDidUpdate(f,i,t.__reactInternalSnapshotBeforeUpdate)}catch(S){mn(s,s.return,S)}}l&64&&X0(s),l&512&&Jl(s,s.return);break;case 3:if(ms(t,s),l&64&&(t=s.updateQueue,t!==null)){if(i=null,s.child!==null)switch(s.child.tag){case 27:case 5:i=s.child.stateNode;break;case 1:i=s.child.stateNode}try{Og(t,i)}catch(S){mn(s,s.return,S)}}break;case 27:i===null&&l&4&&j0(s);case 26:case 5:ms(t,s),i===null&&l&4&&W0(s),l&512&&Jl(s,s.return);break;case 12:ms(t,s);break;case 31:ms(t,s),l&4&&$0(t,s);break;case 13:ms(t,s),l&4&&ev(t,s),l&64&&(t=s.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(s=OS.bind(null,s),eM(t,s))));break;case 22:if(l=s.memoizedState!==null||ds,!l){i=i!==null&&i.memoizedState!==null||ei,f=ds;var h=ei;ds=l,(ei=i)&&!h?gs(t,s,(s.subtreeFlags&8772)!==0):ms(t,s),ds=f,ei=h}break;case 30:break;default:ms(t,s)}}function Q0(t){var i=t.alternate;i!==null&&(t.alternate=null,Q0(i)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(i=t.stateNode,i!==null&&ca(i)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var In=null,Ii=!1;function ps(t,i,s){for(s=s.child;s!==null;)J0(t,i,s),s=s.sibling}function J0(t,i,s){if(ye&&typeof ye.onCommitFiberUnmount=="function")try{ye.onCommitFiberUnmount(me,s)}catch{}switch(s.tag){case 26:ei||Xa(s,i),ps(t,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:ei||Xa(s,i);var l=In,f=Ii;ir(s.type)&&(In=s.stateNode,Ii=!1),ps(t,i,s),oc(s.stateNode),In=l,Ii=f;break;case 5:ei||Xa(s,i);case 6:if(l=In,f=Ii,In=null,ps(t,i,s),In=l,Ii=f,In!==null)if(Ii)try{(In.nodeType===9?In.body:In.nodeName==="HTML"?In.ownerDocument.body:In).removeChild(s.stateNode)}catch(h){mn(s,i,h)}else try{In.removeChild(s.stateNode)}catch(h){mn(s,i,h)}break;case 18:In!==null&&(Ii?(t=In,Xv(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,s.stateNode),Vo(t)):Xv(In,s.stateNode));break;case 4:l=In,f=Ii,In=s.stateNode.containerInfo,Ii=!0,ps(t,i,s),In=l,Ii=f;break;case 0:case 11:case 14:case 15:Ks(2,s,i),ei||Ks(4,s,i),ps(t,i,s);break;case 1:ei||(Xa(s,i),l=s.stateNode,typeof l.componentWillUnmount=="function"&&q0(s,i,l)),ps(t,i,s);break;case 21:ps(t,i,s);break;case 22:ei=(l=ei)||s.memoizedState!==null,ps(t,i,s),ei=l;break;default:ps(t,i,s)}}function $0(t,i){if(i.memoizedState===null&&(t=i.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Vo(t)}catch(s){mn(i,i.return,s)}}}function ev(t,i){if(i.memoizedState===null&&(t=i.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Vo(t)}catch(s){mn(i,i.return,s)}}function AS(t){switch(t.tag){case 31:case 13:case 19:var i=t.stateNode;return i===null&&(i=t.stateNode=new Z0),i;case 22:return t=t.stateNode,i=t._retryCache,i===null&&(i=t._retryCache=new Z0),i;default:throw Error(a(435,t.tag))}}function Mu(t,i){var s=AS(t);i.forEach(function(l){if(!s.has(l)){s.add(l);var f=PS.bind(null,t,l);l.then(f,f)}})}function Hi(t,i){var s=i.deletions;if(s!==null)for(var l=0;l<s.length;l++){var f=s[l],h=t,S=i,w=S;e:for(;w!==null;){switch(w.tag){case 27:if(ir(w.type)){In=w.stateNode,Ii=!1;break e}break;case 5:In=w.stateNode,Ii=!1;break e;case 3:case 4:In=w.stateNode.containerInfo,Ii=!0;break e}w=w.return}if(In===null)throw Error(a(160));J0(h,S,f),In=null,Ii=!1,h=f.alternate,h!==null&&(h.return=null),f.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)tv(i,t),i=i.sibling}var Ca=null;function tv(t,i){var s=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Hi(i,t),Gi(t),l&4&&(Ks(3,t,t.return),Ql(3,t),Ks(5,t,t.return));break;case 1:Hi(i,t),Gi(t),l&512&&(ei||s===null||Xa(s,s.return)),l&64&&ds&&(t=t.updateQueue,t!==null&&(l=t.callbacks,l!==null&&(s=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=s===null?l:s.concat(l))));break;case 26:var f=Ca;if(Hi(i,t),Gi(t),l&512&&(ei||s===null||Xa(s,s.return)),l&4){var h=s!==null?s.memoizedState:null;if(l=t.memoizedState,s===null)if(l===null)if(t.stateNode===null){e:{l=t.type,s=t.memoizedProps,f=f.ownerDocument||f;t:switch(l){case"title":h=f.getElementsByTagName("title")[0],(!h||h[ji]||h[Vn]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=f.createElement(l),f.head.insertBefore(h,f.querySelector("head > title"))),vi(h,l,s),h[Vn]=t,Tt(h),l=h;break e;case"link":var S=t_("link","href",f).get(l+(s.href||""));if(S){for(var w=0;w<S.length;w++)if(h=S[w],h.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&h.getAttribute("rel")===(s.rel==null?null:s.rel)&&h.getAttribute("title")===(s.title==null?null:s.title)&&h.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){S.splice(w,1);break t}}h=f.createElement(l),vi(h,l,s),f.head.appendChild(h);break;case"meta":if(S=t_("meta","content",f).get(l+(s.content||""))){for(w=0;w<S.length;w++)if(h=S[w],h.getAttribute("content")===(s.content==null?null:""+s.content)&&h.getAttribute("name")===(s.name==null?null:s.name)&&h.getAttribute("property")===(s.property==null?null:s.property)&&h.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&h.getAttribute("charset")===(s.charSet==null?null:s.charSet)){S.splice(w,1);break t}}h=f.createElement(l),vi(h,l,s),f.head.appendChild(h);break;default:throw Error(a(468,l))}h[Vn]=t,Tt(h),l=h}t.stateNode=l}else n_(f,t.type,t.stateNode);else t.stateNode=e_(f,l,t.memoizedProps);else h!==l?(h===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):h.count--,l===null?n_(f,t.type,t.stateNode):e_(f,l,t.memoizedProps)):l===null&&t.stateNode!==null&&cd(t,t.memoizedProps,s.memoizedProps)}break;case 27:Hi(i,t),Gi(t),l&512&&(ei||s===null||Xa(s,s.return)),s!==null&&l&4&&cd(t,t.memoizedProps,s.memoizedProps);break;case 5:if(Hi(i,t),Gi(t),l&512&&(ei||s===null||Xa(s,s.return)),t.flags&32){f=t.stateNode;try{bt(f,"")}catch(lt){mn(t,t.return,lt)}}l&4&&t.stateNode!=null&&(f=t.memoizedProps,cd(t,f,s!==null?s.memoizedProps:f)),l&1024&&(hd=!0);break;case 6:if(Hi(i,t),Gi(t),l&4){if(t.stateNode===null)throw Error(a(162));l=t.memoizedProps,s=t.stateNode;try{s.nodeValue=l}catch(lt){mn(t,t.return,lt)}}break;case 3:if(zu=null,f=Ca,Ca=Fu(i.containerInfo),Hi(i,t),Ca=f,Gi(t),l&4&&s!==null&&s.memoizedState.isDehydrated)try{Vo(i.containerInfo)}catch(lt){mn(t,t.return,lt)}hd&&(hd=!1,nv(t));break;case 4:l=Ca,Ca=Fu(t.stateNode.containerInfo),Hi(i,t),Gi(t),Ca=l;break;case 12:Hi(i,t),Gi(t);break;case 31:Hi(i,t),Gi(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Mu(t,l)));break;case 13:Hi(i,t),Gi(t),t.child.flags&8192&&t.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(Eu=nn()),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Mu(t,l)));break;case 22:f=t.memoizedState!==null;var V=s!==null&&s.memoizedState!==null,fe=ds,be=ei;if(ds=fe||f,ei=be||V,Hi(i,t),ei=be,ds=fe,Gi(t),l&8192)e:for(i=t.stateNode,i._visibility=f?i._visibility&-2:i._visibility|1,f&&(s===null||V||ds||ei||Vr(t)),s=null,i=t;;){if(i.tag===5||i.tag===26){if(s===null){V=s=i;try{if(h=V.stateNode,f)S=h.style,typeof S.setProperty=="function"?S.setProperty("display","none","important"):S.display="none";else{w=V.stateNode;var Te=V.memoizedProps.style,pe=Te!=null&&Te.hasOwnProperty("display")?Te.display:null;w.style.display=pe==null||typeof pe=="boolean"?"":(""+pe).trim()}}catch(lt){mn(V,V.return,lt)}}}else if(i.tag===6){if(s===null){V=i;try{V.stateNode.nodeValue=f?"":V.memoizedProps}catch(lt){mn(V,V.return,lt)}}}else if(i.tag===18){if(s===null){V=i;try{var ge=V.stateNode;f?qv(ge,!0):qv(V.stateNode,!1)}catch(lt){mn(V,V.return,lt)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===t)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break e;for(;i.sibling===null;){if(i.return===null||i.return===t)break e;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}l&4&&(l=t.updateQueue,l!==null&&(s=l.retryQueue,s!==null&&(l.retryQueue=null,Mu(t,s))));break;case 19:Hi(i,t),Gi(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Mu(t,l)));break;case 30:break;case 21:break;default:Hi(i,t),Gi(t)}}function Gi(t){var i=t.flags;if(i&2){try{for(var s,l=t.return;l!==null;){if(Y0(l)){s=l;break}l=l.return}if(s==null)throw Error(a(160));switch(s.tag){case 27:var f=s.stateNode,h=ud(t);Su(t,h,f);break;case 5:var S=s.stateNode;s.flags&32&&(bt(S,""),s.flags&=-33);var w=ud(t);Su(t,w,S);break;case 3:case 4:var V=s.stateNode.containerInfo,fe=ud(t);fd(t,fe,V);break;default:throw Error(a(161))}}catch(be){mn(t,t.return,be)}t.flags&=-3}i&4096&&(t.flags&=-4097)}function nv(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var i=t;nv(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),t=t.sibling}}function ms(t,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)K0(t,i.alternate,i),i=i.sibling}function Vr(t){for(t=t.child;t!==null;){var i=t;switch(i.tag){case 0:case 11:case 14:case 15:Ks(4,i,i.return),Vr(i);break;case 1:Xa(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&q0(i,i.return,s),Vr(i);break;case 27:oc(i.stateNode);case 26:case 5:Xa(i,i.return),Vr(i);break;case 22:i.memoizedState===null&&Vr(i);break;case 30:Vr(i);break;default:Vr(i)}t=t.sibling}}function gs(t,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var l=i.alternate,f=t,h=i,S=h.flags;switch(h.tag){case 0:case 11:case 15:gs(f,h,s),Ql(4,h);break;case 1:if(gs(f,h,s),l=h,f=l.stateNode,typeof f.componentDidMount=="function")try{f.componentDidMount()}catch(fe){mn(l,l.return,fe)}if(l=h,f=l.updateQueue,f!==null){var w=l.stateNode;try{var V=f.shared.hiddenCallbacks;if(V!==null)for(f.shared.hiddenCallbacks=null,f=0;f<V.length;f++)Ug(V[f],w)}catch(fe){mn(l,l.return,fe)}}s&&S&64&&X0(h),Jl(h,h.return);break;case 27:j0(h);case 26:case 5:gs(f,h,s),s&&l===null&&S&4&&W0(h),Jl(h,h.return);break;case 12:gs(f,h,s);break;case 31:gs(f,h,s),s&&S&4&&$0(f,h);break;case 13:gs(f,h,s),s&&S&4&&ev(f,h);break;case 22:h.memoizedState===null&&gs(f,h,s),Jl(h,h.return);break;case 30:break;default:gs(f,h,s)}i=i.sibling}}function dd(t,i){var s=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(s=t.memoizedState.cachePool.pool),t=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(t=i.memoizedState.cachePool.pool),t!==s&&(t!=null&&t.refCount++,s!=null&&zl(s))}function pd(t,i){t=null,i.alternate!==null&&(t=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==t&&(i.refCount++,t!=null&&zl(t))}function Da(t,i,s,l){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)iv(t,i,s,l),i=i.sibling}function iv(t,i,s,l){var f=i.flags;switch(i.tag){case 0:case 11:case 15:Da(t,i,s,l),f&2048&&Ql(9,i);break;case 1:Da(t,i,s,l);break;case 3:Da(t,i,s,l),f&2048&&(t=null,i.alternate!==null&&(t=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==t&&(i.refCount++,t!=null&&zl(t)));break;case 12:if(f&2048){Da(t,i,s,l),t=i.stateNode;try{var h=i.memoizedProps,S=h.id,w=h.onPostCommit;typeof w=="function"&&w(S,i.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(V){mn(i,i.return,V)}}else Da(t,i,s,l);break;case 31:Da(t,i,s,l);break;case 13:Da(t,i,s,l);break;case 23:break;case 22:h=i.stateNode,S=i.alternate,i.memoizedState!==null?h._visibility&2?Da(t,i,s,l):$l(t,i):h._visibility&2?Da(t,i,s,l):(h._visibility|=2,Lo(t,i,s,l,(i.subtreeFlags&10256)!==0||!1)),f&2048&&dd(S,i);break;case 24:Da(t,i,s,l),f&2048&&pd(i.alternate,i);break;default:Da(t,i,s,l)}}function Lo(t,i,s,l,f){for(f=f&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var h=t,S=i,w=s,V=l,fe=S.flags;switch(S.tag){case 0:case 11:case 15:Lo(h,S,w,V,f),Ql(8,S);break;case 23:break;case 22:var be=S.stateNode;S.memoizedState!==null?be._visibility&2?Lo(h,S,w,V,f):$l(h,S):(be._visibility|=2,Lo(h,S,w,V,f)),f&&fe&2048&&dd(S.alternate,S);break;case 24:Lo(h,S,w,V,f),f&&fe&2048&&pd(S.alternate,S);break;default:Lo(h,S,w,V,f)}i=i.sibling}}function $l(t,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=t,l=i,f=l.flags;switch(l.tag){case 22:$l(s,l),f&2048&&dd(l.alternate,l);break;case 24:$l(s,l),f&2048&&pd(l.alternate,l);break;default:$l(s,l)}i=i.sibling}}var ec=8192;function Uo(t,i,s){if(t.subtreeFlags&ec)for(t=t.child;t!==null;)av(t,i,s),t=t.sibling}function av(t,i,s){switch(t.tag){case 26:Uo(t,i,s),t.flags&ec&&t.memoizedState!==null&&hM(s,Ca,t.memoizedState,t.memoizedProps);break;case 5:Uo(t,i,s);break;case 3:case 4:var l=Ca;Ca=Fu(t.stateNode.containerInfo),Uo(t,i,s),Ca=l;break;case 22:t.memoizedState===null&&(l=t.alternate,l!==null&&l.memoizedState!==null?(l=ec,ec=16777216,Uo(t,i,s),ec=l):Uo(t,i,s));break;default:Uo(t,i,s)}}function sv(t){var i=t.alternate;if(i!==null&&(t=i.child,t!==null)){i.child=null;do i=t.sibling,t.sibling=null,t=i;while(t!==null)}}function tc(t){var i=t.deletions;if((t.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];ui=l,ov(l,t)}sv(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)rv(t),t=t.sibling}function rv(t){switch(t.tag){case 0:case 11:case 15:tc(t),t.flags&2048&&Ks(9,t,t.return);break;case 3:tc(t);break;case 12:tc(t);break;case 22:var i=t.stateNode;t.memoizedState!==null&&i._visibility&2&&(t.return===null||t.return.tag!==13)?(i._visibility&=-3,bu(t)):tc(t);break;default:tc(t)}}function bu(t){var i=t.deletions;if((t.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];ui=l,ov(l,t)}sv(t)}for(t=t.child;t!==null;){switch(i=t,i.tag){case 0:case 11:case 15:Ks(8,i,i.return),bu(i);break;case 22:s=i.stateNode,s._visibility&2&&(s._visibility&=-3,bu(i));break;default:bu(i)}t=t.sibling}}function ov(t,i){for(;ui!==null;){var s=ui;switch(s.tag){case 0:case 11:case 15:Ks(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var l=s.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:zl(s.memoizedState.cache)}if(l=s.child,l!==null)l.return=s,ui=l;else e:for(s=t;ui!==null;){l=ui;var f=l.sibling,h=l.return;if(Q0(l),l===s){ui=null;break e}if(f!==null){f.return=h,ui=f;break e}ui=h}}}var wS={getCacheForType:function(t){var i=mi(Qn),s=i.data.get(t);return s===void 0&&(s=t(),i.data.set(t,s)),s},cacheSignal:function(){return mi(Qn).controller.signal}},RS=typeof WeakMap=="function"?WeakMap:Map,hn=0,Tn=null,qt=null,jt=0,pn=0,ea=null,Qs=!1,Oo=!1,md=!1,vs=0,Wn=0,Js=0,Xr=0,gd=0,ta=0,Po=0,nc=null,ki=null,vd=!1,Eu=0,lv=0,Tu=1/0,Au=null,$s=null,si=0,er=null,Fo=null,_s=0,_d=0,xd=null,cv=null,ic=0,yd=null;function na(){return(hn&2)!==0&&jt!==0?jt&-jt:H.T!==null?Ad():br()}function uv(){if(ta===0)if((jt&536870912)===0||Qt){var t=_t;_t<<=1,(_t&3932160)===0&&(_t=262144),ta=t}else ta=536870912;return t=Ji.current,t!==null&&(t.flags|=32),ta}function Vi(t,i,s){(t===Tn&&(pn===2||pn===9)||t.cancelPendingCommit!==null)&&(Bo(t,0),tr(t,jt,ta,!1)),Qe(t,s),((hn&2)===0||t!==Tn)&&(t===Tn&&((hn&2)===0&&(Xr|=s),Wn===4&&tr(t,jt,ta,!1)),qa(t))}function fv(t,i,s){if((hn&6)!==0)throw Error(a(327));var l=!s&&(i&127)===0&&(i&t.expiredLanes)===0||Fe(t,i),f=l?NS(t,i):Md(t,i,!0),h=l;do{if(f===0){Oo&&!l&&tr(t,i,0,!1);break}else{if(s=t.current.alternate,h&&!CS(s)){f=Md(t,i,!1),h=!1;continue}if(f===2){if(h=i,t.errorRecoveryDisabledLanes&h)var S=0;else S=t.pendingLanes&-536870913,S=S!==0?S:S&536870912?536870912:0;if(S!==0){i=S;e:{var w=t;f=nc;var V=w.current.memoizedState.isDehydrated;if(V&&(Bo(w,S).flags|=256),S=Md(w,S,!1),S!==2){if(md&&!V){w.errorRecoveryDisabledLanes|=h,Xr|=h,f=4;break e}h=ki,ki=f,h!==null&&(ki===null?ki=h:ki.push.apply(ki,h))}f=S}if(h=!1,f!==2)continue}}if(f===1){Bo(t,0),tr(t,i,0,!0);break}e:{switch(l=t,h=f,h){case 0:case 1:throw Error(a(345));case 4:if((i&4194048)!==i)break;case 6:tr(l,i,ta,!Qs);break e;case 2:ki=null;break;case 3:case 5:break;default:throw Error(a(329))}if((i&62914560)===i&&(f=Eu+300-nn(),10<f)){if(tr(l,i,ta,!Qs),Me(l,0,!0)!==0)break e;_s=i,l.timeoutHandle=kv(hv.bind(null,l,s,ki,Au,vd,i,ta,Xr,Po,Qs,h,"Throttled",-0,0),f);break e}hv(l,s,ki,Au,vd,i,ta,Xr,Po,Qs,h,null,-0,0)}}break}while(!0);qa(t)}function hv(t,i,s,l,f,h,S,w,V,fe,be,Te,pe,ge){if(t.timeoutHandle=-1,Te=i.subtreeFlags,Te&8192||(Te&16785408)===16785408){Te={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Kn},av(i,h,Te);var lt=(h&62914560)===h?Eu-nn():(h&4194048)===h?lv-nn():0;if(lt=dM(Te,lt),lt!==null){_s=h,t.cancelPendingCommit=lt(yv.bind(null,t,i,h,s,l,f,S,w,V,be,Te,null,pe,ge)),tr(t,h,S,!fe);return}}yv(t,i,h,s,l,f,S,w,V)}function CS(t){for(var i=t;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var l=0;l<s.length;l++){var f=s[l],h=f.getSnapshot;f=f.value;try{if(!Ti(h(),f))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function tr(t,i,s,l){i&=~gd,i&=~Xr,t.suspendedLanes|=i,t.pingedLanes&=~i,l&&(t.warmLanes|=i),l=t.expirationTimes;for(var f=i;0<f;){var h=31-$e(f),S=1<<h;l[h]=-1,f&=~S}s!==0&&on(t,s,i)}function wu(){return(hn&6)===0?(ac(0),!1):!0}function Sd(){if(qt!==null){if(pn===0)var t=qt.return;else t=qt,os=Pr=null,Bh(t),wo=null,Hl=0,t=qt;for(;t!==null;)V0(t.alternate,t),t=t.return;qt=null}}function Bo(t,i){var s=t.timeoutHandle;s!==-1&&(t.timeoutHandle=-1,ZS(s)),s=t.cancelPendingCommit,s!==null&&(t.cancelPendingCommit=null,s()),_s=0,Sd(),Tn=t,qt=s=ss(t.current,null),jt=i,pn=0,ea=null,Qs=!1,Oo=Fe(t,i),md=!1,Po=ta=gd=Xr=Js=Wn=0,ki=nc=null,vd=!1,(i&8)!==0&&(i|=i&32);var l=t.entangledLanes;if(l!==0)for(t=t.entanglements,l&=i;0<l;){var f=31-$e(l),h=1<<f;i|=t[f],l&=~h}return vs=i,jc(),s}function dv(t,i){Ut=null,H.H=jl,i===Ao||i===nu?(i=Cg(),pn=3):i===Th?(i=Cg(),pn=4):pn=i===$h?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,ea=i,qt===null&&(Wn=1,gu(t,pa(i,t.current)))}function pv(){var t=Ji.current;return t===null?!0:(jt&4194048)===jt?_a===null:(jt&62914560)===jt||(jt&536870912)!==0?t===_a:!1}function mv(){var t=H.H;return H.H=jl,t===null?jl:t}function gv(){var t=H.A;return H.A=wS,t}function Ru(){Wn=4,Qs||(jt&4194048)!==jt&&Ji.current!==null||(Oo=!0),(Js&134217727)===0&&(Xr&134217727)===0||Tn===null||tr(Tn,jt,ta,!1)}function Md(t,i,s){var l=hn;hn|=2;var f=mv(),h=gv();(Tn!==t||jt!==i)&&(Au=null,Bo(t,i)),i=!1;var S=Wn;e:do try{if(pn!==0&&qt!==null){var w=qt,V=ea;switch(pn){case 8:Sd(),S=6;break e;case 3:case 2:case 9:case 6:Ji.current===null&&(i=!0);var fe=pn;if(pn=0,ea=null,zo(t,w,V,fe),s&&Oo){S=0;break e}break;default:fe=pn,pn=0,ea=null,zo(t,w,V,fe)}}DS(),S=Wn;break}catch(be){dv(t,be)}while(!0);return i&&t.shellSuspendCounter++,os=Pr=null,hn=l,H.H=f,H.A=h,qt===null&&(Tn=null,jt=0,jc()),S}function DS(){for(;qt!==null;)vv(qt)}function NS(t,i){var s=hn;hn|=2;var l=mv(),f=gv();Tn!==t||jt!==i?(Au=null,Tu=nn()+500,Bo(t,i)):Oo=Fe(t,i);e:do try{if(pn!==0&&qt!==null){i=qt;var h=ea;t:switch(pn){case 1:pn=0,ea=null,zo(t,i,h,1);break;case 2:case 9:if(wg(h)){pn=0,ea=null,_v(i);break}i=function(){pn!==2&&pn!==9||Tn!==t||(pn=7),qa(t)},h.then(i,i);break e;case 3:pn=7;break e;case 4:pn=5;break e;case 7:wg(h)?(pn=0,ea=null,_v(i)):(pn=0,ea=null,zo(t,i,h,7));break;case 5:var S=null;switch(qt.tag){case 26:S=qt.memoizedState;case 5:case 27:var w=qt;if(S?i_(S):w.stateNode.complete){pn=0,ea=null;var V=w.sibling;if(V!==null)qt=V;else{var fe=w.return;fe!==null?(qt=fe,Cu(fe)):qt=null}break t}}pn=0,ea=null,zo(t,i,h,5);break;case 6:pn=0,ea=null,zo(t,i,h,6);break;case 8:Sd(),Wn=6;break e;default:throw Error(a(462))}}LS();break}catch(be){dv(t,be)}while(!0);return os=Pr=null,H.H=l,H.A=f,hn=s,qt!==null?0:(Tn=null,jt=0,jc(),Wn)}function LS(){for(;qt!==null&&!Un();)vv(qt)}function vv(t){var i=G0(t.alternate,t,vs);t.memoizedProps=t.pendingProps,i===null?Cu(t):qt=i}function _v(t){var i=t,s=i.alternate;switch(i.tag){case 15:case 0:i=P0(s,i,i.pendingProps,i.type,void 0,jt);break;case 11:i=P0(s,i,i.pendingProps,i.type.render,i.ref,jt);break;case 5:Bh(i);default:V0(s,i),i=qt=gg(i,vs),i=G0(s,i,vs)}t.memoizedProps=t.pendingProps,i===null?Cu(t):qt=i}function zo(t,i,s,l){os=Pr=null,Bh(i),wo=null,Hl=0;var f=i.return;try{if(yS(t,f,i,s,jt)){Wn=1,gu(t,pa(s,t.current)),qt=null;return}}catch(h){if(f!==null)throw qt=f,h;Wn=1,gu(t,pa(s,t.current)),qt=null;return}i.flags&32768?(Qt||l===1?t=!0:Oo||(jt&536870912)!==0?t=!1:(Qs=t=!0,(l===2||l===9||l===3||l===6)&&(l=Ji.current,l!==null&&l.tag===13&&(l.flags|=16384))),xv(i,t)):Cu(i)}function Cu(t){var i=t;do{if((i.flags&32768)!==0){xv(i,Qs);return}t=i.return;var s=bS(i.alternate,i,vs);if(s!==null){qt=s;return}if(i=i.sibling,i!==null){qt=i;return}qt=i=t}while(i!==null);Wn===0&&(Wn=5)}function xv(t,i){do{var s=ES(t.alternate,t);if(s!==null){s.flags&=32767,qt=s;return}if(s=t.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(t=t.sibling,t!==null)){qt=t;return}qt=t=s}while(t!==null);Wn=6,qt=null}function yv(t,i,s,l,f,h,S,w,V){t.cancelPendingCommit=null;do Du();while(si!==0);if((hn&6)!==0)throw Error(a(327));if(i!==null){if(i===t.current)throw Error(a(177));if(h=i.lanes|i.childLanes,h|=uh,Sn(t,s,h,S,w,V),t===Tn&&(qt=Tn=null,jt=0),Fo=i,er=t,_s=s,_d=h,xd=f,cv=l,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,FS($,function(){return Tv(),null})):(t.callbackNode=null,t.callbackPriority=0),l=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||l){l=H.T,H.T=null,f=k.p,k.p=2,S=hn,hn|=4;try{TS(t,i,s)}finally{hn=S,k.p=f,H.T=l}}si=1,Sv(),Mv(),bv()}}function Sv(){if(si===1){si=0;var t=er,i=Fo,s=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||s){s=H.T,H.T=null;var l=k.p;k.p=2;var f=hn;hn|=4;try{tv(i,t);var h=Od,S=ot(t.containerInfo),w=h.focusedElem,V=h.selectionRange;if(S!==w&&w&&w.ownerDocument&&yt(w.ownerDocument.documentElement,w)){if(V!==null&&St(w)){var fe=V.start,be=V.end;if(be===void 0&&(be=fe),"selectionStart"in w)w.selectionStart=fe,w.selectionEnd=Math.min(be,w.value.length);else{var Te=w.ownerDocument||document,pe=Te&&Te.defaultView||window;if(pe.getSelection){var ge=pe.getSelection(),lt=w.textContent.length,xt=Math.min(V.start,lt),xn=V.end===void 0?xt:Math.min(V.end,lt);!ge.extend&&xt>xn&&(S=xn,xn=xt,xt=S);var J=sn(w,xt),X=sn(w,xn);if(J&&X&&(ge.rangeCount!==1||ge.anchorNode!==J.node||ge.anchorOffset!==J.offset||ge.focusNode!==X.node||ge.focusOffset!==X.offset)){var ue=Te.createRange();ue.setStart(J.node,J.offset),ge.removeAllRanges(),xt>xn?(ge.addRange(ue),ge.extend(X.node,X.offset)):(ue.setEnd(X.node,X.offset),ge.addRange(ue))}}}}for(Te=[],ge=w;ge=ge.parentNode;)ge.nodeType===1&&Te.push({element:ge,left:ge.scrollLeft,top:ge.scrollTop});for(typeof w.focus=="function"&&w.focus(),w=0;w<Te.length;w++){var Ee=Te[w];Ee.element.scrollLeft=Ee.left,Ee.element.scrollTop=Ee.top}}ku=!!Ud,Od=Ud=null}finally{hn=f,k.p=l,H.T=s}}t.current=i,si=2}}function Mv(){if(si===2){si=0;var t=er,i=Fo,s=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||s){s=H.T,H.T=null;var l=k.p;k.p=2;var f=hn;hn|=4;try{K0(t,i.alternate,i)}finally{hn=f,k.p=l,H.T=s}}si=3}}function bv(){if(si===4||si===3){si=0,j();var t=er,i=Fo,s=_s,l=cv;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?si=5:(si=0,Fo=er=null,Ev(t,t.pendingLanes));var f=t.pendingLanes;if(f===0&&($s=null),Yi(s),i=i.stateNode,ye&&typeof ye.onCommitFiberRoot=="function")try{ye.onCommitFiberRoot(me,i,void 0,(i.current.flags&128)===128)}catch{}if(l!==null){i=H.T,f=k.p,k.p=2,H.T=null;try{for(var h=t.onRecoverableError,S=0;S<l.length;S++){var w=l[S];h(w.value,{componentStack:w.stack})}}finally{H.T=i,k.p=f}}(_s&3)!==0&&Du(),qa(t),f=t.pendingLanes,(s&261930)!==0&&(f&42)!==0?t===yd?ic++:(ic=0,yd=t):ic=0,ac(0)}}function Ev(t,i){(t.pooledCacheLanes&=i)===0&&(i=t.pooledCache,i!=null&&(t.pooledCache=null,zl(i)))}function Du(){return Sv(),Mv(),bv(),Tv()}function Tv(){if(si!==5)return!1;var t=er,i=_d;_d=0;var s=Yi(_s),l=H.T,f=k.p;try{k.p=32>s?32:s,H.T=null,s=xd,xd=null;var h=er,S=_s;if(si=0,Fo=er=null,_s=0,(hn&6)!==0)throw Error(a(331));var w=hn;if(hn|=4,rv(h.current),iv(h,h.current,S,s),hn=w,ac(0,!1),ye&&typeof ye.onPostCommitFiberRoot=="function")try{ye.onPostCommitFiberRoot(me,h)}catch{}return!0}finally{k.p=f,H.T=l,Ev(t,i)}}function Av(t,i,s){i=pa(s,i),i=Jh(t.stateNode,i,2),t=Ys(t,i,2),t!==null&&(Qe(t,2),qa(t))}function mn(t,i,s){if(t.tag===3)Av(t,t,s);else for(;i!==null;){if(i.tag===3){Av(i,t,s);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&($s===null||!$s.has(l))){t=pa(s,t),s=w0(2),l=Ys(i,s,2),l!==null&&(R0(s,l,i,t),Qe(l,2),qa(l));break}}i=i.return}}function bd(t,i,s){var l=t.pingCache;if(l===null){l=t.pingCache=new RS;var f=new Set;l.set(i,f)}else f=l.get(i),f===void 0&&(f=new Set,l.set(i,f));f.has(s)||(md=!0,f.add(s),t=US.bind(null,t,i,s),i.then(t,t))}function US(t,i,s){var l=t.pingCache;l!==null&&l.delete(i),t.pingedLanes|=t.suspendedLanes&s,t.warmLanes&=~s,Tn===t&&(jt&s)===s&&(Wn===4||Wn===3&&(jt&62914560)===jt&&300>nn()-Eu?(hn&2)===0&&Bo(t,0):gd|=s,Po===jt&&(Po=0)),qa(t)}function wv(t,i){i===0&&(i=we()),t=Lr(t,i),t!==null&&(Qe(t,i),qa(t))}function OS(t){var i=t.memoizedState,s=0;i!==null&&(s=i.retryLane),wv(t,s)}function PS(t,i){var s=0;switch(t.tag){case 31:case 13:var l=t.stateNode,f=t.memoizedState;f!==null&&(s=f.retryLane);break;case 19:l=t.stateNode;break;case 22:l=t.stateNode._retryCache;break;default:throw Error(a(314))}l!==null&&l.delete(i),wv(t,s)}function FS(t,i){return Hn(t,i)}var Nu=null,Io=null,Ed=!1,Lu=!1,Td=!1,nr=0;function qa(t){t!==Io&&t.next===null&&(Io===null?Nu=Io=t:Io=Io.next=t),Lu=!0,Ed||(Ed=!0,zS())}function ac(t,i){if(!Td&&Lu){Td=!0;do for(var s=!1,l=Nu;l!==null;){if(t!==0){var f=l.pendingLanes;if(f===0)var h=0;else{var S=l.suspendedLanes,w=l.pingedLanes;h=(1<<31-$e(42|t)+1)-1,h&=f&~(S&~w),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(s=!0,Nv(l,h))}else h=jt,h=Me(l,l===Tn?h:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(h&3)===0||Fe(l,h)||(s=!0,Nv(l,h));l=l.next}while(s);Td=!1}}function BS(){Rv()}function Rv(){Lu=Ed=!1;var t=0;nr!==0&&jS()&&(t=nr);for(var i=nn(),s=null,l=Nu;l!==null;){var f=l.next,h=Cv(l,i);h===0?(l.next=null,s===null?Nu=f:s.next=f,f===null&&(Io=s)):(s=l,(t!==0||(h&3)!==0)&&(Lu=!0)),l=f}si!==0&&si!==5||ac(t),nr!==0&&(nr=0)}function Cv(t,i){for(var s=t.suspendedLanes,l=t.pingedLanes,f=t.expirationTimes,h=t.pendingLanes&-62914561;0<h;){var S=31-$e(h),w=1<<S,V=f[S];V===-1?((w&s)===0||(w&l)!==0)&&(f[S]=We(w,i)):V<=i&&(t.expiredLanes|=w),h&=~w}if(i=Tn,s=jt,s=Me(t,t===i?s:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l=t.callbackNode,s===0||t===i&&(pn===2||pn===9)||t.cancelPendingCommit!==null)return l!==null&&l!==null&&dn(l),t.callbackNode=null,t.callbackPriority=0;if((s&3)===0||Fe(t,s)){if(i=s&-s,i===t.callbackPriority)return i;switch(l!==null&&dn(l),Yi(s)){case 2:case 8:s=b;break;case 32:s=$;break;case 268435456:s=ve;break;default:s=$}return l=Dv.bind(null,t),s=Hn(s,l),t.callbackPriority=i,t.callbackNode=s,i}return l!==null&&l!==null&&dn(l),t.callbackPriority=2,t.callbackNode=null,2}function Dv(t,i){if(si!==0&&si!==5)return t.callbackNode=null,t.callbackPriority=0,null;var s=t.callbackNode;if(Du()&&t.callbackNode!==s)return null;var l=jt;return l=Me(t,t===Tn?l:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l===0?null:(fv(t,l,i),Cv(t,nn()),t.callbackNode!=null&&t.callbackNode===s?Dv.bind(null,t):null)}function Nv(t,i){if(Du())return null;fv(t,i,!0)}function zS(){KS(function(){(hn&6)!==0?Hn(U,BS):Rv()})}function Ad(){if(nr===0){var t=Eo;t===0&&(t=pt,pt<<=1,(pt&261888)===0&&(pt=256)),nr=t}return nr}function Lv(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:bn(""+t)}function Uv(t,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,t.id&&s.setAttribute("form",t.id),i.parentNode.insertBefore(s,i),t=new FormData(t),s.parentNode.removeChild(s),t}function IS(t,i,s,l,f){if(i==="submit"&&s&&s.stateNode===f){var h=Lv((f[ni]||null).action),S=l.submitter;S&&(i=(i=S[ni]||null)?Lv(i.formAction):S.getAttribute("formAction"),i!==null&&(h=i,S=null));var w=new Bt("action","action",null,l,f);t.push({event:w,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(nr!==0){var V=S?Uv(f,S):new FormData(f);Wh(s,{pending:!0,data:V,method:f.method,action:h},null,V)}}else typeof h=="function"&&(w.preventDefault(),V=S?Uv(f,S):new FormData(f),Wh(s,{pending:!0,data:V,method:f.method,action:h},h,V))},currentTarget:f}]})}}for(var wd=0;wd<ch.length;wd++){var Rd=ch[wd],HS=Rd.toLowerCase(),GS=Rd[0].toUpperCase()+Rd.slice(1);Ra(HS,"on"+GS)}Ra(ug,"onAnimationEnd"),Ra(fg,"onAnimationIteration"),Ra(hg,"onAnimationStart"),Ra("dblclick","onDoubleClick"),Ra("focusin","onFocus"),Ra("focusout","onBlur"),Ra(iS,"onTransitionRun"),Ra(aS,"onTransitionStart"),Ra(sS,"onTransitionCancel"),Ra(dg,"onTransitionEnd"),ce("onMouseEnter",["mouseout","mouseover"]),ce("onMouseLeave",["mouseout","mouseover"]),ce("onPointerEnter",["pointerout","pointerover"]),ce("onPointerLeave",["pointerout","pointerover"]),W("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),W("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),W("onBeforeInput",["compositionend","keypress","textInput","paste"]),W("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),W("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),W("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var sc="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),kS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(sc));function Ov(t,i){i=(i&4)!==0;for(var s=0;s<t.length;s++){var l=t[s],f=l.event;l=l.listeners;e:{var h=void 0;if(i)for(var S=l.length-1;0<=S;S--){var w=l[S],V=w.instance,fe=w.currentTarget;if(w=w.listener,V!==h&&f.isPropagationStopped())break e;h=w,f.currentTarget=fe;try{h(f)}catch(be){Yc(be)}f.currentTarget=null,h=V}else for(S=0;S<l.length;S++){if(w=l[S],V=w.instance,fe=w.currentTarget,w=w.listener,V!==h&&f.isPropagationStopped())break e;h=w,f.currentTarget=fe;try{h(f)}catch(be){Yc(be)}f.currentTarget=null,h=V}}}}function Wt(t,i){var s=i[Aa];s===void 0&&(s=i[Aa]=new Set);var l=t+"__bubble";s.has(l)||(Pv(i,t,2,!1),s.add(l))}function Cd(t,i,s){var l=0;i&&(l|=4),Pv(s,t,l,i)}var Uu="_reactListening"+Math.random().toString(36).slice(2);function Dd(t){if(!t[Uu]){t[Uu]=!0,ii.forEach(function(s){s!=="selectionchange"&&(kS.has(s)||Cd(s,!1,t),Cd(s,!0,t))});var i=t.nodeType===9?t:t.ownerDocument;i===null||i[Uu]||(i[Uu]=!0,Cd("selectionchange",!1,i))}}function Pv(t,i,s,l){switch(u_(i)){case 2:var f=gM;break;case 8:f=vM;break;default:f=qd}s=f.bind(null,i,s,t),f=void 0,!Et||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(f=!0),l?f!==void 0?t.addEventListener(i,s,{capture:!0,passive:f}):t.addEventListener(i,s,!0):f!==void 0?t.addEventListener(i,s,{passive:f}):t.addEventListener(i,s,!1)}function Nd(t,i,s,l,f){var h=l;if((i&1)===0&&(i&2)===0&&l!==null)e:for(;;){if(l===null)return;var S=l.tag;if(S===3||S===4){var w=l.stateNode.containerInfo;if(w===f)break;if(S===4)for(S=l.return;S!==null;){var V=S.tag;if((V===3||V===4)&&S.stateNode.containerInfo===f)return;S=S.return}for(;w!==null;){if(S=An(w),S===null)return;if(V=S.tag,V===5||V===6||V===26||V===27){l=h=S;continue e}w=w.parentNode}}l=l.return}ua(function(){var fe=h,be=ci(s),Te=[];e:{var pe=pg.get(t);if(pe!==void 0){var ge=Bt,lt=t;switch(t){case"keypress":if(so(s)===0)break e;case"keydown":case"keyup":ge=Rl;break;case"focusin":lt="focus",ge=ns;break;case"focusout":lt="blur",ge=ns;break;case"beforeblur":case"afterblur":ge=ns;break;case"click":if(s.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ge=bl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ge=zi;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ge=Dl;break;case ug:case fg:case hg:ge=lo;break;case dg:ge=Nl;break;case"scroll":case"scrollend":ge=ro;break;case"wheel":ge=Vc;break;case"copy":case"cut":case"paste":ge=co;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ge=Cl;break;case"toggle":case"beforetoggle":ge=qc}var xt=(i&4)!==0,xn=!xt&&(t==="scroll"||t==="scrollend"),J=xt?pe!==null?pe+"Capture":null:pe;xt=[];for(var X=fe,ue;X!==null;){var Ee=X;if(ue=Ee.stateNode,Ee=Ee.tag,Ee!==5&&Ee!==26&&Ee!==27||ue===null||J===null||(Ee=es(X,J),Ee!=null&&xt.push(rc(X,Ee,ue))),xn)break;X=X.return}0<xt.length&&(pe=new ge(pe,lt,null,s,be),Te.push({event:pe,listeners:xt}))}}if((i&7)===0){e:{if(pe=t==="mouseover"||t==="pointerover",ge=t==="mouseout"||t==="pointerout",pe&&s!==Ns&&(lt=s.relatedTarget||s.fromElement)&&(An(lt)||lt[Si]))break e;if((ge||pe)&&(pe=be.window===be?be:(pe=be.ownerDocument)?pe.defaultView||pe.parentWindow:window,ge?(lt=s.relatedTarget||s.toElement,ge=fe,lt=lt?An(lt):null,lt!==null&&(xn=c(lt),xt=lt.tag,lt!==xn||xt!==5&&xt!==27&&xt!==6)&&(lt=null)):(ge=null,lt=fe),ge!==lt)){if(xt=bl,Ee="onMouseLeave",J="onMouseEnter",X="mouse",(t==="pointerout"||t==="pointerover")&&(xt=Cl,Ee="onPointerLeave",J="onPointerEnter",X="pointer"),xn=ge==null?pe:za(ge),ue=lt==null?pe:za(lt),pe=new xt(Ee,X+"leave",ge,s,be),pe.target=xn,pe.relatedTarget=ue,Ee=null,An(be)===fe&&(xt=new xt(J,X+"enter",lt,s,be),xt.target=ue,xt.relatedTarget=xn,Ee=xt),xn=Ee,ge&&lt)t:{for(xt=VS,J=ge,X=lt,ue=0,Ee=J;Ee;Ee=xt(Ee))ue++;Ee=0;for(var gt=X;gt;gt=xt(gt))Ee++;for(;0<ue-Ee;)J=xt(J),ue--;for(;0<Ee-ue;)X=xt(X),Ee--;for(;ue--;){if(J===X||X!==null&&J===X.alternate){xt=J;break t}J=xt(J),X=xt(X)}xt=null}else xt=null;ge!==null&&Fv(Te,pe,ge,xt,!1),lt!==null&&xn!==null&&Fv(Te,xn,lt,xt,!0)}}e:{if(pe=fe?za(fe):window,ge=pe.nodeName&&pe.nodeName.toLowerCase(),ge==="select"||ge==="input"&&pe.type==="file")var ln=Zi;else if(tt(pe))if(zn)ln=Ol;else{ln=wa;var ct=Ei}else ge=pe.nodeName,!ge||ge.toLowerCase()!=="input"||pe.type!=="checkbox"&&pe.type!=="radio"?fe&&it(fe.elementType)&&(ln=Zi):ln=as;if(ln&&(ln=ln(t,fe))){Nt(Te,ln,s,be);break e}ct&&ct(t,pe,fe),t==="focusout"&&fe&&pe.type==="number"&&fe.memoizedProps.value!=null&&et(pe,"number",pe.value)}switch(ct=fe?za(fe):window,t){case"focusin":(tt(ct)||ct.contentEditable==="true")&&(En=ct,Hs=fe,di=null);break;case"focusout":di=Hs=En=null;break;case"mousedown":Ga=!0;break;case"contextmenu":case"mouseup":case"dragend":Ga=!1,lg(Te,s,be);break;case"selectionchange":if(rn)break;case"keydown":case"keyup":lg(Te,s,be)}var Pt;if(mo)e:{switch(t){case"compositionstart":var Zt="onCompositionStart";break e;case"compositionend":Zt="onCompositionEnd";break e;case"compositionupdate":Zt="onCompositionUpdate";break e}Zt=void 0}else Be?Cr(t,s)&&(Zt="onCompositionEnd"):t==="keydown"&&s.keyCode===229&&(Zt="onCompositionStart");Zt&&(Fs&&s.locale!=="ko"&&(Be||Zt!=="onCompositionStart"?Zt==="onCompositionEnd"&&Be&&(Pt=Ic()):(ha=be,zc="value"in ha?ha.value:ha.textContent,Be=!0)),ct=Ou(fe,Zt),0<ct.length&&(Zt=new Al(Zt,t,null,s,be),Te.push({event:Zt,listeners:ct}),Pt?Zt.data=Pt:(Pt=se(s),Pt!==null&&(Zt.data=Pt)))),(Pt=Li?Ue(t,s):Le(t,s))&&(Zt=Ou(fe,"onBeforeInput"),0<Zt.length&&(ct=new Al("onBeforeInput","beforeinput",null,s,be),Te.push({event:ct,listeners:Zt}),ct.data=Pt)),IS(Te,t,fe,s,be)}Ov(Te,i)})}function rc(t,i,s){return{instance:t,listener:i,currentTarget:s}}function Ou(t,i){for(var s=i+"Capture",l=[];t!==null;){var f=t,h=f.stateNode;if(f=f.tag,f!==5&&f!==26&&f!==27||h===null||(f=es(t,s),f!=null&&l.unshift(rc(t,f,h)),f=es(t,i),f!=null&&l.push(rc(t,f,h))),t.tag===3)return l;t=t.return}return[]}function VS(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Fv(t,i,s,l,f){for(var h=i._reactName,S=[];s!==null&&s!==l;){var w=s,V=w.alternate,fe=w.stateNode;if(w=w.tag,V!==null&&V===l)break;w!==5&&w!==26&&w!==27||fe===null||(V=fe,f?(fe=es(s,h),fe!=null&&S.unshift(rc(s,fe,V))):f||(fe=es(s,h),fe!=null&&S.push(rc(s,fe,V)))),s=s.return}S.length!==0&&t.push({event:i,listeners:S})}var XS=/\r\n?/g,qS=/\u0000|\uFFFD/g;function Bv(t){return(typeof t=="string"?t:""+t).replace(XS,`
`).replace(qS,"")}function zv(t,i){return i=Bv(i),Bv(t)===i}function _n(t,i,s,l,f,h){switch(s){case"children":typeof l=="string"?i==="body"||i==="textarea"&&l===""||bt(t,l):(typeof l=="number"||typeof l=="bigint")&&i!=="body"&&bt(t,""+l);break;case"className":st(t,"class",l);break;case"tabIndex":st(t,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":st(t,s,l);break;case"style":Mn(t,l,h);break;case"data":if(i!=="object"){st(t,"data",l);break}case"src":case"href":if(l===""&&(i!=="a"||s!=="href")){t.removeAttribute(s);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(s);break}l=bn(""+l),t.setAttribute(s,l);break;case"action":case"formAction":if(typeof l=="function"){t.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(s==="formAction"?(i!=="input"&&_n(t,i,"name",f.name,f,null),_n(t,i,"formEncType",f.formEncType,f,null),_n(t,i,"formMethod",f.formMethod,f,null),_n(t,i,"formTarget",f.formTarget,f,null)):(_n(t,i,"encType",f.encType,f,null),_n(t,i,"method",f.method,f,null),_n(t,i,"target",f.target,f,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(s);break}l=bn(""+l),t.setAttribute(s,l);break;case"onClick":l!=null&&(t.onclick=Kn);break;case"onScroll":l!=null&&Wt("scroll",t);break;case"onScrollEnd":l!=null&&Wt("scrollend",t);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));t.innerHTML=s}}break;case"multiple":t.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":t.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){t.removeAttribute("xlink:href");break}s=bn(""+l),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(s,""+l):t.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(s,""):t.removeAttribute(s);break;case"capture":case"download":l===!0?t.setAttribute(s,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(s,l):t.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?t.setAttribute(s,l):t.removeAttribute(s);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?t.removeAttribute(s):t.setAttribute(s,l);break;case"popover":Wt("beforetoggle",t),Wt("toggle",t),Ve(t,"popover",l);break;case"xlinkActuate":rt(t,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":rt(t,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":rt(t,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":rt(t,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":rt(t,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":rt(t,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":rt(t,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":rt(t,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":rt(t,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":Ve(t,"is",l);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=Gn.get(s)||s,Ve(t,s,l))}}function Ld(t,i,s,l,f,h){switch(s){case"style":Mn(t,l,h);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));t.innerHTML=s}}break;case"children":typeof l=="string"?bt(t,l):(typeof l=="number"||typeof l=="bigint")&&bt(t,""+l);break;case"onScroll":l!=null&&Wt("scroll",t);break;case"onScrollEnd":l!=null&&Wt("scrollend",t);break;case"onClick":l!=null&&(t.onclick=Kn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!A.hasOwnProperty(s))e:{if(s[0]==="o"&&s[1]==="n"&&(f=s.endsWith("Capture"),i=s.slice(2,f?s.length-7:void 0),h=t[ni]||null,h=h!=null?h[s]:null,typeof h=="function"&&t.removeEventListener(i,h,f),typeof l=="function")){typeof h!="function"&&h!==null&&(s in t?t[s]=null:t.hasAttribute(s)&&t.removeAttribute(s)),t.addEventListener(i,l,f);break e}s in t?t[s]=l:l===!0?t.setAttribute(s,""):Ve(t,s,l)}}}function vi(t,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Wt("error",t),Wt("load",t);var l=!1,f=!1,h;for(h in s)if(s.hasOwnProperty(h)){var S=s[h];if(S!=null)switch(h){case"src":l=!0;break;case"srcSet":f=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:_n(t,i,h,S,s,null)}}f&&_n(t,i,"srcSet",s.srcSet,s,null),l&&_n(t,i,"src",s.src,s,null);return;case"input":Wt("invalid",t);var w=h=S=f=null,V=null,fe=null;for(l in s)if(s.hasOwnProperty(l)){var be=s[l];if(be!=null)switch(l){case"name":f=be;break;case"type":S=be;break;case"checked":V=be;break;case"defaultChecked":fe=be;break;case"value":h=be;break;case"defaultValue":w=be;break;case"children":case"dangerouslySetInnerHTML":if(be!=null)throw Error(a(137,i));break;default:_n(t,i,l,be,s,null)}}dt(t,h,w,V,fe,S,f,!1);return;case"select":Wt("invalid",t),l=S=h=null;for(f in s)if(s.hasOwnProperty(f)&&(w=s[f],w!=null))switch(f){case"value":h=w;break;case"defaultValue":S=w;break;case"multiple":l=w;default:_n(t,i,f,w,s,null)}i=h,s=S,t.multiple=!!l,i!=null?Je(t,!!l,i,!1):s!=null&&Je(t,!!l,s,!0);return;case"textarea":Wt("invalid",t),h=f=l=null;for(S in s)if(s.hasOwnProperty(S)&&(w=s[S],w!=null))switch(S){case"value":l=w;break;case"defaultValue":f=w;break;case"children":h=w;break;case"dangerouslySetInnerHTML":if(w!=null)throw Error(a(91));break;default:_n(t,i,S,w,s,null)}Gt(t,l,f,h);return;case"option":for(V in s)if(s.hasOwnProperty(V)&&(l=s[V],l!=null))switch(V){case"selected":t.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:_n(t,i,V,l,s,null)}return;case"dialog":Wt("beforetoggle",t),Wt("toggle",t),Wt("cancel",t),Wt("close",t);break;case"iframe":case"object":Wt("load",t);break;case"video":case"audio":for(l=0;l<sc.length;l++)Wt(sc[l],t);break;case"image":Wt("error",t),Wt("load",t);break;case"details":Wt("toggle",t);break;case"embed":case"source":case"link":Wt("error",t),Wt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(fe in s)if(s.hasOwnProperty(fe)&&(l=s[fe],l!=null))switch(fe){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:_n(t,i,fe,l,s,null)}return;default:if(it(i)){for(be in s)s.hasOwnProperty(be)&&(l=s[be],l!==void 0&&Ld(t,i,be,l,s,void 0));return}}for(w in s)s.hasOwnProperty(w)&&(l=s[w],l!=null&&_n(t,i,w,l,s,null))}function WS(t,i,s,l){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var f=null,h=null,S=null,w=null,V=null,fe=null,be=null;for(ge in s){var Te=s[ge];if(s.hasOwnProperty(ge)&&Te!=null)switch(ge){case"checked":break;case"value":break;case"defaultValue":V=Te;default:l.hasOwnProperty(ge)||_n(t,i,ge,null,l,Te)}}for(var pe in l){var ge=l[pe];if(Te=s[pe],l.hasOwnProperty(pe)&&(ge!=null||Te!=null))switch(pe){case"type":h=ge;break;case"name":f=ge;break;case"checked":fe=ge;break;case"defaultChecked":be=ge;break;case"value":S=ge;break;case"defaultValue":w=ge;break;case"children":case"dangerouslySetInnerHTML":if(ge!=null)throw Error(a(137,i));break;default:ge!==Te&&_n(t,i,pe,ge,l,Te)}}K(t,S,w,V,fe,be,h,f);return;case"select":ge=S=w=pe=null;for(h in s)if(V=s[h],s.hasOwnProperty(h)&&V!=null)switch(h){case"value":break;case"multiple":ge=V;default:l.hasOwnProperty(h)||_n(t,i,h,null,l,V)}for(f in l)if(h=l[f],V=s[f],l.hasOwnProperty(f)&&(h!=null||V!=null))switch(f){case"value":pe=h;break;case"defaultValue":w=h;break;case"multiple":S=h;default:h!==V&&_n(t,i,f,h,l,V)}i=w,s=S,l=ge,pe!=null?Je(t,!!s,pe,!1):!!l!=!!s&&(i!=null?Je(t,!!s,i,!0):Je(t,!!s,s?[]:"",!1));return;case"textarea":ge=pe=null;for(w in s)if(f=s[w],s.hasOwnProperty(w)&&f!=null&&!l.hasOwnProperty(w))switch(w){case"value":break;case"children":break;default:_n(t,i,w,null,l,f)}for(S in l)if(f=l[S],h=s[S],l.hasOwnProperty(S)&&(f!=null||h!=null))switch(S){case"value":pe=f;break;case"defaultValue":ge=f;break;case"children":break;case"dangerouslySetInnerHTML":if(f!=null)throw Error(a(91));break;default:f!==h&&_n(t,i,S,f,l,h)}un(t,pe,ge);return;case"option":for(var lt in s)if(pe=s[lt],s.hasOwnProperty(lt)&&pe!=null&&!l.hasOwnProperty(lt))switch(lt){case"selected":t.selected=!1;break;default:_n(t,i,lt,null,l,pe)}for(V in l)if(pe=l[V],ge=s[V],l.hasOwnProperty(V)&&pe!==ge&&(pe!=null||ge!=null))switch(V){case"selected":t.selected=pe&&typeof pe!="function"&&typeof pe!="symbol";break;default:_n(t,i,V,pe,l,ge)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var xt in s)pe=s[xt],s.hasOwnProperty(xt)&&pe!=null&&!l.hasOwnProperty(xt)&&_n(t,i,xt,null,l,pe);for(fe in l)if(pe=l[fe],ge=s[fe],l.hasOwnProperty(fe)&&pe!==ge&&(pe!=null||ge!=null))switch(fe){case"children":case"dangerouslySetInnerHTML":if(pe!=null)throw Error(a(137,i));break;default:_n(t,i,fe,pe,l,ge)}return;default:if(it(i)){for(var xn in s)pe=s[xn],s.hasOwnProperty(xn)&&pe!==void 0&&!l.hasOwnProperty(xn)&&Ld(t,i,xn,void 0,l,pe);for(be in l)pe=l[be],ge=s[be],!l.hasOwnProperty(be)||pe===ge||pe===void 0&&ge===void 0||Ld(t,i,be,pe,l,ge);return}}for(var J in s)pe=s[J],s.hasOwnProperty(J)&&pe!=null&&!l.hasOwnProperty(J)&&_n(t,i,J,null,l,pe);for(Te in l)pe=l[Te],ge=s[Te],!l.hasOwnProperty(Te)||pe===ge||pe==null&&ge==null||_n(t,i,Te,pe,l,ge)}function Iv(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function YS(){if(typeof performance.getEntriesByType=="function"){for(var t=0,i=0,s=performance.getEntriesByType("resource"),l=0;l<s.length;l++){var f=s[l],h=f.transferSize,S=f.initiatorType,w=f.duration;if(h&&w&&Iv(S)){for(S=0,w=f.responseEnd,l+=1;l<s.length;l++){var V=s[l],fe=V.startTime;if(fe>w)break;var be=V.transferSize,Te=V.initiatorType;be&&Iv(Te)&&(V=V.responseEnd,S+=be*(V<w?1:(w-fe)/(V-fe)))}if(--l,i+=8*(h+S)/(f.duration/1e3),t++,10<t)break}}if(0<t)return i/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Ud=null,Od=null;function Pu(t){return t.nodeType===9?t:t.ownerDocument}function Hv(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Gv(t,i){if(t===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&i==="foreignObject"?0:t}function Pd(t,i){return t==="textarea"||t==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Fd=null;function jS(){var t=window.event;return t&&t.type==="popstate"?t===Fd?!1:(Fd=t,!0):(Fd=null,!1)}var kv=typeof setTimeout=="function"?setTimeout:void 0,ZS=typeof clearTimeout=="function"?clearTimeout:void 0,Vv=typeof Promise=="function"?Promise:void 0,KS=typeof queueMicrotask=="function"?queueMicrotask:typeof Vv<"u"?function(t){return Vv.resolve(null).then(t).catch(QS)}:kv;function QS(t){setTimeout(function(){throw t})}function ir(t){return t==="head"}function Xv(t,i){var s=i,l=0;do{var f=s.nextSibling;if(t.removeChild(s),f&&f.nodeType===8)if(s=f.data,s==="/$"||s==="/&"){if(l===0){t.removeChild(f),Vo(i);return}l--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")l++;else if(s==="html")oc(t.ownerDocument.documentElement);else if(s==="head"){s=t.ownerDocument.head,oc(s);for(var h=s.firstChild;h;){var S=h.nextSibling,w=h.nodeName;h[ji]||w==="SCRIPT"||w==="STYLE"||w==="LINK"&&h.rel.toLowerCase()==="stylesheet"||s.removeChild(h),h=S}}else s==="body"&&oc(t.ownerDocument.body);s=f}while(s);Vo(i)}function qv(t,i){var s=t;t=0;do{var l=s.nextSibling;if(s.nodeType===1?i?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(i?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),l&&l.nodeType===8)if(s=l.data,s==="/$"){if(t===0)break;t--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||t++;s=l}while(s)}function Bd(t){var i=t.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":Bd(s),ca(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}t.removeChild(s)}}function JS(t,i,s,l){for(;t.nodeType===1;){var f=s;if(t.nodeName.toLowerCase()!==i.toLowerCase()){if(!l&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(l){if(!t[ji])switch(i){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(h=t.getAttribute("rel"),h==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(h!==f.rel||t.getAttribute("href")!==(f.href==null||f.href===""?null:f.href)||t.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin)||t.getAttribute("title")!==(f.title==null?null:f.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(h=t.getAttribute("src"),(h!==(f.src==null?null:f.src)||t.getAttribute("type")!==(f.type==null?null:f.type)||t.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin))&&h&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(i==="input"&&t.type==="hidden"){var h=f.name==null?null:""+f.name;if(f.type==="hidden"&&t.getAttribute("name")===h)return t}else return t;if(t=xa(t.nextSibling),t===null)break}return null}function $S(t,i,s){if(i==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!s||(t=xa(t.nextSibling),t===null))return null;return t}function Wv(t,i){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!i||(t=xa(t.nextSibling),t===null))return null;return t}function zd(t){return t.data==="$?"||t.data==="$~"}function Id(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function eM(t,i){var s=t.ownerDocument;if(t.data==="$~")t._reactRetry=i;else if(t.data!=="$?"||s.readyState!=="loading")i();else{var l=function(){i(),s.removeEventListener("DOMContentLoaded",l)};s.addEventListener("DOMContentLoaded",l),t._reactRetry=l}}function xa(t){for(;t!=null;t=t.nextSibling){var i=t.nodeType;if(i===1||i===3)break;if(i===8){if(i=t.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return t}var Hd=null;function Yv(t){t=t.nextSibling;for(var i=0;t;){if(t.nodeType===8){var s=t.data;if(s==="/$"||s==="/&"){if(i===0)return xa(t.nextSibling);i--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||i++}t=t.nextSibling}return null}function jv(t){t=t.previousSibling;for(var i=0;t;){if(t.nodeType===8){var s=t.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(i===0)return t;i--}else s!=="/$"&&s!=="/&"||i++}t=t.previousSibling}return null}function Zv(t,i,s){switch(i=Pu(s),t){case"html":if(t=i.documentElement,!t)throw Error(a(452));return t;case"head":if(t=i.head,!t)throw Error(a(453));return t;case"body":if(t=i.body,!t)throw Error(a(454));return t;default:throw Error(a(451))}}function oc(t){for(var i=t.attributes;i.length;)t.removeAttributeNode(i[0]);ca(t)}var ya=new Map,Kv=new Set;function Fu(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var xs=k.d;k.d={f:tM,r:nM,D:iM,C:aM,L:sM,m:rM,X:lM,S:oM,M:cM};function tM(){var t=xs.f(),i=wu();return t||i}function nM(t){var i=Bn(t);i!==null&&i.tag===5&&i.type==="form"?d0(i):xs.r(t)}var Ho=typeof document>"u"?null:document;function Qv(t,i,s){var l=Ho;if(l&&typeof i=="string"&&i){var f=Ne(i);f='link[rel="'+t+'"][href="'+f+'"]',typeof s=="string"&&(f+='[crossorigin="'+s+'"]'),Kv.has(f)||(Kv.add(f),t={rel:t,crossOrigin:s,href:i},l.querySelector(f)===null&&(i=l.createElement("link"),vi(i,"link",t),Tt(i),l.head.appendChild(i)))}}function iM(t){xs.D(t),Qv("dns-prefetch",t,null)}function aM(t,i){xs.C(t,i),Qv("preconnect",t,i)}function sM(t,i,s){xs.L(t,i,s);var l=Ho;if(l&&t&&i){var f='link[rel="preload"][as="'+Ne(i)+'"]';i==="image"&&s&&s.imageSrcSet?(f+='[imagesrcset="'+Ne(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(f+='[imagesizes="'+Ne(s.imageSizes)+'"]')):f+='[href="'+Ne(t)+'"]';var h=f;switch(i){case"style":h=Go(t);break;case"script":h=ko(t)}ya.has(h)||(t=_({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:t,as:i},s),ya.set(h,t),l.querySelector(f)!==null||i==="style"&&l.querySelector(lc(h))||i==="script"&&l.querySelector(cc(h))||(i=l.createElement("link"),vi(i,"link",t),Tt(i),l.head.appendChild(i)))}}function rM(t,i){xs.m(t,i);var s=Ho;if(s&&t){var l=i&&typeof i.as=="string"?i.as:"script",f='link[rel="modulepreload"][as="'+Ne(l)+'"][href="'+Ne(t)+'"]',h=f;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=ko(t)}if(!ya.has(h)&&(t=_({rel:"modulepreload",href:t},i),ya.set(h,t),s.querySelector(f)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(cc(h)))return}l=s.createElement("link"),vi(l,"link",t),Tt(l),s.head.appendChild(l)}}}function oM(t,i,s){xs.S(t,i,s);var l=Ho;if(l&&t){var f=Ht(l).hoistableStyles,h=Go(t);i=i||"default";var S=f.get(h);if(!S){var w={loading:0,preload:null};if(S=l.querySelector(lc(h)))w.loading=5;else{t=_({rel:"stylesheet",href:t,"data-precedence":i},s),(s=ya.get(h))&&Gd(t,s);var V=S=l.createElement("link");Tt(V),vi(V,"link",t),V._p=new Promise(function(fe,be){V.onload=fe,V.onerror=be}),V.addEventListener("load",function(){w.loading|=1}),V.addEventListener("error",function(){w.loading|=2}),w.loading|=4,Bu(S,i,l)}S={type:"stylesheet",instance:S,count:1,state:w},f.set(h,S)}}}function lM(t,i){xs.X(t,i);var s=Ho;if(s&&t){var l=Ht(s).hoistableScripts,f=ko(t),h=l.get(f);h||(h=s.querySelector(cc(f)),h||(t=_({src:t,async:!0},i),(i=ya.get(f))&&kd(t,i),h=s.createElement("script"),Tt(h),vi(h,"link",t),s.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},l.set(f,h))}}function cM(t,i){xs.M(t,i);var s=Ho;if(s&&t){var l=Ht(s).hoistableScripts,f=ko(t),h=l.get(f);h||(h=s.querySelector(cc(f)),h||(t=_({src:t,async:!0,type:"module"},i),(i=ya.get(f))&&kd(t,i),h=s.createElement("script"),Tt(h),vi(h,"link",t),s.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},l.set(f,h))}}function Jv(t,i,s,l){var f=(f=re.current)?Fu(f):null;if(!f)throw Error(a(446));switch(t){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=Go(s.href),s=Ht(f).hoistableStyles,l=s.get(i),l||(l={type:"style",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){t=Go(s.href);var h=Ht(f).hoistableStyles,S=h.get(t);if(S||(f=f.ownerDocument||f,S={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(t,S),(h=f.querySelector(lc(t)))&&!h._p&&(S.instance=h,S.state.loading=5),ya.has(t)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},ya.set(t,s),h||uM(f,t,s,S.state))),i&&l===null)throw Error(a(528,""));return S}if(i&&l!==null)throw Error(a(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=ko(s),s=Ht(f).hoistableScripts,l=s.get(i),l||(l={type:"script",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,t))}}function Go(t){return'href="'+Ne(t)+'"'}function lc(t){return'link[rel="stylesheet"]['+t+"]"}function $v(t){return _({},t,{"data-precedence":t.precedence,precedence:null})}function uM(t,i,s,l){t.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=t.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),vi(i,"link",s),Tt(i),t.head.appendChild(i))}function ko(t){return'[src="'+Ne(t)+'"]'}function cc(t){return"script[async]"+t}function e_(t,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var l=t.querySelector('style[data-href~="'+Ne(s.href)+'"]');if(l)return i.instance=l,Tt(l),l;var f=_({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return l=(t.ownerDocument||t).createElement("style"),Tt(l),vi(l,"style",f),Bu(l,s.precedence,t),i.instance=l;case"stylesheet":f=Go(s.href);var h=t.querySelector(lc(f));if(h)return i.state.loading|=4,i.instance=h,Tt(h),h;l=$v(s),(f=ya.get(f))&&Gd(l,f),h=(t.ownerDocument||t).createElement("link"),Tt(h);var S=h;return S._p=new Promise(function(w,V){S.onload=w,S.onerror=V}),vi(h,"link",l),i.state.loading|=4,Bu(h,s.precedence,t),i.instance=h;case"script":return h=ko(s.src),(f=t.querySelector(cc(h)))?(i.instance=f,Tt(f),f):(l=s,(f=ya.get(h))&&(l=_({},s),kd(l,f)),t=t.ownerDocument||t,f=t.createElement("script"),Tt(f),vi(f,"link",l),t.head.appendChild(f),i.instance=f);case"void":return null;default:throw Error(a(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(l=i.instance,i.state.loading|=4,Bu(l,s.precedence,t));return i.instance}function Bu(t,i,s){for(var l=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),f=l.length?l[l.length-1]:null,h=f,S=0;S<l.length;S++){var w=l[S];if(w.dataset.precedence===i)h=w;else if(h!==f)break}h?h.parentNode.insertBefore(t,h.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(t,i.firstChild))}function Gd(t,i){t.crossOrigin==null&&(t.crossOrigin=i.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=i.referrerPolicy),t.title==null&&(t.title=i.title)}function kd(t,i){t.crossOrigin==null&&(t.crossOrigin=i.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=i.referrerPolicy),t.integrity==null&&(t.integrity=i.integrity)}var zu=null;function t_(t,i,s){if(zu===null){var l=new Map,f=zu=new Map;f.set(s,l)}else f=zu,l=f.get(s),l||(l=new Map,f.set(s,l));if(l.has(t))return l;for(l.set(t,null),s=s.getElementsByTagName(t),f=0;f<s.length;f++){var h=s[f];if(!(h[ji]||h[Vn]||t==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var S=h.getAttribute(i)||"";S=t+S;var w=l.get(S);w?w.push(h):l.set(S,[h])}}return l}function n_(t,i,s){t=t.ownerDocument||t,t.head.insertBefore(s,i==="title"?t.querySelector("head > title"):null)}function fM(t,i,s){if(s===1||i.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return t=i.disabled,typeof i.precedence=="string"&&t==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function i_(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function hM(t,i,s,l){if(s.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var f=Go(l.href),h=i.querySelector(lc(f));if(h){i=h._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(t.count++,t=Iu.bind(t),i.then(t,t)),s.state.loading|=4,s.instance=h,Tt(h);return}h=i.ownerDocument||i,l=$v(l),(f=ya.get(f))&&Gd(l,f),h=h.createElement("link"),Tt(h);var S=h;S._p=new Promise(function(w,V){S.onload=w,S.onerror=V}),vi(h,"link",l),s.instance=h}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(s,i),(i=s.state.preload)&&(s.state.loading&3)===0&&(t.count++,s=Iu.bind(t),i.addEventListener("load",s),i.addEventListener("error",s))}}var Vd=0;function dM(t,i){return t.stylesheets&&t.count===0&&Gu(t,t.stylesheets),0<t.count||0<t.imgCount?function(s){var l=setTimeout(function(){if(t.stylesheets&&Gu(t,t.stylesheets),t.unsuspend){var h=t.unsuspend;t.unsuspend=null,h()}},6e4+i);0<t.imgBytes&&Vd===0&&(Vd=62500*YS());var f=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Gu(t,t.stylesheets),t.unsuspend)){var h=t.unsuspend;t.unsuspend=null,h()}},(t.imgBytes>Vd?50:800)+i);return t.unsuspend=s,function(){t.unsuspend=null,clearTimeout(l),clearTimeout(f)}}:null}function Iu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Gu(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Hu=null;function Gu(t,i){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Hu=new Map,i.forEach(pM,t),Hu=null,Iu.call(t))}function pM(t,i){if(!(i.state.loading&4)){var s=Hu.get(t);if(s)var l=s.get(null);else{s=new Map,Hu.set(t,s);for(var f=t.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<f.length;h++){var S=f[h];(S.nodeName==="LINK"||S.getAttribute("media")!=="not all")&&(s.set(S.dataset.precedence,S),l=S)}l&&s.set(null,l)}f=i.instance,S=f.getAttribute("data-precedence"),h=s.get(S)||l,h===l&&s.set(null,f),s.set(S,f),this.count++,l=Iu.bind(this),f.addEventListener("load",l),f.addEventListener("error",l),h?h.parentNode.insertBefore(f,h.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(f,t.firstChild)),i.state.loading|=4}}var uc={$$typeof:N,Provider:null,Consumer:null,_currentValue:te,_currentValue2:te,_threadCount:0};function mM(t,i,s,l,f,h,S,w,V){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=De(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=De(0),this.hiddenUpdates=De(null),this.identifierPrefix=l,this.onUncaughtError=f,this.onCaughtError=h,this.onRecoverableError=S,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=V,this.incompleteTransitions=new Map}function a_(t,i,s,l,f,h,S,w,V,fe,be,Te){return t=new mM(t,i,s,S,V,fe,be,Te,w),i=1,h===!0&&(i|=24),h=Qi(3,null,null,i),t.current=h,h.stateNode=t,i=Mh(),i.refCount++,t.pooledCache=i,i.refCount++,h.memoizedState={element:l,isDehydrated:s,cache:i},Ah(h),t}function s_(t){return t?(t=xo,t):xo}function r_(t,i,s,l,f,h){f=s_(f),l.context===null?l.context=f:l.pendingContext=f,l=Ws(i),l.payload={element:s},h=h===void 0?null:h,h!==null&&(l.callback=h),s=Ys(t,l,i),s!==null&&(Vi(s,t,i),kl(s,t,i))}function o_(t,i){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var s=t.retryLane;t.retryLane=s!==0&&s<i?s:i}}function Xd(t,i){o_(t,i),(t=t.alternate)&&o_(t,i)}function l_(t){if(t.tag===13||t.tag===31){var i=Lr(t,67108864);i!==null&&Vi(i,t,67108864),Xd(t,67108864)}}function c_(t){if(t.tag===13||t.tag===31){var i=na();i=Ds(i);var s=Lr(t,i);s!==null&&Vi(s,t,i),Xd(t,i)}}var ku=!0;function gM(t,i,s,l){var f=H.T;H.T=null;var h=k.p;try{k.p=2,qd(t,i,s,l)}finally{k.p=h,H.T=f}}function vM(t,i,s,l){var f=H.T;H.T=null;var h=k.p;try{k.p=8,qd(t,i,s,l)}finally{k.p=h,H.T=f}}function qd(t,i,s,l){if(ku){var f=Wd(l);if(f===null)Nd(t,i,l,Vu,s),f_(t,l);else if(xM(f,t,i,s,l))l.stopPropagation();else if(f_(t,l),i&4&&-1<_M.indexOf(t)){for(;f!==null;){var h=Bn(f);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var S=ze(h.pendingLanes);if(S!==0){var w=h;for(w.pendingLanes|=2,w.entangledLanes|=2;S;){var V=1<<31-$e(S);w.entanglements[1]|=V,S&=~V}qa(h),(hn&6)===0&&(Tu=nn()+500,ac(0))}}break;case 31:case 13:w=Lr(h,2),w!==null&&Vi(w,h,2),wu(),Xd(h,2)}if(h=Wd(l),h===null&&Nd(t,i,l,Vu,s),h===f)break;f=h}f!==null&&l.stopPropagation()}else Nd(t,i,l,null,s)}}function Wd(t){return t=ci(t),Yd(t)}var Vu=null;function Yd(t){if(Vu=null,t=An(t),t!==null){var i=c(t);if(i===null)t=null;else{var s=i.tag;if(s===13){if(t=u(i),t!==null)return t;t=null}else if(s===31){if(t=p(i),t!==null)return t;t=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;t=null}else i!==t&&(t=null)}}return Vu=t,null}function u_(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(an()){case U:return 2;case b:return 8;case $:case he:return 32;case ve:return 268435456;default:return 32}default:return 32}}var jd=!1,ar=null,sr=null,rr=null,fc=new Map,hc=new Map,or=[],_M="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function f_(t,i){switch(t){case"focusin":case"focusout":ar=null;break;case"dragenter":case"dragleave":sr=null;break;case"mouseover":case"mouseout":rr=null;break;case"pointerover":case"pointerout":fc.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":hc.delete(i.pointerId)}}function dc(t,i,s,l,f,h){return t===null||t.nativeEvent!==h?(t={blockedOn:i,domEventName:s,eventSystemFlags:l,nativeEvent:h,targetContainers:[f]},i!==null&&(i=Bn(i),i!==null&&l_(i)),t):(t.eventSystemFlags|=l,i=t.targetContainers,f!==null&&i.indexOf(f)===-1&&i.push(f),t)}function xM(t,i,s,l,f){switch(i){case"focusin":return ar=dc(ar,t,i,s,l,f),!0;case"dragenter":return sr=dc(sr,t,i,s,l,f),!0;case"mouseover":return rr=dc(rr,t,i,s,l,f),!0;case"pointerover":var h=f.pointerId;return fc.set(h,dc(fc.get(h)||null,t,i,s,l,f)),!0;case"gotpointercapture":return h=f.pointerId,hc.set(h,dc(hc.get(h)||null,t,i,s,l,f)),!0}return!1}function h_(t){var i=An(t.target);if(i!==null){var s=c(i);if(s!==null){if(i=s.tag,i===13){if(i=u(s),i!==null){t.blockedOn=i,Ta(t.priority,function(){c_(s)});return}}else if(i===31){if(i=p(s),i!==null){t.blockedOn=i,Ta(t.priority,function(){c_(s)});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){t.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Xu(t){if(t.blockedOn!==null)return!1;for(var i=t.targetContainers;0<i.length;){var s=Wd(t.nativeEvent);if(s===null){s=t.nativeEvent;var l=new s.constructor(s.type,s);Ns=l,s.target.dispatchEvent(l),Ns=null}else return i=Bn(s),i!==null&&l_(i),t.blockedOn=s,!1;i.shift()}return!0}function d_(t,i,s){Xu(t)&&s.delete(i)}function yM(){jd=!1,ar!==null&&Xu(ar)&&(ar=null),sr!==null&&Xu(sr)&&(sr=null),rr!==null&&Xu(rr)&&(rr=null),fc.forEach(d_),hc.forEach(d_)}function qu(t,i){t.blockedOn===i&&(t.blockedOn=null,jd||(jd=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,yM)))}var Wu=null;function p_(t){Wu!==t&&(Wu=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Wu===t&&(Wu=null);for(var i=0;i<t.length;i+=3){var s=t[i],l=t[i+1],f=t[i+2];if(typeof l!="function"){if(Yd(l||s)===null)continue;break}var h=Bn(s);h!==null&&(t.splice(i,3),i-=3,Wh(h,{pending:!0,data:f,method:s.method,action:l},l,f))}}))}function Vo(t){function i(V){return qu(V,t)}ar!==null&&qu(ar,t),sr!==null&&qu(sr,t),rr!==null&&qu(rr,t),fc.forEach(i),hc.forEach(i);for(var s=0;s<or.length;s++){var l=or[s];l.blockedOn===t&&(l.blockedOn=null)}for(;0<or.length&&(s=or[0],s.blockedOn===null);)h_(s),s.blockedOn===null&&or.shift();if(s=(t.ownerDocument||t).$$reactFormReplay,s!=null)for(l=0;l<s.length;l+=3){var f=s[l],h=s[l+1],S=f[ni]||null;if(typeof h=="function")S||p_(s);else if(S){var w=null;if(h&&h.hasAttribute("formAction")){if(f=h,S=h[ni]||null)w=S.formAction;else if(Yd(f)!==null)continue}else w=S.action;typeof w=="function"?s[l+1]=w:(s.splice(l,3),l-=3),p_(s)}}}function m_(){function t(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(S){return f=S})},focusReset:"manual",scroll:"manual"})}function i(){f!==null&&(f(),f=null),l||setTimeout(s,20)}function s(){if(!l&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,f=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(s,100),function(){l=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),f!==null&&(f(),f=null)}}}function Zd(t){this._internalRoot=t}Yu.prototype.render=Zd.prototype.render=function(t){var i=this._internalRoot;if(i===null)throw Error(a(409));var s=i.current,l=na();r_(s,l,t,i,null,null)},Yu.prototype.unmount=Zd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var i=t.containerInfo;r_(t.current,2,null,t,null,null),wu(),i[Si]=null}};function Yu(t){this._internalRoot=t}Yu.prototype.unstable_scheduleHydration=function(t){if(t){var i=br();t={blockedOn:null,target:t,priority:i};for(var s=0;s<or.length&&i!==0&&i<or[s].priority;s++);or.splice(s,0,t),s===0&&h_(t)}};var g_=e.version;if(g_!=="19.2.8")throw Error(a(527,g_,"19.2.8"));k.findDOMNode=function(t){var i=t._reactInternals;if(i===void 0)throw typeof t.render=="function"?Error(a(188)):(t=Object.keys(t).join(","),Error(a(268,t)));return t=d(i),t=t!==null?v(t):null,t=t===null?null:t.stateNode,t};var SM={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:H,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ju=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ju.isDisabled&&ju.supportsFiber)try{me=ju.inject(SM),ye=ju}catch{}}return mc.createRoot=function(t,i){if(!o(t))throw Error(a(299));var s=!1,l="",f=b0,h=E0,S=T0;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onUncaughtError!==void 0&&(f=i.onUncaughtError),i.onCaughtError!==void 0&&(h=i.onCaughtError),i.onRecoverableError!==void 0&&(S=i.onRecoverableError)),i=a_(t,1,!1,null,null,s,l,null,f,h,S,m_),t[Si]=i.current,Dd(t),new Zd(i)},mc.hydrateRoot=function(t,i,s){if(!o(t))throw Error(a(299));var l=!1,f="",h=b0,S=E0,w=T0,V=null;return s!=null&&(s.unstable_strictMode===!0&&(l=!0),s.identifierPrefix!==void 0&&(f=s.identifierPrefix),s.onUncaughtError!==void 0&&(h=s.onUncaughtError),s.onCaughtError!==void 0&&(S=s.onCaughtError),s.onRecoverableError!==void 0&&(w=s.onRecoverableError),s.formState!==void 0&&(V=s.formState)),i=a_(t,1,!0,i,s??null,l,f,V,h,S,w,m_),i.context=s_(null),s=i.current,l=na(),l=Ds(l),f=Ws(l),f.callback=null,Ys(s,f,l),s=l,i.current.lanes=s,Qe(i,s),qa(i),t[Si]=i.current,Dd(t),new Yu(i)},mc.version="19.2.8",mc}var A_;function UM(){if(A_)return Qd.exports;A_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Qd.exports=LM(),Qd.exports}var OM=UM(),Pe=km();const PM=2048,cr=24,w_=30,FM=16e3;class Zu{constructor(e,n){ie(this,"v",0);this.attack=e,this.release=n}push(e,n){const a=e>this.v?this.attack:this.release,o=1-Math.exp(-n/a);return this.v+=(e-this.v)*o,this.v}get value(){return this.v}}class BM{constructor(e){ie(this,"buf",[]);this.n=e}push(e){this.buf.push(e),this.buf.length>this.n&&this.buf.shift()}get mean(){if(!this.buf.length)return 0;let e=0;for(const n of this.buf)e+=n;return e/this.buf.length}get std(){const e=this.mean;if(this.buf.length<2)return 0;let n=0;for(const a of this.buf)n+=(a-e)*(a-e);return Math.sqrt(n/this.buf.length)}}class zM{constructor(e){ie(this,"node");ie(this,"freq");ie(this,"time");ie(this,"prevMag");ie(this,"bandEnv");ie(this,"bandEdges");ie(this,"fluxHistory",new BM(43));ie(this,"pulseEnv",new Zu(.001,.16));ie(this,"rmsEnv",new Zu(.01,.12));ie(this,"centroidEnv",new Zu(.08,.25));ie(this,"lastOnset",0);ie(this,"t",0);ie(this,"features",{bands:new Float32Array(cr),rms:0,crest:0,centroid:0,flux:0,onset:!1,pulse:0,sinceOnset:99,low:0,mid:0,high:0});ie(this,"onsets",[]);this.node=e.createAnalyser(),this.node.fftSize=PM,this.node.smoothingTimeConstant=0,this.node.minDecibels=-90,this.node.maxDecibels=-10;const n=this.node.frequencyBinCount;this.freq=new Uint8Array(n),this.time=new Float32Array(this.node.fftSize),this.prevMag=new Float32Array(n);const a=e.sampleRate/2;this.bandEdges=[];for(let o=0;o<=cr;o++){const c=w_*Math.pow(FM/w_,o/cr);this.bandEdges.push(Math.min(n-1,Math.round(c/a*n)))}this.bandEnv=Array.from({length:cr},(o,c)=>{const u=c/(cr-1);return new Zu(.004+u*.004,.22-u*.14)})}update(e){this.t+=e;const n=this.features;this.node.getByteFrequencyData(this.freq),this.node.getFloatTimeDomainData(this.time);let a=0,o=0;for(let g=0;g<this.time.length;g++){const M=this.time[g];a+=M*M;const E=Math.abs(M);E>o&&(o=E)}const c=Math.sqrt(a/this.time.length);n.rms=this.rmsEnv.push(Math.min(1,Math.pow(c*1.9,.62)),e),n.crest=c>1e-5?Math.min(8,o/c)/8:0;let u=0,p=0;for(let g=0;g<cr;g++){const M=this.bandEdges[g],E=Math.max(M+1,this.bandEdges[g+1]);let C=0;for(let x=M;x<E;x++)C+=this.freq[x];const y=C/(E-M)/255;n.bands[g]=this.bandEnv[g].push(y,e),u+=y*g,p+=y}const m=p>1e-4?u/p/(cr-1):0;n.centroid=this.centroidEnv.push(m,e),n.low=np(n.bands,0,6),n.mid=np(n.bands,6,15),n.high=np(n.bands,15,cr);let d=0;for(let g=0;g<this.freq.length;g++){const M=this.freq[g]/255,E=M-this.prevMag[g];E>0&&(d+=E),this.prevMag[g]=M}d/=this.freq.length,n.flux=d;const v=this.fluxHistory.mean+1.6*this.fluxHistory.std+.0015,_=this.t-this.lastOnset;return n.onset=d>v&&_>.11&&n.rms>.02,this.fluxHistory.push(d),n.onset&&(this.lastOnset=this.t,this.onsets.push(this.t),this.onsets.length>240&&this.onsets.shift()),n.sinceOnset=this.t-this.lastOnset,n.pulse=this.pulseEnv.push(n.onset?1:0,e),n}get now(){return this.t}}function np(r,e,n){let a=0;for(let o=e;o<n;o++)a+=r[o];return a/(n-e)}class IM{constructor(){ie(this,"ctx");ie(this,"analyser");ie(this,"el");ie(this,"gain");ie(this,"elSource",null);ie(this,"micSource",null);ie(this,"micStream",null);ie(this,"tabSource",null);ie(this,"tabStream",null);ie(this,"filter");ie(this,"eqLow");ie(this,"eqMid");ie(this,"eqHigh");ie(this,"sweepF");ie(this,"tierFs",[]);ie(this,"echoSend");ie(this,"echoDelay");ie(this,"echoFb");ie(this,"_rate",1);ie(this,"kind","radio");ie(this,"playlist",[]);ie(this,"index",0);ie(this,"onTrackChange",null);ie(this,"watchdog",0);ie(this,"pendingAnnounce",null);ie(this,"errStreak",0);ie(this,"uploadUrl",null);ie(this,"lastListenError",null);ie(this,"onTabAudioEnded",null);ie(this,"_echoT",-1);ie(this,"_volume",.8);ie(this,"_muted",!1);ie(this,"recDest",null);this.ctx=new AudioContext,this.analyser=new zM(this.ctx),this.gain=this.ctx.createGain(),this.gain.gain.value=.8,this.eqLow=this.ctx.createBiquadFilter(),this.eqLow.type="lowshelf",this.eqLow.frequency.value=220,this.eqMid=this.ctx.createBiquadFilter(),this.eqMid.type="peaking",this.eqMid.frequency.value=1200,this.eqMid.Q.value=.8,this.eqHigh=this.ctx.createBiquadFilter(),this.eqHigh.type="highshelf",this.eqHigh.frequency.value=4200,this.sweepF=this.ctx.createBiquadFilter(),this.sweepF.type="allpass",this.sweepF.frequency.value=800,this.sweepF.Q.value=.9,this.filter=this.ctx.createBiquadFilter(),this.filter.type="allpass",this.filter.frequency.value=1e3,this.filter.Q.value=1e-4,this.echoSend=this.ctx.createGain(),this.echoSend.gain.value=0,this.echoDelay=this.ctx.createDelay(2),this.echoDelay.delayTime.value=.42,this.echoFb=this.ctx.createGain(),this.echoFb.gain.value=0;let e=this.eqHigh;for(let n=0;n<6;n++){const a=this.ctx.createBiquadFilter();a.type="peaking",a.frequency.value=60*Math.pow(200,(n*4+2)/23),a.Q.value=1.1,a.gain.value=0,e.connect(a),e=a,this.tierFs.push(a)}this.eqLow.connect(this.eqMid),this.eqMid.connect(this.eqHigh),e.connect(this.sweepF),this.sweepF.connect(this.filter),this.filter.connect(this.analyser.node),this.filter.connect(this.echoSend),this.echoSend.connect(this.echoDelay),this.echoDelay.connect(this.echoFb),this.echoFb.connect(this.echoDelay),this.echoDelay.connect(this.analyser.node),this.el=new Audio,this.el.crossOrigin="anonymous",this.el.preload="auto",this.el.addEventListener("ended",()=>this.next()),this.el.addEventListener("loadstart",()=>{this.el.playbackRate=this._rate,this.el.preservesPitch=!1}),this.el.addEventListener("playing",()=>{var n;this.el.playbackRate=this._rate,this.watchdog++,this.errStreak=0,this.pendingAnnounce&&((n=this.onTrackChange)==null||n.call(this,this.pendingAnnounce),this.pendingAnnounce=null)}),this.el.addEventListener("error",()=>this.onElementError()),this.analyser.node.connect(this.gain),this.gain.connect(this.ctx.destination)}armWatchdog(){const e=++this.watchdog;setTimeout(()=>{if(e!==this.watchdog||this.kind!=="radio")return;this.el.readyState>=2&&isFinite(this.el.duration)&&!this.el.paused||this.onElementError()},5500)}onElementError(){var e,n;if(this.pendingAnnounce=null,this.kind==="file"){this.kind="radio",(e=this.onTrackChange)==null||e.call(this,{title:"file not playable",artist:"back to the radio",src:""}),setTimeout(()=>void this.playRadio(),1800);return}if(this.kind==="radio"){if(this.errStreak++,this.errStreak>3){(n=this.onTrackChange)==null||n.call(this,{title:"radio unavailable",artist:"drop a track anywhere",src:""});return}this.next()}}async unlock(){this.ctx.state==="suspended"&&await this.ctx.resume(),this.elSource||(this.elSource=this.ctx.createMediaElementSource(this.el),this.elSource.connect(this.eqLow))}setPlaylist(e){this.playlist=HM(e),this.index=0}get current(){return this.kind==="radio"?this.playlist[this.index]??null:null}async playRadio(){var n;await this.unlock(),this.stopMic(),this.stopTabAudio(),this.pendingAnnounce=null,this.kind="radio";const e=this.playlist[this.index];e&&(this.el.src.endsWith(e.src)||(this.el.src=e.src),this.armWatchdog(),await this.el.play().catch(()=>{}),(n=this.onTrackChange)==null||n.call(this,e))}async next(){var e;this.kind!=="radio"||!this.playlist.length||(this.pendingAnnounce=null,this.index=(this.index+1)%this.playlist.length,this.el.src=this.playlist[this.index].src,this.armWatchdog(),await this.el.play().catch(()=>{}),(e=this.onTrackChange)==null||e.call(this,this.playlist[this.index]))}async playFile(e){await this.unlock(),this.stopMic(),this.stopTabAudio(),this.kind="file",this.uploadUrl&&URL.revokeObjectURL(this.uploadUrl);const n=URL.createObjectURL(e);this.uploadUrl=n,this.el.src=n,this.pendingAnnounce={title:e.name.replace(/\.[^.]+$/,""),artist:"your upload",src:n},await this.el.play().catch(()=>{})}async useMic(){var n,a;await this.unlock(),this.pendingAnnounce=null;let e;try{e=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1}})}catch{(n=this.onTrackChange)==null||n.call(this,{title:"live input blocked",artist:"allow microphone access, then try again",src:""});return}this.el.pause(),this.stopMic(),this.stopTabAudio(),this.micStream=e,this.micSource=this.ctx.createMediaStreamSource(e),this.micSource.connect(this.eqLow),this.kind="mic",(a=this.onTrackChange)==null||a.call(this,{title:"live input",artist:"the room",src:""})}async useTabAudio(){var a;if(await this.unlock(),this.pendingAnnounce=null,this.lastListenError=null,!((a=navigator.mediaDevices)!=null&&a.getDisplayMedia))return this.lastListenError="tab audio needs chrome or edge",!1;let e;try{e=await navigator.mediaDevices.getDisplayMedia({video:{width:1,height:1},audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1},preferCurrentTab:!0})}catch{return this.lastListenError="share cancelled",!1}const n=e.getAudioTracks();return n.length?(this.stopTabAudio(),this.tabStream=e,this.tabSource=this.ctx.createMediaStreamSource(e),this.tabSource.connect(this.eqLow),this.gain.gain.value=0,this.kind="tube",n[0].addEventListener("ended",()=>{var o;this.kind==="tube"&&this.stopTabAudio(),(o=this.onTabAudioEnded)==null||o.call(this)}),!0):(e.getTracks().forEach(o=>o.stop()),this.lastListenError="no audio in that share. tick also share tab audio",!1)}enterTube(){var e;this.el.pause(),this.stopMic(),this.pendingAnnounce=null,this.kind="tube",(e=this.onTrackChange)==null||e.call(this,{title:"jukebox",artist:"youtube",src:""})}announce(e,n){var a;(a=this.onTrackChange)==null||a.call(this,{title:e,artist:n,src:""})}stopTabAudio(){var e,n;(e=this.tabSource)==null||e.disconnect(),this.tabSource=null,(n=this.tabStream)==null||n.getTracks().forEach(a=>a.stop()),this.tabStream=null,this.gain.gain.value=this._muted?0:this._volume}stopMic(){var e,n;(e=this.micSource)==null||e.disconnect(),this.micSource=null,(n=this.micStream)==null||n.getTracks().forEach(a=>a.stop()),this.micStream=null}set rate(e){this._rate=e,this.el.playbackRate=e,this.el.preservesPitch=!1}get rate(){return this._rate}get capturing(){return!!this.tabSource}get busHead(){return this.eqLow}enterStems(e){var n;this.el.pause(),this.stopMic(),this.stopTabAudio(),this.pendingAnnounce=null,this.kind="stems",(n=this.onTrackChange)==null||n.call(this,{title:e,artist:"stem deck",src:""})}eq(e,n){(e==="low"?this.eqLow:e==="mid"?this.eqMid:this.eqHigh).gain.setTargetAtTime(Math.max(-30,Math.min(10,n)),this.ctx.currentTime,.04)}setMuted(e){this.gain.gain.setTargetAtTime(e?0:1,this.ctx.currentTime,.02)}tierEq(e,n){const a=this.tierFs[e];a&&a.gain.setTargetAtTime(Math.max(-30,Math.min(10,n)),this.ctx.currentTime,.04)}setTierBands(e){const n=24/e;for(let a=0;a<6;a++){const o=this.tierFs[a];if(!o)continue;if(a>=e){o.gain.setTargetAtTime(0,this.ctx.currentTime,.02);continue}const c=a*n+n/2;o.frequency.value=60*Math.pow(200,c/23);const u=Math.pow(200,n/24);o.Q.value=1/(Math.sqrt(u)-1/Math.sqrt(u))}}sweep(e){const n=this.ctx.currentTime,a=Math.abs(e);if(a<.04){this.sweepF.type="allpass",this.sweepF.Q.setTargetAtTime(1e-4,n,.05);return}this.sweepF.Q.setTargetAtTime(.9,n,.05),e<0?(this.sweepF.type="highpass",this.sweepF.frequency.setTargetAtTime(30*Math.pow(100,a),n,.05)):(this.sweepF.type="lowpass",this.sweepF.frequency.setTargetAtTime(18e3*Math.pow(.01,a),n,.05))}echo(e){const n=this.ctx.currentTime,a=Math.max(0,Math.min(1,e));this.echoSend.gain.setTargetAtTime(a*.9,n,.06),this.echoFb.gain.setTargetAtTime(a*.72,n,.06)}setEchoTime(e){const n=Math.max(.05,Math.min(1.8,e));Math.abs(n-this._echoT)<.001||(this._echoT=n,this.echoDelay.delayTime.setTargetAtTime(n,this.ctx.currentTime,.1))}solo(e){const n=this.ctx.currentTime;e==null?(this.filter.type="allpass",this.filter.Q.setTargetAtTime(1e-4,n,.06)):(this.filter.type="bandpass",this.filter.frequency.setTargetAtTime(e,n,.06),this.filter.Q.setTargetAtTime(4.5,n,.06))}get playing(){return this.kind==="mic"?!!this.micStream:this.kind==="tube"?!!this.tabStream:!this.el.paused}toggle(){this.kind==="mic"||this.kind==="tube"||(this.el.paused?this.el.play().catch(()=>{}):this.el.pause())}set volume(e){this._volume=e,this._muted||(this.gain.gain.value=e)}get recordStream(){return this.recDest||(this.recDest=this.ctx.createMediaStreamDestination(),this.analyser.node.connect(this.recDest)),this.recDest.stream}get muted(){return this._muted}set muted(e){this._muted=e,this.gain.gain.value=e?0:this._volume}}function HM(r){const e=r.slice();for(let n=e.length-1;n>0;n--){const a=Math.floor(Math.random()*(n+1));[e[n],e[a]]=[e[a],e[n]]}return e}const GM=900;class kM{constructor(){ie(this,"brightnessH",[]);ie(this,"crestH",[]);ie(this,"rmsH",[]);ie(this,"densityEma",0);ie(this,"elapsed",0);ie(this,"value",{tempo:0,tempoConfidence:0,brightness:.5,punch:.5,density:.3,dynamics:.5,loudness:.5})}update(e,n,a,o){this.elapsed+=o,ip(this.brightnessH,e.centroid),ip(this.crestH,e.crest),ip(this.rmsH,e.rms);const c=this.value;c.brightness=Of(this.brightnessH),c.punch=Pf((Of(this.crestH)-.18)/.42),c.loudness=Of(this.rmsH),c.dynamics=Pf(XM(this.rmsH)/.18);const p=qM(n,a-8)/Math.min(8,Math.max(1,this.elapsed));this.densityEma+=(Pf(p/9)-this.densityEma)*Math.min(1,o*.4),c.density=this.densityEma;const m=VM(n,a);return c.tempo=m.bpm,c.tempoConfidence=m.confidence,c}}function VM(r,e){const a=[];for(let m=r.length-1;m>=0&&!(r[m]<e-12);m--)a.push(r[m]);if(a.length<8)return{bpm:0,confidence:0};a.reverse();const o=new Float32Array(181);let c=0;for(let m=0;m<a.length;m++)for(let d=m+1;d<Math.min(a.length,m+5);d++){const v=a[d]-a[m];if(v<.15||v>2.2)continue;let _=60/v;for(;_<70;)_*=2;for(;_>180;)_/=2;const g=Math.round(_);g<70||g>180||(o[g]+=1,o[g-1]+=.5,o[g+1]+=.5,c+=2)}if(!c)return{bpm:0,confidence:0};let u=0,p=0;for(let m=70;m<=180;m++)o[m]>p&&(p=o[m],u=m);return{bpm:u,confidence:Pf(p/c*6)}}function ip(r,e){r.push(e),r.length>GM&&r.shift()}function Of(r){if(!r.length)return 0;let e=0;for(const n of r)e+=n;return e/r.length}function XM(r){if(r.length<2)return 0;const e=Of(r);let n=0;for(const a of r)n+=(a-e)*(a-e);return Math.sqrt(n/r.length)}function qM(r,e){let n=0;for(let a=r.length-1;a>=0&&!(r[a]<e);a--)n++;return n}function Pf(r){return r<0?0:r>1?1:r}class WM{constructor(){ie(this,"phase",0);ie(this,"period",.75);ie(this,"locked",!1);ie(this,"lastTrigger",-9);ie(this,"pending",0);ie(this,"tick",0);ie(this,"value",{trigger:!1,strokeTrigger:!1,strength:.5,locked:!1,period:.75,strokePeriod:1.5})}update(e,n,a,o){const c=this.value;c.trigger=!1,c.strokeTrigger=!1,this.locked=n.tempoConfidence>.15&&n.tempo>0,this.locked&&(this.period=60/n.tempo),c.locked=this.locked,c.period=this.period;let u=1;for(;60/this.period/u>72;)u*=2;c.strokePeriod=this.period*u;const m=Math.min(.16,Math.max(.09,this.period*.3))/this.period;if(e.onset){const d=Math.min(1,e.flux*26*.6+e.low*.7);if(this.pending=Math.max(this.pending,d),this.locked){const v=YM(this.phase+m);Math.abs(v)<.3&&(this.phase-=v*.4)}else a-this.lastTrigger>.28&&(this.phase=1)}return this.phase+=o/this.period,this.phase>=1&&(this.phase-=Math.floor(this.phase),(this.locked||a-this.lastTrigger<=.28||this.pending>0)&&(c.trigger=!0,this.tick++,c.strokeTrigger=this.tick%Math.max(1,Math.round(c.strokePeriod/this.period))===0,c.strength=Math.max(this.pending,Math.min(1,e.rms*.9)),this.pending=0,this.lastTrigger=a)),c}}function YM(r){const e=(r%1+1)%1;return e>.5?e-1:e}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Vm="185",jM=0,R_=1,ZM=2,Ff=1,KM=2,Rc=3,Mr=0,Wi=1,As=2,Fa=0,rl=1,Ts=2,C_=3,D_=4,QM=5,Zr=100,JM=101,$M=102,eb=103,tb=104,nb=200,ib=201,ab=202,sb=203,Wp=204,Yp=205,rb=206,ob=207,lb=208,cb=209,ub=210,fb=211,hb=212,db=213,pb=214,jp=0,Zp=1,Kp=2,cl=3,Qp=4,Jp=5,$p=6,em=7,ty=0,mb=1,gb=2,Ka=0,ny=1,iy=2,ay=3,sy=4,ry=5,oy=6,ly=7,cy=300,eo=301,ul=302,ap=303,sp=304,nh=306,tm=1e3,sa=1001,nm=1002,Fn=1003,vb=1004,Ku=1005,Ci=1006,rp=1007,Qr=1008,Ea=1009,uy=1010,fy=1011,Nc=1012,Xm=1013,Qa=1014,qi=1015,Di=1016,qm=1017,Wm=1018,Lc=1020,hy=35902,dy=35899,py=1021,my=1022,Pi=1023,Cs=1026,Jr=1027,gy=1028,Ym=1029,to=1030,jm=1031,Zm=1033,Bf=33776,zf=33777,If=33778,Hf=33779,im=35840,am=35841,sm=35842,rm=35843,om=36196,lm=37492,cm=37496,um=37488,fm=37489,Vf=37490,hm=37491,dm=37808,pm=37809,mm=37810,gm=37811,vm=37812,_m=37813,xm=37814,ym=37815,Sm=37816,Mm=37817,bm=37818,Em=37819,Tm=37820,Am=37821,wm=36492,Rm=36494,Cm=36495,Dm=36283,Nm=36284,Xf=36285,Lm=36286,_b=3200,N_=0,xb=1,yr="",Ma="srgb",Uc="srgb-linear",qf="linear",gn="srgb",Xo=7680,L_=519,yb=512,Sb=513,Mb=514,Km=515,bb=516,Eb=517,Qm=518,Tb=519,U_=35044,O_="300 es",Za=2e3,Wf=2001;function Ab(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Yf(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function wb(){const r=Yf("canvas");return r.style.display="block",r}const P_={};function F_(...r){const e="THREE."+r.shift();console.log(e,...r)}function vy(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=r[1];n&&n.isStackTrace?r[0]+=" "+n.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Mt(...r){r=vy(r);const e="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...r)}}function tn(...r){r=vy(r);const e="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...r)}}function ol(...r){const e=r.join(" ");e in P_||(P_[e]=!0,Mt(...r))}function Rb(r,e,n){return new Promise(function(a,o){function c(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:o();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:a()}}setTimeout(c,n)})}const Cb={[jp]:Zp,[Kp]:$p,[Qp]:em,[cl]:Jp,[Zp]:jp,[$p]:Kp,[em]:Qp,[Jp]:cl};class io{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[e]===void 0&&(a[e]=[]),a[e].indexOf(n)===-1&&a[e].push(n)}hasEventListener(e,n){const a=this._listeners;return a===void 0?!1:a[e]!==void 0&&a[e].indexOf(n)!==-1}removeEventListener(e,n){const a=this._listeners;if(a===void 0)return;const o=a[e];if(o!==void 0){const c=o.indexOf(n);c!==-1&&o.splice(c,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const a=n[e.type];if(a!==void 0){e.target=this;const o=a.slice(0);for(let c=0,u=o.length;c<u;c++)o[c].call(this,e);e.target=null}}}const wi=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],op=Math.PI/180,Um=180/Math.PI;function Pc(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(wi[r&255]+wi[r>>8&255]+wi[r>>16&255]+wi[r>>24&255]+"-"+wi[e&255]+wi[e>>8&255]+"-"+wi[e>>16&15|64]+wi[e>>24&255]+"-"+wi[n&63|128]+wi[n>>8&255]+"-"+wi[n>>16&255]+wi[n>>24&255]+wi[a&255]+wi[a>>8&255]+wi[a>>16&255]+wi[a>>24&255]).toLowerCase()}function Jt(r,e,n){return Math.max(e,Math.min(n,r))}function Db(r,e){return(r%e+e)%e}function lp(r,e,n){return(1-n)*r+n*e}function gc(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Xi(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const ig=class ig{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,a=this.y,o=e.elements;return this.x=o[0]*n+o[3]*a+o[6],this.y=o[1]*n+o[4]*a+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Jt(this.x,e.x,n.x),this.y=Jt(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Jt(this.x,e,n),this.y=Jt(this.y,e,n),this}clampLength(e,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Jt(a,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(e)/n;return Math.acos(Jt(a,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,a=this.y-e.y;return n*n+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,a){return this.x=e.x+(n.x-e.x)*a,this.y=e.y+(n.y-e.y)*a,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const a=Math.cos(n),o=Math.sin(n),c=this.x-e.x,u=this.y-e.y;return this.x=c*a-u*o+e.x,this.y=c*o+u*a+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ig.prototype.isVector2=!0;let Dt=ig;class gl{constructor(e=0,n=0,a=0,o=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=a,this._w=o}static slerpFlat(e,n,a,o,c,u,p){let m=a[o+0],d=a[o+1],v=a[o+2],_=a[o+3],g=c[u+0],M=c[u+1],E=c[u+2],C=c[u+3];if(_!==C||m!==g||d!==M||v!==E){let y=m*g+d*M+v*E+_*C;y<0&&(g=-g,M=-M,E=-E,C=-C,y=-y);let x=1-p;if(y<.9995){const O=Math.acos(y),N=Math.sin(O);x=Math.sin(x*O)/N,p=Math.sin(p*O)/N,m=m*x+g*p,d=d*x+M*p,v=v*x+E*p,_=_*x+C*p}else{m=m*x+g*p,d=d*x+M*p,v=v*x+E*p,_=_*x+C*p;const O=1/Math.sqrt(m*m+d*d+v*v+_*_);m*=O,d*=O,v*=O,_*=O}}e[n]=m,e[n+1]=d,e[n+2]=v,e[n+3]=_}static multiplyQuaternionsFlat(e,n,a,o,c,u){const p=a[o],m=a[o+1],d=a[o+2],v=a[o+3],_=c[u],g=c[u+1],M=c[u+2],E=c[u+3];return e[n]=p*E+v*_+m*M-d*g,e[n+1]=m*E+v*g+d*_-p*M,e[n+2]=d*E+v*M+p*g-m*_,e[n+3]=v*E-p*_-m*g-d*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,a,o){return this._x=e,this._y=n,this._z=a,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const a=e._x,o=e._y,c=e._z,u=e._order,p=Math.cos,m=Math.sin,d=p(a/2),v=p(o/2),_=p(c/2),g=m(a/2),M=m(o/2),E=m(c/2);switch(u){case"XYZ":this._x=g*v*_+d*M*E,this._y=d*M*_-g*v*E,this._z=d*v*E+g*M*_,this._w=d*v*_-g*M*E;break;case"YXZ":this._x=g*v*_+d*M*E,this._y=d*M*_-g*v*E,this._z=d*v*E-g*M*_,this._w=d*v*_+g*M*E;break;case"ZXY":this._x=g*v*_-d*M*E,this._y=d*M*_+g*v*E,this._z=d*v*E+g*M*_,this._w=d*v*_-g*M*E;break;case"ZYX":this._x=g*v*_-d*M*E,this._y=d*M*_+g*v*E,this._z=d*v*E-g*M*_,this._w=d*v*_+g*M*E;break;case"YZX":this._x=g*v*_+d*M*E,this._y=d*M*_+g*v*E,this._z=d*v*E-g*M*_,this._w=d*v*_-g*M*E;break;case"XZY":this._x=g*v*_-d*M*E,this._y=d*M*_-g*v*E,this._z=d*v*E+g*M*_,this._w=d*v*_+g*M*E;break;default:Mt("Quaternion: .setFromEuler() encountered an unknown order: "+u)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const a=n/2,o=Math.sin(a);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,a=n[0],o=n[4],c=n[8],u=n[1],p=n[5],m=n[9],d=n[2],v=n[6],_=n[10],g=a+p+_;if(g>0){const M=.5/Math.sqrt(g+1);this._w=.25/M,this._x=(v-m)*M,this._y=(c-d)*M,this._z=(u-o)*M}else if(a>p&&a>_){const M=2*Math.sqrt(1+a-p-_);this._w=(v-m)/M,this._x=.25*M,this._y=(o+u)/M,this._z=(c+d)/M}else if(p>_){const M=2*Math.sqrt(1+p-a-_);this._w=(c-d)/M,this._x=(o+u)/M,this._y=.25*M,this._z=(m+v)/M}else{const M=2*Math.sqrt(1+_-a-p);this._w=(u-o)/M,this._x=(c+d)/M,this._y=(m+v)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let a=e.dot(n)+1;return a<1e-8?(a=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=a):(this._x=0,this._y=-e.z,this._z=e.y,this._w=a)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=a),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Jt(this.dot(e),-1,1)))}rotateTowards(e,n){const a=this.angleTo(e);if(a===0)return this;const o=Math.min(1,n/a);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const a=e._x,o=e._y,c=e._z,u=e._w,p=n._x,m=n._y,d=n._z,v=n._w;return this._x=a*v+u*p+o*d-c*m,this._y=o*v+u*m+c*p-a*d,this._z=c*v+u*d+a*m-o*p,this._w=u*v-a*p-o*m-c*d,this._onChangeCallback(),this}slerp(e,n){let a=e._x,o=e._y,c=e._z,u=e._w,p=this.dot(e);p<0&&(a=-a,o=-o,c=-c,u=-u,p=-p);let m=1-n;if(p<.9995){const d=Math.acos(p),v=Math.sin(d);m=Math.sin(m*d)/v,n=Math.sin(n*d)/v,this._x=this._x*m+a*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+u*n,this._onChangeCallback()}else this._x=this._x*m+a*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+u*n,this.normalize();return this}slerpQuaternions(e,n,a){return this.copy(e).slerp(n,a)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),a=Math.random(),o=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(o*Math.sin(e),o*Math.cos(e),c*Math.sin(n),c*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const ag=class ag{constructor(e=0,n=0,a=0){this.x=e,this.y=n,this.z=a}set(e,n,a){return a===void 0&&(a=this.z),this.x=e,this.y=n,this.z=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(B_.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(B_.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,a=this.y,o=this.z,c=e.elements;return this.x=c[0]*n+c[3]*a+c[6]*o,this.y=c[1]*n+c[4]*a+c[7]*o,this.z=c[2]*n+c[5]*a+c[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,a=this.y,o=this.z,c=e.elements,u=1/(c[3]*n+c[7]*a+c[11]*o+c[15]);return this.x=(c[0]*n+c[4]*a+c[8]*o+c[12])*u,this.y=(c[1]*n+c[5]*a+c[9]*o+c[13])*u,this.z=(c[2]*n+c[6]*a+c[10]*o+c[14])*u,this}applyQuaternion(e){const n=this.x,a=this.y,o=this.z,c=e.x,u=e.y,p=e.z,m=e.w,d=2*(u*o-p*a),v=2*(p*n-c*o),_=2*(c*a-u*n);return this.x=n+m*d+u*_-p*v,this.y=a+m*v+p*d-c*_,this.z=o+m*_+c*v-u*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,a=this.y,o=this.z,c=e.elements;return this.x=c[0]*n+c[4]*a+c[8]*o,this.y=c[1]*n+c[5]*a+c[9]*o,this.z=c[2]*n+c[6]*a+c[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Jt(this.x,e.x,n.x),this.y=Jt(this.y,e.y,n.y),this.z=Jt(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Jt(this.x,e,n),this.y=Jt(this.y,e,n),this.z=Jt(this.z,e,n),this}clampLength(e,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Jt(a,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,a){return this.x=e.x+(n.x-e.x)*a,this.y=e.y+(n.y-e.y)*a,this.z=e.z+(n.z-e.z)*a,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const a=e.x,o=e.y,c=e.z,u=n.x,p=n.y,m=n.z;return this.x=o*m-c*p,this.y=c*u-a*m,this.z=a*p-o*u,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const a=e.dot(this)/n;return this.copy(e).multiplyScalar(a)}projectOnPlane(e){return cp.copy(this).projectOnVector(e),this.sub(cp)}reflect(e){return this.sub(cp.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(e)/n;return Math.acos(Jt(a,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,a=this.y-e.y,o=this.z-e.z;return n*n+a*a+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,a){const o=Math.sin(n)*e;return this.x=o*Math.sin(a),this.y=Math.cos(n)*e,this.z=o*Math.cos(a),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,a){return this.x=e*Math.sin(n),this.y=a,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),a=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=a,this.z=o,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,a=Math.sqrt(1-n*n);return this.x=a*Math.cos(e),this.y=n,this.z=a*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ag.prototype.isVector3=!0;let ee=ag;const cp=new ee,B_=new gl,sg=class sg{constructor(e,n,a,o,c,u,p,m,d){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,a,o,c,u,p,m,d)}set(e,n,a,o,c,u,p,m,d){const v=this.elements;return v[0]=e,v[1]=o,v[2]=p,v[3]=n,v[4]=c,v[5]=m,v[6]=a,v[7]=u,v[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,a=e.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(e,n,a){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const a=e.elements,o=n.elements,c=this.elements,u=a[0],p=a[3],m=a[6],d=a[1],v=a[4],_=a[7],g=a[2],M=a[5],E=a[8],C=o[0],y=o[3],x=o[6],O=o[1],N=o[4],R=o[7],I=o[2],L=o[5],z=o[8];return c[0]=u*C+p*O+m*I,c[3]=u*y+p*N+m*L,c[6]=u*x+p*R+m*z,c[1]=d*C+v*O+_*I,c[4]=d*y+v*N+_*L,c[7]=d*x+v*R+_*z,c[2]=g*C+M*O+E*I,c[5]=g*y+M*N+E*L,c[8]=g*x+M*R+E*z,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],a=e[1],o=e[2],c=e[3],u=e[4],p=e[5],m=e[6],d=e[7],v=e[8];return n*u*v-n*p*d-a*c*v+a*p*m+o*c*d-o*u*m}invert(){const e=this.elements,n=e[0],a=e[1],o=e[2],c=e[3],u=e[4],p=e[5],m=e[6],d=e[7],v=e[8],_=v*u-p*d,g=p*m-v*c,M=d*c-u*m,E=n*_+a*g+o*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const C=1/E;return e[0]=_*C,e[1]=(o*d-v*a)*C,e[2]=(p*a-o*u)*C,e[3]=g*C,e[4]=(v*n-o*m)*C,e[5]=(o*c-p*n)*C,e[6]=M*C,e[7]=(a*m-d*n)*C,e[8]=(u*n-a*c)*C,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,a,o,c,u,p){const m=Math.cos(c),d=Math.sin(c);return this.set(a*m,a*d,-a*(m*u+d*p)+u+e,-o*d,o*m,-o*(-d*u+m*p)+p+n,0,0,1),this}scale(e,n){return ol("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(up.makeScale(e,n)),this}rotate(e){return ol("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(up.makeRotation(-e)),this}translate(e,n){return ol("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(up.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),a=Math.sin(e);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,a=e.elements;for(let o=0;o<9;o++)if(n[o]!==a[o])return!1;return!0}fromArray(e,n=0){for(let a=0;a<9;a++)this.elements[a]=e[a+n];return this}toArray(e=[],n=0){const a=this.elements;return e[n]=a[0],e[n+1]=a[1],e[n+2]=a[2],e[n+3]=a[3],e[n+4]=a[4],e[n+5]=a[5],e[n+6]=a[6],e[n+7]=a[7],e[n+8]=a[8],e}clone(){return new this.constructor().fromArray(this.elements)}};sg.prototype.isMatrix3=!0;let Ct=sg;const up=new Ct,z_=new Ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),I_=new Ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Nb(){const r={enabled:!0,workingColorSpace:Uc,spaces:{},convert:function(o,c,u){return this.enabled===!1||c===u||!c||!u||(this.spaces[c].transfer===gn&&(o.r=Rs(o.r),o.g=Rs(o.g),o.b=Rs(o.b)),this.spaces[c].primaries!==this.spaces[u].primaries&&(o.applyMatrix3(this.spaces[c].toXYZ),o.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===gn&&(o.r=ll(o.r),o.g=ll(o.g),o.b=ll(o.b))),o},workingToColorSpace:function(o,c){return this.convert(o,this.workingColorSpace,c)},colorSpaceToWorking:function(o,c){return this.convert(o,c,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===yr?qf:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,c=this.workingColorSpace){return o.fromArray(this.spaces[c].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,c,u){return o.copy(this.spaces[c].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,c){return ol("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(o,c)},toWorkingColorSpace:function(o,c){return ol("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(o,c)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],a=[.3127,.329];return r.define({[Uc]:{primaries:e,whitePoint:a,transfer:qf,toXYZ:z_,fromXYZ:I_,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ma},outputColorSpaceConfig:{drawingBufferColorSpace:Ma}},[Ma]:{primaries:e,whitePoint:a,transfer:gn,toXYZ:z_,fromXYZ:I_,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ma}}}),r}const Kt=Nb();function Rs(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ll(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let qo;class Lb{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let a;if(e instanceof HTMLCanvasElement)a=e;else{qo===void 0&&(qo=Yf("canvas")),qo.width=e.width,qo.height=e.height;const o=qo.getContext("2d");e instanceof ImageData?o.putImageData(e,0,0):o.drawImage(e,0,0,e.width,e.height),a=qo}return a.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Yf("canvas");n.width=e.width,n.height=e.height;const a=n.getContext("2d");a.drawImage(e,0,0,e.width,e.height);const o=a.getImageData(0,0,e.width,e.height),c=o.data;for(let u=0;u<c.length;u++)c[u]=Rs(c[u]/255)*255;return a.putImageData(o,0,0),n}else if(e.data){const n=e.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(Rs(n[a]/255)*255):n[a]=Rs(n[a]);return{data:n,width:e.width,height:e.height}}else return Mt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ub=0;class Jm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ub++}),this.uuid=Pc(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const a={uuid:this.uuid,url:""},o=this.data;if(o!==null){let c;if(Array.isArray(o)){c=[];for(let u=0,p=o.length;u<p;u++)o[u].isDataTexture?c.push(fp(o[u].image)):c.push(fp(o[u]))}else c=fp(o);a.url=c}return n||(e.images[this.uuid]=a),a}}function fp(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Lb.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Mt("Texture: Unable to serialize Texture."),{})}let Ob=0;const hp=new ee;class Fi extends io{constructor(e=Fi.DEFAULT_IMAGE,n=Fi.DEFAULT_MAPPING,a=sa,o=sa,c=Ci,u=Qr,p=Pi,m=Ea,d=Fi.DEFAULT_ANISOTROPY,v=yr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ob++}),this.uuid=Pc(),this.name="",this.source=new Jm(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=o,this.magFilter=c,this.minFilter=u,this.anisotropy=d,this.format=p,this.internalFormat=null,this.type=m,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(hp).x}get height(){return this.source.getSize(hp).y}get depth(){return this.source.getSize(hp).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const a=e[n];if(a===void 0){Mt(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){Mt(`Texture.setValues(): property '${n}' does not exist.`);continue}o&&a&&o.isVector2&&a.isVector2||o&&a&&o.isVector3&&a.isVector3||o&&a&&o.isMatrix3&&a.isMatrix3?o.copy(a):this[n]=a}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const a={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(e.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==cy)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case tm:e.x=e.x-Math.floor(e.x);break;case sa:e.x=e.x<0?0:1;break;case nm:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case tm:e.y=e.y-Math.floor(e.y);break;case sa:e.y=e.y<0?0:1;break;case nm:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Fi.DEFAULT_IMAGE=null;Fi.DEFAULT_MAPPING=cy;Fi.DEFAULT_ANISOTROPY=1;const rg=class rg{constructor(e=0,n=0,a=0,o=1){this.x=e,this.y=n,this.z=a,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,a,o){return this.x=e,this.y=n,this.z=a,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,a=this.y,o=this.z,c=this.w,u=e.elements;return this.x=u[0]*n+u[4]*a+u[8]*o+u[12]*c,this.y=u[1]*n+u[5]*a+u[9]*o+u[13]*c,this.z=u[2]*n+u[6]*a+u[10]*o+u[14]*c,this.w=u[3]*n+u[7]*a+u[11]*o+u[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,a,o,c;const m=e.elements,d=m[0],v=m[4],_=m[8],g=m[1],M=m[5],E=m[9],C=m[2],y=m[6],x=m[10];if(Math.abs(v-g)<.01&&Math.abs(_-C)<.01&&Math.abs(E-y)<.01){if(Math.abs(v+g)<.1&&Math.abs(_+C)<.1&&Math.abs(E+y)<.1&&Math.abs(d+M+x-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const N=(d+1)/2,R=(M+1)/2,I=(x+1)/2,L=(v+g)/4,z=(_+C)/4,T=(E+y)/4;return N>R&&N>I?N<.01?(a=0,o=.707106781,c=.707106781):(a=Math.sqrt(N),o=L/a,c=z/a):R>I?R<.01?(a=.707106781,o=0,c=.707106781):(o=Math.sqrt(R),a=L/o,c=T/o):I<.01?(a=.707106781,o=.707106781,c=0):(c=Math.sqrt(I),a=z/c,o=T/c),this.set(a,o,c,n),this}let O=Math.sqrt((y-E)*(y-E)+(_-C)*(_-C)+(g-v)*(g-v));return Math.abs(O)<.001&&(O=1),this.x=(y-E)/O,this.y=(_-C)/O,this.z=(g-v)/O,this.w=Math.acos((d+M+x-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Jt(this.x,e.x,n.x),this.y=Jt(this.y,e.y,n.y),this.z=Jt(this.z,e.z,n.z),this.w=Jt(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Jt(this.x,e,n),this.y=Jt(this.y,e,n),this.z=Jt(this.z,e,n),this.w=Jt(this.w,e,n),this}clampLength(e,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Jt(a,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,a){return this.x=e.x+(n.x-e.x)*a,this.y=e.y+(n.y-e.y)*a,this.z=e.z+(n.z-e.z)*a,this.w=e.w+(n.w-e.w)*a,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};rg.prototype.isVector4=!0;let Yn=rg;class Pb extends io{constructor(e=1,n=1,a={}){super(),a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ci,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},a),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=a.depth,this.scissor=new Yn(0,0,e,n),this.scissorTest=!1,this.viewport=new Yn(0,0,e,n),this.textures=[];const o={width:e,height:n,depth:a.depth},c=new Fi(o),u=a.count;for(let p=0;p<u;p++)this.textures[p]=c.clone(),this.textures[p].isRenderTargetTexture=!0,this.textures[p].renderTarget=this;this._setTextureOptions(a),this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=a.depthTexture,this.samples=a.samples,this.multiview=a.multiview,this.useArrayDepthTexture=a.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:Ci,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let a=0;a<this.textures.length;a++)this.textures[a].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,a=1){if(this.width!==e||this.height!==n||this.depth!==a){this.width=e,this.height=n,this.depth=a;for(let o=0,c=this.textures.length;o<c;o++)this.textures[o].image.width=e,this.textures[o].image.height=n,this.textures[o].image.depth=a,this.textures[o].isData3DTexture!==!0&&(this.textures[o].isArrayTexture=this.textures[o].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,a=e.textures.length;n<a;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const o=Object.assign({},e.textures[n].image);this.textures[n].source=new Jm(o)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _i extends Pb{constructor(e=1,n=1,a={}){super(e,n,a),this.isWebGLRenderTarget=!0}}class _y extends Fi{constructor(e=null,n=1,a=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:a,depth:o},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=sa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Fb extends Fi{constructor(e=null,n=1,a=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:a,depth:o},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=sa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const th=class th{constructor(e,n,a,o,c,u,p,m,d,v,_,g,M,E,C,y){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,a,o,c,u,p,m,d,v,_,g,M,E,C,y)}set(e,n,a,o,c,u,p,m,d,v,_,g,M,E,C,y){const x=this.elements;return x[0]=e,x[4]=n,x[8]=a,x[12]=o,x[1]=c,x[5]=u,x[9]=p,x[13]=m,x[2]=d,x[6]=v,x[10]=_,x[14]=g,x[3]=M,x[7]=E,x[11]=C,x[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new th().fromArray(this.elements)}copy(e){const n=this.elements,a=e.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(e){const n=this.elements,a=e.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,a){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),a.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this)}makeBasis(e,n,a){return this.set(e.x,n.x,a.x,0,e.y,n.y,a.y,0,e.z,n.z,a.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,a=e.elements,o=1/Wo.setFromMatrixColumn(e,0).length(),c=1/Wo.setFromMatrixColumn(e,1).length(),u=1/Wo.setFromMatrixColumn(e,2).length();return n[0]=a[0]*o,n[1]=a[1]*o,n[2]=a[2]*o,n[3]=0,n[4]=a[4]*c,n[5]=a[5]*c,n[6]=a[6]*c,n[7]=0,n[8]=a[8]*u,n[9]=a[9]*u,n[10]=a[10]*u,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,a=e.x,o=e.y,c=e.z,u=Math.cos(a),p=Math.sin(a),m=Math.cos(o),d=Math.sin(o),v=Math.cos(c),_=Math.sin(c);if(e.order==="XYZ"){const g=u*v,M=u*_,E=p*v,C=p*_;n[0]=m*v,n[4]=-m*_,n[8]=d,n[1]=M+E*d,n[5]=g-C*d,n[9]=-p*m,n[2]=C-g*d,n[6]=E+M*d,n[10]=u*m}else if(e.order==="YXZ"){const g=m*v,M=m*_,E=d*v,C=d*_;n[0]=g+C*p,n[4]=E*p-M,n[8]=u*d,n[1]=u*_,n[5]=u*v,n[9]=-p,n[2]=M*p-E,n[6]=C+g*p,n[10]=u*m}else if(e.order==="ZXY"){const g=m*v,M=m*_,E=d*v,C=d*_;n[0]=g-C*p,n[4]=-u*_,n[8]=E+M*p,n[1]=M+E*p,n[5]=u*v,n[9]=C-g*p,n[2]=-u*d,n[6]=p,n[10]=u*m}else if(e.order==="ZYX"){const g=u*v,M=u*_,E=p*v,C=p*_;n[0]=m*v,n[4]=E*d-M,n[8]=g*d+C,n[1]=m*_,n[5]=C*d+g,n[9]=M*d-E,n[2]=-d,n[6]=p*m,n[10]=u*m}else if(e.order==="YZX"){const g=u*m,M=u*d,E=p*m,C=p*d;n[0]=m*v,n[4]=C-g*_,n[8]=E*_+M,n[1]=_,n[5]=u*v,n[9]=-p*v,n[2]=-d*v,n[6]=M*_+E,n[10]=g-C*_}else if(e.order==="XZY"){const g=u*m,M=u*d,E=p*m,C=p*d;n[0]=m*v,n[4]=-_,n[8]=d*v,n[1]=g*_+C,n[5]=u*v,n[9]=M*_-E,n[2]=E*_-M,n[6]=p*v,n[10]=C*_+g}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bb,e,zb)}lookAt(e,n,a){const o=this.elements;return ia.subVectors(e,n),ia.lengthSq()===0&&(ia.z=1),ia.normalize(),ur.crossVectors(a,ia),ur.lengthSq()===0&&(Math.abs(a.z)===1?ia.x+=1e-4:ia.z+=1e-4,ia.normalize(),ur.crossVectors(a,ia)),ur.normalize(),Qu.crossVectors(ia,ur),o[0]=ur.x,o[4]=Qu.x,o[8]=ia.x,o[1]=ur.y,o[5]=Qu.y,o[9]=ia.y,o[2]=ur.z,o[6]=Qu.z,o[10]=ia.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const a=e.elements,o=n.elements,c=this.elements,u=a[0],p=a[4],m=a[8],d=a[12],v=a[1],_=a[5],g=a[9],M=a[13],E=a[2],C=a[6],y=a[10],x=a[14],O=a[3],N=a[7],R=a[11],I=a[15],L=o[0],z=o[4],T=o[8],B=o[12],Z=o[1],G=o[5],Y=o[9],de=o[13],xe=o[2],ae=o[6],H=o[10],k=o[14],te=o[3],_e=o[7],Ae=o[11],P=o[15];return c[0]=u*L+p*Z+m*xe+d*te,c[4]=u*z+p*G+m*ae+d*_e,c[8]=u*T+p*Y+m*H+d*Ae,c[12]=u*B+p*de+m*k+d*P,c[1]=v*L+_*Z+g*xe+M*te,c[5]=v*z+_*G+g*ae+M*_e,c[9]=v*T+_*Y+g*H+M*Ae,c[13]=v*B+_*de+g*k+M*P,c[2]=E*L+C*Z+y*xe+x*te,c[6]=E*z+C*G+y*ae+x*_e,c[10]=E*T+C*Y+y*H+x*Ae,c[14]=E*B+C*de+y*k+x*P,c[3]=O*L+N*Z+R*xe+I*te,c[7]=O*z+N*G+R*ae+I*_e,c[11]=O*T+N*Y+R*H+I*Ae,c[15]=O*B+N*de+R*k+I*P,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],a=e[4],o=e[8],c=e[12],u=e[1],p=e[5],m=e[9],d=e[13],v=e[2],_=e[6],g=e[10],M=e[14],E=e[3],C=e[7],y=e[11],x=e[15],O=m*M-d*g,N=p*M-d*_,R=p*g-m*_,I=u*M-d*v,L=u*g-m*v,z=u*_-p*v;return n*(C*O-y*N+x*R)-a*(E*O-y*I+x*L)+o*(E*N-C*I+x*z)-c*(E*R-C*L+y*z)}determinantAffine(){const e=this.elements,n=e[0],a=e[4],o=e[8],c=e[1],u=e[5],p=e[9],m=e[2],d=e[6],v=e[10];return n*(u*v-p*d)-a*(c*v-p*m)+o*(c*d-u*m)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,a){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=n,o[14]=a),this}invert(){const e=this.elements,n=e[0],a=e[1],o=e[2],c=e[3],u=e[4],p=e[5],m=e[6],d=e[7],v=e[8],_=e[9],g=e[10],M=e[11],E=e[12],C=e[13],y=e[14],x=e[15],O=n*p-a*u,N=n*m-o*u,R=n*d-c*u,I=a*m-o*p,L=a*d-c*p,z=o*d-c*m,T=v*C-_*E,B=v*y-g*E,Z=v*x-M*E,G=_*y-g*C,Y=_*x-M*C,de=g*x-M*y,xe=O*de-N*Y+R*G+I*Z-L*B+z*T;if(xe===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const ae=1/xe;return e[0]=(p*de-m*Y+d*G)*ae,e[1]=(o*Y-a*de-c*G)*ae,e[2]=(C*z-y*L+x*I)*ae,e[3]=(g*L-_*z-M*I)*ae,e[4]=(m*Z-u*de-d*B)*ae,e[5]=(n*de-o*Z+c*B)*ae,e[6]=(y*R-E*z-x*N)*ae,e[7]=(v*z-g*R+M*N)*ae,e[8]=(u*Y-p*Z+d*T)*ae,e[9]=(a*Z-n*Y-c*T)*ae,e[10]=(E*L-C*R+x*O)*ae,e[11]=(_*R-v*L-M*O)*ae,e[12]=(p*B-u*G-m*T)*ae,e[13]=(n*G-a*B+o*T)*ae,e[14]=(C*N-E*I-y*O)*ae,e[15]=(v*I-_*N+g*O)*ae,this}scale(e){const n=this.elements,a=e.x,o=e.y,c=e.z;return n[0]*=a,n[4]*=o,n[8]*=c,n[1]*=a,n[5]*=o,n[9]*=c,n[2]*=a,n[6]*=o,n[10]*=c,n[3]*=a,n[7]*=o,n[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],a=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,a,o))}makeTranslation(e,n,a){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),a=Math.sin(e);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),a=Math.sin(e);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),a=Math.sin(e);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const a=Math.cos(n),o=Math.sin(n),c=1-a,u=e.x,p=e.y,m=e.z,d=c*u,v=c*p;return this.set(d*u+a,d*p-o*m,d*m+o*p,0,d*p+o*m,v*p+a,v*m-o*u,0,d*m-o*p,v*m+o*u,c*m*m+a,0,0,0,0,1),this}makeScale(e,n,a){return this.set(e,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(e,n,a,o,c,u){return this.set(1,a,c,0,e,1,u,0,n,o,1,0,0,0,0,1),this}compose(e,n,a){const o=this.elements,c=n._x,u=n._y,p=n._z,m=n._w,d=c+c,v=u+u,_=p+p,g=c*d,M=c*v,E=c*_,C=u*v,y=u*_,x=p*_,O=m*d,N=m*v,R=m*_,I=a.x,L=a.y,z=a.z;return o[0]=(1-(C+x))*I,o[1]=(M+R)*I,o[2]=(E-N)*I,o[3]=0,o[4]=(M-R)*L,o[5]=(1-(g+x))*L,o[6]=(y+O)*L,o[7]=0,o[8]=(E+N)*z,o[9]=(y-O)*z,o[10]=(1-(g+C))*z,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,n,a){const o=this.elements;e.x=o[12],e.y=o[13],e.z=o[14];const c=this.determinantAffine();if(c===0)return a.set(1,1,1),n.identity(),this;let u=Wo.set(o[0],o[1],o[2]).length();const p=Wo.set(o[4],o[5],o[6]).length(),m=Wo.set(o[8],o[9],o[10]).length();c<0&&(u=-u),Na.copy(this);const d=1/u,v=1/p,_=1/m;return Na.elements[0]*=d,Na.elements[1]*=d,Na.elements[2]*=d,Na.elements[4]*=v,Na.elements[5]*=v,Na.elements[6]*=v,Na.elements[8]*=_,Na.elements[9]*=_,Na.elements[10]*=_,n.setFromRotationMatrix(Na),a.x=u,a.y=p,a.z=m,this}makePerspective(e,n,a,o,c,u,p=Za,m=!1){const d=this.elements,v=2*c/(n-e),_=2*c/(a-o),g=(n+e)/(n-e),M=(a+o)/(a-o);let E,C;if(m)E=c/(u-c),C=u*c/(u-c);else if(p===Za)E=-(u+c)/(u-c),C=-2*u*c/(u-c);else if(p===Wf)E=-u/(u-c),C=-u*c/(u-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+p);return d[0]=v,d[4]=0,d[8]=g,d[12]=0,d[1]=0,d[5]=_,d[9]=M,d[13]=0,d[2]=0,d[6]=0,d[10]=E,d[14]=C,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(e,n,a,o,c,u,p=Za,m=!1){const d=this.elements,v=2/(n-e),_=2/(a-o),g=-(n+e)/(n-e),M=-(a+o)/(a-o);let E,C;if(m)E=1/(u-c),C=u/(u-c);else if(p===Za)E=-2/(u-c),C=-(u+c)/(u-c);else if(p===Wf)E=-1/(u-c),C=-c/(u-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+p);return d[0]=v,d[4]=0,d[8]=0,d[12]=g,d[1]=0,d[5]=_,d[9]=0,d[13]=M,d[2]=0,d[6]=0,d[10]=E,d[14]=C,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(e){const n=this.elements,a=e.elements;for(let o=0;o<16;o++)if(n[o]!==a[o])return!1;return!0}fromArray(e,n=0){for(let a=0;a<16;a++)this.elements[a]=e[a+n];return this}toArray(e=[],n=0){const a=this.elements;return e[n]=a[0],e[n+1]=a[1],e[n+2]=a[2],e[n+3]=a[3],e[n+4]=a[4],e[n+5]=a[5],e[n+6]=a[6],e[n+7]=a[7],e[n+8]=a[8],e[n+9]=a[9],e[n+10]=a[10],e[n+11]=a[11],e[n+12]=a[12],e[n+13]=a[13],e[n+14]=a[14],e[n+15]=a[15],e}};th.prototype.isMatrix4=!0;let kn=th;const Wo=new ee,Na=new kn,Bb=new ee(0,0,0),zb=new ee(1,1,1),ur=new ee,Qu=new ee,ia=new ee,H_=new kn,G_=new gl;class no{constructor(e=0,n=0,a=0,o=no.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=a,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,a,o=this._order){return this._x=e,this._y=n,this._z=a,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,a=!0){const o=e.elements,c=o[0],u=o[4],p=o[8],m=o[1],d=o[5],v=o[9],_=o[2],g=o[6],M=o[10];switch(n){case"XYZ":this._y=Math.asin(Jt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-v,M),this._z=Math.atan2(-u,c)):(this._x=Math.atan2(g,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Jt(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(p,M),this._z=Math.atan2(m,d)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(Jt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-_,M),this._z=Math.atan2(-u,d)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-Jt(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(g,M),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-u,d));break;case"YZX":this._z=Math.asin(Jt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-v,d),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(p,M));break;case"XZY":this._z=Math.asin(-Jt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(g,d),this._y=Math.atan2(p,c)):(this._x=Math.atan2(-v,M),this._y=0);break;default:Mt("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,a){return H_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(H_,n,a)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return G_.setFromEuler(this),this.setFromQuaternion(G_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}no.DEFAULT_ORDER="XYZ";class $m{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ib=0;const k_=new ee,Yo=new gl,ys=new kn,Ju=new ee,vc=new ee,Hb=new ee,Gb=new gl,V_=new ee(1,0,0),X_=new ee(0,1,0),q_=new ee(0,0,1),W_={type:"added"},kb={type:"removed"},jo={type:"childadded",child:null},dp={type:"childremoved",child:null};class Bi extends io{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ib++}),this.uuid=Pc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bi.DEFAULT_UP.clone();const e=new ee,n=new no,a=new gl,o=new ee(1,1,1);function c(){a.setFromEuler(n,!1)}function u(){n.setFromQuaternion(a,void 0,!1)}n._onChange(c),a._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new kn},normalMatrix:{value:new Ct}}),this.matrix=new kn,this.matrixWorld=new kn,this.matrixAutoUpdate=Bi.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $m,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Yo.setFromAxisAngle(e,n),this.quaternion.multiply(Yo),this}rotateOnWorldAxis(e,n){return Yo.setFromAxisAngle(e,n),this.quaternion.premultiply(Yo),this}rotateX(e){return this.rotateOnAxis(V_,e)}rotateY(e){return this.rotateOnAxis(X_,e)}rotateZ(e){return this.rotateOnAxis(q_,e)}translateOnAxis(e,n){return k_.copy(e).applyQuaternion(this.quaternion),this.position.add(k_.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(V_,e)}translateY(e){return this.translateOnAxis(X_,e)}translateZ(e){return this.translateOnAxis(q_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ys.copy(this.matrixWorld).invert())}lookAt(e,n,a){e.isVector3?Ju.copy(e):Ju.set(e,n,a);const o=this.parent;this.updateWorldMatrix(!0,!1),vc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ys.lookAt(vc,Ju,this.up):ys.lookAt(Ju,vc,this.up),this.quaternion.setFromRotationMatrix(ys),o&&(ys.extractRotation(o.matrixWorld),Yo.setFromRotationMatrix(ys),this.quaternion.premultiply(Yo.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(tn("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(W_),jo.child=e,this.dispatchEvent(jo),jo.child=null):tn("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(kb),dp.child=e,this.dispatchEvent(dp),dp.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ys.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ys.multiply(e.parent.matrixWorld)),e.applyMatrix4(ys),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(W_),jo.child=e,this.dispatchEvent(jo),jo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let a=0,o=this.children.length;a<o;a++){const u=this.children[a].getObjectByProperty(e,n);if(u!==void 0)return u}}getObjectsByProperty(e,n,a=[]){this[e]===n&&a.push(this);const o=this.children;for(let c=0,u=o.length;c<u;c++)o[c].getObjectsByProperty(e,n,a);return a}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vc,e,Hb),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vc,Gb,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,a=e.y,o=e.z,c=this.matrix.elements;c[12]+=n-c[0]*n-c[4]*a-c[8]*o,c[13]+=a-c[1]*n-c[5]*a-c[9]*o,c[14]+=o-c[2]*n-c[6]*a-c[10]*o}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].updateMatrixWorld(e)}updateWorldMatrix(e,n,a=!1){const o=this.parent;if(e===!0&&o!==null&&o.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||a)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,a=!0),n===!0){const c=this.children;for(let u=0,p=c.length;u<p;u++)c[u].updateWorldMatrix(!1,!0,a)}}toJSON(e){const n=e===void 0||typeof e=="string",a={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),this.static!==!1&&(o.static=this.static),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.pivot!==null&&(o.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(p=>({...p,boundingBox:p.boundingBox?p.boundingBox.toJSON():void 0,boundingSphere:p.boundingSphere?p.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(p=>({...p})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(e),o.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function c(p,m){return p[m.uuid]===void 0&&(p[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=c(e.geometries,this.geometry);const p=this.geometry.parameters;if(p!==void 0&&p.shapes!==void 0){const m=p.shapes;if(Array.isArray(m))for(let d=0,v=m.length;d<v;d++){const _=m[d];c(e.shapes,_)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const p=[];for(let m=0,d=this.material.length;m<d;m++)p.push(c(e.materials,this.material[m]));o.material=p}else o.material=c(e.materials,this.material);if(this.children.length>0){o.children=[];for(let p=0;p<this.children.length;p++)o.children.push(this.children[p].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let p=0;p<this.animations.length;p++){const m=this.animations[p];o.animations.push(c(e.animations,m))}}if(n){const p=u(e.geometries),m=u(e.materials),d=u(e.textures),v=u(e.images),_=u(e.shapes),g=u(e.skeletons),M=u(e.animations),E=u(e.nodes);p.length>0&&(a.geometries=p),m.length>0&&(a.materials=m),d.length>0&&(a.textures=d),v.length>0&&(a.images=v),_.length>0&&(a.shapes=_),g.length>0&&(a.skeletons=g),M.length>0&&(a.animations=M),E.length>0&&(a.nodes=E)}return a.object=o,a;function u(p){const m=[];for(const d in p){const v=p[d];delete v.metadata,m.push(v)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let a=0;a<e.children.length;a++){const o=e.children[a];this.add(o.clone())}return this}}Bi.DEFAULT_UP=new ee(0,1,0);Bi.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Cc extends Bi{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vb={type:"move"};class pp{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Cc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Cc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ee,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ee),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Cc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ee,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ee,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const a of e.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,a){let o=null,c=null,u=null;const p=this._targetRay,m=this._grip,d=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(d&&e.hand){u=!0;for(const C of e.hand.values()){const y=n.getJointPose(C,a),x=this._getHandJoint(d,C);y!==null&&(x.matrix.fromArray(y.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=y.radius),x.visible=y!==null}const v=d.joints["index-finger-tip"],_=d.joints["thumb-tip"],g=v.position.distanceTo(_.position),M=.02,E=.005;d.inputState.pinching&&g>M+E?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&g<=M-E&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=n.getPose(e.gripSpace,a),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:e,target:this})));p!==null&&(o=n.getPose(e.targetRaySpace,a),o===null&&c!==null&&(o=c),o!==null&&(p.matrix.fromArray(o.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,o.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(o.linearVelocity)):p.hasLinearVelocity=!1,o.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(o.angularVelocity)):p.hasAngularVelocity=!1,this.dispatchEvent(Vb)))}return p!==null&&(p.visible=o!==null),m!==null&&(m.visible=c!==null),d!==null&&(d.visible=u!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const a=new Cc;a.matrixAutoUpdate=!1,a.visible=!1,e.joints[n.jointName]=a,e.add(a)}return e.joints[n.jointName]}}const xy={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fr={h:0,s:0,l:0},$u={h:0,s:0,l:0};function mp(r,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(e-r)*6*n:n<1/2?e:n<2/3?r+(e-r)*6*(2/3-n):r}class Yt{constructor(e,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,a)}set(e,n,a){if(n===void 0&&a===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,n,a);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Ma){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Kt.colorSpaceToWorking(this,n),this}setRGB(e,n,a,o=Kt.workingColorSpace){return this.r=e,this.g=n,this.b=a,Kt.colorSpaceToWorking(this,o),this}setHSL(e,n,a,o=Kt.workingColorSpace){if(e=Db(e,1),n=Jt(n,0,1),a=Jt(a,0,1),n===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+n):a+n-a*n,u=2*a-c;this.r=mp(u,c,e+1/3),this.g=mp(u,c,e),this.b=mp(u,c,e-1/3)}return Kt.colorSpaceToWorking(this,o),this}setStyle(e,n=Ma){function a(c){c!==void 0&&parseFloat(c)<1&&Mt("Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const u=o[1],p=o[2];switch(u){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:Mt("Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=o[1],u=c.length;if(u===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(u===6)return this.setHex(parseInt(c,16),n);Mt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Ma){const a=xy[e.toLowerCase()];return a!==void 0?this.setHex(a,n):Mt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Rs(e.r),this.g=Rs(e.g),this.b=Rs(e.b),this}copyLinearToSRGB(e){return this.r=ll(e.r),this.g=ll(e.g),this.b=ll(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ma){return Kt.workingToColorSpace(Ri.copy(this),e),Math.round(Jt(Ri.r*255,0,255))*65536+Math.round(Jt(Ri.g*255,0,255))*256+Math.round(Jt(Ri.b*255,0,255))}getHexString(e=Ma){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Kt.workingColorSpace){Kt.workingToColorSpace(Ri.copy(this),n);const a=Ri.r,o=Ri.g,c=Ri.b,u=Math.max(a,o,c),p=Math.min(a,o,c);let m,d;const v=(p+u)/2;if(p===u)m=0,d=0;else{const _=u-p;switch(d=v<=.5?_/(u+p):_/(2-u-p),u){case a:m=(o-c)/_+(o<c?6:0);break;case o:m=(c-a)/_+2;break;case c:m=(a-o)/_+4;break}m/=6}return e.h=m,e.s=d,e.l=v,e}getRGB(e,n=Kt.workingColorSpace){return Kt.workingToColorSpace(Ri.copy(this),n),e.r=Ri.r,e.g=Ri.g,e.b=Ri.b,e}getStyle(e=Ma){Kt.workingToColorSpace(Ri.copy(this),e);const n=Ri.r,a=Ri.g,o=Ri.b;return e!==Ma?`color(${e} ${n.toFixed(3)} ${a.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(o*255)})`}offsetHSL(e,n,a){return this.getHSL(fr),this.setHSL(fr.h+e,fr.s+n,fr.l+a)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,a){return this.r=e.r+(n.r-e.r)*a,this.g=e.g+(n.g-e.g)*a,this.b=e.b+(n.b-e.b)*a,this}lerpHSL(e,n){this.getHSL(fr),e.getHSL($u);const a=lp(fr.h,$u.h,n),o=lp(fr.s,$u.s,n),c=lp(fr.l,$u.l,n);return this.setHSL(a,o,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,a=this.g,o=this.b,c=e.elements;return this.r=c[0]*n+c[3]*a+c[6]*o,this.g=c[1]*n+c[4]*a+c[7]*o,this.b=c[2]*n+c[5]*a+c[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ri=new Yt;Yt.NAMES=xy;let yy=class extends Bi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new no,this.environmentIntensity=1,this.environmentRotation=new no,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}};const La=new ee,Ss=new ee,gp=new ee,Ms=new ee,Zo=new ee,Ko=new ee,Y_=new ee,vp=new ee,_p=new ee,xp=new ee,yp=new Yn,Sp=new Yn,Mp=new Yn;class Pa{constructor(e=new ee,n=new ee,a=new ee){this.a=e,this.b=n,this.c=a}static getNormal(e,n,a,o){o.subVectors(a,n),La.subVectors(e,n),o.cross(La);const c=o.lengthSq();return c>0?o.multiplyScalar(1/Math.sqrt(c)):o.set(0,0,0)}static getBarycoord(e,n,a,o,c){La.subVectors(o,n),Ss.subVectors(a,n),gp.subVectors(e,n);const u=La.dot(La),p=La.dot(Ss),m=La.dot(gp),d=Ss.dot(Ss),v=Ss.dot(gp),_=u*d-p*p;if(_===0)return c.set(0,0,0),null;const g=1/_,M=(d*m-p*v)*g,E=(u*v-p*m)*g;return c.set(1-M-E,E,M)}static containsPoint(e,n,a,o){return this.getBarycoord(e,n,a,o,Ms)===null?!1:Ms.x>=0&&Ms.y>=0&&Ms.x+Ms.y<=1}static getInterpolation(e,n,a,o,c,u,p,m){return this.getBarycoord(e,n,a,o,Ms)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,Ms.x),m.addScaledVector(u,Ms.y),m.addScaledVector(p,Ms.z),m)}static getInterpolatedAttribute(e,n,a,o,c,u){return yp.setScalar(0),Sp.setScalar(0),Mp.setScalar(0),yp.fromBufferAttribute(e,n),Sp.fromBufferAttribute(e,a),Mp.fromBufferAttribute(e,o),u.setScalar(0),u.addScaledVector(yp,c.x),u.addScaledVector(Sp,c.y),u.addScaledVector(Mp,c.z),u}static isFrontFacing(e,n,a,o){return La.subVectors(a,n),Ss.subVectors(e,n),La.cross(Ss).dot(o)<0}set(e,n,a){return this.a.copy(e),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(e,n,a,o){return this.a.copy(e[n]),this.b.copy(e[a]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,n,a,o){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,a),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return La.subVectors(this.c,this.b),Ss.subVectors(this.a,this.b),La.cross(Ss).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Pa.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Pa.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,a,o,c){return Pa.getInterpolation(e,this.a,this.b,this.c,n,a,o,c)}containsPoint(e){return Pa.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Pa.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const a=this.a,o=this.b,c=this.c;let u,p;Zo.subVectors(o,a),Ko.subVectors(c,a),vp.subVectors(e,a);const m=Zo.dot(vp),d=Ko.dot(vp);if(m<=0&&d<=0)return n.copy(a);_p.subVectors(e,o);const v=Zo.dot(_p),_=Ko.dot(_p);if(v>=0&&_<=v)return n.copy(o);const g=m*_-v*d;if(g<=0&&m>=0&&v<=0)return u=m/(m-v),n.copy(a).addScaledVector(Zo,u);xp.subVectors(e,c);const M=Zo.dot(xp),E=Ko.dot(xp);if(E>=0&&M<=E)return n.copy(c);const C=M*d-m*E;if(C<=0&&d>=0&&E<=0)return p=d/(d-E),n.copy(a).addScaledVector(Ko,p);const y=v*E-M*_;if(y<=0&&_-v>=0&&M-E>=0)return Y_.subVectors(c,o),p=(_-v)/(_-v+(M-E)),n.copy(o).addScaledVector(Y_,p);const x=1/(y+C+g);return u=C*x,p=g*x,n.copy(a).addScaledVector(Zo,u).addScaledVector(Ko,p)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Fc{constructor(e=new ee(1/0,1/0,1/0),n=new ee(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,a=e.length;n<a;n+=3)this.expandByPoint(Ua.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,a=e.count;n<a;n++)this.expandByPoint(Ua.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,a=e.length;n<a;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const a=Ua.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(a),this.max.copy(e).add(a),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const a=e.geometry;if(a!==void 0){const c=a.getAttribute("position");if(n===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let u=0,p=c.count;u<p;u++)e.isMesh===!0?e.getVertexPosition(u,Ua):Ua.fromBufferAttribute(c,u),Ua.applyMatrix4(e.matrixWorld),this.expandByPoint(Ua);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ef.copy(e.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),ef.copy(a.boundingBox)),ef.applyMatrix4(e.matrixWorld),this.union(ef)}const o=e.children;for(let c=0,u=o.length;c<u;c++)this.expandByObject(o[c],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ua),Ua.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,a;return e.normal.x>0?(n=e.normal.x*this.min.x,a=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,a=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,a+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,a+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,a+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,a+=e.normal.z*this.min.z),n<=-e.constant&&a>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_c),tf.subVectors(this.max,_c),Qo.subVectors(e.a,_c),Jo.subVectors(e.b,_c),$o.subVectors(e.c,_c),hr.subVectors(Jo,Qo),dr.subVectors($o,Jo),qr.subVectors(Qo,$o);let n=[0,-hr.z,hr.y,0,-dr.z,dr.y,0,-qr.z,qr.y,hr.z,0,-hr.x,dr.z,0,-dr.x,qr.z,0,-qr.x,-hr.y,hr.x,0,-dr.y,dr.x,0,-qr.y,qr.x,0];return!bp(n,Qo,Jo,$o,tf)||(n=[1,0,0,0,1,0,0,0,1],!bp(n,Qo,Jo,$o,tf))?!1:(nf.crossVectors(hr,dr),n=[nf.x,nf.y,nf.z],bp(n,Qo,Jo,$o,tf))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ua).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ua).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(bs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),bs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),bs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),bs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),bs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),bs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),bs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),bs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(bs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const bs=[new ee,new ee,new ee,new ee,new ee,new ee,new ee,new ee],Ua=new ee,ef=new Fc,Qo=new ee,Jo=new ee,$o=new ee,hr=new ee,dr=new ee,qr=new ee,_c=new ee,tf=new ee,nf=new ee,Wr=new ee;function bp(r,e,n,a,o){for(let c=0,u=r.length-3;c<=u;c+=3){Wr.fromArray(r,c);const p=o.x*Math.abs(Wr.x)+o.y*Math.abs(Wr.y)+o.z*Math.abs(Wr.z),m=e.dot(Wr),d=n.dot(Wr),v=a.dot(Wr);if(Math.max(-Math.max(m,d,v),Math.min(m,d,v))>p)return!1}return!0}const ti=new ee,af=new Dt;let Xb=0;class en extends io{constructor(e,n,a=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Xb++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=a,this.usage=U_,this.updateRanges=[],this.gpuType=qi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,a){e*=this.itemSize,a*=n.itemSize;for(let o=0,c=this.itemSize;o<c;o++)this.array[e+o]=n.array[a+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)af.fromBufferAttribute(this,n),af.applyMatrix3(e),this.setXY(n,af.x,af.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)ti.fromBufferAttribute(this,n),ti.applyMatrix3(e),this.setXYZ(n,ti.x,ti.y,ti.z);return this}applyMatrix4(e){for(let n=0,a=this.count;n<a;n++)ti.fromBufferAttribute(this,n),ti.applyMatrix4(e),this.setXYZ(n,ti.x,ti.y,ti.z);return this}applyNormalMatrix(e){for(let n=0,a=this.count;n<a;n++)ti.fromBufferAttribute(this,n),ti.applyNormalMatrix(e),this.setXYZ(n,ti.x,ti.y,ti.z);return this}transformDirection(e){for(let n=0,a=this.count;n<a;n++)ti.fromBufferAttribute(this,n),ti.transformDirection(e),this.setXYZ(n,ti.x,ti.y,ti.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let a=this.array[e*this.itemSize+n];return this.normalized&&(a=gc(a,this.array)),a}setComponent(e,n,a){return this.normalized&&(a=Xi(a,this.array)),this.array[e*this.itemSize+n]=a,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=gc(n,this.array)),n}setX(e,n){return this.normalized&&(n=Xi(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=gc(n,this.array)),n}setY(e,n){return this.normalized&&(n=Xi(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=gc(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Xi(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=gc(n,this.array)),n}setW(e,n){return this.normalized&&(n=Xi(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,a){return e*=this.itemSize,this.normalized&&(n=Xi(n,this.array),a=Xi(a,this.array)),this.array[e+0]=n,this.array[e+1]=a,this}setXYZ(e,n,a,o){return e*=this.itemSize,this.normalized&&(n=Xi(n,this.array),a=Xi(a,this.array),o=Xi(o,this.array)),this.array[e+0]=n,this.array[e+1]=a,this.array[e+2]=o,this}setXYZW(e,n,a,o,c){return e*=this.itemSize,this.normalized&&(n=Xi(n,this.array),a=Xi(a,this.array),o=Xi(o,this.array),c=Xi(c,this.array)),this.array[e+0]=n,this.array[e+1]=a,this.array[e+2]=o,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==U_&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Sy extends en{constructor(e,n,a){super(new Uint16Array(e),n,a)}}class My extends en{constructor(e,n,a){super(new Uint32Array(e),n,a)}}class ra extends en{constructor(e,n,a){super(new Float32Array(e),n,a)}}const qb=new Fc,xc=new ee,Ep=new ee;class vl{constructor(e=new ee,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const a=this.center;n!==void 0?a.copy(n):qb.setFromPoints(e).getCenter(a);let o=0;for(let c=0,u=e.length;c<u;c++)o=Math.max(o,a.distanceToSquared(e[c]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const a=this.center.distanceToSquared(e);return n.copy(e),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xc.subVectors(e,this.center);const n=xc.lengthSq();if(n>this.radius*this.radius){const a=Math.sqrt(n),o=(a-this.radius)*.5;this.center.addScaledVector(xc,o/a),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ep.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xc.copy(e.center).add(Ep)),this.expandByPoint(xc.copy(e.center).sub(Ep))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Wb=0;const Sa=new kn,Tp=new Bi,el=new ee,aa=new Fc,yc=new Fc,fi=new ee;class ri extends io{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wb++}),this.uuid=Pc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ab(e)?My:Sy)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,a=0){this.groups.push({start:e,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new Ct().getNormalMatrix(e);a.applyNormalMatrix(c),a.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Sa.makeRotationFromQuaternion(e),this.applyMatrix4(Sa),this}rotateX(e){return Sa.makeRotationX(e),this.applyMatrix4(Sa),this}rotateY(e){return Sa.makeRotationY(e),this.applyMatrix4(Sa),this}rotateZ(e){return Sa.makeRotationZ(e),this.applyMatrix4(Sa),this}translate(e,n,a){return Sa.makeTranslation(e,n,a),this.applyMatrix4(Sa),this}scale(e,n,a){return Sa.makeScale(e,n,a),this.applyMatrix4(Sa),this}lookAt(e){return Tp.lookAt(e),Tp.updateMatrix(),this.applyMatrix4(Tp.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(el).negate(),this.translate(el.x,el.y,el.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const a=[];for(let o=0,c=e.length;o<c;o++){const u=e[o];a.push(u.x,u.y,u.z||0)}this.setAttribute("position",new ra(a,3))}else{const a=Math.min(e.length,n.count);for(let o=0;o<a;o++){const c=e[o];n.setXYZ(o,c.x,c.y,c.z||0)}e.length>n.count&&Mt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fc);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){tn("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ee(-1/0,-1/0,-1/0),new ee(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let a=0,o=n.length;a<o;a++){const c=n[a];aa.setFromBufferAttribute(c),this.morphTargetsRelative?(fi.addVectors(this.boundingBox.min,aa.min),this.boundingBox.expandByPoint(fi),fi.addVectors(this.boundingBox.max,aa.max),this.boundingBox.expandByPoint(fi)):(this.boundingBox.expandByPoint(aa.min),this.boundingBox.expandByPoint(aa.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&tn('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vl);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){tn("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ee,1/0);return}if(e){const a=this.boundingSphere.center;if(aa.setFromBufferAttribute(e),n)for(let c=0,u=n.length;c<u;c++){const p=n[c];yc.setFromBufferAttribute(p),this.morphTargetsRelative?(fi.addVectors(aa.min,yc.min),aa.expandByPoint(fi),fi.addVectors(aa.max,yc.max),aa.expandByPoint(fi)):(aa.expandByPoint(yc.min),aa.expandByPoint(yc.max))}aa.getCenter(a);let o=0;for(let c=0,u=e.count;c<u;c++)fi.fromBufferAttribute(e,c),o=Math.max(o,a.distanceToSquared(fi));if(n)for(let c=0,u=n.length;c<u;c++){const p=n[c],m=this.morphTargetsRelative;for(let d=0,v=p.count;d<v;d++)fi.fromBufferAttribute(p,d),m&&(el.fromBufferAttribute(e,d),fi.add(el)),o=Math.max(o,a.distanceToSquared(fi))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&tn('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){tn("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=n.position,o=n.normal,c=n.uv;let u=this.getAttribute("tangent");(u===void 0||u.count!==a.count)&&(u=new en(new Float32Array(4*a.count),4),this.setAttribute("tangent",u));const p=[],m=[];for(let T=0;T<a.count;T++)p[T]=new ee,m[T]=new ee;const d=new ee,v=new ee,_=new ee,g=new Dt,M=new Dt,E=new Dt,C=new ee,y=new ee;function x(T,B,Z){d.fromBufferAttribute(a,T),v.fromBufferAttribute(a,B),_.fromBufferAttribute(a,Z),g.fromBufferAttribute(c,T),M.fromBufferAttribute(c,B),E.fromBufferAttribute(c,Z),v.sub(d),_.sub(d),M.sub(g),E.sub(g);const G=1/(M.x*E.y-E.x*M.y);isFinite(G)&&(C.copy(v).multiplyScalar(E.y).addScaledVector(_,-M.y).multiplyScalar(G),y.copy(_).multiplyScalar(M.x).addScaledVector(v,-E.x).multiplyScalar(G),p[T].add(C),p[B].add(C),p[Z].add(C),m[T].add(y),m[B].add(y),m[Z].add(y))}let O=this.groups;O.length===0&&(O=[{start:0,count:e.count}]);for(let T=0,B=O.length;T<B;++T){const Z=O[T],G=Z.start,Y=Z.count;for(let de=G,xe=G+Y;de<xe;de+=3)x(e.getX(de+0),e.getX(de+1),e.getX(de+2))}const N=new ee,R=new ee,I=new ee,L=new ee;function z(T){I.fromBufferAttribute(o,T),L.copy(I);const B=p[T];N.copy(B),N.sub(I.multiplyScalar(I.dot(B))).normalize(),R.crossVectors(L,B);const G=R.dot(m[T])<0?-1:1;u.setXYZW(T,N.x,N.y,N.z,G)}for(let T=0,B=O.length;T<B;++T){const Z=O[T],G=Z.start,Y=Z.count;for(let de=G,xe=G+Y;de<xe;de+=3)z(e.getX(de+0)),z(e.getX(de+1)),z(e.getX(de+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0||a.count!==n.count)a=new en(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let g=0,M=a.count;g<M;g++)a.setXYZ(g,0,0,0);const o=new ee,c=new ee,u=new ee,p=new ee,m=new ee,d=new ee,v=new ee,_=new ee;if(e)for(let g=0,M=e.count;g<M;g+=3){const E=e.getX(g+0),C=e.getX(g+1),y=e.getX(g+2);o.fromBufferAttribute(n,E),c.fromBufferAttribute(n,C),u.fromBufferAttribute(n,y),v.subVectors(u,c),_.subVectors(o,c),v.cross(_),p.fromBufferAttribute(a,E),m.fromBufferAttribute(a,C),d.fromBufferAttribute(a,y),p.add(v),m.add(v),d.add(v),a.setXYZ(E,p.x,p.y,p.z),a.setXYZ(C,m.x,m.y,m.z),a.setXYZ(y,d.x,d.y,d.z)}else for(let g=0,M=n.count;g<M;g+=3)o.fromBufferAttribute(n,g+0),c.fromBufferAttribute(n,g+1),u.fromBufferAttribute(n,g+2),v.subVectors(u,c),_.subVectors(o,c),v.cross(_),a.setXYZ(g+0,v.x,v.y,v.z),a.setXYZ(g+1,v.x,v.y,v.z),a.setXYZ(g+2,v.x,v.y,v.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,a=e.count;n<a;n++)fi.fromBufferAttribute(e,n),fi.normalize(),e.setXYZ(n,fi.x,fi.y,fi.z)}toNonIndexed(){function e(p,m){const d=p.array,v=p.itemSize,_=p.normalized,g=new d.constructor(m.length*v);let M=0,E=0;for(let C=0,y=m.length;C<y;C++){p.isInterleavedBufferAttribute?M=m[C]*p.data.stride+p.offset:M=m[C]*v;for(let x=0;x<v;x++)g[E++]=d[M++]}return new en(g,v,_)}if(this.index===null)return Mt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new ri,a=this.index.array,o=this.attributes;for(const p in o){const m=o[p],d=e(m,a);n.setAttribute(p,d)}const c=this.morphAttributes;for(const p in c){const m=[],d=c[p];for(let v=0,_=d.length;v<_;v++){const g=d[v],M=e(g,a);m.push(M)}n.morphAttributes[p]=m}n.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let p=0,m=u.length;p<m;p++){const d=u[p];n.addGroup(d.start,d.count,d.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const d in m)m[d]!==void 0&&(e[d]=m[d]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const a=this.attributes;for(const m in a){const d=a[m];e.data.attributes[m]=d.toJSON(e.data)}const o={};let c=!1;for(const m in this.morphAttributes){const d=this.morphAttributes[m],v=[];for(let _=0,g=d.length;_<g;_++){const M=d[_];v.push(M.toJSON(e.data))}v.length>0&&(o[m]=v,c=!0)}c&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const p=this.boundingSphere;return p!==null&&(e.data.boundingSphere=p.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const a=e.index;a!==null&&this.setIndex(a.clone());const o=e.attributes;for(const d in o){const v=o[d];this.setAttribute(d,v.clone(n))}const c=e.morphAttributes;for(const d in c){const v=[],_=c[d];for(let g=0,M=_.length;g<M;g++)v.push(_[g].clone(n));this.morphAttributes[d]=v}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let d=0,v=u.length;d<v;d++){const _=u[d];this.addGroup(_.start,_.count,_.materialIndex)}const p=e.boundingBox;p!==null&&(this.boundingBox=p.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Yb=0;class _l extends io{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yb++}),this.uuid=Pc(),this.name="",this.type="Material",this.blending=rl,this.side=Mr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wp,this.blendDst=Yp,this.blendEquation=Zr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Yt(0,0,0),this.blendAlpha=0,this.depthFunc=cl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=L_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xo,this.stencilZFail=Xo,this.stencilZPass=Xo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const a=e[n];if(a===void 0){Mt(`Material: parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){Mt(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(a):o&&o.isVector2&&a&&a.isVector2||o&&o.isEuler&&a&&a.isEuler||o&&o.isVector3&&a&&a.isVector3?o.copy(a):this[n]=a}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const a={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(a.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(a.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(e).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(e).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(e).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(e).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(e).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.shadowSide!==null&&(a.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),this.blending!==rl&&(a.blending=this.blending),this.side!==Mr&&(a.side=this.side),this.vertexColors===!0&&(a.vertexColors=!0),this.opacity<1&&(a.opacity=this.opacity),this.transparent===!0&&(a.transparent=!0),this.blendSrc!==Wp&&(a.blendSrc=this.blendSrc),this.blendDst!==Yp&&(a.blendDst=this.blendDst),this.blendEquation!==Zr&&(a.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(a.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(a.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(a.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(a.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(a.blendAlpha=this.blendAlpha),this.depthFunc!==cl&&(a.depthFunc=this.depthFunc),this.depthTest===!1&&(a.depthTest=this.depthTest),this.depthWrite===!1&&(a.depthWrite=this.depthWrite),this.colorWrite===!1&&(a.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(a.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==L_&&(a.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(a.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(a.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xo&&(a.stencilFail=this.stencilFail),this.stencilZFail!==Xo&&(a.stencilZFail=this.stencilZFail),this.stencilZPass!==Xo&&(a.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(a.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(a.rotation=this.rotation),this.polygonOffset===!0&&(a.polygonOffset=!0),this.polygonOffsetFactor!==0&&(a.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(a.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(a.linewidth=this.linewidth),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.dithering===!0&&(a.dithering=!0),this.alphaTest>0&&(a.alphaTest=this.alphaTest),this.alphaHash===!0&&(a.alphaHash=!0),this.alphaToCoverage===!0&&(a.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(a.premultipliedAlpha=!0),this.forceSinglePass===!0&&(a.forceSinglePass=!0),this.allowOverride===!1&&(a.allowOverride=!1),this.wireframe===!0&&(a.wireframe=!0),this.wireframeLinewidth>1&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(a.flatShading=!0),this.visible===!1&&(a.visible=!1),this.toneMapped===!1&&(a.toneMapped=!1),this.fog===!1&&(a.fog=!1),Object.keys(this.userData).length>0&&(a.userData=this.userData);function o(c){const u=[];for(const p in c){const m=c[p];delete m.metadata,u.push(m)}return u}if(n){const c=o(e.textures),u=o(e.images);c.length>0&&(a.textures=c),u.length>0&&(a.images=u)}return a}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Yt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let a=e.normalScale;Array.isArray(a)===!1&&(a=[a,a]),this.normalScale=new Dt().fromArray(a)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Dt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let a=null;if(n!==null){const o=n.length;a=new Array(o);for(let c=0;c!==o;++c)a[c]=n[c].clone()}return this.clippingPlanes=a,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Es=new ee,Ap=new ee,sf=new ee,pr=new ee,wp=new ee,rf=new ee,Rp=new ee;class ih{constructor(e=new ee,n=new ee(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Es)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Es.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Es.copy(this.origin).addScaledVector(this.direction,n),Es.distanceToSquared(e))}distanceSqToSegment(e,n,a,o){Ap.copy(e).add(n).multiplyScalar(.5),sf.copy(n).sub(e).normalize(),pr.copy(this.origin).sub(Ap);const c=e.distanceTo(n)*.5,u=-this.direction.dot(sf),p=pr.dot(this.direction),m=-pr.dot(sf),d=pr.lengthSq(),v=Math.abs(1-u*u);let _,g,M,E;if(v>0)if(_=u*m-p,g=u*p-m,E=c*v,_>=0)if(g>=-E)if(g<=E){const C=1/v;_*=C,g*=C,M=_*(_+u*g+2*p)+g*(u*_+g+2*m)+d}else g=c,_=Math.max(0,-(u*g+p)),M=-_*_+g*(g+2*m)+d;else g=-c,_=Math.max(0,-(u*g+p)),M=-_*_+g*(g+2*m)+d;else g<=-E?(_=Math.max(0,-(-u*c+p)),g=_>0?-c:Math.min(Math.max(-c,-m),c),M=-_*_+g*(g+2*m)+d):g<=E?(_=0,g=Math.min(Math.max(-c,-m),c),M=g*(g+2*m)+d):(_=Math.max(0,-(u*c+p)),g=_>0?c:Math.min(Math.max(-c,-m),c),M=-_*_+g*(g+2*m)+d);else g=u>0?-c:c,_=Math.max(0,-(u*g+p)),M=-_*_+g*(g+2*m)+d;return a&&a.copy(this.origin).addScaledVector(this.direction,_),o&&o.copy(Ap).addScaledVector(sf,g),M}intersectSphere(e,n){Es.subVectors(e.center,this.origin);const a=Es.dot(this.direction),o=Es.dot(Es)-a*a,c=e.radius*e.radius;if(o>c)return null;const u=Math.sqrt(c-o),p=a-u,m=a+u;return m<0?null:p<0?this.at(m,n):this.at(p,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(e.normal)+e.constant)/n;return a>=0?a:null}intersectPlane(e,n){const a=this.distanceToPlane(e);return a===null?null:this.at(a,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let a,o,c,u,p,m;const d=1/this.direction.x,v=1/this.direction.y,_=1/this.direction.z,g=this.origin;return d>=0?(a=(e.min.x-g.x)*d,o=(e.max.x-g.x)*d):(a=(e.max.x-g.x)*d,o=(e.min.x-g.x)*d),v>=0?(c=(e.min.y-g.y)*v,u=(e.max.y-g.y)*v):(c=(e.max.y-g.y)*v,u=(e.min.y-g.y)*v),a>u||c>o||((c>a||isNaN(a))&&(a=c),(u<o||isNaN(o))&&(o=u),_>=0?(p=(e.min.z-g.z)*_,m=(e.max.z-g.z)*_):(p=(e.max.z-g.z)*_,m=(e.min.z-g.z)*_),a>m||p>o)||((p>a||a!==a)&&(a=p),(m<o||o!==o)&&(o=m),o<0)?null:this.at(a>=0?a:o,n)}intersectsBox(e){return this.intersectBox(e,Es)!==null}intersectTriangle(e,n,a,o,c){wp.subVectors(n,e),rf.subVectors(a,e),Rp.crossVectors(wp,rf);let u=this.direction.dot(Rp),p;if(u>0){if(o)return null;p=1}else if(u<0)p=-1,u=-u;else return null;pr.subVectors(this.origin,e);const m=p*this.direction.dot(rf.crossVectors(pr,rf));if(m<0)return null;const d=p*this.direction.dot(wp.cross(pr));if(d<0||m+d>u)return null;const v=-p*pr.dot(Rp);return v<0?null:this.at(v/u,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class eg extends _l{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new no,this.combine=ty,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const j_=new kn,Yr=new ih,of=new vl,Z_=new ee,lf=new ee,cf=new ee,uf=new ee,Cp=new ee,ff=new ee,K_=new ee,hf=new ee;class Ba extends Bi{constructor(e=new ri,n=new eg){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const p=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}getVertexPosition(e,n){const a=this.geometry,o=a.attributes.position,c=a.morphAttributes.position,u=a.morphTargetsRelative;n.fromBufferAttribute(o,e);const p=this.morphTargetInfluences;if(c&&p){ff.set(0,0,0);for(let m=0,d=c.length;m<d;m++){const v=p[m],_=c[m];v!==0&&(Cp.fromBufferAttribute(_,e),u?ff.addScaledVector(Cp,v):ff.addScaledVector(Cp.sub(n),v))}n.add(ff)}return n}raycast(e,n){const a=this.geometry,o=this.material,c=this.matrixWorld;o!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),of.copy(a.boundingSphere),of.applyMatrix4(c),Yr.copy(e.ray).recast(e.near),!(of.containsPoint(Yr.origin)===!1&&(Yr.intersectSphere(of,Z_)===null||Yr.origin.distanceToSquared(Z_)>(e.far-e.near)**2))&&(j_.copy(c).invert(),Yr.copy(e.ray).applyMatrix4(j_),!(a.boundingBox!==null&&Yr.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(e,n,Yr)))}_computeIntersections(e,n,a){let o;const c=this.geometry,u=this.material,p=c.index,m=c.attributes.position,d=c.attributes.uv,v=c.attributes.uv1,_=c.attributes.normal,g=c.groups,M=c.drawRange;if(p!==null)if(Array.isArray(u))for(let E=0,C=g.length;E<C;E++){const y=g[E],x=u[y.materialIndex],O=Math.max(y.start,M.start),N=Math.min(p.count,Math.min(y.start+y.count,M.start+M.count));for(let R=O,I=N;R<I;R+=3){const L=p.getX(R),z=p.getX(R+1),T=p.getX(R+2);o=df(this,x,e,a,d,v,_,L,z,T),o&&(o.faceIndex=Math.floor(R/3),o.face.materialIndex=y.materialIndex,n.push(o))}}else{const E=Math.max(0,M.start),C=Math.min(p.count,M.start+M.count);for(let y=E,x=C;y<x;y+=3){const O=p.getX(y),N=p.getX(y+1),R=p.getX(y+2);o=df(this,u,e,a,d,v,_,O,N,R),o&&(o.faceIndex=Math.floor(y/3),n.push(o))}}else if(m!==void 0)if(Array.isArray(u))for(let E=0,C=g.length;E<C;E++){const y=g[E],x=u[y.materialIndex],O=Math.max(y.start,M.start),N=Math.min(m.count,Math.min(y.start+y.count,M.start+M.count));for(let R=O,I=N;R<I;R+=3){const L=R,z=R+1,T=R+2;o=df(this,x,e,a,d,v,_,L,z,T),o&&(o.faceIndex=Math.floor(R/3),o.face.materialIndex=y.materialIndex,n.push(o))}}else{const E=Math.max(0,M.start),C=Math.min(m.count,M.start+M.count);for(let y=E,x=C;y<x;y+=3){const O=y,N=y+1,R=y+2;o=df(this,u,e,a,d,v,_,O,N,R),o&&(o.faceIndex=Math.floor(y/3),n.push(o))}}}}function jb(r,e,n,a,o,c,u,p){let m;if(e.side===Wi?m=a.intersectTriangle(u,c,o,!0,p):m=a.intersectTriangle(o,c,u,e.side===Mr,p),m===null)return null;hf.copy(p),hf.applyMatrix4(r.matrixWorld);const d=n.ray.origin.distanceTo(hf);return d<n.near||d>n.far?null:{distance:d,point:hf.clone(),object:r}}function df(r,e,n,a,o,c,u,p,m,d){r.getVertexPosition(p,lf),r.getVertexPosition(m,cf),r.getVertexPosition(d,uf);const v=jb(r,e,n,a,lf,cf,uf,K_);if(v){const _=new ee;Pa.getBarycoord(K_,lf,cf,uf,_),o&&(v.uv=Pa.getInterpolatedAttribute(o,p,m,d,_,new Dt)),c&&(v.uv1=Pa.getInterpolatedAttribute(c,p,m,d,_,new Dt)),u&&(v.normal=Pa.getInterpolatedAttribute(u,p,m,d,_,new ee),v.normal.dot(a.direction)>0&&v.normal.multiplyScalar(-1));const g={a:p,b:m,c:d,normal:new ee,materialIndex:0};Pa.getNormal(lf,cf,uf,g.normal),v.face=g,v.barycoord=_}return v}class jf extends Fi{constructor(e=null,n=1,a=1,o,c,u,p,m,d=Fn,v=Fn,_,g){super(null,u,p,m,d,v,o,c,_,g),this.isDataTexture=!0,this.image={data:e,width:n,height:a},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Dp=new ee,Zb=new ee,Kb=new Ct;class xr{constructor(e=new ee(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,a,o){return this.normal.set(e,n,a),this.constant=o,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,a){const o=Dp.subVectors(a,n).cross(Zb.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,a=!0){const o=e.delta(Dp),c=this.normal.dot(o);if(c===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const u=-(e.start.dot(this.normal)+this.constant)/c;return a===!0&&(u<0||u>1)?null:n.copy(e.start).addScaledVector(o,u)}intersectsLine(e){const n=this.distanceToPoint(e.start),a=this.distanceToPoint(e.end);return n<0&&a>0||a<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const a=n||Kb.getNormalMatrix(e),o=this.coplanarPoint(Dp).applyMatrix4(e),c=this.normal.applyMatrix3(a).normalize();return this.constant=-o.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jr=new vl,Qb=new Dt(.5,.5),pf=new ee;class by{constructor(e=new xr,n=new xr,a=new xr,o=new xr,c=new xr,u=new xr){this.planes=[e,n,a,o,c,u]}set(e,n,a,o,c,u){const p=this.planes;return p[0].copy(e),p[1].copy(n),p[2].copy(a),p[3].copy(o),p[4].copy(c),p[5].copy(u),this}copy(e){const n=this.planes;for(let a=0;a<6;a++)n[a].copy(e.planes[a]);return this}setFromProjectionMatrix(e,n=Za,a=!1){const o=this.planes,c=e.elements,u=c[0],p=c[1],m=c[2],d=c[3],v=c[4],_=c[5],g=c[6],M=c[7],E=c[8],C=c[9],y=c[10],x=c[11],O=c[12],N=c[13],R=c[14],I=c[15];if(o[0].setComponents(d-u,M-v,x-E,I-O).normalize(),o[1].setComponents(d+u,M+v,x+E,I+O).normalize(),o[2].setComponents(d+p,M+_,x+C,I+N).normalize(),o[3].setComponents(d-p,M-_,x-C,I-N).normalize(),a)o[4].setComponents(m,g,y,R).normalize(),o[5].setComponents(d-m,M-g,x-y,I-R).normalize();else if(o[4].setComponents(d-m,M-g,x-y,I-R).normalize(),n===Za)o[5].setComponents(d+m,M+g,x+y,I+R).normalize();else if(n===Wf)o[5].setComponents(m,g,y,R).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),jr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),jr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(jr)}intersectsSprite(e){jr.center.set(0,0,0);const n=Qb.distanceTo(e.center);return jr.radius=.7071067811865476+n,jr.applyMatrix4(e.matrixWorld),this.intersectsSphere(jr)}intersectsSphere(e){const n=this.planes,a=e.center,o=-e.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(a)<o)return!1;return!0}intersectsBox(e){const n=this.planes;for(let a=0;a<6;a++){const o=n[a];if(pf.x=o.normal.x>0?e.max.x:e.min.x,pf.y=o.normal.y>0?e.max.y:e.min.y,pf.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(pf)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Jb extends _l{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Yt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Zf=new ee,Kf=new ee,Q_=new kn,Sc=new ih,mf=new vl,Np=new ee,J_=new ee;class $b extends Bi{constructor(e=new ri,n=new Jb){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,a=[0];for(let o=1,c=n.count;o<c;o++)Zf.fromBufferAttribute(n,o-1),Kf.fromBufferAttribute(n,o),a[o]=a[o-1],a[o]+=Zf.distanceTo(Kf);e.setAttribute("lineDistance",new ra(a,1))}else Mt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const a=this.geometry,o=this.matrixWorld,c=e.params.Line.threshold,u=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),mf.copy(a.boundingSphere),mf.applyMatrix4(o),mf.radius+=c,e.ray.intersectsSphere(mf)===!1)return;Q_.copy(o).invert(),Sc.copy(e.ray).applyMatrix4(Q_);const p=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=p*p,d=this.isLineSegments?2:1,v=a.index,g=a.attributes.position;if(v!==null){const M=Math.max(0,u.start),E=Math.min(v.count,u.start+u.count);for(let C=M,y=E-1;C<y;C+=d){const x=v.getX(C),O=v.getX(C+1),N=gf(this,e,Sc,m,x,O,C);N&&n.push(N)}if(this.isLineLoop){const C=v.getX(E-1),y=v.getX(M),x=gf(this,e,Sc,m,C,y,E-1);x&&n.push(x)}}else{const M=Math.max(0,u.start),E=Math.min(g.count,u.start+u.count);for(let C=M,y=E-1;C<y;C+=d){const x=gf(this,e,Sc,m,C,C+1,C);x&&n.push(x)}if(this.isLineLoop){const C=gf(this,e,Sc,m,E-1,M,E-1);C&&n.push(C)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const p=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}}function gf(r,e,n,a,o,c,u){const p=r.geometry.attributes.position;if(Zf.fromBufferAttribute(p,o),Kf.fromBufferAttribute(p,c),n.distanceSqToSegment(Zf,Kf,Np,J_)>a)return;Np.applyMatrix4(r.matrixWorld);const d=e.ray.origin.distanceTo(Np);if(!(d<e.near||d>e.far))return{distance:d,point:J_.clone().applyMatrix4(r.matrixWorld),index:u,face:null,faceIndex:null,barycoord:null,object:r}}const $_=new ee,ex=new ee;class e1 extends $b{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,a=[];for(let o=0,c=n.count;o<c;o+=2)$_.fromBufferAttribute(n,o),ex.fromBufferAttribute(n,o+1),a[o]=o===0?0:a[o-1],a[o+1]=a[o]+$_.distanceTo(ex);e.setAttribute("lineDistance",new ra(a,1))}else Mt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class t1 extends _l{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Yt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const tx=new kn,Om=new ih,vf=new vl,_f=new ee;class Mc extends Bi{constructor(e=new ri,n=new t1){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const a=this.geometry,o=this.matrixWorld,c=e.params.Points.threshold,u=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),vf.copy(a.boundingSphere),vf.applyMatrix4(o),vf.radius+=c,e.ray.intersectsSphere(vf)===!1)return;tx.copy(o).invert(),Om.copy(e.ray).applyMatrix4(tx);const p=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=p*p,d=a.index,_=a.attributes.position;if(d!==null){const g=Math.max(0,u.start),M=Math.min(d.count,u.start+u.count);for(let E=g,C=M;E<C;E++){const y=d.getX(E);_f.fromBufferAttribute(_,y),nx(_f,y,m,o,e,n,this)}}else{const g=Math.max(0,u.start),M=Math.min(_.count,u.start+u.count);for(let E=g,C=M;E<C;E++)_f.fromBufferAttribute(_,E),nx(_f,E,m,o,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const p=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}}function nx(r,e,n,a,o,c,u){const p=Om.distanceSqToPoint(r);if(p<n){const m=new ee;Om.closestPointToPoint(r,m),m.applyMatrix4(a);const d=o.ray.origin.distanceTo(m);if(d<o.near||d>o.far)return;c.push({distance:d,distanceToRay:Math.sqrt(p),point:m,index:e,face:null,faceIndex:null,barycoord:null,object:u})}}class Ey extends Fi{constructor(e=[],n=eo,a,o,c,u,p,m,d,v){super(e,n,a,o,c,u,p,m,d,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class fl extends Fi{constructor(e,n,a=Qa,o,c,u,p=Fn,m=Fn,d,v=Cs,_=1){if(v!==Cs&&v!==Jr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:n,depth:_};super(g,o,c,u,p,m,v,a,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Jm(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class n1 extends fl{constructor(e,n=Qa,a=eo,o,c,u=Fn,p=Fn,m,d=Cs){const v={width:e,height:e,depth:1},_=[v,v,v,v,v,v];super(e,e,n,a,o,c,u,p,m,d),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ty extends Fi{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Bc extends ri{constructor(e=1,n=1,a=1,o=1,c=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:a,widthSegments:o,heightSegments:c,depthSegments:u};const p=this;o=Math.floor(o),c=Math.floor(c),u=Math.floor(u);const m=[],d=[],v=[],_=[];let g=0,M=0;E("z","y","x",-1,-1,a,n,e,u,c,0),E("z","y","x",1,-1,a,n,-e,u,c,1),E("x","z","y",1,1,e,a,n,o,u,2),E("x","z","y",1,-1,e,a,-n,o,u,3),E("x","y","z",1,-1,e,n,a,o,c,4),E("x","y","z",-1,-1,e,n,-a,o,c,5),this.setIndex(m),this.setAttribute("position",new ra(d,3)),this.setAttribute("normal",new ra(v,3)),this.setAttribute("uv",new ra(_,2));function E(C,y,x,O,N,R,I,L,z,T,B){const Z=R/z,G=I/T,Y=R/2,de=I/2,xe=L/2,ae=z+1,H=T+1;let k=0,te=0;const _e=new ee;for(let Ae=0;Ae<H;Ae++){const P=Ae*G-de;for(let Q=0;Q<ae;Q++){const Ce=Q*Z-Y;_e[C]=Ce*O,_e[y]=P*N,_e[x]=xe,d.push(_e.x,_e.y,_e.z),_e[C]=0,_e[y]=0,_e[x]=L>0?1:-1,v.push(_e.x,_e.y,_e.z),_.push(Q/z),_.push(1-Ae/T),k+=1}}for(let Ae=0;Ae<T;Ae++)for(let P=0;P<z;P++){const Q=g+P+ae*Ae,Ce=g+P+ae*(Ae+1),Ie=g+(P+1)+ae*(Ae+1),je=g+(P+1)+ae*Ae;m.push(Q,Ce,je),m.push(Ce,Ie,je),te+=6}p.addGroup(M,te,B),M+=te,g+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bc(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ah extends ri{constructor(e=1,n=1,a=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:a,heightSegments:o};const c=e/2,u=n/2,p=Math.floor(a),m=Math.floor(o),d=p+1,v=m+1,_=e/p,g=n/m,M=[],E=[],C=[],y=[];for(let x=0;x<v;x++){const O=x*g-u;for(let N=0;N<d;N++){const R=N*_-c;E.push(R,-O,0),C.push(0,0,1),y.push(N/p),y.push(1-x/m)}}for(let x=0;x<m;x++)for(let O=0;O<p;O++){const N=O+d*x,R=O+d*(x+1),I=O+1+d*(x+1),L=O+1+d*x;M.push(N,R,L),M.push(R,I,L)}this.setIndex(M),this.setAttribute("position",new ra(E,3)),this.setAttribute("normal",new ra(C,3)),this.setAttribute("uv",new ra(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ah(e.width,e.height,e.widthSegments,e.heightSegments)}}function hl(r){const e={};for(const n in r){e[n]={};for(const a in r[n]){const o=r[n][a];if(ix(o))o.isRenderTargetTexture?(Mt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][a]=null):e[n][a]=o.clone();else if(Array.isArray(o))if(ix(o[0])){const c=[];for(let u=0,p=o.length;u<p;u++)c[u]=o[u].clone();e[n][a]=c}else e[n][a]=o.slice();else e[n][a]=o}}return e}function Oi(r){const e={};for(let n=0;n<r.length;n++){const a=hl(r[n]);for(const o in a)e[o]=a[o]}return e}function ix(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function i1(r){const e=[];for(let n=0;n<r.length;n++)e.push(r[n].clone());return e}function Ay(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Kt.workingColorSpace}const dl={clone:hl,merge:Oi};var a1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,s1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Cn extends _l{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=a1,this.fragmentShader=s1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=hl(e.uniforms),this.uniformsGroups=i1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const o in this.uniforms){const u=this.uniforms[o].value;u&&u.isTexture?n.uniforms[o]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?n.uniforms[o]={type:"c",value:u.getHex()}:u&&u.isVector2?n.uniforms[o]={type:"v2",value:u.toArray()}:u&&u.isVector3?n.uniforms[o]={type:"v3",value:u.toArray()}:u&&u.isVector4?n.uniforms[o]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?n.uniforms[o]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?n.uniforms[o]={type:"m4",value:u.toArray()}:n.uniforms[o]={value:u}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const a={};for(const o in this.extensions)this.extensions[o]===!0&&(a[o]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const a in e.uniforms){const o=e.uniforms[a];switch(this.uniforms[a]={},o.type){case"t":this.uniforms[a].value=n[o.value]||null;break;case"c":this.uniforms[a].value=new Yt().setHex(o.value);break;case"v2":this.uniforms[a].value=new Dt().fromArray(o.value);break;case"v3":this.uniforms[a].value=new ee().fromArray(o.value);break;case"v4":this.uniforms[a].value=new Yn().fromArray(o.value);break;case"m3":this.uniforms[a].value=new Ct().fromArray(o.value);break;case"m4":this.uniforms[a].value=new kn().fromArray(o.value);break;default:this.uniforms[a].value=o.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const a in e.extensions)this.extensions[a]=e.extensions[a];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class r1 extends Cn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class o1 extends _l{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_b,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class l1 extends _l{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const xf=new ee,yf=new gl,Wa=new ee;class wy extends Bi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new kn,this.projectionMatrix=new kn,this.projectionMatrixInverse=new kn,this.coordinateSystem=Za,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(xf,yf,Wa),Wa.x===1&&Wa.y===1&&Wa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xf,yf,Wa.set(1,1,1)).invert()}updateWorldMatrix(e,n,a=!1){super.updateWorldMatrix(e,n,a),this.matrixWorld.decompose(xf,yf,Wa),Wa.x===1&&Wa.y===1&&Wa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xf,yf,Wa.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const mr=new ee,ax=new Dt,sx=new Dt;class ba extends wy{constructor(e=50,n=1,a=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=a,this.far=o,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Um*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(op*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Um*2*Math.atan(Math.tan(op*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,a){mr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(mr.x,mr.y).multiplyScalar(-e/mr.z),mr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(mr.x,mr.y).multiplyScalar(-e/mr.z)}getViewSize(e,n){return this.getViewBounds(e,ax,sx),n.subVectors(sx,ax)}setViewOffset(e,n,a,o,c,u){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(op*.5*this.fov)/this.zoom,a=2*n,o=this.aspect*a,c=-.5*o;const u=this.view;if(this.view!==null&&this.view.enabled){const m=u.fullWidth,d=u.fullHeight;c+=u.offsetX*o/m,n-=u.offsetY*a/d,o*=u.width/m,a*=u.height/d}const p=this.filmOffset;p!==0&&(c+=e*p/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+o,n,n-a,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class sh extends wy{constructor(e=-1,n=1,a=1,o=-1,c=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=a,this.bottom=o,this.near=c,this.far=u,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,a,o,c,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let c=a-e,u=a+e,p=o+n,m=o-n;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=d*this.view.offsetX,u=c+d*this.view.width,p-=v*this.view.offsetY,m=p-v*this.view.height}this.projectionMatrix.makeOrthographic(c,u,p,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const tl=-90,nl=1;class c1 extends Bi{constructor(e,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new ba(tl,nl,e,n);o.layers=this.layers,this.add(o);const c=new ba(tl,nl,e,n);c.layers=this.layers,this.add(c);const u=new ba(tl,nl,e,n);u.layers=this.layers,this.add(u);const p=new ba(tl,nl,e,n);p.layers=this.layers,this.add(p);const m=new ba(tl,nl,e,n);m.layers=this.layers,this.add(m);const d=new ba(tl,nl,e,n);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[a,o,c,u,p,m]=n;for(const d of n)this.remove(d);if(e===Za)a.up.set(0,1,0),a.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),p.up.set(0,1,0),p.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===Wf)a.up.set(0,-1,0),a.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),p.up.set(0,-1,0),p.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of n)this.add(d),d.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,u,p,m,d,v]=this.children,_=e.getRenderTarget(),g=e.getActiveCubeFace(),M=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const C=a.texture.generateMipmaps;a.texture.generateMipmaps=!1;let y=!1;e.isWebGLRenderer===!0?y=e.state.buffers.depth.getReversed():y=e.reversedDepthBuffer,e.setRenderTarget(a,0,o),y&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),e.setRenderTarget(a,1,o),y&&e.autoClear===!1&&e.clearDepth(),e.render(n,u),e.setRenderTarget(a,2,o),y&&e.autoClear===!1&&e.clearDepth(),e.render(n,p),e.setRenderTarget(a,3,o),y&&e.autoClear===!1&&e.clearDepth(),e.render(n,m),e.setRenderTarget(a,4,o),y&&e.autoClear===!1&&e.clearDepth(),e.render(n,d),a.texture.generateMipmaps=C,e.setRenderTarget(a,5,o),y&&e.autoClear===!1&&e.clearDepth(),e.render(n,v),e.setRenderTarget(_,g,M),e.xr.enabled=E,a.texture.needsPMREMUpdate=!0}}class u1 extends ba{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class f1{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=h1.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function h1(){this._document.hidden===!1&&this.reset()}const rx=new kn;class ox{constructor(e,n,a=0,o=1/0){this.ray=new ih(e,n),this.near=a,this.far=o,this.camera=null,this.layers=new $m,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,n.projectionMatrix.elements[14]).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):tn("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return rx.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(rx),this}intersectObject(e,n=!0,a=[]){return Pm(e,this,a,n),a.sort(lx),a}intersectObjects(e,n=!0,a=[]){for(let o=0,c=e.length;o<c;o++)Pm(e[o],this,a,n);return a.sort(lx),a}}function lx(r,e){return r.distance-e.distance}function Pm(r,e,n,a){let o=!0;if(r.layers.test(e.layers)&&r.raycast(e,n)===!1&&(o=!1),o===!0&&a===!0){const c=r.children;for(let u=0,p=c.length;u<p;u++)Pm(c[u],e,n,!0)}}const og=class og{constructor(e,n,a,o){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,a,o)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let a=0;a<4;a++)this.elements[a]=e[a+n];return this}set(e,n,a,o){const c=this.elements;return c[0]=e,c[2]=n,c[1]=a,c[3]=o,this}};og.prototype.isMatrix2=!0;let cx=og;function ux(r,e,n,a){const o=d1(a);switch(n){case py:return r*e;case gy:return r*e/o.components*o.byteLength;case Ym:return r*e/o.components*o.byteLength;case to:return r*e*2/o.components*o.byteLength;case jm:return r*e*2/o.components*o.byteLength;case my:return r*e*3/o.components*o.byteLength;case Pi:return r*e*4/o.components*o.byteLength;case Zm:return r*e*4/o.components*o.byteLength;case Bf:case zf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case If:case Hf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case am:case rm:return Math.max(r,16)*Math.max(e,8)/4;case im:case sm:return Math.max(r,8)*Math.max(e,8)/2;case om:case lm:case um:case fm:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case cm:case Vf:case hm:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case dm:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case pm:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case mm:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case gm:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case vm:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case _m:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case xm:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case ym:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Sm:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Mm:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case bm:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Em:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Tm:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Am:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case wm:case Rm:case Cm:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Dm:case Nm:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Xf:case Lm:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function d1(r){switch(r){case Ea:case uy:return{byteLength:1,components:1};case Nc:case fy:case Di:return{byteLength:2,components:1};case qm:case Wm:return{byteLength:2,components:4};case Qa:case Xm:case qi:return{byteLength:4,components:1};case hy:case dy:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Vm}}));typeof window<"u"&&(window.__THREE__?Mt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Vm);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ry(){let r=null,e=!1,n=null,a=null;function o(c,u){n(c,u),a=r.requestAnimationFrame(o)}return{start:function(){e!==!0&&n!==null&&r!==null&&(a=r.requestAnimationFrame(o),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(a),e=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function p1(r){const e=new WeakMap;function n(p,m){const d=p.array,v=p.usage,_=d.byteLength,g=r.createBuffer();r.bindBuffer(m,g),r.bufferData(m,d,v),p.onUploadCallback();let M;if(d instanceof Float32Array)M=r.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)M=r.HALF_FLOAT;else if(d instanceof Uint16Array)p.isFloat16BufferAttribute?M=r.HALF_FLOAT:M=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)M=r.SHORT;else if(d instanceof Uint32Array)M=r.UNSIGNED_INT;else if(d instanceof Int32Array)M=r.INT;else if(d instanceof Int8Array)M=r.BYTE;else if(d instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:M,bytesPerElement:d.BYTES_PER_ELEMENT,version:p.version,size:_}}function a(p,m,d){const v=m.array,_=m.updateRanges;if(r.bindBuffer(d,p),_.length===0)r.bufferSubData(d,0,v);else{_.sort((M,E)=>M.start-E.start);let g=0;for(let M=1;M<_.length;M++){const E=_[g],C=_[M];C.start<=E.start+E.count+1?E.count=Math.max(E.count,C.start+C.count-E.start):(++g,_[g]=C)}_.length=g+1;for(let M=0,E=_.length;M<E;M++){const C=_[M];r.bufferSubData(d,C.start*v.BYTES_PER_ELEMENT,v,C.start,C.count)}m.clearUpdateRanges()}m.onUploadCallback()}function o(p){return p.isInterleavedBufferAttribute&&(p=p.data),e.get(p)}function c(p){p.isInterleavedBufferAttribute&&(p=p.data);const m=e.get(p);m&&(r.deleteBuffer(m.buffer),e.delete(p))}function u(p,m){if(p.isInterleavedBufferAttribute&&(p=p.data),p.isGLBufferAttribute){const v=e.get(p);(!v||v.version<p.version)&&e.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}const d=e.get(p);if(d===void 0)e.set(p,n(p,m));else if(d.version<p.version){if(d.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(d.buffer,p,m),d.version=p.version}}return{get:o,remove:c,update:u}}var m1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,g1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,v1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,x1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,y1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,S1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,M1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,b1=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,E1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,T1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,A1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,w1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,R1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,C1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,D1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,N1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,L1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,U1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,O1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,P1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,F1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,B1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,z1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,I1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,H1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,G1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,k1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,V1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,X1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,q1="gl_FragColor = linearToOutputTexel( gl_FragColor );",W1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Y1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,j1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Z1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,K1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Q1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,J1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,eE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,iE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,aE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,oE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,lE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,uE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,dE=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,pE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,mE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,gE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vE=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,_E=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,SE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ME=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,EE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,TE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,AE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,RE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,CE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,DE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,NE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,LE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,UE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,OE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,PE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,FE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,BE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,zE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,IE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,HE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,GE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,VE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,XE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,qE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,WE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,YE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ZE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,KE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,QE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,JE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,$E=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,eT=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,tT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nT=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,iT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,aT=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,sT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,oT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lT=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,cT=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,uT=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,fT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,pT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gT=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_T=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ST=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,MT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,bT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ET=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,TT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,AT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,RT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,CT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,DT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,NT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,LT=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,UT=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,OT=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,PT=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,FT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,BT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,IT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,HT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,GT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,VT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,XT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,WT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,YT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zt={alphahash_fragment:m1,alphahash_pars_fragment:g1,alphamap_fragment:v1,alphamap_pars_fragment:_1,alphatest_fragment:x1,alphatest_pars_fragment:y1,aomap_fragment:S1,aomap_pars_fragment:M1,batching_pars_vertex:b1,batching_vertex:E1,begin_vertex:T1,beginnormal_vertex:A1,bsdfs:w1,iridescence_fragment:R1,bumpmap_pars_fragment:C1,clipping_planes_fragment:D1,clipping_planes_pars_fragment:N1,clipping_planes_pars_vertex:L1,clipping_planes_vertex:U1,color_fragment:O1,color_pars_fragment:P1,color_pars_vertex:F1,color_vertex:B1,common:z1,cube_uv_reflection_fragment:I1,defaultnormal_vertex:H1,displacementmap_pars_vertex:G1,displacementmap_vertex:k1,emissivemap_fragment:V1,emissivemap_pars_fragment:X1,colorspace_fragment:q1,colorspace_pars_fragment:W1,envmap_fragment:Y1,envmap_common_pars_fragment:j1,envmap_pars_fragment:Z1,envmap_pars_vertex:K1,envmap_physical_pars_fragment:oE,envmap_vertex:Q1,fog_vertex:J1,fog_pars_vertex:$1,fog_fragment:eE,fog_pars_fragment:tE,gradientmap_pars_fragment:nE,lightmap_pars_fragment:iE,lights_lambert_fragment:aE,lights_lambert_pars_fragment:sE,lights_pars_begin:rE,lights_toon_fragment:lE,lights_toon_pars_fragment:cE,lights_phong_fragment:uE,lights_phong_pars_fragment:fE,lights_physical_fragment:hE,lights_physical_pars_fragment:dE,lights_fragment_begin:pE,lights_fragment_maps:mE,lights_fragment_end:gE,lightprobes_pars_fragment:vE,logdepthbuf_fragment:_E,logdepthbuf_pars_fragment:xE,logdepthbuf_pars_vertex:yE,logdepthbuf_vertex:SE,map_fragment:ME,map_pars_fragment:bE,map_particle_fragment:EE,map_particle_pars_fragment:TE,metalnessmap_fragment:AE,metalnessmap_pars_fragment:wE,morphinstance_vertex:RE,morphcolor_vertex:CE,morphnormal_vertex:DE,morphtarget_pars_vertex:NE,morphtarget_vertex:LE,normal_fragment_begin:UE,normal_fragment_maps:OE,normal_pars_fragment:PE,normal_pars_vertex:FE,normal_vertex:BE,normalmap_pars_fragment:zE,clearcoat_normal_fragment_begin:IE,clearcoat_normal_fragment_maps:HE,clearcoat_pars_fragment:GE,iridescence_pars_fragment:kE,opaque_fragment:VE,packing:XE,premultiplied_alpha_fragment:qE,project_vertex:WE,dithering_fragment:YE,dithering_pars_fragment:jE,roughnessmap_fragment:ZE,roughnessmap_pars_fragment:KE,shadowmap_pars_fragment:QE,shadowmap_pars_vertex:JE,shadowmap_vertex:$E,shadowmask_pars_fragment:eT,skinbase_vertex:tT,skinning_pars_vertex:nT,skinning_vertex:iT,skinnormal_vertex:aT,specularmap_fragment:sT,specularmap_pars_fragment:rT,tonemapping_fragment:oT,tonemapping_pars_fragment:lT,transmission_fragment:cT,transmission_pars_fragment:uT,uv_pars_fragment:fT,uv_pars_vertex:hT,uv_vertex:dT,worldpos_vertex:pT,background_vert:mT,background_frag:gT,backgroundCube_vert:vT,backgroundCube_frag:_T,cube_vert:xT,cube_frag:yT,depth_vert:ST,depth_frag:MT,distance_vert:bT,distance_frag:ET,equirect_vert:TT,equirect_frag:AT,linedashed_vert:wT,linedashed_frag:RT,meshbasic_vert:CT,meshbasic_frag:DT,meshlambert_vert:NT,meshlambert_frag:LT,meshmatcap_vert:UT,meshmatcap_frag:OT,meshnormal_vert:PT,meshnormal_frag:FT,meshphong_vert:BT,meshphong_frag:zT,meshphysical_vert:IT,meshphysical_frag:HT,meshtoon_vert:GT,meshtoon_frag:kT,points_vert:VT,points_frag:XT,shadow_vert:qT,shadow_frag:WT,sprite_vert:YT,sprite_frag:jT},Ke={common:{diffuse:{value:new Yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ct},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ct}},envmap:{envMap:{value:null},envMapRotation:{value:new Ct},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ct},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new ee},probesMax:{value:new ee},probesResolution:{value:new ee}},points:{diffuse:{value:new Yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0},uvTransform:{value:new Ct}},sprite:{diffuse:{value:new Yt(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ct},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0}}},ja={basic:{uniforms:Oi([Ke.common,Ke.specularmap,Ke.envmap,Ke.aomap,Ke.lightmap,Ke.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:Oi([Ke.common,Ke.specularmap,Ke.envmap,Ke.aomap,Ke.lightmap,Ke.emissivemap,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,Ke.fog,Ke.lights,{emissive:{value:new Yt(0)},envMapIntensity:{value:1}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:Oi([Ke.common,Ke.specularmap,Ke.envmap,Ke.aomap,Ke.lightmap,Ke.emissivemap,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,Ke.fog,Ke.lights,{emissive:{value:new Yt(0)},specular:{value:new Yt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:Oi([Ke.common,Ke.envmap,Ke.aomap,Ke.lightmap,Ke.emissivemap,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,Ke.roughnessmap,Ke.metalnessmap,Ke.fog,Ke.lights,{emissive:{value:new Yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:Oi([Ke.common,Ke.aomap,Ke.lightmap,Ke.emissivemap,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,Ke.gradientmap,Ke.fog,Ke.lights,{emissive:{value:new Yt(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:Oi([Ke.common,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,Ke.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:Oi([Ke.points,Ke.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:Oi([Ke.common,Ke.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:Oi([Ke.common,Ke.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:Oi([Ke.common,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:Oi([Ke.sprite,Ke.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ct}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distance:{uniforms:Oi([Ke.common,Ke.displacementmap,{referencePosition:{value:new ee},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distance_vert,fragmentShader:zt.distance_frag},shadow:{uniforms:Oi([Ke.lights,Ke.fog,{color:{value:new Yt(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};ja.physical={uniforms:Oi([ja.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ct},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ct},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ct},sheen:{value:0},sheenColor:{value:new Yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ct},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ct},attenuationDistance:{value:0},attenuationColor:{value:new Yt(0)},specularColor:{value:new Yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ct},anisotropyVector:{value:new Dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ct}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};const Sf={r:0,b:0,g:0},ZT=new kn,Cy=new Ct;Cy.set(-1,0,0,0,1,0,0,0,1);function KT(r,e,n,a,o,c){const u=new Yt(0);let p=o===!0?0:1,m,d,v=null,_=0,g=null;function M(O){let N=O.isScene===!0?O.background:null;if(N&&N.isTexture){const R=O.backgroundBlurriness>0;N=e.get(N,R)}return N}function E(O){let N=!1;const R=M(O);R===null?y(u,p):R&&R.isColor&&(y(R,1),N=!0);const I=r.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,c):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(r.autoClear||N)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function C(O,N){const R=M(N);R&&(R.isCubeTexture||R.mapping===nh)?(d===void 0&&(d=new Ba(new Bc(1,1,1),new Cn({name:"BackgroundCubeMaterial",uniforms:hl(ja.backgroundCube.uniforms),vertexShader:ja.backgroundCube.vertexShader,fragmentShader:ja.backgroundCube.fragmentShader,side:Wi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(I,L,z){this.matrixWorld.copyPosition(z.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(d)),d.material.uniforms.envMap.value=R,d.material.uniforms.backgroundBlurriness.value=N.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(ZT.makeRotationFromEuler(N.backgroundRotation)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(Cy),d.material.toneMapped=Kt.getTransfer(R.colorSpace)!==gn,(v!==R||_!==R.version||g!==r.toneMapping)&&(d.material.needsUpdate=!0,v=R,_=R.version,g=r.toneMapping),d.layers.enableAll(),O.unshift(d,d.geometry,d.material,0,0,null)):R&&R.isTexture&&(m===void 0&&(m=new Ba(new ah(2,2),new Cn({name:"BackgroundMaterial",uniforms:hl(ja.background.uniforms),vertexShader:ja.background.vertexShader,fragmentShader:ja.background.fragmentShader,side:Mr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=R,m.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,m.material.toneMapped=Kt.getTransfer(R.colorSpace)!==gn,R.matrixAutoUpdate===!0&&R.updateMatrix(),m.material.uniforms.uvTransform.value.copy(R.matrix),(v!==R||_!==R.version||g!==r.toneMapping)&&(m.material.needsUpdate=!0,v=R,_=R.version,g=r.toneMapping),m.layers.enableAll(),O.unshift(m,m.geometry,m.material,0,0,null))}function y(O,N){O.getRGB(Sf,Ay(r)),n.buffers.color.setClear(Sf.r,Sf.g,Sf.b,N,c)}function x(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return u},setClearColor:function(O,N=1){u.set(O),p=N,y(u,p)},getClearAlpha:function(){return p},setClearAlpha:function(O){p=O,y(u,p)},render:E,addToRenderList:C,dispose:x}}function QT(r,e){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},o=g(null);let c=o,u=!1;function p(G,Y,de,xe,ae){let H=!1;const k=_(G,xe,de,Y);c!==k&&(c=k,d(c.object)),H=M(G,xe,de,ae),H&&E(G,xe,de,ae),ae!==null&&e.update(ae,r.ELEMENT_ARRAY_BUFFER),(H||u)&&(u=!1,R(G,Y,de,xe),ae!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(ae).buffer))}function m(){return r.createVertexArray()}function d(G){return r.bindVertexArray(G)}function v(G){return r.deleteVertexArray(G)}function _(G,Y,de,xe){const ae=xe.wireframe===!0;let H=a[Y.id];H===void 0&&(H={},a[Y.id]=H);const k=G.isInstancedMesh===!0?G.id:0;let te=H[k];te===void 0&&(te={},H[k]=te);let _e=te[de.id];_e===void 0&&(_e={},te[de.id]=_e);let Ae=_e[ae];return Ae===void 0&&(Ae=g(m()),_e[ae]=Ae),Ae}function g(G){const Y=[],de=[],xe=[];for(let ae=0;ae<n;ae++)Y[ae]=0,de[ae]=0,xe[ae]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Y,enabledAttributes:de,attributeDivisors:xe,object:G,attributes:{},index:null}}function M(G,Y,de,xe){const ae=c.attributes,H=Y.attributes;let k=0;const te=de.getAttributes();for(const _e in te)if(te[_e].location>=0){const P=ae[_e];let Q=H[_e];if(Q===void 0&&(_e==="instanceMatrix"&&G.instanceMatrix&&(Q=G.instanceMatrix),_e==="instanceColor"&&G.instanceColor&&(Q=G.instanceColor)),P===void 0||P.attribute!==Q||Q&&P.data!==Q.data)return!0;k++}return c.attributesNum!==k||c.index!==xe}function E(G,Y,de,xe){const ae={},H=Y.attributes;let k=0;const te=de.getAttributes();for(const _e in te)if(te[_e].location>=0){let P=H[_e];P===void 0&&(_e==="instanceMatrix"&&G.instanceMatrix&&(P=G.instanceMatrix),_e==="instanceColor"&&G.instanceColor&&(P=G.instanceColor));const Q={};Q.attribute=P,P&&P.data&&(Q.data=P.data),ae[_e]=Q,k++}c.attributes=ae,c.attributesNum=k,c.index=xe}function C(){const G=c.newAttributes;for(let Y=0,de=G.length;Y<de;Y++)G[Y]=0}function y(G){x(G,0)}function x(G,Y){const de=c.newAttributes,xe=c.enabledAttributes,ae=c.attributeDivisors;de[G]=1,xe[G]===0&&(r.enableVertexAttribArray(G),xe[G]=1),ae[G]!==Y&&(r.vertexAttribDivisor(G,Y),ae[G]=Y)}function O(){const G=c.newAttributes,Y=c.enabledAttributes;for(let de=0,xe=Y.length;de<xe;de++)Y[de]!==G[de]&&(r.disableVertexAttribArray(de),Y[de]=0)}function N(G,Y,de,xe,ae,H,k){k===!0?r.vertexAttribIPointer(G,Y,de,ae,H):r.vertexAttribPointer(G,Y,de,xe,ae,H)}function R(G,Y,de,xe){C();const ae=xe.attributes,H=de.getAttributes(),k=Y.defaultAttributeValues;for(const te in H){const _e=H[te];if(_e.location>=0){let Ae=ae[te];if(Ae===void 0&&(te==="instanceMatrix"&&G.instanceMatrix&&(Ae=G.instanceMatrix),te==="instanceColor"&&G.instanceColor&&(Ae=G.instanceColor)),Ae!==void 0){const P=Ae.normalized,Q=Ae.itemSize,Ce=e.get(Ae);if(Ce===void 0)continue;const Ie=Ce.buffer,je=Ce.type,re=Ce.bytesPerElement,Se=je===r.INT||je===r.UNSIGNED_INT||Ae.gpuType===Xm;if(Ae.isInterleavedBufferAttribute){const Re=Ae.data,nt=Re.stride,vt=Ae.offset;if(Re.isInstancedInterleavedBuffer){for(let Ze=0;Ze<_e.locationSize;Ze++)x(_e.location+Ze,Re.meshPerAttribute);G.isInstancedMesh!==!0&&xe._maxInstanceCount===void 0&&(xe._maxInstanceCount=Re.meshPerAttribute*Re.count)}else for(let Ze=0;Ze<_e.locationSize;Ze++)y(_e.location+Ze);r.bindBuffer(r.ARRAY_BUFFER,Ie);for(let Ze=0;Ze<_e.locationSize;Ze++)N(_e.location+Ze,Q/_e.locationSize,je,P,nt*re,(vt+Q/_e.locationSize*Ze)*re,Se)}else{if(Ae.isInstancedBufferAttribute){for(let Re=0;Re<_e.locationSize;Re++)x(_e.location+Re,Ae.meshPerAttribute);G.isInstancedMesh!==!0&&xe._maxInstanceCount===void 0&&(xe._maxInstanceCount=Ae.meshPerAttribute*Ae.count)}else for(let Re=0;Re<_e.locationSize;Re++)y(_e.location+Re);r.bindBuffer(r.ARRAY_BUFFER,Ie);for(let Re=0;Re<_e.locationSize;Re++)N(_e.location+Re,Q/_e.locationSize,je,P,Q*re,Q/_e.locationSize*Re*re,Se)}}else if(k!==void 0){const P=k[te];if(P!==void 0)switch(P.length){case 2:r.vertexAttrib2fv(_e.location,P);break;case 3:r.vertexAttrib3fv(_e.location,P);break;case 4:r.vertexAttrib4fv(_e.location,P);break;default:r.vertexAttrib1fv(_e.location,P)}}}}O()}function I(){B();for(const G in a){const Y=a[G];for(const de in Y){const xe=Y[de];for(const ae in xe){const H=xe[ae];for(const k in H)v(H[k].object),delete H[k];delete xe[ae]}}delete a[G]}}function L(G){if(a[G.id]===void 0)return;const Y=a[G.id];for(const de in Y){const xe=Y[de];for(const ae in xe){const H=xe[ae];for(const k in H)v(H[k].object),delete H[k];delete xe[ae]}}delete a[G.id]}function z(G){for(const Y in a){const de=a[Y];for(const xe in de){const ae=de[xe];if(ae[G.id]===void 0)continue;const H=ae[G.id];for(const k in H)v(H[k].object),delete H[k];delete ae[G.id]}}}function T(G){for(const Y in a){const de=a[Y],xe=G.isInstancedMesh===!0?G.id:0,ae=de[xe];if(ae!==void 0){for(const H in ae){const k=ae[H];for(const te in k)v(k[te].object),delete k[te];delete ae[H]}delete de[xe],Object.keys(de).length===0&&delete a[Y]}}}function B(){Z(),u=!0,c!==o&&(c=o,d(c.object))}function Z(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:p,reset:B,resetDefaultState:Z,dispose:I,releaseStatesOfGeometry:L,releaseStatesOfObject:T,releaseStatesOfProgram:z,initAttributes:C,enableAttribute:y,disableUnusedAttributes:O}}function JT(r,e,n){let a;function o(m){a=m}function c(m,d){r.drawArrays(a,m,d),n.update(d,a,1)}function u(m,d,v){v!==0&&(r.drawArraysInstanced(a,m,d,v),n.update(d,a,v))}function p(m,d,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,m,0,d,0,v);let g=0;for(let M=0;M<v;M++)g+=d[M];n.update(g,a,1)}this.setMode=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=p}function $T(r,e,n,a){let o;function c(){if(o!==void 0)return o;if(e.has("EXT_texture_filter_anisotropic")===!0){const z=e.get("EXT_texture_filter_anisotropic");o=r.getParameter(z.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function u(z){return!(z!==Pi&&a.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function p(z){const T=z===Di&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(z!==Ea&&a.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&z!==qi&&!T)}function m(z){if(z==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";z="mediump"}return z==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=n.precision!==void 0?n.precision:"highp";const v=m(d);v!==d&&(Mt("WebGLRenderer:",d,"not supported, using",v,"instead."),d=v);const _=n.logarithmicDepthBuffer===!0,g=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&g===!1&&Mt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const M=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),C=r.getParameter(r.MAX_TEXTURE_SIZE),y=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),x=r.getParameter(r.MAX_VERTEX_ATTRIBS),O=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),N=r.getParameter(r.MAX_VARYING_VECTORS),R=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),I=r.getParameter(r.MAX_SAMPLES),L=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:u,textureTypeReadable:p,precision:d,logarithmicDepthBuffer:_,reversedDepthBuffer:g,maxTextures:M,maxVertexTextures:E,maxTextureSize:C,maxCubemapSize:y,maxAttributes:x,maxVertexUniforms:O,maxVaryings:N,maxFragmentUniforms:R,maxSamples:I,samples:L}}function eA(r){const e=this;let n=null,a=0,o=!1,c=!1;const u=new xr,p=new Ct,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,g){const M=_.length!==0||g||a!==0||o;return o=g,a=_.length,M},this.beginShadows=function(){c=!0,v(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,g){n=v(_,g,0)},this.setState=function(_,g,M){const E=_.clippingPlanes,C=_.clipIntersection,y=_.clipShadows,x=r.get(_);if(!o||E===null||E.length===0||c&&!y)c?v(null):d();else{const O=c?0:a,N=O*4;let R=x.clippingState||null;m.value=R,R=v(E,g,N,M);for(let I=0;I!==N;++I)R[I]=n[I];x.clippingState=R,this.numIntersection=C?this.numPlanes:0,this.numPlanes+=O}};function d(){m.value!==n&&(m.value=n,m.needsUpdate=a>0),e.numPlanes=a,e.numIntersection=0}function v(_,g,M,E){const C=_!==null?_.length:0;let y=null;if(C!==0){if(y=m.value,E!==!0||y===null){const x=M+C*4,O=g.matrixWorldInverse;p.getNormalMatrix(O),(y===null||y.length<x)&&(y=new Float32Array(x));for(let N=0,R=M;N!==C;++N,R+=4)u.copy(_[N]).applyMatrix4(O,p),u.normal.toArray(y,R),y[R+3]=u.constant}m.value=y,m.needsUpdate=!0}return e.numPlanes=C,e.numIntersection=0,y}}const Sr=4,fx=[.125,.215,.35,.446,.526,.582],Kr=20,tA=256,bc=new sh,hx=new Yt;let Lp=null,Up=0,Op=0,Pp=!1;const nA=new ee;class dx{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,a=.1,o=100,c={}){const{size:u=256,position:p=nA}=c;Lp=this._renderer.getRenderTarget(),Up=this._renderer.getActiveCubeFace(),Op=this._renderer.getActiveMipmapLevel(),Pp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(u);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,a,o,m,p),n>0&&this._blur(m,0,0,n),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gx(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mx(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Lp,Up,Op),this._renderer.xr.enabled=Pp,e.scissorTest=!1,il(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===eo||e.mapping===ul?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lp=this._renderer.getRenderTarget(),Up=this._renderer.getActiveCubeFace(),Op=this._renderer.getActiveMipmapLevel(),Pp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=n||this._allocateTargets();return this._textureToCubeUV(e,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:Ci,minFilter:Ci,generateMipmaps:!1,type:Di,format:Pi,colorSpace:Uc,depthBuffer:!1},o=px(e,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=px(e,n,a);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=iA(c)),this._blurMaterial=sA(c,e,n),this._ggxMaterial=aA(c,e,n)}return o}_compileMaterial(e){const n=new Ba(new ri,e);this._renderer.compile(n,bc)}_sceneToCubeUV(e,n,a,o,c){const m=new ba(90,1,n,a),d=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],_=this._renderer,g=_.autoClear,M=_.toneMapping;_.getClearColor(hx),_.toneMapping=Ka,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(o),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ba(new Bc,new eg({name:"PMREM.Background",side:Wi,depthWrite:!1,depthTest:!1})));const C=this._backgroundBox,y=C.material;let x=!1;const O=e.background;O?O.isColor&&(y.color.copy(O),e.background=null,x=!0):(y.color.copy(hx),x=!0);for(let N=0;N<6;N++){const R=N%3;R===0?(m.up.set(0,d[N],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+v[N],c.y,c.z)):R===1?(m.up.set(0,0,d[N]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+v[N],c.z)):(m.up.set(0,d[N],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+v[N]));const I=this._cubeSize;il(o,R*I,N>2?I:0,I,I),_.setRenderTarget(o),x&&_.render(C,m),_.render(e,m)}_.toneMapping=M,_.autoClear=g,e.background=O}_textureToCubeUV(e,n){const a=this._renderer,o=e.mapping===eo||e.mapping===ul;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=gx()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=mx());const c=o?this._cubemapMaterial:this._equirectMaterial,u=this._lodMeshes[0];u.material=c;const p=c.uniforms;p.envMap.value=e;const m=this._cubeSize;il(n,0,0,3*m,2*m),a.setRenderTarget(n),a.render(u,bc)}_applyPMREM(e){const n=this._renderer,a=n.autoClear;n.autoClear=!1;const o=this._lodMeshes.length;for(let c=1;c<o;c++)this._applyGGXFilter(e,c-1,c);n.autoClear=a}_applyGGXFilter(e,n,a){const o=this._renderer,c=this._pingPongRenderTarget,u=this._ggxMaterial,p=this._lodMeshes[a];p.material=u;const m=u.uniforms,d=a/(this._lodMeshes.length-1),v=n/(this._lodMeshes.length-1),_=Math.sqrt(d*d-v*v),g=0+d*1.25,M=_*g,{_lodMax:E}=this,C=this._sizeLods[a],y=3*C*(a>E-Sr?a-E+Sr:0),x=4*(this._cubeSize-C);m.envMap.value=e.texture,m.roughness.value=M,m.mipInt.value=E-n,il(c,y,x,3*C,2*C),o.setRenderTarget(c),o.render(p,bc),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=E-a,il(e,y,x,3*C,2*C),o.setRenderTarget(e),o.render(p,bc)}_blur(e,n,a,o,c){const u=this._pingPongRenderTarget;this._halfBlur(e,u,n,a,o,"latitudinal",c),this._halfBlur(u,e,a,a,o,"longitudinal",c)}_halfBlur(e,n,a,o,c,u,p){const m=this._renderer,d=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&tn("blur direction must be either latitudinal or longitudinal!");const v=3,_=this._lodMeshes[o];_.material=d;const g=d.uniforms,M=this._sizeLods[a]-1,E=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*Kr-1),C=c/E,y=isFinite(c)?1+Math.floor(v*C):Kr;y>Kr&&Mt(`sigmaRadians, ${c}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${Kr}`);const x=[];let O=0;for(let z=0;z<Kr;++z){const T=z/C,B=Math.exp(-T*T/2);x.push(B),z===0?O+=B:z<y&&(O+=2*B)}for(let z=0;z<x.length;z++)x[z]=x[z]/O;g.envMap.value=e.texture,g.samples.value=y,g.weights.value=x,g.latitudinal.value=u==="latitudinal",p&&(g.poleAxis.value=p);const{_lodMax:N}=this;g.dTheta.value=E,g.mipInt.value=N-a;const R=this._sizeLods[o],I=3*R*(o>N-Sr?o-N+Sr:0),L=4*(this._cubeSize-R);il(n,I,L,3*R,2*R),m.setRenderTarget(n),m.render(_,bc)}}function iA(r){const e=[],n=[],a=[];let o=r;const c=r-Sr+1+fx.length;for(let u=0;u<c;u++){const p=Math.pow(2,o);e.push(p);let m=1/p;u>r-Sr?m=fx[u-r+Sr-1]:u===0&&(m=0),n.push(m);const d=1/(p-2),v=-d,_=1+d,g=[v,v,_,v,_,_,v,v,_,_,v,_],M=6,E=6,C=3,y=2,x=1,O=new Float32Array(C*E*M),N=new Float32Array(y*E*M),R=new Float32Array(x*E*M);for(let L=0;L<M;L++){const z=L%3*2/3-1,T=L>2?0:-1,B=[z,T,0,z+2/3,T,0,z+2/3,T+1,0,z,T,0,z+2/3,T+1,0,z,T+1,0];O.set(B,C*E*L),N.set(g,y*E*L);const Z=[L,L,L,L,L,L];R.set(Z,x*E*L)}const I=new ri;I.setAttribute("position",new en(O,C)),I.setAttribute("uv",new en(N,y)),I.setAttribute("faceIndex",new en(R,x)),a.push(new Ba(I,null)),o>Sr&&o--}return{lodMeshes:a,sizeLods:e,sigmas:n}}function px(r,e,n){const a=new _i(r,e,n);return a.texture.mapping=nh,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function il(r,e,n,a,o){r.viewport.set(e,n,a,o),r.scissor.set(e,n,a,o)}function aA(r,e,n){return new Cn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:tA,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:rh(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Fa,depthTest:!1,depthWrite:!1})}function sA(r,e,n){const a=new Float32Array(Kr),o=new ee(0,1,0);return new Cn({name:"SphericalGaussianBlur",defines:{n:Kr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:a},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:rh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Fa,depthTest:!1,depthWrite:!1})}function mx(){return new Cn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Fa,depthTest:!1,depthWrite:!1})}function gx(){return new Cn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fa,depthTest:!1,depthWrite:!1})}function rh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Dy extends _i{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const a={width:e,height:e,depth:1},o=[a,a,a,a,a,a];this.texture=new Ey(o),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},o=new Bc(5,5,5),c=new Cn({name:"CubemapFromEquirect",uniforms:hl(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:Wi,blending:Fa});c.uniforms.tEquirect.value=n;const u=new Ba(o,c),p=n.minFilter;return n.minFilter===Qr&&(n.minFilter=Ci),new c1(1,10,this).update(e,u),n.minFilter=p,u.geometry.dispose(),u.material.dispose(),this}clear(e,n=!0,a=!0,o=!0){const c=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(n,a,o);e.setRenderTarget(c)}}function rA(r){let e=new WeakMap,n=new WeakMap,a=null;function o(g,M=!1){return g==null?null:M?u(g):c(g)}function c(g){if(g&&g.isTexture){const M=g.mapping;if(M===ap||M===sp)if(e.has(g)){const E=e.get(g).texture;return p(E,g.mapping)}else{const E=g.image;if(E&&E.height>0){const C=new Dy(E.height);return C.fromEquirectangularTexture(r,g),e.set(g,C),g.addEventListener("dispose",d),p(C.texture,g.mapping)}else return null}}return g}function u(g){if(g&&g.isTexture){const M=g.mapping,E=M===ap||M===sp,C=M===eo||M===ul;if(E||C){let y=n.get(g);const x=y!==void 0?y.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==x)return a===null&&(a=new dx(r)),y=E?a.fromEquirectangular(g,y):a.fromCubemap(g,y),y.texture.pmremVersion=g.pmremVersion,n.set(g,y),y.texture;if(y!==void 0)return y.texture;{const O=g.image;return E&&O&&O.height>0||C&&O&&m(O)?(a===null&&(a=new dx(r)),y=E?a.fromEquirectangular(g):a.fromCubemap(g),y.texture.pmremVersion=g.pmremVersion,n.set(g,y),g.addEventListener("dispose",v),y.texture):null}}}return g}function p(g,M){return M===ap?g.mapping=eo:M===sp&&(g.mapping=ul),g}function m(g){let M=0;const E=6;for(let C=0;C<E;C++)g[C]!==void 0&&M++;return M===E}function d(g){const M=g.target;M.removeEventListener("dispose",d);const E=e.get(M);E!==void 0&&(e.delete(M),E.dispose())}function v(g){const M=g.target;M.removeEventListener("dispose",v);const E=n.get(M);E!==void 0&&(n.delete(M),E.dispose())}function _(){e=new WeakMap,n=new WeakMap,a!==null&&(a.dispose(),a=null)}return{get:o,dispose:_}}function oA(r){const e={};function n(a){if(e[a]!==void 0)return e[a];const o=r.getExtension(a);return e[a]=o,o}return{has:function(a){return n(a)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(a){const o=n(a);return o===null&&ol("WebGLRenderer: "+a+" extension not supported."),o}}}function lA(r,e,n,a){const o={},c=new WeakMap;function u(_){const g=_.target;g.index!==null&&e.remove(g.index);for(const E in g.attributes)e.remove(g.attributes[E]);g.removeEventListener("dispose",u),delete o[g.id];const M=c.get(g);M&&(e.remove(M),c.delete(g)),a.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,n.memory.geometries--}function p(_,g){return o[g.id]===!0||(g.addEventListener("dispose",u),o[g.id]=!0,n.memory.geometries++),g}function m(_){const g=_.attributes;for(const M in g)e.update(g[M],r.ARRAY_BUFFER)}function d(_){const g=[],M=_.index,E=_.attributes.position;let C=0;if(E===void 0)return;if(M!==null){const O=M.array;C=M.version;for(let N=0,R=O.length;N<R;N+=3){const I=O[N+0],L=O[N+1],z=O[N+2];g.push(I,L,L,z,z,I)}}else{const O=E.array;C=E.version;for(let N=0,R=O.length/3-1;N<R;N+=3){const I=N+0,L=N+1,z=N+2;g.push(I,L,L,z,z,I)}}const y=new(E.count>=65535?My:Sy)(g,1);y.version=C;const x=c.get(_);x&&e.remove(x),c.set(_,y)}function v(_){const g=c.get(_);if(g){const M=_.index;M!==null&&g.version<M.version&&d(_)}else d(_);return c.get(_)}return{get:p,update:m,getWireframeAttribute:v}}function cA(r,e,n){let a;function o(_){a=_}let c,u;function p(_){c=_.type,u=_.bytesPerElement}function m(_,g){r.drawElements(a,g,c,_*u),n.update(g,a,1)}function d(_,g,M){M!==0&&(r.drawElementsInstanced(a,g,c,_*u,M),n.update(g,a,M))}function v(_,g,M){if(M===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,g,0,c,_,0,M);let C=0;for(let y=0;y<M;y++)C+=g[y];n.update(C,a,1)}this.setMode=o,this.setIndex=p,this.render=m,this.renderInstances=d,this.renderMultiDraw=v}function uA(r){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,u,p){switch(n.calls++,u){case r.TRIANGLES:n.triangles+=p*(c/3);break;case r.LINES:n.lines+=p*(c/2);break;case r.LINE_STRIP:n.lines+=p*(c-1);break;case r.LINE_LOOP:n.lines+=p*c;break;case r.POINTS:n.points+=p*c;break;default:tn("WebGLInfo: Unknown draw mode:",u);break}}function o(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:o,update:a}}function fA(r,e,n){const a=new WeakMap,o=new Yn;function c(u,p,m){const d=u.morphTargetInfluences,v=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,_=v!==void 0?v.length:0;let g=a.get(p);if(g===void 0||g.count!==_){let B=function(){z.dispose(),a.delete(p),p.removeEventListener("dispose",B)};g!==void 0&&g.texture.dispose();const M=p.morphAttributes.position!==void 0,E=p.morphAttributes.normal!==void 0,C=p.morphAttributes.color!==void 0,y=p.morphAttributes.position||[],x=p.morphAttributes.normal||[],O=p.morphAttributes.color||[];let N=0;M===!0&&(N=1),E===!0&&(N=2),C===!0&&(N=3);let R=p.attributes.position.count*N,I=1;R>e.maxTextureSize&&(I=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const L=new Float32Array(R*I*4*_),z=new _y(L,R,I,_);z.type=qi,z.needsUpdate=!0;const T=N*4;for(let Z=0;Z<_;Z++){const G=y[Z],Y=x[Z],de=O[Z],xe=R*I*4*Z;for(let ae=0;ae<G.count;ae++){const H=ae*T;M===!0&&(o.fromBufferAttribute(G,ae),L[xe+H+0]=o.x,L[xe+H+1]=o.y,L[xe+H+2]=o.z,L[xe+H+3]=0),E===!0&&(o.fromBufferAttribute(Y,ae),L[xe+H+4]=o.x,L[xe+H+5]=o.y,L[xe+H+6]=o.z,L[xe+H+7]=0),C===!0&&(o.fromBufferAttribute(de,ae),L[xe+H+8]=o.x,L[xe+H+9]=o.y,L[xe+H+10]=o.z,L[xe+H+11]=de.itemSize===4?o.w:1)}}g={count:_,texture:z,size:new Dt(R,I)},a.set(p,g),p.addEventListener("dispose",B)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",u.morphTexture,n);else{let M=0;for(let C=0;C<d.length;C++)M+=d[C];const E=p.morphTargetsRelative?1:1-M;m.getUniforms().setValue(r,"morphTargetBaseInfluence",E),m.getUniforms().setValue(r,"morphTargetInfluences",d)}m.getUniforms().setValue(r,"morphTargetsTexture",g.texture,n),m.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function hA(r,e,n,a,o){let c=new WeakMap;function u(d){const v=o.render.frame,_=d.geometry,g=e.get(d,_);if(c.get(g)!==v&&(e.update(g),c.set(g,v)),d.isInstancedMesh&&(d.hasEventListener("dispose",m)===!1&&d.addEventListener("dispose",m),c.get(d)!==v&&(n.update(d.instanceMatrix,r.ARRAY_BUFFER),d.instanceColor!==null&&n.update(d.instanceColor,r.ARRAY_BUFFER),c.set(d,v))),d.isSkinnedMesh){const M=d.skeleton;c.get(M)!==v&&(M.update(),c.set(M,v))}return g}function p(){c=new WeakMap}function m(d){const v=d.target;v.removeEventListener("dispose",m),a.releaseStatesOfObject(v),n.remove(v.instanceMatrix),v.instanceColor!==null&&n.remove(v.instanceColor)}return{update:u,dispose:p}}const dA={[ny]:"LINEAR_TONE_MAPPING",[iy]:"REINHARD_TONE_MAPPING",[ay]:"CINEON_TONE_MAPPING",[sy]:"ACES_FILMIC_TONE_MAPPING",[oy]:"AGX_TONE_MAPPING",[ly]:"NEUTRAL_TONE_MAPPING",[ry]:"CUSTOM_TONE_MAPPING"};function pA(r,e,n,a,o,c){const u=new _i(e,n,{type:r,depthBuffer:o,stencilBuffer:c,samples:a?4:0,depthTexture:o?new fl(e,n):void 0}),p=new _i(e,n,{type:Di,depthBuffer:!1,stencilBuffer:!1}),m=new ri;m.setAttribute("position",new ra([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new ra([0,2,0,0,2,0],2));const d=new r1({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),v=new Ba(m,d),_=new sh(-1,1,1,-1,0,1);let g=null,M=null,E=!1,C,y=null,x=[],O=!1;this.setSize=function(N,R){u.setSize(N,R),p.setSize(N,R);for(let I=0;I<x.length;I++){const L=x[I];L.setSize&&L.setSize(N,R)}},this.setEffects=function(N){x=N,O=x.length>0&&x[0].isRenderPass===!0;const R=u.width,I=u.height;for(let L=0;L<x.length;L++){const z=x[L];z.setSize&&z.setSize(R,I)}},this.begin=function(N,R){if(E||N.toneMapping===Ka&&x.length===0)return!1;if(y=R,R!==null){const I=R.width,L=R.height;(u.width!==I||u.height!==L)&&this.setSize(I,L)}return O===!1&&N.setRenderTarget(u),C=N.toneMapping,N.toneMapping=Ka,!0},this.hasRenderPass=function(){return O},this.end=function(N,R){N.toneMapping=C,E=!0;let I=u,L=p;for(let z=0;z<x.length;z++){const T=x[z];if(T.enabled!==!1&&(T.render(N,L,I,R),T.needsSwap!==!1)){const B=I;I=L,L=B}}if(g!==N.outputColorSpace||M!==N.toneMapping){g=N.outputColorSpace,M=N.toneMapping,d.defines={},Kt.getTransfer(g)===gn&&(d.defines.SRGB_TRANSFER="");const z=dA[M];z&&(d.defines[z]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=I.texture,N.setRenderTarget(y),N.render(v,_),y=null,E=!1},this.isCompositing=function(){return E},this.dispose=function(){u.depthTexture&&u.depthTexture.dispose(),u.dispose(),p.dispose(),m.dispose(),d.dispose()}}const Ny=new Fi,Fm=new fl(1,1),Ly=new _y,Uy=new Fb,Oy=new Ey,vx=[],_x=[],xx=new Float32Array(16),yx=new Float32Array(9),Sx=new Float32Array(4);function xl(r,e,n){const a=r[0];if(a<=0||a>0)return r;const o=e*n;let c=vx[o];if(c===void 0&&(c=new Float32Array(o),vx[o]=c),e!==0){a.toArray(c,0);for(let u=1,p=0;u!==e;++u)p+=n,r[u].toArray(c,p)}return c}function oi(r,e){if(r.length!==e.length)return!1;for(let n=0,a=r.length;n<a;n++)if(r[n]!==e[n])return!1;return!0}function li(r,e){for(let n=0,a=e.length;n<a;n++)r[n]=e[n]}function oh(r,e){let n=_x[e];n===void 0&&(n=new Int32Array(e),_x[e]=n);for(let a=0;a!==e;++a)n[a]=r.allocateTextureUnit();return n}function mA(r,e){const n=this.cache;n[0]!==e&&(r.uniform1f(this.addr,e),n[0]=e)}function gA(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(oi(n,e))return;r.uniform2fv(this.addr,e),li(n,e)}}function vA(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(oi(n,e))return;r.uniform3fv(this.addr,e),li(n,e)}}function _A(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(oi(n,e))return;r.uniform4fv(this.addr,e),li(n,e)}}function xA(r,e){const n=this.cache,a=e.elements;if(a===void 0){if(oi(n,e))return;r.uniformMatrix2fv(this.addr,!1,e),li(n,e)}else{if(oi(n,a))return;Sx.set(a),r.uniformMatrix2fv(this.addr,!1,Sx),li(n,a)}}function yA(r,e){const n=this.cache,a=e.elements;if(a===void 0){if(oi(n,e))return;r.uniformMatrix3fv(this.addr,!1,e),li(n,e)}else{if(oi(n,a))return;yx.set(a),r.uniformMatrix3fv(this.addr,!1,yx),li(n,a)}}function SA(r,e){const n=this.cache,a=e.elements;if(a===void 0){if(oi(n,e))return;r.uniformMatrix4fv(this.addr,!1,e),li(n,e)}else{if(oi(n,a))return;xx.set(a),r.uniformMatrix4fv(this.addr,!1,xx),li(n,a)}}function MA(r,e){const n=this.cache;n[0]!==e&&(r.uniform1i(this.addr,e),n[0]=e)}function bA(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(oi(n,e))return;r.uniform2iv(this.addr,e),li(n,e)}}function EA(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(oi(n,e))return;r.uniform3iv(this.addr,e),li(n,e)}}function TA(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(oi(n,e))return;r.uniform4iv(this.addr,e),li(n,e)}}function AA(r,e){const n=this.cache;n[0]!==e&&(r.uniform1ui(this.addr,e),n[0]=e)}function wA(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(oi(n,e))return;r.uniform2uiv(this.addr,e),li(n,e)}}function RA(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(oi(n,e))return;r.uniform3uiv(this.addr,e),li(n,e)}}function CA(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(oi(n,e))return;r.uniform4uiv(this.addr,e),li(n,e)}}function DA(r,e,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o);let c;this.type===r.SAMPLER_2D_SHADOW?(Fm.compareFunction=n.isReversedDepthBuffer()?Qm:Km,c=Fm):c=Ny,n.setTexture2D(e||c,o)}function NA(r,e,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture3D(e||Uy,o)}function LA(r,e,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTextureCube(e||Oy,o)}function UA(r,e,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture2DArray(e||Ly,o)}function OA(r){switch(r){case 5126:return mA;case 35664:return gA;case 35665:return vA;case 35666:return _A;case 35674:return xA;case 35675:return yA;case 35676:return SA;case 5124:case 35670:return MA;case 35667:case 35671:return bA;case 35668:case 35672:return EA;case 35669:case 35673:return TA;case 5125:return AA;case 36294:return wA;case 36295:return RA;case 36296:return CA;case 35678:case 36198:case 36298:case 36306:case 35682:return DA;case 35679:case 36299:case 36307:return NA;case 35680:case 36300:case 36308:case 36293:return LA;case 36289:case 36303:case 36311:case 36292:return UA}}function PA(r,e){r.uniform1fv(this.addr,e)}function FA(r,e){const n=xl(e,this.size,2);r.uniform2fv(this.addr,n)}function BA(r,e){const n=xl(e,this.size,3);r.uniform3fv(this.addr,n)}function zA(r,e){const n=xl(e,this.size,4);r.uniform4fv(this.addr,n)}function IA(r,e){const n=xl(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function HA(r,e){const n=xl(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function GA(r,e){const n=xl(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function kA(r,e){r.uniform1iv(this.addr,e)}function VA(r,e){r.uniform2iv(this.addr,e)}function XA(r,e){r.uniform3iv(this.addr,e)}function qA(r,e){r.uniform4iv(this.addr,e)}function WA(r,e){r.uniform1uiv(this.addr,e)}function YA(r,e){r.uniform2uiv(this.addr,e)}function jA(r,e){r.uniform3uiv(this.addr,e)}function ZA(r,e){r.uniform4uiv(this.addr,e)}function KA(r,e,n){const a=this.cache,o=e.length,c=oh(n,o);oi(a,c)||(r.uniform1iv(this.addr,c),li(a,c));let u;this.type===r.SAMPLER_2D_SHADOW?u=Fm:u=Ny;for(let p=0;p!==o;++p)n.setTexture2D(e[p]||u,c[p])}function QA(r,e,n){const a=this.cache,o=e.length,c=oh(n,o);oi(a,c)||(r.uniform1iv(this.addr,c),li(a,c));for(let u=0;u!==o;++u)n.setTexture3D(e[u]||Uy,c[u])}function JA(r,e,n){const a=this.cache,o=e.length,c=oh(n,o);oi(a,c)||(r.uniform1iv(this.addr,c),li(a,c));for(let u=0;u!==o;++u)n.setTextureCube(e[u]||Oy,c[u])}function $A(r,e,n){const a=this.cache,o=e.length,c=oh(n,o);oi(a,c)||(r.uniform1iv(this.addr,c),li(a,c));for(let u=0;u!==o;++u)n.setTexture2DArray(e[u]||Ly,c[u])}function ew(r){switch(r){case 5126:return PA;case 35664:return FA;case 35665:return BA;case 35666:return zA;case 35674:return IA;case 35675:return HA;case 35676:return GA;case 5124:case 35670:return kA;case 35667:case 35671:return VA;case 35668:case 35672:return XA;case 35669:case 35673:return qA;case 5125:return WA;case 36294:return YA;case 36295:return jA;case 36296:return ZA;case 35678:case 36198:case 36298:case 36306:case 35682:return KA;case 35679:case 36299:case 36307:return QA;case 35680:case 36300:case 36308:case 36293:return JA;case 36289:case 36303:case 36311:case 36292:return $A}}class tw{constructor(e,n,a){this.id=e,this.addr=a,this.cache=[],this.type=n.type,this.setValue=OA(n.type)}}class nw{constructor(e,n,a){this.id=e,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=ew(n.type)}}class iw{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,a){const o=this.seq;for(let c=0,u=o.length;c!==u;++c){const p=o[c];p.setValue(e,n[p.id],a)}}}const Fp=/(\w+)(\])?(\[|\.)?/g;function Mx(r,e){r.seq.push(e),r.map[e.id]=e}function aw(r,e,n){const a=r.name,o=a.length;for(Fp.lastIndex=0;;){const c=Fp.exec(a),u=Fp.lastIndex;let p=c[1];const m=c[2]==="]",d=c[3];if(m&&(p=p|0),d===void 0||d==="["&&u+2===o){Mx(n,d===void 0?new tw(p,r,e):new nw(p,r,e));break}else{let _=n.map[p];_===void 0&&(_=new iw(p),Mx(n,_)),n=_}}}class Gf{constructor(e,n){this.seq=[],this.map={};const a=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let u=0;u<a;++u){const p=e.getActiveUniform(n,u),m=e.getUniformLocation(n,p.name);aw(p,m,this)}const o=[],c=[];for(const u of this.seq)u.type===e.SAMPLER_2D_SHADOW||u.type===e.SAMPLER_CUBE_SHADOW||u.type===e.SAMPLER_2D_ARRAY_SHADOW?o.push(u):c.push(u);o.length>0&&(this.seq=o.concat(c))}setValue(e,n,a,o){const c=this.map[n];c!==void 0&&c.setValue(e,a,o)}setOptional(e,n,a){const o=n[a];o!==void 0&&this.setValue(e,a,o)}static upload(e,n,a,o){for(let c=0,u=n.length;c!==u;++c){const p=n[c],m=a[p.id];m.needsUpdate!==!1&&p.setValue(e,m.value,o)}}static seqWithValue(e,n){const a=[];for(let o=0,c=e.length;o!==c;++o){const u=e[o];u.id in n&&a.push(u)}return a}}function bx(r,e,n){const a=r.createShader(e);return r.shaderSource(a,n),r.compileShader(a),a}const sw=37297;let rw=0;function ow(r,e){const n=r.split(`
`),a=[],o=Math.max(e-6,0),c=Math.min(e+6,n.length);for(let u=o;u<c;u++){const p=u+1;a.push(`${p===e?">":" "} ${p}: ${n[u]}`)}return a.join(`
`)}const Ex=new Ct;function lw(r){Kt._getMatrix(Ex,Kt.workingColorSpace,r);const e=`mat3( ${Ex.elements.map(n=>n.toFixed(4))} )`;switch(Kt.getTransfer(r)){case qf:return[e,"LinearTransferOETF"];case gn:return[e,"sRGBTransferOETF"];default:return Mt("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Tx(r,e,n){const a=r.getShaderParameter(e,r.COMPILE_STATUS),c=(r.getShaderInfoLog(e)||"").trim();if(a&&c==="")return"";const u=/ERROR: 0:(\d+)/.exec(c);if(u){const p=parseInt(u[1]);return n.toUpperCase()+`

`+c+`

`+ow(r.getShaderSource(e),p)}else return c}function cw(r,e){const n=lw(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const uw={[ny]:"Linear",[iy]:"Reinhard",[ay]:"Cineon",[sy]:"ACESFilmic",[oy]:"AgX",[ly]:"Neutral",[ry]:"Custom"};function fw(r,e){const n=uw[e];return n===void 0?(Mt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Mf=new ee;function hw(){Kt.getLuminanceCoefficients(Mf);const r=Mf.x.toFixed(4),e=Mf.y.toFixed(4),n=Mf.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function dw(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Dc).join(`
`)}function pw(r){const e=[];for(const n in r){const a=r[n];a!==!1&&e.push("#define "+n+" "+a)}return e.join(`
`)}function mw(r,e){const n={},a=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let o=0;o<a;o++){const c=r.getActiveAttrib(e,o),u=c.name;let p=1;c.type===r.FLOAT_MAT2&&(p=2),c.type===r.FLOAT_MAT3&&(p=3),c.type===r.FLOAT_MAT4&&(p=4),n[u]={type:c.type,location:r.getAttribLocation(e,u),locationSize:p}}return n}function Dc(r){return r!==""}function Ax(r,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function wx(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const gw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bm(r){return r.replace(gw,_w)}const vw=new Map;function _w(r,e){let n=zt[e];if(n===void 0){const a=vw.get(e);if(a!==void 0)n=zt[a],Mt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,a);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Bm(n)}const xw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rx(r){return r.replace(xw,yw)}function yw(r,e,n,a){let o="";for(let c=parseInt(e);c<parseInt(n);c++)o+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return o}function Cx(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Sw={[Ff]:"SHADOWMAP_TYPE_PCF",[Rc]:"SHADOWMAP_TYPE_VSM"};function Mw(r){return Sw[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const bw={[eo]:"ENVMAP_TYPE_CUBE",[ul]:"ENVMAP_TYPE_CUBE",[nh]:"ENVMAP_TYPE_CUBE_UV"};function Ew(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":bw[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const Tw={[ul]:"ENVMAP_MODE_REFRACTION"};function Aw(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":Tw[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const ww={[ty]:"ENVMAP_BLENDING_MULTIPLY",[mb]:"ENVMAP_BLENDING_MIX",[gb]:"ENVMAP_BLENDING_ADD"};function Rw(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":ww[r.combine]||"ENVMAP_BLENDING_NONE"}function Cw(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,a=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function Dw(r,e,n,a){const o=r.getContext(),c=n.defines;let u=n.vertexShader,p=n.fragmentShader;const m=Mw(n),d=Ew(n),v=Aw(n),_=Rw(n),g=Cw(n),M=dw(n),E=pw(c),C=o.createProgram();let y,x,O=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(y=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(Dc).join(`
`),y.length>0&&(y+=`
`),x=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(Dc).join(`
`),x.length>0&&(x+=`
`)):(y=[Cx(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+v:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Dc).join(`
`),x=[Cx(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.envMap?"#define "+v:"",n.envMap?"#define "+_:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ka?"#define TONE_MAPPING":"",n.toneMapping!==Ka?zt.tonemapping_pars_fragment:"",n.toneMapping!==Ka?fw("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,cw("linearToOutputTexel",n.outputColorSpace),hw(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Dc).join(`
`)),u=Bm(u),u=Ax(u,n),u=wx(u,n),p=Bm(p),p=Ax(p,n),p=wx(p,n),u=Rx(u),p=Rx(p),n.isRawShaderMaterial!==!0&&(O=`#version 300 es
`,y=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,x=["#define varying in",n.glslVersion===O_?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===O_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const N=O+y+u,R=O+x+p,I=bx(o,o.VERTEX_SHADER,N),L=bx(o,o.FRAGMENT_SHADER,R);o.attachShader(C,I),o.attachShader(C,L),n.index0AttributeName!==void 0?o.bindAttribLocation(C,0,n.index0AttributeName):n.hasPositionAttribute===!0&&o.bindAttribLocation(C,0,"position"),o.linkProgram(C);function z(G){if(r.debug.checkShaderErrors){const Y=o.getProgramInfoLog(C)||"",de=o.getShaderInfoLog(I)||"",xe=o.getShaderInfoLog(L)||"",ae=Y.trim(),H=de.trim(),k=xe.trim();let te=!0,_e=!0;if(o.getProgramParameter(C,o.LINK_STATUS)===!1)if(te=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(o,C,I,L);else{const Ae=Tx(o,I,"vertex"),P=Tx(o,L,"fragment");tn("WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(C,o.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+ae+`
`+Ae+`
`+P)}else ae!==""?Mt("WebGLProgram: Program Info Log:",ae):(H===""||k==="")&&(_e=!1);_e&&(G.diagnostics={runnable:te,programLog:ae,vertexShader:{log:H,prefix:y},fragmentShader:{log:k,prefix:x}})}o.deleteShader(I),o.deleteShader(L),T=new Gf(o,C),B=mw(o,C)}let T;this.getUniforms=function(){return T===void 0&&z(this),T};let B;this.getAttributes=function(){return B===void 0&&z(this),B};let Z=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return Z===!1&&(Z=o.getProgramParameter(C,sw)),Z},this.destroy=function(){a.releaseStatesOfProgram(this),o.deleteProgram(C),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=rw++,this.cacheKey=e,this.usedTimes=1,this.program=C,this.vertexShader=I,this.fragmentShader=L,this}let Nw=0;class Lw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,a){const o=this._getShaderCacheForMaterial(e);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let a=n.get(e);return a===void 0&&(a=new Set,n.set(e,a)),a}_getShaderStage(e){const n=this.shaderCache;let a=n.get(e);return a===void 0&&(a=new Uw(e),n.set(e,a)),a}}class Uw{constructor(e){this.id=Nw++,this.code=e,this.usedTimes=0}}function Ow(r){return r===to||r===Vf||r===Xf}function Pw(r,e,n,a,o,c){const u=new $m,p=new Lw,m=new Set,d=[],v=new Map,_=a.logarithmicDepthBuffer;let g=a.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(T){return m.add(T),T===0?"uv":`uv${T}`}function C(T,B,Z,G,Y,de){const xe=G.fog,ae=Y.geometry,H=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?G.environment:null,k=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,te=e.get(T.envMap||H,k),_e=te&&te.mapping===nh?te.image.height:null,Ae=M[T.type];T.precision!==null&&(g=a.getMaxPrecision(T.precision),g!==T.precision&&Mt("WebGLProgram.getParameters:",T.precision,"not supported, using",g,"instead."));const P=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,Q=P!==void 0?P.length:0;let Ce=0;ae.morphAttributes.position!==void 0&&(Ce=1),ae.morphAttributes.normal!==void 0&&(Ce=2),ae.morphAttributes.color!==void 0&&(Ce=3);let Ie,je,re,Se;if(Ae){const Qe=ja[Ae];Ie=Qe.vertexShader,je=Qe.fragmentShader}else{Ie=T.vertexShader,je=T.fragmentShader;const Qe=p.getVertexShaderStage(T),Sn=p.getFragmentShaderStage(T);p.update(T,Qe,Sn),re=Qe.id,Se=Sn.id}const Re=r.getRenderTarget(),nt=r.state.buffers.depth.getReversed(),vt=Y.isInstancedMesh===!0,Ze=Y.isBatchedMesh===!0,yn=!!T.map,Ot=!!T.matcap,Vt=!!te,Xt=!!T.aoMap,It=!!T.lightMap,Dn=!!T.bumpMap&&T.wireframe===!1,Nn=!!T.normalMap,Ln=!!T.displacementMap,Hn=!!T.emissiveMap,dn=!!T.metalnessMap,Un=!!T.roughnessMap,j=T.anisotropy>0,nn=T.clearcoat>0,an=T.dispersion>0,U=T.iridescence>0,b=T.sheen>0,$=T.transmission>0,he=j&&!!T.anisotropyMap,ve=nn&&!!T.clearcoatMap,Oe=nn&&!!T.clearcoatNormalMap,Ge=nn&&!!T.clearcoatRoughnessMap,me=U&&!!T.iridescenceMap,ye=U&&!!T.iridescenceThicknessMap,He=b&&!!T.sheenColorMap,$e=b&&!!T.sheenRoughnessMap,qe=!!T.specularMap,ke=!!T.specularColorMap,ht=!!T.specularIntensityMap,pt=$&&!!T.transmissionMap,_t=$&&!!T.thicknessMap,q=!!T.gradientMap,ze=!!T.alphaMap,Me=T.alphaTest>0,Fe=!!T.alphaHash,We=!!T.extensions;let we=Ka;T.toneMapped&&(Re===null||Re.isXRRenderTarget===!0)&&(we=r.toneMapping);const De={shaderID:Ae,shaderType:T.type,shaderName:T.name,vertexShader:Ie,fragmentShader:je,defines:T.defines,customVertexShaderID:re,customFragmentShaderID:Se,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:g,batching:Ze,batchingColor:Ze&&Y._colorsTexture!==null,instancing:vt,instancingColor:vt&&Y.instanceColor!==null,instancingMorph:vt&&Y.morphTexture!==null,outputColorSpace:Re===null?r.outputColorSpace:Re.isXRRenderTarget===!0?Re.texture.colorSpace:Kt.workingColorSpace,alphaToCoverage:!!T.alphaToCoverage,map:yn,matcap:Ot,envMap:Vt,envMapMode:Vt&&te.mapping,envMapCubeUVHeight:_e,aoMap:Xt,lightMap:It,bumpMap:Dn,normalMap:Nn,displacementMap:Ln,emissiveMap:Hn,normalMapObjectSpace:Nn&&T.normalMapType===xb,normalMapTangentSpace:Nn&&T.normalMapType===N_,packedNormalMap:Nn&&T.normalMapType===N_&&Ow(T.normalMap.format),metalnessMap:dn,roughnessMap:Un,anisotropy:j,anisotropyMap:he,clearcoat:nn,clearcoatMap:ve,clearcoatNormalMap:Oe,clearcoatRoughnessMap:Ge,dispersion:an,iridescence:U,iridescenceMap:me,iridescenceThicknessMap:ye,sheen:b,sheenColorMap:He,sheenRoughnessMap:$e,specularMap:qe,specularColorMap:ke,specularIntensityMap:ht,transmission:$,transmissionMap:pt,thicknessMap:_t,gradientMap:q,opaque:T.transparent===!1&&T.blending===rl&&T.alphaToCoverage===!1,alphaMap:ze,alphaTest:Me,alphaHash:Fe,combine:T.combine,mapUv:yn&&E(T.map.channel),aoMapUv:Xt&&E(T.aoMap.channel),lightMapUv:It&&E(T.lightMap.channel),bumpMapUv:Dn&&E(T.bumpMap.channel),normalMapUv:Nn&&E(T.normalMap.channel),displacementMapUv:Ln&&E(T.displacementMap.channel),emissiveMapUv:Hn&&E(T.emissiveMap.channel),metalnessMapUv:dn&&E(T.metalnessMap.channel),roughnessMapUv:Un&&E(T.roughnessMap.channel),anisotropyMapUv:he&&E(T.anisotropyMap.channel),clearcoatMapUv:ve&&E(T.clearcoatMap.channel),clearcoatNormalMapUv:Oe&&E(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ge&&E(T.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&E(T.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&E(T.iridescenceThicknessMap.channel),sheenColorMapUv:He&&E(T.sheenColorMap.channel),sheenRoughnessMapUv:$e&&E(T.sheenRoughnessMap.channel),specularMapUv:qe&&E(T.specularMap.channel),specularColorMapUv:ke&&E(T.specularColorMap.channel),specularIntensityMapUv:ht&&E(T.specularIntensityMap.channel),transmissionMapUv:pt&&E(T.transmissionMap.channel),thicknessMapUv:_t&&E(T.thicknessMap.channel),alphaMapUv:ze&&E(T.alphaMap.channel),vertexTangents:!!ae.attributes.tangent&&(Nn||j),vertexNormals:!!ae.attributes.normal,vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!ae.attributes.uv&&(yn||ze),fog:!!xe,useFog:T.fog===!0,fogExp2:!!xe&&xe.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||ae.attributes.normal===void 0&&Nn===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:nt,skinning:Y.isSkinnedMesh===!0,hasPositionAttribute:ae.attributes.position!==void 0,morphTargets:ae.morphAttributes.position!==void 0,morphNormals:ae.morphAttributes.normal!==void 0,morphColors:ae.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:Ce,numDirLights:B.directional.length,numPointLights:B.point.length,numSpotLights:B.spot.length,numSpotLightMaps:B.spotLightMap.length,numRectAreaLights:B.rectArea.length,numHemiLights:B.hemi.length,numDirLightShadows:B.directionalShadowMap.length,numPointLightShadows:B.pointShadowMap.length,numSpotLightShadows:B.spotShadowMap.length,numSpotLightShadowsWithMaps:B.numSpotLightShadowsWithMaps,numLightProbes:B.numLightProbes,numLightProbeGrids:de.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:T.dithering,shadowMapEnabled:r.shadowMap.enabled&&Z.length>0,shadowMapType:r.shadowMap.type,toneMapping:we,decodeVideoTexture:yn&&T.map.isVideoTexture===!0&&Kt.getTransfer(T.map.colorSpace)===gn,decodeVideoTextureEmissive:Hn&&T.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(T.emissiveMap.colorSpace)===gn,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===As,flipSided:T.side===Wi,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:We&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(We&&T.extensions.multiDraw===!0||Ze)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return De.vertexUv1s=m.has(1),De.vertexUv2s=m.has(2),De.vertexUv3s=m.has(3),m.clear(),De}function y(T){const B=[];if(T.shaderID?B.push(T.shaderID):(B.push(T.customVertexShaderID),B.push(T.customFragmentShaderID)),T.defines!==void 0)for(const Z in T.defines)B.push(Z),B.push(T.defines[Z]);return T.isRawShaderMaterial===!1&&(x(B,T),O(B,T),B.push(r.outputColorSpace)),B.push(T.customProgramCacheKey),B.join()}function x(T,B){T.push(B.precision),T.push(B.outputColorSpace),T.push(B.envMapMode),T.push(B.envMapCubeUVHeight),T.push(B.mapUv),T.push(B.alphaMapUv),T.push(B.lightMapUv),T.push(B.aoMapUv),T.push(B.bumpMapUv),T.push(B.normalMapUv),T.push(B.displacementMapUv),T.push(B.emissiveMapUv),T.push(B.metalnessMapUv),T.push(B.roughnessMapUv),T.push(B.anisotropyMapUv),T.push(B.clearcoatMapUv),T.push(B.clearcoatNormalMapUv),T.push(B.clearcoatRoughnessMapUv),T.push(B.iridescenceMapUv),T.push(B.iridescenceThicknessMapUv),T.push(B.sheenColorMapUv),T.push(B.sheenRoughnessMapUv),T.push(B.specularMapUv),T.push(B.specularColorMapUv),T.push(B.specularIntensityMapUv),T.push(B.transmissionMapUv),T.push(B.thicknessMapUv),T.push(B.combine),T.push(B.fogExp2),T.push(B.sizeAttenuation),T.push(B.morphTargetsCount),T.push(B.morphAttributeCount),T.push(B.numDirLights),T.push(B.numPointLights),T.push(B.numSpotLights),T.push(B.numSpotLightMaps),T.push(B.numHemiLights),T.push(B.numRectAreaLights),T.push(B.numDirLightShadows),T.push(B.numPointLightShadows),T.push(B.numSpotLightShadows),T.push(B.numSpotLightShadowsWithMaps),T.push(B.numLightProbes),T.push(B.shadowMapType),T.push(B.toneMapping),T.push(B.numClippingPlanes),T.push(B.numClipIntersection),T.push(B.depthPacking)}function O(T,B){u.disableAll(),B.instancing&&u.enable(0),B.instancingColor&&u.enable(1),B.instancingMorph&&u.enable(2),B.matcap&&u.enable(3),B.envMap&&u.enable(4),B.normalMapObjectSpace&&u.enable(5),B.normalMapTangentSpace&&u.enable(6),B.clearcoat&&u.enable(7),B.iridescence&&u.enable(8),B.alphaTest&&u.enable(9),B.vertexColors&&u.enable(10),B.vertexAlphas&&u.enable(11),B.vertexUv1s&&u.enable(12),B.vertexUv2s&&u.enable(13),B.vertexUv3s&&u.enable(14),B.vertexTangents&&u.enable(15),B.anisotropy&&u.enable(16),B.alphaHash&&u.enable(17),B.batching&&u.enable(18),B.dispersion&&u.enable(19),B.batchingColor&&u.enable(20),B.gradientMap&&u.enable(21),B.packedNormalMap&&u.enable(22),B.vertexNormals&&u.enable(23),T.push(u.mask),u.disableAll(),B.fog&&u.enable(0),B.useFog&&u.enable(1),B.flatShading&&u.enable(2),B.logarithmicDepthBuffer&&u.enable(3),B.reversedDepthBuffer&&u.enable(4),B.skinning&&u.enable(5),B.morphTargets&&u.enable(6),B.morphNormals&&u.enable(7),B.morphColors&&u.enable(8),B.premultipliedAlpha&&u.enable(9),B.shadowMapEnabled&&u.enable(10),B.doubleSided&&u.enable(11),B.flipSided&&u.enable(12),B.useDepthPacking&&u.enable(13),B.dithering&&u.enable(14),B.transmission&&u.enable(15),B.sheen&&u.enable(16),B.opaque&&u.enable(17),B.pointsUvs&&u.enable(18),B.decodeVideoTexture&&u.enable(19),B.decodeVideoTextureEmissive&&u.enable(20),B.alphaToCoverage&&u.enable(21),B.numLightProbeGrids>0&&u.enable(22),B.hasPositionAttribute&&u.enable(23),T.push(u.mask)}function N(T){const B=M[T.type];let Z;if(B){const G=ja[B];Z=dl.clone(G.uniforms)}else Z=T.uniforms;return Z}function R(T,B){let Z=v.get(B);return Z!==void 0?++Z.usedTimes:(Z=new Dw(r,B,T,o),d.push(Z),v.set(B,Z)),Z}function I(T){if(--T.usedTimes===0){const B=d.indexOf(T);d[B]=d[d.length-1],d.pop(),v.delete(T.cacheKey),T.destroy()}}function L(T){p.remove(T)}function z(){p.dispose()}return{getParameters:C,getProgramCacheKey:y,getUniforms:N,acquireProgram:R,releaseProgram:I,releaseShaderCache:L,programs:d,dispose:z}}function Fw(){let r=new WeakMap;function e(u){return r.has(u)}function n(u){let p=r.get(u);return p===void 0&&(p={},r.set(u,p)),p}function a(u){r.delete(u)}function o(u,p,m){r.get(u)[p]=m}function c(){r=new WeakMap}return{has:e,get:n,remove:a,update:o,dispose:c}}function Bw(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function Dx(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Nx(){const r=[];let e=0;const n=[],a=[],o=[];function c(){e=0,n.length=0,a.length=0,o.length=0}function u(g){let M=0;return g.isInstancedMesh&&(M+=2),g.isSkinnedMesh&&(M+=1),M}function p(g,M,E,C,y,x){let O=r[e];return O===void 0?(O={id:g.id,object:g,geometry:M,material:E,materialVariant:u(g),groupOrder:C,renderOrder:g.renderOrder,z:y,group:x},r[e]=O):(O.id=g.id,O.object=g,O.geometry=M,O.material=E,O.materialVariant=u(g),O.groupOrder=C,O.renderOrder=g.renderOrder,O.z=y,O.group=x),e++,O}function m(g,M,E,C,y,x){const O=p(g,M,E,C,y,x);E.transmission>0?a.push(O):E.transparent===!0?o.push(O):n.push(O)}function d(g,M,E,C,y,x){const O=p(g,M,E,C,y,x);E.transmission>0?a.unshift(O):E.transparent===!0?o.unshift(O):n.unshift(O)}function v(g,M,E){n.length>1&&n.sort(g||Bw),a.length>1&&a.sort(M||Dx),o.length>1&&o.sort(M||Dx),E&&(n.reverse(),a.reverse(),o.reverse())}function _(){for(let g=e,M=r.length;g<M;g++){const E=r[g];if(E.id===null)break;E.id=null,E.object=null,E.geometry=null,E.material=null,E.group=null}}return{opaque:n,transmissive:a,transparent:o,init:c,push:m,unshift:d,finish:_,sort:v}}function zw(){let r=new WeakMap;function e(a,o){const c=r.get(a);let u;return c===void 0?(u=new Nx,r.set(a,[u])):o>=c.length?(u=new Nx,c.push(u)):u=c[o],u}function n(){r=new WeakMap}return{get:e,dispose:n}}function Iw(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new ee,color:new Yt};break;case"SpotLight":n={position:new ee,direction:new ee,color:new Yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new ee,color:new Yt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new ee,skyColor:new Yt,groundColor:new Yt};break;case"RectAreaLight":n={color:new Yt,position:new ee,halfWidth:new ee,halfHeight:new ee};break}return r[e.id]=n,n}}}function Hw(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=n,n}}}let Gw=0;function kw(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Vw(r){const e=new Iw,n=Hw(),a={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)a.probe.push(new ee);const o=new ee,c=new kn,u=new kn;function p(d){let v=0,_=0,g=0;for(let B=0;B<9;B++)a.probe[B].set(0,0,0);let M=0,E=0,C=0,y=0,x=0,O=0,N=0,R=0,I=0,L=0,z=0;d.sort(kw);for(let B=0,Z=d.length;B<Z;B++){const G=d[B],Y=G.color,de=G.intensity,xe=G.distance;let ae=null;if(G.shadow&&G.shadow.map&&(G.shadow.map.texture.format===to?ae=G.shadow.map.texture:ae=G.shadow.map.depthTexture||G.shadow.map.texture),G.isAmbientLight)v+=Y.r*de,_+=Y.g*de,g+=Y.b*de;else if(G.isLightProbe){for(let H=0;H<9;H++)a.probe[H].addScaledVector(G.sh.coefficients[H],de);z++}else if(G.isDirectionalLight){const H=e.get(G);if(H.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){const k=G.shadow,te=n.get(G);te.shadowIntensity=k.intensity,te.shadowBias=k.bias,te.shadowNormalBias=k.normalBias,te.shadowRadius=k.radius,te.shadowMapSize=k.mapSize,a.directionalShadow[M]=te,a.directionalShadowMap[M]=ae,a.directionalShadowMatrix[M]=G.shadow.matrix,O++}a.directional[M]=H,M++}else if(G.isSpotLight){const H=e.get(G);H.position.setFromMatrixPosition(G.matrixWorld),H.color.copy(Y).multiplyScalar(de),H.distance=xe,H.coneCos=Math.cos(G.angle),H.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),H.decay=G.decay,a.spot[C]=H;const k=G.shadow;if(G.map&&(a.spotLightMap[I]=G.map,I++,k.updateMatrices(G),G.castShadow&&L++),a.spotLightMatrix[C]=k.matrix,G.castShadow){const te=n.get(G);te.shadowIntensity=k.intensity,te.shadowBias=k.bias,te.shadowNormalBias=k.normalBias,te.shadowRadius=k.radius,te.shadowMapSize=k.mapSize,a.spotShadow[C]=te,a.spotShadowMap[C]=ae,R++}C++}else if(G.isRectAreaLight){const H=e.get(G);H.color.copy(Y).multiplyScalar(de),H.halfWidth.set(G.width*.5,0,0),H.halfHeight.set(0,G.height*.5,0),a.rectArea[y]=H,y++}else if(G.isPointLight){const H=e.get(G);if(H.color.copy(G.color).multiplyScalar(G.intensity),H.distance=G.distance,H.decay=G.decay,G.castShadow){const k=G.shadow,te=n.get(G);te.shadowIntensity=k.intensity,te.shadowBias=k.bias,te.shadowNormalBias=k.normalBias,te.shadowRadius=k.radius,te.shadowMapSize=k.mapSize,te.shadowCameraNear=k.camera.near,te.shadowCameraFar=k.camera.far,a.pointShadow[E]=te,a.pointShadowMap[E]=ae,a.pointShadowMatrix[E]=G.shadow.matrix,N++}a.point[E]=H,E++}else if(G.isHemisphereLight){const H=e.get(G);H.skyColor.copy(G.color).multiplyScalar(de),H.groundColor.copy(G.groundColor).multiplyScalar(de),a.hemi[x]=H,x++}}y>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Ke.LTC_FLOAT_1,a.rectAreaLTC2=Ke.LTC_FLOAT_2):(a.rectAreaLTC1=Ke.LTC_HALF_1,a.rectAreaLTC2=Ke.LTC_HALF_2)),a.ambient[0]=v,a.ambient[1]=_,a.ambient[2]=g;const T=a.hash;(T.directionalLength!==M||T.pointLength!==E||T.spotLength!==C||T.rectAreaLength!==y||T.hemiLength!==x||T.numDirectionalShadows!==O||T.numPointShadows!==N||T.numSpotShadows!==R||T.numSpotMaps!==I||T.numLightProbes!==z)&&(a.directional.length=M,a.spot.length=C,a.rectArea.length=y,a.point.length=E,a.hemi.length=x,a.directionalShadow.length=O,a.directionalShadowMap.length=O,a.pointShadow.length=N,a.pointShadowMap.length=N,a.spotShadow.length=R,a.spotShadowMap.length=R,a.directionalShadowMatrix.length=O,a.pointShadowMatrix.length=N,a.spotLightMatrix.length=R+I-L,a.spotLightMap.length=I,a.numSpotLightShadowsWithMaps=L,a.numLightProbes=z,T.directionalLength=M,T.pointLength=E,T.spotLength=C,T.rectAreaLength=y,T.hemiLength=x,T.numDirectionalShadows=O,T.numPointShadows=N,T.numSpotShadows=R,T.numSpotMaps=I,T.numLightProbes=z,a.version=Gw++)}function m(d,v){let _=0,g=0,M=0,E=0,C=0;const y=v.matrixWorldInverse;for(let x=0,O=d.length;x<O;x++){const N=d[x];if(N.isDirectionalLight){const R=a.directional[_];R.direction.setFromMatrixPosition(N.matrixWorld),o.setFromMatrixPosition(N.target.matrixWorld),R.direction.sub(o),R.direction.transformDirection(y),_++}else if(N.isSpotLight){const R=a.spot[M];R.position.setFromMatrixPosition(N.matrixWorld),R.position.applyMatrix4(y),R.direction.setFromMatrixPosition(N.matrixWorld),o.setFromMatrixPosition(N.target.matrixWorld),R.direction.sub(o),R.direction.transformDirection(y),M++}else if(N.isRectAreaLight){const R=a.rectArea[E];R.position.setFromMatrixPosition(N.matrixWorld),R.position.applyMatrix4(y),u.identity(),c.copy(N.matrixWorld),c.premultiply(y),u.extractRotation(c),R.halfWidth.set(N.width*.5,0,0),R.halfHeight.set(0,N.height*.5,0),R.halfWidth.applyMatrix4(u),R.halfHeight.applyMatrix4(u),E++}else if(N.isPointLight){const R=a.point[g];R.position.setFromMatrixPosition(N.matrixWorld),R.position.applyMatrix4(y),g++}else if(N.isHemisphereLight){const R=a.hemi[C];R.direction.setFromMatrixPosition(N.matrixWorld),R.direction.transformDirection(y),C++}}}return{setup:p,setupView:m,state:a}}function Lx(r){const e=new Vw(r),n=[],a=[],o=[];function c(g){_.camera=g,n.length=0,a.length=0,o.length=0}function u(g){n.push(g)}function p(g){a.push(g)}function m(g){o.push(g)}function d(){e.setup(n)}function v(g){e.setupView(n,g)}const _={lightsArray:n,shadowsArray:a,lightProbeGridArray:o,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:_,setupLights:d,setupLightsView:v,pushLight:u,pushShadow:p,pushLightProbeGrid:m}}function Xw(r){let e=new WeakMap;function n(o,c=0){const u=e.get(o);let p;return u===void 0?(p=new Lx(r),e.set(o,[p])):c>=u.length?(p=new Lx(r),u.push(p)):p=u[c],p}function a(){e=new WeakMap}return{get:n,dispose:a}}const qw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ww=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Yw=[new ee(1,0,0),new ee(-1,0,0),new ee(0,1,0),new ee(0,-1,0),new ee(0,0,1),new ee(0,0,-1)],jw=[new ee(0,-1,0),new ee(0,-1,0),new ee(0,0,1),new ee(0,0,-1),new ee(0,-1,0),new ee(0,-1,0)],Ux=new kn,Ec=new ee,Bp=new ee;function Zw(r,e,n){let a=new by;const o=new Dt,c=new Dt,u=new Yn,p=new o1,m=new l1,d={},v=n.maxTextureSize,_={[Mr]:Wi,[Wi]:Mr,[As]:As},g=new Cn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:qw,fragmentShader:Ww}),M=g.clone();M.defines.HORIZONTAL_PASS=1;const E=new ri;E.setAttribute("position",new en(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const C=new Ba(E,g),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ff;let x=this.type;this.render=function(L,z,T){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||L.length===0)return;this.type===KM&&(Mt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ff);const B=r.getRenderTarget(),Z=r.getActiveCubeFace(),G=r.getActiveMipmapLevel(),Y=r.state;Y.setBlending(Fa),Y.buffers.depth.getReversed()===!0?Y.buffers.color.setClear(0,0,0,0):Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const de=x!==this.type;de&&z.traverse(function(xe){xe.material&&(Array.isArray(xe.material)?xe.material.forEach(ae=>ae.needsUpdate=!0):xe.material.needsUpdate=!0)});for(let xe=0,ae=L.length;xe<ae;xe++){const H=L[xe],k=H.shadow;if(k===void 0){Mt("WebGLShadowMap:",H,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;o.copy(k.mapSize);const te=k.getFrameExtents();o.multiply(te),c.copy(k.mapSize),(o.x>v||o.y>v)&&(o.x>v&&(c.x=Math.floor(v/te.x),o.x=c.x*te.x,k.mapSize.x=c.x),o.y>v&&(c.y=Math.floor(v/te.y),o.y=c.y*te.y,k.mapSize.y=c.y));const _e=r.state.buffers.depth.getReversed();if(k.camera._reversedDepth=_e,k.map===null||de===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===Rc){if(H.isPointLight){Mt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new _i(o.x,o.y,{format:to,type:Di,minFilter:Ci,magFilter:Ci,generateMipmaps:!1}),k.map.texture.name=H.name+".shadowMap",k.map.depthTexture=new fl(o.x,o.y,qi),k.map.depthTexture.name=H.name+".shadowMapDepth",k.map.depthTexture.format=Cs,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Fn,k.map.depthTexture.magFilter=Fn}else H.isPointLight?(k.map=new Dy(o.x),k.map.depthTexture=new n1(o.x,Qa)):(k.map=new _i(o.x,o.y),k.map.depthTexture=new fl(o.x,o.y,Qa)),k.map.depthTexture.name=H.name+".shadowMap",k.map.depthTexture.format=Cs,this.type===Ff?(k.map.depthTexture.compareFunction=_e?Qm:Km,k.map.depthTexture.minFilter=Ci,k.map.depthTexture.magFilter=Ci):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Fn,k.map.depthTexture.magFilter=Fn);k.camera.updateProjectionMatrix()}const Ae=k.map.isWebGLCubeRenderTarget?6:1;for(let P=0;P<Ae;P++){if(k.map.isWebGLCubeRenderTarget)r.setRenderTarget(k.map,P),r.clear();else{P===0&&(r.setRenderTarget(k.map),r.clear());const Q=k.getViewport(P);u.set(c.x*Q.x,c.y*Q.y,c.x*Q.z,c.y*Q.w),Y.viewport(u)}if(H.isPointLight){const Q=k.camera,Ce=k.matrix,Ie=H.distance||Q.far;Ie!==Q.far&&(Q.far=Ie,Q.updateProjectionMatrix()),Ec.setFromMatrixPosition(H.matrixWorld),Q.position.copy(Ec),Bp.copy(Q.position),Bp.add(Yw[P]),Q.up.copy(jw[P]),Q.lookAt(Bp),Q.updateMatrixWorld(),Ce.makeTranslation(-Ec.x,-Ec.y,-Ec.z),Ux.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Ux,Q.coordinateSystem,Q.reversedDepth)}else k.updateMatrices(H);a=k.getFrustum(),R(z,T,k.camera,H,this.type)}k.isPointLightShadow!==!0&&this.type===Rc&&O(k,T),k.needsUpdate=!1}x=this.type,y.needsUpdate=!1,r.setRenderTarget(B,Z,G)};function O(L,z){const T=e.update(C);g.defines.VSM_SAMPLES!==L.blurSamples&&(g.defines.VSM_SAMPLES=L.blurSamples,M.defines.VSM_SAMPLES=L.blurSamples,g.needsUpdate=!0,M.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new _i(o.x,o.y,{format:to,type:Di})),g.uniforms.shadow_pass.value=L.map.depthTexture,g.uniforms.resolution.value=L.mapSize,g.uniforms.radius.value=L.radius,r.setRenderTarget(L.mapPass),r.clear(),r.renderBufferDirect(z,null,T,g,C,null),M.uniforms.shadow_pass.value=L.mapPass.texture,M.uniforms.resolution.value=L.mapSize,M.uniforms.radius.value=L.radius,r.setRenderTarget(L.map),r.clear(),r.renderBufferDirect(z,null,T,M,C,null)}function N(L,z,T,B){let Z=null;const G=T.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(G!==void 0)Z=G;else if(Z=T.isPointLight===!0?m:p,r.localClippingEnabled&&z.clipShadows===!0&&Array.isArray(z.clippingPlanes)&&z.clippingPlanes.length!==0||z.displacementMap&&z.displacementScale!==0||z.alphaMap&&z.alphaTest>0||z.map&&z.alphaTest>0||z.alphaToCoverage===!0){const Y=Z.uuid,de=z.uuid;let xe=d[Y];xe===void 0&&(xe={},d[Y]=xe);let ae=xe[de];ae===void 0&&(ae=Z.clone(),xe[de]=ae,z.addEventListener("dispose",I)),Z=ae}if(Z.visible=z.visible,Z.wireframe=z.wireframe,B===Rc?Z.side=z.shadowSide!==null?z.shadowSide:z.side:Z.side=z.shadowSide!==null?z.shadowSide:_[z.side],Z.alphaMap=z.alphaMap,Z.alphaTest=z.alphaToCoverage===!0?.5:z.alphaTest,Z.map=z.map,Z.clipShadows=z.clipShadows,Z.clippingPlanes=z.clippingPlanes,Z.clipIntersection=z.clipIntersection,Z.displacementMap=z.displacementMap,Z.displacementScale=z.displacementScale,Z.displacementBias=z.displacementBias,Z.wireframeLinewidth=z.wireframeLinewidth,Z.linewidth=z.linewidth,T.isPointLight===!0&&Z.isMeshDistanceMaterial===!0){const Y=r.properties.get(Z);Y.light=T}return Z}function R(L,z,T,B,Z){if(L.visible===!1)return;if(L.layers.test(z.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&Z===Rc)&&(!L.frustumCulled||a.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,L.matrixWorld);const de=e.update(L),xe=L.material;if(Array.isArray(xe)){const ae=de.groups;for(let H=0,k=ae.length;H<k;H++){const te=ae[H],_e=xe[te.materialIndex];if(_e&&_e.visible){const Ae=N(L,_e,B,Z);L.onBeforeShadow(r,L,z,T,de,Ae,te),r.renderBufferDirect(T,null,de,Ae,L,te),L.onAfterShadow(r,L,z,T,de,Ae,te)}}}else if(xe.visible){const ae=N(L,xe,B,Z);L.onBeforeShadow(r,L,z,T,de,ae,null),r.renderBufferDirect(T,null,de,ae,L,null),L.onAfterShadow(r,L,z,T,de,ae,null)}}const Y=L.children;for(let de=0,xe=Y.length;de<xe;de++)R(Y[de],z,T,B,Z)}function I(L){L.target.removeEventListener("dispose",I);for(const T in d){const B=d[T],Z=L.target.uuid;Z in B&&(B[Z].dispose(),delete B[Z])}}}function Kw(r,e){function n(){let q=!1;const ze=new Yn;let Me=null;const Fe=new Yn(0,0,0,0);return{setMask:function(We){Me!==We&&!q&&(r.colorMask(We,We,We,We),Me=We)},setLocked:function(We){q=We},setClear:function(We,we,De,Qe,Sn){Sn===!0&&(We*=Qe,we*=Qe,De*=Qe),ze.set(We,we,De,Qe),Fe.equals(ze)===!1&&(r.clearColor(We,we,De,Qe),Fe.copy(ze))},reset:function(){q=!1,Me=null,Fe.set(-1,0,0,0)}}}function a(){let q=!1,ze=!1,Me=null,Fe=null,We=null;return{setReversed:function(we){if(ze!==we){const De=e.get("EXT_clip_control");we?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),ze=we;const Qe=We;We=null,this.setClear(Qe)}},getReversed:function(){return ze},setTest:function(we){we?Re(r.DEPTH_TEST):nt(r.DEPTH_TEST)},setMask:function(we){Me!==we&&!q&&(r.depthMask(we),Me=we)},setFunc:function(we){if(ze&&(we=Cb[we]),Fe!==we){switch(we){case jp:r.depthFunc(r.NEVER);break;case Zp:r.depthFunc(r.ALWAYS);break;case Kp:r.depthFunc(r.LESS);break;case cl:r.depthFunc(r.LEQUAL);break;case Qp:r.depthFunc(r.EQUAL);break;case Jp:r.depthFunc(r.GEQUAL);break;case $p:r.depthFunc(r.GREATER);break;case em:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Fe=we}},setLocked:function(we){q=we},setClear:function(we){We!==we&&(We=we,ze&&(we=1-we),r.clearDepth(we))},reset:function(){q=!1,Me=null,Fe=null,We=null,ze=!1}}}function o(){let q=!1,ze=null,Me=null,Fe=null,We=null,we=null,De=null,Qe=null,Sn=null;return{setTest:function(on){q||(on?Re(r.STENCIL_TEST):nt(r.STENCIL_TEST))},setMask:function(on){ze!==on&&!q&&(r.stencilMask(on),ze=on)},setFunc:function(on,xi,yi){(Me!==on||Fe!==xi||We!==yi)&&(r.stencilFunc(on,xi,yi),Me=on,Fe=xi,We=yi)},setOp:function(on,xi,yi){(we!==on||De!==xi||Qe!==yi)&&(r.stencilOp(on,xi,yi),we=on,De=xi,Qe=yi)},setLocked:function(on){q=on},setClear:function(on){Sn!==on&&(r.clearStencil(on),Sn=on)},reset:function(){q=!1,ze=null,Me=null,Fe=null,We=null,we=null,De=null,Qe=null,Sn=null}}}const c=new n,u=new a,p=new o,m=new WeakMap,d=new WeakMap;let v={},_={},g={},M=new WeakMap,E=[],C=null,y=!1,x=null,O=null,N=null,R=null,I=null,L=null,z=null,T=new Yt(0,0,0),B=0,Z=!1,G=null,Y=null,de=null,xe=null,ae=null;const H=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,te=0;const _e=r.getParameter(r.VERSION);_e.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(_e)[1]),k=te>=1):_e.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(_e)[1]),k=te>=2);let Ae=null,P={};const Q=r.getParameter(r.SCISSOR_BOX),Ce=r.getParameter(r.VIEWPORT),Ie=new Yn().fromArray(Q),je=new Yn().fromArray(Ce);function re(q,ze,Me,Fe){const We=new Uint8Array(4),we=r.createTexture();r.bindTexture(q,we),r.texParameteri(q,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(q,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let De=0;De<Me;De++)q===r.TEXTURE_3D||q===r.TEXTURE_2D_ARRAY?r.texImage3D(ze,0,r.RGBA,1,1,Fe,0,r.RGBA,r.UNSIGNED_BYTE,We):r.texImage2D(ze+De,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,We);return we}const Se={};Se[r.TEXTURE_2D]=re(r.TEXTURE_2D,r.TEXTURE_2D,1),Se[r.TEXTURE_CUBE_MAP]=re(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Se[r.TEXTURE_2D_ARRAY]=re(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Se[r.TEXTURE_3D]=re(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),u.setClear(1),p.setClear(0),Re(r.DEPTH_TEST),u.setFunc(cl),Dn(!1),Nn(R_),Re(r.CULL_FACE),Xt(Fa);function Re(q){v[q]!==!0&&(r.enable(q),v[q]=!0)}function nt(q){v[q]!==!1&&(r.disable(q),v[q]=!1)}function vt(q,ze){return g[q]!==ze?(r.bindFramebuffer(q,ze),g[q]=ze,q===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=ze),q===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=ze),!0):!1}function Ze(q,ze){let Me=E,Fe=!1;if(q){Me=M.get(ze),Me===void 0&&(Me=[],M.set(ze,Me));const We=q.textures;if(Me.length!==We.length||Me[0]!==r.COLOR_ATTACHMENT0){for(let we=0,De=We.length;we<De;we++)Me[we]=r.COLOR_ATTACHMENT0+we;Me.length=We.length,Fe=!0}}else Me[0]!==r.BACK&&(Me[0]=r.BACK,Fe=!0);Fe&&r.drawBuffers(Me)}function yn(q){return C!==q?(r.useProgram(q),C=q,!0):!1}const Ot={[Zr]:r.FUNC_ADD,[JM]:r.FUNC_SUBTRACT,[$M]:r.FUNC_REVERSE_SUBTRACT};Ot[eb]=r.MIN,Ot[tb]=r.MAX;const Vt={[nb]:r.ZERO,[ib]:r.ONE,[ab]:r.SRC_COLOR,[Wp]:r.SRC_ALPHA,[ub]:r.SRC_ALPHA_SATURATE,[lb]:r.DST_COLOR,[rb]:r.DST_ALPHA,[sb]:r.ONE_MINUS_SRC_COLOR,[Yp]:r.ONE_MINUS_SRC_ALPHA,[cb]:r.ONE_MINUS_DST_COLOR,[ob]:r.ONE_MINUS_DST_ALPHA,[fb]:r.CONSTANT_COLOR,[hb]:r.ONE_MINUS_CONSTANT_COLOR,[db]:r.CONSTANT_ALPHA,[pb]:r.ONE_MINUS_CONSTANT_ALPHA};function Xt(q,ze,Me,Fe,We,we,De,Qe,Sn,on){if(q===Fa){y===!0&&(nt(r.BLEND),y=!1);return}if(y===!1&&(Re(r.BLEND),y=!0),q!==QM){if(q!==x||on!==Z){if((O!==Zr||I!==Zr)&&(r.blendEquation(r.FUNC_ADD),O=Zr,I=Zr),on)switch(q){case rl:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ts:r.blendFunc(r.ONE,r.ONE);break;case C_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case D_:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:tn("WebGLState: Invalid blending: ",q);break}else switch(q){case rl:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ts:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case C_:tn("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case D_:tn("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:tn("WebGLState: Invalid blending: ",q);break}N=null,R=null,L=null,z=null,T.set(0,0,0),B=0,x=q,Z=on}return}We=We||ze,we=we||Me,De=De||Fe,(ze!==O||We!==I)&&(r.blendEquationSeparate(Ot[ze],Ot[We]),O=ze,I=We),(Me!==N||Fe!==R||we!==L||De!==z)&&(r.blendFuncSeparate(Vt[Me],Vt[Fe],Vt[we],Vt[De]),N=Me,R=Fe,L=we,z=De),(Qe.equals(T)===!1||Sn!==B)&&(r.blendColor(Qe.r,Qe.g,Qe.b,Sn),T.copy(Qe),B=Sn),x=q,Z=!1}function It(q,ze){q.side===As?nt(r.CULL_FACE):Re(r.CULL_FACE);let Me=q.side===Wi;ze&&(Me=!Me),Dn(Me),q.blending===rl&&q.transparent===!1?Xt(Fa):Xt(q.blending,q.blendEquation,q.blendSrc,q.blendDst,q.blendEquationAlpha,q.blendSrcAlpha,q.blendDstAlpha,q.blendColor,q.blendAlpha,q.premultipliedAlpha),u.setFunc(q.depthFunc),u.setTest(q.depthTest),u.setMask(q.depthWrite),c.setMask(q.colorWrite);const Fe=q.stencilWrite;p.setTest(Fe),Fe&&(p.setMask(q.stencilWriteMask),p.setFunc(q.stencilFunc,q.stencilRef,q.stencilFuncMask),p.setOp(q.stencilFail,q.stencilZFail,q.stencilZPass)),Hn(q.polygonOffset,q.polygonOffsetFactor,q.polygonOffsetUnits),q.alphaToCoverage===!0?Re(r.SAMPLE_ALPHA_TO_COVERAGE):nt(r.SAMPLE_ALPHA_TO_COVERAGE)}function Dn(q){G!==q&&(q?r.frontFace(r.CW):r.frontFace(r.CCW),G=q)}function Nn(q){q!==jM?(Re(r.CULL_FACE),q!==Y&&(q===R_?r.cullFace(r.BACK):q===ZM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):nt(r.CULL_FACE),Y=q}function Ln(q){q!==de&&(k&&r.lineWidth(q),de=q)}function Hn(q,ze,Me){q?(Re(r.POLYGON_OFFSET_FILL),(xe!==ze||ae!==Me)&&(xe=ze,ae=Me,u.getReversed()&&(ze=-ze),r.polygonOffset(ze,Me))):nt(r.POLYGON_OFFSET_FILL)}function dn(q){q?Re(r.SCISSOR_TEST):nt(r.SCISSOR_TEST)}function Un(q){q===void 0&&(q=r.TEXTURE0+H-1),Ae!==q&&(r.activeTexture(q),Ae=q)}function j(q,ze,Me){Me===void 0&&(Ae===null?Me=r.TEXTURE0+H-1:Me=Ae);let Fe=P[Me];Fe===void 0&&(Fe={type:void 0,texture:void 0},P[Me]=Fe),(Fe.type!==q||Fe.texture!==ze)&&(Ae!==Me&&(r.activeTexture(Me),Ae=Me),r.bindTexture(q,ze||Se[q]),Fe.type=q,Fe.texture=ze)}function nn(){const q=P[Ae];q!==void 0&&q.type!==void 0&&(r.bindTexture(q.type,null),q.type=void 0,q.texture=void 0)}function an(){try{r.compressedTexImage2D(...arguments)}catch(q){tn("WebGLState:",q)}}function U(){try{r.compressedTexImage3D(...arguments)}catch(q){tn("WebGLState:",q)}}function b(){try{r.texSubImage2D(...arguments)}catch(q){tn("WebGLState:",q)}}function $(){try{r.texSubImage3D(...arguments)}catch(q){tn("WebGLState:",q)}}function he(){try{r.compressedTexSubImage2D(...arguments)}catch(q){tn("WebGLState:",q)}}function ve(){try{r.compressedTexSubImage3D(...arguments)}catch(q){tn("WebGLState:",q)}}function Oe(){try{r.texStorage2D(...arguments)}catch(q){tn("WebGLState:",q)}}function Ge(){try{r.texStorage3D(...arguments)}catch(q){tn("WebGLState:",q)}}function me(){try{r.texImage2D(...arguments)}catch(q){tn("WebGLState:",q)}}function ye(){try{r.texImage3D(...arguments)}catch(q){tn("WebGLState:",q)}}function He(q){return _[q]!==void 0?_[q]:r.getParameter(q)}function $e(q,ze){_[q]!==ze&&(r.pixelStorei(q,ze),_[q]=ze)}function qe(q){Ie.equals(q)===!1&&(r.scissor(q.x,q.y,q.z,q.w),Ie.copy(q))}function ke(q){je.equals(q)===!1&&(r.viewport(q.x,q.y,q.z,q.w),je.copy(q))}function ht(q,ze){let Me=d.get(ze);Me===void 0&&(Me=new WeakMap,d.set(ze,Me));let Fe=Me.get(q);Fe===void 0&&(Fe=r.getUniformBlockIndex(ze,q.name),Me.set(q,Fe))}function pt(q,ze){const Fe=d.get(ze).get(q);m.get(ze)!==Fe&&(r.uniformBlockBinding(ze,Fe,q.__bindingPointIndex),m.set(ze,Fe))}function _t(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),u.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),v={},_={},Ae=null,P={},g={},M=new WeakMap,E=[],C=null,y=!1,x=null,O=null,N=null,R=null,I=null,L=null,z=null,T=new Yt(0,0,0),B=0,Z=!1,G=null,Y=null,de=null,xe=null,ae=null,Ie.set(0,0,r.canvas.width,r.canvas.height),je.set(0,0,r.canvas.width,r.canvas.height),c.reset(),u.reset(),p.reset()}return{buffers:{color:c,depth:u,stencil:p},enable:Re,disable:nt,bindFramebuffer:vt,drawBuffers:Ze,useProgram:yn,setBlending:Xt,setMaterial:It,setFlipSided:Dn,setCullFace:Nn,setLineWidth:Ln,setPolygonOffset:Hn,setScissorTest:dn,activeTexture:Un,bindTexture:j,unbindTexture:nn,compressedTexImage2D:an,compressedTexImage3D:U,texImage2D:me,texImage3D:ye,pixelStorei:$e,getParameter:He,updateUBOMapping:ht,uniformBlockBinding:pt,texStorage2D:Oe,texStorage3D:Ge,texSubImage2D:b,texSubImage3D:$,compressedTexSubImage2D:he,compressedTexSubImage3D:ve,scissor:qe,viewport:ke,reset:_t}}function Qw(r,e,n,a,o,c,u){const p=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new Dt,v=new WeakMap,_=new Set;let g;const M=new WeakMap;let E=!1;try{E=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function C(U,b){return E?new OffscreenCanvas(U,b):Yf("canvas")}function y(U,b,$){let he=1;const ve=an(U);if((ve.width>$||ve.height>$)&&(he=$/Math.max(ve.width,ve.height)),he<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const Oe=Math.floor(he*ve.width),Ge=Math.floor(he*ve.height);g===void 0&&(g=C(Oe,Ge));const me=b?C(Oe,Ge):g;return me.width=Oe,me.height=Ge,me.getContext("2d").drawImage(U,0,0,Oe,Ge),Mt("WebGLRenderer: Texture has been resized from ("+ve.width+"x"+ve.height+") to ("+Oe+"x"+Ge+")."),me}else return"data"in U&&Mt("WebGLRenderer: Image in DataTexture is too big ("+ve.width+"x"+ve.height+")."),U;return U}function x(U){return U.generateMipmaps}function O(U){r.generateMipmap(U)}function N(U){return U.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?r.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function R(U,b,$,he,ve,Oe=!1){if(U!==null){if(r[U]!==void 0)return r[U];Mt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let Ge;he&&(Ge=e.get("EXT_texture_norm16"),Ge||Mt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let me=b;if(b===r.RED&&($===r.FLOAT&&(me=r.R32F),$===r.HALF_FLOAT&&(me=r.R16F),$===r.UNSIGNED_BYTE&&(me=r.R8),$===r.UNSIGNED_SHORT&&Ge&&(me=Ge.R16_EXT),$===r.SHORT&&Ge&&(me=Ge.R16_SNORM_EXT)),b===r.RED_INTEGER&&($===r.UNSIGNED_BYTE&&(me=r.R8UI),$===r.UNSIGNED_SHORT&&(me=r.R16UI),$===r.UNSIGNED_INT&&(me=r.R32UI),$===r.BYTE&&(me=r.R8I),$===r.SHORT&&(me=r.R16I),$===r.INT&&(me=r.R32I)),b===r.RG&&($===r.FLOAT&&(me=r.RG32F),$===r.HALF_FLOAT&&(me=r.RG16F),$===r.UNSIGNED_BYTE&&(me=r.RG8),$===r.UNSIGNED_SHORT&&Ge&&(me=Ge.RG16_EXT),$===r.SHORT&&Ge&&(me=Ge.RG16_SNORM_EXT)),b===r.RG_INTEGER&&($===r.UNSIGNED_BYTE&&(me=r.RG8UI),$===r.UNSIGNED_SHORT&&(me=r.RG16UI),$===r.UNSIGNED_INT&&(me=r.RG32UI),$===r.BYTE&&(me=r.RG8I),$===r.SHORT&&(me=r.RG16I),$===r.INT&&(me=r.RG32I)),b===r.RGB_INTEGER&&($===r.UNSIGNED_BYTE&&(me=r.RGB8UI),$===r.UNSIGNED_SHORT&&(me=r.RGB16UI),$===r.UNSIGNED_INT&&(me=r.RGB32UI),$===r.BYTE&&(me=r.RGB8I),$===r.SHORT&&(me=r.RGB16I),$===r.INT&&(me=r.RGB32I)),b===r.RGBA_INTEGER&&($===r.UNSIGNED_BYTE&&(me=r.RGBA8UI),$===r.UNSIGNED_SHORT&&(me=r.RGBA16UI),$===r.UNSIGNED_INT&&(me=r.RGBA32UI),$===r.BYTE&&(me=r.RGBA8I),$===r.SHORT&&(me=r.RGBA16I),$===r.INT&&(me=r.RGBA32I)),b===r.RGB&&($===r.UNSIGNED_SHORT&&Ge&&(me=Ge.RGB16_EXT),$===r.SHORT&&Ge&&(me=Ge.RGB16_SNORM_EXT),$===r.UNSIGNED_INT_5_9_9_9_REV&&(me=r.RGB9_E5),$===r.UNSIGNED_INT_10F_11F_11F_REV&&(me=r.R11F_G11F_B10F)),b===r.RGBA){const ye=Oe?qf:Kt.getTransfer(ve);$===r.FLOAT&&(me=r.RGBA32F),$===r.HALF_FLOAT&&(me=r.RGBA16F),$===r.UNSIGNED_BYTE&&(me=ye===gn?r.SRGB8_ALPHA8:r.RGBA8),$===r.UNSIGNED_SHORT&&Ge&&(me=Ge.RGBA16_EXT),$===r.SHORT&&Ge&&(me=Ge.RGBA16_SNORM_EXT),$===r.UNSIGNED_SHORT_4_4_4_4&&(me=r.RGBA4),$===r.UNSIGNED_SHORT_5_5_5_1&&(me=r.RGB5_A1)}return(me===r.R16F||me===r.R32F||me===r.RG16F||me===r.RG32F||me===r.RGBA16F||me===r.RGBA32F)&&e.get("EXT_color_buffer_float"),me}function I(U,b){let $;return U?b===null||b===Qa||b===Lc?$=r.DEPTH24_STENCIL8:b===qi?$=r.DEPTH32F_STENCIL8:b===Nc&&($=r.DEPTH24_STENCIL8,Mt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Qa||b===Lc?$=r.DEPTH_COMPONENT24:b===qi?$=r.DEPTH_COMPONENT32F:b===Nc&&($=r.DEPTH_COMPONENT16),$}function L(U,b){return x(U)===!0||U.isFramebufferTexture&&U.minFilter!==Fn&&U.minFilter!==Ci?Math.log2(Math.max(b.width,b.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?b.mipmaps.length:1}function z(U){const b=U.target;b.removeEventListener("dispose",z),B(b),b.isVideoTexture&&v.delete(b),b.isHTMLTexture&&_.delete(b)}function T(U){const b=U.target;b.removeEventListener("dispose",T),G(b)}function B(U){const b=a.get(U);if(b.__webglInit===void 0)return;const $=U.source,he=M.get($);if(he){const ve=he[b.__cacheKey];ve.usedTimes--,ve.usedTimes===0&&Z(U),Object.keys(he).length===0&&M.delete($)}a.remove(U)}function Z(U){const b=a.get(U);r.deleteTexture(b.__webglTexture);const $=U.source,he=M.get($);delete he[b.__cacheKey],u.memory.textures--}function G(U){const b=a.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),a.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let he=0;he<6;he++){if(Array.isArray(b.__webglFramebuffer[he]))for(let ve=0;ve<b.__webglFramebuffer[he].length;ve++)r.deleteFramebuffer(b.__webglFramebuffer[he][ve]);else r.deleteFramebuffer(b.__webglFramebuffer[he]);b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer[he])}else{if(Array.isArray(b.__webglFramebuffer))for(let he=0;he<b.__webglFramebuffer.length;he++)r.deleteFramebuffer(b.__webglFramebuffer[he]);else r.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&r.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let he=0;he<b.__webglColorRenderbuffer.length;he++)b.__webglColorRenderbuffer[he]&&r.deleteRenderbuffer(b.__webglColorRenderbuffer[he]);b.__webglDepthRenderbuffer&&r.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const $=U.textures;for(let he=0,ve=$.length;he<ve;he++){const Oe=a.get($[he]);Oe.__webglTexture&&(r.deleteTexture(Oe.__webglTexture),u.memory.textures--),a.remove($[he])}a.remove(U)}let Y=0;function de(){Y=0}function xe(){return Y}function ae(U){Y=U}function H(){const U=Y;return U>=o.maxTextures&&Mt("WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+o.maxTextures),Y+=1,U}function k(U){const b=[];return b.push(U.wrapS),b.push(U.wrapT),b.push(U.wrapR||0),b.push(U.magFilter),b.push(U.minFilter),b.push(U.anisotropy),b.push(U.internalFormat),b.push(U.format),b.push(U.type),b.push(U.generateMipmaps),b.push(U.premultiplyAlpha),b.push(U.flipY),b.push(U.unpackAlignment),b.push(U.colorSpace),b.join()}function te(U,b){const $=a.get(U);if(U.isVideoTexture&&j(U),U.isRenderTargetTexture===!1&&U.isExternalTexture!==!0&&U.version>0&&$.__version!==U.version){const he=U.image;if(he===null)Mt("WebGLRenderer: Texture marked for update but no image data found.");else if(he.complete===!1)Mt("WebGLRenderer: Texture marked for update but image is incomplete");else{nt($,U,b);return}}else U.isExternalTexture&&($.__webglTexture=U.sourceTexture?U.sourceTexture:null);n.bindTexture(r.TEXTURE_2D,$.__webglTexture,r.TEXTURE0+b)}function _e(U,b){const $=a.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&$.__version!==U.version){nt($,U,b);return}else U.isExternalTexture&&($.__webglTexture=U.sourceTexture?U.sourceTexture:null);n.bindTexture(r.TEXTURE_2D_ARRAY,$.__webglTexture,r.TEXTURE0+b)}function Ae(U,b){const $=a.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&$.__version!==U.version){nt($,U,b);return}n.bindTexture(r.TEXTURE_3D,$.__webglTexture,r.TEXTURE0+b)}function P(U,b){const $=a.get(U);if(U.isCubeDepthTexture!==!0&&U.version>0&&$.__version!==U.version){vt($,U,b);return}n.bindTexture(r.TEXTURE_CUBE_MAP,$.__webglTexture,r.TEXTURE0+b)}const Q={[tm]:r.REPEAT,[sa]:r.CLAMP_TO_EDGE,[nm]:r.MIRRORED_REPEAT},Ce={[Fn]:r.NEAREST,[vb]:r.NEAREST_MIPMAP_NEAREST,[Ku]:r.NEAREST_MIPMAP_LINEAR,[Ci]:r.LINEAR,[rp]:r.LINEAR_MIPMAP_NEAREST,[Qr]:r.LINEAR_MIPMAP_LINEAR},Ie={[yb]:r.NEVER,[Tb]:r.ALWAYS,[Sb]:r.LESS,[Km]:r.LEQUAL,[Mb]:r.EQUAL,[Qm]:r.GEQUAL,[bb]:r.GREATER,[Eb]:r.NOTEQUAL};function je(U,b){if(b.type===qi&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Ci||b.magFilter===rp||b.magFilter===Ku||b.magFilter===Qr||b.minFilter===Ci||b.minFilter===rp||b.minFilter===Ku||b.minFilter===Qr)&&Mt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(U,r.TEXTURE_WRAP_S,Q[b.wrapS]),r.texParameteri(U,r.TEXTURE_WRAP_T,Q[b.wrapT]),(U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY)&&r.texParameteri(U,r.TEXTURE_WRAP_R,Q[b.wrapR]),r.texParameteri(U,r.TEXTURE_MAG_FILTER,Ce[b.magFilter]),r.texParameteri(U,r.TEXTURE_MIN_FILTER,Ce[b.minFilter]),b.compareFunction&&(r.texParameteri(U,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(U,r.TEXTURE_COMPARE_FUNC,Ie[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Fn||b.minFilter!==Ku&&b.minFilter!==Qr||b.type===qi&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||a.get(b).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");r.texParameterf(U,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,o.getMaxAnisotropy())),a.get(b).__currentAnisotropy=b.anisotropy}}}function re(U,b){let $=!1;U.__webglInit===void 0&&(U.__webglInit=!0,b.addEventListener("dispose",z));const he=b.source;let ve=M.get(he);ve===void 0&&(ve={},M.set(he,ve));const Oe=k(b);if(Oe!==U.__cacheKey){ve[Oe]===void 0&&(ve[Oe]={texture:r.createTexture(),usedTimes:0},u.memory.textures++,$=!0),ve[Oe].usedTimes++;const Ge=ve[U.__cacheKey];Ge!==void 0&&(ve[U.__cacheKey].usedTimes--,Ge.usedTimes===0&&Z(b)),U.__cacheKey=Oe,U.__webglTexture=ve[Oe].texture}return $}function Se(U,b,$){return Math.floor(Math.floor(U/$)/b)}function Re(U,b,$,he){const Oe=U.updateRanges;if(Oe.length===0)n.texSubImage2D(r.TEXTURE_2D,0,0,0,b.width,b.height,$,he,b.data);else{Oe.sort(($e,qe)=>$e.start-qe.start);let Ge=0;for(let $e=1;$e<Oe.length;$e++){const qe=Oe[Ge],ke=Oe[$e],ht=qe.start+qe.count,pt=Se(ke.start,b.width,4),_t=Se(qe.start,b.width,4);ke.start<=ht+1&&pt===_t&&Se(ke.start+ke.count-1,b.width,4)===pt?qe.count=Math.max(qe.count,ke.start+ke.count-qe.start):(++Ge,Oe[Ge]=ke)}Oe.length=Ge+1;const me=n.getParameter(r.UNPACK_ROW_LENGTH),ye=n.getParameter(r.UNPACK_SKIP_PIXELS),He=n.getParameter(r.UNPACK_SKIP_ROWS);n.pixelStorei(r.UNPACK_ROW_LENGTH,b.width);for(let $e=0,qe=Oe.length;$e<qe;$e++){const ke=Oe[$e],ht=Math.floor(ke.start/4),pt=Math.ceil(ke.count/4),_t=ht%b.width,q=Math.floor(ht/b.width),ze=pt,Me=1;n.pixelStorei(r.UNPACK_SKIP_PIXELS,_t),n.pixelStorei(r.UNPACK_SKIP_ROWS,q),n.texSubImage2D(r.TEXTURE_2D,0,_t,q,ze,Me,$,he,b.data)}U.clearUpdateRanges(),n.pixelStorei(r.UNPACK_ROW_LENGTH,me),n.pixelStorei(r.UNPACK_SKIP_PIXELS,ye),n.pixelStorei(r.UNPACK_SKIP_ROWS,He)}}function nt(U,b,$){let he=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(he=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(he=r.TEXTURE_3D);const ve=re(U,b),Oe=b.source;n.bindTexture(he,U.__webglTexture,r.TEXTURE0+$);const Ge=a.get(Oe);if(Oe.version!==Ge.__version||ve===!0){if(n.activeTexture(r.TEXTURE0+$),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const Me=Kt.getPrimaries(Kt.workingColorSpace),Fe=b.colorSpace===yr?null:Kt.getPrimaries(b.colorSpace),We=b.colorSpace===yr||Me===Fe?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,We)}n.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment);let ye=y(b.image,!1,o.maxTextureSize);ye=nn(b,ye);const He=c.convert(b.format,b.colorSpace),$e=c.convert(b.type);let qe=R(b.internalFormat,He,$e,b.normalized,b.colorSpace,b.isVideoTexture);je(he,b);let ke;const ht=b.mipmaps,pt=b.isVideoTexture!==!0,_t=Ge.__version===void 0||ve===!0,q=Oe.dataReady,ze=L(b,ye);if(b.isDepthTexture)qe=I(b.format===Jr,b.type),_t&&(pt?n.texStorage2D(r.TEXTURE_2D,1,qe,ye.width,ye.height):n.texImage2D(r.TEXTURE_2D,0,qe,ye.width,ye.height,0,He,$e,null));else if(b.isDataTexture)if(ht.length>0){pt&&_t&&n.texStorage2D(r.TEXTURE_2D,ze,qe,ht[0].width,ht[0].height);for(let Me=0,Fe=ht.length;Me<Fe;Me++)ke=ht[Me],pt?q&&n.texSubImage2D(r.TEXTURE_2D,Me,0,0,ke.width,ke.height,He,$e,ke.data):n.texImage2D(r.TEXTURE_2D,Me,qe,ke.width,ke.height,0,He,$e,ke.data);b.generateMipmaps=!1}else pt?(_t&&n.texStorage2D(r.TEXTURE_2D,ze,qe,ye.width,ye.height),q&&Re(b,ye,He,$e)):n.texImage2D(r.TEXTURE_2D,0,qe,ye.width,ye.height,0,He,$e,ye.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){pt&&_t&&n.texStorage3D(r.TEXTURE_2D_ARRAY,ze,qe,ht[0].width,ht[0].height,ye.depth);for(let Me=0,Fe=ht.length;Me<Fe;Me++)if(ke=ht[Me],b.format!==Pi)if(He!==null)if(pt){if(q)if(b.layerUpdates.size>0){const We=ux(ke.width,ke.height,b.format,b.type);for(const we of b.layerUpdates){const De=ke.data.subarray(we*We/ke.data.BYTES_PER_ELEMENT,(we+1)*We/ke.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Me,0,0,we,ke.width,ke.height,1,He,De)}b.clearLayerUpdates()}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Me,0,0,0,ke.width,ke.height,ye.depth,He,ke.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Me,qe,ke.width,ke.height,ye.depth,0,ke.data,0,0);else Mt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else pt?q&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,Me,0,0,0,ke.width,ke.height,ye.depth,He,$e,ke.data):n.texImage3D(r.TEXTURE_2D_ARRAY,Me,qe,ke.width,ke.height,ye.depth,0,He,$e,ke.data)}else{pt&&_t&&n.texStorage2D(r.TEXTURE_2D,ze,qe,ht[0].width,ht[0].height);for(let Me=0,Fe=ht.length;Me<Fe;Me++)ke=ht[Me],b.format!==Pi?He!==null?pt?q&&n.compressedTexSubImage2D(r.TEXTURE_2D,Me,0,0,ke.width,ke.height,He,ke.data):n.compressedTexImage2D(r.TEXTURE_2D,Me,qe,ke.width,ke.height,0,ke.data):Mt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):pt?q&&n.texSubImage2D(r.TEXTURE_2D,Me,0,0,ke.width,ke.height,He,$e,ke.data):n.texImage2D(r.TEXTURE_2D,Me,qe,ke.width,ke.height,0,He,$e,ke.data)}else if(b.isDataArrayTexture)if(pt){if(_t&&n.texStorage3D(r.TEXTURE_2D_ARRAY,ze,qe,ye.width,ye.height,ye.depth),q)if(b.layerUpdates.size>0){const Me=ux(ye.width,ye.height,b.format,b.type);for(const Fe of b.layerUpdates){const We=ye.data.subarray(Fe*Me/ye.data.BYTES_PER_ELEMENT,(Fe+1)*Me/ye.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Fe,ye.width,ye.height,1,He,$e,We)}b.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ye.width,ye.height,ye.depth,He,$e,ye.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,qe,ye.width,ye.height,ye.depth,0,He,$e,ye.data);else if(b.isData3DTexture)pt?(_t&&n.texStorage3D(r.TEXTURE_3D,ze,qe,ye.width,ye.height,ye.depth),q&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ye.width,ye.height,ye.depth,He,$e,ye.data)):n.texImage3D(r.TEXTURE_3D,0,qe,ye.width,ye.height,ye.depth,0,He,$e,ye.data);else if(b.isFramebufferTexture){if(_t)if(pt)n.texStorage2D(r.TEXTURE_2D,ze,qe,ye.width,ye.height);else{let Me=ye.width,Fe=ye.height;for(let We=0;We<ze;We++)n.texImage2D(r.TEXTURE_2D,We,qe,Me,Fe,0,He,$e,null),Me>>=1,Fe>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in r){const Me=r.canvas;if(Me.hasAttribute("layoutsubtree")||Me.setAttribute("layoutsubtree","true"),ye.parentNode!==Me){Me.appendChild(ye),_.add(b),Me.onpaint=Fe=>{const We=Fe.changedElements;for(const we of _)We.includes(we.image)&&(we.needsUpdate=!0)},Me.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,ye);else{const We=r.RGBA,we=r.RGBA,De=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,We,we,De,ye)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(ht.length>0){if(pt&&_t){const Me=an(ht[0]);n.texStorage2D(r.TEXTURE_2D,ze,qe,Me.width,Me.height)}for(let Me=0,Fe=ht.length;Me<Fe;Me++)ke=ht[Me],pt?q&&n.texSubImage2D(r.TEXTURE_2D,Me,0,0,He,$e,ke):n.texImage2D(r.TEXTURE_2D,Me,qe,He,$e,ke);b.generateMipmaps=!1}else if(pt){if(_t){const Me=an(ye);n.texStorage2D(r.TEXTURE_2D,ze,qe,Me.width,Me.height)}q&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,He,$e,ye)}else n.texImage2D(r.TEXTURE_2D,0,qe,He,$e,ye);x(b)&&O(he),Ge.__version=Oe.version,b.onUpdate&&b.onUpdate(b)}U.__version=b.version}function vt(U,b,$){if(b.image.length!==6)return;const he=re(U,b),ve=b.source;n.bindTexture(r.TEXTURE_CUBE_MAP,U.__webglTexture,r.TEXTURE0+$);const Oe=a.get(ve);if(ve.version!==Oe.__version||he===!0){n.activeTexture(r.TEXTURE0+$);const Ge=Kt.getPrimaries(Kt.workingColorSpace),me=b.colorSpace===yr?null:Kt.getPrimaries(b.colorSpace),ye=b.colorSpace===yr||Ge===me?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const He=b.isCompressedTexture||b.image[0].isCompressedTexture,$e=b.image[0]&&b.image[0].isDataTexture,qe=[];for(let we=0;we<6;we++)!He&&!$e?qe[we]=y(b.image[we],!0,o.maxCubemapSize):qe[we]=$e?b.image[we].image:b.image[we],qe[we]=nn(b,qe[we]);const ke=qe[0],ht=c.convert(b.format,b.colorSpace),pt=c.convert(b.type),_t=R(b.internalFormat,ht,pt,b.normalized,b.colorSpace),q=b.isVideoTexture!==!0,ze=Oe.__version===void 0||he===!0,Me=ve.dataReady;let Fe=L(b,ke);je(r.TEXTURE_CUBE_MAP,b);let We;if(He){q&&ze&&n.texStorage2D(r.TEXTURE_CUBE_MAP,Fe,_t,ke.width,ke.height);for(let we=0;we<6;we++){We=qe[we].mipmaps;for(let De=0;De<We.length;De++){const Qe=We[De];b.format!==Pi?ht!==null?q?Me&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,De,0,0,Qe.width,Qe.height,ht,Qe.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,De,_t,Qe.width,Qe.height,0,Qe.data):Mt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):q?Me&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,De,0,0,Qe.width,Qe.height,ht,pt,Qe.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,De,_t,Qe.width,Qe.height,0,ht,pt,Qe.data)}}}else{if(We=b.mipmaps,q&&ze){We.length>0&&Fe++;const we=an(qe[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,Fe,_t,we.width,we.height)}for(let we=0;we<6;we++)if($e){q?Me&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,qe[we].width,qe[we].height,ht,pt,qe[we].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,_t,qe[we].width,qe[we].height,0,ht,pt,qe[we].data);for(let De=0;De<We.length;De++){const Sn=We[De].image[we].image;q?Me&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,De+1,0,0,Sn.width,Sn.height,ht,pt,Sn.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,De+1,_t,Sn.width,Sn.height,0,ht,pt,Sn.data)}}else{q?Me&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,ht,pt,qe[we]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,_t,ht,pt,qe[we]);for(let De=0;De<We.length;De++){const Qe=We[De];q?Me&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,De+1,0,0,ht,pt,Qe.image[we]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+we,De+1,_t,ht,pt,Qe.image[we])}}}x(b)&&O(r.TEXTURE_CUBE_MAP),Oe.__version=ve.version,b.onUpdate&&b.onUpdate(b)}U.__version=b.version}function Ze(U,b,$,he,ve,Oe){const Ge=c.convert($.format,$.colorSpace),me=c.convert($.type),ye=R($.internalFormat,Ge,me,$.normalized,$.colorSpace),He=a.get(b),$e=a.get($);if($e.__renderTarget=b,!He.__hasExternalTextures){const qe=Math.max(1,b.width>>Oe),ke=Math.max(1,b.height>>Oe);ve===r.TEXTURE_3D||ve===r.TEXTURE_2D_ARRAY?n.texImage3D(ve,Oe,ye,qe,ke,b.depth,0,Ge,me,null):n.texImage2D(ve,Oe,ye,qe,ke,0,Ge,me,null)}n.bindFramebuffer(r.FRAMEBUFFER,U),Un(b)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,he,ve,$e.__webglTexture,0,dn(b)):(ve===r.TEXTURE_2D||ve>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ve<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,he,ve,$e.__webglTexture,Oe),n.bindFramebuffer(r.FRAMEBUFFER,null)}function yn(U,b,$){if(r.bindRenderbuffer(r.RENDERBUFFER,U),b.depthBuffer){const he=b.depthTexture,ve=he&&he.isDepthTexture?he.type:null,Oe=I(b.stencilBuffer,ve),Ge=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Un(b)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,dn(b),Oe,b.width,b.height):$?r.renderbufferStorageMultisample(r.RENDERBUFFER,dn(b),Oe,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,Oe,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ge,r.RENDERBUFFER,U)}else{const he=b.textures;for(let ve=0;ve<he.length;ve++){const Oe=he[ve],Ge=c.convert(Oe.format,Oe.colorSpace),me=c.convert(Oe.type),ye=R(Oe.internalFormat,Ge,me,Oe.normalized,Oe.colorSpace);Un(b)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,dn(b),ye,b.width,b.height):$?r.renderbufferStorageMultisample(r.RENDERBUFFER,dn(b),ye,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,ye,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ot(U,b,$){const he=b.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(r.FRAMEBUFFER,U),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ve=a.get(b.depthTexture);if(ve.__renderTarget=b,(!ve.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),he){if(ve.__webglInit===void 0&&(ve.__webglInit=!0,b.depthTexture.addEventListener("dispose",z)),ve.__webglTexture===void 0){ve.__webglTexture=r.createTexture(),n.bindTexture(r.TEXTURE_CUBE_MAP,ve.__webglTexture),je(r.TEXTURE_CUBE_MAP,b.depthTexture);const He=c.convert(b.depthTexture.format),$e=c.convert(b.depthTexture.type);let qe;b.depthTexture.format===Cs?qe=r.DEPTH_COMPONENT24:b.depthTexture.format===Jr&&(qe=r.DEPTH24_STENCIL8);for(let ke=0;ke<6;ke++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ke,0,qe,b.width,b.height,0,He,$e,null)}}else te(b.depthTexture,0);const Oe=ve.__webglTexture,Ge=dn(b),me=he?r.TEXTURE_CUBE_MAP_POSITIVE_X+$:r.TEXTURE_2D,ye=b.depthTexture.format===Jr?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(b.depthTexture.format===Cs)Un(b)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ye,me,Oe,0,Ge):r.framebufferTexture2D(r.FRAMEBUFFER,ye,me,Oe,0);else if(b.depthTexture.format===Jr)Un(b)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ye,me,Oe,0,Ge):r.framebufferTexture2D(r.FRAMEBUFFER,ye,me,Oe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Vt(U){const b=a.get(U),$=U.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==U.depthTexture){const he=U.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),he){const ve=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,he.removeEventListener("dispose",ve)};he.addEventListener("dispose",ve),b.__depthDisposeCallback=ve}b.__boundDepthTexture=he}if(U.depthTexture&&!b.__autoAllocateDepthBuffer)if($)for(let he=0;he<6;he++)Ot(b.__webglFramebuffer[he],U,he);else{const he=U.texture.mipmaps;he&&he.length>0?Ot(b.__webglFramebuffer[0],U,0):Ot(b.__webglFramebuffer,U,0)}else if($){b.__webglDepthbuffer=[];for(let he=0;he<6;he++)if(n.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[he]),b.__webglDepthbuffer[he]===void 0)b.__webglDepthbuffer[he]=r.createRenderbuffer(),yn(b.__webglDepthbuffer[he],U,!1);else{const ve=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Oe=b.__webglDepthbuffer[he];r.bindRenderbuffer(r.RENDERBUFFER,Oe),r.framebufferRenderbuffer(r.FRAMEBUFFER,ve,r.RENDERBUFFER,Oe)}}else{const he=U.texture.mipmaps;if(he&&he.length>0?n.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[0]):n.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=r.createRenderbuffer(),yn(b.__webglDepthbuffer,U,!1);else{const ve=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Oe=b.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Oe),r.framebufferRenderbuffer(r.FRAMEBUFFER,ve,r.RENDERBUFFER,Oe)}}n.bindFramebuffer(r.FRAMEBUFFER,null)}function Xt(U,b,$){const he=a.get(U);b!==void 0&&Ze(he.__webglFramebuffer,U,U.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),$!==void 0&&Vt(U)}function It(U){const b=U.texture,$=a.get(U),he=a.get(b);U.addEventListener("dispose",T);const ve=U.textures,Oe=U.isWebGLCubeRenderTarget===!0,Ge=ve.length>1;if(Ge||(he.__webglTexture===void 0&&(he.__webglTexture=r.createTexture()),he.__version=b.version,u.memory.textures++),Oe){$.__webglFramebuffer=[];for(let me=0;me<6;me++)if(b.mipmaps&&b.mipmaps.length>0){$.__webglFramebuffer[me]=[];for(let ye=0;ye<b.mipmaps.length;ye++)$.__webglFramebuffer[me][ye]=r.createFramebuffer()}else $.__webglFramebuffer[me]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){$.__webglFramebuffer=[];for(let me=0;me<b.mipmaps.length;me++)$.__webglFramebuffer[me]=r.createFramebuffer()}else $.__webglFramebuffer=r.createFramebuffer();if(Ge)for(let me=0,ye=ve.length;me<ye;me++){const He=a.get(ve[me]);He.__webglTexture===void 0&&(He.__webglTexture=r.createTexture(),u.memory.textures++)}if(U.samples>0&&Un(U)===!1){$.__webglMultisampledFramebuffer=r.createFramebuffer(),$.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let me=0;me<ve.length;me++){const ye=ve[me];$.__webglColorRenderbuffer[me]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,$.__webglColorRenderbuffer[me]);const He=c.convert(ye.format,ye.colorSpace),$e=c.convert(ye.type),qe=R(ye.internalFormat,He,$e,ye.normalized,ye.colorSpace,U.isXRRenderTarget===!0),ke=dn(U);r.renderbufferStorageMultisample(r.RENDERBUFFER,ke,qe,U.width,U.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,$.__webglColorRenderbuffer[me])}r.bindRenderbuffer(r.RENDERBUFFER,null),U.depthBuffer&&($.__webglDepthRenderbuffer=r.createRenderbuffer(),yn($.__webglDepthRenderbuffer,U,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Oe){n.bindTexture(r.TEXTURE_CUBE_MAP,he.__webglTexture),je(r.TEXTURE_CUBE_MAP,b);for(let me=0;me<6;me++)if(b.mipmaps&&b.mipmaps.length>0)for(let ye=0;ye<b.mipmaps.length;ye++)Ze($.__webglFramebuffer[me][ye],U,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+me,ye);else Ze($.__webglFramebuffer[me],U,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);x(b)&&O(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ge){for(let me=0,ye=ve.length;me<ye;me++){const He=ve[me],$e=a.get(He);let qe=r.TEXTURE_2D;(U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(qe=U.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(qe,$e.__webglTexture),je(qe,He),Ze($.__webglFramebuffer,U,He,r.COLOR_ATTACHMENT0+me,qe,0),x(He)&&O(qe)}n.unbindTexture()}else{let me=r.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(me=U.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(me,he.__webglTexture),je(me,b),b.mipmaps&&b.mipmaps.length>0)for(let ye=0;ye<b.mipmaps.length;ye++)Ze($.__webglFramebuffer[ye],U,b,r.COLOR_ATTACHMENT0,me,ye);else Ze($.__webglFramebuffer,U,b,r.COLOR_ATTACHMENT0,me,0);x(b)&&O(me),n.unbindTexture()}U.depthBuffer&&Vt(U)}function Dn(U){const b=U.textures;for(let $=0,he=b.length;$<he;$++){const ve=b[$];if(x(ve)){const Oe=N(U),Ge=a.get(ve).__webglTexture;n.bindTexture(Oe,Ge),O(Oe),n.unbindTexture()}}}const Nn=[],Ln=[];function Hn(U){if(U.samples>0){if(Un(U)===!1){const b=U.textures,$=U.width,he=U.height;let ve=r.COLOR_BUFFER_BIT;const Oe=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ge=a.get(U),me=b.length>1;if(me)for(let He=0;He<b.length;He++)n.bindFramebuffer(r.FRAMEBUFFER,Ge.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+He,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,Ge.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+He,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,Ge.__webglMultisampledFramebuffer);const ye=U.texture.mipmaps;ye&&ye.length>0?n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ge.__webglFramebuffer[0]):n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ge.__webglFramebuffer);for(let He=0;He<b.length;He++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(ve|=r.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(ve|=r.STENCIL_BUFFER_BIT)),me){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ge.__webglColorRenderbuffer[He]);const $e=a.get(b[He]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,$e,0)}r.blitFramebuffer(0,0,$,he,0,0,$,he,ve,r.NEAREST),m===!0&&(Nn.length=0,Ln.length=0,Nn.push(r.COLOR_ATTACHMENT0+He),U.depthBuffer&&U.resolveDepthBuffer===!1&&(Nn.push(Oe),Ln.push(Oe),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Ln)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Nn))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),me)for(let He=0;He<b.length;He++){n.bindFramebuffer(r.FRAMEBUFFER,Ge.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+He,r.RENDERBUFFER,Ge.__webglColorRenderbuffer[He]);const $e=a.get(b[He]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,Ge.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+He,r.TEXTURE_2D,$e,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ge.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&m){const b=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}}function dn(U){return Math.min(o.maxSamples,U.samples)}function Un(U){const b=a.get(U);return U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function j(U){const b=u.render.frame;v.get(U)!==b&&(v.set(U,b),U.update())}function nn(U,b){const $=U.colorSpace,he=U.format,ve=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||$!==Uc&&$!==yr&&(Kt.getTransfer($)===gn?(he!==Pi||ve!==Ea)&&Mt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):tn("WebGLTextures: Unsupported texture color space:",$)),b}function an(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(d.width=U.naturalWidth||U.width,d.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(d.width=U.displayWidth,d.height=U.displayHeight):(d.width=U.width,d.height=U.height),d}this.allocateTextureUnit=H,this.resetTextureUnits=de,this.getTextureUnits=xe,this.setTextureUnits=ae,this.setTexture2D=te,this.setTexture2DArray=_e,this.setTexture3D=Ae,this.setTextureCube=P,this.rebindTextures=Xt,this.setupRenderTarget=It,this.updateRenderTargetMipmap=Dn,this.updateMultisampleRenderTarget=Hn,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=Ze,this.useMultisampledRTT=Un,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Jw(r,e){function n(a,o=yr){let c;const u=Kt.getTransfer(o);if(a===Ea)return r.UNSIGNED_BYTE;if(a===qm)return r.UNSIGNED_SHORT_4_4_4_4;if(a===Wm)return r.UNSIGNED_SHORT_5_5_5_1;if(a===hy)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===dy)return r.UNSIGNED_INT_10F_11F_11F_REV;if(a===uy)return r.BYTE;if(a===fy)return r.SHORT;if(a===Nc)return r.UNSIGNED_SHORT;if(a===Xm)return r.INT;if(a===Qa)return r.UNSIGNED_INT;if(a===qi)return r.FLOAT;if(a===Di)return r.HALF_FLOAT;if(a===py)return r.ALPHA;if(a===my)return r.RGB;if(a===Pi)return r.RGBA;if(a===Cs)return r.DEPTH_COMPONENT;if(a===Jr)return r.DEPTH_STENCIL;if(a===gy)return r.RED;if(a===Ym)return r.RED_INTEGER;if(a===to)return r.RG;if(a===jm)return r.RG_INTEGER;if(a===Zm)return r.RGBA_INTEGER;if(a===Bf||a===zf||a===If||a===Hf)if(u===gn)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===Bf)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===zf)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===If)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===Hf)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===Bf)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===zf)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===If)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===Hf)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===im||a===am||a===sm||a===rm)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===im)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===am)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===sm)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===rm)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===om||a===lm||a===cm||a===um||a===fm||a===Vf||a===hm)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(a===om||a===lm)return u===gn?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===cm)return u===gn?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(a===um)return c.COMPRESSED_R11_EAC;if(a===fm)return c.COMPRESSED_SIGNED_R11_EAC;if(a===Vf)return c.COMPRESSED_RG11_EAC;if(a===hm)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(a===dm||a===pm||a===mm||a===gm||a===vm||a===_m||a===xm||a===ym||a===Sm||a===Mm||a===bm||a===Em||a===Tm||a===Am)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(a===dm)return u===gn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===pm)return u===gn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===mm)return u===gn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===gm)return u===gn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===vm)return u===gn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===_m)return u===gn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===xm)return u===gn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===ym)return u===gn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===Sm)return u===gn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===Mm)return u===gn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===bm)return u===gn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===Em)return u===gn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===Tm)return u===gn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===Am)return u===gn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===wm||a===Rm||a===Cm)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(a===wm)return u===gn?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===Rm)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===Cm)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===Dm||a===Nm||a===Xf||a===Lm)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(a===Dm)return c.COMPRESSED_RED_RGTC1_EXT;if(a===Nm)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===Xf)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===Lm)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===Lc?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:n}}const $w=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,e2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class t2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const a=new Ty(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,a=new Cn({vertexShader:$w,fragmentShader:e2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ba(new ah(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class n2 extends io{constructor(e,n){super();const a=this;let o=null,c=1,u=null,p="local-floor",m=1,d=null,v=null,_=null,g=null,M=null,E=null;const C=typeof XRWebGLBinding<"u",y=new t2,x={},O=n.getContextAttributes();let N=null,R=null;const I=[],L=[],z=new Dt;let T=null;const B=new ba;B.viewport=new Yn;const Z=new ba;Z.viewport=new Yn;const G=[B,Z],Y=new u1;let de=null,xe=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let Se=I[re];return Se===void 0&&(Se=new pp,I[re]=Se),Se.getTargetRaySpace()},this.getControllerGrip=function(re){let Se=I[re];return Se===void 0&&(Se=new pp,I[re]=Se),Se.getGripSpace()},this.getHand=function(re){let Se=I[re];return Se===void 0&&(Se=new pp,I[re]=Se),Se.getHandSpace()};function ae(re){const Se=L.indexOf(re.inputSource);if(Se===-1)return;const Re=I[Se];Re!==void 0&&(Re.update(re.inputSource,re.frame,d||u),Re.dispatchEvent({type:re.type,data:re.inputSource}))}function H(){o.removeEventListener("select",ae),o.removeEventListener("selectstart",ae),o.removeEventListener("selectend",ae),o.removeEventListener("squeeze",ae),o.removeEventListener("squeezestart",ae),o.removeEventListener("squeezeend",ae),o.removeEventListener("end",H),o.removeEventListener("inputsourceschange",k);for(let re=0;re<I.length;re++){const Se=L[re];Se!==null&&(L[re]=null,I[re].disconnect(Se))}de=null,xe=null,y.reset();for(const re in x)delete x[re];e.setRenderTarget(N),M=null,g=null,_=null,o=null,R=null,je.stop(),a.isPresenting=!1,e.setPixelRatio(T),e.setSize(z.width,z.height,!1),a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){c=re,a.isPresenting===!0&&Mt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){p=re,a.isPresenting===!0&&Mt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||u},this.setReferenceSpace=function(re){d=re},this.getBaseLayer=function(){return g!==null?g:M},this.getBinding=function(){return _===null&&C&&(_=new XRWebGLBinding(o,n)),_},this.getFrame=function(){return E},this.getSession=function(){return o},this.setSession=async function(re){if(o=re,o!==null){if(N=e.getRenderTarget(),o.addEventListener("select",ae),o.addEventListener("selectstart",ae),o.addEventListener("selectend",ae),o.addEventListener("squeeze",ae),o.addEventListener("squeezestart",ae),o.addEventListener("squeezeend",ae),o.addEventListener("end",H),o.addEventListener("inputsourceschange",k),O.xrCompatible!==!0&&await n.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(z),C&&"createProjectionLayer"in XRWebGLBinding.prototype){let Re=null,nt=null,vt=null;O.depth&&(vt=O.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Re=O.stencil?Jr:Cs,nt=O.stencil?Lc:Qa);const Ze={colorFormat:n.RGBA8,depthFormat:vt,scaleFactor:c};_=this.getBinding(),g=_.createProjectionLayer(Ze),o.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),R=new _i(g.textureWidth,g.textureHeight,{format:Pi,type:Ea,depthTexture:new fl(g.textureWidth,g.textureHeight,nt,void 0,void 0,void 0,void 0,void 0,void 0,Re),stencilBuffer:O.stencil,colorSpace:e.outputColorSpace,samples:O.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const Re={antialias:O.antialias,alpha:!0,depth:O.depth,stencil:O.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(o,n,Re),o.updateRenderState({baseLayer:M}),e.setPixelRatio(1),e.setSize(M.framebufferWidth,M.framebufferHeight,!1),R=new _i(M.framebufferWidth,M.framebufferHeight,{format:Pi,type:Ea,colorSpace:e.outputColorSpace,stencilBuffer:O.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}R.isXRRenderTarget=!0,this.setFoveation(m),d=null,u=await o.requestReferenceSpace(p),je.setContext(o),je.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function k(re){for(let Se=0;Se<re.removed.length;Se++){const Re=re.removed[Se],nt=L.indexOf(Re);nt>=0&&(L[nt]=null,I[nt].disconnect(Re))}for(let Se=0;Se<re.added.length;Se++){const Re=re.added[Se];let nt=L.indexOf(Re);if(nt===-1){for(let Ze=0;Ze<I.length;Ze++)if(Ze>=L.length){L.push(Re),nt=Ze;break}else if(L[Ze]===null){L[Ze]=Re,nt=Ze;break}if(nt===-1)break}const vt=I[nt];vt&&vt.connect(Re)}}const te=new ee,_e=new ee;function Ae(re,Se,Re){te.setFromMatrixPosition(Se.matrixWorld),_e.setFromMatrixPosition(Re.matrixWorld);const nt=te.distanceTo(_e),vt=Se.projectionMatrix.elements,Ze=Re.projectionMatrix.elements,yn=vt[14]/(vt[10]-1),Ot=vt[14]/(vt[10]+1),Vt=(vt[9]+1)/vt[5],Xt=(vt[9]-1)/vt[5],It=(vt[8]-1)/vt[0],Dn=(Ze[8]+1)/Ze[0],Nn=yn*It,Ln=yn*Dn,Hn=nt/(-It+Dn),dn=Hn*-It;if(Se.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(dn),re.translateZ(Hn),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),vt[10]===-1)re.projectionMatrix.copy(Se.projectionMatrix),re.projectionMatrixInverse.copy(Se.projectionMatrixInverse);else{const Un=yn+Hn,j=Ot+Hn,nn=Nn-dn,an=Ln+(nt-dn),U=Vt*Ot/j*Un,b=Xt*Ot/j*Un;re.projectionMatrix.makePerspective(nn,an,U,b,Un,j),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function P(re,Se){Se===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(Se.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(o===null)return;let Se=re.near,Re=re.far;y.texture!==null&&(y.depthNear>0&&(Se=y.depthNear),y.depthFar>0&&(Re=y.depthFar)),Y.near=Z.near=B.near=Se,Y.far=Z.far=B.far=Re,(de!==Y.near||xe!==Y.far)&&(o.updateRenderState({depthNear:Y.near,depthFar:Y.far}),de=Y.near,xe=Y.far),Y.layers.mask=re.layers.mask|6,B.layers.mask=Y.layers.mask&-5,Z.layers.mask=Y.layers.mask&-3;const nt=re.parent,vt=Y.cameras;P(Y,nt);for(let Ze=0;Ze<vt.length;Ze++)P(vt[Ze],nt);vt.length===2?Ae(Y,B,Z):Y.projectionMatrix.copy(B.projectionMatrix),Q(re,Y,nt)};function Q(re,Se,Re){Re===null?re.matrix.copy(Se.matrixWorld):(re.matrix.copy(Re.matrixWorld),re.matrix.invert(),re.matrix.multiply(Se.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(Se.projectionMatrix),re.projectionMatrixInverse.copy(Se.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=Um*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return Y},this.getFoveation=function(){if(!(g===null&&M===null))return m},this.setFoveation=function(re){m=re,g!==null&&(g.fixedFoveation=re),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=re)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(Y)},this.getCameraTexture=function(re){return x[re]};let Ce=null;function Ie(re,Se){if(v=Se.getViewerPose(d||u),E=Se,v!==null){const Re=v.views;M!==null&&(e.setRenderTargetFramebuffer(R,M.framebuffer),e.setRenderTarget(R));let nt=!1;Re.length!==Y.cameras.length&&(Y.cameras.length=0,nt=!0);for(let Ot=0;Ot<Re.length;Ot++){const Vt=Re[Ot];let Xt=null;if(M!==null)Xt=M.getViewport(Vt);else{const Dn=_.getViewSubImage(g,Vt);Xt=Dn.viewport,Ot===0&&(e.setRenderTargetTextures(R,Dn.colorTexture,Dn.depthStencilTexture),e.setRenderTarget(R))}let It=G[Ot];It===void 0&&(It=new ba,It.layers.enable(Ot),It.viewport=new Yn,G[Ot]=It),It.matrix.fromArray(Vt.transform.matrix),It.matrix.decompose(It.position,It.quaternion,It.scale),It.projectionMatrix.fromArray(Vt.projectionMatrix),It.projectionMatrixInverse.copy(It.projectionMatrix).invert(),It.viewport.set(Xt.x,Xt.y,Xt.width,Xt.height),Ot===0&&(Y.matrix.copy(It.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale)),nt===!0&&Y.cameras.push(It)}const vt=o.enabledFeatures;if(vt&&vt.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&C){_=a.getBinding();const Ot=_.getDepthInformation(Re[0]);Ot&&Ot.isValid&&Ot.texture&&y.init(Ot,o.renderState)}if(vt&&vt.includes("camera-access")&&C){e.state.unbindTexture(),_=a.getBinding();for(let Ot=0;Ot<Re.length;Ot++){const Vt=Re[Ot].camera;if(Vt){let Xt=x[Vt];Xt||(Xt=new Ty,x[Vt]=Xt);const It=_.getCameraImage(Vt);Xt.sourceTexture=It}}}}for(let Re=0;Re<I.length;Re++){const nt=L[Re],vt=I[Re];nt!==null&&vt!==void 0&&vt.update(nt,Se,d||u)}Ce&&Ce(re,Se),Se.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:Se}),E=null}const je=new Ry;je.setAnimationLoop(Ie),this.setAnimationLoop=function(re){Ce=re},this.dispose=function(){}}}const i2=new kn,Py=new Ct;Py.set(-1,0,0,0,1,0,0,0,1);function a2(r,e){function n(y,x){y.matrixAutoUpdate===!0&&y.updateMatrix(),x.value.copy(y.matrix)}function a(y,x){x.color.getRGB(y.fogColor.value,Ay(r)),x.isFog?(y.fogNear.value=x.near,y.fogFar.value=x.far):x.isFogExp2&&(y.fogDensity.value=x.density)}function o(y,x,O,N,R){x.isNodeMaterial?x.uniformsNeedUpdate=!1:x.isMeshBasicMaterial?c(y,x):x.isMeshLambertMaterial?(c(y,x),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)):x.isMeshToonMaterial?(c(y,x),_(y,x)):x.isMeshPhongMaterial?(c(y,x),v(y,x),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)):x.isMeshStandardMaterial?(c(y,x),g(y,x),x.isMeshPhysicalMaterial&&M(y,x,R)):x.isMeshMatcapMaterial?(c(y,x),E(y,x)):x.isMeshDepthMaterial?c(y,x):x.isMeshDistanceMaterial?(c(y,x),C(y,x)):x.isMeshNormalMaterial?c(y,x):x.isLineBasicMaterial?(u(y,x),x.isLineDashedMaterial&&p(y,x)):x.isPointsMaterial?m(y,x,O,N):x.isSpriteMaterial?d(y,x):x.isShadowMaterial?(y.color.value.copy(x.color),y.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function c(y,x){y.opacity.value=x.opacity,x.color&&y.diffuse.value.copy(x.color),x.emissive&&y.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(y.map.value=x.map,n(x.map,y.mapTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,n(x.alphaMap,y.alphaMapTransform)),x.bumpMap&&(y.bumpMap.value=x.bumpMap,n(x.bumpMap,y.bumpMapTransform),y.bumpScale.value=x.bumpScale,x.side===Wi&&(y.bumpScale.value*=-1)),x.normalMap&&(y.normalMap.value=x.normalMap,n(x.normalMap,y.normalMapTransform),y.normalScale.value.copy(x.normalScale),x.side===Wi&&y.normalScale.value.negate()),x.displacementMap&&(y.displacementMap.value=x.displacementMap,n(x.displacementMap,y.displacementMapTransform),y.displacementScale.value=x.displacementScale,y.displacementBias.value=x.displacementBias),x.emissiveMap&&(y.emissiveMap.value=x.emissiveMap,n(x.emissiveMap,y.emissiveMapTransform)),x.specularMap&&(y.specularMap.value=x.specularMap,n(x.specularMap,y.specularMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest);const O=e.get(x),N=O.envMap,R=O.envMapRotation;N&&(y.envMap.value=N,y.envMapRotation.value.setFromMatrix4(i2.makeRotationFromEuler(R)).transpose(),N.isCubeTexture&&N.isRenderTargetTexture===!1&&y.envMapRotation.value.premultiply(Py),y.reflectivity.value=x.reflectivity,y.ior.value=x.ior,y.refractionRatio.value=x.refractionRatio),x.lightMap&&(y.lightMap.value=x.lightMap,y.lightMapIntensity.value=x.lightMapIntensity,n(x.lightMap,y.lightMapTransform)),x.aoMap&&(y.aoMap.value=x.aoMap,y.aoMapIntensity.value=x.aoMapIntensity,n(x.aoMap,y.aoMapTransform))}function u(y,x){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,x.map&&(y.map.value=x.map,n(x.map,y.mapTransform))}function p(y,x){y.dashSize.value=x.dashSize,y.totalSize.value=x.dashSize+x.gapSize,y.scale.value=x.scale}function m(y,x,O,N){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,y.size.value=x.size*O,y.scale.value=N*.5,x.map&&(y.map.value=x.map,n(x.map,y.uvTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,n(x.alphaMap,y.alphaMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest)}function d(y,x){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,y.rotation.value=x.rotation,x.map&&(y.map.value=x.map,n(x.map,y.mapTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,n(x.alphaMap,y.alphaMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest)}function v(y,x){y.specular.value.copy(x.specular),y.shininess.value=Math.max(x.shininess,1e-4)}function _(y,x){x.gradientMap&&(y.gradientMap.value=x.gradientMap)}function g(y,x){y.metalness.value=x.metalness,x.metalnessMap&&(y.metalnessMap.value=x.metalnessMap,n(x.metalnessMap,y.metalnessMapTransform)),y.roughness.value=x.roughness,x.roughnessMap&&(y.roughnessMap.value=x.roughnessMap,n(x.roughnessMap,y.roughnessMapTransform)),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)}function M(y,x,O){y.ior.value=x.ior,x.sheen>0&&(y.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),y.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(y.sheenColorMap.value=x.sheenColorMap,n(x.sheenColorMap,y.sheenColorMapTransform)),x.sheenRoughnessMap&&(y.sheenRoughnessMap.value=x.sheenRoughnessMap,n(x.sheenRoughnessMap,y.sheenRoughnessMapTransform))),x.clearcoat>0&&(y.clearcoat.value=x.clearcoat,y.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(y.clearcoatMap.value=x.clearcoatMap,n(x.clearcoatMap,y.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,n(x.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(y.clearcoatNormalMap.value=x.clearcoatNormalMap,n(x.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===Wi&&y.clearcoatNormalScale.value.negate())),x.dispersion>0&&(y.dispersion.value=x.dispersion),x.iridescence>0&&(y.iridescence.value=x.iridescence,y.iridescenceIOR.value=x.iridescenceIOR,y.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(y.iridescenceMap.value=x.iridescenceMap,n(x.iridescenceMap,y.iridescenceMapTransform)),x.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=x.iridescenceThicknessMap,n(x.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),x.transmission>0&&(y.transmission.value=x.transmission,y.transmissionSamplerMap.value=O.texture,y.transmissionSamplerSize.value.set(O.width,O.height),x.transmissionMap&&(y.transmissionMap.value=x.transmissionMap,n(x.transmissionMap,y.transmissionMapTransform)),y.thickness.value=x.thickness,x.thicknessMap&&(y.thicknessMap.value=x.thicknessMap,n(x.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=x.attenuationDistance,y.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(y.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(y.anisotropyMap.value=x.anisotropyMap,n(x.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=x.specularIntensity,y.specularColor.value.copy(x.specularColor),x.specularColorMap&&(y.specularColorMap.value=x.specularColorMap,n(x.specularColorMap,y.specularColorMapTransform)),x.specularIntensityMap&&(y.specularIntensityMap.value=x.specularIntensityMap,n(x.specularIntensityMap,y.specularIntensityMapTransform))}function E(y,x){x.matcap&&(y.matcap.value=x.matcap)}function C(y,x){const O=e.get(x).light;y.referencePosition.value.setFromMatrixPosition(O.matrixWorld),y.nearDistance.value=O.shadow.camera.near,y.farDistance.value=O.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:o}}function s2(r,e,n,a){let o={},c={},u=[];const p=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(R,I){const L=I.program;a.uniformBlockBinding(R,L)}function d(R,I){let L=o[R.id];L===void 0&&(y(R),L=v(R),o[R.id]=L,R.addEventListener("dispose",O));const z=I.program;a.updateUBOMapping(R,z);const T=e.render.frame;c[R.id]!==T&&(g(R),c[R.id]=T)}function v(R){const I=_();R.__bindingPointIndex=I;const L=r.createBuffer(),z=R.__size,T=R.usage;return r.bindBuffer(r.UNIFORM_BUFFER,L),r.bufferData(r.UNIFORM_BUFFER,z,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,I,L),L}function _(){for(let R=0;R<p;R++)if(u.indexOf(R)===-1)return u.push(R),R;return tn("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(R){const I=o[R.id],L=R.uniforms,z=R.__cache;r.bindBuffer(r.UNIFORM_BUFFER,I);for(let T=0,B=L.length;T<B;T++){const Z=L[T];if(Array.isArray(Z))for(let G=0,Y=Z.length;G<Y;G++)M(Z[G],T,G,z);else M(Z,T,0,z)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function M(R,I,L,z){if(C(R,I,L,z)===!0){const T=R.__offset,B=R.value;if(Array.isArray(B)){let Z=0;for(let G=0;G<B.length;G++){const Y=B[G],de=x(Y);E(Y,R.__data,Z),typeof Y!="number"&&typeof Y!="boolean"&&!Y.isMatrix3&&!ArrayBuffer.isView(Y)&&(Z+=de.storage/Float32Array.BYTES_PER_ELEMENT)}}else E(B,R.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,T,R.__data)}}function E(R,I,L){typeof R=="number"||typeof R=="boolean"?I[0]=R:R.isMatrix3?(I[0]=R.elements[0],I[1]=R.elements[1],I[2]=R.elements[2],I[3]=0,I[4]=R.elements[3],I[5]=R.elements[4],I[6]=R.elements[5],I[7]=0,I[8]=R.elements[6],I[9]=R.elements[7],I[10]=R.elements[8],I[11]=0):ArrayBuffer.isView(R)?I.set(new R.constructor(R.buffer,R.byteOffset,I.length)):R.toArray(I,L)}function C(R,I,L,z){const T=R.value,B=I+"_"+L;if(z[B]===void 0)return typeof T=="number"||typeof T=="boolean"?z[B]=T:ArrayBuffer.isView(T)?z[B]=T.slice():z[B]=T.clone(),!0;{const Z=z[B];if(typeof T=="number"||typeof T=="boolean"){if(Z!==T)return z[B]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(Z.equals(T)===!1)return Z.copy(T),!0}}return!1}function y(R){const I=R.uniforms;let L=0;const z=16;for(let B=0,Z=I.length;B<Z;B++){const G=Array.isArray(I[B])?I[B]:[I[B]];for(let Y=0,de=G.length;Y<de;Y++){const xe=G[Y],ae=Array.isArray(xe.value)?xe.value:[xe.value];for(let H=0,k=ae.length;H<k;H++){const te=ae[H],_e=x(te),Ae=L%z,P=Ae%_e.boundary,Q=Ae+P;L+=P,Q!==0&&z-Q<_e.storage&&(L+=z-Q),xe.__data=new Float32Array(_e.storage/Float32Array.BYTES_PER_ELEMENT),xe.__offset=L,L+=_e.storage}}}const T=L%z;return T>0&&(L+=z-T),R.__size=L,R.__cache={},this}function x(R){const I={boundary:0,storage:0};return typeof R=="number"||typeof R=="boolean"?(I.boundary=4,I.storage=4):R.isVector2?(I.boundary=8,I.storage=8):R.isVector3||R.isColor?(I.boundary=16,I.storage=12):R.isVector4?(I.boundary=16,I.storage=16):R.isMatrix3?(I.boundary=48,I.storage=48):R.isMatrix4?(I.boundary=64,I.storage=64):R.isTexture?Mt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(R)?(I.boundary=16,I.storage=R.byteLength):Mt("WebGLRenderer: Unsupported uniform value type.",R),I}function O(R){const I=R.target;I.removeEventListener("dispose",O);const L=u.indexOf(I.__bindingPointIndex);u.splice(L,1),r.deleteBuffer(o[I.id]),delete o[I.id],delete c[I.id]}function N(){for(const R in o)r.deleteBuffer(o[R]);u=[],o={},c={}}return{bind:m,update:d,dispose:N}}const r2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ya=null;function o2(){return Ya===null&&(Ya=new jf(r2,16,16,to,Di),Ya.name="DFG_LUT",Ya.minFilter=Ci,Ya.magFilter=Ci,Ya.wrapS=sa,Ya.wrapT=sa,Ya.generateMipmaps=!1,Ya.needsUpdate=!0),Ya}class l2{constructor(e={}){const{canvas:n=wb(),context:a=null,depth:o=!0,stencil:c=!1,alpha:u=!1,antialias:p=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:d=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:g=!1,outputBufferType:M=Ea}=e;this.isWebGLRenderer=!0;let E;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");E=a.getContextAttributes().alpha}else E=u;const C=M,y=new Set([Zm,jm,Ym]),x=new Set([Ea,Qa,Nc,Lc,qm,Wm]),O=new Uint32Array(4),N=new Int32Array(4),R=new ee;let I=null,L=null;const z=[],T=[];let B=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ka,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const Z=this;let G=!1,Y=null,de=null,xe=null,ae=null;this._outputColorSpace=Ma;let H=0,k=0,te=null,_e=-1,Ae=null;const P=new Yn,Q=new Yn;let Ce=null;const Ie=new Yt(0);let je=0,re=n.width,Se=n.height,Re=1,nt=null,vt=null;const Ze=new Yn(0,0,re,Se),yn=new Yn(0,0,re,Se);let Ot=!1;const Vt=new by;let Xt=!1,It=!1;const Dn=new kn,Nn=new ee,Ln=new Yn,Hn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let dn=!1;function Un(){return te===null?Re:1}let j=a;function nn(A,W){return n.getContext(A,W)}try{const A={alpha:!0,depth:o,stencil:c,antialias:p,premultipliedAlpha:m,preserveDrawingBuffer:d,powerPreference:v,failIfMajorPerformanceCaveat:_};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Vm}`),n.addEventListener("webglcontextlost",Sn,!1),n.addEventListener("webglcontextrestored",on,!1),n.addEventListener("webglcontextcreationerror",xi,!1),j===null){const W="webgl2";if(j=nn(W,A),j===null)throw nn(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw tn("WebGLRenderer: "+A.message),A}let an,U,b,$,he,ve,Oe,Ge,me,ye,He,$e,qe,ke,ht,pt,_t,q,ze,Me,Fe,We,we;function De(){an=new oA(j),an.init(),Fe=new Jw(j,an),U=new $T(j,an,e,Fe),b=new Kw(j,an),U.reversedDepthBuffer&&g&&b.buffers.depth.setReversed(!0),de=j.createFramebuffer(),xe=j.createFramebuffer(),ae=j.createFramebuffer(),$=new uA(j),he=new Fw,ve=new Qw(j,an,b,he,U,Fe,$),Oe=new rA(Z),Ge=new p1(j),We=new QT(j,Ge),me=new lA(j,Ge,$,We),ye=new hA(j,me,Ge,We,$),q=new fA(j,U,ve),ht=new eA(he),He=new Pw(Z,Oe,an,U,We,ht),$e=new a2(Z,he),qe=new zw,ke=new Xw(an),_t=new KT(Z,Oe,b,ye,E,m),pt=new Zw(Z,ye,U),we=new s2(j,$,U,b),ze=new JT(j,an,$),Me=new cA(j,an,$),$.programs=He.programs,Z.capabilities=U,Z.extensions=an,Z.properties=he,Z.renderLists=qe,Z.shadowMap=pt,Z.state=b,Z.info=$}De(),C!==Ea&&(B=new pA(C,n.width,n.height,p,o,c));const Qe=new n2(Z,j);this.xr=Qe,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const A=an.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=an.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Re},this.setPixelRatio=function(A){A!==void 0&&(Re=A,this.setSize(re,Se,!1))},this.getSize=function(A){return A.set(re,Se)},this.setSize=function(A,W,ce=!0){if(Qe.isPresenting){Mt("WebGLRenderer: Can't change size while VR device is presenting.");return}re=A,Se=W,n.width=Math.floor(A*Re),n.height=Math.floor(W*Re),ce===!0&&(n.style.width=A+"px",n.style.height=W+"px"),B!==null&&B.setSize(n.width,n.height),this.setViewport(0,0,A,W)},this.getDrawingBufferSize=function(A){return A.set(re*Re,Se*Re).floor()},this.setDrawingBufferSize=function(A,W,ce){re=A,Se=W,Re=ce,n.width=Math.floor(A*ce),n.height=Math.floor(W*ce),this.setViewport(0,0,A,W)},this.setEffects=function(A){if(C===Ea){tn("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let W=0;W<A.length;W++)if(A[W].isOutputPass===!0){Mt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}B.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(P)},this.getViewport=function(A){return A.copy(Ze)},this.setViewport=function(A,W,ce,oe){A.isVector4?Ze.set(A.x,A.y,A.z,A.w):Ze.set(A,W,ce,oe),b.viewport(P.copy(Ze).multiplyScalar(Re).round())},this.getScissor=function(A){return A.copy(yn)},this.setScissor=function(A,W,ce,oe){A.isVector4?yn.set(A.x,A.y,A.z,A.w):yn.set(A,W,ce,oe),b.scissor(Q.copy(yn).multiplyScalar(Re).round())},this.getScissorTest=function(){return Ot},this.setScissorTest=function(A){b.setScissorTest(Ot=A)},this.setOpaqueSort=function(A){nt=A},this.setTransparentSort=function(A){vt=A},this.getClearColor=function(A){return A.copy(_t.getClearColor())},this.setClearColor=function(){_t.setClearColor(...arguments)},this.getClearAlpha=function(){return _t.getClearAlpha()},this.setClearAlpha=function(){_t.setClearAlpha(...arguments)},this.clear=function(A=!0,W=!0,ce=!0){let oe=0;if(A){let le=!1;if(te!==null){const Ye=te.texture.format;le=y.has(Ye)}if(le){const Ye=te.texture.type,at=x.has(Ye),Ve=_t.getClearColor(),st=_t.getClearAlpha(),rt=Ve.r,mt=Ve.g,At=Ve.b;at?(O[0]=rt,O[1]=mt,O[2]=At,O[3]=st,j.clearBufferuiv(j.COLOR,0,O)):(N[0]=rt,N[1]=mt,N[2]=At,N[3]=st,j.clearBufferiv(j.COLOR,0,N))}else oe|=j.COLOR_BUFFER_BIT}W&&(oe|=j.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ce&&(oe|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),oe!==0&&j.clear(oe)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),Y=A},this.dispose=function(){n.removeEventListener("webglcontextlost",Sn,!1),n.removeEventListener("webglcontextrestored",on,!1),n.removeEventListener("webglcontextcreationerror",xi,!1),_t.dispose(),qe.dispose(),ke.dispose(),he.dispose(),Oe.dispose(),ye.dispose(),We.dispose(),we.dispose(),He.dispose(),Qe.dispose(),Qe.removeEventListener("sessionstart",Vn),Qe.removeEventListener("sessionend",ni),Si.stop()};function Sn(A){A.preventDefault(),F_("WebGLRenderer: Context Lost."),G=!0}function on(){F_("WebGLRenderer: Context Restored."),G=!1;const A=$.autoReset,W=pt.enabled,ce=pt.autoUpdate,oe=pt.needsUpdate,le=pt.type;De(),$.autoReset=A,pt.enabled=W,pt.autoUpdate=ce,pt.needsUpdate=oe,pt.type=le}function xi(A){tn("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function yi(A){const W=A.target;W.removeEventListener("dispose",yi),Ds(W)}function Ds(A){Yi(A),he.remove(A)}function Yi(A){const W=he.get(A).programs;W!==void 0&&(W.forEach(function(ce){He.releaseProgram(ce)}),A.isShaderMaterial&&He.releaseShaderCache(A))}this.renderBufferDirect=function(A,W,ce,oe,le,Ye){W===null&&(W=Hn);const at=le.isMesh&&le.matrixWorld.determinantAffine()<0,Ve=Ht(A,W,ce,oe,le);b.setMaterial(oe,at);let st=ce.index,rt=1;if(oe.wireframe===!0){if(st=me.getWireframeAttribute(ce),st===void 0)return;rt=2}const mt=ce.drawRange,At=ce.attributes.position;let ut=mt.start*rt,$t=(mt.start+mt.count)*rt;Ye!==null&&(ut=Math.max(ut,Ye.start*rt),$t=Math.min($t,(Ye.start+Ye.count)*rt)),st!==null?(ut=Math.max(ut,0),$t=Math.min($t,st.count)):At!=null&&(ut=Math.max(ut,0),$t=Math.min($t,At.count));const wn=$t-ut;if(wn<0||wn===1/0)return;We.setup(le,oe,Ve,ce,st);let F,ne=ze;if(st!==null&&(F=Ge.get(st),ne=Me,ne.setIndex(F)),le.isMesh)oe.wireframe===!0?(b.setLineWidth(oe.wireframeLinewidth*Un()),ne.setMode(j.LINES)):ne.setMode(j.TRIANGLES);else if(le.isLine){let Ne=oe.linewidth;Ne===void 0&&(Ne=1),b.setLineWidth(Ne*Un()),le.isLineSegments?ne.setMode(j.LINES):le.isLineLoop?ne.setMode(j.LINE_LOOP):ne.setMode(j.LINE_STRIP)}else le.isPoints?ne.setMode(j.POINTS):le.isSprite&&ne.setMode(j.TRIANGLES);if(le.isBatchedMesh)if(an.get("WEBGL_multi_draw"))ne.renderMultiDraw(le._multiDrawStarts,le._multiDrawCounts,le._multiDrawCount);else{const Ne=le._multiDrawStarts,K=le._multiDrawCounts,dt=le._multiDrawCount,et=st?Ge.get(st).bytesPerElement:1,Je=he.get(oe).currentProgram.getUniforms();for(let un=0;un<dt;un++)Je.setValue(j,"_gl_DrawID",un),ne.render(Ne[un]/et,K[un])}else if(le.isInstancedMesh)ne.renderInstances(ut,wn,le.count);else if(ce.isInstancedBufferGeometry){const Ne=ce._maxInstanceCount!==void 0?ce._maxInstanceCount:1/0,K=Math.min(ce.instanceCount,Ne);ne.renderInstances(ut,wn,K)}else ne.render(ut,wn)};function br(A,W,ce){A.transparent===!0&&A.side===As&&A.forceSinglePass===!1?(A.side=Wi,A.needsUpdate=!0,ca(A,W,ce),A.side=Mr,A.needsUpdate=!0,ca(A,W,ce),A.side=As):ca(A,W,ce)}this.compile=function(A,W,ce=null){ce===null&&(ce=A),L=ke.get(ce),L.init(W),T.push(L),ce.traverseVisible(function(le){le.isLight&&le.layers.test(W.layers)&&(L.pushLight(le),le.castShadow&&L.pushShadow(le))}),A!==ce&&A.traverseVisible(function(le){le.isLight&&le.layers.test(W.layers)&&(L.pushLight(le),le.castShadow&&L.pushShadow(le))}),L.setupLights();const oe=new Set;return A.traverse(function(le){if(!(le.isMesh||le.isPoints||le.isLine||le.isSprite))return;const Ye=le.material;if(Ye)if(Array.isArray(Ye))for(let at=0;at<Ye.length;at++){const Ve=Ye[at];br(Ve,ce,le),oe.add(Ve)}else br(Ye,ce,le),oe.add(Ye)}),L=T.pop(),oe},this.compileAsync=function(A,W,ce=null){const oe=this.compile(A,W,ce);return new Promise(le=>{function Ye(){if(oe.forEach(function(at){he.get(at).currentProgram.isReady()&&oe.delete(at)}),oe.size===0){le(A);return}setTimeout(Ye,10)}an.get("KHR_parallel_shader_compile")!==null?Ye():setTimeout(Ye,10)})};let Ta=null;function oa(A){Ta&&Ta(A)}function Vn(){Si.stop()}function ni(){Si.start()}const Si=new Ry;Si.setAnimationLoop(oa),typeof self<"u"&&Si.setContext(self),this.setAnimationLoop=function(A){Ta=A,Qe.setAnimationLoop(A),A===null?Si.stop():Si.start()},Qe.addEventListener("sessionstart",Vn),Qe.addEventListener("sessionend",ni),this.render=function(A,W){if(W!==void 0&&W.isCamera!==!0){tn("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;Y!==null&&Y.renderStart(A,W);const ce=Qe.enabled===!0&&Qe.isPresenting===!0,oe=B!==null&&(te===null||ce)&&B.begin(Z,te);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),Qe.enabled===!0&&Qe.isPresenting===!0&&(B===null||B.isCompositing()===!1)&&(Qe.cameraAutoUpdate===!0&&Qe.updateCamera(W),W=Qe.getCamera()),A.isScene===!0&&A.onBeforeRender(Z,A,W,te),L=ke.get(A,T.length),L.init(W),L.state.textureUnits=ve.getTextureUnits(),T.push(L),Dn.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),Vt.setFromProjectionMatrix(Dn,Za,W.reversedDepth),It=this.localClippingEnabled,Xt=ht.init(this.clippingPlanes,It),I=qe.get(A,z.length),I.init(),z.push(I),Qe.enabled===!0&&Qe.isPresenting===!0){const at=Z.xr.getDepthSensingMesh();at!==null&&Aa(at,W,-1/0,Z.sortObjects)}Aa(A,W,0,Z.sortObjects),I.finish(),Z.sortObjects===!0&&I.sort(nt,vt,W.reversedDepth),dn=Qe.enabled===!1||Qe.isPresenting===!1||Qe.hasDepthSensing()===!1,dn&&_t.addToRenderList(I,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Xt===!0&&ht.beginShadows();const le=L.state.shadowsArray;if(pt.render(le,A,W),Xt===!0&&ht.endShadows(),(oe&&B.hasRenderPass())===!1){const at=I.opaque,Ve=I.transmissive;if(L.setupLights(),W.isArrayCamera){const st=W.cameras;if(Ve.length>0)for(let rt=0,mt=st.length;rt<mt;rt++){const At=st[rt];$a(at,Ve,A,At)}dn&&_t.render(A);for(let rt=0,mt=st.length;rt<mt;rt++){const At=st[rt];Ja(I,A,At,At.viewport)}}else Ve.length>0&&$a(at,Ve,A,W),dn&&_t.render(A),Ja(I,A,W)}te!==null&&k===0&&(ve.updateMultisampleRenderTarget(te),ve.updateRenderTargetMipmap(te)),oe&&B.end(Z),A.isScene===!0&&A.onAfterRender(Z,A,W),We.resetDefaultState(),_e=-1,Ae=null,T.pop(),T.length>0?(L=T[T.length-1],ve.setTextureUnits(L.state.textureUnits),Xt===!0&&ht.setGlobalState(Z.clippingPlanes,L.state.camera)):L=null,z.pop(),z.length>0?I=z[z.length-1]:I=null,Y!==null&&Y.renderEnd()};function Aa(A,W,ce,oe){if(A.visible===!1)return;if(A.layers.test(W.layers)){if(A.isGroup)ce=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(W);else if(A.isLightProbeGrid)L.pushLightProbeGrid(A);else if(A.isLight)L.pushLight(A),A.castShadow&&L.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Vt.intersectsSprite(A)){oe&&Ln.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Dn);const at=ye.update(A),Ve=A.material;Ve.visible&&I.push(A,at,Ve,ce,Ln.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Vt.intersectsObject(A))){const at=ye.update(A),Ve=A.material;if(oe&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ln.copy(A.boundingSphere.center)):(at.boundingSphere===null&&at.computeBoundingSphere(),Ln.copy(at.boundingSphere.center)),Ln.applyMatrix4(A.matrixWorld).applyMatrix4(Dn)),Array.isArray(Ve)){const st=at.groups;for(let rt=0,mt=st.length;rt<mt;rt++){const At=st[rt],ut=Ve[At.materialIndex];ut&&ut.visible&&I.push(A,at,ut,ce,Ln.z,At)}}else Ve.visible&&I.push(A,at,Ve,ce,Ln.z,null)}}const Ye=A.children;for(let at=0,Ve=Ye.length;at<Ve;at++)Aa(Ye[at],W,ce,oe)}function Ja(A,W,ce,oe){const{opaque:le,transmissive:Ye,transparent:at}=A;L.setupLightsView(ce),Xt===!0&&ht.setGlobalState(Z.clippingPlanes,ce),oe&&b.viewport(P.copy(oe)),le.length>0&&la(le,W,ce),Ye.length>0&&la(Ye,W,ce),at.length>0&&la(at,W,ce),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function $a(A,W,ce,oe){if((ce.isScene===!0?ce.overrideMaterial:null)!==null)return;if(L.state.transmissionRenderTarget[oe.id]===void 0){const ut=an.has("EXT_color_buffer_half_float")||an.has("EXT_color_buffer_float");L.state.transmissionRenderTarget[oe.id]=new _i(1,1,{generateMipmaps:!0,type:ut?Di:Ea,minFilter:Qr,samples:Math.max(4,U.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace})}const Ye=L.state.transmissionRenderTarget[oe.id],at=oe.viewport||P;Ye.setSize(at.z*Z.transmissionResolutionScale,at.w*Z.transmissionResolutionScale);const Ve=Z.getRenderTarget(),st=Z.getActiveCubeFace(),rt=Z.getActiveMipmapLevel();Z.setRenderTarget(Ye),Z.getClearColor(Ie),je=Z.getClearAlpha(),je<1&&Z.setClearColor(16777215,.5),Z.clear(),dn&&_t.render(ce);const mt=Z.toneMapping;Z.toneMapping=Ka;const At=oe.viewport;if(oe.viewport!==void 0&&(oe.viewport=void 0),L.setupLightsView(oe),Xt===!0&&ht.setGlobalState(Z.clippingPlanes,oe),la(A,ce,oe),ve.updateMultisampleRenderTarget(Ye),ve.updateRenderTargetMipmap(Ye),an.has("WEBGL_multisampled_render_to_texture")===!1){let ut=!1;for(let $t=0,wn=W.length;$t<wn;$t++){const F=W[$t],{object:ne,geometry:Ne,material:K,group:dt}=F;if(K.side===As&&ne.layers.test(oe.layers)){const et=K.side;K.side=Wi,K.needsUpdate=!0,ji(ne,ce,oe,Ne,K,dt),K.side=et,K.needsUpdate=!0,ut=!0}}ut===!0&&(ve.updateMultisampleRenderTarget(Ye),ve.updateRenderTargetMipmap(Ye))}Z.setRenderTarget(Ve,st,rt),Z.setClearColor(Ie,je),At!==void 0&&(oe.viewport=At),Z.toneMapping=mt}function la(A,W,ce){const oe=W.isScene===!0?W.overrideMaterial:null;for(let le=0,Ye=A.length;le<Ye;le++){const at=A[le],{object:Ve,geometry:st,group:rt}=at;let mt=at.material;mt.allowOverride===!0&&oe!==null&&(mt=oe),Ve.layers.test(ce.layers)&&ji(Ve,W,ce,st,mt,rt)}}function ji(A,W,ce,oe,le,Ye){A.onBeforeRender(Z,W,ce,oe,le,Ye),A.modelViewMatrix.multiplyMatrices(ce.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),le.onBeforeRender(Z,W,ce,oe,A,Ye),le.transparent===!0&&le.side===As&&le.forceSinglePass===!1?(le.side=Wi,le.needsUpdate=!0,Z.renderBufferDirect(ce,W,oe,le,A,Ye),le.side=Mr,le.needsUpdate=!0,Z.renderBufferDirect(ce,W,oe,le,A,Ye),le.side=As):Z.renderBufferDirect(ce,W,oe,le,A,Ye),A.onAfterRender(Z,W,ce,oe,le,Ye)}function ca(A,W,ce){W.isScene!==!0&&(W=Hn);const oe=he.get(A),le=L.state.lights,Ye=L.state.shadowsArray,at=le.state.version,Ve=He.getParameters(A,le.state,Ye,W,ce,L.state.lightProbeGridArray),st=He.getProgramCacheKey(Ve);let rt=oe.programs;oe.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?W.environment:null,oe.fog=W.fog;const mt=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;oe.envMap=Oe.get(A.envMap||oe.environment,mt),oe.envMapRotation=oe.environment!==null&&A.envMap===null?W.environmentRotation:A.envMapRotation,rt===void 0&&(A.addEventListener("dispose",yi),rt=new Map,oe.programs=rt);let At=rt.get(st);if(At!==void 0){if(oe.currentProgram===At&&oe.lightsStateVersion===at)return Bn(A,Ve),At}else Ve.uniforms=He.getUniforms(A),Y!==null&&A.isNodeMaterial&&Y.build(A,ce,Ve),A.onBeforeCompile(Ve,Z),At=He.acquireProgram(Ve,st),rt.set(st,At),oe.uniforms=Ve.uniforms;const ut=oe.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(ut.clippingPlanes=ht.uniform),Bn(A,Ve),oe.needsLights=ii(A),oe.lightsStateVersion=at,oe.needsLights&&(ut.ambientLightColor.value=le.state.ambient,ut.lightProbe.value=le.state.probe,ut.directionalLights.value=le.state.directional,ut.directionalLightShadows.value=le.state.directionalShadow,ut.spotLights.value=le.state.spot,ut.spotLightShadows.value=le.state.spotShadow,ut.rectAreaLights.value=le.state.rectArea,ut.ltc_1.value=le.state.rectAreaLTC1,ut.ltc_2.value=le.state.rectAreaLTC2,ut.pointLights.value=le.state.point,ut.pointLightShadows.value=le.state.pointShadow,ut.hemisphereLights.value=le.state.hemi,ut.directionalShadowMatrix.value=le.state.directionalShadowMatrix,ut.spotLightMatrix.value=le.state.spotLightMatrix,ut.spotLightMap.value=le.state.spotLightMap,ut.pointShadowMatrix.value=le.state.pointShadowMatrix),oe.lightProbeGrid=L.state.lightProbeGridArray.length>0,oe.currentProgram=At,oe.uniformsList=null,At}function An(A){if(A.uniformsList===null){const W=A.currentProgram.getUniforms();A.uniformsList=Gf.seqWithValue(W.seq,A.uniforms)}return A.uniformsList}function Bn(A,W){const ce=he.get(A);ce.outputColorSpace=W.outputColorSpace,ce.batching=W.batching,ce.batchingColor=W.batchingColor,ce.instancing=W.instancing,ce.instancingColor=W.instancingColor,ce.instancingMorph=W.instancingMorph,ce.skinning=W.skinning,ce.morphTargets=W.morphTargets,ce.morphNormals=W.morphNormals,ce.morphColors=W.morphColors,ce.morphTargetsCount=W.morphTargetsCount,ce.numClippingPlanes=W.numClippingPlanes,ce.numIntersection=W.numClipIntersection,ce.vertexAlphas=W.vertexAlphas,ce.vertexTangents=W.vertexTangents,ce.toneMapping=W.toneMapping}function za(A,W){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;R.setFromMatrixPosition(W.matrixWorld);for(let ce=0,oe=A.length;ce<oe;ce++){const le=A[ce];if(le.texture!==null&&le.boundingBox.containsPoint(R))return le}return null}function Ht(A,W,ce,oe,le){W.isScene!==!0&&(W=Hn),ve.resetTextureUnits();const Ye=W.fog,at=oe.isMeshStandardMaterial||oe.isMeshLambertMaterial||oe.isMeshPhongMaterial?W.environment:null,Ve=te===null?Z.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Kt.workingColorSpace,st=oe.isMeshStandardMaterial||oe.isMeshLambertMaterial&&!oe.envMap||oe.isMeshPhongMaterial&&!oe.envMap,rt=Oe.get(oe.envMap||at,st),mt=oe.vertexColors===!0&&!!ce.attributes.color&&ce.attributes.color.itemSize===4,At=!!ce.attributes.tangent&&(!!oe.normalMap||oe.anisotropy>0),ut=!!ce.morphAttributes.position,$t=!!ce.morphAttributes.normal,wn=!!ce.morphAttributes.color;let F=Ka;oe.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(F=Z.toneMapping);const ne=ce.morphAttributes.position||ce.morphAttributes.normal||ce.morphAttributes.color,Ne=ne!==void 0?ne.length:0,K=he.get(oe),dt=L.state.lights;if(Xt===!0&&(It===!0||A!==Ae)){const it=A===Ae&&oe.id===_e;ht.setState(oe,A,it)}let et=!1;oe.version===K.__version?(K.needsLights&&K.lightsStateVersion!==dt.state.version||K.outputColorSpace!==Ve||le.isBatchedMesh&&K.batching===!1||!le.isBatchedMesh&&K.batching===!0||le.isBatchedMesh&&K.batchingColor===!0&&le.colorTexture===null||le.isBatchedMesh&&K.batchingColor===!1&&le.colorTexture!==null||le.isInstancedMesh&&K.instancing===!1||!le.isInstancedMesh&&K.instancing===!0||le.isSkinnedMesh&&K.skinning===!1||!le.isSkinnedMesh&&K.skinning===!0||le.isInstancedMesh&&K.instancingColor===!0&&le.instanceColor===null||le.isInstancedMesh&&K.instancingColor===!1&&le.instanceColor!==null||le.isInstancedMesh&&K.instancingMorph===!0&&le.morphTexture===null||le.isInstancedMesh&&K.instancingMorph===!1&&le.morphTexture!==null||K.envMap!==rt||oe.fog===!0&&K.fog!==Ye||K.numClippingPlanes!==void 0&&(K.numClippingPlanes!==ht.numPlanes||K.numIntersection!==ht.numIntersection)||K.vertexAlphas!==mt||K.vertexTangents!==At||K.morphTargets!==ut||K.morphNormals!==$t||K.morphColors!==wn||K.toneMapping!==F||K.morphTargetsCount!==Ne||!!K.lightProbeGrid!=L.state.lightProbeGridArray.length>0)&&(et=!0):(et=!0,K.__version=oe.version);let Je=K.currentProgram;et===!0&&(Je=ca(oe,W,le),Y&&oe.isNodeMaterial&&Y.onUpdateProgram(oe,Je,K));let un=!1,Gt=!1,bt=!1;const Lt=Je.getUniforms(),Ft=K.uniforms;if(b.useProgram(Je.program)&&(un=!0,Gt=!0,bt=!0),oe.id!==_e&&(_e=oe.id,Gt=!0),K.needsLights){const it=za(L.state.lightProbeGridArray,le);K.lightProbeGrid!==it&&(K.lightProbeGrid=it,Gt=!0)}if(un||Ae!==A){b.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Lt.setValue(j,"projectionMatrix",A.projectionMatrix),Lt.setValue(j,"viewMatrix",A.matrixWorldInverse);const Gn=Lt.map.cameraPosition;Gn!==void 0&&Gn.setValue(j,Nn.setFromMatrixPosition(A.matrixWorld)),U.logarithmicDepthBuffer&&Lt.setValue(j,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(oe.isMeshPhongMaterial||oe.isMeshToonMaterial||oe.isMeshLambertMaterial||oe.isMeshBasicMaterial||oe.isMeshStandardMaterial||oe.isShaderMaterial)&&Lt.setValue(j,"isOrthographic",A.isOrthographicCamera===!0),Ae!==A&&(Ae=A,Gt=!0,bt=!0)}if(K.needsLights&&(dt.state.directionalShadowMap.length>0&&Lt.setValue(j,"directionalShadowMap",dt.state.directionalShadowMap,ve),dt.state.spotShadowMap.length>0&&Lt.setValue(j,"spotShadowMap",dt.state.spotShadowMap,ve),dt.state.pointShadowMap.length>0&&Lt.setValue(j,"pointShadowMap",dt.state.pointShadowMap,ve)),le.isSkinnedMesh){Lt.setOptional(j,le,"bindMatrix"),Lt.setOptional(j,le,"bindMatrixInverse");const it=le.skeleton;it&&(it.boneTexture===null&&it.computeBoneTexture(),Lt.setValue(j,"boneTexture",it.boneTexture,ve))}le.isBatchedMesh&&(Lt.setOptional(j,le,"batchingTexture"),Lt.setValue(j,"batchingTexture",le._matricesTexture,ve),Lt.setOptional(j,le,"batchingIdTexture"),Lt.setValue(j,"batchingIdTexture",le._indirectTexture,ve),Lt.setOptional(j,le,"batchingColorTexture"),le._colorsTexture!==null&&Lt.setValue(j,"batchingColorTexture",le._colorsTexture,ve));const Mn=ce.morphAttributes;if((Mn.position!==void 0||Mn.normal!==void 0||Mn.color!==void 0)&&q.update(le,ce,Je),(Gt||K.receiveShadow!==le.receiveShadow)&&(K.receiveShadow=le.receiveShadow,Lt.setValue(j,"receiveShadow",le.receiveShadow)),(oe.isMeshStandardMaterial||oe.isMeshLambertMaterial||oe.isMeshPhongMaterial)&&oe.envMap===null&&W.environment!==null&&(Ft.envMapIntensity.value=W.environmentIntensity),Ft.dfgLUT!==void 0&&(Ft.dfgLUT.value=o2()),Gt){if(Lt.setValue(j,"toneMappingExposure",Z.toneMappingExposure),K.needsLights&&Tt(Ft,bt),Ye&&oe.fog===!0&&$e.refreshFogUniforms(Ft,Ye),$e.refreshMaterialUniforms(Ft,oe,Re,Se,L.state.transmissionRenderTarget[A.id]),K.needsLights&&K.lightProbeGrid){const it=K.lightProbeGrid;Ft.probesSH.value=it.texture,Ft.probesMin.value.copy(it.boundingBox.min),Ft.probesMax.value.copy(it.boundingBox.max),Ft.probesResolution.value.copy(it.resolution)}Gf.upload(j,An(K),Ft,ve)}if(oe.isShaderMaterial&&oe.uniformsNeedUpdate===!0&&(Gf.upload(j,An(K),Ft,ve),oe.uniformsNeedUpdate=!1),oe.isSpriteMaterial&&Lt.setValue(j,"center",le.center),Lt.setValue(j,"modelViewMatrix",le.modelViewMatrix),Lt.setValue(j,"normalMatrix",le.normalMatrix),Lt.setValue(j,"modelMatrix",le.matrixWorld),oe.uniformsGroups!==void 0){const it=oe.uniformsGroups;for(let Gn=0,kt=it.length;Gn<kt;Gn++){const bn=it[Gn];we.update(bn,Je),we.bind(bn,Je)}}return Je}function Tt(A,W){A.ambientLightColor.needsUpdate=W,A.lightProbe.needsUpdate=W,A.directionalLights.needsUpdate=W,A.directionalLightShadows.needsUpdate=W,A.pointLights.needsUpdate=W,A.pointLightShadows.needsUpdate=W,A.spotLights.needsUpdate=W,A.spotLightShadows.needsUpdate=W,A.rectAreaLights.needsUpdate=W,A.hemisphereLights.needsUpdate=W}function ii(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return te},this.setRenderTargetTextures=function(A,W,ce){const oe=he.get(A);oe.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,oe.__autoAllocateDepthBuffer===!1&&(oe.__useRenderToTexture=!1),he.get(A.texture).__webglTexture=W,he.get(A.depthTexture).__webglTexture=oe.__autoAllocateDepthBuffer?void 0:ce,oe.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,W){const ce=he.get(A);ce.__webglFramebuffer=W,ce.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(A,W=0,ce=0){te=A,H=W,k=ce;let oe=null,le=!1,Ye=!1;if(A){const Ve=he.get(A);if(Ve.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(j.FRAMEBUFFER,Ve.__webglFramebuffer),P.copy(A.viewport),Q.copy(A.scissor),Ce=A.scissorTest,b.viewport(P),b.scissor(Q),b.setScissorTest(Ce),_e=-1;return}else if(Ve.__webglFramebuffer===void 0)ve.setupRenderTarget(A);else if(Ve.__hasExternalTextures)ve.rebindTextures(A,he.get(A.texture).__webglTexture,he.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const mt=A.depthTexture;if(Ve.__boundDepthTexture!==mt){if(mt!==null&&he.has(mt)&&(A.width!==mt.image.width||A.height!==mt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ve.setupDepthRenderbuffer(A)}}const st=A.texture;(st.isData3DTexture||st.isDataArrayTexture||st.isCompressedArrayTexture)&&(Ye=!0);const rt=he.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(rt[W])?oe=rt[W][ce]:oe=rt[W],le=!0):A.samples>0&&ve.useMultisampledRTT(A)===!1?oe=he.get(A).__webglMultisampledFramebuffer:Array.isArray(rt)?oe=rt[ce]:oe=rt,P.copy(A.viewport),Q.copy(A.scissor),Ce=A.scissorTest}else P.copy(Ze).multiplyScalar(Re).floor(),Q.copy(yn).multiplyScalar(Re).floor(),Ce=Ot;if(ce!==0&&(oe=de),b.bindFramebuffer(j.FRAMEBUFFER,oe)&&b.drawBuffers(A,oe),b.viewport(P),b.scissor(Q),b.setScissorTest(Ce),le){const Ve=he.get(A.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ve.__webglTexture,ce)}else if(Ye){const Ve=W;for(let st=0;st<A.textures.length;st++){const rt=he.get(A.textures[st]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+st,rt.__webglTexture,ce,Ve)}}else if(A!==null&&ce!==0){const Ve=he.get(A.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,Ve.__webglTexture,ce)}_e=-1},this.readRenderTargetPixels=function(A,W,ce,oe,le,Ye,at,Ve=0){if(!(A&&A.isWebGLRenderTarget)){tn("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let st=he.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&at!==void 0&&(st=st[at]),st){b.bindFramebuffer(j.FRAMEBUFFER,st);try{const rt=A.textures[Ve],mt=rt.format,At=rt.type;if(A.textures.length>1&&j.readBuffer(j.COLOR_ATTACHMENT0+Ve),!U.textureFormatReadable(mt)){tn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!U.textureTypeReadable(At)){tn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=A.width-oe&&ce>=0&&ce<=A.height-le&&j.readPixels(W,ce,oe,le,Fe.convert(mt),Fe.convert(At),Ye)}finally{const rt=te!==null?he.get(te).__webglFramebuffer:null;b.bindFramebuffer(j.FRAMEBUFFER,rt)}}},this.readRenderTargetPixelsAsync=async function(A,W,ce,oe,le,Ye,at,Ve=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let st=he.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&at!==void 0&&(st=st[at]),st)if(W>=0&&W<=A.width-oe&&ce>=0&&ce<=A.height-le){b.bindFramebuffer(j.FRAMEBUFFER,st);const rt=A.textures[Ve],mt=rt.format,At=rt.type;if(A.textures.length>1&&j.readBuffer(j.COLOR_ATTACHMENT0+Ve),!U.textureFormatReadable(mt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!U.textureTypeReadable(At))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ut=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,ut),j.bufferData(j.PIXEL_PACK_BUFFER,Ye.byteLength,j.STREAM_READ),j.readPixels(W,ce,oe,le,Fe.convert(mt),Fe.convert(At),0);const $t=te!==null?he.get(te).__webglFramebuffer:null;b.bindFramebuffer(j.FRAMEBUFFER,$t);const wn=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await Rb(j,wn,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,ut),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,Ye),j.deleteBuffer(ut),j.deleteSync(wn),Ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,W=null,ce=0){const oe=Math.pow(2,-ce),le=Math.floor(A.image.width*oe),Ye=Math.floor(A.image.height*oe),at=W!==null?W.x:0,Ve=W!==null?W.y:0;ve.setTexture2D(A,0),j.copyTexSubImage2D(j.TEXTURE_2D,ce,0,0,at,Ve,le,Ye),b.unbindTexture()},this.copyTextureToTexture=function(A,W,ce=null,oe=null,le=0,Ye=0){let at,Ve,st,rt,mt,At,ut,$t,wn;const F=A.isCompressedTexture?A.mipmaps[Ye]:A.image;if(ce!==null)at=ce.max.x-ce.min.x,Ve=ce.max.y-ce.min.y,st=ce.isBox3?ce.max.z-ce.min.z:1,rt=ce.min.x,mt=ce.min.y,At=ce.isBox3?ce.min.z:0;else{const Ft=Math.pow(2,-le);at=Math.floor(F.width*Ft),Ve=Math.floor(F.height*Ft),A.isDataArrayTexture?st=F.depth:A.isData3DTexture?st=Math.floor(F.depth*Ft):st=1,rt=0,mt=0,At=0}oe!==null?(ut=oe.x,$t=oe.y,wn=oe.z):(ut=0,$t=0,wn=0);const ne=Fe.convert(W.format),Ne=Fe.convert(W.type);let K;W.isData3DTexture?(ve.setTexture3D(W,0),K=j.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(ve.setTexture2DArray(W,0),K=j.TEXTURE_2D_ARRAY):(ve.setTexture2D(W,0),K=j.TEXTURE_2D),b.activeTexture(j.TEXTURE0),b.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,W.flipY),b.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),b.pixelStorei(j.UNPACK_ALIGNMENT,W.unpackAlignment);const dt=b.getParameter(j.UNPACK_ROW_LENGTH),et=b.getParameter(j.UNPACK_IMAGE_HEIGHT),Je=b.getParameter(j.UNPACK_SKIP_PIXELS),un=b.getParameter(j.UNPACK_SKIP_ROWS),Gt=b.getParameter(j.UNPACK_SKIP_IMAGES);b.pixelStorei(j.UNPACK_ROW_LENGTH,F.width),b.pixelStorei(j.UNPACK_IMAGE_HEIGHT,F.height),b.pixelStorei(j.UNPACK_SKIP_PIXELS,rt),b.pixelStorei(j.UNPACK_SKIP_ROWS,mt),b.pixelStorei(j.UNPACK_SKIP_IMAGES,At);const bt=A.isDataArrayTexture||A.isData3DTexture,Lt=W.isDataArrayTexture||W.isData3DTexture;if(A.isDepthTexture){const Ft=he.get(A),Mn=he.get(W),it=he.get(Ft.__renderTarget),Gn=he.get(Mn.__renderTarget);b.bindFramebuffer(j.READ_FRAMEBUFFER,it.__webglFramebuffer),b.bindFramebuffer(j.DRAW_FRAMEBUFFER,Gn.__webglFramebuffer);for(let kt=0;kt<st;kt++)bt&&(j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,he.get(A).__webglTexture,le,At+kt),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,he.get(W).__webglTexture,Ye,wn+kt)),j.blitFramebuffer(rt,mt,at,Ve,ut,$t,at,Ve,j.DEPTH_BUFFER_BIT,j.NEAREST);b.bindFramebuffer(j.READ_FRAMEBUFFER,null),b.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(le!==0||A.isRenderTargetTexture||he.has(A)){const Ft=he.get(A),Mn=he.get(W);b.bindFramebuffer(j.READ_FRAMEBUFFER,xe),b.bindFramebuffer(j.DRAW_FRAMEBUFFER,ae);for(let it=0;it<st;it++)bt?j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,Ft.__webglTexture,le,At+it):j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,Ft.__webglTexture,le),Lt?j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,Mn.__webglTexture,Ye,wn+it):j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,Mn.__webglTexture,Ye),le!==0?j.blitFramebuffer(rt,mt,at,Ve,ut,$t,at,Ve,j.COLOR_BUFFER_BIT,j.NEAREST):Lt?j.copyTexSubImage3D(K,Ye,ut,$t,wn+it,rt,mt,at,Ve):j.copyTexSubImage2D(K,Ye,ut,$t,rt,mt,at,Ve);b.bindFramebuffer(j.READ_FRAMEBUFFER,null),b.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else Lt?A.isDataTexture||A.isData3DTexture?j.texSubImage3D(K,Ye,ut,$t,wn,at,Ve,st,ne,Ne,F.data):W.isCompressedArrayTexture?j.compressedTexSubImage3D(K,Ye,ut,$t,wn,at,Ve,st,ne,F.data):j.texSubImage3D(K,Ye,ut,$t,wn,at,Ve,st,ne,Ne,F):A.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,Ye,ut,$t,at,Ve,ne,Ne,F.data):A.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,Ye,ut,$t,F.width,F.height,ne,F.data):j.texSubImage2D(j.TEXTURE_2D,Ye,ut,$t,at,Ve,ne,Ne,F);b.pixelStorei(j.UNPACK_ROW_LENGTH,dt),b.pixelStorei(j.UNPACK_IMAGE_HEIGHT,et),b.pixelStorei(j.UNPACK_SKIP_PIXELS,Je),b.pixelStorei(j.UNPACK_SKIP_ROWS,un),b.pixelStorei(j.UNPACK_SKIP_IMAGES,Gt),Ye===0&&W.generateMipmaps&&j.generateMipmap(K),b.unbindTexture()},this.initRenderTarget=function(A){he.get(A).__webglFramebuffer===void 0&&ve.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?ve.setTextureCube(A,0):A.isData3DTexture?ve.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?ve.setTexture2DArray(A,0):ve.setTexture2D(A,0),b.unbindTexture()},this.resetState=function(){H=0,k=0,te=null,b.reset(),We.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Za}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(e),n.unpackColorSpace=Kt._getUnpackColorSpace()}}const $r={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class yl{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const c2=new sh(-1,1,1,-1,0,1);class u2 extends ri{constructor(){super(),this.setAttribute("position",new ra([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ra([0,2,0,0,2,0],2))}}const f2=new u2;class Qf{constructor(e){this._mesh=new Ba(f2,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,c2)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class h2 extends yl{constructor(e,n="tDiffuse"){super(),this.textureID=n,this.uniforms=null,this.material=null,e instanceof Cn?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=dl.clone(e.uniforms),this.material=new Cn({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Qf(this.material)}render(e,n,a){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=a.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Ox extends yl{constructor(e,n){super(),this.scene=e,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,n,a){const o=e.getContext(),c=e.state;c.buffers.color.setMask(!1),c.buffers.depth.setMask(!1),c.buffers.color.setLocked(!0),c.buffers.depth.setLocked(!0);let u,p;this.inverse?(u=0,p=1):(u=1,p=0),c.buffers.stencil.setTest(!0),c.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),c.buffers.stencil.setFunc(o.ALWAYS,u,4294967295),c.buffers.stencil.setClear(p),c.buffers.stencil.setLocked(!0),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),c.buffers.color.setLocked(!1),c.buffers.depth.setLocked(!1),c.buffers.color.setMask(!0),c.buffers.depth.setMask(!0),c.buffers.stencil.setLocked(!1),c.buffers.stencil.setFunc(o.EQUAL,1,4294967295),c.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),c.buffers.stencil.setLocked(!0)}}class d2 extends yl{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class p2{constructor(e,n){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),n===void 0){const a=e.getSize(new Dt);this._width=a.width,this._height=a.height,n=new _i(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Di}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new h2($r),this.copyPass.material.blending=Fa,this.timer=new f1}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,n){this.passes.splice(n,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const n=this.passes.indexOf(e);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(e){for(let n=e+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const n=this.renderer.getRenderTarget();let a=!1;for(let o=0,c=this.passes.length;o<c;o++){const u=this.passes[o];if(u.enabled!==!1){if(u.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(o),u.render(this.renderer,this.writeBuffer,this.readBuffer,e,a),u.needsSwap){if(a){const p=this.renderer.getContext(),m=this.renderer.state.buffers.stencil;m.setFunc(p.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),m.setFunc(p.EQUAL,1,4294967295)}this.swapBuffers()}Ox!==void 0&&(u instanceof Ox?a=!0:u instanceof d2&&(a=!1))}}this.renderer.setRenderTarget(n)}reset(e){if(e===void 0){const n=this.renderer.getSize(new Dt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,n){this._width=e,this._height=n;const a=this._width*this._pixelRatio,o=this._height*this._pixelRatio;this.renderTarget1.setSize(a,o),this.renderTarget2.setSize(a,o);for(let c=0;c<this.passes.length;c++)this.passes[c].setSize(a,o)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class m2 extends yl{constructor(e,n,a=null,o=null,c=null){super(),this.scene=e,this.camera=n,this.overrideMaterial=a,this.clearColor=o,this.clearAlpha=c,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Yt}render(e,n,a){const o=e.autoClear;e.autoClear=!1;let c,u;this.overrideMaterial!==null&&(u=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(c=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(c),this.overrideMaterial!==null&&(this.scene.overrideMaterial=u),e.autoClear=o}}const g2={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Yt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class pl extends yl{constructor(e,n=1,a,o){super(),this.strength=n,this.radius=a,this.threshold=o,this.resolution=e!==void 0?new Dt(e.x,e.y):new Dt(256,256),this.clearColor=new Yt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let c=Math.round(this.resolution.x/2),u=Math.round(this.resolution.y/2);this.renderTargetBright=new _i(c,u,{type:Di}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let v=0;v<this.nMips;v++){const _=new _i(c,u,{type:Di});_.texture.name="UnrealBloomPass.h"+v,_.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(_);const g=new _i(c,u,{type:Di});g.texture.name="UnrealBloomPass.v"+v,g.texture.generateMipmaps=!1,this.renderTargetsVertical.push(g),c=Math.round(c/2),u=Math.round(u/2)}const p=g2;this.highPassUniforms=dl.clone(p.uniforms),this.highPassUniforms.luminosityThreshold.value=o,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Cn({uniforms:this.highPassUniforms,vertexShader:p.vertexShader,fragmentShader:p.fragmentShader}),this.separableBlurMaterials=[];const m=[6,10,14,18,22];c=Math.round(this.resolution.x/2),u=Math.round(this.resolution.y/2);for(let v=0;v<this.nMips;v++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(m[v])),this.separableBlurMaterials[v].uniforms.invSize.value=new Dt(1/c,1/u),c=Math.round(c/2),u=Math.round(u/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const d=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=d,this.bloomTintColors=[new ee(1,1,1),new ee(1,1,1),new ee(1,1,1),new ee(1,1,1),new ee(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=dl.clone($r.uniforms),this.blendMaterial=new Cn({uniforms:this.copyUniforms,vertexShader:$r.vertexShader,fragmentShader:$r.fragmentShader,premultipliedAlpha:!0,blending:Ts,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Yt,this._oldClearAlpha=1,this._basic=new eg,this._fsQuad=new Qf(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,n){let a=Math.round(e/2),o=Math.round(n/2);this.renderTargetBright.setSize(a,o);for(let c=0;c<this.nMips;c++)this.renderTargetsHorizontal[c].setSize(a,o),this.renderTargetsVertical[c].setSize(a,o),this.separableBlurMaterials[c].uniforms.invSize.value=new Dt(1/a,1/o),a=Math.round(a/2),o=Math.round(o/2)}render(e,n,a,o,c){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const u=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),c&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=a.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=a.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let p=this.renderTargetBright;for(let m=0;m<this.nMips;m++)this._fsQuad.material=this.separableBlurMaterials[m],this.separableBlurMaterials[m].uniforms.colorTexture.value=p.texture,this.separableBlurMaterials[m].uniforms.direction.value=pl.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[m]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[m].uniforms.colorTexture.value=this.renderTargetsHorizontal[m].texture,this.separableBlurMaterials[m].uniforms.direction.value=pl.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[m]),e.clear(),this._fsQuad.render(e),p=this.renderTargetsVertical[m];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,c&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(a),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=u}_getSeparableBlurMaterial(e){const n=[],a=e/3;for(let o=0;o<e;o++)n.push(.39894*Math.exp(-.5*o*o/(a*a))/a);return new Cn({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Dt(.5,.5)},direction:{value:new Dt(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Cn({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}pl.BlurDirectionX=new Dt(1,0);pl.BlurDirectionY=new Dt(0,1);const zp={uniforms:{damp:{value:.96},tOld:{value:null},tNew:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float damp;

		uniform sampler2D tOld;
		uniform sampler2D tNew;

		varying vec2 vUv;

		vec4 when_gt( vec4 x, float y ) {

			return max( sign( x - y ), 0.0 );

		}

		void main() {

			vec4 texelOld = texture2D( tOld, vUv );
			vec4 texelNew = texture2D( tNew, vUv );

			texelOld *= damp * when_gt( texelOld, 0.1 );

			gl_FragColor = max(texelNew, texelOld);

		}`};class v2 extends yl{constructor(e=.96){super(),this.uniforms=dl.clone(zp.uniforms),this.damp=e,this.compFsMaterial=new Cn({uniforms:this.uniforms,vertexShader:zp.vertexShader,fragmentShader:zp.fragmentShader}),this.copyFsMaterial=new Cn({uniforms:dl.clone($r.uniforms),vertexShader:$r.vertexShader,fragmentShader:$r.fragmentShader,blending:Fa,depthTest:!1,depthWrite:!1}),this._textureComp=new _i(window.innerWidth,window.innerHeight,{magFilter:Fn,type:Di}),this._textureOld=new _i(window.innerWidth,window.innerHeight,{magFilter:Fn,type:Di}),this._compFsQuad=new Qf(this.compFsMaterial),this._copyFsQuad=new Qf(this.copyFsMaterial)}get damp(){return this.uniforms.damp.value}set damp(e){this.uniforms.damp.value=e}render(e,n,a){this.uniforms.tOld.value=this._textureOld.texture,this.uniforms.tNew.value=a.texture,e.setRenderTarget(this._textureComp),this._compFsQuad.render(e),this._copyFsQuad.material.uniforms.tDiffuse.value=this._textureComp.texture,this.renderToScreen?(e.setRenderTarget(null),this._copyFsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(),this._copyFsQuad.render(e));const o=this._textureOld;this._textureOld=this._textureComp,this._textureComp=o}setSize(e,n){this._textureComp.setSize(e,n),this._textureOld.setSize(e,n)}dispose(){this._textureComp.dispose(),this._textureOld.dispose(),this.compFsMaterial.dispose(),this.copyFsMaterial.dispose(),this._compFsQuad.dispose(),this._copyFsQuad.dispose()}}const _2=`
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`,Px=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,Fy=`
  precision highp float;
  uniform sampler2D uOff;
  uniform sampler2D uVel;
  uniform sampler2D uBase;
  uniform vec3 uHand;
  uniform vec3 uHandVel;
  uniform float uHandStr;
  uniform float uDt;
  uniform float uTime;
  uniform float uStiff;
  uniform float uDamp;
  uniform float uPush;
  uniform float uDrag;
  uniform float uRadius;
  uniform float uCurl;
  uniform float uSwirl;
  uniform vec3 uViewAxis;
  uniform float uBands[24];
  uniform float uKick;
  uniform float uMusic;
  uniform float uMaxOff;
  uniform float uMaxVel;
  varying vec2 vUv;
`,x2=`
  ${Fy}
  __SNOISE__

  void main() {
    vec4 b = texture2D(uBase, vUv);
    // The base texture's alpha is the liveness flag. 108k particles live in
    // a 512x512 grid, so 154k slots are padding: they must integrate to
    // nothing or they show up as a bright band of garbage the moment the
    // render side samples an index it does not own. The flag is called
    // alive and not active because active is a RESERVED WORD in GLSL ES
    // and the only symptom is a link failure and a black sim.
    float alive = b.w;
    vec3 o = texture2D(uOff, vUv).xyz;
    vec3 v = texture2D(uVel, vUv).xyz;

    // PER-PARTICLE MASS, and it is what separates matter from a membrane.
    //
    // Every particle answering one push identically is a rubber sheet: the
    // field deforms and recovers as a single surface, which is legible as
    // a shape and not as a crowd of things with their own weight. Real
    // matter answers unevenly -- the light ones fling and the heavy ones
    // barely shift, and the SPREAD is the inertia cue.
    //
    // Hashed off the texel rather than an attribute: the sim has no
    // per-particle buffer of its own, and this is stable across frames
    // because vUv is.
    float mh = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
    // roughly 3:1 between lightest and heaviest
    float invMass = mix(0.55, 1.8, mh);

    // The spring that makes this a momentum layer rather than a deformation:
    // rest is the pose the existing shader already computed, and the offset
    // is always being pulled back to zero.
    vec3 F = -uStiff * o - uDamp * v;

    // Distance is measured from where the particle actually IS, rest plus
    // its current offset. Measuring from rest alone lets the hand keep
    // pumping matter it has already thrown clear of the radius.
    vec3 p = b.xyz + o;

    float w = 0.0;
    if (uHandStr > 0.001) {
      vec3 d = p - uHand;
      float dist = length(d);
      // COMPACT SUPPORT, the same law the hover field in scene.ts follows:
      // past uRadius the weight is exactly zero, so touching the near side
      // cannot make the far limb flinch. An exponential leaks, and a field
      // that never quite reaches zero is a field the whole star feels.
      float x = clamp(1.0 - dist / max(uRadius, 1e-4), 0.0, 1.0);
      w = x * x * (3.0 - 2.0 * x) * uHandStr;
      vec3 dir = d / max(dist, 1e-4);
      F += dir * (w * uPush);
      // THE SWIRL, and it is the reason this reads as mass at all.
      //
      // Pure radial push is a bubble: matter leaves along the line you
      // pushed it and comes straight back down the same line, which the
      // eye reads as a deformation rather than as something with inertia.
      // A tangential component makes it ORBIT the hand instead, and an
      // orbit is the one motion that cannot be mistaken for a spring.
      //
      // Around the view axis, not an arbitrary one: the axis is handed in
      // already rotated into cluster space, so the curl is around what you
      // are looking down and the swirl reads on screen rather than at some
      // angle into the depth you cannot see.
      vec3 tang = cross(uViewAxis, dir);
      float tl = length(tang);
      if (tl > 1e-4) F += (tang / tl) * (w * uPush * uSwirl);
      // The wake. Pure radial repulsion gives a bubble that follows the
      // hand and nothing else; dragging along the hand's own velocity is
      // what makes a fast swipe carry matter with it and leave a trail.
      F += uHandVel * (w * uDrag);
    }

    // Turbulence, gated on how disturbed this particle already is. Gating
    // on displacement rather than on the hand is what keeps the SETTLE
    // curved instead of a clean radial collapse, and it also guarantees the
    // field is identically zero at rest, so an untouched star cannot drift.
    float stir = min(1.0, length(o) * 8.0 + w);
    if (stir > 0.0) {
      vec3 q = p * 2.7 + vec3(0.0, uTime * 0.35, uTime * 0.21);
      vec3 n = vec3(snoise(q), snoise(q + 19.19), snoise(q + 43.77));
      // Curl-STYLE, not curl. A true curl needs twelve noise taps for the
      // finite differences and we are paying per fragment at 262k of them.
      // Crossing a three-tap vector field with the radial direction buys
      // the property that actually matters here: the force is tangential,
      // so it bends the return path without fighting the spring head on.
      F += cross(n, normalize(p + vec3(1e-4))) * (uCurl * 1.2 * stir);
    }

    // Semi-implicit Euler: velocity first, and the offset pass then
    // integrates with the NEW velocity. Explicit Euler on a spring this
    // stiff gains energy every step and walks itself apart in seconds.
    // a = F/m, so the light ones leap and the heavy ones lean
    v += F * invMass * uDt;

    // MUSIC AS IMPULSE, not as displacement.
    //
    // The shader already moves the body with the music, but positionally:
    // loudness sets the radius that frame and there is no follow-through,
    // which is why the star tracks a track perfectly and never rings. The
    // SUSTAIN stays there, where a continuous push honestly inflates a
    // body. The TRANSIENT comes here, where a hit throws matter and lets
    // it fly back on the spring.
    //
    // A velocity change, NOT a force, and added after the integration on
    // purpose. As a force it was multiplied by dt and had to be enormous
    // to read; worse, uSnap is a decaying value rather than a spike, so a
    // force term applied every frame it was non-zero became a sustained
    // outward push. Measured: it inflated all 108,000 particles onto the
    // 0.42 clamp and they never came home. uKick is the RISING EDGE now,
    // computed on the CPU, so it is non-zero only on the frames a
    // transient actually arrives.
    //
    // Per sector, from the particle's own azimuth, the same 24-band map
    // the render shader uses: a kick throws the low sectors and a hat
    // throws the high ones, instead of the sphere pumping as one.
    if (uKick > 0.0001) {
      float az = atan(b.z, b.x);
      int si = int(mod(floor((az + 3.14159265) / 6.2831853 * 24.0), 24.0));
      v += normalize(b.xyz + vec3(1e-5)) * (uBands[si] * uKick * uMusic * invMass);
    }
    float s = length(v);
    if (s > uMaxVel) v *= uMaxVel / s;
    gl_FragColor = vec4(v * alive, 0.0);
  }
`,y2=`
  ${Fy}

  void main() {
    float alive = texture2D(uBase, vUv).w;
    vec3 o = texture2D(uOff, vUv).xyz;
    vec3 v = texture2D(uVel, vUv).xyz;
    o += v * uDt;
    // Hard ceiling on the offset. dt is already clamped on the CPU, but a
    // sustained hand plus a tuning the owner dialled past stability can
    // still walk a particle out of the frame, and one escaped particle is
    // a visible streak across the whole plate.
    float m = length(o);
    if (m > uMaxOff) o *= uMaxOff / m;
    // Alpha carries speed so the render side can brighten fast matter
    // without a second texture fetch.
    gl_FragColor = vec4(o * alive, length(v) * alive);
  }
`,gr={stiffness:3.5,damping:1.15,push:5.5,radius:.18,curl:.12,swirl:1.2,music:.4},S2=1/30,M2=.42,b2=14,Fx=6;class E2{constructor(e,n,a){ie(this,"renderer");ie(this,"count");ie(this,"size");ie(this,"scene",new yy);ie(this,"cam",new sh(-1,1,1,-1,0,1));ie(this,"quad");ie(this,"geo");ie(this,"velMat");ie(this,"offMat");ie(this,"uniforms");ie(this,"baseTex");ie(this,"offRT",[]);ie(this,"velRT",[]);ie(this,"cur",0);ie(this,"time",0);ie(this,"live",!0);ie(this,"dead");ie(this,"clearColor",new Yt);this.renderer=e,this.count=n;let o=1;for(;o*o<n;)o*=2;this.size=o;const c=new Float32Array(o*o*4);for(let g=0;g<n;g++)c[g*4]=a[g*3],c[g*4+1]=a[g*3+1],c[g*4+2]=a[g*3+2],c[g*4+3]=1;this.baseTex=new jf(c,o,o,Pi,qi),this.baseTex.minFilter=Fn,this.baseTex.magFilter=Fn,this.baseTex.wrapS=sa,this.baseTex.wrapT=sa,this.baseTex.generateMipmaps=!1,this.baseTex.needsUpdate=!0,this.dead=new jf(new Float32Array(4),1,1,Pi,qi),this.dead.needsUpdate=!0;const u=e.extensions,p=u.has("EXT_color_buffer_half_float")||u.has("EXT_color_buffer_float"),m=u.has("EXT_color_buffer_float"),d=p?Di:qi;this.live=p||m;const v=()=>new _i(o,o,{type:d,format:Pi,minFilter:Fn,magFilter:Fn,wrapS:sa,wrapT:sa,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1});this.live&&(this.offRT=[v(),v()],this.velRT=[v(),v()]),this.uniforms={uOff:{value:null},uVel:{value:null},uBase:{value:this.baseTex},uHand:{value:new ee},uHandVel:{value:new ee},uHandStr:{value:0},uDt:{value:0},uTime:{value:0},uStiff:{value:gr.stiffness},uDamp:{value:gr.damping},uPush:{value:gr.push},uDrag:{value:gr.push*.5},uRadius:{value:gr.radius},uCurl:{value:gr.curl},uSwirl:{value:gr.swirl},uViewAxis:{value:new ee(0,0,1)},uBands:{value:new Float32Array(24)},uKick:{value:0},uMusic:{value:gr.music},uMaxOff:{value:M2},uMaxVel:{value:b2}},this.geo=new ri,this.geo.setAttribute("position",new en(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),this.geo.setAttribute("uv",new en(new Float32Array([0,0,2,0,0,2]),2));const _={depthTest:!1,depthWrite:!1};this.velMat=new Cn({uniforms:this.uniforms,vertexShader:Px,fragmentShader:x2.replace("__SNOISE__",_2),..._}),this.offMat=new Cn({uniforms:this.uniforms,vertexShader:Px,fragmentShader:y2,..._}),this.quad=new Ba(this.geo,this.velMat),this.quad.frustumCulled=!1,this.scene.add(this.quad),this.clearTargets()}clearTargets(){if(!this.live)return;const e=this.renderer,n=e.getRenderTarget();e.getClearColor(this.clearColor);const a=e.getClearAlpha();e.setClearColor(0,0);for(const o of[...this.offRT,...this.velRT])e.setRenderTarget(o),e.clear(!0,!1,!1);e.setClearColor(this.clearColor,a),e.setRenderTarget(n)}get offsetTexture(){return this.live?this.offRT[this.cur].texture:this.dead}get texSize(){return this.size}get particleCount(){return this.count}get active(){return this.live}setViewAxis(e){this.uniforms.uViewAxis.value.copy(e).normalize()}setAudio(e,n){const a=this.uniforms.uBands.value;for(let o=0;o<24;o++)a[o]=e[o];this.uniforms.uKick.value=Number.isFinite(n)?Math.max(0,Math.min(4,n)):0}setHand(e,n,a){this.uniforms.uHand.value.copy(e);const o=this.uniforms.uHandVel.value;o.copy(n);const c=o.length();c>Fx&&o.multiplyScalar(Fx/c),this.uniforms.uHandStr.value=Math.max(0,Math.min(1,a))}setTuning(e){if(e.stiffness!==void 0&&(this.uniforms.uStiff.value=Math.max(0,Math.min(600,e.stiffness))),e.damping!==void 0&&(this.uniforms.uDamp.value=Math.max(0,Math.min(60,e.damping))),e.swirl!==void 0&&(this.uniforms.uSwirl.value=Math.max(0,Math.min(4,e.swirl))),e.music!==void 0&&(this.uniforms.uMusic.value=Math.max(0,Math.min(20,e.music))),e.push!==void 0){const n=Math.max(0,Math.min(40,e.push));this.uniforms.uPush.value=n,this.uniforms.uDrag.value=n*.5}e.radius!==void 0&&(this.uniforms.uRadius.value=Math.max(.01,Math.min(4,e.radius))),e.curl!==void 0&&(this.uniforms.uCurl.value=Math.max(0,Math.min(8,e.curl)))}step(e){if(!this.live||!Number.isFinite(e)||e<=0)return;const n=Math.min(e,S2);this.time+=n,this.uniforms.uDt.value=n,this.uniforms.uTime.value=this.time;const a=this.renderer,o=a.getRenderTarget(),c=1-this.cur;this.uniforms.uOff.value=this.offRT[this.cur].texture,this.uniforms.uVel.value=this.velRT[this.cur].texture,this.quad.material=this.velMat,a.setRenderTarget(this.velRT[c]),a.render(this.scene,this.cam),this.uniforms.uVel.value=this.velRT[c].texture,this.quad.material=this.offMat,a.setRenderTarget(this.offRT[c]),a.render(this.scene,this.cam),a.setRenderTarget(o),this.cur=c}resize(){}dispose(){for(const e of[...this.offRT,...this.velRT])e.dispose();this.baseTex.dispose(),this.dead.dispose(),this.geo.dispose(),this.velMat.dispose(),this.offMat.dispose()}}const Oa=108e3,T2=.55,bf=2600,vr=3600,Tc=2200,A2=.5,Bx=.88,Jf=512,w2=(()=>{const r=new jf(new Float32Array([0,0,0,0]),1,1,Pi,qi);return r.minFilter=Fn,r.magFilter=Fn,r.generateMipmaps=!1,r.needsUpdate=!0,r})(),Ip=r=>(r%Jf+.5)/Jf,Hp=r=>(Math.floor(r/Jf)+.5)/Jf,Ac=2600,Gp=4200,Ef=`
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`,R2=`
  uniform float uTime;
  uniform float uLow;
  uniform float uMid;
  uniform float uHigh;
  uniform float uPulse;
  uniform float uAhead;
  uniform float uR;
  uniform float uReveal;
  uniform float uDensity;
  uniform float uTurb;
  uniform float uCalm;
  uniform float uStems;
  uniform float uExpo;
  uniform float uSnap;
  uniform float uZoom;
  uniform vec3 uGrabPos;
  uniform float uGrabStr;
  uniform float uGrabBand;
  uniform vec3 uHover;
  uniform vec3 uHoverLag;
  uniform float uHoverStr;
  uniform vec3 uEqVis;
  uniform float uBands[24];
  uniform float uDissect;
  uniform float uTiers;
  uniform float uGap;
  uniform float uTierOf[24];
  uniform float uTierLvl[6];
  uniform float uHiTier;
  attribute vec2 aSimUV;
  uniform sampler2D uSim;
  uniform float uSimAmt;
  uniform float uDrop;
  uniform float uStrong;
  uniform float uWave;
  attribute vec3 aDir;
  attribute float aHash;
  varying float vGlow;
  varying float vHash;
  __SNOISE__

  void main() {
    // Three octaves of drifting 3D noise: swell, boil, grain. Non-repeating
    // by construction — the field itself advects through time.
    float n1 = snoise(aDir * 2.1 + vec3(0.0, uTime * 0.11, uTime * 0.07));
    float n2 = snoise(aDir * 5.3 + vec3(uTime * 0.26, 0.0, -uTime * 0.19));
    float n3 = snoise(aDir * 11.0 + vec3(-uTime * 0.53, uTime * 0.41, 0.0));

    // Spectral anatomy: each angular sector of the body belongs to one of
    // the analyser's 24 bands — the hi-hat shimmers HERE, the bass heaves
    // THERE. Sectors rotate with the body, so the anatomy is anatomical.
    float sector = (atan(aDir.z, aDir.x) / 6.28318 + 0.5) * 24.0;
    int si = int(mod(floor(sector), 24.0));
    float bandE = uBands[si];
    // The EQ made visible: killed bands' sectors collapse dark, boosted
    // bands bulge bright. 1.0 = flat.
    float eqV = si < 8 ? uEqVis.x : si < 16 ? uEqVis.y : uEqVis.z;
    bandE *= eqV;

    float disp = (
      n1 * (0.05 + uLow * 0.30) +
      // uPulse is gone from here: the beat is an IMPULSE in the sim now,
      // and leaving it in would move the body twice for one hit -- once
      // instantly and once with follow-through. Sustain stays; the
      // transient went to the physics.
      // THE CALM END. In a quiet passage uLow/uMid/uHigh all collapse and
      // this whole sum goes to n1 * 0.05 -- a body that has stopped
      // breathing. uCalm rises as the passage falls below the track's own
      // long-run loudness, and buys back the two FINE octaves only.
      //
      // Only the fine ones, on purpose. Adding swell here would make a
      // quiet section move as much as a loud one, which is the lie Law 3
      // forbids; the star has to read as alive but SMALL. n2 advects at
      // 0.26 and n3 at 0.53, so what comes back is exactly the brief --
      // mids deforming the shape, highs as fine detail.
      //
      // The amplitudes are bounded, not chosen for taste. 0.030 + 0.022 =
      // 0.052 at full calm, and the sim's entire displacement budget is
      // 0.06. Going past that re-drowns the physics three to one, which is
      // the drowning that made the particles feel massless in the first
      // place. The calm lift has to fit UNDER the mass, never over it.
      // Only n2, the SHAPE octave. The fine octave is deliberately not
      // here: measured, adding n3 to position made the body 6.8% SMOOTHER,
      // because this is a point cloud and not a surface -- displacing
      // points scatters the density clusters that read as detail, so the
      // one thing meant to add fine detail was sanding it off. n3 does its
      // half of the brief as scintillation further down instead.
      n2 * (uMid * 0.24 + uCalm * 0.030) +
      n3 * (uHigh * 0.13) +
      n2 * bandE * 0.20) * uTurb;

    // THE BOIL YIELDS TO THE HAND.
    //
    // Measured on a live track: the audio noise above peaks at 0.19 of
    // displacement on a body of radius 0.53, while the simulator's whole
    // budget is 0.06. The physics was never under-tuned -- it was being
    // drowned three to one by decoration, which is also why raising its
    // gain read as blow-out instead of as weight. You cannot feel mass in
    // a surface that is already boiling harder than the thing you are
    // trying to feel.
    //
    // So the noise stands down where you touch. The radius is wider than
    // the push kernel's 0.34 so the field goes quiet slightly BEFORE it
    // starts to move, which is what makes the movement legible. Measured
    // from the resting direction rather than from p, because p does not
    // exist yet here and an approximate weight is all this needs.
    float handHush = 0.0;
    if (uHoverStr > 0.001) {
      float hd = length(aDir * uR * 0.60 - uHover);
      float hx = clamp(1.0 - hd / 0.26, 0.0, 1.0);
      handHush = hx * hx * (3.0 - 2.0 * hx) * uHoverStr;
    }
    disp *= 1.0 - handHush * 0.75;

    float eqBody = 0.52 + 0.48 * min(eqV, 1.25); // kills CAVE, boosts flare
    // Volumetric body, not a hollow shell: each particle owns a depth
    // inside the ball (surface-biased), so the face-on view is a boiling
    // solid mass like the reference, and tilting reveals real volume.
    float h2 = fract(aHash * 57.719);
    float depth = mix(0.42, 1.0, pow(h2, 0.38));
    // The photosphere: base radius breathes with the bass; anticipation
    // (the peaks feed) raises the surface tension before a drop lands.
    float r = uR * (0.60 + uLow * 0.16 + uAhead * 0.05) * (1.0 + disp) * depth * eqBody;
    vec3 p = aDir * r;

    // THE DISSECTION. Pulled apart, the star shears into stacked survey
    // rings — one per tier, frequency-honest (this particle's band decides
    // its tier), each ring still breathing with its own bands' energy.
    // Lower tiers leave first: an exploded engineering drawing, not a fade.
    float dl = 0.0;
    float tl = 1.0;
    float dustG = 0.0;
    float hiB = 1.0;
    if (uDissect > 0.001) {
      float tier = uTierOf[si];
      // The tier's OWN voice — for stems this is the stem's real post-gain
      // level, so killing a stem collapses and darkens its ring directly,
      // not via the shared spectrum. The band mapping alone can't promise
      // that: a muted vocal's energy was smeared across every tier's bands.
      tl = uTierLvl[int(min(tier, 5.0))];
      dl = clamp(uDissect * 1.15 - tier * 0.05, 0.0, 1.0);
      dl = dl * dl * (3.0 - 2.0 * dl);
      float ty = (tier - (uTiers - 1.0) * 0.5) * uGap;
      // A tier owns only its slice of the sphere's azimuth — kept as-is the
      // ring would be a crescent. Respread the slice around the FULL circle:
      // each ring becomes its own complete spectrum wheel, its 8 bands laid
      // out as angular segments that breathe independently.
      float tierW = 24.0 / uTiers;
      float th2 = ((sector - tier * tierW) / tierW) * 6.28318;
      // Differential rotation — the ring-system physics: the nested inner
      // ring shears faster than the outer (Keplerian), and dust streams
      // counter-rotate around the rim. Beats spin the whole mechanism up.
      float h3 = fract(aHash * 7.777);
      float nest = step(h3, 0.24);
      float dustG0 = step(0.78, h3);
      float spinDir = fract(aHash * 5.51) > 0.5 ? 1.0 : -1.0;
      th2 += uTime * (1.0 + uPulse * 1.5) * (
        0.02 + nest * 0.03 + dustG0 * (0.05 + 0.1 * fract(aHash * 13.31)) * spinDir);
      vec2 az = vec2(cos(th2), sin(th2));
      // The reference's silhouette: small crown, wide middle tiers, small
      // base — a sine profile over the stack, not six equal donuts.
      // THE SILHOUETTE IS A FREQUENCY IDEA, so it only applies to frequencies.
      // 0.72 + 0.48*sin() is "small crown, wide middle, small base" -- it
      // says the extremes of the SPECTRUM are narrow, which is true of sub
      // and air and meaningless for four stems. Applied to a stem stack it
      // made tiers 0 and 3 narrow for no reason, and tier 3 is vocals.
      // Measured at 4 tiers: 0.904 against 1.163 for the middle pair, a 22%
      // smaller ring, and vocals also draws the weakest band slice -- so the
      // one ring you look at when you solo vocals was the worst-formed one
      // on screen. Stems are peers; a cylinder is the honest form for them.
      float prof = mix(0.72 + 0.48 * sin(3.14159 * (tier + 0.5) / uTiers), 1.0, uStems);
      // Reality vs the survey: the CHROME stays an ideal ellipse while the
      // MATTER warps — slow angular noise bends each ring out of round,
      // band energy spikes its own arc, and hits kick the whole rim.
      float rwarp = snoise(vec3(cos(th2) * 1.7, sin(th2) * 1.7, tier * 3.7 + uTime * 0.2));
      // A STEM HAS ONE LEVEL, NOT TWENTY-FOUR.
      //
      // bandE is this sector's slice of the 24-band ladder, which is the
      // right drive for a frequency tier and an arbitrary one for a stem:
      // the map is positional, so vocals drew bands 18-23 and measured 0.282
      // against bass's 0.574 over 606 frames. Half the drive, decided by
      // nothing but where the word "vocals" sorted. Under Law 3 that is a
      // decorative number wearing a reading's clothes, and the per-sector
      // variation it produced described a spectrum the stem does not have.
      //
      // Dissected into stems, the drive is the stem's OWN measured level.
      // All four then differ by the one thing that is true about them, and a
      // loud stem reads bigger than a quiet one. The angular life does not
      // go with it -- n2, rwarp and undul are still here and are honest,
      // because they are texture and never claimed to be readings.
      //
      // Gated on uStems * dl so it applies only where it is true: the whole
      // sphere is still spectral, and so is every frequency tier.
      // 0.45 puts a stem at tl 1.0 alongside the ~0.4 a healthy band reads,
      // so the two modes stay the same size on screen.
      float ringE = mix(bandE, min(tl, 1.4) * 0.45, uStems * dl);
      float ringR = uR * (0.50 + ringE * 0.26 + n2 * 0.05 * uTurb) * eqBody * mix(1.0, depth, 0.10)
        * prof * (0.45 + 0.55 * min(tl, 1.4))
        * (1.0 + rwarp * (0.05 + uPulse * 0.08) + uSnap * 0.06);
      // The drawing's vocabulary: a quarter of each tier forms a nested
      // inner ring; a fraction loosens into scattered survey dust.
      dustG = dustG0;
      // the ring plane itself undulates with its layer's voice
      float undul = sin(th2 * 2.0 + uTime * 0.5 + tier * 2.1) * 0.03 * min(tl, 1.2);
      ringR *= mix(1.0, 0.46, nest);
      ringR *= 1.0 + dustG * (0.15 + 0.55 * fract(aHash * 3.117));
      hiB = 1.0 + step(abs(tier - uHiTier), 0.5) * 0.6;
      vec3 tp = vec3(
        az.x * ringR,
        ty + undul + n3 * (0.022 + dustG * 0.09) + (h2 - 0.5) * (0.035 + dustG * 0.34),
        az.y * ringR);
      p = mix(p, tp, dl);
    }

    // Matter parts and swells around the hand. Hover was a whole-body
    // parallax tilt and nothing else: setPointer wrote two scalars, the
    // cluster rotated, and not one of the 28 uniforms changed. The field
    // was rigid. This is the kernel scripts/hover-field.mjs has been
    // asking for since it was written — hdist/hdir/pushW are its names.
    //
    // Radial, outward from the hand, with COMPACT SUPPORT: past R nothing
    // moves at all, so touching the near side cannot make the far limb
    // flinch. Smoothstep rather than the exponential the mockup used —
    // an exponential leaks, and a field that never quite reaches zero is
    // a field the whole star feels.
    float hoverHeat = 0.0;
    if (uHoverStr > 0.001) {
      vec3 hoff = p - uHover;
      float hdist = length(hoff);
      vec3 hdir = hoff / max(hdist, 1e-4);
      float hx = clamp(1.0 - hdist / 0.18, 0.0, 1.0);
      float pushW = hx * hx * (3.0 - 2.0 * hx) * uHoverStr;
      p += hdir * pushW * uR * 0.09;
      // The wake. uHover is unsprung and uHoverLag chases it, so their
      // difference IS pointer velocity: the parting leans into the
      // direction of travel and smears behind, for one lerp and no extra
      // bookkeeping. Stop moving and it collapses on its own.
      p += (uHover - uHoverLag) * pushW * 1.6;
      hoverHeat = pushW * 0.26; // parted matter thins, so its rim brightens
    }

    // The hand in the matter. Band-selective: you grab the BASS and the
    // bass sectors' particles stream to your hand — everything else barely
    // stirs. Wider falloff + stronger pull than v1: the tendril must READ.
    // Sits after the hover block on purpose: press down and the pull takes
    // the field over from the parting, which is the right physical grammar.
    float pullHeat = 0.0;
    if (uGrabStr > 0.001) {
      float grp = si < 8 ? 0.0 : si < 16 ? 1.0 : 2.0;
      float bandW = uGrabBand < -0.5 ? 1.0 : (abs(grp - uGrabBand) < 0.5 ? 1.0 : 0.12);
      float pullW = exp(-length(p - uGrabPos) * 1.6) * uGrabStr * bandW;
      p = mix(p, uGrabPos, min(0.92, pullW));
      pullHeat = pullW * 0.55; // pulled matter burns brighter — the tendril is hot
    }

    // THE SIMULATOR'S CONTRIBUTION. Added last, on purpose: the dissect
    // remap and the grab are both CONTRACTIONS of p -- mix() toward a tier
    // pose and toward the hand -- so an offset applied before either would
    // be scaled down by (1 - dl) or erased by up to 92%. Every stage above
    // therefore computes the target pose, and the sim rides on top of it.
    //
    // Clamped, and not for tidiness. gl_PointSize divides by
    // max(0.4, -mv.z); during the boot dive the camera sits at z 0.44,
    // inside a body of radius 0.55, so an unbounded offset pushes points
    // through the near plane and every one that hits that floor becomes a
    // 6.9px blob on an additive layer feeding a bloom pass at threshold
    // 0.55. Small relative to bodyHit's hard-coded 0.88 * 0.62.
    vec3 simOff = texture2D(uSim, aSimUV).rgb * uSimAmt;
    float simLen = length(simOff);
    p += simOff * (simLen > 0.40 ? 0.40 / simLen : 1.0);

    // THE SHOCKWAVE. A ring of displacement travelling outward from the
    // core, not a uniform inflation -- inflation is what every beat
    // already does through the radius, and doing more of it on a drop
    // just reads as louder rather than as an EVENT. A wave has a front,
    // so matter moves in sequence from the middle out and the body is
    // briefly out of round, which is the thing that reads as impact.
    //
    // uWave is seconds since the drop landed. The front travels at 1.9
    // units a second and the ring is 0.22 wide; past ~0.9s it is outside
    // any particle and the term is dead, so it costs nothing between
    // drops.
    float wavePush = 0.0;
    if (uWave >= 0.0 && uWave < 0.95) {
      float rNow = length(p);
      float front = uWave * 1.9;
      // gaussian-ish ring, and it fades as it travels so the wave spends
      // itself rather than stopping dead at the edge of the body
      float ring = exp(-pow((rNow - front) / 0.22, 2.0)) * (1.0 - uWave / 0.95);
      wavePush = ring * uDrop;
      p += normalize(p + vec3(1e-5)) * wavePush * 0.42;
    }

    // Hot where deformed — flares glow. A slow per-particle twinkle keeps
    // the surface grainy even in still passages.
    float k = clamp(abs(disp) * 3.2, 0.0, 1.0);
    float tw = 0.72 + 0.28 * sin(uTime * (2.0 + aHash * 6.0) + aHash * 40.0);
    // Interior burns slightly dimmer than the surface — the fabric reads
    // as one mass with depth, not two nested skins.
    // Snap is unsprung: the kick flashes the frame it lands.
    // Same substitution as ringE, recomputed because that one is scoped to
    // the dissect branch. Without this the radius stopped favouring bass and
    // the brightness carried on doing it.
    float glowE = mix(bandE, min(tl, 1.4) * 0.45, uStems * dl);
    float scint = uCalm * n3;
    vGlow = (0.10 + 0.40 * k + uPulse * 0.13 + uSnap * 0.22 + glowE * 0.18) * tw * (0.55 + 0.45 * depth) * uExpo * (0.55 + 0.45 * eqV) * (1.0 + dl * 0.35) * mix(1.0, (0.28 + 0.62 * min(tl, 1.15)) * (1.0 - dustG * 0.4) * hiB, dl) * (1.0 + scint * 0.22) + pullHeat + hoverHeat + wavePush * 1.1 + uDrop * 0.10;
    vHash = aHash;

    float on = step(fract(aHash * 977.0), uReveal) * step(fract(aHash * 331.7), uDensity);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    // Perspective would balloon every point as the camera closes in; the
    // zoom divisor keeps them near-crisp so detail comes from COUNT, not
    // from fatter dots.
    // SCINTILLATION -- the other half of the calm brief. n3 is the fine
    // octave, advecting at 0.53, and here it modulates each point's SIZE
    // and LIGHT instead of its position. That is what "fine detail" means
    // on a point cloud: the grain lives in the spread between neighbours,
    // so raising the variance sharpens it where moving the points blurred
    // it.
    //
    // Zero-mean on purpose, both terms. A quiet passage must not read
    // brighter or bigger than a loud one -- only more finely textured --
    // and n3 in -1..1 leaves the average point exactly where it was while
    // pulling its neighbours apart. Law 3 survives: nothing here invents
    // energy, it only redistributes what the passage already has.
    gl_PointSize = (1.0 + k * 1.5 + uPulse * 0.35 + uSnap * 0.9 + dl * 0.7 + scint * 0.45) * on
      * (2.75 / max(0.4, -mv.z)) / pow(uZoom, 0.78);
  }
`,C2=`
  precision mediump float;
  varying float vGlow;
  varying float vHash;
  void main() {
    // A real luminous profile: tight gaussian core plus a faint halo. Flat
    // discs read as blobs the moment you zoom in; this holds up magnified.
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv) * 2.0;
    if (d > 1.0) discard;
    float core = exp(-d * d * 5.0);
    float halo = smoothstep(1.0, 0.2, d) * (0.22 + vHash * 0.1);
    gl_FragColor = vec4(vec3(0.93) * vGlow * (core + halo), 1.0);
  }
`,D2=`
  uniform float uTime;
  uniform float uPulse;
  uniform float uR;
  uniform float uDensity;
  uniform float uZoom;
  uniform float uDissect;
  attribute vec3 aDir;
  attribute vec3 aOrg;     // launch point — the surface, or a tier's ring
  attribute float aBirth;  // scene-time of launch; large negative = dead slot
  attribute float aSpd;
  attribute float aHash;
  varying float vFade;

  void main() {
    float age = uTime - aBirth;
    float life = 1.3 + aHash * 0.9;
    float a01 = clamp(age / life, 0.0, 1.0);
    float alive = step(0.0, age) * (1.0 - step(1.0, a01)) * step(fract(aHash * 331.7), uDensity);

    // Exponential drag: fast leave, coasting arrival. Closed-form, so a
    // dead-or-alive particle costs the same and nothing runs on the CPU.
    float k = 2.1;
    float dist = aSpd * (1.0 - exp(-k * age)) / k;
    vec3 p = aOrg + aDir * dist;

    vFade = (1.0 - a01) * (1.0 - a01) * (0.55 + uPulse * 0.25) * (1.0 - uDissect * 0.6);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.1 - a01 * 1.5) * alive * (2.75 / max(0.4, -mv.z)) / pow(uZoom, 0.78);
  }
`,N2=`
  precision mediump float;
  varying float vFade;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float m = smoothstep(0.5, 0.12, length(uv));
    gl_FragColor = vec4(vec3(0.95) * vFade * m, 1.0);
  }
`,L2=`
  uniform float uTime;
  uniform float uLow;
  uniform float uMid;
  uniform float uHigh;
  uniform float uPulse;
  uniform float uAhead;
  uniform float uR;
  uniform float uReveal;
  uniform float uDensity;
  uniform float uTurb;
  uniform float uSnap;
  uniform float uOnsetN;
  uniform float uDissect;
  attribute vec2 aSimUV;
  uniform sampler2D uSim;
  uniform float uSimAmt;
  attribute vec3 aDir;
  attribute float aHash;  // shared per segment
  varying float vA;
  __SNOISE__

  void main() {
    float n1 = snoise(aDir * 2.1 + vec3(0.0, uTime * 0.11, uTime * 0.07));
    float n2 = snoise(aDir * 5.3 + vec3(uTime * 0.26, 0.0, -uTime * 0.19));
    float disp = (n1 * (0.05 + uLow * 0.30) + n2 * (uMid * 0.24 + uPulse * 0.10)) * uTurb;
    float r = uR * (0.60 + uLow * 0.16 + uAhead * 0.05) * (1.0 + disp);
    vec3 p = aDir * r;

    // Onset-driven: every real transient (snare, hat, stab) re-deals which
    // fifth of the lattice is armed, and the unsprung snap lights it the
    // same frame the sound happens.
    float gate = step(0.8, fract(aHash * 17.31 + uOnsetN * 0.618));
    float on = step(fract(aHash * 977.0), uReveal) * step(fract(aHash * 331.7), uDensity);
    // A chord between two tiers is a lie once the tiers separate.
    vA = (0.028 + gate * max(uPulse * 0.3, uSnap * 0.5)) * on * (1.0 - uDissect);
    // the lattice borrows each endpoint's shell slot, or the wireframe
    // detaches from the matter it is drawn between
    vec3 simOff = texture2D(uSim, aSimUV).rgb * uSimAmt;
    float simLen = length(simOff);
    p += simOff * (simLen > 0.40 ? 0.40 / simLen : 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`,U2=`
  precision mediump float;
  varying float vA;
  void main() {
    gl_FragColor = vec4(vec3(0.9), vA);
  }
`,O2=`
  uniform float uTime;
  uniform float uLow;
  uniform float uMid;
  uniform float uHigh;
  uniform float uPulse;
  uniform float uR;
  uniform float uReveal;
  uniform float uDensity;
  uniform float uZoom;
  uniform float uDissect;
  attribute float aHash;
  attribute vec3 aSeed;
  varying float vHeat;

  void main() {
    float coreR = uR * (0.16 + uLow * 0.14 + uPulse * 0.03);
    float t = uTime * (0.4 + aHash * 1.2);
    vec3 wob = vec3(
      sin(t * 3.1 + aHash * 40.0),
      cos(t * 2.7 + aHash * 71.0),
      sin(t * 2.2 + aHash * 23.0)
    ) * coreR * (0.10 + uHigh * 0.4);
    vec3 p = aSeed * coreR + wob;
    float dist = length(p) / max(coreR * 2.2, 1e-4);
    float clump = 0.45 + 0.55 * sin(aHash * 43.7 + uTime * 0.9);
    // Dissected, there is no centre for a furnace to live in.
    vHeat = min(0.55, (1.0 - clamp(dist, 0.0, 1.0)) * (0.22 + uLow * 0.55 + uMid * 0.18) * (0.5 + clump)) * (1.0 - uDissect * 0.9);
    float on = step(fract(aHash * 613.0), uReveal) * step(fract(aHash * 331.7), uDensity);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.4 + vHeat * 2.4) * on * (2.75 / max(0.4, -mv.z)) / pow(uZoom, 0.78);
  }
`,P2=`
  precision mediump float;
  varying float vHeat;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float m = smoothstep(0.5, 0.06, length(uv));
    gl_FragColor = vec4(vec3(1.0) * vHeat * m, 1.0);
  }
`,F2=`
  uniform float uTime;
  uniform float uVocal;
  uniform float uR;
  uniform float uZoom;
  uniform float uDissect;
  uniform float uCoronaY;
  attribute float aTheta;
  attribute float aHash;
  varying float vA;
  __SNOISE__

  void main() {
    float th = aTheta + uTime * (0.08 + aHash * 0.05);
    float r = uR * (0.86 + uVocal * 0.16 + 0.03 * snoise(vec3(cos(th), sin(th), uTime * 0.3) * 2.0 + aHash * 7.0));
    // a ring tilted out of the body's plane so it reads as its own object
    vec3 p = vec3(cos(th) * r, sin(th) * r * 0.42, sin(th) * r * 0.5);
    // Dissected, the corona is no longer a halo — it settles flat onto the
    // vocals' own tier and becomes that ring's fire.
    vec3 pd = vec3(cos(th) * r * 0.70, uCoronaY + sin(th * 3.0 + uTime) * 0.02, sin(th) * r * 0.70);
    p = mix(p, pd, uDissect);
    vA = uVocal * (0.25 + 0.75 * fract(aHash * 91.7)) * smoothstep(0.02, 0.2, uVocal);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.2 + uVocal * 1.6) * (2.75 / max(0.4, -mv.z)) / pow(uZoom, 0.78);
  }
`,B2=`
  precision mediump float;
  varying float vA;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float m = smoothstep(0.5, 0.1, length(uv));
    gl_FragColor = vec4(vec3(0.95) * vA * m, 1.0);
  }
`,z2=`
  uniform float uTime;
  uniform float uDissect;
  uniform float uR;
  uniform float uLow;
  uniform float uZoom;
  uniform float uGroundY;
  attribute vec3 aSeed; // r01, theta, hash
  varying float vA;
  __SNOISE__

  void main() {
    float r = uR * (0.2 + 1.15 * pow(aSeed.x, 0.62));
    float th = aSeed.y + uTime * 0.015;
    float n = snoise(vec3(cos(th) * r * 2.0, sin(th) * r * 2.0, uTime * 0.1) + aSeed.z * 9.0);
    vec3 p = vec3(cos(th) * r, uGroundY * uDissect + n * 0.018, sin(th) * r);
    float tw = 0.6 + 0.4 * sin(uTime * (1.0 + aSeed.z * 3.0) + aSeed.z * 40.0);
    // brightest under the stack, thinning outward — terrain lit from above
    vA = uDissect * (0.05 + uLow * 0.4) * (1.0 - aSeed.x * 0.75) * tw;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.0 + aSeed.z * 0.8) * step(0.02, uDissect) * (2.75 / max(0.4, -mv.z)) / pow(uZoom, 0.78);
  }
`,I2=`
  precision mediump float;
  varying float vA;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float m = smoothstep(0.5, 0.15, length(uv));
    gl_FragColor = vec4(vec3(0.85) * vA * m, 1.0);
  }
`;class al{constructor(){ie(this,"v",0);ie(this,"vel",0)}update(e,n,a){const o=this.v-e,c=(this.vel+a*o)*n;return this.v=e+(o+c)*Math.exp(-a*n),this.vel=(this.vel-a*c)*Math.exp(-a*n),this.v}}class H2{constructor(e){ie(this,"renderer");ie(this,"scene",new yy);ie(this,"camera");ie(this,"cluster",new Cc);ie(this,"composer");ie(this,"bloom");ie(this,"after");ie(this,"spinDial",1);ie(this,"uniforms");ie(this,"lowE",new al);ie(this,"midE",new al);ie(this,"highE",new al);ie(this,"pulseE",new al);ie(this,"aheadE",new al);ie(this,"dissectE",new al);ie(this,"dissectTarget",0);ie(this,"tierCount",6);ie(this,"lastDis",0);ie(this,"_v",new ee);ie(this,"ejecta");ie(this,"ptr",{x:0,y:0,tx:0,ty:0});ie(this,"hoverT",0);ie(this,"sim",null);ie(this,"simVel",new ee);ie(this,"simAxis",new ee);ie(this,"handHeat",0);ie(this,"snapPrev",0);ie(this,"simDial",1);ie(this,"drag",{x:0,y:0,tx:0,ty:0});ie(this,"driftT",0);ie(this,"born",performance.now());ie(this,"t",0);ie(this,"focusFrac",.5);ie(this,"focusTx",.5);ie(this,"focusFracY",.5);ie(this,"focusTy",.5);ie(this,"dolly",1);ie(this,"dollyT",1);ie(this,"bootRev",0);ie(this,"mPrev",{x:0,y:0,gx:0,gy:0});ie(this,"quality",1);ie(this,"zoom",1);ie(this,"zoomTarget",1);ie(this,"calm",matchMedia("(prefers-reduced-motion: reduce)").matches);ie(this,"lastW",2);ie(this,"lastH",1);ie(this,"lastDpr",0);ie(this,"dropCssEl",null);ie(this,"stems",!1);this.renderer=new l2({canvas:e,antialias:!1,alpha:!1}),this.renderer.outputColorSpace=Uc,Kt.enabled=!1,this.renderer.setClearColor(657930,1),this.camera=new ba(40,1,.1,20),this.camera.position.z=1/Math.tan(40/2*(Math.PI/180)),this.scene.add(this.cluster),this.uniforms={uTime:{value:0},uLow:{value:0},uMid:{value:0},uHigh:{value:0},uPulse:{value:0},uAhead:{value:0},uR:{value:1},uReveal:{value:0},uDensity:{value:1},uTurb:{value:1},uCalm:{value:0},uStems:{value:0},uExpo:{value:1},uSnap:{value:0},uZoom:{value:1},uGrabPos:{value:new ee},uGrabStr:{value:0},uGrabBand:{value:-1},uHover:{value:new ee},uHoverLag:{value:new ee},uHoverStr:{value:0},uSim:{value:w2},uSimAmt:{value:0},uDrop:{value:0},uStrong:{value:0},uWave:{value:-1},uVocal:{value:0},uDissect:{value:0},uTiers:{value:6},uGap:{value:1.95/5},uTierOf:{value:new Float32Array(24).map((n,a)=>Math.floor(a/4))},uHiTier:{value:-1},uTierLvl:{value:new Float32Array(6).fill(1)},uCoronaY:{value:0},uGroundY:{value:-1.15},uEqVis:{value:new ee(1,1,1)},uBands:{value:new Float32Array(24)},uOnsetN:{value:0}};{const n=new Float32Array(Oa*3),a=new Float32Array(Oa),o=new Float32Array(Oa*3),c=new Float32Array(Oa*2),u=Math.PI*(3-Math.sqrt(5));for(let v=0;v<Oa;v++){const _=1-v/(Oa-1)*2,g=Math.sqrt(1-_*_),M=u*v;n[v*3]=Math.cos(M)*g,n[v*3+1]=_,n[v*3+2]=Math.sin(M)*g,a[v]=Math.random(),c[v*2]=Ip(v),c[v*2+1]=Hp(v)}const p=new ri;p.setAttribute("position",new en(o,3)),p.setAttribute("aDir",new en(n,3)),p.setAttribute("aHash",new en(a,1)),p.setAttribute("aSimUV",new en(c,2));const m=new Float32Array(Oa*3);for(let v=0;v<Oa*3;v++)m[v]=n[v]*.88*.6;this.sim=new E2(this.renderer,Oa,m),this.sim.active&&(this.uniforms.uSim.value=this.sim.offsetTexture);const d=new Cn({uniforms:this.uniforms,vertexShader:R2.replace("__SNOISE__",Ef),fragmentShader:C2,blending:Ts,depthWrite:!1,depthTest:!1});this.cluster.add(new Mc(p,d))}{const n=new Float32Array(bf*3),a=new Float32Array(bf),o=new Float32Array(bf*3);for(let p=0;p<bf;p++){const m=Math.random()*Math.PI*2,d=Math.acos(2*Math.random()-1),v=.45+Math.pow(Math.random(),.45)*.85;n[p*3]=Math.sin(d)*Math.cos(m)*v,n[p*3+1]=Math.sin(d)*Math.sin(m)*v,n[p*3+2]=Math.cos(d)*v,a[p]=Math.random()}const c=new ri;c.setAttribute("position",new en(o,3)),c.setAttribute("aSeed",new en(n,3)),c.setAttribute("aHash",new en(a,1));const u=new Cn({uniforms:this.uniforms,vertexShader:O2,fragmentShader:P2,blending:Ts,depthWrite:!1,depthTest:!1});this.cluster.add(new Mc(c,u))}{const n=new Float32Array(vr*3),a=new Float32Array(vr*3),o=new Float32Array(vr).fill(-1e4),c=new Float32Array(vr),u=new Float32Array(vr),p=new Float32Array(vr*3);for(let E=0;E<vr;E++)u[E]=Math.random();const m=new ri,d=new en(n,3),v=new en(a,3),_=new en(o,1),g=new en(c,1);m.setAttribute("position",new en(p,3)),m.setAttribute("aDir",d),m.setAttribute("aOrg",v),m.setAttribute("aBirth",_),m.setAttribute("aSpd",g),m.setAttribute("aHash",new en(u,1));const M=new Cn({uniforms:this.uniforms,vertexShader:D2,fragmentShader:N2,blending:Ts,depthWrite:!1,depthTest:!1});this.cluster.add(new Mc(m,M)),this.ejecta={dir:d,org:v,birth:_,spd:g,cursor:0}}{const n=Math.PI*(3-Math.sqrt(5)),a=_=>{const g=1-_/(Oa-1)*2,M=Math.sqrt(1-g*g),E=n*_;return[Math.cos(E)*M,g,Math.sin(E)*M]},o=new Float32Array(Tc*2*3),c=new Float32Array(Tc*2),u=new Float32Array(Tc*2*3),p=[1,13,21],m=new Float32Array(Tc*2*2);for(let _=0;_<Tc;_++){const g=Math.floor(Math.random()*(Oa-22)),M=g+p[Math.random()*p.length|0],E=Math.random(),C=a(g),y=a(M);o.set(C,_*6),o.set(y,_*6+3),c[_*2]=E,c[_*2+1]=E,m[_*4]=Ip(g),m[_*4+1]=Hp(g),m[_*4+2]=Ip(M),m[_*4+3]=Hp(M)}const d=new ri;d.setAttribute("position",new en(u,3)),d.setAttribute("aDir",new en(o,3)),d.setAttribute("aHash",new en(c,1)),d.setAttribute("aSimUV",new en(m,2));const v=new Cn({uniforms:this.uniforms,vertexShader:L2.replace("__SNOISE__",Ef),fragmentShader:U2,blending:Ts,transparent:!0,depthWrite:!1,depthTest:!1});this.cluster.add(new e1(d,v))}{const n=new Float32Array(Ac),a=new Float32Array(Ac),o=new Float32Array(Ac*3);for(let p=0;p<Ac;p++)n[p]=p/Ac*Math.PI*2,a[p]=Math.random();const c=new ri;c.setAttribute("position",new en(o,3)),c.setAttribute("aTheta",new en(n,1)),c.setAttribute("aHash",new en(a,1));const u=new Cn({uniforms:this.uniforms,vertexShader:F2.replace("__SNOISE__",Ef),fragmentShader:B2,blending:Ts,depthWrite:!1,depthTest:!1});this.cluster.add(new Mc(c,u))}{const n=new Float32Array(Gp*3),a=new Float32Array(Gp*3);for(let u=0;u<Gp;u++)n[u*3]=Math.random(),n[u*3+1]=Math.random()*Math.PI*2,n[u*3+2]=Math.random();const o=new ri;o.setAttribute("position",new en(a,3)),o.setAttribute("aSeed",new en(n,3));const c=new Cn({uniforms:this.uniforms,vertexShader:z2.replace("__SNOISE__",Ef),fragmentShader:I2,blending:Ts,depthWrite:!1,depthTest:!1});this.cluster.add(new Mc(o,c))}this.composer=new p2(this.renderer),this.composer.addPass(new m2(this.scene,this.camera)),this.after=new v2(.82),this.composer.addPass(this.after),this.bloom=new pl(new Dt(2,2),.4,.25,.55),this.composer.addPass(this.bloom),this.applyDensity()}get bloomPass(){return this.bloom}setBands(e){const n=this.uniforms.uBands.value;for(let a=0;a<24;a++)n[a]=e[a]}onset(){this.uniforms.uOnsetN.value=(this.uniforms.uOnsetN.value+1)%4096}setTuning(e,n,a){this.uniforms.uTurb.value=e,this.uniforms.uExpo.value=n,this.spinDial=a}setQuality(e){this.quality=e,this.applyDensity(),this.resize(this.lastW,this.lastH)}applyDensity(){const e=Math.min(1,T2*(.55+.45*this.zoom*1.15));this.uniforms.uDensity.value=Math.min(1,e)*this.quality}zoomBy(e){this.zoomTarget=Math.max(1,Math.min(5,this.zoomTarget*e))}setZoom(e){this.zoomTarget=Math.max(1,Math.min(5,e))}bodyHit(e,n){const a=new ox;a.setFromCamera(new Dt(e,n),this.camera);const o=.88*.62,c=new vl(new ee(0,0,0),o),u=new ee;return a.ray.intersectSphere(c,u)?this.cluster.worldToLocal(u):null}setVocal(e){this.uniforms.uVocal.value=Math.max(0,Math.min(1.4,e))}setEnergy(e,n,a,o=0){this.uniforms.uDrop.value=Math.max(0,Math.min(1,e)),this.uniforms.uStrong.value=Math.max(0,Math.min(1,n)),this.uniforms.uCalm.value=Math.max(0,Math.min(1,o)),a&&(this.uniforms.uWave.value=0),this.dropCssEl&&this.dropCssEl.style.setProperty("--drop",this.uniforms.uDrop.value.toFixed(3))}setDissect(e){this.dissectTarget=Math.max(0,Math.min(1,e))}get dissect(){return this.uniforms.uDissect.value}setTierMap(e,n,a=-1){const o=this.uniforms.uTierOf.value;for(let c=0;c<24;c++)o[c]=e[c]??0;this.tierCount=n,this.uniforms.uTiers.value=n,this.uniforms.uGap.value=1.95/Math.max(1,n-1),this.stems=a>=0,this.uniforms.uStems.value=this.stems?1:0,this.uniforms.uCoronaY.value=a>=0?this.tierYFull(a):0,this.uniforms.uGroundY.value=this.tierYFull(0)-this.uniforms.uGap.value*.9}get tiers(){return this.tierCount}setHiTier(e){this.uniforms.uHiTier.value=e}get hiTier(){return this.uniforms.uHiTier.value}setTierLevels(e){const n=this.uniforms.uTierLvl.value;for(let a=0;a<6;a++)n[a]=e[a]??1}tierYFull(e){return(e-(this.tierCount-1)*.5)*this.uniforms.uGap.value}tierYNow(e){const n=this.uniforms.uDissect.value,a=Math.max(0,Math.min(1,n*1.15-e*.05));return this.tierYFull(e)*a*a*(3-2*a)}projectLocal(e,n,a){return this._v.set(e,n,a).applyMatrix4(this.cluster.matrixWorld).project(this.camera),{x:(this._v.x*.5+.5)*this.lastW,y:(-this._v.y*.5+.5)*this.lastH}}ringProfile(e){return this.stems?1:.72+.48*Math.sin(Math.PI*(e+.5)/this.tierCount)}surveyPoint(e,n,a=1){const o=.49280000000000007*this.ringProfile(e)*a;return this.projectLocal(Math.cos(n)*o,this.tierYNow(e),Math.sin(n)*o)}grabPlane(e,n){const a=new ox;a.setFromCamera(new Dt(e,n),this.camera);const o=new xr(new ee(0,0,1),0),c=new ee;return a.ray.intersectPlane(o,c),this.cluster.worldToLocal(c)}setGrab(e,n,a=-1){e&&this.uniforms.uGrabPos.value.copy(e),this.uniforms.uGrabStr.value=e?n:0,this.uniforms.uGrabBand.value=a}setEqVis(e,n,a){this.uniforms.uEqVis.value.set(e,n,a)}get densityNow(){return this.uniforms.uDensity.value}get zoomLevel(){return this.zoom}powerOn(){this.born=performance.now()-.3*1700,this.pulseE.v=1.1,this.burst(1)}setRev(e){this.bootRev=Math.max(0,e)}readMotion(){const e=this.ptr.x-this.mPrev.x,n=this.ptr.y-this.mPrev.y,a=this.drag.x-this.mPrev.gx,o=this.drag.y-this.mPrev.gy;this.mPrev.x=this.ptr.x,this.mPrev.y=this.ptr.y,this.mPrev.gx=this.drag.x,this.mPrev.gy=this.drag.y;const c=Math.hypot(e,n)*11+Math.hypot(a,o)*7,u=.2+.13*Math.sin(this.t*.9)*Math.sin(this.t*.37+1.1);return Math.min(1,u+c+this.uniforms.uPulse.value*.5)}get focusNow(){return{x:this.focusFrac,y:this.focusFracY,d:this.dolly}}setFocus(e,n=.5,a=1,o=!1){this.focusTx=e,this.focusTy=n,this.dollyT=a,o&&(this.focusFrac=e,this.focusFracY=n,this.dolly=a),this.resize(this.lastW,this.lastH)}setPointer(e,n){this.ptr.tx=e,this.ptr.ty=n,this.uniforms.uHover.value.copy(this.grabPlane(e*2,-n*2))}setSimDial(e){this.simDial=Math.max(0,Math.min(3,e))}setHover(e){this.hoverT=Math.max(0,Math.min(1,e))}burst(e,n=null){const a=Math.round(90+e*240),o=this.ejecta,c=n!=null&&this.uniforms.uDissect.value>.35,u=c?this.tierYNow(n):0,p=.88*.5;for(let m=0;m<a;m++){const d=o.cursor;if(o.cursor=(o.cursor+1)%vr,c){const v=Math.random()*Math.PI*2;o.org.setXYZ(d,Math.cos(v)*p,u,Math.sin(v)*p);const _=Math.random()*1.6-.5,g=Math.hypot(1,_);o.dir.setXYZ(d,Math.cos(v)/g,_/g,Math.sin(v)/g)}else{const v=Math.random()*Math.PI*2,_=Math.acos(2*Math.random()-1),g=Math.sin(_)*Math.cos(v),M=Math.sin(_)*Math.sin(v),E=Math.cos(_);o.dir.setXYZ(d,g,M,E),o.org.setXYZ(d,g*.88*.6,M*.88*.6,E*.88*.6)}o.birth.setX(d,this.t),o.spd.setX(d,(.5+Math.random()*.9)*(.5+e))}o.dir.needsUpdate=!0,o.org.needsUpdate=!0,o.birth.needsUpdate=!0,o.spd.needsUpdate=!0}dragBy(e,n){this.drag.tx+=e,this.drag.ty+=n}resize(e,n){const a=this.quality<1?1:Math.min(2,window.devicePixelRatio||1);(e!==this.lastW||n!==this.lastH||a!==this.lastDpr)&&(this.lastW=e,this.lastH=n,this.lastDpr=a,this.renderer.setPixelRatio(a),this.renderer.setSize(e,n,!1),this.composer.setSize(e,n),this.camera.aspect=e/Math.max(1,n)),this.placeCamera(),this.uniforms.uR.value=Bx}placeCamera(){const e=this.camera.aspect,n=this.uniforms.uDissect.value,a=1/Math.tan(40/2*(Math.PI/180)),o=e<.85;this.camera.position.z=a*this.dolly/this.zoom*(1+n*(o?1.38:.62));const c=-(this.focusFrac-.5)*2*e*this.dolly/this.zoom,u=(this.focusFracY-.5)*2*this.dolly/this.zoom,p=(o?-1*n:0)+u;this.camera.position.x=c,this.camera.position.y=p,this.camera.lookAt(c,p,0),this.camera.updateProjectionMatrix()}render(e,n,a,o,c,u=0,p=0){var g;this.uniforms.uSnap.value=p;const m=.7+this.uniforms.uPulse.value*1.6+p*1.4;this.t+=e*m,this.uniforms.uTime.value=this.t,this.uniforms.uLow.value=this.lowE.update(n,e,11),this.uniforms.uMid.value=this.midE.update(a,e,9),this.uniforms.uHigh.value=this.highE.update(o,e,13),this.uniforms.uPulse.value=this.pulseE.update(c,e,16),this.uniforms.uAhead.value=this.aheadE.update(u,e,1.6),this.uniforms.uReveal.value=Math.min(1,(performance.now()-this.born)/1700);const d=this.dissectE.update(this.dissectTarget,e,7);if(this.uniforms.uDissect.value=d,Math.abs(d-this.lastDis)>.001&&(this.lastDis=d,this.placeCamera()),Math.abs(this.dolly-this.dollyT)>1e-4||Math.abs(this.focusFrac-this.focusTx)>1e-5||Math.abs(this.focusFracY-this.focusTy)>1e-5){const M=Math.min(1,e*3.4);this.dolly+=(this.dollyT-this.dolly)*M,this.focusFrac+=(this.focusTx-this.focusFrac)*M,this.focusFracY+=(this.focusTy-this.focusFracY)*M,this.placeCamera()}Math.abs(this.zoom-this.zoomTarget)>1e-4&&(this.zoom+=(this.zoomTarget-this.zoom)*Math.min(1,e*6),this.uniforms.uZoom.value=this.zoom,this.applyDensity(),this.resize(this.lastW,this.lastH));const v=Math.min(1,e*4);this.ptr.x+=(this.ptr.tx-this.ptr.x)*v,this.ptr.y+=(this.ptr.ty-this.ptr.y)*v,this.drag.x+=(this.drag.tx-this.drag.x)*v,this.drag.y+=(this.drag.ty-this.drag.y)*v,this.uniforms.uHoverStr.value+=(this.hoverT-this.uniforms.uHoverStr.value)*Math.min(1,e*7),this.uniforms.uHoverLag.value.lerp(this.uniforms.uHover.value,Math.min(1,e*9)),this.calm||(this.driftT+=e*(.06+this.uniforms.uPulse.value*.05)*this.spinDial*(.75+m*.25)*(1+this.bootRev*5)),this.cluster.rotation.y=this.driftT+this.ptr.x*.6+this.drag.x;const _=Math.sin(this.driftT*.4)*.12-this.ptr.y*.5+this.drag.y;if(this.cluster.rotation.x=_*(1-d)+.42*d,this.bloom.strength=(.32+this.uniforms.uLow.value*.3+this.uniforms.uPulse.value*.15)*this.uniforms.uExpo.value*(1-d*.28)+this.uniforms.uDrop.value*.55+this.uniforms.uStrong.value*.16,this.after.uniforms.damp.value=Math.min(.94,.76+this.uniforms.uLow.value*.15+this.uniforms.uDrop.value*.09)*(1-this.dissect*.58),this.uniforms.uR.value=Bx*(1+this.uniforms.uDrop.value*.34+this.uniforms.uStrong.value*.06),this.uniforms.uWave.value>=0&&(this.uniforms.uWave.value+=e,this.uniforms.uWave.value>.95&&(this.uniforms.uWave.value=-1)),(g=this.sim)!=null&&g.active&&this.simDial>0){this.simVel.subVectors(this.uniforms.uHover.value,this.uniforms.uHoverLag.value).divideScalar(Math.max(e,1/240)),this.simAxis.set(0,0,1).applyQuaternion(this.camera.quaternion),this.cluster.worldToLocal(this.simAxis.add(this.cluster.position)),this.sim.setViewAxis(this.simAxis);const M=this.simVel.length();this.handHeat=Math.max(this.handHeat*Math.pow(.94,e*60),Math.min(1,M*.55)),this.sim.setHand(this.uniforms.uHover.value,this.simVel,this.uniforms.uHoverStr.value*(.25+.75*this.handHeat));const E=this.uniforms.uSnap.value;this.sim.setAudio(this.uniforms.uBands.value,Math.max(0,E-this.snapPrev)),this.snapPrev=E,this.sim.step(e),this.uniforms.uSim.value=this.sim.offsetTexture;const C=this.calm?.35:1;this.uniforms.uSimAmt.value=A2*this.simDial*C*(1-Math.min(1,this.bootRev))*this.uniforms.uReveal.value}this.composer.render()}}const zx=.55,Ix=12,G2=300,k2=30;class V2{constructor(){ie(this,"ema",.016);ie(this,"period",.0167);ie(this,"cool",3);ie(this,"q",1);ie(this,"backoff",Ix);ie(this,"t",0);ie(this,"lastRestore",-1e4)}update(e){return this.t+=e,e>.004&&(this.period+=(e-this.period)*(e<this.period?.25:6e-4)),this.period=Math.max(.006,Math.min(.021,this.period)),this.ema+=(e-this.ema)*.02,this.cool-=e,this.cool>0?null:this.ema>this.dropAt&&this.q>zx?(this.backoff=this.t-this.lastRestore<k2?Math.min(this.backoff*2,G2):Ix,this.q=zx,this.cool=this.backoff,this.q):this.ema<this.restoreAt&&this.q<1?(this.lastRestore=this.t,this.q=1,this.cool=5,this.q):null}get dropAt(){return Math.max(.024,this.period*1.7)}get restoreAt(){return Math.max(.014,this.period*1.12)}}const X2=[{title:"3 am west end",artist:"freepd · cc0",src:"/tracks/3-am-west-end.mp3"},{title:"arpent",artist:"freepd · cc0",src:"/tracks/arpent.mp3"},{title:"backbeat",artist:"freepd · cc0",src:"/tracks/backbeat.mp3"},{title:"beat one",artist:"freepd · cc0",src:"/tracks/beat-one.mp3"},{title:"beat thee",artist:"freepd · cc0",src:"/tracks/beat-thee.mp3"},{title:"bit bit loop",artist:"freepd · cc0",src:"/tracks/bit-bit-loop.mp3"},{title:"chronos",artist:"freepd · cc0",src:"/tracks/chronos.mp3"},{title:"climates using special",artist:"thomas park · cc0",src:"/tracks/climates-using-special.mp3"},{title:"fashion rebel (original)",artist:"thafs · cc by-sa",src:"/tracks/fashion-rebel-original.mp3"},{title:"fashion rebel (space mix by schult",artist:"thafs · cc by-sa",src:"/tracks/fashion-rebel-space-mix-by-schultz.mp3"},{title:"favorite",artist:"freepd · cc0",src:"/tracks/favorite.mp3"},{title:"fireworks",artist:"freepd · cc0",src:"/tracks/fireworks.mp3"},{title:"goodnightmare",artist:"freepd · cc0",src:"/tracks/goodnightmare.mp3"},{title:"hear what they say",artist:"freepd · cc0",src:"/tracks/hear-what-they-say.mp3"},{title:"inter hotel (original version 1&2)",artist:"acidko & martinka · cc by",src:"/tracks/inter-hotel-original-version-1-2.mp3"},{title:"meditating beat",artist:"freepd · cc0",src:"/tracks/meditating-beat.mp3"},{title:"mysoace",artist:"digi hartatak · cc by",src:"/tracks/mysoace.mp3"},{title:"no friend",artist:"aima emeôn · cc by-sa",src:"/tracks/no-friend.mp3"},{title:"provide agree business",artist:"thomas park · cc0",src:"/tracks/provide-agree-business.mp3"},{title:"schweizerisch amerikanische freund",artist:"netlabel · cc by",src:"/tracks/schweizerisch-amerikanische-freundshaf.mp3"},{title:"spiral universe",artist:"kenji · cc by-sa",src:"/tracks/spiral-universe.mp3"},{title:"tech beats",artist:"b.l.underwood · cc by",src:"/tracks/tech-beats.mp3"}];async function q2(r){const e=r.match(/\/(tracks|tracks-local)\/(.+)\.[^.]+$/);if(!e)return null;try{const a=await fetch(`/SCOPE/${e[1]==="tracks-local"?"peaks-local":"peaks"}/${e[2]}.json`);if(!a.ok)return null;const o=await a.json(),c=o.length,u=new Float32Array(c),p=o.bits===8?127:32767;for(let m=0;m<c;m++)u[m]=Math.max(Math.abs(o.data[m*2]),Math.abs(o.data[m*2+1]))/p;return{amp:u,secondsPerPixel:o.samples_per_pixel/o.sample_rate}}catch{return null}}async function Hx(r,e){try{const n=await e.decodeAudioData(await r.arrayBuffer()),a=n.getChannelData(0),o=Math.round(n.sampleRate/20),c=Math.floor(a.length/o),u=new Float32Array(c);for(let p=0;p<c;p++){let m=0;const d=(p+1)*o;for(let v=p*o;v<d;v++){const _=Math.abs(a[v]);_>m&&(m=_)}u[p]=m}return{amp:u,secondsPerPixel:o/n.sampleRate}}catch{return null}}function W2(r,e,n){const a=r.amp.length;if(!a)return 0;const o=Math.min(a-1,Math.floor(e*a)),c=Math.min(a,o+Math.max(1,Math.round(n/r.secondsPerPixel)));let u=0;for(let p=o;p<c;p++)u+=r.amp[p];return u/Math.max(1,c-o)}const $f="scope",Y2=[[/gym|workout|lift|rage|hype|beast|pump/i,{moods:["Aggressive","Energizing","Fiery","Rowdy"],genres:["Trap","Dubstep","Drum & Bass","Hip-Hop/Rap"],bpm:[130,180]}],[/run|running|cardio|sprint/i,{moods:["Energizing","Upbeat"],genres:["Drum & Bass","House","Electronic"],bpm:[150,180]}],[/party|club|dance|banger|festival/i,{moods:["Excited","Rowdy","Upbeat"],genres:["House","Tech House","Electronic","Dancehall"],bpm:[120,132]}],[/rave|warehouse|underground/i,{moods:["Gritty","Fiery"],genres:["Techno","Tech House","Jungle"],bpm:[128,145]}],[/late night|night drive|midnight|3am|after ?hours/i,{moods:["Brooding","Cool","Sophisticated"],genres:["Electronic","Deep House","Downtempo","R&B/Soul"],bpm:[95,122]}],[/drive|driving|highway|cruis/i,{moods:["Cool","Defiant"],genres:["Hip-Hop/Rap","Electronic","House"],bpm:[90,125]}],[/sunset|rooftop|golden hour|beach|pool/i,{moods:["Easygoing","Romantic","Upbeat"],genres:["Deep House","Disco","House"],bpm:[110,124]}],[/morning|sunrise|coffee/i,{moods:["Peaceful","Easygoing","Tender"],genres:["Lo-Fi","Downtempo","Jazz"],bpm:[70,105]}],[/rain|rainy|grey|gray|winter|cozy/i,{moods:["Melancholy","Sentimental","Peaceful"],genres:["Lo-Fi","Downtempo","Ambient","R&B/Soul"],bpm:[60,100]}],[/study|focus|deep work|coding|concentrat/i,{moods:["Peaceful","Easygoing"],genres:["Lo-Fi","Ambient","Downtempo","Electronic"],bpm:[60,110]}],[/chill|relax|calm|unwind|laid ?back/i,{moods:["Easygoing","Peaceful","Cool"],genres:["Lo-Fi","Deep House","Downtempo"],bpm:[80,115]}],[/sad|heartbreak|cry|miss|lonely/i,{moods:["Melancholy","Yearning","Sentimental"],genres:["R&B/Soul","Lo-Fi","Downtempo"],bpm:[60,100]}],[/angry|mad|fury|vent/i,{moods:["Aggressive","Defiant","Fiery"],genres:["Metal","Trap","Dubstep"],bpm:[130,175]}],[/happy|joy|good mood|feel ?good|smile/i,{moods:["Upbeat","Excited","Empowering"],genres:["Disco","House","Pop","Funk"],bpm:[110,128]}],[/love|romantic|date|slow dance/i,{moods:["Romantic","Tender","Sentimental"],genres:["R&B/Soul","Jazz","Downtempo"],bpm:[65,105]}],[/dark|sinister|villain|menac/i,{moods:["Brooding","Serious","Gritty"],genres:["Techno","Trap","Electronic"],bpm:[100,140]}],[/space|cosmic|float|dream|ethereal/i,{moods:["Peaceful","Stirring"],genres:["Ambient","Electronic","Downtempo"],bpm:[60,110]}],[/house/i,{genres:["House","Deep House","Tech House"],bpm:[118,128]}],[/techno/i,{genres:["Techno"],bpm:[125,140]}],[/dnb|drum and bass|drum & bass|jungle/i,{genres:["Drum & Bass","Jungle"],bpm:[160,180]}],[/dubstep|bass music|wobble/i,{genres:["Dubstep"],bpm:[135,150]}],[/trap|808/i,{genres:["Trap"],bpm:[130,160]}],[/hip ?hop|rap/i,{genres:["Hip-Hop/Rap"],bpm:[80,150]}],[/lo ?-?fi/i,{genres:["Lo-Fi"],bpm:[60,95]}],[/disco|funk|groove/i,{genres:["Disco","Funk"],bpm:[105,125]}],[/ambient|drone/i,{genres:["Ambient"],bpm:[50,90]}],[/jazz/i,{genres:["Jazz"]}],[/soul|rnb|r&b/i,{genres:["R&B/Soul"],bpm:[70,110]}],[/reggae|dub(?!step)/i,{genres:["Reggae"],bpm:[70,100]}],[/latin|reggaeton/i,{genres:["Latin"],bpm:[90,110]}],[/phonk|drift/i,{moods:["Gritty","Brooding"],genres:["Trap","Electro","Hip-Hop/Rap"],bpm:[125,165]}],[/hyperpop|glitch/i,{moods:["Excited","Rowdy"],genres:["Hyperpop","Glitch Hop","Electronic"],bpm:[130,170]}],[/trance|uplifting|euphoric/i,{moods:["Stirring","Empowering"],genres:["Trance","Progressive House"],bpm:[132,142]}],[/hardstyle|hardcore|gabber/i,{moods:["Aggressive","Rowdy"],genres:["Hardstyle"],bpm:[145,180]}],[/vaporwave|synthwave|retro|80s/i,{moods:["Cool","Sentimental"],genres:["Vaporwave","Electronic","Electro"],bpm:[80,118]}],[/afro|amapiano|afrobeats?/i,{moods:["Upbeat","Easygoing"],genres:["Afrobeat","House","Dancehall"],bpm:[100,118]}],[/future bass|melodic bass|chill trap/i,{moods:["Stirring","Yearning"],genres:["Future Bass","Electronic"],bpm:[130,160]}],[/sad boy|sadboy|down bad|in my feels|feels/i,{moods:["Melancholy","Yearning"],genres:["Lo-Fi","R&B/Soul","Hip-Hop/Rap"],bpm:[60,105]}],[/rock|guitar|band/i,{genres:["Rock","Alternative"],bpm:[100,160]}],[/metal|heavy/i,{moods:["Aggressive","Fiery"],genres:["Metal"],bpm:[120,190]}],[/pop\b|catchy|radio/i,{moods:["Upbeat"],genres:["Pop"],bpm:[100,130]}]];function j2(r){var p,m;const e=new Set,n=new Set;let a=1/0,o=-1/0;for(const[d,v]of Y2)d.test(r)&&((p=v.moods)==null||p.forEach(_=>e.add(_)),(m=v.genres)==null||m.forEach(_=>n.add(_)),v.bpm&&(a=Math.min(a,v.bpm[0]),o=Math.max(o,v.bpm[1])));const c={moods:e.size?[...e]:void 0,genres:n.size?[...n]:void 0,bpm:isFinite(a)?[a,o]:void 0},u=[];return c.moods&&u.push(c.moods.slice(0,2).join("/").toLowerCase()),c.genres&&u.push(c.genres.slice(0,2).join("/").toLowerCase()),c.bpm&&u.push(`${c.bpm[0]}-${c.bpm[1]}bpm`),{sense:c,read:u.length?`read as ${u.join(" · ")}`:"no read · searching the words themselves"}}const By=["House","Deep House","Tech House","Techno","Electronic","Dubstep","Drum & Bass"];let Tf=null;async function zy(){if(Tf)return Tf;try{const n=((await(await fetch("https://api.audius.co",{signal:AbortSignal.timeout(4e3)})).json()).data??[]).filter(a=>!a.includes("api.audius.co"));n.length&&(Tf=n[Math.floor(Math.random()*Math.min(3,n.length))])}catch{}return Tf??(Tf="https://discoveryprovider.audius.co")}function zm(r){return r.is_streamable===!1||r.is_stream_gated||r.is_delete||r.is_available===!1?!1:r.duration>=90&&r.duration<=600}function Iy(r,e){return{title:r.title.slice(0,42),artist:`${r.user.name.slice(0,24)} · audius`,src:`${e}/v1/tracks/${r.id}/stream?app_name=${$f}`,bpm:r.bpm&&r.bpm>40&&r.bpm<220?Math.round(r.bpm):void 0,musicalKey:r.musical_key||void 0,genre:r.genre||void 0,plays:r.play_count,link:r.permalink?`https://audius.co${r.permalink}`:void 0}}function Z2(r){for(let e=r.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[r[e],r[n]]=[r[n],r[e]]}return r}async function K2(r=null,e=40){try{const n=await zy(),a=r?[r]:By,o=new Map;await Promise.allSettled(a.map(async u=>{const p=await fetch(`${n}/v1/tracks/trending?genre=${encodeURIComponent(u)}&app_name=${$f}&limit=${r?40:24}`,{signal:AbortSignal.timeout(6e3)});if(!p.ok)return;const m=await p.json();for(const d of m.data??[])zm(d)&&o.set(d.id,d)}));const c=[...o.values()].sort((u,p)=>(p.play_count??0)-(u.play_count??0)).slice(0,e);return Z2(c).map(u=>Iy(u,n))}catch{return[]}}async function Q2(r){const{sense:e,read:n}=j2(r);try{const a=await zy(),o=e.genres??By,c=new Map,u=o.slice(0,5).map(async d=>{const v=await fetch(`${a}/v1/tracks/trending?genre=${encodeURIComponent(d)}&app_name=${$f}&limit=30`,{signal:AbortSignal.timeout(6e3)});if(!v.ok)return;const _=await v.json();for(const g of _.data??[])zm(g)&&!c.has(g.id)&&c.set(g.id,{t:g,fromSearch:!1})});u.push((async()=>{const d=await fetch(`${a}/v1/tracks/search?query=${encodeURIComponent(r)}&app_name=${$f}&limit=40`,{signal:AbortSignal.timeout(7e3)});if(!d.ok)return;const v=await d.json();for(const _ of v.data??[]){if(!zm(_))continue;const g=c.get(_.id);g?g.fromSearch=!0:c.set(_.id,{t:_,fromSearch:!0})}})()),await Promise.allSettled(u);const p=[...c.values()].map(({t:d,fromSearch:v})=>{let _=Math.log10(1+(d.play_count??0))*.5;return v&&(_+=1),e.moods&&d.mood&&e.moods.includes(d.mood)&&(_+=2),e.genres&&d.genre&&e.genres.includes(d.genre)&&(_+=1.5),e.bpm&&d.bpm&&d.bpm>=e.bpm[0]&&d.bpm<=e.bpm[1]&&(_+=1),{t:d,score:_}});p.sort((d,v)=>v.score-d.score);const m=p.slice(0,30).map(d=>d.t);for(let d=Math.min(m.length,12)-1;d>0;d--){const v=Math.floor(Math.random()*(d+1));[m[d],m[v]]=[m[v],m[d]]}return{tracks:m.map(d=>Iy(d,a)),read:n}}catch{return{tracks:[],read:n}}}const Hy=[[/vocal|vox|acapella|voice/i,"vocals"],[/drum|beat|perc/i,"drums"],[/bass|sub|808/i,"bass"]];function J2(r){for(const[e,n]of Hy)if(e.test(r))return n;return"other"}function $2(r){return r.length<2||r.length>8?!1:r.some(e=>Hy.some(([n])=>n.test(e.name)))}class Gx{constructor(e,n){ie(this,"ctx");ie(this,"out");ie(this,"stems",[]);ie(this,"startAt",0);ie(this,"offset",0);ie(this,"_playing",!1);ie(this,"duration",0);ie(this,"soloRole",null);this.ctx=e,this.out=e.createGain(),this.out.connect(n)}loadBuffers(e){this.disposeStems(),this.soloRole=null;for(const n of e){const a=this.ctx.createGain(),o=this.ctx.createAnalyser();o.fftSize=256,a.connect(this.out),a.connect(o),this.stems.push({role:n.role,name:n.name.slice(0,22),buffer:n.buffer,gain:a,tap:o,source:null,userGain:1,muted:!1,level:0,bin:new Float32Array(256)})}this.duration=Math.max(...this.stems.map(n=>n.buffer.duration))}async load(e){this.disposeStems();for(const n of e){const a=await this.ctx.decodeAudioData(await n.arrayBuffer()),o=this.ctx.createGain(),c=this.ctx.createAnalyser();c.fftSize=256,o.connect(this.out),o.connect(c),this.stems.push({role:J2(n.name),name:n.name.replace(/\.[^.]+$/,"").slice(0,22),buffer:a,gain:o,tap:c,source:null,userGain:1,muted:!1,level:0,bin:new Float32Array(256)})}this.duration=Math.max(...this.stems.map(n=>n.buffer.duration))}play(e=this.offset){this.disposeSources();const n=this.ctx.currentTime+.06;this.offset=Math.max(0,Math.min(this.duration-.05,e));let a=null,o=-1;for(const c of this.stems){const u=this.ctx.createBufferSource();u.buffer=c.buffer,u.connect(c.gain),u.start(n,Math.min(this.offset,c.buffer.duration-.05)),c.source=u,c.buffer.duration>o&&(o=c.buffer.duration,a=u)}if(a){const c=this.stems.map(u=>u.source);a.onended=()=>{this._playing&&this.stems.some(u=>c.includes(u.source))&&(this.offset=this.duration,this._playing=!1)}}this.startAt=n,this._playing=!0}pause(){this.offset=this.currentTime(),this.disposeSources(),this._playing=!1}seek(e){const n=this._playing;this.offset=e,n&&this.play(e)}currentTime(){return this._playing?Math.min(this.duration,this.offset+(this.ctx.currentTime-this.startAt)):this.offset}get playing(){return this._playing}setStemGain(e,n){for(const a of this.stems)a.role===e&&(a.userGain=Math.max(0,Math.min(2,n)),this.apply(a))}toggleMute(e){const n=this.stems[e];n&&(n.muted=!n.muted,this.apply(n))}toggleMuteRole(e){let n=!1;for(const a of this.stems)a.role===e&&(n=n||!a.muted);for(const a of this.stems)a.role===e&&(a.muted=n,this.apply(a))}solo(e){this.soloRole=e;for(const n of this.stems)this.apply(n)}apply(e){const n=e.muted||this.soloRole&&e.role!==this.soloRole?0:e.userGain;e.gain.gain.setTargetAtTime(n,this.ctx.currentTime,.03)}info(){return this.stems.map(e=>{e.tap.getFloatTimeDomainData(e.bin);let n=0;for(let a=0;a<e.bin.length;a++)n+=e.bin[a]*e.bin[a];return e.level=Math.sqrt(n/e.bin.length)*(e.muted?0:1),{role:e.role,name:e.name,level:e.level,gain:e.userGain,muted:e.muted}})}peaks(e=20){var u;const n=((u=this.stems[0])==null?void 0:u.buffer.sampleRate)??44100,a=Math.round(n/e),o=Math.floor(this.duration*n/a),c=new Float32Array(o);for(const p of this.stems){const m=p.buffer.getChannelData(0);for(let d=0;d<o;d++){let v=0;const _=Math.min(m.length,(d+1)*a);for(let g=d*a;g<_;g+=4){const M=Math.abs(m[g]);M>v&&(v=M)}c[d]=Math.min(1,c[d]+v*.5)}}return{amp:c,secondsPerPixel:a/n}}disposeSources(){var e;for(const n of this.stems){try{(e=n.source)==null||e.stop()}catch{}n.source=null}}disposeStems(){this.disposeSources();for(const e of this.stems)e.gain.disconnect(),e.tap.disconnect();this.stems=[]}dispose(){this.disposeStems(),this.out.disconnect(),this._playing=!1}}const kx=":=+xX#@/<>",eR=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;function _r({text:r,duration:e=650,className:n,replayOnHover:a=!1}){const[o,c]=Pe.useState(r),[u,p]=Pe.useState(0);return Pe.useEffect(()=>{if(eR()){c(r);return}const m=performance.now();let d=0;const v=()=>{const _=Math.min(1,(performance.now()-m)/e);let g="";for(let M=0;M<r.length;M++){const E=r[M];if(E===" "||E==="·"){g+=E;continue}const C=.15+M/Math.max(1,r.length)*.7;g+=_>=C?E:kx[Math.random()*kx.length|0]}c(g),_<1&&(d=requestAnimationFrame(v))};return d=requestAnimationFrame(v),()=>cancelAnimationFrame(d)},[r,e,u]),D.jsx("span",{className:n,onPointerEnter:a?()=>p(m=>m+1):void 0,children:o})}const Gy=["pointerdown","mousedown","pointerup","mouseup","click"],Im=new WeakMap;function ky(r,e,n){tg(r);let a=o=>{let c=o.target;r.contains(c)&&((!n||n(c))&&(o.preventDefault(),o.stopPropagation(),o.stopImmediatePropagation()),o.type==="click"&&(e==null||e(o)))};for(let o of Gy)document.addEventListener(o,a,!0);Im.set(r,a)}function tg(r){let e=Im.get(r);if(e){for(let n of Gy)document.removeEventListener(n,e,!0);Im.delete(r)}}function tR(r,e){let n=r.wrapper.getBoundingClientRect();return{width:n.width+e,height:n.height+e,realWidth:n.width,realHeight:n.height}}function Vx(r,e){let{elementDimensions:n,popoverDimensions:a,popoverPadding:o,popoverArrowDimensions:c}=e;return r==="start"?Math.max(Math.min(n.top-o,window.innerHeight-a.realHeight-c.width),c.width):r==="end"?Math.max(Math.min(n.top-(a==null?void 0:a.realHeight)+n.height+o,window.innerHeight-(a==null?void 0:a.realHeight)-c.width),c.width):r==="center"?Math.max(Math.min(n.top+n.height/2-(a==null?void 0:a.realHeight)/2,window.innerHeight-(a==null?void 0:a.realHeight)-c.width),c.width):0}function Xx(r,e){let{elementDimensions:n,popoverDimensions:a,popoverPadding:o,popoverArrowDimensions:c}=e;return r==="start"?Math.max(Math.min(n.left-o,window.innerWidth-a.realWidth-c.width),c.width):r==="end"?Math.max(Math.min(n.left-(a==null?void 0:a.realWidth)+n.width+o,window.innerWidth-(a==null?void 0:a.realWidth)-c.width),c.width):r==="center"?Math.max(Math.min(n.left+n.width/2-(a==null?void 0:a.realWidth)/2,window.innerWidth-(a==null?void 0:a.realWidth)-c.width),c.width):0}function ng(r,e,n){let{align:a,side:o}=n,c=n.centered?"over":o,u=n.padding,p=tR(r,n.offset),m=r.arrow.getBoundingClientRect(),d=e.getBoundingClientRect(),v=d.top-p.height,_=v>=0,g=window.innerHeight-(d.bottom+p.height),M=g>=0,E=d.left-p.width,C=E>=0,y=window.innerWidth-(d.right+p.width),x=y>=0,O=!_&&!M&&!C&&!x,N=c;if(c==="top"&&_?x=C=M=!1:c==="bottom"&&M?x=C=_=!1:c==="left"&&C?x=_=M=!1:c==="right"&&x&&(C=_=M=!1),c==="over"){let R=window.innerWidth/2-p.realWidth/2,I=window.innerHeight/2-p.realHeight/2;r.wrapper.style.left=`${R}px`,r.wrapper.style.right="auto",r.wrapper.style.top=`${I}px`,r.wrapper.style.bottom="auto"}else if(O){let R=window.innerWidth/2-(p==null?void 0:p.realWidth)/2;r.wrapper.style.left=`${R}px`,r.wrapper.style.right="auto",r.wrapper.style.bottom="10px",r.wrapper.style.top="auto"}else if(C){let R=Math.min(E,window.innerWidth-(p==null?void 0:p.realWidth)-m.width),I=Vx(a,{elementDimensions:d,popoverDimensions:p,popoverPadding:u,popoverArrowDimensions:m});r.wrapper.style.left=`${R}px`,r.wrapper.style.top=`${I}px`,r.wrapper.style.bottom="auto",r.wrapper.style.right="auto",N="left"}else if(x){let R=Math.min(y,window.innerWidth-(p==null?void 0:p.realWidth)-m.width),I=Vx(a,{elementDimensions:d,popoverDimensions:p,popoverPadding:u,popoverArrowDimensions:m});r.wrapper.style.right=`${R}px`,r.wrapper.style.top=`${I}px`,r.wrapper.style.bottom="auto",r.wrapper.style.left="auto",N="right"}else if(_){let R=Math.min(v,window.innerHeight-p.realHeight-m.width),I=Xx(a,{elementDimensions:d,popoverDimensions:p,popoverPadding:u,popoverArrowDimensions:m});r.wrapper.style.top=`${R}px`,r.wrapper.style.left=`${I}px`,r.wrapper.style.bottom="auto",r.wrapper.style.right="auto",N="top"}else if(M){let R=Math.min(g,window.innerHeight-(p==null?void 0:p.realHeight)-m.width),I=Xx(a,{elementDimensions:d,popoverDimensions:p,popoverPadding:u,popoverArrowDimensions:m});r.wrapper.style.left=`${I}px`,r.wrapper.style.bottom=`${R}px`,r.wrapper.style.top="auto",r.wrapper.style.right="auto",N="bottom"}iR(r,O?"over":N,a,e),[...r.wrapper.classList].filter(R=>R.startsWith("driver-popover-side-")||R.startsWith("driver-popover-align-")).forEach(R=>r.wrapper.classList.remove(R)),r.wrapper.classList.add(`driver-popover-side-${N}`),r.wrapper.classList.add(`driver-popover-align-${a}`)}function qx(r,e,n,a,o,c=10){let u=a-n;return r<=n&&e>=a?o==="start"?15+c/2:o==="end"?u-15-c/2:u/2:(Math.min(Math.max(r,n),a)+Math.min(Math.max(e,n),a))/2-n}function Wx(r,e,n=10){let a=e-15-n;if(a<15)return Math.max(0,(e-n)/2);let o=r-n/2;return Math.min(Math.max(o,15),a)}function nR(r,e,n){return r==="left"||r==="right"?e.bottom>n.top&&e.top<n.bottom?r:e.bottom<=n.top?"bottom":"top":e.right>n.left&&e.left<n.right?r:e.right<=n.left?"right":"left"}function iR(r,e,n,a){let o=r.arrow;if(o.className="driver-popover-arrow",o.style.top="",o.style.right="",o.style.bottom="",o.style.left="",e==="over"){o.classList.add("driver-popover-arrow-none");return}let c=a.getBoundingClientRect(),u=r.wrapper.getBoundingClientRect(),p=nR(e,c,u);o.classList.add(`driver-popover-arrow-side-${p}`);let m=o.getBoundingClientRect().width||10;if(p==="left"||p==="right"){let d=qx(c.top,c.bottom,u.top,u.bottom,n,m);o.style.top=`${Wx(d,u.height,m)}px`}else{let d=qx(c.left,c.right,u.left,u.right,n,m);o.style.left=`${Wx(d,u.width,m)}px`}}function eh(r){return typeof r=="function"?r():typeof r=="string"?document.querySelector(r):r}function aR(r){let e=window.getComputedStyle(r);return[e.overflow,e.overflowX,e.overflowY].some(n=>n==="auto"||n==="scroll")}function Af(r,e,n,a){return(r/=a/2)<1?n/2*r*r+e:-n/2*(--r*(r-2)-1)+e}function Vy(r){let e='a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';return r.flatMap(n=>{let a=n.matches(e),o=Array.from(n.querySelectorAll(e));return[...a?[n]:[],...o]}).filter(n=>getComputedStyle(n).pointerEvents!=="none"&&oR(n))}function Xy(r,e){if(!r||rR(r))return;let n=r.offsetHeight>window.innerHeight;r.scrollIntoView({behavior:!e||sR(r)?"auto":"smooth",inline:"center",block:n?"start":"center"})}function sR(r){if(!r||!r.parentElement)return;let e=r.parentElement;return e.scrollHeight>e.clientHeight}function rR(r){let e=r.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&e.right<=(window.innerWidth||document.documentElement.clientWidth)}function oR(r){return!!(r.offsetWidth||r.offsetHeight||r.getClientRects().length)}function lR(r){r&&(r.wrapper.style.display="none")}function cR(r,e){var C;let n=fR();document.body.appendChild(n.wrapper);let{title:a,description:o,showButtons:c,disableButtons:u,showProgress:p,nextBtnText:m,prevBtnText:d,progressText:v}=e;n.nextButton.innerHTML=m,n.previousButton.innerHTML=d,n.progress.innerHTML=v,e.doneButton&&n.nextButton.classList.add("driver-popover-done-btn"),a?(n.title.innerHTML=a,n.title.style.display="block"):n.title.style.display="none",o?(n.description.innerHTML=o,n.description.style.display="block"):n.description.style.display="none";let _=c.includes("next")||c.includes("previous")||p;n.closeButton.style.display=c.includes("close")?"block":"none",_?(n.footer.style.display="flex",n.progress.style.display=p?"block":"none",n.nextButton.style.display=c.includes("next")?"block":"none",n.previousButton.style.display=c.includes("previous")?"block":"none"):n.footer.style.display="none",u.includes("next")&&(n.nextButton.disabled=!0,n.nextButton.classList.add("driver-popover-btn-disabled")),u.includes("previous")&&(n.previousButton.disabled=!0,n.previousButton.classList.add("driver-popover-btn-disabled")),u.includes("close")&&(n.closeButton.disabled=!0,n.closeButton.classList.add("driver-popover-btn-disabled"));let g=n.wrapper;g.style.display="block",g.style.left="",g.style.top="",g.style.bottom="",g.style.right="",g.id="driver-popover-content",g.setAttribute("role","dialog"),g.setAttribute("aria-labelledby","driver-popover-title"),g.setAttribute("aria-describedby","driver-popover-description");let M=n.arrow;M.className="driver-popover-arrow",g.className=`driver-popover ${e.popoverClass||""}`.trim(),ky(n.wrapper,y=>{var O,N,R;let x=y.target;if(x.closest(".driver-popover-next-btn"))return(O=e.onNextClick)==null?void 0:O.call(e);if(x.closest(".driver-popover-prev-btn"))return(N=e.onPrevClick)==null?void 0:N.call(e);if(x.closest(".driver-popover-close-btn"))return(R=e.onCloseClick)==null?void 0:R.call(e)},y=>n.description.contains(y)||n.title.contains(y)?!1:!!y.closest(".driver-popover-prev-btn, .driver-popover-next-btn, .driver-popover-close-btn")),(C=e.onRender)==null||C.call(e,n),ng(n,r,e.position),uR(n,r,e.position),Xy(g,e.smoothScroll);let E=Vy([g,r]);return E.length>0&&E[0].focus(),n}function uR(r,e,n){r.wrapper.querySelectorAll("img").forEach(a=>{if(a.complete)return;let o=()=>ng(r,e,n);a.addEventListener("load",o,{once:!0}),a.addEventListener("error",o,{once:!0})})}function fR(){let r=document.createElement("div");r.classList.add("driver-popover");let e=document.createElement("div");e.classList.add("driver-popover-arrow");let n=document.createElement("header");n.id="driver-popover-title",n.classList.add("driver-popover-title"),n.style.display="none",n.innerText="Popover Title";let a=document.createElement("div");a.id="driver-popover-description",a.classList.add("driver-popover-description"),a.style.display="none",a.innerText="Popover description is here";let o=document.createElement("button");o.type="button",o.classList.add("driver-popover-close-btn"),o.setAttribute("aria-label","Close"),o.innerHTML="&times;";let c=document.createElement("footer");c.classList.add("driver-popover-footer");let u=document.createElement("span");u.classList.add("driver-popover-progress-text"),u.innerText="";let p=document.createElement("span");p.classList.add("driver-popover-navigation-btns");let m=document.createElement("button");m.type="button",m.classList.add("driver-popover-prev-btn","driver-popover-footer-btn"),m.innerHTML="Previous";let d=document.createElement("button");return d.type="button",d.classList.add("driver-popover-next-btn","driver-popover-footer-btn"),d.innerHTML="Next",p.appendChild(m),p.appendChild(d),c.appendChild(u),c.appendChild(p),r.appendChild(o),r.appendChild(e),r.appendChild(n),r.appendChild(a),r.appendChild(c),{wrapper:r,arrow:e,title:n,description:a,footer:c,previousButton:m,nextButton:d,closeButton:o,footerButtons:p,progress:u}}function qy(r){var e;r&&(tg(r.wrapper),(e=r.wrapper.parentElement)==null||e.removeChild(r.wrapper))}function Wy(r,e){let n=window.innerWidth,a=window.innerHeight,o=e.padding,c=e.radius,u=r.width+o*2,p=r.height+o*2,m=Math.min(c,u/2,p/2),d=Math.floor(Math.max(m,0)),v=r.x-o+d,_=r.y-o,g=u-d*2,M=p-d*2;return`M${n},0L0,0L0,${a}L${n},${a}L${n},0Z
    M${v},${_} h${g} a${d},${d} 0 0 1 ${d},${d} v${M} a${d},${d} 0 0 1 -${d},${d} h-${g} a${d},${d} 0 0 1 -${d},-${d} v-${M} a${d},${d} 0 0 1 ${d},-${d} z`}function hR(r,e,n,a,o){let c=r.getState("__activeStagePosition"),u=c||a.getBoundingClientRect(),p=o.getBoundingClientRect();c={x:Af(e,u.x,p.x-u.x,n),y:Af(e,u.y,p.y-u.y,n),width:Af(e,u.width,p.width-u.width,n),height:Af(e,u.height,p.height-u.height,n)},jy(r,c),r.setState("__activeStagePosition",c)}function Yy(r,e){if(!e)return;let n=e.getBoundingClientRect(),a={x:n.x,y:n.y,width:n.width,height:n.height};r.setState("__activeStagePosition",a),jy(r,a)}function dR(r){let e=r.getState("__activeStagePosition"),n=r.getState("__overlaySvg");if(!e)return;if(!n){console.warn("No stage svg found.");return}let a=window.innerWidth,o=window.innerHeight;n.setAttribute("viewBox",`0 0 ${a} ${o}`)}function pR(r,e){let n=mR(r,e);document.body.appendChild(n),ky(n,a=>{a.target.tagName==="path"&&r.emit("overlayClick")}),r.setState("__overlaySvg",n)}function jy(r,e){let n=r.getState("__overlaySvg");if(!n){pR(r,e);return}let a=n.firstElementChild;if((a==null?void 0:a.tagName)!=="path")throw Error("no path element found in stage svg");a.setAttribute("d",Wy(e,Zy(r)))}function Zy(r){return{padding:r.getConfig("stagePadding")||0,radius:r.getConfig("stageRadius")||0}}function mR(r,e){let n=window.innerWidth,a=window.innerHeight,o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.classList.add("driver-overlay","driver-overlay-animated"),o.setAttribute("viewBox",`0 0 ${n} ${a}`),o.setAttribute("xmlSpace","preserve"),o.setAttribute("xmlnsXlink","http://www.w3.org/1999/xlink"),o.setAttribute("version","1.1"),o.setAttribute("preserveAspectRatio","xMinYMin slice"),o.style.fillRule="evenodd",o.style.clipRule="evenodd",o.style.strokeLinejoin="round",o.style.strokeMiterlimit="2",o.style.zIndex="10000",o.style.position="fixed",o.style.top="0",o.style.left="0",o.style.width="100%",o.style.height="100%";let c=document.createElementNS("http://www.w3.org/2000/svg","path");return c.setAttribute("d",Wy(e,Zy(r))),c.style.fill=r.getConfig("overlayColor")||"rgb(0,0,0)",c.style.opacity=`${r.getConfig("overlayOpacity")}`,c.style.pointerEvents="auto",c.style.cursor="auto",o.appendChild(c),o}function gR(r){let e=r.getState("__overlaySvg");e&&(tg(e),e.remove())}const Ky="{{current}} of {{total}}";function Qy(r,e){return!(e.skipMissingElement??r.getConfig("skipMissingElement"))||!e.element?!1:!eh(e.element)}function ws(r,e,n){let a=r.getConfig("steps")||[];for(let o=e;o>=0&&o<a.length;o+=n)if(!Qy(r,a[o]))return o}function kf(r,e){var c,u;let n=r.getState("activeIndex"),a=n!==void 0&&ws(r,n+1,1)===void 0,o=((c=e==null?void 0:e.popover)==null?void 0:c.onDoneClick)||r.getConfig("onDoneClick");return a&&o?o:((u=e==null?void 0:e.popover)==null?void 0:u.onNextClick)||r.getConfig("onNextClick")}function Jy(r,e){var n;return((n=e==null?void 0:e.popover)==null?void 0:n.onPrevClick)||r.getConfig("onPrevClick")}function vR(r,e){var n;return((n=e==null?void 0:e.popover)==null?void 0:n.onCloseClick)||r.getConfig("onCloseClick")}function _R(r,e,n){let a=r.getConfig("steps")||[],o=a[e],c=o.popover||{},u=ws(r,e+1,1)!==void 0,p=ws(r,e-1,-1)!==void 0,m=c.doneBtnText||r.getConfig("doneBtnText")||"Done",d=r.getConfig("allowClose"),v=c.showProgress===void 0?r.getConfig("showProgress"):c.showProgress,_=(c.progressText||r.getConfig("progressText")||Ky).replace("{{current}}",`${e+1}`).replace("{{total}}",`${a.length}`),g=c.showButtons||r.getConfig("showButtons"),M=["next","previous",...d?["close"]:[]].filter(x=>!(g!=null&&g.length)||g.includes(x)),E=c.onNextClick||r.getConfig("onNextClick"),C=c.onPrevClick||r.getConfig("onPrevClick"),y=c.onCloseClick||r.getConfig("onCloseClick");return{...o,popover:{showButtons:M,nextBtnText:u?void 0:m,disableButtons:[...p?[]:["previous"]],showProgress:v,onNextClick:E||n.onNextClick,onPrevClick:C||n.onPrevClick,onCloseClick:y||n.onCloseClick,...c,progressText:_}}}function $y(r,e,n){var o,c;let a=r.getConfig("stagePadding")||0;return{side:((o=n.popover)==null?void 0:o.side)||"bottom",align:((c=n.popover)==null?void 0:c.align)||"start",offset:a+(r.getConfig("popoverOffset")||0),padding:a,centered:e.id==="driver-dummy-element"}}function xR(r,e,n){let a=n.popover||{},o=r.getState("activeIndex"),c=o!==void 0&&ws(r,o+1,1)===void 0;return{title:a.title,description:a.description,showButtons:a.showButtons||r.getConfig("showButtons"),disableButtons:a.disableButtons||r.getConfig("disableButtons")||[],showProgress:a.showProgress||r.getConfig("showProgress")||!1,progressText:a.progressText??(r.getConfig("progressText")||Ky),nextBtnText:a.nextBtnText??(r.getConfig("nextBtnText")||"Next"),prevBtnText:a.prevBtnText??(r.getConfig("prevBtnText")||"Previous"),doneButton:c,popoverClass:a.popoverClass||r.getConfig("popoverClass")||"",smoothScroll:r.getConfig("smoothScroll"),onNextClick:()=>{let u=kf(r,n);return u?u(e,n,r.getHookOpts()):r.emit("nextClick")},onPrevClick:()=>{let u=Jy(r,n);return u?u(e,n,r.getHookOpts()):r.emit("prevClick")},onCloseClick:()=>{let u=vR(r,n);return u?u(e,n,r.getHookOpts()):r.emit("closeClick")},onRender:u=>{var p;r.setState("popover",u),(p=a.onPopoverRender||r.getConfig("onPopoverRender"))==null||p(u,r.getHookOpts())},position:$y(r,e,n)}}function Yx(r,e,n){qy(r.getState("popover")),cR(e,xR(r,e,n))}function yR(r,e,n){let a=r.getState("popover");a&&ng(a,e,$y(r,e,n))}function SR(){let r=document.getElementById("driver-dummy-element");if(r)return r;let e=document.createElement("div");return e.id="driver-dummy-element",e.style.width="0",e.style.height="0",e.style.pointerEvents="none",e.style.opacity="0",e.style.position="fixed",e.style.top="50%",e.style.left="50%",document.body.appendChild(e),e}function jx(r,e){let n=eh(e.element);n||(n=SR()),bR(r,n,e)}function MR(r){let e=r.getState("__activeElement"),n=r.getState("__activeStep");e&&(Yy(r,e),dR(r),yR(r,e,n))}function bR(r,e,n){let a=r.getConfig("duration")||400,o=Date.now(),c=r.getState("__activeStep"),u=r.getState("__activeElement")||e,p=!u||u===e,m=e.id==="driver-dummy-element",d=u.id==="driver-dummy-element",v=r.getConfig("animate"),_=n.onHighlightStarted||r.getConfig("onHighlightStarted"),g=(n==null?void 0:n.onHighlighted)||r.getConfig("onHighlighted"),M=(c==null?void 0:c.onDeselected)||r.getConfig("onDeselected"),E=r.getHookOpts();!p&&M&&M(d?void 0:u,c,E),_&&_(m?void 0:e,n,E);let C=!p&&v,y=!1;lR(r.getState("popover")),r.setState("previousStep",c),r.setState("previousElement",u),r.setState("activeStep",n),r.setState("activeElement",e);let x=()=>{if(r.getState("__transitionCallback")!==x)return;let N=Date.now()-o,R=a-N<=a/2;n.popover&&R&&!y&&C&&(Yx(r,e,n),y=!0),r.getConfig("animate")&&N<a?hR(r,N,a,u,e):(Yy(r,e),g&&g(m?void 0:e,n,r.getHookOpts()),r.setState("__transitionCallback",void 0),r.setState("__previousStep",c),r.setState("__previousElement",u),r.setState("__activeStep",n),r.setState("__activeElement",e)),window.requestAnimationFrame(x)};r.setState("__transitionCallback",x),window.requestAnimationFrame(x),Xy(e,r.getConfig("smoothScroll")),!C&&n.popover&&Yx(r,e,n),document.querySelectorAll(".driver-active-element-parent").forEach(N=>{N.classList.remove("driver-active-element-parent","driver-active-element-parent-no-scroll")}),u.classList.remove("driver-active-element","driver-no-interaction"),u.removeAttribute("aria-haspopup"),u.removeAttribute("aria-expanded"),u.removeAttribute("aria-controls"),(n.disableActiveInteraction??r.getConfig("disableActiveInteraction"))&&e.classList.add("driver-no-interaction");let O=e.parentElement;O&&O!==document.body&&(O.classList.add("driver-active-element-parent"),aR(O)&&O.classList.add("driver-active-element-parent-no-scroll")),e.classList.add("driver-active-element"),e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","true"),e.setAttribute("aria-controls","driver-popover-content")}function ER(){var r;(r=document.getElementById("driver-dummy-element"))==null||r.remove(),document.querySelectorAll(".driver-active-element").forEach(e=>{let n=e.parentElement;n&&n!==document.body&&n.classList.remove("driver-active-element-parent","driver-active-element-parent-no-scroll"),e.classList.remove("driver-active-element","driver-no-interaction"),e.removeAttribute("aria-haspopup"),e.removeAttribute("aria-expanded"),e.removeAttribute("aria-controls")})}function Hm(r){let e=r.getState("__resizeTimeout");e&&window.cancelAnimationFrame(e),r.setState("__resizeTimeout",window.requestAnimationFrame(()=>MR(r)))}function TR(r,e){var p,m,d;if(!r.getState("isInitialized")||!(e.key==="Tab"||e.keyCode===9))return;let n=r.getState("__activeElement"),a=(p=r.getState("popover"))==null?void 0:p.wrapper,o=Vy([...a?[a]:[],...n?[n]:[]]),c=o[0],u=o[o.length-1];e.preventDefault(),e.shiftKey?(m=o[o.indexOf(document.activeElement)-1]||u)==null||m.focus():(d=o[o.indexOf(document.activeElement)+1]||c)==null||d.focus()}function AR(r,e){(r.getConfig("allowKeyboardControl")??!0)&&(e.key==="Escape"?r.emit("escapePress"):e.key==="ArrowRight"?r.emit("arrowRightPress"):e.key==="ArrowLeft"&&r.emit("arrowLeftPress"))}function wR(r,e){let n=r.getState("__activeElement"),a=e.target;!n||!a||!n.contains(a)||r.emit("activeElementClick")}function RR(r){let e=u=>AR(r,u),n=u=>TR(r,u),a=()=>Hm(r),o=()=>Hm(r),c=u=>wR(r,u);r.setState("__events",{onKeyup:e,onKeydown:n,onResize:a,onScroll:o,onClick:c}),window.addEventListener("keyup",e,!1),window.addEventListener("keydown",n,!1),window.addEventListener("resize",a),window.addEventListener("scroll",o),document.addEventListener("click",c,!1)}function CR(r){let e=r.getState("__events");e&&(window.removeEventListener("keyup",e.onKeyup),window.removeEventListener("keydown",e.onKeydown),window.removeEventListener("resize",e.onResize),window.removeEventListener("scroll",e.onScroll),document.removeEventListener("click",e.onClick,!1))}function DR(){let r={};function e(n={}){r={animate:!0,duration:400,allowClose:!0,allowScroll:!0,overlayClickBehavior:"close",overlayOpacity:.7,smoothScroll:!1,disableActiveInteraction:!1,advanceOnClick:!1,skipMissingElement:!1,waitForElement:0,showProgress:!1,stagePadding:10,stageRadius:5,popoverOffset:10,showButtons:["next","previous","close"],disableButtons:[],overlayColor:"#000",...n}}return e(),{getConfig:(n=>n?r[n]:r),configure:e}}function NR(){let r={},e=(o=>o?r[o]:r),n=(o,c)=>{r[o]=c};function a(){r={}}return{getState:e,setState:n,resetState:a}}function LR(){let r={};function e(o,c){r[o]=c}function n(o){var c;(c=r[o])==null||c.call(r)}function a(){r={}}return{listen:e,emit:n,reset:a}}function UR(r={}){let e=DR();e.configure(r);let n=NR(),a=LR(),o;return{getConfig:e.getConfig,setConfig:e.configure,getState:n.getState,setState:n.setState,resetState:n.resetState,listen:a.listen,emit:a.emit,resetEmitter:a.reset,getDriver:()=>o,setDriver:c=>{o=c},getHookOpts:c=>{let u=c||n.getState();return{config:e.getConfig(),state:u,driver:o,index:u.activeIndex}}}}function OR(r={}){let e=UR(r);function n(){e.getConfig("allowClose")&&E()}function a(){let y=e.getConfig("overlayClickBehavior");if(e.getConfig("allowClose")&&y==="close"){E();return}if(typeof y=="function"){let x=e.getState("__activeStep");y(e.getState("__activeElement"),x,e.getHookOpts());return}if(y==="nextStep"){let x=e.getState("activeStep"),O=e.getState("activeElement"),N=kf(e,x);if(N){N(O,x,e.getHookOpts());return}o()}}function o(){let y=e.getState("activeIndex"),x=e.getConfig("steps")||[];if(y===void 0)return;let O=y+1;x[O]?M(O):E()}function c(){let y=e.getState("activeIndex"),x=e.getConfig("steps")||[];if(y===void 0)return;let O=y-1;x[O]?M(O):E()}function u(y){(e.getConfig("steps")||[])[y]?M(y):E()}function p(){if(e.getState("__transitionCallback"))return;let y=e.getState("__activeStep");if(!y||!(y.advanceOnClick??e.getConfig("advanceOnClick")))return;let x=e.getState("__activeElement"),O=kf(e,y);if(O){O(x,y,e.getHookOpts());return}o()}function m(){if(e.getState("__transitionCallback"))return;let y=e.getState("activeIndex"),x=e.getState("__activeStep"),O=e.getState("__activeElement");if(y===void 0||x===void 0||!(e.getConfig("steps")||[])[y-1])return;let N=Jy(e,x);if(N)return N(O,x,e.getHookOpts());c()}function d(){if(e.getState("__transitionCallback"))return;let y=e.getState("activeIndex"),x=e.getState("__activeStep"),O=e.getState("__activeElement");if(y===void 0||x===void 0)return;let N=kf(e,x);if(N)return N(O,x,e.getHookOpts());o()}function v(){e.getState("isInitialized")||(e.setState("isInitialized",!0),document.body.classList.add("driver-active",e.getConfig("animate")?"driver-fade":"driver-simple"),e.getConfig("allowScroll")||document.body.classList.add("driver-no-scroll"),document.body.style.setProperty("--driver-animation-duration",`${e.getConfig("duration")||400}ms`),RR(e),e.listen("overlayClick",a),e.listen("activeElementClick",p),e.listen("escapePress",n),e.listen("closeClick",n),e.listen("arrowLeftPress",m),e.listen("arrowRightPress",d))}function _(){let y=e.getState("__pendingWaitCancel");y&&(e.setState("__pendingWaitCancel",void 0),y())}function g(y,x,O){let N=()=>{R.disconnect(),window.clearTimeout(I),e.setState("__pendingWaitCancel",void 0),O()},R=new MutationObserver(()=>{eh(y.element)&&N()}),I=window.setTimeout(N,x);e.setState("__pendingWaitCancel",()=>{R.disconnect(),window.clearTimeout(I)}),R.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0})}function M(y=0,x=!1){_();let O=e.getConfig("steps");if(!O){console.error("No steps to drive through"),E();return}if(!O[y]){E();return}let N=O[y],R=N.waitForElement??e.getConfig("waitForElement")??0;if(!x&&R>0&&N.element&&!eh(N.element)){g(N,R,()=>M(y,!0));return}if(Qy(e,N)){let L=e.getState("activeIndex"),z=typeof L=="number"&&y<L?-1:1;O[y+z]?M(y+z):z===1&&E();return}e.setState("__activeOnDestroyed",document.activeElement),e.setState("activeIndex",y);let I=O[y+1];jx(e,_R(e,y,{onNextClick:()=>{I?M(y+1):E()},onPrevClick:()=>{M(y-1)},onCloseClick:()=>{E()}}))}function E(y=!0){let x=e.getState("__activeElement"),O=e.getState("__activeStep"),N=e.getState("__activeOnDestroyed"),R=e.getConfig("onDestroyStarted");if(y&&R){R(!x||(x==null?void 0:x.id)==="driver-dummy-element"?void 0:x,O,e.getHookOpts());return}let I=(O==null?void 0:O.onDeselected)||e.getConfig("onDeselected"),L=e.getConfig("onDestroyed");document.body.classList.remove("driver-active","driver-fade","driver-simple","driver-no-scroll"),document.body.style.removeProperty("--driver-animation-duration"),_(),CR(e),qy(e.getState("popover")),ER(),gR(e),e.resetEmitter();let z=e.getState();if(e.resetState(),x&&O){let T=x.id==="driver-dummy-element";I&&I(T?void 0:x,O,e.getHookOpts(z)),L&&L(T?void 0:x,O,e.getHookOpts(z))}N&&N.focus()}let C={isActive:()=>e.getState("isInitialized")||!1,refresh:()=>Hm(e),drive:(y=0)=>{v(),M(y)},setConfig:e.setConfig,setSteps:y=>{_(),e.resetState(),e.setConfig({...e.getConfig(),steps:y})},getConfig:e.getConfig,getState:e.getState,getActiveIndex:()=>e.getState("activeIndex"),isFirstStep:()=>{let y=e.getState("activeIndex");return y!==void 0&&ws(e,y-1,-1)===void 0},isLastStep:()=>{let y=e.getState("activeIndex");return y!==void 0&&ws(e,y+1,1)===void 0},getActiveStep:()=>e.getState("activeStep"),getActiveElement:()=>e.getState("activeElement"),getPreviousElement:()=>e.getState("previousElement"),getPreviousStep:()=>e.getState("previousStep"),getNextStep:()=>{let y=e.getConfig("steps")||[],x=e.getState("activeIndex");if(x===void 0)return;let O=ws(e,x+1,1);return O===void 0?void 0:y[O]},moveNext:o,movePrevious:c,moveTo:u,hasNextStep:()=>{let y=e.getState("activeIndex");return y!==void 0&&ws(e,y+1,1)!==void 0},hasPreviousStep:()=>{let y=e.getState("activeIndex");return y!==void 0&&ws(e,y-1,-1)!==void 0},highlight:y=>{v(),jx(e,{...y,popover:y.popover?{showButtons:[],showProgress:!1,progressText:"",...y.popover}:void 0})},destroy:()=>{E(!1)}};return e.setDriver(C),C}const eS="scope-onboard-v1";function PR(){try{return!localStorage.getItem(eS)}catch{return!1}}const FR=[{head:"the star",keys:[["pull outward","boost that band"],["push through the core","kill it"],["drag across","filter sweep"],["pull far out, hold","echo"],["drag the axis (or d)","dissect"]]},{head:"the stack, open",keys:[["drag a ring","level"],["tap a ring","solo"],["push to the axis","mute"],["pull the axis down (or d)","close"]]},{head:"keys",keys:[["space","pause"],["n","skip"],["left / right","seek"],["up / down","volume"],["[ ]","filter"],["e","echo up"],["shift+e","echo down"],["\\","flat"],["1 / 2 / 3","visual preset"],["r / shift+f / shift+m","source"],["+ / - / 0","zoom"],["shift+h","hide the chrome"]]}];function BR(){const r=e=>e.replace(/[&<>]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[n]);return FR.map(e=>`<div class="tour-leg"><b>${r(e.head)}</b>${e.keys.map(([n,a])=>`<span class="tour-key"><kbd>${r(n)}</kbd><i>${r(a)}</i></span>`).join("")}</div>`).join("")}const zR=[{title:"grab the star",body:"the star is the mixer. pull outward to boost, push through the core to kill. drag across for the filter. pull far out and hold for echo. let go: everything springs back.",anchor:".cn-stage",stack:"closed"},{title:"pull it apart",body:"drag the seam upward (or press D) and the star splits into rings, one per layer of the sound. drag a ring for level, tap to solo, push it to the axis to mute.",anchor:".cn-stage",stack:"open"},{title:"every ring, a visible fader",body:"the layers rows are the same rings: live meter, level slider, solo, mute. hover a row and its ring burns brighter.",anchor:".layers",stack:"open"},{title:"set your vibe",body:"type a feeling: late night drive, gym rage, rainy study. the instrument reads it into moods and tempo and plays real music from audius to match. artist names work too.",anchor:".tuner",stack:"closed"},{title:"split any track",body:"press split into stems and the playing track separates into vocals, drums, bass and other, in your browser. nothing uploaded. each part gets its own ring.",anchor:".deck-split",stack:"closed"},{title:"the full legend",body:BR(),stack:"closed",html:!0}];function IR(){const r=document.querySelector(".driver-popover"),e=document.querySelector(".cn-plate"),n=document.querySelector(".cn-ftr");if(!r||!e)return;const a=r.getBoundingClientRect(),o=(n??e).getBoundingClientRect()[n?"top":"bottom"]-8,c=e.getBoundingClientRect().top+8;if(a.bottom<=o&&a.top>=c)return;const u=Math.max(c,Math.min(a.top,o-a.height));r.style.bottom="auto",r.style.top=`${Math.round(u)}px`}function HR(){let r=!1;const e=()=>{r||(r=!0,requestAnimationFrame(()=>{r=!1,IR()}))};let n=null,a=null;const o=()=>{const u=document.querySelector(".driver-popover");!u||u===n||(n=u,a==null||a.disconnect(),a=new MutationObserver(e),a.observe(u,{attributes:!0,attributeFilter:["style","class"]}),e())},c=new MutationObserver(o);return c.observe(document.body,{childList:!0}),o(),window.addEventListener("resize",e),()=>{c.disconnect(),a==null||a.disconnect(),window.removeEventListener("resize",e)}}function GR({ops:r,onDone:e}){return Pe.useEffect(()=>{const n=document.activeElement,a=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let o=!1;const c=zR.map(v=>({element:v.anchor,waitForElement:v.anchor?1200:0,onHighlightStarted:()=>{r&&(v.stack==="open"?r.openStack():r.closeStack())},onHighlighted:()=>{setTimeout(()=>u.refresh(),a?0:320),requestAnimationFrame(()=>{var E;const _=document.querySelector(".driver-popover.plate-tour"),g=_==null?void 0:_.querySelector(".driver-popover-next-btn"),M=document.activeElement;g&&(!M||M===document.body||(E=M.classList)!=null&&E.contains("driver-popover-close-btn"))&&g.focus()})},popover:{title:v.title,description:v.body,popoverClass:v.html?"plate-tour plate-tour-legend":"plate-tour"}})),u=OR({steps:c,stageRadius:0,stagePadding:8,overlayColor:"#0a0a0a",overlayOpacity:.78,animate:!a,duration:a?0:240,smoothScroll:!a,allowClose:!0,showProgress:!0,progressText:"{{current}}/{{total}}",nextBtnText:"next",prevBtnText:"back",doneBtnText:"play",showButtons:["next","previous","close"],popoverClass:"plate-tour",disableActiveInteraction:!1,onDestroyStarted:()=>{u.hasNextStep()||(o=!0),u.destroy()},onDestroyed:()=>{var v;if(o)try{localStorage.setItem(eS,"1")}catch{}r==null||r.closeStack(),e(),(v=n==null?void 0:n.focus)==null||v.call(n)}});u.drive();const p=HR();let m=!1;const d=()=>{m||(m=!0,requestAnimationFrame(()=>{m=!1,u.isActive()&&u.refresh()}))};return document.addEventListener("scroll",d,{capture:!0,passive:!0}),()=>{p(),document.removeEventListener("scroll",d,{capture:!0}),u.isActive()&&u.destroy()}},[]),null}function kp(r,e){const n=r.trim();if(n.length<=e)return n;const a=n.slice(0,e-1),o=a.lastIndexOf(" ");return(o>(e-1)*.6?a.slice(0,o):a).replace(/[\s,.;:·/-]+$/,"")+"…"}const tS=[{id:"xZDDOwGqLFY",title:"best of t-series mixtape",channel:"t-series"},{id:"sqfHiNiRmug",title:"bollywood soulful hits",channel:"t-series"},{id:"ND4V-wgtGZ8",title:"best hindi songs 2022",channel:"saregama"},{id:"0XTJdt90Yf0",title:"top hits of arijit & shreya",channel:"saregama"},{id:"N0jnLZxYwYc",title:"mujhse mohabbat ka izhaar",channel:"shemaroo"},{id:"sivn5BX3Lic",title:"uff",channel:"t-series"}];function kR(r){const e=r.trim();if(/^[A-Za-z0-9_-]{11}$/.test(e))return e;const n=e.match(/[?&]v=([A-Za-z0-9_-]{11})/)||e.match(/youtu\.be\/([A-Za-z0-9_-]{11})/)||e.match(/\/(?:embed|shorts|live)\/([A-Za-z0-9_-]{11})/);return n?n[1]:null}async function VR(r,e){const n=r.trim();if(!n)return[];const a=`/SCOPE/api/yt-search?q=${encodeURIComponent(n)}`;let o;try{o=await fetch(a,{signal:e??AbortSignal.timeout(12e3)})}catch{throw new Error("search could not be reached")}if(!o.ok){const u=await o.json().catch(()=>null);throw new Error((u==null?void 0:u.error)??(o.status===404?"search is not deployed":`search failed (${o.status})`))}return((await o.json()).items??[]).filter(u=>/^[A-Za-z0-9_-]{11}$/.test(u.id))}let wf=null;function XR(){return wf||(wf=new Promise(r=>{var a;if((a=window.YT)!=null&&a.Player)return r();const e=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{e==null||e(),r()};const n=document.createElement("script");n.src="https://www.youtube.com/iframe_api",document.head.appendChild(n)}),wf)}class qR{constructor(){ie(this,"player",null);ie(this,"lastError",null);ie(this,"index",0);ie(this,"list",tS);ie(this,"onError",null)}async mount(e,n){var o,c;if(await XR(),!((o=window.YT)!=null&&o.Player))return;(c=this.player)==null||c.destroy(),this.lastError=null,e.textContent="";const a=document.createElement("div");e.appendChild(a),this.player=new window.YT.Player(a,{videoId:n??this.list[0].id,playerVars:{rel:0,playsinline:1,modestbranding:1,controls:0,disablekb:1},events:{onError:u=>{var p;this.lastError=u.data,(p=this.onError)==null||p.call(this,u.data)}}})}load(e){var n;this.lastError=null,(n=this.player)==null||n.loadVideoById(e)}play(){var e;(e=this.player)==null||e.playVideo()}pause(){var e;(e=this.player)==null||e.pauseVideo()}mute(){var e;(e=this.player)==null||e.mute()}unMute(){var e;(e=this.player)==null||e.unMute()}isMuted(){var e;try{return!!((e=this.player)!=null&&e.isMuted())}catch{return!1}}setVolume(e){var n;try{(n=this.player)==null||n.setVolume(Math.round(e*100))}catch{}}next(){this.list.length&&(this.index=(this.index+1)%this.list.length,this.load(this.list[this.index].id))}read(){const e=this.player;if(!(e!=null&&e.getPlayerState))return{title:null,channel:null,videoId:null,elapsed:0,duration:0,playing:!1,error:this.lastError};let n={};try{n=e.getVideoData()??{}}catch{}const a=o=>{try{const c=o();return Number.isFinite(c)?c:0}catch{return 0}};return{title:n.title||null,channel:n.author||null,videoId:n.video_id||null,elapsed:a(()=>e.getCurrentTime()),duration:a(()=>e.getDuration()),playing:a(()=>e.getPlayerState())===1,error:this.lastError}}dispose(){var e;(e=this.player)==null||e.destroy(),this.player=null}}const Vp="https://huggingface.co/Politrees/UVR_resources/resolve/main/models/MDXNet/UVR-MDX-NET-Voc_FT.onnx";let Rf=null;async function WR(r){if(Rf)return Rf;try{const e=await caches.open("scope-ml-v1"),n=await e.match(Vp);if(n)return Rf=await n.arrayBuffer();const a=await fetch(Vp);if(!a.ok||!a.body)return null;const o=Number(a.headers.get("content-length"))||66762490,c=a.body.getReader(),u=[];let p=0;for(;;){const{done:v,value:_}=await c.read();if(v)break;u.push(_),p+=_.length,r({stage:"model",pct:p/o*100})}const m=new Uint8Array(p);let d=0;for(const v of u)m.set(v,d),d+=v.length;return await e.put(Vp,new Response(m.slice().buffer,{headers:{"content-type":"application/octet-stream"}})).catch(()=>{}),Rf=m.buffer}catch{return null}}let YR=null;function jR(){return YR??(YR=new Worker(new URL("/SCOPE/assets/split.worker-Dd7nUwMI.js",import.meta.url),{type:"module"}))}async function ZR(r,e,n){n({stage:"fetch",pct:0});const[a,o]=await Promise.all([fetch(r),WR(n)]);if(!a.ok)throw new Error(`fetch ${a.status}`);const c=await a.arrayBuffer();n({stage:"decode",pct:0});const p=await new OfflineAudioContext(2,2,44100).decodeAudioData(c),m=p.getChannelData(0),d=p.numberOfChannels>1?p.getChannelData(1):p.getChannelData(0),v=new Float32Array(m),_=new Float32Array(d);return new Promise((g,M)=>{const E=jR(),C=y=>{const x=y.data;if((x==null?void 0:x.kind)==="progress")n({stage:x.stage,pct:x.pct});else if((x==null?void 0:x.kind)==="done"){E.removeEventListener("message",C);const O=x.order,N=x.channels,R=O.map((I,L)=>{const z=e.createBuffer(2,p.length,44100);return z.copyToChannel(N[L*2],0),z.copyToChannel(N[L*2+1],1),{role:I,buffer:z}});g(R)}};E.addEventListener("message",C),E.addEventListener("error",y=>M(new Error(y.message)),{once:!0}),E.postMessage({kind:"split",ch0:v,ch1:_,sampleRate:44100,model:o},[v.buffer,_.buffer])})}const Zx=.065,KR=.85,QR=.002,JR=3,$R=90,e3=8e-4,Cf=48,t3=12,n3=.9,i3=1.12,a3=2.6,s3=300,r3=60,o3=.35,l3=2.2,c3=.06,u3=.109,f3=.04,h3=1,d3=.45,p3=3,m3=4,g3=.85,v3=.17,_3=.13,x3=.6,y3=.3,S3=.25,M3=1.2,b3=12,Df=.04;class Xp{constructor(e){ie(this,"buf");ie(this,"head",0);ie(this,"n",0);ie(this,"sum",0);ie(this,"sumSq",0);this.cap=e,this.buf=new Float64Array(e)}push(e){if(this.n===this.cap){const n=this.buf[this.head];this.sum-=n,this.sumSq-=n*n}else this.n++;this.buf[this.head]=e,this.sum+=e,this.sumSq+=e*e,this.head=(this.head+1)%this.cap}at(e){if(this.n===0)return 0;const n=Math.min(e,this.n-1);return this.buf[(this.head-1-n+this.cap*2)%this.cap]}get count(){return this.n}get full(){return this.n===this.cap}clear(){this.head=0,this.n=0,this.sum=0,this.sumSq=0}}class E3{constructor(){ie(this,"fluxRing",new Xp($R));ie(this,"rmsLong",new Xp(s3));ie(this,"rmsGuard",new Xp(r3));ie(this,"onsetZ",new Float64Array(Cf));ie(this,"sortBuf",new Float64Array(Cf));ie(this,"onsetHead",0);ie(this,"onsetN",0);ie(this,"p90",0);ie(this,"live",!1);ie(this,"armed",!1);ie(this,"sustain",0);ie(this,"lastDrop",-1/0);ie(this,"elapsed",0);ie(this,"seeded",!1);ie(this,"trackMean",0);ie(this,"trackDev",Df);ie(this,"value",{tier:0,drop:0,strong:0,beat:0,calm:1,ready:!1})}update(e,n,a){const o=this.value;this.seeded||(this.trackMean=e.rms,this.trackDev=Df,this.seeded=!0),this.elapsed+=a,o.drop*=Math.exp(-a/g3),o.strong*=Math.exp(-a/v3),o.beat*=Math.exp(-a/_3),this.live=e.rms>=(this.live?Zx*KR:Zx);const c=this.live;o.ready=this.elapsed>=JR&&this.fluxRing.full;const u=this.fluxRing.count,p=u>0?this.fluxRing.sum/u:0,m=Kx(this.fluxRing.sum,this.fluxRing.sumSq,u),d=(e.flux-p)/(m+e3);if(this.fluxRing.push(e.flux),e.onset&&c&&e.flux>=QR){this.onsetZ[this.onsetHead]=d,this.onsetHead=(this.onsetHead+1)%Cf,this.onsetN<Cf&&this.onsetN++,this.p90=this.percentile(n3);const z=Math.max(this.p90*i3,a3),T=Gm(.45+.55*(d-1.6)/Math.max(1,z-1.6));if(T>o.beat&&(o.beat=T),o.ready&&this.onsetN>=t3&&d>z){const B=Gm(.7+.3*(d/z-1));B>o.strong&&(o.strong=B)}}this.rmsLong.push(e.rms),this.rmsGuard.push(e.rms);const _=this.rmsLong.count-this.rmsGuard.count,g=this.rmsLong.sum-this.rmsGuard.sum,M=this.rmsLong.sumSq-this.rmsGuard.sumSq,E=_>0?g/_:0,C=Kx(g,M,_),y=E+Math.max(c3,l3*C),x=this.rmsLong.full&&e.rms>=u3&&e.rms>y;if(!(o.ready&&n-this.lastDrop>m3))this.armed=!1,this.sustain=0;else if(this.armed)x?(this.sustain+=a,this.sustain>=d3&&(o.drop=1,this.lastDrop=n,this.armed=!1,this.sustain=0)):(this.sustain-=a*p3,this.sustain<=0&&(this.armed=!1,this.sustain=0));else{const z=Math.max(1,Math.round(o3/Math.max(a,1e-4))),T=e.rms-this.rmsLong.at(z);x&&T>=Math.max(f3,h3*C)&&(this.armed=!0,this.sustain=0)}const N=1-Math.exp(-a/b3);this.trackMean+=(e.rms-this.trackMean)*N,this.trackDev+=(Math.abs(e.rms-this.trackMean)-this.trackDev)*N;const R=Math.max(Df,this.trackDev*1.5),I=c?1-T3(this.trackMean-R,this.trackMean+R,e.rms):1;o.calm+=(I-o.calm)*(1-Math.exp(-a/x3));let L=0;return o.ready&&c&&(o.drop>=y3?L=3:o.strong>=S3?L=2:(e.sinceOnset<M3||o.beat>=.05)&&(L=1)),o.tier=L,o}reset(){this.fluxRing.clear(),this.rmsLong.clear(),this.rmsGuard.clear(),this.onsetHead=0,this.onsetN=0,this.p90=0,this.live=!1,this.armed=!1,this.sustain=0,this.lastDrop=-1/0,this.elapsed=0,this.seeded=!1,this.trackMean=0,this.trackDev=Df;const e=this.value;e.tier=0,e.drop=0,e.strong=0,e.beat=0,e.calm=1,e.ready=!1}percentile(e){const n=this.onsetN,a=this.sortBuf;for(let o=0;o<n;o++)a[o]=this.onsetZ[o];for(let o=1;o<n;o++){const c=a[o];let u=o-1;for(;u>=0&&a[u]>c;)a[u+1]=a[u],u--;a[u+1]=c}return a[Math.min(n-1,Math.floor(e*(n-1)))]}}function Kx(r,e,n){if(n<2)return 0;const a=r/n;return Math.sqrt(Math.max(0,e/n-a*a))}function Gm(r){return r<0?0:r>1?1:r}function T3(r,e,n){if(e<=r)return n>=e?1:0;const a=Gm((n-r)/(e-r));return a*a*(3-2*a)}const A3={radio:"[01]",file:"[02]",mic:"[03]",stems:"[04]",tube:"[05]"},sl=r=>!isFinite(r)||r<0?"0:00":`${Math.floor(r/60)}:${String(Math.floor(r%60)).padStart(2,"0")}`;function w3(){const r=Pe.useRef(null),e=Pe.useRef(null),n=Pe.useRef(null),a=Pe.useRef(null),o=Pe.useRef(null),c=Pe.useRef(null),u=Pe.useRef([]),p=Pe.useRef(null),m=Pe.useRef(null),[d,v]=Pe.useState(!1),[_,g]=Pe.useState(!1),[M,E]=Pe.useState(!1),C=Pe.useRef(0),y=Pe.useRef(!1),[x,O]=Pe.useState(null),[N,R]=Pe.useState("radio"),[I,L]=Pe.useState(!1),[z,T]=Pe.useState(null),[B,Z]=Pe.useState(!1),[G,Y]=Pe.useState(!1),[de,xe]=Pe.useState(.8),[ae,H]=Pe.useState(!1),[k,te]=Pe.useState(!1),[_e,Ae]=Pe.useState({turb:1,expo:1,spin:1}),[P,Q]=Pe.useState(null),Ce=Pe.useRef(null),Ie=Pe.useRef(null),je=Pe.useRef(null),re=Pe.useRef(null),Se=Pe.useRef(null),Re=Pe.useRef(null),[nt,vt]=Pe.useState(null),[Ze,yn]=Pe.useState(null),[Ot,Vt]=Pe.useState(!1),[Xt,It]=Pe.useState(!1),[Dn,Nn]=Pe.useState(null),[Ln,Hn]=Pe.useState("idle"),[dn,Un]=Pe.useState(""),[j,nn]=Pe.useState(null),[an,U]=Pe.useState(!1),b=Pe.useRef(0),$=Pe.useRef(!1),[he,ve]=Pe.useState(null),Oe=Pe.useRef(null),Ge=Pe.useRef(0),[me,ye]=Pe.useState(1),[He,$e]=Pe.useState(!1),[qe,ke]=Pe.useState(""),[ht,pt]=Pe.useState(null),[_t,q]=Pe.useState("idle"),[ze,Me]=Pe.useState(!1),[Fe,We]=Pe.useState(null),we=Pe.useRef(0),De=Pe.useRef(null),[Qe,Sn]=Pe.useState(null),on=Pe.useRef(null),xi=Pe.useRef(null),yi=Pe.useRef(null),Ds=Pe.useRef(null),Yi=Pe.useRef(null),br=Pe.useRef(_e),Ta=Pe.useRef(null),[oa,Vn]=Pe.useState(0),[ni,Si]=Pe.useState("0:00"),Aa=Pe.useRef(null),Ja=Pe.useRef(null),$a=Pe.useRef(null),la=Pe.useRef(null),ji=Pe.useRef(null),ca=Pe.useRef(null),An=Pe.useRef(null),Bn=Pe.useRef(null),za=Pe.useRef(null),Ht=Pe.useRef(null),Tt=Pe.useRef(!1),ii=Pe.useRef(null),A=Pe.useRef(null),W=Pe.useRef(null),ce=Pe.useRef(0);Pe.useEffect(()=>{var F;br.current=_e,(F=Bn.current)==null||F.setTuning(_e.turb,_e.expo,_e.spin)},[_e]),Pe.useEffect(()=>{N!=="tube"||!Re.current||!Se.current||Se.current.mount(Re.current)},[N]),Pe.useEffect(()=>{var Gn;const F=je.current;if(!d||!F)return;const ne=F.parentElement;if(!ne)return;let Ne=0;const K=()=>{const kt=F.scrollHeight-F.scrollTop-F.clientHeight>1;ne.classList.toggle("more",kt);const bn=re.current;if(!bn)return;const Kn=F.scrollHeight-F.clientHeight;if(Kn<=1){bn.classList.remove("on");return}const Ns=Math.max(24,F.clientHeight*(F.clientHeight/F.scrollHeight)),ci=F.scrollTop/Kn*(F.clientHeight-Ns);bn.style.setProperty("--bar-track",`${F.clientHeight}px`),bn.style.setProperty("--bar-h",`${Ns.toFixed(1)}px`),bn.style.setProperty("--bar-y",`${ci.toFixed(1)}px`)},dt=()=>{const kt=re.current;!kt||F.scrollHeight-F.clientHeight<=1||(kt.classList.add("on"),clearTimeout(Ne),!et&&(Ne=window.setTimeout(()=>kt.classList.remove("on"),850)))};let et=null;const Je=(Gn=re.current)==null?void 0:Gn.firstElementChild,un=()=>Math.max(24,F.clientHeight*(F.clientHeight/F.scrollHeight)),Gt=kt=>{if(et)return;const bn=ne.getBoundingClientRect();kt.clientX>=bn.right-18&&kt.clientY>=bn.top&&kt.clientY<=bn.bottom&&dt()},bt=kt=>{var bn;F.scrollHeight-F.clientHeight<=1||(kt.preventDefault(),kt.stopPropagation(),Je==null||Je.setPointerCapture(kt.pointerId),et={y:kt.clientY,top:F.scrollTop},(bn=re.current)==null||bn.classList.add("on","drag"),clearTimeout(Ne))},Lt=kt=>{if(!et)return;kt.preventDefault();const bn=F.scrollHeight-F.clientHeight,Kn=Math.max(1,F.clientHeight-un());F.scrollTop=et.top+(kt.clientY-et.y)/Kn*bn},Ft=kt=>{var bn,Kn;et&&(et=null,(bn=Je==null?void 0:Je.releasePointerCapture)==null||bn.call(Je,kt.pointerId),(Kn=re.current)==null||Kn.classList.remove("drag"),dt())};Je==null||Je.addEventListener("pointerdown",bt),Je==null||Je.addEventListener("pointermove",Lt),Je==null||Je.addEventListener("pointerup",Ft),Je==null||Je.addEventListener("pointercancel",Ft),ne.addEventListener("pointermove",Gt),K(),F.addEventListener("scroll",K,{passive:!0}),F.addEventListener("scroll",dt,{passive:!0});const Mn=new ResizeObserver(K);Mn.observe(F);const it=new MutationObserver(K);return it.observe(F,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]}),()=>{F.removeEventListener("scroll",K),F.removeEventListener("scroll",dt),Je==null||Je.removeEventListener("pointerdown",bt),Je==null||Je.removeEventListener("pointermove",Lt),Je==null||Je.removeEventListener("pointerup",Ft),Je==null||Je.removeEventListener("pointercancel",Ft),ne.removeEventListener("pointermove",Gt),clearTimeout(Ne),Mn.disconnect(),it.disconnect(),ne.classList.remove("more")}},[d]),Pe.useEffect(()=>{if(!he)return;const F=()=>At();return window.addEventListener("pointerdown",F),window.addEventListener("keydown",F),()=>{window.removeEventListener("pointerdown",F),window.removeEventListener("keydown",F)}},[he]),Pe.useEffect(()=>{if(d)return;const F=new Float32Array(240);let ne=0,Ne=0;const K=()=>{var un,Gt;const et=Bn.current;F[ne%F.length]=et?et.readMotion():0,ne++,F3(Ce.current,F,ne);const Je=Ie.current;if(Je){const bt=(Gt=(un=Ht.current)==null?void 0:un.analyser)==null?void 0:Gt.features,Lt=bt&&bt.rms>.014;Je.textContent=Lt?`${P3(20*Math.pow(1e3,bt.centroid))}`:"idle"}Ne=requestAnimationFrame(K)},dt=()=>{var et;y.current||(et=window.__focus)==null||et.call(window,!0)};return dt(),Ne=requestAnimationFrame(K),window.addEventListener("resize",dt),()=>{cancelAnimationFrame(Ne),window.removeEventListener("resize",dt)}},[d]),Pe.useEffect(()=>{const F=Ht.current;F&&(F.el.volume=de)},[de]),Pe.useEffect(()=>{const F=Ht.current;F&&(F.rate=me)},[me]),Pe.useEffect(()=>{const F=r.current;if(!F)return;const ne=new IM;Ht.current=ne,ne.setPlaylist(X2);let Ne=0;K2(null).then(se=>{se.length>=8&&Ne<1&&ne.kind==="radio"&&!Tt.current&&(Ne=1,ne.setPlaylist(se))}),ne.onTrackChange=se=>{var Ue;if(dt.reset(),ne.kind!=="stems"&&((Ue=De.current)!=null&&Ue.playing)&&(De.current.pause(),De.current.solo(null),K.setVocal(0),es()),O(se),za.current=se,R(ne.kind),Tt.current&&se&&T({text:se.title,key:Date.now()}),ne.kind==="file")return;const Be=++ce.current;W.current=null,ne.kind==="radio"&&(se!=null&&se.src)&&q2(se.src).then(Le=>{ce.current===Be&&(W.current=Le)})};const K=new H2(F);Bn.current=K;const dt=new E3;K.dropCssEl=ii.current;const et=new kM,Je=new WM;let un=0,Gt=0,bt=0;const Lt=320,Ft=(se=!1)=>{var tt;let Ue=Tt.current&&Gt>720?(Lt+(Gt-Lt)/2)/Gt:.5,Le=.5,Xe=1;if(!Tt.current){const Nt=document.querySelector(".pl-fig");if(Nt&&bt>0){const ft=Nt.getBoundingClientRect();ft.height>40&&(Ue=(ft.left+ft.width/2)/Gt,Le=(ft.top+ft.height/2)/bt,Xe=Math.max(1,bt/ft.height*.92))}}K.setFocus(Ue,Le,Xe,se),(tt=ii.current)==null||tt.style.setProperty("--cx",`${(Ue*100).toFixed(2)}%`)};window.__focus=Ft;const Mn=()=>{if(Gt=F.clientWidth,bt=F.clientHeight,K.resize(Gt,bt),a.current){const se=Math.min(2,window.devicePixelRatio||1);a.current.width=Gt*se,a.current.height=bt*se}Ft(!0)};Mn(),window.addEventListener("resize",Mn);let it=[];const Gn=new Float32Array(6),kt=new Float32Array(6),bn=6,Kn=.03,Ns=.35,ci=new Set;let ai=-1;const Ni=new Float32Array(6).fill(1),Sl=1.4,ao=se=>se<1?(se-1)*30:(se-1)*22.5,ua=()=>{const se=Ht.current;if(!se)return;const Be=Le=>ci.has(Le)||ai>=0&&ai!==Le;for(let Le=0;Le<6;Le++){const Xe=it[Le];se.tierEq(Le,Xe&&Xe.band?Be(Le)?-30:ao(Ni[Le]):0)}const Ue=Le=>{const Xe=it.map((tt,Nt)=>tt.band===Le?Nt:-1).filter(tt=>tt>=0);return Xe.length&&Xe.every(tt=>Be(tt))?.08:1};K.setEqVis(Ue("low"),Ue("mid"),Ue("high"))},es=()=>{var se;it=[{label:"sub",band:"low"},{label:"bass",band:"low"},{label:"lowmid",band:"mid"},{label:"mid",band:"mid"},{label:"himid",band:"high"},{label:"air",band:"high"}],ci.clear(),ai=-1,Ni.fill(1),ua(),K.setTierMap(Array.from({length:24},(Be,Ue)=>Math.floor(Ue/4)),6),(se=Ht.current)==null||se.setTierBands(6)},fa=se=>{const Ue=["bass","drums","other","vocals"].filter(Xe=>se.some(tt=>tt.role===Xe));if(Ue.length<2)return es();it=Ue.map(Xe=>({label:Xe,role:Xe})),ci.clear(),ai=-1,Ni.fill(1),ua();const Le=24/Ue.length;K.setTierMap(Array.from({length:24},(Xe,tt)=>Math.min(Ue.length-1,Math.floor(tt/Le))),Ue.length,Ue.indexOf("vocals"))},Et={t:0,latched:!1,axis:!1,sy0:0,t0:0,drag:null};es(),Ds.current={openStack(){Et.latched=!0,Et.t=1,K.setDissect(1)},closeStack(){Et.latched=!1,Et.t=0,K.setDissect(0)}},yi.current={arm(se){fa(se),Et.latched=!0,Et.t=1,K.setDissect(1)}},Yi.current={gain(se,Be){var Le;const Ue=it[se];Ue&&(Ue.role?(Le=De.current)==null||Le.setStemGain(Ue.role,Be):(Ni[se]=Math.max(0,Math.min(2,Be)),ua()))},solo(se){const Be=it[se];if(Be)if(Be.role){const Ue=De.current;Ue==null||Ue.solo(Ue.soloRole===Be.role?null:Be.role)}else ai=ai===se?-1:se,ua()},mute(se){var Ue;const Be=it[se];Be&&(Be.role?(Ue=De.current)==null||Ue.toggleMuteRole(Be.role):(ci.has(se)?ci.delete(se):ci.add(se),ua()))},hover(se){K.setHiTier(se)}};const Ia=()=>{},ha=28,Er=matchMedia("(pointer: coarse)").matches?44:18,Ic=(se,Be,Ue,Le,Xe,tt)=>{const Nt=Xe-Ue,ft=tt-Le,fn=Nt*Nt+ft*ft,Rn=fn>0?Math.max(0,Math.min(1,((se-Ue)*Nt+(Be-Le)*ft)/fn)):0;return Math.hypot(se-(Ue+Rn*Nt),Be-(Le+Rn*ft))},so=(se,Be,Ue)=>{let Le=1e9;const Xe=K.surveyPoint(se,0,1);let tt=Xe;for(let Nt=1;Nt<=ha;Nt++){const ft=Nt===ha?Xe:K.surveyPoint(se,Nt/ha*Math.PI*2,1),fn=Ic(Be,Ue,tt.x,tt.y,ft.x,ft.y);fn<Le&&(Le=fn),tt=ft}return Le},Tr=(se,Be)=>{let Ue=-1,Le=1e9;for(let Xe=0;Xe<it.length;Xe++){const tt=so(Xe,se,Be);tt<Le&&(Le=tt,Ue=Xe)}return{tier:Ue,d:Le}},Ml=(se,Be)=>{const{tier:Ue,d:Le}=Tr(se,Be);return Le>Er?-1:Ue},hi=matchMedia("(pointer: fine)").matches,ts=matchMedia("(prefers-reduced-motion: reduce)").matches,Bt={x:-100,y:-100,tx:-100,ty:-100,down:0,overUi:!1,dragging:!1,lx:0,ly:0,axisHover:!1};let Ls="",ro=-1,Us=!1;const oo=(se,Be)=>{var Ue;Bt.tx=se,Bt.ty=Be,!Us&&(Us=!0,Bt.x=se,Bt.y=Be,(Ue=ii.current)==null||Ue.classList.add("cursor-armed"))},Ha=se=>oo(se.clientX,se.clientY),Ar=se=>{var Be;se.relatedTarget||(Us=!1,(Be=ii.current)==null||Be.classList.remove("cursor-armed"),A.current&&(A.current.style.opacity="0"),K.setHover(0))},bl=se=>{var Ue,Le;if(oo(se.clientX,se.clientY),Bt.overUi=!!((Le=(Ue=se.target)==null?void 0:Ue.closest)!=null&&Le.call(Ue,'.rail, .cn-hdr, .cn-ftr, button, a, input, [role="slider"]')),!ts){if(hi&&(K.setPointer(se.clientX/Math.max(1,Gt)-.5,se.clientY/Math.max(1,bt)-.5),K.setHover(Bt.overUi||wt.on||Et.axis||Et.drag||Bt.dragging?0:1)),Bt.dragging&&K.dragBy((se.clientX-Bt.lx)*.006,(se.clientY-Bt.ly)*.004),Et.axis)Et.t=Math.max(0,Math.min(1,Et.t0+(Et.sy0-se.clientY)/240)),Ia("axis-move",+Et.t.toFixed(2)),K.setDissect(Et.t),An.current&&(An.current.textContent=`dissect ${Math.round(Et.t*100)}%`);else if(Et.drag){const Xe=Et.drag;if(Math.hypot(se.clientX-Xe.sx,se.clientY-Xe.sy)>7&&(Xe.moved=!0),Xe.moved){const tt=ns(),Nt=Xe.sx>=tt.x?1:-1,ft=Math.max(0,Math.min(Sl,1+((se.clientX-tt.x)*Nt-Xe.dx0)/200));Xe.lvl=ft;const fn=it[Xe.tier],Rn=Ht.current;fn.role&&De.current?De.current.setStemGain(fn.role,ft):fn.band&&(Ni[Xe.tier]=Math.max(0,Math.min(Sl,ft)),Rn==null||Rn.tierEq(Xe.tier,ao(ft))),An.current&&(An.current.textContent=`${fn.label} ${Math.round(ft*100)}%`),Ia("tier-move",{tier:Xe.tier,lvl:+ft.toFixed(2)})}}else if(wt.on){const Xe=Ht.current,tt=ns(),Nt=Math.hypot(se.clientX-tt.x,se.clientY-tt.y),ft=Math.max(-1,Math.min(1.8,(Nt-wt.r0)/wt.r0)),fn=ft<0?ft*30:Math.min(1,ft)*9;if(zi.eq=fn,(Xe==null?void 0:Xe.kind)==="stems"&&De.current){const zn=Math.atan2(-(wt.sy-tt.y),wt.sx-tt.x),Xn=zn>Math.PI*.25&&zn<Math.PI*.75?"vocals":zn<-Math.PI*.25&&zn>-Math.PI*.75?"drums":Math.abs(zn)>=Math.PI*.75?"bass":"other";wt.stemRole=Xn,De.current.setStemGain(Xn,ft<0?1+ft:1+Math.min(1,ft))}else Xe==null||Xe.eq(wt.band,fn);const Rn=ft<0?1+ft*.95:1+Math.min(1,ft)*.5;K.setEqVis(wt.band==="low"?Rn:1,wt.band==="mid"?Rn:1,wt.band==="high"?Rn:1),zi.sweep=Math.max(-1,Math.min(1,(se.clientX-wt.sx)/(Gt*.3))),Xe==null||Xe.sweep(zi.sweep),wt.echo=Math.max(0,Math.min(1,ft-.8)),Xe==null||Xe.echo(wt.echo);const bi=K.grabPlane(se.clientX/Gt*2-1,-(se.clientY/bt)*2+1),Zi=wt.band==="low"?0:wt.band==="mid"?1:2;K.setGrab(bi,.65+Math.min(1.2,Math.abs(ft))*.55,Zi),An.current&&(An.current.textContent=wt.echo>.02?`( echo ${Math.round(wt.echo*100)}% )`:Math.abs(zi.sweep)>.05&&Math.abs(se.movementX??1)>Math.abs(se.movementY??0)?`${zi.sweep<0?"hp":"lp"} ${Math.round(Math.abs(zi.sweep)*100)}`:wt.stemRole?`${wt.stemRole} ${ft<0?Math.round((1+ft)*100)+"%":"+"+Math.round(Math.min(1,ft)*100)+"%"}`:`${wt.band} ${fn>0?"+":""}${Math.round(fn)}db`)}}if(!wt.on&&!Et.axis&&!Et.drag&&!Bt.dragging&&Tt.current){const Xe=ns();Bt.axisHover=!Bt.overUi&&K.dissect<.5&&Math.abs(se.clientX-Xe.x)<30&&Math.abs(se.clientY-Xe.y)<bt*.38;let tt="",Nt=-1;if(Bt.axisHover)tt="dissect ↕";else if(K.dissect>.5&&!Bt.overUi){const ft=Ml(se.clientX,se.clientY);ft>=0&&(tt=`${it[ft].label} · grab`,Nt=ft)}Nt!==ro&&(ro=Nt,K.setHiTier(Nt)),An.current&&(tt||An.current.textContent===Ls)&&(An.current.textContent=tt),Ls=tt}else Bt.axisHover=!1;Bt.lx=se.clientX,Bt.ly=se.clientY},wt={on:!1,band:"mid",stemRole:null,sx:0,sy:0,r0:1,echo:0},zi={sweep:0,eq:0},Mi={sweep:0,echo:0},ns=()=>{if(!Tt.current)return{x:Gt/2,y:bt/2};const se=K.projectLocal(0,0,0);return Number.isFinite(se.x)&&Number.isFinite(se.y)?se:{x:Gt/2,y:bt/2}},Hc=se=>{var fn,Rn,bi,Zi,zn,Xn,Ki,is,Bs,zs;if(Bt.down=1,Bt.lx=se.clientX,Bt.ly=se.clientY,!!((Rn=(fn=se.target)==null?void 0:fn.closest)!=null&&Rn.call(fn,'.rail, .cn-hdr, .cn-ftr, button, a, input, [role="slider"]'))||!Tt.current)return;const Ue=K.bodyHit(se.clientX/Gt*2-1,-(se.clientY/bt)*2+1),Le=K.dissect,Xe=ns();Ia("down",{x:Math.round(se.clientX),y:Math.round(se.clientY),dis:+Le.toFixed(2),pts:Li.size});const tt=Math.abs(se.clientX-Xe.x),Nt=Le>.5?Tr(se.clientX,se.clientY):{tier:-1,d:1e9},ft=Nt.tier>=0&&Nt.d<=Er&&Nt.d<tt;if(Li.size<2&&(se.shiftKey||tt<30&&(Le>.3||Ue)&&!ft)){Et.axis=!0,Et.sy0=se.clientY,Et.t0=Et.t,(bi=ii.current)==null||bi.classList.add("grabbing");return}if(Le>.5&&Li.size<2){const Ei=Ml(se.clientX,se.clientY);if(Ei>=0){const wa=it[Ei],as=wa!=null&&wa.role?((zn=(Zi=De.current)==null?void 0:Zi.info().find(go=>go.role===wa.role))==null?void 0:zn.gain)??1:Ni[Ei];Et.drag={tier:Ei,dx0:Math.max(30,Math.abs(se.clientX-Xe.x)),sx:se.clientX,sy:se.clientY,downAt:performance.now(),moved:!1,lvl:1,g0:as},(Xn=ii.current)==null||Xn.classList.add("mixing"),it[Ei].band&&ci.has(Ei)&&(ci.delete(Ei),ua());return}Bt.dragging=!0,(Ki=ii.current)==null||Ki.classList.add("grabbing");return}if(Ue&&Li.size<2&&((is=Ht.current)==null?void 0:is.kind)!=="tube"){wt.on=!0,wt.sx=se.clientX,wt.sy=se.clientY;const Ei=ns();wt.r0=Math.max(40,Math.hypot(se.clientX-Ei.x,se.clientY-Ei.y));const wa=Ei.y-wt.r0,as=(se.clientY-wa)/(2*wt.r0);wt.band=as<.34?"high":as<.66?"mid":"low",(Bs=ii.current)==null||Bs.classList.add("mixing"),K.setGrab(Ue,.6,wt.band==="low"?0:wt.band==="mid"?1:2)}else Bt.dragging=!0,(zs=ii.current)==null||zs.classList.add("grabbing")},lo=()=>{var se,Be,Ue;if(Bt.dragging=!1,(se=ii.current)==null||se.classList.remove("grabbing"),Et.axis&&(Et.axis=!1,Et.latched=Et.t>.85,Et.t=Et.latched?1:0,K.setDissect(Et.t),An.current&&(An.current.textContent="")),Et.drag){const Le=Et.drag;Et.drag=null,(Be=ii.current)==null||Be.classList.remove("mixing");const Xe=it[Le.tier],tt=De.current,Nt=!Le.moved&&performance.now()-Le.downAt<350;Ia("tier-up",{tier:Le.tier,moved:Le.moved,lvl:+Le.lvl.toFixed(2)}),Nt?Xe.role&&tt?tt.solo(tt.soloRole===Xe.role?null:Xe.role):Xe.band&&(ai=ai===Le.tier?-1:Le.tier,ua()):Le.lvl<=.07?Xe.role&&tt?(tt.toggleMuteRole(Xe.role),tt.setStemGain(Xe.role,Le.g0)):Xe.band&&ci.add(Le.tier):Xe.role&&tt&&tt.setStemGain(Xe.role,Le.g0),ua(),An.current&&(An.current.textContent="")}if(wt.on){wt.on=!1,(Ue=ii.current)==null||Ue.classList.remove("mixing");const Le=Ht.current;wt.stemRole&&De.current&&De.current.setStemGain(wt.stemRole,1),wt.stemRole=null,Le==null||Le.eq(wt.band,0),Le==null||Le.echo(Mi.echo),zi.sweep=Mi.sweep,Le==null||Le.sweep(Mi.sweep),wt.echo=Mi.echo,K.setGrab(null,0),ua(),zi.eq=0,An.current&&(An.current.textContent="")}};window.addEventListener("pointermove",bl),window.addEventListener("pointerover",Ha),window.addEventListener("pointerdown",Ha),document.addEventListener("pointerout",Ar),window.addEventListener("pointerdown",Hc),window.addEventListener("pointerup",lo),window.addEventListener("pointercancel",lo);const El=new V2;let co=0,Tl=0,Al=0;const wl=new Float32Array(220);let uo=0,wr=0,fo=0,Rr=0,Os=null,Rl=!1,Gc=0,Cl=!1;const ho=new Float32Array(6).fill(1);let Dl=0,kc=performance.now(),Nl=0,po=0,Vc="idle";const Xc=se=>{var Ei,wa,as,Ol,go,Ti,Is,Pl;Dl=requestAnimationFrame(Xc);const Be=(se-kc)/1e3,Ue=Math.min(.05,Be);kc=se;const Le=ne.analyser.update(Ue),Xe=ne.analyser.now,tt=et.update(Le,ne.analyser.onsets,Xe,Ue),Nt=Je.update(Le,tt,Xe,Ue),ft=dt.update(Le,Xe,Ue),fn=ft.tier===3&&un!==3;if(un=ft.tier,K.setEnergy(ft.drop,ft.strong,fn,ft.calm),Le.onset&&(fo=1,K.onset()),fo*=Math.exp(-Ue*9),K.setBands(Le.bands),tt.tempoConfidence>.2&&tt.tempo>0&&ne.setEchoTime(60/tt.tempo*(tt.tempo>140?1:.75)),Nt.trigger&&(wr=Math.max(wr,.4+Nt.strength*.6),Tt.current&&Nt.strength>.25)){const sn=it.findIndex(yt=>yt.role==="drums");K.burst(Math.min(1,Nt.strength*(1+ft.drop*2.2+ft.strong*.5)),sn>=0?sn:0)}wr*=Math.exp(-Ue*5);const Rn=De.current;if(ne.kind==="stems"&&(Rn!=null&&Rn.playing)){const sn=Rn.info();Os=sn;let yt=0,ot=0;for(const St of sn)St.role==="vocals"&&(yt=Math.max(yt,St.level)),St.role==="drums"&&(ot=Math.max(ot,St.level));if(K.setVocal(Math.min(1.4,yt*4)),ot>.3&&ot>Rr*1.6){const St=it.findIndex(rn=>rn.role==="drums");K.burst(Math.min(1,ot*1.6),St>=0?St:null),fo=1}Rr=ot*.7+Rr*.3}else ne.kind!=="stems"&&K.setVocal(0);const bi=ne.el,Zi=ne.kind==="stems"&&De.current?De.current.currentTime()/Math.max(1,De.current.duration):bi.duration>0?bi.currentTime/bi.duration:0,zn=W.current?W2(W.current,Zi,8):0;let Xn=Le.low,Ki=Le.mid,is=Le.high;const Bs=Tt.current?1-Math.min(1,Le.rms/.05):1;if(Bs>.002){const sn=performance.now()/1e3,yt=(Oe.current?2.6:Tt.current?1.8:1)*Bs,ot=.5+.5*Math.sin(sn*1.1636),St=.5+.5*Math.sin(sn*.31+1.7);Xn=Math.max(Xn,.2*yt*ot*(.7+.3*St)),Ki=Math.max(Ki,.07*yt*ot*St),is=Math.max(is,.03*yt*(.5+.5*Math.sin(sn*1.43)))}K.render(Ue,Xn,Ki,is,wr,zn,fo),Tt.current&&!Cl&&(Cl=!0,Gc=se+4500,PR()&&setTimeout(()=>Me(!0),900));{const sn=24/it.length;for(let yt=0;yt<it.length;yt++){const ot=it[yt];if(ot.role){let di=0;if(Os)for(const Ga of Os)Ga.role===ot.role&&(di=Math.max(di,Ga.level));Gn[yt]=Math.min(1,di*3);continue}const St=Math.round(yt*sn),rn=Math.round((yt+1)*sn);let En=0;for(let di=St;di<rn;di++)En+=Le.bands[di];En/=Math.max(1,rn-St),En>=Kn&&(kt[yt]=kt[yt]>0?kt[yt]+(En-kt[yt])*Math.min(1,Ue/bn):En);const Hs=Math.log2(Math.max(1e-4,En)/Math.max(Kn,kt[yt]));Gn[yt]=Math.max(0,Math.min(1,.5+Hs*Ns))}}const zs=Bt.axisHover||Et.axis||se<Gc;if(K.dissect>.004||zs){Rl=!0;for(let yt=0;yt<6;yt++){const ot=it[yt],St=ot?ot.role?Math.min(1.4,Gn[yt]*1.5):ci.has(yt)||ai>=0&&ai!==yt?.08:Math.min(1.4,Ni[yt]):1,En=((Ei=Et.drag)==null?void 0:Ei.moved)&&Et.drag.tier===yt?26:St>ho[yt]?14:2.2;ho[yt]+=(St-ho[yt])*Math.min(1,Ue*En)}K.setTierLevels(ho);const sn={solo:-1,muted:[]};for(let yt=0;yt<it.length;yt++){const ot=it[yt];ot.role?(sn.muted[yt]=!!(Os!=null&&Os.some(St=>St.role===ot.role&&St.muted)),(Rn==null?void 0:Rn.soloRole)===ot.role&&(sn.solo=yt)):(sn.muted[yt]=ci.has(yt),ai===yt&&(sn.solo=yt))}z3(a.current,K,it,Gn,sn,wr,Le.rms,zs)}else if(Rl){Rl=!1;const sn=(wa=a.current)==null?void 0:wa.getContext("2d");sn&&a.current&&sn.clearRect(0,0,a.current.width,a.current.height)}if(wl[uo]=Le.rms,uo=(uo+1)%wl.length,hi&&A.current){Bt.x+=(Bt.tx-Bt.x)*Math.min(1,Ue*14),Bt.y+=(Bt.ty-Bt.y)*Math.min(1,Ue*14),Bt.down*=Math.exp(-Ue*7);const sn=1+Bt.down*.5;A.current.style.transform=`translate(${Bt.x}px, ${Bt.y}px) translate(-50%, -50%) scale(${sn})`,A.current.style.opacity=Us?"1":"0"}if(co=Math.max(co,Be),Tl+=Ue,Tl>=1&&(Al=co,co=0,Tl=0),document.visibilityState==="visible"&&Tt.current){const sn=El.update(Ue);sn!==null&&K.setQuality(sn)}if(ne.capturing&&$.current?po=Le.rms>.0015?0:po+Ue:po=0,Nl+=Ue,Nl>.16){Nl=0;const sn=ne.capturing?po>2?"silent":"live":"idle";sn!==Vc&&(Vc=sn,Hn(sn)),B3(e.current,wl,uo,W.current,Zi),I3(n.current,Le.bands,wt.on?wt.band:null,zi.eq);const yt=ne.el;if(c.current&&(c.current.textContent=`tracking ${(94+tt.tempoConfidence*5.9).toFixed(2)}%`),Ta.current){const ot=tt.tempoConfidence>.12,St=ot?`${Math.round(tt.tempo)}`:"--",rn=(as=za.current)==null?void 0:as.bpm;Ta.current.textContent=rn?`${St} / ${rn}`:St,Ta.current.classList.toggle("locked",ot)}if(Aa.current){const ot=Math.round(Math.min(1,Le.rms)*12),St=Aa.current.children;for(let rn=0;rn<St.length;rn++)St[rn].className=rn<ot?"on":""}if(ca.current&&(ca.current.textContent=`fps ${Math.min(120,Math.round(1/Math.max(.001,El.ema)))} · worst ${Math.round(Al*1e3)}ms · pts ${Math.round((108e3*K.densityNow+2600+3600)/1e3)}k · quality ${El.q<1?"reduced":"full"}`),Y(ne.kind==="stems"?!(((Ol=De.current)==null?void 0:Ol.playing)??!1):((go=Ht.current)==null?void 0:go.el.paused)??!1),ne.kind==="stems"||K.dissect>.25){const ot=ne.kind==="stems"?((Ti=De.current)==null?void 0:Ti.info())??null:null,St=[];for(let rn=it.length-1;rn>=0;rn--){const En=it[rn];if(En.role&&ot){let Hs=1,di=!1;for(const Ga of ot)Ga.role===En.role&&(Hs=Ga.gain,di=di||Ga.muted);St.push({i:rn,label:En.label,level:Gn[rn],gain:Hs,muted:di,solo:((Is=De.current)==null?void 0:Is.soloRole)===En.role,hot:ro===rn})}else St.push({i:rn,label:En.label,level:Gn[rn],gain:Ni[rn],muted:ci.has(rn),solo:ai===rn,hot:ro===rn})}xi.current=St,Sn(St)}else Sn(null);if(Ja.current){const ot=K.zoomLevel;Ja.current.textContent=`( zoom ${ot.toFixed(1)}× )`,Ja.current.classList.toggle("on",ot>1.04)}if($a.current){const ot=zi.sweep;$a.current.textContent=`( flt ${ot<0?"hp":"lp"} ${Math.round(Math.abs(ot)*100)} )`,$a.current.classList.toggle("on",Math.abs(ot)>=.04)}if(la.current&&(la.current.textContent=`( echo ${Math.round(wt.echo*100)}% )`,la.current.classList.toggle("on",wt.echo>.02)),ji.current){const ot=K.dissect;ji.current.textContent=`( sect ${Math.round(ot*100)}% )`,ji.current.classList.toggle("on",ot>.02),(Pl=ii.current)==null||Pl.classList.toggle("dissected",ot>.25)}for(let ot=0;ot<5;ot++){const St=u.current[ot];if(!St)continue;const rn=Math.round(Le.bands[Math.min(23,ot*5+2)]*99);St.textContent=`${"abcde"[ot]} :: ${rn}`,St.style.opacity=Math.sin(Xe*(.7+ot*.31)+ot*2.1)>-.35?"1":"0"}if(ne.kind==="tube"&&Se.current){const ot=Se.current.read();$.current=ot.playing,yn(St=>St&&St.title===ot.title&&St.channel===ot.channel&&Math.round(St.elapsed)===Math.round(ot.elapsed)&&St.playing===ot.playing&&St.error===ot.error?St:ot)}if(Tt.current){const ot=ne.kind==="stems"&&De.current?{t:De.current.currentTime(),d:De.current.duration}:{t:yt.currentTime,d:yt.duration};if(p.current&&(p.current.textContent=sl(ot.t)),m.current&&(m.current.textContent=sl(ot.d)),isFinite(ot.d)&&ot.d>0){const St=Math.round(ot.t/ot.d*100);Vn(En=>En===St?En:St);const rn=`${sl(ot.t)} of ${sl(ot.d)}`;Si(En=>En===rn?En:rn)}}L(ne.playing)}};Dl=requestAnimationFrame(Xc);const qc=se=>se.preventDefault(),Wc=se=>{var Xe;se.preventDefault();const Be=[...((Xe=se.dataTransfer)==null?void 0:Xe.files)??[]].filter(tt=>/^(audio|video)\//.test(tt.type));if(Be.length>=2&&$2(Be)){Tt.current=!0,v(!0),Ft(),K.powerOn(),ne.unlock();const tt=De.current??new Gx(ne.ctx,ne.busHead);De.current=tt,Z(!0),tt.load(Be).then(()=>{ne.enterStems(`stem deck · ${Be.length} stems`),tt.play(0);const Nt=tt.peaks();W.current={amp:Nt.amp,secondsPerPixel:Nt.secondsPerPixel},Z(!1),fa(tt.info()),Et.latched=!0,Et.t=1,K.setDissect(1)});return}const Ue=Be[0];if(!Ue)return;Tt.current=!0,v(!0),Ft(),K.powerOn(),ne.unlock(),ne.playFile(Ue);const Le=++ce.current;Z(!0),Hx(Ue,ne.ctx).then(tt=>{ce.current===Le&&(W.current=tt,Z(!1))})};window.addEventListener("dragover",qc),window.addEventListener("drop",Wc);const mo=se=>{var Le,Xe,tt,Nt,ft,fn,Rn,bi,Zi;if((Xe=(Le=se.target)==null?void 0:Le.closest)!=null&&Xe.call(Le,'input, textarea, select, button, a[href], [role="slider"], [contenteditable]'))return;if(!Tt.current){(se.code==="Space"||se.code==="Enter")&&(se.preventDefault(),(tt=document.querySelector(".power"))==null||tt.click());return}const Be=Ht.current;if(!Be)return;const Ue=Be.kind==="stems"?De.current:null;switch(se.code){case"Space":se.preventDefault(),Ue?Ue.playing?Ue.pause():Ue.play():Be.kind!=="mic"&&(Be.el.paused?Be.el.play():Be.el.pause());break;case"KeyN":Be.kind==="tube"?(Nt=Se.current)==null||Nt.next():Be.kind==="radio"?Be.next():Be.playRadio();break;case"ArrowRight":case"ArrowLeft":{if(se.preventDefault(),Be.kind==="tube")break;const zn=se.code==="ArrowRight"?5:-5;if(Ue){Ue.seek(Math.max(0,Math.min(Ue.duration,Ue.currentTime()+zn)));break}const Xn=Be.el;isFinite(Xn.duration)&&Xn.duration>0&&(Xn.currentTime=Math.max(0,Math.min(Xn.duration,Xn.currentTime+zn)));break}case"ArrowUp":case"ArrowDown":se.preventDefault(),xe(zn=>{var Ki;const Xn=Math.max(0,Math.min(1,zn+(se.code==="ArrowUp"?.05:-.05)));return Be.kind==="tube"&&((Ki=Se.current)==null||Ki.setVolume(Xn)),Xn});break;case"Digit1":Ae({turb:.6,expo:.8,spin:.5});break;case"Digit2":Ae({turb:1,expo:1,spin:1});break;case"Digit3":Ae({turb:1.6,expo:1.3,spin:1.8});break;case"KeyR":Be.playRadio();break;case"KeyF":se.shiftKey&&((ft=o.current)==null||ft.click());break;case"KeyM":se.shiftKey&&Be.useMic();break;case"KeyH":se.shiftKey&&$e(zn=>!zn);break;case"KeyD":Et.latched=!Et.latched,Et.t=Et.latched?1:0,(fn=Bn.current)==null||fn.setDissect(Et.t);break;case"Equal":case"NumpadAdd":(Rn=Bn.current)==null||Rn.zoomBy(1.25);break;case"Minus":case"NumpadSubtract":(bi=Bn.current)==null||bi.zoomBy(1/1.25);break;case"Digit0":(Zi=Bn.current)==null||Zi.setZoom(1);break;case"BracketLeft":case"BracketRight":{if(se.preventDefault(),Be.kind==="tube")break;const zn=se.code==="BracketRight"?.12:-.12;Mi.sweep=Math.max(-1,Math.min(1,Number((Mi.sweep+zn).toFixed(2)))),zi.sweep=Mi.sweep,Be.sweep(Mi.sweep);break}case"Backslash":if(se.preventDefault(),Be.kind==="tube")break;Mi.sweep=0,Mi.echo=0,zi.sweep=0,wt.echo=0,Be.sweep(0),Be.echo(0);break;case"KeyE":{if(se.preventDefault(),Be.kind==="tube")break;const zn=se.shiftKey?-.2:.2;Mi.echo=Math.max(0,Math.min(1,Number((Mi.echo+zn).toFixed(2)))),wt.echo=Mi.echo,Be.echo(Mi.echo);break}}};window.addEventListener("keydown",mo);const Ps=se=>{var Be,Ue;se.ctrlKey||(Ue=(Be=se.target)==null?void 0:Be.closest)!=null&&Ue.call(Be,".rail, .spec")||(se.preventDefault(),K.zoomBy(se.deltaY<0?1.12:1/1.12))};window.addEventListener("wheel",Ps,{passive:!1});const Li=new Map;let Fs=0;const Ll=se=>{var Be,Ue;if(!((Ue=(Be=se.target)==null?void 0:Be.closest)!=null&&Ue.call(Be,".rail, .spec"))&&(Li.set(se.pointerId,{x:se.clientX,y:se.clientY}),Li.size===2)){const[Le,Xe]=[...Li.values()];Fs=Math.hypot(Le.x-Xe.x,Le.y-Xe.y)}},Ul=se=>{if(!Li.has(se.pointerId)||(Li.set(se.pointerId,{x:se.clientX,y:se.clientY}),Li.size!==2))return;const[Be,Ue]=[...Li.values()],Le=Math.hypot(Be.x-Ue.x,Be.y-Ue.y);Fs>0&&Le>0&&K.zoomBy(Le/Fs),Fs=Le},Cr=se=>{Li.delete(se.pointerId),Li.size<2&&(Fs=0)};return window.addEventListener("pointerdown",Ll),window.addEventListener("pointermove",Ul),window.addEventListener("pointerup",Cr),window.addEventListener("pointercancel",Cr),()=>{cancelAnimationFrame(Dl),window.removeEventListener("resize",Mn),window.removeEventListener("dragover",qc),window.removeEventListener("drop",Wc),window.removeEventListener("keydown",mo),window.removeEventListener("wheel",Ps),window.removeEventListener("pointerdown",Ll),window.removeEventListener("pointermove",Ul),window.removeEventListener("pointerup",Cr),window.removeEventListener("pointercancel",Cr),window.removeEventListener("pointermove",bl),window.removeEventListener("pointerover",Ha),window.removeEventListener("pointerdown",Ha),document.removeEventListener("pointerout",Ar),window.removeEventListener("pointerdown",Hc),window.removeEventListener("pointerup",lo),window.removeEventListener("pointercancel",lo)}},[]);const oe=async()=>{var K,dt;const F=dn.trim();if(!F)return;const ne=kR(F);if(ne){(K=Se.current)==null||K.load(ne),Un(""),nn(null);return}const Ne=++b.current;U(!0);try{const et=await VR(F);if(b.current!==Ne)return;nn(et)}catch(et){if(b.current!==Ne)return;nn(null),(dt=Ht.current)==null||dt.announce("search failed",et.message)}finally{b.current===Ne&&U(!1)}},le=async()=>{const F=Ht.current;F&&(F.kind!=="tube"&&vt(F.kind),Se.current||(Se.current=new qR,Se.current.onError=ne=>{var Ne;(ne===101||ne===150)&&(F.announce("embedding blocked","the owner disabled it for this video"),(Ne=Se.current)==null||Ne.next())}),F.enterTube())},Ye=()=>{var Ne,K;const F=Ht.current;if(!F)return;(Ne=Se.current)==null||Ne.pause(),Ve();const ne=nt;vt(null),ne==="mic"?F.useMic():ne==="file"?(K=o.current)==null||K.click():F.playRadio()};Pe.useEffect(()=>{var K;if(!Qe)return;const F=on.current;if(!F)return;const ne=(K=window.matchMedia)==null?void 0:K.call(window,"(prefers-reduced-motion: reduce)").matches,Ne=window.setTimeout(()=>F.scrollIntoView({block:"end",behavior:ne?"auto":"smooth"}),ne?0:460);return()=>window.clearTimeout(Ne)},[!!Qe]);const at=async()=>{const F=Ht.current,ne=await(F==null?void 0:F.useTabAudio())??!1;Vt(ne),Nn(ne?null:(F==null?void 0:F.lastListenError)??"could not listen"),ne&&It(!0)},Ve=()=>{var F;(F=Ht.current)==null||F.stopTabAudio(),Vt(!1),Nn(null)},st=async(F,ne=!0)=>{var et;const Ne=Ht.current;if(!Ne||!F.trim())return;q("loading");const{tracks:K,read:dt}=await Q2(F.trim());if(pt(dt),!K.length){q("empty");return}q("idle");try{localStorage.setItem("scope-vibe",F.trim())}catch{}Ne.setPlaylist(K),!Tt.current&&!Oe.current&&(Tt.current=!0,v(!0),window.__focus(),(et=Bn.current)==null||et.powerOn()),ne&&await Ne.playRadio()},rt=async()=>{var et;const F=Ht.current,ne=Bn.current;if(!F||!ne||!F.el.src||Fe)return;const Ne=++we.current,K=(x==null?void 0:x.title)??"track",dt=F.el.currentTime||0;try{const Je=await ZR(F.el.src,F.ctx,bt=>{we.current===Ne&&We(`${bt.stage} ${Math.round(bt.pct)}%`)});if(we.current!==Ne)return;const un=De.current??new Gx(F.ctx,F.busHead);De.current=un,un.loadBuffers(Je.map(bt=>({role:bt.role,name:`${bt.role} · split`,buffer:bt.buffer}))),F.enterStems(`${kp(K,22)} · split`),un.play(dt);const Gt=un.peaks();W.current={amp:Gt.amp,secondsPerPixel:Gt.secondsPerPixel},(et=yi.current)==null||et.arm(un.info()),We(null)}catch{we.current===Ne&&(We("split failed"),setTimeout(()=>we.current===Ne&&We(null),2500))}},mt=()=>{var Lt;const F=Bn.current,ne=window.innerWidth,Ne=window.innerHeight,K=(Lt=document.querySelector(".pl-fig"))==null?void 0:Lt.getBoundingClientRect();if(!F||!K||window.matchMedia("(prefers-reduced-motion: reduce)").matches){At();return}const dt=1050,et=1e3,Je={x:(K.left+K.width/2)/ne,y:(K.top+K.height/2)/Ne,d:Math.max(1,Ne/K.height*.92)},un=ne>720?(320+(ne-320)/2)/ne:.5,Gt=performance.now(),bt=()=>{if(!Oe.current)return;const Ft=performance.now()-Gt;if(Ft<dt){F.setRev(Math.min(1,Ft/dt)),Ge.current=requestAnimationFrame(bt);return}Oe.current!=="dive"&&(Oe.current="dive",ve("dive"));const Mn=Math.min(1,(Ft-dt)/et),it=Mn*Mn*Mn;if(F.setRev(1+it*2.5),F.setFocus(Je.x+(un-Je.x)*it,Je.y+(.5-Je.y)*it,Je.d+(.16-Je.d)*it,!0),Mn>.8&&!Tt.current&&(Tt.current=!0,v(!0)),Mn<1){Ge.current=requestAnimationFrame(bt);return}At()};Ge.current=requestAnimationFrame(bt)},At=()=>{var F;Ge.current&&cancelAnimationFrame(Ge.current),Ge.current=0,Oe.current=null,ve(null),(F=Bn.current)==null||F.setRev(0),Tt.current||(Tt.current=!0,v(!0)),window.__focus(!1)},ut=()=>{if(!Tt.current||Oe.current)return;const F=Bn.current,ne=F?{...F.focusNow}:null;if(y.current=!0,Tt.current=!1,v(!1),F==null||F.setDissect(0),!F||!ne||window.matchMedia("(prefers-reduced-motion: reduce)").matches){y.current=!1,requestAnimationFrame(()=>{window.__focus(!0)});return}E(!0),requestAnimationFrame(()=>{const Ne=document.querySelector(".pl-fig"),K=window.innerWidth,dt=window.innerHeight;if(!Ne){y.current=!1,E(!1);return}let et=0,Je=0;for(let it=Ne;it;it=it.offsetParent)et+=it.offsetLeft,Je+=it.offsetTop;const un=Ne.offsetWidth,Gt=Ne.offsetHeight,bt={x:(et+un/2)/K,y:(Je+Gt/2)/dt,d:Math.max(1,dt/Gt*.92)},Lt=1e3,Ft=performance.now(),Mn=()=>{const it=performance.now()-Ft,Gn=Math.min(1,it/Lt),kt=1-Math.pow(1-Gn,3);if(F.setRev((1-kt)*1.4),F.setFocus(ne.x+(bt.x-ne.x)*kt,ne.y+(bt.y-ne.y)*kt,ne.d+(bt.d-ne.d)*kt,!0),Gn<1){C.current=requestAnimationFrame(Mn);return}F.setRev(0),y.current=!1,E(!1),window.__focus(!1)};C.current=requestAnimationFrame(Mn)})},$t=()=>{var ne,Ne;if(Tt.current||Oe.current)return;g(!0),Oe.current="rev",ve("rev"),mt(),(ne=Bn.current)==null||ne.powerOn();let F=null;try{F=localStorage.getItem("scope-vibe")}catch{}(Ne=Ht.current)==null||Ne.playRadio(),F&&(ke(F),st(F,!1))},wn=Fe?Fe.toUpperCase():B?"DECODING ///":x?`${kp(x.title,26).toUpperCase()}${N==="file"?".MP3":""}`:"NO CARRIER";return D.jsxs("div",{ref:ii,className:`app${d?" live":""}${He?" ambient":""}`,children:[D.jsx("canvas",{ref:r,className:"stage","aria-hidden":"true"}),D.jsx("canvas",{ref:a,className:"survey","aria-hidden":"true"}),D.jsxs("div",{ref:A,className:"reticle","aria-hidden":"true",children:[D.jsx("i",{className:"ret-h"}),D.jsx("i",{className:"ret-v"}),D.jsx("i",{className:"ret-dot"}),D.jsx("span",{ref:An,className:"ret-label"})]}),D.jsx("div",{className:"x-v"}),D.jsx("div",{className:"x-h"}),!d&&D.jsxs("div",{className:`plate${he?` ${he}`:""}${M?" arrive":""}`,children:[D.jsxs("header",{className:"pl-hdr",children:[D.jsxs("div",{children:[D.jsx("b",{children:"[scope-01]"})," ",D.jsx("span",{className:"hlbl",children:"polar audio instrument"})]}),D.jsxs("div",{className:"k",children:["//unit_ ",D.jsx("span",{children:"d-01"})]}),D.jsxs("div",{className:"k",children:["//rev_ ",D.jsx("span",{children:"2.6"})]}),D.jsxs("div",{className:"k",children:["//ch_ ",D.jsx("span",{children:"01"})]})]}),D.jsxs("div",{className:"pl-body",children:[D.jsxs("div",{className:"pl-l",children:[D.jsxs("div",{className:"pl-morse",children:[D.jsx("span",{className:"lbl",children:"sig"}),D.jsxs("span",{className:"pl-sig",children:[D.jsx("svg",{width:"100%",height:"7",viewBox:`0 0 ${Qx.total} 7`,preserveAspectRatio:"none","aria-hidden":"true",children:D.jsx("g",{fill:"currentColor",opacity:".62",children:Qx.rects.map(F=>D.jsx("rect",{x:F.x,y:"3",width:F.w,height:"1.5"},F.x))})}),D.jsx("i",{className:"pl-carrier","aria-hidden":"true"})]}),D.jsx("span",{className:"lbl",children:"tx"})]}),D.jsx("div",{className:"pl-figwrap",children:D.jsxs("div",{className:"pl-fig",children:[D.jsx("i",{className:"brk tl"}),D.jsx("i",{className:"brk tr"}),D.jsx("i",{className:"brk bl"}),D.jsx("i",{className:"brk br"}),D.jsx($x,{className:"reg a"}),D.jsx($x,{className:"reg b"}),D.jsxs("div",{className:"pl-figcap",children:[D.jsx("span",{children:"fig.01 · particle field"}),D.jsx("span",{children:"108,000 pts · fibonacci sphere"})]})]})}),D.jsxs("div",{className:"pl-wave",children:[D.jsx("canvas",{ref:Ce,"aria-hidden":"true"}),D.jsx("span",{className:"wlbl",children:"motion"})]}),D.jsx("ul",{className:"pl-leads",children:["set a vibe","split any track","pull it apart"].map((F,ne)=>D.jsxs("li",{style:{"--i":ne},children:[D.jsx("span",{className:"no",children:"abc"[ne]}),D.jsx("span",{children:D.jsx(_r,{text:F,duration:700+ne*150})}),D.jsx("i",{className:"ln","aria-hidden":"true"}),D.jsx("b",{className:"dot","aria-hidden":"true"})]},F))}),D.jsxs("div",{className:"pl-band",children:[D.jsx("div",{className:"pl-mark",children:D.jsxs("h1",{children:["scope",D.jsx("span",{className:"pl-reg",children:"®"})]})}),D.jsx("div",{className:"pl-checks","aria-hidden":"true"}),D.jsx("div",{className:"pl-act",children:D.jsx("button",{className:"power",onClick:_?At:$t,children:D.jsx(_r,{text:_?"resume":"power on",duration:520,replayOnHover:!0})})})]})]}),D.jsxs("div",{className:"pl-r",children:[D.jsxs("div",{className:"pl-row",children:[D.jsx("span",{className:"k",children:"//particles_"}),D.jsx("span",{className:"v",children:"108,000"})]}),D.jsxs("div",{className:"pl-row dup",children:[D.jsx("span",{className:"k",children:"//engine_"}),D.jsx("span",{className:"v",children:"webgl 2"})]}),D.jsxs("div",{className:"pl-row dup",children:[D.jsx("span",{className:"k",children:"//source_"}),D.jsx("span",{className:"v",children:"audius"})]}),D.jsxs("div",{className:"pl-row",children:[D.jsx("span",{className:"k",children:"//split_"}),D.jsx("span",{className:"v",children:"mdx-net"})]}),D.jsxs("div",{className:"pl-row opt",children:[D.jsx("span",{className:"k",children:"//stems_"}),D.jsx("span",{className:"v",children:"4 ch"})]}),D.jsxs("div",{className:"pl-row",children:[D.jsx("span",{className:"k",children:"//density_"}),D.jsx(D3,{})]}),D.jsxs("div",{className:"pl-dials",children:[D.jsx(Lf,{v:_e.turb,cap:"turb",onChange:F=>Ae(ne=>({...ne,turb:F(ne.turb)}))}),D.jsx(Lf,{v:_e.expo,cap:"expo",onChange:F=>Ae(ne=>({...ne,expo:F(ne.expo)}))}),D.jsx(Lf,{v:_e.spin,cap:"spin",onChange:F=>Ae(ne=>({...ne,spin:F(ne.spin)}))})]}),D.jsxs("div",{className:"pl-row pl-peak",children:[D.jsxs("div",{className:"pl-peak-hd",children:[D.jsx("span",{className:"k",children:"//peak_"}),D.jsx("span",{ref:Ie,className:"v",children:"idle"})]}),D.jsx(O3,{}),D.jsxs("div",{className:"pl-peak-hd",children:[D.jsx("span",{className:"k",children:"20hz"}),D.jsx("span",{className:"k",children:"20khz"})]})]}),D.jsxs("div",{className:"pl-path",children:[D.jsxs("div",{className:"pl-row",children:[D.jsx("span",{className:"k",children:"//path_"}),D.jsx("span",{className:"v",children:"signal chain"})]}),R3.map(F=>D.jsxs("div",{className:`pl-prow${F.sub?" sub":""}`,onMouseEnter:()=>Q(F.i),onMouseLeave:()=>Q(null),children:[D.jsx("span",{className:"ix",children:F.ix}),D.jsx("span",{className:"nm",children:F.n}),D.jsx("span",{className:"dt",children:F.d})]},F.n)),D.jsx("div",{className:"pl-pathcap",children:P??"hover a stage"})]}),D.jsxs("div",{className:"pl-pills",children:[D.jsxs("span",{className:"pill on",children:["( ",_?"live":"idle"," )"]}),D.jsx("span",{className:"pill",children:"( ready )"}),D.jsx("span",{className:"pill",children:"( 44.1k )"})]}),D.jsx("div",{className:"pl-strip","aria-hidden":"true"})]})]}),D.jsxs("footer",{className:"pl-ftr",children:[D.jsxs("span",{children:[D.jsx("span",{className:"pl-meta",children:"/ webgl · 108k particles"}),D.jsxs("span",{className:"pl-by",children:[D.jsx(Jx,{})," made by noon"]})]}),D.jsx("span",{children:"/ drop a track anywhere"}),D.jsx("span",{children:"/ audius · artist-owned radio"})]})]}),d&&D.jsxs("div",{className:"cn-plate",children:[D.jsxs("header",{className:"pl-hdr cn-hdr",children:[D.jsxs("div",{children:[D.jsx("b",{children:"[scope-02]"})," ",D.jsx("span",{className:"hlbl",children:"console"})]}),D.jsxs("div",{className:"k",children:["//src_ ",D.jsx("span",{children:A3[N]}),D.jsx("i",{className:`src-dot${I?" live":""}`})]}),N!=="tube"&&D.jsxs("div",{className:`k cn-rate${me!==1?" armed":""}`,children:["//rate_ ",D.jsxs("span",{children:[me.toFixed(2),"×"]})]}),D.jsxs("button",{className:"cn-back",onClick:ut,children:["← ",D.jsx("span",{children:"standby"})]}),D.jsx("button",{className:"rail-help",onClick:()=>Me(!0),"aria-label":"how to play","aria-haspopup":"dialog",children:D.jsx("span",{"aria-hidden":"true",children:"?"})})]}),D.jsxs("div",{className:"cn-body",children:[D.jsxs("main",{className:"rail","aria-label":"instrument console",children:[D.jsx("h1",{className:"sr-only",children:"scope console"}),D.jsxs("div",{ref:je,className:"rail-stack",children:[D.jsxs("h2",{className:"cn-mod",children:[D.jsx("span",{children:"01 · now playing"}),D.jsx("i",{children:"//deck_"})]}),D.jsxs("div",{className:"nowplaying rail-sec",style:{"--i":1},children:[N!=="tube"&&D.jsxs("div",{className:"pl-row cn-track",children:[D.jsx("span",{className:"k",children:"//track_"}),D.jsx("samp",{className:"deck-name",role:"status","aria-live":"polite",children:D.jsx(_r,{text:wn,duration:700})})]}),x&&N!=="tube"&&D.jsxs("dl",{className:"deck-meta",children:[D.jsxs("div",{children:[D.jsx("dt",{children:"//bpm_"}),D.jsx("dd",{ref:Ta,className:"deck-bpm",children:"--"})]}),x.musicalKey&&D.jsxs("div",{children:[D.jsx("dt",{children:"//key_"}),D.jsx("dd",{children:x.musicalKey.toLowerCase()})]}),x.genre&&D.jsxs("div",{children:[D.jsx("dt",{children:"//genre_"}),D.jsx("dd",{children:x.genre.toLowerCase()})]}),x.artist&&D.jsxs("div",{children:[D.jsx("dt",{children:"//artist_"}),D.jsx("dd",{children:x.link?D.jsx("a",{href:x.link,target:"_blank",rel:"noopener noreferrer",children:x.artist.replace(" · audius","")}):x.artist.replace(" · audius","")})]})]}),N!=="tube"&&D.jsx("canvas",{ref:e,className:"deck-wave",width:640,height:48,role:"slider",tabIndex:0,"aria-label":"seek","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round(oa),"aria-valuetext":ni,onKeyDown:F=>{const ne=Ht.current;if(!ne)return;const Ne=ne.kind==="stems"&&De.current?De.current.duration:ne.el.duration;if(!isFinite(Ne)||Ne<=0)return;const K=et=>{const Je=Math.max(0,Math.min(Ne,et));ne.kind==="stems"&&De.current?De.current.seek(Je):ne.el.currentTime=Je},dt=ne.kind==="stems"&&De.current?De.current.currentTime():ne.el.currentTime;F.key==="ArrowRight"?(F.preventDefault(),F.stopPropagation(),K(dt+5)):F.key==="ArrowLeft"?(F.preventDefault(),F.stopPropagation(),K(dt-5)):F.key==="Home"?(F.preventDefault(),F.stopPropagation(),K(0)):F.key==="End"&&(F.preventDefault(),F.stopPropagation(),K(Ne))},onPointerDown:F=>{const ne=F.currentTarget.getBoundingClientRect(),Ne=Math.max(0,Math.min(1,(F.clientX-ne.left)/ne.width)),K=Ht.current;if((K==null?void 0:K.kind)==="stems"&&De.current){De.current.seek(Ne*De.current.duration);return}const dt=K==null?void 0:K.el;!dt||!isFinite(dt.duration)||dt.duration<=0||(dt.currentTime=Ne*dt.duration)}}),N!=="tube"&&D.jsxs("div",{className:"deck-time",children:[D.jsx("data",{ref:p,children:"0:00"}),D.jsx("data",{ref:m,children:"0:00"})]}),D.jsx("div",{className:`railfold${N!=="mic"?" open":""}`,children:D.jsxs("div",{className:`transport${N==="tube"?" no-pitch":""}`,children:[D.jsx("button",{className:"t-btn",onClick:()=>{var ne,Ne;const F=Ht.current;if(F){if(F.kind==="tube"){Ze!=null&&Ze.playing?(ne=Se.current)==null||ne.pause():(Ne=Se.current)==null||Ne.play();return}if(F.kind==="stems"){const K=De.current;K&&(K.playing?K.pause():K.play());return}F.el.paused?F.el.play():F.el.pause()}},children:N==="tube"?Ze!=null&&Ze.playing?"pause":"play":G?"play":"pause"}),D.jsx("button",{className:"t-btn",onClick:()=>{var ne;const F=Ht.current;if(F){if(F.kind==="tube"){(ne=Se.current)==null||ne.next();return}F.kind==="radio"?F.next():F.playRadio()}},children:N==="file"||N==="stems"?"radio":"skip"}),D.jsx("button",{className:`t-btn t-mute${ae?" on":""}`,"aria-pressed":ae,onClick:()=>{var ne,Ne,K,dt;const F=!ae;if(H(F),((ne=Ht.current)==null?void 0:ne.kind)==="tube"){F?(Ne=Se.current)==null||Ne.mute():(K=Se.current)==null||K.unMute();return}(dt=Ht.current)==null||dt.setMuted(F)},children:ae?"muted":"mute"}),D.jsxs("div",{className:"vol",children:[D.jsx("span",{children:"vol"}),D.jsx("input",{type:"range",min:0,max:1,step:.01,value:de,onChange:F=>{var Ne,K;const ne=Number(F.target.value);xe(ne),((Ne=Ht.current)==null?void 0:Ne.kind)==="tube"&&((K=Se.current)==null||K.setVolume(ne))},"aria-label":"volume"})]}),N!=="tube"&&D.jsxs("label",{className:"dial dial-pitch",children:[D.jsx("span",{children:"pitch"}),D.jsx("input",{type:"range",min:.5,max:1.5,step:.01,value:me,onChange:F=>ye(Number(F.target.value)),onDoubleClick:()=>ye(1),"aria-label":"pitch (playback speed, bends like vinyl)"}),D.jsx("data",{className:me!==1?"armed":"",children:Math.round(me*100)})]})]})}),D.jsxs("div",{className:`railfold${(N==="radio"||N==="file")&&x?" open":""}`,children:[D.jsx("button",{className:"deck-split",onClick:()=>{Fe||rt()},"aria-disabled":!!Fe,"aria-busy":!!Fe,children:Fe??"split into stems"}),D.jsx("span",{className:"sr-only",role:"status",children:Fe??""})]})]}),D.jsx("div",{className:`railfold${N==="tube"?" open":""}`,children:D.jsxs("div",{className:"tube rail-sec",style:{"--i":2},children:[D.jsxs("h2",{className:"cn-mod sub",children:[D.jsx("span",{children:"01.1 · jukebox"}),D.jsxs("button",{className:"cn-mod-back",onClick:Ye,children:["← ",nt??"radio"]})]}),D.jsxs("div",{className:"vibe tube-paste",children:[D.jsx("input",{value:dn,onChange:F=>{Un(F.target.value),F.target.value.trim()||(b.current++,nn(null),U(!1))},placeholder:"search youtube, or paste a link…","aria-label":"search youtube, or paste a link",autoComplete:"off",spellCheck:!1,onKeyDown:F=>{F.key==="Enter"&&oe()}}),D.jsx("button",{onClick:()=>void oe(),children:"go"})]}),D.jsx("div",{className:"tube-listen",children:Ot?D.jsxs(D.Fragment,{children:[D.jsxs("div",{className:"pl-row",children:[D.jsx("span",{className:"k",children:"//listening_"}),Ln==="silent"?D.jsx("span",{className:"v sig-silent",children:"no audio"}):D.jsx("span",{className:"v listening-dot",children:"this tab"})]}),Ln==="silent"&&D.jsxs("p",{className:"cn-hint tube-step",role:"status",children:["this tab is shared but no sound is coming through. stop, share again, and tick ",D.jsx("b",{children:"also share tab audio"})," in the chrome dialog. it is off by default."]}),D.jsx("div",{className:"cells c1",children:D.jsx("button",{onClick:Ve,children:"stop listening"})})]}):D.jsxs(D.Fragment,{children:[!Xt&&D.jsxs("p",{className:"cn-hint",children:["reads this tab's levels, nothing else. tick"," ",D.jsx("b",{children:"also share tab audio"})," in chrome's dialog."]}),D.jsx("div",{className:"cells c1",children:D.jsx("button",{onClick:()=>void at(),children:"let the star listen"})}),Dn&&D.jsx("p",{className:"cn-hint tube-step sig-silent",role:"status",children:Dn})]})}),(Ze==null?void 0:Ze.title)&&D.jsxs("div",{className:"pl-row",children:[D.jsx("span",{className:"k",children:"//track_"}),D.jsx("span",{className:"v",children:Ze.title})]}),(Ze==null?void 0:Ze.channel)&&D.jsxs("div",{className:"pl-row",children:[D.jsx("span",{className:"k",children:"//channel_"}),D.jsx("span",{className:"v",children:Ze.channel})]}),Ze&&Ze.duration>0&&D.jsxs("div",{className:"pl-row",children:[D.jsx("span",{className:"k",children:sl(Ze.elapsed)}),D.jsx("span",{className:"v",children:sl(Ze.duration)})]}),D.jsx("div",{className:"cn-hint tube-or",children:an?"looking…":j===null?"or start here":j.length?`${j.length} found · clear to go back`:"nothing found · clear to go back"}),D.jsx("div",{className:"tube-list",children:(j??tS.slice(0,3)).map(F=>D.jsxs("button",{className:(Ze==null?void 0:Ze.videoId)===F.id?"on":"",onClick:()=>{var ne;return(ne=Se.current)==null?void 0:ne.load(F.id)},children:[D.jsx("span",{children:F.title}),D.jsx("i",{children:F.channel})]},F.id))})]})}),D.jsxs("h2",{className:"cn-mod",children:[D.jsx("span",{children:"02 · feed"}),D.jsx("i",{children:"//source_"})]}),D.jsxs("div",{className:"rail-src rail-sec",role:"radiogroup","aria-label":"audio source",style:{"--i":2},children:[D.jsx("button",{role:"radio","aria-checked":N==="radio",className:N==="radio"?"on":"",onClick:()=>{var F;return void((F=Ht.current)==null?void 0:F.playRadio())},children:D.jsx(_r,{text:"radio",duration:380,replayOnHover:!0})}),D.jsx("button",{role:"radio","aria-checked":N==="file",className:N==="file"?"on":"",onClick:()=>{var F;return(F=o.current)==null?void 0:F.click()},children:D.jsx(_r,{text:"file",duration:380,replayOnHover:!0})}),D.jsx("button",{role:"radio","aria-checked":N==="mic",className:N==="mic"?"on":"",onClick:()=>{var F;return void((F=Ht.current)==null?void 0:F.useMic())},children:D.jsx(_r,{text:"mic",duration:380,replayOnHover:!0})}),D.jsx("button",{role:"radio","aria-checked":N==="tube",className:N==="tube"?"on":"",onClick:()=>void le(),children:D.jsx(_r,{text:"jukebox",duration:380,replayOnHover:!0})})]}),D.jsx("div",{className:`railfold${N==="radio"?" open":""}`,children:D.jsxs("div",{className:"tuner rail-sec",style:{"--i":3},children:[D.jsxs("form",{className:"vibe tuner-find",onSubmit:F=>{F.preventDefault(),st(qe)},children:[D.jsx("input",{value:qe,onChange:F=>ke(F.target.value),placeholder:"set your vibe · or name an artist…","aria-label":"set your vibe",autoComplete:"off",spellCheck:!1}),D.jsx("button",{type:"submit","aria-label":"set vibe",children:"go"})]}),D.jsx("div",{className:"tuner-chips",children:["late night drive","gym rage","rainy study","rooftop sunset"].map(F=>D.jsx("button",{onClick:()=>{ke(F),st(F)},children:F},F))}),D.jsx("span",{className:"tuner-state",role:"status",children:_t==="loading"?"reading the vibe …":_t==="empty"?"nothing playable on audius for that":ht??"streaming from audius · artist-owned"}),_t==="empty"&&D.jsx("div",{className:"cells c1",children:D.jsx("button",{onClick:()=>void le(),children:"try the jukebox instead"})})]})}),D.jsxs("h2",{className:"cn-mod",children:[D.jsx("span",{children:"03 · layers"}),D.jsx("i",{children:N==="tube"?"//meters only_":"//6 rings_"})]}),N==="tube"&&Qe&&D.jsx("p",{className:"cn-hint",children:"the meters are live. the faders are not: youtube owns the sound in jukebox mode, so moving them would change nothing."}),!Qe&&D.jsx("p",{className:"cn-hint",children:"pull the star apart (or press d) to mix its rings"}),D.jsx("div",{ref:on,className:`railfold${Qe?" open":""}`,children:D.jsx("div",{className:"layers rail-sec",style:{"--i":4},children:(Qe??xi.current??[]).map(F=>D.jsxs("div",{className:`layer${F.muted?" layer-muted":""}${F.solo?" layer-solo":""}${F.hot?" layer-hot":""}`,onMouseEnter:()=>{var ne;return(ne=Yi.current)==null?void 0:ne.hover(F.i)},onMouseLeave:()=>{var ne;return(ne=Yi.current)==null?void 0:ne.hover(-1)},children:[D.jsxs("span",{className:"layer-name",children:[String(F.i+1).padStart(2,"0")," ",F.label,D.jsx("i",{className:"layer-meter",children:Array.from({length:8},(ne,Ne)=>D.jsx("b",{className:Ne<Math.round(Math.min(1,F.level)*8)?"on":""},Ne))})]}),D.jsx("input",{type:"range",min:0,max:2,step:.01,value:F.gain,onChange:ne=>{var Ne;return(Ne=Yi.current)==null?void 0:Ne.gain(F.i,Number(ne.target.value))},onDoubleClick:()=>{var ne;return(ne=Yi.current)==null?void 0:ne.gain(F.i,1)},"aria-label":`${F.label} level`,disabled:N==="tube"}),D.jsx("button",{className:`layer-btn${F.solo?" on":""}`,"aria-label":`solo ${F.label}`,"aria-pressed":F.solo,disabled:N==="tube",onClick:()=>{var ne;return(ne=Yi.current)==null?void 0:ne.solo(F.i)},children:D.jsx("span",{"aria-hidden":"true",children:"s"})}),D.jsx("button",{className:`layer-btn layer-btn-m${F.muted?" on":""}`,"aria-label":`mute ${F.label}`,"aria-pressed":F.muted,disabled:N==="tube",onClick:()=>{var ne;return(ne=Yi.current)==null?void 0:ne.mute(F.i)},children:D.jsx("span",{"aria-hidden":"true",children:"m"})})]},F.i))})}),D.jsxs("h2",{className:"cn-mod",children:[D.jsx("span",{children:"04 · visuals"}),D.jsx("i",{children:"//3 dials_"})]}),D.jsx("div",{className:"tuning rail-sec",style:{"--i":5},children:D.jsx("div",{className:"pl-dials console-dials",children:[["turb","turb"],["expo","expo"],["spin","spin"]].map(([F,ne])=>D.jsx(Lf,{v:_e[F],cap:ne,onChange:Ne=>Ae(K=>({...K,[F]:Ne(K[F])}))},F))})}),D.jsxs("div",{className:"rail-foot rail-sec",style:{"--i":7},children:[D.jsxs("div",{className:"chips","aria-live":"off",children:[D.jsx("span",{ref:Ja,className:"chip"}),D.jsx("span",{ref:$a,className:"chip"}),D.jsx("span",{ref:la,className:"chip"}),D.jsx("span",{ref:ji,className:"chip"})]}),N!=="stems"&&D.jsx("span",{className:"stemhint",children:"have stems? drop them together (vocals·drums·bass). split any track locally with stemdeck"})]})]}),D.jsxs("div",{className:"rail-dock",children:[D.jsxs("h2",{className:"cn-mod",children:[D.jsx("span",{children:"05 · spectrum"}),D.jsx("i",{children:"//24 bands_"})]}),D.jsxs("div",{className:"spec rail-sec",style:{"--i":6},children:[D.jsx("canvas",{ref:n,width:400,height:144,"aria-hidden":"true"}),D.jsxs("div",{className:"spec-hz",children:[D.jsx("span",{children:"60"}),D.jsx("span",{children:"250"}),D.jsx("span",{children:"1k"}),D.jsx("span",{children:"4k"}),D.jsx("span",{children:"12k"})]})]}),D.jsxs("div",{className:"level",children:[D.jsx("span",{className:"level-tag",children:"level"}),D.jsx("div",{ref:Aa,className:"level-meter","aria-hidden":"true",children:Array.from({length:12},(F,ne)=>D.jsx("i",{},ne))})]})]}),D.jsx("i",{ref:re,className:"railbar","aria-hidden":"true",children:D.jsx("i",{})})]}),D.jsxs("div",{className:"cn-stage",children:[D.jsx("i",{className:"cn-brk tl"}),D.jsx("i",{className:"cn-brk tr"}),D.jsx("i",{className:"cn-brk bl"}),D.jsx("i",{className:"cn-brk br"}),N==="tube"&&D.jsx("div",{ref:Re,className:"tube-host","aria-hidden":"true",inert:!0})]})]}),D.jsxs("footer",{className:"pl-ftr cn-ftr",children:[D.jsxs("span",{children:[D.jsx("span",{className:"pl-meta",children:"/ webgl · 108k particles"}),D.jsxs("span",{className:"pl-by",children:[D.jsx(Jx,{})," made by noon"]})]}),D.jsx("span",{children:"/ grab the star to mix · [?] for the full legend"}),D.jsxs("span",{className:"diag",children:[D.jsxs("button",{className:"diag-toggle",onClick:()=>te(F=>!F),"aria-expanded":k,children:["diag ",k?"[-]":"[+]"]}),k&&D.jsx("samp",{ref:ca,className:"diag-line",children:"fps -- · worst -- · pts -- · quality --"})]})]})]}),d&&z&&D.jsx("div",{className:"announce","aria-hidden":"true",children:D.jsx("span",{className:"announce-title",children:D.jsx(_r,{text:kp(z.text,28).toUpperCase(),duration:900})})},z.key),D.jsx("input",{ref:o,type:"file",accept:"audio/*",hidden:!0,onChange:F=>{var Ne,K;const ne=(Ne=F.target.files)==null?void 0:Ne[0];if(ne){Tt.current=!0,v(!0),window.__focus(),(K=Bn.current)==null||K.powerOn();const dt=Ht.current;if(dt){dt.playFile(ne);const et=++ce.current;Z(!0),Hx(ne,dt.ctx).then(Je=>{ce.current===et&&(W.current=Je,Z(!1))})}}F.target.value=""}}),d&&ze&&D.jsx(GR,{ops:Ds.current,onDone:()=>Me(!1)}),D.jsx("div",{className:"scanlines"}),D.jsx("div",{className:"grain"})]})}const Qx=(()=>{const r="..-.-.--..-.--..-.-..--.-.-..--..-.-.",e=[];let n=0;for(const a of r){const o=a==="-"?16:4;e.push({x:n,w:o}),n+=o+8}return{rects:e,total:n-8}})(),R3=[{ix:"01",n:"src",d:"radio · file · mic",i:"the audio you feed it: radio, a file, or the mic"},{ix:"02",n:"eq",d:"3 shelves",i:"three shelves, the ones the orb bends when you grab it"},{ix:"03",n:"tiers",d:"6 peaking",i:"six peaking filters, one per dissection ring"},{ix:"04",n:"filter",d:"hp / lp",i:"the colour sweep: high-pass left, low-pass right"},{ix:"05",n:"echo",d:"parallel loop",i:"a tempo-locked delay with feedback, sent in parallel"},{ix:"06",n:"analyser",d:"24 bands",i:"24 log bands: everything the star sees"},{ix:"",n:"star",d:"visuals tap here",sub:!0,i:"the visuals read the analyser, never the output: mute keeps the star dancing"},{ix:"07",n:"out",d:"master gain",i:"master gain, and the node that mute silences"}];function Jx(){return null}let Oc="225, 59, 42",ml="192, 198, 214",nS="rgba(141, 144, 168, 0.68)";function C3(){const r=getComputedStyle(document.documentElement),e=r.getPropertyValue("--accent-rgb").trim();e&&(Oc=e);const n=r.getPropertyValue("--ink-rgb").trim();n&&(ml=n);const a=r.getPropertyValue("--pl-line").trim();a&&(nS=a)}function $x({className:r}){return D.jsx("svg",{className:r,width:"13",height:"13","aria-hidden":"true",children:D.jsxs("g",{stroke:"var(--accent)",strokeWidth:"1",children:[D.jsx("line",{x1:"6.5",y1:"0",x2:"6.5",y2:"13"}),D.jsx("line",{x1:"0",y1:"6.5",x2:"13",y2:"6.5"})]})})}function D3(){return D.jsxs("svg",{width:"86",height:"9","aria-hidden":"true",children:[D.jsx("g",{fill:"var(--ink)",children:[0,10,20,30,40].map(r=>D.jsx("rect",{x:r,y:"0",width:"7",height:"9"},r))}),D.jsx("g",{fill:"none",stroke:"currentColor",children:[50.5,60.5,70.5,79.5].map(r=>D.jsx("rect",{x:r,y:".5",width:"6",height:"8"},r))})]})}const N3=38,L3=267,ey=(r,e)=>[21+Math.sin(r*Math.PI/180)*e,21-Math.cos(r*Math.PI/180)*e],U3=(()=>{const[r,e]=ey(N3,13),[n,a]=ey(L3,13);return`M ${r.toFixed(2)} ${e.toFixed(2)} A 13 13 0 1 1 ${n.toFixed(2)} ${a.toFixed(2)}`})(),wc=.25,Nf=2;function Lf({v:r,cap:e,onChange:n}){const a=Pe.useRef(null),o=p=>Math.max(wc,Math.min(Nf,p)),c=(-135+(r-wc)/(Nf-wc)*270)*Math.PI/180,u=p=>n(m=>o(Number((m+p).toFixed(2))));return D.jsxs("div",{className:"pl-dial",role:"slider",tabIndex:0,"aria-label":e,"aria-valuemin":wc,"aria-valuemax":Nf,"aria-valuenow":Number(r.toFixed(2)),"aria-valuetext":`${e} ${Math.round(r*100)}`,onPointerDown:p=>{p.currentTarget.setPointerCapture(p.pointerId),a.current={y:p.clientY,v:r}},onPointerMove:p=>{const m=a.current;if(!m)return;const d=o(m.v+(m.y-p.clientY)/200*(Nf-wc));n(()=>d)},onPointerUp:p=>{a.current=null,p.currentTarget.releasePointerCapture(p.pointerId)},onDoubleClick:()=>n(()=>1),onKeyDown:p=>{const m=p.shiftKey?.25:.05;p.key==="ArrowUp"||p.key==="ArrowRight"?(p.preventDefault(),u(m)):p.key==="ArrowDown"||p.key==="ArrowLeft"?(p.preventDefault(),u(-m)):p.key==="Home"&&(p.preventDefault(),n(()=>1))},children:[D.jsxs("svg",{width:"42",height:"42",viewBox:"0 0 42 42","aria-hidden":"true",children:[D.jsx("rect",{x:".5",y:".5",width:"41",height:"41",fill:"none",stroke:"currentColor",opacity:".5"}),D.jsx("path",{d:U3,fill:"none",stroke:"currentColor"}),D.jsx("line",{x1:"21",y1:"21",x2:(21+Math.sin(c)*12).toFixed(1),y2:(21-Math.cos(c)*12).toFixed(1),stroke:"var(--ink)",strokeWidth:"1.5"}),D.jsx("circle",{cx:"21",cy:"21",r:"1.6",fill:"var(--accent)"})]}),D.jsxs("span",{className:"cap",children:[e," ",D.jsx("b",{children:Math.round(r*100)})]})]})}function O3(){return D.jsx("svg",{width:"100%",height:"12",preserveAspectRatio:"none",viewBox:"0 0 280 12","aria-hidden":"true",children:D.jsxs("g",{stroke:"currentColor",children:[D.jsx("line",{x1:"0",y1:"11.5",x2:"280",y2:"11.5",opacity:".5"}),[1,36,71,106,141,176,211,246,279].map((r,e)=>D.jsx("line",{x1:r,y1:e%3===0?3:7,x2:r,y2:"11"},r))]})})}function P3(r){return r>=1e3?`${(r/1e3).toFixed(r<1e4?1:0)}k`:`${Math.round(r)}hz`}function F3(r,e,n){if(!r)return;const a=r.getContext("2d"),o=r.clientWidth,c=r.clientHeight;if(!a||o<2||c<2)return;const u=Math.min(2,window.devicePixelRatio||1);(r.width!==o*u||r.height!==c*u)&&(r.width=o*u,r.height=c*u),a.setTransform(u,0,0,u,0,0),a.clearRect(0,0,o,c);const p=c/2,m=e.length;for(let d=0;d<o;d++){const v=e[(n+Math.floor(d/o*m))%m],_=.62+.38*Math.sin(d*.7)*Math.cos(d*.13),g=Math.max(.5,v*_*(c*.46)),M=.28+.72*Math.pow(v,.6);a.fillStyle=`rgba(234,234,239,${(M*(.4+Math.random()*.6)).toFixed(3)})`,a.fillRect(d,p-g,1,g*2),Math.random()<v*.5&&(a.fillStyle=`rgba(234,234,239,${(M*.5).toFixed(3)})`,a.fillRect(d,p-g*1.5,1,g*.4))}}function B3(r,e,n,a,o){const c=r==null?void 0:r.getContext("2d");if(!r||!c)return;const u=Math.min(2,window.devicePixelRatio||1),p=Math.max(1,Math.round(r.clientWidth*u)),m=Math.max(1,Math.round(r.clientHeight*u));(r.width!==p||r.height!==m)&&(r.width=p,r.height=m),c.clearRect(0,0,r.width,r.height);const d=r.width,v=r.height,_=2,g=Math.round((v-_)/2),M=Math.round(Math.max(0,Math.min(1,o))*d);c.fillStyle=nS,c.fillRect(0,g,d,_),c.fillStyle=`rgba(${ml}, 0.92)`,c.fillRect(0,g,M,_),c.fillStyle=`rgba(${Oc},1)`,c.fillRect(Math.min(M,d-_),0,_,v)}function z3(r,e,n,a,o,c,u,p=!1){const m=r==null?void 0:r.getContext("2d");if(!r||!m)return;const d=Math.min(2,window.devicePixelRatio||1),v=r.width/d,_=r.height/d;m.setTransform(d,0,0,d,0,0),m.clearRect(0,0,v,_);const g=e.dissect;if(p&&g<.5){const G=.55*(1-g*2),Y=e.projectLocal(0,.78,0),de=e.projectLocal(0,-.78,0);m.strokeStyle=`rgba(${ml},${G})`,m.lineWidth=1,m.setLineDash([3,6]),m.beginPath(),m.moveTo(Y.x,Y.y),m.lineTo(de.x,de.y),m.stroke(),m.setLineDash([]),m.fillStyle=`rgba(${Oc},${Math.min(1,G+.25)})`,m.beginPath(),m.moveTo(Y.x-4,Y.y-6),m.lineTo(Y.x+4,Y.y-6),m.lineTo(Y.x,Y.y-13),m.closePath(),m.fill(),m.beginPath(),m.moveTo(de.x-4,de.y+6),m.lineTo(de.x+4,de.y+6),m.lineTo(de.x,de.y+13),m.closePath(),m.fill()}const M=Math.max(0,Math.min(1,(g-.25)/.55));if(M<=.01)return;const E=n.length,C=G=>`rgba(${ml},${G*M})`,y=G=>`rgba(${Oc},${G*M})`;m.textBaseline="middle",m.lineWidth=1;const x=e.surveyPoint(E-1,0,0),O=e.surveyPoint(0,0,0);m.strokeStyle=C(.5),m.beginPath(),m.moveTo(O.x,O.y+30),m.lineTo(x.x,x.y-30),m.stroke();const N=8;let R=0;for(let G=0;G<E;G++){const Y=e.surveyPoint(G,0,0),de=e.surveyPoint(G,0,1),xe=e.surveyPoint(G,Math.PI/2,1);R=Math.max(R,Y.x+Math.max(Math.hypot(de.x-Y.x,de.y-Y.y),Math.hypot(xe.x-Y.x,xe.y-Y.y)))}R=Math.min(v-128,R+16);for(let G=0;G<E;G++){const Y=o.solo===G,de=!!o.muted[G],xe=e.hiTier===G;m.strokeStyle=Y?y(.8):C(xe?.85:de?.14:.38),m.beginPath();for(let k=0;k<=48;k++){const te=e.surveyPoint(G,k/48*Math.PI*2);k===0?m.moveTo(te.x,te.y):m.lineTo(te.x,te.y)}m.stroke(),m.strokeStyle=Y?y(.4):C(de?.08:.2),m.beginPath();for(let k=0;k<=36;k++){const te=e.surveyPoint(G,k/36*Math.PI*2,.46);k===0?m.moveTo(te.x,te.y):m.lineTo(te.x,te.y)}if(m.stroke(),G>0){const k=e.tierYNow(0)-(E>1?(e.tierYFull(1)-e.tierYFull(0))*.5:.3),te=.88*.56*e.ringProfile(G);m.strokeStyle=C(.22),m.setLineDash([2,5]);for(let _e=0;_e<N;_e+=2){const Ae=_e/N*Math.PI*2,P=e.surveyPoint(G,Ae),Q=e.projectLocal(Math.cos(Ae)*te,k,Math.sin(Ae)*te);m.beginPath(),m.moveTo(P.x,P.y),m.lineTo(Q.x,Q.y),m.stroke()}m.setLineDash([])}m.fillStyle=C(de?.22:.7);for(let k=0;k<N;k++){const te=e.surveyPoint(G,k/N*Math.PI*2);m.fillRect(te.x-1.5,te.y-1.5,3,3)}const ae=e.surveyPoint(G,0,0),H=R;m.font='bold 10px "JetBrains Mono", ui-monospace, monospace',m.fillStyle=Y?y(.95):de?y(.75):C(xe?1:.9),m.fillText(`0${G+1} · ${n[G].label.toUpperCase()}`,H,ae.y-7),m.font='9px "JetBrains Mono", ui-monospace, monospace',m.fillStyle=de?y(.6):Y?y(.7):C(.55),m.fillText(de?"MUTED":Y?"SOLO":`LVL ${String(Math.round(a[G]*99)).padStart(2,"0")}`,H,ae.y+6),m.fillStyle=Y?y(.8):C(.8),m.fillRect(H,ae.y+13,Math.max(1,a[G]*46),2)}const I=E>1?e.tierYFull(1)-e.tierYFull(0):.7,L=e.tierYNow(0)-I*.75*g,z=.88*.56*.34;m.strokeStyle=C(.42),m.beginPath();for(let G=0;G<=32;G++){const Y=G/32*Math.PI*2,de=e.projectLocal(Math.cos(Y)*z,L,Math.sin(Y)*z);G===0?m.moveTo(de.x,de.y):m.lineTo(de.x,de.y)}m.stroke();const T=performance.now()*.0011,B=e.projectLocal(Math.cos(T)*z,L,Math.sin(T)*z);m.fillStyle=y(.55+Math.min(.45,c)),m.fillRect(B.x-2,B.y-2,4,4);const Z=e.projectLocal(0,L,0);m.font='9px "JetBrains Mono", ui-monospace, monospace',m.fillStyle=C(.6),m.fillText(`SUM ${String(Math.round(Math.min(1,u)*99)).padStart(2,"0")}`,Z.x+12,Z.y)}const qp=new Float32Array(24),Uf=new Float32Array(24);function I3(r,e,n=null,a=0){const o=r==null?void 0:r.getContext("2d");if(!r||!o)return;o.clearRect(0,0,r.width,r.height);const c=e.length,u=r.width/c;for(let p=0;p<c;p++){const m=Math.min(1,e[p]*1.25);Uf[p]+=(m-Uf[p])*(m>Uf[p]?.55:.18);const d=Uf[p];qp[p]=Math.max(d,qp[p]-.012);const v=d*(r.height-4);o.fillStyle=`rgba(${ml},0.88)`,n!=null&&(n==="low"?p<8:n==="mid"?p>=8&&p<16:p>=16)&&(o.fillStyle=`rgba(${Oc},${.45+Math.min(.55,Math.abs(a)/30)})`),o.fillRect(p*u+1,r.height-v,u-2,v);const _=r.height-qp[p]*(r.height-4);o.fillStyle=`rgba(${ml},0.35)`,o.fillRect(p*u+1,_-2,u-2,2)}}C3();OM.createRoot(document.getElementById("root")).render(D.jsx(w3,{}));
