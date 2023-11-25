import type { Plugin } from 'vite'

import { viteStaticCopy } from 'vite-plugin-static-copy'
import { viteExternalsPlugin } from 'vite-plugin-externals'

import { setBaseUrl } from './setBaseUrl'
import { insertToHtml } from './insertToHtml'

type BuildCesiumOptions =
  | {
      /**
       * Specifies the location of the Cesium package folder
       *
       * @default 'node_modules/cesium/Build/Cesium'
       */
      from?: string
      /**
       * Specifies the location of the built resources
       *
       * @default 'cesium-package'
       */
      to?: string
    }
  | undefined

export const copyCesium = (from: string, to: string, items: string[]) => {
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

export const buildCesium = (options: BuildCesiumOptions = {}): Plugin[] => {
  const { from = 'node_modules/cesium/Build/Cesium', to = 'cesium-package' } =
    options

  return [
    ...copyCesium(from, to, ['Assets', 'ThirdParty', 'Widgets', 'Workers']),
    viteExternalsPlugin(
      { cesium: 'Cesium' },
      {
        disableInServe: true
      }
    ),
    insertToHtml(to),
    setBaseUrl(to)
  ]
}
