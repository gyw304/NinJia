MyGame.MainMenu = function(game) {
	
};



MyGame.MainMenu.prototype = {
    create: function() {
    	
    	game.add.image(0,0,'MainMenu');
    	
    	game.title = game.add.image(game.world.centerX - 60,-800,'title');
    	game.title.anchor.set(0.5,0);
    	game.add.tween(game.title).to({y:90},500).to({y:70},500).start();
    	
    	game.titleCoin = game.add.image(520,390,'title_coin');
    	game.titleCoin.anchor.set(0.5);
    	game.add.tween(game.titleCoin).from({alpha:0},500,"Linear",true,1000)
    	game.add.tween(game.titleCoin.scale).to( { x:1.1,y:1.1 }, 500, "Linear", true,0,-1,true)
    	
    	
    	game.startBtn = game.add.button(10,640,'start-btn',function(){
    		game.state.start('Game')
    	},this);
    	game.add.tween(game.startBtn).from({x:-400},300,"Linear",true,1000)
    	
    	game.ruleBtn = game.add.button(200,820,'rule-btn',function(){
    		game.ruleBox.visible = true;
    	},this);
    	game.add.tween(game.ruleBtn).from({x:-400},300,"Linear",true,1100)
    	
    	
    	game.zjBtn = game.add.button(50,990,'zj-btn',function(){
    		game.win.visible = true;
    	},this);
    	game.add.tween(game.zjBtn).from({x:-400},300,"Linear",true,1200)
    	
    	
    	game.ruleBox = game.add.image(game.world.centerX,game.world.centerY,'rule-box');
    	game.ruleBox.anchor.set(0.5);
    	game.ruleBox.visible = false;
        game.ruleBox.inputEnabled = true;
        game.ruleBox.events.onInputDown.add(function(){
        	game.ruleBox.visible = false;
        }, this);
        
        game.win = game.add.image(game.world.centerX,game.world.centerY,'my-poilBox')
		game.win.anchor.set(0.5);
		game.win.visible = false;
		game.win.inputEnabled = true;
        game.win.events.onInputDown.add(function(){
        	game.win.visible = false;
        }, this);
        
        if(user.ispoil)
        {
        	game.poilText = game.add.text(0,-100,'恭喜你中了',{font: "40px Microsoft YaHei", fill: '#7f2702',align:'center'});
        	game.poilText2 = game.add.text(0,0,user.poil,{font: "50px Microsoft YaHei", fill: '#7f2702',align:'center'});
        	game.poilText.lineSpacing = 20;
        	game.poilText.anchor.set(0.5,0)
        	game.poilText2.anchor.set(0.5,0)
        	game.win.addChild(game.poilText);
        	game.win.addChild(game.poilText2);
        }
        else
        {
        	game.nopoilText = game.add.text(0,0,'您还没中奖，请再接再厉！',{font: "40px Microsoft YaHei", fill: '#7f2702',align:'center'});
        	game.nopoilText.anchor.set(0.5,0)
        	game.win.addChild(game.nopoilText);
        }
    	
    	
    	
		GameUI.cutscenes()
    },
    update: function(){
    	
	}
	
};

