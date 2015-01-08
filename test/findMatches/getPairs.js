var expect = require('expect.js');
var _ = require('../../server/public/libs/underscore.js');

expect.Assertion.prototype.containMatch = function (expected) {
    var matches = _.filter(this.obj, function (content) {
        return expect.eql(content, expected);
    });

    this.assert(
        matches.length > 0,
        function () { return "did not find a match for " + expected; },
        function () { return "found match! did not expect to"; }
    );

    return this;
};

var getPairs = require('../../src/findMatches/getPairs');


function puzzleOf (values) {
    return _.chain(values).
        map(function (row, yIndex) {
            return _.map(row, function (value, xIndex) {
                return {
                    id: _.uniqueId('cell_'),
                    x: xIndex,
                    y: yIndex,
                    value: value
                };
            });
        }).
        flatten().
        value();
}

var a = {},
    b = {},
    c = {};

describe(".getPairs(puzzle)", function () {
    describe("when the puzzle is empty", function () {
        var puzzle = puzzleOf([]);

        it("returns an empty array", function () {
            var result = getPairs(puzzle);
            expect(result).to.be.empty();
        });
    });

    describe("when the puzzle has no values", function () {
        var puzzle = puzzleOf([
            [ 0, 0, 0 ],
            [ 0, 0, 0 ],
            [ 0, 0, 0 ]
        ]);

        it("returns no matches", function () {
            var result = getPairs(puzzle);
            expect(result).to.be.empty();
        });
    });

    describe("when the puzzle has a horizontal match", function () {
        var puzzle = puzzleOf([
            [ a, a, 0 ],
            [ 0, 0, 0 ],
            [ 0, 0, 0 ]
        ]);

        it("returns an array of the matches", function () {
            var result = getPairs(puzzle);
            expect(result).to.have.length(1);
        });

        it("returns pairs as an origin and a target", function () {
            var result = getPairs(puzzle);
            expect(result).to.containMatch({
                origin: puzzle[0],
                target: puzzle[1]
            });
        });
    });

    describe("when the puzzle has a vertical match", function () {
        var puzzle = puzzleOf([
            [ a, 0, 0 ],
            [ a, 0, 0 ],
            [ 0, 0, 0 ]
        ]);

        it("returns an array of the matches", function () {
            var result = getPairs(puzzle);
            expect(result).to.have.length(1);
        });

        it("returns pairs as an origin and a target", function () {
            var result = getPairs(puzzle);
            expect(result).to.containMatch({
                origin: puzzle[0],
                target: puzzle[3]
            });
        });
    });

    describe("when the puzzle has many horizontal matches", function () {
        var puzzle = puzzleOf([
            [ a, a, 0 ],
            [ 0, 0, 0 ],
            [ 0, a, a ]
        ]);

        it("returns an array of the matches", function () {
            var result = getPairs(puzzle);
            expect(result).to.have.length(2);
        });

        it("returns pairs as an origin and a target", function () {
            var result = getPairs(puzzle);
            expect(result).to.containMatch({
                origin: puzzle[0],
                target: puzzle[1]
            });
            expect(result).to.containMatch({
                origin: puzzle[7],
                target: puzzle[8]
            });
        });
    });

    describe("when the puzzle has many vertical matches", function () {
        var puzzle = puzzleOf([
            [ a, 0, 0 ],
            [ a, 0, a ],
            [ 0, 0, a ]
        ]);

        it("returns an array of the matches", function () {
            var result = getPairs(puzzle);
            expect(result).to.have.length(2);
        });

        it("returns pairs as an origin and a target", function () {
            var result = getPairs(puzzle);
            expect(result).to.containMatch({
                origin: puzzle[0],
                target: puzzle[3]
            });
            expect(result).to.containMatch({
                origin: puzzle[5],
                target: puzzle[8]
            });
        });
    });

    describe("when the puzzle has different match values", function () {
        var puzzle = puzzleOf([
            [ a, c, c ],
            [ a, b, 0 ],
            [ 0, b, 0 ]
        ]);

        it("returns an array of the matches", function () {
            var result = getPairs(puzzle);
            expect(result).to.have.length(3);
        });

        it("returns pairs as an origin and a target", function () {
            var result = getPairs(puzzle);
            expect(result).to.containMatch({
                origin: puzzle[0],
                target: puzzle[3]
            });
            expect(result).to.containMatch({
                origin: puzzle[1],
                target: puzzle[2]
            });
            expect(result).to.containMatch({
                origin: puzzle[4],
                target: puzzle[7]
            });
            expect(result).to.not.containMatch({
                origin: puzzle[0],
                target: puzzle[1]
            });
        });
    });

    describe("when the puzzle has overlapping matches", function () {
        var puzzle = puzzleOf([
            [ a, a, 0 ],
            [ 0, a, a ],
            [ 0, 0, 0 ]
        ]);

        it("returns an array of the matches", function () {
            var result = getPairs(puzzle);
            expect(result).to.have.length(3);
        });

        it("returns pairs as an origin and a target", function () {
            var result = getPairs(puzzle);
            expect(result).to.containMatch({
                origin: puzzle[0],
                target: puzzle[1]
            });
            expect(result).to.containMatch({
                origin: puzzle[1],
                target: puzzle[4]
            });
            expect(result).to.containMatch({
                origin: puzzle[4],
                target: puzzle[5]
            });
        });
    });

    describe("when the puzzle has a convex non-uniform shape", function () {
        var puzzle = puzzleOf([
            [ 0, 0 ],
            [ 0, a, a ],
            [ 0, 0 ]
        ]);

        it("returns an array of the matches", function () {
            var result = getPairs(puzzle);
            expect(result).to.have.length(1);
        });

        it("returns pairs as an origin and a target", function () {
            var result = getPairs(puzzle);
            expect(result).to.containMatch({
                origin: puzzle[3],
                target: puzzle[4]
            });
        });
    });

    describe("when the puzzle has a concave non-uniform shape", function () {
        var puzzle = puzzleOf([
            [ 0, 0, a ],
            [ 0, 0 ],
            [ 0, 0, a ]
        ]);

        it("returns an array of the matches", function () {
            var result = getPairs(puzzle);
            expect(result).to.have.length(0);
        });
    });
});
