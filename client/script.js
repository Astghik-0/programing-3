

socket = io();

var side = 20, m = 40, n = 40;
var multForGrss = 8
var multForEater = 10
var multForGood = 6
var multForPredator = 6
var multForRrondom = 5
var multForGood = 3
var multForStar = 7
var grassColor = "green"
var GrassEaterColor = "yellow"
var PredatorColor = "red"
var RrandomColor = "pink"
var GoodColor = "black"
var StarColor = "purple"
var energyforgrass = 2
var energyforgrasseater = 3
var energyforstar = 3
var energyforgood = 6
var energyforrrandom = 4
var energyforpredator = 5

function setup() {

    frameRate(40);

    createCanvas(n * side, m * side);

    background('#e8e8e8');
    button1 = document.getElementById('summer');
    button2 = document.getElementById('spring');
    button3 = document.getElementById('autumn');
    button4 = document.getElementById('winter');

    butt_on = document.getElementById('event');
    butt_on1 = document.getElementById('event2');

    button2 = document.addEventListener('click', onColorChange);
    button3 = document.addEventListener('click', onColorChange);
    button4 = document.addEventListener('click', onColorChange);
    button1 = document.addEventListener('click', onColorChange);
    butt_on = document.addEventListener('click', onColorChange);
    butt_on1 = document.addEventListener('click', onColorChange);
}
function onColorChange() {
    if (event.target.id == "summer") {
        grassColor = "#EFE703"
        GrassEaterColor = ""
        PredatorColor = "red"
        RrandomColor = "pink"
        GoodColor = "black"
        StarColor = "purple"
        multForGrss = 12
        multForEater = 10
        multForGood = 6
        multForStar = 7
        multForRrondom = 5


    } else if (event.target.id == 'spring') {
        grassColor = "#DDA637"
        GrassEaterColor = "#FFEC33"
        PredatorColor = "red"
        RrandomColor = "pink"
        GoodColor = "black"
        StarColor = "#F4B432"
        multForGrss = 12
        multForEater = 10
        multForGood = 6
        multForStar = 7
        multForRrondom = 5

    } else if (event.target.id == 'autumn') {
        grassColor = "#8ED91C"
        GrassEaterColor = ""
        PredatorColor = "red"
        RrandomColor = "pink"
        GoodColor = "black"
        StarColor = "purple"
        multForGrss = 12
        multForEater = 10
        multForGood = 6
        multForStar = 7
        multForRrondom = 5

    } else if (event.target.id == 'winter') {
        grassColor = "#37DDBE"
        GrassEaterColor = "4CAE9C"
        PredatorColor = "red"
        RrandomColor = "pink"
        GoodColor = "black"
        StarColor = "purple"
        multForGrss = 12
        multForEater = 10
        multForGood = 6
        multForStar = 7
        multForRrondom = 5
    }
    else if (event.target.id == 'event') {
        grassColor = "#37DDBE"
        GrassEaterColor = "4CAE9C"
        PredatorColor = "red"
        RrandomColor = "pink"
        GoodColor = "black"
        StarColor = "purple"
        energyforgood = 3
        energyforgrasseater = 4
        energyforpredator = 5
        energyforrrandom = 2
        energyforstar = 0
        energyforgood = 0



    }
    let data = {
        multForGrss: multForGrss,
        multForGood: multForGood,
        multForEater: multForEater,
        multForStar: multForStar,
        multForRrondom: multForRrondom,
        multForPredator: multForPredator
    }
    socket.on("matrix", drawMatrix)
    socket.emit("afterClick", data)
}

function drawMatrix(data) {

    matrix = data.matrix;

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                fill(grassColor);
            }
            else if (matrix[y][x] == 2) {
                fill(GrassEaterColor);
            }
            else if (matrix[y][x] == 3) {
                fill(PredatorColor)
            }
            else if (matrix[y][x] == 4) {
                fill(RrandomColor)
            }
            else if (matrix[y][x] == 5) {
                fill(GoodColor)
            }
            else if (matrix[y][x] == 6) {
                fill(StarColor)
            }

            rect(x * side, y * side, side, side);
        }
    }
}






socket.on("matrix", drawMatrix);
