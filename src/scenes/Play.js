let count = 0
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket1', './assets/rocket.png');
        this.load.image('rocket2', './assets/rocket2.png');
        this.load.image('spaceship', './assets/alien.png');
        this.load.image('spaceship2', './assets/alien2.png');
        this.load.image('starfield', './assets/starfield.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion2.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F); // player 1 fire
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); // restart
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); // player 2 left
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); // player 2 right
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // player 1 left
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // player 1 right
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L); // player 2 fire

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/3, game.config.height - borderUISize - borderPadding, 'rocket1', 0, keyA, keyS, keyF).setOrigin(0.5, 0);
        // add rocket (p2)
        this.p2Rocket = new Rocket(this, (2*game.config.width)/3, game.config.height - borderUISize - borderPadding, 'rocket2', 0, keyLEFT, keyRIGHT, keyL).setOrigin(0.5, 0);

        // add spaceships (x3)
        let shipSpeed = game.settings.spaceshipSpeed;
        this.shipNew = new Spaceship(this, game.config.width + borderUISize*9, borderUISize*4, 'spaceship2', 0, 50, 5).setOrigin(0, 0);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*5 + borderPadding*2, 'spaceship', 0, 30, shipSpeed).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*6 + borderPadding*4, 'spaceship', 0, 20, shipSpeed).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*7 + borderPadding*6, 'spaceship', 0, 10, shipSpeed).setOrigin(0,0);

        // animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '25px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, 'P1: ' + this.p1Rocket.score, scoreConfig); // p1
        this.scoreRight = this.add.text(borderUISize + borderPadding * 42.5, borderUISize + borderPadding*2, 'P2: ' + this.p2Rocket.score, scoreConfig); // p2
        this.gameOver = false; // game over flag
        scoreConfig.fixedWidth = 0;

        // 60-second play clock
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if (this.p1Rocket.score > this.p2Rocket.score) {
                this.add.text(game.config.width/2, game.config.height/2, 'Player 1 Wins', scoreConfig).setOrigin(0.5);
            }
            else if (this.p1Rocket.score < this.p2Rocket.score) {
                this.add.text(game.config.width/2, game.config.height/2, 'Player 2 Wins', scoreConfig).setOrigin(0.5);
            }
            else {
                this.add.text(game.config.width/2, game.config.height/2, 'TIE GAME', scoreConfig).setOrigin(0.5);
            }
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            if (this.p1Rocket.score > highScore) {
                highScore = this.p1Rocket.score;
            }
            if (this.p2Rocket.score > highScore) {
                highScore = this.p2Rocket.score;
            }
            this.add.text(game.config.width/2, game.config.height/2 + 64 + 64, 'High Score: ' + highScore, scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // to display remaining time on the screen
        let clockConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 310
        }
        this.remainingTime = game.settings.gameTimer / 1000;
        this.maxTime = this.remainingTime;
        this.clockText = this.add.text(borderUISize + borderPadding*12, borderUISize + borderPadding*2, 'Time Remainig: ' + this.remainingTime, clockConfig);
        this.remainingTime -= this.clock.getElapsedSeconds();
        this.clockText.setText('Time Remaining: ' + this.remainingTime);

        //this.showTime = this.time.delayedCall(5000, this.updateTime(), null, this);

        // this.showTime = this.time.addEvent({
        //     delay: 1000,                // ms
        //     callback: this.updateTime(),
        //     callbackScope: this,
        //     loop: true,
        //     repeat: this.maxTime
        // });
    }

    update() {
        /*let runtime = Math.round(seconds * 0.001);
        let maxTime = Math.round(game.settings.gameTimer * 0.001);
        let remainingTime = maxTime - runtime;
        if (remainingTime <= 0) {
            remainingTime = 0;
        }
        this.clockText.setText('Time Remaining: ' + remainingTime);*/
        
        // check R key for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            count = 0;
            this.scene.restart();
        }
        // check <- key for menu scene
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            count = 0;
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.p2Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.shipNew.update();
        }
        // check collisions p1
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.shipNew)) {
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.shipNew);
        }

        //check collisions p2
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.ship03);
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.ship02);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.ship01);
        }
        if (this.checkCollision(this.p2Rocket, this.shipNew)) {
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.shipNew);
        }
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(rocket, ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        rocket.updateScore(ship.points);
        this.scoreLeft.text = 'P1: ' + this.p1Rocket.score;
        this.scoreRight.text = 'P2: ' + this.p2Rocket.score;
        this.sound.play('sfx_explosion');
    }

    updateTime() { // function to help show time
        // if (count < this.maxTime) {
        //     count += 1;
        //     this.remainingTime -= 1;
        //     console.log(this.remainingTime);
        //     this.clockText.setText('Time Remaining: ' + this.remainingTime);
        //     this.time.delayedCall(1000, this.updateTime(), null, this);
        // }
    }

    // this.remainingTime -= 1;
    //     this.clockText.setText('Time Remaining: ' + this.remainingTime);
    //     console.log(this.remainingTime);
}