var game;
var localStorageName = "doublelanegame";
var bgColors = [0x54c7fc, 0xffcd00, 0xff2851, 0x62bd18];
var catnips = ["catnipFake", "catnipSoso", "catnipGood", "catnipGold"];
var items = ["tunaCan","catnipBomb","milk"];
var score;
var catnipBombFlag;
var savedData;
var laneWidth = 238;
var lineWidth = 3;
var catTurnSpeed = 200;
var moveX;
var angelSide;
var targetGroup = [];
var targetDelay = 1300;
var targetSpeed = 180;
var targetSpeedCounter = 15;
var targetPool = [];
var healthBar;
var healthFlag;

window.onload = function() {
    var width = 720;
    var height = 1280;	
    var windowRatio = window.innerWidth / window.innerHeight;
    if(windowRatio < width / height){
        var height = width / windowRatio;
    }
game = new Phaser.Game(width, height, Phaser.AUTO, "");
    game.state.add("Boot", boot);
    game.state.add("Preload", preload); 
    game.state.add("TitleScreen", titleScreen);
    game.state.add("HowToPlayFirst", howToPlayFirst);
    game.state.add("HowToPlaySecond", howToPlaySecond);
    game.state.add("PlayGame", playGame);
    game.state.add("GameOverScreen", gameOverScreen);
    game.state.start("Boot");
}

var boot = function(game){};
boot.prototype = {
  	preload: function(){
        game.load.image("loading","assets/sprites/loading.png"); 
	},
  	create: function(){
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.state.start("Preload");
	}      
}

var preload = function(game){};
preload.prototype = {
	preload: function(){ 
        var loadingBar = this.add.sprite(game.width / 2, game.height / 2, "loading");
        loadingBar.anchor.setTo(0.5);
        game.load.setPreloadSprite(loadingBar);
        game.load.image("title", "assets/sprites/title.png");
        game.load.image("playbutton", "assets/sprites/playbutton.png");
        game.load.image("backsplash", "assets/sprites/backsplash.png");
        game.load.image("target", "assets/sprites/target.png");
        game.load.image("particle", "assets/sprites/particle.png");
        game.load.image("leftArrow", "assets/sprites/left-arrow.png");
        game.load.image("rightArrow", "assets/sprites/right-arrow.png");
        
        game.load.image("fishCat", "assets/sprites/cat/FishCat_front.png");
        game.load.image("nyangGates", "assets/sprites/cat/NyangGates_front.png");
        game.load.image("rapidCat", "assets/sprites/cat/RapidCat_front.png");
        game.load.image("strongCat", "assets/sprites/cat/StrongCat_front.png");
        
        game.load.image("catnipFake", "assets/sprites/Catnip/Catnip_Fake.png");
        game.load.image("catnipGold", "assets/sprites/Catnip/Catnip_Gold.png");
        game.load.image("catnipGood", "assets/sprites/Catnip/Catnip_Good.png");
        game.load.image("catnipSoso", "assets/sprites/Catnip/Catnip_Soso.png");
        
        game.load.image("tunaCan", "assets/sprites/Item/Item_TunaCan.png");
        game.load.image("catnipBomb", "assets/sprites/Item/Item_CatnipBomb.png");
        game.load.image("milk", "assets/sprites/Item/Item_Milk.png");

        game.load.image("class1", "assets/sprites/Class/Class1.png");
        game.load.image("class2", "assets/sprites/Class/Class2.png");
        game.load.image("class3", "assets/sprites/Class/Class3.png");
        game.load.image("class4", "assets/sprites/Class/Class4.png");
        game.load.image("class5", "assets/sprites/Class/Class5.png");

        game.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");
        },
  	create: function(){
		game.state.start("TitleScreen");
	}
}

