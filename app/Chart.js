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

    _proto_.render = function (list) {
        var height = this.height;
        var cWidth = this.width / list.length;
        var cHeight = height / this.max;

        this.erasure();
        var canvas = this.canvas;
        canvas.fillStyle = '#666';
        list.forEach(function (num, i) {
            canvas.fillRect(cWidth * i, height - cHeight * num, cWidth - 1, cHeight * num);
        });
    };

    window.Chart = Chart;

})(window);