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

    bindInput(puzzle);

    window.auto = auto;
    window.puzzle = puzzle;
});

