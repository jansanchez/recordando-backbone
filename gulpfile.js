var gulp = require('gulp'),
	jade = require('gulp-jade'),
	coffee = require('gulp-coffee'),
	gutil = require('gulp-util');

gulp.task('default', ['jade', 'coffee'], function() {
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

/*
jshint
stylus
jasmine
*/