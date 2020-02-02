function loadInitialGame()
    function love.draw()
    love.graphics.setColor(0.20784, 0.1411764, 0.2392156)
    love.graphics.rectangle("fill", 0, 0, love.graphics.getWidth(), love.graphics.getWidth())    
    love.graphics.setColor(0.937255, 0.745, 0.1919)
    
    killzeeTitle = love.graphics.newImage("res/Kill-Zee.png")
    love.graphics.draw(killzeeTitle, 50, 100,0, 400/killzeeTitle:getWidth(), 200/killzeeTitle:getHeight())

    highScoreBox = love.graphics.newImage("res/High-score.png")
    love.graphics.draw(highScoreBox, 600, 100,0, 90/highScoreBox:getWidth(), 50/highScoreBox:getHeight() )
    highScore = love.graphics.newImage("res/3507.png")
    love.graphics.draw(highScore, 50, 400, 0, 90/highScore:getWidth(), 50/highScore:getHeight())
    
    playnowbg = love.graphics.newImage("res/rect3.png")
    love.graphics.draw(playnowbg, 50, 400)

    playnowSprite = love.graphics.newImage("res/playnow.png")
    love.graphics.draw(playnowSprite, 130, 440)

	hand = love.graphics.newImage("res/Vector.png")
    love.graphics.draw(hand, 600, 400)
end

playbutton = {}
    playbutton.x = 50
    playbutton.y = 400    
love.mousepressed()

end