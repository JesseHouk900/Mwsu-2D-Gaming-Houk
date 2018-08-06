function PickUp (gameCopy) {
    var game = gameCopy
    this.item
    this.item_scale
    this.create = function (type, x, y) {
        if (item == 'coin') {
            this.item = game.add.spritesheet(x, y, type)
            this.item.animations.add('do_nothing', [0])
            this.item_scale = .5
        }
        if (item == 'coin_bag') {
            
        }
        this.item.scale.setTo(this.item_scale)
        // if (item == 'health') {}
    }
}