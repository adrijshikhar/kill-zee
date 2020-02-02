
function drawObjects()

    drawImage(tower, towerSprite)
    for i = 1, ENEMY_COUNT do 
        drawImage(enemies[i],zombieSprites[0])    
    end
    drawCircle(player)
    drawImage(player,playerSprites[0])
    -- love.graphics.setColor(0, 0, 1)
    -- drawCircle(tower)
    -- love.graphics.setColor(1, 0, 0)
    -- drawCircle(player)
    -- love.graphics.setColor(1, 1, 1)
    love.graphics.arc( "fill", player.x, player.y, player.size * WEAPON_SIZE_FACTOR  ,view_arc_angle,view_arc_angle + math.pi/6 )
end


