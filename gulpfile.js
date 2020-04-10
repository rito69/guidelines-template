const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const cache = require('gulp-cached');
const progeny = require('gulp-progeny');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');

// Directory settings
const dir = {
  src: '_src',
  dist: 'dist'
};

//scss
function scss() {
  return gulp
    .src([dir.src + '/**/_sass/*.scss'])
    .pipe(
      plumber({
        errorHandler: function(error) {
          console.log(error.message);
          this.emit('end');
        }
      })
    )
    .pipe(cache('sass'))
    .pipe(progeny())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer({ grid: true }))
    .pipe(gcmq())
    .pipe(
      cleanCSS({
        level: {
          1: { optimizeFontWeight: false },
        },
      })
    )
    .pipe(
      rename(function(path) {
        path.dirname = path.dirname.replace('_sass', 'styles');
      })
    )
    .pipe(gulp.dest(dir.src));
}

// browser-sync
function buildserver(done) {
  browserSync.init({
    server: {
      baseDir: './_src/'
    }
  });
  done();
}

// browser-sync reload
function reloadbrowser(done) {
  browserSync.reload();
  done();
}

//watch
function watch() {
  gulp.watch(dir.src + '/**/*.html', reloadbrowser);
  gulp.watch(dir.src + '/**/*.css', reloadbrowser);
  gulp.watch(dir.src + '/**/*.scss', scss);
}

//Execution
exports.scss = scss;
exports.watch = watch;
exports.buildserver = buildserver;
exports.default = gulp.series(gulp.parallel(scss), gulp.parallel(buildserver, watch));
