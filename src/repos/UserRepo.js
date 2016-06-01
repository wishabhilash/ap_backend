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

	* getById(id) {
		try {
			var cursor = yield r.table(this._table)
				.get(id).run(app.context.rdbConn);
			return yield cursor.toArray();
		} catch(err) {
			throw err;
		}
	}

	* getByEmail(email) {
		let cursor = null;
		try {
			cursor = yield r.table(this._table)
				.filter({email: email}).run(app.context.rdbConn);
			
		} catch(err) {
			throw err;
		}
		return yield cursor.toArray();
	}

	* instantiate(data) {
		delete data['password'];
		let dataList = [];
		_.forEach(data, function(value, key) {
			dataList.push(new UserRepo(value));
		});
		return yield dataList;
	}

}

module.exports = UserRepo;
