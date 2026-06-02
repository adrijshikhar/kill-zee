import { describe, expect, it } from 'vitest'
import { createRunState } from '../src/state/RunState'
import { BALANCE } from '../src/config/balance'
import { PICKUP_TYPES, dropChance, rollDrop } from '../src/systems/Pickups'

describe('rollDrop', () => {
  it('returns null when roll exceeds chance', () => {
    expect(rollDrop(() => 0.99, 0.08)).toBeNull()
  })

  it('returns a pickup type when roll is under chance', () => {
    // first rng call: 0.0 (< chance, drop happens); second: picks index
    const seq = [0.0, 0.0]
    let i = 0
    expect(rollDrop(() => seq[i++], 0.08)).toBe('heart')
  })

  it('selects each type by index', () => {
    for (let t = 0; t < PICKUP_TYPES.length; t++) {
      const seq = [0.0, t / PICKUP_TYPES.length]
      let i = 0
      expect(rollDrop(() => seq[i++], 1)).toBe(PICKUP_TYPES[t])
    }
  })
})

describe('dropChance', () => {
  it('is base chance plus upgrade bonus', () => {
    const s = createRunState()
    expect(dropChance(s)).toBeCloseTo(BALANCE.pickup.baseDropChance)
    s.stats.dropChanceBonus = 0.1
    expect(dropChance(s)).toBeCloseTo(BALANCE.pickup.baseDropChance + 0.1)
  })
})
