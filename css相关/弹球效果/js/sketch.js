// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    // Runner = Matter.Runner,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Constraint = Matter.Constraint;

// create an engine
var engine, world;
var circles = [];
var mConstraint;

let t = ["五大共享", "品牌聚合", "四大保障", "百店扶持", "八大支持", "数据营销", "多元化产品", "系统培训", "保姆式服务", "1000家门店", "智能系统",
    "全程助力", "携手", "共赢", "加入我们"
];
let r = [6, 7, 7, 6, 6, 3, 2, 3, 3, 4, 1, 1, 2, 4, 3];


function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    var options = {
        isStatic: true
    }
    ground = Bodies.rectangle(width / 2, height, width * 3, 2, options);
    groundL = Bodies.rectangle(0, height / 2, 2, height * 3, options);
    groundR = Bodies.rectangle(width, height / 2, 2, height * 3, options);
    groundT = Bodies.rectangle(width / 2, -3000, width * 3, 100, options);
    World.add(world, [ground, groundL, groundR, groundT]);
    for (var i = 0; i < t.length; i++) {
        var radius = map(r[i], 0, 10, 20, 70);
        var n = map(windowWidth, 400, 2000, 1, 2.5);
        circles.push(new Circle(random(width), random(-200, -2000), radius * n, t[i]));
    }
    var canvasMouse = Mouse.create(canvas.elt);
    canvasMouse.pixelRatio = 2;
    var options = {
        mouse: canvasMouse
    }
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
}

function draw() {
    pixelDensity(2);
    // 设置背景颜色
    background('rgba(255,255,255,0)');
    // var percent = norm(sin(PI / 2 + frameCount / 100), -1, 1);
    // var between = lerpColor(color('#eedacf'), color('#f3f3f3'), percent);
    // fill(between);
    // noStroke();
    // rect(0, 0, width, height);

    // fill('#000000');
    noStroke();
    // var size = map(windowWidth, 375, 2000, 14, 22);
    // textSize(size);
    // textAlign(CENTER);
    // textSize(size * 2.5);

    for (var i = 0; i < t.length; i++) {
        circles[i].show();
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}