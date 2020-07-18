
function drawObjects()

    for i = 1, BLOOD_SPLASH_COUNT do
        drawImage(bloodSplashes[i],bloodSplash)
    end
    for i = 1, ENEMY_COUNT do
        drawImage(enemies[i],zombieSprites[0])
    end
    drawImage(tower, towerSprite)
    drawPlayerAxe(playerAxe,playerSprites[1])
    drawImage(player,playerSprites[0])
    local frame = math.floor(towerMeter.currentFrame)
    local meter = towerMeter.currentMeter
    drawImage(towerMeter, towerMeters[meter][frame]);
    -- love.graphics.arc( "fill", player.x, player.y, player.size * WEAPON_SIZE_FACTOR  ,view_arc_angle,view_arc_angle + math.pi/6 )
    -- rgba(72, 57, 79, 0.75)
    love.graphics.setColor( 23/255, 23/255, 23/255, 0.75 )
    love.graphics.rectangle("fill", 95, 5, 110, 70)
    love.graphics.rectangle("fill", 595, 5, 130, 70)

    font_header = love.graphics.newFont("res/fonts/SigmarOne-Regular.ttf", 25)
    font_score = love.graphics.newFont("res/fonts/PressStart2P-Regular.ttf", 20)
    love.graphics.setFont(font_header)
    love.graphics.setColor(1,1,1)
    love.graphics.print("SCORE", 100)
    love.graphics.print("HEALTH", 600)
    love.graphics.setFont(font_score)
    love.graphics.print(math.floor(tower.health), 630,45)
    love.graphics.print(score, 135, 45)
end


