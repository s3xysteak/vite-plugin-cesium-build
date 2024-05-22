import type { Plugin, ResolvedConfig } from 'vite'
import { consola } from 'consola'
import { isString } from './utils'

export function importCesium(path: (base: string) => string, apply?: Plugin['apply']): Plugin {
  let base: ResolvedConfig['base']

  apply === 'serve' && consola.info(`[vite-plugin-cesium-build]: The warning message like: \`Sourcemap for "..." points to missing source files\` is expected and is a bug in \`Cesium\'s IIFE\`. You can ignore it. See the @link \`https://github.com/CesiumGS/cesium/issues/11993\` for details.`)

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
