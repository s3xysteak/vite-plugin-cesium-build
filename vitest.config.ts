import { URL, fileURLToPath } from 'node:url'
import { defaultExclude, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [
      ...defaultExclude,
      'e2e/*',
    ],
    typecheck: {
      enabled: true,
    },
    alias: r({
      '@': './src',
    }),
  },
})

function r(aliasMap: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(aliasMap).map(([key, value]) => [
      key,
      fileURLToPath(new URL(value, import.meta.url)),
    ]),
  )
}
