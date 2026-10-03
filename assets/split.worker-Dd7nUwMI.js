var qO=Object.defineProperty;var GO=(Ir,xt,dn)=>xt in Ir?qO(Ir,xt,{enumerable:!0,configurable:!0,writable:!0,value:dn}):Ir[xt]=dn;var Z2=(Ir,xt,dn)=>GO(Ir,typeof xt!="symbol"?xt+"":xt,dn);(function(){"use strict";/*!
 * ONNX Runtime Web v1.29.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Ir=Object.create,xt=Object.defineProperty,dn=Object.getOwnPropertyDescriptor,rx=Object.getOwnPropertyNames,nx=Object.getPrototypeOf,ix=Object.prototype.hasOwnProperty,Eo=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),N=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(a){throw n=[a],a}},ie=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}},Sr=(e,t)=>{for(var n in t)xt(e,n,{get:t[n],enumerable:!0})},$l=(e,t,n,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of rx(t))!ix.call(e,l)&&l!==n&&xt(e,l,{get:()=>t[l],enumerable:!(a=dn(t,l))||a.enumerable});return e},ce=(e,t,n)=>(n=e!=null?Ir(nx(e)):{},$l(!e||!e.__esModule?xt(n,"default",{value:e,enumerable:!0}):n,e)),pn=e=>$l(xt({},"__esModule",{value:!0}),e),Pn,nr,Or,Tl,Il,Sl=N(()=>{"use strict";Pn=new Map,nr=[],Or=(e,t,n)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let a=Pn.get(e);if(a===void 0)Pn.set(e,{backend:t,priority:n});else{if(a.priority>n)return;if(a.priority===n&&a.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let l=nr.indexOf(e);l!==-1&&nr.splice(l,1);for(let u=0;u<nr.length;u++)if(Pn.get(nr[u]).priority<=n){nr.splice(u,0,e);return}nr.push(e)}return}throw new TypeError("not a valid backend")},Tl=async e=>{let t=Pn.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(a){return n||(t.error=`${a}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Il=async e=>{let t=e.executionProviders||[],n=t.map(o=>typeof o=="string"?o:o.name),a=n.length===0?nr:n,l,u=[],d=new Set;for(let o of a){let r=await Tl(o);typeof r=="string"?u.push({name:o,err:r}):(l||(l=r),l===r&&d.add(o))}if(!l)throw new Error(`no available backend found. ERR: ${u.map(o=>`[${o.name}] ${o.err}`).join(", ")}`);for(let{name:o,err:r}of u)n.includes(o)&&console.warn(`removing requested execution provider "${o}" from session options because it is not available: ${r}`);let p=t.filter(o=>d.has(typeof o=="string"?o:o.name));return[l,new Proxy(e,{get:(o,r)=>r==="executionProviders"?p:Reflect.get(o,r)})]}}),ox=N(()=>{"use strict";Sl()}),Ol,sx=N(()=>{"use strict";Ol="1.29.0"}),Po,rt,El=N(()=>{"use strict";sx(),Po="warning",rt={wasm:{},webgl:{},webgpu:{},versions:{common:Ol},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Po=e}},get logLevel(){return Po}},Object.defineProperty(rt,"logLevel",{enumerable:!0})}),fe,ax=N(()=>{"use strict";El(),fe=rt}),Pl,Al,ux=N(()=>{"use strict";Pl=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let a=n.getContext("2d");if(a!=null){let l,u;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(l=e.dims[2],u=e.dims[3]):(l=e.dims[3],u=e.dims[2]);let d=(t==null?void 0:t.format)!==void 0?t.format:"RGB",p=t==null?void 0:t.norm,o,r;p===void 0||p.mean===void 0?o=[255,255,255,255]:typeof p.mean=="number"?o=[p.mean,p.mean,p.mean,p.mean]:(o=[p.mean[0],p.mean[1],p.mean[2],0],p.mean[3]!==void 0&&(o[3]=p.mean[3])),p===void 0||p.bias===void 0?r=[0,0,0,0]:typeof p.bias=="number"?r=[p.bias,p.bias,p.bias,p.bias]:(r=[p.bias[0],p.bias[1],p.bias[2],0],p.bias[3]!==void 0&&(r[3]=p.bias[3]));let i=u*l,s=0,c=i,h=i*2,m=-1;d==="RGBA"?(s=0,c=i,h=i*2,m=i*3):d==="RGB"?(s=0,c=i,h=i*2):d==="RBG"&&(s=0,h=i,c=i*2);for(let b=0;b<u;b++)for(let x=0;x<l;x++){let v=(e.data[s++]-r[0])*o[0],_=(e.data[c++]-r[1])*o[1],I=(e.data[h++]-r[2])*o[2],O=m===-1?255:(e.data[m++]-r[3])*o[3];a.fillStyle="rgba("+v+","+_+","+I+","+O+")",a.fillRect(x,b,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Al=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),a;if(n!=null){let l,u,d;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(l=e.dims[2],u=e.dims[1],d=e.dims[3]):(l=e.dims[3],u=e.dims[2],d=e.dims[1]);let p=t!==void 0&&t.format!==void 0?t.format:"RGB",o=t==null?void 0:t.norm,r,i;o===void 0||o.mean===void 0?r=[255,255,255,255]:typeof o.mean=="number"?r=[o.mean,o.mean,o.mean,o.mean]:(r=[o.mean[0],o.mean[1],o.mean[2],255],o.mean[3]!==void 0&&(r[3]=o.mean[3])),o===void 0||o.bias===void 0?i=[0,0,0,0]:typeof o.bias=="number"?i=[o.bias,o.bias,o.bias,o.bias]:(i=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(i[3]=o.bias[3]));let s=u*l;if(t!==void 0&&(t.format!==void 0&&d===4&&t.format!=="RGBA"||d===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let c=4,h=0,m=1,b=2,x=3,v=0,_=s,I=s*2,O=-1;p==="RGBA"?(v=0,_=s,I=s*2,O=s*3):p==="RGB"?(v=0,_=s,I=s*2):p==="RBG"&&(v=0,I=s,_=s*2),a=n.createImageData(l,u);for(let E=0;E<u*l;h+=c,m+=c,b+=c,x+=c,E++)a.data[h]=(e.data[v++]-i[0])*r[0],a.data[m]=(e.data[_++]-i[1])*r[1],a.data[b]=(e.data[I++]-i[2])*r[2],a.data[x]=O===-1?255:(e.data[O++]-i[3])*r[3]}else throw new Error("Can not access image data");return a}}),$i,kl,Dl,Nl,Cl,zl,lx=N(()=>{"use strict";ko(),$i=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:a}=t,l=t.norm??{mean:255,bias:0},u,d;typeof l.mean=="number"?u=[l.mean,l.mean,l.mean,l.mean]:u=[l.mean[0],l.mean[1],l.mean[2],l.mean[3]??255],typeof l.bias=="number"?d=[l.bias,l.bias,l.bias,l.bias]:d=[l.bias[0],l.bias[1],l.bias[2],l.bias[3]??0];let p=t.format!==void 0?t.format:"RGBA",o=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",r=n*a,i=o==="RGBA"?new Float32Array(r*4):new Float32Array(r*3),s=4,c=0,h=1,m=2,b=3,x=0,v=r,_=r*2,I=-1;p==="RGB"&&(s=3,c=0,h=1,m=2,b=-1),o==="RGBA"?I=r*3:o==="RBG"?(x=0,_=r,v=r*2):o==="BGR"&&(_=0,v=r,x=r*2);for(let O=0;O<r;O++,c+=s,m+=s,h+=s,b+=s)i[x++]=(e[c]+d[0])/u[0],i[v++]=(e[h]+d[1])/u[1],i[_++]=(e[m]+d[2])/u[2],I!==-1&&b!==-1&&(i[I++]=(e[b]+d[3])/u[3]);return o==="RGBA"?new ht("float32",i,[1,4,n,a]):new ht("float32",i,[1,3,n,a])},kl=async(e,t)=>{let n=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,a=typeof ImageData<"u"&&e instanceof ImageData,l=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,u=typeof e=="string",d,p=t??{},o=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},r=i=>typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||i instanceof OffscreenCanvas?i.getContext("2d"):null;if(n){let i=o();i.width=e.width,i.height=e.height;let s=r(i);if(s!=null){let c=e.height,h=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(c=t.resizedHeight,h=t.resizedWidth),t!==void 0){if(p=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");p.tensorFormat="RGBA",p.height=c,p.width=h}else p.tensorFormat="RGBA",p.height=c,p.width=h;s.drawImage(e,0,0),d=s.getImageData(0,0,h,c).data}else throw new Error("Can not access image data")}else if(a){let i,s;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(i=t.resizedHeight,s=t.resizedWidth):(i=e.height,s=e.width),t!==void 0&&(p=t),p.format="RGBA",p.height=i,p.width=s,t!==void 0){let c=o();c.width=s,c.height=i;let h=r(c);if(h!=null)h.putImageData(e,0,0),d=h.getImageData(0,0,s,i).data;else throw new Error("Can not access image data")}else d=e.data}else if(l){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let i=o();i.width=e.width,i.height=e.height;let s=r(i);if(s!=null){let c=e.height,h=e.width;return s.drawImage(e,0,0,h,c),d=s.getImageData(0,0,h,c).data,p.height=c,p.width=h,$i(d,p)}else throw new Error("Can not access image data")}else{if(u)return new Promise((i,s)=>{let c=o(),h=r(c);if(!e||!h)return s();let m=new Image;m.crossOrigin="Anonymous",m.src=e,m.onload=()=>{c.width=m.width,c.height=m.height,h.drawImage(m,0,0,c.width,c.height);let b=h.getImageData(0,0,c.width,c.height);p.height=c.height,p.width=c.width,i($i(b.data,p))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(d!==void 0)return $i(d,p);throw new Error("Input data provided is not supported - aborted tensor creation")},Dl=(e,t)=>{let{width:n,height:a,download:l,dispose:u}=t,d=[1,a,n,4];return new ht({location:"texture",type:"float32",texture:e,dims:d,download:l,dispose:u})},Nl=(e,t)=>{let{dataType:n,dims:a,download:l,dispose:u}=t;return new ht({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:a,download:l,dispose:u})},Cl=(e,t)=>{let{dataType:n,dims:a,download:l,dispose:u}=t;return new ht({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:a,download:l,dispose:u})},zl=(e,t,n)=>new ht({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})}),Er,An,Ao,Rl,dx=N(()=>{"use strict";Er=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),An=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Ao=!1,Rl=()=>{if(!Ao){Ao=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,a=typeof n<"u"&&n.from;e&&(Er.set("int64",BigInt64Array),An.set(BigInt64Array,"int64")),t&&(Er.set("uint64",BigUint64Array),An.set(BigUint64Array,"uint64")),a?(Er.set("float16",n),An.set(n,"float16")):Er.set("float16",Uint16Array)}}}),Bl,Ml,px=N(()=>{"use strict";ko(),Bl=e=>{let t=1;for(let n=0;n<e.length;n++){let a=e[n];if(typeof a!="number"||!Number.isSafeInteger(a))throw new TypeError(`dims[${n}] must be an integer, got: ${a}`);if(a<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${a}`);t*=a}return t},Ml=(e,t)=>{switch(e.location){case"cpu":return new ht(e.type,e.data,t);case"cpu-pinned":return new ht({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new ht({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new ht({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new ht({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),ht,ko=N(()=>{"use strict";ux(),lx(),dx(),px(),ht=class{constructor(e,t,n){Rl();let a,l;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,a=e.type,l=e.dims,e.location){case"cpu-pinned":{let d=Er.get(a);if(!d)throw new TypeError(`unsupported type "${a}" to create tensor from pinned buffer`);if(!(e.data instanceof d))throw new TypeError(`buffer should be of type ${d.name}`);this.cpuData=e.data;break}case"texture":{if(a!=="float32")throw new TypeError(`unsupported type "${a}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(a!=="float32"&&a!=="float16"&&a!=="int32"&&a!=="int64"&&a!=="uint32"&&a!=="uint8"&&a!=="bool"&&a!=="uint4"&&a!=="int4")throw new TypeError(`unsupported type "${a}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(a!=="float32"&&a!=="float16"&&a!=="int32"&&a!=="int64"&&a!=="uint32"&&a!=="uint64"&&a!=="int8"&&a!=="uint8"&&a!=="bool"&&a!=="uint4"&&a!=="int4")throw new TypeError(`unsupported type "${a}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let d,p;if(typeof e=="string")if(a=e,p=n,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");d=t}else{let o=Er.get(e);if(o===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&o===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${o.name} as data.`);e==="uint64"||e==="int64"?d=o.from(t,BigInt):d=o.from(t)}else if(t instanceof o)d=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")d=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&o!==Uint16Array)d=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${a} tensor's data must be type of ${o}`)}else if(p=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let o=typeof e[0];if(o==="string")a="string",d=e;else if(o==="boolean")a="bool",d=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${o}.`)}else if(e instanceof Uint8ClampedArray)a="uint8",d=Uint8Array.from(e);else{let o=An.get(e.constructor);if(o===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);a=o,d=e}if(p===void 0)p=[d.length];else if(!Array.isArray(p))throw new TypeError("A tensor's dims must be a number array");l=p,this.cpuData=d,this.dataLocation="cpu"}let u=Bl(l);if(this.cpuData&&u!==this.cpuData.length&&!((a==="uint4"||a==="int4")&&Math.ceil(u/2)===this.cpuData.length))throw new Error(`Tensor's size(${u}) does not match data length(${this.cpuData.length}).`);this.type=a,this.dims=l,this.size=u}static async fromImage(e,t){return kl(e,t)}static fromTexture(e,t){return Dl(e,t)}static fromGpuBuffer(e,t){return Nl(e,t)}static fromMLTensor(e,t){return Cl(e,t)}static fromPinnedBuffer(e,t,n){return zl(e,t,n)}toDataURL(e){return Pl(this,e)}toImageData(e){return Al(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Ml(this,e)}}}),$t,Fl=N(()=>{"use strict";ko(),$t=ht}),Ti,Do,Lt,kt,Pr,Ar,jl=N(()=>{"use strict";El(),Ti=(e,t)=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||console.timeStamp(`${e}::ORT::${t}`)},Do=(e,t)=>{var l;let n=((l=new Error().stack)==null?void 0:l.split(/\r\n|\r|\n/g))||[],a=!1;for(let u=0;u<n.length;u++){if(a&&!n[u].includes("TRACE_FUNC")){let d=`FUNC_${e}::${n[u].trim().split(" ")[1]}`;t&&(d+=`::${t}`),Ti("CPU",d);return}n[u].includes("TRACE_FUNC")&&(a=!0)}},Lt=e=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||Do("BEGIN",e)},kt=e=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||Do("END",e)},Pr=e=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||console.time(`ORT::${e}`)},Ar=e=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||console.timeEnd(`ORT::${e}`)}}),Ll,cx=N(()=>{"use strict";Sl(),Fl(),jl(),Ll=class J2{constructor(t){this.handler=t}async run(t,n,a){Lt(),Pr("InferenceSession.run");let l={},u={};if(typeof t!="object"||t===null||t instanceof $t||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let d=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof $t)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");d=!1;for(let r of n){if(typeof r!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(r)===-1)throw new RangeError(`'fetches' contains invalid output name: ${r}.`);l[r]=null}if(typeof a=="object"&&a!==null)u=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else{let r=!1,i=Object.getOwnPropertyNames(n);for(let s of this.outputNames)if(i.indexOf(s)!==-1){let c=n[s];(c===null||c instanceof $t)&&(r=!0,d=!1,l[s]=c)}if(r){if(typeof a=="object"&&a!==null)u=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else u=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let r of this.inputNames)if(typeof t[r]>"u")throw new Error(`input '${r}' is missing in 'feeds'.`);if(d)for(let r of this.outputNames)l[r]=null;let p=await this.handler.run(t,l,u),o={};for(let r in p)if(Object.hasOwnProperty.call(p,r)){let i=p[r];i instanceof $t?o[r]=i:o[r]=new $t(i.type,i.data,i.dims)}return Ar("InferenceSession.run"),kt(),o}async release(){return this.handler.dispose()}static async create(t,n,a,l){Lt(),Pr("InferenceSession.create");let u,d={};if(typeof t=="string"){if(u=t,typeof n=="object"&&n!==null)d=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(u=t,typeof n=="object"&&n!==null)d=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let i=t,s=0,c=t.byteLength;if(typeof n=="object"&&n!==null)d=n;else if(typeof n=="number"){if(s=n,!Number.isSafeInteger(s))throw new RangeError("'byteOffset' must be an integer.");if(s<0||s>=i.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${i.byteLength}).`);if(c=t.byteLength-s,typeof a=="number"){if(c=a,!Number.isSafeInteger(c))throw new RangeError("'byteLength' must be an integer.");if(c<=0||s+c>i.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${i.byteLength-s}].`);if(typeof l=="object"&&l!==null)d=l;else if(typeof l<"u")throw new TypeError("'options' must be an object.")}else if(typeof a<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");u=new Uint8Array(i,s,c)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[p,o]=await Il(d),r=await p.createInferenceSessionHandler(u,o);return Ar("InferenceSession.create"),kt(),new J2(r)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Ii,hx=N(()=>{"use strict";cx(),Ii=Ll}),fx=N(()=>{"use strict"}),mx=N(()=>{"use strict"}),gx=N(()=>{"use strict"}),bx=N(()=>{"use strict"}),yx={};Sr(yx,{InferenceSession:()=>Ii,TRACE:()=>Ti,TRACE_EVENT_BEGIN:()=>Pr,TRACE_EVENT_END:()=>Ar,TRACE_FUNC_BEGIN:()=>Lt,TRACE_FUNC_END:()=>kt,Tensor:()=>$t,env:()=>fe,registerBackend:()=>Or});var st=N(()=>{"use strict";ox(),ax(),hx(),Fl(),fx(),mx(),jl(),gx(),bx()});function kr(e,t,n,a){if(t===void 0)return _x(e);if(n===void 0)Si(e,t);else if(typeof n=="number"&&a===void 0)Si(e,t);else if(typeof n=="string"&&a===void 0)Si(e,n,1,t);else if(typeof n=="string"&&typeof a=="number")Si(e,n,a,t);else throw new TypeError("input is valid")}function _x(e){return{verbose:kr.verbose.bind(null,e),info:kr.info.bind(null,e),warning:kr.warning.bind(null,e),error:kr.error.bind(null,e),fatal:kr.fatal.bind(null,e)}}function Si(e,t,n,a){let l=cn[a||""]||cn[""];No[e]<No[l.minimalSeverity]||(l.logDateTime&&(t=`${new Date().toISOString()}|${t}`),l.logSourceLocation,ql[l.provider].log(e,t,a))}var Vl,Ul,No,ql,Co,cn,Xe,zo,Ro,Gl,kn,Dt=N(()=>{"use strict";Vl=class{log(e,t,n){}},Ul=class{log(e,t,n){console.log(`${this.color(e)} ${n?"\x1B[35m"+n+"\x1B[0m ":""}${t}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},No={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},ql={none:new Vl,console:new Ul},Co={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},cn={"":Co},(e=>{function t(r,i){e("verbose",r,i)}e.verbose=t;function n(r,i){e("info",r,i)}e.info=n;function a(r,i){e("warning",r,i)}e.warning=a;function l(r,i){e("error",r,i)}e.error=l;function u(r,i){e("fatal",r,i)}e.fatal=u;function d(r){cn={},p("",r||{})}e.reset=d;function p(r,i){if(r==="*")d(i);else{let s=cn[r]||Co;cn[r]={provider:i.provider||s.provider,minimalSeverity:i.minimalSeverity||s.minimalSeverity,logDateTime:i.logDateTime===void 0?s.logDateTime:i.logDateTime,logSourceLocation:i.logSourceLocation===void 0?s.logSourceLocation:i.logSourceLocation}}}e.set=p;function o(r){let i={};r.logLevel&&(i.minimalSeverity=r.logLevel),p("",i)}e.setWithEnv=o})(kr||(kr={})),Xe=kr,zo=class{constructor(e,t,n,a,l,u){this.category=e,this.name=t,this.startTime=n,this.endCallback=a,this.timer=l,this.ctx=u}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},Ro=class{constructor(e,t,n,a){this.category=e,this.name=t,this.startTime=n,this.endTime=a}},Gl=class{constructor(e,t,n){this._started=!1,this._flushPointer=0,this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=t===void 0?10:t,this._flushIntervalInMilliseconds=n===void 0?5e3:n}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=kn(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,t,n,a){let l=this._started?this.begin(e,t,a):void 0,u=!1,d=n();if(d&&typeof d.then=="function")return u=!0,new Promise((p,o)=>{d.then(async r=>{l&&await l.end(),p(r)},async r=>{l&&await l.end(),o(r)})});if(!u&&l){let p=l.end();if(p&&typeof p.then=="function")return new Promise((o,r)=>{p.then(()=>{o(d)},i=>{r(i)})})}return d}begin(e,t,n){if(!this._started)throw new Error("profiler is not started yet");if(n===void 0){let a=kn();return this.flush(a),new zo(e,t,a,l=>this.endSync(l))}else{let a=n.beginTimer();return new zo(e,t,0,async l=>this.end(l),a,n)}}async end(e){let t=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Ro(e.category,e.name,e.startTime,t)),this.flush(t))}endSync(e){let t=kn();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Ro(e.category,e.name,e.startTime,t)),this.flush(t))}logOneEvent(e){Xe.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let t=this._flushPointer;this._flushPointer<t+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=kn()}}get started(){return this._started}},kn=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function wx(e,t,n){for(let a of n){let l=a[0],u=a[1],d=a[2],p=a[3],o=a[4];if(e.opType===l){for(let r of t)if((r.domain===u||r.domain==="ai.onnx"&&u==="")&&vx(r.version,d))return{opImpl:p,opInit:o}}}throw new TypeError(`cannot resolve operator '${e.opType}' with opsets: ${t.map(a=>`${a.domain||"ai.onnx"} v${a.version}`).join(", ")}`)}function vx(e,t){if(t.endsWith("+")){let n=Number.parseInt(t.substring(0,t.length-1),10);return!isNaN(n)&&n<=e}else if(t.split("-").length===2){let n=t.split("-"),a=Number.parseInt(n[0],10),l=Number.parseInt(n[1],10);return!isNaN(a)&&!isNaN(l)&&a<=e&&e<=l}else return Number.parseInt(t,10)===e}var xx=N(()=>{"use strict"}),$x=ie(e=>{"use strict";e.__esModule=!0;var t=(function(){function n(a){if(!a)throw new TypeError("Invalid argument; `value` has no value.");this.value=n.EMPTY,a&&n.isGuid(a)&&(this.value=a)}return n.isGuid=function(a){var l=a.toString();return a&&(a instanceof n||n.validator.test(l))},n.create=function(){return new n([n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-"))},n.createEmpty=function(){return new n("emptyguid")},n.parse=function(a){return new n(a)},n.raw=function(){return[n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-")},n.gen=function(a){for(var l="",u=0;u<a;u++)l+=((1+Math.random())*65536|0).toString(16).substring(1);return l},n.prototype.equals=function(a){return n.isGuid(a)&&this.value===a.toString()},n.prototype.isEmpty=function(){return this.value===n.EMPTY},n.prototype.toString=function(){return this.value},n.prototype.toJSON=function(){return{value:this.value}},n.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),n.EMPTY="00000000-0000-0000-0000-000000000000",n})();e.Guid=t});function Ce(e,t,n){this.low=e|0,this.high=t|0,this.unsigned=!!n}function at(e){return(e&&e.__isLong__)===!0}function Hl(e){var t=Math.clz32(e&-e);return e?31-t:t}function Dr(e,t){var n,a,l;return t?(e>>>=0,(l=0<=e&&e<256)&&(a=Fo[e],a)?a:(n=Ae(e,0,!0),l&&(Fo[e]=n),n)):(e|=0,(l=-128<=e&&e<128)&&(a=Mo[e],a)?a:(n=Ae(e,e<0?-1:0,!1),l&&(Mo[e]=n),n))}function Tt(e,t){if(isNaN(e))return t?Vt:St;if(t){if(e<0)return Vt;if(e>=Lo)return Ho}else{if(e<=-Vo)return ut;if(e+1>=Vo)return Go}return e<0?Tt(-e,t).neg():Ae(e%Nr|0,e/Nr|0,t)}function Ae(e,t,n){return new Ce(e,t,n)}function Bo(e,t,n){if(e.length===0)throw Error("empty string");if(typeof t=="number"?(n=t,t=!1):t=!!t,e==="NaN"||e==="Infinity"||e==="+Infinity"||e==="-Infinity")return t?Vt:St;if(n=n||10,n<2||36<n)throw RangeError("radix");var a;if((a=e.indexOf("-"))>0)throw Error("interior hyphen");if(a===0)return Bo(e.substring(1),t,n).neg();for(var l=Tt(Dn(n,8)),u=St,d=0;d<e.length;d+=8){var p=Math.min(8,e.length-d),o=parseInt(e.substring(d,d+p),n);if(p<8){var r=Tt(Dn(n,p));u=u.mul(r).add(Tt(o))}else u=u.mul(l),u=u.add(Tt(o))}return u.unsigned=t,u}function It(e,t){return typeof e=="number"?Tt(e,t):typeof e=="string"?Bo(e,t):Ae(e.low,e.high,typeof t=="boolean"?t:e.unsigned)}var ft,Mo,Fo,Dn,jo,Wl,Nr,Lo,Vo,Uo,St,Vt,Cr,qo,Oi,Go,Ho,ut,H,zr,Kl=N(()=>{ft=null;try{ft=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}Ce.prototype.__isLong__,Object.defineProperty(Ce.prototype,"__isLong__",{value:!0}),Ce.isLong=at,Mo={},Fo={},Ce.fromInt=Dr,Ce.fromNumber=Tt,Ce.fromBits=Ae,Dn=Math.pow,Ce.fromString=Bo,Ce.fromValue=It,jo=65536,Wl=1<<24,Nr=jo*jo,Lo=Nr*Nr,Vo=Lo/2,Uo=Dr(Wl),St=Dr(0),Ce.ZERO=St,Vt=Dr(0,!0),Ce.UZERO=Vt,Cr=Dr(1),Ce.ONE=Cr,qo=Dr(1,!0),Ce.UONE=qo,Oi=Dr(-1),Ce.NEG_ONE=Oi,Go=Ae(-1,2147483647,!1),Ce.MAX_VALUE=Go,Ho=Ae(-1,-1,!0),Ce.MAX_UNSIGNED_VALUE=Ho,ut=Ae(0,-2147483648,!1),Ce.MIN_VALUE=ut,H=Ce.prototype,H.toInt=function(){return this.unsigned?this.low>>>0:this.low},H.toNumber=function(){return this.unsigned?(this.high>>>0)*Nr+(this.low>>>0):this.high*Nr+(this.low>>>0)},H.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(ut)){var t=Tt(e),n=this.div(t),a=n.mul(t).sub(this);return n.toString(e)+a.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var l=Tt(Dn(e,6),this.unsigned),u=this,d="";;){var p=u.div(l),o=u.sub(p.mul(l)).toInt()>>>0,r=o.toString(e);if(u=p,u.isZero())return r+d;for(;r.length<6;)r="0"+r;d=""+r+d}},H.getHighBits=function(){return this.high},H.getHighBitsUnsigned=function(){return this.high>>>0},H.getLowBits=function(){return this.low},H.getLowBitsUnsigned=function(){return this.low>>>0},H.getNumBitsAbs=function(){if(this.isNegative())return this.eq(ut)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,t=31;t>0&&(e&1<<t)==0;t--);return this.high!=0?t+33:t+1},H.isSafeInteger=function(){var e=this.high>>21;return e?this.unsigned?!1:e===-1&&!(this.low===0&&this.high===-2097152):!0},H.isZero=function(){return this.high===0&&this.low===0},H.eqz=H.isZero,H.isNegative=function(){return!this.unsigned&&this.high<0},H.isPositive=function(){return this.unsigned||this.high>=0},H.isOdd=function(){return(this.low&1)===1},H.isEven=function(){return(this.low&1)===0},H.equals=function(e){return at(e)||(e=It(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low},H.eq=H.equals,H.notEquals=function(e){return!this.eq(e)},H.neq=H.notEquals,H.ne=H.notEquals,H.lessThan=function(e){return this.comp(e)<0},H.lt=H.lessThan,H.lessThanOrEqual=function(e){return this.comp(e)<=0},H.lte=H.lessThanOrEqual,H.le=H.lessThanOrEqual,H.greaterThan=function(e){return this.comp(e)>0},H.gt=H.greaterThan,H.greaterThanOrEqual=function(e){return this.comp(e)>=0},H.gte=H.greaterThanOrEqual,H.ge=H.greaterThanOrEqual,H.compare=function(e){if(at(e)||(e=It(e)),this.eq(e))return 0;var t=this.isNegative(),n=e.isNegative();return t&&!n?-1:!t&&n?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},H.comp=H.compare,H.negate=function(){return!this.unsigned&&this.eq(ut)?ut:this.not().add(Cr)},H.neg=H.negate,H.add=function(e){at(e)||(e=It(e));var t=this.high>>>16,n=this.high&65535,a=this.low>>>16,l=this.low&65535,u=e.high>>>16,d=e.high&65535,p=e.low>>>16,o=e.low&65535,r=0,i=0,s=0,c=0;return c+=l+o,s+=c>>>16,c&=65535,s+=a+p,i+=s>>>16,s&=65535,i+=n+d,r+=i>>>16,i&=65535,r+=t+u,r&=65535,Ae(s<<16|c,r<<16|i,this.unsigned)},H.subtract=function(e){return at(e)||(e=It(e)),this.add(e.neg())},H.sub=H.subtract,H.multiply=function(e){if(this.isZero())return this;if(at(e)||(e=It(e)),ft){var t=ft.mul(this.low,this.high,e.low,e.high);return Ae(t,ft.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?Vt:St;if(this.eq(ut))return e.isOdd()?ut:St;if(e.eq(ut))return this.isOdd()?ut:St;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Uo)&&e.lt(Uo))return Tt(this.toNumber()*e.toNumber(),this.unsigned);var n=this.high>>>16,a=this.high&65535,l=this.low>>>16,u=this.low&65535,d=e.high>>>16,p=e.high&65535,o=e.low>>>16,r=e.low&65535,i=0,s=0,c=0,h=0;return h+=u*r,c+=h>>>16,h&=65535,c+=l*r,s+=c>>>16,c&=65535,c+=u*o,s+=c>>>16,c&=65535,s+=a*r,i+=s>>>16,s&=65535,s+=l*o,i+=s>>>16,s&=65535,s+=u*p,i+=s>>>16,s&=65535,i+=n*r+a*o+l*p+u*d,i&=65535,Ae(c<<16|h,i<<16|s,this.unsigned)},H.mul=H.multiply,H.divide=function(e){if(at(e)||(e=It(e)),e.isZero())throw Error("division by zero");if(ft){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var t=(this.unsigned?ft.div_u:ft.div_s)(this.low,this.high,e.low,e.high);return Ae(t,ft.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?Vt:St;var n,a,l;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return Vt;if(e.gt(this.shru(1)))return qo;l=Vt}else{if(this.eq(ut)){if(e.eq(Cr)||e.eq(Oi))return ut;if(e.eq(ut))return Cr;var u=this.shr(1);return n=u.div(e).shl(1),n.eq(St)?e.isNegative()?Cr:Oi:(a=this.sub(e.mul(n)),l=n.add(a.div(e)),l)}else if(e.eq(ut))return this.unsigned?Vt:St;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();l=St}for(a=this;a.gte(e);){n=Math.max(1,Math.floor(a.toNumber()/e.toNumber()));for(var d=Math.ceil(Math.log(n)/Math.LN2),p=d<=48?1:Dn(2,d-48),o=Tt(n),r=o.mul(e);r.isNegative()||r.gt(a);)n-=p,o=Tt(n,this.unsigned),r=o.mul(e);o.isZero()&&(o=Cr),l=l.add(o),a=a.sub(r)}return l},H.div=H.divide,H.modulo=function(e){if(at(e)||(e=It(e)),ft){var t=(this.unsigned?ft.rem_u:ft.rem_s)(this.low,this.high,e.low,e.high);return Ae(t,ft.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))},H.mod=H.modulo,H.rem=H.modulo,H.not=function(){return Ae(~this.low,~this.high,this.unsigned)},H.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32},H.clz=H.countLeadingZeros,H.countTrailingZeros=function(){return this.low?Hl(this.low):Hl(this.high)+32},H.ctz=H.countTrailingZeros,H.and=function(e){return at(e)||(e=It(e)),Ae(this.low&e.low,this.high&e.high,this.unsigned)},H.or=function(e){return at(e)||(e=It(e)),Ae(this.low|e.low,this.high|e.high,this.unsigned)},H.xor=function(e){return at(e)||(e=It(e)),Ae(this.low^e.low,this.high^e.high,this.unsigned)},H.shiftLeft=function(e){return at(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Ae(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):Ae(0,this.low<<e-32,this.unsigned)},H.shl=H.shiftLeft,H.shiftRight=function(e){return at(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Ae(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):Ae(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},H.shr=H.shiftRight,H.shiftRightUnsigned=function(e){return at(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Ae(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?Ae(this.high,0,this.unsigned):Ae(this.high>>>e-32,0,this.unsigned)},H.shru=H.shiftRightUnsigned,H.shr_u=H.shiftRightUnsigned,H.rotateLeft=function(e){var t;return at(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Ae(this.high,this.low,this.unsigned):e<32?(t=32-e,Ae(this.low<<e|this.high>>>t,this.high<<e|this.low>>>t,this.unsigned)):(e-=32,t=32-e,Ae(this.high<<e|this.low>>>t,this.low<<e|this.high>>>t,this.unsigned))},H.rotl=H.rotateLeft,H.rotateRight=function(e){var t;return at(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Ae(this.high,this.low,this.unsigned):e<32?(t=32-e,Ae(this.high<<t|this.low>>>e,this.low<<t|this.high>>>e,this.unsigned)):(e-=32,t=32-e,Ae(this.low<<t|this.high>>>e,this.high<<t|this.low>>>e,this.unsigned))},H.rotr=H.rotateRight,H.toSigned=function(){return this.unsigned?Ae(this.low,this.high,!1):this},H.toUnsigned=function(){return this.unsigned?this:Ae(this.low,this.high,!0)},H.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},H.toBytesLE=function(){var e=this.high,t=this.low;return[t&255,t>>>8&255,t>>>16&255,t>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]},H.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,t>>>24,t>>>16&255,t>>>8&255,t&255]},Ce.fromBytes=function(e,t,n){return n?Ce.fromBytesLE(e,t):Ce.fromBytesBE(e,t)},Ce.fromBytesLE=function(e,t){return new Ce(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)},Ce.fromBytesBE=function(e,t){return new Ce(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)},typeof BigInt=="function"&&(Ce.fromBigInt=function(e,t){var n=Number(BigInt.asIntN(32,e)),a=Number(BigInt.asIntN(32,e>>BigInt(32)));return Ae(n,a,t)},Ce.fromValue=function(e,t){return typeof e=="bigint"?Ce.fromBigInt(e,t):It(e,t)},H.toBigInt=function(){var e=BigInt(this.low>>>0),t=BigInt(this.unsigned?this.high>>>0:this.high);return t<<BigInt(32)|e}),zr=Ce}),Xl=ie(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ArgType=void 0;var t;(function(n){n[n.INPUT=0]="INPUT",n[n.OUTPUT=1]="OUTPUT"})(t||(e.ArgType=t={}))}),Wo=ie(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SIZE_PREFIX_LENGTH=e.FILE_IDENTIFIER_LENGTH=e.SIZEOF_INT=e.SIZEOF_SHORT=void 0,e.SIZEOF_SHORT=2,e.SIZEOF_INT=4,e.FILE_IDENTIFIER_LENGTH=4,e.SIZE_PREFIX_LENGTH=4}),Zl=ie(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isLittleEndian=e.float64=e.float32=e.int32=void 0,e.int32=new Int32Array(2),e.float32=new Float32Array(e.int32.buffer),e.float64=new Float64Array(e.int32.buffer),e.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1}),Jl=ie(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Encoding=void 0;var t;(function(n){n[n.UTF8_BYTES=1]="UTF8_BYTES",n[n.UTF16_STRING=2]="UTF16_STRING"})(t||(e.Encoding=t={}))}),Yl=ie(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ByteBuffer=void 0;var t=Wo(),n=Jl(),a=Zl(),l=class Y2{constructor(d){this.bytes_=d,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(d){return new Y2(new Uint8Array(d))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(d){this.position_=d}capacity(){return this.bytes_.length}readInt8(d){return this.readUint8(d)<<24>>24}readUint8(d){return this.bytes_[d]}readInt16(d){return this.readUint16(d)<<16>>16}readUint16(d){return this.bytes_[d]|this.bytes_[d+1]<<8}readInt32(d){return this.bytes_[d]|this.bytes_[d+1]<<8|this.bytes_[d+2]<<16|this.bytes_[d+3]<<24}readUint32(d){return this.readInt32(d)>>>0}readInt64(d){return BigInt.asIntN(64,BigInt(this.readUint32(d))+(BigInt(this.readUint32(d+4))<<BigInt(32)))}readUint64(d){return BigInt.asUintN(64,BigInt(this.readUint32(d))+(BigInt(this.readUint32(d+4))<<BigInt(32)))}readFloat32(d){return a.int32[0]=this.readInt32(d),a.float32[0]}readFloat64(d){return a.int32[a.isLittleEndian?0:1]=this.readInt32(d),a.int32[a.isLittleEndian?1:0]=this.readInt32(d+4),a.float64[0]}writeInt8(d,p){this.bytes_[d]=p}writeUint8(d,p){this.bytes_[d]=p}writeInt16(d,p){this.bytes_[d]=p,this.bytes_[d+1]=p>>8}writeUint16(d,p){this.bytes_[d]=p,this.bytes_[d+1]=p>>8}writeInt32(d,p){this.bytes_[d]=p,this.bytes_[d+1]=p>>8,this.bytes_[d+2]=p>>16,this.bytes_[d+3]=p>>24}writeUint32(d,p){this.bytes_[d]=p,this.bytes_[d+1]=p>>8,this.bytes_[d+2]=p>>16,this.bytes_[d+3]=p>>24}writeInt64(d,p){this.writeInt32(d,Number(BigInt.asIntN(32,p))),this.writeInt32(d+4,Number(BigInt.asIntN(32,p>>BigInt(32))))}writeUint64(d,p){this.writeUint32(d,Number(BigInt.asUintN(32,p))),this.writeUint32(d+4,Number(BigInt.asUintN(32,p>>BigInt(32))))}writeFloat32(d,p){a.float32[0]=p,this.writeInt32(d,a.int32[0])}writeFloat64(d,p){a.float64[0]=p,this.writeInt32(d,a.int32[a.isLittleEndian?0:1]),this.writeInt32(d+4,a.int32[a.isLittleEndian?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+t.SIZEOF_INT+t.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let d="";for(let p=0;p<t.FILE_IDENTIFIER_LENGTH;p++)d+=String.fromCharCode(this.readInt8(this.position_+t.SIZEOF_INT+p));return d}__offset(d,p){let o=d-this.readInt32(d);return p<this.readInt16(o)?this.readInt16(o+p):0}__union(d,p){return d.bb_pos=p+this.readInt32(p),d.bb=this,d}__string(d,p){d+=this.readInt32(d);let o=this.readInt32(d);d+=t.SIZEOF_INT;let r=this.bytes_.subarray(d,d+o);return p===n.Encoding.UTF8_BYTES?r:this.text_decoder_.decode(r)}__union_with_string(d,p){return typeof d=="string"?this.__string(p):this.__union(d,p)}__indirect(d){return d+this.readInt32(d)}__vector(d){return d+this.readInt32(d)+t.SIZEOF_INT}__vector_len(d){return this.readInt32(d+this.readInt32(d))}__has_identifier(d){if(d.length!=t.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+t.FILE_IDENTIFIER_LENGTH);for(let p=0;p<t.FILE_IDENTIFIER_LENGTH;p++)if(d.charCodeAt(p)!=this.readInt8(this.position()+t.SIZEOF_INT+p))return!1;return!0}createScalarList(d,p){let o=[];for(let r=0;r<p;++r){let i=d(r);i!==null&&o.push(i)}return o}createObjList(d,p){let o=[];for(let r=0;r<p;++r){let i=d(r);i!==null&&o.push(i.unpack())}return o}};e.ByteBuffer=l}),Tx=ie(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Builder=void 0;var t=Yl(),n=Wo(),a=class Q2{constructor(u){this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder;let d;u?d=u:d=1024,this.bb=t.ByteBuffer.allocate(d),this.space=d}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(u){this.force_defaults=u}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(u,d){u>this.minalign&&(this.minalign=u);let p=~(this.bb.capacity()-this.space+d)+1&u-1;for(;this.space<p+u+d;){let o=this.bb.capacity();this.bb=Q2.growByteBuffer(this.bb),this.space+=this.bb.capacity()-o}this.pad(p)}pad(u){for(let d=0;d<u;d++)this.bb.writeInt8(--this.space,0)}writeInt8(u){this.bb.writeInt8(this.space-=1,u)}writeInt16(u){this.bb.writeInt16(this.space-=2,u)}writeInt32(u){this.bb.writeInt32(this.space-=4,u)}writeInt64(u){this.bb.writeInt64(this.space-=8,u)}writeFloat32(u){this.bb.writeFloat32(this.space-=4,u)}writeFloat64(u){this.bb.writeFloat64(this.space-=8,u)}addInt8(u){this.prep(1,0),this.writeInt8(u)}addInt16(u){this.prep(2,0),this.writeInt16(u)}addInt32(u){this.prep(4,0),this.writeInt32(u)}addInt64(u){this.prep(8,0),this.writeInt64(u)}addFloat32(u){this.prep(4,0),this.writeFloat32(u)}addFloat64(u){this.prep(8,0),this.writeFloat64(u)}addFieldInt8(u,d,p){(this.force_defaults||d!=p)&&(this.addInt8(d),this.slot(u))}addFieldInt16(u,d,p){(this.force_defaults||d!=p)&&(this.addInt16(d),this.slot(u))}addFieldInt32(u,d,p){(this.force_defaults||d!=p)&&(this.addInt32(d),this.slot(u))}addFieldInt64(u,d,p){(this.force_defaults||d!==p)&&(this.addInt64(d),this.slot(u))}addFieldFloat32(u,d,p){(this.force_defaults||d!=p)&&(this.addFloat32(d),this.slot(u))}addFieldFloat64(u,d,p){(this.force_defaults||d!=p)&&(this.addFloat64(d),this.slot(u))}addFieldOffset(u,d,p){(this.force_defaults||d!=p)&&(this.addOffset(d),this.slot(u))}addFieldStruct(u,d,p){d!=p&&(this.nested(d),this.slot(u))}nested(u){if(u!=this.offset())throw new TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new TypeError("FlatBuffers: object serialization must not be nested.")}slot(u){this.vtable!==null&&(this.vtable[u]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(u){let d=u.capacity();if(d&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let p=d<<1,o=t.ByteBuffer.allocate(p);return o.setPosition(p-d),o.bytes().set(u.bytes(),p-d),o}addOffset(u){this.prep(n.SIZEOF_INT,0),this.writeInt32(this.offset()-u+n.SIZEOF_INT)}startObject(u){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=u;for(let d=0;d<u;d++)this.vtable[d]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let u=this.offset(),d=this.vtable_in_use-1;for(;d>=0&&this.vtable[d]==0;d--);let p=d+1;for(;d>=0;d--)this.addInt16(this.vtable[d]!=0?u-this.vtable[d]:0);let o=2;this.addInt16(u-this.object_start);let r=(p+o)*n.SIZEOF_SHORT;this.addInt16(r);let i=0,s=this.space;e:for(d=0;d<this.vtables.length;d++){let c=this.bb.capacity()-this.vtables[d];if(r==this.bb.readInt16(c)){for(let h=n.SIZEOF_SHORT;h<r;h+=n.SIZEOF_SHORT)if(this.bb.readInt16(s+h)!=this.bb.readInt16(c+h))continue e;i=this.vtables[d];break}}return i?(this.space=this.bb.capacity()-u,this.bb.writeInt32(this.space,i-u)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-u,this.offset()-u)),this.isNested=!1,u}finish(u,d,p){let o=p?n.SIZE_PREFIX_LENGTH:0;if(d){let r=d;if(this.prep(this.minalign,n.SIZEOF_INT+n.FILE_IDENTIFIER_LENGTH+o),r.length!=n.FILE_IDENTIFIER_LENGTH)throw new TypeError("FlatBuffers: file identifier must be length "+n.FILE_IDENTIFIER_LENGTH);for(let i=n.FILE_IDENTIFIER_LENGTH-1;i>=0;i--)this.writeInt8(r.charCodeAt(i))}this.prep(this.minalign,n.SIZEOF_INT+o),this.addOffset(u),o&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(u,d){this.finish(u,d,!0)}requiredField(u,d){let p=this.bb.capacity()-u,o=p-this.bb.readInt32(p);if(!(d<this.bb.readInt16(o)&&this.bb.readInt16(o+d)!=0))throw new TypeError("FlatBuffers: field "+d+" must be set")}startVector(u,d,p){this.notNested(),this.vector_num_elems=d,this.prep(n.SIZEOF_INT,u*d),this.prep(p,u*d)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(u){if(!u)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(u))return this.string_maps.get(u);let d=this.createString(u);return this.string_maps.set(u,d),d}createString(u){if(u==null)return 0;let d;return u instanceof Uint8Array?d=u:d=this.text_encoder.encode(u),this.addInt8(0),this.startVector(1,d.length,1),this.bb.setPosition(this.space-=d.length),this.bb.bytes().set(d,this.space),this.endVector()}createByteVector(u){return u==null?0:(this.startVector(1,u.length,1),this.bb.setPosition(this.space-=u.length),this.bb.bytes().set(u,this.space),this.endVector())}createObjectOffset(u){return u===null?0:typeof u=="string"?this.createString(u):u.pack(this)}createObjectOffsetList(u){let d=[];for(let p=0;p<u.length;++p){let o=u[p];if(o!==null)d.push(this.createObjectOffset(o));else throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return d}createStructOffsetList(u,d){return d(this,u.length),this.createObjectOffsetList(u.slice().reverse()),this.endVector()}};e.Builder=a}),De=ie(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Encoding=e.ByteBuffer=e.Builder=e.isLittleEndian=e.int32=e.float64=e.float32=e.SIZE_PREFIX_LENGTH=e.SIZEOF_SHORT=e.SIZEOF_INT=e.FILE_IDENTIFIER_LENGTH=void 0;var t=Wo();Object.defineProperty(e,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return t.FILE_IDENTIFIER_LENGTH}}),Object.defineProperty(e,"SIZEOF_INT",{enumerable:!0,get:function(){return t.SIZEOF_INT}}),Object.defineProperty(e,"SIZEOF_SHORT",{enumerable:!0,get:function(){return t.SIZEOF_SHORT}}),Object.defineProperty(e,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return t.SIZE_PREFIX_LENGTH}});var n=Zl();Object.defineProperty(e,"float32",{enumerable:!0,get:function(){return n.float32}}),Object.defineProperty(e,"float64",{enumerable:!0,get:function(){return n.float64}}),Object.defineProperty(e,"int32",{enumerable:!0,get:function(){return n.int32}}),Object.defineProperty(e,"isLittleEndian",{enumerable:!0,get:function(){return n.isLittleEndian}});var a=Tx();Object.defineProperty(e,"Builder",{enumerable:!0,get:function(){return a.Builder}});var l=Yl();Object.defineProperty(e,"ByteBuffer",{enumerable:!0,get:function(){return l.ByteBuffer}});var u=Jl();Object.defineProperty(e,"Encoding",{enumerable:!0,get:function(){return u.Encoding}})}),Ql=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var s=Object.getOwnPropertyDescriptor(o,r);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,s)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),a=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[i.length]=s);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),s=0;s<i.length;s++)i[s]!=="default"&&t(r,o,i[s]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.ArgTypeAndIndex=void 0;var l=a(De()),u=Xl(),d=class Qr{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsArgTypeAndIndex(o,r){return(r||new Qr).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsArgTypeAndIndex(o,r){return o.setPosition(o.position()+l.SIZE_PREFIX_LENGTH),(r||new Qr).__init(o.readInt32(o.position())+o.position(),o)}argType(){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.readInt8(this.bb_pos+o):u.ArgType.INPUT}index(){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.readUint32(this.bb_pos+o):0}static startArgTypeAndIndex(o){o.startObject(2)}static addArgType(o,r){o.addFieldInt8(0,r,u.ArgType.INPUT)}static addIndex(o,r){o.addFieldInt32(1,r,0)}static endArgTypeAndIndex(o){return o.endObject()}static createArgTypeAndIndex(o,r,i){return Qr.startArgTypeAndIndex(o),Qr.addArgType(o,r),Qr.addIndex(o,i),Qr.endArgTypeAndIndex(o)}};e.ArgTypeAndIndex=d}),ed=ie(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.AttributeType=void 0;var t;(function(n){n[n.UNDEFINED=0]="UNDEFINED",n[n.FLOAT=1]="FLOAT",n[n.INT=2]="INT",n[n.STRING=3]="STRING",n[n.TENSOR=4]="TENSOR",n[n.GRAPH=5]="GRAPH",n[n.FLOATS=6]="FLOATS",n[n.INTS=7]="INTS",n[n.STRINGS=8]="STRINGS",n[n.TENSORS=9]="TENSORS",n[n.GRAPHS=10]="GRAPHS",n[n.SPARSE_TENSOR=11]="SPARSE_TENSOR",n[n.SPARSE_TENSORS=12]="SPARSE_TENSORS"})(t||(e.AttributeType=t={}))}),td=ie(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.NodeType=void 0;var t;(function(n){n[n.Primitive=0]="Primitive",n[n.Fused=1]="Fused"})(t||(e.NodeType=t={}))}),rd=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(o,r,i,s){s===void 0&&(s=i);var c=Object.getOwnPropertyDescriptor(r,i);(!c||("get"in c?!r.__esModule:c.writable||c.configurable))&&(c={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(o,s,c)}:function(o,r,i,s){s===void 0&&(s=i),o[s]=r[i]}),n=e&&e.__setModuleDefault||(Object.create?function(o,r){Object.defineProperty(o,"default",{enumerable:!0,value:r})}:function(o,r){o.default=r}),a=e&&e.__importStar||(function(){var o=function(r){return o=Object.getOwnPropertyNames||function(i){var s=[];for(var c in i)Object.prototype.hasOwnProperty.call(i,c)&&(s[s.length]=c);return s},o(r)};return function(r){if(r&&r.__esModule)return r;var i={};if(r!=null)for(var s=o(r),c=0;c<s.length;c++)s[c]!=="default"&&t(i,r,s[c]);return n(i,r),i}})();Object.defineProperty(e,"__esModule",{value:!0}),e.Node=void 0;var l=a(De()),u=_d(),d=td(),p=class it{constructor(){this.bb=null,this.bb_pos=0}__init(r,i){return this.bb_pos=r,this.bb=i,this}static getRootAsNode(r,i){return(i||new it).__init(r.readInt32(r.position())+r.position(),r)}static getSizePrefixedRootAsNode(r,i){return r.setPosition(r.position()+l.SIZE_PREFIX_LENGTH),(i||new it).__init(r.readInt32(r.position())+r.position(),r)}name(r){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.__string(this.bb_pos+i,r):null}docString(r){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__string(this.bb_pos+i,r):null}domain(r){let i=this.bb.__offset(this.bb_pos,8);return i?this.bb.__string(this.bb_pos+i,r):null}sinceVersion(){let r=this.bb.__offset(this.bb_pos,10);return r?this.bb.readInt32(this.bb_pos+r):0}index(){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.readUint32(this.bb_pos+r):0}opType(r){let i=this.bb.__offset(this.bb_pos,14);return i?this.bb.__string(this.bb_pos+i,r):null}type(){let r=this.bb.__offset(this.bb_pos,16);return r?this.bb.readInt32(this.bb_pos+r):d.NodeType.Primitive}executionProviderType(r){let i=this.bb.__offset(this.bb_pos,18);return i?this.bb.__string(this.bb_pos+i,r):null}inputs(r,i){let s=this.bb.__offset(this.bb_pos,20);return s?this.bb.__string(this.bb.__vector(this.bb_pos+s)+r*4,i):null}inputsLength(){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.__vector_len(this.bb_pos+r):0}outputs(r,i){let s=this.bb.__offset(this.bb_pos,22);return s?this.bb.__string(this.bb.__vector(this.bb_pos+s)+r*4,i):null}outputsLength(){let r=this.bb.__offset(this.bb_pos,22);return r?this.bb.__vector_len(this.bb_pos+r):0}attributes(r,i){let s=this.bb.__offset(this.bb_pos,24);return s?(i||new u.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+s)+r*4),this.bb):null}attributesLength(){let r=this.bb.__offset(this.bb_pos,24);return r?this.bb.__vector_len(this.bb_pos+r):0}inputArgCounts(r){let i=this.bb.__offset(this.bb_pos,26);return i?this.bb.readInt32(this.bb.__vector(this.bb_pos+i)+r*4):0}inputArgCountsLength(){let r=this.bb.__offset(this.bb_pos,26);return r?this.bb.__vector_len(this.bb_pos+r):0}inputArgCountsArray(){let r=this.bb.__offset(this.bb_pos,26);return r?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+r),this.bb.__vector_len(this.bb_pos+r)):null}implicitInputs(r,i){let s=this.bb.__offset(this.bb_pos,28);return s?this.bb.__string(this.bb.__vector(this.bb_pos+s)+r*4,i):null}implicitInputsLength(){let r=this.bb.__offset(this.bb_pos,28);return r?this.bb.__vector_len(this.bb_pos+r):0}static startNode(r){r.startObject(13)}static addName(r,i){r.addFieldOffset(0,i,0)}static addDocString(r,i){r.addFieldOffset(1,i,0)}static addDomain(r,i){r.addFieldOffset(2,i,0)}static addSinceVersion(r,i){r.addFieldInt32(3,i,0)}static addIndex(r,i){r.addFieldInt32(4,i,0)}static addOpType(r,i){r.addFieldOffset(5,i,0)}static addType(r,i){r.addFieldInt32(6,i,d.NodeType.Primitive)}static addExecutionProviderType(r,i){r.addFieldOffset(7,i,0)}static addInputs(r,i){r.addFieldOffset(8,i,0)}static createInputsVector(r,i){r.startVector(4,i.length,4);for(let s=i.length-1;s>=0;s--)r.addOffset(i[s]);return r.endVector()}static startInputsVector(r,i){r.startVector(4,i,4)}static addOutputs(r,i){r.addFieldOffset(9,i,0)}static createOutputsVector(r,i){r.startVector(4,i.length,4);for(let s=i.length-1;s>=0;s--)r.addOffset(i[s]);return r.endVector()}static startOutputsVector(r,i){r.startVector(4,i,4)}static addAttributes(r,i){r.addFieldOffset(10,i,0)}static createAttributesVector(r,i){r.startVector(4,i.length,4);for(let s=i.length-1;s>=0;s--)r.addOffset(i[s]);return r.endVector()}static startAttributesVector(r,i){r.startVector(4,i,4)}static addInputArgCounts(r,i){r.addFieldOffset(11,i,0)}static createInputArgCountsVector(r,i){r.startVector(4,i.length,4);for(let s=i.length-1;s>=0;s--)r.addInt32(i[s]);return r.endVector()}static startInputArgCountsVector(r,i){r.startVector(4,i,4)}static addImplicitInputs(r,i){r.addFieldOffset(12,i,0)}static createImplicitInputsVector(r,i){r.startVector(4,i.length,4);for(let s=i.length-1;s>=0;s--)r.addOffset(i[s]);return r.endVector()}static startImplicitInputsVector(r,i){r.startVector(4,i,4)}static endNode(r){return r.endObject()}static createNode(r,i,s,c,h,m,b,x,v,_,I,O,E,A){return it.startNode(r),it.addName(r,i),it.addDocString(r,s),it.addDomain(r,c),it.addSinceVersion(r,h),it.addIndex(r,m),it.addOpType(r,b),it.addType(r,x),it.addExecutionProviderType(r,v),it.addInputs(r,_),it.addOutputs(r,I),it.addAttributes(r,O),it.addInputArgCounts(r,E),it.addImplicitInputs(r,A),it.endNode(r)}};e.Node=p}),nd=ie(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.EdgeEnd=void 0;var t=class{constructor(){this.bb=null,this.bb_pos=0}__init(n,a){return this.bb_pos=n,this.bb=a,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(n,a,l,u){return n.prep(4,12),n.writeInt32(u),n.writeInt32(l),n.writeInt32(a),n.offset()}};e.EdgeEnd=t}),id=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var s=Object.getOwnPropertyDescriptor(o,r);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,s)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),a=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[i.length]=s);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),s=0;s<i.length;s++)i[s]!=="default"&&t(r,o,i[s]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.NodeEdge=void 0;var l=a(De()),u=nd(),d=class _r{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsNodeEdge(o,r){return(r||new _r).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsNodeEdge(o,r){return o.setPosition(o.position()+l.SIZE_PREFIX_LENGTH),(r||new _r).__init(o.readInt32(o.position())+o.position(),o)}nodeIndex(){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.readUint32(this.bb_pos+o):0}inputEdges(o,r){let i=this.bb.__offset(this.bb_pos,6);return i?(r||new u.EdgeEnd).__init(this.bb.__vector(this.bb_pos+i)+o*12,this.bb):null}inputEdgesLength(){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.__vector_len(this.bb_pos+o):0}outputEdges(o,r){let i=this.bb.__offset(this.bb_pos,8);return i?(r||new u.EdgeEnd).__init(this.bb.__vector(this.bb_pos+i)+o*12,this.bb):null}outputEdgesLength(){let o=this.bb.__offset(this.bb_pos,8);return o?this.bb.__vector_len(this.bb_pos+o):0}static startNodeEdge(o){o.startObject(3)}static addNodeIndex(o,r){o.addFieldInt32(0,r,0)}static addInputEdges(o,r){o.addFieldOffset(1,r,0)}static startInputEdgesVector(o,r){o.startVector(12,r,4)}static addOutputEdges(o,r){o.addFieldOffset(2,r,0)}static startOutputEdgesVector(o,r){o.startVector(12,r,4)}static endNodeEdge(o){return o.endObject()}static createNodeEdge(o,r,i,s){return _r.startNodeEdge(o),_r.addNodeIndex(o,r),_r.addInputEdges(o,i),_r.addOutputEdges(o,s),_r.endNodeEdge(o)}};e.NodeEdge=d}),od=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(d,p,o,r){r===void 0&&(r=o);var i=Object.getOwnPropertyDescriptor(p,o);(!i||("get"in i?!p.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return p[o]}}),Object.defineProperty(d,r,i)}:function(d,p,o,r){r===void 0&&(r=o),d[r]=p[o]}),n=e&&e.__setModuleDefault||(Object.create?function(d,p){Object.defineProperty(d,"default",{enumerable:!0,value:p})}:function(d,p){d.default=p}),a=e&&e.__importStar||(function(){var d=function(p){return d=Object.getOwnPropertyNames||function(o){var r=[];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(r[r.length]=i);return r},d(p)};return function(p){if(p&&p.__esModule)return p;var o={};if(p!=null)for(var r=d(p),i=0;i<r.length;i++)r[i]!=="default"&&t(o,p,r[i]);return n(o,p),o}})();Object.defineProperty(e,"__esModule",{value:!0}),e.NodesToOptimizeIndices=void 0;var l=a(De()),u=class Pt{constructor(){this.bb=null,this.bb_pos=0}__init(p,o){return this.bb_pos=p,this.bb=o,this}static getRootAsNodesToOptimizeIndices(p,o){return(o||new Pt).__init(p.readInt32(p.position())+p.position(),p)}static getSizePrefixedRootAsNodesToOptimizeIndices(p,o){return p.setPosition(p.position()+l.SIZE_PREFIX_LENGTH),(o||new Pt).__init(p.readInt32(p.position())+p.position(),p)}nodeIndices(p){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.readUint32(this.bb.__vector(this.bb_pos+o)+p*4):0}nodeIndicesLength(){let p=this.bb.__offset(this.bb_pos,4);return p?this.bb.__vector_len(this.bb_pos+p):0}nodeIndicesArray(){let p=this.bb.__offset(this.bb_pos,4);return p?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+p),this.bb.__vector_len(this.bb_pos+p)):null}numInputs(){let p=this.bb.__offset(this.bb_pos,6);return p?this.bb.readUint32(this.bb_pos+p):0}numOutputs(){let p=this.bb.__offset(this.bb_pos,8);return p?this.bb.readUint32(this.bb_pos+p):0}hasVariadicInput(){let p=this.bb.__offset(this.bb_pos,10);return p?!!this.bb.readInt8(this.bb_pos+p):!1}hasVariadicOutput(){let p=this.bb.__offset(this.bb_pos,12);return p?!!this.bb.readInt8(this.bb_pos+p):!1}numVariadicInputs(){let p=this.bb.__offset(this.bb_pos,14);return p?this.bb.readUint32(this.bb_pos+p):0}numVariadicOutputs(){let p=this.bb.__offset(this.bb_pos,16);return p?this.bb.readUint32(this.bb_pos+p):0}static startNodesToOptimizeIndices(p){p.startObject(7)}static addNodeIndices(p,o){p.addFieldOffset(0,o,0)}static createNodeIndicesVector(p,o){p.startVector(4,o.length,4);for(let r=o.length-1;r>=0;r--)p.addInt32(o[r]);return p.endVector()}static startNodeIndicesVector(p,o){p.startVector(4,o,4)}static addNumInputs(p,o){p.addFieldInt32(1,o,0)}static addNumOutputs(p,o){p.addFieldInt32(2,o,0)}static addHasVariadicInput(p,o){p.addFieldInt8(3,+o,0)}static addHasVariadicOutput(p,o){p.addFieldInt8(4,+o,0)}static addNumVariadicInputs(p,o){p.addFieldInt32(5,o,0)}static addNumVariadicOutputs(p,o){p.addFieldInt32(6,o,0)}static endNodesToOptimizeIndices(p){return p.endObject()}static createNodesToOptimizeIndices(p,o,r,i,s,c,h,m){return Pt.startNodesToOptimizeIndices(p),Pt.addNodeIndices(p,o),Pt.addNumInputs(p,r),Pt.addNumOutputs(p,i),Pt.addHasVariadicInput(p,s),Pt.addHasVariadicOutput(p,c),Pt.addNumVariadicInputs(p,h),Pt.addNumVariadicOutputs(p,m),Pt.endNodesToOptimizeIndices(p)}};e.NodesToOptimizeIndices=u}),sd=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var s=Object.getOwnPropertyDescriptor(o,r);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,s)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),a=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[i.length]=s);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),s=0;s<i.length;s++)i[s]!=="default"&&t(r,o,i[s]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizationRecord=void 0;var l=a(De()),u=od(),d=class pl{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsRuntimeOptimizationRecord(o,r){return(r||new pl).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsRuntimeOptimizationRecord(o,r){return o.setPosition(o.position()+l.SIZE_PREFIX_LENGTH),(r||new pl).__init(o.readInt32(o.position())+o.position(),o)}actionId(o){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,o):null}nodesToOptimizeIndices(o){let r=this.bb.__offset(this.bb_pos,6);return r?(o||new u.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}producedOpIds(o,r){let i=this.bb.__offset(this.bb_pos,10);return i?this.bb.__string(this.bb.__vector(this.bb_pos+i)+o*4,r):null}producedOpIdsLength(){let o=this.bb.__offset(this.bb_pos,10);return o?this.bb.__vector_len(this.bb_pos+o):0}static startRuntimeOptimizationRecord(o){o.startObject(4)}static addActionId(o,r){o.addFieldOffset(0,r,0)}static addNodesToOptimizeIndices(o,r){o.addFieldOffset(1,r,0)}static addProducedOpIds(o,r){o.addFieldOffset(3,r,0)}static createProducedOpIdsVector(o,r){o.startVector(4,r.length,4);for(let i=r.length-1;i>=0;i--)o.addOffset(r[i]);return o.endVector()}static startProducedOpIdsVector(o,r){o.startVector(4,r,4)}static endRuntimeOptimizationRecord(o){return o.endObject()}};e.RuntimeOptimizationRecord=d}),ad=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var s=Object.getOwnPropertyDescriptor(o,r);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,s)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),a=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[i.length]=s);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),s=0;s<i.length;s++)i[s]!=="default"&&t(r,o,i[s]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizationRecordContainerEntry=void 0;var l=a(De()),u=sd(),d=class en{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsRuntimeOptimizationRecordContainerEntry(o,r){return(r||new en).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(o,r){return o.setPosition(o.position()+l.SIZE_PREFIX_LENGTH),(r||new en).__init(o.readInt32(o.position())+o.position(),o)}optimizerName(o){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,o):null}runtimeOptimizationRecords(o,r){let i=this.bb.__offset(this.bb_pos,6);return i?(r||new u.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+o*4),this.bb):null}runtimeOptimizationRecordsLength(){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.__vector_len(this.bb_pos+o):0}static startRuntimeOptimizationRecordContainerEntry(o){o.startObject(2)}static addOptimizerName(o,r){o.addFieldOffset(0,r,0)}static addRuntimeOptimizationRecords(o,r){o.addFieldOffset(1,r,0)}static createRuntimeOptimizationRecordsVector(o,r){o.startVector(4,r.length,4);for(let i=r.length-1;i>=0;i--)o.addOffset(r[i]);return o.endVector()}static startRuntimeOptimizationRecordsVector(o,r){o.startVector(4,r,4)}static endRuntimeOptimizationRecordContainerEntry(o){let r=o.endObject();return o.requiredField(r,4),r}static createRuntimeOptimizationRecordContainerEntry(o,r,i){return en.startRuntimeOptimizationRecordContainerEntry(o),en.addOptimizerName(o,r),en.addRuntimeOptimizationRecords(o,i),en.endRuntimeOptimizationRecordContainerEntry(o)}};e.RuntimeOptimizationRecordContainerEntry=d}),ud=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var s=Object.getOwnPropertyDescriptor(o,r);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,s)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),a=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[i.length]=s);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),s=0;s<i.length;s++)i[s]!=="default"&&t(r,o,i[s]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizations=void 0;var l=a(De()),u=ad(),d=class In{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsRuntimeOptimizations(o,r){return(r||new In).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsRuntimeOptimizations(o,r){return o.setPosition(o.position()+l.SIZE_PREFIX_LENGTH),(r||new In).__init(o.readInt32(o.position())+o.position(),o)}records(o,r){let i=this.bb.__offset(this.bb_pos,4);return i?(r||new u.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+o*4),this.bb):null}recordsLength(){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.__vector_len(this.bb_pos+o):0}static startRuntimeOptimizations(o){o.startObject(1)}static addRecords(o,r){o.addFieldOffset(0,r,0)}static createRecordsVector(o,r){o.startVector(4,r.length,4);for(let i=r.length-1;i>=0;i--)o.addOffset(r[i]);return o.endVector()}static startRecordsVector(o,r){o.startVector(4,r,4)}static endRuntimeOptimizations(o){return o.endObject()}static createRuntimeOptimizations(o,r){return In.startRuntimeOptimizations(o),In.addRecords(o,r),In.endRuntimeOptimizations(o)}};e.RuntimeOptimizations=d}),Ei=ie(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TensorDataType=void 0;var t;(function(n){n[n.UNDEFINED=0]="UNDEFINED",n[n.FLOAT=1]="FLOAT",n[n.UINT8=2]="UINT8",n[n.INT8=3]="INT8",n[n.UINT16=4]="UINT16",n[n.INT16=5]="INT16",n[n.INT32=6]="INT32",n[n.INT64=7]="INT64",n[n.STRING=8]="STRING",n[n.BOOL=9]="BOOL",n[n.FLOAT16=10]="FLOAT16",n[n.DOUBLE=11]="DOUBLE",n[n.UINT32=12]="UINT32",n[n.UINT64=13]="UINT64",n[n.COMPLEX64=14]="COMPLEX64",n[n.COMPLEX128=15]="COMPLEX128",n[n.BFLOAT16=16]="BFLOAT16",n[n.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",n[n.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",n[n.FLOAT8E5M2=19]="FLOAT8E5M2",n[n.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"})(t||(e.TensorDataType=t={}))}),Pi=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var s=Object.getOwnPropertyDescriptor(o,r);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,s)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),a=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[i.length]=s);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),s=0;s<i.length;s++)i[s]!=="default"&&t(r,o,i[s]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.Tensor=void 0;var l=a(De()),u=Ei(),d=class At{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsTensor(o,r){return(r||new At).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsTensor(o,r){return o.setPosition(o.position()+l.SIZE_PREFIX_LENGTH),(r||new At).__init(o.readInt32(o.position())+o.position(),o)}name(o){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,o):null}docString(o){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,o):null}dims(o){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+o*8):BigInt(0)}dimsLength(){let o=this.bb.__offset(this.bb_pos,8);return o?this.bb.__vector_len(this.bb_pos+o):0}dataType(){let o=this.bb.__offset(this.bb_pos,10);return o?this.bb.readInt32(this.bb_pos+o):u.TensorDataType.UNDEFINED}rawData(o){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.readUint8(this.bb.__vector(this.bb_pos+r)+o):0}rawDataLength(){let o=this.bb.__offset(this.bb_pos,12);return o?this.bb.__vector_len(this.bb_pos+o):0}rawDataArray(){let o=this.bb.__offset(this.bb_pos,12);return o?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+o),this.bb.__vector_len(this.bb_pos+o)):null}stringData(o,r){let i=this.bb.__offset(this.bb_pos,14);return i?this.bb.__string(this.bb.__vector(this.bb_pos+i)+o*4,r):null}stringDataLength(){let o=this.bb.__offset(this.bb_pos,14);return o?this.bb.__vector_len(this.bb_pos+o):0}externalDataOffset(){let o=this.bb.__offset(this.bb_pos,16);return o?this.bb.readInt64(this.bb_pos+o):BigInt("-1")}static startTensor(o){o.startObject(7)}static addName(o,r){o.addFieldOffset(0,r,0)}static addDocString(o,r){o.addFieldOffset(1,r,0)}static addDims(o,r){o.addFieldOffset(2,r,0)}static createDimsVector(o,r){o.startVector(8,r.length,8);for(let i=r.length-1;i>=0;i--)o.addInt64(r[i]);return o.endVector()}static startDimsVector(o,r){o.startVector(8,r,8)}static addDataType(o,r){o.addFieldInt32(3,r,u.TensorDataType.UNDEFINED)}static addRawData(o,r){o.addFieldOffset(4,r,0)}static createRawDataVector(o,r){o.startVector(1,r.length,1);for(let i=r.length-1;i>=0;i--)o.addInt8(r[i]);return o.endVector()}static startRawDataVector(o,r){o.startVector(1,r,1)}static addStringData(o,r){o.addFieldOffset(5,r,0)}static createStringDataVector(o,r){o.startVector(4,r.length,4);for(let i=r.length-1;i>=0;i--)o.addOffset(r[i]);return o.endVector()}static startStringDataVector(o,r){o.startVector(4,r,4)}static addExternalDataOffset(o,r){o.addFieldInt64(6,r,BigInt("-1"))}static endTensor(o){return o.endObject()}static createTensor(o,r,i,s,c,h,m,b){return At.startTensor(o),At.addName(o,r),At.addDocString(o,i),At.addDims(o,s),At.addDataType(o,c),At.addRawData(o,h),At.addStringData(o,m),At.addExternalDataOffset(o,b),At.endTensor(o)}};e.Tensor=d}),ld=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var s=Object.getOwnPropertyDescriptor(o,r);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,s)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),a=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[i.length]=s);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),s=0;s<i.length;s++)i[s]!=="default"&&t(r,o,i[s]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.SparseTensor=void 0;var l=a(De()),u=Pi(),d=class cl{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsSparseTensor(o,r){return(r||new cl).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsSparseTensor(o,r){return o.setPosition(o.position()+l.SIZE_PREFIX_LENGTH),(r||new cl).__init(o.readInt32(o.position())+o.position(),o)}values(o){let r=this.bb.__offset(this.bb_pos,4);return r?(o||new u.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}indices(o){let r=this.bb.__offset(this.bb_pos,6);return r?(o||new u.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}dims(o){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+o*8):BigInt(0)}dimsLength(){let o=this.bb.__offset(this.bb_pos,8);return o?this.bb.__vector_len(this.bb_pos+o):0}static startSparseTensor(o){o.startObject(3)}static addValues(o,r){o.addFieldOffset(0,r,0)}static addIndices(o,r){o.addFieldOffset(1,r,0)}static addDims(o,r){o.addFieldOffset(2,r,0)}static createDimsVector(o,r){o.startVector(8,r.length,8);for(let i=r.length-1;i>=0;i--)o.addInt64(r[i]);return o.endVector()}static startDimsVector(o,r){o.startVector(8,r,8)}static endSparseTensor(o){return o.endObject()}};e.SparseTensor=d}),dd=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(o,r,i,s){s===void 0&&(s=i);var c=Object.getOwnPropertyDescriptor(r,i);(!c||("get"in c?!r.__esModule:c.writable||c.configurable))&&(c={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(o,s,c)}:function(o,r,i,s){s===void 0&&(s=i),o[s]=r[i]}),n=e&&e.__setModuleDefault||(Object.create?function(o,r){Object.defineProperty(o,"default",{enumerable:!0,value:r})}:function(o,r){o.default=r}),a=e&&e.__importStar||(function(){var o=function(r){return o=Object.getOwnPropertyNames||function(i){var s=[];for(var c in i)Object.prototype.hasOwnProperty.call(i,c)&&(s[s.length]=c);return s},o(r)};return function(r){if(r&&r.__esModule)return r;var i={};if(r!=null)for(var s=o(r),c=0;c<s.length;c++)s[c]!=="default"&&t(i,r,s[c]);return n(i,r),i}})();Object.defineProperty(e,"__esModule",{value:!0}),e.MapType=void 0;var l=a(De()),u=Ei(),d=Ai(),p=class hl{constructor(){this.bb=null,this.bb_pos=0}__init(r,i){return this.bb_pos=r,this.bb=i,this}static getRootAsMapType(r,i){return(i||new hl).__init(r.readInt32(r.position())+r.position(),r)}static getSizePrefixedRootAsMapType(r,i){return r.setPosition(r.position()+l.SIZE_PREFIX_LENGTH),(i||new hl).__init(r.readInt32(r.position())+r.position(),r)}keyType(){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readInt32(this.bb_pos+r):u.TensorDataType.UNDEFINED}valueType(r){let i=this.bb.__offset(this.bb_pos,6);return i?(r||new d.TypeInfo).__init(this.bb.__indirect(this.bb_pos+i),this.bb):null}static startMapType(r){r.startObject(2)}static addKeyType(r,i){r.addFieldInt32(0,i,u.TensorDataType.UNDEFINED)}static addValueType(r,i){r.addFieldOffset(1,i,0)}static endMapType(r){return r.endObject()}};e.MapType=p}),pd=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var s=Object.getOwnPropertyDescriptor(o,r);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,s)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),a=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[i.length]=s);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),s=0;s<i.length;s++)i[s]!=="default"&&t(r,o,i[s]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.SequenceType=void 0;var l=a(De()),u=Ai(),d=class Sn{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsSequenceType(o,r){return(r||new Sn).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsSequenceType(o,r){return o.setPosition(o.position()+l.SIZE_PREFIX_LENGTH),(r||new Sn).__init(o.readInt32(o.position())+o.position(),o)}elemType(o){let r=this.bb.__offset(this.bb_pos,4);return r?(o||new u.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startSequenceType(o){o.startObject(1)}static addElemType(o,r){o.addFieldOffset(0,r,0)}static endSequenceType(o){return o.endObject()}static createSequenceType(o,r){return Sn.startSequenceType(o),Sn.addElemType(o,r),Sn.endSequenceType(o)}};e.SequenceType=d}),cd=ie(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.DimensionValueType=void 0;var t;(function(n){n[n.UNKNOWN=0]="UNKNOWN",n[n.VALUE=1]="VALUE",n[n.PARAM=2]="PARAM"})(t||(e.DimensionValueType=t={}))}),hd=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var s=Object.getOwnPropertyDescriptor(o,r);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,s)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),a=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[i.length]=s);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),s=0;s<i.length;s++)i[s]!=="default"&&t(r,o,i[s]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.DimensionValue=void 0;var l=a(De()),u=cd(),d=class wr{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsDimensionValue(o,r){return(r||new wr).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsDimensionValue(o,r){return o.setPosition(o.position()+l.SIZE_PREFIX_LENGTH),(r||new wr).__init(o.readInt32(o.position())+o.position(),o)}dimType(){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.readInt8(this.bb_pos+o):u.DimensionValueType.UNKNOWN}dimValue(){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.readInt64(this.bb_pos+o):BigInt("0")}dimParam(o){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,o):null}static startDimensionValue(o){o.startObject(3)}static addDimType(o,r){o.addFieldInt8(0,r,u.DimensionValueType.UNKNOWN)}static addDimValue(o,r){o.addFieldInt64(1,r,BigInt("0"))}static addDimParam(o,r){o.addFieldOffset(2,r,0)}static endDimensionValue(o){return o.endObject()}static createDimensionValue(o,r,i,s){return wr.startDimensionValue(o),wr.addDimType(o,r),wr.addDimValue(o,i),wr.addDimParam(o,s),wr.endDimensionValue(o)}};e.DimensionValue=d}),fd=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var s=Object.getOwnPropertyDescriptor(o,r);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,s)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),a=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[i.length]=s);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),s=0;s<i.length;s++)i[s]!=="default"&&t(r,o,i[s]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.Dimension=void 0;var l=a(De()),u=hd(),d=class tn{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsDimension(o,r){return(r||new tn).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsDimension(o,r){return o.setPosition(o.position()+l.SIZE_PREFIX_LENGTH),(r||new tn).__init(o.readInt32(o.position())+o.position(),o)}value(o){let r=this.bb.__offset(this.bb_pos,4);return r?(o||new u.DimensionValue).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}denotation(o){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,o):null}static startDimension(o){o.startObject(2)}static addValue(o,r){o.addFieldOffset(0,r,0)}static addDenotation(o,r){o.addFieldOffset(1,r,0)}static endDimension(o){return o.endObject()}static createDimension(o,r,i){return tn.startDimension(o),tn.addValue(o,r),tn.addDenotation(o,i),tn.endDimension(o)}};e.Dimension=d}),md=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var s=Object.getOwnPropertyDescriptor(o,r);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,s)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),a=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[i.length]=s);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),s=0;s<i.length;s++)i[s]!=="default"&&t(r,o,i[s]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.Shape=void 0;var l=a(De()),u=fd(),d=class On{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsShape(o,r){return(r||new On).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsShape(o,r){return o.setPosition(o.position()+l.SIZE_PREFIX_LENGTH),(r||new On).__init(o.readInt32(o.position())+o.position(),o)}dim(o,r){let i=this.bb.__offset(this.bb_pos,4);return i?(r||new u.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+o*4),this.bb):null}dimLength(){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.__vector_len(this.bb_pos+o):0}static startShape(o){o.startObject(1)}static addDim(o,r){o.addFieldOffset(0,r,0)}static createDimVector(o,r){o.startVector(4,r.length,4);for(let i=r.length-1;i>=0;i--)o.addOffset(r[i]);return o.endVector()}static startDimVector(o,r){o.startVector(4,r,4)}static endShape(o){return o.endObject()}static createShape(o,r){return On.startShape(o),On.addDim(o,r),On.endShape(o)}};e.Shape=d}),gd=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(o,r,i,s){s===void 0&&(s=i);var c=Object.getOwnPropertyDescriptor(r,i);(!c||("get"in c?!r.__esModule:c.writable||c.configurable))&&(c={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(o,s,c)}:function(o,r,i,s){s===void 0&&(s=i),o[s]=r[i]}),n=e&&e.__setModuleDefault||(Object.create?function(o,r){Object.defineProperty(o,"default",{enumerable:!0,value:r})}:function(o,r){o.default=r}),a=e&&e.__importStar||(function(){var o=function(r){return o=Object.getOwnPropertyNames||function(i){var s=[];for(var c in i)Object.prototype.hasOwnProperty.call(i,c)&&(s[s.length]=c);return s},o(r)};return function(r){if(r&&r.__esModule)return r;var i={};if(r!=null)for(var s=o(r),c=0;c<s.length;c++)s[c]!=="default"&&t(i,r,s[c]);return n(i,r),i}})();Object.defineProperty(e,"__esModule",{value:!0}),e.TensorTypeAndShape=void 0;var l=a(De()),u=md(),d=Ei(),p=class fl{constructor(){this.bb=null,this.bb_pos=0}__init(r,i){return this.bb_pos=r,this.bb=i,this}static getRootAsTensorTypeAndShape(r,i){return(i||new fl).__init(r.readInt32(r.position())+r.position(),r)}static getSizePrefixedRootAsTensorTypeAndShape(r,i){return r.setPosition(r.position()+l.SIZE_PREFIX_LENGTH),(i||new fl).__init(r.readInt32(r.position())+r.position(),r)}elemType(){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readInt32(this.bb_pos+r):d.TensorDataType.UNDEFINED}shape(r){let i=this.bb.__offset(this.bb_pos,6);return i?(r||new u.Shape).__init(this.bb.__indirect(this.bb_pos+i),this.bb):null}static startTensorTypeAndShape(r){r.startObject(2)}static addElemType(r,i){r.addFieldInt32(0,i,d.TensorDataType.UNDEFINED)}static addShape(r,i){r.addFieldOffset(1,i,0)}static endTensorTypeAndShape(r){return r.endObject()}};e.TensorTypeAndShape=p}),bd=ie(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TypeInfoValue=void 0,e.unionToTypeInfoValue=u,e.unionListToTypeInfoValue=d;var t=dd(),n=pd(),a=gd(),l;(function(p){p[p.NONE=0]="NONE",p[p.tensor_type=1]="tensor_type",p[p.sequence_type=2]="sequence_type",p[p.map_type=3]="map_type"})(l||(e.TypeInfoValue=l={}));function u(p,o){switch(l[p]){case"NONE":return null;case"tensor_type":return o(new a.TensorTypeAndShape);case"sequence_type":return o(new n.SequenceType);case"map_type":return o(new t.MapType);default:return null}}function d(p,o,r){switch(l[p]){case"NONE":return null;case"tensor_type":return o(r,new a.TensorTypeAndShape);case"sequence_type":return o(r,new n.SequenceType);case"map_type":return o(r,new t.MapType);default:return null}}}),Ai=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var s=Object.getOwnPropertyDescriptor(o,r);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,s)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),a=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[i.length]=s);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),s=0;s<i.length;s++)i[s]!=="default"&&t(r,o,i[s]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.TypeInfo=void 0;var l=a(De()),u=bd(),d=class vr{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsTypeInfo(o,r){return(r||new vr).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsTypeInfo(o,r){return o.setPosition(o.position()+l.SIZE_PREFIX_LENGTH),(r||new vr).__init(o.readInt32(o.position())+o.position(),o)}denotation(o){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,o):null}valueType(){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.readUint8(this.bb_pos+o):u.TypeInfoValue.NONE}value(o){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__union(o,this.bb_pos+r):null}static startTypeInfo(o){o.startObject(3)}static addDenotation(o,r){o.addFieldOffset(0,r,0)}static addValueType(o,r){o.addFieldInt8(1,r,u.TypeInfoValue.NONE)}static addValue(o,r){o.addFieldOffset(2,r,0)}static endTypeInfo(o){return o.endObject()}static createTypeInfo(o,r,i,s){return vr.startTypeInfo(o),vr.addDenotation(o,r),vr.addValueType(o,i),vr.addValue(o,s),vr.endTypeInfo(o)}};e.TypeInfo=d}),yd=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var s=Object.getOwnPropertyDescriptor(o,r);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,s)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),a=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[i.length]=s);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),s=0;s<i.length;s++)i[s]!=="default"&&t(r,o,i[s]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.ValueInfo=void 0;var l=a(De()),u=Ai(),d=class ml{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsValueInfo(o,r){return(r||new ml).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsValueInfo(o,r){return o.setPosition(o.position()+l.SIZE_PREFIX_LENGTH),(r||new ml).__init(o.readInt32(o.position())+o.position(),o)}name(o){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,o):null}docString(o){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,o):null}type(o){let r=this.bb.__offset(this.bb_pos,8);return r?(o||new u.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startValueInfo(o){o.startObject(3)}static addName(o,r){o.addFieldOffset(0,r,0)}static addDocString(o,r){o.addFieldOffset(1,r,0)}static addType(o,r){o.addFieldOffset(2,r,0)}static endValueInfo(o){return o.endObject()}};e.ValueInfo=d}),Ko=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(c,h,m,b){b===void 0&&(b=m);var x=Object.getOwnPropertyDescriptor(h,m);(!x||("get"in x?!h.__esModule:x.writable||x.configurable))&&(x={enumerable:!0,get:function(){return h[m]}}),Object.defineProperty(c,b,x)}:function(c,h,m,b){b===void 0&&(b=m),c[b]=h[m]}),n=e&&e.__setModuleDefault||(Object.create?function(c,h){Object.defineProperty(c,"default",{enumerable:!0,value:h})}:function(c,h){c.default=h}),a=e&&e.__importStar||(function(){var c=function(h){return c=Object.getOwnPropertyNames||function(m){var b=[];for(var x in m)Object.prototype.hasOwnProperty.call(m,x)&&(b[b.length]=x);return b},c(h)};return function(h){if(h&&h.__esModule)return h;var m={};if(h!=null)for(var b=c(h),x=0;x<b.length;x++)b[x]!=="default"&&t(m,h,b[x]);return n(m,h),m}})();Object.defineProperty(e,"__esModule",{value:!0}),e.Graph=void 0;var l=a(De()),u=rd(),d=id(),p=ud(),o=ld(),r=Pi(),i=yd(),s=class gl{constructor(){this.bb=null,this.bb_pos=0}__init(h,m){return this.bb_pos=h,this.bb=m,this}static getRootAsGraph(h,m){return(m||new gl).__init(h.readInt32(h.position())+h.position(),h)}static getSizePrefixedRootAsGraph(h,m){return h.setPosition(h.position()+l.SIZE_PREFIX_LENGTH),(m||new gl).__init(h.readInt32(h.position())+h.position(),h)}initializers(h,m){let b=this.bb.__offset(this.bb_pos,4);return b?(m||new r.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+b)+h*4),this.bb):null}initializersLength(){let h=this.bb.__offset(this.bb_pos,4);return h?this.bb.__vector_len(this.bb_pos+h):0}nodeArgs(h,m){let b=this.bb.__offset(this.bb_pos,6);return b?(m||new i.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+b)+h*4),this.bb):null}nodeArgsLength(){let h=this.bb.__offset(this.bb_pos,6);return h?this.bb.__vector_len(this.bb_pos+h):0}nodes(h,m){let b=this.bb.__offset(this.bb_pos,8);return b?(m||new u.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+b)+h*4),this.bb):null}nodesLength(){let h=this.bb.__offset(this.bb_pos,8);return h?this.bb.__vector_len(this.bb_pos+h):0}maxNodeIndex(){let h=this.bb.__offset(this.bb_pos,10);return h?this.bb.readUint32(this.bb_pos+h):0}nodeEdges(h,m){let b=this.bb.__offset(this.bb_pos,12);return b?(m||new d.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+b)+h*4),this.bb):null}nodeEdgesLength(){let h=this.bb.__offset(this.bb_pos,12);return h?this.bb.__vector_len(this.bb_pos+h):0}inputs(h,m){let b=this.bb.__offset(this.bb_pos,14);return b?this.bb.__string(this.bb.__vector(this.bb_pos+b)+h*4,m):null}inputsLength(){let h=this.bb.__offset(this.bb_pos,14);return h?this.bb.__vector_len(this.bb_pos+h):0}outputs(h,m){let b=this.bb.__offset(this.bb_pos,16);return b?this.bb.__string(this.bb.__vector(this.bb_pos+b)+h*4,m):null}outputsLength(){let h=this.bb.__offset(this.bb_pos,16);return h?this.bb.__vector_len(this.bb_pos+h):0}sparseInitializers(h,m){let b=this.bb.__offset(this.bb_pos,18);return b?(m||new o.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+b)+h*4),this.bb):null}sparseInitializersLength(){let h=this.bb.__offset(this.bb_pos,18);return h?this.bb.__vector_len(this.bb_pos+h):0}runtimeOptimizations(h){let m=this.bb.__offset(this.bb_pos,20);return m?(h||new p.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+m),this.bb):null}static startGraph(h){h.startObject(9)}static addInitializers(h,m){h.addFieldOffset(0,m,0)}static createInitializersVector(h,m){h.startVector(4,m.length,4);for(let b=m.length-1;b>=0;b--)h.addOffset(m[b]);return h.endVector()}static startInitializersVector(h,m){h.startVector(4,m,4)}static addNodeArgs(h,m){h.addFieldOffset(1,m,0)}static createNodeArgsVector(h,m){h.startVector(4,m.length,4);for(let b=m.length-1;b>=0;b--)h.addOffset(m[b]);return h.endVector()}static startNodeArgsVector(h,m){h.startVector(4,m,4)}static addNodes(h,m){h.addFieldOffset(2,m,0)}static createNodesVector(h,m){h.startVector(4,m.length,4);for(let b=m.length-1;b>=0;b--)h.addOffset(m[b]);return h.endVector()}static startNodesVector(h,m){h.startVector(4,m,4)}static addMaxNodeIndex(h,m){h.addFieldInt32(3,m,0)}static addNodeEdges(h,m){h.addFieldOffset(4,m,0)}static createNodeEdgesVector(h,m){h.startVector(4,m.length,4);for(let b=m.length-1;b>=0;b--)h.addOffset(m[b]);return h.endVector()}static startNodeEdgesVector(h,m){h.startVector(4,m,4)}static addInputs(h,m){h.addFieldOffset(5,m,0)}static createInputsVector(h,m){h.startVector(4,m.length,4);for(let b=m.length-1;b>=0;b--)h.addOffset(m[b]);return h.endVector()}static startInputsVector(h,m){h.startVector(4,m,4)}static addOutputs(h,m){h.addFieldOffset(6,m,0)}static createOutputsVector(h,m){h.startVector(4,m.length,4);for(let b=m.length-1;b>=0;b--)h.addOffset(m[b]);return h.endVector()}static startOutputsVector(h,m){h.startVector(4,m,4)}static addSparseInitializers(h,m){h.addFieldOffset(7,m,0)}static createSparseInitializersVector(h,m){h.startVector(4,m.length,4);for(let b=m.length-1;b>=0;b--)h.addOffset(m[b]);return h.endVector()}static startSparseInitializersVector(h,m){h.startVector(4,m,4)}static addRuntimeOptimizations(h,m){h.addFieldOffset(8,m,0)}static endGraph(h){return h.endObject()}};e.Graph=s}),_d=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(r,i,s,c){c===void 0&&(c=s);var h=Object.getOwnPropertyDescriptor(i,s);(!h||("get"in h?!i.__esModule:h.writable||h.configurable))&&(h={enumerable:!0,get:function(){return i[s]}}),Object.defineProperty(r,c,h)}:function(r,i,s,c){c===void 0&&(c=s),r[c]=i[s]}),n=e&&e.__setModuleDefault||(Object.create?function(r,i){Object.defineProperty(r,"default",{enumerable:!0,value:i})}:function(r,i){r.default=i}),a=e&&e.__importStar||(function(){var r=function(i){return r=Object.getOwnPropertyNames||function(s){var c=[];for(var h in s)Object.prototype.hasOwnProperty.call(s,h)&&(c[c.length]=h);return c},r(i)};return function(i){if(i&&i.__esModule)return i;var s={};if(i!=null)for(var c=r(i),h=0;h<c.length;h++)c[h]!=="default"&&t(s,i,c[h]);return n(s,i),s}})();Object.defineProperty(e,"__esModule",{value:!0}),e.Attribute=void 0;var l=a(De()),u=ed(),d=Ko(),p=Pi(),o=class bl{constructor(){this.bb=null,this.bb_pos=0}__init(i,s){return this.bb_pos=i,this.bb=s,this}static getRootAsAttribute(i,s){return(s||new bl).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsAttribute(i,s){return i.setPosition(i.position()+l.SIZE_PREFIX_LENGTH),(s||new bl).__init(i.readInt32(i.position())+i.position(),i)}name(i){let s=this.bb.__offset(this.bb_pos,4);return s?this.bb.__string(this.bb_pos+s,i):null}docString(i){let s=this.bb.__offset(this.bb_pos,6);return s?this.bb.__string(this.bb_pos+s,i):null}type(){let i=this.bb.__offset(this.bb_pos,8);return i?this.bb.readInt32(this.bb_pos+i):u.AttributeType.UNDEFINED}f(){let i=this.bb.__offset(this.bb_pos,10);return i?this.bb.readFloat32(this.bb_pos+i):0}i(){let i=this.bb.__offset(this.bb_pos,12);return i?this.bb.readInt64(this.bb_pos+i):BigInt("0")}s(i){let s=this.bb.__offset(this.bb_pos,14);return s?this.bb.__string(this.bb_pos+s,i):null}t(i){let s=this.bb.__offset(this.bb_pos,16);return s?(i||new p.Tensor).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}g(i){let s=this.bb.__offset(this.bb_pos,18);return s?(i||new d.Graph).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}floats(i){let s=this.bb.__offset(this.bb_pos,20);return s?this.bb.readFloat32(this.bb.__vector(this.bb_pos+s)+i*4):0}floatsLength(){let i=this.bb.__offset(this.bb_pos,20);return i?this.bb.__vector_len(this.bb_pos+i):0}floatsArray(){let i=this.bb.__offset(this.bb_pos,20);return i?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+i),this.bb.__vector_len(this.bb_pos+i)):null}ints(i){let s=this.bb.__offset(this.bb_pos,22);return s?this.bb.readInt64(this.bb.__vector(this.bb_pos+s)+i*8):BigInt(0)}intsLength(){let i=this.bb.__offset(this.bb_pos,22);return i?this.bb.__vector_len(this.bb_pos+i):0}strings(i,s){let c=this.bb.__offset(this.bb_pos,24);return c?this.bb.__string(this.bb.__vector(this.bb_pos+c)+i*4,s):null}stringsLength(){let i=this.bb.__offset(this.bb_pos,24);return i?this.bb.__vector_len(this.bb_pos+i):0}tensors(i,s){let c=this.bb.__offset(this.bb_pos,26);return c?(s||new p.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+c)+i*4),this.bb):null}tensorsLength(){let i=this.bb.__offset(this.bb_pos,26);return i?this.bb.__vector_len(this.bb_pos+i):0}graphs(i,s){let c=this.bb.__offset(this.bb_pos,28);return c?(s||new d.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+c)+i*4),this.bb):null}graphsLength(){let i=this.bb.__offset(this.bb_pos,28);return i?this.bb.__vector_len(this.bb_pos+i):0}static startAttribute(i){i.startObject(13)}static addName(i,s){i.addFieldOffset(0,s,0)}static addDocString(i,s){i.addFieldOffset(1,s,0)}static addType(i,s){i.addFieldInt32(2,s,u.AttributeType.UNDEFINED)}static addF(i,s){i.addFieldFloat32(3,s,0)}static addI(i,s){i.addFieldInt64(4,s,BigInt("0"))}static addS(i,s){i.addFieldOffset(5,s,0)}static addT(i,s){i.addFieldOffset(6,s,0)}static addG(i,s){i.addFieldOffset(7,s,0)}static addFloats(i,s){i.addFieldOffset(8,s,0)}static createFloatsVector(i,s){i.startVector(4,s.length,4);for(let c=s.length-1;c>=0;c--)i.addFloat32(s[c]);return i.endVector()}static startFloatsVector(i,s){i.startVector(4,s,4)}static addInts(i,s){i.addFieldOffset(9,s,0)}static createIntsVector(i,s){i.startVector(8,s.length,8);for(let c=s.length-1;c>=0;c--)i.addInt64(s[c]);return i.endVector()}static startIntsVector(i,s){i.startVector(8,s,8)}static addStrings(i,s){i.addFieldOffset(10,s,0)}static createStringsVector(i,s){i.startVector(4,s.length,4);for(let c=s.length-1;c>=0;c--)i.addOffset(s[c]);return i.endVector()}static startStringsVector(i,s){i.startVector(4,s,4)}static addTensors(i,s){i.addFieldOffset(11,s,0)}static createTensorsVector(i,s){i.startVector(4,s.length,4);for(let c=s.length-1;c>=0;c--)i.addOffset(s[c]);return i.endVector()}static startTensorsVector(i,s){i.startVector(4,s,4)}static addGraphs(i,s){i.addFieldOffset(12,s,0)}static createGraphsVector(i,s){i.startVector(4,s.length,4);for(let c=s.length-1;c>=0;c--)i.addOffset(s[c]);return i.endVector()}static startGraphsVector(i,s){i.startVector(4,s,4)}static endAttribute(i){return i.endObject()}};e.Attribute=o}),wd=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(d,p,o,r){r===void 0&&(r=o);var i=Object.getOwnPropertyDescriptor(p,o);(!i||("get"in i?!p.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return p[o]}}),Object.defineProperty(d,r,i)}:function(d,p,o,r){r===void 0&&(r=o),d[r]=p[o]}),n=e&&e.__setModuleDefault||(Object.create?function(d,p){Object.defineProperty(d,"default",{enumerable:!0,value:p})}:function(d,p){d.default=p}),a=e&&e.__importStar||(function(){var d=function(p){return d=Object.getOwnPropertyNames||function(o){var r=[];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(r[r.length]=i);return r},d(p)};return function(p){if(p&&p.__esModule)return p;var o={};if(p!=null)for(var r=d(p),i=0;i<r.length;i++)r[i]!=="default"&&t(o,p,r[i]);return n(o,p),o}})();Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedKernelCreateInfos=void 0;var l=a(De()),u=class rn{constructor(){this.bb=null,this.bb_pos=0}__init(p,o){return this.bb_pos=p,this.bb=o,this}static getRootAsDeprecatedKernelCreateInfos(p,o){return(o||new rn).__init(p.readInt32(p.position())+p.position(),p)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(p,o){return p.setPosition(p.position()+l.SIZE_PREFIX_LENGTH),(o||new rn).__init(p.readInt32(p.position())+p.position(),p)}nodeIndices(p){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.readUint32(this.bb.__vector(this.bb_pos+o)+p*4):0}nodeIndicesLength(){let p=this.bb.__offset(this.bb_pos,4);return p?this.bb.__vector_len(this.bb_pos+p):0}nodeIndicesArray(){let p=this.bb.__offset(this.bb_pos,4);return p?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+p),this.bb.__vector_len(this.bb_pos+p)):null}kernelDefHashes(p){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.readUint64(this.bb.__vector(this.bb_pos+o)+p*8):BigInt(0)}kernelDefHashesLength(){let p=this.bb.__offset(this.bb_pos,6);return p?this.bb.__vector_len(this.bb_pos+p):0}static startDeprecatedKernelCreateInfos(p){p.startObject(2)}static addNodeIndices(p,o){p.addFieldOffset(0,o,0)}static createNodeIndicesVector(p,o){p.startVector(4,o.length,4);for(let r=o.length-1;r>=0;r--)p.addInt32(o[r]);return p.endVector()}static startNodeIndicesVector(p,o){p.startVector(4,o,4)}static addKernelDefHashes(p,o){p.addFieldOffset(1,o,0)}static createKernelDefHashesVector(p,o){p.startVector(8,o.length,8);for(let r=o.length-1;r>=0;r--)p.addInt64(o[r]);return p.endVector()}static startKernelDefHashesVector(p,o){p.startVector(8,o,8)}static endDeprecatedKernelCreateInfos(p){return p.endObject()}static createDeprecatedKernelCreateInfos(p,o,r){return rn.startDeprecatedKernelCreateInfos(p),rn.addNodeIndices(p,o),rn.addKernelDefHashes(p,r),rn.endDeprecatedKernelCreateInfos(p)}};e.DeprecatedKernelCreateInfos=u}),Ix=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(d,p,o,r){r===void 0&&(r=o);var i=Object.getOwnPropertyDescriptor(p,o);(!i||("get"in i?!p.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return p[o]}}),Object.defineProperty(d,r,i)}:function(d,p,o,r){r===void 0&&(r=o),d[r]=p[o]}),n=e&&e.__setModuleDefault||(Object.create?function(d,p){Object.defineProperty(d,"default",{enumerable:!0,value:p})}:function(d,p){d.default=p}),a=e&&e.__importStar||(function(){var d=function(p){return d=Object.getOwnPropertyNames||function(o){var r=[];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(r[r.length]=i);return r},d(p)};return function(p){if(p&&p.__esModule)return p;var o={};if(p!=null)for(var r=d(p),i=0;i<r.length;i++)r[i]!=="default"&&t(o,p,r[i]);return n(o,p),o}})();Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedNodeIndexAndKernelDefHash=void 0;var l=a(De()),u=class nn{constructor(){this.bb=null,this.bb_pos=0}__init(p,o){return this.bb_pos=p,this.bb=o,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(p,o){return(o||new nn).__init(p.readInt32(p.position())+p.position(),p)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(p,o){return p.setPosition(p.position()+l.SIZE_PREFIX_LENGTH),(o||new nn).__init(p.readInt32(p.position())+p.position(),p)}nodeIndex(){let p=this.bb.__offset(this.bb_pos,4);return p?this.bb.readUint32(this.bb_pos+p):0}kernelDefHash(){let p=this.bb.__offset(this.bb_pos,6);return p?this.bb.readUint64(this.bb_pos+p):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(p){p.startObject(2)}static addNodeIndex(p,o){p.addFieldInt32(0,o,0)}static addKernelDefHash(p,o){p.addFieldInt64(1,o,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(p){return p.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(p,o,r){return nn.startDeprecatedNodeIndexAndKernelDefHash(p),nn.addNodeIndex(p,o),nn.addKernelDefHash(p,r),nn.endDeprecatedNodeIndexAndKernelDefHash(p)}};e.DeprecatedNodeIndexAndKernelDefHash=u}),vd=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var s=Object.getOwnPropertyDescriptor(o,r);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,s)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),a=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[i.length]=s);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),s=0;s<i.length;s++)i[s]!=="default"&&t(r,o,i[s]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedSubGraphSessionState=void 0;var l=a(De()),u=xd(),d=class yl{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsDeprecatedSubGraphSessionState(o,r){return(r||new yl).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(o,r){return o.setPosition(o.position()+l.SIZE_PREFIX_LENGTH),(r||new yl).__init(o.readInt32(o.position())+o.position(),o)}graphId(o){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,o):null}sessionState(o){let r=this.bb.__offset(this.bb_pos,6);return r?(o||new u.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startDeprecatedSubGraphSessionState(o){o.startObject(2)}static addGraphId(o,r){o.addFieldOffset(0,r,0)}static addSessionState(o,r){o.addFieldOffset(1,r,0)}static endDeprecatedSubGraphSessionState(o){let r=o.endObject();return o.requiredField(r,4),r}};e.DeprecatedSubGraphSessionState=d}),xd=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(o,r,i,s){s===void 0&&(s=i);var c=Object.getOwnPropertyDescriptor(r,i);(!c||("get"in c?!r.__esModule:c.writable||c.configurable))&&(c={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(o,s,c)}:function(o,r,i,s){s===void 0&&(s=i),o[s]=r[i]}),n=e&&e.__setModuleDefault||(Object.create?function(o,r){Object.defineProperty(o,"default",{enumerable:!0,value:r})}:function(o,r){o.default=r}),a=e&&e.__importStar||(function(){var o=function(r){return o=Object.getOwnPropertyNames||function(i){var s=[];for(var c in i)Object.prototype.hasOwnProperty.call(i,c)&&(s[s.length]=c);return s},o(r)};return function(r){if(r&&r.__esModule)return r;var i={};if(r!=null)for(var s=o(r),c=0;c<s.length;c++)s[c]!=="default"&&t(i,r,s[c]);return n(i,r),i}})();Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedSessionState=void 0;var l=a(De()),u=wd(),d=vd(),p=class on{constructor(){this.bb=null,this.bb_pos=0}__init(r,i){return this.bb_pos=r,this.bb=i,this}static getRootAsDeprecatedSessionState(r,i){return(i||new on).__init(r.readInt32(r.position())+r.position(),r)}static getSizePrefixedRootAsDeprecatedSessionState(r,i){return r.setPosition(r.position()+l.SIZE_PREFIX_LENGTH),(i||new on).__init(r.readInt32(r.position())+r.position(),r)}kernels(r){let i=this.bb.__offset(this.bb_pos,4);return i?(r||new u.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+i),this.bb):null}subGraphSessionStates(r,i){let s=this.bb.__offset(this.bb_pos,6);return s?(i||new d.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+s)+r*4),this.bb):null}subGraphSessionStatesLength(){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__vector_len(this.bb_pos+r):0}static startDeprecatedSessionState(r){r.startObject(2)}static addKernels(r,i){r.addFieldOffset(0,i,0)}static addSubGraphSessionStates(r,i){r.addFieldOffset(1,i,0)}static createSubGraphSessionStatesVector(r,i){r.startVector(4,i.length,4);for(let s=i.length-1;s>=0;s--)r.addOffset(i[s]);return r.endVector()}static startSubGraphSessionStatesVector(r,i){r.startVector(4,i,4)}static endDeprecatedSessionState(r){return r.endObject()}static createDeprecatedSessionState(r,i,s){return on.startDeprecatedSessionState(r),on.addKernels(r,i),on.addSubGraphSessionStates(r,s),on.endDeprecatedSessionState(r)}};e.DeprecatedSessionState=p}),$d=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var s=Object.getOwnPropertyDescriptor(o,r);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,s)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),a=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[i.length]=s);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),s=0;s<i.length;s++)i[s]!=="default"&&t(r,o,i[s]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.KernelTypeStrArgsEntry=void 0;var l=a(De()),u=Ql(),d=class sn{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsKernelTypeStrArgsEntry(o,r){return(r||new sn).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(o,r){return o.setPosition(o.position()+l.SIZE_PREFIX_LENGTH),(r||new sn).__init(o.readInt32(o.position())+o.position(),o)}kernelTypeStr(o){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,o):null}args(o,r){let i=this.bb.__offset(this.bb_pos,6);return i?(r||new u.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+o*4),this.bb):null}argsLength(){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.__vector_len(this.bb_pos+o):0}static startKernelTypeStrArgsEntry(o){o.startObject(2)}static addKernelTypeStr(o,r){o.addFieldOffset(0,r,0)}static addArgs(o,r){o.addFieldOffset(1,r,0)}static createArgsVector(o,r){o.startVector(4,r.length,4);for(let i=r.length-1;i>=0;i--)o.addOffset(r[i]);return o.endVector()}static startArgsVector(o,r){o.startVector(4,r,4)}static endKernelTypeStrArgsEntry(o){let r=o.endObject();return o.requiredField(r,4),r}static createKernelTypeStrArgsEntry(o,r,i){return sn.startKernelTypeStrArgsEntry(o),sn.addKernelTypeStr(o,r),sn.addArgs(o,i),sn.endKernelTypeStrArgsEntry(o)}};e.KernelTypeStrArgsEntry=d}),Td=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var s=Object.getOwnPropertyDescriptor(o,r);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,s)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),a=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[i.length]=s);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),s=0;s<i.length;s++)i[s]!=="default"&&t(r,o,i[s]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.OpIdKernelTypeStrArgsEntry=void 0;var l=a(De()),u=$d(),d=class an{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsOpIdKernelTypeStrArgsEntry(o,r){return(r||new an).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(o,r){return o.setPosition(o.position()+l.SIZE_PREFIX_LENGTH),(r||new an).__init(o.readInt32(o.position())+o.position(),o)}opId(o){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,o):null}kernelTypeStrArgs(o,r){let i=this.bb.__offset(this.bb_pos,6);return i?(r||new u.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+o*4),this.bb):null}kernelTypeStrArgsLength(){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.__vector_len(this.bb_pos+o):0}static startOpIdKernelTypeStrArgsEntry(o){o.startObject(2)}static addOpId(o,r){o.addFieldOffset(0,r,0)}static addKernelTypeStrArgs(o,r){o.addFieldOffset(1,r,0)}static createKernelTypeStrArgsVector(o,r){o.startVector(4,r.length,4);for(let i=r.length-1;i>=0;i--)o.addOffset(r[i]);return o.endVector()}static startKernelTypeStrArgsVector(o,r){o.startVector(4,r,4)}static endOpIdKernelTypeStrArgsEntry(o){let r=o.endObject();return o.requiredField(r,4),r}static createOpIdKernelTypeStrArgsEntry(o,r,i){return an.startOpIdKernelTypeStrArgsEntry(o),an.addOpId(o,r),an.addKernelTypeStrArgs(o,i),an.endOpIdKernelTypeStrArgsEntry(o)}};e.OpIdKernelTypeStrArgsEntry=d}),Id=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(p,o,r,i){i===void 0&&(i=r);var s=Object.getOwnPropertyDescriptor(o,r);(!s||("get"in s?!o.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return o[r]}}),Object.defineProperty(p,i,s)}:function(p,o,r,i){i===void 0&&(i=r),p[i]=o[r]}),n=e&&e.__setModuleDefault||(Object.create?function(p,o){Object.defineProperty(p,"default",{enumerable:!0,value:o})}:function(p,o){p.default=o}),a=e&&e.__importStar||(function(){var p=function(o){return p=Object.getOwnPropertyNames||function(r){var i=[];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[i.length]=s);return i},p(o)};return function(o){if(o&&o.__esModule)return o;var r={};if(o!=null)for(var i=p(o),s=0;s<i.length;s++)i[s]!=="default"&&t(r,o,i[s]);return n(r,o),r}})();Object.defineProperty(e,"__esModule",{value:!0}),e.KernelTypeStrResolver=void 0;var l=a(De()),u=Td(),d=class En{constructor(){this.bb=null,this.bb_pos=0}__init(o,r){return this.bb_pos=o,this.bb=r,this}static getRootAsKernelTypeStrResolver(o,r){return(r||new En).__init(o.readInt32(o.position())+o.position(),o)}static getSizePrefixedRootAsKernelTypeStrResolver(o,r){return o.setPosition(o.position()+l.SIZE_PREFIX_LENGTH),(r||new En).__init(o.readInt32(o.position())+o.position(),o)}opKernelTypeStrArgs(o,r){let i=this.bb.__offset(this.bb_pos,4);return i?(r||new u.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+o*4),this.bb):null}opKernelTypeStrArgsLength(){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.__vector_len(this.bb_pos+o):0}static startKernelTypeStrResolver(o){o.startObject(1)}static addOpKernelTypeStrArgs(o,r){o.addFieldOffset(0,r,0)}static createOpKernelTypeStrArgsVector(o,r){o.startVector(4,r.length,4);for(let i=r.length-1;i>=0;i--)o.addOffset(r[i]);return o.endVector()}static startOpKernelTypeStrArgsVector(o,r){o.startVector(4,r,4)}static endKernelTypeStrResolver(o){return o.endObject()}static createKernelTypeStrResolver(o,r){return En.startKernelTypeStrResolver(o),En.addOpKernelTypeStrArgs(o,r),En.endKernelTypeStrResolver(o)}};e.KernelTypeStrResolver=d}),Sd=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(d,p,o,r){r===void 0&&(r=o);var i=Object.getOwnPropertyDescriptor(p,o);(!i||("get"in i?!p.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return p[o]}}),Object.defineProperty(d,r,i)}:function(d,p,o,r){r===void 0&&(r=o),d[r]=p[o]}),n=e&&e.__setModuleDefault||(Object.create?function(d,p){Object.defineProperty(d,"default",{enumerable:!0,value:p})}:function(d,p){d.default=p}),a=e&&e.__importStar||(function(){var d=function(p){return d=Object.getOwnPropertyNames||function(o){var r=[];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(r[r.length]=i);return r},d(p)};return function(p){if(p&&p.__esModule)return p;var o={};if(p!=null)for(var r=d(p),i=0;i<r.length;i++)r[i]!=="default"&&t(o,p,r[i]);return n(o,p),o}})();Object.defineProperty(e,"__esModule",{value:!0}),e.OperatorSetId=void 0;var l=a(De()),u=class un{constructor(){this.bb=null,this.bb_pos=0}__init(p,o){return this.bb_pos=p,this.bb=o,this}static getRootAsOperatorSetId(p,o){return(o||new un).__init(p.readInt32(p.position())+p.position(),p)}static getSizePrefixedRootAsOperatorSetId(p,o){return p.setPosition(p.position()+l.SIZE_PREFIX_LENGTH),(o||new un).__init(p.readInt32(p.position())+p.position(),p)}domain(p){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.__string(this.bb_pos+o,p):null}version(){let p=this.bb.__offset(this.bb_pos,6);return p?this.bb.readInt64(this.bb_pos+p):BigInt("0")}static startOperatorSetId(p){p.startObject(2)}static addDomain(p,o){p.addFieldOffset(0,o,0)}static addVersion(p,o){p.addFieldInt64(1,o,BigInt("0"))}static endOperatorSetId(p){return p.endObject()}static createOperatorSetId(p,o,r){return un.startOperatorSetId(p),un.addDomain(p,o),un.addVersion(p,r),un.endOperatorSetId(p)}};e.OperatorSetId=u}),Od=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(d,p,o,r){r===void 0&&(r=o);var i=Object.getOwnPropertyDescriptor(p,o);(!i||("get"in i?!p.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return p[o]}}),Object.defineProperty(d,r,i)}:function(d,p,o,r){r===void 0&&(r=o),d[r]=p[o]}),n=e&&e.__setModuleDefault||(Object.create?function(d,p){Object.defineProperty(d,"default",{enumerable:!0,value:p})}:function(d,p){d.default=p}),a=e&&e.__importStar||(function(){var d=function(p){return d=Object.getOwnPropertyNames||function(o){var r=[];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(r[r.length]=i);return r},d(p)};return function(p){if(p&&p.__esModule)return p;var o={};if(p!=null)for(var r=d(p),i=0;i<r.length;i++)r[i]!=="default"&&t(o,p,r[i]);return n(o,p),o}})();Object.defineProperty(e,"__esModule",{value:!0}),e.StringStringEntry=void 0;var l=a(De()),u=class ln{constructor(){this.bb=null,this.bb_pos=0}__init(p,o){return this.bb_pos=p,this.bb=o,this}static getRootAsStringStringEntry(p,o){return(o||new ln).__init(p.readInt32(p.position())+p.position(),p)}static getSizePrefixedRootAsStringStringEntry(p,o){return p.setPosition(p.position()+l.SIZE_PREFIX_LENGTH),(o||new ln).__init(p.readInt32(p.position())+p.position(),p)}key(p){let o=this.bb.__offset(this.bb_pos,4);return o?this.bb.__string(this.bb_pos+o,p):null}value(p){let o=this.bb.__offset(this.bb_pos,6);return o?this.bb.__string(this.bb_pos+o,p):null}static startStringStringEntry(p){p.startObject(2)}static addKey(p,o){p.addFieldOffset(0,o,0)}static addValue(p,o){p.addFieldOffset(1,o,0)}static endStringStringEntry(p){return p.endObject()}static createStringStringEntry(p,o,r){return ln.startStringStringEntry(p),ln.addKey(p,o),ln.addValue(p,r),ln.endStringStringEntry(p)}};e.StringStringEntry=u}),Ed=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(r,i,s,c){c===void 0&&(c=s);var h=Object.getOwnPropertyDescriptor(i,s);(!h||("get"in h?!i.__esModule:h.writable||h.configurable))&&(h={enumerable:!0,get:function(){return i[s]}}),Object.defineProperty(r,c,h)}:function(r,i,s,c){c===void 0&&(c=s),r[c]=i[s]}),n=e&&e.__setModuleDefault||(Object.create?function(r,i){Object.defineProperty(r,"default",{enumerable:!0,value:i})}:function(r,i){r.default=i}),a=e&&e.__importStar||(function(){var r=function(i){return r=Object.getOwnPropertyNames||function(s){var c=[];for(var h in s)Object.prototype.hasOwnProperty.call(s,h)&&(c[c.length]=h);return c},r(i)};return function(i){if(i&&i.__esModule)return i;var s={};if(i!=null)for(var c=r(i),h=0;h<c.length;h++)c[h]!=="default"&&t(s,i,c[h]);return n(s,i),s}})();Object.defineProperty(e,"__esModule",{value:!0}),e.Model=void 0;var l=a(De()),u=Ko(),d=Sd(),p=Od(),o=class _l{constructor(){this.bb=null,this.bb_pos=0}__init(i,s){return this.bb_pos=i,this.bb=s,this}static getRootAsModel(i,s){return(s||new _l).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsModel(i,s){return i.setPosition(i.position()+l.SIZE_PREFIX_LENGTH),(s||new _l).__init(i.readInt32(i.position())+i.position(),i)}irVersion(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.readInt64(this.bb_pos+i):BigInt("0")}opsetImport(i,s){let c=this.bb.__offset(this.bb_pos,6);return c?(s||new d.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+c)+i*4),this.bb):null}opsetImportLength(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__vector_len(this.bb_pos+i):0}producerName(i){let s=this.bb.__offset(this.bb_pos,8);return s?this.bb.__string(this.bb_pos+s,i):null}producerVersion(i){let s=this.bb.__offset(this.bb_pos,10);return s?this.bb.__string(this.bb_pos+s,i):null}domain(i){let s=this.bb.__offset(this.bb_pos,12);return s?this.bb.__string(this.bb_pos+s,i):null}modelVersion(){let i=this.bb.__offset(this.bb_pos,14);return i?this.bb.readInt64(this.bb_pos+i):BigInt("0")}docString(i){let s=this.bb.__offset(this.bb_pos,16);return s?this.bb.__string(this.bb_pos+s,i):null}graph(i){let s=this.bb.__offset(this.bb_pos,18);return s?(i||new u.Graph).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}graphDocString(i){let s=this.bb.__offset(this.bb_pos,20);return s?this.bb.__string(this.bb_pos+s,i):null}metadataProps(i,s){let c=this.bb.__offset(this.bb_pos,22);return c?(s||new p.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+c)+i*4),this.bb):null}metadataPropsLength(){let i=this.bb.__offset(this.bb_pos,22);return i?this.bb.__vector_len(this.bb_pos+i):0}static startModel(i){i.startObject(10)}static addIrVersion(i,s){i.addFieldInt64(0,s,BigInt("0"))}static addOpsetImport(i,s){i.addFieldOffset(1,s,0)}static createOpsetImportVector(i,s){i.startVector(4,s.length,4);for(let c=s.length-1;c>=0;c--)i.addOffset(s[c]);return i.endVector()}static startOpsetImportVector(i,s){i.startVector(4,s,4)}static addProducerName(i,s){i.addFieldOffset(2,s,0)}static addProducerVersion(i,s){i.addFieldOffset(3,s,0)}static addDomain(i,s){i.addFieldOffset(4,s,0)}static addModelVersion(i,s){i.addFieldInt64(5,s,BigInt("0"))}static addDocString(i,s){i.addFieldOffset(6,s,0)}static addGraph(i,s){i.addFieldOffset(7,s,0)}static addGraphDocString(i,s){i.addFieldOffset(8,s,0)}static addMetadataProps(i,s){i.addFieldOffset(9,s,0)}static createMetadataPropsVector(i,s){i.startVector(4,s.length,4);for(let c=s.length-1;c>=0;c--)i.addOffset(s[c]);return i.endVector()}static startMetadataPropsVector(i,s){i.startVector(4,s,4)}static endModel(i){return i.endObject()}};e.Model=o}),Sx=ie(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(o,r,i,s){s===void 0&&(s=i);var c=Object.getOwnPropertyDescriptor(r,i);(!c||("get"in c?!r.__esModule:c.writable||c.configurable))&&(c={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(o,s,c)}:function(o,r,i,s){s===void 0&&(s=i),o[s]=r[i]}),n=e&&e.__setModuleDefault||(Object.create?function(o,r){Object.defineProperty(o,"default",{enumerable:!0,value:r})}:function(o,r){o.default=r}),a=e&&e.__importStar||(function(){var o=function(r){return o=Object.getOwnPropertyNames||function(i){var s=[];for(var c in i)Object.prototype.hasOwnProperty.call(i,c)&&(s[s.length]=c);return s},o(r)};return function(r){if(r&&r.__esModule)return r;var i={};if(r!=null)for(var s=o(r),c=0;c<s.length;c++)s[c]!=="default"&&t(i,r,s[c]);return n(i,r),i}})();Object.defineProperty(e,"__esModule",{value:!0}),e.InferenceSession=void 0;var l=a(De()),u=Id(),d=Ed(),p=class wl{constructor(){this.bb=null,this.bb_pos=0}__init(r,i){return this.bb_pos=r,this.bb=i,this}static getRootAsInferenceSession(r,i){return(i||new wl).__init(r.readInt32(r.position())+r.position(),r)}static getSizePrefixedRootAsInferenceSession(r,i){return r.setPosition(r.position()+l.SIZE_PREFIX_LENGTH),(i||new wl).__init(r.readInt32(r.position())+r.position(),r)}static bufferHasIdentifier(r){return r.__has_identifier("ORTM")}ortVersion(r){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.__string(this.bb_pos+i,r):null}model(r){let i=this.bb.__offset(this.bb_pos,6);return i?(r||new d.Model).__init(this.bb.__indirect(this.bb_pos+i),this.bb):null}kernelTypeStrResolver(r){let i=this.bb.__offset(this.bb_pos,10);return i?(r||new u.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+i),this.bb):null}static startInferenceSession(r){r.startObject(4)}static addOrtVersion(r,i){r.addFieldOffset(0,i,0)}static addModel(r,i){r.addFieldOffset(1,i,0)}static addKernelTypeStrResolver(r,i){r.addFieldOffset(3,i,0)}static endInferenceSession(r){return r.endObject()}static finishInferenceSessionBuffer(r,i){r.finish(i,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(r,i){r.finish(i,"ORTM",!0)}};e.InferenceSession=p}),Ox,Ex,Xo,Nt,Px,Ax,kx,Dx,Nx,Cx,zx,Rx,Pd,Ad,Bx,Mx,Fx,jx,kd,Lx,Vx,Ux,qx,Gx,Hx,Wx,Kx,Xx,Zx,Jx,Yx,Qx,ki,Dd,e$,Nd,t$,r$=N(()=>{"use strict";Ox=ce(Xl()),Ex=ce(Ql()),Xo=ce(_d()),Nt=ce(ed()),Px=ce(wd()),Ax=ce(Ix()),kx=ce(xd()),Dx=ce(vd()),Nx=ce(fd()),Cx=ce(hd()),zx=ce(cd()),Rx=ce(nd()),Pd=ce(Ko()),Ad=ce(Sx()),Bx=ce($d()),Mx=ce(Id()),Fx=ce(dd()),jx=ce(Ed()),kd=ce(rd()),Lx=ce(id()),Vx=ce(td()),Ux=ce(od()),qx=ce(Td()),Gx=ce(Sd()),Hx=ce(sd()),Wx=ce(ad()),Kx=ce(ud()),Xx=ce(pd()),Zx=ce(md()),Jx=ce(ld()),Yx=ce(Od()),Qx=ce(Pi()),ki=ce(Ei()),Dd=ce(gd()),e$=ce(Ai()),Nd=ce(bd()),t$=ce(yd())}),Di=N(()=>{"use strict";r$()}),n$=ie((e,t)=>{"use strict";t.exports=n;function n(a,l){for(var u=new Array(arguments.length-1),d=0,p=2,o=!0;p<arguments.length;)u[d++]=arguments[p++];return new Promise(function(r,i){u[d]=function(s){if(o)if(o=!1,s)i(s);else{for(var c=new Array(arguments.length-1),h=0;h<c.length;)c[h++]=arguments[h];r.apply(null,c)}};try{a.apply(l||null,u)}catch(s){o&&(o=!1,i(s))}})}}),i$=ie(e=>{"use strict";var t=e;t.length=function(d){var p=d.length;if(!p)return 0;for(var o=0;--p%4>1&&d.charAt(p)==="=";)++o;return Math.ceil(d.length*3)/4-o};var n=new Array(64),a=new Array(123);for(l=0;l<64;)a[n[l]=l<26?l+65:l<52?l+71:l<62?l-4:l-59|43]=l++;var l;t.encode=function(d,p,o){for(var r=null,i=[],s=0,c=0,h;p<o;){var m=d[p++];switch(c){case 0:i[s++]=n[m>>2],h=(m&3)<<4,c=1;break;case 1:i[s++]=n[h|m>>4],h=(m&15)<<2,c=2;break;case 2:i[s++]=n[h|m>>6],i[s++]=n[m&63],c=0;break}s>8191&&((r||(r=[])).push(String.fromCharCode.apply(String,i)),s=0)}return c&&(i[s++]=n[h],i[s++]=61,c===1&&(i[s++]=61)),r?(s&&r.push(String.fromCharCode.apply(String,i.slice(0,s))),r.join("")):String.fromCharCode.apply(String,i.slice(0,s))};var u="invalid encoding";t.decode=function(d,p,o){for(var r=o,i=0,s,c=0;c<d.length;){var h=d.charCodeAt(c++);if(h===61&&i>1)break;if((h=a[h])===void 0)throw Error(u);switch(i){case 0:s=h,i=1;break;case 1:p[o++]=s<<2|(h&48)>>4,s=h,i=2;break;case 2:p[o++]=(s&15)<<4|(h&60)>>2,s=h,i=3;break;case 3:p[o++]=(s&3)<<6|h,i=0;break}}if(i===1)throw Error(u);return o-r},t.test=function(d){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(d)}}),o$=ie((e,t)=>{"use strict";t.exports=n;function n(){this._listeners=Object.create(null)}n.prototype.on=function(a,l,u){return(this._listeners[a]||(this._listeners[a]=[])).push({fn:l,ctx:u||this}),this},n.prototype.off=function(a,l){if(a===void 0)this._listeners=Object.create(null);else if(l===void 0)this._listeners[a]=[];else{var u=this._listeners[a];if(!u)return this;for(var d=0;d<u.length;)u[d].fn===l?u.splice(d,1):++d}return this},n.prototype.emit=function(a){var l=this._listeners[a];if(l){for(var u=[],d=1;d<arguments.length;)u.push(arguments[d++]);for(d=0;d<l.length;)l[d].fn.apply(l[d++].ctx,u)}return this}}),s$=ie((e,t)=>{"use strict";t.exports=n(n);function n(p){return typeof Float32Array<"u"?(function(){var o=new Float32Array([-0]),r=new Uint8Array(o.buffer),i=r[3]===128;function s(b,x,v){o[0]=b,x[v]=r[0],x[v+1]=r[1],x[v+2]=r[2],x[v+3]=r[3]}function c(b,x,v){o[0]=b,x[v]=r[3],x[v+1]=r[2],x[v+2]=r[1],x[v+3]=r[0]}p.writeFloatLE=i?s:c,p.writeFloatBE=i?c:s;function h(b,x){return r[0]=b[x],r[1]=b[x+1],r[2]=b[x+2],r[3]=b[x+3],o[0]}function m(b,x){return r[3]=b[x],r[2]=b[x+1],r[1]=b[x+2],r[0]=b[x+3],o[0]}p.readFloatLE=i?h:m,p.readFloatBE=i?m:h})():(function(){function o(i,s,c,h){var m=s<0?1:0;if(m&&(s=-s),s===0)i(1/s>0?0:2147483648,c,h);else if(isNaN(s))i(2143289344,c,h);else if(s>34028234663852886e22)i((m<<31|2139095040)>>>0,c,h);else if(s<11754943508222875e-54)i((m<<31|Math.round(s/1401298464324817e-60))>>>0,c,h);else{var b=Math.floor(Math.log(s)/Math.LN2),x=Math.round(s*Math.pow(2,-b)*8388608)&8388607;i((m<<31|b+127<<23|x)>>>0,c,h)}}p.writeFloatLE=o.bind(null,a),p.writeFloatBE=o.bind(null,l);function r(i,s,c){var h=i(s,c),m=(h>>31)*2+1,b=h>>>23&255,x=h&8388607;return b===255?x?NaN:m*(1/0):b===0?m*1401298464324817e-60*x:m*Math.pow(2,b-150)*(x+8388608)}p.readFloatLE=r.bind(null,u),p.readFloatBE=r.bind(null,d)})(),typeof Float64Array<"u"?(function(){var o=new Float64Array([-0]),r=new Uint8Array(o.buffer),i=r[7]===128;function s(b,x,v){o[0]=b,x[v]=r[0],x[v+1]=r[1],x[v+2]=r[2],x[v+3]=r[3],x[v+4]=r[4],x[v+5]=r[5],x[v+6]=r[6],x[v+7]=r[7]}function c(b,x,v){o[0]=b,x[v]=r[7],x[v+1]=r[6],x[v+2]=r[5],x[v+3]=r[4],x[v+4]=r[3],x[v+5]=r[2],x[v+6]=r[1],x[v+7]=r[0]}p.writeDoubleLE=i?s:c,p.writeDoubleBE=i?c:s;function h(b,x){return r[0]=b[x],r[1]=b[x+1],r[2]=b[x+2],r[3]=b[x+3],r[4]=b[x+4],r[5]=b[x+5],r[6]=b[x+6],r[7]=b[x+7],o[0]}function m(b,x){return r[7]=b[x],r[6]=b[x+1],r[5]=b[x+2],r[4]=b[x+3],r[3]=b[x+4],r[2]=b[x+5],r[1]=b[x+6],r[0]=b[x+7],o[0]}p.readDoubleLE=i?h:m,p.readDoubleBE=i?m:h})():(function(){function o(i,s,c,h,m,b){var x=h<0?1:0;if(x&&(h=-h),h===0)i(0,m,b+s),i(1/h>0?0:2147483648,m,b+c);else if(isNaN(h))i(0,m,b+s),i(2146959360,m,b+c);else if(h>17976931348623157e292)i(0,m,b+s),i((x<<31|2146435072)>>>0,m,b+c);else{var v;if(h<22250738585072014e-324)v=h/5e-324,i(v>>>0,m,b+s),i((x<<31|v/4294967296)>>>0,m,b+c);else{var _=Math.floor(Math.log(h)/Math.LN2);_===1024&&(_=1023),v=h*Math.pow(2,-_),i(v*4503599627370496>>>0,m,b+s),i((x<<31|_+1023<<20|v*1048576&1048575)>>>0,m,b+c)}}}p.writeDoubleLE=o.bind(null,a,0,4),p.writeDoubleBE=o.bind(null,l,4,0);function r(i,s,c,h,m){var b=i(h,m+s),x=i(h,m+c),v=(x>>31)*2+1,_=x>>>20&2047,I=4294967296*(x&1048575)+b;return _===2047?I?NaN:v*(1/0):_===0?v*5e-324*I:v*Math.pow(2,_-1075)*(I+4503599627370496)}p.readDoubleLE=r.bind(null,u,0,4),p.readDoubleBE=r.bind(null,d,4,0)})(),p}function a(p,o,r){o[r]=p&255,o[r+1]=p>>>8&255,o[r+2]=p>>>16&255,o[r+3]=p>>>24}function l(p,o,r){o[r]=p>>>24,o[r+1]=p>>>16&255,o[r+2]=p>>>8&255,o[r+3]=p&255}function u(p,o){return(p[o]|p[o+1]<<8|p[o+2]<<16|p[o+3]<<24)>>>0}function d(p,o){return(p[o]<<24|p[o+1]<<16|p[o+2]<<8|p[o+3])>>>0}}),a$=ie((e,t)=>{"use strict";t.exports=n;function n(a){try{if(typeof Eo!="function")return null;var l=Eo(a);return l&&(l.length||Object.keys(l).length)?l:null}catch{return null}}}),u$=ie(e=>{"use strict";var t=e,n="�";t.length=function(a){for(var l=0,u=0,d=0;d<a.length;++d)u=a.charCodeAt(d),u<128?l+=1:u<2048?l+=2:(u&64512)===55296&&(a.charCodeAt(d+1)&64512)===56320?(++d,l+=4):l+=3;return l},t.read=function(a,l,u){if(u-l<1)return"";for(var d="",p=l;p<u;){var o=a[p++];if(o<=127)d+=String.fromCharCode(o);else if(o>=192&&o<224){var r=(o&31)<<6|a[p++]&63;d+=r>=128?String.fromCharCode(r):n}else if(o>=224&&o<240){var i=(o&15)<<12|(a[p++]&63)<<6|a[p++]&63;d+=i>=2048?String.fromCharCode(i):n}else if(o>=240){var s=(o&7)<<18|(a[p++]&63)<<12|(a[p++]&63)<<6|a[p++]&63;s<65536||s>1114111?d+=n:(s-=65536,d+=String.fromCharCode(55296+(s>>10)),d+=String.fromCharCode(56320+(s&1023)))}}return d},t.write=function(a,l,u){for(var d=u,p,o,r=0;r<a.length;++r)p=a.charCodeAt(r),p<128?l[u++]=p:p<2048?(l[u++]=p>>6|192,l[u++]=p&63|128):(p&64512)===55296&&((o=a.charCodeAt(r+1))&64512)===56320?(p=65536+((p&1023)<<10)+(o&1023),++r,l[u++]=p>>18|240,l[u++]=p>>12&63|128,l[u++]=p>>6&63|128,l[u++]=p&63|128):(l[u++]=p>>12|224,l[u++]=p>>6&63|128,l[u++]=p&63|128);return u-d}}),l$=ie((e,t)=>{"use strict";t.exports=n;function n(a,l,u){var d=u||8192,p=d>>>1,o=null,r=d;return function(i){if(i<1||i>p)return a(i);r+i>d&&(o=a(d),r=0);var s=l.call(o,r,r+=i);return r&7&&(r=(r|7)+1),s}}}),d$=ie((e,t)=>{"use strict";t.exports=a;var n=Rr();function a(p,o){this.lo=p>>>0,this.hi=o>>>0}var l=a.zero=new a(0,0);l.toNumber=function(){return 0},l.zzEncode=l.zzDecode=function(){return this},l.length=function(){return 1};var u=a.zeroHash="\0\0\0\0\0\0\0\0";a.fromNumber=function(p){if(p===0)return l;var o=p<0;o&&(p=-p);var r=p>>>0,i=(p-r)/4294967296>>>0;return o&&(i=~i>>>0,r=~r>>>0,++r>4294967295&&(r=0,++i>4294967295&&(i=0))),new a(r,i)},a.from=function(p){if(typeof p=="number")return a.fromNumber(p);if(n.isString(p))if(n.Long)p=n.Long.fromString(p);else return a.fromNumber(parseInt(p,10));return p.low||p.high?new a(p.low>>>0,p.high>>>0):l},a.prototype.toNumber=function(p){if(!p&&this.hi>>>31){var o=~this.lo+1>>>0,r=~this.hi>>>0;return o||(r=r+1>>>0),-(o+r*4294967296)}return this.lo+this.hi*4294967296},a.prototype.toLong=function(p){return n.Long?new n.Long(this.lo|0,this.hi|0,!!p):{low:this.lo|0,high:this.hi|0,unsigned:!!p}};var d=String.prototype.charCodeAt;a.fromHash=function(p){return p===u?l:new a((d.call(p,0)|d.call(p,1)<<8|d.call(p,2)<<16|d.call(p,3)<<24)>>>0,(d.call(p,4)|d.call(p,5)<<8|d.call(p,6)<<16|d.call(p,7)<<24)>>>0)},a.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)},a.prototype.zzEncode=function(){var p=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^p)>>>0,this.lo=(this.lo<<1^p)>>>0,this},a.prototype.zzDecode=function(){var p=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^p)>>>0,this.hi=(this.hi>>>1^p)>>>0,this},a.prototype.length=function(){var p=this.lo,o=(this.lo>>>28|this.hi<<4)>>>0,r=this.hi>>>24;return r===0?o===0?p<16384?p<128?1:2:p<2097152?3:4:o<16384?o<128?5:6:o<2097152?7:8:r<128?9:10}}),p$=ie((e,t)=>{(function(n,a){function l(u){return u.default||u}typeof define=="function"&&define.amd?define([],function(){var u={};return a(u),l(u)}):typeof e=="object"?(a(e),typeof t=="object"&&(t.exports=l(e))):(function(){var u={};a(u),n.Long=l(u)})()})(typeof globalThis<"u"?globalThis:typeof self<"u"?self:e,function(n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=null;try{a=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function l($,z,G){this.low=$|0,this.high=z|0,this.unsigned=!!G}l.prototype.__isLong__,Object.defineProperty(l.prototype,"__isLong__",{value:!0});function u($){return($&&$.__isLong__)===!0}function d($){var z=Math.clz32($&-$);return $?31-z:z}l.isLong=u;var p={},o={};function r($,z){var G,re,V;return z?($>>>=0,(V=0<=$&&$<256)&&(re=o[$],re)?re:(G=s($,0,!0),V&&(o[$]=G),G)):($|=0,(V=-128<=$&&$<128)&&(re=p[$],re)?re:(G=s($,$<0?-1:0,!1),V&&(p[$]=G),G))}l.fromInt=r;function i($,z){if(isNaN($))return z?A:E;if(z){if($<0)return A;if($>=_)return J}else{if($<=-I)return K;if($+1>=I)return F}return $<0?i(-$,z).neg():s($%v|0,$/v|0,z)}l.fromNumber=i;function s($,z,G){return new l($,z,G)}l.fromBits=s;var c=Math.pow;function h($,z,G){if($.length===0)throw Error("empty string");if(typeof z=="number"?(G=z,z=!1):z=!!z,$==="NaN"||$==="Infinity"||$==="+Infinity"||$==="-Infinity")return z?A:E;if(G=G||10,G<2||36<G)throw RangeError("radix");var re;if((re=$.indexOf("-"))>0)throw Error("interior hyphen");if(re===0)return h($.substring(1),z,G).neg();for(var V=i(c(G,8)),ee=E,U=0;U<$.length;U+=8){var W=Math.min(8,$.length-U),X=parseInt($.substring(U,U+W),G);if(W<8){var q=i(c(G,W));ee=ee.mul(q).add(i(X))}else ee=ee.mul(V),ee=ee.add(i(X))}return ee.unsigned=z,ee}l.fromString=h;function m($,z){return typeof $=="number"?i($,z):typeof $=="string"?h($,z):s($.low,$.high,typeof z=="boolean"?z:$.unsigned)}l.fromValue=m;var b=65536,x=1<<24,v=b*b,_=v*v,I=_/2,O=r(x),E=r(0);l.ZERO=E;var A=r(0,!0);l.UZERO=A;var k=r(1);l.ONE=k;var T=r(1,!0);l.UONE=T;var M=r(-1);l.NEG_ONE=M;var F=s(-1,2147483647,!1);l.MAX_VALUE=F;var J=s(-1,-1,!0);l.MAX_UNSIGNED_VALUE=J;var K=s(0,-2147483648,!1);l.MIN_VALUE=K;var C=l.prototype;C.toInt=function(){return this.unsigned?this.low>>>0:this.low},C.toNumber=function(){return this.unsigned?(this.high>>>0)*v+(this.low>>>0):this.high*v+(this.low>>>0)},C.toString=function($){if($=$||10,$<2||36<$)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(K)){var z=i($),G=this.div(z),re=G.mul(z).sub(this);return G.toString($)+re.toInt().toString($)}else return"-"+this.neg().toString($);for(var V=i(c($,6),this.unsigned),ee=this,U="";;){var W=ee.div(V),X=ee.sub(W.mul(V)).toInt()>>>0,q=X.toString($);if(ee=W,ee.isZero())return q+U;for(;q.length<6;)q="0"+q;U=""+q+U}},C.getHighBits=function(){return this.high},C.getHighBitsUnsigned=function(){return this.high>>>0},C.getLowBits=function(){return this.low},C.getLowBitsUnsigned=function(){return this.low>>>0},C.getNumBitsAbs=function(){if(this.isNegative())return this.eq(K)?64:this.neg().getNumBitsAbs();for(var $=this.high!=0?this.high:this.low,z=31;z>0&&($&1<<z)==0;z--);return this.high!=0?z+33:z+1},C.isSafeInteger=function(){var $=this.high>>21;return $?this.unsigned?!1:$===-1&&!(this.low===0&&this.high===-2097152):!0},C.isZero=function(){return this.high===0&&this.low===0},C.eqz=C.isZero,C.isNegative=function(){return!this.unsigned&&this.high<0},C.isPositive=function(){return this.unsigned||this.high>=0},C.isOdd=function(){return(this.low&1)===1},C.isEven=function(){return(this.low&1)===0},C.equals=function($){return u($)||($=m($)),this.unsigned!==$.unsigned&&this.high>>>31===1&&$.high>>>31===1?!1:this.high===$.high&&this.low===$.low},C.eq=C.equals,C.notEquals=function($){return!this.eq($)},C.neq=C.notEquals,C.ne=C.notEquals,C.lessThan=function($){return this.comp($)<0},C.lt=C.lessThan,C.lessThanOrEqual=function($){return this.comp($)<=0},C.lte=C.lessThanOrEqual,C.le=C.lessThanOrEqual,C.greaterThan=function($){return this.comp($)>0},C.gt=C.greaterThan,C.greaterThanOrEqual=function($){return this.comp($)>=0},C.gte=C.greaterThanOrEqual,C.ge=C.greaterThanOrEqual,C.compare=function($){if(u($)||($=m($)),this.eq($))return 0;var z=this.isNegative(),G=$.isNegative();return z&&!G?-1:!z&&G?1:this.unsigned?$.high>>>0>this.high>>>0||$.high===this.high&&$.low>>>0>this.low>>>0?-1:1:this.sub($).isNegative()?-1:1},C.comp=C.compare,C.negate=function(){return!this.unsigned&&this.eq(K)?K:this.not().add(k)},C.neg=C.negate,C.add=function($){u($)||($=m($));var z=this.high>>>16,G=this.high&65535,re=this.low>>>16,V=this.low&65535,ee=$.high>>>16,U=$.high&65535,W=$.low>>>16,X=$.low&65535,q=0,le=0,Pe=0,xe=0;return xe+=V+X,Pe+=xe>>>16,xe&=65535,Pe+=re+W,le+=Pe>>>16,Pe&=65535,le+=G+U,q+=le>>>16,le&=65535,q+=z+ee,q&=65535,s(Pe<<16|xe,q<<16|le,this.unsigned)},C.subtract=function($){return u($)||($=m($)),this.add($.neg())},C.sub=C.subtract,C.multiply=function($){if(this.isZero())return this;if(u($)||($=m($)),a){var z=a.mul(this.low,this.high,$.low,$.high);return s(z,a.get_high(),this.unsigned)}if($.isZero())return this.unsigned?A:E;if(this.eq(K))return $.isOdd()?K:E;if($.eq(K))return this.isOdd()?K:E;if(this.isNegative())return $.isNegative()?this.neg().mul($.neg()):this.neg().mul($).neg();if($.isNegative())return this.mul($.neg()).neg();if(this.lt(O)&&$.lt(O))return i(this.toNumber()*$.toNumber(),this.unsigned);var G=this.high>>>16,re=this.high&65535,V=this.low>>>16,ee=this.low&65535,U=$.high>>>16,W=$.high&65535,X=$.low>>>16,q=$.low&65535,le=0,Pe=0,xe=0,tt=0;return tt+=ee*q,xe+=tt>>>16,tt&=65535,xe+=V*q,Pe+=xe>>>16,xe&=65535,xe+=ee*X,Pe+=xe>>>16,xe&=65535,Pe+=re*q,le+=Pe>>>16,Pe&=65535,Pe+=V*X,le+=Pe>>>16,Pe&=65535,Pe+=ee*W,le+=Pe>>>16,Pe&=65535,le+=G*q+re*X+V*W+ee*U,le&=65535,s(xe<<16|tt,le<<16|Pe,this.unsigned)},C.mul=C.multiply,C.divide=function($){if(u($)||($=m($)),$.isZero())throw Error("division by zero");if(a){if(!this.unsigned&&this.high===-2147483648&&$.low===-1&&$.high===-1)return this;var z=(this.unsigned?a.div_u:a.div_s)(this.low,this.high,$.low,$.high);return s(z,a.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?A:E;var G,re,V;if(this.unsigned){if($.unsigned||($=$.toUnsigned()),$.gt(this))return A;if($.gt(this.shru(1)))return T;V=A}else{if(this.eq(K)){if($.eq(k)||$.eq(M))return K;if($.eq(K))return k;var ee=this.shr(1);return G=ee.div($).shl(1),G.eq(E)?$.isNegative()?k:M:(re=this.sub($.mul(G)),V=G.add(re.div($)),V)}else if($.eq(K))return this.unsigned?A:E;if(this.isNegative())return $.isNegative()?this.neg().div($.neg()):this.neg().div($).neg();if($.isNegative())return this.div($.neg()).neg();V=E}for(re=this;re.gte($);){G=Math.max(1,Math.floor(re.toNumber()/$.toNumber()));for(var U=Math.ceil(Math.log(G)/Math.LN2),W=U<=48?1:c(2,U-48),X=i(G),q=X.mul($);q.isNegative()||q.gt(re);)G-=W,X=i(G,this.unsigned),q=X.mul($);X.isZero()&&(X=k),V=V.add(X),re=re.sub(q)}return V},C.div=C.divide,C.modulo=function($){if(u($)||($=m($)),a){var z=(this.unsigned?a.rem_u:a.rem_s)(this.low,this.high,$.low,$.high);return s(z,a.get_high(),this.unsigned)}return this.sub(this.div($).mul($))},C.mod=C.modulo,C.rem=C.modulo,C.not=function(){return s(~this.low,~this.high,this.unsigned)},C.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32},C.clz=C.countLeadingZeros,C.countTrailingZeros=function(){return this.low?d(this.low):d(this.high)+32},C.ctz=C.countTrailingZeros,C.and=function($){return u($)||($=m($)),s(this.low&$.low,this.high&$.high,this.unsigned)},C.or=function($){return u($)||($=m($)),s(this.low|$.low,this.high|$.high,this.unsigned)},C.xor=function($){return u($)||($=m($)),s(this.low^$.low,this.high^$.high,this.unsigned)},C.shiftLeft=function($){return u($)&&($=$.toInt()),($&=63)===0?this:$<32?s(this.low<<$,this.high<<$|this.low>>>32-$,this.unsigned):s(0,this.low<<$-32,this.unsigned)},C.shl=C.shiftLeft,C.shiftRight=function($){return u($)&&($=$.toInt()),($&=63)===0?this:$<32?s(this.low>>>$|this.high<<32-$,this.high>>$,this.unsigned):s(this.high>>$-32,this.high>=0?0:-1,this.unsigned)},C.shr=C.shiftRight,C.shiftRightUnsigned=function($){return u($)&&($=$.toInt()),($&=63)===0?this:$<32?s(this.low>>>$|this.high<<32-$,this.high>>>$,this.unsigned):$===32?s(this.high,0,this.unsigned):s(this.high>>>$-32,0,this.unsigned)},C.shru=C.shiftRightUnsigned,C.shr_u=C.shiftRightUnsigned,C.rotateLeft=function($){var z;return u($)&&($=$.toInt()),($&=63)===0?this:$===32?s(this.high,this.low,this.unsigned):$<32?(z=32-$,s(this.low<<$|this.high>>>z,this.high<<$|this.low>>>z,this.unsigned)):($-=32,z=32-$,s(this.high<<$|this.low>>>z,this.low<<$|this.high>>>z,this.unsigned))},C.rotl=C.rotateLeft,C.rotateRight=function($){var z;return u($)&&($=$.toInt()),($&=63)===0?this:$===32?s(this.high,this.low,this.unsigned):$<32?(z=32-$,s(this.high<<z|this.low>>>$,this.low<<z|this.high>>>$,this.unsigned)):($-=32,z=32-$,s(this.low<<z|this.high>>>$,this.high<<z|this.low>>>$,this.unsigned))},C.rotr=C.rotateRight,C.toSigned=function(){return this.unsigned?s(this.low,this.high,!1):this},C.toUnsigned=function(){return this.unsigned?this:s(this.low,this.high,!0)},C.toBytes=function($){return $?this.toBytesLE():this.toBytesBE()},C.toBytesLE=function(){var $=this.high,z=this.low;return[z&255,z>>>8&255,z>>>16&255,z>>>24,$&255,$>>>8&255,$>>>16&255,$>>>24]},C.toBytesBE=function(){var $=this.high,z=this.low;return[$>>>24,$>>>16&255,$>>>8&255,$&255,z>>>24,z>>>16&255,z>>>8&255,z&255]},l.fromBytes=function($,z,G){return G?l.fromBytesLE($,z):l.fromBytesBE($,z)},l.fromBytesLE=function($,z){return new l($[0]|$[1]<<8|$[2]<<16|$[3]<<24,$[4]|$[5]<<8|$[6]<<16|$[7]<<24,z)},l.fromBytesBE=function($,z){return new l($[4]<<24|$[5]<<16|$[6]<<8|$[7],$[0]<<24|$[1]<<16|$[2]<<8|$[3],z)},typeof BigInt=="function"&&(l.fromBigInt=function($,z){var G=Number(BigInt.asIntN(32,$)),re=Number(BigInt.asIntN(32,$>>BigInt(32)));return s(G,re,z)},l.fromValue=function($,z){return typeof $=="bigint"?l.fromBigInt($,z):m($,z)},C.toBigInt=function(){var $=BigInt(this.low>>>0),z=BigInt(this.unsigned?this.high>>>0:this.high);return z<<BigInt(32)|$});var R=n.default=l})}),Rr=ie(e=>{"use strict";var t=e;t.asPromise=n$(),t.base64=i$(),t.EventEmitter=o$(),t.float=s$(),t.inquire=a$(),t.utf8=u$(),t.pool=l$(),t.LongBits=d$();function n(u){return u==="__proto__"||u==="prototype"||u==="constructor"}t.isUnsafeProperty=n,t.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node),t.global=t.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||e,t.emptyArray=Object.freeze?Object.freeze([]):[],t.emptyObject=Object.freeze?Object.freeze({}):{},t.isInteger=Number.isInteger||function(u){return typeof u=="number"&&isFinite(u)&&Math.floor(u)===u},t.isString=function(u){return typeof u=="string"||u instanceof String},t.isObject=function(u){return u&&typeof u=="object"},t.isset=t.isSet=function(u,d){var p=u[d];return p!=null&&Object.hasOwnProperty.call(u,d)?typeof p!="object"||(Array.isArray(p)?p.length:Object.keys(p).length)>0:!1},t.Buffer=(function(){try{var u=t.global.Buffer;return u.prototype.utf8Write?u:null}catch{return null}})(),t._Buffer_from=null,t._Buffer_allocUnsafe=null,t.newBuffer=function(u){return typeof u=="number"?t.Buffer?t._Buffer_allocUnsafe(u):new t.Array(u):t.Buffer?t._Buffer_from(u):typeof Uint8Array>"u"?u:new Uint8Array(u)},t.Array=typeof Uint8Array<"u"?Uint8Array:Array,t.Long=t.global.dcodeIO&&t.global.dcodeIO.Long||t.global.Long||(function(){try{var u=p$();return u&&u.isLong?u:null}catch{return null}})(),t.key2Re=/^true|false|0|1$/,t.key32Re=/^-?(?:0|[1-9][0-9]*)$/,t.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/,t.longToHash=function(u){return u?t.LongBits.from(u).toHash():t.LongBits.zeroHash},t.longFromHash=function(u,d){var p=t.LongBits.fromHash(u);return t.Long?t.Long.fromBits(p.lo,p.hi,d):p.toNumber(!!d)};function a(u){var d=typeof arguments[arguments.length-1]=="boolean",p=d?arguments.length-1:arguments.length;d=d&&arguments[arguments.length-1];for(var o=1;o<p;++o){var r=arguments[o];if(r)for(var i=Object.keys(r),s=0;s<i.length;++s)!n(i[s])&&(u[i[s]]===void 0||!d)&&(u[i[s]]=r[i[s]])}return u}t.merge=a,t.nestingLimit=32,t.recursionLimit=100,t.makeProp=function(u,d){Object.defineProperty(u,d,{enumerable:!0,configurable:!0,writable:!0})},t.lcFirst=function(u){return u.charAt(0).toLowerCase()+u.substring(1)};function l(u){function d(p,o){if(!(this instanceof d))return new d(p,o);Object.defineProperty(this,"message",{get:function(){return p}}),Error.captureStackTrace?Error.captureStackTrace(this,d):Object.defineProperty(this,"stack",{value:new Error().stack||""}),o&&a(this,o)}return d.prototype=Object.create(Error.prototype,{constructor:{value:d,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return u},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),d}t.newError=l,t.ProtocolError=l("ProtocolError"),t.oneOfGetter=function(u){for(var d={},p=0;p<u.length;++p)d[u[p]]=1;return function(){for(var o=Object.keys(this),r=o.length-1;r>-1;--r)if(d[o[r]]===1&&this[o[r]]!==void 0&&this[o[r]]!==null)return o[r]}},t.oneOfSetter=function(u){return function(d){for(var p=0;p<u.length;++p)u[p]!==d&&delete this[u[p]]}},t.toJSONOptions={longs:String,enums:String,bytes:String,json:!0},t._configure=function(){var u=t.Buffer;if(!u){t._Buffer_from=t._Buffer_allocUnsafe=null;return}t._Buffer_from=u.from!==Uint8Array.from&&u.from||function(d,p){return new u(d,p)},t._Buffer_allocUnsafe=u.allocUnsafe||function(d){return new u(d)}}}),Cd=ie((e,t)=>{"use strict";t.exports=i;var n=Rr(),a,l=n.LongBits,u=n.base64,d=n.utf8;function p(_,I,O){this.fn=_,this.len=I,this.next=void 0,this.val=O}function o(){}function r(_){this.head=_.head,this.tail=_.tail,this.len=_.len,this.next=_.states}function i(){this.len=0,this.head=new p(o,0,0),this.tail=this.head,this.states=null}var s=function(){return n.Buffer?function(){return(i.create=function(){return new a})()}:function(){return new i}};i.create=s(),i.alloc=function(_){return new n.Array(_)},n.Array!==Array&&(i.alloc=n.pool(i.alloc,n.Array.prototype.subarray)),i.prototype._push=function(_,I,O){return this.tail=this.tail.next=new p(_,I,O),this.len+=I,this};function c(_,I,O){I[O]=_&255}function h(_,I,O){for(;_>127;)I[O++]=_&127|128,_>>>=7;I[O]=_}function m(_,I){this.len=_,this.next=void 0,this.val=I}m.prototype=Object.create(p.prototype),m.prototype.fn=h,i.prototype.uint32=function(_){return this.len+=(this.tail=this.tail.next=new m((_=_>>>0)<128?1:_<16384?2:_<2097152?3:_<268435456?4:5,_)).len,this},i.prototype.int32=function(_){return(_|=0)<0?this._push(b,10,l.fromNumber(_)):this.uint32(_)},i.prototype.sint32=function(_){return this.uint32((_<<1^_>>31)>>>0)};function b(_,I,O){for(var E=_.lo,A=_.hi;A;)I[O++]=E&127|128,E=(E>>>7|A<<25)>>>0,A>>>=7;for(;E>127;)I[O++]=E&127|128,E=E>>>7;I[O++]=E}i.prototype.uint64=function(_){var I=l.from(_);return this._push(b,I.length(),I)},i.prototype.int64=i.prototype.uint64,i.prototype.sint64=function(_){var I=l.from(_).zzEncode();return this._push(b,I.length(),I)},i.prototype.bool=function(_){return this._push(c,1,_?1:0)};function x(_,I,O){I[O]=_&255,I[O+1]=_>>>8&255,I[O+2]=_>>>16&255,I[O+3]=_>>>24}i.prototype.fixed32=function(_){return this._push(x,4,_>>>0)},i.prototype.sfixed32=i.prototype.fixed32,i.prototype.fixed64=function(_){var I=l.from(_);return this._push(x,4,I.lo)._push(x,4,I.hi)},i.prototype.sfixed64=i.prototype.fixed64,i.prototype.float=function(_){return this._push(n.float.writeFloatLE,4,_)},i.prototype.double=function(_){return this._push(n.float.writeDoubleLE,8,_)};var v=n.Array.prototype.set?function(_,I,O){I.set(_,O)}:function(_,I,O){for(var E=0;E<_.length;++E)I[O+E]=_[E]};i.prototype.bytes=function(_){var I=_.length>>>0;if(!I)return this._push(c,1,0);if(n.isString(_)){var O=i.alloc(I=u.length(_));u.decode(_,O,0),_=O}return this.uint32(I)._push(v,I,_)},i.prototype.string=function(_){var I=d.length(_);return I?this.uint32(I)._push(d.write,I,_):this._push(c,1,0)},i.prototype.fork=function(){return this.states=new r(this),this.head=this.tail=new p(o,0,0),this.len=0,this},i.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new p(o,0,0),this.len=0),this},i.prototype.ldelim=function(){var _=this.head,I=this.tail,O=this.len;return this.reset().uint32(O),O&&(this.tail.next=_.next,this.tail=I,this.len+=O),this},i.prototype.finish=function(){for(var _=this.head.next,I=this.constructor.alloc(this.len),O=0;_;)_.fn(_.val,I,O),O+=_.len,_=_.next;return I},i._configure=function(_){a=_,i.create=s(),a._configure()}}),c$=ie((e,t)=>{"use strict";t.exports=l;var n=Cd();(l.prototype=Object.create(n.prototype)).constructor=l;var a=Rr();function l(){n.call(this)}l._configure=function(){l.alloc=a._Buffer_allocUnsafe,l.writeBytesBuffer=a.Buffer&&a.Buffer.prototype instanceof Uint8Array&&a.Buffer.prototype.set.name==="set"?function(d,p,o){p.set(d,o)}:function(d,p,o){if(d.copy)d.copy(p,o,0,d.length);else for(var r=0;r<d.length;)p[o++]=d[r++]}},l.prototype.bytes=function(d){a.isString(d)&&(d=a._Buffer_from(d,"base64"));var p=d.length>>>0;return this.uint32(p),p&&this._push(l.writeBytesBuffer,p,d),this};function u(d,p,o){d.length<40?a.utf8.write(d,p,o):p.utf8Write?p.utf8Write(d,o):p.write(d,o)}l.prototype.string=function(d){var p=a.Buffer.byteLength(d);return this.uint32(p),p&&this._push(u,p,d),this},l._configure()}),zd=ie((e,t)=>{"use strict";t.exports=p;var n=Rr(),a,l=n.LongBits,u=n.utf8;function d(h,m){return RangeError("index out of range: "+h.pos+" + "+(m||1)+" > "+h.len)}function p(h){this.buf=h,this.pos=0,this.len=h.length}var o=typeof Uint8Array<"u"?function(h){if(h instanceof Uint8Array||Array.isArray(h))return new p(h);throw Error("illegal buffer")}:function(h){if(Array.isArray(h))return new p(h);throw Error("illegal buffer")},r=function(){return n.Buffer?function(h){return(p.create=function(m){return n.Buffer.isBuffer(m)?new a(m):o(m)})(h)}:o};p.create=r(),p.prototype._slice=n.Array.prototype.subarray||n.Array.prototype.slice,p.prototype.uint32=(function(){var h=4294967295;return function(){if(h=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(h=(h|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(h=(h|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(h=(h|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(h=(h|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return h;if((this.pos+=5)>this.len)throw this.pos=this.len,d(this,10);return h}})(),p.prototype.int32=function(){return this.uint32()|0},p.prototype.sint32=function(){var h=this.uint32();return h>>>1^-(h&1)|0};function i(){var h=new l(0,0),m=0;if(this.len-this.pos>4){for(;m<4;++m)if(h.lo=(h.lo|(this.buf[this.pos]&127)<<m*7)>>>0,this.buf[this.pos++]<128)return h;if(h.lo=(h.lo|(this.buf[this.pos]&127)<<28)>>>0,h.hi=(h.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return h;m=0}else{for(;m<3;++m){if(this.pos>=this.len)throw d(this);if(h.lo=(h.lo|(this.buf[this.pos]&127)<<m*7)>>>0,this.buf[this.pos++]<128)return h}return h.lo=(h.lo|(this.buf[this.pos++]&127)<<m*7)>>>0,h}if(this.len-this.pos>4){for(;m<5;++m)if(h.hi=(h.hi|(this.buf[this.pos]&127)<<m*7+3)>>>0,this.buf[this.pos++]<128)return h}else for(;m<5;++m){if(this.pos>=this.len)throw d(this);if(h.hi=(h.hi|(this.buf[this.pos]&127)<<m*7+3)>>>0,this.buf[this.pos++]<128)return h}throw Error("invalid varint encoding")}p.prototype.bool=function(){return this.uint32()!==0};function s(h,m){return(h[m-4]|h[m-3]<<8|h[m-2]<<16|h[m-1]<<24)>>>0}p.prototype.fixed32=function(){if(this.pos+4>this.len)throw d(this,4);return s(this.buf,this.pos+=4)},p.prototype.sfixed32=function(){if(this.pos+4>this.len)throw d(this,4);return s(this.buf,this.pos+=4)|0};function c(){if(this.pos+8>this.len)throw d(this,8);return new l(s(this.buf,this.pos+=4),s(this.buf,this.pos+=4))}p.prototype.float=function(){if(this.pos+4>this.len)throw d(this,4);var h=n.float.readFloatLE(this.buf,this.pos);return this.pos+=4,h},p.prototype.double=function(){if(this.pos+8>this.len)throw d(this,4);var h=n.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,h},p.prototype.bytes=function(){var h=this.uint32(),m=this.pos,b=this.pos+h;if(b>this.len)throw d(this,h);if(this.pos+=h,Array.isArray(this.buf))return this.buf.slice(m,b);if(m===b){var x=n.Buffer;return x?x.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,m,b)},p.prototype.string=function(){var h=this.bytes();return u.read(h,0,h.length)},p.prototype.skip=function(h){if(typeof h=="number"){if(this.pos+h>this.len)throw d(this,h);this.pos+=h}else do if(this.pos>=this.len)throw d(this);while(this.buf[this.pos++]&128);return this},p.recursionLimit=n.recursionLimit,p.prototype.skipType=function(h,m){if(m===void 0&&(m=0),m>p.recursionLimit)throw Error("maximum nesting depth exceeded");switch(h){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(h=this.uint32()&7)!==4;)this.skipType(h,m+1);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+h+" at offset "+this.pos)}return this},p._configure=function(h){a=h,p.create=r(),a._configure();var m=n.Long?"toLong":"toNumber";n.merge(p.prototype,{int64:function(){return i.call(this)[m](!1)},uint64:function(){return i.call(this)[m](!0)},sint64:function(){return i.call(this).zzDecode()[m](!1)},fixed64:function(){return c.call(this)[m](!0)},sfixed64:function(){return c.call(this)[m](!1)}})}}),h$=ie((e,t)=>{"use strict";t.exports=l;var n=zd();(l.prototype=Object.create(n.prototype)).constructor=l;var a=Rr();function l(u){n.call(this,u)}l._configure=function(){a.Buffer&&(l.prototype._slice=a.Buffer.prototype.slice)},l.prototype.string=function(){var u=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+u,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+u,this.len))},l._configure()}),f$=ie((e,t)=>{"use strict";t.exports=a;var n=Rr();(a.prototype=Object.create(n.EventEmitter.prototype)).constructor=a;function a(l,u,d){if(typeof l!="function")throw TypeError("rpcImpl must be a function");n.EventEmitter.call(this),this.rpcImpl=l,this.requestDelimited=!!u,this.responseDelimited=!!d}a.prototype.rpcCall=function l(u,d,p,o,r){if(!o)throw TypeError("request must be specified");var i=this;if(!r)return n.asPromise(l,i,u,d,p,o);if(!i.rpcImpl){setTimeout(function(){r(Error("already ended"))},0);return}try{return i.rpcImpl(u,d[i.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(s,c){if(s)return i.emit("error",s,u),r(s);if(c===null){i.end(!0);return}if(!(c instanceof p))try{c=p[i.responseDelimited?"decodeDelimited":"decode"](c)}catch(h){return i.emit("error",h,u),r(h)}return i.emit("data",c,u),r(null,c)})}catch(s){i.emit("error",s,u),setTimeout(function(){r(s)},0);return}},a.prototype.end=function(l){return this.rpcImpl&&(l||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}}),m$=ie(e=>{"use strict";var t=e;t.Service=f$()}),g$=ie((e,t)=>{"use strict";t.exports=Object.create(null)}),b$=ie(e=>{"use strict";var t=e;t.build="minimal",t.Writer=Cd(),t.BufferWriter=c$(),t.Reader=zd(),t.BufferReader=h$(),t.util=Rr(),t.rpc=m$(),t.roots=g$(),t.configure=n;function n(){t.util._configure(),t.Writer._configure(t.BufferWriter),t.Reader._configure(t.BufferReader)}n()}),y$=ie((e,t)=>{"use strict";t.exports=b$()}),Nn=ie((e,t)=>{"use strict";var n=y$(),a=n.Reader,l=n.Writer,u=n.util,d=n.roots.default||(n.roots.default={});d.onnx=(function(){var p={};return p.Version=(function(){var o={},r=Object.create(o);return r[o[0]="_START_VERSION"]=0,r[o[1]="IR_VERSION_2017_10_10"]=1,r[o[2]="IR_VERSION_2017_10_30"]=2,r[o[3]="IR_VERSION_2017_11_3"]=3,r[o[4]="IR_VERSION_2019_1_22"]=4,r[o[5]="IR_VERSION_2019_3_18"]=5,r[o[6]="IR_VERSION_2019_9_19"]=6,r[o[7]="IR_VERSION_2020_5_8"]=7,r[o[8]="IR_VERSION_2021_7_30"]=8,r[o[9]="IR_VERSION"]=9,r})(),p.AttributeProto=(function(){function o(r){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],r)for(var i=Object.keys(r),s=0;s<i.length;++s)r[i[s]]!=null&&(this[i[s]]=r[i[s]])}return o.prototype.name="",o.prototype.refAttrName="",o.prototype.docString="",o.prototype.type=0,o.prototype.f=0,o.prototype.i=u.Long?u.Long.fromBits(0,0,!1):0,o.prototype.s=u.newBuffer([]),o.prototype.t=null,o.prototype.g=null,o.prototype.sparseTensor=null,o.prototype.tp=null,o.prototype.floats=u.emptyArray,o.prototype.ints=u.emptyArray,o.prototype.strings=u.emptyArray,o.prototype.tensors=u.emptyArray,o.prototype.graphs=u.emptyArray,o.prototype.sparseTensors=u.emptyArray,o.prototype.typeProtos=u.emptyArray,o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=l.create()),r.name!=null&&Object.hasOwnProperty.call(r,"name")&&i.uint32(10).string(r.name),r.f!=null&&Object.hasOwnProperty.call(r,"f")&&i.uint32(21).float(r.f),r.i!=null&&Object.hasOwnProperty.call(r,"i")&&i.uint32(24).int64(r.i),r.s!=null&&Object.hasOwnProperty.call(r,"s")&&i.uint32(34).bytes(r.s),r.t!=null&&Object.hasOwnProperty.call(r,"t")&&d.onnx.TensorProto.encode(r.t,i.uint32(42).fork()).ldelim(),r.g!=null&&Object.hasOwnProperty.call(r,"g")&&d.onnx.GraphProto.encode(r.g,i.uint32(50).fork()).ldelim(),r.floats!=null&&r.floats.length){i.uint32(58).fork();for(var s=0;s<r.floats.length;++s)i.float(r.floats[s]);i.ldelim()}if(r.ints!=null&&r.ints.length){i.uint32(66).fork();for(var s=0;s<r.ints.length;++s)i.int64(r.ints[s]);i.ldelim()}if(r.strings!=null&&r.strings.length)for(var s=0;s<r.strings.length;++s)i.uint32(74).bytes(r.strings[s]);if(r.tensors!=null&&r.tensors.length)for(var s=0;s<r.tensors.length;++s)d.onnx.TensorProto.encode(r.tensors[s],i.uint32(82).fork()).ldelim();if(r.graphs!=null&&r.graphs.length)for(var s=0;s<r.graphs.length;++s)d.onnx.GraphProto.encode(r.graphs[s],i.uint32(90).fork()).ldelim();if(r.docString!=null&&Object.hasOwnProperty.call(r,"docString")&&i.uint32(106).string(r.docString),r.tp!=null&&Object.hasOwnProperty.call(r,"tp")&&d.onnx.TypeProto.encode(r.tp,i.uint32(114).fork()).ldelim(),r.typeProtos!=null&&r.typeProtos.length)for(var s=0;s<r.typeProtos.length;++s)d.onnx.TypeProto.encode(r.typeProtos[s],i.uint32(122).fork()).ldelim();if(r.type!=null&&Object.hasOwnProperty.call(r,"type")&&i.uint32(160).int32(r.type),r.refAttrName!=null&&Object.hasOwnProperty.call(r,"refAttrName")&&i.uint32(170).string(r.refAttrName),r.sparseTensor!=null&&Object.hasOwnProperty.call(r,"sparseTensor")&&d.onnx.SparseTensorProto.encode(r.sparseTensor,i.uint32(178).fork()).ldelim(),r.sparseTensors!=null&&r.sparseTensors.length)for(var s=0;s<r.sparseTensors.length;++s)d.onnx.SparseTensorProto.encode(r.sparseTensors[s],i.uint32(186).fork()).ldelim();return i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof a||(r=a.create(r));for(var s=i===void 0?r.len:r.pos+i,c=new d.onnx.AttributeProto;r.pos<s;){var h=r.uint32();switch(h>>>3){case 1:{c.name=r.string();break}case 21:{c.refAttrName=r.string();break}case 13:{c.docString=r.string();break}case 20:{c.type=r.int32();break}case 2:{c.f=r.float();break}case 3:{c.i=r.int64();break}case 4:{c.s=r.bytes();break}case 5:{c.t=d.onnx.TensorProto.decode(r,r.uint32());break}case 6:{c.g=d.onnx.GraphProto.decode(r,r.uint32());break}case 22:{c.sparseTensor=d.onnx.SparseTensorProto.decode(r,r.uint32());break}case 14:{c.tp=d.onnx.TypeProto.decode(r,r.uint32());break}case 7:{if(c.floats&&c.floats.length||(c.floats=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.floats.push(r.float());else c.floats.push(r.float());break}case 8:{if(c.ints&&c.ints.length||(c.ints=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.ints.push(r.int64());else c.ints.push(r.int64());break}case 9:{c.strings&&c.strings.length||(c.strings=[]),c.strings.push(r.bytes());break}case 10:{c.tensors&&c.tensors.length||(c.tensors=[]),c.tensors.push(d.onnx.TensorProto.decode(r,r.uint32()));break}case 11:{c.graphs&&c.graphs.length||(c.graphs=[]),c.graphs.push(d.onnx.GraphProto.decode(r,r.uint32()));break}case 23:{c.sparseTensors&&c.sparseTensors.length||(c.sparseTensors=[]),c.sparseTensors.push(d.onnx.SparseTensorProto.decode(r,r.uint32()));break}case 15:{c.typeProtos&&c.typeProtos.length||(c.typeProtos=[]),c.typeProtos.push(d.onnx.TypeProto.decode(r,r.uint32()));break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof a||(r=new a(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.name!=null&&r.hasOwnProperty("name")&&!u.isString(r.name))return"name: string expected";if(r.refAttrName!=null&&r.hasOwnProperty("refAttrName")&&!u.isString(r.refAttrName))return"refAttrName: string expected";if(r.docString!=null&&r.hasOwnProperty("docString")&&!u.isString(r.docString))return"docString: string expected";if(r.type!=null&&r.hasOwnProperty("type"))switch(r.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(r.f!=null&&r.hasOwnProperty("f")&&typeof r.f!="number")return"f: number expected";if(r.i!=null&&r.hasOwnProperty("i")&&!u.isInteger(r.i)&&!(r.i&&u.isInteger(r.i.low)&&u.isInteger(r.i.high)))return"i: integer|Long expected";if(r.s!=null&&r.hasOwnProperty("s")&&!(r.s&&typeof r.s.length=="number"||u.isString(r.s)))return"s: buffer expected";if(r.t!=null&&r.hasOwnProperty("t")){var i=d.onnx.TensorProto.verify(r.t);if(i)return"t."+i}if(r.g!=null&&r.hasOwnProperty("g")){var i=d.onnx.GraphProto.verify(r.g);if(i)return"g."+i}if(r.sparseTensor!=null&&r.hasOwnProperty("sparseTensor")){var i=d.onnx.SparseTensorProto.verify(r.sparseTensor);if(i)return"sparseTensor."+i}if(r.tp!=null&&r.hasOwnProperty("tp")){var i=d.onnx.TypeProto.verify(r.tp);if(i)return"tp."+i}if(r.floats!=null&&r.hasOwnProperty("floats")){if(!Array.isArray(r.floats))return"floats: array expected";for(var s=0;s<r.floats.length;++s)if(typeof r.floats[s]!="number")return"floats: number[] expected"}if(r.ints!=null&&r.hasOwnProperty("ints")){if(!Array.isArray(r.ints))return"ints: array expected";for(var s=0;s<r.ints.length;++s)if(!u.isInteger(r.ints[s])&&!(r.ints[s]&&u.isInteger(r.ints[s].low)&&u.isInteger(r.ints[s].high)))return"ints: integer|Long[] expected"}if(r.strings!=null&&r.hasOwnProperty("strings")){if(!Array.isArray(r.strings))return"strings: array expected";for(var s=0;s<r.strings.length;++s)if(!(r.strings[s]&&typeof r.strings[s].length=="number"||u.isString(r.strings[s])))return"strings: buffer[] expected"}if(r.tensors!=null&&r.hasOwnProperty("tensors")){if(!Array.isArray(r.tensors))return"tensors: array expected";for(var s=0;s<r.tensors.length;++s){var i=d.onnx.TensorProto.verify(r.tensors[s]);if(i)return"tensors."+i}}if(r.graphs!=null&&r.hasOwnProperty("graphs")){if(!Array.isArray(r.graphs))return"graphs: array expected";for(var s=0;s<r.graphs.length;++s){var i=d.onnx.GraphProto.verify(r.graphs[s]);if(i)return"graphs."+i}}if(r.sparseTensors!=null&&r.hasOwnProperty("sparseTensors")){if(!Array.isArray(r.sparseTensors))return"sparseTensors: array expected";for(var s=0;s<r.sparseTensors.length;++s){var i=d.onnx.SparseTensorProto.verify(r.sparseTensors[s]);if(i)return"sparseTensors."+i}}if(r.typeProtos!=null&&r.hasOwnProperty("typeProtos")){if(!Array.isArray(r.typeProtos))return"typeProtos: array expected";for(var s=0;s<r.typeProtos.length;++s){var i=d.onnx.TypeProto.verify(r.typeProtos[s]);if(i)return"typeProtos."+i}}return null},o.fromObject=function(r){if(r instanceof d.onnx.AttributeProto)return r;var i=new d.onnx.AttributeProto;switch(r.name!=null&&(i.name=String(r.name)),r.refAttrName!=null&&(i.refAttrName=String(r.refAttrName)),r.docString!=null&&(i.docString=String(r.docString)),r.type){default:if(typeof r.type=="number"){i.type=r.type;break}break;case"UNDEFINED":case 0:i.type=0;break;case"FLOAT":case 1:i.type=1;break;case"INT":case 2:i.type=2;break;case"STRING":case 3:i.type=3;break;case"TENSOR":case 4:i.type=4;break;case"GRAPH":case 5:i.type=5;break;case"SPARSE_TENSOR":case 11:i.type=11;break;case"TYPE_PROTO":case 13:i.type=13;break;case"FLOATS":case 6:i.type=6;break;case"INTS":case 7:i.type=7;break;case"STRINGS":case 8:i.type=8;break;case"TENSORS":case 9:i.type=9;break;case"GRAPHS":case 10:i.type=10;break;case"SPARSE_TENSORS":case 12:i.type=12;break;case"TYPE_PROTOS":case 14:i.type=14;break}if(r.f!=null&&(i.f=Number(r.f)),r.i!=null&&(u.Long?(i.i=u.Long.fromValue(r.i)).unsigned=!1:typeof r.i=="string"?i.i=parseInt(r.i,10):typeof r.i=="number"?i.i=r.i:typeof r.i=="object"&&(i.i=new u.LongBits(r.i.low>>>0,r.i.high>>>0).toNumber())),r.s!=null&&(typeof r.s=="string"?u.base64.decode(r.s,i.s=u.newBuffer(u.base64.length(r.s)),0):r.s.length>=0&&(i.s=r.s)),r.t!=null){if(typeof r.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");i.t=d.onnx.TensorProto.fromObject(r.t)}if(r.g!=null){if(typeof r.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");i.g=d.onnx.GraphProto.fromObject(r.g)}if(r.sparseTensor!=null){if(typeof r.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");i.sparseTensor=d.onnx.SparseTensorProto.fromObject(r.sparseTensor)}if(r.tp!=null){if(typeof r.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");i.tp=d.onnx.TypeProto.fromObject(r.tp)}if(r.floats){if(!Array.isArray(r.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");i.floats=[];for(var s=0;s<r.floats.length;++s)i.floats[s]=Number(r.floats[s])}if(r.ints){if(!Array.isArray(r.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");i.ints=[];for(var s=0;s<r.ints.length;++s)u.Long?(i.ints[s]=u.Long.fromValue(r.ints[s])).unsigned=!1:typeof r.ints[s]=="string"?i.ints[s]=parseInt(r.ints[s],10):typeof r.ints[s]=="number"?i.ints[s]=r.ints[s]:typeof r.ints[s]=="object"&&(i.ints[s]=new u.LongBits(r.ints[s].low>>>0,r.ints[s].high>>>0).toNumber())}if(r.strings){if(!Array.isArray(r.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");i.strings=[];for(var s=0;s<r.strings.length;++s)typeof r.strings[s]=="string"?u.base64.decode(r.strings[s],i.strings[s]=u.newBuffer(u.base64.length(r.strings[s])),0):r.strings[s].length>=0&&(i.strings[s]=r.strings[s])}if(r.tensors){if(!Array.isArray(r.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");i.tensors=[];for(var s=0;s<r.tensors.length;++s){if(typeof r.tensors[s]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");i.tensors[s]=d.onnx.TensorProto.fromObject(r.tensors[s])}}if(r.graphs){if(!Array.isArray(r.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");i.graphs=[];for(var s=0;s<r.graphs.length;++s){if(typeof r.graphs[s]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");i.graphs[s]=d.onnx.GraphProto.fromObject(r.graphs[s])}}if(r.sparseTensors){if(!Array.isArray(r.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");i.sparseTensors=[];for(var s=0;s<r.sparseTensors.length;++s){if(typeof r.sparseTensors[s]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");i.sparseTensors[s]=d.onnx.SparseTensorProto.fromObject(r.sparseTensors[s])}}if(r.typeProtos){if(!Array.isArray(r.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");i.typeProtos=[];for(var s=0;s<r.typeProtos.length;++s){if(typeof r.typeProtos[s]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");i.typeProtos[s]=d.onnx.TypeProto.fromObject(r.typeProtos[s])}}return i},o.toObject=function(r,i){i||(i={});var s={};if((i.arrays||i.defaults)&&(s.floats=[],s.ints=[],s.strings=[],s.tensors=[],s.graphs=[],s.typeProtos=[],s.sparseTensors=[]),i.defaults){if(s.name="",s.f=0,u.Long){var c=new u.Long(0,0,!1);s.i=i.longs===String?c.toString():i.longs===Number?c.toNumber():c}else s.i=i.longs===String?"0":0;i.bytes===String?s.s="":(s.s=[],i.bytes!==Array&&(s.s=u.newBuffer(s.s))),s.t=null,s.g=null,s.docString="",s.tp=null,s.type=i.enums===String?"UNDEFINED":0,s.refAttrName="",s.sparseTensor=null}if(r.name!=null&&r.hasOwnProperty("name")&&(s.name=r.name),r.f!=null&&r.hasOwnProperty("f")&&(s.f=i.json&&!isFinite(r.f)?String(r.f):r.f),r.i!=null&&r.hasOwnProperty("i")&&(typeof r.i=="number"?s.i=i.longs===String?String(r.i):r.i:s.i=i.longs===String?u.Long.prototype.toString.call(r.i):i.longs===Number?new u.LongBits(r.i.low>>>0,r.i.high>>>0).toNumber():r.i),r.s!=null&&r.hasOwnProperty("s")&&(s.s=i.bytes===String?u.base64.encode(r.s,0,r.s.length):i.bytes===Array?Array.prototype.slice.call(r.s):r.s),r.t!=null&&r.hasOwnProperty("t")&&(s.t=d.onnx.TensorProto.toObject(r.t,i)),r.g!=null&&r.hasOwnProperty("g")&&(s.g=d.onnx.GraphProto.toObject(r.g,i)),r.floats&&r.floats.length){s.floats=[];for(var h=0;h<r.floats.length;++h)s.floats[h]=i.json&&!isFinite(r.floats[h])?String(r.floats[h]):r.floats[h]}if(r.ints&&r.ints.length){s.ints=[];for(var h=0;h<r.ints.length;++h)typeof r.ints[h]=="number"?s.ints[h]=i.longs===String?String(r.ints[h]):r.ints[h]:s.ints[h]=i.longs===String?u.Long.prototype.toString.call(r.ints[h]):i.longs===Number?new u.LongBits(r.ints[h].low>>>0,r.ints[h].high>>>0).toNumber():r.ints[h]}if(r.strings&&r.strings.length){s.strings=[];for(var h=0;h<r.strings.length;++h)s.strings[h]=i.bytes===String?u.base64.encode(r.strings[h],0,r.strings[h].length):i.bytes===Array?Array.prototype.slice.call(r.strings[h]):r.strings[h]}if(r.tensors&&r.tensors.length){s.tensors=[];for(var h=0;h<r.tensors.length;++h)s.tensors[h]=d.onnx.TensorProto.toObject(r.tensors[h],i)}if(r.graphs&&r.graphs.length){s.graphs=[];for(var h=0;h<r.graphs.length;++h)s.graphs[h]=d.onnx.GraphProto.toObject(r.graphs[h],i)}if(r.docString!=null&&r.hasOwnProperty("docString")&&(s.docString=r.docString),r.tp!=null&&r.hasOwnProperty("tp")&&(s.tp=d.onnx.TypeProto.toObject(r.tp,i)),r.typeProtos&&r.typeProtos.length){s.typeProtos=[];for(var h=0;h<r.typeProtos.length;++h)s.typeProtos[h]=d.onnx.TypeProto.toObject(r.typeProtos[h],i)}if(r.type!=null&&r.hasOwnProperty("type")&&(s.type=i.enums===String?d.onnx.AttributeProto.AttributeType[r.type]===void 0?r.type:d.onnx.AttributeProto.AttributeType[r.type]:r.type),r.refAttrName!=null&&r.hasOwnProperty("refAttrName")&&(s.refAttrName=r.refAttrName),r.sparseTensor!=null&&r.hasOwnProperty("sparseTensor")&&(s.sparseTensor=d.onnx.SparseTensorProto.toObject(r.sparseTensor,i)),r.sparseTensors&&r.sparseTensors.length){s.sparseTensors=[];for(var h=0;h<r.sparseTensors.length;++h)s.sparseTensors[h]=d.onnx.SparseTensorProto.toObject(r.sparseTensors[h],i)}return s},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.AttributeProto"},o.AttributeType=(function(){var r={},i=Object.create(r);return i[r[0]="UNDEFINED"]=0,i[r[1]="FLOAT"]=1,i[r[2]="INT"]=2,i[r[3]="STRING"]=3,i[r[4]="TENSOR"]=4,i[r[5]="GRAPH"]=5,i[r[11]="SPARSE_TENSOR"]=11,i[r[13]="TYPE_PROTO"]=13,i[r[6]="FLOATS"]=6,i[r[7]="INTS"]=7,i[r[8]="STRINGS"]=8,i[r[9]="TENSORS"]=9,i[r[10]="GRAPHS"]=10,i[r[12]="SPARSE_TENSORS"]=12,i[r[14]="TYPE_PROTOS"]=14,i})(),o})(),p.ValueInfoProto=(function(){function o(r){if(r)for(var i=Object.keys(r),s=0;s<i.length;++s)r[i[s]]!=null&&(this[i[s]]=r[i[s]])}return o.prototype.name="",o.prototype.type=null,o.prototype.docString="",o.create=function(r){return new o(r)},o.encode=function(r,i){return i||(i=l.create()),r.name!=null&&Object.hasOwnProperty.call(r,"name")&&i.uint32(10).string(r.name),r.type!=null&&Object.hasOwnProperty.call(r,"type")&&d.onnx.TypeProto.encode(r.type,i.uint32(18).fork()).ldelim(),r.docString!=null&&Object.hasOwnProperty.call(r,"docString")&&i.uint32(26).string(r.docString),i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof a||(r=a.create(r));for(var s=i===void 0?r.len:r.pos+i,c=new d.onnx.ValueInfoProto;r.pos<s;){var h=r.uint32();switch(h>>>3){case 1:{c.name=r.string();break}case 2:{c.type=d.onnx.TypeProto.decode(r,r.uint32());break}case 3:{c.docString=r.string();break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof a||(r=new a(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.name!=null&&r.hasOwnProperty("name")&&!u.isString(r.name))return"name: string expected";if(r.type!=null&&r.hasOwnProperty("type")){var i=d.onnx.TypeProto.verify(r.type);if(i)return"type."+i}return r.docString!=null&&r.hasOwnProperty("docString")&&!u.isString(r.docString)?"docString: string expected":null},o.fromObject=function(r){if(r instanceof d.onnx.ValueInfoProto)return r;var i=new d.onnx.ValueInfoProto;if(r.name!=null&&(i.name=String(r.name)),r.type!=null){if(typeof r.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");i.type=d.onnx.TypeProto.fromObject(r.type)}return r.docString!=null&&(i.docString=String(r.docString)),i},o.toObject=function(r,i){i||(i={});var s={};return i.defaults&&(s.name="",s.type=null,s.docString=""),r.name!=null&&r.hasOwnProperty("name")&&(s.name=r.name),r.type!=null&&r.hasOwnProperty("type")&&(s.type=d.onnx.TypeProto.toObject(r.type,i)),r.docString!=null&&r.hasOwnProperty("docString")&&(s.docString=r.docString),s},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.ValueInfoProto"},o})(),p.NodeProto=(function(){function o(r){if(this.input=[],this.output=[],this.attribute=[],r)for(var i=Object.keys(r),s=0;s<i.length;++s)r[i[s]]!=null&&(this[i[s]]=r[i[s]])}return o.prototype.input=u.emptyArray,o.prototype.output=u.emptyArray,o.prototype.name="",o.prototype.opType="",o.prototype.domain="",o.prototype.attribute=u.emptyArray,o.prototype.docString="",o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=l.create()),r.input!=null&&r.input.length)for(var s=0;s<r.input.length;++s)i.uint32(10).string(r.input[s]);if(r.output!=null&&r.output.length)for(var s=0;s<r.output.length;++s)i.uint32(18).string(r.output[s]);if(r.name!=null&&Object.hasOwnProperty.call(r,"name")&&i.uint32(26).string(r.name),r.opType!=null&&Object.hasOwnProperty.call(r,"opType")&&i.uint32(34).string(r.opType),r.attribute!=null&&r.attribute.length)for(var s=0;s<r.attribute.length;++s)d.onnx.AttributeProto.encode(r.attribute[s],i.uint32(42).fork()).ldelim();return r.docString!=null&&Object.hasOwnProperty.call(r,"docString")&&i.uint32(50).string(r.docString),r.domain!=null&&Object.hasOwnProperty.call(r,"domain")&&i.uint32(58).string(r.domain),i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof a||(r=a.create(r));for(var s=i===void 0?r.len:r.pos+i,c=new d.onnx.NodeProto;r.pos<s;){var h=r.uint32();switch(h>>>3){case 1:{c.input&&c.input.length||(c.input=[]),c.input.push(r.string());break}case 2:{c.output&&c.output.length||(c.output=[]),c.output.push(r.string());break}case 3:{c.name=r.string();break}case 4:{c.opType=r.string();break}case 7:{c.domain=r.string();break}case 5:{c.attribute&&c.attribute.length||(c.attribute=[]),c.attribute.push(d.onnx.AttributeProto.decode(r,r.uint32()));break}case 6:{c.docString=r.string();break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof a||(r=new a(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.input!=null&&r.hasOwnProperty("input")){if(!Array.isArray(r.input))return"input: array expected";for(var i=0;i<r.input.length;++i)if(!u.isString(r.input[i]))return"input: string[] expected"}if(r.output!=null&&r.hasOwnProperty("output")){if(!Array.isArray(r.output))return"output: array expected";for(var i=0;i<r.output.length;++i)if(!u.isString(r.output[i]))return"output: string[] expected"}if(r.name!=null&&r.hasOwnProperty("name")&&!u.isString(r.name))return"name: string expected";if(r.opType!=null&&r.hasOwnProperty("opType")&&!u.isString(r.opType))return"opType: string expected";if(r.domain!=null&&r.hasOwnProperty("domain")&&!u.isString(r.domain))return"domain: string expected";if(r.attribute!=null&&r.hasOwnProperty("attribute")){if(!Array.isArray(r.attribute))return"attribute: array expected";for(var i=0;i<r.attribute.length;++i){var s=d.onnx.AttributeProto.verify(r.attribute[i]);if(s)return"attribute."+s}}return r.docString!=null&&r.hasOwnProperty("docString")&&!u.isString(r.docString)?"docString: string expected":null},o.fromObject=function(r){if(r instanceof d.onnx.NodeProto)return r;var i=new d.onnx.NodeProto;if(r.input){if(!Array.isArray(r.input))throw TypeError(".onnx.NodeProto.input: array expected");i.input=[];for(var s=0;s<r.input.length;++s)i.input[s]=String(r.input[s])}if(r.output){if(!Array.isArray(r.output))throw TypeError(".onnx.NodeProto.output: array expected");i.output=[];for(var s=0;s<r.output.length;++s)i.output[s]=String(r.output[s])}if(r.name!=null&&(i.name=String(r.name)),r.opType!=null&&(i.opType=String(r.opType)),r.domain!=null&&(i.domain=String(r.domain)),r.attribute){if(!Array.isArray(r.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");i.attribute=[];for(var s=0;s<r.attribute.length;++s){if(typeof r.attribute[s]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");i.attribute[s]=d.onnx.AttributeProto.fromObject(r.attribute[s])}}return r.docString!=null&&(i.docString=String(r.docString)),i},o.toObject=function(r,i){i||(i={});var s={};if((i.arrays||i.defaults)&&(s.input=[],s.output=[],s.attribute=[]),i.defaults&&(s.name="",s.opType="",s.docString="",s.domain=""),r.input&&r.input.length){s.input=[];for(var c=0;c<r.input.length;++c)s.input[c]=r.input[c]}if(r.output&&r.output.length){s.output=[];for(var c=0;c<r.output.length;++c)s.output[c]=r.output[c]}if(r.name!=null&&r.hasOwnProperty("name")&&(s.name=r.name),r.opType!=null&&r.hasOwnProperty("opType")&&(s.opType=r.opType),r.attribute&&r.attribute.length){s.attribute=[];for(var c=0;c<r.attribute.length;++c)s.attribute[c]=d.onnx.AttributeProto.toObject(r.attribute[c],i)}return r.docString!=null&&r.hasOwnProperty("docString")&&(s.docString=r.docString),r.domain!=null&&r.hasOwnProperty("domain")&&(s.domain=r.domain),s},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.NodeProto"},o})(),p.TrainingInfoProto=(function(){function o(r){if(this.initializationBinding=[],this.updateBinding=[],r)for(var i=Object.keys(r),s=0;s<i.length;++s)r[i[s]]!=null&&(this[i[s]]=r[i[s]])}return o.prototype.initialization=null,o.prototype.algorithm=null,o.prototype.initializationBinding=u.emptyArray,o.prototype.updateBinding=u.emptyArray,o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=l.create()),r.initialization!=null&&Object.hasOwnProperty.call(r,"initialization")&&d.onnx.GraphProto.encode(r.initialization,i.uint32(10).fork()).ldelim(),r.algorithm!=null&&Object.hasOwnProperty.call(r,"algorithm")&&d.onnx.GraphProto.encode(r.algorithm,i.uint32(18).fork()).ldelim(),r.initializationBinding!=null&&r.initializationBinding.length)for(var s=0;s<r.initializationBinding.length;++s)d.onnx.StringStringEntryProto.encode(r.initializationBinding[s],i.uint32(26).fork()).ldelim();if(r.updateBinding!=null&&r.updateBinding.length)for(var s=0;s<r.updateBinding.length;++s)d.onnx.StringStringEntryProto.encode(r.updateBinding[s],i.uint32(34).fork()).ldelim();return i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof a||(r=a.create(r));for(var s=i===void 0?r.len:r.pos+i,c=new d.onnx.TrainingInfoProto;r.pos<s;){var h=r.uint32();switch(h>>>3){case 1:{c.initialization=d.onnx.GraphProto.decode(r,r.uint32());break}case 2:{c.algorithm=d.onnx.GraphProto.decode(r,r.uint32());break}case 3:{c.initializationBinding&&c.initializationBinding.length||(c.initializationBinding=[]),c.initializationBinding.push(d.onnx.StringStringEntryProto.decode(r,r.uint32()));break}case 4:{c.updateBinding&&c.updateBinding.length||(c.updateBinding=[]),c.updateBinding.push(d.onnx.StringStringEntryProto.decode(r,r.uint32()));break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof a||(r=new a(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.initialization!=null&&r.hasOwnProperty("initialization")){var i=d.onnx.GraphProto.verify(r.initialization);if(i)return"initialization."+i}if(r.algorithm!=null&&r.hasOwnProperty("algorithm")){var i=d.onnx.GraphProto.verify(r.algorithm);if(i)return"algorithm."+i}if(r.initializationBinding!=null&&r.hasOwnProperty("initializationBinding")){if(!Array.isArray(r.initializationBinding))return"initializationBinding: array expected";for(var s=0;s<r.initializationBinding.length;++s){var i=d.onnx.StringStringEntryProto.verify(r.initializationBinding[s]);if(i)return"initializationBinding."+i}}if(r.updateBinding!=null&&r.hasOwnProperty("updateBinding")){if(!Array.isArray(r.updateBinding))return"updateBinding: array expected";for(var s=0;s<r.updateBinding.length;++s){var i=d.onnx.StringStringEntryProto.verify(r.updateBinding[s]);if(i)return"updateBinding."+i}}return null},o.fromObject=function(r){if(r instanceof d.onnx.TrainingInfoProto)return r;var i=new d.onnx.TrainingInfoProto;if(r.initialization!=null){if(typeof r.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");i.initialization=d.onnx.GraphProto.fromObject(r.initialization)}if(r.algorithm!=null){if(typeof r.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");i.algorithm=d.onnx.GraphProto.fromObject(r.algorithm)}if(r.initializationBinding){if(!Array.isArray(r.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");i.initializationBinding=[];for(var s=0;s<r.initializationBinding.length;++s){if(typeof r.initializationBinding[s]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");i.initializationBinding[s]=d.onnx.StringStringEntryProto.fromObject(r.initializationBinding[s])}}if(r.updateBinding){if(!Array.isArray(r.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");i.updateBinding=[];for(var s=0;s<r.updateBinding.length;++s){if(typeof r.updateBinding[s]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");i.updateBinding[s]=d.onnx.StringStringEntryProto.fromObject(r.updateBinding[s])}}return i},o.toObject=function(r,i){i||(i={});var s={};if((i.arrays||i.defaults)&&(s.initializationBinding=[],s.updateBinding=[]),i.defaults&&(s.initialization=null,s.algorithm=null),r.initialization!=null&&r.hasOwnProperty("initialization")&&(s.initialization=d.onnx.GraphProto.toObject(r.initialization,i)),r.algorithm!=null&&r.hasOwnProperty("algorithm")&&(s.algorithm=d.onnx.GraphProto.toObject(r.algorithm,i)),r.initializationBinding&&r.initializationBinding.length){s.initializationBinding=[];for(var c=0;c<r.initializationBinding.length;++c)s.initializationBinding[c]=d.onnx.StringStringEntryProto.toObject(r.initializationBinding[c],i)}if(r.updateBinding&&r.updateBinding.length){s.updateBinding=[];for(var c=0;c<r.updateBinding.length;++c)s.updateBinding[c]=d.onnx.StringStringEntryProto.toObject(r.updateBinding[c],i)}return s},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.TrainingInfoProto"},o})(),p.ModelProto=(function(){function o(r){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],r)for(var i=Object.keys(r),s=0;s<i.length;++s)r[i[s]]!=null&&(this[i[s]]=r[i[s]])}return o.prototype.irVersion=u.Long?u.Long.fromBits(0,0,!1):0,o.prototype.opsetImport=u.emptyArray,o.prototype.producerName="",o.prototype.producerVersion="",o.prototype.domain="",o.prototype.modelVersion=u.Long?u.Long.fromBits(0,0,!1):0,o.prototype.docString="",o.prototype.graph=null,o.prototype.metadataProps=u.emptyArray,o.prototype.trainingInfo=u.emptyArray,o.prototype.functions=u.emptyArray,o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=l.create()),r.irVersion!=null&&Object.hasOwnProperty.call(r,"irVersion")&&i.uint32(8).int64(r.irVersion),r.producerName!=null&&Object.hasOwnProperty.call(r,"producerName")&&i.uint32(18).string(r.producerName),r.producerVersion!=null&&Object.hasOwnProperty.call(r,"producerVersion")&&i.uint32(26).string(r.producerVersion),r.domain!=null&&Object.hasOwnProperty.call(r,"domain")&&i.uint32(34).string(r.domain),r.modelVersion!=null&&Object.hasOwnProperty.call(r,"modelVersion")&&i.uint32(40).int64(r.modelVersion),r.docString!=null&&Object.hasOwnProperty.call(r,"docString")&&i.uint32(50).string(r.docString),r.graph!=null&&Object.hasOwnProperty.call(r,"graph")&&d.onnx.GraphProto.encode(r.graph,i.uint32(58).fork()).ldelim(),r.opsetImport!=null&&r.opsetImport.length)for(var s=0;s<r.opsetImport.length;++s)d.onnx.OperatorSetIdProto.encode(r.opsetImport[s],i.uint32(66).fork()).ldelim();if(r.metadataProps!=null&&r.metadataProps.length)for(var s=0;s<r.metadataProps.length;++s)d.onnx.StringStringEntryProto.encode(r.metadataProps[s],i.uint32(114).fork()).ldelim();if(r.trainingInfo!=null&&r.trainingInfo.length)for(var s=0;s<r.trainingInfo.length;++s)d.onnx.TrainingInfoProto.encode(r.trainingInfo[s],i.uint32(162).fork()).ldelim();if(r.functions!=null&&r.functions.length)for(var s=0;s<r.functions.length;++s)d.onnx.FunctionProto.encode(r.functions[s],i.uint32(202).fork()).ldelim();return i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof a||(r=a.create(r));for(var s=i===void 0?r.len:r.pos+i,c=new d.onnx.ModelProto;r.pos<s;){var h=r.uint32();switch(h>>>3){case 1:{c.irVersion=r.int64();break}case 8:{c.opsetImport&&c.opsetImport.length||(c.opsetImport=[]),c.opsetImport.push(d.onnx.OperatorSetIdProto.decode(r,r.uint32()));break}case 2:{c.producerName=r.string();break}case 3:{c.producerVersion=r.string();break}case 4:{c.domain=r.string();break}case 5:{c.modelVersion=r.int64();break}case 6:{c.docString=r.string();break}case 7:{c.graph=d.onnx.GraphProto.decode(r,r.uint32());break}case 14:{c.metadataProps&&c.metadataProps.length||(c.metadataProps=[]),c.metadataProps.push(d.onnx.StringStringEntryProto.decode(r,r.uint32()));break}case 20:{c.trainingInfo&&c.trainingInfo.length||(c.trainingInfo=[]),c.trainingInfo.push(d.onnx.TrainingInfoProto.decode(r,r.uint32()));break}case 25:{c.functions&&c.functions.length||(c.functions=[]),c.functions.push(d.onnx.FunctionProto.decode(r,r.uint32()));break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof a||(r=new a(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.irVersion!=null&&r.hasOwnProperty("irVersion")&&!u.isInteger(r.irVersion)&&!(r.irVersion&&u.isInteger(r.irVersion.low)&&u.isInteger(r.irVersion.high)))return"irVersion: integer|Long expected";if(r.opsetImport!=null&&r.hasOwnProperty("opsetImport")){if(!Array.isArray(r.opsetImport))return"opsetImport: array expected";for(var i=0;i<r.opsetImport.length;++i){var s=d.onnx.OperatorSetIdProto.verify(r.opsetImport[i]);if(s)return"opsetImport."+s}}if(r.producerName!=null&&r.hasOwnProperty("producerName")&&!u.isString(r.producerName))return"producerName: string expected";if(r.producerVersion!=null&&r.hasOwnProperty("producerVersion")&&!u.isString(r.producerVersion))return"producerVersion: string expected";if(r.domain!=null&&r.hasOwnProperty("domain")&&!u.isString(r.domain))return"domain: string expected";if(r.modelVersion!=null&&r.hasOwnProperty("modelVersion")&&!u.isInteger(r.modelVersion)&&!(r.modelVersion&&u.isInteger(r.modelVersion.low)&&u.isInteger(r.modelVersion.high)))return"modelVersion: integer|Long expected";if(r.docString!=null&&r.hasOwnProperty("docString")&&!u.isString(r.docString))return"docString: string expected";if(r.graph!=null&&r.hasOwnProperty("graph")){var s=d.onnx.GraphProto.verify(r.graph);if(s)return"graph."+s}if(r.metadataProps!=null&&r.hasOwnProperty("metadataProps")){if(!Array.isArray(r.metadataProps))return"metadataProps: array expected";for(var i=0;i<r.metadataProps.length;++i){var s=d.onnx.StringStringEntryProto.verify(r.metadataProps[i]);if(s)return"metadataProps."+s}}if(r.trainingInfo!=null&&r.hasOwnProperty("trainingInfo")){if(!Array.isArray(r.trainingInfo))return"trainingInfo: array expected";for(var i=0;i<r.trainingInfo.length;++i){var s=d.onnx.TrainingInfoProto.verify(r.trainingInfo[i]);if(s)return"trainingInfo."+s}}if(r.functions!=null&&r.hasOwnProperty("functions")){if(!Array.isArray(r.functions))return"functions: array expected";for(var i=0;i<r.functions.length;++i){var s=d.onnx.FunctionProto.verify(r.functions[i]);if(s)return"functions."+s}}return null},o.fromObject=function(r){if(r instanceof d.onnx.ModelProto)return r;var i=new d.onnx.ModelProto;if(r.irVersion!=null&&(u.Long?(i.irVersion=u.Long.fromValue(r.irVersion)).unsigned=!1:typeof r.irVersion=="string"?i.irVersion=parseInt(r.irVersion,10):typeof r.irVersion=="number"?i.irVersion=r.irVersion:typeof r.irVersion=="object"&&(i.irVersion=new u.LongBits(r.irVersion.low>>>0,r.irVersion.high>>>0).toNumber())),r.opsetImport){if(!Array.isArray(r.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");i.opsetImport=[];for(var s=0;s<r.opsetImport.length;++s){if(typeof r.opsetImport[s]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");i.opsetImport[s]=d.onnx.OperatorSetIdProto.fromObject(r.opsetImport[s])}}if(r.producerName!=null&&(i.producerName=String(r.producerName)),r.producerVersion!=null&&(i.producerVersion=String(r.producerVersion)),r.domain!=null&&(i.domain=String(r.domain)),r.modelVersion!=null&&(u.Long?(i.modelVersion=u.Long.fromValue(r.modelVersion)).unsigned=!1:typeof r.modelVersion=="string"?i.modelVersion=parseInt(r.modelVersion,10):typeof r.modelVersion=="number"?i.modelVersion=r.modelVersion:typeof r.modelVersion=="object"&&(i.modelVersion=new u.LongBits(r.modelVersion.low>>>0,r.modelVersion.high>>>0).toNumber())),r.docString!=null&&(i.docString=String(r.docString)),r.graph!=null){if(typeof r.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");i.graph=d.onnx.GraphProto.fromObject(r.graph)}if(r.metadataProps){if(!Array.isArray(r.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");i.metadataProps=[];for(var s=0;s<r.metadataProps.length;++s){if(typeof r.metadataProps[s]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");i.metadataProps[s]=d.onnx.StringStringEntryProto.fromObject(r.metadataProps[s])}}if(r.trainingInfo){if(!Array.isArray(r.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");i.trainingInfo=[];for(var s=0;s<r.trainingInfo.length;++s){if(typeof r.trainingInfo[s]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");i.trainingInfo[s]=d.onnx.TrainingInfoProto.fromObject(r.trainingInfo[s])}}if(r.functions){if(!Array.isArray(r.functions))throw TypeError(".onnx.ModelProto.functions: array expected");i.functions=[];for(var s=0;s<r.functions.length;++s){if(typeof r.functions[s]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");i.functions[s]=d.onnx.FunctionProto.fromObject(r.functions[s])}}return i},o.toObject=function(r,i){i||(i={});var s={};if((i.arrays||i.defaults)&&(s.opsetImport=[],s.metadataProps=[],s.trainingInfo=[],s.functions=[]),i.defaults){if(u.Long){var c=new u.Long(0,0,!1);s.irVersion=i.longs===String?c.toString():i.longs===Number?c.toNumber():c}else s.irVersion=i.longs===String?"0":0;if(s.producerName="",s.producerVersion="",s.domain="",u.Long){var c=new u.Long(0,0,!1);s.modelVersion=i.longs===String?c.toString():i.longs===Number?c.toNumber():c}else s.modelVersion=i.longs===String?"0":0;s.docString="",s.graph=null}if(r.irVersion!=null&&r.hasOwnProperty("irVersion")&&(typeof r.irVersion=="number"?s.irVersion=i.longs===String?String(r.irVersion):r.irVersion:s.irVersion=i.longs===String?u.Long.prototype.toString.call(r.irVersion):i.longs===Number?new u.LongBits(r.irVersion.low>>>0,r.irVersion.high>>>0).toNumber():r.irVersion),r.producerName!=null&&r.hasOwnProperty("producerName")&&(s.producerName=r.producerName),r.producerVersion!=null&&r.hasOwnProperty("producerVersion")&&(s.producerVersion=r.producerVersion),r.domain!=null&&r.hasOwnProperty("domain")&&(s.domain=r.domain),r.modelVersion!=null&&r.hasOwnProperty("modelVersion")&&(typeof r.modelVersion=="number"?s.modelVersion=i.longs===String?String(r.modelVersion):r.modelVersion:s.modelVersion=i.longs===String?u.Long.prototype.toString.call(r.modelVersion):i.longs===Number?new u.LongBits(r.modelVersion.low>>>0,r.modelVersion.high>>>0).toNumber():r.modelVersion),r.docString!=null&&r.hasOwnProperty("docString")&&(s.docString=r.docString),r.graph!=null&&r.hasOwnProperty("graph")&&(s.graph=d.onnx.GraphProto.toObject(r.graph,i)),r.opsetImport&&r.opsetImport.length){s.opsetImport=[];for(var h=0;h<r.opsetImport.length;++h)s.opsetImport[h]=d.onnx.OperatorSetIdProto.toObject(r.opsetImport[h],i)}if(r.metadataProps&&r.metadataProps.length){s.metadataProps=[];for(var h=0;h<r.metadataProps.length;++h)s.metadataProps[h]=d.onnx.StringStringEntryProto.toObject(r.metadataProps[h],i)}if(r.trainingInfo&&r.trainingInfo.length){s.trainingInfo=[];for(var h=0;h<r.trainingInfo.length;++h)s.trainingInfo[h]=d.onnx.TrainingInfoProto.toObject(r.trainingInfo[h],i)}if(r.functions&&r.functions.length){s.functions=[];for(var h=0;h<r.functions.length;++h)s.functions[h]=d.onnx.FunctionProto.toObject(r.functions[h],i)}return s},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.ModelProto"},o})(),p.StringStringEntryProto=(function(){function o(r){if(r)for(var i=Object.keys(r),s=0;s<i.length;++s)r[i[s]]!=null&&(this[i[s]]=r[i[s]])}return o.prototype.key="",o.prototype.value="",o.create=function(r){return new o(r)},o.encode=function(r,i){return i||(i=l.create()),r.key!=null&&Object.hasOwnProperty.call(r,"key")&&i.uint32(10).string(r.key),r.value!=null&&Object.hasOwnProperty.call(r,"value")&&i.uint32(18).string(r.value),i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof a||(r=a.create(r));for(var s=i===void 0?r.len:r.pos+i,c=new d.onnx.StringStringEntryProto;r.pos<s;){var h=r.uint32();switch(h>>>3){case 1:{c.key=r.string();break}case 2:{c.value=r.string();break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof a||(r=new a(r)),this.decode(r,r.uint32())},o.verify=function(r){return typeof r!="object"||r===null?"object expected":r.key!=null&&r.hasOwnProperty("key")&&!u.isString(r.key)?"key: string expected":r.value!=null&&r.hasOwnProperty("value")&&!u.isString(r.value)?"value: string expected":null},o.fromObject=function(r){if(r instanceof d.onnx.StringStringEntryProto)return r;var i=new d.onnx.StringStringEntryProto;return r.key!=null&&(i.key=String(r.key)),r.value!=null&&(i.value=String(r.value)),i},o.toObject=function(r,i){i||(i={});var s={};return i.defaults&&(s.key="",s.value=""),r.key!=null&&r.hasOwnProperty("key")&&(s.key=r.key),r.value!=null&&r.hasOwnProperty("value")&&(s.value=r.value),s},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.StringStringEntryProto"},o})(),p.TensorAnnotation=(function(){function o(r){if(this.quantParameterTensorNames=[],r)for(var i=Object.keys(r),s=0;s<i.length;++s)r[i[s]]!=null&&(this[i[s]]=r[i[s]])}return o.prototype.tensorName="",o.prototype.quantParameterTensorNames=u.emptyArray,o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=l.create()),r.tensorName!=null&&Object.hasOwnProperty.call(r,"tensorName")&&i.uint32(10).string(r.tensorName),r.quantParameterTensorNames!=null&&r.quantParameterTensorNames.length)for(var s=0;s<r.quantParameterTensorNames.length;++s)d.onnx.StringStringEntryProto.encode(r.quantParameterTensorNames[s],i.uint32(18).fork()).ldelim();return i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof a||(r=a.create(r));for(var s=i===void 0?r.len:r.pos+i,c=new d.onnx.TensorAnnotation;r.pos<s;){var h=r.uint32();switch(h>>>3){case 1:{c.tensorName=r.string();break}case 2:{c.quantParameterTensorNames&&c.quantParameterTensorNames.length||(c.quantParameterTensorNames=[]),c.quantParameterTensorNames.push(d.onnx.StringStringEntryProto.decode(r,r.uint32()));break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof a||(r=new a(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.tensorName!=null&&r.hasOwnProperty("tensorName")&&!u.isString(r.tensorName))return"tensorName: string expected";if(r.quantParameterTensorNames!=null&&r.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(r.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var i=0;i<r.quantParameterTensorNames.length;++i){var s=d.onnx.StringStringEntryProto.verify(r.quantParameterTensorNames[i]);if(s)return"quantParameterTensorNames."+s}}return null},o.fromObject=function(r){if(r instanceof d.onnx.TensorAnnotation)return r;var i=new d.onnx.TensorAnnotation;if(r.tensorName!=null&&(i.tensorName=String(r.tensorName)),r.quantParameterTensorNames){if(!Array.isArray(r.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");i.quantParameterTensorNames=[];for(var s=0;s<r.quantParameterTensorNames.length;++s){if(typeof r.quantParameterTensorNames[s]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");i.quantParameterTensorNames[s]=d.onnx.StringStringEntryProto.fromObject(r.quantParameterTensorNames[s])}}return i},o.toObject=function(r,i){i||(i={});var s={};if((i.arrays||i.defaults)&&(s.quantParameterTensorNames=[]),i.defaults&&(s.tensorName=""),r.tensorName!=null&&r.hasOwnProperty("tensorName")&&(s.tensorName=r.tensorName),r.quantParameterTensorNames&&r.quantParameterTensorNames.length){s.quantParameterTensorNames=[];for(var c=0;c<r.quantParameterTensorNames.length;++c)s.quantParameterTensorNames[c]=d.onnx.StringStringEntryProto.toObject(r.quantParameterTensorNames[c],i)}return s},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.TensorAnnotation"},o})(),p.GraphProto=(function(){function o(r){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],r)for(var i=Object.keys(r),s=0;s<i.length;++s)r[i[s]]!=null&&(this[i[s]]=r[i[s]])}return o.prototype.node=u.emptyArray,o.prototype.name="",o.prototype.initializer=u.emptyArray,o.prototype.sparseInitializer=u.emptyArray,o.prototype.docString="",o.prototype.input=u.emptyArray,o.prototype.output=u.emptyArray,o.prototype.valueInfo=u.emptyArray,o.prototype.quantizationAnnotation=u.emptyArray,o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=l.create()),r.node!=null&&r.node.length)for(var s=0;s<r.node.length;++s)d.onnx.NodeProto.encode(r.node[s],i.uint32(10).fork()).ldelim();if(r.name!=null&&Object.hasOwnProperty.call(r,"name")&&i.uint32(18).string(r.name),r.initializer!=null&&r.initializer.length)for(var s=0;s<r.initializer.length;++s)d.onnx.TensorProto.encode(r.initializer[s],i.uint32(42).fork()).ldelim();if(r.docString!=null&&Object.hasOwnProperty.call(r,"docString")&&i.uint32(82).string(r.docString),r.input!=null&&r.input.length)for(var s=0;s<r.input.length;++s)d.onnx.ValueInfoProto.encode(r.input[s],i.uint32(90).fork()).ldelim();if(r.output!=null&&r.output.length)for(var s=0;s<r.output.length;++s)d.onnx.ValueInfoProto.encode(r.output[s],i.uint32(98).fork()).ldelim();if(r.valueInfo!=null&&r.valueInfo.length)for(var s=0;s<r.valueInfo.length;++s)d.onnx.ValueInfoProto.encode(r.valueInfo[s],i.uint32(106).fork()).ldelim();if(r.quantizationAnnotation!=null&&r.quantizationAnnotation.length)for(var s=0;s<r.quantizationAnnotation.length;++s)d.onnx.TensorAnnotation.encode(r.quantizationAnnotation[s],i.uint32(114).fork()).ldelim();if(r.sparseInitializer!=null&&r.sparseInitializer.length)for(var s=0;s<r.sparseInitializer.length;++s)d.onnx.SparseTensorProto.encode(r.sparseInitializer[s],i.uint32(122).fork()).ldelim();return i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof a||(r=a.create(r));for(var s=i===void 0?r.len:r.pos+i,c=new d.onnx.GraphProto;r.pos<s;){var h=r.uint32();switch(h>>>3){case 1:{c.node&&c.node.length||(c.node=[]),c.node.push(d.onnx.NodeProto.decode(r,r.uint32()));break}case 2:{c.name=r.string();break}case 5:{c.initializer&&c.initializer.length||(c.initializer=[]),c.initializer.push(d.onnx.TensorProto.decode(r,r.uint32()));break}case 15:{c.sparseInitializer&&c.sparseInitializer.length||(c.sparseInitializer=[]),c.sparseInitializer.push(d.onnx.SparseTensorProto.decode(r,r.uint32()));break}case 10:{c.docString=r.string();break}case 11:{c.input&&c.input.length||(c.input=[]),c.input.push(d.onnx.ValueInfoProto.decode(r,r.uint32()));break}case 12:{c.output&&c.output.length||(c.output=[]),c.output.push(d.onnx.ValueInfoProto.decode(r,r.uint32()));break}case 13:{c.valueInfo&&c.valueInfo.length||(c.valueInfo=[]),c.valueInfo.push(d.onnx.ValueInfoProto.decode(r,r.uint32()));break}case 14:{c.quantizationAnnotation&&c.quantizationAnnotation.length||(c.quantizationAnnotation=[]),c.quantizationAnnotation.push(d.onnx.TensorAnnotation.decode(r,r.uint32()));break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof a||(r=new a(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.node!=null&&r.hasOwnProperty("node")){if(!Array.isArray(r.node))return"node: array expected";for(var i=0;i<r.node.length;++i){var s=d.onnx.NodeProto.verify(r.node[i]);if(s)return"node."+s}}if(r.name!=null&&r.hasOwnProperty("name")&&!u.isString(r.name))return"name: string expected";if(r.initializer!=null&&r.hasOwnProperty("initializer")){if(!Array.isArray(r.initializer))return"initializer: array expected";for(var i=0;i<r.initializer.length;++i){var s=d.onnx.TensorProto.verify(r.initializer[i]);if(s)return"initializer."+s}}if(r.sparseInitializer!=null&&r.hasOwnProperty("sparseInitializer")){if(!Array.isArray(r.sparseInitializer))return"sparseInitializer: array expected";for(var i=0;i<r.sparseInitializer.length;++i){var s=d.onnx.SparseTensorProto.verify(r.sparseInitializer[i]);if(s)return"sparseInitializer."+s}}if(r.docString!=null&&r.hasOwnProperty("docString")&&!u.isString(r.docString))return"docString: string expected";if(r.input!=null&&r.hasOwnProperty("input")){if(!Array.isArray(r.input))return"input: array expected";for(var i=0;i<r.input.length;++i){var s=d.onnx.ValueInfoProto.verify(r.input[i]);if(s)return"input."+s}}if(r.output!=null&&r.hasOwnProperty("output")){if(!Array.isArray(r.output))return"output: array expected";for(var i=0;i<r.output.length;++i){var s=d.onnx.ValueInfoProto.verify(r.output[i]);if(s)return"output."+s}}if(r.valueInfo!=null&&r.hasOwnProperty("valueInfo")){if(!Array.isArray(r.valueInfo))return"valueInfo: array expected";for(var i=0;i<r.valueInfo.length;++i){var s=d.onnx.ValueInfoProto.verify(r.valueInfo[i]);if(s)return"valueInfo."+s}}if(r.quantizationAnnotation!=null&&r.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(r.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var i=0;i<r.quantizationAnnotation.length;++i){var s=d.onnx.TensorAnnotation.verify(r.quantizationAnnotation[i]);if(s)return"quantizationAnnotation."+s}}return null},o.fromObject=function(r){if(r instanceof d.onnx.GraphProto)return r;var i=new d.onnx.GraphProto;if(r.node){if(!Array.isArray(r.node))throw TypeError(".onnx.GraphProto.node: array expected");i.node=[];for(var s=0;s<r.node.length;++s){if(typeof r.node[s]!="object")throw TypeError(".onnx.GraphProto.node: object expected");i.node[s]=d.onnx.NodeProto.fromObject(r.node[s])}}if(r.name!=null&&(i.name=String(r.name)),r.initializer){if(!Array.isArray(r.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");i.initializer=[];for(var s=0;s<r.initializer.length;++s){if(typeof r.initializer[s]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");i.initializer[s]=d.onnx.TensorProto.fromObject(r.initializer[s])}}if(r.sparseInitializer){if(!Array.isArray(r.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");i.sparseInitializer=[];for(var s=0;s<r.sparseInitializer.length;++s){if(typeof r.sparseInitializer[s]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");i.sparseInitializer[s]=d.onnx.SparseTensorProto.fromObject(r.sparseInitializer[s])}}if(r.docString!=null&&(i.docString=String(r.docString)),r.input){if(!Array.isArray(r.input))throw TypeError(".onnx.GraphProto.input: array expected");i.input=[];for(var s=0;s<r.input.length;++s){if(typeof r.input[s]!="object")throw TypeError(".onnx.GraphProto.input: object expected");i.input[s]=d.onnx.ValueInfoProto.fromObject(r.input[s])}}if(r.output){if(!Array.isArray(r.output))throw TypeError(".onnx.GraphProto.output: array expected");i.output=[];for(var s=0;s<r.output.length;++s){if(typeof r.output[s]!="object")throw TypeError(".onnx.GraphProto.output: object expected");i.output[s]=d.onnx.ValueInfoProto.fromObject(r.output[s])}}if(r.valueInfo){if(!Array.isArray(r.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");i.valueInfo=[];for(var s=0;s<r.valueInfo.length;++s){if(typeof r.valueInfo[s]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");i.valueInfo[s]=d.onnx.ValueInfoProto.fromObject(r.valueInfo[s])}}if(r.quantizationAnnotation){if(!Array.isArray(r.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");i.quantizationAnnotation=[];for(var s=0;s<r.quantizationAnnotation.length;++s){if(typeof r.quantizationAnnotation[s]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");i.quantizationAnnotation[s]=d.onnx.TensorAnnotation.fromObject(r.quantizationAnnotation[s])}}return i},o.toObject=function(r,i){i||(i={});var s={};if((i.arrays||i.defaults)&&(s.node=[],s.initializer=[],s.input=[],s.output=[],s.valueInfo=[],s.quantizationAnnotation=[],s.sparseInitializer=[]),i.defaults&&(s.name="",s.docString=""),r.node&&r.node.length){s.node=[];for(var c=0;c<r.node.length;++c)s.node[c]=d.onnx.NodeProto.toObject(r.node[c],i)}if(r.name!=null&&r.hasOwnProperty("name")&&(s.name=r.name),r.initializer&&r.initializer.length){s.initializer=[];for(var c=0;c<r.initializer.length;++c)s.initializer[c]=d.onnx.TensorProto.toObject(r.initializer[c],i)}if(r.docString!=null&&r.hasOwnProperty("docString")&&(s.docString=r.docString),r.input&&r.input.length){s.input=[];for(var c=0;c<r.input.length;++c)s.input[c]=d.onnx.ValueInfoProto.toObject(r.input[c],i)}if(r.output&&r.output.length){s.output=[];for(var c=0;c<r.output.length;++c)s.output[c]=d.onnx.ValueInfoProto.toObject(r.output[c],i)}if(r.valueInfo&&r.valueInfo.length){s.valueInfo=[];for(var c=0;c<r.valueInfo.length;++c)s.valueInfo[c]=d.onnx.ValueInfoProto.toObject(r.valueInfo[c],i)}if(r.quantizationAnnotation&&r.quantizationAnnotation.length){s.quantizationAnnotation=[];for(var c=0;c<r.quantizationAnnotation.length;++c)s.quantizationAnnotation[c]=d.onnx.TensorAnnotation.toObject(r.quantizationAnnotation[c],i)}if(r.sparseInitializer&&r.sparseInitializer.length){s.sparseInitializer=[];for(var c=0;c<r.sparseInitializer.length;++c)s.sparseInitializer[c]=d.onnx.SparseTensorProto.toObject(r.sparseInitializer[c],i)}return s},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.GraphProto"},o})(),p.TensorProto=(function(){function o(r){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],r)for(var i=Object.keys(r),s=0;s<i.length;++s)r[i[s]]!=null&&(this[i[s]]=r[i[s]])}return o.prototype.dims=u.emptyArray,o.prototype.dataType=0,o.prototype.segment=null,o.prototype.floatData=u.emptyArray,o.prototype.int32Data=u.emptyArray,o.prototype.stringData=u.emptyArray,o.prototype.int64Data=u.emptyArray,o.prototype.name="",o.prototype.docString="",o.prototype.rawData=u.newBuffer([]),o.prototype.externalData=u.emptyArray,o.prototype.dataLocation=0,o.prototype.doubleData=u.emptyArray,o.prototype.uint64Data=u.emptyArray,o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=l.create()),r.dims!=null&&r.dims.length){i.uint32(10).fork();for(var s=0;s<r.dims.length;++s)i.int64(r.dims[s]);i.ldelim()}if(r.dataType!=null&&Object.hasOwnProperty.call(r,"dataType")&&i.uint32(16).int32(r.dataType),r.segment!=null&&Object.hasOwnProperty.call(r,"segment")&&d.onnx.TensorProto.Segment.encode(r.segment,i.uint32(26).fork()).ldelim(),r.floatData!=null&&r.floatData.length){i.uint32(34).fork();for(var s=0;s<r.floatData.length;++s)i.float(r.floatData[s]);i.ldelim()}if(r.int32Data!=null&&r.int32Data.length){i.uint32(42).fork();for(var s=0;s<r.int32Data.length;++s)i.int32(r.int32Data[s]);i.ldelim()}if(r.stringData!=null&&r.stringData.length)for(var s=0;s<r.stringData.length;++s)i.uint32(50).bytes(r.stringData[s]);if(r.int64Data!=null&&r.int64Data.length){i.uint32(58).fork();for(var s=0;s<r.int64Data.length;++s)i.int64(r.int64Data[s]);i.ldelim()}if(r.name!=null&&Object.hasOwnProperty.call(r,"name")&&i.uint32(66).string(r.name),r.rawData!=null&&Object.hasOwnProperty.call(r,"rawData")&&i.uint32(74).bytes(r.rawData),r.doubleData!=null&&r.doubleData.length){i.uint32(82).fork();for(var s=0;s<r.doubleData.length;++s)i.double(r.doubleData[s]);i.ldelim()}if(r.uint64Data!=null&&r.uint64Data.length){i.uint32(90).fork();for(var s=0;s<r.uint64Data.length;++s)i.uint64(r.uint64Data[s]);i.ldelim()}if(r.docString!=null&&Object.hasOwnProperty.call(r,"docString")&&i.uint32(98).string(r.docString),r.externalData!=null&&r.externalData.length)for(var s=0;s<r.externalData.length;++s)d.onnx.StringStringEntryProto.encode(r.externalData[s],i.uint32(106).fork()).ldelim();return r.dataLocation!=null&&Object.hasOwnProperty.call(r,"dataLocation")&&i.uint32(112).int32(r.dataLocation),i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof a||(r=a.create(r));for(var s=i===void 0?r.len:r.pos+i,c=new d.onnx.TensorProto;r.pos<s;){var h=r.uint32();switch(h>>>3){case 1:{if(c.dims&&c.dims.length||(c.dims=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.dims.push(r.int64());else c.dims.push(r.int64());break}case 2:{c.dataType=r.int32();break}case 3:{c.segment=d.onnx.TensorProto.Segment.decode(r,r.uint32());break}case 4:{if(c.floatData&&c.floatData.length||(c.floatData=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.floatData.push(r.float());else c.floatData.push(r.float());break}case 5:{if(c.int32Data&&c.int32Data.length||(c.int32Data=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.int32Data.push(r.int32());else c.int32Data.push(r.int32());break}case 6:{c.stringData&&c.stringData.length||(c.stringData=[]),c.stringData.push(r.bytes());break}case 7:{if(c.int64Data&&c.int64Data.length||(c.int64Data=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.int64Data.push(r.int64());else c.int64Data.push(r.int64());break}case 8:{c.name=r.string();break}case 12:{c.docString=r.string();break}case 9:{c.rawData=r.bytes();break}case 13:{c.externalData&&c.externalData.length||(c.externalData=[]),c.externalData.push(d.onnx.StringStringEntryProto.decode(r,r.uint32()));break}case 14:{c.dataLocation=r.int32();break}case 10:{if(c.doubleData&&c.doubleData.length||(c.doubleData=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.doubleData.push(r.double());else c.doubleData.push(r.double());break}case 11:{if(c.uint64Data&&c.uint64Data.length||(c.uint64Data=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.uint64Data.push(r.uint64());else c.uint64Data.push(r.uint64());break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof a||(r=new a(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.dims!=null&&r.hasOwnProperty("dims")){if(!Array.isArray(r.dims))return"dims: array expected";for(var i=0;i<r.dims.length;++i)if(!u.isInteger(r.dims[i])&&!(r.dims[i]&&u.isInteger(r.dims[i].low)&&u.isInteger(r.dims[i].high)))return"dims: integer|Long[] expected"}if(r.dataType!=null&&r.hasOwnProperty("dataType")&&!u.isInteger(r.dataType))return"dataType: integer expected";if(r.segment!=null&&r.hasOwnProperty("segment")){var s=d.onnx.TensorProto.Segment.verify(r.segment);if(s)return"segment."+s}if(r.floatData!=null&&r.hasOwnProperty("floatData")){if(!Array.isArray(r.floatData))return"floatData: array expected";for(var i=0;i<r.floatData.length;++i)if(typeof r.floatData[i]!="number")return"floatData: number[] expected"}if(r.int32Data!=null&&r.hasOwnProperty("int32Data")){if(!Array.isArray(r.int32Data))return"int32Data: array expected";for(var i=0;i<r.int32Data.length;++i)if(!u.isInteger(r.int32Data[i]))return"int32Data: integer[] expected"}if(r.stringData!=null&&r.hasOwnProperty("stringData")){if(!Array.isArray(r.stringData))return"stringData: array expected";for(var i=0;i<r.stringData.length;++i)if(!(r.stringData[i]&&typeof r.stringData[i].length=="number"||u.isString(r.stringData[i])))return"stringData: buffer[] expected"}if(r.int64Data!=null&&r.hasOwnProperty("int64Data")){if(!Array.isArray(r.int64Data))return"int64Data: array expected";for(var i=0;i<r.int64Data.length;++i)if(!u.isInteger(r.int64Data[i])&&!(r.int64Data[i]&&u.isInteger(r.int64Data[i].low)&&u.isInteger(r.int64Data[i].high)))return"int64Data: integer|Long[] expected"}if(r.name!=null&&r.hasOwnProperty("name")&&!u.isString(r.name))return"name: string expected";if(r.docString!=null&&r.hasOwnProperty("docString")&&!u.isString(r.docString))return"docString: string expected";if(r.rawData!=null&&r.hasOwnProperty("rawData")&&!(r.rawData&&typeof r.rawData.length=="number"||u.isString(r.rawData)))return"rawData: buffer expected";if(r.externalData!=null&&r.hasOwnProperty("externalData")){if(!Array.isArray(r.externalData))return"externalData: array expected";for(var i=0;i<r.externalData.length;++i){var s=d.onnx.StringStringEntryProto.verify(r.externalData[i]);if(s)return"externalData."+s}}if(r.dataLocation!=null&&r.hasOwnProperty("dataLocation"))switch(r.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(r.doubleData!=null&&r.hasOwnProperty("doubleData")){if(!Array.isArray(r.doubleData))return"doubleData: array expected";for(var i=0;i<r.doubleData.length;++i)if(typeof r.doubleData[i]!="number")return"doubleData: number[] expected"}if(r.uint64Data!=null&&r.hasOwnProperty("uint64Data")){if(!Array.isArray(r.uint64Data))return"uint64Data: array expected";for(var i=0;i<r.uint64Data.length;++i)if(!u.isInteger(r.uint64Data[i])&&!(r.uint64Data[i]&&u.isInteger(r.uint64Data[i].low)&&u.isInteger(r.uint64Data[i].high)))return"uint64Data: integer|Long[] expected"}return null},o.fromObject=function(r){if(r instanceof d.onnx.TensorProto)return r;var i=new d.onnx.TensorProto;if(r.dims){if(!Array.isArray(r.dims))throw TypeError(".onnx.TensorProto.dims: array expected");i.dims=[];for(var s=0;s<r.dims.length;++s)u.Long?(i.dims[s]=u.Long.fromValue(r.dims[s])).unsigned=!1:typeof r.dims[s]=="string"?i.dims[s]=parseInt(r.dims[s],10):typeof r.dims[s]=="number"?i.dims[s]=r.dims[s]:typeof r.dims[s]=="object"&&(i.dims[s]=new u.LongBits(r.dims[s].low>>>0,r.dims[s].high>>>0).toNumber())}if(r.dataType!=null&&(i.dataType=r.dataType|0),r.segment!=null){if(typeof r.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");i.segment=d.onnx.TensorProto.Segment.fromObject(r.segment)}if(r.floatData){if(!Array.isArray(r.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");i.floatData=[];for(var s=0;s<r.floatData.length;++s)i.floatData[s]=Number(r.floatData[s])}if(r.int32Data){if(!Array.isArray(r.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");i.int32Data=[];for(var s=0;s<r.int32Data.length;++s)i.int32Data[s]=r.int32Data[s]|0}if(r.stringData){if(!Array.isArray(r.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");i.stringData=[];for(var s=0;s<r.stringData.length;++s)typeof r.stringData[s]=="string"?u.base64.decode(r.stringData[s],i.stringData[s]=u.newBuffer(u.base64.length(r.stringData[s])),0):r.stringData[s].length>=0&&(i.stringData[s]=r.stringData[s])}if(r.int64Data){if(!Array.isArray(r.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");i.int64Data=[];for(var s=0;s<r.int64Data.length;++s)u.Long?(i.int64Data[s]=u.Long.fromValue(r.int64Data[s])).unsigned=!1:typeof r.int64Data[s]=="string"?i.int64Data[s]=parseInt(r.int64Data[s],10):typeof r.int64Data[s]=="number"?i.int64Data[s]=r.int64Data[s]:typeof r.int64Data[s]=="object"&&(i.int64Data[s]=new u.LongBits(r.int64Data[s].low>>>0,r.int64Data[s].high>>>0).toNumber())}if(r.name!=null&&(i.name=String(r.name)),r.docString!=null&&(i.docString=String(r.docString)),r.rawData!=null&&(typeof r.rawData=="string"?u.base64.decode(r.rawData,i.rawData=u.newBuffer(u.base64.length(r.rawData)),0):r.rawData.length>=0&&(i.rawData=r.rawData)),r.externalData){if(!Array.isArray(r.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");i.externalData=[];for(var s=0;s<r.externalData.length;++s){if(typeof r.externalData[s]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");i.externalData[s]=d.onnx.StringStringEntryProto.fromObject(r.externalData[s])}}switch(r.dataLocation){default:if(typeof r.dataLocation=="number"){i.dataLocation=r.dataLocation;break}break;case"DEFAULT":case 0:i.dataLocation=0;break;case"EXTERNAL":case 1:i.dataLocation=1;break}if(r.doubleData){if(!Array.isArray(r.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");i.doubleData=[];for(var s=0;s<r.doubleData.length;++s)i.doubleData[s]=Number(r.doubleData[s])}if(r.uint64Data){if(!Array.isArray(r.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");i.uint64Data=[];for(var s=0;s<r.uint64Data.length;++s)u.Long?(i.uint64Data[s]=u.Long.fromValue(r.uint64Data[s])).unsigned=!0:typeof r.uint64Data[s]=="string"?i.uint64Data[s]=parseInt(r.uint64Data[s],10):typeof r.uint64Data[s]=="number"?i.uint64Data[s]=r.uint64Data[s]:typeof r.uint64Data[s]=="object"&&(i.uint64Data[s]=new u.LongBits(r.uint64Data[s].low>>>0,r.uint64Data[s].high>>>0).toNumber(!0))}return i},o.toObject=function(r,i){i||(i={});var s={};if((i.arrays||i.defaults)&&(s.dims=[],s.floatData=[],s.int32Data=[],s.stringData=[],s.int64Data=[],s.doubleData=[],s.uint64Data=[],s.externalData=[]),i.defaults&&(s.dataType=0,s.segment=null,s.name="",i.bytes===String?s.rawData="":(s.rawData=[],i.bytes!==Array&&(s.rawData=u.newBuffer(s.rawData))),s.docString="",s.dataLocation=i.enums===String?"DEFAULT":0),r.dims&&r.dims.length){s.dims=[];for(var c=0;c<r.dims.length;++c)typeof r.dims[c]=="number"?s.dims[c]=i.longs===String?String(r.dims[c]):r.dims[c]:s.dims[c]=i.longs===String?u.Long.prototype.toString.call(r.dims[c]):i.longs===Number?new u.LongBits(r.dims[c].low>>>0,r.dims[c].high>>>0).toNumber():r.dims[c]}if(r.dataType!=null&&r.hasOwnProperty("dataType")&&(s.dataType=r.dataType),r.segment!=null&&r.hasOwnProperty("segment")&&(s.segment=d.onnx.TensorProto.Segment.toObject(r.segment,i)),r.floatData&&r.floatData.length){s.floatData=[];for(var c=0;c<r.floatData.length;++c)s.floatData[c]=i.json&&!isFinite(r.floatData[c])?String(r.floatData[c]):r.floatData[c]}if(r.int32Data&&r.int32Data.length){s.int32Data=[];for(var c=0;c<r.int32Data.length;++c)s.int32Data[c]=r.int32Data[c]}if(r.stringData&&r.stringData.length){s.stringData=[];for(var c=0;c<r.stringData.length;++c)s.stringData[c]=i.bytes===String?u.base64.encode(r.stringData[c],0,r.stringData[c].length):i.bytes===Array?Array.prototype.slice.call(r.stringData[c]):r.stringData[c]}if(r.int64Data&&r.int64Data.length){s.int64Data=[];for(var c=0;c<r.int64Data.length;++c)typeof r.int64Data[c]=="number"?s.int64Data[c]=i.longs===String?String(r.int64Data[c]):r.int64Data[c]:s.int64Data[c]=i.longs===String?u.Long.prototype.toString.call(r.int64Data[c]):i.longs===Number?new u.LongBits(r.int64Data[c].low>>>0,r.int64Data[c].high>>>0).toNumber():r.int64Data[c]}if(r.name!=null&&r.hasOwnProperty("name")&&(s.name=r.name),r.rawData!=null&&r.hasOwnProperty("rawData")&&(s.rawData=i.bytes===String?u.base64.encode(r.rawData,0,r.rawData.length):i.bytes===Array?Array.prototype.slice.call(r.rawData):r.rawData),r.doubleData&&r.doubleData.length){s.doubleData=[];for(var c=0;c<r.doubleData.length;++c)s.doubleData[c]=i.json&&!isFinite(r.doubleData[c])?String(r.doubleData[c]):r.doubleData[c]}if(r.uint64Data&&r.uint64Data.length){s.uint64Data=[];for(var c=0;c<r.uint64Data.length;++c)typeof r.uint64Data[c]=="number"?s.uint64Data[c]=i.longs===String?String(r.uint64Data[c]):r.uint64Data[c]:s.uint64Data[c]=i.longs===String?u.Long.prototype.toString.call(r.uint64Data[c]):i.longs===Number?new u.LongBits(r.uint64Data[c].low>>>0,r.uint64Data[c].high>>>0).toNumber(!0):r.uint64Data[c]}if(r.docString!=null&&r.hasOwnProperty("docString")&&(s.docString=r.docString),r.externalData&&r.externalData.length){s.externalData=[];for(var c=0;c<r.externalData.length;++c)s.externalData[c]=d.onnx.StringStringEntryProto.toObject(r.externalData[c],i)}return r.dataLocation!=null&&r.hasOwnProperty("dataLocation")&&(s.dataLocation=i.enums===String?d.onnx.TensorProto.DataLocation[r.dataLocation]===void 0?r.dataLocation:d.onnx.TensorProto.DataLocation[r.dataLocation]:r.dataLocation),s},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.TensorProto"},o.DataType=(function(){var r={},i=Object.create(r);return i[r[0]="UNDEFINED"]=0,i[r[1]="FLOAT"]=1,i[r[2]="UINT8"]=2,i[r[3]="INT8"]=3,i[r[4]="UINT16"]=4,i[r[5]="INT16"]=5,i[r[6]="INT32"]=6,i[r[7]="INT64"]=7,i[r[8]="STRING"]=8,i[r[9]="BOOL"]=9,i[r[10]="FLOAT16"]=10,i[r[11]="DOUBLE"]=11,i[r[12]="UINT32"]=12,i[r[13]="UINT64"]=13,i[r[14]="COMPLEX64"]=14,i[r[15]="COMPLEX128"]=15,i[r[16]="BFLOAT16"]=16,i[r[17]="FLOAT8E4M3FN"]=17,i[r[18]="FLOAT8E4M3FNUZ"]=18,i[r[19]="FLOAT8E5M2"]=19,i[r[20]="FLOAT8E5M2FNUZ"]=20,i})(),o.Segment=(function(){function r(i){if(i)for(var s=Object.keys(i),c=0;c<s.length;++c)i[s[c]]!=null&&(this[s[c]]=i[s[c]])}return r.prototype.begin=u.Long?u.Long.fromBits(0,0,!1):0,r.prototype.end=u.Long?u.Long.fromBits(0,0,!1):0,r.create=function(i){return new r(i)},r.encode=function(i,s){return s||(s=l.create()),i.begin!=null&&Object.hasOwnProperty.call(i,"begin")&&s.uint32(8).int64(i.begin),i.end!=null&&Object.hasOwnProperty.call(i,"end")&&s.uint32(16).int64(i.end),s},r.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},r.decode=function(i,s){i instanceof a||(i=a.create(i));for(var c=s===void 0?i.len:i.pos+s,h=new d.onnx.TensorProto.Segment;i.pos<c;){var m=i.uint32();switch(m>>>3){case 1:{h.begin=i.int64();break}case 2:{h.end=i.int64();break}default:i.skipType(m&7);break}}return h},r.decodeDelimited=function(i){return i instanceof a||(i=new a(i)),this.decode(i,i.uint32())},r.verify=function(i){return typeof i!="object"||i===null?"object expected":i.begin!=null&&i.hasOwnProperty("begin")&&!u.isInteger(i.begin)&&!(i.begin&&u.isInteger(i.begin.low)&&u.isInteger(i.begin.high))?"begin: integer|Long expected":i.end!=null&&i.hasOwnProperty("end")&&!u.isInteger(i.end)&&!(i.end&&u.isInteger(i.end.low)&&u.isInteger(i.end.high))?"end: integer|Long expected":null},r.fromObject=function(i){if(i instanceof d.onnx.TensorProto.Segment)return i;var s=new d.onnx.TensorProto.Segment;return i.begin!=null&&(u.Long?(s.begin=u.Long.fromValue(i.begin)).unsigned=!1:typeof i.begin=="string"?s.begin=parseInt(i.begin,10):typeof i.begin=="number"?s.begin=i.begin:typeof i.begin=="object"&&(s.begin=new u.LongBits(i.begin.low>>>0,i.begin.high>>>0).toNumber())),i.end!=null&&(u.Long?(s.end=u.Long.fromValue(i.end)).unsigned=!1:typeof i.end=="string"?s.end=parseInt(i.end,10):typeof i.end=="number"?s.end=i.end:typeof i.end=="object"&&(s.end=new u.LongBits(i.end.low>>>0,i.end.high>>>0).toNumber())),s},r.toObject=function(i,s){s||(s={});var c={};if(s.defaults){if(u.Long){var h=new u.Long(0,0,!1);c.begin=s.longs===String?h.toString():s.longs===Number?h.toNumber():h}else c.begin=s.longs===String?"0":0;if(u.Long){var h=new u.Long(0,0,!1);c.end=s.longs===String?h.toString():s.longs===Number?h.toNumber():h}else c.end=s.longs===String?"0":0}return i.begin!=null&&i.hasOwnProperty("begin")&&(typeof i.begin=="number"?c.begin=s.longs===String?String(i.begin):i.begin:c.begin=s.longs===String?u.Long.prototype.toString.call(i.begin):s.longs===Number?new u.LongBits(i.begin.low>>>0,i.begin.high>>>0).toNumber():i.begin),i.end!=null&&i.hasOwnProperty("end")&&(typeof i.end=="number"?c.end=s.longs===String?String(i.end):i.end:c.end=s.longs===String?u.Long.prototype.toString.call(i.end):s.longs===Number?new u.LongBits(i.end.low>>>0,i.end.high>>>0).toNumber():i.end),c},r.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},r.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorProto.Segment"},r})(),o.DataLocation=(function(){var r={},i=Object.create(r);return i[r[0]="DEFAULT"]=0,i[r[1]="EXTERNAL"]=1,i})(),o})(),p.SparseTensorProto=(function(){function o(r){if(this.dims=[],r)for(var i=Object.keys(r),s=0;s<i.length;++s)r[i[s]]!=null&&(this[i[s]]=r[i[s]])}return o.prototype.values=null,o.prototype.indices=null,o.prototype.dims=u.emptyArray,o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=l.create()),r.values!=null&&Object.hasOwnProperty.call(r,"values")&&d.onnx.TensorProto.encode(r.values,i.uint32(10).fork()).ldelim(),r.indices!=null&&Object.hasOwnProperty.call(r,"indices")&&d.onnx.TensorProto.encode(r.indices,i.uint32(18).fork()).ldelim(),r.dims!=null&&r.dims.length){i.uint32(26).fork();for(var s=0;s<r.dims.length;++s)i.int64(r.dims[s]);i.ldelim()}return i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof a||(r=a.create(r));for(var s=i===void 0?r.len:r.pos+i,c=new d.onnx.SparseTensorProto;r.pos<s;){var h=r.uint32();switch(h>>>3){case 1:{c.values=d.onnx.TensorProto.decode(r,r.uint32());break}case 2:{c.indices=d.onnx.TensorProto.decode(r,r.uint32());break}case 3:{if(c.dims&&c.dims.length||(c.dims=[]),(h&7)===2)for(var m=r.uint32()+r.pos;r.pos<m;)c.dims.push(r.int64());else c.dims.push(r.int64());break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof a||(r=new a(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.values!=null&&r.hasOwnProperty("values")){var i=d.onnx.TensorProto.verify(r.values);if(i)return"values."+i}if(r.indices!=null&&r.hasOwnProperty("indices")){var i=d.onnx.TensorProto.verify(r.indices);if(i)return"indices."+i}if(r.dims!=null&&r.hasOwnProperty("dims")){if(!Array.isArray(r.dims))return"dims: array expected";for(var s=0;s<r.dims.length;++s)if(!u.isInteger(r.dims[s])&&!(r.dims[s]&&u.isInteger(r.dims[s].low)&&u.isInteger(r.dims[s].high)))return"dims: integer|Long[] expected"}return null},o.fromObject=function(r){if(r instanceof d.onnx.SparseTensorProto)return r;var i=new d.onnx.SparseTensorProto;if(r.values!=null){if(typeof r.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");i.values=d.onnx.TensorProto.fromObject(r.values)}if(r.indices!=null){if(typeof r.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");i.indices=d.onnx.TensorProto.fromObject(r.indices)}if(r.dims){if(!Array.isArray(r.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");i.dims=[];for(var s=0;s<r.dims.length;++s)u.Long?(i.dims[s]=u.Long.fromValue(r.dims[s])).unsigned=!1:typeof r.dims[s]=="string"?i.dims[s]=parseInt(r.dims[s],10):typeof r.dims[s]=="number"?i.dims[s]=r.dims[s]:typeof r.dims[s]=="object"&&(i.dims[s]=new u.LongBits(r.dims[s].low>>>0,r.dims[s].high>>>0).toNumber())}return i},o.toObject=function(r,i){i||(i={});var s={};if((i.arrays||i.defaults)&&(s.dims=[]),i.defaults&&(s.values=null,s.indices=null),r.values!=null&&r.hasOwnProperty("values")&&(s.values=d.onnx.TensorProto.toObject(r.values,i)),r.indices!=null&&r.hasOwnProperty("indices")&&(s.indices=d.onnx.TensorProto.toObject(r.indices,i)),r.dims&&r.dims.length){s.dims=[];for(var c=0;c<r.dims.length;++c)typeof r.dims[c]=="number"?s.dims[c]=i.longs===String?String(r.dims[c]):r.dims[c]:s.dims[c]=i.longs===String?u.Long.prototype.toString.call(r.dims[c]):i.longs===Number?new u.LongBits(r.dims[c].low>>>0,r.dims[c].high>>>0).toNumber():r.dims[c]}return s},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.SparseTensorProto"},o})(),p.TensorShapeProto=(function(){function o(r){if(this.dim=[],r)for(var i=Object.keys(r),s=0;s<i.length;++s)r[i[s]]!=null&&(this[i[s]]=r[i[s]])}return o.prototype.dim=u.emptyArray,o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=l.create()),r.dim!=null&&r.dim.length)for(var s=0;s<r.dim.length;++s)d.onnx.TensorShapeProto.Dimension.encode(r.dim[s],i.uint32(10).fork()).ldelim();return i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof a||(r=a.create(r));for(var s=i===void 0?r.len:r.pos+i,c=new d.onnx.TensorShapeProto;r.pos<s;){var h=r.uint32();h>>>3===1?(c.dim&&c.dim.length||(c.dim=[]),c.dim.push(d.onnx.TensorShapeProto.Dimension.decode(r,r.uint32()))):r.skipType(h&7)}return c},o.decodeDelimited=function(r){return r instanceof a||(r=new a(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.dim!=null&&r.hasOwnProperty("dim")){if(!Array.isArray(r.dim))return"dim: array expected";for(var i=0;i<r.dim.length;++i){var s=d.onnx.TensorShapeProto.Dimension.verify(r.dim[i]);if(s)return"dim."+s}}return null},o.fromObject=function(r){if(r instanceof d.onnx.TensorShapeProto)return r;var i=new d.onnx.TensorShapeProto;if(r.dim){if(!Array.isArray(r.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");i.dim=[];for(var s=0;s<r.dim.length;++s){if(typeof r.dim[s]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");i.dim[s]=d.onnx.TensorShapeProto.Dimension.fromObject(r.dim[s])}}return i},o.toObject=function(r,i){i||(i={});var s={};if((i.arrays||i.defaults)&&(s.dim=[]),r.dim&&r.dim.length){s.dim=[];for(var c=0;c<r.dim.length;++c)s.dim[c]=d.onnx.TensorShapeProto.Dimension.toObject(r.dim[c],i)}return s},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.TensorShapeProto"},o.Dimension=(function(){function r(s){if(s)for(var c=Object.keys(s),h=0;h<c.length;++h)s[c[h]]!=null&&(this[c[h]]=s[c[h]])}r.prototype.dimValue=null,r.prototype.dimParam=null,r.prototype.denotation="";var i;return Object.defineProperty(r.prototype,"value",{get:u.oneOfGetter(i=["dimValue","dimParam"]),set:u.oneOfSetter(i)}),r.create=function(s){return new r(s)},r.encode=function(s,c){return c||(c=l.create()),s.dimValue!=null&&Object.hasOwnProperty.call(s,"dimValue")&&c.uint32(8).int64(s.dimValue),s.dimParam!=null&&Object.hasOwnProperty.call(s,"dimParam")&&c.uint32(18).string(s.dimParam),s.denotation!=null&&Object.hasOwnProperty.call(s,"denotation")&&c.uint32(26).string(s.denotation),c},r.encodeDelimited=function(s,c){return this.encode(s,c).ldelim()},r.decode=function(s,c){s instanceof a||(s=a.create(s));for(var h=c===void 0?s.len:s.pos+c,m=new d.onnx.TensorShapeProto.Dimension;s.pos<h;){var b=s.uint32();switch(b>>>3){case 1:{m.dimValue=s.int64();break}case 2:{m.dimParam=s.string();break}case 3:{m.denotation=s.string();break}default:s.skipType(b&7);break}}return m},r.decodeDelimited=function(s){return s instanceof a||(s=new a(s)),this.decode(s,s.uint32())},r.verify=function(s){if(typeof s!="object"||s===null)return"object expected";var c={};if(s.dimValue!=null&&s.hasOwnProperty("dimValue")&&(c.value=1,!u.isInteger(s.dimValue)&&!(s.dimValue&&u.isInteger(s.dimValue.low)&&u.isInteger(s.dimValue.high))))return"dimValue: integer|Long expected";if(s.dimParam!=null&&s.hasOwnProperty("dimParam")){if(c.value===1)return"value: multiple values";if(c.value=1,!u.isString(s.dimParam))return"dimParam: string expected"}return s.denotation!=null&&s.hasOwnProperty("denotation")&&!u.isString(s.denotation)?"denotation: string expected":null},r.fromObject=function(s){if(s instanceof d.onnx.TensorShapeProto.Dimension)return s;var c=new d.onnx.TensorShapeProto.Dimension;return s.dimValue!=null&&(u.Long?(c.dimValue=u.Long.fromValue(s.dimValue)).unsigned=!1:typeof s.dimValue=="string"?c.dimValue=parseInt(s.dimValue,10):typeof s.dimValue=="number"?c.dimValue=s.dimValue:typeof s.dimValue=="object"&&(c.dimValue=new u.LongBits(s.dimValue.low>>>0,s.dimValue.high>>>0).toNumber())),s.dimParam!=null&&(c.dimParam=String(s.dimParam)),s.denotation!=null&&(c.denotation=String(s.denotation)),c},r.toObject=function(s,c){c||(c={});var h={};return c.defaults&&(h.denotation=""),s.dimValue!=null&&s.hasOwnProperty("dimValue")&&(typeof s.dimValue=="number"?h.dimValue=c.longs===String?String(s.dimValue):s.dimValue:h.dimValue=c.longs===String?u.Long.prototype.toString.call(s.dimValue):c.longs===Number?new u.LongBits(s.dimValue.low>>>0,s.dimValue.high>>>0).toNumber():s.dimValue,c.oneofs&&(h.value="dimValue")),s.dimParam!=null&&s.hasOwnProperty("dimParam")&&(h.dimParam=s.dimParam,c.oneofs&&(h.value="dimParam")),s.denotation!=null&&s.hasOwnProperty("denotation")&&(h.denotation=s.denotation),h},r.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},r.getTypeUrl=function(s){return s===void 0&&(s="type.googleapis.com"),s+"/onnx.TensorShapeProto.Dimension"},r})(),o})(),p.TypeProto=(function(){function o(i){if(i)for(var s=Object.keys(i),c=0;c<s.length;++c)i[s[c]]!=null&&(this[s[c]]=i[s[c]])}o.prototype.tensorType=null,o.prototype.sequenceType=null,o.prototype.mapType=null,o.prototype.optionalType=null,o.prototype.sparseTensorType=null,o.prototype.denotation="";var r;return Object.defineProperty(o.prototype,"value",{get:u.oneOfGetter(r=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:u.oneOfSetter(r)}),o.create=function(i){return new o(i)},o.encode=function(i,s){return s||(s=l.create()),i.tensorType!=null&&Object.hasOwnProperty.call(i,"tensorType")&&d.onnx.TypeProto.Tensor.encode(i.tensorType,s.uint32(10).fork()).ldelim(),i.sequenceType!=null&&Object.hasOwnProperty.call(i,"sequenceType")&&d.onnx.TypeProto.Sequence.encode(i.sequenceType,s.uint32(34).fork()).ldelim(),i.mapType!=null&&Object.hasOwnProperty.call(i,"mapType")&&d.onnx.TypeProto.Map.encode(i.mapType,s.uint32(42).fork()).ldelim(),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&s.uint32(50).string(i.denotation),i.sparseTensorType!=null&&Object.hasOwnProperty.call(i,"sparseTensorType")&&d.onnx.TypeProto.SparseTensor.encode(i.sparseTensorType,s.uint32(66).fork()).ldelim(),i.optionalType!=null&&Object.hasOwnProperty.call(i,"optionalType")&&d.onnx.TypeProto.Optional.encode(i.optionalType,s.uint32(74).fork()).ldelim(),s},o.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},o.decode=function(i,s){i instanceof a||(i=a.create(i));for(var c=s===void 0?i.len:i.pos+s,h=new d.onnx.TypeProto;i.pos<c;){var m=i.uint32();switch(m>>>3){case 1:{h.tensorType=d.onnx.TypeProto.Tensor.decode(i,i.uint32());break}case 4:{h.sequenceType=d.onnx.TypeProto.Sequence.decode(i,i.uint32());break}case 5:{h.mapType=d.onnx.TypeProto.Map.decode(i,i.uint32());break}case 9:{h.optionalType=d.onnx.TypeProto.Optional.decode(i,i.uint32());break}case 8:{h.sparseTensorType=d.onnx.TypeProto.SparseTensor.decode(i,i.uint32());break}case 6:{h.denotation=i.string();break}default:i.skipType(m&7);break}}return h},o.decodeDelimited=function(i){return i instanceof a||(i=new a(i)),this.decode(i,i.uint32())},o.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var s={};if(i.tensorType!=null&&i.hasOwnProperty("tensorType")){s.value=1;{var c=d.onnx.TypeProto.Tensor.verify(i.tensorType);if(c)return"tensorType."+c}}if(i.sequenceType!=null&&i.hasOwnProperty("sequenceType")){if(s.value===1)return"value: multiple values";s.value=1;{var c=d.onnx.TypeProto.Sequence.verify(i.sequenceType);if(c)return"sequenceType."+c}}if(i.mapType!=null&&i.hasOwnProperty("mapType")){if(s.value===1)return"value: multiple values";s.value=1;{var c=d.onnx.TypeProto.Map.verify(i.mapType);if(c)return"mapType."+c}}if(i.optionalType!=null&&i.hasOwnProperty("optionalType")){if(s.value===1)return"value: multiple values";s.value=1;{var c=d.onnx.TypeProto.Optional.verify(i.optionalType);if(c)return"optionalType."+c}}if(i.sparseTensorType!=null&&i.hasOwnProperty("sparseTensorType")){if(s.value===1)return"value: multiple values";s.value=1;{var c=d.onnx.TypeProto.SparseTensor.verify(i.sparseTensorType);if(c)return"sparseTensorType."+c}}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!u.isString(i.denotation)?"denotation: string expected":null},o.fromObject=function(i){if(i instanceof d.onnx.TypeProto)return i;var s=new d.onnx.TypeProto;if(i.tensorType!=null){if(typeof i.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");s.tensorType=d.onnx.TypeProto.Tensor.fromObject(i.tensorType)}if(i.sequenceType!=null){if(typeof i.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");s.sequenceType=d.onnx.TypeProto.Sequence.fromObject(i.sequenceType)}if(i.mapType!=null){if(typeof i.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");s.mapType=d.onnx.TypeProto.Map.fromObject(i.mapType)}if(i.optionalType!=null){if(typeof i.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");s.optionalType=d.onnx.TypeProto.Optional.fromObject(i.optionalType)}if(i.sparseTensorType!=null){if(typeof i.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");s.sparseTensorType=d.onnx.TypeProto.SparseTensor.fromObject(i.sparseTensorType)}return i.denotation!=null&&(s.denotation=String(i.denotation)),s},o.toObject=function(i,s){s||(s={});var c={};return s.defaults&&(c.denotation=""),i.tensorType!=null&&i.hasOwnProperty("tensorType")&&(c.tensorType=d.onnx.TypeProto.Tensor.toObject(i.tensorType,s),s.oneofs&&(c.value="tensorType")),i.sequenceType!=null&&i.hasOwnProperty("sequenceType")&&(c.sequenceType=d.onnx.TypeProto.Sequence.toObject(i.sequenceType,s),s.oneofs&&(c.value="sequenceType")),i.mapType!=null&&i.hasOwnProperty("mapType")&&(c.mapType=d.onnx.TypeProto.Map.toObject(i.mapType,s),s.oneofs&&(c.value="mapType")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(c.denotation=i.denotation),i.sparseTensorType!=null&&i.hasOwnProperty("sparseTensorType")&&(c.sparseTensorType=d.onnx.TypeProto.SparseTensor.toObject(i.sparseTensorType,s),s.oneofs&&(c.value="sparseTensorType")),i.optionalType!=null&&i.hasOwnProperty("optionalType")&&(c.optionalType=d.onnx.TypeProto.Optional.toObject(i.optionalType,s),s.oneofs&&(c.value="optionalType")),c},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto"},o.Tensor=(function(){function i(s){if(s)for(var c=Object.keys(s),h=0;h<c.length;++h)s[c[h]]!=null&&(this[c[h]]=s[c[h]])}return i.prototype.elemType=0,i.prototype.shape=null,i.create=function(s){return new i(s)},i.encode=function(s,c){return c||(c=l.create()),s.elemType!=null&&Object.hasOwnProperty.call(s,"elemType")&&c.uint32(8).int32(s.elemType),s.shape!=null&&Object.hasOwnProperty.call(s,"shape")&&d.onnx.TensorShapeProto.encode(s.shape,c.uint32(18).fork()).ldelim(),c},i.encodeDelimited=function(s,c){return this.encode(s,c).ldelim()},i.decode=function(s,c){s instanceof a||(s=a.create(s));for(var h=c===void 0?s.len:s.pos+c,m=new d.onnx.TypeProto.Tensor;s.pos<h;){var b=s.uint32();switch(b>>>3){case 1:{m.elemType=s.int32();break}case 2:{m.shape=d.onnx.TensorShapeProto.decode(s,s.uint32());break}default:s.skipType(b&7);break}}return m},i.decodeDelimited=function(s){return s instanceof a||(s=new a(s)),this.decode(s,s.uint32())},i.verify=function(s){if(typeof s!="object"||s===null)return"object expected";if(s.elemType!=null&&s.hasOwnProperty("elemType")&&!u.isInteger(s.elemType))return"elemType: integer expected";if(s.shape!=null&&s.hasOwnProperty("shape")){var c=d.onnx.TensorShapeProto.verify(s.shape);if(c)return"shape."+c}return null},i.fromObject=function(s){if(s instanceof d.onnx.TypeProto.Tensor)return s;var c=new d.onnx.TypeProto.Tensor;if(s.elemType!=null&&(c.elemType=s.elemType|0),s.shape!=null){if(typeof s.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");c.shape=d.onnx.TensorShapeProto.fromObject(s.shape)}return c},i.toObject=function(s,c){c||(c={});var h={};return c.defaults&&(h.elemType=0,h.shape=null),s.elemType!=null&&s.hasOwnProperty("elemType")&&(h.elemType=s.elemType),s.shape!=null&&s.hasOwnProperty("shape")&&(h.shape=d.onnx.TensorShapeProto.toObject(s.shape,c)),h},i.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},i.getTypeUrl=function(s){return s===void 0&&(s="type.googleapis.com"),s+"/onnx.TypeProto.Tensor"},i})(),o.Sequence=(function(){function i(s){if(s)for(var c=Object.keys(s),h=0;h<c.length;++h)s[c[h]]!=null&&(this[c[h]]=s[c[h]])}return i.prototype.elemType=null,i.create=function(s){return new i(s)},i.encode=function(s,c){return c||(c=l.create()),s.elemType!=null&&Object.hasOwnProperty.call(s,"elemType")&&d.onnx.TypeProto.encode(s.elemType,c.uint32(10).fork()).ldelim(),c},i.encodeDelimited=function(s,c){return this.encode(s,c).ldelim()},i.decode=function(s,c){s instanceof a||(s=a.create(s));for(var h=c===void 0?s.len:s.pos+c,m=new d.onnx.TypeProto.Sequence;s.pos<h;){var b=s.uint32();b>>>3===1?m.elemType=d.onnx.TypeProto.decode(s,s.uint32()):s.skipType(b&7)}return m},i.decodeDelimited=function(s){return s instanceof a||(s=new a(s)),this.decode(s,s.uint32())},i.verify=function(s){if(typeof s!="object"||s===null)return"object expected";if(s.elemType!=null&&s.hasOwnProperty("elemType")){var c=d.onnx.TypeProto.verify(s.elemType);if(c)return"elemType."+c}return null},i.fromObject=function(s){if(s instanceof d.onnx.TypeProto.Sequence)return s;var c=new d.onnx.TypeProto.Sequence;if(s.elemType!=null){if(typeof s.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");c.elemType=d.onnx.TypeProto.fromObject(s.elemType)}return c},i.toObject=function(s,c){c||(c={});var h={};return c.defaults&&(h.elemType=null),s.elemType!=null&&s.hasOwnProperty("elemType")&&(h.elemType=d.onnx.TypeProto.toObject(s.elemType,c)),h},i.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},i.getTypeUrl=function(s){return s===void 0&&(s="type.googleapis.com"),s+"/onnx.TypeProto.Sequence"},i})(),o.Map=(function(){function i(s){if(s)for(var c=Object.keys(s),h=0;h<c.length;++h)s[c[h]]!=null&&(this[c[h]]=s[c[h]])}return i.prototype.keyType=0,i.prototype.valueType=null,i.create=function(s){return new i(s)},i.encode=function(s,c){return c||(c=l.create()),s.keyType!=null&&Object.hasOwnProperty.call(s,"keyType")&&c.uint32(8).int32(s.keyType),s.valueType!=null&&Object.hasOwnProperty.call(s,"valueType")&&d.onnx.TypeProto.encode(s.valueType,c.uint32(18).fork()).ldelim(),c},i.encodeDelimited=function(s,c){return this.encode(s,c).ldelim()},i.decode=function(s,c){s instanceof a||(s=a.create(s));for(var h=c===void 0?s.len:s.pos+c,m=new d.onnx.TypeProto.Map;s.pos<h;){var b=s.uint32();switch(b>>>3){case 1:{m.keyType=s.int32();break}case 2:{m.valueType=d.onnx.TypeProto.decode(s,s.uint32());break}default:s.skipType(b&7);break}}return m},i.decodeDelimited=function(s){return s instanceof a||(s=new a(s)),this.decode(s,s.uint32())},i.verify=function(s){if(typeof s!="object"||s===null)return"object expected";if(s.keyType!=null&&s.hasOwnProperty("keyType")&&!u.isInteger(s.keyType))return"keyType: integer expected";if(s.valueType!=null&&s.hasOwnProperty("valueType")){var c=d.onnx.TypeProto.verify(s.valueType);if(c)return"valueType."+c}return null},i.fromObject=function(s){if(s instanceof d.onnx.TypeProto.Map)return s;var c=new d.onnx.TypeProto.Map;if(s.keyType!=null&&(c.keyType=s.keyType|0),s.valueType!=null){if(typeof s.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");c.valueType=d.onnx.TypeProto.fromObject(s.valueType)}return c},i.toObject=function(s,c){c||(c={});var h={};return c.defaults&&(h.keyType=0,h.valueType=null),s.keyType!=null&&s.hasOwnProperty("keyType")&&(h.keyType=s.keyType),s.valueType!=null&&s.hasOwnProperty("valueType")&&(h.valueType=d.onnx.TypeProto.toObject(s.valueType,c)),h},i.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},i.getTypeUrl=function(s){return s===void 0&&(s="type.googleapis.com"),s+"/onnx.TypeProto.Map"},i})(),o.Optional=(function(){function i(s){if(s)for(var c=Object.keys(s),h=0;h<c.length;++h)s[c[h]]!=null&&(this[c[h]]=s[c[h]])}return i.prototype.elemType=null,i.create=function(s){return new i(s)},i.encode=function(s,c){return c||(c=l.create()),s.elemType!=null&&Object.hasOwnProperty.call(s,"elemType")&&d.onnx.TypeProto.encode(s.elemType,c.uint32(10).fork()).ldelim(),c},i.encodeDelimited=function(s,c){return this.encode(s,c).ldelim()},i.decode=function(s,c){s instanceof a||(s=a.create(s));for(var h=c===void 0?s.len:s.pos+c,m=new d.onnx.TypeProto.Optional;s.pos<h;){var b=s.uint32();b>>>3===1?m.elemType=d.onnx.TypeProto.decode(s,s.uint32()):s.skipType(b&7)}return m},i.decodeDelimited=function(s){return s instanceof a||(s=new a(s)),this.decode(s,s.uint32())},i.verify=function(s){if(typeof s!="object"||s===null)return"object expected";if(s.elemType!=null&&s.hasOwnProperty("elemType")){var c=d.onnx.TypeProto.verify(s.elemType);if(c)return"elemType."+c}return null},i.fromObject=function(s){if(s instanceof d.onnx.TypeProto.Optional)return s;var c=new d.onnx.TypeProto.Optional;if(s.elemType!=null){if(typeof s.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");c.elemType=d.onnx.TypeProto.fromObject(s.elemType)}return c},i.toObject=function(s,c){c||(c={});var h={};return c.defaults&&(h.elemType=null),s.elemType!=null&&s.hasOwnProperty("elemType")&&(h.elemType=d.onnx.TypeProto.toObject(s.elemType,c)),h},i.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},i.getTypeUrl=function(s){return s===void 0&&(s="type.googleapis.com"),s+"/onnx.TypeProto.Optional"},i})(),o.SparseTensor=(function(){function i(s){if(s)for(var c=Object.keys(s),h=0;h<c.length;++h)s[c[h]]!=null&&(this[c[h]]=s[c[h]])}return i.prototype.elemType=0,i.prototype.shape=null,i.create=function(s){return new i(s)},i.encode=function(s,c){return c||(c=l.create()),s.elemType!=null&&Object.hasOwnProperty.call(s,"elemType")&&c.uint32(8).int32(s.elemType),s.shape!=null&&Object.hasOwnProperty.call(s,"shape")&&d.onnx.TensorShapeProto.encode(s.shape,c.uint32(18).fork()).ldelim(),c},i.encodeDelimited=function(s,c){return this.encode(s,c).ldelim()},i.decode=function(s,c){s instanceof a||(s=a.create(s));for(var h=c===void 0?s.len:s.pos+c,m=new d.onnx.TypeProto.SparseTensor;s.pos<h;){var b=s.uint32();switch(b>>>3){case 1:{m.elemType=s.int32();break}case 2:{m.shape=d.onnx.TensorShapeProto.decode(s,s.uint32());break}default:s.skipType(b&7);break}}return m},i.decodeDelimited=function(s){return s instanceof a||(s=new a(s)),this.decode(s,s.uint32())},i.verify=function(s){if(typeof s!="object"||s===null)return"object expected";if(s.elemType!=null&&s.hasOwnProperty("elemType")&&!u.isInteger(s.elemType))return"elemType: integer expected";if(s.shape!=null&&s.hasOwnProperty("shape")){var c=d.onnx.TensorShapeProto.verify(s.shape);if(c)return"shape."+c}return null},i.fromObject=function(s){if(s instanceof d.onnx.TypeProto.SparseTensor)return s;var c=new d.onnx.TypeProto.SparseTensor;if(s.elemType!=null&&(c.elemType=s.elemType|0),s.shape!=null){if(typeof s.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");c.shape=d.onnx.TensorShapeProto.fromObject(s.shape)}return c},i.toObject=function(s,c){c||(c={});var h={};return c.defaults&&(h.elemType=0,h.shape=null),s.elemType!=null&&s.hasOwnProperty("elemType")&&(h.elemType=s.elemType),s.shape!=null&&s.hasOwnProperty("shape")&&(h.shape=d.onnx.TensorShapeProto.toObject(s.shape,c)),h},i.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},i.getTypeUrl=function(s){return s===void 0&&(s="type.googleapis.com"),s+"/onnx.TypeProto.SparseTensor"},i})(),o})(),p.OperatorSetIdProto=(function(){function o(r){if(r)for(var i=Object.keys(r),s=0;s<i.length;++s)r[i[s]]!=null&&(this[i[s]]=r[i[s]])}return o.prototype.domain="",o.prototype.version=u.Long?u.Long.fromBits(0,0,!1):0,o.create=function(r){return new o(r)},o.encode=function(r,i){return i||(i=l.create()),r.domain!=null&&Object.hasOwnProperty.call(r,"domain")&&i.uint32(10).string(r.domain),r.version!=null&&Object.hasOwnProperty.call(r,"version")&&i.uint32(16).int64(r.version),i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof a||(r=a.create(r));for(var s=i===void 0?r.len:r.pos+i,c=new d.onnx.OperatorSetIdProto;r.pos<s;){var h=r.uint32();switch(h>>>3){case 1:{c.domain=r.string();break}case 2:{c.version=r.int64();break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof a||(r=new a(r)),this.decode(r,r.uint32())},o.verify=function(r){return typeof r!="object"||r===null?"object expected":r.domain!=null&&r.hasOwnProperty("domain")&&!u.isString(r.domain)?"domain: string expected":r.version!=null&&r.hasOwnProperty("version")&&!u.isInteger(r.version)&&!(r.version&&u.isInteger(r.version.low)&&u.isInteger(r.version.high))?"version: integer|Long expected":null},o.fromObject=function(r){if(r instanceof d.onnx.OperatorSetIdProto)return r;var i=new d.onnx.OperatorSetIdProto;return r.domain!=null&&(i.domain=String(r.domain)),r.version!=null&&(u.Long?(i.version=u.Long.fromValue(r.version)).unsigned=!1:typeof r.version=="string"?i.version=parseInt(r.version,10):typeof r.version=="number"?i.version=r.version:typeof r.version=="object"&&(i.version=new u.LongBits(r.version.low>>>0,r.version.high>>>0).toNumber())),i},o.toObject=function(r,i){i||(i={});var s={};if(i.defaults)if(s.domain="",u.Long){var c=new u.Long(0,0,!1);s.version=i.longs===String?c.toString():i.longs===Number?c.toNumber():c}else s.version=i.longs===String?"0":0;return r.domain!=null&&r.hasOwnProperty("domain")&&(s.domain=r.domain),r.version!=null&&r.hasOwnProperty("version")&&(typeof r.version=="number"?s.version=i.longs===String?String(r.version):r.version:s.version=i.longs===String?u.Long.prototype.toString.call(r.version):i.longs===Number?new u.LongBits(r.version.low>>>0,r.version.high>>>0).toNumber():r.version),s},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.OperatorSetIdProto"},o})(),p.OperatorStatus=(function(){var o={},r=Object.create(o);return r[o[0]="EXPERIMENTAL"]=0,r[o[1]="STABLE"]=1,r})(),p.FunctionProto=(function(){function o(r){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],r)for(var i=Object.keys(r),s=0;s<i.length;++s)r[i[s]]!=null&&(this[i[s]]=r[i[s]])}return o.prototype.name="",o.prototype.input=u.emptyArray,o.prototype.output=u.emptyArray,o.prototype.attribute=u.emptyArray,o.prototype.attributeProto=u.emptyArray,o.prototype.node=u.emptyArray,o.prototype.docString="",o.prototype.opsetImport=u.emptyArray,o.prototype.domain="",o.create=function(r){return new o(r)},o.encode=function(r,i){if(i||(i=l.create()),r.name!=null&&Object.hasOwnProperty.call(r,"name")&&i.uint32(10).string(r.name),r.input!=null&&r.input.length)for(var s=0;s<r.input.length;++s)i.uint32(34).string(r.input[s]);if(r.output!=null&&r.output.length)for(var s=0;s<r.output.length;++s)i.uint32(42).string(r.output[s]);if(r.attribute!=null&&r.attribute.length)for(var s=0;s<r.attribute.length;++s)i.uint32(50).string(r.attribute[s]);if(r.node!=null&&r.node.length)for(var s=0;s<r.node.length;++s)d.onnx.NodeProto.encode(r.node[s],i.uint32(58).fork()).ldelim();if(r.docString!=null&&Object.hasOwnProperty.call(r,"docString")&&i.uint32(66).string(r.docString),r.opsetImport!=null&&r.opsetImport.length)for(var s=0;s<r.opsetImport.length;++s)d.onnx.OperatorSetIdProto.encode(r.opsetImport[s],i.uint32(74).fork()).ldelim();if(r.domain!=null&&Object.hasOwnProperty.call(r,"domain")&&i.uint32(82).string(r.domain),r.attributeProto!=null&&r.attributeProto.length)for(var s=0;s<r.attributeProto.length;++s)d.onnx.AttributeProto.encode(r.attributeProto[s],i.uint32(90).fork()).ldelim();return i},o.encodeDelimited=function(r,i){return this.encode(r,i).ldelim()},o.decode=function(r,i){r instanceof a||(r=a.create(r));for(var s=i===void 0?r.len:r.pos+i,c=new d.onnx.FunctionProto;r.pos<s;){var h=r.uint32();switch(h>>>3){case 1:{c.name=r.string();break}case 4:{c.input&&c.input.length||(c.input=[]),c.input.push(r.string());break}case 5:{c.output&&c.output.length||(c.output=[]),c.output.push(r.string());break}case 6:{c.attribute&&c.attribute.length||(c.attribute=[]),c.attribute.push(r.string());break}case 11:{c.attributeProto&&c.attributeProto.length||(c.attributeProto=[]),c.attributeProto.push(d.onnx.AttributeProto.decode(r,r.uint32()));break}case 7:{c.node&&c.node.length||(c.node=[]),c.node.push(d.onnx.NodeProto.decode(r,r.uint32()));break}case 8:{c.docString=r.string();break}case 9:{c.opsetImport&&c.opsetImport.length||(c.opsetImport=[]),c.opsetImport.push(d.onnx.OperatorSetIdProto.decode(r,r.uint32()));break}case 10:{c.domain=r.string();break}default:r.skipType(h&7);break}}return c},o.decodeDelimited=function(r){return r instanceof a||(r=new a(r)),this.decode(r,r.uint32())},o.verify=function(r){if(typeof r!="object"||r===null)return"object expected";if(r.name!=null&&r.hasOwnProperty("name")&&!u.isString(r.name))return"name: string expected";if(r.input!=null&&r.hasOwnProperty("input")){if(!Array.isArray(r.input))return"input: array expected";for(var i=0;i<r.input.length;++i)if(!u.isString(r.input[i]))return"input: string[] expected"}if(r.output!=null&&r.hasOwnProperty("output")){if(!Array.isArray(r.output))return"output: array expected";for(var i=0;i<r.output.length;++i)if(!u.isString(r.output[i]))return"output: string[] expected"}if(r.attribute!=null&&r.hasOwnProperty("attribute")){if(!Array.isArray(r.attribute))return"attribute: array expected";for(var i=0;i<r.attribute.length;++i)if(!u.isString(r.attribute[i]))return"attribute: string[] expected"}if(r.attributeProto!=null&&r.hasOwnProperty("attributeProto")){if(!Array.isArray(r.attributeProto))return"attributeProto: array expected";for(var i=0;i<r.attributeProto.length;++i){var s=d.onnx.AttributeProto.verify(r.attributeProto[i]);if(s)return"attributeProto."+s}}if(r.node!=null&&r.hasOwnProperty("node")){if(!Array.isArray(r.node))return"node: array expected";for(var i=0;i<r.node.length;++i){var s=d.onnx.NodeProto.verify(r.node[i]);if(s)return"node."+s}}if(r.docString!=null&&r.hasOwnProperty("docString")&&!u.isString(r.docString))return"docString: string expected";if(r.opsetImport!=null&&r.hasOwnProperty("opsetImport")){if(!Array.isArray(r.opsetImport))return"opsetImport: array expected";for(var i=0;i<r.opsetImport.length;++i){var s=d.onnx.OperatorSetIdProto.verify(r.opsetImport[i]);if(s)return"opsetImport."+s}}return r.domain!=null&&r.hasOwnProperty("domain")&&!u.isString(r.domain)?"domain: string expected":null},o.fromObject=function(r){if(r instanceof d.onnx.FunctionProto)return r;var i=new d.onnx.FunctionProto;if(r.name!=null&&(i.name=String(r.name)),r.input){if(!Array.isArray(r.input))throw TypeError(".onnx.FunctionProto.input: array expected");i.input=[];for(var s=0;s<r.input.length;++s)i.input[s]=String(r.input[s])}if(r.output){if(!Array.isArray(r.output))throw TypeError(".onnx.FunctionProto.output: array expected");i.output=[];for(var s=0;s<r.output.length;++s)i.output[s]=String(r.output[s])}if(r.attribute){if(!Array.isArray(r.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");i.attribute=[];for(var s=0;s<r.attribute.length;++s)i.attribute[s]=String(r.attribute[s])}if(r.attributeProto){if(!Array.isArray(r.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");i.attributeProto=[];for(var s=0;s<r.attributeProto.length;++s){if(typeof r.attributeProto[s]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");i.attributeProto[s]=d.onnx.AttributeProto.fromObject(r.attributeProto[s])}}if(r.node){if(!Array.isArray(r.node))throw TypeError(".onnx.FunctionProto.node: array expected");i.node=[];for(var s=0;s<r.node.length;++s){if(typeof r.node[s]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");i.node[s]=d.onnx.NodeProto.fromObject(r.node[s])}}if(r.docString!=null&&(i.docString=String(r.docString)),r.opsetImport){if(!Array.isArray(r.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");i.opsetImport=[];for(var s=0;s<r.opsetImport.length;++s){if(typeof r.opsetImport[s]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");i.opsetImport[s]=d.onnx.OperatorSetIdProto.fromObject(r.opsetImport[s])}}return r.domain!=null&&(i.domain=String(r.domain)),i},o.toObject=function(r,i){i||(i={});var s={};if((i.arrays||i.defaults)&&(s.input=[],s.output=[],s.attribute=[],s.node=[],s.opsetImport=[],s.attributeProto=[]),i.defaults&&(s.name="",s.docString="",s.domain=""),r.name!=null&&r.hasOwnProperty("name")&&(s.name=r.name),r.input&&r.input.length){s.input=[];for(var c=0;c<r.input.length;++c)s.input[c]=r.input[c]}if(r.output&&r.output.length){s.output=[];for(var c=0;c<r.output.length;++c)s.output[c]=r.output[c]}if(r.attribute&&r.attribute.length){s.attribute=[];for(var c=0;c<r.attribute.length;++c)s.attribute[c]=r.attribute[c]}if(r.node&&r.node.length){s.node=[];for(var c=0;c<r.node.length;++c)s.node[c]=d.onnx.NodeProto.toObject(r.node[c],i)}if(r.docString!=null&&r.hasOwnProperty("docString")&&(s.docString=r.docString),r.opsetImport&&r.opsetImport.length){s.opsetImport=[];for(var c=0;c<r.opsetImport.length;++c)s.opsetImport[c]=d.onnx.OperatorSetIdProto.toObject(r.opsetImport[c],i)}if(r.domain!=null&&r.hasOwnProperty("domain")&&(s.domain=r.domain),r.attributeProto&&r.attributeProto.length){s.attributeProto=[];for(var c=0;c<r.attributeProto.length;++c)s.attributeProto[c]=d.onnx.AttributeProto.toObject(r.attributeProto[c],i)}return s},o.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.FunctionProto"},o})(),p})(),t.exports=d});function Rd(e,t){if(!e)throw new Error(typeof t=="string"?t:t())}function Zo(e){return new TextDecoder().decode(e)}var je,Cn,Bd,Ut,Md,mt,qt,me,Jo,Ni,zn,Rn,Ne=N(()=>{"use strict";Kl(),je=ce(Nn()),hn(),Cn=class{static arraysEqual(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}},Bd=class{static preprocessInputShapes(e,t){let n=e.length===1?[1,e[0]]:e,a=t.length===1?[t[0],1]:t;return[n,a]}static postprocessOutputShape(e,t,n){t===1&&e.splice(e.length-2,1),n===1&&e.pop()}static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Ut=class wi{static calcShape(t,n,a=!1){let l=t.length,u=n.length;if(l===0)return n;if(u===0)return t;let d=Math.max(t.length,n.length),p=new Array(d);if(a){if(l<2||u<2)return;let o=Bd.calcMatMulShape([t[l-2],t[l-1]],[n[u-2],n[u-1]]);if(o===void 0)return;[p[d-2],p[d-1]]=o}for(let o=a?3:1;o<=d;o++){let r=l-o<0?1:t[l-o],i=u-o<0?1:n[u-o];if(r!==i&&r>1&&i>1)return;p[d-o]=Math.max(r,i)}return p}static index(t,n){let a=new Array(n.length);return wi.fillIndex(t,n,a),a}static fillIndex(t,n,a){let l=t.length-n.length;for(let u=0;u<n.length;u++)a[u]=t[l+u]%n[u]}static calc(t,n,a,l,u){let d=wi.calcShape(t.dims,n.dims);if(d){if(l&&!me.areEqual(d,t.dims))return;let p=me.size(d),o=l?t:new gt(d,u||t.type);if(d.length===0)o.set([],a(t.get([]),n.get([])));else{let r=new Array(d.length),i=new Array(t.dims.length),s=new Array(n.dims.length),c=0,h=0,m=!1,b=!1;t.dims.length===0&&(c=t.get([]),m=!0),n.dims.length===0&&(h=n.get([]),b=!0);let x;for(let v=0;v<p;v++){x=v;for(let _=d.length-1;_>=0;_--)r[_]=x%d[_],x=Math.floor(x/d[_]);m||(wi.fillIndex(r,t.dims,i),c=t.get(i)),b||(wi.fillIndex(r,n.dims,s),h=n.get(s)),o.set(r,a(c,h))}}return o}}static isValidBroadcast(t,n){let a=t.length,l=n.length;if(a>l)return!1;for(let u=1;u<=a;u++)if(t[a-u]!==1&&t[a-u]!==n[l-u])return!1;return!0}static getBroadcastDims(t,n){let a=t.length,l=[];for(let u=0;u<a;u++){let d=a-1-u,p=t[d]||1;(n[n.length-1-u]||1)>1&&p===1&&l.unshift(d)}return l}},Md=class{static getShapeOfGemmResult(e,t,n,a,l){if(e.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let u,d,p;t?(u=e[1],d=e[0]):(u=e[0],d=e[1]);let o=-1;if(a?(p=n[0],o=1):(p=n[1],o=0),n[o]!==d)throw new Error("dimension mismatch");if(u<=0||p<=0||d<=0)throw new Error("invalid shape specified");if(l&&!Ut.isValidBroadcast(l,[u,p]))throw new Error("gemm: invalid bias shape for broadcast");return[u,p,d]}},mt=class vl{static tensorDataTypeFromProto(t){switch(t){case je.onnx.TensorProto.DataType.INT8:return"int8";case je.onnx.TensorProto.DataType.UINT8:return"uint8";case je.onnx.TensorProto.DataType.BOOL:return"bool";case je.onnx.TensorProto.DataType.INT16:return"int16";case je.onnx.TensorProto.DataType.UINT16:return"uint16";case je.onnx.TensorProto.DataType.INT32:return"int32";case je.onnx.TensorProto.DataType.UINT32:return"uint32";case je.onnx.TensorProto.DataType.FLOAT:return"float32";case je.onnx.TensorProto.DataType.DOUBLE:return"float64";case je.onnx.TensorProto.DataType.STRING:return"string";case je.onnx.TensorProto.DataType.INT64:return"int32";case je.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${je.onnx.TensorProto.DataType[t]}`)}}static tensorDataTypeStringToEnum(t){switch(t){case"int8":return je.onnx.TensorProto.DataType.INT8;case"uint8":return je.onnx.TensorProto.DataType.UINT8;case"bool":return je.onnx.TensorProto.DataType.BOOL;case"int16":return je.onnx.TensorProto.DataType.INT16;case"uint16":return je.onnx.TensorProto.DataType.UINT16;case"int32":return je.onnx.TensorProto.DataType.INT32;case"uint32":return je.onnx.TensorProto.DataType.UINT32;case"float32":return je.onnx.TensorProto.DataType.FLOAT;case"float64":return je.onnx.TensorProto.DataType.DOUBLE;case"string":return je.onnx.TensorProto.DataType.STRING;case"int64":return je.onnx.TensorProto.DataType.INT64;case"uint64":return je.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${t}`)}}static tensorDimsFromProto(t){return t.map(n=>zr.isLong(n)?n.toNumber():n)}static tensorValueTypeFromProto(t){return{tensorType:vl.tensorDataTypeFromProto(t.elemType),shape:{dims:vl.tensorDimsFromProto(t.shape.dim.map(n=>n.dimValue))}}}static tensorDimsFromORTFormat(t){let n=[];for(let a=0;a<t.dimsLength();a++)n.push(qt.longToNumber(t.dims(a)));return n}static tensorAttributesFromORTFormat(t){let n=[];for(let a=0;a<t.attributesLength();a++)n.push(t.attributes(a));return n}},qt=class{static longToNumber(e){return zr.isLong(e)?e.toNumber():typeof e=="bigint"?Number(e):e}static isLong(e){return zr.isLong(e)||typeof e=="bigint"}},me=class xr{static size(t){return xr.getSizeFromDimensionRange(t,0,t.length)}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return xr.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return xr.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,a){let l=1;for(let u=n;u<a;u++){if(t[u]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");l*=t[u]}return l}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let a=new Array(n);a[n-1]=1,a[n-2]=t[n-1];for(let l=n-3;l>=0;--l)a[l]=a[l+1]*t[l+1];return a}static transpose(t){return t.slice().reverse()}static indicesToOffset(t,n,a){a===void 0&&(a=t.length);let l=0;for(let u=0;u<a;++u)l+=n[u]*t[u];return l}static offsetToIndices(t,n){let a=n.length;if(a===0)return[];if(a===1)return[t*n[0]];let l=new Array(n.length);for(let u=0;u<l.length-1;++u)l[u]=Math.floor(t/n[u]),t-=l[u]*n[u];return l[l.length-1]=t,l}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(a=>this.normalizeAxis(a,n))}static incrementIndex(t,n,a){if(n.length===0||t.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(a===void 0)a=n.length;else if(a<=0||a>n.length)throw new Error("Incorrect axis to increment on");for(let l=a-1;l>=0&&(t[l]++,!(t[l]<n[l]));--l)t[l]=0}static calculateReshapedDims(t,n){if(n.length===0){if(t.length===0||xr.size(t)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let a=n.length,l=new Array(a),u=-1,d=1;for(let o=0;o<a;o++){if(n[o]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(n[o]===-1){if(u!==-1)throw new Error("at most one dimension in shape hints can be -1");u=o}else{if(n[o]===0){if(o>=t.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");l[o]=t[o]}else l[o]=n[o];d*=l[o]}}let p=xr.size(t);if(u!==-1){if(p%d!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${t}] Output shape: [${n}]`);l[u]=p/d}else if(d!==p)throw new Error("reshapedDims and originalDims don't have matching sizes");return l}static sortBasedOnPerm(t,n){return n?n.map(a=>t[a]):t.slice().reverse()}static padShape(t,n){let a=t.length;return t.map((l,u)=>l+n[u]+n[u+a])}static areEqual(t,n){return t.length!==n.length?!1:t.every((a,l)=>a===n[l])}static validateDimsAndCalcSize(t){if(t.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let n=1;for(let a of t){if(!Number.isInteger(a))throw new TypeError(`Invalid shape: ${a} is not an integer`);if(a<0||a>2147483647)throw new TypeError(`Invalid shape: length ${a} is not allowed`);n*=a}return n}static flattenShape(t,n){n<0&&(n+=t.length);let a=t.reduce((u,d)=>u*d,1),l=t.slice(n).reduce((u,d)=>u*d,1);return[a/l,l]}static squeezeShape(t,n){let a=new Array;n=xr.normalizeAxes(n,t.length);for(let l=0;l<t.length;l++){let u=n.indexOf(l)>=0;if(u&&t[l]!==1)throw new Error("squeeze an axis of size different than 1");(n.length===0&&t[l]>1||n.length>0&&!u)&&a.push(t[l])}return a}static unsqueezeShape(t,n){let a=new Array(t.length+n.length);a.fill(0);for(let u=0;u<n.length;u++){let d=xr.normalizeAxis(n[u],a.length);if(d>=a.length)throw new Error("'axes' has an out of range axis");if(a[d]!==0)throw new Error("'axes' has a duplicate axis");a[d]=1}let l=0;for(let u=0;u<a.length;u++)a[u]===0&&(a[u]=t[l++]);if(l!==t.length)throw new Error("the unsqueezed dimension could not be established");return a}},Jo=class ex{static splitShape(t,n,a,l){if(a.length===0){if(!l)throw new Error("need to know number of outputs when the 'split' attribute is not specified");ex.determineSplit(t[n],l,a)}let u=[],d=[0];for(let p=0;p<a.length;++p){p!==0&&d.push(d[p-1]+a[p-1]);let o=t.slice();o[n]=a[p],u.push(o)}return[u,d]}static determineSplit(t,n,a){if(t%n!==0)throw new Error("cannot split tensor to equal sized parts");for(let l=0;l<n;++l)a.push(t/n)}},Ni=class $r{static adjustPoolAttributes(t,n,a,l,u,d){if(!t&&a.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let p=0;p<n.length-2;p++)p>=a.length?a.push(n[p+2]):a[p]=n[p+2];for(let p=0;p<a.length;p++)if(p<l.length){if(l[p]<0)throw new Error("strides should be greater than or equal to 1")}else l.push(1);for(let p=0;p<a.length;p++)if(p<u.length){if(u[p]<0)throw new Error("dilations should be greater than or equal to 1")}else u.push(1);for(let p=0;p<a.length*2;p++)if(p<d.length){if(d[p]<0)throw new Error("pad should be greater than or equal to 1")}else d.push(0);for(let p=0;p<a.length;p++){if(a[p]<=0)throw new Error("kernel shapes need to be greater than 0");if(d[p]>=a[p]||d[p+a.length]>=a[p])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,a,l,u,d){if(d){if(u.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(l.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let p=0;p<t.length-2;p++)$r.adjustPadAndReturnShape(t[p+2],n[p],a[p],l[p],u,p,p+t.length-2,d)}}static computePoolOutputShape(t,n,a,l,u,d,p,o=0){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let r=[n[0],n[1]];return $r.computeShapeHelper(t,n,r,a,l,u,d,p,o),r}static computeConvOutputShape(t,n,a,l,u,d,p){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let o=[t[0],n[0]];return $r.computeShapeHelper(!1,t,o,a,l,u,d,p),o}static computeShapeHelper(t,n,a,l,u,d,p,o,r=0){if(t)for(let i=0;i<n.length-2;i++)a.push(1);else for(let i=0;i<n.length-2;i++)a.push($r.adjustPadAndReturnShape(n[i+2],l[i],u[i],d[i],p,i,i+n.length-2,o,r))}static computeOutputSize(t,n,a,l,u){let d=Math.floor(t/n)+1;return u===1&&(d=Math.ceil(t/n)+1,(d-1)*n>=a+l&&(d-=1)),d}static adjustPadAndReturnShape(t,n,a,l,u,d,p,o,r=0){let i=a*(l-1)+1;if(o&&o!=="NOTSET")switch(o){case"VALID":return u[d]=0,u[p]=0,$r.computeOutputSize(t-i,n,t,0,r);case"SAME_LOWER":case"SAME_UPPER":if(a!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let s=(Math.floor((t+n-1)/n)-1)*n+l-t;return u[d]=Math.floor(o==="SAME_LOWER"?(s+1)/2:s/2),u[p]=s-u[d],$r.computeOutputSize(t+u[d]+u[p]-i,n,t,u[d],r)}default:throw new Error("Unsupported AutoPad type")}else return $r.computeOutputSize(t+u[d]+u[p]-i,n,t,u[d],r)}},zn=-34028234663852886e22,Rn=34028234663852886e22});function _$(e){switch(e){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${e}`)}}function Fd(e){switch(e){case be.onnx.TensorProto.DataType.UINT8:case be.onnx.TensorProto.DataType.INT8:case be.onnx.TensorProto.DataType.BOOL:return 1;case be.onnx.TensorProto.DataType.UINT16:case be.onnx.TensorProto.DataType.INT16:return 2;case be.onnx.TensorProto.DataType.FLOAT:case be.onnx.TensorProto.DataType.INT32:case be.onnx.TensorProto.DataType.UINT32:return 4;case be.onnx.TensorProto.DataType.INT64:case be.onnx.TensorProto.DataType.DOUBLE:case be.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${be.onnx.TensorProto.DataType[e]}`)}}function w$(e,t){return new(jd(t))(e)}function jd(e){switch(e){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function Yo(e,t){if(t===be.onnx.TensorProto.DataType.INT64||t===ki.TensorDataType.INT64){if(e.greaterThanOrEqual(2147483648)||e.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(t===be.onnx.TensorProto.DataType.UINT32||t===ki.TensorDataType.UINT32||t===be.onnx.TensorProto.DataType.UINT64||t===ki.TensorDataType.UINT64){if(e.greaterThanOrEqual(4294967296)||e.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${be.onnx.TensorProto.DataType[t]}`);return e.toNumber()}function Ld(e,t,n){switch(t){case be.onnx.TensorProto.DataType.BOOL:case be.onnx.TensorProto.DataType.UINT8:return e.getUint8(n);case be.onnx.TensorProto.DataType.INT8:return e.getInt8(n);case be.onnx.TensorProto.DataType.UINT16:return e.getUint16(n,!0);case be.onnx.TensorProto.DataType.INT16:return e.getInt16(n,!0);case be.onnx.TensorProto.DataType.FLOAT:return e.getFloat32(n,!0);case be.onnx.TensorProto.DataType.INT32:return e.getInt32(n,!0);case be.onnx.TensorProto.DataType.UINT32:return e.getUint32(n,!0);case be.onnx.TensorProto.DataType.INT64:return Yo(zr.fromBits(e.getUint32(n,!0),e.getUint32(n+4,!0),!1),t);case be.onnx.TensorProto.DataType.DOUBLE:return e.getFloat64(n,!0);case be.onnx.TensorProto.DataType.UINT64:return Yo(zr.fromBits(e.getUint32(n,!0),e.getUint32(n+4,!0),!0),t);default:throw new Error(`cannot read from DataView for type ${be.onnx.TensorProto.DataType[t]}`)}}var Vd,be,gt,hn=N(()=>{"use strict";Vd=ce($x()),Kl(),Di(),be=ce(Nn()),Ne(),gt=class So{constructor(t,n,a,l,u,d=Vd.Guid.create()){this.dims=t,this.type=n,this.dataProvider=a,this.asyncDataProvider=l,this.cache=u,this.dataId=d,this.size=me.validateDimsAndCalcSize(t);let p=this.size,o=a===void 0&&l===void 0&&u===void 0;if(u!==void 0&&u.length!==p)throw new RangeError("Input dims doesn't match data length.");if(n==="string"){if(u!==void 0&&(!Array.isArray(u)||!u.every(r=>typeof r=="string")))throw new TypeError("cache should be a string array");o&&(this.cache=new Array(p))}else{if(u!==void 0){let r=jd(n);if(!(u instanceof r))throw new TypeError(`cache should be type ${r.name}`)}if(o){let r=new ArrayBuffer(p*_$(n));this.cache=w$(r,n)}}}get data(){if(this.cache===void 0){let t=this.dataProvider(this.dataId);if(t.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=t}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(t){return this.data[me.indicesToOffset(t,this.strides)]}set(t,n){this.data[me.indicesToOffset(t,this.strides)]=n}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=me.computeStrides(this.dims)),this._strides}static fromProto(t){if(!t)throw new Error("cannot construct Value from an empty tensor");let n=mt.tensorDataTypeFromProto(t.dataType),a=mt.tensorDimsFromProto(t.dims),l=new So(a,n);if(n==="string")t.stringData.forEach((u,d)=>{l.data[d]=Zo(u)});else if(t.rawData&&typeof t.rawData.byteLength=="number"&&t.rawData.byteLength>0){let u=l.data,d=new DataView(t.rawData.buffer,t.rawData.byteOffset,t.rawData.byteLength),p=Fd(t.dataType),o=t.rawData.byteLength/p;if(t.rawData.byteLength%p!==0)throw new Error("invalid buffer length");if(u.length!==o)throw new Error("buffer length mismatch");for(let r=0;r<o;r++){let i=Ld(d,t.dataType,r*p);u[r]=i}}else{let u;switch(t.dataType){case be.onnx.TensorProto.DataType.FLOAT:u=t.floatData;break;case be.onnx.TensorProto.DataType.INT32:case be.onnx.TensorProto.DataType.INT16:case be.onnx.TensorProto.DataType.UINT16:case be.onnx.TensorProto.DataType.INT8:case be.onnx.TensorProto.DataType.UINT8:case be.onnx.TensorProto.DataType.BOOL:u=t.int32Data;break;case be.onnx.TensorProto.DataType.INT64:u=t.int64Data;break;case be.onnx.TensorProto.DataType.DOUBLE:u=t.doubleData;break;case be.onnx.TensorProto.DataType.UINT32:case be.onnx.TensorProto.DataType.UINT64:u=t.uint64Data;break;default:throw new Error("unspecific error")}if(u==null)throw new Error("failed to populate data from a tensorproto value");let d=l.data;if(d.length!==u.length)throw new Error("array length mismatch");for(let p=0;p<u.length;p++){let o=u[p];zr.isLong(o)?d[p]=Yo(o,t.dataType):d[p]=o}}return l}static fromData(t,n,a){return new So(n,a,void 0,void 0,t)}static fromOrtTensor(t){if(!t)throw new Error("cannot construct Value from an empty tensor");let n=mt.tensorDimsFromORTFormat(t),a=mt.tensorDataTypeFromProto(t.dataType()),l=new So(n,a);if(a==="string")for(let u=0;u<t.stringDataLength();u++)l.data[u]=t.stringData(u);else if(t.rawDataArray()&&typeof t.rawDataLength()=="number"&&t.rawDataLength()>0){let u=l.data,d=new DataView(t.rawDataArray().buffer,t.rawDataArray().byteOffset,t.rawDataLength()),p=Fd(t.dataType()),o=t.rawDataLength()/p;if(t.rawDataLength()%p!==0)throw new Error("invalid buffer length");if(u.length!==o)throw new Error("buffer length mismatch");for(let r=0;r<o;r++){let i=Ld(d,t.dataType(),r*p);u[r]=i}}return l}}});function Te(e){return e===1?Ud:qd}function v$(e){let t=Te(e);return`${t.version}
      precision highp float;
      ${t.attribute} vec3 position;
      ${t.attribute} vec2 textureCoord;

      ${t.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function x$(e){let t=Te(e);return`${t.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${t.varyingFrag} vec2 TexCoords;
    ${t.outputDeclaration}
    const vec2 halfCR = vec2(0.5, 0.5);

    // Custom vector types to handle higher dimenalities.
    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    `}function $$(e,t){let n=Te(e);return`
  void main() {
    int indices[${t}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${n.output} = result;
  }
  `}var Ud,qd,Ke=N(()=>{"use strict";Ud={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},qd={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}}),Oe=N(()=>{"use strict"});async function Gd(e,t=a=>0,n){return new Promise((a,l)=>{let u=0,d=()=>{if(e()){a();return}u++;let p=t(u);setTimeout(d,p)};d()})}function Qo(e){return Rd(typeof e<"u"&&e.length!==0,()=>"empty string found for sampler name"),"get"+e.charAt(0).toUpperCase()+e.slice(1)}function T$(e){return Rd(typeof e<"u"&&e.length!==0,()=>"empty string found for sampler name"),"get"+e.charAt(0).toUpperCase()+e.slice(1)+"AtOutCoords"}function Bn(e,t){let n=JSON.parse(JSON.stringify(e));return n=t,n}function Mn(e,t){return t.map(n=>e[n]).join(", ")}function ir(e){if(e<=1)return"int";if(e===2)return"ivec2";if(e===3)return"ivec3";if(e===4)return"ivec4";if(e===5)return"ivec5";if(e===6)return"ivec6";throw Error(`GPU for rank ${e} is not yet supported`)}function fn(e=6){return["x","y","z","w","u","v"].slice(0,e)}var Xt=N(()=>{"use strict";Ne()});function I$(e,t){return fn(t).map(n=>`${e}.${n}`)}function es(e,t){return t===1?[e]:I$(e,t)}function Fn(){return`
    float getChannel(vec4 frag, int dim) {
      int modCoord = imod(dim, 2);
      return modCoord == 0 ? frag.r : frag.g;
    }

    float getChannel(vec4 frag, vec2 innerDims) {
      vec2 modCoord = mod(innerDims, 2.);
      return modCoord.x == 0. ?
        (modCoord.y == 0. ? frag.r : frag.g) :
        (modCoord.y == 0. ? frag.b : frag.a);
    }
  `}var mn=N(()=>{"use strict";Xt()});function S$(e,t,n){if(e===0)return"false";if(e===1)return`rc > ${t[0]}`;let a="";for(let l=e-2;l<e;l++)a+=`${n[l]} >= ${t[l-e+2]}`,l<e-1&&(a+="||");return a}function O$(e,t){let n=e.length;if(n===0)return"getA(), 0, 0, 0";if(n===1)return`getA(rc),
            rc + 1 >= ${e[0]} ? 0. : getA(rc + 1),
            0, 0`;let a="r, c",l="r, cp1",u="rp1, c",d="rp1, cp1",p="";if(n>2)for(let o=0;o<n-2;++o)p=p+`${t[o]},`;return`getA(${p}${a}),
          rEdge ? 0. : getA(${p}${u}),
          cEdge ? 0. : getA(${p}${l}),
          rEdge || cEdge ? 0. : getA(${p}${d})`}function E$(e,t,n,a){return e===0||e===1?"":`
    int r = ${t[e-2]};
    int c = ${t[e-1]};
    int rp1 = ${t[e-2]} + 1;
    int cp1 = ${t[e-1]} + 1;
    bool rEdge = rp1 >= ${a};
    bool cEdge = cp1 >= ${n};
    `}var ts,Hd,Wd,P$=N(()=>{"use strict";Ke(),Oe(),Xt(),mn(),ts={name:"pack",inputNames:["A"],inputTypes:[1]},Hd=(e,t)=>{let n=Te(e.session.backend.glContext.version),a=t.dims,l=a.length,u=t.dims.length,d=ir(u),p=es("rc",u),o=E$(u,p,a[a.length-2],a[a.length-1]),r;l===0?r=[1,1]:l===1?r=[a[0],1]:r=[a[u-1],a[u-2]];let i=S$(u,r,p),s=O$(a,p),c=`
        void main() {
          ${d} rc = getOutputCoords();

          if(${i}) {
            ${n.output} = vec4(0);
          } else {
            ${o}

            ${n.output} = vec4(${s});
          }
        }
      `;return{...ts,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:2},shaderSource:c}},Wd=(e,t)=>({...ts,get:()=>Hd(e,t)})});function Kd(e){if(e.length===0)return[1,1,1];let t=1;for(let n=0;n<e.length-2;++n)t*=e[n];return[t,e.length>1?e[e.length-2]:1,e[e.length-1]]}function A$(e,t){let n=!1;return e.length===0||t.length===0?n=!0:e.length<2||t.length<2?n=e[e.length-1]===t[t.length-1]:n=e[e.length-1]===t[t.length-1]&&e[e.length-2]===t[t.length-2],n}function k$(e){let t=me.computeStrides(e),n=["b","r","c"],a="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${t.map((l,u)=>{let d=`int ${n[u]} = ${a} / ${l}`,p=u===t.length-1?`int ${n[u+1]} = ${a} - ${n[u]} * ${l}`:`index -= ${n[u]} * ${l}`;return`${d}; ${p};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function D$(e){let t=me.computeStrides(e);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${t[0]} + coords.z * ${t[1]} + coords.y;
  }
`}var Xd,Zd,Jd,N$=N(()=>{"use strict";Ne(),Ke(),Oe(),mn(),Xd=e=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${e}`}),Zd=(e,t,n,a)=>{let l=t.dims,u=a,d="";for(let r=0;r<4;r++){let i="";switch(r){case 0:i="outputCoords = rc;";break;case 1:i="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:i="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:i="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}d+=`
        ${i}
        ${r>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${r}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${r>0?"}":""}
      `}let p=Te(e.session.backend.glContext.version),o=`
      ${k$(l)}
      ${D$(u)}
      ${Fn()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${u[2]};
        int cols = ${u[1]};

        ${d}
        ${p.output} = result;
      }
    `;return{...n,output:{dims:u,type:t.type,textureType:2},shaderSource:o,hasMain:!0}},Jd=(e,t,n)=>{let a=Xd(n);return{...a,get:()=>Zd(e,t,a,n)}}}),rs,C$=N(()=>{"use strict";Ke(),Oe(),rs=(e,t)=>{let n=t.shape,a=Te(e.session.backend.glContext.version),l=`
    const float FLOAT_MAX = 1.70141184e38;
    const float FLOAT_MIN = 1.17549435e-38;

    bool isNaN(float val) {
      return (val < 1.0 || 0.0 < val || val == 0.0) ? false : true;
    }

    highp vec4 encodeAsUint8(highp float v) {
      if (isNaN(v)) {
        return vec4(255, 255, 255, 255);
      }

      highp float av = abs(v);

      if(av < FLOAT_MIN) {
        return vec4(0.0, 0.0, 0.0, 0.0);
      } else if(v > FLOAT_MAX) {
        return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
      } else if(v < -FLOAT_MAX) {
        return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
      }

      highp vec4 c = vec4(0,0,0,0);

      highp float e = floor(log2(av));
      highp float m = exp2(fract(log2(av))) - 1.0;

      c[2] = floor(128.0 * m);
      m -= c[2] / 128.0;
      c[1] = floor(32768.0 * m);
      m -= c[1] / 32768.0;
      c[0] = floor(8388608.0 * m);

      highp float ebias = e + 127.0;
      c[3] = floor(ebias / 2.0);
      ebias -= c[3] * 2.0;
      c[2] += floor(ebias) * 128.0;

      c[3] += 128.0 * step(0.0, -v);

      return c / 255.0;
    }

    void main() {
      float value = ${a.texture2D}(X,TexCoords).r;
      ${a.output} = encodeAsUint8(value);
    }`,u={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:n,type:t.tensor.type,textureType:3},shaderSource:l,hasMain:!0};return e.executeProgram(u,[t.tensor])}});function z$(e,t){if(e===1)return"rc";let n="";for(let a=0;a<e;a++)n+=t[a],a<e-1&&(n+=",");return n}var ns,Yd,Qd,R$=N(()=>{"use strict";Ke(),Oe(),Xt(),mn(),ns={name:"unpack",inputNames:["A"],inputTypes:[2]},Yd=(e,t)=>{let n=t.dims.length,a=es("rc",n),l=a.slice(-2),u=ir(n),d=Fn(),p=t.dims.length===0?"":z$(n,a),o=n<=1?"rc":`vec2(${l.join(",")})`,r=Te(e.session.backend.glContext.version),i=`
    ${d}
    void main() {
      ${u} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${p});

       ${r.output} = vec4(getChannel(packedInput, ${o}), 0, 0, 0);
     }
   `;return{...ns,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:i}},Qd=(e,t)=>({...ns,get:()=>Yd(e,t)})}),ep,is,tp,Ci=N(()=>{"use strict";Dt(),ep=class{constructor(e,t=1){if(t===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=t;else if(t===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=t;else throw new Error(`Invalid number of channels: ${t}`)}encode(e,t){let n,a;return e.constructor!==Float32Array&&(Xe.warning("Encoder","data was not of type Float32; creating new Float32Array"),a=new Float32Array(e)),t*this.channelSize>e.length?(Xe.warning("Encoder","Source data too small. Allocating larger array"),a=e,n=this.allocate(t*this.channelSize),a.forEach((l,u)=>n[u]=l)):(a=e,n=a),n}allocate(e){return new Float32Array(e*4)}decode(e,t){return this.channelSize===1?e.filter((n,a)=>a%4===0).subarray(0,t):e.subarray(0,t)}},is=class{constructor(e,t=1,n){if(t!==1&&t!==4)throw new Error(`Invalid number of channels: ${t}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=t,this.textureType=n||e.FLOAT}encode(e,t){let n=e;return this.channelSize===1&&(Xe.verbose("Encoder","Exploding into a larger array"),n=this.allocate(t),e.forEach((a,l)=>n[l*4]=a)),n}allocate(e){return new Float32Array(e*4)}decode(e,t){return this.channelSize===1?e.filter((n,a)=>a%4===0).subarray(0,t):e.subarray(0,t)}},tp=class{constructor(e,t=1){if(this.channelSize=4,t===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=t;else if(t===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=t;else throw new Error(`Invalid number of channels: ${t}`)}encode(e,t){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,t){if(e instanceof Uint8Array)return e.subarray(0,t);throw new Error(`Invalid array type: ${e.constructor}`)}}}),jn,rp,os,B$=N(()=>{"use strict";Ne(),Oe(),jn=(e,t,n)=>{let a=n===0||n===1?1:4,l=n===2,u=n===1||n===2,d=n===4?t.length-1:void 0,p=n===4?t.map((o,r)=>r===t.length-1?o*4:o):void 0;return os(e,t,a,p,{isPacked:l,reverseWH:u,breakAxis:d})},rp=(e,t,n)=>{let a=jn(e,t,n);return[a.width,a.height]},os=(e,t,n=1,a,l)=>{let u=!!(l&&l.isPacked),[d,p]=e.computeTextureWH(u&&a||t,l),o=t.length,r=t.slice(0);if(o===0&&(r=[1]),n===1)a=t;else if(u){if(n!==4)throw new Error("a packed texture must be 4-channel");a=t,o>0&&(r[o-1]=Math.ceil(r[o-1]/2)),o>1&&(r[o-2]=Math.ceil(r[o-2]/2))}else if(!a)throw new Error("Unpacked shape is needed when using channels > 1");return{width:d,height:p,channels:n,isPacked:u,shape:r,strides:me.computeStrides(r),unpackedShape:a,reversedWH:l&&l.reverseWH}}}),np,ip,M$=N(()=>{"use strict";Dt(),hn(),Ne(),P$(),N$(),C$(),R$(),Ci(),B$(),Oe(),np=(e,t)=>{let n=t.map(l=>`${l.unpackedShape.join(",")};${l.width}x${l.height}`).join("_"),a=e.name;return e.cacheHint&&(a+="["+e.cacheHint+"]"),a+=":"+n,a},ip=class{constructor(e){this.session=e,this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,t){return rp(this.session.layoutStrategy,e,t)}executeProgram(e,t){if(t.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let n=[];for(let o=0;o<e.inputNames.length;++o)n[o]=this.getOrCreateTextureData(t[o],e.inputTypes[o]);let a=np(e,n),l=this.session.programManager.getArtifact(a),u=l?l.programInfo:typeof e.get=="function"?e.get():e,d=jn(this.session.layoutStrategy,u.output.dims,u.output.textureType),p=this.createTextureData(d,u.output.type);return l||(l=this.session.programManager.build(u,n,p),this.session.programManager.setArtifact(a,l)),this.runProgram(l,n,p),p}run(e,t){return this.executeProgram(e,t).tensor}runProgram(e,t,n){for(let a=0;a<t.length;++a)if(!!t[a].isPacked!=(e.programInfo.inputTypes[a]===2))throw new Error(`input[${a}] property packed inconsistent`);if(!!n.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,t,n)}getOrCreateTextureData(e,t){let n=this.getTextureData(e.dataId,t===2);if(!n&&(n=this.getTextureData(e.dataId,t!==2),n))return t===2?this.pack(n):this.unpack(n);if(!n){let a=jn(this.session.layoutStrategy,e.dims,t);if(t===4){let l=e.dims;if(l.length===4){let u=[l[0],Math.ceil(l[1]*l[2]*l[3]/4)],d=jn(this.session.layoutStrategy,u,t),p=e.numberData;if(l[1]*l[2]*l[3]%4!==0){let o=l[0],r=l[1]*l[2]*l[3],i=Math.ceil(r*1/4)*4,s=o*i;p=new Float32Array(s);for(let c=0;c<o;++c){let h=c*r,m=c*i+c%1*r;p.set(e.numberData.subarray(h,h+r),m)}}return this.createTextureData(d,e.type,p,e,1)}}if(t===2){let l=os(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),u=this.createTextureData(l,e.type,e.numberData,e,1);n=this.pack(u)}else n=this.createTextureData(a,e.type,e.numberData,e,1)}return n}createTextureDataFromLayoutBindTensor(e,t,n,a){return this.createTextureData(e,t,n,a,1)}createTextureData(e,t,n,a,l){Xe.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let u=this.session.textureManager.createTextureFromLayout(t,e,n,l);return this.createTextureDataFromTexture(e,t,u,a)}reshapeUnpacked(e,t){let n=this.getOrCreateTextureData(e,0),a={channels:n.channels,height:n.height,width:n.width,shape:t.length!==0?t:[1],strides:me.computeStrides(t),unpackedShape:t};return this.createTextureDataFromTexture(a,e.type,n.texture).tensor}reshapePacked(e,t){let n=this.getOrCreateTextureData(e,2);if(A$(e.dims,t)){let p={channels:n.channels,height:n.height,width:n.width,shape:t.length!==0?t:[1],strides:me.computeStrides(t),unpackedShape:t,isPacked:!0};return this.createTextureDataFromTexture(p,e.type,n.texture).tensor}let a=Kd(e.dims),l=Kd(t),u=this.reshapePacked(e,a),d=this.run(Jd(this,u,l),[u]);return this.reshapePacked(d,t)}cast(e,t){let n=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(n,t,n.texture).tensor}createTextureDataFromTexture(e,t,n,a,l){let u={...e,tensor:a||new gt(e.unpackedShape,t,d=>this.readTexture(u),async d=>this.readTextureAsync(u),void 0,l),texture:n};return this.setTextureData(u.tensor.dataId,u,e.isPacked),u}getTextureData(e,t=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,t):t?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,t,n=!1){this.session.isInitializer(e)?this.session.setTextureData(e,t,n):(n?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,t)}isTextureLayoutCached(e,t=!1){return!!this.getTextureData(e.dataId,t)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(rs(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(rs(this,e))}pack(e){return this.executeProgram(Wd(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(Qd(this,e.tensor),[e.tensor])}}}),op,Le,ot=N(()=>{"use strict";op=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},Le=e=>new op(e)}),ss,sp,ap,up,lp,F$=N(()=>{"use strict";ot(),Ke(),Oe(),ss={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},sp=(e,t,n)=>(lp(t),[e.run({...ss,cacheHint:n.cacheKey,get:()=>up(e,t,n)},t)]),ap=e=>{let t=e.attributes.getFloat("epsilon",1e-5),n=e.attributes.getFloat("momentum",.9),a=e.attributes.getInt("spatial",1);return Le({epsilon:t,momentum:n,spatial:a})},up=(e,t,n)=>{let a=Te(e.session.backend.glContext.version),l=t[0].dims.length,[u,d]=e.calculateTextureWidthAndHeight(t[1].dims,0),p=`
  float process(int[${l}] indices) {
    vec2 position = offsetToCoords(indices[1], ${u}, ${d});
    float scale = getColorAsFloat(${a.texture2D}(Scale, position));
    float mean = getColorAsFloat(${a.texture2D}(Mean, position));
    float variance = getColorAsFloat(${a.texture2D}(Variance, position));
    float b = getColorAsFloat(${a.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${n.epsilon})) ) + b;
  }`;return{...ss,output:{dims:t[0].dims,type:t[0].type,textureType:0},shaderSource:p}},lp=e=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let t=e[0],n=e[1],a=e[2],l=e[3],u=e[4];if(t.dims.length<3||n.dims.length!==1||a.dims.length!==1||l.dims.length!==1||u.dims.length!==1)throw new Error("invalid input shape.");if(n.dims[0]!==t.dims[1]||a.dims[0]!==t.dims[1]||l.dims[0]!==t.dims[1]||u.dims[0]!==t.dims[1])throw new Error("invalid input shape.");if(t.type!=="float32"&&t.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||a.type!=="float32"&&a.type!=="float64"||l.type!=="float32"&&l.type!=="float64"||u.type!=="float32"&&u.type!=="float64")throw new Error("invalid input tensor types.")}}),dp,gn,Q,as,pp,or=N(()=>{"use strict";dp=class{constructor(e,t,n,a){this.glContext=e,this.programInfo=t,this.inputTextureLayouts=n,this.outputTextureLayout=a}},gn=class{constructor(e){this.context=e}},Q=class{constructor(e,t){this.routineBody=e,this.dependencies=t}},as=class{constructor(e,t,n){this.name=e,n?this.dependencies=n:this.dependencies=[],t&&(this.routineBody=t)}addDependency(e){e&&this.dependencies.push(e)}},pp=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let t=new Set,n=new Set,a=new Array;return this.createOrderedNodes(e,t,n,a),a}static createOrderedNodes(e,t,n,a){for(let l=0;l<e.length;++l)this.dfsTraverse(e[l],t,n,a)}static dfsTraverse(e,t,n,a){if(!e||n.has(e.name))return;if(t.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");t.add(e.name);let l=e.dependencies;if(l&&l.length>0)for(let u=0;u<l.length;++u)this.dfsTraverse(l[u],t,n,a);a.push(e),n.add(e.name),t.delete(e.name)}}});function j$(){let e="add_";return{body:`
  float ${e}(float a, float b) {
    return a + b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:e,type:0}}function L$(){let e="div_";return{body:`
  float ${e}(float a, float b) {
    return a / b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:e,type:0}}function V$(){let e="mul_";return{body:`
  float ${e}(float a, float b) {
    return a * b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:e,type:0}}function U$(){let e="sub_";return{body:`
  float ${e}(float a, float b) {
    return a - b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:e,type:0}}function q$(){let e="equal_";return{body:`
  float ${e}(float a, float b) {
    return float(a == b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:e,type:0}}function G$(){let e="greater_";return{body:`
  float ${e}(float a, float b) {
    return float(a > b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:e,type:0}}function H$(){let e="less_";return{body:`
  float ${e}(float a, float b) {
    return float(a < b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:e,type:0}}function W$(){let e="and_";return{body:`
  float ${e}(float a, float b) {
    return float( bool(a) && bool(b) );
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r && b2.r ,
                b1.g && b2.g,
                b1.b && b2.b,
                b1.a && b2.a );
  }
  `,name:e,type:0}}function K$(){return{body:`
  float or_(float a, float b) {
    return float( bool(a) || bool(b) );
  }
  vec4 or_(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r || b2.r ,
                b1.g || b2.g,
                b1.b || b2.b,
                b1.a || b2.a );
  }
  `,name:"or_",type:0}}function X$(){let e="xor_";return{body:`
  float ${e}(float a, float b) {
    return float( bool(a) ^^ bool(b) );
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r ^^ b2.r ,
                b1.g ^^ b2.g,
                b1.b ^^ b2.b,
                b1.a ^^ b2.a );
  }
  `,name:e,type:0}}function Z$(){return Y$("pow")}function J$(){let e="prelu_";return{body:`
  float ${e}(float a, float b) {
    return a < 0.0 ? a * b: a;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4(
      v1.r < 0.0 ? v1.r * v2.r: v1.r,
      v1.g < 0.0 ? v1.g * v2.g: v1.g,
      v1.b < 0.0 ? v1.b * v2.b: v1.b,
      v1.a < 0.0 ? v1.a * v2.a: v1.a
      );
  }
  `,name:e,type:0}}function Y$(e){let t=`${e}_`;return{body:`
  float ${t}(float a, float b) {
    return ${e}(a, b);
  }
  vec4 ${t}(vec4 v1, vec4 v2) {
    return ${e}(v1, v2);
  }
  `,name:t,type:0}}var bt,cp,hp,fp,mp,gp,bp,yp,_p,wp,vp,xp,$p,Tp,Q$=N(()=>{"use strict";Ne(),or(),Ke(),Oe(),bt=(e,t,n,a=t[0].type,l)=>{let u=e.session.pack?2:0;return{name:n.name,inputNames:["A","B"],inputTypes:[u,u],cacheHint:l,get:()=>cp(e,t,n,a)}},cp=(e,t,n,a=t[0].type)=>{let l=e.session.pack?2:0,u=!me.areEqual(t[0].dims,t[1].dims),d=t[0].dims,p=e.session.pack;if(u){let i=Ut.calcShape(t[0].dims,t[1].dims,!1);if(!i)throw new Error("Can't perform binary op on the given tensors");d=i;let s=d.length,c=t[0].dims.length!==0?t[0].dims.length:1,h=t[1].dims.length!==0?t[1].dims.length:1,m=t[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",b=t[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",x=Te(e.session.backend.glContext.version),v=p?`
      ${n.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${n.name}(a, b);
        ${x.output} = result;
      }`:`
      ${n.body}
      float process(int indices[${s}]) {
        int aindices[${c}];
        int bindices[${h}];
        ${m}
        ${b}
        return ${n.name}(_A(aindices), _B(bindices));
      }`;return{name:n.name,inputNames:["A","B"],inputTypes:[l,l],output:{dims:d,type:a,textureType:l},shaderSource:v,hasMain:p}}let o=Te(e.session.backend.glContext.version),r=`
    ${n.body}
    void main() {
      vec4 v1 = ${o.texture2D}(A, TexCoords);
      vec4 v2 = ${o.texture2D}(B, TexCoords);
      vec4 result = ${n.name}(v1, v2);
      ${o.output} = result;
    }
    `;return{name:n.name,inputNames:["A","B"],inputTypes:[l,l],output:{dims:t[0].dims,type:a,textureType:l},shaderSource:r,hasMain:!0}},hp=(e,t)=>[e.run(bt(e,t,j$()),t)],fp=(e,t)=>[e.run(bt(e,t,W$(),"bool"),t)],mp=(e,t)=>[e.run(bt(e,t,L$()),t)],gp=(e,t)=>[e.run(bt(e,t,q$(),"bool"),t)],bp=(e,t)=>[e.run(bt(e,t,G$(),"bool"),t)],yp=(e,t)=>[e.run(bt(e,t,H$(),"bool"),t)],_p=(e,t)=>[e.run(bt(e,t,V$()),t)],wp=(e,t)=>[e.run(bt(e,t,K$(),"bool"),t)],vp=(e,t)=>[e.run(bt(e,t,Z$()),t)],xp=(e,t)=>[e.run(bt(e,t,J$()),t)],$p=(e,t)=>[e.run(bt(e,t,U$()),t)],Tp=(e,t)=>[e.run(bt(e,t,X$(),"bool"),t)]}),Ip,Sp,Op,eT=N(()=>{"use strict";Ne(),Ip=(e,t,n)=>(Op(t),[e.cast(t[0],n)]),Sp=e=>mt.tensorDataTypeFromProto(e.attributes.getInt("to")),Op=e=>{if(!e||e.length!==1)throw new Error("Cast requires 1 input.");if(e[0].type==="string")throw new Error("Invalid input type.")}}),Ep,Pp,Ap,Ln,tT=N(()=>{"use strict";Ke(),Oe(),Xt(),mn(),Ep=(e,t)=>({name:"Concat (packed)",inputNames:Array.from({length:e},(n,a)=>`X${a}`),inputTypes:Array(e).fill(2),cacheHint:t}),Pp=(e,t,n,a)=>{let l=n[0].dims.slice();if(a>=l.length||a<-1*l.length)throw new Error("axis specified for concat doesn't match input dimensionality");a<0&&(a=l.length+a);let u=l.slice(0);for(let E=1;E<n.length;E++){let A=n[E].dims.slice();for(let k=0;k<l.length;k++)if(k===a)u[a]+=A[k];else if(l[k]!==A[k])throw new Error("non concat dimensions must match")}let d=u.length,p=es("coords",d),o=ir(d),r=Fn(),i=n.map(E=>E.dims),s=fn(d),c=new Array(i.length-1);c[0]=i[0][a];for(let E=1;E<c.length;E++)c[E]=c[E-1]+i[E][a];let h=s[a],m=s.slice(-2),b=s.join(),x=`if (${h} < ${c[0]}) {
        return getChannel(
            getX0(${b}), vec2(${m.join()}));
        }`;for(let E=1;E<c.length;E++){let A=c[E-1];x+=`
            if (${h} < ${c[E]}  && ${h} >= ${c[E-1]}) {
              return getChannel(
                getX${E}(${Ln(s,h,A)}),
                vec2(${Ln(m,h,A)}));
            }`}let v=c.length,_=c[c.length-1];x+=`
            return getChannel(
              getX${v}(${Ln(s,h,_)}),
              vec2(${Ln(m,h,_)}));`;let I=Te(e.session.backend.glContext.version),O=`
          ${r}
          float getValue(${s.map(E=>"int "+E)}) {
            ${x}
          }

          void main() {
            ${o} coords = getOutputCoords();
            int lastDim = coords.${s[d-1]};
            coords.${s[d-1]} = coords.${s[d-2]};
            coords.${s[d-2]} = lastDim;

            vec4 result = vec4(getValue(${p}), 0., 0., 0.);

            ${p[d-1]} = ${p[d-1]} + 1;
            if (${p[d-1]} < ${u[d-1]}) {
              result.g = getValue(${p});
            }

            ${p[d-2]} = ${p[d-2]} + 1;
            if (${p[d-2]} < ${u[d-2]}) {
              result.a = getValue(${p});
            }

            ${p[d-1]} = ${p[d-1]} - 1;
            if (${p[d-2]} < ${u[d-2]} &&
                ${p[d-1]} < ${u[d-1]}) {
              result.b = getValue(${p});
            }
            ${I.output} = result;
          }
        `;return{...t,output:{dims:u,type:n[0].type,textureType:2},shaderSource:O,hasMain:!0}},Ap=(e,t,n)=>{let a=Ep(t.length,n.cacheKey);return{...a,get:()=>Pp(e,a,t,n.axis)}},Ln=(e,t,n)=>{let a=e.indexOf(t);return e.map((l,u)=>u===a?`${l} - ${n}`:l).join()}}),kp,Dp,Np,Cp,us,zp,Rp,Bp,Mp,Fp,rT=N(()=>{"use strict";ot(),Oe(),tT(),kp=(e,t,n)=>(Fp(t),e.session.pack&&t[0].dims.length>1?[e.run(Ap(e,t,n),t)]:[e.run(Cp(e,t,n),t)]),Dp=(e,t)=>({name:"Concat",inputNames:Array.from({length:e},(n,a)=>`X${a}`),inputTypes:Array(e).fill(0),cacheHint:t}),Np=(e,t,n,a)=>{let l=n[0].dims.slice();if(a>=l.length||a<-1*l.length)throw new Error("axis specified for concat doesn't match input dimensionality");a<0&&(a=l.length+a);let u=l.slice(0);for(let h=1;h<n.length;h++){let m=n[h].dims.slice();for(let b=0;b<l.length;b++)if(b===a)u[a]+=m[b];else if(l[b]!==m[b])throw new Error("non concat dimensions must match")}let d=u.length,p=new Array(n.length),o=0;for(let h=0;h<p.length;++h)o+=n[h].dims[a],p[h]=o;let r="";n.length<5?r=us(p):r=zp(p);let i=Rp(n.length,d),s=Bp(p),c=`
        ${i}
        ${s}
        ${r}
        float process(int indices[${d}]) {
          int textureIndex = getTextureWhereDataResides (indices[${a}]);

          if(textureIndex != 0) {
            indices[${a}] = indices[${a}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...t,output:{dims:u,type:n[0].type,textureType:0},shaderSource:c}},Cp=(e,t,n)=>{let a=Dp(t.length,n.cacheKey);return{...a,get:()=>Np(e,a,t,n.axis)}},us=e=>`int getTextureWhereDataResides(int index) {
      ${e.map((t,n)=>`if(index<${t}) {return ${n};}
`).join("")}
    }`,zp=e=>us(e),Rp=(e,t)=>{let n=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${t}]) {`];for(let a=0;a<e;++a)a===0?n.push(`	if (textureIndex == ${a}) { return _X${a}(indices); }`):a===e-1?n.push(`	else { return _X${a}(indices); }`):n.push(`	else if (textureIndex == ${a}) { return _X${a}(indices); }`);return n.push("	}"),n.join(`
`)},Bp=e=>{let t=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let n=0;n<e.length;++n)n===0?t.push(`	if (index == ${n}) { return ${e[n]}; }`):n===e.length-1?t.push(`	else { return ${e[n]}; }`):t.push(`	else if (index == ${n}) { return ${e[n]}; }`);return t.push("	}"),t.join(`
`)},Mp=e=>Le({axis:e.attributes.getInt("axis")}),Fp=e=>{if(!e||e.length<1)throw new Error("too few inputs");let t=e[0].type,n=e[0].dims.length;if(t==="string")throw new Error("string tensor is not supported yet");for(let a of e){if(a.type!==t)throw new Error("input tensors should be one type");if(a.dims.length!==n)throw new Error("input tensors should have the same shape")}}});function nT(){return Ot("abs")}function iT(){return Ot("acos")}function oT(){return Ot("asin")}function sT(){return Ot("atan")}function aT(){return Ot("ceil")}function uT(){return Ot("cos")}function lT(e){return{body:`
  const float alpha = float(${e});

  float elu_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 elu_(vec4 v) {
    return vec4(elu_(v.x), elu_(v.y), elu_(v.z), elu_(v.w));
  }
  `,name:"elu",type:0}}function dT(){return Ot("exp")}function pT(){return Ot("floor")}function jp(e,t){let n="clip";return{body:`
  const float min = float(${e});
  const float max = float(${t});

  float ${n}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${n}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:n,type:0}}function cT(){let e="indentity";return{body:`
  float ${e}_(float a) {
    return a;
  }
  vec4 ${e}_(vec4 v) {
    return v;
  }
  `,name:e,type:0}}function hT(e){let t="leakyRelu";return{body:`
  const float alpha = float(${e});

  float ${t}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${t}_(vec4 v) {
    return vec4(${t}_(v.x), ${t}_(v.y), ${t}_(v.z), ${t}_(v.w));
  }
  `,name:t,type:0}}function fT(){return Ot("log")}function mT(){return{body:`
  float neg_(float a) {
    return -a;
  }
  vec4 neg_(vec4 v) {
    return -v;
  }
  `,name:"neg",type:0}}function gT(){return{body:`
  float not_(float a) {
    return float( ! bool(a) );
  }
  bool not_(bool a) {
    return !a;
  }
  vec4 not_(vec4 v) {
    return vec4(!bool(v.x), !bool(v.y), !bool(v.z), !bool(v.w));
  }
  bvec4 not_(bvec4 v) {
    return bvec4(!v.x, !v.y, !v.z, !v.w);
  }
  `,name:"not",type:0}}function bT(){return Ot("sin")}function Lp(){let e="relu";return{body:`
  float ${e}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${e}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:e,type:0}}function Vp(){let e="sigmoid";return{body:`
  float ${e}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${e}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:e,type:0}}function yT(){return Ot("sqrt")}function _T(){return Ot("tan")}function wT(){let e="tanh";return{body:`
  float ${e}_(float a) {
    a = clamp(a, -10., 10.);
    a = exp(2.*a);
    return (a - 1.) / (a + 1.);
  }
  vec4 ${e}_(vec4 v) {
    v = clamp(v, -10., 10.);
    v = exp(2.*v);
    return (v - 1.) / (v + 1.);
  }
  `,name:e,type:0}}function Ot(e){return{body:`
  float ${e}_(float a) {
    return ${e}(a);
  }
  vec4 ${e}_(vec4 v) {
    return ${e}(v);
  }
  `,name:e,type:0}}var Up,Ze,qp,Gp,Hp,Wp,ls,Kp,Xp,Zp,Jp,Yp,Qp,ec,tc,rc,ds,nc,ic,oc,sc,ac,uc,lc,dc,pc,cc,hc,fc=N(()=>{"use strict";ot(),Ne(),or(),Ke(),Oe(),Up=(e,t,n,a)=>{let l=e.session.pack?2:0,u=Te(e.session.backend.glContext.version);return{...t,output:{dims:n.dims,type:n.type,textureType:l},shaderSource:`
     ${a.body}
     void main() {
       vec4 v = ${u.texture2D}(A, TexCoords);
       v = ${a.name}_(v);
       ${u.output} = v;
     }
     `,hasMain:!0}},Ze=(e,t,n,a)=>{let l=e.session.pack?2:0,u={name:n.name,inputTypes:[l],inputNames:["A"],cacheHint:a};return{...u,get:()=>Up(e,u,t,n)}},qp=(e,t)=>[e.run(Ze(e,t[0],nT()),t)],Gp=(e,t)=>[e.run(Ze(e,t[0],iT()),t)],Hp=(e,t)=>[e.run(Ze(e,t[0],oT()),t)],Wp=(e,t)=>[e.run(Ze(e,t[0],sT()),t)],ls=(e,t,n)=>[e.run(Ze(e,t[0],jp(n.min,n.max),n.cacheKey),t)],Kp=e=>Le({min:e.attributes.getFloat("min",zn),max:e.attributes.getFloat("max",Rn)}),Xp=(e,t)=>{let n=Zp(e,t);return ls(e,[t[0]],n)},Zp=(e,t)=>{if(t.length>=3&&(!e.session.isInitializer(t[1].dataId)||!e.session.isInitializer(t[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let n=t.length>=3?t[1].numberData[0]:zn,a=t.length>=3?t[2].numberData[0]:Rn;return Le({min:n,max:a})},Jp=(e,t)=>[e.run(Ze(e,t[0],aT()),t)],Yp=(e,t)=>[e.run(Ze(e,t[0],uT()),t)],Qp=(e,t,n)=>[e.run(Ze(e,t[0],lT(n.alpha),n.cacheKey),t)],ec=e=>Le({alpha:e.attributes.getFloat("alpha",1)}),tc=(e,t)=>[e.run(Ze(e,t[0],dT()),t)],rc=(e,t)=>[e.run(Ze(e,t[0],pT()),t)],ds=(e,t)=>[e.run(Ze(e,t[0],cT()),t)],nc=(e,t,n)=>[e.run(Ze(e,t[0],hT(n.alpha),n.cacheKey),t)],ic=e=>Le({alpha:e.attributes.getFloat("alpha",.01)}),oc=(e,t)=>[e.run(Ze(e,t[0],fT()),t)],sc=(e,t)=>[e.run(Ze(e,t[0],mT()),t)],ac=(e,t)=>[e.run(Ze(e,t[0],gT()),t)],uc=(e,t)=>[e.run(Ze(e,t[0],Lp()),t)],lc=(e,t)=>[e.run(Ze(e,t[0],Vp()),t)],dc=(e,t)=>[e.run(Ze(e,t[0],bT()),t)],pc=(e,t)=>[e.run(Ze(e,t[0],yT()),t)],cc=(e,t)=>[e.run(Ze(e,t[0],_T()),t)],hc=(e,t)=>[e.run(Ze(e,t[0],wT()),t)]});function Vn(e){let t;switch(e.activation){case"Relu":t=Lp();break;case"Sigmoid":t=Vp();break;case"Clip":t=jp(e.clipMin,e.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let n=t.name,a=t.body,l=`value = ${n}_(value);`;return{activationFunction:a,applyActivation:l}}var zi,bn=N(()=>{"use strict";Ne(),fc(),zi=e=>{let t=e.getString("activation","");if(t==="Clip"){let[n,a]=e.getFloats("activation_params",[zn,Rn]);return{activation:t,clipMax:a,clipMin:n,activationCacheKey:`${t}:${n},${a}`}}return{activation:t,activationCacheKey:t}}}),mc,gc,bc,vT=N(()=>{"use strict";Dt(),Ke(),Oe(),gs(),bn(),mc=(e,t)=>({name:"GroupedConv",inputNames:e?["X","W","Bias"]:["X","W"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),gc=(e,t,n,a)=>{let l=t.length>2?"value += getBias(output_channel);":"",u=t[0].dims.slice(),d=t[1].dims.slice(),p=d[0]/a.group;Xe.verbose("GroupedConv",`autpPad:${a.autoPad}, dilations:${a.dilations}, group:${a.group}, kernelShape:${a.kernelShape}, pads:${a.pads}, strides:${a.strides}`);let o=Un(u,d,a.dilations,a.pads,a.strides),r=Te(e.session.backend.glContext.version),{activationFunction:i,applyActivation:s}=Vn(a),c=`
  const ivec2 strides = ivec2(${a.strides[0]}, ${a.strides[1]});
  const ivec2 pads = ivec2(${a.pads[0]}, ${a.pads[1]});
  ${i}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;
    ivec2 xRCCorner = coords.zw * strides - pads;
    int group_id = output_channel / ${p};

    float value = 0.0;
    for (int wInChannel = 0; wInChannel < ${d[1]}; wInChannel++) {
      int input_channel = group_id * ${d[1]} + wInChannel;
      for (int wHeight = 0; wHeight < ${d[2]}; wHeight++) {
        int xHeight = xRCCorner.x + wHeight * ${a.dilations[0]};

        if (xHeight < 0 || xHeight >= ${u[2]}) {
          continue;
        }

        for (int wWidth = 0; wWidth < ${d[3]}; wWidth++) {
          int xWidth = xRCCorner.y + wWidth * ${a.dilations[1]};
          if (xWidth < 0 || xWidth >= ${u[3]}) {
            continue;
          }

          float xVal = getX(batch, input_channel, xWidth, xHeight);
          float wVal = getW(output_channel, wInChannel, wWidth, wHeight);
          value += xVal*wVal;
        }
      }
    }
    ${l}
    ${s}
    ${r.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:o,type:t[0].type,textureType:0},shaderSource:c,hasMain:!0}},bc=(e,t,n)=>{let a=mc(t.length>2,n.cacheKey);return{...a,get:()=>gc(e,t,a,n)}}}),yc,_c,wc,xT=N(()=>{"use strict";Ke(),Oe(),mn(),yc=e=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:e}),_c=(e,t,n,a,l,u)=>{let d=n.dims,p=a.dims,o=2,r=3,i=l.length,s=[p[1]*p[2]*p[3],l[2]*l[3]],c=p[2]*p[3],h=Fn(),m=Te(e.session.backend.glContext.version),b="";for(let v=0;v<=1;v++)for(let _=0;_<=1;_++)b+=`
            blockIndex = rc.x + ${_};
            pos = rc.y + ${v};

            if(blockIndex < ${s[1]} && pos < ${s[0]}) {
              offsetY = int(blockIndex / (${l[i-1]})) * ${u.strides[0]} -
                ${u.pads[0]};
              d0 = offsetY + ${u.dilations[0]} * (imod(pos, ${c}) / ${p[2]});

              if(d0 < ${d[o]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${l[i-1]}) * ${u.strides[1]} -
                  ${u.pads[1]};
                d1 = offsetX + ${u.dilations[1]} * imod(imod(pos, ${c}), ${p[2]});

                if(d1 < ${d[r]} && d1 >= 0) {

                  ch = int(float(pos)/ ${c}.);
                    innerDims = vec2(d0, d1);
                    result[${v*2+_}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let x=`
      ${h}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${b}
          ${m.output} = result;
      }
            `;return{...t,output:{dims:s,type:n.type,textureType:2},shaderSource:x,hasMain:!0}},wc=(e,t,n,a,l)=>{let u=yc(l.cacheKey);return{...u,get:()=>_c(e,u,t,n,a,l)}}});function $T(e,t,n){let a=t[0].dims,l=t[1].dims,u=Ut.calcShape(a,l,!0);if(!u)throw new Error("Can't use matmul on the given tensors");let d=ir(u.length),p=fn(),{activationFunction:o,applyActivation:r}=Vn(n),i=t.length>2,s=i?"value += getBiasForMatmul();":"",c=i?`${xc(d,p,t[2].dims,u,!1)}`:"",h=u.length,m=a.length,b=l.length,x=a[a.length-1],v=`
    ${o}
    ${c}
    float process(int indices[${h}]) {
        int a[${m}];
        int b[${b}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${x}; ++k) {
            a[${m-1}] = k;
            b[${b-2}] = k;
            value += _A(a) * _B(b);
        }
        ${s}
        ${r}
        return value;
    }`;return{...e,output:{dims:u,type:t[0].type,textureType:0},shaderSource:v}}function vc(e,t){let n=Ic(e.length>2,t.activationCacheKey);return{...n,get:()=>$T(n,e,t)}}function xc(e,t,n,a,l){let u="",d=n.length,p=a.length,o=p-d;p<2&&d>0?u="coords":u=n.map((c,h)=>`coords.${t[h+o]}`).join(", ");let r=Ut.getBroadcastDims(n,a).map(c=>`coords.${t[c+o]} = 0;`).join(`
`),i=me.size(n)===1,s="vec4(outputValue.xx, outputValue.yy)";return i&&(s="vec4(outputValue.x)"),l?`
vec4 getBiasForMatmul() {
  ${e} coords = getOutputCoords();
  ${r}
  vec4 outputValue = getBias(${u});
  return ${s};
}`:`
float getBiasForMatmul() {
  ${e} coords = getOutputCoords();
  ${r}
  return getBias(coords.x);
}`}var $c,Tc,Ic,Sc,ps=N(()=>{"use strict";Ne(),Oe(),Xt(),bn(),Pc(),$c=(e,t,n)=>(Sc(t),e.session.pack?[e.run(cs(e,t,n),t)]:[e.run(vc(t,n),t)]),Tc=e=>zi(e.attributes),Ic=(e,t)=>({name:"MatMul",inputNames:e?["A","B","Bias"]:["A","B"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),Sc=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.");if(e[0].type!=="float32"&&e[0].type!=="float64"||e[1].type!=="float32"&&e[1].type!=="float64")throw new Error("inputs should be float type");if(e[0].type!==e[1].type)throw new Error("inputs types should match")}});function TT(e,t,n,a){let l=[],u=[],d=n[0].dims,p=n[1].dims,o=d.length,r=p.length,i=a.length,s=i-o,c=i-r;l=d.map((_,I)=>`coords.${t[I+s]}`),l[o-1]="i*2",l.join(", "),u=p.map((_,I)=>`coords.${t[I+c]}`),u[r-2]="i*2",u.join(", ");let h=Ut.getBroadcastDims(d,a),m=Ut.getBroadcastDims(p,a),b=h.map(_=>`coords.${t[_+s]} = 0;`).join(`
`),x=m.map(_=>`coords.${t[_+c]} = 0;`).join(`
`),v=`int lastDim = coords.${t[i-1]};
  coords.${t[i-1]} = coords.${t[i-2]};
  coords.${t[i-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${e} coords = getOutputCoords();
  ${v}
  ${b}
  vec4 outputValue = getA(${l});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${e} coords = getOutputCoords();
  ${v}
  ${x}
  vec4 outputValue = getB(${u});
  return outputValue;
}`}function IT(e,t){let n="";for(let a=0;a<t-2;a++)n+=`rc.${e[a]}, `;return n+=`rc.${e[t-2]}, i*2`,n}function ST(e,t){let n="";for(let a=0;a<t-2;a++)n+=`rc.${e[a]}, `;return n+=`i*2, rc.${e[t-1]}`,n}var Oc,Ec,cs,Pc=N(()=>{"use strict";Ne(),Ke(),Oe(),Xt(),bn(),ps(),Oc=(e,t)=>({name:"MatMul (packed)",inputNames:e?["A","B","Bias"]:["A","B"],inputTypes:e?[2,2,2]:[2,2],cacheHint:t}),Ec=(e,t,n,a)=>{let l=n.length>2,u=l?"value += getBiasForMatmul();":"",d=n[0].dims,p=n[1].dims,o=Ut.calcShape(d,p,!0),r=!me.areEqual(n[0].dims,n[1].dims);if(!o)throw new Error("Can't use matmul on the given tensors");let i=d[d.length-1],s=Math.ceil(i/2),c=d.length,h=p.length,m=Te(e.session.backend.glContext.version),b=ir(o.length),x=o.length,v=fn(),{activationFunction:_,applyActivation:I}=Vn(a),O=l?`${xc(b,v,n[2].dims,o,!0)}`:"",E=r?`${TT(b,v,n,o)}`:"",A=r?"getAAtOutCoordsMatmul(i)":`getA(${IT(v,c)})`,k=r?"getBAtOutCoordsMatmul(i)":`getB(${ST(v,h)})`,T=r?"":`${b} rc =
          getOutputCoords(); int lastDim = rc.${v[x-1]}; rc.${v[x-1]} =
          rc.${v[x-2]}; rc.${v[x-2]} = lastDim;
      `,M=`
            ${E}
            ${O}
            ${_}
            void main() {
              ${T}

              vec4 value = vec4(0);
              for (int i = 0; i < ${s}; i++) {
                vec4 a = ${A};
                vec4 b = ${k};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${u}
              ${I}
              ${m.output} = value;
            }`;return{...t,output:{dims:o,type:n[0].type,textureType:2},shaderSource:M,hasMain:!0}},cs=(e,t,n)=>{let a=Oc(t.length>2,n.activationCacheKey);return{...a,get:()=>Ec(e,a,t,n)}}}),Ac,OT=N(()=>{"use strict";gs(),xT(),Pc(),Ac=(e,t,n)=>{let a=t[0].dims,l=t[1].dims,u=Un(a,l,n.dilations,n.pads,n.strides),d=e.run(wc(e,t[0],t[1],u,n),[t[0]]),p=e.reshapePacked(t[1],[l[0],l[1]*l[2]*l[3]]),o=t.length===3?[p,d,t[2]]:[p,d],r=e.run(cs(e,o,n),o);return e.reshapePacked(r,u)}}),kc,Dc,Nc,hs,Cc=N(()=>{"use strict";Oe(),kc=e=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:e}),Dc=(e,t,n,a,l,u)=>{let d=n.dims,p=a.dims,o=l.length,r=hs(d,p,l,4),i=`
        const int XC = ${d[1]};
        const int XH = ${d[2]};
        const int XW = ${d[3]};
        const int KH = ${u.kernelShape[0]};
        const int KW = ${u.kernelShape[1]};
        const int dilationH = ${u.dilations[0]};
        const int dilationW = ${u.dilations[1]};
        const int strideH = ${u.strides[0]};
        const int strideW = ${u.strides[1]};
        const int padH = ${u.pads[0]};
        const int padW = ${u.pads[1]};
        const int KHKW = KH*KW;
        const int XCKHKW = XC * KHKW;
        const int outputChannels = 4;
        vec4 process(int indices[${o}]) {
          int b  = indices[0]; // batch size
          int oh = indices[1] * strideH - padH; //output height
          int ow = indices[2] * strideW - padW; //output width
          int p = indices[3] * outputChannels; //patch
          vec4 value = vec4(0.0);
          for(int i=0; i < outputChannels; ++i) {
            if(p < XCKHKW) {
              int patchC = p / KHKW;
              int patchH = (p - patchC*KHKW) / KW;
              int patchW = (p - patchC*KHKW) - patchH * KW;
              int xh2 = oh + patchH * dilationH;
              int xw2 = ow + patchW * dilationW;
              int x[${d.length}];
              x[0] = b;
              x[1] = patchC;
              x[2] = xh2;
              x[3] = xw2;
              if(xh2 >= 0 &&
                  xh2 < XH &&
                  xw2 >= 0 &&
                  xw2 < XW) {
                value[i] = _X(x);
              }
            }
            ++p;
          }
          return value;
        }
        `;return{...t,output:{dims:r,type:n.type,textureType:4},shaderSource:i}},Nc=(e,t,n,a,l)=>{let u=kc(l.cacheKey);return{...u,get:()=>Dc(e,u,t,n,a,l)}},hs=(e,t,n,a=4)=>[n[0],n[2],n[3],Math.ceil(e[1]*t[2]*t[3]/a)]}),zc,Rc,Bc,ET=N(()=>{"use strict";Ne(),Ke(),Oe(),bn(),Cc(),zc=(e,t)=>({name:"ConvDotProduct",inputNames:e?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:e?[0,4,0]:[0,4],cacheKey:t.activationCacheKey}),Rc=(e,t,n,a,l)=>{let u=n[0].dims,d=n[1].dims,p=[d[0],Math.ceil(u[1]*d[2]*d[3]/4)],o=hs(u,d,a),[r,i]=e.calculateTextureWidthAndHeight(p,4),s=me.computeStrides(o),[c,h]=e.calculateTextureWidthAndHeight(o,4),m=a.length,b=n.length<3?"0.0":"_B(b)",x=Math.ceil(u[1]*d[2]*d[3]/4),{activationFunction:v,applyActivation:_}=Vn(l),I=Te(e.session.backend.glContext.version),O=`
${v}
float process(int indices[${m}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${s[0]} + im2col[1] * ${s[1]} + im2col[2] * ${s[2]};
  int kernelOffset = indices[1] * ${p[1]};
  float value = ${b};
  for (int i = 0; i < ${x}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${c}, ${h});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${r}, ${i});
    value += dot(${I.texture2D}(Im2Col, im2colCoords), ${I.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${_}
  return value;
}`;return{...t,output:{dims:a,type:n[0].type,textureType:0},shaderSource:O}},Bc=(e,t,n,a)=>{let l=zc(t.length>2,a);return{...l,get:()=>Rc(e,l,t,n,a)}}}),Un,fs,Mc,Fc,jc,Lc,ms,Vc,gs=N(()=>{"use strict";ot(),Ne(),vT(),OT(),ET(),bn(),Cc(),ps(),Un=(e,t,n,a,l)=>{let u=e[0],d=e.slice(2),p=d.length,o=t[0],r=t.slice(2).map((s,c)=>s+(s-1)*(n[c]-1)),i=d.map((s,c)=>s+a[c]+a[c+p]).map((s,c)=>Math.floor((s-r[c]+l[c])/l[c]));return[u,o].concat(...i)},fs=(e,t,n)=>(Vc(t,n),Mc(e,t,n)),Mc=(e,t,n)=>{let a=Lc(n,t),l=e.session.pack,u=a.kernelShape[0]===1&&a.kernelShape[1]===1;return a.group>1?[e.run(bc(e,t,a),t)]:u&&l?[Fc(e,t,a)]:l&&t[0].dims.length===4&&t[0].dims[0]===1&&!u?[Ac(e,t,a)]:[jc(e,t,a)]},Fc=(e,t,n)=>{let a=t[0].dims,l=t[1].dims,u=Un(a,l,n.dilations,n.pads,n.strides),d=e.reshapeUnpacked(t[0],[a[1],a[2]*a[3]]),p=e.reshapeUnpacked(t[1],[l[0],l[1]]),o=t.length>2?[p,d,t[2]]:[p,d],r=e.run(vc(o,n),o);return e.reshapeUnpacked(r,u)},jc=(e,t,n)=>{let a=t[0].dims,l=t[1].dims,u=Un(a,l,n.dilations,n.pads,n.strides),d=e.run(Nc(e,t[0],t[1],u,n),[t[0]]),p=t.length===3?[d,t[1],t[2]]:[d,t[1]];return e.run(Bc(e,t,u,n),p)},Lc=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0)for(let u=2;u<t[1].dims.length;++u)n.push(t[1].dims[u]);let a=e.pads.slice();Ni.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,a,e.autoPad);let l=Object.assign({},e);return Object.assign(l,{kernelShape:n,pads:a,cacheKey:e.cacheKey}),l},ms=e=>{let t=e.attributes,n=zi(t),a=t.getString("auto_pad","NOTSET"),l=t.getInts("dilations",[1,1]),u=t.getInt("group",1),d=t.getInts("kernel_shape",[]),p=t.getInts("pads",[0,0,0,0]),o=t.getInts("strides",[1,1]);return Le({autoPad:a,dilations:l,group:u,kernelShape:d,pads:p,strides:o,...n})},Vc=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4||e[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=e[0].dims[1],a=e[1].dims[1]*t.group;if(n!==a)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let l=e[0].dims.length-2;if(t.dilations.length!==l)throw new Error(`dilations should be ${l}D`);if(t.strides.length!==l)throw new Error(`strides should be ${l}D`);if(t.pads.length!==l*2)throw new Error(`pads should be ${l*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(e[0].type!=="float32"||e[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(e.length===3&&e[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}}),Uc,qc,Gc,Hc,Wc,Kc,Xc,Zc,Jc,Yc,Qc,eh,PT=N(()=>{"use strict";ot(),Ke(),Oe(),bn(),Uc=(e,t,n,a,l,u)=>(e-1)*t+n+(a-1)*l+1-u,qc=(e,t,n,a,l)=>{let u=Math.floor(e/2);t==="SAME_UPPER"?(n[a]=u,n[l]=e-u):t==="SAME_LOWER"&&(n[a]=e-u,n[l]=u)},Gc=(e,t,n,a,l,u,d,p)=>{let o=e.length-2,r=p.length===0;for(let i=0;i<o;++i){let s=r?e[i+2]*u[i]:p[i],c=Uc(e[i+2],u[i],l[i],t[i],n[i],s);qc(c,a,l,i,i+o),r&&p.push(u[i]*(e[i+2]-1)+d[i]+(t[i]-1)*n[i]+1-l[i]-l[i+o])}},Hc=(e,t,n)=>(eh(t,n),Wc(e,t,n)),Wc=(e,t,n)=>{let a=Yc(n,t);return[Jc(e,t,a)]},Kc=(e,t)=>({name:"ConvTranspose",inputNames:e?["X","W","B"]:["X","W"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),Xc=(e,t,n,a)=>{let l=t.length>2?"getB(output_channel)":"0.0",u=t[0].dims,d=t[1].dims,p=d[1],o=d[0]/a.group,r=[t[0].dims[0],t[1].dims[1]*a.group,...a.outputShape],i=Te(e.session.backend.glContext.version),{activationFunction:s,applyActivation:c}=Vn(a),h=`
  const ivec2 strides = ivec2(${a.strides[0]}, ${a.strides[1]});
  const ivec2 pads = ivec2(${a.pads[0]}, ${a.pads[1]});
  ${s}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;

    ivec2 loc = coords.zw + pads;

    int group_id = output_channel / ${p};
    int wOutChannel = output_channel - group_id * ${p};

    float value = ${l};
    for (int inChannelOffset = 0; inChannelOffset < ${o}; inChannelOffset++) {
      int input_channel = group_id * ${o} + inChannelOffset;
      for (int wWOff = 0; wWOff < ${d[2]}; wWOff++) {
        for (int wHOff = 0; wHOff < ${d[3]}; wHOff++) {
          ivec2 wOff = ivec2(wWOff * ${a.dilations[0]}, wHOff * ${a.dilations[1]});
          ivec2 wLoc = loc - wOff;
          ivec2 wLocIn = wLoc / strides;
          if (
            wLocIn * strides == wLoc &&
            wLocIn.x >= 0 && wLocIn.x < ${u[2]} &&
            wLocIn.y >= 0 && wLocIn.y < ${u[3]}
          ) {
            float xVal = getX(batch, input_channel, wLocIn.y, wLocIn.x);
            float wVal = getW(input_channel, wOutChannel, wHOff, wWOff);
            value += xVal * wVal;
          }
        }
      }
    }
    ${c}
    ${i.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:r,type:t[0].type,textureType:0},shaderSource:h,hasMain:!0}},Zc=(e,t,n)=>{let a=Kc(t.length>2,n.cacheKey);return{...a,get:()=>Xc(e,t,a,n)}},Jc=(e,t,n)=>e.run(Zc(e,t,n),t),Yc=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0)for(let p=2;p<t[1].dims.length;++p)n.push(t[1].dims[p]);let a=e.pads.slice(),l=e.outputShape.slice(),u=t[0].dims;Gc(u,n,e.dilations,e.autoPad,a,e.strides,e.outputPadding,l);let d=Object.assign({},e);return Object.assign(d,{kernelShape:n,pads:a,outputShape:l,cacheKey:e.cacheKey}),d},Qc=e=>{let t=e.attributes,n=zi(t),a=t.getString("auto_pad","NOTSET"),l=t.getInts("dilations",[1,1]),u=t.getInt("group",1),d=t.getInts("kernel_shape",[]),p=t.getInts("output_padding",[0,0]),o=t.getInts("output_shape",[]),r=t.getInts("pads",[0,0,0,0]),i=t.getInts("strides",[1,1]);return Le({autoPad:a,dilations:l,group:u,kernelShape:d,outputPadding:p,outputShape:o,pads:r,strides:i,...n})},eh=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4||e[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=e[0].dims[1],a=e[1].dims[0];if(n!==a)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let l=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==l))throw new Error("invalid bias");let u=e[0].dims.length-2;if(t.dilations.length!==u)throw new Error(`dilations should be ${u}D`);if(t.strides.length!==u)throw new Error(`strides should be ${u}D`);if(t.pads.length!==u*2)throw new Error(`pads should be ${u*2}D`);if(t.outputPadding.length!==u)throw new Error(`output_padding should be ${u}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape");if(e[0].type!=="float32"||e[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(e.length===3&&e[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}}),bs,qn,th,rh,ys,nh,ih,oh,_s=N(()=>{"use strict";ot(),Ne(),Oe(),bs={name:"Transpose",inputNames:["A"],inputTypes:[0]},qn=(e,t,n)=>(oh(t),[e.run({...bs,cacheHint:n.cacheKey,get:()=>rh(e,t[0],n.perm)},t)]),th=e=>Le({perm:e.attributes.getInts("perm",[])}),rh=(e,t,n)=>{let a=t.dims;n=ys(a,n);let l=nh(a,n),u=a.length,d=`
      ${ih("perm",n,u)}
      float process(int indices[${u}]) {
        int a[${u}];
        perm(a, indices);
        return _A(a);
      }`;return{...bs,output:{dims:l,type:t.type,textureType:0},shaderSource:d}},ys=(e,t)=>(t&&t.length!==e.length&&(t=[...e.keys()].reverse()),t),nh=(e,t)=>(t=ys(e,t),me.sortBasedOnPerm(e,t)),ih=(e,t,n)=>{let a=[];a.push(`void ${e}(out int a[${n}], int src[${n}]) {`);for(let l=0;l<n;++l)a.push(`	a[${t[l]}]=src[${l}];`);return a.push("	}"),a.join(`
`)},oh=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("input should be float tensor")}}),sh,ah,uh,AT=N(()=>{"use strict";_s(),sh=(e,t,n)=>{uh(t);let a=n.blocksize,l=a*a,u=n.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],d=n.mode==="DCR"?[t[0].dims[0],a,a,t[0].dims[1]/l,t[0].dims[2],t[0].dims[3]]:[t[0].dims[0],t[0].dims[1]/l,a,a,t[0].dims[2],t[0].dims[3]],p=e.reshapeUnpacked(t[0],d),o={perm:u,cacheKey:`${u}`},[r]=qn(e,[p],o),i=[t[0].dims[0],t[0].dims[1]/l,t[0].dims[2]*a,t[0].dims[3]*a];return[e.reshapeUnpacked(r,i)]},ah=e=>{let t=e.attributes.getInt("blocksize");if(t<1)throw new Error(`blocksize must be >= 1, but got : ${t} for DepthToSpace`);let n=e.attributes.getString("mode","DCR");if(n!=="DCR"&&n!=="CRD")throw new Error(`unrecognized mode: ${n} for DepthToSpace`);return{mode:n,blocksize:t}},uh=e=>{if(e.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${e.length}`);if(e[0].type==="string"||e[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}}),lh,dh,ph,kT=N(()=>{"use strict";Ne(),lh=(e,t,n)=>{ph(t,n);let a=me.flattenShape(t[0].dims,n);return[e.reshapeUnpacked(t[0],a)]},dh=e=>e.attributes.getInt("axis",1),ph=(e,t)=>{if(!e||e.length!==1)throw new Error("Flatten requires 1 input.");let n=e[0].dims.length;if(n===0)throw new Error("scalar tensor is not supported.");if(t<-n||t>n)throw new Error("Invalid axis");if(e[0].type==="string")throw new Error("string tensor is not supported.")}}),Gn,Ri=N(()=>{"use strict";Gn=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]}),ch,hh,fh,mh,gh,bh,DT=N(()=>{"use strict";ot(),Ri(),Ne(),Oe(),ch=(e,t,n)=>(bh(t,n.axis),[e.run(gh(e,t,n),t)]),hh=e=>Le({axis:e.attributes.getInt("axis",0)}),fh={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},mh=(e,t,n,a)=>{let l=n[0].dims.slice(),u=n[1].dims.slice(),d=new Array(l.length+u.length-1);a=me.normalizeAxis(a,l.length);let p=[];for(let c=0;c<d.length;c++)c<a?(d[c]=l[c],p.push(`inputIdx[${c}] = outputIdx[${c}];`)):c<a+u.length?(d[c]=u[c-a],p.push(`indexDataIdx[${c-a}] = outputIdx[${c}];`)):(d[c]=l[c-u.length+1],p.push(`inputIdx[${c-u.length+1}] = outputIdx[${c}];`));let o=d.length||1,r=l.length,i=u.length||1,s=`
      float process(int outputIdx[${o}]) {
        int inputIdx[${r}];
        int indexDataIdx[${i}];
        indexDataIdx[0] = 0;
        ${p.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${a}] = idx < 0 ? idx + ${l[a]} : idx;
        return _A(inputIdx);
      }`;return{...t,output:{dims:d,type:n[0].type,textureType:0},shaderSource:s}},gh=(e,t,n)=>{let a={...fh,cacheHint:n.cacheKey};return{...a,get:()=>mh(e,a,t,n.axis)}},bh=(e,t)=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.");let n=e[0].dims.length;if(n<1)throw new Error("Invalid input shape.");if(t<-n||t>n-1)throw new Error("Invalid axis.");if(Gn.indexOf(e[0].type)===-1)throw new Error("Invaid input type.");if(e[1].type!=="int32"&&e[1].type!=="int16")throw new Error("Invaid input type.")}}),ws,vs,yh,_h,wh,vh,xh,NT=N(()=>{"use strict";ot(),Ne(),Oe(),ws=(e,t,n)=>(xh(t,n),[e.run(wh(t,n),t)]),vs=(e,t)=>{let n=e.attributes.getInt("transA",0)!==0,a=e.attributes.getInt("transB",0)!==0,l=e.attributes.getFloat("alpha",1),u=e.attributes.getFloat("beta",1);return Le({transA:n,transB:a,alpha:l,beta:u,isOptionalC:t})},yh=e=>vs(e,!1),_h=e=>vs(e,!0),wh=(e,t)=>{let n={name:"Gemm",inputNames:e.length===3?["A","B","C"]:["A","B"],inputTypes:e.length===3?[0,0,0]:[0,0],key:t.cacheKey};return{...n,get:()=>vh(n,e,t)}},vh=(e,t,n)=>{let a=t[0].dims.slice(),l=t[1].dims.slice(),[u,d]=Md.getShapeOfGemmResult(a,n.transA,l,n.transB,t.length===3?t[2].dims:void 0),p=[u,d];if(!p)throw new Error("Can't use gemm on the given tensors");let o=a[a.length-1],r="";n.transA&&(o=a[0]),n.transA&&n.transB?r="value += _A_T(a) * _B_T(b);":n.transA&&!n.transB?r="value += _A_T(a) * _B(b);":!n.transA&&n.transB?r="value += _A(a) * _B_T(b);":!n.transA&&!n.transB&&(r="value += _A(a) * _B(b);");let i=p.length,s=t.length===3?`int c[${t[2].dims.length}];`:"",c=t.length===3?"bcastIndices_C(indices, c);":"",h=t.length===3?"value += beta * _C(c);":"",m=`
      float process(int indices[${i}]) {
          int a[${i}];
          int b[${i}];
          ${s}

          copyVec(indices, a);
          copyVec(indices, b);
          ${c}

          float value = 0.0;
          for (int k=0; k<${o}; ++k) {
              a[${i-1}] = k;
              b[${i-2}] = k;
              ${r}
          }

          value = value * alpha;
          ${h}
          return value;
      }`;return{...e,output:{dims:p,type:t[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:n.alpha},{name:"beta",type:"float",data:n.beta}],shaderSource:m}},xh=(e,t)=>{if(!e)throw new Error("Input is missing");if(t.isOptionalC&&(e.length<2||e.length>3))throw new Error("Invaid input shape.");if(!t.isOptionalC&&e.length!==3)throw new Error("Gemm requires 3 inputs");if(e.length===3&&e[2].dims.length!==1&&e[2].dims.length!==2)throw new Error("Invalid input shape of C");if(e[0].type!=="float32"&&e[0].type!=="float64"||e[1].type!=="float32"&&e[1].type!=="float64"||e.length===3&&e[2].type!=="float32"&&e[2].type!=="float64")throw new Error("Invalid input type.");if(e[0].type!==e[1].type||e.length===3&&e[0].type!==e[2].type)throw new Error("Input types are mismatched")}}),$h,Th,Ih,Sh,Oh,Eh,Ph,CT=N(()=>{"use strict";ot(),Oe(),$h=(e,t,n)=>(Ph(t),[e.run(Oh(e,t,n),t)]),Th=e=>{let t=e.attributes.getFloat("scale"),n=e.attributes.getFloats("bias");return Le({scale:t,bias:n})},Ih={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},Sh=(e,t,n,a)=>{let l=n[0].dims.slice(),u=l.length,d=`
      ${Eh(a.bias.length)}
      float process(int indices[${u}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...t,output:{dims:l,type:n[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:a.bias.length,data:a.bias},{name:"scale",type:"float",data:a.scale}],shaderSource:d}},Oh=(e,t,n)=>{let a={...Ih,cacheHint:n.cacheKey};return{...a,get:()=>Sh(e,a,t,n)}},Eh=e=>{let t=[`float getBias(float bias[${e}], int channel) {`];for(let n=0;n<e;++n)n===0?t.push(`	if (channel == ${n}) { return bias[${n}]; }`):n===e-1?t.push(`	else { return bias[${n}]; }`):t.push(`	else if (channel == ${n}) { return bias[${n}]; }`);return t.push("	}"),t.join(`
`)},Ph=e=>{if(!e||e.length!==1)throw new Error("ImageScaler requires 1 input.");if(e[0].dims.length!==4)throw new Error("Invalid input shape.");if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("Invalid input type.")}}),Ah,kh,xs,Dh,Nh,Ch,zh,Rh,Bh,zT=N(()=>{"use strict";Ke(),Oe(),Ah=(e,t,n)=>{Bh(t);let a=e.run(Nh(t[0]),t);return[e.run(Rh(e,t[0],n,a.dims),[t[0],a,t[1],t[2]])]},kh=e=>e.attributes.getFloat("epsilon",1e-5),xs={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},Dh=(e,t)=>{let n=t.dims.slice(),a=n[1],l=n[2]*n[3],u=[n[0],a],d=`
      vec4 process(int[2] indices) {
        vec4 v = vec4(0.0);
        int a[4];
        a[0] = indices[0];
        a[1] = indices[1];
        float temp = 0.0;
        for(int a2=0; a2<${n[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${n[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += x;
          }
        }
        float mean = temp / float(${l});
        temp = 0.0;
        for(int a2=0; a2<${n[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${n[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += (x - mean) * (x - mean);
          }
        }
        v.r = mean;
        v.g = temp / float(${l});

        return v;
      }`;return{...e,output:{dims:u,type:t.type,textureType:4},shaderSource:d}},Nh=e=>({...xs,get:()=>Dh(xs,e)}),Ch={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},zh=(e,t,n,a,l)=>{let u=Te(e.session.backend.glContext.version),[d,p]=e.calculateTextureWidthAndHeight(l,4),[o,r]=[d/4,p],i=`
      vec4 get_MeanAndVariance(int[2] mv) {
        int offset = indicesToOffset_MeanAndVariance(mv);
        vec2 coords = offsetToCoords(offset, ${o}, ${r});
        return ${u.texture2D}(MeanAndVariance, coords);
      }

      float process(int[4] indices) {
        int mv[2];
        mv[0] = indices[0];
        mv[1] = indices[1];
        vec4 mean_and_variance = get_MeanAndVariance(mv);
        float mean = mean_and_variance.r;
        float variance = mean_and_variance.g;

        int sb[1];
        sb[0] = indices[1];
        float scale = _Scale(sb);
        float b = _B(sb);

        return scale * (_X(indices) - mean) / sqrt(variance + epsilon) + b;
      }`;return{...t,output:{dims:n.dims,type:n.type,textureType:0},variables:[{name:"epsilon",type:"float",data:a}],shaderSource:i}},Rh=(e,t,n,a)=>{let l={...Ch,cacheHint:`${n}`};return{...l,get:()=>zh(e,l,t,n,a)}},Bh=e=>{if(!e||e.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let t=e[0],n=e[1],a=e[2];if(t.dims.length<3||n.dims.length!==1||a.dims.length!==1)throw new Error("Invalid input shape.");if(n.dims[0]!==t.dims[1]||a.dims[0]!==t.dims[1])throw new Error("Input shapes are mismatched.");if(t.type!=="float32"&&t.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||a.type!=="float32"&&a.type!=="float64")throw new Error("Invalid input type.");if(e[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function RT(e,t){let n=e[0].dims[1],a=e[0].dims.length,l=-Math.floor((t.size-1)/2),u=Math.ceil((t.size-1)/2),d=`float(${t.alpha}) / float(${t.size})`,p=`float(${t.bias})`,o=`float(${t.beta})`,r=`
    float process(int indices[${a}]) {
        int c = indices[1];
        float x = _X(indices);
        float square_sum = 0.0;

        for (int i = ${l}; i <= ${u}; i++) {
          int idx = c + i;
          if (c >= 0 && c < ${n}) {
            indices[1] = idx;
            float j = _X(indices);
            square_sum += j * j;
          }
        }
        return x / pow(${p} + ${d} * square_sum, ${o});
    }`;return{...$s,cacheHint:t.cacheKey,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:r}}function BT(e,t){return{...$s,cacheHint:t.cacheKey,get:()=>RT(e,t)}}var Mh,Fh,$s,jh,MT=N(()=>{"use strict";ot(),Oe(),Mh=(e,t,n)=>(jh(t),[e.run(BT(t,n),t)]),Fh=e=>{let t=e.attributes.getFloat("alpha",1e-4),n=e.attributes.getFloat("beta",.75),a=e.attributes.getFloat("bias",1),l=e.attributes.getInt("size");return Le({alpha:t,beta:n,bias:a,size:l})},$s={name:"LRN",inputNames:["X"],inputTypes:[0]},jh=e=>{if(!e||e.length!==1)throw new Error("LRN requires 1 input.");if(e[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(e[0].type!=="float32")throw new Error("input should be float type")}}),Lh,Ts,Vh,Uh,qh,Gh,Hh,Wh,Kh,Xh,Zh,Jh,Yh,FT=N(()=>{"use strict";ot(),Ne(),Ke(),Oe(),Lh={name:"Pad",inputNames:["A"],inputTypes:[0]},Ts=(e,t,n)=>(Wh(t),[e.run({...Lh,cacheHint:n.cacheKey,get:()=>Hh(e,t[0],n)},t)]),Vh=e=>{let t=e.attributes.getString("mode","constant"),n=e.attributes.getFloat("value",0),a=e.attributes.getInts("pads");return Le({mode:t,value:n,pads:a})},Uh=(e,t,n)=>{Kh(t);let a=Gh(e,t,n);return Ts(e,[t[0]],a)},qh=e=>e.attributes.getString("mode","constant"),Gh=(e,t,n)=>{if(!e.session.isInitializer(t[1].dataId)||t.length>=3&&!e.session.isInitializer(t[2].dataId))throw new Error("dynamic pad attributes are not allowed");let a=Array.from(t[1].integerData),l=t.length>=3?t[2].floatData[0]:0;return Le({mode:n,pads:a,value:l})},Hh=(e,t,n)=>{let a=me.padShape(t.dims.slice(),n.pads),l=a.length,u=`
      ${Xh(e,t,n)}
      float process(int[${l}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:a,type:t.type,textureType:0},shaderSource:u}},Wh=e=>{if(!e||e.length!==1)throw new Error("Pad requires 1 input");if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("Invalid input type.")},Kh=e=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(e[1].type!=="int32")throw new Error("Invalid input type.");if(e.length>=3&&e[2].type==="string")throw new Error("Invalid input type.")},Xh=(e,t,n)=>{let a=Te(e.session.backend.glContext.version),[l,u]=e.calculateTextureWidthAndHeight(t.dims,0),d=me.computeStrides(t.dims);switch(n.mode){case"constant":return Zh(a,t.dims,d,l,u,n.pads,n.value);case"reflect":return Jh(a,t.dims,d,l,u,n.pads);case"edge":return Yh(a,t.dims,d,l,u,n.pads);default:throw new Error("Invalid mode")}},Zh=(e,t,n,a,l,u,d)=>{let p=t.length,o="";for(let r=p-1;r>=0;--r)o+=`
        k = m[${r}] - ${u[r]};
        if (k < 0)  return constant;
        if (k >= ${t[r]}) return constant;
        offset += k * ${n[r]};
        `;return`
      float padA(int m[${p}]) {
        const float constant = float(${d});
        int offset = 0;
        int k = 0;
        ${o}
        vec2 coords = offsetToCoords(offset, ${a}, ${l});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `},Jh=(e,t,n,a,l,u)=>{let d=t.length,p="";for(let o=d-1;o>=0;--o)p+=`
        k = m[${o}] - ${u[o]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(t[o]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${t[o]}) { k = _2n_1 - k; }
        }
        offset += k * ${n[o]};
        `;return`
      float padA(int m[${d}]) {
        int offset = 0;
        int k = 0;
        ${p}
        vec2 coords = offsetToCoords(offset, ${a}, ${l});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `},Yh=(e,t,n,a,l,u)=>{let d=t.length,p="";for(let o=d-1;o>=0;--o)p+=`
        k = m[${o}] - ${u[o]};
        if (k < 0)  k = 0;
        if (k >= ${t[o]}) k = ${t[o]-1};
        offset += k * ${n[o]};
      `;return`
      float padA(int m[${d}]) {
        int offset = 0;
        int k = 0;
        ${p}
        vec2 coords = offsetToCoords(offset, ${a}, ${l});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `}}),Qh,ef,Is,tf,rf,nf,of,Ss,Os,sf,Es,af,Hn,Ps,Wn,uf,jT=N(()=>{"use strict";ot(),Ne(),Oe(),Qh=(e,t,n)=>{Hn(t);let a={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[e.run({...a,get:()=>Is(t,a,!1,n)},t)]},ef=e=>{let t=e.attributes.getString("auto_pad","NOTSET"),n=e.attributes.getInt("ceil_mode",0),a=e.attributes.getInt("count_include_pad",0)!==0,l=e.attributes.getInts("kernel_shape"),u=e.attributes.getInts("strides",[]),d=e.attributes.getInts("pads",[]);if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return Le({autoPad:t,ceilMode:n,countIncludePad:a,kernelShape:l,strides:u,pads:d})},Is=(e,t,n,a)=>{let[l,u]=Os(e,a,n),d=me.size(l.kernelShape),p="value += _X(x);",o="";l.countIncludePad?o+=`value /= float(${d});`:o+=`value /= float(${d} - pad);`;let r=`
        ${Ps(e[0].dims,l,p,o,"0.0")}
      `;return{...t,output:{dims:u,type:e[0].type,textureType:0},shaderSource:r}},tf=(e,t,n)=>{Hn(t);let a={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${n.countIncludePad}`};return[e.run({...a,get:()=>Is(t,a,!0,n)},t)]},rf=e=>{let t=e.attributes.getInt("count_include_pad",0)!==0;return Le({autoPad:"",ceilMode:0,countIncludePad:t,kernelShape:[],strides:[],pads:[]})},nf=(e,t,n)=>{Hn(t);let a={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[e.run({...a,get:()=>Ss(t,a,!1,n)},t)]},of=e=>{let t=e.attributes.getString("auto_pad","NOTSET"),n=e.attributes.getInt("ceil_mode",0),a=e.attributes.getInts("kernel_shape"),l=e.attributes.getInts("strides",[]),u=e.attributes.getInts("pads",[]),d=e.attributes.getInt("storage_order",0),p=e.attributes.getInts("dilations",[]);if(d!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return Le({autoPad:t,ceilMode:n,countIncludePad:!1,kernelShape:a,strides:l,pads:u,storageOrder:d,dilations:p})},Ss=(e,t,n,a)=>{let[l,u]=Os(e,a,n),d=`
      ${Ps(e[0].dims,l,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...t,output:{dims:u,type:e[0].type,textureType:0},shaderSource:d}},Os=(e,t,n)=>{let a=e[0].dims.slice(),l=Object.hasOwnProperty.call(t,"dilations"),u=t.kernelShape.slice(),d=t.strides.slice(),p=l?t.dilations.slice():[],o=t.pads.slice();Ni.adjustPoolAttributes(n,a,u,d,p,o);let r=Ni.computePoolOutputShape(n,a,d,p,u,o,t.autoPad),i=Object.assign({},t);return l?Object.assign(i,{kernelShape:u,strides:d,pads:o,dilations:p,cacheKey:t.cacheKey}):Object.assign(i,{kernelShape:u,strides:d,pads:o,cacheKey:t.cacheKey}),[i,r]},sf={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},Es={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},af=(e,t)=>(Hn(t),[e.run({...Es,get:()=>Ss(t,Es,!0,sf)},t)]),Hn=e=>{if(!e||e.length!==1)throw new Error("Pool ops requires 1 input.");if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("Invalid input type.")},Ps=(e,t,n,a,l)=>{let u=e.length;if(t.kernelShape.length<=2){let d=t.kernelShape[t.kernelShape.length-1],p=t.strides[t.strides.length-1],o=t.pads[t.pads.length/2-1],r=t.pads[t.pads.length-1],i=e[u-1],s="",c="",h="";if(o+r!==0?s=`
          for (int i = 0; i < ${d}; i++) {
            x[${u} - 1] = indices[${u} - 1] * ${p} - ${o} + i;
            if (x[${u} - 1] < 0 || x[${u} - 1] >= ${i}) {
              pad++;
              continue;
            }
            ${n}
          }`:s=`
          for (int i = 0; i < ${d}; i++) {
            x[${u} - 1] = indices[${u} - 1] * ${p} - ${o} + i;
            ${n}
          }`,t.kernelShape.length===2){let m=t.kernelShape[t.kernelShape.length-2],b=t.strides[t.strides.length-2],x=t.pads[t.pads.length/2-2],v=t.pads[t.pads.length-2],_=e[u-2];x+v!==0?c=`
            for (int j = 0; j < ${m}; j++) {
              x[${u} - 2] = indices[${u} - 2] * ${b} - ${x} + j;
              if (x[${u} - 2] < 0 || x[${u} - 2] >= ${_}) {
                pad+= ${d};
                continue;
              }
          `:c=`
            for (int j = 0; j < ${m}; j++) {
              x[${u} - 2] = indices[${u} - 2] * ${b} - ${x} + j;
            `,h=`
          }
        `}return`
        float process(int indices[${u}]) {
          int x[${u}];
          copyVec(indices, x);

          float value = ${l};
          int pad = 0;
          ${c}
          ${s}
          ${h}
          ${a}
          return value;
        }
      `}else{let d=me.size(t.kernelShape),p=me.computeStrides(t.kernelShape),o=p.length,r=t.pads.length,i=uf(o),s=Wn(e,"inputDims"),c=Wn(t.pads,"pads"),h=Wn(p,"kernelStrides"),m=Wn(t.strides,"strides"),b=t.pads.reduce((v,_)=>v+_),x="";return b?x=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${n}
          }`:x=`
          }
          ${n}
        `,`
        ${i}
        float process(int indices[${u}]) {
          int x[${u}];
          copyVec(indices, x);
          int offset[${o}];
          int pads[${r}];
          int inputDims[${u}];
          int kernelStrides[${o}];
          int strides[${o}];
          ${c}
          ${s}
          ${m}
          ${h}

          float value = ${l};
          int pad = 0;
          bool isPad = false;
          for (int i = 0; i < ${d}; i++) {
            offsetToIndices(i, kernelStrides, offset);
            isPad = false;
            for (int j = ${u} - ${o}; j < ${u}; j++) {
              x[j] = indices[j] * strides[j - ${u} + ${o}]
                + offset[j - ${u} + ${o}] - pads[j - 2];
              ${x}
          }
          ${a}

          return value;
        }
      `}},Wn=(e,t)=>{let n="";for(let a=0;a<e.length;a++)n+=`
      ${t}[${a}] = ${e[a]};
    `;return n},uf=e=>`
  void offsetToIndices(int offset, int[${e}] strides, out int[${e}] indices) {
    if (${e} == 0) {
      return;
    }
    for (int i = 0; i < ${e} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${e} - 1] = offset;
  }`}),sr,ar,lf,df,pf,cf,hf,ff,mf,gf,bf,LT=N(()=>{"use strict";ot(),Ri(),Ne(),Oe(),sr=(e,t,n,a,l)=>{df(t);let u={name:a,inputNames:["A"],inputTypes:[0]};return[e.run({...u,cacheHint:n.cacheKey,get:()=>lf(e,t,n,a,l,u)},t)]},ar=e=>{let t=e.attributes.getInts("axes",[]),n=e.attributes.getInt("keepdims",1)===1;return Le({axes:t,keepDims:n})},lf=(e,t,n,a,l,u)=>{let d=[],p=t[0].dims.length||1,o=[],r=me.normalizeAxes(n.axes,t[0].dims.length),i=l(t,r),s=i[1];for(let h=0;h<t[0].dims.length;h++)r.indexOf(h)>=0||r.length===0?(n.keepDims&&d.push(1),s=`
          for(int j${h} = 0; j${h} < ${t[0].dims[h]}; j${h}++) {
            inputIdx[${h}] = j${h};
            ${s}
          }`):(o.push(`inputIdx[${h}] = outputIdx[${d.length}];`),d.push(t[0].dims[h]));let c=`
      float process(int outputIdx[${d.length||1}]) {
        float value;                 // final result
        int inputIdx[${p}];      // addressing input data
        ${o.join(`
`)}
        ${i[0]}       // init ops for reduce max/min
        ${s}
        ${i[2]}       // final computation for reduce mean
        return value;
      }`;return{...u,output:{dims:d,type:t[0].type,textureType:0},shaderSource:c}},df=e=>{if(!e||e.length!==1)throw new Error("Reduce op requires 1 input.");if(Gn.indexOf(e[0].type)===-1)throw new Error("Invalid input type.")},pf=(e,t,n)=>sr(e,t,n,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),cf=(e,t,n)=>sr(e,t,n,"ReduceMean",(a,l)=>{let u=1;for(let d=0;d<a[0].dims.length;d++)(l.indexOf(d)>=0||l.length===0)&&(u*=a[0].dims[d]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${u}.;`]}),hf=(e,t,n)=>sr(e,t,n,"ReduceMax",(a,l)=>{let u=[];for(let d=0;d<a[0].dims.length;d++)(l.indexOf(d)>=0||l.length===0)&&u.push(`inputIdx[${d}] = 0;`);return[`${u.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),ff=(e,t,n)=>sr(e,t,n,"ReduceMin",(a,l)=>{let u=[];for(let d=0;d<a[0].dims.length;d++)(l.indexOf(d)>=0||l.length===0)&&u.push(`inputIdx[${d}] = 0;`);return[`${u.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),mf=(e,t,n)=>sr(e,t,n,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),gf=(e,t,n)=>sr(e,t,n,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),bf=(e,t,n)=>sr(e,t,n,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])}),yf,VT=N(()=>{"use strict";Ne(),yf=(e,t)=>{let n=me.calculateReshapedDims(t[0].dims,t[1].integerData);return e.session.pack?[e.reshapePacked(t[0],n)]:[e.reshapeUnpacked(t[0],n)]}}),As,ks,_f,wf,Kn,vf,Ds,Bi,xf=N(()=>{"use strict";ot(),Ke(),Oe(),As={name:"Upsample",inputNames:["X"],inputTypes:[0]},ks=(e,t,n)=>(Ds(t,n),[e.run({...As,cacheHint:n.cacheKey,get:()=>vf(e,t,n)},t)]),_f=e=>Kn(e,7),wf=e=>Kn(e,9),Kn=(e,t)=>{let n=t>=10,a=e.attributes.getString("mode","nearest");if(a!=="nearest"&&a!=="linear"&&(t<11||a!=="cubic"))throw new Error(`unrecognized mode: ${a}`);let l=[];t<9&&(l=e.attributes.getFloats("scales"),Bi(l,a,n));let u=e.attributes.getFloat("extrapolation_value",0),d=t>10?e.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(d)===-1)throw new Error(`coordinate_transform_mode '${d}' is not supported`);let p=d==="tf_crop_and_resize",o=p,r=a==="nearest"&&t>=11?e.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(r)===-1)throw new Error(`nearest_mode '${r}' is not supported`);let i=e.attributes.getFloat("cubic_coeff_a",-.75),s=e.attributes.getInt("exclude_outside",0)!==0;if(s&&a!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let c=t<11?!0:a==="nearest"&&d==="asymmetric"&&r==="floor",h=0,m=0,b=0;return t>10?e.inputs.length>2?(h=1,m=2,b=3):(m=1,b=2):t===9&&(m=1),Le({opset:t,isResize:n,mode:a,scales:l,extrapolationValue:u,coordinateTransformMode:d,useExtrapolation:o,needRoiInput:p,nearestMode:r,cubicCoefficientA:i,excludeOutside:s,useNearest2xOptimization:c,roiInputIdx:h,scalesInputIdx:m,sizesInputIdx:b})},vf=(e,t,n)=>{let a=Te(e.session.backend.glContext.version),[l,u]=e.calculateTextureWidthAndHeight(t[0].dims,0),d=t[0].dims.map((b,x)=>Math.floor(b*n.scales[x])),[p,o]=e.calculateTextureWidthAndHeight(d,0),r=d.length,i=new Array(r),s=new Array(r),c=`
      int output_pitches[${r}];
      int input_pitches[${r}];
      `;for(let b=r-1;b>=0;b--)i[b]=b===r-1?1:i[b+1]*d[b+1],s[b]=b===r-1?1:s[b+1]*t[0].dims[b+1],c+=`
        output_pitches[${b}] = ${i[b]};
        input_pitches[${b}] = ${s[b]};
        `;let h=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${l}, ${u});
        float value = getColorAsFloat(${a.texture2D}(X, coords));
        return value;
      }
      `,m=n.mode==="nearest"?`
    ${h}
    float process(int indices[${r}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${p}, ${o});

      ${c}

      int d, m;
      for (int dim = 0; dim < ${r}; ++dim) {
        d = output_index / output_pitches[dim];
        m = output_index - d * output_pitches[dim];
        output_index = m;

        if (scales[dim] != 1 && d > 0) {
          int d2 = d / scales[dim];
          m = d - d2 * scales[dim];
          d = d2;
        }
        input_index += input_pitches[dim] * d;
      }

      return getInputFloat(input_index);
    }`:r===4?`
    ${h}
    float process(int indices[4]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${p}, ${o});

      ${c}

      int m;
      int index_of_dim0, index_of_dim1, index_of_dim2, index_of_dim3;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m / output_pitches[1];
      m = m - index_of_dim1 * output_pitches[1];
      index_of_dim2 = m / output_pitches[2];
      m = m - index_of_dim2 * output_pitches[2];
      index_of_dim3 = m;

      int index_of_input_dim2, index_of_input_dim3, x_offset, y_offset;
      index_of_input_dim2 = index_of_dim2 / scales[2];
      y_offset = index_of_dim2 - index_of_input_dim2 * scales[2];
      index_of_input_dim3 = index_of_dim3 / scales[3];
      x_offset = index_of_dim3 - index_of_input_dim3 * scales[3];

      input_index = index_of_dim0 * input_pitches[0] +
            index_of_dim1 * input_pitches[1] +
            index_of_input_dim2 * input_pitches[2] +
            index_of_input_dim3;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim2 = false;
      if (index_of_input_dim2 == (${t[0].dims[2]} - 1)) {
        // It's the end in dimension 2
        x01 = x00;
        end_of_dim2 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[2]);
      }

      if (index_of_input_dim3 == (input_pitches[2] - 1)) {
        // It's the end in dimension 3
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim2 ? x10 : getInputFloat(input_index + input_pitches[2] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[2]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[2]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[3]);
    }`:`
    ${h}
    float process(int indices[2]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${p}, ${o});

      ${c}

      int m;
      int index_of_dim0, index_of_dim1;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m;

      int index_of_input_dim0, index_of_input_dim1, x_offset, y_offset;
      index_of_input_dim0 = index_of_dim0 / scales[0];
      y_offset = index_of_dim0 - index_of_input_dim0 * scales[0];
      index_of_input_dim1 = index_of_dim1 / scales[1];
      x_offset = index_of_dim1 - index_of_input_dim1 * scales[1];

      input_index = index_of_input_dim0 * input_pitches[0] + index_of_input_dim1;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim0 = false;
      if (index_of_input_dim0 == (${t[0].dims[0]} - 1)) {
        // It's the end in dimension 0
        x01 = x00;
        end_of_dim0 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[0]);
      }

      if (index_of_input_dim1 == (input_pitches[0] - 1)) {
        // It's the end in dimension 1
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim0 ? x10 : getInputFloat(input_index + input_pitches[0] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[0]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[0]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[1]);
    }`;return{...As,output:{dims:d,type:t[0].type,textureType:0},shaderSource:m,variables:[{name:"scales",type:"int",arrayLength:n.scales.length,data:n.scales.map(b=>Math.ceil(b))}]}},Ds=(e,t)=>{if(!e||t.opset<9&&e.length!==1||t.opset>=9&&t.opset<11&&e.length!==2||t.opset>=11&&e.length<2)throw new Error("invalid inputs.");if(t.scales.length>0&&e[0].dims.length!==t.scales.length)throw new Error("Invalid input shape.");if(e[0].type==="string")throw new Error("Invalid input tensor types.")},Bi=(e,t,n)=>{if(n){for(let a of e)if(a<=0)throw new Error("Scale value should be greater than 0.")}else for(let a of e)if(a<1)throw new Error("Scale value should be greater than or equal to 1.");if((t==="linear"||t==="cubic")&&e.length!==2&&(e.length!==4||e[0]!==1||e[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${n?"Resize":"Upsample"} opeartor.`)}}),Mi,Ns,$f,Tf,If,Sf,Of,Ef,UT=N(()=>{"use strict";Ke(),Oe(),Xt(),mn(),xf(),Mi={name:"Resize",inputNames:["A"],inputTypes:[2]},Ns=(e,t,n)=>(Ds(t,n),[e.run({...Mi,cacheHint:n.cacheKey,get:()=>If(e,t,n)},t)]),$f=e=>Kn(e,10),Tf=e=>Kn(e,11),If=(e,t,n)=>{let a=Te(e.session.backend.glContext.version),[l,u]=Sf(t,n);if(l.every(_=>_===1)&&n.coordinateTransformMode!=="tf_crop_and_resize")return{...Mi,output:{dims:u,type:t[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${a.texture2D}(X, TexCoords);
                    ${a.output} = v;
                }`};let d=u.length;if(d<2)throw new Error(`output dimension should be at least 2, but got ${d}`);let p=u[d-2],o=u[d-1],r=t[0].dims;if(d!==r.length)throw new Error(`output dimension should match input ${r.length}, but got ${d}`);let i=r[d-2],s=r[d-1],c=l[d-2],h=l[d-1],m="";if(n.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${n.mode}'`);switch(n.coordinateTransformMode){case"asymmetric":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${o}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${p}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${o}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${p}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${o}.0 - 1.0, ${p}.0 - 1.0, ${o}.0 - 1.0,
                            ${p}.0 - 1.0);
                        vec4 original = vec4(${s}.0 - 1.0, ${i}.0 - 1.0, ${s}.0 - 1.0,
                            ${i}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${n.coordinateTransformMode}'`)}let b=ir(d),x=Fn(),v=`
            const vec2 inputWH = vec2(${i}.0, ${s}.0);
            const vec4 scaleWHWH = vec4(float(${c}), float(${h}), float(${c}), float(${h}));
            ${x}
            ${m}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${b} rc = getOutputCoords();

                int batch = rc[0];
                int depth = rc[1];

                // retrieve the 4 coordinates that is used in the 4 packed output values.
                ivec4 coords = ivec4(rc.wz, rc.w + 1, rc.z + 1);

                // calculate the source index in fraction
                vec4 sourceFrac = getSourceFracIndex(coords);

                // get the lower and upper bound of the 4 values that will be packed into one texel.
                ivec4 x00 = ivec4(max(sourceFrac.xy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xy)));
                ivec4 x01 = ivec4(max(sourceFrac.xw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xw)));
                ivec4 x10 = ivec4(max(sourceFrac.zy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zy)));
                ivec4 x11 = ivec4(max(sourceFrac.zw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zw)));

                bool hasNextRow = rc.w < ${p-1};
                bool hasNextCol = rc.z < ${o-1};

                // pack x00, x01, x10, x11's top-left corner into one vec4 structure
                vec4 topLeft = vec4(
                    getAValue(batch, depth, x00.x, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.y) : 0.0);

                // pack x00, x01, x10, x11's top-right corner into one vec4 structure
                vec4 topRight = vec4(
                    getAValue(batch, depth, x00.x, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.w) : 0.0);

                // pack x00, x01, x10, x11's bottom-left corner into one vec4 structure
                vec4 bottomLeft = vec4(
                    getAValue(batch, depth, x00.z, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.y) : 0.0);

                // pack x00, x01, x10, x11's bottom-right corner into one vec4 structure
                vec4 bottomRight = vec4(
                    getAValue(batch, depth, x00.z, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.w) : 0.0);

                // calculate the interpolation fraction on u and v direction
                vec4 frac = vec4(sourceFrac) - floor(sourceFrac);
                vec4 clampFrac = clamp(frac, vec4(0.0), vec4(1.0));

                vec4 top = mix(topLeft, topRight, clampFrac.ywyw);
                vec4 bottom = mix(bottomLeft, bottomRight, clampFrac.ywyw);
                vec4 newValue = mix(top, bottom, clampFrac.xxzz);

                ${a.output} = vec4(newValue);
            }
        `;return{...Mi,output:{dims:u,type:t[0].type,textureType:2},hasMain:!0,shaderSource:v}},Sf=(e,t)=>{let n=e[0].dims,a=t.scales,l;if(a.length===0){let d=e[t.scalesInputIdx];if(d&&d.size!==0){if(e[t.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");a=Of(d,t.mode,t.isResize)}else{let p=e[t.sizesInputIdx];if(!p||p.size===0)throw new Error("Either scales or sizes MUST be provided as input.");l=Array.from(p.integerData),a=Ef(l,n,t.mode,t.isResize)}}else if(e[t.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let u=l||n.map((d,p)=>Math.floor(d*a[p]));return[a,u]},Of=(e,t,n)=>{let a=Array.from(e.floatData);return Bi(a,t,n),a},Ef=(e,t,n,a)=>{let l=t.length,u=new Array(l);for(let d=0,p=l;d<p;d++)if(t[d]===0){if(e[d]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");u[d]=1}else u[d]=e[d]/t[d];return Bi(u,n,a),u}}),Pf,Af,qT=N(()=>{"use strict";hn(),Pf=(e,t)=>(Af(t),[new gt([t[0].dims.length],"int32",void 0,void 0,new Int32Array(t[0].dims))]),Af=e=>{if(!e||e.length!==1)throw new Error("Shape requires 1 input.")}}),Fi,kf,Df,Cs,Nf,Cf,zf,Rf,GT=N(()=>{"use strict";ot(),Ri(),Ne(),Oe(),Fi={name:"Slice",inputNames:["A"],inputTypes:[0]},kf=(e,t,n)=>(Nf(t),[e.run({...Fi,cacheHint:n.cacheKey,get:()=>Cs(e,t[0],n)},t)]),Df=e=>{let t=e.attributes.getInts("starts"),n=e.attributes.getInts("ends"),a=e.attributes.getInts("axes",[]);return Le({starts:t,ends:n,axes:a})},Cs=(e,t,n)=>{let a=n.axes.length===0?t.dims.slice(0).map((i,s)=>s):n.axes,l=me.normalizeAxes(a,t.dims.length),u=n.starts.map((i,s)=>i>t.dims[l[s]]-1?t.dims[l[s]]:me.normalizeAxis(i,t.dims[l[s]])),d=n.ends.map((i,s)=>i>t.dims[l[s]]-1?t.dims[l[s]]:me.normalizeAxis(i,t.dims[l[s]])),p=t.dims.slice(),o=[];for(let i=0;i<l.length;i++)p[l[i]]=d[i]-u[i],u[i]>0&&o.push(`outputIdx[${l[i]}] += ${u[i]};`);let r=`
      float process(int outputIdx[${p.length}]) {
        ${o.join(`
      `)}
        return _A(outputIdx);
      }`;return{...Fi,output:{dims:p,type:t.type,textureType:0},shaderSource:r}},Nf=e=>{if(!e||e.length!==1)throw new Error("Slice requires 1 input.");if(Gn.indexOf(e[0].type)===-1)throw new Error("Invalid input type.")},Cf=(e,t)=>{Rf(t);let n=zf(e,t);return[e.run({...Fi,cacheHint:n.cacheKey,get:()=>Cs(e,t[0],n)},[t[0]])]},zf=(e,t)=>{if(!e.session.isInitializer(t[1].dataId)||!e.session.isInitializer(t[2].dataId)||t.length>=4&&!e.session.isInitializer(t[3].dataId)||t.length>=5&&!e.session.isInitializer(t[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(t.length>=5&&t[4].integerData.some(d=>d!==1))throw new Error("currently non-1 steps is not supported for Slice");let n=Array.from(t[1].integerData),a=Array.from(t[2].integerData),l=t.length>=4?Array.from(t[3].integerData):[],u=`${l};${n};${a}`;return{starts:n,ends:a,axes:l,cacheKey:u}},Rf=e=>{if(!e||e.length<3||e.length>5)throw new Error("Invalid input number.");if(e[1].type!=="int32"||e[1].dims.length!==1)throw new Error("Invalid input type.");if(e[2].type!=="int32"||e[2].dims.length!==1)throw new Error("Invalid input type.");if(e.length>=4&&(e[3].type!=="int32"||e[3].dims.length!==1))throw new Error("Invalid input type.");if(e.length>=5&&(e[4].type!=="int32"||e[4].dims.length!==1))throw new Error("Invalid input type.")}}),zs,Rs,Bs,Bf,Mf,Ff,jf,Ms,Lf,Vf,Uf,Fs,HT=N(()=>{"use strict";ot(),Ne(),Ke(),Oe(),_s(),zs={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},Rs={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},Bs={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},Bf=(e,t,n)=>{Fs(t);let a=t[0].dims.slice(),l=me.normalizeAxis(n.axis,a.length),u=me.sizeToDimension(a,l),d=me.sizeFromDimension(a,l);return Ms(e,t,n,u,d)},Mf=e=>Le({axis:e.attributes.getInt("axis",1)}),Ff=e=>Le({axis:e.attributes.getInt("axis",-1)}),jf=(e,t,n)=>{Fs(t);let a=t[0].dims.slice(),l=me.normalizeAxis(n.axis,a.length),u=a.length,d=l!==u-1,p=[],o=[],r=[],i;d&&(o=Array.from({length:u}).map((m,b)=>b),o[l]=u-1,o[u-1]=l,o.map(m=>p.push(a[m])),i=Le({perm:o}),r=qn(e,t,i));let s=d?me.sizeToDimension(p,u-1):me.sizeToDimension(a,u-1),c=d?me.sizeFromDimension(p,u-1):me.sizeFromDimension(a,u-1),h=Ms(e,d?r:t,n,s,c);return d?qn(e,h,i):h},Ms=(e,t,n,a,l)=>{let u=Lf(e,t[0],a,l,[a]),d=e.run({...zs,cacheHint:n.cacheKey,get:()=>u},t),p=Vf(e,t[0],a,l,u.output.dims,[a]),o=e.run({...Rs,cacheHint:n.cacheKey,get:()=>p},[t[0],d]),r=Uf(e,t[0],a,l,u.output.dims,p.output.dims);return[e.run({...Bs,cacheHint:n.cacheKey,get:()=>r},[t[0],d,o])]},Lf=(e,t,n,a,l)=>{let[u,d]=e.calculateTextureWidthAndHeight(t.dims,0),p=l.length;if(n<1||a<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(l.length!==1)throw new Error("Dimensionality of the output should be 1");if(l[0]!==n)throw new Error("Shape of the output should be equal to logical row count");let o=Te(e.session.backend.glContext.version),r=`
      float process(int[${p}] indices) {
        int logical_row_start_offset = indices[0] * ${a};

        float max = getColorAsFloat(${o.texture2D}(A, offsetToCoords(logical_row_start_offset, ${u},
        ${d} )));
        for(int i=1; i<${a}; ++i)
        {
          float current = getColorAsFloat(${o.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${u}, ${d})));
          if(current > max)
          max = current;
        }

        return max;
      }`;return{...zs,output:{dims:l,type:t.type,textureType:0},shaderSource:r}},Vf=(e,t,n,a,l,u)=>{let[d,p]=e.calculateTextureWidthAndHeight(t.dims,0),o=u.length;if(n<1||a<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(u.length!==1)throw new Error("Dimensionality of the output should be 1");if(u[0]!==n)throw new Error("Shape of the output should be equal to logical row count");if(l.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(l[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let r=Te(e.session.backend.glContext.version),i=`
      float process(int[${o}] indices) {
        int logical_row_start_offset = indices[0] * ${a};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${a}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${r.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${d}, ${p}))) - max);
        }

        return norm_factor;
      }`;return{...Rs,output:{dims:u,type:t.type,textureType:0},shaderSource:i}},Uf=(e,t,n,a,l,u)=>{let[d,p]=e.calculateTextureWidthAndHeight(t.dims,0),o=t.dims.length;if(n<1||a<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(l.length!==1||u.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(l[0]!==n||u[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let r=`
      float process(int[${o}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${d}, ${p});

      //determine the logical row for this index
      int logical_row_index[1];
      logical_row_index[0] = offset / ${a};

      float norm_factor = _Norm(logical_row_index);

      // avoid possible division by 0
      // if norm_facor is 0, all elements are zero
      // if so, return 0
      if(norm_factor == 0.0)
        return 0.0;

      return exp(_A(indices) - _Max(logical_row_index)) / norm_factor;
    }`;return{...Bs,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:r}},Fs=e=>{if(!e||e.length!==1)throw new Error("Softmax requires 1 input.");if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("Invalid input type")}}),js,qf,Gf,Hf,Wf,Kf,WT=N(()=>{"use strict";ot(),Ne(),Oe(),js={name:"Split",inputNames:["A"],inputTypes:[0]},qf=(e,t,n)=>{Kf(t);let a=me.normalizeAxis(n.axis,t[0].dims.length),l=Hf(e,t,a,n),u=[];for(let d=0;d<l;++d)u.push(e.run({...js,cacheHint:`${n.cacheKey};${d}`,get:()=>Wf(e,t[0],n,a,d)},t));return u},Gf=e=>{let t=e.attributes.getInt("axis",0),n=e.attributes.getInts("split",[]),a=e.outputs.length;return Le({axis:t,split:n,numOutputs:a})},Hf=(e,t,n,a)=>{let[,l]=Jo.splitShape(t[0].dims,n,a.split,a.numOutputs);return l.length},Wf=(e,t,n,a,l)=>{let[u,d]=Jo.splitShape(t.dims,a,n.split,n.numOutputs),p=d[l],o=u[l],r=`
      float process(int indices[${o.length}]) {
        indices[${a}] += ${p};
        return _A(indices);
      }
    `;return{...js,cacheHint:`${n.cacheKey}:${l}`,output:{dims:o,type:t.type,textureType:0},shaderSource:r}},Kf=e=>{if(!e||e.length!==1)throw new Error("Split requires one input.");if(e[0].type!=="int8"&&e[0].type!=="uint8"&&e[0].type!=="int16"&&e[0].type!=="uint16"&&e[0].type!=="int32"&&e[0].type!=="uint32"&&e[0].type!=="float32"&&e[0].type!=="float64"&&e[0].type!=="bool")throw new Error("Invalid input type.")}}),Ls,Xf,Zf,Jf,Yf,KT=N(()=>{"use strict";Ne(),Ls=(e,t,n)=>{Jf(t);let a=me.squeezeShape(t[0].dims,n);return[e.reshapeUnpacked(t[0],a)]},Xf=(e,t)=>(Yf(t),Ls(e,[t[0]],Array.from(t[1].integerData))),Zf=e=>e.attributes.getInts("axes"),Jf=e=>{if(!e||e.length!==1)throw new Error("Squeeze requires 1 input.");if(e[0].type==="string")throw new Error("invalid input tensor types.")},Yf=e=>{if(!e||e.length!==2)throw new Error("Squeeze requires 2 inputs.");if(e[1].type!=="int32")throw new Error("Invalid input type.")}}),Qf,em,tm,XT=N(()=>{"use strict";Ke(),Oe(),Qf=(e,t)=>{tm(t);let n={name:"Sum",inputNames:t.map((a,l)=>`X${l}`),inputTypes:new Array(t.length).fill(0)};return[e.run({...n,get:()=>em(e,t,n)},t)]},em=(e,t,n)=>{let a=Te(e.session.backend.glContext.version),l=t[0].dims.slice(),u=`
      void main() {
        vec4 result = ${t.map((d,p)=>`${a.texture2D}(X${p},TexCoords)`).join(" + ")};
        ${a.output} = result;
      }
    `;return{...n,output:{dims:l,type:t[0].type,textureType:0},hasMain:!0,shaderSource:u}},tm=e=>{if(!e||e.length===0)throw new Error("Sum requires inputs.");let t=e[0].dims.length;for(let n=1;n<e.length;n++){if(t!==e[n].dims.length)throw new Error("Input shapes are mismatched.");for(let a=0;a<t;a++)if(e[0].dims[a]!==e[n].dims[a])throw new Error("Input shapes are not matched.")}if(e[0].type!=="float32"&&e[0].type!=="float64")throw new Error("Invalid input type.");for(let n=1;n<e.length;n++)if(e[0].type!==e[n].type)throw new Error("Input types are not matched.")}}),rm,nm,im,ZT=N(()=>{"use strict";Ri(),Oe(),rm=(e,t)=>{im(t);let n={name:"Tile",inputNames:["A"],inputTypes:[0]};return[e.run({...n,get:()=>nm(e,t,n)},t)]},nm=(e,t,n)=>{let a=t[0].dims.slice(),l=new Array(a.length),u=[];for(let o=0;o<a.length;o++)l[o]=a[o]*t[1].numberData[o],u.push(`inputIdx[${o}] = int(mod(float(outputIdx[${o}]), ${a[o]}.));`);let d=l.length,p=`
      float process(int outputIdx[${d}]) {
        int inputIdx[${d}];
        ${u.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...n,output:{dims:l,type:t[0].type,textureType:0},shaderSource:p}},im=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 input.");if(e[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(e[1].dims[0]!==e[0].dims.length)throw new Error("Invalid input shape.");if(Gn.indexOf(e[0].type)===-1)throw new Error("Invalid input type.");if(e[1].type!=="int32"&&e[1].type!=="int16")throw new Error("Invalid repeat type.")}}),Vs,om,sm,am,um,JT=N(()=>{"use strict";Ne(),Vs=(e,t,n)=>{am(t);let a=me.unsqueezeShape(t[0].dims,n);return[e.reshapeUnpacked(t[0],a)]},om=(e,t)=>(um(t),Vs(e,[t[0]],Array.from(t[1].integerData))),sm=e=>e.attributes.getInts("axes"),am=e=>{if(!e||e.length!==1)throw new Error("Unsqueeze requires 1 input.");if(e[0].type==="string")throw new Error("invalid input tensor types.")},um=e=>{if(!e||e.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(e[1].type!=="int32")throw new Error("Invalid input type.")}}),lm,YT=N(()=>{"use strict";F$(),Q$(),eT(),rT(),gs(),PT(),AT(),kT(),DT(),NT(),CT(),zT(),MT(),ps(),FT(),jT(),LT(),VT(),UT(),qT(),GT(),HT(),WT(),KT(),XT(),ZT(),_s(),fc(),JT(),xf(),lm=[["Abs","","6+",qp],["Acos","","7+",Gp],["Add","","7+",hp],["And","","7+",fp],["Asin","","7+",Hp],["Atan","","7+",Wp],["AveragePool","","7+",Qh,ef],["BatchNormalization","","7+",sp,ap],["Cast","","6+",Ip,Sp],["Ceil","","6+",Jp],["Clip","","6-10",ls,Kp],["Clip","","11+",Xp],["Concat","","4+",kp,Mp],["Conv","","1+",fs,ms],["ConvTranspose","","1+",Hc,Qc],["Cos","","7+",Yp],["Div","","7+",mp],["Dropout","","7+",ds],["DepthToSpace","","1+",sh,ah],["Equal","","7+",gp],["Elu","","6+",Qp,ec],["Exp","","6+",tc],["Flatten","","1+",lh,dh],["Floor","","6+",rc],["FusedConv","com.microsoft","1+",fs,ms],["Gather","","1+",ch,hh],["Gemm","","7-10",ws,yh],["Gemm","","11+",ws,_h],["GlobalAveragePool","","1+",tf,rf],["GlobalMaxPool","","1+",af],["Greater","","7+",bp],["Identity","","1+",ds],["ImageScaler","","1+",$h,Th],["InstanceNormalization","","6+",Ah,kh],["LeakyRelu","","6+",nc,ic],["Less","","7+",yp],["LRN","","1+",Mh,Fh],["Log","","6+",oc],["MatMul","","1+",$c,Tc],["MaxPool","","1+",nf,of],["Mul","","7+",_p],["Neg","","6+",sc],["Not","","1+",ac],["Or","","7+",wp],["Pad","","2-10",Ts,Vh],["Pad","","11+",Uh,qh],["Pow","","7+",vp],["PRelu","","7+",xp],["ReduceLogSum","","1+",gf,ar],["ReduceMax","","1+",hf,ar],["ReduceMean","","1+",cf,ar],["ReduceMin","","1+",ff,ar],["ReduceProd","","1+",mf,ar],["ReduceSum","","1-12",pf,ar],["ReduceSumSquare","","1+",bf,ar],["Relu","","6+",uc],["Reshape","","5+",yf],["Resize","","10",Ns,$f],["Resize","","11+",Ns,Tf],["Shape","","1+",Pf],["Sigmoid","","6+",lc],["Sin","","7+",dc],["Slice","","10+",Cf],["Slice","","1-9",kf,Df],["Softmax","","1-12",Bf,Mf],["Softmax","","13+",jf,Ff],["Split","","2-12",qf,Gf],["Sqrt","","6+",pc],["Squeeze","","1-12",Ls,Zf],["Squeeze","","13+",Xf],["Sub","","7+",$p],["Sum","","6+",Qf],["Tan","","7+",cc],["Tanh","","6+",hc],["Tile","","6+",rm],["Transpose","","1+",qn,th],["Upsample","","7-8",ks,_f],["Upsample","","9",ks,wf],["Unsqueeze","","1-12",Vs,sm],["Unsqueeze","","13+",om],["Xor","","7+",Tp]]});function QT(e){let t={},n;for(;(n=Us.exec(e))!==null;){let a=n[3].split(",").map(l=>{let u=l.trim().split(" ");return u&&u.length===2?{type:u[0],name:u[1]}:null}).filter(l=>l!==null);t[n[2]]={params:a,body:n[4]}}for(let a in t){let l=dm.replace("__FUNC__",a),u=new RegExp(l,"gm");for(;(n=u.exec(e))!==null;){let d=n[1],p=n[2],o=n[3].split(","),r=d?`${d} ${p};`:"",i=t[a].body,s="";t[a].params.forEach((h,m)=>{h&&(s+=`${h.type} ${h.name} = ${o[m]};
`)}),i=`${s}
 ${i}`,i=i.replace("return",`${p} = `);let c=`
      ${r}
      {
        ${i}
      }
      `;e=e.replace(n[0],c)}}return e=e.replace(Us,""),e}var Us,dm,e3=N(()=>{"use strict";Us=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,dm="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function Xn(e,t){let n=[],a=[];for(let l=0;l<e.length;++l)e[l]!==1&&(n.push(e[l]),a.push(l));return{newShape:n,keptDims:a}}function t3(e){if(e.length===0)return 1;let t=e[0];for(let n=1;n<e.length;n++)t*=e[n];return t}function pm(e){let t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]}var cm,hm=N(()=>{"use strict";Dt(),Ne(),cm=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,t){let n=this.computeTexture(e,t);return t&&t.isPacked&&(n[0]/=2,n[1]/=2),t&&t.reverseWH?[n[1],n[0]]:n}computeTexture(e,t){let n=t&&t.isPacked;if(e.length===0)return n?[2,2]:[1,1];let a=this.maxTextureSize;if(t&&t.breakAxis!==void 0){let d=t.breakAxis>=e.length?1:e.slice(t.breakAxis).reduce((o,r)=>o*r),p=t.breakAxis<=0?1:e.slice(0,t.breakAxis).reduce((o,r)=>o*r);if(d>a||p>a)Xe.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${t.breakAxis}`);else return[d,p]}let l=e.slice(0);n&&(a=a*2,l=l.map((d,p)=>p>=l.length-2?l[p]%2===0?l[p]:l[p]+1:l[p]),l.length===1&&(l=[2,l[0]])),l.length!==2&&(l=Xn(l).newShape);let u=t3(l);return l.length<=1&&u<=a?[1,u]:l.length===2&&l[0]<=a&&l[1]<=a?l:l.length===3&&l[0]*l[1]<=a&&l[2]<=a?[l[0]*l[1],l[2]]:l.length===3&&l[0]<=a&&l[1]*l[2]<=a?[l[0],l[1]*l[2]]:l.length===4&&l[0]*l[1]*l[2]<=a&&l[3]<=a?[l[0]*l[1]*l[2],l[3]]:l.length===4&&l[0]<=a&&l[1]*l[2]*l[3]<=a?[l[0],l[1]*l[2]*l[3]]:n?pm(u/4).map(d=>d*2):pm(u)}}}),fm,r3=N(()=>{"use strict";Ne(),or(),Ke(),hm(),Xt(),fm=class extends gn{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let e="offsetToCoords";return{offsetToCoords:new Q(`
      vec2 ${e}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let e="coordsToOffset";return{coordsToOffset:new Q(`
      int ${e}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){let t=e.unpackedShape,n=[e.width,e.height],a={},l="getOutputCoords";switch(t.length){case 0:a[l]=this.getOutputScalarCoords();break;case 1:a[l]=this.getOutputPacked1DCoords(t,n);break;case 2:a[l]=this.getOutputPacked2DCoords(t,n);break;case 3:a[l]=this.getOutputPacked3DCoords(t,n);break;default:a[l]=this.getOutputPackedNDCoords(t,n)}let u=`
      void setOutput(vec4 val) {
        ${Te(this.context.glContext.version).output} = val;
      }
    `,d="floatTextureSetRGBA";return a[d]=new Q(u),a}getUnpackedOutputSamplingSnippet(e){let t=e.unpackedShape,n=[e.width,e.height],a={},l="getOutputCoords";switch(t.length){case 0:a[l]=this.getOutputScalarCoords();break;case 1:a[l]=this.getOutputUnpacked1DCoords(t,n);break;case 2:a[l]=this.getOutputUnpacked2DCoords(t,n);break;case 3:a[l]=this.getOutputUnpacked3DCoords(t,n);break;case 4:a[l]=this.getOutputUnpacked4DCoords(t,n);break;case 5:a[l]=this.getOutputUnpacked5DCoords(t,n);break;case 6:a[l]=this.getOutputUnpacked6DCoords(t,n);break;default:throw new Error(`Unsupported output dimensionality: ${t.length}`)}let u=`
        void setOutput(float val) {
          ${Te(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,d="floatTextureSetR";return a[d]=new Q(u),a}getOutputScalarCoords(){return new Q(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(e,t){let n=t,a="";return n[0]===1?(a=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${n[1]}.0);
          }
        `,new Q(a)):n[1]===1?(a=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${n[0]}.0);
          }
        `,new Q(a)):(a=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${n[0]}, ${n[1]}));
          return 2 * (resTexRC.y * ${n[0]} + resTexRC.x);
        }
      `,new Q(a))}getOutputPacked2DCoords(e,t){let n="";if(Cn.arraysEqual(e,t))return n=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${t[0]}, ${t[1]}));
        }
      `,new Q(n);let a=t,l=Math.ceil(e[1]/2);return n=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${a[0]}, ${a[1]}));

          int index = resTexRC.y * ${a[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${l}) * 2;
          int c = 2 * (index / ${l});

          return ivec2(r, c);
        }
      `,new Q(n)}getOutputPacked3DCoords(e,t){let n=[t[0],t[1]],a=Math.ceil(e[2]/2),l=a*Math.ceil(e[1]/2),u=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;

          int b = index / ${l};
          index -= b * ${l};

          // reverse r and c order for packed texture
          int r = imod(index, ${a}) * 2;
          int c = 2 * (index / ${a});

          return ivec3(b, r, c);
        }
      `;return new Q(u)}getOutputPackedNDCoords(e,t){let n=[t[0],t[1]],a=Math.ceil(e[e.length-1]/2),l=a*Math.ceil(e[e.length-2]/2),u=l,d="",p="b, r, c";for(let r=2;r<e.length-1;r++)u*=e[e.length-r-1],d=`
      int b${r} = index / ${u};
      index -= b${r} * ${u};
    `+d,p=`b${r}, `+p;let o=`
      ivec${e.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${n[0]}, ${n[1]}));
        int index = resTexRC.y * ${n[0]} + resTexRC.x;

        ${d}

        int b = index / ${l};
        index -= b * ${l};

        // reverse r and c order for packed texture
        int r = imod(index, ${a}) * 2;
        int c = 2 * (index / ${a});

        return ivec${e.length}(${p});
      }
    `;return new Q(o)}getOutputUnpacked1DCoords(e,t){let n=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          return resTexRC.y * ${t[0]} + resTexRC.x;
        }
      `;return new Q(n)}getOutputUnpacked2DCoords(e,t){let n=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new Q(n)}getOutputUnpacked3DCoords(e,t){let n="",a=e.length,l=null;a<2&&(l=[]),l=new Array(a-1),l[a-2]=e[a-1];for(let p=a-3;p>=0;--p)l[p]=l[p+1]*e[p+1];let u=["r","c","d"],d=l.map((p,o)=>{let r=`int ${u[o]} = index / ${p}`,i=o===l.length-1?`int ${u[o+1]} = index - ${u[o]} * ${p}`:`index -= ${u[o]} * ${p}`;return`${r}; ${i};`}).join("");return n=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${d}
          return ivec3(r, c, d);
        }
      `,new Q(n)}getOutputUnpacked4DCoords(e,t){let n="",a=e.length,l=null;a<2&&(l=[]),l=new Array(a-1),l[a-2]=e[a-1];for(let p=a-3;p>=0;--p)l[p]=l[p+1]*e[p+1];let u=["r","c","d","d2"],d=l.map((p,o)=>{let r=`int ${u[o]} = index / ${p}`,i=o===l.length-1?`int ${u[o+1]} = index - ${u[o]} * ${p}`:`index -= ${u[o]} * ${p}`;return`${r}; ${i};`}).join("");return n=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${d}
          return ivec4(r, c, d, d2);
        }
      `,new Q(n)}getOutputUnpacked5DCoords(e,t){let n="",a=e.length,l=null;a<2&&(l=[]),l=new Array(a-1),l[a-2]=e[a-1];for(let p=a-3;p>=0;--p)l[p]=l[p+1]*e[p+1];let u=["r","c","d","d2","d3"],d=l.map((p,o)=>{let r=`int ${u[o]} = index / ${p}`,i=o===l.length-1?`int ${u[o+1]} = index - ${u[o]} * ${p}`:`index -= ${u[o]} * ${p}`;return`${r}; ${i};`}).join("");return n=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${d}
          return ivec5(r, c, d, d2, d3);
        }
      `,new Q(n)}getOutputUnpacked6DCoords(e,t){let n="",a=e.length,l=null;a<2&&(l=[]),l=new Array(a-1),l[a-2]=e[a-1];for(let p=a-3;p>=0;--p)l[p]=l[p+1]*e[p+1];let u=["r","c","d","d2","d3","d4"],d=l.map((p,o)=>{let r=`int ${u[o]} = index / ${p}`,i=o===l.length-1?`int ${u[o+1]} = index - ${u[o]} * ${p}`:`index -= ${u[o]} * ${p}`;return`${r}; ${i};`}).join("");return n=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${t[0]}, ${t[1]}));
         int index = resTexRC.y * ${t[0]} + resTexRC.x;
         ${d}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new Q(n)}getCommonUtilFuncs(){let e={},t="uvFromFlat";e[t]=new Q(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),t="packedUVfrom1D",e[t]=new Q(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="packedUVfrom2D",e[t]=new Q(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="packedUVfrom3D",e[t]=new Q(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="sampleTexture";let n=Te(this.context.glContext.version);return e[t]=new Q(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${n.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},t=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((n,a)=>{let l=this.context.inputTextureLayouts[a],u=Qo(n);l.isPacked?e[u]=this.getPackedSamplerFromInput(u,n,l):e[u]=this.getUnpackedSamplerFromInput(u,n,l);let d=T$(n);l.unpackedShape.length<=t.unpackedShape.length&&(l.isPacked?e[d]=this.getPackedSamplerAtOutputCoords(d,l,t,n):e[d]=this.getUnpackedSamplerAtOutputCoords(d,l,t,n))}),e}getPackedSamplerAtOutputCoords(e,t,n,a){let l=t.unpackedShape,u=n.unpackedShape,d=Qo(a),p=l.length,o=u.length,r=Ut.getBroadcastDims(l,u),i=ir(o),s=o-p,c,h=fn();p===0?c="":o<2&&r.length>=1?c="coords = 0;":c=r.map(O=>`coords.${h[O+s]} = 0;`).join(`
`);let m="";o<2&&p>0?m="coords":m=l.map((O,E)=>`coords.${h[E+s]}`).join(", ");let b="return outputValue;",x=me.size(l)===1,v=me.size(u)===1;if(p===1&&!x&&!v)b=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if(x&&!v)o===1?b=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:b=`
          return vec4(outputValue.x);
        `;else if(r.length){let O=p-2,E=p-1;r.indexOf(O)>-1&&r.indexOf(E)>-1?b="return vec4(outputValue.x);":r.indexOf(O)>-1?b="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":r.indexOf(E)>-1&&(b="return vec4(outputValue.xx, outputValue.zz);")}let _=`
        int lastDim = coords.${h[o-1]};
        coords.${h[o-1]} = coords.${h[o-2]};
        coords.${h[o-2]} = lastDim;
      `,I=`
      vec4 ${e}() {
        ${i} coords = getOutputCoords();
        ${_}
        ${c}
        vec4 outputValue = ${d}(${m});
        ${b}
      }
    `;return new Q(I,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,t,n,a){let l=[n.width,n.height],u=[t.width,t.height],d=t.unpackedShape.length,p=n.unpackedShape.length,o=t.unpackedShape,r=n.unpackedShape,i=Qo(a);if(d===p&&Cn.arraysEqual(u,l)){let _=`
          float ${e}() {
            return sampleTexture(${a}, TexCoords);
          }
        `;return new Q(_,["coordinates.sampleTexture"])}let s=ir(p),c=Ut.getBroadcastDims(o,r),h=p-d,m,b=fn();d===0?m="":p<2&&c.length>=1?m="coords = 0;":m=c.map(_=>`coords.${b[_+h]} = 0;`).join(`
`);let x="";p<2&&d>0?x="coords":x=t.unpackedShape.map((_,I)=>`coords.${b[I+h]}`).join(", ");let v=`
        float ${e}() {
          ${s} coords = getOutputCoords();
          ${m}
          return ${i}(${x});
        }
      `;return new Q(v,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,t,n){switch(n.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,t);case 1:return this.getPackedSampler1D(e,t,n);case 2:return this.getPackedSampler2D(e,t,n);case 3:return this.getPackedSampler3D(e,t,n);default:return this.getPackedSamplerND(e,t,n)}}getUnpackedSamplerFromInput(e,t,n){let a=n.unpackedShape;switch(a.length){case 0:return this.getUnpackedSamplerScalar(e,t,n);case 1:return this.getUnpackedSampler1D(e,t,n);case 2:return this.getUnpackedSampler2D(e,t,n);case 3:return this.getUnpackedSampler3D(e,t,n);case 4:return this.getUnpackedSampler4D(e,t,n);case 5:return this.getUnpackedSampler5D(e,t,n);case 6:return this.getUnpackedSampler6D(e,t,n);default:throw new Error(`Unsupported dimension ${a.length}-D`)}}getPackedSamplerScalar(e,t){let n=Te(this.context.glContext.version),a=`
          vec4 ${e}() {
            return ${n.texture2D}(${t}, halfCR);
          }
        `;return new Q(a)}getPackedSampler1D(e,t,n){let a=[n.width,n.height],l=[a[1],a[0]],u=Te(this.context.glContext.version),d=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${l[0]}, ${l[1]}, index);
      return ${u.texture2D}(${t}, uv);
    }`;return new Q(d,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,t,n){let a=n.unpackedShape,l=[n.width,n.height],u=Te(this.context.glContext.version),d=l[0],p=l[1];if(l!=null&&Cn.arraysEqual(a,l)){let s=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${p}.0, ${d}.0);
        return ${u.texture2D}(${t}, uv);
      }`;return new Q(s)}let o=l,r=Math.ceil(a[1]/2),i=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${o[1]}, ${o[0]}, ${r}, row, col);
      return ${u.texture2D}(${t}, uv);
    }`;return new Q(i,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,t,n){let a=n.unpackedShape,l=[n.width,n.height],u=[l[0],l[1]],d=Te(this.context.glContext.version);if(a[0]===1){let c=a.slice(1),h=[1,2],m=Bn(a,c),b=["b","row","col"],x=JSON.parse(JSON.stringify(n));x.unpackedShape=m;let v=this.getPackedSamplerFromInput(e,t,x),_=`${v.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${Mn(b,h)});
      } `;return new Q(_,v.dependencies)}let p=u[0],o=u[1],r=Math.ceil(a[2]/2),i=r*Math.ceil(a[1]/2),s=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${o}, ${p}, ${i}, ${r}, b, row, col);
      return ${d.texture2D}(${t}, uv);}`;return new Q(s,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,t,n){let a=n.unpackedShape,l=a.length,u=[n.width,n.height],d=Te(this.context.glContext.version),p=[u[0],u[1]],o=p[1],r=p[0],i=Math.ceil(a[l-1]/2),s=i*Math.ceil(a[l-2]/2),c="int b, int row, int col",h=`b * ${s} + (row / 2) * ${i} + (col / 2)`;for(let b=2;b<l-1;b++)c=`int b${b}, `+c,s*=a[l-b-1],h=`b${b} * ${s} + `+h;let m=`vec4 ${e}(${c}) {
      int index = ${h};
      int texR = index / ${r};
      int texC = index - texR * ${r};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${r}, ${o});
      return ${d.texture2D}(${t}, uv);
    }`;return new Q(m)}getUnpackedSamplerScalar(e,t,n){let[a,l]=[n.width,n.height];if(a===1&&l===1){let d=`
          float ${e}() {
            return sampleTexture(${t}, halfCR);
          }
        `;return new Q(d,["coordinates.sampleTexture"])}let u=`
        float ${e}() {
          int offset_${t} = coordsToOffset(TexCoords, ${a}, ${l});
          vec2 uv = uvFromFlat(${a}, ${l}, offset_${t});
          return sampleTexture(${t}, uv);
        }
      `;return new Q(u,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,t,n){let a=n.width,l=n.height;if(l===1&&a===1){let d=`
        float ${e}(int index) {
          return sampleTexture(${t}, halfCR);
        }
      `;return new Q(d,["coordinates.sampleTexture"])}if(l===1){let d=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${a}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new Q(d,["coordinates.sampleTexture"])}if(a===1){let d=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${l}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new Q(d,["coordinates.sampleTexture"])}let u=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${a}, ${l}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new Q(u,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,t,n){let a=n.unpackedShape,l=[n.height,n.width];if(l!=null&&Cn.arraysEqual(a,l)){let s=l[1],c=l[0],h=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${s}.0, ${c}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new Q(h,["coordinates.sampleTexture"])}let{newShape:u,keptDims:d}=Xn(a),p=u;if(p.length<a.length){let s=Bn(a,p),c=JSON.parse(JSON.stringify(n));c.unpackedShape=s;let h=["col","row"],m=`
          ${this.getUnpackedSamplerFromInput(e,t,c).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${Mn(h,d)});
          }
        `;return new Q(m,["coordinates.sampleTexture"])}let o=l[1],r=l[0];if(r===1){let s=`
          float ${e}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${o}, ${r});
            float index = dot(vec3(row, col, offset_${t}), vec3(${a[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${o}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new Q(s,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(o===1){let s=`
          float ${e}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${o}, ${r});
            float index = dot(vec3(row, col, offset_${t}), vec3(${a[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${r}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new Q(s,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let i=`
        float ${e}(int row, int col) {
          int index = col * ${a[1]} + row;
          vec2 uv = uvFromFlat(${o}, ${r}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new Q(i,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,t,n){let a=n.unpackedShape,l=a[1]*a[2],u=a[2],{newShape:d,keptDims:p}=Xn(a),o=d;if(o.length<a.length){let c=Bn(a,o),h=["batch","col","row"],m=JSON.parse(JSON.stringify(n));m.unpackedShape=c;let b=this.getUnpackedSamplerFromInput(e,t,m),x=p.reverse(),v=`
          ${b.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${Mn(h,x)});
          }
        `;return new Q(v,b.dependencies)}let r=n.width,i=n.height,s=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${l} + col * ${u} + row;
            vec2 uv = uvFromFlat(${r}, ${i}, index);
            return sampleTexture(${t}, uv);
          }
      `;return new Q(s,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,t,n){let a=n.unpackedShape,l=a[3],u=a[2]*l,d=a[1]*u,p=n.width,o=n.height,r=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${d} + col * ${u} +
              depth2 * ${l} + depth;
          vec2 uv = uvFromFlat(${p}, ${o}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new Q(r,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,t,n){let a=n.unpackedShape,l=a[4],u=a[3]*l,d=a[2]*u,p=a[1]*d,{newShape:o,keptDims:r}=Xn(a);if(o.length<a.length){let h=Bn(a,o),m=["row","col","depth","depth2","depth3"],b=JSON.parse(JSON.stringify(n));b.unpackedShape=h;let x=`
          ${this.getUnpackedSamplerFromInput(e,t,b).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${Mn(m,r)});
          }
        `;return new Q(x,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let i=n.width,s=n.height,c=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${p} + col * ${d} + depth * ${u} +
          depth3 * ${l} + depth2;
          vec2 uv = uvFromFlat(${i}, ${s}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new Q(c,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,t,n){let a=n.unpackedShape,l=a[5],u=a[4]*l,d=a[3]*u,p=a[2]*d,o=a[1]*p,{newShape:r,keptDims:i}=Xn(a);if(r.length<a.length){let m=Bn(a,r),b=["row","col","depth","depth2","depth3","depth4"],x=JSON.parse(JSON.stringify(n));x.unpackedShape=m;let v=`
            ${this.getUnpackedSamplerFromInput(e,t,x).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${Mn(b,i)});
            }
          `;return new Q(v,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let s=n.width,c=n.height,h=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${o} + col * ${p} + depth * ${d} +
            depth2 * ${u} + depth3 * ${l} + depth4;
            vec2 uv = uvFromFlat(${s}, ${c}, index);
            return sampleTexture(${t}, uv);
          }
        `;return new Q(h,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,t=e.shape.length,n=e.strides,a=e.width,l=e.height,u=[];for(let p=0;p<t-1;++p)u.push(`
        c[${p}] = offset / ${n[p]};`),u.push(`
        offset -= c[${p}] * ${n[p]};`);u.push(`
        c[${t-1}] = offset;`);let d=`
      void toVec(vec2 texCoords, out int c[${t}]) {
        int offset = coordsToOffset(texCoords, ${a}, ${l});
        ${u.join("")}
      }
      void toVec(int offset, out int c[${t}]) {
        ${u.join("")}
      }
    `;return{toVec:new Q(d,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((t,n)=>{let a=this.context.inputTextureLayouts[n],l=(a.unpackedShape.length>0?a.unpackedShape:a.shape).length,u=`_${t}`;e[u]=new Q(this.getValueFromSingle(t,l,a.width,a.height,!1),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),u=u+"_T",e[u]=new Q(this.getValueFromSingle(t,l,a.width,a.height,!0),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,t,n,a,l){let u=`_${e}`;l&&(u=u+"_T");let d=Te(this.context.glContext.version);return`
        float ${u}(int m[${t}]) {
          int offset = indicesToOffset${u}(m);
          vec2 coords = offsetToCoords(offset, ${n}, ${a});
          float value = getColorAsFloat(${d.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,t,n,a,l){let u=`_${e}_Pack`;l&&(u=u+"_T");let d=Te(this.context.glContext.version);return`
        vec4 ${u}(int m[${t}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${n}, ${a});
          return ${d.texture2D}(${e}, coords);
        }
        `}}}),mm,n3=N(()=>{"use strict";or(),mm=class xl extends gn{constructor(t){super(t)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new Q(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new Q(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let t=xl.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new Q(`
      highp vec4 encode(highp float f) {
        highp float F = abs(f);
        highp float Sign = step(0.0,-f);
        highp float Exponent = floor(log2(F));
        highp float Mantissa = (exp2(- Exponent) * F);
        Exponent = floor(log2(F) + 127.0) + floor(log2(Mantissa));
        highp vec4 rgba;
        rgba[0] = 128.0 * Sign  + floor(Exponent*exp2(-1.0));
        rgba[1] = 128.0 * mod(Exponent,2.0) + mod(floor(Mantissa*128.0),128.0);
        rgba[2] = floor(mod(floor(Mantissa*exp2(23.0 -8.0)),exp2(8.0)));
        rgba[3] = floor(exp2(23.0)*mod(Mantissa,exp2(-15.0)));
        ${t}
        rgba = rgba / 255.0; // values need to be normalized to [0,1]
        return rgba;
    }
        `)}}decodeUint8(){let t=xl.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new Q(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${t}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let t=new ArrayBuffer(4),n=new Uint32Array(t),a=new Uint8Array(t);if(n[0]=3735928559,a[0]===239)return!0;if(a[0]===222)return!1;throw new Error("unknown endianness")}}}),gm,i3=N(()=>{"use strict";or(),Ke(),gm=class extends gn{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=Te(this.context.glContext.version);return{setFragColor:new Q(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new Q(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}}),bm,o3=N(()=>{"use strict";or(),bm=class vi extends gn{constructor(t){super(t)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let t=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((a,l)=>{let u=this.context.inputTextureLayouts[l].unpackedShape;if(u.length<=t){let d=u.length,p=t-d,o=`bcastIndices_${a}`,r="";for(let s=0;s<d;++s)r+=`
          realIndices[${s}] = int( mod(float(bcastedIndices[${p+s}]), ${u[s]}.0) );
          `;let i=`
        void ${o} (int bcastedIndices[${t}], out int realIndices[${d}]) {
          ${r}
        }
        `;n[o]=new Q(i)}}),n}bcastMatmulIndex(){let t=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((a,l)=>{let u=this.context.inputTextureLayouts[l].shape;if(!(u.length<2||u.length>t)){let d=u.length,p=t-d,o=`bcastMatmulIndices_${a}`,r="";for(let s=0;s<d-2;++s)r+=`
          realIndices[${s}] = int( mod(float(bcastedIndices[${p+s}]), ${u[s]}.0) );
          `;let i=`
        void ${o}(int bcastedIndices[${t}], out int realIndices[${d}]) {
          ${r}
          realIndices[${d-1}] = bcastedIndices[${t-1}];
          realIndices[${d-2}] = bcastedIndices[${t-2}];
        }
        `;n[o]=new Q(i)}}),n}indicesToOffset(){let t={};return this.context.programInfo.inputNames.forEach((n,a)=>{let l=this.context.inputTextureLayouts[a].shape,u=this.context.inputTextureLayouts[a].strides,d=l.length,p=`indicesToOffset_${n}`;t[p]=new Q(vi.indexToOffsetSingle(p,d,u)),p=`indicesToOffset_${n}_T`,t[p]=new Q(vi.indexToOffsetSingle(p,d,u.slice().reverse()))}),t}static indexToOffsetSingle(t,n,a){let l="";for(let u=n-1;u>=0;--u)l+=`
        offset += indices[${u}] * ${a[u]};
        `;return`
      int ${t}(int indices[${n}]) {
        int offset = 0;
        ${l}
        return offset;
      }
      `}offsetToIndices(){let t={};return this.context.programInfo.inputNames.forEach((n,a)=>{let l=this.context.inputTextureLayouts[a].shape,u=this.context.inputTextureLayouts[a].strides,d=l.length,p=`offsetToIndices_${n}`;t[p]=new Q(vi.offsetToIndicesSingle(p,d,u)),p=`offsetToIndices_${n}_T`,t[p]=new Q(vi.offsetToIndicesSingle(p,d,u.slice().reverse()))}),t}static offsetToIndicesSingle(t,n,a){let l=[];for(let u=0;u<n-1;++u)l.push(`
      indices[${u}] = offset / ${a[u]};`),l.push(`
        offset -= indices[${u}] * ${a[u]};`);return l.push(`
      indices[${n-1}] = offset;`),`
      void ${t}(int offset, out int indices[${n}]) {
        ${l.join("")}
      }
      `}incrementIndices(){let t={};return this.context.programInfo.inputNames.forEach((n,a)=>{let l=this.context.inputTextureLayouts[a].shape,u=l.length,d=`incrementIndices_${n}`,p="";for(let r=0;r<u;++r)p+=`
        shape[${r}] = ${l[r]};`;let o=`
        void ${d}(int axis, out int indices[${u}]) {
          int shape[${u}];
          ${p};
          for(int i = ${u} -1 ; i >= 0; --i) {
            if(i > axis) continue;
            indices[i] += 1;
            if(indices[i] < shape[i]) {
              break;
            }
            indices[i] = 0;
          }
        }
        `;t[d]=new Q(o)}),t}}}),ym,s3=N(()=>{"use strict";or(),ym=class extends gn{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let e=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},n={};for(let a in t){let l=`${a}Vec`,u="";for(let p=0;p<e;++p)u+=`
          dest[${p}] ${t[a]} src[${p}];
          `;let d=`
        void ${l}(int src[${e}], out int dest[${e}]) {
          ${u}
        }
        `;n[l]=new Q(d)}return n}copyVec(){let e=this.context.outputTextureLayout.shape.length,t="";for(let a=0;a<e;++a)t+=`
        dest[${a}] = src[${a}];
        `;let n=`
      void copyVec(int src[${e}], out int dest[${e}]) {
        ${t}
      }
      `;return{copyVec:new Q(n)}}setVecItem(){let e=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index =${e} + index;
        if (index == 0)
            m[0] = value;
        `;for(let a=1;a<e-1;++a)t+=`
        else if (index == ${a})
            m[${a}] = value;
            `;t+=`
        else
            m[${e-1}] = value;
        `;let n=`
      void setVecItem(out int m[${e}], int index, int value) {
        ${t}
      }
        `;return{setVecItem:new Q(n)}}getVecItem(){let e=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index = ${e} + index;
        if (index == 0)
            return m[0];
      `;for(let a=1;a<e-1;++a)t+=`
        else if (index == ${a})
            return m[${a}];
      `;t+=`
        else
            return m[${e-1}];
        `;let n=`
      int getVecItem(int m[${e}], int index) {
        ${t}
      }
    `;return{getVecItem:new Q(n)}}}}),qs,a3=N(()=>{"use strict";r3(),n3(),i3(),o3(),s3(),qs={encoding:mm,fragcolor:gm,vec:ym,shapeUtils:bm,coordinates:fm}}),_m,u3=N(()=>{"use strict";or(),e3(),a3(),Ke(),_m=class{constructor(e,t,n,a){this.libs={},this.glslLibRoutineDependencyGraph={},this.context=new dp(e,t,n,a),Object.keys(qs).forEach(u=>{let d=new qs[u](this.context);this.libs[u]=d});let l=this.glslLibRoutineDependencyGraph;for(let u in this.libs){let d=this.libs[u].getFunctions();for(let p in d){let o=u+"."+p,r;l[o]?(r=l[o],r.routineBody=d[p].routineBody):(r=new as(o,d[p].routineBody),l[o]=r);let i=d[p].dependencies;if(i)for(let s=0;s<i.length;++s)if(l[i[s]])r.addDependency(l[i[s]]);else{let c=new as(i[s]);l[i[s]]=c,r.addDependency(c)}}}}preprocess(){let e=this.context.programInfo,t=e.shaderSource;return this.context.programInfo.hasMain||(t=`${t}
      ${$$(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),t=QT(t),`${x$(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(t)}
    ${t}`}getImports(e){let t=this.selectGlslLibRoutinesToBeIncluded(e);if(t.length===0)return"";let n="";for(let a=0;a<t.length;++a)if(t[a].routineBody)n+=t[a].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${t[a].name}`);return n}selectGlslLibRoutinesToBeIncluded(e){let t=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(n=>{let a=n.split(".")[1];e.indexOf(a)!==-1&&t.push(this.glslLibRoutineDependencyGraph[n])}),pp.returnOrderedNodes(t)}getUniforms(e,t){let n=[];if(e)for(let a of e)n.push(`uniform sampler2D ${a};`);if(t)for(let a of t)n.push(`uniform ${a.type} ${a.name}${a.arrayLength?`[${a.arrayLength}]`:""};`);return n.join(`
`)}}}),wm,l3=N(()=>{"use strict";st(),Dt(),u3(),Ke(),wm=class{constructor(e,t,n){this.profiler=e,this.glContext=t,this.textureLayoutStrategy=n,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let a=this.glContext.gl,l=e.program;a.useProgram(l);try{this.bindOutput(n),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],t)}catch(u){throw Xe.error("ProgramManager",e.programInfo.shaderSource),u}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,t,n){return this.profiler.event("backend","ProgramManager.build",()=>{let a=new _m(this.glContext,e,t,n),l=a.preprocess(),u=this.compile(l);return{programInfo:e,program:u,uniformLocations:this.getUniformLocations(u,a.context.programInfo.inputNames,a.context.programInfo.variables),attribLocations:this.getAttribLocations(u)}})}compile(e){if(!this.vertexShader){Xe.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let a=v$(this.glContext.version);this.vertexShader=this.glContext.compileShader(a,this.glContext.gl.VERTEX_SHADER)}fe.debug&&Xe.verbose("ProrgramManager",`FragShader:
${e}
`);let t=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),n=this.glContext.createProgram(this.vertexShader,t);return this.glContext.deleteShader(t),n}bindOutput(e){let t=e.width,n=e.height;Xe.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${t}/${n}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,t,n)}bindAttributes(e){let t=e.position,n=e.textureCoord;this.glContext.setVertexAttributes(t,n),this.attributesBound=!0}bindUniforms(e,t,n){var u;let a=this.glContext.gl,l=0;for(let{name:d,type:p,location:o,arrayLength:r}of e){let i=(u=t.find(s=>s.name===d))==null?void 0:u.data;if(p!=="sampler2D"&&!i)throw new Error(`variable '${d}' does not have data defined in program info`);switch(p){case"sampler2D":this.bindTexture(n[l],o,l),l++;break;case"float":r?a.uniform1fv(o,i):a.uniform1f(o,i);break;case"int":r?a.uniform1iv(o,i):a.uniform1i(o,i);break;default:throw new Error(`Uniform not implemented: ${p}`)}}}bindTexture(e,t,n){this.glContext.bindTextureToUniform(e.texture,n,t)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,t,n){let a=[];if(t)for(let l of t)a.push({name:l,type:"sampler2D",location:this.getUniformLocation(e,l)});if(n)for(let l of n)a.push({...l,location:this.getUniformLocation(e,l.name)});return a}getUniformLocation(e,t){let n=this.glContext.gl.getUniformLocation(e,t);if(n===null)throw new Error(`Uniform ${t} not found.`);return n}getAttribLocation(e,t){return this.glContext.gl.getAttribLocation(e,t)}}}),vm,d3=N(()=>{"use strict";Dt(),Ci(),vm=class{constructor(e,t,n,a){this.glContext=e,this.layoutStrategy=t,this.profiler=n,this.config=a,this.pendingRead=new Map,a.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,t,n,a){let l=this.toEncoderType(e),u=this.glContext.getEncoder(l,t.channels||1,a);if(t.isPacked&&a===1)throw new Error("not implemented");let d=t.width,p=t.height,o,r;if(this.config.reuseTextures){o=`${d}x${p}_${u.format}_${u.internalFormat}_${u.textureType}`,r=this.inUseTextures.get(o),r||(r=[],this.inUseTextures.set(o,r));let s=this.idleTextures.get(o);if(s&&s.length>0){let c=s.pop();return r.push(c),a===1&&this.glContext.updateTexture(c,d,p,u,this.toTextureData(e,n)),c}}Xe.verbose("TextureManager",`Creating new texture of size ${t.width}x${t.height}`);let i=this.glContext.allocateTexture(d,p,u,this.toTextureData(e,n));return this.config.reuseTextures&&(r.push(i),this.textureLookup.set(i,o)),i}readTexture(e,t,n){return n||(n=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let a=e.shape.reduce((u,d)=>u*d)*n,l=this.glContext.readTexture(e.texture,e.width,e.height,a,this.toEncoderType(t),n);return this.toTensorData(t,l)})}async readTextureAsync(e,t,n){let a=e.tensor.dataId;if(n||(n=1),this.pendingRead.has(a)){let l=this.pendingRead.get(a);return new Promise(u=>l==null?void 0:l.push(u))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(a,[]);let l=e.shape.reduce((o,r)=>o*r)*n;await this.glContext.createAndWaitForFence();let u=this.glContext.readTexture(e.texture,e.width,e.height,l,this.toEncoderType(t),n),d=this.toTensorData(t,u),p=this.pendingRead.get(a);return this.pendingRead.delete(a),p==null||p.forEach(o=>o(d)),d})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let t=e.shape.reduce((a,l)=>a*l),n=this.glContext.readTexture(e.texture,e.width,e.height,t*4,"byte",4);return new Float32Array(n.buffer,n.byteOffset,t)})}releaseTexture(e,t){let n;if(this.config.reuseTextures&&(n=this.textureLookup.get(e.texture),n)){t&&this.textureLookup.delete(n);let a=this.inUseTextures.get(n);if(a){let l=a.indexOf(e.texture);if(l!==-1){a.splice(l,1);let u=this.idleTextures.get(n);u||(u=[],this.idleTextures.set(n,u)),u.push(e.texture)}}}(!n||t)&&(Xe.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,t){switch(e){case"int16":return t instanceof Int16Array?t:Int16Array.from(t);case"int32":return t instanceof Int32Array?t:Int32Array.from(t);case"int8":return t instanceof Int8Array?t:Int8Array.from(t);case"uint16":return t instanceof Uint16Array?t:Uint16Array.from(t);case"uint32":return t instanceof Uint32Array?t:Uint32Array.from(t);case"uint8":case"bool":return t instanceof Uint8Array?t:Uint8Array.from(t);case"float32":return t instanceof Float32Array?t:Float32Array.from(t);case"float64":return t instanceof Float64Array?t:Float64Array.from(t);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,t){if(t)return t instanceof Float32Array?t:new Float32Array(t)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}}),xm,p3=N(()=>{"use strict";Dt(),xx(),M$(),YT(),l3(),hm(),d3(),xm=class{constructor(e,t){this.backend=e,this.context=t,this.layoutStrategy=new cm(e.glContext.maxTextureSize),this.programManager=new wm(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new vm(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new ip(this)}onGraphInitialized(e){let t=e.getValues().filter(n=>n.from===-1&&n.tensor).map(n=>n.tensor.dataId);this.initializers=new Set(t)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,t){return t?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,t,n=!1){Xe.verbose("WebGLSessionHandler","Storing Texture data in cache"),n?this.packedTextureDataCache.set(e,t):this.unpackedTextureDataCache.set(e,t)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,t,n){let a=wx(e,t,lm);return{impl:a.opImpl,context:a.opInit?a.opInit(e,n):e}}}});function c3(e){let t=0;for(;t<e.length&&e[t]();++t);return t-1}var Gs,h3=N(()=>{"use strict";st(),Ci(),Ci(),Xt(),Gs=class{constructor(e,t){this.frameBufferBound=!1,this.itemsToPoll=[],this.gl=e,this.version=t,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,t,n,a){let l=this.gl,u=l.createTexture();l.bindTexture(l.TEXTURE_2D,u),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MIN_FILTER,l.NEAREST),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MAG_FILTER,l.NEAREST),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE);let d=a?n.encode(a,e*t):null;return l.texImage2D(l.TEXTURE_2D,0,n.internalFormat,e,t,0,n.format,n.textureType,d),this.checkError(),u}updateTexture(e,t,n,a,l){let u=this.gl;u.bindTexture(u.TEXTURE_2D,e);let d=a.encode(l,t*n);u.texSubImage2D(u.TEXTURE_2D,0,0,0,t,n,a.format,a.textureType,d),this.checkError()}attachFramebuffer(e,t,n){let a=this.gl;a.bindTexture(a.TEXTURE_2D,e),a.bindFramebuffer(a.FRAMEBUFFER,this.framebuffer),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,e,0),this.checkError(),a.viewport(0,0,t,n),a.scissor(0,0,t,n)}readTexture(e,t,n,a,l,u){let d=this.gl;u||(u=1),this.frameBufferBound||this.attachFramebuffer(e,t,n);let p=this.getEncoder(l,u),o=p.allocate(t*n);return d.bindTexture(d.TEXTURE_2D,e),d.framebufferTexture2D(d.FRAMEBUFFER,d.COLOR_ATTACHMENT0,d.TEXTURE_2D,e,0),d.readPixels(0,0,t,n,d.RGBA,p.textureType,o),this.checkError(),p.decode(o,a)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,t){let n=this.gl;n.vertexAttribPointer(e,3,n.FLOAT,!1,20,0),n.enableVertexAttribArray(e),t!==-1&&(n.vertexAttribPointer(t,2,n.FLOAT,!1,20,12),n.enableVertexAttribArray(t)),this.checkError()}createProgram(e,t){let n=this.gl,a=n.createProgram();return n.attachShader(a,e),n.attachShader(a,t),n.linkProgram(a),a}compileShader(e,t){let n=this.gl,a=n.createShader(t);if(!a)throw new Error(`createShader() returned null with type ${t}`);if(n.shaderSource(a,e),n.compileShader(a),n.getShaderParameter(a,n.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${n.getShaderInfoLog(a)}
Shader source:
${e}`);return a}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,t,n){let a=this.gl;a.activeTexture(a.TEXTURE0+t),this.checkError(),a.bindTexture(a.TEXTURE_2D,e),this.checkError(),a.uniform1i(n,t),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(fe.debug){let e=this.gl,t=e.getError(),n="";switch(t){case e.NO_ERROR:return;case e.INVALID_ENUM:n="INVALID_ENUM";break;case e.INVALID_VALUE:n="INVALID_VALUE";break;case e.INVALID_OPERATION:n="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:n="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:n="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:n="CONTEXT_LOST_WEBGL";break;default:n=`Unknown WebGL Error: ${t.toString(16)}`}throw new Error(n)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,t,n=0){if(this.version===2)return new ep(this.gl,t);switch(e){case"float":return n===1||this.isRenderFloat32Supported?new is(this.gl,t):new is(this.gl,t,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new tp(this.gl,t);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let t=0;t<this.maxTextureImageUnits;++t)e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,t=e.createBuffer();if(!t)throw new Error("createBuffer() returned null");let n=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,n,e.STATIC_DRAW),this.checkError(),t}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t);let n=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,n,1,1,0,e.RGBA,e.FLOAT,null);let a=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0);let l=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(t),e.deleteFramebuffer(a),l}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,t,n,a,l,u;try{t=e.createTexture(),n=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,t);let d=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,d,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),e.enable(e.BLEND),a=e.createShader(e.VERTEX_SHADER),!a||(e.shaderSource(a,"void main(){}"),e.compileShader(a),l=e.createShader(e.FRAGMENT_SHADER),!l)||(e.shaderSource(l,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(l),u=e.createProgram(),!u)?!1:(e.attachShader(u,a),e.attachShader(u,l),e.linkProgram(u),e.useProgram(u),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),u&&e.deleteProgram(u),a&&e.deleteShader(a),l&&e.deleteShader(l),n&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(n)),t&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(t))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,t=this.disjointTimerQueryWebgl2Extension,n=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,n),n}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,t=this.disjointTimerQueryWebgl2Extension;e.endQuery(t.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let t=!1,n=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let a=this.gl,l=this.disjointTimerQueryWebgl2Extension;t=a.getQueryParameter(e,a.QUERY_RESULT_AVAILABLE),n=a.getParameter(l.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return t&&!n}getTimerResult(e){let t=0;if(this.version===2){let n=this.gl;t=n.getQueryParameter(e,n.QUERY_RESULT),n.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return t/1e6}async waitForQueryAndGetTime(e){return await Gd(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,n=e,a=n.fenceSync(n.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),a===null?t=()=>!0:t=()=>{let l=n.clientWaitSync(a,0,0);return l===n.ALREADY_SIGNALED||l===n.CONDITION_SATISFIED},{query:a,isFencePassed:t}}async pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){let e=c3(this.itemsToPoll.map(t=>t.isDoneFn));for(let t=0;t<=e;++t){let{resolveFn:n}=this.itemsToPoll[t];n()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,t){this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),!(this.itemsToPoll.length>1)&&await Gd(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function $m(e){let t;if((!e||e==="webgl2")&&"webgl2"in Br?t=Br.webgl2:(!e||e==="webgl")&&"webgl"in Br&&(t=Br.webgl),!t)try{let a=m3();t=Tm(a,e)}catch{let a=f3();t=Tm(a,e)}e=e||t.version===1?"webgl":"webgl2";let n=t.gl;return Br[e]=t,n.isContextLost()?(delete Br[e],$m(e)):(n.disable(n.DEPTH_TEST),n.disable(n.STENCIL_TEST),n.disable(n.BLEND),n.disable(n.DITHER),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SAMPLE_COVERAGE),n.enable(n.SCISSOR_TEST),n.enable(n.CULL_FACE),n.cullFace(n.BACK),t)}function Tm(e,t){let n={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},a,l=n;if((!t||t==="webgl2")&&(a=e.getContext("webgl2",l),a))try{return new Gs(a,2)}catch(u){Xe.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${u}`)}if((!t||t==="webgl")&&(a=e.getContext("webgl",l)||e.getContext("experimental-webgl",l),a))try{return new Gs(a,1)}catch(u){Xe.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${u}`)}throw new Error("WebGL is not supported")}function f3(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let e=document.createElement("canvas");return e.width=1,e.height=1,e}function m3(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var Br,g3=N(()=>{"use strict";Dt(),h3(),Br={}}),Im,b3=N(()=>{"use strict";st(),Dt(),p3(),g3(),Im=class{get contextId(){return fe.webgl.contextId}set contextId(e){fe.webgl.contextId=e}get matmulMaxBatchSize(){return fe.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){fe.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return fe.webgl.textureCacheMode}set textureCacheMode(e){fe.webgl.textureCacheMode=e}get pack(){return fe.webgl.pack}set pack(e){fe.webgl.pack=e}get async(){return fe.webgl.async}set async(e){fe.webgl.async=e}initialize(){try{return this.glContext=$m(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),Xe.setWithEnv(fe),fe.webgl.context||Object.defineProperty(fe.webgl,"context",{value:this.glContext.gl}),Xe.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return Xe.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new xm(this,e)}dispose(){this.glContext.dispose()}}});async function Sm(e){if(e){let t=typeof e=="string"?[e]:e;for(let n of t){let a=Hs.get(n);if(a)return a;let l=await y3(n);if(l)return l}}else return Sm(["webgl"]);throw new Error("no available backend to use")}async function y3(e){let t=Om;if(typeof t[e]<"u"&&_3(t[e])){let n=t[e],a=n.initialize();if(typeof a=="object"&&"then"in a&&(a=await a),a)return Hs.set(e,n),n}}function _3(e){let t=e;return"initialize"in t&&typeof t.initialize=="function"&&"createSessionHandler"in t&&typeof t.createSessionHandler=="function"&&"dispose"in t&&typeof t.dispose=="function"}var Hs,Om,w3=N(()=>{"use strict";b3(),Hs=new Map,Om={webgl:new Im}}),Em,Pm,v3=N(()=>{"use strict";Dt(),Em=class{constructor(e,t){this.op=e,this.node=t}},Pm=class{constructor(e,t,n){this.graph=e,this.profiler=n,this.initialize(t)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let t=this.graph.getNodes();if(t.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((n,a)=>new Em(n,t[a])),this.reset(),this._starter=[],this._ops.forEach((n,a)=>{let l=!0;for(let u of n.node.inputs)if(!this._values[u]&&this.graph.getInputIndices().indexOf(u)===-1){l=!1;break}l&&this._starter.push(a)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,t){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let n=e.createInferenceHandler(),a=this.graph.getInputIndices();if(t.length!==a.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${t.length} expected: ${a.length}`);t.forEach((r,i)=>{let s=a[i];this._values[s]=r});let l=this._starter.slice(0),u=this.graph.getValues(),d=this.graph.getNodes(),p=0;for(;p<l.length;){let r=l[p++],i=this._ops[r],s=i.node.inputs.map(b=>this._values[b]);if(s.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${i.node}`);let c=s;Xe.verbose("ExecPlan",`Running op:${i.node.name} (${c.map((b,x)=>`'${i.node.inputs[x]}': ${b.type}[${b.dims.join(",")}]`).join(", ")})`);let h=await this.profiler.event("node",i.node.name,async()=>i.op.impl(n,c,i.op.context));if(h.length!==i.node.outputs.length)throw new Error("the size of output does not match model definition.");h.forEach((b,x)=>{let v=i.node.outputs[x];if(this._values[v])throw new Error(`output [${v}] already has value: op:${i.node.name}`);this._values[v]=b});let m=new Set;h.forEach((b,x)=>{let v=i.node.outputs[x];for(let _ of u[v].to){let I=d[_],O=!0;for(let E of I.inputs)if(!this._values[E]){O=!1;break}O&&m.add(_)}}),l.push(...m)}let o=[];for(let r=0;r<this.graph.getOutputIndices().length;r++){let i=this.graph.getOutputIndices()[r],s=this._values[i];if(s===void 0)throw new Error(`required output [${i}] does not have value`);i===0?await s.getData():s.data,o.push(s)}return Xe.verbose("ExecPlan","disposing of inferenceHandler"),n.dispose(),o})}}}),ve,Ws,x3=N(()=>{"use strict";Di(),ve=ce(Nn()),hn(),Ne(),Ws=class xi{constructor(t){if(this._attributes=new Map,t!=null){for(let n of t)n instanceof ve.onnx.AttributeProto?this._attributes.set(n.name,[xi.getValue(n),xi.getType(n)]):n instanceof Xo.Attribute&&this._attributes.set(n.name(),[xi.getValue(n),xi.getType(n)]);if(this._attributes.size<t.length)throw new Error("duplicated attribute names")}}set(t,n,a){this._attributes.set(t,[a,n])}delete(t){this._attributes.delete(t)}getFloat(t,n){return this.get(t,"float",n)}getInt(t,n){return this.get(t,"int",n)}getString(t,n){return this.get(t,"string",n)}getTensor(t,n){return this.get(t,"tensor",n)}getFloats(t,n){return this.get(t,"floats",n)}getInts(t,n){return this.get(t,"ints",n)}getStrings(t,n){return this.get(t,"strings",n)}getTensors(t,n){return this.get(t,"tensors",n)}get(t,n,a){let l=this._attributes.get(t);if(l===void 0){if(a!==void 0)return a;throw new Error(`required attribute not found: ${t}`)}if(l[1]!==n)throw new Error(`type mismatch: expected ${n} but got ${l[1]}`);return l[0]}static getType(t){let n=t instanceof ve.onnx.AttributeProto?t.type:t.type();switch(n){case ve.onnx.AttributeProto.AttributeType.FLOAT:return"float";case ve.onnx.AttributeProto.AttributeType.INT:return"int";case ve.onnx.AttributeProto.AttributeType.STRING:return"string";case ve.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case ve.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case ve.onnx.AttributeProto.AttributeType.INTS:return"ints";case ve.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case ve.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${ve.onnx.AttributeProto.AttributeType[n]}`)}}static getValue(t){let n=t instanceof ve.onnx.AttributeProto?t.type:t.type();if(n===ve.onnx.AttributeProto.AttributeType.GRAPH||n===ve.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let a=this.getValueNoCheck(t);if(n===ve.onnx.AttributeProto.AttributeType.INT&&qt.isLong(a))return qt.longToNumber(a);if(n===ve.onnx.AttributeProto.AttributeType.INTS){let l=a,u=new Array(l.length);for(let d=0;d<l.length;d++){let p=l[d];u[d]=qt.longToNumber(p)}return u}if(n===ve.onnx.AttributeProto.AttributeType.TENSOR)return t instanceof ve.onnx.AttributeProto?gt.fromProto(a):gt.fromOrtTensor(a);if(n===ve.onnx.AttributeProto.AttributeType.TENSORS){if(t instanceof ve.onnx.AttributeProto)return a.map(l=>gt.fromProto(l));if(t instanceof Xo.Attribute)return a.map(l=>gt.fromOrtTensor(l))}return n===ve.onnx.AttributeProto.AttributeType.STRING&&t instanceof ve.onnx.AttributeProto?Zo(a):n===ve.onnx.AttributeProto.AttributeType.STRINGS&&t instanceof ve.onnx.AttributeProto?a.map(Zo):a}static getValueNoCheck(t){return t instanceof ve.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(t):this.getValueNoCheckFromOrtFormat(t)}static getValueNoCheckFromOnnxFormat(t){switch(t.type){case ve.onnx.AttributeProto.AttributeType.FLOAT:return t.f;case ve.onnx.AttributeProto.AttributeType.INT:return t.i;case ve.onnx.AttributeProto.AttributeType.STRING:return t.s;case ve.onnx.AttributeProto.AttributeType.TENSOR:return t.t;case ve.onnx.AttributeProto.AttributeType.GRAPH:return t.g;case ve.onnx.AttributeProto.AttributeType.FLOATS:return t.floats;case ve.onnx.AttributeProto.AttributeType.INTS:return t.ints;case ve.onnx.AttributeProto.AttributeType.STRINGS:return t.strings;case ve.onnx.AttributeProto.AttributeType.TENSORS:return t.tensors;case ve.onnx.AttributeProto.AttributeType.GRAPHS:return t.graphs;default:throw new Error(`unsupported attribute type: ${ve.onnx.AttributeProto.AttributeType[t.type]}`)}}static getValueNoCheckFromOrtFormat(t){switch(t.type()){case Nt.AttributeType.FLOAT:return t.f();case Nt.AttributeType.INT:return t.i();case Nt.AttributeType.STRING:return t.s();case Nt.AttributeType.TENSOR:return t.t();case Nt.AttributeType.GRAPH:return t.g();case Nt.AttributeType.FLOATS:return t.floatsArray();case Nt.AttributeType.INTS:{let n=[];for(let a=0;a<t.intsLength();a++)n.push(t.ints(a));return n}case Nt.AttributeType.STRINGS:{let n=[];for(let a=0;a<t.stringsLength();a++)n.push(t.strings(a));return n}case Nt.AttributeType.TENSORS:{let n=[];for(let a=0;a<t.tensorsLength();a++)n.push(t.tensors(a));return n}default:throw new Error(`unsupported attribute type: ${Nt.AttributeType[t.type()]}`)}}}}),Ks,Xs,Zt,Zs,Am,$3=N(()=>{"use strict";x3(),Di(),Ks=ce(Nn()),hn(),Ne(),Xs={from:(e,t)=>new Am(e,t)},Zt=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=mt.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},Zs=class{constructor(e,t){e instanceof Ks.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Ws(e.attribute)):e instanceof kd.Node&&(this.name=t??e.name(),this.opType=e.opType(),this.attributes=new Ws(mt.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},Am=class{constructor(e,t){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(t),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof Ks.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof Pd.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let t=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let n=new Map;if(!e.input)throw new Error("missing information in graph: input");let a=[];for(let l of e.input){if(t.has(l.name))throw new Error(`duplicated input name: ${l.name}`);let u=this._allData.push(new Zt(l))-1;t.set(l.name,u),a.push(l.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let l of e.initializer){let u=t.get(l.name);if(u===void 0){let d=new Zt;d.type={shape:{dims:mt.tensorDimsFromProto(l.dims)},tensorType:mt.tensorDataTypeFromProto(l.dataType)},u=this._allData.push(d)-1,t.set(l.name,u)}this._allData[u]._from=-1,this._allData[u].tensor=gt.fromProto(l)}for(let l=0;l<this._allData.length;l++)this._allData[l].tensor||(this._allInputIndices.push(l),this._allInputNames.push(a[l]));if(!e.output)throw new Error("missing information in graph: output");for(let l of e.output){if(t.has(l.name))throw new Error(`duplicated output name: ${l.name}`);let u=this._allData.push(new Zt(l))-1;t.set(l.name,u),this._allOutputIndices.push(u),this._allOutputNames.push(l.name)}if(!e.node)throw new Error("missing information in graph: node");for(let l of e.node){if(!l.name)for(let d=0;;d++){let p=`unnamed_${l.opType}_${d}`;if(!n.has(p)){l.name=p;break}}if(n.has(l.name))throw new Error(`duplicated node name: ${l.name}`);let u=this._nodes.push(new Zs(l))-1;n.set(l.name,u)}for(let l=0;l<this._nodes.length;l++){let u=this._nodes[l],d=e.node[l];if(!d.output)throw new Error(`missing output for node: ${d.name}`);for(let p of d.output){let o=t.get(p);if(typeof o>"u"&&(o=this._allData.push(new Zt)-1,t.set(p,o)),u.outputs.push(o),this._allData[o]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${o}`);if(this._allData[o]._from=l,d.opType==="Constant"){if(!d.attribute||d.attribute.length!==1||!d.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!d.output||d.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");u.outputs.pop(),u.executeNode=!1,this._allData[o]._from=-1,this._allData[o].tensor=gt.fromProto(d.attribute[0].t)}}}for(let l=0;l<this._nodes.length;l++){let u=this._nodes[l],d=e.node[l];if(!d.input)throw new Error(`missing input for node: ${d.name}`);for(let p of d.input){let o=t.get(p);if(typeof o>"u"){if(p===""&&(d.input.length===3||d.input.length===4)&&d.opType==="Resize")continue;throw new Error(`unrecognized input '${p}' for node: ${d.name}`)}u.inputs.push(o),this._allData[o]._to.push(l)}}return!0}buildGraphFromOrtFormat(e){var l,u,d;let t=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let n=new Map,a=[];for(let p=0;p<e.inputsLength();p++){let o=e.inputs(p);if(t.has(o))throw new Error(`duplicated input name: ${o}`);for(let r=0;r<e.nodeArgsLength();r++)if(((l=e.nodeArgs(r))==null?void 0:l.name())===o){let i=new Zt;if(((d=(u=e.nodeArgs(r))==null?void 0:u.type())==null?void 0:d.valueType())!==Nd.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let s=e.nodeArgs(r).type().value(new Dd.TensorTypeAndShape),c=mt.tensorDataTypeFromProto(s.elemType()),h=s.shape(),m=[];for(let x=0;x<h.dimLength();x++)m.push(qt.longToNumber(h.dim(x).value().dimValue()));i.type={shape:{dims:m},tensorType:c};let b=this._allData.push(i)-1;t.set(o,b),a.push(o)}}for(let p=0;p<e.initializersLength();p++){let o=e.initializers(p),r=t.get(o.name());if(r===void 0){let i=new Zt,s=mt.tensorDimsFromORTFormat(o),c=mt.tensorDataTypeFromProto(o.dataType());i.type={shape:{dims:s},tensorType:c},r=this._allData.push(i)-1,t.set(o.name(),r)}this._allData[r]._from=-1,this._allData[r].tensor=gt.fromOrtTensor(o)}for(let p=0;p<this._allData.length;p++)this._allData[p].tensor||(this._allInputIndices.push(p),this._allInputNames.push(a[p]));for(let p=0;p<e.outputsLength();p++){let o=e.outputs(p);if(t.has(o))throw new Error(`duplicated output name: ${o}`);let r=this._allData.push(new Zt)-1;t.set(o,r),this._allOutputIndices.push(r),this._allOutputNames.push(o)}if(!e.nodes)throw new Error("missing information in graph: node");for(let p=0;p<e.nodesLength();p++){let o=e.nodes(p),r=o.name();if(!r)for(let s=0;r=`unnamed_${o.opType()}_${s}`,!!n.has(r);s++);if(n.has(r))throw new Error(`duplicated node name: ${r}`);let i=this._nodes.push(new Zs(o,r))-1;n.set(r,i)}for(let p=0;p<this._nodes.length;p++){let o=this._nodes[p],r=e.nodes(p);if(r==null)throw new Error(`No node exists at index ${p}`);if((r==null?void 0:r.outputsLength())===0)throw new Error(`missing output for node: ${r.name}`);for(let i=0;i<(r==null?void 0:r.outputsLength());i++){let s=r==null?void 0:r.outputs(i),c=t.get(s);if(typeof c>"u"&&(c=this._allData.push(new Zt)-1,t.set(s,c)),o.outputs.push(c),this._allData[c]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${c}`);if(this._allData[c]._from=p,r.opType()==="Constant"){if(r.attributesLength()!==1||!r.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(r.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");o.outputs.pop(),o.executeNode=!1,this._allData[c]._from=-1,this._allData[c].tensor=gt.fromOrtTensor(r.attributes(0).t())}}}for(let p=0;p<this._nodes.length;p++){let o=this._nodes[p],r=e.nodes(p);if(r.inputsLength()===0)throw new Error(`missing input for node: ${r.name}`);for(let i=0;i<r.inputsLength();i++){let s=r.inputs(i),c=t.get(s);if(typeof c>"u")throw new Error(`unrecognized input '${s}' for node: ${r.name()}`);o.inputs.push(c),this._allData[c]._to.push(p)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(a=>{this._allData[a]._to.forEach(l=>{e.add(l)})});let t=Array.from(e),n=new Array(this._nodes.length).fill("white");for(;t.length>0;){let a=t.pop();n[a]==="gray"?n[a]="black":(t.push(a),n[a]="gray",this._nodes[a].outputs.forEach(l=>{let u=this._allData[l];if(typeof u.tensor<"u")throw new Error("node outputs should not be initialized");if(u._from!==a)throw new Error("from property of the Value object doesn't match index of Node being processed");u._to.forEach(d=>{if(n[d]==="gray")throw new Error("model graph is cyclic");n[d]==="white"&&t.push(d)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,t=new Array(this._nodes.length,0),n=0;for(let a=0;a<this._nodes.length;a++)t[a]=n,this._nodes[a].executeNode?(n!==a&&(this._nodes[n]=this._nodes[a]),n++):this._nodes[a].outputs.forEach(l=>{this._allData[l]._from=-2});this._nodes.splice(n,this._nodes.length-n);for(let a=0;a<this._allData.length;a++){let l=this._allData[a];l._from!==void 0&&l._from!==-1&&l._from!==-2&&(l._from=t[l._from]);for(let u=0;u<l._to.length;u++)if(l._to[u]>=0)l._to[u]=t[l._to[u]];else throw new Error("Trying to update a removed node")}e=0;for(let a=0;a<this._allData.length;a++){if(this._allData[a].from===-2&&this._allOutputIndices.indexOf(a+e)===-1){e++,this._allData.splice(a,1),a--;continue}if(e>0){let l=-1;this._allData[a].from!==void 0&&this._allData[a].from!==-1?(l=this._nodes[this._allData[a].from].outputs.indexOf(a+e),l!==-1&&(this._nodes[this._allData[a].from].outputs[l]=a)):(l=this._allInputIndices.indexOf(a+e),l!==-1&&(this._allInputIndices[l]=a)),this._allData[a].to.forEach(u=>{l=this._nodes[u].inputs.indexOf(a+e),l!==-1&&(this._nodes[u].inputs[l]=a)}),this._allData[a].to.length===0&&(l=this._allOutputIndices.indexOf(a+e),l!==-1&&(this._allOutputIndices[l]=a))}}}deleteNode(e){let t=this._nodes[e];if(t.outputs.length>1){for(let d=1;d<t.outputs.length;d++)if(this._allData[t.outputs[d]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}t.executeNode=!1;let n=t.inputs[0],a=t.outputs[0],l=this._allData[a].to;for(let d=0;d<t.inputs.length;d++){let p=this._allData[t.inputs[d]].to.indexOf(e);if(p===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[t.inputs[d]].to.splice(p,1)}this._allData[a]._to=[];let u=this._allOutputIndices.indexOf(a);if(u!==-1&&(this._allOutputIndices[u]=n),l&&l.length>0)for(let d of l){let p=this._nodes[d].inputs.indexOf(a);if(p===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[d].inputs[p]=n,this._allData[n].to.push(d)}}removeAllDropoutNodes(){let e=0;for(let t of this._nodes){if(t.opType==="Dropout"){if(t.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(t.outputs.length!==1&&t.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(t.outputs.length===2&&this._allData[t.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let t of this._nodes)t.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let t=this._allData[e.outputs[0]]._to;if(t.length===1&&this.isActivation(this._nodes[t[0]])){let n=this._nodes[t[0]];if(n.opType==="Clip")if(n.inputs.length===1)try{e.attributes.set("activation_params","floats",[n.attributes.getFloat("min"),n.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[zn,Rn])}else if(n.inputs.length>=3&&this._allData[n.inputs[1]].tensor!==void 0&&this._allData[n.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[n.inputs[1]].tensor.floatData[0],this._allData[n.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",n.opType),this.deleteNode(t[0])}}}}}),km,Dm,Nm,T3=N(()=>{"use strict";km=ce(De()),$3(),Di(),Dm=ce(Nn()),Ne(),Nm=class{constructor(){}load(e,t,n){let a;if(!n)try{this.loadFromOnnxFormat(e,t);return}catch(l){if(n!==void 0)throw l;a=l}try{this.loadFromOrtFormat(e,t)}catch(l){throw n!==void 0?l:new Error(`Failed to load model as ONNX format: ${a}
as ORT format: ${l}`)}}loadFromOnnxFormat(e,t){let n=Dm.onnx.ModelProto.decode(e);if(qt.longToNumber(n.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=n.opsetImport.map(a=>({domain:a.domain,version:qt.longToNumber(a.version)})),this._graph=Xs.from(n.graph,t)}loadFromOrtFormat(e,t){let n=new km.ByteBuffer(e),a=Ad.InferenceSession.getRootAsInferenceSession(n).model();if(qt.longToNumber(a.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let l=0;l<a.opsetImportLength();l++){let u=a.opsetImport(l);this._opsets.push({domain:u==null?void 0:u.domain(),version:qt.longToNumber(u.version())})}this._graph=Xs.from(a.graph(),t)}get graph(){return this._graph}get opsets(){return this._opsets}}}),Cm,I3=N(()=>{"use strict";w3(),v3(),Dt(),T3(),Cm=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=Gl.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,t,n){await this.profiler.event("session","Session.loadModel",async()=>{let a=await Sm(this.backendHint);if(this.sessionHandler=a.createSessionHandler(this.context),this._model=new Nm,typeof e=="string"){let l=e.endsWith(".ort");{let u=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(u),l)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let l=new Uint8Array(e,t||0,n||e.byteLength);this.initialize(l)}})}initialize(e,t){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let n=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,n,t),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new Pm(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let t=this.normalizeAndValidateInputs(e),n=await this._executionPlan.execute(this.sessionHandler,t);return this.createOutput(n)})}normalizeAndValidateInputs(e){let t=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==t.length)throw new Error(`incorrect input array length: expected ${t.length} but got ${e.length}`)}else{if(e.size!==t.length)throw new Error(`incorrect input map size: expected ${t.length} but got ${e.size}`);let n=new Array(e.size),a=0;for(let l=0;l<t.length;++l){let u=e.get(t[l]);if(!u)throw new Error(`missing input tensor for: '${name}'`);n[a++]=u}e=n}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let n=this._model.graph.getInputIndices(),a=this._model.graph.getValues(),l=new Array(n.length);for(let u=0;u<n.length;++u){let d=a[n[u]];l[u]=d.type.shape.dims,this.context.graphInputTypes.push(d.type.tensorType),this.context.graphInputDims.push(e[u].dims)}this.validateInputTensorDims(l,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,t){for(let n=0;n<t.length;n++){let a=e[n],l=t[n].type;if(a!==l)throw new Error(`input tensor[${n}] check failed: expected type '${a}' but got ${l}`)}}validateInputTensorDims(e,t,n){for(let a=0;a<t.length;a++){let l=e[a],u=t[a].dims;if(!this.compareTensorDims(l,u,n))throw new Error(`input tensor[${a}] check failed: expected shape '[${l.join(",")}]' but got [${u.join(",")}]`)}}compareTensorDims(e,t,n){if(e.length!==t.length)return!1;for(let a=0;a<e.length;++a)if(e[a]!==t[a]&&(!n||e[a]!==0))return!1;return!0}createOutput(e){let t=this._model.graph.getOutputNames();if(e.length!==t.length)throw new Error("expected number of outputs do not match number of generated outputs");let n=new Map;for(let a=0;a<t.length;++a)n.set(t[a],e[a]);return n}initializeOps(e){let t=e.getNodes();this._ops=new Array(t.length);for(let n=0;n<t.length;n++)this._ops[n]=this.sessionHandler.resolve(t[n],this._model.opsets,e)}}}),zm,S3=N(()=>{"use strict";st(),hn(),zm=class{constructor(e){this.session=e,this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}get inputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}get outputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}async dispose(){}async run(e,t,n){let a=new Map;for(let d in e)if(Object.hasOwnProperty.call(e,d)){let p=e[d];a.set(d,new gt(p.dims,p.type,void 0,void 0,p.data))}let l=await this.session.run(a),u={};return l.forEach((d,p)=>{u[p]=new $t(d.type,d.data,d.dims)}),u}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}}),Rm={};Sr(Rm,{onnxjsBackend:()=>Mm});var Bm,Mm,O3=N(()=>{"use strict";I3(),S3(),Bm=class{async init(){}async createInferenceSessionHandler(e,t){let n=new Cm(t);return typeof e=="string"?await n.loadModel(e):await n.loadModel(e),new zm(n)}},Mm=new Bm}),Js=N(()=>{"use strict"}),Fm={};Sr(Fm,{default:()=>jm});var Ys,Qs,jm,E3=N(()=>{"use strict";var e;Av(),Mr(),oa(),Ys="ort-wasm-proxy-worker",Qs=((e=globalThis.self)==null?void 0:e.name)===Ys,Qs&&(self.onmessage=t=>{let{type:n,in:a}=t.data;try{switch(n){case"init-wasm":ua(a.wasm).then(()=>{$u(a).then(()=>{postMessage({type:n})},l=>{postMessage({type:n,err:l})})},l=>{postMessage({type:n,err:l})});break;case"init-ep":{let{epName:l,env:u}=a;Tu(u,l).then(()=>{postMessage({type:n})},d=>{postMessage({type:n,err:d})});break}case"copy-from":{let{buffer:l}=a,u=oo(l);postMessage({type:n,out:u});break}case"create":{let{model:l,options:u}=a;Su(l,u).then(d=>{postMessage({type:n,out:d})},d=>{postMessage({type:n,err:d})});break}case"release":Ou(a),postMessage({type:n});break;case"run":{let{sessionId:l,inputIndices:u,inputs:d,outputIndices:p,options:o}=a;Pu(l,u,d,p,new Array(p.length).fill(null),o).then(r=>{r.some(i=>i[3]!=="cpu")?postMessage({type:n,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:n,out:r},ku([...d,...r]))},r=>{postMessage({type:n,err:r})});break}case"end-profiling":Au(a),postMessage({type:n});break;default:}}catch(l){postMessage({type:n,err:l})}}),jm=Qs?null:t=>new Worker(t??yt,{type:"module",name:Ys})}),Lm={};Sr(Lm,{default:()=>Um});async function Vm(e={}){var K2,X2;var t=e,n=!!globalThis.window,a=!!globalThis.WorkerGlobalScope,l=a&&((K2=self.name)==null?void 0:K2.startsWith("em-pthread"));t.mountExternalData=(f,g)=>{f.startsWith("./")&&(f=f.substring(2)),(t.Yc||(t.Yc=new Map)).set(f,g)},t.unmountExternalData=()=>{delete t.Yc,delete t.Zd,delete t.Yd,delete t.$d},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let u=f=>async(...g)=>{var w;try{if(t.Xc)throw Error("Session already started");let y=t.Xc={Kd:g[0],errors:[]},S=await f(...g);if(t.Xc!==y)throw Error("Session mismatch");(w=t.dd)==null||w.flush();let P=y.errors;if(0<P.length){let D=await Promise.all(P);if(D=D.filter(j=>j),0<D.length)throw Error(D.join(`
`))}return S}finally{t.Xc=null}};t.jsepInit=(f,g)=>{if(f==="webgpu"){[t.dd,t.Ad,t.Ed,t.ed,t.Dd,t.$b,t.Fd,t.Hd,t.Bd,t.Cd,t.Gd]=g;let w=t.dd;t.jsepRegisterBuffer=(y,S,P,D)=>w.registerBuffer(y,S,P,D),t.jsepGetBuffer=y=>w.getBuffer(y),t.jsepCreateDownloader=(y,S,P)=>w.createDownloader(y,S,P),t.jsepOnCreateSession=y=>{w.onCreateSession(y)},t.jsepOnReleaseSession=y=>{w.onReleaseSession(y)},t.jsepOnRunStart=y=>w.onRunStart(y),t.Id=(y,S)=>{w.upload(y,S)}}else if(f==="webnn"){let w=g[0];[t.Sd,t.sd,t.webnnEnsureTensor,t.td,t.webnnDownloadTensor,t.Rd,t.webnnEnableTraceEvent]=g.slice(1),t.webnnReleaseTensorId=t.sd,t.webnnUploadTensor=t.td,t.webnnRegisterMLContext=t.Rd,t.webnnOnRunStart=y=>w.onRunStart(y),t.webnnOnRunEnd=w.onRunEnd.bind(w),t.webnnOnReleaseSession=y=>{w.onReleaseSession(y)},t.webnnCreateMLTensorDownloader=(y,S)=>w.createMLTensorDownloader(y,S),t.webnnRegisterMLTensor=(y,S,P,D)=>w.registerMLTensor(y,S,P,D),t.webnnCreateMLContext=y=>w.createMLContext(y),t.webnnRegisterGraphInput=w.registerGraphInput.bind(w),t.webnnIsGraphInput=w.isGraphInput.bind(w),t.webnnRegisterGraphOutput=w.registerGraphOutput.bind(w),t.webnnIsGraphOutput=w.isGraphOutput.bind(w),t.webnnCreateTemporaryTensor=w.createTemporaryTensor.bind(w),t.webnnIsGraphInputOutputTypeSupported=w.isGraphInputOutputTypeSupported.bind(w)}};let d=()=>{let f=g=>(...w)=>{let y=Wt;return w=g(...w),Wt!=y?new Promise((S,P)=>{Yu={resolve:S,reject:P}}):w};(()=>{for(let g of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[g]=f(t[g])})(),u!==void 0&&(t._OrtRun=u(t._OrtRun),t._OrtRunWithBinding=u(t._OrtRunWithBinding)),d=void 0};t.asyncInit=()=>{d==null||d()};var p,o,r=(f,g)=>{throw g},i=self.location.href,s="";if(n||a){try{s=new URL(".",i).href}catch{}a&&(o=f=>{var g=new XMLHttpRequest;return g.open("GET",f,!1),g.responseType="arraybuffer",g.send(null),new Uint8Array(g.response)}),p=async f=>{if(k(f))return new Promise((w,y)=>{var S=new XMLHttpRequest;S.open("GET",f,!0),S.responseType="arraybuffer",S.onload=()=>{S.status==200||S.status==0&&S.response?w(S.response):y(S.status)},S.onerror=y,S.send(null)});var g=await fetch(f,{credentials:"same-origin"});if(g.ok)return g.arrayBuffer();throw Error(g.status+" : "+g.url)}}var c,h,m,b,x,v,_=console.log.bind(console),I=console.error.bind(console),O=_,E=I,A=!1,k=f=>f.startsWith("file://");function T(){mr.buffer!=F.buffer&&W()}if(l){let f=function(g){try{var w=g.data,y=w.Sc;if(y==="load"){let S=[];self.onmessage=P=>S.push(P),v=()=>{postMessage({Sc:"loaded"});for(let P of S)f(P);self.onmessage=f};for(let P of w.xd)t[P]&&!t[P].proxy||(t[P]=(...D)=>{postMessage({Sc:"callHandler",vd:P,args:D})},P=="print"&&(O=t[P]),P=="printErr"&&(E=t[P]));mr=w.Od,W(),h=w.Pd,Pe(),Io()}else if(y==="run"){(function(S){var P=(T(),$)[S+52>>>2>>>0];S=(T(),$)[S+56>>>2>>>0],i2(P,P-S),ge(P)})(w.Rc),nl(w.Rc,0,0,1,0,0),o1(),Xu(w.Rc),M||(Y1(),M=!0);try{RI(w.Md,w.bd)}catch(S){if(S!="unwind")throw S}}else w.target!=="setimmediate"&&(y==="checkMailbox"?M&&yo():y&&(E(`worker: received unknown command ${y}`),E(w)))}catch(S){throw Q1(),S}};var M=!1;self.onunhandledrejection=g=>{throw g.reason||g},self.onmessage=f}var F,J,K,C,R,$,z,G,re,V,ee,U=!1;function W(){var f=mr.buffer;t.HEAP8=F=new Int8Array(f),K=new Int16Array(f),t.HEAPU8=J=new Uint8Array(f),C=new Uint16Array(f),t.HEAP32=R=new Int32Array(f),t.HEAPU32=$=new Uint32Array(f),z=new Float32Array(f),G=new Float64Array(f),re=new BigInt64Array(f),V=new BigUint64Array(f)}function X(){U=!0,l?v():rr.sb()}function q(f){throw E(f="Aborted("+f+")"),A=!0,f=new WebAssembly.RuntimeError(f+". Build with -sASSERTIONS for more info."),x==null||x(f),f}function le(){return{a:{ma:oO,hb:iO,g:BI,J:MI,f:FI,o:jI,i:LI,$:VI,b:UI,S:qI,Ia:p1,n:GI,aa:m1,Ya:g1,Ea:b1,Ga:y1,Za:_1,Wa:w1,Pa:v1,Va:x1,ka:$1,Fa:T1,Ca:I1,Xa:S1,Da:O1,cb:HI,fa:WI,xa:KI,va:ZI,ea:YI,N:QI,H:eS,wa:tS,_:uS,ya:lS,Sa:dS,Aa:cS,Ja:hS,ta:fS,ga:mS,Ra:Xu,$a:gS,Q:wS,r:IS,c:Wu,ib:SS,y:OS,M:ES,D:PS,l:AS,s:z1,jb:kS,I:DS,R:NS,j:CS,u:zS,q:RS,k:BS,Ma:MS,Na:FS,Oa:jS,Ka:F1,La:j1,ua:L1,eb:VS,bb:qS,v:GS,ba:HS,ha:WS,ab:US,V:KS,_a:XS,Ba:ZS,F:LS,T:JS,la:$o,za:QS,gb:YS,fb:eO,Ta:G1,Ua:H1,Ha:mi,U:W1,ja:K1,Qa:X1,ia:Z1,lb:LO,na:RO,mb:jO,oa:zO,G:IO,e:lO,t:aO,w:sO,B:_O,nb:DO,Z:kO,x:cO,pa:NO,X:BO,ca:AO,ob:PO,pb:EO,O:wO,qa:OO,qb:SO,L:$O,Y:CO,d:uO,A:pO,m:dO,kb:VO,p:fO,z:mO,C:hO,E:gO,K:vO,ra:TO,P:MO,da:xO,W:FO,rb:yO,sa:bO,h:rO,a:mr,db:vt}}}async function Pe(){function f(y,S){var P=rr=y.exports;y={};for(let[D,j]of Object.entries(P))typeof j=="function"?(P=bS(j),y[D]=P):y[D]=j;return rr=y,rr=(function(){var D=rr,j=Y=>he=>Y(he)>>>0,Z=Y=>()=>Y()>>>0;return(D=Object.assign({},D)).tb=j(D.tb),D.Xb=Z(D.Xb),D.Zb=j(D.Zb),D.lc=j(D.lc),D.mc=Z(D.mc),D.qc=j(D.qc),D})(),n1.push(rr._b),J1=(y=rr).tb,Y1=y.ub,t._OrtInit=y.vb,t._OrtGetLastError=y.wb,t._OrtCreateSessionOptions=y.xb,t._OrtAppendExecutionProvider=y.yb,t._OrtAddFreeDimensionOverride=y.zb,t._OrtAddSessionConfigEntry=y.Ab,t._OrtReleaseSessionOptions=y.Bb,t._OrtCreateSession=y.Cb,t._OrtReleaseSession=y.Db,t._OrtGetInputOutputCount=y.Eb,t._OrtGetInputOutputMetadata=y.Fb,t._OrtFree=y.Gb,t._OrtCreateTensor=y.Hb,t._OrtGetTensorData=y.Ib,t._OrtReleaseTensor=y.Jb,t._OrtCreateRunOptions=y.Kb,t._OrtAddRunConfigEntry=y.Lb,t._OrtReleaseRunOptions=y.Mb,t._OrtCreateBinding=y.Nb,t._OrtBindInput=y.Ob,t._OrtBindOutput=y.Pb,t._OrtClearBoundOutputs=y.Qb,t._OrtReleaseBinding=y.Rb,t._OrtRunWithBinding=y.Sb,t._OrtRun=y.Tb,t._OrtEndProfiling=y.Ub,t._JsepOutput=y.Vb,t._JsepGetNodeName=y.Wb,To=y.Xb,Kt=t._free=y.Yb,yi=t._malloc=y.Zb,nl=y.ac,Q1=y.bc,e2=y.cc,t2=y.dc,il=y.ec,r2=y.fc,n2=y.gc,we=y.hc,_i=y.ic,i2=y.jc,ge=y.kc,ol=y.lc,_e=y.mc,o2=y.nc,sl=y.oc,s2=y.pc,a2=y.qc,u2=y.rc,al=y.sc,l2=y.tc,d2=y.uc,p2=y.vc,c2=y.wc,h2=y.xc,f2=y.yc,m2=y.zc,g2=y.Ac,b2=y.Bc,y2=y.Cc,_2=y.Dc,w2=y.Ec,v2=y.Fc,x2=y.Gc,$2=y.Hc,T2=y.Ic,I2=y.Jc,S2=y.Kc,O2=y.Lc,E2=y.Mc,P2=y.Nc,A2=y.Pc,k2=y.Qc,D2=y.$c,N2=y.ad,C2=y.fd,z2=y.kd,R2=y.ld,B2=y.md,M2=y.nd,F2=y.od,j2=y.pd,L2=y.qd,V2=y.rd,U2=y.wd,q2=y.Ud,G2=y.Vd,H2=y.Wd,W2=y.Xd,h=S,rr}var g,w=le();return t.instantiateWasm?new Promise(y=>{t.instantiateWasm(w,(S,P)=>{y(f(S,P))})}):l?f(new WebAssembly.Instance(h,le()),h):(ee??(ee=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",s):s+"ort-wasm-simd-threaded.jsep.wasm":new URL("/SCOPE/assets/ort-wasm-simd-threaded.jsep-D-icqfN-.wasm",self.location.href).href),g=await(async function(y){var S=ee;if(!c&&!k(S))try{var P=fetch(S,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(P,y)}catch(D){E(`wasm streaming compile failed: ${D}`),E("falling back to ArrayBuffer instantiation")}return(async function(D,j){try{var Z=await(async function(Y){if(!c)try{var he=await p(Y);return new Uint8Array(he)}catch{}if(Y==ee&&c)Y=new Uint8Array(c);else{if(!o)throw"both async and sync fetching of the wasm failed";Y=o(Y)}return Y})(D);return await WebAssembly.instantiate(Z,j)}catch(Y){E(`failed to asynchronously prepare wasm: ${Y}`),q(Y)}})(S,y)})(w),f(g.instance,g.module))}class xe{constructor(g){Z2(this,"name","ExitStatus");this.message=`Program terminated with exit(${g})`,this.status=g}}var tt=f=>{f.terminate(),f.onmessage=()=>{}},pt=[],wt=0,ct=null,hr=f=>{fr.length==0&&(a1(),s1(fr[0]));var g=fr.pop();if(!g)return 6;gi.push(g),Zr[f.Rc]=g,g.Rc=f.Rc;var w={Sc:"run",Md:f.Ld,bd:f.bd,Rc:f.Rc};return g.postMessage(w,f.jd),0},Me=0,pe=(f,g,...w)=>{var y,S=16*w.length,P=_e(),D=ol(S),j=D>>>3;for(y of w)typeof y=="bigint"?((T(),re)[j++>>>0]=1n,(T(),re)[j++>>>0]=y):((T(),re)[j++>>>0]=0n,(T(),G)[j++>>>0]=y);return f=e2(f,0,S,D,g),ge(P),f};function vt(f){if(l)return pe(0,1,f);if(m=f,!(0<Me)){for(var g of gi)tt(g);for(g of fr)tt(g);fr=[],gi=[],Zr={},A=!0}r(0,new xe(f))}function ho(f){if(l)return pe(1,0,f);mi(f)}var mi=f=>{if(m=f,l)throw ho(f),"unwind";vt(f)},fr=[],gi=[],n1=[],Zr={},i1=f=>{var g=f.Rc;delete Zr[g],fr.push(f),gi.splice(gi.indexOf(f),1),f.Rc=0,t2(g)};function o1(){n1.forEach(f=>f())}var s1=f=>new Promise(g=>{f.onmessage=S=>{var P=S.data;if(S=P.Sc,P.Zc&&P.Zc!=To()){var D=Zr[P.Zc];D?D.postMessage(P,P.jd):E(`Internal error! Worker sent a message "${S}" to target pthread ${P.Zc}, but that thread no longer exists!`)}else S==="checkMailbox"?yo():S==="spawnThread"?hr(P):S==="cleanupThread"?bo(()=>{i1(Zr[P.Nd])}):S==="loaded"?(f.loaded=!0,g(f)):P.target==="setimmediate"?f.postMessage(P):S==="uncaughtException"?f.onerror(P.error):S==="callHandler"?t[P.vd](...P.args):S&&E(`worker sent an unknown command ${S}`)},f.onerror=S=>{throw E(`worker sent an error! ${S.filename}:${S.lineno}: ${S.message}`),S};var w,y=[];for(w of[])t.propertyIsEnumerable(w)&&y.push(w);f.postMessage({Sc:"load",xd:y,Od:mr,Pd:h})});function a1(){var f=new Worker((()=>{let g=URL;return self.location.href>"file:"&&self.location.href<"file;"?new g("ort.all.bundle.min.mjs",self.location.href):new URL(self.location.href)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});fr.push(f)}var mr,RI=(f,g)=>{Me=0,f=al(f,g),0<Me?m=f:il(f)},fo=[],mo=0;function BI(f){var g=new Uu(f>>>=0);return(T(),F)[g.Tc+12>>>0]==0&&(u1(g,!0),mo--),l1(g,!1),fo.push(g),a2(f)}var $n=0,MI=()=>{we(0,0);var f=fo.pop();o2(f.cd),$n=0};function u1(f,g){g=g?1:0,(T(),F)[f.Tc+12>>>0]=g}function l1(f,g){g=g?1:0,(T(),F)[f.Tc+13>>>0]=g}class Uu{constructor(g){this.cd=g,this.Tc=g-24}}var qu=f=>{var g=$n;if(!g)return _i(0),0;var w=new Uu(g);(T(),$)[w.Tc+16>>>2>>>0]=g;var y=(T(),$)[w.Tc+4>>>2>>>0];if(!y)return _i(0),g;for(var S of f){if(S===0||S===y)break;if(s2(S,y,w.Tc+16))return _i(S),g}return _i(y),g};function FI(){return qu([])}function jI(f){return qu([f>>>0])}function LI(f,g,w,y){return qu([f>>>0,g>>>0,w>>>0,y>>>0])}var VI=()=>{var f=fo.pop();f||q("no exception to throw");var g=f.cd;throw(T(),F)[f.Tc+13>>>0]==0&&(fo.push(f),l1(f,!0),u1(f,!1),mo++),sl(g),$n=g};function UI(f,g,w){var y=new Uu(f>>>=0);throw g>>>=0,w>>>=0,(T(),$)[y.Tc+16>>>2>>>0]=0,(T(),$)[y.Tc+4>>>2>>>0]=g,(T(),$)[y.Tc+8>>>2>>>0]=w,sl(f),mo++,$n=f}var qI=()=>mo;function d1(f,g,w,y){return l?pe(2,1,f,g,w,y):p1(f,g,w,y)}function p1(f,g,w,y){if(f>>>=0,g>>>=0,w>>>=0,y>>>=0,!globalThis.SharedArrayBuffer)return 6;var S=[];return l&&S.length===0?d1(f,g,w,y):(f={Ld:w,Rc:f,bd:y,jd:S},l?(f.Sc="spawnThread",postMessage(f,S),0):hr(f))}function GI(f){throw $n||($n=f>>>0),$n}var c1=globalThis.TextDecoder&&new TextDecoder,h1=(f,g,w,y)=>{if(w=g+w,y)return w;for(;f[g]&&!(g>=w);)++g;return g},f1=(f,g=0,w,y)=>{if(16<(w=h1(f,g>>>=0,w,y))-g&&f.buffer&&c1)return c1.decode(f.buffer instanceof ArrayBuffer?f.subarray(g,w):f.slice(g,w));for(y="";g<w;){var S=f[g++];if(128&S){var P=63&f[g++];if((224&S)==192)y+=String.fromCharCode((31&S)<<6|P);else{var D=63&f[g++];65536>(S=(240&S)==224?(15&S)<<12|P<<6|D:(7&S)<<18|P<<12|D<<6|63&f[g++])?y+=String.fromCharCode(S):(S-=65536,y+=String.fromCharCode(55296|S>>10,56320|1023&S))}}else y+=String.fromCharCode(S)}return y},Ye=(f,g,w)=>(f>>>=0)?f1((T(),J),f,g,w):"";function m1(f,g,w){return l?pe(3,1,f,g,w):0}function g1(f,g){if(l)return pe(4,1,f,g)}function b1(f,g){if(l)return pe(5,1,f,g)}function y1(f,g,w){if(l)return pe(6,1,f,g,w)}function _1(f,g,w){return l?pe(7,1,f,g,w):0}function w1(f,g){if(l)return pe(8,1,f,g)}function v1(f,g,w){if(l)return pe(9,1,f,g,w)}function x1(f,g,w,y){if(l)return pe(10,1,f,g,w,y)}function $1(f,g,w,y){if(l)return pe(11,1,f,g,w,y)}function T1(f,g,w,y){if(l)return pe(12,1,f,g,w,y)}function I1(f){if(l)return pe(13,1,f)}function S1(f,g){if(l)return pe(14,1,f,g)}function O1(f,g,w){if(l)return pe(15,1,f,g,w)}var HI=()=>q(""),Ht=f=>{f>>>=0;for(var g="";;){var w=(T(),J)[f++>>>0];if(!w)return g;g+=String.fromCharCode(w)}},Gu={},Hu={},Tn=class extends Error{constructor(f){super(f),this.name="BindingError"}};function tr(f,g,w={}){return(function(y,S,P={}){var D=S.name;if(!y)throw new Tn(`type "${D}" must have a positive integer typeid pointer`);if(Hu.hasOwnProperty(y)){if(P.yd)return;throw new Tn(`Cannot register type '${D}' twice`)}Hu[y]=S,Gu.hasOwnProperty(y)&&(S=Gu[y],delete Gu[y],S.forEach(j=>j()))})(f,g,w)}var E1=(f,g,w)=>{switch(g){case 1:return w?y=>(T(),F)[y>>>0]:y=>(T(),J)[y>>>0];case 2:return w?y=>(T(),K)[y>>>1>>>0]:y=>(T(),C)[y>>>1>>>0];case 4:return w?y=>(T(),R)[y>>>2>>>0]:y=>(T(),$)[y>>>2>>>0];case 8:return w?y=>(T(),re)[y>>>3>>>0]:y=>(T(),V)[y>>>3>>>0];default:throw new TypeError(`invalid integer width (${g}): ${f}`)}};function WI(f,g,w,y,S){f>>>=0,w>>>=0,g=Ht(g>>>0);let P=D=>D;if(y=y===0n){let D=8*w;P=j=>BigInt.asUintN(D,j),S=P(S)}tr(f,{name:g,Oc:P,Vc:(D,j)=>(typeof j=="number"&&(j=BigInt(j)),j),Uc:E1(g,w,!y),Wc:null})}function KI(f,g,w,y){tr(f>>>=0,{name:g=Ht(g>>>0),Oc:function(S){return!!S},Vc:function(S,P){return P?w:y},Uc:function(S){return this.Oc((T(),J)[S>>>0])},Wc:null})}var P1=[],Jr=[0,1,,1,null,1,!0,1,!1,1];function Wu(f){9<(f>>>=0)&&--Jr[f+1]===0&&(Jr[f]=void 0,P1.push(f))}var Et=f=>{if(!f)throw new Tn(`Cannot use deleted val. handle = ${f}`);return Jr[f]},jt=f=>{switch(f){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let g=P1.pop()||Jr.length;return Jr[g]=f,Jr[g+1]=1,g}};function Ku(f){return this.Oc((T(),$)[f>>>2>>>0])}var XI={name:"emscripten::val",Oc:f=>{var g=Et(f);return Wu(f),g},Vc:(f,g)=>jt(g),Uc:Ku,Wc:null};function ZI(f){return tr(f>>>0,XI)}var JI=(f,g)=>{switch(g){case 4:return function(w){return this.Oc((T(),z)[w>>>2>>>0])};case 8:return function(w){return this.Oc((T(),G)[w>>>3>>>0])};default:throw new TypeError(`invalid float width (${g}): ${f}`)}};function YI(f,g,w){w>>>=0,tr(f>>>=0,{name:g=Ht(g>>>0),Oc:y=>y,Vc:(y,S)=>S,Uc:JI(g,w),Wc:null})}function QI(f,g,w,y,S){f>>>=0,w>>>=0,g=Ht(g>>>0);let P=j=>j;if(y===0){var D=32-8*w;P=j=>j<<D>>>D,S=P(S)}tr(f,{name:g,Oc:P,Vc:(j,Z)=>Z,Uc:E1(g,w,y!==0),Wc:null})}function eS(f,g,w){function y(P){var D=(T(),$)[P>>>2>>>0];return P=(T(),$)[P+4>>>2>>>0],new S((T(),F).buffer,P,D)}var S=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][g];tr(f>>>=0,{name:w=Ht(w>>>0),Oc:y,Uc:y},{yd:!0})}var gr=(f,g,w)=>{var y=(T(),J);if(g>>>=0,0<w){var S=g;w=g+w-1;for(var P=0;P<f.length;++P){var D=f.codePointAt(P);if(127>=D){if(g>=w)break;y[g++>>>0]=D}else if(2047>=D){if(g+1>=w)break;y[g++>>>0]=192|D>>6,y[g++>>>0]=128|63&D}else if(65535>=D){if(g+2>=w)break;y[g++>>>0]=224|D>>12,y[g++>>>0]=128|D>>6&63,y[g++>>>0]=128|63&D}else{if(g+3>=w)break;y[g++>>>0]=240|D>>18,y[g++>>>0]=128|D>>12&63,y[g++>>>0]=128|D>>6&63,y[g++>>>0]=128|63&D,P++}}y[g>>>0]=0,f=g-S}else f=0;return f},go=f=>{for(var g=0,w=0;w<f.length;++w){var y=f.charCodeAt(w);127>=y?g++:2047>=y?g+=2:55296<=y&&57343>=y?(g+=4,++w):g+=3}return g};function tS(f,g){tr(f>>>=0,{name:g=Ht(g>>>0),Oc(w){var y=(T(),$)[w>>>2>>>0];return y=Ye(w+4,y,!0),Kt(w),y},Vc(w,y){y instanceof ArrayBuffer&&(y=new Uint8Array(y));var S=typeof y=="string";if(!(S||ArrayBuffer.isView(y)&&y.BYTES_PER_ELEMENT==1))throw new Tn("Cannot pass non-string to std::string");var P=S?go(y):y.length,D=yi(4+P+1),j=D+4;return(T(),$)[D>>>2>>>0]=P,S?gr(y,j,P+1):(T(),J).set(y,j>>>0),w!==null&&w.push(Kt,D),D},Uc:Ku,Wc(w){Kt(w)}})}var A1=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,rS=(f,g,w)=>{if(f>>>=1,16<(g=h1((T(),C),f,g/2,w))-f&&A1)return A1.decode((T(),C).slice(f,g));for(w="";f<g;++f){var y=(T(),C)[f>>>0];w+=String.fromCharCode(y)}return w},nS=(f,g,w)=>{if(w??(w=2147483647),2>w)return 0;var y=g;w=(w-=2)<2*f.length?w/2:f.length;for(var S=0;S<w;++S){var P=f.charCodeAt(S);(T(),K)[g>>>1>>>0]=P,g+=2}return(T(),K)[g>>>1>>>0]=0,g-y},iS=f=>2*f.length,oS=(f,g,w)=>{var y="";f>>>=2;for(var S=0;!(S>=g/4);S++){var P=(T(),$)[f+S>>>0];if(!P&&!w)break;y+=String.fromCodePoint(P)}return y},sS=(f,g,w)=>{if(g>>>=0,w??(w=2147483647),4>w)return 0;var y=g;w=y+w-4;for(var S=0;S<f.length;++S){var P=f.codePointAt(S);if(65535<P&&S++,(T(),R)[g>>>2>>>0]=P,(g+=4)+4>w)break}return(T(),R)[g>>>2>>>0]=0,g-y},aS=f=>{for(var g=0,w=0;w<f.length;++w)65535<f.codePointAt(w)&&w++,g+=4;return g};function uS(f,g,w){if(f>>>=0,g>>>=0,w=Ht(w>>>=0),g===2)var y=rS,S=nS,P=iS;else y=oS,S=sS,P=aS;tr(f,{name:w,Oc:D=>{var j=(T(),$)[D>>>2>>>0];return j=y(D+4,j*g,!0),Kt(D),j},Vc:(D,j)=>{if(typeof j!="string")throw new Tn(`Cannot pass non-string to C++ string type ${w}`);var Z=P(j),Y=yi(4+Z+g);return(T(),$)[Y>>>2>>>0]=Z/g,S(j,Y+4,Z+g),D!==null&&D.push(Kt,Y),Y},Uc:Ku,Wc(D){Kt(D)}})}function lS(f,g){tr(f>>>=0,{zd:!0,name:g=Ht(g>>>0),Oc:()=>{},Vc:()=>{}})}function dS(f){nl(f>>>0,!a,1,!n,131072,!1),o1()}var bo=f=>{if(!A)try{if(f(),!(0<Me))try{l?To()&&il(m):mi(m)}catch(g){g instanceof xe||g=="unwind"||r(0,g)}}catch(g){g instanceof xe||g=="unwind"||r(0,g)}},pS=!Atomics.waitAsync||((X2=globalThis.navigator)==null?void 0:X2.userAgent)&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function Xu(f){f>>>=0,pS||(Atomics.waitAsync((T(),R),f>>>2,f).value.then(yo),f+=128,Atomics.store((T(),R),f>>>2,1))}var yo=()=>bo(()=>{var f=To();f&&(Xu(f),n2())});function cS(f,g){(f>>>=0)==g>>>0?setTimeout(yo):l?postMessage({Zc:f,Sc:"checkMailbox"}):(f=Zr[f])&&f.postMessage({Sc:"checkMailbox"})}var Zu=[];function hS(f,g,w,y,S){for(g>>>=0,S>>>=0,Zu.length=0,w=S>>>3,y=S+y>>>3;w<y;){var P;P=(T(),re)[w++>>>0]?(T(),re)[w++>>>0]:(T(),G)[w++>>>0],Zu.push(P)}return(g?ul[g]:nO[f])(...Zu)}var fS=()=>{Me=0};function mS(f){f>>>=0,l?postMessage({Sc:"cleanupThread",Nd:f}):i1(Zr[f])}function gS(f){}var _o=f=>{try{f()}catch(g){q(g)}};function bS(f){var g=(...w)=>{wo.push(f);try{return f(...w)}finally{A||(wo.pop(),Wt&&br===1&&wo.length===0&&(br=0,Me+=1,_o(G2),typeof Fibers<"u"&&Fibers.be()))}};return N1.set(f,g),g}var br=0,Wt=null,k1=0,wo=[],Ju=new Map,D1=new Map,N1=new Map,yS=0,Yu=null,_S=[],C1=f=>(function(g){if(!A){if(br===0){var w=!1,y=!1;g((S=0)=>{if(!A&&(k1=S,w=!0,y)){br=2,_o(()=>H2(Wt)),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.resume(),S=!1;try{var P=(function(){var Z=(T(),R)[Wt+8>>>2>>>0];return Z=D1.get(Z),Z=N1.get(Z),--Me,Z()})()}catch(Z){P=Z,S=!0}var D=!1;if(!Wt){var j=Yu;j&&(Yu=null,(S?j.reject:j.resolve)(P),D=!0)}if(S&&!D)throw P}}),y=!0,w||(br=1,Wt=(function(){var S=yi(65548),P=S+12;if((T(),$)[S>>>2>>>0]=P,(T(),$)[S+4>>>2>>>0]=P+65536,P=wo[0],!Ju.has(P)){var D=yS++;Ju.set(P,D),D1.set(D,P)}return P=Ju.get(P),(T(),R)[S+8>>>2>>>0]=P,S})(),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.pause(),_o(()=>q2(Wt)))}else br===2?(br=0,_o(W2),Kt(Wt),Wt=null,_S.forEach(bo)):q(`invalid state: ${br}`);return k1}})(g=>{f().then(g)});function wS(f){return f>>>=0,C1(async()=>{var g=await Et(f);return jt(g)})}var Qu=[],vS=f=>{var g=Qu.length;return Qu.push(f),g},xS=(f,g)=>{for(var w=Array(f),y=0;y<f;++y){var S=y,P=(T(),$)[g+4*y>>>2>>>0],D=Hu[P];if(D===void 0)throw f=`parameter ${y}`,P=J1(P),g=Ht(P),Kt(P),new Tn(`${f} has unknown type ${g}`);w[S]=D}return w},$S=(f,g,w)=>{var y=[];return f=f(y,w),y.length&&((T(),$)[g>>>2>>>0]=jt(y)),f},TS={},vo=f=>{var g=TS[f];return g===void 0?Ht(f):g};function IS(f,g,w){var[y,...S]=xS(f,g>>>0);g=y.Vc.bind(y);var P=S.map(Z=>Z.Uc.bind(Z));f--;var D={toValue:Et};switch(f=P.map((Z,Y)=>{var he=`argFromPtr${Y}`;return D[he]=Z,`${he}(args${Y?"+"+8*Y:""})`}),w){case 0:var j="toValue(handle)";break;case 2:j="new (toValue(handle))";break;case 3:j="";break;case 1:D.getStringOrSymbol=vo,j="toValue(handle)[getStringOrSymbol(methodName)]"}return j+=`(${f})`,y.zd||(D.toReturnWire=g,D.emval_returnValue=$S,j=`return emval_returnValue(toReturnWire, destructorsRef, ${j})`),j=`return function (handle, methodName, destructorsRef, args) {
  ${j}
  }`,w=new Function(Object.keys(D),j)(...Object.values(D)),j=`methodCaller<(${S.map(Z=>Z.name)}) => ${y.name}>`,vS(Object.defineProperty(w,"name",{value:j}))}function SS(f,g){return g>>>=0,(f=Et(f>>>0))==Et(g)}function OS(f){return(f>>>=0)?(f=vo(f),jt(globalThis[f])):jt(globalThis)}function ES(f){return f=vo(f>>>0),jt(t[f])}function PS(f,g){return g>>>=0,f=Et(f>>>0),g=Et(g),jt(f[g])}function AS(f){9<(f>>>=0)&&(Jr[f+1]+=1)}function z1(f,g,w,y,S){return Qu[f>>>0](g>>>0,w>>>0,y>>>0,S>>>0)}function kS(f,g,w,y,S){return z1(f>>>0,g>>>0,w>>>0,y>>>0,S>>>0)}function DS(){return jt([])}function NS(f){f=Et(f>>>0);for(var g=Array(f.length),w=0;w<f.length;w++)g[w]=f[w];return jt(g)}function CS(f){return jt(vo(f>>>0))}function zS(){return jt({})}function RS(f){for(var g=Et(f>>>=0);g.length;){var w=g.pop();g.pop()(w)}Wu(f)}function BS(f,g,w){g>>>=0,w>>>=0,f=Et(f>>>0),g=Et(g),w=Et(w),f[g]=w}function MS(f,g){f=-9007199254740992>f||9007199254740992<f?NaN:Number(f),g>>>=0,f=new Date(1e3*f),(T(),R)[g>>>2>>>0]=f.getUTCSeconds(),(T(),R)[g+4>>>2>>>0]=f.getUTCMinutes(),(T(),R)[g+8>>>2>>>0]=f.getUTCHours(),(T(),R)[g+12>>>2>>>0]=f.getUTCDate(),(T(),R)[g+16>>>2>>>0]=f.getUTCMonth(),(T(),R)[g+20>>>2>>>0]=f.getUTCFullYear()-1900,(T(),R)[g+24>>>2>>>0]=f.getUTCDay(),f=(f.getTime()-Date.UTC(f.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(T(),R)[g+28>>>2>>>0]=f}var R1=f=>f%4==0&&(f%100!=0||f%400==0),B1=[0,31,60,91,121,152,182,213,244,274,305,335],M1=[0,31,59,90,120,151,181,212,243,273,304,334];function FS(f,g){f=-9007199254740992>f||9007199254740992<f?NaN:Number(f),g>>>=0,f=new Date(1e3*f),(T(),R)[g>>>2>>>0]=f.getSeconds(),(T(),R)[g+4>>>2>>>0]=f.getMinutes(),(T(),R)[g+8>>>2>>>0]=f.getHours(),(T(),R)[g+12>>>2>>>0]=f.getDate(),(T(),R)[g+16>>>2>>>0]=f.getMonth(),(T(),R)[g+20>>>2>>>0]=f.getFullYear()-1900,(T(),R)[g+24>>>2>>>0]=f.getDay();var w=(R1(f.getFullYear())?B1:M1)[f.getMonth()]+f.getDate()-1|0;(T(),R)[g+28>>>2>>>0]=w,(T(),R)[g+36>>>2>>>0]=-60*f.getTimezoneOffset(),w=new Date(f.getFullYear(),6,1).getTimezoneOffset();var y=new Date(f.getFullYear(),0,1).getTimezoneOffset();f=0|(w!=y&&f.getTimezoneOffset()==Math.min(y,w)),(T(),R)[g+32>>>2>>>0]=f}function jS(f){f>>>=0;var g=new Date((T(),R)[f+20>>>2>>>0]+1900,(T(),R)[f+16>>>2>>>0],(T(),R)[f+12>>>2>>>0],(T(),R)[f+8>>>2>>>0],(T(),R)[f+4>>>2>>>0],(T(),R)[f>>>2>>>0],0),w=(T(),R)[f+32>>>2>>>0],y=g.getTimezoneOffset(),S=new Date(g.getFullYear(),6,1).getTimezoneOffset(),P=new Date(g.getFullYear(),0,1).getTimezoneOffset(),D=Math.min(P,S);return 0>w?(T(),R)[f+32>>>2>>>0]=+(S!=P&&D==y):0<w!=(D==y)&&(S=Math.max(P,S),g.setTime(g.getTime()+6e4*((0<w?D:S)-y))),(T(),R)[f+24>>>2>>>0]=g.getDay(),w=(R1(g.getFullYear())?B1:M1)[g.getMonth()]+g.getDate()-1|0,(T(),R)[f+28>>>2>>>0]=w,(T(),R)[f>>>2>>>0]=g.getSeconds(),(T(),R)[f+4>>>2>>>0]=g.getMinutes(),(T(),R)[f+8>>>2>>>0]=g.getHours(),(T(),R)[f+12>>>2>>>0]=g.getDate(),(T(),R)[f+16>>>2>>>0]=g.getMonth(),(T(),R)[f+20>>>2>>>0]=g.getYear(),f=g.getTime(),BigInt(isNaN(f)?-1:f/1e3)}function F1(f,g,w,y,S,P,D){return l?pe(16,1,f,g,w,y,S,P,D):-52}function j1(f,g,w,y,S,P){if(l)return pe(17,1,f,g,w,y,S,P)}var bi={},LS=()=>performance.timeOrigin+performance.now();function L1(f,g){if(l)return pe(18,1,f,g);if(bi[f]&&(clearTimeout(bi[f].id),delete bi[f]),!g)return 0;var w=setTimeout(()=>{delete bi[f],bo(()=>r2(f,performance.timeOrigin+performance.now()))},g);return bi[f]={id:w,ae:g},0}function VS(f,g,w,y){f>>>=0,g>>>=0,w>>>=0,y>>>=0;var S=new Date().getFullYear(),P=new Date(S,0,1).getTimezoneOffset();S=new Date(S,6,1).getTimezoneOffset();var D=Math.max(P,S);(T(),$)[f>>>2>>>0]=60*D,(T(),R)[g>>>2>>>0]=+(P!=S),f=(g=j=>{var Z=Math.abs(j);return`UTC${0<=j?"-":"+"}${String(Math.floor(Z/60)).padStart(2,"0")}${String(Z%60).padStart(2,"0")}`})(P),g=g(S),S<P?(gr(f,w,17),gr(g,y,17)):(gr(f,y,17),gr(g,w,17))}var US=()=>Date.now();function qS(f,g,w){return w>>>=0,0<=f&&3>=f?(f===0?f=Date.now():f=performance.timeOrigin+performance.now(),f=Math.round(1e6*f),(T(),re)[w>>>3>>>0]=BigInt(f),0):28}var el=[],V1=(f,g)=>{el.length=0;for(var w;w=(T(),J)[f++>>>0];){var y=w!=105;g+=(y&=w!=112)&&g%8?4:0,el.push(w==112?(T(),$)[g>>>2>>>0]:w==106?(T(),re)[g>>>3>>>0]:w==105?(T(),R)[g>>>2>>>0]:(T(),G)[g>>>3>>>0]),g+=y?8:4}return el};function GS(f,g,w){return f>>>=0,g=V1(g>>>0,w>>>0),ul[f](...g)}function HS(f,g,w){return f>>>=0,g=V1(g>>>0,w>>>0),ul[f](...g)}var WS=()=>{};function KS(f,g){return E(Ye(f>>>0,g>>>0))}var XS=()=>{throw Me+=1,"unwind"};function ZS(){return 4294901760}var JS=()=>navigator.hardwareConcurrency,Yr={},xo=f=>{var g;return(g=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(f))?+g[1]:(g=/:(\d+):\d+(?:\)|$)/.exec(f))?2147483648|+g[1]:0},U1=f=>{for(var g of f)(f=xo(g))&&(Yr[f]=g)};function YS(){var f=Error().stack.toString().split(`
`);return f[0]=="Error"&&f.shift(),U1(f),Yr.gd=xo(f[3]),Yr.Jd=f,Yr.gd}function $o(f){if(!(f=Yr[f>>>0]))return 0;var g;if(g=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(f))f=g[1];else if(g=/^\s+at (.*) \(.*\)$/.exec(f))f=g[1];else{if(!(g=/^(.+?)@/.exec(f)))return 0;f=g[1]}Kt($o.hd??0),g=go(f)+1;var w=yi(g);return w&&gr(f,w,g),$o.hd=w,$o.hd}function QS(f){f>>>=0;var g=(T(),J).length;if(f<=g||4294901760<f)return!1;for(var w=1;4>=w;w*=2){var y=g*(1+.2/w);y=Math.min(y,f+100663296);e:{y=(Math.min(4294901760,65536*Math.ceil(Math.max(f,y)/65536))-mr.buffer.byteLength+65535)/65536|0;try{mr.grow(y),W();var S=1;break e}catch{}S=void 0}if(S)return!0}return!1}function eO(f,g,w){if(f>>>=0,g>>>=0,Yr.gd==f)var y=Yr.Jd;else(y=Error().stack.toString().split(`
`))[0]=="Error"&&y.shift(),U1(y);for(var S=3;y[S]&&xo(y[S])!=f;)++S;for(f=0;f<w&&y[f+S];++f)(T(),R)[g+4*f>>>2>>>0]=xo(y[f+S]);return f}var tl,rl={},q1=()=>{var y;if(!tl){var f,g={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(((y=globalThis.navigator)==null?void 0:y.language)??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(f in rl)rl[f]===void 0?delete g[f]:g[f]=rl[f];var w=[];for(f in g)w.push(`${f}=${g[f]}`);tl=w}return tl};function G1(f,g){if(l)return pe(19,1,f,g);f>>>=0,g>>>=0;var w,y=0,S=0;for(w of q1()){var P=g+y;(T(),$)[f+S>>>2>>>0]=P,y+=gr(w,P,1/0)+1,S+=4}return 0}function H1(f,g){if(l)return pe(20,1,f,g);f>>>=0,g>>>=0;var w=q1();for(var y of((T(),$)[f>>>2>>>0]=w.length,f=0,w))f+=go(y)+1;return(T(),$)[g>>>2>>>0]=f,0}function W1(f){return l?pe(21,1,f):52}function K1(f,g,w,y){return l?pe(22,1,f,g,w,y):52}function X1(f,g,w,y){return l?pe(23,1,f,g,w,y):70}var tO=[null,[],[]];function Z1(f,g,w,y){if(l)return pe(24,1,f,g,w,y);g>>>=0,w>>>=0,y>>>=0;for(var S=0,P=0;P<w;P++){var D=(T(),$)[g>>>2>>>0],j=(T(),$)[g+4>>>2>>>0];g+=8;for(var Z=0;Z<j;Z++){var Y=f,he=(T(),J)[D+Z>>>0],Se=tO[Y];he===0||he===10?((Y===1?O:E)(f1(Se)),Se.length=0):Se.push(he)}S+=j}return(T(),$)[y>>>2>>>0]=S,0}function rO(f){return f>>>0}l||(function(){for(var f=t.numThreads-1;f--;)a1();pt.push(async()=>{var g=(async function(){if(!l)return Promise.all(fr.map(s1))})();wt++,await g,--wt==0&&ct&&(g=ct,ct=null,g())})})(),l||(mr=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),W()),t.wasmBinary&&(c=t.wasmBinary),t.stackSave=()=>_e(),t.stackRestore=f=>ge(f),t.stackAlloc=f=>ol(f),t.setValue=function(f,g,w="i8"){switch(w.endsWith("*")&&(w="*"),w){case"i1":case"i8":(T(),F)[f>>>0]=g;break;case"i16":(T(),K)[f>>>1>>>0]=g;break;case"i32":(T(),R)[f>>>2>>>0]=g;break;case"i64":(T(),re)[f>>>3>>>0]=BigInt(g);break;case"float":(T(),z)[f>>>2>>>0]=g;break;case"double":(T(),G)[f>>>3>>>0]=g;break;case"*":(T(),$)[f>>>2>>>0]=g;break;default:q(`invalid type for setValue: ${w}`)}},t.getValue=function(f,g="i8"){switch(g.endsWith("*")&&(g="*"),g){case"i1":case"i8":return(T(),F)[f>>>0];case"i16":return(T(),K)[f>>>1>>>0];case"i32":return(T(),R)[f>>>2>>>0];case"i64":return(T(),re)[f>>>3>>>0];case"float":return(T(),z)[f>>>2>>>0];case"double":return(T(),G)[f>>>3>>>0];case"*":return(T(),$)[f>>>2>>>0];default:q(`invalid type for getValue: ${g}`)}},t.UTF8ToString=Ye,t.stringToUTF8=gr,t.lengthBytesUTF8=go;var J1,Y1,To,Kt,yi,nl,Q1,e2,t2,il,r2,n2,we,_i,i2,ge,ol,_e,o2,sl,s2,a2,u2,al,l2,d2,p2,c2,h2,f2,m2,g2,b2,y2,_2,w2,v2,x2,$2,T2,I2,S2,O2,E2,P2,A2,k2,D2,N2,C2,z2,R2,B2,M2,F2,j2,L2,V2,U2,q2,G2,H2,W2,rr,nO=[vt,ho,d1,m1,g1,b1,y1,_1,w1,v1,x1,$1,T1,I1,S1,O1,F1,j1,L1,G1,H1,W1,K1,X1,Z1],ul={1055492:(f,g,w,y,S)=>{if(t===void 0||!t.Yc)return 1;if((f=Ye(Number(f>>>0))).startsWith("./")&&(f=f.substring(2)),!(f=t.Yc.get(f)))return 2;if(g=Number(g>>>0),w=Number(w>>>0),y=Number(y>>>0),g+w>f.byteLength)return 3;try{let P=f.subarray(g,g+w);switch(S){case 0:(T(),J).set(P,y>>>0);break;case 1:t.Qd?t.Qd(y,P):t.Id(y,P);break;default:return 4}return 0}catch{return 4}},1056316:(f,g,w)=>{t.td(f,(T(),J).subarray(g>>>0,g+w>>>0))},1056380:()=>t.Sd(),1056422:f=>{t.sd(f)},1056459:()=>{t.Bd()},1056490:()=>{t.Cd()},1056519:()=>{t.Gd()},1056544:f=>t.Ad(f),1056577:f=>t.Ed(f),1056609:(f,g,w)=>{t.ed(Number(f),Number(g),Number(w),!0)},1056672:(f,g,w)=>{t.ed(Number(f),Number(g),Number(w))},1056729:()=>typeof wasmOffsetConverter<"u",1056786:f=>{t.$b("Abs",f,void 0)},1056837:f=>{t.$b("Neg",f,void 0)},1056888:f=>{t.$b("Floor",f,void 0)},1056941:f=>{t.$b("Ceil",f,void 0)},1056993:f=>{t.$b("Reciprocal",f,void 0)},1057051:f=>{t.$b("Sqrt",f,void 0)},1057103:f=>{t.$b("Exp",f,void 0)},1057154:f=>{t.$b("Erf",f,void 0)},1057205:f=>{t.$b("Sigmoid",f,void 0)},1057260:(f,g,w)=>{t.$b("HardSigmoid",f,{alpha:g,beta:w})},1057339:f=>{t.$b("HardSwish",f,void 0)},1057396:f=>{t.$b("Log",f,void 0)},1057447:f=>{t.$b("Sin",f,void 0)},1057498:f=>{t.$b("Cos",f,void 0)},1057549:f=>{t.$b("Tan",f,void 0)},1057600:f=>{t.$b("Asin",f,void 0)},1057652:f=>{t.$b("Acos",f,void 0)},1057704:f=>{t.$b("Atan",f,void 0)},1057756:f=>{t.$b("Sinh",f,void 0)},1057808:f=>{t.$b("Cosh",f,void 0)},1057860:f=>{t.$b("Asinh",f,void 0)},1057913:f=>{t.$b("Acosh",f,void 0)},1057966:f=>{t.$b("Atanh",f,void 0)},1058019:f=>{t.$b("Tanh",f,void 0)},1058071:f=>{t.$b("Not",f,void 0)},1058122:(f,g,w)=>{t.$b("Clip",f,{min:g,max:w})},1058191:f=>{t.$b("Clip",f,void 0)},1058243:(f,g)=>{t.$b("Elu",f,{alpha:g})},1058301:f=>{t.$b("Gelu",f,void 0)},1058353:f=>{t.$b("Relu",f,void 0)},1058405:(f,g)=>{t.$b("LeakyRelu",f,{alpha:g})},1058469:(f,g)=>{t.$b("ThresholdedRelu",f,{alpha:g})},1058539:(f,g)=>{t.$b("Cast",f,{to:g})},1058597:f=>{t.$b("Add",f,void 0)},1058648:f=>{t.$b("Sub",f,void 0)},1058699:f=>{t.$b("Mul",f,void 0)},1058750:f=>{t.$b("Div",f,void 0)},1058801:f=>{t.$b("Pow",f,void 0)},1058852:f=>{t.$b("Equal",f,void 0)},1058905:f=>{t.$b("Greater",f,void 0)},1058960:f=>{t.$b("GreaterOrEqual",f,void 0)},1059022:f=>{t.$b("Less",f,void 0)},1059074:f=>{t.$b("LessOrEqual",f,void 0)},1059133:(f,g,w,y,S)=>{t.$b("ReduceMean",f,{keepDims:!!g,noopWithEmptyAxes:!!w,axes:y?Array.from((T(),R).subarray(Number(y)>>>0,Number(S)>>>0)):[]})},1059308:(f,g,w,y,S)=>{t.$b("ReduceMax",f,{keepDims:!!g,noopWithEmptyAxes:!!w,axes:y?Array.from((T(),R).subarray(Number(y)>>>0,Number(S)>>>0)):[]})},1059482:(f,g,w,y,S)=>{t.$b("ReduceMin",f,{keepDims:!!g,noopWithEmptyAxes:!!w,axes:y?Array.from((T(),R).subarray(Number(y)>>>0,Number(S)>>>0)):[]})},1059656:(f,g,w,y,S)=>{t.$b("ReduceProd",f,{keepDims:!!g,noopWithEmptyAxes:!!w,axes:y?Array.from((T(),R).subarray(Number(y)>>>0,Number(S)>>>0)):[]})},1059831:(f,g,w,y,S)=>{t.$b("ReduceSum",f,{keepDims:!!g,noopWithEmptyAxes:!!w,axes:y?Array.from((T(),R).subarray(Number(y)>>>0,Number(S)>>>0)):[]})},1060005:(f,g,w,y,S)=>{t.$b("ReduceL1",f,{keepDims:!!g,noopWithEmptyAxes:!!w,axes:y?Array.from((T(),R).subarray(Number(y)>>>0,Number(S)>>>0)):[]})},1060178:(f,g,w,y,S)=>{t.$b("ReduceL2",f,{keepDims:!!g,noopWithEmptyAxes:!!w,axes:y?Array.from((T(),R).subarray(Number(y)>>>0,Number(S)>>>0)):[]})},1060351:(f,g,w,y,S)=>{t.$b("ReduceLogSum",f,{keepDims:!!g,noopWithEmptyAxes:!!w,axes:y?Array.from((T(),R).subarray(Number(y)>>>0,Number(S)>>>0)):[]})},1060528:(f,g,w,y,S)=>{t.$b("ReduceSumSquare",f,{keepDims:!!g,noopWithEmptyAxes:!!w,axes:y?Array.from((T(),R).subarray(Number(y)>>>0,Number(S)>>>0)):[]})},1060708:(f,g,w,y,S)=>{t.$b("ReduceLogSumExp",f,{keepDims:!!g,noopWithEmptyAxes:!!w,axes:y?Array.from((T(),R).subarray(Number(y)>>>0,Number(S)>>>0)):[]})},1060888:f=>{t.$b("Where",f,void 0)},1060941:(f,g,w)=>{t.$b("Transpose",f,{perm:g?Array.from((T(),R).subarray(Number(g)>>>0,Number(w)>>>0)):[]})},1061065:(f,g,w,y)=>{t.$b("DepthToSpace",f,{blocksize:g,mode:Ye(w),format:y?"NHWC":"NCHW"})},1061198:(f,g,w,y)=>{t.$b("DepthToSpace",f,{blocksize:g,mode:Ye(w),format:y?"NHWC":"NCHW"})},1061331:(f,g,w,y)=>{t.$b("DFT",f,{axis:g,inverse:w,onesided:y})},1061423:(f,g,w,y,S,P,D,j,Z,Y,he,Se,ze,Fe,yr)=>{t.$b("ConvTranspose",f,{format:Z?"NHWC":"NCHW",autoPad:g,dilations:[w],group:y,kernelShape:[S],pads:[P,D],strides:[j],wIsConst:()=>!!(T(),F)[Y>>>0],outputPadding:he?Array.from((T(),R).subarray(Number(he)>>>0,Number(Se)>>>0)):[],outputShape:ze?Array.from((T(),R).subarray(Number(ze)>>>0,Number(Fe)>>>0)):[],activation:Ye(yr)})},1061856:(f,g,w,y,S,P,D,j,Z,Y,he,Se,ze,Fe)=>{t.$b("ConvTranspose",f,{format:j?"NHWC":"NCHW",autoPad:g,dilations:Array.from((T(),R).subarray(Number(w)>>>0,(Number(w)>>>0)+2>>>0)),group:y,kernelShape:Array.from((T(),R).subarray(Number(S)>>>0,(Number(S)>>>0)+2>>>0)),pads:Array.from((T(),R).subarray(Number(P)>>>0,(Number(P)>>>0)+4>>>0)),strides:Array.from((T(),R).subarray(Number(D)>>>0,(Number(D)>>>0)+2>>>0)),wIsConst:()=>!!(T(),F)[Z>>>0],outputPadding:Y?Array.from((T(),R).subarray(Number(Y)>>>0,Number(he)>>>0)):[],outputShape:Se?Array.from((T(),R).subarray(Number(Se)>>>0,Number(ze)>>>0)):[],activation:Ye(Fe)})},1062517:(f,g,w,y,S,P,D,j,Z,Y,he,Se,ze,Fe,yr)=>{t.$b("ConvTranspose",f,{format:Z?"NHWC":"NCHW",autoPad:g,dilations:[w],group:y,kernelShape:[S],pads:[P,D],strides:[j],wIsConst:()=>!!(T(),F)[Y>>>0],outputPadding:he?Array.from((T(),R).subarray(Number(he)>>>0,Number(Se)>>>0)):[],outputShape:ze?Array.from((T(),R).subarray(Number(ze)>>>0,Number(Fe)>>>0)):[],activation:Ye(yr)})},1062950:(f,g,w,y,S,P,D,j,Z,Y,he,Se,ze,Fe)=>{t.$b("ConvTranspose",f,{format:j?"NHWC":"NCHW",autoPad:g,dilations:Array.from((T(),R).subarray(Number(w)>>>0,(Number(w)>>>0)+2>>>0)),group:y,kernelShape:Array.from((T(),R).subarray(Number(S)>>>0,(Number(S)>>>0)+2>>>0)),pads:Array.from((T(),R).subarray(Number(P)>>>0,(Number(P)>>>0)+4>>>0)),strides:Array.from((T(),R).subarray(Number(D)>>>0,(Number(D)>>>0)+2>>>0)),wIsConst:()=>!!(T(),F)[Z>>>0],outputPadding:Y?Array.from((T(),R).subarray(Number(Y)>>>0,Number(he)>>>0)):[],outputShape:Se?Array.from((T(),R).subarray(Number(Se)>>>0,Number(ze)>>>0)):[],activation:Ye(Fe)})},1063611:(f,g)=>{t.$b("GlobalAveragePool",f,{format:g?"NHWC":"NCHW"})},1063702:(f,g,w,y,S,P,D,j,Z,Y,he,Se,ze,Fe)=>{t.$b("AveragePool",f,{format:Fe?"NHWC":"NCHW",auto_pad:g,ceil_mode:w,count_include_pad:y,storage_order:S,dilations:P?Array.from((T(),R).subarray(Number(P)>>>0,Number(D)>>>0)):[],kernel_shape:j?Array.from((T(),R).subarray(Number(j)>>>0,Number(Z)>>>0)):[],pads:Y?Array.from((T(),R).subarray(Number(Y)>>>0,Number(he)>>>0)):[],strides:Se?Array.from((T(),R).subarray(Number(Se)>>>0,Number(ze)>>>0)):[]})},1064181:(f,g)=>{t.$b("GlobalAveragePool",f,{format:g?"NHWC":"NCHW"})},1064272:(f,g,w,y,S,P,D,j,Z,Y,he,Se,ze,Fe)=>{t.$b("AveragePool",f,{format:Fe?"NHWC":"NCHW",auto_pad:g,ceil_mode:w,count_include_pad:y,storage_order:S,dilations:P?Array.from((T(),R).subarray(Number(P)>>>0,Number(D)>>>0)):[],kernel_shape:j?Array.from((T(),R).subarray(Number(j)>>>0,Number(Z)>>>0)):[],pads:Y?Array.from((T(),R).subarray(Number(Y)>>>0,Number(he)>>>0)):[],strides:Se?Array.from((T(),R).subarray(Number(Se)>>>0,Number(ze)>>>0)):[]})},1064751:(f,g)=>{t.$b("GlobalMaxPool",f,{format:g?"NHWC":"NCHW"})},1064838:(f,g,w,y,S,P,D,j,Z,Y,he,Se,ze,Fe)=>{t.$b("MaxPool",f,{format:Fe?"NHWC":"NCHW",auto_pad:g,ceil_mode:w,count_include_pad:y,storage_order:S,dilations:P?Array.from((T(),R).subarray(Number(P)>>>0,Number(D)>>>0)):[],kernel_shape:j?Array.from((T(),R).subarray(Number(j)>>>0,Number(Z)>>>0)):[],pads:Y?Array.from((T(),R).subarray(Number(Y)>>>0,Number(he)>>>0)):[],strides:Se?Array.from((T(),R).subarray(Number(Se)>>>0,Number(ze)>>>0)):[]})},1065313:(f,g)=>{t.$b("GlobalMaxPool",f,{format:g?"NHWC":"NCHW"})},1065400:(f,g,w,y,S,P,D,j,Z,Y,he,Se,ze,Fe)=>{t.$b("MaxPool",f,{format:Fe?"NHWC":"NCHW",auto_pad:g,ceil_mode:w,count_include_pad:y,storage_order:S,dilations:P?Array.from((T(),R).subarray(Number(P)>>>0,Number(D)>>>0)):[],kernel_shape:j?Array.from((T(),R).subarray(Number(j)>>>0,Number(Z)>>>0)):[],pads:Y?Array.from((T(),R).subarray(Number(Y)>>>0,Number(he)>>>0)):[],strides:Se?Array.from((T(),R).subarray(Number(Se)>>>0,Number(ze)>>>0)):[]})},1065875:(f,g,w,y,S)=>{t.$b("Gemm",f,{alpha:g,beta:w,transA:y,transB:S})},1065979:f=>{t.$b("MatMul",f,void 0)},1066033:(f,g,w,y)=>{t.$b("ArgMax",f,{keepDims:!!g,selectLastIndex:!!w,axis:y})},1066141:(f,g,w,y)=>{t.$b("ArgMin",f,{keepDims:!!g,selectLastIndex:!!w,axis:y})},1066249:(f,g)=>{t.$b("Softmax",f,{axis:g})},1066312:(f,g)=>{t.$b("Concat",f,{axis:g})},1066372:(f,g,w,y,S)=>{t.$b("Split",f,{axis:g,numOutputs:w,splitSizes:y?Array.from((T(),R).subarray(Number(y)>>>0,Number(S)>>>0)):[]})},1066528:f=>{t.$b("Expand",f,void 0)},1066582:(f,g)=>{t.$b("Gather",f,{axis:Number(g)})},1066653:(f,g)=>{t.$b("GatherElements",f,{axis:Number(g)})},1066732:(f,g)=>{t.$b("GatherND",f,{batch_dims:Number(g)})},1066811:(f,g,w,y,S,P,D,j,Z,Y,he)=>{t.$b("Resize",f,{antialias:g,axes:w?Array.from((T(),R).subarray(Number(w)>>>0,Number(y)>>>0)):[],coordinateTransformMode:Ye(S),cubicCoeffA:P,excludeOutside:D,extrapolationValue:j,keepAspectRatioPolicy:Ye(Z),mode:Ye(Y),nearestMode:Ye(he)})},1067173:(f,g,w,y,S,P,D)=>{t.$b("Slice",f,{starts:g?Array.from((T(),R).subarray(Number(g)>>>0,Number(w)>>>0)):[],ends:y?Array.from((T(),R).subarray(Number(y)>>>0,Number(S)>>>0)):[],axes:P?Array.from((T(),R).subarray(Number(P)>>>0,Number(D)>>>0)):[]})},1067437:f=>{t.$b("Tile",f,void 0)},1067489:(f,g,w)=>{t.$b("InstanceNormalization",f,{epsilon:g,format:w?"NHWC":"NCHW"})},1067603:(f,g,w)=>{t.$b("InstanceNormalization",f,{epsilon:g,format:w?"NHWC":"NCHW"})},1067717:f=>{t.$b("Range",f,void 0)},1067770:(f,g)=>{t.$b("Einsum",f,{equation:Ye(g)})},1067851:(f,g,w,y,S)=>{t.$b("Pad",f,{mode:g,value:w,pads:y?Array.from((T(),R).subarray(Number(y)>>>0,Number(S)>>>0)):[]})},1067994:(f,g,w,y,S,P)=>{t.$b("BatchNormalization",f,{epsilon:g,momentum:w,spatial:!!S,trainingMode:!!y,format:P?"NHWC":"NCHW"})},1068163:(f,g,w,y,S,P)=>{t.$b("BatchNormalization",f,{epsilon:g,momentum:w,spatial:!!S,trainingMode:!!y,format:P?"NHWC":"NCHW"})},1068332:(f,g,w)=>{t.$b("CumSum",f,{exclusive:Number(g),reverse:Number(w)})},1068429:(f,g,w)=>{t.$b("DequantizeLinear",f,{axis:g,blockSize:w})},1068519:(f,g,w,y,S)=>{t.$b("GridSample",f,{align_corners:g,mode:Ye(w),padding_mode:Ye(y),format:S?"NHWC":"NCHW"})},1068689:(f,g,w,y,S)=>{t.$b("GridSample",f,{align_corners:g,mode:Ye(w),padding_mode:Ye(y),format:S?"NHWC":"NCHW"})},1068859:(f,g)=>{t.$b("ScatterND",f,{reduction:Ye(g)})},1068944:(f,g,w,y,S,P,D,j,Z)=>{t.$b("Attention",f,{numHeads:g,isUnidirectional:w,maskFilterValue:y,scale:S,doRotary:P,qkvHiddenSizes:D?Array.from((T(),R).subarray(Number(j)>>>0,Number(j)+D>>>0)):[],pastPresentShareBuffer:!!Z})},1069216:f=>{t.$b("BiasAdd",f,void 0)},1069271:f=>{t.$b("BiasSplitGelu",f,void 0)},1069332:f=>{t.$b("FastGelu",f,void 0)},1069388:(f,g,w,y,S,P,D,j,Z,Y,he,Se,ze,Fe,yr,ll)=>{t.$b("Conv",f,{format:Se?"NHWC":"NCHW",auto_pad:g,dilations:w?Array.from((T(),R).subarray(Number(w)>>>0,Number(y)>>>0)):[],group:S,kernel_shape:P?Array.from((T(),R).subarray(Number(P)>>>0,Number(D)>>>0)):[],pads:j?Array.from((T(),R).subarray(Number(j)>>>0,Number(Z)>>>0)):[],strides:Y?Array.from((T(),R).subarray(Number(Y)>>>0,Number(he)>>>0)):[],w_is_const:()=>!!(T(),F)[Number(ze)>>>0],activation:Ye(Fe),activation_params:yr?Array.from((T(),z).subarray(Number(yr)>>>0,Number(ll)>>>0)):[]})},1069972:f=>{t.$b("Gelu",f,void 0)},1070024:(f,g,w,y,S,P,D,j,Z)=>{t.$b("GroupQueryAttention",f,{numHeads:g,kvNumHeads:w,scale:y,softcap:S,doRotary:P,rotaryInterleaved:D,smoothSoftmax:j,localWindowSize:Z})},1070241:(f,g,w,y)=>{t.$b("LayerNormalization",f,{axis:g,epsilon:w,simplified:!!y})},1070352:(f,g,w,y)=>{t.$b("LayerNormalization",f,{axis:g,epsilon:w,simplified:!!y})},1070463:(f,g,w,y,S,P)=>{t.$b("MatMulNBits",f,{k:g,n:w,accuracyLevel:y,bits:S,blockSize:P})},1070590:(f,g,w,y,S,P)=>{t.$b("MultiHeadAttention",f,{numHeads:g,isUnidirectional:w,maskFilterValue:y,scale:S,doRotary:P})},1070749:(f,g)=>{t.$b("QuickGelu",f,{alpha:g})},1070813:(f,g,w,y,S)=>{t.$b("RotaryEmbedding",f,{interleaved:!!g,numHeads:w,rotaryEmbeddingDim:y,scale:S})},1070952:(f,g,w)=>{t.$b("SkipLayerNormalization",f,{epsilon:g,simplified:!!w})},1071054:(f,g,w)=>{t.$b("SkipLayerNormalization",f,{epsilon:g,simplified:!!w})},1071156:(f,g,w,y)=>{t.$b("GatherBlockQuantized",f,{gatherAxis:g,quantizeAxis:w,blockSize:y})},1071277:f=>{t.Fd(f)},1071311:(f,g)=>t.Hd(Number(f),Number(g),t.Xc.Kd,t.Xc.errors)};function iO(f,g,w){return C1(async()=>{await t.Dd(Number(f),Number(g),Number(w))})}function oO(){return typeof wasmOffsetConverter<"u"}function sO(f,g,w,y){var S=_e();try{return g2(f,g,w,y)}catch(P){if(ge(S),P!==P+0)throw P;we(1,0)}}function aO(f,g,w){var y=_e();try{return c2(f,g,w)}catch(S){if(ge(y),S!==S+0)throw S;we(1,0)}}function uO(f){var g=_e();try{l2(f)}catch(w){if(ge(g),w!==w+0)throw w;we(1,0)}}function lO(f,g){var w=_e();try{return al(f,g)}catch(y){if(ge(w),y!==y+0)throw y;we(1,0)}}function dO(f,g,w){var y=_e();try{u2(f,g,w)}catch(S){if(ge(y),S!==S+0)throw S;we(1,0)}}function pO(f,g){var w=_e();try{b2(f,g)}catch(y){if(ge(w),y!==y+0)throw y;we(1,0)}}function cO(f,g,w,y,S,P,D){var j=_e();try{return f2(f,g,w,y,S,P,D)}catch(Z){if(ge(j),Z!==Z+0)throw Z;we(1,0)}}function hO(f,g,w,y,S,P){var D=_e();try{d2(f,g,w,y,S,P)}catch(j){if(ge(D),j!==j+0)throw j;we(1,0)}}function fO(f,g,w,y){var S=_e();try{m2(f,g,w,y)}catch(P){if(ge(S),P!==P+0)throw P;we(1,0)}}function mO(f,g,w,y,S){var P=_e();try{p2(f,g,w,y,S)}catch(D){if(ge(P),D!==D+0)throw D;we(1,0)}}function gO(f,g,w,y,S,P,D){var j=_e();try{_2(f,g,w,y,S,P,D)}catch(Z){if(ge(j),Z!==Z+0)throw Z;we(1,0)}}function bO(f,g,w,y,S,P,D){var j=_e();try{w2(f,g,w,y,S,P,D)}catch(Z){if(ge(j),Z!==Z+0)throw Z;we(1,0)}}function yO(f,g,w,y,S,P,D,j){var Z=_e();try{T2(f,g,w,y,S,P,D,j)}catch(Y){if(ge(Z),Y!==Y+0)throw Y;we(1,0)}}function _O(f,g,w,y,S){var P=_e();try{return y2(f,g,w,y,S)}catch(D){if(ge(P),D!==D+0)throw D;we(1,0)}}function wO(f,g,w){var y=_e();try{return I2(f,g,w)}catch(S){if(ge(y),S!==S+0)throw S;we(1,0)}}function vO(f,g,w,y,S,P,D,j){var Z=_e();try{S2(f,g,w,y,S,P,D,j)}catch(Y){if(ge(Z),Y!==Y+0)throw Y;we(1,0)}}function xO(f,g,w,y,S,P,D,j,Z,Y,he,Se){var ze=_e();try{v2(f,g,w,y,S,P,D,j,Z,Y,he,Se)}catch(Fe){if(ge(ze),Fe!==Fe+0)throw Fe;we(1,0)}}function $O(f,g,w){var y=_e();try{return O2(f,g,w)}catch(S){if(ge(y),S!==S+0)throw S;return we(1,0),0n}}function TO(f,g,w,y,S,P,D,j,Z){var Y=_e();try{h2(f,g,w,y,S,P,D,j,Z)}catch(he){if(ge(Y),he!==he+0)throw he;we(1,0)}}function IO(f){var g=_e();try{return E2(f)}catch(w){if(ge(g),w!==w+0)throw w;we(1,0)}}function SO(f,g){var w=_e();try{return U2(f,g)}catch(y){if(ge(w),y!==y+0)throw y;return we(1,0),0n}}function OO(f){var g=_e();try{return P2(f)}catch(w){if(ge(g),w!==w+0)throw w;return we(1,0),0n}}function EO(f,g,w,y){var S=_e();try{return z2(f,g,w,y)}catch(P){if(ge(S),P!==P+0)throw P;we(1,0)}}function PO(f,g,w,y,S){var P=_e();try{return R2(f,g,w,y,S)}catch(D){if(ge(P),D!==D+0)throw D;we(1,0)}}function AO(f,g,w,y,S,P){var D=_e();try{return B2(f,g,w,y,S,P)}catch(j){if(ge(D),j!==j+0)throw j;we(1,0)}}function kO(f,g,w,y,S,P){var D=_e();try{return x2(f,g,w,y,S,P)}catch(j){if(ge(D),j!==j+0)throw j;we(1,0)}}function DO(f,g,w,y,S,P){var D=_e();try{return M2(f,g,w,y,S,P)}catch(j){if(ge(D),j!==j+0)throw j;we(1,0)}}function NO(f,g,w,y,S,P,D,j){var Z=_e();try{return $2(f,g,w,y,S,P,D,j)}catch(Y){if(ge(Z),Y!==Y+0)throw Y;we(1,0)}}function CO(f,g,w,y,S){var P=_e();try{return F2(f,g,w,y,S)}catch(D){if(ge(P),D!==D+0)throw D;return we(1,0),0n}}function zO(f,g,w,y){var S=_e();try{return j2(f,g,w,y)}catch(P){if(ge(S),P!==P+0)throw P;we(1,0)}}function RO(f,g,w,y){var S=_e();try{return L2(f,g,w,y)}catch(P){if(ge(S),P!==P+0)throw P;we(1,0)}}function BO(f,g,w,y,S,P,D,j,Z,Y,he,Se){var ze=_e();try{return V2(f,g,w,y,S,P,D,j,Z,Y,he,Se)}catch(Fe){if(ge(ze),Fe!==Fe+0)throw Fe;we(1,0)}}function MO(f,g,w,y,S,P,D,j,Z,Y,he){var Se=_e();try{N2(f,g,w,y,S,P,D,j,Z,Y,he)}catch(ze){if(ge(Se),ze!==ze+0)throw ze;we(1,0)}}function FO(f,g,w,y,S,P,D,j,Z,Y,he,Se,ze,Fe,yr,ll){var UO=_e();try{C2(f,g,w,y,S,P,D,j,Z,Y,he,Se,ze,Fe,yr,ll)}catch(dl){if(ge(UO),dl!==dl+0)throw dl;we(1,0)}}function jO(f,g,w){var y=_e();try{return A2(f,g,w)}catch(S){if(ge(y),S!==S+0)throw S;we(1,0)}}function LO(f,g,w){var y=_e();try{return k2(f,g,w)}catch(S){if(ge(y),S!==S+0)throw S;we(1,0)}}function VO(f,g,w,y){var S=_e();try{D2(f,g,w,y)}catch(P){if(ge(S),P!==P+0)throw P;we(1,0)}}function Io(){if(0<wt)ct=Io;else if(l)b==null||b(t),X();else{for(var f=pt;0<f.length;)f.shift()(t);0<wt?ct=Io:(t.calledRun=!0,A||(X(),b==null||b(t)))}}return l||(rr=await Pe(),Io()),t.PTR_SIZE=4,U?t:new Promise((f,g)=>{b=f,x=g})}var Um,qm,P3=N(()=>{"use strict";var e,t;Um=Vm,qm=(t=(e=globalThis.self)==null?void 0:e.name)==null?void 0:t.startsWith("em-pthread"),qm&&Vm()}),ea,ta,Gm,yt,Hm,ji,Wm,Km,ra,Xm,na,Zm,ia,Jm,oa=N(()=>{"use strict";Js(),ea=typeof location>"u"?void 0:location.origin,ta=self.location.href>"file:"&&self.location.href<"file;",Gm=()=>{if(ta){let e=URL;return new URL(new e("ort.all.bundle.min.mjs",self.location.href).href,ea).href}return self.location.href},yt=Gm(),Hm=()=>{if(yt&&!yt.startsWith("blob:"))return yt.substring(0,yt.lastIndexOf("/")+1)},ji=(e,t)=>{try{let n=t??yt;return(n?new URL(e,n):new URL(e)).origin===ea}catch{return!1}},Wm=(e,t)=>{let n=t??yt;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},Km=(e,t)=>`${t??"./"}${e}`,ra=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},Xm=async e=>(await import(e)).default,na=(E3(),pn(Fm)).default,Zm=async()=>{if(!yt)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(ji(yt))return[void 0,na()];let e=await ra(yt);return[e,na(e)]},ia=(P3(),pn(Lm)).default,Jm=async(e,t,n,a)=>{let l=ia&&!(e||t);if(l)if(yt)l=ji(yt)||a&&!n;else if(a&&!n)l=!0;else throw new Error("cannot determine the script source URL.");if(l)return[void 0,ia];{let u="ort-wasm-simd-threaded.jsep.mjs",d=e??Wm(u,t),p=n&&d&&!ji(d,t),o=p?await ra(d):d??Km(u,t);return[p?o:void 0,await Xm(o)]}}}),sa,Li,Zn,aa,Ym,Qm,eg,ua,Re,Mr=N(()=>{"use strict";oa(),Li=!1,Zn=!1,aa=!1,Ym=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Qm=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},eg=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},ua=async e=>{if(Li)return Promise.resolve();if(Zn)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(aa)throw new Error("previous call to 'initializeWebAssembly()' failed.");Zn=!0;let t=e.initTimeout,n=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!eg())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Qm())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let a=Ym();n>1&&!a&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let l=e.wasmPaths,u=typeof l=="string"?l:void 0,d=l==null?void 0:l.mjs,p=(d==null?void 0:d.href)??d,o=l==null?void 0:l.wasm,r=(o==null?void 0:o.href)??o,i=e.wasmBinary,[s,c]=await Jm(p,u,n>1,!!i||!!r),h=!1,m=[];if(t>0&&m.push(new Promise(b=>{setTimeout(()=>{h=!0,b()},t)})),m.push(new Promise((b,x)=>{let v={numThreads:n};if(i)v.wasmBinary=i,v.locateFile=_=>_;else if(r||u)v.locateFile=_=>r??u+_;else if(p&&p.indexOf("blob:")!==0)v.locateFile=_=>new URL(_,p).href;else if(s){let _=Hm();_&&(v.locateFile=I=>_+I)}c(v).then(_=>{Zn=!1,Li=!0,sa=_,b(),s&&URL.revokeObjectURL(s)},_=>{Zn=!1,aa=!0,x(_)})})),await Promise.race(m),h)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Re=()=>{if(Li&&sa)return sa;throw new Error("WebAssembly is not initialized yet.")}}),Ct,Vi,ke,la=N(()=>{"use strict";Mr(),Ct=(e,t)=>{let n=Re(),a=n.lengthBytesUTF8(e)+1,l=n._malloc(a);return n.stringToUTF8(e,l,a),t.push(l),l},Vi=(e,t,n,a)=>{if(typeof e=="object"&&e!==null){if(n.has(e))throw new Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([l,u])=>{let d=t?t+l:l;if(typeof u=="object")Vi(u,d+".",n,a);else if(typeof u=="string"||typeof u=="number")a(d,u.toString());else if(typeof u=="boolean")a(d,u?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof u}`)})},ke=e=>{let t=Re(),n=t.stackSave();try{let a=t.PTR_SIZE,l=t.stackAlloc(2*a);t._OrtGetLastError(l,l+a);let u=Number(t.getValue(l,a===4?"i32":"i64")),d=t.getValue(l+a,"*"),p=d?t.UTF8ToString(d):"";throw new Error(`${e} ERROR_CODE: ${u}, ERROR_MESSAGE: ${p}`)}finally{t.stackRestore(n)}}}),tg,A3=N(()=>{"use strict";Mr(),la(),tg=e=>{let t=Re(),n=0,a=[],l=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)l.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)l.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(l.terminate=!1);let u=0;return(e==null?void 0:e.tag)!==void 0&&(u=Ct(e.tag,a)),n=t._OrtCreateRunOptions(l.logSeverityLevel,l.logVerbosityLevel,!!l.terminate,u),n===0&&ke("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&Vi(e.extra,"",new WeakSet,(d,p)=>{let o=Ct(d,a),r=Ct(p,a);t._OrtAddRunConfigEntry(n,o,r)!==0&&ke(`Can't set a run config entry: ${d} - ${p}.`)}),[n,a]}catch(u){throw n!==0&&t._OrtReleaseRunOptions(n),a.forEach(d=>t._free(d)),u}}}),rg,ng,ig,Fr,og,sg,k3=N(()=>{"use strict";Mr(),la(),rg=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},ng=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},ig=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(e.enableMemPattern=!1)},Fr=(e,t,n,a)=>{let l=Ct(t,a),u=Ct(n,a);Re()._OrtAddSessionConfigEntry(e,l,u)!==0&&ke(`Can't set a session config entry: ${t} - ${n}.`)},og=async(e,t,n)=>{let a=t.executionProviders;for(let l of a){let u=typeof l=="string"?l:l.name,d=[];switch(u){case"webnn":if(u="WEBNN",Fr(e,"session.disable_quant_qdq","1",n),Fr(e,"session.disable_qdq_constant_folding","1",n),typeof l!="string"){let s=l==null?void 0:l.deviceType;s&&Fr(e,"deviceType",s,n)}break;case"webgpu":if(u="JS",typeof l!="string"){let s=l;if(s!=null&&s.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);Fr(e,"preferredLayout",s.preferredLayout,n)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${u}`)}let p=Ct(u,n),o=d.length,r=0,i=0;if(o>0){r=Re()._malloc(o*Re().PTR_SIZE),n.push(r),i=Re()._malloc(o*Re().PTR_SIZE),n.push(i);for(let s=0;s<o;s++)Re().setValue(r+s*Re().PTR_SIZE,d[s][0],"*"),Re().setValue(i+s*Re().PTR_SIZE,d[s][1],"*")}await Re()._OrtAppendExecutionProvider(e,p,r,i,o)!==0&&ke(`Can't append execution provider: ${u}.`)}},sg=async e=>{let t=Re(),n=0,a=[],l=e||{};ig(l);try{let u=rg(l.graphOptimizationLevel??"all"),d=ng(l.executionMode??"sequential"),p=typeof l.logId=="string"?Ct(l.logId,a):0,o=l.logSeverityLevel??2;if(!Number.isInteger(o)||o<0||o>4)throw new Error(`log severity level is not valid: ${o}`);let r=l.logVerbosityLevel??0;if(!Number.isInteger(r)||r<0||r>4)throw new Error(`log verbosity level is not valid: ${r}`);let i=typeof l.optimizedModelFilePath=="string"?Ct(l.optimizedModelFilePath,a):0;if(n=t._OrtCreateSessionOptions(u,!!l.enableCpuMemArena,!!l.enableMemPattern,d,!!l.enableProfiling,0,p,o,r,i),n===0&&ke("Can't create session options."),l.executionProviders&&await og(n,l,a),l.enableGraphCapture!==void 0){if(typeof l.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${l.enableGraphCapture}`);Fr(n,"enableGraphCapture",l.enableGraphCapture.toString(),a)}if(l.freeDimensionOverrides)for(let[s,c]of Object.entries(l.freeDimensionOverrides)){if(typeof s!="string")throw new Error(`free dimension override name must be a string: ${s}`);if(typeof c!="number"||!Number.isInteger(c)||c<0)throw new Error(`free dimension override value must be a non-negative integer: ${c}`);let h=Ct(s,a);t._OrtAddFreeDimensionOverride(n,h,c)!==0&&ke(`Can't set a free dimension override: ${s} - ${c}.`)}return l.extra!==void 0&&Vi(l.extra,"",new WeakSet,(s,c)=>{Fr(n,s,c,a)}),[n,a]}catch(u){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&ke("Can't release session options."),a.forEach(d=>t._free(d)),u}}}),jr,Jt,Lr,Ui,qi,da,pa,ca,se=N(()=>{"use strict";jr=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Jt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Lr=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],a=typeof t=="number"?t:t.reduce((l,u)=>l*u,1);return n>0?Math.ceil(a*n):void 0},Ui=e=>{switch(e){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},qi=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},da=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",pa=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",ca=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),ha,ag=N(()=>{"use strict";Js(),ha=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),a=n?parseInt(n,10):0;if(a<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let l=t.body.getReader(),u;try{u=new ArrayBuffer(a)}catch(p){if(p instanceof RangeError){let o=Math.ceil(a/65536);u=new WebAssembly.Memory({initial:o,maximum:o}).buffer}else throw p}let d=0;for(;;){let{done:p,value:o}=await l.read();if(p)break;let r=o.byteLength;new Uint8Array(u,d,r).set(o),d+=r}return new Uint8Array(u,0,a)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),ug,lg,dg,pg,fa,cg,$e,Yt=N(()=>{"use strict";se(),ug=["V","I","W","E","F"],lg=(e,t)=>{console.log(`[${ug[e]},${new Date().toISOString()}]${t}`)},fa=(e,t)=>{dg=e,pg=t},cg=(e,t)=>{let n=qi(e),a=qi(dg);n>=a&&lg(n,typeof t=="function"?t():t)},$e=(...e)=>{pg&&cg(...e)}}),hg,yn,B,Gi,fg,mg,gg,ae=N(()=>{"use strict";hg=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},yn=class{static calcShape(e,t,n=!1){let a=e.length,l=t.length;if(a===0)return t;if(l===0)return e;let u=Math.max(e.length,t.length),d=new Array(u);if(n){if(a<2||l<2)return;let p=hg.calcMatMulShape([e[a-2],e[a-1]],[t[l-2],t[l-1]]);if(p===void 0)return;[d[u-2],d[u-1]]=p}for(let p=n?3:1;p<=u;p++){let o=a-p<0?1:e[a-p],r=l-p<0?1:t[l-p];if(o!==r&&o>1&&r>1)return;let i=Math.max(o,r);if(o&&r)d[u-p]=Math.max(o,r);else{if(i>1)return;d[u-p]=0}}return d}static isValidBroadcast(e,t){let n=e.length,a=t.length;if(n>a)return!1;for(let l=1;l<=n;l++)if(e[n-l]!==1&&e[n-l]!==t[a-l])return!1;return!0}},B=class Oo{static size(t){return Oo.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,n=4){let a=t.length;if(a===0)return[];let l=new Array(a),u=a-1;for(;u>=0;){if(t[u]%n===0){l[u]=t[u]/n;break}if(n%t[u]!==0)throw new Error("cannot convert shape");l[u]=1,n/=t[u],u--}for(u--;u>=0;u--)l[u]=t[u];return l}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Oo.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Oo.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,a){let l=1;for(let u=n;u<a;u++){if(t[u]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");l*=Number(t[u])}return l}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let a=new Array(n);a[n-1]=1,a[n-2]=t[n-1];for(let l=n-3;l>=0;--l)a[l]=a[l+1]*t[l+1];return a}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(a=>this.normalizeAxis(a,n??t.length))}static sortBasedOnPerm(t,n){return n?n.map(a=>t[a]):t.slice().reverse()}static padShape(t,n){let a=t.length;return t.map((l,u)=>l+n[u]+n[u+a])}static areEqual(t,n){return t.length!==n.length?!1:t.every((a,l)=>a===n[l])}},Gi=class Tr{static adjustPoolAttributes(t,n,a,l,u,d){if(!t&&a.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let p=0;p<n.length-2;p++)p>=a.length?a.push(n[p+2]):a[p]=n[p+2];for(let p=0;p<a.length;p++)if(p<l.length){if(l[p]<0)throw new Error("strides should be greater than or equal to 1")}else l.push(1);for(let p=0;p<a.length;p++)if(p<u.length){if(u[p]<0)throw new Error("dilations should be greater than or equal to 1")}else u.push(1);for(let p=0;p<a.length*2;p++)if(p<d.length){if(d[p]<0)throw new Error("pad should be greater than or equal to 1")}else d.push(0);for(let p=0;p<a.length;p++){if(a[p]<=0)throw new Error("kernel shapes need to be greater than 0");if(d[p]>=a[p]||d[p+a.length]>=a[p])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,a,l,u,d,p){if(p){if(u.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(l.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let o=0;o<t.length-2;o++)Tr.adjustPadAndReturnShape(t[o+(d?1:2)],n[o],a[o],l[o],u,o,o+t.length-2,p)}}static computePoolOutputShape(t,n,a,l,u,d,p,o=0){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let r=[n[0],n[1]];return Tr.computeShapeHelper(t,n,r,a,l,u,d,p,o),r}static computeConvOutputShape(t,n,a,l,u,d,p){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let o=[t[0],n[0]];return Tr.computeShapeHelper(!1,t,o,a,l,u,d,p),o}static computeShapeHelper(t,n,a,l,u,d,p,o,r=0){if(t)for(let i=0;i<n.length-2;i++)a.push(1);else for(let i=0;i<n.length-2;i++)a.push(Tr.adjustPadAndReturnShape(n[i+2],l[i],u[i],d[i],p,i,i+n.length-2,o,r))}static computeOutputSize(t,n,a,l,u){let d=Math.floor(t/n)+1;return u===1&&(d=Math.ceil(t/n)+1,(d-1)*n>=a+l&&(d-=1)),d}static adjustPadAndReturnShape(t,n,a,l,u,d,p,o,r=0){let i=a*(l-1)+1;if(o&&o!=="NOTSET")switch(o){case"VALID":return u[d]=0,u[p]=0,Tr.computeOutputSize(t-i,n,t,0,r);case"SAME_LOWER":case"SAME_UPPER":if(a!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let s=(Math.floor((t+n-1)/n)-1)*n+l-t;return u[d]=Math.floor(o==="SAME_LOWER"?(s+1)/2:s/2),u[p]=s-u[d],Tr.computeOutputSize(t+u[d]+u[p]-i,n,t,u[d],r)}default:throw new Error("Unsupported AutoPad type")}else return Tr.computeOutputSize(t+u[d]+u[p]-i,n,t,u[d],r)}},fg=class{static getShapeOfGemmResult(e,t,n,a,l){if(e.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let u,d,p;t?(u=e[1],d=e[0]):(u=e[0],d=e[1]);let o=-1;if(a?(p=n[0],o=1):(p=n[1],o=0),n[o]!==d)throw new Error("dimension mismatch");if(u<=0||p<=0||d<=0)throw new Error("invalid shape specified");if(l&&!yn.isValidBroadcast(l,[u,p]))throw new Error("gemm: invalid bias shape for broadcast");return[u,p,d]}},mg=-34028234663852886e22,gg=34028234663852886e22}),ma,bg=N(()=>{"use strict";se(),ma=(e,t)=>new(Ui(t))(e)}),ga,yg,ba,_g,ya,wg,_a,wa,va,vg,xg,D3=N(()=>{"use strict";se(),Yt(),ga=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),yg=(e,t)=>{if(t==="int32")return e;let n=ga.get(t);if(!n)throw new Error(`WebNN backend does not support data type: ${t}`);let a=n/8;if(e.byteLength%a!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${a}.`);let l=e.byteLength/a,u=new(Ui(t))(e.buffer,e.byteOffset,l);switch(t){case"int64":case"uint64":{let d=new Int32Array(l);for(let p=0;p<l;p++){let o=u[p];if(o>2147483647n||o<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");d[p]=Number(o)}return new Uint8Array(d.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&u.some(p=>p>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let d=Int32Array.from(u,Number);return new Uint8Array(d.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},ba=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let n=e.byteLength/4,a=new Int32Array(e.buffer,e.byteOffset,n);switch(t){case"int64":{let l=BigInt64Array.from(a,BigInt);return new Uint8Array(l.buffer)}case"uint64":{if(a.some(u=>u<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let l=BigUint64Array.from(a,BigInt);return new Uint8Array(l.buffer)}case"int8":{if(a.some(u=>u<-128||u>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let l=Int8Array.from(a,Number);return new Uint8Array(l.buffer)}case"uint8":{if(a.some(l=>l<0||l>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(a,Number)}case"uint32":{if(a.some(u=>u<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let l=Uint32Array.from(a,Number);return new Uint8Array(l.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},_g=1,ya=()=>_g++,wg=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),_a=(e,t)=>{let n=ga.get(e);if(!n)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((a,l)=>a*l)*n/8):0},wa=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:n,tensor:a,dataType:l,shape:u,fallbackDataType:d}=e;this.sessionId=t,this.mlContext=n,this.mlTensor=a,this.dataType=l,this.tensorShape=u,this.fallbackDataType=d}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return _a(this.dataType,this.tensorShape)}destroy(){$e("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),n=ba(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(n);return}else return new Uint8Array(n).buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,n){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===n.length&&this.tensorShape.every((a,l)=>a===n[l])}setIsDataConverted(e){this.isDataConverted=e}},va=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,n,a){let l=this.tensorManager.getMLContext(e),u=this.tensorManager.getMLOpSupportLimits(e),d;if(!(u!=null&&u.input.dataTypes.includes(t))){if(d=wg.get(t),!d||(u==null?void 0:u.input.dataTypes.includes(d)))throw new Error(`WebNN backend does not support data type: ${t}`);$e("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${d}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(l,t,n))return this.wrapper.tensor;if(a){if(this.wrapper.byteLength!==_a(t,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let p=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,n,p,!0,!0,d),a&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=yg(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else $e("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){var t,n;if(this.activeUpload){let a=(t=this.wrapper)!=null&&t.isDataConverted?ba(this.activeUpload,(n=this.wrapper)==null?void 0:n.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(a):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(a);return}else return a.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},vg=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=ya();return this.tensorTrackersById.set(e,new va(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,n,a,l){$e("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${a}, copyOld: ${l}}`);let u=this.tensorTrackersById.get(t);if(!u)throw new Error("Tensor not found.");return u.ensureTensor(e,n,a,l)}upload(e,t){let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");n.upload(t)}async download(e,t){$e("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let n=this.tensorTrackersById.get(e);if(!n)throw new Error("Tensor not found.");return n.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,n,a){let l=this.getMLContext(e),u=ya(),d=new wa({sessionId:e,context:l,tensor:t,dataType:n,shape:a});return this.tensorTrackersById.set(u,new va(this,d)),this.externalTensors.add(d),u}async getCachedTensor(e,t,n,a,l,u,d){let p=this.getMLContext(e);for(let[r,i]of this.freeTensors.entries())if(i.canReuseTensor(p,t,n)){$e("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${d?`fallbackDataType: ${d},`:""} shape: ${n}`);let s=this.freeTensors.splice(r,1)[0];return s.sessionId=e,s}$e("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${d?`fallbackDataType: ${d},`:""} shape: ${n}}`);let o=await p.createTensor({dataType:d??t,shape:n,dimensions:n,usage:a,writable:l,readable:u});return new wa({sessionId:e,context:p,tensor:o,dataType:t,shape:n,fallbackDataType:d})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},xg=(...e)=>new vg(...e)}),Jn,$g,Tg,N3=N(()=>{"use strict";se(),Mr(),bg(),D3(),Yt(),Jn=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),$g=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),a=Object.keys(t).sort();return n.length===a.length&&n.every((l,u)=>l===a[u]&&e[l]===t[l])},Tg=class{constructor(e){this.tensorManager=xg(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,fa(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){$e("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){$e("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let n of t)$e("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${n}}`),this.tensorManager.releaseTensorId(n);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let n=this.mlContextCache.findIndex(a=>a.gpuDevice===e);if(n!==-1)return this.mlContextCache[n].mlContext;{let a=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:a}),a}}else if(e===void 0){let n=this.mlContextCache.findIndex(a=>a.options===void 0&&a.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let a=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:a}),a}}let t=this.mlContextCache.findIndex(n=>$g(n.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let n=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:n}),n}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let n=this.sessionIdsByMLContext.get(t);n||(n=new Set,this.sessionIdsByMLContext.set(t,n)),n.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let n=this.sessionIdsByMLContext.get(t);if(n.delete(e),n.size===0){this.sessionIdsByMLContext.delete(t);let a=this.mlContextCache.findIndex(l=>l.mlContext===t);a!==-1&&this.mlContextCache.splice(a,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){$e("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,n,a,l){let u=Jn.get(n);if(!u)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,u,a,l)}async createTemporaryTensor(e,t,n){$e("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${n}}`);let a=Jn.get(t);if(!a)throw new Error(`Unsupported ONNX data type: ${t}`);let l=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,l,a,n,!1);let u=this.temporarySessionTensorIds.get(e);return u?u.push(l):this.temporarySessionTensorIds.set(e,[l]),l}uploadTensor(e,t){if(!Re().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");$e("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let n=await this.tensorManager.download(e);return ma(n,t)}}registerMLTensor(e,t,n,a){let l=Jn.get(n);if(!l)throw new Error(`Unsupported ONNX data type: ${n}`);let u=this.tensorManager.registerTensor(e,t,l,a);return $e("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${l}, dimensions: ${a}} -> {tensorId: ${u}}`),u}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let n=this.sessionGraphInputs.get(e);return n?n.includes(t):!1}isGraphOutput(e,t){let n=this.sessionGraphOutputs.get(e);return n?n.includes(t):!1}isGraphInputOutputTypeSupported(e,t,n=!0){let a=Jn.get(jr(t)),l=this.mlOpSupportLimitsBySessionId.get(e);return typeof a>"u"?!1:n?!!(l!=null&&l.input.dataTypes.includes(a)):!!(l!=null&&l.output.dataTypes.includes(a))}flush(){}}}),xa=N(()=>{"use strict"}),$a,Hi,Wi,Ig,Sg,Ta,Ia,Og,Eg,C3=N(()=>{"use strict";Yt(),xa(),$a=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Hi=[],Wi=e=>Math.ceil(Number(e)/16)*16,Ig=e=>{for(let t=0;t<Hi.length;t++){let n=Hi[t];if(e<=n)return n}return Math.ceil(e/16)*16},Sg=1,Ta=()=>Sg++,Ia=async(e,t,n,a)=>{let l=Wi(n),u=e.device.createBuffer({size:l,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let d=e.getCommandEncoder();e.endComputePass(),d.copyBufferToBuffer(t,0,u,0,l),e.flush(),await u.mapAsync(GPUMapMode.READ);let p=u.getMappedRange();if(a){let o=a();return o.set(new Uint8Array(p,0,n)),o}else return new Uint8Array(p.slice(0,n))}finally{u.destroy()}},Og=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of $a)Hi.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let n=t.buffer,a=t.byteOffset,l=t.byteLength,u=Wi(l),d=this.storageCache.get(e);if(!d)throw new Error("gpu data for uploading does not exist");if(Number(d.originalSize)!==l)throw new Error(`inconsistent data size. gpu data size=${d.originalSize}, data size=${l}`);if(u===l&&a%4===0)this.backend.device.queue.writeBuffer(d.gpuData.buffer,0,n,a,l);else{let p=new Uint8Array(u);p.set(t),this.backend.device.queue.writeBuffer(d.gpuData.buffer,0,p,0,u)}$e("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let n=this.storageCache.get(e);if(!n)throw new Error("source gpu data for memcpy does not exist");let a=this.storageCache.get(t);if(!a)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==a.originalSize)throw new Error("inconsistent source and destination gpu data size");let l=Wi(n.originalSize),u=this.backend.getCommandEncoder();this.backend.endComputePass(),u.copyBufferToBuffer(n.gpuData.buffer,0,a.gpuData.buffer,0,l)}registerExternalBuffer(e,t,n){let a;if(n){if(a=n[0],e===n[1])return $e("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${a}, buffer is the same, skip.`),a;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else a=Ta();return this.storageCache.set(a,{gpuData:{id:a,type:0,buffer:e},originalSize:t}),$e("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${a}, registered.`),a}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),$e("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Ig(e),a,l=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,u=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(l||u){let p=(l?this.freeBuffers:this.freeUniformBuffers).get(n);p?p.length>0?a=p.pop():a=this.backend.device.createBuffer({size:n,usage:t}):a=this.backend.device.createBuffer({size:n,usage:t})}else a=this.backend.device.createBuffer({size:n,usage:t});let d={id:Ta(),type:0,buffer:a};return this.storageCache.set(d.id,{gpuData:d,originalSize:Number(e)}),$e("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${d.id}`),d}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,n=this.storageCache.get(t);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return $e("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,t){let n=this.storageCache.get(Number(e));if(!n)throw new Error("data does not exist");await Ia(this.backend,n.gpuData.buffer,n.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=$a.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&($e("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Eg=(...e)=>new Og(...e)}),Pg,Ee,He=N(()=>{"use strict";Pg=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},Ee=e=>new Pg(e)}),_n,Ki,Qe,et,oe,We,Sa,wn,ur,ne,Yn,L,te,Ag,Oa,kg,Dg,de=N(()=>{"use strict";se(),ae(),_n=64,Ki=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Qe=(e,t=1)=>{let n=Ki(e,t);return typeof n=="string"?n:n[0]},et=(e,t=1)=>{let n=Ki(e,t);return typeof n=="string"?n:n[1]},oe=(...e)=>{let t=[];return e.forEach(n=>{n.length!==0&&t.push({type:12,data:n},{type:12,data:B.computeStrides(n)})}),t},We=e=>e%4===0?4:e%2===0?2:1,Sa=(e="f32",t,n="0")=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,wn=(e,t,n)=>e==="f32"?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,ur=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,ne=(e,t,n,a)=>e.startsWith("uniforms.")&&n>4?typeof t=="string"?a==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:a==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,Yn=(e,t,n,a,l)=>{let u=typeof n=="number",d=u?n:n.length,p=[...new Array(d).keys()],o=d<2?"u32":d<=4?`vec${d}<u32>`:`array<u32, ${d}>`,r=Ki(t,l),i=typeof r=="string"?r:r[1],s=typeof r=="string"?r:r[0],c={indices:o,value:i,storage:s,tensor:t},h=U=>typeof U=="string"?U:`${U}u`,m={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},b=u?"uniforms.":"",x=`${b}${e}_shape`,v=`${b}${e}_strides`,_="";for(let U=0;U<d-1;U++)_+=`
    let dim${U} = current / ${ne(v,U,d)};
    let rest${U} = current % ${ne(v,U,d)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;_+=`indices[${d-1}] = current;`;let I=d<2?"":`
  fn o2i_${e}(offset: u32) -> ${c.indices} {
    var indices: ${c.indices};
    var current = offset;
    ${_}
    return indices;
  }`,O=U=>(m.offsetToIndices=!0,d<2?U:`o2i_${e}(${U})`),E=[];if(d>=2)for(let U=d-1;U>=0;U--)E.push(`${ne(v,U,d)} * (indices[${U}])`);let A=d<2?"":`
  fn i2o_${e}(indices: ${c.indices}) -> u32 {
    return ${E.join("+")};
  }`,k=U=>(m.indicesToOffset=!0,d<2?U:`i2o_${e}(${U})`),T=(...U)=>d===0?"0u":`${c.indices}(${U.map(h).join(",")})`,M=(U,W)=>d<2?`${U}`:`${ne(U,W,d)}`,F=(U,W,X)=>d<2?`${U}=${X};`:`${ne(U,W,d)}=${X};`,J={},K=(U,W)=>{m.broadcastedIndicesToOffset=!0;let X=`${W.name}broadcastedIndicesTo${e}Offset`;if(X in J)return`${X}(${U})`;let q=[];for(let le=d-1;le>=0;le--){let Pe=W.indicesGet("outputIndices",le+W.rank-d);q.push(`${M(v,le)} * (${Pe} % ${M(x,le)})`)}return J[X]=`fn ${X}(outputIndices: ${W.type.indices}) -> u32 {
             return ${q.length>0?q.join("+"):"0u"};
           }`,`${X}(${U})`},C=(U,W)=>(()=>{if(c.storage===c.value)return`${e}[${U}]=${W};`;if(c.storage==="vec2<u32>"&&c.value==="i32")return`${e}[${U}]=vec2<u32>(u32(${W}), select(0u, 0xFFFFFFFFu, ${W} < 0));`;if(c.storage==="vec2<u32>"&&c.value==="u32")return`${e}[${U}]=vec2<u32>(u32(${W}), 0u);`;if(c.storage==="u32"&&c.value==="vec4<bool>")return`${e}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${W}));`;throw new Error(`not supported combination of storage type ${c.storage} and value type ${c.value} yet`)})(),R=U=>(()=>{if(c.storage===c.value)return`${e}[${U}]`;if(c.storage==="vec2<u32>"&&c.value==="i32")return`i32(${e}[${U}].x)`;if(c.storage==="vec2<u32>"&&c.value==="u32")return`u32(${e}[${U}].x)`;if(c.storage==="u32"&&c.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${U}] & 0xFFu), bool(${e}[${U}] & 0xFF00u), bool(${e}[${U}] & 0xFF0000u), bool(${e}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${c.storage} and value type ${c.value} yet`)})(),$=d<2?"":`
  fn get_${e}ByIndices(indices: ${c.indices}) -> ${i} {
    return ${R(`i2o_${e}(indices)`)};
  }`,z=d<2?"":(()=>{let U=p.map(X=>`d${X}: u32`).join(", "),W=p.map(X=>`d${X}`).join(", ");return`
  fn get_${e}(${U}) -> ${i} {
    return get_${e}ByIndices(${T(W)});
  }`})(),G=(...U)=>{if(U.length!==d)throw new Error(`indices length must be ${d}`);let W=U.map(h).join(",");return d===0?R("0u"):d===1?R(W[0]):(m.get=!0,m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}(${W})`)},re=U=>d<2?R(U):(m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}ByIndices(${U})`),V=d<2?"":`
  fn set_${e}ByIndices(indices: ${c.indices}, value: ${i}) {
    ${C(`i2o_${e}(indices)`,"value")}
  }`,ee=d<2?"":(()=>{let U=p.map(X=>`d${X}: u32`).join(", "),W=p.map(X=>`d${X}`).join(", ");return`
  fn set_${e}(${U}, value: ${i}) {
    set_${e}ByIndices(${T(W)}, value);
  }`})();return{impl:()=>{let U=[],W=!1;return m.offsetToIndices&&(U.push(I),W=!0),m.indicesToOffset&&(U.push(A),W=!0),m.broadcastedIndicesToOffset&&(Object.values(J).forEach(X=>U.push(X)),W=!0),m.set&&(U.push(ee),W=!0),m.setByIndices&&(U.push(V),W=!0),m.get&&(U.push(z),W=!0),m.getByIndices&&(U.push($),W=!0),!u&&W&&U.unshift(`const ${x} = ${c.indices}(${n.join(",")});`,`const ${v} = ${c.indices}(${B.computeStrides(n).join(",")});`),U.join(`
`)},type:c,offsetToIndices:O,indicesToOffset:k,broadcastedIndicesToOffset:K,indices:T,indicesGet:M,indicesSet:F,set:(...U)=>{if(U.length!==d+1)throw new Error(`indices length must be ${d}`);let W=U[d];if(typeof W!="string")throw new Error("value must be string");let X=U.slice(0,d).map(h).join(",");return d===0?C("0u",W):d===1?C(X[0],W):(m.set=!0,m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}(${X}, ${W})`)},setByOffset:C,setByIndices:(U,W)=>d<2?C(U,W):(m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}ByIndices(${U}, ${W});`),get:G,getByOffset:R,getByIndices:re,usage:a,name:e,strides:v,shape:x,rank:d}},L=(e,t,n,a=1)=>Yn(e,t,n,"input",a),te=(e,t,n,a=1)=>Yn(e,t,n,"output",a),Ag=(e,t,n)=>Yn(e,t,n,"atomicOutput",1),Oa=(e,t,n,a=1)=>Yn(e,t,n,"internal",a),kg=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=_n){let t=typeof e=="number"?e:e[0],n=typeof e=="number"?1:e[1],a=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||a>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${n}, ${a}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*n*a>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${n}, ${a}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let l=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,u=l?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,d=l?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*n*a}u + local_idx;`;return`@compute @workgroup_size(${t}, ${n}, ${a})
  fn main(${u}) {
    ${d}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let n=e.usage==="input"?"read":"read_write",a=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${n}> ${e.name}: array<${a}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,n=1){return this.uniforms.push({name:e,type:t,length:n}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:n,length:a}of this.uniforms)if(a&&a>4)n==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${n}>, ${Math.ceil(a/8)}>`):e.push(`${t}:array<vec4<${n}>, ${Math.ceil(a/4)}>`);else{let l=a==null||a===1?n:`vec${a}<${n}>`;e.push(`${t}:${l}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Dg=(e,t)=>new kg(e,t)}),Ng,Ea,Cg,zg,Rg,Bg,_t,Mg,Fg,lr=N(()=>{"use strict";se(),ae(),He(),de(),Ng=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Ea=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Cg=(e,t)=>B.sortBasedOnPerm(e,Ea(e.length,t)),zg=(e,t,n,a)=>{let l=`fn perm(i: ${a.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let u=0;u<t;++u)l+=`a[${e[u]}]=i[${u}];`;return l+="return a;}"},Rg=(e,t)=>{let n=[],a=[];for(let l=0;l<e.length;++l)e[l]!==1&&n.push(e[l]),e[t[l]]!==1&&a.push(t[l]);return{newShape:n,newPerm:a}},Bg=(e,t)=>{let n=0;for(let a=0;a<e.length;++a)if(t[e[a]]!==1){if(e[a]<n)return!1;n=e[a]}return!0},_t=(e,t)=>{let n=e.dataType,a=e.dims.length,l=Ea(a,t),u=Cg(e.dims,l),d=e.dims,p=u,o=a<2||Bg(l,e.dims),r;if(o)return r=m=>{let b=L("input",n,d,4),x=te("output",n,p,4);return`
  ${m.registerUniform("output_size","u32").declareVariables(b,x)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let m=B.size(u);return{outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(m/4)}]}},getShaderSource:r};let{newShape:i,newPerm:s}=Rg(e.dims,l),c=B.areEqual(s,[2,3,1]),h=B.areEqual(s,[3,1,2]);if(i.length===2||c||h){d=c?[i[0],i[1]*i[2]]:h?[i[0]*i[1],i[2]]:i,p=[d[1],d[0]];let m=16;return r=b=>{let x=L("a",n,d.length),v=te("output",n,p.length);return`
  ${b.registerUniform("output_size","u32").declareVariables(x,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${m+1}>, ${m}>;
  ${b.mainStart([m,m,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${m} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${m}u + local_id.x;
    let input_row = workgroup_id_x * ${m}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${x.getByIndices(`${x.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${m}u + local_id.x;
    let output_row = workgroup_id_y * ${m}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let b=B.size(u);return{outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(p[1]/m),y:Math.ceil(p[0]/m)},programUniforms:[{type:12,data:b},...oe(d,p)]}},getShaderSource:r}}return r=m=>{let b=L("a",n,d.length),x=te("output",n,p.length);return`
  ${m.registerUniform("output_size","u32").declareVariables(b,x)}

  ${zg(l,a,b,x)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${x.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${x.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let m=B.size(u);return{outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...oe(d,p)]}},getShaderSource:r}},Mg=(e,t)=>{Ng(e.inputs,t.perm),e.compute(_t(e.inputs[0],t.perm))},Fg=e=>Ee({perm:e.perm})}),jg,Lg,Vg,Ug,qg,Gg,Hg,Wg,Kg,Xg,zt,Zg,Jg,Yg,Qg,eb,tb,rb,nb,ib,ob,z3=N(()=>{"use strict";se(),ae(),de(),Aa(),lr(),jg={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Lg={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Vg={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Ug={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},qg=(e,t)=>{let n=[];for(let a=t-e;a<t;++a)n.push(a);return n},Gg=(e,t)=>{let n=[],a=e.length;for(let u=0;u<a;u++)t.indexOf(u)===-1&&n.push(e[u]);let l=t.map(u=>e[u]);return[n,l]},Hg=(e,t)=>{let n=e.length+t.length,a=[],l=0;for(let u=0;u<n;u++)t.indexOf(u)===-1?a.push(e[l++]):a.push(1);return a},Wg=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},Kg=(e,t)=>{let n=[];if(!Wg(e,t)){for(let a=0;a<t;++a)e.indexOf(a)===-1&&n.push(a);e.forEach(a=>n.push(a))}return n},Xg=(e,t,n,a,l,u,d)=>{let p=n[0].dims,o=B.size(u),r=B.size(d),i=L("_A",n[0].dataType,p),s=te("output",l,u),c=64;o===1&&(c=256);let h=`
          var<workgroup> aBestValues : array<f32, ${c}>;
       `,m=b=>`
        ${b.registerUniform("reduceSize","u32").declareVariables(i,s)}
        ${h}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${b.mainStart(c)}

          let outputIndex = global_idx / ${c};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Vg[a]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${c}) {
           let candidate = f32(${i.getByOffset("offset + k")});
           bestValue = ${jg[a]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${c}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Lg[a]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${s.setByOffset("outputIndex",`${a==="mean"?`${s.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${s.type.storage}(${Ug[a]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${c}`,inputDependencies:["type"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:u,dataType:l}],dispatchGroup:{x:o},programUniforms:[{type:12,data:r}]})}},zt=(e,t,n,a)=>{let l=e.inputs.length===1?n:Pa(e.inputs,n),u=l.axes;u.length===0&&!l.noopWithEmptyAxes&&(u=e.inputs[0].dims.map((h,m)=>m));let d=B.normalizeAxes(u,e.inputs[0].dims.length),p=d,o=e.inputs[0],r=Kg(p,e.inputs[0].dims.length);r.length>0&&(o=e.compute(_t(e.inputs[0],r),{inputs:[0],outputs:[-1]})[0],p=qg(p.length,o.dims.length));let[i,s]=Gg(o.dims,p),c=i;l.keepDims&&(c=Hg(i,d)),e.compute(Xg(t,l.cacheKey,[o],a,e.inputs[0].dataType,c,s),{inputs:[o]})},Zg=(e,t)=>{zt(e,"ReduceMeanShared",t,"mean")},Jg=(e,t)=>{zt(e,"ReduceL1Shared",t,"l1")},Yg=(e,t)=>{zt(e,"ReduceL2Shared",t,"l2")},Qg=(e,t)=>{zt(e,"ReduceLogSumExpShared",t,"logSumExp")},eb=(e,t)=>{zt(e,"ReduceMaxShared",t,"max")},tb=(e,t)=>{zt(e,"ReduceMinShared",t,"min")},rb=(e,t)=>{zt(e,"ReduceProdShared",t,"prod")},nb=(e,t)=>{zt(e,"ReduceSumShared",t,"sum")},ib=(e,t)=>{zt(e,"ReduceSumSquareShared",t,"sumSquare")},ob=(e,t)=>{zt(e,"ReduceLogSumShared",t,"logSum")}}),Rt,sb,Xi,Pa,Bt,ab,ub,lb,db,pb,cb,hb,fb,mb,gb,Mt,bb,yb,_b,wb,vb,xb,$b,Tb,Ib,Sb,Aa=N(()=>{"use strict";se(),ae(),He(),de(),z3(),Rt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},sb=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Xi=(e,t,n,a,l,u,d=!1,p=!1)=>{let o=[],r=n[0].dims,i=r.length,s=B.normalizeAxes(l,i),c=!p&&s.length===0;r.forEach((b,x)=>{c||s.indexOf(x)>=0?d&&o.push(1):o.push(b)});let h=o.length,m=B.size(o);return{name:e,shaderCache:t,getShaderSource:b=>{let x=[],v=L("_A",n[0].dataType,i),_=te("output",u,h),I=a(v,_,s),O=I[2];for(let E=0,A=0;E<i;E++)c||s.indexOf(E)>=0?(d&&A++,O=`for(var j${E}: u32 = 0; j${E} < ${r[E]}; j${E}++) {
                  ${I[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${v.indicesSet("input_indices",E,`j${E}`)}
                  ${O}
                }`):(x.push(`${v.indicesSet("input_indices",E,_.indicesGet("output_indices",A))};`),A++);return`

        ${b.registerUniform("output_size","u32").declareVariables(v,_)}

        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${_.offsetToIndices("global_idx")};

          ${x.join(`
`)}
          ${I[0]}       // init ops for reduce max/min
          ${I[1]}
          ${O}
          ${I[3]}
          ${I.length===4?_.setByOffset("global_idx","value"):I.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:o,dataType:u}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...oe(r,o)]})}},Pa=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(a=>n.push(Number(a))),Ee({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Bt=(e,t,n,a)=>{let l=e.inputs,u=l.length===1?n:Pa(l,n);e.compute(Xi(t,{hint:u.cacheKey,inputDependencies:["rank"]},[l[0]],u.noopWithEmptyAxes&&u.axes.length===0?sb:a,u.axes,l[0].dataType,u.keepDims,u.noopWithEmptyAxes),{inputs:[0]})},ab=(e,t)=>{Rt(e.inputs),Bt(e,"ReduceLogSum",t,(n,a)=>[`var value = ${a.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},ub=(e,t)=>{Rt(e.inputs),Bt(e,"ReduceL1",t,(n,a)=>[`var value = ${a.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},lb=(e,t)=>{Rt(e.inputs),Bt(e,"ReduceL2",t,(n,a)=>[`var t = ${a.type.value}(0); var value = ${a.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},db=(e,t)=>{Rt(e.inputs),Bt(e,"ReduceLogSumExp",t,(n,a)=>[`var value = ${a.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},pb=(e,t)=>{Rt(e.inputs),Bt(e,"ReduceMax",t,(n,a,l)=>{let u=[];for(let d=0;d<n.rank;d++)(l.indexOf(d)>=0||l.length===0)&&u.push(n.indicesSet("input_indices",d,0));return[`${u.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},cb=(e,t)=>{Rt(e.inputs),Bt(e,"ReduceMean",t,(n,a,l)=>{let u=1;for(let d=0;d<n.rank;d++)(l.indexOf(d)>=0||l.length===0)&&(u*=e.inputs[0].dims[d]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${a.type.value}(sum / ${u});`]})},hb=(e,t)=>{Rt(e.inputs),Bt(e,"ReduceMin",t,(n,a,l)=>{let u=[];for(let d=0;d<n.rank;d++)(l.indexOf(d)>=0||l.length===0)&&u.push(`input_indices[${d}] = 0;`);return[`${u.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},fb=(e,t)=>{Rt(e.inputs),Bt(e,"ReduceProd",t,(n,a)=>[`var value = ${a.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},mb=(e,t)=>{Rt(e.inputs),Bt(e,"ReduceSum",t,(n,a)=>[`var value = ${a.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},gb=(e,t)=>{Rt(e.inputs),Bt(e,"ReduceSumSquare",t,(n,a)=>[`var t = ${a.type.value}(0); var value = ${a.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},Mt=(e,t,n)=>{if(t.length===0)return n;let a=1,l=1;for(let u=0;u<t.length;u++)t.indexOf(u)===-1?a*=e[u]:l*=e[u];return l<32&&a>1024},bb=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?cb(e,t):Zg(e,t)},yb=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ub(e,t):Jg(e,t)},_b=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?lb(e,t):Yg(e,t)},wb=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?db(e,t):Qg(e,t)},vb=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?pb(e,t):eb(e,t)},xb=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?hb(e,t):tb(e,t)},$b=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fb(e,t):rb(e,t)},Tb=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mb(e,t):nb(e,t)},Ib=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?gb(e,t):ib(e,t)},Sb=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ab(e,t):ob(e,t)}}),ka,Ob,Eb,Da,R3=N(()=>{"use strict";se(),He(),Aa(),ka=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Ob=(e,t)=>{ka(e.inputs);let n=(a,l,u)=>{let d=[];for(let p=0;p<a.rank;p++)(u.indexOf(p)>=0||u.length===0)&&d.push(`input_indices[${p}] = 0;`);return[`${d.join(`
`)}`,`var value = ${a.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${a.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${a.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",l.setByOffset("global_idx","best_index")]};e.compute(Xi("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Eb=(e,t)=>{ka(e.inputs);let n=(a,l,u)=>{let d=[];for(let p=0;p<a.rank;p++)(u.indexOf(p)>=0||u.length===0)&&d.push(`input_indices[${p}] = 0;`);return[`${d.join(`
`)}`,`var value = ${a.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${a.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${a.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",l.setByOffset("global_idx","best_index")]};e.compute(Xi("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Da=e=>Ee(e)}),Pb,Zi,Ab,kb,Db,Qn,Nb,Cb,Na=N(()=>{"use strict";se(),ae(),xa(),de(),Pb=(e,t)=>{let n=e[0],a=e[1],l=e[2],u=e[3],d=e[4],p=e[5];if(d&&p)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let o=n.dims[0],r=n.dims[1],i=n.dims[2];if(l.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(a.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(a.dims[0]!==i)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(l.dims[0]!==a.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let s=l.dims[0]/3,c=s,h=c;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let I of t.qkvHiddenSizes)if(I%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");s=t.qkvHiddenSizes[0],c=t.qkvHiddenSizes[1],h=t.qkvHiddenSizes[2]}let m=r;if(s!==c)throw new Error("qkv_hidden_sizes first element should be same as the second");if(l.dims[0]!==s+c+h)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let b=0;if(d){if(c!==h)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(d.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(d.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(d.dims[1]!==o)throw new Error('Input "past" second dimension must be batch_size');if(d.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(d.dims[4]!==c/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(b=d.dims[3])}let x=m+b,v=-1,_=0;if(u)throw new Error("Mask not supported");if(d)throw new Error("past is not supported");if(p){if(p.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(p.dims[0]!==o||p.dims[1]!==t.numHeads||p.dims[2]!==r||p.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:o,sequenceLength:r,pastSequenceLength:b,kvSequenceLength:m,totalSequenceLength:x,maxSequenceLength:v,inputHiddenSize:i,hiddenSize:s,vHiddenSize:h,headSize:Math.floor(s/t.numHeads),vHeadSize:Math.floor(h/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Zi=(e,t,n)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e==null?void 0:e.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${n?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Ab=(e,t,n,a,l,u,d,p)=>{let o=We(d?1:u),r=64,i=u/o;i<r&&(r=32);let s=Math.ceil(u/o/r),c=[{type:12,data:t},{type:12,data:n},{type:12,data:a},{type:12,data:l},{type:12,data:i},{type:12,data:s}],h=Qe(e.dataType,o),m=et(1,o),b=["type"];d&&b.push("type"),p&&b.push("type");let x=v=>{let _=te("x",e.dataType,e.dims,o),I=[_],O=d?L("seq_lens",d.dataType,d.dims):void 0;O&&I.push(O);let E=p?L("total_sequence_length_input",p.dataType,p.dims):void 0;E&&I.push(E);let A=et(e.dataType),k=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${r}>;
  var<workgroup> thread_sum: array<f32, ${r}>;
  ${v.registerUniforms(k).declareVariables(...I)}
  ${v.mainStart([r,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Zi(O,E,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${r}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${d?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${m}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${m}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(o){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${o}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${r}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${m}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${m}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(o){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${o}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${r}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${_.type.value}(${A}(1.0) / ${A}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${m}(x[offset + i]);
        x[offset + i] = ${_.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${d?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${_.type.value}(${A}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${r};${h};${o}`,inputDependencies:b},getShaderSource:x,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:l,z:t*n},programUniforms:c})}},kb=(e,t,n,a,l,u,d,p,o)=>{let r=d+u.kvSequenceLength,i=[u.batchSize,u.numHeads,u.sequenceLength,r],s=e>1&&a,c=u.kvNumHeads?u.kvNumHeads:u.numHeads,h=s?[u.batchSize,c,r,u.headSize]:void 0,m=u.nReps?u.nReps:1,b=u.scale===0?1/Math.sqrt(u.headSize):u.scale,x=We(u.headSize),v=u.headSize/x,_=12,I={x:Math.ceil(r/_),y:Math.ceil(u.sequenceLength/_),z:u.batchSize*u.numHeads},O=[{type:12,data:u.sequenceLength},{type:12,data:v},{type:12,data:r},{type:12,data:u.numHeads},{type:12,data:u.headSize},{type:1,data:b},{type:12,data:d},{type:12,data:u.kvSequenceLength},{type:12,data:m}],E=s&&a&&B.size(a.dims)>0,A=["type","type"];E&&A.push("type"),l&&A.push("type"),p&&A.push("type"),o&&A.push("type");let k=[{dims:i,dataType:t.dataType,gpuDataType:0}];s&&k.push({dims:h,dataType:t.dataType,gpuDataType:0});let T=M=>{let F=L("q",t.dataType,t.dims,x),J=L("key",n.dataType,n.dims,x),K=[F,J];if(E){let V=L("past_key",a.dataType,a.dims,x);K.push(V)}l&&K.push(L("attention_bias",l.dataType,l.dims));let C=p?L("seq_lens",p.dataType,p.dims):void 0;C&&K.push(C);let R=o?L("total_sequence_length_input",o.dataType,o.dims):void 0;R&&K.push(R);let $=te("output",t.dataType,i),z=[$];s&&z.push(te("present_key",t.dataType,h,x));let G=et(1,x),re=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;

  var<workgroup> tileQ: array<${F.type.storage}, ${_*_}>;
  var<workgroup> tileK: array<${F.type.storage}, ${_*_}>;
  ${M.registerUniforms(re).declareVariables(...K,...z)}
  ${M.mainStart([_,_,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${m===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${m===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Zi(C,R,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${E&&s?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${s?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${G}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${E&&s?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${s?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${G}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(x){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${x}`)}})()};
        output[outputIdx] = ${$.type.value} (sum * uniforms.alpha) + ${l?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${x};${l!==void 0};${a!==void 0};${e}`,inputDependencies:A},getRunData:()=>({outputs:k,dispatchGroup:I,programUniforms:O}),getShaderSource:T}},Db=(e,t,n,a,l,u,d=void 0,p=void 0)=>{let o=u+l.kvSequenceLength,r=l.nReps?l.nReps:1,i=l.vHiddenSize*r,s=e>1&&a,c=l.kvNumHeads?l.kvNumHeads:l.numHeads,h=s?[l.batchSize,c,o,l.headSize]:void 0,m=[l.batchSize,l.sequenceLength,i],b=12,x={x:Math.ceil(l.vHeadSize/b),y:Math.ceil(l.sequenceLength/b),z:l.batchSize*l.numHeads},v=[{type:12,data:l.sequenceLength},{type:12,data:o},{type:12,data:l.vHeadSize},{type:12,data:l.numHeads},{type:12,data:l.headSize},{type:12,data:i},{type:12,data:u},{type:12,data:l.kvSequenceLength},{type:12,data:r}],_=s&&a&&B.size(a.dims)>0,I=["type","type"];_&&I.push("type"),d&&I.push("type"),p&&I.push("type");let O=[{dims:m,dataType:t.dataType,gpuDataType:0}];s&&O.push({dims:h,dataType:t.dataType,gpuDataType:0});let E=A=>{let k=L("probs",t.dataType,t.dims),T=L("v",n.dataType,n.dims),M=[k,T];_&&M.push(L("past_value",a.dataType,a.dims));let F=d?L("seq_lens",d.dataType,d.dims):void 0;d&&M.push(F);let J=p?L("total_sequence_length_input",p.dataType,p.dims):void 0;p&&M.push(J);let K=[te("output",t.dataType,m)];s&&K.push(te("present_value",t.dataType,h));let C=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;
  var<workgroup> tileQ: array<${k.type.value}, ${b*b}>;
  var<workgroup> tileV: array<${k.type.value}, ${b*b}>;
  ${A.registerUniforms(C).declareVariables(...M,...K)}
  ${A.mainStart([b,b,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${r===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${r===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Zi(F,J,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${_&&s?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${s?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${k.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${_&&s?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${s?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${a!==void 0};${e}`,inputDependencies:I},getRunData:()=>({outputs:O,dispatchGroup:x,programUniforms:v}),getShaderSource:E}},Qn=(e,t,n,a,l,u,d,p,o,r,i=void 0,s=void 0)=>{let c=Math.min(e.outputCount,1+(d?1:0)+(p?1:0)),h=c>1?d:void 0,m=c>1?p:void 0,b=c>1?r.pastSequenceLength:0,x=b+r.kvSequenceLength,v=o&&B.size(o.dims)>0?o:void 0,_=[t,n];h&&B.size(h.dims)>0&&_.push(h),v&&_.push(v),i&&_.push(i),s&&_.push(s);let I=e.compute(kb(c,t,n,h,v,r,b,i,s),{inputs:_,outputs:c>1?[-1,1]:[-1]})[0];e.compute(Ab(I,r.batchSize,r.numHeads,b,r.sequenceLength,x,i,s),{inputs:i&&s?[I,i,s]:[I],outputs:[]});let O=[I,a];m&&B.size(m.dims)>0&&O.push(m),i&&O.push(i),s&&O.push(s),e.compute(Db(c,I,a,m,r,b,i,s),{inputs:O,outputs:c>1?[0,2]:[0]})},Nb=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],a=t.sequenceLength,l=t.inputHiddenSize,u=t.headSize,d=12,p={x:Math.ceil(t.headSize/d),y:Math.ceil(t.sequenceLength/d),z:t.batchSize*t.numHeads},o=[e.inputs[0],e.inputs[1],e.inputs[2]],r=[{type:12,data:a},{type:12,data:l},{type:12,data:u},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],i=s=>{let c=te("output_q",o[0].dataType,n),h=te("output_k",o[0].dataType,n),m=te("output_v",o[0].dataType,n),b=L("input",o[0].dataType,o[0].dims),x=L("weight",o[1].dataType,o[1].dims),v=L("bias",o[2].dataType,o[2].dims),_=b.type.storage,I=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${d}u;
  var<workgroup> tileInput: array<${_}, ${d*d}>;
  var<workgroup> tileWeightQ: array<${_}, ${d*d}>;
  var<workgroup> tileWeightK: array<${_}, ${d*d}>;
  var<workgroup> tileWeightV: array<${_}, ${d*d}>;
  ${s.registerUniforms(I).declareVariables(b,x,v,c,h,m)}
  ${s.mainStart([d,d,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${_}(0);
    var valueK = ${_}(0);
    var valueV = ${_}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:p,programUniforms:r}),getShaderSource:i},{inputs:o,outputs:[-1,-1,-1]})},Cb=(e,t)=>{let n=Pb(e.inputs,t),[a,l,u]=Nb(e,n);return Qn(e,a,l,u,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}}),zb,Rb,Bb,Mb,B3=N(()=>{"use strict";st(),se(),ae(),He(),de(),zb=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(a,l,u)=>{let d=l.length;if(d!==a.length)throw new Error(`${u}: num dimensions != ${d}`);l.forEach((p,o)=>{if(p!==a[o])throw new Error(`${u}: dim[${o}] do not match`)})};if(e[0].dims.length>1){let a=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,a,"Invalid input scale"),n(e[2].dims,a,"Invalid input B"),n(e[3].dims,a,"Invalid input mean"),n(e[4].dims,a,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},Rb=(e,t)=>{let{epsilon:n,spatial:a,format:l}=t,u=e[0].dims,d=a?We(u[u.length-1]):1,p=l==="NHWC"&&u.length>1?d:1,o=B.size(u)/d,r=a,i=r?u.length:u,s=L("x",e[0].dataType,e[0].dims,d),c=L("scale",e[1].dataType,e[1].dims,p),h=L("bias",e[2].dataType,e[2].dims,p),m=L("inputMean",e[3].dataType,e[3].dims,p),b=L("inputVar",e[4].dataType,e[4].dims,p),x=te("y",e[0].dataType,i,d),v=()=>{let I="";if(a)I=`let cOffset = ${u.length===1?"0u":l==="NHWC"?`outputIndices[${u.length-1}] / ${d}`:"outputIndices[1]"};`;else if(l==="NCHW")I=`
            ${x.indicesSet("outputIndices","0","0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;else{I=`var cIndices = ${c.type.indices}(0);
                       cIndices[0] = outputIndices[${u.length-1}];`;for(let O=1;O<c.rank;O++)I+=`cIndices[${O}] = outputIndices[${O}];`;I+=`let cOffset = ${c.indicesToOffset("cIndices")};`}return I},_=I=>`
  const epsilon = ${n};
  ${I.registerUniform("outputSize","u32").declareVariables(s,c,h,m,b,x)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${d}`)};
    ${v()}
    let scale = ${c.getByOffset("cOffset")};
    let bias = ${h.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${b.getByOffset("cOffset")};
    let x = ${s.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${a}_${d}`,inputDependencies:r?["rank","type","type","type","type"]:void 0},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:r?[{type:12,data:o},...oe(u)]:[{type:12,data:o}]})}},Bb=e=>Ee(e),Mb=(e,t)=>{let{inputs:n,outputCount:a}=e,l=Bb({...t,outputCount:a});if(fe.webgpu.validateInputContent&&zb(n,l),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Rb(n,l))}}),Fb,jb,Lb,M3=N(()=>{"use strict";ae(),de(),Fb=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},jb=e=>{let t=e[0].dims,n=e[0].dims[2],a=B.size(t)/4,l=e[0].dataType,u=L("input",l,t,4),d=L("bias",l,[n],4),p=L("residual",l,t,4),o=te("output",l,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:r=>`
  const channels = ${n}u / 4;
  ${r.declareVariables(u,d,p,o)}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let value = ${u.getByOffset("global_idx")}
      + ${d.getByOffset("global_idx % channels")} + ${p.getByOffset("global_idx")};
    ${o.setByOffset("global_idx","value")}
  }`}},Lb=e=>{Fb(e.inputs),e.compute(jb(e.inputs))}}),Vb,Ie,Ub,qb,Gb,Hb,Wb,Kb,Xb,Zb,Jb,Yb,Qb,ey,ty,ry,ei,ny,Ji,iy,oy,sy,ay,uy,ly,dy,py,cy,hy,fy,my,gy,by,yy,_y,wy,Ca,vy,za,Ra,xy,$y,Ty,Iy,Sy,Oy,Ba=N(()=>{"use strict";se(),ae(),He(),de(),Vb=(e,t,n,a,l,u,d)=>{let p=Math.ceil(t/4),o="";typeof l=="string"?o=`${l}(a)`:o=l("a");let r=L("inputData",n,[p],4),i=te("outputData",a,[p],4),s=[{name:"vec_size",type:"u32"}];return d&&s.push(...d),`
      ${e.registerUniforms(s).declareVariables(r,i)}

  ${u??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${r.getByOffset("global_idx")};
    ${i.setByOffset("global_idx",o)}
  }`},Ie=(e,t,n,a,l,u=e.dataType,d,p)=>{let o=[{type:12,data:Math.ceil(B.size(e.dims)/4)}];return d&&o.push(...d),{name:t,shaderCache:{hint:l,inputDependencies:["type"]},getShaderSource:r=>Vb(r,B.size(e.dims),e.dataType,u,n,a,p),getRunData:r=>({outputs:[{dims:e.dims,dataType:u}],dispatchGroup:{x:Math.ceil(B.size(r[0].dims)/64/4)},programUniforms:o})}},Ub=e=>{e.compute(Ie(e.inputs[0],"Abs","abs"))},qb=e=>{e.compute(Ie(e.inputs[0],"Acos","acos"))},Gb=e=>{e.compute(Ie(e.inputs[0],"Acosh","acosh"))},Hb=e=>{e.compute(Ie(e.inputs[0],"Asin","asin"))},Wb=e=>{e.compute(Ie(e.inputs[0],"Asinh","asinh"))},Kb=e=>{e.compute(Ie(e.inputs[0],"Atan","atan"))},Xb=e=>{e.compute(Ie(e.inputs[0],"Atanh","atanh"))},Zb=e=>Ee(e),Jb=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(Ie(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},Yb=e=>{let t,n,a=e.length>=2&&e[1].data!==0,l=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=a?e[1].getFloat32Array()[0]:-34028234663852886e22,n=l?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=a?e[1].getUint16Array()[0]:64511,n=l?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return Ee({min:t,max:n})},Qb=(e,t)=>{let n=t||Yb(e.inputs),a=et(e.inputs[0].dataType);e.compute(Ie(e.inputs[0],"Clip",l=>`clamp(${l}, vec4<${a}>(uniforms.min), vec4<${a}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:a},{name:"max",type:a}]),{inputs:[0]})},ey=e=>{e.compute(Ie(e.inputs[0],"Ceil","ceil"))},ty=e=>{e.compute(Ie(e.inputs[0],"Cos","cos"))},ry=e=>{e.compute(Ie(e.inputs[0],"Cosh","cosh"))},ei=e=>Ee(e),ny=(e,t)=>{let n=et(e.inputs[0].dataType);e.compute(Ie(e.inputs[0],"Elu",a=>`elu_vf32(${a})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Ji=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,iy=e=>{let t=et(e.inputs[0].dataType);e.compute(Ie(e.inputs[0],"Erf",n=>`erf_vf32(${n})`,Ji(t)))},oy=e=>{e.compute(Ie(e.inputs[0],"Exp","exp"))},sy=e=>{e.compute(Ie(e.inputs[0],"Floor","floor"))},ay=e=>{let t=et(e.inputs[0].dataType);e.compute(Ie(e.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Ji(t)))},uy=(e,t)=>{let n=et(e.inputs[0].dataType);e.compute(Ie(e.inputs[0],"LeakyRelu",a=>`select(leaky_relu_alpha_ * ${a}, ${a}, ${a} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},ly=e=>{e.compute(Ie(e.inputs[0],"Not",t=>`!${t}`))},dy=e=>{e.compute(Ie(e.inputs[0],"Neg",t=>`-${t}`))},py=e=>{e.compute(Ie(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},cy=e=>{let t=et(e.inputs[0].dataType);e.compute(Ie(e.inputs[0],"Relu",n=>`select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`))},hy=e=>{e.compute(Ie(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},fy=e=>Ee(e),my=(e,t)=>{let n=et(e.inputs[0].dataType);e.compute(Ie(e.inputs[0],"HardSigmoid",a=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${a} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},gy=e=>{let t=et(e.inputs[0].dataType);e.compute(Ie(e.inputs[0],"HardSwish",n=>`${n} * max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), vec4<${t}>(${t}(1.0 / 6.0)) * ${n} + vec4<${t}>(0.5)))`))},by=e=>{e.compute(Ie(e.inputs[0],"Sin","sin"))},yy=e=>{e.compute(Ie(e.inputs[0],"Sinh","sinh"))},_y=e=>{e.compute(Ie(e.inputs[0],"Sqrt","sqrt"))},wy=e=>{e.compute(Ie(e.inputs[0],"Tan","tan"))},Ca=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,vy=e=>{e.compute(Ie(e.inputs[0],"Tanh",Ca))},za=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Ca("v")};
}
`,Ra=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,xy=e=>{let t=et(e.inputs[0].dataType);e.compute(Ie(e.inputs[0],"FastGelu",Ra,za(t),void 0,e.inputs[0].dataType))},$y=(e,t)=>{let n=et(e.inputs[0].dataType);return e.compute(Ie(e.inputs[0],"ThresholdedRelu",a=>`select(vec4<${n}>(0.0), ${a}, ${a} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},Ty=e=>{e.compute(Ie(e.inputs[0],"Log","log"))},Iy=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Sy=e=>`quick_gelu_impl(${e})`,Oy=(e,t)=>{let n=et(e.inputs[0].dataType);e.compute(Ie(e.inputs[0],"QuickGelu",Sy,Iy(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Ey,Py,Ay,F3=N(()=>{"use strict";ae(),de(),Ba(),Ey=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Py=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=L("input",e[0].dataType,e[0].dims,4),a=L("bias",e[0].dataType,[e[0].dims[2]],4),l=te("output",e[0].dataType,t,4),u=B.size(t)/4,d=Qe(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)}}),getShaderSource:p=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${p.declareVariables(n,a,l)}

  ${Ji(d)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(u)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${l.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Ay=e=>{Ey(e.inputs),e.compute(Py(e.inputs))}}),ky,Dy,Ft,Ny,Cy,zy,Ry,By,My,Fy,jy,Ly,Vy,j3=N(()=>{"use strict";se(),ae(),de(),ky=(e,t,n,a,l,u,d,p,o,r,i,s)=>{let c,h;typeof p=="string"?c=h=(_,I)=>`${p}((${_}),(${I}))`:typeof p=="function"?c=h=p:(c=p.scalar,h=p.vector);let m=te("outputData",i,a.length,4),b=L("aData",o,t.length,4),x=L("bData",r,n.length,4),v;if(l)if(u){let _=B.size(t)===1,I=B.size(n)===1,O=t.length>0&&t[t.length-1]%4===0,E=n.length>0&&n[n.length-1]%4===0;_||I?v=m.setByOffset("global_idx",h(_?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"),I?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"))):v=`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${b.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",h(d||O?b.getByOffset("offsetA / 4u"):`${b.type.value}(${b.getByOffset("offsetA / 4u")}[offsetA % 4u])`,d||E?x.getByOffset("offsetB / 4u"):`${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=m.setByOffset("global_idx",h(b.getByOffset("global_idx"),x.getByOffset("global_idx")));else{if(!u)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let _=(I,O,E="")=>{let A=`aData[indexA${O}][componentA${O}]`,k=`bData[indexB${O}][componentB${O}]`;return`
            let outputIndices${O} = ${m.offsetToIndices(`global_idx * 4u + ${O}u`)};
            let offsetA${O} = ${b.broadcastedIndicesToOffset(`outputIndices${O}`,m)};
            let offsetB${O} = ${x.broadcastedIndicesToOffset(`outputIndices${O}`,m)};
            let indexA${O} = offsetA${O} / 4u;
            let indexB${O} = offsetB${O} / 4u;
            let componentA${O} = offsetA${O} % 4u;
            let componentB${O} = offsetB${O} % 4u;
            ${I}[${O}] = ${E}(${c(A,k)});
          `};i===9?v=`
            var data = vec4<u32>(0);
            ${_("data",0,"u32")}
            ${_("data",1,"u32")}
            ${_("data",2,"u32")}
            ${_("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${_("outputData[global_idx]",0)}
            ${_("outputData[global_idx]",1)}
            ${_("outputData[global_idx]",2)}
            ${_("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(b,x,m)}

        ${s??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},Dy=(e,t,n,a,l,u,d=n.dataType)=>{let p=n.dims.map(Number),o=a.dims.map(Number),r=!B.areEqual(p,o),i=p,s=B.size(p),c=!1,h=!1,m=[r];if(r){let b=yn.calcShape(p,o,!1);if(!b)throw new Error("Can't perform binary op on the given tensors");i=b.slice(),s=B.size(i);let x=B.size(p)===1,v=B.size(o)===1,_=p.length>0&&p[p.length-1]%4===0,I=o.length>0&&o[o.length-1]%4===0;m.push(x),m.push(v),m.push(_),m.push(I);let O=1;for(let E=1;E<i.length;E++){let A=p[p.length-E],k=o[o.length-E];if(A===k)O*=A;else break}O%4===0?(h=!0,c=!0):(x||v||_||I)&&(c=!0)}else c=!0;return m.push(c),{name:e,shaderCache:{hint:t+m.map(b=>b.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:b=>ky(b,p,o,i,c,r,h,l,n.dataType,a.dataType,d,u),getRunData:()=>({outputs:[{dims:i,dataType:d}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:Math.ceil(B.size(i)/4)},...oe(p,o,i)]})}},Ft=(e,t,n,a,l,u)=>{e.compute(Dy(t,l??"",e.inputs[0],e.inputs[1],n,a,u))},Ny=e=>{Ft(e,"Add",(t,n)=>`${t}+${n}`)},Cy=e=>{Ft(e,"Div",(t,n)=>`${t}/${n}`)},zy=e=>{Ft(e,"Equal",{scalar:(t,n)=>`u32(${t}==${n})`,vector:(t,n)=>`vec4<u32>(${t}==${n})`},void 0,void 0,9)},Ry=e=>{Ft(e,"Mul",(t,n)=>`${t}*${n}`)},By=e=>{let t=L("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ft(e,"Pow",{scalar:(n,a)=>`pow_custom(${n},${a})`,vector:(n,a)=>`pow_vector_custom(${n},${a})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},My=e=>{Ft(e,"Sub",(t,n)=>`${t}-${n}`)},Fy=e=>{Ft(e,"Greater",{scalar:(t,n)=>`u32(${t}>${n})`,vector:(t,n)=>`vec4<u32>(${t}>${n})`},void 0,void 0,9)},jy=e=>{Ft(e,"Less",{scalar:(t,n)=>`u32(${t}<${n})`,vector:(t,n)=>`vec4<u32>(${t}<${n})`},void 0,void 0,9)},Ly=e=>{Ft(e,"GreaterOrEqual",{scalar:(t,n)=>`u32(${t}>=${n})`,vector:(t,n)=>`vec4<u32>(${t}>=${n})`},void 0,void 0,9)},Vy=e=>{Ft(e,"LessOrEqual",{scalar:(t,n)=>`u32(${t}<=${n})`,vector:(t,n)=>`vec4<u32>(${t}<=${n})`},void 0,void 0,9)}}),Uy,qy,Gy,Hy,Wy,Ky,L3=N(()=>{"use strict";se(),ae(),He(),de(),Uy=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let n=0,a=e[n],l=a.dataType,u=a.dims.length;e.forEach((d,p)=>{if(p!==n){if(d.dataType!==l)throw new Error("input tensors should be one type");if(d.dims.length!==u)throw new Error("input tensors should have the same shape");d.dims.forEach((o,r)=>{if(r!==t&&o!==a.dims[r])throw new Error("non concat dimensions must match")})}})},qy=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Gy=(e,t)=>{let n=e.length,a=[];for(let l=0;l<n;++l){let u=t.setByOffset("global_idx",e[l].getByIndices("indices"));n===1?a.push(u):l===0?a.push(`if (inputIndex == ${l}u) { ${u} }`):l===n-1?a.push(`else { ${u} }`):a.push(`else if (inputIndex == ${l}) { ${u} }`)}return a.join(`
`)},Hy=(e,t,n,a)=>{let l=B.size(n),u=new Array(e.length),d=new Array(e.length),p=0,o=[],r=[],i=[{type:12,data:l}];for(let b=0;b<e.length;++b)p+=e[b].dims[t],u[b]=p,r.push(e[b].dims.length),d[b]=L(`input${b}`,a,r[b]),o.push("rank"),i.push({type:12,data:u[b]});for(let b=0;b<e.length;++b)i.push(...oe(e[b].dims));i.push(...oe(n));let s=te("output",a,n.length),c=s.indicesGet("indices",t),h=Array.from(Array(u.length).keys()).map(b=>`uniforms.sizeInConcatAxis${b}`).join(","),m=b=>`

  ${(()=>{b.registerUniform("outputSize","u32");for(let x=0;x<e.length;x++)b.registerUniform(`sizeInConcatAxis${x}`,"u32");return b.declareVariables(...d,s)})()}

  ${qy(u.length,h)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${s.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${c});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${u.length}u>(${h});
      ${c} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Gy(d,s)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:i}),getShaderSource:m}},Wy=(e,t)=>{let n=e.inputs,a=n[0].dims,l=B.normalizeAxis(t.axis,a.length);Uy(n,l);let u=a.slice();u[l]=n.reduce((p,o)=>p+(o.dims.length>l?o.dims[l]:0),0);let d=n.filter(p=>B.size(p.dims)>0);e.compute(Hy(d,l,u,n[0].dataType),{inputs:d})},Ky=e=>Ee({axis:e.axis})}),Vr,Ur,qr,Ma,Gr=N(()=>{"use strict";se(),ae(),Vr=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Ur=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},qr=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Ma=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[n,a]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:n,beta:a}}else if(t==="Clip"){let[n,a]=(e==null?void 0:e.activation_params)||[mg,gg];return{activation:t,clipMax:a,clipMin:n}}else if(t==="LeakyRelu"){let[n]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:n}}return{activation:t}}}),nt,Xy,Fa=N(()=>{"use strict";nt=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Xy=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Zy,V3=N(()=>{"use strict";Zy=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),ti,ja,La=N(()=>{"use strict";se(),ae(),de(),Gr(),ti=(e,t,n,a,l)=>{let u=a-n;return`
      ${Array.from({length:n}).map((d,p)=>`
      if (${ne(t.shape,p,t.rank)} != 1) {
        ${t.indicesSet(e,p,ne(l,p+u,a))}
      } else {
        ${t.indicesSet(e,p,0)}
      }`).join("")}
`},ja=(e,t,n,a,l=!1,u)=>{let d=e[0].dims,p=e[1].dims,o=d[d.length-2],r=p[p.length-1],i=d[d.length-1],s=We(r),c=We(i),h=We(o),m=B.size(n)/s/h,b=e.length>2,x=a?a.slice(0,-2):n.slice(0,-2),v=[B.size(x),o,r],_=[{type:12,data:m},{type:12,data:o},{type:12,data:r},{type:12,data:i}];Ur(t,_),_.push(...oe(x,d,p)),b&&_.push(...oe(e[2].dims)),_.push(...oe(v));let I=O=>{let E=Oa("batch_dims",e[0].dataType,x.length),A=L("a",e[0].dataType,d.length,c),k=L("b",e[1].dataType,p.length,s),T=te("output",e[0].dataType,v.length,s),M=Qe(T.type.tensor),F=Vr(t,T.type.value,M),J=[A,k],K="";if(b){let $=l?s:1;J.push(L("bias",e[2].dataType,e[2].dims.length,$)),K=`${l?`value += bias[col / ${$}];`:`value += ${T.type.value}(bias[row + i]);`}`}let C=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];qr(t,C);let R=()=>{let $=`var a_data: ${A.type.value};`;for(let z=0;z<c;z++)$+=`
              let b_data${z} = b[(b_offset + (k + ${z}) * uniforms.N + col) / ${s}];`;for(let z=0;z<h;z++){$+=`a_data = a[(a_offset + (row + ${z}) * uniforms.K + k) / ${c}];`;for(let G=0;G<c;G++)$+=`
            values[${z}] = fma(${k.type.value}(a_data${c===1?"":`[${G}]`}), b_data${G}, values[${z}]);
`}return $};return`
  ${O.registerUniforms(C).registerInternalVariables(E).declareVariables(...J,T)}
  ${O.mainStart()}
    ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${s})) * ${s};
    var index1 = global_idx / (uniforms.N / ${s});
    let stride1 = uniforms.M / ${h};
    let row = (index1 % stride1) * ${h};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${E.offsetToIndices("batch")};`}

    var a_indices: ${A.type.indices};
    ${ti("a_indices",A,A.rank-2,E.rank,"batch_indices")}
    ${A.indicesSet("a_indices",A.rank-2,0)}
    ${A.indicesSet("a_indices",A.rank-1,0)}
    let a_offset = ${A.indicesToOffset("a_indices")};

    var b_indices: ${k.type.indices};
    ${ti("b_indices",k,k.rank-2,E.rank,"batch_indices")}
    ${k.indicesSet("b_indices",k.rank-2,0)}
    ${k.indicesSet("b_indices",k.rank-1,0)}
    let b_offset = ${k.indicesToOffset("b_indices")};
    var values: array<${T.type.value}, ${h}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${c}) {
      ${R()}
    }
    for (var i = 0u; i < ${h}u; i++) {
      var value = values[i];
      ${K}
      ${F}
      let cur_indices = ${T.type.indices}(batch, row + i, col);
      let offset = ${T.indicesToOffset("cur_indices")};
      ${T.setByOffset(`offset / ${s}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${s};${c};${h};${l}`,inputDependencies:b?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:u?u(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:_}),getShaderSource:I}}}),Jy,Yy,Va,Ua,Qy,qa,e0,Yi,Ga=N(()=>{"use strict";se(),ae(),de(),Gr(),La(),Fa(),Jy=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Yy=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Va=(e,t,n="f32",a,l=!1,u=32,d=!1,p=32)=>{let o=t[1]*e[1],r=t[0]*e[0],i=l?o:u,s=l?u:o,c=i/t[0],h=u/t[1];if(!((l&&c===4&&e[1]===4||!l&&(c===3||c===4))&&i%t[0]===0&&u%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${l} is true, innerElementSize ${c} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${c} must be 3 or 4.
  tileAWidth ${i} must be divisible by workgroupSize[0]${t[0]}. tileInner ${u} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${c}<${n}>, ${i/c}>, ${s}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${r/e[0]}>, ${u}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${c};
const tileInner = ${u};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${d?"0":"i32(globalId.z)"};
  ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${o};

  let num_tiles = ${d?`${Math.ceil(p/u)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${d?`i32(globalId.z) * ${p}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${h};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Jy(l,a)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${a?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${c===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Yy(l,c)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Ua=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Qy=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",qa=(e,t,n="f32",a,l=!1,u=32,d=!1,p=32,o=!1)=>{let r=e[1]*t[1],i=e[0]*t[0],s=l?r:u,c=l?u:r;if(!(c%t[1]===0&&s%t[0]===0&&u%t[1]===0))throw new Error(`tileAHight ${c} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${s} must be divisible by workgroupSize[0]${t[0]}, tileInner ${u} must be divisible by workgroupSize[1]${t[1]}`);let h=c/t[1],m=s/t[0],b=u/t[1],x=o?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${r};
    let globalColStart = i32(workgroupId.x) * ${i};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${c}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${s}; inputCol = inputCol + ${t[0]}) {
          ${Ua(l,a)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${u}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${i}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${a?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${l?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${r};

let tileRowA = i32(localId.y) * ${h};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${b};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Ua(l,a)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${a?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${n}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Qy(l)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${n}, ${s}>, ${c}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${i}>, ${u}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${u};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${d?"0":"i32(globalId.z)"};
    ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${d?`${Math.ceil(p/u)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${d?`i32(globalId.z) * ${p}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${x}
  }
`},e0=(e,t,n,a,l=!1)=>{let[u,d,p,o]=a,r=Qe(a[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${u.type.indices}) -> ${nt(e,r)} {
      var value = ${nt(e,r)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${d.type.indices};
        ${ti("aIndices",d,d.rank-2,u.rank,"batchIndices")}
        ${d.indicesSet("aIndices",d.rank-2,"u32(row)")}
        ${d.indicesSet("aIndices",d.rank-1,"u32(colIn)")}
        value = ${d.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${u.type.indices}) -> ${nt(e,r)} {
      var value = ${nt(e,r)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${p.type.indices};
        ${ti("bIndices",p,p.rank-2,u.rank,"batchIndices")}
        ${p.indicesSet("bIndices",p.rank-2,"u32(row)")}
        ${p.indicesSet("bIndices",p.rank-1,"u32(colIn)")}
        value = ${p.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${nt(e,r)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${l?"bias[colIn]":`${nt(e,r)}(bias[row])`};`:""}
        ${n}
        ${o.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Yi=(e,t,n,a,l=!1,u)=>{let d=e[0].dims,p=e[1].dims,o=d.slice(0,-2),r=p.slice(0,-2),i=a?a.slice(0,-2):n.slice(0,-2),s=B.size(i),c=d[d.length-2],h=d[d.length-1],m=p[p.length-1],b=h%4===0&&m%4===0,x=c<=8?[4,1,1]:[4,4,1],v=[8,8,1],_=[Math.ceil(m/v[0]/x[0]),Math.ceil(c/v[1]/x[1]),Math.ceil(s/v[2]/x[2])],I=b?4:1,O=[...o,c,h/I],E=O.length,A=[...r,h,m/I],k=A.length,T=[s,c,m/I],M=[{type:6,data:c},{type:6,data:m},{type:6,data:h}];Ur(t,M),M.push(...oe(i,O,A));let F=["rank","rank"],J=e.length>2;J&&(M.push(...oe(e[2].dims)),F.push("rank")),M.push(...oe(T));let K=C=>{let R=i.length,$=Oa("batchDims",e[0].dataType,R,1),z=Qe(e[0].dataType),G=L("a",e[0].dataType,E,I),re=L("b",e[1].dataType,k,I),V=te("result",e[0].dataType,T.length,I),ee=[G,re];if(J){let le=l?I:1;ee.push(L("bias",e[2].dataType,e[2].dims.length,le))}let U=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];qr(t,U);let W=Qe(V.type.tensor),X=Vr(t,V.type.value,W),q=e0(I,J,X,[$,G,re,V],l);return`
  ${C.registerUniforms(U).registerInternalVariables($).declareVariables(...ee,V)}
  ${q}
  ${b?Va(x,v,z,$):qa(x,v,z,$)}
                   `};return{name:"MatMul",shaderCache:{hint:`${x};${t.activation};${b};${l}`,inputDependencies:F},getRunData:()=>({outputs:[{dims:u?u(n):n,dataType:e[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:M}),getShaderSource:K}}}),t0,r0,U3=N(()=>{"use strict";se(),Yt(),de(),Gr(),Fa(),V3(),Ga(),t0=(e,t,n,a,l=!1,u,d=4,p=4,o=4,r="f32")=>{let i=M=>{switch(M){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${r}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${M} is not supported.`)}},s=M=>{switch(M){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${M} is not supported.`)}},c=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,h=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,m=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",b=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",x=e?"row":"col",v=e?"col":"row",_=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${x} / outWidth;
    let outCol = ${x} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${nt(d,r)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${b}) {
      ${c}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${i(d)}
    }
    return resData;`,I=e?t&&a?`
    let col = colIn * ${d};
    ${_}`:`
    let col = colIn * ${d};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${_}
    }
    return ${nt(d,r)}(0.0);`:a&&n?`
    let col = colIn * ${d};
    ${_}`:`
    let col = colIn * ${d};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${_}
    }
    return ${nt(d,r)}(0.0);`,O=e?a&&n?s(p):`
    let col = colIn * ${p};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${s(p)}
    }
    return ${nt(p,r)}(0.0);`:`
    let col = colIn * ${p};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${s(p)}
    }
    return ${nt(p,r)}(0.0);`,E=nt(o,r),A=nt(e?d:p,r),k=nt(e?p:d,r),T=Vr(u,E,r);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?I:O}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${k} {
      ${e?O:I}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${E}) {
      let col = colIn * ${o};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${h}
      ${Xy(l)}
      ${T}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},r0=(e,t,n,a,l,u,d,p,o)=>{let r=t.format==="NHWC",i=r?e[0].dims[3]:e[0].dims[1],s=n[0],c=r?n[2]:n[3],h=r?n[1]:n[2],m=r?n[3]:n[1],b=r&&(i%4===0||i%3===0)&&m%4===0,x=r?m:c*h,v=r?c*h:m,_=[8,8,1],I=a<=8?[4,1,1]:[4,4,1],O=[Math.ceil(x/_[0]/I[0]),Math.ceil(v/_[1]/I[1]),Math.ceil(s/_[2]/I[2])];$e("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${O}`);let E=b?r&&i%4!==0?3:4:1,A=_[1]*I[1],k=_[0]*I[0],T=Math.max(_[0]*E,_[1]),M=a%A===0,F=l%k===0,J=u%T===0,K=b?[E,4,4]:[1,1,1],C=[{type:6,data:a},{type:6,data:l},{type:6,data:u},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Ur(t,C),C.push(...oe(e[0].dims,e[1].dims));let R=["rank","rank"];d&&(C.push(...oe(e[2].dims)),R.push("rank")),C.push(...oe(n));let $=z=>{let G=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];qr(t,G);let re=b?4:1,V=Qe(e[0].dataType),ee=`
      fn setOutputAtIndex(flatIndex : i32, value : ${b?`vec4<${V}>`:V}) {
        result[flatIndex] = ${b?`vec4<${V}>`:V}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${b?`vec4<${V}>`:V}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${b?"/ 4":""}, value);
      }`,U=L("x",e[0].dataType,e[0].dims.length,E===3?1:E),W=L("w",e[1].dataType,e[1].dims.length,re),X=[U,W],q=te("result",e[0].dataType,n.length,re);if(d){let le=L("bias",e[2].dataType,e[2].dims.length,re);X.push(le),ee+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${b?`vec4<${V}>`:V} {
          return bias[coords.${r?"w":"y"}${b?"/ 4":""}];
        }`}return`
        ${Zy("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${z.registerUniforms(G).declareVariables(...X,q)}
        ${ee}
        ${t0(r,M,F,J,d,t,K[0],K[1],K[2],V)}
        ${b?Va(I,_,V,void 0,!r,T):qa(I,_,V,void 0,!r,T,!1,void 0,p)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${E};${b};${M};${F};${J};${A};${k};${T}`,inputDependencies:R},getRunData:()=>({outputs:[{dims:o?o(n):n,dataType:e[0].dataType}],dispatchGroup:{x:O[0],y:O[1],z:O[2]},programUniforms:C}),getShaderSource:$}}}),n0,Ha,ri,i0,Wa,o0,s0,a0,q3=N(()=>{"use strict";se(),Yt(),ae(),de(),Gr(),Fa(),n0=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},Ha=e=>typeof e=="number"?[e,e,e]:e,ri=(e,t)=>t<=1?e:e+(e-1)*(t-1),i0=(e,t,n,a=1)=>{let l=ri(t,a);return Math.floor((e[0]*(n-1)-n+l)/2)},Wa=(e,t,n,a,l)=>{l==null&&(l=i0(e,t[0],a[0]));let u=[0,0,0,n];for(let d=0;d<3;d++)e[d]+2*l>=t[d]&&(u[d]=Math.trunc((e[d]-t[d]+2*l)/a[d]+1));return u},o0=(e,t,n,a,l,u,d,p,o,r)=>{let i,s,c,h;if(e==="VALID"&&(e=0),typeof e=="number"){i={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=Wa([t,n,a,1],[p,o,r],1,[l,u,d],e);s=m[0],c=m[1],h=m[2]}else if(Array.isArray(e)){if(!e.every((b,x,v)=>b===v[0]))throw Error(`Unsupported padding parameter: ${e}`);i={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=Wa([t,n,a,1],[p,o,r],1,[l,u,d],e[0]);s=m[0],c=m[1],h=m[2]}else if(e==="SAME_UPPER"){s=Math.ceil(t/l),c=Math.ceil(n/u),h=Math.ceil(a/d);let m=(s-1)*l+p-t,b=(c-1)*u+o-n,x=(h-1)*d+r-a,v=Math.floor(m/2),_=m-v,I=Math.floor(b/2),O=b-I,E=Math.floor(x/2),A=x-E;i={top:I,bottom:O,left:E,right:A,front:v,back:_}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:i,outDepth:s,outHeight:c,outWidth:h}},s0=(e,t,n,a,l,u=!1,d="channelsLast")=>{let p,o,r,i,s;if(d==="channelsLast")[p,o,r,i,s]=e;else if(d==="channelsFirst")[p,s,o,r,i]=e;else throw new Error(`Unknown dataFormat ${d}`);let[c,,h,m,b]=t,[x,v,_]=Ha(n),[I,O,E]=Ha(a),A=ri(h,I),k=ri(m,O),T=ri(b,E),{padInfo:M,outDepth:F,outHeight:J,outWidth:K}=o0(l,o,r,i,x,v,_,A,k,T),C=u?c*s:c,R=[0,0,0,0,0];return d==="channelsFirst"?R=[p,C,F,J,K]:d==="channelsLast"&&(R=[p,F,J,K,C]),{batchSize:p,dataFormat:d,inDepth:o,inHeight:r,inWidth:i,inChannels:s,outDepth:F,outHeight:J,outWidth:K,outChannels:C,padInfo:M,strideDepth:x,strideHeight:v,strideWidth:_,filterDepth:h,filterHeight:m,filterWidth:b,effectiveFilterDepth:A,effectiveFilterHeight:k,effectiveFilterWidth:T,dilationDepth:I,dilationHeight:O,dilationWidth:E,inShape:e,outShape:R,filterShape:t}},a0=(e,t,n,a,l,u)=>{let d=u==="channelsLast",p=d?e[0].dims[3]:e[0].dims[1],o=!1,r=[64,1,1],i={x:n.map((_,I)=>I)},s=[Math.ceil(n0(i.x.map(_=>n[_]))/r[0]),1,1];$e("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${s}`);let c=o?d&&p%4!==0?3:4:1,h=B.size(n),m=[{type:12,data:h},{type:12,data:a},{type:12,data:l},{type:12,data:t.strides},{type:12,data:t.dilations}];Ur(t,m),m.push(...oe(e[0].dims,e[1].dims));let b=["rank","rank"],x=e.length===3;x&&(m.push(...oe(e[2].dims)),b.push("rank")),m.push(...oe(n));let v=_=>{let I=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:a.length},{name:"pads",type:"u32",length:l.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];qr(t,I);let O=o?4:1,E=Qe(e[0].dataType),A=L("x",e[0].dataType,e[0].dims.length,c===3?1:c),k=L("W",e[1].dataType,e[1].dims.length,O),T=[A,k],M=te("result",e[0].dataType,n.length,O),F="";if(x){let C=L("bias",e[2].dataType,e[2].dims.length,O);T.push(C),F+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${o?`vec4<${E}>`:E} {
          return bias[${d?ne("coords",4,5):ne("coords",1,5)}${o?"/ 4":""}];
        }`}let J=nt(c,E),K=Vr(t,J,E);return`
            ${F}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${A.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${k.getByIndices("aIndices")};
            }
          ${_.registerUniforms(I).declareVariables(...T,M)}
          ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${M.offsetToIndices("global_idx")};
              let batch = ${ne("coords",0,A.rank)};
              let d2 = ${d?ne("coords",A.rank-1,A.rank):ne("coords",1,A.rank)};
              let xFRCCorner = vec3<u32>(${d?ne("coords",1,A.rank):ne("coords",2,A.rank)},
              ${d?ne("coords",2,A.rank):ne("coords",3,A.rank)},
              ${d?ne("coords",3,A.rank):ne("coords",4,A.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${d?ne("uniforms.x_shape",1,A.rank):ne("uniforms.x_shape",2,A.rank)};
              let xShapeZ = ${d?ne("uniforms.x_shape",2,A.rank):ne("uniforms.x_shape",3,A.rank)};
              let xShapeW = ${d?ne("uniforms.x_shape",3,A.rank):ne("uniforms.x_shape",4,A.rank)};
              let xShapeU = ${d?ne("uniforms.x_shape",4,A.rank):ne("uniforms.x_shape",1,A.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${d?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${d?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${d?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${d?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${x?"value = value + getBiasByOutputCoords(coords)":""};
              ${K}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${d};${c};${x}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:s[0],y:s[1],z:s[2]},programUniforms:m}),getShaderSource:v}}}),u0,l0,G3=N(()=>{"use strict";se(),ae(),de(),Gr(),u0=(e,t,n,a)=>{let l=e.length>2,u=l?"value += b[output_channel];":"",d=e[0].dims,p=e[1].dims,o=t.format==="NHWC",r=o?n[3]:n[1],i=r/t.group,s=o&&i>=4?We(r):1,c=B.size(n)/s,h=[{type:12,data:c},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:i}];Ur(t,h),h.push(...oe(d,[p[0],p[1],p[2],p[3]/s]));let m=l?["rank","rank","rank"]:["rank","rank"];h.push(...oe([n[0],n[1],n[2],n[3]/s]));let b=x=>{let v=te("output",e[0].dataType,n.length,s),_=Qe(v.type.tensor),I=Vr(t,v.type.value,_),O=L("x",e[0].dataType,d.length),E=L("w",e[1].dataType,p.length,s),A=[O,E];l&&A.push(L("b",e[2].dataType,e[2].dims,s));let k=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];qr(t,k);let T=o?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${O.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${E.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${O.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${E.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${x.registerUniforms(k).declareVariables(...A,v)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${o?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${o?1:2}], outputIndices[${o?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${s} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${o?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${T}
    ${u}
    ${I}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${s}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:b}},l0=(e,t,n,a)=>{let l=e.length>2,u=We(n[3]),d=We(n[2]),p=B.size(n)/u/d,o=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/u],r=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/u],i=[n[0],n[1],n[2],n[3]/u],s=[{type:12,data:p},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Ur(t,s),s.push(...oe(o,r,i));let c=(d-1)*t.strides[1]+r[1],h=m=>{let b=te("output",e[0].dataType,i.length,u),x=Qe(b.type.tensor),v=Vr(t,b.type.value,x),_=L("x",e[0].dataType,o.length,u),I=L("w",e[1].dataType,r.length,u),O=[_,I];l&&O.push(L("b",e[2].dataType,e[2].dims,u));let E=l?"value += b[output_channel];":"",A=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return qr(t,A),`
  ${m.registerUniforms(A).declareVariables(...O,b)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${d}u;
    let col = (index1 % width1) * ${d}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${_.type.value}, ${c}>;
    var values: array<${b.type.value}, ${d}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${r[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${c}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${_.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${_.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${r[1]}; w_width++) {
          let w_val = ${I.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${d}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${d}u; i++) {
      var value = values[i];
      ${E}
      ${v}
      ${b.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${u};${d};${c};${r[0]};${r[1]}`,inputDependencies:l?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:s}),getShaderSource:h}}}),d0,Qi,p0,eo,Ka,Xa,c0,h0,Za,H3=N(()=>{"use strict";ae(),U3(),q3(),Ga(),G3(),Gr(),La(),lr(),d0=(e,t,n,a,l,u)=>{let d=e[0],p=e.slice(u?1:2,u?3:4),o=p.length,r=t[0],i=t.slice(2).map((c,h)=>c+(c-1)*(n[h]-1)),s=p.map((c,h)=>c+a[h]+a[h+o]).map((c,h)=>Math.floor((c-i[h]+l[h])/l[h]));return s.splice(0,0,d),s.splice(u?3:1,0,r),s},Qi=[2,3,1,0],p0=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],a=e[1].dims[1]*t.group;if(n!==a)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let l=e[0].dims.length-2;if(t.dilations.length!==l)throw new Error(`dilations should be ${l}D`);if(t.strides.length!==l)throw new Error(`strides should be ${l}D`);if(t.pads.length!==l*2)throw new Error(`pads should be ${l*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},eo=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let u=2;u<t[1].dims.length;++u)n[u-2]===0&&(n[u-2]=t[1].dims[u]);let a=e.pads.slice();Gi.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,a,e.format==="NHWC",e.autoPad);let l=Object.assign({},e);return Object.assign(l,{kernelShape:n,pads:a}),l},Ka=e=>{let t=Ma(e),n=e.format,a=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],l=e.dilations,u=e.group,d=e.kernel_shape,p=e.pads,o=e.strides,r=e.w_is_const();return{autoPad:a,format:n,dilations:l,group:u,kernelShape:d,pads:p,strides:o,wIsConst:r,...t,cacheKey:`${e.format};${t.activation};`}},Xa=(e,t,n,a)=>{let l=n.format==="NHWC",u=d0(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,l);if(n.group!==1){let A=[t[0]];if(l){let k=e.kernelCustomData.wT??e.compute(_t(t[1],Qi),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=k),A.push(k)}else A.push(t[1]);t.length===3&&A.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&l&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(l0(A,n,u,a),{inputs:A}):e.compute(u0(A,n,u,a),{inputs:A});return}let d=t.length===3,p=t[0].dims[l?1:2],o=t[0].dims[l?2:3],r=t[0].dims[l?3:1],i=t[1].dims[2],s=t[1].dims[3],c=u[l?1:2],h=u[l?2:3],m=u[l?3:1],b=l&&i===p&&s===o&&n.pads[0]===0&&n.pads[1]===0;if(b||i===1&&s===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let A=u[0],k,T,M,F=[];if(l){let C=e.kernelCustomData.wT??e.compute(_t(t[1],Qi),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=C),b){let R=p*o*r;k=t[0].reshape([1,A,R]),T=C.reshape([1,R,m]),M=[1,A,m]}else k=t[0].reshape([A,p*o,r]),T=C.reshape([1,r,m]),M=[A,c*h,m];F.push(k),F.push(T)}else k=t[0].reshape([A,r,p*o]),T=t[1].reshape([1,m,r]),M=[A,m,c*h],F.push(T),F.push(k);d&&F.push(t[2]);let J=M[2],K=F[0].dims[F[0].dims.length-1];J<8&&K<8?e.compute(ja(F,n,u,M,l,a),{inputs:F}):e.compute(Yi(F,n,u,M,l,a),{inputs:F});return}let x=!0,v=e.kernelCustomData.wT??e.compute(_t(t[1],Qi),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let _=[t[0],v];d&&_.push(t[2]);let I=l?c*h:m,O=l?m:c*h,E=i*s*r;e.compute(r0(_,n,u,I,O,E,d,x,a),{inputs:_})},c0=(e,t)=>{let n=t.format==="NHWC",a=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&a.push(e.inputs[2]);let l=[0,t.pads[0],0,t.pads[1]],u=[1].concat(t.strides),d=[1].concat(t.dilations),p=[1].concat(t.kernelShape),o=eo({...t,pads:l,strides:u,dilations:d,kernelShape:p},a);Xa(e,a,o,r=>n?[r[0],r[2],r[3]]:[r[0],r[1],r[3]])},h0=(e,t,n)=>{let a=n.format==="NHWC"?"channelsLast":"channelsFirst",l=eo(n,t),u=n.autoPad==="NOTSET"?n.pads:n.autoPad,d=s0(t[0].dims,t[1].dims,n.strides,n.dilations,u,!1,a);e.compute(a0(t,l,d.outShape,[d.filterDepth,d.filterHeight,d.filterWidth],[d.padInfo.front,d.padInfo.top,d.padInfo.left],a))},Za=(e,t)=>{if(p0(e.inputs,t),e.inputs[0].dims.length===3)c0(e,t);else if(e.inputs[0].dims.length===5)h0(e,e.inputs,t);else{let n=eo(t,e.inputs);Xa(e,e.inputs,n)}}}),f0,W3=N(()=>{"use strict";se(),Yt(),ae(),de(),f0=(e,t,n)=>{let a=e.length>2,l=t.outputShape,u=t.format==="NHWC",d=t.group,p=e[1].dims,o=p[2]/d,r=p[3],i=u?We(o):1,s=u&&r===1&&o>=4,c=s?Math.floor(o/4)*4:Math.floor(o/i)*i,h=o-c,m=u?We(r):1,b=u?r===1?i:m:1,x=B.size(l)/m,v=[Math.ceil(x/64),1,1];$e("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${v}`);let _=["rank","rank"],I=[t.strides[0],t.strides[1]],O=[t.kernelShape[u?1:2],t.kernelShape[u?2:3]],E=[t.dilations[0],t.dilations[1]],A=[O[0]+(t.dilations[0]<=1?0:(t.kernelShape[u?1:2]-1)*(t.dilations[0]-1)),O[1]+(t.dilations[1]<=1?0:(t.kernelShape[u?2:3]-1)*(t.dilations[1]-1))],k=[A[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),A[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],T=[{type:12,data:x},{type:12,data:I},{type:12,data:O},{type:12,data:E},{type:12,data:A},{type:6,data:k},{type:12,data:c},{type:12,data:o},{type:12,data:r},...oe(e[0].dims,e[1].dims)];a&&(T.push(...oe(e[2].dims)),_.push("rank")),T.push(...oe(l));let M=F=>{let J=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:I.length},{name:"filter_dims",type:"u32",length:O.length},{name:"dilations",type:"u32",length:O.length},{name:"effective_filter_dims",type:"u32",length:A.length},{name:"pads",type:"i32",length:k.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],K=Qe(e[0].dataType),C=u?1:2,R=u?2:3,$=u?3:1,z=L("W",e[1].dataType,e[1].dims.length,b),G=L("Dy",e[0].dataType,e[0].dims.length,i),re=[G,z];a&&re.push(L("bias",e[2].dataType,[l[$]].length,m));let V=te("result",e[0].dataType,l.length,m),ee=()=>{let X="";if(s)i===4?X+=`
        let xValue = ${G.getByOffset("x_offset")};
        let wValue = ${z.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:i===2?X+=`
          dotProd = dotProd + dot(vec4<${K}>(${G.getByOffset("x_offset")}, ${G.getByOffset("x_offset + 1u")}), vec4<${K}>(${z.getByOffset("w_offset")}, ${z.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:i===1&&(X+=`
          dotProd = dotProd + dot(vec4<${K}>(${G.getByOffset("x_offset")}, ${G.getByOffset("x_offset + 1u")}, ${G.getByOffset("x_offset + 2u")}, ${G.getByOffset("x_offset + 3u")}), vec4<${K}>(${z.getByOffset("w_offset")}, ${z.getByOffset("w_offset + 1u")}, ${z.getByOffset("w_offset + 2u")}, ${z.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(X+=`
                  let xValue = ${u?G.getByOffset(`${G.indicesToOffset(`${G.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${i}`):G.get("batch","inputChannel","idyR","idyC")};
        `,i===1)X+=`
          let w_offset = ${z.indicesToOffset(`${z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${z.getByOffset(`w_offset / ${b}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let q=0;q<i;q++)X+=`
            let wValue${q} = ${z.getByOffset(`${z.indicesToOffset(`${z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${q}, wOutChannel)`)} / ${b}`)};
            dotProd = dotProd + xValue[${q}] * wValue${q};`;return X},U=()=>{if(h===0)return"";if(!s)throw new Error(`packInputAs4 ${s} is not true.`);let X="";if(i===1){X+="dotProd = dotProd";for(let q=0;q<h;q++)X+=`
            + ${G.getByOffset(`x_offset + ${q}`)} * ${z.getByOffset(`w_offset + ${q}`)}`;X+=";"}else if(i===2){if(h!==2)throw new Error(`Invalid inputChannelsRemainder ${h}.`);X+=`
          let xValue = ${G.getByOffset("x_offset")};
          let wValue = ${z.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return X},W=`
            let outputIndices = ${V.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${V.indicesGet("outputIndices",0)};
            let d1 = ${V.indicesGet("outputIndices",$)};
            let r = ${V.indicesGet("outputIndices",C)};
            let c = ${V.indicesGet("outputIndices",R)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${V.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${K}(dyRCorner) + ${K}(wR)) / ${K}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${K}(uniforms.Dy_shape[${C}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${K}(dyCCorner) + ${K}(wC)) / ${K}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${K}(uniforms.Dy_shape[${R}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${s?`
                var x_offset = ${G.indicesToOffset(`${G.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${i};
                var w_offset = ${z.indicesToOffset(`${z.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${b};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${s?4:i}) {
                  ${ee()}
                  inputChannel = inputChannel + ${s?4:i};
                }
                ${U()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${a?` + bias[d1 / ${m}]`:""};
            ${V.setByOffset("global_idx","value")};
          `;return`
    ${F.registerUniforms(J).declareVariables(...re,V)}
      ${F.mainStart()}
      ${F.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${W}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${i}${b}${m}${s}${h}`,inputDependencies:_},getRunData:()=>({dispatchGroup:{x:v[0],y:v[1],z:v[2]},outputs:[{dims:n?n(l):l,dataType:e[0].dataType}],programUniforms:T}),getShaderSource:M}}}),m0,g0,b0,Ja,y0,_0,Ya,w0,v0,K3=N(()=>{"use strict";W3(),Gr(),lr(),m0=(e,t,n,a,l,u)=>(e-1)*t+n+(a-1)*l+1-u,g0=(e,t,n,a,l)=>{let u=Math.floor(e/2);t==="SAME_UPPER"?(n[a]=u,n[l]=e-u):t==="SAME_LOWER"&&(n[a]=e-u,n[l]=u)},b0=(e,t,n,a,l,u,d,p,o,r)=>{let i=e.length-2,s=r.length===0;o.length<i&&o.push(...Array(i-o.length).fill(0));let c=e[0],h=t[p?3:1]*l;for(let m=0,b=e.length-i-(p?1:0);m<i;++m,++b){let x=e[b],v=s?x*d[m]:r[m],_=m0(x,d[m],u[m],t[b],n[m],v);g0(_,a,u,m,m+i),s&&r.push(d[m]*(x-1)+o[m]+(t[b]-1)*n[m]+1-u[m]-u[m+i])}r.splice(0,0,c),r.splice(p?3:1,0,h)},Ja=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((s,c)=>s*c,1)===0){n.length=0;for(let s=2;s<t[1].dims.length;++s)n.push(t[1].dims[s])}let a=e.format==="NHWC";n.splice(0,0,t[1].dims[0]),n.splice(a?3:1,0,t[1].dims[1]);let l=e.pads.slice(),u=e.outputShape.slice(),d=e.outputPadding.slice(),p=t[0].dims,o=e.dilations.slice();if(o.reduce((s,c)=>s+c,0)===0){let s=t[0].dims.length-2;o=new Array(s).fill(1)}let r=e.strides.slice();if(r.reduce((s,c)=>s+c,0)===0){let s=t[0].dims.length-2;r=new Array(s).fill(1)}b0(p,n,o,e.autoPad,e.group,l,r,a,d,u);let i=Object.assign({},e);return Object.assign(i,{kernelShape:n,pads:l,outputPadding:d,outputShape:u,dilations:o,strides:r}),i},y0=e=>{let t=Ma(e),n=e.format,a=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],l=e.dilations,u=e.group??1,d=e.kernelShape,p=e.pads,o=e.strides,r=e.wIsConst(),i=e.outputPadding,s=e.outputShape;return{autoPad:a,format:n,dilations:l,group:u,kernelShape:d,outputPadding:i,outputShape:s,pads:p,strides:o,wIsConst:r,...t,cacheKey:`${e.format};${t.activation};`}},_0=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],a=e[1].dims[0];if(n!==a)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let l=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==l))throw new Error("invalid bias");let u=e[0].dims.length-2;if(t.dilations.reduce((d,p)=>d+p,0)>0&&t.dilations.length!==u)throw new Error(`dilations should be ${u}D`);if(t.strides.reduce((d,p)=>d+p,0)>0&&t.strides.length!==u)throw new Error(`strides should be ${u}D`);if(t.pads.reduce((d,p)=>d+p,0)>0&&t.pads.length!==u*2)throw new Error(`pads should be ${u*2}D`);if(t.outputPadding.length!==u&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${u}D`);if(t.kernelShape.reduce((d,p)=>d+p,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Ya=(e,t,n,a)=>{let l=e.kernelCustomData.wT??e.compute(_t(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=l);let u=[t[0],l];t.length===3&&u.push(t[2]),e.compute(f0(u,n,a),{inputs:u})},w0=(e,t)=>{let n=t.format==="NHWC",a=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&a.push(e.inputs[2]);let l=t.kernelShape;(l.length===0||l[0]===0)&&(l=[e.inputs[1].dims[2]]);let u=t.dilations;(u.length===0||u[0]===0)&&(u=[1]);let d=t.strides;(d.length===0||d[0]===0)&&(d=[1]);let p=t.pads;p.length===0&&(p=[0,0]),p=[0,p[0],0,p[1]],d=[1].concat(d),u=[1].concat(u),l=[1].concat(l);let o=t.outputPadding;o=[0].concat(o);let r=Ja({...t,pads:p,strides:d,dilations:u,kernelShape:l,outputPadding:o},a);Ya(e,a,r,i=>n?[i[0],i[2],i[3]]:[i[0],i[1],i[3]])},v0=(e,t)=>{if(_0(e.inputs,t),e.inputs[0].dims.length===3)w0(e,t);else{let n=Ja(t,e.inputs);Ya(e,e.inputs,n)}}}),x0,$0,T0,X3=N(()=>{"use strict";se(),ae(),He(),de(),x0=(e,t,n,a)=>{let l=B.size(t),u=t.length,d=L("input",e,u),p=te("output",e,u),o=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),r=B.normalizeAxis(o,u),i=s=>{let c=` i32(${d.indicesGet("inputIndices","uniforms.axis")}) `,h=ne("uniforms.input_shape","uniforms.axis",u),m=a.reverse?c+(a.exclusive?" + 1":""):"0",b=a.reverse?h:c+(a.exclusive?"":" + 1");return`
                ${s.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(d,p)}
                ${s.mainStart()}
                  ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${p.offsetToIndices("global_idx")};
                  var sum = ${p.type.value}(0);
                  let first : i32 = ${m};
                  let last : i32 = ${b};
                  for (var i : i32 = first; i < last; i++) {
                    ${d.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${d.getByIndices("inputIndices")};
                  }
                  ${p.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:a.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:[{type:12,data:l},{type:12,data:r},...oe(t,t)]}),getShaderSource:i}},$0=(e,t)=>{let n=e.inputs[0].dims,a=e.inputs[0].dataType,l=e.inputs[1];e.compute(x0(a,n,l,t),{inputs:[0]})},T0=e=>{let t=e.exclusive===1,n=e.reverse===1;return Ee({exclusive:t,reverse:n})}}),I0,S0,O0,E0,P0,Z3=N(()=>{"use strict";se(),ae(),He(),de(),I0=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},S0=(e,t,n,a)=>{let l=[];l.push(`fn perm(i: ${a.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let u=0;u<t;++u)l.push(n.indicesSet("a",e[u],`i[${u}]`));return l.push("return a;}"),l.join(`
`)},O0=(e,t)=>{let n,a,l,u,d,p,o=t.format==="NHWC",r=t.blocksize,i=t.mode==="DCR";o?([n,a,l,u]=e.dims,d=i?[n,a,l,r,r,u/r**2]:[n,a,l,u/r**2,r,r],p=i?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,a,l,u]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],d=i?[n,r,r,u/r**2,a,l]:[n,u/r**2,r,r,a,l],p=i?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let s=e.reshape(d),c=s.dims.length,h=e.dataType,m=L("a",h,c),b=te("output",h,c),x=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(m,b)}

  ${S0(p,c,m,b)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let _=o?[n,a*r,l*r,u/r**2]:[n,u/r**2,a*r,l*r],I=B.size(_),O=s.dims,E=B.sortBasedOnPerm(O,p);return{outputs:[{dims:_,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:[{type:12,data:I},...oe(O,E)]}},getShaderSource:x}},E0=(e,t)=>{I0(e.inputs),e.compute(O0(e.inputs[0],t))},P0=e=>Ee({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Qt,ni,to,Qa,dr,A0,k0,D0,eu,tu,ru,N0,C0,nu,z0,R0,B0,J3=N(()=>{"use strict";se(),ae(),He(),de(),Qt=256,ni=512,to=2*Math.PI,Qa=e=>{let t=[],n=e;for(let a of[4,2,3,5])for(;n%a===0;)t.push(a),n/=a;return n===1?t:void 0},dr=e=>{let t=e.toPrecision(9);return/[.eE]/.test(t)?t:`${t}.0`},A0=(e,t,n,a,l)=>{let u=n/e,d=ni-a,p=r=>`smem[${d}u + base + ${r*t}u]`,o=`  for (var t = local_idx; t < ${u}u; t += ${Qt}u) {
`;o+=`    let twiddleIndex = t % ${t}u;
    let angleUnit = f32(twiddleIndex);
`,o+=`    var leg: array<vec2<f32>, 5>;
`;for(let r=0;r<e;r++){let i=`${a}u + t + ${r*u}u`;if(r===0)o+=`    leg[0] = smem[${i}];
`;else{let s=l*to*r/(e*t);o+=`    { let a = ${dr(s)} * angleUnit; leg[${r}] = cmul(smem[${i}], vec2<f32>(cos(a), sin(a))); }
`}}if(o+=`    let base = (t / ${t}u) * ${t*e}u + twiddleIndex;
`,e===2)o+=`    ${p(0)} = leg[0] + leg[1];
    ${p(1)} = leg[0] - leg[1];
`;else if(e===4){let r=l<0?"vec2<f32>(oddDiff.y, -oddDiff.x)":"vec2<f32>(-oddDiff.y, oddDiff.x)";o+=`    let evenSum = leg[0] + leg[2]; let evenDiff = leg[0] - leg[2];
`,o+=`    let oddSum = leg[1] + leg[3]; let oddDiff = leg[1] - leg[3];
`,o+=`    let oddRot = ${r};
`,o+=`    ${p(0)} = evenSum + oddSum;
    ${p(1)} = evenDiff + oddRot;
`,o+=`    ${p(2)} = evenSum - oddSum;
    ${p(3)} = evenDiff - oddRot;
`}else for(let r=0;r<e;r++){let i=["leg[0]"];for(let s=1;s<e;s++){let c=l*to*(s*r)/e,h=dr(Math.cos(c)),m=dr(Math.sin(c));i.push(`vec2<f32>(leg[${s}].x*${h} - leg[${s}].y*${m}, leg[${s}].x*${m} + leg[${s}].y*${h})`)}o+=`    ${p(r)} = ${i.join(" + ")};
`}return`${o}  }
  workgroupBarrier();
`},k0=(e,t,n)=>{let a="",l=1,u=0;for(let d of e)a+=A0(d,l,t,u,n),l*=d,u=ni-u;return{code:a,resultOffset:u}},D0=(e,t,n,a,l)=>{let u=e.dims,d=u.length,p=u[d-1],o=u[t],r=n&&a?(o-1)*2:o;l!==void 0&&(r=l);let i=n&&a?1:2,s=a&&!n?Math.floor(r/2)+1:r,c=u.slice();c[t]=s,c[d-1]=i;let h=1;for(let b=t+1;b<d-1;b++)h*=u[b];let m=B.size(u)/p/o;return{dataType:e.dataType,outputDims:c,length:r,signalLength:o,inner:h,batch:m,inputComponents:p,outputComponents:i,outputLength:s,inverse:n,onesided:a}},eu=(e,t)=>[t,e.length,e.inputComponents,e.outputComponents,e.inverse,e.onesided].join(";"),tu=e=>[{type:12,data:e.batch},{type:12,data:e.signalLength},{type:12,data:e.inner},{type:12,data:e.outputLength}],ru=(e,t,n)=>e.registerUniform("batch","u32").registerUniform("signalLength","u32").registerUniform("inner","u32").registerUniform("outputLength","u32").declareVariables(t,n),N0=e=>{let{dataType:t,length:n,inputComponents:a,outputComponents:l,inverse:u,onesided:d}=e,p=et(t),o=u?1:-1,r=u?1/n:1,i=Qa(n),s=c=>{let h=L("x",t,[1]),m=te("y",t,[1]),b=E=>{let A=`inBase + (${E}) * uniforms.inner * ${a}u`,k=`f32(${h.getByOffset(A)})`,T=a===2?`f32(${h.getByOffset(`${A} + 1u`)})`:"0.0";return`vec2<f32>(${k}, ${T})`},x;if(u&&d){let E=Math.floor(n/2)+1,A=n%2===0?`select(provided, provided - 1u, provided == ${E}u)`:"provided";x=`
    let provided = min(uniforms.signalLength, ${E}u);
    for (var i = local_idx; i < ${n}u; i += ${Qt}u) {
      if (i < provided) { smem[i] = ${b("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${A}; k += ${Qt}u) {
      let h = smem[k];
      smem[${n}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else x=`
    let loadCount = min(uniforms.signalLength, ${n}u);
    for (var i = local_idx; i < ${n}u; i += ${Qt}u) {
      if (i < loadCount) { smem[i] = ${b("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:v,resultOffset:_}=k0(i,n,o),I=r===1?`smem[${_}u + i]`:`smem[${_}u + i] * ${dr(r)}`,O=l===2?m.setByOffset("off + 1u",`${p}(v.y)`):"";return`
  ${ru(c,h,m)}
  var<workgroup> smem: array<vec2<f32>, ${2*ni}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${c.mainStart(Qt)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${a}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${l}u;
    ${x}
${v}    for (var i = local_idx; i < uniforms.outputLength; i += ${Qt}u) {
      let v = ${I};
      let off = outBase + i * uniforms.inner * ${l}u;
      ${m.setByOffset("off",`${p}(v.x)`)}
      ${O}
    }
  }`};return{name:"DFT",shaderCache:{hint:eu(e,"fft"),inputDependencies:["type"]},getShaderSource:s,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:tu(e),dispatchGroup:{x:e.batch}})}},C0=e=>{let{dataType:t,length:n,inputComponents:a,outputComponents:l,inverse:u,onesided:d}=e,p=et(t),o=u?1:-1,r=u?1/n:1,i=s=>{let c=L("x",t,[1]),h=te("y",t,[1]),m=I=>{let O=`inBase + (${I}) * uniforms.inner * ${a}u`,E=`f32(${c.getByOffset(O)})`,A=a===2?`f32(${c.getByOffset(`${O} + 1u`)})`:"0.0";return`vec2<f32>(${E}, ${A})`},b=u&&d?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(n/2)+1}u);
    if (k < provided) { return ${m("k")}; }
    let m = ${n}u - k;
    if (m < provided) {
      let h = ${m("m")};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${m("n")}; }
    return vec2<f32>(0.0, 0.0);
  }`,x=`
      let angle = ${dr(o*to)} * f32(knMod) / ${dr(n)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${n}u) { knMod -= ${n}u; }`,v=l===2?h.setByOffset("off + 1u",`${p}(v.y)`):"",_=r===1?"acc":`acc * ${dr(r)}`;return`
  ${ru(s,c,h)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${b}
  ${s.mainStart(Qt)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${a}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${l}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${Qt}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${n}u; n++) {${x}
      }
      let v = ${_};
      let off = outBase + k * uniforms.inner * ${l}u;
      ${h.setByOffset("off",`${p}(v.x)`)}
      ${v}
    }
  }`};return{name:"DFT",shaderCache:{hint:eu(e,"direct"),inputDependencies:["type"]},getShaderSource:i,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:tu(e),dispatchGroup:{x:e.batch}})}},nu=e=>{if(!e||e.dataType===0)return;if(B.size(e.dims)!==1)throw new Error("DFT optional scalar inputs must have exactly 1 element.");if(e.dataType===6)return e.getInt32Array()[0];let t=Number(e.getBigInt64Array()[0]);if(!Number.isSafeInteger(t))throw new Error("DFT optional scalar inputs are out of JavaScript safe integer range.");return t},z0=e=>{if(!e||e.length<1)throw new Error("DFT requires at least 1 input.");let t=e[0].dims;if(t.length<2)throw new Error("DFT input must have at least 2 dimensions.");let n=t[t.length-1];if(n!==1&&n!==2)throw new Error("DFT input's innermost dimension must be 1 (real) or 2 (complex).")},R0=(e,t)=>{z0(e.inputs);let n=e.inputs[0],a=n.dims.length,l=t.inverse!==0,u=t.onesided!==0,d=nu(e.inputs[1]);if(d!==void 0&&d<=0)throw new Error("dft_length must be greater than zero.");let p=B.normalizeAxis(nu(e.inputs[2])??t.axis,a);if(p===a-1)throw new Error("DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.");if(l&&u&&n.dims[a-1]!==2)throw new Error("Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).");let o=D0(n,p,l,u,d);if(o.length<=0)throw new Error(`Invalid DFT length: ${o.length}`);let r=o.length<=ni&&Qa(o.length)!==void 0?N0(o):C0(o);e.compute(r,{inputs:[0]})},B0=e=>Ee({axis:e.axis??1,inverse:e.inverse??0,onesided:e.onesided??0})}),ro,ii,iu,M0,F0,j0,L0,ou,V0,U0,q0,Y3=N(()=>{"use strict";se(),ae(),He(),de(),ro="[a-zA-Z]|\\.\\.\\.",ii="("+ro+")+",iu="^"+ii+"$",M0="("+ii+",)*"+ii,F0="^"+M0+"$",j0=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let n=this.symbolToIndices.get(e);n===void 0?n=[t]:n.push(t),this.symbolToIndices.set(e,n)}},L0=class{constructor(e,t){var l;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,a]=t.includes("->")?t.split("->",2):[t,""];if(!n.match(RegExp(F0)))throw new Error("Invalid LHS term");if(n.split(",").forEach((u,d)=>{let p=e[d].dims.slice();if(!u.match(RegExp(iu)))throw new Error("Invalid LHS term");let o=this.processTerm(u,!0,p,d);this.lhs.push(o)}),a==="")a+=[...this.symbolToInfo.entries()].filter(([u,d])=>d.count===1||u==="...").map(([u])=>u).join("");else if(!a.match(RegExp(ii)))throw new Error("Invalid RHS");(l=a.match(RegExp(ro,"g")))==null||l.forEach(u=>{if(u==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let d=this.symbolToInfo.get(u);if(d===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(d.dimValue)}}),this.rhs=this.processTerm(a,!1,this.outputDims)}addSymbol(e,t,n){let a=this.symbolToInfo.get(e);if(a!==void 0){if(a.dimValue!==t&&a.count!==1)throw new Error("Dimension mismatch");a.count++,a.inputIndices.push(n)}else a={count:1,dimValue:t,inputIndices:[n]};this.symbolToInfo.set(e,a)}processTerm(e,t,n,a=-1){let l=n.length,u=!1,d=[],p=0;if(!e.match(RegExp(iu))&&!t&&e!=="")throw new Error("Invalid LHS term");let o=e.match(RegExp(ro,"g")),r=new j0(a);return o==null||o.forEach((i,s)=>{if(i==="..."){if(u)throw new Error("Only one ellipsis is allowed per input term");u=!0;let c=l-o.length+1;if(c<0)throw new Error("Ellipsis out of bounds");if(d=n.slice(p,p+c),this.hasEllipsis){if(this.ellipsisDims.length!==d.length||this.ellipsisDims.toString()!==d.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=d;else throw new Error("Ellipsis must be specified in the LHS");for(let h=0;h<d.length;h++){let m=String.fromCharCode(48+h);r.addSymbol(m,s+h),this.addSymbol(m,n[p++],a)}}else r.addSymbol(i,s+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(i,n[p++],a)}),r}},ou=e=>e+"_max",V0=(e,t,n,a)=>{let l=e.map(r=>r.length).map((r,i)=>L(`input${i}`,t,r)),u=B.size(a),d=te("output",t,a.length),p=[...n.symbolToInfo.keys()].filter(r=>!n.rhs.symbolToIndices.has(r)),o=r=>{let i=[],s="var prod = 1.0;",c="var sum = 0.0;",h="sum += prod;",m=[],b=[],x=[],v=[],_=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((O,E)=>{var A;if(n.rhs.symbolToIndices.has(E)){let k=(A=n.rhs.symbolToIndices.get(E))==null?void 0:A[0];k!==void 0&&n.lhs.forEach((T,M)=>{if(O.inputIndices.includes(M)){let F=T.symbolToIndices.get(E);if(F===void 0)throw new Error("Invalid symbol error");F.forEach(J=>{i.push(`${l[M].indicesSet(`input${M}Indices`,J,d.indicesGet("outputIndices",k))}`)})}})}else n.lhs.forEach((k,T)=>{if(O.inputIndices.includes(T)){let M=k.symbolToIndices.get(E);if(M===void 0)throw new Error("Invalid symbol error");M.forEach(F=>{m.push(`${l[T].indicesSet(`input${T}Indices`,F,`${E}`)}`)}),v.push(`prod *= ${l[T].getByIndices(`input${T}Indices`)};`)}}),b.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${ou(E)}; ${E}++) {`),x.push("}")});let I=_?[...i,`let sum = ${l.map((O,E)=>O.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...i,c,...b,...m,s,...v,h,...x];return`
            ${r.registerUniforms(p.map(O=>({name:`${ou(O)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...l,d)}

            ${r.mainStart()}
            ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${d.offsetToIndices("global_idx")};
            ${l.map((O,E)=>`var input${E}Indices: ${l[E].type.indices};`).join(`
`)}
            ${I.join(`
`)};
            ${d.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let r=p.filter(s=>n.symbolToInfo.has(s)).map(s=>{var c;return{type:12,data:((c=n.symbolToInfo.get(s))==null?void 0:c.dimValue)||0}});r.push({type:12,data:u});let i=e.map((s,c)=>[...oe(s)]).reduce((s,c)=>s.concat(c),r);return i.push(...oe(a)),{outputs:[{dims:a,dataType:t}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:i}},getShaderSource:o}},U0=(e,t)=>{let n=new L0(e.inputs,t.equation),a=n.outputDims,l=e.inputs.map((u,d)=>u.dims);e.compute(V0(l,e.inputs[0].dataType,n,a))},q0=e=>{let t=e.equation.replace(/\s+/g,"");return Ee({equation:t})}}),G0,su,H0,W0,K0,Q3=N(()=>{"use strict";se(),ae(),de(),G0=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),a=n.length<t.length?0:n.length-t.length,l=t.length<n.length?0:t.length-n.length;for(;a<n.length&&l<t.length;++a,++l)if(n[a]!==t[l]&&n[a]!==1&&t[l]!==1)throw new Error("Expand requires shape to be broadcastable to input")},su=(e,t)=>{let n=e.length-t.length,a=[];for(let l=0;l<n;++l)a.push(e[l]);for(let l=0;l<t.length;++l)a.push(t[l]===1?e[l+n]:t[l]);return a},H0=(e,t)=>e.length>t.length?su(e,t):su(t,e),W0=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),a=H0(t,n),l=e[0].dataType,u=l===9||B.size(t)===1,d=l===9||t.length>0&&t[t.length-1]%4===0?4:1,p=u||a.length>0&&a[a.length-1]%4===0?4:1,o=Math.ceil(B.size(a)/p),r=s=>{let c=L("input",l,t.length,d),h=te("output",l,a.length,p),m;if(l===9){let b=(x,v,_="")=>`
          let outputIndices${v} = ${h.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${c.broadcastedIndicesToOffset(`outputIndices${v}`,h)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${x}[${v}] = ${_}(${c.getByOffset(`index${v}`)}[component${v}]);
        `;m=`
        let outputOffset = global_idx * ${p};
        var data = vec4<u32>(0);
        ${b("data",0,"u32")}
        ${b("data",1,"u32")}
        ${b("data",2,"u32")}
        ${b("data",3,"u32")}
        ${h.setByOffset("global_idx","data")}
      }`}else m=`
        let outputIndices = ${h.offsetToIndices(`global_idx * ${p}`)};
        let inputOffset = ${c.broadcastedIndicesToOffset("outputIndices",h)};
        let data = ${h.type.value}(${c.getByOffset(`inputOffset / ${d}`)});
        ${h.setByOffset("global_idx","data")}
      }`;return`
    ${s.registerUniform("vec_size","u32").declareVariables(c,h)}
    ${s.mainStart()}
    ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${m}`},i=[{type:12,data:o},...oe(t,a)];return{name:"Expand",shaderCache:{hint:`${a.length};${d}${p}`,inputDependencies:["rank"]},getShaderSource:r,getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:i})}},K0=e=>{G0(e.inputs),e.compute(W0(e.inputs),{inputs:[0]})}}),X0,Z0,eI=N(()=>{"use strict";se(),ae(),de(),Ba(),X0=e=>{let t=e[0].dataType,n=B.size(e[0].dims),a=B.size(e[1].dims),l=a%4===0,u=d=>{let p=L("x",t,[1],4),o=L("bias",t,[1],4),r=te("y",t,[1],4),i=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],s=h=>`
      let bias${h}_offset: u32 = (global_idx * 4 + ${h}) % uniforms.bias_size;
      let bias${h} = ${o.getByOffset(`bias${h}_offset / 4`)}[bias${h}_offset % 4];`,c=l?`
      let bias = ${o.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${s(0)}${s(1)}${s(2)}${s(3)}
      let bias = ${p.type.value}(bias0, bias1, bias2, bias3);`;return`${d.registerUniforms(i).declareVariables(p,o,r)}

    ${za(et(t))}

    ${d.mainStart(_n)}
      ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${p.getByOffset("global_idx")};
      ${c}
      let x_in = x + bias;
      ${r.setByOffset("global_idx",Ra("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${l}`,inputDependencies:["type","type"]},getShaderSource:u,getRunData:d=>({outputs:[{dims:d[0].dims,dataType:d[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:a}],dispatchGroup:{x:Math.ceil(n/_n/4)}})}},Z0=e=>{e.inputs.length<2||B.size(e.inputs[1].dims)===0?xy(e):e.compute(X0(e.inputs))}}),J0,Y0,Q0,e_,tI=N(()=>{"use strict";se(),ae(),He(),de(),J0=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Y0=(e,t)=>{let n=e[0].dims,a=e[1].dims,l=n.length,u=B.normalizeAxis(t.axis,l),d=n.slice(0);d.splice(u,1,...a);let p=n[u],o=e[0].dataType===9?4:1,r=Math.ceil(B.size(d)/o),i=[{type:12,data:r},{type:6,data:p},{type:12,data:u},...oe(e[0].dims,e[1].dims,d)],s=c=>{let h=L("data",e[0].dataType,e[0].dims.length,o),m=L("inputIndices",e[1].dataType,e[1].dims.length),b=te("output",e[0].dataType,d.length,o),x=_=>{let I=a.length,O=`var indicesIndices${_}  = ${m.type.indices}(0);`;for(let E=0;E<I;E++)O+=`${I>1?`indicesIndices${_}[${E}]`:`indicesIndices${_}`} = ${d.length>1?`outputIndices${_}[uniforms.axis + ${E}]`:`outputIndices${_}`};`;O+=`
          var idx${_} = ${m.getByIndices(`indicesIndices${_}`)};
          if (idx${_} < 0) {
            idx${_} = idx${_} + uniforms.axisDimLimit;
          }
          var dataIndices${_} : ${h.type.indices};
        `;for(let E=0,A=0;E<l;E++)E===u?(O+=`${l>1?`dataIndices${_}[${E}]`:`dataIndices${_}`} = u32(idx${_});`,A+=I):(O+=`${l>1?`dataIndices${_}[${E}]`:`dataIndices${_}`} = ${d.length>1?`outputIndices${_}[${A}]`:`outputIndices${_}`};`,A++);return O},v;if(e[0].dataType===9){let _=(I,O,E="")=>`
          let outputIndices${O} = ${b.offsetToIndices(`outputOffset + ${O}u`)};
          ${x(O)};
          let offset${O} = ${h.indicesToOffset(`dataIndices${O}`)};
          let index${O} = offset${O} / 4u;
          let component${O} = offset${O} % 4u;
          ${I}[${O}] = ${E}(${h.getByOffset(`index${O}`)}[component${O}]);
        `;v=`
        let outputOffset = global_idx * ${o};
        var value = vec4<u32>(0);
        ${_("value",0,"u32")}
        ${_("value",1,"u32")}
        ${_("value",2,"u32")}
        ${_("value",3,"u32")}
        ${b.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${b.offsetToIndices("global_idx")};
      ${x("")};
      let value = ${h.getByIndices("dataIndices")};
      ${b.setByOffset("global_idx","value")};
      `;return`
      ${c.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,m,b)}
      ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:i}),getShaderSource:s}},Q0=e=>Ee({axis:e.axis}),e_=(e,t)=>{let n=e.inputs;J0(n),e.compute(Y0(e.inputs,t))}}),t_,r_,n_,rI=N(()=>{"use strict";se(),ae(),de(),t_=(e,t,n,a,l,u,d,p,o)=>{let r=[{type:12,data:u},{type:12,data:a},{type:12,data:l},{type:12,data:n},{type:12,data:d},{type:12,data:p},{type:12,data:o}],i=[u];r.push(...oe(t.dims,i));let s=c=>{let h=L("indices_data",t.dataType,t.dims.length),m=te("input_slice_offsets_data",12,1,1),b=[h,m],x=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:l.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${c.registerUniforms(x).declareVariables(...b)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${l.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${n.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${l.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:r}),getShaderSource:s},{inputs:[t],outputs:[-1]})[0]},r_=(e,t)=>{let n=e.inputs,a=n[0].dims,l=n[0].dataType,u=n[1].dims,d=u[u.length-1],p=B.sizeToDimension(u,u.length-1),o=B.sizeFromDimension(a,t.batchDims+d),r=B.sizeToDimension(a,t.batchDims),i=B.sizeFromDimension(a,t.batchDims),s=p/r,c=new Array(d),h=o;for(let O=0;O<d;++O)c[d-1-O]=h,h*=a[t.batchDims+d-1-O];let m=t_(e,n[1],c,t.batchDims,a,p,s,i,d),b=t.batchDims+d;if(b>a.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let x=u.slice(0,-1).concat(a.slice(b)),v=B.size(x),_=[{type:12,data:v},{type:12,data:o},...oe(n[0].dims,m.dims,x)],I=O=>{let E=L("data",n[0].dataType,n[0].dims.length),A=L("slice_offsets",12,m.dims.length),k=te("output",n[0].dataType,x.length);return`
          ${O.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(E,A,k)}
            ${O.mainStart()}
            ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:x,dataType:l}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:_}),getShaderSource:I},{inputs:[n[0],m]})},n_=e=>({batchDims:e.batch_dims,cacheKey:""})}),i_,o_,s_,a_,nI=N(()=>{"use strict";se(),ae(),He(),de(),i_=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=B.normalizeAxis(t.quantizeAxis,e[0].dims.length),a=t.blockSize,l=e[0],u=e[2],d=e.length===4?e[3]:void 0;if(u.dims.length!==l.dims.length||!l.dims.map((p,o)=>o===n?Math.ceil(p/a)===u.dims[o]:p===u.dims[o]).reduce((p,o)=>p&&o,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(d){if(d.dataType!==l.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(d.dims.length!==u.dims.length||!d.dims.map((p,o)=>p===u.dims[o]).reduce((p,o)=>p&&o,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},o_=(e,t)=>{let n=e[0].dims,a=e[1].dims,l=n.length,u=B.normalizeAxis(t.gatherAxis,l),d=B.normalizeAxis(t.quantizeAxis,l),p=n.slice(0);p.splice(u,1,...a);let o=B.size(p),r=e[2].dataType,i=e[0].dataType===22,s=[{type:12,data:o},{type:12,data:d},{type:12,data:u},{type:12,data:t.blockSize},...oe(...e.map((h,m)=>h.dims),p)],c=h=>{let m=L("data",e[0].dataType,e[0].dims.length),b=L("inputIndices",e[1].dataType,e[1].dims.length),x=L("scales",e[2].dataType,e[2].dims.length),v=e.length>3?L("zeroPoint",e[3].dataType,e[3].dims.length):void 0,_=te("output",r,p.length),I=[m,b,x];v&&I.push(v);let O=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${h.registerUniforms(O).declareVariables(...I,_)}
        ${h.mainStart()}
        let output_indices = ${_.offsetToIndices("global_idx")};
        var indices_indices = ${b.type.indices}(0);
        ${a.length>1?`
          for (var i: u32 = 0; i < ${a.length}; i++) {
            let index = ${_.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${b.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${_.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${m.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${_.indicesGet("output_indices","i")};
          ${m.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${b.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[u]};
        }
        ${m.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${p.length}; i++) {
          let index = ${_.indicesGet("output_indices",`i + ${a.length} - 1`)};
          ${m.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${m.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${m.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${i?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${x.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${x.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${x.getByIndices("scale_indices")};
        ${v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${i?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${et(r)}(quantized_data - zero_point) * scale;
        ${_.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((h,m)=>m!==1).map(h=>h.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(h,m)=>"rank")},getRunData:()=>({outputs:[{dims:p,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:s}),getShaderSource:c}},s_=(e,t)=>{let n=e.inputs;i_(n,t),e.compute(o_(e.inputs,t))},a_=e=>Ee({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),u_,l_,d_,p_,iI=N(()=>{"use strict";se(),ae(),He(),de(),u_=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},l_=(e,t)=>{let n=e[0].dims,a=e[0].dataType,l=n.length,u=e[1].dims,d=e[1].dataType,p=B.normalizeAxis(t.axis,l),o=n[p],r=u.slice(0),i=B.size(r),s=L("input",a,l),c=L("indicesInput",d,u.length),h=te("output",a,r.length),m=[{type:12,data:i},{type:6,data:o},{type:12,data:p}];return m.push(...oe(n,u,r)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:m}),getShaderSource:b=>`
      ${b.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(s,c,h)}
      ${b.mainStart()}
      ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${h.offsetToIndices("global_idx")};

      var idx = ${c.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${s.type.indices}(outputIndices);
      ${s.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${s.getByIndices("inputIndices")};

      ${h.setByOffset("global_idx","value")};
  }`}},d_=e=>Ee({axis:e.axis}),p_=(e,t)=>{let n=e.inputs;u_(n),e.compute(l_(e.inputs,t))}}),c_,h_,f_,m_,oI=N(()=>{"use strict";se(),ae(),de(),c_=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},h_=(e,t)=>{let n=e[0].dims.slice(),a=e[1].dims.slice(),[l,u,d]=fg.getShapeOfGemmResult(n,t.transA,a,t.transB,e.length===3?e[2].dims:void 0),p=[l,u];if(!p)throw new Error("Can't use gemm on the given tensors");let o=16,r=Math.ceil(u/o),i=Math.ceil(l/o),s=!0,c=B.size(p),h=[{type:12,data:s?r:c},{type:12,data:l},{type:12,data:u},{type:12,data:d},{type:1,data:t.alpha},{type:1,data:t.beta}],m=["type","type"];e.length===3&&(h.push(...oe(e[2].dims)),m.push("rank")),h.push(...oe(p));let b=v=>{let _="";t.transA&&t.transB?_="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?_="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?_="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(_="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let I=t.alpha===1?"":"value *= uniforms.alpha;",O=L("a",e[0].dataType,e[0].dims),E=L("b",e[1].dataType,e[1].dims),A=O.type.value,k=null,T=[O,E];e.length===3&&(k=L("c",e[2].dataType,e[2].dims.length),T.push(k));let M=te("output",e[0].dataType,p.length);T.push(M);let F=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(F).declareVariables(...T)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${A}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${_}
    }

    ${I}
    ${k!=null?`let cOffset = ${k.broadcastedIndicesToOffset("vec2(m, n)",M)}; value += ${A}(uniforms.beta) * ${k.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},x=v=>{let _=L("a",e[0].dataType,e[0].dims),I=L("b",e[1].dataType,e[1].dims),O=null,E=[_,I];e.length===3&&(O=L("c",e[2].dataType,e[2].dims.length),E.push(O));let A=te("output",e[0].dataType,p.length);E.push(A);let k=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],T="",M="";t.transA&&t.transB?(M=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,T="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(M=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,T="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(M=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,T="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(M=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${_.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,T="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let F=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(k).declareVariables(...E)}
  var<workgroup> tile_a: array<array<${_.type.storage}, ${o}>, ${o}>;
  var<workgroup> tile_b: array<array<${I.type.storage}, ${o}>, ${o}>;
  ${v.mainStart([o,o,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${o};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${o};
    let num_tiles = (uniforms.K - 1) / ${o} + 1;
    var k_start = 0u;
    var value = ${A.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${M}
      k_start = k_start + ${o};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${o}; k++) {
        ${T}
      }
      workgroupBarrier();
    }

    ${F}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${O!=null?`let cOffset = ${O.broadcastedIndicesToOffset("vec2(m, n)",A)}; value += ${A.type.value}(uniforms.beta) * ${O.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return s?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:r*i},programUniforms:h}),getShaderSource:x}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:b}},f_=e=>{let t=e.transA,n=e.transB,a=e.alpha,l=e.beta;return{transA:t,transB:n,alpha:a,beta:l,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},m_=(e,t)=>{c_(e.inputs),e.compute(h_(e.inputs,t))}}),Gt,er,Hr,Wr,g_,b_,y_,__,w_,v_,x_,$_,T_,I_,sI=N(()=>{"use strict";se(),ae(),He(),de(),[Gt,er,Hr,Wr]=[0,1,2,3],g_=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},b_=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,y_=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,__=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,w_=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,v_=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Gt}] = batch;
     indices[${er}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Hr}] = u32(r);
            indices[${Wr}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Hr}] = u32(clamp(r, 0, H - 1));
          indices[${Wr}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Hr}] = gs_reflect(r, border[1], border[3]);
          indices[${Wr}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,x_=(e,t,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Gt}], indices[${er}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Gt}], indices[${er}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Gt}], indices[${er}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Gt}], indices[${er}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Gt}], indices[${er}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Gt}], indices[${er}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,$_=(e,t)=>{let n=L("x",e[0].dataType,e[0].dims.length),a=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],l=L("grid",e[1].dataType,a.length,2),u=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(u=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Gt,er,Hr,Wr]=[0,3,1,2]);let d=te("output",e[0].dataType,u.length),p=n.type.value,o=B.size(u),r=[{type:12,data:o},...oe(e[0].dims,a,u)],i=s=>`
  ${s.registerUniform("output_size","u32").declareVariables(n,l,d)}
  ${b_}
  ${y_(p)}
  ${__(t)}
  ${w_(t)}
  ${v_(n,p,t)}

  ${s.mainStart()}
    ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Hr}]);
      let W_in = i32(uniforms.x_shape[${Wr}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${d.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Gt}], indices[${Hr}], indices[${Wr}]);
      let nxy = ${l.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${x_(d,p,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:s=>{let c=B.size(u);return{outputs:[{dims:u,dataType:s[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:r}},getShaderSource:i}},T_=(e,t)=>{g_(e.inputs),e.compute($_(e.inputs,t))},I_=e=>Ee({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),lt,S_,O_,au,E_,oi,P_,A_=N(()=>{"use strict";se(),ae(),He(),xa(),Na(),de(),lr(),lt=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,S_=(e,t)=>{let n=e[0],a=lt(e,1),l=lt(e,2),u=lt(e,3),d=lt(e,4),p=lt(e,5),o=lt(e,6),r=lt(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let i=n.dims[0],s=n.dims[1],c=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],h=s,m=0,b=0,x=Math.floor(c/t.numHeads);if(o&&r&&B.size(o.dims)&&B.size(r.dims)){if(o.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(o.dims[0]!==i||o.dims[1]!==t.numHeads||o.dims[3]!==x)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(r.dims[0]!==i||r.dims[1]!==t.numHeads||r.dims[3]!==x)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(o.dims[2]!==r.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(r.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=o.dims[2],b=o.dims[2]}else if(o&&B.size(o.dims)||r&&B.size(r.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(a&&B.size(a.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==a.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(a.dims.length===3){if(a.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,h=a.dims[1]}else if(a.dims.length===5){if(a.dims[2]!==t.numHeads||a.dims[3]!==2||a.dims[4]!==x)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(l)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,h=a.dims[1]}else{if(a.dims[1]!==t.numHeads||a.dims[3]!==x)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,h=a.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(u&&B.size(u.dims)>0){if(u.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(a&&a.dims.length===5&&a.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let _=m+h,I=0;if(d&&B.size(d.dims)>0){I=8;let k=d.dims;throw k.length===1?k[0]===i?I=1:k[0]===3*i+2&&(I=3):k.length===2&&k[0]===i&&k[1]===_&&(I=5),I===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let O=!1,E=c;if(l&&B.size(l.dims)>0){if(l.dims.length!==3&&l.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==l.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(l.dims.length===3){if(h!==l.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');E=l.dims[2]}else{if(h!==l.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');E=l.dims[1]*l.dims[3],O=!0}}let A=!1;if(d&&B.size(d.dims)>0)throw new Error("Key padding mask is not supported");if(p&&B.size(p.dims)>0){if(p.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(p.dims[0]!==i||p.dims[1]!==t.numHeads||p.dims[2]!==s||p.dims[3]!==_)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:i,sequenceLength:s,pastSequenceLength:m,kvSequenceLength:h,totalSequenceLength:_,maxSequenceLength:b,inputHiddenSize:0,hiddenSize:c,vHiddenSize:E,headSize:x,vHeadSize:Math.floor(E/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:I,scale:t.scale,broadcastResPosBias:A,passPastInKv:O,qkvFormat:v}},O_=e=>Ee({...e}),au=Ee({perm:[0,2,1,3]}),E_=(e,t,n,a,l,u,d)=>{let p=[a,l,u],o=B.size(p),r=[{type:12,data:o},{type:12,data:d},{type:12,data:u}],i=s=>{let c=te("qkv_with_bias",t.dataType,p),h=L("qkv",t.dataType,p),m=L("bias",n.dataType,p),b=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${s.registerUniforms(b).declareVariables(h,m,c)}
  ${s.mainStart()}
    ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:p,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:r}),getShaderSource:i},{inputs:[t,n],outputs:[-1]})[0]},oi=(e,t,n,a,l,u,d,p)=>{let o=u;if(d&&B.size(d.dims)>0){if(a===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return o=E_(e,u,d,t,a,n*l,p),o=o.reshape([t,a,n,l]),n===1||a===1?o:e.compute(_t(o,au.perm),{inputs:[o],outputs:[-1]})[0]}else return u.dims.length===3&&(o=u.reshape([t,a,n,l])),n===1||a===1?o:e.compute(_t(o,au.perm),{inputs:[o],outputs:[-1]})[0]},P_=(e,t)=>{let n=S_(e.inputs,t),a=e.inputs[0],l=lt(e.inputs,1),u=lt(e.inputs,2),d=lt(e.inputs,3),p=lt(e.inputs,4),o=lt(e.inputs,5),r=lt(e.inputs,6),i=lt(e.inputs,7);if(a.dims.length===5)throw new Error("Packed QKV is not implemented");if((l==null?void 0:l.dims.length)===5)throw new Error("Packed KV is not implemented");let s=l&&u&&l.dims.length===4&&u.dims.length===4,c=oi(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,a,d,0);if(s)return Qn(e,c,l,u,p,void 0,r,i,o,n);if(!l||!u)throw new Error("key and value must be provided");let h=oi(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,l,d,n.hiddenSize),m=oi(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,u,d,2*n.hiddenSize);Qn(e,c,h,m,p,void 0,r,i,o,n)}}),k_,D_,N_,C_,uu,z_,R_,B_=N(()=>{"use strict";se(),ae(),He(),de(),k_=e=>{if(!e||e.length<1)throw new Error("too few inputs")},D_=(e,t)=>{let n=[],a=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(l=>n.push(Number(l))),a=n.length),Ee({numOutputs:a,axis:t.axis,splitSizes:n})},N_=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${ne("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,C_=e=>{let t=e.length,n=[];for(let a=0;a<t;++a){let l=e[a].setByIndices("indices","input[global_idx]");t===1?n.push(l):a===0?n.push(`if (output_number == ${a}u) { ${l} }`):a===t-1?n.push(`else { ${l} }`):n.push(`else if (output_number == ${a}) { ${l} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},uu=(e,t)=>{let n=e[0].dims,a=B.size(n),l=e[0].dataType,u=B.normalizeAxis(t.axis,n.length),d=new Array(t.numOutputs),p=L("input",l,n.length),o=new Array(t.numOutputs),r=[],i=[],s=0,c=[{type:12,data:a}];for(let m=0;m<t.numOutputs;m++){s+=t.splitSizes[m],o[m]=s;let b=n.slice();b[u]=t.splitSizes[m],i.push(b),d[m]=te(`output${m}`,l,b.length),r.push({dims:i[m],dataType:e[0].dataType})}c.push({type:12,data:o},...oe(n,...i));let h=m=>`
  ${m.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",o.length).declareVariables(p,...d)}
  ${N_(o.length)}
  ${C_(d)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${p.offsetToIndices("global_idx")};
    var index = ${p.indicesGet("indices",u)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${ne("uniforms.size_in_split_axis","output_number - 1u",o.length)};
      ${p.indicesSet("indices",u,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:h,getRunData:()=>({outputs:r,dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c})}},z_=(e,t)=>{k_(e.inputs);let n=e.inputs.length===1?t:D_(e.inputs,t);e.compute(uu(e.inputs,n),{inputs:[0]})},R_=e=>{let t=e.axis,n=e.splitSizes,a=e.numOutputs<0?n.length:e.numOutputs;if(a!==n.length)throw new Error("numOutputs and splitSizes length must be equal");return Ee({axis:t,numOutputs:a,splitSizes:n})}}),M_,no,F_,j_=N(()=>{"use strict";se(),ae(),He(),de(),M_=(e,t)=>{let[n,a,l,u]=e,{numHeads:d,rotaryEmbeddingDim:p}=t;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!B.areEqual(a.dims,[])&&!B.areEqual(a.dims,[1])&&a.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${a.dims.length}`);if(l.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${l.dims.length}`);if(u.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${u.dims.length}`);if(!B.areEqual(l.dims,u.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(p>0&&d===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let o=n.dims[0],r=n.dims[n.dims.length-2],i=l.dims[0],s=B.sizeFromDimension(n.dims,1)/r,c=p===0?l.dims[1]*2:s/d;if(p>c)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(a.dims.length===2){if(o!==a.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${a.dims[0]}`);if(r!==a.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${a.dims[1]}`)}if(r>i)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(c/2!==l.dims[1]&&p/2!==l.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${l.dims[1]}`)},no=(e,t)=>{let{interleaved:n,numHeads:a,rotaryEmbeddingDim:l,scale:u}=t,d=e[0].dims[0],p=B.sizeFromDimension(e[0].dims,1),o=e[0].dims[e[0].dims.length-2],r=p/o,i=e[2].dims[1],s=l===0?i*2:r/a,c=new Array(d,o,r/s,s-i),h=B.computeStrides(c),m=[{type:1,data:u},{type:12,data:c},{type:12,data:h},...e[0].dims.length===3?new Array({type:12,data:[p,r,s,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[p,s,o*s,1]}):[],...oe(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],b=x=>{let v=L("input",e[0].dataType,e[0].dims.length),_=L("position_ids",e[1].dataType,e[1].dims.length),I=L("cos_cache",e[2].dataType,e[2].dims.length),O=L("sin_cache",e[3].dataType,e[3].dims.length),E=te("output",e[0].dataType,e[0].dims.length);return x.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:c.length},{name:"global_strides",type:"u32",length:h.length},{name:"input_output_strides",type:"u32",length:h.length}]),`
        ${x.declareVariables(v,_,I,O,E)}

        ${x.mainStart(_n)}
          let half_rotary_emb_dim = uniforms.${I.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${_.broadcastedIndicesToOffset("bsnh.xy",te("",_.type.tensor,2))};
            let position_id =
                u32(${_.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${v.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${O.get("position_id","bsnh[3]")};
            ${E.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${O.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${E.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${E.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:Ee({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(c)/_n)},programUniforms:m})}},F_=(e,t)=>{M_(e.inputs,t),e.compute(no(e.inputs,t))}}),L_,V_,lu,U_,q_,aI=N(()=>{"use strict";He(),se(),Na(),A_(),B_(),lr(),j_(),de(),L_=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],a=e[1],l=e[2],u=e[3],d=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let p=!1,o=n.dims[0],r=n.dims[1],i=n.dims.length===3?p?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],s=r,c=0,h=!a||a.dims.length===0,m=Math.floor(h?i/(t.numHeads+2*t.kvNumHeads):i/t.numHeads);h&&(i=m*t.numHeads);let b=u&&u.dims.length!==0,x=d&&d.dims.length!==0;if(b&&u.dims.length===4&&u.dims[0]===o&&u.dims[1]!==t.kvNumHeads&&u.dims[2]===t.kvNumHeads&&u.dims[3]===m)throw new Error("BSNH pastKey/pastValue is not supported");if(b&&x){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');c=u.dims[2]}else if(b||x)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(a&&a.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==a.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(a.dims.length===3){if(n.dims[2]%a.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');s=a.dims[1]}else if(a.dims.length===5){if(a.dims[2]!==t.numHeads||a.dims[3]!==2||a.dims[4]!==m)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(l)throw new Error('Expect "value" be none when "key" has packed kv format.');s=a.dims[1]}else{if(a.dims[1]!==t.numHeads||a.dims[3]!==m)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');s=a.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let _=0,I=!1,O=t.kvNumHeads?m*t.kvNumHeads:i;if(l&&l.dims.length>0){if(l.dims.length!==3&&l.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==l.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(l.dims.length===3){if(s!==l.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');O=l.dims[2]}else{if(s!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');O=l.dims[1]*l.dims[3],I=!0}}let E=e.length>4?e[5]:void 0;if(E){if(E.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let A=E.dims.reduce((k,T)=>k*T,1);if(A!==o)throw new Error(`seqlens_k must have batch_size (${o}) elements, got ${A}.`);for(let k=0;k<E.dims.length;k++)if(E.dims[k]!==1&&E.dims[k]!==o)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${o}), got dims[${k}] = ${E.dims[k]}.`)}return{batchSize:o,sequenceLength:r,pastSequenceLength:c,kvSequenceLength:s,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:i,vHiddenSize:O,headSize:m,vHeadSize:Math.floor(O/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:I,qkvFormat:v}},V_=Ee({perm:[0,2,1,3]}),lu=(e,t,n)=>{let a=t,l=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(a=t.reshape([n.batchSize,n.kvSequenceLength,l,n.headSize]),a=e.compute(_t(a,V_.perm),{inputs:[a],outputs:[-1]})[0]),a},U_=(e,t,n,a)=>{let l=7,u=["type","type"],d=[e*t],p=e*t,o=[{type:12,data:p},{type:12,data:t},{type:12,data:e}],r=i=>{let s=L("seq_lens",n.dataType,n.dims),c=L("total_seq_lens",a.dataType,a.dims),h=te("pos_ids",l,d),m=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${i.registerUniforms(m).declareVariables(s,c,h)}
  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${c.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${s.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${h.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${h.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${h.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:d,dataType:l}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:o}),getShaderSource:r}},q_=(e,t)=>{var O;if(e.inputs.length>14&&e.inputs[14]||e.inputs.length>15&&e.inputs[15])throw new Error("GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.");let n=L_(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((O=e.inputs[1])==null?void 0:O.dims.length)===5)throw new Error("Packed KV is not implemented");let a=e.inputs[0],l=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,u=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,d=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,p=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,o=e.inputs.length>4?e.inputs[5]:void 0,r=e.inputs.length>5?e.inputs[6]:void 0,i=n.kvNumHeads?n.kvNumHeads:n.numHeads,s=Ee({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,i*n.headSize,i*n.headSize]}),[c,h,m]=!l&&!u?e.compute(uu([a],s),{inputs:[a],outputs:[-1,-1,-1]}):[a,l,u],b,x;if(t.doRotary){let E=e.compute(U_(n.batchSize,n.sequenceLength,o,r),{inputs:[o,r],outputs:[-1]})[0],A=e.inputs[7],k=e.inputs[8],T=Ee({interleaved:t.rotaryInterleaved!==0,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),M=[c,E,A,k],F=[-1];b=e.compute(no(M,T),{inputs:M,outputs:F})[0],M.splice(0,1,h);let J=Ee({interleaved:t.rotaryInterleaved!==0,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});x=e.compute(no(M,J),{inputs:M,outputs:F})[0]}let v=oi(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t.doRotary?b:c,void 0,0),_=lu(e,t.doRotary?x:h,n),I=lu(e,m,n);Qn(e,v,_,I,void 0,void 0,d,p,void 0,n,o,r)}}),du,G_,H_,W_,uI=N(()=>{"use strict";se(),ae(),lr(),de(),du=(e,t,n,a,l,u,d,p)=>{let o=We(u),r=o===1?"f32":`vec${o}f`,i=o===1?"vec2f":`mat2x${o}f`,s=l*d,c=64;s===1&&(c=256);let h=[l,d,u/o],m=[l,d,2],b=["rank","type","type"],x=[];x.push(...oe(h,m));let v=_=>{let I=L("x",t.dataType,3,o),O=L("scale",n.dataType,n.dims),E=L("bias",a.dataType,a.dims),A=te("output",1,3,2),k=[I,O,E,A];return`
  var<workgroup> workgroup_shared : array<${i}, ${c}>;
  const workgroup_size = ${c}u;
  ${_.declareVariables(...k)}
  ${_.mainStart(c)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${r}(0);
    var squared_sum = ${r}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${r}(${I.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${i}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${ur("workgroup_shared[0][0]",o)} / f32(hight * ${o});
      let squared_sum_final = ${ur("workgroup_shared[0][1]",o)} / f32(hight * ${o});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${p}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${o};${p};${c}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:s},programUniforms:x}),getShaderSource:v},{inputs:[t,n,a],outputs:[-1]})[0]},G_=(e,t,n)=>{let a=t[0].dims,l=a,u=2,d=a[0],p=a[1],o=B.sizeFromDimension(a,u),r=We(o),i=B.size(l)/r,s=du(e,t[0],t[1],t[2],d,o,p,n.epsilon),c=[d,p,o/r],h=[d,p],m=["type","none"],b=x=>{let v=L("x",t[0].dataType,c.length,r),_=L("scale_shift",1,h.length,2),I=te("output",t[0].dataType,c.length,r),O=[v,_,I];return`
  ${x.registerUniform("output_size","u32").declareVariables(...O)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${I.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${_.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${I.type.value}(scale_shift.x) + ${I.type.value}(scale_shift.y);
      ${I.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${r}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:l,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...oe(c,h,c)]}),getShaderSource:b},{inputs:[t[0],s]})},H_=(e,t,n)=>{let a=t[0].dims,l=a,u=a[0],d=a[a.length-1],p=B.sizeFromDimension(a,1)/d,o=We(d),r=B.size(l)/o,i=[{type:12,data:p},{type:12,data:Math.floor(d/o)}],s=["type","type"],c=!1,h=[0,a.length-1];for(let v=0;v<a.length-2;v++)c=c||a[v+1]!==1,h.push(v+1);c=c&&a[a.length-1]!==1;let m=c?e.compute(_t(e.inputs[0],h),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:a.length},(v,_)=>a[h[_]])),b=du(e,m,t[1],t[2],u,p,d,n.epsilon),x=v=>{let _=Qe(t[0].dataType),I=o===1?"vec2f":`mat${o}x2f`,O=k=>{let T=k===0?"x":"y",M=o===1?"f32":`vec${o}f`;switch(o){case 1:return`${_}(${M}(scale.${T}))`;case 2:return`vec2<${_}>(${M}(scale[0].${T}, scale[1].${T}))`;case 4:return`vec4<${_}>(${M}(scale[0].${T}, scale[1].${T}, scale[2].${T}, scale[3].${T}))`;default:throw new Error(`Not supported compoents ${o}`)}},E=L("input",t[0].dataType,t[0].dims,o),A=te("output",t[0].dataType,l,o);return`
  @group(0) @binding(0) var<storage, read> input : array<${E.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${I}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${A.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${O(0)}, ${O(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${o}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:l,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:i}),getShaderSource:x},{inputs:[t[0],b]})},W_=(e,t)=>{t.format==="NHWC"?H_(e,e.inputs,t):G_(e,e.inputs,t)}}),K_,X_,Z_,lI=N(()=>{"use strict";se(),ae(),de(),K_=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},X_=(e,t,n)=>{let a=t.simplified,l=e[0].dims,u=e[1],d=!a&&e[2],p=l,o=B.normalizeAxis(t.axis,l.length),r=B.sizeToDimension(l,o),i=B.sizeFromDimension(l,o),s=B.size(u.dims),c=d?B.size(d.dims):0;if(s!==i||d&&c!==i)throw new Error(`Size of X.shape()[axis:] == ${i}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${s} and bias size of ${c}`);let h=[];for(let E=0;E<l.length;++E)E<o?h.push(l[E]):h.push(1);let m=We(i),b=["type","type"],x=[{type:12,data:r},{type:1,data:i},{type:12,data:Math.floor(i/m)},{type:1,data:t.epsilon}];d&&b.push("type");let v=n>1,_=n>2,I=E=>{let A=Qe(e[0].dataType),k=[L("x",e[0].dataType,e[0].dims,m),L("scale",u.dataType,u.dims,m)];d&&k.push(L("bias",d.dataType,d.dims,m)),k.push(te("output",e[0].dataType,p,m)),v&&k.push(te("mean_data_output",1,h)),_&&k.push(te("inv_std_output",1,h));let T=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${E.registerUniforms(T).declareVariables(...k)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Sa("f32",m)};
    var mean_square_vector = ${Sa("f32",m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${wn(A,m,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${ur("mean_vector",m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${ur("mean_square_vector",m)} / uniforms.norm_size ${a?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${wn(A,m,"x[j + offset]")};
      let f32scale = ${wn(A,m,"scale[j]")};
      output[j + offset] = ${k[0].type.value}((f32input ${a?"":"- mean"}) * inv_std_dev * f32scale
        ${d?`+ ${wn(A,m,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${_?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},O=[{dims:p,dataType:e[0].dataType}];return v&&O.push({dims:h,dataType:1}),_&&O.push({dims:h,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${n};${a}`,inputDependencies:b},getRunData:()=>({outputs:O,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:x}),getShaderSource:I}},Z_=(e,t)=>{K_(e.inputs),e.compute(X_(e.inputs,t,e.outputCount))}}),J_,Y_,dI=N(()=>{"use strict";ae(),La(),Ga(),J_=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Y_=e=>{J_(e.inputs);let t=yn.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let n=t[t.length-1],a=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&a<8)e.compute(ja(e.inputs,{activation:""},t));else{let l=t[t.length-2],u=B.size(e.inputs[0].dims.slice(0,-2)),d=B.size(e.inputs[1].dims.slice(0,-2));if(u!==1&&l===1&&d===1){let p=e.inputs[0].reshape([1,u,a]),o=e.inputs[1].reshape([1,a,n]),r=[1,u,n],i=[p,o];e.compute(Yi(i,{activation:""},t,r),{inputs:i})}else e.compute(Yi(e.inputs,{activation:""},t))}}}),Q_,ew,tw,rw,nw,pI=N(()=>{"use strict";se(),ae(),He(),de(),Q_=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],a=n.dims.length;if(n.dims[a-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let l=Math.floor((t.k+t.blockSize-1)/t.blockSize),u=t.blockSize/8*t.bits,d=e[1];if(!B.areEqual(d.dims,[t.n,l,u]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let p=e[2].dims;if(B.size(p)!==t.n*l)throw new Error("scales input size error.");if(e.length===4){let o=e[3].dims,r=t.n*(t.bits===8?l:Math.floor((l*t.bits+7)/8));if(B.size(o)!==r)throw new Error("zeroPoints input size error.")}},ew=(e,t)=>{let n=e[0].dims,a=n.length,l=n[a-2],u=t.k,d=t.n,p=n.slice(0,a-2),o=B.size(p),r=e[1].dims[2]/4,i=e[0].dataType,s=We(t.k),c=We(r),h=We(d),m=p.concat([l,d]),b=l>1&&d/h%2===0?2:1,x=B.size(m)/h/b,v=64,_=[],I=[o,l,u/s],O=B.convertShape(e[1].dims).slice();O.splice(-1,1,r/c),_.push(...oe(I)),_.push(...oe(O)),_.push(...oe(e[2].dims)),e.length===4&&_.push(...oe(B.convertShape(e[3].dims)));let E=[o,l,d/h];_.push(...oe(E));let A=k=>{let T=I.length,M=L("a",e[0].dataType,T,s),F=L("b",12,O.length,c),J=L("scales",e[2].dataType,e[2].dims.length),K=[M,F,J],C=e.length===4?L("zero_points",12,e[3].dims.length):void 0;C&&K.push(C);let R=E.length,$=te("output",e[0].dataType,R,h),z=Qe(e[0].dataType),G=(()=>{switch(s){case 1:return`array<${z}, 8>`;case 2:return`mat4x2<${z}>`;case 4:return`mat2x4<${z}>`;default:throw new Error(`${s}-component is not supported.`)}})(),re=Math.floor(32/t.bits),V=Math.floor(re/8),ee=()=>{let X="";for(let q=0;q<V;q++){let le=q*t.bits*4,Pe=le+t.bits;X+=`
          // reuse a data (pass ${q})
            var input_offset${q>0?q:""} = ${q===0?M.indicesToOffset(`${M.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${q>0?q:""}: ${G};
            for (var j${q>0?q:""}: u32 = 0; j${q>0?q:""} < ${8/s}; j${q>0?q:""}++) {
              a_data${q>0?q:""}[j${q>0?q:""}] = ${M.getByOffset(`input_offset${q>0?q:""}`)};
              input_offset${q>0?q:""}++;
            }
          `;for(let xe=0;xe<h*b;xe++)X+=`
            b_value = ${c===1?`b${xe}_data`:`b${xe}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${q*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${le}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${Pe}u) & b_mask);`}
            b_quantized_values = ${G}(${Array.from({length:4},(tt,pt)=>`${z}(b_value_lower[${pt}]), ${z}(b_value_upper[${pt}])`).join(", ")});
            b_dequantized_values = ${s===1?`${G}(${Array.from({length:8},(tt,pt)=>`(b_quantized_values[${pt}] - ${C?`zero_point${xe}`:"zero_point"}) * scale${xe}`).join(", ")});`:`(b_quantized_values - ${G}(${Array(8).fill(`${C?`zero_point${xe}`:"zero_point"}`).join(",")})) * scale${xe};`};
            workgroup_shared[local_id.x * ${b} + ${Math.floor(xe/h)}]${h>1?`[${xe%h}]`:""} += ${Array.from({length:8/s},(tt,pt)=>`${s===1?`a_data${q>0?q:""}[${pt}] * b_dequantized_values[${pt}]`:`dot(a_data${q>0?q:""}[${pt}], b_dequantized_values[${pt}])`}`).join(" + ")};
          `}return X},U=()=>{let X=`
            var col_index = col * ${h};
            ${C?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${z}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            `;for(let q=0;q<h*b;q++)X+=`
            let scale${q} = ${J.getByOffset("col_index * nBlocksPerCol + block")};
            ${C?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${C.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${q} = ${z}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return X},W=()=>{let X=`col_index = col * ${h};`;for(let q=0;q<h*b;q++)X+=`
            let b${q}_data = ${F.getByIndices(`${F.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return X+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${G};
            var b_dequantized_values: ${G};`,X};return`
        var<workgroup> workgroup_shared: array<${$.type.value}, ${b*v}>;
        ${k.declareVariables(...K,$)}
        ${k.mainStart([v,1,1])}
          let output_indices = ${$.offsetToIndices(`(global_idx / ${v}) * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/s};
            ${U()}
            for (var word: u32 = 0; word < ${r}; word += ${c}) {
              ${W()}
              for (var i: u32 = 0; i < ${c}; i++) {
                ${ee()}
                word_offset += ${re/s};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${b}) {
            var output_value: ${$.type.value} = ${$.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${b};
            }
            ${$.setByIndices(`${$.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${s};${c};${h};${b};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:i}],dispatchGroup:{x},programUniforms:_}),getShaderSource:A}},tw=(e,t)=>{let n=e[0].dims,a=n.length,l=n[a-2],u=t.k,d=t.n,p=n.slice(0,a-2),o=B.size(p),r=e[1].dims[2]/4,i=e[0].dataType,s=We(t.k),c=We(r),h=p.concat([l,d]),m=128,b=d%8===0?8:d%4===0?4:1,x=m/b,v=Math.floor(32/t.bits),_=x*c*v,I=_/s,O=_/t.blockSize,E=B.size(h)/b,A=[],k=[o,l,u/s],T=B.convertShape(e[1].dims).slice();T.splice(-1,1,r/c),A.push(...oe(k)),A.push(...oe(T)),A.push(...oe(e[2].dims)),e.length===4&&A.push(...oe(B.convertShape(e[3].dims)));let M=[o,l,d];A.push(...oe(M));let F=J=>{let K=k.length,C=L("a",e[0].dataType,K,s),R=L("b",12,T.length,c),$=L("scales",e[2].dataType,e[2].dims.length),z=[C,R,$],G=e.length===4?L("zero_points",12,e[3].dims.length):void 0;G&&z.push(G);let re=M.length,V=te("output",e[0].dataType,re),ee=Qe(e[0].dataType),U=()=>{switch(s){case 1:return`
          let a_data0 = vec4<${ee}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ee}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ee}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ee}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${s}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${C.type.value}, ${I}>;
        var<workgroup> inter_results: array<array<${V.type.value}, ${x}>, ${b}>;
        ${J.declareVariables(...z,V)}
        ${J.mainStart([x,b,1])}
          let output_indices = ${V.offsetToIndices(`workgroup_index * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${O} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${I};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${I}; a_offset += ${m})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${C.getByIndices(`${C.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${C.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${O} + local_id.x;
            ${G?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${G.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ee}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${ee}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${$.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${R.getByIndices(`${R.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/s};
            for (var i: u32 = 0; i < ${c}; i++) {
              let b_value = ${c===1?"b_data":"b_data[i]"};
              ${(()=>{let W=Math.floor(v/8),X="";for(let q=0;q<W;q++){let le=q*t.bits*4,Pe=le+t.bits;X+=`
              ${U()}
              {${t.bits===2?`
                let half_word = b_value >> ${q*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${le}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${Pe}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${ee}>(${Array.from({length:4},(xe,tt)=>`${ee}(b_value_lower[${tt}]), ${ee}(b_value_upper[${tt}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${ee}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(xe,tt)=>`${`dot(a_data${tt}, b_dequantized_values[${tt}])`}`).join(" + ")};
              }
              word_offset += ${8/s};`}return X})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${b}) {
            var output_value: ${V.type.value} = ${V.type.value}(0);
            for (var b = 0u; b < ${x}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${V.setByIndices(`${V.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${s};${c};${x};${b}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:h,dataType:i}],dispatchGroup:{x:E},programUniforms:A}),getShaderSource:F}},rw=(e,t)=>{Q_(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(tw(e.inputs,t)):e.compute(ew(e.inputs,t))},nw=e=>Ee(e)}),iw,ow,sw,aw,uw,lw,dw,pw,cw,cI=N(()=>{"use strict";se(),ae(),de(),iw=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},ow=(e,t,n)=>{let a="";for(let l=t-1;l>=0;--l)a+=`
            k = i32(${e.indicesGet("indices",l)}) - ${ne("uniforms.pads",l,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${ne("uniforms.x_shape",l,t)})) {
              break;
            }
            offset += k * i32(${ne("uniforms.x_strides",l,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${a}
            value = x[offset];
          }
      `},sw=(e,t,n)=>{let a="";for(let l=t-1;l>=0;--l)a+=`
                k = i32(${e.indicesGet("indices",l)}) - ${ne("uniforms.pads",l,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${ne("uniforms.x_shape",l,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${ne("uniforms.x_shape",l,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${ne("uniforms.x_strides",l,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},aw=(e,t,n)=>{let a="";for(let l=t-1;l>=0;--l)a+=`
                k = i32(${e.indicesGet("indices",l)}) - ${ne("uniforms.pads",l,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${ne("uniforms.x_shape",l,t)})) {
                  k = i32(${ne("uniforms.x_shape",l,t)}) - 1;
                }
                offset += k * i32(${ne("uniforms.x_strides",l,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},uw=(e,t,n)=>{let a="";for(let l=t-1;l>=0;--l)a+=`
                k = i32(${e.indicesGet("indices",l)}) - ${ne("uniforms.pads",l,n)};
                if (k < 0)  {
                  k += i32(${ne("uniforms.x_shape",l,t)}]);
                }
                if (k >= i32(${ne("uniforms.x_shape",l,t)})) {
                  k -= i32(${ne("uniforms.x_shape",l,t)});
                }
                offset += k * i32(${ne("uniforms.x_strides",l,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},lw=(e,t,n)=>{switch(n.mode){case 0:return ow(e,t,n.pads.length);case 1:return sw(e,t,n.pads.length);case 2:return aw(e,t,n.pads.length);case 3:return uw(e,t,n.pads.length);default:throw new Error("Invalid mode")}},dw=(e,t)=>{let n=B.padShape(e[0].dims.slice(),t.pads),a=e[0].dims,l=B.size(n),u=[{type:12,data:l},{type:6,data:t.pads}],d=e.length>=3&&e[2].data;t.mode===0&&u.push({type:d?e[2].dataType:1,data:t.value}),u.push(...oe(e[0].dims,n));let p=["rank"],o=r=>{let i=te("output",e[0].dataType,n.length),s=L("x",e[0].dataType,a.length),c=s.type.value,h=lw(i,a.length,t),m=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&m.push({name:"constant_value",type:d?c:"f32"}),`
            ${r.registerUniforms(m).declareVariables(s,i)}
            ${r.mainStart()}
            ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${i.offsetToIndices("global_idx")};

            var value = ${c}(0);
            ${h}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${d}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(n)/64)},programUniforms:u}),getShaderSource:o}},pw=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),a=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,l=e[0].dims.length,u=new Int32Array(2*l).fill(0);if(e.length>=4){let p=e[3].getBigInt64Array();for(let o=0;o<p.length;o++)u[Number(p[o])]=Number(n[o]),u[Number(p[o])+l]=Number(n[o+p.length])}else n.forEach((p,o)=>u[Number(o)]=Number(p));let d=[];return u.forEach(p=>d.push(p)),{mode:t.mode,value:a,pads:d}}else return t},cw=(e,t)=>{iw(e.inputs);let n=pw(e.inputs,t);e.compute(dw(e.inputs,n),{inputs:[0]})}}),si,pu,cu,hu,fu,hw,fw,mu,gu,mw,gw,bu,bw,yw,yu,_w,ww,vw,xw,hI=N(()=>{"use strict";st(),se(),ae(),de(),si=e=>{if(fe.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},pu=(e,t,n)=>{let a=t.format==="NHWC",l=e.dims.slice();a&&l.splice(1,0,l.pop());let u=Object.hasOwnProperty.call(t,"dilations"),d=t.kernelShape.slice(),p=t.strides.slice(),o=u?t.dilations.slice():[],r=t.pads.slice();Gi.adjustPoolAttributes(n,l,d,p,o,r);let i=Gi.computePoolOutputShape(n,l,p,o,d,r,t.autoPad,t.ceilMode),s=Object.assign({},t);u?Object.assign(s,{kernelShape:d,strides:p,pads:r,dilations:o,cacheKey:t.cacheKey}):Object.assign(s,{kernelShape:d,strides:p,pads:r,cacheKey:t.cacheKey});let c=i.slice();return c.push(c.splice(1,1)[0]),[s,a?c:i]},cu=(e,t)=>{let n=t.format==="NHWC",a=B.size(e),l=B.size(t.kernelShape),u=[{type:12,data:a},{type:12,data:l}],d=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let p=t.kernelShape[t.kernelShape.length-1],o=t.strides[t.strides.length-1],r=t.pads[t.pads.length/2-1],i=t.pads[t.pads.length-1],s=!!(r+i);u.push({type:12,data:p},{type:12,data:o},{type:12,data:r},{type:12,data:i}),d.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let c=!1;if(t.kernelShape.length===2){let h=t.kernelShape[t.kernelShape.length-2],m=t.strides[t.strides.length-2],b=t.pads[t.pads.length/2-2],x=t.pads[t.pads.length-2];c=!!(b+x),u.push({type:12,data:h},{type:12,data:m},{type:12,data:b},{type:12,data:x}),d.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[u,d,!0,s,c]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let p=B.computeStrides(t.kernelShape);u.push({type:12,data:p},{type:12,data:t.pads},{type:12,data:t.strides}),d.push({name:"kernelStrides",type:"u32",length:p.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let o=t.pads.reduce((r,i)=>r+i);return[u,d,!!o,!1,!1]}},hu=(e,t,n,a,l,u,d,p,o,r,i,s)=>{let c=l.format==="NHWC",h=t.type.value,m=te("output",t.type.tensor,a);if(l.kernelShape.length<=2){let b="",x="",v="",_=n-(c?2:1);if(i?b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${_}] < 0 || xIndices[${_}]
                      >= uniforms.x_shape[${_}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${u}
                }`:b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${u}
                }`,l.kernelShape.length===2){let I=n-(c?3:2);s?x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${I}] < 0 || xIndices[${I}] >= uniforms.x_shape[${I}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${e.registerUniforms(o).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${h}(${p});
              var pad = 0;
              ${x}
              ${b}
              ${v}
              ${d}

              output[global_idx] = value;
            }`}else{if(c)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let b=l.kernelShape.length,x=l.pads.length,v="";return r?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${u}
              }`:v=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${u}
            `,`
            ${e.registerUniforms(o).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${b}>;

              var value = ${h}(${p});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${b-1}u; j++) {
                  offsets[j] = offset / ${ne("uniforms.kernelStrides","j",b)};
                  offset -= offsets[j] * ${ne("uniforms.kernelStrides","j",b)};
                }
                offsets[${b-1}] = offset;

                isPad = false;
                for (var j = ${n-b}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${ne("uniforms.strides",`j - ${n-b}u`,b)}
                    + offsets[j - ${n-b}u] - ${ne("uniforms.pads","j - 2u",x)};
                  ${v}
              }
              ${d}

              output[global_idx] = value;
            }`}},fu=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,hw=e=>`${fu(e)};${e.countIncludePad}`,fw=e=>`${fu(e)};${e.storageOrder};${e.dilations}`,mu=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),gu=(e,t,n,a)=>{let[l,u]=pu(t,a,n),d=L("x",t.dataType,t.dims.length),p=d.type.value,o="value += x_val;",r="";l.countIncludePad?r+=`value /= ${p}(uniforms.kernelSize);`:r+=`value /= ${p}(i32(uniforms.kernelSize) - pad);`;let[i,s,c,h,m]=cu(u,l);i.push(...oe(t.dims,u));let b=["rank"];return{name:e,shaderCache:{hint:`${a.cacheKey};${c};${h};${m}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(u)/64)},programUniforms:i}),getShaderSource:x=>hu(x,d,t.dims.length,u.length,l,o,r,0,s,c,h,m)}},mw=e=>{let t=e.count_include_pad!==0,n=mu(e);if(n.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel");let a={countIncludePad:t,...n,cacheKey:""};return{...a,cacheKey:hw(a)}},gw=(e,t)=>{si(e.inputs),e.compute(gu("AveragePool",e.inputs[0],!1,t))},bu={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},bw=e=>{let t=e.format;return{format:t,...bu,cacheKey:t}},yw=(e,t)=>{si(e.inputs),e.compute(gu("GlobalAveragePool",e.inputs[0],!0,t))},yu=(e,t,n,a)=>{let[l,u]=pu(t,a,n),d=`
      value = max(x_val, value);
    `,p="",o=L("x",t.dataType,t.dims.length),r=["rank"],[i,s,c,h,m]=cu(u,l);return i.push(...oe(t.dims,u)),{name:e,shaderCache:{hint:`${a.cacheKey};${c};${h};${m}`,inputDependencies:r},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(u)/64)},programUniforms:i}),getShaderSource:b=>hu(b,o,t.dims.length,u.length,l,d,p,t.dataType===10?-65504:-1e5,s,c,h,m)}},_w=(e,t)=>{si(e.inputs),e.compute(yu("MaxPool",e.inputs[0],!1,t))},ww=e=>{let t=e.storage_order,n=e.dilations,a=mu(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(a.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel");let l={storageOrder:t,dilations:n,...a,cacheKey:""};return{...l,cacheKey:fw(l)}},vw=e=>{let t=e.format;return{format:t,...bu,cacheKey:t}},xw=(e,t)=>{si(e.inputs),e.compute(yu("GlobalMaxPool",e.inputs[0],!0,t))}}),$w,Tw,Iw,Sw,fI=N(()=>{"use strict";se(),ae(),He(),de(),$w=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((n,a)=>n===e[2].dims[a]).reduce((n,a)=>n&&a,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((l,u)=>u===t.axis||l===e[0].dims[u]).reduce((l,u)=>l&&u,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],a=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/a)||t.blockSize>Math.ceil(n/(a-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Tw=(e,t)=>{let n=B.normalizeAxis(t.axis,e[0].dims.length),a=e[0].dataType,l=a===3,u=e[0].dims,d=e[1].dataType,p=B.size(u),o=a===3||a===2,r=o?[Math.ceil(B.size(e[0].dims)/4)]:e[0].dims,i=e[1].dims,s=e.length>2?e[2]:void 0,c=s?o?[Math.ceil(B.size(s.dims)/4)]:s.dims:void 0,h=i.length===0||i.length===1&&i[0]===1,m=h===!1&&i.length===1,b=We(p),x=h&&(!o||b===4),v=x?b:1,_=x&&!o?b:1,I=L("input",o?12:a,r.length,_),O=L("scale",d,i.length),E=s?L("zero_point",o?12:a,c.length):void 0,A=te("output",d,u.length,v),k=[I,O];E&&k.push(E);let T=[r,i];s&&T.push(c);let M=[{type:12,data:p/v},{type:12,data:n},{type:12,data:t.blockSize},...oe(...T,u)],F=J=>{let K=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${J.registerUniforms(K).declareVariables(...k,A)}
      ${J.mainStart()}
          ${J.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${A.offsetToIndices("global_idx")};

          // Set input x
          ${o?`
            let input = ${I.getByOffset("global_idx / 4")};
            let x_vec = ${l?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${I.getByOffset("global_idx")};`};

          // Set scale input
          ${h?`let scale_value= ${O.getByOffset("0")}`:m?`
            let scale_index = ${A.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${O.getByOffset("scale_index")};`:`
            var scale_indices: ${O.type.indices} = output_indices;
            let index = ${O.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${O.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${O.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${E?h?o?`
                let zero_point_input = ${E.getByOffset("0")};
                let zero_point_vec =  ${l?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${E.getByOffset("0")}`:m?o?`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${E.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${l?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${E.getByOffset("zero_point_index")};`:o?`
                let zero_point_offset = ${O.indicesToOffset("scale_indices")};
                let zero_point_input = ${E.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${l?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${E.getByIndices("scale_indices")};`:`let zero_point_value = ${o?l?"i32":"u32":I.type.value}(0);`};
      // Compute and write output
      ${A.setByOffset("global_idx",`${A.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:E?["rank","rank","rank"]:["rank","rank"]},getShaderSource:F,getRunData:()=>({outputs:[{dims:u,dataType:d}],dispatchGroup:{x:Math.ceil(p/v/64),y:1,z:1},programUniforms:M})}},Iw=(e,t)=>{$w(e.inputs,t),e.compute(Tw(e.inputs,t))},Sw=e=>Ee({axis:e.axis,blockSize:e.blockSize})}),Ow,Ew,Pw,mI=N(()=>{"use strict";st(),se(),de(),Ow=(e,t,n)=>{let a=e===t,l=e<t&&n<0,u=e>t&&n>0;if(a||l||u)throw new Error("Range these inputs' contents are invalid.")},Ew=(e,t,n,a)=>{let l=Math.abs(Math.ceil((t-e)/n)),u=[l],d=l,p=[{type:12,data:d},{type:a,data:e},{type:a,data:n},...oe(u)],o=r=>{let i=te("output",a,u.length),s=i.type.value,c=[{name:"outputSize",type:"u32"},{name:"start",type:s},{name:"delta",type:s}];return`
        ${r.registerUniforms(c).declareVariables(i)}
        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${s}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${a}`},getShaderSource:o,getRunData:()=>({outputs:[{dims:u,dataType:a}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p})}},Pw=e=>{let t=0,n=0,a=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],a=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],a=e.inputs[2].getFloat32Array()[0]),fe.webgpu.validateInputContent&&Ow(t,n,a),e.compute(Ew(t,n,a,e.inputs[0].dataType),{inputs:[]})}}),Aw,kw,Dw,Nw,gI=N(()=>{"use strict";se(),ae(),He(),de(),Aw=(e,t,n,a)=>{if(e!=="none"&&a!=="i32"&&a!=="u32"&&a!=="f32")throw new Error(`Input ${a} is not supported with reduction ${e}.`);let l=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,u=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${n};`;case"add":return a==="i32"||a==="u32"?`atomicAdd(&${t}, bitcast<${a}>(${n}));`:`
              ${l}bitcast<${a}>(oldValue) + (${n})${u}`;case"max":return a==="i32"||a==="u32"?`atomicMax(&${t}, bitcast<${a}>(${n}));`:`
                ${l}max(bitcast<f32>(oldValue), (${n}))${u}`;case"min":return a==="i32"||a==="u32"?`atomicMin(&${t}, bitcast<${a}>(${n}));`:`${l}min(bitcast<${a}>(oldValue), (${n}))${u}`;case"mul":return`${l}(bitcast<${a}>(oldValue) * (${n}))${u}`;default:throw new Error(`Reduction ${e} is not supported.`)}},kw=(e,t)=>{let n=e[0].dims,a=e[1].dims,l=n,u=1,d=Math.ceil(B.sizeToDimension(a,a.length-1)/u),p=a[a.length-1],o=B.sizeFromDimension(n,p),r=[{type:12,data:d},{type:12,data:p},{type:12,data:o},...oe(e[1].dims,e[2].dims,l)],i=s=>{let c=L("indices",e[1].dataType,e[1].dims.length),h=L("updates",e[2].dataType,e[2].dims.length,u),m=t.reduction!=="none"&&t.reduction!==""?Ag("output",e[0].dataType,l.length):te("output",e[0].dataType,l.length,u);return`
      ${s.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(c,h,m)}
      ${s.mainStart()}
        ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${Aw(t.reduction,"output[data_offset + i]","value",m.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:r}),getShaderSource:i}},Dw=e=>Ee({reduction:e.reduction}),Nw=(e,t)=>{e.compute(kw(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Cw,zw,Rw,_u,Bw,Mw,Fw,jw,Lw,Vw,Uw,qw,wu,Gw,Hw,Ww,Kw,Xw,Zw,Jw,bI=N(()=>{"use strict";se(),ae(),He(),de(),Cw=(e,t)=>{if(e.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},zw=(e,t,n)=>{t.every(l=>l>=0&&l<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let a=new Array(n).fill(1);return t.forEach((l,u)=>a[l]=e[u]),a},Rw=(e,t,n,a,l,u)=>{let[d,p,o]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],r=e[0].dims.length;if(d>0&&e.length>d&&e[d].dims.length>0)e[d].getFloat32Array().forEach(i=>u.push(i));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(p>0&&e.length>p&&e[p].dims.length===1&&e[p].dims[0]>0){if(e[p].getFloat32Array().forEach(i=>a.push(i)),a.length!==0&&a.length!==r&&n>=18&&a.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Cw(a,t),t.axes.length>0&&zw(a,t.axes,r).forEach((i,s)=>a[s]=i)}if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0&&(e[o].getBigInt64Array().forEach(i=>l.push(Number(i))),l.length!==0&&l.length!==r&&n>=18&&l.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(l.length!==0&&l.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof a<"u"&&typeof l<"u"&&a.length>0&&l.length>r)throw new Error("Resize requires only of scales or sizes to be specified")},_u=(e,t,n,a)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${a}(big / (${n}));
  let fract = ${a}(big % (${n})) / ${a}(${n});
  return whole + fract;
`,Bw=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${_u("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${_u("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Mw=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Fw=(e,t,n)=>{let a=new Array(n).fill(0).concat(new Array(n).fill(1)),l=e.length===0?a:e.slice();return t.length>0?(t.forEach((u,d)=>{a[u]=l[d],a[d+n]=l[t.length+d]}),a):l},jw=(e,t,n,a)=>{let l=[];if(n.length>0)if(a.length>0){if(e.forEach(u=>l.push(u)),Math.max(...a)>e.length)throw new Error("axes is out of bound");a.forEach((u,d)=>l[u]=n[d])}else n.forEach(u=>l.push(u));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");l=e.map((u,d)=>Math.round(u*t[d]))}return l},Lw=(e,t,n)=>{let a=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(u=>t[u]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(u=>t[u]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let l=e.slice();return n.axes.length>0?(n.axes.forEach(u=>t[u]=a),n.axes.forEach(u=>l[u]=Math.round(e[u]*t[u]))):(t.fill(a,0,t.length),l.forEach((u,d)=>l[d]=Math.round(u*t[d]))),l},Vw=(e,t,n,a,l)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${ne("uniforms.scales","i",a)};
        var roi_low = ${ne("uniforms.roi","i",l)};
        var roi_hi = ${ne("uniforms.roi",`i + ${t.length}`,l)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${ne("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${ne("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Uw=(e,t,n,a,l,u,d)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${a.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${ne("uniforms.scales","i",l)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${ne("uniforms.roi","i",u)};
          var roi_hi = ${ne("uniforms.roi",`i + ${n.length}`,u)};
          var input_shape_i = ${ne("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${ne("uniforms.output_shape","i",a.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${d} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,qw=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${ne("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,wu=(e,t,n,a)=>e.rank>a?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",Gw=(e,t,n,a,l)=>{let[u,d,p,o]=n.length===2?[-1,0,1,-1]:[0,2,3,1],r=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${r} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(row, ${n[d]} - 1))`)};
      ${e.indicesSet("input_indices",p,`max(0, min(col, ${n[p]} - 1))`)};
      ${wu(e,o,u,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${r} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${r} = originalIndices[${d}];
      var col:${r} = originalIndices[${p}];
      ${a?`if (row < 0 || row > (${n[d]} - 1) || col < 0 || col > (${n[p]} - 1)) {
        return ${l};
      }`:""};
      row = max(0, min(row, ${n[d]} - 1));
      col = max(0, min(col, ${n[p]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${o}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${u}])`:"0"};
      var x11: ${r} = getInputValue(batch, channel, row1, col1);
      var x12: ${r} = getInputValue(batch, channel, row1, col2);
      var x21: ${r} = getInputValue(batch, channel, row2, col1);
      var x22: ${r} = getInputValue(batch, channel, row2, col2);
      var dx1: ${r} = abs(row - ${r}(row1));
      var dx2: ${r} = abs(${r}(row2) - row);
      var dy1: ${r} = abs(col - ${r}(col1));
      var dy2: ${r} = abs(${r}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Hw=(e,t,n,a,l,u,d,p,o,r)=>{let i=n.length===2,s=!0,[c,h]=i?[0,1]:s?[2,3]:[1,2],m=e.type.value,b=x=>{let v=x===c?"row":"col";return`
      fn ${v}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${m} {
        var output_index = ${t.indicesGet("output_indices",x)};
        var originalIdx: ${m} = getOriginalCoordinateFromResizedCoordinate(output_index, ${l[x]},
        ${a[x]}, ${n[x]}, ${u[x]}, ${u[x]} + ${n.length});
        var fractOriginalIdx: ${m} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${p} && (originalIdx < 0 || originalIdx > (${n[x]} - 1))) {
          return ${o};
        }
        var data: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${v}: ${m} = originalIdx + ${m}(i);
          if (${v} < 0 || ${v} >= ${n[x]}) {
            ${r?`coefs[i + 1] = 0.0;
                        continue;`:p?`return ${o};`:`${v} = max(0, min(${v}, ${n[x]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",x,`u32(${v})`)};
          data[i + 1] = ${x===c?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${b(c)};
    ${b(h)};
  fn getCubicInterpolationCoefs(s: ${m}) -> array<${m}, 4> {
    var absS = abs(s);
    var coeffs: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${m} = 1.0 - absS;
    var twoMinusAbsS: ${m} = 2.0 - absS;
    var onePlusAbsS: ${m} = 1.0 + absS;
    coeffs[0] = ((${d} * onePlusAbsS - 5 * ${d}) * onePlusAbsS + 8 * ${d}) * onePlusAbsS - 4 * ${d};
    coeffs[1] = ((${d} + 2) * absS - (${d} + 3)) * absS * absS + 1;
    coeffs[2] = ((${d} + 2) * oneMinusAbsS - (${d} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${d} * twoMinusAbsS - 5 * ${d}) * twoMinusAbsS + 8 * ${d}) * twoMinusAbsS - 4 * ${d};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${m}, 4>, coefs: array<${m}, 4>) -> ${m} {
    var coefsSum: ${m} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${m} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Ww=(e,t,n,a,l)=>{let[u,d,p,o,r]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],i=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${i} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(depth, ${n[d]} - 1))`)};
      ${e.indicesSet("input_indices",p,`max(0, min(height, ${n[p]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(width, ${n[o]} - 1))`)};
      ${wu(e,r,u,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${i} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${i} = originalIndices[${d}];
      var height:${i} = originalIndices[${p}];
      var width:${i} = originalIndices[${o}];
      ${a?`if (depth < 0 || depth > (${n[d]} - 1) || height < 0 || height > (${n[p]} - 1) || width < 0 || (width > ${n[o]} - 1)) {
      return ${l};
        }`:""};

    depth = max(0, min(depth, ${n[d]} - 1));
      height = max(0, min(height, ${n[p]} - 1));
      width = max(0, min(width, ${n[o]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${r}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${u}])`:"0"};

      var x111: ${i} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${i} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${i} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${i} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${i} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${i} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${i} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${i} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${i} = abs(depth - ${i}(depth1));
      var dx2: ${i} = abs(${i}(depth2) - depth);
      var dy1: ${i} = abs(height - ${i}(height1));
      var dy2: ${i} = abs(${i}(height2) - height);
      var dz1: ${i} = abs(width - ${i}(width1));
      var dz2: ${i} = abs(${i}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Kw=(e,t,n,a,l,u)=>{let d=e.dims,p=Fw(u,t.axes,d.length),o=jw(d,a,l,t.axes),r=a.slice();a.length===0&&(r=d.map((_,I)=>_===0?1:o[I]/_),t.keepAspectRatioPolicy!=="stretch"&&(o=Lw(d,r,t)));let i=te("output",e.dataType,o.length),s=L("input",e.dataType,d.length),c=B.size(o),h=d.length===o.length&&d.every((_,I)=>_===o[I]),m=t.coordinateTransformMode==="tf_crop_and_resize",b=t.extrapolationValue,x=s.type.value,v=_=>`
      ${h?"":`
      ${Bw(t.coordinateTransformMode,x)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${qw(s,d)};
              ${Mw(t.nearestMode,n,x)};
              ${Uw(s,i,d,o,r.length,p.length,m)};
              `;case"linear":return`
              ${Vw(i,d,o,r.length,p.length)};
              ${(()=>{if(d.length===2||d.length===4)return`${Gw(s,i,d,m,b)}`;if(d.length===3||d.length===5)return`${Ww(s,i,d,m,b)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(d.length===2||d.length===4)return`${Hw(s,i,d,o,r,p,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${_.registerUniform("output_size","u32").registerUniform("scales","f32",r.length).registerUniform("roi","f32",p.length).declareVariables(s,i)}
      ${_.mainStart()}
        ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${h?"output[global_idx] = input[global_idx];":`
        let output_indices = ${i.offsetToIndices("global_idx")};
        var input_indices: ${s.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${s.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${d.length===2||d.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${r.length>0?t.mode==="cubic"?r:r.length:""}|${l.length>0?l:""}|${p.length>0?p:""}|${h}|${t.mode==="nearest"?d.length:d}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:o,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},{type:1,data:r},{type:1,data:p},...oe(d,o)]})}},Xw=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},Zw=(e,t)=>{let n=[],a=[],l=[],u=Xw(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Rw(e.inputs,t,u,n,a,l),e.compute(Kw(e.inputs[0],t,u,n,a,l),{inputs:[0]})},Jw=e=>{let t=e.antialias,n=e.axes,a=e.coordinateTransformMode,l=e.cubicCoeffA,u=e.excludeOutside!==0,d=e.extrapolationValue,p=e.keepAspectRatioPolicy,o=e.mode,r=e.nearestMode===""?"simple":e.nearestMode;return Ee({antialias:t,axes:n,coordinateTransformMode:a,cubicCoeffA:l,excludeOutside:u,extrapolationValue:d,keepAspectRatioPolicy:p,mode:o,nearestMode:r})}}),Yw,Qw,ev,yI=N(()=>{"use strict";se(),ae(),de(),Yw=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],a=e[2];if(t.dataType!==n.dataType||t.dataType!==a.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let l=t.dims[t.dims.length-1],u=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==l)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==u)throw new Error("Skip must have the same sequence length as input");if(a.dims.length!==1)throw new Error("Gamma must be 1D");if(a.dims[a.dims.length-1]!==l)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let d=e[3];if(d.dims.length!==1)throw new Error("Beta must be 1D");if(d.dims[d.dims.length-1]!==l)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let d=e[4];if(d.dims.length!==1)throw new Error("Bias must be 1D");if(d.dims[d.dims.length-1]!==l)throw new Error("Bias must have the same hidden size as input")}},Qw=(e,t,n,a)=>{let l=t.simplified,u=e[0].dims,d=B.size(u),p=u,o=d,r=u.slice(-1)[0],i=a?u.slice(0,-1).concat(1):[],s=!l&&e.length>3,c=e.length>4,h=a&&n>1,m=a&&n>2,b=n>3,x=64,v=We(r),_=[{type:12,data:o},{type:12,data:v},{type:12,data:r},{type:1,data:t.epsilon}],I=E=>{let A=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],k=[L("x",e[0].dataType,e[0].dims,v),L("skip",e[1].dataType,e[1].dims,v),L("gamma",e[2].dataType,e[2].dims,v)];s&&k.push(L("beta",e[3].dataType,e[3].dims,v)),c&&k.push(L("bias",e[4].dataType,e[4].dims,v)),k.push(te("output",e[0].dataType,p,v)),h&&k.push(te("mean_output",1,i)),m&&k.push(te("inv_std_output",1,i)),b&&k.push(te("input_skip_bias_sum",e[0].dataType,p,v));let T=Qe(e[0].dataType),M=Qe(1,v);return`

      ${E.registerUniforms(A).declareVariables(...k)}
      var<workgroup> sum_shared : array<${M}, ${x}>;
      var<workgroup> sum_squared_shared : array<${M}, ${x}>;

      ${E.mainStart([x,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${x};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${x};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${x-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${c?"bias[offset1d + i]":T+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${b?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${wn(T,v,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${x};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${ur("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${ur("square_sum",v)} / f32(uniforms.hidden_size) ${l?"":"- mean * mean"} + uniforms.epsilon);
        ${h?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${l?"":`- ${T}(mean)`}) *
            ${T}(inv_std_dev) * gamma[offset1d + i]
            ${s?"+ beta[offset1d + i]":""};
        }
      }`},O=[{dims:p,dataType:e[0].dataType}];return n>1&&O.push({dims:i,dataType:1}),n>2&&O.push({dims:i,dataType:1}),n>3&&O.push({dims:u,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${h};${m};${b}`,inputDependencies:e.map((E,A)=>"type")},getShaderSource:I,getRunData:()=>({outputs:O,dispatchGroup:{x:Math.ceil(o/r)},programUniforms:_})}},ev=(e,t)=>{Yw(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(Qw(e.inputs,t,e.outputCount,!1),{outputs:n})}}),tv,ai,rv,vu,nv,iv,ov,sv,_I=N(()=>{"use strict";se(),ae(),He(),de(),tv=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((n,a)=>{if(e[a+1].dataType!==6&&e[a+1].dataType!==7)throw new Error(`Input ${a} must be an array of int32 or int64`)})},ai=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(a=>n.push(Number(a)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(a=>n.push(Number(a)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return n},rv=(e,t)=>{if(e.length>1){let n=ai(e,1),a=ai(e,2),l=ai(e,3);return l.length===0&&(l=[...Array(e[0].dims.length).keys()]),Ee({starts:n,ends:a,axes:l})}else return t},vu=(e,t,n,a,l)=>{let u=e;return e<0&&(u+=n[a[t]]),l[t]<0?Math.max(0,Math.min(u,n[a[t]]-1)):Math.max(0,Math.min(u,n[a[t]]))},nv=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${ne("uniforms.input_shape","i",n.length)};
            let steps_i = ${ne("uniforms.steps","i",n.length)};
            let signs_i = ${ne("uniforms.signs","i",n.length)};
            let starts_i = ${ne("uniforms.starts","i",n.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,iv=(e,t)=>{let n=e[0].dims,a=B.size(n),l=t.axes.length>0?B.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],u=ai(e,4);u.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),u.length===0&&(u=Array(l.length).fill(1));let d=t.starts.map((v,_)=>vu(v,_,n,l,u)),p=t.ends.map((v,_)=>vu(v,_,n,l,u));if(l.length!==d.length||l.length!==p.length)throw new Error("start, ends and axes should have the same number of elements");if(l.length!==n.length)for(let v=0;v<n.length;++v)l.includes(v)||(d.splice(v,0,0),p.splice(v,0,n[v]),u.splice(v,0,1));let o=u.map(v=>Math.sign(v));u.forEach((v,_,I)=>{if(v<0){let O=(p[_]-d[_])/v,E=d[_],A=E+O*u[_];d[_]=A,p[_]=E,I[_]=-v}});let r=n.slice(0);l.forEach((v,_)=>{r[v]=Math.ceil((p[v]-d[v])/u[v])});let i={dims:r,dataType:e[0].dataType},s=te("output",e[0].dataType,r.length),c=L("input",e[0].dataType,e[0].dims.length),h=B.size(r),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:d.length},{name:"signs",type:"i32",length:o.length},{name:"steps",type:"u32",length:u.length}],b=[{type:12,data:h},{type:12,data:d},{type:6,data:o},{type:12,data:u},...oe(e[0].dims,r)],x=v=>`
      ${v.registerUniforms(m).declareVariables(c,s)}
        ${nv(c,s,n)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${s.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${s.setByOffset("global_idx",c.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${o.length}_${d.length}_${u.length}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[i],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:b})}},ov=(e,t)=>{tv(e.inputs,t);let n=rv(e.inputs,t);e.compute(iv(e.inputs,n),{inputs:[0]})},sv=e=>{let t=e.starts,n=e.ends,a=e.axes;return Ee({starts:t,ends:n,axes:a})}}),av,uv,lv,dv,wI=N(()=>{"use strict";se(),ae(),He(),lr(),de(),av=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},uv=(e,t)=>{let n=e.inputs[0],a=n.dims,l=B.size(a),u=a.length,d=B.normalizeAxis(t.axis,u),p=d<a.length-1,o,r=[];p?(r=Array.from({length:u},(k,T)=>T),r[d]=u-1,r[u-1]=d,o=e.compute(_t(n,r),{inputs:[n],outputs:[-1]})[0]):o=n;let i=o.dims,s=i[u-1],c=l/s,h=We(s),m=s/h,b=64;c===1&&(b=256);let x=(k,T)=>T===4?`max(max(${k}.x, ${k}.y), max(${k}.z, ${k}.w))`:T===2?`max(${k}.x, ${k}.y)`:T===3?`max(max(${k}.x, ${k}.y), ${k}.z)`:k,v=L("x",o.dataType,o.dims,h),_=te("result",o.dataType,o.dims,h),I=v.type.value,O=Qe(o.dataType)==="f32"?`var threadMax = ${I}(-3.4028234663852886e+38f);`:`var threadMax = ${I}(-65504.0h);`,E=k=>`
      var<workgroup> rowMaxShared : ${I};
      var<workgroup> rowSumShared : ${I};
      var<workgroup> threadShared : array<${I}, ${b}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${I} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${I}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${k.registerUniform("packedCols","i32").declareVariables(v,_)}
      ${k.mainStart(b)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${b};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${O}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${I}(${x("threadShared[0]",h)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${I}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${I}(${ur("threadShared[0]",h)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${I}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,A=e.compute({name:"Softmax",shaderCache:{hint:`${h};${b}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:i,dataType:o.dataType}],dispatchGroup:{x:c},programUniforms:[{type:6,data:m}]}),getShaderSource:E},{inputs:[o],outputs:[p?-1:0]})[0];p&&e.compute(_t(A,r),{inputs:[A]})},lv=(e,t)=>{av(e.inputs),uv(e,t)},dv=e=>Ee({axis:e.axis})}),xu,pv,cv,hv,fv,vI=N(()=>{"use strict";se(),ae(),de(),xu=e=>Array.from(e.getBigInt64Array(),Number),pv=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(xu(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},cv=(e,t)=>{let n=[];for(let a=0;a<e.length;++a)n.push(e[a]*t[a]);return n},hv=(e,t)=>{let n=e[0].dims,a=t??xu(e[1]),l=cv(n,a),u=B.size(l),d=e[0].dataType,p=L("input",d,n.length),o=te("output",d,l.length),r=i=>`
      const inputShape = ${p.indices(...n)};
      ${i.registerUniform("output_size","u32").declareVariables(p,o)}
      ${i.mainStart()}
      ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${o.offsetToIndices("global_idx")};
      var input_indices: ${p.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${p.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${o.indicesGet("output_indices","i")}  % input_dim_i;

        ${p.indicesSet("input_indices","i","input_dim_value")}
      }
      ${o.setByOffset("global_idx",p.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${a}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:[{type:12,data:u},...oe(e[0].dims,l)]}),getShaderSource:r}},fv=e=>{pv(e.inputs),e.compute(hv(e.inputs),{inputs:[0]})}}),mv,gv,bv,xI=N(()=>{"use strict";se(),ae(),de(),mv=(e,t,n,a,l)=>{let u=te("output_data",l,n.length,4),d=L("a_data",t[1].dataType,t[1].dims.length,4),p=L("b_data",t[2].dataType,t[2].dims.length,4),o=L("c_data",t[0].dataType,t[0].dims.length,4),r,i=(s,c,h)=>`select(${c}, ${s}, ${h})`;if(!a)r=u.setByOffset("global_idx",i(d.getByOffset("global_idx"),p.getByOffset("global_idx"),o.getByOffset("global_idx")));else{let s=(c,h,m="")=>{let b=`a_data[index_a${h}][component_a${h}]`,x=`b_data[index_b${h}][component_b${h}]`,v=`bool(c_data[index_c${h}] & (0xffu << (component_c${h} * 8)))`;return`
            let output_indices${h} = ${u.offsetToIndices(`global_idx * 4u + ${h}u`)};
            let offset_a${h} = ${d.broadcastedIndicesToOffset(`output_indices${h}`,u)};
            let offset_b${h} = ${p.broadcastedIndicesToOffset(`output_indices${h}`,u)};
            let offset_c${h} = ${o.broadcastedIndicesToOffset(`output_indices${h}`,u)};
            let index_a${h} = offset_a${h} / 4u;
            let index_b${h} = offset_b${h} / 4u;
            let index_c${h} = offset_c${h} / 4u;
            let component_a${h} = offset_a${h} % 4u;
            let component_b${h} = offset_b${h} % 4u;
            let component_c${h} = offset_c${h} % 4u;
            ${c}[${h}] = ${m}(${i(b,x,v)});
          `};l===9?r=`
            var data = vec4<u32>(0);
            ${s("data",0,"u32")}
            ${s("data",1,"u32")}
            ${s("data",2,"u32")}
            ${s("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:r=`
            ${s("output_data[global_idx]",0)}
            ${s("output_data[global_idx]",1)}
            ${s("output_data[global_idx]",2)}
            ${s("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(o,d,p,u)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${r}
      }`},gv=e=>{let t=e[1].dims,n=e[2].dims,a=e[0].dims,l=e[1].dataType,u=!(B.areEqual(t,n)&&B.areEqual(n,a)),d=t,p=B.size(t);if(u){let r=yn.calcShape(yn.calcShape(t,n,!1),a,!1);if(!r)throw new Error("Can't perform where op on the given tensors");d=r,p=B.size(d)}let o=Math.ceil(p/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:r=>mv(r,e,d,u,l),getRunData:()=>({outputs:[{dims:d,dataType:l}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:o},...oe(a,t,n,d)]})}},bv=e=>{e.compute(gv(e.inputs))}}),yv,$I=N(()=>{"use strict";R3(),Na(),B3(),M3(),F3(),j3(),L3(),H3(),K3(),X3(),Z3(),J3(),Y3(),Q3(),eI(),tI(),rI(),nI(),iI(),oI(),sI(),aI(),uI(),lI(),dI(),pI(),A_(),cI(),hI(),fI(),mI(),gI(),Aa(),bI(),j_(),yI(),_I(),wI(),B_(),vI(),lr(),Ba(),xI(),yv=new Map([["Abs",[Ub]],["Acos",[qb]],["Acosh",[Gb]],["Add",[Ny]],["ArgMax",[Eb,Da]],["ArgMin",[Ob,Da]],["Asin",[Hb]],["Asinh",[Wb]],["Atan",[Kb]],["Atanh",[Xb]],["Attention",[Cb]],["AveragePool",[gw,mw]],["BatchNormalization",[Mb]],["BiasAdd",[Lb]],["BiasSplitGelu",[Ay]],["Cast",[Jb,Zb]],["Ceil",[ey]],["Clip",[Qb]],["Concat",[Wy,Ky]],["Conv",[Za,Ka]],["ConvTranspose",[v0,y0]],["Cos",[ty]],["Cosh",[ry]],["CumSum",[$0,T0]],["DepthToSpace",[E0,P0]],["DequantizeLinear",[Iw,Sw]],["DFT",[R0,B0]],["Div",[Cy]],["Einsum",[U0,q0]],["Elu",[ny,ei]],["Equal",[zy]],["Erf",[iy]],["Exp",[oy]],["Expand",[K0]],["FastGelu",[Z0]],["Floor",[sy]],["FusedConv",[Za,Ka]],["Gather",[e_,Q0]],["GatherElements",[p_,d_]],["GatherBlockQuantized",[s_,a_]],["GatherND",[r_,n_]],["Gelu",[ay]],["Gemm",[m_,f_]],["GlobalAveragePool",[yw,bw]],["GlobalMaxPool",[xw,vw]],["Greater",[Fy]],["GreaterOrEqual",[Ly]],["GridSample",[T_,I_]],["GroupQueryAttention",[q_]],["HardSigmoid",[my,fy]],["HardSwish",[gy]],["InstanceNormalization",[W_]],["LayerNormalization",[Z_]],["LeakyRelu",[uy,ei]],["Less",[jy]],["LessOrEqual",[Vy]],["Log",[Ty]],["MatMul",[Y_]],["MatMulNBits",[rw,nw]],["MaxPool",[_w,ww]],["Mul",[Ry]],["MultiHeadAttention",[P_,O_]],["Neg",[dy]],["Not",[ly]],["Pad",[cw]],["Pow",[By]],["QuickGelu",[Oy,ei]],["Range",[Pw]],["Reciprocal",[py]],["ReduceMin",[xb]],["ReduceMean",[bb]],["ReduceMax",[vb]],["ReduceSum",[Tb]],["ReduceProd",[$b]],["ReduceL1",[yb]],["ReduceL2",[_b]],["ReduceLogSum",[Sb]],["ReduceLogSumExp",[wb]],["ReduceSumSquare",[Ib]],["Relu",[cy]],["Resize",[Zw,Jw]],["RotaryEmbedding",[F_]],["ScatterND",[Nw,Dw]],["Sigmoid",[hy]],["Sin",[by]],["Sinh",[yy]],["Slice",[ov,sv]],["SkipLayerNormalization",[ev]],["Split",[z_,R_]],["Sqrt",[_y]],["Softmax",[lv,dv]],["Sub",[My]],["Tan",[wy]],["Tanh",[vy]],["ThresholdedRelu",[$y,ei]],["Tile",[fv]],["Transpose",[Mg,Fg]],["Where",[bv]]])}),_v,TI=N(()=>{"use strict";st(),Yt(),de(),_v=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n,a,l){Lt(e.programInfo.name);let u=this.backend.device,d=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let p=[];for(let r of t)p.push({binding:p.length,resource:{buffer:r.buffer}});for(let r of n)p.push({binding:p.length,resource:{buffer:r.buffer}});l&&p.push({binding:p.length,resource:l});let o=u.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:p,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let r={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:o,dispatchGroup:a};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(r)}d.setPipeline(e.computePipeline),d.setBindGroup(0,o),d.dispatchWorkgroups(...a),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),kt(e.programInfo.name)}dispose(){}build(e,t){Lt(e.name);let n=this.backend.device,a=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(r=>{n.features.has(r.feature)&&a.push(`enable ${r.extension};`)});let l=Dg(t,this.backend.device.limits),u=e.getShaderSource(l),d=`${a.join(`
`)}
${l.additionalImplementations}
${u}`,p=n.createShaderModule({code:d,label:e.name});$e("verbose",()=>`[WebGPU] ${e.name} shader code: ${d}`);let o=n.createComputePipeline({compute:{module:p,entryPoint:"main"},layout:"auto",label:e.name});return kt(e.name),{programInfo:e,computePipeline:o,uniformVariablesInfo:l.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,n=typeof e=="number"?1:e.y||1,a=typeof e=="number"?1:e.z||1,l=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=l&&n<=l&&a<=l)return[t,n,a];let u=t*n*a,d=Math.ceil(Math.sqrt(u));if(d>l){if(d=Math.ceil(Math.cbrt(u)),d>l)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[d,d,d]}else return[d,d,1]}}}),wv={};Sr(wv,{WebGpuBackend:()=>Tv});var vv,xv,$v,Tv,II=N(()=>{"use strict";st(),se(),Yt(),bg(),C3(),$I(),TI(),vv=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let a=0;a<e.length;++a){let l=e[a].dataType;switch(t[a]){case"none":{n.push("");break}case"type":{n.push(`${l}`);break}case"rank":{let u=e[a].dims.length;n.push(`${l};${u}`);break}case"dims":{let u=e[a].dims.join(",");n.push(`${l};${u}`);break}default:throw new Error(`unsupported input dependency: ${t[a]}`)}}return n.join("|")},xv=(e,t,n)=>{var l,u;let a=e.name;return(l=e.shaderCache)!=null&&l.hint&&(a+="["+e.shaderCache.hint+"]"),a+=":"+n+`:${vv(t,((u=e.shaderCache)==null?void 0:u.inputDependencies)??new Array(t.length).fill("dims"))}`,a},$v=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Tv=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let n=[],a={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},l=p=>t.features.has(p)&&n.push(p)&&!0;l("chromium-experimental-timestamp-query-inside-passes")||l("timestamp-query"),l("shader-f16"),l("subgroups"),this.device=await t.requestDevice(a);let u=t,d=t.info??(typeof u.requestAdapterInfo=="function"?await u.requestAdapterInfo():void 0);this.adapterInfo=new $v(d),this.gpuDataManager=Eg(this),this.programManager=new _v(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,fa(e.logLevel,!!e.debug),this.device.onuncapturederror=p=>{p.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${p.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){var e;typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&((e=this.env)!=null&&e.webgpu)&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Lt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var a;let t=new BigUint64Array(e.getMappedRange()),n=this.pendingQueries.get(e);for(let l=0;l<t.length/2;l++){let u=n[l],d=u.kernelId,p=this.kernels.get(d),o=p.kernelType,r=p.kernelName,i=u.programName,s=u.inputTensorViews,c=u.outputTensorViews,h=t[l*2],m=t[l*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=h);let b=Number(h-this.queryTimeBase),x=Number(m-this.queryTimeBase);if(!Number.isSafeInteger(b)||!Number.isSafeInteger(x))throw new RangeError("incorrect timestamp range");if((a=this.env.webgpu.profiling)!=null&&a.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:s.map(v=>({dims:v.dims,dataType:Jt(v.dataType)})),outputsMetadata:c.map(v=>({dims:v.dims,dataType:Jt(v.dataType)})),kernelId:d,kernelType:o,kernelName:r,programName:i,startTime:b,endTime:x});else{let v="";s.forEach((I,O)=>{v+=`input[${O}]: [${I.dims}] | ${Jt(I.dataType)}, `});let _="";c.forEach((I,O)=>{_+=`output[${O}]: [${I.dims}] | ${Jt(I.dataType)}, `}),console.log(`[profiling] kernel "${d}|${o}|${r}|${i}" ${v}${_}start time: ${b} ns, execution time: ${x-b} ns`)}Ti("GPU",`${i}::${h}::${m}`)}e.unmap(),this.pendingQueries.delete(e)}),kt()}run(e,t,n,a,l,u){Lt(e.name);let d=[];for(let _=0;_<t.length;++_){let I=t[_].data;if(I===0)continue;let O=this.gpuDataManager.get(I);if(!O)throw new Error(`no GPU data for input: ${I}`);d.push(O)}let{outputs:p,dispatchGroup:o,programUniforms:r}=e.getRunData(t),i=n.length===0?p.map((_,I)=>I):n;if(i.length!==p.length)throw new Error(`Output size ${i.length} must be equal to ${p.length}.`);let s=[],c=[];for(let _=0;_<p.length;++_){if(!Number.isInteger(i[_])||i[_]<-3||i[_]>=u)throw new Error(`Invalid output index: ${i[_]}`);if(i[_]===-3)continue;let I=i[_]===-1,O=i[_]===-2,E=I||O?l(p[_].dataType,p[_].dims):a(i[_],p[_].dataType,p[_].dims);if(s.push(E),E.data===0)continue;let A=this.gpuDataManager.get(E.data);if(!A)throw new Error(`no GPU data for output: ${E.data}`);if(I&&this.temporaryData.push(A),O){let k=this.kernelPersistentData.get(this.currentKernelId);k||(k=[],this.kernelPersistentData.set(this.currentKernelId,k)),k.push(A)}c.push(A)}if(d.length!==t.length||c.length!==s.length){if(c.length===0)return kt(e.name),s;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let h;if(r){let _=0,I=[];r.forEach(k=>{let T=typeof k.data=="number"?[k.data]:k.data;if(T.length===0)return;let M=k.type===10?2:4,F,J;k.type===10?(J=T.length>4?16:T.length>2?8:T.length*M,F=T.length>4?16:M*T.length):(J=T.length<=2?T.length*M:16,F=16),_=Math.ceil(_/J)*J,I.push(_);let K=k.type===10?8:4;_+=T.length>4?Math.ceil(T.length/K)*F:T.length*M});let O=16;_=Math.ceil(_/O)*O;let E=new ArrayBuffer(_);r.forEach((k,T)=>{let M=I[T],F=typeof k.data=="number"?[k.data]:k.data;if(k.type===6)new Int32Array(E,M,F.length).set(F);else if(k.type===12)new Uint32Array(E,M,F.length).set(F);else if(k.type===10)new Uint16Array(E,M,F.length).set(F);else if(k.type===1)new Float32Array(E,M,F.length).set(F);else throw new Error(`Unsupported uniform type: ${Jt(k.type)}`)});let A=this.gpuDataManager.create(_,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(A.buffer,0,E,0,_),this.gpuDataManager.release(A.id),h={offset:0,size:_,buffer:A.buffer}}let m=this.programManager.normalizeDispatchGroupSize(o),b=m[1]===1&&m[2]===1,x=xv(e,t,b),v=this.programManager.getArtifact(x);if(v||(v=this.programManager.build(e,m),this.programManager.setArtifact(x,v),$e("info",()=>`[artifact] key: ${x}, programName: ${e.name}`)),r&&v.uniformVariablesInfo){if(r.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${r.length} in program "${v.programInfo.name}".`);for(let _=0;_<r.length;_++){let I=r[_],O=I.type,E=typeof I.data=="number"?1:I.data.length,[A,k]=v.uniformVariablesInfo[_];if(O!==A||E!==k)throw new Error(`Uniform variable ${_} mismatch: expect type ${A} with size ${k}, got type ${O} with size ${E} in program "${v.programInfo.name}".`)}}if($e("info",()=>`[ProgramManager] run "${e.name}" (key=${x}) with ${m[0]}x${m[1]}x${m[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let _={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:t,outputTensorViews:s};this.pendingKernels.push(_),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(_)}return this.programManager.run(v,d,c,m,h),kt(e.name),s}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,n,a){let l=yv.get(e);if(!l)throw new Error(`kernel not implemented: ${e}`);let u={kernelType:e,kernelName:a,kernelEntry:l[0],attributes:[l[1],n]};this.kernels.set(t,u)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let n of t)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,n){let a=this.kernels.get(e);if(!a)throw new Error(`kernel not created: ${e}`);let l=a.kernelType,u=a.kernelName,d=a.kernelEntry,p=a.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${l}] ${u}" is not allowed to be called recursively`);this.currentKernelId=e,p[0]&&(p[1]=p[0](p[1]),p[0]=void 0),$e("info",()=>`[WebGPU] Start to run kernel "[${l}] ${u}"...`);let o=this.env.debug;this.temporaryData=[];try{return o&&this.device.pushErrorScope("validation"),d(t,p[1]),0}catch(r){return n.push(Promise.resolve(`[WebGPU] Kernel "[${l}] ${u}" failed. ${r}`)),1}finally{o&&n.push(this.device.popErrorScope().then(r=>r?`GPU validation error for kernel "[${l}] ${u}": ${r.message}`:null));for(let r of this.temporaryData)this.gpuDataManager.release(r.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,n,a){let l=this.sessionExternalDataMapping.get(e);l||(l=new Map,this.sessionExternalDataMapping.set(e,l));let u=l.get(t),d=this.gpuDataManager.registerExternalBuffer(n,a,u);return l.set(t,[d,n]),d}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,n){return async()=>{let a=await Ia(this,e,t);return ma(a.buffer,n)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){$e("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){$e("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){$e("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),n=e.length;this.pendingKernels=[];for(let a=0;a<n;a++){let l=this.getComputePassEncoder(),u=e[a];this.writeTimestamp(this.pendingDispatchNumber*2),l.setPipeline(u.computePipeline),l.setBindGroup(0,u.bindGroup),l.dispatchWorkgroups(...u.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[a]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Iv={};Sr(Iv,{init:()=>Ov});var io,Sv,Ov,SI=N(()=>{"use strict";se(),Yt(),ae(),N3(),io=class tx{constructor(t,n,a,l){this.module=t,this.dataType=n,this.data=a,this.dims=l}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(B.size(t)!==B.size(this.dims))throw new Error("Invalid new shape");return new tx(this.module,this.dataType,this.data,t)}},Sv=class{constructor(e,t,n){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let a=e.PTR_SIZE,l=n/e.PTR_SIZE,u=a===4?"i32":"i64";this.opKernelContext=Number(e.getValue(a*l++,u));let d=Number(e.getValue(a*l++,u));this.outputCount=Number(e.getValue(a*l++,u)),this.customDataOffset=Number(e.getValue(a*l++,"*")),this.customDataSize=Number(e.getValue(a*l++,u));let p=[];for(let o=0;o<d;o++){let r=Number(e.getValue(a*l++,u)),i=Number(e.getValue(a*l++,"*")),s=Number(e.getValue(a*l++,u)),c=[];for(let h=0;h<s;h++)c.push(Number(e.getValue(a*l++,u)));p.push(new io(e,r,i,c))}this.inputs=p}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var d;let n=((d=t==null?void 0:t.inputs)==null?void 0:d.map(p=>typeof p=="number"?this.inputs[p]:p))??this.inputs,a=(t==null?void 0:t.outputs)??[],l=(p,o,r)=>new io(this.module,o,this.output(p,r),r),u=(p,o)=>{let r=Lr(p,o);if(!r)throw new Error(`Unsupported data type: ${p}`);let i=r>0?this.backend.gpuDataManager.create(r).id:0;return new io(this.module,p,i,o)};return this.backend.run(e,n,a,l,u,this.outputCount)}output(e,t){let n=this.module.stackSave();try{let a=this.module.PTR_SIZE,l=a===4?"i32":"i64",u=this.module.stackAlloc((1+t.length)*a);this.module.setValue(u,t.length,l);for(let d=0;d<t.length;d++)this.module.setValue(u+a*(d+1),t[d],l);return this.module._JsepOutput(this.opKernelContext,e,u)}catch(a){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${a}`)}finally{this.module.stackRestore(n)}}},Ov=async(e,t,n,a)=>{let l=t.jsepInit;if(!l)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let u=(II(),pn(wv)).WebGpuBackend,d=new u;await d.initialize(n,a),l("webgpu",[d,p=>d.alloc(Number(p)),p=>d.free(p),(p,o,r,i=!1)=>{if(i)$e("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(p)}, dst=${Number(o)}, size=${Number(r)}`),d.memcpy(Number(p),Number(o));else{$e("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(p)}, gpuDataId=${Number(o)}, size=${Number(r)}`);let s=t.HEAPU8.subarray(Number(p>>>0),Number(p>>>0)+Number(r));d.upload(Number(o),s)}},async(p,o,r)=>{$e("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${p}, dataOffset=${o}, size=${r}`),await d.download(Number(p),()=>t.HEAPU8.subarray(Number(o)>>>0,Number(o+r)>>>0))},(p,o,r)=>d.createKernel(p,Number(o),r,t.UTF8ToString(t._JsepGetNodeName(Number(o)))),p=>d.releaseKernel(p),(p,o,r,i)=>{$e("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${r}, kernel=${p}, contextDataOffset=${o}`);let s=new Sv(t,d,Number(o));return d.computeKernel(Number(p),s,i)},()=>d.captureBegin(),()=>d.captureEnd(),()=>d.replay()])}else{let u=new Tg(n);l("webnn",[u,()=>u.reserveTensorId(),d=>u.releaseTensorId(d),async(d,p,o,r,i)=>u.ensureTensor(d,p,o,r,i),(d,p)=>{u.uploadTensor(d,p)},async(d,p)=>u.downloadTensor(d,p),(d,p)=>u.registerMLContext(d,p),!!n.trace])}}}),Ev,$u,Tu,pr,Pv,Iu,oo,Su,Ou,Eu,Pu,Au,ku,Av=N(()=>{"use strict";st(),A3(),k3(),se(),Mr(),la(),ag(),Ev=(e,t)=>{Re()._OrtInit(e,t)!==0&&ke("Can't initialize onnxruntime.")},$u=async e=>{Ev(e.wasm.numThreads,qi(e.logLevel))},Tu=async(e,t)=>{var a,l;(l=(a=Re()).asyncInit)==null||l.call(a);let n=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let u=e.webgpu.powerPreference;if(u!==void 0&&u!=="low-power"&&u!=="high-performance")throw new Error(`Invalid powerPreference setting: "${u}"`);let d=e.webgpu.forceFallbackAdapter;if(d!==void 0&&typeof d!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${d}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:u,forceFallbackAdapter:d}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let u=(SI(),pn(Iv)).init;t==="webgpu"&&await u("webgpu",Re(),e,n),t==="webnn"&&await u("webnn",Re(),e)}},pr=new Map,Pv=e=>{let t=Re(),n=t.stackSave();try{let a=t.PTR_SIZE,l=t.stackAlloc(2*a);t._OrtGetInputOutputCount(e,l,l+a)!==0&&ke("Can't get session input/output count.");let u=a===4?"i32":"i64";return[Number(t.getValue(l,u)),Number(t.getValue(l+a,u))]}finally{t.stackRestore(n)}},Iu=(e,t)=>{let n=Re(),a=n.stackSave(),l=0;try{let u=n.PTR_SIZE,d=n.stackAlloc(2*u);n._OrtGetInputOutputMetadata(e,t,d,d+u)!==0&&ke("Can't get session input/output metadata.");let p=Number(n.getValue(d,"*"));l=Number(n.getValue(d+u,"*"));let o=n.HEAP32[l/4];if(o===0)return[p,0];let r=n.HEAPU32[l/4+1],i=[];for(let s=0;s<r;s++){let c=Number(n.getValue(l+8+s*u,"*"));i.push(c!==0?n.UTF8ToString(c):Number(n.getValue(l+8+(s+r)*u,"*")))}return[p,o,i]}finally{n.stackRestore(a),l!==0&&n._OrtFree(l)}},oo=e=>{let t=Re(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},Su=async(e,t)=>{var s,c,h,m;let n,a,l=Re();Array.isArray(e)?[n,a]=e:e.buffer===l.HEAPU8.buffer?[n,a]=[e.byteOffset,e.byteLength]:[n,a]=oo(e);let u=0,d=0,p=0,o=[],r=[],i=[];try{if([d,o]=await sg(t),(t==null?void 0:t.externalData)&&l.mountExternalData){let T=[];for(let M of t.externalData){let F=typeof M=="string"?M:M.path,J=typeof M=="string"?M:M.data;T.push(ha(J).then(K=>{l.mountExternalData(F,K)}))}await Promise.all(T)}for(let T of(t==null?void 0:t.executionProviders)??[])if((typeof T=="string"?T:T.name)==="webnn"){if(l.shouldTransferToMLTensor=!1,typeof T!="string"){let M=T,F=M==null?void 0:M.context,J=M==null?void 0:M.gpuDevice,K=M==null?void 0:M.deviceType,C=M==null?void 0:M.powerPreference;F?l.currentContext=F:J?l.currentContext=await l.webnnCreateMLContext(J):l.currentContext=await l.webnnCreateMLContext({deviceType:K,powerPreference:C})}else l.currentContext=await l.webnnCreateMLContext();break}u=await l._OrtCreateSession(n,a,d),(s=l.webgpuOnCreateSession)==null||s.call(l,u),u===0&&ke("Can't create a session."),(c=l.jsepOnCreateSession)==null||c.call(l),l.currentContext&&(l.webnnRegisterMLContext(u,l.currentContext),l.currentContext=void 0,l.shouldTransferToMLTensor=!0);let[b,x]=Pv(u),v=!!(t!=null&&t.enableGraphCapture),_=[],I=[],O=[],E=[],A=[];for(let T=0;T<b;T++){let[M,F,J]=Iu(u,T);M===0&&ke("Can't get an input name."),r.push(M);let K=l.UTF8ToString(M);_.push(K),O.push(F===0?{name:K,isTensor:!1}:{name:K,isTensor:!0,type:Jt(F),shape:J})}for(let T=0;T<x;T++){let[M,F,J]=Iu(u,T+b);M===0&&ke("Can't get an output name."),i.push(M);let K=l.UTF8ToString(M);I.push(K),E.push(F===0?{name:K,isTensor:!1}:{name:K,isTensor:!0,type:Jt(F),shape:J});{if(v&&(t==null?void 0:t.preferredOutputLocation)===void 0){A.push("gpu-buffer");continue}let C=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((h=t==null?void 0:t.preferredOutputLocation)==null?void 0:h[K])??"cpu",R=l.webnnIsGraphOutput;if(C==="cpu"&&R&&R(u,K)){A.push("ml-tensor-cpu-output");continue}if(C!=="cpu"&&C!=="cpu-pinned"&&C!=="gpu-buffer"&&C!=="ml-tensor")throw new Error(`Not supported preferred output location: ${C}.`);if(v&&C!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${C}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);A.push(C)}}let k=null;return A.some(T=>T==="gpu-buffer"||T==="ml-tensor"||T==="ml-tensor-cpu-output")&&(p=l._OrtCreateBinding(u),p===0&&ke("Can't create IO binding."),k={handle:p,outputPreferredLocations:A,outputPreferredLocationsEncoded:A.map(T=>T==="ml-tensor-cpu-output"?"ml-tensor":T).map(T=>ca(T))}),pr.set(u,[u,r,i,k,v,!1]),[u,_,I,O,E]}catch(b){throw r.forEach(x=>l._OrtFree(x)),i.forEach(x=>l._OrtFree(x)),p!==0&&l._OrtReleaseBinding(p)!==0&&ke("Can't release IO binding."),u!==0&&l._OrtReleaseSession(u)!==0&&ke("Can't release session."),b}finally{l._free(n),d!==0&&l._OrtReleaseSessionOptions(d)!==0&&ke("Can't release session options."),o.forEach(b=>l._free(b)),(m=l.unmountExternalData)==null||m.call(l)}},Ou=e=>{var o,r,i;let t=Re(),n=pr.get(e);if(!n)throw new Error(`cannot release session. invalid session id: ${e}`);let[a,l,u,d,p]=n;d&&(p&&t._OrtClearBoundOutputs(d.handle)!==0&&ke("Can't clear bound outputs."),t._OrtReleaseBinding(d.handle)!==0&&ke("Can't release IO binding.")),(o=t.jsepOnReleaseSession)==null||o.call(t,e),(r=t.webnnOnReleaseSession)==null||r.call(t,e),(i=t.webgpuOnReleaseSession)==null||i.call(t,e),l.forEach(s=>t._OrtFree(s)),u.forEach(s=>t._OrtFree(s)),t._OrtReleaseSession(a)!==0&&ke("Can't release session."),pr.delete(e)},Eu=async(e,t,n,a,l,u,d=!1)=>{if(!e){t.push(0);return}let p=Re(),o=p.PTR_SIZE,r=e[0],i=e[1],s=e[3],c=s,h,m;if(r==="string"&&(s==="gpu-buffer"||s==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(d&&s!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${u} when enableGraphCapture is true.`);if(s==="gpu-buffer"){let v=e[2].gpuBuffer;m=Lr(jr(r),i);{let _=p.jsepRegisterBuffer;if(!_)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');h=_(a,u,v,m)}}else if(s==="ml-tensor"){let v=e[2].mlTensor;m=Lr(jr(r),i);let _=p.webnnRegisterMLTensor;if(!_)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');h=_(a,v,jr(r),i)}else{let v=e[2];if(Array.isArray(v)){m=o*v.length,h=p._malloc(m),n.push(h);for(let _=0;_<v.length;_++){if(typeof v[_]!="string")throw new TypeError(`tensor data at index ${_} is not a string`);p.setValue(h+_*o,Ct(v[_],n),"*")}}else{let _=p.webnnIsGraphInput,I=p.webnnIsGraphOutput;if(r!=="string"&&_&&I){let O=p.UTF8ToString(l);if(_(a,O)||I(a,O)){let E=jr(r);m=Lr(E,i),c="ml-tensor";let A=p.webnnCreateTemporaryTensor,k=p.webnnUploadTensor;if(!A||!k)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let T=await A(a,E,i);k(T,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),h=T}else m=v.byteLength,h=p._malloc(m),n.push(h),p.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,m),h)}else m=v.byteLength,h=p._malloc(m),n.push(h),p.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,m),h)}}let b=p.stackSave(),x=p.stackAlloc(4*i.length);try{i.forEach((_,I)=>p.setValue(x+I*o,_,o===4?"i32":"i64"));let v=p._OrtCreateTensor(jr(r),h,m,x,i.length,ca(c));v===0&&ke(`Can't create tensor for input/output. session=${a}, index=${u}.`),t.push(v)}finally{p.stackRestore(b)}},Pu=async(e,t,n,a,l,u)=>{var K,C,R,$;let d=Re(),p=d.PTR_SIZE,o=pr.get(e);if(!o)throw new Error(`cannot run inference. invalid session id: ${e}`);let r=o[0],i=o[1],s=o[2],c=o[3],h=o[4],m=o[5],b=t.length,x=a.length,v=0,_=[],I=[],O=[],E=[],A=[],k=d.stackSave(),T=d.stackAlloc(b*p),M=d.stackAlloc(b*p),F=d.stackAlloc(x*p),J=d.stackAlloc(x*p);try{[v,_]=tg(u),Pr("wasm prepareInputOutputTensor");for(let V=0;V<b;V++)await Eu(n[V],I,E,e,i[t[V]],t[V],h);for(let V=0;V<x;V++)await Eu(l[V],O,E,e,s[a[V]],b+a[V],h);Ar("wasm prepareInputOutputTensor");for(let V=0;V<b;V++)d.setValue(T+V*p,I[V],"*"),d.setValue(M+V*p,i[t[V]],"*");for(let V=0;V<x;V++)d.setValue(F+V*p,O[V],"*"),d.setValue(J+V*p,s[a[V]],"*");if(c&&!m){let{handle:V,outputPreferredLocations:ee,outputPreferredLocationsEncoded:U}=c;if(i.length!==b)throw new Error(`input count from feeds (${b}) is expected to be always equal to model's input count (${i.length}).`);Pr("wasm bindInputsOutputs");for(let W=0;W<b;W++){let X=t[W];await d._OrtBindInput(V,i[X],I[W])!==0&&ke(`Can't bind input[${W}] for session=${e}.`)}for(let W=0;W<x;W++){let X=a[W];(K=l[W])!=null&&K[3]?(A.push(O[W]),d._OrtBindOutput(V,s[X],O[W],0)!==0&&ke(`Can't bind pre-allocated output[${W}] for session=${e}.`)):d._OrtBindOutput(V,s[X],0,U[X])!==0&&ke(`Can't bind output[${W}] to ${ee[W]} for session=${e}.`)}Ar("wasm bindInputsOutputs"),pr.set(e,[r,i,s,c,h,!0])}(C=d.jsepOnRunStart)==null||C.call(d,r),(R=d.webnnOnRunStart)==null||R.call(d,r);let z;c?z=await d._OrtRunWithBinding(r,c.handle,x,F,v):z=await d._OrtRun(r,M,T,b,J,x,F,v),z!==0&&ke("failed to call OrtRun().");let G=[],re=[];Pr("wasm ProcessOutputTensor");for(let V=0;V<x;V++){let ee=Number(d.getValue(F+V*p,"*"));if(ee===O[V]||A.includes(O[V])){G.push(l[V]),ee!==O[V]&&d._OrtReleaseTensor(ee)!==0&&ke("Can't release tensor.");continue}let U=d.stackSave(),W=d.stackAlloc(4*p),X=!1,q,le=0;try{d._OrtGetTensorData(ee,W,W+p,W+2*p,W+3*p)!==0&&ke(`Can't access output tensor data on index ${V}.`);let Pe=p===4?"i32":"i64",xe=Number(d.getValue(W,Pe));le=d.getValue(W+p,"*");let tt=d.getValue(W+p*2,"*"),pt=Number(d.getValue(W+p*3,Pe)),wt=[];for(let Me=0;Me<pt;Me++)wt.push(Number(d.getValue(tt+Me*p,Pe)));d._OrtFree(tt)!==0&&ke("Can't free memory for tensor dims.");let ct=wt.reduce((Me,pe)=>Me*pe,1);q=Jt(xe);let hr=c==null?void 0:c.outputPreferredLocations[a[V]];if(q==="string"){if(hr==="gpu-buffer"||hr==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Me=[];for(let pe=0;pe<ct;pe++){let vt=d.getValue(le+pe*p,"*"),ho=d.getValue(le+(pe+1)*p,"*"),mi=pe===ct-1?void 0:ho-vt;Me.push(d.UTF8ToString(vt,mi))}G.push([q,wt,Me,"cpu"])}else if(hr==="gpu-buffer"&&ct>0){let Me=d.jsepGetBuffer;if(!Me)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let pe=Me(le),vt=Lr(xe,ct);if(vt===void 0||!da(q))throw new Error(`Unsupported data type: ${q}`);X=!0,G.push([q,wt,{gpuBuffer:pe,download:d.jsepCreateDownloader(pe,vt,q),dispose:()=>{d._OrtReleaseTensor(ee)!==0&&ke("Can't release tensor.")}},"gpu-buffer"])}else if(hr==="ml-tensor"&&ct>0){let Me=d.webnnEnsureTensor,pe=d.webnnIsGraphInputOutputTypeSupported;if(!Me||!pe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Lr(xe,ct)===void 0||!pa(q))throw new Error(`Unsupported data type: ${q}`);if(!pe(e,q,!1))throw new Error(`preferredLocation "ml-tensor" for ${q} output is not supported by current WebNN Context.`);let vt=await Me(e,le,xe,wt,!1);X=!0,G.push([q,wt,{mlTensor:vt,download:d.webnnCreateMLTensorDownloader(le,q),dispose:()=>{d.webnnReleaseTensorId(le),d._OrtReleaseTensor(ee)}},"ml-tensor"])}else if(hr==="ml-tensor-cpu-output"&&ct>0){let Me=d.webnnCreateMLTensorDownloader(le,q)(),pe=G.length;X=!0,re.push((async()=>{let vt=[pe,await Me];return d.webnnReleaseTensorId(le),d._OrtReleaseTensor(ee),vt})()),G.push([q,wt,[],"cpu"])}else{let Me=Ui(q),pe=new Me(ct);new Uint8Array(pe.buffer,pe.byteOffset,pe.byteLength).set(d.HEAPU8.subarray(le,le+pe.byteLength)),G.push([q,wt,pe,"cpu"])}}finally{d.stackRestore(U),q==="string"&&le&&d._free(le),X||d._OrtReleaseTensor(ee)}}c&&!h&&(d._OrtClearBoundOutputs(c.handle)!==0&&ke("Can't clear bound outputs."),pr.set(e,[r,i,s,c,h,!1]));for(let[V,ee]of await Promise.all(re))G[V][2]=ee;return Ar("wasm ProcessOutputTensor"),G}finally{($=d.webnnOnRunEnd)==null||$.call(d,r),d.stackRestore(k),I.forEach(z=>d._OrtReleaseTensor(z)),O.forEach(z=>d._OrtReleaseTensor(z)),E.forEach(z=>d._free(z)),v!==0&&d._OrtReleaseRunOptions(v),_.forEach(z=>d._free(z))}},Au=e=>{let t=Re(),n=pr.get(e);if(!n)throw new Error("invalid session id");let a=n[0],l=t._OrtEndProfiling(a);l===0&&ke("Can't get an profile file name."),t._OrtFree(l)},ku=e=>{let t=[];for(let n of e){let a=n[2];!Array.isArray(a)&&"buffer"in a&&t.push(a.buffer)}return t}}),cr,dt,vn,ui,li,so,Du,ao,Kr,Xr,kv,Dv,Nv,Cv,zv,Rv,Bv,Mv,Fv=N(()=>{"use strict";st(),Av(),Mr(),oa(),cr=()=>!!fe.wasm.proxy&&typeof document<"u",vn=!1,ui=!1,li=!1,ao=new Map,Kr=(e,t)=>{let n=ao.get(e);n?n.push(t):ao.set(e,[t])},Xr=()=>{if(vn||!ui||li||!dt)throw new Error("worker not ready")},kv=e=>{switch(e.data.type){case"init-wasm":vn=!1,e.data.err?(li=!0,Du[1](e.data.err)):(ui=!0,Du[0]()),so&&(URL.revokeObjectURL(so),so=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=ao.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Dv=async()=>{if(!ui){if(vn)throw new Error("multiple calls to 'initWasm()' detected.");if(li)throw new Error("previous call to 'initWasm()' failed.");if(vn=!0,cr())return new Promise((e,t)=>{dt==null||dt.terminate(),Zm().then(([n,a])=>{try{dt=a,dt.onerror=u=>t(u),dt.onmessage=kv,Du=[e,t];let l={type:"init-wasm",in:fe};!l.in.wasm.wasmPaths&&(n||ta)&&(l.in.wasm.wasmPaths={wasm:new URL("/SCOPE/assets/ort-wasm-simd-threaded.jsep-D-icqfN-.wasm",self.location.href).href}),dt.postMessage(l),so=n}catch(l){t(l)}},t)});try{await ua(fe.wasm),await $u(fe),ui=!0}catch(e){throw li=!0,e}finally{vn=!1}}},Nv=async e=>{if(cr())return Xr(),new Promise((t,n)=>{Kr("init-ep",[t,n]);let a={type:"init-ep",in:{epName:e,env:fe}};dt.postMessage(a)});await Tu(fe,e)},Cv=async e=>cr()?(Xr(),new Promise((t,n)=>{Kr("copy-from",[t,n]);let a={type:"copy-from",in:{buffer:e}};dt.postMessage(a,[e.buffer])})):oo(e),zv=async(e,t)=>{if(cr()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Xr(),new Promise((n,a)=>{Kr("create",[n,a]);let l={type:"create",in:{model:e,options:{...t}}},u=[];e instanceof Uint8Array&&u.push(e.buffer),dt.postMessage(l,u)})}else return Su(e,t)},Rv=async e=>{if(cr())return Xr(),new Promise((t,n)=>{Kr("release",[t,n]);let a={type:"release",in:e};dt.postMessage(a)});Ou(e)},Bv=async(e,t,n,a,l,u)=>{if(cr()){if(n.some(d=>d[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(l.some(d=>d))throw new Error("pre-allocated output tensor is not supported for proxy.");return Xr(),new Promise((d,p)=>{Kr("run",[d,p]);let o=n,r={type:"run",in:{sessionId:e,inputIndices:t,inputs:o,outputIndices:a,options:u}};dt.postMessage(r,ku(o))})}else return Pu(e,t,n,a,l,u)},Mv=async e=>{if(cr())return Xr(),new Promise((t,n)=>{Kr("end-profiling",[t,n]);let a={type:"end-profiling",in:e};dt.postMessage(a)});Au(e)}}),Nu,jv,Lv,OI=N(()=>{"use strict";st(),Fv(),se(),Js(),ag(),Nu=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},jv=e=>{switch(e[3]){case"cpu":return new $t(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!da(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:a,dispose:l}=e[2];return $t.fromGpuBuffer(n,{dataType:t,dims:e[1],download:a,dispose:l})}case"ml-tensor":{let t=e[0];if(!pa(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:a,dispose:l}=e[2];return $t.fromMLTensor(n,{dataType:t,dims:e[1],download:a,dispose:l})}default:throw new Error(`invalid data location: ${e[3]}`)}},Lv=class{async fetchModelAndCopyToWasmMemory(e){return Cv(await ha(e))}async loadModel(e,t){Lt();let n;typeof e=="string"?n=await this.fetchModelAndCopyToWasmMemory(e):n=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await zv(n,t),kt()}async dispose(){return Rv(this.sessionId)}async run(e,t,n){Lt();let a=[],l=[];Object.entries(e).forEach(s=>{let c=s[0],h=s[1],m=this.inputNames.indexOf(c);if(m===-1)throw new Error(`invalid input '${c}'`);a.push(h),l.push(m)});let u=[],d=[];Object.entries(t).forEach(s=>{let c=s[0],h=s[1],m=this.outputNames.indexOf(c);if(m===-1)throw new Error(`invalid output '${c}'`);u.push(h),d.push(m)});let p=a.map((s,c)=>Nu(s,()=>`input "${this.inputNames[l[c]]}"`)),o=u.map((s,c)=>s?Nu(s,()=>`output "${this.outputNames[d[c]]}"`):null),r=await Bv(this.sessionId,l,p,d,o,n),i={};for(let s=0;s<r.length;s++)i[this.outputNames[d[s]]]=u[s]??jv(r[s]);return kt(),i}startProfiling(){}endProfiling(){Mv(this.sessionId)}}}),Vv={};Sr(Vv,{OnnxruntimeWebAssemblyBackend:()=>zu,initializeFlags:()=>Cu,wasmBackend:()=>Uv});var Cu,zu,Uv,EI=N(()=>{"use strict";st(),Fv(),OI(),Cu=()=>{(typeof fe.wasm.initTimeout!="number"||fe.wasm.initTimeout<0)&&(fe.wasm.initTimeout=0);let e=fe.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),fe.wasm.simd=!1),typeof fe.wasm.proxy!="boolean"&&(fe.wasm.proxy=!1),typeof fe.wasm.trace!="boolean"&&(fe.wasm.trace=!1),typeof fe.wasm.numThreads!="number"||!Number.isInteger(fe.wasm.numThreads)||fe.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)fe.wasm.numThreads=1;else{let t=typeof navigator>"u"?Eo("node:os").cpus().length:navigator.hardwareConcurrency;fe.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},zu=class{async init(e){Cu(),await Dv(),await Nv(e)}async createInferenceSessionHandler(e,t){let n=new Lv;return await n.loadModel(e,t),n}},Uv=new zu});st(),st(),st();var PI="1.29.0";{let e=(O3(),pn(Rm)).onnxjsBackend;Or("webgl",e,-10)}{let e=(EI(),pn(Vv)).wasmBackend;Or("webgpu",e,5),Or("webnn",e,5),Or("cpu",e,10),Or("wasm",e,10)}Object.defineProperty(fe.versions,"web",{value:PI,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//*! Bundled license information:

  long/index.js:
  long/umd/index.js:
    (**
     * @license
     * Copyright 2009 The Closure Library Authors
     * Copyright 2020 Daniel Wirtz / The long.js Authors.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     * SPDX-License-Identifier: Apache-2.0
     *)
  */fe.wasm.wasmPaths="https://cdn.jsdelivr.net/npm/onnxruntime-web@1.29.0/dist/",self.crossOriginIsolated||(fe.wasm.numThreads=1);const ye=4096,uo=1024,Ve=ye/2+1,qv=new Float32Array(ye/2),Ru=new Float32Array(ye/2);for(let e=0;e<ye/2;e++)qv[e]=Math.cos(-2*Math.PI*e/ye),Ru[e]=Math.sin(-2*Math.PI*e/ye);const Gv=new Uint32Array(ye);{const e=Math.log2(ye);for(let t=0;t<ye;t++){let n=0;for(let a=0;a<e;a++)n=n<<1|t>>a&1;Gv[t]=n}}function Bu(e,t,n){for(let a=0;a<ye;a++){const l=Gv[a];if(l>a){let u=e[a];e[a]=e[l],e[l]=u,u=t[a],t[a]=t[l],t[l]=u}}for(let a=2;a<=ye;a<<=1){const l=a>>1,u=ye/a;for(let d=0;d<ye;d+=a)for(let p=0;p<l;p++){const o=p*u,r=qv[o],i=n?-Ru[o]:Ru[o],s=d+p,c=s+l,h=e[c]*r-t[c]*i,m=e[c]*i+t[c]*r;e[c]=e[s]-h,t[c]=t[s]-m,e[s]+=h,t[s]+=m}}if(n)for(let a=0;a<ye;a++)e[a]/=ye,t[a]/=ye}const lo=new Float32Array(ye);for(let e=0;e<ye;e++)lo[e]=.5-.5*Math.cos(2*Math.PI*e/ye);const Hv=1.5;function Mu(e){const t=Math.max(1,Math.floor((e.length-ye)/uo)+1),n=new Float32Array(t*Ve),a=new Float32Array(t*Ve),l=new Float32Array(ye),u=new Float32Array(ye);for(let d=0;d<t;d++){const p=d*uo;for(let o=0;o<ye;o++)l[o]=(e[p+o]??0)*lo[o],u[o]=0;Bu(l,u,!1),n.set(l.subarray(0,Ve),d*Ve),a.set(u.subarray(0,Ve),d*Ve)}return{re:n,im:a,frames:t}}function AI(e,t){const n=new Float32Array(t),a=new Float32Array(ye),l=new Float32Array(ye);for(let u=0;u<e.frames;u++){const d=u*Ve;a[0]=e.re[d],l[0]=e.im[d];for(let o=1;o<Ve;o++)a[o]=e.re[d+o],l[o]=e.im[d+o],a[ye-o]=e.re[d+o],l[ye-o]=-e.im[d+o];a[ye/2]=e.re[d+ye/2],l[ye/2]=0,Bu(a,l,!0);const p=u*uo;for(let o=0;o<ye;o++){const r=p+o;r<t&&(n[r]+=a[o]*lo[o]/Hv)}}return n}function kI(e,t,n){const a=new Float32Array(t*Ve),l=n>>1;for(let u=0;u<Ve;u++){let d=0,p=0;for(let o=0;o<Math.min(l,t);o++)d+=e[o*Ve+u],p++;for(let o=0;o<t;o++){const r=o+l;r<t&&(d+=e[r*Ve+u],p++);const i=o-l-1;i>=0&&(d-=e[i*Ve+u],p--),a[o*Ve+u]=d/Math.max(1,p)}}return a}function DI(e,t,n){const a=new Float32Array(t*Ve),l=n>>1;for(let u=0;u<t;u++){const d=u*Ve;let p=0,o=0;for(let r=0;r<Math.min(l,Ve);r++)p+=e[d+r],o++;for(let r=0;r<Ve;r++){const i=r+l;i<Ve&&(p+=e[d+i],o++);const s=r-l-1;s>=0&&(p-=e[d+s],o--),a[d+r]=p/Math.max(1,o)}}return a}const ue=7680,po=1024,Je=ue/2+1,xn=3072,Ue=256,qe=po*(Ue-1),Ge=512,Be=15,Wv=new Float32Array(Ge/2),Fu=new Float32Array(Ge/2);for(let e=0;e<Ge/2;e++)Wv[e]=Math.cos(-2*Math.PI*e/Ge),Fu[e]=Math.sin(-2*Math.PI*e/Ge);const Kv=new Uint32Array(Ge);for(let e=0;e<Ge;e++){let t=0;for(let n=0;n<9;n++)t=t<<1|e>>n&1;Kv[e]=t}function NI(e,t,n,a){for(let l=0;l<Ge;l++){const u=Kv[l];if(u>l){let d=e[n+l];e[n+l]=e[n+u],e[n+u]=d,d=t[n+l],t[n+l]=t[n+u],t[n+u]=d}}for(let l=2;l<=Ge;l<<=1){const u=l>>1,d=Ge/l;for(let p=0;p<Ge;p+=l)for(let o=0;o<u;o++){const r=Wv[o*d],i=a?-Fu[o*d]:Fu[o*d],s=n+p+o,c=s+u,h=e[c]*r-t[c]*i,m=e[c]*i+t[c]*r;e[c]=e[s]-h,t[c]=t[s]-m,e[s]+=h,t[s]+=m}}}const Xv=new Float32Array(Be*Be),ju=new Float32Array(Be*Be);for(let e=0;e<Be;e++)for(let t=0;t<Be;t++)Xv[e*Be+t]=Math.cos(-2*Math.PI*e*t/Be),ju[e*Be+t]=Math.sin(-2*Math.PI*e*t/Be);const Zv=new Float32Array(Ge*Be),Lu=new Float32Array(Ge*Be);for(let e=0;e<Ge;e++)for(let t=0;t<Be;t++)Zv[e*Be+t]=Math.cos(-2*Math.PI*e*t/ue),Lu[e*Be+t]=Math.sin(-2*Math.PI*e*t/ue);const di=new Float32Array(ue),pi=new Float32Array(ue),Jv=new Float32Array(ue),Yv=new Float32Array(ue);function co(e,t,n,a,l){for(let u=0;u<Ge;u++)for(let d=0;d<Be;d++)di[d*Ge+u]=e[u*Be+d],pi[d*Ge+u]=t[u*Be+d];for(let u=0;u<Be;u++)NI(di,pi,u*Ge,l);for(let u=0;u<Be;u++)for(let d=0;d<Ge;d++){const p=Zv[d*Be+u],o=l?-Lu[d*Be+u]:Lu[d*Be+u],r=u*Ge+d,i=di[r],s=pi[r];di[r]=i*p-s*o,pi[r]=i*o+s*p}for(let u=0;u<Ge;u++)for(let d=0;d<Be;d++){let p=0,o=0;for(let r=0;r<Be;r++){const i=Xv[d*Be+r],s=l?-ju[d*Be+r]:ju[d*Be+r],c=di[r*Ge+u],h=pi[r*Ge+u];p+=c*i-h*s,o+=c*s+h*i}Jv[d*Ge+u]=p,Yv[d*Ge+u]=o}if(n.set(Jv),a.set(Yv),l)for(let u=0;u<ue;u++)n[u]/=ue,a[u]/=ue}const ci=new Float32Array(ue);for(let e=0;e<ue;e++)ci[e]=.5-.5*Math.cos(2*Math.PI*e/ue);function Vu(e,t,n){const a=ue/2,l=new Float32Array(qe+ue);for(let r=0;r<a;r++)l[r]=e[a-r];l.set(e,a);for(let r=0;r<a;r++)l[a+qe+r]=e[qe-2-r];const u=new Float32Array(ue),d=new Float32Array(ue),p=new Float32Array(ue),o=new Float32Array(ue);for(let r=0;r<Ue;r++){const i=r*po;for(let s=0;s<ue;s++)u[s]=l[i+s]*ci[s],d[s]=0;co(u,d,p,o,!1),t.set(p.subarray(0,Je),r*Je),n.set(o.subarray(0,Je),r*Je)}}const CI=(()=>{const e=new Float32Array(qe+ue);for(let t=0;t<Ue;t++){const n=t*po;for(let a=0;a<ue;a++)e[n+a]+=ci[a]*ci[a]}return e})();function Qv(e,t,n){const a=ue/2,l=new Float32Array(qe+ue),u=new Float32Array(ue),d=new Float32Array(ue),p=new Float32Array(ue),o=new Float32Array(ue);for(let r=0;r<Ue;r++){const i=r*Je;u[0]=e[i],d[0]=t[i];for(let c=1;c<Je;c++)u[c]=e[i+c],d[c]=t[i+c],u[ue-c]=e[i+c],d[ue-c]=-t[i+c];d[ue/2]=0,co(u,d,p,o,!0);const s=r*po;for(let c=0;c<ue;c++)l[s+c]+=p[c]*ci[c]}for(let r=0;r<qe;r++)n[r]=l[a+r]/Math.max(1e-8,CI[a+r])}let hi=null,fi="";async function e1(e){if(hi)return hi;const t=new Uint8Array(e);try{hi=await Ii.create(t,{executionProviders:["webgpu"]}),fi="webgpu"}catch{hi=await Ii.create(t,{executionProviders:["wasm"]}),fi="wasm"}return hi}async function t1(e,t,n,a){Vu(t,a.LRe,a.LIm),Vu(n,a.RRe,a.RIm);const{LRe:l,LIm:u,RRe:d,RIm:p,input:o}=a,r=xn*Ue;for(let b=0;b<xn;b++)for(let x=0;x<Ue;x++){const v=x*Je+b,_=b*Ue+x;o[_]=l[v],o[r+_]=u[v],o[2*r+_]=d[v],o[3*r+_]=p[v]}const i={};i[e.inputNames[0]]=new $t("float32",o,[1,4,xn,Ue]);const c=(await e.run(i))[e.outputNames[0]].data,{vRe:h,vIm:m}=a;for(let b=0;b<2;b++){h.fill(0),m.fill(0);const x=b*2*r,v=x+r;for(let _=0;_<xn;_++)for(let I=0;I<Ue;I++){const O=_*Ue+I,E=I*Je+_;h[E]=c[x+O],m[E]=c[v+O]}Qv(h,m,b===0?a.outL:a.outR)}}async function zI(e,t,n,a){a("model",0);const l=await e1(n);a(`vocals·${fi}`,0);const u=e.length,d=32768,p=qe-2*d,o=Math.max(1,Math.ceil(u/p)),r=new Float32Array(u),i=new Float32Array(u),s={LRe:new Float32Array(Ue*Je),LIm:new Float32Array(Ue*Je),RRe:new Float32Array(Ue*Je),RIm:new Float32Array(Ue*Je),input:new Float32Array(4*xn*Ue),vRe:new Float32Array(Ue*Je),vIm:new Float32Array(Ue*Je),outL:new Float32Array(qe),outR:new Float32Array(qe)},c=new Float32Array(qe),h=new Float32Array(qe);for(let m=0;m<o;m++){const b=m*p-(m>0?d:0);c.fill(0),h.fill(0);for(let _=0;_<qe;_++){const I=b+_;I>=0&&I<u&&(c[_]=e[I],h[_]=t[I])}await t1(l,c,h,s);const x=m===0?0:d,v=m===o-1?qe:qe-d;for(let _=x;_<v;_++){const I=b+_;I>=0&&I<u&&(r[I]=s.outL[_],i[I]=s.outR[_])}a(`vocals·${fi}`,(m+1)/o*100)}return[r,i]}function r1(e,t,n,a,l){const u=e.length;l("analyze",0);const d=Mu(e),p=Mu(t),o=d.frames;l("analyze",25);const r=new Float32Array(o*Ve);for(let k=0;k<o*Ve;k++){const T=(d.re[k]+p.re[k])*.5,M=(d.im[k]+p.im[k])*.5;r[k]=Math.hypot(T,M)}const i=kI(r,o,31),s=DI(r,o,31);l("analyze",55);const c=n/ye,h=Math.round(160/c),m=Math.round(180/c),b=Math.round(1e4/c),x=["vocals","drums","bass","other"],v=[];for(let k=0;k<8;k++)v.push(new Float32Array(u));const _=new Float32Array(ye),I=new Float32Array(ye),O=new Float32Array(Ve),E=new Float32Array(Ve),A=(k,T)=>{_[0]=O[0],I[0]=E[0];for(let F=1;F<Ve;F++)_[F]=O[F],I[F]=E[F],_[ye-F]=O[F],I[ye-F]=-E[F];I[ye/2]=0,Bu(_,I,!0);const M=k*uo;for(let F=0;F<ye;F++){const J=M+F;J<u&&(T[J]+=_[F]*lo[F]/Hv)}};for(let k=0;k<o;k++){const T=k*Ve;for(let M=0;M<4;M++)for(let F=0;F<2;F++){const J=F===0?d.re:p.re,K=F===0?d.im:p.im;for(let C=0;C<Ve;C++){const R=T+C,$=i[R],z=s[R],G=$*$+z*z+1e-12,re=z*z/G,V=1-re;let ee=0;if(M===1)ee=re;else if(C<=h)ee=M===2?V:0;else{let U=0;if(a&&C>=m&&C<=b){const W=d.re[R]*V,X=d.im[R]*V,q=p.re[R]*V,le=p.im[R]*V,Pe=Math.hypot((W+q)*.5,(X+le)*.5),xe=Math.hypot((W-q)*.5,(X-le)*.5);U=Math.max(0,Math.min(1,(Pe-xe*1.2)/(Pe+1e-9))),U*=U}M===0?ee=V*U:M===3&&(ee=V*(1-U))}O[C]=J[R]*ee,E[C]=K[R]*ee}A(k,v[M*2+F])}k%100===0&&l("render",55+k/o*45)}return{order:x,channels:v}}self.onmessage=async e=>{const t=e.data,n=(i,s)=>self.postMessage({kind:"progress",stage:i,pct:s});if(t.kind==="selftest"){const s=new Float32Array(44100);for(let b=0;b<44100;b++)s[b]=Math.sin(2*Math.PI*(220+b*.02)*b/44100)*.7;const c=AI(Mu(s),44100);let h=0,m=0;for(let b=ye;b<44100-ye;b++){const x=s[b]-c[b];h+=x*x,m+=s[b]*s[b]}self.postMessage({kind:"selftest",snr:10*Math.log10(m/Math.max(1e-12,h))});return}if(t.kind==="selftest7680"){const i=new Float32Array(ue),s=new Float32Array(ue);let c=1234567;const h=()=>(c=c*1103515245+12345&2147483647)/2147483647*2-1;for(let $=0;$<ue;$++)i[$]=h();const m=new Float32Array(ue),b=new Float32Array(ue);co(i,s,m,b,!1);let x=0,v=0;for(let $=0;$<48;$++){const z=Math.floor(($+.5)/48*ue);let G=0,re=0;for(let V=0;V<ue;V++){const ee=-2*Math.PI*z*V/ue;G+=i[V]*Math.cos(ee),re+=i[V]*Math.sin(ee)}x+=(m[z]-G)**2+(b[z]-re)**2,v+=G*G+re*re}const _=10*Math.log10(x/Math.max(1e-20,v)),I=new Float32Array(ue),O=new Float32Array(ue);co(m,b,I,O,!0);let E=0,A=0;for(let $=0;$<ue;$++)E+=(I[$]-i[$])**2,A+=i[$]*i[$];const k=10*Math.log10(E/Math.max(1e-20,A)),T=new Float32Array(qe);for(let $=0;$<qe;$++)T[$]=Math.sin(2*Math.PI*(180+$*.01)*$/44100)*.6;const M=new Float32Array(Ue*Je),F=new Float32Array(Ue*Je);Vu(T,M,F);const J=new Float32Array(qe);Qv(M,F,J);let K=0,C=0;for(let $=ue;$<qe-ue;$++){const z=T[$]-J[$];K+=z*z,C+=T[$]*T[$]}const R=10*Math.log10(C/Math.max(1e-20,K));self.postMessage({kind:"selftest7680",fftErrDb:_,invErrDb:k,stftSnrDb:R});return}if(t.kind==="neuraltest"){try{const i=await e1(t.model),s=new Float32Array(qe),c=new Float32Array(qe);for(let b=0;b<qe;b++){const x=b/44100,v=Math.sin(2*Math.PI*5.5*x)*12;s[b]=.5*Math.sin(2*Math.PI*(320+v)*x)+.25*Math.sin(2*Math.PI*(640+2*v)*x)+.15*Math.sin(2*Math.PI*(960+3*v)*x)}const h={LRe:new Float32Array(Ue*Je),LIm:new Float32Array(Ue*Je),RRe:new Float32Array(Ue*Je),RIm:new Float32Array(Ue*Je),input:new Float32Array(4*xn*Ue),vRe:new Float32Array(Ue*Je),vIm:new Float32Array(Ue*Je),outL:new Float32Array(qe),outR:new Float32Array(qe)};await t1(i,s,c,h);const m=b=>{let x=0;for(let v=ue;v<qe-ue;v+=8)x+=b[v]*b[v];return Math.sqrt(x/((qe-2*ue)/8))};self.postMessage({kind:"neuraltest",ep:fi,vL:m(h.outL),vR:m(h.outR),inL:m(s)})}catch(i){self.postMessage({kind:"neuraltest",error:String(i)})}return}const{ch0:a,ch1:l,sampleRate:u,model:d}=t,p=a.length;let o=null;if(d)try{o=await zI(a,l,d,n)}catch{o=null}let r;if(o){const i=new Float32Array(p),s=new Float32Array(p);for(let c=0;c<p;c++)i[c]=a[c]-o[0][c],s[c]=l[c]-o[1][c];r=r1(i,s,u,!1,n),r.channels[0]=o[0],r.channels[1]=o[1]}else r=r1(a,l,u,!0,n);self.postMessage({kind:"done",order:r.order,channels:r.channels},{transfer:r.channels.map(i=>i.buffer)})}})();
