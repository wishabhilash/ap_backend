'use strict';

let config = require('../../config.js');
let BaseSchema = require('./schema.js');

class Schema extends BaseSchema {
	let schema = {
		name: { type: 'string', required: true, max_len: 100 },
		email: { type: 'email', required: true, max_len: 100, unique: true },
		password_hash: { type: 'string',required: true },
		phone: { type: 'phone' }
	}

}

module.exports = Schema;