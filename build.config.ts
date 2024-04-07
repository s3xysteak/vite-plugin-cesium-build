import { defineBuildConfig } from 'unbuild'

import pkg from './package.json'

export default defineBuildConfig({
  clean: true,
  externals: Object.keys(pkg.dependencies || {}),
  rollup: {
    esbuild: {
      minify: true,
    },
  },
})
