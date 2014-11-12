/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {
    window.selectSort = function (list) {
        var steps = [];

        function _selectSort_(list) {
            var len = list.length,
                i, j, k, tmp;
            for (i = 0; i < len; i++) {
                k = i;
                for (j = i + 1; j < len; j++) {
                    steps.push({
                        list: list.slice(),
                        compare: [j, k]
                    });
                    if (list[j] < list[k]) {
                        k = j;
                    }
                }
                if (k != i) {
                    tmp = list[k];
                    list[k] = list[i];
                    list[i] = tmp;
                    steps.push({
                        list: list.slice(),
                        swap: [k, i]
                    });
                }
            }
        }

        _selectSort_(list);

        return steps;
    }
})(window);