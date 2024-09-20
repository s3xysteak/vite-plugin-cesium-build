import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

const dom = document.querySelector<HTMLDivElement>('#app')!

/* eslint-disable no-new */
new Cesium.Viewer(dom)
