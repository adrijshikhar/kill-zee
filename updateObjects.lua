require "utility"

function updateObjects(dt)

    updateObject(player, dt)
    updateObject(tower, dt)
    for i = 1, ENEMY_COUNT do
        
        updateObject(enemies[i], dt)
        if(distance(enemies[i].x, enemies[i].y, tower.x, tower.y) <  tower.size + enemies[i].size) then
            enemies[i].vx =  0;
            enemies[i].vy =  0;
        end
    end

end

function distance(x1, y1, x2, y2)
    return math.sqrt((x1 - x2)^2 + (y1 - y2)^2)
end