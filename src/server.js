'use strict';

require('app-module-path').addPath(__dirname + "/..");

const app = require('src/app.js');
let rdb = require('src/dbConn.js');
let config = require('src/config.js');
const jwt = require('koa-jwt');
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
// app.use(jwt({secret: config.secretKey})).unless({path: [/^\/public/]})

// Put all routes after using jwt
let router = require('./routes.js')();
app.use(router.routes());
app.use(router.allowedMethods());


app.use(rdb.closeRdbConnection);

app.listen(config.koa.port);
