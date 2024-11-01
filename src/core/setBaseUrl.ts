import type { PluginOption, ResolvedConfig } from 'vite'
import type { BuildCesiumOptions } from './resolveOptions'
import { join } from 'pathe'
import { isString } from './utils'

export function setBaseUrl(options: BuildCesiumOptions): PluginOption {
  const { customCesiumBaseUrl, to } = options
  let base: ResolvedConfig['base']

  if (customCesiumBaseUrl === true)
    throw new Error('[vite-plugin-cesium-build[internal error]]: customCesiumBaseUrl should not be true in `setBaseUrl`')

  return {
    name: 'vite-plugin-cesium-build:setBaseUrl',
    configResolved(resolvedConfig) {
      base = resolvedConfig.base
    },
    transformIndexHtml: () => [
      {
        tag: 'script',
        children: `Object.defineProperty(globalThis, 'CESIUM_BASE_URL', { value: '${isString(customCesiumBaseUrl) ? customCesiumBaseUrl : join(base, to, '/')}' })`,
      },
    ],
  }
}
