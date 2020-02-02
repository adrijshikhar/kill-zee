
function drawObjects()

    drawImage(tower, towerSprite)
    for i = 1, ENEMY_COUNT do 
        drawImage(enemies[i],zombieSprites[0])    
    end
    drawImage(player,playerSprites[0])
    local frame = math.floor(towerMeter.currentFrame)
    local meter = towerMeter.currentMeter
    drawImage(towerMeter, towerMeters[meter][frame]);
    love.graphics.arc( "fill", player.x, player.y, player.size * WEAPON_SIZE_FACTOR  ,view_arc_angle,view_arc_angle + math.pi/6 )


    love.graphics.print(tower.health, 100)
    love.graphics.print(score, 600)
end


