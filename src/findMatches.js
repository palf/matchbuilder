var Puzzle = require('./puzzle');
var getTraversal = require('./getTraversal');

function findMatches (paths, values, id) {
    if (values[id] === undefined) {
        return [];
    }

    if (!Puzzle.matchable(values[id])) {
        return [];
    }

    var traversals = getTraversal(paths, values, id);
    if (traversals.length >= 3) {
        return traversals;
    } else {
        return [];
    }
}

module.exports = findMatches;
