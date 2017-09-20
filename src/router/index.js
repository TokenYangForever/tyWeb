import Vue from 'vue'
import Router from 'vue-router'
import todoList from '@/components/todoList'
import addTodo from '@/components/addTodo'
import home from '@/components/home'

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
    }
  ]
})
