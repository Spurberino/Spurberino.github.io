let player;
let bullets = [];
let chasers = [];
let bouncers = [];
let shooters = [];
let enemies = [chasers, bouncers, shooters];
let hpacks = [];
let speedpower = [];
let shieldpower = [];
let enemybullets = [];
let lastShot = 0;
let lastdmg = 0;
let lastheal = 0;
let lastSP = 0;
let lastSH = 0;
let camount = 1;
let bamount = 3;
let samount = 1;
let hamount = 2;
let spamount = 1;
let shamount = 1;
let shootCD = 30;
let dmgCD = 90;
let hpCD = 60 * 1;
let spCD = 60 * 3;
let shCD = 60 * 3;
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
let spactive = false;
let shactive = false;
let frameAmount = 0;
let backbuttonexists = false;
let damaged = false;
let healed = false;
let songmuted = false;
let soundmuted = false;
let wavenumber = 1;
let newwave = false;
let wavecheckpoint = false;
let paused = false;
let isAlive = true;
//timer
let minutes = 0;
let seconds = 0;
let totalSeconds = 0;
//shop prices
let pluslifeprice = 20;
let healprice = 30;
let playerspeedprice = 20;
let damageprice = 30;
let speedpowerupgradeprice = 30;
let shootspeedprice = 30;

//shop strings
let nomoreupgradetxt = "You cannot upgrade this anymore";

//lets the speed powerup work with pausing
let timeoutSpeed;
let speedstarttime;
let speedpausetime;
let shieldtimeout;
let shieldstarttime;
let timeoutShield;
let speedpoweron = false;
let speedpowertime = 5000;
let shieldpoweron = false;
let shieldpowertime = 5000;

//Spawn chances
//NOTE: The numbers are the chance in %
let speedchance =                   15;
let shieldchance = speedchance +    10;
let healthchance = shieldchance +   25;