var gulp = require('gulp'),
	less = require('gulp-less'),
  autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	jade = require('gulp-jade'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  watch = require('gulp-watch');


gulp.task('webserver', function() {
  connect.server({
    root: 'build',
    livereload: true,
    port:9000
  });
});
gulp.task('livereload', function() {
  gulp.src(['build/css/*.css', 'build/js/*.js'])
    .pipe(watch(['build/css/*.css', 'build/*.html']))
    .pipe(connect.reload());
});

gulp.task('build-css', function() {
	gulp.src('source/styles/main.less')
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(minifyCSS())
		.pipe(rename('style.css'))
		.pipe(gulp.dest('build/css'))
});
gulp.task('build-html', function() {
  gulp.src('source/jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('build'))
});
gulp.task('build-js', function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/modernizr/modernizr.js'
  ])
    .pipe( concat('output.min.js') ) 
    .pipe(uglify())
    .pipe(gulp.dest('build/js/libs'))
  gulp.src([
  	'source/js/*.js'
  ])
    .pipe( concat('main.min.js') ) 
    .pipe(uglify())
    .pipe(gulp.dest('build/js/'))
});
gulp.task('copy-images', function () {
    gulp.src('source/styles/img/*')
        .pipe(gulp.dest('build/img/'));
});

gulp.task('watch', function () {
   gulp.watch('source/styles/*.less', ['build-css']);
   gulp.watch('source/jade/*.jade', ['build-html']);
   gulp.watch('source/jade/partials/*.jade', ['build-html']);
   gulp.watch('source/js/*.js', ['build-js']);
});


gulp.task('default', ['build-css', 'build-html', 'build-js', 'copy-images', 'webserver', 'livereload', 'watch']);