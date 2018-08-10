winner = {
    winner: 0,
    text: '',

    init: function(p, t) {
        this.winner = p
        this.text = t
    },


    create: function () {
        console.log('mainMenu')
        game.global.background = game.add.image(0, 0, 'background')
        game.global.background.scale.setTo(game.global.backgroundScaleX, game.global.backgroundScaleY)
        //console.log('w: ' + game.width + '    h: ' + game.height)
        this.victory = game.add.bitmapText(game.width / 2 - 30, game.height / 2, 'mainFont', '', 75)
        if (this.text === '') {
            this.victory.text = "The Winner is Player " + this.winner + "!"

        }
        else {
            this.victory.text = this.text
        }
        this.victory.anchor.setTo(.5, .5)
        this.victoryTween = game.add.tween(this.victory).to({y: game.height / 2 - 50}, 1500).start()
        this.victoryTween.onComplete.add(this.bounceDown, this)

        this.retry = game.add.bitmapText(game.width / 2 - 30, 3 * game.height / 4, 'mainFont', '', 50)
        this.retry.text = "(click to play again)"
        this.retry.anchor.setTo(.5, .5)
        this.retryTween = game.add.tween(this.retry).to({x: game.width / 2 - 50}, 1500).start()
        this.retryTween.onComplete.add(this.bounceRight, this)
        // game.add.tween(label).to({
        //     y: h - 120
        // }, 500).to({
        //     y: h - 100
        // }, 500).loop().start()
        game.input.onDown.add(this.start)
    },

    update: function () {
    
        //game.add.tween(this.victory).to({y: game.height / 2 + 50}, 1500).start()
    },

    start: function () {
        game.state.start(game.global.current_level)
    },

    bounceUp: function () {
        this.victoryTween = game.add.tween(this.victory).to({y: game.height / 2 - 50}, 1500).start()
        this.victoryTween.onComplete.add(this.bounceDown, this)
    },

    bounceDown: function () {
        this.victoryTween = game.add.tween(this.victory).to({y: game.height / 2 + 50}, 1500).start()
        this.victoryTween.onComplete.add(this.bounceUp, this)
    },
    
    bounceLeft: function () {
        this.retryTween = game.add.tween(this.retry).to({x: game.width / 2 - 25}, 1000).start()
        this.retryTween.onComplete.add(this.bounceRight, this)
    },

    bounceRight: function () {
        this.retryTween = game.add.tween(this.retry).to({x: game.width / 2 + 25}, 1000).start()
        this.retryTween.onComplete.add(this.bounceLeft, this)
    },
}