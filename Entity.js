"use strict";

const States = {
    IDLE: 0,
    WALKING: 1,
    ATTACK1: 2,
    ATTACK2: 3
}

class Entity {

    constructor(_x, _y, _colliderRadius, _image, _colour, _colliderType, _type, id) {
        this.colliderRadius = _colliderRadius;
        this.colour = _colour;
        this.image = _image;
        this.colliderType = _colliderType;
        this.type = _type;
        this.isDead = false;
        this.State = States.IDLE;

        if (this.type == 0) // TODO: implement separate classes for each
            this.health = 25;
        if (this.type == 1)
            this.health = 15;

        this.timer = 0;

        this.pos = new Vector2(_x, _y);

        this.oldPos = {
            x: _x,
            y: _y
        }

        this.vel = new Vector2(0, 0);
    }


    move(direction) {
        console.log(direction);
        this.oldPos.x = this.pos.x;
        this.oldPos.y = this.pos.y;
        if(this.vel != World.maxVel) {
            switch (direction) {
                case Directions.UP:
                    this.vel = this.vel.add(new Vector2(0, -1 * World.step));
                    break;
                case Directions.DOWN:
                    this.vel = this.vel.add(new Vector2(0, World.step));
                    break;
                case Directions.LEFT:
                    this.vel = this.vel.add(new Vector2(-1 * World.step, 0));
                    break;
                case Directions.RIGHT:
                    this.vel = this.vel.add(new Vector2(World.step, 0));
                    break;
            }
        }
    }

    update() {
        if (this.health <= 0) {
            this.die();
        }

        this.pos = this.pos.add(this.vel);
        
        if (this.vel.x > 0) this.vel.x -= World.friction;
        else if (this.vel.x < 0) this.vel.x += World.friction;

        if (this.vel.y > 0) this.vel.y -= World.friction;
        else if (this.vel.y < 0) this.vel.y += World.friction;

        if (this.vel.x > 0 && this.vel.x <= World.friction || this.vel.x >= -World.friction && this.vel.x < 0) {
            this.vel.x = 0;
        }
        
        if (this.vel.y > 0 && this.vel.y <= World.friction || this.vel.y >= -World.friction && this.vel.y < 0) {
            this.vel.y = 0;
        }
    }

    draw() {
        if (this.isDead)
            return;
        else {
            if (this.image) {
            }
            else {
                new Circle(this.pos.x + this.colliderRadius, this.pos.y + this.colliderRadius, this.colliderRadius, this.colour).fillCircle();
            }
        }
    }

    resolveCollisions() {
        /* for (let i = 0; i < entities.length; i++) {
            if (this === entities[i])
                continue;
            if (this.colliderType === "none" || entities[i].colliderType === "none")
                continue;
            if (this.colliderType === "melee" || entities[i].colliderType === "melee") {
                console.log("Melee collision");
                continue;
            }
            if (this.isColliding(entities[i])) {
                this.x = this.oldPos.x;
                this.y = this.oldPos.y;
            }
        } */
    }

    isColliding(x) {
        if (distance(this.pos.x, x.pos.x, this.pos.y, x.pos.y) < this.colliderRadius + x.colliderRadius)
            return true;
        else
            return false;
    }

    ranged() {
        if (this.isDead)
            return;
    }

    melee() {
        if (this.isDead)
            return;
        entities.push(new Melee(5, this, undefined));
    }

    die() {
        for (let i = 0; i < entities.length; i++) {
            if (entities[i] === this) {
                entities.splice(i, 1);
                break;
            }
        }
        console.log("Killing...");
        this.isDead = true;
    }

    /* calculateMovesTo(e2) {
        return [Math.sign(deltaX(this, e2)) * Math.floor(Math.abs(deltaX(this, e2) / World.tileSize)),
        Math.sign(deltaY(this, e2)) * Math.floor(Math.abs(deltaY(this, e2) / World.tileSize))];
    }

    follow(e2) {
        if (this.isDead)
            return;
        let moves = this.calculateMovesTo(e2);
        if (moves[0] >= 2) {
            if (Math.sign(moves[0] == 1)) {
                this.move(Directions.LEFT);
            }
            else {
                this.move(Directions.RIGHT);
            }
        }
        if (moves[1] >= 2) {
            if (Math.sign(moves[1]) == 1) {
                this.move(Directions.DOWN);
            }
            else {
                this.move(Directions.UP);
            }
        }
    } */
}
