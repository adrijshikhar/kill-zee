require "utility"
require "config"

bloodSplashIndex = 1
function updateObjects(dt)
    updateTower(dt)
    view_arc_angle = view_arc_angle + WEAPON_SWING_SPEED * dt
    playerAxe.Yangle = view_arc_angle
    updateObject(tower, dt)
    -- zombie tower collision
    for i = 1, ENEMY_COUNT do
        updateObject(enemies[i], dt)
        if (distance(enemies[i].x, enemies[i].y, tower.x, tower.y) < tower.size + enemies[i].size) then
            enemies[i].vx = 0
            enemies[i].vy = 0
            tower.health = tower.health - TOWER_DAMAGE_SPEED * dt
        end
        if (distance(enemies[i].x, enemies[i].y, player.x, player.y) < WEAPON_SIZE_FACTOR * player.size) then
            removeEnemy(enemies[i], bloodSplashes[bloodSplashIndex], bloodSplashIndex)

            score = score + 1
            TOWER_DAMAGE_SPEED = TOWER_DAMAGE_SPEED + DAMAGE_INCREASE_RATE
        end
    end
    for i = 1, ENEMY_COUNT do
        if bloodSplashes[i].timeOut > 0 then
            bloodSplashes[i].timeOut = bloodSplashes[i].timeOut - 1 * dt
        else
            initBloodSplash(bloodSplashes[i], tower.x, tower.y)
        end
    end

    -- repair tower
    updateObject(player, dt)
    if (distance(player.x, player.y, tower.x, tower.y) < tower.size + player.size) then
        local length = distance(player.x, player.y, tower.x, tower.y)
        local x = (player.x - tower.x) / length
        local y = (player.y - tower.y) / length
        player.x = x * (tower.size + player.size) + tower.x
        player.y = y * (tower.size + player.size) + tower.y
        tower.health = tower.health + TOWER_REPAIR_SPEED * dt
    end

    if (tower.health <= 0) then
        gameOver = 1
    end
    if (tower.health < 0) then
        tower.health = 0
    end
    if (tower.health > 100) then
        tower.health = 100
    end

    -- bounding player to screen
    boundPlayerToScreen(player)
    playerAxe.x, playerAxe.y = player.x, player.y
end

function removeEnemy(enemy, bloodSplash, index)
    if index < BLOOD_SPLASH_COUNT then
        bloodSplashIndex = bloodSplashIndex + 1
    else
        bloodSplashIndex = 1
    end
    playSound(bloodSplashSound)
    initBloodSplash(bloodSplash, enemy.x, enemy.y)
    initEnemy(enemy)
end

function love.mousepressed(x, y, button)
    if gameOver == -1 then
        if
            button == 1 and x >= playbutton.x and x < playbutton.x + playnowbg:getWidth() and y >= playbutton.y and
                y < playbutton.y + playnowbg:getHeight()
         then
            gameOver = 0
            loadGraphics()
            init()
        end
    elseif (button == 1 and gameOver == 0) then
        local length = distance(player.x, player.y, x, y)
        player.vx = PLAYER_MAX_VELOCITY * (x - player.x) / length
        player.vy = PLAYER_MAX_VELOCITY * (y - player.y) / length
        playerAxe.vx = player.vx
        playerAxe.vy = player.vy
        player.destX, player.destY = x, y
    end
end

function boundPlayerToScreen(player)
    if (player.x < player.size) then
        player.x = player.size
    end
    if (player.y < player.size) then
        player.y = player.size
    end
    if (player.x > WINDOW_WIDTH - player.size) then
        player.x = WINDOW_WIDTH - player.size
    end
    if (player.y > WINDOW_HEIGHT - player.size) then
        player.y = WINDOW_HEIGHT - player.size
    end
end

function updateTower(dt)
    towerMeter.currentFrame = (towerMeter.currentFrame + 10 * dt) % 5
    towerMeter.currentMeter = 2
    if (tower.health > 20) then
        towerMeter.currentMeter = 1
    end
    if (tower.health > 50) then
        towerMeter.currentMeter = 0
    end
end
