/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'angular',
    'services'
], function () {
    'use strict';

    angular.module(APP_NAME + '.routes', [
        'ui.router',
            APP_NAME + '.constants',
            APP_NAME + '.services'
    ])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            'ALGORITHMS',
            function ($stateProvider, $urlRouterProvider, ALGORITHMS) {

                $urlRouterProvider.otherwise('/' + ALGORITHMS[0].key);

                ALGORITHMS.reduce(function ($stateProvider, algorithm) {
                    return $stateProvider
                        .state(algorithm.key, {
                            url: '/' + algorithm.key,
                            views: {
                                'code': {
                                    templateUrl: 'app/partials/' + algorithm.key + '.html'
                                },
                                'canvas': {
                                    template: '<div dir-chart sort="sort"></div>',
                                    controller: ['$scope', '$state', 'steps', function ($scope, $state, steps) {
                                        var key = $state.current.name;
                                        $scope.sort = steps[key] || steps.quick;
                                    }]
                                }
                            }
                        });
                }, $stateProvider);
            }]);
});

