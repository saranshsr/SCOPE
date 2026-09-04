var yM=Object.defineProperty;var SM=(r,e,n)=>e in r?yM(r,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[e]=n;var se=(r,e,n)=>SM(r,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();var Gd={exports:{}},ec={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var h_;function MM(){if(h_)return ec;h_=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function n(a,o,c){var u=null;if(c!==void 0&&(u=""+c),o.key!==void 0&&(u=""+o.key),"key"in o){c={};for(var d in o)d!=="key"&&(c[d]=o[d])}else c=o;return o=c.ref,{$$typeof:r,type:a,key:u,ref:o!==void 0?o:null,props:c}}return ec.Fragment=e,ec.jsx=n,ec.jsxs=n,ec}var d_;function bM(){return d_||(d_=1,Gd.exports=MM()),Gd.exports}var D=bM(),kd={exports:{}},tc={},Vd={exports:{}},Xd={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p_;function EM(){return p_||(p_=1,(function(r){function e(H,k){var ne=H.length;H.push(k);e:for(;0<ne;){var ve=ne-1>>>1,Re=H[ve];if(0<o(Re,k))H[ve]=k,H[ne]=Re,ne=ve;else break e}}function n(H){return H.length===0?null:H[0]}function a(H){if(H.length===0)return null;var k=H[0],ne=H.pop();if(ne!==k){H[0]=ne;e:for(var ve=0,Re=H.length,F=Re>>>1;ve<F;){var Q=2*(ve+1)-1,Ne=H[Q],ze=Q+1,Ze=H[ze];if(0>o(Ne,ne))ze<Re&&0>o(Ze,Ne)?(H[ve]=Ze,H[ze]=ne,ve=ze):(H[ve]=Ne,H[Q]=ne,ve=Q);else if(ze<Re&&0>o(Ze,ne))H[ve]=Ze,H[ze]=ne,ve=ze;else break e}}return k}function o(H,k){var ne=H.sortIndex-k.sortIndex;return ne!==0?ne:H.id-k.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var u=Date,d=u.now();r.unstable_now=function(){return u.now()-d}}var m=[],p=[],v=1,_=null,g=3,M=!1,E=!1,R=!1,y=!1,x=typeof setTimeout=="function"?setTimeout:null,P=typeof clearTimeout=="function"?clearTimeout:null,N=typeof setImmediate<"u"?setImmediate:null;function C(H){for(var k=n(p);k!==null;){if(k.callback===null)a(p);else if(k.startTime<=H)a(p),k.sortIndex=k.expirationTime,e(m,k);else break;k=n(p)}}function I(H){if(R=!1,C(H),!E)if(n(m)!==null)E=!0,O||(O=!0,Y());else{var k=n(p);k!==null&&ae(I,k.startTime-H)}}var O=!1,z=-1,T=5,B=-1;function K(){return y?!0:!(r.unstable_now()-B<T)}function G(){if(y=!1,O){var H=r.unstable_now();B=H;var k=!0;try{e:{E=!1,R&&(R=!1,P(z),z=-1),M=!0;var ne=g;try{t:{for(C(H),_=n(m);_!==null&&!(_.expirationTime>H&&K());){var ve=_.callback;if(typeof ve=="function"){_.callback=null,g=_.priorityLevel;var Re=ve(_.expirationTime<=H);if(H=r.unstable_now(),typeof Re=="function"){_.callback=Re,C(H),k=!0;break t}_===n(m)&&a(m),C(H)}else a(m);_=n(m)}if(_!==null)k=!0;else{var F=n(p);F!==null&&ae(I,F.startTime-H),k=!1}}break e}finally{_=null,g=ne,M=!1}k=void 0}}finally{k?Y():O=!1}}}var Y;if(typeof N=="function")Y=function(){N(G)};else if(typeof MessageChannel<"u"){var de=new MessageChannel,Se=de.port2;de.port1.onmessage=G,Y=function(){Se.postMessage(null)}}else Y=function(){x(G,0)};function ae(H,k){z=x(function(){H(r.unstable_now())},k)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(H){H.callback=null},r.unstable_forceFrameRate=function(H){0>H||125<H?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<H?Math.floor(1e3/H):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(H){switch(g){case 1:case 2:case 3:var k=3;break;default:k=g}var ne=g;g=k;try{return H()}finally{g=ne}},r.unstable_requestPaint=function(){y=!0},r.unstable_runWithPriority=function(H,k){switch(H){case 1:case 2:case 3:case 4:case 5:break;default:H=3}var ne=g;g=H;try{return k()}finally{g=ne}},r.unstable_scheduleCallback=function(H,k,ne){var ve=r.unstable_now();switch(typeof ne=="object"&&ne!==null?(ne=ne.delay,ne=typeof ne=="number"&&0<ne?ve+ne:ve):ne=ve,H){case 1:var Re=-1;break;case 2:Re=250;break;case 5:Re=1073741823;break;case 4:Re=1e4;break;default:Re=5e3}return Re=ne+Re,H={id:v++,callback:k,priorityLevel:H,startTime:ne,expirationTime:Re,sortIndex:-1},ne>ve?(H.sortIndex=ne,e(p,H),n(m)===null&&H===n(p)&&(R?(P(z),z=-1):R=!0,ae(I,ne-ve))):(H.sortIndex=Re,e(m,H),E||M||(E=!0,O||(O=!0,Y()))),H},r.unstable_shouldYield=K,r.unstable_wrapCallback=function(H){var k=g;return function(){var ne=g;g=k;try{return H.apply(this,arguments)}finally{g=ne}}}})(Xd)),Xd}var m_;function TM(){return m_||(m_=1,Vd.exports=EM()),Vd.exports}var qd={exports:{}},Rt={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var g_;function AM(){if(g_)return Rt;g_=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),u=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),g=Symbol.iterator;function M(F){return F===null||typeof F!="object"?null:(F=g&&F[g]||F["@@iterator"],typeof F=="function"?F:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},R=Object.assign,y={};function x(F,Q,Ne){this.props=F,this.context=Q,this.refs=y,this.updater=Ne||E}x.prototype.isReactComponent={},x.prototype.setState=function(F,Q){if(typeof F!="object"&&typeof F!="function"&&F!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,F,Q,"setState")},x.prototype.forceUpdate=function(F){this.updater.enqueueForceUpdate(this,F,"forceUpdate")};function P(){}P.prototype=x.prototype;function N(F,Q,Ne){this.props=F,this.context=Q,this.refs=y,this.updater=Ne||E}var C=N.prototype=new P;C.constructor=N,R(C,x.prototype),C.isPureReactComponent=!0;var I=Array.isArray;function O(){}var z={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function B(F,Q,Ne){var ze=Ne.ref;return{$$typeof:r,type:F,key:Q,ref:ze!==void 0?ze:null,props:Ne}}function K(F,Q){return B(F.type,Q,F.props)}function G(F){return typeof F=="object"&&F!==null&&F.$$typeof===r}function Y(F){var Q={"=":"=0",":":"=2"};return"$"+F.replace(/[=:]/g,function(Ne){return Q[Ne]})}var de=/\/+/g;function Se(F,Q){return typeof F=="object"&&F!==null&&F.key!=null?Y(""+F.key):Q.toString(36)}function ae(F){switch(F.status){case"fulfilled":return F.value;case"rejected":throw F.reason;default:switch(typeof F.status=="string"?F.then(O,O):(F.status="pending",F.then(function(Q){F.status==="pending"&&(F.status="fulfilled",F.value=Q)},function(Q){F.status==="pending"&&(F.status="rejected",F.reason=Q)})),F.status){case"fulfilled":return F.value;case"rejected":throw F.reason}}throw F}function H(F,Q,Ne,ze,Ze){var re=typeof F;(re==="undefined"||re==="boolean")&&(F=null);var Me=!1;if(F===null)Me=!0;else switch(re){case"bigint":case"string":case"number":Me=!0;break;case"object":switch(F.$$typeof){case r:case e:Me=!0;break;case v:return Me=F._init,H(Me(F._payload),Q,Ne,ze,Ze)}}if(Me)return Ze=Ze(F),Me=ze===""?"."+Se(F,0):ze,I(Ze)?(Ne="",Me!=null&&(Ne=Me.replace(de,"$&/")+"/"),H(Ze,Q,Ne,"",function(vt){return vt})):Ze!=null&&(G(Ze)&&(Ze=K(Ze,Ne+(Ze.key==null||F&&F.key===Ze.key?"":(""+Ze.key).replace(de,"$&/")+"/")+Me)),Q.push(Ze)),1;Me=0;var De=ze===""?".":ze+":";if(I(F))for(var nt=0;nt<F.length;nt++)ze=F[nt],re=De+Se(ze,nt),Me+=H(ze,Q,Ne,re,Ze);else if(nt=M(F),typeof nt=="function")for(F=nt.call(F),nt=0;!(ze=F.next()).done;)ze=ze.value,re=De+Se(ze,nt++),Me+=H(ze,Q,Ne,re,Ze);else if(re==="object"){if(typeof F.then=="function")return H(ae(F),Q,Ne,ze,Ze);throw Q=String(F),Error("Objects are not valid as a React child (found: "+(Q==="[object Object]"?"object with keys {"+Object.keys(F).join(", ")+"}":Q)+"). If you meant to render a collection of children, use an array instead.")}return Me}function k(F,Q,Ne){if(F==null)return F;var ze=[],Ze=0;return H(F,ze,"","",function(re){return Q.call(Ne,re,Ze++)}),ze}function ne(F){if(F._status===-1){var Q=F._result;Q=Q(),Q.then(function(Ne){(F._status===0||F._status===-1)&&(F._status=1,F._result=Ne)},function(Ne){(F._status===0||F._status===-1)&&(F._status=2,F._result=Ne)}),F._status===-1&&(F._status=0,F._result=Q)}if(F._status===1)return F._result.default;throw F._result}var ve=typeof reportError=="function"?reportError:function(F){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Q=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof F=="object"&&F!==null&&typeof F.message=="string"?String(F.message):String(F),error:F});if(!window.dispatchEvent(Q))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",F);return}console.error(F)},Re={map:k,forEach:function(F,Q,Ne){k(F,function(){Q.apply(this,arguments)},Ne)},count:function(F){var Q=0;return k(F,function(){Q++}),Q},toArray:function(F){return k(F,function(Q){return Q})||[]},only:function(F){if(!G(F))throw Error("React.Children.only expected to receive a single React element child.");return F}};return Rt.Activity=_,Rt.Children=Re,Rt.Component=x,Rt.Fragment=n,Rt.Profiler=o,Rt.PureComponent=N,Rt.StrictMode=a,Rt.Suspense=m,Rt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=z,Rt.__COMPILER_RUNTIME={__proto__:null,c:function(F){return z.H.useMemoCache(F)}},Rt.cache=function(F){return function(){return F.apply(null,arguments)}},Rt.cacheSignal=function(){return null},Rt.cloneElement=function(F,Q,Ne){if(F==null)throw Error("The argument must be a React element, but you passed "+F+".");var ze=R({},F.props),Ze=F.key;if(Q!=null)for(re in Q.key!==void 0&&(Ze=""+Q.key),Q)!T.call(Q,re)||re==="key"||re==="__self"||re==="__source"||re==="ref"&&Q.ref===void 0||(ze[re]=Q[re]);var re=arguments.length-2;if(re===1)ze.children=Ne;else if(1<re){for(var Me=Array(re),De=0;De<re;De++)Me[De]=arguments[De+2];ze.children=Me}return B(F.type,Ze,ze)},Rt.createContext=function(F){return F={$$typeof:u,_currentValue:F,_currentValue2:F,_threadCount:0,Provider:null,Consumer:null},F.Provider=F,F.Consumer={$$typeof:c,_context:F},F},Rt.createElement=function(F,Q,Ne){var ze,Ze={},re=null;if(Q!=null)for(ze in Q.key!==void 0&&(re=""+Q.key),Q)T.call(Q,ze)&&ze!=="key"&&ze!=="__self"&&ze!=="__source"&&(Ze[ze]=Q[ze]);var Me=arguments.length-2;if(Me===1)Ze.children=Ne;else if(1<Me){for(var De=Array(Me),nt=0;nt<Me;nt++)De[nt]=arguments[nt+2];Ze.children=De}if(F&&F.defaultProps)for(ze in Me=F.defaultProps,Me)Ze[ze]===void 0&&(Ze[ze]=Me[ze]);return B(F,re,Ze)},Rt.createRef=function(){return{current:null}},Rt.forwardRef=function(F){return{$$typeof:d,render:F}},Rt.isValidElement=G,Rt.lazy=function(F){return{$$typeof:v,_payload:{_status:-1,_result:F},_init:ne}},Rt.memo=function(F,Q){return{$$typeof:p,type:F,compare:Q===void 0?null:Q}},Rt.startTransition=function(F){var Q=z.T,Ne={};z.T=Ne;try{var ze=F(),Ze=z.S;Ze!==null&&Ze(Ne,ze),typeof ze=="object"&&ze!==null&&typeof ze.then=="function"&&ze.then(O,ve)}catch(re){ve(re)}finally{Q!==null&&Ne.types!==null&&(Q.types=Ne.types),z.T=Q}},Rt.unstable_useCacheRefresh=function(){return z.H.useCacheRefresh()},Rt.use=function(F){return z.H.use(F)},Rt.useActionState=function(F,Q,Ne){return z.H.useActionState(F,Q,Ne)},Rt.useCallback=function(F,Q){return z.H.useCallback(F,Q)},Rt.useContext=function(F){return z.H.useContext(F)},Rt.useDebugValue=function(){},Rt.useDeferredValue=function(F,Q){return z.H.useDeferredValue(F,Q)},Rt.useEffect=function(F,Q){return z.H.useEffect(F,Q)},Rt.useEffectEvent=function(F){return z.H.useEffectEvent(F)},Rt.useId=function(){return z.H.useId()},Rt.useImperativeHandle=function(F,Q,Ne){return z.H.useImperativeHandle(F,Q,Ne)},Rt.useInsertionEffect=function(F,Q){return z.H.useInsertionEffect(F,Q)},Rt.useLayoutEffect=function(F,Q){return z.H.useLayoutEffect(F,Q)},Rt.useMemo=function(F,Q){return z.H.useMemo(F,Q)},Rt.useOptimistic=function(F,Q){return z.H.useOptimistic(F,Q)},Rt.useReducer=function(F,Q,Ne){return z.H.useReducer(F,Q,Ne)},Rt.useRef=function(F){return z.H.useRef(F)},Rt.useState=function(F){return z.H.useState(F)},Rt.useSyncExternalStore=function(F,Q,Ne){return z.H.useSyncExternalStore(F,Q,Ne)},Rt.useTransition=function(){return z.H.useTransition()},Rt.version="19.2.8",Rt}var v_;function Um(){return v_||(v_=1,qd.exports=AM()),qd.exports}var Wd={exports:{}},xi={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var __;function wM(){if(__)return xi;__=1;var r=Um();function e(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)p+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var a={d:{f:n,r:function(){throw Error(e(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},o=Symbol.for("react.portal");function c(m,p,v){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:_==null?null:""+_,children:m,containerInfo:p,implementation:v}}var u=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return xi.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,xi.createPortal=function(m,p){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(e(299));return c(m,p,null,v)},xi.flushSync=function(m){var p=u.T,v=a.p;try{if(u.T=null,a.p=2,m)return m()}finally{u.T=p,a.p=v,a.d.f()}},xi.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,a.d.C(m,p))},xi.prefetchDNS=function(m){typeof m=="string"&&a.d.D(m)},xi.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var v=p.as,_=d(v,p.crossOrigin),g=typeof p.integrity=="string"?p.integrity:void 0,M=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;v==="style"?a.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:_,integrity:g,fetchPriority:M}):v==="script"&&a.d.X(m,{crossOrigin:_,integrity:g,fetchPriority:M,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},xi.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var v=d(p.as,p.crossOrigin);a.d.M(m,{crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&a.d.M(m)},xi.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var v=p.as,_=d(v,p.crossOrigin);a.d.L(m,v,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},xi.preloadModule=function(m,p){if(typeof m=="string")if(p){var v=d(p.as,p.crossOrigin);a.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else a.d.m(m)},xi.requestFormReset=function(m){a.d.r(m)},xi.unstable_batchedUpdates=function(m,p){return m(p)},xi.useFormState=function(m,p,v){return u.H.useFormState(m,p,v)},xi.useFormStatus=function(){return u.H.useHostTransitionStatus()},xi.version="19.2.8",xi}var x_;function RM(){if(x_)return Wd.exports;x_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Wd.exports=wM(),Wd.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y_;function CM(){if(y_)return tc;y_=1;var r=TM(),e=Um(),n=RM();function a(t){var i="https://react.dev/errors/"+t;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+t+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var i=t,s=t;if(t.alternate)for(;i.return;)i=i.return;else{t=i;do i=t,(i.flags&4098)!==0&&(s=i.return),t=i.return;while(t)}return i.tag===3?s:null}function u(t){if(t.tag===13){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function d(t){if(t.tag===31){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(a(188))}function p(t){var i=t.alternate;if(!i){if(i=c(t),i===null)throw Error(a(188));return i!==t?null:t}for(var s=t,l=i;;){var f=s.return;if(f===null)break;var h=f.alternate;if(h===null){if(l=f.return,l!==null){s=l;continue}break}if(f.child===h.child){for(h=f.child;h;){if(h===s)return m(f),t;if(h===l)return m(f),i;h=h.sibling}throw Error(a(188))}if(s.return!==l.return)s=f,l=h;else{for(var S=!1,w=f.child;w;){if(w===s){S=!0,s=f,l=h;break}if(w===l){S=!0,l=f,s=h;break}w=w.sibling}if(!S){for(w=h.child;w;){if(w===s){S=!0,s=h,l=f;break}if(w===l){S=!0,l=h,s=f;break}w=w.sibling}if(!S)throw Error(a(189))}}if(s.alternate!==l)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?t:i}function v(t){var i=t.tag;if(i===5||i===26||i===27||i===6)return t;for(t=t.child;t!==null;){if(i=v(t),i!==null)return i;t=t.sibling}return null}var _=Object.assign,g=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),x=Symbol.for("react.profiler"),P=Symbol.for("react.consumer"),N=Symbol.for("react.context"),C=Symbol.for("react.forward_ref"),I=Symbol.for("react.suspense"),O=Symbol.for("react.suspense_list"),z=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),B=Symbol.for("react.activity"),K=Symbol.for("react.memo_cache_sentinel"),G=Symbol.iterator;function Y(t){return t===null||typeof t!="object"?null:(t=G&&t[G]||t["@@iterator"],typeof t=="function"?t:null)}var de=Symbol.for("react.client.reference");function Se(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===de?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case R:return"Fragment";case x:return"Profiler";case y:return"StrictMode";case I:return"Suspense";case O:return"SuspenseList";case B:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case E:return"Portal";case N:return t.displayName||"Context";case P:return(t._context.displayName||"Context")+".Consumer";case C:var i=t.render;return t=t.displayName,t||(t=i.displayName||i.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case z:return i=t.displayName||null,i!==null?i:Se(t.type)||"Memo";case T:i=t._payload,t=t._init;try{return Se(t(i))}catch{}}return null}var ae=Array.isArray,H=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ne={pending:!1,data:null,method:null,action:null},ve=[],Re=-1;function F(t){return{current:t}}function Q(t){0>Re||(t.current=ve[Re],ve[Re]=null,Re--)}function Ne(t,i){Re++,ve[Re]=t.current,t.current=i}var ze=F(null),Ze=F(null),re=F(null),Me=F(null);function De(t,i){switch(Ne(re,i),Ne(Ze,t),Ne(ze,null),i.nodeType){case 9:case 11:t=(t=i.documentElement)&&(t=t.namespaceURI)?Pv(t):0;break;default:if(t=i.tagName,i=i.namespaceURI)i=Pv(i),t=Fv(i,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Q(ze),Ne(ze,t)}function nt(){Q(ze),Q(Ze),Q(re)}function vt(t){t.memoizedState!==null&&Ne(Me,t);var i=ze.current,s=Fv(i,t.type);i!==s&&(Ne(Ze,t),Ne(ze,s))}function Ke(t){Ze.current===t&&(Q(ze),Q(Ze)),Me.current===t&&(Q(Me),Kl._currentValue=ne)}var yn,Ut;function It(t){if(yn===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);yn=i&&i[1]||"",Ut=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+yn+t+Ut}var Bt=!1;function zt(t,i){if(!t||Bt)return"";Bt=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(i){var we=function(){throw Error()};if(Object.defineProperty(we.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(we,[])}catch(me){var pe=me}Reflect.construct(t,[],we)}else{try{we.call()}catch(me){pe=me}t.call(we.prototype)}}else{try{throw Error()}catch(me){pe=me}(we=t())&&typeof we.catch=="function"&&we.catch(function(){})}}catch(me){if(me&&pe&&typeof me.stack=="string")return[me.stack,pe.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var f=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");f&&f.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=l.DetermineComponentFrameRoot(),S=h[0],w=h[1];if(S&&w){var V=S.split(`
`),ue=w.split(`
`);for(f=l=0;l<V.length&&!V[l].includes("DetermineComponentFrameRoot");)l++;for(;f<ue.length&&!ue[f].includes("DetermineComponentFrameRoot");)f++;if(l===V.length||f===ue.length)for(l=V.length-1,f=ue.length-1;1<=l&&0<=f&&V[l]!==ue[f];)f--;for(;1<=l&&0<=f;l--,f--)if(V[l]!==ue[f]){if(l!==1||f!==1)do if(l--,f--,0>f||V[l]!==ue[f]){var Ee=`
`+V[l].replace(" at new "," at ");return t.displayName&&Ee.includes("<anonymous>")&&(Ee=Ee.replace("<anonymous>",t.displayName)),Ee}while(1<=l&&0<=f);break}}}finally{Bt=!1,Error.prepareStackTrace=s}return(s=t?t.displayName||t.name:"")?It(s):""}function Rn(t,i){switch(t.tag){case 26:case 27:case 5:return It(t.type);case 16:return It("Lazy");case 13:return t.child!==i&&i!==null?It("Suspense Fallback"):It("Suspense");case 19:return It("SuspenseList");case 0:case 15:return zt(t.type,!1);case 11:return zt(t.type.render,!1);case 1:return zt(t.type,!0);case 31:return It("Activity");default:return""}}function Un(t){try{var i="",s=null;do i+=Rn(t,s),s=t,t=t.return;while(t);return i}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var bn=Object.prototype.hasOwnProperty,Cn=r.unstable_scheduleCallback,fn=r.unstable_cancelCallback,Sn=r.unstable_shouldYield,j=r.unstable_requestPaint,Ht=r.unstable_now,Gt=r.unstable_getCurrentPriorityLevel,U=r.unstable_ImmediatePriority,b=r.unstable_UserBlockingPriority,te=r.unstable_NormalPriority,he=r.unstable_LowPriority,_e=r.unstable_IdlePriority,Pe=r.log,We=r.unstable_setDisableYieldValue,xe=null,ye=null;function Fe(t){if(typeof Pe=="function"&&We(t),ye&&typeof ye.setStrictMode=="function")try{ye.setStrictMode(xe,t)}catch{}}var et=Math.clz32?Math.clz32:lt,Ye=Math.log,Ie=Math.LN2;function lt(t){return t>>>=0,t===0?32:31-(Ye(t)/Ie|0)|0}var ct=256,He=262144,q=4194304;function Be(t){var i=t&42;if(i!==0)return i;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function be(t,i,s){var l=t.pendingLanes;if(l===0)return 0;var f=0,h=t.suspendedLanes,S=t.pingedLanes;t=t.warmLanes;var w=l&134217727;return w!==0?(l=w&~h,l!==0?f=Be(l):(S&=w,S!==0?f=Be(S):s||(s=w&~t,s!==0&&(f=Be(s))))):(w=l&~h,w!==0?f=Be(w):S!==0?f=Be(S):s||(s=l&~t,s!==0&&(f=Be(s)))),f===0?0:i!==0&&i!==f&&(i&h)===0&&(h=f&-f,s=i&-i,h>=s||h===32&&(s&4194048)!==0)?i:f}function Xe(t,i){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&i)===0}function Qe(t,i){switch(t){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ae(){var t=q;return q<<=1,(q&62914560)===0&&(q=4194304),t}function rt(t){for(var i=[],s=0;31>s;s++)i.push(t);return i}function tt(t,i){t.pendingLanes|=i,i!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function En(t,i,s,l,f,h){var S=t.pendingLanes;t.pendingLanes=s,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=s,t.entangledLanes&=s,t.errorRecoveryDisabledLanes&=s,t.shellSuspendCounter=0;var w=t.entanglements,V=t.expirationTimes,ue=t.hiddenUpdates;for(s=S&~s;0<s;){var Ee=31-et(s),we=1<<Ee;w[Ee]=0,V[Ee]=-1;var pe=ue[Ee];if(pe!==null)for(ue[Ee]=null,Ee=0;Ee<pe.length;Ee++){var me=pe[Ee];me!==null&&(me.lane&=-536870913)}s&=~we}l!==0&&cn(t,l,0),h!==0&&f===0&&t.tag!==0&&(t.suspendedLanes|=h&~(S&~i))}function cn(t,i,s){t.pendingLanes|=i,t.suspendedLanes&=~i;var l=31-et(i);t.entangledLanes|=i,t.entanglements[l]=t.entanglements[l]|1073741824|s&261930}function Ei(t,i){var s=t.entangledLanes|=i;for(t=t.entanglements;s;){var l=31-et(s),f=1<<l;f&i|t[l]&i&&(t[l]|=i),s&=~f}}function Ti(t,i){var s=i&-i;return s=(s&42)!==0?1:Qa(s),(s&(t.suspendedLanes|i))!==0?0:s}function Qa(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Ua(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Oa(){var t=k.p;return t!==0?t:(t=window.event,t===void 0?32:s_(t.type))}function _a(t,i){var s=k.p;try{return k.p=t,i()}finally{k.p=s}}var Ai=Math.random().toString(36).slice(2),On="__reactFiber$"+Ai,Jt="__reactProps$"+Ai,hn="__reactContainer$"+Ai,Pa="__reactEvents$"+Ai,Wt="__reactListeners$"+Ai,rn="__reactHandles$"+Ai,In="__reactResources$"+Ai,wi="__reactMarker$"+Ai;function si(t){delete t[On],delete t[Jt],delete t[Pa],delete t[Wt],delete t[rn]}function gi(t){var i=t[On];if(i)return i;for(var s=t.parentNode;s;){if(i=s[hn]||s[On]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(t=Vv(t);t!==null;){if(s=t[On])return s;t=Vv(t)}return i}t=s,s=t.parentNode}return null}function ea(t){if(t=t[On]||t[hn]){var i=t.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return t}return null}function Ja(t){var i=t.tag;if(i===5||i===26||i===27||i===6)return t.stateNode;throw Error(a(33))}function Fa(t){var i=t[In];return i||(i=t[In]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function Bn(t){t[wi]=!0}var Ns=new Set,A={};function Z(t,i){fe(t,i),fe(t+"Capture",i)}function fe(t,i){for(A[t]=i,t=0;t<i.length;t++)Ns.add(i[t])}var oe=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),le={},je={};function L(t){return bn.call(je,t)?!0:bn.call(le,t)?!1:oe.test(t)?je[t]=!0:(le[t]=!0,!1)}function X(t,i,s){if(L(i))if(s===null)t.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":t.removeAttribute(i);return;case"boolean":var l=i.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){t.removeAttribute(i);return}}t.setAttribute(i,""+s)}}function ge(t,i,s){if(s===null)t.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(i);return}t.setAttribute(i,""+s)}}function J(t,i,s,l){if(l===null)t.removeAttribute(s);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(s);return}t.setAttributeNS(i,s,""+l)}}function Oe(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function $e(t){var i=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ce(t,i,s){var l=Object.getOwnPropertyDescriptor(t.constructor.prototype,i);if(!t.hasOwnProperty(i)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var f=l.get,h=l.set;return Object.defineProperty(t,i,{configurable:!0,get:function(){return f.call(this)},set:function(S){s=""+S,h.call(this,S)}}),Object.defineProperty(t,i,{enumerable:l.enumerable}),{getValue:function(){return s},setValue:function(S){s=""+S},stopTracking:function(){t._valueTracker=null,delete t[i]}}}}function xt(t){if(!t._valueTracker){var i=$e(t)?"checked":"value";t._valueTracker=Ce(t,i,""+t[i])}}function mt(t){if(!t)return!1;var i=t._valueTracker;if(!i)return!0;var s=i.getValue(),l="";return t&&(l=$e(t)?t.checked?"true":"false":t.value),t=l,t!==s?(i.setValue(t),!0):!1}function ot(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Nt=/[\n"\\]/g;function Tt(t){return t.replace(Nt,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function Ge(t,i,s,l,f,h,S,w){t.name="",S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"?t.type=S:t.removeAttribute("type"),i!=null?S==="number"?(i===0&&t.value===""||t.value!=i)&&(t.value=""+Oe(i)):t.value!==""+Oe(i)&&(t.value=""+Oe(i)):S!=="submit"&&S!=="reset"||t.removeAttribute("value"),i!=null?bt(t,S,Oe(i)):s!=null?bt(t,S,Oe(s)):l!=null&&t.removeAttribute("value"),f==null&&h!=null&&(t.defaultChecked=!!h),f!=null&&(t.checked=f&&typeof f!="function"&&typeof f!="symbol"),w!=null&&typeof w!="function"&&typeof w!="symbol"&&typeof w!="boolean"?t.name=""+Oe(w):t.removeAttribute("name")}function ft(t,i,s,l,f,h,S,w){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(t.type=h),i!=null||s!=null){if(!(h!=="submit"&&h!=="reset"||i!=null)){xt(t);return}s=s!=null?""+Oe(s):"",i=i!=null?""+Oe(i):s,w||i===t.value||(t.value=i),t.defaultValue=i}l=l??f,l=typeof l!="function"&&typeof l!="symbol"&&!!l,t.checked=w?t.checked:!!l,t.defaultChecked=!!l,S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"&&(t.name=S),xt(t)}function bt(t,i,s){i==="number"&&ot(t.ownerDocument)===t||t.defaultValue===""+s||(t.defaultValue=""+s)}function ht(t,i,s,l){if(t=t.options,i){i={};for(var f=0;f<s.length;f++)i["$"+s[f]]=!0;for(s=0;s<t.length;s++)f=i.hasOwnProperty("$"+t[s].value),t[s].selected!==f&&(t[s].selected=f),f&&l&&(t[s].defaultSelected=!0)}else{for(s=""+Oe(s),i=null,f=0;f<t.length;f++){if(t[f].value===s){t[f].selected=!0,l&&(t[f].defaultSelected=!0);return}i!==null||t[f].disabled||(i=t[f])}i!==null&&(i.selected=!0)}}function wt(t,i,s){if(i!=null&&(i=""+Oe(i),i!==t.value&&(t.value=i),s==null)){t.defaultValue!==i&&(t.defaultValue=i);return}t.defaultValue=s!=null?""+Oe(s):""}function gn(t,i,s,l){if(i==null){if(l!=null){if(s!=null)throw Error(a(92));if(ae(l)){if(1<l.length)throw Error(a(93));l=l[0]}s=l}s==null&&(s=""),i=s}s=Oe(i),t.defaultValue=s,l=t.textContent,l===s&&l!==""&&l!==null&&(t.value=l),xt(t)}function ei(t,i){if(i){var s=t.firstChild;if(s&&s===t.lastChild&&s.nodeType===3){s.nodeValue=i;return}}t.textContent=i}var $t=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function en(t,i,s){var l=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?l?t.setProperty(i,""):i==="float"?t.cssFloat="":t[i]="":l?t.setProperty(i,s):typeof s!="number"||s===0||$t.has(i)?i==="float"?t.cssFloat=s:t[i]=(""+s).trim():t[i]=s+"px"}function Ri(t,i,s){if(i!=null&&typeof i!="object")throw Error(a(62));if(t=t.style,s!=null){for(var l in s)!s.hasOwnProperty(l)||i!=null&&i.hasOwnProperty(l)||(l.indexOf("--")===0?t.setProperty(l,""):l==="float"?t.cssFloat="":t[l]="");for(var f in i)l=i[f],i.hasOwnProperty(f)&&s[f]!==l&&en(t,f,l)}else for(var h in i)i.hasOwnProperty(h)&&en(t,h,i[h])}function an(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var dt=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),ki=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function xa(t){return ki.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Ba(){}var no=null;function fl(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ls=null,$a=null;function hl(t){var i=ea(t);if(i&&(t=i.stateNode)){var s=t[Jt]||null;e:switch(t=i.stateNode,i.type){case"input":if(Ge(t,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=t;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+Tt(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var l=s[i];if(l!==t&&l.form===t.form){var f=l[Jt]||null;if(!f)throw Error(a(90));Ge(l,f.value,f.defaultValue,f.defaultValue,f.checked,f.defaultChecked,f.type,f.name)}}for(i=0;i<s.length;i++)l=s[i],l.form===t.form&&mt(l)}break e;case"textarea":wt(t,s.value,s.defaultValue);break e;case"select":i=s.value,i!=null&&ht(t,!!s.multiple,i,!1)}}}var io=!1;function Ec(t,i,s){if(io)return t(i,s);io=!0;try{var l=t(i);return l}finally{if(io=!1,(Ls!==null||$a!==null)&&(mu(),Ls&&(i=Ls,t=$a,$a=Ls=null,hl(i),t)))for(i=0;i<t.length;i++)hl(t[i])}}function Ot(t,i){var s=t.stateNode;if(s===null)return null;var l=s[Jt]||null;if(l===null)return null;s=l[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break e;default:t=!1}if(t)return null;if(s&&typeof s!="function")throw Error(a(231,i,typeof s));return s}var ta=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Us=!1;if(ta)try{var za={};Object.defineProperty(za,"passive",{get:function(){Us=!0}}),window.addEventListener("test",za,za),window.removeEventListener("test",za,za)}catch{Us=!1}var ya=null,Os=null,Er=null;function dl(){if(Er)return Er;var t,i=Os,s=i.length,l,f="value"in ya?ya.value:ya.textContent,h=f.length;for(t=0;t<s&&i[t]===f[t];t++);var S=s-t;for(l=1;l<=S&&i[s-l]===f[h-l];l++);return Er=f.slice(t,1<l?1-l:void 0)}function St(t){var i=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&i===13&&(t=13)):t=i,t===10&&(t=13),32<=t||t===13?t:0}function li(){return!0}function ci(){return!1}function Yn(t){function i(s,l,f,h,S){this._reactName=s,this._targetInst=f,this.type=l,this.nativeEvent=h,this.target=S,this.currentTarget=null;for(var w in t)t.hasOwnProperty(w)&&(s=t[w],this[w]=s?s(h):h[w]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?li:ci,this.isPropagationStopped=ci,this}return _(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=li)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=li)},persist:function(){},isPersistent:li}),i}var Ia={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},es=Yn(Ia),Hn=_({},Ia,{view:0,detail:0}),pl=Yn(Hn),Ps,ts,Ha,Fs=_({},Hn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ui,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ha&&(Ha&&t.type==="mousemove"?(Ps=t.screenX-Ha.screenX,ts=t.screenY-Ha.screenY):ts=Ps=0,Ha=t),Ps)},movementY:function(t){return"movementY"in t?t.movementY:ts}}),ns=Yn(Fs),ml=_({},Fs,{dataTransfer:0}),Tc=Yn(ml),Ac=_({},Hn,{relatedTarget:0}),Bs=Yn(Ac),gl=_({},Ia,{animationName:0,elapsedTime:0,pseudoElement:0}),wc=Yn(gl),vl=_({},Ia,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ao=Yn(vl),Rc=_({},Ia,{data:0}),_l=Yn(Rc),Cc={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Dc={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Nc={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Lc(t){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(t):(t=Nc[t])?!!i[t]:!1}function ui(){return Lc}var Tr=_({},Hn,{key:function(t){if(t.key){var i=Cc[t.key]||t.key;if(i!=="Unidentified")return i}return t.type==="keypress"?(t=St(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Dc[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ui,charCode:function(t){return t.type==="keypress"?St(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?St(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Uc=Yn(Tr),Oc=_({},Fs,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ar=Yn(Oc),ie=_({},Hn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ui}),Le=Yn(ie),Ue=_({},Ia,{propertyName:0,elapsedTime:0,pseudoElement:0}),ke=Yn(Ue),qe=_({},Fs,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),it=Yn(qe),At=_({},Ia,{newState:0,oldState:0}),yt=Yn(At),sn=[9,13,27,32],Pn=ta&&"CompositionEvent"in window,vi=null;ta&&"documentMode"in document&&(vi=document.documentMode);var Sa=ta&&"TextEvent"in window&&!vi,Tn=ta&&(!Pn||vi&&8<vi&&11>=vi),Xn=" ",na=!1;function zs(t,i){switch(t){case"keyup":return sn.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Is(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ia=!1;function _i(t,i){switch(t){case"compositionend":return Is(i);case"keypress":return i.which!==32?null:(na=!0,Xn);case"textInput":return t=i.data,t===Xn&&na?null:t;default:return null}}function Ma(t,i){if(ia)return t==="compositionend"||!Pn&&zs(t,i)?(t=dl(),Er=Os=ya=null,ia=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Tn&&i.locale!=="ko"?null:i.data;default:return null}}var is={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function so(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i==="input"?!!is[t.type]:i==="textarea"}function wr(t,i,s,l){Ls?$a?$a.push(l):$a=[l]:Ls=l,i=Mu(i,"onChange"),0<i.length&&(s=new es("onChange","change",null,s,l),t.push({event:s,listeners:i}))}var Hs=null,Gs=null;function An(t){Cv(t,0)}function Et(t){var i=Ja(t);if(mt(i))return t}function at(t,i){if(t==="change")return i}var gt=!1;if(ta){var kt;if(ta){var jn="oninput"in document;if(!jn){var aa=document.createElement("div");aa.setAttribute("oninput","return;"),jn=typeof aa.oninput=="function"}kt=jn}else kt=!1;gt=kt&&(!document.documentMode||9<document.documentMode)}function sa(){Hs&&(Hs.detachEvent("onpropertychange",as),Gs=Hs=null)}function as(t){if(t.propertyName==="value"&&Et(Gs)){var i=[];wr(i,Gs,t,fl(t)),Ec(An,i)}}function ss(t,i,s){t==="focusin"?(sa(),Hs=i,Gs=s,Hs.attachEvent("onpropertychange",as)):t==="focusout"&&sa()}function xl(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Et(Gs)}function Ky(t,i){if(t==="click")return Et(i)}function Qy(t,i){if(t==="input"||t==="change")return Et(i)}function Jy(t,i){return t===i&&(t!==0||1/t===1/i)||t!==t&&i!==i}var Vi=typeof Object.is=="function"?Object.is:Jy;function yl(t,i){if(Vi(t,i))return!0;if(typeof t!="object"||t===null||typeof i!="object"||i===null)return!1;var s=Object.keys(t),l=Object.keys(i);if(s.length!==l.length)return!1;for(l=0;l<s.length;l++){var f=s[l];if(!bn.call(i,f)||!Vi(t[f],i[f]))return!1}return!0}function $m(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function eg(t,i){var s=$m(t);t=0;for(var l;s;){if(s.nodeType===3){if(l=t+s.textContent.length,t<=i&&l>=i)return{node:s,offset:i-t};t=l}e:{for(;s;){if(s.nextSibling){s=s.nextSibling;break e}s=s.parentNode}s=void 0}s=$m(s)}}function tg(t,i){return t&&i?t===i?!0:t&&t.nodeType===3?!1:i&&i.nodeType===3?tg(t,i.parentNode):"contains"in t?t.contains(i):t.compareDocumentPosition?!!(t.compareDocumentPosition(i)&16):!1:!1}function ng(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var i=ot(t.document);i instanceof t.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)t=i.contentWindow;else break;i=ot(t.document)}return i}function Kf(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i&&(i==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||i==="textarea"||t.contentEditable==="true")}var $y=ta&&"documentMode"in document&&11>=document.documentMode,ro=null,Qf=null,Sl=null,Jf=!1;function ig(t,i,s){var l=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;Jf||ro==null||ro!==ot(l)||(l=ro,"selectionStart"in l&&Kf(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),Sl&&yl(Sl,l)||(Sl=l,l=Mu(Qf,"onSelect"),0<l.length&&(i=new es("onSelect","select",null,i,s),t.push({event:i,listeners:l}),i.target=ro)))}function Rr(t,i){var s={};return s[t.toLowerCase()]=i.toLowerCase(),s["Webkit"+t]="webkit"+i,s["Moz"+t]="moz"+i,s}var oo={animationend:Rr("Animation","AnimationEnd"),animationiteration:Rr("Animation","AnimationIteration"),animationstart:Rr("Animation","AnimationStart"),transitionrun:Rr("Transition","TransitionRun"),transitionstart:Rr("Transition","TransitionStart"),transitioncancel:Rr("Transition","TransitionCancel"),transitionend:Rr("Transition","TransitionEnd")},$f={},ag={};ta&&(ag=document.createElement("div").style,"AnimationEvent"in window||(delete oo.animationend.animation,delete oo.animationiteration.animation,delete oo.animationstart.animation),"TransitionEvent"in window||delete oo.transitionend.transition);function Cr(t){if($f[t])return $f[t];if(!oo[t])return t;var i=oo[t],s;for(s in i)if(i.hasOwnProperty(s)&&s in ag)return $f[t]=i[s];return t}var sg=Cr("animationend"),rg=Cr("animationiteration"),og=Cr("animationstart"),eS=Cr("transitionrun"),tS=Cr("transitionstart"),nS=Cr("transitioncancel"),lg=Cr("transitionend"),cg=new Map,eh="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");eh.push("scrollEnd");function ba(t,i){cg.set(t,i),Z(i,[t])}var Pc=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},ra=[],lo=0,th=0;function Fc(){for(var t=lo,i=th=lo=0;i<t;){var s=ra[i];ra[i++]=null;var l=ra[i];ra[i++]=null;var f=ra[i];ra[i++]=null;var h=ra[i];if(ra[i++]=null,l!==null&&f!==null){var S=l.pending;S===null?f.next=f:(f.next=S.next,S.next=f),l.pending=f}h!==0&&ug(s,f,h)}}function Bc(t,i,s,l){ra[lo++]=t,ra[lo++]=i,ra[lo++]=s,ra[lo++]=l,th|=l,t.lanes|=l,t=t.alternate,t!==null&&(t.lanes|=l)}function nh(t,i,s,l){return Bc(t,i,s,l),zc(t)}function Dr(t,i){return Bc(t,null,null,i),zc(t)}function ug(t,i,s){t.lanes|=s;var l=t.alternate;l!==null&&(l.lanes|=s);for(var f=!1,h=t.return;h!==null;)h.childLanes|=s,l=h.alternate,l!==null&&(l.childLanes|=s),h.tag===22&&(t=h.stateNode,t===null||t._visibility&1||(f=!0)),t=h,h=h.return;return t.tag===3?(h=t.stateNode,f&&i!==null&&(f=31-et(s),t=h.hiddenUpdates,l=t[f],l===null?t[f]=[i]:l.push(i),i.lane=s|536870912),h):null}function zc(t){if(50<Vl)throw Vl=0,fd=null,Error(a(185));for(var i=t.return;i!==null;)t=i,i=t.return;return t.tag===3?t.stateNode:null}var co={};function iS(t,i,s,l){this.tag=t,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Xi(t,i,s,l){return new iS(t,i,s,l)}function ih(t){return t=t.prototype,!(!t||!t.isReactComponent)}function rs(t,i){var s=t.alternate;return s===null?(s=Xi(t.tag,i,t.key,t.mode),s.elementType=t.elementType,s.type=t.type,s.stateNode=t.stateNode,s.alternate=t,t.alternate=s):(s.pendingProps=i,s.type=t.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=t.flags&65011712,s.childLanes=t.childLanes,s.lanes=t.lanes,s.child=t.child,s.memoizedProps=t.memoizedProps,s.memoizedState=t.memoizedState,s.updateQueue=t.updateQueue,i=t.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=t.sibling,s.index=t.index,s.ref=t.ref,s.refCleanup=t.refCleanup,s}function fg(t,i){t.flags&=65011714;var s=t.alternate;return s===null?(t.childLanes=0,t.lanes=i,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=s.childLanes,t.lanes=s.lanes,t.child=s.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=s.memoizedProps,t.memoizedState=s.memoizedState,t.updateQueue=s.updateQueue,t.type=s.type,i=s.dependencies,t.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),t}function Ic(t,i,s,l,f,h){var S=0;if(l=t,typeof t=="function")ih(t)&&(S=1);else if(typeof t=="string")S=lM(t,s,ze.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case B:return t=Xi(31,s,i,f),t.elementType=B,t.lanes=h,t;case R:return Nr(s.children,f,h,i);case y:S=8,f|=24;break;case x:return t=Xi(12,s,i,f|2),t.elementType=x,t.lanes=h,t;case I:return t=Xi(13,s,i,f),t.elementType=I,t.lanes=h,t;case O:return t=Xi(19,s,i,f),t.elementType=O,t.lanes=h,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case N:S=10;break e;case P:S=9;break e;case C:S=11;break e;case z:S=14;break e;case T:S=16,l=null;break e}S=29,s=Error(a(130,t===null?"null":typeof t,"")),l=null}return i=Xi(S,s,i,f),i.elementType=t,i.type=l,i.lanes=h,i}function Nr(t,i,s,l){return t=Xi(7,t,l,i),t.lanes=s,t}function ah(t,i,s){return t=Xi(6,t,null,i),t.lanes=s,t}function hg(t){var i=Xi(18,null,null,0);return i.stateNode=t,i}function sh(t,i,s){return i=Xi(4,t.children!==null?t.children:[],t.key,i),i.lanes=s,i.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},i}var dg=new WeakMap;function oa(t,i){if(typeof t=="object"&&t!==null){var s=dg.get(t);return s!==void 0?s:(i={value:t,source:i,stack:Un(i)},dg.set(t,i),i)}return{value:t,source:i,stack:Un(i)}}var uo=[],fo=0,Hc=null,Ml=0,la=[],ca=0,ks=null,Ga=1,ka="";function os(t,i){uo[fo++]=Ml,uo[fo++]=Hc,Hc=t,Ml=i}function pg(t,i,s){la[ca++]=Ga,la[ca++]=ka,la[ca++]=ks,ks=t;var l=Ga;t=ka;var f=32-et(l)-1;l&=~(1<<f),s+=1;var h=32-et(i)+f;if(30<h){var S=f-f%5;h=(l&(1<<S)-1).toString(32),l>>=S,f-=S,Ga=1<<32-et(i)+f|s<<f|l,ka=h+t}else Ga=1<<h|s<<f|l,ka=t}function rh(t){t.return!==null&&(os(t,1),pg(t,1,0))}function oh(t){for(;t===Hc;)Hc=uo[--fo],uo[fo]=null,Ml=uo[--fo],uo[fo]=null;for(;t===ks;)ks=la[--ca],la[ca]=null,ka=la[--ca],la[ca]=null,Ga=la[--ca],la[ca]=null}function mg(t,i){la[ca++]=Ga,la[ca++]=ka,la[ca++]=ks,Ga=i.id,ka=i.overflow,ks=t}var fi=null,Dn=null,Kt=!1,Vs=null,ua=!1,lh=Error(a(519));function Xs(t){var i=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw bl(oa(i,t)),lh}function gg(t){var i=t.stateNode,s=t.type,l=t.memoizedProps;switch(i[On]=t,i[Jt]=l,s){case"dialog":Xt("cancel",i),Xt("close",i);break;case"iframe":case"object":case"embed":Xt("load",i);break;case"video":case"audio":for(s=0;s<ql.length;s++)Xt(ql[s],i);break;case"source":Xt("error",i);break;case"img":case"image":case"link":Xt("error",i),Xt("load",i);break;case"details":Xt("toggle",i);break;case"input":Xt("invalid",i),ft(i,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":Xt("invalid",i);break;case"textarea":Xt("invalid",i),gn(i,l.value,l.defaultValue,l.children)}s=l.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||l.suppressHydrationWarning===!0||Uv(i.textContent,s)?(l.popover!=null&&(Xt("beforetoggle",i),Xt("toggle",i)),l.onScroll!=null&&Xt("scroll",i),l.onScrollEnd!=null&&Xt("scrollend",i),l.onClick!=null&&(i.onclick=Ba),i=!0):i=!1,i||Xs(t,!0)}function vg(t){for(fi=t.return;fi;)switch(fi.tag){case 5:case 31:case 13:ua=!1;return;case 27:case 3:ua=!0;return;default:fi=fi.return}}function ho(t){if(t!==fi)return!1;if(!Kt)return vg(t),Kt=!0,!1;var i=t.tag,s;if((s=i!==3&&i!==27)&&((s=i===5)&&(s=t.type,s=!(s!=="form"&&s!=="button")||Ad(t.type,t.memoizedProps)),s=!s),s&&Dn&&Xs(t),vg(t),i===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(a(317));Dn=kv(t)}else if(i===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(a(317));Dn=kv(t)}else i===27?(i=Dn,ar(t.type)?(t=Nd,Nd=null,Dn=t):Dn=i):Dn=fi?ha(t.stateNode.nextSibling):null;return!0}function Lr(){Dn=fi=null,Kt=!1}function ch(){var t=Vs;return t!==null&&(Bi===null?Bi=t:Bi.push.apply(Bi,t),Vs=null),t}function bl(t){Vs===null?Vs=[t]:Vs.push(t)}var uh=F(null),Ur=null,ls=null;function qs(t,i,s){Ne(uh,i._currentValue),i._currentValue=s}function cs(t){t._currentValue=uh.current,Q(uh)}function fh(t,i,s){for(;t!==null;){var l=t.alternate;if((t.childLanes&i)!==i?(t.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),t===s)break;t=t.return}}function hh(t,i,s,l){var f=t.child;for(f!==null&&(f.return=t);f!==null;){var h=f.dependencies;if(h!==null){var S=f.child;h=h.firstContext;e:for(;h!==null;){var w=h;h=f;for(var V=0;V<i.length;V++)if(w.context===i[V]){h.lanes|=s,w=h.alternate,w!==null&&(w.lanes|=s),fh(h.return,s,t),l||(S=null);break e}h=w.next}}else if(f.tag===18){if(S=f.return,S===null)throw Error(a(341));S.lanes|=s,h=S.alternate,h!==null&&(h.lanes|=s),fh(S,s,t),S=null}else S=f.child;if(S!==null)S.return=f;else for(S=f;S!==null;){if(S===t){S=null;break}if(f=S.sibling,f!==null){f.return=S.return,S=f;break}S=S.return}f=S}}function po(t,i,s,l){t=null;for(var f=i,h=!1;f!==null;){if(!h){if((f.flags&524288)!==0)h=!0;else if((f.flags&262144)!==0)break}if(f.tag===10){var S=f.alternate;if(S===null)throw Error(a(387));if(S=S.memoizedProps,S!==null){var w=f.type;Vi(f.pendingProps.value,S.value)||(t!==null?t.push(w):t=[w])}}else if(f===Me.current){if(S=f.alternate,S===null)throw Error(a(387));S.memoizedState.memoizedState!==f.memoizedState.memoizedState&&(t!==null?t.push(Kl):t=[Kl])}f=f.return}t!==null&&hh(i,t,s,l),i.flags|=262144}function Gc(t){for(t=t.firstContext;t!==null;){if(!Vi(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Or(t){Ur=t,ls=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function hi(t){return _g(Ur,t)}function kc(t,i){return Ur===null&&Or(t),_g(t,i)}function _g(t,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},ls===null){if(t===null)throw Error(a(308));ls=i,t.dependencies={lanes:0,firstContext:i},t.flags|=524288}else ls=ls.next=i;return s}var aS=typeof AbortController<"u"?AbortController:function(){var t=[],i=this.signal={aborted:!1,addEventListener:function(s,l){t.push(l)}};this.abort=function(){i.aborted=!0,t.forEach(function(s){return s()})}},sS=r.unstable_scheduleCallback,rS=r.unstable_NormalPriority,Zn={$$typeof:N,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function dh(){return{controller:new aS,data:new Map,refCount:0}}function El(t){t.refCount--,t.refCount===0&&sS(rS,function(){t.controller.abort()})}var Tl=null,ph=0,mo=0,go=null;function oS(t,i){if(Tl===null){var s=Tl=[];ph=0,mo=vd(),go={status:"pending",value:void 0,then:function(l){s.push(l)}}}return ph++,i.then(xg,xg),i}function xg(){if(--ph===0&&Tl!==null){go!==null&&(go.status="fulfilled");var t=Tl;Tl=null,mo=0,go=null;for(var i=0;i<t.length;i++)(0,t[i])()}}function lS(t,i){var s=[],l={status:"pending",value:null,reason:null,then:function(f){s.push(f)}};return t.then(function(){l.status="fulfilled",l.value=i;for(var f=0;f<s.length;f++)(0,s[f])(i)},function(f){for(l.status="rejected",l.reason=f,f=0;f<s.length;f++)(0,s[f])(void 0)}),l}var yg=H.S;H.S=function(t,i){iv=Ht(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&oS(t,i),yg!==null&&yg(t,i)};var Pr=F(null);function mh(){var t=Pr.current;return t!==null?t:Mn.pooledCache}function Vc(t,i){i===null?Ne(Pr,Pr.current):Ne(Pr,i.pool)}function Sg(){var t=mh();return t===null?null:{parent:Zn._currentValue,pool:t}}var vo=Error(a(460)),gh=Error(a(474)),Xc=Error(a(542)),qc={then:function(){}};function Mg(t){return t=t.status,t==="fulfilled"||t==="rejected"}function bg(t,i,s){switch(s=t[s],s===void 0?t.push(i):s!==i&&(i.then(Ba,Ba),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw t=i.reason,Tg(t),t;default:if(typeof i.status=="string")i.then(Ba,Ba);else{if(t=Mn,t!==null&&100<t.shellSuspendCounter)throw Error(a(482));t=i,t.status="pending",t.then(function(l){if(i.status==="pending"){var f=i;f.status="fulfilled",f.value=l}},function(l){if(i.status==="pending"){var f=i;f.status="rejected",f.reason=l}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw t=i.reason,Tg(t),t}throw Br=i,vo}}function Fr(t){try{var i=t._init;return i(t._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(Br=s,vo):s}}var Br=null;function Eg(){if(Br===null)throw Error(a(459));var t=Br;return Br=null,t}function Tg(t){if(t===vo||t===Xc)throw Error(a(483))}var _o=null,Al=0;function Wc(t){var i=Al;return Al+=1,_o===null&&(_o=[]),bg(_o,t,i)}function wl(t,i){i=i.props.ref,t.ref=i!==void 0?i:null}function Yc(t,i){throw i.$$typeof===g?Error(a(525)):(t=Object.prototype.toString.call(i),Error(a(31,t==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":t)))}function Ag(t){function i($,W){if(t){var ce=$.deletions;ce===null?($.deletions=[W],$.flags|=16):ce.push(W)}}function s($,W){if(!t)return null;for(;W!==null;)i($,W),W=W.sibling;return null}function l($){for(var W=new Map;$!==null;)$.key!==null?W.set($.key,$):W.set($.index,$),$=$.sibling;return W}function f($,W){return $=rs($,W),$.index=0,$.sibling=null,$}function h($,W,ce){return $.index=ce,t?(ce=$.alternate,ce!==null?(ce=ce.index,ce<W?($.flags|=67108866,W):ce):($.flags|=67108866,W)):($.flags|=1048576,W)}function S($){return t&&$.alternate===null&&($.flags|=67108866),$}function w($,W,ce,Te){return W===null||W.tag!==6?(W=ah(ce,$.mode,Te),W.return=$,W):(W=f(W,ce),W.return=$,W)}function V($,W,ce,Te){var pt=ce.type;return pt===R?Ee($,W,ce.props.children,Te,ce.key):W!==null&&(W.elementType===pt||typeof pt=="object"&&pt!==null&&pt.$$typeof===T&&Fr(pt)===W.type)?(W=f(W,ce.props),wl(W,ce),W.return=$,W):(W=Ic(ce.type,ce.key,ce.props,null,$.mode,Te),wl(W,ce),W.return=$,W)}function ue($,W,ce,Te){return W===null||W.tag!==4||W.stateNode.containerInfo!==ce.containerInfo||W.stateNode.implementation!==ce.implementation?(W=sh(ce,$.mode,Te),W.return=$,W):(W=f(W,ce.children||[]),W.return=$,W)}function Ee($,W,ce,Te,pt){return W===null||W.tag!==7?(W=Nr(ce,$.mode,Te,pt),W.return=$,W):(W=f(W,ce),W.return=$,W)}function we($,W,ce){if(typeof W=="string"&&W!==""||typeof W=="number"||typeof W=="bigint")return W=ah(""+W,$.mode,ce),W.return=$,W;if(typeof W=="object"&&W!==null){switch(W.$$typeof){case M:return ce=Ic(W.type,W.key,W.props,null,$.mode,ce),wl(ce,W),ce.return=$,ce;case E:return W=sh(W,$.mode,ce),W.return=$,W;case T:return W=Fr(W),we($,W,ce)}if(ae(W)||Y(W))return W=Nr(W,$.mode,ce,null),W.return=$,W;if(typeof W.then=="function")return we($,Wc(W),ce);if(W.$$typeof===N)return we($,kc($,W),ce);Yc($,W)}return null}function pe($,W,ce,Te){var pt=W!==null?W.key:null;if(typeof ce=="string"&&ce!==""||typeof ce=="number"||typeof ce=="bigint")return pt!==null?null:w($,W,""+ce,Te);if(typeof ce=="object"&&ce!==null){switch(ce.$$typeof){case M:return ce.key===pt?V($,W,ce,Te):null;case E:return ce.key===pt?ue($,W,ce,Te):null;case T:return ce=Fr(ce),pe($,W,ce,Te)}if(ae(ce)||Y(ce))return pt!==null?null:Ee($,W,ce,Te,null);if(typeof ce.then=="function")return pe($,W,Wc(ce),Te);if(ce.$$typeof===N)return pe($,W,kc($,ce),Te);Yc($,ce)}return null}function me($,W,ce,Te,pt){if(typeof Te=="string"&&Te!==""||typeof Te=="number"||typeof Te=="bigint")return $=$.get(ce)||null,w(W,$,""+Te,pt);if(typeof Te=="object"&&Te!==null){switch(Te.$$typeof){case M:return $=$.get(Te.key===null?ce:Te.key)||null,V(W,$,Te,pt);case E:return $=$.get(Te.key===null?ce:Te.key)||null,ue(W,$,Te,pt);case T:return Te=Fr(Te),me($,W,ce,Te,pt)}if(ae(Te)||Y(Te))return $=$.get(ce)||null,Ee(W,$,Te,pt,null);if(typeof Te.then=="function")return me($,W,ce,Wc(Te),pt);if(Te.$$typeof===N)return me($,W,ce,kc(W,Te),pt);Yc(W,Te)}return null}function st($,W,ce,Te){for(var pt=null,on=null,ut=W,Pt=W=0,jt=null;ut!==null&&Pt<ce.length;Pt++){ut.index>Pt?(jt=ut,ut=null):jt=ut.sibling;var ln=pe($,ut,ce[Pt],Te);if(ln===null){ut===null&&(ut=jt);break}t&&ut&&ln.alternate===null&&i($,ut),W=h(ln,W,Pt),on===null?pt=ln:on.sibling=ln,on=ln,ut=jt}if(Pt===ce.length)return s($,ut),Kt&&os($,Pt),pt;if(ut===null){for(;Pt<ce.length;Pt++)ut=we($,ce[Pt],Te),ut!==null&&(W=h(ut,W,Pt),on===null?pt=ut:on.sibling=ut,on=ut);return Kt&&os($,Pt),pt}for(ut=l(ut);Pt<ce.length;Pt++)jt=me(ut,$,Pt,ce[Pt],Te),jt!==null&&(t&&jt.alternate!==null&&ut.delete(jt.key===null?Pt:jt.key),W=h(jt,W,Pt),on===null?pt=jt:on.sibling=jt,on=jt);return t&&ut.forEach(function(cr){return i($,cr)}),Kt&&os($,Pt),pt}function _t($,W,ce,Te){if(ce==null)throw Error(a(151));for(var pt=null,on=null,ut=W,Pt=W=0,jt=null,ln=ce.next();ut!==null&&!ln.done;Pt++,ln=ce.next()){ut.index>Pt?(jt=ut,ut=null):jt=ut.sibling;var cr=pe($,ut,ln.value,Te);if(cr===null){ut===null&&(ut=jt);break}t&&ut&&cr.alternate===null&&i($,ut),W=h(cr,W,Pt),on===null?pt=cr:on.sibling=cr,on=cr,ut=jt}if(ln.done)return s($,ut),Kt&&os($,Pt),pt;if(ut===null){for(;!ln.done;Pt++,ln=ce.next())ln=we($,ln.value,Te),ln!==null&&(W=h(ln,W,Pt),on===null?pt=ln:on.sibling=ln,on=ln);return Kt&&os($,Pt),pt}for(ut=l(ut);!ln.done;Pt++,ln=ce.next())ln=me(ut,$,Pt,ln.value,Te),ln!==null&&(t&&ln.alternate!==null&&ut.delete(ln.key===null?Pt:ln.key),W=h(ln,W,Pt),on===null?pt=ln:on.sibling=ln,on=ln);return t&&ut.forEach(function(xM){return i($,xM)}),Kt&&os($,Pt),pt}function xn($,W,ce,Te){if(typeof ce=="object"&&ce!==null&&ce.type===R&&ce.key===null&&(ce=ce.props.children),typeof ce=="object"&&ce!==null){switch(ce.$$typeof){case M:e:{for(var pt=ce.key;W!==null;){if(W.key===pt){if(pt=ce.type,pt===R){if(W.tag===7){s($,W.sibling),Te=f(W,ce.props.children),Te.return=$,$=Te;break e}}else if(W.elementType===pt||typeof pt=="object"&&pt!==null&&pt.$$typeof===T&&Fr(pt)===W.type){s($,W.sibling),Te=f(W,ce.props),wl(Te,ce),Te.return=$,$=Te;break e}s($,W);break}else i($,W);W=W.sibling}ce.type===R?(Te=Nr(ce.props.children,$.mode,Te,ce.key),Te.return=$,$=Te):(Te=Ic(ce.type,ce.key,ce.props,null,$.mode,Te),wl(Te,ce),Te.return=$,$=Te)}return S($);case E:e:{for(pt=ce.key;W!==null;){if(W.key===pt)if(W.tag===4&&W.stateNode.containerInfo===ce.containerInfo&&W.stateNode.implementation===ce.implementation){s($,W.sibling),Te=f(W,ce.children||[]),Te.return=$,$=Te;break e}else{s($,W);break}else i($,W);W=W.sibling}Te=sh(ce,$.mode,Te),Te.return=$,$=Te}return S($);case T:return ce=Fr(ce),xn($,W,ce,Te)}if(ae(ce))return st($,W,ce,Te);if(Y(ce)){if(pt=Y(ce),typeof pt!="function")throw Error(a(150));return ce=pt.call(ce),_t($,W,ce,Te)}if(typeof ce.then=="function")return xn($,W,Wc(ce),Te);if(ce.$$typeof===N)return xn($,W,kc($,ce),Te);Yc($,ce)}return typeof ce=="string"&&ce!==""||typeof ce=="number"||typeof ce=="bigint"?(ce=""+ce,W!==null&&W.tag===6?(s($,W.sibling),Te=f(W,ce),Te.return=$,$=Te):(s($,W),Te=ah(ce,$.mode,Te),Te.return=$,$=Te),S($)):s($,W)}return function($,W,ce,Te){try{Al=0;var pt=xn($,W,ce,Te);return _o=null,pt}catch(ut){if(ut===vo||ut===Xc)throw ut;var on=Xi(29,ut,null,$.mode);return on.lanes=Te,on.return=$,on}finally{}}}var zr=Ag(!0),wg=Ag(!1),Ws=!1;function vh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function _h(t,i){t=t.updateQueue,i.updateQueue===t&&(i.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Ys(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function js(t,i,s){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(un&2)!==0){var f=l.pending;return f===null?i.next=i:(i.next=f.next,f.next=i),l.pending=i,i=zc(t),ug(t,null,s),i}return Bc(t,l,i,s),zc(t)}function Rl(t,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194048)!==0)){var l=i.lanes;l&=t.pendingLanes,s|=l,i.lanes=s,Ei(t,s)}}function xh(t,i){var s=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,s===l)){var f=null,h=null;if(s=s.firstBaseUpdate,s!==null){do{var S={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};h===null?f=h=S:h=h.next=S,s=s.next}while(s!==null);h===null?f=h=i:h=h.next=i}else f=h=i;s={baseState:l.baseState,firstBaseUpdate:f,lastBaseUpdate:h,shared:l.shared,callbacks:l.callbacks},t.updateQueue=s;return}t=s.lastBaseUpdate,t===null?s.firstBaseUpdate=i:t.next=i,s.lastBaseUpdate=i}var yh=!1;function Cl(){if(yh){var t=go;if(t!==null)throw t}}function Dl(t,i,s,l){yh=!1;var f=t.updateQueue;Ws=!1;var h=f.firstBaseUpdate,S=f.lastBaseUpdate,w=f.shared.pending;if(w!==null){f.shared.pending=null;var V=w,ue=V.next;V.next=null,S===null?h=ue:S.next=ue,S=V;var Ee=t.alternate;Ee!==null&&(Ee=Ee.updateQueue,w=Ee.lastBaseUpdate,w!==S&&(w===null?Ee.firstBaseUpdate=ue:w.next=ue,Ee.lastBaseUpdate=V))}if(h!==null){var we=f.baseState;S=0,Ee=ue=V=null,w=h;do{var pe=w.lane&-536870913,me=pe!==w.lane;if(me?(Yt&pe)===pe:(l&pe)===pe){pe!==0&&pe===mo&&(yh=!0),Ee!==null&&(Ee=Ee.next={lane:0,tag:w.tag,payload:w.payload,callback:null,next:null});e:{var st=t,_t=w;pe=i;var xn=s;switch(_t.tag){case 1:if(st=_t.payload,typeof st=="function"){we=st.call(xn,we,pe);break e}we=st;break e;case 3:st.flags=st.flags&-65537|128;case 0:if(st=_t.payload,pe=typeof st=="function"?st.call(xn,we,pe):st,pe==null)break e;we=_({},we,pe);break e;case 2:Ws=!0}}pe=w.callback,pe!==null&&(t.flags|=64,me&&(t.flags|=8192),me=f.callbacks,me===null?f.callbacks=[pe]:me.push(pe))}else me={lane:pe,tag:w.tag,payload:w.payload,callback:w.callback,next:null},Ee===null?(ue=Ee=me,V=we):Ee=Ee.next=me,S|=pe;if(w=w.next,w===null){if(w=f.shared.pending,w===null)break;me=w,w=me.next,me.next=null,f.lastBaseUpdate=me,f.shared.pending=null}}while(!0);Ee===null&&(V=we),f.baseState=V,f.firstBaseUpdate=ue,f.lastBaseUpdate=Ee,h===null&&(f.shared.lanes=0),$s|=S,t.lanes=S,t.memoizedState=we}}function Rg(t,i){if(typeof t!="function")throw Error(a(191,t));t.call(i)}function Cg(t,i){var s=t.callbacks;if(s!==null)for(t.callbacks=null,t=0;t<s.length;t++)Rg(s[t],i)}var xo=F(null),jc=F(0);function Dg(t,i){t=_s,Ne(jc,t),Ne(xo,i),_s=t|i.baseLanes}function Sh(){Ne(jc,_s),Ne(xo,xo.current)}function Mh(){_s=jc.current,Q(xo),Q(jc)}var qi=F(null),fa=null;function Zs(t){var i=t.alternate;Ne(qn,qn.current&1),Ne(qi,t),fa===null&&(i===null||xo.current!==null||i.memoizedState!==null)&&(fa=t)}function bh(t){Ne(qn,qn.current),Ne(qi,t),fa===null&&(fa=t)}function Ng(t){t.tag===22?(Ne(qn,qn.current),Ne(qi,t),fa===null&&(fa=t)):Ks()}function Ks(){Ne(qn,qn.current),Ne(qi,qi.current)}function Wi(t){Q(qi),fa===t&&(fa=null),Q(qn)}var qn=F(0);function Zc(t){for(var i=t;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||Cd(s)||Dd(s)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var us=0,Lt=null,vn=null,Kn=null,Kc=!1,yo=!1,Ir=!1,Qc=0,Nl=0,So=null,cS=0;function Gn(){throw Error(a(321))}function Eh(t,i){if(i===null)return!1;for(var s=0;s<i.length&&s<t.length;s++)if(!Vi(t[s],i[s]))return!1;return!0}function Th(t,i,s,l,f,h){return us=h,Lt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,H.H=t===null||t.memoizedState===null?p0:Hh,Ir=!1,h=s(l,f),Ir=!1,yo&&(h=Ug(i,s,l,f)),Lg(t),h}function Lg(t){H.H=Ol;var i=vn!==null&&vn.next!==null;if(us=0,Kn=vn=Lt=null,Kc=!1,Nl=0,So=null,i)throw Error(a(300));t===null||Qn||(t=t.dependencies,t!==null&&Gc(t)&&(Qn=!0))}function Ug(t,i,s,l){Lt=t;var f=0;do{if(yo&&(So=null),Nl=0,yo=!1,25<=f)throw Error(a(301));if(f+=1,Kn=vn=null,t.updateQueue!=null){var h=t.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}H.H=m0,h=i(s,l)}while(yo);return h}function uS(){var t=H.H,i=t.useState()[0];return i=typeof i.then=="function"?Ll(i):i,t=t.useState()[0],(vn!==null?vn.memoizedState:null)!==t&&(Lt.flags|=1024),i}function Ah(){var t=Qc!==0;return Qc=0,t}function wh(t,i,s){i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~s}function Rh(t){if(Kc){for(t=t.memoizedState;t!==null;){var i=t.queue;i!==null&&(i.pending=null),t=t.next}Kc=!1}us=0,Kn=vn=Lt=null,yo=!1,Nl=Qc=0,So=null}function Ci(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Kn===null?Lt.memoizedState=Kn=t:Kn=Kn.next=t,Kn}function Wn(){if(vn===null){var t=Lt.alternate;t=t!==null?t.memoizedState:null}else t=vn.next;var i=Kn===null?Lt.memoizedState:Kn.next;if(i!==null)Kn=i,vn=t;else{if(t===null)throw Lt.alternate===null?Error(a(467)):Error(a(310));vn=t,t={memoizedState:vn.memoizedState,baseState:vn.baseState,baseQueue:vn.baseQueue,queue:vn.queue,next:null},Kn===null?Lt.memoizedState=Kn=t:Kn=Kn.next=t}return Kn}function Jc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ll(t){var i=Nl;return Nl+=1,So===null&&(So=[]),t=bg(So,t,i),i=Lt,(Kn===null?i.memoizedState:Kn.next)===null&&(i=i.alternate,H.H=i===null||i.memoizedState===null?p0:Hh),t}function $c(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Ll(t);if(t.$$typeof===N)return hi(t)}throw Error(a(438,String(t)))}function Ch(t){var i=null,s=Lt.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var l=Lt.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(i={data:l.data.map(function(f){return f.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=Jc(),Lt.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(t),l=0;l<t;l++)s[l]=K;return i.index++,s}function fs(t,i){return typeof i=="function"?i(t):i}function eu(t){var i=Wn();return Dh(i,vn,t)}function Dh(t,i,s){var l=t.queue;if(l===null)throw Error(a(311));l.lastRenderedReducer=s;var f=t.baseQueue,h=l.pending;if(h!==null){if(f!==null){var S=f.next;f.next=h.next,h.next=S}i.baseQueue=f=h,l.pending=null}if(h=t.baseState,f===null)t.memoizedState=h;else{i=f.next;var w=S=null,V=null,ue=i,Ee=!1;do{var we=ue.lane&-536870913;if(we!==ue.lane?(Yt&we)===we:(us&we)===we){var pe=ue.revertLane;if(pe===0)V!==null&&(V=V.next={lane:0,revertLane:0,gesture:null,action:ue.action,hasEagerState:ue.hasEagerState,eagerState:ue.eagerState,next:null}),we===mo&&(Ee=!0);else if((us&pe)===pe){ue=ue.next,pe===mo&&(Ee=!0);continue}else we={lane:0,revertLane:ue.revertLane,gesture:null,action:ue.action,hasEagerState:ue.hasEagerState,eagerState:ue.eagerState,next:null},V===null?(w=V=we,S=h):V=V.next=we,Lt.lanes|=pe,$s|=pe;we=ue.action,Ir&&s(h,we),h=ue.hasEagerState?ue.eagerState:s(h,we)}else pe={lane:we,revertLane:ue.revertLane,gesture:ue.gesture,action:ue.action,hasEagerState:ue.hasEagerState,eagerState:ue.eagerState,next:null},V===null?(w=V=pe,S=h):V=V.next=pe,Lt.lanes|=we,$s|=we;ue=ue.next}while(ue!==null&&ue!==i);if(V===null?S=h:V.next=w,!Vi(h,t.memoizedState)&&(Qn=!0,Ee&&(s=go,s!==null)))throw s;t.memoizedState=h,t.baseState=S,t.baseQueue=V,l.lastRenderedState=h}return f===null&&(l.lanes=0),[t.memoizedState,l.dispatch]}function Nh(t){var i=Wn(),s=i.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=t;var l=s.dispatch,f=s.pending,h=i.memoizedState;if(f!==null){s.pending=null;var S=f=f.next;do h=t(h,S.action),S=S.next;while(S!==f);Vi(h,i.memoizedState)||(Qn=!0),i.memoizedState=h,i.baseQueue===null&&(i.baseState=h),s.lastRenderedState=h}return[h,l]}function Og(t,i,s){var l=Lt,f=Wn(),h=Kt;if(h){if(s===void 0)throw Error(a(407));s=s()}else s=i();var S=!Vi((vn||f).memoizedState,s);if(S&&(f.memoizedState=s,Qn=!0),f=f.queue,Oh(Bg.bind(null,l,f,t),[t]),f.getSnapshot!==i||S||Kn!==null&&Kn.memoizedState.tag&1){if(l.flags|=2048,Mo(9,{destroy:void 0},Fg.bind(null,l,f,s,i),null),Mn===null)throw Error(a(349));h||(us&127)!==0||Pg(l,i,s)}return s}function Pg(t,i,s){t.flags|=16384,t={getSnapshot:i,value:s},i=Lt.updateQueue,i===null?(i=Jc(),Lt.updateQueue=i,i.stores=[t]):(s=i.stores,s===null?i.stores=[t]:s.push(t))}function Fg(t,i,s,l){i.value=s,i.getSnapshot=l,zg(i)&&Ig(t)}function Bg(t,i,s){return s(function(){zg(i)&&Ig(t)})}function zg(t){var i=t.getSnapshot;t=t.value;try{var s=i();return!Vi(t,s)}catch{return!0}}function Ig(t){var i=Dr(t,2);i!==null&&zi(i,t,2)}function Lh(t){var i=Ci();if(typeof t=="function"){var s=t;if(t=s(),Ir){Fe(!0);try{s()}finally{Fe(!1)}}}return i.memoizedState=i.baseState=t,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:fs,lastRenderedState:t},i}function Hg(t,i,s,l){return t.baseState=s,Dh(t,vn,typeof l=="function"?l:fs)}function fS(t,i,s,l,f){if(iu(t))throw Error(a(485));if(t=i.action,t!==null){var h={payload:f,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(S){h.listeners.push(S)}};H.T!==null?s(!0):h.isTransition=!1,l(h),s=i.pending,s===null?(h.next=i.pending=h,Gg(i,h)):(h.next=s.next,i.pending=s.next=h)}}function Gg(t,i){var s=i.action,l=i.payload,f=t.state;if(i.isTransition){var h=H.T,S={};H.T=S;try{var w=s(f,l),V=H.S;V!==null&&V(S,w),kg(t,i,w)}catch(ue){Uh(t,i,ue)}finally{h!==null&&S.types!==null&&(h.types=S.types),H.T=h}}else try{h=s(f,l),kg(t,i,h)}catch(ue){Uh(t,i,ue)}}function kg(t,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(l){Vg(t,i,l)},function(l){return Uh(t,i,l)}):Vg(t,i,s)}function Vg(t,i,s){i.status="fulfilled",i.value=s,Xg(i),t.state=s,i=t.pending,i!==null&&(s=i.next,s===i?t.pending=null:(s=s.next,i.next=s,Gg(t,s)))}function Uh(t,i,s){var l=t.pending;if(t.pending=null,l!==null){l=l.next;do i.status="rejected",i.reason=s,Xg(i),i=i.next;while(i!==l)}t.action=null}function Xg(t){t=t.listeners;for(var i=0;i<t.length;i++)(0,t[i])()}function qg(t,i){return i}function Wg(t,i){if(Kt){var s=Mn.formState;if(s!==null){e:{var l=Lt;if(Kt){if(Dn){t:{for(var f=Dn,h=ua;f.nodeType!==8;){if(!h){f=null;break t}if(f=ha(f.nextSibling),f===null){f=null;break t}}h=f.data,f=h==="F!"||h==="F"?f:null}if(f){Dn=ha(f.nextSibling),l=f.data==="F!";break e}}Xs(l)}l=!1}l&&(i=s[0])}}return s=Ci(),s.memoizedState=s.baseState=i,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:qg,lastRenderedState:i},s.queue=l,s=f0.bind(null,Lt,l),l.dispatch=s,l=Lh(!1),h=Ih.bind(null,Lt,!1,l.queue),l=Ci(),f={state:i,dispatch:null,action:t,pending:null},l.queue=f,s=fS.bind(null,Lt,f,h,s),f.dispatch=s,l.memoizedState=t,[i,s,!1]}function Yg(t){var i=Wn();return jg(i,vn,t)}function jg(t,i,s){if(i=Dh(t,i,qg)[0],t=eu(fs)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var l=Ll(i)}catch(S){throw S===vo?Xc:S}else l=i;i=Wn();var f=i.queue,h=f.dispatch;return s!==i.memoizedState&&(Lt.flags|=2048,Mo(9,{destroy:void 0},hS.bind(null,f,s),null)),[l,h,t]}function hS(t,i){t.action=i}function Zg(t){var i=Wn(),s=vn;if(s!==null)return jg(i,s,t);Wn(),i=i.memoizedState,s=Wn();var l=s.queue.dispatch;return s.memoizedState=t,[i,l,!1]}function Mo(t,i,s,l){return t={tag:t,create:s,deps:l,inst:i,next:null},i=Lt.updateQueue,i===null&&(i=Jc(),Lt.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=t.next=t:(l=s.next,s.next=t,t.next=l,i.lastEffect=t),t}function Kg(){return Wn().memoizedState}function tu(t,i,s,l){var f=Ci();Lt.flags|=t,f.memoizedState=Mo(1|i,{destroy:void 0},s,l===void 0?null:l)}function nu(t,i,s,l){var f=Wn();l=l===void 0?null:l;var h=f.memoizedState.inst;vn!==null&&l!==null&&Eh(l,vn.memoizedState.deps)?f.memoizedState=Mo(i,h,s,l):(Lt.flags|=t,f.memoizedState=Mo(1|i,h,s,l))}function Qg(t,i){tu(8390656,8,t,i)}function Oh(t,i){nu(2048,8,t,i)}function dS(t){Lt.flags|=4;var i=Lt.updateQueue;if(i===null)i=Jc(),Lt.updateQueue=i,i.events=[t];else{var s=i.events;s===null?i.events=[t]:s.push(t)}}function Jg(t){var i=Wn().memoizedState;return dS({ref:i,nextImpl:t}),function(){if((un&2)!==0)throw Error(a(440));return i.impl.apply(void 0,arguments)}}function $g(t,i){return nu(4,2,t,i)}function e0(t,i){return nu(4,4,t,i)}function t0(t,i){if(typeof i=="function"){t=t();var s=i(t);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return t=t(),i.current=t,function(){i.current=null}}function n0(t,i,s){s=s!=null?s.concat([t]):null,nu(4,4,t0.bind(null,i,t),s)}function Ph(){}function i0(t,i){var s=Wn();i=i===void 0?null:i;var l=s.memoizedState;return i!==null&&Eh(i,l[1])?l[0]:(s.memoizedState=[t,i],t)}function a0(t,i){var s=Wn();i=i===void 0?null:i;var l=s.memoizedState;if(i!==null&&Eh(i,l[1]))return l[0];if(l=t(),Ir){Fe(!0);try{t()}finally{Fe(!1)}}return s.memoizedState=[l,i],l}function Fh(t,i,s){return s===void 0||(us&1073741824)!==0&&(Yt&261930)===0?t.memoizedState=i:(t.memoizedState=s,t=sv(),Lt.lanes|=t,$s|=t,s)}function s0(t,i,s,l){return Vi(s,i)?s:xo.current!==null?(t=Fh(t,s,l),Vi(t,i)||(Qn=!0),t):(us&42)===0||(us&1073741824)!==0&&(Yt&261930)===0?(Qn=!0,t.memoizedState=s):(t=sv(),Lt.lanes|=t,$s|=t,i)}function r0(t,i,s,l,f){var h=k.p;k.p=h!==0&&8>h?h:8;var S=H.T,w={};H.T=w,Ih(t,!1,i,s);try{var V=f(),ue=H.S;if(ue!==null&&ue(w,V),V!==null&&typeof V=="object"&&typeof V.then=="function"){var Ee=lS(V,l);Ul(t,i,Ee,Zi(t))}else Ul(t,i,l,Zi(t))}catch(we){Ul(t,i,{then:function(){},status:"rejected",reason:we},Zi())}finally{k.p=h,S!==null&&w.types!==null&&(S.types=w.types),H.T=S}}function pS(){}function Bh(t,i,s,l){if(t.tag!==5)throw Error(a(476));var f=o0(t).queue;r0(t,f,i,ne,s===null?pS:function(){return l0(t),s(l)})}function o0(t){var i=t.memoizedState;if(i!==null)return i;i={memoizedState:ne,baseState:ne,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fs,lastRenderedState:ne},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fs,lastRenderedState:s},next:null},t.memoizedState=i,t=t.alternate,t!==null&&(t.memoizedState=i),i}function l0(t){var i=o0(t);i.next===null&&(i=t.alternate.memoizedState),Ul(t,i.next.queue,{},Zi())}function zh(){return hi(Kl)}function c0(){return Wn().memoizedState}function u0(){return Wn().memoizedState}function mS(t){for(var i=t.return;i!==null;){switch(i.tag){case 24:case 3:var s=Zi();t=Ys(s);var l=js(i,t,s);l!==null&&(zi(l,i,s),Rl(l,i,s)),i={cache:dh()},t.payload=i;return}i=i.return}}function gS(t,i,s){var l=Zi();s={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},iu(t)?h0(i,s):(s=nh(t,i,s,l),s!==null&&(zi(s,t,l),d0(s,i,l)))}function f0(t,i,s){var l=Zi();Ul(t,i,s,l)}function Ul(t,i,s,l){var f={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(iu(t))h0(i,f);else{var h=t.alternate;if(t.lanes===0&&(h===null||h.lanes===0)&&(h=i.lastRenderedReducer,h!==null))try{var S=i.lastRenderedState,w=h(S,s);if(f.hasEagerState=!0,f.eagerState=w,Vi(w,S))return Bc(t,i,f,0),Mn===null&&Fc(),!1}catch{}finally{}if(s=nh(t,i,f,l),s!==null)return zi(s,t,l),d0(s,i,l),!0}return!1}function Ih(t,i,s,l){if(l={lane:2,revertLane:vd(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},iu(t)){if(i)throw Error(a(479))}else i=nh(t,s,l,2),i!==null&&zi(i,t,2)}function iu(t){var i=t.alternate;return t===Lt||i!==null&&i===Lt}function h0(t,i){yo=Kc=!0;var s=t.pending;s===null?i.next=i:(i.next=s.next,s.next=i),t.pending=i}function d0(t,i,s){if((s&4194048)!==0){var l=i.lanes;l&=t.pendingLanes,s|=l,i.lanes=s,Ei(t,s)}}var Ol={readContext:hi,use:$c,useCallback:Gn,useContext:Gn,useEffect:Gn,useImperativeHandle:Gn,useLayoutEffect:Gn,useInsertionEffect:Gn,useMemo:Gn,useReducer:Gn,useRef:Gn,useState:Gn,useDebugValue:Gn,useDeferredValue:Gn,useTransition:Gn,useSyncExternalStore:Gn,useId:Gn,useHostTransitionStatus:Gn,useFormState:Gn,useActionState:Gn,useOptimistic:Gn,useMemoCache:Gn,useCacheRefresh:Gn};Ol.useEffectEvent=Gn;var p0={readContext:hi,use:$c,useCallback:function(t,i){return Ci().memoizedState=[t,i===void 0?null:i],t},useContext:hi,useEffect:Qg,useImperativeHandle:function(t,i,s){s=s!=null?s.concat([t]):null,tu(4194308,4,t0.bind(null,i,t),s)},useLayoutEffect:function(t,i){return tu(4194308,4,t,i)},useInsertionEffect:function(t,i){tu(4,2,t,i)},useMemo:function(t,i){var s=Ci();i=i===void 0?null:i;var l=t();if(Ir){Fe(!0);try{t()}finally{Fe(!1)}}return s.memoizedState=[l,i],l},useReducer:function(t,i,s){var l=Ci();if(s!==void 0){var f=s(i);if(Ir){Fe(!0);try{s(i)}finally{Fe(!1)}}}else f=i;return l.memoizedState=l.baseState=f,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:f},l.queue=t,t=t.dispatch=gS.bind(null,Lt,t),[l.memoizedState,t]},useRef:function(t){var i=Ci();return t={current:t},i.memoizedState=t},useState:function(t){t=Lh(t);var i=t.queue,s=f0.bind(null,Lt,i);return i.dispatch=s,[t.memoizedState,s]},useDebugValue:Ph,useDeferredValue:function(t,i){var s=Ci();return Fh(s,t,i)},useTransition:function(){var t=Lh(!1);return t=r0.bind(null,Lt,t.queue,!0,!1),Ci().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,i,s){var l=Lt,f=Ci();if(Kt){if(s===void 0)throw Error(a(407));s=s()}else{if(s=i(),Mn===null)throw Error(a(349));(Yt&127)!==0||Pg(l,i,s)}f.memoizedState=s;var h={value:s,getSnapshot:i};return f.queue=h,Qg(Bg.bind(null,l,h,t),[t]),l.flags|=2048,Mo(9,{destroy:void 0},Fg.bind(null,l,h,s,i),null),s},useId:function(){var t=Ci(),i=Mn.identifierPrefix;if(Kt){var s=ka,l=Ga;s=(l&~(1<<32-et(l)-1)).toString(32)+s,i="_"+i+"R_"+s,s=Qc++,0<s&&(i+="H"+s.toString(32)),i+="_"}else s=cS++,i="_"+i+"r_"+s.toString(32)+"_";return t.memoizedState=i},useHostTransitionStatus:zh,useFormState:Wg,useActionState:Wg,useOptimistic:function(t){var i=Ci();i.memoizedState=i.baseState=t;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=Ih.bind(null,Lt,!0,s),s.dispatch=i,[t,i]},useMemoCache:Ch,useCacheRefresh:function(){return Ci().memoizedState=mS.bind(null,Lt)},useEffectEvent:function(t){var i=Ci(),s={impl:t};return i.memoizedState=s,function(){if((un&2)!==0)throw Error(a(440));return s.impl.apply(void 0,arguments)}}},Hh={readContext:hi,use:$c,useCallback:i0,useContext:hi,useEffect:Oh,useImperativeHandle:n0,useInsertionEffect:$g,useLayoutEffect:e0,useMemo:a0,useReducer:eu,useRef:Kg,useState:function(){return eu(fs)},useDebugValue:Ph,useDeferredValue:function(t,i){var s=Wn();return s0(s,vn.memoizedState,t,i)},useTransition:function(){var t=eu(fs)[0],i=Wn().memoizedState;return[typeof t=="boolean"?t:Ll(t),i]},useSyncExternalStore:Og,useId:c0,useHostTransitionStatus:zh,useFormState:Yg,useActionState:Yg,useOptimistic:function(t,i){var s=Wn();return Hg(s,vn,t,i)},useMemoCache:Ch,useCacheRefresh:u0};Hh.useEffectEvent=Jg;var m0={readContext:hi,use:$c,useCallback:i0,useContext:hi,useEffect:Oh,useImperativeHandle:n0,useInsertionEffect:$g,useLayoutEffect:e0,useMemo:a0,useReducer:Nh,useRef:Kg,useState:function(){return Nh(fs)},useDebugValue:Ph,useDeferredValue:function(t,i){var s=Wn();return vn===null?Fh(s,t,i):s0(s,vn.memoizedState,t,i)},useTransition:function(){var t=Nh(fs)[0],i=Wn().memoizedState;return[typeof t=="boolean"?t:Ll(t),i]},useSyncExternalStore:Og,useId:c0,useHostTransitionStatus:zh,useFormState:Zg,useActionState:Zg,useOptimistic:function(t,i){var s=Wn();return vn!==null?Hg(s,vn,t,i):(s.baseState=t,[t,s.queue.dispatch])},useMemoCache:Ch,useCacheRefresh:u0};m0.useEffectEvent=Jg;function Gh(t,i,s,l){i=t.memoizedState,s=s(l,i),s=s==null?i:_({},i,s),t.memoizedState=s,t.lanes===0&&(t.updateQueue.baseState=s)}var kh={enqueueSetState:function(t,i,s){t=t._reactInternals;var l=Zi(),f=Ys(l);f.payload=i,s!=null&&(f.callback=s),i=js(t,f,l),i!==null&&(zi(i,t,l),Rl(i,t,l))},enqueueReplaceState:function(t,i,s){t=t._reactInternals;var l=Zi(),f=Ys(l);f.tag=1,f.payload=i,s!=null&&(f.callback=s),i=js(t,f,l),i!==null&&(zi(i,t,l),Rl(i,t,l))},enqueueForceUpdate:function(t,i){t=t._reactInternals;var s=Zi(),l=Ys(s);l.tag=2,i!=null&&(l.callback=i),i=js(t,l,s),i!==null&&(zi(i,t,s),Rl(i,t,s))}};function g0(t,i,s,l,f,h,S){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,h,S):i.prototype&&i.prototype.isPureReactComponent?!yl(s,l)||!yl(f,h):!0}function v0(t,i,s,l){t=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,l),i.state!==t&&kh.enqueueReplaceState(i,i.state,null)}function Hr(t,i){var s=i;if("ref"in i){s={};for(var l in i)l!=="ref"&&(s[l]=i[l])}if(t=t.defaultProps){s===i&&(s=_({},s));for(var f in t)s[f]===void 0&&(s[f]=t[f])}return s}function _0(t){Pc(t)}function x0(t){console.error(t)}function y0(t){Pc(t)}function au(t,i){try{var s=t.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(l){setTimeout(function(){throw l})}}function S0(t,i,s){try{var l=t.onCaughtError;l(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(f){setTimeout(function(){throw f})}}function Vh(t,i,s){return s=Ys(s),s.tag=3,s.payload={element:null},s.callback=function(){au(t,i)},s}function M0(t){return t=Ys(t),t.tag=3,t}function b0(t,i,s,l){var f=s.type.getDerivedStateFromError;if(typeof f=="function"){var h=l.value;t.payload=function(){return f(h)},t.callback=function(){S0(i,s,l)}}var S=s.stateNode;S!==null&&typeof S.componentDidCatch=="function"&&(t.callback=function(){S0(i,s,l),typeof f!="function"&&(er===null?er=new Set([this]):er.add(this));var w=l.stack;this.componentDidCatch(l.value,{componentStack:w!==null?w:""})})}function vS(t,i,s,l,f){if(s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(i=s.alternate,i!==null&&po(i,s,f,!0),s=qi.current,s!==null){switch(s.tag){case 31:case 13:return fa===null?gu():s.alternate===null&&kn===0&&(kn=3),s.flags&=-257,s.flags|=65536,s.lanes=f,l===qc?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([l]):i.add(l),pd(t,l,f)),!1;case 22:return s.flags|=65536,l===qc?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([l])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([l]):s.add(l)),pd(t,l,f)),!1}throw Error(a(435,s.tag))}return pd(t,l,f),gu(),!1}if(Kt)return i=qi.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=f,l!==lh&&(t=Error(a(422),{cause:l}),bl(oa(t,s)))):(l!==lh&&(i=Error(a(423),{cause:l}),bl(oa(i,s))),t=t.current.alternate,t.flags|=65536,f&=-f,t.lanes|=f,l=oa(l,s),f=Vh(t.stateNode,l,f),xh(t,f),kn!==4&&(kn=2)),!1;var h=Error(a(520),{cause:l});if(h=oa(h,s),kl===null?kl=[h]:kl.push(h),kn!==4&&(kn=2),i===null)return!0;l=oa(l,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,t=f&-f,s.lanes|=t,t=Vh(s.stateNode,l,t),xh(s,t),!1;case 1:if(i=s.type,h=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(er===null||!er.has(h))))return s.flags|=65536,f&=-f,s.lanes|=f,f=M0(f),b0(f,t,s,l),xh(s,f),!1}s=s.return}while(s!==null);return!1}var Xh=Error(a(461)),Qn=!1;function di(t,i,s,l){i.child=t===null?wg(i,null,s,l):zr(i,t.child,s,l)}function E0(t,i,s,l,f){s=s.render;var h=i.ref;if("ref"in l){var S={};for(var w in l)w!=="ref"&&(S[w]=l[w])}else S=l;return Or(i),l=Th(t,i,s,S,h,f),w=Ah(),t!==null&&!Qn?(wh(t,i,f),hs(t,i,f)):(Kt&&w&&rh(i),i.flags|=1,di(t,i,l,f),i.child)}function T0(t,i,s,l,f){if(t===null){var h=s.type;return typeof h=="function"&&!ih(h)&&h.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=h,A0(t,i,h,l,f)):(t=Ic(s.type,null,l,i,i.mode,f),t.ref=i.ref,t.return=i,i.child=t)}if(h=t.child,!Jh(t,f)){var S=h.memoizedProps;if(s=s.compare,s=s!==null?s:yl,s(S,l)&&t.ref===i.ref)return hs(t,i,f)}return i.flags|=1,t=rs(h,l),t.ref=i.ref,t.return=i,i.child=t}function A0(t,i,s,l,f){if(t!==null){var h=t.memoizedProps;if(yl(h,l)&&t.ref===i.ref)if(Qn=!1,i.pendingProps=l=h,Jh(t,f))(t.flags&131072)!==0&&(Qn=!0);else return i.lanes=t.lanes,hs(t,i,f)}return qh(t,i,s,l,f)}function w0(t,i,s,l){var f=l.children,h=t!==null?t.memoizedState:null;if(t===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((i.flags&128)!==0){if(h=h!==null?h.baseLanes|s:s,t!==null){for(l=i.child=t.child,f=0;l!==null;)f=f|l.lanes|l.childLanes,l=l.sibling;l=f&~h}else l=0,i.child=null;return R0(t,i,h,s,l)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},t!==null&&Vc(i,h!==null?h.cachePool:null),h!==null?Dg(i,h):Sh(),Ng(i);else return l=i.lanes=536870912,R0(t,i,h!==null?h.baseLanes|s:s,s,l)}else h!==null?(Vc(i,h.cachePool),Dg(i,h),Ks(),i.memoizedState=null):(t!==null&&Vc(i,null),Sh(),Ks());return di(t,i,f,s),i.child}function Pl(t,i){return t!==null&&t.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function R0(t,i,s,l,f){var h=mh();return h=h===null?null:{parent:Zn._currentValue,pool:h},i.memoizedState={baseLanes:s,cachePool:h},t!==null&&Vc(i,null),Sh(),Ng(i),t!==null&&po(t,i,l,!0),i.childLanes=f,null}function su(t,i){return i=ou({mode:i.mode,children:i.children},t.mode),i.ref=t.ref,t.child=i,i.return=t,i}function C0(t,i,s){return zr(i,t.child,null,s),t=su(i,i.pendingProps),t.flags|=2,Wi(i),i.memoizedState=null,t}function _S(t,i,s){var l=i.pendingProps,f=(i.flags&128)!==0;if(i.flags&=-129,t===null){if(Kt){if(l.mode==="hidden")return t=su(i,l),i.lanes=536870912,Pl(null,t);if(bh(i),(t=Dn)?(t=Gv(t,ua),t=t!==null&&t.data==="&"?t:null,t!==null&&(i.memoizedState={dehydrated:t,treeContext:ks!==null?{id:Ga,overflow:ka}:null,retryLane:536870912,hydrationErrors:null},s=hg(t),s.return=i,i.child=s,fi=i,Dn=null)):t=null,t===null)throw Xs(i);return i.lanes=536870912,null}return su(i,l)}var h=t.memoizedState;if(h!==null){var S=h.dehydrated;if(bh(i),f)if(i.flags&256)i.flags&=-257,i=C0(t,i,s);else if(i.memoizedState!==null)i.child=t.child,i.flags|=128,i=null;else throw Error(a(558));else if(Qn||po(t,i,s,!1),f=(s&t.childLanes)!==0,Qn||f){if(l=Mn,l!==null&&(S=Ti(l,s),S!==0&&S!==h.retryLane))throw h.retryLane=S,Dr(t,S),zi(l,t,S),Xh;gu(),i=C0(t,i,s)}else t=h.treeContext,Dn=ha(S.nextSibling),fi=i,Kt=!0,Vs=null,ua=!1,t!==null&&mg(i,t),i=su(i,l),i.flags|=4096;return i}return t=rs(t.child,{mode:l.mode,children:l.children}),t.ref=i.ref,i.child=t,t.return=i,t}function ru(t,i){var s=i.ref;if(s===null)t!==null&&t.ref!==null&&(i.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(t===null||t.ref!==s)&&(i.flags|=4194816)}}function qh(t,i,s,l,f){return Or(i),s=Th(t,i,s,l,void 0,f),l=Ah(),t!==null&&!Qn?(wh(t,i,f),hs(t,i,f)):(Kt&&l&&rh(i),i.flags|=1,di(t,i,s,f),i.child)}function D0(t,i,s,l,f,h){return Or(i),i.updateQueue=null,s=Ug(i,l,s,f),Lg(t),l=Ah(),t!==null&&!Qn?(wh(t,i,h),hs(t,i,h)):(Kt&&l&&rh(i),i.flags|=1,di(t,i,s,h),i.child)}function N0(t,i,s,l,f){if(Or(i),i.stateNode===null){var h=co,S=s.contextType;typeof S=="object"&&S!==null&&(h=hi(S)),h=new s(l,h),i.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=kh,i.stateNode=h,h._reactInternals=i,h=i.stateNode,h.props=l,h.state=i.memoizedState,h.refs={},vh(i),S=s.contextType,h.context=typeof S=="object"&&S!==null?hi(S):co,h.state=i.memoizedState,S=s.getDerivedStateFromProps,typeof S=="function"&&(Gh(i,s,S,l),h.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(S=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),S!==h.state&&kh.enqueueReplaceState(h,h.state,null),Dl(i,l,h,f),Cl(),h.state=i.memoizedState),typeof h.componentDidMount=="function"&&(i.flags|=4194308),l=!0}else if(t===null){h=i.stateNode;var w=i.memoizedProps,V=Hr(s,w);h.props=V;var ue=h.context,Ee=s.contextType;S=co,typeof Ee=="object"&&Ee!==null&&(S=hi(Ee));var we=s.getDerivedStateFromProps;Ee=typeof we=="function"||typeof h.getSnapshotBeforeUpdate=="function",w=i.pendingProps!==w,Ee||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(w||ue!==S)&&v0(i,h,l,S),Ws=!1;var pe=i.memoizedState;h.state=pe,Dl(i,l,h,f),Cl(),ue=i.memoizedState,w||pe!==ue||Ws?(typeof we=="function"&&(Gh(i,s,we,l),ue=i.memoizedState),(V=Ws||g0(i,s,V,l,pe,ue,S))?(Ee||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(i.flags|=4194308)):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=ue),h.props=l,h.state=ue,h.context=S,l=V):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{h=i.stateNode,_h(t,i),S=i.memoizedProps,Ee=Hr(s,S),h.props=Ee,we=i.pendingProps,pe=h.context,ue=s.contextType,V=co,typeof ue=="object"&&ue!==null&&(V=hi(ue)),w=s.getDerivedStateFromProps,(ue=typeof w=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(S!==we||pe!==V)&&v0(i,h,l,V),Ws=!1,pe=i.memoizedState,h.state=pe,Dl(i,l,h,f),Cl();var me=i.memoizedState;S!==we||pe!==me||Ws||t!==null&&t.dependencies!==null&&Gc(t.dependencies)?(typeof w=="function"&&(Gh(i,s,w,l),me=i.memoizedState),(Ee=Ws||g0(i,s,Ee,l,pe,me,V)||t!==null&&t.dependencies!==null&&Gc(t.dependencies))?(ue||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(l,me,V),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(l,me,V)),typeof h.componentDidUpdate=="function"&&(i.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof h.componentDidUpdate!="function"||S===t.memoizedProps&&pe===t.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||S===t.memoizedProps&&pe===t.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=me),h.props=l,h.state=me,h.context=V,l=Ee):(typeof h.componentDidUpdate!="function"||S===t.memoizedProps&&pe===t.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||S===t.memoizedProps&&pe===t.memoizedState||(i.flags|=1024),l=!1)}return h=l,ru(t,i),l=(i.flags&128)!==0,h||l?(h=i.stateNode,s=l&&typeof s.getDerivedStateFromError!="function"?null:h.render(),i.flags|=1,t!==null&&l?(i.child=zr(i,t.child,null,f),i.child=zr(i,null,s,f)):di(t,i,s,f),i.memoizedState=h.state,t=i.child):t=hs(t,i,f),t}function L0(t,i,s,l){return Lr(),i.flags|=256,di(t,i,s,l),i.child}var Wh={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Yh(t){return{baseLanes:t,cachePool:Sg()}}function jh(t,i,s){return t=t!==null?t.childLanes&~s:0,i&&(t|=ji),t}function U0(t,i,s){var l=i.pendingProps,f=!1,h=(i.flags&128)!==0,S;if((S=h)||(S=t!==null&&t.memoizedState===null?!1:(qn.current&2)!==0),S&&(f=!0,i.flags&=-129),S=(i.flags&32)!==0,i.flags&=-33,t===null){if(Kt){if(f?Zs(i):Ks(),(t=Dn)?(t=Gv(t,ua),t=t!==null&&t.data!=="&"?t:null,t!==null&&(i.memoizedState={dehydrated:t,treeContext:ks!==null?{id:Ga,overflow:ka}:null,retryLane:536870912,hydrationErrors:null},s=hg(t),s.return=i,i.child=s,fi=i,Dn=null)):t=null,t===null)throw Xs(i);return Dd(t)?i.lanes=32:i.lanes=536870912,null}var w=l.children;return l=l.fallback,f?(Ks(),f=i.mode,w=ou({mode:"hidden",children:w},f),l=Nr(l,f,s,null),w.return=i,l.return=i,w.sibling=l,i.child=w,l=i.child,l.memoizedState=Yh(s),l.childLanes=jh(t,S,s),i.memoizedState=Wh,Pl(null,l)):(Zs(i),Zh(i,w))}var V=t.memoizedState;if(V!==null&&(w=V.dehydrated,w!==null)){if(h)i.flags&256?(Zs(i),i.flags&=-257,i=Kh(t,i,s)):i.memoizedState!==null?(Ks(),i.child=t.child,i.flags|=128,i=null):(Ks(),w=l.fallback,f=i.mode,l=ou({mode:"visible",children:l.children},f),w=Nr(w,f,s,null),w.flags|=2,l.return=i,w.return=i,l.sibling=w,i.child=l,zr(i,t.child,null,s),l=i.child,l.memoizedState=Yh(s),l.childLanes=jh(t,S,s),i.memoizedState=Wh,i=Pl(null,l));else if(Zs(i),Dd(w)){if(S=w.nextSibling&&w.nextSibling.dataset,S)var ue=S.dgst;S=ue,l=Error(a(419)),l.stack="",l.digest=S,bl({value:l,source:null,stack:null}),i=Kh(t,i,s)}else if(Qn||po(t,i,s,!1),S=(s&t.childLanes)!==0,Qn||S){if(S=Mn,S!==null&&(l=Ti(S,s),l!==0&&l!==V.retryLane))throw V.retryLane=l,Dr(t,l),zi(S,t,l),Xh;Cd(w)||gu(),i=Kh(t,i,s)}else Cd(w)?(i.flags|=192,i.child=t.child,i=null):(t=V.treeContext,Dn=ha(w.nextSibling),fi=i,Kt=!0,Vs=null,ua=!1,t!==null&&mg(i,t),i=Zh(i,l.children),i.flags|=4096);return i}return f?(Ks(),w=l.fallback,f=i.mode,V=t.child,ue=V.sibling,l=rs(V,{mode:"hidden",children:l.children}),l.subtreeFlags=V.subtreeFlags&65011712,ue!==null?w=rs(ue,w):(w=Nr(w,f,s,null),w.flags|=2),w.return=i,l.return=i,l.sibling=w,i.child=l,Pl(null,l),l=i.child,w=t.child.memoizedState,w===null?w=Yh(s):(f=w.cachePool,f!==null?(V=Zn._currentValue,f=f.parent!==V?{parent:V,pool:V}:f):f=Sg(),w={baseLanes:w.baseLanes|s,cachePool:f}),l.memoizedState=w,l.childLanes=jh(t,S,s),i.memoizedState=Wh,Pl(t.child,l)):(Zs(i),s=t.child,t=s.sibling,s=rs(s,{mode:"visible",children:l.children}),s.return=i,s.sibling=null,t!==null&&(S=i.deletions,S===null?(i.deletions=[t],i.flags|=16):S.push(t)),i.child=s,i.memoizedState=null,s)}function Zh(t,i){return i=ou({mode:"visible",children:i},t.mode),i.return=t,t.child=i}function ou(t,i){return t=Xi(22,t,null,i),t.lanes=0,t}function Kh(t,i,s){return zr(i,t.child,null,s),t=Zh(i,i.pendingProps.children),t.flags|=2,i.memoizedState=null,t}function O0(t,i,s){t.lanes|=i;var l=t.alternate;l!==null&&(l.lanes|=i),fh(t.return,i,s)}function Qh(t,i,s,l,f,h){var S=t.memoizedState;S===null?t.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:s,tailMode:f,treeForkCount:h}:(S.isBackwards=i,S.rendering=null,S.renderingStartTime=0,S.last=l,S.tail=s,S.tailMode=f,S.treeForkCount=h)}function P0(t,i,s){var l=i.pendingProps,f=l.revealOrder,h=l.tail;l=l.children;var S=qn.current,w=(S&2)!==0;if(w?(S=S&1|2,i.flags|=128):S&=1,Ne(qn,S),di(t,i,l,s),l=Kt?Ml:0,!w&&t!==null&&(t.flags&128)!==0)e:for(t=i.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&O0(t,s,i);else if(t.tag===19)O0(t,s,i);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===i)break e;for(;t.sibling===null;){if(t.return===null||t.return===i)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(f){case"forwards":for(s=i.child,f=null;s!==null;)t=s.alternate,t!==null&&Zc(t)===null&&(f=s),s=s.sibling;s=f,s===null?(f=i.child,i.child=null):(f=s.sibling,s.sibling=null),Qh(i,!1,f,s,h,l);break;case"backwards":case"unstable_legacy-backwards":for(s=null,f=i.child,i.child=null;f!==null;){if(t=f.alternate,t!==null&&Zc(t)===null){i.child=f;break}t=f.sibling,f.sibling=s,s=f,f=t}Qh(i,!0,s,null,h,l);break;case"together":Qh(i,!1,null,null,void 0,l);break;default:i.memoizedState=null}return i.child}function hs(t,i,s){if(t!==null&&(i.dependencies=t.dependencies),$s|=i.lanes,(s&i.childLanes)===0)if(t!==null){if(po(t,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(t!==null&&i.child!==t.child)throw Error(a(153));if(i.child!==null){for(t=i.child,s=rs(t,t.pendingProps),i.child=s,s.return=i;t.sibling!==null;)t=t.sibling,s=s.sibling=rs(t,t.pendingProps),s.return=i;s.sibling=null}return i.child}function Jh(t,i){return(t.lanes&i)!==0?!0:(t=t.dependencies,!!(t!==null&&Gc(t)))}function xS(t,i,s){switch(i.tag){case 3:De(i,i.stateNode.containerInfo),qs(i,Zn,t.memoizedState.cache),Lr();break;case 27:case 5:vt(i);break;case 4:De(i,i.stateNode.containerInfo);break;case 10:qs(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,bh(i),null;break;case 13:var l=i.memoizedState;if(l!==null)return l.dehydrated!==null?(Zs(i),i.flags|=128,null):(s&i.child.childLanes)!==0?U0(t,i,s):(Zs(i),t=hs(t,i,s),t!==null?t.sibling:null);Zs(i);break;case 19:var f=(t.flags&128)!==0;if(l=(s&i.childLanes)!==0,l||(po(t,i,s,!1),l=(s&i.childLanes)!==0),f){if(l)return P0(t,i,s);i.flags|=128}if(f=i.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),Ne(qn,qn.current),l)break;return null;case 22:return i.lanes=0,w0(t,i,s,i.pendingProps);case 24:qs(i,Zn,t.memoizedState.cache)}return hs(t,i,s)}function F0(t,i,s){if(t!==null)if(t.memoizedProps!==i.pendingProps)Qn=!0;else{if(!Jh(t,s)&&(i.flags&128)===0)return Qn=!1,xS(t,i,s);Qn=(t.flags&131072)!==0}else Qn=!1,Kt&&(i.flags&1048576)!==0&&pg(i,Ml,i.index);switch(i.lanes=0,i.tag){case 16:e:{var l=i.pendingProps;if(t=Fr(i.elementType),i.type=t,typeof t=="function")ih(t)?(l=Hr(t,l),i.tag=1,i=N0(null,i,t,l,s)):(i.tag=0,i=qh(null,i,t,l,s));else{if(t!=null){var f=t.$$typeof;if(f===C){i.tag=11,i=E0(null,i,t,l,s);break e}else if(f===z){i.tag=14,i=T0(null,i,t,l,s);break e}}throw i=Se(t)||t,Error(a(306,i,""))}}return i;case 0:return qh(t,i,i.type,i.pendingProps,s);case 1:return l=i.type,f=Hr(l,i.pendingProps),N0(t,i,l,f,s);case 3:e:{if(De(i,i.stateNode.containerInfo),t===null)throw Error(a(387));l=i.pendingProps;var h=i.memoizedState;f=h.element,_h(t,i),Dl(i,l,null,s);var S=i.memoizedState;if(l=S.cache,qs(i,Zn,l),l!==h.cache&&hh(i,[Zn],s,!0),Cl(),l=S.element,h.isDehydrated)if(h={element:l,isDehydrated:!1,cache:S.cache},i.updateQueue.baseState=h,i.memoizedState=h,i.flags&256){i=L0(t,i,l,s);break e}else if(l!==f){f=oa(Error(a(424)),i),bl(f),i=L0(t,i,l,s);break e}else{switch(t=i.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Dn=ha(t.firstChild),fi=i,Kt=!0,Vs=null,ua=!0,s=wg(i,null,l,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(Lr(),l===f){i=hs(t,i,s);break e}di(t,i,l,s)}i=i.child}return i;case 26:return ru(t,i),t===null?(s=Yv(i.type,null,i.pendingProps,null))?i.memoizedState=s:Kt||(s=i.type,t=i.pendingProps,l=bu(re.current).createElement(s),l[On]=i,l[Jt]=t,pi(l,s,t),Bn(l),i.stateNode=l):i.memoizedState=Yv(i.type,t.memoizedProps,i.pendingProps,t.memoizedState),null;case 27:return vt(i),t===null&&Kt&&(l=i.stateNode=Xv(i.type,i.pendingProps,re.current),fi=i,ua=!0,f=Dn,ar(i.type)?(Nd=f,Dn=ha(l.firstChild)):Dn=f),di(t,i,i.pendingProps.children,s),ru(t,i),t===null&&(i.flags|=4194304),i.child;case 5:return t===null&&Kt&&((f=l=Dn)&&(l=ZS(l,i.type,i.pendingProps,ua),l!==null?(i.stateNode=l,fi=i,Dn=ha(l.firstChild),ua=!1,f=!0):f=!1),f||Xs(i)),vt(i),f=i.type,h=i.pendingProps,S=t!==null?t.memoizedProps:null,l=h.children,Ad(f,h)?l=null:S!==null&&Ad(f,S)&&(i.flags|=32),i.memoizedState!==null&&(f=Th(t,i,uS,null,null,s),Kl._currentValue=f),ru(t,i),di(t,i,l,s),i.child;case 6:return t===null&&Kt&&((t=s=Dn)&&(s=KS(s,i.pendingProps,ua),s!==null?(i.stateNode=s,fi=i,Dn=null,t=!0):t=!1),t||Xs(i)),null;case 13:return U0(t,i,s);case 4:return De(i,i.stateNode.containerInfo),l=i.pendingProps,t===null?i.child=zr(i,null,l,s):di(t,i,l,s),i.child;case 11:return E0(t,i,i.type,i.pendingProps,s);case 7:return di(t,i,i.pendingProps,s),i.child;case 8:return di(t,i,i.pendingProps.children,s),i.child;case 12:return di(t,i,i.pendingProps.children,s),i.child;case 10:return l=i.pendingProps,qs(i,i.type,l.value),di(t,i,l.children,s),i.child;case 9:return f=i.type._context,l=i.pendingProps.children,Or(i),f=hi(f),l=l(f),i.flags|=1,di(t,i,l,s),i.child;case 14:return T0(t,i,i.type,i.pendingProps,s);case 15:return A0(t,i,i.type,i.pendingProps,s);case 19:return P0(t,i,s);case 31:return _S(t,i,s);case 22:return w0(t,i,s,i.pendingProps);case 24:return Or(i),l=hi(Zn),t===null?(f=mh(),f===null&&(f=Mn,h=dh(),f.pooledCache=h,h.refCount++,h!==null&&(f.pooledCacheLanes|=s),f=h),i.memoizedState={parent:l,cache:f},vh(i),qs(i,Zn,f)):((t.lanes&s)!==0&&(_h(t,i),Dl(i,null,null,s),Cl()),f=t.memoizedState,h=i.memoizedState,f.parent!==l?(f={parent:l,cache:l},i.memoizedState=f,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=f),qs(i,Zn,l)):(l=h.cache,qs(i,Zn,l),l!==f.cache&&hh(i,[Zn],s,!0))),di(t,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(a(156,i.tag))}function ds(t){t.flags|=4}function $h(t,i,s,l,f){if((i=(t.mode&32)!==0)&&(i=!1),i){if(t.flags|=16777216,(f&335544128)===f)if(t.stateNode.complete)t.flags|=8192;else if(cv())t.flags|=8192;else throw Br=qc,gh}else t.flags&=-16777217}function B0(t,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Jv(i))if(cv())t.flags|=8192;else throw Br=qc,gh}function lu(t,i){i!==null&&(t.flags|=4),t.flags&16384&&(i=t.tag!==22?Ae():536870912,t.lanes|=i,Ao|=i)}function Fl(t,i){if(!Kt)switch(t.tailMode){case"hidden":i=t.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?t.tail=null:s.sibling=null;break;case"collapsed":s=t.tail;for(var l=null;s!==null;)s.alternate!==null&&(l=s),s=s.sibling;l===null?i||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null}}function Nn(t){var i=t.alternate!==null&&t.alternate.child===t.child,s=0,l=0;if(i)for(var f=t.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags&65011712,l|=f.flags&65011712,f.return=t,f=f.sibling;else for(f=t.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags,l|=f.flags,f.return=t,f=f.sibling;return t.subtreeFlags|=l,t.childLanes=s,i}function yS(t,i,s){var l=i.pendingProps;switch(oh(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Nn(i),null;case 1:return Nn(i),null;case 3:return s=i.stateNode,l=null,t!==null&&(l=t.memoizedState.cache),i.memoizedState.cache!==l&&(i.flags|=2048),cs(Zn),nt(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(t===null||t.child===null)&&(ho(i)?ds(i):t===null||t.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,ch())),Nn(i),null;case 26:var f=i.type,h=i.memoizedState;return t===null?(ds(i),h!==null?(Nn(i),B0(i,h)):(Nn(i),$h(i,f,null,l,s))):h?h!==t.memoizedState?(ds(i),Nn(i),B0(i,h)):(Nn(i),i.flags&=-16777217):(t=t.memoizedProps,t!==l&&ds(i),Nn(i),$h(i,f,t,l,s)),null;case 27:if(Ke(i),s=re.current,f=i.type,t!==null&&i.stateNode!=null)t.memoizedProps!==l&&ds(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return Nn(i),null}t=ze.current,ho(i)?gg(i):(t=Xv(f,l,s),i.stateNode=t,ds(i))}return Nn(i),null;case 5:if(Ke(i),f=i.type,t!==null&&i.stateNode!=null)t.memoizedProps!==l&&ds(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return Nn(i),null}if(h=ze.current,ho(i))gg(i);else{var S=bu(re.current);switch(h){case 1:h=S.createElementNS("http://www.w3.org/2000/svg",f);break;case 2:h=S.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;default:switch(f){case"svg":h=S.createElementNS("http://www.w3.org/2000/svg",f);break;case"math":h=S.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;case"script":h=S.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof l.is=="string"?S.createElement("select",{is:l.is}):S.createElement("select"),l.multiple?h.multiple=!0:l.size&&(h.size=l.size);break;default:h=typeof l.is=="string"?S.createElement(f,{is:l.is}):S.createElement(f)}}h[On]=i,h[Jt]=l;e:for(S=i.child;S!==null;){if(S.tag===5||S.tag===6)h.appendChild(S.stateNode);else if(S.tag!==4&&S.tag!==27&&S.child!==null){S.child.return=S,S=S.child;continue}if(S===i)break e;for(;S.sibling===null;){if(S.return===null||S.return===i)break e;S=S.return}S.sibling.return=S.return,S=S.sibling}i.stateNode=h;e:switch(pi(h,f,l),f){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break e;case"img":l=!0;break e;default:l=!1}l&&ds(i)}}return Nn(i),$h(i,i.type,t===null?null:t.memoizedProps,i.pendingProps,s),null;case 6:if(t&&i.stateNode!=null)t.memoizedProps!==l&&ds(i);else{if(typeof l!="string"&&i.stateNode===null)throw Error(a(166));if(t=re.current,ho(i)){if(t=i.stateNode,s=i.memoizedProps,l=null,f=fi,f!==null)switch(f.tag){case 27:case 5:l=f.memoizedProps}t[On]=i,t=!!(t.nodeValue===s||l!==null&&l.suppressHydrationWarning===!0||Uv(t.nodeValue,s)),t||Xs(i,!0)}else t=bu(t).createTextNode(l),t[On]=i,i.stateNode=t}return Nn(i),null;case 31:if(s=i.memoizedState,t===null||t.memoizedState!==null){if(l=ho(i),s!==null){if(t===null){if(!l)throw Error(a(318));if(t=i.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(a(557));t[On]=i}else Lr(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Nn(i),t=!1}else s=ch(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=s),t=!0;if(!t)return i.flags&256?(Wi(i),i):(Wi(i),null);if((i.flags&128)!==0)throw Error(a(558))}return Nn(i),null;case 13:if(l=i.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(f=ho(i),l!==null&&l.dehydrated!==null){if(t===null){if(!f)throw Error(a(318));if(f=i.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(a(317));f[On]=i}else Lr(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Nn(i),f=!1}else f=ch(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=f),f=!0;if(!f)return i.flags&256?(Wi(i),i):(Wi(i),null)}return Wi(i),(i.flags&128)!==0?(i.lanes=s,i):(s=l!==null,t=t!==null&&t.memoizedState!==null,s&&(l=i.child,f=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(f=l.alternate.memoizedState.cachePool.pool),h=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(h=l.memoizedState.cachePool.pool),h!==f&&(l.flags|=2048)),s!==t&&s&&(i.child.flags|=8192),lu(i,i.updateQueue),Nn(i),null);case 4:return nt(),t===null&&Sd(i.stateNode.containerInfo),Nn(i),null;case 10:return cs(i.type),Nn(i),null;case 19:if(Q(qn),l=i.memoizedState,l===null)return Nn(i),null;if(f=(i.flags&128)!==0,h=l.rendering,h===null)if(f)Fl(l,!1);else{if(kn!==0||t!==null&&(t.flags&128)!==0)for(t=i.child;t!==null;){if(h=Zc(t),h!==null){for(i.flags|=128,Fl(l,!1),t=h.updateQueue,i.updateQueue=t,lu(i,t),i.subtreeFlags=0,t=s,s=i.child;s!==null;)fg(s,t),s=s.sibling;return Ne(qn,qn.current&1|2),Kt&&os(i,l.treeForkCount),i.child}t=t.sibling}l.tail!==null&&Ht()>du&&(i.flags|=128,f=!0,Fl(l,!1),i.lanes=4194304)}else{if(!f)if(t=Zc(h),t!==null){if(i.flags|=128,f=!0,t=t.updateQueue,i.updateQueue=t,lu(i,t),Fl(l,!0),l.tail===null&&l.tailMode==="hidden"&&!h.alternate&&!Kt)return Nn(i),null}else 2*Ht()-l.renderingStartTime>du&&s!==536870912&&(i.flags|=128,f=!0,Fl(l,!1),i.lanes=4194304);l.isBackwards?(h.sibling=i.child,i.child=h):(t=l.last,t!==null?t.sibling=h:i.child=h,l.last=h)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=Ht(),t.sibling=null,s=qn.current,Ne(qn,f?s&1|2:s&1),Kt&&os(i,l.treeForkCount),t):(Nn(i),null);case 22:case 23:return Wi(i),Mh(),l=i.memoizedState!==null,t!==null?t.memoizedState!==null!==l&&(i.flags|=8192):l&&(i.flags|=8192),l?(s&536870912)!==0&&(i.flags&128)===0&&(Nn(i),i.subtreeFlags&6&&(i.flags|=8192)):Nn(i),s=i.updateQueue,s!==null&&lu(i,s.retryQueue),s=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(s=t.memoizedState.cachePool.pool),l=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(l=i.memoizedState.cachePool.pool),l!==s&&(i.flags|=2048),t!==null&&Q(Pr),null;case 24:return s=null,t!==null&&(s=t.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),cs(Zn),Nn(i),null;case 25:return null;case 30:return null}throw Error(a(156,i.tag))}function SS(t,i){switch(oh(i),i.tag){case 1:return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 3:return cs(Zn),nt(),t=i.flags,(t&65536)!==0&&(t&128)===0?(i.flags=t&-65537|128,i):null;case 26:case 27:case 5:return Ke(i),null;case 31:if(i.memoizedState!==null){if(Wi(i),i.alternate===null)throw Error(a(340));Lr()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 13:if(Wi(i),t=i.memoizedState,t!==null&&t.dehydrated!==null){if(i.alternate===null)throw Error(a(340));Lr()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 19:return Q(qn),null;case 4:return nt(),null;case 10:return cs(i.type),null;case 22:case 23:return Wi(i),Mh(),t!==null&&Q(Pr),t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 24:return cs(Zn),null;case 25:return null;default:return null}}function z0(t,i){switch(oh(i),i.tag){case 3:cs(Zn),nt();break;case 26:case 27:case 5:Ke(i);break;case 4:nt();break;case 31:i.memoizedState!==null&&Wi(i);break;case 13:Wi(i);break;case 19:Q(qn);break;case 10:cs(i.type);break;case 22:case 23:Wi(i),Mh(),t!==null&&Q(Pr);break;case 24:cs(Zn)}}function Bl(t,i){try{var s=i.updateQueue,l=s!==null?s.lastEffect:null;if(l!==null){var f=l.next;s=f;do{if((s.tag&t)===t){l=void 0;var h=s.create,S=s.inst;l=h(),S.destroy=l}s=s.next}while(s!==f)}}catch(w){pn(i,i.return,w)}}function Qs(t,i,s){try{var l=i.updateQueue,f=l!==null?l.lastEffect:null;if(f!==null){var h=f.next;l=h;do{if((l.tag&t)===t){var S=l.inst,w=S.destroy;if(w!==void 0){S.destroy=void 0,f=i;var V=s,ue=w;try{ue()}catch(Ee){pn(f,V,Ee)}}}l=l.next}while(l!==h)}}catch(Ee){pn(i,i.return,Ee)}}function I0(t){var i=t.updateQueue;if(i!==null){var s=t.stateNode;try{Cg(i,s)}catch(l){pn(t,t.return,l)}}}function H0(t,i,s){s.props=Hr(t.type,t.memoizedProps),s.state=t.memoizedState;try{s.componentWillUnmount()}catch(l){pn(t,i,l)}}function zl(t,i){try{var s=t.ref;if(s!==null){switch(t.tag){case 26:case 27:case 5:var l=t.stateNode;break;case 30:l=t.stateNode;break;default:l=t.stateNode}typeof s=="function"?t.refCleanup=s(l):s.current=l}}catch(f){pn(t,i,f)}}function Va(t,i){var s=t.ref,l=t.refCleanup;if(s!==null)if(typeof l=="function")try{l()}catch(f){pn(t,i,f)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(f){pn(t,i,f)}else s.current=null}function G0(t){var i=t.type,s=t.memoizedProps,l=t.stateNode;try{e:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&l.focus();break e;case"img":s.src?l.src=s.src:s.srcSet&&(l.srcset=s.srcSet)}}catch(f){pn(t,t.return,f)}}function ed(t,i,s){try{var l=t.stateNode;VS(l,t.type,s,i),l[Jt]=i}catch(f){pn(t,t.return,f)}}function k0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&ar(t.type)||t.tag===4}function td(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||k0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&ar(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function nd(t,i,s){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(t,i):(i=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,i.appendChild(t),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=Ba));else if(l!==4&&(l===27&&ar(t.type)&&(s=t.stateNode,i=null),t=t.child,t!==null))for(nd(t,i,s),t=t.sibling;t!==null;)nd(t,i,s),t=t.sibling}function cu(t,i,s){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?s.insertBefore(t,i):s.appendChild(t);else if(l!==4&&(l===27&&ar(t.type)&&(s=t.stateNode),t=t.child,t!==null))for(cu(t,i,s),t=t.sibling;t!==null;)cu(t,i,s),t=t.sibling}function V0(t){var i=t.stateNode,s=t.memoizedProps;try{for(var l=t.type,f=i.attributes;f.length;)i.removeAttributeNode(f[0]);pi(i,l,s),i[On]=t,i[Jt]=s}catch(h){pn(t,t.return,h)}}var ps=!1,Jn=!1,id=!1,X0=typeof WeakSet=="function"?WeakSet:Set,ri=null;function MS(t,i){if(t=t.containerInfo,Ed=Du,t=ng(t),Kf(t)){if("selectionStart"in t)var s={start:t.selectionStart,end:t.selectionEnd};else e:{s=(s=t.ownerDocument)&&s.defaultView||window;var l=s.getSelection&&s.getSelection();if(l&&l.rangeCount!==0){s=l.anchorNode;var f=l.anchorOffset,h=l.focusNode;l=l.focusOffset;try{s.nodeType,h.nodeType}catch{s=null;break e}var S=0,w=-1,V=-1,ue=0,Ee=0,we=t,pe=null;t:for(;;){for(var me;we!==s||f!==0&&we.nodeType!==3||(w=S+f),we!==h||l!==0&&we.nodeType!==3||(V=S+l),we.nodeType===3&&(S+=we.nodeValue.length),(me=we.firstChild)!==null;)pe=we,we=me;for(;;){if(we===t)break t;if(pe===s&&++ue===f&&(w=S),pe===h&&++Ee===l&&(V=S),(me=we.nextSibling)!==null)break;we=pe,pe=we.parentNode}we=me}s=w===-1||V===-1?null:{start:w,end:V}}else s=null}s=s||{start:0,end:0}}else s=null;for(Td={focusedElem:t,selectionRange:s},Du=!1,ri=i;ri!==null;)if(i=ri,t=i.child,(i.subtreeFlags&1028)!==0&&t!==null)t.return=i,ri=t;else for(;ri!==null;){switch(i=ri,h=i.alternate,t=i.flags,i.tag){case 0:if((t&4)!==0&&(t=i.updateQueue,t=t!==null?t.events:null,t!==null))for(s=0;s<t.length;s++)f=t[s],f.ref.impl=f.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&h!==null){t=void 0,s=i,f=h.memoizedProps,h=h.memoizedState,l=s.stateNode;try{var st=Hr(s.type,f);t=l.getSnapshotBeforeUpdate(st,h),l.__reactInternalSnapshotBeforeUpdate=t}catch(_t){pn(s,s.return,_t)}}break;case 3:if((t&1024)!==0){if(t=i.stateNode.containerInfo,s=t.nodeType,s===9)Rd(t);else if(s===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Rd(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(a(163))}if(t=i.sibling,t!==null){t.return=i.return,ri=t;break}ri=i.return}}function q0(t,i,s){var l=s.flags;switch(s.tag){case 0:case 11:case 15:gs(t,s),l&4&&Bl(5,s);break;case 1:if(gs(t,s),l&4)if(t=s.stateNode,i===null)try{t.componentDidMount()}catch(S){pn(s,s.return,S)}else{var f=Hr(s.type,i.memoizedProps);i=i.memoizedState;try{t.componentDidUpdate(f,i,t.__reactInternalSnapshotBeforeUpdate)}catch(S){pn(s,s.return,S)}}l&64&&I0(s),l&512&&zl(s,s.return);break;case 3:if(gs(t,s),l&64&&(t=s.updateQueue,t!==null)){if(i=null,s.child!==null)switch(s.child.tag){case 27:case 5:i=s.child.stateNode;break;case 1:i=s.child.stateNode}try{Cg(t,i)}catch(S){pn(s,s.return,S)}}break;case 27:i===null&&l&4&&V0(s);case 26:case 5:gs(t,s),i===null&&l&4&&G0(s),l&512&&zl(s,s.return);break;case 12:gs(t,s);break;case 31:gs(t,s),l&4&&j0(t,s);break;case 13:gs(t,s),l&4&&Z0(t,s),l&64&&(t=s.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(s=NS.bind(null,s),QS(t,s))));break;case 22:if(l=s.memoizedState!==null||ps,!l){i=i!==null&&i.memoizedState!==null||Jn,f=ps;var h=Jn;ps=l,(Jn=i)&&!h?vs(t,s,(s.subtreeFlags&8772)!==0):gs(t,s),ps=f,Jn=h}break;case 30:break;default:gs(t,s)}}function W0(t){var i=t.alternate;i!==null&&(t.alternate=null,W0(i)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(i=t.stateNode,i!==null&&si(i)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Fn=null,Oi=!1;function ms(t,i,s){for(s=s.child;s!==null;)Y0(t,i,s),s=s.sibling}function Y0(t,i,s){if(ye&&typeof ye.onCommitFiberUnmount=="function")try{ye.onCommitFiberUnmount(xe,s)}catch{}switch(s.tag){case 26:Jn||Va(s,i),ms(t,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:Jn||Va(s,i);var l=Fn,f=Oi;ar(s.type)&&(Fn=s.stateNode,Oi=!1),ms(t,i,s),Yl(s.stateNode),Fn=l,Oi=f;break;case 5:Jn||Va(s,i);case 6:if(l=Fn,f=Oi,Fn=null,ms(t,i,s),Fn=l,Oi=f,Fn!==null)if(Oi)try{(Fn.nodeType===9?Fn.body:Fn.nodeName==="HTML"?Fn.ownerDocument.body:Fn).removeChild(s.stateNode)}catch(h){pn(s,i,h)}else try{Fn.removeChild(s.stateNode)}catch(h){pn(s,i,h)}break;case 18:Fn!==null&&(Oi?(t=Fn,Iv(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,s.stateNode),Oo(t)):Iv(Fn,s.stateNode));break;case 4:l=Fn,f=Oi,Fn=s.stateNode.containerInfo,Oi=!0,ms(t,i,s),Fn=l,Oi=f;break;case 0:case 11:case 14:case 15:Qs(2,s,i),Jn||Qs(4,s,i),ms(t,i,s);break;case 1:Jn||(Va(s,i),l=s.stateNode,typeof l.componentWillUnmount=="function"&&H0(s,i,l)),ms(t,i,s);break;case 21:ms(t,i,s);break;case 22:Jn=(l=Jn)||s.memoizedState!==null,ms(t,i,s),Jn=l;break;default:ms(t,i,s)}}function j0(t,i){if(i.memoizedState===null&&(t=i.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Oo(t)}catch(s){pn(i,i.return,s)}}}function Z0(t,i){if(i.memoizedState===null&&(t=i.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Oo(t)}catch(s){pn(i,i.return,s)}}function bS(t){switch(t.tag){case 31:case 13:case 19:var i=t.stateNode;return i===null&&(i=t.stateNode=new X0),i;case 22:return t=t.stateNode,i=t._retryCache,i===null&&(i=t._retryCache=new X0),i;default:throw Error(a(435,t.tag))}}function uu(t,i){var s=bS(t);i.forEach(function(l){if(!s.has(l)){s.add(l);var f=LS.bind(null,t,l);l.then(f,f)}})}function Pi(t,i){var s=i.deletions;if(s!==null)for(var l=0;l<s.length;l++){var f=s[l],h=t,S=i,w=S;e:for(;w!==null;){switch(w.tag){case 27:if(ar(w.type)){Fn=w.stateNode,Oi=!1;break e}break;case 5:Fn=w.stateNode,Oi=!1;break e;case 3:case 4:Fn=w.stateNode.containerInfo,Oi=!0;break e}w=w.return}if(Fn===null)throw Error(a(160));Y0(h,S,f),Fn=null,Oi=!1,h=f.alternate,h!==null&&(h.return=null),f.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)K0(i,t),i=i.sibling}var Ea=null;function K0(t,i){var s=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Pi(i,t),Fi(t),l&4&&(Qs(3,t,t.return),Bl(3,t),Qs(5,t,t.return));break;case 1:Pi(i,t),Fi(t),l&512&&(Jn||s===null||Va(s,s.return)),l&64&&ps&&(t=t.updateQueue,t!==null&&(l=t.callbacks,l!==null&&(s=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=s===null?l:s.concat(l))));break;case 26:var f=Ea;if(Pi(i,t),Fi(t),l&512&&(Jn||s===null||Va(s,s.return)),l&4){var h=s!==null?s.memoizedState:null;if(l=t.memoizedState,s===null)if(l===null)if(t.stateNode===null){e:{l=t.type,s=t.memoizedProps,f=f.ownerDocument||f;t:switch(l){case"title":h=f.getElementsByTagName("title")[0],(!h||h[wi]||h[On]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=f.createElement(l),f.head.insertBefore(h,f.querySelector("head > title"))),pi(h,l,s),h[On]=t,Bn(h),l=h;break e;case"link":var S=Kv("link","href",f).get(l+(s.href||""));if(S){for(var w=0;w<S.length;w++)if(h=S[w],h.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&h.getAttribute("rel")===(s.rel==null?null:s.rel)&&h.getAttribute("title")===(s.title==null?null:s.title)&&h.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){S.splice(w,1);break t}}h=f.createElement(l),pi(h,l,s),f.head.appendChild(h);break;case"meta":if(S=Kv("meta","content",f).get(l+(s.content||""))){for(w=0;w<S.length;w++)if(h=S[w],h.getAttribute("content")===(s.content==null?null:""+s.content)&&h.getAttribute("name")===(s.name==null?null:s.name)&&h.getAttribute("property")===(s.property==null?null:s.property)&&h.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&h.getAttribute("charset")===(s.charSet==null?null:s.charSet)){S.splice(w,1);break t}}h=f.createElement(l),pi(h,l,s),f.head.appendChild(h);break;default:throw Error(a(468,l))}h[On]=t,Bn(h),l=h}t.stateNode=l}else Qv(f,t.type,t.stateNode);else t.stateNode=Zv(f,l,t.memoizedProps);else h!==l?(h===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):h.count--,l===null?Qv(f,t.type,t.stateNode):Zv(f,l,t.memoizedProps)):l===null&&t.stateNode!==null&&ed(t,t.memoizedProps,s.memoizedProps)}break;case 27:Pi(i,t),Fi(t),l&512&&(Jn||s===null||Va(s,s.return)),s!==null&&l&4&&ed(t,t.memoizedProps,s.memoizedProps);break;case 5:if(Pi(i,t),Fi(t),l&512&&(Jn||s===null||Va(s,s.return)),t.flags&32){f=t.stateNode;try{ei(f,"")}catch(st){pn(t,t.return,st)}}l&4&&t.stateNode!=null&&(f=t.memoizedProps,ed(t,f,s!==null?s.memoizedProps:f)),l&1024&&(id=!0);break;case 6:if(Pi(i,t),Fi(t),l&4){if(t.stateNode===null)throw Error(a(162));l=t.memoizedProps,s=t.stateNode;try{s.nodeValue=l}catch(st){pn(t,t.return,st)}}break;case 3:if(Au=null,f=Ea,Ea=Eu(i.containerInfo),Pi(i,t),Ea=f,Fi(t),l&4&&s!==null&&s.memoizedState.isDehydrated)try{Oo(i.containerInfo)}catch(st){pn(t,t.return,st)}id&&(id=!1,Q0(t));break;case 4:l=Ea,Ea=Eu(t.stateNode.containerInfo),Pi(i,t),Fi(t),Ea=l;break;case 12:Pi(i,t),Fi(t);break;case 31:Pi(i,t),Fi(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,uu(t,l)));break;case 13:Pi(i,t),Fi(t),t.child.flags&8192&&t.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(hu=Ht()),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,uu(t,l)));break;case 22:f=t.memoizedState!==null;var V=s!==null&&s.memoizedState!==null,ue=ps,Ee=Jn;if(ps=ue||f,Jn=Ee||V,Pi(i,t),Jn=Ee,ps=ue,Fi(t),l&8192)e:for(i=t.stateNode,i._visibility=f?i._visibility&-2:i._visibility|1,f&&(s===null||V||ps||Jn||Gr(t)),s=null,i=t;;){if(i.tag===5||i.tag===26){if(s===null){V=s=i;try{if(h=V.stateNode,f)S=h.style,typeof S.setProperty=="function"?S.setProperty("display","none","important"):S.display="none";else{w=V.stateNode;var we=V.memoizedProps.style,pe=we!=null&&we.hasOwnProperty("display")?we.display:null;w.style.display=pe==null||typeof pe=="boolean"?"":(""+pe).trim()}}catch(st){pn(V,V.return,st)}}}else if(i.tag===6){if(s===null){V=i;try{V.stateNode.nodeValue=f?"":V.memoizedProps}catch(st){pn(V,V.return,st)}}}else if(i.tag===18){if(s===null){V=i;try{var me=V.stateNode;f?Hv(me,!0):Hv(V.stateNode,!1)}catch(st){pn(V,V.return,st)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===t)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break e;for(;i.sibling===null;){if(i.return===null||i.return===t)break e;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}l&4&&(l=t.updateQueue,l!==null&&(s=l.retryQueue,s!==null&&(l.retryQueue=null,uu(t,s))));break;case 19:Pi(i,t),Fi(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,uu(t,l)));break;case 30:break;case 21:break;default:Pi(i,t),Fi(t)}}function Fi(t){var i=t.flags;if(i&2){try{for(var s,l=t.return;l!==null;){if(k0(l)){s=l;break}l=l.return}if(s==null)throw Error(a(160));switch(s.tag){case 27:var f=s.stateNode,h=td(t);cu(t,h,f);break;case 5:var S=s.stateNode;s.flags&32&&(ei(S,""),s.flags&=-33);var w=td(t);cu(t,w,S);break;case 3:case 4:var V=s.stateNode.containerInfo,ue=td(t);nd(t,ue,V);break;default:throw Error(a(161))}}catch(Ee){pn(t,t.return,Ee)}t.flags&=-3}i&4096&&(t.flags&=-4097)}function Q0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var i=t;Q0(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),t=t.sibling}}function gs(t,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)q0(t,i.alternate,i),i=i.sibling}function Gr(t){for(t=t.child;t!==null;){var i=t;switch(i.tag){case 0:case 11:case 14:case 15:Qs(4,i,i.return),Gr(i);break;case 1:Va(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&H0(i,i.return,s),Gr(i);break;case 27:Yl(i.stateNode);case 26:case 5:Va(i,i.return),Gr(i);break;case 22:i.memoizedState===null&&Gr(i);break;case 30:Gr(i);break;default:Gr(i)}t=t.sibling}}function vs(t,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var l=i.alternate,f=t,h=i,S=h.flags;switch(h.tag){case 0:case 11:case 15:vs(f,h,s),Bl(4,h);break;case 1:if(vs(f,h,s),l=h,f=l.stateNode,typeof f.componentDidMount=="function")try{f.componentDidMount()}catch(ue){pn(l,l.return,ue)}if(l=h,f=l.updateQueue,f!==null){var w=l.stateNode;try{var V=f.shared.hiddenCallbacks;if(V!==null)for(f.shared.hiddenCallbacks=null,f=0;f<V.length;f++)Rg(V[f],w)}catch(ue){pn(l,l.return,ue)}}s&&S&64&&I0(h),zl(h,h.return);break;case 27:V0(h);case 26:case 5:vs(f,h,s),s&&l===null&&S&4&&G0(h),zl(h,h.return);break;case 12:vs(f,h,s);break;case 31:vs(f,h,s),s&&S&4&&j0(f,h);break;case 13:vs(f,h,s),s&&S&4&&Z0(f,h);break;case 22:h.memoizedState===null&&vs(f,h,s),zl(h,h.return);break;case 30:break;default:vs(f,h,s)}i=i.sibling}}function ad(t,i){var s=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(s=t.memoizedState.cachePool.pool),t=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(t=i.memoizedState.cachePool.pool),t!==s&&(t!=null&&t.refCount++,s!=null&&El(s))}function sd(t,i){t=null,i.alternate!==null&&(t=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==t&&(i.refCount++,t!=null&&El(t))}function Ta(t,i,s,l){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)J0(t,i,s,l),i=i.sibling}function J0(t,i,s,l){var f=i.flags;switch(i.tag){case 0:case 11:case 15:Ta(t,i,s,l),f&2048&&Bl(9,i);break;case 1:Ta(t,i,s,l);break;case 3:Ta(t,i,s,l),f&2048&&(t=null,i.alternate!==null&&(t=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==t&&(i.refCount++,t!=null&&El(t)));break;case 12:if(f&2048){Ta(t,i,s,l),t=i.stateNode;try{var h=i.memoizedProps,S=h.id,w=h.onPostCommit;typeof w=="function"&&w(S,i.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(V){pn(i,i.return,V)}}else Ta(t,i,s,l);break;case 31:Ta(t,i,s,l);break;case 13:Ta(t,i,s,l);break;case 23:break;case 22:h=i.stateNode,S=i.alternate,i.memoizedState!==null?h._visibility&2?Ta(t,i,s,l):Il(t,i):h._visibility&2?Ta(t,i,s,l):(h._visibility|=2,bo(t,i,s,l,(i.subtreeFlags&10256)!==0||!1)),f&2048&&ad(S,i);break;case 24:Ta(t,i,s,l),f&2048&&sd(i.alternate,i);break;default:Ta(t,i,s,l)}}function bo(t,i,s,l,f){for(f=f&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var h=t,S=i,w=s,V=l,ue=S.flags;switch(S.tag){case 0:case 11:case 15:bo(h,S,w,V,f),Bl(8,S);break;case 23:break;case 22:var Ee=S.stateNode;S.memoizedState!==null?Ee._visibility&2?bo(h,S,w,V,f):Il(h,S):(Ee._visibility|=2,bo(h,S,w,V,f)),f&&ue&2048&&ad(S.alternate,S);break;case 24:bo(h,S,w,V,f),f&&ue&2048&&sd(S.alternate,S);break;default:bo(h,S,w,V,f)}i=i.sibling}}function Il(t,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=t,l=i,f=l.flags;switch(l.tag){case 22:Il(s,l),f&2048&&ad(l.alternate,l);break;case 24:Il(s,l),f&2048&&sd(l.alternate,l);break;default:Il(s,l)}i=i.sibling}}var Hl=8192;function Eo(t,i,s){if(t.subtreeFlags&Hl)for(t=t.child;t!==null;)$0(t,i,s),t=t.sibling}function $0(t,i,s){switch(t.tag){case 26:Eo(t,i,s),t.flags&Hl&&t.memoizedState!==null&&cM(s,Ea,t.memoizedState,t.memoizedProps);break;case 5:Eo(t,i,s);break;case 3:case 4:var l=Ea;Ea=Eu(t.stateNode.containerInfo),Eo(t,i,s),Ea=l;break;case 22:t.memoizedState===null&&(l=t.alternate,l!==null&&l.memoizedState!==null?(l=Hl,Hl=16777216,Eo(t,i,s),Hl=l):Eo(t,i,s));break;default:Eo(t,i,s)}}function ev(t){var i=t.alternate;if(i!==null&&(t=i.child,t!==null)){i.child=null;do i=t.sibling,t.sibling=null,t=i;while(t!==null)}}function Gl(t){var i=t.deletions;if((t.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];ri=l,nv(l,t)}ev(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)tv(t),t=t.sibling}function tv(t){switch(t.tag){case 0:case 11:case 15:Gl(t),t.flags&2048&&Qs(9,t,t.return);break;case 3:Gl(t);break;case 12:Gl(t);break;case 22:var i=t.stateNode;t.memoizedState!==null&&i._visibility&2&&(t.return===null||t.return.tag!==13)?(i._visibility&=-3,fu(t)):Gl(t);break;default:Gl(t)}}function fu(t){var i=t.deletions;if((t.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];ri=l,nv(l,t)}ev(t)}for(t=t.child;t!==null;){switch(i=t,i.tag){case 0:case 11:case 15:Qs(8,i,i.return),fu(i);break;case 22:s=i.stateNode,s._visibility&2&&(s._visibility&=-3,fu(i));break;default:fu(i)}t=t.sibling}}function nv(t,i){for(;ri!==null;){var s=ri;switch(s.tag){case 0:case 11:case 15:Qs(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var l=s.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:El(s.memoizedState.cache)}if(l=s.child,l!==null)l.return=s,ri=l;else e:for(s=t;ri!==null;){l=ri;var f=l.sibling,h=l.return;if(W0(l),l===s){ri=null;break e}if(f!==null){f.return=h,ri=f;break e}ri=h}}}var ES={getCacheForType:function(t){var i=hi(Zn),s=i.data.get(t);return s===void 0&&(s=t(),i.data.set(t,s)),s},cacheSignal:function(){return hi(Zn).controller.signal}},TS=typeof WeakMap=="function"?WeakMap:Map,un=0,Mn=null,Vt=null,Yt=0,dn=0,Yi=null,Js=!1,To=!1,rd=!1,_s=0,kn=0,$s=0,kr=0,od=0,ji=0,Ao=0,kl=null,Bi=null,ld=!1,hu=0,iv=0,du=1/0,pu=null,er=null,ti=0,tr=null,wo=null,xs=0,cd=0,ud=null,av=null,Vl=0,fd=null;function Zi(){return(un&2)!==0&&Yt!==0?Yt&-Yt:H.T!==null?vd():Oa()}function sv(){if(ji===0)if((Yt&536870912)===0||Kt){var t=He;He<<=1,(He&3932160)===0&&(He=262144),ji=t}else ji=536870912;return t=qi.current,t!==null&&(t.flags|=32),ji}function zi(t,i,s){(t===Mn&&(dn===2||dn===9)||t.cancelPendingCommit!==null)&&(Ro(t,0),nr(t,Yt,ji,!1)),tt(t,s),((un&2)===0||t!==Mn)&&(t===Mn&&((un&2)===0&&(kr|=s),kn===4&&nr(t,Yt,ji,!1)),Xa(t))}function rv(t,i,s){if((un&6)!==0)throw Error(a(327));var l=!s&&(i&127)===0&&(i&t.expiredLanes)===0||Xe(t,i),f=l?RS(t,i):dd(t,i,!0),h=l;do{if(f===0){To&&!l&&nr(t,i,0,!1);break}else{if(s=t.current.alternate,h&&!AS(s)){f=dd(t,i,!1),h=!1;continue}if(f===2){if(h=i,t.errorRecoveryDisabledLanes&h)var S=0;else S=t.pendingLanes&-536870913,S=S!==0?S:S&536870912?536870912:0;if(S!==0){i=S;e:{var w=t;f=kl;var V=w.current.memoizedState.isDehydrated;if(V&&(Ro(w,S).flags|=256),S=dd(w,S,!1),S!==2){if(rd&&!V){w.errorRecoveryDisabledLanes|=h,kr|=h,f=4;break e}h=Bi,Bi=f,h!==null&&(Bi===null?Bi=h:Bi.push.apply(Bi,h))}f=S}if(h=!1,f!==2)continue}}if(f===1){Ro(t,0),nr(t,i,0,!0);break}e:{switch(l=t,h=f,h){case 0:case 1:throw Error(a(345));case 4:if((i&4194048)!==i)break;case 6:nr(l,i,ji,!Js);break e;case 2:Bi=null;break;case 3:case 5:break;default:throw Error(a(329))}if((i&62914560)===i&&(f=hu+300-Ht(),10<f)){if(nr(l,i,ji,!Js),be(l,0,!0)!==0)break e;xs=i,l.timeoutHandle=Bv(ov.bind(null,l,s,Bi,pu,ld,i,ji,kr,Ao,Js,h,"Throttled",-0,0),f);break e}ov(l,s,Bi,pu,ld,i,ji,kr,Ao,Js,h,null,-0,0)}}break}while(!0);Xa(t)}function ov(t,i,s,l,f,h,S,w,V,ue,Ee,we,pe,me){if(t.timeoutHandle=-1,we=i.subtreeFlags,we&8192||(we&16785408)===16785408){we={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ba},$0(i,h,we);var st=(h&62914560)===h?hu-Ht():(h&4194048)===h?iv-Ht():0;if(st=uM(we,st),st!==null){xs=h,t.cancelPendingCommit=st(mv.bind(null,t,i,h,s,l,f,S,w,V,Ee,we,null,pe,me)),nr(t,h,S,!ue);return}}mv(t,i,h,s,l,f,S,w,V)}function AS(t){for(var i=t;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var l=0;l<s.length;l++){var f=s[l],h=f.getSnapshot;f=f.value;try{if(!Vi(h(),f))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function nr(t,i,s,l){i&=~od,i&=~kr,t.suspendedLanes|=i,t.pingedLanes&=~i,l&&(t.warmLanes|=i),l=t.expirationTimes;for(var f=i;0<f;){var h=31-et(f),S=1<<h;l[h]=-1,f&=~S}s!==0&&cn(t,s,i)}function mu(){return(un&6)===0?(Xl(0),!1):!0}function hd(){if(Vt!==null){if(dn===0)var t=Vt.return;else t=Vt,ls=Ur=null,Rh(t),_o=null,Al=0,t=Vt;for(;t!==null;)z0(t.alternate,t),t=t.return;Vt=null}}function Ro(t,i){var s=t.timeoutHandle;s!==-1&&(t.timeoutHandle=-1,WS(s)),s=t.cancelPendingCommit,s!==null&&(t.cancelPendingCommit=null,s()),xs=0,hd(),Mn=t,Vt=s=rs(t.current,null),Yt=i,dn=0,Yi=null,Js=!1,To=Xe(t,i),rd=!1,Ao=ji=od=kr=$s=kn=0,Bi=kl=null,ld=!1,(i&8)!==0&&(i|=i&32);var l=t.entangledLanes;if(l!==0)for(t=t.entanglements,l&=i;0<l;){var f=31-et(l),h=1<<f;i|=t[f],l&=~h}return _s=i,Fc(),s}function lv(t,i){Lt=null,H.H=Ol,i===vo||i===Xc?(i=Eg(),dn=3):i===gh?(i=Eg(),dn=4):dn=i===Xh?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,Yi=i,Vt===null&&(kn=1,au(t,oa(i,t.current)))}function cv(){var t=qi.current;return t===null?!0:(Yt&4194048)===Yt?fa===null:(Yt&62914560)===Yt||(Yt&536870912)!==0?t===fa:!1}function uv(){var t=H.H;return H.H=Ol,t===null?Ol:t}function fv(){var t=H.A;return H.A=ES,t}function gu(){kn=4,Js||(Yt&4194048)!==Yt&&qi.current!==null||(To=!0),($s&134217727)===0&&(kr&134217727)===0||Mn===null||nr(Mn,Yt,ji,!1)}function dd(t,i,s){var l=un;un|=2;var f=uv(),h=fv();(Mn!==t||Yt!==i)&&(pu=null,Ro(t,i)),i=!1;var S=kn;e:do try{if(dn!==0&&Vt!==null){var w=Vt,V=Yi;switch(dn){case 8:hd(),S=6;break e;case 3:case 2:case 9:case 6:qi.current===null&&(i=!0);var ue=dn;if(dn=0,Yi=null,Co(t,w,V,ue),s&&To){S=0;break e}break;default:ue=dn,dn=0,Yi=null,Co(t,w,V,ue)}}wS(),S=kn;break}catch(Ee){lv(t,Ee)}while(!0);return i&&t.shellSuspendCounter++,ls=Ur=null,un=l,H.H=f,H.A=h,Vt===null&&(Mn=null,Yt=0,Fc()),S}function wS(){for(;Vt!==null;)hv(Vt)}function RS(t,i){var s=un;un|=2;var l=uv(),f=fv();Mn!==t||Yt!==i?(pu=null,du=Ht()+500,Ro(t,i)):To=Xe(t,i);e:do try{if(dn!==0&&Vt!==null){i=Vt;var h=Yi;t:switch(dn){case 1:dn=0,Yi=null,Co(t,i,h,1);break;case 2:case 9:if(Mg(h)){dn=0,Yi=null,dv(i);break}i=function(){dn!==2&&dn!==9||Mn!==t||(dn=7),Xa(t)},h.then(i,i);break e;case 3:dn=7;break e;case 4:dn=5;break e;case 7:Mg(h)?(dn=0,Yi=null,dv(i)):(dn=0,Yi=null,Co(t,i,h,7));break;case 5:var S=null;switch(Vt.tag){case 26:S=Vt.memoizedState;case 5:case 27:var w=Vt;if(S?Jv(S):w.stateNode.complete){dn=0,Yi=null;var V=w.sibling;if(V!==null)Vt=V;else{var ue=w.return;ue!==null?(Vt=ue,vu(ue)):Vt=null}break t}}dn=0,Yi=null,Co(t,i,h,5);break;case 6:dn=0,Yi=null,Co(t,i,h,6);break;case 8:hd(),kn=6;break e;default:throw Error(a(462))}}CS();break}catch(Ee){lv(t,Ee)}while(!0);return ls=Ur=null,H.H=l,H.A=f,un=s,Vt!==null?0:(Mn=null,Yt=0,Fc(),kn)}function CS(){for(;Vt!==null&&!Sn();)hv(Vt)}function hv(t){var i=F0(t.alternate,t,_s);t.memoizedProps=t.pendingProps,i===null?vu(t):Vt=i}function dv(t){var i=t,s=i.alternate;switch(i.tag){case 15:case 0:i=D0(s,i,i.pendingProps,i.type,void 0,Yt);break;case 11:i=D0(s,i,i.pendingProps,i.type.render,i.ref,Yt);break;case 5:Rh(i);default:z0(s,i),i=Vt=fg(i,_s),i=F0(s,i,_s)}t.memoizedProps=t.pendingProps,i===null?vu(t):Vt=i}function Co(t,i,s,l){ls=Ur=null,Rh(i),_o=null,Al=0;var f=i.return;try{if(vS(t,f,i,s,Yt)){kn=1,au(t,oa(s,t.current)),Vt=null;return}}catch(h){if(f!==null)throw Vt=f,h;kn=1,au(t,oa(s,t.current)),Vt=null;return}i.flags&32768?(Kt||l===1?t=!0:To||(Yt&536870912)!==0?t=!1:(Js=t=!0,(l===2||l===9||l===3||l===6)&&(l=qi.current,l!==null&&l.tag===13&&(l.flags|=16384))),pv(i,t)):vu(i)}function vu(t){var i=t;do{if((i.flags&32768)!==0){pv(i,Js);return}t=i.return;var s=yS(i.alternate,i,_s);if(s!==null){Vt=s;return}if(i=i.sibling,i!==null){Vt=i;return}Vt=i=t}while(i!==null);kn===0&&(kn=5)}function pv(t,i){do{var s=SS(t.alternate,t);if(s!==null){s.flags&=32767,Vt=s;return}if(s=t.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(t=t.sibling,t!==null)){Vt=t;return}Vt=t=s}while(t!==null);kn=6,Vt=null}function mv(t,i,s,l,f,h,S,w,V){t.cancelPendingCommit=null;do _u();while(ti!==0);if((un&6)!==0)throw Error(a(327));if(i!==null){if(i===t.current)throw Error(a(177));if(h=i.lanes|i.childLanes,h|=th,En(t,s,h,S,w,V),t===Mn&&(Vt=Mn=null,Yt=0),wo=i,tr=t,xs=s,cd=h,ud=f,av=l,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,US(te,function(){return yv(),null})):(t.callbackNode=null,t.callbackPriority=0),l=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||l){l=H.T,H.T=null,f=k.p,k.p=2,S=un,un|=4;try{MS(t,i,s)}finally{un=S,k.p=f,H.T=l}}ti=1,gv(),vv(),_v()}}function gv(){if(ti===1){ti=0;var t=tr,i=wo,s=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||s){s=H.T,H.T=null;var l=k.p;k.p=2;var f=un;un|=4;try{K0(i,t);var h=Td,S=ng(t.containerInfo),w=h.focusedElem,V=h.selectionRange;if(S!==w&&w&&w.ownerDocument&&tg(w.ownerDocument.documentElement,w)){if(V!==null&&Kf(w)){var ue=V.start,Ee=V.end;if(Ee===void 0&&(Ee=ue),"selectionStart"in w)w.selectionStart=ue,w.selectionEnd=Math.min(Ee,w.value.length);else{var we=w.ownerDocument||document,pe=we&&we.defaultView||window;if(pe.getSelection){var me=pe.getSelection(),st=w.textContent.length,_t=Math.min(V.start,st),xn=V.end===void 0?_t:Math.min(V.end,st);!me.extend&&_t>xn&&(S=xn,xn=_t,_t=S);var $=eg(w,_t),W=eg(w,xn);if($&&W&&(me.rangeCount!==1||me.anchorNode!==$.node||me.anchorOffset!==$.offset||me.focusNode!==W.node||me.focusOffset!==W.offset)){var ce=we.createRange();ce.setStart($.node,$.offset),me.removeAllRanges(),_t>xn?(me.addRange(ce),me.extend(W.node,W.offset)):(ce.setEnd(W.node,W.offset),me.addRange(ce))}}}}for(we=[],me=w;me=me.parentNode;)me.nodeType===1&&we.push({element:me,left:me.scrollLeft,top:me.scrollTop});for(typeof w.focus=="function"&&w.focus(),w=0;w<we.length;w++){var Te=we[w];Te.element.scrollLeft=Te.left,Te.element.scrollTop=Te.top}}Du=!!Ed,Td=Ed=null}finally{un=f,k.p=l,H.T=s}}t.current=i,ti=2}}function vv(){if(ti===2){ti=0;var t=tr,i=wo,s=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||s){s=H.T,H.T=null;var l=k.p;k.p=2;var f=un;un|=4;try{q0(t,i.alternate,i)}finally{un=f,k.p=l,H.T=s}}ti=3}}function _v(){if(ti===4||ti===3){ti=0,j();var t=tr,i=wo,s=xs,l=av;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?ti=5:(ti=0,wo=tr=null,xv(t,t.pendingLanes));var f=t.pendingLanes;if(f===0&&(er=null),Ua(s),i=i.stateNode,ye&&typeof ye.onCommitFiberRoot=="function")try{ye.onCommitFiberRoot(xe,i,void 0,(i.current.flags&128)===128)}catch{}if(l!==null){i=H.T,f=k.p,k.p=2,H.T=null;try{for(var h=t.onRecoverableError,S=0;S<l.length;S++){var w=l[S];h(w.value,{componentStack:w.stack})}}finally{H.T=i,k.p=f}}(xs&3)!==0&&_u(),Xa(t),f=t.pendingLanes,(s&261930)!==0&&(f&42)!==0?t===fd?Vl++:(Vl=0,fd=t):Vl=0,Xl(0)}}function xv(t,i){(t.pooledCacheLanes&=i)===0&&(i=t.pooledCache,i!=null&&(t.pooledCache=null,El(i)))}function _u(){return gv(),vv(),_v(),yv()}function yv(){if(ti!==5)return!1;var t=tr,i=cd;cd=0;var s=Ua(xs),l=H.T,f=k.p;try{k.p=32>s?32:s,H.T=null,s=ud,ud=null;var h=tr,S=xs;if(ti=0,wo=tr=null,xs=0,(un&6)!==0)throw Error(a(331));var w=un;if(un|=4,tv(h.current),J0(h,h.current,S,s),un=w,Xl(0,!1),ye&&typeof ye.onPostCommitFiberRoot=="function")try{ye.onPostCommitFiberRoot(xe,h)}catch{}return!0}finally{k.p=f,H.T=l,xv(t,i)}}function Sv(t,i,s){i=oa(s,i),i=Vh(t.stateNode,i,2),t=js(t,i,2),t!==null&&(tt(t,2),Xa(t))}function pn(t,i,s){if(t.tag===3)Sv(t,t,s);else for(;i!==null;){if(i.tag===3){Sv(i,t,s);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(er===null||!er.has(l))){t=oa(s,t),s=M0(2),l=js(i,s,2),l!==null&&(b0(s,l,i,t),tt(l,2),Xa(l));break}}i=i.return}}function pd(t,i,s){var l=t.pingCache;if(l===null){l=t.pingCache=new TS;var f=new Set;l.set(i,f)}else f=l.get(i),f===void 0&&(f=new Set,l.set(i,f));f.has(s)||(rd=!0,f.add(s),t=DS.bind(null,t,i,s),i.then(t,t))}function DS(t,i,s){var l=t.pingCache;l!==null&&l.delete(i),t.pingedLanes|=t.suspendedLanes&s,t.warmLanes&=~s,Mn===t&&(Yt&s)===s&&(kn===4||kn===3&&(Yt&62914560)===Yt&&300>Ht()-hu?(un&2)===0&&Ro(t,0):od|=s,Ao===Yt&&(Ao=0)),Xa(t)}function Mv(t,i){i===0&&(i=Ae()),t=Dr(t,i),t!==null&&(tt(t,i),Xa(t))}function NS(t){var i=t.memoizedState,s=0;i!==null&&(s=i.retryLane),Mv(t,s)}function LS(t,i){var s=0;switch(t.tag){case 31:case 13:var l=t.stateNode,f=t.memoizedState;f!==null&&(s=f.retryLane);break;case 19:l=t.stateNode;break;case 22:l=t.stateNode._retryCache;break;default:throw Error(a(314))}l!==null&&l.delete(i),Mv(t,s)}function US(t,i){return Cn(t,i)}var xu=null,Do=null,md=!1,yu=!1,gd=!1,ir=0;function Xa(t){t!==Do&&t.next===null&&(Do===null?xu=Do=t:Do=Do.next=t),yu=!0,md||(md=!0,PS())}function Xl(t,i){if(!gd&&yu){gd=!0;do for(var s=!1,l=xu;l!==null;){if(t!==0){var f=l.pendingLanes;if(f===0)var h=0;else{var S=l.suspendedLanes,w=l.pingedLanes;h=(1<<31-et(42|t)+1)-1,h&=f&~(S&~w),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(s=!0,Av(l,h))}else h=Yt,h=be(l,l===Mn?h:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(h&3)===0||Xe(l,h)||(s=!0,Av(l,h));l=l.next}while(s);gd=!1}}function OS(){bv()}function bv(){yu=md=!1;var t=0;ir!==0&&qS()&&(t=ir);for(var i=Ht(),s=null,l=xu;l!==null;){var f=l.next,h=Ev(l,i);h===0?(l.next=null,s===null?xu=f:s.next=f,f===null&&(Do=s)):(s=l,(t!==0||(h&3)!==0)&&(yu=!0)),l=f}ti!==0&&ti!==5||Xl(t),ir!==0&&(ir=0)}function Ev(t,i){for(var s=t.suspendedLanes,l=t.pingedLanes,f=t.expirationTimes,h=t.pendingLanes&-62914561;0<h;){var S=31-et(h),w=1<<S,V=f[S];V===-1?((w&s)===0||(w&l)!==0)&&(f[S]=Qe(w,i)):V<=i&&(t.expiredLanes|=w),h&=~w}if(i=Mn,s=Yt,s=be(t,t===i?s:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l=t.callbackNode,s===0||t===i&&(dn===2||dn===9)||t.cancelPendingCommit!==null)return l!==null&&l!==null&&fn(l),t.callbackNode=null,t.callbackPriority=0;if((s&3)===0||Xe(t,s)){if(i=s&-s,i===t.callbackPriority)return i;switch(l!==null&&fn(l),Ua(s)){case 2:case 8:s=b;break;case 32:s=te;break;case 268435456:s=_e;break;default:s=te}return l=Tv.bind(null,t),s=Cn(s,l),t.callbackPriority=i,t.callbackNode=s,i}return l!==null&&l!==null&&fn(l),t.callbackPriority=2,t.callbackNode=null,2}function Tv(t,i){if(ti!==0&&ti!==5)return t.callbackNode=null,t.callbackPriority=0,null;var s=t.callbackNode;if(_u()&&t.callbackNode!==s)return null;var l=Yt;return l=be(t,t===Mn?l:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l===0?null:(rv(t,l,i),Ev(t,Ht()),t.callbackNode!=null&&t.callbackNode===s?Tv.bind(null,t):null)}function Av(t,i){if(_u())return null;rv(t,i,!0)}function PS(){YS(function(){(un&6)!==0?Cn(U,OS):bv()})}function vd(){if(ir===0){var t=mo;t===0&&(t=ct,ct<<=1,(ct&261888)===0&&(ct=256)),ir=t}return ir}function wv(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:xa(""+t)}function Rv(t,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,t.id&&s.setAttribute("form",t.id),i.parentNode.insertBefore(s,i),t=new FormData(t),s.parentNode.removeChild(s),t}function FS(t,i,s,l,f){if(i==="submit"&&s&&s.stateNode===f){var h=wv((f[Jt]||null).action),S=l.submitter;S&&(i=(i=S[Jt]||null)?wv(i.formAction):S.getAttribute("formAction"),i!==null&&(h=i,S=null));var w=new es("action","action",null,l,f);t.push({event:w,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(ir!==0){var V=S?Rv(f,S):new FormData(f);Bh(s,{pending:!0,data:V,method:f.method,action:h},null,V)}}else typeof h=="function"&&(w.preventDefault(),V=S?Rv(f,S):new FormData(f),Bh(s,{pending:!0,data:V,method:f.method,action:h},h,V))},currentTarget:f}]})}}for(var _d=0;_d<eh.length;_d++){var xd=eh[_d],BS=xd.toLowerCase(),zS=xd[0].toUpperCase()+xd.slice(1);ba(BS,"on"+zS)}ba(sg,"onAnimationEnd"),ba(rg,"onAnimationIteration"),ba(og,"onAnimationStart"),ba("dblclick","onDoubleClick"),ba("focusin","onFocus"),ba("focusout","onBlur"),ba(eS,"onTransitionRun"),ba(tS,"onTransitionStart"),ba(nS,"onTransitionCancel"),ba(lg,"onTransitionEnd"),fe("onMouseEnter",["mouseout","mouseover"]),fe("onMouseLeave",["mouseout","mouseover"]),fe("onPointerEnter",["pointerout","pointerover"]),fe("onPointerLeave",["pointerout","pointerover"]),Z("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Z("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Z("onBeforeInput",["compositionend","keypress","textInput","paste"]),Z("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Z("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Z("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ql="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),IS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ql));function Cv(t,i){i=(i&4)!==0;for(var s=0;s<t.length;s++){var l=t[s],f=l.event;l=l.listeners;e:{var h=void 0;if(i)for(var S=l.length-1;0<=S;S--){var w=l[S],V=w.instance,ue=w.currentTarget;if(w=w.listener,V!==h&&f.isPropagationStopped())break e;h=w,f.currentTarget=ue;try{h(f)}catch(Ee){Pc(Ee)}f.currentTarget=null,h=V}else for(S=0;S<l.length;S++){if(w=l[S],V=w.instance,ue=w.currentTarget,w=w.listener,V!==h&&f.isPropagationStopped())break e;h=w,f.currentTarget=ue;try{h(f)}catch(Ee){Pc(Ee)}f.currentTarget=null,h=V}}}}function Xt(t,i){var s=i[Pa];s===void 0&&(s=i[Pa]=new Set);var l=t+"__bubble";s.has(l)||(Dv(i,t,2,!1),s.add(l))}function yd(t,i,s){var l=0;i&&(l|=4),Dv(s,t,l,i)}var Su="_reactListening"+Math.random().toString(36).slice(2);function Sd(t){if(!t[Su]){t[Su]=!0,Ns.forEach(function(s){s!=="selectionchange"&&(IS.has(s)||yd(s,!1,t),yd(s,!0,t))});var i=t.nodeType===9?t:t.ownerDocument;i===null||i[Su]||(i[Su]=!0,yd("selectionchange",!1,i))}}function Dv(t,i,s,l){switch(s_(i)){case 2:var f=dM;break;case 8:f=pM;break;default:f=Fd}s=f.bind(null,i,s,t),f=void 0,!Us||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(f=!0),l?f!==void 0?t.addEventListener(i,s,{capture:!0,passive:f}):t.addEventListener(i,s,!0):f!==void 0?t.addEventListener(i,s,{passive:f}):t.addEventListener(i,s,!1)}function Md(t,i,s,l,f){var h=l;if((i&1)===0&&(i&2)===0&&l!==null)e:for(;;){if(l===null)return;var S=l.tag;if(S===3||S===4){var w=l.stateNode.containerInfo;if(w===f)break;if(S===4)for(S=l.return;S!==null;){var V=S.tag;if((V===3||V===4)&&S.stateNode.containerInfo===f)return;S=S.return}for(;w!==null;){if(S=gi(w),S===null)return;if(V=S.tag,V===5||V===6||V===26||V===27){l=h=S;continue e}w=w.parentNode}}l=l.return}Ec(function(){var ue=h,Ee=fl(s),we=[];e:{var pe=cg.get(t);if(pe!==void 0){var me=es,st=t;switch(t){case"keypress":if(St(s)===0)break e;case"keydown":case"keyup":me=Uc;break;case"focusin":st="focus",me=Bs;break;case"focusout":st="blur",me=Bs;break;case"beforeblur":case"afterblur":me=Bs;break;case"click":if(s.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":me=ns;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":me=Tc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":me=Le;break;case sg:case rg:case og:me=wc;break;case lg:me=ke;break;case"scroll":case"scrollend":me=pl;break;case"wheel":me=it;break;case"copy":case"cut":case"paste":me=ao;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":me=Ar;break;case"toggle":case"beforetoggle":me=yt}var _t=(i&4)!==0,xn=!_t&&(t==="scroll"||t==="scrollend"),$=_t?pe!==null?pe+"Capture":null:pe;_t=[];for(var W=ue,ce;W!==null;){var Te=W;if(ce=Te.stateNode,Te=Te.tag,Te!==5&&Te!==26&&Te!==27||ce===null||$===null||(Te=Ot(W,$),Te!=null&&_t.push(Wl(W,Te,ce))),xn)break;W=W.return}0<_t.length&&(pe=new me(pe,st,null,s,Ee),we.push({event:pe,listeners:_t}))}}if((i&7)===0){e:{if(pe=t==="mouseover"||t==="pointerover",me=t==="mouseout"||t==="pointerout",pe&&s!==no&&(st=s.relatedTarget||s.fromElement)&&(gi(st)||st[hn]))break e;if((me||pe)&&(pe=Ee.window===Ee?Ee:(pe=Ee.ownerDocument)?pe.defaultView||pe.parentWindow:window,me?(st=s.relatedTarget||s.toElement,me=ue,st=st?gi(st):null,st!==null&&(xn=c(st),_t=st.tag,st!==xn||_t!==5&&_t!==27&&_t!==6)&&(st=null)):(me=null,st=ue),me!==st)){if(_t=ns,Te="onMouseLeave",$="onMouseEnter",W="mouse",(t==="pointerout"||t==="pointerover")&&(_t=Ar,Te="onPointerLeave",$="onPointerEnter",W="pointer"),xn=me==null?pe:Ja(me),ce=st==null?pe:Ja(st),pe=new _t(Te,W+"leave",me,s,Ee),pe.target=xn,pe.relatedTarget=ce,Te=null,gi(Ee)===ue&&(_t=new _t($,W+"enter",st,s,Ee),_t.target=ce,_t.relatedTarget=xn,Te=_t),xn=Te,me&&st)t:{for(_t=HS,$=me,W=st,ce=0,Te=$;Te;Te=_t(Te))ce++;Te=0;for(var pt=W;pt;pt=_t(pt))Te++;for(;0<ce-Te;)$=_t($),ce--;for(;0<Te-ce;)W=_t(W),Te--;for(;ce--;){if($===W||W!==null&&$===W.alternate){_t=$;break t}$=_t($),W=_t(W)}_t=null}else _t=null;me!==null&&Nv(we,pe,me,_t,!1),st!==null&&xn!==null&&Nv(we,xn,st,_t,!0)}}e:{if(pe=ue?Ja(ue):window,me=pe.nodeName&&pe.nodeName.toLowerCase(),me==="select"||me==="input"&&pe.type==="file")var on=at;else if(so(pe))if(gt)on=Qy;else{on=xl;var ut=ss}else me=pe.nodeName,!me||me.toLowerCase()!=="input"||pe.type!=="checkbox"&&pe.type!=="radio"?ue&&an(ue.elementType)&&(on=at):on=Ky;if(on&&(on=on(t,ue))){wr(we,on,s,Ee);break e}ut&&ut(t,pe,ue),t==="focusout"&&ue&&pe.type==="number"&&ue.memoizedProps.value!=null&&bt(pe,"number",pe.value)}switch(ut=ue?Ja(ue):window,t){case"focusin":(so(ut)||ut.contentEditable==="true")&&(ro=ut,Qf=ue,Sl=null);break;case"focusout":Sl=Qf=ro=null;break;case"mousedown":Jf=!0;break;case"contextmenu":case"mouseup":case"dragend":Jf=!1,ig(we,s,Ee);break;case"selectionchange":if($y)break;case"keydown":case"keyup":ig(we,s,Ee)}var Pt;if(Pn)e:{switch(t){case"compositionstart":var jt="onCompositionStart";break e;case"compositionend":jt="onCompositionEnd";break e;case"compositionupdate":jt="onCompositionUpdate";break e}jt=void 0}else ia?zs(t,s)&&(jt="onCompositionEnd"):t==="keydown"&&s.keyCode===229&&(jt="onCompositionStart");jt&&(Tn&&s.locale!=="ko"&&(ia||jt!=="onCompositionStart"?jt==="onCompositionEnd"&&ia&&(Pt=dl()):(ya=Ee,Os="value"in ya?ya.value:ya.textContent,ia=!0)),ut=Mu(ue,jt),0<ut.length&&(jt=new _l(jt,t,null,s,Ee),we.push({event:jt,listeners:ut}),Pt?jt.data=Pt:(Pt=Is(s),Pt!==null&&(jt.data=Pt)))),(Pt=Sa?_i(t,s):Ma(t,s))&&(jt=Mu(ue,"onBeforeInput"),0<jt.length&&(ut=new _l("onBeforeInput","beforeinput",null,s,Ee),we.push({event:ut,listeners:jt}),ut.data=Pt)),FS(we,t,ue,s,Ee)}Cv(we,i)})}function Wl(t,i,s){return{instance:t,listener:i,currentTarget:s}}function Mu(t,i){for(var s=i+"Capture",l=[];t!==null;){var f=t,h=f.stateNode;if(f=f.tag,f!==5&&f!==26&&f!==27||h===null||(f=Ot(t,s),f!=null&&l.unshift(Wl(t,f,h)),f=Ot(t,i),f!=null&&l.push(Wl(t,f,h))),t.tag===3)return l;t=t.return}return[]}function HS(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Nv(t,i,s,l,f){for(var h=i._reactName,S=[];s!==null&&s!==l;){var w=s,V=w.alternate,ue=w.stateNode;if(w=w.tag,V!==null&&V===l)break;w!==5&&w!==26&&w!==27||ue===null||(V=ue,f?(ue=Ot(s,h),ue!=null&&S.unshift(Wl(s,ue,V))):f||(ue=Ot(s,h),ue!=null&&S.push(Wl(s,ue,V)))),s=s.return}S.length!==0&&t.push({event:i,listeners:S})}var GS=/\r\n?/g,kS=/\u0000|\uFFFD/g;function Lv(t){return(typeof t=="string"?t:""+t).replace(GS,`
`).replace(kS,"")}function Uv(t,i){return i=Lv(i),Lv(t)===i}function _n(t,i,s,l,f,h){switch(s){case"children":typeof l=="string"?i==="body"||i==="textarea"&&l===""||ei(t,l):(typeof l=="number"||typeof l=="bigint")&&i!=="body"&&ei(t,""+l);break;case"className":ge(t,"class",l);break;case"tabIndex":ge(t,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":ge(t,s,l);break;case"style":Ri(t,l,h);break;case"data":if(i!=="object"){ge(t,"data",l);break}case"src":case"href":if(l===""&&(i!=="a"||s!=="href")){t.removeAttribute(s);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(s);break}l=xa(""+l),t.setAttribute(s,l);break;case"action":case"formAction":if(typeof l=="function"){t.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(s==="formAction"?(i!=="input"&&_n(t,i,"name",f.name,f,null),_n(t,i,"formEncType",f.formEncType,f,null),_n(t,i,"formMethod",f.formMethod,f,null),_n(t,i,"formTarget",f.formTarget,f,null)):(_n(t,i,"encType",f.encType,f,null),_n(t,i,"method",f.method,f,null),_n(t,i,"target",f.target,f,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(s);break}l=xa(""+l),t.setAttribute(s,l);break;case"onClick":l!=null&&(t.onclick=Ba);break;case"onScroll":l!=null&&Xt("scroll",t);break;case"onScrollEnd":l!=null&&Xt("scrollend",t);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));t.innerHTML=s}}break;case"multiple":t.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":t.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){t.removeAttribute("xlink:href");break}s=xa(""+l),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(s,""+l):t.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(s,""):t.removeAttribute(s);break;case"capture":case"download":l===!0?t.setAttribute(s,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(s,l):t.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?t.setAttribute(s,l):t.removeAttribute(s);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?t.removeAttribute(s):t.setAttribute(s,l);break;case"popover":Xt("beforetoggle",t),Xt("toggle",t),X(t,"popover",l);break;case"xlinkActuate":J(t,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":J(t,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":J(t,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":J(t,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":J(t,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":J(t,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":J(t,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":J(t,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":J(t,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":X(t,"is",l);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=dt.get(s)||s,X(t,s,l))}}function bd(t,i,s,l,f,h){switch(s){case"style":Ri(t,l,h);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));t.innerHTML=s}}break;case"children":typeof l=="string"?ei(t,l):(typeof l=="number"||typeof l=="bigint")&&ei(t,""+l);break;case"onScroll":l!=null&&Xt("scroll",t);break;case"onScrollEnd":l!=null&&Xt("scrollend",t);break;case"onClick":l!=null&&(t.onclick=Ba);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!A.hasOwnProperty(s))e:{if(s[0]==="o"&&s[1]==="n"&&(f=s.endsWith("Capture"),i=s.slice(2,f?s.length-7:void 0),h=t[Jt]||null,h=h!=null?h[s]:null,typeof h=="function"&&t.removeEventListener(i,h,f),typeof l=="function")){typeof h!="function"&&h!==null&&(s in t?t[s]=null:t.hasAttribute(s)&&t.removeAttribute(s)),t.addEventListener(i,l,f);break e}s in t?t[s]=l:l===!0?t.setAttribute(s,""):X(t,s,l)}}}function pi(t,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Xt("error",t),Xt("load",t);var l=!1,f=!1,h;for(h in s)if(s.hasOwnProperty(h)){var S=s[h];if(S!=null)switch(h){case"src":l=!0;break;case"srcSet":f=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:_n(t,i,h,S,s,null)}}f&&_n(t,i,"srcSet",s.srcSet,s,null),l&&_n(t,i,"src",s.src,s,null);return;case"input":Xt("invalid",t);var w=h=S=f=null,V=null,ue=null;for(l in s)if(s.hasOwnProperty(l)){var Ee=s[l];if(Ee!=null)switch(l){case"name":f=Ee;break;case"type":S=Ee;break;case"checked":V=Ee;break;case"defaultChecked":ue=Ee;break;case"value":h=Ee;break;case"defaultValue":w=Ee;break;case"children":case"dangerouslySetInnerHTML":if(Ee!=null)throw Error(a(137,i));break;default:_n(t,i,l,Ee,s,null)}}ft(t,h,w,V,ue,S,f,!1);return;case"select":Xt("invalid",t),l=S=h=null;for(f in s)if(s.hasOwnProperty(f)&&(w=s[f],w!=null))switch(f){case"value":h=w;break;case"defaultValue":S=w;break;case"multiple":l=w;default:_n(t,i,f,w,s,null)}i=h,s=S,t.multiple=!!l,i!=null?ht(t,!!l,i,!1):s!=null&&ht(t,!!l,s,!0);return;case"textarea":Xt("invalid",t),h=f=l=null;for(S in s)if(s.hasOwnProperty(S)&&(w=s[S],w!=null))switch(S){case"value":l=w;break;case"defaultValue":f=w;break;case"children":h=w;break;case"dangerouslySetInnerHTML":if(w!=null)throw Error(a(91));break;default:_n(t,i,S,w,s,null)}gn(t,l,f,h);return;case"option":for(V in s)if(s.hasOwnProperty(V)&&(l=s[V],l!=null))switch(V){case"selected":t.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:_n(t,i,V,l,s,null)}return;case"dialog":Xt("beforetoggle",t),Xt("toggle",t),Xt("cancel",t),Xt("close",t);break;case"iframe":case"object":Xt("load",t);break;case"video":case"audio":for(l=0;l<ql.length;l++)Xt(ql[l],t);break;case"image":Xt("error",t),Xt("load",t);break;case"details":Xt("toggle",t);break;case"embed":case"source":case"link":Xt("error",t),Xt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ue in s)if(s.hasOwnProperty(ue)&&(l=s[ue],l!=null))switch(ue){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:_n(t,i,ue,l,s,null)}return;default:if(an(i)){for(Ee in s)s.hasOwnProperty(Ee)&&(l=s[Ee],l!==void 0&&bd(t,i,Ee,l,s,void 0));return}}for(w in s)s.hasOwnProperty(w)&&(l=s[w],l!=null&&_n(t,i,w,l,s,null))}function VS(t,i,s,l){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var f=null,h=null,S=null,w=null,V=null,ue=null,Ee=null;for(me in s){var we=s[me];if(s.hasOwnProperty(me)&&we!=null)switch(me){case"checked":break;case"value":break;case"defaultValue":V=we;default:l.hasOwnProperty(me)||_n(t,i,me,null,l,we)}}for(var pe in l){var me=l[pe];if(we=s[pe],l.hasOwnProperty(pe)&&(me!=null||we!=null))switch(pe){case"type":h=me;break;case"name":f=me;break;case"checked":ue=me;break;case"defaultChecked":Ee=me;break;case"value":S=me;break;case"defaultValue":w=me;break;case"children":case"dangerouslySetInnerHTML":if(me!=null)throw Error(a(137,i));break;default:me!==we&&_n(t,i,pe,me,l,we)}}Ge(t,S,w,V,ue,Ee,h,f);return;case"select":me=S=w=pe=null;for(h in s)if(V=s[h],s.hasOwnProperty(h)&&V!=null)switch(h){case"value":break;case"multiple":me=V;default:l.hasOwnProperty(h)||_n(t,i,h,null,l,V)}for(f in l)if(h=l[f],V=s[f],l.hasOwnProperty(f)&&(h!=null||V!=null))switch(f){case"value":pe=h;break;case"defaultValue":w=h;break;case"multiple":S=h;default:h!==V&&_n(t,i,f,h,l,V)}i=w,s=S,l=me,pe!=null?ht(t,!!s,pe,!1):!!l!=!!s&&(i!=null?ht(t,!!s,i,!0):ht(t,!!s,s?[]:"",!1));return;case"textarea":me=pe=null;for(w in s)if(f=s[w],s.hasOwnProperty(w)&&f!=null&&!l.hasOwnProperty(w))switch(w){case"value":break;case"children":break;default:_n(t,i,w,null,l,f)}for(S in l)if(f=l[S],h=s[S],l.hasOwnProperty(S)&&(f!=null||h!=null))switch(S){case"value":pe=f;break;case"defaultValue":me=f;break;case"children":break;case"dangerouslySetInnerHTML":if(f!=null)throw Error(a(91));break;default:f!==h&&_n(t,i,S,f,l,h)}wt(t,pe,me);return;case"option":for(var st in s)if(pe=s[st],s.hasOwnProperty(st)&&pe!=null&&!l.hasOwnProperty(st))switch(st){case"selected":t.selected=!1;break;default:_n(t,i,st,null,l,pe)}for(V in l)if(pe=l[V],me=s[V],l.hasOwnProperty(V)&&pe!==me&&(pe!=null||me!=null))switch(V){case"selected":t.selected=pe&&typeof pe!="function"&&typeof pe!="symbol";break;default:_n(t,i,V,pe,l,me)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var _t in s)pe=s[_t],s.hasOwnProperty(_t)&&pe!=null&&!l.hasOwnProperty(_t)&&_n(t,i,_t,null,l,pe);for(ue in l)if(pe=l[ue],me=s[ue],l.hasOwnProperty(ue)&&pe!==me&&(pe!=null||me!=null))switch(ue){case"children":case"dangerouslySetInnerHTML":if(pe!=null)throw Error(a(137,i));break;default:_n(t,i,ue,pe,l,me)}return;default:if(an(i)){for(var xn in s)pe=s[xn],s.hasOwnProperty(xn)&&pe!==void 0&&!l.hasOwnProperty(xn)&&bd(t,i,xn,void 0,l,pe);for(Ee in l)pe=l[Ee],me=s[Ee],!l.hasOwnProperty(Ee)||pe===me||pe===void 0&&me===void 0||bd(t,i,Ee,pe,l,me);return}}for(var $ in s)pe=s[$],s.hasOwnProperty($)&&pe!=null&&!l.hasOwnProperty($)&&_n(t,i,$,null,l,pe);for(we in l)pe=l[we],me=s[we],!l.hasOwnProperty(we)||pe===me||pe==null&&me==null||_n(t,i,we,pe,l,me)}function Ov(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function XS(){if(typeof performance.getEntriesByType=="function"){for(var t=0,i=0,s=performance.getEntriesByType("resource"),l=0;l<s.length;l++){var f=s[l],h=f.transferSize,S=f.initiatorType,w=f.duration;if(h&&w&&Ov(S)){for(S=0,w=f.responseEnd,l+=1;l<s.length;l++){var V=s[l],ue=V.startTime;if(ue>w)break;var Ee=V.transferSize,we=V.initiatorType;Ee&&Ov(we)&&(V=V.responseEnd,S+=Ee*(V<w?1:(w-ue)/(V-ue)))}if(--l,i+=8*(h+S)/(f.duration/1e3),t++,10<t)break}}if(0<t)return i/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Ed=null,Td=null;function bu(t){return t.nodeType===9?t:t.ownerDocument}function Pv(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Fv(t,i){if(t===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&i==="foreignObject"?0:t}function Ad(t,i){return t==="textarea"||t==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var wd=null;function qS(){var t=window.event;return t&&t.type==="popstate"?t===wd?!1:(wd=t,!0):(wd=null,!1)}var Bv=typeof setTimeout=="function"?setTimeout:void 0,WS=typeof clearTimeout=="function"?clearTimeout:void 0,zv=typeof Promise=="function"?Promise:void 0,YS=typeof queueMicrotask=="function"?queueMicrotask:typeof zv<"u"?function(t){return zv.resolve(null).then(t).catch(jS)}:Bv;function jS(t){setTimeout(function(){throw t})}function ar(t){return t==="head"}function Iv(t,i){var s=i,l=0;do{var f=s.nextSibling;if(t.removeChild(s),f&&f.nodeType===8)if(s=f.data,s==="/$"||s==="/&"){if(l===0){t.removeChild(f),Oo(i);return}l--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")l++;else if(s==="html")Yl(t.ownerDocument.documentElement);else if(s==="head"){s=t.ownerDocument.head,Yl(s);for(var h=s.firstChild;h;){var S=h.nextSibling,w=h.nodeName;h[wi]||w==="SCRIPT"||w==="STYLE"||w==="LINK"&&h.rel.toLowerCase()==="stylesheet"||s.removeChild(h),h=S}}else s==="body"&&Yl(t.ownerDocument.body);s=f}while(s);Oo(i)}function Hv(t,i){var s=t;t=0;do{var l=s.nextSibling;if(s.nodeType===1?i?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(i?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),l&&l.nodeType===8)if(s=l.data,s==="/$"){if(t===0)break;t--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||t++;s=l}while(s)}function Rd(t){var i=t.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":Rd(s),si(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}t.removeChild(s)}}function ZS(t,i,s,l){for(;t.nodeType===1;){var f=s;if(t.nodeName.toLowerCase()!==i.toLowerCase()){if(!l&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(l){if(!t[wi])switch(i){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(h=t.getAttribute("rel"),h==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(h!==f.rel||t.getAttribute("href")!==(f.href==null||f.href===""?null:f.href)||t.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin)||t.getAttribute("title")!==(f.title==null?null:f.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(h=t.getAttribute("src"),(h!==(f.src==null?null:f.src)||t.getAttribute("type")!==(f.type==null?null:f.type)||t.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin))&&h&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(i==="input"&&t.type==="hidden"){var h=f.name==null?null:""+f.name;if(f.type==="hidden"&&t.getAttribute("name")===h)return t}else return t;if(t=ha(t.nextSibling),t===null)break}return null}function KS(t,i,s){if(i==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!s||(t=ha(t.nextSibling),t===null))return null;return t}function Gv(t,i){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!i||(t=ha(t.nextSibling),t===null))return null;return t}function Cd(t){return t.data==="$?"||t.data==="$~"}function Dd(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function QS(t,i){var s=t.ownerDocument;if(t.data==="$~")t._reactRetry=i;else if(t.data!=="$?"||s.readyState!=="loading")i();else{var l=function(){i(),s.removeEventListener("DOMContentLoaded",l)};s.addEventListener("DOMContentLoaded",l),t._reactRetry=l}}function ha(t){for(;t!=null;t=t.nextSibling){var i=t.nodeType;if(i===1||i===3)break;if(i===8){if(i=t.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return t}var Nd=null;function kv(t){t=t.nextSibling;for(var i=0;t;){if(t.nodeType===8){var s=t.data;if(s==="/$"||s==="/&"){if(i===0)return ha(t.nextSibling);i--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||i++}t=t.nextSibling}return null}function Vv(t){t=t.previousSibling;for(var i=0;t;){if(t.nodeType===8){var s=t.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(i===0)return t;i--}else s!=="/$"&&s!=="/&"||i++}t=t.previousSibling}return null}function Xv(t,i,s){switch(i=bu(s),t){case"html":if(t=i.documentElement,!t)throw Error(a(452));return t;case"head":if(t=i.head,!t)throw Error(a(453));return t;case"body":if(t=i.body,!t)throw Error(a(454));return t;default:throw Error(a(451))}}function Yl(t){for(var i=t.attributes;i.length;)t.removeAttributeNode(i[0]);si(t)}var da=new Map,qv=new Set;function Eu(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var ys=k.d;k.d={f:JS,r:$S,D:eM,C:tM,L:nM,m:iM,X:sM,S:aM,M:rM};function JS(){var t=ys.f(),i=mu();return t||i}function $S(t){var i=ea(t);i!==null&&i.tag===5&&i.type==="form"?l0(i):ys.r(t)}var No=typeof document>"u"?null:document;function Wv(t,i,s){var l=No;if(l&&typeof i=="string"&&i){var f=Tt(i);f='link[rel="'+t+'"][href="'+f+'"]',typeof s=="string"&&(f+='[crossorigin="'+s+'"]'),qv.has(f)||(qv.add(f),t={rel:t,crossOrigin:s,href:i},l.querySelector(f)===null&&(i=l.createElement("link"),pi(i,"link",t),Bn(i),l.head.appendChild(i)))}}function eM(t){ys.D(t),Wv("dns-prefetch",t,null)}function tM(t,i){ys.C(t,i),Wv("preconnect",t,i)}function nM(t,i,s){ys.L(t,i,s);var l=No;if(l&&t&&i){var f='link[rel="preload"][as="'+Tt(i)+'"]';i==="image"&&s&&s.imageSrcSet?(f+='[imagesrcset="'+Tt(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(f+='[imagesizes="'+Tt(s.imageSizes)+'"]')):f+='[href="'+Tt(t)+'"]';var h=f;switch(i){case"style":h=Lo(t);break;case"script":h=Uo(t)}da.has(h)||(t=_({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:t,as:i},s),da.set(h,t),l.querySelector(f)!==null||i==="style"&&l.querySelector(jl(h))||i==="script"&&l.querySelector(Zl(h))||(i=l.createElement("link"),pi(i,"link",t),Bn(i),l.head.appendChild(i)))}}function iM(t,i){ys.m(t,i);var s=No;if(s&&t){var l=i&&typeof i.as=="string"?i.as:"script",f='link[rel="modulepreload"][as="'+Tt(l)+'"][href="'+Tt(t)+'"]',h=f;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=Uo(t)}if(!da.has(h)&&(t=_({rel:"modulepreload",href:t},i),da.set(h,t),s.querySelector(f)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(Zl(h)))return}l=s.createElement("link"),pi(l,"link",t),Bn(l),s.head.appendChild(l)}}}function aM(t,i,s){ys.S(t,i,s);var l=No;if(l&&t){var f=Fa(l).hoistableStyles,h=Lo(t);i=i||"default";var S=f.get(h);if(!S){var w={loading:0,preload:null};if(S=l.querySelector(jl(h)))w.loading=5;else{t=_({rel:"stylesheet",href:t,"data-precedence":i},s),(s=da.get(h))&&Ld(t,s);var V=S=l.createElement("link");Bn(V),pi(V,"link",t),V._p=new Promise(function(ue,Ee){V.onload=ue,V.onerror=Ee}),V.addEventListener("load",function(){w.loading|=1}),V.addEventListener("error",function(){w.loading|=2}),w.loading|=4,Tu(S,i,l)}S={type:"stylesheet",instance:S,count:1,state:w},f.set(h,S)}}}function sM(t,i){ys.X(t,i);var s=No;if(s&&t){var l=Fa(s).hoistableScripts,f=Uo(t),h=l.get(f);h||(h=s.querySelector(Zl(f)),h||(t=_({src:t,async:!0},i),(i=da.get(f))&&Ud(t,i),h=s.createElement("script"),Bn(h),pi(h,"link",t),s.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},l.set(f,h))}}function rM(t,i){ys.M(t,i);var s=No;if(s&&t){var l=Fa(s).hoistableScripts,f=Uo(t),h=l.get(f);h||(h=s.querySelector(Zl(f)),h||(t=_({src:t,async:!0,type:"module"},i),(i=da.get(f))&&Ud(t,i),h=s.createElement("script"),Bn(h),pi(h,"link",t),s.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},l.set(f,h))}}function Yv(t,i,s,l){var f=(f=re.current)?Eu(f):null;if(!f)throw Error(a(446));switch(t){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=Lo(s.href),s=Fa(f).hoistableStyles,l=s.get(i),l||(l={type:"style",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){t=Lo(s.href);var h=Fa(f).hoistableStyles,S=h.get(t);if(S||(f=f.ownerDocument||f,S={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(t,S),(h=f.querySelector(jl(t)))&&!h._p&&(S.instance=h,S.state.loading=5),da.has(t)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},da.set(t,s),h||oM(f,t,s,S.state))),i&&l===null)throw Error(a(528,""));return S}if(i&&l!==null)throw Error(a(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Uo(s),s=Fa(f).hoistableScripts,l=s.get(i),l||(l={type:"script",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,t))}}function Lo(t){return'href="'+Tt(t)+'"'}function jl(t){return'link[rel="stylesheet"]['+t+"]"}function jv(t){return _({},t,{"data-precedence":t.precedence,precedence:null})}function oM(t,i,s,l){t.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=t.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),pi(i,"link",s),Bn(i),t.head.appendChild(i))}function Uo(t){return'[src="'+Tt(t)+'"]'}function Zl(t){return"script[async]"+t}function Zv(t,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var l=t.querySelector('style[data-href~="'+Tt(s.href)+'"]');if(l)return i.instance=l,Bn(l),l;var f=_({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return l=(t.ownerDocument||t).createElement("style"),Bn(l),pi(l,"style",f),Tu(l,s.precedence,t),i.instance=l;case"stylesheet":f=Lo(s.href);var h=t.querySelector(jl(f));if(h)return i.state.loading|=4,i.instance=h,Bn(h),h;l=jv(s),(f=da.get(f))&&Ld(l,f),h=(t.ownerDocument||t).createElement("link"),Bn(h);var S=h;return S._p=new Promise(function(w,V){S.onload=w,S.onerror=V}),pi(h,"link",l),i.state.loading|=4,Tu(h,s.precedence,t),i.instance=h;case"script":return h=Uo(s.src),(f=t.querySelector(Zl(h)))?(i.instance=f,Bn(f),f):(l=s,(f=da.get(h))&&(l=_({},s),Ud(l,f)),t=t.ownerDocument||t,f=t.createElement("script"),Bn(f),pi(f,"link",l),t.head.appendChild(f),i.instance=f);case"void":return null;default:throw Error(a(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(l=i.instance,i.state.loading|=4,Tu(l,s.precedence,t));return i.instance}function Tu(t,i,s){for(var l=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),f=l.length?l[l.length-1]:null,h=f,S=0;S<l.length;S++){var w=l[S];if(w.dataset.precedence===i)h=w;else if(h!==f)break}h?h.parentNode.insertBefore(t,h.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(t,i.firstChild))}function Ld(t,i){t.crossOrigin==null&&(t.crossOrigin=i.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=i.referrerPolicy),t.title==null&&(t.title=i.title)}function Ud(t,i){t.crossOrigin==null&&(t.crossOrigin=i.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=i.referrerPolicy),t.integrity==null&&(t.integrity=i.integrity)}var Au=null;function Kv(t,i,s){if(Au===null){var l=new Map,f=Au=new Map;f.set(s,l)}else f=Au,l=f.get(s),l||(l=new Map,f.set(s,l));if(l.has(t))return l;for(l.set(t,null),s=s.getElementsByTagName(t),f=0;f<s.length;f++){var h=s[f];if(!(h[wi]||h[On]||t==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var S=h.getAttribute(i)||"";S=t+S;var w=l.get(S);w?w.push(h):l.set(S,[h])}}return l}function Qv(t,i,s){t=t.ownerDocument||t,t.head.insertBefore(s,i==="title"?t.querySelector("head > title"):null)}function lM(t,i,s){if(s===1||i.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return t=i.disabled,typeof i.precedence=="string"&&t==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function Jv(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function cM(t,i,s,l){if(s.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var f=Lo(l.href),h=i.querySelector(jl(f));if(h){i=h._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(t.count++,t=wu.bind(t),i.then(t,t)),s.state.loading|=4,s.instance=h,Bn(h);return}h=i.ownerDocument||i,l=jv(l),(f=da.get(f))&&Ld(l,f),h=h.createElement("link"),Bn(h);var S=h;S._p=new Promise(function(w,V){S.onload=w,S.onerror=V}),pi(h,"link",l),s.instance=h}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(s,i),(i=s.state.preload)&&(s.state.loading&3)===0&&(t.count++,s=wu.bind(t),i.addEventListener("load",s),i.addEventListener("error",s))}}var Od=0;function uM(t,i){return t.stylesheets&&t.count===0&&Cu(t,t.stylesheets),0<t.count||0<t.imgCount?function(s){var l=setTimeout(function(){if(t.stylesheets&&Cu(t,t.stylesheets),t.unsuspend){var h=t.unsuspend;t.unsuspend=null,h()}},6e4+i);0<t.imgBytes&&Od===0&&(Od=62500*XS());var f=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Cu(t,t.stylesheets),t.unsuspend)){var h=t.unsuspend;t.unsuspend=null,h()}},(t.imgBytes>Od?50:800)+i);return t.unsuspend=s,function(){t.unsuspend=null,clearTimeout(l),clearTimeout(f)}}:null}function wu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Cu(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Ru=null;function Cu(t,i){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Ru=new Map,i.forEach(fM,t),Ru=null,wu.call(t))}function fM(t,i){if(!(i.state.loading&4)){var s=Ru.get(t);if(s)var l=s.get(null);else{s=new Map,Ru.set(t,s);for(var f=t.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<f.length;h++){var S=f[h];(S.nodeName==="LINK"||S.getAttribute("media")!=="not all")&&(s.set(S.dataset.precedence,S),l=S)}l&&s.set(null,l)}f=i.instance,S=f.getAttribute("data-precedence"),h=s.get(S)||l,h===l&&s.set(null,f),s.set(S,f),this.count++,l=wu.bind(this),f.addEventListener("load",l),f.addEventListener("error",l),h?h.parentNode.insertBefore(f,h.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(f,t.firstChild)),i.state.loading|=4}}var Kl={$$typeof:N,Provider:null,Consumer:null,_currentValue:ne,_currentValue2:ne,_threadCount:0};function hM(t,i,s,l,f,h,S,w,V){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=rt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=rt(0),this.hiddenUpdates=rt(null),this.identifierPrefix=l,this.onUncaughtError=f,this.onCaughtError=h,this.onRecoverableError=S,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=V,this.incompleteTransitions=new Map}function $v(t,i,s,l,f,h,S,w,V,ue,Ee,we){return t=new hM(t,i,s,S,V,ue,Ee,we,w),i=1,h===!0&&(i|=24),h=Xi(3,null,null,i),t.current=h,h.stateNode=t,i=dh(),i.refCount++,t.pooledCache=i,i.refCount++,h.memoizedState={element:l,isDehydrated:s,cache:i},vh(h),t}function e_(t){return t?(t=co,t):co}function t_(t,i,s,l,f,h){f=e_(f),l.context===null?l.context=f:l.pendingContext=f,l=Ys(i),l.payload={element:s},h=h===void 0?null:h,h!==null&&(l.callback=h),s=js(t,l,i),s!==null&&(zi(s,t,i),Rl(s,t,i))}function n_(t,i){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var s=t.retryLane;t.retryLane=s!==0&&s<i?s:i}}function Pd(t,i){n_(t,i),(t=t.alternate)&&n_(t,i)}function i_(t){if(t.tag===13||t.tag===31){var i=Dr(t,67108864);i!==null&&zi(i,t,67108864),Pd(t,67108864)}}function a_(t){if(t.tag===13||t.tag===31){var i=Zi();i=Qa(i);var s=Dr(t,i);s!==null&&zi(s,t,i),Pd(t,i)}}var Du=!0;function dM(t,i,s,l){var f=H.T;H.T=null;var h=k.p;try{k.p=2,Fd(t,i,s,l)}finally{k.p=h,H.T=f}}function pM(t,i,s,l){var f=H.T;H.T=null;var h=k.p;try{k.p=8,Fd(t,i,s,l)}finally{k.p=h,H.T=f}}function Fd(t,i,s,l){if(Du){var f=Bd(l);if(f===null)Md(t,i,l,Nu,s),r_(t,l);else if(gM(f,t,i,s,l))l.stopPropagation();else if(r_(t,l),i&4&&-1<mM.indexOf(t)){for(;f!==null;){var h=ea(f);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var S=Be(h.pendingLanes);if(S!==0){var w=h;for(w.pendingLanes|=2,w.entangledLanes|=2;S;){var V=1<<31-et(S);w.entanglements[1]|=V,S&=~V}Xa(h),(un&6)===0&&(du=Ht()+500,Xl(0))}}break;case 31:case 13:w=Dr(h,2),w!==null&&zi(w,h,2),mu(),Pd(h,2)}if(h=Bd(l),h===null&&Md(t,i,l,Nu,s),h===f)break;f=h}f!==null&&l.stopPropagation()}else Md(t,i,l,null,s)}}function Bd(t){return t=fl(t),zd(t)}var Nu=null;function zd(t){if(Nu=null,t=gi(t),t!==null){var i=c(t);if(i===null)t=null;else{var s=i.tag;if(s===13){if(t=u(i),t!==null)return t;t=null}else if(s===31){if(t=d(i),t!==null)return t;t=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;t=null}else i!==t&&(t=null)}}return Nu=t,null}function s_(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Gt()){case U:return 2;case b:return 8;case te:case he:return 32;case _e:return 268435456;default:return 32}default:return 32}}var Id=!1,sr=null,rr=null,or=null,Ql=new Map,Jl=new Map,lr=[],mM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function r_(t,i){switch(t){case"focusin":case"focusout":sr=null;break;case"dragenter":case"dragleave":rr=null;break;case"mouseover":case"mouseout":or=null;break;case"pointerover":case"pointerout":Ql.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Jl.delete(i.pointerId)}}function $l(t,i,s,l,f,h){return t===null||t.nativeEvent!==h?(t={blockedOn:i,domEventName:s,eventSystemFlags:l,nativeEvent:h,targetContainers:[f]},i!==null&&(i=ea(i),i!==null&&i_(i)),t):(t.eventSystemFlags|=l,i=t.targetContainers,f!==null&&i.indexOf(f)===-1&&i.push(f),t)}function gM(t,i,s,l,f){switch(i){case"focusin":return sr=$l(sr,t,i,s,l,f),!0;case"dragenter":return rr=$l(rr,t,i,s,l,f),!0;case"mouseover":return or=$l(or,t,i,s,l,f),!0;case"pointerover":var h=f.pointerId;return Ql.set(h,$l(Ql.get(h)||null,t,i,s,l,f)),!0;case"gotpointercapture":return h=f.pointerId,Jl.set(h,$l(Jl.get(h)||null,t,i,s,l,f)),!0}return!1}function o_(t){var i=gi(t.target);if(i!==null){var s=c(i);if(s!==null){if(i=s.tag,i===13){if(i=u(s),i!==null){t.blockedOn=i,_a(t.priority,function(){a_(s)});return}}else if(i===31){if(i=d(s),i!==null){t.blockedOn=i,_a(t.priority,function(){a_(s)});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){t.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Lu(t){if(t.blockedOn!==null)return!1;for(var i=t.targetContainers;0<i.length;){var s=Bd(t.nativeEvent);if(s===null){s=t.nativeEvent;var l=new s.constructor(s.type,s);no=l,s.target.dispatchEvent(l),no=null}else return i=ea(s),i!==null&&i_(i),t.blockedOn=s,!1;i.shift()}return!0}function l_(t,i,s){Lu(t)&&s.delete(i)}function vM(){Id=!1,sr!==null&&Lu(sr)&&(sr=null),rr!==null&&Lu(rr)&&(rr=null),or!==null&&Lu(or)&&(or=null),Ql.forEach(l_),Jl.forEach(l_)}function Uu(t,i){t.blockedOn===i&&(t.blockedOn=null,Id||(Id=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,vM)))}var Ou=null;function c_(t){Ou!==t&&(Ou=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Ou===t&&(Ou=null);for(var i=0;i<t.length;i+=3){var s=t[i],l=t[i+1],f=t[i+2];if(typeof l!="function"){if(zd(l||s)===null)continue;break}var h=ea(s);h!==null&&(t.splice(i,3),i-=3,Bh(h,{pending:!0,data:f,method:s.method,action:l},l,f))}}))}function Oo(t){function i(V){return Uu(V,t)}sr!==null&&Uu(sr,t),rr!==null&&Uu(rr,t),or!==null&&Uu(or,t),Ql.forEach(i),Jl.forEach(i);for(var s=0;s<lr.length;s++){var l=lr[s];l.blockedOn===t&&(l.blockedOn=null)}for(;0<lr.length&&(s=lr[0],s.blockedOn===null);)o_(s),s.blockedOn===null&&lr.shift();if(s=(t.ownerDocument||t).$$reactFormReplay,s!=null)for(l=0;l<s.length;l+=3){var f=s[l],h=s[l+1],S=f[Jt]||null;if(typeof h=="function")S||c_(s);else if(S){var w=null;if(h&&h.hasAttribute("formAction")){if(f=h,S=h[Jt]||null)w=S.formAction;else if(zd(f)!==null)continue}else w=S.action;typeof w=="function"?s[l+1]=w:(s.splice(l,3),l-=3),c_(s)}}}function u_(){function t(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(S){return f=S})},focusReset:"manual",scroll:"manual"})}function i(){f!==null&&(f(),f=null),l||setTimeout(s,20)}function s(){if(!l&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,f=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(s,100),function(){l=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),f!==null&&(f(),f=null)}}}function Hd(t){this._internalRoot=t}Pu.prototype.render=Hd.prototype.render=function(t){var i=this._internalRoot;if(i===null)throw Error(a(409));var s=i.current,l=Zi();t_(s,l,t,i,null,null)},Pu.prototype.unmount=Hd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var i=t.containerInfo;t_(t.current,2,null,t,null,null),mu(),i[hn]=null}};function Pu(t){this._internalRoot=t}Pu.prototype.unstable_scheduleHydration=function(t){if(t){var i=Oa();t={blockedOn:null,target:t,priority:i};for(var s=0;s<lr.length&&i!==0&&i<lr[s].priority;s++);lr.splice(s,0,t),s===0&&o_(t)}};var f_=e.version;if(f_!=="19.2.8")throw Error(a(527,f_,"19.2.8"));k.findDOMNode=function(t){var i=t._reactInternals;if(i===void 0)throw typeof t.render=="function"?Error(a(188)):(t=Object.keys(t).join(","),Error(a(268,t)));return t=p(i),t=t!==null?v(t):null,t=t===null?null:t.stateNode,t};var _M={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:H,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Fu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Fu.isDisabled&&Fu.supportsFiber)try{xe=Fu.inject(_M),ye=Fu}catch{}}return tc.createRoot=function(t,i){if(!o(t))throw Error(a(299));var s=!1,l="",f=_0,h=x0,S=y0;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onUncaughtError!==void 0&&(f=i.onUncaughtError),i.onCaughtError!==void 0&&(h=i.onCaughtError),i.onRecoverableError!==void 0&&(S=i.onRecoverableError)),i=$v(t,1,!1,null,null,s,l,null,f,h,S,u_),t[hn]=i.current,Sd(t),new Hd(i)},tc.hydrateRoot=function(t,i,s){if(!o(t))throw Error(a(299));var l=!1,f="",h=_0,S=x0,w=y0,V=null;return s!=null&&(s.unstable_strictMode===!0&&(l=!0),s.identifierPrefix!==void 0&&(f=s.identifierPrefix),s.onUncaughtError!==void 0&&(h=s.onUncaughtError),s.onCaughtError!==void 0&&(S=s.onCaughtError),s.onRecoverableError!==void 0&&(w=s.onRecoverableError),s.formState!==void 0&&(V=s.formState)),i=$v(t,1,!0,i,s??null,l,f,V,h,S,w,u_),i.context=e_(null),s=i.current,l=Zi(),l=Qa(l),f=Ys(l),f.callback=null,js(s,f,l),s=l,i.current.lanes=s,tt(i,s),Xa(i),t[hn]=i.current,Sd(t),new Pu(i)},tc.version="19.2.8",tc}var S_;function DM(){if(S_)return kd.exports;S_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),kd.exports=CM(),kd.exports}var NM=DM(),Ve=Um();const LM=2048,ur=24,M_=30,UM=16e3;class Bu{constructor(e,n){se(this,"v",0);this.attack=e,this.release=n}push(e,n){const a=e>this.v?this.attack:this.release,o=1-Math.exp(-n/a);return this.v+=(e-this.v)*o,this.v}get value(){return this.v}}class OM{constructor(e){se(this,"buf",[]);this.n=e}push(e){this.buf.push(e),this.buf.length>this.n&&this.buf.shift()}get mean(){if(!this.buf.length)return 0;let e=0;for(const n of this.buf)e+=n;return e/this.buf.length}get std(){const e=this.mean;if(this.buf.length<2)return 0;let n=0;for(const a of this.buf)n+=(a-e)*(a-e);return Math.sqrt(n/this.buf.length)}}class PM{constructor(e){se(this,"node");se(this,"freq");se(this,"time");se(this,"prevMag");se(this,"bandEnv");se(this,"bandEdges");se(this,"fluxHistory",new OM(43));se(this,"pulseEnv",new Bu(.001,.16));se(this,"rmsEnv",new Bu(.01,.12));se(this,"centroidEnv",new Bu(.08,.25));se(this,"lastOnset",0);se(this,"t",0);se(this,"features",{bands:new Float32Array(ur),rms:0,crest:0,centroid:0,flux:0,onset:!1,pulse:0,sinceOnset:99,low:0,mid:0,high:0});se(this,"onsets",[]);this.node=e.createAnalyser(),this.node.fftSize=LM,this.node.smoothingTimeConstant=0,this.node.minDecibels=-90,this.node.maxDecibels=-10;const n=this.node.frequencyBinCount;this.freq=new Uint8Array(n),this.time=new Float32Array(this.node.fftSize),this.prevMag=new Float32Array(n);const a=e.sampleRate/2;this.bandEdges=[];for(let o=0;o<=ur;o++){const c=M_*Math.pow(UM/M_,o/ur);this.bandEdges.push(Math.min(n-1,Math.round(c/a*n)))}this.bandEnv=Array.from({length:ur},(o,c)=>{const u=c/(ur-1);return new Bu(.004+u*.004,.22-u*.14)})}update(e){this.t+=e;const n=this.features;this.node.getByteFrequencyData(this.freq),this.node.getFloatTimeDomainData(this.time);let a=0,o=0;for(let g=0;g<this.time.length;g++){const M=this.time[g];a+=M*M;const E=Math.abs(M);E>o&&(o=E)}const c=Math.sqrt(a/this.time.length);n.rms=this.rmsEnv.push(Math.min(1,Math.pow(c*1.9,.62)),e),n.crest=c>1e-5?Math.min(8,o/c)/8:0;let u=0,d=0;for(let g=0;g<ur;g++){const M=this.bandEdges[g],E=Math.max(M+1,this.bandEdges[g+1]);let R=0;for(let x=M;x<E;x++)R+=this.freq[x];const y=R/(E-M)/255;n.bands[g]=this.bandEnv[g].push(y,e),u+=y*g,d+=y}const m=d>1e-4?u/d/(ur-1):0;n.centroid=this.centroidEnv.push(m,e),n.low=Yd(n.bands,0,6),n.mid=Yd(n.bands,6,15),n.high=Yd(n.bands,15,ur);let p=0;for(let g=0;g<this.freq.length;g++){const M=this.freq[g]/255,E=M-this.prevMag[g];E>0&&(p+=E),this.prevMag[g]=M}p/=this.freq.length,n.flux=p;const v=this.fluxHistory.mean+1.6*this.fluxHistory.std+.0015,_=this.t-this.lastOnset;return n.onset=p>v&&_>.11&&n.rms>.02,this.fluxHistory.push(p),n.onset&&(this.lastOnset=this.t,this.onsets.push(this.t),this.onsets.length>240&&this.onsets.shift()),n.sinceOnset=this.t-this.lastOnset,n.pulse=this.pulseEnv.push(n.onset?1:0,e),n}get now(){return this.t}}function Yd(r,e,n){let a=0;for(let o=e;o<n;o++)a+=r[o];return a/(n-e)}class FM{constructor(){se(this,"ctx");se(this,"analyser");se(this,"el");se(this,"gain");se(this,"elSource",null);se(this,"micSource",null);se(this,"micStream",null);se(this,"tabSource",null);se(this,"tabStream",null);se(this,"filter");se(this,"eqLow");se(this,"eqMid");se(this,"eqHigh");se(this,"sweepF");se(this,"tierFs",[]);se(this,"echoSend");se(this,"echoDelay");se(this,"echoFb");se(this,"_rate",1);se(this,"kind","radio");se(this,"playlist",[]);se(this,"index",0);se(this,"onTrackChange",null);se(this,"watchdog",0);se(this,"pendingAnnounce",null);se(this,"errStreak",0);se(this,"uploadUrl",null);se(this,"onTabAudioEnded",null);se(this,"_volume",.8);se(this,"_muted",!1);se(this,"recDest",null);this.ctx=new AudioContext,this.analyser=new PM(this.ctx),this.gain=this.ctx.createGain(),this.gain.gain.value=.8,this.eqLow=this.ctx.createBiquadFilter(),this.eqLow.type="lowshelf",this.eqLow.frequency.value=220,this.eqMid=this.ctx.createBiquadFilter(),this.eqMid.type="peaking",this.eqMid.frequency.value=1200,this.eqMid.Q.value=.8,this.eqHigh=this.ctx.createBiquadFilter(),this.eqHigh.type="highshelf",this.eqHigh.frequency.value=4200,this.sweepF=this.ctx.createBiquadFilter(),this.sweepF.type="allpass",this.sweepF.frequency.value=800,this.sweepF.Q.value=.9,this.filter=this.ctx.createBiquadFilter(),this.filter.type="allpass",this.filter.frequency.value=1e3,this.filter.Q.value=1e-4,this.echoSend=this.ctx.createGain(),this.echoSend.gain.value=0,this.echoDelay=this.ctx.createDelay(2),this.echoDelay.delayTime.value=.42,this.echoFb=this.ctx.createGain(),this.echoFb.gain.value=0;let e=this.eqHigh;for(let n=0;n<6;n++){const a=this.ctx.createBiquadFilter();a.type="peaking",a.frequency.value=60*Math.pow(200,(n*4+2)/23),a.Q.value=1.1,a.gain.value=0,e.connect(a),e=a,this.tierFs.push(a)}this.eqLow.connect(this.eqMid),this.eqMid.connect(this.eqHigh),e.connect(this.sweepF),this.sweepF.connect(this.filter),this.filter.connect(this.analyser.node),this.filter.connect(this.echoSend),this.echoSend.connect(this.echoDelay),this.echoDelay.connect(this.echoFb),this.echoFb.connect(this.echoDelay),this.echoDelay.connect(this.analyser.node),this.el=new Audio,this.el.crossOrigin="anonymous",this.el.preload="auto",this.el.addEventListener("ended",()=>this.next()),this.el.addEventListener("loadstart",()=>{this.el.playbackRate=this._rate,this.el.preservesPitch=!1}),this.el.addEventListener("playing",()=>{var n;this.el.playbackRate=this._rate,this.watchdog++,this.errStreak=0,this.pendingAnnounce&&((n=this.onTrackChange)==null||n.call(this,this.pendingAnnounce),this.pendingAnnounce=null)}),this.el.addEventListener("error",()=>this.onElementError()),this.analyser.node.connect(this.gain),this.gain.connect(this.ctx.destination)}armWatchdog(){const e=++this.watchdog;setTimeout(()=>{if(e!==this.watchdog||this.kind!=="radio")return;this.el.readyState>=2&&isFinite(this.el.duration)&&!this.el.paused||this.onElementError()},5500)}onElementError(){var e,n;if(this.pendingAnnounce=null,this.kind==="file"){this.kind="radio",(e=this.onTrackChange)==null||e.call(this,{title:"file not playable",artist:"back to the radio",src:""}),setTimeout(()=>void this.playRadio(),1800);return}if(this.kind==="radio"){if(this.errStreak++,this.errStreak>3){(n=this.onTrackChange)==null||n.call(this,{title:"radio unavailable",artist:"drop a track anywhere",src:""});return}this.next()}}async unlock(){this.ctx.state==="suspended"&&await this.ctx.resume(),this.elSource||(this.elSource=this.ctx.createMediaElementSource(this.el),this.elSource.connect(this.eqLow))}setPlaylist(e){this.playlist=BM(e),this.index=0}get current(){return this.kind==="radio"?this.playlist[this.index]??null:null}async playRadio(){var n;await this.unlock(),this.stopMic(),this.stopTabAudio(),this.pendingAnnounce=null,this.kind="radio";const e=this.playlist[this.index];e&&(this.el.src.endsWith(e.src)||(this.el.src=e.src),this.armWatchdog(),await this.el.play().catch(()=>{}),(n=this.onTrackChange)==null||n.call(this,e))}async next(){var e;this.kind!=="radio"||!this.playlist.length||(this.pendingAnnounce=null,this.index=(this.index+1)%this.playlist.length,this.el.src=this.playlist[this.index].src,this.armWatchdog(),await this.el.play().catch(()=>{}),(e=this.onTrackChange)==null||e.call(this,this.playlist[this.index]))}async playFile(e){await this.unlock(),this.stopMic(),this.stopTabAudio(),this.kind="file",this.uploadUrl&&URL.revokeObjectURL(this.uploadUrl);const n=URL.createObjectURL(e);this.uploadUrl=n,this.el.src=n,this.pendingAnnounce={title:e.name.replace(/\.[^.]+$/,""),artist:"your upload",src:n},await this.el.play().catch(()=>{})}async useMic(){var n,a;await this.unlock(),this.pendingAnnounce=null;let e;try{e=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1}})}catch{(n=this.onTrackChange)==null||n.call(this,{title:"live input blocked",artist:"allow microphone access, then try again",src:""});return}this.el.pause(),this.stopMic(),this.stopTabAudio(),this.micStream=e,this.micSource=this.ctx.createMediaStreamSource(e),this.micSource.connect(this.eqLow),this.kind="mic",(a=this.onTrackChange)==null||a.call(this,{title:"live input",artist:"the room",src:""})}async useTabAudio(){var a,o,c,u;if(await this.unlock(),this.pendingAnnounce=null,!((a=navigator.mediaDevices)!=null&&a.getDisplayMedia))return(o=this.onTrackChange)==null||o.call(this,{title:"this browser cannot listen",artist:"tab audio capture needs chrome or edge",src:""}),!1;let e;try{e=await navigator.mediaDevices.getDisplayMedia({video:{width:1,height:1},audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1},preferCurrentTab:!0})}catch{return(c=this.onTrackChange)==null||c.call(this,{title:"not listening",artist:"the star needs tab audio to react",src:""}),!1}const n=e.getAudioTracks();return n.length?(this.stopTabAudio(),this.tabStream=e,this.tabSource=this.ctx.createMediaStreamSource(e),this.tabSource.connect(this.eqLow),this.gain.gain.value=0,this.kind="tube",n[0].addEventListener("ended",()=>{var d;this.kind==="tube"&&this.stopTabAudio(),(d=this.onTabAudioEnded)==null||d.call(this)}),!0):(e.getTracks().forEach(d=>d.stop()),(u=this.onTrackChange)==null||u.call(this,{title:"no audio shared",artist:'tick "also share tab audio" and try again',src:""}),!1)}enterTube(){var e;this.el.pause(),this.stopMic(),this.pendingAnnounce=null,this.kind="tube",(e=this.onTrackChange)==null||e.call(this,{title:"jukebox",artist:"youtube",src:""})}announce(e,n){var a;(a=this.onTrackChange)==null||a.call(this,{title:e,artist:n,src:""})}stopTabAudio(){var e,n;(e=this.tabSource)==null||e.disconnect(),this.tabSource=null,(n=this.tabStream)==null||n.getTracks().forEach(a=>a.stop()),this.tabStream=null,this.gain.gain.value=this._muted?0:this._volume}stopMic(){var e,n;(e=this.micSource)==null||e.disconnect(),this.micSource=null,(n=this.micStream)==null||n.getTracks().forEach(a=>a.stop()),this.micStream=null}set rate(e){this._rate=e,this.el.playbackRate=e,this.el.preservesPitch=!1}get rate(){return this._rate}get capturing(){return!!this.tabSource}get busHead(){return this.eqLow}enterStems(e){var n;this.el.pause(),this.stopMic(),this.stopTabAudio(),this.pendingAnnounce=null,this.kind="stems",(n=this.onTrackChange)==null||n.call(this,{title:e,artist:"stem deck",src:""})}eq(e,n){(e==="low"?this.eqLow:e==="mid"?this.eqMid:this.eqHigh).gain.setTargetAtTime(Math.max(-30,Math.min(10,n)),this.ctx.currentTime,.04)}setMuted(e){this.gain.gain.setTargetAtTime(e?0:1,this.ctx.currentTime,.02)}tierEq(e,n){const a=this.tierFs[e];a&&a.gain.setTargetAtTime(Math.max(-30,Math.min(10,n)),this.ctx.currentTime,.04)}setTierBands(e){const n=24/e;for(let a=0;a<6;a++){const o=this.tierFs[a];if(!o)continue;if(a>=e){o.gain.setTargetAtTime(0,this.ctx.currentTime,.02);continue}const c=a*n+n/2;o.frequency.value=60*Math.pow(200,c/23);const u=Math.pow(200,n/24);o.Q.value=1/(Math.sqrt(u)-1/Math.sqrt(u))}}sweep(e){const n=this.ctx.currentTime,a=Math.abs(e);if(a<.04){this.sweepF.type="allpass",this.sweepF.Q.setTargetAtTime(1e-4,n,.05);return}this.sweepF.Q.setTargetAtTime(.9,n,.05),e<0?(this.sweepF.type="highpass",this.sweepF.frequency.setTargetAtTime(30*Math.pow(100,a),n,.05)):(this.sweepF.type="lowpass",this.sweepF.frequency.setTargetAtTime(18e3*Math.pow(.01,a),n,.05))}echo(e){const n=this.ctx.currentTime,a=Math.max(0,Math.min(1,e));this.echoSend.gain.setTargetAtTime(a*.9,n,.06),this.echoFb.gain.setTargetAtTime(a*.72,n,.06)}setEchoTime(e){this.echoDelay.delayTime.setTargetAtTime(Math.max(.05,Math.min(1.8,e)),this.ctx.currentTime,.1)}solo(e){const n=this.ctx.currentTime;e==null?(this.filter.type="allpass",this.filter.Q.setTargetAtTime(1e-4,n,.06)):(this.filter.type="bandpass",this.filter.frequency.setTargetAtTime(e,n,.06),this.filter.Q.setTargetAtTime(4.5,n,.06))}get playing(){return this.kind==="mic"?!!this.micStream:this.kind==="tube"?!!this.tabStream:!this.el.paused}toggle(){this.kind==="mic"||this.kind==="tube"||(this.el.paused?this.el.play().catch(()=>{}):this.el.pause())}set volume(e){this._volume=e,this._muted||(this.gain.gain.value=e)}get recordStream(){return this.recDest||(this.recDest=this.ctx.createMediaStreamDestination(),this.analyser.node.connect(this.recDest)),this.recDest.stream}get muted(){return this._muted}set muted(e){this._muted=e,this.gain.gain.value=e?0:this._volume}}function BM(r){const e=r.slice();for(let n=e.length-1;n>0;n--){const a=Math.floor(Math.random()*(n+1));[e[n],e[a]]=[e[a],e[n]]}return e}const zM=900;class IM{constructor(){se(this,"brightnessH",[]);se(this,"crestH",[]);se(this,"rmsH",[]);se(this,"densityEma",0);se(this,"elapsed",0);se(this,"value",{tempo:0,tempoConfidence:0,brightness:.5,punch:.5,density:.3,dynamics:.5,loudness:.5})}update(e,n,a,o){this.elapsed+=o,jd(this.brightnessH,e.centroid),jd(this.crestH,e.crest),jd(this.rmsH,e.rms);const c=this.value;c.brightness=Mf(this.brightnessH),c.punch=bf((Mf(this.crestH)-.18)/.42),c.loudness=Mf(this.rmsH),c.dynamics=bf(GM(this.rmsH)/.18);const d=kM(n,a-8)/Math.min(8,Math.max(1,this.elapsed));this.densityEma+=(bf(d/9)-this.densityEma)*Math.min(1,o*.4),c.density=this.densityEma;const m=HM(n,a);return c.tempo=m.bpm,c.tempoConfidence=m.confidence,c}}function HM(r,e){const a=[];for(let m=r.length-1;m>=0&&!(r[m]<e-12);m--)a.push(r[m]);if(a.length<8)return{bpm:0,confidence:0};a.reverse();const o=new Float32Array(181);let c=0;for(let m=0;m<a.length;m++)for(let p=m+1;p<Math.min(a.length,m+5);p++){const v=a[p]-a[m];if(v<.15||v>2.2)continue;let _=60/v;for(;_<70;)_*=2;for(;_>180;)_/=2;const g=Math.round(_);g<70||g>180||(o[g]+=1,o[g-1]+=.5,o[g+1]+=.5,c+=2)}if(!c)return{bpm:0,confidence:0};let u=0,d=0;for(let m=70;m<=180;m++)o[m]>d&&(d=o[m],u=m);return{bpm:u,confidence:bf(d/c*6)}}function jd(r,e){r.push(e),r.length>zM&&r.shift()}function Mf(r){if(!r.length)return 0;let e=0;for(const n of r)e+=n;return e/r.length}function GM(r){if(r.length<2)return 0;const e=Mf(r);let n=0;for(const a of r)n+=(a-e)*(a-e);return Math.sqrt(n/r.length)}function kM(r,e){let n=0;for(let a=r.length-1;a>=0&&!(r[a]<e);a--)n++;return n}function bf(r){return r<0?0:r>1?1:r}class VM{constructor(){se(this,"phase",0);se(this,"period",.75);se(this,"locked",!1);se(this,"lastTrigger",-9);se(this,"pending",0);se(this,"tick",0);se(this,"value",{trigger:!1,strokeTrigger:!1,strength:.5,locked:!1,period:.75,strokePeriod:1.5})}update(e,n,a,o){const c=this.value;c.trigger=!1,c.strokeTrigger=!1,this.locked=n.tempoConfidence>.15&&n.tempo>0,this.locked&&(this.period=60/n.tempo),c.locked=this.locked,c.period=this.period;let u=1;for(;60/this.period/u>72;)u*=2;c.strokePeriod=this.period*u;const m=Math.min(.16,Math.max(.09,this.period*.3))/this.period;if(e.onset){const p=Math.min(1,e.flux*26*.6+e.low*.7);if(this.pending=Math.max(this.pending,p),this.locked){const v=XM(this.phase+m);Math.abs(v)<.3&&(this.phase-=v*.4)}else a-this.lastTrigger>.28&&(this.phase=1)}return this.phase+=o/this.period,this.phase>=1&&(this.phase-=Math.floor(this.phase),(this.locked||a-this.lastTrigger<=.28||this.pending>0)&&(c.trigger=!0,this.tick++,c.strokeTrigger=this.tick%Math.max(1,Math.round(c.strokePeriod/this.period))===0,c.strength=Math.max(this.pending,Math.min(1,e.rms*.9)),this.pending=0,this.lastTrigger=a)),c}}function XM(r){const e=(r%1+1)%1;return e>.5?e-1:e}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Om="185",qM=0,b_=1,WM=2,Ef=1,YM=2,pc=3,br=0,Gi=1,ws=2,Na=0,Qo=1,As=2,E_=3,T_=4,jM=5,Yr=100,ZM=101,KM=102,QM=103,JM=104,$M=200,eb=201,tb=202,nb=203,Bp=204,zp=205,ib=206,ab=207,sb=208,rb=209,ob=210,lb=211,cb=212,ub=213,fb=214,Ip=0,Hp=1,Gp=2,el=3,kp=4,Vp=5,Xp=6,qp=7,Zx=0,hb=1,db=2,Za=0,Kx=1,Qx=2,Jx=3,$x=4,ey=5,ty=6,ny=7,iy=300,Jr=301,tl=302,Zd=303,Kd=304,Xf=306,Wp=1e3,Ji=1001,Yp=1002,Ln=1003,pb=1004,zu=1005,Mi=1006,Qd=1007,Zr=1008,va=1009,ay=1010,sy=1011,vc=1012,Pm=1013,Ka=1014,Hi=1015,bi=1016,Fm=1017,Bm=1018,_c=1020,ry=35902,oy=35899,ly=1021,cy=1022,Ni=1023,Ds=1026,Kr=1027,uy=1028,zm=1029,$r=1030,Im=1031,Hm=1033,Tf=33776,Af=33777,wf=33778,Rf=33779,jp=35840,Zp=35841,Kp=35842,Qp=35843,Jp=36196,$p=37492,em=37496,tm=37488,nm=37489,Nf=37490,im=37491,am=37808,sm=37809,rm=37810,om=37811,lm=37812,cm=37813,um=37814,fm=37815,hm=37816,dm=37817,pm=37818,mm=37819,gm=37820,vm=37821,_m=36492,xm=36494,ym=36495,Sm=36283,Mm=36284,Lf=36285,bm=36286,mb=3200,A_=0,gb=1,Sr="",ma="srgb",xc="srgb-linear",Uf="linear",mn="srgb",Po=7680,w_=519,vb=512,_b=513,xb=514,Gm=515,yb=516,Sb=517,km=518,Mb=519,R_=35044,C_="300 es",ja=2e3,Of=2001;function bb(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Pf(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Eb(){const r=Pf("canvas");return r.style.display="block",r}const D_={};function N_(...r){const e="THREE."+r.shift();console.log(e,...r)}function fy(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=r[1];n&&n.isStackTrace?r[0]+=" "+n.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Mt(...r){r=fy(r);const e="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...r)}}function nn(...r){r=fy(r);const e="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...r)}}function Jo(...r){const e=r.join(" ");e in D_||(D_[e]=!0,Mt(...r))}function Tb(r,e,n){return new Promise(function(a,o){function c(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:o();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:a()}}setTimeout(c,n)})}const Ab={[Ip]:Hp,[Gp]:Xp,[kp]:qp,[el]:Vp,[Hp]:Ip,[Xp]:Gp,[qp]:kp,[Vp]:el};class to{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[e]===void 0&&(a[e]=[]),a[e].indexOf(n)===-1&&a[e].push(n)}hasEventListener(e,n){const a=this._listeners;return a===void 0?!1:a[e]!==void 0&&a[e].indexOf(n)!==-1}removeEventListener(e,n){const a=this._listeners;if(a===void 0)return;const o=a[e];if(o!==void 0){const c=o.indexOf(n);c!==-1&&o.splice(c,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const a=n[e.type];if(a!==void 0){e.target=this;const o=a.slice(0);for(let c=0,u=o.length;c<u;c++)o[c].call(this,e);e.target=null}}}const yi=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Jd=Math.PI/180,Em=180/Math.PI;function Sc(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(yi[r&255]+yi[r>>8&255]+yi[r>>16&255]+yi[r>>24&255]+"-"+yi[e&255]+yi[e>>8&255]+"-"+yi[e>>16&15|64]+yi[e>>24&255]+"-"+yi[n&63|128]+yi[n>>8&255]+"-"+yi[n>>16&255]+yi[n>>24&255]+yi[a&255]+yi[a>>8&255]+yi[a>>16&255]+yi[a>>24&255]).toLowerCase()}function Qt(r,e,n){return Math.max(e,Math.min(n,r))}function wb(r,e){return(r%e+e)%e}function $d(r,e,n){return(1-n)*r+n*e}function nc(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ii(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const jm=class jm{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,a=this.y,o=e.elements;return this.x=o[0]*n+o[3]*a+o[6],this.y=o[1]*n+o[4]*a+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Qt(this.x,e.x,n.x),this.y=Qt(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Qt(this.x,e,n),this.y=Qt(this.y,e,n),this}clampLength(e,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Qt(a,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(e)/n;return Math.acos(Qt(a,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,a=this.y-e.y;return n*n+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,a){return this.x=e.x+(n.x-e.x)*a,this.y=e.y+(n.y-e.y)*a,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const a=Math.cos(n),o=Math.sin(n),c=this.x-e.x,u=this.y-e.y;return this.x=c*a-u*o+e.x,this.y=c*o+u*a+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};jm.prototype.isVector2=!0;let Dt=jm;class rl{constructor(e=0,n=0,a=0,o=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=a,this._w=o}static slerpFlat(e,n,a,o,c,u,d){let m=a[o+0],p=a[o+1],v=a[o+2],_=a[o+3],g=c[u+0],M=c[u+1],E=c[u+2],R=c[u+3];if(_!==R||m!==g||p!==M||v!==E){let y=m*g+p*M+v*E+_*R;y<0&&(g=-g,M=-M,E=-E,R=-R,y=-y);let x=1-d;if(y<.9995){const P=Math.acos(y),N=Math.sin(P);x=Math.sin(x*P)/N,d=Math.sin(d*P)/N,m=m*x+g*d,p=p*x+M*d,v=v*x+E*d,_=_*x+R*d}else{m=m*x+g*d,p=p*x+M*d,v=v*x+E*d,_=_*x+R*d;const P=1/Math.sqrt(m*m+p*p+v*v+_*_);m*=P,p*=P,v*=P,_*=P}}e[n]=m,e[n+1]=p,e[n+2]=v,e[n+3]=_}static multiplyQuaternionsFlat(e,n,a,o,c,u){const d=a[o],m=a[o+1],p=a[o+2],v=a[o+3],_=c[u],g=c[u+1],M=c[u+2],E=c[u+3];return e[n]=d*E+v*_+m*M-p*g,e[n+1]=m*E+v*g+p*_-d*M,e[n+2]=p*E+v*M+d*g-m*_,e[n+3]=v*E-d*_-m*g-p*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,a,o){return this._x=e,this._y=n,this._z=a,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const a=e._x,o=e._y,c=e._z,u=e._order,d=Math.cos,m=Math.sin,p=d(a/2),v=d(o/2),_=d(c/2),g=m(a/2),M=m(o/2),E=m(c/2);switch(u){case"XYZ":this._x=g*v*_+p*M*E,this._y=p*M*_-g*v*E,this._z=p*v*E+g*M*_,this._w=p*v*_-g*M*E;break;case"YXZ":this._x=g*v*_+p*M*E,this._y=p*M*_-g*v*E,this._z=p*v*E-g*M*_,this._w=p*v*_+g*M*E;break;case"ZXY":this._x=g*v*_-p*M*E,this._y=p*M*_+g*v*E,this._z=p*v*E+g*M*_,this._w=p*v*_-g*M*E;break;case"ZYX":this._x=g*v*_-p*M*E,this._y=p*M*_+g*v*E,this._z=p*v*E-g*M*_,this._w=p*v*_+g*M*E;break;case"YZX":this._x=g*v*_+p*M*E,this._y=p*M*_+g*v*E,this._z=p*v*E-g*M*_,this._w=p*v*_-g*M*E;break;case"XZY":this._x=g*v*_-p*M*E,this._y=p*M*_-g*v*E,this._z=p*v*E+g*M*_,this._w=p*v*_+g*M*E;break;default:Mt("Quaternion: .setFromEuler() encountered an unknown order: "+u)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const a=n/2,o=Math.sin(a);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,a=n[0],o=n[4],c=n[8],u=n[1],d=n[5],m=n[9],p=n[2],v=n[6],_=n[10],g=a+d+_;if(g>0){const M=.5/Math.sqrt(g+1);this._w=.25/M,this._x=(v-m)*M,this._y=(c-p)*M,this._z=(u-o)*M}else if(a>d&&a>_){const M=2*Math.sqrt(1+a-d-_);this._w=(v-m)/M,this._x=.25*M,this._y=(o+u)/M,this._z=(c+p)/M}else if(d>_){const M=2*Math.sqrt(1+d-a-_);this._w=(c-p)/M,this._x=(o+u)/M,this._y=.25*M,this._z=(m+v)/M}else{const M=2*Math.sqrt(1+_-a-d);this._w=(u-o)/M,this._x=(c+p)/M,this._y=(m+v)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let a=e.dot(n)+1;return a<1e-8?(a=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=a):(this._x=0,this._y=-e.z,this._z=e.y,this._w=a)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=a),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qt(this.dot(e),-1,1)))}rotateTowards(e,n){const a=this.angleTo(e);if(a===0)return this;const o=Math.min(1,n/a);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const a=e._x,o=e._y,c=e._z,u=e._w,d=n._x,m=n._y,p=n._z,v=n._w;return this._x=a*v+u*d+o*p-c*m,this._y=o*v+u*m+c*d-a*p,this._z=c*v+u*p+a*m-o*d,this._w=u*v-a*d-o*m-c*p,this._onChangeCallback(),this}slerp(e,n){let a=e._x,o=e._y,c=e._z,u=e._w,d=this.dot(e);d<0&&(a=-a,o=-o,c=-c,u=-u,d=-d);let m=1-n;if(d<.9995){const p=Math.acos(d),v=Math.sin(p);m=Math.sin(m*p)/v,n=Math.sin(n*p)/v,this._x=this._x*m+a*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+u*n,this._onChangeCallback()}else this._x=this._x*m+a*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+u*n,this.normalize();return this}slerpQuaternions(e,n,a){return this.copy(e).slerp(n,a)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),a=Math.random(),o=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(o*Math.sin(e),o*Math.cos(e),c*Math.sin(n),c*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Zm=class Zm{constructor(e=0,n=0,a=0){this.x=e,this.y=n,this.z=a}set(e,n,a){return a===void 0&&(a=this.z),this.x=e,this.y=n,this.z=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(L_.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(L_.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,a=this.y,o=this.z,c=e.elements;return this.x=c[0]*n+c[3]*a+c[6]*o,this.y=c[1]*n+c[4]*a+c[7]*o,this.z=c[2]*n+c[5]*a+c[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,a=this.y,o=this.z,c=e.elements,u=1/(c[3]*n+c[7]*a+c[11]*o+c[15]);return this.x=(c[0]*n+c[4]*a+c[8]*o+c[12])*u,this.y=(c[1]*n+c[5]*a+c[9]*o+c[13])*u,this.z=(c[2]*n+c[6]*a+c[10]*o+c[14])*u,this}applyQuaternion(e){const n=this.x,a=this.y,o=this.z,c=e.x,u=e.y,d=e.z,m=e.w,p=2*(u*o-d*a),v=2*(d*n-c*o),_=2*(c*a-u*n);return this.x=n+m*p+u*_-d*v,this.y=a+m*v+d*p-c*_,this.z=o+m*_+c*v-u*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,a=this.y,o=this.z,c=e.elements;return this.x=c[0]*n+c[4]*a+c[8]*o,this.y=c[1]*n+c[5]*a+c[9]*o,this.z=c[2]*n+c[6]*a+c[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Qt(this.x,e.x,n.x),this.y=Qt(this.y,e.y,n.y),this.z=Qt(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Qt(this.x,e,n),this.y=Qt(this.y,e,n),this.z=Qt(this.z,e,n),this}clampLength(e,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Qt(a,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,a){return this.x=e.x+(n.x-e.x)*a,this.y=e.y+(n.y-e.y)*a,this.z=e.z+(n.z-e.z)*a,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const a=e.x,o=e.y,c=e.z,u=n.x,d=n.y,m=n.z;return this.x=o*m-c*d,this.y=c*u-a*m,this.z=a*d-o*u,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const a=e.dot(this)/n;return this.copy(e).multiplyScalar(a)}projectOnPlane(e){return ep.copy(this).projectOnVector(e),this.sub(ep)}reflect(e){return this.sub(ep.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(e)/n;return Math.acos(Qt(a,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,a=this.y-e.y,o=this.z-e.z;return n*n+a*a+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,a){const o=Math.sin(n)*e;return this.x=o*Math.sin(a),this.y=Math.cos(n)*e,this.z=o*Math.cos(a),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,a){return this.x=e*Math.sin(n),this.y=a,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),a=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=a,this.z=o,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,a=Math.sqrt(1-n*n);return this.x=a*Math.cos(e),this.y=n,this.z=a*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Zm.prototype.isVector3=!0;let ee=Zm;const ep=new ee,L_=new rl,Km=class Km{constructor(e,n,a,o,c,u,d,m,p){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,a,o,c,u,d,m,p)}set(e,n,a,o,c,u,d,m,p){const v=this.elements;return v[0]=e,v[1]=o,v[2]=d,v[3]=n,v[4]=c,v[5]=m,v[6]=a,v[7]=u,v[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,a=e.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(e,n,a){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const a=e.elements,o=n.elements,c=this.elements,u=a[0],d=a[3],m=a[6],p=a[1],v=a[4],_=a[7],g=a[2],M=a[5],E=a[8],R=o[0],y=o[3],x=o[6],P=o[1],N=o[4],C=o[7],I=o[2],O=o[5],z=o[8];return c[0]=u*R+d*P+m*I,c[3]=u*y+d*N+m*O,c[6]=u*x+d*C+m*z,c[1]=p*R+v*P+_*I,c[4]=p*y+v*N+_*O,c[7]=p*x+v*C+_*z,c[2]=g*R+M*P+E*I,c[5]=g*y+M*N+E*O,c[8]=g*x+M*C+E*z,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],a=e[1],o=e[2],c=e[3],u=e[4],d=e[5],m=e[6],p=e[7],v=e[8];return n*u*v-n*d*p-a*c*v+a*d*m+o*c*p-o*u*m}invert(){const e=this.elements,n=e[0],a=e[1],o=e[2],c=e[3],u=e[4],d=e[5],m=e[6],p=e[7],v=e[8],_=v*u-d*p,g=d*m-v*c,M=p*c-u*m,E=n*_+a*g+o*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const R=1/E;return e[0]=_*R,e[1]=(o*p-v*a)*R,e[2]=(d*a-o*u)*R,e[3]=g*R,e[4]=(v*n-o*m)*R,e[5]=(o*c-d*n)*R,e[6]=M*R,e[7]=(a*m-p*n)*R,e[8]=(u*n-a*c)*R,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,a,o,c,u,d){const m=Math.cos(c),p=Math.sin(c);return this.set(a*m,a*p,-a*(m*u+p*d)+u+e,-o*p,o*m,-o*(-p*u+m*d)+d+n,0,0,1),this}scale(e,n){return Jo("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(tp.makeScale(e,n)),this}rotate(e){return Jo("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(tp.makeRotation(-e)),this}translate(e,n){return Jo("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(tp.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),a=Math.sin(e);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,a=e.elements;for(let o=0;o<9;o++)if(n[o]!==a[o])return!1;return!0}fromArray(e,n=0){for(let a=0;a<9;a++)this.elements[a]=e[a+n];return this}toArray(e=[],n=0){const a=this.elements;return e[n]=a[0],e[n+1]=a[1],e[n+2]=a[2],e[n+3]=a[3],e[n+4]=a[4],e[n+5]=a[5],e[n+6]=a[6],e[n+7]=a[7],e[n+8]=a[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Km.prototype.isMatrix3=!0;let Ct=Km;const tp=new Ct,U_=new Ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),O_=new Ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Rb(){const r={enabled:!0,workingColorSpace:xc,spaces:{},convert:function(o,c,u){return this.enabled===!1||c===u||!c||!u||(this.spaces[c].transfer===mn&&(o.r=Cs(o.r),o.g=Cs(o.g),o.b=Cs(o.b)),this.spaces[c].primaries!==this.spaces[u].primaries&&(o.applyMatrix3(this.spaces[c].toXYZ),o.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===mn&&(o.r=$o(o.r),o.g=$o(o.g),o.b=$o(o.b))),o},workingToColorSpace:function(o,c){return this.convert(o,this.workingColorSpace,c)},colorSpaceToWorking:function(o,c){return this.convert(o,c,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===Sr?Uf:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,c=this.workingColorSpace){return o.fromArray(this.spaces[c].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,c,u){return o.copy(this.spaces[c].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,c){return Jo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(o,c)},toWorkingColorSpace:function(o,c){return Jo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(o,c)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],a=[.3127,.329];return r.define({[xc]:{primaries:e,whitePoint:a,transfer:Uf,toXYZ:U_,fromXYZ:O_,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ma},outputColorSpaceConfig:{drawingBufferColorSpace:ma}},[ma]:{primaries:e,whitePoint:a,transfer:mn,toXYZ:U_,fromXYZ:O_,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ma}}}),r}const Zt=Rb();function Cs(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function $o(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Fo;class Cb{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let a;if(e instanceof HTMLCanvasElement)a=e;else{Fo===void 0&&(Fo=Pf("canvas")),Fo.width=e.width,Fo.height=e.height;const o=Fo.getContext("2d");e instanceof ImageData?o.putImageData(e,0,0):o.drawImage(e,0,0,e.width,e.height),a=Fo}return a.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Pf("canvas");n.width=e.width,n.height=e.height;const a=n.getContext("2d");a.drawImage(e,0,0,e.width,e.height);const o=a.getImageData(0,0,e.width,e.height),c=o.data;for(let u=0;u<c.length;u++)c[u]=Cs(c[u]/255)*255;return a.putImageData(o,0,0),n}else if(e.data){const n=e.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(Cs(n[a]/255)*255):n[a]=Cs(n[a]);return{data:n,width:e.width,height:e.height}}else return Mt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Db=0;class Vm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Db++}),this.uuid=Sc(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const a={uuid:this.uuid,url:""},o=this.data;if(o!==null){let c;if(Array.isArray(o)){c=[];for(let u=0,d=o.length;u<d;u++)o[u].isDataTexture?c.push(np(o[u].image)):c.push(np(o[u]))}else c=np(o);a.url=c}return n||(e.images[this.uuid]=a),a}}function np(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Cb.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Mt("Texture: Unable to serialize Texture."),{})}let Nb=0;const ip=new ee;class Li extends to{constructor(e=Li.DEFAULT_IMAGE,n=Li.DEFAULT_MAPPING,a=Ji,o=Ji,c=Mi,u=Zr,d=Ni,m=va,p=Li.DEFAULT_ANISOTROPY,v=Sr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nb++}),this.uuid=Sc(),this.name="",this.source=new Vm(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=o,this.magFilter=c,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ip).x}get height(){return this.source.getSize(ip).y}get depth(){return this.source.getSize(ip).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const a=e[n];if(a===void 0){Mt(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){Mt(`Texture.setValues(): property '${n}' does not exist.`);continue}o&&a&&o.isVector2&&a.isVector2||o&&a&&o.isVector3&&a.isVector3||o&&a&&o.isMatrix3&&a.isMatrix3?o.copy(a):this[n]=a}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const a={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(e.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==iy)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wp:e.x=e.x-Math.floor(e.x);break;case Ji:e.x=e.x<0?0:1;break;case Yp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wp:e.y=e.y-Math.floor(e.y);break;case Ji:e.y=e.y<0?0:1;break;case Yp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Li.DEFAULT_IMAGE=null;Li.DEFAULT_MAPPING=iy;Li.DEFAULT_ANISOTROPY=1;const Qm=class Qm{constructor(e=0,n=0,a=0,o=1){this.x=e,this.y=n,this.z=a,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,a,o){return this.x=e,this.y=n,this.z=a,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,a=this.y,o=this.z,c=this.w,u=e.elements;return this.x=u[0]*n+u[4]*a+u[8]*o+u[12]*c,this.y=u[1]*n+u[5]*a+u[9]*o+u[13]*c,this.z=u[2]*n+u[6]*a+u[10]*o+u[14]*c,this.w=u[3]*n+u[7]*a+u[11]*o+u[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,a,o,c;const m=e.elements,p=m[0],v=m[4],_=m[8],g=m[1],M=m[5],E=m[9],R=m[2],y=m[6],x=m[10];if(Math.abs(v-g)<.01&&Math.abs(_-R)<.01&&Math.abs(E-y)<.01){if(Math.abs(v+g)<.1&&Math.abs(_+R)<.1&&Math.abs(E+y)<.1&&Math.abs(p+M+x-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const N=(p+1)/2,C=(M+1)/2,I=(x+1)/2,O=(v+g)/4,z=(_+R)/4,T=(E+y)/4;return N>C&&N>I?N<.01?(a=0,o=.707106781,c=.707106781):(a=Math.sqrt(N),o=O/a,c=z/a):C>I?C<.01?(a=.707106781,o=0,c=.707106781):(o=Math.sqrt(C),a=O/o,c=T/o):I<.01?(a=.707106781,o=.707106781,c=0):(c=Math.sqrt(I),a=z/c,o=T/c),this.set(a,o,c,n),this}let P=Math.sqrt((y-E)*(y-E)+(_-R)*(_-R)+(g-v)*(g-v));return Math.abs(P)<.001&&(P=1),this.x=(y-E)/P,this.y=(_-R)/P,this.z=(g-v)/P,this.w=Math.acos((p+M+x-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Qt(this.x,e.x,n.x),this.y=Qt(this.y,e.y,n.y),this.z=Qt(this.z,e.z,n.z),this.w=Qt(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Qt(this.x,e,n),this.y=Qt(this.y,e,n),this.z=Qt(this.z,e,n),this.w=Qt(this.w,e,n),this}clampLength(e,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Qt(a,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,a){return this.x=e.x+(n.x-e.x)*a,this.y=e.y+(n.y-e.y)*a,this.z=e.z+(n.z-e.z)*a,this.w=e.w+(n.w-e.w)*a,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Qm.prototype.isVector4=!0;let Vn=Qm;class Lb extends to{constructor(e=1,n=1,a={}){super(),a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},a),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=a.depth,this.scissor=new Vn(0,0,e,n),this.scissorTest=!1,this.viewport=new Vn(0,0,e,n),this.textures=[];const o={width:e,height:n,depth:a.depth},c=new Li(o),u=a.count;for(let d=0;d<u;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(a),this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=a.depthTexture,this.samples=a.samples,this.multiview=a.multiview,this.useArrayDepthTexture=a.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:Mi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let a=0;a<this.textures.length;a++)this.textures[a].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,a=1){if(this.width!==e||this.height!==n||this.depth!==a){this.width=e,this.height=n,this.depth=a;for(let o=0,c=this.textures.length;o<c;o++)this.textures[o].image.width=e,this.textures[o].image.height=n,this.textures[o].image.depth=a,this.textures[o].isData3DTexture!==!0&&(this.textures[o].isArrayTexture=this.textures[o].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,a=e.textures.length;n<a;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const o=Object.assign({},e.textures[n].image);this.textures[n].source=new Vm(o)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mi extends Lb{constructor(e=1,n=1,a={}){super(e,n,a),this.isWebGLRenderTarget=!0}}class hy extends Li{constructor(e=null,n=1,a=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:a,depth:o},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=Ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ub extends Li{constructor(e=null,n=1,a=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:a,depth:o},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=Ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Vf=class Vf{constructor(e,n,a,o,c,u,d,m,p,v,_,g,M,E,R,y){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,a,o,c,u,d,m,p,v,_,g,M,E,R,y)}set(e,n,a,o,c,u,d,m,p,v,_,g,M,E,R,y){const x=this.elements;return x[0]=e,x[4]=n,x[8]=a,x[12]=o,x[1]=c,x[5]=u,x[9]=d,x[13]=m,x[2]=p,x[6]=v,x[10]=_,x[14]=g,x[3]=M,x[7]=E,x[11]=R,x[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Vf().fromArray(this.elements)}copy(e){const n=this.elements,a=e.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(e){const n=this.elements,a=e.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,a){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),a.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this)}makeBasis(e,n,a){return this.set(e.x,n.x,a.x,0,e.y,n.y,a.y,0,e.z,n.z,a.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,a=e.elements,o=1/Bo.setFromMatrixColumn(e,0).length(),c=1/Bo.setFromMatrixColumn(e,1).length(),u=1/Bo.setFromMatrixColumn(e,2).length();return n[0]=a[0]*o,n[1]=a[1]*o,n[2]=a[2]*o,n[3]=0,n[4]=a[4]*c,n[5]=a[5]*c,n[6]=a[6]*c,n[7]=0,n[8]=a[8]*u,n[9]=a[9]*u,n[10]=a[10]*u,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,a=e.x,o=e.y,c=e.z,u=Math.cos(a),d=Math.sin(a),m=Math.cos(o),p=Math.sin(o),v=Math.cos(c),_=Math.sin(c);if(e.order==="XYZ"){const g=u*v,M=u*_,E=d*v,R=d*_;n[0]=m*v,n[4]=-m*_,n[8]=p,n[1]=M+E*p,n[5]=g-R*p,n[9]=-d*m,n[2]=R-g*p,n[6]=E+M*p,n[10]=u*m}else if(e.order==="YXZ"){const g=m*v,M=m*_,E=p*v,R=p*_;n[0]=g+R*d,n[4]=E*d-M,n[8]=u*p,n[1]=u*_,n[5]=u*v,n[9]=-d,n[2]=M*d-E,n[6]=R+g*d,n[10]=u*m}else if(e.order==="ZXY"){const g=m*v,M=m*_,E=p*v,R=p*_;n[0]=g-R*d,n[4]=-u*_,n[8]=E+M*d,n[1]=M+E*d,n[5]=u*v,n[9]=R-g*d,n[2]=-u*p,n[6]=d,n[10]=u*m}else if(e.order==="ZYX"){const g=u*v,M=u*_,E=d*v,R=d*_;n[0]=m*v,n[4]=E*p-M,n[8]=g*p+R,n[1]=m*_,n[5]=R*p+g,n[9]=M*p-E,n[2]=-p,n[6]=d*m,n[10]=u*m}else if(e.order==="YZX"){const g=u*m,M=u*p,E=d*m,R=d*p;n[0]=m*v,n[4]=R-g*_,n[8]=E*_+M,n[1]=_,n[5]=u*v,n[9]=-d*v,n[2]=-p*v,n[6]=M*_+E,n[10]=g-R*_}else if(e.order==="XZY"){const g=u*m,M=u*p,E=d*m,R=d*p;n[0]=m*v,n[4]=-_,n[8]=p*v,n[1]=g*_+R,n[5]=u*v,n[9]=M*_-E,n[2]=E*_-M,n[6]=d*v,n[10]=R*_+g}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ob,e,Pb)}lookAt(e,n,a){const o=this.elements;return Ki.subVectors(e,n),Ki.lengthSq()===0&&(Ki.z=1),Ki.normalize(),fr.crossVectors(a,Ki),fr.lengthSq()===0&&(Math.abs(a.z)===1?Ki.x+=1e-4:Ki.z+=1e-4,Ki.normalize(),fr.crossVectors(a,Ki)),fr.normalize(),Iu.crossVectors(Ki,fr),o[0]=fr.x,o[4]=Iu.x,o[8]=Ki.x,o[1]=fr.y,o[5]=Iu.y,o[9]=Ki.y,o[2]=fr.z,o[6]=Iu.z,o[10]=Ki.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const a=e.elements,o=n.elements,c=this.elements,u=a[0],d=a[4],m=a[8],p=a[12],v=a[1],_=a[5],g=a[9],M=a[13],E=a[2],R=a[6],y=a[10],x=a[14],P=a[3],N=a[7],C=a[11],I=a[15],O=o[0],z=o[4],T=o[8],B=o[12],K=o[1],G=o[5],Y=o[9],de=o[13],Se=o[2],ae=o[6],H=o[10],k=o[14],ne=o[3],ve=o[7],Re=o[11],F=o[15];return c[0]=u*O+d*K+m*Se+p*ne,c[4]=u*z+d*G+m*ae+p*ve,c[8]=u*T+d*Y+m*H+p*Re,c[12]=u*B+d*de+m*k+p*F,c[1]=v*O+_*K+g*Se+M*ne,c[5]=v*z+_*G+g*ae+M*ve,c[9]=v*T+_*Y+g*H+M*Re,c[13]=v*B+_*de+g*k+M*F,c[2]=E*O+R*K+y*Se+x*ne,c[6]=E*z+R*G+y*ae+x*ve,c[10]=E*T+R*Y+y*H+x*Re,c[14]=E*B+R*de+y*k+x*F,c[3]=P*O+N*K+C*Se+I*ne,c[7]=P*z+N*G+C*ae+I*ve,c[11]=P*T+N*Y+C*H+I*Re,c[15]=P*B+N*de+C*k+I*F,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],a=e[4],o=e[8],c=e[12],u=e[1],d=e[5],m=e[9],p=e[13],v=e[2],_=e[6],g=e[10],M=e[14],E=e[3],R=e[7],y=e[11],x=e[15],P=m*M-p*g,N=d*M-p*_,C=d*g-m*_,I=u*M-p*v,O=u*g-m*v,z=u*_-d*v;return n*(R*P-y*N+x*C)-a*(E*P-y*I+x*O)+o*(E*N-R*I+x*z)-c*(E*C-R*O+y*z)}determinantAffine(){const e=this.elements,n=e[0],a=e[4],o=e[8],c=e[1],u=e[5],d=e[9],m=e[2],p=e[6],v=e[10];return n*(u*v-d*p)-a*(c*v-d*m)+o*(c*p-u*m)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,a){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=n,o[14]=a),this}invert(){const e=this.elements,n=e[0],a=e[1],o=e[2],c=e[3],u=e[4],d=e[5],m=e[6],p=e[7],v=e[8],_=e[9],g=e[10],M=e[11],E=e[12],R=e[13],y=e[14],x=e[15],P=n*d-a*u,N=n*m-o*u,C=n*p-c*u,I=a*m-o*d,O=a*p-c*d,z=o*p-c*m,T=v*R-_*E,B=v*y-g*E,K=v*x-M*E,G=_*y-g*R,Y=_*x-M*R,de=g*x-M*y,Se=P*de-N*Y+C*G+I*K-O*B+z*T;if(Se===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const ae=1/Se;return e[0]=(d*de-m*Y+p*G)*ae,e[1]=(o*Y-a*de-c*G)*ae,e[2]=(R*z-y*O+x*I)*ae,e[3]=(g*O-_*z-M*I)*ae,e[4]=(m*K-u*de-p*B)*ae,e[5]=(n*de-o*K+c*B)*ae,e[6]=(y*C-E*z-x*N)*ae,e[7]=(v*z-g*C+M*N)*ae,e[8]=(u*Y-d*K+p*T)*ae,e[9]=(a*K-n*Y-c*T)*ae,e[10]=(E*O-R*C+x*P)*ae,e[11]=(_*C-v*O-M*P)*ae,e[12]=(d*B-u*G-m*T)*ae,e[13]=(n*G-a*B+o*T)*ae,e[14]=(R*N-E*I-y*P)*ae,e[15]=(v*I-_*N+g*P)*ae,this}scale(e){const n=this.elements,a=e.x,o=e.y,c=e.z;return n[0]*=a,n[4]*=o,n[8]*=c,n[1]*=a,n[5]*=o,n[9]*=c,n[2]*=a,n[6]*=o,n[10]*=c,n[3]*=a,n[7]*=o,n[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],a=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,a,o))}makeTranslation(e,n,a){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),a=Math.sin(e);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),a=Math.sin(e);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),a=Math.sin(e);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const a=Math.cos(n),o=Math.sin(n),c=1-a,u=e.x,d=e.y,m=e.z,p=c*u,v=c*d;return this.set(p*u+a,p*d-o*m,p*m+o*d,0,p*d+o*m,v*d+a,v*m-o*u,0,p*m-o*d,v*m+o*u,c*m*m+a,0,0,0,0,1),this}makeScale(e,n,a){return this.set(e,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(e,n,a,o,c,u){return this.set(1,a,c,0,e,1,u,0,n,o,1,0,0,0,0,1),this}compose(e,n,a){const o=this.elements,c=n._x,u=n._y,d=n._z,m=n._w,p=c+c,v=u+u,_=d+d,g=c*p,M=c*v,E=c*_,R=u*v,y=u*_,x=d*_,P=m*p,N=m*v,C=m*_,I=a.x,O=a.y,z=a.z;return o[0]=(1-(R+x))*I,o[1]=(M+C)*I,o[2]=(E-N)*I,o[3]=0,o[4]=(M-C)*O,o[5]=(1-(g+x))*O,o[6]=(y+P)*O,o[7]=0,o[8]=(E+N)*z,o[9]=(y-P)*z,o[10]=(1-(g+R))*z,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,n,a){const o=this.elements;e.x=o[12],e.y=o[13],e.z=o[14];const c=this.determinantAffine();if(c===0)return a.set(1,1,1),n.identity(),this;let u=Bo.set(o[0],o[1],o[2]).length();const d=Bo.set(o[4],o[5],o[6]).length(),m=Bo.set(o[8],o[9],o[10]).length();c<0&&(u=-u),Aa.copy(this);const p=1/u,v=1/d,_=1/m;return Aa.elements[0]*=p,Aa.elements[1]*=p,Aa.elements[2]*=p,Aa.elements[4]*=v,Aa.elements[5]*=v,Aa.elements[6]*=v,Aa.elements[8]*=_,Aa.elements[9]*=_,Aa.elements[10]*=_,n.setFromRotationMatrix(Aa),a.x=u,a.y=d,a.z=m,this}makePerspective(e,n,a,o,c,u,d=ja,m=!1){const p=this.elements,v=2*c/(n-e),_=2*c/(a-o),g=(n+e)/(n-e),M=(a+o)/(a-o);let E,R;if(m)E=c/(u-c),R=u*c/(u-c);else if(d===ja)E=-(u+c)/(u-c),R=-2*u*c/(u-c);else if(d===Of)E=-u/(u-c),R=-u*c/(u-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=v,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=_,p[9]=M,p[13]=0,p[2]=0,p[6]=0,p[10]=E,p[14]=R,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,n,a,o,c,u,d=ja,m=!1){const p=this.elements,v=2/(n-e),_=2/(a-o),g=-(n+e)/(n-e),M=-(a+o)/(a-o);let E,R;if(m)E=1/(u-c),R=u/(u-c);else if(d===ja)E=-2/(u-c),R=-(u+c)/(u-c);else if(d===Of)E=-1/(u-c),R=-c/(u-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=v,p[4]=0,p[8]=0,p[12]=g,p[1]=0,p[5]=_,p[9]=0,p[13]=M,p[2]=0,p[6]=0,p[10]=E,p[14]=R,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const n=this.elements,a=e.elements;for(let o=0;o<16;o++)if(n[o]!==a[o])return!1;return!0}fromArray(e,n=0){for(let a=0;a<16;a++)this.elements[a]=e[a+n];return this}toArray(e=[],n=0){const a=this.elements;return e[n]=a[0],e[n+1]=a[1],e[n+2]=a[2],e[n+3]=a[3],e[n+4]=a[4],e[n+5]=a[5],e[n+6]=a[6],e[n+7]=a[7],e[n+8]=a[8],e[n+9]=a[9],e[n+10]=a[10],e[n+11]=a[11],e[n+12]=a[12],e[n+13]=a[13],e[n+14]=a[14],e[n+15]=a[15],e}};Vf.prototype.isMatrix4=!0;let zn=Vf;const Bo=new ee,Aa=new zn,Ob=new ee(0,0,0),Pb=new ee(1,1,1),fr=new ee,Iu=new ee,Ki=new ee,P_=new zn,F_=new rl;class eo{constructor(e=0,n=0,a=0,o=eo.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=a,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,a,o=this._order){return this._x=e,this._y=n,this._z=a,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,a=!0){const o=e.elements,c=o[0],u=o[4],d=o[8],m=o[1],p=o[5],v=o[9],_=o[2],g=o[6],M=o[10];switch(n){case"XYZ":this._y=Math.asin(Qt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-v,M),this._z=Math.atan2(-u,c)):(this._x=Math.atan2(g,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-_,M),this._z=Math.atan2(-u,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-Qt(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(g,M),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-u,p));break;case"YZX":this._z=Math.asin(Qt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-v,p),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-Qt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(g,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-v,M),this._y=0);break;default:Mt("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,a){return P_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(P_,n,a)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return F_.setFromEuler(this),this.setFromQuaternion(F_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}eo.DEFAULT_ORDER="XYZ";class Xm{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Fb=0;const B_=new ee,zo=new rl,Ss=new zn,Hu=new ee,ic=new ee,Bb=new ee,zb=new rl,z_=new ee(1,0,0),I_=new ee(0,1,0),H_=new ee(0,0,1),G_={type:"added"},Ib={type:"removed"},Io={type:"childadded",child:null},ap={type:"childremoved",child:null};class Ui extends to{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Fb++}),this.uuid=Sc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ui.DEFAULT_UP.clone();const e=new ee,n=new eo,a=new rl,o=new ee(1,1,1);function c(){a.setFromEuler(n,!1)}function u(){n.setFromQuaternion(a,void 0,!1)}n._onChange(c),a._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new zn},normalMatrix:{value:new Ct}}),this.matrix=new zn,this.matrixWorld=new zn,this.matrixAutoUpdate=Ui.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ui.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return zo.setFromAxisAngle(e,n),this.quaternion.multiply(zo),this}rotateOnWorldAxis(e,n){return zo.setFromAxisAngle(e,n),this.quaternion.premultiply(zo),this}rotateX(e){return this.rotateOnAxis(z_,e)}rotateY(e){return this.rotateOnAxis(I_,e)}rotateZ(e){return this.rotateOnAxis(H_,e)}translateOnAxis(e,n){return B_.copy(e).applyQuaternion(this.quaternion),this.position.add(B_.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(z_,e)}translateY(e){return this.translateOnAxis(I_,e)}translateZ(e){return this.translateOnAxis(H_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ss.copy(this.matrixWorld).invert())}lookAt(e,n,a){e.isVector3?Hu.copy(e):Hu.set(e,n,a);const o=this.parent;this.updateWorldMatrix(!0,!1),ic.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ss.lookAt(ic,Hu,this.up):Ss.lookAt(Hu,ic,this.up),this.quaternion.setFromRotationMatrix(Ss),o&&(Ss.extractRotation(o.matrixWorld),zo.setFromRotationMatrix(Ss),this.quaternion.premultiply(zo.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(nn("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(G_),Io.child=e,this.dispatchEvent(Io),Io.child=null):nn("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(Ib),ap.child=e,this.dispatchEvent(ap),ap.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ss.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ss.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ss),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(G_),Io.child=e,this.dispatchEvent(Io),Io.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let a=0,o=this.children.length;a<o;a++){const u=this.children[a].getObjectByProperty(e,n);if(u!==void 0)return u}}getObjectsByProperty(e,n,a=[]){this[e]===n&&a.push(this);const o=this.children;for(let c=0,u=o.length;c<u;c++)o[c].getObjectsByProperty(e,n,a);return a}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ic,e,Bb),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ic,zb,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,a=e.y,o=e.z,c=this.matrix.elements;c[12]+=n-c[0]*n-c[4]*a-c[8]*o,c[13]+=a-c[1]*n-c[5]*a-c[9]*o,c[14]+=o-c[2]*n-c[6]*a-c[10]*o}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].updateMatrixWorld(e)}updateWorldMatrix(e,n,a=!1){const o=this.parent;if(e===!0&&o!==null&&o.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||a)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,a=!0),n===!0){const c=this.children;for(let u=0,d=c.length;u<d;u++)c[u].updateWorldMatrix(!1,!0,a)}}toJSON(e){const n=e===void 0||typeof e=="string",a={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),this.static!==!1&&(o.static=this.static),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.pivot!==null&&(o.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(d=>({...d})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(e),o.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=c(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,v=m.length;p<v;p++){const _=m[p];c(e.shapes,_)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(e.materials,this.material[m]));o.material=d}else o.material=c(e.materials,this.material);if(this.children.length>0){o.children=[];for(let d=0;d<this.children.length;d++)o.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];o.animations.push(c(e.animations,m))}}if(n){const d=u(e.geometries),m=u(e.materials),p=u(e.textures),v=u(e.images),_=u(e.shapes),g=u(e.skeletons),M=u(e.animations),E=u(e.nodes);d.length>0&&(a.geometries=d),m.length>0&&(a.materials=m),p.length>0&&(a.textures=p),v.length>0&&(a.images=v),_.length>0&&(a.shapes=_),g.length>0&&(a.skeletons=g),M.length>0&&(a.animations=M),E.length>0&&(a.nodes=E)}return a.object=o,a;function u(d){const m=[];for(const p in d){const v=d[p];delete v.metadata,m.push(v)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let a=0;a<e.children.length;a++){const o=e.children[a];this.add(o.clone())}return this}}Ui.DEFAULT_UP=new ee(0,1,0);Ui.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ui.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class mc extends Ui{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Hb={type:"move"};class sp{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ee,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ee),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ee,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ee,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const a of e.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,a){let o=null,c=null,u=null;const d=this._targetRay,m=this._grip,p=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(p&&e.hand){u=!0;for(const R of e.hand.values()){const y=n.getJointPose(R,a),x=this._getHandJoint(p,R);y!==null&&(x.matrix.fromArray(y.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=y.radius),x.visible=y!==null}const v=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],g=v.position.distanceTo(_.position),M=.02,E=.005;p.inputState.pinching&&g>M+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&g<=M-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=n.getPose(e.gripSpace,a),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:e,target:this})));d!==null&&(o=n.getPose(e.targetRaySpace,a),o===null&&c!==null&&(o=c),o!==null&&(d.matrix.fromArray(o.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,o.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(o.linearVelocity)):d.hasLinearVelocity=!1,o.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(o.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(Hb)))}return d!==null&&(d.visible=o!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=u!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const a=new mc;a.matrixAutoUpdate=!1,a.visible=!1,e.joints[n.jointName]=a,e.add(a)}return e.joints[n.jointName]}}const dy={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hr={h:0,s:0,l:0},Gu={h:0,s:0,l:0};function rp(r,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(e-r)*6*n:n<1/2?e:n<2/3?r+(e-r)*6*(2/3-n):r}class qt{constructor(e,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,a)}set(e,n,a){if(n===void 0&&a===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,n,a);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=ma){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Zt.colorSpaceToWorking(this,n),this}setRGB(e,n,a,o=Zt.workingColorSpace){return this.r=e,this.g=n,this.b=a,Zt.colorSpaceToWorking(this,o),this}setHSL(e,n,a,o=Zt.workingColorSpace){if(e=wb(e,1),n=Qt(n,0,1),a=Qt(a,0,1),n===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+n):a+n-a*n,u=2*a-c;this.r=rp(u,c,e+1/3),this.g=rp(u,c,e),this.b=rp(u,c,e-1/3)}return Zt.colorSpaceToWorking(this,o),this}setStyle(e,n=ma){function a(c){c!==void 0&&parseFloat(c)<1&&Mt("Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const u=o[1],d=o[2];switch(u){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:Mt("Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=o[1],u=c.length;if(u===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(u===6)return this.setHex(parseInt(c,16),n);Mt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=ma){const a=dy[e.toLowerCase()];return a!==void 0?this.setHex(a,n):Mt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Cs(e.r),this.g=Cs(e.g),this.b=Cs(e.b),this}copyLinearToSRGB(e){return this.r=$o(e.r),this.g=$o(e.g),this.b=$o(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ma){return Zt.workingToColorSpace(Si.copy(this),e),Math.round(Qt(Si.r*255,0,255))*65536+Math.round(Qt(Si.g*255,0,255))*256+Math.round(Qt(Si.b*255,0,255))}getHexString(e=ma){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Zt.workingColorSpace){Zt.workingToColorSpace(Si.copy(this),n);const a=Si.r,o=Si.g,c=Si.b,u=Math.max(a,o,c),d=Math.min(a,o,c);let m,p;const v=(d+u)/2;if(d===u)m=0,p=0;else{const _=u-d;switch(p=v<=.5?_/(u+d):_/(2-u-d),u){case a:m=(o-c)/_+(o<c?6:0);break;case o:m=(c-a)/_+2;break;case c:m=(a-o)/_+4;break}m/=6}return e.h=m,e.s=p,e.l=v,e}getRGB(e,n=Zt.workingColorSpace){return Zt.workingToColorSpace(Si.copy(this),n),e.r=Si.r,e.g=Si.g,e.b=Si.b,e}getStyle(e=ma){Zt.workingToColorSpace(Si.copy(this),e);const n=Si.r,a=Si.g,o=Si.b;return e!==ma?`color(${e} ${n.toFixed(3)} ${a.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(o*255)})`}offsetHSL(e,n,a){return this.getHSL(hr),this.setHSL(hr.h+e,hr.s+n,hr.l+a)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,a){return this.r=e.r+(n.r-e.r)*a,this.g=e.g+(n.g-e.g)*a,this.b=e.b+(n.b-e.b)*a,this}lerpHSL(e,n){this.getHSL(hr),e.getHSL(Gu);const a=$d(hr.h,Gu.h,n),o=$d(hr.s,Gu.s,n),c=$d(hr.l,Gu.l,n);return this.setHSL(a,o,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,a=this.g,o=this.b,c=e.elements;return this.r=c[0]*n+c[3]*a+c[6]*o,this.g=c[1]*n+c[4]*a+c[7]*o,this.b=c[2]*n+c[5]*a+c[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Si=new qt;qt.NAMES=dy;let py=class extends Ui{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new eo,this.environmentIntensity=1,this.environmentRotation=new eo,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}};const wa=new ee,Ms=new ee,op=new ee,bs=new ee,Ho=new ee,Go=new ee,k_=new ee,lp=new ee,cp=new ee,up=new ee,fp=new Vn,hp=new Vn,dp=new Vn;class Da{constructor(e=new ee,n=new ee,a=new ee){this.a=e,this.b=n,this.c=a}static getNormal(e,n,a,o){o.subVectors(a,n),wa.subVectors(e,n),o.cross(wa);const c=o.lengthSq();return c>0?o.multiplyScalar(1/Math.sqrt(c)):o.set(0,0,0)}static getBarycoord(e,n,a,o,c){wa.subVectors(o,n),Ms.subVectors(a,n),op.subVectors(e,n);const u=wa.dot(wa),d=wa.dot(Ms),m=wa.dot(op),p=Ms.dot(Ms),v=Ms.dot(op),_=u*p-d*d;if(_===0)return c.set(0,0,0),null;const g=1/_,M=(p*m-d*v)*g,E=(u*v-d*m)*g;return c.set(1-M-E,E,M)}static containsPoint(e,n,a,o){return this.getBarycoord(e,n,a,o,bs)===null?!1:bs.x>=0&&bs.y>=0&&bs.x+bs.y<=1}static getInterpolation(e,n,a,o,c,u,d,m){return this.getBarycoord(e,n,a,o,bs)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,bs.x),m.addScaledVector(u,bs.y),m.addScaledVector(d,bs.z),m)}static getInterpolatedAttribute(e,n,a,o,c,u){return fp.setScalar(0),hp.setScalar(0),dp.setScalar(0),fp.fromBufferAttribute(e,n),hp.fromBufferAttribute(e,a),dp.fromBufferAttribute(e,o),u.setScalar(0),u.addScaledVector(fp,c.x),u.addScaledVector(hp,c.y),u.addScaledVector(dp,c.z),u}static isFrontFacing(e,n,a,o){return wa.subVectors(a,n),Ms.subVectors(e,n),wa.cross(Ms).dot(o)<0}set(e,n,a){return this.a.copy(e),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(e,n,a,o){return this.a.copy(e[n]),this.b.copy(e[a]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,n,a,o){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,a),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return wa.subVectors(this.c,this.b),Ms.subVectors(this.a,this.b),wa.cross(Ms).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Da.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Da.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,a,o,c){return Da.getInterpolation(e,this.a,this.b,this.c,n,a,o,c)}containsPoint(e){return Da.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Da.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const a=this.a,o=this.b,c=this.c;let u,d;Ho.subVectors(o,a),Go.subVectors(c,a),lp.subVectors(e,a);const m=Ho.dot(lp),p=Go.dot(lp);if(m<=0&&p<=0)return n.copy(a);cp.subVectors(e,o);const v=Ho.dot(cp),_=Go.dot(cp);if(v>=0&&_<=v)return n.copy(o);const g=m*_-v*p;if(g<=0&&m>=0&&v<=0)return u=m/(m-v),n.copy(a).addScaledVector(Ho,u);up.subVectors(e,c);const M=Ho.dot(up),E=Go.dot(up);if(E>=0&&M<=E)return n.copy(c);const R=M*p-m*E;if(R<=0&&p>=0&&E<=0)return d=p/(p-E),n.copy(a).addScaledVector(Go,d);const y=v*E-M*_;if(y<=0&&_-v>=0&&M-E>=0)return k_.subVectors(c,o),d=(_-v)/(_-v+(M-E)),n.copy(o).addScaledVector(k_,d);const x=1/(y+R+g);return u=R*x,d=g*x,n.copy(a).addScaledVector(Ho,u).addScaledVector(Go,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Mc{constructor(e=new ee(1/0,1/0,1/0),n=new ee(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,a=e.length;n<a;n+=3)this.expandByPoint(Ra.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,a=e.count;n<a;n++)this.expandByPoint(Ra.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,a=e.length;n<a;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const a=Ra.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(a),this.max.copy(e).add(a),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const a=e.geometry;if(a!==void 0){const c=a.getAttribute("position");if(n===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let u=0,d=c.count;u<d;u++)e.isMesh===!0?e.getVertexPosition(u,Ra):Ra.fromBufferAttribute(c,u),Ra.applyMatrix4(e.matrixWorld),this.expandByPoint(Ra);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ku.copy(e.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),ku.copy(a.boundingBox)),ku.applyMatrix4(e.matrixWorld),this.union(ku)}const o=e.children;for(let c=0,u=o.length;c<u;c++)this.expandByObject(o[c],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ra),Ra.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,a;return e.normal.x>0?(n=e.normal.x*this.min.x,a=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,a=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,a+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,a+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,a+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,a+=e.normal.z*this.min.z),n<=-e.constant&&a>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ac),Vu.subVectors(this.max,ac),ko.subVectors(e.a,ac),Vo.subVectors(e.b,ac),Xo.subVectors(e.c,ac),dr.subVectors(Vo,ko),pr.subVectors(Xo,Vo),Vr.subVectors(ko,Xo);let n=[0,-dr.z,dr.y,0,-pr.z,pr.y,0,-Vr.z,Vr.y,dr.z,0,-dr.x,pr.z,0,-pr.x,Vr.z,0,-Vr.x,-dr.y,dr.x,0,-pr.y,pr.x,0,-Vr.y,Vr.x,0];return!pp(n,ko,Vo,Xo,Vu)||(n=[1,0,0,0,1,0,0,0,1],!pp(n,ko,Vo,Xo,Vu))?!1:(Xu.crossVectors(dr,pr),n=[Xu.x,Xu.y,Xu.z],pp(n,ko,Vo,Xo,Vu))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ra).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ra).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Es[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Es[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Es[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Es[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Es[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Es[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Es[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Es[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Es),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Es=[new ee,new ee,new ee,new ee,new ee,new ee,new ee,new ee],Ra=new ee,ku=new Mc,ko=new ee,Vo=new ee,Xo=new ee,dr=new ee,pr=new ee,Vr=new ee,ac=new ee,Vu=new ee,Xu=new ee,Xr=new ee;function pp(r,e,n,a,o){for(let c=0,u=r.length-3;c<=u;c+=3){Xr.fromArray(r,c);const d=o.x*Math.abs(Xr.x)+o.y*Math.abs(Xr.y)+o.z*Math.abs(Xr.z),m=e.dot(Xr),p=n.dot(Xr),v=a.dot(Xr);if(Math.max(-Math.max(m,p,v),Math.min(m,p,v))>d)return!1}return!0}const $n=new ee,qu=new Dt;let Gb=0;class tn extends to{constructor(e,n,a=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Gb++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=a,this.usage=R_,this.updateRanges=[],this.gpuType=Hi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,a){e*=this.itemSize,a*=n.itemSize;for(let o=0,c=this.itemSize;o<c;o++)this.array[e+o]=n.array[a+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)qu.fromBufferAttribute(this,n),qu.applyMatrix3(e),this.setXY(n,qu.x,qu.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)$n.fromBufferAttribute(this,n),$n.applyMatrix3(e),this.setXYZ(n,$n.x,$n.y,$n.z);return this}applyMatrix4(e){for(let n=0,a=this.count;n<a;n++)$n.fromBufferAttribute(this,n),$n.applyMatrix4(e),this.setXYZ(n,$n.x,$n.y,$n.z);return this}applyNormalMatrix(e){for(let n=0,a=this.count;n<a;n++)$n.fromBufferAttribute(this,n),$n.applyNormalMatrix(e),this.setXYZ(n,$n.x,$n.y,$n.z);return this}transformDirection(e){for(let n=0,a=this.count;n<a;n++)$n.fromBufferAttribute(this,n),$n.transformDirection(e),this.setXYZ(n,$n.x,$n.y,$n.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let a=this.array[e*this.itemSize+n];return this.normalized&&(a=nc(a,this.array)),a}setComponent(e,n,a){return this.normalized&&(a=Ii(a,this.array)),this.array[e*this.itemSize+n]=a,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=nc(n,this.array)),n}setX(e,n){return this.normalized&&(n=Ii(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=nc(n,this.array)),n}setY(e,n){return this.normalized&&(n=Ii(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=nc(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Ii(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=nc(n,this.array)),n}setW(e,n){return this.normalized&&(n=Ii(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,a){return e*=this.itemSize,this.normalized&&(n=Ii(n,this.array),a=Ii(a,this.array)),this.array[e+0]=n,this.array[e+1]=a,this}setXYZ(e,n,a,o){return e*=this.itemSize,this.normalized&&(n=Ii(n,this.array),a=Ii(a,this.array),o=Ii(o,this.array)),this.array[e+0]=n,this.array[e+1]=a,this.array[e+2]=o,this}setXYZW(e,n,a,o,c){return e*=this.itemSize,this.normalized&&(n=Ii(n,this.array),a=Ii(a,this.array),o=Ii(o,this.array),c=Ii(c,this.array)),this.array[e+0]=n,this.array[e+1]=a,this.array[e+2]=o,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==R_&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class my extends tn{constructor(e,n,a){super(new Uint16Array(e),n,a)}}class gy extends tn{constructor(e,n,a){super(new Uint32Array(e),n,a)}}class $i extends tn{constructor(e,n,a){super(new Float32Array(e),n,a)}}const kb=new Mc,sc=new ee,mp=new ee;class ol{constructor(e=new ee,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const a=this.center;n!==void 0?a.copy(n):kb.setFromPoints(e).getCenter(a);let o=0;for(let c=0,u=e.length;c<u;c++)o=Math.max(o,a.distanceToSquared(e[c]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const a=this.center.distanceToSquared(e);return n.copy(e),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;sc.subVectors(e,this.center);const n=sc.lengthSq();if(n>this.radius*this.radius){const a=Math.sqrt(n),o=(a-this.radius)*.5;this.center.addScaledVector(sc,o/a),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(mp.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(sc.copy(e.center).add(mp)),this.expandByPoint(sc.copy(e.center).sub(mp))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Vb=0;const pa=new zn,gp=new Ui,qo=new ee,Qi=new Mc,rc=new Mc,oi=new ee;class ni extends to{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vb++}),this.uuid=Sc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(bb(e)?gy:my)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,a=0){this.groups.push({start:e,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new Ct().getNormalMatrix(e);a.applyNormalMatrix(c),a.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return pa.makeRotationFromQuaternion(e),this.applyMatrix4(pa),this}rotateX(e){return pa.makeRotationX(e),this.applyMatrix4(pa),this}rotateY(e){return pa.makeRotationY(e),this.applyMatrix4(pa),this}rotateZ(e){return pa.makeRotationZ(e),this.applyMatrix4(pa),this}translate(e,n,a){return pa.makeTranslation(e,n,a),this.applyMatrix4(pa),this}scale(e,n,a){return pa.makeScale(e,n,a),this.applyMatrix4(pa),this}lookAt(e){return gp.lookAt(e),gp.updateMatrix(),this.applyMatrix4(gp.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qo).negate(),this.translate(qo.x,qo.y,qo.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const a=[];for(let o=0,c=e.length;o<c;o++){const u=e[o];a.push(u.x,u.y,u.z||0)}this.setAttribute("position",new $i(a,3))}else{const a=Math.min(e.length,n.count);for(let o=0;o<a;o++){const c=e[o];n.setXYZ(o,c.x,c.y,c.z||0)}e.length>n.count&&Mt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mc);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nn("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ee(-1/0,-1/0,-1/0),new ee(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let a=0,o=n.length;a<o;a++){const c=n[a];Qi.setFromBufferAttribute(c),this.morphTargetsRelative?(oi.addVectors(this.boundingBox.min,Qi.min),this.boundingBox.expandByPoint(oi),oi.addVectors(this.boundingBox.max,Qi.max),this.boundingBox.expandByPoint(oi)):(this.boundingBox.expandByPoint(Qi.min),this.boundingBox.expandByPoint(Qi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&nn('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ol);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nn("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ee,1/0);return}if(e){const a=this.boundingSphere.center;if(Qi.setFromBufferAttribute(e),n)for(let c=0,u=n.length;c<u;c++){const d=n[c];rc.setFromBufferAttribute(d),this.morphTargetsRelative?(oi.addVectors(Qi.min,rc.min),Qi.expandByPoint(oi),oi.addVectors(Qi.max,rc.max),Qi.expandByPoint(oi)):(Qi.expandByPoint(rc.min),Qi.expandByPoint(rc.max))}Qi.getCenter(a);let o=0;for(let c=0,u=e.count;c<u;c++)oi.fromBufferAttribute(e,c),o=Math.max(o,a.distanceToSquared(oi));if(n)for(let c=0,u=n.length;c<u;c++){const d=n[c],m=this.morphTargetsRelative;for(let p=0,v=d.count;p<v;p++)oi.fromBufferAttribute(d,p),m&&(qo.fromBufferAttribute(e,p),oi.add(qo)),o=Math.max(o,a.distanceToSquared(oi))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&nn('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){nn("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=n.position,o=n.normal,c=n.uv;let u=this.getAttribute("tangent");(u===void 0||u.count!==a.count)&&(u=new tn(new Float32Array(4*a.count),4),this.setAttribute("tangent",u));const d=[],m=[];for(let T=0;T<a.count;T++)d[T]=new ee,m[T]=new ee;const p=new ee,v=new ee,_=new ee,g=new Dt,M=new Dt,E=new Dt,R=new ee,y=new ee;function x(T,B,K){p.fromBufferAttribute(a,T),v.fromBufferAttribute(a,B),_.fromBufferAttribute(a,K),g.fromBufferAttribute(c,T),M.fromBufferAttribute(c,B),E.fromBufferAttribute(c,K),v.sub(p),_.sub(p),M.sub(g),E.sub(g);const G=1/(M.x*E.y-E.x*M.y);isFinite(G)&&(R.copy(v).multiplyScalar(E.y).addScaledVector(_,-M.y).multiplyScalar(G),y.copy(_).multiplyScalar(M.x).addScaledVector(v,-E.x).multiplyScalar(G),d[T].add(R),d[B].add(R),d[K].add(R),m[T].add(y),m[B].add(y),m[K].add(y))}let P=this.groups;P.length===0&&(P=[{start:0,count:e.count}]);for(let T=0,B=P.length;T<B;++T){const K=P[T],G=K.start,Y=K.count;for(let de=G,Se=G+Y;de<Se;de+=3)x(e.getX(de+0),e.getX(de+1),e.getX(de+2))}const N=new ee,C=new ee,I=new ee,O=new ee;function z(T){I.fromBufferAttribute(o,T),O.copy(I);const B=d[T];N.copy(B),N.sub(I.multiplyScalar(I.dot(B))).normalize(),C.crossVectors(O,B);const G=C.dot(m[T])<0?-1:1;u.setXYZW(T,N.x,N.y,N.z,G)}for(let T=0,B=P.length;T<B;++T){const K=P[T],G=K.start,Y=K.count;for(let de=G,Se=G+Y;de<Se;de+=3)z(e.getX(de+0)),z(e.getX(de+1)),z(e.getX(de+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0||a.count!==n.count)a=new tn(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let g=0,M=a.count;g<M;g++)a.setXYZ(g,0,0,0);const o=new ee,c=new ee,u=new ee,d=new ee,m=new ee,p=new ee,v=new ee,_=new ee;if(e)for(let g=0,M=e.count;g<M;g+=3){const E=e.getX(g+0),R=e.getX(g+1),y=e.getX(g+2);o.fromBufferAttribute(n,E),c.fromBufferAttribute(n,R),u.fromBufferAttribute(n,y),v.subVectors(u,c),_.subVectors(o,c),v.cross(_),d.fromBufferAttribute(a,E),m.fromBufferAttribute(a,R),p.fromBufferAttribute(a,y),d.add(v),m.add(v),p.add(v),a.setXYZ(E,d.x,d.y,d.z),a.setXYZ(R,m.x,m.y,m.z),a.setXYZ(y,p.x,p.y,p.z)}else for(let g=0,M=n.count;g<M;g+=3)o.fromBufferAttribute(n,g+0),c.fromBufferAttribute(n,g+1),u.fromBufferAttribute(n,g+2),v.subVectors(u,c),_.subVectors(o,c),v.cross(_),a.setXYZ(g+0,v.x,v.y,v.z),a.setXYZ(g+1,v.x,v.y,v.z),a.setXYZ(g+2,v.x,v.y,v.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,a=e.count;n<a;n++)oi.fromBufferAttribute(e,n),oi.normalize(),e.setXYZ(n,oi.x,oi.y,oi.z)}toNonIndexed(){function e(d,m){const p=d.array,v=d.itemSize,_=d.normalized,g=new p.constructor(m.length*v);let M=0,E=0;for(let R=0,y=m.length;R<y;R++){d.isInterleavedBufferAttribute?M=m[R]*d.data.stride+d.offset:M=m[R]*v;for(let x=0;x<v;x++)g[E++]=p[M++]}return new tn(g,v,_)}if(this.index===null)return Mt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new ni,a=this.index.array,o=this.attributes;for(const d in o){const m=o[d],p=e(m,a);n.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let v=0,_=p.length;v<_;v++){const g=p[v],M=e(g,a);m.push(M)}n.morphAttributes[d]=m}n.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let d=0,m=u.length;d<m;d++){const p=u[d];n.addGroup(p.start,p.count,p.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(e[p]=m[p]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const a=this.attributes;for(const m in a){const p=a[m];e.data.attributes[m]=p.toJSON(e.data)}const o={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],v=[];for(let _=0,g=p.length;_<g;_++){const M=p[_];v.push(M.toJSON(e.data))}v.length>0&&(o[m]=v,c=!0)}c&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere=d.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const a=e.index;a!==null&&this.setIndex(a.clone());const o=e.attributes;for(const p in o){const v=o[p];this.setAttribute(p,v.clone(n))}const c=e.morphAttributes;for(const p in c){const v=[],_=c[p];for(let g=0,M=_.length;g<M;g++)v.push(_[g].clone(n));this.morphAttributes[p]=v}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let p=0,v=u.length;p<v;p++){const _=u[p];this.addGroup(_.start,_.count,_.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Xb=0;class ll extends to{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xb++}),this.uuid=Sc(),this.name="",this.type="Material",this.blending=Qo,this.side=br,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bp,this.blendDst=zp,this.blendEquation=Yr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=el,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=w_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Po,this.stencilZFail=Po,this.stencilZPass=Po,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const a=e[n];if(a===void 0){Mt(`Material: parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){Mt(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(a):o&&o.isVector2&&a&&a.isVector2||o&&o.isEuler&&a&&a.isEuler||o&&o.isVector3&&a&&a.isVector3?o.copy(a):this[n]=a}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const a={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(a.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(a.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(e).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(e).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(e).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(e).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(e).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.shadowSide!==null&&(a.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),this.blending!==Qo&&(a.blending=this.blending),this.side!==br&&(a.side=this.side),this.vertexColors===!0&&(a.vertexColors=!0),this.opacity<1&&(a.opacity=this.opacity),this.transparent===!0&&(a.transparent=!0),this.blendSrc!==Bp&&(a.blendSrc=this.blendSrc),this.blendDst!==zp&&(a.blendDst=this.blendDst),this.blendEquation!==Yr&&(a.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(a.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(a.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(a.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(a.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(a.blendAlpha=this.blendAlpha),this.depthFunc!==el&&(a.depthFunc=this.depthFunc),this.depthTest===!1&&(a.depthTest=this.depthTest),this.depthWrite===!1&&(a.depthWrite=this.depthWrite),this.colorWrite===!1&&(a.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(a.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==w_&&(a.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(a.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(a.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Po&&(a.stencilFail=this.stencilFail),this.stencilZFail!==Po&&(a.stencilZFail=this.stencilZFail),this.stencilZPass!==Po&&(a.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(a.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(a.rotation=this.rotation),this.polygonOffset===!0&&(a.polygonOffset=!0),this.polygonOffsetFactor!==0&&(a.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(a.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(a.linewidth=this.linewidth),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.dithering===!0&&(a.dithering=!0),this.alphaTest>0&&(a.alphaTest=this.alphaTest),this.alphaHash===!0&&(a.alphaHash=!0),this.alphaToCoverage===!0&&(a.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(a.premultipliedAlpha=!0),this.forceSinglePass===!0&&(a.forceSinglePass=!0),this.allowOverride===!1&&(a.allowOverride=!1),this.wireframe===!0&&(a.wireframe=!0),this.wireframeLinewidth>1&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(a.flatShading=!0),this.visible===!1&&(a.visible=!1),this.toneMapped===!1&&(a.toneMapped=!1),this.fog===!1&&(a.fog=!1),Object.keys(this.userData).length>0&&(a.userData=this.userData);function o(c){const u=[];for(const d in c){const m=c[d];delete m.metadata,u.push(m)}return u}if(n){const c=o(e.textures),u=o(e.images);c.length>0&&(a.textures=c),u.length>0&&(a.images=u)}return a}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new qt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let a=e.normalScale;Array.isArray(a)===!1&&(a=[a,a]),this.normalScale=new Dt().fromArray(a)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Dt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let a=null;if(n!==null){const o=n.length;a=new Array(o);for(let c=0;c!==o;++c)a[c]=n[c].clone()}return this.clippingPlanes=a,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ts=new ee,vp=new ee,Wu=new ee,mr=new ee,_p=new ee,Yu=new ee,xp=new ee;class qf{constructor(e=new ee,n=new ee(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ts)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ts.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ts.copy(this.origin).addScaledVector(this.direction,n),Ts.distanceToSquared(e))}distanceSqToSegment(e,n,a,o){vp.copy(e).add(n).multiplyScalar(.5),Wu.copy(n).sub(e).normalize(),mr.copy(this.origin).sub(vp);const c=e.distanceTo(n)*.5,u=-this.direction.dot(Wu),d=mr.dot(this.direction),m=-mr.dot(Wu),p=mr.lengthSq(),v=Math.abs(1-u*u);let _,g,M,E;if(v>0)if(_=u*m-d,g=u*d-m,E=c*v,_>=0)if(g>=-E)if(g<=E){const R=1/v;_*=R,g*=R,M=_*(_+u*g+2*d)+g*(u*_+g+2*m)+p}else g=c,_=Math.max(0,-(u*g+d)),M=-_*_+g*(g+2*m)+p;else g=-c,_=Math.max(0,-(u*g+d)),M=-_*_+g*(g+2*m)+p;else g<=-E?(_=Math.max(0,-(-u*c+d)),g=_>0?-c:Math.min(Math.max(-c,-m),c),M=-_*_+g*(g+2*m)+p):g<=E?(_=0,g=Math.min(Math.max(-c,-m),c),M=g*(g+2*m)+p):(_=Math.max(0,-(u*c+d)),g=_>0?c:Math.min(Math.max(-c,-m),c),M=-_*_+g*(g+2*m)+p);else g=u>0?-c:c,_=Math.max(0,-(u*g+d)),M=-_*_+g*(g+2*m)+p;return a&&a.copy(this.origin).addScaledVector(this.direction,_),o&&o.copy(vp).addScaledVector(Wu,g),M}intersectSphere(e,n){Ts.subVectors(e.center,this.origin);const a=Ts.dot(this.direction),o=Ts.dot(Ts)-a*a,c=e.radius*e.radius;if(o>c)return null;const u=Math.sqrt(c-o),d=a-u,m=a+u;return m<0?null:d<0?this.at(m,n):this.at(d,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(e.normal)+e.constant)/n;return a>=0?a:null}intersectPlane(e,n){const a=this.distanceToPlane(e);return a===null?null:this.at(a,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let a,o,c,u,d,m;const p=1/this.direction.x,v=1/this.direction.y,_=1/this.direction.z,g=this.origin;return p>=0?(a=(e.min.x-g.x)*p,o=(e.max.x-g.x)*p):(a=(e.max.x-g.x)*p,o=(e.min.x-g.x)*p),v>=0?(c=(e.min.y-g.y)*v,u=(e.max.y-g.y)*v):(c=(e.max.y-g.y)*v,u=(e.min.y-g.y)*v),a>u||c>o||((c>a||isNaN(a))&&(a=c),(u<o||isNaN(o))&&(o=u),_>=0?(d=(e.min.z-g.z)*_,m=(e.max.z-g.z)*_):(d=(e.max.z-g.z)*_,m=(e.min.z-g.z)*_),a>m||d>o)||((d>a||a!==a)&&(a=d),(m<o||o!==o)&&(o=m),o<0)?null:this.at(a>=0?a:o,n)}intersectsBox(e){return this.intersectBox(e,Ts)!==null}intersectTriangle(e,n,a,o,c){_p.subVectors(n,e),Yu.subVectors(a,e),xp.crossVectors(_p,Yu);let u=this.direction.dot(xp),d;if(u>0){if(o)return null;d=1}else if(u<0)d=-1,u=-u;else return null;mr.subVectors(this.origin,e);const m=d*this.direction.dot(Yu.crossVectors(mr,Yu));if(m<0)return null;const p=d*this.direction.dot(_p.cross(mr));if(p<0||m+p>u)return null;const v=-d*mr.dot(xp);return v<0?null:this.at(v/u,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class qm extends ll{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new eo,this.combine=Zx,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const V_=new zn,qr=new qf,ju=new ol,X_=new ee,Zu=new ee,Ku=new ee,Qu=new ee,yp=new ee,Ju=new ee,q_=new ee,$u=new ee;class La extends Ui{constructor(e=new ni,n=new qm){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const d=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(e,n){const a=this.geometry,o=a.attributes.position,c=a.morphAttributes.position,u=a.morphTargetsRelative;n.fromBufferAttribute(o,e);const d=this.morphTargetInfluences;if(c&&d){Ju.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const v=d[m],_=c[m];v!==0&&(yp.fromBufferAttribute(_,e),u?Ju.addScaledVector(yp,v):Ju.addScaledVector(yp.sub(n),v))}n.add(Ju)}return n}raycast(e,n){const a=this.geometry,o=this.material,c=this.matrixWorld;o!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),ju.copy(a.boundingSphere),ju.applyMatrix4(c),qr.copy(e.ray).recast(e.near),!(ju.containsPoint(qr.origin)===!1&&(qr.intersectSphere(ju,X_)===null||qr.origin.distanceToSquared(X_)>(e.far-e.near)**2))&&(V_.copy(c).invert(),qr.copy(e.ray).applyMatrix4(V_),!(a.boundingBox!==null&&qr.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(e,n,qr)))}_computeIntersections(e,n,a){let o;const c=this.geometry,u=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,v=c.attributes.uv1,_=c.attributes.normal,g=c.groups,M=c.drawRange;if(d!==null)if(Array.isArray(u))for(let E=0,R=g.length;E<R;E++){const y=g[E],x=u[y.materialIndex],P=Math.max(y.start,M.start),N=Math.min(d.count,Math.min(y.start+y.count,M.start+M.count));for(let C=P,I=N;C<I;C+=3){const O=d.getX(C),z=d.getX(C+1),T=d.getX(C+2);o=ef(this,x,e,a,p,v,_,O,z,T),o&&(o.faceIndex=Math.floor(C/3),o.face.materialIndex=y.materialIndex,n.push(o))}}else{const E=Math.max(0,M.start),R=Math.min(d.count,M.start+M.count);for(let y=E,x=R;y<x;y+=3){const P=d.getX(y),N=d.getX(y+1),C=d.getX(y+2);o=ef(this,u,e,a,p,v,_,P,N,C),o&&(o.faceIndex=Math.floor(y/3),n.push(o))}}else if(m!==void 0)if(Array.isArray(u))for(let E=0,R=g.length;E<R;E++){const y=g[E],x=u[y.materialIndex],P=Math.max(y.start,M.start),N=Math.min(m.count,Math.min(y.start+y.count,M.start+M.count));for(let C=P,I=N;C<I;C+=3){const O=C,z=C+1,T=C+2;o=ef(this,x,e,a,p,v,_,O,z,T),o&&(o.faceIndex=Math.floor(C/3),o.face.materialIndex=y.materialIndex,n.push(o))}}else{const E=Math.max(0,M.start),R=Math.min(m.count,M.start+M.count);for(let y=E,x=R;y<x;y+=3){const P=y,N=y+1,C=y+2;o=ef(this,u,e,a,p,v,_,P,N,C),o&&(o.faceIndex=Math.floor(y/3),n.push(o))}}}}function qb(r,e,n,a,o,c,u,d){let m;if(e.side===Gi?m=a.intersectTriangle(u,c,o,!0,d):m=a.intersectTriangle(o,c,u,e.side===br,d),m===null)return null;$u.copy(d),$u.applyMatrix4(r.matrixWorld);const p=n.ray.origin.distanceTo($u);return p<n.near||p>n.far?null:{distance:p,point:$u.clone(),object:r}}function ef(r,e,n,a,o,c,u,d,m,p){r.getVertexPosition(d,Zu),r.getVertexPosition(m,Ku),r.getVertexPosition(p,Qu);const v=qb(r,e,n,a,Zu,Ku,Qu,q_);if(v){const _=new ee;Da.getBarycoord(q_,Zu,Ku,Qu,_),o&&(v.uv=Da.getInterpolatedAttribute(o,d,m,p,_,new Dt)),c&&(v.uv1=Da.getInterpolatedAttribute(c,d,m,p,_,new Dt)),u&&(v.normal=Da.getInterpolatedAttribute(u,d,m,p,_,new ee),v.normal.dot(a.direction)>0&&v.normal.multiplyScalar(-1));const g={a:d,b:m,c:p,normal:new ee,materialIndex:0};Da.getNormal(Zu,Ku,Qu,g.normal),v.face=g,v.barycoord=_}return v}class Ff extends Li{constructor(e=null,n=1,a=1,o,c,u,d,m,p=Ln,v=Ln,_,g){super(null,u,d,m,p,v,o,c,_,g),this.isDataTexture=!0,this.image={data:e,width:n,height:a},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Sp=new ee,Wb=new ee,Yb=new Ct;class yr{constructor(e=new ee(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,a,o){return this.normal.set(e,n,a),this.constant=o,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,a){const o=Sp.subVectors(a,n).cross(Wb.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,a=!0){const o=e.delta(Sp),c=this.normal.dot(o);if(c===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const u=-(e.start.dot(this.normal)+this.constant)/c;return a===!0&&(u<0||u>1)?null:n.copy(e.start).addScaledVector(o,u)}intersectsLine(e){const n=this.distanceToPoint(e.start),a=this.distanceToPoint(e.end);return n<0&&a>0||a<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const a=n||Yb.getNormalMatrix(e),o=this.coplanarPoint(Sp).applyMatrix4(e),c=this.normal.applyMatrix3(a).normalize();return this.constant=-o.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Wr=new ol,jb=new Dt(.5,.5),tf=new ee;class vy{constructor(e=new yr,n=new yr,a=new yr,o=new yr,c=new yr,u=new yr){this.planes=[e,n,a,o,c,u]}set(e,n,a,o,c,u){const d=this.planes;return d[0].copy(e),d[1].copy(n),d[2].copy(a),d[3].copy(o),d[4].copy(c),d[5].copy(u),this}copy(e){const n=this.planes;for(let a=0;a<6;a++)n[a].copy(e.planes[a]);return this}setFromProjectionMatrix(e,n=ja,a=!1){const o=this.planes,c=e.elements,u=c[0],d=c[1],m=c[2],p=c[3],v=c[4],_=c[5],g=c[6],M=c[7],E=c[8],R=c[9],y=c[10],x=c[11],P=c[12],N=c[13],C=c[14],I=c[15];if(o[0].setComponents(p-u,M-v,x-E,I-P).normalize(),o[1].setComponents(p+u,M+v,x+E,I+P).normalize(),o[2].setComponents(p+d,M+_,x+R,I+N).normalize(),o[3].setComponents(p-d,M-_,x-R,I-N).normalize(),a)o[4].setComponents(m,g,y,C).normalize(),o[5].setComponents(p-m,M-g,x-y,I-C).normalize();else if(o[4].setComponents(p-m,M-g,x-y,I-C).normalize(),n===ja)o[5].setComponents(p+m,M+g,x+y,I+C).normalize();else if(n===Of)o[5].setComponents(m,g,y,C).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Wr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Wr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Wr)}intersectsSprite(e){Wr.center.set(0,0,0);const n=jb.distanceTo(e.center);return Wr.radius=.7071067811865476+n,Wr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Wr)}intersectsSphere(e){const n=this.planes,a=e.center,o=-e.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(a)<o)return!1;return!0}intersectsBox(e){const n=this.planes;for(let a=0;a<6;a++){const o=n[a];if(tf.x=o.normal.x>0?e.max.x:e.min.x,tf.y=o.normal.y>0?e.max.y:e.min.y,tf.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(tf)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Zb extends ll{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Bf=new ee,zf=new ee,W_=new zn,oc=new qf,nf=new ol,Mp=new ee,Y_=new ee;class Kb extends Ui{constructor(e=new ni,n=new Zb){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,a=[0];for(let o=1,c=n.count;o<c;o++)Bf.fromBufferAttribute(n,o-1),zf.fromBufferAttribute(n,o),a[o]=a[o-1],a[o]+=Bf.distanceTo(zf);e.setAttribute("lineDistance",new $i(a,1))}else Mt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const a=this.geometry,o=this.matrixWorld,c=e.params.Line.threshold,u=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),nf.copy(a.boundingSphere),nf.applyMatrix4(o),nf.radius+=c,e.ray.intersectsSphere(nf)===!1)return;W_.copy(o).invert(),oc.copy(e.ray).applyMatrix4(W_);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=this.isLineSegments?2:1,v=a.index,g=a.attributes.position;if(v!==null){const M=Math.max(0,u.start),E=Math.min(v.count,u.start+u.count);for(let R=M,y=E-1;R<y;R+=p){const x=v.getX(R),P=v.getX(R+1),N=af(this,e,oc,m,x,P,R);N&&n.push(N)}if(this.isLineLoop){const R=v.getX(E-1),y=v.getX(M),x=af(this,e,oc,m,R,y,E-1);x&&n.push(x)}}else{const M=Math.max(0,u.start),E=Math.min(g.count,u.start+u.count);for(let R=M,y=E-1;R<y;R+=p){const x=af(this,e,oc,m,R,R+1,R);x&&n.push(x)}if(this.isLineLoop){const R=af(this,e,oc,m,E-1,M,E-1);R&&n.push(R)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const d=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function af(r,e,n,a,o,c,u){const d=r.geometry.attributes.position;if(Bf.fromBufferAttribute(d,o),zf.fromBufferAttribute(d,c),n.distanceSqToSegment(Bf,zf,Mp,Y_)>a)return;Mp.applyMatrix4(r.matrixWorld);const p=e.ray.origin.distanceTo(Mp);if(!(p<e.near||p>e.far))return{distance:p,point:Y_.clone().applyMatrix4(r.matrixWorld),index:u,face:null,faceIndex:null,barycoord:null,object:r}}const j_=new ee,Z_=new ee;class Qb extends Kb{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,a=[];for(let o=0,c=n.count;o<c;o+=2)j_.fromBufferAttribute(n,o),Z_.fromBufferAttribute(n,o+1),a[o]=o===0?0:a[o-1],a[o+1]=a[o]+j_.distanceTo(Z_);e.setAttribute("lineDistance",new $i(a,1))}else Mt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Jb extends ll{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const K_=new zn,Tm=new qf,sf=new ol,rf=new ee;class lc extends Ui{constructor(e=new ni,n=new Jb){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const a=this.geometry,o=this.matrixWorld,c=e.params.Points.threshold,u=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),sf.copy(a.boundingSphere),sf.applyMatrix4(o),sf.radius+=c,e.ray.intersectsSphere(sf)===!1)return;K_.copy(o).invert(),Tm.copy(e.ray).applyMatrix4(K_);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=a.index,_=a.attributes.position;if(p!==null){const g=Math.max(0,u.start),M=Math.min(p.count,u.start+u.count);for(let E=g,R=M;E<R;E++){const y=p.getX(E);rf.fromBufferAttribute(_,y),Q_(rf,y,m,o,e,n,this)}}else{const g=Math.max(0,u.start),M=Math.min(_.count,u.start+u.count);for(let E=g,R=M;E<R;E++)rf.fromBufferAttribute(_,E),Q_(rf,E,m,o,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const d=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function Q_(r,e,n,a,o,c,u){const d=Tm.distanceSqToPoint(r);if(d<n){const m=new ee;Tm.closestPointToPoint(r,m),m.applyMatrix4(a);const p=o.ray.origin.distanceTo(m);if(p<o.near||p>o.far)return;c.push({distance:p,distanceToRay:Math.sqrt(d),point:m,index:e,face:null,faceIndex:null,barycoord:null,object:u})}}class _y extends Li{constructor(e=[],n=Jr,a,o,c,u,d,m,p,v){super(e,n,a,o,c,u,d,m,p,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class nl extends Li{constructor(e,n,a=Ka,o,c,u,d=Ln,m=Ln,p,v=Ds,_=1){if(v!==Ds&&v!==Kr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:n,depth:_};super(g,o,c,u,d,m,v,a,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Vm(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class $b extends nl{constructor(e,n=Ka,a=Jr,o,c,u=Ln,d=Ln,m,p=Ds){const v={width:e,height:e,depth:1},_=[v,v,v,v,v,v];super(e,e,n,a,o,c,u,d,m,p),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class xy extends Li{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class bc extends ni{constructor(e=1,n=1,a=1,o=1,c=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:a,widthSegments:o,heightSegments:c,depthSegments:u};const d=this;o=Math.floor(o),c=Math.floor(c),u=Math.floor(u);const m=[],p=[],v=[],_=[];let g=0,M=0;E("z","y","x",-1,-1,a,n,e,u,c,0),E("z","y","x",1,-1,a,n,-e,u,c,1),E("x","z","y",1,1,e,a,n,o,u,2),E("x","z","y",1,-1,e,a,-n,o,u,3),E("x","y","z",1,-1,e,n,a,o,c,4),E("x","y","z",-1,-1,e,n,-a,o,c,5),this.setIndex(m),this.setAttribute("position",new $i(p,3)),this.setAttribute("normal",new $i(v,3)),this.setAttribute("uv",new $i(_,2));function E(R,y,x,P,N,C,I,O,z,T,B){const K=C/z,G=I/T,Y=C/2,de=I/2,Se=O/2,ae=z+1,H=T+1;let k=0,ne=0;const ve=new ee;for(let Re=0;Re<H;Re++){const F=Re*G-de;for(let Q=0;Q<ae;Q++){const Ne=Q*K-Y;ve[R]=Ne*P,ve[y]=F*N,ve[x]=Se,p.push(ve.x,ve.y,ve.z),ve[R]=0,ve[y]=0,ve[x]=O>0?1:-1,v.push(ve.x,ve.y,ve.z),_.push(Q/z),_.push(1-Re/T),k+=1}}for(let Re=0;Re<T;Re++)for(let F=0;F<z;F++){const Q=g+F+ae*Re,Ne=g+F+ae*(Re+1),ze=g+(F+1)+ae*(Re+1),Ze=g+(F+1)+ae*Re;m.push(Q,Ne,Ze),m.push(Ne,ze,Ze),ne+=6}d.addGroup(M,ne,B),M+=ne,g+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bc(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Wf extends ni{constructor(e=1,n=1,a=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:a,heightSegments:o};const c=e/2,u=n/2,d=Math.floor(a),m=Math.floor(o),p=d+1,v=m+1,_=e/d,g=n/m,M=[],E=[],R=[],y=[];for(let x=0;x<v;x++){const P=x*g-u;for(let N=0;N<p;N++){const C=N*_-c;E.push(C,-P,0),R.push(0,0,1),y.push(N/d),y.push(1-x/m)}}for(let x=0;x<m;x++)for(let P=0;P<d;P++){const N=P+p*x,C=P+p*(x+1),I=P+1+p*(x+1),O=P+1+p*x;M.push(N,C,O),M.push(C,I,O)}this.setIndex(M),this.setAttribute("position",new $i(E,3)),this.setAttribute("normal",new $i(R,3)),this.setAttribute("uv",new $i(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wf(e.width,e.height,e.widthSegments,e.heightSegments)}}function il(r){const e={};for(const n in r){e[n]={};for(const a in r[n]){const o=r[n][a];if(J_(o))o.isRenderTargetTexture?(Mt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][a]=null):e[n][a]=o.clone();else if(Array.isArray(o))if(J_(o[0])){const c=[];for(let u=0,d=o.length;u<d;u++)c[u]=o[u].clone();e[n][a]=c}else e[n][a]=o.slice();else e[n][a]=o}}return e}function Di(r){const e={};for(let n=0;n<r.length;n++){const a=il(r[n]);for(const o in a)e[o]=a[o]}return e}function J_(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function e1(r){const e=[];for(let n=0;n<r.length;n++)e.push(r[n].clone());return e}function yy(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Zt.workingColorSpace}const al={clone:il,merge:Di};var t1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,n1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wn extends ll{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=t1,this.fragmentShader=n1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=il(e.uniforms),this.uniformsGroups=e1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const o in this.uniforms){const u=this.uniforms[o].value;u&&u.isTexture?n.uniforms[o]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?n.uniforms[o]={type:"c",value:u.getHex()}:u&&u.isVector2?n.uniforms[o]={type:"v2",value:u.toArray()}:u&&u.isVector3?n.uniforms[o]={type:"v3",value:u.toArray()}:u&&u.isVector4?n.uniforms[o]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?n.uniforms[o]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?n.uniforms[o]={type:"m4",value:u.toArray()}:n.uniforms[o]={value:u}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const a={};for(const o in this.extensions)this.extensions[o]===!0&&(a[o]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const a in e.uniforms){const o=e.uniforms[a];switch(this.uniforms[a]={},o.type){case"t":this.uniforms[a].value=n[o.value]||null;break;case"c":this.uniforms[a].value=new qt().setHex(o.value);break;case"v2":this.uniforms[a].value=new Dt().fromArray(o.value);break;case"v3":this.uniforms[a].value=new ee().fromArray(o.value);break;case"v4":this.uniforms[a].value=new Vn().fromArray(o.value);break;case"m3":this.uniforms[a].value=new Ct().fromArray(o.value);break;case"m4":this.uniforms[a].value=new zn().fromArray(o.value);break;default:this.uniforms[a].value=o.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const a in e.extensions)this.extensions[a]=e.extensions[a];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class i1 extends wn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class a1 extends ll{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=mb,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class s1 extends ll{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const of=new ee,lf=new rl,qa=new ee;class Sy extends Ui{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new zn,this.projectionMatrix=new zn,this.projectionMatrixInverse=new zn,this.coordinateSystem=ja,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(of,lf,qa),qa.x===1&&qa.y===1&&qa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(of,lf,qa.set(1,1,1)).invert()}updateWorldMatrix(e,n,a=!1){super.updateWorldMatrix(e,n,a),this.matrixWorld.decompose(of,lf,qa),qa.x===1&&qa.y===1&&qa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(of,lf,qa.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const gr=new ee,$_=new Dt,ex=new Dt;class ga extends Sy{constructor(e=50,n=1,a=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=a,this.far=o,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Em*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Jd*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Em*2*Math.atan(Math.tan(Jd*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,a){gr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(gr.x,gr.y).multiplyScalar(-e/gr.z),gr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(gr.x,gr.y).multiplyScalar(-e/gr.z)}getViewSize(e,n){return this.getViewBounds(e,$_,ex),n.subVectors(ex,$_)}setViewOffset(e,n,a,o,c,u){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Jd*.5*this.fov)/this.zoom,a=2*n,o=this.aspect*a,c=-.5*o;const u=this.view;if(this.view!==null&&this.view.enabled){const m=u.fullWidth,p=u.fullHeight;c+=u.offsetX*o/m,n-=u.offsetY*a/p,o*=u.width/m,a*=u.height/p}const d=this.filmOffset;d!==0&&(c+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+o,n,n-a,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class Yf extends Sy{constructor(e=-1,n=1,a=1,o=-1,c=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=a,this.bottom=o,this.near=c,this.far=u,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,a,o,c,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let c=a-e,u=a+e,d=o+n,m=o-n;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,u=c+p*this.view.width,d-=v*this.view.offsetY,m=d-v*this.view.height}this.projectionMatrix.makeOrthographic(c,u,d,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Wo=-90,Yo=1;class r1 extends Ui{constructor(e,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new ga(Wo,Yo,e,n);o.layers=this.layers,this.add(o);const c=new ga(Wo,Yo,e,n);c.layers=this.layers,this.add(c);const u=new ga(Wo,Yo,e,n);u.layers=this.layers,this.add(u);const d=new ga(Wo,Yo,e,n);d.layers=this.layers,this.add(d);const m=new ga(Wo,Yo,e,n);m.layers=this.layers,this.add(m);const p=new ga(Wo,Yo,e,n);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[a,o,c,u,d,m]=n;for(const p of n)this.remove(p);if(e===ja)a.up.set(0,1,0),a.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===Of)a.up.set(0,-1,0),a.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of n)this.add(p),p.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,u,d,m,p,v]=this.children,_=e.getRenderTarget(),g=e.getActiveCubeFace(),M=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const R=a.texture.generateMipmaps;a.texture.generateMipmaps=!1;let y=!1;e.isWebGLRenderer===!0?y=e.state.buffers.depth.getReversed():y=e.reversedDepthBuffer,e.setRenderTarget(a,0,o),y&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),e.setRenderTarget(a,1,o),y&&e.autoClear===!1&&e.clearDepth(),e.render(n,u),e.setRenderTarget(a,2,o),y&&e.autoClear===!1&&e.clearDepth(),e.render(n,d),e.setRenderTarget(a,3,o),y&&e.autoClear===!1&&e.clearDepth(),e.render(n,m),e.setRenderTarget(a,4,o),y&&e.autoClear===!1&&e.clearDepth(),e.render(n,p),a.texture.generateMipmaps=R,e.setRenderTarget(a,5,o),y&&e.autoClear===!1&&e.clearDepth(),e.render(n,v),e.setRenderTarget(_,g,M),e.xr.enabled=E,a.texture.needsPMREMUpdate=!0}}class o1 extends ga{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class l1{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=c1.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function c1(){this._document.hidden===!1&&this.reset()}const tx=new zn;class nx{constructor(e,n,a=0,o=1/0){this.ray=new qf(e,n),this.near=a,this.far=o,this.camera=null,this.layers=new Xm,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,n.projectionMatrix.elements[14]).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):nn("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return tx.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(tx),this}intersectObject(e,n=!0,a=[]){return Am(e,this,a,n),a.sort(ix),a}intersectObjects(e,n=!0,a=[]){for(let o=0,c=e.length;o<c;o++)Am(e[o],this,a,n);return a.sort(ix),a}}function ix(r,e){return r.distance-e.distance}function Am(r,e,n,a){let o=!0;if(r.layers.test(e.layers)&&r.raycast(e,n)===!1&&(o=!1),o===!0&&a===!0){const c=r.children;for(let u=0,d=c.length;u<d;u++)Am(c[u],e,n,!0)}}const Jm=class Jm{constructor(e,n,a,o){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,a,o)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let a=0;a<4;a++)this.elements[a]=e[a+n];return this}set(e,n,a,o){const c=this.elements;return c[0]=e,c[2]=n,c[1]=a,c[3]=o,this}};Jm.prototype.isMatrix2=!0;let ax=Jm;function sx(r,e,n,a){const o=u1(a);switch(n){case ly:return r*e;case uy:return r*e/o.components*o.byteLength;case zm:return r*e/o.components*o.byteLength;case $r:return r*e*2/o.components*o.byteLength;case Im:return r*e*2/o.components*o.byteLength;case cy:return r*e*3/o.components*o.byteLength;case Ni:return r*e*4/o.components*o.byteLength;case Hm:return r*e*4/o.components*o.byteLength;case Tf:case Af:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case wf:case Rf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Zp:case Qp:return Math.max(r,16)*Math.max(e,8)/4;case jp:case Kp:return Math.max(r,8)*Math.max(e,8)/2;case Jp:case $p:case tm:case nm:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case em:case Nf:case im:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case am:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case sm:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case rm:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case om:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case lm:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case cm:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case um:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case fm:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case hm:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case dm:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case pm:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case mm:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case gm:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case vm:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case _m:case xm:case ym:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Sm:case Mm:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Lf:case bm:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function u1(r){switch(r){case va:case ay:return{byteLength:1,components:1};case vc:case sy:case bi:return{byteLength:2,components:1};case Fm:case Bm:return{byteLength:2,components:4};case Ka:case Pm:case Hi:return{byteLength:4,components:1};case ry:case oy:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Om}}));typeof window<"u"&&(window.__THREE__?Mt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Om);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function My(){let r=null,e=!1,n=null,a=null;function o(c,u){n(c,u),a=r.requestAnimationFrame(o)}return{start:function(){e!==!0&&n!==null&&r!==null&&(a=r.requestAnimationFrame(o),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(a),e=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function f1(r){const e=new WeakMap;function n(d,m){const p=d.array,v=d.usage,_=p.byteLength,g=r.createBuffer();r.bindBuffer(m,g),r.bufferData(m,p,v),d.onUploadCallback();let M;if(p instanceof Float32Array)M=r.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)M=r.HALF_FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?M=r.HALF_FLOAT:M=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)M=r.SHORT;else if(p instanceof Uint32Array)M=r.UNSIGNED_INT;else if(p instanceof Int32Array)M=r.INT;else if(p instanceof Int8Array)M=r.BYTE;else if(p instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:g,type:M,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:_}}function a(d,m,p){const v=m.array,_=m.updateRanges;if(r.bindBuffer(p,d),_.length===0)r.bufferSubData(p,0,v);else{_.sort((M,E)=>M.start-E.start);let g=0;for(let M=1;M<_.length;M++){const E=_[g],R=_[M];R.start<=E.start+E.count+1?E.count=Math.max(E.count,R.start+R.count-E.start):(++g,_[g]=R)}_.length=g+1;for(let M=0,E=_.length;M<E;M++){const R=_[M];r.bufferSubData(p,R.start*v.BYTES_PER_ELEMENT,v,R.start,R.count)}m.clearUpdateRanges()}m.onUploadCallback()}function o(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=e.get(d);m&&(r.deleteBuffer(m.buffer),e.delete(d))}function u(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const v=e.get(d);(!v||v.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=e.get(d);if(p===void 0)e.set(d,n(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(p.buffer,d,m),p.version=d.version}}return{get:o,remove:c,update:u}}var h1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,d1=`#ifdef USE_ALPHAHASH
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
#endif`,p1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,m1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,g1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,v1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_1=`#ifdef USE_AOMAP
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
#endif`,x1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,y1=`#ifdef USE_BATCHING
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
#endif`,S1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,M1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,b1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,E1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,T1=`#ifdef USE_IRIDESCENCE
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
#endif`,A1=`#ifdef USE_BUMPMAP
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
#endif`,w1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,R1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,C1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,D1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,N1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,L1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,U1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,O1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,P1=`#define PI 3.141592653589793
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
} // validated`,F1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,B1=`vec3 transformedNormal = objectNormal;
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
#endif`,z1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,I1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,H1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,G1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,k1="gl_FragColor = linearToOutputTexel( gl_FragColor );",V1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,X1=`#ifdef USE_ENVMAP
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
#endif`,q1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,W1=`#ifdef USE_ENVMAP
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
#endif`,Y1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,j1=`#ifdef USE_ENVMAP
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
#endif`,Z1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,K1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Q1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,J1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$1=`#ifdef USE_GRADIENTMAP
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
}`,eE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,nE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,iE=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,aE=`#ifdef USE_ENVMAP
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
#endif`,sE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,oE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cE=`PhysicalMaterial material;
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
#endif`,uE=`uniform sampler2D dfgLUT;
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
}`,fE=`
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
#endif`,hE=`#if defined( RE_IndirectDiffuse )
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
#endif`,dE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pE=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,mE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_E=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,SE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ME=`#if defined( USE_POINTS_UV )
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
#endif`,bE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,EE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,TE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,AE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,RE=`#ifdef USE_MORPHTARGETS
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
#endif`,CE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,DE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,NE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,LE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,UE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,OE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,PE=`#ifdef USE_NORMALMAP
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
#endif`,FE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,BE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,IE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,HE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,GE=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,kE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,VE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,XE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,WE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,YE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ZE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,KE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,QE=`float getShadowMask() {
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
}`,JE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$E=`#ifdef USE_SKINNING
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
#endif`,eT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tT=`#ifdef USE_SKINNING
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
#endif`,nT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,iT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,aT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,rT=`#ifdef USE_TRANSMISSION
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
#endif`,oT=`#ifdef USE_TRANSMISSION
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
#endif`,lT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const hT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dT=`uniform sampler2D t2D;
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
}`,pT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,gT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_T=`#include <common>
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
}`,xT=`#if DEPTH_PACKING == 3200
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
}`,yT=`#define DISTANCE
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
}`,ST=`#define DISTANCE
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
}`,MT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ET=`uniform float scale;
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
}`,TT=`uniform vec3 diffuse;
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
}`,AT=`#include <common>
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
}`,wT=`uniform vec3 diffuse;
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
}`,RT=`#define LAMBERT
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
}`,CT=`#define LAMBERT
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
}`,DT=`#define MATCAP
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
}`,NT=`#define MATCAP
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
}`,LT=`#define NORMAL
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
}`,UT=`#define NORMAL
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
}`,OT=`#define PHONG
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
}`,PT=`#define PHONG
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
}`,FT=`#define STANDARD
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
}`,BT=`#define STANDARD
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
}`,zT=`#define TOON
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
}`,IT=`#define TOON
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
}`,HT=`uniform float size;
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
}`,GT=`uniform vec3 diffuse;
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
}`,kT=`#include <common>
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
}`,VT=`uniform vec3 color;
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
}`,XT=`uniform float rotation;
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
}`,qT=`uniform vec3 diffuse;
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
}`,Ft={alphahash_fragment:h1,alphahash_pars_fragment:d1,alphamap_fragment:p1,alphamap_pars_fragment:m1,alphatest_fragment:g1,alphatest_pars_fragment:v1,aomap_fragment:_1,aomap_pars_fragment:x1,batching_pars_vertex:y1,batching_vertex:S1,begin_vertex:M1,beginnormal_vertex:b1,bsdfs:E1,iridescence_fragment:T1,bumpmap_pars_fragment:A1,clipping_planes_fragment:w1,clipping_planes_pars_fragment:R1,clipping_planes_pars_vertex:C1,clipping_planes_vertex:D1,color_fragment:N1,color_pars_fragment:L1,color_pars_vertex:U1,color_vertex:O1,common:P1,cube_uv_reflection_fragment:F1,defaultnormal_vertex:B1,displacementmap_pars_vertex:z1,displacementmap_vertex:I1,emissivemap_fragment:H1,emissivemap_pars_fragment:G1,colorspace_fragment:k1,colorspace_pars_fragment:V1,envmap_fragment:X1,envmap_common_pars_fragment:q1,envmap_pars_fragment:W1,envmap_pars_vertex:Y1,envmap_physical_pars_fragment:aE,envmap_vertex:j1,fog_vertex:Z1,fog_pars_vertex:K1,fog_fragment:Q1,fog_pars_fragment:J1,gradientmap_pars_fragment:$1,lightmap_pars_fragment:eE,lights_lambert_fragment:tE,lights_lambert_pars_fragment:nE,lights_pars_begin:iE,lights_toon_fragment:sE,lights_toon_pars_fragment:rE,lights_phong_fragment:oE,lights_phong_pars_fragment:lE,lights_physical_fragment:cE,lights_physical_pars_fragment:uE,lights_fragment_begin:fE,lights_fragment_maps:hE,lights_fragment_end:dE,lightprobes_pars_fragment:pE,logdepthbuf_fragment:mE,logdepthbuf_pars_fragment:gE,logdepthbuf_pars_vertex:vE,logdepthbuf_vertex:_E,map_fragment:xE,map_pars_fragment:yE,map_particle_fragment:SE,map_particle_pars_fragment:ME,metalnessmap_fragment:bE,metalnessmap_pars_fragment:EE,morphinstance_vertex:TE,morphcolor_vertex:AE,morphnormal_vertex:wE,morphtarget_pars_vertex:RE,morphtarget_vertex:CE,normal_fragment_begin:DE,normal_fragment_maps:NE,normal_pars_fragment:LE,normal_pars_vertex:UE,normal_vertex:OE,normalmap_pars_fragment:PE,clearcoat_normal_fragment_begin:FE,clearcoat_normal_fragment_maps:BE,clearcoat_pars_fragment:zE,iridescence_pars_fragment:IE,opaque_fragment:HE,packing:GE,premultiplied_alpha_fragment:kE,project_vertex:VE,dithering_fragment:XE,dithering_pars_fragment:qE,roughnessmap_fragment:WE,roughnessmap_pars_fragment:YE,shadowmap_pars_fragment:jE,shadowmap_pars_vertex:ZE,shadowmap_vertex:KE,shadowmask_pars_fragment:QE,skinbase_vertex:JE,skinning_pars_vertex:$E,skinning_vertex:eT,skinnormal_vertex:tT,specularmap_fragment:nT,specularmap_pars_fragment:iT,tonemapping_fragment:aT,tonemapping_pars_fragment:sT,transmission_fragment:rT,transmission_pars_fragment:oT,uv_pars_fragment:lT,uv_pars_vertex:cT,uv_vertex:uT,worldpos_vertex:fT,background_vert:hT,background_frag:dT,backgroundCube_vert:pT,backgroundCube_frag:mT,cube_vert:gT,cube_frag:vT,depth_vert:_T,depth_frag:xT,distance_vert:yT,distance_frag:ST,equirect_vert:MT,equirect_frag:bT,linedashed_vert:ET,linedashed_frag:TT,meshbasic_vert:AT,meshbasic_frag:wT,meshlambert_vert:RT,meshlambert_frag:CT,meshmatcap_vert:DT,meshmatcap_frag:NT,meshnormal_vert:LT,meshnormal_frag:UT,meshphong_vert:OT,meshphong_frag:PT,meshphysical_vert:FT,meshphysical_frag:BT,meshtoon_vert:zT,meshtoon_frag:IT,points_vert:HT,points_frag:GT,shadow_vert:kT,shadow_frag:VT,sprite_vert:XT,sprite_frag:qT},Je={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ct},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ct}},envmap:{envMap:{value:null},envMapRotation:{value:new Ct},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ct},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new ee},probesMax:{value:new ee},probesResolution:{value:new ee}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0},uvTransform:{value:new Ct}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ct},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0}}},Ya={basic:{uniforms:Di([Je.common,Je.specularmap,Je.envmap,Je.aomap,Je.lightmap,Je.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:Di([Je.common,Je.specularmap,Je.envmap,Je.aomap,Je.lightmap,Je.emissivemap,Je.bumpmap,Je.normalmap,Je.displacementmap,Je.fog,Je.lights,{emissive:{value:new qt(0)},envMapIntensity:{value:1}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:Di([Je.common,Je.specularmap,Je.envmap,Je.aomap,Je.lightmap,Je.emissivemap,Je.bumpmap,Je.normalmap,Je.displacementmap,Je.fog,Je.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:Di([Je.common,Je.envmap,Je.aomap,Je.lightmap,Je.emissivemap,Je.bumpmap,Je.normalmap,Je.displacementmap,Je.roughnessmap,Je.metalnessmap,Je.fog,Je.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:Di([Je.common,Je.aomap,Je.lightmap,Je.emissivemap,Je.bumpmap,Je.normalmap,Je.displacementmap,Je.gradientmap,Je.fog,Je.lights,{emissive:{value:new qt(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:Di([Je.common,Je.bumpmap,Je.normalmap,Je.displacementmap,Je.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:Di([Je.points,Je.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:Di([Je.common,Je.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:Di([Je.common,Je.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:Di([Je.common,Je.bumpmap,Je.normalmap,Je.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:Di([Je.sprite,Je.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new Ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ct}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distance:{uniforms:Di([Je.common,Je.displacementmap,{referencePosition:{value:new ee},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distance_vert,fragmentShader:Ft.distance_frag},shadow:{uniforms:Di([Je.lights,Je.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};Ya.physical={uniforms:Di([Ya.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ct},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ct},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ct},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ct},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ct},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ct},anisotropyVector:{value:new Dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ct}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};const cf={r:0,b:0,g:0},WT=new zn,by=new Ct;by.set(-1,0,0,0,1,0,0,0,1);function YT(r,e,n,a,o,c){const u=new qt(0);let d=o===!0?0:1,m,p,v=null,_=0,g=null;function M(P){let N=P.isScene===!0?P.background:null;if(N&&N.isTexture){const C=P.backgroundBlurriness>0;N=e.get(N,C)}return N}function E(P){let N=!1;const C=M(P);C===null?y(u,d):C&&C.isColor&&(y(C,1),N=!0);const I=r.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,c):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(r.autoClear||N)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function R(P,N){const C=M(N);C&&(C.isCubeTexture||C.mapping===Xf)?(p===void 0&&(p=new La(new bc(1,1,1),new wn({name:"BackgroundCubeMaterial",uniforms:il(Ya.backgroundCube.uniforms),vertexShader:Ya.backgroundCube.vertexShader,fragmentShader:Ya.backgroundCube.fragmentShader,side:Gi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(I,O,z){this.matrixWorld.copyPosition(z.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(p)),p.material.uniforms.envMap.value=C,p.material.uniforms.backgroundBlurriness.value=N.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(WT.makeRotationFromEuler(N.backgroundRotation)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(by),p.material.toneMapped=Zt.getTransfer(C.colorSpace)!==mn,(v!==C||_!==C.version||g!==r.toneMapping)&&(p.material.needsUpdate=!0,v=C,_=C.version,g=r.toneMapping),p.layers.enableAll(),P.unshift(p,p.geometry,p.material,0,0,null)):C&&C.isTexture&&(m===void 0&&(m=new La(new Wf(2,2),new wn({name:"BackgroundMaterial",uniforms:il(Ya.background.uniforms),vertexShader:Ya.background.vertexShader,fragmentShader:Ya.background.fragmentShader,side:br,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=C,m.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,m.material.toneMapped=Zt.getTransfer(C.colorSpace)!==mn,C.matrixAutoUpdate===!0&&C.updateMatrix(),m.material.uniforms.uvTransform.value.copy(C.matrix),(v!==C||_!==C.version||g!==r.toneMapping)&&(m.material.needsUpdate=!0,v=C,_=C.version,g=r.toneMapping),m.layers.enableAll(),P.unshift(m,m.geometry,m.material,0,0,null))}function y(P,N){P.getRGB(cf,yy(r)),n.buffers.color.setClear(cf.r,cf.g,cf.b,N,c)}function x(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return u},setClearColor:function(P,N=1){u.set(P),d=N,y(u,d)},getClearAlpha:function(){return d},setClearAlpha:function(P){d=P,y(u,d)},render:E,addToRenderList:R,dispose:x}}function jT(r,e){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},o=g(null);let c=o,u=!1;function d(G,Y,de,Se,ae){let H=!1;const k=_(G,Se,de,Y);c!==k&&(c=k,p(c.object)),H=M(G,Se,de,ae),H&&E(G,Se,de,ae),ae!==null&&e.update(ae,r.ELEMENT_ARRAY_BUFFER),(H||u)&&(u=!1,C(G,Y,de,Se),ae!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(ae).buffer))}function m(){return r.createVertexArray()}function p(G){return r.bindVertexArray(G)}function v(G){return r.deleteVertexArray(G)}function _(G,Y,de,Se){const ae=Se.wireframe===!0;let H=a[Y.id];H===void 0&&(H={},a[Y.id]=H);const k=G.isInstancedMesh===!0?G.id:0;let ne=H[k];ne===void 0&&(ne={},H[k]=ne);let ve=ne[de.id];ve===void 0&&(ve={},ne[de.id]=ve);let Re=ve[ae];return Re===void 0&&(Re=g(m()),ve[ae]=Re),Re}function g(G){const Y=[],de=[],Se=[];for(let ae=0;ae<n;ae++)Y[ae]=0,de[ae]=0,Se[ae]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Y,enabledAttributes:de,attributeDivisors:Se,object:G,attributes:{},index:null}}function M(G,Y,de,Se){const ae=c.attributes,H=Y.attributes;let k=0;const ne=de.getAttributes();for(const ve in ne)if(ne[ve].location>=0){const F=ae[ve];let Q=H[ve];if(Q===void 0&&(ve==="instanceMatrix"&&G.instanceMatrix&&(Q=G.instanceMatrix),ve==="instanceColor"&&G.instanceColor&&(Q=G.instanceColor)),F===void 0||F.attribute!==Q||Q&&F.data!==Q.data)return!0;k++}return c.attributesNum!==k||c.index!==Se}function E(G,Y,de,Se){const ae={},H=Y.attributes;let k=0;const ne=de.getAttributes();for(const ve in ne)if(ne[ve].location>=0){let F=H[ve];F===void 0&&(ve==="instanceMatrix"&&G.instanceMatrix&&(F=G.instanceMatrix),ve==="instanceColor"&&G.instanceColor&&(F=G.instanceColor));const Q={};Q.attribute=F,F&&F.data&&(Q.data=F.data),ae[ve]=Q,k++}c.attributes=ae,c.attributesNum=k,c.index=Se}function R(){const G=c.newAttributes;for(let Y=0,de=G.length;Y<de;Y++)G[Y]=0}function y(G){x(G,0)}function x(G,Y){const de=c.newAttributes,Se=c.enabledAttributes,ae=c.attributeDivisors;de[G]=1,Se[G]===0&&(r.enableVertexAttribArray(G),Se[G]=1),ae[G]!==Y&&(r.vertexAttribDivisor(G,Y),ae[G]=Y)}function P(){const G=c.newAttributes,Y=c.enabledAttributes;for(let de=0,Se=Y.length;de<Se;de++)Y[de]!==G[de]&&(r.disableVertexAttribArray(de),Y[de]=0)}function N(G,Y,de,Se,ae,H,k){k===!0?r.vertexAttribIPointer(G,Y,de,ae,H):r.vertexAttribPointer(G,Y,de,Se,ae,H)}function C(G,Y,de,Se){R();const ae=Se.attributes,H=de.getAttributes(),k=Y.defaultAttributeValues;for(const ne in H){const ve=H[ne];if(ve.location>=0){let Re=ae[ne];if(Re===void 0&&(ne==="instanceMatrix"&&G.instanceMatrix&&(Re=G.instanceMatrix),ne==="instanceColor"&&G.instanceColor&&(Re=G.instanceColor)),Re!==void 0){const F=Re.normalized,Q=Re.itemSize,Ne=e.get(Re);if(Ne===void 0)continue;const ze=Ne.buffer,Ze=Ne.type,re=Ne.bytesPerElement,Me=Ze===r.INT||Ze===r.UNSIGNED_INT||Re.gpuType===Pm;if(Re.isInterleavedBufferAttribute){const De=Re.data,nt=De.stride,vt=Re.offset;if(De.isInstancedInterleavedBuffer){for(let Ke=0;Ke<ve.locationSize;Ke++)x(ve.location+Ke,De.meshPerAttribute);G.isInstancedMesh!==!0&&Se._maxInstanceCount===void 0&&(Se._maxInstanceCount=De.meshPerAttribute*De.count)}else for(let Ke=0;Ke<ve.locationSize;Ke++)y(ve.location+Ke);r.bindBuffer(r.ARRAY_BUFFER,ze);for(let Ke=0;Ke<ve.locationSize;Ke++)N(ve.location+Ke,Q/ve.locationSize,Ze,F,nt*re,(vt+Q/ve.locationSize*Ke)*re,Me)}else{if(Re.isInstancedBufferAttribute){for(let De=0;De<ve.locationSize;De++)x(ve.location+De,Re.meshPerAttribute);G.isInstancedMesh!==!0&&Se._maxInstanceCount===void 0&&(Se._maxInstanceCount=Re.meshPerAttribute*Re.count)}else for(let De=0;De<ve.locationSize;De++)y(ve.location+De);r.bindBuffer(r.ARRAY_BUFFER,ze);for(let De=0;De<ve.locationSize;De++)N(ve.location+De,Q/ve.locationSize,Ze,F,Q*re,Q/ve.locationSize*De*re,Me)}}else if(k!==void 0){const F=k[ne];if(F!==void 0)switch(F.length){case 2:r.vertexAttrib2fv(ve.location,F);break;case 3:r.vertexAttrib3fv(ve.location,F);break;case 4:r.vertexAttrib4fv(ve.location,F);break;default:r.vertexAttrib1fv(ve.location,F)}}}}P()}function I(){B();for(const G in a){const Y=a[G];for(const de in Y){const Se=Y[de];for(const ae in Se){const H=Se[ae];for(const k in H)v(H[k].object),delete H[k];delete Se[ae]}}delete a[G]}}function O(G){if(a[G.id]===void 0)return;const Y=a[G.id];for(const de in Y){const Se=Y[de];for(const ae in Se){const H=Se[ae];for(const k in H)v(H[k].object),delete H[k];delete Se[ae]}}delete a[G.id]}function z(G){for(const Y in a){const de=a[Y];for(const Se in de){const ae=de[Se];if(ae[G.id]===void 0)continue;const H=ae[G.id];for(const k in H)v(H[k].object),delete H[k];delete ae[G.id]}}}function T(G){for(const Y in a){const de=a[Y],Se=G.isInstancedMesh===!0?G.id:0,ae=de[Se];if(ae!==void 0){for(const H in ae){const k=ae[H];for(const ne in k)v(k[ne].object),delete k[ne];delete ae[H]}delete de[Se],Object.keys(de).length===0&&delete a[Y]}}}function B(){K(),u=!0,c!==o&&(c=o,p(c.object))}function K(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:d,reset:B,resetDefaultState:K,dispose:I,releaseStatesOfGeometry:O,releaseStatesOfObject:T,releaseStatesOfProgram:z,initAttributes:R,enableAttribute:y,disableUnusedAttributes:P}}function ZT(r,e,n){let a;function o(m){a=m}function c(m,p){r.drawArrays(a,m,p),n.update(p,a,1)}function u(m,p,v){v!==0&&(r.drawArraysInstanced(a,m,p,v),n.update(p,a,v))}function d(m,p,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,m,0,p,0,v);let g=0;for(let M=0;M<v;M++)g+=p[M];n.update(g,a,1)}this.setMode=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=d}function KT(r,e,n,a){let o;function c(){if(o!==void 0)return o;if(e.has("EXT_texture_filter_anisotropic")===!0){const z=e.get("EXT_texture_filter_anisotropic");o=r.getParameter(z.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function u(z){return!(z!==Ni&&a.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(z){const T=z===bi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(z!==va&&a.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&z!==Hi&&!T)}function m(z){if(z==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";z="mediump"}return z==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=n.precision!==void 0?n.precision:"highp";const v=m(p);v!==p&&(Mt("WebGLRenderer:",p,"not supported, using",v,"instead."),p=v);const _=n.logarithmicDepthBuffer===!0,g=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&g===!1&&Mt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const M=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),R=r.getParameter(r.MAX_TEXTURE_SIZE),y=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),x=r.getParameter(r.MAX_VERTEX_ATTRIBS),P=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),N=r.getParameter(r.MAX_VARYING_VECTORS),C=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),I=r.getParameter(r.MAX_SAMPLES),O=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:u,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:_,reversedDepthBuffer:g,maxTextures:M,maxVertexTextures:E,maxTextureSize:R,maxCubemapSize:y,maxAttributes:x,maxVertexUniforms:P,maxVaryings:N,maxFragmentUniforms:C,maxSamples:I,samples:O}}function QT(r){const e=this;let n=null,a=0,o=!1,c=!1;const u=new yr,d=new Ct,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,g){const M=_.length!==0||g||a!==0||o;return o=g,a=_.length,M},this.beginShadows=function(){c=!0,v(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,g){n=v(_,g,0)},this.setState=function(_,g,M){const E=_.clippingPlanes,R=_.clipIntersection,y=_.clipShadows,x=r.get(_);if(!o||E===null||E.length===0||c&&!y)c?v(null):p();else{const P=c?0:a,N=P*4;let C=x.clippingState||null;m.value=C,C=v(E,g,N,M);for(let I=0;I!==N;++I)C[I]=n[I];x.clippingState=C,this.numIntersection=R?this.numPlanes:0,this.numPlanes+=P}};function p(){m.value!==n&&(m.value=n,m.needsUpdate=a>0),e.numPlanes=a,e.numIntersection=0}function v(_,g,M,E){const R=_!==null?_.length:0;let y=null;if(R!==0){if(y=m.value,E!==!0||y===null){const x=M+R*4,P=g.matrixWorldInverse;d.getNormalMatrix(P),(y===null||y.length<x)&&(y=new Float32Array(x));for(let N=0,C=M;N!==R;++N,C+=4)u.copy(_[N]).applyMatrix4(P,d),u.normal.toArray(y,C),y[C+3]=u.constant}m.value=y,m.needsUpdate=!0}return e.numPlanes=R,e.numIntersection=0,y}}const Mr=4,rx=[.125,.215,.35,.446,.526,.582],jr=20,JT=256,cc=new Yf,ox=new qt;let bp=null,Ep=0,Tp=0,Ap=!1;const $T=new ee;class lx{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,a=.1,o=100,c={}){const{size:u=256,position:d=$T}=c;bp=this._renderer.getRenderTarget(),Ep=this._renderer.getActiveCubeFace(),Tp=this._renderer.getActiveMipmapLevel(),Ap=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(u);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,a,o,m,d),n>0&&this._blur(m,0,0,n),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fx(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ux(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(bp,Ep,Tp),this._renderer.xr.enabled=Ap,e.scissorTest=!1,jo(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Jr||e.mapping===tl?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),bp=this._renderer.getRenderTarget(),Ep=this._renderer.getActiveCubeFace(),Tp=this._renderer.getActiveMipmapLevel(),Ap=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=n||this._allocateTargets();return this._textureToCubeUV(e,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:Mi,minFilter:Mi,generateMipmaps:!1,type:bi,format:Ni,colorSpace:xc,depthBuffer:!1},o=cx(e,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cx(e,n,a);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=eA(c)),this._blurMaterial=nA(c,e,n),this._ggxMaterial=tA(c,e,n)}return o}_compileMaterial(e){const n=new La(new ni,e);this._renderer.compile(n,cc)}_sceneToCubeUV(e,n,a,o,c){const m=new ga(90,1,n,a),p=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],_=this._renderer,g=_.autoClear,M=_.toneMapping;_.getClearColor(ox),_.toneMapping=Za,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(o),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new La(new bc,new qm({name:"PMREM.Background",side:Gi,depthWrite:!1,depthTest:!1})));const R=this._backgroundBox,y=R.material;let x=!1;const P=e.background;P?P.isColor&&(y.color.copy(P),e.background=null,x=!0):(y.color.copy(ox),x=!0);for(let N=0;N<6;N++){const C=N%3;C===0?(m.up.set(0,p[N],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+v[N],c.y,c.z)):C===1?(m.up.set(0,0,p[N]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+v[N],c.z)):(m.up.set(0,p[N],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+v[N]));const I=this._cubeSize;jo(o,C*I,N>2?I:0,I,I),_.setRenderTarget(o),x&&_.render(R,m),_.render(e,m)}_.toneMapping=M,_.autoClear=g,e.background=P}_textureToCubeUV(e,n){const a=this._renderer,o=e.mapping===Jr||e.mapping===tl;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=fx()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ux());const c=o?this._cubemapMaterial:this._equirectMaterial,u=this._lodMeshes[0];u.material=c;const d=c.uniforms;d.envMap.value=e;const m=this._cubeSize;jo(n,0,0,3*m,2*m),a.setRenderTarget(n),a.render(u,cc)}_applyPMREM(e){const n=this._renderer,a=n.autoClear;n.autoClear=!1;const o=this._lodMeshes.length;for(let c=1;c<o;c++)this._applyGGXFilter(e,c-1,c);n.autoClear=a}_applyGGXFilter(e,n,a){const o=this._renderer,c=this._pingPongRenderTarget,u=this._ggxMaterial,d=this._lodMeshes[a];d.material=u;const m=u.uniforms,p=a/(this._lodMeshes.length-1),v=n/(this._lodMeshes.length-1),_=Math.sqrt(p*p-v*v),g=0+p*1.25,M=_*g,{_lodMax:E}=this,R=this._sizeLods[a],y=3*R*(a>E-Mr?a-E+Mr:0),x=4*(this._cubeSize-R);m.envMap.value=e.texture,m.roughness.value=M,m.mipInt.value=E-n,jo(c,y,x,3*R,2*R),o.setRenderTarget(c),o.render(d,cc),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=E-a,jo(e,y,x,3*R,2*R),o.setRenderTarget(e),o.render(d,cc)}_blur(e,n,a,o,c){const u=this._pingPongRenderTarget;this._halfBlur(e,u,n,a,o,"latitudinal",c),this._halfBlur(u,e,a,a,o,"longitudinal",c)}_halfBlur(e,n,a,o,c,u,d){const m=this._renderer,p=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&nn("blur direction must be either latitudinal or longitudinal!");const v=3,_=this._lodMeshes[o];_.material=p;const g=p.uniforms,M=this._sizeLods[a]-1,E=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*jr-1),R=c/E,y=isFinite(c)?1+Math.floor(v*R):jr;y>jr&&Mt(`sigmaRadians, ${c}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${jr}`);const x=[];let P=0;for(let z=0;z<jr;++z){const T=z/R,B=Math.exp(-T*T/2);x.push(B),z===0?P+=B:z<y&&(P+=2*B)}for(let z=0;z<x.length;z++)x[z]=x[z]/P;g.envMap.value=e.texture,g.samples.value=y,g.weights.value=x,g.latitudinal.value=u==="latitudinal",d&&(g.poleAxis.value=d);const{_lodMax:N}=this;g.dTheta.value=E,g.mipInt.value=N-a;const C=this._sizeLods[o],I=3*C*(o>N-Mr?o-N+Mr:0),O=4*(this._cubeSize-C);jo(n,I,O,3*C,2*C),m.setRenderTarget(n),m.render(_,cc)}}function eA(r){const e=[],n=[],a=[];let o=r;const c=r-Mr+1+rx.length;for(let u=0;u<c;u++){const d=Math.pow(2,o);e.push(d);let m=1/d;u>r-Mr?m=rx[u-r+Mr-1]:u===0&&(m=0),n.push(m);const p=1/(d-2),v=-p,_=1+p,g=[v,v,_,v,_,_,v,v,_,_,v,_],M=6,E=6,R=3,y=2,x=1,P=new Float32Array(R*E*M),N=new Float32Array(y*E*M),C=new Float32Array(x*E*M);for(let O=0;O<M;O++){const z=O%3*2/3-1,T=O>2?0:-1,B=[z,T,0,z+2/3,T,0,z+2/3,T+1,0,z,T,0,z+2/3,T+1,0,z,T+1,0];P.set(B,R*E*O),N.set(g,y*E*O);const K=[O,O,O,O,O,O];C.set(K,x*E*O)}const I=new ni;I.setAttribute("position",new tn(P,R)),I.setAttribute("uv",new tn(N,y)),I.setAttribute("faceIndex",new tn(C,x)),a.push(new La(I,null)),o>Mr&&o--}return{lodMeshes:a,sizeLods:e,sigmas:n}}function cx(r,e,n){const a=new mi(r,e,n);return a.texture.mapping=Xf,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function jo(r,e,n,a,o){r.viewport.set(e,n,a,o),r.scissor.set(e,n,a,o)}function tA(r,e,n){return new wn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:JT,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:jf(),fragmentShader:`

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
		`,blending:Na,depthTest:!1,depthWrite:!1})}function nA(r,e,n){const a=new Float32Array(jr),o=new ee(0,1,0);return new wn({name:"SphericalGaussianBlur",defines:{n:jr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:a},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:jf(),fragmentShader:`

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
		`,blending:Na,depthTest:!1,depthWrite:!1})}function ux(){return new wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jf(),fragmentShader:`

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
		`,blending:Na,depthTest:!1,depthWrite:!1})}function fx(){return new wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Na,depthTest:!1,depthWrite:!1})}function jf(){return`

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
	`}class Ey extends mi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const a={width:e,height:e,depth:1},o=[a,a,a,a,a,a];this.texture=new _y(o),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},o=new bc(5,5,5),c=new wn({name:"CubemapFromEquirect",uniforms:il(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:Gi,blending:Na});c.uniforms.tEquirect.value=n;const u=new La(o,c),d=n.minFilter;return n.minFilter===Zr&&(n.minFilter=Mi),new r1(1,10,this).update(e,u),n.minFilter=d,u.geometry.dispose(),u.material.dispose(),this}clear(e,n=!0,a=!0,o=!0){const c=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(n,a,o);e.setRenderTarget(c)}}function iA(r){let e=new WeakMap,n=new WeakMap,a=null;function o(g,M=!1){return g==null?null:M?u(g):c(g)}function c(g){if(g&&g.isTexture){const M=g.mapping;if(M===Zd||M===Kd)if(e.has(g)){const E=e.get(g).texture;return d(E,g.mapping)}else{const E=g.image;if(E&&E.height>0){const R=new Ey(E.height);return R.fromEquirectangularTexture(r,g),e.set(g,R),g.addEventListener("dispose",p),d(R.texture,g.mapping)}else return null}}return g}function u(g){if(g&&g.isTexture){const M=g.mapping,E=M===Zd||M===Kd,R=M===Jr||M===tl;if(E||R){let y=n.get(g);const x=y!==void 0?y.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==x)return a===null&&(a=new lx(r)),y=E?a.fromEquirectangular(g,y):a.fromCubemap(g,y),y.texture.pmremVersion=g.pmremVersion,n.set(g,y),y.texture;if(y!==void 0)return y.texture;{const P=g.image;return E&&P&&P.height>0||R&&P&&m(P)?(a===null&&(a=new lx(r)),y=E?a.fromEquirectangular(g):a.fromCubemap(g),y.texture.pmremVersion=g.pmremVersion,n.set(g,y),g.addEventListener("dispose",v),y.texture):null}}}return g}function d(g,M){return M===Zd?g.mapping=Jr:M===Kd&&(g.mapping=tl),g}function m(g){let M=0;const E=6;for(let R=0;R<E;R++)g[R]!==void 0&&M++;return M===E}function p(g){const M=g.target;M.removeEventListener("dispose",p);const E=e.get(M);E!==void 0&&(e.delete(M),E.dispose())}function v(g){const M=g.target;M.removeEventListener("dispose",v);const E=n.get(M);E!==void 0&&(n.delete(M),E.dispose())}function _(){e=new WeakMap,n=new WeakMap,a!==null&&(a.dispose(),a=null)}return{get:o,dispose:_}}function aA(r){const e={};function n(a){if(e[a]!==void 0)return e[a];const o=r.getExtension(a);return e[a]=o,o}return{has:function(a){return n(a)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(a){const o=n(a);return o===null&&Jo("WebGLRenderer: "+a+" extension not supported."),o}}}function sA(r,e,n,a){const o={},c=new WeakMap;function u(_){const g=_.target;g.index!==null&&e.remove(g.index);for(const E in g.attributes)e.remove(g.attributes[E]);g.removeEventListener("dispose",u),delete o[g.id];const M=c.get(g);M&&(e.remove(M),c.delete(g)),a.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,n.memory.geometries--}function d(_,g){return o[g.id]===!0||(g.addEventListener("dispose",u),o[g.id]=!0,n.memory.geometries++),g}function m(_){const g=_.attributes;for(const M in g)e.update(g[M],r.ARRAY_BUFFER)}function p(_){const g=[],M=_.index,E=_.attributes.position;let R=0;if(E===void 0)return;if(M!==null){const P=M.array;R=M.version;for(let N=0,C=P.length;N<C;N+=3){const I=P[N+0],O=P[N+1],z=P[N+2];g.push(I,O,O,z,z,I)}}else{const P=E.array;R=E.version;for(let N=0,C=P.length/3-1;N<C;N+=3){const I=N+0,O=N+1,z=N+2;g.push(I,O,O,z,z,I)}}const y=new(E.count>=65535?gy:my)(g,1);y.version=R;const x=c.get(_);x&&e.remove(x),c.set(_,y)}function v(_){const g=c.get(_);if(g){const M=_.index;M!==null&&g.version<M.version&&p(_)}else p(_);return c.get(_)}return{get:d,update:m,getWireframeAttribute:v}}function rA(r,e,n){let a;function o(_){a=_}let c,u;function d(_){c=_.type,u=_.bytesPerElement}function m(_,g){r.drawElements(a,g,c,_*u),n.update(g,a,1)}function p(_,g,M){M!==0&&(r.drawElementsInstanced(a,g,c,_*u,M),n.update(g,a,M))}function v(_,g,M){if(M===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,g,0,c,_,0,M);let R=0;for(let y=0;y<M;y++)R+=g[y];n.update(R,a,1)}this.setMode=o,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=v}function oA(r){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,u,d){switch(n.calls++,u){case r.TRIANGLES:n.triangles+=d*(c/3);break;case r.LINES:n.lines+=d*(c/2);break;case r.LINE_STRIP:n.lines+=d*(c-1);break;case r.LINE_LOOP:n.lines+=d*c;break;case r.POINTS:n.points+=d*c;break;default:nn("WebGLInfo: Unknown draw mode:",u);break}}function o(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:o,update:a}}function lA(r,e,n){const a=new WeakMap,o=new Vn;function c(u,d,m){const p=u.morphTargetInfluences,v=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=v!==void 0?v.length:0;let g=a.get(d);if(g===void 0||g.count!==_){let B=function(){z.dispose(),a.delete(d),d.removeEventListener("dispose",B)};g!==void 0&&g.texture.dispose();const M=d.morphAttributes.position!==void 0,E=d.morphAttributes.normal!==void 0,R=d.morphAttributes.color!==void 0,y=d.morphAttributes.position||[],x=d.morphAttributes.normal||[],P=d.morphAttributes.color||[];let N=0;M===!0&&(N=1),E===!0&&(N=2),R===!0&&(N=3);let C=d.attributes.position.count*N,I=1;C>e.maxTextureSize&&(I=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const O=new Float32Array(C*I*4*_),z=new hy(O,C,I,_);z.type=Hi,z.needsUpdate=!0;const T=N*4;for(let K=0;K<_;K++){const G=y[K],Y=x[K],de=P[K],Se=C*I*4*K;for(let ae=0;ae<G.count;ae++){const H=ae*T;M===!0&&(o.fromBufferAttribute(G,ae),O[Se+H+0]=o.x,O[Se+H+1]=o.y,O[Se+H+2]=o.z,O[Se+H+3]=0),E===!0&&(o.fromBufferAttribute(Y,ae),O[Se+H+4]=o.x,O[Se+H+5]=o.y,O[Se+H+6]=o.z,O[Se+H+7]=0),R===!0&&(o.fromBufferAttribute(de,ae),O[Se+H+8]=o.x,O[Se+H+9]=o.y,O[Se+H+10]=o.z,O[Se+H+11]=de.itemSize===4?o.w:1)}}g={count:_,texture:z,size:new Dt(C,I)},a.set(d,g),d.addEventListener("dispose",B)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",u.morphTexture,n);else{let M=0;for(let R=0;R<p.length;R++)M+=p[R];const E=d.morphTargetsRelative?1:1-M;m.getUniforms().setValue(r,"morphTargetBaseInfluence",E),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",g.texture,n),m.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function cA(r,e,n,a,o){let c=new WeakMap;function u(p){const v=o.render.frame,_=p.geometry,g=e.get(p,_);if(c.get(g)!==v&&(e.update(g),c.set(g,v)),p.isInstancedMesh&&(p.hasEventListener("dispose",m)===!1&&p.addEventListener("dispose",m),c.get(p)!==v&&(n.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&n.update(p.instanceColor,r.ARRAY_BUFFER),c.set(p,v))),p.isSkinnedMesh){const M=p.skeleton;c.get(M)!==v&&(M.update(),c.set(M,v))}return g}function d(){c=new WeakMap}function m(p){const v=p.target;v.removeEventListener("dispose",m),a.releaseStatesOfObject(v),n.remove(v.instanceMatrix),v.instanceColor!==null&&n.remove(v.instanceColor)}return{update:u,dispose:d}}const uA={[Kx]:"LINEAR_TONE_MAPPING",[Qx]:"REINHARD_TONE_MAPPING",[Jx]:"CINEON_TONE_MAPPING",[$x]:"ACES_FILMIC_TONE_MAPPING",[ty]:"AGX_TONE_MAPPING",[ny]:"NEUTRAL_TONE_MAPPING",[ey]:"CUSTOM_TONE_MAPPING"};function fA(r,e,n,a,o,c){const u=new mi(e,n,{type:r,depthBuffer:o,stencilBuffer:c,samples:a?4:0,depthTexture:o?new nl(e,n):void 0}),d=new mi(e,n,{type:bi,depthBuffer:!1,stencilBuffer:!1}),m=new ni;m.setAttribute("position",new $i([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new $i([0,2,0,0,2,0],2));const p=new i1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),v=new La(m,p),_=new Yf(-1,1,1,-1,0,1);let g=null,M=null,E=!1,R,y=null,x=[],P=!1;this.setSize=function(N,C){u.setSize(N,C),d.setSize(N,C);for(let I=0;I<x.length;I++){const O=x[I];O.setSize&&O.setSize(N,C)}},this.setEffects=function(N){x=N,P=x.length>0&&x[0].isRenderPass===!0;const C=u.width,I=u.height;for(let O=0;O<x.length;O++){const z=x[O];z.setSize&&z.setSize(C,I)}},this.begin=function(N,C){if(E||N.toneMapping===Za&&x.length===0)return!1;if(y=C,C!==null){const I=C.width,O=C.height;(u.width!==I||u.height!==O)&&this.setSize(I,O)}return P===!1&&N.setRenderTarget(u),R=N.toneMapping,N.toneMapping=Za,!0},this.hasRenderPass=function(){return P},this.end=function(N,C){N.toneMapping=R,E=!0;let I=u,O=d;for(let z=0;z<x.length;z++){const T=x[z];if(T.enabled!==!1&&(T.render(N,O,I,C),T.needsSwap!==!1)){const B=I;I=O,O=B}}if(g!==N.outputColorSpace||M!==N.toneMapping){g=N.outputColorSpace,M=N.toneMapping,p.defines={},Zt.getTransfer(g)===mn&&(p.defines.SRGB_TRANSFER="");const z=uA[M];z&&(p.defines[z]=""),p.needsUpdate=!0}p.uniforms.tDiffuse.value=I.texture,N.setRenderTarget(y),N.render(v,_),y=null,E=!1},this.isCompositing=function(){return E},this.dispose=function(){u.depthTexture&&u.depthTexture.dispose(),u.dispose(),d.dispose(),m.dispose(),p.dispose()}}const Ty=new Li,wm=new nl(1,1),Ay=new hy,wy=new Ub,Ry=new _y,hx=[],dx=[],px=new Float32Array(16),mx=new Float32Array(9),gx=new Float32Array(4);function cl(r,e,n){const a=r[0];if(a<=0||a>0)return r;const o=e*n;let c=hx[o];if(c===void 0&&(c=new Float32Array(o),hx[o]=c),e!==0){a.toArray(c,0);for(let u=1,d=0;u!==e;++u)d+=n,r[u].toArray(c,d)}return c}function ii(r,e){if(r.length!==e.length)return!1;for(let n=0,a=r.length;n<a;n++)if(r[n]!==e[n])return!1;return!0}function ai(r,e){for(let n=0,a=e.length;n<a;n++)r[n]=e[n]}function Zf(r,e){let n=dx[e];n===void 0&&(n=new Int32Array(e),dx[e]=n);for(let a=0;a!==e;++a)n[a]=r.allocateTextureUnit();return n}function hA(r,e){const n=this.cache;n[0]!==e&&(r.uniform1f(this.addr,e),n[0]=e)}function dA(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(ii(n,e))return;r.uniform2fv(this.addr,e),ai(n,e)}}function pA(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(ii(n,e))return;r.uniform3fv(this.addr,e),ai(n,e)}}function mA(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(ii(n,e))return;r.uniform4fv(this.addr,e),ai(n,e)}}function gA(r,e){const n=this.cache,a=e.elements;if(a===void 0){if(ii(n,e))return;r.uniformMatrix2fv(this.addr,!1,e),ai(n,e)}else{if(ii(n,a))return;gx.set(a),r.uniformMatrix2fv(this.addr,!1,gx),ai(n,a)}}function vA(r,e){const n=this.cache,a=e.elements;if(a===void 0){if(ii(n,e))return;r.uniformMatrix3fv(this.addr,!1,e),ai(n,e)}else{if(ii(n,a))return;mx.set(a),r.uniformMatrix3fv(this.addr,!1,mx),ai(n,a)}}function _A(r,e){const n=this.cache,a=e.elements;if(a===void 0){if(ii(n,e))return;r.uniformMatrix4fv(this.addr,!1,e),ai(n,e)}else{if(ii(n,a))return;px.set(a),r.uniformMatrix4fv(this.addr,!1,px),ai(n,a)}}function xA(r,e){const n=this.cache;n[0]!==e&&(r.uniform1i(this.addr,e),n[0]=e)}function yA(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(ii(n,e))return;r.uniform2iv(this.addr,e),ai(n,e)}}function SA(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(ii(n,e))return;r.uniform3iv(this.addr,e),ai(n,e)}}function MA(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(ii(n,e))return;r.uniform4iv(this.addr,e),ai(n,e)}}function bA(r,e){const n=this.cache;n[0]!==e&&(r.uniform1ui(this.addr,e),n[0]=e)}function EA(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(ii(n,e))return;r.uniform2uiv(this.addr,e),ai(n,e)}}function TA(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(ii(n,e))return;r.uniform3uiv(this.addr,e),ai(n,e)}}function AA(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(ii(n,e))return;r.uniform4uiv(this.addr,e),ai(n,e)}}function wA(r,e,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o);let c;this.type===r.SAMPLER_2D_SHADOW?(wm.compareFunction=n.isReversedDepthBuffer()?km:Gm,c=wm):c=Ty,n.setTexture2D(e||c,o)}function RA(r,e,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture3D(e||wy,o)}function CA(r,e,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTextureCube(e||Ry,o)}function DA(r,e,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture2DArray(e||Ay,o)}function NA(r){switch(r){case 5126:return hA;case 35664:return dA;case 35665:return pA;case 35666:return mA;case 35674:return gA;case 35675:return vA;case 35676:return _A;case 5124:case 35670:return xA;case 35667:case 35671:return yA;case 35668:case 35672:return SA;case 35669:case 35673:return MA;case 5125:return bA;case 36294:return EA;case 36295:return TA;case 36296:return AA;case 35678:case 36198:case 36298:case 36306:case 35682:return wA;case 35679:case 36299:case 36307:return RA;case 35680:case 36300:case 36308:case 36293:return CA;case 36289:case 36303:case 36311:case 36292:return DA}}function LA(r,e){r.uniform1fv(this.addr,e)}function UA(r,e){const n=cl(e,this.size,2);r.uniform2fv(this.addr,n)}function OA(r,e){const n=cl(e,this.size,3);r.uniform3fv(this.addr,n)}function PA(r,e){const n=cl(e,this.size,4);r.uniform4fv(this.addr,n)}function FA(r,e){const n=cl(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function BA(r,e){const n=cl(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function zA(r,e){const n=cl(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function IA(r,e){r.uniform1iv(this.addr,e)}function HA(r,e){r.uniform2iv(this.addr,e)}function GA(r,e){r.uniform3iv(this.addr,e)}function kA(r,e){r.uniform4iv(this.addr,e)}function VA(r,e){r.uniform1uiv(this.addr,e)}function XA(r,e){r.uniform2uiv(this.addr,e)}function qA(r,e){r.uniform3uiv(this.addr,e)}function WA(r,e){r.uniform4uiv(this.addr,e)}function YA(r,e,n){const a=this.cache,o=e.length,c=Zf(n,o);ii(a,c)||(r.uniform1iv(this.addr,c),ai(a,c));let u;this.type===r.SAMPLER_2D_SHADOW?u=wm:u=Ty;for(let d=0;d!==o;++d)n.setTexture2D(e[d]||u,c[d])}function jA(r,e,n){const a=this.cache,o=e.length,c=Zf(n,o);ii(a,c)||(r.uniform1iv(this.addr,c),ai(a,c));for(let u=0;u!==o;++u)n.setTexture3D(e[u]||wy,c[u])}function ZA(r,e,n){const a=this.cache,o=e.length,c=Zf(n,o);ii(a,c)||(r.uniform1iv(this.addr,c),ai(a,c));for(let u=0;u!==o;++u)n.setTextureCube(e[u]||Ry,c[u])}function KA(r,e,n){const a=this.cache,o=e.length,c=Zf(n,o);ii(a,c)||(r.uniform1iv(this.addr,c),ai(a,c));for(let u=0;u!==o;++u)n.setTexture2DArray(e[u]||Ay,c[u])}function QA(r){switch(r){case 5126:return LA;case 35664:return UA;case 35665:return OA;case 35666:return PA;case 35674:return FA;case 35675:return BA;case 35676:return zA;case 5124:case 35670:return IA;case 35667:case 35671:return HA;case 35668:case 35672:return GA;case 35669:case 35673:return kA;case 5125:return VA;case 36294:return XA;case 36295:return qA;case 36296:return WA;case 35678:case 36198:case 36298:case 36306:case 35682:return YA;case 35679:case 36299:case 36307:return jA;case 35680:case 36300:case 36308:case 36293:return ZA;case 36289:case 36303:case 36311:case 36292:return KA}}class JA{constructor(e,n,a){this.id=e,this.addr=a,this.cache=[],this.type=n.type,this.setValue=NA(n.type)}}class $A{constructor(e,n,a){this.id=e,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=QA(n.type)}}class ew{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,a){const o=this.seq;for(let c=0,u=o.length;c!==u;++c){const d=o[c];d.setValue(e,n[d.id],a)}}}const wp=/(\w+)(\])?(\[|\.)?/g;function vx(r,e){r.seq.push(e),r.map[e.id]=e}function tw(r,e,n){const a=r.name,o=a.length;for(wp.lastIndex=0;;){const c=wp.exec(a),u=wp.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&u+2===o){vx(n,p===void 0?new JA(d,r,e):new $A(d,r,e));break}else{let _=n.map[d];_===void 0&&(_=new ew(d),vx(n,_)),n=_}}}class Cf{constructor(e,n){this.seq=[],this.map={};const a=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let u=0;u<a;++u){const d=e.getActiveUniform(n,u),m=e.getUniformLocation(n,d.name);tw(d,m,this)}const o=[],c=[];for(const u of this.seq)u.type===e.SAMPLER_2D_SHADOW||u.type===e.SAMPLER_CUBE_SHADOW||u.type===e.SAMPLER_2D_ARRAY_SHADOW?o.push(u):c.push(u);o.length>0&&(this.seq=o.concat(c))}setValue(e,n,a,o){const c=this.map[n];c!==void 0&&c.setValue(e,a,o)}setOptional(e,n,a){const o=n[a];o!==void 0&&this.setValue(e,a,o)}static upload(e,n,a,o){for(let c=0,u=n.length;c!==u;++c){const d=n[c],m=a[d.id];m.needsUpdate!==!1&&d.setValue(e,m.value,o)}}static seqWithValue(e,n){const a=[];for(let o=0,c=e.length;o!==c;++o){const u=e[o];u.id in n&&a.push(u)}return a}}function _x(r,e,n){const a=r.createShader(e);return r.shaderSource(a,n),r.compileShader(a),a}const nw=37297;let iw=0;function aw(r,e){const n=r.split(`
`),a=[],o=Math.max(e-6,0),c=Math.min(e+6,n.length);for(let u=o;u<c;u++){const d=u+1;a.push(`${d===e?">":" "} ${d}: ${n[u]}`)}return a.join(`
`)}const xx=new Ct;function sw(r){Zt._getMatrix(xx,Zt.workingColorSpace,r);const e=`mat3( ${xx.elements.map(n=>n.toFixed(4))} )`;switch(Zt.getTransfer(r)){case Uf:return[e,"LinearTransferOETF"];case mn:return[e,"sRGBTransferOETF"];default:return Mt("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function yx(r,e,n){const a=r.getShaderParameter(e,r.COMPILE_STATUS),c=(r.getShaderInfoLog(e)||"").trim();if(a&&c==="")return"";const u=/ERROR: 0:(\d+)/.exec(c);if(u){const d=parseInt(u[1]);return n.toUpperCase()+`

`+c+`

`+aw(r.getShaderSource(e),d)}else return c}function rw(r,e){const n=sw(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const ow={[Kx]:"Linear",[Qx]:"Reinhard",[Jx]:"Cineon",[$x]:"ACESFilmic",[ty]:"AgX",[ny]:"Neutral",[ey]:"Custom"};function lw(r,e){const n=ow[e];return n===void 0?(Mt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const uf=new ee;function cw(){Zt.getLuminanceCoefficients(uf);const r=uf.x.toFixed(4),e=uf.y.toFixed(4),n=uf.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function uw(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gc).join(`
`)}function fw(r){const e=[];for(const n in r){const a=r[n];a!==!1&&e.push("#define "+n+" "+a)}return e.join(`
`)}function hw(r,e){const n={},a=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let o=0;o<a;o++){const c=r.getActiveAttrib(e,o),u=c.name;let d=1;c.type===r.FLOAT_MAT2&&(d=2),c.type===r.FLOAT_MAT3&&(d=3),c.type===r.FLOAT_MAT4&&(d=4),n[u]={type:c.type,location:r.getAttribLocation(e,u),locationSize:d}}return n}function gc(r){return r!==""}function Sx(r,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Mx(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const dw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Rm(r){return r.replace(dw,mw)}const pw=new Map;function mw(r,e){let n=Ft[e];if(n===void 0){const a=pw.get(e);if(a!==void 0)n=Ft[a],Mt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,a);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Rm(n)}const gw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bx(r){return r.replace(gw,vw)}function vw(r,e,n,a){let o="";for(let c=parseInt(e);c<parseInt(n);c++)o+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return o}function Ex(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}const _w={[Ef]:"SHADOWMAP_TYPE_PCF",[pc]:"SHADOWMAP_TYPE_VSM"};function xw(r){return _w[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const yw={[Jr]:"ENVMAP_TYPE_CUBE",[tl]:"ENVMAP_TYPE_CUBE",[Xf]:"ENVMAP_TYPE_CUBE_UV"};function Sw(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":yw[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const Mw={[tl]:"ENVMAP_MODE_REFRACTION"};function bw(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":Mw[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Ew={[Zx]:"ENVMAP_BLENDING_MULTIPLY",[hb]:"ENVMAP_BLENDING_MIX",[db]:"ENVMAP_BLENDING_ADD"};function Tw(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":Ew[r.combine]||"ENVMAP_BLENDING_NONE"}function Aw(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,a=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function ww(r,e,n,a){const o=r.getContext(),c=n.defines;let u=n.vertexShader,d=n.fragmentShader;const m=xw(n),p=Sw(n),v=bw(n),_=Tw(n),g=Aw(n),M=uw(n),E=fw(c),R=o.createProgram();let y,x,P=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(y=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(gc).join(`
`),y.length>0&&(y+=`
`),x=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(gc).join(`
`),x.length>0&&(x+=`
`)):(y=[Ex(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+v:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gc).join(`
`),x=[Ex(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.envMap?"#define "+v:"",n.envMap?"#define "+_:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Za?"#define TONE_MAPPING":"",n.toneMapping!==Za?Ft.tonemapping_pars_fragment:"",n.toneMapping!==Za?lw("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,rw("linearToOutputTexel",n.outputColorSpace),cw(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(gc).join(`
`)),u=Rm(u),u=Sx(u,n),u=Mx(u,n),d=Rm(d),d=Sx(d,n),d=Mx(d,n),u=bx(u),d=bx(d),n.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,y=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,x=["#define varying in",n.glslVersion===C_?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===C_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const N=P+y+u,C=P+x+d,I=_x(o,o.VERTEX_SHADER,N),O=_x(o,o.FRAGMENT_SHADER,C);o.attachShader(R,I),o.attachShader(R,O),n.index0AttributeName!==void 0?o.bindAttribLocation(R,0,n.index0AttributeName):n.hasPositionAttribute===!0&&o.bindAttribLocation(R,0,"position"),o.linkProgram(R);function z(G){if(r.debug.checkShaderErrors){const Y=o.getProgramInfoLog(R)||"",de=o.getShaderInfoLog(I)||"",Se=o.getShaderInfoLog(O)||"",ae=Y.trim(),H=de.trim(),k=Se.trim();let ne=!0,ve=!0;if(o.getProgramParameter(R,o.LINK_STATUS)===!1)if(ne=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(o,R,I,O);else{const Re=yx(o,I,"vertex"),F=yx(o,O,"fragment");nn("WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(R,o.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+ae+`
`+Re+`
`+F)}else ae!==""?Mt("WebGLProgram: Program Info Log:",ae):(H===""||k==="")&&(ve=!1);ve&&(G.diagnostics={runnable:ne,programLog:ae,vertexShader:{log:H,prefix:y},fragmentShader:{log:k,prefix:x}})}o.deleteShader(I),o.deleteShader(O),T=new Cf(o,R),B=hw(o,R)}let T;this.getUniforms=function(){return T===void 0&&z(this),T};let B;this.getAttributes=function(){return B===void 0&&z(this),B};let K=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return K===!1&&(K=o.getProgramParameter(R,nw)),K},this.destroy=function(){a.releaseStatesOfProgram(this),o.deleteProgram(R),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=iw++,this.cacheKey=e,this.usedTimes=1,this.program=R,this.vertexShader=I,this.fragmentShader=O,this}let Rw=0;class Cw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,a){const o=this._getShaderCacheForMaterial(e);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let a=n.get(e);return a===void 0&&(a=new Set,n.set(e,a)),a}_getShaderStage(e){const n=this.shaderCache;let a=n.get(e);return a===void 0&&(a=new Dw(e),n.set(e,a)),a}}class Dw{constructor(e){this.id=Rw++,this.code=e,this.usedTimes=0}}function Nw(r){return r===$r||r===Nf||r===Lf}function Lw(r,e,n,a,o,c){const u=new Xm,d=new Cw,m=new Set,p=[],v=new Map,_=a.logarithmicDepthBuffer;let g=a.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(T){return m.add(T),T===0?"uv":`uv${T}`}function R(T,B,K,G,Y,de){const Se=G.fog,ae=Y.geometry,H=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?G.environment:null,k=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,ne=e.get(T.envMap||H,k),ve=ne&&ne.mapping===Xf?ne.image.height:null,Re=M[T.type];T.precision!==null&&(g=a.getMaxPrecision(T.precision),g!==T.precision&&Mt("WebGLProgram.getParameters:",T.precision,"not supported, using",g,"instead."));const F=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,Q=F!==void 0?F.length:0;let Ne=0;ae.morphAttributes.position!==void 0&&(Ne=1),ae.morphAttributes.normal!==void 0&&(Ne=2),ae.morphAttributes.color!==void 0&&(Ne=3);let ze,Ze,re,Me;if(Re){const tt=Ya[Re];ze=tt.vertexShader,Ze=tt.fragmentShader}else{ze=T.vertexShader,Ze=T.fragmentShader;const tt=d.getVertexShaderStage(T),En=d.getFragmentShaderStage(T);d.update(T,tt,En),re=tt.id,Me=En.id}const De=r.getRenderTarget(),nt=r.state.buffers.depth.getReversed(),vt=Y.isInstancedMesh===!0,Ke=Y.isBatchedMesh===!0,yn=!!T.map,Ut=!!T.matcap,It=!!ne,Bt=!!T.aoMap,zt=!!T.lightMap,Rn=!!T.bumpMap&&T.wireframe===!1,Un=!!T.normalMap,bn=!!T.displacementMap,Cn=!!T.emissiveMap,fn=!!T.metalnessMap,Sn=!!T.roughnessMap,j=T.anisotropy>0,Ht=T.clearcoat>0,Gt=T.dispersion>0,U=T.iridescence>0,b=T.sheen>0,te=T.transmission>0,he=j&&!!T.anisotropyMap,_e=Ht&&!!T.clearcoatMap,Pe=Ht&&!!T.clearcoatNormalMap,We=Ht&&!!T.clearcoatRoughnessMap,xe=U&&!!T.iridescenceMap,ye=U&&!!T.iridescenceThicknessMap,Fe=b&&!!T.sheenColorMap,et=b&&!!T.sheenRoughnessMap,Ye=!!T.specularMap,Ie=!!T.specularColorMap,lt=!!T.specularIntensityMap,ct=te&&!!T.transmissionMap,He=te&&!!T.thicknessMap,q=!!T.gradientMap,Be=!!T.alphaMap,be=T.alphaTest>0,Xe=!!T.alphaHash,Qe=!!T.extensions;let Ae=Za;T.toneMapped&&(De===null||De.isXRRenderTarget===!0)&&(Ae=r.toneMapping);const rt={shaderID:Re,shaderType:T.type,shaderName:T.name,vertexShader:ze,fragmentShader:Ze,defines:T.defines,customVertexShaderID:re,customFragmentShaderID:Me,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:g,batching:Ke,batchingColor:Ke&&Y._colorsTexture!==null,instancing:vt,instancingColor:vt&&Y.instanceColor!==null,instancingMorph:vt&&Y.morphTexture!==null,outputColorSpace:De===null?r.outputColorSpace:De.isXRRenderTarget===!0?De.texture.colorSpace:Zt.workingColorSpace,alphaToCoverage:!!T.alphaToCoverage,map:yn,matcap:Ut,envMap:It,envMapMode:It&&ne.mapping,envMapCubeUVHeight:ve,aoMap:Bt,lightMap:zt,bumpMap:Rn,normalMap:Un,displacementMap:bn,emissiveMap:Cn,normalMapObjectSpace:Un&&T.normalMapType===gb,normalMapTangentSpace:Un&&T.normalMapType===A_,packedNormalMap:Un&&T.normalMapType===A_&&Nw(T.normalMap.format),metalnessMap:fn,roughnessMap:Sn,anisotropy:j,anisotropyMap:he,clearcoat:Ht,clearcoatMap:_e,clearcoatNormalMap:Pe,clearcoatRoughnessMap:We,dispersion:Gt,iridescence:U,iridescenceMap:xe,iridescenceThicknessMap:ye,sheen:b,sheenColorMap:Fe,sheenRoughnessMap:et,specularMap:Ye,specularColorMap:Ie,specularIntensityMap:lt,transmission:te,transmissionMap:ct,thicknessMap:He,gradientMap:q,opaque:T.transparent===!1&&T.blending===Qo&&T.alphaToCoverage===!1,alphaMap:Be,alphaTest:be,alphaHash:Xe,combine:T.combine,mapUv:yn&&E(T.map.channel),aoMapUv:Bt&&E(T.aoMap.channel),lightMapUv:zt&&E(T.lightMap.channel),bumpMapUv:Rn&&E(T.bumpMap.channel),normalMapUv:Un&&E(T.normalMap.channel),displacementMapUv:bn&&E(T.displacementMap.channel),emissiveMapUv:Cn&&E(T.emissiveMap.channel),metalnessMapUv:fn&&E(T.metalnessMap.channel),roughnessMapUv:Sn&&E(T.roughnessMap.channel),anisotropyMapUv:he&&E(T.anisotropyMap.channel),clearcoatMapUv:_e&&E(T.clearcoatMap.channel),clearcoatNormalMapUv:Pe&&E(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:We&&E(T.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&E(T.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&E(T.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&E(T.sheenColorMap.channel),sheenRoughnessMapUv:et&&E(T.sheenRoughnessMap.channel),specularMapUv:Ye&&E(T.specularMap.channel),specularColorMapUv:Ie&&E(T.specularColorMap.channel),specularIntensityMapUv:lt&&E(T.specularIntensityMap.channel),transmissionMapUv:ct&&E(T.transmissionMap.channel),thicknessMapUv:He&&E(T.thicknessMap.channel),alphaMapUv:Be&&E(T.alphaMap.channel),vertexTangents:!!ae.attributes.tangent&&(Un||j),vertexNormals:!!ae.attributes.normal,vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!ae.attributes.uv&&(yn||Be),fog:!!Se,useFog:T.fog===!0,fogExp2:!!Se&&Se.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||ae.attributes.normal===void 0&&Un===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:nt,skinning:Y.isSkinnedMesh===!0,hasPositionAttribute:ae.attributes.position!==void 0,morphTargets:ae.morphAttributes.position!==void 0,morphNormals:ae.morphAttributes.normal!==void 0,morphColors:ae.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:Ne,numDirLights:B.directional.length,numPointLights:B.point.length,numSpotLights:B.spot.length,numSpotLightMaps:B.spotLightMap.length,numRectAreaLights:B.rectArea.length,numHemiLights:B.hemi.length,numDirLightShadows:B.directionalShadowMap.length,numPointLightShadows:B.pointShadowMap.length,numSpotLightShadows:B.spotShadowMap.length,numSpotLightShadowsWithMaps:B.numSpotLightShadowsWithMaps,numLightProbes:B.numLightProbes,numLightProbeGrids:de.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:T.dithering,shadowMapEnabled:r.shadowMap.enabled&&K.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ae,decodeVideoTexture:yn&&T.map.isVideoTexture===!0&&Zt.getTransfer(T.map.colorSpace)===mn,decodeVideoTextureEmissive:Cn&&T.emissiveMap.isVideoTexture===!0&&Zt.getTransfer(T.emissiveMap.colorSpace)===mn,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===ws,flipSided:T.side===Gi,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Qe&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Qe&&T.extensions.multiDraw===!0||Ke)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return rt.vertexUv1s=m.has(1),rt.vertexUv2s=m.has(2),rt.vertexUv3s=m.has(3),m.clear(),rt}function y(T){const B=[];if(T.shaderID?B.push(T.shaderID):(B.push(T.customVertexShaderID),B.push(T.customFragmentShaderID)),T.defines!==void 0)for(const K in T.defines)B.push(K),B.push(T.defines[K]);return T.isRawShaderMaterial===!1&&(x(B,T),P(B,T),B.push(r.outputColorSpace)),B.push(T.customProgramCacheKey),B.join()}function x(T,B){T.push(B.precision),T.push(B.outputColorSpace),T.push(B.envMapMode),T.push(B.envMapCubeUVHeight),T.push(B.mapUv),T.push(B.alphaMapUv),T.push(B.lightMapUv),T.push(B.aoMapUv),T.push(B.bumpMapUv),T.push(B.normalMapUv),T.push(B.displacementMapUv),T.push(B.emissiveMapUv),T.push(B.metalnessMapUv),T.push(B.roughnessMapUv),T.push(B.anisotropyMapUv),T.push(B.clearcoatMapUv),T.push(B.clearcoatNormalMapUv),T.push(B.clearcoatRoughnessMapUv),T.push(B.iridescenceMapUv),T.push(B.iridescenceThicknessMapUv),T.push(B.sheenColorMapUv),T.push(B.sheenRoughnessMapUv),T.push(B.specularMapUv),T.push(B.specularColorMapUv),T.push(B.specularIntensityMapUv),T.push(B.transmissionMapUv),T.push(B.thicknessMapUv),T.push(B.combine),T.push(B.fogExp2),T.push(B.sizeAttenuation),T.push(B.morphTargetsCount),T.push(B.morphAttributeCount),T.push(B.numDirLights),T.push(B.numPointLights),T.push(B.numSpotLights),T.push(B.numSpotLightMaps),T.push(B.numHemiLights),T.push(B.numRectAreaLights),T.push(B.numDirLightShadows),T.push(B.numPointLightShadows),T.push(B.numSpotLightShadows),T.push(B.numSpotLightShadowsWithMaps),T.push(B.numLightProbes),T.push(B.shadowMapType),T.push(B.toneMapping),T.push(B.numClippingPlanes),T.push(B.numClipIntersection),T.push(B.depthPacking)}function P(T,B){u.disableAll(),B.instancing&&u.enable(0),B.instancingColor&&u.enable(1),B.instancingMorph&&u.enable(2),B.matcap&&u.enable(3),B.envMap&&u.enable(4),B.normalMapObjectSpace&&u.enable(5),B.normalMapTangentSpace&&u.enable(6),B.clearcoat&&u.enable(7),B.iridescence&&u.enable(8),B.alphaTest&&u.enable(9),B.vertexColors&&u.enable(10),B.vertexAlphas&&u.enable(11),B.vertexUv1s&&u.enable(12),B.vertexUv2s&&u.enable(13),B.vertexUv3s&&u.enable(14),B.vertexTangents&&u.enable(15),B.anisotropy&&u.enable(16),B.alphaHash&&u.enable(17),B.batching&&u.enable(18),B.dispersion&&u.enable(19),B.batchingColor&&u.enable(20),B.gradientMap&&u.enable(21),B.packedNormalMap&&u.enable(22),B.vertexNormals&&u.enable(23),T.push(u.mask),u.disableAll(),B.fog&&u.enable(0),B.useFog&&u.enable(1),B.flatShading&&u.enable(2),B.logarithmicDepthBuffer&&u.enable(3),B.reversedDepthBuffer&&u.enable(4),B.skinning&&u.enable(5),B.morphTargets&&u.enable(6),B.morphNormals&&u.enable(7),B.morphColors&&u.enable(8),B.premultipliedAlpha&&u.enable(9),B.shadowMapEnabled&&u.enable(10),B.doubleSided&&u.enable(11),B.flipSided&&u.enable(12),B.useDepthPacking&&u.enable(13),B.dithering&&u.enable(14),B.transmission&&u.enable(15),B.sheen&&u.enable(16),B.opaque&&u.enable(17),B.pointsUvs&&u.enable(18),B.decodeVideoTexture&&u.enable(19),B.decodeVideoTextureEmissive&&u.enable(20),B.alphaToCoverage&&u.enable(21),B.numLightProbeGrids>0&&u.enable(22),B.hasPositionAttribute&&u.enable(23),T.push(u.mask)}function N(T){const B=M[T.type];let K;if(B){const G=Ya[B];K=al.clone(G.uniforms)}else K=T.uniforms;return K}function C(T,B){let K=v.get(B);return K!==void 0?++K.usedTimes:(K=new ww(r,B,T,o),p.push(K),v.set(B,K)),K}function I(T){if(--T.usedTimes===0){const B=p.indexOf(T);p[B]=p[p.length-1],p.pop(),v.delete(T.cacheKey),T.destroy()}}function O(T){d.remove(T)}function z(){d.dispose()}return{getParameters:R,getProgramCacheKey:y,getUniforms:N,acquireProgram:C,releaseProgram:I,releaseShaderCache:O,programs:p,dispose:z}}function Uw(){let r=new WeakMap;function e(u){return r.has(u)}function n(u){let d=r.get(u);return d===void 0&&(d={},r.set(u,d)),d}function a(u){r.delete(u)}function o(u,d,m){r.get(u)[d]=m}function c(){r=new WeakMap}return{has:e,get:n,remove:a,update:o,dispose:c}}function Ow(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function Tx(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Ax(){const r=[];let e=0;const n=[],a=[],o=[];function c(){e=0,n.length=0,a.length=0,o.length=0}function u(g){let M=0;return g.isInstancedMesh&&(M+=2),g.isSkinnedMesh&&(M+=1),M}function d(g,M,E,R,y,x){let P=r[e];return P===void 0?(P={id:g.id,object:g,geometry:M,material:E,materialVariant:u(g),groupOrder:R,renderOrder:g.renderOrder,z:y,group:x},r[e]=P):(P.id=g.id,P.object=g,P.geometry=M,P.material=E,P.materialVariant=u(g),P.groupOrder=R,P.renderOrder=g.renderOrder,P.z=y,P.group=x),e++,P}function m(g,M,E,R,y,x){const P=d(g,M,E,R,y,x);E.transmission>0?a.push(P):E.transparent===!0?o.push(P):n.push(P)}function p(g,M,E,R,y,x){const P=d(g,M,E,R,y,x);E.transmission>0?a.unshift(P):E.transparent===!0?o.unshift(P):n.unshift(P)}function v(g,M,E){n.length>1&&n.sort(g||Ow),a.length>1&&a.sort(M||Tx),o.length>1&&o.sort(M||Tx),E&&(n.reverse(),a.reverse(),o.reverse())}function _(){for(let g=e,M=r.length;g<M;g++){const E=r[g];if(E.id===null)break;E.id=null,E.object=null,E.geometry=null,E.material=null,E.group=null}}return{opaque:n,transmissive:a,transparent:o,init:c,push:m,unshift:p,finish:_,sort:v}}function Pw(){let r=new WeakMap;function e(a,o){const c=r.get(a);let u;return c===void 0?(u=new Ax,r.set(a,[u])):o>=c.length?(u=new Ax,c.push(u)):u=c[o],u}function n(){r=new WeakMap}return{get:e,dispose:n}}function Fw(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new ee,color:new qt};break;case"SpotLight":n={position:new ee,direction:new ee,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new ee,color:new qt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new ee,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":n={color:new qt,position:new ee,halfWidth:new ee,halfHeight:new ee};break}return r[e.id]=n,n}}}function Bw(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=n,n}}}let zw=0;function Iw(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Hw(r){const e=new Fw,n=Bw(),a={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)a.probe.push(new ee);const o=new ee,c=new zn,u=new zn;function d(p){let v=0,_=0,g=0;for(let B=0;B<9;B++)a.probe[B].set(0,0,0);let M=0,E=0,R=0,y=0,x=0,P=0,N=0,C=0,I=0,O=0,z=0;p.sort(Iw);for(let B=0,K=p.length;B<K;B++){const G=p[B],Y=G.color,de=G.intensity,Se=G.distance;let ae=null;if(G.shadow&&G.shadow.map&&(G.shadow.map.texture.format===$r?ae=G.shadow.map.texture:ae=G.shadow.map.depthTexture||G.shadow.map.texture),G.isAmbientLight)v+=Y.r*de,_+=Y.g*de,g+=Y.b*de;else if(G.isLightProbe){for(let H=0;H<9;H++)a.probe[H].addScaledVector(G.sh.coefficients[H],de);z++}else if(G.isDirectionalLight){const H=e.get(G);if(H.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){const k=G.shadow,ne=n.get(G);ne.shadowIntensity=k.intensity,ne.shadowBias=k.bias,ne.shadowNormalBias=k.normalBias,ne.shadowRadius=k.radius,ne.shadowMapSize=k.mapSize,a.directionalShadow[M]=ne,a.directionalShadowMap[M]=ae,a.directionalShadowMatrix[M]=G.shadow.matrix,P++}a.directional[M]=H,M++}else if(G.isSpotLight){const H=e.get(G);H.position.setFromMatrixPosition(G.matrixWorld),H.color.copy(Y).multiplyScalar(de),H.distance=Se,H.coneCos=Math.cos(G.angle),H.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),H.decay=G.decay,a.spot[R]=H;const k=G.shadow;if(G.map&&(a.spotLightMap[I]=G.map,I++,k.updateMatrices(G),G.castShadow&&O++),a.spotLightMatrix[R]=k.matrix,G.castShadow){const ne=n.get(G);ne.shadowIntensity=k.intensity,ne.shadowBias=k.bias,ne.shadowNormalBias=k.normalBias,ne.shadowRadius=k.radius,ne.shadowMapSize=k.mapSize,a.spotShadow[R]=ne,a.spotShadowMap[R]=ae,C++}R++}else if(G.isRectAreaLight){const H=e.get(G);H.color.copy(Y).multiplyScalar(de),H.halfWidth.set(G.width*.5,0,0),H.halfHeight.set(0,G.height*.5,0),a.rectArea[y]=H,y++}else if(G.isPointLight){const H=e.get(G);if(H.color.copy(G.color).multiplyScalar(G.intensity),H.distance=G.distance,H.decay=G.decay,G.castShadow){const k=G.shadow,ne=n.get(G);ne.shadowIntensity=k.intensity,ne.shadowBias=k.bias,ne.shadowNormalBias=k.normalBias,ne.shadowRadius=k.radius,ne.shadowMapSize=k.mapSize,ne.shadowCameraNear=k.camera.near,ne.shadowCameraFar=k.camera.far,a.pointShadow[E]=ne,a.pointShadowMap[E]=ae,a.pointShadowMatrix[E]=G.shadow.matrix,N++}a.point[E]=H,E++}else if(G.isHemisphereLight){const H=e.get(G);H.skyColor.copy(G.color).multiplyScalar(de),H.groundColor.copy(G.groundColor).multiplyScalar(de),a.hemi[x]=H,x++}}y>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Je.LTC_FLOAT_1,a.rectAreaLTC2=Je.LTC_FLOAT_2):(a.rectAreaLTC1=Je.LTC_HALF_1,a.rectAreaLTC2=Je.LTC_HALF_2)),a.ambient[0]=v,a.ambient[1]=_,a.ambient[2]=g;const T=a.hash;(T.directionalLength!==M||T.pointLength!==E||T.spotLength!==R||T.rectAreaLength!==y||T.hemiLength!==x||T.numDirectionalShadows!==P||T.numPointShadows!==N||T.numSpotShadows!==C||T.numSpotMaps!==I||T.numLightProbes!==z)&&(a.directional.length=M,a.spot.length=R,a.rectArea.length=y,a.point.length=E,a.hemi.length=x,a.directionalShadow.length=P,a.directionalShadowMap.length=P,a.pointShadow.length=N,a.pointShadowMap.length=N,a.spotShadow.length=C,a.spotShadowMap.length=C,a.directionalShadowMatrix.length=P,a.pointShadowMatrix.length=N,a.spotLightMatrix.length=C+I-O,a.spotLightMap.length=I,a.numSpotLightShadowsWithMaps=O,a.numLightProbes=z,T.directionalLength=M,T.pointLength=E,T.spotLength=R,T.rectAreaLength=y,T.hemiLength=x,T.numDirectionalShadows=P,T.numPointShadows=N,T.numSpotShadows=C,T.numSpotMaps=I,T.numLightProbes=z,a.version=zw++)}function m(p,v){let _=0,g=0,M=0,E=0,R=0;const y=v.matrixWorldInverse;for(let x=0,P=p.length;x<P;x++){const N=p[x];if(N.isDirectionalLight){const C=a.directional[_];C.direction.setFromMatrixPosition(N.matrixWorld),o.setFromMatrixPosition(N.target.matrixWorld),C.direction.sub(o),C.direction.transformDirection(y),_++}else if(N.isSpotLight){const C=a.spot[M];C.position.setFromMatrixPosition(N.matrixWorld),C.position.applyMatrix4(y),C.direction.setFromMatrixPosition(N.matrixWorld),o.setFromMatrixPosition(N.target.matrixWorld),C.direction.sub(o),C.direction.transformDirection(y),M++}else if(N.isRectAreaLight){const C=a.rectArea[E];C.position.setFromMatrixPosition(N.matrixWorld),C.position.applyMatrix4(y),u.identity(),c.copy(N.matrixWorld),c.premultiply(y),u.extractRotation(c),C.halfWidth.set(N.width*.5,0,0),C.halfHeight.set(0,N.height*.5,0),C.halfWidth.applyMatrix4(u),C.halfHeight.applyMatrix4(u),E++}else if(N.isPointLight){const C=a.point[g];C.position.setFromMatrixPosition(N.matrixWorld),C.position.applyMatrix4(y),g++}else if(N.isHemisphereLight){const C=a.hemi[R];C.direction.setFromMatrixPosition(N.matrixWorld),C.direction.transformDirection(y),R++}}}return{setup:d,setupView:m,state:a}}function wx(r){const e=new Hw(r),n=[],a=[],o=[];function c(g){_.camera=g,n.length=0,a.length=0,o.length=0}function u(g){n.push(g)}function d(g){a.push(g)}function m(g){o.push(g)}function p(){e.setup(n)}function v(g){e.setupView(n,g)}const _={lightsArray:n,shadowsArray:a,lightProbeGridArray:o,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:_,setupLights:p,setupLightsView:v,pushLight:u,pushShadow:d,pushLightProbeGrid:m}}function Gw(r){let e=new WeakMap;function n(o,c=0){const u=e.get(o);let d;return u===void 0?(d=new wx(r),e.set(o,[d])):c>=u.length?(d=new wx(r),u.push(d)):d=u[c],d}function a(){e=new WeakMap}return{get:n,dispose:a}}const kw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vw=`uniform sampler2D shadow_pass;
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
}`,Xw=[new ee(1,0,0),new ee(-1,0,0),new ee(0,1,0),new ee(0,-1,0),new ee(0,0,1),new ee(0,0,-1)],qw=[new ee(0,-1,0),new ee(0,-1,0),new ee(0,0,1),new ee(0,0,-1),new ee(0,-1,0),new ee(0,-1,0)],Rx=new zn,uc=new ee,Rp=new ee;function Ww(r,e,n){let a=new vy;const o=new Dt,c=new Dt,u=new Vn,d=new a1,m=new s1,p={},v=n.maxTextureSize,_={[br]:Gi,[Gi]:br,[ws]:ws},g=new wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:kw,fragmentShader:Vw}),M=g.clone();M.defines.HORIZONTAL_PASS=1;const E=new ni;E.setAttribute("position",new tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const R=new La(E,g),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ef;let x=this.type;this.render=function(O,z,T){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||O.length===0)return;this.type===YM&&(Mt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ef);const B=r.getRenderTarget(),K=r.getActiveCubeFace(),G=r.getActiveMipmapLevel(),Y=r.state;Y.setBlending(Na),Y.buffers.depth.getReversed()===!0?Y.buffers.color.setClear(0,0,0,0):Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const de=x!==this.type;de&&z.traverse(function(Se){Se.material&&(Array.isArray(Se.material)?Se.material.forEach(ae=>ae.needsUpdate=!0):Se.material.needsUpdate=!0)});for(let Se=0,ae=O.length;Se<ae;Se++){const H=O[Se],k=H.shadow;if(k===void 0){Mt("WebGLShadowMap:",H,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;o.copy(k.mapSize);const ne=k.getFrameExtents();o.multiply(ne),c.copy(k.mapSize),(o.x>v||o.y>v)&&(o.x>v&&(c.x=Math.floor(v/ne.x),o.x=c.x*ne.x,k.mapSize.x=c.x),o.y>v&&(c.y=Math.floor(v/ne.y),o.y=c.y*ne.y,k.mapSize.y=c.y));const ve=r.state.buffers.depth.getReversed();if(k.camera._reversedDepth=ve,k.map===null||de===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===pc){if(H.isPointLight){Mt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new mi(o.x,o.y,{format:$r,type:bi,minFilter:Mi,magFilter:Mi,generateMipmaps:!1}),k.map.texture.name=H.name+".shadowMap",k.map.depthTexture=new nl(o.x,o.y,Hi),k.map.depthTexture.name=H.name+".shadowMapDepth",k.map.depthTexture.format=Ds,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Ln,k.map.depthTexture.magFilter=Ln}else H.isPointLight?(k.map=new Ey(o.x),k.map.depthTexture=new $b(o.x,Ka)):(k.map=new mi(o.x,o.y),k.map.depthTexture=new nl(o.x,o.y,Ka)),k.map.depthTexture.name=H.name+".shadowMap",k.map.depthTexture.format=Ds,this.type===Ef?(k.map.depthTexture.compareFunction=ve?km:Gm,k.map.depthTexture.minFilter=Mi,k.map.depthTexture.magFilter=Mi):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Ln,k.map.depthTexture.magFilter=Ln);k.camera.updateProjectionMatrix()}const Re=k.map.isWebGLCubeRenderTarget?6:1;for(let F=0;F<Re;F++){if(k.map.isWebGLCubeRenderTarget)r.setRenderTarget(k.map,F),r.clear();else{F===0&&(r.setRenderTarget(k.map),r.clear());const Q=k.getViewport(F);u.set(c.x*Q.x,c.y*Q.y,c.x*Q.z,c.y*Q.w),Y.viewport(u)}if(H.isPointLight){const Q=k.camera,Ne=k.matrix,ze=H.distance||Q.far;ze!==Q.far&&(Q.far=ze,Q.updateProjectionMatrix()),uc.setFromMatrixPosition(H.matrixWorld),Q.position.copy(uc),Rp.copy(Q.position),Rp.add(Xw[F]),Q.up.copy(qw[F]),Q.lookAt(Rp),Q.updateMatrixWorld(),Ne.makeTranslation(-uc.x,-uc.y,-uc.z),Rx.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Rx,Q.coordinateSystem,Q.reversedDepth)}else k.updateMatrices(H);a=k.getFrustum(),C(z,T,k.camera,H,this.type)}k.isPointLightShadow!==!0&&this.type===pc&&P(k,T),k.needsUpdate=!1}x=this.type,y.needsUpdate=!1,r.setRenderTarget(B,K,G)};function P(O,z){const T=e.update(R);g.defines.VSM_SAMPLES!==O.blurSamples&&(g.defines.VSM_SAMPLES=O.blurSamples,M.defines.VSM_SAMPLES=O.blurSamples,g.needsUpdate=!0,M.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new mi(o.x,o.y,{format:$r,type:bi})),g.uniforms.shadow_pass.value=O.map.depthTexture,g.uniforms.resolution.value=O.mapSize,g.uniforms.radius.value=O.radius,r.setRenderTarget(O.mapPass),r.clear(),r.renderBufferDirect(z,null,T,g,R,null),M.uniforms.shadow_pass.value=O.mapPass.texture,M.uniforms.resolution.value=O.mapSize,M.uniforms.radius.value=O.radius,r.setRenderTarget(O.map),r.clear(),r.renderBufferDirect(z,null,T,M,R,null)}function N(O,z,T,B){let K=null;const G=T.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(G!==void 0)K=G;else if(K=T.isPointLight===!0?m:d,r.localClippingEnabled&&z.clipShadows===!0&&Array.isArray(z.clippingPlanes)&&z.clippingPlanes.length!==0||z.displacementMap&&z.displacementScale!==0||z.alphaMap&&z.alphaTest>0||z.map&&z.alphaTest>0||z.alphaToCoverage===!0){const Y=K.uuid,de=z.uuid;let Se=p[Y];Se===void 0&&(Se={},p[Y]=Se);let ae=Se[de];ae===void 0&&(ae=K.clone(),Se[de]=ae,z.addEventListener("dispose",I)),K=ae}if(K.visible=z.visible,K.wireframe=z.wireframe,B===pc?K.side=z.shadowSide!==null?z.shadowSide:z.side:K.side=z.shadowSide!==null?z.shadowSide:_[z.side],K.alphaMap=z.alphaMap,K.alphaTest=z.alphaToCoverage===!0?.5:z.alphaTest,K.map=z.map,K.clipShadows=z.clipShadows,K.clippingPlanes=z.clippingPlanes,K.clipIntersection=z.clipIntersection,K.displacementMap=z.displacementMap,K.displacementScale=z.displacementScale,K.displacementBias=z.displacementBias,K.wireframeLinewidth=z.wireframeLinewidth,K.linewidth=z.linewidth,T.isPointLight===!0&&K.isMeshDistanceMaterial===!0){const Y=r.properties.get(K);Y.light=T}return K}function C(O,z,T,B,K){if(O.visible===!1)return;if(O.layers.test(z.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&K===pc)&&(!O.frustumCulled||a.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,O.matrixWorld);const de=e.update(O),Se=O.material;if(Array.isArray(Se)){const ae=de.groups;for(let H=0,k=ae.length;H<k;H++){const ne=ae[H],ve=Se[ne.materialIndex];if(ve&&ve.visible){const Re=N(O,ve,B,K);O.onBeforeShadow(r,O,z,T,de,Re,ne),r.renderBufferDirect(T,null,de,Re,O,ne),O.onAfterShadow(r,O,z,T,de,Re,ne)}}}else if(Se.visible){const ae=N(O,Se,B,K);O.onBeforeShadow(r,O,z,T,de,ae,null),r.renderBufferDirect(T,null,de,ae,O,null),O.onAfterShadow(r,O,z,T,de,ae,null)}}const Y=O.children;for(let de=0,Se=Y.length;de<Se;de++)C(Y[de],z,T,B,K)}function I(O){O.target.removeEventListener("dispose",I);for(const T in p){const B=p[T],K=O.target.uuid;K in B&&(B[K].dispose(),delete B[K])}}}function Yw(r,e){function n(){let q=!1;const Be=new Vn;let be=null;const Xe=new Vn(0,0,0,0);return{setMask:function(Qe){be!==Qe&&!q&&(r.colorMask(Qe,Qe,Qe,Qe),be=Qe)},setLocked:function(Qe){q=Qe},setClear:function(Qe,Ae,rt,tt,En){En===!0&&(Qe*=tt,Ae*=tt,rt*=tt),Be.set(Qe,Ae,rt,tt),Xe.equals(Be)===!1&&(r.clearColor(Qe,Ae,rt,tt),Xe.copy(Be))},reset:function(){q=!1,be=null,Xe.set(-1,0,0,0)}}}function a(){let q=!1,Be=!1,be=null,Xe=null,Qe=null;return{setReversed:function(Ae){if(Be!==Ae){const rt=e.get("EXT_clip_control");Ae?rt.clipControlEXT(rt.LOWER_LEFT_EXT,rt.ZERO_TO_ONE_EXT):rt.clipControlEXT(rt.LOWER_LEFT_EXT,rt.NEGATIVE_ONE_TO_ONE_EXT),Be=Ae;const tt=Qe;Qe=null,this.setClear(tt)}},getReversed:function(){return Be},setTest:function(Ae){Ae?De(r.DEPTH_TEST):nt(r.DEPTH_TEST)},setMask:function(Ae){be!==Ae&&!q&&(r.depthMask(Ae),be=Ae)},setFunc:function(Ae){if(Be&&(Ae=Ab[Ae]),Xe!==Ae){switch(Ae){case Ip:r.depthFunc(r.NEVER);break;case Hp:r.depthFunc(r.ALWAYS);break;case Gp:r.depthFunc(r.LESS);break;case el:r.depthFunc(r.LEQUAL);break;case kp:r.depthFunc(r.EQUAL);break;case Vp:r.depthFunc(r.GEQUAL);break;case Xp:r.depthFunc(r.GREATER);break;case qp:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Xe=Ae}},setLocked:function(Ae){q=Ae},setClear:function(Ae){Qe!==Ae&&(Qe=Ae,Be&&(Ae=1-Ae),r.clearDepth(Ae))},reset:function(){q=!1,be=null,Xe=null,Qe=null,Be=!1}}}function o(){let q=!1,Be=null,be=null,Xe=null,Qe=null,Ae=null,rt=null,tt=null,En=null;return{setTest:function(cn){q||(cn?De(r.STENCIL_TEST):nt(r.STENCIL_TEST))},setMask:function(cn){Be!==cn&&!q&&(r.stencilMask(cn),Be=cn)},setFunc:function(cn,Ei,Ti){(be!==cn||Xe!==Ei||Qe!==Ti)&&(r.stencilFunc(cn,Ei,Ti),be=cn,Xe=Ei,Qe=Ti)},setOp:function(cn,Ei,Ti){(Ae!==cn||rt!==Ei||tt!==Ti)&&(r.stencilOp(cn,Ei,Ti),Ae=cn,rt=Ei,tt=Ti)},setLocked:function(cn){q=cn},setClear:function(cn){En!==cn&&(r.clearStencil(cn),En=cn)},reset:function(){q=!1,Be=null,be=null,Xe=null,Qe=null,Ae=null,rt=null,tt=null,En=null}}}const c=new n,u=new a,d=new o,m=new WeakMap,p=new WeakMap;let v={},_={},g={},M=new WeakMap,E=[],R=null,y=!1,x=null,P=null,N=null,C=null,I=null,O=null,z=null,T=new qt(0,0,0),B=0,K=!1,G=null,Y=null,de=null,Se=null,ae=null;const H=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,ne=0;const ve=r.getParameter(r.VERSION);ve.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(ve)[1]),k=ne>=1):ve.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(ve)[1]),k=ne>=2);let Re=null,F={};const Q=r.getParameter(r.SCISSOR_BOX),Ne=r.getParameter(r.VIEWPORT),ze=new Vn().fromArray(Q),Ze=new Vn().fromArray(Ne);function re(q,Be,be,Xe){const Qe=new Uint8Array(4),Ae=r.createTexture();r.bindTexture(q,Ae),r.texParameteri(q,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(q,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let rt=0;rt<be;rt++)q===r.TEXTURE_3D||q===r.TEXTURE_2D_ARRAY?r.texImage3D(Be,0,r.RGBA,1,1,Xe,0,r.RGBA,r.UNSIGNED_BYTE,Qe):r.texImage2D(Be+rt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Qe);return Ae}const Me={};Me[r.TEXTURE_2D]=re(r.TEXTURE_2D,r.TEXTURE_2D,1),Me[r.TEXTURE_CUBE_MAP]=re(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[r.TEXTURE_2D_ARRAY]=re(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Me[r.TEXTURE_3D]=re(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),u.setClear(1),d.setClear(0),De(r.DEPTH_TEST),u.setFunc(el),Rn(!1),Un(b_),De(r.CULL_FACE),Bt(Na);function De(q){v[q]!==!0&&(r.enable(q),v[q]=!0)}function nt(q){v[q]!==!1&&(r.disable(q),v[q]=!1)}function vt(q,Be){return g[q]!==Be?(r.bindFramebuffer(q,Be),g[q]=Be,q===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=Be),q===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=Be),!0):!1}function Ke(q,Be){let be=E,Xe=!1;if(q){be=M.get(Be),be===void 0&&(be=[],M.set(Be,be));const Qe=q.textures;if(be.length!==Qe.length||be[0]!==r.COLOR_ATTACHMENT0){for(let Ae=0,rt=Qe.length;Ae<rt;Ae++)be[Ae]=r.COLOR_ATTACHMENT0+Ae;be.length=Qe.length,Xe=!0}}else be[0]!==r.BACK&&(be[0]=r.BACK,Xe=!0);Xe&&r.drawBuffers(be)}function yn(q){return R!==q?(r.useProgram(q),R=q,!0):!1}const Ut={[Yr]:r.FUNC_ADD,[ZM]:r.FUNC_SUBTRACT,[KM]:r.FUNC_REVERSE_SUBTRACT};Ut[QM]=r.MIN,Ut[JM]=r.MAX;const It={[$M]:r.ZERO,[eb]:r.ONE,[tb]:r.SRC_COLOR,[Bp]:r.SRC_ALPHA,[ob]:r.SRC_ALPHA_SATURATE,[sb]:r.DST_COLOR,[ib]:r.DST_ALPHA,[nb]:r.ONE_MINUS_SRC_COLOR,[zp]:r.ONE_MINUS_SRC_ALPHA,[rb]:r.ONE_MINUS_DST_COLOR,[ab]:r.ONE_MINUS_DST_ALPHA,[lb]:r.CONSTANT_COLOR,[cb]:r.ONE_MINUS_CONSTANT_COLOR,[ub]:r.CONSTANT_ALPHA,[fb]:r.ONE_MINUS_CONSTANT_ALPHA};function Bt(q,Be,be,Xe,Qe,Ae,rt,tt,En,cn){if(q===Na){y===!0&&(nt(r.BLEND),y=!1);return}if(y===!1&&(De(r.BLEND),y=!0),q!==jM){if(q!==x||cn!==K){if((P!==Yr||I!==Yr)&&(r.blendEquation(r.FUNC_ADD),P=Yr,I=Yr),cn)switch(q){case Qo:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case As:r.blendFunc(r.ONE,r.ONE);break;case E_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case T_:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:nn("WebGLState: Invalid blending: ",q);break}else switch(q){case Qo:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case As:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case E_:nn("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case T_:nn("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:nn("WebGLState: Invalid blending: ",q);break}N=null,C=null,O=null,z=null,T.set(0,0,0),B=0,x=q,K=cn}return}Qe=Qe||Be,Ae=Ae||be,rt=rt||Xe,(Be!==P||Qe!==I)&&(r.blendEquationSeparate(Ut[Be],Ut[Qe]),P=Be,I=Qe),(be!==N||Xe!==C||Ae!==O||rt!==z)&&(r.blendFuncSeparate(It[be],It[Xe],It[Ae],It[rt]),N=be,C=Xe,O=Ae,z=rt),(tt.equals(T)===!1||En!==B)&&(r.blendColor(tt.r,tt.g,tt.b,En),T.copy(tt),B=En),x=q,K=!1}function zt(q,Be){q.side===ws?nt(r.CULL_FACE):De(r.CULL_FACE);let be=q.side===Gi;Be&&(be=!be),Rn(be),q.blending===Qo&&q.transparent===!1?Bt(Na):Bt(q.blending,q.blendEquation,q.blendSrc,q.blendDst,q.blendEquationAlpha,q.blendSrcAlpha,q.blendDstAlpha,q.blendColor,q.blendAlpha,q.premultipliedAlpha),u.setFunc(q.depthFunc),u.setTest(q.depthTest),u.setMask(q.depthWrite),c.setMask(q.colorWrite);const Xe=q.stencilWrite;d.setTest(Xe),Xe&&(d.setMask(q.stencilWriteMask),d.setFunc(q.stencilFunc,q.stencilRef,q.stencilFuncMask),d.setOp(q.stencilFail,q.stencilZFail,q.stencilZPass)),Cn(q.polygonOffset,q.polygonOffsetFactor,q.polygonOffsetUnits),q.alphaToCoverage===!0?De(r.SAMPLE_ALPHA_TO_COVERAGE):nt(r.SAMPLE_ALPHA_TO_COVERAGE)}function Rn(q){G!==q&&(q?r.frontFace(r.CW):r.frontFace(r.CCW),G=q)}function Un(q){q!==qM?(De(r.CULL_FACE),q!==Y&&(q===b_?r.cullFace(r.BACK):q===WM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):nt(r.CULL_FACE),Y=q}function bn(q){q!==de&&(k&&r.lineWidth(q),de=q)}function Cn(q,Be,be){q?(De(r.POLYGON_OFFSET_FILL),(Se!==Be||ae!==be)&&(Se=Be,ae=be,u.getReversed()&&(Be=-Be),r.polygonOffset(Be,be))):nt(r.POLYGON_OFFSET_FILL)}function fn(q){q?De(r.SCISSOR_TEST):nt(r.SCISSOR_TEST)}function Sn(q){q===void 0&&(q=r.TEXTURE0+H-1),Re!==q&&(r.activeTexture(q),Re=q)}function j(q,Be,be){be===void 0&&(Re===null?be=r.TEXTURE0+H-1:be=Re);let Xe=F[be];Xe===void 0&&(Xe={type:void 0,texture:void 0},F[be]=Xe),(Xe.type!==q||Xe.texture!==Be)&&(Re!==be&&(r.activeTexture(be),Re=be),r.bindTexture(q,Be||Me[q]),Xe.type=q,Xe.texture=Be)}function Ht(){const q=F[Re];q!==void 0&&q.type!==void 0&&(r.bindTexture(q.type,null),q.type=void 0,q.texture=void 0)}function Gt(){try{r.compressedTexImage2D(...arguments)}catch(q){nn("WebGLState:",q)}}function U(){try{r.compressedTexImage3D(...arguments)}catch(q){nn("WebGLState:",q)}}function b(){try{r.texSubImage2D(...arguments)}catch(q){nn("WebGLState:",q)}}function te(){try{r.texSubImage3D(...arguments)}catch(q){nn("WebGLState:",q)}}function he(){try{r.compressedTexSubImage2D(...arguments)}catch(q){nn("WebGLState:",q)}}function _e(){try{r.compressedTexSubImage3D(...arguments)}catch(q){nn("WebGLState:",q)}}function Pe(){try{r.texStorage2D(...arguments)}catch(q){nn("WebGLState:",q)}}function We(){try{r.texStorage3D(...arguments)}catch(q){nn("WebGLState:",q)}}function xe(){try{r.texImage2D(...arguments)}catch(q){nn("WebGLState:",q)}}function ye(){try{r.texImage3D(...arguments)}catch(q){nn("WebGLState:",q)}}function Fe(q){return _[q]!==void 0?_[q]:r.getParameter(q)}function et(q,Be){_[q]!==Be&&(r.pixelStorei(q,Be),_[q]=Be)}function Ye(q){ze.equals(q)===!1&&(r.scissor(q.x,q.y,q.z,q.w),ze.copy(q))}function Ie(q){Ze.equals(q)===!1&&(r.viewport(q.x,q.y,q.z,q.w),Ze.copy(q))}function lt(q,Be){let be=p.get(Be);be===void 0&&(be=new WeakMap,p.set(Be,be));let Xe=be.get(q);Xe===void 0&&(Xe=r.getUniformBlockIndex(Be,q.name),be.set(q,Xe))}function ct(q,Be){const Xe=p.get(Be).get(q);m.get(Be)!==Xe&&(r.uniformBlockBinding(Be,Xe,q.__bindingPointIndex),m.set(Be,Xe))}function He(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),u.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),v={},_={},Re=null,F={},g={},M=new WeakMap,E=[],R=null,y=!1,x=null,P=null,N=null,C=null,I=null,O=null,z=null,T=new qt(0,0,0),B=0,K=!1,G=null,Y=null,de=null,Se=null,ae=null,ze.set(0,0,r.canvas.width,r.canvas.height),Ze.set(0,0,r.canvas.width,r.canvas.height),c.reset(),u.reset(),d.reset()}return{buffers:{color:c,depth:u,stencil:d},enable:De,disable:nt,bindFramebuffer:vt,drawBuffers:Ke,useProgram:yn,setBlending:Bt,setMaterial:zt,setFlipSided:Rn,setCullFace:Un,setLineWidth:bn,setPolygonOffset:Cn,setScissorTest:fn,activeTexture:Sn,bindTexture:j,unbindTexture:Ht,compressedTexImage2D:Gt,compressedTexImage3D:U,texImage2D:xe,texImage3D:ye,pixelStorei:et,getParameter:Fe,updateUBOMapping:lt,uniformBlockBinding:ct,texStorage2D:Pe,texStorage3D:We,texSubImage2D:b,texSubImage3D:te,compressedTexSubImage2D:he,compressedTexSubImage3D:_e,scissor:Ye,viewport:Ie,reset:He}}function jw(r,e,n,a,o,c,u){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Dt,v=new WeakMap,_=new Set;let g;const M=new WeakMap;let E=!1;try{E=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function R(U,b){return E?new OffscreenCanvas(U,b):Pf("canvas")}function y(U,b,te){let he=1;const _e=Gt(U);if((_e.width>te||_e.height>te)&&(he=te/Math.max(_e.width,_e.height)),he<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const Pe=Math.floor(he*_e.width),We=Math.floor(he*_e.height);g===void 0&&(g=R(Pe,We));const xe=b?R(Pe,We):g;return xe.width=Pe,xe.height=We,xe.getContext("2d").drawImage(U,0,0,Pe,We),Mt("WebGLRenderer: Texture has been resized from ("+_e.width+"x"+_e.height+") to ("+Pe+"x"+We+")."),xe}else return"data"in U&&Mt("WebGLRenderer: Image in DataTexture is too big ("+_e.width+"x"+_e.height+")."),U;return U}function x(U){return U.generateMipmaps}function P(U){r.generateMipmap(U)}function N(U){return U.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?r.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function C(U,b,te,he,_e,Pe=!1){if(U!==null){if(r[U]!==void 0)return r[U];Mt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let We;he&&(We=e.get("EXT_texture_norm16"),We||Mt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let xe=b;if(b===r.RED&&(te===r.FLOAT&&(xe=r.R32F),te===r.HALF_FLOAT&&(xe=r.R16F),te===r.UNSIGNED_BYTE&&(xe=r.R8),te===r.UNSIGNED_SHORT&&We&&(xe=We.R16_EXT),te===r.SHORT&&We&&(xe=We.R16_SNORM_EXT)),b===r.RED_INTEGER&&(te===r.UNSIGNED_BYTE&&(xe=r.R8UI),te===r.UNSIGNED_SHORT&&(xe=r.R16UI),te===r.UNSIGNED_INT&&(xe=r.R32UI),te===r.BYTE&&(xe=r.R8I),te===r.SHORT&&(xe=r.R16I),te===r.INT&&(xe=r.R32I)),b===r.RG&&(te===r.FLOAT&&(xe=r.RG32F),te===r.HALF_FLOAT&&(xe=r.RG16F),te===r.UNSIGNED_BYTE&&(xe=r.RG8),te===r.UNSIGNED_SHORT&&We&&(xe=We.RG16_EXT),te===r.SHORT&&We&&(xe=We.RG16_SNORM_EXT)),b===r.RG_INTEGER&&(te===r.UNSIGNED_BYTE&&(xe=r.RG8UI),te===r.UNSIGNED_SHORT&&(xe=r.RG16UI),te===r.UNSIGNED_INT&&(xe=r.RG32UI),te===r.BYTE&&(xe=r.RG8I),te===r.SHORT&&(xe=r.RG16I),te===r.INT&&(xe=r.RG32I)),b===r.RGB_INTEGER&&(te===r.UNSIGNED_BYTE&&(xe=r.RGB8UI),te===r.UNSIGNED_SHORT&&(xe=r.RGB16UI),te===r.UNSIGNED_INT&&(xe=r.RGB32UI),te===r.BYTE&&(xe=r.RGB8I),te===r.SHORT&&(xe=r.RGB16I),te===r.INT&&(xe=r.RGB32I)),b===r.RGBA_INTEGER&&(te===r.UNSIGNED_BYTE&&(xe=r.RGBA8UI),te===r.UNSIGNED_SHORT&&(xe=r.RGBA16UI),te===r.UNSIGNED_INT&&(xe=r.RGBA32UI),te===r.BYTE&&(xe=r.RGBA8I),te===r.SHORT&&(xe=r.RGBA16I),te===r.INT&&(xe=r.RGBA32I)),b===r.RGB&&(te===r.UNSIGNED_SHORT&&We&&(xe=We.RGB16_EXT),te===r.SHORT&&We&&(xe=We.RGB16_SNORM_EXT),te===r.UNSIGNED_INT_5_9_9_9_REV&&(xe=r.RGB9_E5),te===r.UNSIGNED_INT_10F_11F_11F_REV&&(xe=r.R11F_G11F_B10F)),b===r.RGBA){const ye=Pe?Uf:Zt.getTransfer(_e);te===r.FLOAT&&(xe=r.RGBA32F),te===r.HALF_FLOAT&&(xe=r.RGBA16F),te===r.UNSIGNED_BYTE&&(xe=ye===mn?r.SRGB8_ALPHA8:r.RGBA8),te===r.UNSIGNED_SHORT&&We&&(xe=We.RGBA16_EXT),te===r.SHORT&&We&&(xe=We.RGBA16_SNORM_EXT),te===r.UNSIGNED_SHORT_4_4_4_4&&(xe=r.RGBA4),te===r.UNSIGNED_SHORT_5_5_5_1&&(xe=r.RGB5_A1)}return(xe===r.R16F||xe===r.R32F||xe===r.RG16F||xe===r.RG32F||xe===r.RGBA16F||xe===r.RGBA32F)&&e.get("EXT_color_buffer_float"),xe}function I(U,b){let te;return U?b===null||b===Ka||b===_c?te=r.DEPTH24_STENCIL8:b===Hi?te=r.DEPTH32F_STENCIL8:b===vc&&(te=r.DEPTH24_STENCIL8,Mt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Ka||b===_c?te=r.DEPTH_COMPONENT24:b===Hi?te=r.DEPTH_COMPONENT32F:b===vc&&(te=r.DEPTH_COMPONENT16),te}function O(U,b){return x(U)===!0||U.isFramebufferTexture&&U.minFilter!==Ln&&U.minFilter!==Mi?Math.log2(Math.max(b.width,b.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?b.mipmaps.length:1}function z(U){const b=U.target;b.removeEventListener("dispose",z),B(b),b.isVideoTexture&&v.delete(b),b.isHTMLTexture&&_.delete(b)}function T(U){const b=U.target;b.removeEventListener("dispose",T),G(b)}function B(U){const b=a.get(U);if(b.__webglInit===void 0)return;const te=U.source,he=M.get(te);if(he){const _e=he[b.__cacheKey];_e.usedTimes--,_e.usedTimes===0&&K(U),Object.keys(he).length===0&&M.delete(te)}a.remove(U)}function K(U){const b=a.get(U);r.deleteTexture(b.__webglTexture);const te=U.source,he=M.get(te);delete he[b.__cacheKey],u.memory.textures--}function G(U){const b=a.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),a.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let he=0;he<6;he++){if(Array.isArray(b.__webglFramebuffer[he]))for(let _e=0;_e<b.__webglFramebuffer[he].length;_e++)r.deleteFramebuffer(b.__webglFramebuffer[he][_e]);else r.deleteFramebuffer(b.__webglFramebuffer[he]);b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer[he])}else{if(Array.isArray(b.__webglFramebuffer))for(let he=0;he<b.__webglFramebuffer.length;he++)r.deleteFramebuffer(b.__webglFramebuffer[he]);else r.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&r.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let he=0;he<b.__webglColorRenderbuffer.length;he++)b.__webglColorRenderbuffer[he]&&r.deleteRenderbuffer(b.__webglColorRenderbuffer[he]);b.__webglDepthRenderbuffer&&r.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const te=U.textures;for(let he=0,_e=te.length;he<_e;he++){const Pe=a.get(te[he]);Pe.__webglTexture&&(r.deleteTexture(Pe.__webglTexture),u.memory.textures--),a.remove(te[he])}a.remove(U)}let Y=0;function de(){Y=0}function Se(){return Y}function ae(U){Y=U}function H(){const U=Y;return U>=o.maxTextures&&Mt("WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+o.maxTextures),Y+=1,U}function k(U){const b=[];return b.push(U.wrapS),b.push(U.wrapT),b.push(U.wrapR||0),b.push(U.magFilter),b.push(U.minFilter),b.push(U.anisotropy),b.push(U.internalFormat),b.push(U.format),b.push(U.type),b.push(U.generateMipmaps),b.push(U.premultiplyAlpha),b.push(U.flipY),b.push(U.unpackAlignment),b.push(U.colorSpace),b.join()}function ne(U,b){const te=a.get(U);if(U.isVideoTexture&&j(U),U.isRenderTargetTexture===!1&&U.isExternalTexture!==!0&&U.version>0&&te.__version!==U.version){const he=U.image;if(he===null)Mt("WebGLRenderer: Texture marked for update but no image data found.");else if(he.complete===!1)Mt("WebGLRenderer: Texture marked for update but image is incomplete");else{nt(te,U,b);return}}else U.isExternalTexture&&(te.__webglTexture=U.sourceTexture?U.sourceTexture:null);n.bindTexture(r.TEXTURE_2D,te.__webglTexture,r.TEXTURE0+b)}function ve(U,b){const te=a.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&te.__version!==U.version){nt(te,U,b);return}else U.isExternalTexture&&(te.__webglTexture=U.sourceTexture?U.sourceTexture:null);n.bindTexture(r.TEXTURE_2D_ARRAY,te.__webglTexture,r.TEXTURE0+b)}function Re(U,b){const te=a.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&te.__version!==U.version){nt(te,U,b);return}n.bindTexture(r.TEXTURE_3D,te.__webglTexture,r.TEXTURE0+b)}function F(U,b){const te=a.get(U);if(U.isCubeDepthTexture!==!0&&U.version>0&&te.__version!==U.version){vt(te,U,b);return}n.bindTexture(r.TEXTURE_CUBE_MAP,te.__webglTexture,r.TEXTURE0+b)}const Q={[Wp]:r.REPEAT,[Ji]:r.CLAMP_TO_EDGE,[Yp]:r.MIRRORED_REPEAT},Ne={[Ln]:r.NEAREST,[pb]:r.NEAREST_MIPMAP_NEAREST,[zu]:r.NEAREST_MIPMAP_LINEAR,[Mi]:r.LINEAR,[Qd]:r.LINEAR_MIPMAP_NEAREST,[Zr]:r.LINEAR_MIPMAP_LINEAR},ze={[vb]:r.NEVER,[Mb]:r.ALWAYS,[_b]:r.LESS,[Gm]:r.LEQUAL,[xb]:r.EQUAL,[km]:r.GEQUAL,[yb]:r.GREATER,[Sb]:r.NOTEQUAL};function Ze(U,b){if(b.type===Hi&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Mi||b.magFilter===Qd||b.magFilter===zu||b.magFilter===Zr||b.minFilter===Mi||b.minFilter===Qd||b.minFilter===zu||b.minFilter===Zr)&&Mt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(U,r.TEXTURE_WRAP_S,Q[b.wrapS]),r.texParameteri(U,r.TEXTURE_WRAP_T,Q[b.wrapT]),(U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY)&&r.texParameteri(U,r.TEXTURE_WRAP_R,Q[b.wrapR]),r.texParameteri(U,r.TEXTURE_MAG_FILTER,Ne[b.magFilter]),r.texParameteri(U,r.TEXTURE_MIN_FILTER,Ne[b.minFilter]),b.compareFunction&&(r.texParameteri(U,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(U,r.TEXTURE_COMPARE_FUNC,ze[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ln||b.minFilter!==zu&&b.minFilter!==Zr||b.type===Hi&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||a.get(b).__currentAnisotropy){const te=e.get("EXT_texture_filter_anisotropic");r.texParameterf(U,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,o.getMaxAnisotropy())),a.get(b).__currentAnisotropy=b.anisotropy}}}function re(U,b){let te=!1;U.__webglInit===void 0&&(U.__webglInit=!0,b.addEventListener("dispose",z));const he=b.source;let _e=M.get(he);_e===void 0&&(_e={},M.set(he,_e));const Pe=k(b);if(Pe!==U.__cacheKey){_e[Pe]===void 0&&(_e[Pe]={texture:r.createTexture(),usedTimes:0},u.memory.textures++,te=!0),_e[Pe].usedTimes++;const We=_e[U.__cacheKey];We!==void 0&&(_e[U.__cacheKey].usedTimes--,We.usedTimes===0&&K(b)),U.__cacheKey=Pe,U.__webglTexture=_e[Pe].texture}return te}function Me(U,b,te){return Math.floor(Math.floor(U/te)/b)}function De(U,b,te,he){const Pe=U.updateRanges;if(Pe.length===0)n.texSubImage2D(r.TEXTURE_2D,0,0,0,b.width,b.height,te,he,b.data);else{Pe.sort((et,Ye)=>et.start-Ye.start);let We=0;for(let et=1;et<Pe.length;et++){const Ye=Pe[We],Ie=Pe[et],lt=Ye.start+Ye.count,ct=Me(Ie.start,b.width,4),He=Me(Ye.start,b.width,4);Ie.start<=lt+1&&ct===He&&Me(Ie.start+Ie.count-1,b.width,4)===ct?Ye.count=Math.max(Ye.count,Ie.start+Ie.count-Ye.start):(++We,Pe[We]=Ie)}Pe.length=We+1;const xe=n.getParameter(r.UNPACK_ROW_LENGTH),ye=n.getParameter(r.UNPACK_SKIP_PIXELS),Fe=n.getParameter(r.UNPACK_SKIP_ROWS);n.pixelStorei(r.UNPACK_ROW_LENGTH,b.width);for(let et=0,Ye=Pe.length;et<Ye;et++){const Ie=Pe[et],lt=Math.floor(Ie.start/4),ct=Math.ceil(Ie.count/4),He=lt%b.width,q=Math.floor(lt/b.width),Be=ct,be=1;n.pixelStorei(r.UNPACK_SKIP_PIXELS,He),n.pixelStorei(r.UNPACK_SKIP_ROWS,q),n.texSubImage2D(r.TEXTURE_2D,0,He,q,Be,be,te,he,b.data)}U.clearUpdateRanges(),n.pixelStorei(r.UNPACK_ROW_LENGTH,xe),n.pixelStorei(r.UNPACK_SKIP_PIXELS,ye),n.pixelStorei(r.UNPACK_SKIP_ROWS,Fe)}}function nt(U,b,te){let he=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(he=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(he=r.TEXTURE_3D);const _e=re(U,b),Pe=b.source;n.bindTexture(he,U.__webglTexture,r.TEXTURE0+te);const We=a.get(Pe);if(Pe.version!==We.__version||_e===!0){if(n.activeTexture(r.TEXTURE0+te),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const be=Zt.getPrimaries(Zt.workingColorSpace),Xe=b.colorSpace===Sr?null:Zt.getPrimaries(b.colorSpace),Qe=b.colorSpace===Sr||be===Xe?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qe)}n.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment);let ye=y(b.image,!1,o.maxTextureSize);ye=Ht(b,ye);const Fe=c.convert(b.format,b.colorSpace),et=c.convert(b.type);let Ye=C(b.internalFormat,Fe,et,b.normalized,b.colorSpace,b.isVideoTexture);Ze(he,b);let Ie;const lt=b.mipmaps,ct=b.isVideoTexture!==!0,He=We.__version===void 0||_e===!0,q=Pe.dataReady,Be=O(b,ye);if(b.isDepthTexture)Ye=I(b.format===Kr,b.type),He&&(ct?n.texStorage2D(r.TEXTURE_2D,1,Ye,ye.width,ye.height):n.texImage2D(r.TEXTURE_2D,0,Ye,ye.width,ye.height,0,Fe,et,null));else if(b.isDataTexture)if(lt.length>0){ct&&He&&n.texStorage2D(r.TEXTURE_2D,Be,Ye,lt[0].width,lt[0].height);for(let be=0,Xe=lt.length;be<Xe;be++)Ie=lt[be],ct?q&&n.texSubImage2D(r.TEXTURE_2D,be,0,0,Ie.width,Ie.height,Fe,et,Ie.data):n.texImage2D(r.TEXTURE_2D,be,Ye,Ie.width,Ie.height,0,Fe,et,Ie.data);b.generateMipmaps=!1}else ct?(He&&n.texStorage2D(r.TEXTURE_2D,Be,Ye,ye.width,ye.height),q&&De(b,ye,Fe,et)):n.texImage2D(r.TEXTURE_2D,0,Ye,ye.width,ye.height,0,Fe,et,ye.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){ct&&He&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Be,Ye,lt[0].width,lt[0].height,ye.depth);for(let be=0,Xe=lt.length;be<Xe;be++)if(Ie=lt[be],b.format!==Ni)if(Fe!==null)if(ct){if(q)if(b.layerUpdates.size>0){const Qe=sx(Ie.width,Ie.height,b.format,b.type);for(const Ae of b.layerUpdates){const rt=Ie.data.subarray(Ae*Qe/Ie.data.BYTES_PER_ELEMENT,(Ae+1)*Qe/Ie.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,be,0,0,Ae,Ie.width,Ie.height,1,Fe,rt)}b.clearLayerUpdates()}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,be,0,0,0,Ie.width,Ie.height,ye.depth,Fe,Ie.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,be,Ye,Ie.width,Ie.height,ye.depth,0,Ie.data,0,0);else Mt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ct?q&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,be,0,0,0,Ie.width,Ie.height,ye.depth,Fe,et,Ie.data):n.texImage3D(r.TEXTURE_2D_ARRAY,be,Ye,Ie.width,Ie.height,ye.depth,0,Fe,et,Ie.data)}else{ct&&He&&n.texStorage2D(r.TEXTURE_2D,Be,Ye,lt[0].width,lt[0].height);for(let be=0,Xe=lt.length;be<Xe;be++)Ie=lt[be],b.format!==Ni?Fe!==null?ct?q&&n.compressedTexSubImage2D(r.TEXTURE_2D,be,0,0,Ie.width,Ie.height,Fe,Ie.data):n.compressedTexImage2D(r.TEXTURE_2D,be,Ye,Ie.width,Ie.height,0,Ie.data):Mt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ct?q&&n.texSubImage2D(r.TEXTURE_2D,be,0,0,Ie.width,Ie.height,Fe,et,Ie.data):n.texImage2D(r.TEXTURE_2D,be,Ye,Ie.width,Ie.height,0,Fe,et,Ie.data)}else if(b.isDataArrayTexture)if(ct){if(He&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Be,Ye,ye.width,ye.height,ye.depth),q)if(b.layerUpdates.size>0){const be=sx(ye.width,ye.height,b.format,b.type);for(const Xe of b.layerUpdates){const Qe=ye.data.subarray(Xe*be/ye.data.BYTES_PER_ELEMENT,(Xe+1)*be/ye.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Xe,ye.width,ye.height,1,Fe,et,Qe)}b.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ye.width,ye.height,ye.depth,Fe,et,ye.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,Ye,ye.width,ye.height,ye.depth,0,Fe,et,ye.data);else if(b.isData3DTexture)ct?(He&&n.texStorage3D(r.TEXTURE_3D,Be,Ye,ye.width,ye.height,ye.depth),q&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ye.width,ye.height,ye.depth,Fe,et,ye.data)):n.texImage3D(r.TEXTURE_3D,0,Ye,ye.width,ye.height,ye.depth,0,Fe,et,ye.data);else if(b.isFramebufferTexture){if(He)if(ct)n.texStorage2D(r.TEXTURE_2D,Be,Ye,ye.width,ye.height);else{let be=ye.width,Xe=ye.height;for(let Qe=0;Qe<Be;Qe++)n.texImage2D(r.TEXTURE_2D,Qe,Ye,be,Xe,0,Fe,et,null),be>>=1,Xe>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in r){const be=r.canvas;if(be.hasAttribute("layoutsubtree")||be.setAttribute("layoutsubtree","true"),ye.parentNode!==be){be.appendChild(ye),_.add(b),be.onpaint=Xe=>{const Qe=Xe.changedElements;for(const Ae of _)Qe.includes(Ae.image)&&(Ae.needsUpdate=!0)},be.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,ye);else{const Qe=r.RGBA,Ae=r.RGBA,rt=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Qe,Ae,rt,ye)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(lt.length>0){if(ct&&He){const be=Gt(lt[0]);n.texStorage2D(r.TEXTURE_2D,Be,Ye,be.width,be.height)}for(let be=0,Xe=lt.length;be<Xe;be++)Ie=lt[be],ct?q&&n.texSubImage2D(r.TEXTURE_2D,be,0,0,Fe,et,Ie):n.texImage2D(r.TEXTURE_2D,be,Ye,Fe,et,Ie);b.generateMipmaps=!1}else if(ct){if(He){const be=Gt(ye);n.texStorage2D(r.TEXTURE_2D,Be,Ye,be.width,be.height)}q&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,Fe,et,ye)}else n.texImage2D(r.TEXTURE_2D,0,Ye,Fe,et,ye);x(b)&&P(he),We.__version=Pe.version,b.onUpdate&&b.onUpdate(b)}U.__version=b.version}function vt(U,b,te){if(b.image.length!==6)return;const he=re(U,b),_e=b.source;n.bindTexture(r.TEXTURE_CUBE_MAP,U.__webglTexture,r.TEXTURE0+te);const Pe=a.get(_e);if(_e.version!==Pe.__version||he===!0){n.activeTexture(r.TEXTURE0+te);const We=Zt.getPrimaries(Zt.workingColorSpace),xe=b.colorSpace===Sr?null:Zt.getPrimaries(b.colorSpace),ye=b.colorSpace===Sr||We===xe?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const Fe=b.isCompressedTexture||b.image[0].isCompressedTexture,et=b.image[0]&&b.image[0].isDataTexture,Ye=[];for(let Ae=0;Ae<6;Ae++)!Fe&&!et?Ye[Ae]=y(b.image[Ae],!0,o.maxCubemapSize):Ye[Ae]=et?b.image[Ae].image:b.image[Ae],Ye[Ae]=Ht(b,Ye[Ae]);const Ie=Ye[0],lt=c.convert(b.format,b.colorSpace),ct=c.convert(b.type),He=C(b.internalFormat,lt,ct,b.normalized,b.colorSpace),q=b.isVideoTexture!==!0,Be=Pe.__version===void 0||he===!0,be=_e.dataReady;let Xe=O(b,Ie);Ze(r.TEXTURE_CUBE_MAP,b);let Qe;if(Fe){q&&Be&&n.texStorage2D(r.TEXTURE_CUBE_MAP,Xe,He,Ie.width,Ie.height);for(let Ae=0;Ae<6;Ae++){Qe=Ye[Ae].mipmaps;for(let rt=0;rt<Qe.length;rt++){const tt=Qe[rt];b.format!==Ni?lt!==null?q?be&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,rt,0,0,tt.width,tt.height,lt,tt.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,rt,He,tt.width,tt.height,0,tt.data):Mt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):q?be&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,rt,0,0,tt.width,tt.height,lt,ct,tt.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,rt,He,tt.width,tt.height,0,lt,ct,tt.data)}}}else{if(Qe=b.mipmaps,q&&Be){Qe.length>0&&Xe++;const Ae=Gt(Ye[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,Xe,He,Ae.width,Ae.height)}for(let Ae=0;Ae<6;Ae++)if(et){q?be&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,0,0,Ye[Ae].width,Ye[Ae].height,lt,ct,Ye[Ae].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,He,Ye[Ae].width,Ye[Ae].height,0,lt,ct,Ye[Ae].data);for(let rt=0;rt<Qe.length;rt++){const En=Qe[rt].image[Ae].image;q?be&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,rt+1,0,0,En.width,En.height,lt,ct,En.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,rt+1,He,En.width,En.height,0,lt,ct,En.data)}}else{q?be&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,0,0,lt,ct,Ye[Ae]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,He,lt,ct,Ye[Ae]);for(let rt=0;rt<Qe.length;rt++){const tt=Qe[rt];q?be&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,rt+1,0,0,lt,ct,tt.image[Ae]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,rt+1,He,lt,ct,tt.image[Ae])}}}x(b)&&P(r.TEXTURE_CUBE_MAP),Pe.__version=_e.version,b.onUpdate&&b.onUpdate(b)}U.__version=b.version}function Ke(U,b,te,he,_e,Pe){const We=c.convert(te.format,te.colorSpace),xe=c.convert(te.type),ye=C(te.internalFormat,We,xe,te.normalized,te.colorSpace),Fe=a.get(b),et=a.get(te);if(et.__renderTarget=b,!Fe.__hasExternalTextures){const Ye=Math.max(1,b.width>>Pe),Ie=Math.max(1,b.height>>Pe);_e===r.TEXTURE_3D||_e===r.TEXTURE_2D_ARRAY?n.texImage3D(_e,Pe,ye,Ye,Ie,b.depth,0,We,xe,null):n.texImage2D(_e,Pe,ye,Ye,Ie,0,We,xe,null)}n.bindFramebuffer(r.FRAMEBUFFER,U),Sn(b)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,he,_e,et.__webglTexture,0,fn(b)):(_e===r.TEXTURE_2D||_e>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&_e<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,he,_e,et.__webglTexture,Pe),n.bindFramebuffer(r.FRAMEBUFFER,null)}function yn(U,b,te){if(r.bindRenderbuffer(r.RENDERBUFFER,U),b.depthBuffer){const he=b.depthTexture,_e=he&&he.isDepthTexture?he.type:null,Pe=I(b.stencilBuffer,_e),We=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Sn(b)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,fn(b),Pe,b.width,b.height):te?r.renderbufferStorageMultisample(r.RENDERBUFFER,fn(b),Pe,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,Pe,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,We,r.RENDERBUFFER,U)}else{const he=b.textures;for(let _e=0;_e<he.length;_e++){const Pe=he[_e],We=c.convert(Pe.format,Pe.colorSpace),xe=c.convert(Pe.type),ye=C(Pe.internalFormat,We,xe,Pe.normalized,Pe.colorSpace);Sn(b)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,fn(b),ye,b.width,b.height):te?r.renderbufferStorageMultisample(r.RENDERBUFFER,fn(b),ye,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,ye,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ut(U,b,te){const he=b.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(r.FRAMEBUFFER,U),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const _e=a.get(b.depthTexture);if(_e.__renderTarget=b,(!_e.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),he){if(_e.__webglInit===void 0&&(_e.__webglInit=!0,b.depthTexture.addEventListener("dispose",z)),_e.__webglTexture===void 0){_e.__webglTexture=r.createTexture(),n.bindTexture(r.TEXTURE_CUBE_MAP,_e.__webglTexture),Ze(r.TEXTURE_CUBE_MAP,b.depthTexture);const Fe=c.convert(b.depthTexture.format),et=c.convert(b.depthTexture.type);let Ye;b.depthTexture.format===Ds?Ye=r.DEPTH_COMPONENT24:b.depthTexture.format===Kr&&(Ye=r.DEPTH24_STENCIL8);for(let Ie=0;Ie<6;Ie++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0,Ye,b.width,b.height,0,Fe,et,null)}}else ne(b.depthTexture,0);const Pe=_e.__webglTexture,We=fn(b),xe=he?r.TEXTURE_CUBE_MAP_POSITIVE_X+te:r.TEXTURE_2D,ye=b.depthTexture.format===Kr?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(b.depthTexture.format===Ds)Sn(b)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ye,xe,Pe,0,We):r.framebufferTexture2D(r.FRAMEBUFFER,ye,xe,Pe,0);else if(b.depthTexture.format===Kr)Sn(b)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ye,xe,Pe,0,We):r.framebufferTexture2D(r.FRAMEBUFFER,ye,xe,Pe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function It(U){const b=a.get(U),te=U.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==U.depthTexture){const he=U.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),he){const _e=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,he.removeEventListener("dispose",_e)};he.addEventListener("dispose",_e),b.__depthDisposeCallback=_e}b.__boundDepthTexture=he}if(U.depthTexture&&!b.__autoAllocateDepthBuffer)if(te)for(let he=0;he<6;he++)Ut(b.__webglFramebuffer[he],U,he);else{const he=U.texture.mipmaps;he&&he.length>0?Ut(b.__webglFramebuffer[0],U,0):Ut(b.__webglFramebuffer,U,0)}else if(te){b.__webglDepthbuffer=[];for(let he=0;he<6;he++)if(n.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[he]),b.__webglDepthbuffer[he]===void 0)b.__webglDepthbuffer[he]=r.createRenderbuffer(),yn(b.__webglDepthbuffer[he],U,!1);else{const _e=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Pe=b.__webglDepthbuffer[he];r.bindRenderbuffer(r.RENDERBUFFER,Pe),r.framebufferRenderbuffer(r.FRAMEBUFFER,_e,r.RENDERBUFFER,Pe)}}else{const he=U.texture.mipmaps;if(he&&he.length>0?n.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[0]):n.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=r.createRenderbuffer(),yn(b.__webglDepthbuffer,U,!1);else{const _e=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Pe=b.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Pe),r.framebufferRenderbuffer(r.FRAMEBUFFER,_e,r.RENDERBUFFER,Pe)}}n.bindFramebuffer(r.FRAMEBUFFER,null)}function Bt(U,b,te){const he=a.get(U);b!==void 0&&Ke(he.__webglFramebuffer,U,U.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),te!==void 0&&It(U)}function zt(U){const b=U.texture,te=a.get(U),he=a.get(b);U.addEventListener("dispose",T);const _e=U.textures,Pe=U.isWebGLCubeRenderTarget===!0,We=_e.length>1;if(We||(he.__webglTexture===void 0&&(he.__webglTexture=r.createTexture()),he.__version=b.version,u.memory.textures++),Pe){te.__webglFramebuffer=[];for(let xe=0;xe<6;xe++)if(b.mipmaps&&b.mipmaps.length>0){te.__webglFramebuffer[xe]=[];for(let ye=0;ye<b.mipmaps.length;ye++)te.__webglFramebuffer[xe][ye]=r.createFramebuffer()}else te.__webglFramebuffer[xe]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){te.__webglFramebuffer=[];for(let xe=0;xe<b.mipmaps.length;xe++)te.__webglFramebuffer[xe]=r.createFramebuffer()}else te.__webglFramebuffer=r.createFramebuffer();if(We)for(let xe=0,ye=_e.length;xe<ye;xe++){const Fe=a.get(_e[xe]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=r.createTexture(),u.memory.textures++)}if(U.samples>0&&Sn(U)===!1){te.__webglMultisampledFramebuffer=r.createFramebuffer(),te.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,te.__webglMultisampledFramebuffer);for(let xe=0;xe<_e.length;xe++){const ye=_e[xe];te.__webglColorRenderbuffer[xe]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,te.__webglColorRenderbuffer[xe]);const Fe=c.convert(ye.format,ye.colorSpace),et=c.convert(ye.type),Ye=C(ye.internalFormat,Fe,et,ye.normalized,ye.colorSpace,U.isXRRenderTarget===!0),Ie=fn(U);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ie,Ye,U.width,U.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.RENDERBUFFER,te.__webglColorRenderbuffer[xe])}r.bindRenderbuffer(r.RENDERBUFFER,null),U.depthBuffer&&(te.__webglDepthRenderbuffer=r.createRenderbuffer(),yn(te.__webglDepthRenderbuffer,U,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Pe){n.bindTexture(r.TEXTURE_CUBE_MAP,he.__webglTexture),Ze(r.TEXTURE_CUBE_MAP,b);for(let xe=0;xe<6;xe++)if(b.mipmaps&&b.mipmaps.length>0)for(let ye=0;ye<b.mipmaps.length;ye++)Ke(te.__webglFramebuffer[xe][ye],U,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,ye);else Ke(te.__webglFramebuffer[xe],U,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0);x(b)&&P(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(We){for(let xe=0,ye=_e.length;xe<ye;xe++){const Fe=_e[xe],et=a.get(Fe);let Ye=r.TEXTURE_2D;(U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Ye=U.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Ye,et.__webglTexture),Ze(Ye,Fe),Ke(te.__webglFramebuffer,U,Fe,r.COLOR_ATTACHMENT0+xe,Ye,0),x(Fe)&&P(Ye)}n.unbindTexture()}else{let xe=r.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(xe=U.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(xe,he.__webglTexture),Ze(xe,b),b.mipmaps&&b.mipmaps.length>0)for(let ye=0;ye<b.mipmaps.length;ye++)Ke(te.__webglFramebuffer[ye],U,b,r.COLOR_ATTACHMENT0,xe,ye);else Ke(te.__webglFramebuffer,U,b,r.COLOR_ATTACHMENT0,xe,0);x(b)&&P(xe),n.unbindTexture()}U.depthBuffer&&It(U)}function Rn(U){const b=U.textures;for(let te=0,he=b.length;te<he;te++){const _e=b[te];if(x(_e)){const Pe=N(U),We=a.get(_e).__webglTexture;n.bindTexture(Pe,We),P(Pe),n.unbindTexture()}}}const Un=[],bn=[];function Cn(U){if(U.samples>0){if(Sn(U)===!1){const b=U.textures,te=U.width,he=U.height;let _e=r.COLOR_BUFFER_BIT;const Pe=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,We=a.get(U),xe=b.length>1;if(xe)for(let Fe=0;Fe<b.length;Fe++)n.bindFramebuffer(r.FRAMEBUFFER,We.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Fe,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,We.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Fe,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,We.__webglMultisampledFramebuffer);const ye=U.texture.mipmaps;ye&&ye.length>0?n.bindFramebuffer(r.DRAW_FRAMEBUFFER,We.__webglFramebuffer[0]):n.bindFramebuffer(r.DRAW_FRAMEBUFFER,We.__webglFramebuffer);for(let Fe=0;Fe<b.length;Fe++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(_e|=r.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(_e|=r.STENCIL_BUFFER_BIT)),xe){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,We.__webglColorRenderbuffer[Fe]);const et=a.get(b[Fe]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,et,0)}r.blitFramebuffer(0,0,te,he,0,0,te,he,_e,r.NEAREST),m===!0&&(Un.length=0,bn.length=0,Un.push(r.COLOR_ATTACHMENT0+Fe),U.depthBuffer&&U.resolveDepthBuffer===!1&&(Un.push(Pe),bn.push(Pe),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,bn)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Un))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),xe)for(let Fe=0;Fe<b.length;Fe++){n.bindFramebuffer(r.FRAMEBUFFER,We.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Fe,r.RENDERBUFFER,We.__webglColorRenderbuffer[Fe]);const et=a.get(b[Fe]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,We.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Fe,r.TEXTURE_2D,et,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,We.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&m){const b=U.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}}function fn(U){return Math.min(o.maxSamples,U.samples)}function Sn(U){const b=a.get(U);return U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function j(U){const b=u.render.frame;v.get(U)!==b&&(v.set(U,b),U.update())}function Ht(U,b){const te=U.colorSpace,he=U.format,_e=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||te!==xc&&te!==Sr&&(Zt.getTransfer(te)===mn?(he!==Ni||_e!==va)&&Mt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):nn("WebGLTextures: Unsupported texture color space:",te)),b}function Gt(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(p.width=U.naturalWidth||U.width,p.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(p.width=U.displayWidth,p.height=U.displayHeight):(p.width=U.width,p.height=U.height),p}this.allocateTextureUnit=H,this.resetTextureUnits=de,this.getTextureUnits=Se,this.setTextureUnits=ae,this.setTexture2D=ne,this.setTexture2DArray=ve,this.setTexture3D=Re,this.setTextureCube=F,this.rebindTextures=Bt,this.setupRenderTarget=zt,this.updateRenderTargetMipmap=Rn,this.updateMultisampleRenderTarget=Cn,this.setupDepthRenderbuffer=It,this.setupFrameBufferTexture=Ke,this.useMultisampledRTT=Sn,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Zw(r,e){function n(a,o=Sr){let c;const u=Zt.getTransfer(o);if(a===va)return r.UNSIGNED_BYTE;if(a===Fm)return r.UNSIGNED_SHORT_4_4_4_4;if(a===Bm)return r.UNSIGNED_SHORT_5_5_5_1;if(a===ry)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===oy)return r.UNSIGNED_INT_10F_11F_11F_REV;if(a===ay)return r.BYTE;if(a===sy)return r.SHORT;if(a===vc)return r.UNSIGNED_SHORT;if(a===Pm)return r.INT;if(a===Ka)return r.UNSIGNED_INT;if(a===Hi)return r.FLOAT;if(a===bi)return r.HALF_FLOAT;if(a===ly)return r.ALPHA;if(a===cy)return r.RGB;if(a===Ni)return r.RGBA;if(a===Ds)return r.DEPTH_COMPONENT;if(a===Kr)return r.DEPTH_STENCIL;if(a===uy)return r.RED;if(a===zm)return r.RED_INTEGER;if(a===$r)return r.RG;if(a===Im)return r.RG_INTEGER;if(a===Hm)return r.RGBA_INTEGER;if(a===Tf||a===Af||a===wf||a===Rf)if(u===mn)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===Tf)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===Af)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===wf)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===Rf)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===Tf)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===Af)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===wf)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===Rf)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===jp||a===Zp||a===Kp||a===Qp)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===jp)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Zp)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Kp)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===Qp)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===Jp||a===$p||a===em||a===tm||a===nm||a===Nf||a===im)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(a===Jp||a===$p)return u===mn?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===em)return u===mn?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(a===tm)return c.COMPRESSED_R11_EAC;if(a===nm)return c.COMPRESSED_SIGNED_R11_EAC;if(a===Nf)return c.COMPRESSED_RG11_EAC;if(a===im)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(a===am||a===sm||a===rm||a===om||a===lm||a===cm||a===um||a===fm||a===hm||a===dm||a===pm||a===mm||a===gm||a===vm)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(a===am)return u===mn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===sm)return u===mn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===rm)return u===mn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===om)return u===mn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===lm)return u===mn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===cm)return u===mn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===um)return u===mn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===fm)return u===mn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===hm)return u===mn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===dm)return u===mn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===pm)return u===mn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===mm)return u===mn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===gm)return u===mn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===vm)return u===mn?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===_m||a===xm||a===ym)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(a===_m)return u===mn?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===xm)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===ym)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===Sm||a===Mm||a===Lf||a===bm)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(a===Sm)return c.COMPRESSED_RED_RGTC1_EXT;if(a===Mm)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===Lf)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===bm)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===_c?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:n}}const Kw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Qw=`
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

}`;class Jw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const a=new xy(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,a=new wn({vertexShader:Kw,fragmentShader:Qw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new La(new Wf(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $w extends to{constructor(e,n){super();const a=this;let o=null,c=1,u=null,d="local-floor",m=1,p=null,v=null,_=null,g=null,M=null,E=null;const R=typeof XRWebGLBinding<"u",y=new Jw,x={},P=n.getContextAttributes();let N=null,C=null;const I=[],O=[],z=new Dt;let T=null;const B=new ga;B.viewport=new Vn;const K=new ga;K.viewport=new Vn;const G=[B,K],Y=new o1;let de=null,Se=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let Me=I[re];return Me===void 0&&(Me=new sp,I[re]=Me),Me.getTargetRaySpace()},this.getControllerGrip=function(re){let Me=I[re];return Me===void 0&&(Me=new sp,I[re]=Me),Me.getGripSpace()},this.getHand=function(re){let Me=I[re];return Me===void 0&&(Me=new sp,I[re]=Me),Me.getHandSpace()};function ae(re){const Me=O.indexOf(re.inputSource);if(Me===-1)return;const De=I[Me];De!==void 0&&(De.update(re.inputSource,re.frame,p||u),De.dispatchEvent({type:re.type,data:re.inputSource}))}function H(){o.removeEventListener("select",ae),o.removeEventListener("selectstart",ae),o.removeEventListener("selectend",ae),o.removeEventListener("squeeze",ae),o.removeEventListener("squeezestart",ae),o.removeEventListener("squeezeend",ae),o.removeEventListener("end",H),o.removeEventListener("inputsourceschange",k);for(let re=0;re<I.length;re++){const Me=O[re];Me!==null&&(O[re]=null,I[re].disconnect(Me))}de=null,Se=null,y.reset();for(const re in x)delete x[re];e.setRenderTarget(N),M=null,g=null,_=null,o=null,C=null,Ze.stop(),a.isPresenting=!1,e.setPixelRatio(T),e.setSize(z.width,z.height,!1),a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){c=re,a.isPresenting===!0&&Mt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){d=re,a.isPresenting===!0&&Mt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||u},this.setReferenceSpace=function(re){p=re},this.getBaseLayer=function(){return g!==null?g:M},this.getBinding=function(){return _===null&&R&&(_=new XRWebGLBinding(o,n)),_},this.getFrame=function(){return E},this.getSession=function(){return o},this.setSession=async function(re){if(o=re,o!==null){if(N=e.getRenderTarget(),o.addEventListener("select",ae),o.addEventListener("selectstart",ae),o.addEventListener("selectend",ae),o.addEventListener("squeeze",ae),o.addEventListener("squeezestart",ae),o.addEventListener("squeezeend",ae),o.addEventListener("end",H),o.addEventListener("inputsourceschange",k),P.xrCompatible!==!0&&await n.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(z),R&&"createProjectionLayer"in XRWebGLBinding.prototype){let De=null,nt=null,vt=null;P.depth&&(vt=P.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,De=P.stencil?Kr:Ds,nt=P.stencil?_c:Ka);const Ke={colorFormat:n.RGBA8,depthFormat:vt,scaleFactor:c};_=this.getBinding(),g=_.createProjectionLayer(Ke),o.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),C=new mi(g.textureWidth,g.textureHeight,{format:Ni,type:va,depthTexture:new nl(g.textureWidth,g.textureHeight,nt,void 0,void 0,void 0,void 0,void 0,void 0,De),stencilBuffer:P.stencil,colorSpace:e.outputColorSpace,samples:P.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const De={antialias:P.antialias,alpha:!0,depth:P.depth,stencil:P.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(o,n,De),o.updateRenderState({baseLayer:M}),e.setPixelRatio(1),e.setSize(M.framebufferWidth,M.framebufferHeight,!1),C=new mi(M.framebufferWidth,M.framebufferHeight,{format:Ni,type:va,colorSpace:e.outputColorSpace,stencilBuffer:P.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(m),p=null,u=await o.requestReferenceSpace(d),Ze.setContext(o),Ze.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function k(re){for(let Me=0;Me<re.removed.length;Me++){const De=re.removed[Me],nt=O.indexOf(De);nt>=0&&(O[nt]=null,I[nt].disconnect(De))}for(let Me=0;Me<re.added.length;Me++){const De=re.added[Me];let nt=O.indexOf(De);if(nt===-1){for(let Ke=0;Ke<I.length;Ke++)if(Ke>=O.length){O.push(De),nt=Ke;break}else if(O[Ke]===null){O[Ke]=De,nt=Ke;break}if(nt===-1)break}const vt=I[nt];vt&&vt.connect(De)}}const ne=new ee,ve=new ee;function Re(re,Me,De){ne.setFromMatrixPosition(Me.matrixWorld),ve.setFromMatrixPosition(De.matrixWorld);const nt=ne.distanceTo(ve),vt=Me.projectionMatrix.elements,Ke=De.projectionMatrix.elements,yn=vt[14]/(vt[10]-1),Ut=vt[14]/(vt[10]+1),It=(vt[9]+1)/vt[5],Bt=(vt[9]-1)/vt[5],zt=(vt[8]-1)/vt[0],Rn=(Ke[8]+1)/Ke[0],Un=yn*zt,bn=yn*Rn,Cn=nt/(-zt+Rn),fn=Cn*-zt;if(Me.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(fn),re.translateZ(Cn),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),vt[10]===-1)re.projectionMatrix.copy(Me.projectionMatrix),re.projectionMatrixInverse.copy(Me.projectionMatrixInverse);else{const Sn=yn+Cn,j=Ut+Cn,Ht=Un-fn,Gt=bn+(nt-fn),U=It*Ut/j*Sn,b=Bt*Ut/j*Sn;re.projectionMatrix.makePerspective(Ht,Gt,U,b,Sn,j),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function F(re,Me){Me===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(Me.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(o===null)return;let Me=re.near,De=re.far;y.texture!==null&&(y.depthNear>0&&(Me=y.depthNear),y.depthFar>0&&(De=y.depthFar)),Y.near=K.near=B.near=Me,Y.far=K.far=B.far=De,(de!==Y.near||Se!==Y.far)&&(o.updateRenderState({depthNear:Y.near,depthFar:Y.far}),de=Y.near,Se=Y.far),Y.layers.mask=re.layers.mask|6,B.layers.mask=Y.layers.mask&-5,K.layers.mask=Y.layers.mask&-3;const nt=re.parent,vt=Y.cameras;F(Y,nt);for(let Ke=0;Ke<vt.length;Ke++)F(vt[Ke],nt);vt.length===2?Re(Y,B,K):Y.projectionMatrix.copy(B.projectionMatrix),Q(re,Y,nt)};function Q(re,Me,De){De===null?re.matrix.copy(Me.matrixWorld):(re.matrix.copy(De.matrixWorld),re.matrix.invert(),re.matrix.multiply(Me.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(Me.projectionMatrix),re.projectionMatrixInverse.copy(Me.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=Em*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return Y},this.getFoveation=function(){if(!(g===null&&M===null))return m},this.setFoveation=function(re){m=re,g!==null&&(g.fixedFoveation=re),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=re)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(Y)},this.getCameraTexture=function(re){return x[re]};let Ne=null;function ze(re,Me){if(v=Me.getViewerPose(p||u),E=Me,v!==null){const De=v.views;M!==null&&(e.setRenderTargetFramebuffer(C,M.framebuffer),e.setRenderTarget(C));let nt=!1;De.length!==Y.cameras.length&&(Y.cameras.length=0,nt=!0);for(let Ut=0;Ut<De.length;Ut++){const It=De[Ut];let Bt=null;if(M!==null)Bt=M.getViewport(It);else{const Rn=_.getViewSubImage(g,It);Bt=Rn.viewport,Ut===0&&(e.setRenderTargetTextures(C,Rn.colorTexture,Rn.depthStencilTexture),e.setRenderTarget(C))}let zt=G[Ut];zt===void 0&&(zt=new ga,zt.layers.enable(Ut),zt.viewport=new Vn,G[Ut]=zt),zt.matrix.fromArray(It.transform.matrix),zt.matrix.decompose(zt.position,zt.quaternion,zt.scale),zt.projectionMatrix.fromArray(It.projectionMatrix),zt.projectionMatrixInverse.copy(zt.projectionMatrix).invert(),zt.viewport.set(Bt.x,Bt.y,Bt.width,Bt.height),Ut===0&&(Y.matrix.copy(zt.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale)),nt===!0&&Y.cameras.push(zt)}const vt=o.enabledFeatures;if(vt&&vt.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&R){_=a.getBinding();const Ut=_.getDepthInformation(De[0]);Ut&&Ut.isValid&&Ut.texture&&y.init(Ut,o.renderState)}if(vt&&vt.includes("camera-access")&&R){e.state.unbindTexture(),_=a.getBinding();for(let Ut=0;Ut<De.length;Ut++){const It=De[Ut].camera;if(It){let Bt=x[It];Bt||(Bt=new xy,x[It]=Bt);const zt=_.getCameraImage(It);Bt.sourceTexture=zt}}}}for(let De=0;De<I.length;De++){const nt=O[De],vt=I[De];nt!==null&&vt!==void 0&&vt.update(nt,Me,p||u)}Ne&&Ne(re,Me),Me.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:Me}),E=null}const Ze=new My;Ze.setAnimationLoop(ze),this.setAnimationLoop=function(re){Ne=re},this.dispose=function(){}}}const e2=new zn,Cy=new Ct;Cy.set(-1,0,0,0,1,0,0,0,1);function t2(r,e){function n(y,x){y.matrixAutoUpdate===!0&&y.updateMatrix(),x.value.copy(y.matrix)}function a(y,x){x.color.getRGB(y.fogColor.value,yy(r)),x.isFog?(y.fogNear.value=x.near,y.fogFar.value=x.far):x.isFogExp2&&(y.fogDensity.value=x.density)}function o(y,x,P,N,C){x.isNodeMaterial?x.uniformsNeedUpdate=!1:x.isMeshBasicMaterial?c(y,x):x.isMeshLambertMaterial?(c(y,x),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)):x.isMeshToonMaterial?(c(y,x),_(y,x)):x.isMeshPhongMaterial?(c(y,x),v(y,x),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)):x.isMeshStandardMaterial?(c(y,x),g(y,x),x.isMeshPhysicalMaterial&&M(y,x,C)):x.isMeshMatcapMaterial?(c(y,x),E(y,x)):x.isMeshDepthMaterial?c(y,x):x.isMeshDistanceMaterial?(c(y,x),R(y,x)):x.isMeshNormalMaterial?c(y,x):x.isLineBasicMaterial?(u(y,x),x.isLineDashedMaterial&&d(y,x)):x.isPointsMaterial?m(y,x,P,N):x.isSpriteMaterial?p(y,x):x.isShadowMaterial?(y.color.value.copy(x.color),y.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function c(y,x){y.opacity.value=x.opacity,x.color&&y.diffuse.value.copy(x.color),x.emissive&&y.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(y.map.value=x.map,n(x.map,y.mapTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,n(x.alphaMap,y.alphaMapTransform)),x.bumpMap&&(y.bumpMap.value=x.bumpMap,n(x.bumpMap,y.bumpMapTransform),y.bumpScale.value=x.bumpScale,x.side===Gi&&(y.bumpScale.value*=-1)),x.normalMap&&(y.normalMap.value=x.normalMap,n(x.normalMap,y.normalMapTransform),y.normalScale.value.copy(x.normalScale),x.side===Gi&&y.normalScale.value.negate()),x.displacementMap&&(y.displacementMap.value=x.displacementMap,n(x.displacementMap,y.displacementMapTransform),y.displacementScale.value=x.displacementScale,y.displacementBias.value=x.displacementBias),x.emissiveMap&&(y.emissiveMap.value=x.emissiveMap,n(x.emissiveMap,y.emissiveMapTransform)),x.specularMap&&(y.specularMap.value=x.specularMap,n(x.specularMap,y.specularMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest);const P=e.get(x),N=P.envMap,C=P.envMapRotation;N&&(y.envMap.value=N,y.envMapRotation.value.setFromMatrix4(e2.makeRotationFromEuler(C)).transpose(),N.isCubeTexture&&N.isRenderTargetTexture===!1&&y.envMapRotation.value.premultiply(Cy),y.reflectivity.value=x.reflectivity,y.ior.value=x.ior,y.refractionRatio.value=x.refractionRatio),x.lightMap&&(y.lightMap.value=x.lightMap,y.lightMapIntensity.value=x.lightMapIntensity,n(x.lightMap,y.lightMapTransform)),x.aoMap&&(y.aoMap.value=x.aoMap,y.aoMapIntensity.value=x.aoMapIntensity,n(x.aoMap,y.aoMapTransform))}function u(y,x){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,x.map&&(y.map.value=x.map,n(x.map,y.mapTransform))}function d(y,x){y.dashSize.value=x.dashSize,y.totalSize.value=x.dashSize+x.gapSize,y.scale.value=x.scale}function m(y,x,P,N){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,y.size.value=x.size*P,y.scale.value=N*.5,x.map&&(y.map.value=x.map,n(x.map,y.uvTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,n(x.alphaMap,y.alphaMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest)}function p(y,x){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,y.rotation.value=x.rotation,x.map&&(y.map.value=x.map,n(x.map,y.mapTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,n(x.alphaMap,y.alphaMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest)}function v(y,x){y.specular.value.copy(x.specular),y.shininess.value=Math.max(x.shininess,1e-4)}function _(y,x){x.gradientMap&&(y.gradientMap.value=x.gradientMap)}function g(y,x){y.metalness.value=x.metalness,x.metalnessMap&&(y.metalnessMap.value=x.metalnessMap,n(x.metalnessMap,y.metalnessMapTransform)),y.roughness.value=x.roughness,x.roughnessMap&&(y.roughnessMap.value=x.roughnessMap,n(x.roughnessMap,y.roughnessMapTransform)),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)}function M(y,x,P){y.ior.value=x.ior,x.sheen>0&&(y.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),y.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(y.sheenColorMap.value=x.sheenColorMap,n(x.sheenColorMap,y.sheenColorMapTransform)),x.sheenRoughnessMap&&(y.sheenRoughnessMap.value=x.sheenRoughnessMap,n(x.sheenRoughnessMap,y.sheenRoughnessMapTransform))),x.clearcoat>0&&(y.clearcoat.value=x.clearcoat,y.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(y.clearcoatMap.value=x.clearcoatMap,n(x.clearcoatMap,y.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,n(x.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(y.clearcoatNormalMap.value=x.clearcoatNormalMap,n(x.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===Gi&&y.clearcoatNormalScale.value.negate())),x.dispersion>0&&(y.dispersion.value=x.dispersion),x.iridescence>0&&(y.iridescence.value=x.iridescence,y.iridescenceIOR.value=x.iridescenceIOR,y.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(y.iridescenceMap.value=x.iridescenceMap,n(x.iridescenceMap,y.iridescenceMapTransform)),x.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=x.iridescenceThicknessMap,n(x.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),x.transmission>0&&(y.transmission.value=x.transmission,y.transmissionSamplerMap.value=P.texture,y.transmissionSamplerSize.value.set(P.width,P.height),x.transmissionMap&&(y.transmissionMap.value=x.transmissionMap,n(x.transmissionMap,y.transmissionMapTransform)),y.thickness.value=x.thickness,x.thicknessMap&&(y.thicknessMap.value=x.thicknessMap,n(x.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=x.attenuationDistance,y.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(y.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(y.anisotropyMap.value=x.anisotropyMap,n(x.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=x.specularIntensity,y.specularColor.value.copy(x.specularColor),x.specularColorMap&&(y.specularColorMap.value=x.specularColorMap,n(x.specularColorMap,y.specularColorMapTransform)),x.specularIntensityMap&&(y.specularIntensityMap.value=x.specularIntensityMap,n(x.specularIntensityMap,y.specularIntensityMapTransform))}function E(y,x){x.matcap&&(y.matcap.value=x.matcap)}function R(y,x){const P=e.get(x).light;y.referencePosition.value.setFromMatrixPosition(P.matrixWorld),y.nearDistance.value=P.shadow.camera.near,y.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:o}}function n2(r,e,n,a){let o={},c={},u=[];const d=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(C,I){const O=I.program;a.uniformBlockBinding(C,O)}function p(C,I){let O=o[C.id];O===void 0&&(y(C),O=v(C),o[C.id]=O,C.addEventListener("dispose",P));const z=I.program;a.updateUBOMapping(C,z);const T=e.render.frame;c[C.id]!==T&&(g(C),c[C.id]=T)}function v(C){const I=_();C.__bindingPointIndex=I;const O=r.createBuffer(),z=C.__size,T=C.usage;return r.bindBuffer(r.UNIFORM_BUFFER,O),r.bufferData(r.UNIFORM_BUFFER,z,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,I,O),O}function _(){for(let C=0;C<d;C++)if(u.indexOf(C)===-1)return u.push(C),C;return nn("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(C){const I=o[C.id],O=C.uniforms,z=C.__cache;r.bindBuffer(r.UNIFORM_BUFFER,I);for(let T=0,B=O.length;T<B;T++){const K=O[T];if(Array.isArray(K))for(let G=0,Y=K.length;G<Y;G++)M(K[G],T,G,z);else M(K,T,0,z)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function M(C,I,O,z){if(R(C,I,O,z)===!0){const T=C.__offset,B=C.value;if(Array.isArray(B)){let K=0;for(let G=0;G<B.length;G++){const Y=B[G],de=x(Y);E(Y,C.__data,K),typeof Y!="number"&&typeof Y!="boolean"&&!Y.isMatrix3&&!ArrayBuffer.isView(Y)&&(K+=de.storage/Float32Array.BYTES_PER_ELEMENT)}}else E(B,C.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,T,C.__data)}}function E(C,I,O){typeof C=="number"||typeof C=="boolean"?I[0]=C:C.isMatrix3?(I[0]=C.elements[0],I[1]=C.elements[1],I[2]=C.elements[2],I[3]=0,I[4]=C.elements[3],I[5]=C.elements[4],I[6]=C.elements[5],I[7]=0,I[8]=C.elements[6],I[9]=C.elements[7],I[10]=C.elements[8],I[11]=0):ArrayBuffer.isView(C)?I.set(new C.constructor(C.buffer,C.byteOffset,I.length)):C.toArray(I,O)}function R(C,I,O,z){const T=C.value,B=I+"_"+O;if(z[B]===void 0)return typeof T=="number"||typeof T=="boolean"?z[B]=T:ArrayBuffer.isView(T)?z[B]=T.slice():z[B]=T.clone(),!0;{const K=z[B];if(typeof T=="number"||typeof T=="boolean"){if(K!==T)return z[B]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(K.equals(T)===!1)return K.copy(T),!0}}return!1}function y(C){const I=C.uniforms;let O=0;const z=16;for(let B=0,K=I.length;B<K;B++){const G=Array.isArray(I[B])?I[B]:[I[B]];for(let Y=0,de=G.length;Y<de;Y++){const Se=G[Y],ae=Array.isArray(Se.value)?Se.value:[Se.value];for(let H=0,k=ae.length;H<k;H++){const ne=ae[H],ve=x(ne),Re=O%z,F=Re%ve.boundary,Q=Re+F;O+=F,Q!==0&&z-Q<ve.storage&&(O+=z-Q),Se.__data=new Float32Array(ve.storage/Float32Array.BYTES_PER_ELEMENT),Se.__offset=O,O+=ve.storage}}}const T=O%z;return T>0&&(O+=z-T),C.__size=O,C.__cache={},this}function x(C){const I={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(I.boundary=4,I.storage=4):C.isVector2?(I.boundary=8,I.storage=8):C.isVector3||C.isColor?(I.boundary=16,I.storage=12):C.isVector4?(I.boundary=16,I.storage=16):C.isMatrix3?(I.boundary=48,I.storage=48):C.isMatrix4?(I.boundary=64,I.storage=64):C.isTexture?Mt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(C)?(I.boundary=16,I.storage=C.byteLength):Mt("WebGLRenderer: Unsupported uniform value type.",C),I}function P(C){const I=C.target;I.removeEventListener("dispose",P);const O=u.indexOf(I.__bindingPointIndex);u.splice(O,1),r.deleteBuffer(o[I.id]),delete o[I.id],delete c[I.id]}function N(){for(const C in o)r.deleteBuffer(o[C]);u=[],o={},c={}}return{bind:m,update:p,dispose:N}}const i2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Wa=null;function a2(){return Wa===null&&(Wa=new Ff(i2,16,16,$r,bi),Wa.name="DFG_LUT",Wa.minFilter=Mi,Wa.magFilter=Mi,Wa.wrapS=Ji,Wa.wrapT=Ji,Wa.generateMipmaps=!1,Wa.needsUpdate=!0),Wa}class s2{constructor(e={}){const{canvas:n=Eb(),context:a=null,depth:o=!0,stencil:c=!1,alpha:u=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:g=!1,outputBufferType:M=va}=e;this.isWebGLRenderer=!0;let E;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");E=a.getContextAttributes().alpha}else E=u;const R=M,y=new Set([Hm,Im,zm]),x=new Set([va,Ka,vc,_c,Fm,Bm]),P=new Uint32Array(4),N=new Int32Array(4),C=new ee;let I=null,O=null;const z=[],T=[];let B=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Za,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const K=this;let G=!1,Y=null,de=null,Se=null,ae=null;this._outputColorSpace=ma;let H=0,k=0,ne=null,ve=-1,Re=null;const F=new Vn,Q=new Vn;let Ne=null;const ze=new qt(0);let Ze=0,re=n.width,Me=n.height,De=1,nt=null,vt=null;const Ke=new Vn(0,0,re,Me),yn=new Vn(0,0,re,Me);let Ut=!1;const It=new vy;let Bt=!1,zt=!1;const Rn=new zn,Un=new ee,bn=new Vn,Cn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let fn=!1;function Sn(){return ne===null?De:1}let j=a;function Ht(A,Z){return n.getContext(A,Z)}try{const A={alpha:!0,depth:o,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:v,failIfMajorPerformanceCaveat:_};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Om}`),n.addEventListener("webglcontextlost",En,!1),n.addEventListener("webglcontextrestored",cn,!1),n.addEventListener("webglcontextcreationerror",Ei,!1),j===null){const Z="webgl2";if(j=Ht(Z,A),j===null)throw Ht(Z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw nn("WebGLRenderer: "+A.message),A}let Gt,U,b,te,he,_e,Pe,We,xe,ye,Fe,et,Ye,Ie,lt,ct,He,q,Be,be,Xe,Qe,Ae;function rt(){Gt=new aA(j),Gt.init(),Xe=new Zw(j,Gt),U=new KT(j,Gt,e,Xe),b=new Yw(j,Gt),U.reversedDepthBuffer&&g&&b.buffers.depth.setReversed(!0),de=j.createFramebuffer(),Se=j.createFramebuffer(),ae=j.createFramebuffer(),te=new oA(j),he=new Uw,_e=new jw(j,Gt,b,he,U,Xe,te),Pe=new iA(K),We=new f1(j),Qe=new jT(j,We),xe=new sA(j,We,te,Qe),ye=new cA(j,xe,We,Qe,te),q=new lA(j,U,_e),lt=new QT(he),Fe=new Lw(K,Pe,Gt,U,Qe,lt),et=new t2(K,he),Ye=new Pw,Ie=new Gw(Gt),He=new YT(K,Pe,b,ye,E,m),ct=new Ww(K,ye,U),Ae=new n2(j,te,U,b),Be=new ZT(j,Gt,te),be=new rA(j,Gt,te),te.programs=Fe.programs,K.capabilities=U,K.extensions=Gt,K.properties=he,K.renderLists=Ye,K.shadowMap=ct,K.state=b,K.info=te}rt(),R!==va&&(B=new fA(R,n.width,n.height,d,o,c));const tt=new $w(K,j);this.xr=tt,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const A=Gt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Gt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return De},this.setPixelRatio=function(A){A!==void 0&&(De=A,this.setSize(re,Me,!1))},this.getSize=function(A){return A.set(re,Me)},this.setSize=function(A,Z,fe=!0){if(tt.isPresenting){Mt("WebGLRenderer: Can't change size while VR device is presenting.");return}re=A,Me=Z,n.width=Math.floor(A*De),n.height=Math.floor(Z*De),fe===!0&&(n.style.width=A+"px",n.style.height=Z+"px"),B!==null&&B.setSize(n.width,n.height),this.setViewport(0,0,A,Z)},this.getDrawingBufferSize=function(A){return A.set(re*De,Me*De).floor()},this.setDrawingBufferSize=function(A,Z,fe){re=A,Me=Z,De=fe,n.width=Math.floor(A*fe),n.height=Math.floor(Z*fe),this.setViewport(0,0,A,Z)},this.setEffects=function(A){if(R===va){nn("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let Z=0;Z<A.length;Z++)if(A[Z].isOutputPass===!0){Mt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}B.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(F)},this.getViewport=function(A){return A.copy(Ke)},this.setViewport=function(A,Z,fe,oe){A.isVector4?Ke.set(A.x,A.y,A.z,A.w):Ke.set(A,Z,fe,oe),b.viewport(F.copy(Ke).multiplyScalar(De).round())},this.getScissor=function(A){return A.copy(yn)},this.setScissor=function(A,Z,fe,oe){A.isVector4?yn.set(A.x,A.y,A.z,A.w):yn.set(A,Z,fe,oe),b.scissor(Q.copy(yn).multiplyScalar(De).round())},this.getScissorTest=function(){return Ut},this.setScissorTest=function(A){b.setScissorTest(Ut=A)},this.setOpaqueSort=function(A){nt=A},this.setTransparentSort=function(A){vt=A},this.getClearColor=function(A){return A.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor(...arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha(...arguments)},this.clear=function(A=!0,Z=!0,fe=!0){let oe=0;if(A){let le=!1;if(ne!==null){const je=ne.texture.format;le=y.has(je)}if(le){const je=ne.texture.type,L=x.has(je),X=He.getClearColor(),ge=He.getClearAlpha(),J=X.r,Oe=X.g,$e=X.b;L?(P[0]=J,P[1]=Oe,P[2]=$e,P[3]=ge,j.clearBufferuiv(j.COLOR,0,P)):(N[0]=J,N[1]=Oe,N[2]=$e,N[3]=ge,j.clearBufferiv(j.COLOR,0,N))}else oe|=j.COLOR_BUFFER_BIT}Z&&(oe|=j.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),fe&&(oe|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),oe!==0&&j.clear(oe)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),Y=A},this.dispose=function(){n.removeEventListener("webglcontextlost",En,!1),n.removeEventListener("webglcontextrestored",cn,!1),n.removeEventListener("webglcontextcreationerror",Ei,!1),He.dispose(),Ye.dispose(),Ie.dispose(),he.dispose(),Pe.dispose(),ye.dispose(),Qe.dispose(),Ae.dispose(),Fe.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",On),tt.removeEventListener("sessionend",Jt),hn.stop()};function En(A){A.preventDefault(),N_("WebGLRenderer: Context Lost."),G=!0}function cn(){N_("WebGLRenderer: Context Restored."),G=!1;const A=te.autoReset,Z=ct.enabled,fe=ct.autoUpdate,oe=ct.needsUpdate,le=ct.type;rt(),te.autoReset=A,ct.enabled=Z,ct.autoUpdate=fe,ct.needsUpdate=oe,ct.type=le}function Ei(A){nn("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ti(A){const Z=A.target;Z.removeEventListener("dispose",Ti),Qa(Z)}function Qa(A){Ua(A),he.remove(A)}function Ua(A){const Z=he.get(A).programs;Z!==void 0&&(Z.forEach(function(fe){Fe.releaseProgram(fe)}),A.isShaderMaterial&&Fe.releaseShaderCache(A))}this.renderBufferDirect=function(A,Z,fe,oe,le,je){Z===null&&(Z=Cn);const L=le.isMesh&&le.matrixWorld.determinantAffine()<0,X=Fa(A,Z,fe,oe,le);b.setMaterial(oe,L);let ge=fe.index,J=1;if(oe.wireframe===!0){if(ge=xe.getWireframeAttribute(fe),ge===void 0)return;J=2}const Oe=fe.drawRange,$e=fe.attributes.position;let Ce=Oe.start*J,xt=(Oe.start+Oe.count)*J;je!==null&&(Ce=Math.max(Ce,je.start*J),xt=Math.min(xt,(je.start+je.count)*J)),ge!==null?(Ce=Math.max(Ce,0),xt=Math.min(xt,ge.count)):$e!=null&&(Ce=Math.max(Ce,0),xt=Math.min(xt,$e.count));const mt=xt-Ce;if(mt<0||mt===1/0)return;Qe.setup(le,oe,X,fe,ge);let ot,Nt=Be;if(ge!==null&&(ot=We.get(ge),Nt=be,Nt.setIndex(ot)),le.isMesh)oe.wireframe===!0?(b.setLineWidth(oe.wireframeLinewidth*Sn()),Nt.setMode(j.LINES)):Nt.setMode(j.TRIANGLES);else if(le.isLine){let Tt=oe.linewidth;Tt===void 0&&(Tt=1),b.setLineWidth(Tt*Sn()),le.isLineSegments?Nt.setMode(j.LINES):le.isLineLoop?Nt.setMode(j.LINE_LOOP):Nt.setMode(j.LINE_STRIP)}else le.isPoints?Nt.setMode(j.POINTS):le.isSprite&&Nt.setMode(j.TRIANGLES);if(le.isBatchedMesh)if(Gt.get("WEBGL_multi_draw"))Nt.renderMultiDraw(le._multiDrawStarts,le._multiDrawCounts,le._multiDrawCount);else{const Tt=le._multiDrawStarts,Ge=le._multiDrawCounts,ft=le._multiDrawCount,bt=ge?We.get(ge).bytesPerElement:1,ht=he.get(oe).currentProgram.getUniforms();for(let wt=0;wt<ft;wt++)ht.setValue(j,"_gl_DrawID",wt),Nt.render(Tt[wt]/bt,Ge[wt])}else if(le.isInstancedMesh)Nt.renderInstances(Ce,mt,le.count);else if(fe.isInstancedBufferGeometry){const Tt=fe._maxInstanceCount!==void 0?fe._maxInstanceCount:1/0,Ge=Math.min(fe.instanceCount,Tt);Nt.renderInstances(Ce,mt,Ge)}else Nt.render(Ce,mt)};function Oa(A,Z,fe){A.transparent===!0&&A.side===ws&&A.forceSinglePass===!1?(A.side=Gi,A.needsUpdate=!0,si(A,Z,fe),A.side=br,A.needsUpdate=!0,si(A,Z,fe),A.side=ws):si(A,Z,fe)}this.compile=function(A,Z,fe=null){fe===null&&(fe=A),O=Ie.get(fe),O.init(Z),T.push(O),fe.traverseVisible(function(le){le.isLight&&le.layers.test(Z.layers)&&(O.pushLight(le),le.castShadow&&O.pushShadow(le))}),A!==fe&&A.traverseVisible(function(le){le.isLight&&le.layers.test(Z.layers)&&(O.pushLight(le),le.castShadow&&O.pushShadow(le))}),O.setupLights();const oe=new Set;return A.traverse(function(le){if(!(le.isMesh||le.isPoints||le.isLine||le.isSprite))return;const je=le.material;if(je)if(Array.isArray(je))for(let L=0;L<je.length;L++){const X=je[L];Oa(X,fe,le),oe.add(X)}else Oa(je,fe,le),oe.add(je)}),O=T.pop(),oe},this.compileAsync=function(A,Z,fe=null){const oe=this.compile(A,Z,fe);return new Promise(le=>{function je(){if(oe.forEach(function(L){he.get(L).currentProgram.isReady()&&oe.delete(L)}),oe.size===0){le(A);return}setTimeout(je,10)}Gt.get("KHR_parallel_shader_compile")!==null?je():setTimeout(je,10)})};let _a=null;function Ai(A){_a&&_a(A)}function On(){hn.stop()}function Jt(){hn.start()}const hn=new My;hn.setAnimationLoop(Ai),typeof self<"u"&&hn.setContext(self),this.setAnimationLoop=function(A){_a=A,tt.setAnimationLoop(A),A===null?hn.stop():hn.start()},tt.addEventListener("sessionstart",On),tt.addEventListener("sessionend",Jt),this.render=function(A,Z){if(Z!==void 0&&Z.isCamera!==!0){nn("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;Y!==null&&Y.renderStart(A,Z);const fe=tt.enabled===!0&&tt.isPresenting===!0,oe=B!==null&&(ne===null||fe)&&B.begin(K,ne);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),Z.parent===null&&Z.matrixWorldAutoUpdate===!0&&Z.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(B===null||B.isCompositing()===!1)&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(Z),Z=tt.getCamera()),A.isScene===!0&&A.onBeforeRender(K,A,Z,ne),O=Ie.get(A,T.length),O.init(Z),O.state.textureUnits=_e.getTextureUnits(),T.push(O),Rn.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),It.setFromProjectionMatrix(Rn,ja,Z.reversedDepth),zt=this.localClippingEnabled,Bt=lt.init(this.clippingPlanes,zt),I=Ye.get(A,z.length),I.init(),z.push(I),tt.enabled===!0&&tt.isPresenting===!0){const L=K.xr.getDepthSensingMesh();L!==null&&Pa(L,Z,-1/0,K.sortObjects)}Pa(A,Z,0,K.sortObjects),I.finish(),K.sortObjects===!0&&I.sort(nt,vt,Z.reversedDepth),fn=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,fn&&He.addToRenderList(I,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Bt===!0&&lt.beginShadows();const le=O.state.shadowsArray;if(ct.render(le,A,Z),Bt===!0&&lt.endShadows(),(oe&&B.hasRenderPass())===!1){const L=I.opaque,X=I.transmissive;if(O.setupLights(),Z.isArrayCamera){const ge=Z.cameras;if(X.length>0)for(let J=0,Oe=ge.length;J<Oe;J++){const $e=ge[J];rn(L,X,A,$e)}fn&&He.render(A);for(let J=0,Oe=ge.length;J<Oe;J++){const $e=ge[J];Wt(I,A,$e,$e.viewport)}}else X.length>0&&rn(L,X,A,Z),fn&&He.render(A),Wt(I,A,Z)}ne!==null&&k===0&&(_e.updateMultisampleRenderTarget(ne),_e.updateRenderTargetMipmap(ne)),oe&&B.end(K),A.isScene===!0&&A.onAfterRender(K,A,Z),Qe.resetDefaultState(),ve=-1,Re=null,T.pop(),T.length>0?(O=T[T.length-1],_e.setTextureUnits(O.state.textureUnits),Bt===!0&&lt.setGlobalState(K.clippingPlanes,O.state.camera)):O=null,z.pop(),z.length>0?I=z[z.length-1]:I=null,Y!==null&&Y.renderEnd()};function Pa(A,Z,fe,oe){if(A.visible===!1)return;if(A.layers.test(Z.layers)){if(A.isGroup)fe=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(Z);else if(A.isLightProbeGrid)O.pushLightProbeGrid(A);else if(A.isLight)O.pushLight(A),A.castShadow&&O.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||It.intersectsSprite(A)){oe&&bn.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Rn);const L=ye.update(A),X=A.material;X.visible&&I.push(A,L,X,fe,bn.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||It.intersectsObject(A))){const L=ye.update(A),X=A.material;if(oe&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),bn.copy(A.boundingSphere.center)):(L.boundingSphere===null&&L.computeBoundingSphere(),bn.copy(L.boundingSphere.center)),bn.applyMatrix4(A.matrixWorld).applyMatrix4(Rn)),Array.isArray(X)){const ge=L.groups;for(let J=0,Oe=ge.length;J<Oe;J++){const $e=ge[J],Ce=X[$e.materialIndex];Ce&&Ce.visible&&I.push(A,L,Ce,fe,bn.z,$e)}}else X.visible&&I.push(A,L,X,fe,bn.z,null)}}const je=A.children;for(let L=0,X=je.length;L<X;L++)Pa(je[L],Z,fe,oe)}function Wt(A,Z,fe,oe){const{opaque:le,transmissive:je,transparent:L}=A;O.setupLightsView(fe),Bt===!0&&lt.setGlobalState(K.clippingPlanes,fe),oe&&b.viewport(F.copy(oe)),le.length>0&&In(le,Z,fe),je.length>0&&In(je,Z,fe),L.length>0&&In(L,Z,fe),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function rn(A,Z,fe,oe){if((fe.isScene===!0?fe.overrideMaterial:null)!==null)return;if(O.state.transmissionRenderTarget[oe.id]===void 0){const Ce=Gt.has("EXT_color_buffer_half_float")||Gt.has("EXT_color_buffer_float");O.state.transmissionRenderTarget[oe.id]=new mi(1,1,{generateMipmaps:!0,type:Ce?bi:va,minFilter:Zr,samples:Math.max(4,U.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Zt.workingColorSpace})}const je=O.state.transmissionRenderTarget[oe.id],L=oe.viewport||F;je.setSize(L.z*K.transmissionResolutionScale,L.w*K.transmissionResolutionScale);const X=K.getRenderTarget(),ge=K.getActiveCubeFace(),J=K.getActiveMipmapLevel();K.setRenderTarget(je),K.getClearColor(ze),Ze=K.getClearAlpha(),Ze<1&&K.setClearColor(16777215,.5),K.clear(),fn&&He.render(fe);const Oe=K.toneMapping;K.toneMapping=Za;const $e=oe.viewport;if(oe.viewport!==void 0&&(oe.viewport=void 0),O.setupLightsView(oe),Bt===!0&&lt.setGlobalState(K.clippingPlanes,oe),In(A,fe,oe),_e.updateMultisampleRenderTarget(je),_e.updateRenderTargetMipmap(je),Gt.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let xt=0,mt=Z.length;xt<mt;xt++){const ot=Z[xt],{object:Nt,geometry:Tt,material:Ge,group:ft}=ot;if(Ge.side===ws&&Nt.layers.test(oe.layers)){const bt=Ge.side;Ge.side=Gi,Ge.needsUpdate=!0,wi(Nt,fe,oe,Tt,Ge,ft),Ge.side=bt,Ge.needsUpdate=!0,Ce=!0}}Ce===!0&&(_e.updateMultisampleRenderTarget(je),_e.updateRenderTargetMipmap(je))}K.setRenderTarget(X,ge,J),K.setClearColor(ze,Ze),$e!==void 0&&(oe.viewport=$e),K.toneMapping=Oe}function In(A,Z,fe){const oe=Z.isScene===!0?Z.overrideMaterial:null;for(let le=0,je=A.length;le<je;le++){const L=A[le],{object:X,geometry:ge,group:J}=L;let Oe=L.material;Oe.allowOverride===!0&&oe!==null&&(Oe=oe),X.layers.test(fe.layers)&&wi(X,Z,fe,ge,Oe,J)}}function wi(A,Z,fe,oe,le,je){A.onBeforeRender(K,Z,fe,oe,le,je),A.modelViewMatrix.multiplyMatrices(fe.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),le.onBeforeRender(K,Z,fe,oe,A,je),le.transparent===!0&&le.side===ws&&le.forceSinglePass===!1?(le.side=Gi,le.needsUpdate=!0,K.renderBufferDirect(fe,Z,oe,le,A,je),le.side=br,le.needsUpdate=!0,K.renderBufferDirect(fe,Z,oe,le,A,je),le.side=ws):K.renderBufferDirect(fe,Z,oe,le,A,je),A.onAfterRender(K,Z,fe,oe,le,je)}function si(A,Z,fe){Z.isScene!==!0&&(Z=Cn);const oe=he.get(A),le=O.state.lights,je=O.state.shadowsArray,L=le.state.version,X=Fe.getParameters(A,le.state,je,Z,fe,O.state.lightProbeGridArray),ge=Fe.getProgramCacheKey(X);let J=oe.programs;oe.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?Z.environment:null,oe.fog=Z.fog;const Oe=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;oe.envMap=Pe.get(A.envMap||oe.environment,Oe),oe.envMapRotation=oe.environment!==null&&A.envMap===null?Z.environmentRotation:A.envMapRotation,J===void 0&&(A.addEventListener("dispose",Ti),J=new Map,oe.programs=J);let $e=J.get(ge);if($e!==void 0){if(oe.currentProgram===$e&&oe.lightsStateVersion===L)return ea(A,X),$e}else X.uniforms=Fe.getUniforms(A),Y!==null&&A.isNodeMaterial&&Y.build(A,fe,X),A.onBeforeCompile(X,K),$e=Fe.acquireProgram(X,ge),J.set(ge,$e),oe.uniforms=X.uniforms;const Ce=oe.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ce.clippingPlanes=lt.uniform),ea(A,X),oe.needsLights=Ns(A),oe.lightsStateVersion=L,oe.needsLights&&(Ce.ambientLightColor.value=le.state.ambient,Ce.lightProbe.value=le.state.probe,Ce.directionalLights.value=le.state.directional,Ce.directionalLightShadows.value=le.state.directionalShadow,Ce.spotLights.value=le.state.spot,Ce.spotLightShadows.value=le.state.spotShadow,Ce.rectAreaLights.value=le.state.rectArea,Ce.ltc_1.value=le.state.rectAreaLTC1,Ce.ltc_2.value=le.state.rectAreaLTC2,Ce.pointLights.value=le.state.point,Ce.pointLightShadows.value=le.state.pointShadow,Ce.hemisphereLights.value=le.state.hemi,Ce.directionalShadowMatrix.value=le.state.directionalShadowMatrix,Ce.spotLightMatrix.value=le.state.spotLightMatrix,Ce.spotLightMap.value=le.state.spotLightMap,Ce.pointShadowMatrix.value=le.state.pointShadowMatrix),oe.lightProbeGrid=O.state.lightProbeGridArray.length>0,oe.currentProgram=$e,oe.uniformsList=null,$e}function gi(A){if(A.uniformsList===null){const Z=A.currentProgram.getUniforms();A.uniformsList=Cf.seqWithValue(Z.seq,A.uniforms)}return A.uniformsList}function ea(A,Z){const fe=he.get(A);fe.outputColorSpace=Z.outputColorSpace,fe.batching=Z.batching,fe.batchingColor=Z.batchingColor,fe.instancing=Z.instancing,fe.instancingColor=Z.instancingColor,fe.instancingMorph=Z.instancingMorph,fe.skinning=Z.skinning,fe.morphTargets=Z.morphTargets,fe.morphNormals=Z.morphNormals,fe.morphColors=Z.morphColors,fe.morphTargetsCount=Z.morphTargetsCount,fe.numClippingPlanes=Z.numClippingPlanes,fe.numIntersection=Z.numClipIntersection,fe.vertexAlphas=Z.vertexAlphas,fe.vertexTangents=Z.vertexTangents,fe.toneMapping=Z.toneMapping}function Ja(A,Z){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;C.setFromMatrixPosition(Z.matrixWorld);for(let fe=0,oe=A.length;fe<oe;fe++){const le=A[fe];if(le.texture!==null&&le.boundingBox.containsPoint(C))return le}return null}function Fa(A,Z,fe,oe,le){Z.isScene!==!0&&(Z=Cn),_e.resetTextureUnits();const je=Z.fog,L=oe.isMeshStandardMaterial||oe.isMeshLambertMaterial||oe.isMeshPhongMaterial?Z.environment:null,X=ne===null?K.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Zt.workingColorSpace,ge=oe.isMeshStandardMaterial||oe.isMeshLambertMaterial&&!oe.envMap||oe.isMeshPhongMaterial&&!oe.envMap,J=Pe.get(oe.envMap||L,ge),Oe=oe.vertexColors===!0&&!!fe.attributes.color&&fe.attributes.color.itemSize===4,$e=!!fe.attributes.tangent&&(!!oe.normalMap||oe.anisotropy>0),Ce=!!fe.morphAttributes.position,xt=!!fe.morphAttributes.normal,mt=!!fe.morphAttributes.color;let ot=Za;oe.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(ot=K.toneMapping);const Nt=fe.morphAttributes.position||fe.morphAttributes.normal||fe.morphAttributes.color,Tt=Nt!==void 0?Nt.length:0,Ge=he.get(oe),ft=O.state.lights;if(Bt===!0&&(zt===!0||A!==Re)){const an=A===Re&&oe.id===ve;lt.setState(oe,A,an)}let bt=!1;oe.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==ft.state.version||Ge.outputColorSpace!==X||le.isBatchedMesh&&Ge.batching===!1||!le.isBatchedMesh&&Ge.batching===!0||le.isBatchedMesh&&Ge.batchingColor===!0&&le.colorTexture===null||le.isBatchedMesh&&Ge.batchingColor===!1&&le.colorTexture!==null||le.isInstancedMesh&&Ge.instancing===!1||!le.isInstancedMesh&&Ge.instancing===!0||le.isSkinnedMesh&&Ge.skinning===!1||!le.isSkinnedMesh&&Ge.skinning===!0||le.isInstancedMesh&&Ge.instancingColor===!0&&le.instanceColor===null||le.isInstancedMesh&&Ge.instancingColor===!1&&le.instanceColor!==null||le.isInstancedMesh&&Ge.instancingMorph===!0&&le.morphTexture===null||le.isInstancedMesh&&Ge.instancingMorph===!1&&le.morphTexture!==null||Ge.envMap!==J||oe.fog===!0&&Ge.fog!==je||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==lt.numPlanes||Ge.numIntersection!==lt.numIntersection)||Ge.vertexAlphas!==Oe||Ge.vertexTangents!==$e||Ge.morphTargets!==Ce||Ge.morphNormals!==xt||Ge.morphColors!==mt||Ge.toneMapping!==ot||Ge.morphTargetsCount!==Tt||!!Ge.lightProbeGrid!=O.state.lightProbeGridArray.length>0)&&(bt=!0):(bt=!0,Ge.__version=oe.version);let ht=Ge.currentProgram;bt===!0&&(ht=si(oe,Z,le),Y&&oe.isNodeMaterial&&Y.onUpdateProgram(oe,ht,Ge));let wt=!1,gn=!1,ei=!1;const $t=ht.getUniforms(),en=Ge.uniforms;if(b.useProgram(ht.program)&&(wt=!0,gn=!0,ei=!0),oe.id!==ve&&(ve=oe.id,gn=!0),Ge.needsLights){const an=Ja(O.state.lightProbeGridArray,le);Ge.lightProbeGrid!==an&&(Ge.lightProbeGrid=an,gn=!0)}if(wt||Re!==A){b.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),$t.setValue(j,"projectionMatrix",A.projectionMatrix),$t.setValue(j,"viewMatrix",A.matrixWorldInverse);const dt=$t.map.cameraPosition;dt!==void 0&&dt.setValue(j,Un.setFromMatrixPosition(A.matrixWorld)),U.logarithmicDepthBuffer&&$t.setValue(j,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(oe.isMeshPhongMaterial||oe.isMeshToonMaterial||oe.isMeshLambertMaterial||oe.isMeshBasicMaterial||oe.isMeshStandardMaterial||oe.isShaderMaterial)&&$t.setValue(j,"isOrthographic",A.isOrthographicCamera===!0),Re!==A&&(Re=A,gn=!0,ei=!0)}if(Ge.needsLights&&(ft.state.directionalShadowMap.length>0&&$t.setValue(j,"directionalShadowMap",ft.state.directionalShadowMap,_e),ft.state.spotShadowMap.length>0&&$t.setValue(j,"spotShadowMap",ft.state.spotShadowMap,_e),ft.state.pointShadowMap.length>0&&$t.setValue(j,"pointShadowMap",ft.state.pointShadowMap,_e)),le.isSkinnedMesh){$t.setOptional(j,le,"bindMatrix"),$t.setOptional(j,le,"bindMatrixInverse");const an=le.skeleton;an&&(an.boneTexture===null&&an.computeBoneTexture(),$t.setValue(j,"boneTexture",an.boneTexture,_e))}le.isBatchedMesh&&($t.setOptional(j,le,"batchingTexture"),$t.setValue(j,"batchingTexture",le._matricesTexture,_e),$t.setOptional(j,le,"batchingIdTexture"),$t.setValue(j,"batchingIdTexture",le._indirectTexture,_e),$t.setOptional(j,le,"batchingColorTexture"),le._colorsTexture!==null&&$t.setValue(j,"batchingColorTexture",le._colorsTexture,_e));const Ri=fe.morphAttributes;if((Ri.position!==void 0||Ri.normal!==void 0||Ri.color!==void 0)&&q.update(le,fe,ht),(gn||Ge.receiveShadow!==le.receiveShadow)&&(Ge.receiveShadow=le.receiveShadow,$t.setValue(j,"receiveShadow",le.receiveShadow)),(oe.isMeshStandardMaterial||oe.isMeshLambertMaterial||oe.isMeshPhongMaterial)&&oe.envMap===null&&Z.environment!==null&&(en.envMapIntensity.value=Z.environmentIntensity),en.dfgLUT!==void 0&&(en.dfgLUT.value=a2()),gn){if($t.setValue(j,"toneMappingExposure",K.toneMappingExposure),Ge.needsLights&&Bn(en,ei),je&&oe.fog===!0&&et.refreshFogUniforms(en,je),et.refreshMaterialUniforms(en,oe,De,Me,O.state.transmissionRenderTarget[A.id]),Ge.needsLights&&Ge.lightProbeGrid){const an=Ge.lightProbeGrid;en.probesSH.value=an.texture,en.probesMin.value.copy(an.boundingBox.min),en.probesMax.value.copy(an.boundingBox.max),en.probesResolution.value.copy(an.resolution)}Cf.upload(j,gi(Ge),en,_e)}if(oe.isShaderMaterial&&oe.uniformsNeedUpdate===!0&&(Cf.upload(j,gi(Ge),en,_e),oe.uniformsNeedUpdate=!1),oe.isSpriteMaterial&&$t.setValue(j,"center",le.center),$t.setValue(j,"modelViewMatrix",le.modelViewMatrix),$t.setValue(j,"normalMatrix",le.normalMatrix),$t.setValue(j,"modelMatrix",le.matrixWorld),oe.uniformsGroups!==void 0){const an=oe.uniformsGroups;for(let dt=0,ki=an.length;dt<ki;dt++){const xa=an[dt];Ae.update(xa,ht),Ae.bind(xa,ht)}}return ht}function Bn(A,Z){A.ambientLightColor.needsUpdate=Z,A.lightProbe.needsUpdate=Z,A.directionalLights.needsUpdate=Z,A.directionalLightShadows.needsUpdate=Z,A.pointLights.needsUpdate=Z,A.pointLightShadows.needsUpdate=Z,A.spotLights.needsUpdate=Z,A.spotLightShadows.needsUpdate=Z,A.rectAreaLights.needsUpdate=Z,A.hemisphereLights.needsUpdate=Z}function Ns(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(A,Z,fe){const oe=he.get(A);oe.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,oe.__autoAllocateDepthBuffer===!1&&(oe.__useRenderToTexture=!1),he.get(A.texture).__webglTexture=Z,he.get(A.depthTexture).__webglTexture=oe.__autoAllocateDepthBuffer?void 0:fe,oe.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,Z){const fe=he.get(A);fe.__webglFramebuffer=Z,fe.__useDefaultFramebuffer=Z===void 0},this.setRenderTarget=function(A,Z=0,fe=0){ne=A,H=Z,k=fe;let oe=null,le=!1,je=!1;if(A){const X=he.get(A);if(X.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(j.FRAMEBUFFER,X.__webglFramebuffer),F.copy(A.viewport),Q.copy(A.scissor),Ne=A.scissorTest,b.viewport(F),b.scissor(Q),b.setScissorTest(Ne),ve=-1;return}else if(X.__webglFramebuffer===void 0)_e.setupRenderTarget(A);else if(X.__hasExternalTextures)_e.rebindTextures(A,he.get(A.texture).__webglTexture,he.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Oe=A.depthTexture;if(X.__boundDepthTexture!==Oe){if(Oe!==null&&he.has(Oe)&&(A.width!==Oe.image.width||A.height!==Oe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");_e.setupDepthRenderbuffer(A)}}const ge=A.texture;(ge.isData3DTexture||ge.isDataArrayTexture||ge.isCompressedArrayTexture)&&(je=!0);const J=he.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(J[Z])?oe=J[Z][fe]:oe=J[Z],le=!0):A.samples>0&&_e.useMultisampledRTT(A)===!1?oe=he.get(A).__webglMultisampledFramebuffer:Array.isArray(J)?oe=J[fe]:oe=J,F.copy(A.viewport),Q.copy(A.scissor),Ne=A.scissorTest}else F.copy(Ke).multiplyScalar(De).floor(),Q.copy(yn).multiplyScalar(De).floor(),Ne=Ut;if(fe!==0&&(oe=de),b.bindFramebuffer(j.FRAMEBUFFER,oe)&&b.drawBuffers(A,oe),b.viewport(F),b.scissor(Q),b.setScissorTest(Ne),le){const X=he.get(A.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+Z,X.__webglTexture,fe)}else if(je){const X=Z;for(let ge=0;ge<A.textures.length;ge++){const J=he.get(A.textures[ge]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+ge,J.__webglTexture,fe,X)}}else if(A!==null&&fe!==0){const X=he.get(A.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,X.__webglTexture,fe)}ve=-1},this.readRenderTargetPixels=function(A,Z,fe,oe,le,je,L,X=0){if(!(A&&A.isWebGLRenderTarget)){nn("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ge=he.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&L!==void 0&&(ge=ge[L]),ge){b.bindFramebuffer(j.FRAMEBUFFER,ge);try{const J=A.textures[X],Oe=J.format,$e=J.type;if(A.textures.length>1&&j.readBuffer(j.COLOR_ATTACHMENT0+X),!U.textureFormatReadable(Oe)){nn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!U.textureTypeReadable($e)){nn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Z>=0&&Z<=A.width-oe&&fe>=0&&fe<=A.height-le&&j.readPixels(Z,fe,oe,le,Xe.convert(Oe),Xe.convert($e),je)}finally{const J=ne!==null?he.get(ne).__webglFramebuffer:null;b.bindFramebuffer(j.FRAMEBUFFER,J)}}},this.readRenderTargetPixelsAsync=async function(A,Z,fe,oe,le,je,L,X=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ge=he.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&L!==void 0&&(ge=ge[L]),ge)if(Z>=0&&Z<=A.width-oe&&fe>=0&&fe<=A.height-le){b.bindFramebuffer(j.FRAMEBUFFER,ge);const J=A.textures[X],Oe=J.format,$e=J.type;if(A.textures.length>1&&j.readBuffer(j.COLOR_ATTACHMENT0+X),!U.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!U.textureTypeReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ce=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,Ce),j.bufferData(j.PIXEL_PACK_BUFFER,je.byteLength,j.STREAM_READ),j.readPixels(Z,fe,oe,le,Xe.convert(Oe),Xe.convert($e),0);const xt=ne!==null?he.get(ne).__webglFramebuffer:null;b.bindFramebuffer(j.FRAMEBUFFER,xt);const mt=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await Tb(j,mt,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,Ce),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,je),j.deleteBuffer(Ce),j.deleteSync(mt),je}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,Z=null,fe=0){const oe=Math.pow(2,-fe),le=Math.floor(A.image.width*oe),je=Math.floor(A.image.height*oe),L=Z!==null?Z.x:0,X=Z!==null?Z.y:0;_e.setTexture2D(A,0),j.copyTexSubImage2D(j.TEXTURE_2D,fe,0,0,L,X,le,je),b.unbindTexture()},this.copyTextureToTexture=function(A,Z,fe=null,oe=null,le=0,je=0){let L,X,ge,J,Oe,$e,Ce,xt,mt;const ot=A.isCompressedTexture?A.mipmaps[je]:A.image;if(fe!==null)L=fe.max.x-fe.min.x,X=fe.max.y-fe.min.y,ge=fe.isBox3?fe.max.z-fe.min.z:1,J=fe.min.x,Oe=fe.min.y,$e=fe.isBox3?fe.min.z:0;else{const en=Math.pow(2,-le);L=Math.floor(ot.width*en),X=Math.floor(ot.height*en),A.isDataArrayTexture?ge=ot.depth:A.isData3DTexture?ge=Math.floor(ot.depth*en):ge=1,J=0,Oe=0,$e=0}oe!==null?(Ce=oe.x,xt=oe.y,mt=oe.z):(Ce=0,xt=0,mt=0);const Nt=Xe.convert(Z.format),Tt=Xe.convert(Z.type);let Ge;Z.isData3DTexture?(_e.setTexture3D(Z,0),Ge=j.TEXTURE_3D):Z.isDataArrayTexture||Z.isCompressedArrayTexture?(_e.setTexture2DArray(Z,0),Ge=j.TEXTURE_2D_ARRAY):(_e.setTexture2D(Z,0),Ge=j.TEXTURE_2D),b.activeTexture(j.TEXTURE0),b.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,Z.flipY),b.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),b.pixelStorei(j.UNPACK_ALIGNMENT,Z.unpackAlignment);const ft=b.getParameter(j.UNPACK_ROW_LENGTH),bt=b.getParameter(j.UNPACK_IMAGE_HEIGHT),ht=b.getParameter(j.UNPACK_SKIP_PIXELS),wt=b.getParameter(j.UNPACK_SKIP_ROWS),gn=b.getParameter(j.UNPACK_SKIP_IMAGES);b.pixelStorei(j.UNPACK_ROW_LENGTH,ot.width),b.pixelStorei(j.UNPACK_IMAGE_HEIGHT,ot.height),b.pixelStorei(j.UNPACK_SKIP_PIXELS,J),b.pixelStorei(j.UNPACK_SKIP_ROWS,Oe),b.pixelStorei(j.UNPACK_SKIP_IMAGES,$e);const ei=A.isDataArrayTexture||A.isData3DTexture,$t=Z.isDataArrayTexture||Z.isData3DTexture;if(A.isDepthTexture){const en=he.get(A),Ri=he.get(Z),an=he.get(en.__renderTarget),dt=he.get(Ri.__renderTarget);b.bindFramebuffer(j.READ_FRAMEBUFFER,an.__webglFramebuffer),b.bindFramebuffer(j.DRAW_FRAMEBUFFER,dt.__webglFramebuffer);for(let ki=0;ki<ge;ki++)ei&&(j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,he.get(A).__webglTexture,le,$e+ki),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,he.get(Z).__webglTexture,je,mt+ki)),j.blitFramebuffer(J,Oe,L,X,Ce,xt,L,X,j.DEPTH_BUFFER_BIT,j.NEAREST);b.bindFramebuffer(j.READ_FRAMEBUFFER,null),b.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(le!==0||A.isRenderTargetTexture||he.has(A)){const en=he.get(A),Ri=he.get(Z);b.bindFramebuffer(j.READ_FRAMEBUFFER,Se),b.bindFramebuffer(j.DRAW_FRAMEBUFFER,ae);for(let an=0;an<ge;an++)ei?j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,en.__webglTexture,le,$e+an):j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,en.__webglTexture,le),$t?j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,Ri.__webglTexture,je,mt+an):j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,Ri.__webglTexture,je),le!==0?j.blitFramebuffer(J,Oe,L,X,Ce,xt,L,X,j.COLOR_BUFFER_BIT,j.NEAREST):$t?j.copyTexSubImage3D(Ge,je,Ce,xt,mt+an,J,Oe,L,X):j.copyTexSubImage2D(Ge,je,Ce,xt,J,Oe,L,X);b.bindFramebuffer(j.READ_FRAMEBUFFER,null),b.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else $t?A.isDataTexture||A.isData3DTexture?j.texSubImage3D(Ge,je,Ce,xt,mt,L,X,ge,Nt,Tt,ot.data):Z.isCompressedArrayTexture?j.compressedTexSubImage3D(Ge,je,Ce,xt,mt,L,X,ge,Nt,ot.data):j.texSubImage3D(Ge,je,Ce,xt,mt,L,X,ge,Nt,Tt,ot):A.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,je,Ce,xt,L,X,Nt,Tt,ot.data):A.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,je,Ce,xt,ot.width,ot.height,Nt,ot.data):j.texSubImage2D(j.TEXTURE_2D,je,Ce,xt,L,X,Nt,Tt,ot);b.pixelStorei(j.UNPACK_ROW_LENGTH,ft),b.pixelStorei(j.UNPACK_IMAGE_HEIGHT,bt),b.pixelStorei(j.UNPACK_SKIP_PIXELS,ht),b.pixelStorei(j.UNPACK_SKIP_ROWS,wt),b.pixelStorei(j.UNPACK_SKIP_IMAGES,gn),je===0&&Z.generateMipmaps&&j.generateMipmap(Ge),b.unbindTexture()},this.initRenderTarget=function(A){he.get(A).__webglFramebuffer===void 0&&_e.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?_e.setTextureCube(A,0):A.isData3DTexture?_e.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?_e.setTexture2DArray(A,0):_e.setTexture2D(A,0),b.unbindTexture()},this.resetState=function(){H=0,k=0,ne=null,b.reset(),Qe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ja}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=Zt._getDrawingBufferColorSpace(e),n.unpackColorSpace=Zt._getUnpackColorSpace()}}const Qr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class ul{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const r2=new Yf(-1,1,1,-1,0,1);class o2 extends ni{constructor(){super(),this.setAttribute("position",new $i([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new $i([0,2,0,0,2,0],2))}}const l2=new o2;class If{constructor(e){this._mesh=new La(l2,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,r2)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class c2 extends ul{constructor(e,n="tDiffuse"){super(),this.textureID=n,this.uniforms=null,this.material=null,e instanceof wn?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=al.clone(e.uniforms),this.material=new wn({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new If(this.material)}render(e,n,a){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=a.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Cx extends ul{constructor(e,n){super(),this.scene=e,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,n,a){const o=e.getContext(),c=e.state;c.buffers.color.setMask(!1),c.buffers.depth.setMask(!1),c.buffers.color.setLocked(!0),c.buffers.depth.setLocked(!0);let u,d;this.inverse?(u=0,d=1):(u=1,d=0),c.buffers.stencil.setTest(!0),c.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),c.buffers.stencil.setFunc(o.ALWAYS,u,4294967295),c.buffers.stencil.setClear(d),c.buffers.stencil.setLocked(!0),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),c.buffers.color.setLocked(!1),c.buffers.depth.setLocked(!1),c.buffers.color.setMask(!0),c.buffers.depth.setMask(!0),c.buffers.stencil.setLocked(!1),c.buffers.stencil.setFunc(o.EQUAL,1,4294967295),c.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),c.buffers.stencil.setLocked(!0)}}class u2 extends ul{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class f2{constructor(e,n){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),n===void 0){const a=e.getSize(new Dt);this._width=a.width,this._height=a.height,n=new mi(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:bi}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new c2(Qr),this.copyPass.material.blending=Na,this.timer=new l1}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,n){this.passes.splice(n,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const n=this.passes.indexOf(e);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(e){for(let n=e+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const n=this.renderer.getRenderTarget();let a=!1;for(let o=0,c=this.passes.length;o<c;o++){const u=this.passes[o];if(u.enabled!==!1){if(u.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(o),u.render(this.renderer,this.writeBuffer,this.readBuffer,e,a),u.needsSwap){if(a){const d=this.renderer.getContext(),m=this.renderer.state.buffers.stencil;m.setFunc(d.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),m.setFunc(d.EQUAL,1,4294967295)}this.swapBuffers()}Cx!==void 0&&(u instanceof Cx?a=!0:u instanceof u2&&(a=!1))}}this.renderer.setRenderTarget(n)}reset(e){if(e===void 0){const n=this.renderer.getSize(new Dt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,n){this._width=e,this._height=n;const a=this._width*this._pixelRatio,o=this._height*this._pixelRatio;this.renderTarget1.setSize(a,o),this.renderTarget2.setSize(a,o);for(let c=0;c<this.passes.length;c++)this.passes[c].setSize(a,o)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class h2 extends ul{constructor(e,n,a=null,o=null,c=null){super(),this.scene=e,this.camera=n,this.overrideMaterial=a,this.clearColor=o,this.clearAlpha=c,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new qt}render(e,n,a){const o=e.autoClear;e.autoClear=!1;let c,u;this.overrideMaterial!==null&&(u=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(c=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(c),this.overrideMaterial!==null&&(this.scene.overrideMaterial=u),e.autoClear=o}}const d2={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new qt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class sl extends ul{constructor(e,n=1,a,o){super(),this.strength=n,this.radius=a,this.threshold=o,this.resolution=e!==void 0?new Dt(e.x,e.y):new Dt(256,256),this.clearColor=new qt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let c=Math.round(this.resolution.x/2),u=Math.round(this.resolution.y/2);this.renderTargetBright=new mi(c,u,{type:bi}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let v=0;v<this.nMips;v++){const _=new mi(c,u,{type:bi});_.texture.name="UnrealBloomPass.h"+v,_.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(_);const g=new mi(c,u,{type:bi});g.texture.name="UnrealBloomPass.v"+v,g.texture.generateMipmaps=!1,this.renderTargetsVertical.push(g),c=Math.round(c/2),u=Math.round(u/2)}const d=d2;this.highPassUniforms=al.clone(d.uniforms),this.highPassUniforms.luminosityThreshold.value=o,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new wn({uniforms:this.highPassUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader}),this.separableBlurMaterials=[];const m=[6,10,14,18,22];c=Math.round(this.resolution.x/2),u=Math.round(this.resolution.y/2);for(let v=0;v<this.nMips;v++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(m[v])),this.separableBlurMaterials[v].uniforms.invSize.value=new Dt(1/c,1/u),c=Math.round(c/2),u=Math.round(u/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const p=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=p,this.bloomTintColors=[new ee(1,1,1),new ee(1,1,1),new ee(1,1,1),new ee(1,1,1),new ee(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=al.clone(Qr.uniforms),this.blendMaterial=new wn({uniforms:this.copyUniforms,vertexShader:Qr.vertexShader,fragmentShader:Qr.fragmentShader,premultipliedAlpha:!0,blending:As,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new qt,this._oldClearAlpha=1,this._basic=new qm,this._fsQuad=new If(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,n){let a=Math.round(e/2),o=Math.round(n/2);this.renderTargetBright.setSize(a,o);for(let c=0;c<this.nMips;c++)this.renderTargetsHorizontal[c].setSize(a,o),this.renderTargetsVertical[c].setSize(a,o),this.separableBlurMaterials[c].uniforms.invSize.value=new Dt(1/a,1/o),a=Math.round(a/2),o=Math.round(o/2)}render(e,n,a,o,c){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const u=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),c&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=a.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=a.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let d=this.renderTargetBright;for(let m=0;m<this.nMips;m++)this._fsQuad.material=this.separableBlurMaterials[m],this.separableBlurMaterials[m].uniforms.colorTexture.value=d.texture,this.separableBlurMaterials[m].uniforms.direction.value=sl.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[m]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[m].uniforms.colorTexture.value=this.renderTargetsHorizontal[m].texture,this.separableBlurMaterials[m].uniforms.direction.value=sl.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[m]),e.clear(),this._fsQuad.render(e),d=this.renderTargetsVertical[m];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,c&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(a),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=u}_getSeparableBlurMaterial(e){const n=[],a=e/3;for(let o=0;o<e;o++)n.push(.39894*Math.exp(-.5*o*o/(a*a))/a);return new wn({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Dt(.5,.5)},direction:{value:new Dt(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new wn({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}sl.BlurDirectionX=new Dt(1,0);sl.BlurDirectionY=new Dt(0,1);const Cp={uniforms:{damp:{value:.96},tOld:{value:null},tNew:{value:null}},vertexShader:`

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

		}`};class p2 extends ul{constructor(e=.96){super(),this.uniforms=al.clone(Cp.uniforms),this.damp=e,this.compFsMaterial=new wn({uniforms:this.uniforms,vertexShader:Cp.vertexShader,fragmentShader:Cp.fragmentShader}),this.copyFsMaterial=new wn({uniforms:al.clone(Qr.uniforms),vertexShader:Qr.vertexShader,fragmentShader:Qr.fragmentShader,blending:Na,depthTest:!1,depthWrite:!1}),this._textureComp=new mi(window.innerWidth,window.innerHeight,{magFilter:Ln,type:bi}),this._textureOld=new mi(window.innerWidth,window.innerHeight,{magFilter:Ln,type:bi}),this._compFsQuad=new If(this.compFsMaterial),this._copyFsQuad=new If(this.copyFsMaterial)}get damp(){return this.uniforms.damp.value}set damp(e){this.uniforms.damp.value=e}render(e,n,a){this.uniforms.tOld.value=this._textureOld.texture,this.uniforms.tNew.value=a.texture,e.setRenderTarget(this._textureComp),this._compFsQuad.render(e),this._copyFsQuad.material.uniforms.tDiffuse.value=this._textureComp.texture,this.renderToScreen?(e.setRenderTarget(null),this._copyFsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(),this._copyFsQuad.render(e));const o=this._textureOld;this._textureOld=this._textureComp,this._textureComp=o}setSize(e,n){this._textureComp.setSize(e,n),this._textureOld.setSize(e,n)}dispose(){this._textureComp.dispose(),this._textureOld.dispose(),this.compFsMaterial.dispose(),this.copyFsMaterial.dispose(),this._compFsQuad.dispose(),this._copyFsQuad.dispose()}}const m2=`
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
`,Dx=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,Dy=`
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
`,g2=`
  ${Dy}
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
`,v2=`
  ${Dy}

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
`,vr={stiffness:3.5,damping:1.15,push:5.5,radius:.18,curl:.12,swirl:1.2,music:.4},_2=1/30,x2=.42,y2=14,Nx=6;class S2{constructor(e,n,a){se(this,"renderer");se(this,"count");se(this,"size");se(this,"scene",new py);se(this,"cam",new Yf(-1,1,1,-1,0,1));se(this,"quad");se(this,"geo");se(this,"velMat");se(this,"offMat");se(this,"uniforms");se(this,"baseTex");se(this,"offRT",[]);se(this,"velRT",[]);se(this,"cur",0);se(this,"time",0);se(this,"live",!0);se(this,"dead");se(this,"clearColor",new qt);this.renderer=e,this.count=n;let o=1;for(;o*o<n;)o*=2;this.size=o;const c=new Float32Array(o*o*4);for(let g=0;g<n;g++)c[g*4]=a[g*3],c[g*4+1]=a[g*3+1],c[g*4+2]=a[g*3+2],c[g*4+3]=1;this.baseTex=new Ff(c,o,o,Ni,Hi),this.baseTex.minFilter=Ln,this.baseTex.magFilter=Ln,this.baseTex.wrapS=Ji,this.baseTex.wrapT=Ji,this.baseTex.generateMipmaps=!1,this.baseTex.needsUpdate=!0,this.dead=new Ff(new Float32Array(4),1,1,Ni,Hi),this.dead.needsUpdate=!0;const u=e.extensions,d=u.has("EXT_color_buffer_half_float")||u.has("EXT_color_buffer_float"),m=u.has("EXT_color_buffer_float"),p=d?bi:Hi;this.live=d||m;const v=()=>new mi(o,o,{type:p,format:Ni,minFilter:Ln,magFilter:Ln,wrapS:Ji,wrapT:Ji,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1});this.live&&(this.offRT=[v(),v()],this.velRT=[v(),v()]),this.uniforms={uOff:{value:null},uVel:{value:null},uBase:{value:this.baseTex},uHand:{value:new ee},uHandVel:{value:new ee},uHandStr:{value:0},uDt:{value:0},uTime:{value:0},uStiff:{value:vr.stiffness},uDamp:{value:vr.damping},uPush:{value:vr.push},uDrag:{value:vr.push*.5},uRadius:{value:vr.radius},uCurl:{value:vr.curl},uSwirl:{value:vr.swirl},uViewAxis:{value:new ee(0,0,1)},uBands:{value:new Float32Array(24)},uKick:{value:0},uMusic:{value:vr.music},uMaxOff:{value:x2},uMaxVel:{value:y2}},this.geo=new ni,this.geo.setAttribute("position",new tn(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),this.geo.setAttribute("uv",new tn(new Float32Array([0,0,2,0,0,2]),2));const _={depthTest:!1,depthWrite:!1};this.velMat=new wn({uniforms:this.uniforms,vertexShader:Dx,fragmentShader:g2.replace("__SNOISE__",m2),..._}),this.offMat=new wn({uniforms:this.uniforms,vertexShader:Dx,fragmentShader:v2,..._}),this.quad=new La(this.geo,this.velMat),this.quad.frustumCulled=!1,this.scene.add(this.quad),this.clearTargets()}clearTargets(){if(!this.live)return;const e=this.renderer,n=e.getRenderTarget();e.getClearColor(this.clearColor);const a=e.getClearAlpha();e.setClearColor(0,0);for(const o of[...this.offRT,...this.velRT])e.setRenderTarget(o),e.clear(!0,!1,!1);e.setClearColor(this.clearColor,a),e.setRenderTarget(n)}get offsetTexture(){return this.live?this.offRT[this.cur].texture:this.dead}get texSize(){return this.size}get particleCount(){return this.count}get active(){return this.live}setViewAxis(e){this.uniforms.uViewAxis.value.copy(e).normalize()}setAudio(e,n){const a=this.uniforms.uBands.value;for(let o=0;o<24;o++)a[o]=e[o];this.uniforms.uKick.value=Number.isFinite(n)?Math.max(0,Math.min(4,n)):0}setHand(e,n,a){this.uniforms.uHand.value.copy(e);const o=this.uniforms.uHandVel.value;o.copy(n);const c=o.length();c>Nx&&o.multiplyScalar(Nx/c),this.uniforms.uHandStr.value=Math.max(0,Math.min(1,a))}setTuning(e){if(e.stiffness!==void 0&&(this.uniforms.uStiff.value=Math.max(0,Math.min(600,e.stiffness))),e.damping!==void 0&&(this.uniforms.uDamp.value=Math.max(0,Math.min(60,e.damping))),e.swirl!==void 0&&(this.uniforms.uSwirl.value=Math.max(0,Math.min(4,e.swirl))),e.music!==void 0&&(this.uniforms.uMusic.value=Math.max(0,Math.min(20,e.music))),e.push!==void 0){const n=Math.max(0,Math.min(40,e.push));this.uniforms.uPush.value=n,this.uniforms.uDrag.value=n*.5}e.radius!==void 0&&(this.uniforms.uRadius.value=Math.max(.01,Math.min(4,e.radius))),e.curl!==void 0&&(this.uniforms.uCurl.value=Math.max(0,Math.min(8,e.curl)))}step(e){if(!this.live||!Number.isFinite(e)||e<=0)return;const n=Math.min(e,_2);this.time+=n,this.uniforms.uDt.value=n,this.uniforms.uTime.value=this.time;const a=this.renderer,o=a.getRenderTarget(),c=1-this.cur;this.uniforms.uOff.value=this.offRT[this.cur].texture,this.uniforms.uVel.value=this.velRT[this.cur].texture,this.quad.material=this.velMat,a.setRenderTarget(this.velRT[c]),a.render(this.scene,this.cam),this.uniforms.uVel.value=this.velRT[c].texture,this.quad.material=this.offMat,a.setRenderTarget(this.offRT[c]),a.render(this.scene,this.cam),a.setRenderTarget(o),this.cur=c}resize(){}dispose(){for(const e of[...this.offRT,...this.velRT])e.dispose();this.baseTex.dispose(),this.dead.dispose(),this.geo.dispose(),this.velMat.dispose(),this.offMat.dispose()}}const Ca=108e3,M2=.55,ff=2600,_r=3600,fc=2200,b2=.5,Lx=.88,Hf=512,E2=(()=>{const r=new Ff(new Float32Array([0,0,0,0]),1,1,Ni,Hi);return r.minFilter=Ln,r.magFilter=Ln,r.generateMipmaps=!1,r.needsUpdate=!0,r})(),Dp=r=>(r%Hf+.5)/Hf,Np=r=>(Math.floor(r/Hf)+.5)/Hf,hc=2600,Lp=4200,hf=`
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
`,T2=`
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
`,A2=`
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
`,w2=`
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
`,R2=`
  precision mediump float;
  varying float vFade;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float m = smoothstep(0.5, 0.12, length(uv));
    gl_FragColor = vec4(vec3(0.95) * vFade * m, 1.0);
  }
`,C2=`
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
`,D2=`
  precision mediump float;
  varying float vA;
  void main() {
    gl_FragColor = vec4(vec3(0.9), vA);
  }
`,N2=`
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
`,L2=`
  precision mediump float;
  varying float vHeat;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float m = smoothstep(0.5, 0.06, length(uv));
    gl_FragColor = vec4(vec3(1.0) * vHeat * m, 1.0);
  }
`,U2=`
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
`,O2=`
  precision mediump float;
  varying float vA;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float m = smoothstep(0.5, 0.1, length(uv));
    gl_FragColor = vec4(vec3(0.95) * vA * m, 1.0);
  }
`,P2=`
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
`,F2=`
  precision mediump float;
  varying float vA;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float m = smoothstep(0.5, 0.15, length(uv));
    gl_FragColor = vec4(vec3(0.85) * vA * m, 1.0);
  }
`;class Zo{constructor(){se(this,"v",0);se(this,"vel",0)}update(e,n,a){const o=this.v-e,c=(this.vel+a*o)*n;return this.v=e+(o+c)*Math.exp(-a*n),this.vel=(this.vel-a*c)*Math.exp(-a*n),this.v}}class B2{constructor(e){se(this,"renderer");se(this,"scene",new py);se(this,"camera");se(this,"cluster",new mc);se(this,"composer");se(this,"bloom");se(this,"after");se(this,"spinDial",1);se(this,"uniforms");se(this,"lowE",new Zo);se(this,"midE",new Zo);se(this,"highE",new Zo);se(this,"pulseE",new Zo);se(this,"aheadE",new Zo);se(this,"dissectE",new Zo);se(this,"dissectTarget",0);se(this,"tierCount",6);se(this,"lastDis",0);se(this,"_v",new ee);se(this,"ejecta");se(this,"ptr",{x:0,y:0,tx:0,ty:0});se(this,"hoverT",0);se(this,"sim",null);se(this,"simVel",new ee);se(this,"simAxis",new ee);se(this,"handHeat",0);se(this,"snapPrev",0);se(this,"simDial",1);se(this,"drag",{x:0,y:0,tx:0,ty:0});se(this,"driftT",0);se(this,"born",performance.now());se(this,"t",0);se(this,"focusFrac",.5);se(this,"focusTx",.5);se(this,"focusFracY",.5);se(this,"focusTy",.5);se(this,"dolly",1);se(this,"dollyT",1);se(this,"bootRev",0);se(this,"mPrev",{x:0,y:0,gx:0,gy:0});se(this,"quality",1);se(this,"zoom",1);se(this,"zoomTarget",1);se(this,"calm",matchMedia("(prefers-reduced-motion: reduce)").matches);se(this,"lastW",2);se(this,"lastH",1);se(this,"lastDpr",0);se(this,"dropCssEl",null);se(this,"stems",!1);this.renderer=new s2({canvas:e,antialias:!1,alpha:!1}),this.renderer.outputColorSpace=xc,Zt.enabled=!1,this.renderer.setClearColor(657930,1),this.camera=new ga(40,1,.1,20),this.camera.position.z=1/Math.tan(40/2*(Math.PI/180)),this.scene.add(this.cluster),this.uniforms={uTime:{value:0},uLow:{value:0},uMid:{value:0},uHigh:{value:0},uPulse:{value:0},uAhead:{value:0},uR:{value:1},uReveal:{value:0},uDensity:{value:1},uTurb:{value:1},uCalm:{value:0},uStems:{value:0},uExpo:{value:1},uSnap:{value:0},uZoom:{value:1},uGrabPos:{value:new ee},uGrabStr:{value:0},uGrabBand:{value:-1},uHover:{value:new ee},uHoverLag:{value:new ee},uHoverStr:{value:0},uSim:{value:E2},uSimAmt:{value:0},uDrop:{value:0},uStrong:{value:0},uWave:{value:-1},uVocal:{value:0},uDissect:{value:0},uTiers:{value:6},uGap:{value:1.95/5},uTierOf:{value:new Float32Array(24).map((n,a)=>Math.floor(a/4))},uHiTier:{value:-1},uTierLvl:{value:new Float32Array(6).fill(1)},uCoronaY:{value:0},uGroundY:{value:-1.15},uEqVis:{value:new ee(1,1,1)},uBands:{value:new Float32Array(24)},uOnsetN:{value:0}};{const n=new Float32Array(Ca*3),a=new Float32Array(Ca),o=new Float32Array(Ca*3),c=new Float32Array(Ca*2),u=Math.PI*(3-Math.sqrt(5));for(let v=0;v<Ca;v++){const _=1-v/(Ca-1)*2,g=Math.sqrt(1-_*_),M=u*v;n[v*3]=Math.cos(M)*g,n[v*3+1]=_,n[v*3+2]=Math.sin(M)*g,a[v]=Math.random(),c[v*2]=Dp(v),c[v*2+1]=Np(v)}const d=new ni;d.setAttribute("position",new tn(o,3)),d.setAttribute("aDir",new tn(n,3)),d.setAttribute("aHash",new tn(a,1)),d.setAttribute("aSimUV",new tn(c,2));const m=new Float32Array(Ca*3);for(let v=0;v<Ca*3;v++)m[v]=n[v]*.88*.6;this.sim=new S2(this.renderer,Ca,m),this.sim.active&&(this.uniforms.uSim.value=this.sim.offsetTexture);const p=new wn({uniforms:this.uniforms,vertexShader:T2.replace("__SNOISE__",hf),fragmentShader:A2,blending:As,depthWrite:!1,depthTest:!1});this.cluster.add(new lc(d,p))}{const n=new Float32Array(ff*3),a=new Float32Array(ff),o=new Float32Array(ff*3);for(let d=0;d<ff;d++){const m=Math.random()*Math.PI*2,p=Math.acos(2*Math.random()-1),v=.45+Math.pow(Math.random(),.45)*.85;n[d*3]=Math.sin(p)*Math.cos(m)*v,n[d*3+1]=Math.sin(p)*Math.sin(m)*v,n[d*3+2]=Math.cos(p)*v,a[d]=Math.random()}const c=new ni;c.setAttribute("position",new tn(o,3)),c.setAttribute("aSeed",new tn(n,3)),c.setAttribute("aHash",new tn(a,1));const u=new wn({uniforms:this.uniforms,vertexShader:N2,fragmentShader:L2,blending:As,depthWrite:!1,depthTest:!1});this.cluster.add(new lc(c,u))}{const n=new Float32Array(_r*3),a=new Float32Array(_r*3),o=new Float32Array(_r).fill(-1e4),c=new Float32Array(_r),u=new Float32Array(_r),d=new Float32Array(_r*3);for(let E=0;E<_r;E++)u[E]=Math.random();const m=new ni,p=new tn(n,3),v=new tn(a,3),_=new tn(o,1),g=new tn(c,1);m.setAttribute("position",new tn(d,3)),m.setAttribute("aDir",p),m.setAttribute("aOrg",v),m.setAttribute("aBirth",_),m.setAttribute("aSpd",g),m.setAttribute("aHash",new tn(u,1));const M=new wn({uniforms:this.uniforms,vertexShader:w2,fragmentShader:R2,blending:As,depthWrite:!1,depthTest:!1});this.cluster.add(new lc(m,M)),this.ejecta={dir:p,org:v,birth:_,spd:g,cursor:0}}{const n=Math.PI*(3-Math.sqrt(5)),a=_=>{const g=1-_/(Ca-1)*2,M=Math.sqrt(1-g*g),E=n*_;return[Math.cos(E)*M,g,Math.sin(E)*M]},o=new Float32Array(fc*2*3),c=new Float32Array(fc*2),u=new Float32Array(fc*2*3),d=[1,13,21],m=new Float32Array(fc*2*2);for(let _=0;_<fc;_++){const g=Math.floor(Math.random()*(Ca-22)),M=g+d[Math.random()*d.length|0],E=Math.random(),R=a(g),y=a(M);o.set(R,_*6),o.set(y,_*6+3),c[_*2]=E,c[_*2+1]=E,m[_*4]=Dp(g),m[_*4+1]=Np(g),m[_*4+2]=Dp(M),m[_*4+3]=Np(M)}const p=new ni;p.setAttribute("position",new tn(u,3)),p.setAttribute("aDir",new tn(o,3)),p.setAttribute("aHash",new tn(c,1)),p.setAttribute("aSimUV",new tn(m,2));const v=new wn({uniforms:this.uniforms,vertexShader:C2.replace("__SNOISE__",hf),fragmentShader:D2,blending:As,transparent:!0,depthWrite:!1,depthTest:!1});this.cluster.add(new Qb(p,v))}{const n=new Float32Array(hc),a=new Float32Array(hc),o=new Float32Array(hc*3);for(let d=0;d<hc;d++)n[d]=d/hc*Math.PI*2,a[d]=Math.random();const c=new ni;c.setAttribute("position",new tn(o,3)),c.setAttribute("aTheta",new tn(n,1)),c.setAttribute("aHash",new tn(a,1));const u=new wn({uniforms:this.uniforms,vertexShader:U2.replace("__SNOISE__",hf),fragmentShader:O2,blending:As,depthWrite:!1,depthTest:!1});this.cluster.add(new lc(c,u))}{const n=new Float32Array(Lp*3),a=new Float32Array(Lp*3);for(let u=0;u<Lp;u++)n[u*3]=Math.random(),n[u*3+1]=Math.random()*Math.PI*2,n[u*3+2]=Math.random();const o=new ni;o.setAttribute("position",new tn(a,3)),o.setAttribute("aSeed",new tn(n,3));const c=new wn({uniforms:this.uniforms,vertexShader:P2.replace("__SNOISE__",hf),fragmentShader:F2,blending:As,depthWrite:!1,depthTest:!1});this.cluster.add(new lc(o,c))}this.composer=new f2(this.renderer),this.composer.addPass(new h2(this.scene,this.camera)),this.after=new p2(.82),this.composer.addPass(this.after),this.bloom=new sl(new Dt(2,2),.4,.25,.55),this.composer.addPass(this.bloom),this.applyDensity()}get bloomPass(){return this.bloom}setBands(e){const n=this.uniforms.uBands.value;for(let a=0;a<24;a++)n[a]=e[a]}onset(){this.uniforms.uOnsetN.value=(this.uniforms.uOnsetN.value+1)%4096}setTuning(e,n,a){this.uniforms.uTurb.value=e,this.uniforms.uExpo.value=n,this.spinDial=a}setQuality(e){this.quality=e,this.applyDensity(),this.resize(this.lastW,this.lastH)}applyDensity(){const e=Math.min(1,M2*(.55+.45*this.zoom*1.15));this.uniforms.uDensity.value=Math.min(1,e)*this.quality}zoomBy(e){this.zoomTarget=Math.max(1,Math.min(5,this.zoomTarget*e))}setZoom(e){this.zoomTarget=Math.max(1,Math.min(5,e))}bodyHit(e,n){const a=new nx;a.setFromCamera(new Dt(e,n),this.camera);const o=.88*.62,c=new ol(new ee(0,0,0),o),u=new ee;return a.ray.intersectSphere(c,u)?this.cluster.worldToLocal(u):null}setVocal(e){this.uniforms.uVocal.value=Math.max(0,Math.min(1.4,e))}setEnergy(e,n,a,o=0){this.uniforms.uDrop.value=Math.max(0,Math.min(1,e)),this.uniforms.uStrong.value=Math.max(0,Math.min(1,n)),this.uniforms.uCalm.value=Math.max(0,Math.min(1,o)),a&&(this.uniforms.uWave.value=0),this.dropCssEl&&this.dropCssEl.style.setProperty("--drop",this.uniforms.uDrop.value.toFixed(3))}setDissect(e){this.dissectTarget=Math.max(0,Math.min(1,e))}get dissect(){return this.uniforms.uDissect.value}setTierMap(e,n,a=-1){const o=this.uniforms.uTierOf.value;for(let c=0;c<24;c++)o[c]=e[c]??0;this.tierCount=n,this.uniforms.uTiers.value=n,this.uniforms.uGap.value=1.95/Math.max(1,n-1),this.stems=a>=0,this.uniforms.uStems.value=this.stems?1:0,this.uniforms.uCoronaY.value=a>=0?this.tierYFull(a):0,this.uniforms.uGroundY.value=this.tierYFull(0)-this.uniforms.uGap.value*.9}get tiers(){return this.tierCount}setHiTier(e){this.uniforms.uHiTier.value=e}get hiTier(){return this.uniforms.uHiTier.value}setTierLevels(e){const n=this.uniforms.uTierLvl.value;for(let a=0;a<6;a++)n[a]=e[a]??1}tierYFull(e){return(e-(this.tierCount-1)*.5)*this.uniforms.uGap.value}tierYNow(e){const n=this.uniforms.uDissect.value,a=Math.max(0,Math.min(1,n*1.15-e*.05));return this.tierYFull(e)*a*a*(3-2*a)}projectLocal(e,n,a){return this._v.set(e,n,a).applyMatrix4(this.cluster.matrixWorld).project(this.camera),{x:(this._v.x*.5+.5)*this.lastW,y:(-this._v.y*.5+.5)*this.lastH}}ringProfile(e){return this.stems?1:.72+.48*Math.sin(Math.PI*(e+.5)/this.tierCount)}surveyPoint(e,n,a=1){const o=.49280000000000007*this.ringProfile(e)*a;return this.projectLocal(Math.cos(n)*o,this.tierYNow(e),Math.sin(n)*o)}grabPlane(e,n){const a=new nx;a.setFromCamera(new Dt(e,n),this.camera);const o=new yr(new ee(0,0,1),0),c=new ee;return a.ray.intersectPlane(o,c),this.cluster.worldToLocal(c)}setGrab(e,n,a=-1){e&&this.uniforms.uGrabPos.value.copy(e),this.uniforms.uGrabStr.value=e?n:0,this.uniforms.uGrabBand.value=a}setEqVis(e,n,a){this.uniforms.uEqVis.value.set(e,n,a)}get densityNow(){return this.uniforms.uDensity.value}get zoomLevel(){return this.zoom}powerOn(){this.born=performance.now()-.3*1700,this.pulseE.v=1.1,this.burst(1)}setRev(e){this.bootRev=Math.max(0,e)}readMotion(){const e=this.ptr.x-this.mPrev.x,n=this.ptr.y-this.mPrev.y,a=this.drag.x-this.mPrev.gx,o=this.drag.y-this.mPrev.gy;this.mPrev.x=this.ptr.x,this.mPrev.y=this.ptr.y,this.mPrev.gx=this.drag.x,this.mPrev.gy=this.drag.y;const c=Math.hypot(e,n)*11+Math.hypot(a,o)*7,u=.2+.13*Math.sin(this.t*.9)*Math.sin(this.t*.37+1.1);return Math.min(1,u+c+this.uniforms.uPulse.value*.5)}get focusNow(){return{x:this.focusFrac,y:this.focusFracY,d:this.dolly}}setFocus(e,n=.5,a=1,o=!1){this.focusTx=e,this.focusTy=n,this.dollyT=a,o&&(this.focusFrac=e,this.focusFracY=n,this.dolly=a),this.resize(this.lastW,this.lastH)}setPointer(e,n){this.ptr.tx=e,this.ptr.ty=n,this.uniforms.uHover.value.copy(this.grabPlane(e*2,-n*2))}setSimDial(e){this.simDial=Math.max(0,Math.min(3,e))}setHover(e){this.hoverT=Math.max(0,Math.min(1,e))}burst(e,n=null){const a=Math.round(90+e*240),o=this.ejecta,c=n!=null&&this.uniforms.uDissect.value>.35,u=c?this.tierYNow(n):0,d=.88*.5;for(let m=0;m<a;m++){const p=o.cursor;if(o.cursor=(o.cursor+1)%_r,c){const v=Math.random()*Math.PI*2;o.org.setXYZ(p,Math.cos(v)*d,u,Math.sin(v)*d);const _=Math.random()*1.6-.5,g=Math.hypot(1,_);o.dir.setXYZ(p,Math.cos(v)/g,_/g,Math.sin(v)/g)}else{const v=Math.random()*Math.PI*2,_=Math.acos(2*Math.random()-1),g=Math.sin(_)*Math.cos(v),M=Math.sin(_)*Math.sin(v),E=Math.cos(_);o.dir.setXYZ(p,g,M,E),o.org.setXYZ(p,g*.88*.6,M*.88*.6,E*.88*.6)}o.birth.setX(p,this.t),o.spd.setX(p,(.5+Math.random()*.9)*(.5+e))}o.dir.needsUpdate=!0,o.org.needsUpdate=!0,o.birth.needsUpdate=!0,o.spd.needsUpdate=!0}dragBy(e,n){this.drag.tx+=e,this.drag.ty+=n}resize(e,n){const a=this.quality<1?1:Math.min(2,window.devicePixelRatio||1);(e!==this.lastW||n!==this.lastH||a!==this.lastDpr)&&(this.lastW=e,this.lastH=n,this.lastDpr=a,this.renderer.setPixelRatio(a),this.renderer.setSize(e,n,!1),this.composer.setSize(e,n),this.camera.aspect=e/Math.max(1,n)),this.placeCamera(),this.uniforms.uR.value=Lx}placeCamera(){const e=this.camera.aspect,n=this.uniforms.uDissect.value,a=1/Math.tan(40/2*(Math.PI/180)),o=e<.85;this.camera.position.z=a*this.dolly/this.zoom*(1+n*(o?1.38:.62));const c=-(this.focusFrac-.5)*2*e*this.dolly/this.zoom,u=(this.focusFracY-.5)*2*this.dolly/this.zoom,d=(o?-1*n:0)+u;this.camera.position.x=c,this.camera.position.y=d,this.camera.lookAt(c,d,0),this.camera.updateProjectionMatrix()}render(e,n,a,o,c,u=0,d=0){var g;this.uniforms.uSnap.value=d;const m=.7+this.uniforms.uPulse.value*1.6+d*1.4;this.t+=e*m,this.uniforms.uTime.value=this.t,this.uniforms.uLow.value=this.lowE.update(n,e,11),this.uniforms.uMid.value=this.midE.update(a,e,9),this.uniforms.uHigh.value=this.highE.update(o,e,13),this.uniforms.uPulse.value=this.pulseE.update(c,e,16),this.uniforms.uAhead.value=this.aheadE.update(u,e,1.6),this.uniforms.uReveal.value=Math.min(1,(performance.now()-this.born)/1700);const p=this.dissectE.update(this.dissectTarget,e,7);if(this.uniforms.uDissect.value=p,Math.abs(p-this.lastDis)>.001&&(this.lastDis=p,this.placeCamera()),Math.abs(this.dolly-this.dollyT)>1e-4||Math.abs(this.focusFrac-this.focusTx)>1e-5||Math.abs(this.focusFracY-this.focusTy)>1e-5){const M=Math.min(1,e*3.4);this.dolly+=(this.dollyT-this.dolly)*M,this.focusFrac+=(this.focusTx-this.focusFrac)*M,this.focusFracY+=(this.focusTy-this.focusFracY)*M,this.placeCamera()}Math.abs(this.zoom-this.zoomTarget)>1e-4&&(this.zoom+=(this.zoomTarget-this.zoom)*Math.min(1,e*6),this.uniforms.uZoom.value=this.zoom,this.applyDensity(),this.resize(this.lastW,this.lastH));const v=Math.min(1,e*4);this.ptr.x+=(this.ptr.tx-this.ptr.x)*v,this.ptr.y+=(this.ptr.ty-this.ptr.y)*v,this.drag.x+=(this.drag.tx-this.drag.x)*v,this.drag.y+=(this.drag.ty-this.drag.y)*v,this.uniforms.uHoverStr.value+=(this.hoverT-this.uniforms.uHoverStr.value)*Math.min(1,e*7),this.uniforms.uHoverLag.value.lerp(this.uniforms.uHover.value,Math.min(1,e*9)),this.calm||(this.driftT+=e*(.06+this.uniforms.uPulse.value*.05)*this.spinDial*(.75+m*.25)*(1+this.bootRev*5)),this.cluster.rotation.y=this.driftT+this.ptr.x*.6+this.drag.x;const _=Math.sin(this.driftT*.4)*.12-this.ptr.y*.5+this.drag.y;if(this.cluster.rotation.x=_*(1-p)+.42*p,this.bloom.strength=(.32+this.uniforms.uLow.value*.3+this.uniforms.uPulse.value*.15)*this.uniforms.uExpo.value*(1-p*.28)+this.uniforms.uDrop.value*.55+this.uniforms.uStrong.value*.16,this.after.uniforms.damp.value=Math.min(.94,.76+this.uniforms.uLow.value*.15+this.uniforms.uDrop.value*.09)*(1-this.dissect*.58),this.uniforms.uR.value=Lx*(1+this.uniforms.uDrop.value*.34+this.uniforms.uStrong.value*.06),this.uniforms.uWave.value>=0&&(this.uniforms.uWave.value+=e,this.uniforms.uWave.value>.95&&(this.uniforms.uWave.value=-1)),(g=this.sim)!=null&&g.active&&this.simDial>0){this.simVel.subVectors(this.uniforms.uHover.value,this.uniforms.uHoverLag.value).divideScalar(Math.max(e,1/240)),this.simAxis.set(0,0,1).applyQuaternion(this.camera.quaternion),this.cluster.worldToLocal(this.simAxis.add(this.cluster.position)),this.sim.setViewAxis(this.simAxis);const M=this.simVel.length();this.handHeat=Math.max(this.handHeat*Math.pow(.94,e*60),Math.min(1,M*.55)),this.sim.setHand(this.uniforms.uHover.value,this.simVel,this.uniforms.uHoverStr.value*(.25+.75*this.handHeat));const E=this.uniforms.uSnap.value;this.sim.setAudio(this.uniforms.uBands.value,Math.max(0,E-this.snapPrev)),this.snapPrev=E,this.sim.step(e),this.uniforms.uSim.value=this.sim.offsetTexture;const R=this.calm?.35:1;this.uniforms.uSimAmt.value=b2*this.simDial*R*(1-Math.min(1,this.bootRev))*this.uniforms.uReveal.value}this.composer.render()}}const z2=[{title:"3 am west end",artist:"freepd · cc0",src:"/tracks/3-am-west-end.mp3"},{title:"arpent",artist:"freepd · cc0",src:"/tracks/arpent.mp3"},{title:"backbeat",artist:"freepd · cc0",src:"/tracks/backbeat.mp3"},{title:"beat one",artist:"freepd · cc0",src:"/tracks/beat-one.mp3"},{title:"beat thee",artist:"freepd · cc0",src:"/tracks/beat-thee.mp3"},{title:"bit bit loop",artist:"freepd · cc0",src:"/tracks/bit-bit-loop.mp3"},{title:"chronos",artist:"freepd · cc0",src:"/tracks/chronos.mp3"},{title:"climates using special",artist:"thomas park · cc0",src:"/tracks/climates-using-special.mp3"},{title:"fashion rebel (original)",artist:"thafs · cc by-sa",src:"/tracks/fashion-rebel-original.mp3"},{title:"fashion rebel (space mix by schult",artist:"thafs · cc by-sa",src:"/tracks/fashion-rebel-space-mix-by-schultz.mp3"},{title:"favorite",artist:"freepd · cc0",src:"/tracks/favorite.mp3"},{title:"fireworks",artist:"freepd · cc0",src:"/tracks/fireworks.mp3"},{title:"goodnightmare",artist:"freepd · cc0",src:"/tracks/goodnightmare.mp3"},{title:"hear what they say",artist:"freepd · cc0",src:"/tracks/hear-what-they-say.mp3"},{title:"inter hotel (original version 1&2)",artist:"acidko & martinka · cc by",src:"/tracks/inter-hotel-original-version-1-2.mp3"},{title:"meditating beat",artist:"freepd · cc0",src:"/tracks/meditating-beat.mp3"},{title:"mysoace",artist:"digi hartatak · cc by",src:"/tracks/mysoace.mp3"},{title:"no friend",artist:"aima emeôn · cc by-sa",src:"/tracks/no-friend.mp3"},{title:"provide agree business",artist:"thomas park · cc0",src:"/tracks/provide-agree-business.mp3"},{title:"schweizerisch amerikanische freund",artist:"netlabel · cc by",src:"/tracks/schweizerisch-amerikanische-freundshaf.mp3"},{title:"spiral universe",artist:"kenji · cc by-sa",src:"/tracks/spiral-universe.mp3"},{title:"tech beats",artist:"b.l.underwood · cc by",src:"/tracks/tech-beats.mp3"}];async function I2(r){const e=r.match(/\/(tracks|tracks-local)\/(.+)\.[^.]+$/);if(!e)return null;try{const a=await fetch(`/SCOPE/${e[1]==="tracks-local"?"peaks-local":"peaks"}/${e[2]}.json`);if(!a.ok)return null;const o=await a.json(),c=o.length,u=new Float32Array(c),d=o.bits===8?127:32767;for(let m=0;m<c;m++)u[m]=Math.max(Math.abs(o.data[m*2]),Math.abs(o.data[m*2+1]))/d;return{amp:u,secondsPerPixel:o.samples_per_pixel/o.sample_rate}}catch{return null}}async function Ux(r,e){try{const n=await e.decodeAudioData(await r.arrayBuffer()),a=n.getChannelData(0),o=Math.round(n.sampleRate/20),c=Math.floor(a.length/o),u=new Float32Array(c);for(let d=0;d<c;d++){let m=0;const p=(d+1)*o;for(let v=d*o;v<p;v++){const _=Math.abs(a[v]);_>m&&(m=_)}u[d]=m}return{amp:u,secondsPerPixel:o/n.sampleRate}}catch{return null}}function H2(r,e,n){const a=r.amp.length;if(!a)return 0;const o=Math.min(a-1,Math.floor(e*a)),c=Math.min(a,o+Math.max(1,Math.round(n/r.secondsPerPixel)));let u=0;for(let d=o;d<c;d++)u+=r.amp[d];return u/Math.max(1,c-o)}const Gf="scope",G2=[[/gym|workout|lift|rage|hype|beast|pump/i,{moods:["Aggressive","Energizing","Fiery","Rowdy"],genres:["Trap","Dubstep","Drum & Bass","Hip-Hop/Rap"],bpm:[130,180]}],[/run|running|cardio|sprint/i,{moods:["Energizing","Upbeat"],genres:["Drum & Bass","House","Electronic"],bpm:[150,180]}],[/party|club|dance|banger|festival/i,{moods:["Excited","Rowdy","Upbeat"],genres:["House","Tech House","Electronic","Dancehall"],bpm:[120,132]}],[/rave|warehouse|underground/i,{moods:["Gritty","Fiery"],genres:["Techno","Tech House","Jungle"],bpm:[128,145]}],[/late night|night drive|midnight|3am|after ?hours/i,{moods:["Brooding","Cool","Sophisticated"],genres:["Electronic","Deep House","Downtempo","R&B/Soul"],bpm:[95,122]}],[/drive|driving|highway|cruis/i,{moods:["Cool","Defiant"],genres:["Hip-Hop/Rap","Electronic","House"],bpm:[90,125]}],[/sunset|rooftop|golden hour|beach|pool/i,{moods:["Easygoing","Romantic","Upbeat"],genres:["Deep House","Disco","House"],bpm:[110,124]}],[/morning|sunrise|coffee/i,{moods:["Peaceful","Easygoing","Tender"],genres:["Lo-Fi","Downtempo","Jazz"],bpm:[70,105]}],[/rain|rainy|grey|gray|winter|cozy/i,{moods:["Melancholy","Sentimental","Peaceful"],genres:["Lo-Fi","Downtempo","Ambient","R&B/Soul"],bpm:[60,100]}],[/study|focus|deep work|coding|concentrat/i,{moods:["Peaceful","Easygoing"],genres:["Lo-Fi","Ambient","Downtempo","Electronic"],bpm:[60,110]}],[/chill|relax|calm|unwind|laid ?back/i,{moods:["Easygoing","Peaceful","Cool"],genres:["Lo-Fi","Deep House","Downtempo"],bpm:[80,115]}],[/sad|heartbreak|cry|miss|lonely/i,{moods:["Melancholy","Yearning","Sentimental"],genres:["R&B/Soul","Lo-Fi","Downtempo"],bpm:[60,100]}],[/angry|mad|fury|vent/i,{moods:["Aggressive","Defiant","Fiery"],genres:["Metal","Trap","Dubstep"],bpm:[130,175]}],[/happy|joy|good mood|feel ?good|smile/i,{moods:["Upbeat","Excited","Empowering"],genres:["Disco","House","Pop","Funk"],bpm:[110,128]}],[/love|romantic|date|slow dance/i,{moods:["Romantic","Tender","Sentimental"],genres:["R&B/Soul","Jazz","Downtempo"],bpm:[65,105]}],[/dark|sinister|villain|menac/i,{moods:["Brooding","Serious","Gritty"],genres:["Techno","Trap","Electronic"],bpm:[100,140]}],[/space|cosmic|float|dream|ethereal/i,{moods:["Peaceful","Stirring"],genres:["Ambient","Electronic","Downtempo"],bpm:[60,110]}],[/house/i,{genres:["House","Deep House","Tech House"],bpm:[118,128]}],[/techno/i,{genres:["Techno"],bpm:[125,140]}],[/dnb|drum and bass|drum & bass|jungle/i,{genres:["Drum & Bass","Jungle"],bpm:[160,180]}],[/dubstep|bass music|wobble/i,{genres:["Dubstep"],bpm:[135,150]}],[/trap|808/i,{genres:["Trap"],bpm:[130,160]}],[/hip ?hop|rap/i,{genres:["Hip-Hop/Rap"],bpm:[80,150]}],[/lo ?-?fi/i,{genres:["Lo-Fi"],bpm:[60,95]}],[/disco|funk|groove/i,{genres:["Disco","Funk"],bpm:[105,125]}],[/ambient|drone/i,{genres:["Ambient"],bpm:[50,90]}],[/jazz/i,{genres:["Jazz"]}],[/soul|rnb|r&b/i,{genres:["R&B/Soul"],bpm:[70,110]}],[/reggae|dub(?!step)/i,{genres:["Reggae"],bpm:[70,100]}],[/latin|reggaeton/i,{genres:["Latin"],bpm:[90,110]}],[/phonk|drift/i,{moods:["Gritty","Brooding"],genres:["Trap","Electro","Hip-Hop/Rap"],bpm:[125,165]}],[/hyperpop|glitch/i,{moods:["Excited","Rowdy"],genres:["Hyperpop","Glitch Hop","Electronic"],bpm:[130,170]}],[/trance|uplifting|euphoric/i,{moods:["Stirring","Empowering"],genres:["Trance","Progressive House"],bpm:[132,142]}],[/hardstyle|hardcore|gabber/i,{moods:["Aggressive","Rowdy"],genres:["Hardstyle"],bpm:[145,180]}],[/vaporwave|synthwave|retro|80s/i,{moods:["Cool","Sentimental"],genres:["Vaporwave","Electronic","Electro"],bpm:[80,118]}],[/afro|amapiano|afrobeats?/i,{moods:["Upbeat","Easygoing"],genres:["Afrobeat","House","Dancehall"],bpm:[100,118]}],[/future bass|melodic bass|chill trap/i,{moods:["Stirring","Yearning"],genres:["Future Bass","Electronic"],bpm:[130,160]}],[/sad boy|sadboy|down bad|in my feels|feels/i,{moods:["Melancholy","Yearning"],genres:["Lo-Fi","R&B/Soul","Hip-Hop/Rap"],bpm:[60,105]}],[/rock|guitar|band/i,{genres:["Rock","Alternative"],bpm:[100,160]}],[/metal|heavy/i,{moods:["Aggressive","Fiery"],genres:["Metal"],bpm:[120,190]}],[/pop\b|catchy|radio/i,{moods:["Upbeat"],genres:["Pop"],bpm:[100,130]}]];function k2(r){var d,m;const e=new Set,n=new Set;let a=1/0,o=-1/0;for(const[p,v]of G2)p.test(r)&&((d=v.moods)==null||d.forEach(_=>e.add(_)),(m=v.genres)==null||m.forEach(_=>n.add(_)),v.bpm&&(a=Math.min(a,v.bpm[0]),o=Math.max(o,v.bpm[1])));const c={moods:e.size?[...e]:void 0,genres:n.size?[...n]:void 0,bpm:isFinite(a)?[a,o]:void 0},u=[];return c.moods&&u.push(c.moods.slice(0,2).join("/").toLowerCase()),c.genres&&u.push(c.genres.slice(0,2).join("/").toLowerCase()),c.bpm&&u.push(`${c.bpm[0]}-${c.bpm[1]}bpm`),{sense:c,read:u.length?`read as ${u.join(" · ")}`:"no read · searching the words themselves"}}const Ny=["House","Deep House","Tech House","Techno","Electronic","Dubstep","Drum & Bass"];let df=null;async function Ly(){if(df)return df;try{const n=((await(await fetch("https://api.audius.co",{signal:AbortSignal.timeout(4e3)})).json()).data??[]).filter(a=>!a.includes("api.audius.co"));n.length&&(df=n[Math.floor(Math.random()*Math.min(3,n.length))])}catch{}return df??(df="https://discoveryprovider.audius.co")}function Cm(r){return r.is_streamable===!1||r.is_stream_gated||r.is_delete||r.is_available===!1?!1:r.duration>=90&&r.duration<=600}function Uy(r,e){return{title:r.title.slice(0,42),artist:`${r.user.name.slice(0,24)} · audius`,src:`${e}/v1/tracks/${r.id}/stream?app_name=${Gf}`,bpm:r.bpm&&r.bpm>40&&r.bpm<220?Math.round(r.bpm):void 0,musicalKey:r.musical_key||void 0,genre:r.genre||void 0,plays:r.play_count,link:r.permalink?`https://audius.co${r.permalink}`:void 0}}function V2(r){for(let e=r.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[r[e],r[n]]=[r[n],r[e]]}return r}async function X2(r=null,e=40){try{const n=await Ly(),a=r?[r]:Ny,o=new Map;await Promise.allSettled(a.map(async u=>{const d=await fetch(`${n}/v1/tracks/trending?genre=${encodeURIComponent(u)}&app_name=${Gf}&limit=${r?40:24}`,{signal:AbortSignal.timeout(6e3)});if(!d.ok)return;const m=await d.json();for(const p of m.data??[])Cm(p)&&o.set(p.id,p)}));const c=[...o.values()].sort((u,d)=>(d.play_count??0)-(u.play_count??0)).slice(0,e);return V2(c).map(u=>Uy(u,n))}catch{return[]}}async function q2(r){const{sense:e,read:n}=k2(r);try{const a=await Ly(),o=e.genres??Ny,c=new Map,u=o.slice(0,5).map(async p=>{const v=await fetch(`${a}/v1/tracks/trending?genre=${encodeURIComponent(p)}&app_name=${Gf}&limit=30`,{signal:AbortSignal.timeout(6e3)});if(!v.ok)return;const _=await v.json();for(const g of _.data??[])Cm(g)&&!c.has(g.id)&&c.set(g.id,{t:g,fromSearch:!1})});u.push((async()=>{const p=await fetch(`${a}/v1/tracks/search?query=${encodeURIComponent(r)}&app_name=${Gf}&limit=40`,{signal:AbortSignal.timeout(7e3)});if(!p.ok)return;const v=await p.json();for(const _ of v.data??[]){if(!Cm(_))continue;const g=c.get(_.id);g?g.fromSearch=!0:c.set(_.id,{t:_,fromSearch:!0})}})()),await Promise.allSettled(u);const d=[...c.values()].map(({t:p,fromSearch:v})=>{let _=Math.log10(1+(p.play_count??0))*.5;return v&&(_+=1),e.moods&&p.mood&&e.moods.includes(p.mood)&&(_+=2),e.genres&&p.genre&&e.genres.includes(p.genre)&&(_+=1.5),e.bpm&&p.bpm&&p.bpm>=e.bpm[0]&&p.bpm<=e.bpm[1]&&(_+=1),{t:p,score:_}});d.sort((p,v)=>v.score-p.score);const m=d.slice(0,30).map(p=>p.t);for(let p=Math.min(m.length,12)-1;p>0;p--){const v=Math.floor(Math.random()*(p+1));[m[p],m[v]]=[m[v],m[p]]}return{tracks:m.map(p=>Uy(p,a)),read:n}}catch{return{tracks:[],read:n}}}const Oy=[[/vocal|vox|acapella|voice/i,"vocals"],[/drum|beat|perc/i,"drums"],[/bass|sub|808/i,"bass"]];function W2(r){for(const[e,n]of Oy)if(e.test(r))return n;return"other"}function Y2(r){return r.length<2||r.length>8?!1:r.some(e=>Oy.some(([n])=>n.test(e.name)))}class Ox{constructor(e,n){se(this,"ctx");se(this,"out");se(this,"stems",[]);se(this,"startAt",0);se(this,"offset",0);se(this,"_playing",!1);se(this,"duration",0);se(this,"soloRole",null);this.ctx=e,this.out=e.createGain(),this.out.connect(n)}loadBuffers(e){this.disposeSources(),this.stems=[],this.soloRole=null;for(const n of e){const a=this.ctx.createGain(),o=this.ctx.createAnalyser();o.fftSize=256,a.connect(this.out),a.connect(o),this.stems.push({role:n.role,name:n.name.slice(0,22),buffer:n.buffer,gain:a,tap:o,source:null,userGain:1,muted:!1,level:0,bin:new Float32Array(256)})}this.duration=Math.max(...this.stems.map(n=>n.buffer.duration))}async load(e){this.disposeSources(),this.stems=[];for(const n of e){const a=await this.ctx.decodeAudioData(await n.arrayBuffer()),o=this.ctx.createGain(),c=this.ctx.createAnalyser();c.fftSize=256,o.connect(this.out),o.connect(c),this.stems.push({role:W2(n.name),name:n.name.replace(/\.[^.]+$/,"").slice(0,22),buffer:a,gain:o,tap:c,source:null,userGain:1,muted:!1,level:0,bin:new Float32Array(256)})}this.duration=Math.max(...this.stems.map(n=>n.buffer.duration))}play(e=this.offset){this.disposeSources();const n=this.ctx.currentTime+.06;this.offset=Math.max(0,Math.min(this.duration-.05,e));let a=null,o=-1;for(const c of this.stems){const u=this.ctx.createBufferSource();u.buffer=c.buffer,u.connect(c.gain),u.start(n,Math.min(this.offset,c.buffer.duration-.05)),c.source=u,c.buffer.duration>o&&(o=c.buffer.duration,a=u)}if(a){const c=this.stems.map(u=>u.source);a.onended=()=>{this._playing&&this.stems.some(u=>c.includes(u.source))&&(this.offset=this.duration,this._playing=!1)}}this.startAt=n,this._playing=!0}pause(){this.offset=this.currentTime(),this.disposeSources(),this._playing=!1}seek(e){const n=this._playing;this.offset=e,n&&this.play(e)}currentTime(){return this._playing?Math.min(this.duration,this.offset+(this.ctx.currentTime-this.startAt)):this.offset}get playing(){return this._playing}setStemGain(e,n){for(const a of this.stems)a.role===e&&(a.userGain=Math.max(0,Math.min(2,n)),this.apply(a))}toggleMute(e){const n=this.stems[e];n&&(n.muted=!n.muted,this.apply(n))}toggleMuteRole(e){let n=!1;for(const a of this.stems)a.role===e&&(n=n||!a.muted);for(const a of this.stems)a.role===e&&(a.muted=n,this.apply(a))}solo(e){this.soloRole=e;for(const n of this.stems)this.apply(n)}apply(e){const n=e.muted||this.soloRole&&e.role!==this.soloRole?0:e.userGain;e.gain.gain.setTargetAtTime(n,this.ctx.currentTime,.03)}info(){return this.stems.map(e=>{e.tap.getFloatTimeDomainData(e.bin);let n=0;for(let a=0;a<e.bin.length;a++)n+=e.bin[a]*e.bin[a];return e.level=Math.sqrt(n/e.bin.length)*(e.muted?0:1),{role:e.role,name:e.name,level:e.level,gain:e.userGain,muted:e.muted}})}peaks(e=20){var u;const n=((u=this.stems[0])==null?void 0:u.buffer.sampleRate)??44100,a=Math.round(n/e),o=Math.floor(this.duration*n/a),c=new Float32Array(o);for(const d of this.stems){const m=d.buffer.getChannelData(0);for(let p=0;p<o;p++){let v=0;const _=Math.min(m.length,(p+1)*a);for(let g=p*a;g<_;g+=4){const M=Math.abs(m[g]);M>v&&(v=M)}c[p]=Math.min(1,c[p]+v*.5)}}return{amp:c,secondsPerPixel:a/n}}disposeSources(){var e;for(const n of this.stems){try{(e=n.source)==null||e.stop()}catch{}n.source=null}}dispose(){this.disposeSources(),this.out.disconnect(),this.stems=[],this._playing=!1}}const Px=":=+xX#@/<>",j2=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;function xr({text:r,duration:e=650,className:n,replayOnHover:a=!1}){const[o,c]=Ve.useState(r),[u,d]=Ve.useState(0);return Ve.useEffect(()=>{if(j2()){c(r);return}const m=performance.now();let p=0;const v=()=>{const _=Math.min(1,(performance.now()-m)/e);let g="";for(let M=0;M<r.length;M++){const E=r[M];if(E===" "||E==="·"){g+=E;continue}const R=.15+M/Math.max(1,r.length)*.7;g+=_>=R?E:Px[Math.random()*Px.length|0]}c(g),_<1&&(p=requestAnimationFrame(v))};return p=requestAnimationFrame(v),()=>cancelAnimationFrame(p)},[r,e,u]),D.jsx("span",{className:n,onPointerEnter:a?()=>d(m=>m+1):void 0,children:o})}const Py=["pointerdown","mousedown","pointerup","mouseup","click"],Dm=new WeakMap;function Fy(r,e,n){Wm(r);let a=o=>{let c=o.target;r.contains(c)&&((!n||n(c))&&(o.preventDefault(),o.stopPropagation(),o.stopImmediatePropagation()),o.type==="click"&&(e==null||e(o)))};for(let o of Py)document.addEventListener(o,a,!0);Dm.set(r,a)}function Wm(r){let e=Dm.get(r);if(e){for(let n of Py)document.removeEventListener(n,e,!0);Dm.delete(r)}}function Z2(r,e){let n=r.wrapper.getBoundingClientRect();return{width:n.width+e,height:n.height+e,realWidth:n.width,realHeight:n.height}}function Fx(r,e){let{elementDimensions:n,popoverDimensions:a,popoverPadding:o,popoverArrowDimensions:c}=e;return r==="start"?Math.max(Math.min(n.top-o,window.innerHeight-a.realHeight-c.width),c.width):r==="end"?Math.max(Math.min(n.top-(a==null?void 0:a.realHeight)+n.height+o,window.innerHeight-(a==null?void 0:a.realHeight)-c.width),c.width):r==="center"?Math.max(Math.min(n.top+n.height/2-(a==null?void 0:a.realHeight)/2,window.innerHeight-(a==null?void 0:a.realHeight)-c.width),c.width):0}function Bx(r,e){let{elementDimensions:n,popoverDimensions:a,popoverPadding:o,popoverArrowDimensions:c}=e;return r==="start"?Math.max(Math.min(n.left-o,window.innerWidth-a.realWidth-c.width),c.width):r==="end"?Math.max(Math.min(n.left-(a==null?void 0:a.realWidth)+n.width+o,window.innerWidth-(a==null?void 0:a.realWidth)-c.width),c.width):r==="center"?Math.max(Math.min(n.left+n.width/2-(a==null?void 0:a.realWidth)/2,window.innerWidth-(a==null?void 0:a.realWidth)-c.width),c.width):0}function Ym(r,e,n){let{align:a,side:o}=n,c=n.centered?"over":o,u=n.padding,d=Z2(r,n.offset),m=r.arrow.getBoundingClientRect(),p=e.getBoundingClientRect(),v=p.top-d.height,_=v>=0,g=window.innerHeight-(p.bottom+d.height),M=g>=0,E=p.left-d.width,R=E>=0,y=window.innerWidth-(p.right+d.width),x=y>=0,P=!_&&!M&&!R&&!x,N=c;if(c==="top"&&_?x=R=M=!1:c==="bottom"&&M?x=R=_=!1:c==="left"&&R?x=_=M=!1:c==="right"&&x&&(R=_=M=!1),c==="over"){let C=window.innerWidth/2-d.realWidth/2,I=window.innerHeight/2-d.realHeight/2;r.wrapper.style.left=`${C}px`,r.wrapper.style.right="auto",r.wrapper.style.top=`${I}px`,r.wrapper.style.bottom="auto"}else if(P){let C=window.innerWidth/2-(d==null?void 0:d.realWidth)/2;r.wrapper.style.left=`${C}px`,r.wrapper.style.right="auto",r.wrapper.style.bottom="10px",r.wrapper.style.top="auto"}else if(R){let C=Math.min(E,window.innerWidth-(d==null?void 0:d.realWidth)-m.width),I=Fx(a,{elementDimensions:p,popoverDimensions:d,popoverPadding:u,popoverArrowDimensions:m});r.wrapper.style.left=`${C}px`,r.wrapper.style.top=`${I}px`,r.wrapper.style.bottom="auto",r.wrapper.style.right="auto",N="left"}else if(x){let C=Math.min(y,window.innerWidth-(d==null?void 0:d.realWidth)-m.width),I=Fx(a,{elementDimensions:p,popoverDimensions:d,popoverPadding:u,popoverArrowDimensions:m});r.wrapper.style.right=`${C}px`,r.wrapper.style.top=`${I}px`,r.wrapper.style.bottom="auto",r.wrapper.style.left="auto",N="right"}else if(_){let C=Math.min(v,window.innerHeight-d.realHeight-m.width),I=Bx(a,{elementDimensions:p,popoverDimensions:d,popoverPadding:u,popoverArrowDimensions:m});r.wrapper.style.top=`${C}px`,r.wrapper.style.left=`${I}px`,r.wrapper.style.bottom="auto",r.wrapper.style.right="auto",N="top"}else if(M){let C=Math.min(g,window.innerHeight-(d==null?void 0:d.realHeight)-m.width),I=Bx(a,{elementDimensions:p,popoverDimensions:d,popoverPadding:u,popoverArrowDimensions:m});r.wrapper.style.left=`${I}px`,r.wrapper.style.bottom=`${C}px`,r.wrapper.style.top="auto",r.wrapper.style.right="auto",N="bottom"}Q2(r,P?"over":N,a,e),[...r.wrapper.classList].filter(C=>C.startsWith("driver-popover-side-")||C.startsWith("driver-popover-align-")).forEach(C=>r.wrapper.classList.remove(C)),r.wrapper.classList.add(`driver-popover-side-${N}`),r.wrapper.classList.add(`driver-popover-align-${a}`)}function zx(r,e,n,a,o,c=10){let u=a-n;return r<=n&&e>=a?o==="start"?15+c/2:o==="end"?u-15-c/2:u/2:(Math.min(Math.max(r,n),a)+Math.min(Math.max(e,n),a))/2-n}function Ix(r,e,n=10){let a=e-15-n;if(a<15)return Math.max(0,(e-n)/2);let o=r-n/2;return Math.min(Math.max(o,15),a)}function K2(r,e,n){return r==="left"||r==="right"?e.bottom>n.top&&e.top<n.bottom?r:e.bottom<=n.top?"bottom":"top":e.right>n.left&&e.left<n.right?r:e.right<=n.left?"right":"left"}function Q2(r,e,n,a){let o=r.arrow;if(o.className="driver-popover-arrow",o.style.top="",o.style.right="",o.style.bottom="",o.style.left="",e==="over"){o.classList.add("driver-popover-arrow-none");return}let c=a.getBoundingClientRect(),u=r.wrapper.getBoundingClientRect(),d=K2(e,c,u);o.classList.add(`driver-popover-arrow-side-${d}`);let m=o.getBoundingClientRect().width||10;if(d==="left"||d==="right"){let p=zx(c.top,c.bottom,u.top,u.bottom,n,m);o.style.top=`${Ix(p,u.height,m)}px`}else{let p=zx(c.left,c.right,u.left,u.right,n,m);o.style.left=`${Ix(p,u.width,m)}px`}}function kf(r){return typeof r=="function"?r():typeof r=="string"?document.querySelector(r):r}function J2(r){let e=window.getComputedStyle(r);return[e.overflow,e.overflowX,e.overflowY].some(n=>n==="auto"||n==="scroll")}function pf(r,e,n,a){return(r/=a/2)<1?n/2*r*r+e:-n/2*(--r*(r-2)-1)+e}function By(r){let e='a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';return r.flatMap(n=>{let a=n.matches(e),o=Array.from(n.querySelectorAll(e));return[...a?[n]:[],...o]}).filter(n=>getComputedStyle(n).pointerEvents!=="none"&&tR(n))}function zy(r,e){if(!r||eR(r))return;let n=r.offsetHeight>window.innerHeight;r.scrollIntoView({behavior:!e||$2(r)?"auto":"smooth",inline:"center",block:n?"start":"center"})}function $2(r){if(!r||!r.parentElement)return;let e=r.parentElement;return e.scrollHeight>e.clientHeight}function eR(r){let e=r.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&e.right<=(window.innerWidth||document.documentElement.clientWidth)}function tR(r){return!!(r.offsetWidth||r.offsetHeight||r.getClientRects().length)}function nR(r){r&&(r.wrapper.style.display="none")}function iR(r,e){var R;let n=sR();document.body.appendChild(n.wrapper);let{title:a,description:o,showButtons:c,disableButtons:u,showProgress:d,nextBtnText:m,prevBtnText:p,progressText:v}=e;n.nextButton.innerHTML=m,n.previousButton.innerHTML=p,n.progress.innerHTML=v,e.doneButton&&n.nextButton.classList.add("driver-popover-done-btn"),a?(n.title.innerHTML=a,n.title.style.display="block"):n.title.style.display="none",o?(n.description.innerHTML=o,n.description.style.display="block"):n.description.style.display="none";let _=c.includes("next")||c.includes("previous")||d;n.closeButton.style.display=c.includes("close")?"block":"none",_?(n.footer.style.display="flex",n.progress.style.display=d?"block":"none",n.nextButton.style.display=c.includes("next")?"block":"none",n.previousButton.style.display=c.includes("previous")?"block":"none"):n.footer.style.display="none",u.includes("next")&&(n.nextButton.disabled=!0,n.nextButton.classList.add("driver-popover-btn-disabled")),u.includes("previous")&&(n.previousButton.disabled=!0,n.previousButton.classList.add("driver-popover-btn-disabled")),u.includes("close")&&(n.closeButton.disabled=!0,n.closeButton.classList.add("driver-popover-btn-disabled"));let g=n.wrapper;g.style.display="block",g.style.left="",g.style.top="",g.style.bottom="",g.style.right="",g.id="driver-popover-content",g.setAttribute("role","dialog"),g.setAttribute("aria-labelledby","driver-popover-title"),g.setAttribute("aria-describedby","driver-popover-description");let M=n.arrow;M.className="driver-popover-arrow",g.className=`driver-popover ${e.popoverClass||""}`.trim(),Fy(n.wrapper,y=>{var P,N,C;let x=y.target;if(x.closest(".driver-popover-next-btn"))return(P=e.onNextClick)==null?void 0:P.call(e);if(x.closest(".driver-popover-prev-btn"))return(N=e.onPrevClick)==null?void 0:N.call(e);if(x.closest(".driver-popover-close-btn"))return(C=e.onCloseClick)==null?void 0:C.call(e)},y=>n.description.contains(y)||n.title.contains(y)?!1:!!y.closest(".driver-popover-prev-btn, .driver-popover-next-btn, .driver-popover-close-btn")),(R=e.onRender)==null||R.call(e,n),Ym(n,r,e.position),aR(n,r,e.position),zy(g,e.smoothScroll);let E=By([g,r]);return E.length>0&&E[0].focus(),n}function aR(r,e,n){r.wrapper.querySelectorAll("img").forEach(a=>{if(a.complete)return;let o=()=>Ym(r,e,n);a.addEventListener("load",o,{once:!0}),a.addEventListener("error",o,{once:!0})})}function sR(){let r=document.createElement("div");r.classList.add("driver-popover");let e=document.createElement("div");e.classList.add("driver-popover-arrow");let n=document.createElement("header");n.id="driver-popover-title",n.classList.add("driver-popover-title"),n.style.display="none",n.innerText="Popover Title";let a=document.createElement("div");a.id="driver-popover-description",a.classList.add("driver-popover-description"),a.style.display="none",a.innerText="Popover description is here";let o=document.createElement("button");o.type="button",o.classList.add("driver-popover-close-btn"),o.setAttribute("aria-label","Close"),o.innerHTML="&times;";let c=document.createElement("footer");c.classList.add("driver-popover-footer");let u=document.createElement("span");u.classList.add("driver-popover-progress-text"),u.innerText="";let d=document.createElement("span");d.classList.add("driver-popover-navigation-btns");let m=document.createElement("button");m.type="button",m.classList.add("driver-popover-prev-btn","driver-popover-footer-btn"),m.innerHTML="Previous";let p=document.createElement("button");return p.type="button",p.classList.add("driver-popover-next-btn","driver-popover-footer-btn"),p.innerHTML="Next",d.appendChild(m),d.appendChild(p),c.appendChild(u),c.appendChild(d),r.appendChild(o),r.appendChild(e),r.appendChild(n),r.appendChild(a),r.appendChild(c),{wrapper:r,arrow:e,title:n,description:a,footer:c,previousButton:m,nextButton:p,closeButton:o,footerButtons:d,progress:u}}function Iy(r){var e;r&&(Wm(r.wrapper),(e=r.wrapper.parentElement)==null||e.removeChild(r.wrapper))}function Hy(r,e){let n=window.innerWidth,a=window.innerHeight,o=e.padding,c=e.radius,u=r.width+o*2,d=r.height+o*2,m=Math.min(c,u/2,d/2),p=Math.floor(Math.max(m,0)),v=r.x-o+p,_=r.y-o,g=u-p*2,M=d-p*2;return`M${n},0L0,0L0,${a}L${n},${a}L${n},0Z
    M${v},${_} h${g} a${p},${p} 0 0 1 ${p},${p} v${M} a${p},${p} 0 0 1 -${p},${p} h-${g} a${p},${p} 0 0 1 -${p},-${p} v-${M} a${p},${p} 0 0 1 ${p},-${p} z`}function rR(r,e,n,a,o){let c=r.getState("__activeStagePosition"),u=c||a.getBoundingClientRect(),d=o.getBoundingClientRect();c={x:pf(e,u.x,d.x-u.x,n),y:pf(e,u.y,d.y-u.y,n),width:pf(e,u.width,d.width-u.width,n),height:pf(e,u.height,d.height-u.height,n)},ky(r,c),r.setState("__activeStagePosition",c)}function Gy(r,e){if(!e)return;let n=e.getBoundingClientRect(),a={x:n.x,y:n.y,width:n.width,height:n.height};r.setState("__activeStagePosition",a),ky(r,a)}function oR(r){let e=r.getState("__activeStagePosition"),n=r.getState("__overlaySvg");if(!e)return;if(!n){console.warn("No stage svg found.");return}let a=window.innerWidth,o=window.innerHeight;n.setAttribute("viewBox",`0 0 ${a} ${o}`)}function lR(r,e){let n=cR(r,e);document.body.appendChild(n),Fy(n,a=>{a.target.tagName==="path"&&r.emit("overlayClick")}),r.setState("__overlaySvg",n)}function ky(r,e){let n=r.getState("__overlaySvg");if(!n){lR(r,e);return}let a=n.firstElementChild;if((a==null?void 0:a.tagName)!=="path")throw Error("no path element found in stage svg");a.setAttribute("d",Hy(e,Vy(r)))}function Vy(r){return{padding:r.getConfig("stagePadding")||0,radius:r.getConfig("stageRadius")||0}}function cR(r,e){let n=window.innerWidth,a=window.innerHeight,o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.classList.add("driver-overlay","driver-overlay-animated"),o.setAttribute("viewBox",`0 0 ${n} ${a}`),o.setAttribute("xmlSpace","preserve"),o.setAttribute("xmlnsXlink","http://www.w3.org/1999/xlink"),o.setAttribute("version","1.1"),o.setAttribute("preserveAspectRatio","xMinYMin slice"),o.style.fillRule="evenodd",o.style.clipRule="evenodd",o.style.strokeLinejoin="round",o.style.strokeMiterlimit="2",o.style.zIndex="10000",o.style.position="fixed",o.style.top="0",o.style.left="0",o.style.width="100%",o.style.height="100%";let c=document.createElementNS("http://www.w3.org/2000/svg","path");return c.setAttribute("d",Hy(e,Vy(r))),c.style.fill=r.getConfig("overlayColor")||"rgb(0,0,0)",c.style.opacity=`${r.getConfig("overlayOpacity")}`,c.style.pointerEvents="auto",c.style.cursor="auto",o.appendChild(c),o}function uR(r){let e=r.getState("__overlaySvg");e&&(Wm(e),e.remove())}const Xy="{{current}} of {{total}}";function qy(r,e){return!(e.skipMissingElement??r.getConfig("skipMissingElement"))||!e.element?!1:!kf(e.element)}function Rs(r,e,n){let a=r.getConfig("steps")||[];for(let o=e;o>=0&&o<a.length;o+=n)if(!qy(r,a[o]))return o}function Df(r,e){var c,u;let n=r.getState("activeIndex"),a=n!==void 0&&Rs(r,n+1,1)===void 0,o=((c=e==null?void 0:e.popover)==null?void 0:c.onDoneClick)||r.getConfig("onDoneClick");return a&&o?o:((u=e==null?void 0:e.popover)==null?void 0:u.onNextClick)||r.getConfig("onNextClick")}function Wy(r,e){var n;return((n=e==null?void 0:e.popover)==null?void 0:n.onPrevClick)||r.getConfig("onPrevClick")}function fR(r,e){var n;return((n=e==null?void 0:e.popover)==null?void 0:n.onCloseClick)||r.getConfig("onCloseClick")}function hR(r,e,n){let a=r.getConfig("steps")||[],o=a[e],c=o.popover||{},u=Rs(r,e+1,1)!==void 0,d=Rs(r,e-1,-1)!==void 0,m=c.doneBtnText||r.getConfig("doneBtnText")||"Done",p=r.getConfig("allowClose"),v=c.showProgress===void 0?r.getConfig("showProgress"):c.showProgress,_=(c.progressText||r.getConfig("progressText")||Xy).replace("{{current}}",`${e+1}`).replace("{{total}}",`${a.length}`),g=c.showButtons||r.getConfig("showButtons"),M=["next","previous",...p?["close"]:[]].filter(x=>!(g!=null&&g.length)||g.includes(x)),E=c.onNextClick||r.getConfig("onNextClick"),R=c.onPrevClick||r.getConfig("onPrevClick"),y=c.onCloseClick||r.getConfig("onCloseClick");return{...o,popover:{showButtons:M,nextBtnText:u?void 0:m,disableButtons:[...d?[]:["previous"]],showProgress:v,onNextClick:E||n.onNextClick,onPrevClick:R||n.onPrevClick,onCloseClick:y||n.onCloseClick,...c,progressText:_}}}function Yy(r,e,n){var o,c;let a=r.getConfig("stagePadding")||0;return{side:((o=n.popover)==null?void 0:o.side)||"bottom",align:((c=n.popover)==null?void 0:c.align)||"start",offset:a+(r.getConfig("popoverOffset")||0),padding:a,centered:e.id==="driver-dummy-element"}}function dR(r,e,n){let a=n.popover||{},o=r.getState("activeIndex"),c=o!==void 0&&Rs(r,o+1,1)===void 0;return{title:a.title,description:a.description,showButtons:a.showButtons||r.getConfig("showButtons"),disableButtons:a.disableButtons||r.getConfig("disableButtons")||[],showProgress:a.showProgress||r.getConfig("showProgress")||!1,progressText:a.progressText??(r.getConfig("progressText")||Xy),nextBtnText:a.nextBtnText??(r.getConfig("nextBtnText")||"Next"),prevBtnText:a.prevBtnText??(r.getConfig("prevBtnText")||"Previous"),doneButton:c,popoverClass:a.popoverClass||r.getConfig("popoverClass")||"",smoothScroll:r.getConfig("smoothScroll"),onNextClick:()=>{let u=Df(r,n);return u?u(e,n,r.getHookOpts()):r.emit("nextClick")},onPrevClick:()=>{let u=Wy(r,n);return u?u(e,n,r.getHookOpts()):r.emit("prevClick")},onCloseClick:()=>{let u=fR(r,n);return u?u(e,n,r.getHookOpts()):r.emit("closeClick")},onRender:u=>{var d;r.setState("popover",u),(d=a.onPopoverRender||r.getConfig("onPopoverRender"))==null||d(u,r.getHookOpts())},position:Yy(r,e,n)}}function Hx(r,e,n){Iy(r.getState("popover")),iR(e,dR(r,e,n))}function pR(r,e,n){let a=r.getState("popover");a&&Ym(a,e,Yy(r,e,n))}function mR(){let r=document.getElementById("driver-dummy-element");if(r)return r;let e=document.createElement("div");return e.id="driver-dummy-element",e.style.width="0",e.style.height="0",e.style.pointerEvents="none",e.style.opacity="0",e.style.position="fixed",e.style.top="50%",e.style.left="50%",document.body.appendChild(e),e}function Gx(r,e){let n=kf(e.element);n||(n=mR()),vR(r,n,e)}function gR(r){let e=r.getState("__activeElement"),n=r.getState("__activeStep");e&&(Gy(r,e),oR(r),pR(r,e,n))}function vR(r,e,n){let a=r.getConfig("duration")||400,o=Date.now(),c=r.getState("__activeStep"),u=r.getState("__activeElement")||e,d=!u||u===e,m=e.id==="driver-dummy-element",p=u.id==="driver-dummy-element",v=r.getConfig("animate"),_=n.onHighlightStarted||r.getConfig("onHighlightStarted"),g=(n==null?void 0:n.onHighlighted)||r.getConfig("onHighlighted"),M=(c==null?void 0:c.onDeselected)||r.getConfig("onDeselected"),E=r.getHookOpts();!d&&M&&M(p?void 0:u,c,E),_&&_(m?void 0:e,n,E);let R=!d&&v,y=!1;nR(r.getState("popover")),r.setState("previousStep",c),r.setState("previousElement",u),r.setState("activeStep",n),r.setState("activeElement",e);let x=()=>{if(r.getState("__transitionCallback")!==x)return;let N=Date.now()-o,C=a-N<=a/2;n.popover&&C&&!y&&R&&(Hx(r,e,n),y=!0),r.getConfig("animate")&&N<a?rR(r,N,a,u,e):(Gy(r,e),g&&g(m?void 0:e,n,r.getHookOpts()),r.setState("__transitionCallback",void 0),r.setState("__previousStep",c),r.setState("__previousElement",u),r.setState("__activeStep",n),r.setState("__activeElement",e)),window.requestAnimationFrame(x)};r.setState("__transitionCallback",x),window.requestAnimationFrame(x),zy(e,r.getConfig("smoothScroll")),!R&&n.popover&&Hx(r,e,n),document.querySelectorAll(".driver-active-element-parent").forEach(N=>{N.classList.remove("driver-active-element-parent","driver-active-element-parent-no-scroll")}),u.classList.remove("driver-active-element","driver-no-interaction"),u.removeAttribute("aria-haspopup"),u.removeAttribute("aria-expanded"),u.removeAttribute("aria-controls"),(n.disableActiveInteraction??r.getConfig("disableActiveInteraction"))&&e.classList.add("driver-no-interaction");let P=e.parentElement;P&&P!==document.body&&(P.classList.add("driver-active-element-parent"),J2(P)&&P.classList.add("driver-active-element-parent-no-scroll")),e.classList.add("driver-active-element"),e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","true"),e.setAttribute("aria-controls","driver-popover-content")}function _R(){var r;(r=document.getElementById("driver-dummy-element"))==null||r.remove(),document.querySelectorAll(".driver-active-element").forEach(e=>{let n=e.parentElement;n&&n!==document.body&&n.classList.remove("driver-active-element-parent","driver-active-element-parent-no-scroll"),e.classList.remove("driver-active-element","driver-no-interaction"),e.removeAttribute("aria-haspopup"),e.removeAttribute("aria-expanded"),e.removeAttribute("aria-controls")})}function Nm(r){let e=r.getState("__resizeTimeout");e&&window.cancelAnimationFrame(e),r.setState("__resizeTimeout",window.requestAnimationFrame(()=>gR(r)))}function xR(r,e){var d,m,p;if(!r.getState("isInitialized")||!(e.key==="Tab"||e.keyCode===9))return;let n=r.getState("__activeElement"),a=(d=r.getState("popover"))==null?void 0:d.wrapper,o=By([...a?[a]:[],...n?[n]:[]]),c=o[0],u=o[o.length-1];e.preventDefault(),e.shiftKey?(m=o[o.indexOf(document.activeElement)-1]||u)==null||m.focus():(p=o[o.indexOf(document.activeElement)+1]||c)==null||p.focus()}function yR(r,e){(r.getConfig("allowKeyboardControl")??!0)&&(e.key==="Escape"?r.emit("escapePress"):e.key==="ArrowRight"?r.emit("arrowRightPress"):e.key==="ArrowLeft"&&r.emit("arrowLeftPress"))}function SR(r,e){let n=r.getState("__activeElement"),a=e.target;!n||!a||!n.contains(a)||r.emit("activeElementClick")}function MR(r){let e=u=>yR(r,u),n=u=>xR(r,u),a=()=>Nm(r),o=()=>Nm(r),c=u=>SR(r,u);r.setState("__events",{onKeyup:e,onKeydown:n,onResize:a,onScroll:o,onClick:c}),window.addEventListener("keyup",e,!1),window.addEventListener("keydown",n,!1),window.addEventListener("resize",a),window.addEventListener("scroll",o),document.addEventListener("click",c,!1)}function bR(r){let e=r.getState("__events");e&&(window.removeEventListener("keyup",e.onKeyup),window.removeEventListener("keydown",e.onKeydown),window.removeEventListener("resize",e.onResize),window.removeEventListener("scroll",e.onScroll),document.removeEventListener("click",e.onClick,!1))}function ER(){let r={};function e(n={}){r={animate:!0,duration:400,allowClose:!0,allowScroll:!0,overlayClickBehavior:"close",overlayOpacity:.7,smoothScroll:!1,disableActiveInteraction:!1,advanceOnClick:!1,skipMissingElement:!1,waitForElement:0,showProgress:!1,stagePadding:10,stageRadius:5,popoverOffset:10,showButtons:["next","previous","close"],disableButtons:[],overlayColor:"#000",...n}}return e(),{getConfig:(n=>n?r[n]:r),configure:e}}function TR(){let r={},e=(o=>o?r[o]:r),n=(o,c)=>{r[o]=c};function a(){r={}}return{getState:e,setState:n,resetState:a}}function AR(){let r={};function e(o,c){r[o]=c}function n(o){var c;(c=r[o])==null||c.call(r)}function a(){r={}}return{listen:e,emit:n,reset:a}}function wR(r={}){let e=ER();e.configure(r);let n=TR(),a=AR(),o;return{getConfig:e.getConfig,setConfig:e.configure,getState:n.getState,setState:n.setState,resetState:n.resetState,listen:a.listen,emit:a.emit,resetEmitter:a.reset,getDriver:()=>o,setDriver:c=>{o=c},getHookOpts:c=>{let u=c||n.getState();return{config:e.getConfig(),state:u,driver:o,index:u.activeIndex}}}}function RR(r={}){let e=wR(r);function n(){e.getConfig("allowClose")&&E()}function a(){let y=e.getConfig("overlayClickBehavior");if(e.getConfig("allowClose")&&y==="close"){E();return}if(typeof y=="function"){let x=e.getState("__activeStep");y(e.getState("__activeElement"),x,e.getHookOpts());return}if(y==="nextStep"){let x=e.getState("activeStep"),P=e.getState("activeElement"),N=Df(e,x);if(N){N(P,x,e.getHookOpts());return}o()}}function o(){let y=e.getState("activeIndex"),x=e.getConfig("steps")||[];if(y===void 0)return;let P=y+1;x[P]?M(P):E()}function c(){let y=e.getState("activeIndex"),x=e.getConfig("steps")||[];if(y===void 0)return;let P=y-1;x[P]?M(P):E()}function u(y){(e.getConfig("steps")||[])[y]?M(y):E()}function d(){if(e.getState("__transitionCallback"))return;let y=e.getState("__activeStep");if(!y||!(y.advanceOnClick??e.getConfig("advanceOnClick")))return;let x=e.getState("__activeElement"),P=Df(e,y);if(P){P(x,y,e.getHookOpts());return}o()}function m(){if(e.getState("__transitionCallback"))return;let y=e.getState("activeIndex"),x=e.getState("__activeStep"),P=e.getState("__activeElement");if(y===void 0||x===void 0||!(e.getConfig("steps")||[])[y-1])return;let N=Wy(e,x);if(N)return N(P,x,e.getHookOpts());c()}function p(){if(e.getState("__transitionCallback"))return;let y=e.getState("activeIndex"),x=e.getState("__activeStep"),P=e.getState("__activeElement");if(y===void 0||x===void 0)return;let N=Df(e,x);if(N)return N(P,x,e.getHookOpts());o()}function v(){e.getState("isInitialized")||(e.setState("isInitialized",!0),document.body.classList.add("driver-active",e.getConfig("animate")?"driver-fade":"driver-simple"),e.getConfig("allowScroll")||document.body.classList.add("driver-no-scroll"),document.body.style.setProperty("--driver-animation-duration",`${e.getConfig("duration")||400}ms`),MR(e),e.listen("overlayClick",a),e.listen("activeElementClick",d),e.listen("escapePress",n),e.listen("closeClick",n),e.listen("arrowLeftPress",m),e.listen("arrowRightPress",p))}function _(){let y=e.getState("__pendingWaitCancel");y&&(e.setState("__pendingWaitCancel",void 0),y())}function g(y,x,P){let N=()=>{C.disconnect(),window.clearTimeout(I),e.setState("__pendingWaitCancel",void 0),P()},C=new MutationObserver(()=>{kf(y.element)&&N()}),I=window.setTimeout(N,x);e.setState("__pendingWaitCancel",()=>{C.disconnect(),window.clearTimeout(I)}),C.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0})}function M(y=0,x=!1){_();let P=e.getConfig("steps");if(!P){console.error("No steps to drive through"),E();return}if(!P[y]){E();return}let N=P[y],C=N.waitForElement??e.getConfig("waitForElement")??0;if(!x&&C>0&&N.element&&!kf(N.element)){g(N,C,()=>M(y,!0));return}if(qy(e,N)){let O=e.getState("activeIndex"),z=typeof O=="number"&&y<O?-1:1;P[y+z]?M(y+z):z===1&&E();return}e.setState("__activeOnDestroyed",document.activeElement),e.setState("activeIndex",y);let I=P[y+1];Gx(e,hR(e,y,{onNextClick:()=>{I?M(y+1):E()},onPrevClick:()=>{M(y-1)},onCloseClick:()=>{E()}}))}function E(y=!0){let x=e.getState("__activeElement"),P=e.getState("__activeStep"),N=e.getState("__activeOnDestroyed"),C=e.getConfig("onDestroyStarted");if(y&&C){C(!x||(x==null?void 0:x.id)==="driver-dummy-element"?void 0:x,P,e.getHookOpts());return}let I=(P==null?void 0:P.onDeselected)||e.getConfig("onDeselected"),O=e.getConfig("onDestroyed");document.body.classList.remove("driver-active","driver-fade","driver-simple","driver-no-scroll"),document.body.style.removeProperty("--driver-animation-duration"),_(),bR(e),Iy(e.getState("popover")),_R(),uR(e),e.resetEmitter();let z=e.getState();if(e.resetState(),x&&P){let T=x.id==="driver-dummy-element";I&&I(T?void 0:x,P,e.getHookOpts(z)),O&&O(T?void 0:x,P,e.getHookOpts(z))}N&&N.focus()}let R={isActive:()=>e.getState("isInitialized")||!1,refresh:()=>Nm(e),drive:(y=0)=>{v(),M(y)},setConfig:e.setConfig,setSteps:y=>{_(),e.resetState(),e.setConfig({...e.getConfig(),steps:y})},getConfig:e.getConfig,getState:e.getState,getActiveIndex:()=>e.getState("activeIndex"),isFirstStep:()=>{let y=e.getState("activeIndex");return y!==void 0&&Rs(e,y-1,-1)===void 0},isLastStep:()=>{let y=e.getState("activeIndex");return y!==void 0&&Rs(e,y+1,1)===void 0},getActiveStep:()=>e.getState("activeStep"),getActiveElement:()=>e.getState("activeElement"),getPreviousElement:()=>e.getState("previousElement"),getPreviousStep:()=>e.getState("previousStep"),getNextStep:()=>{let y=e.getConfig("steps")||[],x=e.getState("activeIndex");if(x===void 0)return;let P=Rs(e,x+1,1);return P===void 0?void 0:y[P]},moveNext:o,movePrevious:c,moveTo:u,hasNextStep:()=>{let y=e.getState("activeIndex");return y!==void 0&&Rs(e,y+1,1)!==void 0},hasPreviousStep:()=>{let y=e.getState("activeIndex");return y!==void 0&&Rs(e,y-1,-1)!==void 0},highlight:y=>{v(),Gx(e,{...y,popover:y.popover?{showButtons:[],showProgress:!1,progressText:"",...y.popover}:void 0})},destroy:()=>{E(!1)}};return e.setDriver(R),R}const jy="scope-onboard-v1";function CR(){try{return!localStorage.getItem(jy)}catch{return!1}}const DR=[{head:"the star",keys:[["pull outward","boost that band"],["push through the core","kill it"],["drag across","filter sweep"],["pull far out, hold","echo"],["drag the axis (or d)","dissect"]]},{head:"the stack, open",keys:[["drag a ring","level"],["tap a ring","solo"],["push to the axis","mute"],["pull the axis down (or d)","close"]]},{head:"keys",keys:[["space","pause"],["n","skip"],["left / right","seek"],["up / down","volume"],["[ ]","filter"],["e","echo up"],["shift+e","echo down"],["\\","flat"],["1 / 2 / 3","visual preset"],["r / shift+f / shift+m","source"],["+ / - / 0","zoom"],["shift+h","hide the chrome"]]}];function NR(){const r=e=>e.replace(/[&<>]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[n]);return DR.map(e=>`<div class="tour-leg"><b>${r(e.head)}</b>${e.keys.map(([n,a])=>`<span class="tour-key"><kbd>${r(n)}</kbd><i>${r(a)}</i></span>`).join("")}</div>`).join("")}const LR=[{title:"grab the star",body:"the star is the mixer. pull outward to boost, push through the core to kill. drag across for the filter. pull far out and hold for echo. let go: everything springs back.",anchor:".cn-stage",stack:"closed"},{title:"pull it apart",body:"drag the seam upward (or press D) and the star splits into rings, one per layer of the sound. drag a ring for level, tap to solo, push it to the axis to mute.",anchor:".cn-stage",stack:"open"},{title:"every ring, a visible fader",body:"the layers rows are the same rings: live meter, level slider, solo, mute. hover a row and its ring burns brighter.",anchor:".layers",stack:"open"},{title:"set your vibe",body:"type a feeling: late night drive, gym rage, rainy study. the instrument reads it into moods and tempo and plays real music from audius to match. artist names work too.",anchor:".tuner",stack:"closed"},{title:"split any track",body:"press split into stems and the playing track separates into vocals, drums, bass and other, in your browser. nothing uploaded. each part gets its own ring.",anchor:".deck-split",stack:"closed"},{title:"the full legend",body:NR(),stack:"closed",html:!0}];function UR(){const r=document.querySelector(".driver-popover"),e=document.querySelector(".cn-plate"),n=document.querySelector(".cn-ftr");if(!r||!e)return;const a=r.getBoundingClientRect(),o=(n??e).getBoundingClientRect()[n?"top":"bottom"]-8,c=e.getBoundingClientRect().top+8;if(a.bottom<=o&&a.top>=c)return;const u=Math.max(c,Math.min(a.top,o-a.height));r.style.bottom="auto",r.style.top=`${Math.round(u)}px`}function OR(){let r=!1;const e=()=>{r||(r=!0,requestAnimationFrame(()=>{r=!1,UR()}))};let n=null,a=null;const o=()=>{const u=document.querySelector(".driver-popover");!u||u===n||(n=u,a==null||a.disconnect(),a=new MutationObserver(e),a.observe(u,{attributes:!0,attributeFilter:["style","class"]}),e())},c=new MutationObserver(o);return c.observe(document.body,{childList:!0}),o(),window.addEventListener("resize",e),()=>{c.disconnect(),a==null||a.disconnect(),window.removeEventListener("resize",e)}}function PR({ops:r,onDone:e}){return Ve.useEffect(()=>{const n=document.activeElement,a=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let o=!1;const c=LR.map(m=>({element:m.anchor,waitForElement:m.anchor?1200:0,onHighlightStarted:()=>{r&&(m.stack==="open"?r.openStack():r.closeStack())},popover:{title:m.title,description:m.body,popoverClass:m.html?"plate-tour plate-tour-legend":"plate-tour"}})),u=RR({steps:c,stageRadius:0,stagePadding:8,overlayColor:"#0a0a0a",overlayOpacity:.78,animate:!a,duration:a?0:240,smoothScroll:!a,allowClose:!0,showProgress:!0,progressText:"{{current}}/{{total}}",nextBtnText:"next",prevBtnText:"back",doneBtnText:"play",showButtons:["next","previous","close"],popoverClass:"plate-tour",disableActiveInteraction:!1,onDestroyStarted:()=>{u.hasNextStep()||(o=!0),u.destroy()},onDestroyed:()=>{var m;if(o)try{localStorage.setItem(jy,"1")}catch{}r==null||r.closeStack(),e(),(m=n==null?void 0:n.focus)==null||m.call(n)}});u.drive();const d=OR();return()=>{d(),u.isActive()&&u.destroy()}},[]),null}function Up(r,e){const n=r.trim();if(n.length<=e)return n;const a=n.slice(0,e-1),o=a.lastIndexOf(" ");return(o>(e-1)*.6?a.slice(0,o):a).replace(/[\s,.;:·/-]+$/,"")+"…"}const Zy=[{id:"xZDDOwGqLFY",title:"best of t-series mixtape",channel:"t-series"},{id:"sqfHiNiRmug",title:"bollywood soulful hits",channel:"t-series"},{id:"ND4V-wgtGZ8",title:"best hindi songs 2022",channel:"saregama"},{id:"0XTJdt90Yf0",title:"top hits of arijit & shreya",channel:"saregama"},{id:"N0jnLZxYwYc",title:"mujhse mohabbat ka izhaar",channel:"shemaroo"},{id:"sivn5BX3Lic",title:"uff",channel:"t-series"}];function kx(r){const e=r.trim();if(/^[A-Za-z0-9_-]{11}$/.test(e))return e;const n=e.match(/[?&]v=([A-Za-z0-9_-]{11})/)||e.match(/youtu\.be\/([A-Za-z0-9_-]{11})/)||e.match(/\/(?:embed|shorts|live)\/([A-Za-z0-9_-]{11})/);return n?n[1]:null}let mf=null;function FR(){return mf||(mf=new Promise(r=>{var a;if((a=window.YT)!=null&&a.Player)return r();const e=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{e==null||e(),r()};const n=document.createElement("script");n.src="https://www.youtube.com/iframe_api",document.head.appendChild(n)}),mf)}class BR{constructor(){se(this,"player",null);se(this,"lastError",null);se(this,"index",0);se(this,"list",Zy);se(this,"onError",null)}async mount(e,n){var o,c;if(await FR(),!((o=window.YT)!=null&&o.Player))return;(c=this.player)==null||c.destroy(),this.lastError=null,e.textContent="";const a=document.createElement("div");e.appendChild(a),this.player=new window.YT.Player(a,{videoId:n??this.list[0].id,playerVars:{rel:0,playsinline:1,modestbranding:1,controls:0,disablekb:1},events:{onError:u=>{var d;this.lastError=u.data,(d=this.onError)==null||d.call(this,u.data)}}})}load(e){var n;this.lastError=null,(n=this.player)==null||n.loadVideoById(e)}play(){var e;(e=this.player)==null||e.playVideo()}pause(){var e;(e=this.player)==null||e.pauseVideo()}mute(){var e;(e=this.player)==null||e.mute()}unMute(){var e;(e=this.player)==null||e.unMute()}isMuted(){var e;try{return!!((e=this.player)!=null&&e.isMuted())}catch{return!1}}setVolume(e){var n;try{(n=this.player)==null||n.setVolume(Math.round(e*100))}catch{}}next(){this.list.length&&(this.index=(this.index+1)%this.list.length,this.load(this.list[this.index].id))}read(){const e=this.player;if(!(e!=null&&e.getPlayerState))return{title:null,channel:null,videoId:null,elapsed:0,duration:0,playing:!1,error:this.lastError};let n={};try{n=e.getVideoData()??{}}catch{}const a=o=>{try{const c=o();return Number.isFinite(c)?c:0}catch{return 0}};return{title:n.title||null,channel:n.author||null,videoId:n.video_id||null,elapsed:a(()=>e.getCurrentTime()),duration:a(()=>e.getDuration()),playing:a(()=>e.getPlayerState())===1,error:this.lastError}}dispose(){var e;(e=this.player)==null||e.destroy(),this.player=null}}const Op="https://huggingface.co/Politrees/UVR_resources/resolve/main/models/MDXNet/UVR-MDX-NET-Voc_FT.onnx";let gf=null;async function zR(r){if(gf)return gf;try{const e=await caches.open("scope-ml-v1"),n=await e.match(Op);if(n)return gf=await n.arrayBuffer();const a=await fetch(Op);if(!a.ok||!a.body)return null;const o=Number(a.headers.get("content-length"))||66762490,c=a.body.getReader(),u=[];let d=0;for(;;){const{done:v,value:_}=await c.read();if(v)break;u.push(_),d+=_.length,r({stage:"model",pct:d/o*100})}const m=new Uint8Array(d);let p=0;for(const v of u)m.set(v,p),p+=v.length;return await e.put(Op,new Response(m.slice().buffer,{headers:{"content-type":"application/octet-stream"}})).catch(()=>{}),gf=m.buffer}catch{return null}}let IR=null;function HR(){return IR??(IR=new Worker(new URL("/SCOPE/assets/split.worker-Dd7nUwMI.js",import.meta.url),{type:"module"}))}async function GR(r,e,n){n({stage:"fetch",pct:0});const[a,o]=await Promise.all([fetch(r),zR(n)]);if(!a.ok)throw new Error(`fetch ${a.status}`);const c=await a.arrayBuffer();n({stage:"decode",pct:0});const d=await new OfflineAudioContext(2,2,44100).decodeAudioData(c),m=d.getChannelData(0),p=d.numberOfChannels>1?d.getChannelData(1):d.getChannelData(0),v=new Float32Array(m),_=new Float32Array(p);return new Promise((g,M)=>{const E=HR(),R=y=>{const x=y.data;if((x==null?void 0:x.kind)==="progress")n({stage:x.stage,pct:x.pct});else if((x==null?void 0:x.kind)==="done"){E.removeEventListener("message",R);const P=x.order,N=x.channels,C=P.map((I,O)=>{const z=e.createBuffer(2,d.length,44100);return z.copyToChannel(N[O*2],0),z.copyToChannel(N[O*2+1],1),{role:I,buffer:z}});g(C)}};E.addEventListener("message",R),E.addEventListener("error",y=>M(new Error(y.message)),{once:!0}),E.postMessage({kind:"split",ch0:v,ch1:_,sampleRate:44100,model:o},[v.buffer,_.buffer])})}const Vx=.065,kR=.85,VR=.002,XR=3,qR=90,WR=8e-4,vf=48,YR=12,jR=.9,ZR=1.12,KR=2.6,QR=300,JR=60,$R=.35,e3=2.2,t3=.06,n3=.109,i3=.04,a3=1,s3=.45,r3=3,o3=4,l3=.85,c3=.17,u3=.13,f3=.6,h3=.3,d3=.25,p3=1.2,m3=12,_f=.04;class Pp{constructor(e){se(this,"buf");se(this,"head",0);se(this,"n",0);se(this,"sum",0);se(this,"sumSq",0);this.cap=e,this.buf=new Float64Array(e)}push(e){if(this.n===this.cap){const n=this.buf[this.head];this.sum-=n,this.sumSq-=n*n}else this.n++;this.buf[this.head]=e,this.sum+=e,this.sumSq+=e*e,this.head=(this.head+1)%this.cap}at(e){if(this.n===0)return 0;const n=Math.min(e,this.n-1);return this.buf[(this.head-1-n+this.cap*2)%this.cap]}get count(){return this.n}get full(){return this.n===this.cap}clear(){this.head=0,this.n=0,this.sum=0,this.sumSq=0}}class g3{constructor(){se(this,"fluxRing",new Pp(qR));se(this,"rmsLong",new Pp(QR));se(this,"rmsGuard",new Pp(JR));se(this,"onsetZ",new Float64Array(vf));se(this,"sortBuf",new Float64Array(vf));se(this,"onsetHead",0);se(this,"onsetN",0);se(this,"p90",0);se(this,"live",!1);se(this,"armed",!1);se(this,"sustain",0);se(this,"lastDrop",-1/0);se(this,"elapsed",0);se(this,"seeded",!1);se(this,"trackMean",0);se(this,"trackDev",_f);se(this,"value",{tier:0,drop:0,strong:0,beat:0,calm:1,ready:!1})}update(e,n,a){const o=this.value;this.seeded||(this.trackMean=e.rms,this.trackDev=_f,this.seeded=!0),this.elapsed+=a,o.drop*=Math.exp(-a/l3),o.strong*=Math.exp(-a/c3),o.beat*=Math.exp(-a/u3),this.live=e.rms>=(this.live?Vx*kR:Vx);const c=this.live;o.ready=this.elapsed>=XR&&this.fluxRing.full;const u=this.fluxRing.count,d=u>0?this.fluxRing.sum/u:0,m=Xx(this.fluxRing.sum,this.fluxRing.sumSq,u),p=(e.flux-d)/(m+WR);if(this.fluxRing.push(e.flux),e.onset&&c&&e.flux>=VR){this.onsetZ[this.onsetHead]=p,this.onsetHead=(this.onsetHead+1)%vf,this.onsetN<vf&&this.onsetN++,this.p90=this.percentile(jR);const z=Math.max(this.p90*ZR,KR),T=Lm(.45+.55*(p-1.6)/Math.max(1,z-1.6));if(T>o.beat&&(o.beat=T),o.ready&&this.onsetN>=YR&&p>z){const B=Lm(.7+.3*(p/z-1));B>o.strong&&(o.strong=B)}}this.rmsLong.push(e.rms),this.rmsGuard.push(e.rms);const _=this.rmsLong.count-this.rmsGuard.count,g=this.rmsLong.sum-this.rmsGuard.sum,M=this.rmsLong.sumSq-this.rmsGuard.sumSq,E=_>0?g/_:0,R=Xx(g,M,_),y=E+Math.max(t3,e3*R),x=this.rmsLong.full&&e.rms>=n3&&e.rms>y;if(!(o.ready&&n-this.lastDrop>o3))this.armed=!1,this.sustain=0;else if(this.armed)x?(this.sustain+=a,this.sustain>=s3&&(o.drop=1,this.lastDrop=n,this.armed=!1,this.sustain=0)):(this.sustain-=a*r3,this.sustain<=0&&(this.armed=!1,this.sustain=0));else{const z=Math.max(1,Math.round($R/Math.max(a,1e-4))),T=e.rms-this.rmsLong.at(z);x&&T>=Math.max(i3,a3*R)&&(this.armed=!0,this.sustain=0)}const N=1-Math.exp(-a/m3);this.trackMean+=(e.rms-this.trackMean)*N,this.trackDev+=(Math.abs(e.rms-this.trackMean)-this.trackDev)*N;const C=Math.max(_f,this.trackDev*1.5),I=c?1-v3(this.trackMean-C,this.trackMean+C,e.rms):1;o.calm+=(I-o.calm)*(1-Math.exp(-a/f3));let O=0;return o.ready&&c&&(o.drop>=h3?O=3:o.strong>=d3?O=2:(e.sinceOnset<p3||o.beat>=.05)&&(O=1)),o.tier=O,o}reset(){this.fluxRing.clear(),this.rmsLong.clear(),this.rmsGuard.clear(),this.onsetHead=0,this.onsetN=0,this.p90=0,this.live=!1,this.armed=!1,this.sustain=0,this.lastDrop=-1/0,this.elapsed=0,this.seeded=!1,this.trackMean=0,this.trackDev=_f;const e=this.value;e.tier=0,e.drop=0,e.strong=0,e.beat=0,e.calm=1,e.ready=!1}percentile(e){const n=this.onsetN,a=this.sortBuf;for(let o=0;o<n;o++)a[o]=this.onsetZ[o];for(let o=1;o<n;o++){const c=a[o];let u=o-1;for(;u>=0&&a[u]>c;)a[u+1]=a[u],u--;a[u+1]=c}return a[Math.min(n-1,Math.floor(e*(n-1)))]}}function Xx(r,e,n){if(n<2)return 0;const a=r/n;return Math.sqrt(Math.max(0,e/n-a*a))}function Lm(r){return r<0?0:r>1?1:r}function v3(r,e,n){if(e<=r)return n>=e?1:0;const a=Lm((n-r)/(e-r));return a*a*(3-2*a)}const _3={radio:"[01]",file:"[02]",mic:"[03]",stems:"[04]",tube:"[05]"},Ko=r=>!isFinite(r)||r<0?"0:00":`${Math.floor(r/60)}:${String(Math.floor(r%60)).padStart(2,"0")}`;function x3(){const r=Ve.useRef(null),e=Ve.useRef(null),n=Ve.useRef(null),a=Ve.useRef(null),o=Ve.useRef(null),c=Ve.useRef(null),u=Ve.useRef([]),d=Ve.useRef(null),m=Ve.useRef(null),[p,v]=Ve.useState(!1),[_,g]=Ve.useState(!1),[M,E]=Ve.useState(!1),R=Ve.useRef(0),y=Ve.useRef(!1),[x,P]=Ve.useState(null),[N,C]=Ve.useState("radio"),[I,O]=Ve.useState(!1),[z,T]=Ve.useState(null),[B,K]=Ve.useState(!1),[G,Y]=Ve.useState(!1),[de,Se]=Ve.useState(.8),[ae,H]=Ve.useState(!1),[k,ne]=Ve.useState(!1),[ve,Re]=Ve.useState({turb:1,expo:1,spin:1}),[F,Q]=Ve.useState(null),Ne=Ve.useRef(null),ze=Ve.useRef(null),Ze=Ve.useRef(null),re=Ve.useRef(null),Me=Ve.useRef(null),De=Ve.useRef(null),[nt,vt]=Ve.useState(null),[Ke,yn]=Ve.useState(null),[Ut,It]=Ve.useState(!1),[Bt,zt]=Ve.useState(!1),[Rn,Un]=Ve.useState("idle"),[bn,Cn]=Ve.useState(""),fn=Ve.useRef(!1),[Sn,j]=Ve.useState(null),Ht=Ve.useRef(null),Gt=Ve.useRef(0),[U,b]=Ve.useState(1),[te,he]=Ve.useState(!1),[_e,Pe]=Ve.useState(""),[We,xe]=Ve.useState(null),[ye,Fe]=Ve.useState("idle"),[et,Ye]=Ve.useState(!1),[Ie,lt]=Ve.useState(null),ct=Ve.useRef(0),He=Ve.useRef(null),[q,Be]=Ve.useState(null),be=Ve.useRef(null),Xe=Ve.useRef(null),Qe=Ve.useRef(null),Ae=Ve.useRef(null),rt=Ve.useRef(ve),tt=Ve.useRef(null),[En,cn]=Ve.useState(0),[Ei,Ti]=Ve.useState("0:00"),Qa=Ve.useRef(null),Ua=Ve.useRef(null),Oa=Ve.useRef(null),_a=Ve.useRef(null),Ai=Ve.useRef(null),On=Ve.useRef(null),Jt=Ve.useRef(null),hn=Ve.useRef(null),Pa=Ve.useRef(null),Wt=Ve.useRef(null),rn=Ve.useRef(!1),In=Ve.useRef(null),wi=Ve.useRef(null),si=Ve.useRef(null),gi=Ve.useRef(0);Ve.useEffect(()=>{var L;rt.current=ve,(L=hn.current)==null||L.setTuning(ve.turb,ve.expo,ve.spin)},[ve]),Ve.useEffect(()=>{N!=="tube"||!De.current||!Me.current||Me.current.mount(De.current)},[N]),Ve.useEffect(()=>{var bt;const L=Ze.current;if(!p||!L)return;const X=L.parentElement;if(!X)return;let ge=0;const J=()=>{const ht=L.scrollHeight-L.scrollTop-L.clientHeight>1;X.classList.toggle("more",ht);const wt=re.current;if(!wt)return;const gn=L.scrollHeight-L.clientHeight;if(gn<=1){wt.classList.remove("on");return}const ei=Math.max(24,L.clientHeight*(L.clientHeight/L.scrollHeight)),$t=L.scrollTop/gn*(L.clientHeight-ei);wt.style.setProperty("--bar-track",`${L.clientHeight}px`),wt.style.setProperty("--bar-h",`${ei.toFixed(1)}px`),wt.style.setProperty("--bar-y",`${$t.toFixed(1)}px`)},Oe=()=>{const ht=re.current;!ht||L.scrollHeight-L.clientHeight<=1||(ht.classList.add("on"),clearTimeout(ge),!$e&&(ge=window.setTimeout(()=>ht.classList.remove("on"),850)))};let $e=null;const Ce=(bt=re.current)==null?void 0:bt.firstElementChild,xt=()=>Math.max(24,L.clientHeight*(L.clientHeight/L.scrollHeight)),mt=ht=>{if($e)return;const wt=X.getBoundingClientRect();ht.clientX>=wt.right-18&&ht.clientY>=wt.top&&ht.clientY<=wt.bottom&&Oe()},ot=ht=>{var wt;L.scrollHeight-L.clientHeight<=1||(ht.preventDefault(),ht.stopPropagation(),Ce==null||Ce.setPointerCapture(ht.pointerId),$e={y:ht.clientY,top:L.scrollTop},(wt=re.current)==null||wt.classList.add("on","drag"),clearTimeout(ge))},Nt=ht=>{if(!$e)return;ht.preventDefault();const wt=L.scrollHeight-L.clientHeight,gn=Math.max(1,L.clientHeight-xt());L.scrollTop=$e.top+(ht.clientY-$e.y)/gn*wt},Tt=ht=>{var wt,gn;$e&&($e=null,(wt=Ce==null?void 0:Ce.releasePointerCapture)==null||wt.call(Ce,ht.pointerId),(gn=re.current)==null||gn.classList.remove("drag"),Oe())};Ce==null||Ce.addEventListener("pointerdown",ot),Ce==null||Ce.addEventListener("pointermove",Nt),Ce==null||Ce.addEventListener("pointerup",Tt),Ce==null||Ce.addEventListener("pointercancel",Tt),X.addEventListener("pointermove",mt),J(),L.addEventListener("scroll",J,{passive:!0}),L.addEventListener("scroll",Oe,{passive:!0});const Ge=new ResizeObserver(J);Ge.observe(L);const ft=new MutationObserver(J);return ft.observe(L,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]}),()=>{L.removeEventListener("scroll",J),L.removeEventListener("scroll",Oe),Ce==null||Ce.removeEventListener("pointerdown",ot),Ce==null||Ce.removeEventListener("pointermove",Nt),Ce==null||Ce.removeEventListener("pointerup",Tt),Ce==null||Ce.removeEventListener("pointercancel",Tt),X.removeEventListener("pointermove",mt),clearTimeout(ge),Ge.disconnect(),ft.disconnect(),X.classList.remove("more")}},[p]),Ve.useEffect(()=>{if(!Sn)return;const L=()=>fe();return window.addEventListener("pointerdown",L),window.addEventListener("keydown",L),()=>{window.removeEventListener("pointerdown",L),window.removeEventListener("keydown",L)}},[Sn]),Ve.useEffect(()=>{if(p)return;const L=new Float32Array(240);let X=0,ge=0;const J=()=>{var xt,mt;const $e=hn.current;L[X%L.length]=$e?$e.readMotion():0,X++,R3(Ne.current,L,X);const Ce=ze.current;if(Ce){const ot=(mt=(xt=Wt.current)==null?void 0:xt.analyser)==null?void 0:mt.features,Nt=ot&&ot.rms>.014;Ce.textContent=Nt?`${w3(20*Math.pow(1e3,ot.centroid))}`:"idle"}ge=requestAnimationFrame(J)},Oe=()=>{var $e;y.current||($e=window.__focus)==null||$e.call(window,!0)};return Oe(),ge=requestAnimationFrame(J),window.addEventListener("resize",Oe),()=>{cancelAnimationFrame(ge),window.removeEventListener("resize",Oe)}},[p]),Ve.useEffect(()=>{const L=Wt.current;L&&(L.el.volume=de)},[de]),Ve.useEffect(()=>{const L=Wt.current;L&&(L.rate=U)},[U]),Ve.useEffect(()=>{const L=r.current;if(!L)return;const X=new FM;Wt.current=X,X.setPlaylist(z2);let ge=0;X2(null).then(ie=>{ie.length>=8&&ge<1&&X.kind==="radio"&&!rn.current&&(ge=1,X.setPlaylist(ie))}),fetch("/SCOPE/tracks-local/manifest.json").then(ie=>ie.ok?ie.json():null).then(ie=>{ie!=null&&ie.length&&X.kind==="radio"&&!rn.current&&(ge=2,X.setPlaylist(ie))}).catch(()=>{}),X.onTrackChange=ie=>{var Ue;if(Oe.reset(),X.kind!=="stems"&&((Ue=He.current)!=null&&Ue.playing)&&(He.current.pause(),He.current.solo(null),J.setVocal(0),Ri()),P(ie),Pa.current=ie,C(X.kind),rn.current&&ie&&T({text:ie.title,key:Date.now()}),X.kind==="file")return;const Le=++gi.current;si.current=null,X.kind==="radio"&&(ie!=null&&ie.src)&&I2(ie.src).then(ke=>{gi.current===Le&&(si.current=ke)})};const J=new B2(L);hn.current=J;const Oe=new g3;J.dropCssEl=In.current;const $e=new IM,Ce=new VM;let xt=0,mt=0,ot=0;const Nt=320,Tt=(ie=!1)=>{var it;let Ue=rn.current&&mt>720?(Nt+(mt-Nt)/2)/mt:.5,ke=.5,qe=1;if(!rn.current){const At=document.querySelector(".pl-fig");if(At&&ot>0){const yt=At.getBoundingClientRect();yt.height>40&&(Ue=(yt.left+yt.width/2)/mt,ke=(yt.top+yt.height/2)/ot,qe=Math.max(1,ot/yt.height*.92))}}J.setFocus(Ue,ke,qe,ie),(it=In.current)==null||it.style.setProperty("--cx",`${(Ue*100).toFixed(2)}%`)};window.__focus=Tt;const Ge=()=>{if(mt=L.clientWidth,ot=L.clientHeight,J.resize(mt,ot),a.current){const ie=Math.min(2,window.devicePixelRatio||1);a.current.width=mt*ie,a.current.height=ot*ie}Tt(!0)};Ge(),window.addEventListener("resize",Ge);let ft=[];const bt=new Float32Array(6),ht=new Set;let wt=-1;const gn=new Float32Array(6).fill(1),ei=1.4,$t=ie=>ie<1?(ie-1)*30:(ie-1)*22.5,en=()=>{const ie=Wt.current;if(!ie)return;const Le=ke=>ht.has(ke)||wt>=0&&wt!==ke;for(let ke=0;ke<6;ke++){const qe=ft[ke];ie.tierEq(ke,qe&&qe.band?Le(ke)?-30:$t(gn[ke]):0)}const Ue=ke=>{const qe=ft.map((it,At)=>it.band===ke?At:-1).filter(it=>it>=0);return qe.length&&qe.every(it=>Le(it))?.08:1};J.setEqVis(Ue("low"),Ue("mid"),Ue("high"))},Ri=()=>{var ie;ft=[{label:"sub",band:"low"},{label:"bass",band:"low"},{label:"lowmid",band:"mid"},{label:"mid",band:"mid"},{label:"himid",band:"high"},{label:"air",band:"high"}],ht.clear(),wt=-1,gn.fill(1),en(),J.setTierMap(Array.from({length:24},(Le,Ue)=>Math.floor(Ue/4)),6),(ie=Wt.current)==null||ie.setTierBands(6)},an=ie=>{const Ue=["bass","drums","other","vocals"].filter(qe=>ie.some(it=>it.role===qe));if(Ue.length<2)return Ri();ft=Ue.map(qe=>({label:qe,role:qe})),ht.clear(),wt=-1,gn.fill(1),en();const ke=24/Ue.length;J.setTierMap(Array.from({length:24},(qe,it)=>Math.min(Ue.length-1,Math.floor(it/ke))),Ue.length,Ue.indexOf("vocals"))},dt={t:0,latched:!1,axis:!1,sy0:0,t0:0,drag:null};Ri(),Qe.current={openStack(){dt.latched=!0,dt.t=1,J.setDissect(1)},closeStack(){dt.latched=!1,dt.t=0,J.setDissect(0)}},Xe.current={arm(ie){an(ie),dt.latched=!0,dt.t=1,J.setDissect(1)}},Ae.current={gain(ie,Le){var ke;const Ue=ft[ie];Ue&&(Ue.role?(ke=He.current)==null||ke.setStemGain(Ue.role,Le):(gn[ie]=Math.max(0,Math.min(2,Le)),en()))},solo(ie){const Le=ft[ie];if(Le)if(Le.role){const Ue=He.current;Ue==null||Ue.solo(Ue.soloRole===Le.role?null:Le.role)}else wt=wt===ie?-1:ie,en()},mute(ie){var Ue;const Le=ft[ie];Le&&(Le.role?(Ue=He.current)==null||Ue.toggleMuteRole(Le.role):(ht.has(ie)?ht.delete(ie):ht.add(ie),en()))},hover(ie){J.setHiTier(ie)}};const ki=()=>{},xa=28,no=matchMedia("(pointer: coarse)").matches?44:18,fl=(ie,Le,Ue,ke,qe,it)=>{const At=qe-Ue,yt=it-ke,sn=At*At+yt*yt,Pn=sn>0?Math.max(0,Math.min(1,((ie-Ue)*At+(Le-ke)*yt)/sn)):0;return Math.hypot(ie-(Ue+Pn*At),Le-(ke+Pn*yt))},Ls=(ie,Le,Ue)=>{let ke=1e9;const qe=J.surveyPoint(ie,0,1);let it=qe;for(let At=1;At<=xa;At++){const yt=At===xa?qe:J.surveyPoint(ie,At/xa*Math.PI*2,1),sn=fl(Le,Ue,it.x,it.y,yt.x,yt.y);sn<ke&&(ke=sn),it=yt}return ke},$a=(ie,Le)=>{let Ue=-1,ke=1e9;for(let qe=0;qe<ft.length;qe++){const it=Ls(qe,ie,Le);it<ke&&(ke=it,Ue=qe)}return{tier:Ue,d:ke}},hl=(ie,Le)=>{const{tier:Ue,d:ke}=$a(ie,Le);return ke>no?-1:Ue},io=matchMedia("(pointer: fine)").matches,Ec=matchMedia("(prefers-reduced-motion: reduce)").matches,Ot={x:-100,y:-100,tx:-100,ty:-100,down:0,overUi:!1,dragging:!1,lx:0,ly:0,axisHover:!1};let ta="",Us=-1,za=!1;const ya=(ie,Le)=>{var Ue;Ot.tx=ie,Ot.ty=Le,!za&&(za=!0,Ot.x=ie,Ot.y=Le,(Ue=In.current)==null||Ue.classList.add("cursor-armed"))},Os=ie=>ya(ie.clientX,ie.clientY),Er=ie=>{var Le;ie.relatedTarget||(za=!1,(Le=In.current)==null||Le.classList.remove("cursor-armed"),wi.current&&(wi.current.style.opacity="0"),J.setHover(0))},dl=ie=>{var Ue,ke;if(ya(ie.clientX,ie.clientY),Ot.overUi=!!((ke=(Ue=ie.target)==null?void 0:Ue.closest)!=null&&ke.call(Ue,'.rail, .cn-hdr, .cn-ftr, button, a, input, [role="slider"]')),!Ec){if(io&&(J.setPointer(ie.clientX/Math.max(1,mt)-.5,ie.clientY/Math.max(1,ot)-.5),J.setHover(Ot.overUi||St.on||dt.axis||dt.drag||Ot.dragging?0:1)),Ot.dragging&&J.dragBy((ie.clientX-Ot.lx)*.006,(ie.clientY-Ot.ly)*.004),dt.axis)dt.t=Math.max(0,Math.min(1,dt.t0+(dt.sy0-ie.clientY)/240)),ki("axis-move",+dt.t.toFixed(2)),J.setDissect(dt.t),Jt.current&&(Jt.current.textContent=`dissect ${Math.round(dt.t*100)}%`);else if(dt.drag){const qe=dt.drag;if(Math.hypot(ie.clientX-qe.sx,ie.clientY-qe.sy)>7&&(qe.moved=!0),qe.moved){const it=Yn(),At=qe.sx>=it.x?1:-1,yt=Math.max(0,Math.min(ei,1+((ie.clientX-it.x)*At-qe.dx0)/200));qe.lvl=yt;const sn=ft[qe.tier],Pn=Wt.current;sn.role&&He.current?He.current.setStemGain(sn.role,yt):sn.band&&(gn[qe.tier]=Math.max(0,Math.min(ei,yt)),Pn==null||Pn.tierEq(qe.tier,$t(yt))),Jt.current&&(Jt.current.textContent=`${sn.label} ${Math.round(yt*100)}%`),ki("tier-move",{tier:qe.tier,lvl:+yt.toFixed(2)})}}else if(St.on){const qe=Wt.current,it=Yn(),At=Math.hypot(ie.clientX-it.x,ie.clientY-it.y),yt=Math.max(-1,Math.min(1.8,(At-St.r0)/St.r0)),sn=yt<0?yt*30:Math.min(1,yt)*9;if(li.eq=sn,(qe==null?void 0:qe.kind)==="stems"&&He.current){const Tn=Math.atan2(-(St.sy-it.y),St.sx-it.x),Xn=Tn>Math.PI*.25&&Tn<Math.PI*.75?"vocals":Tn<-Math.PI*.25&&Tn>-Math.PI*.75?"drums":Math.abs(Tn)>=Math.PI*.75?"bass":"other";St.stemRole=Xn,He.current.setStemGain(Xn,yt<0?1+yt:1+Math.min(1,yt))}else qe==null||qe.eq(St.band,sn);const Pn=yt<0?1+yt*.95:1+Math.min(1,yt)*.5;J.setEqVis(St.band==="low"?Pn:1,St.band==="mid"?Pn:1,St.band==="high"?Pn:1),li.sweep=Math.max(-1,Math.min(1,(ie.clientX-St.sx)/(mt*.3))),qe==null||qe.sweep(li.sweep),St.echo=Math.max(0,Math.min(1,yt-.8)),qe==null||qe.echo(St.echo);const vi=J.grabPlane(ie.clientX/mt*2-1,-(ie.clientY/ot)*2+1),Sa=St.band==="low"?0:St.band==="mid"?1:2;J.setGrab(vi,.65+Math.min(1.2,Math.abs(yt))*.55,Sa),Jt.current&&(Jt.current.textContent=St.echo>.02?`( echo ${Math.round(St.echo*100)}% )`:Math.abs(li.sweep)>.05&&Math.abs(ie.movementX??1)>Math.abs(ie.movementY??0)?`${li.sweep<0?"hp":"lp"} ${Math.round(Math.abs(li.sweep)*100)}`:St.stemRole?`${St.stemRole} ${yt<0?Math.round((1+yt)*100)+"%":"+"+Math.round(Math.min(1,yt)*100)+"%"}`:`${St.band} ${sn>0?"+":""}${Math.round(sn)}db`)}}if(!St.on&&!dt.axis&&!dt.drag&&!Ot.dragging&&rn.current){const qe=Yn();Ot.axisHover=!Ot.overUi&&J.dissect<.5&&Math.abs(ie.clientX-qe.x)<30&&Math.abs(ie.clientY-qe.y)<ot*.38;let it="",At=-1;if(Ot.axisHover)it="dissect ↕";else if(J.dissect>.5&&!Ot.overUi){const yt=hl(ie.clientX,ie.clientY);yt>=0&&(it=`${ft[yt].label} · grab`,At=yt)}At!==Us&&(Us=At,J.setHiTier(At)),Jt.current&&(it||Jt.current.textContent===ta)&&(Jt.current.textContent=it),ta=it}else Ot.axisHover=!1;Ot.lx=ie.clientX,Ot.ly=ie.clientY},St={on:!1,band:"mid",stemRole:null,sx:0,sy:0,r0:1,echo:0},li={sweep:0,eq:0},ci={sweep:0,echo:0},Yn=()=>{if(!rn.current)return{x:mt/2,y:ot/2};const ie=J.projectLocal(0,0,0);return Number.isFinite(ie.x)&&Number.isFinite(ie.y)?ie:{x:mt/2,y:ot/2}},Ia=ie=>{var sn,Pn,vi,Sa,Tn,Xn,na,zs,Is,ia;if(Ot.down=1,Ot.lx=ie.clientX,Ot.ly=ie.clientY,!!((Pn=(sn=ie.target)==null?void 0:sn.closest)!=null&&Pn.call(sn,'.rail, .cn-hdr, .cn-ftr, button, a, input, [role="slider"]'))||!rn.current)return;const Ue=J.bodyHit(ie.clientX/mt*2-1,-(ie.clientY/ot)*2+1),ke=J.dissect,qe=Yn();ki("down",{x:Math.round(ie.clientX),y:Math.round(ie.clientY),dis:+ke.toFixed(2),pts:ui.size});const it=Math.abs(ie.clientX-qe.x),At=ke>.5?$a(ie.clientX,ie.clientY):{tier:-1,d:1e9},yt=At.tier>=0&&At.d<=no&&At.d<it;if(ui.size<2&&(ie.shiftKey||it<30&&(ke>.3||Ue)&&!yt)){dt.axis=!0,dt.sy0=ie.clientY,dt.t0=dt.t,(vi=In.current)==null||vi.classList.add("grabbing");return}if(ke>.5&&ui.size<2){const _i=hl(ie.clientX,ie.clientY);if(_i>=0){const Ma=ft[_i],is=Ma!=null&&Ma.role?((Tn=(Sa=He.current)==null?void 0:Sa.info().find(wr=>wr.role===Ma.role))==null?void 0:Tn.gain)??1:gn[_i];dt.drag={tier:_i,dx0:Math.max(30,Math.abs(ie.clientX-qe.x)),sx:ie.clientX,sy:ie.clientY,downAt:performance.now(),moved:!1,lvl:1,g0:is},(Xn=In.current)==null||Xn.classList.add("mixing"),ft[_i].band&&ht.has(_i)&&(ht.delete(_i),en());return}Ot.dragging=!0,(na=In.current)==null||na.classList.add("grabbing");return}if(Ue&&ui.size<2&&((zs=Wt.current)==null?void 0:zs.kind)!=="tube"){St.on=!0,St.sx=ie.clientX,St.sy=ie.clientY;const _i=Yn();St.r0=Math.max(40,Math.hypot(ie.clientX-_i.x,ie.clientY-_i.y));const Ma=_i.y-St.r0,is=(ie.clientY-Ma)/(2*St.r0);St.band=is<.34?"high":is<.66?"mid":"low",(Is=In.current)==null||Is.classList.add("mixing"),J.setGrab(Ue,.6,St.band==="low"?0:St.band==="mid"?1:2)}else Ot.dragging=!0,(ia=In.current)==null||ia.classList.add("grabbing")},es=()=>{var ie,Le,Ue;if(Ot.dragging=!1,(ie=In.current)==null||ie.classList.remove("grabbing"),dt.axis&&(dt.axis=!1,dt.latched=dt.t>.85,dt.t=dt.latched?1:0,J.setDissect(dt.t),Jt.current&&(Jt.current.textContent="")),dt.drag){const ke=dt.drag;dt.drag=null,(Le=In.current)==null||Le.classList.remove("mixing");const qe=ft[ke.tier],it=He.current,At=!ke.moved&&performance.now()-ke.downAt<350;ki("tier-up",{tier:ke.tier,moved:ke.moved,lvl:+ke.lvl.toFixed(2)}),At?qe.role&&it?it.solo(it.soloRole===qe.role?null:qe.role):qe.band&&(wt=wt===ke.tier?-1:ke.tier,en()):ke.lvl<=.07?qe.role&&it?(it.toggleMuteRole(qe.role),it.setStemGain(qe.role,ke.g0)):qe.band&&ht.add(ke.tier):qe.role&&it&&it.setStemGain(qe.role,ke.g0),en(),Jt.current&&(Jt.current.textContent="")}if(St.on){St.on=!1,(Ue=In.current)==null||Ue.classList.remove("mixing");const ke=Wt.current;St.stemRole&&He.current&&He.current.setStemGain(St.stemRole,1),St.stemRole=null,ke==null||ke.eq(St.band,0),ke==null||ke.echo(ci.echo),li.sweep=ci.sweep,ke==null||ke.sweep(ci.sweep),St.echo=ci.echo,J.setGrab(null,0),en(),li.eq=0,Jt.current&&(Jt.current.textContent="")}};window.addEventListener("pointermove",dl),window.addEventListener("pointerover",Os),window.addEventListener("pointerdown",Os),document.addEventListener("pointerout",Er),window.addEventListener("pointerdown",Ia),window.addEventListener("pointerup",es),window.addEventListener("pointercancel",es);const Hn={ema:.016,cool:3,q:1},pl=new Float32Array(220);let Ps=0,ts=0,Ha=0,Fs=0,ns=null,ml=!1,Tc=0,Ac=!1;const Bs=new Float32Array(6).fill(1);let gl=0,wc=performance.now(),vl=0,ao=0,Rc="idle";const _l=ie=>{var ia,_i,Ma,is,so,wr,Hs,Gs;gl=requestAnimationFrame(_l);const Le=Math.min(.05,(ie-wc)/1e3);wc=ie;const Ue=X.analyser.update(Le),ke=X.analyser.now,qe=$e.update(Ue,X.analyser.onsets,ke,Le),it=Ce.update(Ue,qe,ke,Le),At=Oe.update(Ue,ke,Le),yt=At.tier===3&&xt!==3;if(xt=At.tier,J.setEnergy(At.drop,At.strong,yt,At.calm),Ue.onset&&(Ha=1,J.onset()),Ha*=Math.exp(-Le*9),J.setBands(Ue.bands),qe.tempoConfidence>.2&&qe.tempo>0&&X.setEchoTime(60/qe.tempo*(qe.tempo>140?1:.75)),it.trigger&&(ts=Math.max(ts,.4+it.strength*.6),rn.current&&it.strength>.25)){const An=ft.findIndex(Et=>Et.role==="drums");J.burst(Math.min(1,it.strength*(1+At.drop*2.2+At.strong*.5)),An>=0?An:0)}ts*=Math.exp(-Le*5);const sn=He.current;if(X.kind==="stems"&&(sn!=null&&sn.playing)){const An=sn.info();ns=An;let Et=0,at=0;for(const gt of An)gt.role==="vocals"&&(Et=Math.max(Et,gt.level)),gt.role==="drums"&&(at=Math.max(at,gt.level));if(J.setVocal(Math.min(1.4,Et*4)),at>.3&&at>Fs*1.6){const gt=ft.findIndex(kt=>kt.role==="drums");J.burst(Math.min(1,at*1.6),gt>=0?gt:null),Ha=1}Fs=at*.7+Fs*.3}else X.kind!=="stems"&&J.setVocal(0);const Pn=X.el,vi=X.kind==="stems"&&He.current?He.current.currentTime()/Math.max(1,He.current.duration):Pn.duration>0?Pn.currentTime/Pn.duration:0,Sa=si.current?H2(si.current,vi,8):0;let Tn=Ue.low,Xn=Ue.mid,na=Ue.high;const zs=rn.current?1-Math.min(1,Ue.rms/.05):1;if(zs>.002){const An=performance.now()/1e3,Et=(Ht.current?2.6:rn.current?1.8:1)*zs,at=.5+.5*Math.sin(An*1.1636),gt=.5+.5*Math.sin(An*.31+1.7);Tn=Math.max(Tn,.2*Et*at*(.7+.3*gt)),Xn=Math.max(Xn,.07*Et*at*gt),na=Math.max(na,.03*Et*(.5+.5*Math.sin(An*1.43)))}J.render(Le,Tn,Xn,na,ts,Sa,Ha),rn.current&&!Ac&&(Ac=!0,Tc=ie+4500,CR()&&setTimeout(()=>Ye(!0),900));const Is=Ot.axisHover||dt.axis||ie<Tc;if(J.dissect>.004||Is){ml=!0;for(let Et=0;Et<ft.length;Et++){const at=ft[Et];if(at.role){let gt=0;if(ns)for(const kt of ns)kt.role===at.role&&(gt=Math.max(gt,kt.level));bt[Et]=Math.min(1,gt*3)}else{const gt=24/ft.length,kt=Math.round(Et*gt),jn=Math.round((Et+1)*gt);let aa=0;for(let sa=kt;sa<jn;sa++)aa+=Ue.bands[sa];bt[Et]=Math.min(1,aa/Math.max(1,jn-kt)*1.6)}}for(let Et=0;Et<6;Et++){const at=ft[Et],gt=at?at.role?Math.min(1.4,bt[Et]*1.5):ht.has(Et)||wt>=0&&wt!==Et?.08:Math.min(1.4,gn[Et]):1,jn=((ia=dt.drag)==null?void 0:ia.moved)&&dt.drag.tier===Et?26:gt>Bs[Et]?14:2.2;Bs[Et]+=(gt-Bs[Et])*Math.min(1,Le*jn)}J.setTierLevels(Bs);const An={solo:-1,muted:[]};for(let Et=0;Et<ft.length;Et++){const at=ft[Et];at.role?(An.muted[Et]=!!(ns!=null&&ns.some(gt=>gt.role===at.role&&gt.muted)),(sn==null?void 0:sn.soloRole)===at.role&&(An.solo=Et)):(An.muted[Et]=ht.has(Et),wt===Et&&(An.solo=Et))}D3(a.current,J,ft,bt,An,ts,Ue.rms,Is)}else if(ml){ml=!1;const An=(_i=a.current)==null?void 0:_i.getContext("2d");An&&a.current&&An.clearRect(0,0,a.current.width,a.current.height)}if(pl[Ps]=Ue.rms,Ps=(Ps+1)%pl.length,io&&wi.current){Ot.x+=(Ot.tx-Ot.x)*Math.min(1,Le*14),Ot.y+=(Ot.ty-Ot.y)*Math.min(1,Le*14),Ot.down*=Math.exp(-Le*7);const An=1+Ot.down*.5;wi.current.style.transform=`translate(${Ot.x}px, ${Ot.y}px) translate(-50%, -50%) scale(${An})`,wi.current.style.opacity=za?"1":"0"}if(document.visibilityState==="visible"&&rn.current&&(Hn.ema+=(Le-Hn.ema)*.02,Hn.cool-=Le,Hn.cool<=0&&(Hn.ema>.024&&Hn.q>.55?(Hn.q=.55,J.setQuality(Hn.q),Hn.cool=5):Hn.ema<.014&&Hn.q<1&&(Hn.q=1,J.setQuality(Hn.q),Hn.cool=5))),X.capturing&&fn.current?ao=Ue.rms>.0015?0:ao+Le:ao=0,vl+=Le,vl>.16){vl=0;const An=X.capturing?ao>2?"silent":"live":"idle";An!==Rc&&(Rc=An,Un(An)),C3(e.current,pl,Ps,si.current,vi),N3(n.current,Ue.bands,St.on?St.band:null,li.eq);const Et=X.el;if(c.current&&(c.current.textContent=`tracking ${(94+qe.tempoConfidence*5.9).toFixed(2)}%`),tt.current){const at=qe.tempoConfidence>.12,gt=at?`${Math.round(qe.tempo)}`:"--",kt=(Ma=Pa.current)==null?void 0:Ma.bpm;tt.current.textContent=kt?`${gt} / ${kt}`:gt,tt.current.classList.toggle("locked",at)}if(Qa.current){const at=Math.round(Math.min(1,Ue.rms)*12),gt=Qa.current.children;for(let kt=0;kt<gt.length;kt++)gt[kt].className=kt<at?"on":""}if(On.current&&(On.current.textContent=`fps ${Math.min(120,Math.round(1/Math.max(.001,Hn.ema)))} · pts ${Math.round((108e3*J.densityNow+2600+3600)/1e3)}k · quality ${Hn.q<1?"reduced":"full"}`),Y(X.kind==="stems"?!(((is=He.current)==null?void 0:is.playing)??!1):((so=Wt.current)==null?void 0:so.el.paused)??!1),X.kind==="stems"||J.dissect>.25){const at=X.kind==="stems"?((wr=He.current)==null?void 0:wr.info())??null:null,gt=[];for(let kt=ft.length-1;kt>=0;kt--){const jn=ft[kt];if(jn.role&&at){let aa=0,sa=1,as=!1;for(const ss of at)ss.role===jn.role&&(aa=Math.max(aa,ss.level),sa=ss.gain,as=as||ss.muted);gt.push({i:kt,label:jn.label,level:aa,gain:sa,muted:as,solo:((Hs=He.current)==null?void 0:Hs.soloRole)===jn.role,hot:Us===kt})}else{const aa=24/ft.length,sa=Math.round(kt*aa),as=Math.round((kt+1)*aa);let ss=0;for(let xl=sa;xl<as;xl++)ss+=Ue.bands[xl];gt.push({i:kt,label:jn.label,level:Math.pow(Math.min(1,ss/Math.max(1,as-sa)),.6),gain:gn[kt],muted:ht.has(kt),solo:wt===kt,hot:Us===kt})}}be.current=gt,Be(gt)}else Be(null);if(Ua.current){const at=J.zoomLevel;Ua.current.textContent=`( zoom ${at.toFixed(1)}× )`,Ua.current.classList.toggle("on",at>1.04)}if(Oa.current){const at=li.sweep;Oa.current.textContent=`( flt ${at<0?"hp":"lp"} ${Math.round(Math.abs(at)*100)} )`,Oa.current.classList.toggle("on",Math.abs(at)>=.04)}if(_a.current&&(_a.current.textContent=`( echo ${Math.round(St.echo*100)}% )`,_a.current.classList.toggle("on",St.echo>.02)),Ai.current){const at=J.dissect;Ai.current.textContent=`( sect ${Math.round(at*100)}% )`,Ai.current.classList.toggle("on",at>.02),(Gs=In.current)==null||Gs.classList.toggle("dissected",at>.25)}for(let at=0;at<5;at++){const gt=u.current[at];if(!gt)continue;const kt=Math.round(Ue.bands[Math.min(23,at*5+2)]*99);gt.textContent=`${"abcde"[at]} :: ${kt}`,gt.style.opacity=Math.sin(ke*(.7+at*.31)+at*2.1)>-.35?"1":"0"}if(X.kind==="tube"&&Me.current){const at=Me.current.read();fn.current=at.playing,yn(gt=>gt&&gt.title===at.title&&gt.channel===at.channel&&Math.round(gt.elapsed)===Math.round(at.elapsed)&&gt.playing===at.playing&&gt.error===at.error?gt:at)}if(rn.current){const at=X.kind==="stems"&&He.current?{t:He.current.currentTime(),d:He.current.duration}:{t:Et.currentTime,d:Et.duration};if(d.current&&(d.current.textContent=Ko(at.t)),m.current&&(m.current.textContent=Ko(at.d)),isFinite(at.d)&&at.d>0){const gt=Math.round(at.t/at.d*100);cn(jn=>jn===gt?jn:gt);const kt=`${Ko(at.t)} of ${Ko(at.d)}`;Ti(jn=>jn===kt?jn:kt)}}O(X.playing)}};gl=requestAnimationFrame(_l);const Cc=ie=>ie.preventDefault(),Dc=ie=>{var qe;ie.preventDefault();const Le=[...((qe=ie.dataTransfer)==null?void 0:qe.files)??[]].filter(it=>/^(audio|video)\//.test(it.type));if(Le.length>=2&&Y2(Le)){rn.current=!0,v(!0),Tt(),J.powerOn(),X.unlock();const it=He.current??new Ox(X.ctx,X.busHead);He.current=it,K(!0),it.load(Le).then(()=>{X.enterStems(`stem deck · ${Le.length} stems`),it.play(0);const At=it.peaks();si.current={amp:At.amp,secondsPerPixel:At.secondsPerPixel},K(!1),an(it.info()),dt.latched=!0,dt.t=1,J.setDissect(1)});return}const Ue=Le[0];if(!Ue)return;rn.current=!0,v(!0),Tt(),J.powerOn(),X.unlock(),X.playFile(Ue);const ke=++gi.current;K(!0),Ux(Ue,X.ctx).then(it=>{gi.current===ke&&(si.current=it,K(!1))})};window.addEventListener("dragover",Cc),window.addEventListener("drop",Dc);const Nc=ie=>{var ke,qe,it,At,yt,sn,Pn,vi,Sa;if((qe=(ke=ie.target)==null?void 0:ke.closest)!=null&&qe.call(ke,'input, textarea, select, button, a[href], [role="slider"], [contenteditable]'))return;if(!rn.current){(ie.code==="Space"||ie.code==="Enter")&&(ie.preventDefault(),(it=document.querySelector(".power"))==null||it.click());return}const Le=Wt.current;if(!Le)return;const Ue=Le.kind==="stems"?He.current:null;switch(ie.code){case"Space":ie.preventDefault(),Ue?Ue.playing?Ue.pause():Ue.play():Le.kind!=="mic"&&(Le.el.paused?Le.el.play():Le.el.pause());break;case"KeyN":Le.kind==="tube"?(At=Me.current)==null||At.next():Le.kind==="radio"?Le.next():Le.playRadio();break;case"ArrowRight":case"ArrowLeft":{if(ie.preventDefault(),Le.kind==="tube")break;const Tn=ie.code==="ArrowRight"?5:-5;if(Ue){Ue.seek(Math.max(0,Math.min(Ue.duration,Ue.currentTime()+Tn)));break}const Xn=Le.el;isFinite(Xn.duration)&&Xn.duration>0&&(Xn.currentTime=Math.max(0,Math.min(Xn.duration,Xn.currentTime+Tn)));break}case"ArrowUp":case"ArrowDown":ie.preventDefault(),Se(Tn=>{var na;const Xn=Math.max(0,Math.min(1,Tn+(ie.code==="ArrowUp"?.05:-.05)));return Le.kind==="tube"&&((na=Me.current)==null||na.setVolume(Xn)),Xn});break;case"Digit1":Re({turb:.6,expo:.8,spin:.5});break;case"Digit2":Re({turb:1,expo:1,spin:1});break;case"Digit3":Re({turb:1.6,expo:1.3,spin:1.8});break;case"KeyR":Le.playRadio();break;case"KeyF":ie.shiftKey&&((yt=o.current)==null||yt.click());break;case"KeyM":ie.shiftKey&&Le.useMic();break;case"KeyH":ie.shiftKey&&he(Tn=>!Tn);break;case"KeyD":dt.latched=!dt.latched,dt.t=dt.latched?1:0,(sn=hn.current)==null||sn.setDissect(dt.t);break;case"Equal":case"NumpadAdd":(Pn=hn.current)==null||Pn.zoomBy(1.25);break;case"Minus":case"NumpadSubtract":(vi=hn.current)==null||vi.zoomBy(1/1.25);break;case"Digit0":(Sa=hn.current)==null||Sa.setZoom(1);break;case"BracketLeft":case"BracketRight":{if(ie.preventDefault(),Le.kind==="tube")break;const Tn=ie.code==="BracketRight"?.12:-.12;ci.sweep=Math.max(-1,Math.min(1,Number((ci.sweep+Tn).toFixed(2)))),li.sweep=ci.sweep,Le.sweep(ci.sweep);break}case"Backslash":if(ie.preventDefault(),Le.kind==="tube")break;ci.sweep=0,ci.echo=0,li.sweep=0,St.echo=0,Le.sweep(0),Le.echo(0);break;case"KeyE":{if(ie.preventDefault(),Le.kind==="tube")break;const Tn=ie.shiftKey?-.2:.2;ci.echo=Math.max(0,Math.min(1,Number((ci.echo+Tn).toFixed(2)))),St.echo=ci.echo,Le.echo(ci.echo);break}}};window.addEventListener("keydown",Nc);const Lc=ie=>{var Le,Ue;ie.ctrlKey||(Ue=(Le=ie.target)==null?void 0:Le.closest)!=null&&Ue.call(Le,".rail, .spec")||(ie.preventDefault(),J.zoomBy(ie.deltaY<0?1.12:1/1.12))};window.addEventListener("wheel",Lc,{passive:!1});const ui=new Map;let Tr=0;const Uc=ie=>{var Le,Ue;if(!((Ue=(Le=ie.target)==null?void 0:Le.closest)!=null&&Ue.call(Le,".rail, .spec"))&&(ui.set(ie.pointerId,{x:ie.clientX,y:ie.clientY}),ui.size===2)){const[ke,qe]=[...ui.values()];Tr=Math.hypot(ke.x-qe.x,ke.y-qe.y)}},Oc=ie=>{if(!ui.has(ie.pointerId)||(ui.set(ie.pointerId,{x:ie.clientX,y:ie.clientY}),ui.size!==2))return;const[Le,Ue]=[...ui.values()],ke=Math.hypot(Le.x-Ue.x,Le.y-Ue.y);Tr>0&&ke>0&&J.zoomBy(ke/Tr),Tr=ke},Ar=ie=>{ui.delete(ie.pointerId),ui.size<2&&(Tr=0)};return window.addEventListener("pointerdown",Uc),window.addEventListener("pointermove",Oc),window.addEventListener("pointerup",Ar),window.addEventListener("pointercancel",Ar),()=>{cancelAnimationFrame(gl),window.removeEventListener("resize",Ge),window.removeEventListener("dragover",Cc),window.removeEventListener("drop",Dc),window.removeEventListener("keydown",Nc),window.removeEventListener("wheel",Lc),window.removeEventListener("pointerdown",Uc),window.removeEventListener("pointermove",Oc),window.removeEventListener("pointerup",Ar),window.removeEventListener("pointercancel",Ar),window.removeEventListener("pointermove",dl),window.removeEventListener("pointerover",Os),window.removeEventListener("pointerdown",Os),document.removeEventListener("pointerout",Er),window.removeEventListener("pointerdown",Ia),window.removeEventListener("pointerup",es),window.removeEventListener("pointercancel",es)}},[]);const ea=async()=>{const L=Wt.current;L&&(L.kind!=="tube"&&vt(L.kind),Me.current||(Me.current=new BR,Me.current.onError=X=>{var ge;(X===101||X===150)&&(L.announce("embedding blocked","the owner disabled it for this video"),(ge=Me.current)==null||ge.next())}),L.enterTube())},Ja=()=>{var ge,J;const L=Wt.current;if(!L)return;(ge=Me.current)==null||ge.pause(),Bn();const X=nt;vt(null),X==="mic"?L.useMic():X==="file"?(J=o.current)==null||J.click():L.playRadio()},Fa=async()=>{var X;const L=await((X=Wt.current)==null?void 0:X.useTabAudio())??!1;It(L),L&&zt(!0)},Bn=()=>{var L;(L=Wt.current)==null||L.stopTabAudio(),It(!1)},Ns=async(L,X=!0)=>{var $e;const ge=Wt.current;if(!ge||!L.trim())return;Fe("loading");const{tracks:J,read:Oe}=await q2(L.trim());if(xe(Oe),!J.length){Fe("empty");return}Fe("idle");try{localStorage.setItem("scope-vibe",L.trim())}catch{}ge.setPlaylist(J),!rn.current&&!Ht.current&&(rn.current=!0,v(!0),window.__focus(),($e=hn.current)==null||$e.powerOn()),X&&await ge.playRadio()},A=async()=>{var $e;const L=Wt.current,X=hn.current;if(!L||!X||!L.el.src||Ie)return;const ge=++ct.current,J=(x==null?void 0:x.title)??"track",Oe=L.el.currentTime||0;try{const Ce=await GR(L.el.src,L.ctx,ot=>{ct.current===ge&&lt(`${ot.stage} ${Math.round(ot.pct)}%`)});if(ct.current!==ge)return;const xt=He.current??new Ox(L.ctx,L.busHead);He.current=xt,xt.loadBuffers(Ce.map(ot=>({role:ot.role,name:`${ot.role} · split`,buffer:ot.buffer}))),L.enterStems(`${Up(J,22)} · split`),xt.play(Oe);const mt=xt.peaks();si.current={amp:mt.amp,secondsPerPixel:mt.secondsPerPixel},($e=Xe.current)==null||$e.arm(xt.info()),lt(null)}catch{ct.current===ge&&(lt("split failed"),setTimeout(()=>ct.current===ge&&lt(null),2500))}},Z=()=>{var Nt;const L=hn.current,X=window.innerWidth,ge=window.innerHeight,J=(Nt=document.querySelector(".pl-fig"))==null?void 0:Nt.getBoundingClientRect();if(!L||!J||window.matchMedia("(prefers-reduced-motion: reduce)").matches){fe();return}const Oe=1050,$e=1e3,Ce={x:(J.left+J.width/2)/X,y:(J.top+J.height/2)/ge,d:Math.max(1,ge/J.height*.92)},xt=X>720?(320+(X-320)/2)/X:.5,mt=performance.now(),ot=()=>{if(!Ht.current)return;const Tt=performance.now()-mt;if(Tt<Oe){L.setRev(Math.min(1,Tt/Oe)),Gt.current=requestAnimationFrame(ot);return}Ht.current!=="dive"&&(Ht.current="dive",j("dive"));const Ge=Math.min(1,(Tt-Oe)/$e),ft=Ge*Ge*Ge;if(L.setRev(1+ft*2.5),L.setFocus(Ce.x+(xt-Ce.x)*ft,Ce.y+(.5-Ce.y)*ft,Ce.d+(.16-Ce.d)*ft,!0),Ge>.8&&!rn.current&&(rn.current=!0,v(!0)),Ge<1){Gt.current=requestAnimationFrame(ot);return}fe()};Gt.current=requestAnimationFrame(ot)},fe=()=>{var L;Gt.current&&cancelAnimationFrame(Gt.current),Gt.current=0,Ht.current=null,j(null),(L=hn.current)==null||L.setRev(0),rn.current||(rn.current=!0,v(!0)),window.__focus(!1)},oe=()=>{if(!rn.current||Ht.current)return;const L=hn.current,X=L?{...L.focusNow}:null;if(y.current=!0,rn.current=!1,v(!1),L==null||L.setDissect(0),!L||!X||window.matchMedia("(prefers-reduced-motion: reduce)").matches){y.current=!1,requestAnimationFrame(()=>{window.__focus(!0)});return}E(!0),requestAnimationFrame(()=>{const ge=document.querySelector(".pl-fig"),J=window.innerWidth,Oe=window.innerHeight;if(!ge){y.current=!1,E(!1);return}let $e=0,Ce=0;for(let ft=ge;ft;ft=ft.offsetParent)$e+=ft.offsetLeft,Ce+=ft.offsetTop;const xt=ge.offsetWidth,mt=ge.offsetHeight,ot={x:($e+xt/2)/J,y:(Ce+mt/2)/Oe,d:Math.max(1,Oe/mt*.92)},Nt=1e3,Tt=performance.now(),Ge=()=>{const ft=performance.now()-Tt,bt=Math.min(1,ft/Nt),ht=1-Math.pow(1-bt,3);if(L.setRev((1-ht)*1.4),L.setFocus(X.x+(ot.x-X.x)*ht,X.y+(ot.y-X.y)*ht,X.d+(ot.d-X.d)*ht,!0),bt<1){R.current=requestAnimationFrame(Ge);return}L.setRev(0),y.current=!1,E(!1),window.__focus(!1)};R.current=requestAnimationFrame(Ge)})},le=()=>{var X,ge;if(rn.current||Ht.current)return;g(!0),Ht.current="rev",j("rev"),Z(),(X=hn.current)==null||X.powerOn();let L=null;try{L=localStorage.getItem("scope-vibe")}catch{}(ge=Wt.current)==null||ge.playRadio(),L&&(Pe(L),Ns(L,!1))},je=Ie?Ie.toUpperCase():B?"DECODING ///":x?`${Up(x.title,26).toUpperCase()}${N==="file"?".MP3":""}`:"NO CARRIER";return D.jsxs("div",{ref:In,className:`app${p?" live":""}${te?" ambient":""}`,children:[D.jsx("canvas",{ref:r,className:"stage","aria-hidden":"true"}),D.jsx("canvas",{ref:a,className:"survey","aria-hidden":"true"}),D.jsxs("div",{ref:wi,className:"reticle","aria-hidden":"true",children:[D.jsx("i",{className:"ret-h"}),D.jsx("i",{className:"ret-v"}),D.jsx("i",{className:"ret-dot"}),D.jsx("span",{ref:Jt,className:"ret-label"})]}),D.jsx("div",{className:"x-v"}),D.jsx("div",{className:"x-h"}),!p&&D.jsxs("div",{className:`plate${Sn?` ${Sn}`:""}${M?" arrive":""}`,children:[D.jsxs("header",{className:"pl-hdr",children:[D.jsxs("div",{children:[D.jsx("b",{children:"[scope-01]"})," ",D.jsx("span",{className:"hlbl",children:"polar audio instrument"})]}),D.jsxs("div",{className:"k",children:["//unit_ ",D.jsx("span",{children:"d-01"})]}),D.jsxs("div",{className:"k",children:["//rev_ ",D.jsx("span",{children:"2.6"})]}),D.jsxs("div",{className:"k",children:["//ch_ ",D.jsx("span",{children:"01"})]})]}),D.jsxs("div",{className:"pl-body",children:[D.jsxs("div",{className:"pl-l",children:[D.jsxs("div",{className:"pl-morse",children:[D.jsx("span",{className:"lbl",children:"sig"}),D.jsxs("span",{className:"pl-sig",children:[D.jsx("svg",{width:"100%",height:"7",viewBox:`0 0 ${qx.total} 7`,preserveAspectRatio:"none","aria-hidden":"true",children:D.jsx("g",{fill:"currentColor",opacity:".62",children:qx.rects.map(L=>D.jsx("rect",{x:L.x,y:"3",width:L.w,height:"1.5"},L.x))})}),D.jsx("i",{className:"pl-carrier","aria-hidden":"true"})]}),D.jsx("span",{className:"lbl",children:"tx"})]}),D.jsx("div",{className:"pl-figwrap",children:D.jsxs("div",{className:"pl-fig",children:[D.jsx("i",{className:"brk tl"}),D.jsx("i",{className:"brk tr"}),D.jsx("i",{className:"brk bl"}),D.jsx("i",{className:"brk br"}),D.jsx(Yx,{className:"reg a"}),D.jsx(Yx,{className:"reg b"}),D.jsxs("div",{className:"pl-figcap",children:[D.jsx("span",{children:"fig.01 · particle field"}),D.jsx("span",{children:"108,000 pts · fibonacci sphere"})]})]})}),D.jsxs("div",{className:"pl-wave",children:[D.jsx("canvas",{ref:Ne,"aria-hidden":"true"}),D.jsx("span",{className:"wlbl",children:"motion"})]}),D.jsx("ul",{className:"pl-leads",children:["set a vibe","split any track","pull it apart"].map((L,X)=>D.jsxs("li",{style:{"--i":X},children:[D.jsx("span",{className:"no",children:"abc"[X]}),D.jsx("span",{children:D.jsx(xr,{text:L,duration:700+X*150})}),D.jsx("i",{className:"ln","aria-hidden":"true"}),D.jsx("b",{className:"dot","aria-hidden":"true"})]},L))}),D.jsxs("div",{className:"pl-band",children:[D.jsxs("div",{className:"pl-mark",children:[D.jsxs("h1",{children:["scope",D.jsx("span",{className:"pl-reg",children:"®"})]}),D.jsx("div",{className:"pl-echo","aria-hidden":"true",children:"scope"})]}),D.jsx("div",{className:"pl-checks","aria-hidden":"true"}),D.jsx("div",{className:"pl-act",children:D.jsx("button",{className:"power",onClick:_?fe:le,children:D.jsx(xr,{text:_?"resume":"power on",duration:520,replayOnHover:!0})})})]})]}),D.jsxs("div",{className:"pl-r",children:[D.jsxs("div",{className:"pl-row",children:[D.jsx("span",{className:"k",children:"//particles_"}),D.jsx("span",{className:"v",children:"108,000"})]}),D.jsxs("div",{className:"pl-row dup",children:[D.jsx("span",{className:"k",children:"//engine_"}),D.jsx("span",{className:"v",children:"webgl 2"})]}),D.jsxs("div",{className:"pl-row dup",children:[D.jsx("span",{className:"k",children:"//source_"}),D.jsx("span",{className:"v",children:"audius"})]}),D.jsxs("div",{className:"pl-row",children:[D.jsx("span",{className:"k",children:"//split_"}),D.jsx("span",{className:"v",children:"mdx-net"})]}),D.jsxs("div",{className:"pl-row opt",children:[D.jsx("span",{className:"k",children:"//stems_"}),D.jsx("span",{className:"v",children:"4 ch"})]}),D.jsxs("div",{className:"pl-row",children:[D.jsx("span",{className:"k",children:"//density_"}),D.jsx(M3,{})]}),D.jsxs("div",{className:"pl-dials",children:[D.jsx(yf,{v:ve.turb,cap:"turb",onChange:L=>Re(X=>({...X,turb:L(X.turb)}))}),D.jsx(yf,{v:ve.expo,cap:"expo",onChange:L=>Re(X=>({...X,expo:L(X.expo)}))}),D.jsx(yf,{v:ve.spin,cap:"spin",onChange:L=>Re(X=>({...X,spin:L(X.spin)}))})]}),D.jsxs("div",{className:"pl-row pl-peak",children:[D.jsxs("div",{className:"pl-peak-hd",children:[D.jsx("span",{className:"k",children:"//peak_"}),D.jsx("span",{ref:ze,className:"v",children:"idle"})]}),D.jsx(A3,{}),D.jsxs("div",{className:"pl-peak-hd",children:[D.jsx("span",{className:"k",children:"20hz"}),D.jsx("span",{className:"k",children:"20khz"})]})]}),D.jsxs("div",{className:"pl-path",children:[D.jsxs("div",{className:"pl-row",children:[D.jsx("span",{className:"k",children:"//path_"}),D.jsx("span",{className:"v",children:"signal chain"})]}),y3.map(L=>D.jsxs("div",{className:`pl-prow${L.sub?" sub":""}`,onMouseEnter:()=>Q(L.i),onMouseLeave:()=>Q(null),children:[D.jsx("span",{className:"ix",children:L.ix}),D.jsx("span",{className:"nm",children:L.n}),D.jsx("span",{className:"dt",children:L.d})]},L.n)),D.jsx("div",{className:"pl-pathcap",children:F??"hover a stage"})]}),D.jsxs("div",{className:"pl-pills",children:[D.jsxs("span",{className:"pill on",children:["( ",_?"live":"idle"," )"]}),D.jsx("span",{className:"pill",children:"( ready )"}),D.jsx("span",{className:"pill",children:"( 44.1k )"})]}),D.jsx("div",{className:"pl-strip","aria-hidden":"true"})]})]}),D.jsxs("footer",{className:"pl-ftr",children:[D.jsxs("span",{children:[D.jsx("span",{className:"pl-meta",children:"/ webgl · 108k particles"}),D.jsxs("span",{className:"pl-by",children:[D.jsx(Wx,{})," made by noon"]})]}),D.jsx("span",{children:"/ drop a track anywhere"}),D.jsx("span",{children:"/ audius · artist-owned radio"})]})]}),p&&D.jsxs("div",{className:"cn-plate",children:[D.jsxs("header",{className:"pl-hdr cn-hdr",children:[D.jsxs("div",{children:[D.jsx("b",{children:"[scope-02]"})," ",D.jsx("span",{className:"hlbl",children:"console"})]}),D.jsxs("div",{className:"k",children:["//src_ ",D.jsx("span",{children:_3[N]}),D.jsx("i",{className:`src-dot${I?" live":""}`})]}),N!=="tube"&&D.jsxs("div",{className:`k cn-rate${U!==1?" armed":""}`,children:["//rate_ ",D.jsxs("span",{children:[U.toFixed(2),"×"]})]}),D.jsxs("button",{className:"cn-back",onClick:oe,children:["← ",D.jsx("span",{children:"standby"})]}),D.jsx("button",{className:"rail-help",onClick:()=>Ye(!0),"aria-label":"how to play","aria-haspopup":"dialog",children:D.jsx("span",{"aria-hidden":"true",children:"?"})})]}),D.jsxs("div",{className:"cn-body",children:[D.jsxs("main",{className:"rail","aria-label":"instrument console",children:[D.jsx("h1",{className:"sr-only",children:"scope console"}),D.jsxs("div",{ref:Ze,className:"rail-stack",children:[D.jsxs("h2",{className:"cn-mod",children:[D.jsx("span",{children:"01 · now playing"}),D.jsx("i",{children:"//deck_"})]}),D.jsxs("div",{className:"nowplaying rail-sec",style:{"--i":1},children:[N!=="tube"&&D.jsxs("div",{className:"pl-row cn-track",children:[D.jsx("span",{className:"k",children:"//track_"}),D.jsx("samp",{className:"deck-name",role:"status","aria-live":"polite",children:D.jsx(xr,{text:je,duration:700})})]}),x&&N!=="tube"&&D.jsxs("dl",{className:"deck-meta",children:[D.jsxs("div",{children:[D.jsx("dt",{children:"//bpm_"}),D.jsx("dd",{ref:tt,className:"deck-bpm",children:"--"})]}),x.musicalKey&&D.jsxs("div",{children:[D.jsx("dt",{children:"//key_"}),D.jsx("dd",{children:x.musicalKey.toLowerCase()})]}),x.genre&&D.jsxs("div",{children:[D.jsx("dt",{children:"//genre_"}),D.jsx("dd",{children:x.genre.toLowerCase()})]}),x.artist&&D.jsxs("div",{children:[D.jsx("dt",{children:"//artist_"}),D.jsx("dd",{children:x.link?D.jsx("a",{href:x.link,target:"_blank",rel:"noopener noreferrer",children:x.artist.replace(" · audius","")}):x.artist.replace(" · audius","")})]})]}),N!=="tube"&&D.jsx("canvas",{ref:e,className:"deck-wave",width:464,height:104,role:"slider",tabIndex:0,"aria-label":"seek","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round(En),"aria-valuetext":Ei,onKeyDown:L=>{const X=Wt.current;if(!X)return;const ge=X.kind==="stems"&&He.current?He.current.duration:X.el.duration;if(!isFinite(ge)||ge<=0)return;const J=$e=>{const Ce=Math.max(0,Math.min(ge,$e));X.kind==="stems"&&He.current?He.current.seek(Ce):X.el.currentTime=Ce},Oe=X.kind==="stems"&&He.current?He.current.currentTime():X.el.currentTime;L.key==="ArrowRight"?(L.preventDefault(),L.stopPropagation(),J(Oe+5)):L.key==="ArrowLeft"?(L.preventDefault(),L.stopPropagation(),J(Oe-5)):L.key==="Home"?(L.preventDefault(),L.stopPropagation(),J(0)):L.key==="End"&&(L.preventDefault(),L.stopPropagation(),J(ge))},onPointerDown:L=>{const X=L.currentTarget.getBoundingClientRect(),ge=Math.max(0,Math.min(1,(L.clientX-X.left)/X.width)),J=Wt.current;if((J==null?void 0:J.kind)==="stems"&&He.current){He.current.seek(ge*He.current.duration);return}const Oe=J==null?void 0:J.el;!Oe||!isFinite(Oe.duration)||Oe.duration<=0||(Oe.currentTime=ge*Oe.duration)}}),N!=="tube"&&D.jsxs("div",{className:"deck-time",children:[D.jsx("data",{ref:d,children:"0:00"}),D.jsx("data",{ref:m,children:"0:00"})]}),D.jsx("div",{className:`railfold${N!=="mic"?" open":""}`,children:D.jsxs("div",{className:`transport${N==="tube"?" no-pitch":""}`,children:[D.jsx("button",{className:"t-btn",onClick:()=>{var X,ge;const L=Wt.current;if(L){if(L.kind==="tube"){Ke!=null&&Ke.playing?(X=Me.current)==null||X.pause():(ge=Me.current)==null||ge.play();return}if(L.kind==="stems"){const J=He.current;J&&(J.playing?J.pause():J.play());return}L.el.paused?L.el.play():L.el.pause()}},children:N==="tube"?Ke!=null&&Ke.playing?"pause":"play":G?"play":"pause"}),D.jsx("button",{className:"t-btn",onClick:()=>{var X;const L=Wt.current;if(L){if(L.kind==="tube"){(X=Me.current)==null||X.next();return}L.kind==="radio"?L.next():L.playRadio()}},children:N==="file"||N==="stems"?"radio":"skip"}),D.jsx("button",{className:`t-btn t-mute${ae?" on":""}`,"aria-pressed":ae,onClick:()=>{var X,ge,J,Oe;const L=!ae;if(H(L),((X=Wt.current)==null?void 0:X.kind)==="tube"){L?(ge=Me.current)==null||ge.mute():(J=Me.current)==null||J.unMute();return}(Oe=Wt.current)==null||Oe.setMuted(L)},children:ae?"muted":"mute"}),D.jsxs("div",{className:"vol",children:[D.jsx("span",{children:"vol"}),D.jsx("input",{type:"range",min:0,max:1,step:.01,value:de,onChange:L=>{var ge,J;const X=Number(L.target.value);Se(X),((ge=Wt.current)==null?void 0:ge.kind)==="tube"&&((J=Me.current)==null||J.setVolume(X))},"aria-label":"volume"})]}),N!=="tube"&&D.jsxs("label",{className:"dial dial-pitch",children:[D.jsx("span",{children:"pitch"}),D.jsx("input",{type:"range",min:.5,max:1.5,step:.01,value:U,onChange:L=>b(Number(L.target.value)),onDoubleClick:()=>b(1),"aria-label":"pitch (playback speed, bends like vinyl)"}),D.jsx("data",{className:U!==1?"armed":"",children:Math.round(U*100)})]})]})}),D.jsxs("div",{className:`railfold${(N==="radio"||N==="file")&&x?" open":""}`,children:[D.jsx("button",{className:"deck-split",onClick:()=>{Ie||A()},"aria-disabled":!!Ie,"aria-busy":!!Ie,children:Ie??"split into stems"}),D.jsx("span",{className:"sr-only",role:"status",children:Ie??""})]})]}),D.jsx("div",{className:`railfold${N==="tube"?" open":""}`,children:D.jsxs("div",{className:"tube rail-sec",children:[D.jsxs("h2",{className:"cn-mod sub",children:[D.jsx("span",{children:"01.1 · jukebox"}),D.jsxs("button",{className:"cn-mod-back",onClick:Ja,children:["← ",nt??"radio"]})]}),(Ke==null?void 0:Ke.title)&&D.jsxs("div",{className:"pl-row",children:[D.jsx("span",{className:"k",children:"//track_"}),D.jsx("span",{className:"v",children:Ke.title})]}),(Ke==null?void 0:Ke.channel)&&D.jsxs("div",{className:"pl-row",children:[D.jsx("span",{className:"k",children:"//channel_"}),D.jsx("span",{className:"v",children:Ke.channel})]}),Ke&&Ke.duration>0&&D.jsxs("div",{className:"pl-row",children:[D.jsx("span",{className:"k",children:Ko(Ke.elapsed)}),D.jsx("span",{className:"v",children:Ko(Ke.duration)})]}),D.jsx("div",{className:"tube-listen",children:Ut?D.jsxs(D.Fragment,{children:[D.jsxs("div",{className:"pl-row",children:[D.jsx("span",{className:"k",children:"//listening_"}),Rn==="silent"?D.jsx("span",{className:"v sig-silent",children:"no audio"}):D.jsx("span",{className:"v listening-dot",children:"this tab"})]}),Rn==="silent"&&D.jsxs("p",{className:"cn-hint tube-step",role:"status",children:["this tab is shared but no sound is coming through. stop, share again, and tick ",D.jsx("b",{children:"also share tab audio"})," in the chrome dialog. it is off by default."]}),D.jsx("div",{className:"cells c1",children:D.jsx("button",{onClick:Bn,children:"stop listening"})})]}):D.jsxs(D.Fragment,{children:[!Bt&&D.jsx("p",{className:"cn-hint",children:"the star can react to this tab. nothing is recorded and nothing leaves your machine. scope only reads the levels."}),D.jsx("div",{className:"cells c1",children:D.jsx("button",{onClick:()=>void Fa(),children:"let the star listen"})}),!Bt&&D.jsxs("p",{className:"cn-hint tube-step",children:["chrome will ask what to share. pick ",D.jsx("b",{children:"this tab"}),", then tick"," ",D.jsx("b",{children:"also share tab audio"}),". that checkbox is the one that matters."]})]})}),!Bt&&D.jsx("p",{className:"cn-hint",children:"grabbing the star is off here. youtube owns the sound, so eq, filter and echo would move nothing. the visual dials still work."}),D.jsxs("div",{className:"vibe tube-paste",children:[D.jsx("input",{value:bn,onChange:L=>Cn(L.target.value),placeholder:"paste a youtube link or id…","aria-label":"play a youtube link",autoComplete:"off",spellCheck:!1,onKeyDown:L=>{var ge,J;if(L.key!=="Enter")return;const X=kx(bn);X?((ge=Me.current)==null||ge.load(X),Cn("")):(J=Wt.current)==null||J.announce("not a youtube link","paste a watch url or an 11-character id")}}),D.jsx("button",{onClick:()=>{var X,ge;const L=kx(bn);L?((X=Me.current)==null||X.load(L),Cn("")):(ge=Wt.current)==null||ge.announce("not a youtube link","paste a watch url or an 11-character id")},children:"go"})]}),D.jsx("div",{className:"cn-hint tube-or",children:"or start here"}),D.jsx("div",{className:"tube-list",children:Zy.slice(0,3).map(L=>D.jsxs("button",{className:(Ke==null?void 0:Ke.videoId)===L.id?"on":"",onClick:()=>{var X;return(X=Me.current)==null?void 0:X.load(L.id)},children:[D.jsx("span",{children:L.title}),D.jsx("i",{children:L.channel})]},L.id))})]})}),D.jsxs("h2",{className:"cn-mod",children:[D.jsx("span",{children:"02 · feed"}),D.jsx("i",{children:"//source_"})]}),D.jsxs("div",{className:"rail-src rail-sec",role:"radiogroup","aria-label":"audio source",style:{"--i":2},children:[D.jsx("button",{role:"radio","aria-checked":N==="radio",className:N==="radio"?"on":"",onClick:()=>{var L;return void((L=Wt.current)==null?void 0:L.playRadio())},children:D.jsx(xr,{text:"radio",duration:380,replayOnHover:!0})}),D.jsx("button",{role:"radio","aria-checked":N==="file",className:N==="file"?"on":"",onClick:()=>{var L;return(L=o.current)==null?void 0:L.click()},children:D.jsx(xr,{text:"file",duration:380,replayOnHover:!0})}),D.jsx("button",{role:"radio","aria-checked":N==="mic",className:N==="mic"?"on":"",onClick:()=>{var L;return void((L=Wt.current)==null?void 0:L.useMic())},children:D.jsx(xr,{text:"mic",duration:380,replayOnHover:!0})}),D.jsx("button",{role:"radio","aria-checked":N==="tube",className:N==="tube"?"on":"",onClick:()=>void ea(),children:D.jsx(xr,{text:"jukebox",duration:380,replayOnHover:!0})})]}),D.jsx("div",{className:`railfold${N==="radio"?" open":""}`,children:D.jsxs("div",{className:"tuner rail-sec",style:{"--i":3},children:[D.jsxs("form",{className:"vibe tuner-find",onSubmit:L=>{L.preventDefault(),Ns(_e)},children:[D.jsx("input",{value:_e,onChange:L=>Pe(L.target.value),placeholder:"set your vibe · or name an artist…","aria-label":"set your vibe",autoComplete:"off",spellCheck:!1}),D.jsx("button",{type:"submit","aria-label":"set vibe",children:"go"})]}),D.jsx("div",{className:"tuner-chips",children:["late night drive","gym rage","rainy study","rooftop sunset"].map(L=>D.jsx("button",{onClick:()=>{Pe(L),Ns(L)},children:L},L))}),D.jsx("span",{className:"tuner-state",role:"status",children:ye==="loading"?"reading the vibe …":ye==="empty"?"nothing playable on audius for that":We??"streaming from audius · artist-owned"}),ye==="empty"&&D.jsx("div",{className:"cells c1",children:D.jsx("button",{onClick:()=>void ea(),children:"try the jukebox instead"})})]})}),D.jsxs("h2",{className:"cn-mod",children:[D.jsx("span",{children:"03 · layers"}),D.jsx("i",{children:N==="tube"?"//meters only_":"//each row is a ring_"})]}),N==="tube"&&q&&D.jsx("p",{className:"cn-hint",children:"the meters are live. the faders are not: youtube owns the sound in jukebox mode, so moving them would change nothing."}),!q&&D.jsx("p",{className:"cn-hint",children:"pull the star apart (or press d) to mix its rings"}),D.jsx("div",{className:`railfold${q?" open":""}`,children:D.jsx("div",{className:"layers rail-sec",style:{"--i":4},children:(q??be.current??[]).map(L=>D.jsxs("div",{className:`layer${L.muted?" layer-muted":""}${L.solo?" layer-solo":""}${L.hot?" layer-hot":""}`,onMouseEnter:()=>{var X;return(X=Ae.current)==null?void 0:X.hover(L.i)},onMouseLeave:()=>{var X;return(X=Ae.current)==null?void 0:X.hover(-1)},children:[D.jsxs("span",{className:"layer-name",children:[String(L.i+1).padStart(2,"0")," ",L.label,D.jsx("i",{className:"layer-meter",children:Array.from({length:8},(X,ge)=>D.jsx("b",{className:ge<Math.round(Math.min(1,L.level)*8)?"on":""},ge))})]}),D.jsx("input",{type:"range",min:0,max:2,step:.01,value:L.gain,onChange:X=>{var ge;return(ge=Ae.current)==null?void 0:ge.gain(L.i,Number(X.target.value))},onDoubleClick:()=>{var X;return(X=Ae.current)==null?void 0:X.gain(L.i,1)},"aria-label":`${L.label} level`,disabled:N==="tube"}),D.jsx("button",{className:`layer-btn${L.solo?" on":""}`,"aria-label":`solo ${L.label}`,"aria-pressed":L.solo,disabled:N==="tube",onClick:()=>{var X;return(X=Ae.current)==null?void 0:X.solo(L.i)},children:D.jsx("span",{"aria-hidden":"true",children:"s"})}),D.jsx("button",{className:`layer-btn layer-btn-m${L.muted?" on":""}`,"aria-label":`mute ${L.label}`,"aria-pressed":L.muted,disabled:N==="tube",onClick:()=>{var X;return(X=Ae.current)==null?void 0:X.mute(L.i)},children:D.jsx("span",{"aria-hidden":"true",children:"m"})})]},L.i))})}),D.jsxs("h2",{className:"cn-mod",children:[D.jsx("span",{children:"04 · visuals"}),D.jsx("i",{children:"//how the star reacts_"})]}),D.jsx("div",{className:"tuning rail-sec",style:{"--i":5},children:D.jsx("div",{className:"pl-dials console-dials",children:[["turb","turb"],["expo","expo"],["spin","spin"]].map(([L,X])=>D.jsx(yf,{v:ve[L],cap:X,onChange:ge=>Re(J=>({...J,[L]:ge(J[L])}))},L))})}),D.jsxs("div",{className:"rail-foot rail-sec",style:{"--i":7},children:[D.jsxs("div",{className:"chips","aria-live":"off",children:[D.jsx("span",{ref:Ua,className:"chip"}),D.jsx("span",{ref:Oa,className:"chip"}),D.jsx("span",{ref:_a,className:"chip"}),D.jsx("span",{ref:Ai,className:"chip"})]}),N!=="stems"&&D.jsx("span",{className:"stemhint",children:"have stems? drop them together (vocals·drums·bass). split any track locally with stemdeck"})]})]}),D.jsxs("div",{className:"rail-dock",children:[D.jsxs("h2",{className:"cn-mod",children:[D.jsx("span",{children:"05 · spectrum"}),D.jsx("i",{children:"//24 bands_"})]}),D.jsxs("div",{className:"spec rail-sec",style:{"--i":6},children:[D.jsx("canvas",{ref:n,width:400,height:144,"aria-hidden":"true"}),D.jsxs("div",{className:"spec-hz",children:[D.jsx("span",{children:"60"}),D.jsx("span",{children:"250"}),D.jsx("span",{children:"1k"}),D.jsx("span",{children:"4k"}),D.jsx("span",{children:"12k"})]})]}),D.jsxs("div",{className:"level",children:[D.jsx("span",{className:"level-tag",children:"level"}),D.jsx("div",{ref:Qa,className:"level-meter","aria-hidden":"true",children:Array.from({length:12},(L,X)=>D.jsx("i",{},X))})]})]}),D.jsx("i",{ref:re,className:"railbar","aria-hidden":"true",children:D.jsx("i",{})})]}),D.jsxs("div",{className:"cn-stage",children:[D.jsx("i",{className:"cn-brk tl"}),D.jsx("i",{className:"cn-brk tr"}),D.jsx("i",{className:"cn-brk bl"}),D.jsx("i",{className:"cn-brk br"}),N==="tube"&&D.jsx("div",{ref:De,className:"tube-host","aria-hidden":"true",inert:!0})]})]}),D.jsxs("footer",{className:"pl-ftr cn-ftr",children:[D.jsxs("span",{children:[D.jsx("span",{className:"pl-meta",children:"/ webgl · 108k particles"}),D.jsxs("span",{className:"pl-by",children:[D.jsx(Wx,{})," made by noon"]})]}),D.jsx("span",{children:"/ grab the star to mix · [?] for the full legend"}),D.jsxs("span",{className:"diag",children:[D.jsxs("button",{className:"diag-toggle",onClick:()=>ne(L=>!L),"aria-expanded":k,children:["diag ",k?"[-]":"[+]"]}),k&&D.jsx("samp",{ref:On,className:"diag-line",children:"fps -- · pts -- · quality --"})]})]})]}),p&&z&&D.jsx("div",{className:"announce","aria-hidden":"true",children:D.jsx("span",{className:"announce-title",children:D.jsx(xr,{text:Up(z.text,28).toUpperCase(),duration:900})})},z.key),D.jsx("input",{ref:o,type:"file",accept:"audio/*",hidden:!0,onChange:L=>{var ge,J;const X=(ge=L.target.files)==null?void 0:ge[0];if(X){rn.current=!0,v(!0),window.__focus(),(J=hn.current)==null||J.powerOn();const Oe=Wt.current;if(Oe){Oe.playFile(X);const $e=++gi.current;K(!0),Ux(X,Oe.ctx).then(Ce=>{gi.current===$e&&(si.current=Ce,K(!1))})}}L.target.value=""}}),p&&et&&D.jsx(PR,{ops:Qe.current,onDone:()=>Ye(!1)}),D.jsx("div",{className:"scanlines"}),D.jsx("div",{className:"grain"})]})}const qx=(()=>{const r="..-.-.--..-.--..-.-..--.-.-..--..-.-.",e=[];let n=0;for(const a of r){const o=a==="-"?16:4;e.push({x:n,w:o}),n+=o+8}return{rects:e,total:n-8}})(),y3=[{ix:"01",n:"src",d:"radio · file · mic",i:"the audio you feed it: radio, a file, or the mic"},{ix:"02",n:"eq",d:"3 shelves",i:"three shelves, the ones the orb bends when you grab it"},{ix:"03",n:"tiers",d:"6 peaking",i:"six peaking filters, one per dissection ring"},{ix:"04",n:"filter",d:"hp / lp",i:"the colour sweep: high-pass left, low-pass right"},{ix:"05",n:"echo",d:"parallel loop",i:"a tempo-locked delay with feedback, sent in parallel"},{ix:"06",n:"analyser",d:"24 bands",i:"24 log bands: everything the star sees"},{ix:"",n:"star",d:"visuals tap here",sub:!0,i:"the visuals read the analyser, never the output: mute keeps the star dancing"},{ix:"07",n:"out",d:"master gain",i:"master gain, and the node that mute silences"}];function Wx(){return null}let yc="225, 59, 42";function S3(){const r=getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim();r&&(yc=r)}function Yx({className:r}){return D.jsx("svg",{className:r,width:"13",height:"13","aria-hidden":"true",children:D.jsxs("g",{stroke:"var(--accent)",strokeWidth:"1",children:[D.jsx("line",{x1:"6.5",y1:"0",x2:"6.5",y2:"13"}),D.jsx("line",{x1:"0",y1:"6.5",x2:"13",y2:"6.5"})]})})}function M3(){return D.jsxs("svg",{width:"86",height:"9","aria-hidden":"true",children:[D.jsx("g",{fill:"var(--ink)",children:[0,10,20,30,40].map(r=>D.jsx("rect",{x:r,y:"0",width:"7",height:"9"},r))}),D.jsx("g",{fill:"none",stroke:"currentColor",children:[50.5,60.5,70.5,79.5].map(r=>D.jsx("rect",{x:r,y:".5",width:"6",height:"8"},r))})]})}const b3=38,E3=267,jx=(r,e)=>[21+Math.sin(r*Math.PI/180)*e,21-Math.cos(r*Math.PI/180)*e],T3=(()=>{const[r,e]=jx(b3,13),[n,a]=jx(E3,13);return`M ${r.toFixed(2)} ${e.toFixed(2)} A 13 13 0 1 1 ${n.toFixed(2)} ${a.toFixed(2)}`})(),dc=.25,xf=2;function yf({v:r,cap:e,onChange:n}){const a=Ve.useRef(null),o=d=>Math.max(dc,Math.min(xf,d)),c=(-135+(r-dc)/(xf-dc)*270)*Math.PI/180,u=d=>n(m=>o(Number((m+d).toFixed(2))));return D.jsxs("div",{className:"pl-dial",role:"slider",tabIndex:0,"aria-label":e,"aria-valuemin":dc,"aria-valuemax":xf,"aria-valuenow":Number(r.toFixed(2)),"aria-valuetext":`${e} ${Math.round(r*100)}`,onPointerDown:d=>{d.currentTarget.setPointerCapture(d.pointerId),a.current={y:d.clientY,v:r}},onPointerMove:d=>{const m=a.current;if(!m)return;const p=o(m.v+(m.y-d.clientY)/200*(xf-dc));n(()=>p)},onPointerUp:d=>{a.current=null,d.currentTarget.releasePointerCapture(d.pointerId)},onDoubleClick:()=>n(()=>1),onKeyDown:d=>{const m=d.shiftKey?.25:.05;d.key==="ArrowUp"||d.key==="ArrowRight"?(d.preventDefault(),u(m)):d.key==="ArrowDown"||d.key==="ArrowLeft"?(d.preventDefault(),u(-m)):d.key==="Home"&&(d.preventDefault(),n(()=>1))},children:[D.jsxs("svg",{width:"42",height:"42",viewBox:"0 0 42 42","aria-hidden":"true",children:[D.jsx("rect",{x:".5",y:".5",width:"41",height:"41",fill:"none",stroke:"currentColor",opacity:".5"}),D.jsx("path",{d:T3,fill:"none",stroke:"currentColor"}),D.jsx("line",{x1:"21",y1:"21",x2:(21+Math.sin(c)*12).toFixed(1),y2:(21-Math.cos(c)*12).toFixed(1),stroke:"var(--ink)",strokeWidth:"1.5"}),D.jsx("circle",{cx:"21",cy:"21",r:"1.6",fill:"var(--accent)"})]}),D.jsxs("span",{className:"cap",children:[e," ",D.jsx("b",{children:Math.round(r*100)})]})]})}function A3(){return D.jsx("svg",{width:"100%",height:"12",preserveAspectRatio:"none",viewBox:"0 0 280 12","aria-hidden":"true",children:D.jsxs("g",{stroke:"currentColor",children:[D.jsx("line",{x1:"0",y1:"11.5",x2:"280",y2:"11.5",opacity:".5"}),[1,36,71,106,141,176,211,246,279].map((r,e)=>D.jsx("line",{x1:r,y1:e%3===0?3:7,x2:r,y2:"11"},r))]})})}function w3(r){return r>=1e3?`${(r/1e3).toFixed(r<1e4?1:0)}k`:`${Math.round(r)}hz`}function R3(r,e,n){if(!r)return;const a=r.getContext("2d"),o=r.clientWidth,c=r.clientHeight;if(!a||o<2||c<2)return;const u=Math.min(2,window.devicePixelRatio||1);(r.width!==o*u||r.height!==c*u)&&(r.width=o*u,r.height=c*u),a.setTransform(u,0,0,u,0,0),a.clearRect(0,0,o,c);const d=c/2,m=e.length;for(let p=0;p<o;p++){const v=e[(n+Math.floor(p/o*m))%m],_=.62+.38*Math.sin(p*.7)*Math.cos(p*.13),g=Math.max(.5,v*_*(c*.46)),M=.28+.72*Math.pow(v,.6);a.fillStyle=`rgba(234,234,239,${(M*(.4+Math.random()*.6)).toFixed(3)})`,a.fillRect(p,d-g,1,g*2),Math.random()<v*.5&&(a.fillStyle=`rgba(234,234,239,${(M*.5).toFixed(3)})`,a.fillRect(p,d-g*1.5,1,g*.4))}}function C3(r,e,n,a,o){const c=r==null?void 0:r.getContext("2d");if(!r||!c)return;if(c.clearRect(0,0,r.width,r.height),a&&a.amp.length>0){const d=r.width,m=r.height,p=m/2,v=a.amp.length,_=Math.floor(o*d);for(let g=0;g<d;g++){const M=Math.floor(g/d*v),E=Math.max(M+1,Math.floor((g+1)/d*v));let R=0;for(let x=M;x<E;x++)a.amp[x]>R&&(R=a.amp[x]);const y=Math.max(.75,R*(m/2-2));c.fillStyle=g<=_?"rgba(234,234,234,0.92)":"rgba(234,234,234,0.28)",c.fillRect(g,p-y,1,y*2)}c.fillStyle=`rgba(${yc},1)`,c.fillRect(_,0,2,m);return}c.strokeStyle="rgba(234,234,234,0.85)",c.lineWidth=2,c.beginPath();const u=e.length;for(let d=0;d<u;d++){const m=e[(n+d)%u],p=d/(u-1)*r.width,v=r.height-2-m*(r.height-6);d===0?c.moveTo(p,v):c.lineTo(p,v)}c.stroke()}function D3(r,e,n,a,o,c,u,d=!1){const m=r==null?void 0:r.getContext("2d");if(!r||!m)return;const p=Math.min(2,window.devicePixelRatio||1),v=r.width/p,_=r.height/p;m.setTransform(p,0,0,p,0,0),m.clearRect(0,0,v,_);const g=e.dissect;if(d&&g<.5){const G=.55*(1-g*2),Y=e.projectLocal(0,.78,0),de=e.projectLocal(0,-.78,0);m.strokeStyle=`rgba(234,234,234,${G})`,m.lineWidth=1,m.setLineDash([3,6]),m.beginPath(),m.moveTo(Y.x,Y.y),m.lineTo(de.x,de.y),m.stroke(),m.setLineDash([]),m.fillStyle=`rgba(${yc},${Math.min(1,G+.25)})`,m.beginPath(),m.moveTo(Y.x-4,Y.y-6),m.lineTo(Y.x+4,Y.y-6),m.lineTo(Y.x,Y.y-13),m.closePath(),m.fill(),m.beginPath(),m.moveTo(de.x-4,de.y+6),m.lineTo(de.x+4,de.y+6),m.lineTo(de.x,de.y+13),m.closePath(),m.fill()}const M=Math.max(0,Math.min(1,(g-.25)/.55));if(M<=.01)return;const E=n.length,R=G=>`rgba(234,234,234,${G*M})`,y=G=>`rgba(${yc},${G*M})`;m.textBaseline="middle",m.lineWidth=1;const x=e.surveyPoint(E-1,0,0),P=e.surveyPoint(0,0,0);m.strokeStyle=R(.5),m.beginPath(),m.moveTo(P.x,P.y+30),m.lineTo(x.x,x.y-30),m.stroke();const N=8;let C=0;for(let G=0;G<E;G++){const Y=e.surveyPoint(G,0,0),de=e.surveyPoint(G,0,1),Se=e.surveyPoint(G,Math.PI/2,1);C=Math.max(C,Y.x+Math.max(Math.hypot(de.x-Y.x,de.y-Y.y),Math.hypot(Se.x-Y.x,Se.y-Y.y)))}C=Math.min(v-128,C+16);for(let G=0;G<E;G++){const Y=o.solo===G,de=!!o.muted[G],Se=e.hiTier===G;m.strokeStyle=Y?y(.8):R(Se?.85:de?.14:.38),m.beginPath();for(let k=0;k<=48;k++){const ne=e.surveyPoint(G,k/48*Math.PI*2);k===0?m.moveTo(ne.x,ne.y):m.lineTo(ne.x,ne.y)}m.stroke(),m.strokeStyle=Y?y(.4):R(de?.08:.2),m.beginPath();for(let k=0;k<=36;k++){const ne=e.surveyPoint(G,k/36*Math.PI*2,.46);k===0?m.moveTo(ne.x,ne.y):m.lineTo(ne.x,ne.y)}if(m.stroke(),G>0){const k=e.tierYNow(0)-(E>1?(e.tierYFull(1)-e.tierYFull(0))*.5:.3),ne=.88*.56*e.ringProfile(G);m.strokeStyle=R(.22),m.setLineDash([2,5]);for(let ve=0;ve<N;ve+=2){const Re=ve/N*Math.PI*2,F=e.surveyPoint(G,Re),Q=e.projectLocal(Math.cos(Re)*ne,k,Math.sin(Re)*ne);m.beginPath(),m.moveTo(F.x,F.y),m.lineTo(Q.x,Q.y),m.stroke()}m.setLineDash([])}m.fillStyle=R(de?.22:.7);for(let k=0;k<N;k++){const ne=e.surveyPoint(G,k/N*Math.PI*2);m.fillRect(ne.x-1.5,ne.y-1.5,3,3)}const ae=e.surveyPoint(G,0,0),H=C;m.font='bold 10px "JetBrains Mono", ui-monospace, monospace',m.fillStyle=Y?y(.95):de?y(.75):R(Se?1:.9),m.fillText(`0${G+1} · ${n[G].label.toUpperCase()}`,H,ae.y-7),m.font='9px "JetBrains Mono", ui-monospace, monospace',m.fillStyle=de?y(.6):Y?y(.7):R(.55),m.fillText(de?"MUTED":Y?"SOLO":`LVL ${String(Math.round(a[G]*99)).padStart(2,"0")}`,H,ae.y+6),m.fillStyle=Y?y(.8):R(.8),m.fillRect(H,ae.y+13,Math.max(1,a[G]*46),2)}const I=E>1?e.tierYFull(1)-e.tierYFull(0):.7,O=e.tierYNow(0)-I*.75*g,z=.88*.56*.34;m.strokeStyle=R(.42),m.beginPath();for(let G=0;G<=32;G++){const Y=G/32*Math.PI*2,de=e.projectLocal(Math.cos(Y)*z,O,Math.sin(Y)*z);G===0?m.moveTo(de.x,de.y):m.lineTo(de.x,de.y)}m.stroke();const T=performance.now()*.0011,B=e.projectLocal(Math.cos(T)*z,O,Math.sin(T)*z);m.fillStyle=y(.55+Math.min(.45,c)),m.fillRect(B.x-2,B.y-2,4,4);const K=e.projectLocal(0,O,0);m.font='9px "JetBrains Mono", ui-monospace, monospace',m.fillStyle=R(.6),m.fillText(`SUM ${String(Math.round(Math.min(1,u*2.4)*99)).padStart(2,"0")}`,K.x+12,K.y)}const Fp=new Float32Array(24),Sf=new Float32Array(24);function N3(r,e,n=null,a=0){const o=r==null?void 0:r.getContext("2d");if(!r||!o)return;o.clearRect(0,0,r.width,r.height);const c=e.length,u=r.width/c;for(let d=0;d<c;d++){const m=Math.min(1,e[d]*1.25);Sf[d]+=(m-Sf[d])*(m>Sf[d]?.55:.18);const p=Sf[d];Fp[d]=Math.max(p,Fp[d]-.012);const v=p*(r.height-4);o.fillStyle="rgba(234,234,234,0.88)",n!=null&&(n==="low"?d<8:n==="mid"?d>=8&&d<16:d>=16)&&(o.fillStyle=`rgba(${yc},${.45+Math.min(.55,Math.abs(a)/30)})`),o.fillRect(d*u+1,r.height-v,u-2,v);const _=r.height-Fp[d]*(r.height-4);o.fillStyle="rgba(234,234,234,0.35)",o.fillRect(d*u+1,_-2,u-2,2)}}S3();NM.createRoot(document.getElementById("root")).render(D.jsx(x3,{}));
