'use strict';

function Game(canvas) {
    this.player = null;
    this.isGameOver = false;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')
    this.onGameOver = null;
    this.pixelDimention = this.canvas.height / 20;
    this.positions = []
    this.streets = []
    this.trunks = []
    this.lives = 4
    this.level = 1
    this.points = 0
}

Game.prototype.randomPushEnemy = function (position) {
    if (Math.random() * 100 < (30 + this.level * 3)) {
        const velocity = this.pixelDimention * this.level / (20 + (Math.random() * 6))
        if (Math.random() > 0.5) {
            this.streets.push(
                new Streets(this.canvas,
                    this.pixelDimention,
                    position || 0, Math.random() * this.pixelDimention * 4,
                    velocity
                )
            )
        } else {
            this.trunks.push(new Trunks(this.canvas,
                this.pixelDimention,
                position || 0, Math.random() * this.pixelDimention * 4,
                this.player,
                velocity
            ))
        }
    }
}


Game.prototype.startGame = function () {
    this.player = new Player(this.canvas, this.pixelDimention);
    for (let i = this.canvas.height; i > - this.pixelDimention; i = i - this.pixelDimention) {
        if (i < this.canvas.height - 10 * this.pixelDimention) {
            this.randomPushEnemy(i)
        }
    }
    var loop = () => {
        this.update();
        this.clear(this.canvas);
        this.draw();
        if (!this.isGameOver) {
            requestAnimationFrame(loop);
        } else {
            this.onGameOver({
                level: this.level,
                points: this.points
            });
        }
    }
    loop();
}

Game.prototype.move = function () {
    this.streets.forEach(street => {
        street.move()
    })
    this.trunks.forEach(trunk => {
        trunk.move()
    })
}

Game.prototype.update = function () {
    this.move();
    this.checkCollition();
}

Game.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function () {
    this.positions.forEach(x => x.draw())
    this.streets.forEach(x => x.draw())
    this.trunks.forEach(x => x.draw())
    this.player.draw();
    this.ctx.font = "12px Arial";
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, 30);
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`points: ${this.points}`, 40, 20);
    this.ctx.fillText(`level: ${this.level}`, this.canvas.width - 100, 20);
    this.ctx.fillText(`lives: ${this.lives}`, this.canvas.width - 150, 20);

}

Game.prototype.checkCollition = function () {
    this.streets.forEach(street => {
        var bottomTop = this.player.y + this.player.dy > street.y + (this.pixelDimention / 2);
        var topBottom = this.player.y < (street.y + street.dy - (this.pixelDimention / 2));
        street.cars.forEach(car => {
            var rightLeft = this.player.x + this.player.dx >= car.positionX;
            var leftRight = this.player.x <= car.positionX + street.carsX;
            if (rightLeft && leftRight && bottomTop && topBottom) {
                this.pushRow(-1)
                this.lives = this.lives - 1
                this.player.colitionet = true
                if (this.lives === 0) {
                    this.isGameOver = true;
                }
            }
        })
    })
    this.trunks.forEach(trunk => {
        var bottomTop = this.player.y + this.player.dy > trunk.y + (this.pixelDimention / 2);
        var topBottom = this.player.y < (trunk.y + trunk.dy - (this.pixelDimention / 2));
        if (bottomTop && topBottom) {
            let onBoad = false
            trunk.cars.forEach(car => {
                var rightLeft = this.player.x + this.player.dx >= car.positionX;
                var leftRight = this.player.x <= car.positionX + trunk.carsX;
                if (rightLeft && leftRight) {
                    onBoad = true
                }
            })
            if (!onBoad) {
                this.pushRow(-1)
                this.lives = this.lives - 1
                this.player.colitionet = true
                if (this.lives === 0) {
                    this.isGameOver = true;
                }
            }
        }
    })
}

Game.prototype.gameOberCallback = function (callback) {
    this.onGameOver = callback;
}

Game.prototype.pushRow = function (newDirection) {
    if (newDirection === -1) {
        this.player.y = this.player.y + this.pixelDimention
    } else {
        if (newDirection === 1 && this.player.y > this.canvas.height / 1.5) {
            this.player.y = this.player.y - this.pixelDimention
        } else {

            this.streets = this.streets.reduce((acc, pos) => {
                if (pos.y < this.canvas.height + (this.pixelDimention * 2)) {
                    pos.y = pos.y + (this.pixelDimention * newDirection)
                    acc.push(pos)
                } else {
                    this.points = this.points + 12
                }
                return acc
            }, [])
            this.trunks = this.trunks.reduce((acc, pos) => {
                if (pos.y < this.canvas.height + (this.pixelDimention * 2)) {
                    pos.y = pos.y + (this.pixelDimention * newDirection)
                    acc.push(pos)
                } else {
                    this.points = this.points + 17
                }
                return acc
            }, [])
            this.player.setDirectionY()
            if (!this.streets.reduce((acc, street) => acc || street.y < this.pixelDimention, false)) {
                this.randomPushEnemy()
            }
            this.level = Math.floor(this.points / 200) + 1
        }
    }
}