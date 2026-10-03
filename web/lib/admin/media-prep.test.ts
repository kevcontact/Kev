import { describe, expect, it } from 'vitest'
import { fitWithin } from './media-prep'

describe('fitWithin', () => {
  it('reduce el lado largo al máximo conservando proporción', () => {
    expect(fitWithin(6000, 4000, 2560)).toEqual({ width: 2560, height: 1707 })
    expect(fitWithin(3000, 4500, 2560)).toEqual({ width: 1707, height: 2560 })
  })
  it('no amplía imágenes pequeñas', () => {
    expect(fitWithin(800, 600, 2560)).toEqual({ width: 800, height: 600 })
  })
})
