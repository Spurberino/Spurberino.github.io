class Enemybullet {
    constructor(x, y, vector) {
        this.location = createVector(x, y);
        this.r = 15;
        this.s = 10;
        this.vector = vector;
        this.toDelete = false;

        this.show = function () {
            strokeWeight(0);
            fill(255, 0, 0);
            ellipse(this.location.x, this.location.y, this.r * 2);
            image(enemybulletimg, this.location.x, this.location.y, this.r * 2.3, this.r * 2.3);
        }

        this.shoot = function () {
            this.vector.normalize();
            this.location = this.location.sub(vector.mult(this.s));
        }

        this.hits = function (player) {
            let d = dist(this.location.x, this.location.y, player.location.x, player.location.y);
            if (d < this.r + player.r) {
                return true;
            } else {
                return false;
            }
        }

        this.disappear = function () {
            this.toDelete = true;
        }
    }
}

