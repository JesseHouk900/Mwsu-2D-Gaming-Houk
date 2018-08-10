var HealthBar = function () {
    this.x
    this.y
    this.xoff
    this.yoff
    this.health
    this.max_health
    this.width
    this.height
    this.dmg_percent
    this.fixed
    this.inverted

    this.create = function (fixed = false, thickness, inverted = false) {
        
        this.height = thickness
        this.fixed = fixed
        this.inverted = inverted
        this.config = {
            fixed: this.fixed,
            inverted: this.inverted,
            x: this.x,
            xoff: this.xoff,
            y: this.y,
            yoff: this.yoff,
            height: this.height,
            width: this.width,
            health: this.health
        }
    }
    // sprite should have a data object with health and max_health key-values
    this.update = function (entity_sprite, xoff, yoff, x, y, width) {
        if (this.fixed) {
            this.xoff = xoff
            this.yoff = yoff
            this.x = x + this.xoff
            this.y = y + this.yoff
            this.width = width
        }
        else {
            this.xoff = -5
            this.yoff = -5
            this.x = entity_sprite.x + this.xoff
            this.y = entity_sprite.y + this.yoff
            this.width = 10 + entity_sprite.body.width
        }
        this.health = entity_sprite.data.health
        this.max_health = entity_sprite.data.max_health
        
        this.dmg_percent = this.health / this.max_health

        if (typeof(this.healthbar) === 'object') {
            this.healthbar.destroy()
        }

        this.healthbar = entity_sprite.game.add.graphics(this.x, this.y)

        if (this.dmg_percent  > 0) {
            // draw bar representing health
            this.healthbar.lineStyle(2, 0x111111, 1)
            this.healthbar.beginFill(0x01FB10, 1)
            this.healthbar.drawRect(this.xoff, this.yoff, this.width, this.height)
            this.healthbar.endFill()
            
            // draw bar representing damage taken
            this.healthbar.beginFill(0xDF0012, 1)
            this.healthbar.drawRect(this.xoff, this.yoff, this.width * (1 - this.dmg_percent), this.height)
            this.healthbar.endFill()
        }
        else {
            // only draw red bar
            this.healthbar.lineStyle(2, 0x111111, 1)
            this.healthbar.beginFill(0xDF0012, 1)
            this.healthbar.drawRect(this.xoff, this.yoff, this.width, this.height)
            this.healthbar.endFill()
        }
        if (this.inverted) {
            this.healthbar.scale.setTo(-1, 1)
        }
    }
}