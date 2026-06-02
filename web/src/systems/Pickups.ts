import { BALANCE } from '../config/balance'
import type { RunState } from '../state/RunState'

export type PickupType = 'heart' | 'bandage' | 'frenzy' | 'freeze'

export const PICKUP_TYPES: PickupType[] = ['heart', 'bandage', 'frenzy', 'freeze']

/** Roll for a drop. First rng call decides drop-or-not, second picks the type. */
export function rollDrop(rng: () => number, chance: number): PickupType | null {
  if (rng() >= chance) return null
  return PICKUP_TYPES[Math.floor(rng() * PICKUP_TYPES.length)]
}

export function dropChance(state: RunState): number {
  return BALANCE.pickup.baseDropChance + state.stats.dropChanceBonus
}
