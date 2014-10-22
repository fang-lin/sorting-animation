/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {
    window.insertSort = function (list) {
        var steps = [],
            tmp,
            len = list.length;

        for (var i = 1; i < len; i++) {
            tmp = list[i];
            var j = i - 1;
            while (j >= 0 && tmp < list[j]) {
                list[j + 1] = list[j];
                steps.push(_.clone(list));
                j--;
            }
            list[j + 1] = tmp;
            steps.push(_.clone(list));
        }

        return steps;
    }
})(window);