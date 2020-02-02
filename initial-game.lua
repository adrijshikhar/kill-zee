function loadInitialGame()
    love.graphics.setColor(53, 36, 61,0)
    love.graphics.rectangle("fill", 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
    playbutton = {}
    playbutton.x = 50
    playbutton.y = 400    
	playnowSprite = love.graphics.newImage("res/playnow.png")
    love.graphics.draw(playnowSprite)
end