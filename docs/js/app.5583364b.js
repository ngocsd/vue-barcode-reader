(function(e){function t(t){for(var a,o,c=t[0],s=t[1],u=t[2],l=0,f=[];l<c.length;l++)o=c[l],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&f.push(r[o][0]),r[o]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);d&&d(t);while(f.length)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,c=1;c<n.length;c++){var s=n[c];0!==r[s]&&(a=!1)}a&&(i.splice(t--,1),e=o(o.s=n[0]))}return e}var a={},r={app:0},i=[];function o(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/vue-barcode-reader/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var d=s;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("StreamBarcodeReader")],1)},i=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"scanner-container"},[n("div",{staticClass:"camera"},[n("video",{ref:"scanner",attrs:{poster:"data:image/gif,AAAA",autoplay:"",playsinline:"",muted:"",id:"video"},domProps:{muted:!0}}),n("div",{staticClass:"laser"})])]),n("button",{staticStyle:{position:"fixed"},on:{click:function(t){return e.onSnap()}}},[e._v(" snap")]),n("img",{ref:"img1"}),n("img",{ref:"img2",staticStyle:{"margin-left":"1em"}})])},c=[],s=n("1da1"),u=(n("96cf"),n("b85c")),d=n("3835"),l=n("d4ec"),f=n("bee2"),p=n("ade3"),v=(n("ac1f"),n("1276"),n("a15b"),n("d81d"),n("a630"),n("3ca3"),n("d3b7"),n("25f0"),n("4ec9"),n("ddb0"),n("b0c0"),n("224f")),h=function(){function e(){Object(l["a"])(this,e),Object(p["a"])(this,"reader",new v["QRCodeReader"]),Object(p["a"])(this,"captureCanvasContext",void 0),Object(p["a"])(this,"captureCanvas",void 0),Object(p["a"])(this,"isVertical",void 0)}return Object(f["a"])(e,[{key:"createCaptureCanvas",value:function(e){if("undefined"===typeof document)return null;var t,n,a=document.createElement("canvas");return"undefined"!==typeof e&&(e instanceof HTMLVideoElement?(t=e.videoWidth,n=e.videoHeight):e instanceof HTMLImageElement&&(t=e.naturalWidth||e.width,n=e.naturalHeight||e.height)),this.isVertical=n>t,t/=2,a.style.width=t+"px",a.style.height=n+"px",a.width=t,a.height=n,a}},{key:"getCaptureCanvas",value:function(e){if(!this.captureCanvas){var t=this.createCaptureCanvas(e);this.captureCanvas=t}return this.captureCanvas}},{key:"getCaptureCanvasContext",value:function(e){if(!this.captureCanvasContext){var t=this.getCaptureCanvas(e),n=t.getContext("2d");this.captureCanvasContext=n}return this.captureCanvasContext}},{key:"drawImageOnCanvas",value:function(e){this.getCaptureCanvasContext().drawImage(e,0,0)}},{key:"createBinaryBitmap",value:function(e){var t=new v["HTMLCanvasElementLuminanceSource"](e),n=new v["HybridBinarizer"](t);return new v["BinaryBitmap"](n)}},{key:"getData",value:function(e){var t=Array.from(e.getRawBytes().subarray(0,2)).map((function(e){return e.toString(16)})).join("").split(""),n=Object(d["a"])(t,3),a=n[0],r=n[1],i=n[2];console.log(a,r,i);var o="3"===a,c=o?parseInt(i,16)+1:void 0,s=o?parseInt(r,16):void 0,u=e.getResultMetadata();return{isSplitQRCode:o,splitCounts:c,splitIndex:s,parity:void 0|u.get(v["ResultMetadataType"].STRUCTURED_APPEND_PARITY),text:e.getText()}}},{key:"drawPoint",value:function(e,t){var n=t.x,a=t.y;e.fillRect(n-10,a-10,20,20)}},{key:"drawResult",value:function(e,t){e.beginPath(),e.fillStyle="#FF0000";var n,a=Object(u["a"])(t);try{for(a.s();!(n=a.n()).done;){var r=n.value;this.drawPoint(e,r)}}catch(i){a.e(i)}finally{a.f()}}},{key:"dd",value:function(e){try{var t=new Map;return t.set(v["DecodeHintType"].TRY_HARDER,!0),t.set(v["DecodeHintType"].ALLOWED_LENGTHS,!0),t.set(v["DecodeHintType"].POSSIBLE_FORMATS,[v["BarcodeFormat"].QR_CODE]),this.reader.decode(this.createBinaryBitmap(e),t)}catch(n){}}},{key:"decode",value:function(e,t){try{var n=this.getCaptureCanvasContext(e);n.drawImage(e,0,0);var a=this.getCaptureCanvas(e),r=this.dd(a);r&&this.drawResult(n,r.getResultPoints()),t[0].src=a.toDataURL(),n.drawImage(e,320,0,500,1e3,0,0,500,1e3),a=this.getCaptureCanvas(e),t[1].src=a.toDataURL();var i=this.dd(a);return i&&this.drawResult(n,i.getResultPoints()),t[1].src=a.toDataURL(),[r,i]}catch(o){"NotFoundException"!==o.name&&console.error(o)}}}]),e}(),m=new h,g={name:"stream-barcode-reader",data:function(){return{img:"",histories:[],stream:null}},mounted:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}}});case 2:e.stream=t.sent,e.$refs.scanner.srcObject=e.stream;case 4:case"end":return t.stop()}}),t)})))()},methods:{onSnap:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=m.decode(e.$refs.scanner,[e.$refs.img1,e.$refs.img2]),n&&console.log(n);case 2:case"end":return t.stop()}}),t)})))()}}},y=g,b=(n("6e75"),n("2877")),C=Object(b["a"])(y,o,c,!1,null,"0b23a1c6",null),w=C.exports,O={name:"App",components:{StreamBarcodeReader:w},methods:{onDecode:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];console.log(t)}}},R=O,x=(n("034f"),Object(b["a"])(R,r,i,!1,null,null,null)),j=x.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(j)}}).$mount("#app")},"6e75":function(e,t,n){"use strict";n("7b30")},"7b30":function(e,t,n){},"85ec":function(e,t,n){}});
//# sourceMappingURL=app.5583364b.js.map