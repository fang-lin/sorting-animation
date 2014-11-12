/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

module.exports = {
    morgan: 'short',
    app: 'app',
    dist: 'dist',
    port: 8000,
    development: function () {
        return ['dev', 'development'].indexOf(process.env.NODE_ENV) !== -1;
    }
};