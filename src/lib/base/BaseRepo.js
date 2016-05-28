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
		console.log(data);
		if (!this._schema) throw new Error('Schema not defined.');
		this._schema.setProperties(data);
		return yield [];
	}

	* update(data) {
		if (!this._schema) throw new Error('Schema not defined.');
		this._schema.updateProperties(data);
		return yield [];
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
		if (dataIsValid[0]) data = yield this.getProperties();
		
		// Update last_modified flag with current time
		data.last_modified = new Date();

		// Check if table name exists
		if (!this._table) throw Error('Table name not provided');
		
		// If id exists in data, then update it
		// else insert new data
		let result = null;
		if ('id' in data && data['id']) {
			try {
				result = yield r.table(this._table)
					.get(data.id)
					.update(data, {returnChanges: true})
					.run(app.context.rdbConn);				
			} catch(err) {
				throw err;
			}
		} else {
			if ('id' in data) delete data['id'];
			try {
				result = yield r.table(this._table)
					.insert(data, {returnChanges: true})
					.run(app.context.rdbConn);
			} catch(err) {
				throw err;
			}
		}
		return yield result.changes[0].new_val;
	}

	// Used only for testing cleanup
	* _remove(id) {
		if (!id) return yield [false];
		try {
			yield r.table(this._table)
				.get(id).delete()
				.run(app.context.rdbConn);
		} catch(err) {
			throw err;
		}
		return yield [true];
	}

}

module.exports = BaseRepo;