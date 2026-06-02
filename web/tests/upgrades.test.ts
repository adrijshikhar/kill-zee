import { describe, expect, it } from 'vitest'
import { createRunState, playerMaxHp, towerMaxHp } from '../src/state/RunState'
import { UPGRADE_CARDS, drawCards } from '../src/systems/Upgrades'

function card(id: string) {
  const c = UPGRADE_CARDS.find((c) => c.id === id)
  if (!c) throw new Error(`no card ${id}`)
  return c
}

describe('UPGRADE_CARDS', () => {
  it('has the 8 cards from the spec', () => {
    expect(UPGRADE_CARDS.map((c) => c.id).sort()).toEqual(
      [
        'axe-reach',
        'axe-speed',
        'drop-chance',
        'lifesteal',
        'move-speed',
        'player-hp',
        'repair',
        'tower-hp',
      ],
    )
  })

  it('multiplicative cards stack', () => {
    const s = createRunState()
    card('axe-reach').apply(s)
    card('axe-reach').apply(s)
    expect(s.stats.axeRadiusMult).toBeCloseTo(1.15 * 1.15)
  })

  it('tower-hp raises max and heals 20', () => {
    const s = createRunState()
    s.towerHp = 50
    card('tower-hp').apply(s)
    expect(towerMaxHp(s)).toBe(120)
    expect(s.towerHp).toBe(70)
  })

  it('player-hp raises max and heals up to new max', () => {
    const s = createRunState()
    card('player-hp').apply(s)
    expect(playerMaxHp(s)).toBe(120)
    expect(s.playerHp).toBe(120)
  })

  it('lifesteal accumulates', () => {
    const s = createRunState()
    card('lifesteal').apply(s)
    card('lifesteal').apply(s)
    expect(s.stats.lifesteal).toBe(2)
  })
})

describe('drawCards', () => {
  it('returns 3 distinct cards', () => {
    const cards = drawCards(() => 0.5)
    expect(cards).toHaveLength(3)
    expect(new Set(cards.map((c) => c.id)).size).toBe(3)
  })

  it('is deterministic for a fixed rng', () => {
    let i = 0
    const seq = [0.1, 0.9, 0.4]
    const rng = () => seq[i++ % seq.length]
    const a = drawCards(rng).map((c) => c.id)
    i = 0
    const b = drawCards(rng).map((c) => c.id)
    expect(a).toEqual(b)
  })
})
