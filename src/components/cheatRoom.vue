<template>
  <div>
    <div class="cr-chatArea">
      <ul class="cr-ul">
        <li v-for="(item, index) in msg" :key='index' class="cr-li">
          <template v-if = 'item.sys'>
            <p class="cr-sysMsg">{{item.description}}</p>
          </template>
          <template v-else>
            <p :style="{ color: item.color }"><span class="fleft">{{item.nickName}}：</span><span class="fleft">{{item.description}}</span></p>
            <div style="clear: both"></div>
          </template>
        </li>
      </ul>
    </div>
    <input v-model.trim="description" @keyup.enter="loadAction">
    <b-button :variant="'primary'" size="sm"  @click='loadAction'>
      发送
    </b-button>
    <p style="margin-top: 20px">你的昵称是：{{nickName}}。   当前聊天室人数：{{counts}}</p>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'cheatRoom',
  data () {
    return {
      description: '',
      nickName: '',
      counts: 1,
      msg: [],
      color: ''
    }
  },
  created () {
    window.vm = this
    if (!this.socket) {
      this.initSocket()
    }
  },
  mounted () {
    this.scrollUl = document.querySelector('.cr-ul')
  },
  methods: {
    watchKeyboard (e) {
      console.log(e)
    },
    initSocket () {
      const socket = io(this._config().preurl)
      socket.on('connect', () => {
        this.socket = socket
      })
      // 这里api语法类似于jQuery,支持once监听一次,off取消监听
      // [https://socket.io/docs/client-api/#socket-on-eventname-callback](https://socket.io/docs/client-api/#socket-on-eventname-callback)
      socket.once('initUser', ({name, color}) => {
        this.nickName = name
        this.color = color
      })
      socket.on('sys message', ({ data, counts }) => {
        this.counts = counts
        this.msg.push({
          description: data,
          sys: true
        })
      })
      socket.on('message from server', (item) => {
        item.sys = false
        this.msg.push(item)
      })
      socket.on('disconnect', () => {
      })
    },
    loadAction () {
      let { description, nickName, color } = this
      if (this.description.length === 0) {
        return
      }
      this.socket.emit('chat message', {
        description,
        nickName,
        color
      })
      this.description = ''
    },
    scrollToBottom () {
      let ele = this.scrollUl
      ele.scrollTop = ele.scrollHeight - ele.offsetHeight
    },
    changeName ({target}) {
      this.nickName = target.childNodes[0].data
    }
  },
  beforeDestroy () {
    // socket链接与vue生命周期绑定，vue销毁时手动断开socket链接
    this.socket.close()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cr-chatArea {
  height: 500px;
  padding-top: 30px;
  margin: 0 5%;
}
.cr-ul {
  height: 100%;
  overflow-y: scroll;
}
.cr-li {
  list-style: none;
  padding-left: 15px;
}
.fleft {
  float: left;
}
.cr-sysMsg {
  font-size: 12px;
  color: gray;
}
</style>
