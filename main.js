var canvas;
var renderer;
var frameCount = 0;
window.onload = init;
var runEveryFrame = [];

var entities = []
var player = new Entity(snapToGrid(innerWidth/2),
                        snapToGrid(innerHeight/2),
                        World.tileSize/2, undefined, '#007cdf', 'rigid', 0);

var cursor = new Entity(0, 0, 8, undefined, 'red', 'none', 0);

var foo = new Entity(snapToGrid(100), snapToGrid(innerHeight/2), World.tileSize/2, undefined, 'green', 'rigid', 1);

entities.push(player);
entities.push(foo);

function Tile (_x, _y, _side, _image, _colour) {

}

function draw() {
    frameCount++;
    window.requestAnimationFrame(draw);
    renderer.clearRect(0, 0, canvas.width, canvas.height);
    renderer.fillText(frameCount, 10, 10, 100);
    cursor.x = mouse.x;
    cursor.y = mouse.y;
    for (i = 0; i < entities.length; i++) {
        entities[i].update();
        entities[i].draw();
        entities[i].resolveCollisions();

        /* if (entities[i].type === 1) {
            entities[i].follow(player);
        } */
    }

    for (i = 0; i < runEveryFrame.length; i++) {
        runEveryFrame[i].update();
        runEveryFrame[i].draw();
    }

    cursor.draw();
}