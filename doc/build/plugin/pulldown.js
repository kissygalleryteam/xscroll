/*
combined files : 

kg/xscroll/1.1.1/plugin/pulldown

*/
/**
 * @fileoverview
 * @author 伯才<xiaoqi.huxq@alibaba-inc.com>
 * @plugin pulldown xscroll下拉刷新插件
 **/
;
KISSY.add('kg/xscroll/1.1.1/plugin/pulldown',function(S, Base, Node) {
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
				downContent: "Pull Down To Refresh",
				upContent: "Release To Refresh",
				loadingContent: loadingContent,
				prefix: "ks-xscroll-plugin-pulldown-"
			}, self.userConfig);

			prefix = self.userConfig.prefix;
			if (xscroll) {
				xscroll.on("afterRender", function() {
					self.render()
				})
			}
		},
		render: function() {
			var self = this;
			var containerCls = prefix + "container";
			var tpl = '<div class="' + containerCls + '"></div>';
			var height = self.userConfig.height || 60;
			var $pulldown = self.$pulldown = $(tpl).css({
				position: "absolute",
				width: "100%",
				height: height,
				"top": -height
			}).prependTo(xscroll.$ctn);
			$pulldown.addClass(prefix + self.get("status"));
			$pulldown.html(self.userConfig[self.get("status") + "Content"] || self.userConfig["content"]);
			self._bindEvt();
		},
		_bindEvt: function() {
			var self = this;
			if(self._evtBinded) return;
			self._evtBinded = true;
			var height = self.userConfig.height || 60;
			var loadingItv;
			var offsetTop = 0;
			var $pulldown = self.$pulldown;

			xscroll.on("pan", function(e) {
				offsetTop = e.offset.y;
				if(offsetTop < 0) return;
				Math.abs(offsetTop) < height ? self.set("status", "down") : self.set("status", "up");
			})

			self.on("afterStatusChange", function(e) {
				console.log(e.newVal)
				$pulldown.removeClass(prefix + e.prevVal).addClass(prefix + e.newVal);
				self.setContent(self.userConfig[e.newVal + "Content"]);

			})

			xscroll.on("panEnd", function(e) {
				var offsetTop = xscroll.getOffsetTop();
				if(offsetTop > height){
					xscroll.boundry.expandTop(height);
					xscroll.bounce(true);
					self.set("status","loading");
					clearTimeout(loadingItv);
					loadingItv = setTimeout(function(){
						xscroll.boundry.expandTop(-height);
						xscroll.bounce(true,function(){
							window.location.reload();
						})
					},800);
				}
			})
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
