var _ = {
    isFunction: require('lodash.isfunction'),
    last: require('lodash.last'),
    reduce: require('lodash.reduce'),
    findIndex: require('lodash.findindex'),
    map: require('lodash.map'),
    sum: require('lodash.sum')
};

// XXX: There is a lot of room for performance optimization
function xor(/* arguments */) {
    var arrays = Array.prototype.slice.call(arguments);
    var equals = _.isFunction(_.last(arrays))
        ? arrays.pop()
        : defaultEquals;

    var all = _.reduce(arrays, function(memo, arr) {
        return memo.concat(arr);
    }, []);

    return _.reduce(all, function(memo, item) {
        var itemIndexes = _.map(arrays, function(arr) {
            return _.findIndex(arr, function(arrItem) {
                return equals(arrItem, item);
            });
        });

        var itemFoundTimes = _.sum(_.map(itemIndexes, function(index) {
            var wasFound = index !== -1;
            return wasFound ? 1 : 0;
        }));

        if (itemFoundTimes !== 1) {
            return memo;
        }
        return [].concat(memo).concat([item]);
    }, []);
}

function defaultEquals(a, b) {
    return a === b;
}

module.exports = xor;
