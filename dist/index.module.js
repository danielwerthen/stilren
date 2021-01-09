import"@dwerthen/react-extension/react";import{registerExtension as e}from"@dwerthen/react-extension";import{renderDeclarativeRules as t}from"styletron-standard";function n(e){return Reflect.getPrototypeOf(e).constructor.name}const r={};class s{constructor(e,t){const s=`stil-ren-modifier:${n(this)}+${e}`,i=r[s];if(this.value=e,this.type=t,i)return i;r[s]=this}canCombine(e){return!1}combine(e){throw new Error("Cannot combine with "+n(e))}getKey(){return this.value}toString(){return this.getKey()}static combineModifiers(e){return e.reduce((e,t)=>{const n=e[e.length-1];return n&&n.canCombine(t)?[...e.slice(0,e.length-1),n.combine(t)]:[...e,t]},[])}}class i extends s{constructor(e){super(e,"prefix")}canCombine(e){return e instanceof i}combine(e){return this===e?e:new i(`${(this.value<e.value?this:e).value} or ${(this.value<e.value?e:this).value}`)}getKey(){return"@media "+this.value}}class o extends s{constructor(e){super(e,"suffix")}canCombine(e){return e instanceof o}combine(e){const t=e;if(this===t)return t;let n,r;const s=this.value.startsWith(":"),i=t.value.startsWith(":");return s&&i?(n=this.value<t.value?this:t,r=this.value<t.value?t:this):s?(n=t,r=this):i?(n=this,r=t):(n=this.value<t.value?this:t,r=this.value<t.value?t:this),new o(`${n.value}:${r.value}`)}getKey(){return":"+this.value}}function a(e,t){if(!(e instanceof s))throw new Error("Cannot get branch of unknown modifier");const n=e.getKey();return t[n]||(t[n]={}),t[n]}class c{constructor(e={}){this.props=e}set(e,t,n){n.reduce((e,t)=>a(t,e),this.props)[e]=t}getNode(e){if(e.length<1)return this;const t=e.reduce((e,t)=>a(t,e),this.props);return new c(t)}}var u={Active:"active",Checked:"checked",Default:"default",Disabled:"disabled",Empty:"empty",Enabled:"enabled",First:"first",FirstChild:"first-child",FirstOfType:"first-of-type",Fullscreen:"fullscreen",Focus:"focus",Hover:"hover",Indeterminate:"indeterminate",InRange:"in-range",Invalid:"invalid",LastChild:"last-child",LastOfType:"last-of-type",Link:"link",OnlyChild:"only-child",OnlyOfType:"only-of-type",Optional:"optional",OutOfRange:"out-of-range",ReadOnly:"read-only",ReadWrite:"read-write",Required:"required",Scope:"scope",Target:"target",Valid:"valid",Visited:"visited",Before:":before",After:":after"};function l({mediaPrefixes:e={},pseudoSuffixes:n=u,styletron:r}){const a=function(e,t){const n=Object.keys(e),r=Object.keys(t);return function(i){const o={};return i=>(o[i]||(o[i]=function(i){const[o,a]=function t(r){const s=n.find(e=>{return r.length>e.length&&(t=r[e.length])!==t.toLowerCase()&&t===t.toUpperCase()&&r.startsWith(e);var t});if(s){const n=e[s],[i,o]=t(r[s.length].toLowerCase()+r.slice(s.length+1));return[i,[...o,n]]}return[r,[]]}(i),[c,u]=function e(n){const s=r.find(e=>n.length>e.length&&n.endsWith(e));if(s){const r=t[s],[i,o]=e(n.substring(0,n.length-s.length));return[i,[...o,r]]}return[n,[]]}(o);return[c,s.combineModifiers([...a,...u])]}(i)),o[i])}()}(Object.keys(e).reduce((t,n)=>({...t,[n]:new i(e[n])}),{}),Object.keys(n).reduce((e,t)=>({...e,[t]:new o(n[t])}),{}));return function(e){const n=new c;for(var s in e)if(e.hasOwnProperty(s)){const t=e[s],[r,i]=a(s);n.set(r,t,i)}const i=t(n.props,r);return r.renderStyle(i)}}function f({mediaPrefixes:t,pseudoSuffixes:n,styletron:r,propPrefix:s="$"}){const i=l({styletron:r,mediaPrefixes:t,pseudoSuffixes:n});e(function(e,t){var n=[].slice.call(arguments,2);if("object"!=typeof t||"string"!=typeof e)return[e,t,n];const r={},o={};let a=!1;for(var c in t)t.hasOwnProperty(c)&&(c.startsWith(s)?(o[c.substr(1)]=t[c],a=!0):r[c]=t[c]);if(a){const e=i(o);r.className=r.className?`${r.className} ${e}`:e}return[e,r,n]})}export{l as createRenderStyle,f as registerStilren};
//# sourceMappingURL=index.module.js.map
