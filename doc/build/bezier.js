define('kg/xscroll/2.3.0/bezier',[],function(require, exports, module) {function r(r,n,t,u,e){var f=function(n){var u=1-n;return 3*u*u*n*r+3*u*n*n*t+n*n*n},a=function(r){var t=1-r;return 3*t*t*r*n+3*t*r*r*u+r*r*r},i=function(n){var u=1-n;return 3*(2*(n-1)*n+u*u)*r+3*(-n*n*n+2*u*n)*t};return function(r){var n,t,u,o,c,v,b=r;for(u=b,v=0;8>v;v++){if(o=f(u)-b,Math.abs(o)<e)return a(u);if(c=i(u),Math.abs(c)<1e-6)break;u-=o/c}if(n=0,t=1,u=b,n>u)return a(n);if(u>t)return a(t);for(;t>n;){if(o=f(u),Math.abs(o-b)<e)return a(u);b>o?n=u:t=u,u=.5*(t-n)+n}return a(u)}}module.exports=r;});