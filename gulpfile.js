const gulp = require('gulp');
const inject = require('gulp-inject');
const wiredep = require('wiredep').stream;
const browserSync = require('browser-sync');

/* injects the files that you create */
gulp.task('inject', ['inject:bower'], function() {
	var sources = gulp.src([
		'./src/app/*.module.js',
		'./src/app/**/*.module.js',
		'./src/app/**/*.js',
		'./src/app/**/*.css'
	]);

    return gulp.src('./src/index.html')
        .pipe(inject(sources, { relative: true }))
        .pipe(gulp.dest('./src/'));
});

/* injects your bower dependencies */
gulp.task('inject:bower', function() {
    return gulp.src('./src/index.html')
        .pipe(wiredep())
        .pipe(gulp.dest('./src/'));
});

/* watches for changes made to your files */
gulp.task('watch', function() {
    return gulp
        .watch('./src/**/*', ['reload']);
});

/* reloads the browser */
gulp.task('reload', function() {
    return browserSync.reload();
})

/* starts a browser-sync server */
gulp.task('serve', ['inject', 'watch'], function() {
    return browserSync.init({
        server: './src'
    })
});
