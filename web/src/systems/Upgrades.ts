import { playerMaxHp, towerMaxHp, type RunState } from '../state/RunState'

export interface UpgradeCard {
  id: string
  name: string
  description: string
  apply(state: RunState): void
}

export const UPGRADE_CARDS: UpgradeCard[] = [
  {
    id: 'axe-reach',
    name: 'Long Arms',
    description: 'Axe reach +15%',
    apply: (s) => {
      s.stats.axeRadiusMult *= 1.15
    },
  },
  {
    id: 'axe-speed',
    name: 'Whirlwind',
    description: 'Axe spin speed +20%',
    apply: (s) => {
      s.stats.axeSpinMult *= 1.2
    },
  },
  {
    id: 'move-speed',
    name: 'Sprint',
    description: 'Move speed +10%',
    apply: (s) => {
      s.stats.moveSpeedMult *= 1.1
    },
  },
  {
    id: 'repair',
    name: 'Handyman',
    description: 'Tower repair rate +25%',
    apply: (s) => {
      s.stats.repairRateMult *= 1.25
    },
  },
  {
    id: 'tower-hp',
    name: 'Reinforce',
    description: 'Tower max HP +20, heal 20',
    apply: (s) => {
      s.stats.towerMaxHpBonus += 20
      s.towerHp = Math.min(s.towerHp + 20, towerMaxHp(s))
    },
  },
  {
    id: 'drop-chance',
    name: 'Scavenger',
    description: 'Pickup drop chance +5%',
    apply: (s) => {
      s.stats.dropChanceBonus += 0.05
    },
  },
  {
    id: 'player-hp',
    name: 'Thick Skin',
    description: 'Your max HP +20, heal 20',
    apply: (s) => {
      s.stats.playerMaxHpBonus += 20
      s.playerHp = Math.min(s.playerHp + 20, playerMaxHp(s))
    },
  },
  {
    id: 'lifesteal',
    name: 'Vampire',
    description: 'Kills heal you 1 HP',
    apply: (s) => {
      s.stats.lifesteal += 1
    },
  },
]

/** Sample `count` distinct cards using the provided rng (0..1). */
export function drawCards(rng: () => number, count = 3): UpgradeCard[] {
  const pool = [...UPGRADE_CARDS]
  const out: UpgradeCard[] = []
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(rng() * pool.length)
    out.push(pool.splice(idx, 1)[0])
  }
  return out
}
