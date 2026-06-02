const SPAWN_MARGIN = 24 // px outside the visible arena

/** Pick a random point just outside one of the four arena edges. */
export function edgeSpawnPosition(
  rng: () => number,
  width: number,
  height: number,
): { x: number; y: number } {
  const side = Math.floor(rng() * 4)
  switch (side) {
    case 0:
      return { x: rng() * width, y: -SPAWN_MARGIN }
    case 1:
      return { x: width + SPAWN_MARGIN, y: rng() * height }
    case 2:
      return { x: rng() * width, y: height + SPAWN_MARGIN }
    default:
      return { x: -SPAWN_MARGIN, y: rng() * height }
  }
}
