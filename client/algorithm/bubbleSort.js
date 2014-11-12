/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {
    'use strict';

    window.bubbleSort = function (list) {
        var steps = [];

        function _bubbleSort_(list) {
            var tmp;
            for (var i = list.length; i > 0; i--) {
                for (var j = 0; j < i; j++) {
                    steps.push({
                        list: list.slice(),
                        compare: [j, j + 1]
                    });
                    if (list[j] > list[j + 1]) {
                        tmp = list[j];
                        list[j] = list[j + 1];
                        list[j + 1] = tmp;
                        steps.push({
                            list: list.slice(),
                            swap: [j, j + 1]
                        });
                    }
                }
            }
        }

        _bubbleSort_(list);
        return steps;
    };

})(window);