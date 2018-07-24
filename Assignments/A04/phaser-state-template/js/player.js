function Player(gameCopy) {
    var game = gameCopy
    this.nappa
    this.player
    this.trail
    this.fighters = []
    this.shootKey
    this.difficulty
    this.preload = function (atlasName, spriteSheet, atlasJson) {
        this.atlas_name = atlasName
        game.load.atlas(this.atlas_name, spriteSheet, atlasJson)
    }
    this.create = function() {
        // Player
        this.player = game.add.sprite(game.width / 2, 250, 'beam', 0)
		game.physics.enable(this.player, Phaser.Physics.ARCADE)
		this.player.enableBody = true
		this.player.body.collideWorldBounds = true
		this.player.scale.setTo(.5, .5)
		this.player.anchor.setTo(.5, .5)
		this.player.body.setSize(this.player.width-10,this.player.height)
        this.difficulty = 1
        // Initalize keys
        var fKey = [Phaser.KeyCode.SPACEBAR]
        // Create key listeners
        // Allows player to shoot
        shootKey = game.input.keyboard.addKeys(fKey)
        // Prevent unintentional browser actions
        game.input.keyboard.addKeyCapture(fKey)
        //this.makeTrail()

    }
    this.update = function() {
        if (this.player.animations.currentFrame.index == 0) {
            this.player.body.setSize(61, 70, 14, 9)
		}
		else if (this.player.animations.currentFrame.index == 1) {
            this.player.body.setSize(83, 86, 1, 1)
		}
		else if (this.player.animations.currentFrame.index == 2) {
            this.player.body.setSize(40, 33, 23, 28)
        }
    }
    this.updateFighters = function(obj) {
        var points = []
        for (var i = 0; i < this.fighters.length; i++) {
            //console.log('made it')
            if (game.physics.arcade.overlap(obj, this.fighters[i], this.fighterCollision, null, this)) {
                // difficulty is increased when object is destroyed
                this.increaseDifficulty()
                //console.log(points)
                points.push(this.difficulty)
            }
            if (this.fighters[i].alive == false) {
                this.fighters.splice(i, 1)
            }
        }
        return points
    }
    this.fighterCollision = function(obj) {
        game.explosions.push(game.add.sprite(obj.x - this.player.width, obj.y - this.player.height, 'explosionAnim'))
        game.explosions[game.explosions.length - 1].animations.add('explosion', [0,1,2,3,4,5,6])
        // sound plays when abstacle is destroyed
        game.sound.boom.play('', 0, 1, false)
        // score is increased when object is destroyed
        game.global.score += this.difficulty
        // animation plays when obstacle is destroyed
        game.explosions[game.explosions.length - 1].play('explosion', 5, true)
        window.setTimeout(this.deleteExplosion, 1000)
        // Obstacle that collides with bullet is destroyed
        obj.kill()
    }
    this.deleteExplosion = function() {
        l = game.explosions.length - 1
        game.explosions[l].animations.stop(null, true)
        game.explosions[game.explosions.length - 1].kill()
        game.explosions.splice(game.explosions.length - 1, 1)
        game.expAnims.splice(game.explosions.length - 1, 1)
    }
    this.increaseDifficulty = function() {
        console.log('before: ' + this.difficulty)
        this.difficulty = this.difficulty + Math.ceil(Math.sqrt(this.difficulty / 2))
        console.log('after: ' + this.difficulty)
    }
    this.resetFighter = function(fighter) {
        fighter.kill()
    }
    this.killPlayer = function () {
        //issues with this
		game.sound.kill.play('', 0, 1, false)
		this.player.kill()
		game.state.start('gameOver')	
	}
	// Move player
	this.move = function () {
        if (game.input.activePointer.isDown) {
            //console.log(this.game.input.x);
			let rate = this.moveSpeed(game.input.x,this.player.x);
			let angle= this.moveAngle(rate,3);
			//console.log("rate: " + rate);
			this.player.x += rate;
			this.player.angle = angle;
		} else {
            this.player.angle = 0;
        }
    }
	this.moveAngle = function(rate,factor) {
        return rate * factor;
	}
	this.moveSpeed = function(x,width,skill=2) {
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
    }
    this.makeTrail = function() {
        this.trail = game.add.emitter(this.player.x, this.player.y - 22, 20)
		this.trail.width = 1
		this.trail.makeParticles('beam', [3])
		this.trail.setXSpeed(0)
		this.trail.setYSpeed(-400, -360)
		this.trail.setRotation(50, -50)
		this.trail.gravity = 0
		this.trail.setAlpha(1, 0.01, 800)
		this.trail.setScale(.49, .5, .49, .5, 1000, Phaser.Easing.Quintic.Out)
		this.trail.start(false, 5000, 10)
        this.trail.frequency = .5
    }
    this.makeSprites = function() {
        var obj = game.add.sprite(0, 0,'nappa')
        obj.alpha = 0
        obj.angle -= 90
        return obj
    }
    // checks if player has pressed the spacebar to shoot
    this.checkShoot = function() {
        if (shootKey[0].justDown) {
            this.shoot()
        }
    }
    this.shoot = function() {
        if (this.fighters.length < 1) {
            var spt = this.makeSprites()
            spt.alpha = 1
            var i = game.rnd.integerInRange(0, 3)
            spt.animations.add('attack1', [0])
            spt.animations.add('attack2', [1, 2], .25, false)
            spt.animations.add('attack3', [3], 1, false)
            spt.animations.add('attack4', [4], 1, false)
            //console.log(spt)
            if (i === 0) {
                //console.log('1')
                spt.animations.play('attact1')
            }
            else if (i === 1) {
                //console.log('2')
                spt.animations.play('attact2')
            }
            else if (i === 2) {
                //console.log('3')
                spt.animations.play('attact3')
            }
            else if (i === 3) {
                //console.log('4')
                spt.animations.play('attact4')
            }
            spt.x = this.player.x
            spt.y = this.player.y
            game.physics.enable(spt, Phaser.Physics.ARCADE)
            spt.enableBody = true
            spt.body.colliderWorldBounds = true
            spt.body.immovable = true
            spt.anchor.setTo(.5, .5)
            spt.scale.setTo(1, 1)
            spt.body.velocity.y = game.rnd.realInRange(100, 300)
            spt.checkWorldBounds = true;
            // Kill nappa if vertically out of bounds
            spt.events.onOutOfBounds.add(this.killFighter, this);
            spt.outOfBoundsKill = true;
            this.fighters.push(spt)
        }
    }
    this.killFighter = function(f) {
        f.kill()
    }
    this.emptyFighters = function() {
        for (var i = 0; i < this.fighters.length; i++) {
            this.fighters[i].kill()
        }
        this.fighters = []
    }
}