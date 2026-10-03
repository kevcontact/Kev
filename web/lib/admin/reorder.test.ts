import { describe, expect, it } from 'vitest'
import { moveItem, positionsFor } from './reorder'

describe('moveItem', () => {
  it('sube y baja un elemento sin mutar la lista', () => {
    const ids = ['a', 'b', 'c']
    expect(moveItem(ids, 'b', 'up')).toEqual(['b', 'a', 'c'])
    expect(moveItem(ids, 'b', 'down')).toEqual(['a', 'c', 'b'])
    expect(ids).toEqual(['a', 'b', 'c'])
  })

  it('no hace nada en los bordes ni con ids desconocidos', () => {
    expect(moveItem(['a', 'b'], 'a', 'up')).toEqual(['a', 'b'])
    expect(moveItem(['a', 'b'], 'b', 'down')).toEqual(['a', 'b'])
    expect(moveItem(['a', 'b'], 'z', 'up')).toEqual(['a', 'b'])
  })
})

describe('positionsFor', () => {
  it('numera de 10 en 10', () => {
    expect(positionsFor(['x', 'y'])).toEqual([
      { id: 'x', position: 0 },
      { id: 'y', position: 10 },
    ])
  })
})
