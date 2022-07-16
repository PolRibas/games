'use strict';

function Streets(canvas, pixelDimention, positionY, firstPosition, velocity) {
    this.canvas = canvas;
    this.pixelDimention = pixelDimention;
    this.ctx = canvas.getContext('2d')
    this.x = 0;
    this.y = positionY;
    this.dx = this.canvas.width;
    this.dy = pixelDimention;
    this.velocity = velocity
    this.color = 'gray'
    this.carsX = 1.6 * pixelDimention,
        this.cars = [0, 1, 2, 3, 4, 5, 6].map(x => {
            const carImage = new Image()
            carImage.src = './src/assets/buggaty.png'
            return {
                positionX: firstPosition + (x * pixelDimention * 8),
                img: carImage,
            }
        })
}


Streets.prototype.move = function () {
    this.cars = this.cars.map(x => ({
        ...x,
        positionX: x.positionX + this.velocity
    })).filter(car => car.positionX <= this.canvas.width)
    if (this.cars.reduce((acc, x) => x.positionX < acc ? x.positionX : acc, this.pixelDimention * 18) > this.pixelDimention * 8) {
        const carImage = new Image()
        carImage.src = './src/assets/buggaty.png'
        this.cars.push({
            positionX: -this.carsX,
            img: carImage,
        })
    }
}

Streets.prototype.draw = function () {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.dx, this.dy);
    this.ctx.fillStyle = 'red';
    this.cars.forEach(car => {
        this.ctx.drawImage(car.img, car.positionX, this.y, this.carsX, this.pixelDimention);
        // this.ctx.fillRect(car.positionX, this.y, this.carsX, this.pixelDimention);
    })
}
