'use strict';

var gulp       = require('gulp'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    paths       = require('compass-options').dirs(),
    rename      = require('gulp-rename'),
    stripDebug  = require('gulp-strip-debug'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    compass     = require('gulp-compass'),
    prefix      = require('gulp-autoprefixer'),
    cleanCSS    = require('gulp-clean-css'),
    complexity  = require('gulp-complexity'),
    replace     = require('gulp-replace');


// Config Variables
var source  = 'src';


////////////////////////////////////////////////////////////////////////////////
// JavaScript Lint Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('lint', function() {
  return gulp.src([ source + '/js/**/*.js' ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});


////////////////////////////////////////////////////////////////////////////////
// JavaScript Complexity Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('jscomplexity', ['lint'], function() {
  return gulp.src([ source + '/js/**/*.js' ])
    .pipe(complexity());
});


////////////////////////////////////////////////////////////////////////////////
// JavaScript Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('scripts', ['jscomplexity'], function() {
  gulp.src([
    // Config (optional)
    source + '/js/slider-menu.jquery.js'
  ])
    .pipe(concat('slider-menu.jquery.js'))
    .pipe(rename('slider-menu.jquery.min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js));
});


////////////////////////////////////////////////////////////////////////////////
// Compass Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('compass', function() {
  return gulp.src(paths.sass + '/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: paths.css,
      sass: paths.sass,
      bundle_exec: true,
      time: true
    }))
    .on('error', function(error) {
      console.log(error);
      this.emit('end');
    })
    .pipe(prefix({
      browsers: ['last 3 versions', '> 1%', 'ie 9'],
      cascade: false
    }))
    .pipe(cleanCSS({
      compatibility: 'ie9'
    }, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(gulp.dest(paths.css));
});


////////////////////////////////////////////////////////////////////////////////
// Watch Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('watch', function () {
  gulp.watch(source + '/**/*.js', ['scripts']);
  gulp.watch(paths.sass + '/**/*.scss', ['compass']);
});


////////////////////////////////////////////////////////////////////////////////
// Default Task
////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['scripts', 'compass']);


////////////////////////////////////////////////////////////////////////////////
// Compile Task (for production)
////////////////////////////////////////////////////////////////////////////////
gulp.task('compile', ['scripts', 'compass', 'watch']);
