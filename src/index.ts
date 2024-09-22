import type { Plugin } from 'vite'

import { viteExternalsPlugin } from 'vite-plugin-externals'

import { type BuildCesiumOptions, copyCesium, importCesium, importCss, resolveOptions, setBaseUrl } from './core'

function pluginEntry(pluginOptions?: Partial<BuildCesiumOptions>): Plugin[] {
  const options = resolveOptions(pluginOptions, 'node_modules/cesium/Build/Cesium')

  const customCopyList = [
    {
      src: `${options.from}/Cesium.js`,
      dest: `${options.to}/`,
    },
  ]
  if (options.css) {
    customCopyList.push({
      src: `${options.from}/Widgets/widgets.css`,
      dest: `${options.to}/Widgets/`,
    })
  }

  return [
    viteExternalsPlugin({ cesium: 'Cesium' }),
    ...copyCesium(
      options,
      ['Assets', 'ThirdParty', 'Widgets', 'Workers'],
      customCopyList,
    ),

    importCesium(base => `${base}${options.from}Unminified/Cesium.js`, 'serve'),
    importCesium(base => `${base}${options.to}/Cesium.js`, 'build'),

    ...options.css
      ? [
          importCss(options, base => `${base}${options.from}/Widgets/widgets.css`, 'serve'),
          importCss(options, base => `${base}${options.to}/Widgets/widgets.css`, 'build'),
        ]
      : [],

    setBaseUrl(options),
  ]
}

export default pluginEntry
