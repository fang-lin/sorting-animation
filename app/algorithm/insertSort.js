/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {
    window.insertSort = function (list) {
        var steps = [];

        function _insertSort_(list) {
            var next,
                len = list.length;

            for (var i = 1; i < len; i++) {
                next = list[i];

                for (var j = i - 1; j >= 0 && next < list[j]; j--) {
                    steps.push({
                        list: _.clone(list),
                        compare: [i, j]
                    });
                    list[j + 1] = list[j];
                    steps.push({
                        list: _.clone(list),
                        swap: [j + 1]
                    });
                }
                list[j + 1] = next;
                steps.push({
                    list: _.clone(list),
                    swap: [j + 1]
                });
            }
        }

        _insertSort_(list);

        return steps;
    }
})(window);