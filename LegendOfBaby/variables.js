let player;
let chasers = [];
let bullets = [];
let bouncers = [];
let hpacks = [];
let speedpower = [];
let lastShot = 0;
let lastdmg = 0;
let lastheal = 0;
let lastSP = 0;
let camount = 1;
let bamount = 3;
let hamount = 1;
let spamount = 1;
let shootCD = 30;
let dmgCD = 90;
let hpCD = 600;
let spCD = 900;
let playerhp = 5;
let score = 0;
let chaserhp = 4;
let bouncerhp = 2;
let bulletdamage = 1;
let GameStarted = false;
let playermaxhp = 5;
let hpackactive = false;
let spactive = false;
let frameAmount = 0;
//images
let backgroundimg;
let playerimg;
let bulletimg;
let chaserimg;
let bouncerRimg;
let bouncerLimg;
let healthpackimg;
//sounds
let oof
let jebno
let wavenumber = 1;
let newwave = false;
let paused = false;
let isAlive = true;