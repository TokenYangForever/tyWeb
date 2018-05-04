let connection = require('../config').connection

module.exports = function () {
  let result = ''
  let qstring = `select value from firstNickName where id = ${Math.round(Math.random() * 4 + 1)}`
  let secString = `select value from lastNickName where id = ${Math.round(Math.random() * 8 + 1)}`

  return new Promise((resolve, reject) => {
    connection.query(qstring, function (err, rs) {
      if (err) {
        resolve('姓名')
      }
      result += rs[0].value
      connection.query(secString, function (e, r) {
        if (e) {
          resolve('姓名')
        }
        result += r[0].value
        resolve(result)
      })
    })
  })
}
