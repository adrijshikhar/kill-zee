import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: '/kill-zee/',
  test: {
    environment: 'node',
    passWithNoTests: true,
  },
})
