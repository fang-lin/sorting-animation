/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
define([
    'underscore',
    'angular'
], function (_) {
    'use strict';

    return angular.module(APP_NAME + '.directives', [])
        .directive('dirChart', [
            '$rootScope',
            '$timeout',
            'DELAYS',
            'COUNTS',
            'orderedList',
            'chartFactory',
            function ($rootScope, $timeout, DELAYS, COUNTS, orderedList, chartFactory) {
                return {
                    restrict: 'A',
                    templateUrl: 'app/views/chart.html',
                    replace: true,
                    scope: {
                        sort: '='
                    },
                    link: function (scope, element, attrs) {

                        scope.DELAYS = DELAYS;
                        scope.COUNTS = COUNTS;

                        var $ = angular.element;
                        var $canvas = $('#chart', element);
                        scope.playing = null;

                        function init(count, delay) {
                            $rootScope.COUNT = scope.count = count || $rootScope.COUNT;
                            $rootScope.DELAY = scope.delay = delay || $rootScope.DELAY;
                            scope.chart = chartFactory($canvas, scope.count);
                            scope.list = orderedList(scope.count);
                            scope.choas = _.shuffle(scope.list);
                            scope.chart.render(scope.choas);
                            scope.steps = scope.sort(scope.choas);
                        }

                        init();

                        function play() {
                            pause();
                            if (scope.steps.length) {
                                scope.chart.render(scope.steps.shift());
                                scope.playing = $timeout(function () {
                                    play();
                                }, scope.delay);
                            } else {
                                pause();
                            }
                        }

                        function pause() {
                            $timeout.cancel(scope.playing);
                            scope.playing = null;
                        }

                        scope.toggle = function () {
                            if (scope.playing)
                                pause();
                            else
                                play();
                        };

                        scope.setDelay = function (delay) {
                            $rootScope.DELAY = scope.delay = delay;
                        };

                        scope.setCount = function (count) {
                            init(count, scope.delay);
                        };

                        scope.shuffle = function () {
                            init(scope.count, scope.delay);
                        };
                    }
                };
            }]);
});