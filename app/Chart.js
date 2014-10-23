/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

(function (window, undefined) {

    function Chart(canvas, max) {
        this.$canvas = canvas;
        this.max = max;
        this.init();
    }

    var _proto_ = Chart.prototype;

    _proto_.init = function () {
        var $canvas = this.$canvas;
        this.width = $canvas.width();
        this.height = $canvas.height();
        this.canvas = $canvas[0].getContext('2d');
    };

    _proto_.erasure = function () {
        this.canvas.fillStyle = '#fff';
        this.canvas.fillRect(0, 0, this.width, this.height);
    };

    _proto_.render = function (ele) {

        var height = this.height;
        var cHeight = height / this.max;
        var canvas = this.canvas;
        var cWidth;

        this.erasure();

        if (ele.list) {
            var list = ele.list,
                swap = ele.swap,
                compare = ele.compare;

            cWidth = this.width / list.length;

            list.forEach(function (num, i) {
                canvas.fillStyle = '#666';
                if (compare && compare.indexOf(i) !== -1)
                    canvas.fillStyle = '#3f3';
                if (swap && swap.indexOf(i) !== -1)
                    canvas.fillStyle = '#f33';
                canvas.fillRect(cWidth * i, height - cHeight * num, cWidth, cHeight * num);
            });

        } else {
            cWidth = this.width / ele.length;
            canvas.fillStyle = '#666';
            ele.forEach(function (num, i) {
                canvas.fillRect(cWidth * i, height - cHeight * num, cWidth, cHeight * num);
            });
        }
    };

    window.Chart = Chart;

})(window);