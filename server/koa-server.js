const Koa = require('koa')
const Router = require('koa-router')
const session = require('koa-session')
const app = new Koa()
const router = new Router()
const about = ctx => {
  ctx.response.type = 'html'
  ctx.response.body = '<a href="/">Index Page</a>'
}

app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
}
app.use(errorHandler).use(session(CONFIG, app)).use(async (ctx, next) => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;
    // 这样获取从浏览器得到的cookie
  // 使用router之后cookie不生效
  //ctx.cookie.get('cookieA')
  // 这样设置传递给浏览器的cookie
  //ctx.cookie.set('cookieA', 'a').set('cookieB', 'b')
  await next()
  let n = ctx.session.views || 0
  ctx.session.views = ++n
  // console.log(ctx.session.views)
});

// or if you prefer all default config, just use => app.use(session(app));

const main = async (ctx, next) => {
  ctx.response.body = 'hello world'
  next()
}

const redirect = ctx => {
  ctx.response.redirect('/')
  ctx.response.body = '<a href="/">Index Page</a>'
}





router.get('/', main).get('/about', about).get('/redirect', redirect)

app.use(router.routes()).use(router.allowedMethods())
app.listen(3001)
