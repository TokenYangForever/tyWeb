<template>
  <div>
    <p>服务器的时间：{{date}}</p>
    <b-form-input v-model.trim="nickName" type="text" placeholder="输入你的昵称"></b-form-input>
    <b-form-input v-model.trim="description" type="text" placeholder="这里输入描述"></b-form-input>
    <b-button :variant="'primary'" @click = 'loadAction'>
      发送
    </b-button>
    <ul v-if='msg.length > 0'>
      <li v-for="(item, index) in msg" :key='index'>{{item}}</li>
    </ul>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'homepage',
  data () {
    return {
      description: '',
      date: '',
      nickName: '',
      msg: []
    }
  },
  created () {
    window.vm = this
    const socket = io('http://localhost:8081')
    socket.on('connect', () => {
      console.log('已连接到服务器')
      this.socket = socket
    })
    socket.on('update date', (date) => { this.date = new Date(date) })
    socket.on('send nickName', (name) => { this.nickName = name })
    socket.on('message from server', (data) => { this.msg.push(data) })
    socket.on('disconnect', () => { console.log('disconnect') })
  },
  methods: {
    loadAction () {
      if (!this.nickName) {
        return
      }
      this.socket.emit('chat message', this.description);
    },
    changeName ({target}) {
      this.nickName = target.childNodes[0].data
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
