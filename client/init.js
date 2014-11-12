/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

requirejs.config({
    paths: {
        // Libs
        'jquery': '/lib/jquery/dist/jquery',
        'underscore': '/lib/underscore/underscore',
        'angular': '/lib/angular/angular',
//        'angular-route': '/lib/angular-route/angular-route',
        'angular-animate': '/lib/angular-animate/angular-animate',
        'angular-ui-router': '/lib/angular-ui-router/release/angular-ui-router',
        // Apps
        'app': 'app/app',
        'controllers': 'app/controllers',
        'routes': 'app/routes',
        'directives': 'app/directives',
        'filters': 'app/filters',
        'constants': 'app/constants'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        angular: {
            deps: ['jquery']
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        }
    }
});

require([
    'angular',
    'app'
], function () {
    'use strict';
    angular.bootstrap(document, [APP_NAME]);
});