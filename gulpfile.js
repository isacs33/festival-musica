const { src, dest, watch, parallel } = require("gulp");

// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

// Imagenes
const webp = require("gulp-webp");

function css(done) {
  src("src/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(dest("build/css"));
  done();
}

function versionwebp(done) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}").pipe(webp(opciones)).pipe(dest("build/img"));
  done();
}

function dev(done) {
  watch("src/scss/**/*.scss", css);
  done();
}

exports.css = css;
exports.versionwebp = versionwebp;
exports.dev = parallel(versionwebp, dev);
