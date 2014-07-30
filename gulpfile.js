var gulp = require('gulp'),
	jade = require('gulp-jade'),
	coffee = require('gulp-coffee'),
	gutil = require('gulp-util'),
    stylus = require('gulp-stylus'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint');

gulp.task('default', ['jade', 'coffee', 'lint', 'stylus'], function() {
	console.log('aqui se deben ejecutar todas las tareas de gulp');
});

gulp.task('jade', function() {
    gulp.src('./frontend/jade/**/*.jade')
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('./public/'))
});

gulp.task('coffee', function() {
    gulp.src('./frontend/coffee/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./public/static/js/'))
});

gulp.task('lint', function() {
    gulp.src('!./public/static/js/libs/', './public/static/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('stylus', function () {
    gulp.src('./frontend/stylus/**/*.styl','!frontend/stylus/_**/')
    .pipe(stylus())
    .pipe(gulp.dest('./public/static/css/'));
});

gulp.task('watch', function () {
  var js = ['coffee', 'lint'];
  gulp.watch('./frontend/coffee/**/*.coffee', js);
});