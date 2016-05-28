'use strict';
let ContentService = new (require('src/services/ContentService'))();
let parse = require('co-body');

module.exports = {
	create: function *(next) {
		let data = yield parse.form(this);
		this.body = yield ContentService.create(data);
		yield next;
	},

	getAll: function *(next) {
		this.body = yield ContentService.getAll();
		yield next;
	}
}