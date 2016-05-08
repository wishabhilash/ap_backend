'use strict';

var config = require('../../config.js');
var r = require('rethinkdb');
var app = require(config.baseDir + '/app.js');
let _ = require('lodash');

class UserRepo {
	constructor(data) {
		this._data = data;
		this._table = "users";
	}

	* save() {
		this._data.last_modified = new Date();
		if (this._data.id) {
			try {
				var result = yield r.table(this._table)
					.get(this._data.id)
					.update(this._data, {returnChanges: true})
					.run(app.context.rdbConn);
				return yield result.changes[0].new_val;
			} catch(err) {
				throw err;
			}
		} else {
			try {
				var result = yield r.table(this._table)
					.insert(this._data, {returnChanges: true})
					.run(app.context.rdbConn);
				return yield result.changes[0].new_val;
			} catch(err) {
				throw err;
			}
		}
		
	}

	* getAll() {
		try {
			var cursor = yield r.table(this._table).run(app.context.rdbConn);
			return yield cursor.toArray();
		} catch(err) {
			throw err;
		}
	}

	* getById(userId) {
		try {
			var cursor = yield r.table(this._table)
				.get(userId).run(app.context.rdbConn);
			return yield cursor.toArray();
		} catch(err) {
			throw err;
		}
	}

	* getByEmail(userEmail) {
		try {
			var cursor = yield r.table(this._table)
				.filter({email: userId.email}).run(app.context.rdbConn);
			return yield cursor.toArray();
		} catch(err) {
			throw err;
		}
	}

}

module.exports = UserRepo;
