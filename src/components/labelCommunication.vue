<template>
  <div>
    <p>来自webworker的消息：{{webworkerMsg}}</p>
    <p>来自localstorage的消息：{{storageMsg}}</p>
    <input v-model="inputText" type="text" name="msg" placeholder="输入一些信息">
    <b-btn size="sm" @click="clickWorker" variant="primary">通过webworker传递信息</b-btn>
    <b-btn size="sm" @click="clickAction" variant="primary">通过localstorage传递信息</b-btn>
  </div>
</template>

<script>
export default {
  name: 'labelCommunication',
  data () {
    return {
      webworkerMsg: '',
      storageMsg: '',
      inputText: ''
    }
  },
  created () {
    this._setTitle('多标签之间通信')
  },
  mounted () {
    if (typeof Worker === "undefined") {
      this.webworkerMsg = '当前浏览器不支持webworker'
    } else {
      let worker = new SharedWorker('worker.js')
      worker.port.addEventListener('message', (e) => {
        console.log(e)
        this.webworkerMsg = e.data
      }, false)
      worker.port.start()
      window.worker = this.worker = worker
    }
  },
  methods: {
    clickAction () {
    },
    clickWorker () {
      this.worker.port.postMessage(this.inputText)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
