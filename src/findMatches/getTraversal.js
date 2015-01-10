var _ = require('../../server/public/libs/underscore.js');

var i = 0;
function reachableNeighbours (groups, cellID) {

    console.log(i, cellID)
    i++



    var traversableEdges = groups[cellID];
    var otherEdges = _.omit(groups, cellID);

    console.log(traversableEdges);
    console.log(otherEdges);


    return _.map(traversableEdges, function (cell) {
        return getTraversal(otherEdges, cell);
    });
}

function getTraversal (groups, cellID) {
    if (_.isEmpty(groups)) {
        return [ cellID ];
    }
    var x = _.flatten([
        cellID,
        reachableNeighbours(groups, cellID)
    ]);

    // var x = [cellID].concat()

    return _.uniq(x);
}

module.exports = getTraversal;

function benchmark (func, label) {
    var start = Date.now();
    var result = func();
    var finish = Date.now();
    var duration = finish - start;
    if (label) { console.log("(" + label + ") completed in " + duration + "ms")}
    return { value: result, time: duration };
}
