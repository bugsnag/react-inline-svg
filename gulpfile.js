const fs = require('fs');
const path = require('path');
const manifest = require('./package.json');
const mainFile = manifest.main;
const destinationFolder = path.dirname(mainFile);
const exportFileName = path.basename(mainFile);

var gulp = require('gulp');
var rimraf = require('rimraf');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var wrapper = require('gulp-wrapper');
var uglify = require('gulp-uglify');

gulp.task('clean', function(cb) {
    rimraf(destinationFolder, cb);
});

gulp.task('default', function () {
    return gulp.src('src/*')
        .pipe(concat(exportFileName))
        .pipe(babel())
        .pipe(wrapper({
            header: fs.readFileSync(__dirname + '/module.header', 'utf8'),
            footer: fs.readFileSync(__dirname + '/module.footer', 'utf8')
        }))
        .pipe(uglify())
        .pipe(gulp.dest(destinationFolder));
});
