'use strict';

var config = require('src/config.js');
var r = require('rethinkdb');
var app = require('src/app.js');
let _ = require('lodash');
let BaseRepo = require('src/lib/base/BaseRepo');
let bcrypt = require('co-bcrypt');


class UserRepo extends BaseRepo {
	constructor(data) {
		super();
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

	* setPassword(password) {
		let salt = yield bcrypt.genSalt(10);
		let hash = yield bcrypt.hash(password, salt);
		this.update({
			password_hash: hash
		})
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
