function PickUp (gameCopy) {
    var game = gameCopy
    this.item
    this.item_scale
    this.create = function (type, x, y) {
        console.log(type)
        if (this.item == 'coin') {
            this.item = game.add.spritesheet(x, y, 'coin')
            this.item.animations.add('do_nothing', [0])
            this.item_scale = .5
        }
        if (this.item == 'coin_bag') {
            
        }
        // if (item == 'health') {}
        this.fixScale()
    }
    
    this.fixScale = function () {
        this.item.scale.setTo(this.item_scale)
        
    }
}