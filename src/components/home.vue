<template>
  <div>
    <p>{{msg}}<span class="ityped-cursor">|</span></p>
  </div>
</template>

<script>
export default {
  name: 'homepage',
  data () {
    return {
      msg: '',
      msgIndex: 0,
      deleteFlag: false
    }
  },
  created () {
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
    },
    deleteAction () {

    }
  },
  mounted () {
    this.msgArr = [
      '这里是光秃秃的首页',
      '暂时没想好要写什么',
      '嘛~就这样吧'
    ]
    this.inputAction()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ityped-cursor {
    font-size: 1.1rem;
    color: #888;
    opacity: 1;
    -webkit-animation: blink 0.3s infinite;
    -moz-animation: blink 0.3s infinite;
    animation: blink 0.3s infinite;
    animation-direction: alternate;
}
</style>
