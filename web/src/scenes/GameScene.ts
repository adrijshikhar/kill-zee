import Phaser from 'phaser'
import {
  BALANCE,
  spawnIntervalMs,
  waveZombieCount,
  zombieHp,
  zombieSpeed,
  zombieTowerDps,
} from '../config/balance'
import { createRunState, playerMaxHp, towerMaxHp, type RunState } from '../state/RunState'
import { edgeSpawnPosition } from '../systems/WaveSpawner'
import { Player } from '../entities/Player'
import { Axe } from '../entities/Axe'
import { Zombie } from '../entities/Zombie'

export class GameScene extends Phaser.Scene {
  private state!: RunState
  private player!: Player
  private axe!: Axe
  private tower!: Phaser.Physics.Arcade.Image
  private zombies!: Phaser.Physics.Arcade.Group
  private spawnsLeft = 0
  private frenzyUntil = 0
  private freezeUntil = 0

  constructor() {
    super('game')
  }

  create() {
    this.state = createRunState()
    const { width, height } = this.scale

    this.tower = this.physics.add.image(width / 2, height / 2, 'tower-tex').setImmovable(true)
    this.tower.setCircle(BALANCE.tower.radius)

    this.player = new Player(this)
    this.axe = new Axe(this)
    this.zombies = this.physics.add.group({ classType: Zombie, maxSize: 200 })

    this.physics.add.overlap(this.axe, this.zombies, (_axe, z) => this.hitZombie(z as Zombie))

    this.startWave(1)
  }

  private startWave(n: number) {
    this.state.wave = n
    this.spawnsLeft = waveZombieCount(n)
    this.time.addEvent({
      delay: spawnIntervalMs(n),
      repeat: waveZombieCount(n) - 1,
      callback: () => this.spawnZombie(),
    })
  }

  private spawnZombie() {
    this.spawnsLeft--
    const { x, y } = edgeSpawnPosition(Math.random, this.scale.width, this.scale.height)
    const z = this.zombies.get(x, y) as Zombie | null
    if (!z) return
    z.spawn(x, y, zombieHp(this.state.wave), zombieSpeed(this.state.wave))
  }

  private hitZombie(z: Zombie) {
    const now = this.time.now
    if (!z.active || now < z.nextHitAt) return
    z.nextHitAt = now + 300 // per-zombie hit cooldown so multi-hp zombies survive a pass
    z.hp -= 1
    if (z.hp <= 0) this.killZombie(z)
  }

  private killZombie(z: Zombie) {
    this.state.score += 1
    this.state.kills += 1
    if (this.state.stats.lifesteal > 0) {
      this.state.playerHp = Math.min(this.state.playerHp + this.state.stats.lifesteal, playerMaxHp(this.state))
    }
    this.zombies.killAndHide(z)
    ;(z.body as Phaser.Physics.Arcade.Body).enable = false
  }

  update(time: number, delta: number) {
    const dt = delta / 1000
    const frozen = time < this.freezeUntil
    const frenzy = time < this.frenzyUntil

    this.player.update(this.state)
    this.axe.update(dt, this.player, this.state, frenzy ? BALANCE.pickup.frenzySpinMult : 1)

    // Zombies: move, latch, drain tower
    let latched = 0
    const dps = zombieTowerDps(this.state.kills)
    for (const z of this.zombies.getMatching('active', true) as Zombie[]) {
      z.update(frozen, this.tower.x, this.tower.y)
      if (z.latched) {
        latched++
        if (!frozen) this.state.towerHp -= dps * dt
      }
    }

    // Player contact damage
    if (!frozen && this.physics.overlap(this.player, this.zombies)) {
      this.state.playerHp -= BALANCE.player.contactDps * dt
    }

    // Repair when touching tower (penalized while swarmed)
    if (this.physics.overlap(this.player, this.tower)) {
      const penalty = latched >= BALANCE.tower.latchPenaltyAt ? BALANCE.tower.repairPenaltyMult : 1
      this.state.towerHp = Math.min(
        this.state.towerHp + BALANCE.tower.repairRate * this.state.stats.repairRateMult * penalty * dt,
        towerMaxHp(this.state),
      )
    }

    // Two loss conditions: tower or player
    if (this.state.towerHp <= 0 || this.state.playerHp <= 0) {
      this.scene.start('game-over', { score: this.state.score })
    }
  }
}
