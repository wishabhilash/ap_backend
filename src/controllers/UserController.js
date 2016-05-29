'use strict';
let UserService = new (require('src/services/UserService'))();
let parse = require('co-body');

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
		this.body = yield UserService.getAll();
		yield next;
	},

	register: function *(next) {
		let data = yield parse.form(this);
		this.body = yield UserService.register(data);
		yield next;
	},

	login: function *(next) {
		let data = yield parse.form(this);
		// TO DO SIGN IN LOGIC
		this.body = yield UserService.login(data);
	}
}