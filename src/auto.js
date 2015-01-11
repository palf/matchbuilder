var _ = require('../server/public/libs/underscore.js');

var render = require('./render');
var actions = require('./actions');
var Puzzle = require('./puzzle');

function selectRandomEmpty (puzzle) {
    var matchables = _.filter(puzzle, Puzzle.matchable);

    if (_.isEmpty(matchables)) {
        return null;
    } else {
        var i = _.random(0, matchables.length - 1);
        return _.indexOf(puzzle, matchables[i]);
    }
}

function auto (puzzle) {
    var v = setInterval(function () {
        var index = selectRandomEmpty(puzzle);
        if (index === null) {
            clearInterval(v);
        } else {
            var newValues = actions.promoteAndMatch(puzzle, index);
            render(newValues);
        }
    }, 32);
}

module.exports = auto;
