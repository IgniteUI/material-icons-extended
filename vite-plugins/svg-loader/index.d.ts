declare module 'svg-loader' {
  import { Plugin } from 'vite';
  import { Config } from 'svgo';
  function svgLoader(options?: {
    a11yMetaPath: string;
    svgoConfig?: Config;
    svgo?: boolean;
  }): Plugin;
  export default svgLoader;
}

declare module '*.svg?url' {
  const src: string;
  export default src;
}

declare module '*.svg?raw' {
  const src: string;
  export default src;
}
