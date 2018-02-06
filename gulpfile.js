var gulp = require('gulp');
var sass = require('gulp-sass');
//Задача для сборки
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
//Задача, после запуска которой, gulp будет следить за изменениями файлов
gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});