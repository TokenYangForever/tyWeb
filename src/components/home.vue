<template>
  <div>
    <p>{{msg}}<span class="ityped-cursor">|</span></p>
    <template v-if='todayList.length > 0'>
      <h3>历史上的今天</h3>
      <div class='td-item' v-for="(item, index) in todayList" :key='index'>
        <img class='td-img' :src="item.src">
        <div class='td-title'><span>{{item.year}}</span>{{item.title}}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'homepage',
  data () {
    return {
      msg: '',
      msgIndex: 0,
      deleteFlag: false,
      todayList: []
    }
  },
  created () {
    let reqDate = new Date().getMonth() + 1 + String(new Date().getDate())
    this.axios.get(`${this._config().preurl}historyToday/getToday?date=${reqDate}`).then((response) => {
      this.todayList = JSON.parse(response.data.result)
    }).catch(() => {
      this.showAlert({
        msg: '接口异常，请联系管理员Token',
        autoClose: false,
        type: 'error'
      })
    })
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
      '暂时显示的历史上的今天',
      '嘛~就这样吧'
    ]
    this.inputAction()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.td-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding-left: 10%;
  margin: 30px
}
.td-img {
  width: 200px;
  height: 200px;
}
.td-title {
  margin-left: 20px;
  text-align: left;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
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
