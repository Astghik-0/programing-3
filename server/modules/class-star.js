let random = require("./random");
const LivingCreature = require("./livingCreature");

module.exports = class Star extends LivingCreature {

    constructor(x, y, index) {

        super(x, y, index);
        this.energy = 3;


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
            matrix[newY][newX] = 6;

            var a = new Star(newX, newY, 6);
            predatorArr.push(a);
            this.energy = 3;
        }
    }
    eat() {
        var food = random(this.chooseCell(1, 2, 3, 4))
        if (food) {

            var newX = food[0]
            var newY = food[1]
            matrix[this.y][this.x] = 0


            if (matrix[newY][newX] == 2) {
                for (var i in grassEaterArr) {
                    if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                        grassEaterArr.splice(i, 1)

                    }
                    this.energy += 2
                }
            }
            else if (matrix[newY][newX] == 1) {
                for (var i in grassArr) {
                    if (grassArr[i].x == newX && grassArr[i].y == newY) {
                        grassArr.splice(i, 1)


                    }

                }
                this.energy += 2
            } else if (matrix[newY][newX] == 3) {
                for (var i in predatorArr) {
                    if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                        predatorArr.splice(i, 1)


                    }

                }
                this.energy += 2

            }
            else if (matrix[newY][newX] == 4) {
                for (var i in randomArr) {
                    if (randomArr[i].x == newX && randomArr.y == newY) {
                        randomArr.splice(i, 1)


                    }

                }
                this.energy += 2
            }

            matrix[newY][newX] = 5
            this.x = newX
            this.y = newY

        }
    }

    move() {
        var empty = random(this.chooseCell(0))
        this.energy--;
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in goodArr) {
                if (goodArr[i].x == this.x && goodArr[i].y == this.y) {
                    goodArr.splice(i, 1)
                    break;
                }
            }

        }
    }
}