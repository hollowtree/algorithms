let browserSync = require('browser-sync');
let gulp = require('gulp');
// let less = require('gulp-less');

let reload = browserSync.reload;

let rootPath = __dirname + '/';

gulp.task('serve', () => {
    browserSync({
        server: {
            baseDir: './'
        }
    });
    gulp.watch(['*.*'], reload);
});

// gulp.task('buildLess', () => {
//     gulp.src(rootPath+'less/*.less')
//         .pipe(less())
//         .pipe(gulp.dest(rootPath + 'css'));
// });

// gulp.task('watchFiles', () => {
//     gulp.watch(rootPath + 'less/*.less', ['buildLess'])

// });

gulp.task('default', [
    'serve',
    // 'watchFiles'
]);