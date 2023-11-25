# :tada:vite-plugin-cesium-build

[English](README.md) | 简体中文

为 CesiumJS 的项目提供一个自动化配置的解决方案。  
这会将 `Cesium.js` 外部化，并在打包时自动拷贝 CesiumJS 的四大库和核心文件。  
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
import { buildCesium } from 'vite-plugin-cesium-build'

export default defineConfig({
  plugins: [
    //...
    buildCesium()
  ]
})
```

结束了？结束了！你已经完成了 CesiumJS 的全部配置！接下来只需要像往常一样开发与打包！

熟悉的 CesiumJS 的朋友可能会问，在哪里配置`window.CESIUM_BASE_URL`呢？事实上，这个操作同样已经在插件中自动完成。

## :wrench: 选项
除此以外，插件提供了一些配置项：

```javascript
export default defineConfig({
  plugins: [
    buildCesium({
      // 这指示了Cesium包文件夹的位置
      // 这意味着将会从此文件夹中获取CesiumJS的相关资源
      from: 'node_modules/cesium/Build/Cesium',
      // 这指示了构建后资源位置
      // 这意味着构建后资源会被放在/dist/cesium-package/下
      to: 'cesium-package'
    })
  ]
})
```
