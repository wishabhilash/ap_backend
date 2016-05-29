'use strict';
var BaseService = require('src/lib/base/BaseService');
var BookmarkRepo = require('src/repos/BookmarkRepo');


class BookmarkService extends BaseService {
	constructor(){
		super();
		this.bookmarkRepo = new BookmarkRepo();
	}

	* getById(id) {
		try {
			return yield this.bookmarkRepo.getById(id);
		} catch(err) {
			return yield response(err.message, 404);
		}
	}

	* getAll() {
		return yield this.bookmarkRepo.getAll();
	}

	* create(data) {
		try {
			yield this.bookmarkRepo.create(data);
			return yield this.bookmarkRepo.save();
		} catch(err) {
			return yield this.response(err.message, 404);
		}
	}

	* remove(id) {
		try {
			yield this.bookmarkRepo.delete(id);
		} catch (err) {
			return yield this.response(err.message, 404);
		}
	}
}

module.exports = BookmarkService