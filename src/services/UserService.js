'use strict';
var BaseService = require('src/lib/base/service');
var UserRepo = require('src/repos/UserRepo');


class UserService extends BaseService {
	constructor(){
		super();
		this.userRepo = new UserRepo();
	}

	* getById(userId) {
		try {
			return yield this.userRepo.getById(userId);
		} catch(err) {
			return yield response(err, 404);
		}
	}

	* getAll() {
		return yield this.userRepo.getAll();
	}

	* addUser(userData) {
		let userRepo = new UserRepo(userData);
		return yield userRepo.save();
	}

	* signin(userData) {
		let user = yield userRepo.getUserByEmail();
		
	}

	* setPassword() {

	}

	* generateHash() {
		
	}
}

module.exports = UserService