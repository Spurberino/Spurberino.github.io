let player;
let chasers = [];
let bullets = [];
let bouncers = [];
let hpacks = [];
let speedpower = [];
let shooters = [];
let enemybullets = [];
let lastShot = 0;
let lastdmg = 0;
let lastheal = 0;
let lastSP = 0;
let camount = 1;
let bamount = 3;
let samount = 1;
let hamount = 1;
let spamount = 1;
let shootCD = 30;
let dmgCD = 90;
let hpCD = 600;
let spCD = 900;
let playerhp = 5;
let bulletspeed = 10;
let score = 0;
let chaserhp = 4;
let bouncerhp = 2;
let shooterhp = 4;
let bulletdamage = 1;
let GameStarted = false;
let HowToPlay = false;
let playermaxhp = 5;
let hpackactive = false;
let spactive = false;
let frameAmount = 0;
let backbuttonexists = false;
//images
let backgroundimg;
let playerimg;
let bulletimg;
let chaserimg;
let bouncerRimg;
let bouncerLimg;
let healthpackimg;
//sounds
let damageSound;
let loseSound;
let powerUpSound;
let healSound;
let song;
let songmuted = false;
let wavenumber = 1;
let newwave = false;
let wavecheckpoint = false;
let paused = false;
let isAlive = true;
let wavehpacks = 0;
//timer
let minutes = 0;
let seconds = 0;
let totalSeconds = 0;
//shop prices
let pluslifeprice = 20;
let healprice = 30;
let playerspeedprice = 20;
let damageprice = 30;
let bulletspeedprice = 20;
let shootspeedprice = 30;

//shop strings
let nomoreupgradetxt = "You cannot upgrade this anymore";

//lets the speed powerup work with pausing
let timeoutID;
let starttime;
let pausetime;
let speedpoweron = false;
