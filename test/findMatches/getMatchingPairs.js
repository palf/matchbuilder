var expect = require('expect.js');
var _ = require('../../server/public/libs/underscore.js');

var getMatchingPairs = require('../../src/findMatches/getMatchingPairs');

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

describe(".getMatchingPairs(puzzle)", function () {
    describe("when the puzzle is empty", function () {
        var puzzle = puzzleOf([]);

        it("returns an empty array", function () {
            var result = getMatchingPairs(puzzle);
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
            var result = getMatchingPairs(puzzle);
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
            var result = getMatchingPairs(puzzle);
            expect(result).to.have.length(2);
        });

        it("returns pairs as an origin and a target", function () {
            var result = getMatchingPairs(puzzle);
            expect(result).to.containMatch({
                origin: puzzle[0].id,
                target: puzzle[1].id
            });
            expect(result).to.containMatch({
                origin: puzzle[1].id,
                target: puzzle[0].id
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
            var result = getMatchingPairs(puzzle);
            expect(result).to.have.length(2);
        });

        it("returns pairs as an origin and a target", function () {
            var result = getMatchingPairs(puzzle);
            expect(result).to.containMatch({
                origin: puzzle[0].id,
                target: puzzle[3].id
            });
            expect(result).to.containMatch({
                origin: puzzle[3].id,
                target: puzzle[0].id
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
            var result = getMatchingPairs(puzzle);
            expect(result).to.have.length(4);
        });

        it("returns pairs as an origin and a target", function () {
            var result = getMatchingPairs(puzzle);
            expect(result).to.containMatch({
                origin: puzzle[0].id,
                target: puzzle[1].id
            });
            expect(result).to.containMatch({
                origin: puzzle[7].id,
                target: puzzle[8].id
            });
            expect(result).to.containMatch({
                origin: puzzle[1].id,
                target: puzzle[0].id
            });
            expect(result).to.containMatch({
                origin: puzzle[8].id,
                target: puzzle[7].id
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
            var result = getMatchingPairs(puzzle);
            expect(result).to.have.length(4);
        });

        it("returns pairs as an origin and a target", function () {
            var result = getMatchingPairs(puzzle);
            expect(result).to.containMatch({
                origin: puzzle[0].id,
                target: puzzle[3].id
            });
            expect(result).to.containMatch({
                origin: puzzle[5].id,
                target: puzzle[8].id
            });
            expect(result).to.containMatch({
                origin: puzzle[3].id,
                target: puzzle[0].id
            });
            expect(result).to.containMatch({
                origin: puzzle[8].id,
                target: puzzle[5].id
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
            var result = getMatchingPairs(puzzle);
            expect(result).to.have.length(6);
        });

        it("returns pairs as an origin and a target", function () {
            var result = getMatchingPairs(puzzle);
            expect(result).to.containMatch({
                origin: puzzle[0].id,
                target: puzzle[3].id
            });
            expect(result).to.containMatch({
                origin: puzzle[1].id,
                target: puzzle[2].id
            });
            expect(result).to.containMatch({
                origin: puzzle[4].id,
                target: puzzle[7].id
            });
            expect(result).to.containMatch({
                origin: puzzle[3].id,
                target: puzzle[0].id
            });
            expect(result).to.containMatch({
                origin: puzzle[2].id,
                target: puzzle[1].id
            });
            expect(result).to.containMatch({
                origin: puzzle[7].id,
                target: puzzle[4].id
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
            var result = getMatchingPairs(puzzle);
            expect(result).to.have.length(6);
        });

        it("returns pairs as an origin and a target", function () {
            var result = getMatchingPairs(puzzle);
            expect(result).to.containMatch({
                origin: puzzle[0].id,
                target: puzzle[1].id
            });
            expect(result).to.containMatch({
                origin: puzzle[1].id,
                target: puzzle[4].id
            });
            expect(result).to.containMatch({
                origin: puzzle[4].id,
                target: puzzle[5].id
            });
            expect(result).to.containMatch({
                origin: puzzle[1].id,
                target: puzzle[0].id
            });
            expect(result).to.containMatch({
                origin: puzzle[4].id,
                target: puzzle[1].id
            });
            expect(result).to.containMatch({
                origin: puzzle[5].id,
                target: puzzle[4].id
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
            var result = getMatchingPairs(puzzle);
            expect(result).to.have.length(2);
        });

        it("returns pairs as an origin and a target", function () {
            var result = getMatchingPairs(puzzle);
            expect(result).to.containMatch({
                origin: puzzle[3].id,
                target: puzzle[4].id
            });
            expect(result).to.containMatch({
                origin: puzzle[4].id,
                target: puzzle[3].id
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
            var result = getMatchingPairs(puzzle);
            expect(result).to.have.length(0);
        });
    });
});
