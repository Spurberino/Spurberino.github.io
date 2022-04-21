class Bouncer {
    constructor(x, y, hp, speed) {
        this.x = x;
        this.y = y;
        this.xVel = random(-speed, speed);
        this.yVel = random(-speed, speed);
        this.r = 10;
        this.hp = hp;
        this.speed = speed;
        this.toDelete = false;

        this.show = function () {
            strokeWeight(2);
            fill(255, 0, 0);
            //ellipse(this.x, this.y, this.r * 2);
            if (this.xVel >= 0) {
                image(bouncerRimg, this.x, this.y, -this.r * 3, -this.r * 3)
            } else { image(bouncerLimg, this.x, this.y, -this.r * 3, -this.r * 3) }
        }

        this.move = function () {
            this.x = this.x + this.xVel;
            if (this.x < 0 + this.r || this.x > width - this.r) {
                this.xVel = -this.xVel;
            }

            this.y = this.y + this.yVel;
            if (this.y < 0 + this.r || this.y > height - this.r) {
                this.yVel = -this.yVel;
            }
        }

        this.health = function () {
            if (this.hp <= 0) {
                this.toDelete = true;
            }
        }

        this.damage = function () {
            this.hp = this.hp - bulletdamage;
        }

        this.hits = function (player) {
            let d = dist(this.x, this.y, player.location.x, player.location.y);
            if (d < this.r + player.r) {
                return true;
            } else {
                return false;
            }
        }
    }
}