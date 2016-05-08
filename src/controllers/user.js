'use strict';
let config = require('../config.js');
let UserServiceClass = require(config.baseDir + '/services/user.js');
// let userValidator = require(config.baseDir + '/validators/user.js');
let parse = require('co-body');
let UserService = new UserServiceClass();

module.exports = {
	getById: function * (next){
		if (!this.params.id) {
			this.status = 403;
			this.body = "no user_id found.";
		}
		this.body = yield UserService.getById(this.params.id);
		yield next;
	},

	getAll: function * (next) {
		this.body = yield UserService.getAllUsers();
		yield next;
	},

	create: function *(next) {
		let data = yield parse.form(this);
		this.body = yield UserService.addUser(data);
		yield next;
	}
}