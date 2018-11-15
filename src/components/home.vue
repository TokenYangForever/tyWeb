<template>
  <div>
    <h3 class="home-head">{{msg}}<span class="ityped-cursor">|</span></h3>
    <template v-if="isMobile">
      <img class="home-bg" src="../assets/img/bgImg.jpg">
    </template>
    <template v-else>
      <video class="home-bg" loop="loop" autoplay="autoplay" muted="muted" :src="videoSrc">
<!--         <source src="../assets/video/background.mp4" type="video/mp4"> -->
<!--         <source :src="videoSrc" type=""> -->
      </video>
    </template>
  </div>
</template>

<script>
import util from '../common/util'
export default {
  name: 'homepage',
  data () {
    return {
      msg: '',
      msgIndex: 0,
      deleteFlag: false,
      isMobile: this._config().isMobile,
      videoSrc: ''
    }
  },
  created () {
    console.log(util)
    // util.ubtSend('msg')
    this._setTitle('首页')
  },
  methods: {
    inputAction () {
      if (this.deleteFlag) {
        if (this.msg.length) {
          this.msg = this.msg.slice(0, -1)
        } else {
          this.msgIndex = this.msgIndex === 2 ? 0 : this.msgIndex + 1
          this.deleteFlag = false
        }
      } else {
        let target = this.msgArr[this.msgIndex]
        if (this.msg.length < target.length) {
          this.msg += target[this.msg.length]
        } else {
          this.deleteFlag = true
        }
      }
      this.addTimmer = setTimeout(this.inputAction, this.deleteFlag ? 150 : 300)
    }
  },
  mounted () {
    let vm = this
    this.msgArr = [
      '这里是首页',
      '这是第二页',
      '嘛~就这样吧'
    ]
    let xhr = new XMLHttpRequest()
    // 配置请求方式、请求地址以及是否同步
    xhr.open('GET', 'http://localhost:3001/video', true)
    // 设置请求结果类型为blob
    // xhr.responseType = 'blob'
    // 请求成功回调函数
    xhr.onload = function(e) {
      if (this.status === 200) {
        // 请求成功
        // 获取blob对象
        // var blob = this.response;
        vm.videoSrc = URL.createObjectURL(this.response)
        window.res = this.response
        // 获取blob对象地址，并把值赋给容器
        // $("#sound").attr("src", URL.createObjectURL(blob));
      }
    }
    xhr.send()
    // this.axios.get('http://localhost:3001/video').then(({data}) => {
    //   this.videoSrc = URL.createObjectURL(new Blob(data.result.data))
    // })
    // this.inputAction()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-head {
  margin-top: 30px;
  color: white;
}
.home-bg {
  z-index: -1;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  bottom: 0;
}
.ityped-cursor {
    font-size: 1.1rem;
    color: #888;
    opacity: 1;
    -webkit-animation: blink 0.3s infinite;
    -moz-animation: blink 0.3s infinite;
    animation: blink 0.3s infinite;
    animation-direction: alternate;
}
@keyframes blink {
    100% {
        opacity: 0;
    }
}
</style>
