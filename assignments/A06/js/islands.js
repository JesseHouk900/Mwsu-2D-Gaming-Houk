var islands ={
    preload:function(){
        //loading tilemap
        game.load.tilemap('islands', 'assets/maps/islands.json', null, Phaser.Tilemap.TILED_JSON);
        //mapping tile .pngs
        game.load.image('ground','tileset/ground/ground.png');
        game.load.image('earth_dark','tileset/ground/water/earth_dark.png');
        game.load.image('grass_edges','tileset/ground/grass_edges.png');
        game.load.image('grass_corners','tileset/ground/grass_corners.png');
        game.load.image('grasses','tileset/plant/grasses.png');
        game.load.image('earth_edges','tileset/ground/earth_edges.png');
        game.load.image('huge_animal','tileset/item/corpse/huge_animal.png');
        game.load.image('small_stump','tileset/plant/stump/small_stump.png');
        game.load.image('eye','tileset/ground/eye.png');
        game.load.image('collision','tileset/logic/collision.png');
        game.load.image('portal','tileset/logic/portal.png');
        game.load.image('palm_tree','tileset/plant/tree/palm_tree.png');
        game.load.image('tree_blue','tileset/plant/tree/tree_blue.png');
        game.load.image('tree_golden_large','tileset/plant/tree/tree_golden_large.png');
        game.load.image('tree_golden_small','tileset/plant/tree/tree_golden_small.png');
        game.load.image('green_stone_2','tileset/item/statue/green_stone_2.png');
        game.load.image('blue_circle','tileset/building/decoration/blue_circle.png');
        game.laod.image('giant_human','timeset/logic/creature/giant_human.png');
        game.load.image('naga','tileset/logic/creature/naga.png');
        game.load.image('daisy_white','tileset/plant/flower/daisy_white.png');
        game.load.image('daisy_yellow','tileset/plant/flower/daisy_yellow.png');
        game.load.image('stump_pale_brown', 'tileset/plant/stump/stump_pale_brown.png');
        game.load.image('stump_brown','tileset/plant/stump/stump_brown.png');
        game.load.image('floor_sparkle','tileset/building/decoration/floor_sparkle.png');
        game.load.image('green_stone_3','tileset/item/statue/green_stone_3.png');
        game.load.image('vine','tileset/plant/vine.png');
        game.load.image('fairy','tileset/logic/creature/fairy.png');
        game.load.image('demon','tileset/logic/creature/demon.png');
        game.load.image('elemental','tileset/logic/creature/elemental.png');
        game.load.image('suspension_bridge','tileset/object/suspension_bridge.png')
    },

    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //mapping tilesets
        this.map.addTilesetImage('ground','ground');
        this.map.addTilesetImage('darkEarth','earth_dark');
        this.map.addTilesetImage('edgeGrass','grass_edges');
        this.map.addTilesetImage('cornerGrass','grass_corners');
        this.map.addTilesetImage('grass','grasses');
        this.map.addTilesetImage('edgeEarth','earth_edges');
        this.map.addTilesetImage('animalCorpse','huge_animal');
        this.map.addTilesetImage('stumpS','small_stump');
        this.map.addTilesetImage('eye','eye');
        this.map.addTilesetImage('collision','collision');
        this.map.addTilesetImage('portal','portal');
        this.map.addTilesetImage('palmTree','palm_tree');
        this.map.addTilesetImage('blueTree','tree_blue');
        this.map.addTilesetImage('goldenTreeL','tree_golden_large');
        this.map.addTilesetImage('goldenTreeS','tree_golden_small');
        this.map.addTilesetImage('greenStoneStatue2','green_stone_2');
        this.map.addTilesetImage('blueCircle','blue_circle');
        this.map.addTilesetImage('giant','giant_human');
        this.map.addTilesetImage('naga','naga');
        this.map.addTilesetImage('whiteDaisy','daisy_white');
        this.map.addTilesetImage('yellowDaisy','daisy_yellow');
        this.map.addTilesetImage('paleBrownStump','stump_pale_brown');
        this.map.addTilesetImage('stump','stump_brown');
        this.map.addTilesetImage('sparkleFloor','floor_sparkle');
        this.map.addTilesetImage('greenStoneStatue3','green_stone_3');
        this.map.addTilesetImage('vine','vine');
        this.map.addTilesetImage('fairy','fairy');
        this.map.addTilesetImage('demon','demon');
        this.map.addTilesetImage('elemental','elemental');
        this.map.addTilesetImage('bridge','suspension_bridge');
        //map layers
        this.layers = {
            ground_layer: this.map.createLayer('0_floor'),
            terrain_layer:this.map.createLayer('1_terrain'),
            object_layer:this.map.createLayer('2_object'),
            roof_layer:this.map.createLayer('3_roof'),
            roofAdd_layer:this.map.createLayer('4_roof_add'),
            objects:this.map.createLayer('objects'),
            collision:this.map.createLayer('collision')
        };
        //hide the collision layer
        this.layers.collision.alpha = 0;
        //set up collision
        game.physics.arcade.enable(this.layers.collision);
        this.map.setCollision(1,true,this.layers.collision);
        //needs correct index
        //this.map.setTileIndexCallback(index,this.hitWall,this);

        this.layers.ground_layer.resizeWorld();

        
    },

    update:function(){

    },
}