'use strict';

var config = require('src/config');
var r = require('rethinkdb');
var app = require('src/app.js');
let _ = require('lodash');
let BaseRepo = require('src/lib/base/BaseRepo');

class ContentRepo extends BaseRepo {
	constructor(props) {
		super(props);
		this._table = "content";

		let schema = {
			content: {'type': 'string', 'required': true},
			title: {'type': 'string', 'required': true},
			author: {'type': 'uuid'}
		}

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

	* getById() {
		
	}
}

module.exports = ContentRepo;