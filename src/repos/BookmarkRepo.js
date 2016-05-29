'use strict';

var config = require('src/config');
var r = require('rethinkdb');
var app = require('src/app');
let _ = require('lodash');
let BaseRepo = require('src/lib/base/BaseRepo');

class BookmarkRepo extends BaseRepo {
	constructor(props) {
		super(props);
		this._table = "bookmarks";

		let schema = {
			user_id: {'type': 'uuid'},
			content_id: {'type': 'uuid'}
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
}

module.exports = BookmarkRepo;