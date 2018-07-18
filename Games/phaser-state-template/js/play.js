// -    Jesse Houk
// -      7-18-18
// -   Assignment 3
// +	Obstacles changed to random items not in pairs.
// +	An obstacle randomly starts at bottom of screen and moves up at some random 'x'.
// +	Count a point for each obstacle passed.
// +	Kill individual if they collide with obstacle.
// +	Items should not all be the same!




var play = function () {}

// For debugging purposes, uncomment the following line
//var obstacles = []

play.prototype = {
	create: function () {
		console.log("play.js");
		// Game width and height for convenience
		w = this.game.width
		h = this.game.height

		frame_counter = 0

		random_gap = 0

		item_difficulty = 30
		speed_difficulty = -20
		// Bg color
		this.game.stage.backgroundColor = BG_COLOR
		// Bg image
		this.bg = this.game.add.image(0, 0, 'bg')

		// Platform width
		platform_width = this.game.cache.getImage('obstacle').width

		// Score sound
		this.sound.score = this.game.add.audio('score')
		this.sound.score.volume = .4

		// Death sound
		this.sound.kill = this.game.add.audio('kill')

		// Music
		this.music = this.game.add.audio('music')
		this.music.play('', 0, 0.5, true)

		this.physics.startSystem(Phaser.Physics.ARCADE)

		// Obstacles
		this.obstacles = this.game.add.group()

		// Player
		this.player = this.game.add.sprite(this.game.width / 2, 250, 'beam', 0)
		this.game.physics.enable(this.player, Phaser.Physics.ARCADE)
		this.player.enableBody = true
		this.player.body.collideWorldBounds = true
		this.player.scale.setTo(.5, .5)
		this.player.anchor.setTo(.5, .5)
		this.player.body.setSize(this.player.width-10,this.player.height)

		// Score label
		this.bmpText = this.game.add.bitmapText(this.game.width / 2, 100, 'fontUsed', '', 150);
		this.bmpText.anchor.setTo(.5, .5)
		this.bmpText.scale.setTo(.3, .3)

		// Support for mouse click and touchscreen input
		this.game.input.onDown.add(this.onDown, this)

		this.pauseAndUnpause(this.game)
	},

	update: function () {
		this.bmpText.text = this.game.global.score

		// Collision
		this.obstacleCollision()
		//this.game.physics.arcade.collide(this.player, this.obstacles, this.hitObstacle, null, this)
////***
		// Spawn enemies
		random_gap = this.game.rnd.integerInRange(0, 1000)
		if (random_gap % item_difficulty > random_gap / 2) {
			var gap = 120
			var offset = (Math.random() < 0.5 ? -1 : 1) * Math.random() * (150)
			var new_objects = Math.floor(this.game.rnd.integerInRange(0, item_difficulty) / 15)
			for (var i = 0; i < new_objects; i++) {
				this.spawnObstacle(/*entity number*/this.game.global.obstacle_id++,/*x*/ /*w / 2 + offset / 2 + offset*/ this.game.rnd.realInRange(0, this.game.width),/*y*/ this.game.height, /*speed*/ this.game.rnd.integerInRange(100, 400) + speed_difficulty, has_given_point = false)
				//this.spawnObstacle(this.game.global.obstacle_id++, w / 2 + platform_width / 2/* + gap / 2 */+ offset, this.game.height, /*speed = 200*/ game.rnd.integerInRange(100, 400), has_given_point = true)
			}
		}
////***
		this.move();
		
		frame_counter++
		if (frame_counter % 85 == 0) {
			item_difficulty++
		}
		if (frame_counter % 45 == 0) {
			speed_difficulty += 5
		}
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
			if (Phaser.Rectangle.intersects(this.player.getBounds(), this.obstacles.children[i])) {
				this.hitObstacle(this.obstacles.children[i])
			}
			else if(this.obstacles.children[i].visible && this.obstacles.children[i].key == 'obstacle') {
				this.obstaclePassed(this.obstacles.children[i])
			}
		}
	},
	obstaclePassed: function (obstacle) {
		//console.log(this.obstacles)
		var point = 0;

		let py = this.player.y;
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
			this.killPlayer(this.player)
		}
		// player hits collectable
		else if (obstacle.key == 'coin' || obstacle.key == 'star') {
			this.getCollectable(obstacle)
		}
	},
	killPlayer: function (player) {
		//issues with this
		//this.game.plugins.screenShake.shake(20);
		this.sound.kill.play('', 0, 0.5, false)
		this.player.kill();
		this.game.state.start('gameOver');
		
	},
	getCollectable: function (obstacle) {
		if (obstacle.key == 'coin') {
			this.scorePoint(30, obstacle)
		}
		if (obstacle.key == 'star') {
			this.scorePoint(50, obstacle)
		}
		obstacle.destroy()
	},
	scorePoint: function (point = 0, obstacle) {
		this.sound.score.play('', 0, 0.5, false)
		this.game.global.score += point;
	},
	// Tap on touchscreen or click with mouse
	onDown: function (pointer) {},
	// Move player
	move: function () {
		if (this.game.input.activePointer.isDown) {
			//console.log(this.game.input.x);
			let rate = this.moveSpeed(this.game.input.x,this.player.x);
			let angle= this.moveAngle(rate,3);
			//console.log("rate: " + rate);
			this.player.x += rate;
			this.player.angle = angle;
		} else {
			this.player.angle = 0;
		}
	},
	moveAngle: function(rate,factor){
		
			return rate * factor;
	},

	moveSpeed: function(x,width,skill=2){
		var ratio = 0;

		if(x < width){
			ratio = x/(width);
			ratio *=10;
			ratio = Math.ceil(ratio);
			ratio /=2;
			rate = (5 - ratio) * -1;
		}else{
			ratio = x/width;
			ratio *=10;
			ratio = Math.ceil(ratio);
			ratio /=2;
			rate = ratio;
		}
		//console.log(rate*skill);
		return rate*skill;
	},

	pauseAndUnpause: function (game) {
		var pause_button = this.game.add.sprite(this.game.width - 40, 40, 'pause')
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

	render: function () {
		debug = false
		if (debug) {
			// Show hitbox
			this.game.debug.body(this.player)

			for (var i = 0; i < obstacles.length; i++) {
				this.game.debug.body(obstacles[i])
			}
		}
	}
}
