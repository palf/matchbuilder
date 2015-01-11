var _ = require('../server/public/libs/underscore.js');

function getMatchingNeighbours (paths, values, id) {
    var allNeighbours = paths[id];
    var targetValue = values[id];
    return _.filter(allNeighbours, function (neighbour) {
        return values[neighbour] === targetValue;
    });
}

function getTraversalDeep (paths, values, visited, pending) {
    if (_.isEmpty(pending)) {
        return visited;
    }

    var next = _.first(pending);

    if (_.contains(visited, next)) {
        return visited;
    }

    var neighbours = getMatchingNeighbours(paths, values, next);

    var newVisited = visited.concat(next);
    var misc = _.union(pending, neighbours);
    var newPending = _.difference(misc, newVisited);

    return getTraversalDeep(paths, values, newVisited, newPending);
}

function getTraversal (paths, values, id) {
    if (!_.has(values, id)) {
        return [ id ];
    }
    var neighbours = getMatchingNeighbours(paths, values, id);
    return getTraversalDeep(paths, values, [ id ], neighbours );
}

module.exports = getTraversal;
