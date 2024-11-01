import type { PluginOption } from 'vite'
import { join } from 'pathe'

import { viteStaticCopy } from 'vite-plugin-static-copy'
import { type BuildCesiumOptions, imports, resolveOptions, setBaseUrl } from './core'

function pluginEntry(pluginOptions?: Partial<BuildCesiumOptions>): PluginOption[] {
  const options = resolveOptions(pluginOptions, './node_modules/@cesium/engine')

  return [
    // copy
    ...viteStaticCopy({
      targets: [
        {
          src: join(options.from, '/Source/Assets/*'),
          dest: join(options.to, '/Assets/'),
        },
        {
          src: join(options.from, '/Source/ThirdParty/*.wasm'),
          dest: join(options.to, '/ThirdParty/'),
        },
        {
          src: join(options.from, '/Build/ThirdParty/*'),
          dest: join(options.to, '/ThirdParty/'),
        },
        {
          src: join(options.from, '/Build/Workers/*'),
          dest: join(options.to, '/Workers/'),
        },
        ...options.css
          ? [{
              src: join(options.from, '/Source/Widget/CesiumWidget.css'),
              dest: join(options.to, '/Widget/'),
            }]
          : [],
      ],
      silent: true,
    }),

    // imports
    ...options.css
      ? [
          imports([base => join(base, options.from, '/Source/Widget/CesiumWidget.css')], 'serve'),
          imports([base => join(base, options.to, '/Widget/CesiumWidget.css')], 'build'),
        ]
      : [],

    // base url
    ...options.customCesiumBaseUrl !== true ? [setBaseUrl(options)] : [],
  ]
}

export default pluginEntry
