/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {
    window.binaryInsertSort = function (list) {
        var steps = [],
            tmp,
            len = list.length,
            low,
            high,
            mid;

        for (var i = 1; i < len; i++) {
            tmp = list[i];
            low = 0;
            high = i - 1;
            while (low <= high) {
                mid = (low + high) / 2;
                if (tmp < list[mid]) high = mid - 1;
                else low = mid + 1;
            }
            for (var j = i - 1; j >= high + 1; j--) {
                list[j + 1] = list[j];
            }
            list[j + 1] = tmp;
            steps.push(_.clone(list));
        }
        steps.push(_.clone(list));
        return steps;
    }
})(window);