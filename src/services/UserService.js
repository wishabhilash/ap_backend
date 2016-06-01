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

	* addUser(data) {
		let userRepo = new UserRepo(data);
		return yield userRepo.save();
	}

	* login(data) {
		let users = yield this.userRepo.getByEmail(data['email']);
		if (!users.length) {
			return this.response('Invalid user', 403);
		}
		let user = users[0];
		// Create salt to match

		let salt = yield bcrypt.genSalt(10);
		let comparison = yield bcrypt.compare(data['password'], user.password);

		if (comparison) {
			let token = jwt.sign({foo: 'bar'}, config.secretKey);
			return yield this.response({token: token});
		} else {
			return yield this.response({error: 'Authentication failure'}, 401);
		}
		
	}

	* register(data) {
		if (!('password' in data && 'email' in data))
			return yield this.response({error: 'Invalid parameters'}, 403);

		let user = yield this.userRepo.getByEmail(data['email']);
		if (user.length) {
			return yield this.response({error: 'User already exists'}, 403);
		}
		
		// Get password hash
		data['password'] = yield this._generateHash(data['password']);

		user = new UserRepo(data);
		try {
			yield user.save();
		} catch (err) {
			return yield response(err.message, 404);
		}
		let token = jwt.sign({foo: 'bar'}, config.secretKey);
		return yield this.response({token: token});
	}

	* setPassword(password) {
		let hash = yield this._generateHash(password);
		userRepo.update({
			password_hash: hash
		});
	}

	* _generateHash(password) {
		let salt = yield bcrypt.genSalt(10);
		return yield bcrypt.hash(password, salt);
	}

}

module.exports = UserService