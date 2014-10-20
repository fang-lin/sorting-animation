/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

//var express = require('express');
//
//
//var app = express();
//
//console.log(app);

var EventEmitter = require('events').EventEmitter,
    util = require('util'),
    http = require('http');

var Promise = function () {
    EventEmitter.call(this);
};

util.inherits(Promise, EventEmitter);

Promise.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
    if (typeof fulfilledHandler === 'function') {
        this.once('success', fulfilledHandler);
    }
    if (typeof errorHandler === 'function') {
        this.once('error', errorHandler);
    }
    if (typeof progressHandler === 'function') {
        this.on('progress', progressHandler);
    }
};

var Deferred = function () {
    this.status = 'unfulfilled';
    this.promise = new Promise();
};

Deferred.prototype.resolve = function (obj) {
    this.status = 'fulfilled';
    this.promise.emit('success', obj);
};

Deferred.prototype.reject = function (err) {
    this.status = 'failed';
    this.promise.emit('error', err);
};

Deferred.prototype.progress = function (data) {
    this.promise.emit('progress', data)
};


var promisify = function (res) {
    var deferred = new Deferred();
    var result = '';

    res.on('data', function (chunk) {
        result += chunk;
        deferred.progress(chunk);
    });
    res.on('end', function () {
        deferred.resolve(result);
    });
    res.on('error', function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
};


promisify(res).then(function () {

});



















