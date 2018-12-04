const Koa = require('koa')
const Router = require('koa-router')
const { readFileSync } = require('fs')

const router = new Router()
const app = new Koa()

async function main(ctx, next) {
	let {url} = ctx.req
	if (ctx.path === '/favicon.ico') return;
	try {
		let file = await readFileSync(`.${url}.html`)
		ctx.response.type = 'text/html'
		ctx.response.body = file
	} catch (e) {
		console.log('error:' + e)
		ctx.throw(404, '路径不正确')
	}
	await next()
} 

router.get('*', main)

app.use(router.routes())
app.listen(2333, () => {  
  const chokidar = require('chokidar');
  const WebSocket = require('ws');
  const wss = new WebSocket.Server({
    port: 8006,
    perMessageDeflate: {
      zlibDeflateOptions: {
        // See zlib defaults.
        chunkSize: 1024,
        memLevel: 7,
        level: 3
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024
      },
      // Other options settable:
      clientNoContextTakeover: true, // Defaults to negotiated value.
      serverNoContextTakeover: true, // Defaults to negotiated value.
      serverMaxWindowBits: 10, // Defaults to negotiated value.
      // Below options specified as default values.
      concurrencyLimit: 10, // Limits zlib concurrency for perf.
      threshold: 1024 // Size (in bytes) below which messages
      // should not be compressed.
    }
  });

  wss.on('connection', function connection(ws) {
    const watcher = chokidar.watch('.', {ignored: /(^|[\/\\])\../})
    watcher.on('all', (event, path) => {
    if (event === 'change') {
      console.log(event, path)
      ws.send('changed')
    }
    // ws.on('open', function() {
    //   console.log('open')
    //   watcher.on('all', (event, path) => {
    //   if (event === 'change') {
    //     console.log(event, path)
    //     ws.send('changed')
    //   }
    // });
    })

    ws.on('close', function () {
      console.log('close')
      watcher.close()
    })
  });

});