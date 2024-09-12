import type { Plugin, ResolvedConfig } from 'vite'
import { isString } from './utils'

export function importCss(path: (base: string) => string, apply?: Plugin['apply']): Plugin {
  let base: ResolvedConfig['base']

  return {
    name: `vite-plugin-cesium-build:importCss${isString(apply) ? `:${apply}` : ''}`,
    apply,
    configResolved(resolvedConfig) {
      base = resolvedConfig.base
    },
    transformIndexHtml: () => [
      {
        tag: 'link',
        attrs: {
          rel: 'stylesheet',
          href: path(base),
        },
      },
    ],
  }
}
