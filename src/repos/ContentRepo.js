'use strict';

var config = require('src/config.js');
var r = require('rethinkdb');
var app = require('src/app.js');
let _ = require('lodash');
let BaseRepo = require('src/lib/base/BaseRepo');

class ContentRepo extends BaseRepo {
	constructor(data) {
		super();
		this._table = "content";

		let schema = {
			content: {'type': 'string'},
			title: {'type': 'string'},
			author: {'type': 'uuid'}
		}

		this.createSchema(schema);
	}

	* getById() {
		
	}
}