/*!build time : 2014-12-18 5:12:53 PM*/
KISSY.add("kg/xscroll/2.3.1/pinch",function(a,b,c){function d(a,b){var c=a.pageX-b.pageX,d=a.pageY-b.pageY;return Math.sqrt(c*c+d*d)}function e(a,b){return{pageX:a.pageX/2+b.pageX/2,pageY:a.pageY/2+b.pageY/2}}function f(a){if(!(a.touches.length<2||a.changedTouches.length<1)){a.preventDefault();var b=d(a.touches[0],a.touches[1]),f=e(a.touches[0],a.touches[1]);if(a.origin=f,this.isStart){if("pinch"!=this.gestureType)return;a.distance=b,a.scale=b/this.startDistance,a.origin=f,c.dispatchEvent(a.target,j,a)}else this.isStart=1,this.startDistance=b,this.gestureType="pinch",c.dispatchEvent(a.target,h,a)}}function g(a){this.isStart=0,"pinch"==this.gestureType&&0==a.touches.length&&(c.dispatchEvent(a.target,i,a),this.gestureType="")}var h=(window.document,c.prefix("pinchStart")),i=c.prefix("pinchEnd"),j=c.prefix("pinch"),k={init:function(){document.addEventListener("touchmove",f),document.addEventListener("touchend",g)},PINCH_START:h,PINCH:j,PINCH_END:i};return k},{requires:["./util","./event"]});