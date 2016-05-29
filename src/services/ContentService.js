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
			let result = yield this.contentRepo.getById(id);
			return yield this.response(result);
		} catch(err) {
			return yield response(err.message, 404);
		}
	}

	* getAll() {
		let result =  yield this.contentRepo.getAll();
		return yield this.response(result);
	}

	* getOne(id) {
		let result = yield this.contentRepo.getOne(id);
		return yield this.response(result);
	}

	* create(data) {
		try {
			yield this.contentRepo.create(data);
			let result = yield this.contentRepo.save();
			return yield this.response(result);
		} catch(err) {
			return yield this.response(err.message, 404);
		}
	}
}

module.exports = ContentService