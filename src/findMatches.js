var _ = require('../server/public/libs/underscore.js');

var getMatchingPairs = require('./findMatches/getMatchingPairs');
var getTraversal = require('./findMatches/getTraversal');
var groupEdgesByOrigin = require('./findMatches/groupEdgesByOrigin');


function asCells (puzzle, cellIDs) {
    return _.map(cellIDs, function (cellID) {
        return _.find(puzzle, function (cell) {
            return cell.id === cellID;
        });
    });
}

function getAllTraversals (groups, ids) {
    if (_.isEmpty(ids)) {
        return [];

    } else {
        var id = _.first(ids);
        var traversal = getTraversal(groups, id);
        var remainder = _.difference(ids, traversal);
        return [ traversal ].concat(getAllTraversals(groups, remainder));
    }
}

function findMatches (puzzle) {
    var pairs = getMatchingPairs(puzzle);
    var groups = groupEdgesByOrigin(pairs);
    var allIDs = _.pluck(puzzle, 'id');

    var traversals = getAllTraversals(groups, allIDs);
    var filtered = _.filter(traversals, function (t) {
        return t.length >= 3;
    });

    return _.map(filtered, _.partial(asCells, puzzle));
}

module.exports = findMatches;
