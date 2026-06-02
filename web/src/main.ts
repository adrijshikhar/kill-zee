import Phaser from 'phaser'
import { BootScene } from './scenes/BootScene'

new Phaser.Game({
  type: Phaser.AUTO,
  width: 960,
  height: 640,
  parent: 'game',
  backgroundColor: '#35243d',
  physics: { default: 'arcade' },
  scene: [BootScene],
})
