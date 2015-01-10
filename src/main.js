var _ = require('../server/public/libs/underscore.js');

var render = require('./render');
var actions = require('./actions');
var getScore = require('./score');
var Puzzle = require('./puzzle');



function bindInput (puzzle) {
    var elements = $('.tile');
    var board = document.getElementById('board');
    var hammertime = new Hammer(board);

    hammertime.on('tap', function(ev) {
        var index = _.indexOf(elements, ev.target);
        if (index > -1) {
            actions.selectCell(puzzle, index);
        }
    });
}


function selectRandomEmpty (puzzle) {
    var empties = _.filter(puzzle, Puzzle.isEmpty);

    if (_.isEmpty(empties)) {
        return null;
    } else {
        var i = _.random(0, empties.length - 1);
        return _.indexOf(puzzle, empties[i]);
    }
}



$(document).ready(function () {
    "use strict";

    var puzzle = Puzzle.newPuzzle();
    bindInput(puzzle);

    actions.setCell(puzzle, 0, 1);
    actions.setCell(puzzle, 1, 1);
    actions.setCell(puzzle, 2, 2);
    actions.setCell(puzzle, 8, 2);
    actions.setCell(puzzle, 14, 4);
    actions.setCell(puzzle, 13, 4);
    actions.setCell(puzzle, 12, 8);
    actions.setCell(puzzle, 6, 8);

    (function animloop() {
        render(puzzle);
        requestAnimationFrame(animloop);
    })();

    function auto () {
        var v = setInterval(function () {
            var index = selectRandomEmpty(puzzle);
            if (index === null) {
                console.log('clear');
                console.log('score:', getScore(puzzle));
                clearInterval(v);
            } else {
                console.log('picking:', index);
                actions.selectCell(puzzle, index);
            }
        }, 32);
    }

    window.auto = auto;
    window.puzzle = puzzle;
});

