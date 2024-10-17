import type { Plugin } from 'vite'
import { join } from 'pathe'

import { viteExternalsPlugin } from 'vite-plugin-externals'
import { viteStaticCopy } from 'vite-plugin-static-copy'

import { type BuildCesiumOptions, imports, resolveOptions, setBaseUrl } from './core'

function pluginEntry(pluginOptions?: Partial<BuildCesiumOptions>): Plugin[] {
  const options = resolveOptions(pluginOptions, './node_modules/cesium/Build/Cesium')

  return [
    // externals
    viteExternalsPlugin({ cesium: 'Cesium' }),

    // copy
    ...viteStaticCopy({
      targets: [
        // resources
        ...['Assets', 'ThirdParty', 'Widgets', 'Workers'].map(item => ({
          src: join(options.from, item, '*'),
          dest: join(options.to, item, '/'),
        })),
        // Cesium.js
        {
          src: join(options.from, 'Cesium.js'),
          dest: join(options.to, '/'),
        },
        // css
        ...options.css
          ? [{
              src: join(options.from, '/Widgets/widgets.css'),
              dest: join(options.to, '/Widgets/'),
            }]
          : [],
      ],
      silent: true,
    }),

    // imports
    imports([base => join(base, options.from.replace(/\/Cesium\/?$/, ''), 'CesiumUnminified/Cesium.js')], 'serve'),
    imports([base => join(base, options.to, 'Cesium.js')], 'build'),
    ...options.css
      ? [
          imports([base => join(base, options.from, 'Widgets/widgets.css')], 'serve'),
          imports([base => join(base, options.to, 'Widgets/widgets.css')], 'build'),
        ]
      : [],

    // base url
    setBaseUrl(options),
  ]
}

export default pluginEntry
