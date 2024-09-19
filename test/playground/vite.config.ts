import { defineConfig } from 'vite'
import cesium from 'vite-plugin-cesium-build'

export default defineConfig({
  base: '',
  plugins: [cesium({ css: true })],
})
