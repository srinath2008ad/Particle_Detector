const r = require("raylib");
const functions = require("./functions")

const WINDOW_WIDTH = 1200;
const WINDOW_HEIGHT = 600;
const targetFps = 90;

let scanner1PosX = 0;
const scanner1PosY = 0;
const scanner1Range = 50;
const scanner1Height = WINDOW_HEIGHT;
let scanner1Color = r.WHITE;
const scanner1Speed = 5;

let scanner2PosX = scanner1PosX + (WINDOW_WIDTH / 2);
const scanner2PosY = 0;
const scanner2Range = 50;
const scanner2Height = WINDOW_HEIGHT;
let scanner2Color = r.WHITE;
const scanner2Speed = 3;

let particle1PosX = 300;
const particle1PosY = 0;
const particle1Range = 500;
const particle1height = WINDOW_HEIGHT;

let particle2PosX = 1000;
const particle2PosY = 0;
const particle2Range = 100;
const particle2height = WINDOW_HEIGHT;

let scanner1Forward = true;

let scanner2Forward = true;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(WINDOW_WIDTH, WINDOW_HEIGHT, "Particle_Detector");
    r.SetTargetFPS(targetFps);
}

function update() {

    //Scanner 1 color
    scanner1Color = functions.isScannerOverlapping(scanner1PosX, scanner1Range, particle1PosX, particle1Range)?r.RED:r.WHITE;

    //Scanner 2 color
    scanner2Color = functions.isScannerOverlapping(scanner2PosX, scanner2Range, particle1PosX, particle1Range) || functions.isScannerOverlapping(scanner2PosX, scanner2Range, particle2PosX, particle2Range) ? r.RED : r.WHITE;

    //scanner1 postioning logic

    scanner1PosX = functions.scannerPostioning(scanner1Forward, scanner1Speed, scanner1PosX)

    if (scanner1PosX + scanner1Range > WINDOW_WIDTH / 2) {
        scanner1Forward = false
    }
    else if (scanner1PosX < 0) {
        scanner1Forward = true;
    }

    //scanner2 postioning logic

    scanner2PosX = functions.scannerPostioning(scanner2Forward, scanner2Speed, scanner2PosX)

    if (scanner2PosX + scanner2Range > WINDOW_WIDTH) {
        scanner2Forward = false
    }

    else if (scanner2PosX < WINDOW_WIDTH / 2) {
        scanner2Forward = true;
    }
}

function draw() {
    r.BeginDrawing();

    r.ClearBackground(r.BLACK);

    //particle1
    r.DrawRectangle(particle1PosX, particle1PosY, particle1Range, particle1height, r.BLUE);

    //particle2
    r.DrawRectangle(particle2PosX, particle2PosY, particle2Range, particle2height, r.BLUE);

    //scanner1
    r.DrawRectangle(scanner1PosX, scanner1PosY, scanner1Range, scanner1Height, scanner1Color);

    //scanner2
    r.DrawRectangle(scanner2PosX, scanner2PosY, scanner2Range, scanner2Height, scanner2Color);

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