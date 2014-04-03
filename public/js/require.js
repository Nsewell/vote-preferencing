var requirejs,require,define;(function(global){function isFunction(t){return"[object Function]"===ostring.call(t)}function isArray(t){return"[object Array]"===ostring.call(t)}function each(t,e){if(t){var n;for(n=0;t.length>n&&(!t[n]||!e(t[n],n,t));n+=1);}}function eachReverse(t,e){if(t){var n;for(n=t.length-1;n>-1&&(!t[n]||!e(t[n],n,t));n-=1);}}function hasProp(t,e){return hasOwn.call(t,e)}function getOwn(t,e){return hasProp(t,e)&&t[e]}function eachProp(t,e){var n;for(n in t)if(hasProp(t,n)&&e(t[n],n))break}function mixin(t,e,n,r){return e&&eachProp(e,function(e,i){(n||!hasProp(t,i))&&(r&&"string"!=typeof e?(t[i]||(t[i]={}),mixin(t[i],e,n,r)):t[i]=e)}),t}function bind(t,e){return function(){return e.apply(t,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(t){throw t}function getGlobal(t){if(!t)return t;var e=global;return each(t.split("."),function(t){e=e[t]}),e}function makeError(t,e,n,r){var i=Error(e+"\nhttp://requirejs.org/docs/errors.html#"+t);return i.requireType=t,i.requireModules=r,n&&(i.originalError=n),i}function newContext(t){function e(t){var e,n;for(e=0;t[e];e+=1)if(n=t[e],"."===n)t.splice(e,1),e-=1;else if(".."===n){if(1===e&&(".."===t[2]||".."===t[0]))break;e>0&&(t.splice(e-1,2),e-=2)}}function n(t,n,r){var i,o,a,u,s,c,l,f,h,p,d,g=n&&n.split("/"),m=g,v=_.map,y=v&&v["*"];if(t&&"."===t.charAt(0)&&(n?(m=getOwn(_.pkgs,n)?g=[n]:g.slice(0,g.length-1),t=m.concat(t.split("/")),e(t),o=getOwn(_.pkgs,i=t[0]),t=t.join("/"),o&&t===i+"/"+o.main&&(t=i)):0===t.indexOf("./")&&(t=t.substring(2))),r&&v&&(g||y)){for(u=t.split("/"),s=u.length;s>0;s-=1){if(l=u.slice(0,s).join("/"),g)for(c=g.length;c>0;c-=1)if(a=getOwn(v,g.slice(0,c).join("/")),a&&(a=getOwn(a,l))){f=a,h=s;break}if(f)break;!p&&y&&getOwn(y,l)&&(p=getOwn(y,l),d=s)}!f&&p&&(f=p,h=d),f&&(u.splice(0,h,f),t=u.join("/"))}return t}function r(t){isBrowser&&each(scripts(),function(e){return e.getAttribute("data-requiremodule")===t&&e.getAttribute("data-requirecontext")===b.contextName?(e.parentNode.removeChild(e),!0):void 0})}function i(t){var e=getOwn(_.paths,t);return e&&isArray(e)&&e.length>1?(r(t),e.shift(),b.require.undef(t),b.require([t]),!0):void 0}function o(t){var e,n=t?t.indexOf("!"):-1;return n>-1&&(e=t.substring(0,n),t=t.substring(n+1,t.length)),[e,t]}function a(t,e,r,i){var a,u,s,c,l=null,f=e?e.name:null,h=t,p=!0,d="";return t||(p=!1,t="_@r"+(A+=1)),c=o(t),l=c[0],t=c[1],l&&(l=n(l,f,i),u=getOwn(T,l)),t&&(l?d=u&&u.normalize?u.normalize(t,function(t){return n(t,f,i)}):n(t,f,i):(d=n(t,f,i),c=o(d),l=c[0],d=c[1],r=!0,a=b.nameToUrl(d))),s=!l||u||r?"":"_unnormalized"+(j+=1),{prefix:l,name:d,parentMap:e,unnormalized:!!s,url:a,originalName:h,isDefine:p,id:(l?l+"!"+d:d)+s}}function u(t){var e=t.id,n=getOwn(k,e);return n||(n=k[e]=new b.Module(t)),n}function s(t,e,n){var r=t.id,i=getOwn(k,r);!hasProp(T,r)||i&&!i.defineEmitComplete?(i=u(t),i.error&&"error"===e?n(i.error):i.on(e,n)):"defined"===e&&n(T[r])}function c(t,e){var n=t.requireModules,r=!1;e?e(t):(each(n,function(e){var n=getOwn(k,e);n&&(n.error=t,n.events.error&&(r=!0,n.emit("error",t)))}),r||req.onError(t))}function l(){globalDefQueue.length&&(apsp.apply(C,[C.length-1,0].concat(globalDefQueue)),globalDefQueue=[])}function f(t){delete k[t],delete E[t]}function h(t,e,n){var r=t.map.id;t.error?t.emit("error",t.error):(e[r]=!0,each(t.depMaps,function(r,i){var o=r.id,a=getOwn(k,o);!a||t.depMatched[i]||n[o]||(getOwn(e,o)?(t.defineDep(i,T[o]),t.check()):h(a,e,n))}),n[r]=!0)}function p(){var t,e,n,o,a=1e3*_.waitSeconds,u=a&&b.startTime+a<(new Date).getTime(),s=[],l=[],f=!1,d=!0;if(!y){if(y=!0,eachProp(E,function(n){if(t=n.map,e=t.id,n.enabled&&(t.isDefine||l.push(n),!n.error))if(!n.inited&&u)i(e)?(o=!0,f=!0):(s.push(e),r(e));else if(!n.inited&&n.fetched&&t.isDefine&&(f=!0,!t.prefix))return d=!1}),u&&s.length)return n=makeError("timeout","Load timeout for modules: "+s,null,s),n.contextName=b.contextName,c(n);d&&each(l,function(t){h(t,{},{})}),u&&!o||!f||!isBrowser&&!isWebWorker||M||(M=setTimeout(function(){M=0,p()},50)),y=!1}}function d(t){hasProp(T,t[0])||u(a(t[0],null,!0)).init(t[1],t[2])}function g(t,e,n,r){t.detachEvent&&!isOpera?r&&t.detachEvent(r,e):t.removeEventListener(n,e,!1)}function m(t){var e=t.currentTarget||t.srcElement;return g(e,b.onScriptLoad,"load","onreadystatechange"),g(e,b.onScriptError,"error"),{node:e,id:e&&e.getAttribute("data-requiremodule")}}function v(){var t;for(l();C.length;){if(t=C.shift(),null===t[0])return c(makeError("mismatch","Mismatched anonymous define() module: "+t[t.length-1]));d(t)}}var y,x,b,w,M,_={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},config:{}},k={},E={},S={},C=[],T={},N={},A=1,j=1;return w={require:function(t){return t.require?t.require:t.require=b.makeRequire(t.map)},exports:function(t){return t.usingExports=!0,t.map.isDefine?t.exports?t.exports:t.exports=T[t.map.id]={}:void 0},module:function(t){return t.module?t.module:t.module={id:t.map.id,uri:t.map.url,config:function(){var e,n=getOwn(_.pkgs,t.map.id);return e=n?getOwn(_.config,t.map.id+"/"+n.main):getOwn(_.config,t.map.id),e||{}},exports:T[t.map.id]}}},x=function(t){this.events=getOwn(S,t.id)||{},this.map=t,this.shim=getOwn(_.shim,t.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},x.prototype={init:function(t,e,n,r){r=r||{},this.inited||(this.factory=e,n?this.on("error",n):this.events.error&&(n=bind(this,function(t){this.emit("error",t)})),this.depMaps=t&&t.slice(0),this.errback=n,this.inited=!0,this.ignore=r.ignore,r.enabled||this.enabled?this.enable():this.check())},defineDep:function(t,e){this.depMatched[t]||(this.depMatched[t]=!0,this.depCount-=1,this.depExports[t]=e)},fetch:function(){if(!this.fetched){this.fetched=!0,b.startTime=(new Date).getTime();var t=this.map;return this.shim?(b.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return t.prefix?this.callPlugin():this.load()})),void 0):t.prefix?this.callPlugin():this.load()}},load:function(){var t=this.map.url;N[t]||(N[t]=!0,b.load(this.map.id,t))},check:function(){if(this.enabled&&!this.enabling){var t,e,n=this.map.id,r=this.depExports,i=this.exports,o=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,1>this.depCount&&!this.defined){if(isFunction(o)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{i=b.execCb(n,o,r,i)}catch(a){t=a}else i=b.execCb(n,o,r,i);if(this.map.isDefine&&(e=this.module,e&&void 0!==e.exports&&e.exports!==this.exports?i=e.exports:void 0===i&&this.usingExports&&(i=this.exports)),t)return t.requireMap=this.map,t.requireModules=this.map.isDefine?[this.map.id]:null,t.requireType=this.map.isDefine?"define":"require",c(this.error=t)}else i=o;this.exports=i,this.map.isDefine&&!this.ignore&&(T[n]=i,req.onResourceLoad&&req.onResourceLoad(b,this.map,this.depMaps)),f(n),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var t=this.map,e=t.id,r=a(t.prefix);this.depMaps.push(r),s(r,"defined",bind(this,function(r){var i,o,l,h=this.map.name,p=this.map.parentMap?this.map.parentMap.name:null,d=b.makeRequire(t.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(r.normalize&&(h=r.normalize(h,function(t){return n(t,p,!0)})||""),o=a(t.prefix+"!"+h,this.map.parentMap),s(o,"defined",bind(this,function(t){this.init([],function(){return t},null,{enabled:!0,ignore:!0})})),l=getOwn(k,o.id),l&&(this.depMaps.push(o),this.events.error&&l.on("error",bind(this,function(t){this.emit("error",t)})),l.enable()),void 0):(i=bind(this,function(t){this.init([],function(){return t},null,{enabled:!0})}),i.error=bind(this,function(t){this.inited=!0,this.error=t,t.requireModules=[e],eachProp(k,function(t){0===t.map.id.indexOf(e+"_unnormalized")&&f(t.map.id)}),c(t)}),i.fromText=bind(this,function(n,r){var o=t.name,s=a(o),l=useInteractive;r&&(n=r),l&&(useInteractive=!1),u(s),hasProp(_.config,e)&&(_.config[o]=_.config[e]);try{req.exec(n)}catch(f){return c(makeError("fromtexteval","fromText eval for "+e+" failed: "+f,f,[e]))}l&&(useInteractive=!0),this.depMaps.push(s),b.completeLoad(o),d([o],i)}),r.load(t.name,d,i,_),void 0)})),b.enable(r,this),this.pluginMaps[r.id]=r},enable:function(){E[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(t,e){var n,r,i;if("string"==typeof t){if(t=a(t,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[e]=t,i=getOwn(w,t.id))return this.depExports[e]=i(this),void 0;this.depCount+=1,s(t,"defined",bind(this,function(t){this.defineDep(e,t),this.check()})),this.errback&&s(t,"error",bind(this,this.errback))}n=t.id,r=k[n],hasProp(w,n)||!r||r.enabled||b.enable(t,this)})),eachProp(this.pluginMaps,bind(this,function(t){var e=getOwn(k,t.id);e&&!e.enabled&&b.enable(t,this)})),this.enabling=!1,this.check()},on:function(t,e){var n=this.events[t];n||(n=this.events[t]=[]),n.push(e)},emit:function(t,e){each(this.events[t],function(t){t(e)}),"error"===t&&delete this.events[t]}},b={config:_,contextName:t,registry:k,defined:T,urlFetched:N,defQueue:C,Module:x,makeModuleMap:a,nextTick:req.nextTick,onError:c,configure:function(t){t.baseUrl&&"/"!==t.baseUrl.charAt(t.baseUrl.length-1)&&(t.baseUrl+="/");var e=_.pkgs,n=_.shim,r={paths:!0,config:!0,map:!0};eachProp(t,function(t,e){r[e]?"map"===e?(_.map||(_.map={}),mixin(_[e],t,!0,!0)):mixin(_[e],t,!0):_[e]=t}),t.shim&&(eachProp(t.shim,function(t,e){isArray(t)&&(t={deps:t}),!t.exports&&!t.init||t.exportsFn||(t.exportsFn=b.makeShimExports(t)),n[e]=t}),_.shim=n),t.packages&&(each(t.packages,function(t){var n;t="string"==typeof t?{name:t}:t,n=t.location,e[t.name]={name:t.name,location:n||t.name,main:(t.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}}),_.pkgs=e),eachProp(k,function(t,e){t.inited||t.map.unnormalized||(t.map=a(e))}),(t.deps||t.callback)&&b.require(t.deps||[],t.callback)},makeShimExports:function(t){function e(){var e;return t.init&&(e=t.init.apply(global,arguments)),e||t.exports&&getGlobal(t.exports)}return e},makeRequire:function(e,r){function i(n,o,s){var l,f,h;return r.enableBuildCallback&&o&&isFunction(o)&&(o.__requireJsBuild=!0),"string"==typeof n?isFunction(o)?c(makeError("requireargs","Invalid require call"),s):e&&hasProp(w,n)?w[n](k[e.id]):req.get?req.get(b,n,e,i):(f=a(n,e,!1,!0),l=f.id,hasProp(T,l)?T[l]:c(makeError("notloaded",'Module name "'+l+'" has not been loaded yet for context: '+t+(e?"":". Use require([])")))):(v(),b.nextTick(function(){v(),h=u(a(null,e)),h.skipMap=r.skipMap,h.init(n,o,s,{enabled:!0}),p()}),i)}return r=r||{},mixin(i,{isBrowser:isBrowser,toUrl:function(t){var r,i=t.lastIndexOf("."),o=t.split("/")[0],a="."===o||".."===o;return-1!==i&&(!a||i>1)&&(r=t.substring(i,t.length),t=t.substring(0,i)),b.nameToUrl(n(t,e&&e.id,!0),r,!0)},defined:function(t){return hasProp(T,a(t,e,!1,!0).id)},specified:function(t){return t=a(t,e,!1,!0).id,hasProp(T,t)||hasProp(k,t)}}),e||(i.undef=function(t){l();var n=a(t,e,!0),r=getOwn(k,t);delete T[t],delete N[n.url],delete S[t],r&&(r.events.defined&&(S[t]=r.events),f(t))}),i},enable:function(t){var e=getOwn(k,t.id);e&&u(t).enable()},completeLoad:function(t){var e,n,r,o=getOwn(_.shim,t)||{},a=o.exports;for(l();C.length;){if(n=C.shift(),null===n[0]){if(n[0]=t,e)break;e=!0}else n[0]===t&&(e=!0);d(n)}if(r=getOwn(k,t),!e&&!hasProp(T,t)&&r&&!r.inited){if(!(!_.enforceDefine||a&&getGlobal(a)))return i(t)?void 0:c(makeError("nodefine","No define call for "+t,null,[t]));d([t,o.deps||[],o.exportsFn])}p()},nameToUrl:function(t,e,n){var r,i,o,a,u,s,c,l,f;if(req.jsExtRegExp.test(t))l=t+(e||"");else{for(r=_.paths,i=_.pkgs,u=t.split("/"),s=u.length;s>0;s-=1){if(c=u.slice(0,s).join("/"),o=getOwn(i,c),f=getOwn(r,c)){isArray(f)&&(f=f[0]),u.splice(0,s,f);break}if(o){a=t===o.name?o.location+"/"+o.main:o.location,u.splice(0,s,a);break}}l=u.join("/"),l+=e||(/\?/.test(l)||n?"":".js"),l=("/"===l.charAt(0)||l.match(/^[\w\+\.\-]+:/)?"":_.baseUrl)+l}return _.urlArgs?l+((-1===l.indexOf("?")?"?":"&")+_.urlArgs):l},load:function(t,e){req.load(b,t,e)},execCb:function(t,e,n,r){return e.apply(r,n)},onScriptLoad:function(t){if("load"===t.type||readyRegExp.test((t.currentTarget||t.srcElement).readyState)){interactiveScript=null;var e=m(t);b.completeLoad(e.id)}},onScriptError:function(t){var e=m(t);return i(e.id)?void 0:c(makeError("scripterror","Script error for: "+e.id,t,[e.id]))}},b.require=b.makeRequire(),b}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(t){return"interactive"===t.readyState?interactiveScript=t:void 0}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.1.8",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,apsp=ap.splice,isBrowser=!("undefined"==typeof window||!navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"==""+opera,contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if(void 0===define){if(requirejs!==void 0){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}void 0===require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(t,e,n,r){var i,o,a=defContextName;return isArray(t)||"string"==typeof t||(o=t,isArray(e)?(t=e,e=n,n=r):t=[]),o&&o.context&&(a=o.context),i=getOwn(contexts,a),i||(i=contexts[a]=req.s.newContext(a)),o&&i.configure(o),i.require(t,e,n)},req.config=function(t){return req(t)},req.nextTick="undefined"!=typeof setTimeout?function(t){setTimeout(t,4)}:function(t){t()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(t){req[t]=function(){var e=contexts[defContextName];return e.require[t].apply(e,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(t){var e=t.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return e.type=t.scriptType||"text/javascript",e.charset="utf-8",e.async=!0,e},req.load=function(t,e,n){var r,i=t&&t.config||{};if(isBrowser)return r=req.createNode(i,e,n),r.setAttribute("data-requirecontext",t.contextName),r.setAttribute("data-requiremodule",e),!r.attachEvent||r.attachEvent.toString&&0>(""+r.attachEvent).indexOf("[native code")||isOpera?(r.addEventListener("load",t.onScriptLoad,!1),r.addEventListener("error",t.onScriptError,!1)):(useInteractive=!0,r.attachEvent("onreadystatechange",t.onScriptLoad)),r.src=n,currentlyAddingScript=r,baseElement?head.insertBefore(r,baseElement):head.appendChild(r),currentlyAddingScript=null,r;if(isWebWorker)try{importScripts(n),t.completeLoad(e)}catch(o){t.onError(makeError("importscripts","importScripts failed for "+e+" at "+n,o,[e]))}},isBrowser&&eachReverse(scripts(),function(t){return head||(head=t.parentNode),dataMain=t.getAttribute("data-main"),dataMain?(mainScript=dataMain,cfg.baseUrl||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0):void 0}),define=function(t,e,n){var r,i;"string"!=typeof t&&(n=e,e=t,t=null),isArray(e)||(n=e,e=null),!e&&isFunction(n)&&(e=[],n.length&&((""+n).replace(commentRegExp,"").replace(cjsRequireRegExp,function(t,n){e.push(n)}),e=(1===n.length?["require"]:["require","exports","module"]).concat(e))),useInteractive&&(r=currentlyAddingScript||getInteractiveScript(),r&&(t||(t=r.getAttribute("data-requiremodule")),i=contexts[r.getAttribute("data-requirecontext")])),(i?i.defQueue:globalDefQueue).push([t,e,n])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}})(this);