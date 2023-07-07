let random = require("./random");
const LivingCreature = require("./LivingCreature");

module.exports = class Rrandom extends LivingCreature {

    constructor(x, y, index) {

        super(x, y, index);
        this.energy = 8;


    }


    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]

        ];
    }

    chooseCell(char) {

        this.getNewCoordinates();

        return super.chooseCell(char);

    }


    mult() {

        var newCell = random(this.chooseCell(0));
        if (newCell && this.energy >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
            var mult = new Rrandom(newX, newY, 4);
            randomArr.push(mult);
            this.energy = 0;
        }
    }

    eat() {
        var food = random(this.chooseCell(2))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 4
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1)
                }
            }
            this.energy += 2
        }
    }



    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in randomArr) {
                if (randomArr[i].x == this.x && randomArr[i].y == this.y) {
                    randomArr.splice(i, 1)
                    break;
                }
            }

        }
    }

}

