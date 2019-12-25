module.exports = function () {
  $.gulp.task('new-year', () => {
    return $.gulp.src('./dev/static/new-year/**/*.*')
      .pipe($.gulp.dest('./build/static/new-year/'));
  });
};