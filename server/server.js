
var express = require("express");
var fs = require("fs");
var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

app.use(express.static("../client"));

app.get("/", function (req, res) {

    res.redirect("index.html");

});

server.listen(5000, function () {

    console.log("App is running on port 5000");

});

grassArr = []
grassEaterArr = []
predatorArr = []
randomArr = []
goodArr = []
StarArr = []

Grass = require("./modules/class-Grass");
Predator = require("./modules/class-Predator");
GrassEater = require("./modules/class-GrassEater");
Good = require("./modules/class-Good");
Rrandom = require("./modules/class-Rrandom");
random = require("./modules/random");
Star = require("./modules/class-star")

multForGrass = 8
multForEater=6
multForPredator=7
multForGood=5
multForRrondom=3
multForStar=4
io.on("connection", function (socket) {
    socket.on("afterClick", function (data) {
        multForGrass = data.multForGrass
        multForEater=data.multForEater
        multForPredator=data.multForGood
        multForStar=data.multForStar
        multForRrondom=data.multForGood
        energyforgrass=data.energyforgrass
        energyforgrasseater=data.energyforgrasseater
        energyforpredator=data.energyforpredator
        energyforstar=data.energyforstar
    });
    setTimeout(drawForBackend , 5000);
})
energyforgrass=8
energyforgrasseater=7
energyforpredator=5
energyforrrandom=3
energyforstar=4

matrix = [
    [0, 2, 1, 1, 0, 1, 0, 1, 2, 0, 1, 6, 3, 4, 5, 1, 2, 3, 5, 3, 1, 2, 6, 5,],
    [1, 2, 2, 0, 3, 1, 1, 2, 4, 5, 1, 1, 5, 2, 3, 1, 2, 3, 5, 1, 1, 2, 4, 5,],
    [0, 1, 0, 1, 2, 1, 2, 3, 4, 2, 1, 1, 4, 3, 1, 1, 2, 6, 5, 1, 1, 6, 4, 5,],
    [0, 0, 1, 1, 6, 1, 0, 2, 2, 0, 1, 3, 5, 0, 2, 1, 2, 3, 5, 1, 1, 2, 4, 5,],
    [1, 1, 0, 1, 0, 1, 3, 4, 5, 2, 5, 6, 2, 3, 5, 1, 2, 3, 5, 1, 1, 2, 4, 5,],
    [0, 1, 4, 3, 0, 1, 2, 3, 0, 2, 1, 1, 2, 3, 1, 1, 2, 3, 5, 1, 1, 2, 4, 5,],
    [0, 0, 1, 3, 6, 1, 0, 2, 2, 0, 1, 3, 3, 4, 5, 1, 2, 3, 5, 1, 1, 2, 4, 5,],
    [0, 1, 0, 2, 0, 0, 2, 0, 2, 0, 5, 6, 2, 3, 2, 6, 2, 3, 5, 1, 1, 2, 4, 6,],
    [1, 1, 3, 0, 0, 1, 2, 2, 0, 2, 0, 1, 3, 4, 5, 1, 2, 3, 5, 1, 1, 2, 4, 5,],
    [1, 1, 0, 2, 0, 5, 1, 4, 5, 0, 1, 1, 2, 1, 3, 1, 2, 1, 3, 1, 1, 2, 4, 5,],
    [1, 1, 0, 2, 0, 1, 2, 3,4 , 5, 4, 1, 2, 1, 3, 1, 2, 3, 5, 3, 1, 2, 3, 5,],
    [1, 1, 0, 2, 0, 5, 1, 0, 2, 4, 1, 1, 2, 1, 4, 1, 2, 1, 3, 3, 1, 2, 3, 5,],
    [1, 1, 0, 2, 0, 5, 1, 4, 5, 6, 1, 1, 2, 1, 3, 1, 2, 1, 3, 3, 1, 2, 3, 5,],
    [1, 1, 0, 2, 0, 1, 2, 3, 4, 5, 4, 1, 2, 1, 3, 1, 2, 3, 5, 3, 1, 2, 3, 5,],
    [1, 1, 0, 2, 0, 5, 1, 0, 2, 4, 1, 1, 2, 1, 4, 1, 2, 3, 3, 3, 1, 2, 3, 5,],
    [1, 1, 0, 2, 0, 5, 1, 4, 5, 0, 1, 1, 2, 1, 3, 1, 2, 1, 3, 3, 1, 2, 6, 5,],
    [1, 1, 0, 2, 0, 1, 2, 3, 4, 5, 4, 1, 2, 1, 3, 1, 2, 3, 5, 3, 1, 2, 3, 5,],
    [1, 1, 0, 2, 0, 5, 1, 0, 2, 4, 1, 1, 2, 1, 4, 1, 2, 6, 3, 3, 1, 2, 3, 6,],
];

