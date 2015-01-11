var expect = require('expect.js');
var _ = require('../server/public/libs/underscore.js');

var actions = require('../src/actions');

function benchmark (label, func) {
    var start = Date.now();
    var result = func();
    var finish = Date.now();
    return { value: result, time: finish - start };
}


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


describe(".promoteAndMatch(puzzle, index)", function () {
    var puzzle = puzzleOf([]);

    describe("when the puzzle is empty", function () {
        it("returns an empty array", function () {
            var result = actions.promoteAndMatch(puzzle, 0);
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
            var result = actions.promoteAndMatch(puzzle, 0);
            expect(result).to.be.empty();
        });
    });

    describe("when the puzzle has a horizontal match", function () {
        var puzzle = puzzleOf([
            [ 1, 1, 1 ],
            [ 0, 0, 0 ],
            [ 0, 0, 0 ]
        ]);

        it("returns an array of the matches", function () {
            var result = actions.promoteAndMatch(puzzle, 0);
            expect(result).to.have.length(1);
        });

        it("returns the matching elements as a set", function () {
            var result = actions.promoteAndMatch(puzzle, 0);
            var expectResultTo = expect(result[0]).to;
            expectResultTo.contain(puzzle[0]);
            expectResultTo.contain(puzzle[1]);
            expectResultTo.contain(puzzle[2]);
            expectResultTo.have.length(3);
        });
    });

    describe("when the puzzle has a vertical match", function () {
        var puzzle = puzzleOf([
            [ 1, 0, 0 ],
            [ 1, 0, 0 ],
            [ 1, 0, 0 ]
        ]);

        it("returns an array of the matches", function () {
            var result = actions.promoteAndMatch(puzzle, 0);
            expect(result).to.have.length(1);
        });

        it("returns the matching elements as a set", function () {
            var result = actions.promoteAndMatch(puzzle, 0);
            var expectResultTo = expect(result[0]).to;
            expectResultTo.contain(puzzle[0]);
            expectResultTo.contain(puzzle[3]);
            expectResultTo.contain(puzzle[6]);
            expectResultTo.have.length(3);
        });
    });

    describe("when the puzzle has a long horizontal match", function () {
        var puzzle = puzzleOf([
            [ 1, 1, 1, 1, 1 ],
            [ 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0 ]
        ]);

        it("returns an array of the matches", function () {
            var result = actions.promoteAndMatch(puzzle, 0);
            expect(result).to.have.length(1);
        });

        it("returns the matching elements as a set", function () {
            var result = actions.promoteAndMatch(puzzle, 0);
            var expectResultTo = expect(result[0]).to;
            expectResultTo.contain(puzzle[0]);
            expectResultTo.contain(puzzle[1]);
            expectResultTo.contain(puzzle[2]);
            expectResultTo.contain(puzzle[3]);
            expectResultTo.contain(puzzle[4]);
            expectResultTo.have.length(5);
        });
    });

    describe("when the puzzle has a long vertical match", function () {
        var puzzle = puzzleOf([
            [ 1, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0 ]
        ]);

        it("returns an array of the matches", function () {
            var result = actions.promoteAndMatch(puzzle, 0);
            expect(result).to.have.length(1);
        });

        it("returns the matching elements as a set", function () {
            var result = actions.promoteAndMatch(puzzle, 0);
            var expectResultTo = expect(result[0]).to;
            expectResultTo.contain(puzzle[0]);
            expectResultTo.contain(puzzle[5]);
            expectResultTo.contain(puzzle[10]);
            expectResultTo.contain(puzzle[15]);
            expectResultTo.contain(puzzle[20]);
            expectResultTo.have.length(5);
        });
    });

    describe("when the puzzle has a combination of linear matches", function () {
        var puzzle = puzzleOf([
            [ 0, 0, 1, 0, 0 ],
            [ 0, 0, 1, 0, 0 ],
            [ 1, 1, 1, 1, 1 ],
            [ 0, 0, 1, 0, 0 ],
            [ 0, 0, 1, 0, 0 ]
        ]);

        it("returns an array of the matches", function () {
            var result = actions.promoteAndMatch(puzzle, 0);
            expect(result).to.have.length(1);
        });

        it("returns the matching elements as a set", function () {
            var result = actions.promoteAndMatch(puzzle, 0);
            var expectResultTo = expect(result[0]).to;
            expectResultTo.contain(puzzle[2]);
            expectResultTo.contain(puzzle[7]);
            expectResultTo.contain(puzzle[10]);
            expectResultTo.contain(puzzle[11]);
            expectResultTo.contain(puzzle[12]);
            expectResultTo.contain(puzzle[13]);
            expectResultTo.contain(puzzle[14]);
            expectResultTo.contain(puzzle[17]);
            expectResultTo.contain(puzzle[22]);
            expectResultTo.have.length(9);
        });
    });

    describe("when the puzzle has multiple groups of matches", function () {
        var puzzle = puzzleOf([
            [ 1, 0, 1, 1, 1, 1 ],
            [ 0, 0, 0, 0, 0, 0 ],
            [ 1, 1, 0, 1, 1, 0 ],
            [ 1, 1, 0, 1, 0, 1 ],
            [ 1, 1, 0, 0, 1, 1 ],
            [ 0, 0, 1, 0, 0, 1 ]
        ]);

        it("returns an array of the matches", function () {
            var result = actions.promoteAndMatch(puzzle, 0);
            expect(result).to.have.length(4);
        });

        it("returns the matching elements as a set", function () {
            var result = actions.promoteAndMatch(puzzle, 0);
            var firstResultShould = expect(result[0]).to;
            firstResultShould.contain(puzzle[2]);
            firstResultShould.contain(puzzle[3]);
            firstResultShould.contain(puzzle[4]);
            firstResultShould.contain(puzzle[5]);
            firstResultShould.have.length(4);

            var secondResultShould = expect(result[1]).to;
            secondResultShould.contain(puzzle[12]);
            secondResultShould.contain(puzzle[13]);
            secondResultShould.contain(puzzle[18]);
            secondResultShould.contain(puzzle[19]);
            secondResultShould.contain(puzzle[24]);
            secondResultShould.contain(puzzle[25]);
            secondResultShould.have.length(6);

            var thirdResultShould = expect(result[2]).to;
            thirdResultShould.contain(puzzle[15]);
            thirdResultShould.contain(puzzle[16]);
            thirdResultShould.contain(puzzle[21]);
            thirdResultShould.have.length(3);

            var fourthResultShould = expect(result[3]).to;
            fourthResultShould.contain(puzzle[23]);
            fourthResultShould.contain(puzzle[28]);
            fourthResultShould.contain(puzzle[29]);
            fourthResultShould.contain(puzzle[35]);
            fourthResultShould.have.length(4);
        });
    });

    describe("timing", function () {
        var puzzle = puzzleOf([
            [ 1, 1, 0, 1, 1, 0, 1, 0 ],
            [ 1, 1, 0, 1, 1, 0, 0, 1 ],
            [ 0, 0, 0, 0, 0, 0, 0, 1 ],
            [ 1, 0, 1, 1, 0, 1, 0, 0 ],
            [ 1, 0, 1, 1, 0, 1, 0, 0 ],
            [ 1, 0, 1, 1, 0, 1, 0, 0 ],
            [ 0, 0, 1, 0, 0, 1, 1, 1 ],
            [ 1, 1, 0, 0, 1, 0, 1, 1 ]
        ]);

        it("returns a result within a frame", function () {
            var result = benchmark('promote & match', function () {
                actions.promoteAndMatch(puzzle, 0);
            });
            expect(result.time).to.be.lessThan(16);
        });

        var puzzle2 = puzzleOf([
            [ 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 1, 1, 1, 1, 1, 0, 1, 1 ],
            [ 1, 1, 1, 1, 0, 0, 0, 1 ]
        ]);

        it("returns a result within a frame", function () {
            var result = benchmark('promote & match', function () {
                actions.promoteAndMatch(puzzle, 0);
            });
            expect(result.time).to.be.lessThan(16);
        });
    });

    describe.only("timing", function () {
        var puzzle = puzzleOf([
            [ 1, 1, 2, 0, 0, 0, 0, 0 ],
            [ 4, 0, 2, 0, 0, 0, 0, 0 ],
            [ 4, 3, 3, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0 ]
        ]);

        it("returns a result within a frame", function () {
            var result = benchmark('promote & match', function () {
                return actions.promoteAndMatch(puzzle, 9);
            });
            expect(result).to.be.lessThan(16);
            expect(result.time).to.be.lessThan(1);
        });
    });
});
