require "utility"
require "init"
require "draw"
require "updateObjects"

function love.load()
  init()
end

function love.update(dt)
	updateObjects(dt)
end

function love.draw()
	drawObjects()
end


