var game;
var gameWidth = 540;
var gameHeight = 960;
// 960 x 540



var Preloader = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
	function Preloader ()
	{
		Phaser.Scene.call(this, { key: 'preloader' });
	},

	preload: function ()
	{
		var progress = this.add.graphics();
		this.load.on('progress', function(value){
			progress.clear();
			progress.fillStyle(0xffffff, 1);
			progress.fillRect(0, 440, 540*value, 80)
		});

		this.load.image('mainMenu', 'assets/images/mainMenu.png');
		this.load.image('selectCursor', 'assets/images/selectCursor.png');

		this.load.spritesheet('prologue', 'assets/sprites/prologue.png', { frameWidth: 540, frameHeight: 960, endFrame: 3 });
		this.load.spritesheet('tutorial', 'assets/sprites/tutorial.png', { frameWidth: 540, frameHeight: 960, endFrame: 1 });
		this.load.spritesheet('CatBackSet', 'assets/sprites/CatBackSet.png', { frameWidth: 540, frameHeight: 384, endFrame: 1 });
		
	},

	create: function ()
	{
		this.scene.start('prologue');   
	}
});

var Prologue = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
	function Prologue ()
	{
		Phaser.Scene.call(this, { key: 'prologue' });
	},

	create: function()
	{
		var frame = 0;
		var prologue = this.add.sprite(gameWidth/2, gameHeight/2, 'prologue', frame).setInteractive();
		prologue.on('pointerdown', function (pointer) {
			if(frame < 3)
				prologue.setFrame(++frame);
			else
				game.scene.switch('prologue', 'mainmenu');
		});
	}
});

var MainMenu = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
	function MainMenu ()
	{
		Phaser.Scene.call(this, { key: 'mainmenu' });
	},
	create: function()
	{
		var mainMenu = this.add.image(gameWidth/2, gameHeight/2, 'mainMenu');   //48, 758, 494, 895

		var tuto_button = this.add.graphics().setInteractive(new Phaser.Geom.Circle(58, 124, 36), Phaser.Geom.Circle.Contains);
		tuto_button.on('pointerdown', function (pointer) {
			game.scene.start('tutorial');
		});

		var start_button = this.add.graphics().setInteractive(new Phaser.Geom.Rectangle(48, 758, 446, 137), Phaser.Geom.Rectangle.Contains);
		start_button.on('pointerdown', function (pointer) {
			console.log('22');
		});

	}
});

var Tutorial = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
	function Tutorial ()
	{
		Phaser.Scene.call(this, { key: 'tutorial' });
	},
	create: function()
	{
		this.add.graphics()
		var frame = 0;
		var tutorial = this.add.sprite(gameWidth/2, gameHeight/2, 'tutorial', frame);

		var next_button = this.add.image(396, 855, 'selectCursor').setInteractive();    //124
		var prev_button = this.add.image(148, 855, 'selectCursor').setInteractive();  // 217, 800 >> 341, 800  110px
		prev_button.setScale(-1);
		
		next_button.on('pointerdown', function (pointer) {
			if(frame === 0)
				tutorial.setFrame(++frame);
			else{
				game.scene.switch('tutorial', 'mainmenu');
			}
		});

		prev_button.on('pointerdown', function (pointer) {
			if(frame === 1)
				tutorial.setFrame(--frame);
			else{
				game.scene.switch('tutorial', 'mainmenu');
			}
		});
	}
});

window.onload = function() {
	var config = {
		type: Phaser.AUTO,
		width: gameWidth,
		height: gameHeight,
		backgroundColor: '#000000',
		scene: [ Preloader, Prologue, MainMenu, Tutorial ]
	};
	game = new Phaser.Game(config);
	resize();
	window.addEventListener("resize", resize, false);
};

function resize() {
	var canvas = document.querySelector("canvas");
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var windowRatio = windowWidth / windowHeight;
	var gameRatio = game.config.width / game.config.height;
	if (windowRatio < gameRatio) {
	  canvas.style.width = windowWidth + "px";
	  canvas.style.height = (windowWidth / gameRatio) + "px";
	} else {
		canvas.style.width = (windowHeight * gameRatio) + "px";
		canvas.style.height = windowHeight + "px";
	}
}