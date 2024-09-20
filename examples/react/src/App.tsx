import * as Cesium from 'cesium'

import { useEffect, useRef } from 'react'
import 'cesium/Build/Cesium/Widgets/widgets.css'

function App() {
  const container = useRef(null)

  useEffect(() => {
    const viewer = new Cesium.Viewer(container.current!)

    return () => viewer.destroy()
  })

  return (
    <div ref={container} style={{ width: '100vw', height: '100vh' }} />
  )
}

export default App
