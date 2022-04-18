function setup() {
    createCanvas(windowWidth, windowHeight);

    imageMode(CENTER);
    song.setVolume(0.2);
    pointSound.setVolume(0.6);
    outputVolume(0.4);

    player = new Player(playerhp);

    for (let i = 0; i < bamount; i++) {
        bouncers[i] = new Bouncer(random(0+10, width-10), random(0+10, height-10), bouncerhp, random(5, 10));
    }

    for (let i = 0; i < camount; i++) {
        chasers[i] = new Chaser(random(width), random(height), chaserhp, 150);
    }
    
    for (let i = 0; i < samount; i++) {
        shooters[i] = new Shooter(random(width), random(height), shooterhp, random(2000, 4000));
    }
   
    //Menu buttons
    startbutton = createButton('Start Game');
    startbutton.mousePressed(startGame);
    helpbutton = createButton('How To Play');
    helpbutton.mousePressed(howToPlay);

    //Timer function
    setInterval(timer,1000);
    function timer() {
        if(GameStarted && !paused && isAlive && !wavecheckpoint) {
            totalSeconds++;
            seconds++;
        }
    }
}

function draw() {
    if(!GameStarted) {
        imageMode(CORNER);
        resizeCanvas(windowWidth, windowHeight);
        background(backgroundimg);
        strokeWeight(0);
        startbutton.position((2*width/5)-65, height/2);
        helpbutton.position(width-(2*width/5)-65, height/2);
        textAlign(CENTER);
        fill(255);
        textSize(100);
        stroke(0);
        strokeWeight(5);
        textFont(font);
        text("The Legend of Baby", width/2, height/3);
        textFont('Arial');
        strokeWeight(2);
        textSize(24);
        //Version number
        text("v0.11.0-beta", width-70, height-10);
    }

    if(HowToPlay) {
        text("Control character with WASD", width/3, height/2-30);
        text("Shoot with arrow keys", width/3, height/2);
        text("Pause with P", width/3, height/2+30);
        text("Shoot enemies to gain points", width-width/3, height/2-30);
        text("You lose health if enemies hit you", width-width/3, height/2);
        text("Regain health with healthpacks", width-width/3, height/2+30);
        text("Pick up the lightning powerup to shoot faster for 5 seconds", width/2, height-height/2.5);
        text("Pick up the shield powerup to gain a shield for 3 seconds", width/2, height-height/2.5+30);
        text("Press M to mute the music", width/2, height-height/2.5+60);
        text("Press R to restart the game", width/2, height-height/2.5+90);
        //Makes the menu button only appear once
        if(!backbuttonexists) {
            backbutton = createButton('Main Menu');
            backbutton.mousePressed(mainMenu);
            backbuttonexists = true;
        }
        backbutton.position(width/2-65, height-height/4)
    }

    if(GameStarted) {
        //Pause
        if (paused) return;
        //replacement for frameCount
        frameAmount++;
        //timer
        if(seconds >= 60) {
            seconds = 0;
        }
        minutes = Math.floor(totalSeconds/60);

        imageMode(CORNER);
        resizeCanvas(windowWidth, windowHeight);
        background(backgroundimg);
        imageMode(CENTER);
        //Health and score
        textAlign(CENTER);
        textSize(36);
        fill(255);
        strokeWeight(2);
        text(`HP: ${player.hp}`, 100, 40);
        text(`Wave ${wavenumber}`, width-100, 40);
        textSize(36);
        text(`${pad(minutes)}:${pad(seconds)}`, width/3, 40);
        text(`Score: ${score}`, width-width/3, 40);
        text(`Enemies: ${enemies.flat().length}`, width/2, 40);
        //text(`${int(player.location.x)} ${int(player.location.y)}`, width/2, height);

        //Enables player
        if(isAlive){
            player.show();
            player.move();
            player.health();
        }

        //Enables healthpacks
        if(hpackactive){
            for(let i = 0; i < hpacks.length; i++) {
                hpacks[i].show();
            }
        }

        //Enables speed powerup
        if(spactive){
            for(let i = 0; i < speedpower.length; i++) {
                speedpower[i].show();
            }
        }
        
        //Enables shield powerup
        if(shactive){
            for(let i = 0; i < shieldpower.length; i++) {
                shieldpower[i].show();
            }
        }

        //Enables Chasers
        for (let i = 0; i < chasers.length; i++) {
            chasers[i].show();
            chasers[i].move();
            chasers[i].health();
        }

        //Enables Bouncers
        for (let i = 0; i < bouncers.length; i++) {
            bouncers[i].show();
            bouncers[i].move();
            bouncers[i].health();
        }

        //Enables Shooters
        for (let i = 0; i < shooters.length; i++) {
            shooters[i].show();
            shooters[i].move();
            shooters[i].health();
        }

        //Enables enemybullets (WIP)
        for (let i = 0; i < enemybullets.length; i++) {
            enemybullets[i].show();
            enemybullets[i].shoot();
        }
        
        //If bullet hits enemy they take damage
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].show();
            bullets[i].shoot();
            if (bullets[i].x < 0 || bullets[i].x > width || bullets[i].y < 0 || bullets[i].y > height) {
                bullets[i].disappear();
            }
            for (let j = 0; j < chasers.length; j++) {
                if (bullets[i].hits(chasers[j])) {
                    chasers[j].damage();
                    bullets[i].disappear();
                }
                
            }
            for (let j = 0; j < bouncers.length; j++) {
                if (bullets[i].hits(bouncers[j])) {
                    bouncers[j].damage();
                    bullets[i].disappear();
                }
            }
            for (let j = 0; j < shooters.length; j++) {
                if (bullets[i].hits(shooters[j])) {
                    shooters[j].damage();
                    bullets[i].disappear();
                }
            }
        }

        //Damage player
        if (frameAmount > lastdmg+dmgCD && player.toDelete == false && !shieldpoweron) {
            for (let i = 0; i < chasers.length; i++) {
                if (chasers[i].hits(player)) {
                    player.damage();
                    lastdmg = frameAmount;
                }
            }
            for (let i = 0; i < bouncers.length; i++) {
                if (bouncers[i].hits(player)) {
                    player.damage();
                    lastdmg = frameAmount;
                }
            }
            for (let i = 0; i < enemybullets.length; i++) {
                if (enemybullets[i].location.x < 0 || enemybullets[i].location.x > width || enemybullets[i].location.y < 0 || enemybullets[i].location.y > height) {
                    enemybullets[i].disappear();
                }
                if (enemybullets[i].hits(player)) {
                    player.damage();
                    enemybullets[i].disappear();
                    lastdmg = frameAmount;
                }
            }
        }

        //Heal player
        if(player.toDelete == false && hpackactive == true) {
            if(player.hp < playermaxhp) {
                for (let i = 0; i < hpacks.length; i++) {
                    if (hpacks[i].hits(player)) {
                        player.heal();
                        lastheal = frameAmount;
                        hpackactive = false;
                    }
                }
            }
        }

        //Powerup speed to player
        if(player.toDelete == false && spactive == true) {
            for(let i = 0; i < speedpower.length; i++) {
                if(speedpower[i].hits(player)) {
                    powerUpSound.play();
                    shootCD = shootCD/3;
                    speedstarttime = Date.now();
                    spactive = false;
                    speedpoweron = true;
                    timeoutSpeed = setTimeout(function () { shootCD = shootCD*3; speedpoweron = false; lastSP = frameAmount; }, speedpowertime)
                }
            }
        }

        //Powerup shield to player
        if(player.toDelete == false && shactive == true) {
            for(let i = 0; i < shieldpower.length; i++) {
                if(shieldpower[i].hits(player)) {
                    powerUpSound.play();
                    shieldstarttime = Date.now();
                    shactive = false;
                    shieldpoweron = true;
                    timeoutShield = setTimeout(function () { shieldpoweron = false; lastSH = frameAmount; }, shieldpowertime)
                }
            }
        }

        //Deletes objects
        for (let i = bullets.length-1; i >= 0; i--) {
            if (bullets[i].toDelete) {
                bullets.splice(i, 1);
            }
        }

        for (let i = hpacks.length-1; i >= 0; i--) {
            if (hpacks[i].toDelete) {
                hpacks.splice(i, 1);
                hpackactive = false;
            }
        }

        for (let i = speedpower.length-1; i >= 0; i--) {
            if (speedpower[i].toDelete) {
                speedpower.splice(i, 1);
                spackactive = false;
            }
        }

        for (let i = shieldpower.length-1; i >= 0; i--) {
            if (shieldpower[i].toDelete) {
                shieldpower.splice(i, 1);
                shactive = false;
            }
        }

        for (let j = chasers.length-1; j >= 0; j--) {
            if (chasers[j].toDelete) {
                //has default chance to spawn a powerup
                spawnPowerup(chasers[j].x, chasers[j].y, 1);
                chasers.splice(j, 1);
                Score();
            }
        }

        for (let j = bouncers.length-1; j >= 0; j--) {
            if (bouncers[j].toDelete) {
                //has half as much of a chance to spawn a powerup
                spawnPowerup(bouncers[j].x, bouncers[j].y, 0.5);
                bouncers.splice(j, 1);
                Score();
            }
        }

        for (let j = shooters.length-1; j >= 0; j--) {
            if (shooters[j].toDelete) {
                //has default chance to spawn a powerup
                spawnPowerup(shooters[j].location.x, shooters[j].location.y, 1);
                shooters.splice(j, 1);
                Score();
            }
        }

        for (let j = enemybullets.length-1; j >= 0; j--) {
            if (enemybullets[j].toDelete) {
                enemybullets.splice(j, 1);
            }
        }
    
        if(player.hp < 0) {
            player.hp = 0;
        }

        if(player.toDelete) {
            strokeWeight(4);
            textSize(52);
            fill(255);
            text("You died", width/2, height/2-50);
            text(`You made it to wave ${wavenumber} in ${minutes} minutes and ${seconds} seconds!`, width/2, height/2);
            text("Press R to try again", width/2, height/2+50);
            player.opacity = 0;
            player.strokeWeight = 0;
            //playerimg = loadImage('assets/img/empty.png');
            if(isAlive === true) {
                loseSound.play();
                isAlive = false;
            }
        }

        //Border for player
        if(player.location.x < 0+player.r) {
            player.location.x = player.location.x + player.speed;
        }

        if(player.location.x > width-player.r) {
            player.location.x = player.location.x - player.speed;
        }

        if(player.location.y < 0+player.r) {
            player.location.y = player.location.y + player.speed;
        }

        if(player.location.y > height-player.r) {
            player.location.y = player.location.y - player.speed;
        }

        //Shooter attacking
        for(let i = 0; i < shooters.length; i++){
            if(shooters[i].shotactive == false) {
                shooters[i].shotactive = true;
                shooters[i].starttime = Date.now();
                shooting = setTimeout(function() {
                    if(shooters[i] && isAlive) {
                        shooters[i].shoot();
                        shooters[i].shotactive = false;
                    }
                }, shooters[i].shootspeed);
            }
        }

        //New wave
        if(enemies.flat().length <= 0) {
            fill(255);
            strokeWeight(2);
            text(`Wave ${wavenumber} completed!`, width/2, height/2);
            text("Press Space to go to next wave", width/2, height-height/2.5);
            wavecheckpoint = true;
            //note: this maybe makes health spawn before SP if you pick both up between waves
            //maybe find other solution?
            lastSP++;
            lastheal++;
            lastSH++;
            enterShop();
            if (!newwave && keyIsPressed && keyCode === 32) {
                newwave = true;
                setTimeout(function () {
                    bamount = bamount + 3;
                    camount = camount + 1;
                    samount = samount+(wavenumber-1)%2;
                    lastdmg = frameAmount;
                    wavenumber++;
                    wavehpacks = 3;
                    
                    for (let i = 0; i < camount; i++) {
                        chasers[i] = new Chaser(random(width), random(height), chaserhp, random(50, 150));
                    }
                    
                    for (let i = 0; i < bamount; i++) {
                        bouncers[i] = new Bouncer(random(0+10, width-10), random(0+10, height-10), bouncerhp, random(5, 10));
                    }

                    for (let i = 0; i < samount; i++) {
                        shooters[i] = new Shooter(random(width), random(height), shooterhp, random(2000, 4000));
                    }
                    newwave = false;
                    wavecheckpoint = false;
                    shop = false;
                    removeElements();
                    //Add extra score on wave completed?
                    //score = score+10
                }, 500);
            }
        }

        if (frameAmount > lastShot+shootCD && player.toDelete == false) {
            if (keyIsDown(UP_ARROW)) {
                //console.log("Up");
                let dir = createVector(0,-1);
                let bullet = new Bullet(player.location.x, player.location.y, dir);
                bullets.push(bullet);
                lastShot = frameAmount;
            } else if (keyIsDown(DOWN_ARROW)) {
                //console.log("Down");
                let dir = createVector(0,1);
                let bullet = new Bullet(player.location.x, player.location.y, dir);
                bullets.push(bullet);
                lastShot = frameAmount;
            } else if (keyIsDown(LEFT_ARROW)) {
                //console.log("Left");
                let dir = createVector(-1,0);
                let bullet = new Bullet(player.location.x, player.location.y, dir);
                bullets.push(bullet);
                lastShot = frameAmount;
            } else if (keyIsDown(RIGHT_ARROW)) {
                //console.log("Right");
                let dir = createVector(1,0);
                let bullet = new Bullet(player.location.x, player.location.y, dir);
                bullets.push(bullet);
                lastShot = frameAmount;
            }
        }
    }
}