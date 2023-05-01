const { src, dest, series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync');
const del = require('del');
// для html
const htmlmin = require('gulp-htmlmin');
// для scss
const sass = require('gulp-sass')(require('sass'));
const autoPrefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
// для js
const webpackStream = require('webpack-stream');
// для картинок
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const gulpIf = require('gulp-if');

// проверка режима разработка/продакшн
const isDev = !process.argv.includes('--build');
const isBuild = process.argv.includes('--build');

function copy() {
  return src('src/fonts/**/*')
  .pipe(dest('dist/fonts'))
}

function html() {
	return src('src/**.html')
		.pipe(htmlmin({ collapseWhitespace: true, removeComments: true, }))
		.pipe(dest('dist'));
};

function scss() {
	return src('src/scss/*.scss')
		.pipe(sass())
		.pipe(gulpIf(isBuild, autoPrefixer({ grid: true })))
		.pipe(gulpIf(isBuild,
			cleanCss({ level: { 2: { specialComments: 0 } } })))
		.pipe(concat('style.min.css'))
		.pipe(dest('dist/css'));
};

function js() {
	return src('src/js/app.js')
		.pipe(webpackStream({
			mode: isBuild ? 'production' : 'development',
			output: { filename: 'app.min.js' }
		}))
		.pipe(dest('dist/js'))
};

function images() {
	return src('src/img/**/*.{jpg,jpeg,png,gif,webp}')
		.pipe(newer('dist/img'))
		.pipe(gulpIf(isBuild, imagemin({ optimizationLevel: 3 })))
    .pipe(dest('dist/img'))
    .pipe(src('src/img/**/*.svg'))
		.pipe(dest('dist/img'))
};

function reset() {
	return del('dist');
};

function serve() {
	browserSync.init({
		server: './dist',
		notify: false,
	});

	watch("src/**/*.html", series(html)).on("change", browserSync.reload);
  watch("src/scss/**/*.scss", series(scss)).on("change", browserSync.reload);
  watch("src/js/**/*.js", series(js)).on("change", browserSync.reload);
  watch("src/img/**/*.{jpg,jpeg,png,svg,gif,webp}", series(images)).on("change", browserSync.reload);
};


const mainTasks = parallel(copy, html, scss, js, images);
exports.dev = series(reset, mainTasks, serve);
exports.build = series(reset, mainTasks);

