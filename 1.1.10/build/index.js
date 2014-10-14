/*
combined files : 

kg/xscroll/1.1.10/pan
kg/xscroll/1.1.10/pinch
kg/xscroll/1.1.10/util
kg/xscroll/1.1.10/index

*/
/*
	Pan Event for KISSY MINI 
	@author xiaoqi.huxq@alibaba-inc.com
*/
;KISSY.add('kg/xscroll/1.1.10/pan',function(S, Node,Event) {
	var doc = window.document;
	var PAN_START = 'gesturePanStart',
		PAN_END = 'gesturePanEnd',
		PAN = 'gesturePan',
		MIN_SPEED = 0.35,
		MAX_SPEED = 8;
	var $ = S.all;
	var touch = {}, record = [];
	var startX = 0;
	var startY = 0;

	function touchMoveHandler(e) {
		if (e.touches.length > 1) return;
		if (this.gestureType && this.gestureType != "pan") return;
		if(this.gestureType == ""){
			record = [];
		}
		if (!record.length) {
			touch = {};
			touch.startX = e.touches[0].clientX;
			touch.startY = e.touches[0].clientY;
			touch.deltaX = 0;
			touch.deltaY = 0;
			e.touch = touch;
			touch.prevX = touch.startX;
			touch.prevY = touch.startY;
			record.push({
				deltaX: touch.deltaX,
				deltaY: touch.deltaY,
				timeStamp: e.timeStamp
			});
			//be same to kissy
			e.deltaX = touch.deltaX;
			e.deltaY = touch.deltaY;
			this.gestureType = "pan";
			$(e.target).fire(PAN_START, e);
		} else {
			if(this.gestureType != "pan") return;
			touch.deltaX = e.touches[0].clientX - touch.startX;
			touch.deltaY = e.touches[0].clientY - touch.startY;
			touch.directionX = e.touches[0].clientX - touch.prevX > 0 ? "right":"left";
			touch.directionY = e.touches[0].clientY - touch.prevY > 0 ? "bottom":"top";
			touch.prevX = e.touches[0].clientX;
			touch.prevY = e.touches[0].clientY;
			e.touch = touch;
			record.push({
				deltaX: touch.deltaX,
				deltaY: touch.deltaY,
				timeStamp: e.timeStamp
			});
			//be same to kissy
			e.deltaX = touch.deltaX;
			e.deltaY = touch.deltaY;
			e.velocityX = 0;
			e.velocityY = 0;
			e.directionX = touch.directionX;
			e.directionY = touch.directionY;
			if (!e.isPropagationStopped()) {
				$(e.target).fire(PAN, e);
			}
		}


	}

	function touchEndHandler(e) {
		var flickStartIndex = 0,
			flickStartYIndex = 0,
			flickStartXIndex = 0;
		if (e.touches.length > 1) return;
		touch.deltaX = e.changedTouches[0].clientX - touch.startX;
		touch.deltaY = e.changedTouches[0].clientY - touch.startY;
		//be same to kissy
		e.deltaX = touch.deltaX;
		e.deltaY = touch.deltaY;

		e.touch = touch;
		e.touch.record = record;
		var startX = e.touch.startX;
		var startY = e.touch.startY;
		var len = record.length;
		var startTime = record[0] && record[0]['timeStamp'];
		if (len < 2 || !startTime) return;
		var duration = record[len - 1]['timeStamp'] - record[0]['timeStamp'];
		for (var i in record) {
			if (i > 0) {
				//速度 标量
				record[i]['velocity'] = distance(record[i]['deltaX'], record[i]['deltaY'], record[i - 1]['deltaX'], record[i - 1]['deltaY']) / (record[i]['timeStamp'] - record[i - 1]['timeStamp'])
				//水平速度 矢量
				record[i]['velocityX'] = (record[i]['deltaX'] - record[i - 1]['deltaX']) / (record[i]['timeStamp'] - record[i - 1]['timeStamp'])
				//垂直速度 矢量
				record[i]['velocityY'] = (record[i]['deltaY'] - record[i - 1]['deltaY']) / (record[i]['timeStamp'] - record[i - 1]['timeStamp'])
			} else {
				record[i]['velocity'] = 0;
				record[i]['velocityX'] = 0;
				record[i]['velocityY'] = 0;
			}
		}
		//第一个速度的矢量方向
		var flagX = record[0]['velocityX'] / Math.abs(record[0]['velocityX']);
		for (var i in record) {
			//计算正负极性
			if (record[i]['velocityX'] / Math.abs(record[i]['velocityX']) != flagX) {
				flagX = record[i]['velocityX'] / Math.abs(record[i]['velocityX']);
				//如果方向发生变化 则新起点
				flickStartXIndex = i;
			}
		}

		//第一个速度的矢量方向
		var flagY = record[0]['velocityY'] / Math.abs(record[0]['velocityY']);
		for (var i in record) {
			//计算正负极性
			if (record[i]['velocityY'] / Math.abs(record[i]['velocityY']) != flagY) {
				flagY = record[i]['velocityY'] / Math.abs(record[i]['velocityY']);
				//如果方向发生变化 则新起点
				flickStartYIndex = i;
			}
		}

		flickStartIndex = Math.max(flickStartXIndex, flickStartYIndex);
		//起点
		var flickStartRecord = record[flickStartIndex];
		//移除前面没有用的点
		e.touch.record = e.touch.record.splice(flickStartIndex - 1);


		//去除NaN的点
		for(var i =0,l = e.touch.record.length;i<l;i++){
			if(isNaN(e.touch.record[i].velocity)){
				e.touch.record.splice(i,1);
			}
		}

		var str = ""
		for(var i in e.touch.record){
			str += e.touch.record[i].velocityY.toFixed(2)+" "
		}




		var velocityObj = getSpeed(e.touch.record);
		e.velocityX = Math.abs(velocityObj.velocityX) > MAX_SPEED ? velocityObj.velocityX / Math.abs(velocityObj.velocityX) * MAX_SPEED : velocityObj.velocityX;
		e.velocityY = Math.abs(velocityObj.velocityY) > MAX_SPEED ? velocityObj.velocityY / Math.abs(velocityObj.velocityY) * MAX_SPEED : velocityObj.velocityY;
		e.velocity = Math.sqrt(Math.pow(e.velocityX, 2) + Math.pow(e.velocityY, 2))
		touch = {};
		record = [];
		if(this.gestureType == "pan"){
			$(e.target).fire(PAN_END, e);
			this.gestureType = ""
		}
	}

	function distance(x, y, x2, y2) {
		return Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));
	}

	function getSpeed(record) {
		var velocityY = 0;
		var velocityX = 0;
		var len = record.length;
		for (var i = 0; i < len; i++) {
			velocityY += record[i]['velocityY'];
			velocityX += record[i]['velocityX'];
		}
		velocityY /= len;
		velocityX /= len;
		//手指反弹的误差处理
		return {
			// velocityY: Math.abs(record[len - 1]['velocityY']) > MIN_SPEED ? velocityY : 0,
			// velocityX: Math.abs(record[len - 1]['velocityX']) > MIN_SPEED ? velocityX : 0
			velocityY:velocityY,
			velocityX:velocityX
		}
	}

	S.each([PAN], function(evt) {
		S.Event.Special[evt] = {
			setup: function() {
				$(this).on('touchmove', touchMoveHandler);
				$(this).on('touchend', touchEndHandler);
			},
			teardown: function() {
				$(this).detach('touchmove', touchMoveHandler);
				$(this).detach('touchend', touchEndHandler);
			}
		}
	});



	//枚举
	return {
		PAN_START: PAN_START,
		PAN: PAN,
		PAN_END: PAN_END
	};

}, {
	requires: ['node','event']
});
/*
	Pinch Event 
	@author xiaoqi.huxq@alibaba-inc.com
*/
KISSY.add('kg/xscroll/1.1.10/pinch',function(S, Node, Event) {
	var doc = window.document;
	var PINCH_START = 'gesturePinchStart',
		PINCH_END = 'gesturePinchEnd',
		PINCH = 'gesturePinch';
	var $ = S.all;

	function getDistance(p1, p2) {
		var deltaX = p1.pageX - p2.pageX,
			deltaY = p1.pageY - p2.pageY;
		return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	}

	function getOrigin(p1,p2){
		return {pageX:p1.pageX/2 + p2.pageX/2,pageY:p1.pageY/2 + p2.pageY/2};
	}

	function pinchMoveHandler(e) {
		if (e.touches.length < 2 || e.changedTouches.length < 1) {
			return;
		}
		e.preventDefault();
		var distance = getDistance(e.touches[0], e.touches[1]);
		var origin = getOrigin(e.touches[0], e.touches[1]);
		e.origin = origin;
		//pinchstart
		if(!this.isStart){
			this.isStart = 1;
			this.startDistance = distance;
			this.gestureType = "pinch";
			$(this).fire(PINCH_START,e);
		}else{
			if(this.gestureType != "pinch") return;
			//pinchmove
			e.distance = distance;
			e.scale = distance/this.startDistance;
			$(this).fire(PINCH,e,{origin:origin});
		}
	}

	function pinchEndHandler(e) {
		this.isStart = 0;
		if(this.gestureType != "pinch") return;
		if(e.touches.length == 0){
			$(this).fire(PINCH_END,e)
			this.gestureType = "";
		}
		
	}

	S.Event.Special[PINCH] = {
		setup: function() {
			$(this).on('touchmove', pinchMoveHandler);
			$(this).on('touchend', pinchEndHandler);
		},
		teardown: function() {
			$(this).detach('touchmove', pinchMoveHandler);
			$(this).detach('touchend', pinchEndHandler);
		}
	}
	//枚举
	return {
		PINCH_START: PINCH_START,
		PINCH: PINCH,
		PINCH_END: PINCH_END
	};

}, {
	requires: ['node', 'event']
});
;
KISSY.add('kg/xscroll/1.1.10/util',function(S) {
	var Util = {
		/*
        vendors
        @example webkit|moz|ms|O 
    	*/
		vendor: (function() {
			var el = document.createElement('div').style;
			var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
				transform,
				i = 0,
				l = vendors.length;
			for (; i < l; i++) {
				transform = vendors[i] + 'ransform';
				if (transform in el) return vendors[i].substr(0, vendors[i].length - 1);
			}
			return false;
		})(),
		/**
		 *  attrs with vendor
		 *  @return { String }
		 **/
		prefixStyle: function(style) {
			if (this.vendor === false) return false;
			if (this.vendor === '') return style;
			return this.vendor + style.charAt(0).toUpperCase() + style.substr(1);
		},
		isAndroid:/Android /.test(window.navigator.appVersion),
		isBadAndroid : /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion))
	}

	return Util;

});
/**
 * @fileoverview
 * @author 伯才<xiaoqi.huxq@alibaba-inc.com>
 * @module xscroll
 **/
