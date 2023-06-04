

var matrix = [
    [0, 2, 1, 4, 0, 1, 0, 1, 2, 0, 1, 1, 3, 4, 5,1, 2, 3, 5,3, 1, 2, 3, 5,],
    [1, 2, 2, 0, 3, 1, 1, 2, 4, 5, 1, 1, 5, 2, 3,1, 2, 3, 5,1, 1, 2, 4, 5,],
    [0, 1, 0, 1, 2, 1, 2, 3, 4, 2, 1, 1, 4, 3, 1,1, 2, 3, 5,1, 1, 2, 4, 5,],
    [0, 0, 1, 1, 0, 1, 0, 2, 2, 0, 1, 3, 5, 0, 2,1, 2, 3, 5,1, 1, 2, 4, 5,],
    [1, 1, 0, 1, 0, 1, 3, 4, 5, 2, 5, 1, 2, 3, 5,1, 2, 3, 5,1, 1, 2, 4, 5,],
    [0, 1, 4, 3, 0, 1, 2, 3, 0, 2, 1, 1, 2, 3, 1,1, 2, 3, 5,1, 1, 2, 4, 5,],
    [0, 0, 1, 3, 0, 1, 0, 2, 2, 0, 1, 3, 3, 4, 5,1, 2, 3, 5,1, 1, 2, 4, 5,],
    [0, 1, 0, 2, 0, 0, 1, 0, 2, 0, 5, 1, 2, 3, 2,1, 2, 3, 5,1, 1, 2, 4, 5,],
    [1, 1, 3, 0, 0, 1, 2, 2, 0, 2, 0, 1, 3, 4, 5,1, 2, 3, 5,1, 1, 2, 4, 5,],
    [1, 1, 0, 2, 0, 5, 1, 4, 5, 0, 1, 1, 2, 1, 3,1, 2, 1, 3,1, 1, 2, 4, 5,],
    [1, 1, 0, 2, 0, 1, 2, 3, 4, 5, 4, 1, 2, 1, 3,1, 2, 3, 5,3, 1, 2, 3, 5,],
    [1, 1, 0, 2, 0, 5, 1, 0, 2, 4, 1, 1, 2, 1, 4,1, 2, 1, 3,3, 1, 2, 3, 5,],
    [1, 1, 0, 2, 0, 5, 1, 4, 5, 0, 1, 1, 2, 1, 3,1, 2, 1, 3,3, 1, 2, 3, 5,],
    [1, 1, 0, 2, 0, 1, 2, 3, 4, 5, 4, 1, 2, 1, 3,1, 2, 3, 5,3, 1, 2, 3, 5,],
    [1, 1, 0, 2, 0, 5, 1, 0, 2, 4, 1, 1, 2, 1, 4,1, 2, 1, 3,3, 1, 2, 3, 5,],
    [1, 1, 0, 2, 0, 5, 1, 4, 5, 0, 1, 1, 2, 1, 3,1, 2, 1, 3,3, 1, 2, 3, 5,],
    [1, 1, 0, 2, 0, 1, 2, 3, 4, 5, 4, 1, 2, 1, 3,1, 2, 3, 5,3, 1, 2, 3, 5,],
    [1, 1, 0, 2, 0, 5, 1, 0, 2, 4, 1, 1, 2, 1, 4,1, 2, 1, 3,3, 1, 2, 3, 5,],
];

var side = 30;

var grassArr = []
var grassEaterArr = []
var predatorArr = []
var randomArr = []
var goodArr = []
var energy = 5;

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1)
                grassArr.push(gr)
            }

            else if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y, 2)
                grassEaterArr.push(grEater)

            }
            else if (matrix[y][x] == 3) {
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

        }
    }
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red")
            }
            else if (matrix[y][x] == 4) {
                fill("pink")
            }
            else if (matrix[y][x] == 5) {
                fill(0, 0, 0)
            }
            rect(x * side, y * side, side, side);
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
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
}

