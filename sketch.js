let player;
let chasers = [];
let bullets = [];
let bouncers = [];
let hpacks = [];
let lastShot = 0;
let lastdmg = 0;
let lastheal = 0;
let camount = 1;
let bamount = 4;
let hamount = 1;
let shootCD = 20;
let dmgCD = 90;
let hpCD = 600;
let playerhp = 5;
let score = 0;
let chaserhp = 4;
let bouncerhp = 2;
let GameStarted = true;
let playermaxhp = 5;
let hpackactive = false;

let backgroundimg;
let playerimg;
let bulletimg;
let chaserimg;
let bouncerRimg;
let bouncerLimg;
let healthpackimg;

function preload() {
  playerimg = loadImage('img/player.png');
  bulletimg = loadImage('img/bullet.png');
  chaserimg = loadImage('img/chaser.png');
  bouncerRimg = loadImage('img/bouncer-right.png');
  bouncerLimg = loadImage('img/bouncer-left.png');
  healthpackimg = loadImage('img/healthpack.png');
  backgroundimg = loadImage('img/background.png');
}

function setup(){
    createCanvas(windowWidth, windowHeight);

    imageMode(CENTER);

    player = new Player(playerhp);

    for (let i = 0; i < bamount; i++){
        bouncers[i] = new Bouncer(random(0+10, width-10), random(0+10, height-10), bouncerhp, random(5, 10));
    }

    for (let i = 0; i < camount; i++){
        chasers[i] = new Chaser(random(width), random(height), chaserhp, 150);
    }

    for (let i = 0; i < hamount; i++){
        hpacks[i] = new Healthpack(random(width), random(height));
    }
}

