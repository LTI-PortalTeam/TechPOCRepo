local stringTable = {}
local i=0;
local appendedValue = ""
for word in string.gmatch(ARGV[1],"[^%s]+") do
stringTable[i] = word
redis.call('hmset',KEYS[1],i,stringTable[i])
appendedValue = appendedValue.." "..stringTable[i]
i=i+1;
end
return appendedValue
