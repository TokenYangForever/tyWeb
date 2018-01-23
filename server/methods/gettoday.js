let connection = require('../config').connection

module.exports = function (req, res) {
  // req.query 请求参数
  let backdata = {
    result: []
  }
  let qstring = `SELECT * FROM tydatabase.history_today WHERE date = "${req.query.date}"`
  connection.query(qstring, function (err, rs) {
    if (err) {
      console.log(`[query] - :${err}`)
      backdata.err = err
      res.send(backdata)
      return
    }
    for (let i = 0; i < rs.length; i++) {
      backdata.result.push(rs[i].result)
    }
    res.send(backdata)
  })
}
