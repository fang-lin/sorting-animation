/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'angular'
], function () {
    'use strict';

    return angular.module(APP_NAME + '.constants', [])
        .constant('SITE_INFO', {
            TITLE: 'sorting-algorithm-animate',
            COPYRIGHT: '<a href="http://fanglin.name/" target="_blank">fanglin.name</a> &copy; 2014'
        })
        .constant('DELAYS', [0, 50, 100, 200, 500, 1000])
        .constant('COUNTS', [10, 20, 40, 80, 160, 320])
        .constant('ALGORITHMS', [
            {
                key: 'bubble',
                name: 'Bubble',
                fn: 'bubbleSort'
            },
            {
                key: 'shaker',
                name: 'Shaker',
                fn: 'shakerSort'
            },
            {
                key: 'select',
                name: 'Select',
                fn: 'selectSort'
            },
            {
                key: 'insert',
                name: 'Insert',
                fn: 'insertSort'
            },
            {
                key: 'binaryInsert',
                name: 'Binary Insert',
                fn: 'binaryInsertSort'
            },
            {
                key: 'shell',
                name: 'Shell',
                fn: 'shellSort'
            },
            {
                key: 'heap',
                name: 'Heap',
                fn: 'heapSort'
            },
            {
                key: 'merge',
                name: 'Merge',
                fn: 'mergeSort'
            },
            {
                key: 'quick',
                name: 'Quick',
                fn: 'quickSort'
            }
        ]);
});
