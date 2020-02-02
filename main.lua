require "utility"
require "init"
require "draw"
require "updateObjects"

function love.load()
	loadGraphics()
	init()
end

function love.update(dt)
	updateObjects(dt)
end

function love.draw()
	drawObjects()
	
end


function loadGraphics()
	zombieSprites = {}
	zombieSprites[0] = love.graphics.newImage("res/zombie0.png")
	zombieSprites[1] = love.graphics.newImage("res/zombie1.png")
	
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