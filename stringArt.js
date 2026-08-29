function StringArt(p1, p2, p3, subdivisions) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.subdivisions = subdivisions;
}

StringArt.prototype.draw = function() {
    this.drawWeb();
}

StringArt.prototype.drawWeb = function() {
    // Connect points
    strokeWeight(5);
    stroke(45, 247, 244);
    line(this.p1[0], this.p1[1], this.p2[0], this.p2[1]);
    line(this.p2[0], this.p2[1], this.p3[0], this.p3[1]);

    // Draw subdivisions
    strokeWeight(5);
    stroke(171, 255, 25);
    var l1_x = Math.abs(this.p2[0] - this.p1[0]);
    var l1_y = Math.abs(this.p2[1] - this.p1[1]);
    for (var i = 1; i <= this.subdivisions; i++) {
        point(this.p1[0] + i * l1_x / -~this.subdivisions, this.p1[1] + i * l1_y / -~this.subdivisions);
    }

    // Draw points
    strokeWeight(10);
    stroke(255, 130, 46);
    point(this.p1[0], this.p1[1]);
    point(this.p2[0], this.p2[1]);
    point(this.p3[0], this.p3[1]);
}