'use strict';
let BookmarkService = new (require('src/services/BookmarkService'))();
let parse = require('co-body');

module.exports = {
	add: function *(next) {
		let data = yield parse.form(this);
		this.body = yield BookmarkService.add(data);
		yield next;
	},

	getOne: function *(next) {

	},

	getAll: function *(next) {
		this.body = yield BookmarkService.getAll();
		yield next;
	},

	bookmark: function *(next) {
		let data = yield parse.form(this);
		this.body = yield BookmarkService.add(data);
		yield next;
	},

	unbookmark: function *(next) {
		this.body = yield BookmarkService.remove(this.params.id);
		yield next;
	}
}