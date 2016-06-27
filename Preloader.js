MyGame.Preloader = function(game){
};
MyGame.Preloader.prototype = {
    create:function(){
        this.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.add(this.loadComplete, this);
        this.text = this.add.text(this.world.width/2, this.world.height/2-50, '', { fill: '#fff' });
        this.text.anchor.set(0.5);
        this.start();
    },
    start:function(){
    	game.load.audio('music',''+config.baseUrl+'music.mp3');
    	game.load.audio('scoreMusic',''+config.baseUrl+'getscore.mp3');
    	game.load.audio('gameoverMusic',''+config.baseUrl+'gameover.mp3');
    	game.load.image('MainMenu',''+config.baseUrl+'MainMenu.jpg');
    	game.load.image('title',''+config.baseUrl+'title.png');
    	game.load.image('title_coin',''+config.baseUrl+'title_coin.png');
    	
    	game.load.image('start-btn',''+config.baseUrl+'start-btn.png');
    	game.load.image('rule-btn',''+config.baseUrl+'rule-btn.png');
    	game.load.image('zj-btn',''+config.baseUrl+'zj-btn.png');
    	game.load.image('rule-box',''+config.baseUrl+'rule-box.png');
    	
    	game.load.image('lose-win',''+config.baseUrl+'lose-win.png');
    	
    	game.load.image('shuoming',''+config.baseUrl+'shuoming.jpg');
    	
    	game.load.image('cliff',''+config.baseUrl+'cliff.jpg');
    	game.load.image('cif',''+config.baseUrl+'cif.png');
    	game.load.image('cloud',''+config.baseUrl+'cloud.png');
    	game.load.image('cloud',''+config.baseUrl+'cloud.png');
    	game.load.image('qiqiu',''+config.baseUrl+'qiqiu.png');
    	
    	game.load.image('object_0',''+config.baseUrl+'object_0.png');
    	game.load.image('object_1',''+config.baseUrl+'object_1.png');
    	game.load.image('coin',''+config.baseUrl+'coin.png');
    	
    	game.load.image('win',''+config.baseUrl+'win.png');
    	
    	game.load.image('my-poilBox',''+config.baseUrl+'my-poilBox.png');
    	
    	game.load.atlasJSONHash('player', ''+config.baseUrl+'player_json.png', ''+config.baseUrl+'player_json.json');
    	game.load.atlasJSONHash('player_superMan', ''+config.baseUrl+'playerSuperMan_json.png', ''+config.baseUrl+'playerSuperMan_json.json');
    	game.load.atlasJSONHash('player_fly', ''+config.baseUrl+'playerFly_json.png', ''+config.baseUrl+'playerFly_json.json');
    	game.load.atlasJSONHash('bird', ''+config.baseUrl+'bird_json.png', ''+config.baseUrl+'bird_json.json');
    	game.load.image('player_dead',''+config.baseUrl+'player_dead.png');
    	
    	game.load.spritesheet('corona', ''+config.baseUrl+'blue.png?1', 26, 26);
    	
    	game.load.image('replay-btn',''+config.baseUrl+'replay-btn.png')
    	
        this.load.start();
    },
    fileComplete:function(progress){
        this.text.setText( + progress + "%");
    },
    loadComplete:function(){
        this.state.start('MainMenu');
    }
};