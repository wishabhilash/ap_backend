var router = require('koa-router')();

module.exports = () => {
	router.get('/', function *(){
		this.body = 'Hello world!!!';
	});
	return router;	
}
