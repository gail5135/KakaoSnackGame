var game;
var localStorageName = "doublelanegame";
var bgColors = [0x54c7fc, 0xffcd00, 0xff2851, 0x62bd18];
var catnips = ["catnipFake", "catnipSoso", "catnipGood", "catnipGold"];
var items = ["tunaCan","catnipBomb","milk"];
var score;
var catnipBombFlag;
var laneWidth = 238;
var lineWidth = 3;
var catTurnSpeed = 200;
var moveX;
var angelSide;
var targetGroup = [];
var targetDelay = 600;
var targetSpeed;
var targetSpeedCounter = 15;
var targetPool = [];

var unlockFlagArray = [0, 0, 0];

// added
var httpRequest;
var hpValue;
var healthFlag;
var ranking = [];
var selectedCat;

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
    game.state.add("Prologue", prologue);
    game.state.add("TitleScreen", titleScreen);
    game.state.add("HowToPlayFirst", howToPlayFirst);
    game.state.add("HowToPlaySecond", howToPlaySecond);
    game.state.add("SelectPage", selectPage);
    game.state.add("PlayGame", playGame);
    game.state.add("UnlockScreen", unlockScreen);
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
        this.makeRequest();
        // this.sendRequest();
	},
    makeRequest: function () {
        httpRequest = new XMLHttpRequest();
        if(!httpRequest) {
            alert('Not Connected!');
            return false;
        }
    }
}

var preload = function(game){};
preload.prototype = {
	preload: function(){
        this.sendRequest();
        var loadingBar = this.add.sprite(game.width / 2, game.height / 2, "loading");
        loadingBar.anchor.setTo(0.5);
        game.load.setPreloadSprite(loadingBar);
        
        game.load.spritesheet("prologues", "assets/sprites/prologue_sprites.png", 720, 1280, 4);
        // game.load.image("background", "assets/sprites/background/Background_Sprites.png");
        game.load.spritesheet("background", "assets/sprites/background/Background_Sprites.png", 720, 1280, 4);

        game.load.image("tutorialFirst", "assets/sprites/tutorial/tutorialFirst.png");
        game.load.image("tutorialSecond", "assets/sprites/tutorial/turorialSecond.png");
        game.load.audio("buttonSound", ["assets/sounds/ButtonSound.mp3"]);
        game.load.audio("itemSound", ["assets/sounds/ItemSound.mp3"]);
        game.load.audio("bgm", ["assets/sounds/BGM.mp3"]);
        game.load.audio("gameOver", ["assets/sounds/GameOver.wav"]);

        game.load.image("pauseButton", "assets/sprites/Pause/Pause_Button.png");
        game.load.image("pausePannel", "assets/sprites/Pause/Pause_Pannel.png");

        game.load.image("particle", "assets/sprites/particle.png");
        game.load.image("leftButton", "assets/sprites/GameButton/Left_Normal.png");
        game.load.image("rightButton", "assets/sprites/GameButton/Right_Normal.png");
        game.load.image("bgmIcon", "assets/sprites/GameButton/Bgm_On.png");

        game.load.image("fishCat", "assets/sprites/cat/FishCat_front.png");
        game.load.image("nyangGates", "assets/sprites/cat/NyangGates_front.png");
        game.load.image("rapidCat", "assets/sprites/cat/RapidCat_front.png");
        game.load.image("strongCat", "assets/sprites/cat/StrongCat_front.png");

        game.load.image("fishCat_back", "assets/sprites/cat/FishCat_back.png");
        game.load.image("nyangGates_back", "assets/sprites/cat/NyangGates_back.png");
        game.load.image("rapidCat_back", "assets/sprites/cat/RapidCat_back.png");
        game.load.image("strongCat_back", "assets/sprites/cat/StrongCat_back.png");

        game.load.image("catnipFake", "assets/sprites/Catnip/Catnip_Fake.png");
        game.load.image("catnipGold", "assets/sprites/Catnip/Catnip_Gold.png");
        game.load.image("catnipGood", "assets/sprites/Catnip/Catnip_Good.png");
        game.load.image("catnipSoso", "assets/sprites/Catnip/Catnip_Soso.png");

        game.load.image("tunaCan", "assets/sprites/Item/Item_TunaCan.png");
        game.load.image("catnipBomb", "assets/sprites/Item/Item_CatnipBomb.png");
        game.load.image("milk", "assets/sprites/Item/Item_Milk.png");

        game.load.spritesheet("classSet", "assets/sprites/Class/Class.png", 180, 40, 5);

        game.load.spritesheet("prologues", "assets/sprites/prologue_sprites.png", 720, 1280, 4);
        game.load.image("mainImage", "assets/sprites/main.png");
        game.load.image("scoreImage", "assets/sprites/score.png");

        game.load.spritesheet("selectFishCat", "assets/sprites/Choice/Select_FishCat.png", 720, 1280, 1);
        game.load.spritesheet("selectNyangGates", "assets/sprites/Choice/Select_NyangGates.png", 720, 1280, 2);
        game.load.spritesheet("selectRapidCat", "assets/sprites/Choice/Select_RapidCat.png", 720, 1280, 2);
        game.load.spritesheet("selectStrongCat", "assets/sprites/Choice/Select_StrongCat.png", 720, 1280, 2);
        game.load.spritesheet("select", "assets/sprites/Choice/Select.png", 593, 174, 2);
        game.load.image("selectCursor", "assets/sprites/Choice/SelectCursor.png");
        game.load.image("rankingBox", "assets/sprites/ranking.png");
        game.load.image("retryButton", "assets/sprites/Retry.png");
        game.load.image("hpBar", "assets/sprites/hpBar.png");

        game.load.image("unlockPopUp_NyangGates", "assets/sprites/Unlock/UnlockPopUp_NyangGates.png");
        game.load.image("unlockPopUp_RapidCat", "assets/sprites/Unlock/UnlockPopUp_RapidCat.png");
        game.load.image("unlockPopUp_StrongCat", "assets/sprites/Unlock/UnlockPopUp_StrongCat.png");
        game.load.spritesheet("unlockPopUp", "assets/sprites/Unlock/UnlockPopUp.png", 510, 570, 3);

        game.load.spritesheet("catBack", "assets/sprites/cat/CatBackSet.png", 265, 384, 4);

        game.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");
        game.load.bitmapFont("DungGeunMo", "assets/fonts/DungGeunMo.png", "assets/fonts/DungGeunMo.fnt");
    },
  	create: function(){
		game.state.start("Prologue");
	},
    sendRequest: function () {
        httpRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                data.forEach(function(e){
                    ranking.push(e.best_score);
                });
            }
        }
        httpRequest.open('POST', '/getRanking');
        httpRequest.send();
    }
};

