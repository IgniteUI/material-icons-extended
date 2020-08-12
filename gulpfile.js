const { series, src, dest } = require("gulp");
const svgSprite = require("gulp-svg-sprite");
const svgmin = require("gulp-svgmin");
const rimraf = require("rimraf");

const spritesConfig = {
  dest: "test",
  shape: {
    id: {
      separator: "__",
      whitespace: "-",
    },
    dimension: {
      maxWidth: 512,
      maxHeight: 512,
    },
    spacing: {
      padding: 0,
      box: "icon",
    },
    transform: [
      {
        svgo: {
          plugins: [{ removeViewBox: false }, { removeDimensions: true }],
        },
      },
    ],
    dest: "../svgs",
  },
  svg: {
    xmlDeclaration: false,
  },
  mode: {
    css: {
      bust: true,
      prefix: ".imx-%s",
      example: true,
      dimensions: false,
      layout: "horizontal",
      common: "imx-icon",
      mixin: "imx-icon",
      render: {
        css: true,
        less: true,
        scss: {
          dest: "_sprite.scss",
        },
      },
      dest: "styles",
    },
    symbol: {
      example: true,
      dimensions: true,
      dest: "symbol",
    },
  },
};

function cleanBuild(cb) {
  return rimraf("./build", {}, cb);
}

function cleanSvgs(cb) {
  return rimraf("./svgs", {}, cb);
}

function cleanSprites(cb) {
  return rimraf("./sprites", {}, cb);
}

const clean = series(cleanSvgs, cleanBuild, cleanSprites);

function buildSvg() {
  return src("**/*.svg", { cwd: "src/svgs" })
    .pipe(svgSprite(spritesConfig))
    .pipe(dest("sprites"));
}

function optimizeSvgs() {
  return src("svgs/*.svg")
    .pipe(
      svgmin({
        plugins: [
          {
            removeViewBox: false,
          },
          {
            removeDimensions: true,
          },
        ],
      })
    )
    .pipe(dest("svgs"));
}

exports.build = series(clean, buildSvg, optimizeSvgs);
