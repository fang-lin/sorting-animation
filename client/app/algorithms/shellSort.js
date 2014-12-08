/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define(function () {
    'use strict';

    function shellSort(list) {
        var steps = [];

        function _shellSort_(list) {
            var len = list.length,
                gap = len / 2 | 0,
                i, j, tmp;

            while (gap > 0) {
                for (i = gap; i < len; i++) {
                    tmp = list[i];
                    j = i - gap;
                    while (j >= 0 && tmp < list[j]) {
                        steps.push({
                            list: list.slice(),
                            compare: [j]
                        });
                        list[j + gap] = list[j];
                        steps.push({
                            list: list.slice(),
                            swap: [j + gap]
                        });
                        j = j - gap;
                    }
                    list[j + gap] = tmp;
                    steps.push({
                        list: list.slice(),
                        swap: [j + gap]
                    });
                }
                gap = gap / 2 | 0;
            }
        }

        _shellSort_(list);
        return steps;
    }

    return shellSort;
});