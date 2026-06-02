import Phaser from 'phaser'
import { saveBest } from '../systems/Score'

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('game-over')
  }

  create(data: { score: number }) {
    const best = saveBest(data.score)
    const { width, height } = this.scale

    this.cameras.main.shake(250, 0.01)
    this.add.rectangle(0, 0, width, height, 0x1a1220, 0.9).setOrigin(0)
    this.add.text(width / 2, height / 3, 'GAME OVER', { fontSize: '56px', color: '#d95763', fontStyle: 'bold' }).setOrigin(0.5)
    this.add.text(width / 2, height / 2, `SCORE: ${data.score}`, { fontSize: '28px', color: '#ffffff' }).setOrigin(0.5)
    this.add.text(width / 2, height / 2 + 40, `BEST: ${best}`, { fontSize: '20px', color: '#aaaaaa' }).setOrigin(0.5)

    const again = this.add
      .text(width / 2, height / 2 + 120, 'PLAY AGAIN', { fontSize: '32px', color: '#6abe30', fontStyle: 'bold' })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
    again.on('pointerover', () => again.setScale(1.1))
    again.on('pointerout', () => again.setScale(1))
    again.on('pointerdown', () => this.scene.start('game'))
  }
}