var titleScreen = function(game){};
titleScreen.prototype = {  
     create: function(){  
        savedData = localStorage.getItem(localStorageName)==null?{score:0}:JSON.parse(localStorage.getItem(localStorageName)); 
        var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "backsplash");
        titleBG.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];
        document.body.style.background = "#" + titleBG.tint.toString(16);
        var title = game.add.image(game.width / 2, 160, "title");
        title.anchor.set(0.5);
        
        game.add.text(game.width / 2, 300 , "위에 타이틀 이미지 삽입하기", {font: "30px DungGeunMo", fill: "#ffffff"}).anchor.x = 0.5;
        game.add.text(game.width / 2, 400 , "최고 점수", {font: "90px DungGeunMo", fill: "#ffffff"}).anchor.x = 0.5;
        game.add.text(game.width / 2, 500 , savedData.score.toString(), {font: "120px DungGeunMo", fill: "#ffffff"}).anchor.x = 0.5;
        
        game.add.text(game.width / 2, game.height - 300, "게임 시작", {font: "35px DungGeunMo", fill: "#ffffff"}).anchor.x = 0.5;
        var playButton = game.add.button(game.width / 2, game.height - 150, "playbutton", this.startGame);
        playButton.anchor.set(0.5);
        var tween = game.add.tween(playButton).to({
            width: 220,
            height: 220
        }, 1500, "Linear", true, 0, -1);
        tween.yoyo(true);

        
        game.add.text(game.width / 6, game.height - 300, "튜토리얼", {font: "35px DungGeunMo", fill: "#ffffff"}).anchor.x = 0.5;
        var skipButton = game.add.button(game.width/6, game.height - 150, "playbutton", this.readNextTutoral);
        skipButton.anchor.set(0.5);
        var tween = game.add.tween(skipButton).to({
            width: 220,
            height: 220
        }, 1500, "Linear", true, 0, -1); 
        tween.yoyo(true);
       
     },
     startGame: function(){
        game.state.start("PlayGame");
     },

     readNextTutoral: function(){  
        game.state.start("HowToPlayFirst");              
     }
}

var howToPlayFirst = function(game){};
howToPlayFirst.prototype = {  
    create: function(){  
        var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "backsplash");
        titleBG.scale.setTo(1.12, 1.12);
        var tintColor = bgColors[game.rnd.between(0, bgColors.length - 1)];
        titleBG.tint = tintColor;
        document.body.style.background = "#"+titleBG.tint.toString(16);
        
        game.add.text(game.width / 2, 70 , "길을 변경하세요!!", {font: "60px DungGeunMo", fill: "#ffffff"}).anchor.x = 0.5;
        game.add.text(game.width / 2, 170 , "화살표를 터치해서 좌우로 이동하세요!!", {font: "35px DungGeunMo", fill: "#ffffff"}).anchor.x = 0.5;
        
        var cat = game.add.sprite(game.width / 2 + 50, 250, "fishCat");
        cat.scale.set(0.4);
        var catTween = game.add.tween(cat).to({
            x: game.width / 2 - 100
        },1000, "Linear", true, 0, -1); 
        catTween.yoyo(true); 
        
        leftArrow = game.add.sprite(80, 250, "leftArrow");
        leftArrow.scale.setTo(0.3, 0.3);
        
        rightArrow = game.add.sprite(570, 250, "rightArrow");
        rightArrow.scale.setTo(0.3, 0.3);

        game.add.text(game.width / 2, 450 , "캣닢을 획득하세요!!", {font: "60px DungGeunMo", fill: "#ffffff"}).anchor.x = 0.5;
        game.add.text(game.width / 2, 550 , "캣닢을 획득해 다양한 효과를 얻어보세요!!", {font: "30px DungGeunMo", fill: "#ffffff"}).anchor.x = 0.5;

        var catnipSoso = game.add.sprite((game.width/11), 610, "catnipSoso");
        game.add.text((game.width/11)*3, 630 , "일반 캣닢: +1점", {font: "40px DungGeunMo", fill: "#ffffff"});
        
        var catnipGood = game.add.sprite((game.width/11), 715, "catnipGood");
        game.add.text((game.width/11)*3, 740 , "고급 캣닢: +3점", {font: "40px DungGeunMo", fill: "#ffffff"});
        
        var catnipGold = game.add.sprite((game.width/11), 825, "catnipGold");
        game.add.text((game.width/11)*3, 850 , "황금 캣닢: +5점", {font: "40px DungGeunMo", fill: "#ffffff"});
        game.add.text((game.width/11)*3, 900 , "(특정 고양이에서만 출현)", {font: "30px DungGeunMo", fill: "#ffffff"});
        
        var catnipFake = game.add.sprite((game.width/11), 935, "catnipFake");
        game.add.text((game.width/11)*3, 960 , "가짜 캣닢: -2점", {font: "40px DungGeunMo", fill: "#ffffff"});

        var playButton = game.add.button(game.width / 2, game.height - 150, "playbutton", this.startGame);
        playButton.anchor.set(0.5);
        
        var tween = game.add.tween(playButton).to({
            width: 220,
            height:220
        }, 1500, "Linear", true, 0, -1); 
        tween.yoyo(true);     
    },
    startGame: function(){
        game.state.start("HowToPlaySecond");            
    },
    readNextTutoral: function(){
        game.state.start("HowToPlaySecond");   
    },
}

