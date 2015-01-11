var Puzzle = require('./puzzle');
var getTraversal = require('./getTraversal');

function findMatches (puzzle, id) {
    var idValue = puzzle.values[id];
    if (idValue === undefined) {
        return [];
    }

    if (!Puzzle.matchable(idValue)) {
        return [];
    }

    var traversals = getTraversal(puzzle, id);
    if (traversals.length >= 3) {
        return traversals;
    } else {
        return [];
    }
}

module.exports = findMatches;
