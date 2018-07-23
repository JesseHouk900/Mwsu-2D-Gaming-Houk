// -    Jesse Houk
// -      7-18-18
// -   Assignment 3
// +	Obstacles changed to random items not in pairs.
// +	An obstacle randomly starts at bottom of screen and moves up at some random 'x'.
// +	Count a point for each obstacle passed.
// +	Kill individual if they collide with obstacle.
// +	Items should not all be the same!




var play = {
	//bmd: this.game.add.bitmapData(this.game.width, this.game.height),
	create: function () {
		console.log("play.js");
		// Game width and height for convenience
		w = this.game.width
		h = this.game.height

		frame_counter = 0
		random_gap = 0
		item_difficulty = 30
		speed_difficulty = -20
		pts = []
		// Bg color
		this.game.stage.backgroundColor = BG_COLOR
		// Bg image
		this.bg = this.game.add.image(0, 0, 'bg')
		//bmd.addToWorld()
		//var area = new Phaser.Rectangle(0, 85, 88, 16)
		//bmd.copyRect('trail', area, 300, 0)
		// Platform width
		platform_width = this.game.cache.getImage('obstacle').width

		// Score sound
		this.sound.score = this.game.add.audio('score')
		this.sound.score.volume = .4

		// Death sound
		this.sound.kill = this.game.add.audio('kill')

		// Explosions sound
		this.sound.boom = this.game.add.audio('boom')

		// Music
		this.music = this.game.add.audio('music')
		this.music.play('', 0, 0.5, true)

		this.physics.startSystem(Phaser.Physics.ARCADE)

		// Player
		this.game.beam.create()
		// Obstacles
		this.obstacles = this.game.add.group()
		// Score label
		this.bmpText = this.game.add.bitmapText(this.game.width / 2, 100, 'fontUsed', '', 150);
		this.bmpText.anchor.setTo(.5, .5)
		this.bmpText.scale.setTo(.3, .3)
		// Support for mouse click and touchscreen input
		this.game.input.onDown.add(this.onDown, this)
		//this.game.input.
		this.pauseAndUnpause(this.game)
	},
	
	update: function () {
		this.bmpText.text = this.game.global.score
		this.game.beam.update()
		this.pts = this.updateFighters()
		this.game.global.score += this.sumPoints()
		this.game.beam.move();
		this.game.beam.checkShoot()
		// Collision
		this.obstacleCollision()
		//this.game.physics.arcade.collide(this.player, this.obstacles, this.hitObstacle, null, this)
////***
		// Spawn enemies
		random_gap = this.game.rnd.integerInRange(0, 1000)
		// Higher the frequency of objects spawning (item_difficulty) the more often items spawn
		if (random_gap % item_difficulty > random_gap / 2) {
			var gap = 120
			var offset = (Math.random() < 0.5 ? -1 : 1) * Math.random() * (150)
			var new_objects = Math.floor(this.game.rnd.integerInRange(0, item_difficulty) / 15)
			//console.log(new_objects)
			for (var i = 0; i < new_objects; i++) {
				this.spawnObstacle(/*entity number*/this.game.global.obstacle_id++,/*x*/ this.game.rnd.realInRange(0, this.game.width),/*y*/ this.game.height, /*speed*/ this.game.rnd.integerInRange(100, 400) + speed_difficulty, has_given_point = false)
			}
//		//this.game.beam.trail.x = this.game.beam.player.x
		}
////***
		
		frame_counter++
		//this.game.global.score += this.scorePoint();
	},
	spawnObstacle: function (entity, x, y, speed,has_given_point) {
		var obstacle
		var r = Math.random()
		var sizex = 1
		var sizey = 1
		if (r < .65) {
			obstacle = this.obstacles.create(x, y, 'obstacle',entity)
			sizex = .1
			obstacle.tint = 0x8b4513
		}
		else if (r < .9) {
			obstacle = this.obstacles.create(x, y, 'coin', entity)
			obstacle.animations.add('spin', [0, 1, 2, 3], 6, true)
			obstacle.play('spin')
		}
		else if (r < 1) {
			obstacle = this.obstacles.create(x, y, 'star', entity)
		}
            
		// Uncomment for debugging
		//obstacles.push(obstacle)

		this.game.physics.enable(obstacle, Phaser.Physics.ARCADE)
		
		obstacle.enableBody = true
		obstacle.body.colliderWorldBounds = true
		obstacle.body.immovable = true
		obstacle.anchor.setTo(.5, .5)
		obstacle.scale.setTo(sizex, sizey)
		obstacle.body.velocity.y = -speed
		obstacle.has_given_point = has_given_point
		
		obstacle.checkWorldBounds = true;
		// Kill obstacle/enemy if vertically out of bounds
		obstacle.events.onOutOfBounds.add(this.killObstacle, this);
		
		obstacle.outOfBoundsKill = true;
		//console.log(this.obstacles);
	},
	killObstacle: function (obstacle) {
		this.obstacles.remove(obstacle);
	},
	obstacleCollision: function () {
		// iterate over the children of obstacles
		for (var i = 0; i < this.obstacles.length; i++) {
			// find overlap
			if (Phaser.Rectangle.intersects(this.game.beam.player.getBounds(), this.obstacles.children[i])) {
				this.hitObstacle(this.obstacles.children[i])
			}
			// else if(this.obstacles.children[i].visible && this.obstacles.children[i].key == 'obstacle') {
			// 	this.obstaclePassed(this.obstacles.children[i])
			// }
		}
	},
	obstaclePassed: function (obstacle) {
		//console.log(this.obstacles)
		var point = 0;

		let py = this.game.beam.player.y;
		let oy = obstacle.y;
		let ox = obstacle.x;

		//if player is below obstacle and within 5 pixels and choose only one of the pair
		if(py > oy && Math.abs(py-oy) < 5/* && ox < this.game.width/2*/){
			point++;
			this.sound.score.play('', 0, 0.5, false)
		}
		this.game.global.score += point;
	},
	hitObstacle: function(obstacle) {
		// player hits lethal obstacle
		if (obstacle.key == 'obstacle') {
			this.game.beam.killPlayer()
		}
		// player hits collectable
		else if (obstacle.key == 'coin' || obstacle.key == 'star') {
			this.getCollectable(obstacle)
		}
	},
	getCollectable: function (obstacle) {
		if (obstacle.key == 'coin') {
			this.scorePoint(5, obstacle)
		}
		if (obstacle.key == 'star') {
			this.scorePoint(10, obstacle)
		}
		obstacle.destroy()
	},
	scorePoint: function (point = 0, obstacle) {
		this.sound.score.play('', 0, 0.5, false)
		var s = this.game.global.score
		//console.log('s: ' + speed_difficulty)
		//console.log('i: ' + item_difficulty)
		// As score increases, speed of obstacles increase
		speed_difficulty = s % (s / 10)
		var r = s / (7 * (s % 7))
		// As score increases, frequency of obstacles increases
		item_difficulty += (s%2 == 0) ? r : -1 / s
		this.game.global.score += point;
	},
	// Tap on touchscreen or click with mouse
	onDown: function (pointer) {},

	pauseAndUnpause: function (game) {
		var pause_button = this.game.add.sprite(this.game.width - 40, 40, 'pause')
		var pause_watermark
		pause_button.anchor.setTo(.5, .5)
		pause_button.inputEnabled = true
		// pause:
		pause_button.events.onInputUp.add(
			function () {
				if (!game.paused) {
					game.paused = true
				}
				pause_watermark = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'pause')
				pause_watermark.anchor.setTo(.5, .5)
				pause_watermark.alpha = .1
			}, this)
		// Unpause:
		game.input.onDown.add(
			function () {
				if (game.paused) {
					game.paused = false
					pause_watermark.destroy()
				}
			}, self)
	},
	updateFighters: function() {
		for (var i = 0; i < this.obstacles.length; i++) {
			if (this.obstacles.children[i].key == 'obstacle') {
				this.game.beam.updateFighters(this.obstacles.children[i])
			}
		}
	},
	render: function () {
		debug = false
		if (debug) {
			// Show hitbox
			this.game.debug.body(this.player)

			for (var i = 0; i < obstacles.length; i++) {
				this.game.debug.body(obstacles[i])
			}
		}
	},
	sumPoints: function () {
		let t = 0
		for (var i = 0; i < pts.length; i++) {
			t += pts[i]
		}
		return t
	}
}