KISSY.add('kg/xscroll/1.1.10/index',function(S, Node, Event, Base, Pan, Pinch, Util) {
    var $ = S.all;
    var SROLL_ACCELERATION = 0.0005;
    //event names
    var SCROLL_END = "scrollEnd";
    var SCROLL = "scroll";
    var PAN_END = "panEnd";
    var PAN_START = "panStart";
    var PAN = "pan";
    var SCROLL_ANIMATE = "scrollAnimate";
    var SCALE_ANIMATE = "scaleAnimate";
    var SCALE = "scale";
    var AFTER_RENDER = "afterRender";
    var REFRESH = "refresh";
    //boundry checked bounce effect
    var BOUNDRY_CHECK_DURATION = 300;
    var BOUNDRY_CHECK_EASING = "ease-in-out";
    var BOUNDRY_CHECK_ACCELERATION = 0.1;
    //reduced boundry pan distance
    var PAN_RATE = 0.36;
    // reduced scale rate
    var SCALE_RATE = 0.7;

    var SCALE_TO_DURATION = 300;
    //transform
    var transform = Util.prefixStyle("transform");
    //transition webkitTransition MozTransition OTransition msTtransition
    var transition = Util.prefixStyle("transition");

    var transitionDuration = Util.prefixStyle("transitionDuration");

    var transformOrigin = Util.prefixStyle("transformOrigin");

    var transitionEnd = Util.vendor ? Util.prefixStyle("transitionEnd") : "transitionend";

    var transformStr = Util.vendor ? ["-", Util.vendor, "-transform"].join("") : "transform";


    function quadratic2cubicBezier(a, b) {
        return [
            [(a / 3 + (a + b) / 3 - a) / (b - a), (a * a / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)],
            [(b / 3 + (a + b) / 3 - a) / (b - a), (b * b / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)]
        ];
    }


    var RAF = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };

    var cancelRAF = Util.vendor ? window[Util.vendor+'CancelAnimationFrame'] || window[Util.vendor+'CancelRequestAnimationFrame'] :window.cancelAnimationFrame ;

    cancelRAF = cancelRAF || window.clearTimeout;
    //simulateMouseEvent
    var simulateMouseEvent = function(event, type) {
        if (event.touches.length > 1) {
            return;
        }
        var touches = event.changedTouches,
            first = touches[0],
            simulatedEvent = document.createEvent('MouseEvent');
        simulatedEvent.initMouseEvent(type, true, true, window, 1,
            first.screenX, first.screenY,
            first.clientX, first.clientY, false,
            false, false, false, 0 /*left*/ , null);
        event.target.dispatchEvent(simulatedEvent);
    }

    /**
     *
     * @class Xscroll
     * @constructor
     * @extends Base
     */
    var XScroll = Base.extend({
        initializer: function() {
            var self = this;
            window.xscroll = this;
            var userConfig = self.userConfig = S.mix({
                scalable: false
            }, self.userConfig, undefined, undefined, true);
            self.$renderTo = $(userConfig.renderTo);
            var clsPrefix = self.clsPrefix = userConfig.clsPrefix || "ks-xscroll-";
            self.SROLL_ACCELERATION = userConfig.SROLL_ACCELERATION || SROLL_ACCELERATION;
            self.containerClsName = clsPrefix + "container";
            self.contentClsName = clsPrefix + "content";
        },
        /*
            render & scroll to top
        */
        refresh: function() {
            var self = this;
            self.render();
            self.scrollTo({
                x: 0,
                y: 0
            });
            self.fire(REFRESH)
        },
        render: function() {
            var self = this;
            var userConfig = self.userConfig;
            self._createContainer();
            var height = userConfig.height || self.$renderTo.height();
            var width = userConfig.width || self.$renderTo.width();
            self.set("width", Math.round(width));
            self.set("height", Math.round(height));
            self.set("scale", userConfig.scale || 1);
            var containerWidth = Math.round(userConfig.containerWidth || self.$content.width());
            var containerHeight = Math.round(userConfig.containerHeight || self.$content.height());
            self.set("containerWidth", containerWidth < self.get("width") ? self.get("width") : containerWidth);
            self.set("containerHeight", containerHeight < self.get("height") ? self.get("height") : containerHeight);
            self.set("initialContainerWidth", self.get("containerWidth"));
            self.set("initialContainerHeight", self.get("containerHeight"));
            //最小缩放比
            var minScale = self.userConfig.minScale || Math.max(self.get("width") / self.get("containerWidth"), self.get("height") / self.get("containerHeight"));
            var maxScale = self.userConfig.maxScale || 1;
            self.set("minScale", minScale);
            self.set("maxScale", maxScale);
            self.boundry = {
                reset: function() {
                    this.resetTop();
                    this.resetLeft();
                    this.resetBottom();
                    this.resetRight();
                    return this;
                },
                resetTop:function(){
                    this.top = 0;
                    return this;
                },
                resetLeft:function(){
                    this.left = 0;
                    return this;
                },
                resetBottom:function(){
                    this.bottom = self.get("height");
                    return this;
                },
                resetRight:function(){
                    this.right = self.get("width");
                    return this;
                },
                expandTop: function(top) {
                    this.top += top || 0;
                    return this;
                },
                expandLeft: function(left) {
                    this.left += left || 0;
                    return this;
                },
                expandRight: function(right) {
                    this.right -= right || 0;
                    return this;
                },
                expandBottom: function(bottom) {
                    this.bottom -= bottom || 0;
                    return this;
                }
            };
            self.boundry.reset();
            self.fire(AFTER_RENDER);
            self._bindEvt();
        },
        _createContainer: function() {
            var self = this;
            if (self.__isContainerCreated) return;
            var $renderTo = self.$renderTo;
            var container = $("." + self.containerClsName, self.$renderTo)[0];
            var content = $("." + self.contentClsName, self.$renderTo)[0];
            self.$ctn = $(container);
            self.$content = $(content);
            container.style.position = "absolute";
            container.style.height = "100%";
            container.style.width = "100%";
            container.style[transformOrigin] = "0 0";
            content.style.position = "absolute";
            content.style[transformOrigin] = "0 0";
            self.translate({
                x: 0,
                y: 0
            });
            self.__isContainerCreated = true;

        },
        translate: function(offset) {
            this.translateX(offset.x)
            this.translateY(offset.y)
            return;
        },
        translateX: function(x) {
            this.set("x", x);
            this._transform();
        },
        translateY: function(y) {
            this.set("y", y);
            this._transform();
        },
        _noTransition: function() {
            var self = this;
            if (Util.isBadAndroid) {
                self.$content[0].style[transitionDuration] = "0.001s";
                self.$ctn[0].style[transitionDuration] = "0.001s";
            } else {
                self.$content[0].style[transition] = "none";
                self.$ctn[0].style[transition] = "none";
            }
        },
        stop: function() {
            var self = this;
            if(self.isScaling) return;
            var boundry = self.boundry;
            var offset = self.getOffset();

            //outside of boundry 
            if (offset.y > boundry.top || offset.y + self.get("containerHeight") < boundry.bottom || offset.x > boundry.left || offset.x + self.get("containerWidth") < boundry.right) {
                return;
            } 
            self.translate(offset);
            self._noTransition();
            cancelRAF(self.rafX);
            cancelRAF(self.rafY);
            self.fire(SCROLL_END, {
                offset: offset,
                scale: self.get("scale"),
                zoomType:"xy"
            });
        },
        _transform: function() {
            var translateZ = this.get("gpuAcceleration") ? " translateZ(0) " : "";
            this.$content[0].style[transform] = "translate(" + this.get("x") + "px,0px)  scaleX(" + this.get("scale") + ") scaleY(" + this.get("scale") + ") " + translateZ;
            this.$ctn[0].style[transform] = "translate(0px," + this.get("y") + "px) "+translateZ;
        },
        getOffset: function() {
            var self = this;
            return {
                x: self.getOffsetLeft(),
                y: self.getOffsetTop()
            }
        },
        getOffsetTop: function() {
            if (this.get("lockY")) return 0;
            var transY = window.getComputedStyle(this.$ctn[0])[transform].match(/[-\d\.*\d*]+/g);
            return transY ? Math.round(transY[5]) : 0;
        },
        getOffsetLeft: function() {
            if (this.get("lockX")) return 0;
            var transX = window.getComputedStyle(this.$content[0])[transform].match(/[-\d\.*\d*]+/g);
            return transX ? Math.round(transX[4]) : 0;
        },
        /**
         * scroll the root element with an animate
         * @param offset {Object} scrollTop
         * @param duration {Number} duration for animte
         * @param easing {Number} easing functio for animate : ease-in | ease-in-out | ease | bezier
         **/
        scrollTo: function(offset, duration, easing, callback) {
            var self = this;
            var _offset = self.getOffset();
            var x = (undefined === offset.x || isNaN(offset.x)) ? -_offset.x : offset.x;
            var y = (undefined === offset.y || isNaN(offset.y)) ? -_offset.y : offset.y;
            self.scrollX(x, duration, easing, callback);
            self.scrollY(y, duration, easing, callback);
        },
        scrollX: function(x, duration, easing, callback) {
            var self = this;
            var x = Math.round(x);
            if (self.get("lockX")) return;
            var duration = duration || 0;
            var easing = easing || "cubic-bezier(0.333333, 0.666667, 0.666667, 1)";
            var content = self.$content[0];
            self.translateX(-x);
            var transitionStr = duration > 0 ? [transformStr, " ", duration / 1000, "s ", easing, " 0s"].join("") : "none";
            content.style[transition] = transitionStr;
            self._scrollHandler(-x,duration, callback, easing, transitionStr, "x");
            return content.style[transition] = transitionStr;
        },
        scrollY: function(y, duration, easing, callback) {
            var self = this;
            var y = Math.round(y);
            if (self.get("lockY")) return;
            var duration = duration || 0;
            var easing = easing || "cubic-bezier(0.333333, 0.666667, 0.666667, 1)";
            var container = self.$ctn[0];
            self.translateY(-y);
            var transitionStr = duration > 0 ? [transformStr, " ", duration / 1000, "s ", easing, " 0s"].join("") : "none";
            container.style[transition] = transitionStr;
            self._scrollHandler(-y,duration, callback, easing, transitionStr, "y");
            return container.style[transition] = transitionStr;
        },
        _scrollHandler: function(dest,duration, callback, easing, transitionStr, type) {
            var self = this;
            var offset = self.getOffset();
            if (duration <= 0) {
                self.fire(SCROLL, {
                   zoomType: type,
                   offset: self.getOffset()
                });
                self.fire(SCROLL_END, {
                    zoomType: type,
                    offset: offset
                });
                return;
            }
            var Type = type.toUpperCase();

            self['isScrolling' + Type] = true;
            var start = Date.now();
            self['destTime' + Type] = start + duration;
            cancelRAF(self['raf' + Type]);
            //注册滚动结束事件  供transitionEnd进行精确回调
            self['__scrollEndCallback'+Type] = function(args){
                self['isScrolling' + Type] = false;
                self.fire(SCROLL_END, {
                    offset: self.getOffset(),
                    zoomType: args.type
                })
                callback && callback(args);
            }
            var run = function() {
                var now = Date.now();
                if (self['isScrolling' + Type]) {
                    RAF(function() {
                        self.fire(SCROLL, {
                            zoomType: type,
                            offset: self.getOffset()
                        });
                    }, 0);
                }
                self['raf' + Type] = RAF(run);
            }
            run();

            self.fire(SCROLL_ANIMATE, {
                transition: transitionStr,
                offset: {
                    x: self.get("x"),
                    y: self.get("y")
                },
                duration: duration / 1000,
                easing: easing,
                zoomType: type
            })
        },
        boundryCheckX: function(callback) {
            var self = this;
            if (!self.get("boundryCheckEnabled") || self.get("lockX")) return;
            var offset = self.getOffset();
            var containerWidth = self.get("containerWidth");
            var boundry = self.boundry;
            if (offset.x > boundry.left) {
                offset.x = boundry.left;
                self.scrollX(-offset.x, BOUNDRY_CHECK_DURATION, BOUNDRY_CHECK_EASING, callback);
            } else if (offset.x + containerWidth < boundry.right) {
                offset.x = boundry.right - containerWidth;
                self.scrollX(-offset.x, BOUNDRY_CHECK_DURATION, BOUNDRY_CHECK_EASING, callback);
            }
        },
        boundryCheckY: function(callback) {
            var self = this;
            if (!self.get("boundryCheckEnabled") || self.get("lockY")) return;
            var offset = self.getOffset();
            var containerHeight = self.get("containerHeight");
            var boundry = self.boundry;
            if (offset.y > boundry.top) {
                offset.y = boundry.top;
                self.scrollY(-offset.y, BOUNDRY_CHECK_DURATION, BOUNDRY_CHECK_EASING, callback);
            } else if (offset.y + containerHeight < boundry.bottom){
                offset.y = boundry.bottom - containerHeight;
                self.scrollY(-offset.y, BOUNDRY_CHECK_DURATION, BOUNDRY_CHECK_EASING, callback);
            }
        },
        //boundry back bounce
        boundryCheck: function(callback) {
            var self = this;
            self.boundryCheckX(callback);
            self.boundryCheckY(callback);
        },
        /**
         * enable the switch for boundry back bounce
         **/
        bounce: function(isEnabled, callback) {
            var self = this;
            self.set("boundryCheckEnabled", isEnabled);
            isEnabled ? self.boundryCheck(callback) : undefined;
            return;
        },
        _bindEvt: function() {
            var self = this;
            if (self.__isEvtBind) return;
            self.__isEvtBind = true;
            var $renderTo = self.$renderTo;
            var container = self.$ctn[0];
            var content = self.$content[0];
            var containerWidth = self.get("containerWidth");
            var containerHeight = self.get("containerHeight");
            var offset = {
                x: 0,
                y: 0
            };
            var boundry = self.boundry;
            $renderTo.on("touchstart", function(e) {
                e.preventDefault();
                self.stop();
            }).on("tap", function(e) {
                self.boundryCheck();
                if (!self.isScrollingX && !self.isScrollingY) {
                    simulateMouseEvent(e, "click");
                } else {
                    self.isScrollingX = false;
                    self.isScrollingY = false;
                    self.stop();
                }
            }).on(Pan.PAN_START, function(e) {
                offset = self.getOffset();
                self.translate(offset);
                self.fire(PAN_START, {
                    offset: offset
                });
            }).on(Pan.PAN, function(e) {
                var posY = self.get("lockY") ? Number(offset.y) : Number(offset.y) + e.deltaY;
                var posX = self.get("lockX") ? Number(offset.x) : Number(offset.x) + e.deltaX;
                boundry = self.boundry;
                containerWidth = self.get("containerWidth");
                containerHeight = self.get("containerHeight");
                if (posY > boundry.top) { //overtop 
                    posY = (posY - boundry.top) * PAN_RATE + boundry.top;
                }
                if (posY < boundry.bottom - containerHeight) { //overbottom 
                    posY = posY + (boundry.bottom - containerHeight - posY) * PAN_RATE;
                }
                if (posX > boundry.left) { //overleft
                    posX = (posX - boundry.left) * PAN_RATE + boundry.left;
                }
                if (posX < boundry.right - containerWidth) { //overright
                    posX = posX + (boundry.right - containerWidth - posX) * PAN_RATE;
                }
                self.translate({
                    x: posX,
                    y: posY
                });
                self._noTransition();
                self.isScrollingX = false;
                self.isScrollingY = false;
                self.set("directionX", e.directionX);
                self.set("directionY", e.directionY);
                self.fire(SCROLL, {
                    offset: {
                        x: posX,
                        y: posY
                    },
                    directionX: self.get("directionX"),
                    directionY: self.get("directionY")
                });
                self.fire(PAN, {
                    offset: {
                        x: posX,
                        y: posY
                    },
                    deltaX: e.deltaX,
                    deltaY: e.deltaY,
                    directionX: self.get("directionX"),
                    directionY: self.get("directionY")
                });

            }).on(Pan.PAN_END, function(e) {
                self.panEndHandler(e)
                self.fire(PAN_END, {
                    velocity: e.velocity,
                    velocityX: e.velocityX,
                    velocityY: e.velocityY
                })
            })

            container.addEventListener(transitionEnd,function(e){
                if(e.target == content && !self.isScaling){
                    self.__scrollEndCallbackX && self.__scrollEndCallbackX({type: "x"});
                }
                if(e.target == container && !self.isScaling){
                    self.__scrollEndCallbackY && self.__scrollEndCallbackY({type:"y"});
                }
            },false);
            //可缩放
            if (self.userConfig.scalable) {
                var originX, originY;
                self.$renderTo.on(Pinch.PINCH_START, function(e) {
                    scale = self.get("scale");
                    originX = (e.origin.pageX - self.get("x")) / self.get("containerWidth");
                    originY = (e.origin.pageY - self.get("y")) / self.get("containerHeight");
                });
                self.$renderTo.on(Pinch.PINCH, function(e) {
                    self._scale(scale * e.scale, originX, originY,"pinch");
                });
                self.$renderTo.on(Pinch.PINCH_END, function(e) {
                    self.isScaling = false;
                    if (self.get("scale") < self.get("minScale")) {
                        self.scaleTo(self.get("minScale"), originX, originY, SCALE_TO_DURATION);
                    } else if (self.get("scale") > self.get("maxScale")) {
                        self.scaleTo(self.get("maxScale"), originX, originY, SCALE_TO_DURATION);
                    }
                })
            }
            window.addEventListener("resize", function(e) {
                self.refresh();
            })
        },
        _scale: function(scale, originX, originY,triggerEvent) {
            var self = this;
            if (!self.userConfig.scalable || self.get("scale") == scale || !scale) return;

            if (!self.isScaling) {
                self.scaleBegin = self.get("scale");
                self.isScaling = true;
                self.scaleBeginX = self.get("x");
                self.scaleBeginY = self.get("y");
            }
            originX && self.set("originX", originX);
            originY && self.set("originY", originY);
            var boundry = self.boundry;
            var containerWidth = scale * self.get("initialContainerWidth");
            var containerHeight = scale * self.get("initialContainerHeight");
            self.set("containerWidth", Math.round(containerWidth > self.get("width") ? containerWidth : self.get("width")));
            self.set("containerHeight", Math.round(containerHeight > self.get("height") ? containerHeight : self.get("height")));
            self.set("scale", scale);
            var x = originX * (self.get("initialContainerWidth") * self.scaleBegin - self.get("containerWidth")) + self.scaleBeginX;
            var y = originY * (self.get("initialContainerHeight") * self.scaleBegin - self.get("containerHeight")) + self.scaleBeginY;
            if (x > boundry.left) {
                x = boundry.left;
            }
            if (y > boundry.top) {
                y = boundry.top;
            }
            if (x < boundry.right - self.get("containerWidth")) {
                x = boundry.right - self.get("containerWidth");
            }
            if (y < boundry.bottom - self.get("containerHeight")) {
                y = boundry.bottom - self.get("containerHeight")
            }
            self.set("x", x);
            self.set("y", y);
            self._transform();
            self.fire(SCALE, {
                scale: scale,
                origin:{
                    x:originX,
                    y:originY
                },
                triggerEvent:triggerEvent
            })
        },
        /*
            scale(0.5,0.5,0.5,500,"ease-out")
            @param {Number} scale 缩放比
            @param {Float} 0~1之间的缩放中心值 水平方向
            @param {Fload} 0~1之间的缩放中心值 垂直方向
            @param {Number} 动画周期
            @param {String} 动画函数
        */
        scaleTo: function(scale, originX, originY, duration, easing, callback) {
            var self = this;
            //不可缩放
            if (!self.userConfig.scalable || self.get("scale") == scale || !scale) return;
                var duration = duration || 1;
                var easing = easing || "ease-out",
                    transitionStr = [transformStr, " ", duration / 1000, "s ", easing, " 0s"].join("");
                var start = Date.now();
                self.destTimeScale = start + duration;
                cancelRAF(self._rafScale);
                var scaleStart = self.get("scale");
                var step = 0;
                var run = function() {
                    var now = Date.now();
                    if (now > start + duration && now >= self.destTimeScale) {
                        self.isScaling = false;
                        return;
                    }
                    self._rafScale = RAF(run);
                }
                run();
                self.$ctn[0].style[transition] = transitionStr;
                self.$content[0].style[transition] = transitionStr;
                self._scale(scale, originX, originY,"scaleTo");
                self.fire(SCALE_ANIMATE, {
                    scale: self.get("scale"),
                    duration: duration,
                    easing: easing,
                    offset: {
                        x: self.get("x"),
                        y: self.get("y")
                    },
                    origin:{x:originX,y:originY}
                });
        },
        panEndHandler: function(e) {
            var self = this;
            var userConfig = self.userConfig;
            var offset = self.getOffset();
            var transX = self._bounce("x", offset.x, e.velocityX, self.get("width"), self.get("containerWidth"));
            var transY = self._bounce("y", offset.y, e.velocityY, self.get("height"), self.get("containerHeight"));
            var x = transX ? transX['offset'] : 0;
            var y = transY ? transY['offset'] : 0;
            var duration;
            if (transX && transY && transX.status && transY.status && transX.duration && transY.duration) {
                //保证常规滚动时间相同 x y方向不发生时间差
                duration = Math.max(transX.duration, transY.duration);
            }
            if(transX){
                if(transX['duration'] < 100){
                     self._scrollEndHandler("x");
                }else{
                    self.scrollX(x, duration || transX['duration'], transX['easing'], function(e) {
                        self._scrollEndHandler("x");
                    });
                }
            }
            
            if(transY){
                if(transY['duration'] < 100){
                    self._scrollEndHandler("y");
                }else{
                    self.scrollY(y, duration || transY['duration'], transY['easing'], function(e) {
                        self._scrollEndHandler("y");
                    });
                }
            }
            //judge the direction
            self.set("directionX", e.velocityX < 0 ? "left" : "right");
            self.set("directionY", e.velocityY < 0 ? "up" : "down");
        },
        _scrollEndHandler: function(type) {
            var self = this;
            var TYPE = type.toUpperCase();
            var scrollFn = "scroll"+TYPE;
            var boundryCheckFn = "boundryCheck"+TYPE;
            var _bounce = "_bounce"+type;
            if (self[_bounce]) {
                self.fire("outOfBoundry")
                var v = self[_bounce];
                var a = 0.04 * (v / Math.abs(v));
                var t = v / a;
                var s0 = self.getOffset()[type];
                var s = s0 + t * v / 2;
                self[scrollFn](-s, t, "cubic-bezier(" + quadratic2cubicBezier(-t, 0) + ")", function() {
                    self[_bounce] = 0;
                    self[boundryCheckFn]()
                });
            } else {
                 self[boundryCheckFn]();
            }
        },
        _bounce: function(type, offset, v, size, innerSize) {
            var self = this;
            var boundry = self.boundry;
            var boundryStart = type == "x" ? boundry.left : boundry.top;
            var boundryEnd = type == "x" ? boundry.right : boundry.bottom;
            var size = boundryEnd - boundryStart; 
            var transition = {};
            if (v === 0) {
                type == "x" ? self.boundryCheckX() : self.boundryCheckY();
                return;
            }
            if (type == "x" && self.get("lockX")) return;
            if (type == "y" && self.get("lockY")) return;
            var userConfig = self.userConfig;
            var maxSpeed = userConfig.maxSpeed > 0 && userConfig.maxSpeed < 6 ? userConfig.maxSpeed : 3;
            if (v > maxSpeed) {
                v = maxSpeed;
            }
            if (v < -maxSpeed) {
                v = -maxSpeed;
            }
            if (offset > boundryStart || offset < size - innerSize) {
                var a = BOUNDRY_CHECK_ACCELERATION * (v / Math.abs(v));
                var t = v / a;
                var s = offset + t * v / 2;
                transition['offset'] = -s;
                transition['duration'] = t;
                transition['easing'] = "cubic-bezier(" + quadratic2cubicBezier(-t, 0) + ")";
                return transition;
            }

            var a = self.SROLL_ACCELERATION * (v / Math.abs(v));
            var t = v / a;
            var s = offset / 1 + t * v / 2;
            //over top boundry check bounce
            if (s > boundryStart) {
                var _s = boundryStart - offset;
                var _t = (v - Math.sqrt(-2 * a * _s + v * v)) / a;
                transition['offset'] = -boundryStart;
                transition['duration'] = _t;
                transition['easing'] = "cubic-bezier(" + quadratic2cubicBezier(-t, -t + _t) + ")";
                self["_bounce" + type] = v - a * _t;
                //over bottom boundry check bounce
            } else if (s < size - innerSize) {
                var _s = (size - innerSize) - offset;
                var _t = (v + Math.sqrt(-2 * a * _s + v * v)) / a;
                transition['offset'] = innerSize - size;
                transition['duration'] = _t;
                transition['easing'] = "cubic-bezier(" + quadratic2cubicBezier(-t, -t + _t) + ")";
                self["_bounce" + type] = v - a * _t;
                // normal
            } else {
                transition['offset'] = -s;
                transition['duration'] = t;
                transition['easing'] = "cubic-bezier(" + quadratic2cubicBezier(-t, 0) + ")";
                transition['status'] = "normal";
            }
            self['isScrolling' + type.toUpperCase()] = true;
            return transition;

        }
    }, {
        ATTRS: {
            width: {
                value: 0
            },
            height: {
                value: 0
            },
            lockX: {
                value: false
            },
            lockY: {
                value: false
            },
            containerWidth: {
                value: 0
            },
            containerHeight: {
                value: 0
            },
            boundryCheckEnabled: {
                value: true
            },
            directionY: {
                value: ""
            },
            directionX: {
                value: ""
            },
            originX: {
                value: 0
            },
            originY: {
                value: 0
            },
            gpuAcceleration:{
                value:true
            }
        }
    });
    return XScroll;
}, {
    requires: ['node', 'event', 'base', 'kg/xscroll/1.1.10/pan', 'kg/xscroll/1.1.10/pinch', 'kg/xscroll/1.1.10/util']
});
