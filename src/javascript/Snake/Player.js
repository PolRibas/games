'use strict';

// const dogs = [
//     { x: [0, 48, 96], y: [144, 96, 48] },
// ]
const dogs = [
    { x: [0, 32, 64], y: [96, 64, 32] },
]

function Player(canvas, pixelDimention) {
    this.canvas = canvas;
    this.pixelDimention = pixelDimention;
    this.ctx = canvas.getContext('2d')
    this.x = pixelDimention * 10;
    this.y = pixelDimention * 20 - (pixelDimention * 2);
    this.dx = pixelDimention;
    this.dy = pixelDimention;
    this.lives = 3;
    this.velocity = pixelDimention;
    this.color = 'blue';
    this.positionY = 0
    this.positionSpriteX = 0
    this.positionSpriteY = 0
    this.colitionet = false
    this.colitionetDraw = false
    this.colitionettempo = 0
    this.dog = dogs[0]
    this.img = new Image();
    this.img.src = './src/assets/nena.png';
}

Player.prototype.move = function () {
    // this.y = this.y + this.directionY
    // this.x = this.x + this.directionX
}

Player.prototype.draw = function () {
    if (this.colitionet) {
        this.colitionettempo = this.colitionettempo + 1
        if (this.colitionettempo > 80) {

            this.colitionettempo = 0
            this.colitionet = false
            this.colitionetDraw = false
        } else if (this.colitionettempo % 10 === 0) {
            this.colitionetDraw = !this.colitionetDraw
        }
        if (this.colitionetDraw) {
            this.ctx.drawImage(this.img, this.dog.x[this.positionSpriteX], this.dog.y[this.positionSpriteY], 32, 32, this.x, this.y, this.dx, this.dy,);
        }
    } else {
        this.ctx.drawImage(this.img, this.dog.x[this.positionSpriteX], this.dog.y[this.positionSpriteY], 32, 32, this.x, this.y, this.dx, this.dy,);
    }
}

Player.prototype.setDirectionX = function (newDirection) {
    if (this.x + this.velocity * newDirection <= 0) {
        this.x = 0
    } else if (this.x + this.velocity * newDirection >= this.canvas.width - this.dx) {
        this.x = this.canvas.width - this.dx
    } else {
        this.x = this.x + this.velocity * newDirection
    }
    this.positionSpriteX = this.positionSpriteX === 2 ? 0 : this.positionSpriteX + 1
    this.positionSpriteY = newDirection > 0 ? 1 : 2
}
Player.prototype.setDirectionY = function (newDirection) {
    this.positionSpriteX = this.positionSpriteX === 2 ? 0 : this.positionSpriteX + 1
    this.positionSpriteY = 0
}