var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint');

gulp.task('lint', function () {
    gulp.src('./*.js')
        .pipe(jshint());
});

gulp.task('start', function () {
    nodemon({script: 'server.js'})
        .on('change' ['lint'])
        .on('restart', function () {
            console.log('[gulp]', '[nodemon]', 'restart');
        })
});