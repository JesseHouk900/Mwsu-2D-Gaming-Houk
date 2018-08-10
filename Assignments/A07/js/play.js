// +    2 Players implemented
// +	Left Player uses keys W,A,S,D to move and SHIFT to fire
// +	Right Player uses ARROWS to move and SPACE to fire
// +    Place a target retical sprite in the bottom left/right/or both.
// ~	The target (when clicked or tapped) will cause ship to fire.
// ~	The ship should not move when those areas are clicked or tapped.
// +    Find at least 7 different planet images to use as obstacles.
// +	Animate at least 3 of the planet sprites.
// +	When used as obstacles, they should vary in size.
// +    Flaming meteors would be awesome. (Bonus)
// +	If multiplayer doesn't work, have two ships on the game board.
//  	When ships collide, they will "bump" off of each other.
// -      Ship that is higher during collision does damage to other ship.
//      Add a DIFFERENT explosion animation to the ufo to use when it
// +	  collides with an object.
// +    Ships have health that decreases when hit by obstacles.
// +    When health = 0 ship explodes with animation.

var play = {
    //preload: function () {}
    hurtable: [],

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE)
        console.log('play')
        this.num_players = 2
        this.players = []
        this.difficulty = 8
        this.object_damage = 10
        this.collision = []
        // variable that holds boolean values for bouncing between two ships
        this.bouncing = {}
        game.global.background = game.add.image(0, 0, 'background')
        game.global.background.scale.setTo(game.global.backgroundScaleX, game.global.backgroundScaleY)
        this.objects = game.add.group()
        
        for (var i = 0; i < this.num_players; i++) {
            console.log(i)
            this.players.push(new Player (game))
            this.collision.push(false)
            this.hurtable.push(true)
            if (i == 0) {
                this.players[i].create(50, 50, 1, 1)
                this.players[i].assignMovementKeys(Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT)
                this.players[i].assignFireKeys(Phaser.Keyboard.SPACEBAR)
            }
            else if ( i == 1) {
                this.players[i].create(game.width - 50, 50, 1, 1)
                this.players[i].assignMovementKeys(Phaser.Keyboard.W, Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.D)
                this.players[i].assignFireKeys(Phaser.Keyboard.SHIFT)
            }
            game.global.explosions[i] = game.add.sprite(0, 0, 'explosion')
            game.global.explosions[i].anchor.setTo(.5, .5)
            boom = game.global.explosions[i].animations.add('boom', [0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 28, 29, 30])
            //console.log(game.global.explosions[i].animations)
            //boom.killOnComplete = true
            // boom.onComplete.add(this.stopExplosion, {i: i}, this)
            game.global.explosions[i].alpha = 0
            game.global.explosions[i].animations.stop('boom')
            game.physics.arcade.enable(this.players[i].ship)
            this.players[i].id = i
            // console.log(this.players[i])
            for (var j = 0; j < i; j++) {
                if (!(this.players[j].ship.key + this.players[j].id + ' ' + this.players[i].ship.key + this.players[i].id in this.bouncing) && !(this.players[j].ship.key + this.players[j].id + ' ' + this.players[i].ship.key + this.players[i].id in this.bouncing)) {
                    this.bouncing[this.players[j].ship.key + this.players[j].id + ' ' + this.players[i].ship.key + this.players[i].id] = [false, false]
                }

           }
        }

        for (var i = 0; i < this.num_players; i++) {
            game.global.explosions[i].animations._anims.boom.onComplete.add(this.stopExplosion, {i: i, hurt:this.hurtable}, this)
        }
