<script lang="ts">
import { onMount } from 'svelte'
import * as Cesium from 'cesium'

let container:null

onMount(() => {
  if(!container)
    return

  const v = new Cesium.Viewer(container)

  return () => v.destroy()
})
</script>

<div bind:this={container} />