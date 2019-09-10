var game;
var gameWidth = 540;
var gameHeight = 960;

var soundOn = 1;

var Preloader = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function Preloader() {
			Phaser.Scene.call(this, { key: 'preloader' });
		},
	init: function () {
		httpRequest = new XMLHttpRequest();
		if (!httpRequest) {
			alert('Not Connected!');
			return false;
		}
	},

	preload: function () {
		var progress = this.add.graphics();
		this.load.on('progress', function (value) {
			progress.clear();
			progress.fillStyle(0xffffff, 1);
			progress.fillRect(0, 440, 540 * value, 80)
		});

		this.load.audio('buttonSound', ['assets/sounds/ButtonSound.mp3']);
		this.load.audio('itemSound', ['assets/sounds/ItemSound.mp3']);
		this.load.audio('backgroundMusic', ['assets/sounds/BGM.mp3']); //GameOver.mp3
		this.load.audio('gameOverSound', ['assets/sounds/GameOver.mp3']);

		this.load.bitmapFont('DungGeunMo', 'assets/fonts/DungGeunMo.png', 'assets/fonts/DungGeunMo.xml');

		this.load.image('mainMenu', 'assets/images/mainMenu.png');
		this.load.image('mainStartButton', 'assets/images/mainStartButton.png');
		this.load.image('gameRuleButton', 'assets/images/gameRuleButton.png');
		this.load.image('selectCursor', 'assets/images/selectCursor.png');
		this.load.image('selectBackground', 'assets/images/selectBackground.png');
		this.load.image('unlockIcon', 'assets/images/unlockIcon.png');
		this.load.image('background', 'assets/images/background.png');
		this.load.image('moveButton', 'assets/images/moveButton.png');
		this.load.image('particle', 'assets/images/particle.png');
		this.load.image('hpBar', 'assets/images/hpBar.png');
		this.load.image('ranking', 'assets/images/ranking.png');
		this.load.image('retry', 'assets/images/retry.png');
		this.load.image('scoreBox', 'assets/images/scoreBox.png');
		this.load.image('backButton', 'assets/images/backButton.png');
		this.load.image('pauseButton', 'assets/images/pauseButton.png');
		this.load.image('pausePannel', 'assets/images/pausePannel.png');

		this.load.spritesheet('prologue', 'assets/sprites/prologue.png', { frameWidth: 540, frameHeight: 960, endFrame: 3 });
		this.load.spritesheet('tutorial', 'assets/sprites/tutorial.png', { frameWidth: 540, frameHeight: 960, endFrame: 1 });
		this.load.spritesheet('catBackSet', 'assets/sprites/CatBackSet.png', { frameWidth: 127, frameHeight: 184, endFrame: 3 });
		this.load.spritesheet('catSelect', 'assets/sprites/catSelect.png', { frameWidth: 441, frameHeight: 551, endFrame: 3 });
		this.load.spritesheet('startButton', 'assets/sprites/startButton.png', { frameWidth: 447, frameHeight: 131, endFrame: 1 });
		this.load.spritesheet('items', 'assets/sprites/items.png', { frameWidth: 100, frameHeight: 80, endFrame: 6 });
		this.load.spritesheet('class', 'assets/sprites/class.png', { frameWidth: 140, frameHeight: 31, endFrame: 4 });
		this.load.spritesheet('catIcon', 'assets/sprites/catIcon.png', { frameWidth: 40, frameHeight: 38, endFrame: 3 });
		this.load.spritesheet('catUnlock', 'assets/sprites/catUnlock.png', { frameWidth: 510, frameHeight: 570, endFrame: 2 });
		this.load.spritesheet('soundButton', 'assets/sprites/soundButton.png', { frameWidth: 72, frameHeight: 72, endFrame: 1 });
	},

	create: function () {
		this.scene.start('prologue'); //gameplay  
	}
});

