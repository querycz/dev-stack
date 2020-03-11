// Gulp Vars
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
// var babel = require('gulp-babel');
var rename = require('gulp-rename');
var md5 = require('gulp-md5-assets');
var wppot = require('gulp-wp-pot');
var browserSync = require('browser-sync').create();



// Notify Messages
var onError = function (error) {
	notify({
		title: 'Gulp Task Error',
		message: 'Check the console'
	}).write(error);
	console.log(error.toString());
	this.emit('end');
}



// Compile JavaScript to Public Folder and Uglify Them
gulp.task('javascript', gulp.series(function () {
	return gulp.src('js/*.js')
		.pipe(plumber({ errorHandle: onError }))

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



// Copy JavaScript Vendor Components to Public Folder and Uglify Them
gulp.task('javascript-vendor', gulp.series(function () {
	return gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/swiper/js/swiper.min.js',
		'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
		'node_modules/node-waves/dist/waves.js',
		'node_modules/smooth-scroll/dist/smooth-scroll.min.js',
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
		.pipe(browserSync.stream({ once: true }));
}));



// Compile SASS and Autoprefix to CSS
gulp.task('style', gulp.series(function () {
	return gulp.src('scss/**/*.scss')
		.pipe(plumber({ errorHandle: onError }))
		.pipe(sass({ outputStyle: 'compressed' }))
		.on('error', onError)
		.pipe(rename({
			suffix: '.min',
			dirname: ''
		}))
		.pipe(gulp.dest('../public/css'))

		// Autoprefixer
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(gulp.dest('../public/css/'))

		// Notify
		.pipe(notify({
			title: 'Gulp Task Complete',
			message: 'Styles have been compiled',
			onLast: true
		}))

		// browserSync
		.pipe(browserSync.stream({ once: true }));
}));



// MD5 Hash
gulp.task('md5-style', gulp.parallel(function () {
	return gulp.src('../public/css/*')
		.pipe(md5(10, '../*.php'))
		.pipe(md5(10, '../functions/add-style.php'))
		.pipe(md5(10, '../page-templates/**/*.php'))
		.pipe(md5(10, '../template-parts/**/*.php'));
}));

gulp.task('md5-javascript', gulp.parallel(function () {
	return gulp.src('../public/js/**/*')
		.pipe(md5(10, '../functions/add-script.php'));
}));



// POT Translation
gulp.task('pot', gulp.series(function () {
	return gulp.src('../**/*.php')
		.pipe(wppot({
			domain: 'template'
		}))
		.pipe(gulp.dest('../../../languages/themes/template.pot'));
}));



// BrowserSync
gulp.task('browser-sync', gulp.series(function () {
	browserSync.init({
		notify: false,
		proxy: "http://localhost:8080",
		// reloadDebounce: 2000
	})
}));



// Build All
gulp.task('build', gulp.series('style', 'javascript-vendor', 'javascript', 'md5-style', 'md5-javascript'));



// Watch
gulp.task('watch', gulp.series(function () {
	gulp.watch('scss/**/*.scss', gulp.series('style'));
	gulp.watch('js/**/*.js', gulp.series(['javascript', 'javascript-vendor']));
	gulp.watch('../**/*.php').on('change', browserSync.reload);
}));



// Default
gulp.task('default', gulp.parallel('browser-sync', 'watch'));