var isFemale = true
function createObjects() {


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                isFemale = !isFemale
                var gr = new Grass(x, y, 1)
                grassArr.push(gr)
            }

            else if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y, 2)
                grassEaterArr.push(grEater)

            }
            else if (matrix[y][x] == 3) {
                isFemale = !isFemale
                var grEater = new Predator(x, y, 3)
                predatorArr.push(grEater)

            }
            else if (matrix[y][x] == 4) {
                var grEater = new Rrandom(x, y, 4)
                randomArr.push(grEater)

            }
            else if (matrix[y][x] == 5) {
                var grEater = new Good(x, y, 5)
                goodArr.push(grEater)

            }
            else if (matrix[y][x] == 6) {
                var grEater = new Star(x, y, 6)
                StarArr.push(grEater)

            }

        }
    }
}
createObjects()

function getObjects() {

var  hivandutyun=true
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                hivandutyun=!hivandutyun
                var gr = new Grass(x, y, 1)
                grassArr.push(gr)
            }

            else if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y, 2)
                grassEaterArr.push(grEater)

            }
            else if (matrix[y][x] == 3) {
                hivandutyun=!hivandutyun
                var grEater = new Predator(x, y, 3)
                predatorArr.push(grEater)

            }
            else if (matrix[y][x] == 4) {
                var grEater = new Rrandom(x, y, 4)
                randomArr.push(grEater)

            }
            else if (matrix[y][x] == 5) {
                hivandutyun=!hivandutyun
                var grEater = new Good(x, y, 5)
                goodArr.push(grEater)

            }
            else if (matrix[y][x] == 6) {
                var grEater = new Star(x, y, 6)
                StarArr.push(grEater)

            }

        }
    }
}
getObjects()


function drawForBackend() {

    for (var i in grassArr) {
        grassArr[i].mul(multForGrass);
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mult();
        grassEaterArr[i].move()
        grassEaterArr[i].eat()
        grassEaterArr[i].die()
    }
    for (var i in predatorArr) {
        predatorArr[i].mult();
        predatorArr[i].move()
        predatorArr[i].eat()
        predatorArr[i].die()
    }


    for (var i in randomArr) {
        randomArr[i].mult();
        randomArr[i].eat()
        randomArr[i].die()
    }


    for (var i in goodArr) {
        goodArr[i].mult();
        goodArr[i].move()
        goodArr[i].eat()
        goodArr[i].die()
    }
    for (var i in StarArr) {
        goodArr[i].mult();
        goodArr[i].move()
        goodArr[i].eat()
        goodArr[i].die()
    }
    // for(){

    // }


    if (grassArr.length == 0) {
        for (var i = 0; i < 40; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 1;
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    if (grassEaterArr.length == 0) {
        for (var i = 0; i < 40; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 2;
            var gr = new GrassEater(x, y, 2)
            grassEaterArr.push(gr)
        }
    }


    if (predatorArr.length == 0) {
        for (var i = 0; i < 10; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 3;
            var gr = new Predator(x, y, 3)
            predatorArr.push(gr)
        }
    }

    if (goodArr.length == 0) {
        for (var i = 0; i < 1; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 4;
            var gr = new  Good (x, y, 4)
       goodArr.push(gr)
        }
    }


    if (randomArr.length == 0) {
        for (var i = 0; i < 2; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 5;
            var gr = new Rrandom (x, y, 5)
           randomArr .push(gr)
        }
    }

    if (StarArr.length == 0) {
        for (var i = 0; i < 2; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 6;
            var hum = new Star(x, y, 6)
            StarArr.push(hum)
        }
    }
    let sendData = {

        matrix: matrix

    }
    statistics = {
        grasses: grassArr.length,
        grEaters: grassEaterArr.length,
        predator: predatorArr.length,
        good: goodArr.length,
        randon: randomArr.length,
        star: StarArr.length,


    }
    

    
    fs.writeFileSync('statistics.json', JSON.stringify(statistics, undefined, 2))
    mystatistics = fs.readFileSync('statistics.json').toString()
    io.sockets.emit("sendStatistics", JSON.parse(mystatistics))

    io.sockets.emit("matrix", sendData)
}
setInterval(drawForBackend, 1000)

