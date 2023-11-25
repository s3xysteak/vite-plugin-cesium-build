import type { Plugin } from 'vite'

export const insertToHtml = (to: string): Plugin => ({
  name: 'vite-plugin-cesium-build:insertToHtml',
  apply: 'build',
  transformIndexHtml: () => [
    {
      tag: 'script',
      attrs: { src: `/${to}/Cesium.js` }
    }
  ]
})
