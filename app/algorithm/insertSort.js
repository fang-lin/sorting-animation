/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {
    window.insertSort = function (list) {
        var steps = [],
            next,
            len = list.length;

        for (var i = 1; i < len; i++) {
            next = list[i];

            for (var j = i - 1; j >= 0 && next < list[j]; j--) {
                list[j + 1] = list[j];
                steps.push(_.clone(list));
            }
            list[j + 1] = next;
            steps.push(_.clone(list));
        }

        return steps;
    }
})(window);