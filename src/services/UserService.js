'use strict';

var BaseService = require('src/lib/base/BaseService');
var UserRepo = require('src/repos/UserRepo');
let bcrypt = require('co-bcrypt');
let jwt = require('koa-jwt');
let config = require('src/config');


class UserService extends BaseService {
	constructor(){
		super();
		this.userRepo = new UserRepo();
	}

	* getById(userId) {
		try {
			return yield this.userRepo.getById(userId);
		} catch(err) {
			return yield response(err.message, 404);
		}
	}

	* getAll() {
		return yield this.userRepo.getAll();
	}

	* addUser(userData) {
		let userRepo = new UserRepo(userData);
		return yield userRepo.save();
	}

	* login(userData) {
		// let user = yield userRepo.getUserByEmail();
		let token = jwt.sign({foo: 'bar'}, config.secretKey);
		return yield this.response({token: token});
	}

	* register(data) {

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