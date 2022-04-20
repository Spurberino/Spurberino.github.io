function preload() {
    //images
    playerimg = loadImage('assets/img/player.png');
    playerspeed = loadImage('assets/img/playerspeedpower.png');
    playerdamaged = loadImage('assets/img/playerdamaged.png');
    playerhealed = loadImage('assets/img/playerhealed.png');
    playershield = loadImage('assets/img/playershield.png');
    emptyimg = loadImage('assets/img/empty.png');
    bulletimg = loadImage('assets/img/bullet.png');
    enemybulletimg = loadImage('assets/img/enemybullet.png');
    chaserimg = loadImage('assets/img/chaser.png');
    shooterimg = loadImage('assets/img/shooter.png');
    bouncerRimg = loadImage('assets/img/bouncer-right.png');
    bouncerLimg = loadImage('assets/img/bouncer-left.png');
    healthpackimg = loadImage('assets/img/healthpack.png');
    backgroundimg = loadImage('assets/img/backgroundnew.png');
    powerupspeedimg = loadImage('assets/img/powerupspeed.png');
    powerupshieldimg = loadImage('assets/img/powerupshield.png');
    //sounds
    damageSound = loadSound('assets/sound/damagesound.wav');
    loseSound = loadSound('assets/sound/losesound.mp3');
    powerUpSound = loadSound('assets/sound/powerUp.wav');
    healSound = loadSound('assets/sound/healsound.wav');
    pointSound = loadSound('assets/sound/point.wav');
    //song credit: A Bit Of Hope by David Fesliyan https://www.fesliyanstudios.com/royalty-free-music/download/a-bit-of-hope/565
    song = loadSound('assets/sound/song.mp3');
    //fonts
    font = loadFont('assets/fonts/EnchantedLand.otf');
}

//Pause function
function togglePause() {
    if (!paused) {
        paused = true;
        song.pause();
        if (speedpoweron) {
            speedpausetime = Date.now() - speedstarttime;
            clearTimeout(timeoutSpeed);
        }
        if (shieldpoweron) {
            shieldpausetime = Date.now() - shieldstarttime;
            clearTimeout(timeoutShield);
        }
        for (let i = 0; i < shooters.length; i++) {
            shooters[i].pausetime = Date.now() - shooters[i].starttime;
            clearTimeout(shooting);
        }
    } else if (paused) {
        paused = false;
        song.loop();
        if (speedpoweron) {
            speedstarttime = Date.now() - speedpausetime;
            timeoutSpeed = setTimeout(function () { shootCD = shootCD * 3; speedpoweron = false; lastSP = frameAmount; }, speedpowertime - speedpausetime);
        }
        if (shieldpoweron) {
            shieldstarttime = Date.now() - shieldpausetime;
            timeoutShield = setTimeout(function () { shieldpoweron = false; lastSH = frameAmount; }, shieldpowertime - shieldpausetime);
        }
        for (let i = 0; i < shooters.length; i++) {
            shooting = setTimeout(function () {
                if (shooters[i] && isAlive) {
                    shooters[i].shoot();
                    shooters[i].shotactive = false;
                }
            }, shooters[i].shootspeed - shooters[i].pausetime);
        }
    }
}

function Score() {
    score++;
    pointSound.play();
}

//What happens when you press the start button
function startGame() {
    GameStarted = true;
    removeElements();
    song.loop();
}
//what happens when you press the 'How to play' button
function howToPlay() {
    HowToPlay = true;
    removeElements();
}
function buyMaxLife() {
    if (score >= pluslifeprice && playermaxhp < 10) {
        playermaxhp++;
        score = score - pluslifeprice;
        pluslifeprice = pluslifeprice + 5;
    }
}
function buyMoveSpeed() {
    if (score >= playerspeedprice) {
        player.speed = player.speed * 1.1;
        score = score - playerspeedprice;
        playerspeedprice = playerspeedprice + 5;
    }
}
function buyDamage() {
    if (score >= damageprice && bulletdamage < 2) {
        bulletdamage = bulletdamage * 2;
        score = score - damageprice;
        //more than 2 bullet damage might be OP
        damageprice = damageprice + 40;
    }
}
function buyBulletSpeed() {
    if (score >= bulletspeedprice) {
        bulletspeed = bulletspeed * 1.05;
        score = score - bulletspeedprice;
        bulletspeedprice = bulletspeedprice + 5;
        //might be shit - rebalance this?
    }
}
function buySpeedPowerUpgrade() {
    if (score >= speedpowerupgradeprice) {
        speedpowertime = speedpowertime + 1000;
        score = score - speedpowerupgradeprice;
        speedpowerupgradeprice = speedpowerupgradeprice + 5;
    }
}
function buyShootSpeed() {
    if (score >= shootspeedprice) {
        shootCD = shootCD * 0.95;
        score = score - shootspeedprice;
        shootspeedprice = shootspeedprice + 10;
        //might be OP - check if price should be higher?
        //maybe cap max shootspeed
    }
}
function buyLife() {
    if (score >= healprice && player.hp < playermaxhp) {
        player.heal();
        score = score - healprice;
        //don't know if price should increase
    }
}

