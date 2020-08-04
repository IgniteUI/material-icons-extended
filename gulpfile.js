const { series, src, dest } = require("gulp");
const svgSprite = require("gulp-svg-sprite");
const rimraf = require("rimraf");

// More complex configuration example
const spritesConfig = {
  shape: {
    id: {
      separator: "__",
      whitespace: "-",
    },
    dimension: {
      // Set maximum dimensions
      maxWidth: 24,
      maxHeight: 24,
    },
    spacing: {
      // Add padding
      padding: 0,
      box: "icon",
    },
    dest: "../svgs", // Keep the intermediate files
  },
  mode: {
    view: {
      bust: true,
      prefix: ".imx-%s",
      example: true,
      dimensions: true,
      render: {
        css: true,
        less: true,
        scss: {
          dest: "_sprite.scss",
        },
      },
      dest: "styles",
    },
    symbol: false, // Activate the «symbol» mode
  },
};

function cleanBuild(cb) {
  return rimraf('./build', {}, cb);
}

function cleanSvgs(cb) {
  return rimraf('./svgs', {}, cb);
}

const clean = series(cleanSvgs, cleanBuild);

function buildSvg() {
  return src("**/*.svg", { cwd: "src/svgs" })
    .pipe(svgSprite(spritesConfig))
    .pipe(dest("build"));
}

exports.build = series(clean, buildSvg);
