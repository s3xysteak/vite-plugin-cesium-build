import { defineConfig } from 'vite'
import cesium from 'vite-plugin-cesium-build'

import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  base: '',
  plugins: [
    Inspect(),
    cesium({ css: true, iife: false }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          cesium: ['cesium'],
        },
      },
    },
  },
})
