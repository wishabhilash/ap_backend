'use strict';

let router = require('koa-router')();
let config = require('./config.js');
let UserController = require(config.baseDir + "/controllers/user.js");
// let koaBody = require('koa-body')();

module.exports = () => {
	router.get('/v1/user/:id', UserController.getById);
	router.get('/v1/user', UserController.getAll);
	router.post('/v1/user', UserController.addUser);
	return router;	
}
