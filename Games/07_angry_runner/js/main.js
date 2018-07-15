/**
 * Angry Runner
 * 
 * Author: Terry Griffin
 */

var game = new Phaser.Game(1200, 768, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    init: init,
    update: update
});

var background;             // background image
var birds = [];             // array of bird projectiles
var runners = [];           // array of running men
var winnerb = false;        // boolean has someone won
var winneri = 0;            // integer of who is supposed to win
var runSlow = false;        // boolean go to slow motion
var time = 0;               // int time    
var phaserKeys;             // array of keys to minitor
var finish_line;            // finish line image
var winnerKeys;             // array of listening number keys
//https://albert-gonzalez.github.io/easytimer.js/
var timer = new Timer();
var birdHitCounters = [];   // track times a runner is hit by a bird
var explosions = [];        // explosion sprites

/**
 * function preload: load assets and such
 * 
 */
function preload() {
    game.load.spritesheet('game_player', 'assets/players2.png', 64, 110);
    game.load.image("background", "assets/road2.png");
    game.load.image("finish_line", "assets/finish_line.png");
    game.load.spritesheet('bird', 'assets/bird-sprite-reverse.png', 200, 162);
    game.load.spritesheet('explosion', 'assets/explosion.png', 112, 112);
}

/**
 * function init: initialize 
 * 
 */
function init() {
    // Listen to space & enter keys
    var birdKeys = [Phaser.KeyCode.SPACEBAR,
        Phaser.KeyCode.ENTER];
    // Listen to number keys 1-5
    var numKeys = [Phaser.Keyboard.ONE,
        Phaser.Keyboard.TWO,
        Phaser.Keyboard.THREE,
        Phaser.Keyboard.FOUR,
        Phaser.Keyboard.FIVE
    ];
    // Create Phaser.Key objects for listening to the state
    phaserKeys = game.input.keyboard.addKeys(birdKeys);
    // Create Phaser.Key objects for listening for number key input
    winnerKeys = game.input.keyboard.addKeys(numKeys);
    // Capture these keys to stop the browser from receiving this event
    game.input.keyboard.addKeyCapture(birdKeys);
}
 
/**
 * function create:  
 * 
 */
function create() {

    // add road background image
    background = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "background");


    //start timer obtained from easytimer.js
    timer.start({
        precision: 'secondTenths'
    });
    
    // Add AFTER background, or time will be hidden!
    timeText = game.add.text(16, 16, "00:00:00", {
        fontSize: '32px',
        fill: '#000'
    });

    // add 5 runner sprites to scene
    for (var i = 0; i < 5; i++) {
        runners.push(game.add.sprite(100, i * 110 + 110, 'game_player'));
        birdHitCounters.push(0);
        // enable physics on runners so we can check for collision or overlap with finish line
        game.physics.enable(runners[i], Phaser.Physics.ARCADE);

        // scale each runner to give a 2.5D ish perspective
        runners[i].scale.setTo(.6 + i / 10, .6 + i / 10);

        // add multiple animations to each of the runners
        runners[i].animations.add('running_fast', [0 + 14 * i, 1 + 14 * i, 2 + 14 * i, 3 + 14 * i, 4 + 14 * i, 5 + 14 * i, 6 + 14 * i]);
        runners[i].animations.add('running_slow', [0 + 14 * i, 1 + 14 * i, 2 + 14 * i, 3 + 14 * i, 4 + 14 * i, 5 + 14 * i, 6 + 14 * i]);
        runners[i].animations.add('loser', [8 + 14 * i, 9 + 14 * i]);
        runners[i].animations.add('running_winner', [10 + 14 * i, 11 + 14 * i, 12 + 14 * i]);
        runners[i].animations.play('running_fast', 20, true);
    }

    // prints time to screen
    updateClock();
}

/**
 * function update:
 */
