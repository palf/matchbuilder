var _ = require('../server/public/libs/underscore.js');

function getMatchingNeighbours (puzzle, id) {
    var allNeighbours = puzzle.paths[id];
    var targetValue = puzzle.values[id];
    return _.filter(allNeighbours, function (neighbour) {
        return puzzle.values[neighbour] === targetValue;
    });
}

function getTraversalDeep (puzzle, visited, pending) {
    if (_.isEmpty(pending)) {
        return visited;
    }

    var next = _.first(pending);

    if (_.contains(visited, next)) {
        return visited;
    }

    var neighbours = getMatchingNeighbours(puzzle, next);

    var newVisited = visited.concat(next);
    var misc = _.union(pending, neighbours);
    var newPending = _.difference(misc, newVisited);

    return getTraversalDeep(puzzle, newVisited, newPending);
}

function getTraversal (puzzle, id) {
    if (!_.has(puzzle.values, id)) {
        return [ id ];
    }
    var neighbours = getMatchingNeighbours(puzzle, id);
    return getTraversalDeep(puzzle, [ id ], neighbours );
}

module.exports = getTraversal;
