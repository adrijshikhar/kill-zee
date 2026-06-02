import Phaser from 'phaser'
import { BALANCE } from '../config/balance'
import { createRunState, type RunState } from '../state/RunState'
import { Player } from '../entities/Player'

export class GameScene extends Phaser.Scene {
  private state!: RunState
  private player!: Player
  private tower!: Phaser.Physics.Arcade.Image

  constructor() {
    super('game')
  }

  create() {
    this.state = createRunState()
    const { width, height } = this.scale

    this.tower = this.physics.add.image(width / 2, height / 2, 'tower-tex').setImmovable(true)
    this.tower.setCircle(BALANCE.tower.radius)

    this.player = new Player(this)
  }

  update() {
    this.player.update(this.state)
  }
}
