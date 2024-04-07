import { describe, expect, it } from 'vitest'
import { toUrlValue } from '@/core/setBaseUrl'

describe('setBaseUrl', () => {
  it('toUrlValue should work', () => {
    const base = '/'
    const to = 'cesium-package'

    const tryTest = (src: string | boolean) => toUrlValue(src, { base, to })

    expect(`{ value: ${tryTest(false)} }`).toBe(`{ value: '/cesium-package/' }`)
    expect(`{ value: ${tryTest('/hi/')} }`).toBe(`{ value: '/hi/' }`)
  })
})
