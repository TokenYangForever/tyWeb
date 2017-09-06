let connection = require('../config').connection

module.exports =  function (req, res) {
  // req.query 请求参数
  let backdata = {
    result: []
  }
  let reqParam = req.body
  let qstring = `INSERT INTO todolist (title, description) VALUES ('${reqParam.title}','${reqParam.description}')`
  connection.query(qstring, function(err, rs) { 
    if (err) { 
      console.log(`[query] - :${err}`); 
      backdata.err = err
      res.send(backdata);
      return; 
    } 
    backdata.code = 200
    res.send(backdata);
  });
}
