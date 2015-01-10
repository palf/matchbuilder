var _ = require('../../server/public/libs/underscore.js');

_.mixin({
    eachKey: function (list, iteratee) {
        var result = {};
        _.each(list, function (value, key) {
            result[key] = iteratee(value);
        });
        return result;
    }
});

function groupEdgesByOrigin (edgePairs) {
    return _.chain(edgePairs).
        groupBy('origin').
        eachKey(function (originatingPaths) {
            return _.pluck(originatingPaths, 'target');
        }).
        value();
}

module.exports = groupEdgesByOrigin;
