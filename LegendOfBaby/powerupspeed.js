class PowerupSpeed {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 15;
        this.toDelete = false;

        this.show = function () {
            strokeWeight(2);
            stroke(0);
            fill(255, 191, 0);
            ellipse(this.x, this.y, this.r * 2);
            image(powerupspeedimg, this.x, this.y, this.r * 1.5, this.r * 1.5);
        }

        this.disappear = function () {
            this.toDelete = true;
        }

        this.hits = function (player) {
            let d = dist(this.x, this.y, player.location.x, player.location.y);
            if (d < this.r + player.r) {
                this.toDelete = true;
                return true;
            } else {
                return false;
            }
        }
    }
}