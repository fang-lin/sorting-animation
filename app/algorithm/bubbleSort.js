/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {
    window.bubbleSort = function (list) {
        var steps = [],
            tmp,
            len = list.length;

        for (var i = len; i > 0; i--) {
            for (var j = 0; j < i; j++) {
                steps.push({
                    list: _.clone(list),
                    compare: [j, j + 1]
                });
                if (list[j] > list[j + 1]) {
                    tmp = list[j];
                    list[j] = list[j + 1];
                    list[j + 1] = tmp;
                    steps.push({
                        list: _.clone(list),
                        swap: [j, j + 1]
                    });
                }
            }
        }

        return steps;
    }
})(window);