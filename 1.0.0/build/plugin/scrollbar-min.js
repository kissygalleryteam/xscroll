/*!build time : 2014-08-01 10:21:34 AM*/
KISSY.add("kg/xscroll/1.1.0/plugin/scrollbar",function(a,b,c,d,e){var f=a.all,g=60,h=5,i=e.prefixStyle("transform"),j=(e.vendor?["-",e.vendor,"-transform"].join(""):"transform",e.prefixStyle("transition")),k=(e.prefixStyle("borderRadius"),c.extend({pluginId:"xscroll/plugin/scrollbar",pluginInitializer:function(b){var c=this;c.userConfig=a.merge({type:"y"},c.userConfig),c.xscroll=b,c.xscroll.on("afterRender",function(){c.set("type",c.userConfig.type),c.isY="y"==c.get("type")?!0:!1,c.set("containerSize",c.xscroll.get(c.isY?"containerHeight":"containerWidth")),c.set("indicateSize",c.xscroll.get(c.isY?"height":"width")),c.set("offset",c.xscroll.getOffset()),c.render(),c._bindEvt()})},pluginDestructor:function(){},render:function(){var a=this;if(!a.__isRender){a.__isRender=!0;var b=a.xscroll,c="<div></div>",d=a.isY?{width:"3px",position:"absolute",bottom:"2px",top:"2px",right:"2px",zIndex:999,overflow:"hidden","-webkit-border-radius":"2px","-moz-border-radius":"2px","-o-border-radius":"2px"}:{height:"3px",position:"absolute",left:"2px",right:"2px",bottom:"2px",zIndex:999,overflow:"hidden","-webkit-border-radius":"2px","-moz-border-radius":"2px","-o-border-radius":"2px"};a.$scrollbar=f(c).css(d).prependTo(b.$renderTo);var e="<div></div>",g=a.isY?{width:"100%"}:{height:"100%"};a.$indicate=f(e).css({position:"absolute",background:"rgba(0,0,0,0.3)","-webkit-border-radius":"1.5px","-moz-border-radius":"1.5px","-o-border-radius":"1.5px"}).prependTo(a.$scrollbar).css(g),a._update()}},_update:function(){var a=this,b=a.computeScrollBar(a.get("offset"));a.moveTo(b.offset),a.isY?a.$indicate.height(b.size):a.$indicate.width(b.size)},computeScrollBar:function(a){var b=this,c=b.isY?"y":"x",a=a&&-a[c]||0;b.set("containerSize",b.xscroll.get(b.isY?"containerHeight":"containerWidth")),b.set("indicateSize",b.xscroll.get(b.isY?"height":"width"));var d=b.get("indicateSize"),e=b.get("containerSize"),f=a/e,i=d*f,j=d*d/e,k=i*(d-g+j)/d;if(g>j&&(j=g,i=k),0>i)i=Math.abs(a)*j/g>j-h?h-j:a*j/g;else if(i+j>d){var l=a-e+d;i=l*j/g>j-h?d-h:d-j+l*j/g}b.set("barOffset",i);var m={size:j},l={};return l[c]=i,m.offset=l,m},scrollTo:function(a,b,c){var d=this;setTimeout(function(){d.$indicate[0].style[i]=d.isY?"translateY("+a+"px)":"translateX("+a+"px)",d.$indicate[0].style[j]=["all ",b,"s ",c," 0"].join("")},0)},moveTo:function(a){var b=this;b.show(),b.$indicate[0].style[i]=b.isY?"translateY("+a.y+"px)":"translateX("+a.x+"px)",b.$indicate[0].style[j]=""},_bindEvt:function(){var a=this;a.__isEvtBind||(a.__isEvtBind=!0,a.xscroll.on("scroll",function(){var b=a.xscroll.getOffset();a.set("offset",b),a._update()}),a.xscroll.on("scaleAnimate",function(b){a.set("offset",b.offset),a._update()}),a.xscroll.on("scale",function(){a._update()}),a.xscroll.on("refresh",function(){a.reset()}))},reset:function(){var a=this;a.set("offset",{x:0,y:0}),a._update()},hide:function(){var a=this;a.$scrollbar.css({opacity:0}),a.$scrollbar[0].style[j]="opacity 0.3s ease-out"},show:function(){var a=this;a.$scrollbar.css({opacity:1})}},{ATTRS:{offsetTop:{},containerSize:{value:0},indicateSize:{value:0},barSize:{value:0},barOffset:{value:0}}}));return k},{requires:["node","base","anim","kg/xscroll/1.0.0/util"]});