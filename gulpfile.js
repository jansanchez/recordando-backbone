var gulp = require('gulp'),
	jade = require('gulp-jade'),
	coffee = require('gulp-coffee'),
	gutil = require('gulp-util'),
    stylus = require('gulp-stylus'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint');

var path = {
        src: {
            jade: ['./frontend/jade/**/*.jade'],
            coffee: ['./frontend/coffee/**/*.coffee', '!./frontend/coffee/**/_*.coffee'],
            stylus: ['./frontend/stylus/**/*.styl', '!./frontend/stylus/_**/*.styl', '!./frontend/stylus/**/_**/*.styl'],
            lint: ['!./public/static/js/libs/', './public/static/js/*.js']
        },
        dest: {
            jade: './public/',
            coffee: './public/static/js/',
            stylus: './public/static/css/'
        }
    };


gulp.task('default', ['jade', 'coffee', 'lint', 'stylus'], function() {
	console.log('aqui se deben ejecutar todas las tareas de gulp');
});

gulp.task('jade', function() {
    gulp.src(path.src.jade)
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest(path.dest.jade))
});

gulp.task('coffee', function() {
    gulp.src(path.src.coffee)
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(path.dest.coffee))
});

gulp.task('lint', function() {
    gulp.src(path.src.lint)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('stylus', function () {
    gulp.src(path.src.stylus)
    .pipe(stylus())
    .pipe(gulp.dest(path.dest.stylus));
});

gulp.task('watch', function () {
  var js = ['coffee', 'lint'];
  gulp.watch(path.src.coffee, js);
});

