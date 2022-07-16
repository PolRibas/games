'use strict';

function Trunks(canvas, pixelDimention, positionY, firstPosition, player, velocity) {
    this.canvas = canvas;
    this.player = player;
    this.pixelDimention = pixelDimention;
    this.ctx = canvas.getContext('2d')
    this.direction = Math.random() > 0.5 ? 1 : -1;
    this.x = 0;
    this.y = positionY;
    this.dx = this.canvas.width;
    this.dy = pixelDimention;
    this.velocity = velocity
    this.color = 'cyan'
    this.carsX = 5 * pixelDimention,
        this.cars = [0, 1, 2, 3, 4, 5, 6].map(x => {
            const carImage = new Image()
            carImage.src = './src/assets/tronki.png'
            return {
                positionX: firstPosition + (x * pixelDimention * 8),
                img: carImage,
            }
        })
}


Trunks.prototype.move = function () {
    this.cars = this.cars.map(trunk => {
        var bottomTop = this.player.y + this.player.dy > this.y + (this.pixelDimention / 2);
        var topBottom = this.player.y < (this.y + this.dy - (this.pixelDimention / 2));
        var rightLeft = this.player.x + this.player.dx >= trunk.positionX;
        var leftRight = this.player.x <= trunk.positionX + this.carsX;
        if (bottomTop && topBottom && rightLeft && leftRight) {
            this.player.x = this.player.x + (this.velocity * this.direction)
        }
        return {
            ...trunk,
            positionX: trunk.positionX + (this.velocity * this.direction)
        }
    }).filter(car => (this.direction === 1 && car.positionX <= this.canvas.width) || this.direction === - 1)
    if (this.direction === 1 && this.cars.reduce((acc, x) => x.positionX < acc ? x.positionX : acc, this.pixelDimention * 18) > this.pixelDimention * 8) {
        const carImage = new Image()
        carImage.src = './src/assets/tronki.png'
        this.cars.push({
            positionX: -this.carsX,
            img: carImage,
        })
    }
    if (this.direction === -1 &&
        this.cars.reduce((acc, x) => x.positionX > acc ?
            x.positionX : acc, 0) < this.canvas.width + this.carsX) {
        const carImage = new Image()
        carImage.src = './src/assets/tronki.png'
        this.cars.push({
            positionX: this.canvas.width + this.carsX + this.pixelDimention * 18,
            img: carImage,
        })
    }
}

Trunks.prototype.draw = function () {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.dx, this.dy);
    this.ctx.fillStyle = 'brown';
    this.cars.forEach(car => {
        // this.ctx.fillRect(car.positionX, this.y, this.carsX, this.pixelDimention);
        this.ctx.drawImage(car.img, car.positionX, this.y, this.carsX, this.pixelDimention);
        // this.ctx.fillRect(car.positionX, this.y, this.carsX, this.pixelDimention);
    })
}
