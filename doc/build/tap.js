define('kg/xscroll/2.3.0/tap',["./util","./event"],function(require, exports, module) {function t(){if(v.length>2){for(var t=[],e=1;e<v.length;e++)t[e-1]=v[e];v=t}}function e(e){if(t(),0==v.length)return!1;var n=e.startTime-v[v.length-1].startTime;return 10>n?!0:!1}function n(){if(t(),1==v.length)return!1;var e=v[1].startTime-v[0].startTime;return p>e?!0:!1}function i(t){if(t.touches.length>1)return void(T=!1);var e=(t.currentTarget,t.target,t.changedTouches[0].clientX),n=t.changedTouches[0].clientY;T={startX:e,startY:n,startTime:Number(new Date),e:t},f&&clearTimeout(f);t.target;f=setTimeout(function(){if(T){var i={};a.mix(i,t),a.mix(i,{type:o,pageX:e,pageY:n,originalEvent:t}),u.dispatchEvent(t.target,o,i)}clearTimeout(f)},h)}function r(i){if(T){var r=i.changedTouches[0].clientX,o=i.changedTouches[0].clientY,h=Math.abs(r-T.startX),f=Math.abs(o-T.startY);if(a.mix(T,{endX:r,endY:o,distance:Math.sqrt(h*h+f*f),timeSpan:Number(Number(new Date)-T.startTime)}),T.timeSpan>d)return void(T=!1);if(T.distance>m)return void(T=!1);if(!e(T)){v.push(T),t();var x={};a.mix(x,i),a.mix(x,{type:c,pageX:r,pageY:o,originalEvent:i});var E=i.target;return u.dispatchEvent(E,c,x),g?(n()&&(a.mix(x,{type:l}),u.dispatchEvent(E,l,x)),clearTimeout(g),void(g=null)):void(g=setTimeout(function(){clearTimeout(g),g=null,a.mix(x,{type:s}),u.dispatchEvent(E,s,x)},p))}}}var a=require("./util"),u=require("./event"),c=u.prefix("tap"),o=u.prefix("tapHold"),s=u.prefix("singleTap"),l=u.prefix("doubleTap"),d=250,m=10,h=750,p=200,v=[],T=!1,f=null,g=null;document.addEventListener("touchstart",i),document.addEventListener("touchend",r);var x={TAP:c,TAP_HOLD:o,SINGLE_TAP:s,DOUBLE_TAP:l};module.exports=x;});