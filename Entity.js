"use strict";

function Entity (_x, _y, _colliderRadius, _image, _colour, _colliderType, _type) {

    this.colliderRadius = _colliderRadius;
    this.colour = _colour;
    this.x = _x;
    this.y = _y;
    this.image = _image;
    this.colliderType = _colliderType;
    this.type = _type;
    this.isDead = false;
    this.health = 100;
    /*
     * type 0: cursor/player
     * type 1: enemy
     * type 2: bullet
    */

    this.oldPos = {
        x: undefined,
        y: undefined
    }

    this.typeSpecificVars = [
        {}, 
        {},
        {
            destX: 0,
            destY: 0
        }
    ]
    
    this.move = function(direction) {

        console.log(direction);

        this.oldPos.y = this.y;
        this.oldPos.x = this.x;
        
        switch (direction) {
            case Directions.UP: for (let i = 0; i < World.tileSize; i++) {
                                    this.y -= 1;
                                }
                                
                                break;
            case Directions.DOWN: for (let i = 0; i < World.tileSize; i++) {
                                    this.y += 1; 
                                    }
                                    break;
            case Directions.LEFT: for (let i = 0; i < World.tileSize; i++) {
                                    this.x -= 1;
                                    }
                                    break;
            case Directions.RIGHT: for (let i = 0; i < World.tileSize; i++) {
                                    this.x += 1;
                                    }
                                    break;
        }
    }

    this.moveAlongVector = function(x1, y1, dist) {
        
        var angle = Math.atan2(y1 - this.y, x1 - this.x);
        var sin = Math.sin(angle) * dist;
        var cos = Math.cos(angle) * dist;

        if (this.x != x1 || this.y != y1) {
            this.x += cos;
            this.y += sin;
        }
    }
    this.update = function() {
        switch (this.type) {
            case 2: var dest = {x: this.typeSpecificVars[2].destX, y: this.typeSpecificVars[2].destY};
                    this.moveAlongVector(dest.x, dest.y, 2);
                    if (this.x == dest.x && this.y == dest.y ||
                        Math.floor(this.x) == dest.x && Math.floor(this.y) == dest.y ||
                        Math.floor(this.x) == dest.x && Math.ceil(this.y) == dest.y ||
                        Math.ceil(this.x) == dest.x && Math.floor(this.y) == dest.y ||
                        Math.ceil(this.x) == dest.x && Math.ceil(this.y) == dest.y) this.die();
                    break;
        }
    }
    this.draw = function() {
        
        if (this.isDead) {
            return;
        }

        else {
            if (typeof this.image == 'undefined') {
                new Circle(this.x + this.colliderRadius, this.y + this.colliderRadius, this.colliderRadius, this.colour).draw();
            }
            else {
                console.log("else block called in this.draw()");
            }
        }
    }

    this.resolveCollisions = function() {
        let i = 0;
        
        for (i = 0; i < entities.length; i++) {
            
            if (this === entities[i]) return;

            if (this.colliderType === "none" || entities[i].colliderType === "none") continue; 

            if (entities[i].type == 2|| this.type == 2) {
                this.bulletCollision(entities[i]);
                continue;
            }

            if(areColliding(this, entities[i])) {
                    this.x = this.oldPos.x;
                    this.y = this.oldPos.y;

                    var angle = (Math.atan2(entities[i].y - this.y, entities[i].x - this.x));
                    /*
                     * Pi: to the right
                     * 0: to the left
                     * Pi/2: on top
                     * -Pi/2: below
                    */
            }

            else continue;
        }
    }

    this.ranged = function () {
        console.log("FIRE!");
        var projectile = new Entity(this.x + this.colliderRadius, this.y + this.colliderRadius, 3, undefined, 'red', "bullet", 2);

        projectile.typeSpecificVars[2].destX = cursor.x;
        projectile.typeSpecificVars[2].destY = cursor.y;

        entities.push(projectile);
       
    }

    this.bulletCollision = function(cWith) {

    }

    this.die = function() {
        
        for( var i = 0; i < entities.length; i++){ 
            if ( entities[i] === this) {
                entities.splice(i, 1);
                break;
            }
        }
 
        this.isDead = true;
    }

    /* this.follow = function (subject) {
        moves = calculateMoves(subject, this);
        
        if (frameCount % World.frameRate == 0) {
            if (Math.sign(moves.x) == 1) {
                if (Math.abs(deltaX(subject, this)) <= World.tileSize*2) {
                    this.move(Directions.RIGHT);
                }
            }
            else {
                if (Math.abs(deltaX(subject, this)) <= World.tileSize*2) {
                    this.move(Directions.LEFT);
                }
            }
            
            if (Math.sign(moves[1]) == 1) {
                if (Math.abs(deltaY(subject, this)) >= World.tileSize*2) {
                    this.move("down");
                }
            }
            else {
                if (Math.abs(deltaY(subject, this)) >= World.tileSize*2) {
                    this.move("up");
                }
            }
        }
    } */
}
