class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, keyLeft, keyRight, keyFire) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
        this.sfxRocket = scene.sound.add('sfx_rocket');
        this.left = keyLeft;
        this.right = keyRight;
        this.fire = keyFire;
        this.score = 0;
    }

    update() {
        if ((this.left.isDown) && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        }
        else if (this.right.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
        }

        // fire button
        if (Phaser.Input.Keyboard.JustDown(this.fire) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }

        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        if (this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }

    updateScore(points) {
        this.score += points;
    }
}