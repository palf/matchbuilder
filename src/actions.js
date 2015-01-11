var _ = require('../server/public/libs/underscore.js');
var Puzzle = require('./puzzle');
var findMatches = require('./findMatches');

function updateMatchedCells (values, matches, id) {
    _.each(matches, function (matchID) {
        if (matchID === id) {
            Puzzle.increase(values, matchID);
        } else {
            Puzzle.reset(values, matchID);
        }
    });
    return values;
}

function promoteAndMatch (puzzle, id) {
    Puzzle.promote(puzzle.values, id);
    var matches = findMatches(puzzle, id);

    var limit = 10;
    while (matches.length > 0 && limit > 0) {
        limit --;
        updateMatchedCells(puzzle.values, matches, id);
        matches = findMatches(puzzle, id);
    }
    return puzzle;
}

function setCell(puzzle, index, value) {
    var id = puzzle.ids[index];
    puzzle.values[id] = value;
    return puzzle;
}


module.exports = {
    promoteAndMatch: promoteAndMatch,
    setCell: setCell
};
