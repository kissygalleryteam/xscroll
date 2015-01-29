var gulp = require('gulp');

var PACKAGE = require('./package.json');


var kmc = require('gulp-kmc');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');



var src = "./src",
  dest = "./build";


kmc.config({
  packages: [{
    name: 'kg/xscroll/' + PACKAGE.version + "/",
    base: src
  }]
});

gulp.task('kmc', function() {

  gulp.src(src + "/**/*.js")
    //转换cmd模块为kissy模块 
    .pipe(kmc.convert({
      kissy: true, // modulex: true , define: true 
      // exclude: ['tasks'],//忽略该目录 
      ignoreFiles: ['.combo.js', '-min.js'], //忽略该类文件, 
      requireCss: false //是否保留js源码中的require('./xxx.css) 默认true 
    }))
    //合并文件 
    // .pipe(kmc.combo({
    //      files:[{
    //                src: src+'/index.js',
    //                dest: dest+'/core.js'
    //            }]
    //  }))
    .pipe(gulp.dest(dest))
    .pipe(uglify())
    .pipe(rename({
      suffix: "-min.js"
    }))
    .pipe(gulp.dest(dest));



});

gulp.task('default', ['kmc']);