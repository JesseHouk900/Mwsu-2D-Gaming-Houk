mainMenu = {
    
    create: function () {
        console.log('mainMenu')
        game.global.background = game.add.image(0, 0, 'background')
        game.global.background.scale.setTo(game.global.backgroundScaleX, game.global.backgroundScaleY)
console.log('w: ' + game.width + '    h: ' + game.height)
        this.title = game.add.bitmapText(game.width / 2 - 30, game.height / 2, 'mainFont', '', 75)
        this.title.text = GAMETITLE
        this.title.anchor.setTo(.5, .5)
        this.titleTween = game.add.tween(this.title).to({y: game.height / 2 - 50}, 1500).start()
        this.titleTween.onComplete.add(this.bounceDown, this)
        // game.add.tween(label).to({
        //     y: h - 120
        // }, 500).to({
        //     y: h - 100
        // }, 500).loop().start()
        game.input.onDown.add(this.start)
    },

    update: function () {
    
        //game.add.tween(this.title).to({y: game.height / 2 + 50}, 1500).start()
    },

    start: function () {
        game.state.start(game.global.current_level)
    },

    bounceUp: function () {
        this.titleTween = game.add.tween(this.title).to({y: game.height / 2 - 50}, 1500).start()
        this.titleTween.onComplete.add(this.bounceDown, this)
    },

    bounceDown: function () {
        this.titleTween = game.add.tween(this.title).to({y: game.height / 2 + 50}, 1500).start()
        this.titleTween.onComplete.add(this.bounceUp, this)
    },
}