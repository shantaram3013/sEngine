class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(s) {
        return new Vector2(this.x + s.x,
            this.y + s.y);
    }

    sub(s) {
        return new Vector2(this.x - s.x,
            this.y - s.y);
    }

    mul(s) {
        return new Vector2(this.x * s.x,
            this.y * s.y);
    }

    sMul(s) {
        return new Vector2(this.x * s,
            this.y * s);
    }

    div(s) {
        return new Vector2(this.x / s.x,
            this.y / s.y);
    }

    sDiv(s) {
        return new Vector2(this.x/s, this.y/s);
    }

    len() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    normalize() {
        let val = 1/this.len();
        this.x *= val;
        this.y *= val;
    }

    lerp(v, t) {
        return new Vector2(this.x + t * (v.x - this.x),
            this.y + t * (v.y - this.y));
    }

    equals(s) {
        return (this.x == s.x) && (this.y == s.y);
    }

}
