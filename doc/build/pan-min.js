/*!build time : 2014-09-04 7:15:35 PM*/
KISSY.add("kg/xscroll/1.1.5/pan",function(a){function b(a){if(!(a.touches.length>1||this.gestureType&&"pan"!=this.gestureType))if(""==this.gestureType&&(m=[]),m.length){if("pan"!=this.gestureType)return;l.deltaX=a.touches[0].clientX-l.startX,l.deltaY=a.touches[0].clientY-l.startY,l.directionX=a.touches[0].clientX-l.prevX>0?"right":"left",l.directionY=a.touches[0].clientY-l.prevY>0?"bottom":"top",l.prevX=a.touches[0].clientX,l.prevY=a.touches[0].clientY,a.touch=l,m.push({deltaX:l.deltaX,deltaY:l.deltaY,timeStamp:a.timeStamp}),a.deltaX=l.deltaX,a.deltaY=l.deltaY,a.velocityX=0,a.velocityY=0,a.directionX=l.directionX,a.directionY=l.directionY,a.isPropagationStopped()||k(a.target).fire(h,a)}else l={},l.startX=a.touches[0].clientX,l.startY=a.touches[0].clientY,l.deltaX=0,l.deltaY=0,a.touch=l,l.prevX=l.startX,l.prevY=l.startY,m.push({deltaX:l.deltaX,deltaY:l.deltaY,timeStamp:a.timeStamp}),a.deltaX=l.deltaX,a.deltaY=l.deltaY,this.gestureType="pan",k(a.target).fire(f,a)}function c(a){var b=0,c=0,f=0;if(!(a.touches.length>1)){l.deltaX=a.changedTouches[0].clientX-l.startX,l.deltaY=a.changedTouches[0].clientY-l.startY,a.deltaX=l.deltaX,a.deltaY=l.deltaY,a.touch=l,a.touch.record=m;var h=(a.touch.startX,a.touch.startY,m.length),i=m[0]&&m[0].timeStamp;if(!(2>h)&&i){{m[h-1].timeStamp-m[0].timeStamp}for(var n in m)n>0?(m[n].velocity=d(m[n].deltaX,m[n].deltaY,m[n-1].deltaX,m[n-1].deltaY)/(m[n].timeStamp-m[n-1].timeStamp),m[n].velocityX=(m[n].deltaX-m[n-1].deltaX)/(m[n].timeStamp-m[n-1].timeStamp),m[n].velocityY=(m[n].deltaY-m[n-1].deltaY)/(m[n].timeStamp-m[n-1].timeStamp)):(m[n].velocity=0,m[n].velocityX=0,m[n].velocityY=0);var o=m[0].velocityX/Math.abs(m[0].velocityX);for(var n in m)m[n].velocityX/Math.abs(m[n].velocityX)!=o&&(o=m[n].velocityX/Math.abs(m[n].velocityX),f=n);var p=m[0].velocityY/Math.abs(m[0].velocityY);for(var n in m)m[n].velocityY/Math.abs(m[n].velocityY)!=p&&(p=m[n].velocityY/Math.abs(m[n].velocityY),c=n);b=Math.max(f,c);{m[b]}a.touch.record=a.touch.record.splice(b-1);for(var n=0,q=a.touch.record.length;q>n;n++)isNaN(a.touch.record[n].velocity)&&a.touch.record.splice(n,1);var r=e(a.touch.record);a.velocityX=Math.abs(r.velocityX)>j?r.velocityX/Math.abs(r.velocityX)*j:r.velocityX,a.velocityY=Math.abs(r.velocityY)>j?r.velocityY/Math.abs(r.velocityY)*j:r.velocityY,a.velocity=Math.sqrt(Math.pow(a.velocityX,2)+Math.pow(a.velocityY,2)),l={},m=[],"pan"==this.gestureType&&(k(a.target).fire(g,a),this.gestureType="")}}}function d(a,b,c,d){return Math.sqrt(Math.pow(c-a,2)+Math.pow(d-b,2))}function e(a){for(var b=0,c=0,d=a.length,e=0;d>e;e++)b+=a[e].velocityY,c+=a[e].velocityX;return b/=d,c/=d,{velocityY:Math.abs(a[d-1].velocityY)>i?b:0,velocityX:Math.abs(a[d-1].velocityX)>i?c:0}}var f=(window.document,"gesturePanStart"),g="gesturePanEnd",h="gesturePan",i=.35,j=8,k=a.all,l={},m=[];return a.each([h],function(d){a.Event.Special[d]={setup:function(){k(this).on("touchmove",b),k(this).on("touchend",c)},teardown:function(){k(this).detach("touchmove",b),k(this).detach("touchend",c)}}}),{PAN_START:f,PAN:h,PAN_END:g}},{requires:["node","event"]});