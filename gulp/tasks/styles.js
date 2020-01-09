let plumber = require('gulp-plumber'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    csscomb = require('gulp-csscomb'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    stylesPATH = {
        "input": "./dev/static/styles/",
        "ouput": "./build/static/css/"
    };

module.exports = function () {
    $.gulp.task('styles:dev', () => {
        return $.gulp.src(stylesPATH.input + 'styles.scss')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(scss())
            .pipe(autoprefixer({
                overrideBrowserslist: ['last 8 version']
            }))
            //минификация
            .pipe(
                cleanCSS({
                    level: 2
                })
            )
            .pipe(rename('styles.min.css'))
            .pipe(sourcemaps.write())
            .pipe($.gulp.dest(stylesPATH.ouput))
            .on('end', $.browserSync.reload);
    });
    $.gulp.task('styles:build', () => {
        return $.gulp.src(stylesPATH.input + 'styles.scss')
            .pipe(scss())
            .pipe(autoprefixer({
                overrideBrowserslist: ['last 8 version']
            }))
            .pipe(csscomb())
            .pipe($.gulp.dest(stylesPATH.ouput))
    });
    $.gulp.task('styles:build-min', () => {
        return $.gulp.src(stylesPATH.input + 'styles.scss')
            .pipe(scss())
            .pipe(autoprefixer({
                overrideBrowserslist: ['last 8 version']
            }))
            .pipe(csscomb())
            .pipe(csso())
            .pipe(cleanCSS({
                level: 2
            }))
            .pipe(rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.ouput))
    });
};