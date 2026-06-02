import Phaser from 'phaser'

export class BootScene extends Phaser.Scene {
  constructor() {
    super('boot')
  }

  create() {
    this.add.text(20, 20, 'kill-zee boot ok', { color: '#ffffff' })
  }
}
