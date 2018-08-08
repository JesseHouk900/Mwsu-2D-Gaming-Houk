var GAMETITLE = 'UFO Attack'

var config = {
    maxWidth: 1000,
	maxHeight: 750,
	minWidth: 500,
	minHeight: 166
}

window.onload = main()

function main () {
    console.log('game')
    var game = new Phaser.Game(config.maxWidth, config.maxHeight, Phaser.Canvas, "game")

    game.global = {
        players: [],
        player1_score: 0,
        player2_score: 0,
        obstacle_id: 0,
        explosions: [],
        explosionAnimations: []
    }

    game.state.add("boot", boot)
    game.state.add("preload", preload)
    game.state.add("mainMenu", mainMenu)
    //game.state.add("options", options)
    game.state.add("play", play)
    game.state.add("winner", winner)
    game.state.start("boot")


}