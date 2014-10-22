/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {
    window.quickSort = function (list) {
        var steps = [];

        function _quickSort_(list) {


            if (list.length) {
                var left = [],
                    right = [];
                var pivot = list[0],
                    len = list.length;

                for (var i = 1; i < len; i++) {
                    if (list[i] < pivot) {
                        left.push(list[i]);
                    } else {
                        right.push(list[i]);
                    }
                }

                console.log(left, pivot, right);

                left = _quickSort_(left);
                right = _quickSort_(right);

                return left.concat(pivot, right);
            } else {
                return [];
            }
        }

//        _quickSort_(list);

        steps.push(_quickSort_(list));

//        console.log(list)

        return steps;
    }
})(window);