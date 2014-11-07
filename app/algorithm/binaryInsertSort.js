/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {
    window.binaryInsertSort = function (list) {
        var steps = [];

        function _binaryInsertSort_(list) {
            var len = list.length,
                i, j, tmp, low, high, mid;

            for (i = 1; i < len; i++) {
                tmp = list[i];
                low = 0;
                high = i;
                while (low <= high) {
                    mid = (low + high) / 2 | 0;
                    steps.push({
                        list: list.slice(),
                        compare: [i, mid]
                    });
                    if (tmp < list[mid]) {
                        high = mid - 1;
                    } else {
                        low = mid + 1;
                    }
                }
                for (j = i - 1; j > high; j--) {
                    list[j + 1] = list[j];
                    steps.push({
                        list: list.slice(),
                        swap: [j + 1]
                    });
                }
                list[j + 1] = tmp;
                steps.push({
                    list: list.slice(),
                    swap: [j + 1]
                });
            }
        }

        _binaryInsertSort_(list);
        return steps;
    }
})(window);