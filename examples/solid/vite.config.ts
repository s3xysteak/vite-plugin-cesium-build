import { defineConfig } from 'vite'
import cesium from 'vite-plugin-cesium-build'

import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    solid(),
    cesium(),
  ],
})
