/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {

    window.mergeSort = function (list) {

        var steps = [],
            len = list.length;

        function _merge_(low, mid, high) {
            var tmp = [],
                i = low,
                j = mid + 1,
                k = 0;

            while (i <= mid && j <= high) {
                if (list[i] <= list[j]) {
                    tmp[k++] = list[i++];
                } else {
                    tmp[k++] = list[j++];
                }
            }
            while (i <= mid) {
                tmp[k++] = list[i++];
            }
            while (j <= high) {
                tmp[k++] = list[j++];
            }
            for (k = 0, i = low; i <= high; k++, i++) {
                list[i] = tmp[k];
                steps.push(_.clone(list));
            }
        }

        function _mergePass_(len, n) {
            var i;
            for (i = 0; i < n - 2 * len; i += 2 * len) {
                _merge_(i, i + len - 1, i + 2 * len - 1);

            }
            if (i + len < n) {
                _merge_(i, i + len - 1, n - 1);
            } else {

            }
        }

        for (var length = 1; length < len; length = 2 * length) {
            _mergePass_(length, len);
        }

        return steps;
    }
})(window);