var gulp = require('gulp'),
	jade = require('gulp-jade'),
	coffee = require('gulp-coffee'),
	gutil = require('gulp-util'),
	stylus = require('gulp-stylus'),
	watch = require('gulp-watch'),
	jshint = require('gulp-jshint'),
	complexity = require('gulp-complexity'),
	browserSync = require('browser-sync'),
	changelog = require('conventional-changelog'),
	bump = require('gulp-bump'),
	tagVersion = require('gulp-tag-version'),
	filter = require('gulp-filter'),
	exec = require("child_process").exec,
	fs = require('fs'),
	package = require('./package.json');

var reload = browserSync.reload;

var path = {
		src: {
			jade:   ['./frontend/jade/**/*.jade', '!./frontend/jade/_**/*.jade', '!./frontend/jade/**/_*.jade'],
			coffee: ['./frontend/coffee/**/*.coffee', '!./frontend/coffee/_**/*.coffee', '!./frontend/coffee/**/_*.coffee'],
			stylus: ['./frontend/stylus/**/*.styl', '!./frontend/stylus/_**/*.styl', '!./frontend/stylus/**/_*.styl'],
			lint:   ['./public/static/js/**/*.js', '!./public/static/js/libs/**/*.js'],
			complexity: ['./public/static/js/**/*.js', '!./public/static/js/libs/**/*.js']
		},
		dest: {
			jade: './public/',
			coffee: './public/static/js/',
			stylus: './public/static/css/'
		}
	};

gulp.task('js', ['coffee', 'lint', 'complexity'], function() {
	console.log('todo js');
});

gulp.task('default', ['jade', 'coffee', 'lint', 'complexity', 'stylus'], function() {
	console.log('aquí se deben ejecutar todas las tareas de gulp');
});

gulp.task('jade', function() {
	return gulp.src(path.src.jade)
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(path.dest.jade));
});

gulp.task('coffee', function() {
	return gulp.src(path.src.coffee)
		.pipe(coffee({bare: true}).on('error', gutil.log))
		.pipe(gulp.dest(path.dest.coffee));
});

gulp.task('lint', function() {
	return gulp.src(path.src.lint)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('complexity', function(){
	return gulp.src(path.src.complexity)
		.pipe(complexity());
});

gulp.task('stylus', function () {
	return gulp.src(path.src.stylus)
		.pipe(stylus())
		.pipe(gulp.dest(path.dest.stylus));
});

gulp.task('watch', ['server'], function () {
	var coffeeTasks = ['coffee', 'lint', 'complexity'],
		jadeTasks = ['jade'],
		stylusTasks = ['stylus'];

	gulp.watch(path.src.coffee, coffeeTasks);
	gulp.watch(path.src.jade, jadeTasks);
	gulp.watch(path.src.stylus, stylusTasks);
});


gulp.task('sinatra', function () {
	return exec('ruby rest.rb', function (error, stdout, stderr) {
		console.log('Running in http://localhost:9494/');
		callback(stdout, error);
	});
});

gulp.task('server', ['sinatra'], function () {
	return browserSync({
		proxy: 'localhost:9494',
		open:  'localhost:9494',
		//browser: ['google-chrome']
	});
});


gulp.task('log', function () {
	return changelog({
		repository: package.repository.url,
		version: package.version
	}, function(err, log) {
		fs.writeFileSync('CHANGELOG.md', log, 'utf8');
		//console.log('Here is your changelog!', log);
	});
});

gulp.task('bump', ['log'], function(){
	gulp.src(['./package.json', 'bower.json'])
	.pipe(bump())
	.pipe(gulp.dest('./'))
	.pipe(filter('package.json'))
	.pipe(tagVersion());
});
