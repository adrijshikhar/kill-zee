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
end

function love.mousepressed(x, y, button)
    if button == 1 then
        local length = distance(player.x, player.y, x, y)
        player.vx = PLAYER_MAX_VELOCITY * (x - player.x) / length
        player.vy = PLAYER_MAX_VELOCITY * (y - player.y) / length
    end
end
