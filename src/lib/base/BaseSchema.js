'use strict';

let uuidValidate = require('uuid-validate');
let _ = require('lodash');
let co = require('co');

class BaseSchema {

	constructor(props) {
		// Set the properties
		this.setProperties(props);

		// Schema this._schema must be defined in the child classes
		this._schema = null;

		// Define the conditions
		this._conditions = {
			'string': {
				type: (arg) => typeof arg === 'string',
				maxLen: (arg, len) => arg.length <= len,
				default: (arg) => arg || ''
			},
			'int': {
				type: (arg) => typeof arg === 'number' && Number.isInteger(arg)
			},
			'float': {
				type: (arg) => typeof arg === 'number' && !Number.isInteger(arg)
			},
			'uuid': {
				type: (arg) => uuidValidate(arg, 4)
			},
			'bool': {
				type: (arg) => typeof arg === 'boolean'
			},
			'email': {
				type: function(arg) {
					var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    				return re.test(arg);
				} 
			},
			'datetime': {
				type: (arg) => 'getDate' in Object.getPrototypeOf(arg),
			}
		};
		
	}

	setProperties(props) {
		props = props || {};
		if (!('id' in props)) {
			props['id'] = null;
		}
		if (!('last_modified' in props)) {
			props['last_modified'] = Date.now();
		}
		this.props = props || {};
	}

	updateProperties(props) {
		this.props = _.assign(this.props, props);
	}

	* getProperties() {
		return yield this.props;
	}

	setSchema(schema) {
		if (!('id' in schema)) {
			schema['id'] = {'type': 'uuid'};
		}
		if (!('last_modified' in schema)) {
			schema['last_modified'] = {'type': 'uuid'};
		}
		this._schema = schema;
	}

	* isValid() {
		let _allAreValid = true;
		// Call methods starting with _validate
		let _protos = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
		for(var item in _protos) {
			if (_protos[item].startsWith('_validate')) {
				let a = yield this[_protos[item]]();
				if (!a[0]) _allAreValid = false;
			}
		}
		return [_allAreValid];
	}

	* _validateSchemaKeys() {
		let valid = true;
		let func = function(value, key) {
			if (!(key in this._schema)) valid = false;
		}
		_.forEach(this.props, func.bind(this));
		if (!valid) throw new Error('Invalid schema');
		return yield [valid];
	}

	* _validateSchemaConditions() {
		let valid = true;
		let func = function(value, key) {
			if (!(key in this._schema)) valid = false;
		}
		_.forEach(this.props, func.bind(this));
		if (!valid) throw new Error('Invalid schema');
		return yield [valid];
	}

}

module.exports = BaseSchema;