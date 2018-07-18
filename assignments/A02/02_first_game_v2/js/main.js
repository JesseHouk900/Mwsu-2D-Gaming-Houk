//*****  Jesse Houk *****//
//*****   7-14-18   *****//
//****  Assignment 1 ****//
//***** Add the following functionality:
//+++++Change the sprite for the gold star and make it random
//     items (like gems, mushrooms, coins). 
//+++++Change the sprite for the player and make it some
//     monster or person.
//+++++Instead of re-starting the game every time the player
//     dies, add a death counter and simply count the deaths.
//+++++Place the death counter at the bottom right hand side
//     of the game, using the same font as the score.
//+++++Since we never restart the game, lets add a timer to
//     stop the game after X minutes.
//+++++Place this timer at the top right of the game and have
//     it counting down from X in miniutes:seconds.
//+++++If the player dies (hitting a bomb) reset the score to zero.
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example',
{
    preload: preload,
    create: create,
    init: init,
    update: update
});
var player;
var items = [];
var bombs = [];
var platforms;
var score = 0;
var gameOver = false;
var scoreText;
var moveKeys;
var dir = {'up': 0, 'left': 1, 'right': 2};
var animates = [];
var deaths = 0;
var timer = new Timer();
var timeText;
var runTime;
var deathText;
var deleteBombsOnDeath = false;
var scoreResetOnDeath = true;
function preload ()
{
    
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.spritesheet('rmushroom', 'assets/redMushroom.png', 100, 93);
    game.load.image('bomb', 'assets/bomb.png');
    game.load.spritesheet('gpotion', 'assets/greenPotion.png', 36, 52);
    game.load.spritesheet('ppotion', 'assets/purplePotion.png', 36, 52);
    game.load.spritesheet('coin', 'assets/coinAnimated.png', 38, 32);
    game.load.spritesheet('dude', 'assets/naruto.png', 36, 47);
}

function init () {
	// initialize input
    var keys = [Phaser.KeyCode.UP,
        Phaser.KeyCode.LEFT,
        Phaser.KeyCode.RIGHT];
    moveKeys = game.input.keyboard.addKeys(keys);
    game.input.keyboard.addKeyCapture(keys);
}

function create ()
{
    runTime = prompt('How long would you like to play?', 'minutes');
    deleteBombsOnDeath = confirm('Do you want bombs to be deleted on death?');
    scoreResetOnDeath = confirm('Do you want your score to reset on death?');
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 300;
    //  A simple background for our game
    game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(0, 536, 'ground').scale.set(2, 2);

    //  Now let's create some ledges
    platforms.create(250, 400, 'ground').scale.set(.45, 1);
    platforms.create(0, 250, 'ground');
    platforms.create(600, 220, 'ground');
    game.physics.enable(platforms, Phaser.Physics.ARCADE);
    platforms.setAll('body.allowGravity', false);
    platforms.setAll('body.immovable', true);
    createPlayer();
    //player.animations.play('turn', true);
    
    //  Some items to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    addItems();
    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    // The time
	
	timer.start({countdown:true, precision:'seconds', startValues: {minutes: parseInt(runTime)}});
    timeText = game.add.text(700, 16, "00:00", { fontSize: '32px', fill: '#000' });
    updateClock();
    // The deaths
    deathText = game.add.text(600, 550, "Deaths: 0", { fontSize: '32px', fill: '#000'});
}

function update ()
{
    updateClock();
    updateDeaths();
    //  Collide the player and the items with the platforms
    game.physics.arcade.collide(player, platforms);
    updateItems();
    updateBombs();
    if (gameOver)
    {
        game.physics.arcade.isPaused = true;
    }
    if (moveKeys[dir['left']].isDown)
    {
        player.body.velocity.x = -160;
        player.play('left');
    }
    else if (moveKeys[dir['right']].isDown)
    {
        player.body.velocity.x = 160;
        player.play('right');
    }
    else
    {
        player.body.velocity.x = 0;
        player.play('turn');
    }
    if (moveKeys[dir['up']].isDown && player.body.touching.down)
    {
        player.body.velocity.y = -330;
    }
}

