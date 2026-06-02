import { describe, expect, it } from 'vitest'
import {
  BALANCE,
  spawnIntervalMs,
  waveSpawnDuration,
  waveZombieCount,
  zombieHp,
  zombieSpeed,
  zombieTowerDps,
} from '../src/config/balance'

describe('wave scaling', () => {
  it('wave N spawns 6 + N*2 zombies', () => {
    expect(waveZombieCount(1)).toBe(8)
    expect(waveZombieCount(5)).toBe(16)
  })

  it('wave N spawns over 10 + N seconds', () => {
    expect(waveSpawnDuration(1)).toBe(11)
    expect(waveSpawnDuration(10)).toBe(20)
  })

  it('spawn interval spreads count over duration', () => {
    expect(spawnIntervalMs(1)).toBeCloseTo((11 / 8) * 1000)
  })
})

describe('zombie scaling', () => {
  it('speed grows 4% per wave from base', () => {
    expect(zombieSpeed(1)).toBeCloseTo(BALANCE.zombie.baseSpeed)
    expect(zombieSpeed(2)).toBeCloseTo(BALANCE.zombie.baseSpeed * 1.04)
  })

  it('hp gains +1 every 4 waves', () => {
    expect(zombieHp(1)).toBe(1)
    expect(zombieHp(4)).toBe(1)
    expect(zombieHp(5)).toBe(2)
    expect(zombieHp(9)).toBe(3)
  })
})

describe('risk ramp', () => {
  it('tower dps ramps 2% per kill', () => {
    expect(zombieTowerDps(0)).toBeCloseTo(BALANCE.zombie.baseTowerDps)
    expect(zombieTowerDps(50)).toBeCloseTo(BALANCE.zombie.baseTowerDps * 2)
  })
})
