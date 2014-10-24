/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {

    window.quickSort = function (list) {
        var steps = [];

        function _quickSort_(list, left, right) {
            var pivot, i, j,
                tmp;

            if (left < right) {
                i = left;
                j = right + 1;
                pivot = list[left];

                do {
                    do {
                        steps.push({
                            list: _.clone(list),
                            compare: [pivot, i]
                        });
                        i++;
                    } while (list[i] < pivot);

                    do {
                        steps.push({
                            list: _.clone(list),
                            compare: [pivot, j]
                        });
                        j--;
                    } while (list[j] > pivot);

                    steps.push({
                        list: _.clone(list),
                        compare: [i, j]
                    });

                    if (i < j) {
                        tmp = list[i];
                        list[i] = list[j];
                        list[j] = tmp;
                        steps.push({
                            list: _.clone(list),
                            swap: [i, j]
                        });
                    }
                } while (i < j);

                tmp = list[left];
                list[left] = list[j];
                list[j] = tmp;

                steps.push({
                    list: _.clone(list),
                    swap: [left, j]
                });
                _quickSort_(list, left, j - 1);
                _quickSort_(list, j + 1, right);
            }
        }

        _quickSort_(list, 0, list.length - 1);

        return steps;
    }
})(window);