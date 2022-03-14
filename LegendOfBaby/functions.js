function preload() {
    //images
    playerimg = loadImage('img/player.png');
    bulletimg = loadImage('img/bullet.png');
    chaserimg = loadImage('img/chaser.png');
    bouncerRimg = loadImage('img/bouncer-right.png');
    bouncerLimg = loadImage('img/bouncer-left.png');
    healthpackimg = loadImage('img/healthpack.png');
    backgroundimg = loadImage('img/background.png');
    powerupspeedimg = loadImage('img/powerupspeed.png');
    //sounds
    damageSound = loadSound('sound/damagesound.wav');
    loseSound = loadSound('sound/losesound.mp3');
    powerUpSound = loadSound('sound/powerUp.wav');
    healSound = loadSound('sound/healsound.wav');
    //song credit: A Bit Of Hope by David Fesliyan https://www.fesliyanstudios.com/royalty-free-music/downloads-c/8-bit-music/6
    song = loadSound('sound/song.mp3');
}

//Pause function
function togglePause() {
    if (!paused) {
        paused = true;
        song.pause();
    } else if (paused) {
       paused = false;
       song.loop();
    }
}

function Score() {
    score++;
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
    if(score>=pluslifeprice){
        playermaxhp++;
        score = score-pluslifeprice;
        pluslifeprice = pluslifeprice+5;
    }
}
function buyMoveSpeed() {
    if(score>=playerspeedprice){
        player.speed = player.speed*1.1;
        score = score-playerspeedprice;
        playerspeedprice = playerspeedprice+5;
    }
}
function buyDamage() {
    if(score>=damageprice && bulletdamage <= 2){
        bulletdamage = bulletdamage*2;
        score = score-damageprice;
        //more than 2 bullet damage might be OP
        damageprice = damageprice+40;
    }
}
function buyBulletSpeed() {
    if(score>=bulletspeedprice){
        bulletspeed = bulletspeed*1.05;
        score = score-bulletspeedprice;
        bulletspeedprice = bulletspeedprice+5;
        //might be shit - rebalance this?
    }
}
function buyShootSpeed() {
    if(score>=shootspeedprice){
        shootCD = shootCD*0.95;
        score = score-shootspeedprice;
        shootspeedprice = shootspeedprice+10;
        //might be OP - check if price should be higher?
        //maybe cap max shootspeed
    }
}
function buyLife() {
    if(score>=healprice && player.hp < playermaxhp){
        player.heal();
        score = score-healprice;
        //don't know if price should increase
    }
}

function enterShop() {
    removeElements();
    buyMaxLifeButton = createButton(`+1 max life for ${pluslifeprice} score`);
    buyMaxLifeButton.addClass("shop");
    buyMaxLifeButton.mousePressed(buyMaxLife);
    buyMaxLifeButton.position(width/3-80,height/4);
    buyMoveSpeedButton = createButton(`Increase your movement speed for ${playerspeedprice} score`);
    buyMoveSpeedButton.addClass("shop");
    buyMoveSpeedButton.mousePressed(buyMoveSpeed);
    buyMoveSpeedButton.position(width/2-80,height/4);
    if(bulletdamage <= 2) {
        buyDamageButton = createButton(`Double your damage for ${damageprice} score`);
    } else {
        buyDamageButton = createButton(nomoreupgradetxt);
    }
    buyDamageButton.addClass("shop");
    buyDamageButton.mousePressed(buyDamage);
    buyDamageButton.position(width-width/3-80,height/4);
    buyBulletSpeedButton = createButton(`Increase the speed of your bullets for ${bulletspeedprice} score`);
    buyBulletSpeedButton.addClass("shop");
    buyBulletSpeedButton.mousePressed(buyBulletSpeed);
    buyBulletSpeedButton.position(width/2-80,height-height/4);
    buyShootSpeedButton = createButton(`Increase your shooting speed for ${shootspeedprice} score`);
    buyShootSpeedButton.addClass("shop");
    buyShootSpeedButton.mousePressed(buyShootSpeed);
    buyShootSpeedButton.position(width-width/3-80,height-height/4);
    buyLifeButton = createButton(`Heal once for ${healprice} score`);
    buyLifeButton.addClass("shop");
    buyLifeButton.mousePressed(buyLife);
    buyLifeButton.position(width/3-80,height-height/4);
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
    if(!songmuted){
        song.setVolume(0);
        songmuted = true;
    } else {
        song.setVolume(0.2);
        songmuted = false;
    }
}

function keyPressed() {
    if(key === "m"){
        mutesong();
    }
    if (key === 'p') {
        togglePause();
        textSize(48);
        stroke(0);
        strokeWeight(5);
        fill(255);
        text("Game Paused", width/2, height/2);
    }
}