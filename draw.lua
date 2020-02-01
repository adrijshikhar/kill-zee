function drawObjects()
    for i = 1, ENEMY_COUNT do
        drawImage(enemies[i],zombie)
       
    end
    
    love.graphics.setColor(0, 0, 1)
    drawCircle(tower)
    love.graphics.setColor(1, 0, 0)
    drawCircle(player)
end


