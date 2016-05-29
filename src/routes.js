'use strict';

let Router = require('koa-router');
let UserController = require("src/controllers/UserController");
let ContentController = require("src/controllers/ContentController");

let router = new Router({
	prefix: '/v1'
});

module.exports = () => {
	router.get('/users/:id', UserController.getById);
	router.get('/users', UserController.getAll);
	router.post('/users', UserController.create);

	router.post('/contents', ContentController.create);
	router.get('/contents', ContentController.getAll);
	router.get('/contents/:id', ContentController.getOne);

	router.post('/bookmarks', ContentController.bookmark);
	router.get('/bookmarks', ContentController.getAll);
	router.get('/bookmarks/:id', ContentController.getOne);
	router.delete('/bookmarks/:id', ContentController.unbookmark);
	return router;
}
