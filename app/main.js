/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function () {


    $(function () {

        var length = 40;
        var delay = 0;
        var list = createList(length);
        var chart = createChat(list);
        var queue = [];
        var algorithm = 'bubbleSort';
        var setTimeoutId, intervalFn;

        function
            createList(len) {
            length = len;
            var list = [];
            for (var i = 1; i <= len; ++i) {
                list.push(i);
            }
            return list;
        }

        function createChat(list) {
            return new Chart($('#chart'), list.length);
        }

        function reset() {
            list = _.shuffle(createList(length));
            chart = createChat(list).render(list);
            queue = [];
            pause();
        }

        function createQueue() {
            queue = window[algorithm](list);
        }

        function play() {
            pause();
            $('#play-btn').attr('data-play', 'true').html('Pause');
            (function intervalFn() {
                if (queue.length) {
                    chart.render(queue.shift());
                    setTimeoutId = setTimeout(function () {
                        intervalFn();
                    }, delay);
                } else {
                    $('#play-btn').attr('data-play', 'reset').html('Reset');
                }
            })();
        }

        function pause() {
            clearTimeout(setTimeoutId);
            intervalFn = null;
            $('#play-btn').attr('data-play', 'false').html('Play');
        }

        $('.delay-btn').click(function (event) {
            $('.delay-btn').removeClass('active');
            delay = $(event.currentTarget).addClass('active').attr('data-delay');
            pause();
            play();
        });

        $('.delay-btn[data-delay=' + delay + ']').click();

        $('.alg-btn').click(function (event) {
            $('.alg-btn').removeClass('active');
            algorithm = $(event.currentTarget).addClass('active').attr('data-alg');
            reset();
        });

        $('.alg-btn[data-alg=' + algorithm + ']').click();

        $('.length-btn').click(function (event) {
            $('.length-btn').removeClass('active');
            length = $(event.currentTarget).addClass('active').attr('data-length');
            reset();
        });

        $('.length-btn[data-length=' + length + ']').click();

        $('#play-btn').click(function (event) {
            var $this = $(event.currentTarget);
            if ($this.attr('data-play') === 'true') {
                pause();
            } else if ($this.attr('data-play') === 'false') {
                if (queue.length === 0) {
                    createQueue();
                }
                play();
            } else {
                reset();
            }
        });

    });
})();