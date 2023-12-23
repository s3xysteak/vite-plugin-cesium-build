import type { Plugin } from 'vite'

import { viteStaticCopy } from 'vite-plugin-static-copy'
import { viteExternalsPlugin } from 'vite-plugin-externals'

import { setBaseUrl } from './setBaseUrl'
import { insertToHtml } from './insertToHtml'

export type BuildCesiumOptions = {
  /**
   * Specifies the location of the Cesium package folder
   *
   * @default 'node_modules/cesium/Build/Cesium'
   */
  from: string
  /**
   * Specifies the location of the built resources
   *
   * @default 'cesium-package'
   */
  to: string
  /**
   * If `true`, you need to manually set the `CESIUM_BASE_URL`
   *
   * @default false
   */
  customCesiumBaseUrl: boolean
}

const copyCesium = (options: BuildCesiumOptions, items: string[]) => {
  const { from, to } = options
  return viteStaticCopy({
    targets: [
      ...items.map(item => ({
        src: `${from}/${item}/*`,
        dest: `${to}/${item}/`
      })),
      {
        src: `${from}/Cesium.js`,
        dest: `${to}/`
      }
    ],
    silent: true
  })
}

type Partial<T> = {
  [K in keyof T]: T[K]
}
const handleOptions = (
  options: Partial<BuildCesiumOptions> | undefined
): BuildCesiumOptions => {
  const {
    from = 'node_modules/cesium/Build/Cesium',
    to = 'cesium-package',
    customCesiumBaseUrl = false
  } = options ?? {}

  return {
    from,
    to,
    customCesiumBaseUrl
  }
}

const installCesium = (
  _options: Partial<BuildCesiumOptions> | undefined
): Plugin[] => {
  const options = handleOptions(_options)

  return [
    viteExternalsPlugin(
      { cesium: 'Cesium' },
      {
        disableInServe: true
      }
    ),
    ...copyCesium(options, ['Assets', 'ThirdParty', 'Widgets', 'Workers']),
    insertToHtml(options),
    setBaseUrl(options)
  ]
}

export default installCesium
