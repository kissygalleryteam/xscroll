/*!build time : 2014-08-07 9:17:33 PM*/
KISSY.add("kg/xscroll/1.1.1/plugin/pulldown",function(a,b){var c,d=a.all,e="Pull Down To Refresh",f="Loading...",g=b.extend({pluginId:"xscroll/plugin/pulldown",pluginInitializer:function(b){var d=this;d.userConfig=a.merge({content:e,downContent:"Pull Down To Refresh",upContent:"Release To Refresh",loadingContent:f,prefix:"ks-xscroll-plugin-pulldown-"},d.userConfig),c=d.userConfig.prefix,b&&b.on("afterRender",function(){d.render()})},render:function(){var a=this,b=c+"container",e='<div class="'+b+'"></div>',f=a.userConfig.height||60,g=a.$pulldown=d(e).css({position:"absolute",width:"100%",height:f,top:-f}).prependTo(xscroll.$ctn);g.addClass(c+a.get("status")),g.html(a.userConfig[a.get("status")+"Content"]||a.userConfig.content),a._bindEvt()},_bindEvt:function(){var a=this;if(!a._evtBinded){a._evtBinded=!0;var b,d=a.userConfig.height||60,e=0,f=a.$pulldown;xscroll.on("pan",function(b){e=b.offset.y,0>e||(Math.abs(e)<d?a.set("status","down"):a.set("status","up"))}),a.on("afterStatusChange",function(b){f.removeClass(c+b.prevVal).addClass(c+b.newVal),a.setContent(a.userConfig[b.newVal+"Content"])}),xscroll.on("panEnd",function(){var c=xscroll.getOffsetTop();c>d&&(xscroll.boundry.expandTop(d),xscroll.bounce(!0),a.set("status","loading"),clearTimeout(b),b=setTimeout(function(){xscroll.boundry.expandTop(-d),xscroll.bounce(!0,function(){window.location.reload()})},800))})}},setContent:function(a){var b=this;a&&b.$pulldown.html(a)}},{ATTRS:{status:{value:"down"}}});return g},{requires:["base","node"]});