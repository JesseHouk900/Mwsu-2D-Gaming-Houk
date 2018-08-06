var cave2 = {
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
        console.log("cave2.js")
        //loading tilemap
        game.load.tilemap('cave2', 'assets/maps/cave2.json', null, Phaser.Tilemap.TILED_JSON);
        //mapping tile .pngs
        game.load.image('brown', 'assets/tileset/ground/brown.png');
        game.load.image('skull_dark', 'assets/tileset/item/corpse/skull_dark.png');
        game.load.image('grey_stone', 'assets/tileset/item/statue/grey_stone.png');
        game.load.image('eye', 'assets/tileset/ground/eye.png');
        game.load.image('dark_stairs', 'assets/tileset/building/stairs/dark_stairs.png');
        game.load.image('portal', 'assets/tileset/logic/portal.png');
        game.load.image('collision', 'assets/tileset/logic/collision.png');
        //game.load.image('enourmous_creature', 'assets/tileset/logic.creature/enourmous_creature.png');
        game.load.image('demon', 'assets/tileset/logic/creature/demon.png');
        game.load.image('elemental', 'assets/tileset/logic/creature/elemental.png');
        game.load.image('undead', 'assets/tileset/logic/creature/undead.png');
        //game.load.image('human', 'assets/tileset/logic.creature/human.png');
        game.load.image('iron_lamp', 'assets/tileset/furniture/light/iron_lamp.png');
        game.load.image('flames', 'assets/tileset/furniture/light/flames.png');
        game.load.image('skeleton', 'assets/tileset/item/corpse/skeleton.png');
        game.load.image('metal_and_stone', 'assets/tileset/item/statue/metal_and_stone.png');
        game.load.image('floor_stains_2', 'assets/tileset/item/blood/floor_stains_2.png');
        game.load.image('floor_stain', 'assets/tileset/item/blood/floor_stain.png');
        game.load.image('nsew_stains', 'assets/tileset/item/blood/nsew_stains.png');
        game.load.image('int_rock', 'assets/tileset/building/wall/int_rock.png');
        game.load.image('brown_edges', 'assets/tileset/ground/brown_edges.png');
        game.load.image('tan_building', 'assets/tileset/building/tan_building.png');
        game.load.image('sand_1', 'assets/tileset/ground/sand_1.png');
        game.load.image('sand_2', 'assets/tileset/ground/sand_2.png');
        game.load.image('brown_corners', 'assets/tileset/ground/brown_corners.png')
        game.load.image('window_centered', 'assets/tileset/building/window/window_centered.png');
        game.load.image('closed', 'assets/tileset/building/door/closed.png');
        game.load.image('door', 'assets/tileset/building/door/door.png');
        game.load.image('large_green', 'assets/tileset/plant/bush/large_green.png');
        game.load.image('dim_yellow_light_7x5', 'assets/tileset/light/dim_yellow_light_7x5.png');
        game.load.image('dim_yellow_light_5x5', 'assets/tileset/light/dim_yellow_light_5x5.png');
        game.load.image('blobcreature', 'assets/tileset/item/statue/blobcreature.png');
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Mpping layers and tilesets
		this.map = game.add.tilemap('cave2')
        //mapping tilesets
        this.map.addTilesetImage('brown', 'brown');
        this.map.addTilesetImage('skull_dark', 'skull_dark');
        this.map.addTilesetImage('grey_stone', 'grey_stone');
        this.map.addTilesetImage('eye', 'eye');
        this.map.addTilesetImage('dark_stairs', 'dark_stairs');
        this.map.addTilesetImage('portal', 'portal');
        this.map.addTilesetImage('collision', 'collision');
        //this.map.addTilesetImage('enourmous_creature', 'enourmous_creature');
        this.map.addTilesetImage('demon', 'demon');
        this.map.addTilesetImage('elemental', 'elemental');
        this.map.addTilesetImage('undead', 'undead');
        //this.map.addTilesetImage('human', 'human');
        this.map.addTilesetImage('iron_lamp', 'iron_lamp');
        this.map.addTilesetImage('flames', 'flames');
        this.map.addTilesetImage('skeleton', 'skeleton');
        this.map.addTilesetImage('metal_and_stone', 'metal_and_stone');
        this.map.addTilesetImage('floor_stains_2', 'floor_stains_2');
        this.map.addTilesetImage('floor_stain', 'floor_stain');
        this.map.addTilesetImage('nsew_stains', 'nsew_stains');
        this.map.addTilesetImage('int_rock', 'int_rock');
        this.map.addTilesetImage('brown_edges', 'brown_edges');
        this.map.addTilesetImage('window_centered', 'window_centered');
        this.map.addTilesetImage('closed', 'closed');
        this.map.addTilesetImage('door', 'door');
        this.map.addTilesetImage('large_green', 'large_green');
        this.map.addTilesetImage('dim_yellow_light_7x5', 'dim_yellow_light_7x5');
        this.map.addTilesetImage('dim_yellow_light_5x5', 'dim_yellow_light_5x5');
        this.map.addTilesetImage('blobcreature', 'blobcreature');
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

        this.enemy1 = new Enemy(game)
        // create parameter is health
        this.enemy1.create()
        this.enemy2 = new Enemy(game)
        this.enemy2.create()
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

		game.physics.arcade.collide(this.enemy1.enemy, this.layers.collision)
		game.physics.arcade.collide(this.enemy2.enemy, this.layers.collision)
		// check enemy attack
		game.physics.arcade.overlap(this.player.player, this.enemy1.enemy, this.hurtPlayer, null, this)
		game.physics.arcade.overlap(this.player.player, this.enemy2.enemy, this.hurtPlayer, null, this)

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