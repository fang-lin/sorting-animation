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
            title: 'sorting-algorithm-animate'
        })
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
