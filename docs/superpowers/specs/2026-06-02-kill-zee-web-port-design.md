# Kill-Zee Web Port — Design Spec

**Date:** 2026-06-02
**Status:** Approved pending user review
**Approach:** Fresh evolved build (not a faithful port) — the original Lua/LÖVE game is the concept seed and reference, not the codebase.

## Overview

Rebuild Kill-Zee as a browser game hosted on GitHub Pages (`adrijshikhar.github.io/kill-zee`). The original is a small LÖVE 2D top-down zombie-defense game: the player orbits a central tower with an auto-spinning axe, kills zombies that converge on the tower, and repairs the tower by touching it. The web version keeps this core identity and evolves it with waves, upgrades, pickups, a killable player, and modern game feel.

**Stack:** Phaser 3 + TypeScript + Vite. Static build, no backend.
**Branch strategy:** All work lands on the `main` branch of this repo (branched from `master`, history kept). The user will make `main` the default branch when done. GitHub Pages serves from `main`.
**Location:** New `web/` directory in this repo. The original Lua files, `res/`, and `sounds/` remain untouched as reference.

## Game Design

### Core loop

Top-down arena. Tower at center must survive. Player runs around with an auto-spinning axe. Zombies spawn at the arena edge in waves and converge on the tower.

Per wave:

1. Wave N spawns `6 + N*2` zombies spread over `10 + N` seconds; zombie speed and HP scale gently with N. (All formulas are starting values, tuned in `balance.ts`.)
2. Killing a zombie grants score and a chance of a pickup drop (base 8%, upgradeable).
3. Zombies that reach the tower latch on and drain tower HP.
4. The player repairs the tower by touching it. Repair is slower than drain when 3+ zombies are latched — forces triage.
5. Wave cleared → upgrade screen: pick 1 of 3 cards.
6. Game over when **either** tower HP or player HP reaches 0. Final score and best score (localStorage) shown.

### Player

- Player has 100 HP. Zombie contact drains player HP. Player HP 0 → game over.
- Zombies do **not** chase the player — they target the tower only, but damage the player on overlap. No chasing; chasing would change the game's identity.
- Standing at the tower repairs the **tower**, not the player. Player heals only via pickups and upgrades — keeps triage tension.
- Controls: WASD/arrow keys primary, click/tap-to-move fallback (touch-friendly).

### Risk ramp (kept from original)

Each kill nudges the zombie damage rate upward — the original's core tension between scoring and survival is preserved.

### Upgrades (pick 1 of 3 after each wave, stack across waves)

- Axe radius +15%
- Axe spin speed +20%
- Move speed +10%
- Tower repair rate +25%
- Tower max HP +20 (and heal 20)
- Pickup drop chance +5%
- Player max HP +20
- Lifesteal: each kill heals player 1 HP

### Pickups (drop on kill, despawn after 6 s if not collected)

- Heart — tower +10 HP
- Bandage — player +15 HP
- Frenzy — axe 2× spin speed, 5 s
- Freeze — zombies halt, 3 s

## Architecture

### Scenes

```
BootScene      → load assets, progress bar
MenuScene      → title, play button, best score (also unlocks web audio on first click)
GameScene      → arena, waves, HUD overlay
UpgradeScene   → pick-1-of-3 cards, overlays and pauses GameScene
GameOverScene  → score, best score, restart
```

### Module layout

```
web/src/
  config/balance.ts      → ALL tuning numbers (wave scaling, speeds, upgrade %s)
  entities/Player.ts     → movement (WASD + click), HP
  entities/Axe.ts        → orbit + hit detection
  entities/Tower.ts      → HP, repair zone, latch slots
  entities/Zombie.ts     → seek tower, latch, contact damage
  systems/WaveSpawner.ts → wave composition, edge spawning
  systems/Upgrades.ts    → card definitions, applied-stats registry
  systems/Pickups.ts     → drop rolls, timers, effects
  systems/Score.ts       → score + localStorage best
  ui/Hud.ts              → wave number, score, tower bar, player bar
```

### Data flow

One `RunState` object (current stats after upgrades, score, wave number) is owned by GameScene and passed to systems. Upgrades mutate `RunState` only — never entity internals. Entities read their stats from `RunState` each frame. Phaser arcade physics handles overlap checks (replaces the original's manual distance math).

### Error handling

- Asset load failure → BootScene shows a retry message.
- localStorage access wrapped in try/catch (private browsing mode).
- No network calls, no other failure surface.

## Assets, Juice, Audio

### Art — Kenney CC0

All-new art from [kenney.nl](https://kenney.nl) CC0 packs: top-down shooter/zombie pack for sprites, UI pack for upgrade cards and bars, Kenney audio packs for SFX. Background music from a CC0 source (Kenney or OpenGameArt). No attribution required, but credit goes in the README anyway. Original `res/` and `sounds/` stay in the repo untouched as reference.

### Juice

- Hit pause: 40 ms freeze on kill
- Screen shake: small on zombie latch, large on tower-HP milestones and game over
- Particles: blood burst on kill (Phaser particle emitter), dust trail on player run
- Tweens: zombie spawn pop-in, pickup bob, upgrade-card hover scale, score tick-up
- Tower flashes red while latched; player flashes white on hit
- Wave banner sweep ("WAVE 3") between waves

### Audio

- Looping background music
- Kill sound with ±10% random pitch variation
- Low warning tone when tower HP < 25%
- Pickup chime
- Web-audio unlock on first click, handled in MenuScene (browser autoplay policy)

### Persistence

`localStorage["killzee.best"]` — best score only. Nothing else stored in v1.

## Testing

- **Vitest** unit tests on pure logic: wave composition math, upgrade stacking, drop rolls, score persistence wrapper.
- Game logic is kept Phaser-free where possible (balance functions take numbers, return numbers) so it is testable without a canvas.
- The 80% coverage target applies to `config/` and `systems/` logic, not render code. Entities/scenes are verified primarily by playtesting, with cheap Phaser headless smoke tests where practical.

## Deploy

- GitHub Actions on push to `main`: `vite build` → deploy `dist/` to GitHub Pages via `actions/deploy-pages`.
- Vite `base: '/kill-zee/'` for the project-page path.
- Result: `adrijshikhar.github.io/kill-zee` auto-updates on every push to `main`.

## Out of Scope (v1)

- Mobile-specific UI (click-to-move works on touch, but no dedicated mobile layout)
- Online leaderboards or any backend
- Player respawn mechanics
- Zombie variety beyond speed/HP scaling
- Desktop packaging
