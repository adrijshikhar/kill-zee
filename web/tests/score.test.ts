import { describe, expect, it } from 'vitest'
import { loadBest, saveBest } from '../src/systems/Score'

function fakeStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial))
  return {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => {
      data.set(k, v)
    },
  }
}

describe('loadBest', () => {
  it('returns 0 when nothing stored', () => {
    expect(loadBest(fakeStorage())).toBe(0)
  })

  it('returns stored best', () => {
    expect(loadBest(fakeStorage({ 'killzee.best': '42' }))).toBe(42)
  })

  it('returns 0 for corrupt values', () => {
    expect(loadBest(fakeStorage({ 'killzee.best': 'banana' }))).toBe(0)
    expect(loadBest(fakeStorage({ 'killzee.best': '-5' }))).toBe(0)
  })

  it('returns 0 when storage is unavailable', () => {
    expect(loadBest(null)).toBe(0)
  })

  it('returns 0 when storage throws (private mode)', () => {
    const throwing = {
      getItem: () => {
        throw new Error('denied')
      },
      setItem: () => {
        throw new Error('denied')
      },
    }
    expect(loadBest(throwing)).toBe(0)
  })
})

describe('saveBest', () => {
  it('stores and returns the new best when score is higher', () => {
    const storage = fakeStorage({ 'killzee.best': '10' })
    expect(saveBest(25, storage)).toBe(25)
    expect(storage.getItem('killzee.best')).toBe('25')
  })

  it('keeps the old best when score is lower', () => {
    const storage = fakeStorage({ 'killzee.best': '100' })
    expect(saveBest(25, storage)).toBe(100)
    expect(storage.getItem('killzee.best')).toBe('100')
  })

  it('does not throw when storage throws', () => {
    const throwing = {
      getItem: () => {
        throw new Error('denied')
      },
      setItem: () => {
        throw new Error('denied')
      },
    }
    expect(saveBest(25, throwing)).toBe(25)
  })

  it('ignores non-finite scores', () => {
    const storage = fakeStorage({ 'killzee.best': '10' })
    expect(saveBest(Number.NaN, storage)).toBe(10)
    expect(saveBest(Number.POSITIVE_INFINITY, storage)).toBe(10)
    expect(storage.getItem('killzee.best')).toBe('10')
  })

  it('ignores negative scores', () => {
    const storage = fakeStorage({ 'killzee.best': '10' })
    expect(saveBest(-3, storage)).toBe(10)
    expect(storage.getItem('killzee.best')).toBe('10')
  })
})
