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
    var l1_x = this.p2[0] - this.p1[0];
    var l1_y = this.p2[1] - this.p1[1];
    var l2_x = this.p2[0] - this.p3[0];
    var l2_y = this.p2[1] - this.p3[1];
    var lines = [];
    var intersections = [this.p1];
    for (var i = 1; i <= this.subdivisions; i++) {
        var dx_1 = l1_x / -~this.subdivisions;
        var dy_1 = l1_y / -~this.subdivisions;
        var dx_2 = l2_x / -~this.subdivisions;
        var dy_2 = l2_y / -~this.subdivisions;
        var sub1_x = this.p1[0] + i * dx_1;
        var sub1_y = this.p1[1] + i * dy_1;
        var sub2_x = this.p3[0] + i * dx_2;
        var sub2_y = this.p3[1] + i * dy_2;

        strokeWeight(2);
        stroke(129, 0, 168);
        if (i === this.subdivisions) {
            // Last subdivision
            var tempLine1 = [this.p3[0], this.p3[1], sub1_x, sub1_y]
            var tempLine2 = [this.p1[0], this.p1[1], sub2_x, sub2_y];
            line(tempLine1[0], tempLine1[1], tempLine1[2], tempLine1[3]);
            line(tempLine2[0], tempLine2[1], tempLine2[2], tempLine2[3]);
            lines.unshift(tempLine2);
            lines.push(tempLine1);
        } else {
            var tempLine = [sub1_x, sub1_y, this.p2[0] + ~i * dx_2, this.p2[1] + ~i * dy_2];
            line(tempLine[0], tempLine[1], tempLine[2], tempLine[3]);
            lines.push(tempLine);
        }

        strokeWeight(5);
        stroke(171, 255, 25);
        point(sub1_x, sub1_y);
        point(sub2_x, sub2_y);
    }

    for (var i = 0; i < lines.length - 1; i++) {
        var intersect = this.findIntersection(lines[i], lines[i + 1]);
        intersections.push(intersect);
    }
    intersections.push(this.p3);

    // Connect new points
    strokeWeight(5);
    stroke(17, 3, 105);
    for (var i = 0; i < intersections.length - 1; i++) {
        line(intersections[i][0], intersections[i][1], intersections[i + 1][0], intersections[i + 1][1]);
    }

    // Show intersections
    strokeWeight(5);
    stroke(245, 66, 123);
    for (var i = 0; i < intersections.length; i++) {
        point(intersections[i][0], intersections[i][1]);
    }

    // Draw points
    strokeWeight(10);
    stroke(255, 130, 46);
    point(this.p1[0], this.p1[1]);
    point(this.p2[0], this.p2[1]);
    point(this.p3[0], this.p3[1]);
}

StringArt.prototype.findIntersection = function(line1, line2) {
    // Unpack variables
    var x1 = line1[0];
    var y1 = line1[1];
    var x2 = line1[2];
    var y2 = line1[3];
    var x3 = line2[0];
    var y3 = line2[1];
    var x4 = line2[2];
    var y4 = line2[3];

    // y - y1 = m(x - x1)
    var m1 = (y2 - y1) / (x2 - x1);
    var m2 = (y4 - y3) / (x4 - x3);
    var mx_1 = m1 * x1;
    var mx_2 = m2 * x3;

    // y - y1 = m1(x - x1)
    // y - y1 = m1*x - m1*x1
    // y = m1*x - m1*x1 + y1
    var b1 = y1 - mx_1;
    var b2 = y3 - mx_2;

    // m1*x + b1 = m2*x + b2
    var x_int = (b2 - b1) / (m1 - m2);
    var y_int = m1 * x_int + b1;
    return [x_int, y_int];
}