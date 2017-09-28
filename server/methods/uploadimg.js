let fs = require('fs')

module.exports = function (req, res) {
  // req.query 请求参数
  let backdata = {}
  let reqParam = req.body
  let imgUrl = reqParam.imgUrl
  let imgName = reqParam.imgName || 'newImage'
  if (!imgUrl) {
    backdata.err = '缺少图片url！'
    res.send(backdata)
  }
  let base64 = imgUrl.replace(/^data:image\/\w+;base64,/, '')// 去掉图片base64码前面部分data:image/png;base64
  let dataBuffer = new Buffer(base64, 'base64') // 把base64码转成buffer对象，
  fs.writeFile(`./${Date.now()}_${imgName}.png`, dataBuffer, function (err) {
    if (err) {
      backdata.err = err
      res.send(backdata)
    } else {
      backdata.code = 200
      res.send(backdata)
    }
  })
}
