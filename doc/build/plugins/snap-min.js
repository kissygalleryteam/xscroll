KISSY.add("kg/xscroll/3.0.0/plugins/snap",["../util","../base"],function(n,o,s,a){var e=o("../util"),t=o("../base"),r=function(n){r.superclass.constructor.call(this,n),this.userConfig=e.mix({snapColIndex:0,snapRowIndex:0,snapDuration:500,snapEasing:"ease",snapOffsetLeft:0,snapOffsetTop:0,autoStep:!1},n)};if(e.extend(r,t,{pluginId:"snap",pluginInitializer:function(n){var o=this;o.xscroll=n.render(),o.snapColIndex=o.userConfig.snapColIndex,o.snapRowIndex=o.userConfig.snapRowIndex,prefix=o.userConfig.prefix,o.render()},pluginDestructor:function(){var n=this,o=n.xscroll;o.on("panend",o._onpanend,o),o.off("panend",n._snapAnimate,n),delete n},snapTo:function(n,o,s,a,e){return this.snapToCol(n,s,a,e),this.snapToRow(o,s,a,e),this},snapToCol:function(n,o,s,a){var e=this,t=e.userConfig,o=o||t.snapDuration,s=s||t.snapEasing,r=t.snapWidth,l=t.snapColsNum,i=t.snapOffsetLeft;n=n>=l?l-1:0>n?0:n,e.snapColIndex=n;var p=e.snapColIndex*r+i;return e.xscroll.scrollLeft(p,o,s,a),e},snapToRow:function(n,o,s,a){var e=this,t=e.userConfig,o=o||t.snapDuration,s=s||t.snapEasing,r=t.snapHeight,l=t.snapRowsNum,i=t.snapOffsetTop;n=n>=l?l-1:0>n?0:n,e.snapRowIndex=n;var p=e.snapRowIndex*r+i;return e.xscroll.scrollTop(p,o,s,a),e},_snapAnimate:function(n){var o=this,s=o.userConfig,a=s.snapWidth,e=s.snapHeight;o.xscroll.__topstart=null,o.xscroll.__leftstart=null;var t=n.direction;if(Math.abs(n.velocity)<=.2){var r=Math.abs(o.xscroll.getScrollLeft()),l=Math.abs(o.xscroll.getScrollTop());o.snapColIndex=Math.round(r/a),o.snapRowIndex=Math.round(l/e),o.snapTo(o.snapColIndex,o.snapRowIndex)}else if(s.autoStep){var i=o.xscroll.computeScroll("x",n.velocityX),p=o.xscroll.computeScroll("y",n.velocityY),u=i&&i.pos?Math.round(i.pos/a):o.snapColIndex,d=p&&p.pos?Math.round(p.pos/e):o.snapRowIndex,c=Math.ceil(i&&i.duration,p&&p.duration);i&&"inside"==i.status?o.snapToCol(u,c,i&&i.easing,function(){o.xscroll.boundryCheckX()}):i&&o.xscroll.scrollLeft(i.pos,i.duration,i.easing,function(){o.xscroll.boundryCheckX(),o.snapColIndex=Math.round(Math.abs(o.xscroll.getScrollLeft())/a)}),p&&"inside"==p.status?o.snapToRow(d,c,p&&p.easing,function(){o.xscroll.boundryCheckY()}):p&&o.xscroll.scrollTop(p.pos,p.duration,p.easing,function(){o.xscroll.boundryCheckY(),o.snapRowIndex=Math.round(Math.abs(o.xscroll.getScrollTop())/e)})}else 2==t?o.snapColIndex++:4==t?o.snapColIndex--:void 0,8==t?o.snapRowIndex++:16==t?o.snapRowIndex--:void 0,o.snapTo(o.snapColIndex,o.snapRowIndex)},render:function(){var n=this,o=n.xscroll;return n.userConfig.snapWidth=n.userConfig.snapWidth||o.width||100,n.userConfig.snapHeight=n.userConfig.snapHeight||o.height||100,n.userConfig.snapColsNum=n.userConfig.snapColsNum||Math.max(Math.round(o.containerWidth/o.width),1),n.userConfig.snapRowsNum=n.userConfig.snapRowsNum||Math.max(Math.round(o.containerHeight/o.height),1),o.off("panend",o._onpanend),o.on("panend",n._snapAnimate,n),n}}),"object"==typeof a&&a.exports)a.exports=r;else if(window.XScroll&&window.XScroll.Plugins)return XScroll.Plugins.Snap=r});