import { join } from 'path'
import type { Plugin, ResolvedConfig } from 'vite'
import type { Options, Pattern } from '../types'
import { getFileName } from '../helpers/filename'
import { SVGManager } from '../svgManager'

export function BuildPlugin(iconsPattern: Pattern, options: Options): Plugin {
  let config: ResolvedConfig
  let fileName: string
  let filePath: string
  let svgManager: SVGManager
  let stylesheets: Map<string, string> | undefined

  return <Plugin>{
    name: 'vite-plugin-svg-spritemap:build',
    apply: 'build',
    configResolved(_config) {
      config = _config
      svgManager = new SVGManager(iconsPattern, options)
    },
    async buildStart() {
      await svgManager.updateAll()
      stylesheets = await svgManager.createFileStyle()

      if (typeof options.output === 'object') {
        fileName = getFileName(
          options.output.filename,
          'spritemap',
          svgManager.spritemap,
          'svg'
        )
        filePath = join(config.build.assetsDir, fileName)
      }
    },
    transform(code) {
      return code.replace(/__spritemap/g, filePath)
    },
    generateBundle(_, bundle) {
      if (typeof options.output === 'object') {
        bundle[fileName] = {
          needsCodeReference: false,
          name: fileName,
          source: svgManager.spritemap,
          type: 'asset',
          fileName: filePath
        }
      }

      if (stylesheets) {
        for (const [filename, content] of stylesheets) {
          bundle[filename] = {
            needsCodeReference: false,
            name: filename,
            source: content,
            type: 'asset',
            fileName: filename
          }
        }
      }
    }
  }
}
