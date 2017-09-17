function pick (obj, keys) {
  let result = {}

  if (!obj) {
    return result
  }

  keys.forEach((item) => {
    if (obj.hasOwnProperty(item)) {
      result[item] = obj[item]
    }
  })

  return result
}
export default {
  pick
}
