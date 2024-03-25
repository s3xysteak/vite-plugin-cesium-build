import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'vite-plugin-cesium-build',
      fileName: 'vite-plugin-cesium-build',
    },
    rollupOptions: {
      external: ['vite-plugin-externals', 'vite-plugin-static-copy'],
      output: {
        globals: {
          'vite-plugin-externals': 'vitePluginStaticCopy',
          'vite-plugin-static-copy': 'vitePluginExternals',
        },
      },
    },
  },
})
