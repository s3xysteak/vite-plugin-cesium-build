import type { Plugin, ResolvedConfig } from 'vite'
import type { BuildCesiumOptions } from './resolveOptions'

export function importCesium(options: BuildCesiumOptions): Plugin {
  const { to } = options
  let base: ResolvedConfig['base']

  return {
    name: 'vite-plugin-cesium-build:importCesium',
    configResolved(resolvedConfig) {
      base = resolvedConfig.base
    },
    transformIndexHtml: () => [
      {
        tag: 'script',
        attrs: { src: `${base}${to}/Cesium.js` },
      },
    ],
  }
}
