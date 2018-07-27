var cave_2 ={
    preload:function(){
        //loading tilemap
        game.load.tilemap('cave_2', 'assets/maps/cave_2.json', null, Phaser.Tilemap.TILED_JSON);
        //mapping tile .pngs
        game.load.image('brown','tileset/ground/brown.png');
        game.load.image('skull_dark','tileset.item/corpse/skull_dark.png');
        game.load.image('grey_stone','tileset/item/statue/grey_stone.png');
        game.laod.image('eye','tileset/ground/eye.png');
        game.load.image('dark_stairs','tileset/building/stairs/dark_stairs.png');
        game.load.image('portal','tileset/logic/portal.png');
        game.load.image('collision','tileset/logic/collision.png');
        game.load.image('enourmous_creature','tileset/logic.creature/enourmous_creature.png');
        game.load.image('demon','tileset/logic/creature/demon.png');
        game.laod.image('elemental','tileset/logic/creature/elemental.png');
        game.load.image('undead','tileset/logic/creature/undead.png');
        game.load.image('human','tileset/logic.creature/human.png');
        game.load.image('iron_lamp','tileset/furniture/light/iron_lamp.png');
        game.load.image('flames','tileset/furniture/light/flames.png');
        game.load.image('skeleton','tileset/item/corpse/skeleton.png');
        game.load.image('metal_and_stone','tileset/item/statue/metal_and_stone.png');
        game.load.image('floor_stains_2','tileset/item/blood/floor_stains_2.png');
        game.load.image('floor_stain','tileset/item/blood/floor_stain.png');
        game.load.image('nsew_stains','tileset/item/blood/nsew_stains.png');
        game.load.image('int_rock','tileset/building/wall/int_rock.png');
        game.load.image('brown_edges','tileset/ground/brown_edges.png');
        game.load.image('tan_building','tileset/building/tan_building.png');
        game.load.image('sand_1','tileset/ground/sand_1.png');
        game.load.image('sand_2','tileset/ground/sand_2.png');
        game.laod.image('brown_corners','tileset/ground/brown_corners.png')
        game.load.image('window_centered','tileset/building/window/window_centered.png');
        game.load.image('closed','tileset/building/door/closed.png');
        game.load.image('door','tileset/building/door/door.png');
        game.load.image('large_green','tileset/plant/bush/large_green.png');
        game.load.image('dim_yellow_light_7x5','tileset/light/dim_yellow_light_7x5.png');
        game.load.image('dim_yellow_light_5x5','tileset/light/dim_yellow_light_5x5.png');
        game.load.image('blobcreature','tileset/item/statue/blobcreature.png');
    },

    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //mapping tilesets
        this.map.addTilesetImage('brownGround','brown');
        this.map.addTilesetImage('darkSkull','skull_dark');
        this.map.addTilesetImage('greyStoneStatue','grey_stone');
        this.map.addTilesetImage('eye','eye');
        this.map.addTilesetImage('darkStairs','dark_stairs');
        this.map.addTilesetImage('portal','portal');
        this.map.addTilesetImage('collision','collision');
        this.map.addTilesetImage('enourmousCreature','enourmous_creature');
        this.map.addTilesetImage('demon','demon');
        this.map.addTilesetImage('elemental','elemental');
        this.map.addTilesetImage('undead','undead');
        this.map.addTilesetImage('human','human');
        this.map.addTilesetImage('ironLamp','iron_lamp');
        this.map.addTilesetImage('flames','flames');
        this.map.addTilesetImage('skeleton','skeleton');
        this.map.addTilesetImage('metalStoneStatue','metal_and_stone');
        this.map.addTilesetImage('stainFloor2','floor_stains_2');
        this.map.addTilesetImage('stainFloor','floor_stain');
        this.map.addTilesetImage('nsewStain','nsew_stains');
        this.map.addTilesetImage('intRock','int_rock');
        this.map.addTilesetImage('brownEdges','brown_edges');
        this.map.addTilesetImage('centeredWindow','window_centered');
        this.map.addTilesetImage('closedDoor','closed');
        this.map.addTilesetImage('door','door');
        this.map.addTilesetImage('largeGreenBush','large_green');
        this.map.addTilesetImage('dimYellowLight_7x5','dim_yellow_light_7x5');
        this.map.addTilesetImage('dimYellowLight_5x5','dim_yellow_light_5x5');
        this.map.addTilesetImage('blob','blobcreature');
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