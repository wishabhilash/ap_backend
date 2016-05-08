'use strict';

let Router = require('koa-router');
let UserController = require("src/controllers/user.js");

let router = new Router({
	prefix: '/v1'
});

module.exports = () => {
	router.get('/user/:id', UserController.getById);
	router.get('/user', UserController.getAll);
	router.post('/user', UserController.create);
	return router;	
}
