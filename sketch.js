const r = require("raylib");
const functions = require("./scanner")

let s1 = require("./scanner1");
let s2 = require("./scanner2");
let s3 = require("./scanner3");

let p1 = require("./particle1");
let p2 = require("./particle2");
let p3 = require("./particle3");

const screen = require("./screen");

function setup() {
    r.InitWindow(screen.WINDOW_WIDTH, screen.WINDOW_HEIGHT, "Particle_Detector");
    r.SetTargetFPS(screen.FPS);
    r.SetTraceLogLevel(r.LOG_NONE);
}

function running() {
    return !r.WindowShouldClose();
}

function update() {

    s1.Color = functions.chooseColor(s1.PosX, s1.Range, p1.PosX, p1.Range, p2.PosX, p2.Range)

    s2.Color = functions.chooseColor(s2.PosX, s2.Range, p1.PosX, p1.Range, p2.PosX, p2.Range)

    s3.Color = functions.isScannerOverlapping(s3.PosY, s3.Range, p3.PosY, p3.Range);


    s1.PosX = functions.updateScannerPostion(s1.Speed, s1.PosX)

    s1.Speed = functions.isScannerWithinBoundaries(s1.PosX, s1.Range, 0, screen.WINDOW_WIDTH / 2) ? s1.Speed : -s1.Speed


    s2.PosX = functions.updateScannerPostion(s2.Speed, s2.PosX)

    s2.Speed = functions.isScannerWithinBoundaries(s2.PosX, s2.Range, screen.WINDOW_WIDTH / 2, screen.WINDOW_WIDTH, s2.Speed) ? s2.Speed : -s2.Speed


    s3.PosY = functions.updateScannerPostion(s3.Speed, s3.PosY)

    s3.Speed = functions.isScannerWithinBoundaries(s3.PosY, s3.Range, 0, screen.WINDOW_HEIGHT, s3.Speed) ? s3.Speed : -s3.Speed

}

function createHorizontalRange(PosY, range, color) {
    r.DrawRectangle(0, PosY, screen.WINDOW_WIDTH, range, color);
}

function createVerticalRange(PosX, range, color) {
    r.DrawRectangle(PosX, 0, range, screen.WINDOW_HEIGHT, color);
}

function draw() {

    r.BeginDrawing();

    r.ClearBackground(r.BLACK);

    createVerticalRange(p1.PosX, p1.Range, r.SKYBLUE)

    createVerticalRange(p2.PosX, p2.Range, r.SKYBLUE)

    createHorizontalRange(p3.PosY, p3.Range, r.SKYBLUE)


    createVerticalRange(s1.PosX, s1.Range, s1.Color ? r.RED : r.WHITE)

    createVerticalRange(s2.PosX, s2.Range, s2.Color ? r.RED : r.WHITE)

    createHorizontalRange(s3.PosY, s3.Range, s3.Color ? r.RED : r.WHITE)

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