'use strict';
var BaseService = require('src/lib/base/service');
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
			return yield response(err, 404);
		}
	}

	* getAll() {
		return yield this.contentRepo.getAll();
	}
}

module.exports = UserService