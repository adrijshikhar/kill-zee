import Phaser from 'phaser'
import { loadBest } from '../systems/Score'

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('menu')
  }

  create() {
    const { width, height } = this.scale
    this.add.text(width / 2, height / 3, 'KILL-ZEE', { fontSize: '64px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5)
    this.add.text(width / 2, height / 3 + 56, `BEST: ${loadBest()}`, { fontSize: '20px', color: '#aaaaaa' }).setOrigin(0.5)
    this.add.text(width / 2, height / 3 + 88, 'WASD / arrows to move · click to move · axe spins on its own', {
      fontSize: '14px',
      color: '#888888',
    }).setOrigin(0.5)

    const play = this.add
      .text(width / 2, height / 2 + 80, 'PLAY', { fontSize: '40px', color: '#6abe30', fontStyle: 'bold' })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })

    play.on('pointerover', () => play.setScale(1.1))
    play.on('pointerout', () => play.setScale(1))
    play.on('pointerdown', () => {
      // First user gesture — web audio unlocks here (Task 16 starts music on this event).
      this.scene.start('game')
    })
  }
}
