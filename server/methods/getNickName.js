let connection = require('../config').connection

module.exports = function (cb) {
  let result = ''
  // let i = Math.round(Math.random() * 3 + 1)
  // let ii = Math.round(Math.random() * 8 + 1)
  let qstring = `select value from firstNickName where id = ${Math.round(Math.random() * 4 + 1)}`
  let secString = `select value from lastNickName where id = ${Math.round(Math.random() * 8 + 1)}`
  connection.query(qstring, function (err, rs) {
    if (err) {
      console.log(`[query] - :${err}`)
      cb('姓名')
    }
    result += rs[0].value
    connection.query(secString, function (e, r) {
      if (e) {
        console.log(`[query] - :${err}`)
        cb('姓名')
      }
      result += r[0].value
      cb(result)
    })
  })
}
