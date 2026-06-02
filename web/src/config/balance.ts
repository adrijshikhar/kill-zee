export const BALANCE = {
  arena: { width: 960, height: 640 },
  tower: {
    maxHp: 100,
    radius: 48,
    repairRate: 6, // hp/s while player touches tower
    latchPenaltyAt: 3, // 3+ latched zombies => repair penalized
    repairPenaltyMult: 0.5,
  },
  player: { maxHp: 100, speed: 220, radius: 14, contactDps: 10 },
  axe: { orbitRadius: 70, spinSpeed: 4, radius: 16 }, // spinSpeed in rad/s
  zombie: {
    baseSpeed: 40,
    radius: 14,
    baseTowerDps: 2,
    dpsRampPerKill: 0.02, // original's risk ramp: each kill raises drain
  },
  wave: {
    baseCount: 6,
    countPerWave: 2,
    baseDuration: 10, // seconds
    durationPerWave: 1,
    speedPerWave: 0.04,
    hpWaveDivisor: 4,
  },
  pickup: {
    baseDropChance: 0.08,
    despawnMs: 6000,
    heartTowerHeal: 10,
    bandagePlayerHeal: 15,
    frenzyMs: 5000,
    frenzySpinMult: 2,
    freezeMs: 3000,
  },
} as const

export function waveZombieCount(wave: number): number {
  return BALANCE.wave.baseCount + wave * BALANCE.wave.countPerWave
}

export function waveSpawnDuration(wave: number): number {
  return BALANCE.wave.baseDuration + wave * BALANCE.wave.durationPerWave
}

export function spawnIntervalMs(wave: number): number {
  return (waveSpawnDuration(wave) / waveZombieCount(wave)) * 1000
}

export function zombieSpeed(wave: number): number {
  return BALANCE.zombie.baseSpeed * (1 + BALANCE.wave.speedPerWave * (wave - 1))
}

export function zombieHp(wave: number): number {
  return 1 + Math.floor((wave - 1) / BALANCE.wave.hpWaveDivisor)
}

export function zombieTowerDps(kills: number): number {
  return BALANCE.zombie.baseTowerDps * (1 + BALANCE.zombie.dpsRampPerKill * kills)
}
