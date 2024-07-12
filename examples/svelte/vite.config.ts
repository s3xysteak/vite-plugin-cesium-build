import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

import cesium from 'vite-plugin-cesium-build'

export default defineConfig({
  plugins: [
    svelte(),
    cesium()
  ],
})
