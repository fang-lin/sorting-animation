/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

define([
    'algorithms/binaryInsertSort',
    'algorithms/bubbleSort',
    'algorithms/heapSort',
    'algorithms/insertSort',
    'algorithms/mergeSort',
    'algorithms/quickSort',
    'algorithms/selectSort',
    'algorithms/shakerSort',
    'algorithms/shellSort',
    'angular'
], function (binaryInsert, bubble, heap, insert, merge, quick, select, shaker, shell) {
    'use strict';

    return angular.module(APP_NAME + '.steps', [])
        .factory('steps', [function () {
            return {
                bubble: bubble,
                heap: heap,
                insert: insert,
                merge: merge,
                quick: quick,
                select: select,
                shaker: shaker,
                shell: shell
            };
        }]);
});