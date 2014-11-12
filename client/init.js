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
        'angular-route': '/lib/angular-route/angular-route',
        'angular-animate': '/lib/angular-animate/angular-animate',
        // Apps
        'app': 'app',
        'controllers': 'controllers',
        'routes': 'routes',
        'directives': 'directives',
        'filters': 'filters',
        'constants': 'constants'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        angular: {
            deps: ['jquery']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-route': {
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

    var config = {
        name: 'sorting-algorithm-animate'
    };
    angular.bootstrap(document, [config.name]);
});