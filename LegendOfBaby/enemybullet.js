class Enemybullet {
    constructor(x, y, target) {
        this.location = createVector(x, y);
        //this.x = x;
        //this.y = y;
        this.r = 15;
        this.s = 10;
        this.target = target;
        //this.dir = dir //createVector(player.location.x, player.location.y);
        this.toDelete = false;

        this.show = function(){
            strokeWeight(0);
            fill(255, 0, 0);
            ellipse(this.location.x, this.location.y, this.r * 2);
            image(enemybulletimg ,this.location.x, this.location.y, this.r*2.3, this.r*2.3);
        }

        this.shoot = function(){
            //this.location.x += this.dir.x+this.s;
            //this.location.y += this.dir.y+this.s;
            //let targetX = player.location.x;
            //let targetY = player.location.y;
            let vector = createVector(this.location.x - this.target.x, this.location.y - this.target.y);
            vector.normalize();
            //this.location = this.location.sub(vector.mult(this.s));
            
            this.location.x -= vector.x*this.s;
            this.location.y -= vector.y*this.s;
        }

        /*this.hits = function(enemy){
            let d = dist(this.x, this.y, enemy.x || enemy.location.x, enemy.y || enemy.location.y);
            if (d < this.r + enemy.r){
              return true;
            } else {
              return false;
            }
        }

        this.disappear = function(){
            this.toDelete = true;
        }*/
    }
}

