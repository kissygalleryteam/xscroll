/*!build time : 2014-10-14 4:03:42 PM*/
KISSY.add("kg/xscroll/1.1.10/pan",function(a){function b(a){if(!(a.touches.length>1||this.gestureType&&"pan"!=this.gestureType))if(""==this.gestureType&&(l=[]),l.length){if("pan"!=this.gestureType)return;k.deltaX=a.touches[0].clientX-k.startX,k.deltaY=a.touches[0].clientY-k.startY,k.directionX=a.touches[0].clientX-k.prevX>0?"right":"left",k.directionY=a.touches[0].clientY-k.prevY>0?"bottom":"top",k.prevX=a.touches[0].clientX,k.prevY=a.touches[0].clientY,a.touch=k,l.push({deltaX:k.deltaX,deltaY:k.deltaY,timeStamp:a.timeStamp}),a.deltaX=k.deltaX,a.deltaY=k.deltaY,a.velocityX=0,a.velocityY=0,a.directionX=k.directionX,a.directionY=k.directionY,a.isPropagationStopped()||j(a.target).fire(h,a)}else k={},k.startX=a.touches[0].clientX,k.startY=a.touches[0].clientY,k.deltaX=0,k.deltaY=0,a.touch=k,k.prevX=k.startX,k.prevY=k.startY,l.push({deltaX:k.deltaX,deltaY:k.deltaY,timeStamp:a.timeStamp}),a.deltaX=k.deltaX,a.deltaY=k.deltaY,this.gestureType="pan",j(a.target).fire(f,a)}function c(a){var b=0,c=0,f=0;if(!(a.touches.length>1)){k.deltaX=a.changedTouches[0].clientX-k.startX,k.deltaY=a.changedTouches[0].clientY-k.startY,a.deltaX=k.deltaX,a.deltaY=k.deltaY,a.touch=k,a.touch.record=l;var h=(a.touch.startX,a.touch.startY,l.length),m=l[0]&&l[0].timeStamp;if(!(2>h)&&m){{l[h-1].timeStamp-l[0].timeStamp}for(var n in l)n>0?(l[n].velocity=d(l[n].deltaX,l[n].deltaY,l[n-1].deltaX,l[n-1].deltaY)/(l[n].timeStamp-l[n-1].timeStamp),l[n].velocityX=(l[n].deltaX-l[n-1].deltaX)/(l[n].timeStamp-l[n-1].timeStamp),l[n].velocityY=(l[n].deltaY-l[n-1].deltaY)/(l[n].timeStamp-l[n-1].timeStamp)):(l[n].velocity=0,l[n].velocityX=0,l[n].velocityY=0);var o=l[0].velocityX/Math.abs(l[0].velocityX);for(var n in l)l[n].velocityX/Math.abs(l[n].velocityX)!=o&&(o=l[n].velocityX/Math.abs(l[n].velocityX),f=n);var p=l[0].velocityY/Math.abs(l[0].velocityY);for(var n in l)l[n].velocityY/Math.abs(l[n].velocityY)!=p&&(p=l[n].velocityY/Math.abs(l[n].velocityY),c=n);b=Math.max(f,c);{l[b]}a.touch.record=a.touch.record.splice(b-1);for(var n=0,q=a.touch.record.length;q>n;n++)isNaN(a.touch.record[n].velocity)&&a.touch.record.splice(n,1);var r="";for(var n in a.touch.record)r+=a.touch.record[n].velocityY.toFixed(2)+" ";var s=e(a.touch.record);a.velocityX=Math.abs(s.velocityX)>i?s.velocityX/Math.abs(s.velocityX)*i:s.velocityX,a.velocityY=Math.abs(s.velocityY)>i?s.velocityY/Math.abs(s.velocityY)*i:s.velocityY,a.velocity=Math.sqrt(Math.pow(a.velocityX,2)+Math.pow(a.velocityY,2)),k={},l=[],"pan"==this.gestureType&&(j(a.target).fire(g,a),this.gestureType="")}}}function d(a,b,c,d){return Math.sqrt(Math.pow(c-a,2)+Math.pow(d-b,2))}function e(a){for(var b=0,c=0,d=a.length,e=0;d>e;e++)b+=a[e].velocityY,c+=a[e].velocityX;return b/=d,c/=d,{velocityY:b,velocityX:c}}var f=(window.document,"gesturePanStart"),g="gesturePanEnd",h="gesturePan",i=8,j=a.all,k={},l=[];return a.each([h],function(d){a.Event.Special[d]={setup:function(){j(this).on("touchmove",b),j(this).on("touchend",c)},teardown:function(){j(this).detach("touchmove",b),j(this).detach("touchend",c)}}}),{PAN_START:f,PAN:h,PAN_END:g}},{requires:["node","event"]}),KISSY.add("kg/xscroll/1.1.10/pinch",function(a){function b(a,b){var c=a.pageX-b.pageX,d=a.pageY-b.pageY;return Math.sqrt(c*c+d*d)}function c(a,b){return{pageX:a.pageX/2+b.pageX/2,pageY:a.pageY/2+b.pageY/2}}function d(a){if(!(a.touches.length<2||a.changedTouches.length<1)){a.preventDefault();var d=b(a.touches[0],a.touches[1]),e=c(a.touches[0],a.touches[1]);if(a.origin=e,this.isStart){if("pinch"!=this.gestureType)return;a.distance=d,a.scale=d/this.startDistance,i(this).fire(h,a,{origin:e})}else this.isStart=1,this.startDistance=d,this.gestureType="pinch",i(this).fire(f,a)}}function e(a){this.isStart=0,"pinch"==this.gestureType&&0==a.touches.length&&(i(this).fire(g,a),this.gestureType="")}var f=(window.document,"gesturePinchStart"),g="gesturePinchEnd",h="gesturePinch",i=a.all;return a.Event.Special[h]={setup:function(){i(this).on("touchmove",d),i(this).on("touchend",e)},teardown:function(){i(this).detach("touchmove",d),i(this).detach("touchend",e)}},{PINCH_START:f,PINCH:h,PINCH_END:g}},{requires:["node","event"]}),KISSY.add("kg/xscroll/1.1.10/util",function(){var a={vendor:function(){for(var a,b=document.createElement("div").style,c=["t","webkitT","MozT","msT","OT"],d=0,e=c.length;e>d;d++)if(a=c[d]+"ransform",a in b)return c[d].substr(0,c[d].length-1);return!1}(),prefixStyle:function(a){return this.vendor===!1?!1:""===this.vendor?a:this.vendor+a.charAt(0).toUpperCase()+a.substr(1)},isAndroid:/Android /.test(window.navigator.appVersion),isBadAndroid:/Android /.test(window.navigator.appVersion)&&!/Chrome\/\d/.test(window.navigator.appVersion)};return a}),KISSY.add("kg/xscroll/1.1.10/index",function(a,b,c,d,e,f,g){function h(a,b){return[[(a/3+(a+b)/3-a)/(b-a),(a*a/3+a*b*2/3-a*a)/(b*b-a*a)],[(b/3+(a+b)/3-a)/(b-a),(b*b/3+a*b*2/3-a*a)/(b*b-a*a)]]}var i=a.all,j=5e-4,k="scrollEnd",l="scroll",m="panEnd",n="panStart",o="pan",p="scrollAnimate",q="scaleAnimate",r="scale",s="afterRender",t="refresh",u=300,v="ease-in-out",w=.1,x=.36,y=300,z=g.prefixStyle("transform"),A=g.prefixStyle("transition"),B=g.prefixStyle("transitionDuration"),C=g.prefixStyle("transformOrigin"),D=g.vendor?g.prefixStyle("transitionEnd"):"transitionend",E=g.vendor?["-",g.vendor,"-transform"].join(""):"transform",F=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)},G=g.vendor?window[g.vendor+"CancelAnimationFrame"]||window[g.vendor+"CancelRequestAnimationFrame"]:window.cancelAnimationFrame;G=G||window.clearTimeout;var H=function(a,b){if(!(a.touches.length>1)){var c=a.changedTouches,d=c[0],e=document.createEvent("MouseEvent");e.initMouseEvent(b,!0,!0,window,1,d.screenX,d.screenY,d.clientX,d.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(e)}},I=d.extend({initializer:function(){var b=this;window.xscroll=this;var c=b.userConfig=a.mix({scalable:!1},b.userConfig,void 0,void 0,!0);b.$renderTo=i(c.renderTo);var d=b.clsPrefix=c.clsPrefix||"ks-xscroll-";b.SROLL_ACCELERATION=c.SROLL_ACCELERATION||j,b.containerClsName=d+"container",b.contentClsName=d+"content"},refresh:function(){var a=this;a.render(),a.scrollTo({x:0,y:0}),a.fire(t)},render:function(){var a=this,b=a.userConfig;a._createContainer();var c=b.height||a.$renderTo.height(),d=b.width||a.$renderTo.width();a.set("width",Math.round(d)),a.set("height",Math.round(c)),a.set("scale",b.scale||1);var e=Math.round(b.containerWidth||a.$content.width()),f=Math.round(b.containerHeight||a.$content.height());a.set("containerWidth",e<a.get("width")?a.get("width"):e),a.set("containerHeight",f<a.get("height")?a.get("height"):f),a.set("initialContainerWidth",a.get("containerWidth")),a.set("initialContainerHeight",a.get("containerHeight"));var g=a.userConfig.minScale||Math.max(a.get("width")/a.get("containerWidth"),a.get("height")/a.get("containerHeight")),h=a.userConfig.maxScale||1;a.set("minScale",g),a.set("maxScale",h),a.boundry={reset:function(){return this.resetTop(),this.resetLeft(),this.resetBottom(),this.resetRight(),this},resetTop:function(){return this.top=0,this},resetLeft:function(){return this.left=0,this},resetBottom:function(){return this.bottom=a.get("height"),this},resetRight:function(){return this.right=a.get("width"),this},expandTop:function(a){return this.top+=a||0,this},expandLeft:function(a){return this.left+=a||0,this},expandRight:function(a){return this.right-=a||0,this},expandBottom:function(a){return this.bottom-=a||0,this}},a.boundry.reset(),a.fire(s),a._bindEvt()},_createContainer:function(){var a=this;if(!a.__isContainerCreated){var b=(a.$renderTo,i("."+a.containerClsName,a.$renderTo)[0]),c=i("."+a.contentClsName,a.$renderTo)[0];a.$ctn=i(b),a.$content=i(c),b.style.position="absolute",b.style.height="100%",b.style.width="100%",b.style[C]="0 0",c.style.position="absolute",c.style[C]="0 0",a.translate({x:0,y:0}),a.__isContainerCreated=!0}},translate:function(a){this.translateX(a.x),this.translateY(a.y)},translateX:function(a){this.set("x",a),this._transform()},translateY:function(a){this.set("y",a),this._transform()},_noTransition:function(){var a=this;g.isBadAndroid?(a.$content[0].style[B]="0.001s",a.$ctn[0].style[B]="0.001s"):(a.$content[0].style[A]="none",a.$ctn[0].style[A]="none")},stop:function(){var a=this;if(!a.isScaling){var b=a.boundry,c=a.getOffset();c.y>b.top||c.y+a.get("containerHeight")<b.bottom||c.x>b.left||c.x+a.get("containerWidth")<b.right||(a.translate(c),a._noTransition(),G(a.rafX),G(a.rafY),a.fire(k,{offset:c,scale:a.get("scale"),zoomType:"xy"}))}},_transform:function(){var a=this.get("gpuAcceleration")?" translateZ(0) ":"";this.$content[0].style[z]="translate("+this.get("x")+"px,0px)  scaleX("+this.get("scale")+") scaleY("+this.get("scale")+") "+a,this.$ctn[0].style[z]="translate(0px,"+this.get("y")+"px) "+a},getOffset:function(){var a=this;return{x:a.getOffsetLeft(),y:a.getOffsetTop()}},getOffsetTop:function(){if(this.get("lockY"))return 0;var a=window.getComputedStyle(this.$ctn[0])[z].match(/[-\d\.*\d*]+/g);return a?Math.round(a[5]):0},getOffsetLeft:function(){if(this.get("lockX"))return 0;var a=window.getComputedStyle(this.$content[0])[z].match(/[-\d\.*\d*]+/g);return a?Math.round(a[4]):0},scrollTo:function(a,b,c,d){var e=this,f=e.getOffset(),g=void 0===a.x||isNaN(a.x)?-f.x:a.x,h=void 0===a.y||isNaN(a.y)?-f.y:a.y;e.scrollX(g,b,c,d),e.scrollY(h,b,c,d)},scrollX:function(a,b,c,d){var e=this,a=Math.round(a);if(!e.get("lockX")){var b=b||0,c=c||"cubic-bezier(0.333333, 0.666667, 0.666667, 1)",f=e.$content[0];e.translateX(-a);var g=b>0?[E," ",b/1e3,"s ",c," 0s"].join(""):"none";return f.style[A]=g,e._scrollHandler(-a,b,d,c,g,"x"),f.style[A]=g}},scrollY:function(a,b,c,d){var e=this,a=Math.round(a);if(!e.get("lockY")){var b=b||0,c=c||"cubic-bezier(0.333333, 0.666667, 0.666667, 1)",f=e.$ctn[0];e.translateY(-a);var g=b>0?[E," ",b/1e3,"s ",c," 0s"].join(""):"none";return f.style[A]=g,e._scrollHandler(-a,b,d,c,g,"y"),f.style[A]=g}},_scrollHandler:function(a,b,c,d,e,f){var g=this,h=g.getOffset();if(0>=b)return g.fire(l,{zoomType:f,offset:g.getOffset()}),void g.fire(k,{zoomType:f,offset:h});var i=f.toUpperCase();g["isScrolling"+i]=!0;var j=Date.now();g["destTime"+i]=j+b,G(g["raf"+i]),g["__scrollEndCallback"+i]=function(a){g["isScrolling"+i]=!1,g.fire(k,{offset:g.getOffset(),zoomType:a.type}),c&&c(a)};var m=function(){Date.now();g["isScrolling"+i]&&F(function(){g.fire(l,{zoomType:f,offset:g.getOffset()})},0),g["raf"+i]=F(m)};m(),g.fire(p,{transition:e,offset:{x:g.get("x"),y:g.get("y")},duration:b/1e3,easing:d,zoomType:f})},boundryCheckX:function(a){var b=this;if(b.get("boundryCheckEnabled")&&!b.get("lockX")){var c=b.getOffset(),d=b.get("containerWidth"),e=b.boundry;c.x>e.left?(c.x=e.left,b.scrollX(-c.x,u,v,a)):c.x+d<e.right&&(c.x=e.right-d,b.scrollX(-c.x,u,v,a))}},boundryCheckY:function(a){var b=this;if(b.get("boundryCheckEnabled")&&!b.get("lockY")){var c=b.getOffset(),d=b.get("containerHeight"),e=b.boundry;c.y>e.top?(c.y=e.top,b.scrollY(-c.y,u,v,a)):c.y+d<e.bottom&&(c.y=e.bottom-d,b.scrollY(-c.y,u,v,a))}},boundryCheck:function(a){var b=this;b.boundryCheckX(a),b.boundryCheckY(a)},bounce:function(a,b){var c=this;c.set("boundryCheckEnabled",a),a?c.boundryCheck(b):void 0},_bindEvt:function(){var a=this;if(!a.__isEvtBind){a.__isEvtBind=!0;var b=a.$renderTo,c=a.$ctn[0],d=a.$content[0],g=a.get("containerWidth"),h=a.get("containerHeight"),i={x:0,y:0},j=a.boundry;if(b.on("touchstart",function(b){b.preventDefault(),a.stop()}).on("tap",function(b){a.boundryCheck(),a.isScrollingX||a.isScrollingY?(a.isScrollingX=!1,a.isScrollingY=!1,a.stop()):H(b,"click")}).on(e.PAN_START,function(){i=a.getOffset(),a.translate(i),a.fire(n,{offset:i})}).on(e.PAN,function(b){var c=a.get("lockY")?Number(i.y):Number(i.y)+b.deltaY,d=a.get("lockX")?Number(i.x):Number(i.x)+b.deltaX;j=a.boundry,g=a.get("containerWidth"),h=a.get("containerHeight"),c>j.top&&(c=(c-j.top)*x+j.top),c<j.bottom-h&&(c+=(j.bottom-h-c)*x),d>j.left&&(d=(d-j.left)*x+j.left),d<j.right-g&&(d+=(j.right-g-d)*x),a.translate({x:d,y:c}),a._noTransition(),a.isScrollingX=!1,a.isScrollingY=!1,a.set("directionX",b.directionX),a.set("directionY",b.directionY),a.fire(l,{offset:{x:d,y:c},directionX:a.get("directionX"),directionY:a.get("directionY")}),a.fire(o,{offset:{x:d,y:c},deltaX:b.deltaX,deltaY:b.deltaY,directionX:a.get("directionX"),directionY:a.get("directionY")})}).on(e.PAN_END,function(b){a.panEndHandler(b),a.fire(m,{velocity:b.velocity,velocityX:b.velocityX,velocityY:b.velocityY})}),c.addEventListener(D,function(b){b.target!=d||a.isScaling||a.__scrollEndCallbackX&&a.__scrollEndCallbackX({type:"x"}),b.target!=c||a.isScaling||a.__scrollEndCallbackY&&a.__scrollEndCallbackY({type:"y"})},!1),a.userConfig.scalable){var k,p;a.$renderTo.on(f.PINCH_START,function(b){scale=a.get("scale"),k=(b.origin.pageX-a.get("x"))/a.get("containerWidth"),p=(b.origin.pageY-a.get("y"))/a.get("containerHeight")}),a.$renderTo.on(f.PINCH,function(b){a._scale(scale*b.scale,k,p,"pinch")}),a.$renderTo.on(f.PINCH_END,function(){a.isScaling=!1,a.get("scale")<a.get("minScale")?a.scaleTo(a.get("minScale"),k,p,y):a.get("scale")>a.get("maxScale")&&a.scaleTo(a.get("maxScale"),k,p,y)})}window.addEventListener("resize",function(){a.refresh()})}},_scale:function(a,b,c,d){var e=this;if(e.userConfig.scalable&&e.get("scale")!=a&&a){e.isScaling||(e.scaleBegin=e.get("scale"),e.isScaling=!0,e.scaleBeginX=e.get("x"),e.scaleBeginY=e.get("y")),b&&e.set("originX",b),c&&e.set("originY",c);var f=e.boundry,g=a*e.get("initialContainerWidth"),h=a*e.get("initialContainerHeight");e.set("containerWidth",Math.round(g>e.get("width")?g:e.get("width"))),e.set("containerHeight",Math.round(h>e.get("height")?h:e.get("height"))),e.set("scale",a);var i=b*(e.get("initialContainerWidth")*e.scaleBegin-e.get("containerWidth"))+e.scaleBeginX,j=c*(e.get("initialContainerHeight")*e.scaleBegin-e.get("containerHeight"))+e.scaleBeginY;i>f.left&&(i=f.left),j>f.top&&(j=f.top),i<f.right-e.get("containerWidth")&&(i=f.right-e.get("containerWidth")),j<f.bottom-e.get("containerHeight")&&(j=f.bottom-e.get("containerHeight")),e.set("x",i),e.set("y",j),e._transform(),e.fire(r,{scale:a,origin:{x:b,y:c},triggerEvent:d})}},scaleTo:function(a,b,c,d,e){var f=this;if(f.userConfig.scalable&&f.get("scale")!=a&&a){var d=d||1,e=e||"ease-out",g=[E," ",d/1e3,"s ",e," 0s"].join(""),h=Date.now();f.destTimeScale=h+d,G(f._rafScale);var i=(f.get("scale"),function(){var a=Date.now();return a>h+d&&a>=f.destTimeScale?void(f.isScaling=!1):void(f._rafScale=F(i))});i(),f.$ctn[0].style[A]=g,f.$content[0].style[A]=g,f._scale(a,b,c,"scaleTo"),f.fire(q,{scale:f.get("scale"),duration:d,easing:e,offset:{x:f.get("x"),y:f.get("y")},origin:{x:b,y:c}})}},panEndHandler:function(a){var b,c=this,d=(c.userConfig,c.getOffset()),e=c._bounce("x",d.x,a.velocityX,c.get("width"),c.get("containerWidth")),f=c._bounce("y",d.y,a.velocityY,c.get("height"),c.get("containerHeight")),g=e?e.offset:0,h=f?f.offset:0;e&&f&&e.status&&f.status&&e.duration&&f.duration&&(b=Math.max(e.duration,f.duration)),e&&(e.duration<100?c._scrollEndHandler("x"):c.scrollX(g,b||e.duration,e.easing,function(){c._scrollEndHandler("x")})),f&&(f.duration<100?c._scrollEndHandler("y"):c.scrollY(h,b||f.duration,f.easing,function(){c._scrollEndHandler("y")})),c.set("directionX",a.velocityX<0?"left":"right"),c.set("directionY",a.velocityY<0?"up":"down")},_scrollEndHandler:function(a){var b=this,c=a.toUpperCase(),d="scroll"+c,e="boundryCheck"+c,f="_bounce"+a;if(b[f]){b.fire("outOfBoundry");var g=b[f],i=.04*(g/Math.abs(g)),j=g/i,k=b.getOffset()[a],l=k+j*g/2;b[d](-l,j,"cubic-bezier("+h(-j,0)+")",function(){b[f]=0,b[e]()})}else b[e]()},_bounce:function(a,b,c,d,e){var f=this,g=f.boundry,i="x"==a?g.left:g.top,j="x"==a?g.right:g.bottom,d=j-i,k={};if(0===c)return void("x"==a?f.boundryCheckX():f.boundryCheckY());if(!("x"==a&&f.get("lockX")||"y"==a&&f.get("lockY"))){var l=f.userConfig,m=l.maxSpeed>0&&l.maxSpeed<6?l.maxSpeed:3;if(c>m&&(c=m),-m>c&&(c=-m),b>i||d-e>b){var n=w*(c/Math.abs(c)),o=c/n,p=b+o*c/2;return k.offset=-p,k.duration=o,k.easing="cubic-bezier("+h(-o,0)+")",k}var n=f.SROLL_ACCELERATION*(c/Math.abs(c)),o=c/n,p=b/1+o*c/2;if(p>i){var q=i-b,r=(c-Math.sqrt(-2*n*q+c*c))/n;k.offset=-i,k.duration=r,k.easing="cubic-bezier("+h(-o,-o+r)+")",f["_bounce"+a]=c-n*r}else if(d-e>p){var q=d-e-b,r=(c+Math.sqrt(-2*n*q+c*c))/n;k.offset=e-d,k.duration=r,k.easing="cubic-bezier("+h(-o,-o+r)+")",f["_bounce"+a]=c-n*r}else k.offset=-p,k.duration=o,k.easing="cubic-bezier("+h(-o,0)+")",k.status="normal";return f["isScrolling"+a.toUpperCase()]=!0,k}}},{ATTRS:{width:{value:0},height:{value:0},lockX:{value:!1},lockY:{value:!1},containerWidth:{value:0},containerHeight:{value:0},boundryCheckEnabled:{value:!0},directionY:{value:""},directionX:{value:""},originX:{value:0},originY:{value:0},gpuAcceleration:{value:!0}}});return I},{requires:["node","event","base","kg/xscroll/1.1.10/pan","kg/xscroll/1.1.10/pinch","kg/xscroll/1.1.10/util"]});