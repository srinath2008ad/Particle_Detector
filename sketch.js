const r = require("raylib");
const geometry = require("./geometry")

const WINDOW_WIDTH = 1200;
const WINDOW_HEIGHT = 600;
const targetFps = 90;

let scannerPosX = 0;
const scannerPosY = 0;
const scannerRange = 50;
const scannerHeight = WINDOW_HEIGHT;
let scannerColor = r.WHITE;

let particle1PosX = 300;
const particle1PosY = 0;
const particle1Range = 100;
const particle1height = WINDOW_HEIGHT;

let particle2PosX = 700;
const particle2PosY = 0;
const particle2Range = 30;
const particle2height = WINDOW_HEIGHT;

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
    if (geometry.isScannerOverlapping(scannerPosX, scannerRange, particle1PosX, particle1Range) ||
        geometry.isScannerOverlapping(scannerPosX, scannerRange, particle2PosX, particle2Range)) {
        scannerColor = r.RED;
    }
    else {
        scannerColor = r.WHITE;
    }

    if (directionForward) {
        scannerPosX = scannerPosX + 3;
    }
    else if (directionBackward) {
        scannerPosX = scannerPosX - 3;
    }

    if (scannerPosX + scannerRange > WINDOW_WIDTH) {
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

    //particle1
    r.DrawRectangle(particle1PosX, particle1PosY, particle1Range, particle1height, r.BLUE);

    //particle2
    r.DrawRectangle(particle2PosX, particle2PosY, particle2Range, particle2height, r.BLUE);

    //scanner
    r.DrawRectangle(scannerPosX, scannerPosY, scannerRange, scannerHeight, scannerColor);

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