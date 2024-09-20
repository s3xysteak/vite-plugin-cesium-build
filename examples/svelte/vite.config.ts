import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

import cesium from 'vite-plugin-cesium-build'

export default defineConfig({
  plugins: [
    svelte(),
    cesium(),
  ],
})
