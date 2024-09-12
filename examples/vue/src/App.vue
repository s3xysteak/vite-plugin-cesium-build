<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as Cesium from 'cesium'

const container = ref()
onMounted(() => {
  new Cesium.Viewer(container.value)
})
</script>

<template>
  <div ref="container" />
</template>
