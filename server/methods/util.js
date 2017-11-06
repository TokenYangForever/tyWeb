function getColor () {
  // 生成随机颜色
  const colorArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
  let color = '#'
  for (var i = 0; i < 6; i++) {
  	let index = Math.floor(Math.random() * 16)
    color += colorArray[index]
  }
  return color
}
module.exports = {
  getColor
}
