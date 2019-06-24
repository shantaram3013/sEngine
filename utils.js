"use strict";

const Directions = {
    UP : "up",
    DOWN : "down",
    LEFT : "left",
    RIGHT: "right"
}

const World = {
    bgColor: 'black',
    tileSize: 32,
    mapW: 10,
    mapH: 10,
    frameRate: 60
}

let areColliding = function(m, n) {
    if (distance(m.x, n.x, m.y, n.y) < m.colliderRadius + n.colliderRadius) {
        return true;
    }
    else {
        return false;
    }
}


function randomInt(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);
}
  
function distance(x1, x2, y1, y2) {

    const xDist = x2 - x1;
    const yDist = y2 - y1;
  
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function snapToGrid(_a) {
    return _a - (_a % World.tileSize);
}
/*

 */
function deltaX (e1, e2) {
    console.log(e2.x);
    console.log(e1.x);
    return e2.x - e1.x;
}

function deltaY (e1, e2) {
    return e2.y - e1.y;
}
