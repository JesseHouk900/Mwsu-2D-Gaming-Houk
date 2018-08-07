var cave = {
    init_health: 0,
    init_coins: 0,
    
    up: 0,
    
    init: function (player, health, coins) {
        if (game.global.debugging) {
            //console.log(coins)
            //console.log(this.player)
            
        }
        else { 
            this.player = player
            this.player.player.animations.play('Idle_' + this.player.prevDir)
            this.init_health = health
            this.init_coins = coins
        }
    },

    preload: function () {
        console.log("cave")
        //loading tilemap
        game.load.tilemap('cave', 'assets/maps/cave.json', null, Phaser.Tilemap.TILED_JSON);
        //mapping tile .pngs
        game.load.image('collision', 'assets/tileset/logic/collision.png');
        game.load.image('ground/brown', 'assets/tileset/ground/brown.png');
        game.load.image('rock/rocks_2', 'assets/tileset/ground/rock/rocks_2.png');
        game.load.image('floor_tiles', 'assets/tileset/ground/indoor/floor_tiles.png');
        game.load.image('rocks', 'assets/tileset/ground/rock/rocks.png');
        game.load.image('wall/int_rock', 'assets/tileset/building/wall/int_rock.png');
        game.load.image('purple_crystal', 'assets/tileset/ground/rock/purple_crystal.png');
        game.load.image('stairs', 'assets/tileset/building/stairs/stairs.png');
        game.load.image('dark_stairs', 'assets/tileset/building/stairs/dark_stairs.png');
        game.load.image('blood/floor_stain', 'assets/tileset/item/blood/floor_stain.png');
        game.load.image('blood/nsew_stains', 'assets/tileset/item/blood/nsew_stains.png');
        game.load.image('corpse/skeleton', 'assets/tileset/item/corpse/skeleton.png');
        game.load.image('corpse/huge_animal', 'assets/tileset/item/corpse/huge_animal.png');
        game.load.image('skull_dark', 'assets/tileset/item/corpse/skull_dark.png');
        game.load.image('skull_pale', 'assets/tileset/item/corpse/skull_pale.png');
        game.load.image('broken_green_column', 'assets/tileset/item/statue/broken_green_column.png');
        game.load.image('blackened_column', 'assets/tileset/item/statue/blackened_column.png');
        game.load.image('mushroom3', 'assets/tileset/plant/mushroom3.png');
        //game.load.image('star_shaped_plants', 'assets/tileset/plant/star_shaped_plants.png');
        game.load.image('portal', 'assets/tileset/logic/portal.png');
        game.load.image('creature/giant_human', 'assets/tileset/logic/creature/giant_human.png');
        game.load.image('creature/mutant', 'assets/tileset/logic/creature/mutant.png');
        game.load.image('creature/huge_animal', 'assets/tileset/logic/creature/huge_animal.png');
        game.load.image('ground/brown', 'assets/tileset/ground/brown.png');
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Mpping layers and tilesets
		this.map = game.add.tilemap('cave')
        //mapping tilesets
        this.map.addTilesetImage('collision', 'collision');
        this.map.addTilesetImage('ground/brown', 'ground/brown');
        this.map.addTilesetImage('rock/rocks_2', 'rock/rocks_2');
        this.map.addTilesetImage('floor_tiles', 'floor_tiles');
        this.map.addTilesetImage('rocks', 'rocks');
        this.map.addTilesetImage('wall/int_rock', 'wall/int_rock');
        this.map.addTilesetImage('purple_crystal', 'purple_crystal');
        this.map.addTilesetImage('stairs', 'stairs');
        this.map.addTilesetImage('dark_stairs', 'dark_stairs');
        this.map.addTilesetImage('blood/floor_stain', 'blood/floor_stain');
        this.map.addTilesetImage('blood/nsew_stains', 'blood/nsew_stains');
        this.map.addTilesetImage('corpse/skeleton', 'corpse/skeleton');
        this.map.addTilesetImage('corpse/huge_animal', 'corpse/huge_animal');
        this.map.addTilesetImage('skull_dark', 'skull_dark');
        this.map.addTilesetImage('skull_pale', 'skull_pale');
        this.map.addTilesetImage('broken_green_column', 'broken_green_column');
        this.map.addTilesetImage('blackened_column', 'blackened_column');
        this.map.addTilesetImage('mushroom3', 'mushroom3');
        //this.map.addTilesetImage('star_shaped_plant', 'star_shaped_plant');
        //this.map.addTilesetImage('portal', 'portal');
        this.map.addTilesetImage('creature/giant_human', 'creature/giant_human');
        this.map.addTilesetImage('creature/mutant', 'creature/mutant');
        this.map.addTilesetImage('creature/huge_animal', 'creature/huge_animal');
        this.map.addTilesetImage('ground/brown', 'ground/brown');
        //map layers
        this.layers = {
            ground_layer: this.map.createLayer('0_floor'),
            terrain_layer: this.map.createLayer('1_terrain'),
            object_layer: this.map.createLayer('2_object'),
            roof_layer: this.map.createLayer('3_roof'),
            roofAdd_layer: this.map.createLayer('4_roof_add'),
            objects: this.map.createLayer('objects'),
            collision: this.map.createLayer('collision'),
            protection: this.map.createLayer('protection'),
            blendGround: this.map.createLayer('blend_ground'),
            blendRoof: this.map.createLayer('blend_roof')
        }
        //hide the collision layer
        this.layers.collision.alpha = 0;
        this.layers.protection.alpha = 0
        //set up collision
        game.physics.arcade.enable(this.layers.collision);
        this.map.setCollision(1, true, this.layers.collision);
        this.layers.ground_layer.resizeWorld();
        console.log(this.map)

        this.portal = game.add.sprite(17 * 32, 17 * 32, 'portal')
        this.portal.animations.add('swirl')
        this.portal.animations.play('swirl')
        // create player object
        if (game.global.debugging) {
            this.player = new Player(game)
		    this.player.create(100)
        }
        else {
            this.player.create(this.init_health, this.init_coins)
            this.player.player.body.velocity.x = 0
            this.player.player.body.velocity.y = 0
        }
        this.player.player.x = 15 * 32
        this.player.player.y = 15 * 32
        
        game.addPauseButton(game);
        this.player.player.anchor.setTo(0.5)
        game.camera.follow(this.player.player)
        if (game.global.debugging) {
            //console.log(this.player.player)
        }
        this.enemy1 = new Enemy(game)
        this.enemy1.create()
        this.enemy2 = new Enemy(game)
        this.enemy2.create()
        
        game.addPauseButton(game)
        this.hud = new HUD(game, 'Player', 110, 410)
        this.hud.addItem(this.player.player, 'health', true)
        
        this.coins = game.add.group()
		// for (var i = 0; i < 3; i++) {
		// 	item = new PickUp(game)
		// 	item.create('coin', 75 + (48 * i), 75)
		// 	this.coins.add(item.item)
		// 	//console.log(this.coins)
		// }
        this.hud.addItem(this.player.player, 'coins', true)
        
        this.hud.create()
    },

    update: function () {
        this.player.update()
        
        if (game.global.debugging) {
            // if (this.up == 0) {
            //     console.log('up')
    
            // }
            true//console.log(this.player.player.animations.currentFrame)
            // debugging
            // if (this.player.player.animations.currentFrame.name.includes('Idle')) {
            //     // console.log(this.player.player)
            //     console.log(this.map.getTileWorldXY(this.player.player.x, this.player.player.y, 32, 32, this.layers.collision))
                
            // }
        }
        else {
            if (this.enemy1.isSpawned) {
                this.enemy1.update(this.player.player)
            }
            else {
                // parameters are an instance of the state, what tile index the enemy will spawn on, 
                // what layer the index belongs to, the enemy type, what direction the enemy faces 
                // if it only faces one direction, and the health of the enemy
                this.enemy1.spawnEnemy(this, 761, 1, 'skeleton', 'left', 100)
            }
            if (this.enemy2.isSpawned) {
                this.enemy2.update(this.player.player)
            }
            else {
                this.enemy2.spawnEnemy(this, 761, 1, 'zombie', 'right', 100)
            }
        }
		this.hud.updateHUD()

		// collision with walls
		//game.physics.arcade.collide(this.player.player, this.layers.collision)
		// game.physics.arcade.collide(this.enemy1.enemy, this.layers.collision)
        // game.physics.arcade.collide(this.enemy2.enemy, this.layers.collision)
        
		// check enemy attack
		// game.physics.arcade.overlap(this.player.player, this.enemy1.enemy, this.hurtPlayer, null, this)
        // game.physics.arcade.overlap(this.player.player, this.enemy2.enemy, this.hurtPlayer, null, this)
        
        this.checkCoins()
        //this.checkFinish()
        this.checkGameOver()
        if (game.global.debugging) {
            // this.up++
            // if (this.up == 1) {
            //     console.log('up2')

            // }
        }
    },
    
    hurtPlayer: function() {
		this.player.player.data['health'] -= 2
		this.killPlayer()
	},

	killPlayer: function() {
		//this.player.playerLives--
		this.player.checkLives()
	},

	checkFinish: function () {
        game.physics.arcade.overlap(this.player.player, this.portal)
	},

	checkGameOver: function () {
        if (this.player.gameOver) {
            game.global.current_level = 'gameOver'
			game.state.start(game.global.current_level, true, true)
        }
        if (game.global.debugging) {
            console.log(this.player.gameOver)
        }
	},
    
	checkCoins: function () {
        for (var i = 0; i < this.coins.length; i++) {
            if (game.global.debugging) {
                //console.log('x: ' + this.coins.children[i].x + '          y: ' + this.coins.children[i].y)
                //console.log(Phaser.Rectangle.intersects(this.player.player.getBounds(), this.coins.children[i].getBounds()))
            }
			if (Phaser.Rectangle.intersects(this.player.player.getBounds(), this.coins.children[i].getBounds())) {
				this.pickUpItem(this.coins.children[i])
			}

		}
    },
    
    pickUpItem: function (item) {
		if (game.global.debugging) {
            //console.log(item)
            
        }
		if (item.key == 'coin') {
			item.destroy()
			this.player.player.data['coins']++
        }
        if (item.key == 'coin_bag') {
            item.destroy()
			this.player.player.data['coins'] += 5
        }
        // if (type == 'health') {}
	}
}