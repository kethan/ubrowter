"use strict";var e=Object.defineProperty,t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,s=(t,r,o)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o;function n(e,t){const r=[],o=new RegExp("^"+e.replace(/\((.*?)\)/g,"(?:$1)?").replace(/(\(\?)?:\w+/g,((e,t)=>(r.push(e.slice(1)),t?e:"([^/?]+)"))).replace(/\*/g,(()=>(r.push("path"),"([^?]*?)")))+"(?:\\?([\\s\\S]*))?$").exec(t),s={};if(o)for(let n=0;n<r.length;n++)s[r[n]]=o[n+1];return{match:!!o,params:s,pattern:e,url:t}}function i(e,t){var r,o,s,n="";for(r in e)if(void 0!==(s=e[r]))if(Array.isArray(s))for(o=0;o<s.length;o++)n&&(n+="&"),n+=encodeURIComponent(r)+"="+encodeURIComponent(s[o]);else n&&(n+="&"),n+=encodeURIComponent(r)+"="+encodeURIComponent(s);return(t||"")+n}function a(e){if(!e)return"";var t=decodeURIComponent(e);return"false"!==t&&("true"===t||(0*+t==0?+t:t))}function h(e){for(var t,r,o={},s=e.split("&");t=s.shift();)void 0!==o[r=(t=t.split("=")).shift()]?o[r]=[].concat(o[r],a(t.shift())):o[r]=a(t.shift());return o}Object.defineProperty(exports,"__esModule",{value:!0}),exports[Symbol.toStringTag]="Module";exports.Browter=class extends class{constructor(){this.routes=[],this.handlers=[]}use(...e){return this.handlers=[...this.handlers,...e],this}get(e,...t){return this.routes.push({path:e,method:"GET",handlers:t}),this}handler({req:e,res:t,onError:r,onMatch:o,onNoMatch:s}){let i=!1;for(const{path:a,handlers:l}of this.routes.filter((t=>t.method.toLowerCase()==e.method.toLowerCase()))){let o=n(a,e.url);if(o.match){i=!0;let s=[...this.handlers,...l];e.params=o.params,e.path=o.url,e.routePath=a,e.query=h(o.url.split("?")[1]||"");let n=(e,t)=>{try{let o=s.shift();o?o(e,t,(o=>o?r(o,e,t):n(e,t))):r(null,e,t)}catch(o){r(o,e,t)}};n(e,t)}}i||s(e,t)}}{constructor(){super(),this.listener={onError:()=>{},onMatch:()=>{},onNoMatch:()=>{}},this.click=e=>{var t=e.target.closest("a"),r=t&&t.getAttribute("href");e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||e.button||e.defaultPrevented||r&&!t.target&&t.host===location.host&&"#"!=r[0]&&(e.preventDefault(),r!=location.pathname+location.search&&this.redirect(r))}}redirect(e,n={},a=!1){let h={url:e,method:"GET"};(e+=0!==Object.keys(n).length?i(n,"?"):"")==location.pathname+location.search||a?history.replaceState(e,"",e):history.pushState(e,"",e),this.handler(((e,n)=>{for(var i in n||(n={}))r.call(n,i)&&s(e,i,n[i]);if(t)for(var i of t(n))o.call(n,i)&&s(e,i,n[i]);return e})({req:h,res:{redirect:this.redirect.bind(this),send:(e=>this.listener.onMatch(h,e)).bind(this)}},this.listener))}route(){this.redirect(location.pathname+location.search)}unlisten(){removeEventListener("popstate",this.route.bind(this)),removeEventListener("click",this.click)}listen(e=this.listener){this.listener=e,addEventListener("popstate",this.route.bind(this)),addEventListener("click",this.click),this.route()}},exports.decode=h,exports.encode=i,exports.pathToRegex=n;
