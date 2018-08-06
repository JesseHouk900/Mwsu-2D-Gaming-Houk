var islands = {
    preload: function () {
        //loading tilemap
        game.load.tilemap('islands', 'assets/maps/islands.json', null, Phaser.Tilemap.TILED_JSON);
        //mapping tile .pngs
        game.load.image('ground', 'assets/tileset/ground/ground.png');
        //game.load.image('earth_dark', 'assets/tileset/ground/earth_dark.png');
        game.load.image('grass_edges', 'assets/tileset/ground/grass_edges.png');
        game.load.image('grass_corners', 'assets/tileset/ground/grass_corners.png');
        game.load.image('grasses', 'assets/tileset/plant/grasses.png');
        game.load.image('earth_edges', 'assets/tileset/ground/earth_edges.png');
        game.load.image('huge_animal', 'assets/tileset/item/corpse/huge_animal.png');
        game.load.image('small_stump', 'assets/tileset/plant/stump/small_stump.png');
        game.load.image('eye', 'assets/tileset/ground/eye.png');
        game.load.image('collision', 'assets/tileset/logic/collision.png');
        game.load.image('portal', 'assets/tileset/logic/portal.png');
        game.load.image('palm_tree', 'assets/tileset/plant/tree/palm_tree.png');
        game.load.image('tree_blue', 'assets/tileset/plant/tree/tree_blue.png');
        game.load.image('tree_golden_large', 'assets/tileset/plant/tree/tree_golden_large.png');
        game.load.image('tree_golden_small', 'assets/tileset/plant/tree/tree_golden_small.png');
        game.load.image('green_stone_2', 'assets/tileset/item/statue/green_stone_2.png');
        game.load.image('blue_circle', 'assets/tileset/building/decoration/blue_circle.png');
        //game.load.image('giant_human', 'timeset/logic/creature/giant_human.png');
        game.load.image('naga', 'assets/tileset/logic/creature/naga.png');
        game.load.image('daisy_white', 'assets/tileset/plant/flower/daisy_white.png');
        game.load.image('daisy_yellow', 'assets/tileset/plant/flower/daisy_yellow.png');
        game.load.image('stump_pale_brown', 'assets/tileset/plant/stump/stump_pale_brown.png');
        game.load.image('stump_brown', 'assets/tileset/plant/stump/stump_brown.png');
        game.load.image('floor_sparkle', 'assets/tileset/building/decoration/floor_sparkle.png');
        game.load.image('green_stone_3', 'assets/tileset/item/statue/green_stone_3.png');
        game.load.image('vine', 'assets/tileset/plant/vine.png');
        game.load.image('fairy', 'assets/tileset/logic/creature/fairy.png');
        game.load.image('demon', 'assets/tileset/logic/creature/demon.png');
        game.load.image('elemental', 'assets/tileset/logic/creature/elemental.png');
        game.load.image('suspension_bridge', 'assets/tileset/object/suspension_bridge.png')
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
		// Mpping layers and tilesets
		this.map = game.add.tilemap('islands')
        //mapping tilesets
        this.map.addTilesetImage('ground', 'ground');
       // this.map.addTilesetImage('earth_dark', 'earth_dark');
        this.map.addTilesetImage('grass_edges', 'grass_edges');
        this.map.addTilesetImage('grass_corners', 'grass_corners');
        this.map.addTilesetImage('grasses', 'grasses');
        this.map.addTilesetImage('earth_edges', 'earth_edges');
        this.map.addTilesetImage('huge_animal', 'huge_animal');
        this.map.addTilesetImage('small_stump', 'small_stump');
        this.map.addTilesetImage('eye', 'eye');
        this.map.addTilesetImage('collision', 'collision');
        this.map.addTilesetImage('portal', 'portal');
        this.map.addTilesetImage('palm_tree', 'palm_tree');
        this.map.addTilesetImage('tree_blue', 'tree_blue');
        this.map.addTilesetImage('tree_golden_large', 'tree_golden_large');
        this.map.addTilesetImage('tree_golden_small', 'tree_golden_small');
        this.map.addTilesetImage('green_stone_2', 'green_stone_2');
        this.map.addTilesetImage('blue_circle', 'blue_circle');
        //this.map.addTilesetImage('giant_human', 'giant_human');
        this.map.addTilesetImage('naga', 'naga');
        this.map.addTilesetImage('daisy_white', 'daisy_white');
        this.map.addTilesetImage('daisy_yellow', 'daisy_yellow');
        this.map.addTilesetImage('stump_pale_brown', 'stump_pale_brown');
        this.map.addTilesetImage('stump_brown', 'stump_brown');
        this.map.addTilesetImage('floor_sparkle', 'floor_sparkle');
        this.map.addTilesetImage('green_stone_3', 'green_stone_3');
        this.map.addTilesetImage('vine', 'vine');
        this.map.addTilesetImage('fairy', 'fairy');
        this.map.addTilesetImage('demon', 'demon');
        this.map.addTilesetImage('elemental', 'elemental');
        this.map.addTilesetImage('suspension_bridge', 'suspension_bridge');
        //map layers
        this.layers = {
            ground_layer: this.map.createLayer('0_floor'),
            terrain_layer: this.map.createLayer('1_terrain'),
            object_layer: this.map.createLayer('2_object'),
            roof_layer: this.map.createLayer('3_roof'),
            roofAdd_layer: this.map.createLayer('4_roof_add'),
            objects: this.map.createLayer('objects'),
            collision: this.map.createLayer('collision')
        };
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
        this.player.create(100)
        //this.game.camera.follow(this.player)
        this.player.player.x = 1024
        this.player.player.y = 1024
        game.addPauseButton(game);
        this.player.player.anchor.setTo(0.5)
        game.camera.follow(this.player.player)
        //console.log(this.player)
        //this.enemy1 = new Enemy(game)
        // create parameter is health
        //this.enemy1.create()
        //this.enemy2 = new Enemy(game)
        //this.enemy2.create()
        console.log(this.player.player)
        game.addPauseButton(game)
        this.hud = new HUD(game, 'Player', 110, 410)
        this.hud.addItem(this.player.player, 'health', true)
        //this.hud.addItem(this.player.player, 'coins')
        this.hud.create()

    },

    update: function () {
        //console.log('update')
		this.player.update()
		this.hud.updateHUD()
		// collision with walls
		game.physics.arcade.collide(this.player.player, this.layers.collision)

		// game.physics.arcade.collide(this.enemy1.enemy, this.layers.collision)
		// game.physics.arcade.collide(this.enemy2.enemy, this.layers.collision)
		// // check enemy attack
		// game.physics.arcade.overlap(this.player.player, this.enemy1.enemy, this.hurtPlayer, null, this)
		// game.physics.arcade.overlap(this.player.player, this.enemy2.enemy, this.hurtPlayer, null, this)

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