function draw(){
//For menu (Not implemented)
if(GameStarted){
    imageMode(CORNER);
    resizeCanvas(windowWidth, windowHeight);
    background(backgroundimg);
    imageMode(CENTER);
    //Health and score
    textAlign(CENTER);
    textSize(24);
    fill(255);
    text(`HP: ${player.hp}`, 40, 40);
    textSize(36);
    text(score, width/2, 40);

    //Enables player
    player.show();
    player.move();
    player.health();


    //Enables healthpacks
    if(frameCount >= hpCD + lastheal){
        for (let i = 0; i < hpacks.length; i++){
            hpacks[i].show();
            hpackactive = true;
            break;
        }
    }

    //Enables Chasers
    for (let i = 0; i < chasers.length; i++){
        chasers[i].show();
        chasers[i].move();
        chasers[i].health();
    }

    //Enables Bouncers
    for (let i = 0; i < bouncers.length; i++){
        bouncers[i].show();
        bouncers[i].move();
        bouncers[i].health();
    }

    //If bullet hits enemy they take damage
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].show();
        bullets[i].shoot();
        for (let j = 0; j < chasers.length; j++) {
            if (bullets[i].hits(chasers[j])) {
                console.log("Hit!");
                chasers[j].damage();
                bullets[i].disappear();
                console.log("Chaser hp:", chasers[j].hp);
            }
            if (bullets[i].x < 0 || bullets[i].x > width || bullets[i].y < 0 || bullets[i].y > height){
                bullets[i].disappear();
            }
        }
        for (let j = 0; j < bouncers.length; j++) {
            if (bullets[i].hits(bouncers[j])) {
                console.log("Hit!");
                bouncers[j].damage();
                bullets[i].disappear();
                console.log("Bouncer hp:", bouncers[j].hp);
            }
            
            if (bullets[i].x < 0 || bullets[i].x > width || bullets[i].y < 0 || bullets[i].y > height){
                bullets[i].disappear();
            }
        }
    }

    //Damage player
    if(player.toDelete == false){
        if (frameCount > lastdmg+dmgCD){
            for (let i = 0; i < chasers.length; i++) {
                    if (chasers[i].hits(player)) {
                        //console.log("Hit!");
                        player.damage();
                        //console.log("Player hp:", player.hp);
                        lastdmg = frameCount;
                    }
                }
            for (let i = 0; i < bouncers.length; i++) {
                    if (bouncers[i].hits(player)) {
                        //console.log("Hit!");
                        player.damage();
                        //console.log("Player hp:", player.hp);
                        lastdmg = frameCount;
                    }
                }
        }
    }

    //Heal player
    if(player.toDelete == false){
        if(player.hp < playermaxhp){
            for (let i = 0; i < hpacks.length; i++) {
                    if (hpacks[i].hits(player)) {
                        console.log("Heal!");
                        player.heal();
                        //console.log("Player hp:", player.hp);
                        lastheal = frameCount;
                        hpackactive = false;
                    }
                }
            }
        }


    //Deletes objects
    for (let i = bullets.length-1; i >= 0; i--) {
        if (bullets[i].toDelete){
            bullets.splice(i, 1);
        }
    }

    for (let i = hpacks.length-1; i >= 0; i--) {
        if (hpacks[i].toDelete){
            hpacks.splice(i, 1);
            hpackactive = false;
        }
    }

    for (let j = chasers.length-1; j >= 0; j--) {
        if (chasers[j].toDelete){
            chasers.splice(j, 1);
            player.score();
        }
    }

    for (let j = bouncers.length-1; j >= 0; j--) {
        if (bouncers[j].toDelete){
            bouncers.splice(j, 1);
            player.score();
        }
    }
 
    if(player.hp < 0){
        player.hp = 0;
    }

    if (player.toDelete){
        strokeWeight(0);
        textSize(52);
        fill(255);
        text("You died", width/2, height/2);
        player.opacity = 0;
        player.strokeWeight = 0;
        playerimg = loadImage('img/empty.png')
        player.move = function(){}
        player.damage = function(){}
        player.score = function(){}
    }

    //Border for player
    if(player.location.x < 0+player.r){
        player.location.x = player.location.x + player.speed;
    }

    if(player.location.x > width-player.r){
        player.location.x = player.location.x - player.speed;
    }

    if(player.location.y < 0+player.r){
        player.location.y = player.location.y + player.speed;
    }

    if(player.location.y > height-player.r){
        player.location.y = player.location.y - player.speed;
    }

    //Healthpack spawns
    if(frameCount > lastheal + hpCD && hpackactive == false){
            for (let i = 0; i < camount; i++){
                hpacks[i] = new Healthpack(random(width), random(height));
            }
        }

    //New wave
    if(chasers.length < 1 && bouncers.length < 1){

        bamount = bamount + 3;
        camount = camount + 1;
        lastdmg = frameCount;

        for (let i = 0; i < camount; i++){
            chasers[i] = new Chaser(random(width), random(height), chaserhp, random(50, 150));
        }

        for (let i = 0; i < bamount; i++){
            bouncers[i] = new Bouncer(random(0+10, width-10), random(0+10, height-10), bouncerhp, random(5, 10));
        }
    }
}
} //end of draw

function keyPressed(){
    if (frameCount > lastShot+shootCD && player.toDelete == false){
        if (key === 'ArrowUp' ){
            //console.log("Up");
            let dir = createVector(0,-1);
            let bullet = new Bullet(player.location.x, player.location.y, dir);
            bullets.push(bullet);
            lastShot = frameCount;
        }
        
        if (key === 'ArrowDown'){
            //console.log("Down");
            let dir = createVector(0,1);
            let bullet = new Bullet(player.location.x, player.location.y, dir);
            bullets.push(bullet);
            lastShot = frameCount;
        }

        if (key === 'ArrowLeft'){
            //console.log("Left");
            let dir = createVector(-1,0);
            let bullet = new Bullet(player.location.x, player.location.y, dir);
            bullets.push(bullet);
            lastShot = frameCount;
        }

        if (key === 'ArrowRight'){
            //console.log("Right");
            let dir = createVector(1,0);
            let bullet = new Bullet(player.location.x, player.location.y, dir);
            bullets.push(bullet);
            lastShot = frameCount;
        }
    }
}