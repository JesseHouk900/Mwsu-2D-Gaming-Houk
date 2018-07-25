// + Run   (shift key)
// + Die
// + Attack (left mouse)
// + Jump (space bar)
// + Jump Attack (space left mouse)
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
    // this.preload = function() {

    // }
    this.create = function () {
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
		// turn physics on for player
		game.physics.arcade.enable(this.player);
        this.player.inputEnabled = true
		// set the anchor for sprite to middle of the view
        this.player.anchor.setTo(0.5, 0.5);
        this.prevDir = 'left'
        this.playerDying = false
        this.playerLives = 1

    }

    this.update = function () {
        if (!this.playerDying) {
            this.checkKeys()
        }
        this.checkDeath()
    }

    this.checkKeys = function () {

		// Each key changes the players velocity in the x or y direction
		// and plays the proper animation. It sets the prevDir so we can
		// face the correct way when stopped.

        //console.log(this.jumping)
        this.checkFlags()
        
        // if (this.jumpWasPressed && this.attackWasPressed && !this.player.input.pointerOver()) {
        //     this.playerJump
        // }
        if (this.jumpWasPressed) {
            this.playerJump()
        }
        else if (this.attackWasPressed && !this.player.input.pointerOver()) {
            this.playerAttack()
            
        }
        else/* if (this.jumping == false) */{
            // Use the shift key to add running by changing speed and animation
            if (this.shiftKey.isDown) {
                var animation = 'run_'
                //console.log("\"running\"")
                if (this.leftKey.isDown) {
                    this.movePlayerHorizontal(-this.player_speed * this.player_run_multiplier, animation, 'left')
                }
                if (this.rightKey.isDown) {
                    this.movePlayerHorizontal(this.player_speed * this.player_run_multiplier, animation, 'right')
                }
                if (this.upKey.isDown) {
                    this.movePlayerVertical(-this.player_speed * this.player_run_multiplier, animation, this.prevDir)
                }
                if (this.downKey.isDown) {
                    this.movePlayerVertical(this.player_speed * this.player_run_multiplier, animation, this.prevDir)
                }
            }
            // player is walking
            else {
                var animation = 'walk_'
                if (this.leftKey.isDown) {
                    this.movePlayerHorizontal(-this.player_speed, animation, 'left')
                }
                if (this.rightKey.isDown) {
                    this.movePlayerHorizontal(this.player_speed, animation, 'right')
                }
                if (this.upKey.isDown) {
                    this.movePlayerVertical(-this.player_speed, animation, this.prevDir)
                }
                if (this.downKey.isDown) {
                    this.movePlayerVertical(this.player_speed, animation, this.prevDir)
                }
            }
            if (this.leftKey.isUp && this.rightKey.isUp && this.upKey.isUp && this.downKey.isUp) {
                this.playerIdles(this.prevDir)
            }
        }
    }

    this.checkFlags = function () {

        if (this.spaceBar.isDown) {
            if(!this.jumpWasPressed) {
                this.jumpWasPressed = true
            }
        }
        if (game.input.activePointer.leftButton.justReleased()) {
            this.attackWasPressed = true
        }
    }
    this.movePlayerHorizontal = function (speed, anim, dir) {
        this.player.body.velocity.x = speed;
        //this.player.body.velocity.y = 0
        this.player.animations.play(anim + dir);
        this.prevDir = dir
    }

    this.movePlayerVertical = function (speed, anim, dir) {
        this.player.animations.play(anim + dir)
        //this.player.body.velocity.x = 0
        this.player.body.velocity.y = speed;
    }

    this.playerIdles = function (dir = this.prevDir/*, player = this.player*/) {
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

    // this.endJumpAttack = function () {
    //     this.player.animations.play('idle' + this.prevDir)

    // }.bind(this)

    this.endJump = function() {
        // console.log('sprite: ' + sprite)
        // console.log(game)
        //window.setTimeout(this.playerIdles(this.dir, this.player), 1000)
        this.player.animations.play('idle_' + this.prevDir)
        this.jumping = false
        this.jumpWasPressed = false
    }.bind(this)
//**************** full animation not playing?
    this.playerGroundAttack = function () {
        this.player.animations.play('attack_' + this.prevDir)
        //console.log(this.player.animations._anims['attack_' + this.prevDir])
        this.player.animations._anims['attack_' + this.prevDir].onComplete.add(this.playerGroundAttackEnd)
    }

    this.playerGroundAttackEnd = function () {
        this.player.animations.play('idle_' + this.prevDir)
    }.bind(this)
    
    this.keysSetup = function () {
		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    }

    this.makeAnimation = function (keyName, atlasName, dir, iBegin, iEnd, fRate, loop){
        this.player.animations.add(keyName + dir, Phaser.Animation.generateFrameNames(atlasName + dir, iBegin, iEnd), fRate, loop);
		
    }
    //************** only works at beginning
    this.checkDeath = function() {
        if (this.attackWasPressed && this.player.input.pointerOver()) {
            this.playerDying = true
        }
        if (this.playerDying && this.playerLives > 0) {
            this.playerDeath()
        }
    }
    //************** Always faces right
    this.playerDeath = function () {
        this.player.body.velocity.x = 0
        this.player.body.velocity.y = 0
        this.player.animations.play('death')
        if (this.prevDir == 'left') {
            this.player.scale.x *= -1
        }
        this.attackWasPressed = false
        this.playerLives--
        //this.playerDying = false
    }
}