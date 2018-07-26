var level_01 = {

	preload: function () {
		console.log("level_01.js")
		// Load tile map
		game.load.tilemap('level_01', 'assets/maps/tunnel.json', null, Phaser.Tilemap.TILED_JSON)
		
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
		this.map = game.addPauseButton.tilemap('level_01')
		this.map.addTilesetImage('ground', 'ground')
		this.map.addTilesetImage('logic/collision', 'collision')
		this.map.addTilesetImage('iron lamp', 'iron_lamp')
		this.map.addTilesetImage('flames', 'flames')
		this.map.addTilesetImage('amazonian', 'amazon')
		this.map.addTilesetImage('corpse', 'skull_dark')
		this.map.addTilesetImage('corpse 2', 'huge_animal')
		this.map.addTilesetImage('ground', 'ground')
		this.map.addTilesetImage('ground', 'ground')
		this.map.addTilesetImage('ground', 'ground')
		this.map.addTilesetImage('ground', 'ground')
		this.map.addTilesetImage('ground', 'ground')
		this.map.addTilesetImage('ground', 'ground')
		this.map.addTilesetImage('ground', 'ground')
		this.map.addTilesetImage('ground', 'ground')
		
		this.prevDir = '';	// holds sprites previous direction (left , right) so
		// we can face the correct direction when using the 'idle' animation
		this.player = new Player(game)
		this.player.create()

		game.addPauseButton(game);
	},

	update: function () {
		this.player.update()
		

	},

	render: function(){
		game.debug.bodyInfo(this.player, 16, 24);
		// Instructions:
		game.debug.text( "Use arrow keys to move sprite around.", game.width/2, game.height-10 );
	}
}