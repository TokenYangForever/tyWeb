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

function debounce (func, wait, immediate) {
  var timeout, args, context, timestamp, result

  var later = function () {
    var last = Date.now() - timestamp

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function () {
    context = this
    args = arguments
    timestamp = Date.now()
    var callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

function throttle (func, wait, options) {
  var context, args, result
  var timeout = null
  var previous = 0
  if (!options) options = {}
  var later = function () {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function () {
    var now = Date.now()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}

function lazyLoadImg (item) {
  let offsetTop = item.offsetTop
  let winHeight = window.innerHeight
  let bodyHeight = document.documentElement.scrollTop
  if (offsetTop < winHeight + bodyHeight) {
    item.src = item.getAttribute('data-img')
    item.removeAttribute('data-img')
  }
}

export default {
  pick,
  debounce,
  throttle,
  lazyLoadImg
}
