/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'angular',
    'angular-ui-router',
    'angular-animate',
    'routes',
    'controllers',
    'directives',
    'filters',
//    'services',
    'constants'
], function () {
    'use strict';

    var app = angular
        .module(APP_NAME, [
            'ui.router',
            'ngAnimate',
                APP_NAME + '.routes',
//                APP_NAME + '.controllers',
                APP_NAME + '.directives',
//                APP_NAME + '.filters',
//                APP_NAME + '.services',
                APP_NAME + '.constants'
        ])
        .run([
            '$rootScope',
            '$location',
            '$log',
            'SITE_INFO',
            'ALGORITHMS',
            function ($rootScope, $location, $log, SITE_INFO, ALGORITHMS) {
                $rootScope.SITE_INFO = SITE_INFO;
                $rootScope.ALGORITHMS = ALGORITHMS;
            }
        ]);
});