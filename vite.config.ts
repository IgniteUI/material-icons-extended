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
                {
                    filename: 'styles/sprite.styl',
                    lang: 'styl',
                },
            ],
        }),
        dts({
            insertTypesEntry: true,
        }),
        viteStaticCopy({
            targets: [
                {
                    src: 'migrations/migration.json',
                    dest: 'migrations',
                },
                {
                    src: 'migrations/package.json',
                    dest: 'migrations',
                },
                {
                    src: 'README.md',
                    dest: './',
                },
                {
                    src: 'LICENSE',
                    dest: './',
                },
                {
                    src: '_package.json',
                    rename: 'package.json',
                    dest: './',
                },
            ],
        }),
    ],
    build: {
        sourcemap: false,
        lib: {
            name: 'material-icons-extended',
            entry: [
                'src/index.ts',
                'src/construction.ts',
                'src/content.ts',
                'src/editor.ts',
                'src/election.ts',
                'src/finance.ts',
                'src/health.ts',
                'src/logos.ts',
                'src/programming.ts',
                'src/socialMedia.ts',
            ],
            formats: ['es'],
        },
        rollupOptions: {
            output: {
                preserveModules: true
            }
        }
    },
});
