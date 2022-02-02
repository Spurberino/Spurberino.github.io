class Chaser {
    constructor(x, y, hp, s) {
        this.x = x;
        this.y = y;
        this.r = 25;
        this.hp = hp;
        this.speed = s;
        this.toDelete = false;

        this.show = function() {
            strokeWeight(2);
            fill(89, 133, 133);
            ellipse(this.x, this.y, this.r * 2);
            image(chaserimg ,this.x+1, this.y, this.r*2.5, this.r*2.5);
        }

        this.move = function() {

            let targetX = player.location.x;
            let dx = targetX - this.x;
            this.x += dx / this.speed;

            let targetY = player.location.y;
            let dy = targetY - this.y;
            this.y += dy / this.speed;

        }

        this.health = function() {
            if (this.hp <= 0) {
                this.toDelete = true;
            }
        }

        this.damage = function() {
            this.hp = this.hp-bulletdamage;
        }

        
        this.hits = function(player){
            let d = dist(this.x, this.y, player.location.x, player.location.y);
            if (d < this.r + player.r){
              return true;
            } else {
              return false;
            }
        }
    }
}