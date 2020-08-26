const { series, src, dest } = require("gulp");
const svgSprite = require("gulp-svg-sprite");
const rimraf = require("rimraf");

const spritesConfig = {
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
  },
  svg: {
    xmlDeclaration: false,
  },
  mode: {
    css: {
      bust: true,
      prefix: ".imx-%s",
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
      dimensions: true,
      dest: "symbol",
    },
  },
};

function cleanBuild(cb) {
  return rimraf("./build", {}, cb);
}

function cleanSprites(cb) {
  return rimraf("./sprites", {}, cb);
}

const clean = series(cleanBuild, cleanSprites);

function buildSvgSprites() {
  return src("**/*.svg", { cwd: "src/svgs" })
    .pipe(svgSprite(spritesConfig))
    .pipe(dest("sprites"));
}

exports.build = series(clean, buildSvgSprites);
