/*!build time : 2014-12-18 5:12:53 PM*/
KISSY.add("kg/xscroll/2.3.1/pulldown",function(a,b,c){var d,e="Pull Down To Refresh",f="Loading...",g=function(a){g.superclass.constructor.call(this),this.userConfig=b.mix({content:e,height:60,autoRefresh:!0,downContent:"Pull Down To Refresh",upContent:"Release To Refresh",loadingContent:f,prefix:"xs-plugin-pulldown-"},a)};return b.extend(g,c,{pluginId:"xscroll/plugin/pulldown",pluginInitializer:function(a){var b=this;b.xscroll=a,d=b.userConfig.prefix,b.xscroll&&b.xscroll.on("afterrender",function(){b.render()})},pluginDestructor:function(){var a=this;a.pulldown&&a.pulldown.remove(),a.xscroll.detach("panstart",a._panStartHandler,a),a.xscroll.detach("pan",a._panHandler,a),a.xscroll.detach("panend",a._panEndHandler,a),delete a},render:function(){var a=this;if(!a.__isRender){a.__isRender=!0;var c=d+"container",e=a.userConfig.height||60,f=a.pulldown=document.createElement("div");f.className=c,f.style.position="absolute",f.style.width="100%",f.style.height=e+"px",f.style.top=-e+"px",a.xscroll.container.appendChild(f),b.addClass(f,d+a.status),f.innerHTML=a.userConfig[a.status+"Content"]||a.userConfig.content,a._bindEvt()}},_bindEvt:function(){var a=this;if(!a._evtBinded){a._evtBinded=!0;var b=(a.pulldown,a.xscroll);b.on("pan",function(b){a._panHandler(b)}),b.on("panstart",function(b){a._panStartHandler(b)}),b.on("panend",function(b){a._panEndHandler(b)})}},_changeStatus:function(a){var c=this.status;this.status=a,b.removeClass(this.pulldown,d+c),b.addClass(this.pulldown,d+a),this.setContent(this.userConfig[a+"Content"]),c!=a&&(this.fire("statuschange",{prevVal:c,newVal:a}),"loading"==a&&this.fire("loading"))},reset:function(a){this.xscroll.boundry.resetTop(),this.xscroll.bounce(!0,a),this._expanded=!1},_panStartHandler:function(){clearTimeout(this.loadingItv)},_panHandler:function(a){var b=this,c=a.offset.y,d=b.userConfig.height||60;0>c||b._changeStatus(Math.abs(c)<d?"down":"up")},_panEndHandler:function(){var a=this,b=a.xscroll,c=a.userConfig.height||60,d=b.getOffsetTop();d>c&&(b.boundry.resetTop(),b.boundry.expandTop(c),b.bounce(!0,function(){a._changeStatus("loading")}),a.userConfig.autoRefresh&&(clearTimeout(a.loadingItv),a.loadingItv=setTimeout(function(){b.boundry.resetTop(),b.bounce(!0,function(){window.location.reload()})},800)))},setContent:function(a){var b=this;a&&(b.pulldown.innerHTML=a)}}),g},{requires:["./util","./base"]});