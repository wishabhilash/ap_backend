'use strict';
require('app-module-path').addPath(__dirname + "/..");

let assert = require('assert');
require('co-mocha');

let BookmarkRepo = require('src/repos/BookmarkRepo');

describe('BookmarkRepo testing', function() {
	it('should instantiate', function * () {
		let bookmarkRepo = new BookmarkRepo();
		assert.equal(typeof bookmarkRepo, 'object');
	})

	it('should take parameters', function * () {
		let bookmarkRepo = new BookmarkRepo({name: 'test', email: 's@s.com'});
		let props = yield bookmarkRepo.getProperties();
		assert.equal(props.name, 'test');
		assert.equal(props.email, 's@s.com');
	})

	// it('should insert object', function *() {
	// 	let contentRepo = new ContentRepo({content: 'test', title: 'test'});
	// 	let result = yield contentRepo.save();
	// 	console.log(result);
	// 	let props = yield contentRepo.getProperties();
	// 	props.id ? assert(true) : assert(false);
	// });
});