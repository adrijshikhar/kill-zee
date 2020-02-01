require "gameObject"
require "config"
function init()
    initPlayer()
    initTower()
    initEnemies()
end

function initPlayer()
    player = getGameObject(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2 + 200, 0, 0, 10, 100)
    player.vx, player.vy = 0, 0
end

function initTower()
    tower = getGameObject(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2, 0, 0, 100, 100)
end

function initEnemies()
    -- The enemies array
    enemies = {}
    for i = 1, ENEMY_COUNT do
        enemies[i] = getGameObject(0, 0, 0, 0, 10, 100)
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
