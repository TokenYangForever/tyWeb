const Koa = require('koa')
const app = new Koa()
app.use(async (ctx, next) => {
	console.log(1)
	await next()
	console.log(3)
})
app.use((ctx) => {
	return new Promise((resolve,reject) => {
		setTimeout(() => {
			console.log(2)
			resolve()
		}, 2000)
	})
})
app.listen(3001)