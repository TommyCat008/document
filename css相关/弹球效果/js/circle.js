function Circle(x, y, r, t) {
    var options = {
        friction: 0.1,
        restitution: 3,
        isStatic: true
    }
    this.body = Bodies.circle(x, y, r);
    this.r = r;
    World.add(world, this.body);

    this.show = function() {
        var pos = this.body.position;
        var angle = this.body.angle;
        // console.log('pos', pos)
        push();
        translate(pos.x, pos.y);

        rotate(angle);

        if (windowWidth > 450) {
            strokeWeight(2.5);
        } else {
            strokeWeight(1.5);
        }

        // 设置球的背景颜色
        fill('#ffd53b');
        noStroke();
        ellipse(0, 0, this.r * 2 - 2);

        // 设置球内部线条
        stroke(255, 100);
        strokeWeight(8);
        noFill();
        arc(0, 0, this.r * 2 * 0.85, this.r * 2 * 0.85, -PI / 2, -PI / 4);
        arc(0, 0, this.r * 2 * 0.85, this.r * 2 * 0.85, -PI / 6, -PI / 7);
        // 字体颜色的值
        fill(000);
        noStroke();
        textSize(this.r / 3.5);
        textAlign(CENTER);
        text(t, 0, 5);
        pop();
    }
}