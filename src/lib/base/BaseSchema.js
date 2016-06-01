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
				type: function(arg) {
					if (arg != null)
						return typeof arg === 'number' && Number.isInteger(arg);
					else
						return true;
				},
				default: (arg) => arg || null
			},
			'float': {
				type: function(arg) {
					if (arg != null)
						return typeof arg === 'number' && !Number.isInteger(arg);
					else
						return true;
				},
				default: (arg) => arg || null
			},
			'uuid': {
				type: (arg) => uuidValidate(arg, 4),
				default: (arg) => arg || null
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
				default: (arg) => arg || null
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
		// Check if any prop key is missing
		for(let key in props) {
			if (!(key in this.props)) throw new Error('Invalid key request');
		}
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
		if (!('is_active' in schema)) {
			schema['is_active'] = {'type': 'bool', 'default': true};
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

	* __validateSchemaConditions() {
		// TO BE IMPLEMENTED
		let valid = true, propKey = null, propValue = null;

		let conditionLoop = function(func, key) {
			console.log(key, func, propValue);
			// if (!func(propValue)) {
			// 	throw Error('Invalid condition: "' + key + 
			// 		'" of ' + propKey + ' is invalid in ' + );
			// }
		}
		
		let schemaLoop = function(value, key) {
			let condition = this._conditions[value];
			// console.log(key, value, func, this._conditions);
			_.forEach(condition, conditionLoop);
		}

		let propLoop = function(propValue, propKey) {
			let schema = this._schema[propKey];
			_.forEach(schema, schemaLoop.bind(this));
		}
		_.forEach(this.props, propLoop.bind(this));

		return yield [valid];
	}

}

module.exports = BaseSchema;