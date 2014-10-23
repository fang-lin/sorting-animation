/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

$(function () {
    var len = 320;
    var chart = new Chart($('#chart'), len);
    var setTimeoutId, intervalFn, intervalTime = $('#interval-time').val() || 0;
    var list = [];

    for (var i = 1; i <= len; ++i) {
        list.push(i);
    }

    $('#btns-wrap>button').click(function (event) {
        list = _.shuffle(list);
        var alg = $(event.currentTarget).attr('data-alg');
        var queue = window[alg](list);

        clearTimeout(setTimeoutId);
        intervalFn = null;

        (function intervalFn() {
            if (queue.length) {
                chart.render(queue.shift());
                setTimeoutId = setTimeout(function () {
                    intervalFn();
                }, intervalTime);
            }
        })();
    });

    $('#interval-time').change(function (event) {
        intervalTime = $(event.currentTarget).val();
    });
});