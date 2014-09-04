/**
 * @fileoverview
 * @author 伯才<xiaoqi.huxq@alibaba-inc.com>
 * @module xscroll
 **/
KISSY.add(function(S, Node, Event, Base, Pan, Pinch, Util) {
    var $ = S.all;
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
    // var SYNC = "sync";
    var REFRESH = "refresh";
    //constant acceleration for scrolling
    var SROLL_ACCELERATION = 0.0005;
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

    var vendors = ['webkit', 'moz', 'ms', 'o'];
    var cancelRAF = window.cancelAnimationFrame;
    for (var i = 0; i < vendors.length;i++) {
        if(window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame']){
            cancelRAF = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
        }
    }
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
            self.set("width", width);
            self.set("height", height);
            self.set("scale", userConfig.scale || 1);
            var containerWidth = userConfig.containerWidth || self.$content.width();
            var containerHeight = userConfig.containerHeight || self.$content.height();
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
                    this.left = 0;
                    this.top = 0;
                    this.right = self.get("width");
                    this.bottom = self.get("height");
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
            //support sync rendering
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
        //translate a element 
        translate: function(offset) {
            this.translateX(offset.x)
            this.translateY(offset.y)
            return;
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
            var transitionStr = "";
            //不可缩放
            if (!self.userConfig.scalable || self.get("scale") == scale || !scale) return;
            
            if (duration) {
                var easing = easing || "ease-out";
                transitionStr = [transformStr, " ", duration / 1000, "s ", easing, " 0s"].join("");
                self.$ctn[0].style[transition] = transitionStr;
                self.$content[0].style[transition] = transitionStr;
                self.scale(scale, originX, originY);
                self.fire(SCALE_ANIMATE, {
                    scale: self.get("scale"),
                    duration: duration,
                    easing: easing,
                    offset: {
                        x: self.get("x"),
                        y: self.get("y")
                    }
                });
            }
            return;
        },
        scale: function(scale, originX, originY) {
            var self = this;
            if (!self.userConfig.scalable || self.get("scale") == scale || !scale) return;
            originX && self.set("originX", originX);
            originY && self.set("originY", originY);
            var boundry = self.boundry;
            var containerWidth = scale * self.get("initialContainerWidth");
            var containerHeight = scale * self.get("initialContainerHeight");
            self.set("containerWidth", containerWidth > self.get("width") ? containerWidth : self.get("width"));
            self.set("containerHeight", containerHeight > self.get("height") ? containerHeight : self.get("height"));
            self.set("scale", scale);
            var x = -originX * self.get("containerWidth") + self.get("width") / 2;
            var y = -originY * self.get("containerHeight") + self.get("height") / 2;

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
                scale: scale
            })
        },
        translateX: function(x) {
            this.set("x", x);
            this._transform();
        },
        translateY: function(y) {
            this.set("y", y);
            this._transform();
        },
        _noTransition:function(){
            var self = this;
             if (Util.isAndroid) {
                self.$content[0].style[transitionDuration] = "0.001s";
                self.$ctn[0].style[transitionDuration] = "0.001s";
            } else {
                self.$content[0].style[transition] = "none";
                self.$ctn[0].style[transition] = "none";
            }
        },
        stop: function() {
            var self = this;
            var offset = self.getOffset();
            self.translate(offset);
            self._noTransition();
            cancelRAF(self.rafX);
            cancelRAF(self.rafY);
            self.fire(SCROLL_END, {
                offset: offset,
                scale: self.get("scale")
            });
        },
        _transform: function() {
            this.$content[0].style[transform] = "translate(" + this.get("x") + "px,0px) translateZ(0) scaleX(" + this.get("scale") + ")";
            this.$ctn[0].style[transform] = "translate(0px," + this.get("y") + "px) translateZ(0) scaleY(" + this.get("scale") + ")";
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
            if (self.get("lockX")) return;
            var duration = duration || 0;
            var content = self.$content[0];
            self.translateX(-x);
            var transitionStr = [transformStr, " ", duration / 1000, "s ", easing, " 0s"].join("");
            content.style[transition] = transitionStr;
            self._scrollHandler(duration, callback, easing, transitionStr, "x");
            return content.style[transition] = transitionStr;
        },
        scrollY: function(y, duration, easing, callback) {
            var self = this;
            if (self.get("lockY")) return;
            var duration = duration || 0;
            var container = self.$ctn[0];
            self.translateY(-y);
            var transitionStr = [transformStr, " ", duration / 1000, "s ", easing, " 0s"].join("");
            container.style[transition] = transitionStr;
           self._scrollHandler(duration, callback, easing, transitionStr, "y");
            return container.style[transition] = transitionStr;
        },
        _scrollHandler: function( duration, callback, easing, transitionStr, type) {
            var self = this;
            if (duration <= 0) return;
            var Type = type.toUpperCase();
            self['isScrolling' + Type] = true;
            var start = Date.now();
            self['destTime' + Type] = start + duration;
            cancelRAF(self['raf' + Type]);
            var step = 0;
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

                if (now > start + duration && now >= self['destTime' + Type]) {
                    self['isScrolling' + Type] = false;
                    self.fire(SCROLL, {
                        offset: self.getOffset(),
                        zoomType: type
                    })
                    self.fire(SCROLL_END,{
                        offset: self.getOffset(),
                        zoomType: type
                    })
                    callback && callback({
                        type: type
                    });
                    return;
                }

                self['raf'+Type] = RAF(run);
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
            var width = self.get("width");
            var containerWidth = self.get("containerWidth");
            var boundry = self.boundry;
            if (offset.x > boundry.left) {
                offset.x = boundry.left;
                self.scrollX(-offset.x, BOUNDRY_CHECK_DURATION, BOUNDRY_CHECK_EASING,callback);
            } else if (offset.x + containerWidth < boundry.right) {
                offset.x = boundry.right - containerWidth;
                self.scrollX(-offset.x, BOUNDRY_CHECK_DURATION, BOUNDRY_CHECK_EASING,callback);
            }
        },
        boundryCheckY: function(callback) {
            var self = this;
            if (!self.get("boundryCheckEnabled") || self.get("lockY")) return;
            var offset = self.getOffset();
            var height = self.get("height");
            var containerHeight = self.get("containerHeight");
            var boundry = self.boundry;
            if (offset.y > boundry.top) {
                offset.y = boundry.top;
                self.scrollY(-offset.y, BOUNDRY_CHECK_DURATION, BOUNDRY_CHECK_EASING,callback);
            } else if (offset.y + containerHeight < boundry.bottom) {
                offset.y = boundry.bottom - containerHeight;
                self.scrollY(-offset.y, BOUNDRY_CHECK_DURATION, BOUNDRY_CHECK_EASING,callback);
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
        bounce: function(isEnabled,callback) {
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
                }else{
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
                    posY = posY * PAN_RATE;
                }
                if (posY < boundry.bottom - containerHeight) { //overbottom 
                    posY = posY + (boundry.bottom - containerHeight - posY) * PAN_RATE;
                }
                if (posX > boundry.left) { //overleft
                    posX = posX * PAN_RATE;
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
                self.set("directionX",e.directionX);
                self.set("directionY",e.directionY);
                self.fire(SCROLL, {
                    offset: {
                        x: posX,
                        y: posY
                    },
                    directionX:self.get("directionX"),
                    directionY:self.get("directionY")
                });
                self.fire(PAN, {
                    offset: {
                        x: posX,
                        y: posY
                    },
                    deltaX:e.deltaX,
                    deltaY:e.deltaY,
                    directionX:self.get("directionX"),
                    directionY:self.get("directionY")
                });

            }).on(Pan.PAN_END, function(e) {
                self.panEndHandler(e)
                self.fire(PAN_END, {
                    velocity: e.velocity,
                    velocityX: e.velocityX,
                    velocityY: e.velocityY
                })
            })

            var rscale;
            //可缩放
            if (self.userConfig.scalable) {
                var originX, originY;
                self.$renderTo.on(Pinch.PINCH_START, function(e) {
                    scale = self.get("scale");
                    originX = (e.origin.pageX - self.get("x")) / self.get("containerWidth");
                    originY = (e.origin.pageY - self.get("y")) / self.get("containerHeight");
                });
                self.$renderTo.on(Pinch.PINCH, function(e) {
                    if (self.get("scale") <= self.get("minScale")) {
                        self.scale(scale * e.scale, originX, originY);
                    } else {
                        self.scale(scale * e.scale, originX, originY);
                    }
                });
                self.$renderTo.on(Pinch.PINCH_END, function(e) {
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
        panEndHandler: function(e) {
            var self = this;
            var userConfig = self.userConfig;
            var offset = self.getOffset();
            if (Math.abs(e.velocity) < 0.5) {
                self.fire(SCROLL_END, {
                    offset: offset
                })
                self.boundryCheck();
                return;
            } else {
                var transX = self._bounce("x", offset.x, e.velocityX, self.get("width"), self.get("containerWidth"));
                var transY = self._bounce("y", offset.y, e.velocityY, self.get("height"), self.get("containerHeight"));
                var x = transX ? transX['offset'] : 0;
                var y = transY ? transY['offset'] : 0;
                var duration;

                if (transX && transY && transX.status && transY.status && transX.duration && transY.duration) {
                    //保证常规滚动时间相同 x y方向不发生时间差
                    duration = Math.max(transX.duration, transY.duration);
                }

                transX && self.scrollX(x, duration || transX['duration'], transX['easing'], function(e) {
                    self._scrollEndHandler("x");
                });
                transY && self.scrollY(y, duration || transY['duration'], transY['easing'], function(e) {
                    self._scrollEndHandler("y");
                });

                //judge the direction
                self.set("directionX", e.velocityX < 0 ? "left" : "right");
                self.set("directionY", e.velocityY < 0 ? "up" : "down");
            }
        },
        _scrollEndHandler: function(type) {
            var self = this;
            if (self["_bounce" + type]) {
                self.fire("outOfBoundry")
                var v = self["_bounce" + type];
                var a = 0.04 * (v / Math.abs(v));
                var t = v / a;
                var s0 = self.getOffset()[type];
                var s = s0 + t * v / 2;
                if (type == "x") {
                    self.scrollX(-s, t, "cubic-bezier(" + quadratic2cubicBezier(-t, 0) + ")", function() {
                        self["_bounce" + type] = 0;
                        self.boundryCheckX()
                    });
                } else {
                    self.scrollY(-s, t, "cubic-bezier(" + quadratic2cubicBezier(-t, 0) + ")", function() {
                        self["_bounce" + type] = 0;
                        self.boundryCheckY()
                    });
                }
            } else {
                if (type == "x") {
                    self.boundryCheckX();
                } else if (type == "y") {
                    self.boundryCheckY();
                }
            }
        },
        _bounce: function(type, offset, v, size, innerSize) {
            var self = this;
            var boundry = self.boundry;
            var boundryOffset = boundry[type];
            var boundrySize = type == "x" ? boundry.w : boundry.h;
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
            if (offset > 0 || offset < size - innerSize) {
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
            if (s > 0) {
                var _s = 0 - offset;
                var _t = (v - Math.sqrt(-2 * a * _s + v * v)) / a;
                transition['offset'] = 0;
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
            }
        }
    });
    return XScroll;
}, {
    requires: ['node', 'event', 'base', 'kg/xscroll/1.1.5/pan', 'kg/xscroll/1.1.5/pinch', 'kg/xscroll/1.1.5/util']
});