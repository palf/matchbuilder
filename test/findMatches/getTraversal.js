var expect = require('expect.js');

var getTraversal = require('../../src/findMatches/getTraversal');

function benchmark (func) {
    var start = Date.now();
    var result = func();
    var finish = Date.now();
    return { value: result, time: finish - start };
}

describe(".getTraversal(edgeGroups, cellID)", function () {
    describe("with no edges", function () {
        it("returns only the requested cell ID", function () {
            var result = getTraversal({}, 'a');
            expect(result).to.contain('a');
            expect(result).to.have.length(1);
        });
    });

    describe("with one edge", function () {
        it("returns a list of reachable cells from a given id", function () {
            var edges = {
                a: [ 'b' ]
            };
            var result = getTraversal(edges, 'a');
            expect(result).to.contain('a');
            expect(result).to.contain('b');
            expect(result).to.have.length(2);
        });

        it("cannot backtrack along edges", function () {
            var edges = {
                a: [ 'b' ]
            };
            var result = getTraversal(edges, 'b');
            expect(result).to.contain('b');
            expect(result).to.have.length(1);
        });

        it("cannot match with itself", function () {
            var edges = {
                a: [ 'a' ]
            };
            var result = getTraversal(edges, 'a');
            expect(result).to.contain('a');
            expect(result).to.have.length(1);
        });
    });

    describe("with two disconnected edges", function () {
        it("does not include the disconnected edge in the traversable set", function () {
            var edges = {
                a: [ 'b' ],
                c: [ 'd' ]
            };
            var result = getTraversal(edges, 'a');
            expect(result).to.contain('a');
            expect(result).to.contain('b');
            expect(result).to.have.length(2);
        });
    });

    describe("with a chain of connected edges", function () {
        it("traverses along the chain", function () {
            var edges = {
                a: [ 'b' ],
                b: [ 'c' ]
            };
            var result = getTraversal(edges, 'a');
            expect(result).to.contain('a');
            expect(result).to.contain('b');
            expect(result).to.contain('c');
            expect(result).to.have.length(3);
        });

        it("traverses until all edges are exhausted", function () {
            var edges = {
                a: [ 'b' ],
                b: [ 'c' ],
                c: [ 'd' ],
                d: [ 'e' ],
                f: [ 'g' ]
            };
            var result = getTraversal(edges, 'a');
            expect(result).to.contain('a');
            expect(result).to.contain('b');
            expect(result).to.contain('c');
            expect(result).to.contain('d');
            expect(result).to.contain('e');
            expect(result).to.have.length(5);
        });

        it("does not get caught in a loop", function () {
            var edges = {
                a: [ 'b' ],
                b: [ 'c' ],
                c: [ 'a' ]
            };
            var result = getTraversal(edges, 'a');
            expect(result).to.contain('a');
            expect(result).to.contain('b');
            expect(result).to.contain('c');
        });

        it("only returns each entry once", function () {
            var edges = {
                a: [ 'b' ],
                b: [ 'c' ],
                c: [ 'a' ]
            };
            var result = getTraversal(edges, 'a');
            expect(result).to.have.length(3);
        });
    });

    describe("with connected edges from a common root", function () {
        it("returns all reachable cells", function () {
            var edges = {
                a: [ 'b', 'c', 'd' ]
            };
            var result = getTraversal(edges, 'a');
            var expectResultTo = expect(result).to;
            expectResultTo.contain('a');
            expectResultTo.contain('b');
            expectResultTo.contain('c');
            expectResultTo.contain('d');
            expectResultTo.have.length(4);
        });
    });

    describe("with a combination of connection types", function () {
        it("traverses both types in tandem", function () {
            var edges = {
                a: [ 'b', 'c', 'd' ],
                b: [ 'a', 'e', 'd' ],
                e: [ 'f' ]
            };
            var result = getTraversal(edges, 'a');
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
            var edges = {
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
            var result = benchmark(function () {
                return getTraversal(edges, 'a');
            });

            expect(result.time).to.be.lessThan(2);
        });

        it("completes a long chain in under a millisecond", function () {
            var edges = {
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
            var result = benchmark(function () {
                return getTraversal(edges, 'a');
            });

            expect(result.time).to.be.lessThan(2);
        });

        it("completes a combination in under a millisecond", function () {
            var edges = {
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
            var result = benchmark(function () {
                return getTraversal(edges, 'a');
            });

            expect(result.time).to.be.lessThan(2);
        });
    });
});
