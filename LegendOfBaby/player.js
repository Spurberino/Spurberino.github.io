class Player {
    constructor(hp) {
        this.location = createVector(width/2, height/2);
        this.r = 25;
        this.speed = 5;
        this.hp = hp;
        this.toDelete = false;
        this.opacity = 255;
        this.strokeWeight = 0;

        this.show = function () {
            strokeWeight(this.strokeWeight);
            fill(255, 172, 168, this.opacity);
            ellipse(this.location.x, this.location.y, this.r * 2);
            image(playerimg, this.location.x, this.location.y, this.r*2.5, this.r*2.5);
            if(speedpoweron && !this.toDelete){
                image(playerspeed, this.location.x, this.location.y, this.r*2.5, this.r*2.5);
            }
            if(damaged && !this.toDelete){
                image(playerdamaged, this.location.x, this.location.y, this.r*2.5, this.r*2.5);
            }
            if(healed && !this.toDelete){
                image(playerhealed, this.location.x, this.location.y, this.r*2.5, this.r*2.5);
            }
        }

        this.move = function () {
            let direction = createVector(0,0);
            direction.x=keyIsDown(68)-keyIsDown(65);
            direction.y=keyIsDown(83)-keyIsDown(87);
            direction.normalize();
            this.location = this.location.add(direction.mult(this.speed));
        }

        this.damage = function() {
            this.hp--;
            damageSound.play();
            damaged = true;
            setTimeout(function(){
                damaged = false;
            }, 100);
        }

        this.heal = function (){
            this.hp++;
            healSound.play();
            healed = true;
            setTimeout(function(){
                healed = false;
            }, 100);
        }

        this.health = function() {
            if (this.hp <= 0) {
                this.toDelete = true;
            }
        }
    }
}