import { describe, expect, it } from 'vitest'
import { isInView } from './in-view'

describe('isInView', () => {
  it('cuenta como visible desde la mitad del clip', () => {
    expect(isInView(300, 600, 800)).toBe(true)
    expect(isInView(299, 600, 800)).toBe(false)
  })

  it('un clip más alto que la pantalla basta con que llene media pantalla', () => {
    // 9:16 a todo el ancho: nunca llega a mostrar la mitad de sí mismo
    expect(isInView(700, 1800, 800)).toBe(true)
    expect(isInView(399, 1800, 800)).toBe(false)
  })

  it('fuera de pantalla o sin medidas no está a la vista', () => {
    expect(isInView(0, 600, 800)).toBe(false)
    expect(isInView(0, 0, 800)).toBe(false)
  })
})
