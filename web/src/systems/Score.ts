const KEY = 'killzee.best'

export type StorageLike = Pick<Storage, 'getItem' | 'setItem'>

function safeStorage(): StorageLike | null {
  try {
    return globalThis.localStorage
  } catch {
    return null // private browsing / storage disabled
  }
}

export function loadBest(storage: StorageLike | null = safeStorage()): number {
  if (!storage) return 0
  try {
    const raw = storage.getItem(KEY)
    if (raw === null) return 0
    const n = Number(raw)
    return Number.isFinite(n) && n >= 0 ? n : 0
  } catch {
    return 0
  }
}

export function saveBest(score: number, storage: StorageLike | null = safeStorage()): number {
  const safeScore = Number.isFinite(score) && score >= 0 ? score : 0
  const best = Math.max(safeScore, loadBest(storage))
  if (storage) {
    try {
      storage.setItem(KEY, String(best))
    } catch {
      // private mode — best effort only
    }
  }
  return best
}
