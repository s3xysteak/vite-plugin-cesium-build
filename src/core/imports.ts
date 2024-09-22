import type { Plugin, ResolvedConfig } from 'vite'
import { isString } from './utils'

export function imports(pathList: Array<(base: string) => string>, apply?: Plugin['apply']): Plugin {
  let base: ResolvedConfig['base']

  return {
    name: `vite-plugin-cesium-build:imports${isString(apply) ? `:${apply}` : ''}`,
    apply,
    configResolved(resolvedConfig) {
      base = resolvedConfig.base
    },
    transformIndexHtml: () => pathList.map((_path) => {
      const path = _path(base)
      return path.endsWith('.js')
        ? {
            tag: 'script',
            attrs: { src: path },
          }
        : path.endsWith('.css')
          ? {
              tag: 'link',
              attrs: {
                rel: 'stylesheet',
                href: path,
              },
            }
          : null as any
    }).filter(Boolean),
  }
}
