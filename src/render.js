var _ = require('../server/public/libs/underscore.js');

function renderValues (elementMap, values) {
    _.each(elementMap, function (element, index) {
        var value = values[index];
        $(element).html(value);
    });
}

function requestRender (elementMap, values) {
    requestAnimationFrame(function () {
        renderValues(elementMap, values);
    });
}

module.exports = requestRender;
