import gulp from "gulp";
import svgSprite from "gulp-svg-sprite";
import rimraf from "rimraf";
const { series, src, dest } = gulp;

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
    meta: "./src/a11y-meta.yml",
    dest: "../src/svgs/",
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

function copyMigrations() {
  return src(["./migrations/migration.json", "./migrations/package.json"]).pipe(
    dest("build/migrations")
  );
}

const build = series(clean, buildSvgSprites);
export { clean, build, copyMigrations };
