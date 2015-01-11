var _ = require('../server/public/libs/underscore.js');
var Puzzle = require('./puzzle');
var findMatches = require('./findMatches').byIndex;

function updateMatchedCells (matches, origin) {
    _.each(matches, function (match) {
        _.each(match, function (matchCell) {
            if (matchCell === origin) {
                Puzzle.increase(matchCell);
            } else {
                Puzzle.reset(matchCell);
            }
        });
    });
}

function promoteAndMatch (puzzle, index) {
    var cell = puzzle[index];
    var updated = Puzzle.promote(cell);
    if (updated) {
        var matches = findMatches(puzzle, index);
        while (!_.isEmpty(matches)) {
            updateMatchedCells(matches, cell);
            matches = findMatches(puzzle, index);
        }
    }
    return updated;
}

function setCell(puzzle, index, value) {
    var cell = puzzle[index];
    cell.value = value;
}


module.exports = {
    promoteAndMatch: promoteAndMatch,
    setCell: setCell
};
