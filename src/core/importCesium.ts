import type { Plugin, ResolvedConfig } from 'vite'
import { isString } from './utils'

export function importCesium(path: (base: string) => string, apply?: Plugin['apply']): Plugin {
  let base: ResolvedConfig['base']

  return {
    name: `vite-plugin-cesium-build:importCesium${isString(apply) ? `:${apply}` : ''}`,
    apply,
    configResolved(resolvedConfig) {
      base = resolvedConfig.base
    },
    transformIndexHtml: () => [
      {
        tag: 'script',
        attrs: { src: path(base) },
      },
    ],
  }
}
