
// Usually served by Nginx
const serve = require('koa-static');

exports.init = app => app.use(serve('public'));

/*
  await next()

  method === 'GET' ?
  no: await next()
  yes: url = '/users/ivan'
    fs.stat('public/users/ivan', (err, stat) => {
      // if exists - ctx.body = await fs.readFile()
      // no - await next()
    })
*/
