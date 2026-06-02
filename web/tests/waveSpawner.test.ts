import { describe, expect, it } from 'vitest'
import { edgeSpawnPosition } from '../src/systems/WaveSpawner'

describe('edgeSpawnPosition', () => {
  const W = 960
  const H = 640

  function rngFor(side: number, along = 0.5) {
    const seq = [side / 4, along]
    let i = 0
    return () => seq[i++]
  }

  it('side 0 spawns above the top edge', () => {
    const p = edgeSpawnPosition(rngFor(0), W, H)
    expect(p.y).toBeLessThan(0)
    expect(p.x).toBeCloseTo(W / 2)
  })

  it('side 1 spawns right of the right edge', () => {
    const p = edgeSpawnPosition(rngFor(1), W, H)
    expect(p.x).toBeGreaterThan(W)
    expect(p.y).toBeCloseTo(H / 2)
  })

  it('side 2 spawns below the bottom edge', () => {
    const p = edgeSpawnPosition(rngFor(2), W, H)
    expect(p.y).toBeGreaterThan(H)
  })

  it('side 3 spawns left of the left edge', () => {
    const p = edgeSpawnPosition(rngFor(3), W, H)
    expect(p.x).toBeLessThan(0)
  })
})