var prologue = function(game){};
prologue.prototype = {
    create: function() {
        var sprite = game.add.sprite(game.width / 2, game.height / 2, 'prologues');
        sprite.anchor.set(0.5);

        sprite.inputEnabled = true;

        sprite.events.onInputDown.add(function() {
            if(sprite.frame > 2) {
                game.state.start("TitleScreen");
            } else {
                sprite.frame++;
            }
        }, this);
    }
}

var titleScreen = function(game){};
titleScreen.prototype = {
    create: function(){
        // added
        var image = game.add.sprite(0, 0, 'mainImage');
        var image = game.add.sprite(94, 805, 'scoreImage');
        var buttonSound = game.add.audio("buttonSound");
        
        var startBt = game.add.graphics(0, 0);
        startBt.beginFill(0x000000, 0);
        startBt.drawRect(63, 1016, 567, 138);
        startBt.endFill();
        startBt.inputEnabled = true;
        startBt.input.useHandCursor = true;
        startBt.events.onInputUp.add(function(){
            buttonSound.play();
            this.startGame();
        }, this);
        

        var tutoBt = game.add.graphics(0, 0);
        tutoBt.beginFill(0xff0000, 0);
        tutoBt.drawCircle(77, 166, 100);
        tutoBt.endFill();
        tutoBt.inputEnabled = true;
        tutoBt.input.useHandCursor = true;
        tutoBt.events.onInputUp.add(function(){
            buttonSound.play();
            this.readNextTutoral();
        }, this);


        var bgmIcon = game.add.sprite(game.width/2, game.height/2, "bgmIcon");
        bgmIcon.scale.set(0.15);
        var muteBt = game.add.graphics(0, 0);
        muteBt.beginFill(0x000000, 0);
        muteBt.drawCircle(638, 170, 100);
        muteBt.endFill();
        muteBt.inputEnabled = true;
        muteBt.input.useHandCursor = true;
        muteBt.events.onInputUp.add(function(){
            buttonSound.play();
            game.sound.mute = !game.sound.mute;
            if(game.sound.mute){
                bgmIcon.visible = false;
            }
            else{
                bgmIcon.visible = true;
            }
        }, this);

        var scoreBox = new Phaser.Rectangle(155, 857, 381, 64);
        var scoreText = game.add.bitmapText(0, 0 , "DungGeunMo", user_info.best_score.toString(), 95);
        scoreText.alignIn(scoreBox, Phaser.CENTER, 0, 0);
        scoreText.tint = 0x000000;

     },
     startGame: function(){
        game.state.start("SelectPage");
     },

     readNextTutoral: function(){
        game.state.start("HowToPlayFirst");
     }
}