function enterShop() {
    removeElements();
    //Increase max hp
    if (playermaxhp < 10) {
        buyMaxLifeButton = createButton(`+1 max life for ${pluslifeprice} score`);
    } else {
        buyMaxLifeButton = createButton(nomoreupgradetxt);
    }
    buyMaxLifeButton.addClass("shop");
    buyMaxLifeButton.mousePressed(buyMaxLife);
    buyMaxLifeButton.position(width / 3 - 80, height / 4);
    //Increase move speed
    buyMoveSpeedButton = createButton(`Increase your movement speed for ${playerspeedprice} score`);
    buyMoveSpeedButton.addClass("shop");
    buyMoveSpeedButton.mousePressed(buyMoveSpeed);
    buyMoveSpeedButton.position(width / 2 - 80, height / 4);
    //Increase bullet damage
    if (bulletdamage < 2) {
        buyDamageButton = createButton(`Double your damage for ${damageprice} score`);
    } else {
        buyDamageButton = createButton(nomoreupgradetxt);
    }
    buyDamageButton.addClass("shop");
    buyDamageButton.mousePressed(buyDamage);
    buyDamageButton.position(width - width / 3 - 80, height / 4);
    //Increase the time that the speed powerup lasts
    buySpeedPowerUpgradeButton = createButton(`Add 1 second to lightning powerup for ${speedpowerupgradeprice} score`);
    buySpeedPowerUpgradeButton.addClass("shop");
    buySpeedPowerUpgradeButton.mousePressed(buySpeedPowerUpgrade);
    buySpeedPowerUpgradeButton.position(width / 2 - 80, height - height / 4);
    //Increase shooting speed
    buyShootSpeedButton = createButton(`Increase your shooting speed for ${shootspeedprice} score`);
    buyShootSpeedButton.addClass("shop");
    buyShootSpeedButton.mousePressed(buyShootSpeed);
    buyShootSpeedButton.position(width - width / 3 - 80, height - height / 4);
    //Buy one life
    buyLifeButton = createButton(`Heal once for ${healprice} score`);
    buyLifeButton.addClass("shop");
    buyLifeButton.mousePressed(buyLife);
    buyLifeButton.position(width / 3 - 80, height - height / 4);
}
//What happens when you press the 'Main menu' button
function mainMenu() {
    HowToPlay = false;
    removeElements();
    backbuttonexists = false;
    startbutton = createButton('Start Game');
    startbutton.mousePressed(startGame);
    helpbutton = createButton('How To Play');
    helpbutton.mousePressed(howToPlay);
}

//makes timer always have two numbers for seconds and minutes
function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

function mutesong() {
    if (!songmuted) {
        song.setVolume(0);
        songmuted = true;
    } else {
        song.setVolume(0.2);
        songmuted = false;
    }
}

function keyPressed() {
    if (key === "m") {
        mutesong();
    }
    if (key === 'p') {
        togglePause();
        textSize(48);
        stroke(0);
        strokeWeight(5);
        fill(255);
        background(20, 20, 20, 125);
        text("Game Paused", width / 2, height / 2);
        textSize(30);
        text("Press P to unpause", width / 2, height / 2 + 50);
    }
    if (key === "r") {
        location.reload();
    }
}

function spawnHealth(x, y) {
    for (let i = 0; i < hamount; i++) {
        hpacks[i] = new Healthpack(x, y);
        hpackactive = true;
        wavehpacks--;
    }
}

function spawnSpeedpower(x, y) {
    for (let i = 0; i < spamount; i++) {
        speedpower[i] = new PowerupSpeed(x, y);
        spactive = true;
    }
}

function spawnShieldpower(x, y) {
    for (let i = 0; i < shamount; i++) {
        shieldpower[i] = new PowerupShield(x, y);
        shactive = true;
    }
}

//function that has a chance to spawn one of the three powerups
function spawnPowerup(x, y, mult) {
    let r = random(100);
    if (r < speedchance * mult) {
        if (!spactive && !speedpoweron && frameAmount >= spCD + lastSP) {
            spawnSpeedpower(x, y);
        }
    } else if (r < shieldchance * mult) {
        if (!shactive && !shieldpoweron && frameAmount >= shCD + lastSH) {
            spawnShieldpower(x, y);
        }
    } else if (r < healthchance * mult) {
        if (!hpackactive && frameAmount >= hpCD + lastheal) {
            spawnHealth(x, y);
        }
    } else {
        //do nothing
    }
}