var Prologue = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function Prologue() {
			Phaser.Scene.call(this, { key: 'prologue' });
		},

	create: function () {
		var buttonSound = this.sound.add('buttonSound');
		var frame = 0;
		var prologue = this.add.sprite(gameWidth / 2, gameHeight / 2 - 100, 'prologue', frame).setInteractive();
		prologue.on('pointerdown', function (pointer) {
			buttonSound.play();
			if (frame < 3) {
				prologue.setFrame(++frame);
			}
			else {
				// game.scene.stop('prologue');
				game.scene.remove('prologue');
				game.scene.run('mainmenu');
			}
		});
	}
});

var MainMenu = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function MainMenu() {
			Phaser.Scene.call(this, { key: 'mainmenu' });
		},
	create: function () {
		var mainMenu = this.add.image(gameWidth / 2, gameHeight / 2, 'mainMenu');

		var buttonSound = this.sound.add('buttonSound');

		var gameRuleButton = this.add.image(58, 124, 'gameRuleButton').setInteractive();
		var soundButton = this.add.sprite(479, 125, 'soundButton', soundOn).setInteractive();
		var mainStartButton = this.add.image(273, 827, 'mainStartButton').setInteractive();
		var scoreBox = this.add.image(270, 677, 'scoreBox');

		var scoreText = this.add.bitmapText(132, 563, 'DungGeunMo', '        \n' + user_info.bestScore, 80);
		scoreText.setTint('0x1C1A02');
		scoreText.setCenterAlign();

		soundButton.on('pointerdown', function (pointer) {
			if (soundOn === 1) {
				soundOn = 0;
				game.sound.setMute(true);
			}
			else {
				buttonSound.play();
				soundOn = 1;
				game.sound.setMute(false);
			}
			this.setFrame(soundOn);
		});
		gameRuleButton.on('pointerdown', function (pointer) {
			buttonSound.play();
			game.scene.stop('mainmenu');
			game.scene.run('tutorial');
		});
		mainStartButton.on('pointerdown', function (pointer) {
			buttonSound.play();
			game.scene.stop('mainmenu');
			game.scene.run('selectmenu');
		});
	}
});

var Tutorial = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function Tutorial() {
			Phaser.Scene.call(this, { key: 'tutorial' });
		},
	create: function () {
		var buttonSound = this.sound.add('buttonSound');

		this.add.graphics()
		var frame = 0;
		var tutorial = this.add.sprite(gameWidth / 2, gameHeight / 2, 'tutorial', frame);

		var next_button = this.add.image(396, 855, 'selectCursor').setInteractive();    //124
		var prev_button = this.add.image(148, 855, 'selectCursor').setInteractive();  // 217, 800 >> 341, 800  110px
		prev_button.setScale(-1);

		var cat = this.add.sprite(gameWidth / 2, 240, 'catBackSet', 0);

		next_button.on('pointerdown', function (pointer) {
			buttonSound.play();
			if (frame === 0) {
				tutorial.setFrame(++frame);
				cat.visible = false;
			}
			else {
				// game.scene.switch('tutorial', 'mainmenu');
				game.scene.stop('tutorial');
				game.scene.run('mainmenu');
			}
		});

		prev_button.on('pointerdown', function (pointer) {
			buttonSound.play();
			if (frame === 1) {
				tutorial.setFrame(--frame);
				cat.visible = true;
			}
			else {
				game.scene.stop('tutorial');
				game.scene.run('mainmenu');
			}
		});
	}
});

