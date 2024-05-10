# :tada:vite-plugin-cesium-build

[English](README.md) | 简体中文

这会将 `Cesium.js` 外部化，并在打包时自动拷贝 CesiumJS 的四大库和核心文件。

它还支持 [@cesium/engine](https://community.cesium.com/t/cesium-engine-and-cesium-widgets-are-now-available-for-testing/20898) !

- :+1: **DX** 对开发无影响
- :sparkles: **TypeScript** 完全类型支持
- :rocket: **非常快！** 在我的笔记本电脑中，示例项目仅需 300ms 完成打包，这是因为 Cesium 库不参与核心构建。

![Alt text](readme-image.png)

## :memo: 使用

安装此插件

```sh
pnpm add -D vite-plugin-cesium-build
```

在`vite.config.js`中引入

```javascript
import { defineConfig } from 'vite'
import cesium from 'vite-plugin-cesium-build'
// import cesium from 'vite-plugin-cesium-build/engine'

export default defineConfig({
  plugins: [
    //...
    cesium()
  ]
})
```

你已经完成了 CesiumJS 的全部配置！接下来只需要像往常一样开发与打包！
默认情况下，插件会自动把下面的代码添加到你的 `index.html` 中：

```javascript
// Customize variable 'to' in options
Object.defineProperty(globalThis, 'CESIUM_BASE_URL', {
  value: '/${to}/'
})
```

如果要阻止这个默认行为，见Options中的`customCesiumBaseUrl`。

## :wrench: 选项

除此以外，插件提供了一些配置项：

```javascript
export default defineConfig({
  plugins: [
    cesium({
      /**
       * 这指示了Cesium包文件夹的位置。
       * 这意味着将会从这个文件夹中获取CesiumJS的相关资源。
       */
      from: 'node_modules/cesium/Build/Cesium',

      /**
       * 这指示了构建后资源位置。
       * 这意味着构建后资源会被放在/dist/cesium-package/下
       */
      to: 'cesium-package',

      /**
       * 设置为true时，你需要自行设置CESIUM_BASE_URL
       */
      customCesiumBaseUrl: false
    })
  ]
})
```

## 完全自定义

他提供了所有内部方法，以支持完全的自定义。在极少数有需要的情况下，请查看对应源码。

```js
import { defineConfig } from 'vite'
import { copyCesium, importCesium, setBaseUrl } from 'vite-plugin-cesium-build/core'

export default defineConfig({
  plugins: [
    [
      copyCesium(
        // ...
      ),
      importCesium(
        // ...
      ),
      setBaseUrl(
        // ...
      )
    ]
  ]
})
```

## 其他

如果你是Vue用户，或许可以尝试一下[cesium-use](https://s3xysteak.github.io/cesium-use/) !
