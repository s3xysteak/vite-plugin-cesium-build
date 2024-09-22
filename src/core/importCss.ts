import type { Plugin, ResolvedConfig } from 'vite'
import type { BuildCesiumOptions } from './resolveOptions'
import { isString } from './utils'

export function importCss(options: BuildCesiumOptions, path: (base: string) => string, apply?: Plugin['apply']): Plugin {
  const { css } = options
  let base: ResolvedConfig['base']

  return {
    name: `vite-plugin-cesium-build:importCss${isString(apply) ? `:${apply}` : ''}`,
    apply,
    configResolved(resolvedConfig) {
      base = resolvedConfig.base
    },
    transformIndexHtml: css
      ? () => [
          {
            tag: 'link',
            attrs: {
              rel: 'stylesheet',
              href: path(base),
            },
          },
        ]
      : void 0,
  }
}
