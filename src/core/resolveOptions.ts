export interface BuildCesiumOptions {
  /**
   * Specifies the location of the Cesium package folder
   *
   * @default 'node_modules/cesium/Build/Cesium'
   */
  from: string
  /**
   * Specifies the location of the built resources
   *
   * @default 'cesium-package'
   */
  to: string
  /**
   * If `true`, you need to manually set the `CESIUM_BASE_URL`. Or you can directly set the custom Cesium base URL.
   *
   * @default false
   */
  customCesiumBaseUrl: boolean | string
}

export function resolveOptions(options: Partial<BuildCesiumOptions> = {}, src: string): BuildCesiumOptions {
  const {
    from = src,
    to = 'cesium-package',
    customCesiumBaseUrl = false,
  } = options

  return {
    from: from.replace(/[/\\]$/, ''),
    to: to.replace(/^[/\\]|[/\\]$/, ''),
    customCesiumBaseUrl,
  }
}