var SelectMenu = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function SelectMenu() {
			Phaser.Scene.call(this, { key: 'selectmenu' });
		},
	init: function () {
		selectCat = 0;
		catLock = [1, user_info.lock_1, user_info.lock_2, user_info.lock_3];
	},
	create: function () {
		selectCat = 0;

		var buttonSound = this.sound.add('buttonSound');

		var bg = this.add.image(gameWidth / 2, gameHeight / 2, 'selectBackground');
		var selectFrame = this.add.sprite(gameWidth / 2, 512, 'catSelect', selectCat);
		var unlockIcon = this.add.image(135, 720, 'unlockIcon');

		var startButton = this.add.image(gameWidth / 2, 870, 'startButton', catLock[0]).setInteractive();
		var backButton = this.add.image(58, 124, 'backButton').setInteractive();
		var nextButton = this.add.image(471, 465, 'selectCursor').setInteractive();
		var prevButton = this.add.image(68, 465, 'selectCursor').setInteractive();
		prevButton.setScale(-1);

		backButton.on('pointerdown', function (pointer) {
			buttonSound.play();
			game.scene.stop('selectmenu');
			game.scene.run('mainmenu');
		}, this);

		nextButton.on('pointerdown', function (pointer) {
			buttonSound.play();
			if (selectCat < 3) {
				selectFrame.setFrame(++selectCat);
			}
			else {
				selectFrame.setFrame(selectCat = 0);
			}

			if (catLock[selectCat]) {
				startButton.setFrame(1);
				unlockIcon.visible = true;
			} else {
				startButton.setFrame(0);
				unlockIcon.visible = false;
			}
		}, this);

		prevButton.on('pointerdown', function (pointer) {
			buttonSound.play();
			if (selectCat > 0) {
				selectFrame.setFrame(--selectCat);
			}
			else {
				selectFrame.setFrame(selectCat = 3);
			}

			if (catLock[selectCat]) {
				startButton.setFrame(1);
				unlockIcon.visible = true;
			} else {
				startButton.setFrame(0);
				unlockIcon.visible = false;
			}
		}, this);

		startButton.on('pointerdown', function (pointer) {
			buttonSound.play();
			if (catLock[selectCat]) {
				// game.scene.pause('selectmenu');
				// game.scene.start('gameplay');
				// game.scene.switch('selectmenu', 'gameplay');

				game.scene.stop('selectmenu');
				game.scene.run('gameplay');
			} else {
				console.log('Locked Cat!');
			}
		}, this);
	}
});