var howToPlaySecond = function(game){};
howToPlaySecond.prototype = {
    create: function(){
        var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "backsplash");
        titleBG.scale.setTo(1.12, 1.12);
        var tintColor = bgColors[game.rnd.between(0, bgColors.length - 1)];
        titleBG.tint = tintColor;
        var pickedColors = [tintColor];
        
        game.add.text(game.width / 2, 70 , "계급을 올려보세요!!", {font: "60px DungGeunMo", fill: "#ffffff"}).anchor.x = 0.5;
        game.add.text(game.width / 2, 170 , "특정 점수에 도달하면 계급이 올라갑니다!!", {font: "30px DungGeunMo", fill: "#ffffff"}).anchor.x = 0.5;
        
        var class1 = game.add.sprite((game.width/11)*2, 225, "class1");
        var class2 = game.add.sprite((game.width/11)*2, 280, "class2");
        var class3 = game.add.sprite((game.width/11)*2, 330, "class3");
        var class4 = game.add.sprite((game.width/2), 225, "class4");
        class4.scale.set(1.25);
        var class5 = game.add.sprite((game.width/2), 305, "class5");
        class5.scale.set(1.45);

        game.add.text(game.width / 2, 400 , "고양이를 해금하세요!!", {font: "60px DungGeunMo", fill: "#ffffff"}).anchor.x = 0.5;
        game.add.text(game.width / 2, 480 , "특정 조건을 만족하면 고양이가 열립니다!!", {font: "27px DungGeunMo", fill: "#ffffff"}).anchor.x = 0.5;
        game.add.text(game.width / 2, 510 , "고양이마다 특수 능력을 가지고 있습니다!!", {font: "27px DungGeunMo", fill: "#ffffff"}).anchor.x = 0.5;
        
        var nyangGates = game.add.sprite((game.width/9), 580, "nyangGates");
        nyangGates.scale.set(0.5);
        game.add.text(game.width/8, 780, "냥게이츠", {font: "30px DungGeunMo", fill: "#ffffff"});
        
        var strongCat = game.add.sprite((game.width/10)*4, 580, "strongCat");
        strongCat.scale.set(0.5);
        game.add.text((game.width/12)*5, 780, "튼튼하냥", {font: "30px DungGeunMo", fill: "#ffffff"});

        var rapidCat = game.add.sprite((game.width/10)*7, 580, "rapidCat");
        rapidCat.scale.set(0.5);
        game.add.text((game.width/10)*7, 780, "재빠르냥", {font: "30px DungGeunMo", fill: "#ffffff"});
        
        game.add.text(game.width/2, 850,"특수 아이템을 획득해보세요!!", {font: "45px DungGeunMo", fill: "#ffffff"}).anchor.x = 0.5;

        var milk = game.add.sprite(50, 930, "milk");
        milk.scale.set(0.8);
        game.add.text(140, 930, "체력\n회복", {font: "30px DungGeunMo", fill: "#ffffff"});
        
        var tunaCan = game.add.sprite(275, 930, "tunaCan");
        tunaCan.scale.set(0.8);
        game.add.text(375, 930, "속도\n증가", {font: "30px DungGeunMo", fill: "#ffffff"});

        var catnipBomb = game.add.sprite(475, 920, "catnipBomb");
        catnipBomb.scale.set(0.8);
        game.add.text(575, 920, "캣닢\n생성률\n증가", {font: "30px DungGeunMo", fill: "#ffffff"});
        


        var playButton = game.add.button(game.width / 2, game.height - 150, "playbutton", this.startGame);
        playButton.anchor.set(0.5);

        var tween = game.add.tween(playButton).to({
            width: 220,
            height:220
        }, 1500, "Linear", true, 0, -1); 
        tween.yoyo(true); 
    },
    startGame: function(){
        game.state.start("PlayGame");  
    },
    readPrevTutoral: function(){
        game.state.start("HowToPlayFirst");   
    }
}

