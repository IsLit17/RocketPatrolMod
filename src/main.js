// main.js
// Total points = 90
// mod 1: Allow the player to control the Rocket after it's fired (5) c
// mod 2: Display the time remaining (in seconds) on the screen (10)
// mod 3: Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20) c
// mod 4: Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) c
// mod 5: Implement a simultaneous two-player mode (30) c
// mod 6: Track a high score that persists across scenes and display it in the UI (5) c
// mod 7: Create a new title screen (e.g., new artwork, typography, layout) (10) c

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