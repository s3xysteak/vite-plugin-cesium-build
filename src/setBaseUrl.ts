import type { Plugin, ResolvedConfig } from 'vite'
import type { BuildCesiumOptions } from './index'

export const setBaseUrl = (options: BuildCesiumOptions): Plugin => {
  const { to } = options
  let base: ResolvedConfig['base']

  return {
    name: 'vite-plugin-cesium-build:setBaseUrl',
    configResolved(resolvedConfig) {
      base = resolvedConfig.base
    },
    transform(code, id) {
      if (!id.endsWith('/src/main.js') && !id.endsWith('/src/main.ts')) return

      const val =
        `
        Object.defineProperty(globalThis, 'CESIUM_BASE_URL', {
          value: '${base === '/' ? '' : base}/${to}/'
        });\n
        ` + code

      return val
    }
  }
}
