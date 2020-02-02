function drawCircle(circle)
    love.graphics.circle("fill", circle.x, circle.y, circle.size)
end

function updateObject(object, dt)
    if (object=="player") 
    then
        local length = distance(object.x, object.y, object.DestX, object.destY)
        while(length > 0) do
        object.x = object.x + object.vx * dt
        object.y = object.y + object.vy * dt
        end
    else
        object.x = object.x + object.vx * dt
        object.y = object.y + object.vy * dt
    end
end

function distance(x1, y1, x2, y2)
    return math.sqrt((x1 - x2) ^ 2 + (y1 - y2) ^ 2)
end

function drawImage(object, image)
    local upVec = -1
    local rightVec = 1
    if not (object.vx == 0 and object.vy == 0) then
        object.Yangle = math.acos(upVec * object.vy / math.sqrt(object.vy ^ 2 + object.vx ^ 2))
        if object.vx < 0 then
            object.Yangle = 2 * math.pi - object.Yangle
        end
    end
    local factorX = 2 * object.size / image:getWidth()
    local factorY = 2 * object.size / image:getHeight()
    love.graphics.draw(
        image,
        (object.x),
        (object.y),
        object.Yangle,
        factorX,
        factorY,
        image:getWidth() / 2,
        image:getHeight() / 2
    )
end

function playSound(sound)
    love.audio.newSource(sound, "static"):play()
end

function playBackgroundMusic(sound)
    music = love.audio.newSource(sound,"static")
    music:setLooping(true)
    music:play()
end
