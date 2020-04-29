local x = os.clock()
local s = 0
for i=1,100000 do s = s + i end
return os.clock() - x
    