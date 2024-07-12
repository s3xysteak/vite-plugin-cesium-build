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
