import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';
import svgSpriteMap from '@spiriit/vite-plugin-svg-spritemap';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgLoader({
        defaultImport: 'raw',
        svgo: false,
    }),
    svgSpriteMap(
        './.tmp/svgs/*.svg', 
        {
            prefix: 'imx-',
            output: {
                filename: 'sprite.symbol.svg',
                view: false
            },
            styles: [{ 
                filename: 'styles/sprite.css', 
                lang: 'css'
            }, { 
                filename: 'styles/sprite.scss', 
                lang: 'scss'
            }, {
                filename: 'styles/sprite.less', 
                lang: 'less'
            }],
        }
    )
  ],
  build: {
    lib: {
      entry: ['src/index.ts', 'src/content.ts'],
      formats: ['es'],
    }
  },
});

