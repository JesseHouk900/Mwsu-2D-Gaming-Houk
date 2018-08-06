




function Enemy(gameCopy) {
    var game = gameCopy
    this.enemy
    this.enemy_speed
    this.enemy_run_multiplier
    this.attacking
    this.health
    this.isSpawned
    this.prevDir
    this.enemy_scale = 1
    
    //this.preload = function () {

    //}

    this.create = function () {
        this.enemy_speed = 125
        this.enemy_run_multiplier = 1.08
        this.isSpawned = false
        //this.spawnEnemy(4, sprite_name, level_state)
    
    }

    // this.createRandom = function (health) {
    //     this.enemy_speed = 175
    //     this.enemy_run_multiplier = 1.08
    //     this.isSpawned = false
    //     // let num_sprites = 1
    //     let sprite_num = game.rnd.integerInRange(0, 1/*num_sprites*/)
    //     if (sprite_num == 0) {
    //         this.spawnEnemy(4, 'skeleton', level_state)
    //     }
    //     if (sprite_num == 1) {
    //         this.spawnEnemy(4, 'zombie', level_state)
    //     }
    //     this.enemy.data['health'] = health
    //     this.enemy.data['max_health'] = health
    // }

    this.update = function (player) {
        this.chasePlayer(player)
        this.healthbar.update(this.enemy)
        //console.log('enemy Update')
    }
    // spawn an enemy randomly
    // Params: 
    // a copy of the level that includes the tilemap where the enemy will spawn,
    // the index of the desired tile which the enemy will spawn on, 
    // the layer in which the index belongs to from the tilemap
    // the key name of the spritesheet that will be used,
    // an optional designator for if a sprite only faces one direction
    // the health of the sprite
    this.spawnEnemy = function (level_state, index, layer_num = 0, sprite_name, sprite_dir = '', health) {
        if (!this.isSpawned) {
            //console.log(this)
            invalidSpawn = true
            let x = 0
            let y = 0
            let spawn_radius = 1000
            if (invalidSpawn) {
                pxm = level_state.player.player.x - spawn_radius
                pxh = level_state.player.player.x + spawn_radius
                pym = level_state.player.player.y - spawn_radius
                pyh = level_state.player.player.y + spawn_radius
                x = game.rnd.integerInRange(pxm, pxh)
                y = game.rnd.integerInRange(pym, pyh)
                level_state.map.currentLayer = layer_num
                //console.log(level_state.map)
                //console.log(level_state.map.layers[1])
                //console.log(level_state.map.getTileWorldXY(x, y))
                if (level_state.map.getTileWorldXY(x, y)) {
                    if (level_state.map.getTileWorldXY(x, y).index == index) {
                        invalidSpawn = false
                        this.isSpawned = true
                    }
                }
            }
            if (this.isSpawned) {
                //console.log('made it')
                this.createEnemy(sprite_name, sprite_dir, x, y, health)
                level_state.map.currentLayer = 0
            }
        }
    }
    // makes the sprite of an enemy and its animations
    // Params: the key name of the sprite that will be used,
    //      if a spritesheet only has the animations going one direction a string should be passed that will define which direction the given animation is already going
    //      the sprites initial x and y position value,
    //      the health of the enemy
    this.createEnemy = function (sprite, dir = '', x, y, health) {
        //console.log('creating')
        this.enemy = game.add.sprite(x, y, sprite)
        this.makeAnimations(dir)
        game.physics.arcade.enable(this.enemy)
        if (sprite == 'skeleton') {
            this.enemy_scale = .25
        }
        else if (sprite == 'zombie') {
            this.enemy_scale = .65
        }
        this.enemy.scale.setTo(this.enemy_scale)
        this.enemy.data['health'] = health
        this.enemy.data['max_health'] = health
        this.healthbar = new HealthBar()
        this.healthbar.create(5)
        //console.log(this.enemy)
    }
    
    // debugging
    this.spawnEnemyAt = function (x, y, sprite, health) {
        this.enemy = game.add.sprite(x, y, sprite)
        this.enemy.data['health'] = health
        this.enemy.data['max_health'] = health
        this.enemy.animations.add('walk', [0,1,2,3,4,5])
        this.enemy.animations.play('walk', 1.75, true, false)
        this.enemy.scale.setTo(.1, .1)
        this.healthbar = new HealthBar()
        this.healthbar.create(5)
        
    }
    this.makeAnimations = function (dir = '') {
        if (dir != '') {
            this.prevDir = dir
            dir = '_' + dir
        }
        else {
            this.prevDir = 'left'
        }
        this.enemy.animations.add('walk' + dir, [0,1,2,3,4,5])
        this.enemy.animations.play('walk' + dir, 1.75, true, false)
        
        
    }
    
    this.chasePlayer = function (p) {
        //console.log(this.enemy.animations.currentAnim.name)
        
        let x = this.determineOrientation(p.x, 'x')
        let y = this.determineOrientation(p.y, 'y')
        this.changeAnimation(p.x)
        
        // add buffer somewhere so that the enemy stops trying to come to your exact loaction to prevent jerky direction changes
        this.moveEnemy(x, y)
    }

    this.determineOrientation = function (axis_val, axis) {
        if (axis_val > this.enemy[axis]) {
            return this.enemy_speed
        }
        else if (axis_val < this.enemy[axis]) {
            return -this.enemy_speed
        }
        else {
            return 0
        }
    }

    this.changeAnimation = function (x) {
        // fix flips by changing x values as scale is changed
        if (x > this.enemy.x) {
            this.prevDir = 'left'
            if (this.enemy.key == 'zombie') {
                this.enemy.scale.setTo(this.enemy_scale, this.enemy_scale)
            }
            else if (this.enemy.key == 'skeleton') {
                this.enemy.scale.setTo(-this.enemy_scale, this.enemy_scale)
            }
        }
        else if (x < this.enemy.x) {
            this.prevDir = 'right'
            if (this.enemy.key == 'zombie') {
                this.enemy.scale.setTo(-this.enemy_scale, this.enemy_scale)
            }
            else if (this.enemy.key == 'skeleton') {
                this.enemy.scale.setTo(this.enemy_scale, this.enemy_scale)
            }
        }
    }

    this.moveEnemy = function (xv, yv) {
        this.enemy.body.velocity.x = xv
        this.enemy.body.velocity.y = yv
    }
}