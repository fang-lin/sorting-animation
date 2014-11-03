/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {

    window.mergeSort = function (list) {
        var steps = [];

        function _merge_(list, low, mid, high) {
            var ordered = [],
                i = low,
                j = mid,
                k = 0, len;

            while (i < mid && j < high) {
                steps.push({
                    list: list.slice(),
                    compare: [i, j]
                });
                if (list[i] <= list[j]) {
                    ordered[k++] = list[i++];
                } else {
                    ordered[k++] = list[j++];
                }
            }

            while (i < mid) {
                steps.push({
                    list: list.slice(),
                    compare: [i]
                });
                ordered[k++] = list[i++];
            }

            while (j < high) {
                steps.push({
                    list: list.slice(),
                    compare: [j]
                });
                ordered[k++] = list[j++];
            }

            for (k = 0, len = ordered.length; k < len; k++) {
                list[k + low] = ordered[k];
                steps.push({
                    list: list.slice(),
                    swap: [k + low]
                });
            }
        }

        function _mergePass_(list, len, n) {
            var i;
            for (i = 0; i < n - 2 * len; i += 2 * len) {
                _merge_(list, i, i + len, i + 2 * len);
            }
            if (i + len < n) {
                _merge_(list, i, i + len, n);
            }
        }

        function _mergeSort_(list) {
            for (var len = 1, n = list.length; len < n; len = 2 * len) {
                _mergePass_(list, len, n);
            }
        }

        _mergeSort_(list);
        return steps;
    }
})(window);