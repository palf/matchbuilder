var _ = require('../server/public/libs/underscore.js');


var regex = /^value_\d+$/;
function matchesClassName (name) {
    return regex.test(name);
}

function replaceClassName (element, value) {
    var newClassName = "value_" + value;

    if (element.classList) {
        if (!element.classList.contains(newClassName)) {
            var oldClassNames = _.filter(element.classList, matchesClassName);
            _.each(oldClassNames, function (name) {
                element.classList.remove(name);
            });
            element.classList.add(newClassName);
        }
    } else {
        element.className = element.className.replace(regex, newClassName);
    }
}

function renderValues (elementMap, values) {
    _.each(elementMap, function (element, index) {
        var value = values[index];
        $(element).html(value);
        replaceClassName(element, value);
    });
}

function requestRender (elementMap, values) {
    requestAnimationFrame(function () {
        renderValues(elementMap, values);
    });
}

module.exports = requestRender;
