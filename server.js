/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var express = require('express'),
    compression = require('compression'),
    errorhandler = require('errorhandler'),
    morgan = require('morgan'),
    send = require('send'),
    config = require('./config');

var app = express();

if (config.development()) {

    app.use(compression());
    app.use(express.static(config.client));
    app.use(morgan(config.morgan));

    app.listen(config.port);
    console.log('[server]', '[express]', 'Http server listening on port', config.port);

} else {

    app.use(errorhandler());
    app.use(express.static(config.dist));
    app.use(morgan(config.morgan));

    app.listen(80);
    console.log('[server]', '[express]', 'Http server listening on port 80');
}

