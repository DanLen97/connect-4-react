import gulp from 'gulp';
import gulpRename from 'gulp-rename';

export default () => gulp.src('./build/release.wasm')
  .pipe(gulpRename('api.wasm'))
  .pipe(gulp.dest('../app/public'));