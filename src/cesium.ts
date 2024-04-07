import type { Plugin } from 'vite'

import { viteExternalsPlugin } from 'vite-plugin-externals'

import { setBaseUrl } from './core/setBaseUrl'
import { importCesium } from './core/importCesium'
import { type BuildCesiumOptions, resolveOptions } from './core/resolveOptions'
import { copyCesium } from './core/copyCesium'

function pluginEntry(pluginOptions?: Partial<BuildCesiumOptions>): Plugin[] {
  const options = resolveOptions(pluginOptions, 'node_modules/cesium/Build/Cesium')

  return [
    viteExternalsPlugin(
      { cesium: 'Cesium' },
      {
        disableInServe: true,
      },
    ),
    ...copyCesium(
      options,
      ['Assets', 'ThirdParty', 'Widgets', 'Workers'],
      {
        src: `${options.from}/Cesium.js`,
        dest: `${options.to}/`,
      },
    ),
    importCesium(options),
    setBaseUrl(options),
  ]
}

export default pluginEntry
