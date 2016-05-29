'use strict';

require('app-module-path').addPath(__dirname + "/..");

let app = require('src/app.js');
let rdb = require('src/dbConn.js');
let config = require('src/config.js');
let jwt = require('koa-jwt');
app.unless = require('koa-unless');


// Catch all response errors
app.use(function *(next){
  try {
    yield next;
  } catch (err) {
    if (err.status <= 300) {
      this.status = err.status;
      this.body = err.message;
    } else {
      throw err;
    }
  }
});

app.use(rdb.createRdbConnection);
app.use(jwt({secret: config.secretKey}).unless({path: [/^\/v1\/open/]}));

// Put all routes after using jwt
let router = require('src/routes');
app.use(router.routes());
app.use(router.allowedMethods());


app.use(rdb.closeRdbConnection);

app.listen(config.koa.port);
