'use strict';

var config = require('src/config.js');
var r = require('rethinkdb');
var app = require('src/app.js');
let _ = require('lodash');


class ContentRepo {
	constructor() {
		this._table = "content";
	}

	* getById() {
		
	}
}