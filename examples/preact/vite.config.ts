import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'

import cesium from 'vite-plugin-cesium-build'

export default defineConfig({
  plugins: [
    preact(),
    cesium(),
  ],
})
