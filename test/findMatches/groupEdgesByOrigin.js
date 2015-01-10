var expect = require('expect.js');

var groupEdgesByOrigin = require('../../src/findMatches/groupEdgesByOrigin');

describe(".groupEdgesByOrigin(edgePairs)", function () {
    describe("when there are no edges", function () {
        it("returns an empty hash", function () {
            var result = groupEdgesByOrigin([]);
            expect(result).to.be.an(Object);
            expect(result).to.be.empty();
        });
    });

    describe("when there is one edge", function () {
        var edgePairs = [
            { origin: 'a', target: 'b' }
        ];

        it("sets the origin as a key in the hash", function () {
            var result = groupEdgesByOrigin(edgePairs);
            expect(result).to.have.key('a');
        });

        it("adds the target to the value array for that key", function () {
            var result = groupEdgesByOrigin(edgePairs);
            expect(result.a).to.contain('b');
            expect(result.a).to.have.length(1);
        });
    });

    describe("when there is a recursive edge", function () {
        var edgePairs = [
            { origin: 'a', target: 'a' }
        ];

        it("does not add a value entry if the value matches the key", function () {
            var result = groupEdgesByOrigin(edgePairs);
            expect(result).to.have.key('a');
            expect(result.a).to.have.length(1);
        });
    });

    describe("when there are disconnected edges", function () {
        var edgePairs = [
            { origin: 'a', target: 'b' },
            { origin: 'c', target: 'd' },
            { origin: 'e', target: 'f' }
        ];

        it("adds keys for all origins", function () {
            var result = groupEdgesByOrigin(edgePairs);
            expect(result).to.have.key('a');
            expect(result).to.have.key('c');
            expect(result).to.have.key('e');
        });

        it("adds each value to it's respective key", function () {
            var result = groupEdgesByOrigin(edgePairs);
            expect(result.a).to.contain('b');
            expect(result.c).to.contain('d');
            expect(result.e).to.contain('f');
        });
    });

    describe("when there are two connected edges", function () {
        var edgePairs = [
            { origin: 'a', target: 'b' },
            { origin: 'b', target: 'c' }
        ];

        it("does not perform any traversal", function () {
            var result = groupEdgesByOrigin(edgePairs);
            expect(result).to.have.key('a');
            expect(result).to.have.key('b');
        });
    });

    describe("when there are connected edges from a common root", function () {
        it("adds add targets to the value array", function () {
            var edgePairs = [
                { origin: 'a', target: 'b' },
                { origin: 'a', target: 'c' },
                { origin: 'a', target: 'd' },
            ];
            var result = groupEdgesByOrigin(edgePairs);
            expect(result.a).to.contain('b');
            expect(result.a).to.contain('c');
            expect(result.a).to.contain('d');
        });
    });
});
