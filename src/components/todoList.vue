<template>
  <section class="todoapp">
    <h1>todolist</h1>
    <div class="tdl-list-wrap">
        <div class="tdl-list-item" v-for="item in todoData" :key="item.itemid">
          <h3>{{item.title}}</h3>
          <label>{{item.description}}</label>
        </div>
    </div>
  </section>
</template>

<script>
import config from '../common/config'
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
}
.tdl-list-item {
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
}
.tdl-list-item h3 {
    padding: 15px 0
}
.tdl-list-item label {
    word-break: break-all;
    padding: 0 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
}
</style>
