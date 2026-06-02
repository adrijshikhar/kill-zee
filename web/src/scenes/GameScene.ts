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
import { Hud } from '../ui/Hud'
import { dropChance, rollDrop, type PickupType } from '../systems/Pickups'

export class GameScene extends Phaser.Scene {
  private state!: RunState
  private player!: Player
  private axe!: Axe
  private tower!: Phaser.Physics.Arcade.Image
  private zombies!: Phaser.Physics.Arcade.Group
  private hud!: Hud
  private spawnsLeft = 0
  private frenzyUntil = 0
  private freezeUntil = 0
  private waveTransitioning = false
  private pickups!: Phaser.Physics.Arcade.Group
  private lastHurtFxAt = 0

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
    this.hud = new Hud(this)
    this.pickups = this.physics.add.group()
    this.physics.add.overlap(this.pickups, this.player, (p) =>
      this.collectPickup(p as Phaser.Physics.Arcade.Image),
    )

    this.physics.add.overlap(this.axe, this.zombies, (_axe, z) => this.hitZombie(z as Zombie))

    this.events.off(Phaser.Scenes.Events.RESUME)
    this.events.on(Phaser.Scenes.Events.RESUME, () => this.startWave(this.state.wave + 1))

    this.startWave(1)
  }

  private showBanner(text: string) {
    const t = this.add
      .text(this.scale.width / 2, 140, text, { fontSize: '40px', color: '#ffffff', fontStyle: 'bold' })
      .setOrigin(0.5)
      .setDepth(20)
      .setAlpha(0)
    this.tweens.add({ targets: t, alpha: 1, duration: 250, yoyo: true, hold: 900, onComplete: () => t.destroy() })
  }

  private startWave(n: number) {
    // Hit-pause resume timer may have been suspended by scene.pause() during wave transition.
    if (this.physics.world.isPaused) this.physics.world.resume()
    this.waveTransitioning = false
    this.state.wave = n
    this.showBanner(`WAVE ${n}`)
    this.spawnsLeft = waveZombieCount(n)
    this.time.addEvent({
      delay: spawnIntervalMs(n),
      repeat: waveZombieCount(n) - 1,
      callback: () => this.spawnZombie(),
    })
  }

  private spawnZombie() {
    const { x, y } = edgeSpawnPosition(Math.random, this.scale.width, this.scale.height)
    const z = this.zombies.get(x, y) as Zombie | null
    if (!z) return // pool exhausted; don't count as spawned
    this.spawnsLeft--
    z.spawn(x, y, zombieHp(this.state.wave), zombieSpeed(this.state.wave))
    const targetScale = z.scaleX // set by setDisplaySize in spawn()
    z.setScale(0)
    this.tweens.add({ targets: z, scale: targetScale, duration: 200, ease: 'Back.Out' })
  }

  private hitZombie(z: Zombie) {
    const now = this.time.now
    if (!z.active || now < z.nextHitAt) return
    z.nextHitAt = now + 300 // per-zombie hit cooldown so multi-hp zombies survive a pass
    z.hp -= 1
    if (z.hp <= 0) this.killZombie(z)
  }

  private killZombie(z: Zombie) {
    // Blood burst
    const burst = this.add.particles(z.x, z.y, 'particle', {
      speed: { min: 60, max: 160 },
      lifespan: 400,
      scale: { start: 1, end: 0 },
      emitting: false,
    })
    burst.explode(12)
    this.time.delayedCall(500, () => burst.destroy())

    // Hit pause
    this.physics.world.pause()
    this.time.delayedCall(40, () => this.physics.world.resume())

    this.state.score += 1
    this.state.kills += 1
    if (this.state.stats.lifesteal > 0) {
      this.state.playerHp = Math.min(this.state.playerHp + this.state.stats.lifesteal, playerMaxHp(this.state))
    }
    const drop = rollDrop(Math.random, dropChance(this.state))
    if (drop) this.spawnPickup(drop, z.x, z.y)
    this.tweens.killTweensOf(z)
    this.zombies.killAndHide(z)
    ;(z.body as Phaser.Physics.Arcade.Body).enable = false
  }

  private spawnPickup(type: PickupType, x: number, y: number) {
    const p = this.pickups.create(x, y, `pickup-${type}`) as Phaser.Physics.Arcade.Image
    p.setData('type', type)
    this.tweens.add({ targets: p, y: p.y - 6, duration: 500, yoyo: true, repeat: -1, ease: 'Sine.InOut' })
    this.time.delayedCall(BALANCE.pickup.despawnMs, () => {
      if (p.active) {
        this.tweens.killTweensOf(p)
        p.destroy()
      }
    })
  }

  private collectPickup(p: Phaser.Physics.Arcade.Image) {
    const type = p.getData('type') as PickupType
    this.tweens.killTweensOf(p)
    p.destroy()
    if (type === 'heart') {
      this.state.towerHp = Math.min(this.state.towerHp + BALANCE.pickup.heartTowerHeal, towerMaxHp(this.state))
    } else if (type === 'bandage') {
      this.state.playerHp = Math.min(this.state.playerHp + BALANCE.pickup.bandagePlayerHeal, playerMaxHp(this.state))
    } else if (type === 'frenzy') {
      this.frenzyUntil = this.time.now + BALANCE.pickup.frenzyMs
    } else if (type === 'freeze') {
      this.freezeUntil = this.time.now + BALANCE.pickup.freezeMs
    }
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
      const newlyLatched = z.update(frozen, this.tower.x, this.tower.y)
      if (newlyLatched) this.cameras.main.shake(80, 0.003)
      if (z.latched) {
        latched++
        if (!frozen) this.state.towerHp -= dps * dt
      }
    }

    if (latched > 0 && !frozen) this.tower.setTint(0xff8888)
    else this.tower.clearTint()

    // Player contact damage
    if (!frozen && this.physics.overlap(this.player, this.zombies)) {
      this.state.playerHp -= BALANCE.player.contactDps * dt
      if (time > this.lastHurtFxAt + 200) {
        this.lastHurtFxAt = time
        this.player.setTintFill(0xffffff)
        this.time.delayedCall(80, () => this.player.clearTint())
      }
    }

    // Repair when touching tower (penalized while swarmed)
    if (this.physics.overlap(this.player, this.tower)) {
      const penalty = latched >= BALANCE.tower.latchPenaltyAt ? BALANCE.tower.repairPenaltyMult : 1
      this.state.towerHp = Math.min(
        this.state.towerHp + BALANCE.tower.repairRate * this.state.stats.repairRateMult * penalty * dt,
        towerMaxHp(this.state),
      )
    }

    this.hud.update(this.state)

    // Two loss conditions: tower or player
    if (this.state.towerHp <= 0 || this.state.playerHp <= 0) {
      this.scene.start('game-over', { score: this.state.score })
      return
    }

    if (!this.waveTransitioning && this.spawnsLeft <= 0 && this.zombies.countActive() === 0) {
      this.waveTransitioning = true
      this.scene.pause()
      this.scene.launch('upgrade', { state: this.state })
    }
  }
}
