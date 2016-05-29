'use strict';

var r = require('rethinkdb');
var config = require('src/config.js');
var app = require('src/app.js');

function* createRdbConnection(next) {
    try{
        var conn = yield r.connect(config.rethinkdb);
        app.context.rdbConn = conn;
    }
    catch(err) {
        console.log("error", err);
        this.status = 500;
        this.body = err.message || http.STATUS_CODES[this.status];
    }
    yield next;
}

function * closeRdbConnection () {
    app.context.rdbConn.close();
}

module.exports = {
    createRdbConnection: createRdbConnection,
    closeRdbConnection: closeRdbConnection
}