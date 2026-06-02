import Phaser from 'phaser'
import { playerMaxHp, towerMaxHp, type RunState } from '../state/RunState'

const BAR_W = 180
const BAR_H = 12

export class Hud {
  private waveText: Phaser.GameObjects.Text
  private scoreText: Phaser.GameObjects.Text
  private bars: Phaser.GameObjects.Graphics

  constructor(scene: Phaser.Scene) {
    this.waveText = scene.add.text(16, 12, '', { fontSize: '18px', color: '#ffffff' }).setDepth(10)
    this.scoreText = scene.add
      .text(scene.scale.width - 16, 12, '', { fontSize: '18px', color: '#ffffff' })
      .setOrigin(1, 0)
      .setDepth(10)
    this.bars = scene.add.graphics().setDepth(10)
    scene.add.text(16 + BAR_W + 8, 40, 'TOWER', { fontSize: '11px', color: '#aaaaaa' }).setDepth(10)
    scene.add.text(16 + BAR_W + 8, 60, 'YOU', { fontSize: '11px', color: '#aaaaaa' }).setDepth(10)
  }

  update(state: RunState) {
    this.waveText.setText(`WAVE ${state.wave}`)
    this.scoreText.setText(`SCORE ${state.score}`)
    this.bars.clear()
    this.drawBar(16, 40, state.towerHp / towerMaxHp(state), 0x6abe30)
    this.drawBar(16, 60, state.playerHp / playerMaxHp(state), 0xfbf236)
  }

  private drawBar(x: number, y: number, frac: number, color: number) {
    this.bars.fillStyle(0x000000, 0.5).fillRect(x, y, BAR_W, BAR_H)
    this.bars.fillStyle(color, 1).fillRect(x, y, Phaser.Math.Clamp(frac, 0, 1) * BAR_W, BAR_H)
  }
}
