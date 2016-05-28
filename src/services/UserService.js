'use strict';

var BaseService = require('src/lib/base/service');
var UserRepo = require('src/repos/UserRepo');
let bcrypt = require('co-bcrypt');

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
		let salt = yield bcrypt.genSalt(10);
		let hash = yield bcrypt.hash(password, salt);
		userRepo.update({
			password_hash: hash
		});
	}

	* generateHash() {
		
	}
}

module.exports = UserService