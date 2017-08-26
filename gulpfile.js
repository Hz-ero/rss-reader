var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

//这个可以让express启动
gulp.task("node", function () {
    nodemon({
        script: './server',
        ext: 'js html',
        env: {
            'NODE_ENV': 'development'
        }
    })
});


gulp.task('server', ["node"], function () {
    var files = [
        'views/**/*.html',
        'views/**/*.ejs',
        'views/**/*.jade',
        'build/*.*'
    ];

    browserSync.init(files, {
        // 注意：这里的端口要与express项目中bin/www设置的port一致
        proxy: 'http://localhost:3000',
        browser: 'chrome',
        notify: false,
        port: 3001
    });

    gulp.watch(files).on("change", reload);
});