var game = new Phaser.Game(800, 768, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

var runner;
var gamer;
var background;
var parray = [];
var winner = -1;
var keys = {};
var num_players;

function preload() {

    //game.load.spritesheet('runner', 'assets/runner.png', 108, 140);
    game.load.spritesheet('game_player', 'assets/players2.png', 64, 110);

    //non players
    game.load.spritesheet('cloud', 'assets/clouds.png', 240,240);
    game.load.image("background", "assets/road.png");
    
}

function create() {

    num_players = prompt("Pick the number of players:", "number");
    //then you can save it via local storage
    selectWinner();

    background = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "background");

    //runner = game.add.sprite(100, 300, 'runner');
    for(var i=0;i<num_players;i++){
        parray.push(game.add.sprite(100, i*110+110, 'game_player'));
        parray[i].animations.add('game_run',[0+14*i,1+14*i,2+14*i,3+14*i,4+14*i,5+14*i,6+14*i]);
        parray[i].animations.play('game_run', 20, true);
    }
    keys = {
        one: this.input.keyboard.addKey(Phaser.Keyboard.ONE),
        two: this.input.keyboard.addKey(Phaser.Keyboard.TWO),
        three: this.input.keyboard.addKey(Phaser.Keyboard.THREE),
        four: this.input.keyboard.addKey(Phaser.Keyboard.FOUR),
        five: this.input.keyboard.addKey(Phaser.Keyboard.FIVE)
    };

    // cloud = game.add.sprite(0, 0, 'cloud');
    // cloud.visible = false;

    //  Here we add a new animation called 'walk'
    //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'hero' sprite sheet
    //runner.animations.add('running',[0,1,2,3,4,5,6,7]);


    //  Play the animation: play('name of animation',FPS,loop=true/false)
    //runner.animations.play('running', 20, true);

}

function update(){
    background.tilePosition.x -= 2;
    for(var i=0;i<parray.length;i++){
        let r = Math.floor(Math.random() * 100);     // returns a random integer from 0 to 99
        if(r % 2 == 0){
            parray[i].x += 3;
        }else{
            parray[i].x -= 1;
        }
        updateWinner();
    }
}

function selectWinner() {
   winner = prompt("Select a winner:", "winner");
    // if (keys.one.isDown()) {
    //     winner = 0;
    // }
    // else if (keys.two.isDown()) {
    //     winner = 1;
    // }
    // else if (keys.three.isDown()) {
    //     winner = 2;
    // }
    // else if (keys.four.isDown()) {
    //     winner = 3;
    // }
    // else if (keys.five.isDown()) {
    //     winner = 4;
    // }
}

function updateWinner() {
    for (var i = 0; i < num_players; i++) {
        if (i != winner - 1) {
            parray[i].x -= .055555555556;
        }
    }
}