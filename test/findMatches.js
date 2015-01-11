var expect = require('expect.js');
var _ = require('../server/public/libs/underscore.js');

var findMatches = require('../src/findMatches');
var buildPuzzleFrom = require('../src/puzzle').buildPuzzleFrom;

function benchmark (label, func) {
    var start = Date.now();
    var result = func();
    var finish = Date.now();
    return { value: result, time: finish - start };
}

describe(".findMatches(puzzle)", function () {
    var puzzle = buildPuzzleFrom([]);

    describe("when the puzzle is empty", function () {
        it("returns an empty array", function () {
            var result = findMatches(puzzle, puzzle.ids[0]);
            expect(result).to.be.empty();
        });
    });

    describe("when the puzzle has no values", function () {
        var puzzle = buildPuzzleFrom([
            [ 0, 0, 0 ],
            [ 0, 0, 0 ],
            [ 0, 0, 0 ]
        ]);

        it("returns no matches", function () {
            var result = findMatches(puzzle, puzzle.ids[0]);
            expect(result).to.be.empty();
        });
    });

    describe("when the puzzle has a horizontal match", function () {
        var puzzle = buildPuzzleFrom([
            [ 1, 1, 1 ],
            [ 0, 0, 0 ],
            [ 0, 0, 0 ]
        ]);

        it("returns an array of the matches", function () {
            var result = findMatches(puzzle, puzzle.ids[0]);
            expect(result).to.contain(puzzle.ids[0]);
            expect(result).to.contain(puzzle.ids[1]);
            expect(result).to.contain(puzzle.ids[2]);
            expect(result).to.have.length(3);
        });
    });

    describe("when the puzzle has a vertical match", function () {
        var puzzle = buildPuzzleFrom([
            [ 1, 0, 0 ],
            [ 1, 0, 0 ],
            [ 1, 0, 0 ]
        ]);

        it("returns an array of the matches", function () {
            var result = findMatches(puzzle, puzzle.ids[0]);
            expect(result).to.contain(puzzle.ids[0]);
            expect(result).to.contain(puzzle.ids[3]);
            expect(result).to.contain(puzzle.ids[6]);
            expect(result).to.have.length(3);
        });
    });

    describe("when the puzzle has a long horizontal match", function () {
        var puzzle = buildPuzzleFrom([
            [ 1, 1, 1, 1, 1 ],
            [ 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0 ]
        ]);

        it("returns an array of the matches", function () {
            var result = findMatches(puzzle, puzzle.ids[0]);
            expect(result).to.contain(puzzle.ids[0]);
            expect(result).to.contain(puzzle.ids[1]);
            expect(result).to.contain(puzzle.ids[2]);
            expect(result).to.contain(puzzle.ids[3]);
            expect(result).to.contain(puzzle.ids[4]);
            expect(result).to.have.length(5);
        });
    });

    describe("when the puzzle has a long vertical match", function () {
        var puzzle = buildPuzzleFrom([
            [ 1, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0 ],
            [ 1, 0, 0, 0, 0 ]
        ]);

        it("returns an array of the matches", function () {
            var result = findMatches(puzzle, puzzle.ids[0]);
            expect(result).to.contain(puzzle.ids[0]);
            expect(result).to.contain(puzzle.ids[5]);
            expect(result).to.contain(puzzle.ids[10]);
            expect(result).to.contain(puzzle.ids[15]);
            expect(result).to.contain(puzzle.ids[20]);
            expect(result).to.have.length(5);
        });
    });

    describe("when the puzzle has a combination of linear matches", function () {
        var puzzle = buildPuzzleFrom([
            [ 0, 0, 1, 0, 0 ],
            [ 0, 0, 1, 0, 0 ],
            [ 1, 1, 1, 1, 1 ],
            [ 0, 0, 1, 0, 0 ],
            [ 0, 0, 1, 0, 0 ]
        ]);

        it("returns an array of the matches", function () {
            var result = findMatches(puzzle, puzzle.ids[2]);
            expect(result).to.contain(puzzle.ids[2]);
            expect(result).to.contain(puzzle.ids[7]);
            expect(result).to.contain(puzzle.ids[10]);
            expect(result).to.contain(puzzle.ids[11]);
            expect(result).to.contain(puzzle.ids[12]);
            expect(result).to.contain(puzzle.ids[13]);
            expect(result).to.contain(puzzle.ids[14]);
            expect(result).to.contain(puzzle.ids[17]);
            expect(result).to.contain(puzzle.ids[22]);
            expect(result).to.have.length(9);
        });
    });

    describe("when the puzzle has multiple groups of matches", function () {
        var puzzle = buildPuzzleFrom([
            [ 1, 0, 1, 1, 1, 1 ],
            [ 0, 0, 0, 0, 0, 0 ],
            [ 1, 1, 0, 1, 1, 0 ],
            [ 1, 1, 0, 1, 0, 1 ],
            [ 1, 1, 0, 0, 1, 1 ],
            [ 0, 0, 1, 0, 0, 1 ]
        ]);

        it("returns the matching elements as a set", function () {
            var result = findMatches(puzzle, puzzle.ids[4]);
            expect(result).to.contain(puzzle.ids[2]);
            expect(result).to.contain(puzzle.ids[3]);
            expect(result).to.contain(puzzle.ids[4]);
            expect(result).to.contain(puzzle.ids[5]);
            expect(result).to.have.length(4);
        });

        it("returns the matching elements as a set", function () {
            var result = findMatches(puzzle, puzzle.ids[13]);
            expect(result).to.contain(puzzle.ids[12]);
            expect(result).to.contain(puzzle.ids[13]);
            expect(result).to.contain(puzzle.ids[18]);
            expect(result).to.contain(puzzle.ids[19]);
            expect(result).to.contain(puzzle.ids[24]);
            expect(result).to.contain(puzzle.ids[25]);
            expect(result).to.have.length(6);
        });

        it("returns the matching elements as a set", function () {
            var result = findMatches(puzzle, puzzle.ids[15]);
            expect(result).to.contain(puzzle.ids[15]);
            expect(result).to.contain(puzzle.ids[16]);
            expect(result).to.contain(puzzle.ids[21]);
            expect(result).to.have.length(3);
        });

        it("returns the matching elements as a set", function () {
            var result = findMatches(puzzle, puzzle.ids[29]);
            expect(result).to.contain(puzzle.ids[23]);
            expect(result).to.contain(puzzle.ids[28]);
            expect(result).to.contain(puzzle.ids[29]);
            expect(result).to.contain(puzzle.ids[35]);
            expect(result).to.have.length(4);
        });
    });

    describe("performance", function () {
        var puzzle = buildPuzzleFrom([
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
            var result = benchmark('findMatches', function () {
                findMatches(puzzle, puzzle.ids[0]);
            });
            expect(result.time).to.be.lessThan(2);
        });

        var puzzle2 = buildPuzzleFrom([
            [ 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 1, 1, 1, 1, 1, 0, 1, 1 ],
            [ 1, 1, 1, 1, 0, 0, 0, 1 ]
        ]);

        it("returns a result within a frame", function () {
            var result = benchmark('findMatches', function () {
                findMatches(puzzle2);
            });
            expect(result.time).to.be.lessThan(2);
        });

        var puzzle3 = buildPuzzleFrom([
            [ 1, 1, 2, 0, 0, 0, 0, 0 ],
            [ 4, 1, 2, 0, 0, 0, 0, 0 ],
            [ 4, 3, 3, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0 ]
        ]);

        it("returns a result within a frame", function () {
            var result = benchmark('findMatches', function () {
                findMatches(puzzle3, puzzle.ids[0]);
            });
            expect(result.time).to.be.lessThan(2);
        });
    });
});
