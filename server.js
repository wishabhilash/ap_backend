var app = require('koa')();

var router = require('./routes.js')();

app.use(
	router.routes()
).use(
	router.allowedMethods()
);

app.listen(9990);
