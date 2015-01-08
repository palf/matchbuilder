var checkForMatches = require('./checkForMatches');

function newMatchGame () {
    return _.times(6, function (y) {
        return _.times(6, function (x) {
            return 0;
        });
    });
}



function selectCell (puzzle, x, y) {
    var value = puzzle[y][x];
    if (value === 0) {
        puzzle[y][x] = 1;
    }
    checkForMatches(puzzle);
}


function render (puzzle) {
    var elements = $('.cell');
    _.each(puzzle, function (row, y) {
        _.each(row, function (value, x) {
            var i = x + 6 * y;
            var element = elements[i];
            $(element).html(value);
        });
    });
}


function bindInput (puzzle) {
    var elements = $('.cell');
    _.each(elements, function (element, index) {
        var x = index % 6;
        var y = Math.floor(index / 6);

        $(element).click(function () {
            selectCell(puzzle, x, y);
        });
    });
}


$(document).ready(function () {
    "use strict";

    var puzzle = newMatchGame();
    bindInput(puzzle);

    selectCell(puzzle, 0, 0);
    selectCell(puzzle, 1, 0);
    // selectCell(puzzle, 2, 0);

    render(puzzle);
});

