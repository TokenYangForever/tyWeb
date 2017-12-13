let fs = require('fs')
let bodyParser = require('body-parser')
let app = new (require('express'))()

app.use(bodyParser.json({limit: '2000kb'}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  next()
})

app.post('/saveImgUrl', require('./methods/saveImage'))
app.post('/uploadimg', require('./methods/uploadimg'))
app.post('/todo/savetodo', require('./methods/saveTodo'))
app.get('/todo/getTodo', require('./methods/getlist'))
app.get('/todo/updateItem', require('./methods/saveById'))
app.get('/sudo/getSudo', require('./methods/getSudo'))

const server = app.listen(8081, () => {
  let peopleCounts = 0
  let his = [] // 要想查看之前的聊天记录，可以用这个数组存储，connection的时候把它传过去
  let io = require('socket.io')(server)
  io.on('connection', function (client) {
    // 这里的作用域是局部的，针对一个窗口发起的ws链接
    ++peopleCounts
    let uname = ''
    let uColor = require('./methods/util').getColor()

    client.on('disconnect', function (e) {
      --peopleCounts
      io.emit('sys message', {
        data: `系统消息: "${uname}"离开聊天室`,
        counts: peopleCounts
      })
    })

    require('./methods/getNickName')()
      .then(name => {
        uname = name
        io.emit('initUser', {
          name,
          color: uColor
        })
        io.emit('sys message', {
          data: `系统消息: "${name}"进入聊天室`,
          counts: peopleCounts
        })
      })
      .catch(e => { console.log(e) })

    client.on('chat message', function (data) {
      io.emit('message from server', data)
    })
  })
  console.log('Example app listening on port 8081!')
})
