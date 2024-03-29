import type { Plugin, ResolvedConfig } from 'vite'
import type { BuildCesiumOptions } from '.'

export function insertToHtml(options: BuildCesiumOptions): Plugin {
  const { to } = options
  let base: ResolvedConfig['base']

  return {
    name: 'vite-plugin-cesium-build:insertToHtml',
    apply: 'build',
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