var playGame = function(game){};
playGame.prototype = {  
    create: function(){    
        score = 0;
        healthFlag = 100;
        targetPool = [];
        targetPool.length = 0;
        savedData = localStorage.getItem(localStorageName)==null?{score:0}:JSON.parse(localStorage.getItem(localStorageName));
        var tintColor = bgColors[game.rnd.between(0, bgColors.length - 1)];
        document.body.style.background = "#"+tintColor.toString(16);
        var pickedColors = [tintColor];
        this.roadWidth = laneWidth * 3 + lineWidth * 2;
        var leftLine = game.add.tileSprite(laneWidth, 0, lineWidth, game.height, "particle");
        leftLine.tint = tintColor;
        var rightLine = game.add.tileSprite(laneWidth*2 + lineWidth, 0, lineWidth, game.height, "particle");
        rightLine.tint = tintColor;
        this.catGroup = game.add.group();
        this.targetGroup = game.add.group();
        this.scoreText = game.add.bitmapText(game.width / 2, 40 , "font", "0", 120)
        this.scoreText.anchor.x = 0.5;

        healthBar = new HealthBar(this.game, {x: game.width / 2 , y: 20});
        healthBar.setBarColor("#ffffff");
        
        var timer = setInterval(function(){
            healthBar.setPercent(healthFlag);
            healthFlag--;
            if(healthFlag < 0){
                clearInterval(timer);
            }
        }, 1000);

        leftArrow = game.add.sprite(80, game.height - 100, "leftArrow");
        leftArrow.scale.setTo(0.3, 0.3);
        
        rightArrow = game.add.sprite(570, game.height - 100, "rightArrow");
        rightArrow.scale.setTo(0.3, 0.3);
        
        cat = game.add.sprite(0, game.height - 180, "fishCat");
        cat.scale.set(0.6);
        cat.positions = [laneWidth/2 + lineWidth, laneWidth + laneWidth/2 + lineWidth, laneWidth*2 + laneWidth/2 + lineWidth];
        cat.anchor.set(0.5);
        cat.canMove = true;
        cat.side = 1;
        cat.x = cat.positions[cat.side];
        game.physics.enable(cat, Phaser.Physics.ARCADE); 
        cat.body.allowRotation = false;
        cat.body.moves = false;  
        cat.smokeEmitter = game.add.emitter(cat.x, cat.y + cat.height / 2 + 2, 20);
        cat.smokeEmitter.makeParticles("particle");
        cat.smokeEmitter.setXSpeed(-15, 15);
        cat.smokeEmitter.setYSpeed(50, 150);
        cat.smokeEmitter.setAlpha(0.2, 0.5);
        cat.smokeEmitter.start(false, 500, 20);
        this.catGroup.add(cat);
        
        this.targetLoop = game.time.events.loop(targetDelay, function(){
            for(var i = 0; i < 1; i++){   
                if(targetPool.length == 0){
                    var objectPercentage = game.rnd.between(0,10)
                    var attr;
                    if((objectPercentage >= 0) && (objectPercentage < 3)){
                        var itemPercentage = game.rnd.between(0,2);
                        if(itemPercentage == 0){
                            attr = items[2];
                        }
                        else if(itemPercentage == 1){
                            attr = items[0];
                        }
                        else{

                        }
                    }
                    else{    
                        var catnipPercentage = game.rnd.between(0,999);
                        if((catnipPercentage >= 0) && (catnipPercentage <= 100)){
                            attr = catnips[2];
                        }
                        else if((catnipPercentage >= 101) && (catnipPercentage <= 600)){
                            attr = catnips[1];
                        }
                        else if((catnipPercentage >= 601) && (catnipPercentage <= 900)){
                            attr = catnips[0];
                        }
                        else{
                            attr = catnips[3];
                        }
                    }
                    var target = new Target(game, attr);
                    target.scale.setTo(1.5, 1.5);
                    game.add.existing(target);
                    this.targetGroup.add(target);
                }
                else{
                    var target = targetPool.pop();
                    target.prepareToRevive();
                }
            }
        }, this);
        this.scoreLoop = game.time.events.loop(250, function(){
            this.scoreText.text = score.toString(); 
        }, this);

        game.input.onDown.add(this.movecat, this);
    },

    movecat: function(e){  
        if(cat.canMove){
            cat.canMove = false;
            moveX = game.input.x;

            if((moveX >= 0) && (moveX <= laneWidth)){
                if(cat.side > 0){
                    cat.side--;
                    angelSide = 1;
                }
            }
            else if((moveX >=  (laneWidth*2 + lineWidth)) && (moveX <= (laneWidth*3 + lineWidth*2 ))){
                if(cat.side < 2){
                    cat.side++;
                    angelSide = 0;
                }
            }
            else{
                angelSide = 0.5;
            }

            var steerTween = game.add.tween(cat).to({
                angle: 30 - 60 * angelSide
            }, catTurnSpeed / 2, Phaser.Easing.Linear.None, true);
            
            steerTween.onComplete.add(function(){
                var steerTween = game.add.tween(cat).to({
                    angle: 0
                }, catTurnSpeed / 2, Phaser.Easing.Linear.None, true);
            })

            var moveTween = game.add.tween(cat).to({ 
                x: cat.positions[cat.side],
            }, catTurnSpeed, Phaser.Easing.Linear.None, true);
            
            moveTween.onComplete.add(function(){
                cat.canMove = true;
            })
        }
    },

    update: function(e){
        cat.smokeEmitter.x = cat.x;
        game.physics.arcade.collide(this.catGroup, this.targetGroup, function(c, t){
            if(t.attr == catnips[0]){
                t.destroy();
                score -= 2;
            }
            else if(t.attr == catnips[1]){
                t.destroy();
                score += 1;
            }
            else if(t.attr == catnips[2]){
                t.destroy();
                score += 3;
            }
            else if(t.attr == catnips[3]){
                t.destroy();
                score += 5;
            }
            else if(t.attr == items[0]){
                t.destroy();
                var timer = setInterval(function(){
                    targetSpeed = 230;
                    targetGroup.forEach(function(target) {
                        target.body.velocity.y = targetSpeed*(1.5);
                    });
                    targetSpeedCounter--;
                    if(targetSpeedCounter == 0){
                        targetSpeed = 180;
                        clearInterval(timer);
                    }
                }, 2000);
            }
            else if(t.attr == items[1]){
                t.destroy();
            }
            else if(t.attr == items[2]){
                t.destroy();
                healthFlag += 40;
                if(healthFlag > 100){
                    healthFlag = 100;
                }
            }
        }, null, this);
        if(healthFlag < 0){
            this.timeOver(cat);
        }
    },

    timeOver: function(c){
        c.smokeEmitter.on = false;
        game.time.events.remove(this.targetLoop);
        game.time.events.remove(this.scoreLoop);
        game.tweens.removeAll();
        for(var i = 0; i < this.targetGroup.length; i++){
            this.targetGroup.getChildAt(i).body.velocity.y = 0;     
        }
        game.input.onDown.remove(this.movecat, this);
        
        var explosionEmitter = game.add.emitter(c.x, c.y, 200);
        explosionEmitter.makeParticles("particle");
        explosionEmitter.gravity = 0;
        explosionEmitter.setAlpha(0.2, 1);
        explosionEmitter.minParticleScale = 0.2;
        explosionEmitter.maxParticleScale = 1;
        explosionEmitter.start(true, 2000, null, 200);  
        explosionEmitter.forEach(function(p){
            p.tint = c.tint;
        });

        c.destroy();
        game.time.events.add(Phaser.Timer.SECOND * 3, function(){
            game.state.start("GameOverScreen");
        }, this);
   }
}

