/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

$(function () {
    var chart = new Chart($('#chart'));

    var list = [];
    for (var i = 1; i <= 40; ++i) {
        list.push(i);
    }

//    var queue = bubbleSort(_.shuffle(list));
//    var queue = insertSort(_.shuffle(list));
//    var queue = binaryInsertSort(_.shuffle(list));
    var queue = quickSort(_.shuffle(list));

    var interval = setInterval(function () {
        if (queue.length) {
            chart.render(queue.shift());
        } else {
            clearInterval(interval);
        }
    }, 500);
});