function StringArt(p1, p2, p3, subdivisions) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.subdivisions = subdivisions;
}

StringArt.prototype.draw = function() {
    // Connect points
    strokeWeight(5);
    stroke(45, 247, 244);
    line(this.p1[0], this.p1[1], this.p2[0], this.p2[1]);
    line(this.p2[0], this.p2[1], this.p3[0], this.p3[1]);

    // Draw points
    strokeWeight(10);
    stroke(255, 130, 46);
    point(this.p1[0], this.p1[1]);
    point(this.p2[0], this.p2[1]);
    point(this.p3[0], this.p3[1]);
}