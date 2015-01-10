var _ = require('../server/public/libs/underscore.js');

var NONE = 0,
    ONE = 1,
    TWO = 2,
    THREE = 4,
    FOUR = 8,
    FIVE = 16;

function pointsValueOf (cell) {
    switch (cell.value) {
        case NONE:
            return 0;
        case ONE:
            return 1;
        case TWO:
            return 4;
        case THREE:
            return 16;
        case FOUR:
            return 64;
        case FIVE:
            return 256;
    }
}

function succ (value) {
    switch (value) {
        case NONE:
            return ONE;
        case ONE:
            return TWO;
        case TWO:
            return THREE;
        case THREE:
            return FOUR;
        case FOUR:
            return FIVE;
        case FIVE:
            return NONE;
    }
}

function Cell (x, y) {
    this.id = _.uniqueId('cell_');
    this.x = x;
    this.y = y;
    this.value = NONE;
}

function newPuzzle () {
    return _.flatten(_.times(6, function (y) {
        return _.times(6, function (x) {
            return new Cell(x, y);
        });
    }));
}

function increase (cell) {
    cell.value = succ(cell.value);
}

function reset (cell) {
    cell.value = NONE;
}

function isEmpty (cell) {
    return cell.value === NONE;
}

function promote (cell) {
    if (cell.value === NONE) {
        cell.value = ONE;
        return true;
    } else {
        return false;
    }
}

module.exports = {
    newPuzzle: newPuzzle,
    increase: increase,
    reset: reset,
    isEmpty: isEmpty,
    promote: promote,
    pointsValueOf: pointsValueOf
};
