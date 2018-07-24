function Player(gameCopy) {
    var game = gameCopy
    this.player
    this.player_speed
    this.player_run_multiplier
    this.jumping
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

        this.makeAnimation(animationNames[0], animationNames[1], 'left', 0, 8, 20, true)
        this.makeAnimation(animationNames[0], animationNames[1], 'right', 0, 8, 20, true)
        this.makeAnimation(animationNames[2], animationNames[3], 'left', 0, 9, 20, true)
        this.makeAnimation(animationNames[2], animationNames[3], 'right', 0, 9, 20, true)
        this.makeAnimation(animationNames[4], animationNames[5], '', 1, 10, 20, false)
        this.makeAnimation(animationNames[6], animationNames[7], 'left', 0, 9, 20, true)
        this.makeAnimation(animationNames[6], animationNames[7], 'right', 0, 9, 20, true)
        this.makeAnimation(animationNames[8], animationNames[9], 'left', 0, 9, 20, false)
        this.makeAnimation(animationNames[8], animationNames[9], 'right', 0, 9, 20, false)
        this.makeAnimation(animationNames[10], animationNames[11], 'left', 0, 9, 20, true)
        this.makeAnimation(animationNames[10], animationNames[11], 'right', 0, 9, 20, true)
        this.makeAnimation(animationNames[12], animationNames[13], 'left', 0, 9, 20, true)
        this.makeAnimation(animationNames[12], animationNames[13], 'right', 0, 9, 20, true)
        this.jumping = false
        this.player.animations.play('idle_left')
		// turn physics on for player
		game.physics.arcade.enable(this.player);
        this.player.inputEnabled = true
		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5, 0.5);

    }

    this.update = function () {
        this.checkKeys()
        this.checkDeath()
    }

    this.checkKeys = function () {

		// Each key changes the players velocity in the x or y direction
		// and plays the proper animation. It sets the prevDir so we can
		// face the correct way when stopped.

        //console.log(this.jumping)
        if (this.spaceBar.isDown) {
            //if (this.jumping === false) {
                console.log(this.spaceBar)
                this.spaceBar.onDown.addOnce(this.playerJump, this)
                //console.log(this.player.scale.x )
            //}
        }
        else if (this.jumping == false) {
            // Use the shift key to add running by changing speed and animation
            if (this.shiftKey.isDown) {
                var animation = 'run_'
                console.log("\"running\"")
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
            if (!this.leftKey.isDown && !this.rightKey.isDown && !this.upKey.isDown && !this.downKey.isDown) {
                this.playerIdles(this.prevDir)
            }
        }
        if (game.input.activePointer.isDown && !this.player.input.pointerOver()) {
            this.playerAttack()
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
    //*************** Must hold space to complete animation
    this.playerJump = function () {
        this.player.animations.play('jump_' + this.prevDir)
        //console.log('Bjumping: ' + this.jumping)
        this.jumping = true
        //console.log('Ajumping: ' + this.jumping)
        //game.input.onDown.addOnce(this.playerAttack, this)
        this.endJump()
    }
    this.playerJumpAttack = function () {
        this.player.animations.play('jump_attack_' + this.prevDir)
    }
    this.endJump = function() {
        //window.setTimeout(this.playerIdles(this.dir, this.player), 1000)
        this.jumping = false
    }
    this.playerAttack = function () {
        if (this.jumping == true) {
            this.playJumpAttack()
        }
        else {
            this.playerGroundAttack()
        }
    }
    this.playerGroundAttack = function () {
        this.player.animations.play('attack_' + this.prevDir)
    }
    //************** Always faces right
    this.playerDeath = function () {
        this.player.body.velocity.x = 0
        this.player.body.velocity.y = 0
        this.player.animations.play('death')
        if (this.prevDir == 'left') {
            this.player.scale.x *= -1
        }
    }
    this.keysSetup = function () {
		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        this.spaceBar.onDown_shouldPropagate = false
    }
    this.makeAnimation = function (keyName, atlasName, dir, iBegin, iEnd, fRate, loop){
        this.player.animations.add(keyName + dir, Phaser.Animation.generateFrameNames(atlasName + dir, iBegin, iEnd), fRate, loop);
		
    }
    //************** only works at beginning
    this.checkDeath = function() {
        if (game.input.activePointer.isDown && this.player.input.pointerOver()) {
            this.playerDeath()
        }
    }
}