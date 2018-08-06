
function Player(gameCopy) {
    var game = gameCopy
    this.player
    this.player_speed
    this.player_run_multiplier
    this.jumping
    this.jumpWasPressed
    this.attackWasPressed
    this.playerDying
    this.playerLives
    this.playerKeys = {}
    this.gameOver = false
    // this.preload = function() {

    // }
    this.create = function (health, coins = 0) {
        this.player_speed = 200
        this.player_run_multiplier = 1.5
        // Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');
        this.keysSetup()
        // Add walking and idle animations. Different aninmations are needed based on direction of movement.
        let animationNames = [/*0*/'walk_', /*1*/'Walk_', /*2*/'idle_', /*3*/'Idle_', /*4*/'death', /*5*/'Dead', /*6*/'attack_', /*7*/'Attack_', /*8*/'jump_', /*9*/'Jump_', /*10*/'run_', /*11*/'Run_', /*12*/'jump_attack_', /*13*/'JumpAttack_']

        // Walk
        this.makeAnimation(animationNames[0], animationNames[1], 'left', 0, 8, 20, true)
        this.makeAnimation(animationNames[0], animationNames[1], 'right', 0, 8, 20, true)
        //
        // Idle
        this.makeAnimation(animationNames[2], animationNames[3], 'left', 0, 9, 20, true)
        this.makeAnimation(animationNames[2], animationNames[3], 'right', 0, 9, 20, true)
        //
        // Death
        this.makeAnimation(animationNames[4], animationNames[5], '', 1, 10, 20, false)
        //
        // Attack
        this.makeAnimation(animationNames[6], animationNames[7], 'left', 0, 9, 20, true)
        this.makeAnimation(animationNames[6], animationNames[7], 'right', 0, 9, 20, true)
        //
        // Jump
        this.makeAnimation(animationNames[8], animationNames[9], 'left', 0, 9, 20, false)
        this.makeAnimation(animationNames[8], animationNames[9], 'right', 0, 9, 20, false)
        //
        // Run
        this.makeAnimation(animationNames[10], animationNames[11], 'left', 0, 9, 20, true)
        this.makeAnimation(animationNames[10], animationNames[11], 'right', 0, 9, 20, true)
        //
        // Jump Attack
        this.makeAnimation(animationNames[12], animationNames[13], 'left', 0, 9, 20, true)
        this.makeAnimation(animationNames[12], animationNames[13], 'right', 0, 9, 20, true)
       
        this.jumping = false
        this.player.animations.play('idle_left')
		// turn physics on for player inside class
		game.physics.arcade.enable(this.player);
        this.player.inputEnabled = true
		// set the anchor for sprite to middle of the view
        this.player.anchor.setTo(0.5, 0.5);
        this.prevDir = 'left'
        this.playerDying = false
        this.playerLives = 1
        this.player.data['health'] = health
        this.player.data['max_health'] = health
        this.healthbar = new HealthBar()
        this.healthbar.create(10)

        this.player.data['coins'] = coins

    }

    this.update = function () {
        //console.log(this.player.body.velocity['x'])
        if (!this.playerDying) {
            this.checkKeys()
        }
        this.checkDeath()
        this.healthbar.update(this.player)
    }

    this.checkKeys = function () {

		// Each key changes the players velocity in the x or y direction
		// and plays the proper animation. It sets the prevDir so we can face the correct way when stopped.
        this.checkFlags()
        
        if (this.jumpWasPressed) {
            this.playerJump()
        }
        else if (this.attackWasPressed && !this.player.input.pointerOver()) {
            this.playerAttack()
        }
        else {
            // Use the shift key to add running by changing speed and animation
            if (this.playerKeys['shiftKey'].isDown) {
                var animation = 'run_'
                //this.player_run_multiplier = 1.5
                this.checkMoveDir(animation, 'left')
                this.checkMoveDir(animation, 'right')
                this.checkMoveDir(animation, 'up')
                this.checkMoveDir(animation, 'down')
                
            }
            // player is walking
            else {
                animation = 'walk_'

                //this.player_run_multiplier = 1
                this.checkMoveDir(animation, 'left')
                this.checkMoveDir(animation, 'right')
                this.checkMoveDir(animation, 'up')
                this.checkMoveDir(animation, 'down')
                
            }
            if (this.playerKeys['leftKey'].isUp && this.playerKeys['rightKey'].isUp && this.playerKeys['upKey'].isUp && this.playerKeys['downKey'].isUp) {
                this.playerIdles(this.prevDir)
            }
        }
    }

    this.checkFlags = function () {

        if (this.playerKeys['spaceBar'].isDown) {
            if(!this.jumpWasPressed) {
                this.jumpWasPressed = true
            }
        }
        if (game.input.activePointer.leftButton.justReleased()) {
            this.attackWasPressed = true
        }
    }

    this.checkMoveDir = function (animation, dir) {
        altDirs = []
        let initDir = ''
        let altDir = ''
        if (dir == 'left' || dir == 'right') {
            initDir = 'x'
            altDir = 'y'
            altDirs = ['up', 'down']
        }
        else if (dir == 'up' || dir == 'down') {
            initDir = 'y'
            altDir = 'x'
            altDirs = ['left', 'right']
        }
        if (animation == 'run_') {
            this.player_run_multiplier = 1.5
        }
        else if (animation == 'walk_') {
            this.player_run_multiplier = 1
        }
        if (this.playerKeys[dir + 'Key'].isDown) {
            speed = 0
            if (dir == 'left' || dir == 'up') {
                speed = -this.player_speed
            }
            else {
                speed = this.player_speed
            }
            if (dir == 'left' || dir == 'right') {
                this.prevDir = dir
            }
            this.player.body.velocity[initDir] = speed * this.player_run_multiplier
            if (this.playerKeys[altDirs[0] + 'Key'].isDown) {
                this.player.body.velocity[altDir] = -this.player_speed * this.player_run_multiplier
            }
            else if (this.playerKeys[altDirs[1] + 'Key'].isDown) {
                this.player.body.velocity[altDir] = this.player_speed * this.player_run_multiplier
            }
            else {
                this.player.body.velocity[altDir] = 0
            }
            this.player.animations.play(animation + this.prevDir)
        }
    }

    this.playerIdles = function (dir = this.prevDir) {
        this.player.animations.play('idle_' + dir);
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        
    }

    this.playerAttack = function () {
        if (this.jumping == true) {
            this.playerJumpAttack()
        }
        else {
            this.playerGroundAttack()
        }
        this.attackWasPressed = false
    }
//************ jump goes further with attack
    this.playerJump = function () {
        this.jumping = true
        if (this.attackWasPressed) {
            this.playerAttack()
        }
        else {
            this.jump()
        }
        
    }

    this.jump = function() {
        this.player.animations.play('jump_' + this.prevDir)
        this.player.animations._anims['jump_' + this.prevDir].onComplete.add(this.endJump)
    }
    
    this.playerJumpAttack = function () {
        this.player.animations.play('jump_attack_' + this.prevDir)
        this.player.animations._anims['jump_attack_' + this.prevDir].onComplete.add(this.endJump)
    }

    this.endJump = function() {
        this.player.animations.play('idle_' + this.prevDir)
        this.jumping = false
        this.jumpWasPressed = false
    }.bind(this)
//**************** full animation not playing?
    this.playerGroundAttack = function () {
        this.player.animations.play('attack_' + this.prevDir)
        this.player.animations._anims['attack_' + this.prevDir].onComplete.add(this.playerGroundAttackEnd)
    }

    this.playerGroundAttackEnd = function () {
        this.player.animations.play('idle_' + this.prevDir)
    }.bind(this)
    
    this.keysSetup = function () {
		this.playerKeys['downKey'] = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.playerKeys['upKey'] = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.playerKeys['leftKey'] = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.playerKeys['rightKey'] = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.playerKeys['spaceBar'] = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.playerKeys['shiftKey'] = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    }

    this.pickUp = function (item) {
        if (item == 'coin') {
            this.player.data['coins']++
        }
        if (item == 'coin_bag') {
            this.player.data['coins'] += 5
        }
        // if (item == 'health') {this.player.data['health'] += 10}
    }

    this.makeAnimation = function (keyName, atlasName, dir, iBegin, iEnd, fRate, loop){
        this.player.animations.add(keyName + dir, Phaser.Animation.generateFrameNames(atlasName + dir, iBegin, iEnd), fRate, loop);
		
    }

    this.checkDeath = function() {
        if (this.attackWasPressed && this.player.input.pointerOver()) {
            this.playerDying = true
        }
        if (this.playerDying && this.playerLives < 0) {
            this.playerDeath()
        }
    }

    this.checkLives = function () {
        if (this.gameOver == false) {
            if (this.player.data['health'] <= 0) {
                this.playerDying = true
                this.playerDeath()
            }
        }
    }
    // dies repeatedly
    this.playerDeath = function () {
        //console.log('dying')
        this.playerLives--
        this.player.body.velocity.x = 0
        this.player.body.velocity.y = 0
        this.player.animations.play('death')
        if (this.prevDir == 'left') {
            this.player.scale.x *= -1
        }
        this.attackWasPressed = false
        if (this.playerLives == 0) {
            this.gameOver = true
        }
        //this.playerDying = false
    }
}