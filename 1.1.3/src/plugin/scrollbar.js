/**
 * @fileoverview
 * @author 伯才<xiaoqi.huxq@alibaba-inc.com>
 * @plugin scrollbar XScroll滚动条插件
 **/
;
KISSY.add(function(S, Node, Base, Anim,Util) {
	var $ = S.all;
	//最短滚动条高度
	var MIN_SCROLLBAR_SIZE = 60;
	//滚动条被卷去剩下的最小高度
	var BAR_MIN_SIZE = 5;
	//transform
    var transform = Util.prefixStyle("transform");

    var transformStr = Util.vendor ? ["-",Util.vendor,"-transform"].join("") : "transform";
    //transition webkitTransition MozTransition OTransition msTtransition
    var transition = Util.prefixStyle("transition");

    var borderRadius = Util.prefixStyle("borderRadius");

	var ScrollBar = Base.extend({
		pluginId:"xscroll/plugin/scrollbar",
		pluginInitializer:function(xscroll){
			var self = this;
			self.userConfig = S.merge({
				type:"y"
			}, self.userConfig);
			self.xscroll = xscroll;
			self.xscroll.on("afterRender", function() {
				self.set("type",self.userConfig.type);
				self.isY = self.get("type") == "y" ? true : false;
				self.set("containerSize",self.isY ? self.xscroll.get("containerHeight"):self.xscroll.get("containerWidth"))
				self.set("indicateSize", self.isY ? self.xscroll.get("height"):self.xscroll.get("width"));
				self.set("offset",self.xscroll.getOffset());
				self.render();
				self._bindEvt();
			})
		},
    	pluginDestructor:function(){
    		console.log("destroy")
    	},
		render: function() {
			var self = this;
			if (self.__isRender) return;
			self.__isRender = true;
			var xscroll = self.xscroll;
			var tpl_scrollbar = "<div></div>";
			var css = self.isY ? {
				width: "3px",
				position: "absolute",
				bottom: "2px",
				top: "2px",
				right: "2px",
				zIndex: 999,
				overflow: "hidden",
				"-webkit-border-radius": "2px",
				"-moz-border-radius": "2px",
				"-o-border-radius":"2px"
			}:{
				height: "3px",
				position: "absolute",
				left: "2px",
				right: "2px",
				bottom: "2px",
				zIndex: 999,
				overflow: "hidden",
				"-webkit-border-radius": "2px",
				"-moz-border-radius": "2px",
				"-o-border-radius":"2px"
			};
			self.$scrollbar = $(tpl_scrollbar).css(css).prependTo(xscroll.$renderTo);

			var tpl_indicate = '<div></div>';

			var style = self.isY ? {width:"100%"}:{height:"100%"};
			self.$indicate = $(tpl_indicate).css({
				"position": "absolute",
				background: "rgba(0,0,0,0.3)",
				"-webkit-border-radius": "1.5px",
				"-moz-border-radius": "1.5px",
				"-o-border-radius":"1.5px"
			}).prependTo(self.$scrollbar).css(style);

			self._update();
		},
		_update: function(offset,duration,easing) {
			var self = this;
			var barInfo = self.computeScrollBar(offset);
			self.isY ? self.$indicate.height(barInfo.size):self.$indicate.width(barInfo.size);
			if(duration && easing){
				self.scrollTo(barInfo.offset,duration,easing);
			}else{
				self.moveTo(barInfo.offset);
			}
		},
		//计算边界碰撞时的弹性
		computeScrollBar: function(offset) {
			var self = this;
			var type = self.isY ? "y" : "x";
			var offset = offset && -offset[type] || 0;
			self.set("containerSize",self.isY ? self.xscroll.get("containerHeight"):self.xscroll.get("containerWidth"))
			self.set("indicateSize", self.isY ? self.xscroll.get("height"):self.xscroll.get("width"));
			//滚动条容器高度
			var indicateSize = self.get("indicateSize");
			var containerSize = self.get("containerSize");
			var ratio = offset / containerSize;
			var barOffset = indicateSize * ratio;
			var barSize = indicateSize * indicateSize / containerSize;
			var _barOffset = barOffset * (indicateSize - MIN_SCROLLBAR_SIZE + barSize) / indicateSize
			if (barSize < MIN_SCROLLBAR_SIZE) {
				barSize = MIN_SCROLLBAR_SIZE;
				barOffset = _barOffset;
			}
			//顶部回弹
			if (barOffset < 0) {
				barOffset = Math.abs(offset) * barSize/ MIN_SCROLLBAR_SIZE > barSize - BAR_MIN_SIZE ? BAR_MIN_SIZE - barSize : offset * barSize / MIN_SCROLLBAR_SIZE;
			} else if (barOffset + barSize > indicateSize) {
				//底部回弹
				var _offset = offset - containerSize + indicateSize;
				if (_offset * barSize / MIN_SCROLLBAR_SIZE > barSize - BAR_MIN_SIZE) {
					barOffset = indicateSize - BAR_MIN_SIZE;
				} else {
					barOffset = indicateSize - barSize + _offset * barSize / MIN_SCROLLBAR_SIZE;
				}
			}
			self.set("barOffset", barOffset)

			var result = {
				size: barSize
			};

			var _offset = {};
			_offset[type] = barOffset;
			result.offset = _offset;
			return result;

		},

		scrollTo: function(offset, duration, easing) {
			var self = this;
			self.isY ? self.$indicate[0].style[transform] = "translateY(" + offset.y + "px)" : self.$indicate[0].style[transform] = "translateX(" + offset.x + "px)"
			self.$indicate[0].style[transition] = ["all ",duration, "s ", easing, " 0"].join("");
		},
		moveTo: function(offset) {
			var self = this;
			self.show();
			self.isY ? self.$indicate[0].style[transform] = "translateY(" + offset.y + "px)" : self.$indicate[0].style[transform] = "translateX(" + offset.x + "px)"
			self.$indicate[0].style[transition] = "";
		},
		_bindEvt: function() {
			var self = this;
			if (self.__isEvtBind) return;
			self.__isEvtBind = true;
			var type = self.isY ? "y" : "x";
			self.xscroll.on("pan",function(e){
				self._update(e.offset);
			})

			self.xscroll.on("scrollAnimate",function(e){
				self._update(e.offset,e.duration,e.easing);
			})

			self.xscroll.on("scrollEnd",function(e){
				self._update(e.offset);
				// self.hide();
			})

			self.xscroll.on("scroll",function(e){
				// self.show();
			})

			self.xscroll.on("scaleAnimate",function(e){
				self._update(e.offset);
			})

			self.xscroll.on("scale", function(e) {
				self._update()
			})

			self.xscroll.on("afterContainerHeightChange",function(e){
				self._update();
			})

			self.xscroll.on("afterContainerWidthChange",function(e){
				self._update();
			})

			self.xscroll.on("afterWidthChange",function(e){
				self._update();
			})

			self.xscroll.on("afterHeightChange",function(e){
				self._update();
			})

			self.xscroll.on("refresh",function(e){
				self.reset();
			})


		},
		reset:function(){
			var self = this;
			self.set("offset",{x:0,y:0});
			self._update();
		},
		hide: function() {
			var self = this;
			self.$scrollbar.css({
				opacity: 0
			});
			self.$scrollbar[0].style[transition] = "opacity 0.3s ease-out"
		},
		show: function() {
			var self = this;
			self.$scrollbar.css({
				opacity:1
			});
		}
	}, {
		ATTRS: {
			"offsetTop": {

			},
			"containerSize": {
				value: 0
			},
			"indicateSize": {
				value: 0
			},
			"barSize": {
				value: 0
			},
			"barOffset": {
				value: 0
			}
		}
	});

	return ScrollBar;


}, {
	requires: ['node', 'base', 'anim','kg/xscroll/1.1.2/util']
})