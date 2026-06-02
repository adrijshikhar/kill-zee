import { BALANCE } from '../config/balance'

export interface Stats {
  axeRadiusMult: number
  axeSpinMult: number
  moveSpeedMult: number
  repairRateMult: number
  towerMaxHpBonus: number
  playerMaxHpBonus: number
  dropChanceBonus: number
  lifesteal: number
}

export interface RunState {
  wave: number
  score: number
  kills: number
  towerHp: number
  playerHp: number
  stats: Stats
}

export function createRunState(): RunState {
  return {
    wave: 1,
    score: 0,
    kills: 0,
    towerHp: BALANCE.tower.maxHp,
    playerHp: BALANCE.player.maxHp,
    stats: {
      axeRadiusMult: 1,
      axeSpinMult: 1,
      moveSpeedMult: 1,
      repairRateMult: 1,
      towerMaxHpBonus: 0,
      playerMaxHpBonus: 0,
      dropChanceBonus: 0,
      lifesteal: 0,
    },
  }
}

export function towerMaxHp(s: RunState): number {
  return BALANCE.tower.maxHp + s.stats.towerMaxHpBonus
}

export function playerMaxHp(s: RunState): number {
  return BALANCE.player.maxHp + s.stats.playerMaxHpBonus
}
