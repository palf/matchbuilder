var _ = require('../server/public/libs/underscore.js');

function render (puzzle) {
    var elements = $('.tile');
    _.each(puzzle, function (cell, index) {
        var element = elements[index];
        $(element).html(cell.value);
    });
}

module.exports = render;