var GamePlay = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function GamePlay() {
			Phaser.Scene.call(this, { key: 'gameplay' });
		},
	init: function () {
		score = 0;
		speed = 14;
		hpRate = 25000;

		// Cat effect
		switch (selectCat) {
			case 1:
				speed = 18;
				break;
			case 2:
				hpRate = 30000;
				break;
		}

		this.noItem = true;
		this.hpGet = 0;
	},
	create: function () {
		var buttonSound = this.sound.add('buttonSound');
		this.itemSound = this.sound.add('itemSound');
		bgm = this.sound.add('backgroundMusic', { loop: true, volume: 0.7 });
		bgm.play();

		background = this.add.tileSprite(gameWidth / 2, gameHeight / 2, 540, 960, 'background');
		background.depth = -10;

		var pauseButton = this.add.image(490, 40, 'pauseButton').setInteractive();
		pauseButton.depth = 10;
		var leftButton = this.add.image(83, 876, 'moveButton').setInteractive();
		leftButton.depth = 5;
		leftButton.setFlipX(true);
		var rightButton = this.add.image(457, 876, 'moveButton').setInteractive();
		rightButton.depth = 5;

		// Button
		pauseButton.on('pointerdown', (function (pointer) {
			buttonSound.play();
			bgm.pause();
			game.scene.pause('gameplay');
			game.scene.run('gamepause');
			// game.scene.switch('gameplay', 'gamepause');
        }).bind(this));
        
		leftButton.on('pointerdown', (function (pointer) {
			buttonSound.play();
			leftButton.setTint(0xCC6666);
			this.moveLeft();
		}).bind(this));
		leftButton.on('pointerup', function (pointer) {
			this.clearTint();
		});
		rightButton.on('pointerdown', (function (pointer) {
			buttonSound.play();
			rightButton.setTint(0xCC6666);
			this.moveRight();
		}).bind(this));
		rightButton.on('pointerup', function (pointer) {
			this.clearTint();
		});

		// Cat
		cat = this.physics.add.sprite(gameWidth / 2, gameHeight / 2 + 280, 'catBackSet', selectCat);
		cat.depth = 3;
		cat.side = 1;
		positions = [gameWidth / 2 - 180, gameWidth / 2, gameWidth / 2 + 180]
		var tween = this.tweens.add({
			targets: cat,
			y: gameHeight / 2 + 265,
			duration: 130,
			yoyo: true,
			loop: -1
		});
		var particles = this.add.particles('particle');
		var emitter = particles.createEmitter({
			angle: { min: 120, max: 60 },
			speed: 400,
			gravityY: 200,
			frequency: 100,
			lifespan: 300,
			quantity: 5,
			scale: { start: 2, end: 4 },
			alpha: { start: 0.5, end: 0.3 },
			blendMode: 'NORMAL',
		});
		emitter.startFollow(cat, 0, 35);

		// Score
		scoreText = this.add.bitmapText(30, -13, 'DungGeunMo', score.toString(), 80);
		scoreText.depth = 10;

		// Class
		catClass = this.add.sprite(gameWidth / 2, 40, 'class');
		catClass.depth = 5;

		// HP bar
		var bar = this.add.image(gameWidth / 2, 110, 'hpBar');
		bar.depth = 5;

		var rect = new Phaser.Geom.Rectangle(0, 0, 359, 19);

		var hpBackground = this.add.graphics({ x: 152, y: 88, fillStyle: { color: 0xffffff } }); //0xF02323
		hpBackground.fillRectShape(rect);
		hpBackground.depth = 4;

		hpGage = this.add.graphics({ x: 152, y: 88, fillStyle: { color: 0xF02323 } }); //0xF02323
		hpGage.fillRectShape(rect);
		hpGage.depth = 4;

		HPtween = this.tweens.add({
			targets: hpGage,
			scaleX: 0,
			duration: hpGage.scaleX * hpRate
		});

		// Item
		var Catnip = new Phaser.Class({
			Extends: Phaser.GameObjects.Sprite,
			initialize: function Catnip(scene) {
					Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'items');
				},
			fire: function (x, y, frame) {
				this.depth = 3;
				this.setFrame(frame);
				this.id = frame;
				this.setPosition(x, 0 + y);

				this.setActive(true);
				this.setVisible(true);
			},
			update: function (time, delta) {
				this.y += speed;
				if (this.y > gameHeight + 50) {
					this.destroy();
				}
			}
		});

		catnips = this.physics.add.group({
			classType: Catnip,
			runChildUpdate: true
		});

		// Loop
		itemStack = 0;
		catnipBomb = this.time.addEvent({ delay: 100 });
		speedCan = this.time.addEvent({ delay: 100 });
		timedEvent = this.time.addEvent({ delay: 1400 * 14 / speed, callback: this.dropItem, callbackScope: this, loop: true });

		this.physics.add.overlap(cat, catnips, this.getItem, null, this);
	},
	update: function () {
		background.tilePositionY -= speed;

		if (score > ranking[3].bestScore)
			catClass.setFrame(1);
		if (score > ranking[2].bestScore)
			catClass.setFrame(2);
		if (score > ranking[1].bestScore)
			catClass.setFrame(3);
		if (score > ranking[0].bestScore)
			catClass.setFrame(4);

		if (!(hpGage.scaleX > 0)) {
			this.gameOver();
		}
	},
	hpHeal: function () {
		HPtween.stop();
		if (hpGage.scaleX >= 0.7) { goal = 1; }
		else { goal = hpGage.scaleX + 0.3 }
		this.tweens.add({
			targets: hpGage,
			scaleX: goal,
			duration: 200,
			yoyo: false,
			onComplete: (function () {
				HPtween = this.tweens.add({
					targets: hpGage,
					scaleX: {
						getEnd: function (target, key, value) {
							return 0;
						},
						getStart: function (target, key, value) {
							return value;
						}
					},
					duration: hpGage.scaleX * hpRate
				});
			}).bind(this)
		});
	},
	getItem: function (cat, catnip) {
		this.itemSound.play();
		switch (catnip.id) {
			case 0:
				score = score + 1;
				scoreText.text = score.toString();
				break;
			case 1:
				score = score + 3;
				scoreText.text = score.toString();
				break;
			case 2:
				if (score >= 2) { score = score - 2; }
				else { score = 0 }
				scoreText.text = score.toString();
				break;
			case 3:
				score = score + 5;
				scoreText.text = score.toString();
				break;
			case 4:
				this.hpGet++;
				this.hpHeal();
				break;
			case 5:
				if (speedCan.getProgress() === 1) {
					speed = speed * 1.5;
					timedEvent.reset({
						delay: 1400 * 14 / speed,
						callback: this.dropItem,
						callbackScope: this,
						loop: true
					});
					speedCan = this.time.addEvent({
						delay: 10000, callback: function () {
							if (selectCat === 1)
								speed = 18;
							else
								speed = 14;

							timedEvent.reset({
								delay: 1400 * 14 / speed,
								callback: this.dropItem,
								callbackScope: this,
								loop: true
							});
						}, callbackScope: this
					});
				} else {
					speedCan.reset({
						delay: 10000 * (2 - speedCan.getProgress()), callback: function () {
							if (selectCat === 1)
								speed = 18;
							else
								speed = 14;

							timedEvent.reset({
								delay: 1400 * 14 / speed,
								callback: this.dropItem,
								callbackScope: this,
								loop: true
							});
						}, callbackScope: this
					});
				}
				break;
			case 6:
				timedEvent.paused = true;
				catnipBomb = this.time.addEvent({ delay: 50, callback: this.dropItem, callbackScope: this, repeat: 30 });
				break;
		}
		if (this.noItem === true)
			this.noItem = !this.noItem
		catnip.destroy();
	},
	dropItem: function () {
		var rnd = Phaser.Math.Between(0, 9);

		if (catnipBomb.getOverallProgress() === 1 && ++itemStack >= 5) {
			var itemId = Phaser.Math.Between(1, 10);
			if (itemId <= 5) { itemId = 4; }
			else if (itemId >= 9) { itemId = 5; } // can
			else { itemId = 6; } //catnipBomb

			var rnd2 = Phaser.Math.Between(0, 2);

			var item = catnips.get();
			item.fire(positions[rnd2], -280 * (rnd2 + 1), itemId);
			itemStack = rnd2;
		}

		if (rnd <= 6) {
			var item1 = catnips.get();
			rnd = Phaser.Math.Between(0, 2);
			var catnip = 0;

			var catnipPer = Phaser.Math.Between(1, 10);
			if (catnipPer <= 7) { catnip = 0; }
			else if (catnipPer === 10) { catnip = 1; }
			else {
				if (selectCat === 3) { catnip = 3; }
				else { catnip = 2; }
			}

			item1.fire(positions[rnd], 0, catnip);

		} else {
			var item1 = catnips.get();
			var item2 = catnips.get();
			rnd = Phaser.Math.Between(1, 3);
			var catnip1 = 0;
			var catnip2 = 0;

			var catnipPer1 = Phaser.Math.Between(1, 10);
			if (catnipPer1 <= 6) { catnip1 = 0; }
			else if (catnipPer1 >= 9) { catnip1 = 1; }
			else {
				if (selectCat === 3) { catnip1 = 3; }
				else { catnip1 = 2; }
			}

			var catnipPer2 = Phaser.Math.Between(1, 10);
			if (catnipPer2 <= 6) { catnip2 = 0; }
			else if (catnipPer2 >= 9) { catnip2 = 1; }
			else {
				if (selectCat === 3) { catnip2 = 3; }
				else { catnip2 = 2; }
			}

			item1.fire(positions[rnd % 3], 0, catnip1);
			item2.fire(positions[rnd - 1], 0, catnip2);
		}

		if (catnipBomb.getOverallProgress() === 1) timedEvent.paused = false;
		// console.log(rnd);
	},
	moveLeft: function () {
		if (cat.side != 0) {
			cat.side--;
			var Tween = this.tweens.add({
				targets: cat,
				x: { value: positions[cat.side] },
				angle: {
					getEnd: function (target, key, value) {
						return 0;
					},
					getStart: function (target, key, value) {
						return -30;
					},
				},
				duration: 200
			});
		}
	},
	moveRight: function () {
		if (cat.side != 2) {
			cat.side++;
			var Tween = this.tweens.add({
				targets: cat,
				x: { value: positions[cat.side] },
				angle: {
					getEnd: function (target, key, value) {
						return 0;
					},
					getStart: function (target, key, value) {
						return 30;
					},
				},
				duration: 200
			});
		}
	},
	gameOver: function () {
		bgm.stop();
		game.scene.pause('gameplay');
		var eventArray = [0, 0, 0];

		if (score > user_info.bestScore) {
			user_info.bestScore = score;
			user_info.bestCat = selectCat;
		}

		if (catLock[1] != 1 && this.noItem) {
			user_info.lock_1 = 1;
			eventArray[0] = 1;
		}
		if (catLock[2] != 1 && this.hpGet >= 5) {
			user_info.lock_2 = 1;
			eventArray[1] = 1;
		}
		if (catLock[3] != 1 && score === 16) {
			user_info.lock_3 = 1;
			eventArray[2] = 1;
		}
		game.scene.run('gameover', { unlockEvent: eventArray });
	}
});

