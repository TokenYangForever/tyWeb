const Koa = require('koa')
const Router = require('koa-router');
const app = new Koa()
const router = new Router()
const compose = require('koa-compose')
const about = ctx => {
	console.log(ctx.request)
  ctx.response.type = 'html'
  ctx.response.body = '<a href="/">Index Page</a>'
}

const main = ctx => {
  ctx.response.body = 'Hello World'
}

const redirect = ctx => {
  ctx.response.redirect('/')
  ctx.response.body = '<a href="/">Index Page</a>'
}

// 中间件
const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
  next()
}

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
}

router.get('/', main).get('/about', about).get('/redirect', redirect)

app.use(compose([logger, errorHandler]))
app
  .use(router.routes())
  .use(router.allowedMethods())
app.listen(3001)
