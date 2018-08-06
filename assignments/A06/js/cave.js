var cave ={
    init_health: 0,

    init: function (player, health/*, coins*/) {
        this.player = player
        init_health = health
    },
    
    preload:function(){
        //loading tilemap
        game.load.tilemap('cave', 'assets/maps/cave.json', null, Phaser.Tilemap.TILED_JSON);
        //mapping tile .pngs
        game.load.image('collision','assets/tileset/logic/collision.png');
        game.load.image('ground/brown','assets/tileset/ground/brown.png');
        game.load.image('rock/rocks_2','assets/tileset/ground/rock/rocks_2.png');
        game.load.image('floor_tiles','assets/tileset/ground/indoor/floor_tiles.png');
        game.load.image('rocks','assets/tileset/ground/rock/rocks.png');
        game.load.image('wall/int_rock','assets/tileset/building/wall/int_rock.png');
        game.load.image('purple_crystal','assets/tileset/ground/rock/purplr_crystal.png');
        game.load.image('stairs','assets/tileset/building/stairs/stairs.png');
        game.load.image('dark_stairs','assets/tileset/building/stairs/dark_stairs.png');
        game.load.image('blood/floor_stain','assets/tileset/item/blood/floor_stain.png');
        game.load.image('blood/nsew_stains','assets/tileset/item/blood/nsew_stains.png');
        game.load.image('corpse/skeleton','assets/tileset/item/corpse/skeleton.png');
        game.load.image('corpse/huge_animal','assets/tileset/item/corpse/huge_animal.png');
        game.load.image('skull_dark','assets/tileset.item/corpse/skull_dark.png');
        game.load.image('skull_pale','assets/tileset.item/corpse/skull_pale.png');
        game.load.image('broken_green_column','assets/tileset/item/statue/broken_green_column.png');
        game.load.image('blackened_column','assets/tileset/item/statue/blackened_column.png');
        game.load.image('mushroom3','assets/tileset/plant/mushroom3.png');
        game.load.image('star_shaped_plants','assets/tileset/plant/star_shaped_plants.png');
        game.load.image('portal','assets/tileset/logic/portal.png');
        game.load.image('creature/giant_human','assets/tileset/logic/creature/giant_human.png');
        game.load.image('creature/mutant','assets/tileset/logic/creature/mutant.png');
        game.load.image('creature/huge_animal','assets/tileset/logic/creature/huge_animal.png');
        game.load.image('ground/brown','assets/tileset/ground/brown.png');
    },

    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //mapping tilesets
        this.map.addTilesetImage('collision','collision');
        this.map.addTilesetImage('ground','ground/brown');
        this.map.addTilesetImage('rocks2','rock/rocks_2');
        this.map.addTilesetImage('floor','floor_tiles');
        this.map.addTilesetImage('rocks','rocks');
        this.map.addTilesetImage('wallRock','wall/int_rock');
        this.map.addTilesetImage('crystal','purple_crystal');
        this.map.addTilesetImage('stairs','stairs');
        this.map.addTilesetImage('darkStairs','dark_stairs');
        this.map.addTilesetImage('stainFloor','blood/floor_stain');
        this.map.addTilesetImage('nsewStain','blood/nsew_stains');
        this.map.addTilesetImage('skeleton','corpse/skeleton');
        this.map.addTilesetImage('hugeCorpse','corpse/huge_animal');
        this.map.addTilesetImage('darkSkull','skull_dark');
        this.map.addTilesetImage('paleSkull','skull_pale');
        this.map.addTilesetImage('brokenGreenColumn','broken_green_column');
        this.map.addTilesetImage('blackenedColumn','blackened_column');
        this.map.addTilesetImage('mushroom3','mushroom3');
        this.map.addTilesetImage('starPlant','star_shaped_plant');
        this.map.addTilesetImage('portal','portal');
        this.map.addTilesetImage('giantHuman','creature/giant_human');
        this.map.addTilesetImage('mutant','creature/mutant');
        this.map.addTilesetImage('hugeAnimal','creature/huge_animal');
        this.map.addTilesetImage('brownGround','ground/brown');
        //map layers
        this.layers = {
            ground_layer: this.map.createLayer('0_floor'),
            terrain_layer:this.map.createLayer('1_terrain'),
            object_layer:this.map.createLayer('2_object'),
            roof_layer:this.map.createLayer('3_roof'),
            roofAdd_layer:this.map.createLayer('4_roof_add'),
            objects:this.map.createLayer('objects'),
            collision:this.map.createLayer('collision'),
            protection:this.map.createLayer('protection'),
            blendGround:this.map.createLayer('blend_ground'),
            blendRoof:this.map.createLayer('blend_roof')
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