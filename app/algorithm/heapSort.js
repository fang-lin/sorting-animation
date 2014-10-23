/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {

    window.heapSort = function (list) {

        var steps = [],
            len = list.length;

        function _adjust_(low, high) {
            var i = low,
                j = 2 * i;
            var tmp = list[i];

            while (j <= high) {
                if (j < high && list[j] < list[j + 1])
                    j++;
                if (tmp >= list[j]) {
                    break;
                } else {
                    list[i] = list[j];
                    i = j;
                    j = 2 * i;
//                    steps.push(_.clone(list));
                }

            }
            list[i] = tmp;
//            steps.push(_.clone(list));
        }

        function _heapSort_() {
            var i,
                tmp;

            for (i = parseInt(len / 2); i > 0; i--) {
                _adjust_(i, len);
//                steps.push(_.clone(list));
            }

            for (i = len - 1; i > 0; i--) {
                tmp = list[1];
                list[1] = list[i + 1];
                list[i + 1] = tmp;
                _adjust_(1, i);
//                steps.push(_.clone(list));
            }
        }

        _heapSort_();
        steps.push(_.clone(list));

        return steps;
    }
})(window);