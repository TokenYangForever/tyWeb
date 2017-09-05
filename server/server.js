let bodyParser = require("body-parser"); 
let app = new (require('express'))()
let getlist = require('./methods/getlist')

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', function(req, res, next) {
   console.log({path: req.path, baseUrl: req.baseUrl, originalUrl: req.originalUrl, url: req.url});
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   // res.header("Content-Type", "application/json;charset=utf-8");
   next();
});



app.get('/getTodo', getlist);

var server = app.listen(8081, function () {
	console.log('Example app listening on port 8081!');
})