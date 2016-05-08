'use strict';

var r = require('rethinkdb');
var config = require('./config.js');
var app = require(config.baseDir + '/app.js');

function* createRdbConnection(next) {
    try{
        var conn = yield r.connect(config.rethinkdb);
        app.context.rdbConn = conn;
    }
    catch(err) {
        
        this.status = 500;
        this.body = err.message || http.STATUS_CODES[this.status];
    }
    yield next;
}

function * closeRdbConnection () {
    app.context.rdbConn.close();
    // console.log(app.context.rdbConn, 'connection closed...');
}

module.exports = {
    createRdbConnection: createRdbConnection,
    closeRdbConnection: closeRdbConnection
}