var assert = require('assert');
var xor = require('../src/index');

describe('arr-xor', function() {
    it('basic xor', function() {
        assert.deepStrictEqual(xor([1, 2], [2, 3]), [1, 3]);
    });

    it('multiple arrays', function() {
        var result = xor([1, 2], [2, 3], [3, 4]);
        assert.deepStrictEqual(result, [1, 4]);
    });

    it('predicate', function() {
        var result = xor([{id: 1}, {id: 2}], [{id: 2}, {id: 3}], function equals(a, b) {
            return a.id === b.id;
        });
        assert.deepStrictEqual(result, [{id: 1}, {id: 3}]);
    });
});
