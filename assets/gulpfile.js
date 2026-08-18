import gulp         from 'gulp';
import less         from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps   from 'gulp-sourcemaps';
import concat       from 'gulp-concat';
import cleanCSS     from 'gulp-clean-css';

const paths = {
  less:        './less/style.less',
  lessWatch:   './less/**/*.less',
  blocksLess:  './less/blocks/*.less',
  blocksWatch: './less/blocks/**/*.less',
  css:         './css/',
  blocksCss:   '../blocks/',
};

export const compileLess = () =>
  gulp.src( paths.less )
    .pipe( sourcemaps.init() )
    .pipe( less() )
    .pipe( autoprefixer({ overrideBrowserslist: [ 'last 2 versions' ], cascade: false }) )
    .pipe( concat( 'styles.css' ) )
    .pipe( cleanCSS({
      level: {
        1: {
          specialComments: 0
        },
        2: {
          mergeMedia: true
        }
      }
    }) )
    .pipe( sourcemaps.write( '.' ) )
    .pipe( gulp.dest( paths.css ) );

export const compileBlocksLess = () =>
  gulp.src( paths.blocksLess )
    .pipe( sourcemaps.init() )
    .pipe( less() )
    .pipe( autoprefixer({ overrideBrowserslist: [ 'last 2 versions' ], cascade: false }) )
    .pipe( concat( 'blocks.css' ) )
    .pipe( cleanCSS({
      level: {
        1: {
          specialComments: 0
        },
        2: {
          mergeMedia: true
        }
      }
    }) )
    .pipe( sourcemaps.write( '.' ) )
    .pipe( gulp.dest( paths.blocksCss ) );

const watchFiles = () => {
  gulp.watch( paths.lessWatch,   compileLess );
  gulp.watch( paths.blocksWatch, compileBlocksLess );
};

export const build = gulp.parallel( compileLess, compileBlocksLess );

const dev = gulp.series( build, watchFiles );

export default dev;
