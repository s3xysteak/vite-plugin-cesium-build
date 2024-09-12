import type { Plugin } from 'vite'

import { type BuildCesiumOptions, copyCesium, importCss, resolveOptions, setBaseUrl } from './core'

function pluginEntry(pluginOptions?: Partial<BuildCesiumOptions>): Plugin[] {
  const options = resolveOptions(pluginOptions, 'node_modules/@cesium/engine')

  return [
    ...copyCesium(
      options,
      [],
      [
        {
          src: `${options.from}/Source/Assets/*`,
          dest: `${options.to}/Assets/`,
        },
        {
          src: `${options.from}/Source/Widget/CesiumWidget.css`,
          dest: `${options.to}/Widget/`,
        },
        {
          src: `${options.from}/Source/ThirdParty/*.wasm`,
          dest: `${options.to}/ThirdParty/`,
        },
        {
          src: `${options.from}/Source/Widget/CesiumWidget.css`,
          dest: `${options.to}/Widget/`,
        },
        {
          src: `${options.from}/Build/ThirdParty/*`,
          dest: `${options.to}/ThirdParty/`,
        },
        {
          src: `${options.from}/Build/Workers/*`,
          dest: `${options.to}/Workers/`,
        },
      ],
    ),

    importCss(base => `${base}${options.from}/Source/Widget/CesiumWidget.css`, 'serve'),
    importCss(base => `${base}${options.to}/Widget/CesiumWidget.css`, 'build'),

    setBaseUrl(options),
  ]
}

export default pluginEntry
