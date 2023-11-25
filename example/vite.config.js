import { defineConfig } from 'vite'
import { buildCesium } from '../src/index.ts'

export default defineConfig({
  plugins: [buildCesium()]
})
