import type { Plugin } from 'vite'
import type { BuildCesiumOptions } from './index'

export const setBaseUrl = (options: BuildCesiumOptions): Plugin => {
  const { to } = options
  return {
    name: 'vite-plugin-cesium-build:setBaseUrl',
    transform(code, id) {
      if (!id.endsWith('/src/main.js') && !id.endsWith('/src/main.ts')) return

      const val =
        `
        Object.defineProperty(globalThis, 'CESIUM_BASE_URL', {
          value: '/${to}/'
        });\n
        ` + code

      return val
    }
  }
}
