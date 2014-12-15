/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'algorithms/binaryInsertSort',
    'algorithms/bubbleSort',
    'algorithms/heapSort',
    'algorithms/insertSort',
    'algorithms/mergeSort',
    'algorithms/quickSort',
    'algorithms/selectSort',
    'algorithms/shakerSort',
    'algorithms/shellSort',
    'angular'
], function (binaryInsert, bubble, heap, insert, merge, quick, select, shaker, shell) {
    'use strict';

    return angular.module(APP_NAME + '.services', [
            APP_NAME + '.constants'
    ])
        .factory('steps', [function () {
            return {
                binaryInsert: binaryInsert,
                bubble: bubble,
                heap: heap,
                insert: insert,
                merge: merge,
                quick: quick,
                select: select,
                shaker: shaker,
                shell: shell
            };
        }])
        .factory('orderedList', [function () {
            return function createList(len, reverse) {
                var list = [],
                    i;
                if (reverse) {
                    for (i = len; i > 0; i--) {
                        list.push(i);
                    }
                } else {
                    for (i = 1; i <= len; i++) {
                        list.push(i);
                    }
                }
                return list;
            };
        }])
        .factory('chartFactory', [
            'COLORS',
            function (COLORS) {

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
                    this.canvas.fillStyle = COLORS.BACKGROUND;
                    this.canvas.fillRect(0, 0, this.width, this.height);
                };

                _proto_.render = function (item) {

                    var height = this.height;
                    var cHeight = height / this.max;
                    var canvas = this.canvas;
                    var cWidth;

                    this.erasure();

                    if (item.list) {
                        var list = item.list,
                            swap = item.swap,
                            compare = item.compare;

                        cWidth = this.width / list.length;

                        list.forEach(function (num, i) {
                            canvas.fillStyle = COLORS.NORMAL_BAR;
                            if (compare && compare.indexOf(i) !== -1) {
                                canvas.fillStyle = COLORS.COMPARE_BAR;
                            }
                            if (swap && swap.indexOf(i) !== -1) {
                                canvas.fillStyle = COLORS.SWAP_BAR;
                            }
                            canvas.fillRect(cWidth * i, height - cHeight * num, cWidth, cHeight * num);
                        });

                    } else {
                        cWidth = this.width / item.length;
                        canvas.fillStyle = COLORS.NORMAL_BAR;
                        item.forEach(function (num, i) {
                            canvas.fillRect(cWidth * i, height - cHeight * num, cWidth, cHeight * num);
                        });
                    }

                    return this;
                };

                return function (canvas, max) {
                    return new Chart(canvas, max);
                };
            }]);
});