/*
combined files : 

kg/xscroll/1.1.10/pinch

*/
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
