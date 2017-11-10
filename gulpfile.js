const gulp = require('gulp');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');

gulp.task('default', function() {
  gulp.src('public/src/app.js')
    .pipe(webpack({
      "output": {
        "filename": "bundle.js"
      }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'));
});
