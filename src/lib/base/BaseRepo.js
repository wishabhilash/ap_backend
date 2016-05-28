'use strict';

let config = require('src/config.js');
let r = require('rethinkdb');
let app = require('src/app.js');
let _ = require('lodash');
let BaseSchema = require('src/lib/base/BaseSchema');


class Schema extends BaseSchema {
	constructor(data) {
		super(data);
	}
}

class BaseRepo {

	constructor(props) {
		props = props || {};
		this._schema = new Schema(props);
		this._table = null;
	}

	createSchema(schema) {
		this._schema.setSchema(schema);
	}

	* create(data) {
		if (!this.schema) throw new Error('Schema not defined.');
		this._schema.setProperties(data);
	}

	* update(data) {
		if (!this._schema) throw new Error('Schema not defined.');
		this._schema.updateProperties(data);
	}

	* getProperties() {
		return yield this._schema.getProperties();
	}

	* save() {
		let data = null;
		// Check if this._schema exists
		if (!this._schema) throw new Error('Schema not defined.');

		// Test validity of data
		let dataIsValid = yield this._schema.isValid();

		// If data is valid then get the data to save
		if (dataIsValid) data = yield this._schema.getProperties();
		
		// Update last_modified flag with current time
		data.last_modified = new Date();

		// Check if table name exists
		if (!this._table) throw Error('Table name not provided');

		// If id exists in data, then update it
		// else insert new data
		if (id in data) {
			try {
				var result = yield r.table(this._table)
					.get(data.id)
					.update(data, {returnChanges: true})
					.run(app.context.rdbConn);
				return yield result.changes[0].new_val;
			} catch(err) {
				throw err;
			}
		} else {
			try {
				var result = yield r.table(this._table)
					.insert(data, {returnChanges: true})
					.run(app.context.rdbConn);
				return yield result.changes[0].new_val;
			} catch(err) {
				throw err;
			}
		}
		
	}

}

module.exports = BaseRepo;