<template>
  <div>
    <p>来自webworker的消息：{{webworkerMsg}}</p>
    <p>来自localstorage的消息：{{storageMsg}}</p>
    <div>
      <input v-model="shareWorkerInput" type="text" name="msg" placeholder="输入一些信息">
      <b-btn size="sm" @click="setWorker" variant="primary">设置webworker传递信息</b-btn>
      <b-btn size="sm" @click="getWorker" variant="primary">获取webworker传递信息</b-btn>
    </div>
    <div>
      <input v-model="localstorageWorker" type="text" name="msg" placeholder="输入一些信息">
      <b-btn size="sm" @click="clickAction" variant="primary">通过localstorage传递信息</b-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'labelCommunication',
  data () {
    return {
      webworkerMsg: '',
      storageMsg: '',
      shareWorkerInput: '',
      localstorageWorker: ''
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
    clicklocalStorage () {
    },
    getWorker () {
      this.worker.port.postMessage('get')
    },
    setWorker () {
      this.worker.port.postMessage(this.shareWorkerInput)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
