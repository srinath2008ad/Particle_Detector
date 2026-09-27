const r = require("raylib");
const functions = require("./functions")

const WINDOW_WIDTH = 1200;
const WINDOW_HEIGHT = 600;
const targetFps = 90;

let scanner1PosX = 0;
const scanner1PosY = 0;
const scanner1Range = 100;
const scanner1Height = WINDOW_HEIGHT;
let scanner1Color = r.WHITE;
const scanner1Speed = 3;

let scanner2PosX = scanner1PosX + (WINDOW_WIDTH / 2);
const scanner2PosY = 0;
const scanner2Range = 100;
const scanner2Height = WINDOW_HEIGHT;
let scanner2Color = r.WHITE;
const scanner2Speed = 5;

const scanner3PosX = 0;
let scanner3PosY = 0;
const scanner3Range = 50;
const scanner3width = WINDOW_WIDTH;
let scanner3Color = r.WHITE;
const scanner3Speed = 5;

const particle1PosX = 100;
const particle1PosY = 0;
const particle1Range = 10;
const particle1height = WINDOW_HEIGHT;

const particle2PosX = 1000;
const particle2PosY = 0;
const particle2Range = 10;
const particle2height = WINDOW_HEIGHT;

const particle3PosX = 0;
const particle3PosY = 100;
const particle3Range = 10;
const particle3width = WINDOW_WIDTH;

let scanner1Forward = true;

let scanner2Forward = true;

let scanner3Downward = true;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(WINDOW_WIDTH, WINDOW_HEIGHT, "Particle_Detector");
    r.SetTargetFPS(targetFps);
}

function update() {
    let particle1Detected = false, particle2Detected = false;

    //Scanner 1 color
    scanner1Color = functions.isScannerOverlapping(scanner1PosX, scanner1Range, particle1PosX, particle1Range) ? r.RED : r.WHITE;

    //Scanner 2 color

    particle1Detected = functions.isScannerOverlapping(scanner2PosX, scanner2Range, particle1PosX, particle1Range)

    particle2Detected = functions.isScannerOverlapping(scanner2PosX, scanner2Range, particle2PosX, particle2Range);

    scanner2Color = particle1Detected || particle2Detected ? r.RED : r.WHITE;

    //scanner 3 color

    scanner3Color = functions.isScannerOverlapping(scanner3PosY, scanner3Range, particle3PosY, particle3Range) ? r.RED : r.WHITE;


    //scanner1 postioning logic

    scanner1PosX = functions.scannerPostioning(scanner1Forward, scanner1Speed, scanner1PosX)

    scanner1Forward = functions.scannerBoundaries(scanner1PosX, scanner1Range, 0, WINDOW_WIDTH / 2, scanner1Forward)

    //scanner2 postioning logic

    scanner2PosX = functions.scannerPostioning(scanner2Forward, scanner2Speed, scanner2PosX)

    scanner2Forward = functions.scannerBoundaries(scanner2PosX, scanner2Range, WINDOW_WIDTH / 2, WINDOW_WIDTH, scanner2Forward)

    //scanner3 positioning logic

    scanner3PosY = functions.scannerPostioning(scanner3Downward, scanner3Speed, scanner3PosY)

    // if (scanner3PosY + scanner3Range > WINDOW_HEIGHT) {
    //     scanner3Downward = false
    // }

    // else if (scanner3PosY < 0) {
    //     scanner3Downward = true;
    // }

    scanner3Downward = functions.scannerBoundaries(scanner3PosY, scanner3Range, 0, WINDOW_HEIGHT, scanner3Downward)

}

function draw() {
    r.BeginDrawing();

    r.ClearBackground(r.BLACK);

    //particle1
    r.DrawRectangle(particle1PosX, particle1PosY, particle1Range, particle1height, r.BLUE);

    //particle2
    r.DrawRectangle(particle2PosX, particle2PosY, particle2Range, particle2height, r.BLUE);

    //particle3
    r.DrawRectangle(particle3PosX, particle3PosY, particle3width, particle3Range, r.BLUE);

    //scanner1
    r.DrawRectangle(scanner1PosX, scanner1PosY, scanner1Range, scanner1Height, scanner1Color);

    //scanner2
    r.DrawRectangle(scanner2PosX, scanner2PosY, scanner2Range, scanner2Height, scanner2Color);

    //scanner3
    r.DrawRectangle(scanner3PosX, scanner3PosY, scanner3width, scanner3Range, scanner3Color);

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