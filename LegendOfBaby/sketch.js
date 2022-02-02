function preload() {
  playerimg = loadImage('img/player.png');
  bulletimg = loadImage('img/bullet.png');
  chaserimg = loadImage('img/chaser.png');
  bouncerRimg = loadImage('img/bouncer-right.png');
  bouncerLimg = loadImage('img/bouncer-left.png');
  healthpackimg = loadImage('img/healthpack.png');
  backgroundimg = loadImage('img/background.png');
  powerupspeedimg = loadImage('img/powerupspeed.png');
}

//Pause function
function togglePause(){
    if (!paused)
    {
        paused = true;
    } else if (paused)
    {
       paused = false;
    }
}

function startGame(){
    GameStarted = true;
    removeElements();
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

    for (let i = 0; i < hamount; i++){
        speedpower[i] = new PowerupSpeed(random(width),random(height))
    }

    //Pause function event listener
    window.addEventListener('keydown', function (e) {
        var key = e.key;
        if (key === 'p')
        {
            togglePause();
            textSize(48);
            stroke(0);
            strokeWeight(5);
            fill(255);
            text("Game Paused", width/2, height/2);
        }
        });
    
    //Start game button
    button = createButton('Start Game');
    button.mousePressed(startGame);
    
}

function draw(){
if(!GameStarted){
    //Draws background while game is not started and relocates button in case of window relocation
    imageMode(CORNER);
    resizeCanvas(windowWidth, windowHeight);
    background(backgroundimg);
    strokeWeight(0);
    button.position(width/2-60, height/2);
    textAlign(CENTER);
    fill(255);
    textSize(72);
    stroke(0);
    strokeWeight(5);
    text("The Legend of Baby", width/2, height/3);
    strokeWeight(2);
    textSize(24);
    text("Control character with WASD", width/4, height/2-30);
    text("Shoot with arrow keys", width/4, height/2);
    text("Pause with P", width/4, height/2+30);
    text("Shoot enemies to gain points", width/2*1.5, height/2-30);
    text("You lose health if enemies hit you", width/2*1.5, height/2);
    text("Regain health with healthpacks", width/2*1.5, height/2+30);
    text("Pick up the lightning powerup to shoot faster for 5 seconds", width/2, height-height/3);
    //Version number
    text("v0.5.2-beta", width-70, height-10);
}
//Start menu
if(GameStarted){
//Pause
if (paused) return;
    frameAmount++;
    imageMode(CORNER);
    resizeCanvas(windowWidth, windowHeight);
    background(backgroundimg);
    imageMode(CENTER);
    //Health and score
    textAlign(CENTER);
    textSize(24);
    fill(255);
    strokeWeight(2);
    text(`HP: ${player.hp}`, 100, 40);
    text(`Wave ${wavenumber}`, width-100, 40);
    textSize(36);
    text(score, width/2, 40);

    //Enables player
    player.show();
    player.move();
    player.health();


    //Enables healthpacks
    if(frameAmount >= hpCD + lastheal){
        for (let i = 0; i < hpacks.length; i++){
            hpacks[i].show();
            hpackactive = true;
            break;
        }
    }

    //Enables speed powerup
    if(frameAmount >= spCD + lastSP){
        for (let i = 0; i < speedpower.length; i++){
            speedpower[i].show();
            spactive = true;
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
                //console.log("Hit!");
                chasers[j].damage();
                bullets[i].disappear();
                //console.log("Chaser hp:", chasers[j].hp);
            }
            if (bullets[i].x < 0 || bullets[i].x > width || bullets[i].y < 0 || bullets[i].y > height){
                bullets[i].disappear();
            }
        }
        for (let j = 0; j < bouncers.length; j++) {
            if (bullets[i].hits(bouncers[j])) {
                //console.log("Hit!");
                bouncers[j].damage();
                bullets[i].disappear();
                //console.log("Bouncer hp:", bouncers[j].hp);
            }
            
            if (bullets[i].x < 0 || bullets[i].x > width || bullets[i].y < 0 || bullets[i].y > height){
                bullets[i].disappear();
            }
        }
    }

    //Damage player
    if(player.toDelete == false){
        if (frameAmount > lastdmg+dmgCD){
            for (let i = 0; i < chasers.length; i++) {
                    if (chasers[i].hits(player)) {
                        //console.log("Hit!");
                        player.damage();
                        //console.log("Player hp:", player.hp);
                        lastdmg = frameAmount;
                        background(255, 0, 0);
                    }
                }
            for (let i = 0; i < bouncers.length; i++) {
                    if (bouncers[i].hits(player)) {
                        //console.log("Hit!");
                        player.damage();
                        //console.log("Player hp:", player.hp);
                        lastdmg = frameAmount;
                        background(255, 0, 0);
                    }
                }
        }
    }

    //Heal player
    if(player.toDelete == false){
        if(player.hp < playermaxhp){
            for (let i = 0; i < hpacks.length; i++) {
                    if (hpacks[i].hits(player)) {
                        //console.log("Heal!");
                        player.heal();
                        //console.log("Player hp:", player.hp);
                        lastheal = frameAmount;
                        hpackactive = false;
                        background(0, 255, 0, 100);
                    }
                }
            }
        }

    //Powerup speed to player
    if(player.toDelete == false){
        for(let i = 0; i < speedpower.length; i++){
            if(speedpower[i].hits(player)){
                shootCD = 10;
                setTimeout(function () { shootCD = 30 }, 5000)
                 lastSP = frameAmount;
                 spactive = false;
                background(255, 191, 0, 100)
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

    for (let i = speedpower.length-1; i >= 0; i--) {
        if (speedpower[i].toDelete){
            speedpower.splice(i, 1);
            spackactive = false;
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
        text(`Final score: ${score}`, width/2, height/2+50);
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
    if(frameAmount > lastheal + hpCD && hpackactive == false){
        for (let i = 0; i < hamount; i++){
            hpacks[i] = new Healthpack(random(width), random(height));
        }
    }

    //Speedpower spawns
    if(frameAmount > lastSP + spCD && spactive == false){
        for (let i = 0; i < spamount; i++){
            speedpower[i] = new PowerupSpeed(random(width), random(height));
        }
    }

    //New wave
    if(chasers.length < 1 && bouncers.length < 1){
        fill(255);
        text(`Wave ${wavenumber} completed!`, width/2, height/2);

        if (!newwave) {
            newwave = true;

            setTimeout(function () {
                bamount = bamount + 3;
                camount = camount + 1;
                lastdmg = frameAmount;
                wavenumber++;
                
                for (let i = 0; i < camount; i++){
                    chasers[i] = new Chaser(random(width), random(height), chaserhp, random(50, 150));
                }
                
                for (let i = 0; i < bamount; i++){
                    bouncers[i] = new Bouncer(random(0+10, width-10), random(0+10, height-10), bouncerhp, random(5, 10));
                }
                newwave = false;
            }, 2000);
        }
    }

    if (frameAmount > lastShot+shootCD && player.toDelete == false){
        if (keyIsDown(UP_ARROW)){
            //console.log("Up");
            let dir = createVector(0,-1);
            let bullet = new Bullet(player.location.x, player.location.y, dir);
            bullets.push(bullet);
            lastShot = frameAmount;
        } else if (keyIsDown(DOWN_ARROW)){
            //console.log("Down");
            let dir = createVector(0,1);
            let bullet = new Bullet(player.location.x, player.location.y, dir);
            bullets.push(bullet);
            lastShot = frameAmount;
        } else if (keyIsDown(LEFT_ARROW)){
            //console.log("Left");
            let dir = createVector(-1,0);
            let bullet = new Bullet(player.location.x, player.location.y, dir);
            bullets.push(bullet);
            lastShot = frameAmount;
        } else if (keyIsDown(RIGHT_ARROW)){
            //console.log("Right");
            let dir = createVector(1,0);
            let bullet = new Bullet(player.location.x, player.location.y, dir);
            bullets.push(bullet);
            lastShot = frameAmount;
        }
    }
}
} //end of draw

/*function keyPressed(){
    if (frameAmount > lastShot+shootCD && player.toDelete == false){
        if (key === 'ArrowUp' ){
            //console.log("Up");
            let dir = createVector(0,-1);
            let bullet = new Bullet(player.location.x, player.location.y, dir);
            bullets.push(bullet);
            lastShot = frameAmount;
        }
        
        if (key === 'ArrowDown'){
            //console.log("Down");
            let dir = createVector(0,1);
            let bullet = new Bullet(player.location.x, player.location.y, dir);
            bullets.push(bullet);
            lastShot = frameAmount;
        }

        if (key === 'ArrowLeft'){
            //console.log("Left");
            let dir = createVector(-1,0);
            let bullet = new Bullet(player.location.x, player.location.y, dir);
            bullets.push(bullet);
            lastShot = frameAmount;
        }

        if (key === 'ArrowRight'){
            //console.log("Right");
            let dir = createVector(1,0);
            let bullet = new Bullet(player.location.x, player.location.y, dir);
            bullets.push(bullet);
            lastShot = frameAmount;
        }
    }
}*/