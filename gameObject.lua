function getGameObject(x, y, vx, vy, size, health)
    obj = {}
    obj.x = x
    obj.y = y
    obj.size = size
    obj.vx = vx
    obj.vy = vy
    obj.health = health
    obj.Yangle = 0
    return obj
end