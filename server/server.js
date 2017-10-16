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
   // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   // res.header("X-Powered-By",' 3.2.1');
   // res.header("Content-Type", "application/json;charset=utf-8");
  next()
})

app.post('/uploadimg', uploadimg)
app.post('/savetodo', savetodo)
app.get('/getTodo', getlist)
app.get('/updateItem', updateItem)

app.get('/jsonp', function (req, res) {
  // req.query 请求参数
  let backdata = {
    result: 'hahaha',
    query: req.query,
    code: 200
  }
  // let backdata = {
  // }
  res.send(`${req.query.callback}(${JSON.stringify(backdata)})`)
  // res.send(JSON.parse(JSON.stringify(backdata)))
})

var server = app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
})
