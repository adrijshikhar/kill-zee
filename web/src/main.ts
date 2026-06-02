import Phaser from 'phaser'
import { BootScene } from './scenes/BootScene'
import { MenuScene } from './scenes/MenuScene'
import { GameScene } from './scenes/GameScene'
import { UpgradeScene } from './scenes/UpgradeScene'
import { GameOverScene } from './scenes/GameOverScene'

new Phaser.Game({
  type: Phaser.AUTO,
  width: 960,
  height: 640,
  parent: 'game',
  backgroundColor: '#35243d',
  physics: { default: 'arcade' },
  scene: [BootScene, MenuScene, GameScene, UpgradeScene, GameOverScene],
})
