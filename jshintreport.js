/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var path = require('path');

module.exports.reporter = function (reports, data, opts) {
    'use strict';

    var base = path.dirname(module.filename);

    reports.forEach(function (report) {
        var err = report.error;
        process.stdout.write(path.join(base, report.file) + ':' + err.line + ':' + err.character + ' ' + err.reason + '\n');
    });
};
