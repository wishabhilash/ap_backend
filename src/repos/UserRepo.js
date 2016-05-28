'use strict';

var config = require('src/config');
var r = require('rethinkdb');
var app = require('src/app.js');
let _ = require('lodash');
let BaseRepo = require('src/lib/base/BaseRepo');

class UserRepo extends BaseRepo {
	constructor(props) {
		super(props);
		this._table = "users";
		
		// Create the schema
		let schema = {
			first_name: {'type': 'string', 'maxLen': 50},
			last_name: {'type': 'string', 'maxLen': 50},
			email: {'type': 'email'},
			password_hash: {'type': 'string'}
		};
		this.createSchema(schema);
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
