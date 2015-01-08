var _ = require('../server/public/libs/underscore.js');


function checkForMatches (puzzle) {
    var matches = [];

    var allCells = _.flatten(puzzle);
    var pairs = getPairs(puzzle);

    console.log(_.flatten(_.reject(pairs, _.isEmpty)));

    // _.each(puzzle, function (row, y) {
    //     _.each(row, function (cell, x) {
    //         var neighbours = getNeighbours(puzzle, x, y);
    //     });
    // })

    return matches;
}

module.exports = checkForMatches;
