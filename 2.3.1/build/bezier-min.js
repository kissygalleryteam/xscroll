/*!build time : 2014-12-18 5:12:53 PM*/
KISSY.add("kg/xscroll/2.3.1/bezier",function(){function a(a,b,c,d,e){var f=function(b){var d=1-b;return 3*d*d*b*a+3*d*b*b*c+b*b*b},g=function(a){var c=1-a;return 3*c*c*a*b+3*c*a*a*d+a*a*a},h=function(b){var d=1-b;return 3*(2*(b-1)*b+d*d)*a+3*(-b*b*b+2*d*b)*c};return function(a){var b,c,d,i,j,k,l=a;for(d=l,k=0;8>k;k++){if(i=f(d)-l,Math.abs(i)<e)return g(d);if(j=h(d),Math.abs(j)<1e-6)break;d-=i/j}if(b=0,c=1,d=l,b>d)return g(b);if(d>c)return g(c);for(;c>b;){if(i=f(d),Math.abs(i-l)<e)return g(d);l>i?b=d:c=d,d=.5*(c-b)+b}return g(d)}}return a});