let bodyParser = require('body-parser')
let app = new (require('express'))()
let getlist = require('./methods/getlist')
let savetodo = require('./methods/saveTodo')
let updateItem = require('./methods/saveById')
let uploadimg = require('./methods/uploadimg')

app.use(bodyParser.json({limit: '2000kb'}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  next()
})

app.post('/uploadimg', uploadimg)
app.post('/todo/savetodo', savetodo)
app.get('/todo/getTodo', getlist)
app.get('/todo/updateItem', updateItem)

// app.get('/jsonp', function (req, res) {
//   // req.query 请求参数
//   let backdata = {
//     result: 'hahaha',
//     query: req.query,
//     code: 200
//   }
//   res.send(`${req.query.callback}(${JSON.stringify(backdata)})`)
// })

var server = app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
})
let peopleCounts = 0
let his = [] // 要想查看之前的聊天记录，可以用这个数组存储，connection的时候把它传过去
let io = require('socket.io')(server)
io.on('connection', function (client) {
  ++peopleCounts
  let uname = ''

  client.on('event', function (data) {})

  client.on('disconnect', function (e) {
    --peopleCounts
    io.emit('message from server', {
      data: `系统消息: "${uname}"离开聊天室`,
      counts: peopleCounts
    })
  })

  require('./methods/getNickName')()
    .then(name => {
      uname = name
      io.emit('send nickName', name)
      io.emit('message from server', {
        data: `系统消息: "${name}"进入聊天室`,
        counts: peopleCounts
      })
    })
    .catch(e => { console.log(e) })

  client.on('chat message', function (data) {
    io.emit('message from server', {
      data,
      counts: peopleCounts
    })
  })
})
