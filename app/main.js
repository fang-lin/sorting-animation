/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function () {


    $(function () {

        var count = 80;
        var delay = 0;
        var list = createList(count);
        var chart = createChat(list);
        var queue = [];
        var algorithm = 'heapSort'; //bubbleSort
        var setTimeoutId, intervalFn;

        function
            createList(len) {
            count = len;
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
            list = _.shuffle(createList(count));
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
                    pause();
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
            var _list = queue.shift();
            reset();
        });

        $('.alg-btn[data-alg=' + algorithm + ']').click();

        $('.count-btn').click(function (event) {
            $('.count-btn').removeClass('active');
            count = $(event.currentTarget).addClass('active').attr('data-count');
            reset();
        });

        $('.count-btn[data-count=' + count + ']').click();

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

        $('#shuffle-btn').click(function () {
            reset();
        });

        $('#reverse-btn').click(function () {
            list = list.reverse();
            chart = createChat(list).render(list);
            queue = [];
            pause();
        });

    });
})();