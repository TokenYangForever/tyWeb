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

const getQueArr = (arr) => {
  for (let i = 0; i < 21; i++) {
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

module.exports = function (req, res) {
  let initArray = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 1, 4, 3, 6, 5, 8, 9, 7],
    [3, 6, 5, 8, 9, 7, 2, 1, 4],
    [8, 9, 7, 2, 1, 4, 3, 6, 5],
    [5, 3, 1, 6, 4, 2, 9, 7, 8],
    [6, 4, 2, 9, 7, 8, 5, 3, 1],
    [9, 7, 8, 5, 3, 1, 6, 4, 2]
  ]
  // req.query 请求参数
  let backdata = {
  }
  // 获得打乱后的数组
  let getArr = randomArr(initArray)
  let result = []
  for (let i = 0; i < getArr.length; i++) {
    result = [...result, ...getArr[i]]
  }
  let quesArr = getQueArr(getArr)
  let quesResult = []
  for (let i = 0; i < quesArr.length; i++) {
    quesResult = [...quesResult, ...getArr[i]]
  }
  backdata.quesArr = quesResult
  backdata.result = result
  res.send(backdata)
}
