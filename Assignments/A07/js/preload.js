function preload () {
    preload = function () {
        var loading_bar = this.add.image(game.width / 2, game.height / 2, 'load_bar')
        var progress = this.add.sprite(game.width / 2, game.width / 2, 'progress')

        progress.anchor.setTo(.5)
        this.load.setProloadSprite(progress)

        // player sprite(s)


        // world icons
            // 5x4, 19 images
        game.load.spritesheet('earth', 'assets/sprites/earthLike.png', 64, 64)
            // 5x4, 19 images
        game.load.spritesheet('metal', 'assets/sprites/metalPlanet.png', 72, 72)
            // [0] = beige planet, [1] = red with stripe, [2] = reflective blue, [3] = red, [4] = saturn, [5] = jupiter, [6] = dull blue, [7] = ringed light blue, [8] = half manilla, half brown
        game.load.spritesheet('planets', 'assets/sprites/planets.png', 86, 86)
        
        // explosion
            // ******* subject to change *******
            // "7"x5, 23 images, indicies 0-4, 7-11, 14-18, 21-25, 28-30
        game.load.spritesheet('explosion', 'assets/sprites/explosion.png', 64/*62*/, 64/*58*/)
        
        // obstacles
            // has 9 frames on first row, 8 on row 2
        game.load.spritesheet('meteor', 'assets/sprites/meteor.png', 32 /*33*/, 115)


        // background
        game.load.image('background', 'assets/back_grounds/planets_bg.jpg')

        // audio


        // font
        game.load.bitmapFont('mainFont', 'font/ganonwhite/font.png', 'font/ganonwhite/font.xml')
    }

    create = function () {
        game.state.start("mainMenu")
    }
}