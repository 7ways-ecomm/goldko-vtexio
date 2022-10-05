const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

function mount() {
    return gulp.src('./styles/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({cascade: true, }))
        // .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./styles/css'));
}

function watch() {
    gulp.watch('./styles/scss/*.scss', mount);
    // gulp.watch(cleanCSS({compatibility: 'ie8'}));
    gulp.watch('./styles/scss/**/*.scss', mount);
}

exports.watch = watch;
exports.mount = mount;

