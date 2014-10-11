/*
combined files : 

kg/xscroll/1.1.9/plugin/pulldown

*/
/**
 * @fileoverview
 * @author 伯才<xiaoqi.huxq@alibaba-inc.com>
 * @plugin pulldown xscroll下拉刷新插件
 **/
;
KISSY.add('kg/xscroll/1.1.9/plugin/pulldown',function(S, Base, Node) {
	var $ = S.all;
	var prefix;
	var containerCls;
	var content = "Pull Down To Refresh";
	var loadingContent = "Loading...";
	var PullDown = Base.extend({
		pluginId:"xscroll/plugin/pulldown",
		pluginInitializer:function(xscroll){
			var self = this;
			self.userConfig = S.merge({
				content: content,
				autoRefresh:true, //是否自动刷新页面
				downContent: "Pull Down To Refresh",
				upContent: "Release To Refresh",
				loadingContent: loadingContent,
				prefix: "ks-xscroll-plugin-pulldown-"
			}, self.userConfig);
			self.xscroll = xscroll;

			prefix = self.userConfig.prefix;
			if (self.xscroll) {
				self.xscroll.on("afterRender", function() {
					self.render()
				})
			}
		},
		pluginDestructor:function () {
			 var self = this;
			 //remove element
			 self.$pulldown && self.$pulldown.remove();
			 self.detach("afterStatusChange");
			 self.xscroll.detach("panStart",self._panStartHandler,self);
			 self.xscroll.detach("pan",self._panHandler,self);
			 self.xscroll.detach("panEnd",self._panEndHandler,self);
			 delete self;
		},
		render: function() {
			var self = this;
			if (self.__isRender) return;
			self.__isRender = true;
			var containerCls = prefix + "container";
			var tpl = '<div class="' + containerCls + '"></div>';
			var height = self.userConfig.height || 60;
			var $pulldown = self.$pulldown = $(tpl).css({
				position: "absolute",
				width: "100%",
				height: height,
				"top": -height
			}).prependTo(self.xscroll.$ctn);
			$pulldown.addClass(prefix + self.get("status"));
			$pulldown.html(self.userConfig[self.get("status") + "Content"] || self.userConfig["content"]);
			self._bindEvt();
		},
		_bindEvt: function() {
			var self = this;
			if(self._evtBinded) return;
			self._evtBinded = true;
			var $pulldown = self.$pulldown;
			var xscroll = self.xscroll;
			xscroll.on("pan", self._panHandler,self)
			self.on("afterStatusChange", function(e) {
				$pulldown.removeClass(prefix + e.prevVal).addClass(prefix + e.newVal);
				self.setContent(self.userConfig[e.newVal + "Content"]);
			})
			xscroll.on("panStart",self._panStartHandler,self)
			xscroll.on("panEnd",self._panEndHandler,self)
		},
		_panStartHandler:function(e){
			clearTimeout(this.loadingItv);
		},
		_panHandler:function  (e) {
			var self = this;
			var	offsetTop = e.offset.y;
			var height = self.userConfig.height || 60;
			if(offsetTop < 0) return;
			Math.abs(offsetTop) < height ? self.set("status", "down") : self.set("status", "up");
		},
		_panEndHandler:function(e){
			var self = this;
			var xscroll = self.xscroll;
			var top = xscroll.boundry.top;
			var height = self.userConfig.height || 60;
			var offsetTop = xscroll.getOffsetTop();
			if(offsetTop > height){
				xscroll.boundry.top = top;
				!self._expanded && xscroll.boundry.expandTop(height);
				self._expanded = true;
				xscroll.bounce(true);
				self.set("status","loading");
				clearTimeout(self.loadingItv);
				self.loadingItv = setTimeout(function(){
					xscroll.boundry.expandTop(-height);
					xscroll.bounce(true,function(){
						self.fire("refresh");
						self.userConfig.autoRefresh && window.location.reload();
					})
				},800);
			}
		},
		setContent: function(content) {
			var self = this;
			if (content) {
				self.$pulldown.html(content);
			}
		}
	}, {
		ATTRS: {
			"status": {
				value: "down"
			}

		}
	})

	return PullDown;


}, {
	requires: ['base', 'node']
});