var GamePause = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function GamePause() {
			Phaser.Scene.call(this, { key: 'gamepause' });
		},
	create: function () {
		var buttonSound = this.sound.add('buttonSound');

		var rect = new Phaser.Geom.Rectangle(0, 0, 540, 960);
		var background = this.add.graphics({ x: 0, y: 0, fillStyle: { color: 0x000000, alpha: 0.5 } });
		background.fillRectShape(rect);

		var pausePannel = this.add.image(gameWidth / 2, gameHeight / 2, 'pausePannel');

		var circle1 = new Phaser.Geom.Circle(136, 482, 35);
		var button1 = this.add.graphics({ x: 0, y: 0, fillStyle: { color: 0x000000, alpha: 1 } });
		button1.setInteractive(circle1, Phaser.Geom.Circle.Contains);

		var circle2 = new Phaser.Geom.Circle(242, 482, 35);
		var button2 = this.add.graphics({ x: 0, y: 0, fillStyle: { color: 0x000000, alpha: 1 } });
		button2.setInteractive(circle2, Phaser.Geom.Circle.Contains);

		var circle3 = new Phaser.Geom.Circle(352, 482, 35);
		var button3 = this.add.graphics({ x: 0, y: 0, fillStyle: { color: 0x000000, alpha: 1 } });
		button3.setInteractive(circle3, Phaser.Geom.Circle.Contains);

		button1.on('pointerdown', function (pointer) {
			buttonSound.play();
			game.scene.stop('gameplay');
			game.scene.stop('gamepause');
			game.scene.run('mainmenu');
		}, this);

		button2.on('pointerdown', function (pointer) {
			buttonSound.play();
			game.scene.stop('gamepause');
			game.scene.resume('gameplay');
			bgm.resume();
		}, this);

		button3.on('pointerdown', function (pointer) {
			buttonSound.play();
			game.scene.stop('gamepause');
			game.scene.stop('gameplay');
			game.scene.run('gameplay');
		}, this);
	}
});

