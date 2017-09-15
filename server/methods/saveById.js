let connection = require('../config').connection

module.exports = function (req, res) {
  // req.query 请求参数
  let backdata = {
    result: []
  }
  let {serid, statu} = req.query
  let qstring = `UPDATE todolist SET statu = '${statu}' WHERE itemid = '${serid}' `
  connection.query(qstring, function (err, rs) {
    if (err) {
      console.log(`[query] - :${err}`)
      backdata.err = err
      res.send(backdata)
      return
    }
    if (rs.affectedRows == 1) {
      backdata.code = 200
      res.send(backdata)
    } else {
      backdata.err = '查询失败'
      res.send(backdata)
    }
  })
}
