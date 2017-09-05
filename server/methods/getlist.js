let connection = require('../config').connection

module.exports =  function (req, res) {
    // req.query 请求参数
    let backdata = {
      result: []
    }
    let qstring = 'SELECT * from todolist'
    connection.query(qstring, function(err, rs) { 
      if (err) { 
        console.log(`[query] - :${err}`); 
        backdata.err = err
        res.send(backdata);
        return; 
      } 
      for (let i = 0; i < rs.length; i++) {
        backdata.result.push(rs[i]);
      }
      res.send(backdata);
    });  
  }
