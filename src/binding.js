var _ = require('../server/public/libs/underscore.js');

var requestRender = require('./render');
var actions = require('./actions');

function bindInput (puzzle) {
    var elements = $('.tile');
    // var board = document.getElementById('board');
    // var hammertime = new Hammer(board);

    var elementMapping = {};
    _.each(puzzle.ids, function (id, index) {
        var element = elements[index];
        elementMapping[id] = element;

        var hammer = new Hammer(element);
        hammer.on('tap', function (ev) {
            ev.preventDefault();
            console.log(ev)
            actions.promoteAndMatch(puzzle, id);
            requestRender(elementMapping, puzzle.values);
        });
    });

    requestRender(elementMapping, puzzle.values);
}

module.exports = bindInput;
