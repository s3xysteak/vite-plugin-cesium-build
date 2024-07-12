<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

const container = ref()
onMounted(() => {
  new Cesium.Viewer(container.value)
})
</script>

<template>
  <div ref="container" />
</template>
