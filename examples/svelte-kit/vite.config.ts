import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import cesium from 'vite-plugin-cesium-build'

export default defineConfig({
  plugins: [
    sveltekit(),
    cesium({ iife: false, customCesiumBaseUrl: true }),
  ],
  define: {
    /**
     * The path is `to` options of vite-plugin-cesium-build (default: 'cesium-package')
     *
     * Add `base` of svelte.config `kit.paths.base` in front of the path.
     *
     * In default, `base` is a empty string, so it just nothing before the path.
     * If `base` is '/', use `"/cesium-package/"`
     */
    CESIUM_BASE_URL: '"cesium-package/"',
  },
})
