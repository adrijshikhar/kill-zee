require "gameObject"
require "config"

function init()
    font_header = love.graphics.newFont("res/fonts/SigmarOne-Regular.ttf", 25)
    font_score = love.graphics.newFont("res/fonts/PressStart2P-Regular.ttf", 20)
    initPlayer()
    initTower()
    initEnemies()
    initBloodSplashes()
    view_arc_angle = 0
    score  = 0
    gameOver = 0
end

function initPlayer()
    player = getGameObject(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2 + 200, 0, 0, PLAYER_SIZE, 100)
    player.vx, player.vy = 0, 0
end

function initTower()
    tower = getGameObject(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2, 0, 0, 50, 100)
    towerMeter = getGameObject(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2, 0, 0, 15, 100)
    towerMeter.currentFrame = 0
    towerMeter.currentMeter = 0
end

function initEnemies()
    -- The enemies array
    enemies = {}
    for i = 1, ENEMY_COUNT do
        enemies[i] = getGameObject(0, 0, 0, 0, ENEMY_SIZE, 100)
        initEnemy(enemies[i])
    end
end

function initEnemy(enemy)
    enemy.x = math.random(-WORLD_SIZE_FACTOR * WINDOW_WIDTH / 2, WORLD_SIZE_FACTOR * WINDOW_WIDTH / 2) + tower.x
    enemy.y = math.random(-WORLD_SIZE_FACTOR * WINDOW_HEIGHT / 2, WORLD_SIZE_FACTOR * WINDOW_HEIGHT / 2) + tower.y
    length = distance(tower.x, tower.y, enemy.x, enemy.y)
    enemy.vx = ENEMY_MAX_VELOCITY * (tower.x - enemy.x) / length
    enemy.vy = ENEMY_MAX_VELOCITY * (tower.y - enemy.y) / length
end

function initBloodSplashes()
    bloodSplashes = {}
    for i = 1, ENEMY_COUNT do
        bloodSplashes[i] = getGameObject(0, 0, 0, 0, ENEMY_SIZE*2, 100)
        initBloodSplash(bloodSplashes[i], tower.x, tower.y)
    end
end

function initBloodSplash(bloodSplash, x, y)
    bloodSplash.x = x
    bloodSplash.y = y
    bloodSplash.vx, bloodSplash.vy = 0, 0
    bloodSplash.timeOut = BLOOD_SPLASH_TIMEOUT
end
