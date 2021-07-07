var __defProp=Object.defineProperty,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(e,t,r)=>t in e?__defProp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,__spreadValues=(e,t)=>{for(var r in t||(t={}))__hasOwnProp.call(t,r)&&__defNormalProp(e,r,t[r]);if(__getOwnPropSymbols)for(var r of __getOwnPropSymbols(t))__propIsEnum.call(t,r)&&__defNormalProp(e,r,t[r]);return e},ubrow=function(e){"use strict";function t(e,t){const r=[],o=new RegExp("^"+e.replace(/\((.*?)\)/g,"(?:$1)?").replace(/(\(\?)?:\w+/g,((e,t)=>(r.push(e.slice(1)),t?e:"([^/?]+)"))).replace(/\*/g,(()=>(r.push("path"),"([^?]*?)")))+"(?:\\?([\\s\\S]*))?$").exec(t),s={};if(o)for(let n=0;n<r.length;n++)s[r[n]]=o[n+1];return{match:!!o,params:s,pattern:e,url:t}}function r(e,t){var r,o,s,n="";for(r in e)if(void 0!==(s=e[r]))if(Array.isArray(s))for(o=0;o<s.length;o++)n&&(n+="&"),n+=encodeURIComponent(r)+"="+encodeURIComponent(s[o]);else n&&(n+="&"),n+=encodeURIComponent(r)+"="+encodeURIComponent(s);return(t||"")+n}function o(e){if(!e)return"";var t=decodeURIComponent(e);return"false"!==t&&("true"===t||(0*+t==0?+t:t))}function s(e){for(var t,r,s={},n=e.split("&");t=n.shift();)void 0!==s[r=(t=t.split("=")).shift()]?s[r]=[].concat(s[r],o(t.shift())):s[r]=o(t.shift());return s}return e.Browter=class extends class{constructor(){this.routes=[],this.handlers=[]}use(...e){return this.handlers=[...this.handlers,...e],this}get(e,...t){return this.routes.push({path:e,method:"GET",handlers:t}),this}handler({req:e,res:r,onError:o,onMatch:n,onNoMatch:i}){let a=!1;for(const{path:l,handlers:h}of this.routes.filter((t=>t.method.toLowerCase()==e.method.toLowerCase()))){let n=t(l,e.url);if(n.match){a=!0;let t=[...this.handlers,...h];e.params=n.params,e.path=n.url,e.routePath=l,e.query=s(n.url.split("?")[1]||"");let i=(e,r)=>{try{let s=t.shift();s?s(e,r,(t=>t?o(t,e,r):i(e,r))):o(null,e,r)}catch(s){o(s,e,r)}};i(e,r)}}a||i(e,r)}}{constructor(){super(),this.listener={onError:()=>{},onMatch:()=>{},onNoMatch:()=>{}},this.click=e=>{var t=e.target.closest("a"),r=t&&t.getAttribute("href");e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||e.button||e.defaultPrevented||r&&!t.target&&t.host===location.host&&"#"!=r[0]&&(e.preventDefault(),r!=location.pathname+location.search&&this.redirect(r))}}redirect(e,t={},o=!1){let s={url:e,method:"GET"};(e+=0!==Object.keys(t).length?r(t,"?"):"")==location.pathname+location.search||o?history.replaceState(e,"",e):history.pushState(e,"",e),this.handler(__spreadValues({req:s,res:{redirect:this.redirect.bind(this),send:(e=>this.listener.onMatch(s,e)).bind(this)}},this.listener))}route(){this.redirect(location.pathname+location.search)}unlisten(){this.routes=[],this.handlers=[],removeEventListener("popstate",this.route.bind(this)),removeEventListener("click",this.click)}listen(e=this.listener){this.listener=e,addEventListener("popstate",this.route.bind(this)),addEventListener("click",this.click),this.route()}},e.decode=s,e.encode=r,e.pathToRegex=t,Object.defineProperty(e,"__esModule",{value:!0}),e[Symbol.toStringTag]="Module",e}({});
