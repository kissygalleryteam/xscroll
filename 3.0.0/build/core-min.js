KISSY.add("kg/xscroll/3.0.0/core",["./util","./base","./animate","./boundry","./hammer"],function(e,t,n,r){function i(e){i.superclass.constructor.call(this),this.userConfig=e,this.init()}var o=t("./util"),c=t("./base"),s=(t("./animate"),t("./boundry"));t("./hammer");{var l=500,u="ease",a=.1;o.prefixStyle("transform"),o.prefixStyle("transition"),o.vendor?["-",o.vendor,"-transform"].join(""):"transform"}return i.Util=o,i.Plugin={},o.extend(i,c,{version:"3.0.0",init:function(){var e=this,t={preventDefault:!0,bounce:!0,useTransition:!0,gpuAcceleration:!0,BOUNDRY_CHECK_EASING:u,BOUNDRY_CHECK_DURATION:l,BOUNDRY_CHECK_ACCELERATION:a,clsPrefix:"xs-",simulateScroll:!1};e.guid=o.guid(),e.renderTo=e.userConfig.renderTo.nodeType?e.userConfig.renderTo:document.querySelector(e.userConfig.renderTo),e.__timers={};var n=JSON.parse(e.renderTo.getAttribute("xs-cfg")),r=e.userConfig=o.mix(o.mix(t,n),e.userConfig);return e.containerClsName=r.clsPrefix+"container",e.contentClsName=r.clsPrefix+"content",e.container=e.renderTo.querySelector("."+e.containerClsName),e.content=e.renderTo.querySelector("."+e.contentClsName),e.boundry=new s,e.boundry.refresh(),e},_initContainer:function(){},enableGPUAcceleration:function(){return this.userConfig.gpuAcceleration=!0,this},disableGPUAcceleration:function(){return this.userConfig.gpuAcceleration=!1,this},getScrollPos:function(){var e=this;return{scrollLeft:e.getScrollLeft(),scrollTop:e.getScrollTop()}},getScrollTop:function(){},getScrollLeft:function(){},scrollTo:function(e,t,n,r,i){var o=this,e=void 0===e||isNaN(e)?-o.getScrollLeft():e,t=void 0===t||isNaN(t)?-o.getScrollTop():t;o.scrollLeft(e,n,r,i),o.scrollTop(t,n,r,i)},scrollBy:function(e,t,n,r,i){this.scrollByX(e,n,r,i),this.scrollByY(t,n,r,i)},scrollLeftBy:function(e,t,n,r){this.scrollLeft(Number(e)+Number(this.getScrollLeft()),t,n,r)},scrollTopBy:function(e,t,n,r){this.scrollTop(Number(e)+Number(this.getScrollTop()),t,n,r)},scrollLeft:function(){},scrollTop:function(){},resetSize:function(){var e=this,t=e.userConfig,n=getComputedStyle(e.renderTo),r=(e.width=(t.width||e.renderTo.offsetWidth)-o.px2Num(n["padding-left"])-o.px2Num(n["padding-right"]),e.height=(t.height||e.renderTo.offsetHeight)-o.px2Num(n["padding-top"])-o.px2Num(n["padding-bottom"]),t.containerWidth||e.content.offsetWidth),i=t.containerHeight||e.content.offsetHeight;return e.containerWidth=r<e.width?e.width:r,e.containerHeight=i<e.height?e.height:i,e.boundry.refresh({width:e.width,height:e.height}),e},render:function(){var e=this;return e.resetSize(),e.trigger("afterrender"),e._bindEvt(),e},_triggerClick:function(e){var t=e.target;if(!/(SELECT|INPUT|TEXTAREA)/i.test(t.tagName)){var n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!0,e.view,1,t.screenX,t.screenY,t.clientX,t.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,0,null),t.dispatchEvent(n)}},boundryCheck:function(){return this},boundryCheckX:function(){return this},boundryCheckY:function(){return this},_bindEvt:function(){var e=this;if(!e.___isEvtBind){e.___isEvtBind=!0;var t=e.mc=new Hammer.Manager(e.renderTo),n=new Hammer.Tap,r=new Hammer.Pan;return t.add([n,r]),e.mc.on("panstart pan panend pinchstart pinch pinchend",function(t){e.trigger(t.type,t)}),e.mc.on("tap",function(t){1==t.tapCount?(t.type="tap",e.trigger(t.type,t)):2==t.tapCount&&(t.type="doubletap",e.trigger("doubletap",t))}),e}}}),"object"==typeof r&&r.exports?void(r.exports=i):i});