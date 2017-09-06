<template>
  <div id="app">
    <el-menu theme="dark" :default-active="'1'" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">Todo-List</template>
        <el-menu-item index="2-1">添加</el-menu-item>
        <el-menu-item index="2-2">查看</el-menu-item>
      </el-submenu>
      <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import router from './router'

export default {
  name: 'app',
  methods: {
    handleSelect (index, val) {
      let path
      switch (index) {
        case '2-1':
          path = 'todo-add'
          break
        case '1':
          path = '/'
          break
        default:
          path = 'todo-list'
      }
      console.log(index, val)
      router.push({ path: path })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  margin: 0;
  padding: 0;
}
.input-title{
  font-size: 22px;
}
</style>
