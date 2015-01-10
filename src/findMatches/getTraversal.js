var _ = require('../../server/public/libs/underscore.js');

function getNeighbours (groups, id) {
    return groups[id] || [];
}


function getTraversalDeep (groups, visited, pending) {
    if (_.isEmpty(pending)) {
        return visited;
    }

    var next = _.first(pending);

    if (_.contains(visited, next)) {
        return visited;
    }

    var neighbours = getNeighbours(groups, next);

    var newVisited = visited.concat(next);
    var misc = _.union(pending, neighbours);
    var newPending = _.difference(misc, newVisited);

    return getTraversalDeep(groups, newVisited, newPending);
}

function getTraversal (groups, id) {
    return getTraversalDeep(groups, [ id ], getNeighbours(groups, id) );
}

module.exports = getTraversal;