function collectItem (player, item)
{
    // Disable the item
    item.animations.stop(null, false);
    item.alpha = 0;
    item.body.enable = false;
    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);
    // Check if all items are disabled
    var allDisabled = true;
    for (var i = 0; i < 12; i++) {
        if (items[i].body.enable == true) {
            allDisabled = false;
        }
    }
    // Place new items and add a bomb
    if (allDisabled == true) {
        for (var i = 1; i < 12; i++) {
            items[i].destroy();
        }
        items = [];
        addItems();
        var x = (player.x < 400) ? game.rnd.realInRange(400, 800) : game.rnd.realInRange(0, 400);
        bombs.push(game.add.sprite(x, 16, 'bomb'));
        var i = bombs.length - 1;
        game.physics.arcade.enable(bombs[i]);
        bombs[i].body.bounce.set(1);
        bombs[i].body.collideWorldBounds = true;
        bombs[i].body.velocity.x = game.rnd.realInRange(-200, 200)
        bombs[i].body.velocity.y = 20;
        bombs[i].allowGravity = false;
    }
}

function createPlayer() {
    // The player and its settings
    player = game.add.sprite(100, 450, 'dude', 0);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.set(0.2);
    game.physics.setBoundsToWorld();
    player.body.collideWorldBounds = true;
    //  Our player animations, turning, walking left and walking right.
    animates.push(player.animations.add('left', [4, 5, 6, 7], 5, true));
    animates.push(player.animations.add('turn', [0, 4, 8, 12], .2, true));
    animates.push(player.animations.add('right', [8, 9, 10, 11], 5, true));
}

function updateItems() {
    for (var i = 0; i < 12; i++) {
        game.physics.arcade.collide(items[i], platforms);
        game.physics.arcade.overlap(player, items[i], collectItem, null, this);
    }
 }

 function updateDeaths() {
     deathText.setText('Deaths: ' + deaths);
 }

function updateBombs() {
    for (var i = 0; i < bombs.length; i++) {
        game.physics.arcade.collide(player, bombs[i], hitBomb, null, this);
        game.physics.arcade.collide(bombs[i], platforms);
    }
}

function hitBomb (player, bomb)
{
    player.destroy();
    createPlayer();
    deaths++;
    if (deleteBombsOnDeath) {
        for (var i = 0; i < bombs.length; i++) {
            bombs[i].destroy();
        }
        bombs = [];
    }
    if (scoreResetOnDeath) {
        score = 0;
        scoreText.setText('Score: ' + score);
    }
}

function addItems() {
    for (var i = 0; i < 12; i++) {
        let r = game.rnd.integerInRange(0, 3);
        // Create a red mushroom
        if (r == 0) {
            items.push(game.add.sprite(70*i, 16, 'rmushroom'));
            items[i].scale.set(.375, .375);
            game.physics.arcade.enable(items[i]/*, Phaser.Physics.ARCADE*/);
            items[i].body.bounce.set(game.rnd.realInRange(0.4, 0.65));
            items[i].animations.add('blink', [0, 1, 2, 3, 2, 1], 5, true);
            items[i].play('blink');
        }
        // Create a green potion
        else if (r == 1) {
            items.push(game.add.sprite(70*i, 16, 'gpotion'));
            items[i].scale.set(.75, .75);
            game.physics.arcade.enable(items[i]/*, Phaser.Physics.ARCADE*/);
            items[i].body.bounce.set(game.rnd.realInRange(0.1, 0.5));
            items[i].animations.add('sparkle', [0, 1, 2], 3, true);
            items[i].play('sparkle');
        }
        // Create a coin
        else if (r == 2) {
            items.push(game.add.sprite(70*i, 16, 'coin'));
            items[i].scale.set(.5, .5);
            game.physics.enable(items[i], Phaser.Physics.ARCADE);
            items[i].body.bounce.set(game.rnd.realInRange(0.2, 0.3));
            items[i].animations.add('spin', [0, 1, 2, 3], 6, true);
            items[i].play('spin');
        }
        // Create a purple potion
        else if (r == 3) {
            items.push(game.add.sprite(70*i, 16, 'ppotion'));
            items[i].scale.set(.75, .75);
            game.physics.arcade.enable(items[i]/*, Phaser.Physics.ARCADE*/);
            items[i].body.bounce.set(game.rnd.realInRange(0.1, 0.5));
            items[i].animations.add('sparkle', [0, 1, 2], 3, true);
            items[i].play('sparkle');
        }
    }
}

function updateClock() {
    timeText.setText(timer.getTimeValues().toString(['minutes', 'seconds']));
    if (timeText.text == '00:00') {
        gameOver = true;
    }
}
