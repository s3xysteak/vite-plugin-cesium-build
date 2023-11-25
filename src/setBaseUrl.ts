import type { Plugin } from 'vite'

export const setBaseUrl = (to: string): Plugin => ({
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
})
