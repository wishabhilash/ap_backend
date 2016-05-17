'use strict';
require('app-module-path').addPath(__dirname + "/..");

var assert = require('assert');
require('co-mocha');

var UserRepo = require('src/repos/UserRepo');

describe('UserRepo testing', function() {
	it('should instantiate', function * () {
		var userRepo = new UserRepo();
		assert.equal(typeof userRepo, 'object');
	})

	it('should take parameters', function * () {
		var userRepo = new UserRepo({name: 'test', email: 's@s.com'});
		assert.equal(userRepo.name, 'test');
		assert.equal(userRepo.email, 's@s.com');
	})
});