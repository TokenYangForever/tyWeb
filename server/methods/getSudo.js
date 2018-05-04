const getChangeArr = () => {
  let changeArr = []
  for (let i = 0; i < 10; i++) {
    let fst = Math.floor(Math.random() * 9) + 1
    let sec = Math.floor(Math.random() * 9) + 1
    if (sec === fst) {
      sec = fst === 5 ? 4 : 10 - fst
    }
    changeArr[i] = [fst, sec]
  }
  return changeArr
}

const difficulty_map = {
  '入门': 41,
  '中等': 48,
  '困难': 53
}

const randomArr = (initArray) => {
  let arr = [...initArray]
  let changeArr = getChangeArr()
  for (let i = 0; i < 9; i++) {
    let temp = arr[i]
    for (let j = 0; j < changeArr.length; j++) {
      let fst = changeArr[j][0]
      let sec = changeArr[j][1]
      let fIndex = temp.indexOf(fst)
      let sIndex = temp.indexOf(sec)
      temp[fIndex] = sec
      temp[sIndex] = fst
    }
  }
  return arr
}

const getQueArr = (arr, diff) => {
  let counts = difficulty_map[diff]
  for (let i = 0; i < counts; i++) {
    arr = getBlock(arr)
  }
  return arr
}
const getBlock = (ar) => {
  let i = Math.floor(Math.random() * 9)
  let j = Math.floor(Math.random() * 9)
  if (ar[i][j] === '') {
    return getBlock(ar)
  } else {
    ar[i][j] = ''
    return ar
  }
}
let connection = require('../config').connection

module.exports = function (req, res) {
  // req.query 请求参数
  let backdata = {
    result: []
  }
  let difficulty = req.query.difficulty || 'Easy'
  let qstring = `SELECT Data from sudoTable where difficulty = '${difficulty}'`
  connection.query(qstring, function (err, rs) {
    if (err) {
      console.log(`[query] - :${err}`)
      backdata.err = err
      res.send(backdata)
      return
    }
    let index = Math.floor(Math.random() * rs.length)
    let Data = rs[index].Data.split(',')
    Data = Data.map((item) => item === '0' ? '' : Number(item))
    backdata.result = Data
    res.send(backdata)
  })
}
