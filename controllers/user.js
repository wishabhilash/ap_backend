'use strict';
let config = require('../config.js');
let UserServiceClass = require(config.baseDir + '/services/user.js');
let userValidator = require(config.baseDir + '/validators/user.js');
let parse = require('co-body');
let UserService = new UserServiceClass();

module.exports = {
	getById: function * (next){
		this.body = "this is great";
		yield next;
	},

	getAll: function * (next) {
		this.body = yield UserService.getAllUsers();
		yield next;
	},

	addUser: function *(next) {
		let a = yield parse.form(this);
		console.log(a);
		userValidator.userAddValidator(this);
		if (this.errors) {
			this.body = this.errors;
			return;
		}
		this.body = this.params;
		yield next;
	}
}