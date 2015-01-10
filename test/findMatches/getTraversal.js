var expect = require('expect.js');

var getTraversal = require('../../src/findMatches/getTraversal');

function benchmark (func) {
    var start = Date.now();
    var result = func();
    var finish = Date.now();
    return { value: result, time: finish - start };
}

describe.only(".getTraversal(edgeGroups, cellID)", function () {
    describe("when there are no edges", function () {
        it("returns only the requested cell ID", function () {
            var result = getTraversal({}, 'a');
            expect(result).to.contain('a');
            expect(result).to.have.length(1);
        });
    });

    describe("when there is one edge", function () {
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

    describe("when there are two disconnected edges", function () {
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

    describe("when there is a chain of connected edges", function () {
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

    describe("when there are connected edges from a common root", function () {
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

    describe("when there is a combination of connection types", function () {
        it("traverses both types in tandem", function () {
            var edges = {
                a: [ 'b', 'c', 'd' ],
                b: [ 'e' ],
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

    describe("timing", function () {

        it("completes very damn quickly", function () {
            var edges = {
                a: [ 'a', 'b', 'c', 'd', 'e', 'f' ],
                b: [ 'a', 'b', 'c', 'd', 'e', 'f' ],
                c: [ 'a', 'b', 'c', 'd', 'e', 'f' ],
                d: [ 'a', 'b', 'c', 'd', 'e', 'f' ],
                e: [ 'a', 'b', 'c', 'd', 'e', 'f' ],
                f: [ 'a', 'b', 'c', 'd', 'e', 'f' ],
            };
            var result = benchmark(function () {
                return getTraversal(edges, 'a');
            });

            console.log(result);

            expect(result.time).to.be.lessThan(7);
        });
    });
});