var GameOver = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function GameOver() {
			Phaser.Scene.call(this, { key: 'gameover' });
		},
	init: function (data) {
		this.unlockEvent = data.unlockEvent;
		this.count = 0;
		this.sendRequest();
	},
	create: function () {
		this.buttonSound = this.sound.add('buttonSound');
		gameOverSound = this.sound.add('gameOverSound');
		gameOverSound.play();
		var rect = new Phaser.Geom.Rectangle(0, 0, 540, 960);
		var fade = this.add.graphics({ x: 0, y: 0, fillStyle: { color: 0x000000 } });
		fade.fillRectShape(rect);
		fade.setAlpha(0);

		var Tween = this.tweens.add({
			targets: fade,
			alpha: {
				value: {
					getEnd: function (target, key, value) {
						return 1;
					},
					getStart: function (target, key, value) {
						return 0;
					}
				}
			},
			duration: 1000,
			onComplete: (function () {
				game.scene.stop('gameplay');
				this.popupEvent();
			}).bind(this)
		});
	},
	popupEvent: function () {
		for (i = 0; i < this.unlockEvent.length; i++) {
			if (this.unlockEvent[i]) {
				this.count++;
				var popImage = this.add.image(gameWidth / 2, gameHeight / 2, 'catUnlock', i);
				popImage.setVisible(true);
				popImage.setInteractive();
			}
		}
		if (this.count === 0) {
			game.scene.stop('gameover');
			game.scene.run('gameresult');
		}
		this.input.on('gameobjectdown', (function (pointer, gameObject) {
			this.buttonSound.play();
			gameObject.destroy();
			if (--this.count === 0) {
				game.scene.stop('gameover');
				game.scene.run('gameresult');
			}
		}).bind(this));
	},
	sendRequest: function () {
		httpRequest.open('POST', '/user_info');
		httpRequest.setRequestHeader('Content-Type', 'application/json');
		httpRequest.send(JSON.stringify(user_info));
	}
});

