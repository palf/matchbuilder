var _ = require('../server/public/libs/underscore.js');

var render = require('./render');
var actions = require('./actions');


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

    var elementMapping = {};
    _.each(puzzle.ids, function (id, index) {
        var element = elements[index];
        elementMapping[id] = element;

        var hammer = new Hammer(element);
        hammer.on('tap', function () {
            mark(index);
            actions.promoteAndMatch(puzzle, id);
            recall();
            render(elementMapping, puzzle.values);
        });
    });
}

module.exports = bindInput;
