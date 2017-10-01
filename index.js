'use strict';

if (process.env.TRACE) {
  require('./libs/trace');
}

const Koa = require('koa');
const app = new Koa();
const mongoose=require('mongoose');
const config = require('./config/default');
var port = process.env.PORT || 8080;
// keys for in-koa KeyGrip cookie signing (used in session, maybe other modules)
app.keys = [config.secret];

const path = require('path');
const fs = require('fs');

const handlers = fs.readdirSync(path.join(__dirname, 'handlers')).sort();

handlers.forEach(handler => require('./handlers/' + handler).init(app));

var MessageBD=require('./BD/messages');

const Router = require('koa-router');

const router = new Router();

let clients = [];
router.get('/first', async (ctx, next)=>{
  var massData= await MessageBD.find();
  ctx.body=massData;

});

router.get('/subscribe', async (ctx, next) => {

  ctx.set('Cache-Control', 'no-cache,must-revalidate');
  const promise = new Promise((resolve, reject) => {
    clients.push(resolve);

    ctx.res.on('close', function() {
      clients.splice(clients.indexOf(resolve), 1);
      const error = new Error('Connection closed');
      error.code = 'ECONNRESET';
      reject(error);
    });

  });

  let message;

  try {
    message = await promise;
  } catch(err) {
    if (err.code === 'ECONNRESET') return;
    throw err;
  }

  // console.log('DONE', message);
  ctx.body = message;

});

router.post('/publish', async (ctx, next) => {
  const message = ctx.request.body.data;

  if (!message) {
    ctx.throw(400);
  }

  var soobsh=new MessageBD(message);
  soobsh.save();

  clients.forEach(function(resolve) {
    resolve(message);
  });

  clients = [];

  ctx.body = 'ok';

});

app.use(router.routes());

app.listen(port);
