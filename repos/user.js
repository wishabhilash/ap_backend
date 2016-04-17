'use strict';

var config = require('../config.js');
var r = require('rethinkdb');
var app = require(config.baseDir + '/app.js');

class User {
	* create() {
		this.body = "asaaa";
		// try {
		// 	var result = yield r.table('users').insert(
		// 		{name: 'Abhilash Nanda'},
		// 		{returnChanges: true}
		// 	).run(this._rdbConn);
		// 	this.body = JSON.stringify(result.changes[0].new_val);
		// } catch(e) {
		// 	this.status = 500;
  //       	this.body = e.message || http.STATUS_CODES[this.status];
		// }
	}

	* getAll() {
		try {
			var cursor = yield r.table('users').run(app.context.rdbConn);
			return yield cursor.toArray();
		} catch(err) {
			throw err;
		}
	}

}

module.exports = User;