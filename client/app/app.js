/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'angular',
    'angular-ui-router',
    'angular-sanitize',
    'angular-animate',
    'routes',
    'directives',
    'constants'
], function () {
    'use strict';

    var app = angular
        .module(APP_NAME, [
            'ngAnimate',
            'ngSanitize',
                APP_NAME + '.routes',
                APP_NAME + '.directives',
                APP_NAME + '.constants'
        ])
        .run([
            '$rootScope',
            '$location',
            '$log',
            'SITE_INFO',
            'ALGORITHMS',
            'DELAYS',
            'COUNTS',
            function ($rootScope, $location, $log, SITE_INFO, ALGORITHMS, DELAYS, COUNTS) {
                $rootScope.SITE_INFO = SITE_INFO;
                $rootScope.ALGORITHMS = ALGORITHMS;
                $rootScope.DELAY = DELAYS[1];
                $rootScope.COUNT = COUNTS[1];
            }
        ]);
});