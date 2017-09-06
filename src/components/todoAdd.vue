<template>
  <section class="todoapp">
      <h1>Add todos</h1>
      <div class='td-input-item'>
        <span class='input-title'>标题</span>
        <el-input auto-complete="off" placeholder="What needs to be done?" v-model="newTitle"></el-input>
      </div>
      <div class='td-input-item'>
        <span class='input-title'>描述</span>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="How to do it?"
          v-model="newDes">
        </el-input>
      </div>
      <div class="td-button-wrap">
        <el-button type="primary" @click="addAction()">添加</el-button>
        <el-button @click="clearAction()">清空</el-button>
      </div>
  </section>
</template>

<script>
import config from '../common/config'
export default {
  name: 'todoAdd',
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
    addAction () {
      this.axios.post(`${config.preurl}savetodo`, {
        title: this.newTitle,
        description: this.newDes
      }).then((response) => {
        if (response.data.code === 200) {
          this.$notify({
            title: '添加成功',
            message: '已添加到todolist中',
            type: 'success',
            duration: '1800'
          });
          this.clearAction()
        } else {
          return Promise.reject(response.data.err.code)
        }
      }).catch((err) => {
        this.$notify.error({
          title: '错误',
          message: err,
          duration: '1800'
        });
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
