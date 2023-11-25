import { defineConfig } from 'vite'
import { buildCesium } from 'vite-plugin-cesium-build'

export default defineConfig({
  plugins: [buildCesium()]
})
