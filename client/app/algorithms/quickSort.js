/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    function quickSort(list) {
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
                            list: list.slice(),
                            compare: [pivot, i]
                        });
                        i++;
                    } while (list[i] < pivot);

                    do {
                        steps.push({
                            list: list.slice(),
                            compare: [pivot, j]
                        });
                        j--;
                    } while (list[j] > pivot);

                    steps.push({
                        list: list.slice(),
                        compare: [i, j]
                    });

                    if (i < j) {
                        tmp = list[i];
                        list[i] = list[j];
                        list[j] = tmp;
                        steps.push({
                            list: list.slice(),
                            swap: [i, j]
                        });
                    }
                } while (i < j);

                tmp = list[left];
                list[left] = list[j];
                list[j] = tmp;

                steps.push({
                    list: list.slice(),
                    swap: [left, j]
                });
                _quickSort_(list, left, j - 1);
                _quickSort_(list, j + 1, right);
            }
        }

        _quickSort_(list, 0, list.length - 1);
        return steps;
    }

    return quickSort;
});