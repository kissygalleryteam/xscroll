/*
combined files : 

kg/xscroll/1.1.6/plugin/fastscroll

*/
/**
 * @fileoverview
 * @author 伯才<xiaoqi.huxq@alibaba-inc.com>
 * @plugin fastscroll 加速滚动
 **/
;
KISSY.add('kg/xscroll/1.1.6/plugin/fastscroll',function(S, Base, Node,Event) {
	var $ = S.all;
	//最小的滑动速度
	var MIN_PAN_VELOCITY = 1;
	//最小间隔时间  超出则不计算
	var MAX_DURAITON = 500;
	//定义多少次滑动后进行速度叠加
	var PAN_TIMES = 1;

	var MAX_SPEED = 6;

	var FastScroll = Base.extend({
		pluginId:"xscroll/plugin/fastscroll",
		pluginInitializer: function(xscroll) {
			var self = this;

			self.records = [];
			//统计同方向快速滑动次数
			self.times = 0;
			xscroll.on("panEnd",function(e){
				if(Math.abs(e.velocityY) > MIN_PAN_VELOCITY){
					self.records.push({
						velocityY:e.velocityY,
						timeStamp:e.timeStamp
					});
					self.times ++;
				}else{
					self.reset();
				}
				
				if(self.times >= PAN_TIMES){
					console.log("times:",self.times,"加速","velocityY:",e.velocityY,"newVelocity:",Math.abs(e.velocityY)/e.velocityY * MAX_SPEED)
					xscroll.panEndHandler({
						velocityY:Math.abs(e.velocityY)/e.velocityY * MAX_SPEED
					},true);
				}
			})

			xscroll.on("scrollEnd",function(e){
				// if(!xscroll.isScrollingY){
				// 	self.reset();
				// }
			})

			xscroll.on("dragStart",function(e){
				if(xscroll.isScrolling){
					if(self.dragRecords.length){
						//前一次时间
						var preTime = self.dragRecords.pop()['timeStamp'];
						if(e.timeStamp - preTime > MAX_DURAITON){
							self.reset();
						}
					}
				}else{
					//清空数据
					self.dragRecords = [];
				}
			})
			//滑动方向变化后复位
			xscroll.on("afterDirectionYChange",function(){
				self.reset();
			})
		},
		//清空数据
		reset:function(){
			var self = this;
			self.dragRecords = [];
			self.times = 0;
		}
	}, {
		ATTRS: {

		}
	})
	return FastScroll;

}, {
	requires: ['base', 'node','event']
});
