require "utility"
require "draw"
require "updateObjects"
require "initial-game"
require "init"
function love.load()
	gameOver = -1
	backgroundMusic = love.sound.newSoundData("sounds/killZBackground.mp3")
	playBackgroundMusic(backgroundMusic)
	loadInitialGame()
end

function love.update(dt)
	if gameOver == 0 then
		updateObjects(dt)
	end
end

function love.draw()
	if gameOver == -1 then
		loadInitialGame()
	end

	if gameOver == 0 then
		drawObjects()
	end

	if (gameOver == 1) then
		love.graphics.setColor(72 / 255, 57 / 255, 79 / 255, 0.90)
		love.graphics.rectangle("fill", 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
		love.graphics.setFont(font_header, 100)
		love.graphics.setColor(1, 1, 1)

		love.graphics.print("GAME OVER", WINDOW_WIDTH / 2 - 80, WINDOW_HEIGHT / 2 - 100)
		love.graphics.print("SCORE : ", WINDOW_WIDTH / 2 - 80, WINDOW_HEIGHT / 2 - 50)
		love.graphics.print(score, WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2)
	end
end
