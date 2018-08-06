var cave = {
    init_health: 0,
    init_coins: 0,
    init: function (player, health, coins) {
        console.log(player)
        this.player = player
        this.init_health = health
        this.init_coins = coins
       // this.player.create(health)
        console.log(this.player)
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
        //game.load.image('skull_dark', 'tileset/item/corpse/skull_dark.png');
        //game.load.image('skull_pale', 'tileset/item/corpse/skull_pale.png');
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
        //this.map.addTilesetImage('skull_dark', 'skull_dark');
        //this.map.addTilesetImage('skull_pale', 'skull_pale');
        this.map.addTilesetImage('broken_green_column', 'broken_green_column');
        this.map.addTilesetImage('blackened_column', 'blackened_column');
        this.map.addTilesetImage('mushroom3', 'mushroom3');
        //this.map.addTilesetImage('star_shaped_plant', 'star_shaped_plant');
        this.map.addTilesetImage('portal', 'portal');
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
        //set up collision
        game.physics.arcade.enable(this.layers.collision);
        this.map.setCollision(1, true, this.layers.collision);
        //needs correct index
        //this.map.setTileIndexCallback(index,this.hitWall,this);

        this.layers.ground_layer.resizeWorld();
        // create player object
        this.player = new Player(game)
        this.player.create(this.init_health, this.init_coins)
        //this.game.camera.follow(this.player)
        this.player.player.x = 1030
        this.player.player.y = 1056
        game.addPauseButton(game);
        this.player.player.anchor.setTo(0.5)
        game.camera.follow(this.player.player)

        //this.enemy1 = new Enemy(game)
        //create parameter is health
        //this.enemy1.create()
        //this.enemy2 = new Enemy(game)
        //this.enemy2.create()
        console.log(this.player.player)
        game.addPauseButton(game)
        this.hud = new HUD(game, 'Player', 110, 410)
        this.items = []
		for (var i = 0; i < 3; i++) {

		this.items.push(new PickUp(game))
		this.items[i].create('coin', 1030 + (48 * i), 1056)
		}
        this.hud.addItem(this.player.player, 'health', true)
        //this.hud.addItem(this.player.player, 'coins')
        this.hud.create()


    },

    update: function () {
        this.player.update()

        this.hud.updateHUD()
		// collision with walls
		game.physics.arcade.collide(this.player.player, this.layers.collision)

		//game.physics.arcade.collide(this.enemy1.enemy, this.layers.collision)
		//game.physics.arcade.collide(this.enemy2.enemy, this.layers.collision)
		// check enemy attack
		//game.physics.arcade.overlap(this.player.player, this.enemy1.enemy, this.hurtPlayer, null, this)
		//game.physics.arcade.overlap(this.player.player, this.enemy2.enemy, this.hurtPlayer, null, this)

    },
    hitWall: function () {
		console.log('hitWall')
		//this.player.player.velocity = 
	},

	render: function(){
		// game.debug.bodyInfo(this.player.player, 16, 24);
		// // Instructions:
		// game.debug.text( "Use arrow keys to move sprite around.", game.width/2, game.height-10 );
	}, 

	hurtPlayer: function() {
		this.player.player.data['health'] -= 2
		//console.log
		this.killPlayer
	},

	killPlayer: function() {
		//this.player.playerLives--
		this.player.checkLives()
	}
}