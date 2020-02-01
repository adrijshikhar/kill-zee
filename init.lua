require "gameObject"

function init()

    WINDOW_WIDTH = love.graphics.getWidth()
    WINDOW_HEIGHT = love.graphics.getHeight()

    ENEMY_COUNT = 100
    ENEMY_MAX_VELOCITY = 50

    WORLD_SIZE_FACTOR = 0.5

    initPlayer()
    initTower()
    initEnemies()

end

function initPlayer()
    player 	= getGameObject(
        WINDOW_WIDTH / 2,
        WINDOW_HEIGHT / 2 + 200,
        0,
        0,
        10,
        100
    )
end

function initTower()  
    tower = getGameObject(
        WINDOW_WIDTH / 2,
        WINDOW_HEIGHT / 2,
        0,
        0,
        100,
        100
    )
end

function initEnemies()
    -- The enemies array
    enemies = {}
    for i=1, ENEMY_COUNT do
        x = math.random(- WORLD_SIZE_FACTOR * WINDOW_WIDTH/2 , WORLD_SIZE_FACTOR * WINDOW_WIDTH/2) + tower.x
        y = math.random(- WORLD_SIZE_FACTOR * WINDOW_HEIGHT/2, WORLD_SIZE_FACTOR * WINDOW_HEIGHT/2) + tower.y
        length = distance(tower.x, tower.y, x, y)
        vx = ENEMY_MAX_VELOCITY * (tower.x - x) / length;
        vy = ENEMY_MAX_VELOCITY * (tower.y - y) / length;
        
        enemies[i] =  getGameObject(
            x,
            y,
            vx,
            vy,
            10,
            100
        )
    end
end