var gameOverScreen = function(game){};
gameOverScreen.prototype = {
     create: function(){  
        var bestScore = Math.max(score, savedData.score);
        var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "backsplash");
        titleBG.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];
        document.body.style.background = "#"+titleBG.tint.toString(16);
        game.add.bitmapText(game.width / 2, 50 , "font", "Your score", 90).anchor.x = 0.5;
        game.add.bitmapText(game.width / 2, 150 , "font", score.toString(), 120).anchor.x = 0.5;
        game.add.bitmapText(game.width / 2, 350 , "font", "Best score", 90).anchor.x = 0.5;
        game.add.bitmapText(game.width / 2, 450 , "font", bestScore.toString(), 120).anchor.x = 0.5;
        localStorage.setItem(localStorageName,JSON.stringify({
            score: bestScore
        }));
    
        var playButton = game.add.button(game.width / 2, game.height - 150, "playbutton", this.startGame);
        playButton.anchor.set(0.5);
        var tween = game.add.tween(playButton).to({
            width: 220,
            height:220
        }, 1500, "Linear", true, 0, -1); 
        tween.yoyo(true);
    },
    startGame: function(){
        game.state.start("PlayGame");     
    }   
}

Target = function (game, attr) {     
    var position = game.rnd.between(0, 2);
    Phaser.Sprite.call(this, game, cat.positions[position], -20, attr);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.attr = attr;
    this.anchor.set(0.5);
    this.body.velocity.y = targetSpeed*(1.5);
};

Target.prototype = Object.create(Phaser.Sprite.prototype);
Target.prototype.constructor = Target;

Target.prototype.update = function() {
    if(this.alive && this.y > game.height + this.height/2){
        if(this.mustPickUp){
            this.missed.dispatch(this);
        }
        this.prepareToDie();
    }
};

Target.prototype.prepareToDie = function(){
    this.kill();
    targetPool.push(this);
    console.log("target killed. Targets in the pool: " + targetPool.length)
}

Target.prototype.prepareToRevive = function(){
    var position = game.rnd.between(0, 2);
    this.reset(cat.positions[position], -20);
    this.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];
    this.body.velocity.y = targetSpeed*(1.5);
    console.log("target revived. Targets in the pool: " + targetPool.length)
}
