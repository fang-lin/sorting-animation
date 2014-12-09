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
        'angular-animate': '/lib/angular-animate/angular-animate',
        'angular-ui-router': '/lib/angular-ui-router/release/angular-ui-router',
        'angular-sanitize': '/lib/angular-sanitize/angular-sanitize',
        // Apps
        'app': 'app/app',
        'algorithms': 'app/algorithms',
        'controllers': 'app/controllers',
        'routes': 'app/routes',
        'directives': 'app/directives',
        'filters': 'app/filters',
        'constants': 'app/constants',
        'services': 'app/services'
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
        },
        'angular-sanitize': {
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