
import filter from 'lodash/filter'
// 可以像这样引用lodash里的特定方法，不用引入整个库
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

function lazyLoadImg (dataAttr = 'data-img') {
  function helper (item) {
    let offsetTop = item.offsetTop
    let winHeight = window.innerHeight
    let bodyHeight = document.documentElement.scrollTop
    if (offsetTop < winHeight + bodyHeight) {
      item.src = item.getAttribute(dataAttr)
      item.removeAttribute(dataAttr)
    }
  }
  let fn = throttle(() => {
    const lzImg = document.querySelectorAll(`[${dataAttr}]`)
    if (lzImg.length) {
      for (let i in lzImg) {
        helper(lzImg[i])
      }
    } else {
      document.body.onscroll = null
    }
  }, 300)
  document.body.onscroll = fn
  fn()
}

const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect()
  const { innerHeight, innerWidth } = window
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
}

export default {
  pick,
  debounce,
  throttle,
  lazyLoadImg,
  filter,
  elementIsVisibleInViewport
}
