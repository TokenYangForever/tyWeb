let express = require('express');
let bodyParser = require("body-parser"); 
let app = new express()
let getlist = require('./methods/getlist')

app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   // res.header("Content-Type", "application/json;charset=utf-8");
   next();
});



app.get('/getTodo.html', getlist);

var server = app.listen(8081, function () {
	console.log('Example app listening on port 8081!');
})