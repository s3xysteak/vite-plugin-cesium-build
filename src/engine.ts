import type { Plugin } from 'vite'

import { viteStaticCopy } from 'vite-plugin-static-copy'
import { type BuildCesiumOptions, imports, resolveOptions, setBaseUrl } from './core'

function pluginEntry(pluginOptions?: Partial<BuildCesiumOptions>): Plugin[] {
  const options = resolveOptions(pluginOptions, 'node_modules/@cesium/engine')

  return [
    // copy
    ...viteStaticCopy({
      targets: [
        {
          src: `${options.from}/Source/Assets/*`,
          dest: `${options.to}/Assets/`,
        },
        {
          src: `${options.from}/Source/ThirdParty/*.wasm`,
          dest: `${options.to}/ThirdParty/`,
        },
        {
          src: `${options.from}/Build/ThirdParty/*`,
          dest: `${options.to}/ThirdParty/`,
        },
        {
          src: `${options.from}/Build/Workers/*`,
          dest: `${options.to}/Workers/`,
        },
        ...options.css
          ? [{
              src: `${options.from}/Source/Widget/CesiumWidget.css`,
              dest: `${options.to}/Widget/`,
            }]
          : [],
      ],
      silent: true,
    }),

    // imports
    ...options.css
      ? [
          imports([base => `${base}${options.from}/Source/Widget/CesiumWidget.css`], 'serve'),
          imports([base => `${base}${options.to}/Widget/CesiumWidget.css`], 'build'),
        ]
      : [],

    // base url
    setBaseUrl(options),
  ]
}

export default pluginEntry
