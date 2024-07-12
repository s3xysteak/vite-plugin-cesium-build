import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import cesium from 'vite-plugin-cesium-build'

export default defineConfig({
  plugins: [
    react(),
    cesium(),
  ],
})
