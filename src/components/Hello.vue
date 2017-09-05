<template>
  <section class="todoapp">
      <el-button type="primary" @click="ajaxAction()">接口</el-button>
      <h1>todos</h1>
      <div class='td-input-item'>
        <span class='input-title'>标题</span>
        <el-input auto-complete="off" placeholder="What needs to be done?" v-model="newTitle"></el-input>
      </div>
      <div class='td-input-item'>
        <span class='input-title'>描述</span>
        <el-input auto-complete="off" placeholder="How to do it?" v-model="newDes"></el-input>
      </div>
      <div class="td-button-wrap">
        <el-button type="primary">添加</el-button>
        <el-button @click="clearAction()">清空</el-button>
      </div>
  </section>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      newTitle: '',
      newDes: ''
    }
  },
  methods: {
    clearAction () {
      this.newTitle = ''
      this.newDes = ''
    },
    ajaxAction () {
      this.axios.get('http://192.168.0.113:8081/getTodo').then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todoapp {
    background: #fff;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
    padding-bottom: 10px;
}
.todoapp h1 {
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
}
.td-input-item{
    margin: 15px 0;
    padding: 0 10%;
}
.td-button-wrap {
  margin: 20px 0
}

</style>
