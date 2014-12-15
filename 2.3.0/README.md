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

#### v1.1.5

- 修复2D滚动时的滚动条、边界碰撞问题

#### v1.1.6

- 修复中心点缩放问题
- 优化安卓事件
- 修复滚动重绘问题

#### v1.1.7

- transition替代帧动画提高滚动条流畅度
- 修复边界拓展后pan事件跳动的问题
- transitionEnd替代RAF方案进行高精度滚动回调

#### v1.1.8

- 修复缩放事件问题

#### v1.1.9

- 新增gpuAcceleration开关是否启用GPU加速
- 修复超出边缘点击不进行回弹的Bug

#### v1.1.10

- 修复duration为0时scrollTo方法不触发scroll、scrollTo事件

#### v2.0.0

- 全面支持KISSY 5
- 整合XList
- 解除脚本依赖，原生化，支持Seajs/RequireJS/KISSY等loader使用和静态引入

### v2.2.0
- 优化边界反弹动画效果
- 支持水平方向无尽滚动
- 修复滚动停止时重绘、闪烁的问题
- 新增useTransition配置，支持帧动画
- 新增easing配置 如：ease ease-out ease-in
- API调整 
    - getCellByRow -> getCellByRowOrCol
    - getCellByOffsetTop -> getCellByOffset
    - getCellByPageY -> getCellByPagePos

### v2.3.0
- 新增snap功能
- 新增多个xscroll相互嵌套的管理机制
