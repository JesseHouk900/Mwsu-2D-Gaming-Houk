var tunnel = {

	preload: function () {
		console.log("tunnel.js")
		// Load tile map
		game.load.tilemap('tunnel', 'assets/maps/tunnel.json', null, Phaser.Tilemap.TILED_JSON)
		
		// map tile images
		game.load.image('ground', 'assets/tileset/ground/brown.png')
		game.load.image('iron_lamp', 'assets/tileset/furniture/light/iron_lamp.png')
		game.load.image('flames', 'assets/tileset/furniture/light/flames.png')
		game.load.image('amazon', 'assets/tileset/logic/creature/amazon.png')
		game.load.image('skull_dark', 'assets/tileset/item/corpse/skull_dark.png')
		game.load.image('huge_animal', 'assets/tileset/item/corpse/huge_animal.png')
		game.load.image('rocks_2', 'assets/tileset/ground/rock/rocks_2.png')
		game.load.image('pink_crystal', 'assets/tileset/ground/rock/pink_crystal.png')
		game.load.image('green_crystal', 'assets/tileset/ground/rock/pink_crystal.png')
		game.load.image('huge_animal2', 'assets/tileset/logic/creature/huge_animal.png')
		game.load.image('animal', 'assets/tileset/logic/creature/animal.png')
		game.load.image('undead', 'assets/tileset/logic/creature/undead.png')
		game.load.image('elemental', 'assets/tileset/logic/creature/elemental.png')
		game.load.image('int_rock', 'assets/tileset/building/wall/int_rock.png')
		game.load.image('collision', 'assets/tileset/logic/collision.png')
		
	},

	create: function () {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Mpping layers and tilesets
		this.map = game.add.tilemap('tunnel')
		//this.map = game.addPauseButton.tilemap(game)
		this.map.addTilesetImage('ground', 'ground')
		this.map.addTilesetImage('logic/collision', 'collision')
		this.map.addTilesetImage('steel lamp', 'iron_lamp')
		this.map.addTilesetImage('flames', 'flames')
		this.map.addTilesetImage('amazoness', 'amazon')
		this.map.addTilesetImage('corpse', 'skull_dark')
		this.map.addTilesetImage('corpse 2', 'huge_animal')
		this.map.addTilesetImage('rocks', 'rocks_2')
		this.map.addTilesetImage('crystal', 'pink_crystal')
		this.map.addTilesetImage('crystal 2', 'green_crystal')
		this.map.addTilesetImage('huge animals', 'huge_animal2')
		this.map.addTilesetImage('animals', 'animal')
		this.map.addTilesetImage('undead', 'undead')
		this.map.addTilesetImage('elements', 'elemental')
		this.map.addTilesetImage('wall/int_rock', 'int_rock')
		this.layers = {
			ground: this.map.createLayer('0_floor'),
			terrain: this.map.createLayer('1_terrain'),
			object: this.map.createLayer('2_object'),
			roof: this.map.createLayer('3_roof'),
			collision: this.map.createLayer('collision'),
			protection: this.map.createLayer('protection')
		}
		
		this.layers.collision.alpha = 0
		
		game.physics.arcade.enable(this.layers.collision)
		
		// this.map.setCollision(tile_index, true, this.layer.layer)
		this.map.setCollision(1, true, this.layers.collision)
		//this.map.setTileIndexCallback(45, this)
		console.log(this.map)
		
		this.layers.ground.resizeWorld()
		
		// create player object
		this.player = new Player(game)
		this.player.create()
		//this.game.camera.follow(this.player)
		this.player.player.x = 1030
		this.player.player.y = 1030
		game.addPauseButton(game);
		this.player.player.anchor.setTo(0.5)
		game.camera.follow(this.player.player)
		
		// create enimies
		//this.enemy1 = new Enemy(game)
		// create parameters are the sprite, health
		//this.enemy1.create(100)
		//this.enemy2 = new Enemy(game)
		//this.enemy2.create(100)
		
		game.addPauseButton(game)
	},
	
	update: function () {
		this.player.update()
		//this.enemy1.spawnEnemy(1, /*groundtile*/'skeleton')
		//this.enemy2.spawnEnemy(1,/*otherGroundTile*/'zombie')

	},

	render: function(){
		game.debug.bodyInfo(this.player.player, 16, 24);
		// Instructions:
		game.debug.text( "Use arrow keys to move sprite around.", game.width/2, game.height-10 );
	}
}