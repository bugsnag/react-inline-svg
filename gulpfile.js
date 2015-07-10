const path = require('path');
const manifest = require('./package.json');
const mainFile = manifest.main;
const destinationFolder = path.dirname(mainFile);
const exportFileName = path.basename(mainFile);

var gulp = require('gulp');
var rimraf = require('rimraf');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('clean', function(cb) {
  rimraf(destinationFolder, cb);
});

gulp.task('default', function () {
    return gulp.src('src/*')
        .pipe(concat(exportFileName))
        .pipe(babel())
        .pipe(gulp.dest(destinationFolder));
});
