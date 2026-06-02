import Phaser from 'phaser'
import { BALANCE } from '../config/balance'

interface PlaceholderSpec {
  key: string
  radius: number
  color: number
}

export const PLACEHOLDERS: PlaceholderSpec[] = [
  { key: 'zombie', radius: BALANCE.zombie.radius, color: 0x6abe30 },
  { key: 'player', radius: BALANCE.player.radius, color: 0xfbf236 },
  { key: 'axe', radius: BALANCE.axe.radius, color: 0xcbdbfc },
  { key: 'tower-tex', radius: BALANCE.tower.radius, color: 0x847e87 },
  { key: 'pickup-heart', radius: 10, color: 0xd95763 },
  { key: 'pickup-bandage', radius: 10, color: 0xffffff },
  { key: 'pickup-frenzy', radius: 10, color: 0xfbf236 },
  { key: 'pickup-freeze', radius: 10, color: 0x5b6ee1 },
  { key: 'particle', radius: 4, color: 0xd95763 },
]

export class BootScene extends Phaser.Scene {
  constructor() {
    super('boot')
  }

  preload() {
    this.load.setPath('assets')
    for (const spec of PLACEHOLDERS) {
      this.load.image(spec.key, `${spec.key}.png`)
    }
    for (const key of ['hit', 'pickup', 'warning', 'music']) {
      this.load.audio(key, `audio/${key}.ogg`)
    }
    // Missing files just warn; create() generates placeholder textures for them.
    this.load.on('loaderror', (file: Phaser.Loader.File) => {
      console.warn(`asset missing, using placeholder: ${file.key}`)
    })
  }

  create() {
    // Generate a placeholder texture for any key not loaded from disk.
    for (const spec of PLACEHOLDERS) {
      if (this.textures.exists(spec.key)) continue
      const g = this.add.graphics()
      g.fillStyle(spec.color, 1)
      g.fillCircle(spec.radius, spec.radius, spec.radius)
      g.generateTexture(spec.key, spec.radius * 2, spec.radius * 2)
      g.destroy()
    }
    this.scene.start('menu')
  }
}
