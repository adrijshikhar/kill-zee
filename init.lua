require "gameObject"

function init()

    WINDOW_WIDTH = love.graphics.getWidth()
    WINDOW_HEIGHT = love.graphics.getHeight()

    ENEMY_COUNT = 100
initPlayer()
initTower()
    -- The enemies array
    enemies = {}
    for i=1, ENEMY_COUNT do
        x = math.random(0, WINDOW_WIDTH * 1)
        y = math.random(0, WINDOW_HEIGHT * 1)
        enemies[i] =  getGameObject(
            x,
            y,
            tower.x - x,
            tower.y - y,
            10,
            100
        )
    end
    
    
    
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