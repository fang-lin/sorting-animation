/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {
    'use strict';

    window.heapSort = function (list) {
        var steps = [];

        function _adjust_(list, root, len) {

            var p = root,
                chd = 2 * root,
                tmp = list[root];

            while (chd < len) {
                steps.push({
                    list: list.slice(),
                    compare: [chd, chd + 1]
                });
                if (chd < len && list[chd] < list[chd + 1]) {
                    chd++;
                }
                if (tmp < list[chd]) {
                    list[p] = list[chd];
                    steps.push({
                        list: list.slice(),
                        swap: [chd / 2, chd]
                    });
                    p = chd;
                    chd = 2 * p;
                } else {
                    break;
                }
            }
            list[p] = tmp;
            steps.push({
                list: list.slice(),
                swap: [p]
            });
        }

        function _heapSort_(list) {
            var i, tmp,
                len = list.length - 1;

            for (i = len / 2 | 0; i >= 0; i--) {
                _adjust_(list, i, len);
            }
            for (i = len; i > 0; i--) {
                tmp = list[0];
                list[0] = list[i];
                list[i] = tmp;
                steps.push({
                    list: list.slice(),
                    swap: [0, i]
                });
                _adjust_(list, 0, i - 1);
            }
        }

        _heapSort_(list);
        return steps;
    };

})(window);