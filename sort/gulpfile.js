let browserSync = require('browser-sync');
let gulp = require('gulp');

let reload = browserSync.reload;

let rootPath = __dirname + '/app/';

gulp.task('serve', () => {
    browserSync({
        server: {
            baseDir: '.'
        }
    });
    gulp.watch(['*.html', 'css/*.css', 'js/*.js'], { cwd: './' }, reload);
});

gulp.task('default', [
    'serve'
]);