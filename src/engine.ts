import type { Plugin } from 'vite'

import { setBaseUrl } from './core/setBaseUrl'
import { type BuildCesiumOptions, resolveOptions } from './core/resolveOptions'
import { copyCesium } from './core/copyCesium'

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
          src: `${options.from}/Build/ThirdParty/*`,
          dest: `${options.to}/ThirdParty/`,
        },
        {
          src: `${options.from}/Build/Workers/*`,
          dest: `${options.to}/Workers/`,
        },
      ],
    ),
    setBaseUrl(options),
  ]
}

export default pluginEntry
