class Shooter {
    constructor(x, y, hp) {
        this.location = createVector(x, y);
        //this.x = x;
        //this.y = y;
        this.r = 25;
        this.hp = hp;
        this.speed = 3;
        this.toDelete = false;

        this.show = function() {
            strokeWeight(2);
            fill(112, 82, 0);
            //ellipse(this.location.x, this.location.y, this.r * 2);
            image(shooterimg, this.location.x, this.location.y, this.r*2.5, this.r*2.5);
        }

        this.move = function() {
            let targetX = player.location.x;
            let targetY = player.location.y;
            let d = dist(this.location.x, this.location.y, targetX, targetY)
            let vector = createVector(this.location.x - targetX, this.location.y - targetY);
            vector.normalize();
            if(d <= 300){
                this.location = this.location.add(vector.mult(this.speed));
            } else if (d >= 350){
                this.location = this.location.sub(vector.mult(this.speed));
            }
            //Border
            if(this.location.x < 0+this.r) {
                this.location.x = this.location.x + this.speed;
            }
            if(this.location.x > width-this.r) {
                this.location.x = this.location.x - this.speed;
            }
            if(this.location.y < 0+this.r) {
                this.location.y = this.location.y + this.speed;
            }
            if(this.location.y > height-this.r) {
                this.location.y = this.location.y - this.speed;
            }
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
            let d = dist(this.location.x, this.location.y, player.location.x, player.location.y);
            if (d < this.r + player.r){
              return true;
            } else {
              return false;
            }
        }
    }
}