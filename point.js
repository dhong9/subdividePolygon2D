function Point(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
}

Point.prototype.draw = function() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.radius, this.radius);
}

Point.prototype.mouseDragged = function() {
    this.x = mouseX;
    this.y = mouseY;
}