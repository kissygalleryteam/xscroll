	var Util = require('../util'),
		Base = require('../base');

	var FastScroll = function(cfg) {
		FastScroll.superclass.constructor.call(this, cfg);
		this.userConfig = Util.mix({

		}, cfg);
	}

	Util.extend(FastScroll, Base, {
		pluginId: "fastscroll",
		pluginInitializer: function(xscroll) {
			var self = this;
			self.xscroll = xscroll;
			self._bindEvt();
		},
		pluginDestructor: function() {

		},
		_bindEvt:function(){
			var self = this,
				xscroll = self.xscroll,
				mc = xscroll.mc;
			var speedRecords = [];
			var defaultMaxSpeed = xscroll.userConfig.maxSpeed || 2;
			var average = function(ary){
				var l = ary.length;
				if(l == 0) return;
				var t = 0;
				for(var i =0;i<l;i++){
					t+=ary[i];
				}
				return t/l;
			}
			mc.on("panend",function(e){
				// console.log(e.velocityY)
				if(Math.abs(e.velocityY)>1.5 && (speedRecords.length == 0 || e.velocityY/speedRecords[speedRecords.length-1]>0)){
					speedRecords.push(e.velocityY*Math.pow(1.2,speedRecords.length));
				}else{
					speedRecords = [];
					xscroll.userConfig.maxSpeed = defaultMaxSpeed;
				}
				if(speedRecords.length > 3){
					var v = average(speedRecords);
					console.log("acc"," v:",v)
					//cancel limit speed
					xscroll.userConfig.maxSpeed = Math.abs(v);
					xscroll._onpanend({
						velocityY:v
					});
				}
			});
		}
	});

	if (typeof module == 'object' && module.exports) {
		module.exports = FastScroll;
	} else if (window.XScroll && window.XScroll.Plugins) {
		return XScroll.Plugins.FastScroll = FastScroll;
	} 