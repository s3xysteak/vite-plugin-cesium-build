import type { Plugin } from 'vite'
import type { BuildCesiumOptions } from './index'

export const insertToHtml = (options: BuildCesiumOptions): Plugin => {
  const { to } = options
  return {
    name: 'vite-plugin-cesium-build:insertToHtml',
    apply: 'build',
    transformIndexHtml: () => [
      {
        tag: 'script',
        attrs: { src: `/${to}/Cesium.js` }
      }
    ]
  }
}
