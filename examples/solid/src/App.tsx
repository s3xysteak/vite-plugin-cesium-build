import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { onMount } from 'solid-js'

function App() {
  let container: HTMLDivElement | undefined

  onMount(() => {
    new Cesium.Viewer(container!)
  })

  return (
    <div ref={container} />
  )
}

export default App
