class Good {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 3;
        this.directions = []
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
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mult() {
        var newCell = random(this.chooseCell(0));
        if (newCell && this.energy >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var a = new Good(newX, newY, 5);
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
                }
            }
            else if (matrix[newY][newX] == 1) {
                for (var i in grassArr) {
                    if (grassArr[i].x == newX && grassArr[i].y == newY) {
                        grassArr.splice(i, 1)


                    }

                }
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
            }

            matrix[newY][newX] =5
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

