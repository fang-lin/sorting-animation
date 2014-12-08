/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */
define([
    'angular'
], function () {
    'use strict';

    return angular.module(APP_NAME + '.directives', [])
        .directive('chart', [
            function ($stateParams, steps) {
                return {
                    restrict: 'A',
                    templateUrl: 'app/views/chart.html',
                    replace: true,
                    scope: {
                        chaos: '=',
                        sort: '='
                    },
                    link: function (scope, element, attrs) {

                        console.log(scope.sort([3, 4, 2, 6, 7, 1]));
                    }
                };
            }]);
});