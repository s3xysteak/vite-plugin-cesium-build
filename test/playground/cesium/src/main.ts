import * as Cesium from 'cesium'

import './main.css'

const app = document.querySelector('#app') as HTMLElement
app.className = 'earth'

const viewer = new Cesium.Viewer(app)

viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(120, 31.8, 100_000),
})
