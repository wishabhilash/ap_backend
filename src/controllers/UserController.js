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

	create: function *(next) {
		let data = yield parse.form(this);
		this.body = yield UserService.addUser(data);
		yield next;
	}
}