let Mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}
var canvas;
var renderer;
var frameCount = 0;
window.onload = init;

var entities = [];
var player = new Entity(snapToGrid(innerWidth/2),
                        snapToGrid(innerHeight/2),
                        World.tileSize/2, undefined, '#007cdf', 'rigid', 0, "plr");

var cursor = new Entity(0, 0, 8, undefined, 'red', 'none', 0, "crs");

var foo = new Entity(snapToGrid(100), snapToGrid(innerHeight/2), World.tileSize/2, undefined, 'green', 'rigid', 1, "foo");
var foo2 = new Entity(snapToGrid(100), snapToGrid(300), World.tileSize/2, undefined, 'green', 'rigid', 1, "foo");

entities.push(player);
entities.push(foo);
entities.push(foo2);

/* setInterval(followWrapper, 1000);

function followWrapper() {
    for(let i = 0; i < entities.length; i++) {
        if (entities[i].type == 1) {
            entities[i].follow(player);
        }
    }
} */

function draw() {
    
    frameCount++;
    window.requestAnimationFrame(draw);
    renderer.clearRect(0, 0, canvas.width, canvas.height);
    renderer.fillText(frameCount, 10, 10, 100);
    cursor.pos.x = Mouse.x;
    cursor.pos.y = Mouse.y;
    
    for (x of entities) {
        x.update();
        if (x) {
            x.draw();
            x.resolveCollisions();
        }
    }

    cursor.draw();
}
