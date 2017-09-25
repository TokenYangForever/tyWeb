let fs = require('fs')

module.exports = function (req, res) {
  // req.query 请求参数
  let backdata = {}
  // let reqParam = req.body
  let url = req.body.imgUrl

  let base64 = url.replace(/^data:image\/\w+;base64,/, '')// 去掉图片base64码前面部分data:image/png;base64
  let dataBuffer = new Buffer(base64, 'base64') // 把base64码转成buffer对象，

  // console.log('dataBuffer是否是Buffer对象：' + Buffer.isBuffer(dataBuffer))
  // console.log(req.body.imgUrl)
  if (req.body.imgUrl) {
    fs.writeFile('./lalala.png', dataBuffer, function (err) {
      if (err) {
        backdata.err = err
        res.send(backdata)
      } else {
        backdata.code = 200
        res.send(backdata)
      }
    })
  } else {
    backdata.err = '缺少图片url！'
    res.send(backdata)
  }
}
