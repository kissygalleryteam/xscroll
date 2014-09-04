![XScroll结构图](http://gtms01.alicdn.com/tps/i1/TB1Pmu9FVXXXXaZXFXXEBpbZpXX-1720-1162.png_600x600.jpg)

XScroll
=======

移动端的模拟滚动方案

弹性动画、滚动动画、手势无限接近IOS的native滚动体验

### changelog

#### v1.1.0

- 新增boundry、bounce接口

#### v1.1.1

- 修复2d滚动结束事件回调相互干扰的问题
- pan事件调整，panstart区分touchstart

#### v1.1.2

- pulldown插件允许自定义刷新（异步刷新）通过autoRefresh配置开关

#### v1.1.3

- 修复1.1.2包名错误导致无法使用组件的问题

#### v1.1.4

- 修复超链接误点的问题
- 修复isScrollingX,isScrollingY和scrollEnd的判断逻辑错误问题
- content高度100%限制去除
- 修复滚动条定位问题



