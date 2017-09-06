import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import tdList from '@/components/todoList'
import tdAdd from '@/components/todoAdd'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/todo-add',
      name: 'todo-add',
      component: tdAdd
    },
    {
      path: '/todo-list',
      name: 'todo-list',
      component: tdList
    }
  ]
})
