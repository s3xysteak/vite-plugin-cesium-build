import type { Plugin } from 'vite'

import { viteExternalsPlugin } from 'vite-plugin-externals'

import { type BuildCesiumOptions, copyCesium, importCesium, resolveOptions, setBaseUrl } from '.'

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