console.log(/*Object.keys(*/this.hurtable/*)*/)
        p1Healthbar = new HealthBar(game)
        p1Healthbar.create(true, 10, true)
        p2Healthbar = new HealthBar(game)
        p2Healthbar.create(true, 10)

        p1RetPassive = game.add.image(0, game.height - 175, 'person')
        p1RetPassive.scale.setTo(150/1247, 175/2079)
        p1RetPassive.inputEnabled = true

        p1RetActive = game.add.image(0, game.height - 175, 'shocked')
        p1RetActive.x += (p1RetActive.animations.currentFrame.width * (150/417))
        //console.log(p1RetActive.animations.currentFrame.width / (150/417))
        p1RetActive.scale.setTo(-150/417, 175/450)
        p1RetActive.alpha = 0
        p1RetActive.inputEnabled = true

        p2RetPassive = game.add.image(game.width - 150, game.height - 175, 'person')
        p2RetPassive.x += (p2RetPassive.animations.currentFrame.width * (150/1247))
        p2RetPassive.scale.setTo(-150/1247, 175/2079)
        p2RetPassive.inputEnabled = true

        p2RetActive = game.add.image(game.width - 150, game.height - 175, 'shocked')
        p2RetActive.scale.setTo(150/417, 175/450)
        p2RetActive.alpha = 0
        p2RetActive.inputEnabled = true
        // console.log(game.height - 175)

    },

    update: function () {
        for (var i = 0; i < this.num_players; i++) {
            this.players[i].move()
        }
        this.checkFire()
        // console.log(this.players[0].ship.data['health'])
        // console.log(game.input.y + ' y')
        this.spawnObjects()


        // healthbars
        p1Healthbar.update(this.players[0].ship, 10, 10, 220, 0, 200)

        p2Healthbar.update(this.players[1].ship, 10, 10, game.width - 235, 0, 200)
        // collision

        for (var i = 0; i < this.num_players; i++) {
            this.collision[i] = false
        }
        for (var i = 0; i < this.num_players; i++) {
            // for objects that could harm the players
            for (var j = 0; j < this.objects.length; j++) {
                if (Phaser.Rectangle.intersects(this.players[i].ship.getBounds(), this.objects.children[j].getBounds())) {
                    this.collision[i] = true
                    this.hurtPlayer(this.players[i], this.objects.children[j], this.object_damage)
                }
            }
            for (var k = 0; k < this.num_players; k++) {
                // for the bullets shot by either player
                for (var l = 0; l < this.players[k].bullets.length; l++) {
                    if (Phaser.Rectangle.intersects(this.players[i].ship.getBounds(), this.players[k].bullets.children[l])) {
                        this.collision[i] = true
                        this.hurtPlayer(this.players[i], this.players[k].bullets.children[l], this.players[k].bulletDamage)
                    }

                }
                // check player-player 
                if (i != k && Phaser.Rectangle.intersects(this.players[i].ship.getBounds(), this.players[k].ship.getBounds())) {
                    //console.log('bounce')
                    this.collision[i] = true
                    this.collision[j] = true
                    this.bounceShips(this.players[i], this.players[k])
                    //console.log(this.collision)
                }
            }
        }
        for (var i = 0; i < this.players.length; i++) {
            if (this.collision[i] == true && this.players[i].ship.key == 'ufo') {
                //console.log('made it')
                game.global.explosions[i].alpha = 1
                game.global.explosions[i].x = this.players[i].ship.x
                game.global.explosions[i].y = this.players[i].ship.y
                this.hurtable[i] = false
                game.global.explosions[i].animations.play('boom', 14, false)
            }
        }
        this.checkWinner()
    },

    render: function () {
        // for (var j = 0; j < this.objects.length; j++) {
        //     game.debug.body(this.objects.children[j])
        // }
        for (var i = 0; i < this.players.length; i++) {
            game.debug.body(this.players[i])
        }
    },

    checkFire: function () {
        if (game.input.x < 150 && game.input.y > game.height - 175) {
            p1RetPassive.alpha = 0
            p1RetActive.alpha = .7
            this.players[0].fireBullets()
        }
        if (!(game.input.x < 150 && game.input.y > game.height - 175)) {
            p1RetPassive.alpha = .7
            p1RetActive.alpha = 0
        }
        if (game.input.x > game.width - 150 && game.input.y > game.height - 175) {
            p2RetPassive.alpha = 0
            p2RetActive.alpha = .7
            this.players[1].fireBullets()
        }
        if (!(game.input.x > game.width - 150 && game.input.y > game.height - 175)) {
            p2RetPassive.alpha = .7
            p2RetActive.alpha = 0
        }
    },
    
    spawnObjects: function () {
        n = game.rnd.integerInRange(0, 30 * 3)
        if (this.difficulty % n > this.difficulty / n) {
            new_objects = Math.floor(this.difficulty / n)
            // object names: meteor, earth, metal, planets [0-8]
            for (var i = 0; i < new_objects; i++) {
                id = game.rnd.integerInRange(0, 12)
                if (id == 0) {
                    this.spawnObject('meteor')
                }
                else if (id == 1) {
                    this.spawnObject('earth')
                }
                else if (id == 2) {
                    this.spawnObject('metal')
                }
                else if (id == 3) {
                    this.spawnObject('planet_0')
                }
                else if (id == 4) {
                    this.spawnObject('planet_1')
                }
                else if (id == 5) {
                    this.spawnObject('planet_2')
                }
                else if (id == 6) {
                    this.spawnObject('planet_3')
                }
                else if (id == 7) {
                    this.spawnObject('planet_4')
                }
                else if (id == 8) {
                    this.spawnObject('planet_5')
                }
                else if (id == 9) {
                    this.spawnObject('planet_6')
                }
                else if (id == 10) {
                    this.spawnObject('planet_7')
                }
                else if (id == 11) {
                    this.spawnObject('planet_8')
                }
            }
        }
    },
    
    spawnObject: function (name) {
        x = game.rnd.realInRange(0, game.width)
        speed = game.rnd.integerInRange(50, 300)
        var object
		// var sizex = Math.random()
        // var sizey = Math.random()
        
		var size = game.rnd.realInRange(.25, 1)
        //console.log(name)
        object = this.objects.create(x, game.height, name)
        //console.log(this.objects)
        object.animations.add('move')
        object.play('move', 5, true)
        // object.play('still')
        object.x = x
        object.y = game.height
            
		// Uncomment for debugging
		//objects.push(object)

		this.game.physics.enable(object, Phaser.Physics.ARCADE)
		
		object.enableBody = true
		object.body.colliderWorldBounds = true
		object.body.immovable = true
        object.anchor.setTo(.5, .5)
        if (name == 'meteor') {
            object.scale.setTo(size, -size)    
        }
        else {
            object.scale.setTo(size)
        }
		object.body.velocity.y = -speed
		
		object.checkWorldBounds = true;
		// Kill object/enemy if vertically out of bounds
		object.events.onOutOfBounds.add(this.killObject, this);
		
		object.outOfBoundsKill = true;
		//console.log(this.objects);

    },

    killObject: function (o) {
        //console.log(o)
        o.alpha = 0
    },

    hurtPlayer: function (p, o, d) {
        // console.log('p: ' + p)
        // console.log('o: ' + o)
        if (this.hurtable[p.id] == true){
            // if (d < 5) {
                //console.log(d)
                p.ship.data['health'] -= d
            // }
            if (o != null && o.key == 'bullet') {
                o.kill()
            }
            this.hurtable[p.id] = true
        }
    },

    bounceShips: function (s1, s2) {
        // console.log(s1.id)
        // console.log(s2.id)
        // console.log(Object.keys(this.bouncing))
        for (var i = 0; i < Object.keys(this.bouncing).length; i++) {
            // console.log(s1.ship.key + s1.id + ' ' + s2.ship.key + s2.id + ' id')
            //console.log(Object.keys(this.bouncing)[i])
            if (s1.ship.key + s1.id + ' ' + s2.ship.key + s2.id == Object.keys(this.bouncing)[i] && this.bouncing[s1.ship.key + s1.id + ' ' + s2.ship.key + s2.id][0] == false && this.bouncing[s1.ship.key + s1.id + ' ' + s2.ship.key + s2.id][1] == false) {
                // console.log('here')
                s1.ship.data['lockKeys'] = true
                s2.ship.data['lockKeys'] = true
                // s1.ship.body.velocity.x = 0
                // s1.ship.body.velocity.y = 0
                // s2.ship.body.velocity.x = 0
                // s2.ship.body.velocity.y = 0
                // this.s1Bounce = game.add.tween(s1).to({x: 100}, 1150).start()
                // this.s2Bounce = game.add.tween(s2).to({x: 450}, 1150).start()

                // s1_mag = Math.hypot(s1.ship.body.velocity.x, s1.ship.body.velocity.y)
                // s2_mag = Math.hypot(s2.ship.body.velocity.x, s2.ship.body.velocity.y)
                s1_mag = Math.hypot(s1.xRate, s1.yRate)
                s2_mag = Math.hypot(s2.xRate, s2.yRate)
                // console.log(s1_mag + ' s1')
                // console.log(s2_mag + ' s2')
                //big_bounce = (s1_mag >= s2.ship.mag) ? s1_mag : s2_mag
                let a = 1
                let b = 1
                if (s1.ship.x <= s2.ship.x) {
                    a = -1
                }
                if (s1.ship.y <= s2.ship.y) {
                    b = -1
                }
                        // console.log(s1.ship.x + s2_mag * Math.cos(s2_mag) * a)
                theta1 = Math.atan(s1.yRate / s1.xRate)
                theta2 = Math.atan(s2.yRate / s2.xRate)
                this.s1Bounce = game.add.tween(s1.ship).to({x: s1.ship.x + s2_mag * Math.cos(theta2) * a, y: s1.ship.y + s2_mag * Math.sin(theta2) * b}, 50).start()
                this.s2Bounce = game.add.tween(s2.ship).to({x: s2.ship.x + s1_mag * Math.cos(-theta1) * -a, y: s2.ship.y + s1_mag * Math.sin(-theta1) * -b}, 50).start()
                if (s1.id < s2.id) {
                        // this.s1Bounce = game.add.tween(s1).to({x: 100, y: 100}, 1150).start()
                        // this.s2Bounce = game.add.tween(s2).to({x: 450, y: 450}, 1150).start()
                    this.bouncing[s1.ship.key + s1.id + ' ' + s2.ship.key + s2.id][0] = true
                    this.bouncing[s1.ship.key + s1.id + ' ' + s2.ship.key + s2.id][1] = true
                    this.s1Bounce.onComplete.add(this.completeBounce, this, {k: s1.ship.key + s1.id + ' ' + s2.ship.key + s2.id, j: 0})
                    this.s2Bounce.onComplete.add(this.completeBounce, this, {k: s1.ship.key + s1.id + ' ' + s2.ship.key + s2.id, j: 1})
                            
                }
                if (s1.ship.y < s2.ship.y - 5) {
                    this.hurtPlayer(s1, null, 5)
                    //this.hurtPlayer(s2.ship, null, .5)
                }
                else if ((s1.ship.y - 5 > s2.ship.y)){
                    //this.hurtPlayer(s1.ship, null, .5)
                    this.hurtPlayer(s2, null, 5)
                }
            }
        }
    },

    completeBounce: function (s, tw) {
        //console.log(s)
        obj = tw.onComplete._bindings[0]._priority
        // console.log(obj)
        
        this.bouncing[obj['k']][obj['j']] = false
        s.data['lockKeys'] = false
    },

    stopExplosion: function (b, obj) {
        console.log(b)
        i = obj.onComplete._bindings[0].context['i']
        hurt = obj.onComplete._bindings[0].context['hurt']
        //console.log(obj.onComplete._bindings[0].context['hurt'])
        game.global.explosions[i].alpha = 0
        hurt[i] = true
        //this.collision
    },

    checkWinner: function () {
        winner = 0
        losers = 0
        for (var i = 0; i < this.num_players; i++) {
            if (this.players[i].ship.data['health'] <= 0) {
                losers++
            }
            else {
                winner = i
            }
        }
        //console.log(winner)
        if (losers == this.num_players - 1) {
            game.state.start('winner', true, false, this.players[winner].id + 1, '')
        }
        if (losers == this.num_players) {
            game.state.start('winner', true, false, 0, 'No Winner')
        }
    }
}