let browserSync = require('browser-sync');
let gulp = require('gulp');
// let less = require('gulp-less');

let reload = browserSync.reload;


gulp.task('serve', () => {
    browserSync({
        server: true
    });
    gulp.watch(['**/*'], reload);
});


gulp.task('default', [
    'serve',
]);