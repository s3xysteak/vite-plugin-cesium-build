import type { Plugin, ResolvedConfig } from 'vite'
import type { BuildCesiumOptions } from './resolveOptions'
import { isString } from './utils'

export function setBaseUrl(options: BuildCesiumOptions, path: (base: string) => string, apply?: Plugin['apply']): Plugin {
  const { customCesiumBaseUrl } = options
  let base: ResolvedConfig['base']

  return {
    name: `vite-plugin-cesium-build:setBaseUrl${isString(apply) ? `:${apply}` : ''}`,
    apply,
    configResolved(resolvedConfig) {
      base = resolvedConfig.base
    },
    transformIndexHtml: customCesiumBaseUrl === true
      ? void 0
      : () => [
          {
            tag: 'script',
            children: `Object.defineProperty(globalThis, 'CESIUM_BASE_URL', { value: ${toUrlValue(customCesiumBaseUrl, path(base))} })`,
          },
        ],
  }
}

export function toUrlValue(
  src: BuildCesiumOptions['customCesiumBaseUrl'],
  str: string,
) {
  return `'${isString(src) ? src : str}'`
}
