// main.js
// Total points = 5
// mod 1: Allow the player to control the Rocket after it's fired (5)
// mod 2: 
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyA, keyS, keyL;

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;