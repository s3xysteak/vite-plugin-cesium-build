import { defineConfig } from 'vite'
import cesium from 'vite-plugin-cesium-build'

import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  base: '',
  plugins: [
    Inspect(),
    cesium({ css: true }),
  ],
  build: {
    rolldownOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/cesium')) {
            return 'cesium'
          }
        },
      },
    },
  },
})
