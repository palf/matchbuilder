var _ = require('../server/public/libs/underscore.js');
var Puzzle = require('./puzzle');
var findMatches = require('./findMatches');

function updateMatches (matches, origin) {
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

function selectCell (puzzle, index) {
    var start = Date.now();
    var cell = puzzle[index];
    var updated = Puzzle.promote(cell);
    if (updated) {
        var matches = findMatches(puzzle, index);
        while (!_.isEmpty(matches)) {
            updateMatches(matches, cell);
            matches = findMatches(puzzle, index);
        }
    }
    console.log(Date.now() - start);
}

function setCell(puzzle, index, value) {
    var cell = puzzle[index];
    cell.value = value;
}


module.exports = {
    selectCell: selectCell,
    setCell: setCell
};
