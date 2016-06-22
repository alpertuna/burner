var gulp = require('gulp');
var less = require('gulp-less');
//Compile less
gulp.task('compile-less', function(){
    gulp.src('less/style.less')
    .pipe(less())
    .pipe(gulp.dest('dist/'));
});
//Watch less
gulp.task('watch-less', function(){
    gulp.watch('less/**/*.less' , ['compile-less']);
});
//Main less watcher task
gulp.task('less', ['compile-less', 'watch-less']);
