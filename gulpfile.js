var gulp = require('gulp'),
	less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
    data = require('gulp-data'),
	jade = require('gulp-jade'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    spritesmith = require('gulp.spritesmith'),
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
		//.pipe(minifyCSS())
		.pipe(rename('style.css'))
		.pipe(gulp.dest('build/css'))
});
gulp.task('build-html', function() {
  gulp.src('source/jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('build'))
});
//gulp.task('templates', function() {
//    return gulp.src('./source/jade/*.jade')
//        .pipe(data( function(file) {
//            return require('./source/content/data.json');
//        } ))
//        .pipe(jade())
//        .pipe(gulp.dest('build'));
//});
gulp.task('build-js', function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bxslider-4/dist/jquery.bxslider.js',
    'source/js/libs/jquery-ui.min.js'
  ])
    .pipe(concat('output.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js/libs'));
  gulp.src([
  	'source/js/*.js'
  ])
    .pipe( concat('main.min.js') ) 
    //.pipe(uglify())
    .pipe(gulp.dest('build/js/'))
});
gulp.task('createSprite', function() {
   var spriteData = gulp.src('source/styles/img/sprites/*.*')
       .pipe(spritesmith({
           imgName: 'sprite.png',
           cssName: 'sprite.less',
           cssFormat: 'less',
           algorithm: 'binary-tree',
           cssTemplate: 'less.template.mustache'
       }));
    spriteData.img.pipe(gulp.dest('./build/img/'));
    spriteData.css.pipe(gulp.dest('source/styles/'));
});
gulp.task('copy-images', function () {
    gulp.src('source/styles/img/*')
        .pipe(gulp.dest('build/img/'));
    gulp.src('source/Content/images/*')
        .pipe(gulp.dest('build/content/images/'));
});
gulp.task('copy-fonts', function () {
    gulp.src('source/fonts/*')
        .pipe(gulp.dest('build/fonts'));
});
gulp.task('copy-libs', function () {
    gulp.src('bower_components/modernizr/modernizr.js')
        .pipe(gulp.dest('build/js/libs'));
});
gulp.task('watch', function () {
   gulp.watch('source/styles/*.less', ['build-css']);
   gulp.watch('source/styles/components/*.less', ['build-css']);
   gulp.watch('source/jade/*.jade', ['build-html']);
   gulp.watch('source/jade/partials/*.jade', ['build-html']);
   gulp.watch('source/jade/components/*.jade', ['build-html']);
   gulp.watch('source/js/*.js', ['build-js']);
});

gulp.task('default', ['createSprite', 'build-css', 'build-html', 'build-js', 'copy-libs', 'copy-fonts', 'copy-images', 'webserver', 'livereload', 'watch' ]);