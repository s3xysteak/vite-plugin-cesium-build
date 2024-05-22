import type { Plugin } from 'vite'
import { consola } from 'consola'

import { viteExternalsPlugin } from 'vite-plugin-externals'

import { type BuildCesiumOptions, copyCesium, importCesium, resolveOptions, setBaseUrl } from './core'

function pluginEntry(pluginOptions?: Partial<BuildCesiumOptions>): Plugin[] {
  const options = resolveOptions(pluginOptions, 'node_modules/cesium/Build/Cesium')

  consola.info(`[vite-plugin-cesium-build]: The warning message like: \`Sourcemap for "..." points to missing source files\` is expected and is a bug in \`Cesium\'s IIFE\`. You can ignore it. See the @link \`https://github.com/CesiumGS/cesium/issues/11993\` for details.`)

  return [
    viteExternalsPlugin({ cesium: 'Cesium' }),
    ...copyCesium(
      options,
      ['Assets', 'ThirdParty', 'Widgets', 'Workers'],
      {
        src: `${options.from}/Cesium.js`,
        dest: `${options.to}/`,
      },
    ),

    importCesium(base => `${base}${options.from}Unminified/Cesium.js`, 'serve'),
    importCesium(base => `${base}${options.to}/Cesium.js`, 'build'),

    setBaseUrl(options),
  ]
}

export default pluginEntry
