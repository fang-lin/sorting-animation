/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {
    window.quickSort = function (list) {
        var steps = [];

        function _quickSort_(seq) {

            console.log(seq);



            if (seq.length > 1) {
                var k = seq[0];
                var x = [];
                var y = [];

                var len = seq.length;

                for (var i = 1; i < len; i++) {
                    if (seq[i] <= k) {
                        x.push(seq[i]);
                    } else {
                        y.push(seq[i]);
                    }

                }
                x = _quickSort_(x);
                y = _quickSort_(y);
                return x.concat(k, y);
            } else {
                return seq;
            }
        }

//        _quickSort_(list);

        steps.push(_quickSort_(list));

        return steps;
    }
})(window);