var howToPlayFirst = function(game){};
howToPlayFirst.prototype = {
    create: function(){
        game.add.sprite(0, 0, "tutorialFirst");       

        var cat = game.add.sprite(game.width / 2 + 50, 250, "fishCat");
        cat.scale.set(0.4);
        var catTween = game.add.tween(cat).to({
            x: game.width / 2 - 100
        },1000, "Linear", true, 0, -1);
        catTween.yoyo(true);

        var nextButton = game.add.button(game.width / 2, game.height - 150, "selectCursor", this.startGame);
        nextButton.anchor.set(0.5);
        nextButton.onDownSound = game.add.audio("buttonSound");

        var tween = game.add.tween(nextButton).to({
            width: 150,
            height:150
        }, 750, "Linear", true, 0, -1);
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
        game.add.sprite(0, 0, "tutorialSecond");

        var prevButton = game.add.button(game.width/3, game.height - 150, "selectCursor", this.readPrevTutoral);
        prevButton.anchor.set(0.5);
        prevButton.scale.x *= -1;
        prevButton.onDownSound = game.add.audio("buttonSound");

        var nextButton = game.add.button((game.width/3)*2, game.height - 150, "selectCursor", this.startGame);
        nextButton.anchor.set(0.5);
        nextButton.onDownSound = game.add.audio("buttonSound");
        
        var prevButton = game.add.tween(prevButton).to({
            width: -150,
            height:150
        }, 750, "Linear", true, 0, -1);
        prevButton.yoyo(true);
        
        var nextButton = game.add.tween(nextButton).to({
            width: 150,
            height:150
        }, 750, "Linear", true, 0, -1);
        nextButton.yoyo(true);
    },
    startGame: function(){
        game.state.start("SelectPage");
    },
    readPrevTutoral: function(){
        game.state.start("HowToPlayFirst");
    }
}

var selectPage = function(game){};
selectPage.prototype = {
    create: function(){
        var fishCat = game.add.sprite(0, 0, 'selectFishCat');
        var rapidCat = game.add.sprite(0, 0, 'selectRapidCat', user_info.lock_1);
        var strongCat = game.add.sprite(0, 0, 'selectStrongCat', user_info.lock_2);
        var nyangGates = game.add.sprite(0, 0, 'selectNyangGates', user_info.lock_3);

        var frames = [fishCat, rapidCat, strongCat, nyangGates];
        var startEnable = [1, user_info.lock_1, user_info.lock_2, user_info.lock_3];
        var frame = 0;
        selectedCat = frame;

        frames.forEach(function(element){
            element.visible = false;
        });
        frames[frame].visible = true;

        var select = game.add.sprite(78, 1083, "select", startEnable[frame]);

        var left_bt = game.add.sprite(134, 562, 'selectCursor');
        var right_bt = game.add.sprite(592, 562, 'selectCursor');
        left_bt.scale.x *= -1;

        left_bt.inputEnabled = true;
        left_bt.events.onInputDown.add(function(){
            game.add.audio("buttonSound").play();
            frames[frame].visible = !frames[frame].visible;
            if(frame === 0){
                frame = frames.length-1;
            } else {
                frame--;
            }
            selectedCat = frame;
            frames[frame].visible = !frames[frame].visible;
            select.frame = startEnable[frame];
        }, this);

        right_bt.inputEnabled = true;
        right_bt.events.onInputDown.add(function(){
            game.add.audio("buttonSound").play();
            frames[frame].visible = !frames[frame].visible;
            if(frame === frames.length-1){
                frame = 0;
            } else {
                frame++;
            }
            selectedCat = frame;
            frames[frame].visible = !frames[frame].visible;
            select.frame = startEnable[frame];
        }, this);

        select.inputEnabled = true;
        select.events.onInputDown.add(function(){
            game.add.audio("buttonSound").play();
            if(startEnable[frame] === 1){
                game.state.start("PlayGame");
            }
        }, this);

    },
}

