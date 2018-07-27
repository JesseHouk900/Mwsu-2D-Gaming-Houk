var cave ={
    preload:function(){
        //loading tilemap
        game.load.tilemap('cave', 'assets/maps/cave.json', null, Phaser.Tilemap.TILED_JSON);
        //mapping tile .pngs
        game.load.image('collision','tileset/logic/collision.png');
        game.load.image('ground/brown','tileset/ground/brown.png');
        game.load.image('rock/rocks_2','tileset/ground/rock/rocks_2.png');
        game.load.image('floor_tiles','tileset/ground/indoor/floor_tiles.png');
        game.load.image('rocks','tileset/ground/rock/rocks.png');
        game.load.image('wall/int_rock','tileset/building/wall/int_rock.png');
        game.load.image('purple_crystal','tileset/ground/rock/purplr_crystal.png');
        game.load.image('stairs','tileset/building/stairs/stairs.png');
        game.load.image('dark_stairs','tileset/building/stairs/dark_stairs.png');
        game.load.image('blood/floor_stain','tileset/item/blood/floor_stain.png');
        game.load.image('blood/nsew_stains','tileset/item/blood/nsew_stains.png');
        game.load.image('corpse/skeleton','tileset/item/corpse/skeleton.png');
        game.load.image('corpse/huge_animal','tileset/item/corpse/huge_animal.png');
        game.load.image('skull_dark','tileset.item/corpse/skull_dark.png');
        game.load.image('skull_pale','tileset.item/corpse/skull_pale.png');
        game.load.image('broken_green_column','tileset/item/statue/broken_green_column.png');
        game.load.image('blackened_column','tileset/item/statue/blackened_column.png');
        game.load.image('mushroom3','tileset/plant/mushroom3.png');
        game.load.image('star_shaped_plants','tileset/plant/star_shaped_plants.png');
        game.load.image('portal','tileset/logic/portal.png');
        game.load.image('creature/giant_human','tileset/logic/creature/giant_human.png');
        game.load.image('creature/mutant','tileset/logic/creature/mutant.png');
        game.load.image('creature/huge_animal','tileset/logic/creature/huge_animal.png');
        game.load.image('ground/brown','tileset/ground/brown.png');
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