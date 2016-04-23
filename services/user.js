'use strict';
var config = require('../config.js');
var BaseService = require(config.baseDir + '/lib/base/service.js');
var UserRepo = require('../repos/user/user.js');


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