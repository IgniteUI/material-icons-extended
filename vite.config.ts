import { defineConfig } from 'vite';
import svgLoader from 'svg-loader';
import svgSpriteMap from '@spiriit/vite-plugin-svg-spritemap';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgLoader({
      a11yMetaPath: './src/a11y-meta.yml',
      svgo: true,
      svgoConfig: {
        plugins: ['removeDimensions'],
      },
    }),
    svgSpriteMap('./.tmp/svgs/*.svg', {
      prefix: 'imx-',
      output: {
        filename: 'sprite.symbol.svg',
        view: false,
      },
      styles: [
        {
          filename: 'styles/sprite.css',
          lang: 'css',
        },
        {
          filename: 'styles/sprite.scss',
          lang: 'scss',
        },
        {
          filename: 'styles/sprite.less',
          lang: 'less',
        },
      ],
    }),
    dts({
      insertTypesEntry: true,
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'migrations',
          dest: './',
        },
      ],
    }),
  ],
  build: {
    sourcemap: false,
    lib: {
      name: 'material-icons-extended',
      entry: ['src/index.ts'],
      formats: ['es'],
    },
  },
});
