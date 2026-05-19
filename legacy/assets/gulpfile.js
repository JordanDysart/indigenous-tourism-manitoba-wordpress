import gulp from 'gulp';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';

const paths = {
  less: ['./less/**/*.less', '!./less/blocks/**/*.less'],
  blocksLess: './less/blocks/*.less',
  blocksWatch: './less/blocks/**/*.less',
  css: './css/',
  blocksCss: '../blocks/'
};

const compileLess = () => {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.css));
};

const compileBlocksLess = () => {
  return gulp.src(paths.blocksLess)
    .pipe(less())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('blocks.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.blocksCss));
};

const watchFiles = () => {
  gulp.watch(paths.less, compileLess);
  gulp.watch(paths.blocksWatch, compileBlocksLess);
};

const build = gulp.series(gulp.parallel(compileLess, compileBlocksLess), watchFiles);

export default build;
