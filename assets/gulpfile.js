import gulp         from 'gulp';
import less         from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps   from 'gulp-sourcemaps';
import concat       from 'gulp-concat';
import cleanCSS     from 'gulp-clean-css';

const paths = {
  less:       [ './less/**/*.less', '!./less/blocks/**/*.less' ],
  blocksLess: './less/blocks/*.less',
  blocksWatch: './less/blocks/**/*.less',
  css:        './css/',
  blocksCss:  '../blocks/',
};

export const compileLess = () =>
  gulp.src( paths.less )
    .pipe( sourcemaps.init() )
    .pipe( less() )
    .pipe( autoprefixer({ overrideBrowserslist: [ 'last 2 versions' ], cascade: false }) )
    .pipe( concat( 'styles.css' ) )
    .pipe( cleanCSS() )
    .pipe( sourcemaps.write( '.' ) )
    .pipe( gulp.dest( paths.css ) );

export const compileBlocksLess = () =>
  gulp.src( paths.blocksLess )
    .pipe( sourcemaps.init() )
    .pipe( less() )
    .pipe( autoprefixer({ overrideBrowserslist: [ 'last 2 versions' ], cascade: false }) )
    .pipe( concat( 'blocks.css' ) )
    .pipe( cleanCSS() )
    .pipe( sourcemaps.write( '.' ) )
    .pipe( gulp.dest( paths.blocksCss ) );

const watchFiles = () => {
  gulp.watch( paths.less,       compileLess );
  gulp.watch( paths.blocksWatch, compileBlocksLess );
};

export const build = gulp.parallel( compileLess, compileBlocksLess );

const dev = gulp.series( build, watchFiles );

export default dev;
