var _ = require('../server/public/libs/underscore.js');

var render = require('./render');
var actions = require('./actions');
var getScore = require('./score');
var Puzzle = require('./puzzle');


var store;
function mark (label) {
    store = {
        name: label,
        time: Date.now()
    };
}

function recall () {
    var diff = Date.now() - store.time;
    // console.log(store.name);
    $('#log').html(diff + 'ms');
}

function bindInput (puzzle) {
    var elements = $('.tile');
    // var board = document.getElementById('board');
    // var hammertime = new Hammer(board);

    _.each(elements, function (el, index) {
        var hammer = new Hammer(el);
        hammer.on('tap', function () {
            mark(index);
            actions.promoteAndMatch(puzzle, index);
            recall();
        });
    })
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
                clearInterval(v);
            } else {
                actions.promoteAndMatch(puzzle, index);
            }
        }, 32);
    }

    window.auto = auto;
    window.puzzle = puzzle;
});

