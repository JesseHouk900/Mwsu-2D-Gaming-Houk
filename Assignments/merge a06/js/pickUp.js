function PickUp (gameCopy) {
    var game = gameCopy
    this.item
    this.item_scale
    this.create = function (type, x, y) {
        if (type == 'coin') {
            console.log(game)
            this.item = game.add.sprite(x, y, 'coin')
            this.item.animations.add('do_nothing', [0])
            this.item_scale = .5
        }
        if (type == 'shiningCoin') {
            this.item = game.add.sprite(x, y, 'shiningCoin')
            this.item.animations.add('shine')
            this.item.animations.play('shine', 3, true)
            this.item_scale = .15
        }
        // if (type == 'health') {}
        this.fixScale()
    }
    this.update = function () {
        
    }
    
    this.fixScale = function () {
        this.item.scale.setTo(this.item_scale)
        
    }
}