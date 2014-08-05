![XScroll结构图](http://gtms01.alicdn.com/tps/i1/TB1Pmu9FVXXXXaZXFXXEBpbZpXX-1720-1162.png_600x600.jpg)

XScroll
=======

移动端的模拟滚动方案

弹性动画、滚动动画、手势无限接近IOS的native滚动体验

### Plugin

* 滚动条 scrollbar

### Event

* 拖拽 pan
* 点击 tap/tapHold
* 缩放 pinch

### Demo

* [水平方向滚动](../demo/scroll-x.html)
* [垂直方向滚动](../demo/scroll-y.html)
* [2D滚动](../demo/2d-scroll.html)
* [支持缩放+滚动条](../demo/zoom.html)


## 初始化组件
	
    S.use('kg/xscroll/1.0.0/', function (S, Xscroll) {
         var xscroll = new Xscroll();
    })
	
	
## DEMO

[2d-scroll](../demo/2d-scroll.html)

[scroll-x.html](../demo/scroll-x.html)

[scroll-y.html](../demo/scroll-y.html)
	

## API说明

### Config

#### renderTo 

渲染节点

#### width 

外容器视窗宽度

#### height 

外容器视窗高度

#### containerWidth 

内容器宽度

#### containerHeight 

内容器高度

#### autoRender 是否自动渲染

### Method

#### render() 

渲染

#### translate(offset) 

移动 offset.x offset.y

#### translateX(x) 

水平移动

#### translateY(y) 

垂直移动

#### getOffset() 

获取滚动距离对象，包含x,y两个方向

#### getOffsetTop()

获取顶部滚动卷去的距离

#### getOffsetLeft()

获取左边滚动卷去的距离

#### scrollTo(offset, duration, easing, callback) 

滚动至

#### scrollX(x, duration, easing,callback) 

横向滚动

#### scrollY(y, duration, easing,callback) 

纵向滚动

#### bounce(isEnabled) 

是否允许边缘回弹

#### boundry.expandTop(pixel)

拓展上边界

#### boundry.expandLeft(pixel)

拓展左边界

#### boundry.expandRight(pixel)

拓展右边界

#### boundry.expandBottom(pixel)

拓展下边界

#### boundry.reset()

边界复位、复位拓展项，初始化为滚动容器的位置尺寸


### Event

#### scrollEnd 

滚动结束触发

#### scroll

滚动时触发

#### panStart 

手指开始滑动时触发

#### pan 

手指滑动时触发

#### panEnd 

手指滑动结束后触发

#### scrollAnimate

调用scrollTo,scrollX,scrollY发生滚动动画时触发，返回offset、duration、easing等信息

#### scaleAnimate

调用scaleTo发生缩放时触发，返回scale、duration、easing等信息

#### afterRender 

渲染后触发
