function drawCircle(circle)
    love.graphics.circle("fill", circle.x, circle.y, circle.size)
end

function updateObject(object, dt)
    object.x = object.x + object.vx * dt
    object.y = object.y + object.vy * dt
end

function distance(x1, y1, x2, y2)
    return math.sqrt((x1 - x2) ^ 2 + (y1 - y2) ^ 2)
end
