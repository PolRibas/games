'use strict';

function Position(canvas, pixelDimention, positionY) {
    this.canvas = canvas;
    this.pixelDimention = pixelDimention;
    this.ctx = canvas.getContext('2d')
    this.x = 0;
    this.y = positionY;
    this.dx = this.canvas.width;
    this.dy = pixelDimention;
    this.color = 'gray'
}

Position.prototype.move = function () {
}

Position.prototype.draw = function () {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.dx, this.dy);
}
