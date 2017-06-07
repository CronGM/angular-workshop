'use strict';

var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	cssnano = require('gulp-cssnano'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	fs = require('fs'),
	del = require('del'),
	wrap = require('gulp-wrap'),
	browserSync = require('browser-sync').create();

var WRAP_TEMPLATE = '(function(){ "use strict"; <%= contents %> })();';

// Prevent gulp pipeline from crashing on error
function swallowError(error) {
	console.error(error.toString());
	this.emit('end');
}

gulp.task('serve', ['sass', 'js'], function() {
	browserSync.init({
		server: {
			baseDir: '.'
		}
	});

	// gulp.start('watch');
	gulp.watch('src/styles/**/*.scss', ['sass']);
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('*.html').on('change', browserSync.reload);
	gulp.watch('views/*.html').on('change', browserSync.reload);
});

gulp.task('sass', function() {
	return sass('src/styles/main.scss', { style: 'expanded' })
		.pipe(gulp.dest('assets/css'))
		// Don't need minified for development
		// .pipe(cssnano())
		// .pipe(rename({ suffix: '.min' }))
		// .pipe(gulp.dest('assets/css'))
		.pipe(browserSync.stream());
		// .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('js', function() {
	// TODO: Separate app file from components file
	return gulp.src(['src/js/app.js', 'src/js/**/*.js'])
		.pipe(concat('app.js'))
		.pipe(wrap(WRAP_TEMPLATE))
		.pipe(gulp.dest('assets/js'))
		.pipe(uglify())
		.on('error', swallowError)
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('assets/js'))
		.pipe(browserSync.stream());
		// .pipe(notify({ message: 'Scripts task complete' }))
});

gulp.task('cleanup', function() {
	var cssFile = 'assets/css',
		jsFile = 'assets/js',
		filesToDelete = [];
	if (fs.existsSync(cssFile)) { filesToDelete.push(cssFile) };
	if (fs.existsSync(jsFile)) { filesToDelete.push(jsFile) };
	return del(filesToDelete);
});

gulp.task('default', ['cleanup', 'serve']);

gulp.task('watch', function() {
	gulp.watch('src/styles/**/*.scss', ['sass']);
	gulp.watch('src/js/**/*.js', ['js']);
});