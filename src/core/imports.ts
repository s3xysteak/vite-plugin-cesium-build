import type { PluginOption, ResolvedConfig } from 'vite'
import { isString } from './utils'

export function imports(pathList: Array<(base: string) => string>, apply?: PluginOption['apply']): PluginOption {
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
            attrs: {
              ...apply === 'build' ? { crossorigin: true } : {},
              src: path,
            },
          }
        : path.endsWith('.css')
          ? {
              tag: 'link',
              attrs: {
                rel: 'stylesheet',
                ...apply === 'build' ? { crossorigin: true } : {},
                href: path,
              },
            }
          : null as any
    }).filter(Boolean),
  }
}
