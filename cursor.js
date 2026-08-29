function Cursor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Cursor.prototype.draw = function() {
    // Dot in the middle
    noFill();
    strokeWeight(1);
    stroke(180, 180, 0);
    ellipse(this.x, this.y, this.width / 2, this.height / 2);

    // Crosshairs
    strokeWeight(2);
    stroke(0);
    line(this.x, this.y - this.height / 2, this.x, this.y - 0.125 * this.height);
    line(this.x, this.y + this.height / 2, this.x, this.y + 0.125 * this.height);
    line(this.x - 0.125 * this.width, this.y, this.x - this.width / 2, this.y);
    line(this.x + 0.125 * this.width, this.y, this.x + this.width / 2, this.y);
}

Cursor.prototype.mousePressed = function() {
    // Move cursor on right click
    if (mouseButton.right) {
        this.x = mouseX;
        this.y = mouseY;
    }
}