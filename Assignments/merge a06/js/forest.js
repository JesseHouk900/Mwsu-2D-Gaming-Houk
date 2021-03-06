// 435 on layer 1_terrain = temple door
// 761 on layer 1_terrain = tiled path
// collision is 322
var forest = {
    init_health: 0,
    init_coins: 0,
    init_x: 64 * 32,
    init_y: 102 * 32,
    init: function (player, health, coins, last_level) {
        this.player = player
        this.player.player.animations.play('Idle_' + this.player.prevDir)
        this.init_health = health
        this.init_coins = coins
        if (last_level == '3') {
            this.init_x = 71 * 32
            this.init_y = 126 * 32
        }
        if (game.global.debugging) {
            //console.log(coins)
            //console.log(this.player)
        
        }
    },

    preload:function(){
        console.log('forest.js')
        //loading tilemap
        game.load.tilemap('forest_e', 'assets/maps/forest_e.json', null, Phaser.Tilemap.TILED_JSON);
        //mapping tile .pngs
        game.load.image('ground','assets/tileset/ground/ground.png');
        game.load.image('pool','assets/tileset/ground/water/pool.png');
        game.load.image('earth_dark','assets/tileset/ground/ridge/earth_dark.png');
        game.load.image('grass_edges','assets/tileset/ground/grass_edges.png');
        game.load.image('earth_edges','assets/tileset/ground/earth_edges.png');
        game.load.image('grass_corners','assets/tileset/ground/grass_corners.png');
        game.load.image('daisy_blue','assets/tileset/plant/flower/daisy_blue.png');
        game.load.image('daisy_yellow','assets/tileset/plant/flower/daisy_yellow.png');
        game.load.image('bushes','assets/tileset/plant/bush/bushes.png');
        game.load.image('daisy_red','assets/tileset/plant/flower/daisy_red.png');
        game.load.image('daisy_white','assets/tileset/plant/flower/daisy_white.png');
        game.load.image('collision','assets/tileset/logic/collision.png');
        game.load.image('tree_green','assets/tileset/plant/tree/tree_green.png');
        game.load.image('castle','assets/tileset/building/castle.png');
        game.load.image('tent','assets/tileset/object/tent.png');
        game.load.image('sheepfood','assets/tileset/logic/item/sheepfood.png');
        game.load.image('fairy','assets/tileset/logic/creature/fairy.png');
        game.load.image('resources','assets/tileset/logic/item/resources.png');
        //game.load.image('portal','assets/tileset/logic/portal.png');
        game.load.image('green_paving','assets/tileset/ground/green_paving.png');
        game.load.image('protection','assets/tileset/logic/protection.png');
    },
    
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //mapping tilesets
        this.map = game.add.tilemap('forest_e')

        // console.log('this')
        // console.log(this.map.tiles[tile.index][2])
        // console.log('that')
        this.map.addTilesetImage('ground','ground');
        this.map.addTilesetImage('pool','pool');
        this.map.addTilesetImage('earth_dark','earth_dark');
        this.map.addTilesetImage('grass_edges','grass_edges');
        this.map.addTilesetImage('earth_edges','earth_edges');
        this.map.addTilesetImage('grass_corners','grass_corners');
        this.map.addTilesetImage('daisy_blue','daisy_blue');
        this.map.addTilesetImage('daisy_yellow','daisy_yellow');
        this.map.addTilesetImage('bushes','bushes');
        this.map.addTilesetImage('daisy_red','daisy_red');
        this.map.addTilesetImage('daisy_white','daisy_white');
        this.map.addTilesetImage('collision','collision');
        this.map.addTilesetImage('tree_green','tree_green');
        this.map.addTilesetImage('castle','castle');
        this.map.addTilesetImage('tent','tent');
        this.map.addTilesetImage('sheepfood','sheepfood');
        this.map.addTilesetImage('fairy','fairy');
        this.map.addTilesetImage('Untitled','resources');
        //this.map.addTilesetImage('portal','portal');
        this.map.addTilesetImage('green_paving','green_paving');
        this.map.addTilesetImage('protection','protection');
        //map layers
        this.layers = {
            ground_layer: this.map.createLayer('0_floor'),
            terrain_layer:this.map.createLayer('1_terrain'),
            object_layer:this.map.createLayer('2_object'),
            roof_layer:this.map.createLayer('3_roof'),
            roofAdd_layer:this.map.createLayer('4_roof_add'),
            objects:this.map.createLayer('objects'),
            collision:this.map.createLayer('collision'),
            protection:this.map.createLayer('protection')
        };
        //hide the collision layer
        this.layers.collision.alpha = 0;
        this.layers.protection.alpha = 0
        //set up collision
        game.physics.arcade.enable(this.layers.collision);
        this.map.setCollision(322,true,this.layers.collision);
        
        this.player.create(this.init_health, this.init_coins)
        this.player.player.body.velocity.x = 0
        this.player.player.body.velocity.y = 0
        if (game.global.debugging) {
            // console.log(this.init_coins)
            this.player.player.x = 65 * 32
            this.player.player.y = 72 * 32
        }
        else {
            this.player.player.x = 126 * 32
            this.player.player.y = this.init_y * 32
        }
        this.layers.ground_layer.resizeWorld();
        game.camera.follow(this.player.player)
        
        this.enemy1 = new Enemy(game)
		this.enemy1.create()
		this.enemy2 = new Enemy(game)
		this.enemy2.create()
        
        game.addPauseButton(game)
        
        this.hud = new HUD(game, 'Player', 110, 410)
        this.hud.addItem(this.player.player, 'health', true)

        this.coins = game.add.group()
        this.shiningCoins = game.add.group()
		this.spawnCoins('coin', 15, 82, 128, 5, 128)
		this.spawnCoins('shiningCoin', 5, 44, 128, 15, 94)
		
        // this.addCoinsAlongX(4, 'coin', 99, 96)
        // this.addCoinsAlongX(10, 'shiningCoin', 81, 72)
        
        this.hud.addItem(this.player.player, 'coins', true)
        
        this.hud.create()
        
        this.sign = game.add.image(64 * 32, 68 * 32, 'sign')
        this.sign.scale.setTo(32/113, 32/105)

        this.portal = game.add.sprite(63 * 32, 101 * 32, 'portal')
        this.portal.animations.add('swirl')
		this.portal.animations.play('swirl', 6, true)
        
    },

    update:function(){
        this.player.update()
		
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
        // collision with walls
        game.physics.arcade.collide(this.player.player, this.layers.collision)
        game.physics.arcade.collide(this.enemy1.enemy, this.layers.collision)
        game.physics.arcade.collide(this.enemy2.enemy, this.layers.collision)
		if (game.global.debugging) {
            //console.log(this.player.player.animations.currentFrame)
            if (this.player.player.animations.currentFrame.name.includes('Idle')) {
                // console.log(this.player.player)
                // console.log(this.map.getTileWorldXY(this.player.player.x, this.player.player.y, 32, 32, this.layers.terrain_layer))
                
            }
        }
        else {
            // check enemy attack
            game.physics.arcade.overlap(this.player.player, this.enemy1.enemy, this.hurtPlayer, null, this)
            game.physics.arcade.overlap(this.player.player, this.enemy2.enemy, this.hurtPlayer, null, this)
        }
		this.hud.updateHUD()

        
        this.checkCoins()
        this.checkFinish()
        this.checkGameOver()
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
        goal = this.map.getTileWorldXY(Math.round(this.player.player.x), Math.round(this.player.player.y) - 64, 32, 32, this.layers.terrain_layer)
        //console.log(this.map.getTileWorldXY(this.player.player.x, this.player.player.y - 32, 32, 32, this.layers.terrain_layer))
        if (goal != null && goal.index == 435) {
            game.global.current_level = 'finish'
            game.global.level++
			game.state.start(game.global.current_level/*, true, false, this.player, this.player.player.data['health'], this.player.player.data['coins']*/)
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
				console.log(this.map.getTileWorldXY(x, y, 32, 32, this.layers.collision))
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
			//console.log('x: ' + this.coins.children[i].x + '          y: ' + this.coins.children[i].y)
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
		console.log(item)
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