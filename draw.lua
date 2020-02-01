function drawObjects()
    love.graphics.setColor(1, 0, 0)
    drawCircle(player)
    
    love.graphics.setColor(0, 1, 0)
    for i = 1, ENEMY_COUNT do
        drawCircle(enemies[i])
    end
    love.graphics.setColor(0, 0, 1)
	drawCircle(tower)
end