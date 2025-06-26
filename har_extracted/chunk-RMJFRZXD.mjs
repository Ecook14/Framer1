import{j as m}from"https://app.framerstatic.com/chunk-XW2R7BKI.mjs";import{a as V}from"https://app.framerstatic.com/chunk-E5VACLXG.mjs";import{c as f,e as g}from"https://app.framerstatic.com/chunk-AHQIRSXG.mjs";var h=f(w=>{"use strict";var l=V();function C(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var L=typeof Object.is=="function"?Object.is:C,D=l.useState,I=l.useEffect,J=l.useLayoutEffect,M=l.useDebugValue;function z(e,t){var n=t(),o=D({inst:{value:n,getSnapshot:t}}),r=o[0].inst,s=o[1];return J(function(){r.value=n,r.getSnapshot=t,S(r)&&s({inst:r})},[e,n,t]),I(function(){return S(r)&&s({inst:r}),e(function(){S(r)&&s({inst:r})})},[e]),M(n),n}function S(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!L(e,n)}catch{return!0}}function A(e,t){return t()}var _=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?A:z;w.useSyncExternalStore=l.useSyncExternalStore!==void 0?l.useSyncExternalStore:_});var b=f((B,E)=>{"use strict";E.exports=h()});var x=f(v=>{"use strict";var F=b();v.useSubscription=function(e){return F.useSyncExternalStore(e.subscribe,e.getCurrentValue)}});var q=f((H,y)=>{"use strict";y.exports=x()});var d=g(V()),O=g(q());var u=new Map,p=new Set;window.addEventListener("storage",e=>{if(!(e.storageArea!==localStorage||e.key===null))try{if(e.newValue===null)u.set(e.key,null);else if(e.oldValue!==e.newValue){let t=JSON.parse(e.newValue);u.set(e.key,t)}for(let t of p)t(e.key)}catch{}});function N(e,t){if(t===null)u.set(e,null),localStorage.removeItem(e);else{u.set(e,t);let n=JSON.stringify(t);localStorage.setItem(e,n)}for(let n of p)n(e)}function P(e,t){let n=(0,d.useMemo)(()=>{function s(){if(u.has(e))return u.get(e);let c=localStorage.getItem(e);if(c)try{let i=JSON.parse(c);return u.set(e,i),i}catch{}return null}function a(c){function i(j){j===e&&c()}return p.add(i),()=>p.delete(i)}return{getCurrentValue:s,subscribe:a}},[e]),o=(0,O.useSubscription)(n)??t,r=(0,d.useCallback)(s=>{try{if(m(s)){let a=u.get(e),c=u.has(e)&&a!==null?a:o,i=s(c);N(e,i)}else N(e,s)}catch{}},[o,e]);return[o,r]}export{b as a,N as b,P as c};
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-shim.production.min.js:
  (**
   * @license React
   * use-sync-external-store-shim.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-subscription/cjs/use-subscription.production.min.js:
  (**
   * @license React
   * use-subscription.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=https://app.framerstatic.com/chunk-RMJFRZXD.mjs.map
