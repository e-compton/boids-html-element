!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";function r(e,t){return[e[0]*t,e[1]*t]}function o(e){return Math.sqrt(i(e))}function i(e){return e[0]*e[0]+e[1]*e[1]}Object.defineProperty(t,"__esModule",{value:!0}),t.transform=t.composeTransformation=t.angleOfVector=t.vclamp=t.vmagnitude2=t.vmagnitude=t.vmod=t.vscale=t.vsub=t.vadd=void 0,t.vadd=function(e,t){return[e[0]+t[0],e[1]+t[1]]},t.vsub=function(e,t){return[e[0]-t[0],e[1]-t[1]]},t.vscale=r,t.vmod=function(e,t){return e.map((e,n)=>(e%t[n]+t[n])%t[n])},t.vmagnitude=o,t.vmagnitude2=i,t.vclamp=function(e,t){return r(e,t/o(e))},t.angleOfVector=function(e){return Math.atan2(e[1],e[0])},t.composeTransformation=function(e,t){return[[Math.cos(t),-Math.sin(t),e[0]],[Math.sin(t),Math.cos(t),e[1]],[0,0,1]]},t.transform=function(e,t){return t.map(t=>[e[0][0]*t[0]+e[0][1]*t[1]+e[0][2],e[1][0]*t[0]+e[1][1]*t[1]+e[1][2]])}},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(a=r,c=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),u="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c),"/*# ".concat(u," */")),i=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[n].concat(i).concat([o]).join("\n")}var a,c,u;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var c=0;c<e.length;c++){var u=[].concat(e[c]);r&&o[u[0]]||(n&&(u[2]?u[2]="".concat(n," and ").concat(u[2]):u[2]=n),t.push(u))}},t}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Boids=void 0,n(3);const o=r(n(6)),i=r(n(7)),a=r(n(8));class c extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("canvas");t.setAttribute("width","750"),t.setAttribute("height","600"),e.appendChild(t),requestAnimationFrame(()=>{const{width:e,height:n}=t.getBoundingClientRect(),r=o.default(500,e,n),i=t.getContext("2d"),a=(new Date).getTime();c.run(t,i,r,a)})}static run(e,t,n,r){const o=(new Date).getTime(),u=Math.min(o-r,60);i.default(e,t,n),n=a.default(n,u,e.width,e.height),requestAnimationFrame(()=>c.run(e,t,n,o))}}t.Boids=c,customElements.define("flocking-boids",c)},function(e,t,n){var r=n(4),o=n(5);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},function(e,t,n){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),a=[];function c(e){for(var t=-1,n=0;n<a.length;n++)if(a[n].identifier===e){t=n;break}return t}function u(e,t){for(var n={},r=[],o=0;o<e.length;o++){var i=e[o],u=t.base?i[0]+t.base:i[0],s=n[u]||0,l="".concat(u," ").concat(s);n[u]=s+1;var f=c(l),d={css:i[1],media:i[2],sourceMap:i[3]};-1!==f?(a[f].references++,a[f].updater(d)):a.push({identifier:l,updater:m(d,t),references:1}),r.push(l)}return r}function s(e){var t=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var o=n.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t);else{var a=i(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var l,f=(l=[],function(e,t){return l[e]=t,l.filter(Boolean).join("\n")});function d(e,t,n,r){var o=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=f(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function h(e,t,n){var r=n.css,o=n.media,i=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var p=null,v=0;function m(e,t){var n,r,o;if(t.singleton){var i=v++;n=p||(p=s(t)),r=d.bind(null,n,i,!1),o=d.bind(null,n,i,!0)}else n=s(t),r=h.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=o());var n=u(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<n.length;r++){var o=c(n[r]);a[o].references--}for(var i=u(e,t),s=0;s<n.length;s++){var l=c(n[s]);0===a[l].references&&(a[l].updater(),a.splice(l,1))}n=i}}}},function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r)()(!1);o.push([e.i,"* {\r\n  margin: 0;\r\n  padding: 0;\r\n} /* to remove the top and left whitespace */\r\n\r\nhtml,\r\nbody {\r\n  width: 100%;\r\n  height: 100%;\r\n} /* just to be sure these are full screen*/\r\n\r\nbody {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n",""]),t.default=o},function(e,t,n){"use strict";function r(e,t){return(t-e)*Math.random()+e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){return new Array(e).fill(0).map(()=>({id:Math.random().toString(36).substring(2,15),position:[r(0,t),r(0,n)],velocity:[Math.random()-.5,Math.random()-.5]}))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=[[-5,0],[-7,5],[5,0],[-7,-5]];t.default=function(e,t,n){t.clearRect(0,0,e.width,e.height),n.forEach(e=>function(e,t){const n=r.angleOfVector(t.velocity),i=r.composeTransformation(t.position,n),a=r.transform(i,o);!function(e,t){e.beginPath();for(let n=0;n<t.length;n++)0===n?e.moveTo(t[n][0],t[n][1]):e.lineTo(t[n][0],t[n][1]);e.fill()}(e,a)}(t,e))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(9);t.default=function(e,t,n,i){const s=o.create(e,e=>e.position);return console.log("tick",t),e.map(e=>function(e,t,n,i,s){const l=o.neighbourhood(e,t.position,30);return{id:t.id,position:r.vadd(t.position,r.vscale(t.velocity,n/4)),velocity:r.vclamp(r.vadd(r.vadd(t.velocity,r.vscale(a(l,t),.001)),r.vadd(r.vscale(c(l,t,[i,s]),.005),r.vscale(u(l,t),.12))),1)}}(s,e,t,n,i))};const i=Math.pow(10,2);function a(e,t){if(0===e.length)return[0,0];const n=e.map(e=>e.position).reduce((e,t)=>r.vadd(e,t),[0,0]),o=r.vscale(n,1/e.length);return r.vsub(o,t.position)}function c(e,t,n){const o=e.map(e=>r.vsub(t.position,e.position)).filter(e=>r.vmagnitude2(e)<i).map(e=>r.vscale(e,2)).reduce((e,t)=>r.vadd(e,t),[0,0]),a=[t.position[0]<200?200:0+n[0]-t.position[0]<200?-200:0,t.position[1]<200?200:0+n[1]-t.position[1]<200?-200:0];return r.vadd(o,r.vscale(a,.1))}function u(e,t){if(0===e.length)return[0,0];const n=e.map(e=>e.velocity).reduce((e,t)=>r.vadd(e,t),[0,0]);return r.vscale(n,1/e.length)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.medianOfMedians=t.printSelected=t.neighbourhood=t.create=void 0;const r=n(0);function o(e,t){if(e.length<=6)return i(e,t);const n=Math.ceil(e.length/5),r=new Array(n).fill([]).map((t,n)=>e.slice(5*n,5*(n+1))).map(e=>i(e,t));return i(r,t)}function i(e,t){const n=e.sort((e,n)=>t(n)-t(e));return n[Math.floor(n.length/2)]}t.create=function e(t,n,r=0){if(0===t.length)return null;const i=r%2,a=o(t,e=>n(e)[i]),c=n(a),u=t.filter(e=>n(e)[i]<c[i]),s=t.filter(e=>n(e)[i]>c[i]);return{location:c,value:a,leftChild:e(u,n,r+1),rightChild:e(s,n,r+1)}},t.neighbourhood=function e(t,n,o,i=0){if(!t)return[];const a=t.location,c=i%2,u=n[c]-a[c];if(Math.abs(u)<=o){const c=e(t.leftChild,n,o,i+1).concat(e(t.rightChild,n,o,i+1));return function(e,t,n){return r.vmagnitude2(r.vsub(e,t))<=n*n}(a,n,o)&&c.push(t.value),c}return e(u<=0?t.leftChild:t.rightChild,n,o,i+1)},t.printSelected=function e(t,n){n(t.value)&&console.log(t),t.leftChild&&e(t.leftChild,n),t.rightChild&&e(t.rightChild,n)},t.medianOfMedians=o}]);