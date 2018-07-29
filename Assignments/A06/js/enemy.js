




function Enemy(gameCopy) {
    var game = gameCopy
    this.enemy
    this.enemy_speed
    this.enemy_run_multiplier
    this.attacking
    this.health
    this.isSpawned
    
    //this.preload = function () {

    //}

    this.create = function (sprite_name, health) {
        this.enemy_speed = 175
        this.enemy_run_multiplier = 1.08
        this.health = health
        this.isSpawned = false
    }
    
    this.update = function () {
        
    }
    // spawn an enemy randomly
    // Params: index is the index of the desired tile which the enemy will spawn on, the key name of the spritesheet that will be used
    this.spawnEnemy = function (index, sprite_name) {
        if (!this.isSpawned) {
            invalidSpawn = true
            let x = 0
            let y = 0
            while (invalidSpawn) {
                x = game.rnd.integerInRange(0, game.scale.maxWidth)
                y = game.rnd.integerInRange(0, game.scale.maxHeight)
                if (false/*game.map.tile[{x,y}].index == index*/) {
                    invalidSpawn = false
                }
            }
            this.createEnemy(sprite_name, x, y)
        }
    }
    // makes the sprite of an enemy and its animations
    // Params: the key name of the sprite that will be used,
    //      the sprites initial x and y position value,
    //      if a spritesheet only has the animations going one direction a string should be passed that will define which direction the given animation is already going
    this.createEnemy = function (sprite, x, y, dir = '') {
        this.enemy = game.add.sprite(x, y, sprite)
        this.makeAnimations(dir)
        
    }

    this.makeAnimations = function () {
        
        this.enemy.animations.add('walk')

    }

}