class Circle {
    constructor(_x, _y, _radius, _colour) {
        this.radius = _radius;
        this.x = _x;
        this.y = _y;
        this.colour = _colour;
    }

    fillCircle() {
        renderer.beginPath();
        renderer.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        renderer.fillStyle = this.colour;
        renderer.fill();
        renderer.closePath();
    }
    
    strokeCircle(width) {
        renderer.beginPath();
        renderer.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        renderer.lineWidth = width;
        renderer.strokeStyle = this.colour;
        renderer.stroke();
        renderer.closePath();
    }
}
