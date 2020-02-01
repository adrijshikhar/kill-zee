require "utility"
require "config"

function updateObjects(dt)
    updateObject(player, dt)
    updateObject(tower, dt)
    for i = 1, ENEMY_COUNT do
        updateObject(enemies[i], dt)
        if (distance(enemies[i].x, enemies[i].y, tower.x, tower.y) < tower.size + enemies[i].size) then
            enemies[i].vx = 0
            enemies[i].vy = 0
        end
    end

    -- bounding player to screen
    boundPlayerToScreen(player)
end

function removeEnemy(object)
    initEnemy(object)
end

function love.mousepressed(x, y, button)
    if button == 1 then
        local length = distance(player.x, player.y, x, y)
        player.vx = PLAYER_MAX_VELOCITY * (x - player.x) / length
        player.vy = PLAYER_MAX_VELOCITY * (y - player.y) / length
    end
end


function boundPlayerToScreen(player)
    if (player.x < player.size) then
    player.x = player.size
    end
    if (player.y < player.size) then
    player.y = player.size
    end
    if (player.x > WINDOW_WIDTH-player.size) then
    player.x = WINDOW_WIDTH-player.size
    end
    if (player.y > WINDOW_HEIGHT-player.size) then
    player.y =WINDOW_HEIGHT-player.size
    end
end