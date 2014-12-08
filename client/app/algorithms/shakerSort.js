/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    function shakerSort(list) {
        var steps = [];

        function _shakerSort_(list) {
            var i, left = 0,
                right = list.length,
                k = 0, tmp;

            while (left < right) {

                for (i = left; i < right; i++) {
                    steps.push({
                        list: list.slice(),
                        compare: [i, i + 1]
                    });
                    if (list[i] > list[i + 1]) {
                        tmp = list[i];
                        list[i] = list[i + 1];
                        list[i + 1] = tmp;
                        steps.push({
                            list: list.slice(),
                            swap: [i, i + 1]
                        });
                        k = i;
                    }
                }
                right = k;

                for (i = right; i > left; i--) {
                    steps.push({
                        list: list.slice(),
                        compare: [i, i - 1]
                    });
                    if (list[i - 1] > list[i]) {
                        tmp = list[i];
                        list[i] = list[i - 1];
                        list[i - 1] = tmp;
                        steps.push({
                            list: list.slice(),
                            swap: [i, i - 1]
                        });
                        k = i;
                    }
                }
                left = k;
            }
        }

        _shakerSort_(list);
        return steps;
    }

    return shakerSort;
});