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
                if (list[j] > list[j + 1]) {
                    tmp = list[j];
                    list[j] = list[j + 1];
                    list[j + 1] = tmp;
                }
                steps.push(_.clone(list));
            }
        }

        return steps;
    }
})(window);