import type { Options, UserOptions } from '../types'

export const createOptions = (options: UserOptions = {}): Options => {
  const prefix: Options['prefix'] = options.prefix || 'sprite-'

  //Default options
  let svgo: Options['svgo'] = {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
            removeEmptyAttrs: false,
            moveGroupAttrsToElems: false,
            collapseGroups: false,
            cleanupIds: {
              preservePrefixes: [prefix]
            }
          }
        }
      }
    ]
  }
  if (typeof options.svgo === 'object' || options.svgo === false) {
    svgo = options.svgo
  }

  const styles: Options['styles'] = []
  const stylesLang = ['css', 'scss', 'less', 'styl']

  if (Array.isArray(options.styles)) {
    options.styles.forEach(({ filename, lang }) => {
      if (
        typeof filename === 'string' &&
        typeof lang === 'string' &&
        stylesLang.includes(lang)
      ) {
        styles.push({
          filename,
          lang
        })
      }
    })
  }
  // if (typeof options.styles === 'string') {
  //   let lang = options.styles.split('.').pop() as StylesLang | undefined
  //   const stylesLang = ['css', 'scss', 'less', 'styl']
  //
  //   if (typeof lang === 'undefined' || !stylesLang.includes(lang)) {
  //     lang = 'css'
  //     console.warn(
  //       '[vite-plugin-spritemap]',
  //       'Invalid styles lang, fallback to css'
  //     )
  //   }
  //
  //   styles = {
  //     filename: options.styles,
  //     lang
  //   }
  // } else if (
  //   typeof options.styles === 'object' &&
  //   typeof options.styles.filename === 'string' &&
  //   typeof options.styles.lang === 'string' &&
  //   stylesLang.includes(options.styles.lang)
  // ) {
  //   styles = {
  //     filename: options.styles.filename,
  //     lang: options.styles.lang
  //   }
  // }

  let output: Options['output'] = {
    filename: '[name].[hash][extname]',
    use: true,
    view: true
  }
  if (options.output === false) {
    output = false
  } else if (typeof options.output === 'string') {
    output = {
      filename: options.output,
      use: true,
      view: true
    }
  } else if (typeof options.output === 'object') {
    output = {
      filename: options.output.filename,
      use:
        typeof options.output.use !== 'undefined' ? options.output.use : true,
      view:
        typeof options.output.view !== 'undefined' ? options.output.view : true
    }
  }

  return {
    svgo,
    output,
    prefix,
    styles
  } as Options
}
