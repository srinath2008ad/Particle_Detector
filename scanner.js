function add(x, y) {
    return x + y;
}

function isScannerOverlapping(sPosX, sRange, pPosX, pRange) {
    return add(sPosX, sRange) >= pPosX && sPosX <= add(pPosX, pRange);
}

function updateScannerPostion(speed, sPosX) {
    return add(sPosX, speed);
}

function isScannerWithinBoundaries(sPosX, sRange, boundary1, boundary2) {
    return sPosX > boundary1 && add(sPosX, sRange) < boundary2;
}

function chooseColor(s2PosX, s2Range, p1PosX, p1Range, p2PosX, p2Range) {

    const p1Detected = isScannerOverlapping(s2PosX, s2Range, p1PosX, p1Range);
    
    const p2Detected = isScannerOverlapping(s2PosX, s2Range, p2PosX, p2Range);

    return p1Detected || p2Detected;
}


module.exports = {
    isScannerOverlapping,
    updateScannerPostion,
    isScannerWithinBoundaries,
    chooseColor
}