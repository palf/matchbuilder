var expect = require('expect.js');

var getTraversal = require('../src/getTraversal');

function benchmark (func) {
    var start = Date.now();
    var result = func();
    var finish = Date.now();
    return { value: result, time: finish - start };
}

describe(".getTraversal(puzzle, id)", function () {
    describe("with no paths", function () {
        it("returns only the requested ID", function () {
            var puzzle = {paths: {}, values: {} };
            var result = getTraversal(puzzle, 'a');
            expect(result).to.contain('a');
            expect(result).to.have.length(1);
        });
    });

    describe("with no values", function () {
        it("returns only the requested ID", function () {
            var puzzle = { paths: { a: [ 'b' ]}, values: {} };
            var result = getTraversal(puzzle, 'a');
            expect(result).to.contain('a');
            expect(result).to.have.length(1);
        });
    });

    describe("when there is one path with matching values", function () {
        var paths = {
            a: [ 'b' ]
        };

        var values = {
            a: 1, b: 1
        };

        it("returns the start and end of the path", function () {
            var puzzle = { paths: paths, values: values };
            var result = getTraversal(puzzle, 'a');
            expect(result).to.contain('a');
            expect(result).to.contain('b');
            expect(result).to.have.length(2);
        });

        it("cannot backtrack along paths", function () {
            var puzzle = { paths: paths, values: values };
            var result = getTraversal(puzzle, 'b');
            expect(result).to.contain('b');
            expect(result).to.have.length(1);
        });

        it("cannot match with itself", function () {
            var paths = {
                a: [ 'a' ]
            };
            var puzzle = { paths: paths, values: values };
            var result = getTraversal(puzzle, 'a');
            expect(result).to.contain('a');
            expect(result).to.have.length(1);
        });
    });

    describe("with two disconnected paths", function () {
        var paths = {
            a: [ 'b' ],
            c: [ 'd' ]
        };

        var values = {
            a: 1, b: 1, c: 1, d: 1
        };

        it("does not include the disconnected path in the traversable set", function () {
            var puzzle = { paths: paths, values: values };
            var result = getTraversal(puzzle, 'a');
            expect(result).to.contain('a');
            expect(result).to.contain('b');
            expect(result).to.have.length(2);
        });
    });

    describe("with a chain of connected paths", function () {
        var paths = {
            a: [ 'b' ],
            b: [ 'c' ]
        };

        var values = {
            a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, g: 1
        };

        it("traverses along the chain", function () {
            var puzzle = { paths: paths, values: values };
            var result = getTraversal(puzzle, 'a');
            expect(result).to.contain('a');
            expect(result).to.contain('b');
            expect(result).to.contain('c');
            expect(result).to.have.length(3);
        });

        it("traverses until all paths are exhausted", function () {
            var paths = {
                a: [ 'b' ],
                b: [ 'c' ],
                c: [ 'd' ],
                d: [ 'e' ],
                f: [ 'g' ]
            };
            var puzzle = { paths: paths, values: values };
            var result = getTraversal(puzzle, 'a');
            expect(result).to.contain('a');
            expect(result).to.contain('b');
            expect(result).to.contain('c');
            expect(result).to.contain('d');
            expect(result).to.contain('e');
            expect(result).to.have.length(5);
        });

        it("does not get caught in a loop", function () {
            var paths = {
                a: [ 'b' ],
                b: [ 'c' ],
                c: [ 'a' ]
            };
            var puzzle = { paths: paths, values: values };
            var result = getTraversal(puzzle, 'a');
            expect(result).to.contain('a');
            expect(result).to.contain('b');
            expect(result).to.contain('c');
        });

        it("only returns each entry once", function () {
            var paths = {
                a: [ 'b' ],
                b: [ 'c' ],
                c: [ 'a' ]
            };
            var puzzle = { paths: paths, values: values };
            var result = getTraversal(puzzle, 'a');
            expect(result).to.have.length(3);
        });
    });

    describe("with connected paths from a common root", function () {
        var paths = {
            a: [ 'b', 'c', 'd' ]
        };

        var values = {
            a: 1, b: 1, c: 1, d:1
        };

        it("returns all reachable cells", function () {
            var puzzle = { paths: paths, values: values };
            var result = getTraversal(puzzle, 'a');
            var expectResultTo = expect(result).to;
            expectResultTo.contain('a');
            expectResultTo.contain('b');
            expectResultTo.contain('c');
            expectResultTo.contain('d');
            expectResultTo.have.length(4);
        });
    });

    describe("with a combination of connection types", function () {
        var paths = {
            a: [ 'b', 'c', 'd' ],
            b: [ 'a', 'e', 'd' ],
            e: [ 'f' ]
        };

        var values = {
            a: 1, b: 1, c: 1, d: 1, e: 1, f: 1
        };

        it("traverses both types in tandem", function () {
            var puzzle = { paths: paths, values: values };
            var result = getTraversal(puzzle, 'a');
            var expectResultTo = expect(result).to;
            expectResultTo.contain('a');
            expectResultTo.contain('b');
            expectResultTo.contain('c');
            expectResultTo.contain('d');
            expectResultTo.contain('e');
            expectResultTo.contain('f');
            expectResultTo.have.length(6);
        });
    });

    describe("performance", function () {
        it("completes a large grid in a under a millisecond", function () {
            var paths = {
                a: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ],
                b: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ],
                c: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ],
                d: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ],
                e: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ],
                f: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ],
                g: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ],
                h: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ],
                i: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ],
            };

            var values = {
                a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, g: 1, h: 1, i: 1
            };

            var result = benchmark(function () {
                var puzzle = { paths: paths, values: values };
                return getTraversal(puzzle, 'a');
            });

            expect(result.time).to.be.lessThan(2);
        });

        it("completes a square grid in a under a millisecond", function () {
            var paths = {
                '00': [ '01', '10' ],
                '01': [ '00', '02', '11' ],
                '02': [ '01', '12' ],
                '10': [ '00', '11', '20' ],
                '11': [ '01', '10', '12', '21' ],
                '12': [ '02', '11', '22' ],
                '20': [ '10', '21' ],
                '21': [ '11', '20', '22' ],
                '22': [ '12', '21' ]
            };

            var values = {
                '00': 1, '01': 1, '02': 1, '10': 1, '11': 1, '12': 1, '20': 1, '21': 1, '22': 1
            };

            var result = benchmark(function () {
                var puzzle = { paths: paths, values: values };
                return getTraversal(puzzle, '00');
            });

            expect(result.time).to.be.lessThan(2);
        });

        it("completes a long chain in about a millisecond", function () {
            var paths = {
                a: [ 'b' ],
                b: [ 'c' ],
                c: [ 'd' ],
                d: [ 'e' ],
                e: [ 'f' ],
                f: [ 'g' ],
                g: [ 'h' ],
                h: [ 'i' ],
                i: [ 'j' ],
                j: [ 'k' ],
                k: [ 'a' ],
            };

            var values = {
                a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, g: 1, h: 1, i: 1, j: 1, k: 1
            };

            var result = benchmark(function () {
                var puzzle = { paths: paths, values: values };
                return getTraversal(puzzle, 'a');
            });

            expect(result.time).to.be.lessThan(2);
        });

        it("completes a combination in about a millisecond", function () {
            var paths = {
                a: [ 'b', 'c' ],
                b: [ 'c' ],
                c: [ 'd', 'b' ],
                d: [ ],
                e: [ 'f' ],
                f: [ 'g', 'k' ],
                g: [ 'h', 'k', 'j', 'g', 'f' ],
                h: [ 'i' ],
                i: [ 'j' ],
                j: [ 'k', 'f', 'd' ],
                k: [ 'a' ],
                l: [ 'l' ]
            };

            var values = {
                a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, g: 1, h: 1, i: 1, j: 1, k: 1, l: 1
            };

            var result = benchmark(function () {
                var puzzle = { paths: paths, values: values };
                return getTraversal(puzzle, 'a');
            });

            expect(result.time).to.be.lessThan(2);
        });
    });
});
