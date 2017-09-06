<template>
  <section class="todoapp">
    <h1>todolist</h1>
    <el-collapse class="tdl-list-wrap">
      <el-collapse-item v-for="item in todoData" :title="item.itemid +'.'+ item.title" :name="item.itemid" :class="{'hasdone': item.statu === 'done'}">
        <label>{{item.description}}</label>
      </el-collapse-item>
    </el-collapse>

  </section>
</template>

<script>
import config from '../../common/config'
export default {
  name: 'todolist',
  data () {
    return {
      todoData: []
    }
  },
  created () {
    this.axios.get(`${config.preurl}getTodo`).then((response) => {
      this.todoData = response.data.result
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}
.tdl-list-wrap {
  background: rgba(251, 253, 255, 0.17);
  margin: 0 5%;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
}
.hasdone{
  text-decoration: line-through;
}
</style>
