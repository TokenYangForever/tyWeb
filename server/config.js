let mysql = require('mysql'); //调用MySQL模块
let connection = mysql.createConnection({   
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'tydatabase', 
  port: '3306'
});
module.exports = {
	connection
}