<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
    
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
    
      <b-navbar-brand @click='routeAction("/")'>首页</b-navbar-brand>
    
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-nav is-nav-bar class="ml-auto">
          <b-button size="sm" variant="info" @click='routeAction("/mdCompiler")'>Markdown编辑器</b-button>
          <b-button size="sm" variant="info" @click='routeAction("/labelCommunication")'>多标签页之间通信</b-button>
          <b-button size="sm" variant="info" @click='routeAction("/canvas")'>canvas</b-button>
          <b-nav-item-dropdown text="图片" right v-if="showMore">
            <b-dropdown-item @click='routeAction("/uploadImage")'>上传图片</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="todoList" right v-if="showMore">
            <b-dropdown-item @click='routeAction("/addTodo")'>新增</b-dropdown-item>
            <b-dropdown-item @click='routeAction("/viewTodo")'>查看</b-dropdown-item>
          </b-nav-item-dropdown>
    
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>其他</em>
            </template>
            <b-dropdown-item @click='routeAction("/historyToday")'>历史上的今天</b-dropdown-item>
            <b-dropdown-item @click='routeAction("/cheatRoom")'>socket.io聊天室</b-dropdown-item>
            <b-dropdown-item @click='routeAction("/algorithm")'>排序算法</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav>
        
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import router from './router'
export default {
  name: 'app',
  data () {
    return {
      showMore: false
    }
  },
  methods: {
    routeAction (url) {
      router.push({ path: url })
    }
  },
  mounted () {
    window.vm = this
  }
}
</script>

<style>
.ml-auto button {
  margin-right: 10px;
}
@font-face{
  font-family: element-icons;
  src: url('fonts/element-icons.woff') format('woff'),
       url('fonts/element-icons.ttf') format('truetype');
  font-weight: 400;
  font-style: normal
}
i {
  font-family: element-icons!important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale
}
.el-icon-arrow-down:before { content: "\e600"; }
.el-icon-arrow-left:before { content: "\e601"; }
.el-icon-arrow-right:before { content: "\e602"; }
.el-icon-arrow-up:before { content: "\e603"; }
.el-icon-caret-bottom:before { content: "\e604"; }
.el-icon-caret-left:before { content: "\e605"; }
.el-icon-caret-right:before { content: "\e606"; }
.el-icon-caret-top:before { content: "\e607"; }
.el-icon-check:before { content: "\e608"; }
.el-icon-circle-check:before { content: "\e609"; }
.el-icon-circle-close:before { content: "\e60a"; }
.el-icon-circle-cross:before { content: "\e60b"; }
.el-icon-close:before { content: "\e60c"; }
.el-icon-upload:before { content: "\e60d"; }
.el-icon-d-arrow-left:before { content: "\e60e"; }
.el-icon-d-arrow-right:before { content: "\e60f"; }
.el-icon-d-caret:before { content: "\e610"; }
.el-icon-date:before { content: "\e611"; }
.el-icon-delete:before { content: "\e612"; }
.el-icon-document:before { content: "\e613"; }
.el-icon-edit:before { content: "\e614"; }
.el-icon-information:before { content: "\e615"; }
.el-icon-loading:before { content: "\e616"; }
.el-icon-menu:before { content: "\e617"; }
.el-icon-message:before { content: "\e618"; }
.el-icon-minus:before { content: "\e619"; }
.el-icon-more:before { content: "\e61a"; }
.el-icon-picture:before { content: "\e61b"; }
.el-icon-plus:before { content: "\e61c"; }
.el-icon-search:before { content: "\e61d"; }
.el-icon-setting:before { content: "\e61e"; }
.el-icon-share:before { content: "\e61f"; }
.el-icon-star-off:before { content: "\e620"; }
.el-icon-star-on:before { content: "\e621"; }
.el-icon-time:before { content: "\e622"; }
.el-icon-warning:before { content: "\e623"; }
.el-icon-delete2:before { content: "\e624"; }
.el-icon-upload2:before { content: "\e627"; }
.el-icon-view:before { content: "\e626"; }

.el-icon-loading {
  animation: rotating 1s linear infinite;
}

.el-icon--right {
  margin-left: 5px;
}
.el-icon--left {
  margin-right: 5px;
}
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
</style>
