var forrest ={
    preload:function(){
        //loading tilemap
        game.load.tilemap('forest_e', 'assets/maps/forrest_e.json', null, Phaser.Tilemap.TILED_JSON);
        //mapping tile .pngs
        game.load.image('ground','tileset/ground/ground.png');
        game.load.image('pool','tileset/ground/water/pool.png');
        game.load.image('earth_dark','tileset/ground/water/earth_dark.png');
        game.load.image('grass_edges','tileset/ground/grass_edges.png');
        game.load.image('earth_edges','tileset/ground/earth_edges.png');
        game.load.image('grass_corners','tileset/ground/grass_corners.png');
        game.load.image('daisy_blue','tileset/plant/flower/daisy_blue.png');
        game.load.image('daisy_yellow','tileset/plant/flower/daisy_yellow.png');
        game.load.image('bushes','tileset/plant/bush/bushes.png');
        game.load.image('daisy_red','tileset/plant/flower/daisy_red.png');
        game.load.image('daisy_white','tileset/plant/flower/daisy_white.png');
        game.load.image('collision','tileset/logic/collision.png');
        game.load.image('tree_green','tileset/plant/tree/tree_green.png');
        game.load.image('castle','tileset/building/castle.png');
        game.load.image('tent','tileset/object/tent.png');
        game.laod.image('sheepfood','tileset/logic/items/sheepfood.png');
        game.load.image('fairy','tileset/logic/creature/fairy.png');
        game.load.image('untitled','tileset/logic/item/resources.png');
        game.load.image('portal','tileset/logic/portal.png');
        game.load.image('green_paving','tileset/ground/green_paving.png');
        game.load.imgae('protection','tileset/logic/protection.png');
    },

    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //mapping tilesets
        this.map.addTilesetImage('ground','ground');
        this.map.addTilesetImage('pool','pool');
        this.map.addTilesetImage('darkEarth','earth_dark');
        this.map.addTilesetImage('edgeGrass','grass_edges');
        this.map.addTilesetImage('edgeEarth','earth_edges');
        this.map.addTilesetImage('cornerGrass','grass_corners');
        this.map.addTilesetImage('blueDaisy','daisy_blue');
        this.map.addTilesetImage('yellowDaisy','daisy_yellow');
        this.map.addTilesetImage('bush','bushes');
        this.map.addTilesetImage('redDaisy','daisy_red');
        this.map.addTilesetImage('whiteDaisy','daisy_white');
        this.map.addTilesetImage('collision','collision');
        this.map.addTilesetImage('greenTree','tree_green');
        this.map.addTilesetImage('castle','castle');
        this.map.addTilesetImage('tent','tent');
        this.map.addTilesetImage('sheedFood','sheepfood');
        this.map.addTilesetImage('fairy','fairy');
        this.map.addTilesetImage('resources','untitled');
        this.map.addTilesetImage('portal','portal');
        this.map.addTilesetImage('greenPaving','green_paving');
        this.map.addTilesetImage('protection','protection');
        //map layers
        this.layers = {
            ground_layer: this.map.createLayer('0_floor'),
            terrain_layer:this.map.createLayer('1_terrain'),
            object_layer:this.map.createLayer('2_object'),
            roof_layer:this.map.createLayer('3_roof'),
            roofAdd_layer:this.map.createLayer('4_roof_add'),
            objects:this.map.createLayer('objects'),
            collision:this.map.createLayer('collision'),
            protection:this.map.createLayer('protection')
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