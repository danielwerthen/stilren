!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@dwerthen/react-extension"),require("styletron-standard")):"function"==typeof define&&define.amd?define(["exports","@dwerthen/react-extension","styletron-standard"],t):t((e=e||self).stilren={},e.reactExtension,e.styletronStandard)}(this,function(e,t,n){function r(e){return Reflect.getPrototypeOf(e).constructor.name}const s={};class i{constructor(e,t){const n=`stil-ren-modifier:${r(this)}+${e}`,i=s[n];if(this.value=e,this.type=t,i)return i;s[n]=this}canCombine(e){return!1}combine(e){throw new Error("Cannot combine with "+r(e))}getKey(){return this.value}toString(){return this.getKey()}static combineModifiers(e){return e.reduce((e,t)=>{const n=e[e.length-1];return n&&n.canCombine(t)?[...e.slice(0,e.length-1),n.combine(t)]:[...e,t]},[])}}class o extends i{constructor(e){super(e,"prefix")}canCombine(e){return e instanceof o}combine(e){return this===e?e:new o(`${(this.value<e.value?this:e).value} or ${(this.value<e.value?e:this).value}`)}getKey(){return"@media "+this.value}}class a extends i{constructor(e){super(e,"suffix")}canCombine(e){return e instanceof a}combine(e){const t=e;if(this===t)return t;let n,r;const s=this.value.startsWith(":"),i=t.value.startsWith(":");return s&&i?(n=this.value<t.value?this:t,r=this.value<t.value?t:this):s?(n=t,r=this):i?(n=this,r=t):(n=this.value<t.value?this:t,r=this.value<t.value?t:this),new a(`${n.value}:${r.value}`)}getKey(){return":"+this.value}}function c(e,t){if(!(e instanceof i))throw new Error("Cannot get branch of unknown modifier");const n=e.getKey();return t[n]||(t[n]={}),t[n]}class u{constructor(e={}){this.props=e}set(e,t,n){n.reduce((e,t)=>c(t,e),this.props)[e]=t}getNode(e){if(e.length<1)return this;const t=e.reduce((e,t)=>c(t,e),this.props);return new u(t)}}var l={Active:"active",Checked:"checked",Default:"default",Disabled:"disabled",Empty:"empty",Enabled:"enabled",First:"first",FirstChild:"first-child",FirstOfType:"first-of-type",Fullscreen:"fullscreen",Focus:"focus",Hover:"hover",Indeterminate:"indeterminate",InRange:"in-range",Invalid:"invalid",LastChild:"last-child",LastOfType:"last-of-type",Link:"link",OnlyChild:"only-child",OnlyOfType:"only-of-type",Optional:"optional",OutOfRange:"out-of-range",ReadOnly:"read-only",ReadWrite:"read-write",Required:"required",Scope:"scope",Target:"target",Valid:"valid",Visited:"visited",Before:":before",After:":after"};function f({mediaPrefixes:e={},pseudoSuffixes:t=l,styletron:r}){const s=function(e,t){const n=Object.keys(e),r=Object.keys(t);return function(s){const o={};return s=>(o[s]||(o[s]=function(s){const[o,a]=function t(r){const s=n.find(e=>{return r.length>e.length&&(t=r[e.length])!==t.toLowerCase()&&t===t.toUpperCase()&&r.startsWith(e);var t});if(s){const n=e[s],[i,o]=t(r[s.length].toLowerCase()+r.slice(s.length+1));return[i,[...o,n]]}return[r,[]]}(s),[c,u]=function e(n){const s=r.find(e=>n.length>e.length&&n.endsWith(e));if(s){const r=t[s],[i,o]=e(n.substring(0,n.length-s.length));return[i,[...o,r]]}return[n,[]]}(o);return[c,i.combineModifiers([...a,...u])]}(s)),o[s])}()}(Object.keys(e).reduce((t,n)=>({...t,[n]:new o(e[n])}),{}),Object.keys(t).reduce((e,n)=>({...e,[n]:new a(t[n])}),{}));return function(e){const t=new u;for(var i in e)if(e.hasOwnProperty(i)){const n=e[i],[r,o]=s(i);t.set(r,n,o)}const o=n.renderDeclarativeRules(t.props,r);return r.renderStyle(o)}}e.createRenderStyle=f,e.registerStilren=function({mediaPrefixes:e,pseudoSuffixes:n,styletron:r,propPrefix:s="$"}){const i=f({styletron:r,mediaPrefixes:e,pseudoSuffixes:n});t.registerExtension(function(e,t){var n=[].slice.call(arguments,2);if("object"!=typeof t)return[e,t,n];const r={},o={};let a=!1;for(var c in t)t.hasOwnProperty(c)&&(c.startsWith(s)?(o[c.substr(1)]=t[c],a=!0):r[c]=t[c]);if(a){const e=i(o);r.className=r.className?`${r.className} ${e}`:e}return[e,r,n]})}});
//# sourceMappingURL=index.umd.js.map
