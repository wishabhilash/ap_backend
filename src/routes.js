'use strict';

let Router = require('koa-router');
let UserController = require("src/controllers/UserController");
let ContentController = require("src/controllers/ContentController");

let router = new Router({
	prefix: '/v1'
});

module.exports = () => {
	router.get('/user/:id', UserController.getById);
	router.get('/user', UserController.getAll);
	router.post('/user', UserController.create);

	router.post('/content', ContentController.create);
	router.get('/content', ContentController.getAll);
	return router;
}
