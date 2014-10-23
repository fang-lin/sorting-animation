/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {

    window.mergeSort = function (list) {

        var steps = [],
            len = list.length;

        function _merge_(low, mid, high) {
            var ordered = [],
                i = low,
                j = mid + 1,
                k = 0;

            while (i <= mid && j <= high) {
                steps.push({
                    list: _.clone(list),
                    compare: [i, j]
                });
                if (list[i] <= list[j]) {
                    ordered[k++] = list[i++];
                } else {
                    ordered[k++] = list[j++];
                }
            }
            while (i <= mid) {
                steps.push({
                    list: _.clone(list),
                    compare: [i]
                });
                ordered[k++] = list[i++];
            }
            while (j <= high) {
                steps.push({
                    list: _.clone(list),
                    compare: [j]
                });
                ordered[k++] = list[j++];
            }
            for (k = 0, i = low; i <= high; k++, i++) {
                list[i] = ordered[k];
                steps.push({
                    list: _.clone(list),
                    swap: [i]
                });
            }
        }

        function _mergePass_(len, n) {
            var i;
            for (i = 0; i < n - 2 * len; i += 2 * len) {
                _merge_(i, i + len - 1, i + 2 * len - 1);
            }
            if (i + len < n) {
                _merge_(i, i + len - 1, n - 1);
            }
        }

        for (var length = 1; length < len; length = 2 * length) {
            _mergePass_(length, len);
        }

        return steps;
    }
})(window);