'use strict';

let _ = require('lodash');

class BaseRepo {

	constructor(data) {
		this._schema = null;
		this._table = null;
	}

	* create(data) {
		if (!this.schema) throw new Error('Schema not defined.');
		this._schema.setProperties(data);
	}

	* update(data) {

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

}