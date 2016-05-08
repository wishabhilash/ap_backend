'use strict';

let Router = require('koa-router');
let config = require('./config.js');
let UserController = require(config.baseDir + "/controllers/user.js");

let router = new Router({
	prefix: '/v1'
});

module.exports = () => {
	router.get('/user/:id', UserController.getById);
	router.get('/user', UserController.getAll);
	router.post('/user', UserController.create);
	return router;	
}
