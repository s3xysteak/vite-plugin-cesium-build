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
  /**
   * If `true`, cesium's css will be added automatically.
   *
   * @default false
   */
  css: boolean

  /**
   * If `true`, using IIFE to skip building `Cesium.js`. If `false`, do not handle `Cesium.js`.
   *
   * @default true
   */
  iife: boolean
}

export function resolveOptions(userOptions: Partial<BuildCesiumOptions> = {}, defaultFrom: string): BuildCesiumOptions {
  const defaultOptions: BuildCesiumOptions = {
    from: defaultFrom,
    to: 'cesium-package',
    customCesiumBaseUrl: false,
    css: false,
    iife: true,
  }

  return {
    ...defaultOptions,
    ...userOptions,
  }
}
