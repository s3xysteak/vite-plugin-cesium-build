import type { BuildCesiumOptions } from './resolveOptions'
import { type Target, viteStaticCopy } from 'vite-plugin-static-copy'
import { toArray } from './utils'

export function copyCesium(options: BuildCesiumOptions, items: string[], customCopyList: Target | Target[] = []) {
  const { from, to } = options

  return viteStaticCopy({
    targets: [
      ...items.map(item => ({
        src: `${from}/${item}/*`,
        dest: `${to}/${item}/`,
      })),
      ...toArray(customCopyList),
    ],
    silent: true,
  })
}
