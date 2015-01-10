var _ = require('../../server/public/libs/underscore.js');

function cannotMatchContent (cell) {
    return cell.value === 0;
}

function isLeftNeighbour (origin, target) {
    return target.x === origin.x - 1 &&
        target.y === origin.y;
}

function isUpNeighbour (origin, target) {
    return target.x === origin.x &&
        target.y === origin.y - 1;
}

function isRightNeighbour (origin, target) {
    return target.x === origin.x + 1 &&
        target.y === origin.y;
}

function isDownNeighbour (origin, target) {
    return target.x === origin.x &&
        target.y === origin.y + 1;
}

function getNeighbours (puzzle, cell) {
    return _.filter(puzzle, function (target) {
        return isLeftNeighbour(cell, target) ||
            isUpNeighbour(cell, target) ||
            isRightNeighbour(cell, target) ||
            isDownNeighbour(cell, target);
        });
}

function describeAsPair (cell, neighbour) {
    return { origin: cell.id, target: neighbour.id };
}

function hasSameContent (cell, neighbour) {
    return !!neighbour && neighbour.value === cell.value;
}

function getMatchingNeighbours (puzzle, cell) {
    var neighbours = getNeighbours(puzzle, cell);
    return _.chain(neighbours).
        filter(_.partial(hasSameContent, cell)).
        map(_.partial(describeAsPair, cell)).
        value();
}

function getMatchingPairs (puzzle) {
    return _.chain(puzzle).
        reject(cannotMatchContent).
        map(_.partial(getMatchingNeighbours, puzzle)).
        flatten().
        value();
}

module.exports = getMatchingPairs;
