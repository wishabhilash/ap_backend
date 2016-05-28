'use strict';
require('app-module-path').addPath(__dirname + "/..");

let assert = require('assert');
require('co-mocha');

let UserRepo = require('src/repos/UserRepo');

describe('UserRepo testing', function() {
	it('should instantiate', function * () {
		let userRepo = new UserRepo();
		assert.equal(typeof userRepo, 'object');
	})

	it('should take parameters', function * () {
		let userRepo = new UserRepo({name: 'test', email: 's@s.com'});
		let props = yield userRepo.getProperties();
		assert.equal(props.name, 'test');
		assert.equal(props.email, 's@s.com');
	})
});