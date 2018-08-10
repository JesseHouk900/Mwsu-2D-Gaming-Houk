preload = {
    preload: function () {
        var loading_bar = this.add.image(game.width / 2, game.height / 2, 'load_bar')
        var progress = this.add.sprite(game.width / 2, game.width / 2, 'progress')

        progress.anchor.setTo(.5)
        this.load.setPreloadSprite(progress)

        game.global.backgroundScaleX = game.width / config.maxWidth
        game.global.backgroundScaleY = game.height / config.maxHeight
        // player sprite(s)
        game.load.spritesheet('ufo', 'assets/sprites/ufo_sprite.png', 50, 50)
        // game.load.atlas('ufoAtlas', 'assets/sprites/ufo-sheet_2.png', 'assets/sprites/ufo-atlas_2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
        game.load.image('bullet', 'assets/sprites/laserBlue02.png');
        
        // explosion
        // ******* subject to change *******
        // "7"x5, 23 images, indicies 0-4, 7-11, 14-18, 21-25, 28-30
        game.load.spritesheet('explosion', 'assets/sprites/explosion.png', 64/*62*/, 64/*58*/)
        // obstacles
        // has 9 frames on first row, 8 on row 2
        game.load.spritesheet('meteor', 'assets/sprites/meteor.png', 32 /*33*/, 115)
        // 5x4, 19 images
        game.load.spritesheet('earth', 'assets/sprites/earthLike.png', 64, 64)
        // 5x4, 19 images
        game.load.spritesheet('metal', 'assets/sprites/metalPlanet.png', 72, 72)
        // [0] = beige planet, [1] = red with stripe, [2] = reflective blue, [3] = red, [4] = saturn, [5] = jupiter, [6] = dull blue, [7] = ringed light blue, [8] = half manilla, half brown
        game.load.spritesheet('planet_0', 'assets/sprites/planet_0.png', 57, 57)
        game.load.spritesheet('planet_1', 'assets/sprites/planet_1.png', 57, 57)
        game.load.spritesheet('planet_2', 'assets/sprites/planet_2.png', 57, 57)
        game.load.spritesheet('planet_3', 'assets/sprites/planet_3.png', 57, 57)
        game.load.spritesheet('planet_4', 'assets/sprites/planet_4.png', 118, 59)
        game.load.spritesheet('planet_5', 'assets/sprites/planet_5.png', 57, 57)
        game.load.spritesheet('planet_6', 'assets/sprites/planet_6.png', 57, 57)
        game.load.spritesheet('planet_7', 'assets/sprites/planet_7.png', 57, 57)
        game.load.spritesheet('planet_8', 'assets/sprites/planet_8.png', 57, 57)
        
        // reticle
        game.load.image('person', 'assets/images/person.png')
        game.load.image('shocked', 'assets/images/shocked.png')

        // background
        game.load.image('background', 'assets/back_grounds/planets_bg_1000x750.jpg')

        // audio


        // font
        game.load.bitmapFont('mainFont', 'assets/font/ganonwhite/font.png', 'assets/font/ganonwhite/font.xml')
    },

    create: function () {
        game.state.start("mainMenu")
    }
}