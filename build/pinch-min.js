KISSY.add("kg/xscroll/2.3.2/pinch",["./util","./event"],function(t,e,i,n){function s(t,e){var i=t.pageX-e.pageX,n=t.pageY-e.pageY;return Math.sqrt(i*i+n*n)}function r(t,e){return{pageX:t.pageX/2+e.pageX/2,pageY:t.pageY/2+e.pageY/2}}function a(t){if(!(t.touches.length<2||t.changedTouches.length<1)){t.preventDefault();var e=s(t.touches[0],t.touches[1]),i=r(t.touches[0],t.touches[1]);if(t.origin=i,this.isStart){if("pinch"!=this.gestureType)return;t.distance=e,t.scale=e/this.startDistance,t.origin=i,h.dispatchEvent(t.target,o,t)}else this.isStart=1,this.startDistance=e,this.gestureType="pinch",h.dispatchEvent(t.target,p,t)}}function c(t){this.isStart=0,"pinch"==this.gestureType&&0==t.touches.length&&(h.dispatchEvent(t.target,u,t),this.gestureType="")}var h=(e("./util"),e("./event")),p=(window.document,h.prefix("pinchStart")),u=h.prefix("pinchEnd"),o=h.prefix("pinch"),g={init:function(){document.addEventListener("touchmove",a),document.addEventListener("touchend",c)},PINCH_START:p,PINCH:o,PINCH_END:u};return"object"==typeof n&&n.exports?void(n.exports=g):g});