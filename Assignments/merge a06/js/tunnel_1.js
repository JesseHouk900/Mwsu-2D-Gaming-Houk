// 27 on layer 1_terrain = small rock
// 4 on layer 0_ground = dirt floor
// collision is 1
var tunnel_1 = {
    init_health: 0,
    init_coins: 0,
    init: function (player, health, coins) {
        this.player = player
        this.player.player.animations.play('Idle_' + this.player.prevDir)
        this.init_health = health
        this.init_coins = coins
        if (game.global.debugging) {
            //console.log(coins)
            //console.log(this.player)
        
        }
    },
	preload: function () {
		console.log("tunnel_1.js")
		// Load tile map
		game.load.tilemap('tunnel_1', 'assets/maps/tunnel_1.json', null, Phaser.Tilemap.TILED_JSON)
		
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
		this.map = game.add.tilemap('tunnel_1')
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
		
		this.layers.ground.resizeWorld()
		console.log(this.map)
		
		// create player object
        this.player.create(this.init_health, this.init_coins)
        
        this.player.player.body.velocity.x = 0
        this.player.player.body.velocity.y = 0
		if (game.global.debugging) {
            this.player.player.x = 99 * 32
            this.player.player.y = 124 * 32
		}
		else {
			this.player.player.x = 124 * 32
			this.player.player.y = 44 * 32
		}
		//game.addPauseButton(game);
		this.player.player.anchor.setTo(0.5)
		game.camera.follow(this.player.player)
		//console.log(this.player)
		// create enimies
		// debugging
		// this.enemy1.spawnEnemyAt(this.player.player.x +40, this.player.player.y, 'skeleton', 100)
		this.enemy1 = new Enemy(game)
		// create parameter is health
		this.enemy1.create()
		this.enemy2 = new Enemy(game)
		this.enemy2.create()

		game.addPauseButton(game)
		this.hud = new HUD(game, 'Player', 110, 410)
		this.hud.addItem(this.player.player, 'health', true)

        this.coins = game.add.group()
        this.shiningCoins = game.add.group()
		this.spawnCoins('coin', 15, 82, 128, 5, 128)
		this.spawnCoins('shiningCoin', 5, 82, 128, 5, 128)
		
		// this.addCoinsAlongX(5, 'coin', 34, 32)
		
		// this.addCoinsAlongX(10, 'coin', 7, 50)
		// this.addCoinsAlongX(3, 'shiningCoin', 27, 78)
		// this.addCoinsAlongX(3, 'shiningCoin', 27, 81)
		// this.addCoinsAlongX(3, 'shiningCoin', 27, 84)
		this.hud.addItem(this.player.player, 'coins', true)

		this.hud.create()
	},
	
	update: function () {
		//console.log('update')
        this.player.update()
		
		if (this.enemy1.isSpawned) {
			this.enemy1.update(this.player.player)
		}
		else {
			this.enemy1.spawnEnemy(this, 4, 0, 'skeleton', 'left', 100)
		}
		if (this.enemy2.isSpawned) {
			this.enemy2.update(this.player.player)
		}
		else {
			this.enemy2.spawnEnemy(this, 27, 1, 'zombie', 'right', 100)
		}
		//console.log(this.player.player.animations.currentFrame)
        // debugging
        console.log(this.player.player)
		//console.log('update')
		if (this.player.player.animations.currentFrame.name.includes('Idle')) {
			//console.log(this.map)
			//console.log(this.map.getTileWorldXY(this.player.player.x, this.player.player.y/*, 32, 32, this.layers.terrain*/))
			
		}
		this.hud.updateHUD()
		// collision with walls
		game.physics.arcade.collide(this.player.player, this.layers.collision)
		game.physics.arcade.collide(this.enemy1.enemy, this.layers.collision)
		game.physics.arcade.collide(this.enemy2.enemy, this.layers.collision)
		// check enemy attack
		game.physics.arcade.overlap(this.player.player, this.enemy1.enemy, this.hurtPlayer, null, this)
		game.physics.arcade.overlap(this.player.player, this.enemy2.enemy, this.hurtPlayer, null, this)
		// overlap with pick ups
		this.checkCoins()
		this.checkFinish()
		this.checkGameOver()
	},

	hurtPlayer: function() {
		this.player.player.data['health'] -= 2
		//console.log
		this.killPlayer()
	},

	killPlayer: function() {
		//this.player.playerLives--
		this.player.checkLives()
	},

	checkFinish: function () {
		if (Math.round(this.player.player.x / 32) > 98 && Math.round(this.player.player.x / 32) < 104 && Math.round(this.player.player.y / 32) > 125) {
			game.global.current_level = 'tunnel_2'
			game.global.level++
			game.state.start(game.global.current_level, true, false, this.player, this.player.player.data['health'], this.player.player.data['coins'])
		}
	},

	checkGameOver: function () {
		//console.log('death?')
		if (this.player.gameOver) {
			game.global.current_level = 'gameOver'
			game.state.start(game.global.current_level, true, true)
		}
	},

    spawnCoins: function (name, num, xmin, xmax, ymin, ymax) {
		if (name == 'coin') {
			group = this.coins

		}
		if (name == 'shiningCoin') {
			group = this.shiningCoins

		}
		for(; group.length != num;) {
			x = game.rnd.integerInRange(xmin, xmax)
            y = game.rnd.integerInRange(ymin, ymax)
            x *= 32
            y *= 32
			if (this.map.getTileWorldXY(x, y, 32, 32, this.layers.collision) == null) {
				console.log('x: ' + x + '    y: ' + y)
				item = new PickUp(game)
				item.create(name, x, y)
				group.add(item.item)
				// if (name === 'coin') {
				// 	this.coins.add(item.item)
				// }
				// if (name === 'shiningCoin') {
				// 	this.shiningCoins.add(item.item)
				// }
			}
		}
		if (name == 'coin') {
			this.coins = group

		}
		if (name == 'shiningCoin') {
			this.shiningCoins = group

		}
    },
    
	checkCoins: function () {
		for (var i = 0; i < this.coins.length; i++) {
			//console.log(this.coins.children[i])
			if (Phaser.Rectangle.intersects(this.player.player.getBounds(), this.coins.children[i].getBounds())) {
				this.pickUpItem(this.coins.children[i])
			}

		}
		for (var i = 0; i < this.shiningCoins.length; i++) {
			//console.log(this.shiningCoins.children[i])
			if (Phaser.Rectangle.intersects(this.player.player.getBounds(), this.shiningCoins.children[i].getBounds())) {
				this.pickUpItem(this.shiningCoins.children[i])
			}

		}
	},

	pickUpItem: function (item) {
		//console.log(item)
		if (item.key == 'coin') {
			item.destroy()
			this.player.player.data['coins']++
        }
        if (item.key == 'shiningCoin') {
            item.destroy()
			this.player.player.data['coins'] += 5
        }
        // if (type == 'health') {}
	},

	addCoinsAlongX: function (num, name, start, y) {
		for (var i = 0; i < num; i++) {
			item = new PickUp(game)
			item.create(name, (start * 32) + (48 * i), (32 * y))
			this.coins.add(item.item)
			//console.log(this.coins)
		}
	}
}