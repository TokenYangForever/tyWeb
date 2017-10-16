<template>
  <div>
    <p>this is homepage</p>
  </div>
</template>

<script>
export default {
  name: 'homepage',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  },
  mounted () {
    window.vm = this
    const jsonp = function (url, data) {
      return new Promise((resolve, reject) => {
        // 初始化url
        let dataString = url.indexOf('?') === -1 ? '?' : '&'
        let callbackName = `jsonpCB_${Date.now()}`
        url += `${dataString}callback=${callbackName}`
        if (data) {
          for (let k in data) {
            url += `&${k}=${data[k]}`
          }
        }
        let jsNode = document.createElement('script')
        jsNode.src = url
        // 触发callback
        window[callbackName] = result => {
          delete window[callbackName]
          document.body.removeChild(jsNode)
          if (result) {
            resolve(result)
          } else {
            reject('没有返回数据')
          }
        }
        // js加载异常的情况
        jsNode.addEventListener('error', () => {
          delete window[callbackName]
          document.body.removeChild(jsNode)
          reject('JavaScript资源加载失败')
        }, false)
        document.body.appendChild(jsNode)
      })
    }
    jsonp('http://192.168.0.103:8081/jsonp', {a: 1, b: 'heiheihei'})
      .then(result => { console.log(result) })
      .catch(err => { console.error(err) })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
