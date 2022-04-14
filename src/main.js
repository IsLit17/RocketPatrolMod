// main.js
// Total points = 10
// mod 1: Allow the player to control the Rocket after it's fired (5) c
// mod 2: Display the time remaining (in seconds) on the screen (10)
// mod 3: Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
// mod 4: Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20)
// mod 5: Implement a simultaneous two-player mode (30)
// mod 6: Track a high score that persists across scenes and display it in the UI (5) c

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyA, keyS, keyL;

// high score var
let highScore = 0;

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;