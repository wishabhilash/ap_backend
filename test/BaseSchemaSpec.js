'use strict';
require('app-module-path').addPath(__dirname + "/..");

let assert = require('assert');
require('co-mocha');
let _ = require('lodash');

let BaseSchema = require('src/lib/base/BaseSchema');

describe('BaseSchema testing', function() {
	let defaultSchema = {
		id: {'type': 'uuid'},
		name: {'type': 'string', 'maxLen': 50},
		age: {'type': 'int'},
		cgp: {'type': 'float'},
		admin: {'type': 'bool'}
	};

	it('should instantiate', function * () {
		let baseSchema = new BaseSchema();
		assert.equal(baseSchema instanceof BaseSchema, true);
	});

	it('should assign arguments', function * () {
		let args = {
			id: "s",
			name: 's',
			age: 2,
			cgp: 1.2,
			admin: false
		};
		let baseSchema = new BaseSchema(args);
		assert.equal(_.size(args) == _.size(baseSchema.props), true);
	});

	it('should assign schema', function * () {
		let baseSchema = new BaseSchema();
		baseSchema.setSchema(defaultSchema);
		assert.equal(_.size(defaultSchema), _.size(baseSchema._schema));
	});

	it('schema size must pass', function *() {
		let args = {
			id: "s",
			name: 's',
			age: 2,
			cgp: 1.2,
			admin: false
		};
		let baseSchema = new BaseSchema(args);
		baseSchema.setSchema(defaultSchema);
		let m = yield baseSchema._checkSchemaSize();
		assert(m[0]);
	});

	it('validate method must return true', function * () {
		let args = {
			id: "s",
			name: 's',
			age: 2,
			cgp: 1.2,
			admin: false
		};
		let baseSchema = new BaseSchema(args);
		baseSchema.setSchema(defaultSchema);
		let m = yield baseSchema.isValid();
		assert.equal(m[0], true);
	});

	it('validate method must throw Error on extra param', function * () {
		let args = {
			id: "s",
			name: 's',
			age: 2,
			cgp: 1.2,
			admin: false,
			lost: 12
		};
		let baseSchema = new BaseSchema(args);
		baseSchema.setSchema(defaultSchema);
		try {
			yield baseSchema.isValid();
		} catch (Error) {
			assert(true);
		}
	});

	it('validate method must throw Error on typo param', function * () {
		let args = {
			id: "s",
			name: 's',
			age: 2,
			cgp: 1.2,
			admins: false,
		};
		let baseSchema = new BaseSchema(args);
		baseSchema.setSchema(defaultSchema);
		try {
			yield baseSchema.validate();
		} catch (Error) {
			assert(true);
		}
	});

});