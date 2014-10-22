/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

$(function () {
    var chart = new Chart($('#chart'));
    var intervalId, intervalTime = $('#interval-time').val() || 0;
    var list = [];
    var len = 10;

    for (var i = 1; i <= len; ++i) {
        list.push(i);
    }

    $('#btns-wrap>button').click(function (event) {
        list = _.shuffle(list);
        var alg = $(event.currentTarget).attr('data-alg');
        var queue = window[alg](list);

        clearInterval(intervalId);
        intervalId = setInterval(function () {
            if (queue.length) {
                chart.render(queue.shift());
            } else {
                clearInterval(intervalId);
            }
        }, intervalTime);
    });

    $('#interval-time').change(function (event) {
        intervalTime = $(event.currentTarget).val();
    });
});