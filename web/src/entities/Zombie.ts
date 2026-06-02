import Phaser from 'phaser'
import { BALANCE } from '../config/balance'

export class Zombie extends Phaser.Physics.Arcade.Sprite {
  hp = 1
  latched = false
  nextHitAt = 0
  private speed = 0

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'zombie')
  }

  spawn(x: number, y: number, hp: number, speed: number) {
    this.enableBody(true, x, y, true, true)
    this.setCircle(BALANCE.zombie.radius)
    this.setDisplaySize(BALANCE.zombie.radius * 2.4, BALANCE.zombie.radius * 2.4)
    this.hp = hp
    this.speed = speed
    this.latched = false
    this.nextHitAt = 0
    this.setScale(1)
  }

  /** Returns true the frame this zombie latches onto the tower. */
  update(frozen: boolean, towerX: number, towerY: number): boolean {
    const body = this.body as Phaser.Physics.Arcade.Body
    if (this.latched || frozen) {
      body.setVelocity(0, 0)
      return false
    }
    const dist = Phaser.Math.Distance.Between(this.x, this.y, towerX, towerY)
    if (dist < BALANCE.tower.radius + BALANCE.zombie.radius) {
      this.latched = true
      body.setVelocity(0, 0)
      return true
    }
    const v = new Phaser.Math.Vector2(towerX - this.x, towerY - this.y).normalize().scale(this.speed)
    body.setVelocity(v.x, v.y)
    return false
  }
}
