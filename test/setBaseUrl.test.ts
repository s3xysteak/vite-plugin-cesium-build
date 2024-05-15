import { describe, expect, it } from 'vitest'
import { toUrlValue } from '@/core/setBaseUrl'

describe('setBaseUrl', () => {
  it('toUrlValue should work', () => {
    const tryTest = (src: string | boolean) => toUrlValue(src, '/cesium-package/')

    expect(`{ value: ${tryTest(false)} }`).toBe(`{ value: '/cesium-package/' }`)
    expect(`{ value: ${tryTest('/hi/')} }`).toBe(`{ value: '/hi/' }`)
  })
})
