/*!build time : 2014-09-09 11:34:30 AM*/
KISSY.add("kg/xscroll/1.1.6/tap",function(a){function b(){if(l.length>2){for(var a=[],b=1;b<l.length;b++)a[b-1]=l[b];l=a}}function c(a){if(b(),0==l.length)return!1;var c=a.startTime-l[l.length-1].startTime;return 10>c?!0:!1}function d(){if(b(),1==l.length)return!1;var a=l[1].startTime-l[0].startTime;return k>a?!0:!1}function e(b){if(b.touches.length>1)return void(m=!1);var c=(b.currentTarget,b.target),d=b.changedTouches[0].clientX,e=b.changedTouches[0].clientY;m={startX:d,startY:e,startTime:Number(new Date),e:b},n&&clearTimeout(n);var c=b.target;n=setTimeout(function(){if(m){var f={};a.mix(f,b),a.mix(f,{type:"tapHold",pageX:d,pageY:e,originalEvent:b}),a.one(c).fire("tapHold",f)}clearTimeout(n)},j)}function f(e){if(m){var f=e.changedTouches[0].clientX,g=e.changedTouches[0].clientY,j=Math.abs(f-m.startX),n=Math.abs(g-m.startY);if(a.mix(m,{endX:f,endY:g,distance:Math.sqrt(j*j+n*n),timeSpan:Number(Number(new Date)-m.startTime)}),m.timeSpan>h)return void(m=!1);if(m.distance>i)return void(m=!1);if(!c(m)){l.push(m),b();var p={};a.mix(p,e),a.mix(p,{type:"tap",pageX:f,pageY:g,originalEvent:e});var q=e.target;return a.one(q).fire("tap",p),o?(d()&&(a.mix(p,{type:"doubleTap"}),a.one(q).fire("doubleTap",p)),clearTimeout(o),void(o=null)):void(o=setTimeout(function(){clearTimeout(o),o=null,a.mix(p,{type:"singleTap"}),a.one(q).fire("singleTap",p)},k))}}}var g=a.all,h=250,i=10,j=750,k=100,l=[],m=!1,n=null,o=null;a.each(["tap","tapHold","singleTap","doubleTap"],function(b){a.Event.Special[b]={setup:function(){g(this).on("touchstart",e),g(this).on("touchend",f)},teardown:function(){g(this).detach("touchstart",e),g(this).detach("touchend",f)}}})},{requires:["node","event"]});