function update() {
    selectWinner();
    // Move background kind of fast if runners are not near finish line
    if (!runSlow) {
        background.tilePosition.x -= 5;
        updateFastWinner();
    } else {
        // Running in slow motion
        // if there is NO winner, keep moving background, but sloooower
        if (!winnerb) {
            background.tilePosition.x -= 2;
            finish_line.x -= 2;
            for (var i = 0; i < runners.length; i++) {
                game.physics.arcade.overlap(runners[i], finish_line, runnerFinishCollision, null, this);
            }
            updateSlowWinner();
        }
    }


    // randomly accelerate / decelerate each runner
    for (var i = 0; i < runners.length; i++) {
        let r = Math.floor(Math.random() * 100); // returns a random integer from 0 to 99

        checkBirdStrike(i);
        if (runners[i].animations.currentAnim.name == 'loser') {
            addExplosion(runners[i], i);
        }
        // if running fast, go ahead and make each runner speed up or slow down
        if (!runSlow) {
            if (r % 2 == 0) {
                moveExplosion(runners[i], 3);
                runners[i].x += 3;
            } else {
                moveExplosion(runners[i], -1);
                runners[i].x -= 1;
            }
        // if running in slow motion, don't move x in a negative fashion. Looks better
        } else {
            if (r % 2 == 0) {
                moveExplosion(runners[i], 1);
                runners[i].x += 1;
            } else {
                runners[i].x += 0;
            }
        }
    }

    // if running fast, check if its time to run slow motion
    if (!runSlow) {
        checkRunSlowMo();
    }

    // if no winner, keep running the clock
    if (!winnerb) {
        updateClock();
    }

    // check for space or mouse keys to be pressed.
    // if so, fire a bird!
    for (var index in phaserKeys) {
        // Save a reference to the current key
        var key = phaserKeys[index];
        // If the key was just pressed, fire a laser
        if (key.justDown) {
            fireBird();
        }
    }

    // make any birds in the scene move across the screen
    // toward the runners
    if (birds.length > 0) {
        for (var i = 0; i < birds.length; i++) {
            birds[i].x -= 5;
        }
    }
}

/**
 * 
 */
function checkBirdStrike(id){
    //if (birdHitCounters[id] == 0) {
        for(var i=0;i<birds.length;i++){
            game.physics.arcade.overlap(runners[id], birds[i], birdCollisionHandler, null, this);
        }
    //}
}

/**
 * function fireBird: shoots a bird from left side of scene at some random Y position
 */
function fireBird() {
    console.log("fire bird!!");

    birds.push(game.add.sprite(1200, game.rnd.frac() * window.innerHeight, 'bird'));
    game.physics.enable(birds[birds.length-1], Phaser.Physics.ARCADE);
    birds[birds.length-1].scale.setTo(.3, .3);
    birds[birds.length-1].animations.add('fly', [0, 1, 2, 3, 4]);
    birds[birds.length-1].animations.play('fly', 20, true);
}

/**
 * function collisionHandler: checks to see who touches the finish line first 
 */
function runnerFinishCollision(obj) {

    if (winnerb === false) {
        winnerb = true;
        obj.animations.play('running_winner', 10, true);
    }

}

/**
 * function birdCollisionHandler:
 */
function birdCollisionHandler(obj) {
    obj.animations.play('loser', 10, true);
}

/**
 * function updateClock: use js library to print race time on screen
 */
function updateClock() {
    timeText.setText(timer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']));
}

/**
 * function checkRunSlowMo: if runners get to some X, start running the slowmo animation
 */
function checkRunSlowMo() {
    // first runner to get to x == 700 then run slow
    // 700 should be a parameter and not hardcoded
    for (var i = 0; i < runners.length; i++) {
        if (runners[i].x > 700) {
            runSlow = true;
        }
    }

    // if runSlow is triggered, change each sprites animation from fast to slow
    if (runSlow) {
        for (var i = 0; i < runners.length; i++) {
            runners[i].animations.play('running_slow', 5, true);
        }

        // add the finish line to the scene
        finish_line = game.add.sprite(1200, 150, 'finish_line')
        // add physics so we can check for collisions or overlap
        game.physics.enable(finish_line, Phaser.Physics.ARCADE);
    }
}

//NOT USED

//example game timer (not used)
//outputs: mm:ss (no tenths of a second)
function gameTimer() {
    time += 1;

    m = Math.floor(time / 60);

    if (m > 0) {
        time -= m * 60;
    }

    s = time;

    timeText.setText(padTime(m) + ":" + padTime(s));
    var t = setTimeout(gameTimer, 1000);
}

function padTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}

function selectWinner() {
    // winner = prompt("Select a winner:", "winner");
    for (var i in winnerKeys) {
        if (winnerKeys[i].isDown) {
            winneri = parseInt(i)+1;
        }
    }
}

function updateFastWinner() {
    for (var i = 0; i < runners.length; i++) {
        if (i == winneri - 1) {
            runners[i].x += .35;
        }
    }
}

function updateSlowWinner() {
    for (var i = 0; i < runners.length; i++) {
        if (i == winneri - 1) {
            runners[i].x += .0555555555556;
        }
    }
}

function addExplosion(obj, i) {
    if(birdHitCounters[i] == 0) {
        explosions.push(game.add.sprite(obj.x, obj.y, 'explosion'));
        explosions[explosions.length - 1].animations.add('explosion', [3, 2, 1, 0]);
        explosions[explosions.length - 1].animations.play('explosion', 4, true);
    }    
    birdHitCounters[i]++;
    
}

function moveExplosion(obj, i) {
    for (var j = 0; j < explosions.length; j++) {
        if (explosions[j].x == obj.x && explosions[j].y == obj.y) {
            explosions[j].x += i;
        }
    }
}