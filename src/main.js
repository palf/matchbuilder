var _ = require('../server/public/libs/underscore.js');

_.mixin({
    eachKey: function (list, iteratee) {
        var result = {};
        _.each(list, function (value, key) {
            result[key] = iteratee(value);
        });
        return result;
    }
});

// var render = require('./render');
var actions = require('./actions');
// var getScore = require('./score');
var Puzzle = require('./puzzle');
var bindInput = require('./binding');
var auto = require('./auto');


$(document).ready(function () {
    "use strict";

    var puzzle = Puzzle.newPuzzle();

    actions.setCell(puzzle, 0, 1);
    actions.setCell(puzzle, 1, 1);
    actions.setCell(puzzle, 2, 2);
    actions.setCell(puzzle, 8, 2);
    actions.setCell(puzzle, 14, 4);
    actions.setCell(puzzle, 13, 4);
    actions.setCell(puzzle, 12, 8);
    actions.setCell(puzzle, 6, 8);

    bindInput(puzzle);

    // (function animloop() {
    //     render(puzzle);
    //     requestAnimationFrame(animloop);
    // })();

    window.auto = auto;
    window.puzzle = puzzle;
});

