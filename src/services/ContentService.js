'use strict';
var BaseService = require('src/lib/base/BaseService');
var ContentRepo = require('src/repos/ContentRepo');


class ContentService extends BaseService {
	constructor(){
		super();
		this.contentRepo = new ContentRepo();
	}

	* getById(id) {
		try {
			return yield this.contentRepo.getById(id);
		} catch(err) {
			return yield response(err.message, 404);
		}
	}

	* getAll() {
		return yield this.contentRepo.getAll();
	}

	* getOne(id) {
		let result = yield this.contentRepo.getOne(id);
		return yield result;
	}

	* create(data) {
		try {
			yield this.contentRepo.create(data);
			return yield this.contentRepo.save();
		} catch(err) {
			return yield this.response(err.message, 404);
		}
	}
}

module.exports = ContentService