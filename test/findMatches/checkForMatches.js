// var expect = require('expect.js');

// var check = require('../src/checkForMatches').checkForMatches;
// var getPairs = require('../src/checkForMatches').getPairs;

// var _ = require('../server/public/libs/underscore.js');

// function puzzleOf (values) {
//     var id = 0;
//     return _.map(values, function (row, j) {
//         id += j;
//         return _.map(row, function (value, i) {
//             id += i;
//             return {
//                 value: value,
//                 id: id
//             };
//         })
//     });
// }

// var emptyPuzzle = puzzleOf([]);
// var noValuesPuzzle = puzzleOf([
//     [ 0, 0, 0 ],
//     [ 0, 0, 0 ],
//     [ 0, 0, 0 ]
// ]);
// var puzzleWithHorizontalMatch = puzzleOf([
//     [ 1, 1, 1 ],
//     [ 0, 0, 0 ],
//     [ 0, 0, 0 ]
// ]);


// describe(".checkForMatches(puzzle)", function () {
//     var puzzle;

//     beforeEach(function () {
//         puzzle = null;
//     });

//     describe("when the puzzle is empty", function () {
//         it("returns an empty array", function () {
//             var result = check(emptyPuzzle);
//             expect(result).to.be.empty();
//         });
//     });

//     describe("when the puzzle has no values", function () {
//         it("returns no matches", function () {
//             var result = check(noValuesPuzzle);
//             expect(result).to.be.empty();
//         });
//     });

//     describe("when the puzzle has a horizontal match", function () {
//         beforeEach(function () {
//             puzzle = puzzleWithHorizontalMatch;
//         });

//         it("returns an array of the matches", function () {
//             var result = check(puzzle);
//             expect(result).to.have.length(1);
//         });

//         it("returns the matching elements as a set", function () {
//             var result = check(puzzle);
//             expect(result[0]).to.be.an(Array);
//             expect(result[0]).to.have.length(3);
//             expect(result[0]).to.contain(puzzle[0][0]);
//             expect(result[0]).to.contain(puzzle[0][1]);
//             expect(result[0]).to.contain(puzzle[0][2]);
//         });
//     });
// });
