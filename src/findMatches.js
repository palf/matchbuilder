var _ = require('../server/public/libs/underscore.js');

var getMatchingPairs = require('./findMatches/getMatchingPairs');
var getTraversal = require('./findMatches/getTraversal');
var groupEdgesByOrigin = require('./findMatches/groupEdgesByOrigin');


function asCells (puzzle, cellIDs) {
    return _.map(cellIDs, function (cellID) {
        return _.find(puzzle, function (cell) {
            return cell.id === cellID;
        });
        return cellID;
    });
}

function getAllTraversals (ids, groups) {
    if (_.isEmpty(ids)) {
        return [];

    } else {
        var id = _.first(ids)
        var traversal = benchmark("traversal " + id, _.partial(getTraversal, groups, id));
        // var traversal = getTraversal(groups, id);
        var remainder = _.difference(ids, traversal);

        return [ traversal ].concat(getAllTraversals(remainder, groups));
    }
}

function findMatches (puzzle) {
    var pairs = benchmark("pairs", _.partial(getMatchingPairs, puzzle));
    var groups = benchmark("group edges", _.partial(groupEdgesByOrigin, pairs));
    var allIDs = _.pluck(puzzle, 'id');

    var traversals = benchmark("all traversals", _.partial(getAllTraversals, allIDs, groups));
    var filtered = _.filter(traversals, function (t) {
        return t.length >= 3;
    })

    return _.map(filtered, _.partial(asCells, puzzle));
}



function benchmark (label, func) {
    var start = Date.now();
    var result = func();
    var finish = Date.now();
    var time = finish - start;
    console.log("(" + label + ") completed in: " + time + "ms");
    return result;
}


module.exports = findMatches;
