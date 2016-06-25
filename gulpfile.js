var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
//Compile less
gulp.task('compile-less', function(){
    gulp.src('less/style.less')
    .pipe(less())
    .pipe(rename('burner.css'))
    .pipe(gulp.dest('dist/'));
});
//Watch less
gulp.task('watch-less', function(){
    gulp.watch('less/**/*.less' , ['compile-less']);
});
//Main less watcher task
gulp.task('less', ['compile-less', 'watch-less']);
