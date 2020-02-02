require "gameObject"
require "config"
require "utility"


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
        bloodSplashes[i] = getGameObject(0, 0, 0, 0, ENEMY_SIZE * 2, 100)
        initBloodSplash(bloodSplashes[i], tower.x, tower.y)
    end
end

function initBloodSplash(bloodSplash, x, y)
    bloodSplash.x = x
    bloodSplash.y = y
    bloodSplash.vx, bloodSplash.vy = 0, 0
    bloodSplash.timeOut = BLOOD_SPLASH_TIMEOUT
end


function loadGraphics()

	zombieSprites = {}
	zombieSprites[0] = love.graphics.newImage("res/zombie0.png")
	zombieSprites[1] = love.graphics.newImage("res/zombie1.png")
	bloodSplash = love.graphics.newImage("res/blood-splash.png")
	bloodSplashSound = love.sound.newSoundData("sounds/bloodSplash.mp3")
	bloodSplash = love.graphics.newImage("res/blood-splash.png")	

	-- rgba(53, 36, 61, 0)
	r = 53/255
	g = 36/255
	b = 61/255
	love.graphics.setBackgroundColor(r,g,b,0.2)
	bloodSplash = love.graphics.newImage("res/blood-splash.png")	

	towerSprite = love.graphics.newImage("res/tower.png")

	playerSprites = {}
	playerSprites[0] = love.graphics.newImage("res/player0.png")

	towerMeters = {}
	towerMeters[0] = {}
	towerMeters[1] = {}
	towerMeters[2] = {}

	towerMeters[0][0] = love.graphics.newImage("res/greenball0.png")
	towerMeters[0][1] = love.graphics.newImage("res/greenball1.png")
	towerMeters[0][2] = love.graphics.newImage("res/greenball2.png")
	towerMeters[0][3] = love.graphics.newImage("res/greenball3.png")
	towerMeters[0][4] = love.graphics.newImage("res/greenball4.png")

	towerMeters[1][0] = love.graphics.newImage("res/blueball0.png")
	towerMeters[1][1] = love.graphics.newImage("res/blueball1.png")
	towerMeters[1][2] = love.graphics.newImage("res/blueball2.png")
	towerMeters[1][3] = love.graphics.newImage("res/blueball3.png")
	towerMeters[1][4] = love.graphics.newImage("res/blueball4.png")

	towerMeters[2][0] = love.graphics.newImage("res/redball0.png")
	towerMeters[2][1] = love.graphics.newImage("res/redball1.png")
	towerMeters[2][2] = love.graphics.newImage("res/redball2.png")
	towerMeters[2][3] = love.graphics.newImage("res/redball3.png")
	towerMeters[2][4] = love.graphics.newImage("res/redball4.png")
end
