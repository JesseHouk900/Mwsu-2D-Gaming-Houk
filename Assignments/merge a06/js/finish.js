var finish = {
    create: function () {
        this.splash = game.add.tileSprite(0,0,game.width, game.height, 'splash')

        var label = game.add.bitmapText(game.width / 2, game.height / 2, 'mainFont', '', 75) 
        label.text = "Finish!"

    }
}