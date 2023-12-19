import { defineConfig } from 'vite'
import cesium from 'vite-plugin-cesium-build'

export default defineConfig({
  plugins: [cesium()],
  preview: {
    port: 8080
  }
})
