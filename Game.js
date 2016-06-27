MyGame.Game = function(game) {
	game.speed = 500;
	game.isRun = false;
	game.playerDirection = 1;
	game.playerDead = false;
	game.onFloor = false;
	game.change = 0;
	game.birdLive = false;
	game.score = 0;
	game.flycoinStamp=0; 
	game.flybirdStamp=0; 
	
	game.playerFly = false;
	game.emitter = null;

};

var self;

var changeConfig = {
	'cliff' : 20, 
	'coin' : 10,
	'bird' : 30
}

MyGame.Game.prototype = {
    create: function() {
    	self = this;
    	user.score = 0;
    	game.ua = navigator.userAgent.toLowerCase();	
    	game.bgMusic = game.add.audio('music');
    	game.getscoreMusic = game.add.audio('scoreMusic');
    	game.gameoverMusic = game.add.audio('gameoverMusic');
        
        
        game.stage.backgroundColor = '#8fd8fb';
        
        
        
        game.cloud = game.add.tileSprite(0,50,742,1057,'cloud').autoScroll(-30,0);
		
		
		game.cliffGroup = game.add.physicsGroup();
		game.hinderGroup = game.add.physicsGroup();
		
		for(var i=0;i<=1;i++)
		{
			game.cliff = game.add.tileSprite((game.world.width - 120) * i + 60,0,150,1227,'cliff');
			game.cliff.anchor.set(0.5,0);
			i == 0 ? game.cliff.scale.x = 1 : game.cliff.scale.x = -1;
			game.cliffGroup.add(game.cliff);
		}
		game.cliffGroup.forEach(function(i){
			i.body.immovable = true;
		})
		
		game.player = game.add.sprite(573.5,game.world.height/2 + 200,'player');
		game.player.animations.add('player');
		
		game.player.anchor.set(0.5);
		game.physics.enable([game.player],Phaser.Physics.ARCADE);
		
		
		game.cif = game.add.sprite(0,game.world.height,'cif');
		game.cif.anchor.set(0,1);
		game.physics.enable([game.cif],Phaser.Physics.ARCADE);
        
        game.cif.checkWorldBounds = true;
        game.cif.events.onOutOfBounds.add(function(){
        	game.cif.destroy()
        }, this);
        
        
        game.qiqiu = game.add.sprite(game.world.centerX,game.world.height - 10,'qiqiu');
        game.qiqiu.anchor.set(0.5,1);
        game.add.tween(game.qiqiu).to( { y: game.world.height - 20 }, 1000, "Linear", true,0,-1,true)
		game.scoreText = game.add.text(0, -100, '0',{font: "20px Microsoft YaHei", fill: '#000000',align:'center'});
        game.scoreText.anchor.set(0.5);
        game.qiqiu.addChild(game.scoreText);
        
        
        game.emitter = game.add.emitter();
	    game.emitter.makeParticles('corona',[0,1,2]);
		game.emitter.width = 80;
	    game.emitter.gravity = 2000;
	    game.emitter.setAlpha(0.5, 1);
	    game.emitter.setRotation(0, 0);
	    game.emitter.setScale(0.1,0.2,10,10);
	    game.emitter.start(false,1000,50);
        game.emitter.on = false;

	     
	    game.hitEmitter = game.add.emitter();
	    game.hitEmitter.setAlpha(1,0,1000);
	    game.hitEmitter.gravity = 0;
	    
	    
	    game.gameNumGroup = game.add.group();
	    
		game.input.onTap.add(this.playerJump, this);
		
		
		
		
		game.win = game.add.image(game.world.centerX,game.world.centerY,'lose-win')
		game.win.anchor.set(0.5);
		game.win.visible = false;
		
		game.shuoming = game.add.image(game.world.centerX,game.world.centerY,'shuoming');
		game.shuoming.anchor.set(0.5);
		game.startText = game.add.text(160, 480, '准备好了！点击屏幕开始',{font: "30px Microsoft YaHei", fill: '#000000',align:'right'});
		game.startText.anchor.set(0.5);
		game.add.tween(game.startText.scale).to( { x:1.1,y:1.1 }, 500, "Linear", true,0,-1,true);
		game.shuoming.addChild(game.startText);
		
		game.shuoming.inputEnabled = true;
        game.shuoming.events.onInputDown.add(function(){
        	
        	game.add.tween(game.shuoming).to( {alpha:0}, 1000, "Linear", true).onComplete.add(function(){
        		game.shuoming.destroy()
        		self.gamestart()
        	})

        }, this);
		
        //this.gamestart()

    },
    gamestart : function(){
    	game.isRun = true;
    	game.bgMusic.loopFull(1);
    	game.timer = game.time.events.loop(500, this.createHinder, this);
    	game.playerDead = false;
    	game.flycoinStamp = game.flybirdStamp = 0;
    	game.playerDirection = 1;
    	game.player.body.velocity.x = 200;
    	game.player.animations.play('player',10,true);
    	game.cliffGroup.forEach(function(o){
        	o.autoScroll(0,game.speed);
        });
    	game.cif.body.velocity.y = game.speed;
    },
    update: function(){
    	if(!game.isRun) return;
    	game.physics.arcade.collide(game.player, game.cliffGroup,function(){
    		game.onFloor = true;
    	}, null, this);
    	game.physics.arcade.overlap(game.player, game.hinderGroup,this.hitHinder, null, this);
    	
    	if(game.playerFly)
    	{
    		game.emitter.emitX = game.player.x;
    		game.emitter.emitY = game.player.y + game.player.height/2;
    		user.score+=2;
    	}
    	else
    	{
    		user.score++
    	}
		game.scoreText.setText(user.score)
	},
	playerJump : function(){
		if(game.onFloor && !game.playerFly && !game.playerDead)
		{
			game.playerDirection == 1 ? game.playerDirection = -1 : game.playerDirection = 1;
		   	game.player.body.velocity.x = 2000 * game.playerDirection;
		   	game.player.scale.x = game.playerDirection;
		   	game.onFloor = false;
		}
	},
	playerFly : function(){
		
		game.playerFly = true;
		game.birdLive = false;
		game.player.body.velocity.x = 0;
		game.player.scale.x = 1;
		
		
		game.hinderGroup.forEach(function(o){
			o.kill()
		})

		game.cliffGroup.forEach(function(o){
        	o.autoScroll(0,game.speed * 5);
        });
        
	    game.emitter.on = true;
	    
	    game.add.tween(game.player).to({x:game.world.centerX,y:game.world.centerY - 300},2000).to({x:550},2000).to({x:190,y:game.world.height/2 + 200},2000).to({x:574},2000).start().onComplete.add(function(){
	    	game.cliffGroup.forEach(function(o){
	        	o.autoScroll(0,game.speed);
	        });
	        game.playerFly = false;
	        game.onFloor = true;
	        game.emitter.on = false;
	        game.playerDirection = 1;
	        game.player.scale.x = game.playerDirection;
	        game.player.loadTexture('player', 0, false);
	        game.player.animations.play('player', 10, true);
	        game.flycoinStamp = game.flybirdStamp = 0;
	        game.gameNumGroup.forEach(function(o){
				o.kill();
			})
	    })
        
	},
	createHinder : function(){
		
		if(game.playerFly) return;
		
		game.change = Math.floor(Math.random()*100);

		if(game.change <= changeConfig.cliff) //山崖出现概率
		{
			var ran = game.rnd.integerInRange(0,1);
			game.hinder = game.add.sprite(ran == 0 ? 70 : 530,0,'object_'+ran+'');
			game.hinderGroup.add(game.hinder);
		}
		else if(game.change <= changeConfig.cliff +  changeConfig.coin)
		{
			game.coin = game.add.sprite(game.rnd.integerInRange(145,510),0,'coin');
			game.hinderGroup.add(game.coin);
		}
		else if(game.change <= changeConfig.cliff +  changeConfig.coin + changeConfig.bird)
		{
			
			if(!game.birdLive)
			{
				
				var birdRud = game.rnd.integerInRange(0,1);
				
				game.bird = game.add.sprite(birdRud == 0 ? 80 : 670,150,'bird');
				game.bird.anchor.set(0.5);
				
				birdRud == 0 ? game.bird.scale.x = 1 : game.bird.scale.x = -1;
				
				
				game.bird.animations.add('fly');
				game.bird.animations.play('fly', 10, true);
				game.bird.events.onOutOfBounds.add(function(){
					game.birdLive = false;
				}, this);
				game.hinderGroup.add(game.bird);
				game.time.events.add(Phaser.Timer.SECOND, function(){
					birdRud == 0 ? game.bird.body.velocity.x = 300 : game.bird.body.velocity.x = -300;
					game.bird.body.velocity.y = 450;
				}, this);
				game.birdLive = true;
			}
			
		}
		
		game.hinderGroup.forEach(function(o){
			if(o.key == 'object_0' || o.key == 'object_1' || o.key == 'coin')
			{
				o.body.velocity.y = game.speed;
			}
		})

		game.hinderGroup.setAll('checkWorldBounds',true);
		game.hinderGroup.setAll('outOfBoundsKill',true);

		
		//console.log(changeConfig.Cliff)
	},
	hitHinder : function(player,hinder){
		
		
		if(hinder.key == 'object_0' || hinder.key == 'object_1')
		{
			game.hitEmitter.makeParticles('corona',[2]);
			this.gameover();
		}
		else if(hinder.key == 'coin')
		{
			
			if (/iphone|ipad|ipod/.test(game.ua)) {
				    game.getscoreMusic.play()	
			}
			
			
			hinder.kill();
			
			game.flybirdStamp = 0;
			game.flycoinStamp++;
			if(game.flycoinStamp > 2)
			{
				game.player.loadTexture('player_superMan', 0);
			    game.player.animations.add('player_superMan');
			    game.player.animations.play('player_superMan', 10, true);
				this.playerFly();
			}
			
			game.hitEmitter.makeParticles('corona',[0]);
			
			this.getNum(hinder,game.flycoinStamp)
			
		}
		else if(hinder.key == 'bird')
		{
			if(!game.onFloor)
			{
				
				if (/iphone|ipad|ipod/.test(game.ua)) {
					    game.getscoreMusic.play()	
				}
				
				game.bird.kill();
				
				game.flycoinStamp = 0;
				game.flybirdStamp++;		
				if(game.flybirdStamp >2)
				{
					
					game.player.loadTexture('player_fly', 0);
				    game.player.animations.add('player_fly');
				    game.player.animations.play('player_fly', 10, true);
					
					this.playerFly();
				}
				this.getNum(hinder,game.flybirdStamp)
			}
			else
			{
				game.bird.kill();
				this.gameover();
			}
			game.hitEmitter.makeParticles('corona',[1]);
			game.birdLive = false;
		}
		
		game.hitEmitter.emitX = hinder.x + hinder.width / 2;
    	game.hitEmitter.emitY = hinder.y + hinder.height / 2;
	    game.hitEmitter.start(true,2000,0,40);
		
	},
	getNum : function(hinder,num){

		game.gameNumGroup.forEach(function(o){
			if(num!=3)
			{
				o.kill();
			}
		})
		
		if(hinder.key == 'coin')
		{
			this.addNum(hinder.key,num)
		}
		else
		{
			this.addNum(hinder.key,num)
		}
	},
	
	addNum : function(key,num){
		for(var i=0;i<num;i++)
		{
			game.num = game.gameNumGroup.create(50 + 80 * i ,game.world.height - 100,key);
			game.num.scale.x = game.num.scale.y = 0.5
		}
	},
	
	gameover : function(){
		game.isRun = false;
		game.bgMusic.destroy();
		game.gameoverMusic.play()
		
		game.playerDead = true;
		game.time.events.remove(game.timer);
		game.cliffGroup.forEach(function(o){
        	o.autoScroll(0,0);
        });
        game.hinderGroup.setAll('body.velocity.y', 0);
        game.player.body.velocity.x = - 200 * game.playerDirection;
        game.player.body.velocity.y = 0;
        game.player.body.gravity.y = 500;
        game.player.loadTexture('player_dead');
        
        if(user.score <= config.winScore)
        {
        	game.win.visible = true;
        	game.losetext = game.add.text(0,-200,'很遗憾！',{font: "60px Microsoft YaHei", fill: '#7f2702',align:'center'});
        	game.losetext2 = game.add.text(0,-80,'你只跑了 '+(user.score + 1)+' 米\n再接再厉哦！',{font: "40px Microsoft YaHei", fill: '#7f2702',align:'center'});
        	game.losetext2.lineSpacing = 20;
        	game.losetext2.anchor.set(0.5,0)
        	game.losetext.anchor.set(0.5,0)
        	game.win.addChild(game.losetext);
        	game.win.addChild(game.losetext2);
        	game.replayBtn = game.add.button(0,350,'replay-btn',function(){
        		
        		game.state.start('Game');
        		game.win.visible = false;
        	},this);
        	game.replayBtn.anchor.set(0.5,0)
        	game.win.addChild(game.replayBtn)
        }
        else
        {
        	document.getElementById('cover').style.display = 'block'
        }
        
		//game.isRun = false;
	},
	replayGame : function(){
		
	}
	
};

