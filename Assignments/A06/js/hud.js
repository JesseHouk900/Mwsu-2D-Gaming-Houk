
// Params:
// instance of the game
// title of HUD
// width of HUD
// height of HUD
// position of HUD on the screen as an object: {x: xInPixels, y: yInPixels}
var HUD = function (game, title = '', width, height, location = null) {
    this.game = game
    this.x_origin = 0
    this.y_origin = 0
    this.height = height
    this.width = width
    this.hud = game.add.graphics(this.x_origin, this.y_origin)
    this.title
    this.title_text = title
    this.font_size = 24
    this.hud_components = []
    this.items = []
    this.location = location
    
    this.create = function () {
        this.game.load.bitmapFont('mainFont', 'assets/fonts/ganonwhite/font.png', 'assets/fonts/ganonwhite/font.xml')
        if (this.location = null) {
            location = {}
            location['x'] = 0
            location['y'] = 0
        }
        this.makeTitle()
        this.createHUD()
        this.updateHUD()
    }

    this.updateHUD = function () {
        for (var i = 0; i < this.hud_components.length; i++) {
            this.hud_components[i].destroy()
        }
        this.hud_components = []
        this.createHUD()
        this.makeTitle()
        this.printItems()
    }

    this.createHUD = function () {
        this.hud.lineStyle(2, 0x111111, 1)
        this.hud.beginFill(0x010101, .4)
        this.hud.drawRect(this.game.camera.x + 1, this.game.camera.y + 1, this.width, this.height)
        this.hud.endFill()
        this.hud_components.push(this.hud)
    }
    
    this.makeTitle = function () {
        if (this.title_text == '') {
            this.title_text = 'HUD'
        }
        this.title = this.game.add.text(0, 0, this.title_text, this.getStyle("#FFF", this.font_size, true))
        this.title.setShadow(3, 3, 'fgba(0,0,0,0,5)', 2)
        this.title.setTextBounds(this.game.camera.x, this.game.camera.y, this.width, this.height)
        this.hud_components.push(this.title)
    }

    this.getStyle = function (fill, f_size, bold = false) {
        bold_text = ''
        if (bold) {
            bold_text = 'bold '
        }

        return {font: bold_text + f_size + "px Arial", fill: fill, boundsAlignH: "left", boundsAlignV: "top"}
    }

    this.printItems = function () {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].data) {
                value = this.items[i].entity.data[this.items[i].key]
            }
            else {
                value = this.items[i].entity[this.items[i].key]
            }
            item = this.game.add.text(0, 0, this.items[i].key + ':' + value, this.getStyle('#FFF', 20))
            item.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
            item.setTextBounds(this.game.camera.x, this.game.camera.y + ((i+1)*24), this.width, this.height)

            this.hud_components.push(item)
        }
    }

    this.addItem = function (entity, key, data = false) {
        this.items.push({'entity': entity, 'key': key, 'data': data})
    }
}