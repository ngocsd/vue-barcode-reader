(function(e){function t(t){for(var a,o,c=t[0],u=t[1],s=t[2],l=0,p=[];l<c.length;l++)o=c[l],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&p.push(r[o][0]),r[o]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);d&&d(t);while(p.length)p.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,c=1;c<n.length;c++){var u=n[c];0!==r[u]&&(a=!1)}a&&(i.splice(t--,1),e=o(o.s=n[0]))}return e}var a={},r={app:0},i=[];function o(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/vue-barcode-reader/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var d=u;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"2a4f":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("StreamBarcodeReader")],1)},i=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"scanner-container"},[n("div",{staticClass:"camera"},[n("video",{ref:"scanner",attrs:{poster:"data:image/gif,AAAA",autoplay:"",playsinline:"",muted:"",id:"video"},domProps:{muted:!0}}),n("div",{staticClass:"overlay-element"})]),n("div",{staticClass:"fixed"},[n("button",{on:{click:function(t){return e.onSnap()}}},[e._v(" snap")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.pattenStr,expression:"pattenStr"}],attrs:{type:"text"},domProps:{value:e.pattenStr},on:{input:function(t){t.target.composing||(e.pattenStr=t.target.value)}}})])]),n("hr"),n("ul",{key:e.key},e._l(e.msgs,(function(t){return n("li",{key:e.key},[e._v(" "+e._s(JSON.stringify(t))+" ")])})),0)])},c=[],u=n("b85c"),s=n("1da1"),d=(n("d81d"),n("4de4"),n("ac1f"),n("1276"),n("498a"),n("a9e3d"),n("96cf"),n("3835")),l=n("d4ec"),p=n("bee2"),f=n("ade3"),v=(n("a15b"),n("a630"),n("3ca3"),n("d3b7"),n("25f0"),n("4ec9"),n("ddb0"),n("b0c0"),n("224f")),h=function(){function e(){Object(l["a"])(this,e),Object(f["a"])(this,"reader",new v["QRCodeReader"]),Object(f["a"])(this,"captureCanvasContext",void 0),Object(f["a"])(this,"captureCanvas",void 0),Object(f["a"])(this,"isVertical",void 0)}return Object(p["a"])(e,[{key:"createCaptureCanvas",value:function(e,t){if("undefined"===typeof document)return null;var n,a,r=document.createElement("canvas");return"undefined"!==typeof e&&(e instanceof HTMLVideoElement?(n=e.videoWidth,a=e.videoHeight):e instanceof HTMLImageElement&&(n=e.naturalWidth||e.width,a=e.naturalHeight||e.height)),this.isVertical=a>n,n*=t,r.style.width=n+"px",r.style.height=a+"px",r.width=n,r.height=a,r}},{key:"getCaptureCanvas",value:function(e){if(!this.captureCanvas){var t=this.createCaptureCanvas(e);this.captureCanvas=t}return this.captureCanvas}},{key:"getCaptureCanvasContext",value:function(e){if(!this.captureCanvasContext){var t=this.getCaptureCanvas(e),n=t.getContext("2d");this.captureCanvasContext=n}return this.captureCanvasContext}},{key:"drawImageOnCanvas",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[0,50],n=(t[1]-t[0])/100,a=this.createCaptureCanvas(e,n),r=a.width,i=a.height,o=e.videoWidth*t[0]/100,c=a.getContext("2d");return c.drawImage(e,o,0,r,i,0,0,r,i),a}},{key:"createBinaryBitmap",value:function(e){var t=new v["HTMLCanvasElementLuminanceSource"](e),n=new v["HybridBinarizer"](t);return new v["BinaryBitmap"](n)}},{key:"getData",value:function(e){var t=Array.from(e.getRawBytes().subarray(0,2)).map((function(e){return e.toString(16)})).join("").split(""),n=Object(d["a"])(t,3),a=n[0],r=n[1],i=n[2];console.log(a,r,i);var o="3"===a,c=o?parseInt(i,16)+1:void 0,u=o?parseInt(r,16):void 0,s=e.getResultMetadata();return{isSplitQRCode:o,splitCounts:c,splitIndex:u,parity:void 0|s.get(v["ResultMetadataType"].STRUCTURED_APPEND_PARITY),text:e.getText()}}},{key:"drawPoint",value:function(e,t){var n=t.x,a=t.y;e.fillRect(n-10,a-10,20,20)}},{key:"drawResult",value:function(e,t){if(e){if(t){var n=e.getContext("2d");n.beginPath(),n.fillStyle="#FF0000";var a,r=Object(u["a"])(t);try{for(r.s();!(a=r.n()).done;){var i=a.value;this.drawPoint(n,i)}}catch(c){r.e(c)}finally{r.f()}}var o=document.createElement("img");o.style.marginRight="0.3rem",o.style.width="30vw",o.src=e.toDataURL(),document.body.appendChild(o)}}},{key:"dd",value:function(e){try{var t=new Map;return t.set(v["DecodeHintType"].TRY_HARDER,!0),t.set(v["DecodeHintType"].ALLOWED_LENGTHS,!0),t.set(v["DecodeHintType"].POSSIBLE_FORMATS,[v["BarcodeFormat"].QR_CODE]),this.reader.decode(this.createBinaryBitmap(e),t)}catch(n){}}},{key:"decodeImage",value:function(e,t){var n,a=[],r=Object(u["a"])(t);try{for(r.s();!(n=r.n()).done;){var i=n.value,o=this.drawImageOnCanvas(e,i),c=this.dd(o);a.push(c)}}catch(s){r.e(s)}finally{r.f()}return a.filter((function(e){return!!e}))}},{key:"decode",value:function(e,t){try{var n=this.decodeImage(e,t);return n.map(this.getData)}catch(a){"NotFoundException"!==a.name&&console.error(a)}}}]),e}(),m=new h,y={name:"stream-barcode-reader",data:function(){return{key:0,msgs:{},pattenStr:"10-50;  50-90; 35-75; 40-70;",histories:[],stream:null,interval:null}},mounted:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,navigator.mediaDevices.getUserMedia({video:{width:1024,height:1024,facingMode:{ideal:"environment"}}});case 2:e.stream=t.sent,e.$refs.scanner.srcObject=e.stream;case 4:case"end":return t.stop()}}),t)})))()},computed:{pattern:function(){return this.pattenStr.split(";").filter((function(e){return!!e})).map((function(e){return e.trim().split("-").map((function(e){return Number(e)}))}))}},methods:{onSnap:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.interval&&(clearInterval(e.interval),e.msgs={}),n=e,e.interval=setInterval((function(){var t,a=m.decode(e.$refs.scanner,e.pattern),r=Object(u["a"])(a);try{for(r.s();!(t=r.n()).done;){var i=t.value;n.msgs[i.parity]||(n.msgs[i.parity]=[]);var o=n.msgs[i.parity];o[i.splitIndex]||(o[i.splitIndex]=i.text,n.key++)}}catch(c){r.e(c)}finally{r.f()}}),50);case 3:case"end":return t.stop()}}),t)})))()}}},g=y,b=(n("5f5d"),n("2877")),C=Object(b["a"])(g,o,c,!1,null,"1130d740",null),w=C.exports,O={name:"App",components:{StreamBarcodeReader:w}},x=O,j=(n("034f"),Object(b["a"])(x,r,i,!1,null,null,null)),S=j.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(S)}}).$mount("#app")},"5f5d":function(e,t,n){"use strict";n("2a4f")},"85ec":function(e,t,n){}});
//# sourceMappingURL=app.0cf63b07.js.map