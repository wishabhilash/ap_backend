'use strict';
var config = require('../config.js');
var BaseService = require(config.baseDir + '/lib/base/service.js');
var UserClass = require('../repos/user.js');

var UserRepo = new UserClass();

class UserService extends BaseService {
	* getUserById(id) {
		try {
			// return yield UserRepo.getById(id);
		} catch(err) {
			
		}
		
	}

	* getAllUsers() {
		return yield UserRepo.getAll();
	}

	* createUser(userData) {

	}
}

module.exports = UserService