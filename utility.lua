function drawCircle(circle)
	love.graphics.circle("fill", circle.x, circle.y, circle.size)
end

function updateObject(object, dt)
    object.x = object.x + object.vx * dt
    object.y = object.y + object.vy * dt
end