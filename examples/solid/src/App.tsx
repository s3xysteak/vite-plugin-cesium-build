import * as Cesium from 'cesium'
import { onMount } from 'solid-js'
import 'cesium/Build/Cesium/Widgets/widgets.css'

function App() {
  let container: HTMLDivElement | undefined

  onMount(() => {
    /* eslint-disable no-new */
    new Cesium.Viewer(container!)
  })

  return (
    <div ref={container} />
  )
}

export default App
