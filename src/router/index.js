import Vue from 'vue'
import Router from 'vue-router'
import todoList from '@/components/todoList'
import addTodo from '@/components/addTodo'
import home from '@/components/home'
import uploadImage from '@/components/uploadImage'
import mdCompiler from '@/components/markdownCompiler'
import algorithm from '@/components/algorithm'
import cheatRoom from '@/components/cheatRoom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/viewTodo',
      name: 'todoList',
      component: todoList
    },
    {
      path: '/addTodo',
      name: 'addTodo',
      component: addTodo
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/uploadImage',
      name: 'uploadImage',
      component: uploadImage
    },
    {
      path: '/mdCompiler',
      name: 'mdCompiler',
      component: mdCompiler
    },
    {
      path: '/algorithm',
      name: 'algorithm',
      component: algorithm
    },
    {
      path: '/cheatRoom',
      name: 'cheatRoom',
      component: cheatRoom
    }
  ]
})
