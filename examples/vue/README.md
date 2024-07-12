# How did I install it?

```sh
$ pnpm create vite
$ **choose a framework and cd to the app's root folder**
$ pnpm i cesium
$ pnpm i -D vite-plugin-cesium-build
```

in `vite.config.ts`:

```js
import { defineConfig } from 'vite'
// ...

import cesium from 'vite-plugin-cesium-build'

export default defineConfig({
  plugins: [
    // ...
    cesium(),
  ],
})
```

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
