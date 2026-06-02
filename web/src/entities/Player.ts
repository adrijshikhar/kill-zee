import Phaser from 'phaser'
import { BALANCE } from '../config/balance'
import type { RunState } from '../state/RunState'

type Keys = Record<'W' | 'A' | 'S' | 'D', Phaser.Input.Keyboard.Key>

export class Player extends Phaser.Physics.Arcade.Sprite {
  private keys: Keys
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private target: Phaser.Math.Vector2 | null = null

  constructor(scene: Phaser.Scene) {
    super(scene, scene.scale.width / 2, scene.scale.height / 2 + 160, 'player')
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setCircle(BALANCE.player.radius)
    this.setCollideWorldBounds(true)
    this.keys = scene.input.keyboard!.addKeys('W,A,S,D') as Keys
    this.cursors = scene.input.keyboard!.createCursorKeys()
    scene.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
      this.target = new Phaser.Math.Vector2(p.worldX, p.worldY)
    })
  }

  update(state: RunState) {
    const speed = BALANCE.player.speed * state.stats.moveSpeedMult
    const dx =
      (this.keys.D.isDown || this.cursors.right.isDown ? 1 : 0) -
      (this.keys.A.isDown || this.cursors.left.isDown ? 1 : 0)
    const dy =
      (this.keys.S.isDown || this.cursors.down.isDown ? 1 : 0) -
      (this.keys.W.isDown || this.cursors.up.isDown ? 1 : 0)

    if (dx !== 0 || dy !== 0) {
      // Keyboard overrides click-to-move.
      this.target = null
      const v = new Phaser.Math.Vector2(dx, dy).normalize().scale(speed)
      this.setVelocity(v.x, v.y)
      return
    }

    if (this.target) {
      const dist = Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y)
      if (dist < 6) {
        this.target = null
        this.setVelocity(0, 0)
      } else {
        const v = new Phaser.Math.Vector2(this.target.x - this.x, this.target.y - this.y)
          .normalize()
          .scale(speed)
        this.setVelocity(v.x, v.y)
      }
      return
    }

    this.setVelocity(0, 0)
  }
}
