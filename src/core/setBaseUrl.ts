import type { Plugin, ResolvedConfig } from 'vite'
import type { BuildCesiumOptions } from './resolveOptions'

export function setBaseUrl(options: BuildCesiumOptions): Plugin {
  const { to, customCesiumBaseUrl } = options
  let base: ResolvedConfig['base']

  return {
    name: 'vite-plugin-cesium-build:setBaseUrl',
    configResolved(resolvedConfig) {
      base = resolvedConfig.base
    },
    transformIndexHtml: customCesiumBaseUrl
      ? void 0
      : () => [
          {
            tag: 'script',
            children: `Object.defineProperty(globalThis,'CESIUM_BASE_URL',{value:'${base}${to}/'})`,
          },
        ],
  }
}
