const r = require("raylib");

const WINDOW_WIDTH = 1200;
const WINDOW_HEIGHT = 600;
const targetFps = 90;

let scannerPosX = 0;
const scannerPosY = 0;
const scannerRange = 50;
const scannerHeight = WINDOW_HEIGHT;

const particlePosX = 300;
const particlePosY = 0;
const particleRange = 100;
const particleheight = WINDOW_HEIGHT;

let directionForward = true;
let directionBackward = false;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(WINDOW_WIDTH, WINDOW_HEIGHT, "Particle_Detector");
    r.SetTargetFPS(targetFps);
}

function update() {
    if (directionForward) {
        scannerPosX = scannerPosX + 3;
    }
    else if (directionBackward) {
        scannerPosX = scannerPosX - 3;
    }

    if (scannerPosX + scannerRange > 1200) {
        directionBackward = true
        directionForward = false
    }

    if (scannerPosX < 0) {
        directionForward = true;
        directionBackward = false;
    }
}

function draw() {
    r.BeginDrawing();

    r.ClearBackground(r.BLACK);

    //particle
    r.DrawRectangle(particlePosX,particlePosY,particleRange,particleheight,r.BLUE);
    
    //scanner
    r.DrawRectangle(scannerPosX, scannerPosY, scannerRange, scannerHeight, r.WHITE);

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};