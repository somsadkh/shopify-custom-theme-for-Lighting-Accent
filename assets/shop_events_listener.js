!function(){var e=function(e){var t={exports:{}};return e.call(t.exports,t,t.exports),t.exports},c=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),d=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},v=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)};e(function(e,t){"use strict";function s(e,a){if(e.length!=a.length)throw Error("Payload body and response have different number of items");e.forEach(function(e,t){var n=1;try{n=parseInt(a[t].quantity,10)||1}catch(r){console&&console.warn&&console.warn("[shop_events_listener] Error in handleBulkItemCartAddResponse: "+r.message)}l(e,n)})}function i(e,t){for(var n=new Array(t),r=0;r<t;r++)n[r]={};var a=!0,o=!1,i=undefined;try{for(var c,d=decodeURI(e).split("&")[Symbol.iterator]();!(a=(c=d.next()).done);a=!0){var s=c.value.split("="),u=s[0].match(/items\[(\d+)\]\[(\w+)\].*/);if(u){var l=u[1],y=u[2];"quantity"===y?n[l].quantity=s[1]:"id"===y&&(n[l].id=s[1])}}}catch(f){o=!0,i=f}finally{try{!a&&d["return"]&&d["return"]()}finally{if(o)throw i}}return n}function u(e){if(!e)return 1;try{return JSON.parse(e).quantity||1}catch(a){if(e instanceof FormData){if(e.has("quantity"))return e.get("quantity")}else for(var t=e.split("&"),n=0;n<t.length;n++){var r=t[n].split("=");if("quantity"===r[0])return r[1]}}return 1}function l(e,t){var n=h("cart"),r=f({variantId:String(e.id),productId:e.product_id,currency:window.ShopifyAnalytics.meta.currency,quantity:String(t||1),price:e.price/100,name:e.title,sku:e.sku,brand:e.vendor,variant:e.variant_title,category:e.product_type},y()),a=f({cartToken:n},r);window.ShopifyAnalytics.lib.track("Added Product",a);var o=f({referer:window.location.href},r);window.ShopifyAnalytics.lib.track("monorail://trekkie_storefront_track_added_product/1.1",o)}function y(){var e={};return window.ShopifyAnalytics.meta.page&&(e={pageType:window.ShopifyAnalytics.meta.page.pageType,resourceType:window.ShopifyAnalytics.meta.page.resourceType,resourceId:window.ShopifyAnalytics.meta.page.resourceId}),e}function f(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function h(e){try{var t=new RegExp("("+e+")=([^;]+)").exec(document.cookie);return t?unescape(t[2]):null}catch(n){return null}}Object.defineProperty(t,"__esModule",{value:!0});var n,r,a,p=function(){function a(e,t,n,r){d(this,a),this.xhr=e,this.url=t,this.method=n,this.body=r}return c(a,null,[{key:"handleXhrOpen",value:function e(){}}]),c(a,[{key:"onReadyStateChange",value:function t(){this.xhr.readyState===XMLHttpRequest.DONE&&a.handleXhrDone({method:this.method,url:this.url,body:this.body,xhr:this.xhr}),this.oldOnReadyStateChange&&this.oldOnReadyStateChange()}}],[{key:"handleXhrDone",value:function r(o){try{var e=document.createElement("a");e.href=o.url;var t=e.pathname?e.pathname:o.url;a.ADD_TO_CART_REGEX.test(t)&&a._parsePayloadResponse(o,function(e){var t=Object.keys(e);if(1===t.length&&"items"===t[0]){var n=e.items,r=void 0;try{r=JSON.parse(o.body).items}catch(a){r=i(o.body,n.length)}s(n,r)}else l(e,u(o.body))})}catch(n){console&&console.warn&&console.warn("[shop_events_listener] Error in handleXhrDone:  "+n.message)}}},{key:"parseBlobToJson",value:function o(e,t){var n=new FileReader;n.addEventListener("loadend",function(){return t(JSON.parse(String.fromCharCode.apply(String,v(new Uint8Array(n.result)))))}),n.readAsArrayBuffer(e)}},{key:"_parsePayloadResponse",value:function n(e,t){e.xhr.response instanceof Blob?a.parseBlobToJson(e.xhr.response,t):e.xhr.responseText&&t(JSON.parse(e.xhr.responseText))}}]),a}();p.ADD_TO_CART_REGEX=/^(?:\/[a-zA-Z]+(?:\-[a-zA-Z]+)?)?\/cart\/add(?:\.js|\.json)?$/,t["default"]=p,function(){function r(e,t,n){window.jQuery&&window.jQuery(e).bind?window.jQuery(e).bind(t,n):e.addEventListener?e.addEventListener(t,n):e.attachEvent&&e.attachEvent("on"+t,n)}function a(e){if(!((e=e||window.event).defaultPrevented||e.isDefaultPrevented&&e.isDefaultPrevented())){var t=e.target||e.srcElement;if(t&&(t.getAttribute("action")||t.getAttribute("href")))try{var n=void 0,r=t.id||t.elements.id;n=r.options?r.options[r.selectedIndex]:r;var a=h("cart"),o=s(n.value);o.quantity=String(t.quantity?t.quantity.value:1);var i=f({cartToken:a},o),c=f({referer:window.location.href},o);window.ShopifyAnalytics.lib.track("Added Product",i),window.ShopifyAnalytics.lib.track("monorail://trekkie_storefront_track_added_product/1.1",c)}catch(d){console&&console.warn&&console.warn("[shop_events_listener] Error in handleSubmitCartAdd: "+d.message)}}}function o(e){var t=(e=e||window.event).target||e.srcElement;if(t&&t.getAttribute("action")&&null!==t.getAttribute("data-payment-form"))try{window.ShopifyAnalytics.lib.track("Added Payment",{currency:window.ShopifyAnalytics.meta.currency,total:window.ShopifyAnalytics.meta.checkout.payment_due/100})}catch(n){console&&console.warn&&console.warn("[shop_events_listener] Error in handleSubmitToPaymentAdd: "+n.message)}}function i(e){c((e=e||window.event).currentTarget)}function c(e){try{var t=void 0,n=e.id||e.elements.id;if(!(t=n.options&&n.options[n.selectedIndex]?n.options[n.selectedIndex]:n))return;var r=t.value;if(window.ShopifyAnalytics.meta.selectedVariantId&&window.ShopifyAnalytics.meta.selectedVariantId==r)return;var a=s(window.ShopifyAnalytics.meta.selectedVariantId=r);window.ShopifyAnalytics.lib.track("Viewed Product Variant",a)}catch(o){console&&console.warn&&console.warn("[shop_events_listener] Error in trackViewedProductVariant: "+o.message)}}function s(e){var t=f(n(e),y());return t.currency=window.ShopifyAnalytics.meta.currency,t}function d(e,t){var n=!0,r=!1,a=undefined;try{for(var o,i=t[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var c=o.value,d=u(e,c);if(d)return{product:c,variant:d}}}catch(s){r=!0,a=s}finally{try{!n&&i["return"]&&i["return"]()}finally{if(r)throw a}}}function u(e,t){var n=!0,r=!1,a=undefined;try{for(var o,i=t.variants[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var c=o.value;if(c.id==e)return c}}catch(d){r=!0,a=d}finally{try{!n&&i["return"]&&i["return"]()}finally{if(r)throw a}}}function n(e){var t=void 0,n=void 0,r=void 0;if(window.ShopifyAnalytics.meta.products){var a=d(e,window.ShopifyAnalytics.meta.products);t=a.product,n=a.variant}else window.ShopifyAnalytics.meta.product&&(n=u(e,t=window.ShopifyAnalytics.meta.product));return t?(r={productId:t.id,productGid:t.gid,brand:t.vendor,category:t.type},n&&(r=f(r,{variantId:e,price:n.price/100,name:n.name,sku:n.sku,variant:n.public_title}))):r={variantId:e},r}r(window,"load",function(){for(var e=0;e<document.forms.length;e++){var t=document.forms[e].getAttribute("action");t&&0<=t.indexOf("/cart/add")&&(r(document.forms[e],"submit",a),r(document.forms[e],"change",i),c(document.forms[e]));var n=document.forms[e].elements.previous_step;n&&"payment_method"===n.value&&r(document.body,"submit",o)}})}(),n=XMLHttpRequest,r=n.prototype.open,a=n.prototype.send,n.prototype.open=function(e,t){this._url=t,this._method=e,p.handleXhrOpen(),r.apply(this,arguments)},n.prototype.send=function(e){var t=new p(this,this._url,this._method,e);this.addEventListener?this.addEventListener("readystatechange",t.onReadyStateChange.bind(t),!1):(t.oldOnReadyStateChange=this.onreadystatechange,this.onreadystatechange=t.onReadyStateChange),a.call(this,e)},function(e,t){function i(e,n){e.clone().json().then(function(e){var t=n.items;return s(e.items,t),e})["catch"](d)}function c(e,t){var n=u(t);e.clone().json().then(function(e){return l(e,n)})["catch"](d)}function d(e){console&&console.warn&&console.warn("[shop_events_listener] Error in handleFetchRequest:  "+e.message)}"function"==typeof t&&(e.fetch=function(){var o=arguments;return t.apply(this,Array.prototype.slice.call(arguments)).then(function(e){if(!e.ok)return e;var t=document.createElement("a");t.href=e.url;var n=t.pathname?t.pathname:e.url;try{if(p.ADD_TO_CART_REGEX.test(n)){try{var r=JSON.parse(o[1].body);if(Object.keys(r).includes("items"))return i(e,r),e}catch(a){}c(e,o[1].body)}}catch(a){d(a)}return e})})}(window,window.fetch)})}("undefined"!=typeof global?global:"undefined"!=typeof window&&window);

$("button.btn.product-form__cart-submit.btn--secondary-accent").removeAttr('aria-disabled')
