class Bullet {
    constructor(x, y, dir){
        this.x = x;
        this.y = y;
        this.r = 15;
        this.s = bulletspeed;
        this.dir = createVector(dir.x,dir.y);
        this.toDelete = false;

        this.show = function(){
            strokeWeight(0);
            fill(64, 125, 247);
            ellipse(this.x, this.y, this.r * 2);
            image(bulletimg ,this.x+1, this.y, this.r*2.3, this.r*2.3);
        }

        this.shoot = function(){
            this.y += this.dir.y*this.s;
            this.x += this.dir.x*this.s;
        }

        this.hits = function(enemy){
            let d = dist(this.x, this.y, enemy.x || enemy.location.x, enemy.y || enemy.location.y);
            if (d < this.r + enemy.r){
              return true;
            } else {
              return false;
            }
        }

        this.disappear = function(){
            this.toDelete = true;
        }
    }
}