const autoprefixer = require('autoprefixer');
const spawn = require('child_process').spawn;
const cssnano = require('cssnano');
const browsersync = require('browser-sync');
const gulp = require('gulp');
const concat = require('gulp-concat');
const postCss = require('gulp-postcss');
const responsive = require('gulp-responsive');
const sass = require('gulp-sass');
const hugoBin = require('hugo-bin');
const merge = require('merge-stream');
const resolveImports = require('postcss-import-url');

const files = {
    css: 'static/css/main.sass',
    externalCss: [
        'node_modules/normalize.css/normalize.css',
        'themes/coder/static/css/style.min.css',
    ],
    postHeros: 'static/images/**/*3x2-shot.{jpg,png}',
    site: [
        'content/**/*',
        'layouts/**/*.html',
    ],
};

const bsync = browsersync.create();

gulp.task('css', () => {
    const cssFiles = gulp.src(files.externalCss);
    const sassFiles = gulp.src(files.css)
        .pipe(sass());

    return merge(cssFiles, sassFiles)
        .pipe(concat('css/main.css'))
        .pipe(postCss([
            resolveImports(),
            autoprefixer({ browsers: ['last 1 version'] }),
            cssnano(),
        ]))
        .pipe(gulp.dest('public'))
        .pipe(bsync.stream());
});

gulp.task('hugo', (cb) => {
    process.env.NODE_ENV = 'development';

    return spawn(hugoBin, [], { stdio: 'inherit' }).on('close', (code) => {
        if (code === 0) {
            bsync.reload();
            cb();
        } else {
            bsync.notify("Hugo build failed :(");
            cb("Hugo build failed");
        }
    });
});

gulp.task('imgs', () => {
    return gulp.src(files.postHeros, { base: '.' })
        .pipe(responsive({
            '**/*.{jpg,png}': [{
                width: 300,
            }, {
                width: 600,
                rename: { suffix: '@2x' },
            }, {
                width: 900,
                rename: { suffix: '@3x' },
            }],
        }, {
            quality: 70,
            withMetadata: false,
        }))
        .pipe(gulp.dest('public'))
        .pipe(bsync.stream());
});

gulp.task('all', gulp.parallel('css', 'imgs', 'hugo'));

gulp.task('watch', gulp.series(gulp.task('all'), () => {
    bsync.init({
        ui: false,
        open: false,
        server: {
            baseDir: 'public'
        }
    });

    gulp.watch(files.css, gulp.task('css'));
    gulp.watch(files.postHeros, gulp.task('imgs'));
    gulp.watch(files.site, gulp.task('hugo'));
}));