var playGame = function(game){};
playGame.prototype = {
    create: function(){
        // Initialize
        score = 0;
        healthFlag = 1;
        targetSpeed = 1200;

        // ItemPool        
        targetPool = [];
        targetPool.length = 0;

        // Loading Backgounds & BGM
        bgm = game.add.audio("bgm");
        bgm.play();
        background = game.add.tileSprite(0, 0, 720, 1280, "background");
        
        
        // Pause Button
        pauseButton = game.add.button(game.width-100, 0, "pauseButton", this.pause);
        pauseButton.onDownSound = game.add.audio("buttonSound");
        
        // Draw Road
        this.roadWidth = laneWidth * 3 + lineWidth * 2;

        // Add objects
        this.catGroup = game.add.group();
        this.targetGroup = game.add.group();
        this.scoreText = game.add.bitmapText(110, 0, "DungGeunMo", "0", 90);
        
        
        // HP Configuration
        var hpBoxBg = game.add.graphics(200, 120);
        hpBoxBg.beginFill(0x000000, 1);
        hpBoxBg.drawRect(0, 0, 481, 30);
        hpBoxBg.endFill();
        //hpBoxBg.anchor.setTo(0, 0.5);

        this.hpBox = game.add.graphics(200, 120);
        var hpBox = this.hpBox;
        this.hpBox.scale.x = 1;
        hpBox.beginFill(0xff0000, 1);
        hpBox.drawRect(0, 0, 481, 30);
        hpBox.endFill();
        hpBox.anchor.setTo(0, 0.5);

        var sprite = game.add.sprite(0, 0, "hpBar").anchor.set.y = 0.9;

        // Cat ability base
        this.speedRate = 25000;

        if(selectedCat === 2){  // StrongCat ablility
            this.speedRate = 30000;
        }


        // HPBar tween (scale)
        this.hpTween = game.add.tween(hpBox.scale).to( { x: 0 }, this.speedRate * hpBox.scale.x, Phaser.Easing.Linear.None, true);
        this.hpTween.onComplete.addOnce(function(){
            console.log('Comp HP :', hpBox.scale.x);
        }, this);

        // Add Class
        classSet = game.add.sprite(game.width / 2, 50, "classSet");
        classSet.anchor.set(0.45);
        classSet.scale.set(1.2);
        //tween = game.add.tween(classSet);
            
        // Move Side Button
        var moveLeftButton = game.add.button(laneWidth/2, game.height - 120, "leftButton", this.moveLeftCat);
        moveLeftButton.scale.set(0.2);
        moveLeftButton.anchor.x = 0.45;
        var moveRightButton = game.add.button((laneWidth*2) + (lineWidth)*2 +(laneWidth/2), game.height - 120, "rightButton", this.moveRightCat);
        moveRightButton.scale.set(0.2);
		moveRightButton.anchor.x = 0.55;

        // Cat configuration
        cat = game.add.sprite(0, game.height - 200, "catBack", selectedCat);
        cat.scale.set(0.6);
        cat.positions = [laneWidth/2 + lineWidth, laneWidth + laneWidth/2 + lineWidth, laneWidth*2 + laneWidth/2 + lineWidth];
        cat.anchor.set(0.5);
        cat.canMove = true;
        cat.side = 1;
        cat.unlock = false;
        cat.x = cat.positions[cat.side];
        game.physics.enable(cat, Phaser.Physics.ARCADE);
        cat.body.allowRotation = false;
        cat.body.moves = false;
        /*
        cat.smokeEmitter = game.add.emitter(cat.x, cat.y + cat.height / 2 + 2, 20);
        cat.smokeEmitter.makeParticles("particle");
        cat.smokeEmitter.setXSpeed(-15, 15);
        cat.smokeEmitter.setYSpeed(50, 150);
        cat.smokeEmitter.setAlpha(0.2, 0.5);
        cat.smokeEmitter.start(false, 500, 20);
        */
        this.catGroup.add(cat);

        // ItemPool LOOP
        this.targetLoop = game.time.events.loop(targetDelay, function(){
            for(var i = 0; i < 1; i++){
                if(targetPool.length == 0){
                    var objectPercentage = game.rnd.between(0,10)
                    var attr;
                    if((objectPercentage >= 0) && (objectPercentage < 2)){
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
                            attr = catnips[0];
                        }
                        else if((catnipPercentage >= 101) && (catnipPercentage <= 600)){
                            attr = catnips[1];
                        }
                        else if((catnipPercentage >= 601) && (catnipPercentage <= 900)){
                            attr = catnips[2];
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

        // Score LOOP
        this.scoreLoop = game.time.events.loop(250, function(){
            this.scoreText.text = score.toString();
        }, this);
    },

    moveLeftCat: function(e){
        game.add.audio("buttonSound").play();
        if(cat.side != 0){
            cat.side--;
            angelSide = 1;

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
        }
    },

    moveRightCat: function(e){
        game.add.audio("buttonSound").play();
        if(cat.side != 2){    
            cat.side++;
            angelSide = 0;

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
        }
    },

    update: function(){
        // Game events
        
        // Class level Up
        if(score > 30){
            classSet.frame = 2;
        }
        if(score > 60){
            classSet.frame = 3;
        }
        if(score > 120){
            classSet.frame = 4;
        }
        if(score > 240){
            classSet.frame = 5;
        }
        
        //  Scroll the background
        background.tilePosition.y += 30;
        
        // SmokeEmitter
        //cat.smokeEmitter.x = cat.x;

        // Drop Item Configuration
        game.physics.arcade.collide(this.catGroup, this.targetGroup, function(c, t){
            var itemSound = game.add.audio("itemSound");
            itemSound.play();
            if(t.attr == catnips[0]){
                t.destroy();
                if (score >= 2){
                    score -= 2;
                }
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
                targetSpeedCounter = 4;
                targetSpeed = 1600;
                targetDelay = 400;
                for(var i = 0; i < this.targetGroup.length; i++){
                    this.targetGroup.getChildAt(i).body.velocity.y = targetSpeed;     
                }
                var timer = setInterval(function(){
                    targetSpeedCounter--;
                    if(targetSpeedCounter == 0){
                        targetSpeed = 1200;
                        var targetDelay = 600;
                        for(var i = 0; i < this.targetGroup.length; i++){
                            this.targetGroup.getChildAt(i).body.velocity.y = targetSpeed;     
                        }
                        clearInterval(timer);
                    }
                }, 1000);
            }
            else if(t.attr == items[1]){
                t.destroy();
            }
            else if(t.attr == items[2]){
                t.destroy();
				++unlockFlagArray[1];
                this.hpTween.stop(true);
                var goal;
                if(this.hpBox.scale.x > 0.8){
                    goal = 1;
                } else {
                    goal = this.hpBox.scale.x + 0.2;
                }
                game.add.tween(this.hpBox.scale).to( { x: goal }, 300, Phaser.Easing.Linear.None, true, 0).onComplete.addOnce(function(){
                    this.hpTween = game.add.tween(this.hpBox.scale).to( { x: 0 }, this.speedRate * this.hpBox.scale.x, Phaser.Easing.Linear.None, true);
                }, this);
            }
        }, null, this);

        // GameOver trigger
        if(!(this.hpBox.scale.x > 0)){
            bgm.destroy();
            this.timeOver(cat);
        }
    },

    pause:function(){
        game.paused = true;

        var buttonSound = game.add.audio("buttonSound");
        var pausePannel = game.add.sprite(game.width/2, game.height/2, "pausePannel");
        pausePannel.anchor.set(0.5);
        
        var backTitle = game.add.graphics(0, 0);
        var backGame = game.add.graphics(0, 0);
        var restartGame = game.add.graphics(0, 0);
        
        
        backTitle.beginFill(0xff0000, 1);
        backTitle.drawCircle(180, 650, 90);
        backTitle.endFill();
        backTitle.inputEnabled = true;
        backTitle.input.useHandCursor = true;
        backTitle.events.onInputDown.add(function(){
            console.log("back");
            buttonSound.play();
            game.paused = !game.paused;
            game.state.start("TitleScreen");
        }, this);

        backGame.beginFill(0xff0000, 1);
        backGame.drawCircle(320, 650, 80);
        backGame.endFill();
        backGame.inputEnabled = true;
        backGame.input.useHandCursor = true;
        backGame.events.onInputDown.add(function(){
            buttonSound.play();
            backTitle.destroy();
            pausePannel.destroy();
            restartGame.destroy();
            backGame.destroy();
            game.paused = !game.paused;
        }, this);

        restartGame.beginFill(0xff0000, 1);
        restartGame.drawCircle(460, 650, 80);
        restartGame.endFill();
        restartGame.inputEnabled = true;
        restartGame.input.useHandCursor = true;
        restartGame.events.onInputDown.add(function(){
            buttonSound.play();
            pausePannel.destroy();
            game.paused = !game.paused;
            game.state.restart();
        }, this);
    },

    timeOver: function(c){
        var gameOver = game.add.audio("gameOver").play();
        
        if(score > user_info.best_score){
            user_info.best_score = score;
        }
        
        // TimeOver Events
        if(score == 222){
            unlockFlagArray[0] = 222;
        }

        // Smoke OFF
        //c.smokeEmitter.on = false;

        // Slow Background
        background.tilePosition.y += 2;

        // Event LOOP OFF
        game.time.events.remove(this.targetLoop);
        game.time.events.remove(this.scoreLoop);

        // Tweens OFF
        game.tweens.removeAll();

        // Stop Items falling
        for(var i = 0; i < this.targetGroup.length; i++){
            this.targetGroup.getChildAt(i).body.velocity.y = 0;
        }

        // Explosion animation
        var explosionEmitter = game.add.emitter(c.x, c.y, 200);
        explosionEmitter.makeParticles("particle");
        explosionEmitter.gravity = 0;
        explosionEmitter.setAlpha(0.2, 1);
        explosionEmitter.minParticleScale = 0.2;
        explosionEmitter.maxParticleScale = 1;
        explosionEmitter.start(true, 1000, null, 200);
        explosionEmitter.forEach(function(p){
            p.tint = c.tint;
        });

        // Cat object destroy
        c.destroy();

        // Set time event for GameOverScreen 
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            if((unlockFlagArray[0] == 222) || (unlockFlagArray[1] >= 5) || (unlockFlagArray[2] == 111)){
                game.state.start("UnlockScreen");
            }
            else{
                game.state.start("GameOverScreen");
            }
        }, this);
    }
}

var unlockScreen = function(game){};
unlockScreen.prototype = {
    create: function(){
        var unlockPopUpFlag = 0;

        if(unlockFlagArray[0] == 222){
            var nyangGates = game.add.sprite(game.width / 2, game.height / 2, "unlockPopUp_NyangGates");
            nyangGates.anchor.set(0.5);
            nyangGates.inputEnabled = true;
            unlockPopUpFlag++;
            user_info.lock_1 = 1;
            nyangGates.events.onInputDown.add(function(){
                unlockPopUpFlag--;
                nyangGates.destroy();
                if(unlockPopUpFlag == 0){
                    game.state.start("GameOverScreen");
                }
            }, this);
        }
        if(unlockFlagArray[1] >= 5){
            var strongCat = game.add.sprite(game.width / 2, game.height / 2, "unlockPopUp_StrongCat");
            strongCat.anchor.set(0.5);
            strongCat.inputEnabled = true;
            unlockPopUpFlag++;
            user_info.lock_2 = 1;
            strongCat.events.onInputDown.add(function(){
                unlockPopUpFlag--;
                strongCat.destroy();
                if(unlockPopUpFlag == 0){
                    game.state.start("GameOverScreen");
                }
            }, this);
        }    
        if(unlockFlagArray[2] == 111){
            var rapidCat = game.add.sprite(game.width / 2, game.height / 2, "unlockPopUp_RapidCat");
            rapidCat.anchor.set(0.5);
            rapidCat.inputEnabled = true;
            unlockPopUpFlag++;
            user_info.lock_3 = 1;
            rapidCat.events.onInputDown.add(function(){
                unlockPopUpFlag--;
                rapidCat.destroy();
                if(unlockPopUpFlag == 0){
                    game.state.start("GameOverScreen");
                }
            }, this);
        }
    } 
}

var gameOverScreen = function(game){};
gameOverScreen.prototype = {
    preload: function(){
        this.sendRequest();
        if(score > ranking[3]){
            ranking.push(score);
            ranking.sort(function(a, b){return b-a});
        }
    },
    create: function(){
        // Background
        var sprite = game.add.sprite(0, -463, 'prologues', 0);
        var startBt = game.add.graphics(0, 0);
        startBt.beginFill(0x000000);
        startBt.drawRect(0, 537, 720, 200);
        startBt.endFill();
        var sprite = game.add.sprite(110, 425, 'rankingBox', 0);

        // RetryButton
        var playButton = game.add.button(63, 1016, "retryButton", this.startGame);
        playButton.onDownSound = game.add.audio("buttonSound");

        // Score
        var scoreBox = new Phaser.Rectangle(153, 445, 414, 114);
        var scoreText = game.add.bitmapText(0, 0 , "DungGeunMo", score.toString(), 170);
        scoreText.alignIn(scoreBox, Phaser.CENTER, 0, 0);
        scoreText.tint = 0x6B4C0C;

        // RankingBox contents
        var rankBox_1 = new Phaser.Rectangle(149, 697, 405, 47);
        var rankText_1 = game.add.bitmapText(0, 0 , "DungGeunMo", ranking[0].toString(), 60);
        rankText_1.alignIn(rankBox_1, Phaser.RIGHT, 0, 0);
        rankText_1.tint = 0x3C1E1E;

        var rankBox_2 = new Phaser.Rectangle(149, 744, 405, 47);
        var rankText_2 = game.add.bitmapText(0, 0 , "DungGeunMo", ranking[1].toString(), 60);
        rankText_2.alignIn(rankBox_2, Phaser.RIGHT, 0, 0);
        rankText_2.tint = 0x3C1E1E;

        var rankBox_3 = new Phaser.Rectangle(149, 791, 405, 47);
        var rankText_3 = game.add.bitmapText(0, 0 , "DungGeunMo", ranking[2].toString(), 60);
        rankText_3.alignIn(rankBox_3, Phaser.RIGHT, 0, 0);
        rankText_3.tint = 0x3C1E1E;

        var rankBox_4 = new Phaser.Rectangle(149, 838, 405, 47);
        var rankText_4 = game.add.bitmapText(0, 0 , "DungGeunMo", ranking[3].toString(), 60);
        rankText_4.alignIn(rankBox_4, Phaser.RIGHT, 0, 0);
        rankText_4.tint = 0x3C1E1E;

    },
    startGame: function(){
        game.state.start("TitleScreen");
    },
    sendRequest: function () {
        httpRequest.open('POST', '/addScore');
        httpRequest.setRequestHeader('Content-Type', 'application/json');
        httpRequest.send(JSON.stringify(user_info));
    }
}


Target = function (game, attr) {
    var position = game.rnd.between(0, 2);
    Phaser.Sprite.call(this, game, cat.positions[position], -20, attr);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.attr = attr;
    this.anchor.set(0.5);
    this.body.velocity.y = targetSpeed;
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
    console.log("target killed. Targets in the pool: " + targetPool.length);
}

Target.prototype.prepareToRevive = function(){
    var position = game.rnd.between(0, 2);
    this.reset(cat.positions[position], -20);
    this.body.velocity.y = targetSpeed;
    console.log("target revived. Targets in the pool: " + targetPool.length);
}
