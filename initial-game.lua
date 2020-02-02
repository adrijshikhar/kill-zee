require "utility"

function loadInitialGame()


    love.graphics.setColor(0.20784, 0.1411764, 0.2392156)
    love.graphics.rectangle("fill", 0, 0, love.graphics.getWidth(), love.graphics.getWidth())
    love.graphics.setColor(0.937255, 0.745, 0.1919)

    killzeeTitle = love.graphics.newImage("res/Kill-Zee.png")
    love.graphics.draw(killzeeTitle, 50, 100, 0, 400 / killzeeTitle:getWidth(), 150 / killzeeTitle:getHeight())

    playnowbg = love.graphics.newImage("res/rect3.png")
    love.graphics.draw(playnowbg, 50, 400, 0, 400 / playnowbg:getWidth(), 100 / playnowbg:getHeight())

    playnowSprite = love.graphics.newImage("res/playnow.png")
    love.graphics.draw(playnowSprite, 130, 440, 0, 240 / playnowSprite:getWidth(), 40 / playnowSprite:getHeight())

    hand = love.graphics.newImage("res/Vector.png")
    love.graphics.draw(hand, 550, 300, 0, 250 / hand:getWidth(), 300 / hand:getHeight())
    playbutton = {}
    playbutton.x = 50
    playbutton.y = 400
end
