function square(a, b) {
    return a ** b
}

function Distance(x1, y1, x2, y2) {
    return square((square((x2 - x1), 2) + square((y2 - y1), 2)), 0.5);
}

function add(x, y) {
    return x + y;
}   

function isScannerOverlapping(scannerPosX, scannerRange, particlePosX, particleRange) {
    if (add(scannerPosX, scannerRange) >= particlePosX && scannerPosX <= add(particlePosX, particleRange)) {
        return true;
    }
}

function scannerPostioning(forward, speed, scannerPosX) {
    if (forward) {
        return scannerPosX + speed;
    }
    else {
        return scannerPosX - speed;
    }
}

function scannerBoundaries(scannerPosX, scannerRange, boundary1, boundary2, forward) {
    if (forward && (scannerPosX + scannerRange > boundary2)) {
        return false
    }
    else if (!forward && (scannerPosX === boundary1)) {
        return true
    }
}

module.exports = {
    isScannerOverlapping,
    scannerPostioning,
    scannerBoundaries
}