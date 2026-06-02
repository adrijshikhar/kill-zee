import Phaser from 'phaser'
import { BALANCE } from '../config/balance'
import type { RunState } from '../state/RunState'
import type { Player } from './Player'

export class Axe extends Phaser.Physics.Arcade.Sprite {
  private spinAngle = 0

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'axe')
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setCircle(BALANCE.axe.radius)
  }

  update(dtSec: number, player: Player, state: RunState, frenzyMult: number) {
    this.spinAngle += BALANCE.axe.spinSpeed * state.stats.axeSpinMult * frenzyMult * dtSec
    const r = BALANCE.axe.orbitRadius * state.stats.axeRadiusMult
    this.setPosition(player.x + Math.cos(this.spinAngle) * r, player.y + Math.sin(this.spinAngle) * r)
  }
}
