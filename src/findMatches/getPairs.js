var _ = require('../../server/public/libs/underscore.js');

function valueOf (cell) {
    return cell.value;
}

function getNeighbours (puzzle, cell) {
    return _.filter(puzzle, function (target) {
        return isRightNeighbour(cell, target) ||
            isDownNeighbour(cell, target);
        });
}

function isRightNeighbour (origin, target) {
    return target.x === origin.x + 1 &&
        target.y === origin.y;
}

function isDownNeighbour (origin, target) {
    return target.x === origin.x &&
        target.y === origin.y + 1;
}


function getPairs (puzzle) {
    return _.chain(puzzle).
        map(function (cell, index) {

            if (valueOf(cell) === 0) {
                // ignore cell
                return [];
            } else {
                var neighbours = getNeighbours(puzzle, cell);

                var set = _.filter(neighbours, function (neighbour) {
                    return !!neighbour && neighbour.value === cell.value;
                });

                var t =  _.map(set, function (neighbour) {
                    return { origin: cell, target: neighbour };
                });

                return t;
            }
        }).
        reject(_.isEmpty).
        flatten().
        value();
}

module.exports = getPairs;
