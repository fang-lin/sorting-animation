/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window) {

    window.heapSort = function (list) {
        var steps = [];

        function _createHeap_(list, low, high) {

//            console.log(low, high);

            console.log(list.length);

            var i = low,
                j = 2 * i,
                tmp = list[i];

            while (j <= high) {
                if (j < high && list[j] < list[j + 1]) {
                    steps.push({
                        list: list.slice(),
                        compare: [j, j + 1]
                    });
                    j++; //从左右子节点中选出较大的节点
                }
                if (tmp < list[j]) {
                    list[i - 1] = list[j - 1];
                    i = j;
                    j = 2 * i;
                    steps.push({
                        list: list.slice(),
                        swap: [i]
                    });
                } else {
                    break;
                }
            }
            list[i - 1] = tmp;
            steps.push({
                list: list.slice(),
                swap: [i]
            });                       //被筛选的元素放在最终的位置上
        }

        function _heapSort_(list) {
            var i,
                tmp,
                len = list.length;

            for (i = len / 2 | 0; i > 0; i--) {
                _createHeap_(list, i, len);
            }
            for (i = len; i > 0; i--) {
                tmp = list[0];
                list[0] = list[i];
                list[i] = tmp;
//                steps.push({
//                    list: list.slice(),
//                    swap: [0, i]
//                });
                _createHeap_(list, 1, i);
            }
        }

        _heapSort_(list);

        console.log(list)

        return steps;
    }
})
(window);