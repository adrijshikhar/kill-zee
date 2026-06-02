import Phaser from 'phaser'
import { drawCards } from '../systems/Upgrades'
import type { RunState } from '../state/RunState'

export class UpgradeScene extends Phaser.Scene {
  constructor() {
    super('upgrade')
  }

  create(data: { state: RunState }) {
    const { width, height } = this.scale
    this.add.rectangle(0, 0, width, height, 0x1a1220, 0.85).setOrigin(0)
    this.add
      .text(width / 2, 90, `WAVE ${data.state.wave} CLEARED — CHOOSE ONE`, {
        fontSize: '28px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)

    const cards = drawCards(Math.random)
    cards.forEach((card, i) => {
      const x = width / 2 + (i - 1) * 240
      const y = height / 2
      const bg = this.add
        .rectangle(x, y, 200, 240, 0x35243d)
        .setStrokeStyle(2, 0x6abe30)
        .setInteractive({ useHandCursor: true })
      const name = this.add
        .text(x, y - 60, card.name, { fontSize: '22px', color: '#6abe30', fontStyle: 'bold' })
        .setOrigin(0.5)
      const desc = this.add
        .text(x, y, card.description, {
          fontSize: '16px',
          color: '#ffffff',
          wordWrap: { width: 180 },
          align: 'center',
        })
        .setOrigin(0.5)

      bg.on('pointerover', () => {
        this.tweens.killTweensOf([bg, name, desc])
        this.tweens.add({ targets: [bg, name, desc], scale: 1.05, duration: 100 })
      })
      bg.on('pointerout', () => {
        this.tweens.killTweensOf([bg, name, desc])
        this.tweens.add({ targets: [bg, name, desc], scale: 1, duration: 100 })
      })
      bg.on('pointerdown', () => {
        card.apply(data.state)
        this.scene.stop()
        this.scene.resume('game')
      })
    })
  }
}
