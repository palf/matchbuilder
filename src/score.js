var _ = require('../server/public/libs/underscore.js');
var Puzzle = require('./puzzle');

function getScore (puzzle) {
    return _.foldl(puzzle, function (a, b) {
        return a + Puzzle.pointsValueOf(b);
    }, 0);
}

module.exports = getScore;
