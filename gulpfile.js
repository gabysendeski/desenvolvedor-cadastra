const path = require("path");

const { series, src, dest, parallel, watch } = require("gulp");
const webpack = require("webpack");
const del = require("del");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

const webpackConfig = require("./webpack.config.js");

const paths = {
  scripts: {
    src: "src/ts/index.tsx",
    watch: "src/ts/**/*.{ts,tsx}",
  },
  styles: {
    src: "src/scss/main.scss",
  },
  img: {
    src: "src/img/**/*",
  },
  html: {
    src: "src/index.html",
  },
  dest: "dist",
  temp: ".tmp",
};

function clean() {
  return del([paths.dest, paths.temp]);
}

function server() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    port: 3000,
    open: true,
    notify: false,
  });
}

function styles() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest(paths.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return new Promise((resolve, reject) =>
    webpack(webpackConfig(paths), (err, stats) => {
      if (err) {
        console.log("Webpack Error:", err);
        reject(err);
        return;
      }

      if (stats.hasErrors()) {
        console.log("Webpack Stats Errors:", stats.toJson().errors);
        reject(new Error("Webpack compilation errors"));
        return;
      }

      console.log(
        stats.toString({
          all: false,
          modules: true,
          maxModules: 0,
          errors: true,
          warnings: true,
          moduleTrace: true,
          errorDetails: true,
          colors: true,
          chunks: true,
        })
      );

      resolve();
    })
  );
}

function html() {
  return src(paths.html.src).pipe(dest(paths.dest)).pipe(browserSync.stream());
}

// ✅ FUNÇÃO DE IMAGENS SIMPLES - SEMPRE FUNCIONA
function img() {
  console.log("📸 Copying images to dist/img...");
  return src(paths.img.src)
    .pipe(dest(paths.dest + "/img"))
    .pipe(browserSync.stream());
}

function watchFiles() {
  watch(paths.scripts.watch, { ignoreInitial: false }, series(scripts))
    .on("change", (path) => {
      console.log(`File ${path} was changed`);
      browserSync.reload();
    })
    .on("error", (err) => {
      console.error("Watch error:", err);
    });

  watch(paths.styles.src, { ignoreInitial: false }, styles);
  watch(paths.img.src, { ignoreInitial: false }, img);
  watch(paths.html.src, { ignoreInitial: false }, series(html)).on(
    "change",
    browserSync.reload
  );
}

const build = series(clean, parallel(styles, scripts, html, img));

const dev = series(build, parallel(watchFiles, server));

exports.build = build;
exports.server = server;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.img = img;
exports.clean = clean;
exports.watch = watchFiles;
exports.default = dev;
