import { effect, signal } from '@preact/signals'

import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

export function App() {
  const container = signal<HTMLElement | null>(null)

  effect(() => {
    if (!container.value)
      return

    new Cesium.Viewer(container.value!)
  })

  return (
    <div ref={el => container.value = el} style={{ width: '100vw', height: '100vh' }} />
  )
}
