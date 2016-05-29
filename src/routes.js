'use strict';

let Router = require('koa-router');
let UserController = require("src/controllers/UserController");
let ContentController = require("src/controllers/ContentController");
let BookmarkController = require("src/controllers/BookmarkController");

let router = new Router({
	prefix: '/v1'
});

router.get('/users/:id', UserController.getById);
router.get('/users', UserController.getAll);
router.post('/open/users/register', UserController.register);
router.post('/open/users/login', UserController.login);

router.post('/contents', ContentController.create);
router.get('/contents', ContentController.getAll);
router.get('/contents/:id', ContentController.getOne);
router.put('/contents/:id', ContentController.getOne);

router.post('/bookmarks', BookmarkController.bookmark);
router.get('/bookmarks', BookmarkController.getAll);
router.get('/bookmarks/:id', BookmarkController.getOne);
router.delete('/bookmarks/:id', BookmarkController.unbookmark);

module.exports = router;