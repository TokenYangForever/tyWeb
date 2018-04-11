<template>
  <div>
    <p>来自webworker的消息：{{webworkerMsg}}</p>
    <p>来自localstorage的消息：{{storageMsg}}</p>
    <div class='lc-wrap'>
      <input v-model="shareWorkerInput" type="text" name="msg" placeholder="输入一些信息">
      <b-btn size="sm" @click="setWorker" variant="primary">设置向webworker传递的信息</b-btn>
      <b-btn size="sm" @click="getWorker" variant="primary">获取来自webworker的信息</b-btn>
    </div>
    <div class='lc-wrap'>
      <input v-model="localstorageKey" type="text" name="msg" placeholder="输入key">
      <input v-model="localstorageValue" type="text" name="msg" placeholder="输入value">
      <b-btn size="sm" @click="clicklocalStorage" variant="primary">通过localstorage传递信息</b-btn>
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
      localstorageValue: '',
      localstorageKey: ''
    }
  },
  created () {
    this._setTitle('多标签之间通信')
    window.addEventListener("storage", this.storagetCallback)
  },
  mounted () {
    window.onstorage
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
  destroyed () {
    window.removeEventListener("storage", this.storagetCallback)
  },
  methods: {
    storagetCallback ({key, newValue}) {
      this.storageMsg = `key为：${key}, value为：${newValue}`
    },
    clicklocalStorage () {
      let {localstorageKey, localstorageValue} = this
      if (localstorageKey.length === 0) {
        alert('请输入key')
        return
      }
      if (localstorageValue.length === 0) {
        alert('请输入value')
        return
      }
      localStorage.setItem(localstorageKey, localstorageValue)
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
.lc-wrap {
  margin: 20px 0;
}
</style>
