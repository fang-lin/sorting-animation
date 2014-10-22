/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {

    window.quickSort = function (list) {
        var steps = [],
            len = list.length;

        (function _quickSort_(list, left, right) {
            var pivot, i, j,
                tmp;

            if (left < right) {
                i = left;
                j = right + 1;
                pivot = list[left];

                do {
                    do
                        i++;
                    while (list[i] < pivot);

                    do
                        j--;
                    while (list[j] > pivot);

                    if (i < j) {
                        tmp = list[i];
                        list[i] = list[j];
                        list[j] = tmp;
                        steps.push(_.clone(list));
                    }
                } while (i < j);

                tmp = list[left];
                list[left] = list[j];
                list[j] = tmp;

                steps.push(_.clone(list));
                _quickSort_(list, left, j - 1);
                _quickSort_(list, j + 1, right);
            }
        })(list, 0, len - 1);

        return steps;
    }
})(window);