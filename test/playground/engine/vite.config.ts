import { defineConfig } from 'vite'
import cesium from 'vite-plugin-cesium-build/engine'

export default defineConfig({
  base: '',
  plugins: [cesium({ css: true })],
})
