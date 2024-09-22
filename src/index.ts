import type { Plugin } from 'vite'

import { viteExternalsPlugin } from 'vite-plugin-externals'
import { viteStaticCopy } from 'vite-plugin-static-copy'

import { type BuildCesiumOptions, imports, resolveOptions, setBaseUrl } from './core'

function pluginEntry(pluginOptions?: Partial<BuildCesiumOptions>): Plugin[] {
  const options = resolveOptions(pluginOptions, 'node_modules/cesium/Build/Cesium')

  return [
    // externals
    viteExternalsPlugin({ cesium: 'Cesium' }),

    // copy
    ...viteStaticCopy({
      targets: [
        // resources
        ...['Assets', 'ThirdParty', 'Widgets', 'Workers'].map(item => ({
          src: `${options.from}/${item}/*`,
          dest: `${options.to}/${item}/`,
        })),
        // Cesium.js
        {
          src: `${options.from}/Cesium.js`,
          dest: `${options.to}/`,
        },
        // css
        ...options.css
          ? [{
              src: `${options.from}/Widgets/widgets.css`,
              dest: `${options.to}/Widgets/`,
            }]
          : [],
      ],
      silent: true,
    }),

    // imports
    imports([base => `${base}${options.from}Unminified/Cesium.js`], 'serve'),
    imports([base => `${base}${options.to}/Cesium.js`], 'build'),
    ...options.css
      ? [
          imports([base => `${base}${options.from}/Widgets/widgets.css`], 'serve'),
          imports([base => `${base}${options.to}/Widgets/widgets.css`], 'build'),
        ]
      : [],

    // base url
    setBaseUrl(options),
  ]
}

export default pluginEntry
