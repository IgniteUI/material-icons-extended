import { Plugin } from 'vite';
import { Config } from 'svgo';

type Pattern = string[] | string;
type StylesLang = 'less' | 'scss' | 'styl' | 'css';
interface UserOptions {
    svgo?: boolean | Config;
    output?: {
        filename: string;
        use?: boolean;
        view?: boolean;
    } | string | boolean;
    prefix?: string;
    styles?: {
        filename: string;
        lang?: StylesLang;
    }[] | string | false;
}

declare function VitePluginSvgSpritemap(iconsPattern: Pattern, options?: UserOptions): Plugin[];

export { VitePluginSvgSpritemap as default };