var GameResult = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function GameResult() {
			Phaser.Scene.call(this, { key: 'gameresult' });
		},
	init: function () {
		if (score > ranking[3].bestScore) {
			ranking.push({ "bestScore": score, "bestCat": selectCat });
			ranking.sort(function (a, b) { return b.bestScore - a.bestScore });
			ranking.pop();
		}
	},
	create: function () {
		var buttonSound = this.sound.add('buttonSound');

		var rect = new Phaser.Geom.Rectangle(0, 0, 540, 960);
		var fade = this.add.graphics({ x: 0, y: 0, fillStyle: { color: 0x000000, alpha: 1 } });
		fade.fillRectShape(rect);
		fade.depth = 10;

		var Tween = this.tweens.add({
			targets: fade,
			alpha: 0,
			duration: 1000
		});

		this.add.sprite(gameWidth / 2, gameHeight / 2 - 350, 'prologue');
		var rect = new Phaser.Geom.Rectangle(0, 0, 540, 100);
		var hpBackground = this.add.graphics({ x: 0, y: 416, fillStyle: { color: 0x000000 } });
		hpBackground.fillRectShape(rect);


		var retry = this.add.image(261, 877, 'retry').setInteractive();
		retry.on('pointerdown', function (pointer) {
			buttonSound.play();
			game.scene.stop('gameresult');
			game.scene.run('mainmenu');
		});

		this.add.image(268, 550, 'ranking');
		var scoreText = this.add.bitmapText(60, 234, 'DungGeunMo', '        \n' + score, 120, 1);
		scoreText.setTint('0x442323');

		var rankText1 = this.add.bitmapText(210, 469, 'DungGeunMo', '        \n' + ranking[0].bestScore, 56, 2);
		rankText1.setTint('0x442323');
		var rankText2 = this.add.bitmapText(210, 512, 'DungGeunMo', '        \n' + ranking[1].bestScore, 56, 2);
		rankText2.setTint('0x442323');
		var rankText3 = this.add.bitmapText(210, 556, 'DungGeunMo', '        \n' + ranking[2].bestScore, 56, 2);
		rankText3.setTint('0x442323');
		var rankText4 = this.add.bitmapText(210, 601, 'DungGeunMo', '        \n' + ranking[3].bestScore, 56, 2);
		rankText4.setTint('0x442323');

		var rankImage1 = this.add.sprite(431, 559, 'catIcon', ranking[0].bestCat);	// 42
		var rankImage2 = this.add.sprite(431, 603, 'catIcon', ranking[1].bestCat);
		var rankImage3 = this.add.sprite(431, 645, 'catIcon', ranking[2].bestCat);
		var rankImage4 = this.add.sprite(431, 690, 'catIcon', ranking[3].bestCat);
	}
});

window.onload = function () {
	var config = {
		type: Phaser.AUTO,
		width: gameWidth,
		height: gameHeight,
		backgroundColor: '#000000',
		physics: {
			default: 'arcade',
			arcade: {
				debug: false
			}
		},
		scene: [Preloader, Prologue, MainMenu, Tutorial, SelectMenu, GamePlay, GamePause, GameOver, GameResult]
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