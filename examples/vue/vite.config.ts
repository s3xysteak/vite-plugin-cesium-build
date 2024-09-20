import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import cesium from 'vite-plugin-cesium-build'

export default defineConfig({
  plugins: [
    vue(),
    cesium(),
  ],
})
