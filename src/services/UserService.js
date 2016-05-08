'use strict';
var BaseService = require('src/lib/base/service.js');
var UserRepo = require('src/repos/user/repo');


class UserService extends BaseService {
	constructor(){
		super();
		this.userRepo = new UserRepo();
	}

	* getUserById(userId) {
		try {
			return yield this.userRepo.getById(userId);
		} catch(err) {
			return yield response(err, 404);
		}
	}

	* getAllUsers() {
		return yield this.userRepo.getAll();
	}

	* addUser(userData) {
		let userRepo = new UserRepo(userData);
		return yield userRepo.save();
	}

	* validateSignin(userData) {
		let user = yield userRepo.getUserByEmail();
		
	}
}

module.exports = UserService