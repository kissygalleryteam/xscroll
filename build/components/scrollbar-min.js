KISSY.add("kg/xscroll/3.0.0/components/scrollbar",["../util","../animate"],function(r,t,o,i){var e=t("../util"),s=t("../animate"),l=60,n=8,a=e.prefixStyle("transform"),c=e.vendor?["-",e.vendor,"-transform"].join(""):"transform",d=e.prefixStyle("transition"),u=(e.prefixStyle("borderRadius"),e.prefixStyle("transitionDuration"),function(r){this.userConfig=r,this.init(r.xscroll)});return e.mix(u.prototype,{init:function(r){var t=this;t.xscroll=r,t.type=t.userConfig.type,t.isY="y"==t.type?!0:!1,t.scrollTopOrLeft=t.isY?"scrollTop":"scrollLeft";var o=t.xscroll.boundry;t.containerSize=t.isY?t.xscroll.containerHeight+o._xtop+o._xbottom:t.xscroll.containerWidth+o._xright+o._xleft,t.indicateSize=t.isY?t.xscroll.height:t.xscroll.width,t.pos=t.isY?r.getScrollTop():r.getScrollLeft(),t.render(),t._bindEvt()},destroy:function(){var r=this;r.scrollbar&&r.scrollbar.remove(),r.xscroll.off("scroll",r._scrollHandler,r),r.xscroll.off("scrollend",r._scrollEndHandler,r),delete r},render:function(){var r=this;if(!r.__isRender){r.__isRender=!0;var t=r.xscroll,o=t.userConfig.gpuAcceleration?" translateZ(0) ":"",i=o?c+":"+o+";":"",e="opacity:0;position:absolute;z-index:999;overflow:hidden;-webkit-border-radius:3px;-moz-border-radius:3px;-o-border-radius:3px;"+i,s=r.isY?"width: 3px;bottom:5px;top:5px;right:3px;"+e:"height:3px;left:5px;right:5px;bottom:3px;"+e;r.scrollbar=document.createElement("div"),r.scrollbar.style.cssText=s,t.renderTo.appendChild(r.scrollbar);var l=r.isY?"width:100%;":"height:100%;";r.indicate=document.createElement("div"),r.indicate.style.cssText=l+"position:absolute;background:rgba(0,0,0,0.3);-webkit-border-radius:3px;-moz-border-radius:3px;-o-border-radius:3px;",r.scrollbar.appendChild(r.indicate),r._update(),r.hide(0)}},_update:function(r,t,o,i){var e=this,r=void 0===r?e.isY?e.xscroll.getScrollTop():e.xscroll.getScrollLeft():r,s=e.computeScrollBar(r),l=e.isY?"height":"width";e.indicate.style[l]=Math.round(s.size)+"px",t&&o?e.scrollTo(s.pos,t,o,i):e.moveTo(s.pos)},computeScrollBar:function(r){var t=this,r=(t.isY?"y":"x",Math.round(r)),o=10,i=t.xscroll.boundry;t.containerSize=t.isY?t.xscroll.containerHeight+i._xtop+i._xbottom:t.xscroll.containerWidth+i._xright+i._xleft,t.size=t.isY?t.xscroll.height:t.xscroll.width,t.indicateSize=t.isY?t.xscroll.height-o:t.xscroll.width-o;var e=t.indicateSize,s=t.containerSize,a=s-t.size,c=r/s,d=e*c,u=Math.round(e*t.size/s),p=d*(e-l+u)/e;if(l>u&&(u=l,d=p),0>d)d=Math.abs(r)*u/l>u-n?n-u:r*u/l;else if(d+u>e&&r-a>0){var x=r-s+e;d=x*u/l>u-n?e+o-n:e+o-u+x*u/l}return t.barpos=Math.round(d),result={size:Math.round(u),pos:t.barpos}},scrollTo:function(r,t,o,i){var e=this;e.show();var l=e.xscroll.userConfig.gpuAcceleration?" translateZ(0) ":"",n={css:{transform:e.isY?"translateY("+r+"px)"+l:"translateX("+r+"px)"+l},duration:t,easing:o,useTransition:e.xscroll.userConfig.useTransition,end:i};e.__timer=e.__timer||new s(e.indicate,n),e.__timer.stop(),e.__timer.reset(n),e.__timer.run()},moveTo:function(r){var t=this;t.show();var o=t.xscroll.userConfig.gpuAcceleration?" translateZ(0) ":"";t.indicate.style[a]=t.isY?"translateY("+r+"px) "+o:"translateX("+r+"px) "+o,t.indicate.style[d]=""},_scrollHandler:function(r){var t=this;return t._update(r[t.scrollTopOrLeft]),t},isBoundryOut:function(){var r=this;return r.isY?r.xscroll.isBoundryOutTop()||r.xscroll.isBoundryOutBottom():r.xscroll.isBoundryOutLeft()||r.xscroll.isBoundryOutRight()},_scrollEndHandler:function(r){var t=this;return t.isBoundryOut()||(t._update(r[t.scrollTopOrLeft]),t.hide()),t},_bindEvt:function(){var r=this;r.__isEvtBind||(r.__isEvtBind=!0,r.xscroll.on("scroll",r._scrollHandler,r),r.xscroll.on("scrollend",r._scrollEndHandler,r))},reset:function(){var r=this;r.pos=0,r._update()},hide:function(r,t,o){var i=this,r=r>=0?r:300,o=o>=0?o:100;i.scrollbar.style.opacity=0,i.scrollbar.style[d]=["opacity ",r,"ms "," ease-out ",o,"ms"].join("")},show:function(){var r=this;r.scrollbar.style.opacity=1,r.scrollbar.style[d]=""}}),"object"==typeof i&&i.exports?void(i.exports=u):u});