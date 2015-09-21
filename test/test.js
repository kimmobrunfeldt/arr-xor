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

    it('more complex predicate', function() {
        var first = [{id: 1, text: 'one'}, {id: 2, text: 'two'}];
        var second = [{id: 2, text: 'another'}, {id: 3, text: 'three'}];
        var result = xor(first, second, function(a, b) {
            return a.id === b.id;
        });

        var expected = [{id: 1, text: 'one'}, {id: 3, text: 'three'}];
        assert.deepStrictEqual(result, expected);
    });
});
