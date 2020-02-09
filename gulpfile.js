// Gulp Vars
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// var babel = require('gulp-babel');
var rename = require('gulp-rename');
var md5 = require('gulp-md5-assets');
var wppot = require('gulp-wp-pot');
var browserSync = require('browser-sync').create();



// onError Message
var onError = function(error) {
	notify({
		title: 'Gulp Task Error',
		message: 'Check the console'
	}).write(error);
	console.log(error.toString());
	this.emit('end');
}



// Compile Init JavaScripts to Public Folder and Uglify Them
gulp.task('javascript', gulp.series( function() {
	return gulp.src('js/*.js')
		.pipe(plumber({errorHandle: onError}))

		// Babel
		// .pipe(babel())

		// Uglify
		.pipe(uglify())
		.on('error', onError)
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('../public/js'))

		// Notify
		.pipe(notify({
			title: 'Gulp Task Complete',
			message: 'JavaScript files have been compiled',
			onLast: true
		}))

		// browserSync
		// .pipe(browserSync.stream({once: true}));
}));



// Copy JS Components to Public Vendor Folder
gulp.task('javascript-vendor', gulp.series( function() {
	return gulp.src([
		'node_modules/jquery/dist/jquery.min.js', // jQuery
		'node_modules/swiper/js/swiper.min.js', // Swiper
		'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js', // Fancybox
		'node_modules/node-waves/dist/waves.js', // Waves
	])
		.pipe(uglify())
		.pipe(gulp.dest('../public/js/vendor'))

		// Notify
		.pipe(notify({
			title: 'Gulp Task Complete',
			message: 'JavaScript components have been copied',
			onLast: true
		}))

		// browserSync
		.pipe(browserSync.stream({once: true}));
}));



// Compile and Autoprefix SASS Global Style
gulp.task('style', gulp.series( function() {
	return gulp.src('scss/style.scss')
		.pipe(plumber({errorHandle: onError}))
		.pipe(sass({outputStyle: 'compressed'}))
		.on('error', onError)
		.pipe(rename('style.css'))
		.pipe(gulp.dest('../'))

		// Autoprefixer
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(gulp.dest('../'))

		// Notify
		.pipe(notify({
			title: 'Gulp Task Complete',
			message: 'Global style has been compiled',
			onLast: true
		}))

		// browserSync
		// .pipe(browserSync.stream({once: true}));
}));



// SASS Compile and Autoprefix Separate Components Style
gulp.task('style-components', gulp.series( function() {
	return gulp.src('scss/components/*.scss')
		.pipe(plumber({errorHandle: onError}))
		.pipe(sass({outputStyle: 'compressed'}))
		.on('error', onError)
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('../public/css/'))

		// Autoprefixer
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(gulp.dest('../public/css/'))

		// Notify
		.pipe(notify({
			title: 'Gulp Task Complete',
			message: 'Components styles have been compiled',
			onLast: true
		}))

		// browserSync
		.pipe(browserSync.stream({once: true}));
}));



// MD5 Hash
gulp.task('md5-css', gulp.parallel( function() {
	return gulp.src('../style.css')
		.pipe(md5(10, '../functions/add-style.php'));
}));

gulp.task('md5-css-components', gulp.parallel( function() {
	return gulp.src('../public/css/*')
		.pipe(md5(10, '../**/*.php'));
}));

gulp.task('md5-js', gulp.parallel( function () {
	return gulp.src('../public/js/**/*')
		.pipe(md5(10, '../functions/*.php'));
}));



// POT Translation
gulp.task('pot', gulp.series( function () {
	return gulp.src('../**/*.php')
		.pipe(wppot( {
			domain: 'template'
		} ))
		.pipe(gulp.dest('../../../languages/themes/template.pot'));
}));



// BrowserSync
gulp.task('browser-sync', gulp.series( function() {
	browserSync.init({
		notify: false,
		proxy: "http://localhost:8080",
		// reloadDebounce: 2000
	})
}));



// Watch
gulp.task('watch', gulp.series( function() {
	gulp.watch('scss/**/*.scss', gulp.series(['style', 'style-components'])); // Watch SCSS
	gulp.watch('js/**/*.js', gulp.series(['javascript', 'javascript-vendor'])); // Watch JS
	gulp.watch('../**/*.php').on('change', browserSync.reload); // Watch PHP
}));



// Build All
gulp.task('build', gulp.series('style', 'style-components', 'javascript-vendor', 'javascript', 'md5-css', 'md5-css-components', 'md5-js'));



// Default
gulp.task('default', gulp.parallel('browser-sync', 'watch'));
