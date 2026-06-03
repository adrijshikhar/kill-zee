import Phaser from 'phaser'

/** Scale a sprite uniformly so its longest texture side becomes `displayPx`,
 *  and center a physics circle of world radius `worldRadius` on it. */
export function fitCircleBody(
  obj: Phaser.Physics.Arcade.Sprite | Phaser.Physics.Arcade.Image,
  displayPx: number,
  worldRadius: number,
): void {
  const texW = obj.width
  const texH = obj.height
  const scale = displayPx / Math.max(texW, texH)
  obj.setScale(scale)
  const texRadius = worldRadius / scale
  ;(obj.body as Phaser.Physics.Arcade.Body).setCircle(texRadius, texW / 2 - texRadius, texH / 2 - texRadius)
}
