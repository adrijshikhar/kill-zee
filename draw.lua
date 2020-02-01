
function drawObjects()

    drawImage(tower, towerSprite)
    for i = 1, ENEMY_COUNT do 
        drawImage(enemies[i],zombieSprites[0])    
    end
    drawImage(player,playerSprites[0])
    
end


