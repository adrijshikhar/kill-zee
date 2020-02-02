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
end