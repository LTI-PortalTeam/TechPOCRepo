print("Hello World")
name = "Sandeep"
io.write("Size of String ",#name,"\n")
name = 4
io.write("My Name is ",name, "\n")

bigNum = 9223372036854775807+1;
io.write("Biggest Number is ",type(bigNum),"\n")

longString = [[I am very very long String that goes for ever]]
io.write("Long String ", longString..name ,"\n")

isAbletoDrive = true

io.write(type(isAbletoDrive),"\n")
io.write(type(isAble),"\n")

io.write("5 + 3 = ",5+3,"\n")
io.write("5 - 3 = ",5-3,"\n")
io.write("5 * 3 = ",5*3,"\n")
io.write("5 / 3 = ",5/3,"\n")
io.write("5 % 3 = ",5%3,"\n")

io.write("floor(2.345) : ",math.floor(2.345),"\n")
io.write("ceil(2.345) : ",math.ceil(2.345),"\n")
io.write("max(2,3) : ",math.max(2,3),"\n")
io.write("min(2,3) : ",math.min(2,3),"\n")
io.write("pow(8,2) : ",math.pow(8,2),"\n")
io.write("sqrt(64) : ",math.sqrt(64),"\n")
io.write("log 10(100) : ",math.log10(100),"\n")
io.write("Random (5,100) : ",math.random(10),"\n")

print(string.format("PI %.10f",math.pi))
print(string.format("not true = %s",tostring(not true)))
--Relational Operator > < >= <= == ~=
age = 19
if (age < 16) then
	io.write("You can go to school ","\n")
elseif (age >= 16) and (age < 18) then 
	io.write("You can drive ","\n")
else
	io.write("you can vote","\n")
end

canVote = age > 18 and true or false
io.write("Can Vote ",tostring(canVote),"\n")

--Logcal Operator and or not  

quote = "In Lua, the concept of what is a letter is locale dependent. Therefore, with a proper locale, you can use variable names such as índice or ação. However, such names will make your program unsuitable to run in systems that do not support that locale."
io.write("Quote Length ",string.len(quote),"\n")
io.write("Quote Length ",#quote,"\n")
io.write("Replace I with me  ",string.gsub(quote,"I", "me"),"\n")


i=1
while(i<=10) do 
io.write(i)
i= i+1;
if(i==8)
then 
break
end
end
print("\n")


for i=0,10,1 do
io.write(i)
end
print("\n")

months={"January","Feburary","March","April","May","June", "July","August","September","Octtober","Novemeber","December"}

for key, value in pairs(months) do
io.write(value ," ")
end

aTable ={}
for i=1,10,1 do 
aTable[i]=i
end
print("\n")
for i=1,10,1 do
io.write(aTable[i],"\n")
end
print("\n")
io.write("First element : ",aTable[1],"\n")
io.write("Number of Items before insert : ",#aTable,"\n")
table.insert(aTable,1,0)
io.write("Number of Items After Insert : ",#aTable,"\n")

print(table.concat(aTable,","))
table.remove(aTable,1)
print(table.concat(aTable,","))

multiTable = {}
for i=0,9,1 do
	multiTable[i]={}
for j=0,9,1 do
	multiTable[i][j]=tostring(i)..tostring(j)
end
end

for i=0,9,1 do
for j=0,9,1 do
io.write(multiTable[i][j], " : ")
end
print()
end

function getSum(num1,num2)
return num1+num2
end

print(string.format("5 + 2 = %d",getSum(5,2)))

function spiltString(String)
stringTable = {}
local i=0;
for word in string.gmatch(String,"[^%s]+") do
stringTable[i] = word
i=i+1;
end
return stringTable,i
end

stringTable , noOfString = spiltString("Hello My Name is Sandeep")

for i=0,noOfString-1 do
print(string.format("%d : %s",i,stringTable[i]))
end

function getSumMore(...)
local sum = 0

for k,v in pairs{...} do
sum = sum+v
end
return sum
end

io.write("Sum of Number : ", getSumMore(1,2,3,4,5,6,7,8,9,10),"\n")

doubleIt = function(x) return x*2 end
print(doubleIt(4))

function outerFunction()
local i=0
return function()
	i=i+1
	return i
	end
end

getI = outerFunction()


print(getI())
print(getI())
print(getI())
print(getI())
print(getI())

co = coroutine.create(
function()
	for i=0,10,1 do
	print(i)
	print(coroutine.status(co))
	if i==5 then coroutine.yield(co) end
	end
end
)
print(coroutine.status(co))
coroutine.resume(co)
print(coroutine.status(co))



co2 = coroutine.create(
function()
	for i=101 ,110, 1 do
	print(i)
	end
end
)

coroutine.resume(co2)
coroutine.resume(co)


print(coroutine.status(co2))
print(coroutine.status(co))

file = io.open("test.lua","w+")
file:write("Random String of text\n")
file:write("Some More text \n")
file:seek("set",0)
print(file:read("*a"))
file:close()


file = io.open("test.lua","a+")
file:write("Random String of text\n")
file:write("Some More text \n")
file:seek("set",0)
print(file:read("*a"))
file:close()

convertModule = require("convert")
print(string.format("%.3f cms",convertModule.ftToCm(12)))


aTable = {}
for i =1,10,1 do
aTable[i] = i
end

mt = {
	__add = function(table1, table2)
			sumTable = {}
				for x=1,#table1,1 do
					if(table1[x]~=nil and table2[x]~=nil) then
					 sumTable[x] = table1[x]+table2[x]
					else
					 sumTable[x]=0
					end
				end
				return sumTable
			end,
	__eq = function(table1, table2)
		   return table1 == table2
		   end
			
}

setmetatable(aTable,mt)

sumTable ={};
sumTable = aTable + aTable;
print(table.concat(sumTable,","))
print(aTable==aTable)


Animal = {height = 0, weight= 0, name = "No Name", sound = "No Sound"}

function Animal:new(height,weight,name,sound)
setmetatable({},Animal)
self.height = height
self.weight = weight
self.name = name
self.sound = sound
return self
end

function Animal:toString()
animalStr = string.format("%s weigh %.2f lbs , %.2f tall and says %s ",self.name, self.weight, self.height,self.sound)
return animalStr
end

spot = Animal:new(10,15,"Spot","Woof")

print(spot.weight)
print(spot:toString())

Cat = Animal:new()

function Cat:new(height,weight,name,sound,favFood)
setmetatable({},Cat)
self.height = height
self.weight = weight
self.name = name
self.sound = sound
self.favFood = favFood
return self
end

function Cat:toString()
catStr = string.format("%s weigh %.2f lbs , %.2f tall and says %s and have favFood %s",self.name, self.weight, self.height,self.sound,self.favFood)
return catStr
end

cat = Cat:new(15.11587,35.55,"Push","Meow","Fish")
print(cat:toString())