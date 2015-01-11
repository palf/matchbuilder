var _ = require('../server/public/libs/underscore.js');

var NONE = 0,
    ONE = 1,
    TWO = 2,
    THREE = 4,
    FOUR = 8,
    FIVE = 16;

function pointsValueOf (cell) {
    switch (cell.value) {
        case NONE:
            return 0;
        case ONE:
            return 1;
        case TWO:
            return 4;
        case THREE:
            return 16;
        case FOUR:
            return 64;
        case FIVE:
            return 256;
    }
}

function succ (value) {
    switch (value) {
        case NONE:
            return ONE;
        case ONE:
            return TWO;
        case TWO:
            return THREE;
        case THREE:
            return FOUR;
        case FOUR:
            return FIVE;
        case FIVE:
            return NONE;
    }
}




function adjacent (set, origin, target) {
    return set[target] === set[origin] - 1 ||
        set[target] === set[origin] + 1;
}

function same (set, origin, target) {
    return set[target] === set[origin];
}

function isHorizontalNeighbour (columns, rows, origin, target) {
    return adjacent(columns, origin, target) &&
        same(rows, origin, target);
}

function isVerticalNeighbour (columns, rows, origin, target) {
    return same(columns, origin, target) &&
        adjacent(rows, origin, target);
}

function getNeighbours (ids, columns, rows, id) {
    return _.filter(ids, function (target) {
        return isHorizontalNeighbour(columns, rows, id, target) ||
            isVerticalNeighbour(columns, rows, id, target);
    });
}

function buildPuzzleFrom (input) {
    var values = {};
    var ids = _.map(_.flatten(input), function (inputValue) {
        var id = _.uniqueId('cell_');
        values[id] = inputValue;
        return id;
    });

    var columns = {};
    var rows = {};

    var count = 0;
    _.each(input, function (inputRow, rowIndex) {
        _.each(inputRow, function (inputValue, columnIndex) {
            var id = ids[count];

            columns[id] = columnIndex;
            rows[id] = rowIndex;
            count ++;
        });
    })

    var paths = {};
    _.each(ids, function (id) {
        paths[id] = getNeighbours(ids, columns, rows, id);
    });

    return {
        ids: ids,
        values: values,
        paths: paths
    };
}


function newPuzzle () {
    var ids = _.times(36, function () {
        return _.uniqueId('cell_');
    });

    var values = {};
    _.each(ids, function (id) {
        values[id] = NONE;
    });

    var columns = {};
    var rows = {};
    _.each(ids, function (id, index) {
        columns[id] = index % 6;
        rows[id] = Math.floor(index / 6);
    });

    var paths = {};
    _.each(ids, function (id) {
        paths[id] = getNeighbours(ids, columns, rows, id);
    });

    return {
        ids: ids,
        values: values,
        paths: paths
    };
}

function increase (values, id) {
    values[id] = succ(values[id]);
    return values;
}

function reset (values, id) {
    values[id] = NONE;
    return values;
}

function matchable (value) {
    return value !== NONE;
}

function promote (values, id) {
    if (values[id] === NONE) {
        values[id] = ONE;
    }
    return values;
}

module.exports = {
    newPuzzle: newPuzzle,
    buildPuzzleFrom: buildPuzzleFrom,
    increase: increase,
    reset: reset,
    matchable: matchable,
    promote: promote,
    pointsValueOf: pointsValueOf
};
