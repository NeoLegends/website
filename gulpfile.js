const autoprefixer = require('autoprefixer');
const spawn = require('child_process').spawn;
const cssnano = require('cssnano');
const browsersync = require('browser-sync');
const gulp = require('gulp');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
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
    dest: './public',
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
        .pipe(gulp.dest(files.dest))
        .pipe(bsync.stream());
});

gulp.task('hugo-build', (cb) => {
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

gulp.task('hugo-compress', () => {
    return gulp.src(`${files.dest}/**/*.html`)
        .pipe(htmlmin({
            collapseWhitespace: true,
            sortAttributes: true,
            sortClassName: true,
        }))
        .pipe(gulp.dest(files.dest));
})

gulp.task('hugo', gulp.series('hugo-build', 'hugo-compress'));

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
        .pipe(gulp.dest(files.dest))
        .pipe(bsync.stream());
});

gulp.task('all', gulp.parallel('css', 'imgs', 'hugo'));

gulp.task('watch-setup', () => {
    bsync.init({
        ui: false,
        open: false,
        server: {
            baseDir: files.dest
        }
    });

    gulp.watch(files.css, gulp.task('css'));
    gulp.watch(files.postHeros, gulp.task('imgs'));
    gulp.watch(files.site, gulp.task('hugo'));
});

gulp.task('watch', gulp.series('all', 'watch-setup'));
